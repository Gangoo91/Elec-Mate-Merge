import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ClipboardCheck } from "lucide-react";
import { useState } from "react";

interface TestSequenceData {
  testSequence?: string[];
  expectedResults?: Record<string, string>;
  passFailCriteria?: Record<string, string>;
}

interface TestSequenceCardProps {
  data: TestSequenceData;
}

export const TestSequenceCard = ({ data }: TestSequenceCardProps) => {
  const [showCriteria, setShowCriteria] = useState(false);
  const [showAllTests, setShowAllTests] = useState(false);
  
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-cyan-500/5 to-transparent hover:border-elec-yellow/30 transition-all">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            ✓ Commissioning Tests
          </Badge>
        </div>

        {/* Test Sequence Summary (First 3) */}
        {data.testSequence && data.testSequence.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground">Test Sequence (BS 7671 Section 643)</p>
            <ol className="space-y-2">
              {data.testSequence.slice(0, 3).map((test, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-foreground flex-1 leading-relaxed">{test}</span>
                </li>
              ))}
            </ol>
            {data.testSequence.length > 3 && (
              <Collapsible open={showAllTests} onOpenChange={setShowAllTests}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between text-xs h-8 mt-2"
                  >
                    <span>View All {data.testSequence.length} Tests</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showAllTests ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <ol className="space-y-2" start={4}>
                    {data.testSequence.slice(3).map((test, idx) => (
                      <li key={idx + 3} className="flex items-start gap-3 text-sm">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0 mt-0.5">
                          {idx + 4}
                        </div>
                        <span className="text-foreground flex-1 leading-relaxed">{test}</span>
                      </li>
                    ))}
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        )}

        {/* Expected Results */}
        {data.expectedResults && Object.keys(data.expectedResults).length > 0 && (
          <div className="bg-muted/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardCheck className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs font-semibold text-foreground">Expected Results</p>
            </div>
            <div className="space-y-2">
              {Object.entries(data.expectedResults).map(([test, result], idx) => (
                <div key={idx} className="flex justify-between items-start gap-2 text-xs">
                  <span className="text-foreground/70">{test}:</span>
                  <span className="text-foreground font-semibold text-right">{result}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pass/Fail Criteria */}
        {data.passFailCriteria && Object.keys(data.passFailCriteria).length > 0 && (
          <Collapsible open={showCriteria} onOpenChange={setShowCriteria}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between text-xs h-8"
              >
                <span>View Pass/Fail Criteria</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showCriteria ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="pt-3">
              <div className="border border-border/50 rounded p-3 space-y-2">
                {Object.entries(data.passFailCriteria).map(([test, criteria], idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xs font-semibold text-foreground">{test}</p>
                    <p className="text-xs text-foreground/90 pl-3 border-l-2 border-cyan-500/30">
                      {criteria}
                    </p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* EIC Reminder */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-2 text-xs text-foreground">
          <strong>Note:</strong> All results must be recorded on Electrical Installation Certificate (EIC) as per BS 7671 Part 6.
        </div>
      </CardContent>
    </Card>
  );
};
