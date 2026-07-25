/**
 * Single source of truth for notification category → colour + label.
 * Used by BOTH the header bell (NotificationBell) and the /notifications page so
 * the two surfaces read identically (ELE-226). No icons — a small colour-coded
 * label + accent bar carries the meaning. First matching rule wins, so order is
 * significant: the more specific / more urgent rules come first.
 */
export interface CategoryTone {
  label: string;
  text: string;
  bar: string;
}

const RULES: [RegExp, CategoryTone][] = [
  [/safeguard/i, { label: 'Safeguarding', text: 'text-red-300', bar: 'bg-red-500' }],
  [/overdue|fail|danger|urgent|declin/i, { label: 'Action needed', text: 'text-red-300', bar: 'bg-red-400' }],
  [/part.?p|deadline|notifiable/i, { label: 'Part P', text: 'text-amber-300', bar: 'bg-amber-400' }],
  [/\bqs\b|countersign|awaiting.*review|sign.?off/i, { label: 'QS', text: 'text-elec-yellow', bar: 'bg-elec-yellow' }],
  [/reinspect|re-inspect|compliance|ecs|insurance|calibration|scheme|expir/i, { label: 'Compliance', text: 'text-amber-300', bar: 'bg-amber-400' }],
  [/lead/i, { label: 'Lead', text: 'text-emerald-300', bar: 'bg-emerald-400' }],
  [/invoice|payment|paid|recovered|quote|deposit|reward|referral|viewed/i, { label: 'Finance', text: 'text-emerald-300', bar: 'bg-emerald-400' }],
  [/leave|holiday|timesheet|expense|absence|rota|shift|\bjob\b|assign|task/i, { label: 'Work', text: 'text-blue-300', bar: 'bg-blue-400' }],
  [/message|chat|reply|peer/i, { label: 'Message', text: 'text-sky-300', bar: 'bg-sky-400' }],
  [/mood|wellbeing|mental/i, { label: 'Wellbeing', text: 'text-rose-300', bar: 'bg-rose-400' }],
  [/study|flashcard|apprentice|assessment|\bexam\b/i, { label: 'Study', text: 'text-violet-300', bar: 'bg-violet-400' }],
  [/snag|defect|fault/i, { label: 'Snag', text: 'text-orange-300', bar: 'bg-orange-400' }],
  [/cert|report|eicr|\beic\b|approv|complete|accepted|signed/i, { label: 'Certificate', text: 'text-blue-300', bar: 'bg-blue-400' }],
  [/brief|digest|morning/i, { label: 'Daily brief', text: 'text-white/60', bar: 'bg-white/40' }],
  [/subscription|billing/i, { label: 'Account', text: 'text-white/70', bar: 'bg-white/40' }],
];

export const categoryTone = (type?: string, title = '', message = ''): CategoryTone => {
  const hay = `${type ?? ''} ${title} ${message}`;
  for (const [re, tone] of RULES) {
    if (re.test(hay)) return tone;
  }
  return { label: 'Update', text: 'text-white/70', bar: 'bg-white/40' };
};
