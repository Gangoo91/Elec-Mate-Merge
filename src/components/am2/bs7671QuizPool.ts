/**
 * Shared question-pool logic for the AM2 BS 7671 spot check and drill.
 *
 * Why this exists: `bs7671_facets` also holds Approved Document, GN3, OSG,
 * BS 5839 and legislation rows, and `bs7671_regulations` carries every
 * document's clause numbers plus a fair number of OCR-mangled ones
 * ("421.1201", "622.85", "417.21"). The old spot check took the newest
 * 200 facets, which after the 30 Sep Building Regs load were ALL Approved
 * Document rows. Everything here keeps the quiz to real BS 7671 regs.
 */
import { supabase } from '@/integrations/supabase/client';

export interface PoolReg {
  id: string;
  reg_number: string;
  title: string | null;
  part: string | null;
  part_number: number | null;
}

export interface PoolFacet {
  id: string;
  content: string;
  regulation_id: string | null;
}

/** BS 7671 chapters that exist (first two digits of a reg number). */
const REAL_CHAPTERS = new Set([
  '11',
  '12',
  '13',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '64',
  '65',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '82',
]);

/** How often each Part comes up. Parts 4–6 are what the AM2 leans on. */
const PART_WEIGHTS: Record<number, number> = { 1: 1, 3: 0.5, 4: 3, 5: 3, 6: 2.5, 7: 1, 8: 0.3 };

const REG_SHAPE = /^[1-8]\d{2}(\.\d{1,3})+$/; // also rejects "421.1201"-style OCR joins
// Optional Table/Figure prefix captured so those references can be ignored.
const REG_IN_TEXT = /(Table |Figure )?\b([1-8]\d{2}(?:\.\d+)+)\b/g;
const META_TEXT =
  /changes described|redraft|amendment|consult the full text|^example\b|this (?:facet|chunk|section of the document)/i;

export function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function sectionOf(regNumber: string): string {
  return regNumber.split('.')[0];
}

function isFamily(a: string, b: string): boolean {
  return a === b || a.startsWith(`${b}.`) || b.startsWith(`${a}.`);
}

/** Shape check plus an OCR check: "421.11" with no children is almost
 *  always a mangled "421.1.1" — drop it when that reading exists, or (for
 *  a two-part number outside Part 7, whose 7xx.41-style numbers are real)
 *  when its would-be parent "421.1" does. Drops ~25 of ~1,440. */
function looksReal(reg: PoolReg, all: Set<string>, prefixes: Set<string>): boolean {
  const n = reg.reg_number;
  if (!REG_SHAPE.test(n)) return false;
  if (reg.part_number == null || String(reg.part_number) !== n[0]) return false;
  if (!REAL_CHAPTERS.has(n.slice(0, 2))) return false;
  if (prefixes.has(n)) return true; // has children, so it's a real heading
  const parts = n.split('.');
  for (let i = 1; i < parts.length; i++) {
    const c = parts[i];
    for (let k = 1; k < c.length; k++) {
      if (c[k] === '0') continue;
      const head = [...parts.slice(0, i), c.slice(0, k)].join('.');
      if (all.has([head, c.slice(k), ...parts.slice(i + 1)].join('.'))) return false;
      if (n[0] !== '7' && parts.length === 2 && (all.has(head) || prefixes.has(head))) return false;
    }
  }
  return true;
}

/** Many stored titles are the first line of the reg text cut off
 *  mid-sentence ("Every  item  of equipment  shall  be"). Show a title
 *  only when it reads like a heading. */
export function cleanTitle(title: string | null): string | null {
  if (!title) return null;
  const t = title.replace(/\s+/g, ' ').trim();
  if (t.length < 4 || t.length > 60) return null;
  if (!/^[A-Z]/.test(t)) return null;
  if (/\b(shall|should|where|which|the|of|and|or|to|in|is|be)$/i.test(t)) return null;
  if (/\bshall\b|\(Regulation|\bRegulation \d/i.test(t)) return null;
  return t;
}

/** Load every plausible BS 7671 regulation, one query per Part. */
export async function loadRealRegs(): Promise<PoolReg[]> {
  const parts = Object.keys(PART_WEIGHTS).map(Number);
  const results = await Promise.all(
    parts.map((p) =>
      supabase
        .from('bs7671_regulations')
        .select('id, reg_number, title, part, part_number')
        .eq('part_number', p)
        .limit(1000)
    )
  );
  const rows: PoolReg[] = [];
  for (const r of results) {
    if (r.error) throw r.error;
    rows.push(...((r.data ?? []) as PoolReg[]));
  }
  // One row per reg number (editions can duplicate).
  const byNumber = new Map<string, PoolReg>();
  for (const r of rows) if (!byNumber.has(r.reg_number)) byNumber.set(r.reg_number, r);
  const all = new Set(byNumber.keys());
  const prefixes = new Set<string>();
  for (const n of all) {
    const bits = n.split('.');
    for (let i = 2; i < bits.length; i++) prefixes.add(bits.slice(0, i).join('.'));
  }
  return [...byNumber.values()]
    .filter((r) => looksReal(r, all, prefixes))
    .map((r) => ({ ...r, title: cleanTitle(r.title) }));
}

/** A facet is usable if it's real BS 7671 text, long enough to reason
 *  from, not a note about the amendment itself, and actually about the
 *  reg it's tagged to (not mainly citing some other reg). */
export function isUsableFacet(content: string | null | undefined, regNumber: string): boolean {
  if (!content || content.length < 100 || content.length > 900) return false;
  if (META_TEXT.test(content)) return false;
  const cited = [...content.matchAll(REG_IN_TEXT)].filter((m) => !m[1]).map((m) => m[2]);
  if (cited.length === 0) return true;
  const citesOwn = cited.some((c) => isFamily(c, regNumber));
  const citesOther = cited.some((c) => !isFamily(c, regNumber));
  return citesOwn || !citesOther;
}

const STOP_WORDS = new Set(
  (
    'the a an of to in on for and or is are be it its this that with by as at from shall should must may ' +
    'not any all where which such than other been have has being regulation regulations requirement ' +
    'requirements applies apply provided accordance used using installation electrical equipment'
  ).split(' ')
);

function topicWords(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z ]+/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w))
  );
}

/** Judge the stored printed text. "ok": it reads "<number>  <words>", so a
 *  facet can be checked against it. "fragment": the text after the number
 *  starts with another number — a contents page or table row ("443.11
 *  444.1(e) 444.4.1 NOTE…", "418.3 419 CHAPTER 41…"). Real regs land here
 *  too, so a fragment only rules a reg out when its number also has the
 *  OCR-join shape (two parts, second part 10+). */
function storedText(fullText: string | null, regNumber: string): 'ok' | 'fragment' | 'bad' {
  if (!fullText) return 'fragment';
  const t = fullText.trim();
  const after = (t.startsWith(regNumber) ? t.slice(regNumber.length) : t).trim();
  if (!/^\d/.test(after) && (after.match(/[A-Za-z]{3,}/g) ?? []).length >= 6) return 'ok';
  const parts = regNumber.split('.');
  const joinShape = parts.length === 2 && parts[1].length >= 2 && Number(parts[1]) >= 10;
  return joinShape ? 'bad' : 'fragment';
}

/** Facets are sometimes filed against the wrong reg. Keep one only if it
 *  shares at least three topic words with that reg's own printed text. */
function facetMatchesReg(content: string, fullText: string | null): boolean {
  if (!fullText) return true;
  const own = topicWords(fullText);
  let hits = 0;
  for (const w of topicWords(content)) if (own.has(w)) hits++;
  return hits >= 3;
}

/** Fetch BS 7671 facets for the given regs and return one usable facet per reg. */
export async function pickFacets(regs: PoolReg[]): Promise<Map<string, PoolFacet>> {
  if (regs.length === 0) return new Map();
  const numberById = new Map(regs.map((r) => [r.id, r.reg_number]));
  const ids = regs.map((r) => r.id);
  const [facetRes, textRes] = await Promise.all([
    supabase
      .from('bs7671_facets')
      .select('id, content, regulation_id')
      .in('regulation_id', ids)
      .eq('document_type', 'bs7671')
      .gte('confidence_score', 0.5)
      .limit(600),
    supabase.from('bs7671_regulations').select('id, full_text').in('id', ids),
  ]);
  if (facetRes.error) throw facetRes.error;
  if (textRes.error) throw textRes.error;
  const textById = new Map(
    ((textRes.data ?? []) as Array<{ id: string; full_text: string | null }>).map((r) => [
      r.id,
      r.full_text,
    ])
  );
  const byReg = new Map<string, PoolFacet[]>();
  for (const f of (facetRes.data ?? []) as PoolFacet[]) {
    const n = f.regulation_id ? numberById.get(f.regulation_id) : undefined;
    if (!n || !isUsableFacet(f.content, n)) continue;
    const fullText = textById.get(f.regulation_id!) ?? null;
    const text = storedText(fullText, n);
    if (text === 'bad' || (text === 'ok' && !facetMatchesReg(f.content, fullText))) continue;
    const arr = byReg.get(f.regulation_id!) ?? [];
    arr.push(f);
    byReg.set(f.regulation_id!, arr);
  }
  const out = new Map<string, PoolFacet>();
  for (const [id, arr] of byReg) out.set(id, arr[Math.floor(Math.random() * arr.length)]);
  return out;
}

/** Choose candidate regs weighted by Part, one per section where possible,
 *  avoiding anything in `avoidIds` unless the pool runs dry. */
export function chooseCandidates(
  regs: PoolReg[],
  count: number,
  avoidIds: Set<string> = new Set()
): PoolReg[] {
  const byPart = new Map<number, PoolReg[]>();
  for (const r of regs) {
    if (r.part_number == null) continue;
    const arr = byPart.get(r.part_number) ?? [];
    arr.push(r);
    byPart.set(r.part_number, arr);
  }
  const weighted = [...byPart.keys()].map((p) => ({ p, w: PART_WEIGHTS[p] ?? 0 }));
  const totalW = weighted.reduce((s, x) => s + x.w, 0);
  const picked: PoolReg[] = [];
  const usedSections = new Set<string>();
  const usedIds = new Set<string>();
  for (let guard = 0; picked.length < count && guard < count * 40; guard++) {
    let roll = Math.random() * totalW;
    let part = weighted[0]?.p;
    for (const x of weighted) {
      roll -= x.w;
      if (roll <= 0) {
        part = x.p;
        break;
      }
    }
    const pool = byPart.get(part!) ?? [];
    const relaxed = guard > count * 20;
    const options = pool.filter(
      (r) =>
        !usedIds.has(r.id) &&
        (relaxed || !usedSections.has(sectionOf(r.reg_number))) &&
        (relaxed || !avoidIds.has(r.id))
    );
    if (options.length === 0) continue;
    const r = options[Math.floor(Math.random() * options.length)];
    picked.push(r);
    usedIds.add(r.id);
    usedSections.add(sectionOf(r.reg_number));
  }
  return picked;
}

/** Correct reg + three distractors from the same Part but a different
 *  section, so the right answer can be reasoned to from the text rather
 *  than told apart from its own sub-paragraphs. */
export function buildRegOptions(
  correct: PoolReg,
  regs: PoolReg[]
): Array<{ id: string; reg_number: string }> {
  const section = sectionOf(correct.reg_number);
  const samePart = regs.filter(
    (r) => r.part_number === correct.part_number && sectionOf(r.reg_number) !== section
  );
  const pool =
    samePart.length >= 3 ? samePart : regs.filter((r) => sectionOf(r.reg_number) !== section);
  const distractors: PoolReg[] = [];
  const seenSections = new Set([section]);
  for (const r of shuffle(pool)) {
    if (distractors.length >= 3) break;
    const s = sectionOf(r.reg_number);
    if (seenSections.has(s)) continue;
    seenSections.add(s);
    distractors.push(r);
  }
  return shuffle([correct, ...distractors].map((r) => ({ id: r.id, reg_number: r.reg_number })));
}

/** Keep the answer out of the prompt. */
export function redactRegNumbers(text: string, regNumber: string): string {
  if (!text) return '';
  let out = text.replace(new RegExp(regNumber.replace(/\./g, '\\.'), 'g'), '[regulation]');
  out = out.replace(/\b\d{3}\.\d+(?:\.\d+)*\b/g, '[regulation]');
  out = out.replace(/Regulation\s+\[regulation\]/gi, '[regulation]');
  out = out.replace(/Reg\.?\s+\[regulation\]/gi, '[regulation]');
  return out;
}
