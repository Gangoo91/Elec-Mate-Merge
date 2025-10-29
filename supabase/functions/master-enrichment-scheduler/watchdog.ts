/**
 * Batch Timeout Watchdog
 * Automatically recovers stuck batches that have been processing for too long
 */

const BATCH_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export async function autoRecoverStuckBatches(supabase: any): Promise<number> {
  const timeoutThreshold = new Date(Date.now() - BATCH_TIMEOUT_MS).toISOString();
  
  const { data: stuckBatches } = await supabase
    .from('batch_progress')
    .select('*, batch_jobs!inner(job_type, status)')
    .eq('status', 'processing')
    .lt('started_at', timeoutThreshold);
  
  if (!stuckBatches || stuckBatches.length === 0) {
    return 0;
  }
  
  console.log(`🔧 Watchdog: Recovering ${stuckBatches.length} stuck batches (>15min)`);
  
  for (const batch of stuckBatches) {
    await supabase.from('batch_progress').update({
      status: 'pending',
      started_at: null,
      error_message: 'Auto-recovered by watchdog (timeout >15min)'
    }).eq('id', batch.id);
  }
  
  return stuckBatches.length;
}
