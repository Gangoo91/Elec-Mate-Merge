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
    const items = get('inspectionItems', []);
    let parsed;
    try {
      parsed = typeof items === 'string' ? JSON.parse(items) : items;
    } catch (e) {
      console.error('[formatEICRJson] Failed to parse inspectionItems:', e);
      return [];
    }
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item: any) => ({
      id: item.id || "",
      item_number: item.itemNumber || item.number || "",  // Support both itemNumber and number fields
      description: item.item || item.description || "",
      outcome: item.outcome || "",
      clause: item.clause || "",
      notes: item.notes || ""
    }));
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
  return {
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
