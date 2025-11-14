import { supabase } from '@/integrations/supabase/client';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';

export { updateRAMSDocument } from './rams-pdf-storage-update';

/**
 * Upload a PDF blob to Supabase Storage and save reference in database
 */
export async function saveRAMSPDFToStorage(
  pdfBlob: Blob,
  ramsData: RAMSData,
  methodData: Partial<MethodStatementData>,
  status: string = 'draft'
): Promise<{ success: boolean; error?: string; documentId?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const projectName = ramsData.projectName || 'Untitled Project';
    const location = ramsData.location || 'No location specified';

    // Check for existing document with same name/location/date to prevent duplicates
    const { data: existingDoc } = await supabase
      .from('rams_documents')
      .select('id')
      .eq('user_id', user.id)
      .eq('project_name', projectName)
      .eq('location', location)
      .eq('date', currentDate)
      .maybeSingle();

    if (existingDoc) {
      console.log('Duplicate detected, skipping save');
      return { success: false, error: 'Document already saved today for this project/location' };
    }

    // Create unique filename
    const timestamp = Date.now();
    const sanitizedName = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${user.id}/${sanitizedName}_${timestamp}.pdf`;

    console.log('Uploading PDF to storage:', fileName);

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('rams-pdfs')
      .upload(fileName, pdfBlob, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return { success: false, error: uploadError.message };
    }

    console.log('PDF uploaded successfully, saving to database:', uploadData.path);

    // Save reference in database with full RAMS data
    const { data: docData, error: dbError } = await supabase
      .from('rams_documents')
      .insert([{
        user_id: user.id,
        project_name: projectName,
        location: location,
        date: ramsData.date || currentDate,
        assessor: ramsData.assessor || 'AI Generated',
        contractor: ramsData.contractor || methodData.contractor || null,
        supervisor: ramsData.supervisor || methodData.supervisor || null,
        activities: ramsData.activities || [],
        risks: (ramsData.risks || []) as any,
        required_ppe: ramsData.requiredPPE || [],
        ppe_details: (ramsData.ppeDetails || null) as any,
        status: status,
        pdf_url: uploadData.path,
        job_scale: (methodData as any)?.jobScale || null,
        ai_generation_metadata: {
          generated_at: new Date().toISOString(),
          method_steps_count: methodData.steps?.length || 0,
          risk_count: ramsData.risks?.length || 0
        } as any
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Clean up uploaded file
      await supabase.storage.from('rams-pdfs').remove([uploadData.path]);
      return { success: false, error: dbError.message };
    }

    console.log('Document saved successfully:', docData.id);
    return { success: true, documentId: docData.id };
  } catch (error) {
    console.error('Error saving RAMS PDF:', error);
    return { success: false, error: 'Failed to save PDF' };
  }
}

/**
 * Update existing RAMS document PDF
 */
export async function updateRAMSPDFInStorage(
  documentId: string,
  pdfBlob: Blob,
  projectName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get existing document
    const { data: existingDoc, error: fetchError } = await supabase
      .from('rams_documents')
      .select('pdf_url')
      .eq('id', documentId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingDoc) {
      return { success: false, error: 'Document not found' };
    }

    // Delete old PDF if exists
    if (existingDoc.pdf_url) {
      await supabase.storage.from('rams-pdfs').remove([existingDoc.pdf_url]);
    }

    // Upload new PDF
    const timestamp = Date.now();
    const sanitizedName = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${user.id}/${sanitizedName}_${timestamp}.pdf`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('rams-pdfs')
      .upload(fileName, pdfBlob, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    // Update database reference
    const { error: updateError } = await supabase
      .from('rams_documents')
      .update({ 
        pdf_url: uploadData.path,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId);

    if (updateError) {
      // Clean up uploaded file
      await supabase.storage.from('rams-pdfs').remove([uploadData.path]);
      return { success: false, error: updateError.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating RAMS PDF:', error);
    return { success: false, error: 'Failed to update PDF' };
  }
}
