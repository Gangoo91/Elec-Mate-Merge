/**
 * Small checks applied to retrieved RAG rows before they reach a prompt.
 *
 * Search always returns *something*. Without these, a waste-handling AC was
 * grounded in BS 7671 701.418.2 (bathroom sockets), and OCR-mangled reg
 * numbers from bs7671_regulations ("134.11" for 134.1.1, "421.1201") were
 * handed to the model as citable.
 */

const STOP_WORDS = new Set(
  (
    'the a an of to in on for and or is are be it its this that with by as at from what which why how when who ' +
    'does do should must can identify describe explain state states requirements requirement understand know ' +
    'list outline types type including relevant appropriate work working purpose methods method different'
  ).split(' ')
);

function topicWords(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

/** True when `content` shares at least two topic words with `query` (or all
 *  of them, when the query only has one). */
export function relevantTo(query: string, content: string): boolean {
  const want = [...topicWords(query)];
  if (want.length === 0) return true;
  const body = topicWords(content);
  let hits = 0;
  for (const w of want) if (body.has(w) || body.has(w.replace(/s$/, ''))) hits++;
  return hits >= Math.min(2, want.length);
}

/** Chapters that exist in BS 7671 (first two digits of a reg number). */
const REAL_CHAPTERS = new Set(
  '11 12 13 30 31 32 33 34 35 36 41 42 43 44 45 46 51 52 53 54 55 56 57 64 65 70 71 72 73 74 75 82'.split(
    ' '
  )
);

/** OCR joins found in bs7671_regulations by checking every number against
 *  the rest of the table (4 Oct 2026): each one's dotted reading, or its
 *  would-be parent, exists, and it has no children of its own. Real
 *  two-digit numbers such as 643.11, 132.16 and 514.12 are NOT here. */
const OCR_JOINS = new Set(
  (
    '110.24 134.11 410.34 412.11 414.11 417.21 421.11 421.15 422.21 422.34 422.41 434.53 ' +
    '442.11 443.41 444.410 444.41 445.11 527.13 544.11 551.74 559.41 622.85'
  ).split(' ')
);

/** False for reg numbers that aren't real BS 7671 regulations: wrong shape
 *  (incl. 4-digit parts like "421.1201"), a chapter that doesn't exist, or
 *  a known OCR join. */
export function citableReg(reg: string): boolean {
  if (!/^[1-8]\d{2}(\.\d{1,3})+$/.test(reg)) return false;
  if (!REAL_CHAPTERS.has(reg.slice(0, 2))) return false;
  return !OCR_JOINS.has(reg);
}
