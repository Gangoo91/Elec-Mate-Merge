/**
 * Readable topic label for an exam question, whichever field the bank uses.
 *
 * Lives in its own module rather than beside the panels: a non-component
 * export from a component file breaks React fast refresh.
 *
 * Order matters. The Level 3 banks store `section` as a bare outline number
 * ("1.4", "1.10") and put the readable name in `topic`. Reading `section`
 * first produced a "What to study next" list reading 1.4, 1.3, 1.7, 1.1 —
 * which tells a learner nothing about what to revise. Anything that is only
 * digits and dots is an outline reference, not a label.
 */

export interface TopicLabelled {
  section?: string;
  topic?: string;
  category?: string;
}

const isOutlineRef = (v: string) => /^[\d.]+$/.test(v.trim());

/**
 * Optional section-number → readable-name map, exported by the banks that
 * carry no `topic` field at all (level 3 modules 3–7). Key shapes differ
 * between banks: modules 3, 4, 6 and 7 key on the full section ('7.2'),
 * module 5 on the leading segment ('3' for '3.4'), so both are tried.
 */
export type SectionTopicMap = Record<string, string>;

export function topicLabelOf(q: TopicLabelled, names?: SectionTopicMap): string | null {
  const s = q.section;
  if (s && names) {
    const mapped = names[s] ?? names[s.split('.')[0]];
    if (mapped) return mapped;
  }
  for (const v of [q.topic, q.category, s]) {
    if (v && !isOutlineRef(v)) return v;
  }
  // Every candidate was an outline number — prefix it so it at least reads as
  // a syllabus reference rather than a bare figure.
  const ref = s || q.topic || q.category;
  return ref ? `Section ${ref}` : null;
}
