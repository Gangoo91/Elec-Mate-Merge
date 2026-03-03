import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AgentAction {
  id: string;
  action_type: string;
  description: string;
  customer_name: string | null;
  detail: string | null;
  outcome: string | null;
  undoable: boolean;
  created_at: string;
}

export function useAgentActivity(limit = 12) {
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('agent_action_log' as never)
        .select('id, action_type, description, customer_name, detail, outcome, undoable, created_at')
        .order('created_at', { ascending: false })
        .limit(limit);
      setActions((data as AgentAction[]) ?? []);
      setIsLoading(false);
    };
    fetch();
  }, [limit]);

  return { actions, isLoading };
}
