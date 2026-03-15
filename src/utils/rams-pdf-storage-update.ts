import { supabase } from '@/integrations/supabase/client';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';

/**
 * Update existing RAMS document in database
 */
export async function updateRAMSDocument(
  documentId: string,
  ramsData: RAMSData,
  methodData: Partial<MethodStatementData>
): Promise<{ success: boolean; error?: string }> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get existing document to increment version
    const { data: existingDoc, error: fetchError } = await supabase
      .from('rams_documents')
      .select('version')
      .eq('id', documentId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingDoc) {
      return { success: false, error: 'Document not found' };
    }

    // Update database record with full data
    const { error: updateError } = await supabase
      .from('rams_documents')
      .update({
        project_name: ramsData.projectName,
        location: ramsData.location,
        assessor: ramsData.assessor,
        contractor: ramsData.contractor || null,
        supervisor: ramsData.supervisor || null,
        activities: ramsData.activities as any,
        risks: ramsData.risks as any,
        required_ppe: ramsData.requiredPPE || [],
        ppe_details: (ramsData.ppeDetails || null) as any,
        version: (existingDoc.version || 1) + 1,
        updated_at: new Date().toISOString(),
        ai_generation_metadata: {
          updated_at: new Date().toISOString(),
          method_steps_count: methodData.steps?.length || 0,
          risk_count: ramsData.risks?.length || 0,
        } as any,
      })
      .eq('id', documentId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    // Also persist method statement steps if provided
    if (methodData?.steps && methodData.steps.length > 0) {
      const methodPayload = {
        user_id: user.id,
        rams_document_id: documentId,
        job_title: methodData.jobTitle || ramsData.projectName,
        location: methodData.location || ramsData.location,
        contractor: methodData.contractor || ramsData.contractor || '',
        supervisor: methodData.supervisor || ramsData.supervisor || '',
        work_type: methodData.workType || 'Electrical Installation',
        duration: methodData.duration || null,
        team_size: methodData.teamSize || null,
        description: methodData.description || null,
        overall_risk_level: methodData.overallRiskLevel || 'medium',
        review_date: methodData.reviewDate || null,
        approved_by: methodData.approvedBy || null,
        steps: methodData.steps as unknown as any,
        tools_required: methodData.toolsRequired || [],
        materials_required: methodData.materialsRequired || [],
        practical_tips: methodData.practicalTips || [],
        common_mistakes: methodData.commonMistakes || [],
        total_estimated_time: methodData.totalEstimatedTime || null,
        difficulty_level: methodData.difficultyLevel || null,
        compliance_regulations: methodData.complianceRegulations || [],
        compliance_warnings: methodData.complianceWarnings || [],
        status: 'draft' as const,
        updated_at: new Date().toISOString(),
      };

      // Check if a method statement row already exists for this RAMS document
      const { data: existing } = await supabase
        .from('method_statements')
        .select('id')
        .eq('rams_document_id', documentId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('method_statements')
          .update(methodPayload)
          .eq('id', existing.id);
      } else {
        await supabase.from('method_statements').insert([methodPayload]);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating RAMS document:', error);
    return { success: false, error: 'Failed to update document' };
  }
}
