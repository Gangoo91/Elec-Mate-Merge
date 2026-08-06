// BS 7671:2018+A4:2026 Section 702 — Swimming pools and other basins.
//
// Rating factors are imported from src/lib/calculators/bs7671-data rather than
// re-typed here. Every previous inline copy in this file drifted away from the
// printed tables (see the Ca note below); the shared module is the one that
// gets corrected against the standard.
import {
  getTemperatureFactor,
  getSoilTemperatureFactor,
} from '@/lib/calculators/bs7671-data/temperatureFactors';

export interface PoolCalculationInputs {
  poolType: 'private' | 'public' | 'commercial' | 'therapy';
  poolVolume: number;
  poolLength: number;
  poolWidth: number;
  poolDepth: number;
  heaterPower: number;
  pumpPower: number;
  lighting: number;
  filtrationSystem: 'sand' | 'cartridge' | 'de';
  heatingType: 'electric' | 'gas' | 'heat-pump' | 'solar';
  supplyVoltage: 230 | 400;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
  zone: 'zone0' | 'zone1' | 'zone2';
  cableRunLength: number;
  installationMethod: 'underground' | 'overhead' | 'indoor';
  ambientTemperature: number;
  soilResistivity: number;
  hasUnderwaterLighting: boolean;
  hasPoolCover: boolean;
  hasEmergencyStop: boolean;
  hasAccessibility: boolean;
}

export interface CircuitAnalysis {
  name: string;
  load: number;
  voltage: number;
  current: number;
  cableSize: string;
  protectionRating: number;
  rcdRequired: boolean;
  ipRating: string;
  specialRequirements: string[];
  complianceStatus: 'compliant' | 'warning' | 'non-compliant';
  reasonsForCompliance: string[];
}

export interface PoolCalculationResult {
  totalLoad: number;
  totalCurrent: number;
  supplyRequirements: string;
  mainProtection: string;
  earthingArrangements: string;
  bondingRequirements: string[];
  circuits: CircuitAnalysis[];
  zonalCompliance: {
    zone0: { permitted: string[]; prohibited: string[]; ipRating: string };
    zone1: { permitted: string[]; prohibited: string[]; ipRating: string };
    zone2: { permitted: string[]; prohibited: string[]; ipRating: string };
  };
  regulatoryCompliance: {
    bs7671Section702: boolean;
    /**
     * Product standards Section 702 actually invokes. Replaces the former
     * `ietCodeOfPractice` boolean, which was set from `poolType === 'private'`
     * — a value with no meaning and no basis in the standard.
     */
    productStandards: string[];
    buildingRegs: boolean;
    issues: string[];
    recommendations: string[];
  };
  /**
   * Rating factors actually applied to the cable sizing, so the figures on
   * screen can be traced back to Appendix 4. Replaces the former
   * `safetyFactors` block, whose `simultaneityFactor: 0.85` and
   * `safetyMargin: 1.25` have no counterpart anywhere in BS 7671 (and which
   * was computed, returned and then never read by any consumer).
   */
  deratingFactors: {
    /** Ca — Table 4B1 (in air) or Table 4B2 (buried) */
    ambient: number;
    /** Cc — Appendix 4 §5.1.1(c)(ii): 0.9 in a duct in the ground or buried direct, otherwise 1 */
    buriedCircuit: number;
    /** Ca x Cc, the divisor applied to In */
    combined: number;
  };
  practicalGuidance: {
    installationSteps: string[];
    testingRequirements: string[];
    maintenancePoints: string[];
    commonPitfalls: string[];
  };
}

export function calculatePoolInstallation(inputs: PoolCalculationInputs): PoolCalculationResult {
  const {
    poolType,
    heaterPower,
    pumpPower,
    lighting,
    filtrationSystem,
    heatingType,
    supplyVoltage,
    earthingSystem,
    zone,
    cableRunLength,
    installationMethod,
    ambientTemperature,
    hasUnderwaterLighting,
    hasEmergencyStop,
  } = inputs;

  // Calculate diversity factors
  const heaterDiversity = poolType === 'private' ? 0.75 : 1.0;
  const pumpDiversity = 1.0; // Pumps typically run continuously
  const lightingDiversity = poolType === 'private' ? 0.8 : 1.0;

  // Apply diversity to loads
  const diversifiedHeaterLoad = heaterPower * heaterDiversity;
  const diversifiedPumpLoad = pumpPower * pumpDiversity;
  const diversifiedLightingLoad = lighting * lightingDiversity;

  const totalLoad = diversifiedHeaterLoad + diversifiedPumpLoad + diversifiedLightingLoad;
  const totalCurrent =
    supplyVoltage === 400 ? totalLoad / (supplyVoltage * Math.sqrt(3)) : totalLoad / supplyVoltage;

  // ── Rating factors, Appendix 4 §5.1.1 ──────────────────────────────────────
  // ⚠️ This was `ambientTemperature > 30 ? 0.87 : 1.0` — a single bucket that
  // treated 31 °C and 60 °C identically. 0.87 is the 40 °C cell of Table 4B1;
  // at 55 °C the real factor is 0.61 and at 60 °C it is 0.50, so the old code
  // over-stated cable capacity by up to 74% in a hot plant room. Table 4B1
  // prints a dash above 60 °C for 70 °C thermoplastic — the shared module
  // returns 0 there, which is treated as "no tabulated factor" below.
  //
  // Appendix 4 also notes that tabulated capacities for cables direct in the
  // ground or in ducts in the ground are based on 20 °C, not 30 °C, so a buried
  // run takes the Table 4B2 soil column rather than the Table 4B1 air column.
  const isBuried = installationMethod === 'underground';
  const ambientFactor = isBuried
    ? getSoilTemperatureFactor(ambientTemperature, '70C')
    : getTemperatureFactor(ambientTemperature, '70C');
  // Cc — App 4 §5.1.1(c)(ii): "Where the cable installation method is 'in a duct
  // in the ground' or 'buried direct', Cc = 0.9. For cables installed above
  // ground Cc = 1." This was not applied at all before, so every buried pool
  // circuit was sized 11% light.
  const buriedCircuitFactor = isBuried ? 0.9 : 1.0;
  const hasTabulatedAmbient = ambientFactor > 0;
  const combinedDerating = hasTabulatedAmbient ? ambientFactor * buriedCircuitFactor : 0;

  // Circuit analysis
  const circuits: CircuitAnalysis[] = [];

  // Pool heater circuit
  if (heaterPower > 0) {
    const heaterCurrent = heaterPower / supplyVoltage;
    const heater = sizeCircuit(heaterCurrent, combinedDerating);
    circuits.push({
      name: 'Pool Heater',
      load: heaterPower,
      voltage: supplyVoltage,
      current: heaterCurrent,
      cableSize: heater.cableSize,
      protectionRating: heater.protectionRating,
      rcdRequired: true,
      ipRating: 'IPX4',
      specialRequirements: [
        'Dedicated circuit required',
        'Emergency isolation required',
        heatingType === 'electric'
          ? 'High temperature cable required'
          : 'Gas safety interlock required',
      ],
      complianceStatus: 'compliant',
      reasonsForCompliance: [
        '30mA RCD protection (Reg 415.1.1)',
        'Dedicated circuit',
        'Ib ≤ In ≤ Iz (Reg 433.1.1)',
      ],
    });
  }

  // Pool pump circuit
  if (pumpPower > 0) {
    const pumpCurrent = pumpPower / supplyVoltage;
    const pump = sizeCircuit(pumpCurrent, combinedDerating);
    circuits.push({
      name: 'Pool Pump/Filtration',
      load: pumpPower,
      voltage: supplyVoltage,
      current: pumpCurrent,
      cableSize: pump.cableSize,
      protectionRating: pump.protectionRating,
      rcdRequired: true,
      ipRating: 'IPX4',
      specialRequirements: [
        // Ib here is P/U. BS 7671 publishes no power factor or efficiency data,
        // so the figure is only right if the pump rating entered is electrical
        // INPUT power. For a motor rated by shaft output, take the full-load
        // current from the motor nameplate instead (Reg 433.1.1 design current).
        'Enter pump rating as electrical input power — for a nameplate shaft rating use the stated full-load current',
        'Motor starting current consideration',
        'Pump isolation switch required',
        filtrationSystem === 'de'
          ? 'Additional earth fault protection'
          : 'Standard motor protection',
      ],
      complianceStatus: 'compliant',
      reasonsForCompliance: ['Motor protection', '30mA RCD', 'Appropriate starting arrangements'],
    });
  }

  // Pool lighting circuit
  // `lightingVoltage` is declared before the guard so the zone check below can
  // read it — it was previously block-scoped inside `if (lighting > 0)` and
  // referenced outside, which does not compile.
  const lightingVoltage = hasUnderwaterLighting ? 12 : supplyVoltage;
  if (lighting > 0) {
    const lightingCurrent = lighting / lightingVoltage;
    // ⚠️ SELV lighting previously hardcoded '1.5mm²' and a 6 A device whatever
    // the current came out at. 300 W at 12 V is 25 A — a 6 A device and 1.5 mm²
    // on a 25 A load. Reg 433.1.1 (Ib ≤ In ≤ Iz) has no SELV exemption, so the
    // SELV circuit is now sized from its own design current like any other.
    const lightingCircuit = sizeCircuit(lightingCurrent, combinedDerating);
    circuits.push({
      name: hasUnderwaterLighting ? 'Pool Lighting (SELV)' : 'Pool Area Lighting',
      load: lighting,
      voltage: lightingVoltage,
      current: lightingCurrent,
      cableSize: lightingCircuit.cableSize,
      protectionRating: lightingCircuit.protectionRating,
      rcdRequired: !hasUnderwaterLighting,
      ipRating: hasUnderwaterLighting ? 'IPX8' : 'IPX4',
      specialRequirements: hasUnderwaterLighting
        ? [
            'SELV source installed outside zones 0, 1 and 2 (Reg 702.410.3.4.1)',
            'Safety isolating transformer',
            'Maximum 12V AC RMS / 30V ripple-free DC in zone 0',
            'Underwater luminaires to BS EN 60598-2-18 (Reg 702.55.2)',
          ]
        : ['Minimum 2m from pool edge', 'RCD protection mandatory', 'Appropriate IP rating'],
      complianceStatus: hasUnderwaterLighting && lightingVoltage <= 12 ? 'compliant' : 'warning',
      reasonsForCompliance: hasUnderwaterLighting
        ? ['SELV supply', 'IPX8 rating', 'Zone 0 compliance']
        : ['Adequate distance from pool', 'RCD protection'],
    });
  }

  // ── Supply requirements ────────────────────────────────────────────────────
  // ⚠️ These were watt buckets (≤3000 → 16 A single phase, ≤15000 → 25 A three
  // phase) that ignored the user's own supply voltage selection entirely: a
  // 10 kW load on a 230 V supply was told "25 A three phase". Reg 433.1.1
  // requires In to be selected from the actual design current, which is already
  // computed above as P/U (single phase) or P/(√3·UL) (three phase).
  const mainDeviceRating = getProtectionRating(totalCurrent);
  const supplyRequirements =
    supplyVoltage === 400
      ? `${mainDeviceRating}A three phase supply (Type B MCB) — Ib ${totalCurrent.toFixed(1)}A at 400V`
      : `${mainDeviceRating}A single phase supply (Type B MCB) — Ib ${totalCurrent.toFixed(1)}A at 230V`;

  // ── Main protection ────────────────────────────────────────────────────────
  // ⚠️ Non-private pools previously got "30mA RCD + additional 10mA RCD for
  // underwater equipment". Section 702 refers to Regulation 415.1.1 at every
  // point it calls for an RCD (702.410.3.4.1, .2, .3, 702.53, 702.55.1,
  // 702.55.4) and 415.1.1 specifies "a rated residual operating current not
  // exceeding 30 mA". No 10 mA device appears anywhere in Section 702.
  const mainProtection =
    '30mA RCD protection to Reg 415.1.1 for all circuits serving the pool and its zones';

  // ── Earthing arrangements ──────────────────────────────────────────────────
  // The NOTE to Reg 702.410.3.4 gives PME its own recommendation, which was
  // missing: an earth mat or electrode of 20 ohms or less connected to the
  // supplementary bonding, plus the wet-barefoot PEN caution.
  const earthingArrangements =
    earthingSystem === 'TT'
      ? 'TT: earth electrode required. RA × IΔn ≤ 50 V (Reg 411.5.3(b)); a value exceeding 200 Ω may not be stable (Table 41.5 Note 2). Supplementary bonding to Reg 702.415.2 throughout zones 0, 1 and 2.'
      : earthingSystem === 'TN-C-S'
        ? 'TN-C-S (PME): NOTE to Reg 702.410.3.4 recommends an earth mat or earth electrode of suitably low resistance — for example 20 Ω or less — installed and connected to the supplementary protective equipotential bonding. Wet barefoot persons may perceive a shock from voltages imported via the PEN conductor.'
        : 'TN-S: main earthing terminal connection. Supplementary bonding to Reg 702.415.2 throughout zones 0, 1 and 2.';

  // ── Bonding requirements ───────────────────────────────────────────────────
  // ⚠️ Every bonding string said "within 2m of pool". Reg 702.415.2 scopes
  // supplementary bonding to zones 0, 1 AND 2. Zone 1 reaches 2 m from the rim
  // (Reg 702.32(b)); zone 2 is a further 1.50 m beyond it (Reg 702.32(c)) — so
  // 3.5 m horizontally, and 2.50 m above the surface occupied by persons in
  // both. Bonding stopped at 2 m leaves the whole of zone 2 unbonded.
  const bondingRequirements = [
    'Bond all extraneous-conductive-parts in zones 0, 1 and 2 (Reg 702.415.2) — 3.5 m horizontally from the pool rim and 2.50 m above the occupied surface',
    'Connect them to the protective conductors of exposed-conductive-parts of equipment in those zones',
    'Bond pool structure (if conductive)',
    'Bond water circulation pipes',
    'Bond pool heating pipes',
    'Bond access ladders and handrails',
    'Bond reinforcing steel in concrete',
    'Bond any metallic sheath or metallic covering of a wiring system in zones 0, 1 and 2 (Reg 702.522.21)',
    poolType !== 'private' ? 'Bond ventilation ducting' : '',
    'Use 4mm² minimum bonding conductor',
  ].filter(Boolean);

  // Zonal compliance
  const zonalCompliance = {
    // Reg 702.410.3.4.1 — in zone 0, ONLY protection by SELV at not exceeding
    // 12 V AC RMS or 30 V ripple-free DC, the source installed outside
    // zones 0, 1 and 2.
    zone0: {
      permitted: [
        'SELV not exceeding 12V AC RMS or 30V ripple-free DC',
        'SELV source installed outside zones 0, 1 and 2',
        'IPX8 rated luminaires to BS EN 60598-2-18',
      ],
      prohibited: [
        'Socket outlets',
        'Switchgear and controlgear',
        '230V equipment',
        'Junction boxes',
      ],
      ipRating: 'IPX8 minimum',
    },
    // Reg 702.410.3.4.1 — in zone 1, ONLY protection by SELV at not exceeding 25 V AC
    // RMS or 60 V ripple-free DC, the SELV source being installed OUTSIDE zones
    // 0, 1 and 2. (Zone 0's limit is 12 V AC — a different figure.)
    // ⚠️ This previously read "12V SELV preferred" and "Limited 230V with
    // additional protection". 230 V is not a general permission in zone 1, and
    // the 12 V figure is zone 0's limit, not zone 1's.
    zone1: {
      permitted: [
        'SELV not exceeding 25V AC RMS or 60V ripple-free DC',
        'SELV source installed outside zones 0, 1 and 2',
        // Reg 702.55.4 — the narrow exceptions that do exist in zone 1.
        'Fixed LV pool equipment (filtration, jet stream pumps) only under all of Reg 702.55.4(a)-(c): Class II insulating enclosure to AG2, hatch/door needing a key or tool that isolates all live conductors, and SELV / 30mA RCD / electrical separation',
        'Where the pool has no zone 2: luminaires supplied other than by a 12V AC / 30V ripple-free DC SELV source, on a wall or ceiling at least 2 m above the lower limit of zone 1, with ADS plus a 30mA RCD and a Class II luminaire enclosure (Reg 702.55.4(d)(e))',
        'SELV-circuit junction boxes (Reg 702.522.24)',
      ],
      prohibited: [
        'Socket outlets (Reg 702.53)',
        'Switchgear and controlgear (Reg 702.53)',
        'Junction boxes other than for SELV circuits (Reg 702.522.24)',
        'Standard luminaires',
      ],
      ipRating: 'IPX4 minimum, IPX5 where water jets are likely to occur for cleaning purposes',
    },
    zone2: {
      permitted: [
        'Socket-outlet or switch only where the supply circuit is protected by SELV, a 30mA RCD, or electrical separation (Reg 702.53)',
        'Equipment protected by SELV, ADS with a 30mA RCD, or electrical separation (Reg 702.410.3.4.3)',
        'Standard wiring methods',
      ],
      prohibited: ['Equipment without one of the Reg 702.410.3.4.3 protective measures'],
      // ⚠️ Was 'IPX2 minimum (IPX4 recommended)'. Reg 702.512.2(c) makes IPX4
      // mandatory outdoors, not a recommendation — IPX2 is the indoor figure.
      ipRating:
        'IPX2 indoors, IPX4 outdoors (mandatory), IPX5 where water jets are likely to occur for cleaning purposes',
    },
  };

  // Regulatory compliance
  const complianceIssues: string[] = [];
  const recommendations: string[] = [];

  // 🔴 ZONE-DRIVEN CHECK — Reg 702.410.3.4.1 ("Zones 0 and 1").
  // The `zone` input was destructured and then never read: the tool collected the
  // single most important Section 702 parameter and produced the same verdict
  // whichever zone you chose. A pool light in zone 0 and one in zone 2 are not
  // the same installation, and the tool said they were.
  //
  // Zone 0: SELV not exceeding 12 V AC RMS or 30 V ripple-free DC.
  // Zone 1: SELV not exceeding 25 V AC RMS or 60 V ripple-free DC.
  // In both, the SELV source must be outside zones 0, 1 and 2.
  //
  // 🔴 DO NOT "CORRECT" THIS TO 702.410.3.4.2 — verified against the PRINTED
  // A4:2026 text, which reads:
  //   "702.410.3.4.1  Zones 0 and 1
  //    Except for fountains as stated in Regulation 702.410.3.4.2, in zone 0 only
  //    protection by SELV at a nominal voltage not exceeding 12 V AC RMS or 30 V
  //    ripple-free DC is permitted..."
  // .2 is headed "Zones 0 and 1 of FOUNTAINS" and lists SELV / ADS+RCD /
  // electrical separation instead.
  // ⚠️ `bs7671_facets` attributes the zone 0/1 SELV limits to .2 — that is the
  // known breadcrumb mis-attribution, and it fooled me twice in one session.
  // The printed standard is the tiebreaker.
  const ZONE_SELV_LIMIT_AC: Record<string, number | null> = {
    zone0: 12,
    zone1: 25,
    zone2: null, // LV permitted, subject to RCD, bonding and IP requirements
  };
  const selvLimit = ZONE_SELV_LIMIT_AC[zone] ?? null;

  if (selvLimit !== null) {
    const zoneLabel = zone === 'zone0' ? 'Zone 0' : 'Zone 1';
    if (hasUnderwaterLighting && lighting > 0 && lightingVoltage > selvLimit) {
      complianceIssues.push(
        `${zoneLabel}: lighting at ${lightingVoltage}V exceeds the SELV limit of ${selvLimit}V AC RMS (Reg 702.410.3.4.1)`
      );
    }
    if (supplyVoltage > selvLimit) {
      complianceIssues.push(
        `${zoneLabel}: equipment at ${supplyVoltage}V is not permitted under Reg 702.410.3.4.1 — only SELV up to ${selvLimit}V AC RMS is. Locate this equipment outside zones 0 and 1, or meet the narrow Reg 702.55.4 exception for fixed pool equipment in zone 1.`
      );
    }
    recommendations.push(
      `${zoneLabel}: the SELV safety source must be installed OUTSIDE zones 0, 1 and 2 (Reg 702.410.3.4.1).`
    );
  } else {
    recommendations.push(
      'Zone 2: low voltage equipment is permitted, subject to one of the Reg 702.410.3.4.3 protective measures, supplementary bonding (Reg 702.415.2) and the required IP rating.'
    );
  }

  if (hasUnderwaterLighting && lighting > 300) {
    complianceIssues.push('Underwater lighting exceeds recommended power for SELV systems');
  }

  if (poolType === 'public' && !hasEmergencyStop) {
    complianceIssues.push('Emergency stop system required for public pools');
  }

  if (!hasTabulatedAmbient) {
    complianceIssues.push(
      `${isBuried ? 'Table 4B2' : 'Table 4B1'} tabulates no rating factor for 70 °C thermoplastic at ${ambientTemperature} °C — select a higher temperature cable and size it by hand`
    );
  }

  // ⚠️ The cable run length was collected and then discarded: `getCableSize`
  // took a `length` argument it never referenced, and no voltage drop check
  // existed anywhere. This tool sizes for current-carrying capacity only —
  // saying so is more honest than silently omitting it. A full voltage drop
  // calculation needs the tabulated mV/A/m for the chosen cable and reference
  // method, which this calculator does not select.
  recommendations.push(
    `Voltage drop is NOT assessed here. Verify separately over the ${cableRunLength || 0} m run against Reg 525.1 and Appendix 4 §6 (3% lighting, 5% other uses of the 230 V nominal).`
  );

  // Rating factors that this tool does not collect the inputs for. Naming them
  // is the point: It ≥ In / (Ca·Cg·Ci·Cc·Cs·Cd·Cf) per Appendix 4 §5.1.1, and
  // only Ca and Cc are applied above.
  recommendations.push(
    'Grouping (Cg, Table 4C1), thermal insulation (Ci, App 4 §2.6), soil resistivity (Cs, Table 4B3) and depth of laying (Cd, Table 4B4) are not applied here — apply them by hand where the installation calls for them.'
  );

  recommendations.push('Annual PAT testing recommended for portable pool equipment');
  recommendations.push('Regular earth loop impedance testing required');
  recommendations.push('RCD testing every 6 months recommended');

  const deratingFactors = {
    ambient: Math.round(ambientFactor * 1000) / 1000,
    buriedCircuit: buriedCircuitFactor,
    combined: Math.round(combinedDerating * 1000) / 1000,
  };

  // Practical guidance
  const practicalGuidance = {
    installationSteps: [
      'Install earth electrode (if TT system)',
      'Install main distribution board with RCD protection',
      'Install supplementary bonding throughout zones 0, 1 and 2',
      'Install cable routes (underground preferred)',
      'Install equipment with appropriate IP ratings',
      'Connect and test all circuits',
      'Perform initial verification',
      'Complete electrical installation certificate',
    ],
    testingRequirements: [
      // ⚠️ Was "Continuity of bonding conductors (< 0.05Ω)" presented as a
      // pass/fail limit. GN3 2.16 says readings across joints made by earth
      // clamps and similar should APPROACH 0.05 Ω, allowing for instrument
      // resolution, low-value accuracy and contact resistance; GN3 Ch.6 applies
      // a guideline acceptance of "not exceeding 0.1 Ω" where the expected
      // resistance is below the instrument's resolution. The BS 7671 criterion
      // for supplementary bonding is Reg 415.2.2, R ≤ 50 V / Ia.
      'Continuity of bonding conductors — readings should approach 0.05Ω across clamp joints (GN3 2.16), with 0.1Ω the guideline acceptance where instrument resolution limits the reading (GN3 Ch.6). The requirement itself is R ≤ 50V / Ia (Reg 415.2.2)',
      'Polarity verification (correct L, N, E connections)',
      'Earth electrode resistance — RA × IΔn ≤ 50V (Reg 411.5.3(b)); above 200Ω the value may not be stable',
      'Insulation resistance (≥ 1MΩ between conductors)',
      // ⚠️ Was "Zs ≤ 1.44Ω for 30mA RCD". 1.44 Ω is not an RCD figure at all.
      // Table 41.5 gives the maximum earth fault loop impedance for a 30 mA
      // non-delayed RCD at U0 = 230 V as 1667 Ω. Quoting 1.44 Ω would fail
      // compliant installations.
      'Earth fault loop impedance — Zs ≤ 1667Ω for a 30mA RCD at U0 = 230V (Table 41.5); the overcurrent device Zs limit applies separately',
      'RCD operating time at IΔn (Reg 643.8)',
      'Functional testing of emergency stops',
      'PAT testing of portable equipment',
    ],
    maintenancePoints: [
      'Monthly RCD testing',
      'Annual earth loop impedance testing',
      'Annual PAT testing of portable equipment',
      'Visual inspection of bonding connections',
      'Check IP rating integrity',
      'Inspect cable routes for damage',
      'Test emergency stop functions',
      'Review and update risk assessments',
    ],
    commonPitfalls: [
      'Insufficient IP rating for zone requirements',
      'Supplementary bonding stopped at 2 m instead of covering the whole of zones 0, 1 and 2',
      'Inadequate earth electrode resistance',
      'Socket outlets in zone 0 or zone 1',
      'Using standard cables in wet areas',
      'Forgetting diversity factors in calculations',
      'Not considering motor starting currents',
      'Inadequate emergency isolation arrangements',
    ],
  };

  return {
    totalLoad: Math.round(totalLoad),
    totalCurrent: Math.round(totalCurrent * 10) / 10,
    supplyRequirements,
    mainProtection,
    earthingArrangements,
    bondingRequirements,
    circuits,
    zonalCompliance,
    regulatoryCompliance: {
      bs7671Section702: complianceIssues.length === 0,
      productStandards: [
        'BS EN 60529 — IP code (Reg 702.512.2)',
        'BS EN 60598-2-18 — underwater luminaires (Regs 702.55.2, 702.55.3)',
        'BS EN 60335-2-41 — electric pumps (Reg 702.55.3)',
        'BS EN 60335-2-60 — hot tubs (Reg 702.55.5)',
      ],
      buildingRegs: true,
      issues: complianceIssues,
      recommendations,
    },
    deratingFactors,
    practicalGuidance,
  };
}

/**
 * Reg 433.1.1 — Ib ≤ In ≤ Iz, applied in that order.
 *
 * ⚠️ The device and the cable used to be chosen independently: the MCB from the
 * raw design current and the cable from the derated current, so at every band
 * boundary the device could exceed the tool's own cable rating. Appendix 4
 * §5.1.1 is explicit that it is the RATED CURRENT OF THE PROTECTIVE DEVICE (In)
 * that is divided by the rating factors — "the size of cable to be used is to be
 * such that its tabulated current-carrying capacity is not less than the value
 * of rated current of the protective device adjusted as above".
 */
function sizeCircuit(
  designCurrent: number,
  derating: number
): { protectionRating: number; cableSize: string } {
  const protectionRating = getProtectionRating(designCurrent);
  return { protectionRating, cableSize: getCableSize(protectionRating, derating) };
}

/**
 * Smallest conductor whose capacity covers In after derating.
 *
 * NOTE: the thresholds below are this calculator's own long-standing figures.
 * They are NOT re-derived from Appendix 4 here — the Appendix 4 capacity tables
 * are per reference method, and this tool does not collect a reference method.
 * They are left untouched deliberately; only the current they are compared
 * against has been corrected (In after derating, rather than the raw Ib).
 */
function getCableSize(nominalDeviceCurrent: number, derating: number): string {
  if (derating <= 0) return 'Not tabulated — size by hand';
  const requiredCapacity = nominalDeviceCurrent / derating;

  if (requiredCapacity <= 13) return '1.5mm²';
  if (requiredCapacity <= 17) return '2.5mm²';
  if (requiredCapacity <= 23) return '4.0mm²';
  if (requiredCapacity <= 30) return '6.0mm²';
  if (requiredCapacity <= 40) return '10mm²';
  if (requiredCapacity <= 54) return '16mm²';
  return '25mm²';
}

function getProtectionRating(current: number): number {
  if (current <= 6) return 6;
  if (current <= 10) return 10;
  if (current <= 16) return 16;
  if (current <= 20) return 20;
  if (current <= 25) return 25;
  if (current <= 32) return 32;
  if (current <= 40) return 40;
  return 50;
}
