/**
 * admin-college-activity
 *
 * What the college scheme is actually doing, from the two places that know:
 *
 *   - Stripe: every promotion code on the two college coupons, how many times
 *     each was redeemed, and every subscription that carries one of those codes
 *     (trialing, paying, cancelled) with what it pays a month after the 50%.
 *   - Supabase: every tutor / staff account made on Bulk create, which college
 *     it belongs to, and when it last signed in.
 *
 * `promo_offers.redemptions` is not used — it is written once at creation and
 * never updated. Stripe is the only truth for take-up.
 */
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const COLLEGE_COUPONS = new Set(['MWAINvAO', 'hPawaSkv']);
/* Employer scheme: 30% apprentice / 40% electrician (11 Sep 2026). The eight
   employers chased on 10 Sep kept 50% codes on the COLLEGE coupons, so for the
   employer view we also pull in any promo_offers row named "Employer scheme…". */
const EMPLOYER_COUPONS = new Set(['EMPLOYER30APP', 'EMPLOYER40ELEC']);

/** List price by Stripe price id, so a code's take is the real half of list. */
const PRICE_TIER: Record<
  string,
  { tier: 'apprentice' | 'electrician' | 'founder'; amount: number }
> = {
  price_1SPK8c2RKw5t5RAmRGJxXfjc: { tier: 'founder', amount: 3.99 },
  price_1RL1wd2RKw5t5RAms8S0sLAt: { tier: 'founder', amount: 3.99 },
  price_1TnbOk2RKw5t5RAmiOCTkqS3: { tier: 'apprentice', amount: 6.99 },
  price_1TnbOl2RKw5t5RAmmNsVstDW: { tier: 'apprentice', amount: 69.99 / 12 },
  price_1TKlA22RKw5t5RAmpvhojy0b: { tier: 'apprentice', amount: 5.99 },
  price_1SmUef2RKw5t5RAmRIMTWTqU: { tier: 'apprentice', amount: 4.99 },
  price_1TKlKK2RKw5t5RAmGVR5EcF9: { tier: 'apprentice', amount: 59.99 / 12 },
  price_1SmUfK2RKw5t5RAml6bj1I77: { tier: 'apprentice', amount: 49.99 / 12 },
  price_1TnbOh2RKw5t5RAmsf2KcHT6: { tier: 'electrician', amount: 19.99 },
  price_1TnbOj2RKw5t5RAmEIXS6oyV: { tier: 'electrician', amount: 199.99 / 12 },
  price_1TKlA12RKw5t5RAmdhZyhX1I: { tier: 'electrician', amount: 12.99 },
  price_1SqJVr2RKw5t5RAmaiTGelLN: { tier: 'electrician', amount: 9.99 },
  price_1TMoQE2RKw5t5RAmuFglsBof: { tier: 'electrician', amount: 9.99 },
  price_1TKlKL2RKw5t5RAmpD8FH7qp: { tier: 'electrician', amount: 129.99 / 12 },
  price_1SqJVs2RKw5t5RAmVeD2QVsb: { tier: 'electrician', amount: 99.99 / 12 },
  price_1RhteS2RKw5t5RAmzRbaTE8U: { tier: 'electrician', amount: 9.99 },
  price_1Rhti2RKw5t5RAmha0s6PJA: { tier: 'electrician', amount: 99.99 / 12 },
  price_1SvggR2RKw5t5RAmDN29FBzx: { tier: 'electrician', amount: 7.99 },
  price_1SvggR2RKw5t5RAmsrerSmdG: { tier: 'electrician', amount: 79.99 / 12 },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

/** Provided by the Supabase edge runtime; keeps the isolate alive past the response. */
declare const EdgeRuntime: { waitUntil(p: Promise<unknown>): void };

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'unauthorised' }, 401);
    const token = authHeader.replace('Bearer ', '');

    /*
      The background refresh calls this function with the service-role key and
      has no user behind it. Everything else must be a signed-in admin.
    */
    const scheduled = token === serviceKey;
    if (!scheduled) {
      const {
        data: { user },
        error: authError,
      } = await admin.auth.getUser(token);
      if (authError || !user) return json({ error: 'unauthorised' }, 401);
      const { data: caller } = await admin
        .from('profiles')
        .select('admin_role')
        .eq('id', user.id)
        .single();
      if (!caller?.admin_role) return json({ error: 'forbidden' }, 403);
    }

    // The body is readable once, so scheme and refresh come out together.
    let scheme: 'college' | 'employer' = 'college';
    let forceRefresh = false;
    try {
      const body = await req.json();
      if (body?.scheme === 'employer') scheme = 'employer';
      forceRefresh = body?.refresh === true;
    } catch {
      /* no body = college, read path */
    }

    /*
      Serve from cache, refresh behind the response.

      This walks every promotion code on the account and then EVERY
      subscription ever created (`status: 'all'`, with price expansion) to find
      the ones carrying a scheme code. Measured p50 14.0s, worst 31.8s — paid
      on every visit to Colleges and to Employers, which share this component.
      Scheme take-up moves by a handful of rows a week, so a cached answer is
      as true as a live one and arrives in milliseconds.
    */
    const CACHE_KEY = `college_activity_${scheme}`;
    const FRESH_MS = 10 * 60 * 1000;

    if (!forceRefresh) {
      const { data: cached } = await admin
        .from('admin_metric_cache')
        .select('value, updated_at')
        .eq('key', CACHE_KEY)
        .maybeSingle();

      if (cached?.value) {
        const age = Date.now() - new Date(cached.updated_at).getTime();
        if (age > FRESH_MS) {
          EdgeRuntime.waitUntil(
            fetch(`${supabaseUrl}/functions/v1/admin-college-activity`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${serviceKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ scheme, refresh: true }),
            }).catch((e) => console.error('[admin-college-activity] refresh failed:', e))
          );
        }
        console.log(
          `[admin-college-activity] ${scheme} from cache, age ${Math.round(age / 1000)}s`
        );
        return json({ ...cached.value, cachedAt: cached.updated_at, servedFromCache: true });
      }
    }
    const coupons = scheme === 'employer' ? EMPLOYER_COUPONS : COLLEGE_COUPONS;
    // Codes that belong to this scheme by NAME in promo_offers (catches the
    // legacy employer 50% codes that sit on the college coupons, and keeps
    // them out of the college view).
    const { data: namedRows } = await admin
      .from('promo_offers')
      .select('code, name')
      .ilike('name', `${scheme === 'employer' ? 'Employer' : 'College'} scheme%`);
    const namedCodes = new Set((namedRows ?? []).map((r) => String(r.code).toUpperCase()));
    const otherNamed = new Set<string>();
    {
      const { data: otherRows } = await admin
        .from('promo_offers')
        .select('code')
        .ilike('name', `${scheme === 'employer' ? 'College' : 'Employer'} scheme%`);
      for (const r of otherRows ?? []) otherNamed.add(String(r.code).toUpperCase());
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) return json({ error: 'stripe_not_configured' }, 500);
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // ── 1. The codes: every promotion code on the two college coupons ──
    const codesById = new Map<
      string,
      {
        id: string;
        code: string;
        couponId: string;
        redeemed: number;
        active: boolean;
        created: string;
      }
    >();
    let after: string | undefined;
    for (;;) {
      const page: Stripe.ApiList<Stripe.PromotionCode> = await stripe.promotionCodes.list({
        limit: 100,
        ...(after ? { starting_after: after } : {}),
      });
      for (const pc of page.data) {
        const couponId = typeof pc.coupon === 'string' ? pc.coupon : pc.coupon?.id;
        const upper = pc.code.toUpperCase();
        const inScheme =
          namedCodes.has(upper) || (!!couponId && coupons.has(couponId) && !otherNamed.has(upper));
        if (!inScheme || !pc.active) continue;
        codesById.set(pc.id, {
          id: pc.id,
          code: pc.code,
          couponId,
          redeemed: pc.times_redeemed ?? 0,
          active: !!pc.active,
          created: new Date(pc.created * 1000).toISOString(),
        });
      }
      if (!page.has_more) break;
      after = page.data[page.data.length - 1].id;
    }

    // ── 2. Every subscription carrying one of those codes, any status ──
    type SubRow = {
      code: string;
      status: string;
      tier: string;
      listAmount: number;
      /** What they pay a month after the coupon. */
      amountMonthly: number;
      started: string;
      cancelAtPeriodEnd: boolean;
      periodEnd: string | null;
      endedAt: string | null;
      customerId: string;
      email: string | null;
      name: string | null;
    };
    const subs: SubRow[] = [];
    after = undefined;
    for (;;) {
      const page: Stripe.ApiList<Stripe.Subscription> = await stripe.subscriptions.list({
        status: 'all',
        limit: 100,
        expand: ['data.items.data.price'],
        ...(after ? { starting_after: after } : {}),
      });
      for (const sub of page.data) {
        const disc = (sub as unknown as { discount?: Stripe.Discount | null }).discount;
        const promo = disc?.promotion_code;
        const promoId = typeof promo === 'string' ? promo : promo?.id;
        if (!promoId) continue;
        const code = codesById.get(promoId);
        if (!code) continue;
        const item = sub.items.data[0];
        const price = item?.price;
        const priceId = typeof price === 'string' ? price : price?.id;
        const known = priceId ? PRICE_TIER[priceId] : undefined;
        const unit = price && typeof price !== 'string' ? (price.unit_amount ?? 0) / 100 : 0;
        const interval = price && typeof price !== 'string' ? price.recurring?.interval : 'month';
        const listAmount = known?.amount ?? (interval === 'year' ? unit / 12 : unit);
        const pct = disc?.coupon?.percent_off ?? 50;
        subs.push({
          code: code.code,
          status: sub.status,
          tier: known?.tier ?? (listAmount >= 9 ? 'electrician' : 'apprentice'),
          listAmount: Math.round(listAmount * 100) / 100,
          amountMonthly: Math.round(listAmount * (1 - pct / 100) * 100) / 100,
          started: new Date(sub.created * 1000).toISOString(),
          cancelAtPeriodEnd: !!sub.cancel_at_period_end,
          periodEnd: sub.current_period_end
            ? new Date(sub.current_period_end * 1000).toISOString()
            : null,
          endedAt: sub.ended_at ? new Date(sub.ended_at * 1000).toISOString() : null,
          customerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
          email: null,
          name: null,
        });
      }
      if (!page.has_more) break;
      after = page.data[page.data.length - 1].id;
    }

    // Who they are, from our side.
    const customerIds = [...new Set(subs.map((s) => s.customerId))];
    if (customerIds.length > 0) {
      const { data: people } = await admin
        .from('profiles')
        .select('id, full_name, stripe_customer_id')
        .in('stripe_customer_id', customerIds);
      const ids = (people ?? []).map((p) => p.id);
      const emailById = new Map<string, string>();
      for (const id of ids) {
        const { data } = await admin.auth.admin.getUserById(id);
        if (data?.user?.email) emailById.set(id, data.user.email);
      }
      const byCustomer = new Map((people ?? []).map((p) => [p.stripe_customer_id as string, p]));
      for (const s of subs) {
        const p = byCustomer.get(s.customerId);
        if (p) {
          s.name = (p.full_name as string | null) ?? null;
          s.email = emailById.get(p.id as string) ?? null;
        }
      }
    }

    // ── 3. Tutor / staff accounts made on Bulk create, by college ──
    const { data: tutorRows } = await admin
      .from('profiles')
      .select(
        'id, full_name, college_org, employer_org, free_access_reason, free_access_granted, onboarding_completed, created_at, role'
      )
      .eq('created_via', 'admin_bulk')
      .not(scheme === 'employer' ? 'employer_org' : 'college_org', 'is', null)
      .is('admin_role', null)
      .order('created_at', { ascending: false })
      .limit(300);
    const tutors: Array<{
      id: string;
      email: string | null;
      name: string | null;
      org: string;
      reason: string | null;
      freeAccess: boolean;
      onboarded: boolean;
      createdAt: string;
      lastSignIn: string | null;
    }> = [];
    for (const t of tutorRows ?? []) {
      const { data } = await admin.auth.admin.getUserById(t.id as string);
      tutors.push({
        id: t.id as string,
        email: data?.user?.email ?? null,
        name: (t.full_name as string | null) ?? null,
        org: (scheme === 'employer' ? t.employer_org : t.college_org) as string,
        reason: (t.free_access_reason as string | null) ?? null,
        freeAccess: !!t.free_access_granted,
        onboarded: !!t.onboarding_completed,
        createdAt: t.created_at as string,
        lastSignIn: data?.user?.last_sign_in_at ?? null,
      });
    }

    // The outreach tracker's college rows, synced into college_outreach so the
    // page can put "where the conversation is" next to "who is using it".
    const { data: outreachRows } = await admin
      .from(scheme === 'employer' ? 'employer_outreach' : 'college_outreach')
      .select(
        'tracker_no, org, org_key, contact, email, org_type, first_emailed, days_silent, stage, where_we_are, why, next_step, follow_up, done, gmail_url, code, signup_link, imported_at'
      )
      .order('tracker_no', { ascending: true });
    const outreach = (outreachRows ?? []).map((o) => ({
      no: o.tracker_no as number,
      org: o.org as string,
      orgKey: o.org_key as string,
      contact: (o.contact as string | null) ?? null,
      email: (o.email as string | null) ?? null,
      type: (o.org_type as string | null) ?? null,
      firstEmailed: (o.first_emailed as string | null) ?? null,
      stage: o.stage as string,
      where: (o.where_we_are as string | null) ?? null,
      why: (o.why as string | null) ?? null,
      nextStep: (o.next_step as string | null) ?? null,
      followUp: (o.follow_up as string | null) ?? null,
      done: !!o.done,
      gmailUrl: (o.gmail_url as string | null) ?? null,
      code: (o.code as string | null) ?? null,
      syncedAt: o.imported_at as string,
    }));

    const payload = {
      generatedAt: new Date().toISOString(),
      scheme,
      codes: [...codesById.values()].sort(
        (a, b) => b.redeemed - a.redeemed || a.code.localeCompare(b.code)
      ),
      subs: subs.sort((a, b) => b.started.localeCompare(a.started)),
      tutors,
      outreach,
    };

    const { error: cacheErr } = await admin
      .from('admin_metric_cache')
      .upsert({ key: CACHE_KEY, value: payload, updated_at: new Date().toISOString() });
    if (cacheErr) console.error('[admin-college-activity] cache upsert failed:', cacheErr.message);

    return json({ ...payload, cachedAt: new Date().toISOString(), servedFromCache: false });
  } catch (err) {
    console.error('[admin-college-activity]', err);
    return json({ error: err instanceof Error ? err.message : 'unknown' }, 500);
  }
});
