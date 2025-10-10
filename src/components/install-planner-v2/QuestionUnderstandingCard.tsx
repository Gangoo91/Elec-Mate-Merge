import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronDown,
  Edit
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface QuestionAnalysisData {
  userQuestion: string;
  interpretedRequirements: {
    circuitType?: string;
    load?: number;
    distance?: number;
    environment?: string;
    voltage?: number;
    phases?: string;
  };
  missingInfo: string[];
  agentPlan: Array<{
    agent: string;
    reason: string;
    priority: number;
  }>;
  estimatedComplexity: string;
  reasoning: string;
}

interface QuestionUnderstandingCardProps {
  data: QuestionAnalysisData;
  onEdit?: () => void;
}

const AGENT_EMOJI: Record<string, string> = {
  designer: '📐',
  'cost-engineer': '💷',
  installer: '🔧',
  'health-safety': '⚠️',
  commissioning: '✅'
};

export const QuestionUnderstandingCard = ({ data, onEdit }: QuestionUnderstandingCardProps) => {
  const [showReasoning, setShowReasoning] = useState(false);
  
  const complexityColor = {
    simple: 'bg-green-500/10 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    complex: 'bg-orange-500/10 text-orange-400 border-orange-500/30'
  }[data.estimatedComplexity] || 'bg-blue-500/10 text-blue-400 border-blue-500/30';

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Question Understanding
          </CardTitle>
          <Badge variant="outline" className={complexityColor}>
            {data.estimatedComplexity} design
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Detected Parameters */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Detected Requirements
          </p>
          <div className="grid grid-cols-2 gap-2">
            {data.interpretedRequirements.circuitType && (
              <div className="bg-muted/30 rounded p-2">
                <p className="text-xs text-muted-foreground">Circuit Type</p>
                <p className="text-sm font-semibold text-foreground">
                  {data.interpretedRequirements.circuitType}
                </p>
              </div>
            )}
            {data.interpretedRequirements.load && (
              <div className="bg-muted/30 rounded p-2">
                <p className="text-xs text-muted-foreground">Load</p>
                <p className="text-sm font-semibold text-foreground">
                  {data.interpretedRequirements.load}kW
                </p>
              </div>
            )}
            {data.interpretedRequirements.distance && (
              <div className="bg-muted/30 rounded p-2">
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="text-sm font-semibold text-foreground">
                  {data.interpretedRequirements.distance}m
                </p>
              </div>
            )}
            {data.interpretedRequirements.environment && (
              <div className="bg-muted/30 rounded p-2">
                <p className="text-xs text-muted-foreground">Environment</p>
                <p className="text-sm font-semibold text-foreground capitalize">
                  {data.interpretedRequirements.environment}
                </p>
              </div>
            )}
            {data.interpretedRequirements.voltage && (
              <div className="bg-muted/30 rounded p-2">
                <p className="text-xs text-muted-foreground">Voltage</p>
                <p className="text-sm font-semibold text-foreground">
                  {data.interpretedRequirements.voltage}V
                </p>
              </div>
            )}
            {data.interpretedRequirements.phases && (
              <div className="bg-muted/30 rounded p-2">
                <p className="text-xs text-muted-foreground">Supply</p>
                <p className="text-sm font-semibold text-foreground capitalize">
                  {data.interpretedRequirements.phases}-phase
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Missing Information */}
        {data.missingInfo.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-yellow-400 mb-1">
                  Assumptions Required
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {data.missingInfo.map((info, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px] bg-background/50">
                      {info}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agent Plan Flow */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Consultation Plan
          </p>
          <div className="flex items-center flex-wrap gap-2">
            {data.agentPlan.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background/50">
                  {AGENT_EMOJI[step.agent]} {step.agent}
                </Badge>
                {idx < data.agentPlan.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Reasoning (Expandable) */}
        <Collapsible open={showReasoning} onOpenChange={setShowReasoning}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-xs h-8"
            >
              <span>AI Reasoning</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showReasoning ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="pt-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {data.reasoning}
            </p>
          </CollapsibleContent>
        </Collapsible>

        {/* Edit Button (if provided) */}
        {onEdit && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEdit}
            className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <Edit className="h-3 w-3 mr-2" />
            Edit Requirements
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
