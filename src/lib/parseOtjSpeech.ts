/**
 * parseOtjSpeech — deterministic natural-language parser for spoken OTJ
 * entries. "Did two and a half hours second fix wiring at the Hartlepool job
 * yesterday" → duration 150, date yesterday, activity_type practical, title +
 * description filled.
 *
 * Deliberately NOT an AI call: duration/date/type extraction is regex-shaped,
 * works offline in a van, costs nothing and never hallucinates a number into
 * a compliance field. The learner always reviews the prefilled form before
 * submitting.
 */

export interface ParsedOtjSpeech {
  title?: string;
  description: string;
  duration_minutes?: number;
  activity_date?: string; // YYYY-MM-DD
  activity_type?: string;
  /** Which fields were confidently detected — for the "Filled: …" feedback. */
  detected: string[];
}

const WORD_NUMBERS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

/** Handles digits, single number words, and compounds ("forty five" / "forty-five"). */
const num = (s: string): number => {
  const n = Number(s);
  if (Number.isFinite(n)) return n;
  const parts = s.toLowerCase().split(/[\s-]+/).filter(Boolean);
  let total = 0;
  for (const p of parts) {
    const v = WORD_NUMBERS[p];
    if (v === undefined) return NaN;
    total += v;
  }
  return parts.length > 0 ? total : NaN;
};

// Compounds/tens FIRST in the alternation — otherwise "forty five minutes"
// matches the inner "five" and parses as 5 minutes.
const TENS = '(?:twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)';
const UNITS = 'one|two|three|four|five|six|seven|eight|nine';
const TEENS = 'ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen';
const NUM = `(\\d+(?:\\.\\d+)?|${TENS}(?:[\\s-](?:${UNITS}))?|${TEENS}|${UNITS})`;

function parseDuration(text: string): number | undefined {
  const t = text.toLowerCase();

  // "two and a half hours" / "an hour and a half" / "hour and a half"
  let m = t.match(new RegExp(`${NUM}\\s+and\\s+a\\s+half\\s+hours?`));
  if (m) return Math.round((num(m[1]) + 0.5) * 60);
  if (/\b(an?\s+)?hour\s+and\s+a\s+half\b/.test(t)) return 90;

  // "X hours Y minutes" / "X hours and Y minutes"
  m = t.match(new RegExp(`${NUM}\\s*(?:hours?|hrs?)\\s*(?:and\\s*)?${NUM}\\s*(?:minutes?|mins?)`));
  if (m) return Math.round(num(m[1]) * 60 + num(m[2]));

  // "an hour and 15 minutes" — the article form has no leading number, so the
  // pattern above misses it and the bare-minutes pattern would return 15.
  m = t.match(new RegExp(`\\ban?\\s+hour\\s+and\\s+${NUM}\\s*(?:minutes?|mins?)`));
  if (m) return Math.round(60 + num(m[1]));

  // "X hours" (incl. decimals: "1.5 hours")
  m = t.match(new RegExp(`${NUM}\\s*(?:hours?|hrs?)\\b`));
  if (m) return Math.round(num(m[1]) * 60);

  // "X minutes"
  m = t.match(new RegExp(`${NUM}\\s*(?:minutes?|mins?)\\b`));
  if (m) return Math.round(num(m[1]));

  if (/\bhalf\s+an?\s+hour\b/.test(t)) return 30;
  if (/\bquarter\s+of\s+an?\s+hour\b/.test(t)) return 15;
  if (/\ban?\s+hour\b/.test(t)) return 60;
  if (/\b(all|the\s+whole)\s+morning\b/.test(t)) return 180;
  if (/\b(all|the\s+whole)\s+afternoon\b/.test(t)) return 180;
  if (/\b(all|the\s+whole)\s+day\b/.test(t)) return 420;

  return undefined;
}

const toISODate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function parseDate(text: string): string | undefined {
  const t = text.toLowerCase();
  const now = new Date();

  if (/\byesterday\b/.test(t)) {
    const d = new Date(now);
    d.setDate(d.getDate() - 1);
    return toISODate(d);
  }
  if (/\b(today|this\s+(morning|afternoon|evening))\b/.test(t)) return toISODate(now);

  // "on monday" / "last tuesday" → the most recent such weekday (never future)
  for (let i = 0; i < WEEKDAYS.length; i++) {
    if (new RegExp(`\\b(?:on\\s+|last\\s+)?${WEEKDAYS[i]}\\b`).test(t)) {
      const d = new Date(now);
      const back = (d.getDay() - i + 7) % 7 || 7; // same weekday spoken → a week ago
      d.setDate(d.getDate() - back);
      return toISODate(d);
    }
  }
  return undefined;
}

/** Keyword → activity_type, matching SubmitWorkOtjSheet's ACTIVITY_TYPES. */
const TYPE_RULES: Array<[RegExp, string]> = [
  [/\b(toolbox\s+talk|briefing|debrief|team\s+meeting)\b/, 'employer_meeting'],
  [/\b(shadow(ed|ing)?|watch(ed|ing)\s+(a|the))\b/, 'shadowing'],
  [/\b(manufacturer|product\s+training|training\s+course|cpd)\b/, 'manufacturer_training'],
  [/\b(site\s+visit|factory|exhibition|trade\s+show)\b/, 'industry_visit'],
  [/\b(rig|simulat)/, 'simulation'],
  [/\b(mentor|one[\s-]to[\s-]one|1[\s-]2[\s-]1)\b/, 'mentoring'],
  [/\b(assess(ed|ment)?|observ(ed|ation))\b/, 'assessment'],
  [/\b(regs?\s+(review|reading)|theory|revis(ed|ion|ing)|reading|studied|studying)\b/, 'theory'],
  [
    /\b(install|wir(ed|ing)|fitt(ed|ing)|terminat|test(ed|ing)?|fault|board|containment|conduit|trunking|first\s+fix|second\s+fix|gland|cable)/,
    'practical',
  ],
];

function parseType(text: string): string | undefined {
  const t = text.toLowerCase();
  for (const [re, type] of TYPE_RULES) {
    if (re.test(t)) return type;
  }
  return undefined;
}

function makeTitle(text: string): string | undefined {
  // First clause, minus filler openers and the duration/date phrases — those
  // live in their own form fields; the title should be the WORK.
  let s = text
    .replace(/^\s*(so|right|ok(ay)?)[,\s]+/i, '')
    .replace(/^\s*(?:(i|we)\s+)?(did|was|were|spent|had)\s+/i, '')
    .split(/[.!?]|,\s+(?:and|then)\s+/)[0]
    ?.trim();
  if (!s) return undefined;
  // Strip duration phrases wherever they sit ("two and a half hours of …",
  // "… 30 minutes …").
  s = s
    .replace(
      new RegExp(
        `\\b${NUM}\\s+and\\s+a\\s+half\\s+(?:hours?|hrs?)\\s*(?:of\\s+)?`,
        'gi'
      ),
      ''
    )
    .replace(new RegExp(`\\b(?:an?\\s+)?hour\\s+and\\s+a\\s+half\\s*(?:of\\s+)?`, 'gi'), '')
    .replace(
      new RegExp(`\\b${NUM}\\s*(?:hours?|hrs?|minutes?|mins?)\\s*(?:of\\s+)?`, 'gi'),
      ''
    )
    .replace(/\b(?:half\s+an?\s+hour|quarter\s+of\s+an?\s+hour|an?\s+hour)\s*(?:of\s+)?/gi, '')
    // Strip date words — they live in the date field.
    .replace(/\b(yesterday|today|this\s+(morning|afternoon|evening))\b/gi, '')
    .replace(new RegExp(`\\b(?:on|last)\\s+(?:${WEEKDAYS.join('|')})\\b`, 'gi'), '')
    .replace(/\b(all|the\s+whole)\s+(morning|afternoon|day)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/^(of|at|in|on|for|and|then)\s+/i, '');
  if (s.length < 3) return undefined;
  if (s.length > 70) s = `${s.slice(0, 67).trimEnd()}…`;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function parseOtjSpeech(transcript: string): ParsedOtjSpeech {
  const text = transcript.trim();
  const detected: string[] = [];

  const duration = parseDuration(text);
  if (duration) detected.push('duration');

  const date = parseDate(text);
  if (date) detected.push('date');

  const type = parseType(text);
  if (type) detected.push('type');

  const title = makeTitle(text);
  if (title) detected.push('title');

  const description = text.length > 0 ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  return {
    title,
    description,
    duration_minutes: duration,
    activity_date: date,
    activity_type: type,
    detected,
  };
}
