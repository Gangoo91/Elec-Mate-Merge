import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Link2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RegulatoryCitationsPanelProps {
  regulatoryCitations?: Array<{
    regulation?: string;
    applicableToStep?: number;
    requirement?: string;
    number?: string;
    description?: string;
  }>;
}

export const RegulatoryCitationsPanel = ({ regulatoryCitations }: RegulatoryCitationsPanelProps) => {
  if (!regulatoryCitations || regulatoryCitations.length === 0) {
    return null;
  }

  // Support both formats: old (regulation/applicableToStep) and new (number/description)
  const isNewFormat = regulatoryCitations.some(c => 'number' in c && 'description' in c);
  
  if (isNewFormat) {
    // New format: Display all regulations in a single list (no step grouping)
    const referencesWithNumbers = regulatoryCitations.filter(c => c.number && c.description);
    
    return (
      <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-background shadow-lg">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <BookOpen className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">BS 7671:2018+A3:2024 Regulatory References</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {referencesWithNumbers.length} regulation{referencesWithNumbers.length !== 1 ? 's' : ''} referenced
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {referencesWithNumbers.map((citation, index) => (
              <div 
                key={index}
                className="bg-card border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <Link2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <Badge className="bg-gradient-to-r from-green-500/20 to-green-600/20 text-foreground border-green-500/40 text-xs font-mono mb-2">
                      {citation.number}
                    </Badge>
                    <p className="text-sm text-foreground leading-relaxed">
                      {citation.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-4 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              <strong>Reference:</strong> All regulations cited from BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations). 
              Verify against latest published version before commencing work.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Old format: Group citations by step
  const citationsByStep = regulatoryCitations.reduce((acc, citation) => {
    const stepNum = citation.applicableToStep!;
    if (!acc[stepNum]) {
      acc[stepNum] = [];
    }
    acc[stepNum].push(citation);
    return acc;
  }, {} as Record<number, typeof regulatoryCitations>);

  return (
    <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-background shadow-lg">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10">
            <BookOpen className="h-5 w-5 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">BS 7671:2018+A3:2024 Regulatory Citations</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {regulatoryCitations.length} regulation{regulatoryCitations.length !== 1 ? 's' : ''} referenced across {Object.keys(citationsByStep).length} step{Object.keys(citationsByStep).length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <Accordion type="multiple" className="space-y-2">
          {Object.entries(citationsByStep)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([stepNum, citations]) => (
              <AccordionItem 
                key={stepNum} 
                value={`step-${stepNum}`}
                className="border border-border/50 rounded-lg bg-muted/30 px-4 data-[state=open]:bg-green-500/5"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3 text-left">
                    <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 font-semibold">
                      Step {stepNum}
                    </Badge>
                    <span className="text-sm font-medium text-foreground">
                      {citations.length} regulation{citations.length !== 1 ? 's' : ''} applicable
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3">
                  <div className="space-y-3">
                    {citations.map((citation, index) => (
                      <div 
                        key={index}
                        className="bg-background border border-green-500/20 rounded-lg p-3"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <Link2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <Badge className="bg-gradient-to-r from-green-500/20 to-green-600/20 text-foreground border-green-500/40 text-xs font-mono mb-1">
                              {citation.regulation}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-foreground pl-6">
                          {citation.requirement}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <strong>Reference:</strong> All regulations cited from BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations). 
            Verify against latest published version before commencing work.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
