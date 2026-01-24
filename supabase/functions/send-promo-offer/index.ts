import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

interface PromoOffer {
  id: string;
  name: string;
  code: string;
  price: number;
  plan_id: string;
  max_redemptions: number | null;
  expires_at: string | null;
}

// Standard prices by plan in GBP (monthly)
const STANDARD_PRICES: Record<string, number> = {
  apprentice: 4.99,
  electrician: 9.99,
  employer: 29.99,
};  // Email uses monthly prices for display

const PLAN_NAMES: Record<string, string> = {
  apprentice: "Apprentice",
  electrician: "Electrician",
  employer: "Employer",
};

// Generate promo offer email HTML
function generatePromoEmailHTML(offer: PromoOffer): string {
  const siteUrl = Deno.env.get("SITE_URL") || "https://elec-mate.com";
  const claimUrl = `${siteUrl}/auth/signup?offer=${offer.code}`;
  const standardPrice = STANDARD_PRICES[offer.plan_id] || 9.99;
  const discountPercent = Math.round(((standardPrice - offer.price) / standardPrice) * 100);
  const planName = PLAN_NAMES[offer.plan_id] || "Electrician";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${offer.name} - Special Offer</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 420px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 24px 24px; text-align: center;">
              <div style="font-size: 56px; line-height: 1; margin-bottom: 16px;">🎁</div>
              <div style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                Special Offer
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                ${offer.name}
              </h1>
              <p style="margin: 12px 0 0; font-size: 16px; color: #e2e8f0; line-height: 1.5;">
                You've been invited to join Elec-Mate
              </p>
            </td>
          </tr>

          <!-- Price Card -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 20px; padding: 28px 24px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  ${planName} Plan
                </p>
                <p style="margin: 8px 0 4px; font-size: 48px; font-weight: 800; color: #22c55e; line-height: 1;">
                  £${offer.price.toFixed(2)}
                </p>
                <p style="margin: 0 0 16px; font-size: 16px; color: #94a3b8;">
                  per month, forever
                </p>
                <p style="margin: 0; font-size: 14px; color: #cbd5e1; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 8px; display: inline-block;">
                  <span style="text-decoration: line-through; color: #64748b;">£${standardPrice.toFixed(2)}</span>
                  <span style="color: #22c55e; font-weight: 600; margin-left: 8px;">${discountPercent}% OFF</span>
                </p>
              </div>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7; text-align: center;">
                Get exclusive access to all Elec-Mate features at this special rate. This price is locked in for as long as you're a member.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${claimUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);">
                      🚀 Claim This Offer
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Included -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <p style="margin: 0 0 16px; font-size: 13px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                What's included
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">All AI tools & calculators</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">BS7671 AI Assistant</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">Quote & invoice builder</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">EICR & certificate generation</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">Priority support & all future updates</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Offer Code -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 12px; padding: 14px 20px; text-align: center;">
                <p style="margin: 0 0 4px; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">
                  Your Offer Code
                </p>
                <p style="margin: 0; font-size: 18px; color: #fbbf24; font-weight: 700; font-family: monospace;">
                  ${offer.code}
                </p>
              </div>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 24px; background-color: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(148, 163, 184, 0.1); text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #cbd5e1;">
                Questions? Just reply to this email
              </p>
              <a href="mailto:support@elec-mate.com" style="font-size: 15px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                support@elec-mate.com
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0f172a;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                © ${new Date().getFullYear()} Elec-Mate · Made in the UK 🇬🇧
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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

    const { action, offerId, email, emails } = await req.json();

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case "send_single": {
        if (!offerId || !email) {
          throw new Error("Offer ID and email are required");
        }

        // Get offer details
        const { data: offer, error: offerError } = await supabaseAdmin
          .from("promo_offers")
          .select("*")
          .eq("id", offerId)
          .single();

        if (offerError || !offer) {
          throw new Error("Offer not found");
        }

        if (!offer.is_active) {
          throw new Error("This offer is not active");
        }

        // Send email
        const emailHtml = generatePromoEmailHTML(offer as PromoOffer);
        const { error: emailError } = await resend.emails.send({
          from: "Elec-Mate <offers@elec-mate.com>",
          to: [email.trim().toLowerCase()],
          subject: `Special Offer: ${offer.name} - £${offer.price}/month`,
          html: emailHtml,
        });

        if (emailError) {
          console.error("Email send error:", emailError);
          throw new Error("Failed to send email");
        }

        // Track the sent email
        await supabaseAdmin.from("promo_offer_emails").insert({
          offer_id: offerId,
          email: email.trim().toLowerCase(),
          status: "sent",
        });

        console.log(`Promo offer ${offer.code} sent to ${email} by admin ${user.id}`);
        result = { success: true, email };
        break;
      }

      case "send_bulk": {
        if (!offerId || !emails || !Array.isArray(emails) || emails.length === 0) {
          throw new Error("Offer ID and email list are required");
        }

        // Get offer details
        const { data: offer, error: offerError } = await supabaseAdmin
          .from("promo_offers")
          .select("*")
          .eq("id", offerId)
          .single();

        if (offerError || !offer) {
          throw new Error("Offer not found");
        }

        if (!offer.is_active) {
          throw new Error("This offer is not active");
        }

        // Clean and validate emails
        const cleanEmails = emails
          .map((e: string) => e.trim().toLowerCase())
          .filter((e: string) => e && e.includes("@"));

        let sentCount = 0;
        const errors: string[] = [];

        const emailHtml = generatePromoEmailHTML(offer as PromoOffer);

        for (const recipientEmail of cleanEmails) {
          try {
            const { error: emailError } = await resend.emails.send({
              from: "Elec-Mate <offers@elec-mate.com>",
              to: [recipientEmail],
              subject: `Special Offer: ${offer.name} - £${offer.price}/month`,
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${recipientEmail}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin.from("promo_offer_emails").insert({
              offer_id: offerId,
              email: recipientEmail,
              status: "sent",
            });

            sentCount++;
          } catch (err: any) {
            errors.push(`${recipientEmail}: ${err.message}`);
          }
        }

        console.log(`Sent ${sentCount} promo emails for offer ${offer.code} by admin ${user.id}`);
        result = { sent: sentCount, failed: errors.length, errors: errors.length > 0 ? errors : undefined };
        break;
      }

      case "get_sent": {
        if (!offerId) {
          throw new Error("Offer ID is required");
        }

        const { data, error } = await supabaseAdmin
          .from("promo_offer_emails")
          .select("*")
          .eq("offer_id", offerId)
          .order("sent_at", { ascending: false });

        if (error) throw error;
        result = { emails: data || [] };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in send-promo-offer:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
