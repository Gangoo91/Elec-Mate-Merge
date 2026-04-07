/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G1 Design Certificate — JSON Formatter
 * Maps form data to PDF template variables for PDF Monkey
 * BS 5839-1:2025
 */

export const formatFireAlarmG1Json = (formData: Record<string, any>) => {
  const get = (key: string, defaultValue = ''): string => {
    const value = formData[key] ?? defaultValue;
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value);
    return value as string;
  };

  const getNum = (key: string, defaultValue = 0): number => {
    const value = formData[key];
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const p = parseFloat(value);
      return isNaN(p) ? defaultValue : p;
    }
    return defaultValue;
  };

  const getBool = (key: string): boolean => formData[key] === true || formData[key] === 'true';

  const formatDateUK = (dateStr: string): string => {
    if (!dateStr) return '';
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) return `${match[3]}/${match[2]}/${match[1]}`;
    return dateStr;
  };

  const getDate = (key: string): string => formatDateUK(get(key));

  // System category descriptions
  const categoryDescriptions: Record<string, string> = {
    L1: 'Life safety — all areas of building',
    L2: 'Life safety — escape routes and high-risk areas',
    L3: 'Life safety — escape routes only',
    L4: 'Life safety — within escape routes only',
    L5: 'Life safety — engineered system as risk assessment dictates',
    M: 'Manual system — manual call points only',
    P1: 'Property protection — full coverage',
    P2: 'Property protection — partial coverage',
  };

  // Premises type display
  const premisesTypes: Record<string, string> = {
    Office: 'Office',
    Retail: 'Retail',
    Warehouse: 'Warehouse',
    Factory: 'Factory / Industrial',
    School: 'School / Education',
    Hospital: 'Hospital / Healthcare',
    'Care Home': 'Care Home / Residential',
    Hotel: 'Hotel / B&B',
    HMO: 'HMO',
    'Place of Worship': 'Place of Worship',
    Restaurant: 'Restaurant / Kitchen',
    Leisure: 'Leisure / Sports',
    'Data Centre': 'Data Centre',
    'Mixed Use': 'Mixed Use',
  };

  const occupancyTypes: Record<string, string> = {
    Sleeping: 'Sleeping accommodation',
    'Non-sleeping': 'Non-sleeping',
    Mixed: 'Mixed (sleeping + non-sleeping)',
    Unoccupied: 'Unoccupied / Storage',
  };

  const networkTypes: Record<string, string> = {
    conventional: 'Conventional',
    addressable: 'Addressable',
    'analogue-addressable': 'Analogue Addressable',
    wireless: 'Wireless',
    hybrid: 'Hybrid',
    networked: 'Networked (multi-panel)',
  };

  const signallingRoutes: Record<string, string> = {
    'Dual path': 'Dual Path',
    'Single path': 'Single Path',
    RedCare: 'BT RedCare',
    Dualcom: 'Dualcom',
    GSM: 'GSM',
    IP: 'IP',
  };

  // Planned device totals
  const plannedDetectors =
    getNum('plannedOpticalSmoke') +
    getNum('plannedHeat') +
    getNum('plannedMultiSensor') +
    getNum('plannedBeam') +
    getNum('plannedAspirating') +
    getNum('plannedFlame') +
    getNum('plannedCO');

  // Format zones
  const zones = (formData.zones || []).map((z: any, i: number) => ({
    zone_number: z.zoneNumber || i + 1,
    zone_name: z.zoneName || '',
    location: z.location || '',
    detector_count: z.detectorCount || 0,
    call_point_count: z.callPointCount || 0,
    sounder_count: z.sounderCount || 0,
    notification_method: z.notificationMethod || '',
  }));

  // Format interface equipment
  const interfaces = (formData.interfaceEquipment || []).map((i: any, idx: number) => ({
    number: idx + 1,
    type: i.type || '',
    location: i.location || '',
    details: i.details || '',
  }));

  return {
    // Metadata
    certificate_number: get('certificateNumber'),
    certificate_type: 'design',
    certificate_type_display: 'Design',
    design_date: getDate('designDate'),
    standard_edition: get('standardEdition') || 'BS 5839-1:2025',
    system_scope: get('systemScope'),
    is_new_system: get('systemScope') === 'new' || !get('systemScope'),
    is_modification: get('systemScope') === 'modification',
    original_cert_ref: get('originalCertRef'),
    system_extent: get('systemExtent'),

    // Client
    client_name: get('clientName'),
    client_position: get('clientPosition'),
    client_address: get('clientAddress'),
    client_telephone: get('clientTelephone'),
    client_email: get('clientEmail'),

    // Premises
    premises_name: get('premisesName'),
    premises_address: get('premisesAddress'),
    premises_type: get('premisesType'),
    premises_type_display: premisesTypes[get('premisesType')] || get('premisesType'),
    occupancy_type: get('occupancyType'),
    occupancy_type_display: occupancyTypes[get('occupancyType')] || get('occupancyType'),
    floors_count: getNum('numberOfFloors', 1),
    floor_area: get('floorArea'),

    // Building Construction (G1 unique)
    ceiling_type: get('ceilingType'),
    beam_spacing: get('beamSpacing'),
    ventilation_notes: get('ventilationNotes'),
    building_construction_notes: get('buildingConstructionNotes'),
    has_construction_notes: !!(
      get('ceilingType') ||
      get('beamSpacing') ||
      get('buildingConstructionNotes')
    ),

    // FRA
    fra_reference: get('fraReference'),
    fra_date: getDate('fraDate'),
    fra_author: get('fraAuthor'),
    fra_company: get('fraCompany'),
    has_fra: !!(get('fraReference') || get('fraAuthor')),

    // System Classification
    system_category: get('systemCategory'),
    system_category_description: categoryDescriptions[get('systemCategory')] || '',
    category_justification: get('categoryJustification'),
    system_grade: get('systemGrade'),

    // Design Basis (G1 unique)
    design_basis: get('designBasis'),
    coverage_rationale: get('coverageRationale'),
    has_design_basis: !!(get('designBasis') || get('coverageRationale')),

    // Panel
    panel_make: get('systemMake'),
    panel_model: get('systemModel'),
    network_type: get('networkType'),
    network_type_display: networkTypes[get('networkType')] || get('networkType'),
    zones_count: getNum('zonesCount', 1),
    loop_count: getNum('loopCount'),

    // Cable
    cable_type: get('cableType'),
    circuit_integrity: get('circuitIntegrity'),
    red_cable_for_mains: getBool('redCableForMains'),
    has_cable: !!get('cableType'),

    // Cause & Effect
    evacuation_strategy: get('evacuationStrategy'),
    cause_effect_ref: get('causeEffectReference'),
    false_alarm_strategy: get('falseAlarmStrategy'),
    has_cause_effect: !!(get('evacuationStrategy') || get('causeEffectReference')),

    // Monitoring
    system_monitored: getBool('systemMonitored'),
    arc_name: get('arcName'),
    signalling_route: get('signallingRoute'),
    signalling_route_display: signallingRoutes[get('signallingRoute')] || get('signallingRoute'),

    // Planned Equipment (G1 unique)
    planned_optical_smoke: getNum('plannedOpticalSmoke'),
    planned_heat: getNum('plannedHeat'),
    planned_multi_sensor: getNum('plannedMultiSensor'),
    planned_beam: getNum('plannedBeam'),
    planned_aspirating: getNum('plannedAspirating'),
    planned_flame: getNum('plannedFlame'),
    planned_co: getNum('plannedCO'),
    planned_call_points: getNum('plannedCallPoints'),
    planned_sounders: getNum('plannedSounders'),
    planned_vads: getNum('plannedVADs'),
    total_planned_detectors: plannedDetectors,
    total_planned_devices:
      plannedDetectors +
      getNum('plannedCallPoints') +
      getNum('plannedSounders') +
      getNum('plannedVADs'),

    // Zones
    zones,
    has_zones: zones.length > 0,

    // Detector Spacing (G1 unique)
    ceiling_height: get('ceilingHeight'),
    detector_spacing: get('detectorSpacing'),
    coverage_per_detector: get('coveragePerDetector'),
    spacing_calculations: get('spacingCalculations'),
    has_spacing: !!(get('detectorSpacing') || get('spacingCalculations')),

    // Interface Equipment
    interface_equipment: interfaces,
    has_interface_equipment: interfaces.length > 0,

    // Battery Calculation (G1 unique)
    quiescent_current: get('quiescentCurrent'),
    alarm_current: get('alarmCurrent'),
    required_standby: get('requiredStandby'),
    calculated_battery_ah: (() => {
      const q = parseFloat(formData.quiescentCurrent || '0');
      const a = parseFloat(formData.alarmCurrent || '0');
      const h = parseFloat(formData.requiredStandby || '24');
      if (!q && !a) return '';
      return (q * h + a * 0.5) / 1000;
    })(),
    has_battery_calc: !!(get('quiescentCurrent') || get('alarmCurrent')),

    // Sound Level Design Targets (G1 unique)
    sound_target_general: get('soundTargetGeneral') || '65',
    sound_target_sleeping: get('soundTargetSleeping') || '75',
    sound_design_notes: get('soundDesignNotes'),
    has_sound_targets: !!get('soundDesignNotes'),

    // Drawing Schedule (G1 unique)
    drawings: (formData.drawings || []).map((d: any, i: number) => ({
      number: d.number || '',
      title: d.title || '',
      revision: d.revision || '',
      date: formatDateUK(d.date || ''),
    })),
    has_drawings: (formData.drawings || []).length > 0,

    // Cable Route
    cable_route_notes: get('cableRouteNotes'),
    has_cable_routes: !!get('cableRouteNotes'),

    // Design Documentation (G1 unique)
    design_spec_ref: get('designSpecRef'),
    design_doc_ref: get('designDocRef'),
    design_doc_date: getDate('designDocDate'),
    has_design_docs: !!(get('designDocRef') || get('designSpecRef')),

    // Related Standards
    rel_std_en54: getBool('relStdEN54'),
    rel_std_5839_6: getBool('relStd5839_6'),
    rel_std_7671: getBool('relStd7671'),
    rel_std_build_regs: getBool('relStdBuildRegs'),
    rel_std_rro: getBool('relStdRRO'),
    has_related_standards: !!(
      getBool('relStdEN54') ||
      getBool('relStd5839_6') ||
      getBool('relStd7671') ||
      getBool('relStdBuildRegs') ||
      getBool('relStdRRO')
    ),

    // Deviations
    design_deviations: get('designDeviations'),
    has_deviations: !!get('designDeviations'),

    // Designer Declaration
    designer_name: get('designerName'),
    designer_company: get('designerCompany'),
    designer_qualifications: get('designerQualifications'),
    designer_signature: get('designerSignature'),
    designer_date: getDate('designerDate'),

    // Notes
    additional_notes: get('additionalNotes'),
    has_additional_notes: !!get('additionalNotes')?.trim(),

    // Company Branding
    company_name: get('companyName'),
    company_address: get('companyAddress'),
    company_phone: get('companyPhone'),
    company_email: get('companyEmail'),
    company_logo: get('companyLogo'),
    company_accent_color: get('accentColor') || '#dc2626',
    registration_scheme_logo: get('registrationSchemeLogo'),
  };
};
