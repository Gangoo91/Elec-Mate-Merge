/**
 * Colleges (and, through SchemePage, Employers).
 *
 * The scheme in one place: who we have written to and where that
 * conversation is, who holds codes, who is actually sharing them (a
 * redemption is the only proof), who is on a trial, who is paying, what that
 * is worth a month, and the tutors we have set up and whether they have
 * logged in. Conversations come from the outreach tracker (college_outreach),
 * catalogue from promo_offers, take-up from Stripe, tutors from the accounts
 * Bulk create made. On top sits "what to do next": the rules that turn all of
 * that into a short list. Nothing here counts as a signup or a paying
 * customer anywhere else on the panel.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw, ChevronRight, ExternalLink, Copy, Check } from 'lucide-react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { PageFrame, IconButton } from '@/components/admin/editorial';
import {
  GOOD,
  YELLOW,
  SERIOUS,
  DE_EMPHASIS,
  gbp,
  KpiTile,
  Panel,
  SectionHead,
  StackBar,
  Legend,
  StateDot,
  Sparkline,
  BLUE,
  AQUA,
} from '@/components/admin/overview/primitives';
import { useCollegeScheme, type CollegeCode } from '@/hooks/useCollegeScheme';
import {
  useCollegeActivity,
  COLLEGE_ACTIVITY_QUERY_KEY,
  type CollegeSubRow,
  type CollegeTutorRow,
  type CollegeOutreachRow,
  type SchemeKind,
  activityQueryKey,
} from '@/hooks/useCollegeActivity';

/* "Birmingham Electrical Training (BET)" and "Birmingham Electrical Training"
   are the same place; so are "HRUC" and "HRUC (Harrow Richmond Uxbridge)". */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/\b(the|college|colleges|group|of|and|&|ltd|limited)\b/g, ' ')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
/* Initials, so "NSCG" finds "Newcastle & Stafford Colleges Group". */
const initialsOfOrg = (s: string) =>
  s
    .replace(/\(.*?\)/g, ' ')
    .split(/[^a-z0-9]+/i)
    .filter((w) => w && !/^(the|of|and|&)$/i.test(w))
    .map((w) => w[0].toUpperCase())
    .join('');
const sameOrg = (a: string, b: string) => {
  const x = norm(a);
  const y = norm(b);
  if (!x || !y) return false;
  if (x === y) return true;
  // "Newcastle College" must not swallow "Newcastle & Stafford Colleges Group",
  // so no prefix matching: only an acronym against the full name.
  const ax = a.replace(/\(.*?\)/g, '').trim();
  const bx = b.replace(/\(.*?\)/g, '').trim();
  return (
    (/^[A-Z]{3,6}$/.test(ax) && initialsOfOrg(bx) === ax) ||
    (/^[A-Z]{3,6}$/.test(bx) && initialsOfOrg(ax) === bx)
  );
};

const ago = (iso: string | null) =>
  iso ? formatDistanceToNowStrict(parseISO(iso), { addSuffix: true }) : 'never';
const day = (iso: string) => {
  const d = parseISO(iso);
  return `${d.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()]}`;
};
const initialsOf = (name: string | null, email: string | null) => {
  const base = (name && name.trim()) || (email ? email.split('@')[0] : '?');
  const parts = base.split(/[\s._-]+/).filter((w) => /^[a-z]/i.test(w));
  return (
    parts
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('') ||
    base[0] ||
    '?'
  ).toUpperCase();
};

const PAYING = new Set(['active']);
const TRIAL = new Set(['trialing']);
const DAY = 86_400_000;

/* The tracker's stages, in the order they matter, with a colour each. */
const OUTREACH_STAGES: Record<string, { rank: number; color: string; short: string }> = {
  'Needs me': { rank: 0, color: SERIOUS, short: 'Needs you' },
  Hot: { rank: 1, color: YELLOW, short: 'Hot' },
  'Meeting booked': { rank: 2, color: GOOD, short: 'Meeting booked' },
  'Waiting on them': { rank: 3, color: BLUE, short: 'Waiting on them' },
  Bounced: { rank: 4, color: SERIOUS, short: 'Bounced' },
  'No reply yet': { rank: 5, color: DE_EMPHASIS, short: 'No reply yet' },
  'Declined / closed': { rank: 6, color: DE_EMPHASIS, short: 'Closed' },
};
const outreachStage = (stage: string) =>
  OUTREACH_STAGES[stage] ?? { rank: 5, color: DE_EMPHASIS, short: stage };
/** A conversation is alive when they have written back or we are due to. */
const REPLIED = new Set(['Needs me', 'Hot', 'Meeting booked', 'Waiting on them']);
const firstName = (s: string | null) => (s ?? '').trim().split(/\s+/)[0] || '';
/** "George Norton (On-site WBL Lead, 07824…) · Katy Bagnall (…)" → "George Norton". */
const contactName = (s: string | null) =>
  (s ?? '')
    .split(/\s[·/|]\s/)[0]
    .replace(/\(.*?\)/g, ' ')
    .replace(/\b0\d{9,10}\b/g, ' ')
    .split(/\s[–—-]\s/)[0]
    .replace(/\s+/g, ' ')
    .trim();
/** Stripe hands back "kye ormrod" as typed; the page should not. */
const properName = (s: string | null) =>
  s ? s.replace(/(^|\s)([a-z])/g, (_, sp: string, c: string) => sp + c.toUpperCase()) : null;
/** Tracker notes carry markers like "🔴" and rarely end in a full stop. */
const tidy = (s: string | null | undefined) => {
  const t = (s ?? '').replace(/^[^A-Za-z0-9£"'(]+/, '').trim();
  return t && !/[.!?)]$/.test(t) ? `${t}.` : t;
};
const daysSince = (iso: string | null) =>
  iso ? Math.floor((Date.now() - parseISO(iso).getTime()) / DAY) : null;
const daysUntil = (iso: string | null) =>
  iso ? Math.ceil((parseISO(iso).getTime() - Date.now()) / DAY) : null;

/** One thing to do, built by the rules below. Lower priority comes first. */
interface NextAction {
  key: string;
  priority: number;
  color: string;
  title: string;
  detail: string;
  href?: string;
  external?: boolean;
  /** Addresses to copy for a batch chase. */
  emails?: string[];
}

interface OrgRow {
  org: string;
  apprentice?: CollegeCode & { redeemed: number };
  electrician?: CollegeCode & { redeemed: number };
  redeemed: number;
  subs: CollegeSubRow[];
  trialing: number;
  paying: number;
  gone: number;
  mrr: number;
  tutors: CollegeTutorRow[];
  tutorsIn: number;
  lastSignup: string | null;
  /** Where the conversation is, from the outreach tracker. */
  outreach?: CollegeOutreachRow;
}
/** Sort key for the conversation: replied and alive first. */
const r_rank = (r: OrgRow) =>
  r.outreach && !r.outreach.done ? outreachStage(r.outreach.stage).rank : 9;
const emptyRow = (org: string): OrgRow => ({
  org,
  redeemed: 0,
  subs: [],
  trialing: 0,
  paying: 0,
  gone: 0,
  mrr: 0,
  tutors: [],
  tutorsIn: 0,
  lastSignup: null,
});

/* One page, two schemes. Everything college-specific in the words lives here. */
const SCHEME_COPY = {
  college: {
    title: 'Colleges',
    blurb:
      'Who we have written to and where that stands, who holds a code, who is sharing it, who is on a trial or paying, and the tutors we have set up. Conversations come from the outreach tracker, take-up from Stripe. None of this counts as a signup or a paying customer anywhere else on the panel.',
    person: 'tutor',
    people: 'tutors',
    accounts: 'Tutor accounts',
    accountsFoot: '{T.accountsFoot}',
    orgsWord: 'colleges and providers',
    learner: 'learner',
    learners: 'learners',
    discount: 'after the 50%',
    inLabel: 'Tutor in',
    setUpLabel: 'Tutors set up',
    noneYet: 'No college has used a code yet.',
    signupsFoot:
      'From Stripe: any subscription carrying a college code, newest first. App Store and Google Play sign-ups cannot use codes, so they never appear here.',
    nobody: 'Nobody has signed up with a college code yet.',
    shareAsk: 'put the code in front of a class',
    tableHead: 'Tutors',
  },
  employer: {
    title: 'Employers',
    blurb:
      'Every employer we have written to and where that stands, who holds codes, who is sharing them, who is on a trial or paying, and the owners and managers we have given accounts to. Conversations come from the outreach tracker, take-up from Stripe. None of this counts as a signup or a paying customer anywhere else on the panel.',
    person: 'contact',
    people: 'contacts',
    accounts: 'Employer accounts',
    accountsFoot:
      'Free, full-app accounts for an owner or manager to judge it for their team, made on Bulk create with the employer switch on. Kept out of signup and paying numbers everywhere.',
    orgsWord: 'employers',
    learner: 'person',
    learners: 'people',
    discount: 'after the discount',
    inLabel: 'Owner in',
    setUpLabel: 'Account set up',
    noneYet: 'No employer has used a code yet.',
    signupsFoot:
      'From Stripe: any subscription carrying an employer code, newest first. App Store and Google Play sign-ups cannot use codes, so they never appear here.',
    nobody: 'Nobody has signed up with an employer code yet.',
    shareAsk: 'put the codes in the team WhatsApp',
    tableHead: 'Accounts',
  },
} as const;
type Copy = (typeof SCHEME_COPY)[keyof typeof SCHEME_COPY];

export function SchemePage({ scheme: kind }: { scheme: SchemeKind }) {
  const T: Copy = SCHEME_COPY[kind];
  const qc = useQueryClient();
  const { data: scheme, isLoading: schemeLoading } = useCollegeScheme();
  const {
    data: activity,
    isLoading: activityLoading,
    isFetching,
    error,
  } = useCollegeActivity(kind);
  const [showQuiet, setShowQuiet] = useState(false);
  const [showAllActions, setShowAllActions] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const loading = schemeLoading || activityLoading;

  const model = useMemo(() => {
    const codes = (scheme?.codes ?? []).filter((c) => c.scheme === kind);
    const redeemedByCode = new Map((activity?.codes ?? []).map((c) => [c.code, c.redeemed]));
    const subsByCode = new Map<string, CollegeSubRow[]>();
    for (const s of activity?.subs ?? []) {
      const list = subsByCode.get(s.code) ?? [];
      list.push(s);
      subsByCode.set(s.code, list);
    }
    // Keyed by the normalised name: "Birmingham Electrical Training (BET)" and
    // "Birmingham Electrical Training" are one place, so are "Newcastle & Stafford
    // Colleges Group" and "Newcastle and Stafford Colleges Group".
    const byOrg = new Map<string, OrgRow>();
    for (const c of codes) {
      const key = norm(c.org) || c.org;
      const row = byOrg.get(key) ?? emptyRow(c.org);
      // Keep the fuller name when two spellings meet.
      if (c.org.length > row.org.length) row.org = c.org;
      const slot = { ...c, redeemed: redeemedByCode.get(c.code) ?? 0 };
      if (c.tier === 'electrician') row.electrician = slot;
      else row.apprentice = slot;
      row.redeemed += slot.redeemed;
      for (const s of subsByCode.get(c.code) ?? []) {
        row.subs.push(s);
        if (PAYING.has(s.status)) {
          row.paying += 1;
          row.mrr += s.amountMonthly;
        } else if (TRIAL.has(s.status)) row.trialing += 1;
        else row.gone += 1;
        if (!row.lastSignup || s.started > row.lastSignup) row.lastSignup = s.started;
      }
      byOrg.set(key, row);
    }
    // Tutors attach to the org whose name matches; the rest get their own row.
    const orphans: CollegeTutorRow[] = [];
    for (const t of activity?.tutors ?? []) {
      let hit: OrgRow | undefined;
      for (const row of byOrg.values())
        if (sameOrg(row.org, t.org)) {
          hit = row;
          break;
        }
      if (hit) hit.tutors.push(t);
      else orphans.push(t);
    }
    for (const t of orphans) {
      const key = norm(t.org) || t.org;
      const row = byOrg.get(key) ?? emptyRow(t.org);
      row.tutors.push(t);
      byOrg.set(key, row);
    }
    // Conversations attach by code first (the tracker carries the learner
    // code), then by name. One row per org: the liveliest, undone one wins.
    const codeOwner = new Map<string, OrgRow>();
    for (const row of byOrg.values()) {
      if (row.apprentice) codeOwner.set(row.apprentice.code, row);
      if (row.electrician) codeOwner.set(row.electrician.code, row);
    }
    const outreachAll = activity?.outreach ?? [];
    for (const o of outreachAll) {
      let hit = o.code ? codeOwner.get(o.code) : undefined;
      if (!hit) hit = byOrg.get(o.orgKey);
      if (!hit)
        for (const row of byOrg.values())
          if (sameOrg(row.org, o.org)) {
            hit = row;
            break;
          }
      if (!hit) {
        hit = emptyRow(o.org);
        byOrg.set(o.orgKey || o.org, hit);
      }
      const cur = hit.outreach;
      const better =
        !cur ||
        (cur.done && !o.done) ||
        (cur.done === o.done && outreachStage(o.stage).rank < outreachStage(cur.stage).rank);
      if (better) hit.outreach = o;
      // "Trade Skills 4U — Birchwood" is reached through "Trade Skills 4U".
      for (const row of byOrg.values())
        if (row !== hit && !row.outreach && row.org.startsWith(`${o.org} — `)) row.outreach = o;
    }
    for (const row of byOrg.values()) {
      row.tutorsIn = row.tutors.filter((t) => !!t.lastSignIn).length;
      row.mrr = Math.round(row.mrr * 100) / 100;
    }
    const rows = [...byOrg.values()].sort(
      (a, b) =>
        b.paying - a.paying ||
        b.trialing - a.trialing ||
        b.redeemed - a.redeemed ||
        r_rank(a) - r_rank(b) ||
        b.tutors.length - a.tutors.length ||
        a.org.localeCompare(b.org)
    );
    const live = rows.filter(
      (r) =>
        r.redeemed > 0 ||
        r.subs.length > 0 ||
        r.tutors.length > 0 ||
        (r.outreach && REPLIED.has(r.outreach.stage))
    );
    const quiet = rows.filter((r) => !live.includes(r));
    const tutors = activity?.tutors ?? [];
    const subs = activity?.subs ?? [];
    const contacted = rows.filter((r) => !!r.outreach);
    const replied = contacted.filter((r) => REPLIED.has(r.outreach!.stage));

    /* ── What to do next ──
       Rules, not a to-do list anyone has to maintain. Each one names the
       person and the org, says why, and links straight to the thread or the
       account. */
    const actions: NextAction[] = [];
    const orgOf = (code: string) => codeOwner.get(code)?.org ?? code;
    for (const r of rows) {
      const o = r.outreach;
      if (o && !o.done && o.stage === 'Needs me')
        actions.push({
          key: `reply-${o.no}`,
          priority: 0,
          color: SERIOUS,
          title: `Get back to ${contactName(o.contact) || o.org}${contactName(o.contact) ? `, ${r.org}` : ''}`,
          detail: tidy(o.nextStep) || tidy(o.where) || 'They are waiting on you.',
          href: o.gmailUrl ?? undefined,
          external: !!o.gmailUrl,
        });
      if (o && !o.done && o.stage === 'Bounced')
        actions.push({
          key: `bounce-${o.no}`,
          priority: 2,
          color: SERIOUS,
          title: `Find another address for ${r.org}`,
          detail: tidy(o.nextStep) || tidy(o.why) || `${o.email ?? 'The address'} bounced.`,
          href: o.gmailUrl ?? undefined,
          external: !!o.gmailUrl,
        });
      // Tutors who have not been in after three days, one line per college so
      // five NSCG accounts do not become five rows.
      const notIn = r.tutors.filter((t) => !t.lastSignIn && (daysSince(t.createdAt) ?? 0) >= 3);
      if (notIn.length > 0) {
        const names = notIn.map((t) => firstName(t.name) || t.email || `a ${T.person}`);
        const oldest = notIn.reduce(
          (m, t) => (t.createdAt < m ? t.createdAt : m),
          notIn[0].createdAt
        );
        actions.push({
          key: `tutor-${r.org}`,
          priority: 3,
          color: YELLOW,
          title:
            notIn.length === 1
              ? `Nudge ${names[0]} at ${r.org}`
              : `Nudge ${r.org}: ${notIn.length} of ${r.tutors.length} ${T.people} not been in`,
          detail: `${
            notIn.length === 1 ? 'Account' : `${names.join(', ')}. Accounts`
          } made ${day(oldest)}, ${daysSince(oldest)} days ago, and not logged in yet. A one-line "did the login come through?" usually does it.`,
          href: `/admin/users?q=${encodeURIComponent(notIn[0].email ?? '')}`,
        });
      }
      const idle = daysSince(r.lastSignup);
      if (r.subs.length > 0 && idle !== null && idle >= 7) {
        const tutor = r.tutors.find((t) => !!t.lastSignIn) ?? r.tutors[0];
        const who = tutor
          ? firstName(tutor.name) || tutor.email
          : contactName(o?.contact ?? null) || null;
        actions.push({
          key: `share-${r.org}`,
          priority: 4,
          color: AQUA,
          title: who ? `Ask ${who} to ${T.shareAsk}` : `Ask ${r.org} to ${T.shareAsk}`,
          detail: `${r.org}: ${r.subs.length} signed up, the last on ${day(r.lastSignup as string)}, nothing since.`,
          href: o?.gmailUrl ?? undefined,
          external: !!o?.gmailUrl,
        });
      }
      if (o && !o.done && REPLIED.has(o.stage) && o.stage !== 'Needs me') {
        const due = daysUntil(o.followUp);
        if (due !== null && due <= 0)
          actions.push({
            key: `chase-${o.no}`,
            priority: 5,
            color: BLUE,
            title: `${o.stage === 'Meeting booked' ? 'Meeting with' : 'Chase'} ${contactName(o.contact) || r.org}${contactName(o.contact) ? `, ${r.org}` : ''}`,
            detail: `${tidy(o.nextStep) || tidy(o.where) || 'Follow up.'} ${
              due === 0
                ? 'Due today.'
                : `Due ${day(o.followUp as string)}, ${-due} day${due === -1 ? '' : 's'} ago.`
            }`,
            href: o.gmailUrl ?? undefined,
            external: !!o.gmailUrl,
          });
      }
    }
    for (const s of subs) {
      const due = daysUntil(s.periodEnd);
      if (TRIAL.has(s.status) && due !== null && due >= 0 && due <= 2)
        actions.push({
          key: `trial-${s.customerId}-${s.started}`,
          priority: 1,
          color: s.cancelAtPeriodEnd ? SERIOUS : GOOD,
          title: s.cancelAtPeriodEnd
            ? `${properName(s.name) || s.email || 'Someone'} at ${orgOf(s.code)} is cancelling`
            : `Watch ${properName(s.name) || s.email || 'someone'} at ${orgOf(s.code)}`,
          detail: s.cancelAtPeriodEnd
            ? `Trial ends ${day(s.periodEnd as string)} and they have already cancelled. Worth a word with the ${T.person}.`
            : `Trial ends ${day(s.periodEnd as string)}, then ${gbp(s.amountMonthly, 2)}/mo. First money from ${orgOf(s.code)} if it sticks.`,
        });
    }
    // The Tuesday chase: everyone we emailed a week or more ago who has not
    // written back, as one line with the addresses ready to copy.
    const chase = outreachAll.filter(
      (o) =>
        !o.done && o.stage === 'No reply yet' && !!o.email && (daysSince(o.firstEmailed) ?? 0) >= 7
    );
    const chaseEmails = [...new Set(chase.map((o) => (o.email as string).toLowerCase()))];
    if (chaseEmails.length > 0)
      actions.push({
        key: 'tuesday-chase',
        priority: 6,
        color: DE_EMPHASIS,
        title: `Tuesday chase: ${chaseEmails.length} emailed a week or more ago, no reply`,
        detail:
          'One short "did this reach the right person?" to the lot. Copy the addresses and send it from Gmail as bcc.',
        emails: chaseEmails,
      });
    // A conversation shared by several rows (TS4U's centres) must not list twice.
    const seenKeys = new Set<string>();
    const unique = actions.filter((a) => !seenKeys.has(a.key) && seenKeys.add(a.key));
    unique.sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));

    return {
      rows,
      live,
      quiet,
      actions: unique,
      contacted: contacted.length,
      replied: replied.length,
      syncedAt: outreachAll.reduce<string | null>(
        (m, o) => (!m || o.syncedAt > m ? o.syncedAt : m),
        null
      ),
      orgs: rows.filter((r) => r.apprentice || r.electrician).length,
      sharing: rows.filter((r) => r.redeemed > 0 || r.subs.length > 0).length,
      signedUp: subs.length,
      trialing: subs.filter((s) => TRIAL.has(s.status)).length,
      paying: subs.filter((s) => PAYING.has(s.status)).length,
      gone: subs.filter((s) => !TRIAL.has(s.status) && !PAYING.has(s.status)).length,
      mrr:
        Math.round(
          subs.filter((s) => PAYING.has(s.status)).reduce((t, s) => t + s.amountMonthly, 0) * 100
        ) / 100,
      tutors,
      tutorsIn: tutors.filter((t) => !!t.lastSignIn).length,
      recent: [...subs].sort((a, b) => b.started.localeCompare(a.started)).slice(0, 30),
      // Sign-ups per day over the last 30 days, for the tile's sparkline.
      daily: (() => {
        const out: number[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (let i = 29; i >= 0; i--) {
          const d = new Date(today.getTime() - i * 86_400_000);
          const key = d.toISOString().slice(0, 10);
          out.push(subs.filter((s) => s.started.slice(0, 10) === key).length);
        }
        return out;
      })(),
      // Trials that end in the next 14 days — the moment a learner becomes revenue.
      ending: subs
        .filter((s) => TRIAL.has(s.status) && s.periodEnd)
        .filter((s) => {
          const t = parseISO(s.periodEnd as string).getTime();
          return t >= Date.now() - 86_400_000 && t <= Date.now() + 14 * 86_400_000;
        })
        .sort((a, b) => (a.periodEnd as string).localeCompare(b.periodEnd as string)),
    };
  }, [scheme, activity, kind, T]);

  /** One word on where an organisation is, for the row. */
  const stageOf = (r: OrgRow) =>
    r.paying > 0
      ? { label: 'Paying', color: GOOD }
      : r.trialing > 0
        ? { label: 'On trial', color: YELLOW }
        : r.redeemed > 0
          ? { label: 'Code used', color: AQUA }
          : r.tutorsIn > 0
            ? { label: T.inLabel, color: BLUE }
            : r.tutors.length > 0
              ? { label: T.setUpLabel, color: DE_EMPHASIS }
              : { label: 'Code only', color: DE_EMPHASIS };

  const kpiCn =
    'border-t border-white/[0.1] lg:border-t-0 lg:border-l lg:pl-5 first:border-0 first:pl-0';
  const refresh = () => qc.invalidateQueries({ queryKey: activityQueryKey(kind) });

  const orgFor = (code: string) =>
    model.rows.find((r) => r.apprentice?.code === code || r.electrician?.code === code)?.org ??
    code;
  const copyEmails = async (a: NextAction) => {
    if (!a.emails?.length) return;
    try {
      await navigator.clipboard.writeText(a.emails.join(', '));
      setCopied(a.key);
      window.setTimeout(() => setCopied((k) => (k === a.key ? null : k)), 2000);
    } catch {
      /* clipboard blocked: nothing to do, the addresses are in the tracker */
    }
  };
  const shownActions = showAllActions ? model.actions : model.actions.slice(0, 8);
  /** The conversation stage for a row, or nothing if we never wrote to them. */
  const convoOf = (r: OrgRow) => {
    const o = r.outreach;
    if (!o) return null;
    const contact = contactName(o.contact) || null;
    if (o.done) return { label: 'Done', color: DE_EMPHASIS, contact };
    const st = outreachStage(o.stage);
    return { label: st.short, color: st.color, contact };
  };

  return (
    <PageFrame className="space-y-5 sm:space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
            {T.title}
          </h1>
          <div className="mt-0.5 text-[12px] text-white">{T.blurb}</div>
        </div>
        <IconButton aria-label="Refresh" onClick={() => void refresh()}>
          <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
        </IconButton>
      </div>

      {error && (
        <Panel>
          <div className="text-[13px] text-white">
            Could not load the Stripe side:{' '}
            {error instanceof Error ? error.message : 'unknown error'}. The catalogue still shows
            below.
          </div>
        </Panel>
      )}

      {/* ── The numbers ── */}
      <Panel>
        <div className="grid grid-cols-2 lg:grid-cols-6">
          <KpiTile
            label="Contacted"
            value={loading ? '—' : model.contacted}
            definition={`${model.replied} written back · ${model.orgs} ${T.orgsWord} hold codes`}
            className={kpiCn}
          />
          <KpiTile
            label="Sharing"
            value={loading ? '—' : model.sharing}
            definition={`at least one ${T.learner} used the code`}
            className={cn(kpiCn, 'border-t-0')}
          />
          <KpiTile
            label="Signed up"
            value={loading ? '—' : model.signedUp}
            definition={`${model.trialing} on trial · ${model.gone} gone`}
            viz={model.signedUp > 0 ? <Sparkline series={model.daily} /> : undefined}
            className={kpiCn}
          />
          <KpiTile
            label="Paying now"
            value={loading ? '—' : model.paying}
            definition="active after the trial"
            className={kpiCn}
          />
          <KpiTile
            label="MRR from codes"
            value={loading ? '—' : gbp(model.mrr, 2)}
            definition={`what they pay, ${T.discount}`}
            className={kpiCn}
          />
          <KpiTile
            label={T.accounts}
            value={loading ? '—' : model.tutors.length}
            definition={`${model.tutorsIn} have logged in`}
            className={kpiCn}
          />
        </div>
        {model.ending.length > 0 && (
          <div className="mt-3 border-t border-white/[0.08] pt-3 text-[13px] leading-5 text-white">
            <span className="font-semibold">First money: </span>
            {model.ending.slice(0, 4).map((s, i) => (
              <span key={`${s.customerId}-${i}`}>
                {i > 0 ? ' · ' : ''}
                {properName(s.name) || s.email || orgFor(s.code)} ({orgFor(s.code)}) trial ends{' '}
                {day(s.periodEnd as string)}, then {gbp(s.amountMonthly, 2)}/mo
              </span>
            ))}
            {model.ending.length > 4 ? ` · +${model.ending.length - 4} more` : ''}
          </div>
        )}
        {model.signedUp > 0 && (
          <div className="mt-2">
            <StackBar
              segments={[
                { value: model.paying, color: GOOD, label: 'Paying' },
                { value: model.trialing, color: YELLOW, label: 'On trial' },
                { value: model.gone, color: DE_EMPHASIS, label: 'Gone' },
              ]}
            />
            <Legend
              items={[
                { label: 'Paying', value: model.paying, color: GOOD },
                { label: 'On trial', value: model.trialing, color: YELLOW },
                { label: 'Gone', value: model.gone, color: DE_EMPHASIS },
              ]}
            />
          </div>
        )}
      </Panel>

      {/* ── What to do next ── */}
      <Panel>
        <SectionHead
          title="What to do next"
          meta={
            loading
              ? 'loading…'
              : model.actions.length === 0
                ? 'nothing waiting'
                : `${model.actions.length} thing${model.actions.length === 1 ? '' : 's'} · built from the rules below, nothing to maintain`
          }
          action={
            model.actions.length > 8 ? (showAllActions ? 'Show fewer' : 'Show all') : undefined
          }
          onAction={() => setShowAllActions((v) => !v)}
          className="min-h-0"
        />
        {!loading && model.actions.length === 0 && (
          <div className="mt-3 text-[13px] leading-5 text-white">
            Nothing needs you. Replies, bounces, {T.people} who have not logged in, trials about to
            end and the Tuesday chase all land here when they happen.
          </div>
        )}
        <div className="mt-1 divide-y divide-white/[0.08]">
          {shownActions.map((a) => {
            const body = (
              <>
                <span
                  className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                  style={{ background: a.color }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium leading-5 text-white">{a.title}</div>
                  <div className="text-[12px] leading-[18px] text-white/80">{a.detail}</div>
                </div>
              </>
            );
            if (a.emails)
              return (
                <div key={a.key} className="flex min-h-[52px] items-start gap-3 py-2.5">
                  {body}
                  <button
                    type="button"
                    onClick={() => void copyEmails(a)}
                    className="flex h-11 shrink-0 touch-manipulation items-center gap-1.5 rounded-md border border-white/[0.14] px-3 text-[12px] font-medium text-white transition-colors active:bg-white/[0.06]"
                  >
                    {copied === a.key ? (
                      <Check className="h-3.5 w-3.5" style={{ color: GOOD }} />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied === a.key ? 'Copied' : `Copy ${a.emails.length}`}
                  </button>
                </div>
              );
            if (a.href && a.external)
              return (
                <a
                  key={a.key}
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[52px] touch-manipulation items-start gap-3 py-2.5 transition-colors active:bg-white/[0.04]"
                >
                  {body}
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-white/40" />
                </a>
              );
            if (a.href)
              return (
                <Link
                  key={a.key}
                  to={a.href}
                  className="flex min-h-[52px] touch-manipulation items-start gap-3 py-2.5 transition-colors active:bg-white/[0.04]"
                >
                  {body}
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white/40" />
                </Link>
              );
            return (
              <div key={a.key} className="flex min-h-[52px] items-start gap-3 py-2.5">
                {body}
              </div>
            );
          })}
        </div>
        <div className="mt-3 border-t border-white/[0.08] pt-3 text-[12px] leading-[18px] text-white">
          The rules: a reply waiting · a trial ending in two days · a bounced address · a {T.person}{' '}
          not in after three days · a code used but nothing new for a week · a follow-up past its
          date · and the Tuesday chase, everyone emailed a week ago with no reply.
        </div>
      </Panel>

      {/* ── By organisation ── */}
      <Panel>
        <SectionHead
          title="By organisation"
          meta={
            loading
              ? 'loading…'
              : `${model.live.length} with something happening · ${model.quiet.length} written to, nothing back yet`
          }
          action={
            model.quiet.length > 0
              ? showQuiet
                ? 'Hide the quiet ones'
                : 'Show the quiet ones'
              : undefined
          }
          onAction={() => setShowQuiet((v) => !v)}
          className="min-h-0"
        />
        {!loading && model.live.length === 0 && (
          <div className="mt-3 text-[13px] leading-5 text-white">
            {T.noneYet} Codes are live in {model.orgs} places; the first redemption will show here.
          </div>
        )}
        {/* Desktop table */}
        <div className="mt-2 hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-[13px] text-white">
            <thead>
              <tr className="text-left text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                {[
                  'Organisation',
                  'Conversation',
                  'Stage',
                  'Codes',
                  'Signed up',
                  'Trial',
                  'Paying',
                  'MRR',
                  T.tableHead,
                  'Last sign-up',
                ].map((h, i) => (
                  <th
                    key={h}
                    className={cn(
                      'border-b border-white/[0.12] py-2 pr-4 font-medium',
                      i > 3 && i < 9 && 'text-right'
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(showQuiet ? model.rows : model.live).map((r) => (
                <tr key={r.org} className="border-b border-white/[0.08] last:border-0">
                  <td className="max-w-[280px] py-3 pr-4">
                    <div className="truncate font-medium">{r.org}</div>
                    {r.redeemed > 0 && (
                      <div className="text-[12px]">
                        {r.redeemed} redemption{r.redeemed === 1 ? '' : 's'} on Stripe
                      </div>
                    )}
                  </td>
                  <td className="max-w-[220px] py-3 pr-4">
                    {convoOf(r) ? (
                      <>
                        <StateDot label={convoOf(r)!.label} color={convoOf(r)!.color} />
                        {convoOf(r)!.contact && (
                          <div className="truncate text-[12px]">{convoOf(r)!.contact}</div>
                        )}
                      </>
                    ) : (
                      <span className="text-white/60">—</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4">
                    <StateDot label={stageOf(r).label} color={stageOf(r).color} />
                  </td>
                  <td className="py-3 pr-4 font-mono text-[12px]">
                    <div>{r.apprentice?.code ?? '—'}</div>
                    <div className="text-white/70">{r.electrician?.code ?? ''}</div>
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">{r.subs.length || ''}</td>
                  <td
                    className="py-3 pr-4 text-right tabular-nums"
                    style={{ color: r.trialing ? YELLOW : undefined }}
                  >
                    {r.trialing || ''}
                  </td>
                  <td
                    className="py-3 pr-4 text-right font-semibold tabular-nums"
                    style={{ color: r.paying ? GOOD : undefined }}
                  >
                    {r.paying || ''}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    {r.mrr ? gbp(r.mrr, 2) : ''}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    {r.tutors.length ? (
                      <span>
                        {r.tutors.length}
                        <span className="text-[12px]"> · {r.tutorsIn} logged in</span>
                      </span>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="whitespace-nowrap py-3">
                    {r.lastSignup ? day(r.lastSignup) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Phone rows */}
        <div className="mt-2 divide-y divide-white/[0.08] lg:hidden">
          {(showQuiet ? model.rows : model.live).map((r) => (
            <div key={r.org} className="py-3 text-white">
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0 truncate text-[14px] font-medium">{r.org}</div>
                <div className="shrink-0 text-[12px] font-medium tabular-nums">
                  {r.paying ? <span style={{ color: GOOD }}>{r.paying} paying</span> : null}
                  {r.paying && r.trialing ? ' · ' : ''}
                  {r.trialing ? <span style={{ color: YELLOW }}>{r.trialing} on trial</span> : null}
                </div>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                {convoOf(r) && <StateDot label={convoOf(r)!.label} color={convoOf(r)!.color} />}
                <StateDot label={stageOf(r).label} color={stageOf(r).color} />
                <span className="font-mono text-[11.5px] text-white/80">
                  {[r.apprentice?.code, r.electrician?.code].filter(Boolean).join(' · ')}
                </span>
              </div>
              <div className="mt-1 text-[12px] leading-4">
                {convoOf(r)?.contact ? `${convoOf(r)!.contact} · ` : ''}
                {r.subs.length ? `${r.subs.length} signed up` : `no ${T.learners} yet`}
                {r.mrr ? ` · ${gbp(r.mrr, 2)}/mo` : ''}
                {r.tutors.length
                  ? ` · ${r.tutors.length} ${r.tutors.length === 1 ? T.person : T.people}, ${r.tutorsIn} logged in`
                  : ''}
                {r.lastSignup ? ` · last sign-up ${day(r.lastSignup)}` : ''}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-white/[0.08] pt-3 text-[12px] leading-[18px] text-white">
          Conversation = where the outreach tracker has them
          {model.syncedAt ? `, synced ${ago(model.syncedAt)}` : ''}. Signed up = a subscription that
          used the code, trial included. Paying = active after the trial. MRR is what they actually
          pay {T.discount}. New codes are made on{' '}
          <Link to="/admin/offers" className="font-semibold text-elec-yellow">
            Offers
          </Link>
          , {T.person} accounts on{' '}
          <Link to="/admin/bulk-create" className="font-semibold text-elec-yellow">
            Bulk Create
          </Link>
          .
        </div>
      </Panel>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:items-start">
        {/* ── Tutors ── */}
        <Panel className="flex flex-col">
          <SectionHead
            title={T.accounts}
            meta={loading ? undefined : `${model.tutors.length} made · ${model.tutorsIn} logged in`}
            className="min-h-0"
          />
          {!loading && model.tutors.length === 0 ? (
            <div className="mt-3 text-[13px] text-white">No {T.person} accounts yet.</div>
          ) : (
            <div className="mt-1 divide-y divide-white/[0.08]">
              {[...model.tutors]
                .sort(
                  (a, b) =>
                    (b.lastSignIn ?? '').localeCompare(a.lastSignIn ?? '') ||
                    a.org.localeCompare(b.org)
                )
                .map((t) => (
                  <Link
                    key={t.id}
                    to={`/admin/users?q=${encodeURIComponent(t.email ?? '')}`}
                    className="flex min-h-[52px] touch-manipulation items-center gap-3 py-2 text-white transition-colors active:bg-white/[0.04]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[12px] font-semibold">
                      {initialsOf(t.name, t.email)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium">{t.name || t.email}</div>
                      <div className="truncate text-[12px]">
                        {t.org}
                        {t.email && t.name ? ` · ${t.email}` : ''}
                      </div>
                    </div>
                    <StateDot
                      label={
                        t.lastSignIn
                          ? `seen ${ago(t.lastSignIn)}`
                          : `not yet · made ${day(t.createdAt)}`
                      }
                      color={t.lastSignIn ? GOOD : DE_EMPHASIS}
                    />
                    <ChevronRight className="h-4 w-4 shrink-0 text-white/40" />
                  </Link>
                ))}
            </div>
          )}
          <div className="mt-auto border-t border-white/[0.08] pt-3 text-[12px] leading-[18px] text-white">
            Free, full-app accounts made on Bulk create. They are kept out of signup and paying
            numbers everywhere.
          </div>
        </Panel>

        {/* ── Latest sign-ups through codes ── */}
        <Panel className="flex flex-col">
          <SectionHead
            title="Sign-ups through codes"
            meta={
              loading
                ? undefined
                : model.recent.length
                  ? `latest ${model.recent.length}`
                  : undefined
            }
            className="min-h-0"
          />
          {!loading && model.recent.length === 0 ? (
            <div className="mt-3 text-[13px] text-white">{T.nobody}</div>
          ) : (
            <div className="mt-1 divide-y divide-white/[0.08]">
              {model.recent.map((s, i) => {
                const paying = PAYING.has(s.status);
                const trial = TRIAL.has(s.status);
                return (
                  <div
                    key={`${s.customerId}-${i}`}
                    className="flex min-h-[52px] items-center gap-3 py-2 text-white"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[12px] font-semibold">
                      {initialsOf(s.name, s.email)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium">
                        {properName(s.name) || s.email || s.customerId}
                      </div>
                      <div className="truncate text-[12px]">
                        {orgFor(s.code)} · <span className="font-mono">{s.code}</span> · {s.tier} ·{' '}
                        {gbp(s.amountMonthly, 2)}/mo · {day(s.started)}
                      </div>
                    </div>
                    <StateDot
                      label={
                        paying
                          ? 'Paying'
                          : trial
                            ? s.cancelAtPeriodEnd
                              ? 'Trial · cancelling'
                              : 'On trial'
                            : s.status
                      }
                      color={
                        paying
                          ? GOOD
                          : trial
                            ? s.cancelAtPeriodEnd
                              ? SERIOUS
                              : YELLOW
                            : DE_EMPHASIS
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-auto border-t border-white/[0.08] pt-3 text-[12px] leading-[18px] text-white">
            {T.signupsFoot}
          </div>
        </Panel>
      </div>
    </PageFrame>
  );
}

export default function AdminColleges() {
  return <SchemePage scheme="college" />;
}
