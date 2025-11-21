import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

/**
 * Guard Design Knowledge Intelligence Deletions
 * 🛡️ CRITICAL PROTECTION: Prevents accidental bulk deletions from enriched intelligence data
 * 
 * This table contains AI-enriched design intelligence (7,212 facets from 904 sources)
 * Blocks deletes of >10 rows to protect high-value data
 * 
 * Actions:
 * - check_delete_safety: Validates if delete count is within limits
 * - soft_delete: Archives entries instead of hard deleting
 * - restore_soft_deleted: Unarchives entries
 * - emergency_restore: Restore all recently archived entries
 */

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, deleteCount, reason, ids } = await req.json();

    // CRITICAL: Maximum safe deletion threshold - Very restrictive for enriched data!
    const MAX_SAFE_DELETE = 10;

    // ===================================================
    // ACTION: check_delete_safety
    // ===================================================
    if (action === 'check_delete_safety') {
      if (deleteCount > MAX_SAFE_DELETE) {
        return new Response(
          JSON.stringify({
            safe: false,
            message: `⛔ BLOCKED: Cannot delete ${deleteCount} design_knowledge_intelligence rows at once. Maximum allowed: ${MAX_SAFE_DELETE}.\n\n` +
                     `This table contains enriched AI intelligence data (7,212 facets). Use soft-delete (archive) instead.`,
            maxAllowed: MAX_SAFE_DELETE,
            requestedCount: deleteCount,
            recommendation: 'Use soft_delete action to archive instead of deleting'
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
          requestedCount: deleteCount,
          warning: 'Consider using soft_delete to preserve data for recovery'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ===================================================
    // ACTION: soft_delete (Archive instead of delete)
    // ===================================================
    if (action === 'soft_delete') {
      if (!ids || ids.length === 0) {
        throw new Error('No IDs provided for soft delete');
      }

      const { error } = await supabase
        .from('design_knowledge_intelligence')
        .update({ 
          is_archived: true, 
          archived_at: new Date().toISOString(),
          archived_by: reason || 'admin'
        })
        .in('id', ids);

      if (error) throw error;

      // Log to audit trail
      console.log(`🗃️ ARCHIVED: ${ids.length} intelligence entries`, {
        ids: ids.slice(0, 5),
        reason,
        timestamp: new Date().toISOString()
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: `✅ Archived ${ids.length} design_knowledge_intelligence entries (data preserved for recovery)`,
          archivedCount: ids.length,
          canRestore: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ===================================================
    // ACTION: restore_soft_deleted
    // ===================================================
    if (action === 'restore_soft_deleted') {
      if (!ids || ids.length === 0) {
        throw new Error('No IDs provided for restoration');
      }

      const { error } = await supabase
        .from('design_knowledge_intelligence')
        .update({ 
          is_archived: false, 
          archived_at: null,
          archived_by: null
        })
        .in('id', ids);

      if (error) throw error;

      console.log(`♻️ RESTORED: ${ids.length} intelligence entries`, {
        ids: ids.slice(0, 5),
        timestamp: new Date().toISOString()
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: `✅ Restored ${ids.length} design_knowledge_intelligence entries`,
          restoredCount: ids.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ===================================================
    // ACTION: emergency_restore (Restore all recently archived)
    // ===================================================
    if (action === 'emergency_restore') {
      const hoursAgo = 24; // Restore items archived in last 24 hours
      const cutoffTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

      const { data: recentArchived, error: fetchError } = await supabase
        .from('design_knowledge_intelligence')
        .select('id')
        .eq('is_archived', true)
        .gte('archived_at', cutoffTime);

      if (fetchError) throw fetchError;

      if (!recentArchived || recentArchived.length === 0) {
        return new Response(
          JSON.stringify({
            success: true,
            message: `No archived entries found in last ${hoursAgo} hours`,
            restoredCount: 0
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const restoreIds = recentArchived.map(r => r.id);
      const { error: restoreError } = await supabase
        .from('design_knowledge_intelligence')
        .update({ 
          is_archived: false, 
          archived_at: null,
          archived_by: null
        })
        .in('id', restoreIds);

      if (restoreError) throw restoreError;

      console.log(`🚨 EMERGENCY RESTORE: ${restoreIds.length} entries`, {
        cutoffTime,
        timestamp: new Date().toISOString()
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: `✅ Emergency restore complete: ${restoreIds.length} entries recovered from last ${hoursAgo} hours`,
          restoredCount: restoreIds.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ===================================================
    // ACTION: get_stats
    // ===================================================
    if (action === 'get_stats') {
      const { data: stats, error } = await supabase
        .from('design_knowledge_intelligence')
        .select('is_archived', { count: 'exact', head: true });

      const { count: totalCount } = stats || { count: 0 };

      const { data: archivedStats, error: archivedError } = await supabase
        .from('design_knowledge_intelligence')
        .select('is_archived', { count: 'exact', head: true })
        .eq('is_archived', true);

      const { count: archivedCount } = archivedStats || { count: 0 };

      if (error || archivedError) throw error || archivedError;

      return new Response(
        JSON.stringify({
          success: true,
          total: totalCount,
          active: totalCount - archivedCount,
          archived: archivedCount,
          protectionLevel: 'MAX',
          maxSafeDelete: MAX_SAFE_DELETE
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: 'Invalid action',
        validActions: ['check_delete_safety', 'soft_delete', 'restore_soft_deleted', 'emergency_restore', 'get_stats']
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Guard function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
