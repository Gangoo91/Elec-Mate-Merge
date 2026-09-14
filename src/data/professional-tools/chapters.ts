/**
 * The six Tool Guide chapters — one definition, used by the hub cards AND by
 * each chapter page's own header.
 *
 * Kept here rather than in the hub page because both ends need it: the hub
 * renders the cards, each sub-page renders its own title and "back" target. A
 * second copy is how a renamed chapter ends up with one name on the card and a
 * different one on the page it opens.
 */

export interface ToolChapter {
  /** URL segment under /apprentice/on-job-tools/tools-guide/ */
  slug: string;
  number: string;
  eyebrow: string;
  label: string;
  description: string;
  /** Sentence under the page title. */
  blurb: string;
  /** Words a reader might search for that are not in the label. */
  keywords: string[];
}

export const TOOL_CHAPTERS: ToolChapter[] = [
  {
    slug: 'fixings',
    number: '01',
    eyebrow: 'Fittings',
    label: 'Fixings & hardware',
    description: 'Rawl plugs, bolts, glands',
    blurb:
      'Lookup tables for rawl plugs, bolts, cable glands, conduit, trunking and screws — drill sizes, safe loads, and what to use on which surface.',
    keywords: [
      'rawl',
      'wall plug',
      'bolt',
      'nut',
      'gland',
      'conduit',
      'trunking',
      'screw',
      'van stock',
    ],
  },
  {
    slug: 'hand-tools',
    number: '02',
    eyebrow: 'Bench',
    label: 'Hand tools',
    description: 'Screwdrivers, pliers, strippers',
    blurb:
      "The foundation of every electrician's toolkit. Invest in quality VDE-rated tools — they protect your life and last years longer than cheap alternatives.",
    keywords: [
      'screwdriver',
      'vde',
      'pliers',
      'cutters',
      'stripper',
      'spanner',
      'tape',
      'level',
      'hammer',
    ],
  },
  {
    slug: 'power-tools',
    number: '03',
    eyebrow: 'Cordless',
    label: 'Power tools',
    description: 'Drills, saws, cutters',
    blurb:
      'Pick one battery platform and stick with it. All your cordless tools then share the same batteries, saving you hundreds over time.',
    keywords: [
      'drill',
      'combi',
      'impact',
      'sds',
      'grinder',
      'jigsaw',
      'chaser',
      'battery',
      'torch',
    ],
  },
  {
    slug: 'test-equipment',
    number: '04',
    eyebrow: 'Test',
    label: 'Test equipment',
    description: 'MFT, RCD, loop testers',
    blurb:
      'Your test instruments are what separate you from a DIYer. An uncalibrated tester means invalid certificates — build your test kit progressively.',
    keywords: [
      'mft',
      'multifunction',
      'tester',
      'proving',
      'voltage indicator',
      'clamp',
      'pat',
      'loop',
      'rcd',
    ],
  },
  {
    slug: 'ppe',
    number: '05',
    eyebrow: 'Safety',
    label: 'PPE & safety',
    description: 'Boots, glasses, gloves',
    blurb:
      'Your PPE is non-negotiable. Every item on this list exists because someone was seriously injured without it.',
    keywords: [
      'boots',
      'gloves',
      'glasses',
      'hard hat',
      'knee pads',
      'arc flash',
      'harness',
      'mask',
    ],
  },
  {
    slug: 'suppliers',
    number: '06',
    eyebrow: 'Where to buy',
    label: 'Suppliers & budget',
    description: 'UK suppliers and trade accounts',
    blurb:
      'Where UK electricians actually buy, which supplier is best for what, and how to budget a kit across an apprenticeship. Open trade accounts early.',
    keywords: ['supplier', 'trade account', 'budget', 'screwfix', 'cef', 'buy', 'discount'],
  },
];

export const TOOLS_GUIDE_BASE = '/apprentice/on-job-tools/tools-guide';

export const chapterHref = (slug: string) => `${TOOLS_GUIDE_BASE}/${slug}`;

export const findChapter = (slug: string) => TOOL_CHAPTERS.find((c) => c.slug === slug);
