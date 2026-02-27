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

// BS 7671 Table 4A2 — Reference Methods for current-carrying capacity
export const referenceMethodOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'A1', label: 'A1 - Enclosed in conduit in a thermally insulated wall' },
  { value: 'A2', label: 'A2 - Enclosed in conduit in masonry' },
  { value: 'B1', label: 'B1 - Enclosed in conduit on a wall or ceiling' },
  { value: 'B2', label: 'B2 - Enclosed in trunking on a wall or ceiling' },
  { value: 'C', label: 'C - Clipped direct to a non-thermally insulating surface' },
  { value: 'D1', label: 'D1 - In conduit or duct buried in the ground' },
  { value: 'D2', label: 'D2 - Direct in the ground (without conduit)' },
  { value: 'E', label: 'E - Free air on a perforated cable tray' },
  { value: 'F', label: 'F - Free air, touching (cable ladder / cleats)' },
  { value: 'G', label: 'G - Free air, spaced (from surface)' },
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
