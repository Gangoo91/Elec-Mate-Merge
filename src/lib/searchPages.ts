/**
 * searchPages — the app's one page search (ELE-1804), used by the sidebar box.
 *
 * Whole phrase first; otherwise every query word must START a word in the
 * page's name or keywords ("log hours", "photos" → "photo"). Whole words only —
 * a substring match put "Voice Survey" under "invoice". Best match ranks first:
 * name, then a keyword that is the phrase, then the rest.
 */

import { searchablePages, type SearchablePage } from '@/config/searchablePages';

/** Fire on `window` to jump to the sidebar search (header 🔍, ⌘K). */
export const OPEN_SEARCH_EVENT = 'elecmate:open-search';

/** One letter matches nearly every page — wait for two. */
export const MIN_QUERY_LENGTH = 2;

export function searchPages(query: string): SearchablePage[] {
  const q = query.trim().toLowerCase();
  if (q.length < MIN_QUERY_LENGTH) return [];
  const words = q.split(/\s+/).filter((w) => w.length > 1);

  return searchablePages
    .map((p) => {
      const name = p.name.toLowerCase();
      const keywords = p.keywords.map((k) => k.toLowerCase());
      const tokens = [name, ...keywords]
        .join(' ')
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
      const startsWord = (w: string) =>
        tokens.some(
          (t) =>
            t.startsWith(w) || (w.length > 3 && w.endsWith('s') && t.startsWith(w.slice(0, -1)))
        );
      // The name must match at the START of a word — "ai" is AI Tools, not
      // "Maintenance Specialist".
      const nameWords = name.split(/[^a-z0-9]+/).filter(Boolean);
      const nameStarts =
        name.startsWith(q) || nameWords.some((w, i) => nameWords.slice(i).join(' ').startsWith(q));
      let score = 0;
      if (nameStarts) score = 3;
      else if (keywords.some((k) => k === q || k.startsWith(q))) score = 2;
      else if (words.length > 0 && words.every(startsWord)) score = 1;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}
