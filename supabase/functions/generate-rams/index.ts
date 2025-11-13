/**
 * Unified RAMS Generator - Simplified Architecture
 * Single entry point that calls two parallel agents
 */

import { serve } from '../_shared/minimal-deps.ts';
import { generateHealthSafety } from '../_agents/health-safety-core.ts';
import { generateMethodStatement } from '../_agents/installer-core.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, projectDetails } = await req.json();
    
    // Validate input
    if (!query?.trim()) {
      throw new Error('query is required');
    }
    
    if (!projectDetails?.projectName || !projectDetails?.location || !projectDetails?.assessor) {
      throw new Error('projectDetails must include projectName, location, and assessor');
    }
    
    console.log('🚀 RAMS Generation starting...');
    console.log(`📋 Query: ${query}`);
    console.log(`📍 Project: ${projectDetails.projectName} @ ${projectDetails.location}`);
    
    const startTime = Date.now();
    
    // Call both agents in parallel - NO timeout, NO heartbeat, NO cache
    const [hsResult, installerResult] = await Promise.all([
      generateHealthSafety(query, projectDetails),
      generateMethodStatement(query, projectDetails)
    ]);
    
    const duration = Date.now() - startTime;
    console.log(`✅ Generation complete in ${(duration / 1000).toFixed(1)}s`);
    
    // Merge results inline
    const response = {
      success: true,
      rams: {
        projectName: projectDetails.projectName,
        location: projectDetails.location,
        date: new Date().toISOString().split('T')[0],
        assessor: projectDetails.assessor,
        contractor: projectDetails.contractor || '',
        supervisor: projectDetails.supervisor || '',
        activities: [query],
        risks: hsResult.hazards.map((h: any) => ({
          id: h.id,
          hazard: h.hazard,
          risk: h.hazard,
          likelihood: h.likelihood,
          severity: h.severity,
          riskRating: h.riskScore,
          controls: h.controlMeasure,
          residualRisk: h.residualRisk,
          linkedToStep: h.linkedToStep,
          furtherAction: h.regulation || ''
        })),
        hazards: hsResult.hazards,
        ppeDetails: hsResult.ppe,
        emergencyProcedures: hsResult.emergencyProcedures,
        complianceRegulations: hsResult.complianceRegulations
      },
      method: {
        jobTitle: projectDetails.projectName,
        location: projectDetails.location,
        contractor: projectDetails.contractor || '',
        supervisor: projectDetails.supervisor || '',
        steps: installerResult.installationSteps.map((s: any, idx: number) => ({
          id: `step-${idx + 1}`,
          stepNumber: s.step,
          title: s.title,
          description: s.description,
          safetyRequirements: s.safetyNotes || [],
          equipmentNeeded: s.tools || [],
          materialsNeeded: s.materials || [],
          qualifications: s.qualifications || [],
          estimatedDuration: `${s.estimatedTime || 30} minutes`,
          riskLevel: 'medium',
          linkedHazards: s.linkedHazards || [],
          dependencies: []
        })),
        toolsRequired: installerResult.toolsRequired || [],
        materialsRequired: installerResult.installationSteps.flatMap((s: any) => s.materials || []),
        practicalTips: installerResult.practicalTips || [],
        commonMistakes: installerResult.commonMistakes || [],
        testingProcedures: installerResult.testingProcedures || [],
        overallRiskLevel: 'medium',
        totalEstimatedTime: installerResult.installationSteps.reduce((sum: number, s: any) => sum + (s.estimatedTime || 30), 0)
      },
      metadata: {
        duration,
        ragStats: {
          healthSafetyDocs: hsResult._ragStats?.totalDocs || 0,
          installerDocs: installerResult._ragStats?.totalDocs || 0,
          total: (hsResult._ragStats?.totalDocs || 0) + (installerResult._ragStats?.totalDocs || 0)
        },
        generatedAt: new Date().toISOString()
      }
    };
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Generation failed:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        stack: error.stack
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
