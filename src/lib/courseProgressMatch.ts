// Canonical matcher for `course_progress` rows (ELE-1045).
//
// The Study Centre accumulated EIGHT incompatible (course_key, section_key)
// formats over time — apprentice-derived (`am2-module1` + `section1-quiz`),
// the `apprentice` slash scheme (`am2/module1/section1`), upskilling
// (`bs7671` + `module-1-section-1`), legacy hardcoded (`health-safety` +
// `section-1`), a broken `unknown` full-path fallback, etc. The overview cards
// used to match with `===`/`startsWith` against a slash-split URL, so hyphenated
// rows never matched and progress appeared empty even though it was recorded.
//
// This module canonicalises BOTH sides into comparable token sequences so a
// card can find its progress rows regardless of which writer produced them —
// without migrating the ~2.7k existing rows.

export interface CourseProgressLike {
  course_key: string;
  section_key: string | null;
  completed?: boolean;
  progress_pct?: number;
}

// App-shell path segments that carry no course meaning.
const SHELL = new Set([
  'study',
  'centre',
  'study-centre',
  'studycentre',
  'apprentice',
  'apprentice-courses',
  'courses',
  'electrician',
  'upskilling',
  'general-upskilling',
  'general',
  'www',
  'elec-mate',
  'course',
  'prep',
  'hub',
  'index',
  'landing',
  'home',
]);

// Split `module1`/`section3` into `module 1` / `section 3` so they tokenise the
// same as `module-1` / `section-3`, while leaving course names (am2, bs7671,
// elec2-04) intact.
function normalize(s: string): string {
  return String(s || '')
    .toLowerCase()
    .replace(/module(\d)/g, 'module-$1')
    .replace(/section(\d)/g, 'section-$1');
}

export function tokens(s: string | null | undefined): string[] {
  return normalize(s || '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((t) => !SHELL.has(t));
}

// Drop trailing quiz/check noise to get a section-level stem.
function stem(t: string[]): string[] {
  const i = t.findIndex((x) => x === 'check' || x === 'quiz');
  return i === -1 ? t : t.slice(0, i);
}

function contiguous(haystack: string[], needle: string[]): boolean {
  if (needle.length === 0) return false;
  for (let i = 0; i + needle.length <= haystack.length; i++) {
    let ok = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}

function rowTokens(row: CourseProgressLike): string[] {
  return tokens(`${row.course_key}/${row.section_key ?? ''}`);
}

/** True if the row belongs under the module/course the target path points to. */
export function rowMatchesModule(row: CourseProgressLike, targetPath: string): boolean {
  const t = tokens(targetPath);
  if (t.length === 0) return false;
  const r = rowTokens(row);
  // Bidirectional: the target's course/module signature may be a subsequence of
  // the (longer) row tokens, or the row's may be a subsequence of the target.
  return contiguous(r, t) || contiguous(t, r);
}

/** True if the row corresponds to the specific section the target path points to. */
export function rowMatchesSection(row: CourseProgressLike, targetPath: string): boolean {
  const r = stem(rowTokens(row));
  const t = stem(tokens(targetPath));
  if (t.length === 0 || r.length === 0) return false;
  return contiguous(r, t) || contiguous(t, r);
}

/** Aggregate module-level progress for the cards that point at a module/course. */
export function moduleProgress(
  rows: CourseProgressLike[],
  targetPath: string
): { completed: boolean; pct: number } {
  const matching = rows.filter((r) => rowMatchesModule(r, targetPath));
  if (matching.length === 0) return { completed: false, pct: 0 };
  return {
    completed: matching.some((r) => r.completed),
    pct: Math.max(0, ...matching.map((r) => r.progress_pct ?? 0)),
  };
}

/** True if any matching row for the target section is completed. */
export function sectionCompleted(rows: CourseProgressLike[], targetPath: string): boolean {
  return rows.some((r) => r.completed && rowMatchesSection(r, targetPath));
}

/**
 * Count of DISTINCT completed sections for a course/route key. Used by the hub
 * index pages whose old `course_key === routeKey || startsWith(routeKey+'/')`
 * predicate counted 0 for apprentice families (`am2-module1` ≠ `am2`). Dedupes
 * the many per-check / per-quiz rows down to one per section.
 */
export function completedSectionsForCourse(
  rows: CourseProgressLike[],
  courseTarget: string
): number {
  const seen = new Set<string>();
  for (const r of rows) {
    if (!r.completed) continue;
    if (!rowMatchesModule(r, courseTarget)) continue;
    const key = stem(rowTokens(r)).join('/');
    if (key) seen.add(key);
  }
  return seen.size;
}
