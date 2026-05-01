import { INSPECTOR_QUALIFICATIONS } from '@/constants/inspectorQualifications';

const DELIMITER = '\n';

export function joinQualifications(arr: readonly string[] | null | undefined): string {
  if (!arr) return '';
  return arr.filter((q) => q && q.trim().length > 0).join(DELIMITER);
}

// Parses a stored qualifications string back into an array.
// Newline-delimited (current format) splits cleanly. Legacy comma-joined
// values fall back to a greedy match against the canonical
// INSPECTOR_QUALIFICATIONS list — this heals records that got fragmented or
// duplicated by an embedded comma in a qualification name (e.g. "Level 3
// Award in Periodic Inspection, Testing & Certification (any awarding body)").
export function parseQualifications(value: string | null | undefined): string[] {
  if (!value) return [];

  if (value.includes(DELIMITER)) {
    return Array.from(new Set(
      value.split(DELIMITER).map((s) => s.trim()).filter(Boolean)
    ));
  }

  const recovered: string[] = [];
  let remaining = value.trim();
  const sorted = [...INSPECTOR_QUALIFICATIONS].sort((a, b) => b.length - a.length);

  while (remaining.length > 0) {
    let matched = false;
    for (const qual of sorted) {
      if (remaining.startsWith(qual)) {
        recovered.push(qual);
        remaining = remaining.slice(qual.length).replace(/^[,\s]+/, '');
        matched = true;
        break;
      }
    }
    if (!matched) {
      const idx = remaining.indexOf(',');
      if (idx === -1) {
        const tail = remaining.trim();
        if (tail) recovered.push(tail);
        break;
      }
      const tail = remaining.slice(0, idx).trim();
      if (tail) recovered.push(tail);
      remaining = remaining.slice(idx + 1).replace(/^\s+/, '');
    }
  }

  return Array.from(new Set(recovered));
}
