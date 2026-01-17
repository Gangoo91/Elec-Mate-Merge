/**
 * Formats EICR form data into a structured JSON format with logical groupings
 * All keys are in snake_case, missing values default to empty strings
 */

import { supabase } from '@/integrations/supabase/client';

const toSnakeCase = (str: string): string => 
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const convertToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertToSnakeCase);
  }
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toSnakeCase(key),
        value == null ? "" : convertToSnakeCase(value)
      ])
    );
  }
  return obj == null ? "" : obj;
};

export const formatEICRJson = async (formData: any, reportId: string) => {
  // Helper to safely get values and ensure they're strings
  const get = (key: string, defaultValue: any = "") => {
    const value = formData[key] ?? defaultValue;
    if (value === null || value === undefined) {
      console.warn(`[formatEICRJson] Field "${key}" is missing or undefined in formData`);
      return "";
    }
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  // Defensive validation for critical fields
  const criticalFields = ['clientName', 'installationAddress', 'inspectorName'];
  criticalFields.forEach(field => {
    if (!formData[field] || formData[field] === '') {
      console.error(`[formatEICRJson] CRITICAL: "${field}" is missing from formData`);
    }
  });

  console.log('[formatEICRJson] Input formData keys:', Object.keys(formData));
  console.log('[formatEICRJson] Critical fields check:', {
    clientName: formData.clientName || 'MISSING',
    installationAddress: formData.installationAddress || 'MISSING',
    inspectorName: formData.inspectorName || 'MISSING'
  });

  // Format inspection items as flat array for checklist
  const formatInspectionItems = () => {
    // Get raw value directly - don't use get() which stringifies objects
    const rawItems = formData['inspectionItems'];
    console.log('[formatInspectionItems] >>> RAW inspectionItems:', {
      type: typeof rawItems,
      isArray: Array.isArray(rawItems),
      length: Array.isArray(rawItems) ? rawItems.length : 'N/A'
    });

    let parsed;
    try {
      parsed = typeof rawItems === 'string' ? JSON.parse(rawItems) : rawItems;
    } catch (e) {
      console.error('[formatInspectionItems] Failed to parse inspectionItems:', e);
      return [];
    }

    if (!Array.isArray(parsed)) {
      console.warn('[formatInspectionItems] parsed is NOT an array:', typeof parsed);
      return [];
    }

    console.log('[formatInspectionItems] Parsed array length:', parsed.length);
    if (parsed.length > 0) {
      console.log('[formatInspectionItems] First item sample:', JSON.stringify(parsed[0]));
      console.log('[formatInspectionItems] Outcomes sample:', parsed.slice(0, 5).map((i: any) => i.outcome));
    }

    const result = parsed.map((item: any) => {
      const outcome = item.outcome || "";
      const itemNumber = item.itemNumber || item.number || "";

      // Pre-format columns so template doesn't need conditionals
      // Get section number for section header detection
      const sectionNum = itemNumber.split('.')[0];

      return {
        id: item.id || "",
        item_number: itemNumber,
        description: item.item || item.description || "",
        outcome: outcome,
        clause: item.clause || "",
        notes: item.notes || "",
        section_num: sectionNum,
        // Pre-formatted outcome columns - no conditionals needed in template
        col_acc: outcome === "satisfactory" ? "✓" : "",
        col_na: outcome === "not-applicable" || outcome === "N/A" ? "✓" : "",
        col_c1c2: outcome === "C1" ? "C1" : (outcome === "C2" ? "C2" : ""),
        col_c3: outcome === "C3" ? "✓" : "",
        col_nv: outcome === "not-verified" || outcome === "N/V" ? "✓" : "",
        col_lim: outcome === "limitation" || outcome === "LIM" ? "✓" : ""
      };
    });

    console.log('[formatInspectionItems] >>> RESULT:', result.length, 'items');
    if (result.length > 0) {
      console.log('[formatInspectionItems] First formatted item:', JSON.stringify(result[0]));
    }
    return result;
  };

  // Format inspection items as FLAT keys at root level (no nested objects)
  // Returns object like { insp_1_0_acc: "✓", insp_1_0_na: "", insp_3_5_c1c2: "C1", ... }
  const formatFlatInspection = () => {
    // Hardcoded lookup map: item id -> item number (from BS7671 checklist)
    const itemNumberLookup: Record<string, string> = {
      'item_1_0': '1.0', 'item_1_1': '1.1', 'item_1_2': '1.2',
      'item_2_0': '2.0',
      'item_3_1': '3.1', 'item_3_2': '3.2', 'item_3_3': '3.3', 'item_3_4': '3.4', 'item_3_5': '3.5',
      'item_3_6': '3.6', 'item_3_7': '3.7', 'item_3_8': '3.8', 'item_3_9': '3.9',
      'item_4_1': '4.1', 'item_4_2': '4.2', 'item_4_3': '4.3', 'item_4_4': '4.4', 'item_4_5': '4.5',
      'item_4_6': '4.6', 'item_4_7': '4.7', 'item_4_8': '4.8', 'item_4_9': '4.9', 'item_4_10': '4.10',
      'item_4_11': '4.11', 'item_4_12': '4.12', 'item_4_13': '4.13', 'item_4_14': '4.14', 'item_4_15': '4.15',
      'item_4_16': '4.16', 'item_4_17': '4.17', 'item_4_18': '4.18', 'item_4_19': '4.19', 'item_4_20': '4.20',
      'item_4_21': '4.21', 'item_4_22': '4.22', 'item_4_23': '4.23', 'item_4_24': '4.24', 'item_4_25': '4.25',
      'item_5_1': '5.1', 'item_5_2': '5.2', 'item_5_3': '5.3', 'item_5_4': '5.4', 'item_5_5': '5.5',
      'item_5_6': '5.6', 'item_5_7': '5.7', 'item_5_8': '5.8', 'item_5_9': '5.9', 'item_5_10': '5.10',
      'item_5_11': '5.11', 'item_5_12': '5.12', 'item_5_13': '5.13', 'item_5_14': '5.14', 'item_5_15': '5.15',
      'item_5_16': '5.16', 'item_5_17': '5.17', 'item_5_18': '5.18', 'item_5_19': '5.19', 'item_5_20': '5.20',
      'item_5_21': '5.21', 'item_5_22': '5.22', 'item_5_23': '5.23',
      'item_6_1': '6.1', 'item_6_2': '6.2', 'item_6_3': '6.3', 'item_6_4': '6.4', 'item_6_5': '6.5',
      'item_6_6': '6.6', 'item_6_7': '6.7', 'item_6_8': '6.8', 'item_6_9': '6.9', 'item_6_10': '6.10',
      'item_6_11': '6.11', 'item_6_12': '6.12', 'item_6_13': '6.13',
      'item_7_1': '7.1', 'item_7_2': '7.2', 'item_7_3': '7.3',
      'item_8_1': '8.1', 'item_8_2': '8.2', 'item_8_3': '8.3', 'item_8_4': '8.4'
    };

    const rawItems = formData['inspectionItems'];
    let parsed;
    try {
      parsed = typeof rawItems === 'string' ? JSON.parse(rawItems) : rawItems;
    } catch (e) {
      console.error('[formatFlatInspection] Failed to parse:', e);
      return {};
    }
    if (!Array.isArray(parsed)) {
      console.warn('[formatFlatInspection] Not an array, returning empty');
      return {};
    }

    console.log('[formatFlatInspection] Processing', parsed.length, 'items');

    const result: Record<string, string> = {};

    parsed.forEach((item: any) => {
      const outcome = item.outcome || "";
      // Use lookup map as primary source, fall back to item properties
      const itemNumber = itemNumberLookup[item.id] || item.itemNumber || item.number || "";
      if (!itemNumber) return;

      // Convert "1.0" to "1_0" for key prefix
      const prefix = "insp_" + itemNumber.replace(/\./g, "_");

      // Create flat keys for each outcome column
      // Use simple "Y" text - PDFMonkey can't handle Unicode/HTML entities reliably
      result[`${prefix}_acc`] = outcome === "satisfactory" ? "Y" : "";
      result[`${prefix}_na`] = outcome === "not-applicable" || outcome === "N/A" ? "Y" : "";
      result[`${prefix}_c1c2`] = outcome === "C1" ? "C1" : (outcome === "C2" ? "C2" : "");
      result[`${prefix}_c3`] = outcome === "C3" ? "Y" : "";
      result[`${prefix}_nv`] = outcome === "not-verified" || outcome === "N/V" ? "Y" : "";
      result[`${prefix}_lim`] = outcome === "limitation" || outcome === "LIM" ? "Y" : "";
    });

    console.log('[formatFlatInspection] Created', Object.keys(result).length, 'flat keys');
    return result;
  };

  // Format inspection items grouped by section for PDF template
  const formatInspectionItemsBySections = () => {
    const items = get('inspectionItems', []);
    let parsed;
    try {
      parsed = typeof items === 'string' ? JSON.parse(items) : items;
    } catch (e) {
      console.error('[formatEICRJson] Failed to parse inspectionItems:', e);
      return [];
    }
    if (!Array.isArray(parsed)) return [];

    // Group items by section
    const sectionMap: Record<string, { section_name: string; clause: string; items: any[] }> = {};

    parsed.forEach((item: any) => {
      const sectionName = item.section || 'General';
      if (!sectionMap[sectionName]) {
        sectionMap[sectionName] = {
          section_name: sectionName,
          clause: item.clause || '',
          items: []
        };
      }
      sectionMap[sectionName].items.push({
        id: item.id || "",
        item_number: item.itemNumber || item.number || "",
        item: item.item || item.description || "",
        clause: item.clause || "",
        outcome: item.outcome || "",
        notes: item.notes || ""
      });
    });

    return Object.values(sectionMap);
  };

  // Format additional distribution boards
  const formatAdditionalBoards = () => {
    const boards = formData['distributionBoards'] || [];
    if (!Array.isArray(boards) || boards.length <= 1) return [];

    // Skip the first board (main board) and return the rest
    return boards.slice(1).map((board: any) => ({
      designation: board.designation || board.boardDesignation || '',
      location: board.location || board.boardLocation || '',
      manufacturer: board.manufacturer || board.boardManufacturer || '',
      board_type: board.boardType || board.cuType || '',
      ways: board.ways || board.numberOfWays || '',
      zdb: board.zdb || '',
      ipf: board.ipf || ''
    }));
  };

  // Format circuits/test results
  const formatCircuits = () => {
    const testResults = formData['scheduleOfTests'] || [];
    if (!Array.isArray(testResults)) return [];
    
    return testResults.map((result: any) => ({
      id: result.id || "N/A",
      circuit_number: result.circuitNumber || "N/A",
      circuit_description: result.circuitDescription || "N/A",
      circuit_type: result.circuitType || "N/A",
      type_of_wiring: result.typeOfWiring || "N/A",
      reference_method: result.referenceMethod || "N/A",
      points_served: result.pointsServed || "N/A",
      live_size: result.liveSize || "N/A",
      cpc_size: result.cpcSize || "N/A",
      bs_standard: result.bsStandard || "N/A",
      protective_device_type: result.protectiveDeviceType || "N/A",
      protective_device_curve: result.protectiveDeviceCurve || "N/A",
      protective_device_rating: result.protectiveDeviceRating || "N/A",
      protective_device_ka_rating: result.protectiveDeviceKaRating || "N/A",
      max_zs: result.maxZs || "N/A",
      protective_device_location: result.protectiveDeviceLocation || "N/A",
      rcd_bs_standard: result.rcdBsStandard || "N/A",
      rcd_type: result.rcdType || "N/A",
      rcd_rating: result.rcdRating || "N/A",
      rcd_rating_a: result.rcdRatingA || "N/A",
      ring_r1: result.ringR1 || "N/A",
      ring_rn: result.ringRn || "N/A",
      ring_r2: result.ringR2 || "N/A",
      r1r2: result.r1r2 || "N/A",
      r2: result.r2 || "N/A",
      ring_continuity_live: result.ringContinuityLive || "N/A",
      ring_continuity_neutral: result.ringContinuityNeutral || "N/A",
      insulation_test_voltage: result.insulationTestVoltage || "N/A",
      insulation_live_neutral: result.insulationLiveNeutral || "N/A",
      insulation_live_earth: result.insulationLiveEarth || "N/A",
      insulation_resistance: result.insulationResistance || "N/A",
      insulation_neutral_earth: result.insulationNeutralEarth || "N/A",
      polarity: result.polarity || "N/A",
      zs: result.zs || "N/A",
      rcd_one_x: result.rcdOneX || "N/A",
      rcd_test_button: result.rcdTestButton || "N/A",
      afdd_test: result.afddTest || "N/A",
      rcd_half_x: result.rcdHalfX || "N/A",
      rcd_five_x: result.rcdFiveX || "N/A",
      pfc: result.pfc || "N/A",
      pfc_live_neutral: result.pfcLiveNeutral || "N/A",
      pfc_live_earth: result.pfcLiveEarth || "N/A",
      functional_testing: result.functionalTesting || "N/A",
      notes: result.notes || "N/A",
      source_circuit_id: result.sourceCircuitId || "N/A",
      auto_filled: result.autoFilled || false,
      phase_type: result.phaseType || "N/A",
      phase_rotation: result.phaseRotation || "N/A",
      phase_balance_l1: result.phaseBalanceL1 || "N/A",
      phase_balance_l2: result.phaseBalanceL2 || "N/A",
      phase_balance_l3: result.phaseBalanceL3 || "N/A",
      line_to_line_voltage: result.lineToLineVoltage || "N/A",
      circuit_designation: result.circuitDesignation || "N/A",
      type: result.type || "N/A",
      cable_size: result.cableSize || "N/A",
      protective_device: result.protectiveDevice || "N/A"
    }));
  };

  // Format circuits planning data (design/planning section)
  const formatCircuitsPlanning = () => {
    const circuits = formData['circuits'] || [];
    if (!Array.isArray(circuits)) return [];
    
    return circuits.map((circuit: any) => ({
      id: circuit.id || "",
      circuit_number: circuit.circuitNumber || "",
      cable_size: circuit.cableSize || "",
      cable_type: circuit.cableType || "",
      protective_device_rating: circuit.protectiveDeviceRating || "",
      circuit_description: circuit.circuitDescription || ""
    }));
  };

  // Format defect observations with photo evidence from database
  const formatDefects = async () => {
    const defects = formData['defectObservations'] || [];
    if (!Array.isArray(defects)) return [];
    
    // Resolve the UUID - reportId might be either reports.id (UUID) or reports.report_id (text)
    let reportUuid = reportId;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!uuidRegex.test(reportId)) {
      // reportId is the text report_id field, need to fetch the UUID
      console.log('[formatDefects] Resolving UUID for report_id:', reportId);
      const { data: report } = await supabase
        .from('reports')
        .select('id')
        .eq('report_id', reportId)
        .is('deleted_at', null)
        .single();

      if (report?.id) {
        reportUuid = report.id;
        console.log('[formatDefects] Resolved UUID:', reportUuid);
      } else {
        console.warn('[formatDefects] Could not resolve report UUID for:', reportId, '- photos will not be loaded');
      }
    }

    // Fetch all photos for this report using the UUID (only if we have a valid UUID)
    let photos: any[] = [];
    if (uuidRegex.test(reportUuid)) {
      const { data, error } = await supabase
        .from('inspection_photos')
        .select('*')
        .eq('report_id', reportUuid);

      if (error) {
        console.error('[formatDefects] Error fetching photos:', error);
      } else {
        photos = data || [];
        console.log('[formatDefects] Found', photos.length, 'photos for report UUID:', reportUuid);
      }
    } else {
      console.log('[formatDefects] Skipping photo fetch - no valid UUID');
    }
    
    return defects.map((defect: any) => {
      // Find photos linked to this observation by observation_id OR item_id (fallback)
      const observationPhotos = photos?.filter(p => 
        p.observation_id === defect.id || 
        (defect.inspectionItemId && p.item_id === defect.inspectionItemId)
      ) || [];
      
      // Get public URLs for the photos
      const photoUrls = observationPhotos.map(photo => {
        const { data: { publicUrl } } = supabase.storage
          .from('inspection-photos')
          .getPublicUrl(photo.file_path);
        return publicUrl;
      });
      
      return {
        id: defect.id || "",
        item: defect.item || "",
        defect_code: defect.defectCode || "",
        description: defect.description || "",
        recommendation: defect.recommendation || "",
        regulation: defect.regulation || defect.clause || "",
        rectified: defect.rectified || false,
        photo_evidence: photoUrls,
        photo_count: photoUrls.length
      };
    });
  };

  // Helper to convert string booleans to actual booleans
  const getBool = (key: string, defaultValue: boolean = false): boolean => {
    const value = formData[key];
    if (value === true || value === 'true' || value === 'yes') return true;
    if (value === false || value === 'false' || value === 'no') return false;
    return defaultValue;
  };

  // NESTED, GROUPED structure for improved organization
  // Put flat inspection keys FIRST to avoid truncation issues
  const flatKeys = formatFlatInspection();
  console.log('[formatEICRJson] Flat keys object has', Object.keys(flatKeys).length, 'keys');
  console.log('[formatEICRJson] Sample flat key insp_1_0_acc:', flatKeys['insp_1_0_acc']);

  return {
    // Spread flat keys at the TOP of the object
    ...flatKeys,

    metadata: {
      certificate_number: get('reportReference') || get('certificateNumber'),
      form_version: '1.0',
      export_timestamp: new Date().toISOString()
    },

    client_details: {
      client_name: get('clientName'),
      client_address: get('clientAddress'),
      client_phone: get('clientPhone'),
      client_email: get('clientEmail')
    },
    
    installation_details: {
      address: get('installationAddress'),
      same_as_client_address: getBool('sameAsClientAddress'),
      installation_type: get('installationType'),
      description: get('description'),
      installation_date: get('installationDate'),
      test_date: get('inspectionDate'),
      construction_date: get('constructionDate'),
      estimated_age: get('estimatedAge'),
      age_unit: get('ageUnit'),
      last_inspection_type: get('lastInspectionType'),
      date_of_last_inspection: get('dateOfLastInspection'),
      evidence_of_alterations: get('evidenceOfAlterations'),
      alterations_details: get('alterationsDetails'),
      purpose_of_inspection: get('purposeOfInspection'),
      other_purpose: get('otherPurpose'),
      extent_of_inspection: get('extentOfInspection'),
      limitations_of_inspection: get('limitationsOfInspection'),
      next_inspection_date: get('nextInspectionDate'),
      inspection_interval: get('inspectionInterval')
    },
    
    standards_compliance: {
      design_standard: get('designStandard', 'BS7671'),
      part_p_compliance: get('partPCompliance')
    },
    
    supply_characteristics: {
      supply_voltage: get('supplyVoltageCustom') || get('supplyVoltage'),
      supply_frequency: get('supplyFrequency', '50'),
      phases: get('phases'),
      earthing_arrangement: get('earthingArrangement'),
      supply_type: get('supplyType'),
      supply_pme: get('supplyPME'),
      dno_name: get('dnoName'),
      mpan: get('mpan'),
      cutout_location: get('cutoutLocation'),
      service_entry: get('serviceEntry')
    },
    
    main_protective_device: {
      device_type: get('mainProtectiveDeviceCustom') || get('mainProtectiveDevice'),
      main_switch_rating: get('mainSwitchRating'),
      main_switch_location: get('cuLocation'),
      breaking_capacity: get('breakingCapacity')
    },
    
    rcd_details: {
      rcd_main_switch: get('rcdMainSwitch'),
      rcd_rating: get('rcdRating'),
      rcd_type: get('rcdType')
    },
    
    distribution_board: {
      board_designation: get('boardDesignation', 'Main DB'),
      board_size: get('boardSize'),
      board_type: get('cuType'),
      board_location: get('cuLocation'),
      board_manufacturer: get('cuManufacturer'),
      board_ways: get('cuNumberOfWays')
    },
    
    cables: {
      intake_cable_size: get('intakeCableSize'),
      intake_cable_type: get('intakeCableType'),
      tails_size: get('tailsSize'),
      tails_length: get('tailsLength')
    },
    
    earthing_bonding: {
      earth_electrode_type: get('earthElectrodeType'),
      earth_electrode_resistance: get('earthElectrodeResistance'),
      main_earthing_conductor_type: get('mainEarthingConductorType'),
      main_earthing_conductor_size: get('mainEarthingConductorSizeCustom') || get('mainEarthingConductorSize'),
      main_earthing_conductor: (() => {
        const size = get('mainEarthingConductorSizeCustom') || get('mainEarthingConductorSize');
        const type = get('mainEarthingConductorType');
        if (size && type) return `${size}mm² ${type}`;
        if (size) return `${size}mm²`;
        return '';
      })(),
      main_bonding_conductor_type: get('mainBondingConductorType'),
      main_bonding_conductor: (() => {
        const size = get('mainBondingSizeCustom') || get('mainBondingSize');
        const type = get('mainBondingConductorType');
        if (size && type) return `${size}mm² ${type}`;
        if (size) return `${size}mm²`;
        return '';
      })(),
      main_bonding_size: get('mainBondingSizeCustom') || get('mainBondingSize'),
      main_bonding_size_custom: get('mainBondingSizeCustom'),
      main_bonding_locations: get('mainBondingLocations'),
      bonding_compliance: get('bondingCompliance'),
      supplementary_bonding: get('supplementaryBonding'),
      supplementary_bonding_size: get('supplementaryBondingSizeCustom') || get('supplementaryBondingSize'),
      supplementary_bonding_size_custom: get('supplementaryBondingSizeCustom'),
      equipotential_bonding: get('equipotentialBonding')
    },
    
    inspection_checklist: formatInspectionItems(),

    // Flat inspection keys already spread at TOP of return object

    // Inspection items grouped by section for PDF template
    inspection_items: formatInspectionItemsBySections(),

    // Additional distribution boards (beyond the main board)
    additional_boards: formatAdditionalBoards(),

    schedule_of_tests: formatCircuits(),
    
    test_instrument_details: {
      make_model: get('testInstrumentMake') === 'Other' 
        ? get('customTestInstrument') 
        : get('testInstrumentMake'),
      serial_number: get('testInstrumentSerial'),
      calibration_date: get('calibrationDate'),
      test_temperature: get('testTemperature')
    },
    
    test_information: {
      test_method: get('testMethod'),
      test_voltage: get('testVoltage'),
      test_notes: get('testNotes')
    },
    
    distribution_board_verification: {
      db_reference: get('dbReference'),
      zdb: get('zdb'),
      ipf: get('ipf'),
      confirmed_correct_polarity: getBool('confirmedCorrectPolarity'),
      confirmed_phase_sequence: getBool('confirmedPhaseSequence'),
      spd_operational_status: getBool('spdOperationalStatus'),
      spd_na: getBool('spdNA')
    },
    
    designer: {
      name: get('designerName'),
      qualifications: get('designerQualifications'),
      company: get('designerCompany'),
      date: get('designerDate'),
      signature: get('designerSignature')
    },
    
    constructor: {
      name: get('constructorName'),
      qualifications: get('constructorQualifications'),
      company: get('constructorCompany'),
      date: get('constructorDate'),
      signature: get('constructorSignature')
    },
    
    inspector: {
      name: get('inspectorName'),
      qualifications: get('inspectorQualifications'),
      company: get('inspectorCompany'),
      date: get('inspectionDate'),
      signature: get('inspectorSignature')
    },
    
    declarations: {
      same_as_designer: getBool('sameAsDesigner'),
      same_as_constructor: getBool('sameAsConstructor'),
      additional_notes: get('additionalComments'),
      inspected_by: {
        name: get('inspectedByName'),
        signature: get('inspectedBySignature'),
        for_on_behalf_of: get('inspectedByForOnBehalfOf'),
        position: get('inspectedByPosition'),
        address: get('inspectedByAddress'),
        cp_scheme: get('inspectedByCpScheme'),
        cp_scheme_na: getBool('inspectedByCpSchemeNA')
      },
      report_authorised_by: {
        name: get('reportAuthorisedByName'),
        date: get('reportAuthorisedByDate'),
        signature: get('reportAuthorisedBySignature'),
        for_on_behalf_of: get('reportAuthorisedByForOnBehalfOf'),
        position: get('reportAuthorisedByPosition'),
        address: get('reportAuthorisedByAddress'),
        membership_no: get('reportAuthorisedByMembershipNo')
      },
      bs7671_compliance: getBool('bs7671Compliance'),
      building_regs_compliance: getBool('buildingRegsCompliance'),
      competent_person_scheme: getBool('competentPersonScheme'),
      overall_assessment: get('overallAssessment'),
      satisfactory_for_continued_use: getBool('satisfactoryForContinuedUse')
    },
    
    company_details: {
      company_name: get('companyName'),
      company_address: get('companyAddress'),
      company_phone: get('companyPhone'),
      company_email: get('companyEmail'),
      company_website: get('companyWebsite'),
      company_logo: get('companyLogo'),
      company_tagline: get('companyTagline'),
      company_accent_color: get('companyAccentColor'),
      company_registration_number: get('companyRegistrationNumber'),
      vat_number: get('vatNumber'),
      registration_scheme: get('registrationScheme'),
      registration_number: get('registrationNumber'),
      registration_expiry: get('registrationExpiry'),
      insurance_provider: get('insuranceProvider'),
      insurance_policy_number: get('insurancePolicyNumber'),
      insurance_coverage: get('insuranceCoverage'),
      insurance_expiry: get('insuranceExpiry')
    },
    
    observations: await formatDefects()
  };
};
