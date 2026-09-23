/**
 * Shared bits for the Welsh Level 3 course.
 *
 * Cards come from `@/components/apprentice-courses/ModuleCard` — the same
 * component every Level 3 section landing renders — so this course sits in the
 * existing design language rather than beside it. That card takes a free-text
 * eyebrow, which is what lets this course say "Unit 304E" where the rest say
 * "Module 3" without touching a shared component.
 */

import { Compass, HardHat, ShieldCheck, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { UnitKind, WelshUnit } from '@/data/study-centre/welshLevel3';

export function unitKindLabel(kind: UnitKind): string {
  if (kind === 'wales') return 'Wales core';
  if (kind === 'safety') return 'Health and safety';
  return 'Electrical';
}

export function unitIcon(unit: WelshUnit): LucideIcon {
  if (unit.status === 'practical') return HardHat;
  if (unit.kind === 'wales') return Compass;
  if (unit.kind === 'safety') return ShieldCheck;
  return Zap;
}

/** The line under a unit's title on its card. Facts, not build status. */
export function unitSummary(unit: WelshUnit): string {
  if (unit.status === 'practical') {
    return 'Signed off at work through your practical project — there is no written test for this unit.';
  }
  const outcomes = unit.sections.length;
  const pages = unit.sections.reduce((n, s) => n + s.subsections.length, 0);
  return `${unit.glh} GLH · ${outcomes} ${outcomes === 1 ? 'outcome' : 'outcomes'} · ${pages} ${pages === 1 ? 'page' : 'pages'}`;
}

/** Shown on a unit that is part-evidenced at work. Says that it happens, no more. */
export const EVIDENCED_AT_WORK =
  'Part of this unit is signed off at work through your practical project rather than by sitting a test. What you study here is the knowledge behind it.';
