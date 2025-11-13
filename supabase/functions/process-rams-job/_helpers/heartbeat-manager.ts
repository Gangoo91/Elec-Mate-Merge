/**
 * Manage progress heartbeat intervals
 */

import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

interface HeartbeatIntervals {
  hsInterval?: number;
  installerInterval?: number;
}

export function startHeartbeats(
  supabase: SupabaseClient,
  jobId: string,
  checkIfCancelled: (id: string) => Promise<boolean>
): HeartbeatIntervals {
  
  let hsHeartbeatProgress = 15;
  const hsInterval = setInterval(async () => {
    if (await checkIfCancelled(jobId)) {
      console.log(`🚫 Job ${jobId} cancelled during H&S heartbeat`);
      return;
    }
    if (hsHeartbeatProgress <= 45) {
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          progress: hsHeartbeatProgress,
          current_step: 'Analysing risks and generating control measures...'
        })
        .eq('id', jobId);
      hsHeartbeatProgress += 5;
    }
  }, 15000);

  let installerHeartbeatProgress = 45;
  const installerInterval = setInterval(async () => {
    if (await checkIfCancelled(jobId)) {
      console.log(`🚫 Job ${jobId} cancelled during Installer heartbeat`);
      return;
    }
    if (installerHeartbeatProgress <= 80) {
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          progress: installerHeartbeatProgress,
          current_step: 'Creating installation steps and technical specifications...'
        })
        .eq('id', jobId);
      installerHeartbeatProgress += 5;
    }
  }, 15000);

  return { hsInterval, installerInterval };
}

export function stopHeartbeats(intervals: HeartbeatIntervals): void {
  if (intervals.hsInterval) clearInterval(intervals.hsInterval);
  if (intervals.installerInterval) clearInterval(intervals.installerInterval);
}
