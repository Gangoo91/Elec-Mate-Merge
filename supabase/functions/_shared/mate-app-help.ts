/**
 * Mate's knowledge of the app: every page's "How it works" help and the page
 * index, built by scripts/build-mate-app-help.mjs into mate-app-help.json.
 * Searched by keyword overlap — small enough (≈190 guides, ≈140 pages) that
 * no embedding is needed, and it runs with no network call.
 */
import appHelp from './mate-app-help.json' with { type: 'json' };

interface Help {
  id: string;
  title: string;
  what: string;
  steps: string[];
  tasks: Array<{ title: string; steps: string[]; who?: string }>;
  notes: string[];
  file: string;
}
interface Page {
  name: string;
  path: string;
  section?: string;
  keywords: string[];
}

const HELPS = (appHelp as { helps: Help[] }).helps;
const PAGES = (appHelp as { pages: Page[] }).pages;

const STOP = new Set(
  'the a an and or to of in on for with my me i you it is are do does can how what where when why this that there from by at be have has get got use using into your our will would should could just'.split(
    ' '
  )
);
const words = (s: string) =>
  (s.toLowerCase().match(/[a-z0-9][a-z0-9-]+/g) ?? []).filter((w) => w.length > 2 && !STOP.has(w));

/** How electricians say it → the words the guides use. */
const SYNONYMS: Record<string, string[]> = {
  worker: ['team', 'people'],
  workers: ['team', 'people'],
  staff: ['team', 'people'],
  lads: ['team', 'people'],
  employee: ['team', 'people'],
  employees: ['team', 'people'],
  engineers: ['team', 'people'],
  print: ['pdf', 'download'],
  printout: ['pdf', 'download'],
  estimate: ['quote'],
  estimates: ['quotes'],
  cert: ['certificate'],
  certs: ['certificates'],
  subscription: ['billing', 'plan'],
  cancel: ['billing', 'subscription'],
  enquiry: ['enquiries'],
  leads: ['enquiries', 'leads'],
};

/** College and apprentice screens only when the question is about college. */
const COLLEGE_FILE = /college|apprentice|assessor|tutor|learner|study-centre|portfolio/i;
const COLLEGE_Q = /\b(college|tutor|learner|apprentice|assessor|portfolio|ofsted|cohort|study)\b/i;

/** Whole-word match with simple plurals — "times" must not hit "timesheets". */
function score(tokens: string[], fields: Array<[string, number]>): number {
  const sets = fields.map(
    ([field, weight]) => [new Set(field.match(/[a-z0-9][a-z0-9-]+/g) ?? []), weight] as const
  );
  let total = 0;
  for (const t of tokens) {
    const forms = [t, `${t}s`, t.endsWith('s') ? t.slice(0, -1) : t];
    for (const [set, weight] of sets) {
      if (forms.some((f) => set.has(f))) {
        total += weight;
        break;
      }
    }
  }
  return total;
}

/** Accounts, billing and support — facts the page guides don't carry. */
export const ACCOUNT_FACTS = `Elec-Mate support: email info@elec-mate.com (or Settings → Billing → Manage Subscription for plan help).
Settings tabs: Elec-ID · Business (Company, Brand, Payment = banking and Stripe, Pricing, Accounting = Xero and QuickBooks, documents) · Billing (current plan, connecting Stripe to take card payments on invoices, Manage Subscription = cancel, refunds, plan help, Billing History) · Notifications · App.
"Stripe" in Elec-Mate means taking card payments on invoices — not anything electrical. Connect, check or disconnect it on the card-payments panel in Settings → Billing ("Accept Card Payments" / "Card Payments Active"); bank details are in Settings → Business → Payment.
Cancelling or changing the Elec-Mate plan itself is separate: Settings → Billing → Manage Subscription.`;

/** The best-matching guides and pages for a question, formatted for a prompt. */
export function searchAppHelp(question: string, max = 3): string | null {
  const base = words(question);
  const tokens = [...new Set([...base, ...base.flatMap((w) => SYNONYMS[w] ?? [])])];
  if (!tokens.length) return null;
  const collegeQ = COLLEGE_Q.test(question);
  const helps = HELPS.filter((h) => collegeQ || !COLLEGE_FILE.test(h.file))
    .map((h) => ({
      h,
      s: score(tokens, [
        [h.title.toLowerCase(), 4],
        [h.what.toLowerCase(), 2],
        [
          h.tasks
            .map((t) => t.title)
            .join(' ')
            .toLowerCase(),
          3,
        ],
        [[...h.steps, ...h.tasks.flatMap((t) => t.steps), ...h.notes].join(' ').toLowerCase(), 1],
      ]),
    }))
    .filter((x) => x.s >= 3)
    .sort((a, b) => b.s - a.s)
    .filter((x, _i, all) => x.s >= all[0].s * 0.5)
    .slice(0, max);
  const pages = PAGES.map((p) => ({
    p,
    s: score(tokens, [
      [p.name.toLowerCase(), 3],
      [p.keywords.join(' ').toLowerCase(), 2],
    ]),
  }))
    .filter((x) => x.s >= 2)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4);
  if (!helps.length && !pages.length) return null;
  const out: string[] = [];
  for (const { h } of helps) {
    out.push(`GUIDE "${h.title}": ${h.what}`);
    for (const s of h.steps.slice(0, 5)) out.push(`  • ${s}`);
    for (const t of h.tasks.slice(0, 4)) {
      out.push(
        `  How to ${t.title.replace(/^how to /i, '')}: ${t.steps.map((s, i) => `${i + 1}. ${s}`).join(' ')}${t.who ? ` (${t.who})` : ''}`
      );
    }
  }
  if (pages.length) {
    out.push(
      'PAGES: ' +
        pages
          .map(({ p }) => `${p.name}${p.section ? ` (${p.section})` : ''} → ${p.path}`)
          .join(' · ')
    );
  }
  return out.join('\n');
}
