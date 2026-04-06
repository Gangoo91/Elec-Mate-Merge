/**
 * Formats Permit to Work form data into PDF Monkey payload.
 */

function formatDateUK(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

interface CompanyInfo {
  company_name?: string;
  company_address?: string;
  company_phone?: string;
  company_email?: string;
  company_logo?: string;
  company_tagline?: string;
  registration_scheme?: string;
  registration_number?: string;
  registration_scheme_logo?: string;
}

export function formatPermitToWorkPayload(
  data: Record<string, any>,
  company: CompanyInfo = {}
): Record<string, unknown> {
  return {
    permit_number: data.permitNumber,
    date_issued: formatDateUK(data.dateIssued),
    time_issued: data.timeIssued,
    valid_from: formatDateUK(data.validFrom),
    valid_until: formatDateUK(data.validUntil),

    contractor_name: data.contractorName,
    contractor_company: data.contractorCompany,
    contractor_phone: data.contractorPhone,
    contractor_email: data.contractorEmail,
    registration_scheme: data.registrationScheme || company.registration_scheme || '',
    registration_number: data.registrationNumber || company.registration_number || '',

    site_name: data.siteName,
    site_address: data.siteAddress,
    site_contact_name: data.siteContactName,
    site_contact_phone: data.siteContactPhone,
    emergency_contact: data.emergencyContact,
    nearest_first_aider: data.nearestFirstAider,
    fire_assembly_point: data.fireAssemblyPoint,

    description_of_work: data.descriptionOfWork,
    equipment_to_be_worked_on: data.equipmentToBeWorkedOn,
    location_of_work: data.locationOfWork,
    distribution_board_ref: data.distributionBoardRef,

    hazard_live_working: data.hazardLiveWorking,
    hazard_stored_energy: data.hazardStoredEnergy,
    hazard_arc_flash: data.hazardArcFlash,
    hazard_confined_space: data.hazardConfinedSpace,
    hazard_working_at_height: data.hazardWorkingAtHeight,
    hazard_asbestos: data.hazardAsbestos,
    hazard_other_services: data.hazardOtherServices,
    hazard_other: data.hazardOther,
    hazard_other_description: data.hazardOtherDescription,

    precaution_isolated: data.precautionIsolated,
    precaution_proved_dead: data.precautionProvedDead,
    precaution_locked_off: data.precautionLockedOff,
    precaution_warning_notices: data.precautionWarningNotices,
    precaution_barriers: data.precautionBarriers,
    precaution_adjacent_covered: data.precautionAdjacentCovered,
    precaution_earthing: data.precautionEarthing,
    precaution_other: data.precautionOther,
    precaution_other_description: data.precautionOtherDescription,

    ppe_insulated_gloves: data.ppeInsulatedGloves,
    ppe_safety_glasses: data.ppeSafetyGlasses,
    ppe_arc_flash_suit: data.ppeArcFlashSuit,
    ppe_insulated_tools: data.ppeInsulatedTools,
    ppe_safety_boots: data.ppeSafetyBoots,
    ppe_hard_hat: data.ppeHardHat,
    ppe_other: data.ppeOther,
    ppe_other_description: data.ppeOtherDescription,

    isolation_points: data.isolationPoints,
    isolation_method: data.isolationMethod,
    lock_tag_number: data.lockTagNumber,
    linked_isolation_cert_ref: data.linkedIsolationCertRef,

    authorised_by_name: data.authorisedByName,
    authorised_by_position: data.authorisedByPosition,
    authorised_by_company: data.authorisedByCompany,
    authorised_by_signature: data.authorisedBySignature,
    authorised_date: formatDateUK(data.authorisedDate),
    authorised_time: data.authorisedTime,

    receipt_declaration: data.receiptDeclaration,
    person_in_charge_name: data.personInChargeName,
    person_in_charge_position: data.personInChargePosition,
    person_in_charge_phone: data.personInChargePhone,
    person_in_charge_email: data.personInChargeEmail,
    person_in_charge_signature: data.personInChargeSignature,
    receipt_date: formatDateUK(data.receiptDate),
    receipt_time: data.receiptTime,

    work_completed: data.workCompleted,
    all_persons_clear: data.allPersonsClear,
    area_safe: data.areaSafe,
    tools_removed: data.toolsRemoved,
    clearance_name: data.clearanceName,
    clearance_signature: data.clearanceSignature,
    clearance_date: formatDateUK(data.clearanceDate),
    clearance_time: data.clearanceTime,

    permit_cancelled: data.permitCancelled,
    safe_to_return: data.safeToReturn,
    cancellation_name: data.cancellationName,
    cancellation_signature: data.cancellationSignature,
    cancellation_date: formatDateUK(data.cancellationDate),
    cancellation_time: data.cancellationTime,

    extended: data.extended,
    extended_valid_until: formatDateUK(data.extendedValidUntil),
    extended_by_name: data.extendedByName,
    extended_by_signature: data.extendedBySignature,

    photos: data.photos || [],
    notes: data.notes,

    company_name: company.company_name || data.contractorCompany,
    company_address: company.company_address || '',
    company_phone: company.company_phone || data.contractorPhone,
    company_email: company.company_email || data.contractorEmail,
    company_logo: company.logo_data_url || company.logo_url || '',
    company_tagline: company.company_tagline || '',
    registration_scheme_logo: company.registration_scheme_logo || '',
  };
}
