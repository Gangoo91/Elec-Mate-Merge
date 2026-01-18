import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Building2,
  Car,
  Award,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useComplianceScore,
  useBusinessComplianceStats,
} from "@/hooks/useBusinessCompliance";
import { useQualificationStats } from "@/hooks/useEmployeeQualifications";

interface ComplianceDashboardProps {
  onCategoryClick?: (category: string) => void;
}

export function ComplianceDashboard({ onCategoryClick }: ComplianceDashboardProps) {
  const { data: scoreData, isLoading: scoreLoading } = useComplianceScore();
  const { data: businessStats, isLoading: businessLoading } = useBusinessComplianceStats();
  const { data: qualificationStats, isLoading: qualLoading } = useQualificationStats();

  const isLoading = scoreLoading || businessLoading || qualLoading;

  // Calculate score colour
  const scoreColour = useMemo(() => {
    if (!scoreData) return "text-muted-foreground";
    if (scoreData.score >= 90) return "text-green-400";
    if (scoreData.score >= 70) return "text-amber-400";
    return "text-red-400";
  }, [scoreData]);

  const scoreGradient = useMemo(() => {
    if (!scoreData) return "from-muted to-muted";
    if (scoreData.score >= 90) return "from-green-500/20 to-green-600/20";
    if (scoreData.score >= 70) return "from-amber-500/20 to-amber-600/20";
    return "from-red-500/20 to-red-600/20";
  }, [scoreData]);

  // Total items expiring
  const totalExpiring = (businessStats?.expiring || 0) + (qualificationStats?.expiring || 0);
  const totalExpired = (businessStats?.expired || 0) + (qualificationStats?.expired || 0);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Compliance Score Card */}
      <Card className={cn("border-0 bg-gradient-to-br", scoreGradient)}>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={cn(
                  "w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center",
                  scoreData?.score && scoreData.score >= 90 ? "border-green-400/50" :
                  scoreData?.score && scoreData.score >= 70 ? "border-amber-400/50" :
                  "border-red-400/50"
                )}>
                  <div className="text-center">
                    <span className={cn("text-2xl md:text-3xl font-bold", scoreColour)}>
                      {scoreData?.score || 0}
                    </span>
                    <span className="text-xs text-muted-foreground block">%</span>
                  </div>
                </div>
                <div className={cn(
                  "absolute -bottom-1 -right-1 p-1.5 rounded-full",
                  scoreData?.score && scoreData.score >= 90 ? "bg-green-500" :
                  scoreData?.score && scoreData.score >= 70 ? "bg-amber-500" :
                  "bg-red-500"
                )}>
                  {scoreData?.score && scoreData.score >= 90 ? (
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  ) : scoreData?.score && scoreData.score >= 70 ? (
                    <Clock className="h-4 w-4 text-white" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Compliance Score
                </h3>
                <p className="text-sm text-muted-foreground">
                  {scoreData?.message || "Loading..."}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {scoreData?.score && scoreData.score >= 70 ? (
                <TrendingUp className="h-5 w-5 text-green-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <Progress
              value={scoreData?.score || 0}
              className="h-2"
            />
          </div>

          {/* Alert badges */}
          {(totalExpiring > 0 || totalExpired > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {totalExpired > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {totalExpired} expired
                </Badge>
              )}
              {totalExpiring > 0 && (
                <Badge variant="outline" className="gap-1 border-amber-500/50 text-amber-400">
                  <Clock className="h-3 w-3" />
                  {totalExpiring} expiring soon
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Employee Qualifications */}
        <Card
          className="cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation"
          onClick={() => onCategoryClick?.("qualifications")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {qualificationStats?.total || 0}
            </p>
            <p className="text-xs text-muted-foreground">
              Employee Qualifications
            </p>
            {(qualificationStats?.expiring || 0) > 0 && (
              <Badge variant="outline" className="mt-2 text-xs border-amber-500/50 text-amber-400">
                {qualificationStats?.expiring} expiring
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Insurance */}
        <Card
          className="cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation"
          onClick={() => onCategoryClick?.("Insurance")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Shield className="h-4 w-4 text-green-400" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {businessStats?.byCategory?.insurance || 0}
            </p>
            <p className="text-xs text-muted-foreground">
              Insurance Policies
            </p>
          </CardContent>
        </Card>

        {/* Memberships */}
        <Card
          className="cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation"
          onClick={() => onCategoryClick?.("Memberships")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Award className="h-4 w-4 text-purple-400" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {businessStats?.byCategory?.memberships || 0}
            </p>
            <p className="text-xs text-muted-foreground">
              Memberships
            </p>
          </CardContent>
        </Card>

        {/* Vehicles */}
        <Card
          className="cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation"
          onClick={() => onCategoryClick?.("Vehicles")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Car className="h-4 w-4 text-cyan-400" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {businessStats?.byCategory?.vehicles || 0}
            </p>
            <p className="text-xs text-muted-foreground">
              Vehicle Documents
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
