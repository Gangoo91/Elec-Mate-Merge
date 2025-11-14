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
    const { data: { user } } = await supabase.auth.getUser();
    
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
          risk_count: ramsData.risks?.length || 0
        } as any
      })
      .eq('id', documentId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating RAMS document:', error);
    return { success: false, error: 'Failed to update document' };
  }
}
