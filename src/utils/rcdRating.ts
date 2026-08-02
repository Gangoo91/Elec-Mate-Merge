// RCD IΔn (mA) values are stored canonically WITH the unit suffix ('10mA',
// '30mA', … or 'N/A') — matching the desktop cell Select vocabulary.
// Historic mobile-filled certs stored bare numbers ('10', '30', …), which made
// the desktop Radix Select render blank. Normalise on READ so legacy values
// display correctly; every WRITE path now stores the canonical form.
export const normaliseRcdRating = (value?: string): string => {
  if (!value) return '';
  const trimmed = value.trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}mA`;
  return trimmed;
};
