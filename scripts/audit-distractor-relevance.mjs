#!/usr/bin/env node
/**
 * audit-distractor-relevance — ELE-1803.
 *
 * Blake (Level 2): "sometimes it's so obvious what the answer is, you can't get
 * it wrong, because the answers generated aren't even relevant to the
 * question." The length checks never saw this — a throwaway option of the
 * same length as the key passes them. This scores the tells a learner uses to
 * eliminate options WITHOUT knowing the subject:
 *
 *   throwaway  a distractor that is a stock non-answer: "to improve
 *              appearance", "to reduce cost", "no reason", "it never needs…",
 *              "only if it carries data cables", "whenever it is convenient".
 *   absolute   a distractor built on never/always/any/none against a
 *              qualified key — the learner learns "absolutes are wrong".
 *   relevance  the key shares content words with the question and NO
 *              distractor does — the right answer is the only on-topic one.
 *
 * A question is FLAGGED when it has a throwaway distractor, or the relevance
 * tell plus at least one other tell. Flags are leads for a human rewrite,
 * not verdicts.
 *
 *   node scripts/audit-distractor-relevance.mjs <mcqs.jsonl> [--area=level2] [--out=flagged.jsonl]
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [, , input, ...rest] = process.argv;
const args = Object.fromEntries(rest.map((a) => a.replace(/^--/, '').split('=')));
const rows = readFileSync(input, 'utf8').trim().split('\n').map((l) => JSON.parse(l));

const THROWAWAY = [
  /\b(improve|better|nicer|neater) (the )?(appearance|look|looks|aesthetics?)\b/i,
  /\bfor (decoration|decorative|aesthetic|cosmetic) (reasons|purposes)?\b/i,
  /\b(to )?(look|looks) (nicer|better|good|neat|tidy)\b/i,
  /\b(to )?(reduce|save|lower|cut) (material |the )?(costs?|money)\b/i,
  /\b(it'?s|it is|because it is) (cheaper|quicker|faster|easier)\b/i,
  /\bno (particular )?reason\b/i,
  /\bit (does ?n['o]t|does not) matter\b/i,
  /\bnot (important|necessary|required) at all\b/i,
  /\bwhenever (it is|it's) convenient\b/i,
  /\b(just |simply )?(guess|ignore it|do nothing|leave it)\b/i,
  /\bfor fun\b/i,
  /\bto make (it|the job) (quicker|faster|easier)\b/i,
  /\b(personal|own) preference\b/i,
  /\bat (the )?(installer'?s|electrician'?s|customer'?s) discretion\b/i,
];
const ABSOLUTE = /\b(never|always|no need|not needed|any|none|nothing|every(thing)?|all cases|without exception)\b/i;
const STOP = new Set(
  'the a an of to in on for and or is are be it its this that with by as at from what which why how when who whose where does do should must can may will would your you their there than then into out about under over not no only most main one two use used using type types give name state reason reasons between both each per'.split(
    ' '
  )
);
const words = (s) =>
  new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map((w) => w.replace(/(ing|ed|es|s)$/, ''))
  );

// Answers from OTHER questions on the same page, by file. A distractor that is
// word-for-word another question's option is the signature of generated
// content shuffled across questions ("What do detuned reactors do?" →
// "Knowledge, skills and safety understanding"). Only phrases of 15+ chars, so
// "True", "500 V" and "Both" do not count.
const optionsByFile = new Map();
rows.forEach((r, i) => {
  const m = optionsByFile.get(r.file) ?? new Map();
  for (const o of r.options) {
    if (o.length < 15) continue;
    const owners = m.get(o) ?? new Set();
    owners.add(i);
    m.set(o, owners);
  }
  optionsByFile.set(r.file, m);
});

const scored = rows
  .map((r, idx) => ({ r, idx }))
  .filter(({ r }) => !args.area || r.area === args.area)
  .map(({ r, idx }) => {
    const stem = words(r.question);
    const overlap = (o) => [...words(o)].filter((w) => stem.has(w)).length;
    const keyText = r.options[r.key];
    const distractors = r.options.filter((_, i) => i !== r.key);
    const throwaway = distractors.filter((d) => THROWAWAY.some((re) => re.test(d)));
    const absolutes = distractors.filter((d) => ABSOLUTE.test(d)).length;
    const keyAbsolute = ABSOLUTE.test(keyText);
    const relevance = overlap(keyText) >= 1 && distractors.every((d) => overlap(d) === 0);
    const fileOpts = optionsByFile.get(r.file);
    const borrowed = distractors.filter((d) => {
      const owners = fileOpts.get(d);
      if (!owners) return false;
      // Owned by another question whose stem differs (a repeated question is fine).
      if (![...owners].some((j) => j !== idx && rows[j].question !== r.question)) return false;
      // Reusing a believable option from a related question is fine. Flag it
      // only when it has nothing to do with THIS question: no shared content
      // word with the stem or the key.
      const kw = words(keyText);
      const dw = [...words(d)];
      return overlap(d) === 0 && !dw.some((w) => kw.has(w));
    });
    const tells = [];
    if (borrowed.length) tells.push(`borrowed: ${borrowed.join(' | ')}`);
    if (throwaway.length) tells.push(`throwaway: ${throwaway.join(' | ')}`);
    if (absolutes >= 2 && !keyAbsolute) tells.push('absolutes');
    if (relevance) tells.push('relevance');
    const flagged = borrowed.length > 0 || throwaway.length > 0 || (relevance && tells.length >= 2) || (absolutes >= 2 && !keyAbsolute && relevance);
    return { ...r, tells, flagged, borrowed: borrowed.length };
  });

const flagged = scored.filter((s) => s.flagged);
const byArea = {};
for (const s of scored) {
  byArea[s.area] ??= { n: 0, f: 0 };
  byArea[s.area].n++;
  if (s.flagged) byArea[s.area].f++;
}
console.log(`${flagged.length} of ${scored.length} flagged (${((100 * flagged.length) / scored.length).toFixed(1)}%)`);
console.log(`  of which borrowed-answer: ${scored.filter((s) => s.borrowed).length}`);
for (const [a, v] of Object.entries(byArea).sort((x, y) => y[1].n - x[1].n))
  console.log(`  ${a.padEnd(14)} ${String(v.f).padStart(5)} / ${v.n}`);
if (args.out) writeFileSync(args.out, flagged.map((s) => JSON.stringify(s)).join('\n') + '\n');
