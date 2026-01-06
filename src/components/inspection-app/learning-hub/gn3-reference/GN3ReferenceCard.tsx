import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  ChevronRight,
  Zap,
  Shield,
  Activity,
  Settings,
  Power,
  Gauge,
  ToggleLeft,
} from "lucide-react";
import { gn3VerificationChecklist, type VerificationSection } from "@/data/gn3-verification-checklist";
import { cn } from "@/lib/utils";

interface SectionConfig {
  key: keyof typeof gn3VerificationChecklist.sections;
  title: string;
  icon: React.ReactNode;
  color: string;
}

const sectionConfigs: SectionConfig[] = [
  {
    key: "safeIsolation",
    title: "Safe Isolation",
    icon: <Power className="h-5 w-5" />,
    color: "text-red-400",
  },
  {
    key: "continuityTesting",
    title: "Continuity Testing",
    icon: <Activity className="h-5 w-5" />,
    color: "text-blue-400",
  },
  {
    key: "insulationResistance",
    title: "Insulation Resistance",
    icon: <Shield className="h-5 w-5" />,
    color: "text-purple-400",
  },
  {
    key: "polarityTesting",
    title: "Polarity Testing",
    icon: <ToggleLeft className="h-5 w-5" />,
    color: "text-green-400",
  },
  {
    key: "earthFaultLoop",
    title: "Earth Fault Loop (Zs)",
    icon: <Zap className="h-5 w-5" />,
    color: "text-yellow-400",
  },
  {
    key: "rcdTesting",
    title: "RCD Testing",
    icon: <Settings className="h-5 w-5" />,
    color: "text-orange-400",
  },
  {
    key: "pfcTesting",
    title: "Prospective Fault Current",
    icon: <Gauge className="h-5 w-5" />,
    color: "text-cyan-400",
  },
  {
    key: "functionalTesting",
    title: "Functional Testing",
    icon: <CheckCircle className="h-5 w-5" />,
    color: "text-emerald-400",
  },
];

interface GN3SectionCardProps {
  config: SectionConfig;
  section: VerificationSection;
}

const GN3SectionCard = ({ config, section }: GN3SectionCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        section.verified
          ? "bg-green-500/5 border-green-500/20 hover:border-green-500/40"
          : "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg bg-white/5", config.color)}>
              {config.icon}
            </div>
            <div>
              <CardTitle className="text-base text-white">{config.title}</CardTitle>
              <p className="text-xs text-white/60 mt-0.5">
                {section.references?.[0] || "GN3 Reference"}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              section.verified
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
            )}
          >
            {section.verified ? (
              <><CheckCircle className="h-3 w-3 mr-1" /> Verified</>
            ) : (
              <><Clock className="h-3 w-3 mr-1" /> Pending</>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {/* Key Points Preview */}
        <ul className="space-y-1.5 mb-3">
          {section.keyPoints.slice(0, expanded ? section.keyPoints.length : 3).map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/80">
              <ChevronRight className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {section.keyPoints.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-white/60 hover:text-white text-xs p-0 h-auto mb-3"
          >
            {expanded ? "Show less" : `+${section.keyPoints.length - 3} more points`}
          </Button>
        )}

        {/* Acceptance Limits */}
        {section.acceptanceLimits && Object.keys(section.acceptanceLimits).length > 0 && (
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h4 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
              Acceptance Limits
            </h4>
            <div className="grid gap-2">
              {Object.entries(section.acceptanceLimits).slice(0, expanded ? undefined : 3).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="text-white/70">{key}</span>
                  <span className="text-elec-yellow font-mono text-xs">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface GN3ReferenceCardProps {
  showAll?: boolean;
  onViewAll?: () => void;
}

export const GN3ReferenceCard = ({ showAll = false, onViewAll }: GN3ReferenceCardProps) => {
  const checklist = gn3VerificationChecklist;
  const verifiedCount = Object.values(checklist.sections).filter(s => s.verified).length;
  const totalCount = Object.keys(checklist.sections).length;

  return (
    <Card className="bg-white/5 border border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">GN3 Quick Reference</CardTitle>
              <p className="text-sm text-white/60">
                {checklist.gnVersion} • {checklist.bs7671Version}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{verifiedCount}/{totalCount}</div>
            <p className="text-xs text-white/60">Sections Verified</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${(verifiedCount / totalCount) * 100}%` }}
            />
          </div>
          <p className="text-xs text-white/60 mt-1">
            Last verified: {checklist.lastVerified}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {(showAll ? sectionConfigs : sectionConfigs.slice(0, 4)).map((config) => (
            <GN3SectionCard
              key={config.key}
              config={config}
              section={checklist.sections[config.key]}
            />
          ))}
        </div>

        {!showAll && onViewAll && (
          <Button
            variant="outline"
            className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
            onClick={onViewAll}
          >
            View All {totalCount} Sections
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GN3ReferenceCard;
