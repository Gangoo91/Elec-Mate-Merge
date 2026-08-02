// BS 7671 Reference Methods / Types of Wiring

// BS 7671 Schedule of Circuit Details — Codes for Types of Wiring (Column 3)
// Letter codes match the BS 7671 model form, with common trade names
// Codes per the official IET A4:2026 model form "Codes for types of wiring"
// (Schedule of Circuit Details). ⚠️ C and D were previously swapped vs the
// model form (C said trunking, D said conduit) — the printed code letter
// misdescribed the wiring. Verified against the IET form pack, 15 Apr 2026.
export const wiringTypeOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'A', label: 'A - T&E / Thermoplastic insulated & sheathed' },
  { value: 'B', label: 'B - Thermoplastic cables in metallic conduit' },
  { value: 'C', label: 'C - Thermoplastic cables in non-metallic conduit' },
  { value: 'D', label: 'D - Thermoplastic cables in metallic trunking' },
  { value: 'E', label: 'E - Thermoplastic cables in non-metallic trunking' },
  { value: 'F', label: 'F - SWA (Thermoplastic)' },
  { value: 'G', label: 'G - SWA (Thermosetting / XLPE)' },
  { value: 'H', label: 'H - MICC (Mineral insulated)' },
  { value: 'O', label: 'O - Other (please state in remarks)' },
];

export const rcdTypeOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'AC', label: 'AC' },
  { value: 'A', label: 'A' },
  { value: 'F', label: 'F' },
  { value: 'B', label: 'B' },
  { value: 'S', label: 'S (Selective/Delayed)' },
];
