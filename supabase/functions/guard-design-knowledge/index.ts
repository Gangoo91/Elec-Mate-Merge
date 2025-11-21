import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

/**
 * Guard Design Knowledge Deletes
 * Prevents accidental bulk deletions from design_knowledge table
 * Blocks deletes of >50 rows to protect enriched intelligence data
 */

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, deleteCount, reason } = await req.json();

    // Maximum safe deletion threshold
    const MAX_SAFE_DELETE = 50;

    if (action === 'check_delete_safety') {
      if (deleteCount > MAX_SAFE_DELETE) {
        return new Response(
          JSON.stringify({
            safe: false,
            message: `⛔ BLOCKED: Cannot delete ${deleteCount} design_knowledge rows at once. Maximum allowed: ${MAX_SAFE_DELETE}. Use soft-delete (is_active=false) instead.`,
            maxAllowed: MAX_SAFE_DELETE,
            requestedCount: deleteCount
          }),
          { 
            status: 403, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      return new Response(
        JSON.stringify({
          safe: true,
          message: `✅ Delete request is within safe limits (${deleteCount}/${MAX_SAFE_DELETE})`,
          maxAllowed: MAX_SAFE_DELETE,
          requestedCount: deleteCount
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'soft_delete') {
      const { ids } = await req.json();
      
      if (!ids || ids.length === 0) {
        throw new Error('No IDs provided for soft delete');
      }

      const { error } = await supabase
        .from('design_knowledge')
        .update({ 
          is_active: false, 
          deleted_at: new Date().toISOString(),
          last_modified_by: 'admin'
        })
        .in('id', ids);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          message: `✅ Soft-deleted ${ids.length} design_knowledge entries (intelligence preserved)`,
          deletedCount: ids.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'restore_soft_deleted') {
      const { ids } = await req.json();
      
      if (!ids || ids.length === 0) {
        throw new Error('No IDs provided for restoration');
      }

      const { error } = await supabase
        .from('design_knowledge')
        .update({ 
          is_active: true, 
          deleted_at: null,
          last_modified_by: 'admin'
        })
        .in('id', ids);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          message: `✅ Restored ${ids.length} design_knowledge entries`,
          restoredCount: ids.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Guard function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
