import { useState } from "react";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, FileText, Users, Search, RefreshCw, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncidents, useIncidentStats, type Incident } from "@/hooks/useIncidents";
import { useRAMSDocuments, useRAMSDocumentStats, type RAMSDocument } from "@/hooks/useRAMSDocuments";

const incidentTypeLabels: Record<string, string> = {
  near_miss: "Near Miss",
  unsafe_practice: "Unsafe Practice",
  faulty_equipment: "Faulty Equipment",
  injury: "Injury",
  property_damage: "Property Damage",
  environmental: "Environmental",
  security: "Security",
  other: "Other",
};

const severityColors: Record<string, string> = {
  low: "bg-blue-500/20 text-blue-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-orange-500/20 text-orange-400",
  critical: "bg-red-500/20 text-red-400",
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/20 text-gray-400",
  submitted: "bg-blue-500/20 text-blue-400",
  under_review: "bg-yellow-500/20 text-yellow-400",
  investigating: "bg-orange-500/20 text-orange-400",
  resolved: "bg-green-500/20 text-green-400",
  closed: "bg-green-500/20 text-green-400",
  approved: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
  pending: "bg-yellow-500/20 text-yellow-400",
};

export function SafetyHRSection() {
  const [searchQuery, setSearchQuery] = useState("");

  // Use real hooks
  const { data: incidents, isLoading: incidentsLoading, error: incidentsError, refetch: refetchIncidents } = useIncidents();
  const { data: incidentStats } = useIncidentStats();
  const { data: ramsDocuments, isLoading: ramsLoading, error: ramsError, refetch: refetchRams } = useRAMSDocuments();
  const { data: ramsStats } = useRAMSDocumentStats();

  // Filter data by search
  const filteredIncidents = incidents?.filter(
    (incident) =>
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredRams = ramsDocuments?.filter(
    (rams) =>
      rams.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rams.location?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate safety score (simplified)
  const safetyScore = incidentStats
    ? Math.max(0, 100 - (incidentStats.critical * 15) - (incidentStats.high * 10) - (incidentStats.open * 5))
    : 100;

  const isLoading = incidentsLoading || ramsLoading;
  const hasError = incidentsError || ramsError;

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Failed to load safety data</p>
        <Button
          onClick={() => {
            refetchIncidents();
            refetchRams();
          }}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search incidents and RAMS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("h-11 touch-manipulation", !searchQuery && "pl-10")}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <p className="text-2xl font-bold text-success">{safetyScore}%</p>
                )}
                <p className="text-sm text-muted-foreground">Safety Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <p className="text-2xl font-bold text-warning">{incidentStats?.total || 0}</p>
                )}
                <p className="text-sm text-muted-foreground">Total Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <p className="text-2xl font-bold text-elec-yellow">{ramsStats?.total || 0}</p>
                )}
                <p className="text-sm text-muted-foreground">Total RAMS</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <p className="text-2xl font-bold text-foreground">{ramsStats?.approved || 0}</p>
                )}
                <p className="text-sm text-muted-foreground">Approved RAMS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incidents" className="touch-manipulation">
            Incidents ({filteredIncidents.length})
          </TabsTrigger>
          <TabsTrigger value="rams" className="touch-manipulation">
            RAMS ({filteredRams.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-elec-gray border-border">
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredIncidents.length === 0 ? (
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Incidents</h3>
                <p className="text-muted-foreground">No incidents recorded. Keep up the safe work!</p>
              </CardContent>
            </Card>
          ) : (
            filteredIncidents.map((incident: Incident) => (
              <Card key={incident.id} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{incident.title}</h3>
                        <Badge className={severityColors[incident.severity] || ""}>
                          {incident.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {incidentTypeLabels[incident.incident_type] || incident.incident_type}
                      </p>
                    </div>
                    <Badge className={statusColors[incident.status] || ""}>
                      {incident.status.replace("_", " ")}
                    </Badge>
                  </div>

                  {incident.description && (
                    <p className="text-sm text-muted-foreground bg-surface p-3 rounded-lg mb-3">
                      {incident.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{incident.location}</span>
                    <span>{new Date(incident.date_occurred).toLocaleDateString("en-GB")}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="rams" className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-elec-gray border-border">
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredRams.length === 0 ? (
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No RAMS documents found.</p>
              </CardContent>
            </Card>
          ) : (
            filteredRams.map((rams: RAMSDocument) => (
              <Card key={rams.id} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{rams.project_name}</h3>
                      <p className="text-sm text-muted-foreground">{rams.location}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={statusColors[rams.status] || ""}>
                        {rams.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">v{rams.version}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Assessor: {rams.assessor}</span>
                    <span>Updated: {new Date(rams.updated_at).toLocaleDateString("en-GB")}</span>
                  </div>

                  {rams.risks && rams.risks.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Risks:</span>
                      <Badge variant="outline" className="text-xs">
                        {rams.risks.filter((r) => r.risk_level === "high").length} High
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {rams.risks.filter((r) => r.risk_level === "medium").length} Medium
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {rams.risks.filter((r) => r.risk_level === "low").length} Low
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
