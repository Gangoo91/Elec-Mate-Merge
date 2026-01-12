import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Section } from "@/pages/employer/EmployerDashboard";
import {
  Shield,
  AlertTriangle,
  FileText,
  BookOpen,
  ClipboardList,
  Award,
  Users,
  FileCheck,
  ChevronRight,
  Loader2,
  Zap,
  TrendingUp,
  Bell,
} from "lucide-react";

interface SafetyHubProps {
  onNavigate: (section: Section) => void;
}

export function SafetyHub({ onNavigate }: SafetyHubProps) {
  // Mock data - replace with real data from context
  const safetyScore = 98;
  const openIncidents = 1;
  const activeRAMS = 12;
  const hrDocuments = 24;
  const expiringCerts = 3;

  // Stats configuration
  const statsConfig = [
    {
      icon: Shield,
      value: `${safetyScore}%`,
      label: "Safety",
      bgClass: "from-success/20 to-success/5",
      borderClass: "border-success/30 hover:border-success/60",
      textClass: "text-success",
      section: "incidents" as Section,
    },
    {
      icon: AlertTriangle,
      value: openIncidents,
      label: "Incidents",
      bgClass: openIncidents > 0 ? "from-warning/20 to-warning/5" : "from-muted/20 to-muted/5",
      borderClass: openIncidents > 0 ? "border-warning/50 hover:border-warning/80" : "border-muted/30 hover:border-muted/50",
      textClass: openIncidents > 0 ? "text-warning" : "text-muted-foreground",
      section: "incidents" as Section,
      pulse: openIncidents > 0,
    },
    {
      icon: FileText,
      value: activeRAMS,
      label: "RAMS",
      bgClass: "from-elec-yellow/20 to-elec-yellow/5",
      borderClass: "border-elec-yellow/30 hover:border-elec-yellow/60",
      textClass: "text-elec-yellow",
      section: "rams" as Section,
    },
    {
      icon: BookOpen,
      value: hrDocuments,
      label: "HR Docs",
      bgClass: "from-info/20 to-info/5",
      borderClass: "border-info/30 hover:border-info/60",
      textClass: "text-info",
      section: "policies" as Section,
    },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Compliance status badge */}
      {safetyScore >= 95 ? (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 w-fit">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-success">{safetyScore}% compliant</span>
        </div>
      ) : openIncidents > 0 ? (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20 w-fit">
          <Bell className="h-3.5 w-3.5 text-warning" />
          <span className="text-xs font-medium text-warning">{openIncidents} open incidents</span>
        </div>
      ) : null}

      {/* Quick Stats - Centered Grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={`relative overflow-hidden border-2 ${stat.borderClass} bg-gradient-to-br ${stat.bgClass} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
              onClick={() => onNavigate(stat.section)}
            >
              {stat.pulse && (
                <div className="absolute top-2 right-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-warning"></span>
                  </span>
                </div>
              )}
              <CardContent className="p-3 md:p-4 flex flex-col items-center text-center">
                <div className="p-2 md:p-2.5 rounded-xl bg-background/60 backdrop-blur-sm mb-2">
                  <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.textClass}`} />
                </div>
                <p className={`text-xl md:text-2xl font-bold ${stat.textClass} tabular-nums`}>
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Safety Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-success rounded-full"></span>
            Safety
          </h2>
          <TrendingUp className="h-4 w-4 text-success" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-warning/50 bg-gradient-to-br from-elec-gray/50 via-background to-warning/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-warning/5"
            onClick={() => onNavigate("incidents")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warning/0 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-warning/10 group-hover:bg-warning/20 transition-colors duration-300">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-warning group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Incident Reports</h3>
              <p className="text-xs text-muted-foreground">
                Report & track safety
              </p>
              {openIncidents > 0 && (
                <Badge className="mt-2.5 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {openIncidents} open
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-elec-yellow/50 bg-gradient-to-br from-elec-gray/50 via-background to-elec-yellow/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/5"
            onClick={() => onNavigate("rams")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/0 to-elec-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">RAMS</h3>
              <p className="text-xs text-muted-foreground">
                Risk assessments
              </p>
              <Badge className="mt-2.5 bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs font-medium">
                {activeRAMS} active
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* HR Documents */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-info rounded-full"></span>
            HR Documents
          </h2>
          <Zap className="h-4 w-4 text-info" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-info/50 bg-gradient-to-br from-elec-gray/50 via-background to-info/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-info/5"
            onClick={() => onNavigate("policies")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-info/0 to-info/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-info/10 group-hover:bg-info/20 transition-colors duration-300">
                  <BookOpen className="h-5 w-5 text-info" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-info group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Policies</h3>
              <p className="text-xs text-muted-foreground">
                Company policies
              </p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-purple-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-purple-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5"
            onClick={() => onNavigate("contracts")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <ClipboardList className="h-5 w-5 text-purple-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Contracts</h3>
              <p className="text-xs text-muted-foreground">
                Employment docs
              </p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-success/50 bg-gradient-to-br from-elec-gray/50 via-background to-success/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-success/5"
            onClick={() => onNavigate("training")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/0 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                  <Award className="h-5 w-5 text-success" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-success group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Training</h3>
              <p className="text-xs text-muted-foreground">
                Records & certs
              </p>
              {expiringCerts > 0 && (
                <Badge className="mt-2 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {expiringCerts} expiring
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compliance */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 rounded-full"></span>
            Compliance
          </h2>
          <FileCheck className="h-4 w-4 text-orange-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-cyan-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-cyan-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
            onClick={() => onNavigate("briefings")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <Users className="h-5 w-5 text-cyan-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Briefings</h3>
              <p className="text-xs text-muted-foreground">
                Toolbox talks
              </p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-orange-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-orange-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5"
            onClick={() => onNavigate("compliance")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <FileCheck className="h-5 w-5 text-orange-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Compliance</h3>
              <p className="text-xs text-muted-foreground">
                Sign-offs & evidence
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
