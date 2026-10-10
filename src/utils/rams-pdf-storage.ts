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
  status: string = 'draft',
  opts: { generationJobId?: string; firmEmployerId?: string } = {}
): Promise<{
  success: boolean;
  error?: string;
  documentId?: string;
  /** True when this filed a NEW version of a document already on file. */
  reissued?: boolean;
  version?: number;
}> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const projectName = ramsData.projectName || 'Untitled Project';
    const location = ramsData.location || 'No location specified';

    /*
     * Is this document already on file? Matched by the generation job it came
     * from (exact), falling back to the old name + location + same-day match
     * for documents filed before the job id was recorded.
     *
     * A match used to be SKIPPED — and reported to the user as "Issued and
     * saved" — so editing a RAMS and issuing it again left Site Safety holding
     * the earlier PDF and the earlier risks. Now it files a new version of the
     * same document and keeps every earlier issue's PDF path, so nothing that
     * was handed out is lost and the current version is unambiguous.
     */
    type ExistingDoc = {
      id: string;
      version: number | null;
      pdf_url: string | null;
      status: string | null;
      updated_at: string | null;
      ai_generation_metadata: unknown;
    };
    let existingDoc: ExistingDoc | null = null;
    if (opts.generationJobId) {
      // Employer Hub: the firm's copy, whoever in the firm filed it.
      const base = supabase
        .from('rams_documents')
        .select('id, version, pdf_url, status, updated_at, ai_generation_metadata');
      const { data } = await (
        opts.firmEmployerId
          ? base.eq('employer_id' as never, opts.firmEmployerId as never)
          : base.eq('user_id', user.id)
      )
        .eq('ai_generation_metadata->>generation_job_id', opts.generationJobId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      existingDoc = (data as ExistingDoc | null) ?? null;
    }
    if (!existingDoc) {
      // Legacy match only. When this export carries a generation job id, a
      // same-name/same-day row that belongs to a DIFFERENT generated RAMS must
      // never be overwritten — so only rows filed before job ids were recorded
      // qualify.
      let q = supabase
        .from('rams_documents')
        .select('id, version, pdf_url, status, updated_at, ai_generation_metadata')
        .eq('user_id', user.id)
        .eq('project_name', projectName)
        .eq('location', location)
        .eq('date', currentDate);
      if (opts.generationJobId) q = q.is('ai_generation_metadata->>generation_job_id', null);
      const { data } = await q.order('created_at', { ascending: false }).limit(1).maybeSingle();
      existingDoc = (data as ExistingDoc | null) ?? null;
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
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return { success: false, error: uploadError.message };
    }

    console.log('PDF uploaded successfully, saving to database:', uploadData.path);

    // The method statement is filed WITH the RAMS. It used to be dropped here
    // (method_statements was never written on this path), so re-downloading an
    // issued combined RAMS from Site Safety produced an empty method section.
    const reviewRecord = (
      ramsData as RAMSData & { review?: { name: string; confirmedAt: string | null } }
    ).review?.confirmedAt
      ? (ramsData as RAMSData & { review?: unknown }).review
      : null;
    const methodSnapshot =
      methodData && (methodData.steps?.length || methodData.jobTitle) ? methodData : null;

    if (existingDoc) {
      const meta = (existingDoc.ai_generation_metadata as Record<string, unknown>) || {};
      const previous = Array.isArray(meta.previous_issues) ? meta.previous_issues : [];
      const nextVersion = (existingDoc.version || 1) + 1;
      const { error: updError } = await supabase
        .from('rams_documents')
        .update({
          project_name: projectName,
          location: location,
          assessor: ramsData.assessor || 'Not recorded',
          contractor: ramsData.contractor || methodData.contractor || null,
          supervisor: ramsData.supervisor || methodData.supervisor || null,
          activities: ramsData.activities || [],
          risks: (ramsData.risks || []) as any,
          required_ppe: ramsData.requiredPPE || [],
          ppe_details: (ramsData.ppeDetails || null) as any,
          status: status,
          pdf_url: uploadData.path,
          version: nextVersion,
          updated_at: new Date().toISOString(),
          ai_generation_metadata: {
            ...meta,
            ...(opts.generationJobId ? { generation_job_id: opts.generationJobId } : {}),
            ...(methodSnapshot ? { method_data: methodSnapshot } : {}),
            // Who checked this version and when (set on the Issue tab).
            ...(reviewRecord ? { review: reviewRecord } : {}),
            method_steps_count: methodData.steps?.length || 0,
            risk_count: ramsData.risks?.length || 0,
            previous_issues: [
              ...previous,
              {
                version: existingDoc.version || 1,
                pdf_url: existingDoc.pdf_url,
                status: existingDoc.status,
                superseded_at: new Date().toISOString(),
              },
            ],
          } as any,
        })
        .eq('id', existingDoc.id)
        .eq('user_id', user.id);
      if (updError) {
        await supabase.storage.from('rams-pdfs').remove([uploadData.path]);
        return { success: false, error: updError.message };
      }
      return { success: true, documentId: existingDoc.id, reissued: true, version: nextVersion };
    }

    // Save reference in database with full RAMS data
    const { data: docData, error: dbError } = await supabase
      .from('rams_documents')
      .insert([
        {
          user_id: user.id,
          project_name: projectName,
          location: location,
          date: ramsData.date || currentDate,
          // Never 'AI Generated': the assessor is a person who reviews the
          // draft. Blank on the form means nobody was named.
          assessor: ramsData.assessor || 'Not recorded',
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
            ...(opts.generationJobId ? { generation_job_id: opts.generationJobId } : {}),
            ...(methodSnapshot ? { method_data: methodSnapshot } : {}),
            // Who checked this version and when (set on the Issue tab).
            ...(reviewRecord ? { review: reviewRecord } : {}),
            generated_at: new Date().toISOString(),
            method_steps_count: methodData.steps?.length || 0,
            risk_count: ramsData.risks?.length || 0,
          } as any,
        },
      ])
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
        upsert: false,
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    // Update database reference
    const { error: updateError } = await supabase
      .from('rams_documents')
      .update({
        pdf_url: uploadData.path,
        updated_at: new Date().toISOString(),
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

/**
 * Save a user-uploaded RAMS PDF to storage
 * For users uploading their own existing RAMS documents
 */
export async function saveUserUploadedRAMS(
  file: File,
  metadata: {
    projectName?: string;
    location?: string;
    date?: string;
  }
): Promise<{ success: boolean; error?: string; documentId?: string }> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return { success: false, error: 'Only PDF files are allowed' };
    }

    // Validate file size (50MB max for scanned documents)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return { success: false, error: 'File size exceeds 50MB limit' };
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const projectName = metadata.projectName || file.name.replace('.pdf', '') || 'Uploaded RAMS';
    const location = metadata.location || 'Not specified';

    // Create unique filename for uploaded files
    const timestamp = Date.now();
    const sanitizedName = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${user.id}/uploaded_${sanitizedName}_${timestamp}.pdf`;

    console.log('Uploading user RAMS PDF to storage:', fileName);

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('rams-pdfs')
      .upload(fileName, file, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return { success: false, error: uploadError.message };
    }

    console.log('User RAMS PDF uploaded successfully:', uploadData.path);

    // Save reference in database
    const { data: docData, error: dbError } = await supabase
      .from('rams_documents')
      .insert([
        {
          user_id: user.id,
          project_name: projectName,
          location: location,
          date: metadata.date || currentDate,
          assessor: 'User Uploaded',
          status: 'approved', // User-uploaded docs assumed approved
          pdf_url: uploadData.path,
          source: 'user-uploaded',
          original_filename: file.name,
          risks: [], // No AI-generated risks
          activities: [],
          ai_generation_metadata: {
            uploaded_at: new Date().toISOString(),
            original_size: file.size,
            original_name: file.name,
          } as any,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Clean up uploaded file
      await supabase.storage.from('rams-pdfs').remove([uploadData.path]);
      return { success: false, error: dbError.message };
    }

    console.log('User uploaded RAMS saved successfully:', docData.id);
    return { success: true, documentId: docData.id };
  } catch (error) {
    console.error('Error saving user uploaded RAMS:', error);
    return { success: false, error: 'Failed to upload PDF' };
  }
}
