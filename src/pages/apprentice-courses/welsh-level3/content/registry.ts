/**
 * Welsh Level 3 — the content slots.
 *
 * The course tree in `welshLevel3.ts` declares every page the qualification
 * needs; this maps the ones that have been written to their component. A
 * criterion with no entry renders the "being written" card instead, so the
 * course is navigable from the first day and fills in as we go.
 *
 * Key is `unitSlug/sectionSlug/subSlug` — the same three segments as the URL.
 * Add a line here when a criterion is written; nothing else needs touching.
 */

import { lazyWithRetry } from '@/utils/lazyWithRetry';
import type { ComponentType, LazyExoticComponent } from 'react';

type LessonComponent = LazyExoticComponent<ComponentType>;

const SLOTS: Record<string, LessonComponent> = {
  // ── Unit 304 · Planning and Evaluating Work in the BSE Sector in Wales ──
  '304/lo1/1-1': lazyWithRetry(() => import('./304/lo1/Criterion1_1')),
};

export function lessonContent(
  unitSlug: string | undefined,
  sectionSlug: string | undefined,
  subSlug: string | undefined
): LessonComponent | undefined {
  if (!unitSlug || !sectionSlug || !subSlug) return undefined;
  return SLOTS[`${unitSlug}/${sectionSlug}/${subSlug}`];
}

/** How many criteria have their teaching written. Drives the course counters. */
export const WELSH_L3_WRITTEN = Object.keys(SLOTS).length;
