import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Database, FileText, AlertCircle } from "lucide-react";

interface ContextSource {
  name: string;
  received: boolean;
  itemCount?: number;
  details?: string;
}

interface ContextFlowIndicatorProps {
  agentId: string;
  contextSources: ContextSource[];
}

export const ContextFlowIndicator = ({ agentId, contextSources }: ContextFlowIndicatorProps) => {
  const receivedCount = contextSources.filter(s => s.received).length;
  const totalCount = contextSources.length;
  
  if (totalCount === 0) return null;
  
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Database className="h-4 w-4" />
          Context Flow - {agentId}
          <Badge variant={receivedCount === totalCount ? "default" : "secondary"} className="ml-auto">
            {receivedCount}/{totalCount} sources
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {contextSources.map((source, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between gap-3 p-2 rounded-md bg-background/50"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {source.received ? (
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{source.name}</p>
                {source.details && (
                  <p className="text-[10px] text-muted-foreground truncate">{source.details}</p>
                )}
              </div>
            </div>
            {source.itemCount !== undefined && (
              <Badge variant="outline" className="text-[10px] flex-shrink-0">
                {source.itemCount} items
              </Badge>
            )}
          </div>
        ))}
        
        {receivedCount < totalCount && (
          <div className="flex items-start gap-2 p-2 mt-2 rounded-md bg-orange-500/10 border border-orange-500/20">
            <AlertCircle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-orange-400">
              Some context missing - this agent may not have full project information
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
