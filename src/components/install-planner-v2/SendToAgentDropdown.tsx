import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { AgentType } from '@/types/agent-request';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Agent {
  id: AgentType;
  name: string;
  description: string;
}

const AVAILABLE_AGENTS: Agent[] = [
  { id: 'designer', name: 'Circuit Designer', description: 'Multi-circuit design & cable sizing' },
  { id: 'cost-engineer', name: 'Cost Engineer', description: 'Material pricing & labour costs' },
  { id: 'installer', name: 'Installation Specialist', description: 'Installation methods & guidance' },
  { id: 'health-safety', name: 'Health & Safety', description: 'RAMS & risk assessments' },
  { id: 'commissioning', name: 'Testing & Commissioning', description: 'Test procedures & EIC' },
  { id: 'maintenance', name: 'Maintenance Specialist', description: 'Periodic inspections' },
  { id: 'project-manager', name: 'Project Manager', description: 'Project execution planning' }
];

interface SendToAgentDropdownProps {
  currentAgent: AgentType;
  currentOutput: any;
  onSent?: () => void;
}

export const SendToAgentDropdown = ({ currentAgent, currentOutput, onSent }: SendToAgentDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedAgents, setSelectedAgents] = useState<AgentType[]>([]);
  const [userInstruction, setUserInstruction] = useState('');
  const [isSending, setIsSending] = useState(false);

  const availableAgents = AVAILABLE_AGENTS.filter(a => a.id !== currentAgent);

  const toggleAgent = (agentId: AgentType) => {
    setSelectedAgents(prev =>
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleSend = async () => {
    if (selectedAgents.length === 0) {
      toast.error('Please select at least one agent');
      return;
    }

    setIsSending(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create task queue entries for each selected agent
      const tasks = selectedAgents.map(targetAgent => ({
        user_id: user.id,
        source_agent: currentAgent,
        target_agent: targetAgent,
        context_data: currentOutput,
        user_instruction: userInstruction || null,
        status: 'pending',
        priority: 0
      }));

      const { error } = await supabase
        .from('agent_task_queue')
        .insert(tasks);

      if (error) throw error;

      toast.success(`Forwarded to ${selectedAgents.length} agent${selectedAgents.length > 1 ? 's' : ''}`, {
        description: 'Check their respective pages to continue'
      });

      setSelectedAgents([]);
      setUserInstruction('');
      setOpen(false);
      onSent?.();

    } catch (error) {
      console.error('Error sending to agents:', error);
      toast.error('Failed to forward to agents');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Send className="h-4 w-4" />
          Send to Agent
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Forward to:</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableAgents.map(agent => (
                <div key={agent.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={agent.id}
                    checked={selectedAgents.includes(agent.id)}
                    onCheckedChange={() => toggleAgent(agent.id)}
                  />
                  <div className="grid gap-1 flex-1">
                    <Label
                      htmlFor={agent.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {agent.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {agent.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="instruction" className="text-sm font-medium mb-2">
              Instructions (optional)
            </Label>
            <Textarea
              id="instruction"
              placeholder="Add specific instructions for the agents..."
              value={userInstruction}
              onChange={(e) => setUserInstruction(e.target.value)}
              className="resize-none h-20"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handleSend}
              disabled={isSending || selectedAgents.length === 0}
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send ({selectedAgents.length})
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
