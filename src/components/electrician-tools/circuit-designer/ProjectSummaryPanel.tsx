import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InstallationDesign } from "@/types/installation-design";
import { Building2, CheckCircle, AlertCircle, Zap, Info } from "lucide-react";

interface ProjectSummaryPanelProps {
  design: InstallationDesign;
}

export function ProjectSummaryPanel({ design }: ProjectSummaryPanelProps) {
  const totalCircuits = design.circuits?.length || 0;
  const compliantCircuits = design.circuits?.filter(c => !c.warnings || c.warnings.length === 0).length || 0;
  const warningCircuits = design.circuits?.filter(c => c.warnings && c.warnings.length > 0).length || 0;

  const compliancePercentage = totalCircuits > 0 ? Math.round((compliantCircuits / totalCircuits) * 100) : 0;

  return (
    <div className="space-y-4 sticky top-4">
      {/* Project Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Project Name</div>
            <div className="font-medium">{design.projectName}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Location</div>
            <div className="font-medium">{design.location}</div>
          </div>

          {design.clientName && (
            <div>
              <div className="text-sm text-muted-foreground">Client</div>
              <div className="font-medium">{design.clientName}</div>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Installation Type</span>
            <Badge variant="secondary" className="capitalize">
              {design.installationType}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{compliancePercentage}%</span>
            <Badge 
              variant={compliancePercentage === 100 ? "default" : "secondary"}
              className={compliancePercentage === 100 ? "bg-emerald-500" : ""}
            >
              {compliancePercentage === 100 ? "Fully Compliant" : "Review Required"}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Compliant</span>
              </div>
              <span className="font-medium">{compliantCircuits} circuits</span>
            </div>

            {warningCircuits > 0 && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span>Warnings</span>
                </div>
                <span className="font-medium">{warningCircuits} circuits</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Consumer Unit */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Consumer Unit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium capitalize">{design.consumerUnit.type.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Main Switch</span>
            <span className="font-medium">{design.consumerUnit.mainSwitchRating}A</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Supply</span>
            <span className="font-medium">
              {design.consumerUnit.incomingSupply.voltage}V {design.consumerUnit.incomingSupply.phases === 'three' ? '3-phase' : 'single-phase'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ze</span>
            <span className="font-medium">{design.consumerUnit.incomingSupply.Ze}Ω</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Earthing</span>
            <span className="font-medium">{design.consumerUnit.incomingSupply.earthingSystem}</span>
          </div>
        </CardContent>
      </Card>

      {/* Load Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Load Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Circuits</span>
            <span className="font-medium">{totalCircuits}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Load</span>
            <span className="font-medium">{design.totalLoad.toFixed(2)} kW</span>
          </div>
          {design.diversityApplied && design.diversityFactor && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Diversity Factor</span>
              <span className="font-medium">{(design.diversityFactor * 100).toFixed(0)}%</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
