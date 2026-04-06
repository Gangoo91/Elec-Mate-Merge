/**
 * Formats Completion Notice form data into PDF Monkey payload.
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

export function formatCompletionNoticePayload(data: Record<string, any>, company: Record<string, any> = {}): Record<string, unknown> {
  return {
    reference_number: data.referenceNumber,
    date: formatDateUK(data.date),
    time: data.time,
    linked_report_ref: data.linkedReportRef,
    work_order_ref: data.workOrderRef,

    // Contractor
    contractor_name: data.contractorName,
    contractor_company: data.contractorCompany,
    contractor_phone: data.contractorPhone,
    contractor_email: data.contractorEmail,
    registration_scheme: data.registrationScheme || company.registration_scheme || '',
    registration_number: data.registrationNumber || company.registration_number || '',

    // Client
    client_name: data.clientName,
    client_position: data.clientPosition,
    client_phone: data.clientPhone,
    client_email: data.clientEmail,
    installation_address: data.installationAddress,

    // Work
    description_of_work: data.descriptionOfWork,
    work_items: (data.workItems || []).map((item: any, idx: number) => ({
      number: idx + 1,
      description: item.description,
      location: item.location,
      completed: item.completed,
    })),
    completed_count: (data.workItems || []).filter((w: any) => w.completed).length,
    total_items: (data.workItems || []).length,

    // Materials
    materials_used: (data.materialsUsed || []).map((m: any) => ({
      description: m.description,
      quantity: m.quantity,
      manufacturer: m.manufacturer,
    })),

    // Outstanding work
    has_outstanding_work: data.hasOutstandingWork,
    outstanding_work_description: data.outstandingWorkDescription,
    outstanding_work_reason: data.outstandingWorkReason,

    // Confirmation
    all_work_completed: data.allWorkCompleted,
    tested_satisfactory: data.testedSatisfactory,
    area_left_safe: data.areaLeftSafe,
    client_instructed: data.clientInstructed,
    certificate_issued: data.certificateIssued,
    certificate_type: data.certificateType,
    warning_labels_applied: data.warningLabelsApplied,

    // Handover
    manuals_provided: data.manualsProvided,
    as_built_drawings_provided: data.asBuiltDrawingsProvided,
    spare_keys_provided: data.spareKeysProvided,
    operating_instructions_given: data.operatingInstructionsGiven,

    // Warranty
    workmanship_warranty_period: data.workmanshipWarrantyPeriod,
    manufacturer_warranty_details: data.manufacturerWarrantyDetails,

    // Next actions
    next_recommended_action: data.nextRecommendedAction,
    next_action_date: formatDateUK(data.nextActionDate),

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
