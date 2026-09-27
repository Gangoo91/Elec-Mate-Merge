/**
 * Shared bits for the Welsh Level 3 course.
 *
 * Cards come from the same components every English Level 3 landing renders,
 * so this course sits inside the existing design language rather than beside
 * it. Those cards take a free-text eyebrow, which is what lets a lesson say
 * "Unit 304E · 2.3" while the module and section cards read the same as
 * anywhere else in the Study Centre.
 */

import { Compass, HardHat, ShieldCheck, Wrench, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { WelshModule } from '@/data/study-centre/welshLevel3Tree';

/**
 * A module's icon, chosen from what it teaches. Keyed on the module number
 * rather than a stored field, because the grouping is ours and the icon is
 * part of that editorial decision.
 */
export function moduleIcon(module: WelshModule): LucideIcon {
  switch (module.number) {
    case 1:
      return Compass; // Working practice and the industry
    case 2:
      return ShieldCheck; // Health, safety and environment
    case 3:
    case 4:
      return Zap; // Electrical science
    case 5:
      return HardHat; // Planning, coordination and evaluation
    default:
      return Wrench; // Installation, inspection, fault diagnosis
  }
}

/**
 * Shown where part of a unit is signed off at work rather than by a test.
 * Says that it happens, and no more — reproducing the assessment is not what
 * a study centre is for.
 */
export const EVIDENCED_AT_WORK =
  'Part of this qualification is signed off at work through your practical project rather than by sitting a test. What you study here is the knowledge behind it.';
