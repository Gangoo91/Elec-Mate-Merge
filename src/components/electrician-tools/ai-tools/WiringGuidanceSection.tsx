import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Info, CheckCircle2, XCircle, Camera, AlertTriangle } from "lucide-react";
import { useState } from "react";

const WiringGuidanceSection = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Card className="bg-blue-500/5 border-blue-500/20">
      <CardHeader className="p-4 sm:p-5">
        <CardTitle className="text-base sm:text-lg text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Info className="h-5 w-5 flex-shrink-0" />
          How to Get Best Results
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3 text-left">
        {/* What This Tool Does */}
        <Collapsible open={openSections['what']} onOpenChange={() => toggleSection('what')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-3.5 bg-background/50 hover:bg-background rounded-lg border border-border/50 transition-colors">
            <span className="font-semibold text-sm text-foreground">What This Tool Does</span>
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 sm:p-4 text-xs sm:text-sm text-foreground space-y-2 text-left bg-background/30 rounded-lg border border-border/30">
            <p>Generates BS 7671-compliant wiring instructions verified against installation docs and regulations.</p>
            <ul className="list-disc pl-5 space-y-1.5 text-left">
              <li>Step-by-step wiring procedure with safety warnings</li>
              <li>Terminal connection details with colour coding</li>
              <li>Circuit specifications and protection requirements</li>
              <li>Testing and verification requirements</li>
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {/* Photo Tips */}
        <Collapsible open={openSections['tips']} onOpenChange={() => toggleSection('tips')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-3.5 bg-background/50 hover:bg-background rounded-lg border border-border/50 transition-colors">
            <span className="font-semibold text-sm text-foreground">Photo Tips</span>
            <Camera className="w-4 h-4 text-blue-500 flex-shrink-0" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-3 text-left">
            {/* Good Example */}
            <div className="p-3 sm:p-3.5 bg-green-500/5 border border-green-500/20 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-400">Good Photo</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-foreground text-left">
                <li>Clear, well-lit, straight-on angle</li>
                <li>Component nameplate/ratings visible</li>
                <li>Terminal labels clearly shown</li>
                <li>Multiple angles (front + terminal view)</li>
              </ul>
            </div>

            {/* Bad Example */}
            <div className="p-3 sm:p-3.5 bg-red-500/5 border border-red-500/20 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-red-700 dark:text-red-400">Avoid</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-foreground text-left">
                <li>Blurry, dark, or angled photos</li>
                <li>Too far away - can't read ratings</li>
                <li>Obstructed view of terminals</li>
                <li>Single photo of complex equipment</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* When to Use */}
        <Collapsible open={openSections['when']} onOpenChange={() => toggleSection('when')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-3.5 bg-background/50 hover:bg-background rounded-lg border border-border/50 transition-colors">
            <span className="font-semibold text-sm text-foreground">When to Use This Tool</span>
            <AlertTriangle className="w-4 h-4 text-blue-500 flex-shrink-0" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 sm:p-4 text-xs sm:text-sm text-foreground space-y-1.5 text-left bg-background/30 rounded-lg border border-border/30">
            <ul className="list-disc pl-5 space-y-1.5 text-left">
              <li>Installing new components and need wiring guidance</li>
              <li>Replacing existing equipment and need terminal connections</li>
              <li>Training or learning how to wire specific components</li>
              <li>Verifying correct wiring procedure before starting work</li>
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default WiringGuidanceSection;
