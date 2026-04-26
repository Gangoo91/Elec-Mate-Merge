// Shared helper for deriving course/section keys from apprentice study-centre URLs.
//
// Both Quiz.tsx and InlineCheck.tsx record completions into the `course_progress`
// table — they MUST agree on the (courseKey, sectionKey) pair otherwise streaks
// and stats end up reading two different rows for the same page.
//
// URL shape (Level2Routes):
//   /study-centre/apprentice/level2/module2/section3/3-5
//                            ^^^^^^^^^^^^^^         ^^^
//                            courseKey              sectionKey-suffix
//
// courseKey  → "level2-module2"
// sectionKey → "section3-3-5"  (path segments after the module joined with '-')

export function deriveProgressKeys(pathname: string): {
  courseKey: string;
  sectionKey: string;
} {
  // Strip query/hash and trailing slash, split on '/'
  const parts = pathname
    .split('?')[0]
    .split('#')[0]
    .replace(/\/$/, '')
    .split('/')
    .filter(Boolean);

  // Find the module segment, e.g. "module2"
  const moduleIdx = parts.findIndex((p) => /^module\d+$/.test(p));
  if (moduleIdx === -1) {
    return { courseKey: 'unknown', sectionKey: pathname };
  }

  const levelSegment = parts[moduleIdx - 1] ?? 'level2';
  const moduleSegment = parts[moduleIdx];
  const courseKey = `${levelSegment}-${moduleSegment}`;

  // sectionKey = whatever's after the module (e.g. "section3-3-5")
  const sectionParts = parts.slice(moduleIdx + 1);
  const sectionKey = sectionParts.length > 0 ? sectionParts.join('-') : 'landing';

  return { courseKey, sectionKey };
}
