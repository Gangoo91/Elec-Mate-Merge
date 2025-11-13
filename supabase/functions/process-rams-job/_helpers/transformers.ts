/**
 * Transform health-safety-v3 response to match frontend RAMSData structure
 * Maps: hazards → risks, ppe → ppeDetails
 */
export function transformHealthSafetyResponse(hsData: any, projectDetails?: any): any {
  console.log('🔄 [PHASE 1 DIAGNOSTIC] Starting transformation...', {
    hasData: !!hsData,
    hasDataField: !!hsData?.data,
    dataKeys: hsData?.data ? Object.keys(hsData.data) : [],
    rawType: typeof hsData
  });

  if (!hsData) {
    console.error('❌ hsData is null/undefined');
    return null;
  }

  // Handle different response structures
  let sourceData = hsData.data || hsData;
  
  if (sourceData.result) {
    console.log('📦 Found result wrapper, unwrapping...');
    sourceData = sourceData.result;
  }
  
  if (sourceData.riskAssessment?.hazards) {
    console.log('📦 Found riskAssessment wrapper, extracting hazards...');
    sourceData.hazards = sourceData.riskAssessment.hazards;
  }
  
  console.log('🔍 [PHASE 1 DIAGNOSTIC] Source data structure:', {
    hasHazards: !!sourceData.hazards,
    hazardsType: sourceData.hazards ? typeof sourceData.hazards : 'missing',
    hazardsIsArray: Array.isArray(sourceData.hazards),
    hazardsLength: Array.isArray(sourceData.hazards) ? sourceData.hazards.length : 0,
    hasPPE: !!sourceData.ppe,
    ppeType: sourceData.ppe ? typeof sourceData.ppe : 'missing',
    ppeIsArray: Array.isArray(sourceData.ppe),
    ppeLength: Array.isArray(sourceData.ppe) ? sourceData.ppe.length : 0,
    allKeys: Object.keys(sourceData),
    firstHazard: Array.isArray(sourceData.hazards) && sourceData.hazards[0] ? Object.keys(sourceData.hazards[0]) : 'none'
  });
  
  if (!sourceData.hazards || !Array.isArray(sourceData.hazards)) {
    console.error('❌ No hazards array found in response. Available keys:', Object.keys(sourceData));
    console.error('Full source data sample:', JSON.stringify(sourceData).slice(0, 500));
    return null;
  }

  const transformed = {
    risks: sourceData.hazards.map((h: any) => ({
      id: h.id || `hazard-${Math.random().toString(36).substr(2, 9)}`,
      hazard: h.hazard || h.description || 'Unknown hazard',
      risk: h.hazard || h.description || 'Unknown risk',
      likelihood: h.likelihood || 3,
      severity: h.severity || 3,
      riskRating: h.riskScore || (h.likelihood * h.severity) || 9,
      controls: h.controlMeasure || h.controls || 'No controls specified',
      residualRisk: h.residualRisk || Math.ceil((h.riskScore || 9) * 0.3) || 3,
      linkedToStep: h.linkedToStep || 0,
      furtherAction: h.regulation || '',
      responsible: '',
      actionBy: '',
      done: false
    })),
    
    ppeDetails: (sourceData.ppe || []).map((p: any, idx: number) => ({
      id: `ppe-${p.itemNumber || idx + 1}`,
      itemNumber: p.itemNumber || idx + 1,
      ppeType: p.ppeType || 'PPE Item',
      standard: p.standard || 'N/A',
      mandatory: p.mandatory !== false,
      purpose: p.purpose || 'Protection'
    })),
    
    emergencyProcedures: sourceData.emergencyProcedures || [],
    complianceRegulations: sourceData.complianceRegulations || [],
    
    projectName: projectDetails?.projectName || '',
    location: projectDetails?.location || '',
    date: new Date().toISOString().split('T')[0],
    assessor: projectDetails?.assessor || '',
    contractor: projectDetails?.contractor || '',
    supervisor: projectDetails?.supervisor || '',
    activities: []
  };

  console.log('✅ [PHASE 1 DIAGNOSTIC] Transformation complete:', {
    inputHazards: sourceData.hazards?.length || 0,
    outputRisks: transformed.risks?.length || 0,
    inputPPE: sourceData.ppe?.length || 0,
    outputPPE: transformed.ppeDetails?.length || 0
  });

  return transformed;
}

/**
 * Extract emergency contacts from installer response
 */
export function extractEmergencyContacts(installerData: any): any {
  const contacts = installerData?.data?.emergencyContacts || {};
  
  return {
    siteManagerName: contacts.siteManager?.name || '',
    siteManagerPhone: contacts.siteManager?.phone || '',
    firstAiderName: contacts.firstAider?.name || '',
    firstAiderPhone: contacts.firstAider?.phone || '',
    safetyOfficerName: contacts.safetyOfficer?.name || '',
    safetyOfficerPhone: contacts.safetyOfficer?.phone || '',
    assemblyPoint: contacts.assemblyPoint || ''
  };
}

/**
 * Calculate overall risk level from risk assessment
 */
export function calculateOverallRiskLevel(riskAssessment: any): string {
  if (!riskAssessment?.hazards || riskAssessment.hazards.length === 0) {
    return 'low';
  }
  
  const highRiskCount = riskAssessment.hazards.filter(
    (h: any) => h.riskLevel === 'High' || h.riskScore >= 15
  ).length;
  
  const mediumRiskCount = riskAssessment.hazards.filter(
    (h: any) => h.riskLevel === 'Medium' || (h.riskScore >= 9 && h.riskScore < 15)
  ).length;
  
  if (highRiskCount > 0) return 'high';
  if (mediumRiskCount > 2) return 'medium';
  if (mediumRiskCount > 0) return 'medium';
  return 'low';
}

/**
 * Calculate total estimated time from steps
 */
export function calculateTotalTime(steps: any[], installerData?: any): string {
  if (!steps || steps.length === 0) return 'Not specified';
  if (installerData?.data?.duration) return installerData.data.duration;
  
  const hasStepDurations = steps.some(s => s.estimatedDuration);
  if (hasStepDurations) {
    const totalMinutes = steps.reduce((sum, step) => {
      const duration = step.estimatedDuration || '';
      const match = duration.match(/(\d+)\s*(min|hour|hr)/i);
      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        return sum + (unit.includes('hour') || unit.includes('hr') ? value * 60 : value);
      }
      return sum;
    }, 0);
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${totalMinutes}min`;
  }
  
  return 'Not specified';
}
