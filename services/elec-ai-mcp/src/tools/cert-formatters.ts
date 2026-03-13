/**
 * Server-side certificate formatters for PDF generation.
 *
 * Ports the essential logic from the frontend JSON formatters
 * (src/utils/eicrJsonFormatter.ts, eicJsonFormatter.ts) so that
 * the MCP `generate_certificate_pdf` tool can fetch report data
 * from the DB and pass correctly-formatted payloads to the
 * PDFMonkey edge functions — matching the quote/invoice/RAMS pattern.
 *
 * Minor Works does NOT need a formatter here because the
 * generate-minor-works-pdf edge function already has its own
 * transformFormDataForTemplate().
 */

import type { SupabaseClient } from '@supabase/supabase-js';

const MAIN_BOARD_ID = 'main-cu';

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

function get(formData: Record<string, unknown>, key: string, defaultValue: unknown = ''): string {
  const value = formData[key] ?? defaultValue;
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function getBool(formData: Record<string, unknown>, key: string, defaultValue = false): boolean {
  const value = formData[key];
  if (value === true || value === 'true' || value === 'yes') return true;
  if (value === false || value === 'false' || value === 'no') return false;
  return defaultValue;
}

function stripUnit(value: string): string {
  if (!value) return value;
  return value.replace(/mm²?$/i, '').trim();
}

/** Normalise polarity/pass-fail to Y/N */
function normalisePassFail(v: unknown): string {
  if (!v || v === 'N/A') return 'N/A';
  const s = String(v);
  if (['Correct', 'correct', 'OK', '✓', 'Satisfactory', 'Y', 'Pass', 'pass'].includes(s))
    return 'Y';
  if (['Incorrect', 'incorrect', '✗', 'N', 'Fail', 'fail'].includes(s)) return 'N';
  return s;
}

/* ------------------------------------------------------------------ */
/*  Photo helper (shared by EICR + EIC)                                */
/* ------------------------------------------------------------------ */

async function fetchPhotos(supabase: SupabaseClient, reportUuid: string) {
  const { data, error } = await supabase
    .from('inspection_photos')
    .select('*')
    .eq('report_id', reportUuid);

  if (error) {
    console.error('[cert-formatters] Error fetching photos:', error.message);
    return [];
  }
  return data || [];
}

function getPhotoUrls(
  supabase: SupabaseClient,
  photos: Array<Record<string, unknown>>,
  observationId: string,
  inspectionItemId?: string
): string[] {
  const matching = photos.filter(
    (p) =>
      p.observation_id === observationId || (inspectionItemId && p.item_id === inspectionItemId)
  );
  return matching.map((photo) => {
    const {
      data: { publicUrl },
    } = supabase.storage.from('inspection-photos').getPublicUrl(photo.file_path as string);
    return publicUrl;
  });
}

/* ------------------------------------------------------------------ */
/*  Circuit formatter (shared shape for EICR + EIC)                    */
/* ------------------------------------------------------------------ */

function formatCircuit(result: Record<string, unknown>) {
  return {
    id: result.id || 'N/A',
    circuit_number: result.circuitNumber || 'N/A',
    circuit_description: result.circuitDescription || 'N/A',
    circuit_type: result.circuitType || 'N/A',
    type_of_wiring: result.typeOfWiring || 'N/A',
    reference_method: result.referenceMethod || 'N/A',
    points_served: result.pointsServed || 'N/A',
    live_size: result.liveSize || 'N/A',
    cpc_size: result.cpcSize || 'N/A',
    bs_standard: result.bsStandard || 'N/A',
    protective_device_type: result.protectiveDeviceType || 'N/A',
    protective_device_curve: result.protectiveDeviceCurve || 'N/A',
    protective_device_rating: result.protectiveDeviceRating || 'N/A',
    protective_device_ka_rating: result.protectiveDeviceKaRating || 'N/A',
    max_zs: result.maxZs || 'N/A',
    protective_device_location: result.protectiveDeviceLocation || 'N/A',
    rcd_bs_standard: result.rcdBsStandard || 'N/A',
    rcd_type: result.rcdType || 'N/A',
    rcd_rating: result.rcdRating || 'N/A',
    rcd_rating_a: result.rcdRatingA || 'N/A',
    ring_r1: result.ringR1 || 'N/A',
    ring_rn: result.ringRn || 'N/A',
    ring_r2: result.ringR2 || 'N/A',
    r1r2: result.r1r2 || 'N/A',
    r2: result.r2 || 'N/A',
    ring_continuity_live: result.ringContinuityLive || 'N/A',
    ring_continuity_neutral: result.ringContinuityNeutral || 'N/A',
    insulation_test_voltage: result.insulationTestVoltage || 'N/A',
    insulation_live_neutral: result.insulationLiveNeutral || 'N/A',
    insulation_live_earth: result.insulationLiveEarth || 'N/A',
    insulation_resistance: result.insulationResistance || 'N/A',
    insulation_neutral_earth: result.insulationNeutralEarth || 'N/A',
    polarity: normalisePassFail(result.polarity),
    zs: result.zs || 'N/A',
    rcd_one_x: result.rcdOneX || 'N/A',
    rcd_test_button: normalisePassFail(result.rcdTestButton),
    afdd_test: normalisePassFail(result.afddTest),
    rcd_half_x: result.rcdHalfX || 'N/A',
    rcd_five_x: result.rcdFiveX || 'N/A',
    pfc: result.pfc || 'N/A',
    pfc_live_neutral: result.pfcLiveNeutral || 'N/A',
    pfc_live_earth: result.pfcLiveEarth || 'N/A',
    functional_testing: result.functionalTesting || 'N/A',
    notes: result.notes || 'N/A',
    source_circuit_id: result.sourceCircuitId || 'N/A',
    auto_filled: result.autoFilled || false,
    phase_type: result.phaseType || 'N/A',
    phase_rotation: result.phaseRotation || 'N/A',
    phase_balance_l1: result.phaseBalanceL1 || 'N/A',
    phase_balance_l2: result.phaseBalanceL2 || 'N/A',
    phase_balance_l3: result.phaseBalanceL3 || 'N/A',
    line_to_line_voltage: result.lineToLineVoltage || 'N/A',
    circuit_designation: result.circuitDesignation || 'N/A',
    type: result.type || 'N/A',
    cable_size: result.cableSize || 'N/A',
    protective_device: result.protectiveDevice || 'N/A',
  };
}

/* ================================================================== */
/*  EICR Formatter                                                     */
/* ================================================================== */

export async function formatEicrForPdf(
  formData: Record<string, unknown>,
  companyProfile: Record<string, unknown> | null,
  reportUuid: string,
  supabase: SupabaseClient
) {
  const g = (key: string, def: unknown = '') => get(formData, key, def);
  const gb = (key: string, def = false) => getBool(formData, key, def);

  // ── Flat inspection keys ────────────────────────────────────────
  const itemNumberLookup: Record<string, string> = {
    item_1_0: '1.0',
    item_1_1: '1.1',
    item_1_2: '1.2',
    item_2_0: '2.0',
    item_3_1: '3.1',
    item_3_2: '3.2',
    item_3_3: '3.3',
    item_3_4: '3.4',
    item_3_5: '3.5',
    item_3_6: '3.6',
    item_3_7: '3.7',
    item_3_8: '3.8',
    item_3_9: '3.9',
    item_4_1: '4.1',
    item_4_2: '4.2',
    item_4_3: '4.3',
    item_4_4: '4.4',
    item_4_5: '4.5',
    item_4_6: '4.6',
    item_4_7: '4.7',
    item_4_8: '4.8',
    item_4_9: '4.9',
    item_4_10: '4.10',
    item_4_11: '4.11',
    item_4_12: '4.12',
    item_4_13: '4.13',
    item_4_14: '4.14',
    item_4_15: '4.15',
    item_4_16: '4.16',
    item_4_17: '4.17',
    item_4_18: '4.18',
    item_4_19: '4.19',
    item_4_20: '4.20',
    item_4_21: '4.21',
    item_4_22: '4.22',
    item_4_23: '4.23',
    item_4_24: '4.24',
    item_4_25: '4.25',
    item_5_1: '5.1',
    item_5_2: '5.2',
    item_5_3: '5.3',
    item_5_4: '5.4',
    item_5_5: '5.5',
    item_5_6: '5.6',
    item_5_7: '5.7',
    item_5_8: '5.8',
    item_5_9: '5.9',
    item_5_10: '5.10',
    item_5_11: '5.11',
    item_5_12: '5.12',
    item_5_13: '5.13',
    item_5_14: '5.14',
    item_5_15: '5.15',
    item_5_16: '5.16',
    item_5_17: '5.17',
    item_5_18: '5.18',
    item_5_19: '5.19',
    item_5_20: '5.20',
    item_5_21: '5.21',
    item_5_22: '5.22',
    item_5_23: '5.23',
    item_6_0: '6.0',
    item_6_1: '6.1',
    item_6_2: '6.2',
    item_6_3: '6.3',
    item_6_4: '6.4',
    item_6_5: '6.5',
    item_6_6: '6.6',
    item_6_7: '6.7',
    item_6_8: '6.8',
    item_6_9: '6.9',
    item_6_10: '6.10',
    item_6_11: '6.11',
    item_6_12: '6.12',
    item_6_13: '6.13',
    item_7_0: '7.0',
    item_7_1: '7.1',
    item_7_2: '7.2',
    item_7_3: '7.3',
    item_8_0: '8.0',
    item_8_1: '8.1',
    item_8_2: '8.2',
    item_8_3: '8.3',
    item_8_4: '8.4',
  };

  const flatKeys: Record<string, string> = {};
  const rawItems = formData.inspectionItems;
  let inspParsed: Array<Record<string, unknown>> = [];
  try {
    inspParsed =
      typeof rawItems === 'string' ? JSON.parse(rawItems) : Array.isArray(rawItems) ? rawItems : [];
  } catch {
    /* empty */
  }

  for (const item of inspParsed) {
    const outcome = String(item.outcome || '');
    const itemNumber = itemNumberLookup[item.id as string] || (item.itemNumber as string) || '';
    if (!itemNumber) continue;
    const prefix = 'insp_' + itemNumber.replace(/\./g, '_');
    flatKeys[`${prefix}_acc`] = outcome === 'satisfactory' ? 'Y' : '';
    flatKeys[`${prefix}_na`] = outcome === 'not-applicable' || outcome === 'N/A' ? 'N/A' : '';
    flatKeys[`${prefix}_c1c2`] = outcome === 'C1' ? 'C1' : outcome === 'C2' ? 'C2' : '';
    flatKeys[`${prefix}_c3`] = outcome === 'C3' ? 'C3' : '';
    flatKeys[`${prefix}_fi`] = outcome === 'FI' ? 'FI' : '';
    flatKeys[`${prefix}_nv`] = outcome === 'not-verified' || outcome === 'N/V' ? 'N/V' : '';
    flatKeys[`${prefix}_lim`] = outcome === 'limitation' || outcome === 'LIM' ? 'LIM' : '';
  }

  // ── Inspection checklist array ──────────────────────────────────
  const inspectionChecklist = inspParsed.map((item) => {
    const outcome = String(item.outcome || '');
    const sectionNum = String(item.itemNumber || item.number || '').split('.')[0];
    return {
      id: item.id || '',
      item_number: item.itemNumber || item.number || '',
      description: item.item || item.description || '',
      outcome,
      clause: item.clause || '',
      notes: item.notes || '',
      section_num: sectionNum,
      col_acc: outcome === 'satisfactory' ? '✓' : '',
      col_na: outcome === 'not-applicable' || outcome === 'N/A' ? '✓' : '',
      col_c1c2: outcome === 'C1' ? 'C1' : outcome === 'C2' ? 'C2' : '',
      col_c3: outcome === 'C3' ? '✓' : '',
      col_fi: outcome === 'FI' ? 'FI' : '',
      col_nv: outcome === 'not-verified' || outcome === 'N/V' ? '✓' : '',
      col_lim: outcome === 'limitation' || outcome === 'LIM' ? '✓' : '',
    };
  });

  // ── Inspection items grouped by section (for PDF template) ─────
  const sectionMap: Record<
    string,
    { section_name: string; clause: string; items: Array<Record<string, unknown>> }
  > = {};
  for (const item of inspParsed) {
    const sectionName = (item.section as string) || 'General';
    if (!sectionMap[sectionName]) {
      sectionMap[sectionName] = {
        section_name: sectionName,
        clause: (item.clause as string) || '',
        items: [],
      };
    }
    sectionMap[sectionName].items.push({
      id: item.id || '',
      item_number: item.itemNumber || item.number || '',
      item: item.item || item.description || '',
      clause: item.clause || '',
      outcome: item.outcome || '',
      notes: item.notes || '',
    });
  }
  const inspectionItemsBySection = Object.values(sectionMap);

  // ── Circuits ────────────────────────────────────────────────────
  const testResults = Array.isArray(formData.scheduleOfTests)
    ? (formData.scheduleOfTests as Record<string, unknown>[])
    : [];
  const scheduleOfTests = testResults.map(formatCircuit);

  // ── Boards with schedules ───────────────────────────────────────
  const boards = Array.isArray(formData.distributionBoards)
    ? (formData.distributionBoards as Record<string, unknown>[])
    : [];

  let boardsWithSchedules: Record<string, unknown>[];
  if (boards.length === 0 && testResults.length > 0) {
    boardsWithSchedules = [
      {
        db_reference: g('cuReference') || 'Main DB',
        db_location: g('cuLocation'),
        db_manufacturer: g('cuMake'),
        db_type: g('cuType'),
        db_ways: '',
        db_zdb: g('zdb'),
        db_ipf: g('ipf'),
        zdb: g('zdb'),
        ipf: g('ipf'),
        supplied_from: '',
        incoming_device_bs_en: '',
        incoming_device_type: '',
        incoming_device_rating: '',
        polarity_confirmed: gb('confirmedCorrectPolarity'),
        phase_sequence_confirmed: gb('confirmedPhaseSequence'),
        spd_operational: gb('spdOperationalStatus'),
        spd_na: gb('spdNA'),
        main_switch_bs_en: g('mainSwitchBsEn'),
        main_switch_type: g('mainSwitchType'),
        main_switch_rating: g('mainSwitchRating'),
        main_switch_poles: g('mainSwitchPoles'),
        circuit_count: testResults.length,
        circuits: testResults.map(formatCircuit),
      },
    ];
  } else {
    boardsWithSchedules = boards.map((board) => {
      const boardId = board.id || MAIN_BOARD_ID;
      const boardCircuits = testResults.filter(
        (r) => ((r.boardId as string) || MAIN_BOARD_ID) === boardId
      );
      return {
        db_reference: board.reference || board.name || 'Main DB',
        db_location: board.location || '',
        db_manufacturer: board.make || '',
        db_type: board.type || '',
        db_ways: board.totalWays?.toString() || '',
        db_zdb: board.zdb || '',
        db_ipf: board.ipf || '',
        zdb: board.zdb || '',
        ipf: board.ipf || '',
        supplied_from: board.suppliedFrom || '',
        incoming_device_bs_en: board.incomingDeviceBsEn || '',
        incoming_device_type: board.incomingDeviceType || '',
        incoming_device_rating: board.incomingDeviceRating || '',
        polarity_confirmed: board.confirmedCorrectPolarity ?? false,
        phase_sequence_confirmed: board.confirmedPhaseSequence ?? false,
        spd_operational: board.spdOperationalStatus ?? false,
        spd_na: board.spdNA ?? false,
        main_switch_bs_en: board.mainSwitchBsEn || '',
        main_switch_type: board.mainSwitchType || '',
        main_switch_rating: board.mainSwitchRating || '',
        main_switch_poles: board.mainSwitchPoles || '',
        circuit_count: boardCircuits.length,
        circuits: boardCircuits.map(formatCircuit),
      };
    });
  }

  // ── Additional boards ───────────────────────────────────────────
  const additionalBoards =
    boards.length > 1
      ? boards.slice(1).map((board) => ({
          designation: board.name || board.reference || board.designation || '',
          location: board.location || '',
          manufacturer: board.make || board.manufacturer || '',
          board_type: board.type || board.boardType || '',
          ways: board.totalWays?.toString() || board.ways || '',
          zdb: board.zdb || '',
          ipf: board.ipf || '',
        }))
      : [];

  // ── Defects with photos ─────────────────────────────────────────
  const defects = Array.isArray(formData.defectObservations)
    ? (formData.defectObservations as Record<string, unknown>[])
    : [];
  const photos = await fetchPhotos(supabase, reportUuid);
  const observations = defects.map((defect) => {
    const photoUrls = getPhotoUrls(
      supabase,
      photos,
      defect.id as string,
      defect.inspectionItemId as string | undefined
    );
    return {
      id: defect.id || '',
      item: defect.item || '',
      defect_code: defect.defectCode || '',
      description: defect.description || '',
      recommendation: defect.recommendation || '',
      regulation: defect.regulation || defect.clause || '',
      rectified: defect.rectified || false,
      photo_evidence: photoUrls,
      photo_count: photoUrls.length,
    };
  });

  // ── Bonding from mainBondingLocations ───────────────────────────
  const bondingStr = String(formData.mainBondingLocations || '').toLowerCase();
  const mainBoard = boards[0] || {};

  return {
    // Flat inspection keys at root
    ...flatKeys,

    metadata: {
      certificate_number: g('certificateNumber'),
      form_version: '1.0',
      export_timestamp: new Date().toISOString(),
    },

    client_details: {
      client_name: g('clientName'),
      client_address: g('clientAddress'),
      client_phone: g('clientPhone'),
      client_email: g('clientEmail'),
    },

    installation_details: {
      address: g('installationAddress'),
      same_as_client_address: gb('sameAsClientAddress'),
      occupier: g('occupier'),
      installation_type: g('installationType'),
      description: g('description'),
      premises_type:
        g('description') === 'other' ? g('otherPremisesDescription') : g('description'),
      other_premises_description: g('otherPremisesDescription'),
      installation_date: g('installationDate'),
      test_date: g('inspectionDate'),
      construction_date: g('constructionDate'),
      estimated_age: g('estimatedAge'),
      age_unit: g('ageUnit'),
      last_inspection_type: g('lastInspectionType'),
      date_of_last_inspection: g('dateOfLastInspection'),
      evidence_of_alterations: g('evidenceOfAlterations'),
      alterations_details: g('alterationsDetails'),
      alterations_age: g('alterationsAge'),
      installation_records_available: g('installationRecordsAvailable'),
      purpose_of_inspection: g('purposeOfInspection'),
      other_purpose: g('otherPurpose'),
      agreed_with: g('agreedWith'),
      extent_of_inspection: g('extentOfInspection'),
      limitations_of_inspection: g('limitationsOfInspection'),
      operational_limitations: g('operationalLimitations'),
      bs_amendment: g('bsAmendment'),
      next_inspection_date: g('nextInspectionDate'),
      inspection_interval: g('inspectionInterval'),
      interval_reasons: g('intervalReasons'),
    },

    standards_compliance: {
      design_standard: g('designStandard', 'BS7671'),
      part_p_compliance: g('partPCompliance'),
    },

    supply_characteristics: {
      supply_voltage: g('supplyVoltageCustom') || g('supplyVoltage'),
      supply_frequency: g('supplyFrequency', '50'),
      supply_ac_dc: g('supplyAcDc', 'ac'),
      conductor_configuration: g('conductorConfiguration'),
      phases: g('phases'),
      earthing_arrangement: g('earthingArrangement'),
      supply_type: g('supplyType'),
      supply_pme: g('supplyPME'),
      dno_name: g('dnoName'),
      mpan: g('mpan'),
      cutout_location: g('cutoutLocation'),
      service_entry: g('serviceEntry'),
      external_ze: g('externalZe'),
      prospective_fault_current: g('prospectiveFaultCurrent'),
      supply_polarity_confirmed: gb('supplyPolarityConfirmed'),
      other_sources_of_supply: g('otherSourcesOfSupply'),
    },

    main_protective_device: {
      bs_en: (mainBoard as Record<string, unknown>).mainSwitchBsEn || '',
      device_type: g('mainProtectiveDevice'),
      main_switch_rating: g('mainSwitchRating'),
      main_switch_location:
        g('cuLocation') || (mainBoard as Record<string, unknown>).location || '',
      main_switch_poles: g('mainSwitchPoles'),
      main_switch_voltage_rating: g('mainSwitchVoltageRating'),
      fuse_device_rating: g('fuseDeviceRating'),
      breaking_capacity: g('breakingCapacity'),
    },

    rcd_details: {
      rcd_main_switch: g('rcdMainSwitch'),
      rcd_rating: g('rcdRating'),
      rcd_type: g('rcdType'),
      rcd_time_delay: g('rcdTimeDelay'),
      rcd_measured_time: g('rcdMeasuredTime'),
    },

    distribution_board: {
      board_designation:
        (mainBoard as Record<string, unknown>).name ||
        (mainBoard as Record<string, unknown>).reference ||
        g('boardDesignation', 'Main DB'),
      board_size: (mainBoard as Record<string, unknown>).totalWays
        ? `${(mainBoard as Record<string, unknown>).totalWays}-way`
        : g('boardSize'),
      board_type: (mainBoard as Record<string, unknown>).type || g('cuType'),
      board_location: (mainBoard as Record<string, unknown>).location || g('cuLocation'),
      board_manufacturer: (mainBoard as Record<string, unknown>).make || g('cuManufacturer'),
      board_ways:
        (mainBoard as Record<string, unknown>).totalWays?.toString() || g('cuNumberOfWays') || '',
    },

    cables: {
      intake_cable_size: stripUnit(g('intakeCableSize')),
      intake_cable_type: g('intakeCableType'),
      tails_size: stripUnit(g('tailsSize')),
      tails_length: g('tailsLength'),
    },

    earthing_bonding: {
      means_of_earthing_distributor: gb('meansOfEarthingDistributor'),
      means_of_earthing_electrode: gb('meansOfEarthingElectrode'),
      earth_electrode_type: g('earthElectrodeType'),
      earth_electrode_location: g('earthElectrodeLocation'),
      earth_electrode_resistance: g('earthElectrodeResistance'),
      main_earthing_conductor_type: g('mainEarthingConductorType'),
      main_earthing_conductor_size:
        g('mainEarthingConductorSizeCustom') || g('mainEarthingConductorSize'),
      main_earthing_conductor: (() => {
        const size = stripUnit(
          g('mainEarthingConductorSizeCustom') || g('mainEarthingConductorSize')
        );
        const type = g('mainEarthingConductorType');
        if (size && type) return `${size}mm² ${type}`;
        if (size) return `${size}mm²`;
        return '';
      })(),
      main_bonding_conductor_type: g('mainBondingConductorType'),
      main_bonding_conductor: (() => {
        const size = stripUnit(g('mainBondingSizeCustom') || g('mainBondingSize'));
        const type = g('mainBondingConductorType');
        if (size && type) return `${size}mm² ${type}`;
        if (size) return `${size}mm²`;
        return '';
      })(),
      main_bonding_size: g('mainBondingSizeCustom') || g('mainBondingSize'),
      main_bonding_size_custom: g('mainBondingSizeCustom'),
      main_bonding_locations: g('mainBondingLocations'),
      bonding_water: bondingStr.includes('water'),
      bonding_gas: bondingStr.includes('gas'),
      bonding_oil: bondingStr.includes('oil'),
      bonding_structural_steel: bondingStr.includes('steel') || bondingStr.includes('structural'),
      bonding_lightning_protection: bondingStr.includes('lightning'),
      bonding_other: bondingStr.includes('telecom') || bondingStr.includes('other'),
      bonding_other_specify: g('bondingOtherSpecify'),
      bonding_compliance: g('bondingCompliance'),
      earthing_conductor_continuity_verified: gb('earthingConductorContinuityVerified'),
      bonding_conductor_continuity_verified: gb('bondingConductorContinuityVerified'),
      supplementary_bonding: g('supplementaryBonding'),
      supplementary_bonding_size:
        g('supplementaryBondingSizeCustom') || g('supplementaryBondingSize'),
      supplementary_bonding_size_custom: g('supplementaryBondingSizeCustom'),
      equipotential_bonding: g('equipotentialBonding'),
    },

    inspection_checklist: inspectionChecklist,
    inspection_items: inspectionItemsBySection,
    additional_boards: additionalBoards,
    schedule_of_tests: scheduleOfTests,
    boards_with_schedules: boardsWithSchedules,

    test_instrument_details: {
      make_model:
        g('testInstrumentMake') === 'Other' ? g('customTestInstrument') : g('testInstrumentMake'),
      serial_number: g('testInstrumentSerial'),
      calibration_date: g('calibrationDate'),
      test_temperature: g('testTemperature'),
    },

    test_information: {
      test_method: g('testMethod'),
      test_voltage: g('testVoltage'),
      test_notes: g('testNotes'),
    },

    distribution_board_verification: {
      db_reference:
        (mainBoard as Record<string, unknown>).reference ||
        (mainBoard as Record<string, unknown>).name ||
        g('dbReference') ||
        'Main DB',
      zdb: (mainBoard as Record<string, unknown>).zdb || g('zdb') || '',
      ipf: (mainBoard as Record<string, unknown>).ipf || g('ipf') || '',
      confirmed_correct_polarity:
        (mainBoard as Record<string, unknown>).confirmedCorrectPolarity ??
        gb('confirmedCorrectPolarity'),
      confirmed_phase_sequence:
        (mainBoard as Record<string, unknown>).confirmedPhaseSequence ??
        gb('confirmedPhaseSequence'),
      spd_operational_status:
        (mainBoard as Record<string, unknown>).spdOperationalStatus ?? gb('spdOperationalStatus'),
      spd_na: (mainBoard as Record<string, unknown>).spdNA ?? gb('spdNA'),
    },

    designer: {
      name: g('designerName'),
      qualifications: g('designerQualifications'),
      company: g('companyName') || g('designerCompany'),
      address: g('companyAddress') || g('designerAddress'),
      postcode: g('companyPostcode') || g('designerPostcode'),
      phone: g('companyPhone') || g('designerPhone'),
      date: g('designerDate'),
      signature: g('designerSignature'),
      departures: g('designerDepartures'),
      permitted_exceptions: g('permittedExceptions'),
    },

    constructor: {
      name: g('constructorName'),
      qualifications: g('constructorQualifications'),
      company: g('constructorCompany'),
      date: g('constructorDate'),
      signature: g('constructorSignature'),
    },

    inspector: {
      name: g('inspectorName'),
      qualifications: g('inspectorQualifications'),
      company: g('companyName') || g('inspectorCompany'),
      date: g('inspectionDate'),
      signature: g('inspectorSignature'),
    },

    declarations: {
      same_as_designer: gb('sameAsDesigner'),
      same_as_constructor: gb('sameAsConstructor'),
      additional_notes: g('additionalComments'),
      inspected_by: {
        name: g('inspectedByName'),
        signature: g('inspectedBySignature'),
        for_on_behalf_of: g('inspectedByForOnBehalfOf'),
        position: g('inspectedByPosition'),
        address: g('inspectedByAddress'),
        cp_scheme: g('inspectedByCpScheme'),
        cp_scheme_na: gb('inspectedByCpSchemeNA'),
      },
      report_authorised_by: {
        name: g('reportAuthorisedByName'),
        date: g('reportAuthorisedByDate'),
        signature: g('reportAuthorisedBySignature'),
        for_on_behalf_of: g('reportAuthorisedByForOnBehalfOf'),
        position: g('reportAuthorisedByPosition'),
        address: g('reportAuthorisedByAddress'),
        membership_no: g('reportAuthorisedByMembershipNo'),
      },
      bs7671_compliance: gb('bs7671Compliance'),
      building_regs_compliance: gb('buildingRegsCompliance'),
      competent_person_scheme: gb('competentPersonScheme'),
      overall_assessment: g('overallAssessment'),
      satisfactory_for_continued_use: gb('satisfactoryForContinuedUse'),
    },

    company_details: {
      company_name: g('companyName'),
      company_address: g('companyAddress'),
      company_phone: g('companyPhone'),
      company_email: g('companyEmail'),
      company_website: g('companyWebsite'),
      company_logo: g('companyLogo'),
      company_tagline: g('companyTagline'),
      company_accent_color: g('companyAccentColor'),
      company_registration_number: g('companyRegistrationNumber'),
      vat_number: g('vatNumber'),
      registration_scheme: g('registrationScheme'),
      registration_number: g('registrationNumber'),
      registration_expiry: g('registrationExpiry'),
      insurance_provider: g('insuranceProvider'),
      insurance_policy_number: g('insurancePolicyNumber'),
      insurance_coverage: g('insuranceCoverage'),
      insurance_expiry: g('insuranceExpiry'),
      registration_scheme_logo: g('registrationSchemeLogo'),
    },

    observations,

    // ── Top-level copies for PDF template compatibility ─────────────
    // Earth electrode — both snake_case and camelCase
    earth_electrode_type: g('earthElectrodeType'),
    earth_electrode_location: g('earthElectrodeLocation'),
    earth_electrode_resistance: g('earthElectrodeResistance'),
    earthElectrodeType: g('earthElectrodeType'),
    earthElectrodeLocation: g('earthElectrodeLocation'),
    earthElectrodeResistance: g('earthElectrodeResistance'),

    // Departures — multiple naming conventions
    departures: g('designerDepartures'),
    designer_departures: g('designerDepartures'),
    designerDepartures: g('designerDepartures'),
    details_of_departures: g('designerDepartures'),
    permitted_exceptions: g('permittedExceptions'),
    permittedExceptions: g('permittedExceptions'),
    details_of_permitted_exceptions: g('permittedExceptions'),
    exceptions: g('permittedExceptions'),

    // Main switch location
    main_switch_location: g('cuLocation') || g('mainSwitchLocation'),
    mainSwitchLocation: g('cuLocation') || g('mainSwitchLocation'),

    // Supply authority
    dno_name: g('dnoName'),
    dnoName: g('dnoName'),
    mpan: g('mpan'),
    cutout_location: g('cutoutLocation'),
    cutoutLocation: g('cutoutLocation'),

    // Supply details
    phases: g('phases'),
    supply_voltage: g('supplyVoltageCustom') || g('supplyVoltage'),
    supplyVoltage: g('supplyVoltageCustom') || g('supplyVoltage'),
    supply_frequency: g('supplyFrequency', '50'),
    supply_pme: g('supplyPME'),
    supplyPME: g('supplyPME'),
    earthing_arrangement: g('earthingArrangement'),
    earthingArrangement: g('earthingArrangement'),

    // Main protective device (flat)
    mainProtectiveDevice: g('mainProtectiveDevice'),
    main_protective_device_type: g('mainProtectiveDevice'),
    rcd_main_switch: g('rcdMainSwitch'),
    rcdMainSwitch: g('rcdMainSwitch'),
    rcd_rating: g('rcdRating'),
    rcdRating: g('rcdRating'),

    // Client details
    client_name: g('clientName'),
    clientName: g('clientName'),
    client_address: g('clientAddress'),
    clientAddress: g('clientAddress'),
    client_phone: g('clientPhone'),
    clientPhone: g('clientPhone'),
    client_email: g('clientEmail'),
    clientEmail: g('clientEmail'),
    installation_address: g('installationAddress'),
    installationAddress: g('installationAddress'),

    // Installation details
    installation_type: g('installationType'),
    installationType: g('installationType'),
    description: g('description'),
    estimated_age: g('estimatedAge'),
    estimatedAge: g('estimatedAge'),
    age_unit: g('ageUnit'),
    ageUnit: g('ageUnit'),
    last_inspection_type: g('lastInspectionType'),
    date_of_last_inspection: g('dateOfLastInspection'),
    evidence_of_alterations: g('evidenceOfAlterations'),
    alterations_details: g('alterationsDetails'),

    // Inspection details
    inspection_date: g('inspectionDate'),
    inspectionDate: g('inspectionDate'),
    next_inspection_date: g('nextInspectionDate'),
    nextInspectionDate: g('nextInspectionDate'),
    inspection_interval: g('inspectionInterval'),
    inspectionInterval: g('inspectionInterval'),
    purpose_of_inspection: g('purposeOfInspection'),
    purposeOfInspection: g('purposeOfInspection'),
    other_purpose: g('otherPurpose'),
    extent_of_inspection: g('extentOfInspection'),
    extentOfInspection: g('extentOfInspection'),
    limitations_of_inspection: g('limitationsOfInspection'),
    limitationsOfInspection: g('limitationsOfInspection'),

    // Distribution board (flat)
    db_location: (mainBoard as Record<string, unknown>).location || g('cuLocation'),
    db_manufacturer: (mainBoard as Record<string, unknown>).make || g('cuManufacturer'),
    db_type: (mainBoard as Record<string, unknown>).type || g('cuType'),
    db_ways: (mainBoard as Record<string, unknown>).totalWays?.toString() || '',
    db_reference:
      (mainBoard as Record<string, unknown>).reference ||
      (mainBoard as Record<string, unknown>).name ||
      'Main DB',
    db_zdb: (mainBoard as Record<string, unknown>).zdb || '',
    db_ipf: (mainBoard as Record<string, unknown>).ipf || '',

    // Cables (flat) — stripUnit prevents double-mm
    intake_cable_size: stripUnit(g('intakeCableSize')),
    intakeCableSize: stripUnit(g('intakeCableSize')),
    intake_cable_type: g('intakeCableType'),
    intakeCableType: g('intakeCableType'),
    tails_size: stripUnit(g('tailsSize')),
    tailsSize: stripUnit(g('tailsSize')),
    tails_length: g('tailsLength'),
    tailsLength: g('tailsLength'),

    // Earthing & bonding (flat)
    main_earthing_conductor_type: g('mainEarthingConductorType'),
    mainEarthingConductorType: g('mainEarthingConductorType'),
    main_earthing_conductor_size:
      g('mainEarthingConductorSizeCustom') || g('mainEarthingConductorSize'),
    mainEarthingConductorSize:
      g('mainEarthingConductorSizeCustom') || g('mainEarthingConductorSize'),
    main_bonding_conductor_type: g('mainBondingConductorType'),
    mainBondingConductorType: g('mainBondingConductorType'),
    main_bonding_size: g('mainBondingSizeCustom') || g('mainBondingSize'),
    mainBondingSize: g('mainBondingSizeCustom') || g('mainBondingSize'),
    main_bonding_locations: g('mainBondingLocations'),
    mainBondingLocations: g('mainBondingLocations'),
    bonding_compliance: g('bondingCompliance'),
    bondingCompliance: g('bondingCompliance'),
    supplementary_bonding_size:
      g('supplementaryBondingSizeCustom') || g('supplementaryBondingSize'),
    supplementaryBondingSize: g('supplementaryBondingSizeCustom') || g('supplementaryBondingSize'),
    equipotential_bonding: g('equipotentialBonding'),
    equipotentialBonding: g('equipotentialBonding'),

    // Overall assessment & summary
    overall_assessment: g('overallAssessment'),
    overallAssessment: g('overallAssessment'),
    satisfactory_for_continued_use: gb('satisfactoryForContinuedUse'),
    satisfactoryForContinuedUse: gb('satisfactoryForContinuedUse'),
    additional_comments: g('additionalComments'),
    additionalComments: g('additionalComments'),

    // Inspected by (flat)
    inspected_by_name: g('inspectedByName'),
    inspectedByName: g('inspectedByName'),
    inspected_by_signature: g('inspectedBySignature'),
    inspectedBySignature: g('inspectedBySignature'),
    inspected_by_for_on_behalf_of: g('inspectedByForOnBehalfOf'),
    inspected_by_position: g('inspectedByPosition'),
    inspected_by_address: g('inspectedByAddress'),
    inspected_by_cp_scheme: g('inspectedByCpScheme'),

    // Report authorised by (flat)
    report_authorised_by_name: g('reportAuthorisedByName'),
    report_authorised_by_date: g('reportAuthorisedByDate'),
    report_authorised_by_signature: g('reportAuthorisedBySignature'),
    report_authorised_by_for_on_behalf_of: g('reportAuthorisedByForOnBehalfOf'),
    report_authorised_by_position: g('reportAuthorisedByPosition'),
    report_authorised_by_address: g('reportAuthorisedByAddress'),
    report_authorised_by_membership_no: g('reportAuthorisedByMembershipNo'),

    // Inspector details (flat)
    inspector_name: g('inspectorName'),
    inspectorName: g('inspectorName'),
    inspector_qualifications: g('inspectorQualifications'),
    inspectorQualifications: g('inspectorQualifications'),
    inspector_signature: g('inspectorSignature'),
    inspectorSignature: g('inspectorSignature'),
    registration_scheme: g('registrationScheme'),
    registrationScheme: g('registrationScheme'),
    registration_number: g('registrationNumber'),
    registrationNumber: g('registrationNumber'),
    registration_expiry: g('registrationExpiry'),
    registrationExpiry: g('registrationExpiry'),
    registration_scheme_logo: g('registrationSchemeLogo'),
    registrationSchemeLogo: g('registrationSchemeLogo'),

    // Insurance (flat)
    insurance_provider: g('insuranceProvider'),
    insuranceProvider: g('insuranceProvider'),
    insurance_policy_number: g('insurancePolicyNumber'),
    insurancePolicyNumber: g('insurancePolicyNumber'),
    insurance_coverage: g('insuranceCoverage'),
    insuranceCoverage: g('insuranceCoverage'),
    insurance_expiry: g('insuranceExpiry'),
    insuranceExpiry: g('insuranceExpiry'),

    // Company details (flat)
    company_name: g('companyName'),
    companyName: g('companyName'),
    company_address: g('companyAddress'),
    companyAddress: g('companyAddress'),
    company_phone: g('companyPhone'),
    companyPhone: g('companyPhone'),
    company_email: g('companyEmail'),
    companyEmail: g('companyEmail'),
    company_logo: g('companyLogo'),
    companyLogo: g('companyLogo'),
    company_website: g('companyWebsite'),
    companyWebsite: g('companyWebsite'),
    company_tagline: g('companyTagline'),
    companyTagline: g('companyTagline'),
    company_accent_color: g('companyAccentColor'),
    companyAccentColor: g('companyAccentColor'),

    // Test instrument & method (flat)
    test_method: g('testMethod'),
    test_voltage: g('testVoltage'),
    test_notes: g('testNotes'),
    test_temperature: g('testTemperature'),
    test_instrument_make:
      g('testInstrumentMake') === 'Other' ? g('customTestInstrument') : g('testInstrumentMake'),
    test_instrument_serial: g('testInstrumentSerial'),
    calibration_date: g('calibrationDate'),

    // Main switch fields (flat)
    main_switch_rating: g('mainSwitchRating'),
    main_switch_poles: g('mainSwitchPoles'),
    main_switch_voltage_rating: g('mainSwitchVoltageRating'),
    fuse_device_rating: g('fuseDeviceRating'),
    breaking_capacity: g('breakingCapacity'),
    service_entry: g('serviceEntry'),

    // Supply characteristics (flat)
    supply_ac_dc: g('supplyAcDc', 'ac'),
    conductor_configuration: g('conductorConfiguration'),
    external_ze: g('externalZe'),
    prospective_fault_current: g('prospectiveFaultCurrent'),
    supply_polarity_confirmed: gb('supplyPolarityConfirmed'),
    other_sources_of_supply: g('otherSourcesOfSupply'),

    // Earthing (flat booleans)
    means_of_earthing_distributor: gb('meansOfEarthingDistributor'),
    means_of_earthing_electrode: gb('meansOfEarthingElectrode'),
    earthing_conductor_continuity_verified: gb('earthingConductorContinuityVerified'),
    bonding_conductor_continuity_verified: gb('bondingConductorContinuityVerified'),

    // RCD details (flat)
    rcd_time_delay: g('rcdTimeDelay'),
    rcd_measured_time: g('rcdMeasuredTime'),

    // Section C — Installation details
    occupier: g('occupier'),
    premises_type: g('description') === 'other' ? g('otherPremisesDescription') : g('description'),
    other_premises_description: g('otherPremisesDescription'),
    alterations_age: g('alterationsAge'),
    installation_records_available: g('installationRecordsAvailable'),

    // Section D — Extent & limitations
    agreed_with: g('agreedWith'),
    operational_limitations: g('operationalLimitations'),
    bs_amendment: g('bsAmendment'),
    interval_reasons: g('intervalReasons'),

    // Observations
    no_remedial_action: gb('noRemedialAction'),

    // Schedule counts
    inspection_schedule_count: 1,
    test_schedule_count: boards.length > 0 ? boards.length : 1,
  };
}

/* ================================================================== */
/*  EIC Formatter                                                      */
/* ================================================================== */

export async function formatEicForPdf(
  formData: Record<string, unknown>,
  companyProfile: Record<string, unknown> | null,
  reportUuid: string,
  supabase: SupabaseClient
) {
  // ── Flat inspection keys (insp_1 … insp_14) ────────────────────
  const flatInspectionKeys: Record<string, string> = {};
  const inspectionItems = (formData.inspectionItems ||
    Object.values((formData.inspections as Record<string, unknown>) || {})) as Record<
    string,
    unknown
  >[];

  for (let i = 1; i <= 14; i++) {
    const item = inspectionItems.find(
      (it) =>
        it?.itemNumber === String(i) ||
        it?.itemNumber === i ||
        it?.id === `eic_${i}` ||
        it?.id === String(i)
    );
    const outcome = String(item?.outcome || '');
    if (outcome === 'satisfactory' || outcome === 'acceptable' || outcome === 'Acceptable') {
      flatInspectionKeys[`insp_${i}`] = 'Acceptable';
    } else if (outcome === 'na' || outcome === 'not-applicable' || outcome === 'N/A') {
      flatInspectionKeys[`insp_${i}`] = 'N/A';
    } else if (outcome === 'limitation' || outcome === 'LIM') {
      flatInspectionKeys[`insp_${i}`] = 'LIM';
    } else {
      flatInspectionKeys[`insp_${i}`] = '';
    }
  }

  // ── Bonding from mainBondingLocations string ────────────────────
  const bondingStr = String(formData.mainBondingLocations || '').toLowerCase();

  // ── Board reference map for circuit schedule ────────────────────
  const boardRefMap: Record<string, string> = {};
  const boards = Array.isArray(formData.distributionBoards)
    ? (formData.distributionBoards as Record<string, unknown>[])
    : [];
  boards.forEach((board) => {
    boardRefMap[board.id as string] = (board.reference ||
      board.name ||
      board.dbReference ||
      '') as string;
  });

  // ── Observations with photos ────────────────────────────────────
  const obsRaw = Array.isArray(formData.observations)
    ? (formData.observations as Record<string, unknown>[])
    : [];
  const photos = await fetchPhotos(supabase, reportUuid);
  const observations = obsRaw.map((obs) => {
    const photoUrls = getPhotoUrls(supabase, photos, obs.id as string);
    return {
      id: obs.id || '',
      description: obs.description || '',
      defect_code: obs.defectCode || obs.defect_code || '',
      recommendation: obs.recommendation || '',
      item: obs.item || '',
      rectified: obs.rectified ?? false,
      photo_evidence: photoUrls,
      photo_count: photoUrls.length,
    };
  });

  // ── Schedule of tests ───────────────────────────────────────────
  const testResults = Array.isArray(formData.scheduleOfTests)
    ? (formData.scheduleOfTests as Record<string, unknown>[])
    : [];

  const cp = companyProfile || {};

  const json: Record<string, unknown> = {
    ...flatInspectionKeys,

    metadata: { certificate_number: formData.certificateNumber || '' },

    client_details: {
      client_name: formData.clientName || '',
      client_address: formData.clientAddress || '',
      client_phone: formData.clientPhone || '',
      client_email: formData.clientEmail || '',
    },

    installation_details: {
      address: formData.installationAddress || '',
      same_as_client_address: formData.sameAsClientAddress === 'true',
      installation_type: formData.installationType || '',
      work_type: formData.workType || formData.installationType || '',
      description: formData.description || '',
      extent_of_installation: formData.extentOfInstallation || '',
      installation_date: formData.installationDate || '',
      test_date: formData.testDate || '',
      construction_date: formData.constructionDate || '',
    },

    standards_compliance: {
      design_standard: formData.designStandard || '',
      part_p_compliance: formData.partPCompliance || '',
    },

    supply_characteristics: {
      supply_voltage: formData.supplyVoltage || formData.nominalVoltage || '',
      supply_frequency: formData.supplyFrequency || formData.nominalFrequency || '',
      phases: (() => {
        const lct = (formData.liveCondutorType || formData.liveConductorType || '') as string;
        if (lct) {
          const map: Record<string, string> = {
            'ac-1ph-2w': '1-phase-2-wire',
            'ac-2ph-3w': '2-phase-3-wire',
            'ac-3ph-3w': '3-phase-3-wire',
            'ac-3ph-4w': '3-phase-4-wire',
          };
          return map[lct] || lct;
        }
        const p = (formData.phases || '') as string;
        if (p === 'single') return '1-phase-2-wire';
        if (p === 'three') return '3-phase-4-wire';
        return p;
      })(),
      earthing_arrangement: formData.earthingArrangement || '',
      supply_type: formData.supplyType || '',
      supply_pme: formData.supplyPME || '',
      live_conductor_type: formData.liveCondutorType || formData.liveConductorType || '',
      prospective_fault_current: formData.prospectiveFaultCurrent || '',
      external_ze: formData.externalEarthFaultLoopImpedance || formData.externalZe || '',
      supply_polarity_confirmed: formData.supplyPolarityConfirmed ?? false,
      other_sources_of_supply: formData.otherSourcesOfSupply ?? false,
      other_sources_details: formData.otherSourcesDetails || '',
      dc_supply_type: (() => {
        const dcType = (formData.dcSupplyType || formData.liveCondutorType || '') as string;
        if (dcType === 'dc-2w') return '2-wire';
        if (dcType === 'dc-3w') return '3-wire';
        return dcType;
      })(),
    },

    supply_protective_device: {
      bs_en: formData.supplyDeviceBsEn || formData.supplyProtectiveDeviceBsEn || '',
      type: formData.supplyDeviceType || formData.supplyProtectiveDeviceType || '',
      rated_current: formData.supplyDeviceRating || formData.supplyProtectiveDeviceRating || '',
    },

    main_protective_device: {
      device_type: formData.mainProtectiveDevice || formData.mainProtectiveDeviceType || '',
      main_switch_rating: formData.mainSwitchRating || formData.mainSwitchCurrentRating || '',
      main_switch_location: formData.mainSwitchLocation || '',
      breaking_capacity: formData.breakingCapacity || '',
      bs_en: formData.mainSwitchBsEn || '',
      poles: formData.mainSwitchPoles || '',
      fuse_setting: formData.mainSwitchFuseRating || '',
      voltage_rating: formData.mainSwitchVoltageRating || '',
    },

    rcd_details: {
      rcd_main_switch: formData.rcdMainSwitch || '',
      rcd_rating: formData.rcdRating || formData.mainSwitchRcdRating || '',
      rcd_type: formData.rcdType || formData.mainSwitchRcdType || '',
      rcd_operating_time: formData.rcdOperatingTime || formData.mainSwitchRcdOperatingTime || '',
      rcd_rated_time_delay: formData.rcdTimeDelay || formData.rcdRatedTimeDelay || '',
      rcd_measured_operating_time:
        formData.rcdMeasuredTime || formData.rcdMeasuredOperatingTime || '',
    },

    distribution_board: {
      board_size: formData.boardSize || '',
      board_type: formData.boardType || '',
      board_location: formData.boardLocation || '',
    },

    distribution_boards: boards.map((board, index) => ({
      db_reference: board.dbReference || board.reference || `DB${index + 1}`,
      location: board.location || '',
      board_type: board.boardType || board.type || '',
      board_make: board.make || board.boardMake || '',
      board_model: board.model || board.boardModel || '',
      total_ways: board.totalWays || board.ways || '',
      used_ways: board.usedWays || '',
      spare_ways: board.spareWays || '',
      zdb: board.zdb || '',
      ipf: board.ipf || '',
      main_switch_bs_en: board.mainSwitchBsEn || '',
      main_switch_type: board.mainSwitchType || '',
      main_switch_rating: board.mainSwitchRating || '',
      main_switch_poles: board.mainSwitchPoles || '',
      rcd_type: board.rcdType || '',
      rcd_rating: board.rcdRating || '',
      rcd_measured_time: board.rcdMeasuredTime || '',
      spd_fitted: board.spdFitted ?? false,
      spd_operational: board.spdOperationalStatus ?? board.spdOperational ?? false,
      spd_na: board.spdNA ?? false,
      polarity_confirmed: board.confirmedCorrectPolarity ?? board.polarityConfirmed ?? false,
      phase_sequence_confirmed:
        board.confirmedPhaseSequence ?? board.phaseSequenceConfirmed ?? false,
      supply_from: board.supplyFrom || 'Main',
      supply_cable_size: board.supplyCableSize || '',
      supply_cable_type: board.supplyCableType || '',
    })),

    cables: {
      intake_cable_size: formData.intakeCableSize || '',
      intake_cable_type: formData.intakeCableType || '',
      tails_size: formData.tailsSize || '',
      tails_length: formData.tailsLength || '',
    },

    earthing_bonding: {
      means_of_earthing: formData.meansOfEarthing || '',
      earth_electrode_type: formData.earthElectrodeNA ? 'N/A' : formData.earthElectrodeType || '',
      earth_electrode_location: formData.earthElectrodeNA
        ? 'N/A'
        : formData.earthElectrodeLocation || '',
      earth_electrode_resistance: formData.earthElectrodeNA
        ? 'N/A'
        : formData.earthElectrodeResistance || '',
      earth_electrode_na: formData.earthElectrodeNA ?? false,
      earthing_conductor_material: formData.earthingConductorNA
        ? 'N/A'
        : formData.earthingConductorMaterial || '',
      earthing_conductor_csa: formData.earthingConductorNA
        ? 'N/A'
        : formData.earthingConductorCsa || '',
      earthing_conductor_verified: formData.earthingConductorNA
        ? false
        : (formData.earthingConductorVerified ?? false),
      earthing_conductor_na: formData.earthingConductorNA ?? false,
      main_bonding_conductor: formData.mainBondingConductor || '',
      main_bonding_material: formData.mainBondingNA ? 'N/A' : formData.mainBondingMaterial || '',
      main_bonding_size: formData.mainBondingNA
        ? 'N/A'
        : formData.mainBondingSize || formData.mainBondingCsa || '',
      main_bonding_size_custom: formData.mainBondingSizeCustom || '',
      main_bonding_verified: formData.mainBondingNA
        ? false
        : (formData.mainBondingVerified ?? false),
      main_bonding_na: formData.mainBondingNA ?? false,
      maximum_demand: formData.maximumDemand || '',
      maximum_demand_unit: formData.maximumDemandUnit || 'A',
      bonding_water:
        bondingStr.includes('water') || formData.bondingToWater || formData.bondingWater || false,
      bonding_gas:
        bondingStr.includes('gas') || formData.bondingToGas || formData.bondingGas || false,
      bonding_oil:
        bondingStr.includes('oil') || formData.bondingToOil || formData.bondingOil || false,
      bonding_structural_steel:
        bondingStr.includes('steel') ||
        bondingStr.includes('structural') ||
        formData.bondingToStructuralSteel ||
        formData.bondingStructuralSteel ||
        false,
      bonding_lightning_protection:
        bondingStr.includes('lightning') ||
        formData.bondingToLightningProtection ||
        formData.bondingLightningProtection ||
        false,
      bonding_other:
        bondingStr.includes('telecom') ||
        bondingStr.includes('other') ||
        formData.bondingToOther ||
        formData.bondingOther ||
        false,
      bonding_other_specify: formData.bondingOtherSpecify || formData.bondingToOtherSpecify || '',
      bonding_compliance: formData.bondingCompliance || '',
      supplementary_bonding: formData.supplementaryBonding || '',
      supplementary_bonding_size: formData.supplementaryBondingSize || '',
      supplementary_bonding_size_custom: formData.supplementaryBondingSizeCustom || '',
      equipotential_bonding: formData.equipotentialBonding || '',
    },

    inspection_checklist: inspectionItems.map((item) => ({
      id: item.id || '',
      item_number: item.itemNumber || '',
      description: item.description || '',
      outcome: item.outcome || '',
      notes: item.notes || '',
    })),

    schedule_of_tests: testResults.map((test) => ({
      ...formatCircuit(test),
      // EIC-specific fallbacks not in shared formatCircuit
      type_of_wiring: (test.typeOfWiring || test.wiringType || test.cableType || 'N/A') as string,
      r2: (test.r2 || test.cpcContinuity || 'N/A') as string,
      // EIC uses null default (not 'N/A') for source_circuit_id, and passes raw polarity/rcd values
      source_circuit_id: test.sourceCircuitId ?? null,
      polarity: test.polarity || 'N/A',
      rcd_test_button: test.rcdTestButton || 'N/A',
      afdd_test: test.afddTest || 'N/A',
      db_reference:
        boardRefMap[test.boardId as string] ||
        (test.dbReference as string) ||
        (test.boardReference as string) ||
        '',
    })),

    test_instrument_details: {
      make_model: formData.testInstrumentMake || formData.customTestInstrument || '',
      serial_number: formData.testInstrumentSerial || '',
      calibration_date: formData.calibrationDate || '',
      test_temperature: formData.testTemperature || '',
    },

    test_information: {
      test_method: formData.testMethod || '',
      test_voltage: formData.testVoltage || '',
      test_notes: formData.testNotes || '',
    },

    distribution_board_verification: {
      db_reference: formData.dbReference || boards[0]?.dbReference || boards[0]?.reference || '',
      zdb: formData.zdb || boards[0]?.zdb || '',
      ipf: formData.ipf || boards[0]?.ipf || '',
      confirmed_correct_polarity:
        formData.confirmedCorrectPolarity ?? boards[0]?.confirmedCorrectPolarity ?? false,
      confirmed_phase_sequence:
        formData.confirmedPhaseSequence ?? boards[0]?.confirmedPhaseSequence ?? false,
      spd_operational_status:
        formData.spdOperationalStatus ?? boards[0]?.spdOperationalStatus ?? false,
      spd_na: formData.spdNA ?? boards[0]?.spdNA ?? false,
    },

    designer: {
      name: formData.designerName || '',
      qualifications: formData.designerQualifications || '',
      company: formData.designerCompany || '',
      address: formData.designerAddress || '',
      postcode: formData.designerPostcode || '',
      phone: formData.designerPhone || '',
      date: formData.designerDate || '',
      signature: formData.designerSignature || '',
      bs7671_amendment_date: formData.designerBs7671Date || '',
      departures: formData.designerDepartures || '',
      permitted_exceptions: formData.permittedExceptions || '',
      risk_assessment_attached: formData.riskAssessmentAttached ?? false,
    },

    designer_2: {
      name: formData.designer2Name || '',
      company: formData.designer2Company || '',
      address: formData.designer2Address || '',
      postcode: formData.designer2Postcode || '',
      phone: formData.designer2Phone || '',
      date: formData.designer2Date || '',
      signature: formData.designer2Signature || '',
    },

    constructor: {
      name: formData.constructorName || '',
      qualifications: formData.constructorQualifications || '',
      company: formData.constructorCompany || '',
      address: formData.constructorAddress || '',
      postcode: formData.constructorPostcode || '',
      phone: formData.constructorPhone || '',
      date: formData.constructorDate || '',
      signature: formData.constructorSignature || '',
      bs7671_amendment_date: formData.constructorBs7671Date || '',
      departures: formData.constructorDepartures || '',
      same_as_designer: formData.sameAsDesigner ?? false,
    },

    inspector: {
      name: formData.inspectorName || '',
      qualifications: formData.inspectorQualifications || '',
      company: formData.inspectorCompany || '',
      address: formData.inspectorAddress || '',
      postcode: formData.inspectorPostcode || '',
      phone: formData.inspectorPhone || '',
      date: formData.inspectorDate || '',
      signature: formData.inspectorSignature || '',
      bs7671_amendment_date: formData.inspectorBs7671Date || '',
      departures: formData.inspectorDepartures || '',
      same_as_constructor: formData.sameAsConstructor ?? false,
    },

    next_inspection: {
      interval_months: formData.nextInspectionInterval || '',
      recommended_date: formData.nextInspectionDate || '',
    },

    existing_installation_comments: formData.existingInstallationComments || '',

    declarations: {
      additional_notes: formData.additionalNotes || '',
      inspected_by: {
        name: formData.inspectedByName || '',
        signature: formData.inspectedBySignature || '',
        for_on_behalf_of: formData.inspectedByForOnBehalfOf || '',
        position: formData.inspectedByPosition || '',
        address: formData.inspectedByAddress || '',
        cp_scheme: formData.inspectedByCpScheme || '',
        cp_scheme_na: formData.inspectedByCpSchemeNA ?? false,
        same_as_inspector: formData.eicSameAsInspectedBy ?? false,
      },
      report_authorised_by: {
        name: formData.reportAuthorisedByName || '',
        date: formData.reportAuthorisedByDate || '',
        signature: formData.reportAuthorisedBySignature || '',
        for_on_behalf_of: formData.reportAuthorisedByForOnBehalfOf || '',
        position: formData.reportAuthorisedByPosition || '',
        address: formData.reportAuthorisedByAddress || '',
        postcode: formData.reportAuthorisedByPostcode || '',
        phone: formData.reportAuthorisedByPhone || '',
        membership_no: formData.reportAuthorisedByMembershipNo || '',
      },
      bs7671_compliance: formData.bs7671Compliance ?? false,
      building_regs_compliance: formData.buildingRegsCompliance ?? false,
      competent_person_scheme: formData.competentPersonScheme ?? false,
    },

    observations,

    company_details: {
      company_name: (cp as Record<string, unknown>).company_name || '',
      company_address: (cp as Record<string, unknown>).company_address || '',
      company_postcode: (cp as Record<string, unknown>).company_postcode || '',
      company_phone: (cp as Record<string, unknown>).company_phone || '',
      company_email: (cp as Record<string, unknown>).company_email || '',
      company_website: (cp as Record<string, unknown>).company_website || '',
      company_logo:
        (cp as Record<string, unknown>).logo_data_url ||
        (cp as Record<string, unknown>).logo_url ||
        '',
      registration_scheme: (cp as Record<string, unknown>).registration_scheme || '',
      registration_number: (cp as Record<string, unknown>).registration_number || '',
    },

    company_logo:
      (cp as Record<string, unknown>).logo_data_url ||
      (cp as Record<string, unknown>).logo_url ||
      '',
    registration_scheme_logo: (cp as Record<string, unknown>).scheme_logo_data_url || '',
    company_accent_color: (cp as Record<string, unknown>).accent_color || '',
  };

  // ── Global "render blank as N/A" post-processing ─────────────
  if (formData.renderBlankAsNA) {
    const excludeFromNA = new Set([
      'company_logo',
      'registration_scheme_logo',
      'company_accent_color',
    ]);
    const excludeSections = new Set([
      'metadata',
      'company_details',
      'observations',
      'schedule_of_tests',
      'inspection_checklist',
      'distribution_boards',
    ]);
    const excludeKeys = new Set([
      'signature',
      'name',
      'date',
      'client_name',
      'client_address',
      'address',
      'same_as_client_address',
      'same_as_designer',
      'same_as_constructor',
      'same_as_inspector',
      'supply_polarity_confirmed',
      'other_sources_of_supply',
      'spd_fitted',
      'spd_na',
      'polarity_confirmed',
      'phase_sequence_confirmed',
      'bs7671_compliance',
      'building_regs_compliance',
      'competent_person_scheme',
      'cp_scheme_na',
      'earth_electrode_na',
      'earthing_conductor_na',
      'main_bonding_na',
      'earthing_conductor_verified',
      'main_bonding_verified',
      'risk_assessment_attached',
    ]);

    const fillBlanks = (obj: Record<string, unknown>, sectionKey?: string) => {
      if (excludeSections.has(sectionKey || '')) return;
      for (const key of Object.keys(obj)) {
        if (excludeFromNA.has(key) || excludeKeys.has(key)) continue;
        const val = obj[key];
        if (val === '') {
          obj[key] = 'N/A';
        } else if (val && typeof val === 'object' && !Array.isArray(val)) {
          fillBlanks(val as Record<string, unknown>, key);
        }
      }
    };

    fillBlanks(json);
  }

  return json;
}
