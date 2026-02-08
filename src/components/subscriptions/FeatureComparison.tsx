import { useState } from "react";
import { Check, X, GraduationCap, Zap, Building2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  apprentice: boolean;
  electrician: boolean;
  employer: boolean;
}

const features: Feature[] = [
  { name: "2,000+ Practice Questions", apprentice: true, electrician: true, employer: true },
  { name: "AM2 Exam Preparation", apprentice: true, electrician: true, employer: true },
  { name: "Level 2 & 3 Courses", apprentice: true, electrician: true, employer: true },
  { name: "BS 7671 18th Edition Guides", apprentice: true, electrician: true, employer: true },
  { name: "50+ Electrical Calculators", apprentice: true, electrician: true, employer: true },
  { name: "OJT Logbook Tracking", apprentice: true, electrician: true, employer: true },
  { name: "Flashcards & Mock Exams", apprentice: true, electrician: true, employer: true },
  { name: "Progress Tracking", apprentice: true, electrician: true, employer: true },
  { name: "8 AI Specialist Agents", apprentice: false, electrician: true, employer: true },
  { name: "Inspection & Testing Suite", apprentice: false, electrician: true, employer: true },
  { name: "AI Board Scanner", apprentice: false, electrician: true, employer: true },
  { name: "Quote & Invoice Builder", apprentice: false, electrician: true, employer: true },
  { name: "Live Material Pricing", apprentice: false, electrician: true, employer: true },
  { name: "RAMS Generator", apprentice: false, electrician: true, employer: true },
  { name: "Customer Management", apprentice: false, electrician: true, employer: true },
  { name: "Team GPS & Job Tracking", apprentice: false, electrician: false, employer: true },
  { name: "Team Management (up to 5)", apprentice: false, electrician: false, employer: true },
  { name: "Job Packs & Assignments", apprentice: false, electrician: false, employer: true },
  { name: "Timesheets & Scheduling", apprentice: false, electrician: false, employer: true },
  { name: "Safety Hub & Incidents", apprentice: false, electrician: false, employer: true },
  { name: "Finance Hub & Reporting", apprentice: false, electrician: false, employer: true },
  { name: "Talent Pool Access", apprentice: false, electrician: false, employer: true },
];

const plans = [
  { key: "apprentice" as const, name: "Apprentice", price: "From £4.99/mo", icon: GraduationCap },
  { key: "electrician" as const, name: "Electrician", price: "From £9.99/mo", icon: Zap, popular: true },
  { key: "employer" as const, name: "Employer", price: "From £29.99/mo", icon: Building2 },
];

const FeatureComparison = () => {
  const [openPlan, setOpenPlan] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Compare plans</h2>
        </div>
        <p className="text-sm text-white/50 ml-3.5">See exactly what you get with each tier</p>
      </div>

      {/* Mobile: Accordion Cards */}
      <div className="md:hidden space-y-2">
        {plans.map((plan) => {
          const isOpen = openPlan === plan.key;
          const included = features.filter((f) => f[plan.key]);
          const excluded = features.filter((f) => !f[plan.key]);

          return (
            <div
              key={plan.key}
              className={cn(
                "rounded-xl border overflow-hidden transition-all duration-200",
                "bg-white/[0.02] backdrop-blur-sm",
                isOpen
                  ? plan.popular ? "border-elec-yellow/40" : "border-white/20"
                  : "border-white/[0.06]"
              )}
            >
              <button
                onClick={() => setOpenPlan(isOpen ? null : plan.key)}
                className="flex items-center gap-3 w-full p-3.5 text-left touch-manipulation min-h-[52px]"
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  plan.popular ? "bg-elec-yellow/20" : "bg-white/[0.06]"
                )}>
                  <plan.icon className={cn("h-4 w-4", plan.popular ? "text-elec-yellow" : "text-white/60")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{plan.name}</span>
                    {plan.popular && (
                      <span className="text-[10px] font-bold text-elec-dark bg-elec-yellow px-1.5 py-0.5 rounded">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/40">{plan.price}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] text-white/30 tabular-nums">{included.length}/{features.length}</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-white/30 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )} />
                </div>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 space-y-1.5 border-t border-white/[0.04] pt-3">
                  {included.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-2 py-0.5">
                      <Check className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                      <span className="text-sm text-foreground/80">{feature.name}</span>
                    </div>
                  ))}
                  {excluded.length > 0 && (
                    <div className="h-px bg-white/[0.04] my-2" />
                  )}
                  {excluded.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-2 py-0.5 opacity-30">
                      <X className="h-3.5 w-3.5 shrink-0" />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block rounded-xl border border-white/[0.06] overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-[1fr_repeat(3,120px)] gap-0 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">
            Feature
          </div>
          {plans.map((plan) => (
            <div key={plan.key} className={cn(
              "px-3 py-3 text-center",
              plan.popular && "bg-elec-yellow/[0.06]"
            )}>
              <div className="flex items-center justify-center gap-1.5">
                <plan.icon className={cn("h-3.5 w-3.5", plan.popular ? "text-elec-yellow" : "text-white/50")} />
                <span className={cn("text-sm font-semibold", plan.popular ? "text-elec-yellow" : "text-foreground")}>
                  {plan.name}
                </span>
              </div>
              <div className="text-[11px] text-white/30 mt-0.5">{plan.price}</div>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "grid grid-cols-[1fr_repeat(3,120px)] gap-0 border-b border-white/[0.03] last:border-b-0",
              "hover:bg-white/[0.02] transition-colors"
            )}
          >
            <div className="px-4 py-2.5 text-sm text-foreground/70">{feature.name}</div>
            {(["apprentice", "electrician", "employer"] as const).map((key) => {
              const plan = plans.find(p => p.key === key);
              return (
                <div key={key} className={cn(
                  "flex justify-center items-center py-2.5",
                  plan?.popular && "bg-elec-yellow/[0.03]"
                )}>
                  {feature[key] ? (
                    <Check className="h-4 w-4 text-elec-yellow" />
                  ) : (
                    <div className="w-4 h-px bg-white/10" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureComparison;
