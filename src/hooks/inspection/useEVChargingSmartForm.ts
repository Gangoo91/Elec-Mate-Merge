/**
 * useEVChargingSmartForm Hook
 *
 * Provides smart auto-fill, calculations, and validations for EV charging certificates.
 * Integrates with company profiles, Zs lookup tables, and charger database.
 */

import { useCallback, useMemo } from 'react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import {
  getMcbZsLimit,
  MCBCurve,
  DisconnectionTime,
  ZsLookupResult,
  checkZsCompliance,
} from '@/data/zsLimits';
import {
  EVCharger,
  findCharger,
  searchChargers,
  calculateCurrentFromPower,
  calculatePowerFromCurrent,
} from '@/data/evChargerDatabase';

// ============================================================================
// Types
// ============================================================================

export interface InstallerDetails {
  installerName: string;
  installerCompany: string;
  installerQualifications: string;
  installerScheme: string;
  installerSchemeNumber: string;
  installerSignature: string;
  installerDate: string;
}

export interface CompanyBranding {
  companyLogo: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  companyTagline: string;
  companyAccentColor: string;
  registrationSchemeLogo: string;
  registrationScheme: string;
  registrationNumber: string;
}

export interface TestResultValidation {
  field: string;
  value: number | string;
  isValid: boolean;
  status: 'pass' | 'fail' | 'warning' | 'unknown';
  message: string;
  limit?: number;
}

export interface ZsCalculation {
  calculatedZs: number;
  ze: number;
  r1r2: number;
  temperatureCorrectionFactor: number;
  isManual: boolean;
}

export interface DNORequirement {
  /** Every EV charge point is notifiable. This is always true; it stays on the
   *  interface because callers branch on it. */
  required: boolean;
  /** 'apply-to-connect' needs DNO approval BEFORE energising. */
  type: 'apply-to-connect' | 'connect-and-notify';
  message: string;
  details: string;
  /** Set when the verdict rests on a figure the form does not yet hold. */
  caveat?: string;
}

export interface ChargerDefaults {
  chargerMake: string;
  chargerModel: string;
  powerRating: number;
  phases: number;
  ratedCurrent: number;
  socketType: string;
  chargerConnection: string;
  rcdType: string;
  rcdIntegral: boolean;
  chargerType: string;
  smartChargingEnabled: boolean;
  cableSize: number;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useEVChargingSmartForm() {
  const { companyProfile, loading: companyLoading } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();

  // ---------------------------------------------------------------------------
  // Load Installer Details from Business Settings / Inspector Profile
  // ---------------------------------------------------------------------------
  const loadInstallerDetails = useCallback((): InstallerDetails | null => {
    const inspectorProfile = getDefaultProfile();
    const today = new Date().toISOString().split('T')[0];

    // Priority: Company Profile > Inspector Profile
    const name = companyProfile?.inspector_name || inspectorProfile?.name;
    if (!name) return null;

    const qualifications = companyProfile?.inspector_qualifications?.length
      ? companyProfile.inspector_qualifications.join(', ')
      : inspectorProfile?.qualifications?.join(', ') || '';

    const scheme =
      companyProfile?.registration_scheme || inspectorProfile?.registrationScheme || '';
    const schemeNumber =
      companyProfile?.registration_number || inspectorProfile?.registrationNumber || '';
    const signature = companyProfile?.signature_data || inspectorProfile?.signatureData || '';
    const company = companyProfile?.company_name || inspectorProfile?.companyName || '';

    return {
      installerName: name,
      installerCompany: company,
      installerQualifications: qualifications,
      installerScheme: scheme,
      installerSchemeNumber: schemeNumber,
      installerSignature: signature,
      installerDate: today,
    };
  }, [companyProfile, getDefaultProfile]);

  // ---------------------------------------------------------------------------
  // Load Company Branding
  // ---------------------------------------------------------------------------
  const loadCompanyBranding = useCallback((): CompanyBranding | null => {
    if (!companyProfile) return null;

    const fullAddress = companyProfile.company_postcode
      ? `${companyProfile.company_address || ''}, ${companyProfile.company_postcode}`
      : companyProfile.company_address || '';

    return {
      companyLogo: companyProfile.logo_data_url || companyProfile.logo_url || '',
      companyName: companyProfile.company_name || '',
      companyAddress: fullAddress,
      companyPhone: companyProfile.company_phone || '',
      companyEmail: companyProfile.company_email || '',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      companyWebsite: (companyProfile as any).company_website || '',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      companyTagline: (companyProfile as any).company_tagline || '',
      companyAccentColor: companyProfile.primary_color || '#f59e0b',
      registrationSchemeLogo:
        companyProfile.scheme_logo_data_url || companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || '',
      registrationNumber: companyProfile.registration_number || '',
    };
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Check if Saved Details Available
  // ---------------------------------------------------------------------------
  const hasSavedInstallerDetails = useMemo(() => {
    const profile = getDefaultProfile();
    return !!(companyProfile?.inspector_name || profile?.name);
  }, [companyProfile, getDefaultProfile]);

  const hasSavedCompanyBranding = useMemo(() => {
    return !!(
      companyProfile?.company_name ||
      companyProfile?.logo_url ||
      companyProfile?.logo_data_url
    );
  }, [companyProfile]);

  // ---------------------------------------------------------------------------
  // Apply Charger Defaults
  // ---------------------------------------------------------------------------
  const applyChargerDefaults = useCallback((charger: EVCharger): ChargerDefaults => {
    const defaultPower = charger.powerOptions[0];
    const defaultPhases = charger.phases[0];

    return {
      chargerMake: charger.make,
      chargerModel: charger.model,
      powerRating: defaultPower,
      phases: defaultPhases,
      ratedCurrent: charger.current,
      socketType: charger.socketType,
      chargerConnection: charger.connection === 'both' ? 'tethered' : charger.connection,
      rcdType: charger.rcdType,
      rcdIntegral: charger.rcdIntegral,
      chargerType: 'Mode3', // Most chargers are Mode 3
      smartChargingEnabled: charger.smartEnabled,
      cableSize: charger.recommendedCable,
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Calculate Zs from Ze + R1+R2 with Temperature Correction
  // ---------------------------------------------------------------------------
  const calculateZs = useCallback(
    (ze: number, r1r2: number, applyTempCorrection: boolean = true): ZsCalculation => {
      // Temperature correction factor: 1.2 for 70°C operating temperature.
      // ELE-1422 — previously cited "BS 7671 Appendix 14", stale by two
      // amendments: A3 moved the earth-fault-loop content to Appendix 3, and in
      // A4:2026 Appendix 14 is "Determination of prospective fault current".
      // The basis is NOTE 2 to Tables 41.2-41.4 — the tabulated Zs applies with
      // conductors at the operating temperature of Table 52.2.
      const tempFactor = applyTempCorrection ? 1.2 : 1.0;
      const calculatedZs = ze + r1r2 * tempFactor;

      return {
        calculatedZs: Math.round(calculatedZs * 100) / 100, // 2 decimal places
        ze,
        r1r2,
        temperatureCorrectionFactor: tempFactor,
        isManual: false,
      };
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Lookup Max Zs from BS 7671 Tables
  // ---------------------------------------------------------------------------
  const lookupMaxZs = useCallback(
    (
      deviceType: 'MCB' | 'RCBO' | 'MCCB',
      rating: number,
      curve: string,
      disconnectionTime: DisconnectionTime = '0.4s'
    ): ZsLookupResult | null => {
      // Convert curve to MCBCurve type
      let mcbCurve: MCBCurve;
      switch (curve.toUpperCase()) {
        case 'B':
        case 'TYPE B':
          mcbCurve = 'typeB';
          break;
        case 'C':
        case 'TYPE C':
          mcbCurve = 'typeC';
          break;
        case 'D':
        case 'TYPE D':
          mcbCurve = 'typeD';
          break;
        default:
          mcbCurve = 'typeB'; // Default to Type B
      }

      return getMcbZsLimit(mcbCurve, rating, disconnectionTime);
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Validate Test Results
  // ---------------------------------------------------------------------------
  const validateTestResults = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (testResults: any, maxZs?: number): TestResultValidation[] => {
      const validations: TestResultValidation[] = [];

      // Zs Validation
      if (testResults.zs !== undefined && testResults.zs !== '') {
        const zs = parseFloat(testResults.zs);
        if (!isNaN(zs) && maxZs) {
          const compliance = checkZsCompliance(zs, maxZs);
          validations.push({
            field: 'zs',
            value: zs,
            isValid: compliance.compliant,
            status: compliance.compliant ? 'pass' : 'fail',
            message: compliance.compliant
              ? `PASS: ${zs}Ω ≤ ${maxZs}Ω (${compliance.marginPercent.toFixed(0)}% margin)`
              : `FAIL: ${zs}Ω > max ${maxZs}Ω`,
            limit: maxZs,
          });
        }
      }

      // Insulation Resistance Validation (≥ 1MΩ)
      if (
        testResults.insulationResistance !== undefined &&
        testResults.insulationResistance !== ''
      ) {
        const ir = testResults.insulationResistance.toString().replace('>', '').trim();
        const irValue = parseFloat(ir);
        if (!isNaN(irValue)) {
          const isPass = irValue >= 1;
          validations.push({
            field: 'insulationResistance',
            value: irValue,
            isValid: isPass,
            status: isPass ? 'pass' : 'fail',
            message: isPass ? `PASS: ${irValue}MΩ ≥ 1MΩ` : `FAIL: ${irValue}MΩ < 1MΩ minimum`,
            limit: 1,
          });
        }
      }

      // RCD Trip Time @ IΔn (≤ 300ms) — Reg 643.8.
      //
      // This is THE verification test in A4:2026. Table 3A of Appendix 3 (the
      // time/current performance criteria) was deleted; effectiveness is now
      // deemed verified by a single alternating current test at IΔn, whatever
      // the RCD type (AC, A, F or B).
      //
      // 300 ms is the general non-delay figure. Type S sits at 130–500 ms, but
      // that band comes from BS EN 61008/61009 and is not a BS 7671 number, so
      // it is not asserted here.
      if (testResults.rcdTripTime !== undefined && testResults.rcdTripTime !== '') {
        const tripTime = parseFloat(testResults.rcdTripTime);
        if (!isNaN(tripTime)) {
          const isPass = tripTime <= 300;
          validations.push({
            field: 'rcdTripTime',
            value: tripTime,
            isValid: isPass,
            status: isPass ? 'pass' : 'fail',
            message: isPass
            ? `PASS: ${tripTime}ms ≤ 300ms (Reg 643.8)`
            : `FAIL: ${tripTime}ms > 300ms max (Reg 643.8)`,
            limit: 300,
          });
        }
      }

      // RCD Trip Time @ 5×IΔn (≤ 40ms) — BS EN 61008/61009, NOT BS 7671.
      //
      // A4:2026 no longer asks for a 5×IΔn test (nor the ½×IΔn must-not-trip
      // test). The 40 ms figure is still true as a device characteristic under
      // the product standard, and testers still report it, so the field stays
      // and the number stays — but it is reported as a product-standard figure
      // rather than a BS 7671 pass/fail, because failing a certificate on a
      // test the standard no longer requires is its own kind of wrong.
      if (testResults.rcdTripTimeX5 !== undefined && testResults.rcdTripTimeX5 !== '') {
        const tripTimeX5 = parseFloat(testResults.rcdTripTimeX5);
        if (!isNaN(tripTimeX5)) {
          const withinDeviceSpec = tripTimeX5 <= 40;
          validations.push({
            field: 'rcdTripTimeX5',
            value: tripTimeX5,
            // Not a compliance failure: A4:2026 does not require this test.
            isValid: true,
            status: withinDeviceSpec ? 'pass' : 'warning',
            message: withinDeviceSpec
              ? `${tripTimeX5}ms ≤ 40ms (BS EN 61008/61009 device figure)`
              : `${tripTimeX5}ms exceeds the 40ms BS EN 61008/61009 device figure — not a BS 7671 failure, but check the device`,
            limit: 40,
          });
        }
      }

      // Polarity Validation
      if (testResults.polarity !== undefined && testResults.polarity !== '') {
        const isPass = testResults.polarity === 'correct';
        validations.push({
          field: 'polarity',
          value: testResults.polarity,
          isValid: isPass,
          status: isPass ? 'pass' : 'fail',
          message: isPass ? 'PASS: Polarity correct' : 'FAIL: Polarity incorrect',
        });
      }

      return validations;
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Check DNO Requirements
  // ---------------------------------------------------------------------------
  const checkDNORequirements = useCallback(
    (
      powerKW: number,
      phases: number = 1,
      opts: {
        /** Total assessed demand for the property, in amps per phase. */
        totalDemandA?: number;
        /** Mode 4 is DC. */
        isDcOutput?: boolean;
        loadManagement?: boolean;
      } = {}
    ): DNORequirement => {
      /*
       * An EV charge point is a DEMAND connection, and this used to test it
       * against G98/G99.
       *
       * G98 and G99 are the ENA recommendations for connecting GENERATION and
       * storage. They only bite on a charge point that can export — V2G or
       * otherwise bidirectional — because only then is the unit a generator.
       * A plain 7.4 kW home charger imports and nothing else, so its
       * 3.68 kW / 11 kW thresholds were the wrong numbers off the wrong
       * document.
       *
       * The published DNO process for charge points turns on the TOTAL load of
       * the property including the charge point, against 13.8 kW / 60 A per
       * phase, plus three straight disqualifiers. Under that limit and clear of
       * all three, it is connect-and-notify; over it, the DNO has to approve
       * before the thing is energised.
       *
       * The old branch worth naming: at 3.68 kW or below it returned "No DNO
       * notification required". A 3.6 kW charger going into a house already
       * close to its 60 A main fuse needs an apply-to-connect, and we were
       * telling the electrician there was nothing to do. There is no
       * not-notifiable case here, which is why `required` is now always true.
       */
      const { totalDemandA, isDcOutput = false, loadManagement = false } = opts;

      // 13.8 kW / 60 A per phase, on the property total — not on the charger.
      const LIMIT_A = 60;
      const chargerA = calculateCurrentFromPower(powerKW, phases);

      const reasons: string[] = [];
      if (isDcOutput) reasons.push('the charge point has a DC output (Mode 4)');
      if (loadManagement) reasons.push('a load management scheme is being used');
      if (totalDemandA !== undefined && !isNaN(totalDemandA) && totalDemandA > LIMIT_A)
        reasons.push(
          `total assessed demand is ${totalDemandA}A per phase, above the ${LIMIT_A}A / 13.8kW limit`
        );

      if (reasons.length) {
        return {
          required: true,
          type: 'apply-to-connect',
          message: 'DNO Approval Required Before Energising',
          details: `This installation must be applied for and approved by the DNO before it is energised, because ${reasons.join(', and ')}. Allow several weeks.`,
        };
      }

      // No total recorded — we cannot see the property's existing load, so the
      // 60 A test has not actually been applied. Say so rather than implying it
      // passed.
      const caveat =
        totalDemandA === undefined || isNaN(totalDemandA)
          ? `Based on the charge point alone (${chargerA}A). Enter the total assessed demand under Max Demand to test it against the ${LIMIT_A}A / 13.8kW limit — that limit is on the WHOLE property, not the charge point.`
          : undefined;

      return {
        required: true,
        type: 'connect-and-notify',
        message: 'Connect & Notify',
        details: `At ${powerKW}kW (${chargerA}A${phases === 3 ? ' per phase' : ''}) this may be installed and commissioned, then notified to the DNO within 28 days. No prior approval is needed.`,
        caveat,
      };
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Voltage Drop Calculator (BS 7671 Table 4D1B/4D2B)
  // ---------------------------------------------------------------------------
  const calculateVoltageDrop = useCallback(
    (
      cableSizeMm2: number,
      cableLengthM: number,
      currentA: number,
      cableType: string = '6242Y',
      /** 'single' | 'three' — from formData.supplyPhases. */
      supplyPhases: string = 'single'
    ): {
      voltageDropV: number;
      percentOf230V: number;
      percentOfNominal: number;
      nominalV: number;
      satisfactory: boolean;
    } | null => {
      if (!cableSizeMm2 || !cableLengthM || !currentA) return null;

      const threePhase = supplyPhases === 'three';

      // mV/A/m values from BS 7671 Table 4D1B (twin & earth, clipped direct, single phase)
      // and Table 4D2B (SWA)
      const mvAmLookup: Record<string, Record<number, number>> = {
        '6242Y': { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
        '6243Y': { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
        /*
         * SWA is Table 4E4B, not 4D.
         *
         * These were the 70 °C thermoplastic figures. Modern armoured cable is
         * BS 5467 — XLPE insulated, 90 °C thermosetting — and it runs hotter, so
         * its conductors are more resistive and the drop is higher. Using the
         * thermoplastic column UNDER-stated the drop by roughly 7%, which is the
         * dangerous direction: it can pass a long run that should have failed.
         *
         * Table 4E4B (multicore armoured 90 °C thermosetting, copper), two-core
         * single-phase AC column. PVC-insulated SWA to BS 6346 would be 4D4B,
         * but it is now rare and the conservative figure is the right default.
         */
        SWA: { 1.5: 31, 2.5: 19, 4: 12, 6: 7.9, 10: 4.7, 16: 2.9, 25: 1.9 },
        // BS 6724 differs from BS 5467 only in the bedding and sheath compound
        // (LSZH rather than PVC). Same XLPE insulation, same 90 °C conductor,
        // so the same table — recorded separately because the product differs,
        // not because the electrical answer does.
        'SWA-LSZH': { 1.5: 31, 2.5: 19, 4: 12, 6: 7.9, 10: 4.7, 16: 2.9, 25: 1.9 },
        /*
         * ConnectEV (Cleveland Cable) — the other combined power + Cat5e
         * charge-point cable. XLPE insulated, steel wire armoured, Class 5
         * flexible stranded copper, sold in 4 mm² and 6 mm² only. Table 4E4B
         * as with EV Ultra; sizes it is not made in are absent.
         */
        'connect-ev': { 4: 12, 6: 7.9 },
        /*
         * H07RN-F is Table 4F1B, not 4D.
         *
         * It is a 60 °C thermosetting rubber flexible (EPR/PCP to BS EN
         * 50525-2-21) — a different family from the thermoplastic entries
         * above, and every value here was taken from those. Correct figures,
         * two-core single-phase AC column:
         *   4 → 12, 6 → 7.8, 10 → 4.6, 16 → 2.9, 25 → 1.85
         * against the 11 / 7.3 / 4.4 / 2.8 previously used — under-stated
         * again, in the direction that passes a run which should fail.
         *
         * 4F1B starts at 4 mm²; smaller flexible sizes are not in it, so they
         * are absent rather than filled in from a table that does not apply.
         */
        'H07RN-F': { 4: 12, 6: 7.8, 10: 4.6, 16: 2.9, 25: 1.85 },
        'singles-conduit': { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
        'singles-trunking': { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
        /*
         * EV Ultra (ELE-1518) — Doncaster Cables' combined power + Cat5e data
         * cable for charge points. Confirmed from the manufacturer:
         *
         *   "Thermosetting XLPE Type GP8 to BS 7655-1.3", 90 °C maximum
         *   operating temperature, plain annealed copper Class 2 to
         *   BS EN 60228, 3-core (single phase) or 5-core (three phase).
         *
         * So it takes Table 4E4B — multicore armoured 90 °C thermosetting — and
         * NOT the 70 °C thermoplastic figures above. It is sold from 4 mm² to
         * 16 mm² only, so smaller sizes are deliberately absent: an entry for
         * 1.5 mm² EV Ultra would be a number for a cable nobody can buy.
         *
         * Note there is no British or Harmonised Standard for this cable — it
         * holds BASEC approval instead — so the table is chosen from its
         * construction rather than from a standard it claims to meet.
         */
        'ev-ultra': { 4: 12, 6: 7.9, 10: 4.7, 16: 2.9 },
      };

      /*
       * Three-phase is a different column, not the same number.
       *
       * The tables give a separate figure for a three- or four-core cable on
       * three-phase AC, and it is roughly 15% lower than the single-phase one
       * because the drop is line-to-line across a balanced load rather than
       * through a line-and-neutral pair. This lookup used the single-phase
       * column for everything.
       *
       * Flat twin and earth is absent on purpose: 4D5 publishes a single
       * voltage-drop column and nobody runs a three-phase charge point in
       * 6242Y. An unlisted cable falls back to single-phase, which is the
       * pessimistic direction and stated openly.
       *
       *   4D1B  singles, 3 or 4 cables three-phase
       *   4E4B  multicore armoured 90 °C, three- or four-core three-phase
       *   4F1B  60 °C rubber flexible, three/four/five-core three-phase
       */
      const mvAmLookupThreePhase: Record<string, Record<number, number>> = {
        SWA: { 1.5: 27, 2.5: 16, 4: 10, 6: 6.8, 10: 4.0, 16: 2.5, 25: 1.65 },
        'SWA-LSZH': { 1.5: 27, 2.5: 16, 4: 10, 6: 6.8, 10: 4.0, 16: 2.5, 25: 1.65 },
        'ev-ultra': { 4: 10, 6: 6.8, 10: 4.0, 16: 2.5 },
        'connect-ev': { 4: 10, 6: 6.8 },
        'H07RN-F': { 4: 10, 6: 6.7, 10: 4.0, 16: 2.5, 25: 1.55 },
        'singles-conduit': { 1: 38, 1.5: 25, 2.5: 15, 4: 9.5, 6: 6.4, 10: 3.8, 16: 2.4 },
        'singles-trunking': { 1: 38, 1.5: 25, 2.5: 15, 4: 9.5, 6: 6.4, 10: 3.8, 16: 2.4 },
      };

      /*
       * An unrecognised cable type used to fall through to `6242Y` silently, so
       * a voltage drop was reported for a cable whose figures we never had —
       * attributing twin-and-earth numbers to whatever was actually installed.
       * Guessing quietly is worse than saying nothing: return null and let the
       * field stay empty. An unset type still defaults to 6242Y via the
       * parameter default, which is the ordinary case and stated openly.
       */
      const table =
        (threePhase ? mvAmLookupThreePhase[cableType] : undefined) ?? mvAmLookup[cableType];
      if (!table) return null;
      const mvAm = table[cableSizeMm2];
      if (!mvAm) return null;

      // Formula: Vd = (mV/A/m × I × L) / 1000
      const voltageDropV = (mvAm * currentA * cableLengthM) / 1000;

      /*
       * The 5% of Reg 525 is 5% of the circuit's own nominal voltage.
       *
       * This judged everything against 230 V, so a three-phase charge point was
       * measured against 11.5 V when its limit is 5% of 400 V — 20 V. Combined
       * with the single-phase mV/A/m above, a correct three-phase installation
       * could be failed twice over. The direction is the opposite of the cable
       * errors, but it is just as wrong.
       */
      const nominalV = threePhase ? 400 : 230;
      const limitV = nominalV * 0.05;
      const percentOfNominal = (voltageDropV / nominalV) * 100;
      const satisfactory = voltageDropV <= limitV;

      return {
        voltageDropV: Math.round(voltageDropV * 100) / 100,
        // Kept for callers that still read it; equals percentOfNominal on a
        // single-phase circuit, which is every existing use.
        percentOf230V: Math.round(percentOfNominal * 10) / 10,
        percentOfNominal: Math.round(percentOfNominal * 10) / 10,
        nominalV,
        satisfactory,
      };
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Power / Current Conversion Helpers
  // ---------------------------------------------------------------------------
  const powerToCurrent = useCallback((powerKW: number, phases: number): number => {
    return calculateCurrentFromPower(powerKW, phases);
  }, []);

  const currentToPower = useCallback((currentA: number, phases: number): number => {
    return calculatePowerFromCurrent(currentA, phases);
  }, []);

  // ---------------------------------------------------------------------------
  // Charger Search Helper
  // ---------------------------------------------------------------------------
  const searchChargersQuery = useCallback((query: string) => {
    return searchChargers(query);
  }, []);

  const findChargerByMakeModel = useCallback((make: string, model: string) => {
    return findCharger(make, model);
  }, []);

  // ---------------------------------------------------------------------------
  // Return Hook Interface
  // ---------------------------------------------------------------------------
  return {
    // State
    loading: companyLoading,
    hasSavedInstallerDetails,
    hasSavedCompanyBranding,

    // Installer & Company Loading
    loadInstallerDetails,
    loadCompanyBranding,

    // Charger Database
    applyChargerDefaults,
    searchChargers: searchChargersQuery,
    findCharger: findChargerByMakeModel,

    // Calculations
    calculateZs,
    calculateVoltageDrop,
    lookupMaxZs,
    powerToCurrent,
    currentToPower,

    // Validation
    validateTestResults,
    checkDNORequirements,
  };
}

export default useEVChargingSmartForm;
