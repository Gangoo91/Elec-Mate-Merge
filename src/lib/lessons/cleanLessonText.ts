/**
 * Strips internal retrieval jargon from saved lesson text before a tutor or
 * learner reads it. Plans generated before 7 Oct 2026 can say things like
 * "Printed extract from On-Site Guide / HSG85 (facet 2,14)" or "Slides with
 * GN3 extracts (facets 1,11,13,16)": the facet numbers are the generator's
 * context ids and mean nothing to anyone. The generator no longer writes them.
 *
 * Only facet IDS and the generator's own phrasing are touched. The ordinary
 * English word stays ("every facet of safe isolation" is left alone).
 */
export function cleanLessonText(s: string | null | undefined): string {
  return String(s ?? '')
    .replace(/\s*\((?:see\s+)?facets?\s*#?\s*\d[\d,\s&and]*\)/gi, '')
    .replace(/\bfacets?\s*#?\s*\d[\d,\s]*/gi, '')
    .replace(/\bcited_facets\b/gi, 'citations')
    .replace(/\b(?:GN3\/OSG\/BS\s?7671|BS\s?7671\/GN3\/OSG)\s+facets\b/gi, 'references')
    .replace(/\bfacets (used|cited|provided|flagged)\b/gi, 'references $1')
    .replace(/\s+([.,;:])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/** Multi-line text cleaned line by line, so line breaks and list indents survive. */
export function cleanLessonShown(s: string): string {
  if (!/facet/i.test(s)) return s;
  return s
    .split('\n')
    .map((line) => {
      if (!/facet/i.test(line)) return line;
      const indent = line.match(/^\s*/)?.[0] ?? '';
      return indent + cleanLessonText(line);
    })
    .join('\n');
}

/** Every string inside a plan (or a refine draft), cleaned. Ids contain no "facet". */
export function cleanLessonDeep<T>(v: T): T {
  if (typeof v === 'string') return cleanLessonShown(v) as unknown as T;
  if (Array.isArray(v)) return v.map((x) => cleanLessonDeep(x)) as unknown as T;
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) out[k] = cleanLessonDeep(x);
    return out as T;
  }
  return v;
}
