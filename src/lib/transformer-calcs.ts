// Transformer calculations.
//
// BS 7671:2018+A4:2026 governs the INSTALLATION side of this calculator only:
//   - Reg 434.1   determination of prospective fault current at every relevant point
//   - Reg 434.5.1 device breaking capacity >= maximum prospective fault current
//   - Reg 433.1.1 Ib <= In <= Iz (device selection)
//   - Reg 411.4.2 earthing of the neutral/mid point of the supply system
//   - Reg 421.15  retention of flammable liquid in significant quantity
// Transformer performance itself (efficiency, losses, inrush, thermal/altitude derating)
// is NOT in BS 7671 — it is BS EN 60076 / BS EN 50588 territory. Figures below that are
// not tied to a regulation are labelled as indicative and must not be presented as
// BS 7671 values.

export interface TransformerInputs {
  primaryVoltage: number;
  secondaryVoltage: number;
  kvaRating: number;
  powerFactor: number;
  phase: 'single' | 'three';
  frequency: number;
  percentImpedance: number;
  rPercent?: number;
  xPercent?: number;
  sourceFaultLevel?: number;
  ambientTemp?: number;
  altitude?: number;
  harmonics?: boolean;
  tapPosition?: number;
  connectionType?: string;
}

export interface TransformerResults {
  // Basic ratios
  voltageRatio: number;
  currentRatio: number;
  transformerType: 'step-up' | 'step-down' | 'isolation';

  // Currents
  primaryRatedCurrent: number;
  secondaryRatedCurrent: number;
  primaryFullLoadCurrent: number;
  secondaryFullLoadCurrent: number;

  // Power calculations
  kw: number;
  kva: number;
  kvar: number;

  // Fault calculations
  transformerFaultCurrent: number;
  combinedFaultCurrent?: number;

  // Performance
  voltageRegulation: number;
  efficiency: number;
  copperLoss: number;
  ironLoss: number;
  totalLoss: number;

  // Inrush
  inrushCurrent: number;
  inrushDuration: number;

  // Derating
  temperatureDerating?: number;
  altitudeDerating?: number;
  // NOTE: a numeric "harmonic derating" was removed. The 0.86 previously used here is the
  // BS 7671 Appendix 4 §5.5 rating factor for CABLES carrying third-harmonic current
  // (banded on THD: >15-33 %, 33-45 %, >45 %), applied to conductor current-carrying
  // capacity via Regs 523.6.1/523.6.3. It is not a transformer kVA derating and there is
  // no BS 7671 figure for one. Harmonics are now handled as guidance only.

  // Recommendations
  recommendations: string[];
  warnings: string[];
}

export function calculateTransformer(inputs: TransformerInputs): TransformerResults {
  const {
    primaryVoltage,
    secondaryVoltage,
    kvaRating,
    powerFactor,
    phase,
    frequency,
    percentImpedance,
    rPercent = percentImpedance * 0.3, // Typical R/X ratio
    xPercent = percentImpedance * 0.95,
    sourceFaultLevel,
    ambientTemp = 40,
    altitude = 0,
    harmonics = false,
    tapPosition = 0,
    connectionType = 'Dyn11',
  } = inputs;

  // Basic ratios
  const voltageRatio = primaryVoltage / secondaryVoltage;
  const currentRatio = 1 / voltageRatio;
  const transformerType: 'step-up' | 'step-down' | 'isolation' =
    voltageRatio > 1.1 ? 'step-down' : voltageRatio < 0.9 ? 'step-up' : 'isolation';

  // Current calculations
  const phaseMultiplier = phase === 'three' ? Math.sqrt(3) : 1;
  const primaryRatedCurrent = (kvaRating * 1000) / (primaryVoltage * phaseMultiplier);
  const secondaryRatedCurrent = (kvaRating * 1000) / (secondaryVoltage * phaseMultiplier);

  // Power calculations
  const kw = kvaRating * powerFactor;
  const kvar = kvaRating * Math.sin(Math.acos(powerFactor));

  // FIX: full-load current is fixed by the kVA rating and the voltage — it IS the rated
  // current. It was previously multiplied by the power factor, which returns only the
  // in-phase component and under-states the conductor/device duty by 15 % at pf 0.85.
  // Ib for Reg 433.1.1(a) is the full rated current, not its real component.
  const primaryFullLoadCurrent = primaryRatedCurrent;
  const secondaryFullLoadCurrent = secondaryRatedCurrent;

  // Prospective fault current at the secondary terminals (Reg 434.1 — the PFC shall be
  // determined at every relevant point, by calculation, measurement or enquiry).
  // FIX: √3 was hard-coded here regardless of the phase selection. For a single-phase
  // transformer Isc = Vs ÷ Zt with NO √3, so the old code returned 0.577× the true value
  // (100 kVA / 230 V / Z=4 % returned 6,276 A instead of 10,870 A) — a 42 % under-statement
  // of the fault duty feeding the Reg 434.5.1 breaking-capacity check.
  const impedanceBase = (secondaryVoltage * secondaryVoltage) / (kvaRating * 1000);
  const transformerImpedance = (percentImpedance / 100) * impedanceBase;
  const transformerFaultCurrent = secondaryVoltage / (phaseMultiplier * transformerImpedance);

  let combinedFaultCurrent: number | undefined;
  if (sourceFaultLevel) {
    const sourceImpedance = (secondaryVoltage * secondaryVoltage) / (sourceFaultLevel * 1000000);
    const totalImpedance = sourceImpedance + transformerImpedance;
    combinedFaultCurrent = secondaryVoltage / (phaseMultiplier * totalImpedance);
  }

  // Losses — INDICATIVE full-load figures only. BS 7671 sets no transformer loss or
  // efficiency requirement (that is BS EN 50588 / Ecodesign). Always take the actual
  // no-load and load losses from the manufacturer's test certificate for real design work.
  let copperLoss: number;
  let ironLoss: number;

  if (kvaRating <= 25) {
    copperLoss = kvaRating * 0.035;
    ironLoss = kvaRating * 0.015;
  } else if (kvaRating <= 500) {
    copperLoss = kvaRating * 0.025;
    ironLoss = kvaRating * 0.01;
  } else {
    copperLoss = kvaRating * 0.015;
    ironLoss = kvaRating * 0.008;
  }

  const totalLoss = copperLoss + ironLoss;

  // FIX: efficiency was a second, independent invented expression that contradicted the
  // loss model above (100 kVA printed 97.5 % while the losses gave 96.0 %) and saturated,
  // so every rating from ~69 kVA to 500 kVA returned an identical 97.5 % and efficiency
  // fell as the rating crossed 25 -> 26 kVA. It is now derived from the losses, so the two
  // figures agree by construction: η = Pout ÷ (Pout + Ploss).
  const efficiency = kw > 0 ? kw / (kw + totalLoss) : 0;

  // Voltage regulation
  const voltageRegulation =
    (rPercent * powerFactor + xPercent * Math.sin(Math.acos(powerFactor))) / 100;

  // Inrush current — INDICATIVE manufacturer/BS EN 60076 territory, NOT BS 7671.
  // BS 7671 mentions inrush only qualitatively (e.g. Reg 557.3.5.1 auxiliary-circuit
  // voltage drop, and the Appendix 722 note that isolating transformers may have high
  // inrush so primary devices should be selected to avoid unwanted tripping). It
  // publishes no multiplier and no duration, so this comment no longer claims one.
  const inrushMultiple = kvaRating < 100 ? 12 : kvaRating < 500 ? 10 : 8;
  const inrushCurrent = primaryRatedCurrent * inrushMultiple;
  const inrushDuration = 0.1; // seconds

  // Derating factors
  let temperatureDerating: number | undefined;
  let altitudeDerating: number | undefined;

  // Indicative 1 %/K above the 40 °C reference ambient (BS EN 60076-2/-11 territory; BS 7671
  // Table 4B1 Ca is a 30 °C-base CABLE factor and does not apply to a transformer).
  // FIX: the previous Math.max(0.8, …) floor stopped the model at 60 °C ambient, so 70 °C
  // still reported 80 % usable capacity where the model itself gives 70 % — a 14 %
  // over-statement, and the "< 0.9 warns" branch then displayed the rosier floored figure.
  if (ambientTemp > 40) {
    temperatureDerating = Math.max(0, 1 - (ambientTemp - 40) * 0.01);
  }

  if (altitude > 1000) {
    altitudeDerating = Math.max(0, 1 - (altitude - 1000) / 10000);
  }

  // Recommendations and warnings
  const recommendations: string[] = [];
  const warnings: string[] = [];

  // Protection recommendations
  if (kvaRating >= 500) {
    recommendations.push('Consider differential protection for transformers ≥500kVA');
  }

  if (transformerFaultCurrent > 25000) {
    recommendations.push(
      'High fault current — confirm the rated short-circuit breaking capacity of every device is not less than the prospective fault current at its point of installation (Reg 434.5.1)'
    );
  }

  if (voltageRegulation > 0.05) {
    warnings.push('High voltage regulation - consider tap changer');
  }

  // FIX: the guard was `> 15 ×` but the largest multiple the model produces is 12 ×, so this
  // advice could never render for any input. Now keyed off the multiple actually used.
  if (inrushMultiple >= 10) {
    recommendations.push(
      'High inrush current — select the primary protective device to avoid unwanted tripping; consider soft-start or pre-insertion resistors'
    );
  }

  // Temperature warnings
  if (temperatureDerating && temperatureDerating < 0.9) {
    warnings.push('High ambient temperature requires derating');
  }

  if (altitudeDerating && altitudeDerating < 0.95) {
    warnings.push('High altitude installation requires derating');
  }

  if (harmonics) {
    recommendations.push('K-factor rated transformer recommended for harmonic loads');
    // The BS 7671 duty that harmonics actually trigger is on the CABLES and the neutral,
    // not on the transformer kVA — see Regs 523.6.1/523.6.3 and Appendix 4 §5.5.
    recommendations.push(
      'Third-harmonic content above 15 % of the fundamental line current: the neutral counts as a loaded conductor and shall not be smaller than the line conductors (Reg 523.6.3); apply the Appendix 4 §5.5 rating factor to the cable current-carrying capacity'
    );
    recommendations.push(
      'Above 33 % third-harmonic content the cable is sized on the neutral current, and the neutral CSA may need increasing (Reg 524.2.2)'
    );
    if (phase === 'three') {
      recommendations.push(
        'Provide overcurrent detection for the neutral conductor where the harmonic content requires it (Reg 431.2.3)'
      );
    }
  }

  // BS 7671 specific recommendations
  // FIX: the guard was `connectionType.includes('N')`, but every vector-group preset spells
  // the neutral lowercase per IEC convention (Dyn11, Yyn0), so it never fired and the
  // earthing advice never rendered. Also re-cited: the operative regulation is 411.4.2
  // ("the neutral point or the midpoint of the power supply system shall be earthed"),
  // not the section heading 411.3.
  if (phase === 'three' && /n/i.test(connectionType)) {
    recommendations.push(
      'Neutral point of the secondary winding shall be earthed for a TN system (Reg 411.4.2)'
    );
  }

  // FIX: previously "Oil containment required for oil-filled transformers >1MVA (BS 7671)".
  // BS 7671 has no 1 MVA threshold and no kVA-based containment rule. The real requirement
  // is Reg 421.15: where equipment in a single location contains flammable liquid in
  // significant quantity, precautions (e.g. a retention pit, or a fire-resisting chamber
  // with sills) shall prevent the spread of liquid, flame and products of combustion.
  // NOTE 2 to 421.15 gives 25 litres as the generally accepted lower limit for "significant
  // quantity" — the trigger is litres of oil, not the kVA rating.
  if (kvaRating >= 1000) {
    recommendations.push(
      'If oil-filled and holding 25 litres or more of flammable liquid, precautions to prevent the spread of liquid, flame and products of combustion are required — e.g. a retention pit (Reg 421.15)'
    );
  }

  return {
    voltageRatio,
    currentRatio,
    transformerType,
    primaryRatedCurrent,
    secondaryRatedCurrent,
    primaryFullLoadCurrent,
    secondaryFullLoadCurrent,
    kw,
    kva: kvaRating,
    kvar,
    transformerFaultCurrent,
    combinedFaultCurrent,
    voltageRegulation,
    efficiency,
    copperLoss,
    ironLoss,
    totalLoss,
    inrushCurrent,
    inrushDuration,
    temperatureDerating,
    altitudeDerating,
    recommendations,
    warnings,
  };
}

// Common transformer presets
export const transformerPresets = {
  // FIX: 400 V was missing from both lists while 415 V was offered as the default LV figure.
  // The UK LV nominal in BS 7671 is 230/400 V throughout (e.g. Table 41.1, Regs 534/551/715).
  // 415 V is the pre-harmonisation legacy value and survives in the standard only inside a
  // product-standard title (240/415 V industrial plugs). 400 V now leads; 415 V is retained
  // for legacy plant but labelled as such.
  voltages: {
    primary: [
      { value: '11000', label: '11kV' },
      { value: '6600', label: '6.6kV' },
      { value: '3300', label: '3.3kV' },
      { value: '1000', label: '1kV' },
      { value: '400', label: '400V (BS 7671 nominal)' },
      { value: '415', label: '415V (legacy)' },
      { value: '230', label: '230V' },
    ],
    secondary: [
      { value: '400', label: '400V (BS 7671 nominal)' },
      { value: '415', label: '415V (legacy)' },
      { value: '230', label: '230V' },
      { value: '110', label: '110V' },
      { value: '24', label: '24V' },
      { value: '12', label: '12V' },
    ],
  },
  kvaRatings: [
    { value: '5', label: '5 kVA' },
    { value: '10', label: '10 kVA' },
    { value: '25', label: '25 kVA' },
    { value: '50', label: '50 kVA' },
    { value: '100', label: '100 kVA' },
    { value: '200', label: '200 kVA' },
    { value: '315', label: '315 kVA' },
    { value: '500', label: '500 kVA' },
    { value: '800', label: '800 kVA' },
    { value: '1000', label: '1 MVA' },
    { value: '1600', label: '1.6 MVA' },
    { value: '2500', label: '2.5 MVA' },
  ],
  connections: [
    // Dyn11 = Delta HV winding, star LV winding with the neutral brought out.
    // (The label previously read "Star-Delta", which is the wrong way round.)
    { value: 'Dyn11', label: 'Dyn11 (Delta–Star)' },
    { value: 'Dd0', label: 'Dd0 (Delta-Delta)' },
    { value: 'Yyn0', label: 'Yyn0 (Star-Star)' },
    { value: 'Yz11', label: 'Yz11 (Star-Zigzag)' },
  ],
  impedances: [
    { value: '4', label: '4% (Small)' },
    { value: '6', label: '6% (Medium)' },
    { value: '8', label: '8% (Large)' },
    { value: '10', label: '10% (Very Large)' },
  ],
};
