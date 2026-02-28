// BS 7671:2018+A2:2022 Appendix 4, Table 4D5 - Reference Method C (clipped direct)
// Current carrying capacities for single-phase 70°C thermoplastic insulated (PVC) cables
// Note: Large sizes (150mm²+) typically use XLPE - capacities shown are indicative
export const cableSizeOptions = [
  { value: 'N/A', label: 'N/A', currentCarryingCapacity: 0 },
  { value: '0.5mm', label: '0.5mm²', currentCarryingCapacity: 3 },
  { value: '0.75mm', label: '0.75mm²', currentCarryingCapacity: 6 },
  { value: '1.0mm', label: '1.0mm²', currentCarryingCapacity: 13.5 },
  { value: '1.5mm', label: '1.5mm²', currentCarryingCapacity: 17.5 },
  { value: '2.5mm', label: '2.5mm²', currentCarryingCapacity: 24 },
  { value: '4.0mm', label: '4.0mm²', currentCarryingCapacity: 32 },
  { value: '6.0mm', label: '6.0mm²', currentCarryingCapacity: 41 },
  { value: '10mm', label: '10mm²', currentCarryingCapacity: 57 },
  { value: '16mm', label: '16mm²', currentCarryingCapacity: 76 },
  { value: '25mm', label: '25mm²', currentCarryingCapacity: 101 },
  { value: '35mm', label: '35mm²', currentCarryingCapacity: 125 },
  { value: '50mm', label: '50mm²', currentCarryingCapacity: 144 },
  { value: '70mm', label: '70mm²', currentCarryingCapacity: 184 },
  { value: '95mm', label: '95mm²', currentCarryingCapacity: 224 },
  { value: '120mm', label: '120mm²', currentCarryingCapacity: 260 },
  { value: '150mm', label: '150mm²', currentCarryingCapacity: 299 },
  { value: '185mm', label: '185mm²', currentCarryingCapacity: 341 },
  { value: '240mm', label: '240mm²', currentCarryingCapacity: 400 },
  { value: '300mm', label: '300mm²', currentCarryingCapacity: 458 },
  { value: '400mm', label: '400mm²', currentCarryingCapacity: 546 },
];

// BS 7671 Reference Methods — matches IET model form / industry cert software
export const referenceMethodOptions = [
  { value: 'A', label: 'A - Cables enclosed in conduit or trunking in a thermally insulated wall' },
  { value: 'B', label: 'B - Cables enclosed in conduit or trunking in/on a wall/floor' },
  { value: 'C', label: 'C - Clipped direct [includes cables direct in masonry]' },
  { value: 'D', label: 'D - Cables laid in conduit or in cable duct under ground' },
  { value: 'E', label: 'E - Free air on perforated cable tray [multi-core cables]' },
  { value: 'F', label: 'F - Free air on perforated cable tray [single-core cables]' },
  { value: 'G', label: 'G - Free air, flat [spaced by 1 cable diameter]' },
  {
    value: '100',
    label: '100 - T&E on wooden joist or above ceiling with up to 100mm thermal insulation',
  },
  {
    value: '101',
    label: '101 - T&E on wooden joist or above ceiling with more than 100mm thermal insulation',
  },
  {
    value: '102',
    label: '102 - T&E in stud wall with more than 100mm thermal insulation, touching inner wall',
  },
  {
    value: '103',
    label:
      '103 - T&E in stud wall with more than 100mm thermal insulation, not touching inner wall',
  },
  { value: 'M', label: 'M - Mixed - multiple cables' },
  { value: 'N/A', label: 'N/A' },
  { value: 'LIM', label: 'LIM' },
];

export const bondingConductorSizes = [
  { value: '2.5mm', label: '2.5mm²' },
  { value: '4mm', label: '4mm²' },
  { value: '6mm', label: '6mm²' },
  { value: '10mm', label: '10mm²' },
  { value: '16mm', label: '16mm²' },
  { value: '25mm', label: '25mm²' },
  { value: '35mm', label: '35mm²' },
  { value: '50mm', label: '50mm²' },
  { value: '70mm', label: '70mm²' },
  { value: '95mm', label: '95mm²' },
  { value: '120mm', label: '120mm²' },
];

export const meterTailsSizes = [
  { value: '16mm', label: '16mm²' },
  { value: '25mm', label: '25mm²' },
  { value: '35mm', label: '35mm²' },
  { value: '50mm', label: '50mm²' },
  { value: '70mm', label: '70mm²' },
  { value: '95mm', label: '95mm²' },
  { value: '120mm', label: '120mm²' },
  { value: '150mm', label: '150mm²' },
  { value: '185mm', label: '185mm²' },
  { value: '240mm', label: '240mm²' },
  { value: '300mm', label: '300mm²' },
];
