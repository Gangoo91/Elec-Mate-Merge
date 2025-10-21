import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Inbox, ArrowRight, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AgentType } from '@/types/agent-request';
import { toast } from 'sonner';

interface AgentTask {
  id: string;
  source_agent: string;
  context_data: any;
  user_instruction: string | null;
  created_at: string;
  priority: number;
}

interface AgentInboxProps {
  currentAgent: AgentType;
  onTaskAccept: (contextData: any, instruction: string | null) => void;
}

const AGENT_NAMES: Record<string, string> = {
  'designer': 'Circuit Designer',
  'cost-engineer': 'Cost Engineer',
  'installer': 'Installation Specialist',
  'health-safety': 'Health & Safety',
  'commissioning': 'Testing & Commissioning',
  'maintenance': 'Maintenance Specialist',
  'project-manager': 'Project Manager'
};

export const AgentInbox = ({ currentAgent, onTaskAccept }: AgentInboxProps) => {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dismissingTaskId, setDismissingTaskId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
    
    // Subscribe to new tasks
    const channel = supabase
      .channel('agent-tasks')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'agent_task_queue',
          filter: `target_agent=eq.${currentAgent}`
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentAgent]);

  const fetchTasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('agent_task_queue')
        .select('*')
        .eq('target_agent', currentAgent)
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (task: AgentTask) => {
    try {
      // Mark task as in progress
      const { error } = await supabase
        .from('agent_task_queue')
        .update({ status: 'in_progress' })
        .eq('id', task.id);

      if (error) throw error;

      // Pass context to parent
      onTaskAccept(task.context_data, task.user_instruction);
      
      // Remove from UI
      setTasks(prev => prev.filter(t => t.id !== task.id));
      
      toast.success(`Loaded context from ${AGENT_NAMES[task.source_agent]}`);
    } catch (error) {
      console.error('Error accepting task:', error);
      toast.error('Failed to accept task');
    }
  };

  const handleDismiss = async (taskId: string) => {
    setDismissingTaskId(taskId);
    try {
      const { error } = await supabase
        .from('agent_task_queue')
        .update({ status: 'cancelled' })
        .eq('id', taskId);

      if (error) throw error;
      
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task dismissed');
    } catch (error) {
      console.error('Error dismissing task:', error);
      toast.error('Failed to dismiss task');
    } finally {
      setDismissingTaskId(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return null; // Hide when no tasks
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-yellow/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Agent Inbox</CardTitle>
            <Badge variant="secondary">{tasks.length}</Badge>
          </div>
        </div>
        <CardDescription>
          Work forwarded from other agents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-start justify-between gap-4 p-3 rounded-lg border bg-background"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  From: {AGENT_NAMES[task.source_agent]}
                </span>
                {task.priority > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    Priority
                  </Badge>
                )}
              </div>
              {task.user_instruction && (
                <p className="text-sm text-muted-foreground">
                  "{task.user_instruction}"
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {new Date(task.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDismiss(task.id)}
                disabled={dismissingTaskId === task.id}
              >
                {dismissingTaskId === task.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                className="gap-2"
                onClick={() => handleAccept(task)}
              >
                Load
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
