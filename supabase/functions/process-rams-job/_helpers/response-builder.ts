/**
 * Build final combined RAMS and Method Statement data
 */

import { 
  transformHealthSafetyResponse, 
  extractEmergencyContacts,
  calculateOverallRiskLevel,
  calculateTotalTime 
} from './transformers.ts';

export function buildCombinedData(
  hsData: any,
  installerData: any,
  projectDetails: {
    projectName: string;
    location: string;
    contractor: string;
    supervisor: string;
    assessor: string;
  }
) {
  
  // Transform H&S data
  const transformedRAMSData = transformHealthSafetyResponse(hsData, projectDetails);
  
  if (!transformedRAMSData) {
    throw new Error('Failed to transform Health & Safety data');
  }

  console.log('✅ Transformed RAMS data:', {
    risksCount: transformedRAMSData.risks?.length || 0,
    ppeCount: transformedRAMSData.ppeDetails?.length || 0
  });

  // Extract emergency contacts
  const emergencyContacts = extractEmergencyContacts(installerData);
  console.log('🚨 Emergency contacts extracted:', emergencyContacts);

  // Combine RAMS data
  const combinedRAMSData = {
    ...transformedRAMSData,
    ...emergencyContacts
  };

  // Build final method data
  const finalMethodData = installerData?.data ? {
    ...installerData.data,
    ...emergencyContacts,
    jobTitle: installerData.data.jobTitle || projectDetails.projectName || 'Electrical Installation',
    location: installerData.data.location || projectDetails.location,
    contractor: installerData.data.contractor || projectDetails.contractor,
    supervisor: installerData.data.supervisor || projectDetails.supervisor,
    overallRiskLevel: installerData.data.overallRiskLevel || calculateOverallRiskLevel(installerData.data.riskAssessment),
    totalEstimatedTime: installerData.data.totalEstimatedTime || calculateTotalTime(installerData.data.steps || [], installerData)
  } : null;

  return { combinedRAMSData, finalMethodData };
}
