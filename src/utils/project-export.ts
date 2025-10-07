import { supabase } from '@/integrations/supabase/client';
import { EICScheduleOfTests } from '@/types/eic-integration';
import { RAMSData } from '@/types/rams';
import { MethodStatementData } from '@/types/method-statement';
import { Quote } from '@/types/quote';
import { transformInstallerOutputToMethodStatement, InstallerAgentOutput } from './rams-transformer';
import { extractHazardsFromInstallation } from './installer-to-rams-mapper';
import { transformHealthSafetyOutputToRAMS, HealthSafetyAgentOutput } from './hs-to-rams-transformer';
import { createQuoteFromCostOutput, CostEngineerOutput } from './cost-to-quote-transformer';

export interface ProjectExport {
  eicSchedule?: EICScheduleOfTests;
  rams?: RAMSData & {
    emergencyProcedures?: string[];
    requiredPPE?: string[];
    acopCitations?: string[];
    methodStatementSteps?: string[];
  };
  methodStatement?: MethodStatementData;
  quote?: Partial<Quote>;
  sourceConversation: string;
  exportedAt: string;
}

export interface AgentOutputs {
  installer?: InstallerAgentOutput;
  healthSafety?: HealthSafetyAgentOutput;
  costEngineer?: CostEngineerOutput;
  eicData?: EICScheduleOfTests;
}

/**
 * Unified export system that generates all project documentation from agent outputs
 * Creates EIC schedule, RAMS, Method Statement, and Quote in one operation
 */
export async function exportCompleteProject(
  agentOutputs: AgentOutputs,
  projectDetails: {
    projectName: string;
    location: string;
    assessor: string;
    jobTitle: string;
    contractor: string;
    supervisor: string;
    teamSize: string;
    clientDetails?: {
      name: string;
      email: string;
      phone: string;
      address: string;
      postcode: string;
    };
  },
  conversationId?: string
): Promise<ProjectExport> {
  const projectExport: ProjectExport = {
    sourceConversation: conversationId || 'manual-export',
    exportedAt: new Date().toISOString(),
  };

  try {
    // Generate EIC Schedule (if available)
    if (agentOutputs.eicData) {
      projectExport.eicSchedule = agentOutputs.eicData;
    }

    // Generate Method Statement from Installer output
    if (agentOutputs.installer) {
      projectExport.methodStatement = transformInstallerOutputToMethodStatement(
        agentOutputs.installer,
        {
          jobTitle: projectDetails.jobTitle,
          location: projectDetails.location,
          contractor: projectDetails.contractor,
          supervisor: projectDetails.supervisor,
          teamSize: projectDetails.teamSize,
        }
      );
    }

    // Generate RAMS from Health & Safety output (priority) or Installer output (fallback)
    if (agentOutputs.healthSafety) {
      projectExport.rams = transformHealthSafetyOutputToRAMS(
        agentOutputs.healthSafety,
        {
          projectName: projectDetails.projectName,
          location: projectDetails.location,
          assessor: projectDetails.assessor,
        }
      );
    } else if (agentOutputs.installer) {
      // Fallback: generate RAMS from installer output
      projectExport.rams = extractHazardsFromInstallation(
        agentOutputs.installer,
        projectDetails.projectName,
        projectDetails.location,
        projectDetails.assessor
      );
    }

    // Generate Quote from Cost Engineer output
    if (agentOutputs.costEngineer && projectDetails.clientDetails) {
      projectExport.quote = createQuoteFromCostOutput(
        agentOutputs.costEngineer,
        projectDetails.clientDetails,
        {
          title: projectDetails.jobTitle,
          description: `Installation works at ${projectDetails.location}`,
          location: projectDetails.location,
        },
        {},
        conversationId
      );
    }

    // Save to database
    await saveProjectExport(projectExport);

    return projectExport;
  } catch (error) {
    console.error('Error exporting complete project:', error);
    throw new Error('Failed to export project documentation');
  }
}

/**
 * Saves project export to database and links all generated documents
 */
async function saveProjectExport(projectExport: ProjectExport): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  let eicScheduleId: string | null = null;
  let ramsId: string | null = null;
  let methodStatementId: string | null = null;
  let quoteId: string | null = null;

  // Save EIC Schedule
  if (projectExport.eicSchedule) {
    const { data: eicData, error: eicError } = await supabase
      .from('eic_schedules')
      .insert({
        user_id: user.id,
        installation_id: projectExport.eicSchedule.installationId,
        installation_address: projectExport.eicSchedule.installationAddress,
        designer_name: projectExport.eicSchedule.designerName,
        design_date: projectExport.eicSchedule.designDate,
        schedule_data: projectExport.eicSchedule,
        status: 'pending',
      } as any)
      .select()
      .single();

    if (eicError) throw eicError;
    eicScheduleId = eicData.id;
  }

  // Save Quote
  if (projectExport.quote) {
    const { data: quoteData, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        user_id: user.id,
        quote_number: projectExport.quote.quoteNumber,
        client_data: projectExport.quote.client,
        job_details: projectExport.quote.jobDetails,
        items: projectExport.quote.items,
        settings: projectExport.quote.settings,
        subtotal: projectExport.quote.subtotal,
        overhead: projectExport.quote.overhead,
        profit: projectExport.quote.profit,
        vat_amount: projectExport.quote.vatAmount,
        total: projectExport.quote.total,
        status: projectExport.quote.status,
        expiry_date: projectExport.quote.expiryDate,
        notes: projectExport.quote.notes,
      } as any)
      .select()
      .single();

    if (quoteError) throw quoteError;
    quoteId = quoteData.id;
  }

  // Save the project export record linking all documents
  // Note: Using 'as any' temporarily until Supabase types regenerate
  const { error: exportError } = await supabase
    .from('project_exports' as any)
    .insert({
      user_id: user.id,
      conversation_id: projectExport.sourceConversation,
      eic_schedule_id: eicScheduleId,
      quote_id: quoteId,
      rams_data: projectExport.rams,
      method_statement_data: projectExport.methodStatement,
      exported_at: projectExport.exportedAt,
    });

  if (exportError) throw exportError;
}

/**
 * Retrieves all project exports for the current user
 */
export async function getUserProjectExports(): Promise<ProjectExport[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Note: Using 'as any' temporarily until Supabase types regenerate
  const { data, error } = await supabase
    .from('project_exports' as any)
    .select('*')
    .eq('user_id', user.id)
    .order('exported_at', { ascending: false });

  if (error) throw error;

  return data.map((record: any) => ({
    sourceConversation: record.conversation_id,
    exportedAt: record.exported_at,
    rams: record.rams_data,
    methodStatement: record.method_statement_data,
  }));
}
