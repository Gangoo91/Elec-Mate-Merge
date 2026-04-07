/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G7 Modification Certificate — JSON Formatter
 */

export const formatFireAlarmG7Json = (formData: Record<string, any>) => {
  const get = (key: string, defaultValue = ''): string => {
    const value = formData[key] ?? defaultValue;
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value);
    return value as string;
  };
  const getBool = (key: string): boolean => formData[key] === true || formData[key] === 'true';
  const formatDateUK = (dateStr: string): string => {
    if (!dateStr) return '';
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) return `${match[3]}/${match[2]}/${match[1]}`;
    return dateStr;
  };
  const getDate = (key: string): string => formatDateUK(get(key));
  const formatTestResult = (result: string): string =>
    result === 'pass' ? 'Pass' : result === 'fail' ? 'Fail' : result === 'na' ? 'N/A' : '';
  const getResultClass = (result: string): string =>
    result === 'pass' ? 'pass' : result === 'fail' ? 'fail' : result === 'na' ? 'na' : '';

  return {
    certificate_number: get('certificateNumber'),
    certificate_type: 'modification',
    modification_date: getDate('modificationDate'),
    standard_edition: get('standardEdition') || 'BS 5839-1:2025',

    // Original certs
    original_cert_ref: get('originalCertRef'),
    design_cert_reference: get('designCertReference'),
    commissioning_cert_ref: get('commissioningCertRef'),

    // Client
    client_name: get('clientName'),
    client_telephone: get('clientTelephone'),
    client_address: get('clientAddress'),

    // Premises
    premises_address: get('premisesAddress'),
    premises_type: get('premisesType'),
    system_category: get('systemCategory'),
    panel_make: get('systemMake'),
    existing_zones: get('existingZones'),

    // Modification
    modification_type: get('modificationType'),
    modification_description: get('modificationDescription'),
    modification_reason: get('modificationReason'),
    modification_extent: get('modificationExtent'),
    impact_assessment: get('impactAssessment'),
    cause_effect_updated: getBool('causeEffectUpdated'),
    drawings_updated: getBool('drawingsUpdated'),
    logbook_updated: getBool('logbookUpdated'),
    updated_drawings: get('updatedDrawings'),

    // Device Changes
    detectors_added: get('detectorsAdded'),
    detectors_removed: get('detectorsRemoved'),
    call_points_added: get('callPointsAdded'),
    call_points_removed: get('callPointsRemoved'),
    sounders_added: get('soundersAdded'),
    sounders_removed: get('soundersRemoved'),
    zones_added: get('zonesAdded'),
    zones_removed: get('zonesRemoved'),

    // Design Authority
    design_modified: getBool('designModified'),
    modification_designer_name: get('modificationDesignerName'),
    modification_designer_company: get('modificationDesignerCompany'),

    // Testing
    modified_devices_tested: formatTestResult(get('modifiedDevicesTested')),
    modified_devices_tested_class: getResultClass(get('modifiedDevicesTested')),
    modified_wiring_tested: formatTestResult(get('modifiedWiringTested')),
    modified_wiring_tested_class: getResultClass(get('modifiedWiringTested')),
    interface_equipment_verified: formatTestResult(get('interfaceEquipmentVerified')),
    interface_equipment_verified_class: getResultClass(get('interfaceEquipmentVerified')),
    sound_levels_checked: formatTestResult(get('soundLevelsChecked')),
    sound_levels_checked_class: getResultClass(get('soundLevelsChecked')),
    existing_zones_sampled: formatTestResult(get('existingZonesSampled')),
    existing_zones_sampled_class: getResultClass(get('existingZonesSampled')),
    panel_integration_verified: formatTestResult(get('panelIntegrationVerified')),
    panel_integration_verified_class: getResultClass(get('panelIntegrationVerified')),
    cause_effect_verified: formatTestResult(get('causeEffectVerified')),
    cause_effect_verified_class: getResultClass(get('causeEffectVerified')),
    system_integration_test: formatTestResult(get('systemIntegrationTest')),
    system_integration_test_class: getResultClass(get('systemIntegrationTest')),
    testing_notes: get('testingNotes'),

    // Modifier
    modifier_name: get('modifierName'),
    modifier_company: get('modifierCompany'),
    modifier_qualifications: get('modifierQualifications'),
    modifier_signature: get('modifierSignature'),
    modifier_date: getDate('modifierDate'),

    // Responsible Person
    responsible_person: {
      name: get('responsiblePersonName'),
      position: get('responsiblePersonPosition'),
      signature: get('responsiblePersonSignature'),
      date: getDate('responsiblePersonDate'),
    },

    // Modification Defects
    modification_defects: (formData.modificationDefects || []).map((d: any, i: number) => ({
      number: i + 1,
      description: d.description || '',
      severity: d.severity || 'non-critical',
      rectified: d.rectified || false,
    })),
    has_modification_defects: (formData.modificationDefects || []).length > 0,
    no_modification_defects: (formData.modificationDefects || []).length === 0,

    // Photos
    photos: formData.photos || [],
    has_photos: (formData.photos || []).length > 0,
    photo_count: (formData.photos || []).length,

    // Result
    overall_result: get('overallResult'),
    additional_notes: get('additionalNotes'),
    has_additional_notes: !!get('additionalNotes')?.trim(),

    // Company
    company_name: get('companyName'),
    company_address: get('companyAddress'),
    company_phone: get('companyPhone'),
    company_email: get('companyEmail'),
    company_logo: get('companyLogo'),
    company_accent_color: get('accentColor') || '#dc2626',
    registration_scheme_logo: get('registrationSchemeLogo'),
  };
};
