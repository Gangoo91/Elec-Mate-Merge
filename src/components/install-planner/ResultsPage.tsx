import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw, Lightbulb } from "lucide-react";
import { AgentCard } from "./AgentCard";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agentName?: string;
  agentEmoji?: string;
}

interface ResultsPageProps {
  messages: Message[];
  selectedAgents: string[];
  onExport: () => void;
  onNewConsultation: () => void;
}

const AGENT_INFO: Record<string, { name: string; emoji: string }> = {
  designer: { name: 'Circuit Designer', emoji: '📐' },
  'cost-engineer': { name: 'Cost Engineer', emoji: '💷' },
  installer: { name: 'Installation Specialist', emoji: '🔧' },
  'health-safety': { name: 'Health & Safety Officer', emoji: '⚠️' },
  commissioning: { name: 'Testing & Commissioning', emoji: '✅' },
  compliance: { name: 'Compliance Specialist', emoji: '📋' }
};

export const ResultsPage = ({ messages, selectedAgents, onExport, onNewConsultation }: ResultsPageProps) => {
  // Extract agent responses from messages
  const agentResponses = messages.filter(
    m => m.role === 'assistant' && m.agentName
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-elec-yellow/20 flex items-center justify-center animate-lightbulb-pulse">
              <Lightbulb className="w-8 h-8 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Consultation Complete
              </h1>
              <p className="text-muted-foreground">
                Your installation design has been reviewed by {selectedAgents.length} specialist{selectedAgents.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Package
            </Button>
            <Button variant="outline" onClick={onNewConsultation}>
              <RotateCcw className="w-4 h-4 mr-2" />
              New Consultation
            </Button>
          </div>
        </div>
      </Card>

      {/* Consultation Timeline */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Consultation Timeline</h2>
        <div className="flex flex-wrap gap-2">
          {selectedAgents.map((agentId, idx) => {
            const agent = AGENT_INFO[agentId];
            return (
              <Badge
                key={agentId}
                variant="outline"
                className="px-3 py-2 text-sm bg-card border-border"
              >
                <span className="text-lg mr-2">{agent?.emoji || '👤'}</span>
                <span>{idx + 1}. {agent?.name || agentId}</span>
              </Badge>
            );
          })}
        </div>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Messages</div>
          <div className="text-2xl font-bold text-foreground mt-1">{messages.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Agents Consulted</div>
          <div className="text-2xl font-bold text-foreground mt-1">{selectedAgents.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Status</div>
          <div className="text-2xl font-bold text-green-500 mt-1">Complete</div>
        </Card>
      </div>

      {/* Agent Contributions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Agent Contributions</h2>
        
        {agentResponses.length > 0 ? (
          agentResponses.map((msg, idx) => (
            <AgentCard
              key={idx}
              agentId={msg.agentName || 'unknown'}
              agentName={AGENT_INFO[msg.agentName || '']?.name || msg.agentName || 'Agent'}
              agentEmoji={msg.agentEmoji || AGENT_INFO[msg.agentName || '']?.emoji || '👤'}
              response={msg.content}
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No agent responses recorded in this consultation.
            </p>
          </Card>
        )}
      </div>

      {/* Full Conversation */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Full Conversation</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-elec-yellow/10 border border-elec-yellow/30 ml-12'
                  : 'bg-card border border-border mr-12'
              }`}
            >
              <div className="text-xs text-muted-foreground mb-1">
                {msg.role === 'user' ? 'You' : msg.agentName ? `${AGENT_INFO[msg.agentName]?.name || msg.agentName}` : 'Assistant'}
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{msg.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
