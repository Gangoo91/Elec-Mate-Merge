/**
 * maintenance-pdf-proxy
 *
 * Called by openOrDownloadPdf() on iOS native — opened in Safari, not WKWebView.
 * Polls PDFMonkey server-to-server for up to 60 seconds, then streams the
 * PDF bytes directly so Safari triggers a native download / PDF viewer.
 *
 * No auth required (verify_jwt = false) — the documentId UUID is unguessable.
 * GET /maintenance-pdf-proxy?id=<documentId>&filename=<name>
 */

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');

Deno.serve(async (req: Request) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const documentId = url.searchParams.get('id');
    const filename = url.searchParams.get('filename') || 'Maintenance Instructions.pdf';

    if (!documentId) {
      return new Response('Missing document ID', { status: 400 });
    }

    if (!PDFMONKEY_API_KEY) {
      return new Response('PDF service not configured', { status: 500 });
    }

    console.log('[MAINT-PROXY] Polling for documentId:', documentId);

    // Poll PDFMonkey — max 60 seconds, 500ms intervals
    const maxAttempts = 120;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
        { headers: { Authorization: `Bearer ${PDFMONKEY_API_KEY}` } }
      );

      if (!statusResponse.ok) {
        console.warn('[MAINT-PROXY] Status check failed:', statusResponse.status);
        continue;
      }

      const statusData = await statusResponse.json();
      const status = statusData.document?.status;
      const downloadUrl = statusData.document?.download_url;

      console.log('[MAINT-PROXY] Status:', status, `(attempt ${attempt + 1}/${maxAttempts})`);

      if (status === 'success' && downloadUrl) {
        // Fetch the PDF bytes from PDFMonkey's S3 URL
        const pdfResponse = await fetch(downloadUrl);
        if (!pdfResponse.ok) {
          return new Response('Failed to fetch PDF from storage', { status: 502 });
        }

        const pdfBytes = await pdfResponse.arrayBuffer();
        console.log('[MAINT-PROXY] Streaming', pdfBytes.byteLength, 'bytes for', filename);

        // Return PDF bytes — Safari triggers native PDF viewer / download
        return new Response(pdfBytes, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': String(pdfBytes.byteLength),
          },
        });
      }

      if (status === 'failure') {
        console.error('[MAINT-PROXY] PDFMonkey generation failed for:', documentId);
        return new Response('PDF generation failed', { status: 500 });
      }

      // 'pending' or 'generating' — keep polling
    }

    console.warn('[MAINT-PROXY] Timeout for documentId:', documentId);
    return new Response('PDF generation timed out — please try again', { status: 504 });

  } catch (error) {
    console.error('[MAINT-PROXY] Error:', (error as Error).message);
    return new Response('Internal error', { status: 500 });
  }
});
