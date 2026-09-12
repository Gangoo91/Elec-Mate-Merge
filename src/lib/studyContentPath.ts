/**
 * studyContentPath — is this URL a lesson, or a menu?
 *
 * "Pick up where you left off" is only worth tapping if it lands you on the
 * page you were actually reading. Three of the four route trackers wrote the
 * resume point on every navigation, so a course index counted as study: of the
 * 800 profiles carrying a resume point, 467 pointed at a course landing page
 * and only 226 at real content. Tapping Continue dropped you on a menu you had
 * just come from, which is the same as the feature not existing.
 *
 * Path shapes are not consistent across the courses — two dialects are live:
 *
 *   nested  /study-centre/apprentice/level2/module1/section1/1-1
 *   flat    /study-centre/apprentice/level3-module3-section1-1
 *
 * so segment depth cannot decide it (a flat content page is three segments
 * deep, a nested module landing is four). What separates a lesson from a menu
 * in BOTH dialects is that a lesson names a section, a subsection or an exam.
 * That is the test below.
 */

/** Segments that mean "a menu", whatever comes before them. */
const INDEX_TAIL = /^(study-centre|apprentice|upskilling|college|courses?|modules?)$/i;

/** A lesson names a section, a subsection, a numbered page, or an assessment. */
const CONTENT_MARKER = /(^|[/-])(section|subsection|lesson|topic|unit|part)[-\d]|mock-?exam|\bquiz\b|(^|\/)\d+[-.]\d+$/i;

/** A module landing page — `/module4`, `-module-2` — with nothing after it. */
const MODULE_TAIL = /(^|[/-])modules?[-]?\d*$/i;

/** Reference pages. Real content, but not somewhere to "resume" a course. */
const REFERENCE = /(^|\/)(glossary|resources?|downloads?|reference|overview|index)$/i;

/**
 * True when `pathname` is a page a learner was reading, rather than a menu
 * they passed through. Used by every study route tracker so the resume point
 * means the same thing whichever course wrote it.
 */
export function isStudyContentPath(pathname: string): boolean {
  if (!pathname) return false;

  const path = pathname.replace(/\/+$/, '');
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return false;

  const tail = segments[segments.length - 1];
  if (INDEX_TAIL.test(tail)) return false;
  if (REFERENCE.test(path)) return false;

  // A module landing page is a menu even though it sits deep in the tree.
  // Checked before CONTENT_MARKER so `/module-1` cannot match on its digits.
  if (MODULE_TAIL.test(tail)) return false;

  return CONTENT_MARKER.test(path);
}

/**
 * The title to store alongside it. `document.title` carries the site suffix
 * and sometimes the course name, and a resume card has one line to work with.
 */
export function studyTitleFromDocument(fallback: string): string {
  if (typeof document === 'undefined') return fallback;
  const raw = document.title?.split('|')[0]?.trim();
  return raw && raw.length > 1 ? raw : fallback;
}
