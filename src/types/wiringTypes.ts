// BS 7671 Reference Methods / Types of Wiring

// BS 7671 Schedule of Test Results — Type of Wiring (cable/wiring system type)
export const wiringTypeOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'T&E', label: 'T&E (Twin & Earth)' },
  { value: 'SWA', label: 'SWA (Steel Wire Armoured)' },
  { value: 'Singles', label: 'Singles in conduit' },
  { value: 'Singles-trunking', label: 'Singles in trunking' },
  { value: 'Flex', label: 'Flexible cable' },
  { value: 'FP200', label: 'FP200 (Fire Performance)' },
  { value: 'MICC', label: 'MICC (Mineral Insulated)' },
  { value: 'XLPE', label: 'XLPE' },
  { value: 'LSF', label: 'LSF / LSZH' },
  { value: 'Other', label: 'Other (see remarks)' },
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
