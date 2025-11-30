import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Info, CheckCircle2, XCircle, Camera, AlertTriangle, Search, Zap, CheckCircle, LucideIcon } from "lucide-react";
import { useState } from "react";
import { AnalysisMode } from "./ModeSelector";

interface ModeConfig {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  colour: string;
  whatItDoes: string[];
  photoTips: {
    good: string[];
    avoid: string[];
  };
  quickTags: string[];
}

const MODE_GUIDANCE: Record<AnalysisMode, ModeConfig> = {
  component_identify: {
    icon: Search,
    title: "Component Identification",
    subtitle: "Snap a photo to identify any electrical component",
    colour: "blue",
    whatItDoes: [
      "Identifies manufacturer, model & specifications",
      "Shows BS 7671 requirements for that component",
      "Provides datasheet information & ratings"
    ],
    photoTips: {
      good: [
        "Show full component with nameplate visible",
        "Include any labels, ratings, or markings",
        "Multiple angles if complex equipment",
        "Good lighting - avoid shadows on text"
      ],
      avoid: [
        "Blurry or dark photos",
        "Cropped nameplates or rating labels",
        "Too far away - can't read markings",
        "Heavily obstructed views"
      ]
    },
    quickTags: ["Consumer Unit", "MCB", "RCD", "Socket", "Switch", "Isolator", "Contactor"]
  },
  wiring_instruction: {
    icon: Zap,
    title: "Wiring Instructions",
    subtitle: "Get step-by-step BS 7671 compliant wiring guidance",
    colour: "yellow",
    whatItDoes: [
      "Step-by-step wiring procedure with safety warnings",
      "Terminal connection details with colour coding",
      "Circuit specifications and protection requirements",
      "Testing and verification requirements"
    ],
    photoTips: {
      good: [
        "Clear, well-lit, straight-on angle",
        "Component nameplate/ratings visible",
        "Terminal labels clearly shown",
        "Multiple angles (front + terminal view)"
      ],
      avoid: [
        "Blurry, dark, or angled photos",
        "Too far away - can't read ratings",
        "Obstructed view of terminals",
        "Single photo of complex equipment"
      ]
    },
    quickTags: ["Consumer Unit", "Cooker Circuit", "EV Charger", "Shower Circuit", "Outdoor Socket", "Immersion Heater"]
  },
  fault_diagnosis: {
    icon: AlertTriangle,
    title: "Fault Diagnosis",
    subtitle: "Photograph the issue for EICR coding & diagnosis",
    colour: "orange",
    whatItDoes: [
      "Identifies visible faults & hazards",
      "Assigns EICR codes (C1/C2/C3/FI)",
      "Provides BS 7671 regulation references",
      "Suggests rectification steps"
    ],
    photoTips: {
      good: [
        "Clear shot of the defect/issue",
        "Show surrounding context",
        "Multiple photos if complex fault",
        "Include relevant circuit labels"
      ],
      avoid: [
        "Photos taken from too far away",
        "Poor lighting obscuring defect",
        "Obscured fault areas",
        "Missing context of installation"
      ]
    },
    quickTags: ["EICR Inspection", "Burning/Scorch", "Exposed Cables", "Missing Cover", "Water Damage", "Overloaded"]
  },
  installation_verify: {
    icon: CheckCircle,
    title: "Installation Verification",
    subtitle: "Check if an installation meets BS 7671 compliance",
    colour: "green",
    whatItDoes: [
      "Performs visual compliance checks",
      "Verifies protective devices & earthing",
      "Checks labelling & accessibility",
      "Provides pass/fail assessment"
    ],
    photoTips: {
      good: [
        "Full consumer unit visible",
        "Earthing arrangement shown",
        "Labels readable",
        "Multiple angles showing key components"
      ],
      avoid: [
        "Partial views missing key elements",
        "Dark board interiors",
        "Missing protective covers",
        "Obscured circuit labels"
      ]
    },
    quickTags: ["New Installation", "Alterations", "Periodic Inspection", "Minor Works"]
  }
};

interface ModeGuidanceSectionProps {
  mode: AnalysisMode;
}

const ModeGuidanceSection = ({ mode }: ModeGuidanceSectionProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const config = MODE_GUIDANCE[mode];

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getColourClasses = (colour: string) => {
    const classes = {
      blue: {
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
        text: "text-blue-700 dark:text-blue-400",
        accent: "text-blue-500"
      },
      yellow: {
        bg: "bg-elec-yellow/5",
        border: "border-elec-yellow/20",
        text: "text-elec-yellow",
        accent: "text-elec-yellow"
      },
      orange: {
        bg: "bg-orange-500/5",
        border: "border-orange-500/20",
        text: "text-orange-700 dark:text-orange-400",
        accent: "text-orange-500"
      },
      green: {
        bg: "bg-green-500/5",
        border: "border-green-500/20",
        text: "text-green-700 dark:text-green-400",
        accent: "text-green-500"
      }
    };
    return classes[colour as keyof typeof classes] || classes.blue;
  };

  const colours = getColourClasses(config.colour);
  const Icon = config.icon;

  return (
    <Card className={`${colours.bg} ${colours.border} border`}>
      <CardHeader className="p-4 sm:p-5">
        <CardTitle className={`text-base sm:text-lg ${colours.text} flex items-center gap-2`}>
          <Icon className="h-5 w-5 flex-shrink-0" />
          How to Get Best Results
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3 text-left">
        {/* What This Tool Does */}
        <Collapsible open={openSections['what']} onOpenChange={() => toggleSection('what')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-3.5 bg-background/50 hover:bg-background rounded-lg border border-border/50 transition-colors">
            <span className="font-semibold text-sm text-foreground">What This Tool Does</span>
            <Info className={`w-4 h-4 ${colours.accent} flex-shrink-0`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 sm:p-4 text-xs sm:text-sm text-foreground space-y-2 text-left bg-background/30 rounded-lg border border-border/30">
            <ul className="list-disc pl-5 space-y-1.5 text-left">
              {config.whatItDoes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {/* Photo Tips */}
        <Collapsible open={openSections['tips']} onOpenChange={() => toggleSection('tips')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-3.5 bg-background/50 hover:bg-background rounded-lg border border-border/50 transition-colors">
            <span className="font-semibold text-sm text-foreground">Photo Tips</span>
            <Camera className={`w-4 h-4 ${colours.accent} flex-shrink-0`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-3 text-left">
            {/* Good Example */}
            <div className="p-3 sm:p-3.5 bg-green-500/5 border border-green-500/20 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-400">Good Photo</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-foreground text-left">
                {config.photoTips.good.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Bad Example */}
            <div className="p-3 sm:p-3.5 bg-red-500/5 border border-red-500/20 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-red-700 dark:text-red-400">Avoid</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-foreground text-left">
                {config.photoTips.avoid.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* When to Use */}
        <Collapsible open={openSections['when']} onOpenChange={() => toggleSection('when')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-3.5 bg-background/50 hover:bg-background rounded-lg border border-border/50 transition-colors">
            <span className="font-semibold text-sm text-foreground">When to Use This Tool</span>
            <AlertTriangle className={`w-4 h-4 ${colours.accent} flex-shrink-0`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 sm:p-4 text-xs sm:text-sm text-foreground space-y-1.5 text-left bg-background/30 rounded-lg border border-border/30">
            <p>Use this tool when working with {config.title.toLowerCase()} tasks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-left">
              {config.quickTags.slice(0, 4).map((tag, index) => (
                <li key={index}>{tag} related work</li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ModeGuidanceSection;
