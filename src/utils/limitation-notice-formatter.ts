function formatDateUK(dateStr: string): string {
  if (!dateStr) return '';
  try { const d = new Date(dateStr); return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }); } catch { return dateStr; }
}

export function formatLimitationNoticePayload(data: Record<string, any>, company: Record<string, any> = {}): Record<string, unknown> {
  return {
    reference_number: data.referenceNumber,
    date: formatDateUK(data.date),
    linked_report_ref: data.linkedReportRef,
    linked_report_type: data.linkedReportType?.toUpperCase(),
    contractor_name: data.contractorName,
    contractor_company: data.contractorCompany,
    contractor_phone: data.contractorPhone,
    contractor_email: data.contractorEmail,
    registration_scheme: data.registrationScheme || company.registration_scheme || '',
    registration_number: data.registrationNumber || company.registration_number || '',
    client_name: data.clientName,
    installation_address: data.installationAddress,
    agreed_with_name: data.agreedWithName,
    agreed_with_position: data.agreedWithPosition,
    agreed_before_inspection: data.agreedBeforeInspection,
    extent_consumer_unit: data.extentConsumerUnit,
    extent_lighting: data.extentLighting,
    extent_sockets: data.extentSockets,
    extent_fixed_equipment: data.extentFixedEquipment,
    extent_external: data.extentExternal,
    extent_outbuildings: data.extentOutbuildings,
    extent_fire_alarm: data.extentFireAlarm,
    extent_emergency_lighting: data.extentEmergencyLighting,
    extent_earthing_bonding: data.extentEarthingBonding,
    extent_smoke_alarms: data.extentSmokeAlarms,
    limitations: (data.limitations || []).map((l: any) => ({
      type: l.type,
      code: l.code,
      area: l.area,
      circuit_ref: l.circuitRef,
      reason: l.reason,
      impact: l.impact,
      return_visit_condition: l.returnVisitCondition,
    })),
    risk_statement: data.riskStatement,
    inspector_signature: data.inspectorSignature,
    client_signature: data.clientSignature,
    notes: data.notes,
    company_name: company.company_name || data.contractorCompany,
    company_address: company.company_address || '',
    company_phone: company.company_phone || data.contractorPhone,
    company_email: company.company_email || data.contractorEmail,
    company_logo: company.logo_data_url || company.logo_url || '',
    scheme_logo: company.scheme_logo_data_url || company.registration_scheme_logo || '',
  };
}
