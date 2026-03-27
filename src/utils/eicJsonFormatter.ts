/**
 * EIC JSON Formatter
 * Shared utility that transforms EIC form data into the JSON payload
 * expected by the PDFMonkey EIC Liquid template (B39538E9-8FF1-4882-BC13-70B1C0D30947).
 *
 * Field names here MUST match the template variables exactly.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from '@/integrations/supabase/client';
import type { EICPayload } from '@/types/eic-payload';

/* ------------------------------------------------------------------ */
/*  Normalise pass/fail/N/A values for PDFMonkey Liquid conditionals   */
/* ------------------------------------------------------------------ */

function normaliseTestResult(value: string | undefined): string {
  if (!value) return 'N/A';
  const v = value.trim();
  if (v === '✓' || v.toLowerCase() === 'pass' || v.toLowerCase() === 'yes' || v === 'Y')
    return 'Pass';
  if (v === '✗' || v.toLowerCase() === 'fail' || v.toLowerCase() === 'no' || v === 'N')
    return 'Fail';
  if (v.toLowerCase() === 'n/a' || v === '') return 'N/A';
  return v;
}

/* ------------------------------------------------------------------ */
/*  Observations with photo evidence                                   */
/* ------------------------------------------------------------------ */

async function formatObservationsWithPhotos(observations: any[], reportId: string): Promise<any[]> {
  let photos: any[] | null = null;

  try {
    // report_id in inspection_photos is a UUID — look it up from the text report_id
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('id')
      .eq('report_id', reportId)
      .maybeSingle();

    if (reportError) {
      console.error('[EIC PDF] Failed to look up report UUID:', reportError.message);
    } else if (report?.id) {
      const { data: photoData, error: photosError } = await supabase
        .from('inspection_photos')
        .select('*')
        .eq('report_id', report.id);

      if (photosError) {
        console.error('[EIC PDF] inspection_photos query failed:', photosError.message);
      } else {
        photos = photoData;
      }
    }
  } catch (err) {
    console.error('[EIC PDF] Error fetching photos:', err);
  }

  return observations.map((obs: any) => {
    const observationPhotos = photos?.filter((p) => p.observation_id === obs.id) || [];

    const photoUrls = observationPhotos.map((photo) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from('inspection-photos').getPublicUrl(photo.file_path);
      return publicUrl;
    });

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
}

/* ------------------------------------------------------------------ */
/*  Main formatter                                                     */
/* ------------------------------------------------------------------ */

export async function formatEicJson(
  formData: any,
  companyProfile: any,
  reportId: string
): Promise<EICPayload> {
  // --- Flat inspection keys at ROOT level (template uses insp_1 … insp_14) ---
  const flatInspectionKeys: Record<string, string> = {};
  const inspectionItems = formData.inspectionItems || Object.values(formData.inspections || {});

  for (let i = 1; i <= 14; i++) {
    const item = inspectionItems.find(
      (it: any) =>
        it?.itemNumber === String(i) ||
        it?.itemNumber === i ||
        it?.id === `eic_${i}` ||
        it?.id === String(i)
    );
    const outcome = item?.outcome || '';

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

  // --- Bonding checkbox booleans from mainBondingLocations string ---
  const bondingStr = (formData.mainBondingLocations || '').toLowerCase();

  // --- Board-ID → reference lookup for circuit schedule ---
  const boardRefMap: Record<string, string> = {};
  (formData.distributionBoards || []).forEach((board: any) => {
    boardRefMap[board.id] = board.reference || board.name || board.dbReference || '';
  });

  const json: any = {
    // Flat inspection keys at root
    ...flatInspectionKeys,

    metadata: {
      certificate_number: formData.certificateNumber || '',
    },

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
        const liveConductorType = formData.liveCondutorType || formData.liveConductorType || '';
        if (liveConductorType) {
          const typeMap: Record<string, string> = {
            'ac-1ph-2w': '1-phase-2-wire',
            'ac-2ph-3w': '2-phase-3-wire',
            'ac-3ph-3w': '3-phase-3-wire',
            'ac-3ph-4w': '3-phase-4-wire',
          };
          return typeMap[liveConductorType] || liveConductorType;
        }
        const phases = formData.phases || '';
        if (phases === 'single') return '1-phase-2-wire';
        if (phases === 'three') return '3-phase-4-wire';
        return phases;
      })(),
      earthing_arrangement: formData.earthingArrangement || '',
      supply_type: formData.supplyType || '',
      supply_pme: formData.supplyPME || '',
      live_conductor_type: formData.liveCondutorType || formData.liveConductorType || '',
      dc_supply_type: (() => {
        const dcType = formData.dcSupplyType || formData.liveCondutorType || '';
        if (dcType === 'dc-2w') return '2-wire';
        if (dcType === 'dc-3w') return '3-wire';
        return dcType;
      })(),
      prospective_fault_current: formData.prospectiveFaultCurrent || '',
      external_ze: formData.externalEarthFaultLoopImpedance || formData.externalZe || '',
      supply_polarity_confirmed: formData.supplyPolarityConfirmed ?? false,
      other_sources_of_supply: formData.otherSourcesOfSupply ?? false,
      other_sources_details: formData.otherSourcesDetails || '',
    },

    supply_protective_device: {
      bs_en: formData.supplyDeviceBsEn || formData.supplyProtectiveDeviceBsEn || 'N/A',
      type: formData.supplyDeviceType || formData.supplyProtectiveDeviceType || 'N/A',
      rated_current: formData.supplyDeviceRating || formData.supplyProtectiveDeviceRating || 'N/A',
    },

    main_protective_device: {
      device_type: formData.mainProtectiveDevice || formData.mainProtectiveDeviceType || 'N/A',
      main_switch_rating: formData.mainSwitchRating || formData.mainSwitchCurrentRating || 'N/A',
      main_switch_location: formData.mainSwitchLocation || 'N/A',
      breaking_capacity: formData.breakingCapacity || 'N/A',
      bs_en: formData.mainSwitchBsEn || 'N/A',
      poles: formData.mainSwitchPoles || 'N/A',
      fuse_setting: formData.mainSwitchFuseRating || 'N/A',
      voltage_rating: formData.mainSwitchVoltageRating || 'N/A',
    },

    rcd_details: {
      rcd_main_switch: formData.rcdMainSwitch || '',
      rcd_rating: formData.rcdRating || formData.mainSwitchRcdRating || 'N/A',
      rcd_type: formData.rcdType || formData.mainSwitchRcdType || 'N/A',
      rcd_operating_time: formData.rcdOperatingTime || formData.mainSwitchRcdOperatingTime || 'N/A',
      rcd_rated_time_delay: formData.rcdTimeDelay || formData.rcdRatedTimeDelay || 'N/A',
      rcd_measured_operating_time:
        formData.rcdMeasuredTime || formData.rcdMeasuredOperatingTime || 'N/A',
    },

    distribution_board: {
      board_size: formData.boardSize || '',
      board_type: formData.boardType || '',
      board_location: formData.boardLocation || '',
    },

    // Multi-board array — SPD simplified to operational + N/A (no T1/T2/T3)
    distribution_boards: (formData.distributionBoards || []).map((board: any, index: number) => ({
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
      earth_electrode_location:
        formData.earthElectrodeNA || formData.earthElectrodeType === 'pme'
          ? 'N/A'
          : formData.earthElectrodeLocation || '',
      earth_electrode_resistance:
        formData.earthElectrodeNA || formData.earthElectrodeType === 'pme'
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

    inspection_checklist:
      (formData.inspectionItems || Object.values(formData.inspections || {}))?.map((item: any) => ({
        id: item.id || '',
        item_number: item.itemNumber || '',
        description: item.description || '',
        outcome: item.outcome || '',
        notes: item.notes || '',
      })) || [],

    schedule_of_tests:
      formData.scheduleOfTests?.map((test: any) => ({
        id: test.id || 'N/A',
        circuit_number: test.circuitNumber || 'N/A',
        circuit_description: test.circuitDescription || 'N/A',
        circuit_type: test.circuitType || 'N/A',
        type_of_wiring: test.typeOfWiring || test.wiringType || test.cableType || 'N/A',
        reference_method: test.referenceMethod || 'N/A',
        live_size: test.liveSize || 'N/A',
        cpc_size: test.cpcSize || 'N/A',
        protective_device_type: test.protectiveDeviceType || 'N/A',
        protective_device_curve: test.protectiveDeviceCurve || 'N/A',
        protective_device_rating: test.protectiveDeviceRating || 'N/A',
        protective_device_ka_rating: test.protectiveDeviceKaRating || 'N/A',
        protective_device_location: test.protectiveDeviceLocation || 'N/A',
        bs_standard: test.bsStandard || 'N/A',
        r1r2: test.r1r2 || 'N/A',
        r2: test.r2 || test.cpcContinuity || 'N/A',
        ring_continuity_live: test.ringContinuityLive || 'N/A',
        ring_continuity_neutral: test.ringContinuityNeutral || 'N/A',
        ring_r1: test.ringR1 || 'N/A',
        ring_rn: test.ringRn || 'N/A',
        ring_r2: test.ringR2 || 'N/A',
        insulation_test_voltage: test.insulationTestVoltage || 'N/A',
        insulation_resistance: test.insulationResistance || 'N/A',
        insulation_live_neutral: test.insulationLiveNeutral || 'N/A',
        insulation_live_earth: test.insulationLiveEarth || 'N/A',
        insulation_neutral_earth: test.insulationNeutralEarth || 'N/A',
        polarity: test.polarity || 'N/A',
        zs: test.zs || 'N/A',
        max_zs: test.maxZs || 'N/A',
        points_served: test.pointsServed || 'N/A',
        rcd_rating: test.rcdRating || 'N/A',
        rcd_bs_standard: test.rcdBsStandard || 'N/A',
        rcd_type: test.rcdType || 'N/A',
        rcd_rating_a: test.rcdRatingA || 'N/A',
        rcd_one_x: test.rcdOneX || 'N/A',
        rcd_half_x: test.rcdHalfX || 'N/A',
        rcd_five_x: test.rcdFiveX || 'N/A',
        rcd_test_button: normaliseTestResult(test.rcdTestButton),
        afdd_test: normaliseTestResult(test.afddTest),
        pfc: test.pfc || 'N/A',
        pfc_live_neutral: test.pfcLiveNeutral || 'N/A',
        pfc_live_earth: test.pfcLiveEarth || 'N/A',
        functional_testing: normaliseTestResult(test.functionalTesting),
        notes: test.notes || 'N/A',
        phase_type: test.phaseType || 'N/A',
        phase_rotation: test.phaseRotation || 'N/A',
        phase_balance_l1: test.phaseBalanceL1 || 'N/A',
        phase_balance_l2: test.phaseBalanceL2 || 'N/A',
        phase_balance_l3: test.phaseBalanceL3 || 'N/A',
        line_to_line_voltage: test.lineToLineVoltage || 'N/A',
        db_reference:
          boardRefMap[test.boardId] ||
          test.dbReference ||
          test.boardReference ||
          formData.distributionBoards?.[0]?.dbReference ||
          formData.distributionBoards?.[0]?.reference ||
          'DB1',
        source_circuit_id: test.sourceCircuitId ?? null,
        auto_filled: test.autoFilled ?? false,
      })) || [],

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

    // SPD simplified — no T1/T2/T3, just operational + N/A
    distribution_board_verification: {
      db_reference:
        formData.dbReference ||
        formData.distributionBoards?.[0]?.dbReference ||
        formData.distributionBoards?.[0]?.reference ||
        '',
      zdb: formData.zdb || formData.distributionBoards?.[0]?.zdb || '',
      ipf: formData.ipf || formData.distributionBoards?.[0]?.ipf || '',
      confirmed_correct_polarity:
        formData.confirmedCorrectPolarity ??
        formData.distributionBoards?.[0]?.confirmedCorrectPolarity ??
        false,
      confirmed_phase_sequence:
        formData.confirmedPhaseSequence ??
        formData.distributionBoards?.[0]?.confirmedPhaseSequence ??
        false,
      spd_operational_status:
        formData.spdOperationalStatus ??
        formData.distributionBoards?.[0]?.spdOperationalStatus ??
        false,
      spd_na: formData.spdNA ?? formData.distributionBoards?.[0]?.spdNA ?? false,
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

    observations: await formatObservationsWithPhotos(formData.observations || [], reportId),

    // Company branding (nested for template sections that use company_details.*)
    company_details: {
      company_name: companyProfile?.company_name || '',
      company_tagline: companyProfile?.company_tagline || '',
      company_address: companyProfile?.company_address || '',
      company_postcode: companyProfile?.company_postcode || '',
      company_phone: companyProfile?.company_phone || '',
      company_email: companyProfile?.company_email || '',
      company_website: companyProfile?.company_website || '',
      company_logo: companyProfile?.logo_data_url || companyProfile?.logo_url || '',
      company_accent_color: companyProfile?.accent_color || '',
      registration_scheme: companyProfile?.registration_scheme || '',
      registration_number: companyProfile?.registration_number || '',
    },

    // Root-level logo fields (template checks these at root)
    company_logo: companyProfile?.logo_data_url || companyProfile?.logo_url || '',
    registration_scheme_logo: companyProfile?.scheme_logo_data_url || '',

    // Accent colour for PDF theming (CSS --accent-color variable)
    company_accent_color: companyProfile?.accent_color || '',
  };

  // --- Global "render blank as N/A" post-processing ---
  if (formData.renderBlankAsNA) {
    // Keys that should NEVER be replaced with N/A (required fields, branding, booleans, signatures)
    const excludeFromNA = new Set([
      // Top-level non-form keys
      'company_logo',
      'registration_scheme_logo',
      'company_accent_color',
    ]);

    // Sections that should never be N/A-filled
    const excludeSections = new Set([
      'metadata',
      'company_details',
      'observations',
      'schedule_of_tests',
      'inspection_checklist',
      'distribution_boards',
    ]);

    // Keys within sections to skip (signatures, required identifiers, booleans)
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

    const fillBlanks = (obj: any, sectionKey?: string) => {
      if (excludeSections.has(sectionKey || '')) return;
      for (const key of Object.keys(obj)) {
        if (excludeFromNA.has(key) || excludeKeys.has(key)) continue;
        const val = obj[key];
        if (val === '') {
          obj[key] = 'N/A';
        } else if (val && typeof val === 'object' && !Array.isArray(val)) {
          fillBlanks(val, key);
        }
      }
    };

    fillBlanks(json);
  }

  return json;
}
