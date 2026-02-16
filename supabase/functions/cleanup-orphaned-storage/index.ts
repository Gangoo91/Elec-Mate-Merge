import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    // Verify user is authenticated
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    const stats = {
      safetyDocuments: { checked: 0, orphaned: 0, cleaned: 0 },
      ramsPdfs: { checked: 0, orphaned: 0, cleaned: 0 },
      safetyPhotos: { checked: 0, orphaned: 0, cleaned: 0 },
    };

    // Clean orphaned files from safety-documents bucket
    const { data: safetyFiles } = await supabase.storage
      .from('safety-documents')
      .list(user.id, { limit: 500 });

    if (safetyFiles) {
      stats.safetyDocuments.checked = safetyFiles.length;

      // Get all pdf_url values from safety tables for this user
      const pdfUrls = new Set<string>();
      const tables = [
        'permits_to_work',
        'coshh_assessments',
        'inspection_checklists',
        'accident_records',
        'near_miss_reports',
        'safety_observations',
        'electrician_site_diary',
        'safe_isolation_records',
        'fire_watch_records',
        'safety_equipment',
      ];

      for (const table of tables) {
        const { data: rows } = await supabase
          .from(table)
          .select('pdf_url')
          .eq('user_id', user.id)
          .not('pdf_url', 'is', null);

        if (rows) {
          for (const row of rows) {
            if (row.pdf_url) pdfUrls.add(row.pdf_url);
          }
        }
      }

      // Find files not referenced by any table
      const orphaned: string[] = [];
      for (const file of safetyFiles) {
        const fullPath = `${user.id}/${file.name}`;
        const { data: urlData } = supabase.storage
          .from('safety-documents')
          .getPublicUrl(fullPath);

        if (!pdfUrls.has(urlData.publicUrl)) {
          // Only clean files older than 24 hours to avoid race conditions
          const fileDate = new Date(file.created_at);
          const oneDayAgo = new Date(Date.now() - 86400000);
          if (fileDate < oneDayAgo) {
            orphaned.push(fullPath);
          }
        }
      }

      stats.safetyDocuments.orphaned = orphaned.length;

      if (orphaned.length > 0) {
        const { error: removeError } = await supabase.storage
          .from('safety-documents')
          .remove(orphaned);

        if (!removeError) {
          stats.safetyDocuments.cleaned = orphaned.length;
        }
      }
    }

    // Clean orphaned files from rams-pdfs bucket
    const { data: ramsFiles } = await supabase.storage
      .from('rams-pdfs')
      .list(user.id, { limit: 500 });

    if (ramsFiles) {
      stats.ramsPdfs.checked = ramsFiles.length;

      const { data: ramsDocs } = await supabase
        .from('rams_documents')
        .select('pdf_url')
        .eq('user_id', user.id)
        .not('pdf_url', 'is', null);

      const ramsUrls = new Set((ramsDocs || []).map((r) => r.pdf_url).filter(Boolean));

      const orphanedRams: string[] = [];
      for (const file of ramsFiles) {
        const fullPath = `${user.id}/${file.name}`;
        const { data: urlData } = supabase.storage
          .from('rams-pdfs')
          .getPublicUrl(fullPath);

        if (!ramsUrls.has(urlData.publicUrl)) {
          const fileDate = new Date(file.created_at);
          const oneDayAgo = new Date(Date.now() - 86400000);
          if (fileDate < oneDayAgo) {
            orphanedRams.push(fullPath);
          }
        }
      }

      stats.ramsPdfs.orphaned = orphanedRams.length;

      if (orphanedRams.length > 0) {
        const { error: removeError } = await supabase.storage
          .from('rams-pdfs')
          .remove(orphanedRams);

        if (!removeError) {
          stats.ramsPdfs.cleaned = orphanedRams.length;
        }
      }
    }

    // Clean orphaned safety photos
    const { data: photoFiles } = await supabase.storage
      .from('safety-photos')
      .list(user.id, { limit: 500 });

    if (photoFiles) {
      stats.safetyPhotos.checked = photoFiles.length;

      const { data: photoRows } = await supabase
        .from('safety_photos')
        .select('storage_path')
        .eq('user_id', user.id);

      const photoPaths = new Set((photoRows || []).map((r) => r.storage_path).filter(Boolean));

      const orphanedPhotos: string[] = [];
      for (const file of photoFiles) {
        const fullPath = `${user.id}/${file.name}`;
        if (!photoPaths.has(fullPath)) {
          const fileDate = new Date(file.created_at);
          const oneDayAgo = new Date(Date.now() - 86400000);
          if (fileDate < oneDayAgo) {
            orphanedPhotos.push(fullPath);
          }
        }
      }

      stats.safetyPhotos.orphaned = orphanedPhotos.length;

      if (orphanedPhotos.length > 0) {
        const { error: removeError } = await supabase.storage
          .from('safety-photos')
          .remove(orphanedPhotos);

        if (!removeError) {
          stats.safetyPhotos.cleaned = orphanedPhotos.length;
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        stats,
        message: `Cleaned ${stats.safetyDocuments.cleaned + stats.ramsPdfs.cleaned + stats.safetyPhotos.cleaned} orphaned files`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
