import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AgentCardProps {
  agentId: string;
  agentName: string;
  agentEmoji: string;
  response: string;
  keyPoints?: string[];
}

const AGENT_COLORS: Record<string, string> = {
  designer: 'border-blue-500/30 bg-blue-500/5',
  'cost-engineer': 'border-green-500/30 bg-green-500/5',
  installer: 'border-orange-500/30 bg-orange-500/5',
  'health-safety': 'border-red-500/30 bg-red-500/5',
  commissioning: 'border-purple-500/30 bg-purple-500/5',
  compliance: 'border-yellow-500/30 bg-yellow-500/5'
};

export const AgentCard = ({ agentId, agentName, agentEmoji, response, keyPoints }: AgentCardProps) => {
  const colorClass = AGENT_COLORS[agentId] || 'border-border bg-card';

  return (
    <Card className={`p-6 border-2 ${colorClass} animate-fade-in`}>
      <div className="flex items-start gap-4">
        {/* Agent Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center">
            <span className="text-2xl">{agentEmoji}</span>
          </div>
        </div>

        {/* Agent Content */}
        <div className="flex-1 space-y-3">
          {/* Agent Name */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{agentName}</h3>
            <Badge variant="outline" className="text-xs">
              {agentId}
            </Badge>
          </div>

          {/* Response */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>

          {/* Key Points (if provided) */}
          {keyPoints && keyPoints.length > 0 && (
            <div className="mt-4 p-4 rounded-lg bg-background/50 border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
                Key Takeaways
              </h4>
              <ul className="space-y-1">
                {keyPoints.map((point, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
