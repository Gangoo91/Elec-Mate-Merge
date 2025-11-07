import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComplianceChecklistProps {
  complianceTimeline?: {
    beforeWork?: Array<{
      what: string;
      when: string;
      how?: string;
      cost?: string;
      consequence?: string;
    }>;
    duringWork?: Array<{
      what: string;
      when: string;
      who?: string;
      consequence?: string;
    }>;
    afterWork?: Array<{
      what: string;
      when: string;
      giveClient?: string;
      consequence?: string;
    }>;
  };
  compliance?: {
    notifications?: string[];
    certifications?: string[];
    inspections?: string[];
  };
}

const ComplianceChecklist = ({ complianceTimeline, compliance }: ComplianceChecklistProps) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const hasBeforeWork = complianceTimeline?.beforeWork && complianceTimeline.beforeWork.length > 0;
  const hasDuringWork = complianceTimeline?.duringWork && complianceTimeline.duringWork.length > 0;
  const hasAfterWork = complianceTimeline?.afterWork && complianceTimeline.afterWork.length > 0;
  const hasCompliance = compliance?.notifications || compliance?.certifications || compliance?.inspections;

  if (!hasBeforeWork && !hasDuringWork && !hasAfterWork && !hasCompliance) return null;

  const toggleCheck = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderComplianceSection = (
    items: Array<any>,
    title: string,
    icon: string,
    prefix: string
  ) => (
    <div className="space-y-2">
      <h5 className="font-semibold text-sm flex items-center gap-2">
        {icon} {title}
      </h5>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const itemId = `${prefix}-${idx}`;
          const isChecked = checked[itemId] || false;
          
          return (
            <div 
              key={idx}
              className={`p-3 rounded-lg border transition-all ${
                isChecked 
                  ? 'bg-success/10 border-success/30' 
                  : 'bg-card border-border/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleCheck(itemId)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <div className={`font-medium text-sm ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                    {item.what}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold">When:</span> {item.when}
                  </div>
                  {item.how && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold">How:</span> {item.how}
                    </div>
                  )}
                  {item.who && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold">Who:</span> {item.who}
                    </div>
                  )}
                  {item.cost && (
                    <Badge variant="outline" className="text-xs">
                      {item.cost}
                    </Badge>
                  )}
                  {item.consequence && (
                    <div className="text-xs text-destructive flex items-start gap-1 mt-2 p-2 bg-destructive/10 rounded">
                      <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Consequence:</strong> {item.consequence}</span>
                    </div>
                  )}
                  {item.giveClient && (
                    <div className="text-xs bg-muted/50 p-2 rounded mt-2">
                      <span className="font-semibold">Give Client:</span> {item.giveClient}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const totalItems = 
    (complianceTimeline?.beforeWork?.length || 0) +
    (complianceTimeline?.duringWork?.length || 0) +
    (complianceTimeline?.afterWork?.length || 0);
  
  const completedItems = Object.values(checked).filter(Boolean).length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileCheck className="h-5 w-5 text-pink-400" />
            Compliance Checklist
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {completedItems}/{totalItems} complete ({completionPercentage}%)
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-pink-400 to-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasBeforeWork && renderComplianceSection(
          complianceTimeline.beforeWork!,
          'Before Work Starts',
          '✅',
          'before'
        )}
        
        {hasDuringWork && renderComplianceSection(
          complianceTimeline.duringWork!,
          'During Work',
          '🔍',
          'during'
        )}
        
        {hasAfterWork && renderComplianceSection(
          complianceTimeline.afterWork!,
          'After Work Complete',
          '📋',
          'after'
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceChecklist;
