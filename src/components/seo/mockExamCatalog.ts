/**
 * mockExamCatalog — single source of truth for the 38 free mock exams + hub.
 *
 * Used by PublicMockExamPage to render "Related mock exams" at the bottom
 * of each page (cross-linking improves user dwell time + internal authority
 * flow). Keeping this list in one place means swapping a slug only needs an
 * edit here, not in every page file.
 */

export type MockExamGroup = 'trade' | 'electrical' | 'level2' | 'level3';

export interface MockExamCatalogEntry {
  slug: string;
  title: string;
  group: MockExamGroup;
  qCount: number;
}

export const MOCK_EXAM_CATALOG: MockExamCatalogEntry[] = [
  // Trade certifications (10)
  { slug: 'cscs-card', title: 'CSCS Card Mock Test', group: 'trade', qCount: 200 },
  { slug: 'first-aid', title: 'First Aid at Work', group: 'trade', qCount: 200 },
  { slug: 'ipaf', title: 'IPAF MEWP Operator', group: 'trade', qCount: 200 },
  { slug: 'pasma', title: 'PASMA Towers for Users', group: 'trade', qCount: 200 },
  { slug: 'asbestos-awareness', title: 'Asbestos Awareness', group: 'trade', qCount: 200 },
  {
    slug: 'working-at-height',
    title: 'Working at Height (WAHR 2005)',
    group: 'trade',
    qCount: 200,
  },
  { slug: 'manual-handling', title: 'Manual Handling (MHOR 1992)', group: 'trade', qCount: 200 },
  { slug: 'coshh', title: 'COSHH (Hazardous Substances)', group: 'trade', qCount: 200 },
  { slug: 'fire-safety', title: 'Fire Safety Awareness', group: 'trade', qCount: 200 },
  { slug: 'confined-spaces', title: 'Confined Spaces (CSR 1997)', group: 'trade', qCount: 200 },

  // Electrical exams (14)
  { slug: '18th-edition-bs-7671', title: '18th Edition BS 7671', group: 'electrical', qCount: 300 },
  {
    slug: '2391-inspection-testing',
    title: 'C&G 2391 Inspection & Testing',
    group: 'electrical',
    qCount: 300,
  },
  {
    slug: '2391-51-periodic-inspection',
    title: 'C&G 2391-51 Periodic Inspection',
    group: 'electrical',
    qCount: 296,
  },
  {
    slug: '2391-50-initial-verification',
    title: 'C&G 2391-50 Initial Verification',
    group: 'electrical',
    qCount: 275,
  },
  {
    slug: 'am2-online-knowledge-test',
    title: 'AM2 Online Knowledge Test',
    group: 'electrical',
    qCount: 177,
  },
  { slug: 'pat-testing', title: 'PAT Testing (C&G 2377)', group: 'electrical', qCount: 120 },
  {
    slug: 'emergency-lighting',
    title: 'Emergency Lighting (BS 5266)',
    group: 'electrical',
    qCount: 300,
  },
  {
    slug: 'fire-alarm',
    title: 'Fire Alarm Systems (BS 5839-1)',
    group: 'electrical',
    qCount: 150,
  },
  { slug: 'ev-charging', title: 'EV Charging Installation', group: 'electrical', qCount: 150 },
  { slug: 'data-cabling', title: 'Data Cabling', group: 'electrical', qCount: 150 },
  {
    slug: 'renewable-energy',
    title: 'Renewable Energy & Solar PV',
    group: 'electrical',
    qCount: 200,
  },
  { slug: 'smart-home', title: 'Smart Home Technology', group: 'electrical', qCount: 200 },
  {
    slug: 'industrial-electrical',
    title: 'Industrial Electrical',
    group: 'electrical',
    qCount: 120,
  },
  { slug: 'instrumentation', title: 'Instrumentation', group: 'electrical', qCount: 125 },
  { slug: 'bms', title: 'Building Management Systems', group: 'electrical', qCount: 245 },
  { slug: 'fibre-optics', title: 'Fibre Optics', group: 'electrical', qCount: 250 },

  // Level 2 (5)
  {
    slug: 'level-2-electrical-health-safety',
    title: 'L2 Unit 1 — Health & Safety',
    group: 'level2',
    qCount: 301,
  },
  {
    slug: 'level-2-electrical-principles',
    title: 'L2 Unit 2 — Electrical Principles',
    group: 'level2',
    qCount: 301,
  },
  {
    slug: 'level-2-installation-theory',
    title: 'L2 Unit 3 — Installation Theory',
    group: 'level2',
    qCount: 301,
  },
  {
    slug: 'level-2-installation-practice',
    title: 'L2 Unit 4 — Installation Practice',
    group: 'level2',
    qCount: 301,
  },
  {
    slug: 'level-2-communications-career',
    title: 'L2 Unit 5 — Comms & Career',
    group: 'level2',
    qCount: 301,
  },

  // Level 3 (7)
  {
    slug: 'level-3-electrical-health-safety',
    title: 'L3 Unit 1 — H&S (Supervisor)',
    group: 'level3',
    qCount: 251,
  },
  {
    slug: 'level-3-environmental-technologies',
    title: 'L3 Unit 2 — Environmental Tech',
    group: 'level3',
    qCount: 251,
  },
  {
    slug: 'level-3-electrical-science',
    title: 'L3 Unit 3 — Electrical Science',
    group: 'level3',
    qCount: 251,
  },
  {
    slug: 'level-3-fault-diagnosis',
    title: 'L3 Unit 4 — Fault Diagnosis',
    group: 'level3',
    qCount: 251,
  },
  {
    slug: 'level-3-inspection-testing',
    title: 'L3 Unit 5 — Inspection & Testing',
    group: 'level3',
    qCount: 201,
  },
  {
    slug: 'level-3-systems-design',
    title: 'L3 Unit 6 — Systems Design',
    group: 'level3',
    qCount: 201,
  },
  {
    slug: 'level-3-career-development',
    title: 'L3 Unit 7 — Career Development',
    group: 'level3',
    qCount: 201,
  },
];

/**
 * Return up to N other mock exams in the same group as the given slug,
 * preferring slugs different from the current one. Falls back to a
 * cross-group mix if the current group has fewer than N siblings.
 */
export function getRelatedMockExams(slug: string, limit = 4): MockExamCatalogEntry[] {
  const self = MOCK_EXAM_CATALOG.find((e) => e.slug === slug);
  if (!self) return MOCK_EXAM_CATALOG.slice(0, limit);
  const sameGroup = MOCK_EXAM_CATALOG.filter((e) => e.group === self.group && e.slug !== slug);
  if (sameGroup.length >= limit) return sameGroup.slice(0, limit);
  const others = MOCK_EXAM_CATALOG.filter((e) => e.slug !== slug && e.group !== self.group);
  return [...sameGroup, ...others].slice(0, limit);
}
