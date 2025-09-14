import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Zap, FileText, Clock, TrendingUp } from "lucide-react";

export interface Template {
  id: string;
  title: string;
  category: "eicr" | "fault" | "upgrade" | "maintenance" | "quote" | "general";
  icon: React.ComponentType<{ className?: string }>;
  sample: string;
  urgency: "low" | "medium" | "high";
  description: string;
}

const templates: Template[] = [
  {
    id: "eicr-c2",
    title: "EICR Code C2 Finding",
    category: "eicr",
    icon: AlertTriangle,
    urgency: "high",
    description: "Potentially dangerous observation requiring urgent attention",
    sample: "I found a fault with the consumer unit that needs immediate attention. The main switch is damaged and poses a potential fire risk. This is classified as Code C2 - potentially dangerous."
  },
  {
    id: "eicr-satisfactory",
    title: "EICR Satisfactory Result",
    category: "eicr",
    icon: CheckCircle,
    urgency: "low",
    description: "All tests passed with satisfactory condition",
    sample: "Good news! Your electrical installation has passed all tests. The wiring is in excellent condition and meets current safety standards. No urgent work is required."
  },
  {
    id: "circuit-fault",
    title: "Circuit Fault Diagnosis",
    category: "fault",
    icon: Zap,
    urgency: "medium",
    description: "Explanation of circuit problems and solutions",
    sample: "I've identified the cause of your electrical problem. The ring circuit in your kitchen has a break, causing some sockets to lose power. This requires rewiring the affected section."
  },
  {
    id: "consumer-unit-upgrade",
    title: "Consumer Unit Upgrade",
    category: "upgrade",
    icon: TrendingUp,
    urgency: "medium",
    description: "Recommendation for fuseboard replacement",
    sample: "Your fuseboard is the old rewirable type from the 1980s. Modern consumer units have RCD protection that can save lives by instantly cutting power if there's a fault."
  },
  {
    id: "pir-maintenance",
    title: "Periodic Maintenance",
    category: "maintenance",
    icon: Clock,
    urgency: "low",
    description: "Routine maintenance requirements",
    sample: "During the periodic inspection, I found minor issues that don't affect safety but should be addressed during routine maintenance to prevent future problems."
  },
  {
    id: "quote-explanation",
    title: "Quote Breakdown",
    category: "quote",
    icon: FileText,
    urgency: "low",
    description: "Explaining work requirements and costs",
    sample: "The quote includes materials, labour, and certification. The work involves installing new RCD protection, upgrading outdated wiring, and providing electrical safety certificates."
  }
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-500/10 text-red-400 border-red-500/30";
      case "medium": return "bg-orange-500/10 text-orange-400 border-orange-500/30";
      case "low": return "bg-green-500/10 text-green-400 border-green-500/30";
      default: return "bg-muted";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "eicr": return "bg-blue-500/10 text-blue-400";
      case "fault": return "bg-red-500/10 text-red-400";
      case "upgrade": return "bg-purple-500/10 text-purple-400";
      case "maintenance": return "bg-green-500/10 text-green-400";
      case "quote": return "bg-orange-500/10 text-orange-400";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground mb-3">Common Scenarios</h3>
      <div className="grid gap-3 max-h-64 overflow-y-auto pr-2">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card 
              key={template.id} 
              className="cursor-pointer hover:bg-card/80 border-border/50 transition-all duration-200 mobile-card touch-target"
              onClick={() => onSelectTemplate(template)}
            >
              <CardHeader className="pb-2 mobile-padding">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex items-start space-x-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm text-foreground truncate">{template.title}</CardTitle>
                      <p className="text-xs text-foreground/70 line-clamp-2 sm:line-clamp-1">{template.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0 self-start">
                    <Badge variant="outline" className={`${getCategoryColor(template.category)} text-xs px-1.5 py-0.5`}>
                      {template.category.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={`${getUrgencyColor(template.urgency)} text-xs px-1.5 py-0.5`}>
                      {template.urgency}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 mobile-padding">
                <p className="text-xs text-foreground/70 line-clamp-2 mb-3">
                  {template.sample}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-elec-yellow hover:bg-elec-yellow/10 w-full touch-target mobile-tap-highlight"
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;