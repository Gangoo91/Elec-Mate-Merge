/**
 * Microsoft Teams card for the College Hub tutor inbox (ELE-2056).
 *
 * Pure TypeScript: no Deno or Node APIs, so the edge function and the e2e
 * spec (which posts to a local receiver, never a real channel) share it.
 *
 * Format: an Adaptive Card wrapped in a Teams "message" with one attachment,
 * the shape Microsoft documents for incoming webhooks and that the Teams
 * Workflows app ("When a Teams webhook request is received") accepts.
 *   https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook
 * Limits from the same page: 28 KB a message; more than four requests a
 * second is throttled (we send at most one card per college per run, and back
 * off on 429).
 *
 * Privacy: a channel is wider than the inbox, so the card never carries the
 * text of a learner's message or portfolio reply, never anything about
 * safeguarding (the inbox holds none), and names can be switched off.
 */

export const APP_URL = 'https://app.elec-mate.com';
export const MAX_LINES = 10;
export const MAX_BYTES = 27_000;

export type TeamsCategory =
  'college_marking' | 'college_hours' | 'college_messages' | 'college_reviews';

/** Inbox kind (get_college_inbox) to the staff notification group it belongs to. */
export const KIND_CATEGORY: Record<string, TeamsCategory> = {
  evidence: 'college_marking',
  comment: 'college_marking',
  iqa: 'college_marking',
  marking: 'college_marking',
  hours: 'college_hours',
  app_learning: 'college_hours',
  message: 'college_messages',
  review: 'college_reviews',
  checkin: 'college_reviews',
  deadline: 'college_reviews',
};

/** Kinds whose detail is the text of a learner's message, reply or submission notes: never posted. */
const PRIVATE_DETAIL = new Set(['message', 'comment', 'evidence']);

export interface InboxItem {
  key: string;
  kind: string;
  learner?: string | null;
  cohort?: string | null;
  title?: string | null;
  detail?: string | null;
  action?: string | null;
  href?: string | null;
  urgent?: boolean | null;
}

export interface CardOptions {
  collegeName: string;
  includeNames: boolean;
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** Adaptive Card TextBlock markdown: escape the characters that would start a link or emphasis. */
export function mdSafe(s: string): string {
  return s.replace(/[\\[\]()*_`>#]/g, (c) => `\\${c}`);
}

export function deepLink(href: string | null | undefined): string {
  const h = (href ?? '').trim();
  if (!h.startsWith('/')) return `${APP_URL}/college/inbox`;
  return `${APP_URL}${h}`;
}

/** First name and initial, or "A learner" when names are off. */
export function learnerLabel(name: string | null | undefined, includeNames: boolean): string {
  const n = (name ?? '').trim();
  if (!includeNames || !n) return 'A learner';
  const parts = n.replace(/\s*\([^)]*\)\s*$/, '').split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];
}

export function lineFor(item: InboxItem, includeNames: boolean): string {
  const who = item.kind === 'iqa' ? null : learnerLabel(item.learner, includeNames);
  const title = clip((item.title ?? 'Something to do').trim(), 80);
  const detail =
    !PRIVATE_DETAIL.has(item.kind) && item.detail ? ` · ${clip(item.detail.trim(), 90)}` : '';
  const cohort = includeNames && item.cohort ? ` (${clip(item.cohort, 40)})` : '';
  const verb = clip((item.action ?? 'Open').trim(), 16);
  const text = `${who ? `${who}${cohort}: ` : ''}${title}${detail}`;
  return `${item.urgent ? '**Urgent** ' : ''}[${mdSafe(verb)}](${deepLink(item.href)}) ${mdSafe(text)}`;
}

export function buildInboxCard(items: InboxItem[], opts: CardOptions): Record<string, unknown> {
  const shown = items.slice(0, MAX_LINES);
  const more = items.length - shown.length;
  const urgent = items.filter((i) => i.urgent).length;
  const heading =
    items.length === 1
      ? '1 new item in the College Hub inbox'
      : `${items.length} new items in the College Hub inbox`;
  const body: Record<string, unknown>[] = [
    {
      type: 'TextBlock',
      text: clip(opts.collegeName, 80),
      size: 'Small',
      isSubtle: true,
      wrap: true,
    },
    { type: 'TextBlock', text: heading, weight: 'Bolder', size: 'Medium', wrap: true },
  ];
  if (urgent > 0)
    body.push({
      type: 'TextBlock',
      text: urgent === 1 ? '1 of them is urgent.' : `${urgent} of them are urgent.`,
      wrap: true,
      spacing: 'None',
    });
  for (const i of shown)
    body.push({
      type: 'TextBlock',
      text: lineFor(i, opts.includeNames),
      wrap: true,
      spacing: 'Small',
    });
  if (more > 0)
    body.push({
      type: 'TextBlock',
      text: `And ${more} more in the inbox.`,
      wrap: true,
      spacing: 'Medium',
    });
  return wrap(body, [
    { type: 'Action.OpenUrl', title: 'Open the inbox', url: `${APP_URL}/college/inbox` },
  ]);
}

export function buildTestCard(collegeName: string, by: string | null): Record<string, unknown> {
  return wrap(
    [
      { type: 'TextBlock', text: clip(collegeName, 80), size: 'Small', isSubtle: true, wrap: true },
      {
        type: 'TextBlock',
        text: 'Elec-Mate College Hub is connected',
        weight: 'Bolder',
        size: 'Medium',
        wrap: true,
      },
      {
        type: 'TextBlock',
        text: `New items in the tutor inbox will appear here, each with a link that opens it in the hub.${by ? ` Sent as a test by ${mdSafe(clip(by, 60))}.` : ''}`,
        wrap: true,
      },
    ],
    [{ type: 'Action.OpenUrl', title: 'Open the inbox', url: `${APP_URL}/college/inbox` }]
  );
}

function wrap(body: Record<string, unknown>[], actions: Record<string, unknown>[]) {
  return {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        contentUrl: null,
        content: {
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          type: 'AdaptiveCard',
          version: '1.4',
          msteams: { width: 'Full' },
          body,
          actions,
        },
      },
    ],
  };
}

/** Same host rule as public._teams_webhook_url_ok. */
export function teamsUrlOk(url: string): boolean {
  return (
    url.length >= 30 &&
    url.length <= 2048 &&
    !/\s/.test(url) &&
    /^https:\/\/([a-z0-9-]+\.)+(logic\.azure\.com|powerplatform\.com|webhook\.office\.com)(:443)?\//i.test(
      url
    )
  );
}

export interface PostResult {
  ok: boolean;
  status: number;
  /** Plain words for the settings card. NEVER contains the URL. */
  error: string | null;
  attempts: number;
}

/**
 * POST a card with backoff on 429 / 5xx. The URL is never put into an error,
 * a log line or the result: fetch errors can quote the URL, so only the
 * status is kept.
 */
export async function postCard(
  url: string,
  card: Record<string, unknown>,
  fetchImpl: typeof fetch = fetch,
  waits: number[] = [1000, 3000]
): Promise<PostResult> {
  const payload = JSON.stringify(card);
  if (new TextEncoder().encode(payload).length > MAX_BYTES)
    return { ok: false, status: 0, error: 'The card was too large for Teams.', attempts: 0 };
  let attempts = 0;
  for (;;) {
    attempts++;
    let status = 0;
    try {
      const res = await fetchImpl(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        redirect: 'error',
      });
      status = res.status;
      await res.text().catch(() => '');
      if (res.ok) return { ok: true, status, error: null, attempts };
    } catch {
      status = 0;
    }
    const retry = status === 0 || status === 429 || status >= 500;
    const wait = waits[attempts - 1];
    if (!retry || wait === undefined)
      return { ok: false, status, error: describe(status), attempts };
    await new Promise((r) => setTimeout(r, wait));
  }
}

export function describe(status: number): string {
  if (status === 0) return 'Teams could not be reached.';
  if (status === 400)
    return 'Teams refused the message (400). Check the workflow still posts cards.';
  if (status === 401 || status === 403)
    return `Teams refused the link (${status}). The workflow may be off or its owner may have left.`;
  if (status === 404 || status === 410)
    return `Teams no longer recognises the link (${status}). Create a new workflow and paste its link.`;
  if (status === 429) return 'Teams asked us to slow down (429). We will try again.';
  return `Teams answered ${status}.`;
}

/** 21:00 to 07:00 in London, the same window the hub's pushes use. */
export function inQuietHours(now: Date = new Date()): boolean {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false, timeZone: 'Europe/London' })
      .format(now)
      .slice(0, 2)
  );
  return hour >= 21 || hour < 7;
}
