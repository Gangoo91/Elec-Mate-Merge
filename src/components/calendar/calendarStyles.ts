/**
 * The calendar's design language.
 *
 * Everything here now comes from the two shared modules rather than a private
 * copy: `@/components/shared/surfaceStyles` owns cards, chips, stat cells, rows
 * and motion; `@/components/forms/fieldStyles` owns inputs and labels. This
 * file exists only so calendar components have one import to reach for, and so
 * that a genuinely calendar-specific token would have somewhere obvious to go.
 *
 * De-emphasis on a calendar is the one thing worth restating: an out-of-month
 * day or a non-working hour dims via `opacity` on the whole cell, never via a
 * `text-white/45`-style class. The type stays pure white and the cell recedes
 * as a unit, which is how a native calendar reads.
 */
export {
  cardCn,
  cardInteractiveCn,
  chipBase,
  chipOn,
  chipOff,
  eyebrowCn,
  statValueCn,
  rowCn,
  ghostButtonCn,
  primaryButtonCn,
  containerVariants,
  itemVariants,
} from '@/components/shared/surfaceStyles';

export { inputCn as fieldCn, labelCn } from '@/components/forms/fieldStyles';
