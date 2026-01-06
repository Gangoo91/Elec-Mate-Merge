import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Zap, FileText, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

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

const urgencyConfig = {
  high: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'Urgent' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Important' },
  low: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Routine' },
};

const categoryConfig = {
  eicr: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  fault: { bg: 'bg-red-500/10', text: 'text-red-400' },
  upgrade: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  maintenance: { bg: 'bg-green-500/10', text: 'text-green-400' },
  quote: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  general: { bg: 'bg-slate-500/10', text: 'text-slate-400' },
};

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 -mr-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      {templates.map((template) => {
        const Icon = template.icon;
        const urgency = urgencyConfig[template.urgency];
        const category = categoryConfig[template.category];

        return (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={cn(
              "w-full p-4 rounded-xl border text-left",
              "min-h-[80px] touch-manipulation transition-all",
              "bg-background/50 border-border/30",
              "hover:bg-accent/30 hover:border-border/50",
              "active:scale-[0.98]"
            )}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                urgency.bg
              )}>
                <Icon className={cn("h-5 w-5", urgency.text)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-foreground text-sm leading-tight">
                    {template.title}
                  </h4>
                  <div className="flex gap-1 flex-shrink-0">
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] px-1.5 py-0", category.bg, category.text, "border-transparent")}
                    >
                      {template.category.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {template.description}
                </p>

                {/* Sample preview */}
                <p className="text-xs text-foreground/50 line-clamp-1 italic">
                  "{template.sample.substring(0, 60)}..."
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default TemplateSelector;
