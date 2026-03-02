import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { documentId, documentType } = await req.json();

    if (!documentId || !documentType) {
      throw new Error('Missing documentId or documentType');
    }

    const quoteInvoiceTypes = ['quote', 'invoice'];
    const certificateTypes = [
      'eic',
      'eicr',
      'minor-works',
      'fire-alarm',
      'emergency-lighting',
      'solar-pv',
      'pat-testing',
      'ev-charging',
    ];
    const allValidTypes = [...quoteInvoiceTypes, ...certificateTypes];

    if (!allValidTypes.includes(documentType)) {
      throw new Error(
        `Invalid documentType "${documentType}". Must be one of: ${allValidTypes.join(', ')}`
      );
    }

    const isCertificate = certificateTypes.includes(documentType);

    console.log(`📄 Generating temporary PDF link for ${documentType} ${documentId}`);

    let pdfBlob: ArrayBuffer;
    let pdfDocumentId: string | undefined;

    if (isCertificate) {
      // --- Certificate path: read existing pdf_url from reports table ---
      const { data: report, error: reportError } = await userSupabase
        .from('reports')
        .select('id, user_id, pdf_url, report_type')
        .eq('id', documentId)
        .single();

      if (reportError || !report) {
        throw new Error(`Certificate not found`);
      }

      if (report.user_id !== user.id) {
        throw new Error('Unauthorised access to certificate');
      }

      if (!report.pdf_url) {
        throw new Error(
          'No PDF has been generated for this certificate yet. Please generate the PDF first, then share.'
        );
      }

      console.log('📋 Certificate PDF URL found:', report.pdf_url);

      // If the pdf_url is a Supabase storage path, create a signed URL directly
      if (report.pdf_url.startsWith('certificate-pdfs/') || report.pdf_url.startsWith('reports/')) {
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from(report.pdf_url.split('/')[0])
          .createSignedUrl(report.pdf_url.split('/').slice(1).join('/'), 604800);

        if (signedUrlError || !signedUrlData?.signedUrl) {
          console.error('Signed URL error:', signedUrlError);
          throw new Error('Failed to generate signed URL for certificate');
        }

        console.log('✅ Signed URL generated from storage path (valid 7 days)');
        return new Response(
          JSON.stringify({
            success: true,
            publicUrl: signedUrlData.signedUrl,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            fileName: report.pdf_url,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Otherwise pdf_url is an external URL — download it
      const pdfFileResponse = await fetch(report.pdf_url);
      if (!pdfFileResponse.ok) {
        throw new Error('Failed to download certificate PDF');
      }
      pdfBlob = await pdfFileResponse.arrayBuffer();
      console.log(`📦 Certificate PDF downloaded: ${pdfBlob.byteLength} bytes`);
    } else {
      // --- Quote/Invoice path: generate via PDF Monkey ---
      const { data: document, error: docError } = await userSupabase
        .from('quotes')
        .select('*')
        .eq('id', documentId)
        .single();

      if (docError || !document) {
        throw new Error(`${documentType} not found`);
      }

      if (document.user_id !== user.id) {
        throw new Error('Unauthorised access to document');
      }

      const { data: companyProfile } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log('🔨 Generating PDF via PDF Monkey...');
      const pdfResponse = await fetch(`${supabaseUrl}/functions/v1/generate-pdf-monkey`, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quote: document,
          companyProfile: companyProfile,
          invoice_mode: documentType === 'invoice',
          force_regenerate: true,
        }),
      });

      if (!pdfResponse.ok) {
        const errorText = await pdfResponse.text();
        console.error('PDF Monkey error:', errorText);
        throw new Error('Failed to generate PDF');
      }

      const pdfData = await pdfResponse.json();
      let pdfDownloadUrl = pdfData?.downloadUrl;
      pdfDocumentId = pdfData?.documentId;

      if (!pdfDownloadUrl && pdfDocumentId) {
        console.log('⏳ Polling for PDF completion...');
        for (let i = 0; i < 45; i++) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const statusResponse = await fetch(`${supabaseUrl}/functions/v1/generate-pdf-monkey`, {
            method: 'POST',
            headers: {
              Authorization: authHeader,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ documentId: pdfDocumentId, mode: 'status' }),
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
      const pdfFileResponse = await fetch(pdfDownloadUrl);
      if (!pdfFileResponse.ok) {
        throw new Error('Failed to download PDF from PDF Monkey');
      }
      pdfBlob = await pdfFileResponse.arrayBuffer();
      console.log(`📦 PDF downloaded: ${pdfBlob.byteLength} bytes`);
    }

    // Upload to Supabase Storage
    const fileName = `${user.id}/${documentType}_${documentId}_${Date.now()}.pdf`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('temp-pdfs')
      .upload(fileName, pdfBlob, {
        contentType: 'application/pdf',
        cacheControl: '604800', // 7 days
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Failed to upload PDF: ${uploadError.message}`);
    }

    console.log('☁️ PDF uploaded to storage:', uploadData.path);

    // Generate signed URL (valid for 7 days)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('temp-pdfs')
      .createSignedUrl(fileName, 604800);

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error('Signed URL error:', signedUrlError);
      throw new Error('Failed to generate signed URL');
    }

    const publicUrl = signedUrlData.signedUrl;
    console.log('✅ Signed URL generated (valid 7 days):', publicUrl);

    // Update quote/invoice with PDF metadata (for tracking)
    if (!isCertificate && pdfDocumentId) {
      const { data: document } = await userSupabase
        .from('quotes')
        .select('pdf_version')
        .eq('id', documentId)
        .single();
      const newVersion = (((document as Record<string, unknown>)?.pdf_version as number) || 0) + 1;
      await supabase
        .from('quotes')
        .update({
          pdf_document_id: pdfDocumentId,
          pdf_generated_at: new Date().toISOString(),
          pdf_version: newVersion,
        })
        .eq('id', documentId);
    }

    return new Response(
      JSON.stringify({
        success: true,
        publicUrl,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        fileName,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: unknown) {
    console.error('❌ Error in generate-temporary-pdf-link:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate temporary PDF link',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
