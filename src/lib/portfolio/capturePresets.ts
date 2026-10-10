/**
 * capturePresets — the one capture flow's entry presets (ELE-1916).
 *
 * Every way of adding evidence opens UnifiedCaptureSheet with a preset. The
 * preset decides how the sheet opens (camera, file picker, test results, the
 * details step), the default evidence type and category, and the `source`
 * written to portfolio_items.source. Nothing else creates portfolio evidence.
 *
 * The source list is mirrored by the portfolio_items_source_check constraint
 * (migration 20261010160000_portfolio_items_capture_source_ele1916.sql).
 */
import type { EvidenceType } from '@/types/portfolio';

export type CapturePreset =
  'photo' | 'reflection' | 'diary_entry' | 'worksheet' | 'test_sheet' | 'from_job';

/** Where a row was captured from: a preset, or work made in Elec-Mate, or a notebook suggestion. */
export type CaptureSource = CapturePreset | 'work' | 'notebook';

export const CAPTURE_SOURCES: readonly CaptureSource[] = [
  'photo',
  'reflection',
  'diary_entry',
  'worksheet',
  'test_sheet',
  'from_job',
  'work',
  'notebook',
] as const;

/** Status on create is only ever draft or ready ('ready' is stored as 'completed'). */
export type CreateStatus = 'draft' | 'ready';

export interface PresetConfig {
  label: string;
  /** Sheet title on the capture step. */
  title: string;
  description: string;
  /** What the sheet does as it opens. */
  opens: 'camera' | 'upload' | 'test_results' | 'details' | 'capture';
  evidenceType?: EvidenceType;
  /** portfolio_items.category for rows from this preset. */
  category: { id: string; name: string };
}

const PRACTICAL = { id: 'practical-skills', name: 'Practical Skills' };

export const PRESETS: Record<CapturePreset, PresetConfig> = {
  photo: {
    label: 'Photo',
    title: 'Capture on site',
    description: 'Take a photo of the work. We suggest the criteria it could show.',
    opens: 'capture',
    evidenceType: 'photo',
    category: PRACTICAL,
  },
  reflection: {
    label: 'Reflection',
    title: 'Write a reflection',
    description: 'What you did, what you learned. In your own words.',
    opens: 'details',
    evidenceType: 'reflective-account',
    // MyReflectionCard reads reflections by this category name.
    category: { id: 'Reflection & Learning', name: 'Reflection & Learning' },
  },
  diary_entry: {
    label: 'Diary entry',
    title: 'Add a diary entry',
    description: 'A day on site or a block of logged hours, written up as evidence.',
    opens: 'details',
    evidenceType: 'reflective-account',
    category: { id: 'site-diary-evidence', name: 'Site Diary Evidence' },
  },
  worksheet: {
    label: 'Worksheet',
    title: 'Add a worksheet',
    description: 'A worksheet, handout or document you completed.',
    opens: 'upload',
    evidenceType: 'work-product',
    category: PRACTICAL,
  },
  test_sheet: {
    label: 'Test sheet',
    title: 'Add a test sheet',
    description: 'Your schedule of test results, from Elec-Mate or a photo of the paper copy.',
    opens: 'test_results',
    evidenceType: 'work-product',
    category: { id: 'testing-inspection', name: 'Testing & Inspection' },
  },
  from_job: {
    label: 'From a job',
    title: 'Capture this job',
    description: 'The criteria this job covers are ticked. Add what you did.',
    opens: 'details',
    category: PRACTICAL,
  },
};

/** The preset a capture defaults to when nothing more specific is known. */
export const DEFAULT_PRESET: CapturePreset = 'photo';
