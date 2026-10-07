/**
 * Employer Mate's confirmed actions (7 Oct 2026): card types and the stream
 * parser. The server puts each confirmation card between two RS characters
 * (\u001e) in the text stream; parseMateStream lifts them out. Rendered by
 * mateActionCards.tsx.
 *
 * Nothing here can make a write happen on its own: Confirm sends the server's
 * signed token back, and the server checks it is this user, this firm and the
 * exact arguments on the card, within 10 minutes.
 */

export interface MateCardLine {
  label: string;
  value: string;
}
export interface MateCardLink {
  label: string;
  section: string;
  params?: Record<string, string>;
}
export interface MateResultCard {
  card: 'result';
  ok: boolean;
  action: string;
  title: string;
  lines: MateCardLine[];
  links: MateCardLink[];
  undo_token?: string;
  undo_until?: string;
  /** Client-side: set once the undo has run. */
  undone?: MateResultCard;
}
export interface MateConfirmCard {
  card: 'confirm';
  token: string;
  action: string;
  title: string;
  lines: MateCardLine[];
  warnings: string[];
  undo: string;
  expires_at: string;
  confirm_label: string;
}
export type MateCardState = 'pending' | 'working' | 'done' | 'cancelled';
export interface MateActionEntry {
  confirm: MateConfirmCard;
  state: MateCardState;
  result?: MateResultCard;
  undoing?: boolean;
}

const MARK = '\u001e';

/** Split streamed text into the readable answer and the cards inside it. */
export function parseMateStream(raw: string): { text: string; cards: MateConfirmCard[] } {
  const parts = raw.split(MARK);
  const cards: MateConfirmCard[] = [];
  let text = '';
  parts.forEach((p, i) => {
    if (i % 2 === 0) {
      text += p;
      return;
    }
    // An odd part with no closing mark yet is a card still arriving: hide it.
    if (i === parts.length - 1) return;
    try {
      const c = JSON.parse(p) as MateConfirmCard;
      if (c && c.card === 'confirm' && typeof c.token === 'string') cards.push(c);
    } catch {
      /* not a card */
    }
  });
  return { text: text.replace(/\n{3,}/g, '\n\n').trim(), cards };
}

/** What the model is told about a card next turn (it never sees the token). */
export function describeEntryForModel(e: MateActionEntry): string {
  const head = `[Confirmation card: ${e.confirm.title}.`;
  if (e.state === 'cancelled') return `${head} The user cancelled it, nothing changed.]`;
  if (e.state === 'done' && e.result) {
    const undone = e.result.undone?.ok ? ' Then the user undid it.' : '';
    return e.result.ok
      ? `${head} Done: ${e.result.title}.${undone}]`
      : `${head} Failed: ${e.result.title}. Nothing changed.]`;
  }
  if (new Date(e.confirm.expires_at).getTime() <= Date.now())
    return `${head} It expired unconfirmed, nothing changed.]`;
  return `${head} Waiting for the user to confirm, nothing changed yet.]`;
}

export const YES_RE =
  /^\s*(yes|yep|yeah|yup|ok|okay|confirm|confirmed|go ahead|do it|go for it|send it|approve it|book it|please do|sure)\b[\s.!]*$/i;
export const NO_RE = /^\s*(no|nope|cancel|stop|don'?t|leave it)\b[\s.!]*$/i;
