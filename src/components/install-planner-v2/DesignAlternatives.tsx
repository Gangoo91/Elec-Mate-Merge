import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agentName?: string;
  structuredData?: any;
}

interface Alternative {
  id: string;
  title: string;
  approach: string;
  cableSize: number;
  protectionDevice: string;
  estimatedCost: number;
  voltageDrop: number;
  pros: string[];
  cons: string[];
  compliance: string;
}

interface DesignAlternativesProps {
  messages: Message[];
  onSelectAlternative: (alternative: Alternative, messages: Message[]) => void;
}

export const DesignAlternatives = ({ messages, onSelectAlternative }: DesignAlternativesProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const generateAlternatives = async () => {
    setIsGenerating(true);
    toast.info("Generating alternative designs...", {
      description: "AI is creating 3 different approaches"
    });

    try {
      const latestUserQuery = [...messages].reverse().find(m => m.role === 'user')?.content || '';
      const designContext = messages
        .filter(m => m.agentName === 'designer')
        .map(m => m.content)
        .join('\n\n');

      const { data, error } = await supabase.functions.invoke('generate-design-alternatives', {
        body: {
          userQuery: latestUserQuery,
          designContext,
          messages: messages.slice(-10) // Last 10 messages for context
        }
      });

      if (error) throw error;

      if (data?.alternatives && Array.isArray(data.alternatives)) {
        setAlternatives(data.alternatives);
        toast.success("3 alternatives generated!", {
          description: "Compare and choose the best option"
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating alternatives:', error);
      toast.error("Failed to generate alternatives", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAlternative = (alt: Alternative) => {
    setSelectedId(alt.id);
    
    // Create new messages with this alternative design
    const alternativeMessages: Message[] = [
      {
        role: 'assistant',
        content: `**Selected Alternative: ${alt.title}**\n\n${alt.approach}\n\n**Specification:**\n- Cable: ${alt.cableSize}mm²\n- Protection: ${alt.protectionDevice}\n- Voltage Drop: ${alt.voltageDrop}%\n- Estimated Cost: £${alt.estimatedCost}\n\n**Advantages:**\n${alt.pros.map(p => `✓ ${p}`).join('\n')}\n\n**Considerations:**\n${alt.cons.map(c => `• ${c}`).join('\n')}`,
        agentName: 'designer',
        structuredData: {
          cableSize: alt.cableSize,
          protectionDevice: alt.protectionDevice,
          voltageDrop: { percentage: alt.voltageDrop },
          estimatedCost: alt.estimatedCost
        }
      }
    ];

    onSelectAlternative(alt, alternativeMessages);
    
    toast.success(`${alt.title} selected`, {
      description: "Design updated with this alternative"
    });
  };

  if (alternatives.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            Want to see different design options?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get AI to generate 3 alternative approaches - different cable sizes, routes, or protection strategies.
          </p>
          <Button
            onClick={generateAlternatives}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating alternatives...
              </>
            ) : (
              "Show me 3 alternatives"
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Alternative Design Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alternatives.map((alt, index) => (
          <Card
            key={alt.id}
            className={`border-2 transition-all ${
              selectedId === alt.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">Option {index + 1}</Badge>
                    {alt.compliance === 'fully_compliant' && (
                      <Badge variant="default" className="bg-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Compliant
                      </Badge>
                    )}
                    {alt.compliance === 'requires_attention' && (
                      <Badge variant="destructive" className="bg-amber-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Review
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-sm font-semibold">{alt.title}</CardTitle>
                </div>
                <Button
                  size="sm"
                  variant={selectedId === alt.id ? "default" : "outline"}
                  onClick={() => handleSelectAlternative(alt)}
                >
                  {selectedId === alt.id ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Selected
                    </>
                  ) : (
                    "Select"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-foreground">{alt.approach}</p>
              
              <div className="grid grid-cols-2 gap-2 p-3 bg-muted/30 rounded-md">
                <div>
                  <span className="text-xs text-muted-foreground">Cable Size</span>
                  <p className="font-medium text-foreground">{alt.cableSize}mm²</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Protection</span>
                  <p className="font-medium text-foreground text-xs">{alt.protectionDevice}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">V-Drop</span>
                  <p className="font-medium text-foreground">{alt.voltageDrop}%</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Est. Cost</span>
                  <p className="font-medium text-foreground">£{alt.estimatedCost}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-green-600 mb-1.5">Pros:</p>
                <ul className="text-xs space-y-1 text-foreground">
                  {alt.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span className="flex-1">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-amber-600 mb-1.5">Cons:</p>
                <ul className="text-xs space-y-1 text-foreground">
                  {alt.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span className="flex-1">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button
          onClick={generateAlternatives}
          disabled={isGenerating}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Regenerating...
            </>
          ) : (
            "Generate new alternatives"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
