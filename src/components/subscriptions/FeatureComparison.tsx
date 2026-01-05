import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  desktop: boolean | "partial";
  employer: boolean | "partial";
  enterprise: boolean | "partial";
}

const FeatureComparison = () => {
  const features: Feature[] = [
    { name: "Study Centre (AM2, HNC, BS 7671)", desktop: true, employer: true, enterprise: true },
    { name: "All Electrical Calculators", desktop: true, employer: true, enterprise: true },
    { name: "Quote & Invoice Builder", desktop: true, employer: true, enterprise: true },
    { name: "EIC/EICR Forms", desktop: true, employer: true, enterprise: true },
    { name: "Installation Planner", desktop: true, employer: true, enterprise: true },
    { name: "Live Material Pricing", desktop: true, employer: true, enterprise: true },
    { name: "Fault Finding Assistant", desktop: true, employer: true, enterprise: true },
    { name: "CV Builder", desktop: true, employer: true, enterprise: true },
    { name: "Regulation Search", desktop: true, employer: true, enterprise: true },
    { name: "Progress Tracking", desktop: true, employer: true, enterprise: true },
    { name: "Employer Dashboard", desktop: false, employer: true, enterprise: true },
    { name: "Team Management", desktop: false, employer: "partial", enterprise: true },
    { name: "Job Board & Assignments", desktop: false, employer: true, enterprise: true },
    { name: "Finance Hub", desktop: false, employer: true, enterprise: true },
    { name: "Safety Hub (RAMS)", desktop: false, employer: true, enterprise: true },
    { name: "Talent Pool & Recruitment", desktop: false, employer: true, enterprise: true },
    { name: "Timesheets & Leave Management", desktop: false, employer: true, enterprise: true },
    { name: "Client Portal", desktop: false, employer: true, enterprise: true },
    { name: "Team Discount for Electricians", desktop: false, employer: true, enterprise: true },
    { name: "Unlimited Team Members", desktop: false, employer: false, enterprise: true },
    { name: "Dedicated Account Manager", desktop: false, employer: false, enterprise: true },
    { name: "Custom Onboarding", desktop: false, employer: false, enterprise: true },
    { name: "Priority Support", desktop: false, employer: false, enterprise: true },
    { name: "API Access", desktop: false, employer: false, enterprise: true },
  ];

  const renderCheck = (value: boolean | "partial") => {
    if (value === true) {
      return (
        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="h-4 w-4 text-green-400" />
        </div>
      );
    }
    if (value === "partial") {
      return (
        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Minus className="h-4 w-4 text-amber-400" />
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
        <X className="h-4 w-4 text-foreground/30" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Compare Plans</h2>
        <p className="text-muted-foreground">See what each plan includes</p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="min-w-[600px]">
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-4 mb-4 sticky top-0 bg-elec-dark/95 backdrop-blur-sm py-3 border-b border-white/10">
            <div className="font-medium text-muted-foreground">Feature</div>
            <div className="text-center">
              <div className="font-bold text-foreground">Desktop Price</div>
              <div className="text-xs text-elec-yellow">From 6.99/mo</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground">Employer</div>
              <div className="text-xs text-elec-yellow">From 29.99/mo</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground">Enterprise</div>
              <div className="text-xs text-elec-yellow">Custom</div>
            </div>
          </div>

          {/* Feature Rows */}
          <div className="space-y-1">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-4 gap-4 py-3 px-2 rounded-lg transition-colors",
                  index % 2 === 0 ? "bg-white/[0.02]" : ""
                )}
              >
                <div className="text-sm text-foreground/80">{feature.name}</div>
                <div className="flex justify-center">{renderCheck(feature.desktop)}</div>
                <div className="flex justify-center">{renderCheck(feature.employer)}</div>
                <div className="flex justify-center">{renderCheck(feature.enterprise)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground pt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="h-2.5 w-2.5 text-green-400" />
          </div>
          <span>Included</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Minus className="h-2.5 w-2.5 text-amber-400" />
          </div>
          <span>Limited (up to 5 users)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center">
            <X className="h-2.5 w-2.5 text-foreground/30" />
          </div>
          <span>Not included</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;
