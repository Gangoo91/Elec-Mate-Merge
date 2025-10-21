import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // User-scoped client for RLS
    const userSupabase = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await userSupabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { documentId, documentType } = await req.json();

    if (!documentId || !documentType) {
      throw new Error('Missing documentId or documentType');
    }

    if (!['quote', 'invoice'].includes(documentType)) {
      throw new Error('Invalid documentType. Must be "quote" or "invoice"');
    }

    console.log(`📄 Generating temporary PDF link for ${documentType} ${documentId}`);

    // Step 1: Fetch the document data
    const { data: document, error: docError } = await userSupabase
      .from('quotes')
      .select('*')
      .eq('id', documentId)
      .single();

    if (docError || !document) {
      throw new Error(`${documentType} not found`);
    }

    // Verify ownership
    if (document.user_id !== user.id) {
      throw new Error('Unauthorized access to document');
    }

    // Step 2: Fetch company profile
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Step 3: Generate PDF using PDF Monkey
    console.log('🔨 Generating PDF via PDF Monkey...');
    const pdfResponse = await fetch(`${supabaseUrl}/functions/v1/generate-pdf-monkey`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quote: document,
        companyProfile: companyProfile,
        invoice_mode: documentType === 'invoice',
        force_regenerate: true
      })
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error('PDF Monkey error:', errorText);
      throw new Error('Failed to generate PDF');
    }

    const pdfData = await pdfResponse.json();
    let pdfDownloadUrl = pdfData?.downloadUrl;
    const pdfDocumentId = pdfData?.documentId;

    // Poll for PDF if not immediately available
    if (!pdfDownloadUrl && pdfDocumentId) {
      console.log('⏳ Polling for PDF completion...');
      for (let i = 0; i < 45; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const statusResponse = await fetch(`${supabaseUrl}/functions/v1/generate-pdf-monkey`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ documentId: pdfDocumentId, mode: 'status' })
        });
        const statusData = await statusResponse.json();
        if (statusData?.downloadUrl) {
          pdfDownloadUrl = statusData.downloadUrl;
          break;
        }
      }
    }

    if (!pdfDownloadUrl) {
      throw new Error('PDF generation timed out');
    }

    console.log('✅ PDF generated, downloading...');

    // Step 4: Download the PDF from PDF Monkey
    const pdfFileResponse = await fetch(pdfDownloadUrl);
    if (!pdfFileResponse.ok) {
      throw new Error('Failed to download PDF from PDF Monkey');
    }

    const pdfBlob = await pdfFileResponse.arrayBuffer();
    console.log(`📦 PDF downloaded: ${pdfBlob.byteLength} bytes`);

    // Step 5: Upload to Supabase Storage
    const fileName = `${user.id}/${documentType}_${documentId}_${Date.now()}.pdf`;
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('temp-pdfs')
      .upload(fileName, pdfBlob, {
        contentType: 'application/pdf',
        cacheControl: '604800', // 7 days
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Failed to upload PDF: ${uploadError.message}`);
    }

    console.log('☁️ PDF uploaded to storage:', uploadData.path);

    // Step 6: Generate signed URL (valid for 7 days)
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from('temp-pdfs')
      .createSignedUrl(fileName, 604800); // 7 days in seconds

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error('Signed URL error:', signedUrlError);
      throw new Error('Failed to generate signed URL');
    }

    const publicUrl = signedUrlData.signedUrl;
    console.log('✅ Signed URL generated (valid 7 days):', publicUrl);

    // Step 7: Update document with PDF metadata (optional - for tracking)
    if (pdfDocumentId) {
      const newVersion = (document.pdf_version || 0) + 1;
      await supabase
        .from('quotes')
        .update({
          pdf_document_id: pdfDocumentId,
          pdf_generated_at: new Date().toISOString(),
          pdf_version: newVersion
        })
        .eq('id', documentId);
    }

    return new Response(JSON.stringify({
      success: true,
      publicUrl,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      fileName
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('❌ Error in generate-temporary-pdf-link:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to generate temporary PDF link'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
