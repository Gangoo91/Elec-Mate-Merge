
export interface CableSizeOption {
  value: string;
  size: string;
  currentRating: {
    pvc: number;
    xlpe: number;
  };
  voltageDropPerAmpereMeter: number;
  calculatedVoltageDrop?: number;
  meetsVoltageDrop?: boolean;
}

// Cable data - typical values for copper cables
export const cableSizes: CableSizeOption[] = [
  {
    value: "1.5",
    size: "1.5 mm²",
    currentRating: { pvc: 17, xlpe: 20 },
    voltageDropPerAmpereMeter: 0.029
  },
  {
    value: "2.5",
    size: "2.5 mm²",
    currentRating: { pvc: 23, xlpe: 28 },
    voltageDropPerAmpereMeter: 0.018
  },
  {
    value: "4",
    size: "4 mm²",
    currentRating: { pvc: 31, xlpe: 38 },
    voltageDropPerAmpereMeter: 0.011
  },
  {
    value: "6",
    size: "6 mm²",
    currentRating: { pvc: 40, xlpe: 49 },
    voltageDropPerAmpereMeter: 0.0074
  },
  {
    value: "10",
    size: "10 mm²",
    currentRating: { pvc: 54, xlpe: 67 },
    voltageDropPerAmpereMeter: 0.0044
  },
  {
    value: "16",
    size: "16 mm²",
    currentRating: { pvc: 73, xlpe: 89 },
    voltageDropPerAmpereMeter: 0.0028
  },
  {
    value: "25",
    size: "25 mm²",
    currentRating: { pvc: 95, xlpe: 118 },
    voltageDropPerAmpereMeter: 0.0018
  },
  {
    value: "35",
    size: "35 mm²",
    currentRating: { pvc: 117, xlpe: 145 },
    voltageDropPerAmpereMeter: 0.0013
  },
];
