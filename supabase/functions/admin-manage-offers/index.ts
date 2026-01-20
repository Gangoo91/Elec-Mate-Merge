import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Standard prices by plan in GBP (matches Stripe prices)
const STANDARD_PRICES: Record<string, { monthly: number; yearly: number }> = {
  apprentice: { monthly: 4.99, yearly: 49.99 },
  electrician: { monthly: 9.99, yearly: 99.99 },
  employer: { monthly: 29.99, yearly: 299.99 },
};

// Initialize Stripe
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Create Supabase client with user's token
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify the caller is an admin
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error("Unauthorized: Could not get user");
    }

    const { data: callerProfile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("admin_role, full_name")
      .eq("id", user.id)
      .single();

    if (profileError || !callerProfile?.admin_role) {
      throw new Error("Unauthorized: Admin access required");
    }

    // Get request body
    const { action, offer } = await req.json();

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case "list": {
        const { data, error } = await supabaseAdmin
          .from("promo_offers")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = { offers: data };
        break;
      }

      case "create": {
        if (!offer?.name || offer.price === undefined) {
          throw new Error("Offer name and price are required");
        }
        const code = `${offer.name.toUpperCase().replace(/\s+/g, "").slice(0, 8)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const planId = offer.plan_id || "electrician";

        // 1. Calculate discount amount (in pence) - use monthly price as base
        const planPrices = STANDARD_PRICES[planId] || { monthly: 9.99, yearly: 99.99 };
        const standardPrice = planPrices.monthly;
        const discountAmount = Math.round((standardPrice - offer.price) * 100);

        let stripeCouponId: string | null = null;
        let stripePromotionCodeId: string | null = null;

        // 2. Create Stripe Coupon (only if there's a discount)
        if (discountAmount > 0) {
          try {
            const coupon = await stripe.coupons.create({
              amount_off: discountAmount,
              currency: "gbp",
              duration: "forever",
              name: offer.name,
            });
            stripeCouponId = coupon.id;

            // 3. Create Stripe Promotion Code
            const promoCodeOptions: Stripe.PromotionCodeCreateParams = {
              coupon: coupon.id,
              code: code,
            };

            if (offer.max_redemptions) {
              promoCodeOptions.max_redemptions = offer.max_redemptions;
            }
            if (offer.expires_at) {
              promoCodeOptions.expires_at = Math.floor(
                new Date(offer.expires_at).getTime() / 1000
              );
            }

            const promoCode = await stripe.promotionCodes.create(promoCodeOptions);
            stripePromotionCodeId = promoCode.id;

            console.log(`Stripe coupon ${coupon.id} and promo code ${promoCode.id} created`);
          } catch (stripeError: any) {
            console.error("Stripe error:", stripeError.message);
            throw new Error(`Failed to create Stripe coupon: ${stripeError.message}`);
          }
        }

        // 4. Insert into database with Stripe IDs
        const { data, error } = await supabaseAdmin
          .from("promo_offers")
          .insert({
            name: offer.name,
            code,
            price: offer.price,
            plan_id: planId,
            max_redemptions: offer.max_redemptions || null,
            expires_at: offer.expires_at || null,
            is_active: true,
            redemptions: 0,
            stripe_coupon_id: stripeCouponId,
            stripe_promotion_code_id: stripePromotionCodeId,
          })
          .select()
          .single();
        if (error) throw error;
        console.log(`Offer ${data.code} created by admin ${user.id}`);
        result = { offer: data };
        break;
      }

      case "update": {
        if (!offer?.id) {
          throw new Error("Offer ID is required");
        }

        // Get existing offer to check Stripe IDs
        const { data: existingOffer } = await supabaseAdmin
          .from("promo_offers")
          .select("stripe_promotion_code_id")
          .eq("id", offer.id)
          .single();

        // Update Stripe promotion code active status if changing is_active
        if (
          offer.is_active !== undefined &&
          existingOffer?.stripe_promotion_code_id
        ) {
          try {
            await stripe.promotionCodes.update(existingOffer.stripe_promotion_code_id, {
              active: offer.is_active,
            });
            console.log(
              `Stripe promo code ${existingOffer.stripe_promotion_code_id} ${
                offer.is_active ? "activated" : "deactivated"
              }`
            );
          } catch (stripeError: any) {
            console.warn("Failed to update Stripe promo code:", stripeError.message);
          }
        }

        const { data, error } = await supabaseAdmin
          .from("promo_offers")
          .update({
            is_active: offer.is_active,
            ...(offer.name && { name: offer.name }),
            ...(offer.price !== undefined && { price: offer.price }),
            ...(offer.max_redemptions !== undefined && { max_redemptions: offer.max_redemptions }),
          })
          .eq("id", offer.id)
          .select()
          .single();
        if (error) throw error;
        console.log(`Offer ${offer.id} updated by admin ${user.id}`);
        result = { offer: data };
        break;
      }

      case "delete": {
        if (!offer?.id) {
          throw new Error("Offer ID is required");
        }
        // Only super admins can delete
        if (callerProfile.admin_role !== "super_admin") {
          throw new Error("Unauthorized: Super admin access required to delete offers");
        }

        // Get the offer to retrieve Stripe IDs
        const { data: existingOffer } = await supabaseAdmin
          .from("promo_offers")
          .select("stripe_coupon_id, stripe_promotion_code_id")
          .eq("id", offer.id)
          .single();

        // Delete Stripe coupon (this also invalidates the promotion code)
        if (existingOffer?.stripe_coupon_id) {
          try {
            await stripe.coupons.del(existingOffer.stripe_coupon_id);
            console.log(`Stripe coupon ${existingOffer.stripe_coupon_id} deleted`);
          } catch (stripeError: any) {
            console.warn("Failed to delete Stripe coupon:", stripeError.message);
          }
        }

        const { error } = await supabaseAdmin
          .from("promo_offers")
          .delete()
          .eq("id", offer.id);
        if (error) throw error;
        console.log(`Offer ${offer.id} deleted by super admin ${user.id}`);
        result = { success: true };
        break;
      }

      case "get_redemptions": {
        if (!offer?.id) {
          throw new Error("Offer ID is required");
        }
        const { data, error } = await supabaseAdmin
          .from("offer_redemptions")
          .select(`
            id,
            redeemed_at,
            amount_paid,
            profiles:user_id (id, full_name)
          `)
          .eq("offer_id", offer.id)
          .order("redeemed_at", { ascending: false });
        if (error) throw error;
        result = { redemptions: data };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in admin-manage-offers:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
