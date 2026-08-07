/**
 * Single source of truth for notification category → label + emphasis.
 * Used by BOTH the header bell (NotificationBell) and the /notifications page so
 * the two surfaces read identically (ELE-226). No icons — a small label + accent
 * bar carries the meaning. First matching rule wins, so order is significant:
 * the more specific / more urgent rules come first.
 *
 * ── Why the colours went ────────────────────────────────────────────────
 *
 * This used eleven: red, amber, volt, emerald, blue, sky, rose, violet, orange
 * and two greys. Opening the bell gave you a rainbow down the left edge —
 * Wellbeing rose, Work blue, Finance emerald, Study violet — and none of it
 * meant anything, because the label directly beside the bar already said
 * "Wellbeing", "Work", "Finance". The colour was decoration that cost the one
 * distinction actually worth making: which of these is going to cost me
 * something if I ignore it.
 *
 * So there are two states now. URGENT is volt — safeguarding, overdue money,
 * Part P deadlines, compliance and QS sign-off, the things with a clock or a
 * regulator behind them. Everything else is white. Same rules, same labels,
 * same order; only the emphasis changed.
 */
export interface CategoryTone {
  label: string;
  text: string;
  bar: string;
  /** True when ignoring it has a cost — drives the volt emphasis. */
  urgent: boolean;
}

/** Volt label over a volt rule. Reserved for the rules that carry a deadline. */
const URGENT = { text: 'text-elec-yellow', bar: 'bg-elec-yellow', urgent: true } as const;
/** Everything else. White, because on this ground anything less is grey. */
const NORMAL = { text: 'text-white', bar: 'bg-white/[0.30]', urgent: false } as const;

const RULES: [RegExp, CategoryTone][] = [
  [/safeguard/i, { label: 'Safeguarding', ...URGENT }],
  [/overdue|fail|danger|urgent|declin/i, { label: 'Action needed', ...URGENT }],
  [/part.?p|deadline|notifiable/i, { label: 'Part P', ...URGENT }],
  [/\bqs\b|countersign|awaiting.*review|sign.?off/i, { label: 'QS', ...URGENT }],
  [/reinspect|re-inspect|compliance|ecs|insurance|calibration|scheme|expir/i, { label: 'Compliance', ...URGENT }],
  [/lead/i, { label: 'Lead', ...NORMAL }],
  [/invoice|payment|paid|recovered|quote|deposit|reward|referral|viewed/i, { label: 'Finance', ...NORMAL }],
  [/leave|holiday|timesheet|expense|absence|rota|shift|\bjob\b|assign|task/i, { label: 'Work', ...NORMAL }],
  [/message|chat|reply|peer/i, { label: 'Message', ...NORMAL }],
  [/mood|wellbeing|mental/i, { label: 'Wellbeing', ...NORMAL }],
  [/study|flashcard|apprentice|assessment|\bexam\b/i, { label: 'Study', ...NORMAL }],
  [/snag|defect|fault/i, { label: 'Snag', ...NORMAL }],
  [/cert|report|eicr|\beic\b|approv|complete|accepted|signed/i, { label: 'Certificate', ...NORMAL }],
  [/brief|digest|morning/i, { label: 'Daily brief', ...NORMAL }],
  [/subscription|billing/i, { label: 'Account', ...NORMAL }],
];

export const categoryTone = (type?: string, title = '', message = ''): CategoryTone => {
  const hay = `${type ?? ''} ${title} ${message}`;
  for (const [re, tone] of RULES) {
    if (re.test(hay)) return tone;
  }
  return { label: 'Update', ...NORMAL };
};

/**
 * "7h ago", not "about 7 hours ago".
 *
 * `formatDistanceToNow` produces "about 7 hours ago", "less than a minute ago",
 * "about 1 month ago" — prose in a column that is 60px wide, where every row
 * carries one. Hedging words in a timestamp also read as uncertainty about the
 * timestamp, which is the opposite of what a notification list wants.
 */
export const compactAge = (iso: string): string => {
  const ms = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(ms)) return '';
  const mins = Math.floor(ms / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
};
