// BS 7671 Reference Methods / Types of Wiring

// BS 7671 Schedule of Circuit Details — Codes for Types of Wiring (Column 3)
// Letter codes match the BS 7671 model form, with common trade names
export const wiringTypeOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'A', label: 'A - T&E / Thermoplastic insulated & sheathed' },
  { value: 'B', label: 'B - Singles in metallic conduit' },
  { value: 'C', label: 'C - Singles in metallic trunking' },
  { value: 'D', label: 'D - Singles in non-metallic conduit' },
  { value: 'E', label: 'E - Singles in non-metallic trunking' },
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
  { value: 'S', label: 'S (Selective)' },
  { value: 'G', label: 'G (General use)' },
];
