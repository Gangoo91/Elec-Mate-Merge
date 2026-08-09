/**
 * Category helpers for the Hazard Database.
 *
 * The `CategoryPill` component that gave this file its name was never
 * rendered — the page builds its chips from `FilterBar` — and it carried a
 * lucide icon per category, which is decoration this hub does not use.
 * Removed; the normalisation and labelling helpers are what the page imports.
 */
// Category data with proper typing
export interface Category {
  id: string;
  name: string;
  count: number;
}

/**
 * Canonical category id for a raw `category` string.
 *
 * The dataset carries 54 distinct category values for 105 hazards, because the
 * same category was written several ways as entries were added over time:
 * 'electrical' and 'Electrical'; 'testing-inspection', 'testing' and
 * 'Testing & Inspection'; 'height' and 'Working at Height'; 'confined-space'
 * and 'Confined Spaces'. The filter counted the raw strings, so each spelling
 * became its own chip — meaning "Electrical" showed 1 hazard while seven more
 * sat under a chip of the same name further along the row, and no single
 * selection ever showed you everything in that category.
 *
 * Normalising here rather than editing 105 records keeps one rule to maintain
 * and catches whatever spelling the next entry arrives in.
 */
export function normaliseCategory(raw: string): string {
  const key = (raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const ALIASES: Record<string, string> = {
    // plural / phrasing variants of the same thing
    testing: 'testing-inspection',
    'testing-and-inspection': 'testing-inspection',
    'confined-spaces': 'confined-space',
    'special-installations': 'special-installation',
    'specialist-installation': 'special-installation',
    'hazardous-materials': 'hazardous-material',
    'working-at-height': 'height',
    'design-and-calculations': 'design-calculations',
    'work-environment': 'work-environment',
    'workplace-factors': 'work-environment',
  };
  return ALIASES[key] ?? key;
}

/** Readable label for a canonical id. Anything unmapped is title-cased. */
export function categoryLabel(id: string): string {
  const NAMES: Record<string, string> = {
    all: 'All',
    electrical: 'Electrical',
    height: 'Working at height',
    'hazardous-material': 'Hazardous materials',
    'confined-space': 'Confined spaces',
    'testing-inspection': 'Testing and inspection',
    'design-calculations': 'Design and calculations',
    'specialised-equipment': 'Specialised equipment',
    'project-management': 'Project management',
    'regulatory-compliance': 'Regulatory compliance',
    'special-installation': 'Special installations',
    'renewable-energy': 'Renewable energy',
    'work-environment': 'Work environment',
    'life-safety': 'Life safety',
    'security-systems': 'Security systems',
    'building-automation': 'Building automation',
    'high-voltage': 'High voltage',
    'ev-infrastructure': 'EV infrastructure',
    'heating-systems': 'Heating systems',
    'public-infrastructure': 'Public infrastructure',
    'temporary-installation': 'Temporary installations',
    'emerging-technology': 'Emerging technology',
    'hazardous-area': 'Hazardous areas',
    'backup-power': 'Backup power',
  };
  if (NAMES[id]) return NAMES[id];
  const words = id.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export const getCategoriesFromHazards = (hazards: Array<{ category: string }>): Category[] => {
  const counts: Record<string, number> = {};
  hazards.forEach((h) => {
    const id = normaliseCategory(h.category);
    counts[id] = (counts[id] || 0) + 1;
  });

  const categories: Category[] = [{ id: 'all', name: 'All', count: hazards.length }];

  /*
   * Eighteen of the thirty-six categories hold exactly one hazard — marine,
   * heritage, catering, refrigeration and so on. A chip that filters 105
   * hazards down to 1 is not a filter, and eighteen of them turn the row into
   * a long horizontal scroll on a phone where the useful groups are buried
   * past the fold. They fold into one "Other" chip; search still reaches them
   * directly, because it matches on category text as well as hazard name.
   */
  const multi = Object.entries(counts).filter(([, n]) => n > 1);
  const singles = Object.entries(counts).filter(([, n]) => n === 1);

  // Biggest groups first — sorted by weight, the categories people actually
  // browse lead instead of appearing in whatever order the data was written.
  multi
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .forEach(([id, count]) => {
      categories.push({ id, name: categoryLabel(id), count });
    });

  if (singles.length > 0) {
    categories.push({ id: OTHER_CATEGORY, name: 'Other', count: singles.length });
  }

  return categories;
};

/** The synthetic chip collecting every category with a single hazard in it. */
export const OTHER_CATEGORY = '__other';

/**
 * Whether a hazard belongs under the current chip. Lives here so the chip
 * builder and the list filter can never drift apart — they were previously
 * comparing different things, which is how a category with two spellings
 * could show a chip that matched nothing.
 */
export function hazardMatchesCategory(
  rawCategory: string,
  activeId: string,
  counts: Record<string, number>
): boolean {
  if (activeId === 'all') return true;
  const id = normaliseCategory(rawCategory);
  if (activeId === OTHER_CATEGORY) return (counts[id] ?? 0) === 1;
  return id === activeId;
}
