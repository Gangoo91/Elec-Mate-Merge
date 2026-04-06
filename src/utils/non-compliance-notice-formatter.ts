/**
 * Formats Non-Compliance Notice form data into PDF Monkey payload.
 * Converts camelCase front-end fields to snake_case for the Liquid template.
 */

function formatDateUK(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function formatNonComplianceNoticePayload(data: Record<string, any>, company: Record<string, any> = {}): Record<string, unknown> {
  return {
    reference_number: data.referenceNumber,
    date: formatDateUK(data.date),
    linked_service_ref: data.linkedServiceRef,

    // System details
    system_type: data.systemType,
    system_category: data.systemCategory,
    category_required: data.categoryRequired,
    panel_make: data.panelMake,
    panel_model: data.panelModel,
    system_age: data.systemAge,
    number_of_zones: data.numberOfZones,
    number_of_devices: data.numberOfDevices,
    fire_risk_assessment_ref: data.fireRiskAssessmentRef,

    // System status
    zones_isolated: data.zonesIsolated,
    outstanding_faults: data.outstandingFaults,
    last_service_date: formatDateUK(data.lastServiceDate),
    arc_monitored: data.arcMonitored,
    arc_affected: data.arcAffected,
    arc_provider: data.arcProvider,
    has_certificates: data.hasCertificates,
    certificate_details: data.certificateDetails,

    // Inspector
    contractor_name: data.contractorName,
    contractor_company: data.contractorCompany,
    contractor_phone: data.contractorPhone,
    contractor_email: data.contractorEmail,
    registration_scheme: data.registrationScheme || company.registration_scheme || '',
    registration_number: data.registrationNumber || company.registration_number || '',

    // Client / Responsible Person
    client_name: data.clientName,
    client_position: data.clientPosition,
    client_phone: data.clientPhone,
    client_email: data.clientEmail,
    installation_address: data.installationAddress,

    // Building details
    building_type: data.buildingType,
    number_of_floors: data.numberOfFloors,
    sleeping_accommodation: data.sleepingAccommodation,

    // Non-compliance items
    items: (data.items || []).map((item: any, idx: number) => ({
      number: idx + 1,
      description: item.description,
      location: item.location,
      standard_ref: item.standardRef,
      severity: item.severity,
      remedial_action: item.remedialAction,
    })),

    // Counts by severity
    critical_count: (data.items || []).filter((i: any) => i.severity === 'critical').length,
    major_count: (data.items || []).filter((i: any) => i.severity === 'major').length,
    minor_count: (data.items || []).filter((i: any) => i.severity === 'minor').length,

    // Overall assessment
    immediate_action_required: data.immediateActionRequired,
    system_safe: data.systemSafe,
    building_can_be_occupied: data.buildingCanBeOccupied,
    fire_service_notified: data.fireServiceNotified,
    insurance_affected: data.insuranceAffected,
    timeframe_for_remedial: data.timeframeForRemedial,
    remedial_deadline: formatDateUK(data.remedialDeadline),
    follow_up_date: formatDateUK(data.followUpDate),
    temporary_measures: data.temporaryMeasures,
    copy_distribution: data.copyDistribution,

    // Signatures
    inspector_signature: data.inspectorSignature,
    client_signature: data.clientSignature,
    client_refused_to_sign: data.clientRefusedToSign,

    // Photos & notes
    photos: data.photos || [],
    notes: data.notes,

    // Company branding
    company_name: company.company_name || data.contractorCompany,
    company_address: company.company_address || '',
    company_phone: company.company_phone || data.contractorPhone,
    company_email: company.company_email || data.contractorEmail,
    company_logo: company.logo_data_url || company.logo_url || '',
    scheme_logo: company.scheme_logo_data_url || company.registration_scheme_logo || '',
  };
}
