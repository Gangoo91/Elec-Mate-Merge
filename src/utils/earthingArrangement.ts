import { isFieldMarker } from '@/components/field-limitations/FieldLimitationBadge';

/**
 * Canonical earthing value for the chips (`TN-C`, `TN-S`, `TN-C-S`,
 * `TN-C-S-PNB`, `TT`, `IT`). Accepts the chip labels ("TN-C-S (PME)"), the EIC
 * form's lower-case tokens ("tncs", "tns", "tt") and loose spacing/case.
 * Limitation markers (LIM / N/A) and anything unrecognised pass through.
 */
const EARTHING_ALIASES: Record<string, string> = {
  'tn-c': 'TN-C',
  tnc: 'TN-C',
  'tn-s': 'TN-S',
  tns: 'TN-S',
  'tn-c-s': 'TN-C-S',
  tncs: 'TN-C-S',
  'tn-c-s (pme)': 'TN-C-S',
  'tn-c-s pme': 'TN-C-S',
  pme: 'TN-C-S',
  'tn-c-s-pnb': 'TN-C-S-PNB',
  'tn-c-s (pnb)': 'TN-C-S-PNB',
  'tn-c-s pnb': 'TN-C-S-PNB',
  tncspnb: 'TN-C-S-PNB',
  pnb: 'TN-C-S-PNB',
  tt: 'TT',
  it: 'IT',
};

export const normaliseEarthingArrangement = (value: string | undefined | null): string => {
  if (!value) return '';
  if (isFieldMarker(value)) return value;
  const key = value.trim().toLowerCase().replace(/\s+/g, ' ');
  return EARTHING_ALIASES[key] ?? value;
};
