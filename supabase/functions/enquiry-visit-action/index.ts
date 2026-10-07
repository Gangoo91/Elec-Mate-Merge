/**
 * Enquiry visit action (ELE-2022): book or decline an AI-suggested site visit.
 *
 * The ONE place a suggested visit gets booked, from the app (signed in) or from
 * the Book / No-visit buttons on the notification (single-use code). It:
 *   - re-checks the slot is still free (diary + booking rules) at the moment of booking
 *   - books into the OWNER's diary, whoever presses the button (co-admins included)
 *   - links or creates the customer WITHOUT closing the enquiry: it stays in
 *     "To reply" until the electrician actually sends the time
 *   - takes the slot off any other enquiry that was offered the same time
 *
 * POST { enquiry_id, action: 'book' | 'decline', slot_index?, token? }
 * verify_jwt = false: auth is a user JWT (app) or the push's single-use code.
 */

import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';
import { proposeVisits, type ProposedSlot } from '../_shared/visit-planner.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const sha256 = async (v: string) =>
  [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v)))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const digits = (v: string | null | undefined) => (v ?? '').replace(/\D/g, '').replace(/^44/, '0');

async function recipients(supabase: SupabaseClient, ownerId: string): Promise<string[]> {
  const { data } = await supabase
    .from('employer_admins')
    .select('user_id')
    .eq('employer_id', ownerId)
    .eq('status', 'active');
  return [ownerId, ...((data ?? []) as { user_id: string }[]).map((a) => a.user_id)];
}

/** UK wall date + "HH:MM" for an instant, to compare with public-booking slots. */
function ukParts(iso: string) {
  const d = new Date(iso);
  const f = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', ...o }).formatToParts(d);
  const get = (parts: Intl.DateTimeFormatPart[], t: string) =>
    parts.find((p) => p.type === t)?.value ?? '';
  const dp = f({ year: 'numeric', month: '2-digit', day: '2-digit' });
  const tp = f({ hour: '2-digit', minute: '2-digit', hour12: false });
  return {
    date: `${get(dp, 'year')}-${get(dp, 'month')}-${get(dp, 'day')}`,
    time: `${get(tp, 'hour').replace('24', '00')}:${get(tp, 'minute')}`,
  };
}

/**
 * Still free? public-booking applies the real rules (working hours, buffers,
 * notice, daily caps AND how many jobs the firm runs at once). Only if it can't
 * be reached do we fall back to a plain "nothing else in the diary" check.
 */
async function stillFree(
  supabase: SupabaseClient,
  ownerId: string,
  slot: ProposedSlot
): Promise<boolean> {
  try {
    const res = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/public-booking?electrician_id=${ownerId}&days=21`,
      {
        headers: { Authorization: `Bearer ${Deno.env.get('SUPABASE_ANON_KEY') ?? ''}` },
        signal: AbortSignal.timeout(6000),
      }
    );
    if (res.ok) {
      const want = ukParts(slot.start);
      const free = ((await res.json())?.slots ?? []) as { date: string; start: string }[];
      return free.some((s) => s.date === want.date && s.start === want.time);
    }
  } catch {
    /* fall through */
  }
  const { count, error } = await supabase
    .from('calendar_events')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', ownerId)
    .eq('all_day', false)
    .lt('start_at', slot.end)
    .gt('end_at', slot.start);
  return !error && (count ?? 0) === 0;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const { enquiry_id, action, slot_index, slot_start, token, start, end } = await req
      .json()
      .catch(() => ({}));
    if (typeof enquiry_id !== 'string' || !['book', 'decline'].includes(action)) {
      return json({ error: 'bad request' }, 400);
    }

    const { data: enq } = await supabase
      .from('enquiries')
      .select(
        'id, user_id, name, email, phone, address, postcode, job_type, job_description, source, status, customer_id, matched_customer_id, proposed_slots, visit_status, visit_action_hash, visit_action_expires_at'
      )
      .eq('id', enquiry_id)
      .maybeSingle();
    if (!enq) return json({ error: 'not found' }, 404);
    const ownerId = enq.user_id as string;

    // ── Who is asking ─────────────────────────────────────────────────
    let actor: string | null = null;
    if (typeof token === 'string' && token) {
      const ok =
        !!enq.visit_action_hash &&
        enq.visit_action_hash === (await sha256(token)) &&
        new Date(enq.visit_action_expires_at as string).getTime() > Date.now();
      if (!ok) return json({ error: 'This button has expired. Open the enquiry instead.' }, 403);
      actor = ownerId;
    } else {
      const jwt = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
      const { data: who } = jwt ? await supabase.auth.getUser(jwt) : { data: null };
      const uid = who?.user?.id;
      if (!uid || !(await recipients(supabase, ownerId)).includes(uid)) {
        return json({ error: 'forbidden' }, 403);
      }
      actor = uid;
    }

    // Dismissed or spam: an old notification's button must not book anything
    if (enq.status === 'dismissed' || enq.status === 'spam') {
      return json(
        { error: `This enquiry was ${enq.status === 'spam' ? 'marked as spam' : 'dismissed'}.` },
        410
      );
    }

    if (enq.visit_status === 'booked') {
      const { data: b2 } = await supabase
        .from('enquiries')
        .select('visit_start')
        .eq('id', enq.id)
        .maybeSingle();
      return json({ ok: true, already: true, visit_start: b2?.visit_start ?? null });
    }

    // ── No visit ──────────────────────────────────────────────────────
    if (action === 'decline') {
      await supabase
        .from('enquiries')
        .update({ visit_status: 'declined', visit_action_hash: null })
        .eq('id', enq.id);
      return json({ ok: true, declined: true });
    }

    // ── Book ──────────────────────────────────────────────────────────
    // A time the electrician typed in ("Other time", signed-in only) or one of the suggestions
    const custom =
      !token && typeof start === 'string' && typeof end === 'string'
        ? (() => {
            const s0 = new Date(start);
            const e0 = new Date(end);
            const mins = (e0.getTime() - s0.getTime()) / 60000;
            if (Number.isNaN(mins) || mins <= 0 || mins > 12 * 60) return null;
            return {
              start: s0.toISOString(),
              end: e0.toISOString(),
              label: '',
              reason: 'Chosen by you',
              near_miles: null,
            } as ProposedSlot;
          })()
        : null;
    const slots = (enq.proposed_slots ?? []) as ProposedSlot[];
    // Match the time the person SAW (slot_start), never a position that may have shifted
    const slot =
      custom ??
      (typeof slot_start === 'string'
        ? slots.find((x) => x.start === new Date(slot_start).toISOString())
        : slots[Number.isInteger(slot_index) ? slot_index : 0]);
    if (!slot) {
      return json(
        {
          error: 'taken',
          message: 'That time is no longer on offer. Open the enquiry for fresh times.',
          proposals: slots,
        },
        409
      );
    }
    if (custom) {
      slot.label = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date(slot.start));
    }

    const tooSoon = !custom && new Date(slot.start).getTime() < Date.now() + 30 * 60_000;
    // A time the electrician chose themselves is booked as asked; suggestions are re-checked
    if (tooSoon || (!custom && !(await stillFree(supabase, ownerId, slot)))) {
      // Offer fresh times rather than a dead end
      const { data: loc } = await supabase
        .from('enquiries')
        .select('latitude, longitude, availability')
        .eq('id', enq.id)
        .maybeSingle();
      const fresh = await proposeVisits(
        supabase,
        ownerId,
        loc?.latitude != null ? { latitude: loc.latitude, longitude: loc.longitude } : null,
        loc?.availability ?? null
      );
      await supabase
        .from('enquiries')
        .update({ proposed_slots: fresh, visit_status: fresh.length ? 'proposed' : null })
        .eq('id', enq.id);
      return json(
        {
          error: 'taken',
          message: `${slot.label} has gone. Here are fresh times.`,
          proposals: fresh,
        },
        409
      );
    }

    // Claim it first, so two taps (web + phone, two co-admins) can't both book
    const { data: claimed, error: claimErr } = await supabase.rpc('claim_enquiry_visit', {
      p_id: enq.id,
    });
    if (claimErr) throw claimErr;
    if (!claimed) return json({ ok: true, already: true });
    const release = () =>
      supabase
        .from('enquiries')
        .update({ visit_status: slots.length ? 'proposed' : null })
        .eq('id', enq.id)
        .eq('visit_status', 'booked')
        .is('calendar_event_id', null);

    try {
      // Customer: linked, matched, found by phone/email, or created (enquiry stays open)
      let customerId = (enq.customer_id ?? enq.matched_customer_id) as string | null;
      if (!customerId && (enq.email || enq.phone)) {
        if (enq.email) {
          const { data } = await supabase
            .from('customers')
            .select('id')
            .eq('user_id', ownerId)
            .ilike(
              'email',
              String(enq.email).replace(/[\\%_]/g, (m) => '\\' + m)
            )
            .limit(1);
          customerId = (data?.[0]?.id as string) ?? null;
        }
        const tail = digits(enq.phone as string).slice(-10);
        if (!customerId && tail.length === 10) {
          const { data } = await supabase
            .from('customers')
            .select('id, phone')
            .eq('user_id', ownerId)
            .ilike('phone', '%' + tail.slice(-6).split('').join('%'))
            .limit(100);
          customerId =
            ((data ?? []) as { id: string; phone: string }[]).find(
              (c) => digits(c.phone).slice(-10) === tail
            )?.id ?? null;
        }
      }
      if (!customerId) {
        const name = (enq.name || enq.email || enq.phone || 'New customer') as string;
        const { data: created, error } = await supabase
          .from('customers')
          .insert({
            user_id: ownerId,
            name,
            email: (enq.email as string | null)?.toLowerCase() ?? null,
            phone: enq.phone ?? null,
            address: enq.address ?? null,
            postcode: enq.postcode ?? null,
            notes: enq.job_description ? `Enquiry: ${enq.job_description}` : null,
            tags: ['enquiry', enq.source],
          })
          .select('id')
          .single();
        if (error) throw error;
        customerId = created.id as string;
      }

      const { data: g } = await supabase
        .from('google_calendar_tokens')
        .select('sync_enabled')
        .eq('user_id', ownerId)
        .maybeSingle();

      const { data: event, error: evErr } = await supabase
        .from('calendar_events')
        .insert({
          user_id: ownerId,
          title: `Site visit: ${enq.name ?? 'enquiry'}${enq.job_type ? ` (${enq.job_type})` : ''}`,
          description: enq.job_description ?? null,
          start_at: slot.start,
          end_at: slot.end,
          all_day: false,
          location:
            (enq.address &&
            enq.postcode &&
            enq.address
              .toUpperCase()
              .replace(/\s+/g, '')
              .includes(enq.postcode.toUpperCase().replace(/\s+/g, ''))
              ? enq.address
              : [enq.address, enq.postcode].filter(Boolean).join(', ')) || null,
          client_id: customerId,
          event_type: 'site_visit',
          colour: '#10B981',
          recurring: false,
          reminder_minutes: 60,
          sync_status: g?.sync_enabled ? 'pending_push' : 'local_only',
        })
        .select('id')
        .single();
      if (evErr) throw evErr;

      const { error: upErr } = await supabase
        .from('enquiries')
        .update({
          customer_id: customerId,
          calendar_event_id: event.id,
          visit_status: 'booked',
          visit_start: slot.start,
          visit_action_hash: null,
        })
        .eq('id', enq.id);
      if (upErr) {
        // Keep it consistent: no orphan diary entry
        await supabase.from('calendar_events').delete().eq('id', event.id);
        throw upErr;
      }

      // That time is gone for any other enquiry it was offered to
      const { data: others } = await supabase
        .from('enquiries')
        .select('id, proposed_slots')
        .eq('user_id', ownerId)
        .eq('visit_status', 'proposed')
        .neq('id', enq.id)
        .limit(100);
      for (const o of (others ?? []) as { id: string; proposed_slots: ProposedSlot[] }[]) {
        const keep = (o.proposed_slots ?? []).filter(
          (s) => !(s.start < slot.end && s.end > slot.start)
        );
        if (keep.length !== (o.proposed_slots ?? []).length) {
          await supabase
            .from('enquiries')
            .update({ proposed_slots: keep, visit_status: keep.length ? 'proposed' : null })
            .eq('id', o.id);
        }
      }

      // Into Google now, not on the next 15-minute sweep (bookings from a
      // notification never open the diary, which is what normally nudges it)
      const after = (async () => {
        if (g?.sync_enabled) {
          await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/sync-google-calendar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            },
            body: JSON.stringify({ user_id: ownerId }),
            signal: AbortSignal.timeout(20000),
          }).catch((e) => console.error('[enquiry-visit-action] google push failed', e));
        }
        // On the customer's timeline, like every other visit and email
        await supabase.from('customer_activity_log').insert({
          customer_id: customerId,
          user_id: ownerId,
          activity_type: 'visit',
          title: `Site visit booked: ${slot.label}`,
          description:
            [enq.job_type, enq.job_description].filter(Boolean).join(' · ').slice(0, 500) || null,
          metadata: { enquiry_id: enq.id, calendar_event_id: event.id, source: enq.source },
        });
      })().catch((e) => console.error('[enquiry-visit-action] after-booking failed', e));
      const rt = (globalThis as { EdgeRuntime?: { waitUntil: (p: Promise<unknown>) => void } })
        .EdgeRuntime;
      if (rt?.waitUntil) rt.waitUntil(after);
      else await after;

      return json({
        ok: true,
        booked: true,
        label: slot.label,
        visit_start: slot.start,
        calendar_event_id: event.id,
        actor,
      });
    } catch (bookErr) {
      await release(); // a failure part-way leaves it bookable again
      throw bookErr;
    }
  } catch (err) {
    console.error('[enquiry-visit-action] failed', err);
    await captureException(err, {
      functionName: 'enquiry-visit-action',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: 'Something went wrong. Open the enquiry to book.' }, 500);
  }
});
