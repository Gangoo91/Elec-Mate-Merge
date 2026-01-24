import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/**
 * Proxy PDF files to bypass CORS restrictions
 * Fetches PDF from external URL and returns it with proper headers
 */
Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pdfUrl } = await req.json();

    if (!pdfUrl) {
      return new Response(
        JSON.stringify({ error: 'No PDF URL provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[proxy-pdf] Fetching PDF from:', pdfUrl.substring(0, 80) + '...');

    // Fetch the PDF from the external URL
    const response = await fetch(pdfUrl);

    if (!response.ok) {
      console.error('[proxy-pdf] Failed to fetch:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: `Failed to fetch PDF: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the PDF as an ArrayBuffer
    const pdfBuffer = await response.arrayBuffer();
    console.log('[proxy-pdf] PDF size:', pdfBuffer.byteLength, 'bytes');

    // Return the PDF with proper headers for inline display
    return new Response(pdfBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('[proxy-pdf] Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
