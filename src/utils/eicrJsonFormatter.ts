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
  // CRITICAL DEBUG: Log exactly what's coming in
  console.log('[formatEICRJson] ===== INPUT DATA DEBUG =====');
  console.log('[formatEICRJson] scheduleOfTests:', formData.scheduleOfTests?.length || 0, 'circuits');
  console.log('[formatEICRJson] distributionBoards:', formData.distributionBoards?.length || 0, 'boards');
  console.log('[formatEICRJson] inspectionItems:', formData.inspectionItems?.length || 0, 'items');
  console.log('[formatEICRJson] defectObservations:', formData.defectObservations?.length || 0, 'defects');
  if (formData.scheduleOfTests?.length > 0) {
    console.log('[formatEICRJson] First circuit sample:', JSON.stringify(formData.scheduleOfTests[0]).substring(0, 200));
  }
  console.log('[formatEICRJson] =============================');

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

  // Format inspection items as flat array for checklist
  const formatInspectionItems = () => {
    // Get raw value directly - don't use get() which stringifies objects
    const rawItems = formData['inspectionItems'];

    let parsed;
    try {
      parsed = typeof rawItems === 'string' ? JSON.parse(rawItems) : rawItems;
    } catch (e) {
      console.error('[formatInspectionItems] Failed to parse inspectionItems:', e);
      return [];
    }

    if (!Array.isArray(parsed)) {
      return [];
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
        col_fi: outcome === "FI" ? "FI" : "",
        col_nv: outcome === "not-verified" || outcome === "N/V" ? "✓" : "",
        col_lim: outcome === "limitation" || outcome === "LIM" ? "✓" : ""
      };
    });

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
      'item_6_0': '6.0', 'item_6_1': '6.1', 'item_6_2': '6.2', 'item_6_3': '6.3', 'item_6_4': '6.4', 'item_6_5': '6.5',
      'item_6_6': '6.6', 'item_6_7': '6.7', 'item_6_8': '6.8', 'item_6_9': '6.9', 'item_6_10': '6.10',
      'item_6_11': '6.11', 'item_6_12': '6.12', 'item_6_13': '6.13',
      'item_7_0': '7.0', 'item_7_1': '7.1', 'item_7_2': '7.2', 'item_7_3': '7.3',
      'item_8_0': '8.0', 'item_8_1': '8.1', 'item_8_2': '8.2', 'item_8_3': '8.3', 'item_8_4': '8.4'
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
      return {};
    }

    const result: Record<string, string> = {};

    parsed.forEach((item: any) => {
      const outcome = item.outcome || "";
      // Use lookup map as primary source, fall back to item properties
      const itemNumber = itemNumberLookup[item.id] || item.itemNumber || item.number || "";
      if (!itemNumber) return;

      // Convert "1.0" to "1_0" for key prefix
      const prefix = "insp_" + itemNumber.replace(/\./g, "_");

      // Create flat keys for each outcome column - show actual codes
      result[`${prefix}_acc`] = outcome === "satisfactory" ? "Y" : "";
      result[`${prefix}_na`] = outcome === "not-applicable" || outcome === "N/A" ? "N/A" : "";
      result[`${prefix}_c1c2`] = outcome === "C1" ? "C1" : (outcome === "C2" ? "C2" : "");
      result[`${prefix}_c3`] = outcome === "C3" ? "C3" : "";
      result[`${prefix}_fi`] = outcome === "FI" ? "FI" : "";
      result[`${prefix}_nv`] = outcome === "not-verified" || outcome === "N/V" ? "N/V" : "";
      result[`${prefix}_lim`] = outcome === "limitation" || outcome === "LIM" ? "LIM" : "";
    });

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
    // Use field names from DistributionBoard type: name, reference, location, make, type, totalWays, zdb, ipf
    return boards.slice(1).map((board: any) => ({
      designation: board.name || board.reference || board.designation || '',
      location: board.location || '',
      manufacturer: board.make || board.manufacturer || '',
      board_type: board.type || board.boardType || '',
      ways: board.totalWays?.toString() || board.ways || '',
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

  // Format circuits grouped by distribution board (for multi-board EICR PDFs)
  const formatBoardsWithSchedules = () => {
    const boards = formData['distributionBoards'] || [];
    const testResults = formData['scheduleOfTests'] || [];
    if (!Array.isArray(testResults)) return [];

    const MAIN_BOARD_ID = 'main-board';

    // Helper to format a circuit for PDF output
    const formatCircuit = (result: any) => ({
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
    });

    // If no boards defined but we have test results, create a default main board
    if (!Array.isArray(boards) || boards.length === 0) {
      if (testResults.length > 0) {
        console.log('[formatBoardsWithSchedules] No boards defined, creating default Main DB with', testResults.length, 'circuits');
        return [{
          db_reference: formData['cuReference'] || 'Main DB',
          db_location: formData['cuLocation'] || '',
          db_manufacturer: formData['cuMake'] || '',
          db_type: formData['cuType'] || '',
          db_ways: '',
          db_zdb: formData['zdb'] || '',
          db_ipf: formData['ipf'] || '',
          supplied_from: '',
          incoming_device_bs_en: '',
          incoming_device_type: '',
          incoming_device_rating: '',
          polarity_confirmed: formData['confirmedCorrectPolarity'] ?? false,
          phase_sequence_confirmed: formData['confirmedPhaseSequence'] ?? false,
          spd_operational: formData['spdOperationalStatus'] ?? false,
          spd_na: formData['spdNA'] ?? false,
          spd_t1: formData['spdT1'] ?? false,
          spd_t2: formData['spdT2'] ?? false,
          spd_t3: formData['spdT3'] ?? false,
          main_switch_bs_en: formData['mainSwitchBsEn'] || '',
          main_switch_type: formData['mainSwitchType'] || '',
          main_switch_rating: formData['mainSwitchRating'] || '',
          main_switch_poles: formData['mainSwitchPoles'] || '',
          circuit_count: testResults.length,
          circuits: testResults.map(formatCircuit)
        }];
      }
      return [];
    }

    return boards.map((board: any) => {
      const boardId = board.id || MAIN_BOARD_ID;
      // Filter circuits belonging to this board
      const boardCircuits = testResults.filter(
        (r: any) => (r.boardId || MAIN_BOARD_ID) === boardId
      );

      return {
        // Board metadata
        db_reference: board.reference || board.name || 'Main DB',
        db_location: board.location || '',
        db_manufacturer: board.make || '',
        db_type: board.type || '',
        db_ways: board.totalWays?.toString() || '',
        db_zdb: board.zdb || '',
        db_ipf: board.ipf || '',
        // Schedule page headers
        supplied_from: board.suppliedFrom || '',
        incoming_device_bs_en: board.incomingDeviceBsEn || '',
        incoming_device_type: board.incomingDeviceType || '',
        incoming_device_rating: board.incomingDeviceRating || '',
        // Board verification
        polarity_confirmed: board.confirmedCorrectPolarity ?? false,
        phase_sequence_confirmed: board.confirmedPhaseSequence ?? false,
        // SPD details per board
        spd_operational: board.spdOperationalStatus ?? false,
        spd_na: board.spdNA ?? false,
        spd_t1: board.spdT1 ?? false,
        spd_t2: board.spdT2 ?? false,
        spd_t3: board.spdT3 ?? false,
        // Main switch for this board
        main_switch_bs_en: board.mainSwitchBsEn || '',
        main_switch_type: board.mainSwitchType || '',
        main_switch_rating: board.mainSwitchRating || '',
        main_switch_poles: board.mainSwitchPoles || '',
        // Circuit count
        circuit_count: boardCircuits.length,
        // Circuits for this board (same format as flat schedule_of_tests)
        circuits: boardCircuits.map(formatCircuit)
      };
    });
  };

  // Format defect observations with photo evidence from database
  const formatDefects = async () => {
    const defects = formData['defectObservations'] || [];
    console.log('[formatDefects] Number of defects:', defects.length);
    console.log('[formatDefects] Defect IDs:', defects.map((d: any) => d.id));

    if (!Array.isArray(defects)) return [];

    // Resolve the UUID - reportId might be either reports.id (UUID) or reports.report_id (text)
    let reportUuid = reportId;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    console.log('[formatDefects] Input reportId:', reportId);

    if (!uuidRegex.test(reportId)) {
      // reportId is the text report_id field, need to fetch the UUID
      const { data: report } = await supabase
        .from('reports')
        .select('id')
        .eq('report_id', reportId)
        .is('deleted_at', null)
        .single();

      if (report?.id) {
        reportUuid = report.id;
        console.log('[formatDefects] Resolved reportUuid:', reportUuid);
      } else {
        console.warn('[formatDefects] Could not resolve report UUID for:', reportId, '- photos will not be loaded');
      }
    }

    // Fetch all photos for this report using the UUID (only if we have a valid UUID)
    let photos: any[] = [];
    if (uuidRegex.test(reportUuid)) {
      console.log('[formatDefects] Fetching photos for report UUID:', reportUuid);
      const { data, error } = await supabase
        .from('inspection_photos')
        .select('*')
        .eq('report_id', reportUuid);

      if (error) {
        console.error('[formatDefects] Error fetching photos:', error);
      } else {
        photos = data || [];
        console.log('[formatDefects] Found photos:', photos.length);
        console.log('[formatDefects] Photo observation_ids:', photos.map(p => p.observation_id));
        console.log('[formatDefects] Photo item_ids:', photos.map(p => p.item_id));
      }
    }

    return defects.map((defect: any) => {
      // Find photos linked to this observation by observation_id OR item_id (fallback)
      const observationPhotos = photos?.filter(p =>
        p.observation_id === defect.id ||
        (defect.inspectionItemId && p.item_id === defect.inspectionItemId)
      ) || [];

      console.log(`[formatDefects] Defect ${defect.id}: found ${observationPhotos.length} matching photos`);

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

  // Strip unit suffixes from values (e.g., "25mm" → "25", "10mm²" → "10")
  // Prevents double-unit display like "25mmmm²" when PDF template appends "mm²"
  const stripUnit = (value: string): string => {
    if (!value) return value;
    return value.replace(/mm²?$/i, '').trim();
  };

  // NESTED, GROUPED structure for improved organization
  // Put flat inspection keys FIRST to avoid truncation issues
  const flatKeys = formatFlatInspection();

  return {
    // Spread flat keys at the TOP of the object
    ...flatKeys,

    metadata: {
      certificate_number: get('certificateNumber'),
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
      occupier: get('occupier'),
      installation_type: get('installationType'),
      description: get('description'),
      premises_type: get('description') === 'other' ? get('otherPremisesDescription') : get('description'),
      other_premises_description: get('otherPremisesDescription'),
      installation_date: get('installationDate'),
      test_date: get('inspectionDate'),
      construction_date: get('constructionDate'),
      estimated_age: get('estimatedAge'),
      age_unit: get('ageUnit'),
      last_inspection_type: get('lastInspectionType'),
      date_of_last_inspection: get('dateOfLastInspection'),
      evidence_of_alterations: get('evidenceOfAlterations'),
      alterations_details: get('alterationsDetails'),
      alterations_age: get('alterationsAge'),
      installation_records_available: get('installationRecordsAvailable'),
      purpose_of_inspection: get('purposeOfInspection'),
      other_purpose: get('otherPurpose'),
      agreed_with: get('agreedWith'),
      extent_of_inspection: get('extentOfInspection'),
      limitations_of_inspection: get('limitationsOfInspection'),
      operational_limitations: get('operationalLimitations'),
      bs_amendment: get('bsAmendment'),
      next_inspection_date: get('nextInspectionDate'),
      inspection_interval: get('inspectionInterval'),
      interval_reasons: get('intervalReasons')
    },
    
    standards_compliance: {
      design_standard: get('designStandard', 'BS7671'),
      part_p_compliance: get('partPCompliance')
    },
    
    supply_characteristics: {
      supply_voltage: get('supplyVoltageCustom') || get('supplyVoltage'),
      supply_frequency: get('supplyFrequency', '50'),
      supply_ac_dc: get('supplyAcDc', 'ac'),
      conductor_configuration: get('conductorConfiguration'),
      phases: get('phases'),
      earthing_arrangement: get('earthingArrangement'),
      supply_type: get('supplyType'),
      supply_pme: get('supplyPME'),
      dno_name: get('dnoName'),
      mpan: get('mpan'),
      cutout_location: get('cutoutLocation'),
      service_entry: get('serviceEntry'),
      external_ze: get('externalZe'),
      prospective_fault_current: get('prospectiveFaultCurrent'),
      supply_polarity_confirmed: getBool('supplyPolarityConfirmed'),
      other_sources_of_supply: get('otherSourcesOfSupply')
    },
    
    main_protective_device: (() => {
      // Get main board for location fallback
      const mainBoard = formData.distributionBoards?.[0];
      return {
        bs_en: mainBoard?.mainSwitchBsEn || '',
        device_type: get('mainProtectiveDevice'),
        main_switch_rating: get('mainSwitchRating'),
        main_switch_location: get('cuLocation') || mainBoard?.location || '',
        main_switch_poles: get('mainSwitchPoles'),
        main_switch_voltage_rating: get('mainSwitchVoltageRating'),
        fuse_device_rating: get('fuseDeviceRating'),
        breaking_capacity: get('breakingCapacity')
      };
    })(),

    rcd_details: {
      rcd_main_switch: get('rcdMainSwitch'),
      rcd_rating: get('rcdRating'),
      rcd_type: get('rcdType'),
      rcd_time_delay: get('rcdTimeDelay'),
      rcd_measured_time: get('rcdMeasuredTime')
    },

    distribution_board: (() => {
      // Read from distributionBoards array if available, fall back to legacy flat fields
      const mainBoard = formData.distributionBoards?.[0];
      const boardSize = mainBoard?.totalWays ? `${mainBoard.totalWays}-way` : get('boardSize');
      return {
        board_designation: mainBoard?.name || mainBoard?.reference || get('boardDesignation', 'Main DB'),
        board_size: boardSize,
        board_type: mainBoard?.type || get('cuType'),
        board_location: mainBoard?.location || get('cuLocation'),
        board_manufacturer: mainBoard?.make || get('cuManufacturer'),
        board_ways: mainBoard?.totalWays?.toString() || get('cuNumberOfWays') || ''
      };
    })(),
    
    cables: {
      intake_cable_size: stripUnit(get('intakeCableSize')),
      intake_cable_type: get('intakeCableType'),
      tails_size: stripUnit(get('tailsSize')),
      tails_length: get('tailsLength')
    },
    
    earthing_bonding: (() => {
      // Parse mainBondingLocations string to derive boolean values for PDF
      // Form stores "Water, Gas, Oil" etc. as comma-separated string
      const bondingStr = (formData.mainBondingLocations || '').toLowerCase();

      return {
        means_of_earthing_distributor: getBool('meansOfEarthingDistributor'),
        means_of_earthing_electrode: getBool('meansOfEarthingElectrode'),
        earth_electrode_type: get('earthElectrodeType'),
        earth_electrode_location: get('earthElectrodeLocation'),
        earth_electrode_resistance: get('earthElectrodeResistance'),
        main_earthing_conductor_type: get('mainEarthingConductorType'),
        main_earthing_conductor_size: get('mainEarthingConductorSizeCustom') || get('mainEarthingConductorSize'),
        main_earthing_conductor: (() => {
          const size = stripUnit(get('mainEarthingConductorSizeCustom') || get('mainEarthingConductorSize'));
          const type = get('mainEarthingConductorType');
          if (size && type) return `${size}mm² ${type}`;
          if (size) return `${size}mm²`;
          return '';
        })(),
        main_bonding_conductor_type: get('mainBondingConductorType'),
        main_bonding_conductor: (() => {
          const size = stripUnit(get('mainBondingSizeCustom') || get('mainBondingSize'));
          const type = get('mainBondingConductorType');
          if (size && type) return `${size}mm² ${type}`;
          if (size) return `${size}mm²`;
          return '';
        })(),
        main_bonding_size: get('mainBondingSizeCustom') || get('mainBondingSize'),
        main_bonding_size_custom: get('mainBondingSizeCustom'),
        main_bonding_locations: get('mainBondingLocations'),
        // Bonding connections - parse from mainBondingLocations string
        bonding_water: bondingStr.includes('water'),
        bonding_gas: bondingStr.includes('gas'),
        bonding_oil: bondingStr.includes('oil'),
        bonding_structural_steel: bondingStr.includes('steel') || bondingStr.includes('structural'),
        bonding_lightning_protection: bondingStr.includes('lightning'),
        bonding_other: bondingStr.includes('telecom') || bondingStr.includes('other'),
        bonding_other_specify: get('bondingOtherSpecify'),
        bonding_compliance: get('bondingCompliance'),
        earthing_conductor_continuity_verified: getBool('earthingConductorContinuityVerified'),
        bonding_conductor_continuity_verified: getBool('bondingConductorContinuityVerified'),
        supplementary_bonding: get('supplementaryBonding'),
        supplementary_bonding_size: get('supplementaryBondingSizeCustom') || get('supplementaryBondingSize'),
        supplementary_bonding_size_custom: get('supplementaryBondingSizeCustom'),
        equipotential_bonding: get('equipotentialBonding')
      };
    })(),
    
    inspection_checklist: formatInspectionItems(),

    // Flat inspection keys already spread at TOP of return object

    // Inspection items grouped by section for PDF template
    inspection_items: formatInspectionItemsBySections(),

    // Additional distribution boards (beyond the main board)
    additional_boards: formatAdditionalBoards(),

    schedule_of_tests: (() => {
      const circuits = formatCircuits();
      console.log('[formatEICRJson] schedule_of_tests output:', circuits.length, 'circuits');
      return circuits;
    })(),

    // Multi-board schedule: each board with its own circuits, SPD, and verification data
    boards_with_schedules: (() => {
      const boards = formatBoardsWithSchedules();
      console.log('[formatEICRJson] boards_with_schedules output:', boards.length, 'boards');
      if (boards.length > 0) {
        console.log('[formatEICRJson] First board circuits:', boards[0]?.circuits?.length || 0);
        console.log('[formatEICRJson] First board reference:', boards[0]?.db_reference);
      }
      return boards;
    })(),

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
    
    distribution_board_verification: (() => {
      // Read from distributionBoards array if available, fall back to legacy flat fields
      const mainBoard = formData.distributionBoards?.[0];
      return {
        db_reference: mainBoard?.reference || mainBoard?.name || get('dbReference') || 'Main DB',
        zdb: mainBoard?.zdb || get('zdb') || '',
        ipf: mainBoard?.ipf || get('ipf') || '',
        confirmed_correct_polarity: mainBoard?.confirmedCorrectPolarity ?? getBool('confirmedCorrectPolarity'),
        confirmed_phase_sequence: mainBoard?.confirmedPhaseSequence ?? getBool('confirmedPhaseSequence'),
        spd_operational_status: mainBoard?.spdOperationalStatus ?? getBool('spdOperationalStatus'),
        spd_na: mainBoard?.spdNA ?? getBool('spdNA'),
        // SPD Type checkboxes
        spd_t1: mainBoard?.spdT1 ?? false,
        spd_t2: mainBoard?.spdT2 ?? false,
        spd_t3: mainBoard?.spdT3 ?? false
      };
    })(),
    
    designer: {
      name: get('designerName'),
      qualifications: get('designerQualifications'),
      company: get('companyName') || get('designerCompany'),
      address: get('companyAddress') || get('designerAddress'),
      postcode: get('companyPostcode') || get('designerPostcode'),
      phone: get('companyPhone') || get('designerPhone'),
      date: get('designerDate'),
      signature: get('designerSignature'),
      departures: get('designerDepartures'),
      permitted_exceptions: get('permittedExceptions')
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
      company: get('companyName') || get('inspectorCompany'),
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

    observations: await formatDefects(),

    // ============================================
    // TOP-LEVEL COPIES FOR PDF TEMPLATE COMPATIBILITY
    // Multiple naming conventions to match template
    // ============================================

    // Earth electrode - various naming conventions
    earth_electrode_type: get('earthElectrodeType'),
    earth_electrode_location: get('earthElectrodeLocation'),
    earth_electrode_resistance: get('earthElectrodeResistance'),
    earthElectrodeType: get('earthElectrodeType'),
    earthElectrodeLocation: get('earthElectrodeLocation'),
    earthElectrodeResistance: get('earthElectrodeResistance'),

    // Departures - various naming conventions
    departures: get('designerDepartures'),
    designer_departures: get('designerDepartures'),
    designerDepartures: get('designerDepartures'),
    details_of_departures: get('designerDepartures'),

    // Permitted exceptions - various naming conventions
    permitted_exceptions: get('permittedExceptions'),
    permittedExceptions: get('permittedExceptions'),
    details_of_permitted_exceptions: get('permittedExceptions'),
    exceptions: get('permittedExceptions'),

    // Main switch location - various naming conventions
    main_switch_location: get('cuLocation') || get('mainSwitchLocation'),
    mainSwitchLocation: get('cuLocation') || get('mainSwitchLocation'),

    // ============================================
    // COMPREHENSIVE TOP-LEVEL FIELD COPIES
    // Ensures all form fields accessible at root level
    // ============================================

    // Supply Authority
    dno_name: get('dnoName'),
    dnoName: get('dnoName'),
    mpan: get('mpan'),
    cutout_location: get('cutoutLocation'),
    cutoutLocation: get('cutoutLocation'),

    // Supply Details
    phases: get('phases'),
    supply_voltage: get('supplyVoltageCustom') || get('supplyVoltage'),
    supplyVoltage: get('supplyVoltageCustom') || get('supplyVoltage'),
    supply_frequency: get('supplyFrequency', '50'),
    supply_pme: get('supplyPME'),
    supplyPME: get('supplyPME'),
    earthing_arrangement: get('earthingArrangement'),
    earthingArrangement: get('earthingArrangement'),

    // Main Protective Device (flat - camelCase only to avoid duplicate with nested object)
    mainProtectiveDevice: get('mainProtectiveDevice'),
    main_protective_device_type: get('mainProtectiveDevice'),
    rcd_main_switch: get('rcdMainSwitch'),
    rcdMainSwitch: get('rcdMainSwitch'),
    rcd_rating: get('rcdRating'),
    rcdRating: get('rcdRating'),

    // Client Details
    client_name: get('clientName'),
    clientName: get('clientName'),
    client_address: get('clientAddress'),
    clientAddress: get('clientAddress'),
    client_phone: get('clientPhone'),
    clientPhone: get('clientPhone'),
    client_email: get('clientEmail'),
    clientEmail: get('clientEmail'),
    installation_address: get('installationAddress'),
    installationAddress: get('installationAddress'),

    // Installation Details
    installation_type: get('installationType'),
    installationType: get('installationType'),
    description: get('description'),
    estimated_age: get('estimatedAge'),
    estimatedAge: get('estimatedAge'),
    age_unit: get('ageUnit'),
    ageUnit: get('ageUnit'),
    last_inspection_type: get('lastInspectionType'),
    date_of_last_inspection: get('dateOfLastInspection'),
    evidence_of_alterations: get('evidenceOfAlterations'),
    alterations_details: get('alterationsDetails'),

    // Inspection Details
    inspection_date: get('inspectionDate'),
    inspectionDate: get('inspectionDate'),
    next_inspection_date: get('nextInspectionDate'),
    nextInspectionDate: get('nextInspectionDate'),
    inspection_interval: get('inspectionInterval'),
    inspectionInterval: get('inspectionInterval'),
    purpose_of_inspection: get('purposeOfInspection'),
    purposeOfInspection: get('purposeOfInspection'),
    other_purpose: get('otherPurpose'),
    extent_of_inspection: get('extentOfInspection'),
    extentOfInspection: get('extentOfInspection'),
    limitations_of_inspection: get('limitationsOfInspection'),
    limitationsOfInspection: get('limitationsOfInspection'),

    // Distribution Board (flat)
    db_location: formData.distributionBoards?.[0]?.location || get('cuLocation'),
    db_manufacturer: formData.distributionBoards?.[0]?.make || get('cuManufacturer'),
    db_type: formData.distributionBoards?.[0]?.type || get('cuType'),
    db_ways: formData.distributionBoards?.[0]?.totalWays?.toString() || '',
    db_reference: formData.distributionBoards?.[0]?.reference || formData.distributionBoards?.[0]?.name || 'Main DB',
    db_zdb: formData.distributionBoards?.[0]?.zdb || '',
    db_ipf: formData.distributionBoards?.[0]?.ipf || '',

    // Cables (flat) - stripUnit prevents double-mm (e.g., "25mmmm²")
    intake_cable_size: stripUnit(get('intakeCableSize')),
    intakeCableSize: stripUnit(get('intakeCableSize')),
    intake_cable_type: get('intakeCableType'),
    intakeCableType: get('intakeCableType'),
    tails_size: stripUnit(get('tailsSize')),
    tailsSize: stripUnit(get('tailsSize')),
    tails_length: get('tailsLength'),
    tailsLength: get('tailsLength'),

    // Earthing & Bonding (flat)
    main_earthing_conductor_type: get('mainEarthingConductorType'),
    mainEarthingConductorType: get('mainEarthingConductorType'),
    main_earthing_conductor_size: get('mainEarthingConductorSizeCustom') || get('mainEarthingConductorSize'),
    mainEarthingConductorSize: get('mainEarthingConductorSizeCustom') || get('mainEarthingConductorSize'),
    main_bonding_conductor_type: get('mainBondingConductorType'),
    mainBondingConductorType: get('mainBondingConductorType'),
    main_bonding_size: get('mainBondingSizeCustom') || get('mainBondingSize'),
    mainBondingSize: get('mainBondingSizeCustom') || get('mainBondingSize'),
    main_bonding_locations: get('mainBondingLocations'),
    mainBondingLocations: get('mainBondingLocations'),
    bonding_compliance: get('bondingCompliance'),
    bondingCompliance: get('bondingCompliance'),
    supplementary_bonding_size: get('supplementaryBondingSizeCustom') || get('supplementaryBondingSize'),
    supplementaryBondingSize: get('supplementaryBondingSizeCustom') || get('supplementaryBondingSize'),
    equipotential_bonding: get('equipotentialBonding'),
    equipotentialBonding: get('equipotentialBonding'),

    // Overall Assessment & Summary
    overall_assessment: get('overallAssessment'),
    overallAssessment: get('overallAssessment'),
    satisfactory_for_continued_use: getBool('satisfactoryForContinuedUse'),
    satisfactoryForContinuedUse: getBool('satisfactoryForContinuedUse'),
    additional_comments: get('additionalComments'),
    additionalComments: get('additionalComments'),

    // Inspected By (flat)
    inspected_by_name: get('inspectedByName'),
    inspectedByName: get('inspectedByName'),
    inspected_by_signature: get('inspectedBySignature'),
    inspectedBySignature: get('inspectedBySignature'),
    inspected_by_for_on_behalf_of: get('inspectedByForOnBehalfOf'),
    inspected_by_position: get('inspectedByPosition'),
    inspected_by_address: get('inspectedByAddress'),
    inspected_by_cp_scheme: get('inspectedByCpScheme'),

    // Report Authorised By (flat)
    report_authorised_by_name: get('reportAuthorisedByName'),
    report_authorised_by_date: get('reportAuthorisedByDate'),
    report_authorised_by_signature: get('reportAuthorisedBySignature'),
    report_authorised_by_for_on_behalf_of: get('reportAuthorisedByForOnBehalfOf'),
    report_authorised_by_position: get('reportAuthorisedByPosition'),
    report_authorised_by_address: get('reportAuthorisedByAddress'),
    report_authorised_by_membership_no: get('reportAuthorisedByMembershipNo'),

    // Inspector Details (flat)
    inspector_name: get('inspectorName'),
    inspectorName: get('inspectorName'),
    inspector_qualifications: get('inspectorQualifications'),
    inspectorQualifications: get('inspectorQualifications'),
    inspector_signature: get('inspectorSignature'),
    inspectorSignature: get('inspectorSignature'),
    registration_scheme: get('registrationScheme'),
    registrationScheme: get('registrationScheme'),
    registration_number: get('registrationNumber'),
    registrationNumber: get('registrationNumber'),
    registration_expiry: get('registrationExpiry'),
    registrationExpiry: get('registrationExpiry'),

    // Insurance (flat)
    insurance_provider: get('insuranceProvider'),
    insuranceProvider: get('insuranceProvider'),
    insurance_policy_number: get('insurancePolicyNumber'),
    insurancePolicyNumber: get('insurancePolicyNumber'),
    insurance_coverage: get('insuranceCoverage'),
    insuranceCoverage: get('insuranceCoverage'),
    insurance_expiry: get('insuranceExpiry'),
    insuranceExpiry: get('insuranceExpiry'),

    // Company Details (flat)
    company_name: get('companyName'),
    companyName: get('companyName'),
    company_address: get('companyAddress'),
    companyAddress: get('companyAddress'),
    company_phone: get('companyPhone'),
    companyPhone: get('companyPhone'),
    company_email: get('companyEmail'),
    companyEmail: get('companyEmail'),
    company_logo: get('companyLogo'),
    companyLogo: get('companyLogo'),
    company_website: get('companyWebsite'),
    companyWebsite: get('companyWebsite'),
    company_tagline: get('companyTagline'),
    companyTagline: get('companyTagline'),
    company_accent_color: get('companyAccentColor'),
    companyAccentColor: get('companyAccentColor'),

    // Test Instrument & Method (flat copies for direct template access)
    test_method: get('testMethod'),
    test_voltage: get('testVoltage'),
    test_notes: get('testNotes'),
    test_temperature: get('testTemperature'),
    test_instrument_make: get('testInstrumentMake') === 'Other'
      ? get('customTestInstrument')
      : get('testInstrumentMake'),
    test_instrument_serial: get('testInstrumentSerial'),
    calibration_date: get('calibrationDate'),

    // Main Switch fields (flat)
    main_switch_rating: get('mainSwitchRating'),
    main_switch_poles: get('mainSwitchPoles'),
    main_switch_voltage_rating: get('mainSwitchVoltageRating'),
    fuse_device_rating: get('fuseDeviceRating'),
    breaking_capacity: get('breakingCapacity'),
    service_entry: get('serviceEntry'),

    // ============================================
    // NEW BS 7671 MODEL FORM FIELDS (flat copies)
    // ============================================

    // Section C - Installation Details
    occupier: get('occupier'),
    premises_type: get('description') === 'other' ? get('otherPremisesDescription') : get('description'),
    other_premises_description: get('otherPremisesDescription'),
    alterations_age: get('alterationsAge'),
    installation_records_available: get('installationRecordsAvailable'),

    // Section D - Extent & Limitations
    agreed_with: get('agreedWith'),
    operational_limitations: get('operationalLimitations'),
    bs_amendment: get('bsAmendment'),
    interval_reasons: get('intervalReasons'),

    // Section I - Supply Characteristics
    supply_ac_dc: get('supplyAcDc', 'ac'),
    conductor_configuration: get('conductorConfiguration'),
    external_ze: get('externalZe'),
    prospective_fault_current: get('prospectiveFaultCurrent'),
    supply_polarity_confirmed: getBool('supplyPolarityConfirmed'),
    other_sources_of_supply: get('otherSourcesOfSupply'),

    // Section J - Particulars
    means_of_earthing_distributor: getBool('meansOfEarthingDistributor'),
    means_of_earthing_electrode: getBool('meansOfEarthingElectrode'),
    earthing_conductor_continuity_verified: getBool('earthingConductorContinuityVerified'),
    bonding_conductor_continuity_verified: getBool('bondingConductorContinuityVerified'),

    // RCD details (flat)
    rcd_time_delay: get('rcdTimeDelay'),
    rcd_measured_time: get('rcdMeasuredTime'),

    // Section K - Observations
    no_remedial_action: getBool('noRemedialAction'),

    // Schedule counts (auto-calculated)
    inspection_schedule_count: 1,
    test_schedule_count: (() => {
      const boards = formData['distributionBoards'] || [];
      return Array.isArray(boards) && boards.length > 0 ? boards.length : 1;
    })()
  };
};
