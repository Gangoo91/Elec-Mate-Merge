// BS 7671 Reference Methods / Types of Wiring

export const wiringTypeOptions = [
  { value: 'A', label: 'A - Enclosed in conduit in thermally insulated wall' },
  { value: 'B', label: 'B - Enclosed in conduit on a wall or in trunking' },
  { value: 'C', label: 'C - Clipped direct' },
  { value: 'D', label: 'D - In conduit in masonry' },
  { value: 'E', label: 'E - In free air or on a perforated cable tray' },
  { value: 'F', label: 'F - Embedded direct in masonry' },
  { value: 'G', label: 'G - Enclosed in conduit in a timber-framed wall' },
  { value: 'H', label: 'H - Suspended from or incorporating a support wire' },
  { value: 'O', label: 'O - Other (specify in remarks)' }
];

export const rcdTypeOptions = [
  { value: 'AC', label: 'AC' },
  { value: 'A', label: 'A' },
  { value: 'F', label: 'F' },
  { value: 'B', label: 'B' },
  { value: 'S', label: 'S (Selective)' },
  { value: 'G', label: 'G (General use)' },
];
