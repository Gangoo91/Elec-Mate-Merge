/**
 * Transform health-safety response to match frontend RAMSData structure
 */
export function transformHealthSafetyResponse(hsData: any, projectDetails?: any): any {
  if (!hsData) {
    console.error('❌ hsData is null/undefined');
    return null;
  }

  const sourceData = hsData;
  
  if (!sourceData.hazards || !Array.isArray(sourceData.hazards)) {
    console.error('❌ No hazards array found');
    return null;
  }

  const transformed = {
    risks: sourceData.hazards.map((h: any) => ({
      id: h.id || `hazard-${Math.random().toString(36).substr(2, 9)}`,
      hazard: h.hazard || 'Unknown hazard',
      risk: h.hazard || 'Unknown risk',
      likelihood: h.likelihood || 3,
      severity: h.severity || 3,
      riskRating: h.riskScore || (h.likelihood * h.severity) || 9,
      controls: h.controlMeasure || 'No controls specified',
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

  return transformed;
}
