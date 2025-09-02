import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResultCard } from "@/components/ui/result-card";
import InfoBox from "@/components/common/InfoBox";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { 
  Lightbulb, 
  Battery, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Clock,
  Shield,
  Wrench,
  Calculator,
  Info,
  FileText
} from "lucide-react";
import { EmergencyLightingResult } from "@/lib/emergency-lighting";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface EmergencyLightingGuidanceProps {
  result: EmergencyLightingResult;
  inputs: {
    floorArea: number;
    occupancyType: string;
    emergencyDuration: number;
    fixtureType: string;
  };
}

const EmergencyLightingGuidance: React.FC<EmergencyLightingGuidanceProps> = ({ result, inputs }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'non-compliant': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-elec-gray/20 text-elec-light border-elec-gray/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'non-compliant': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Compliance Status */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-light flex items-center gap-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              Emergency Lighting Design
            </CardTitle>
            <Badge className={getStatusColor(result.complianceStatus)}>
              {getStatusIcon(result.complianceStatus)}
              <span className="ml-1 capitalize">{result.complianceStatus}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ResultCard
              title="Total Luminaires"
              value={result.totalLuminaires}
              icon={<Lightbulb className="h-4 w-4 text-elec-yellow" />}
              status={result.totalLuminaires > 0 ? "success" : "error"}
            />
            <ResultCard
              title="System Power"
              value={result.totalPower}
              unit="W"
              icon={<Zap className="h-4 w-4 text-blue-400" />}
            />
            <ResultCard
              title="Battery Capacity"
              value={result.batteryCapacity}
              unit="Ah"
              icon={<Battery className="h-4 w-4 text-green-400" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <Card className="bg-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-elec-light flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  Advanced Details
                </div>
                <ChevronDown className="h-4 w-4 text-elec-yellow transition-transform group-data-[state=open]:rotate-180" />
              </CardTitle>
            </CardHeader>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <ResultCard
                title="Escape Route"
                value={result.escapeRouteLights}
                subtitle="luminaires"
                icon={<Lightbulb className="h-4 w-4 text-elec-yellow" />}
              />
              <ResultCard
                title="Open Area"
                value={result.openAreaLights}
                subtitle="luminaires"
                icon={<Lightbulb className="h-4 w-4 text-elec-yellow" />}
              />
              <ResultCard
                title="Anti-Panic"
                value={result.antiPanicLights}
                subtitle="luminaires"
                icon={<Shield className="h-4 w-4 text-blue-400" />}
              />
              <ResultCard
                title="High Risk"
                value={result.highRiskAreaLights}
                subtitle="luminaires"
                icon={<AlertTriangle className="h-4 w-4 text-red-400" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ResultCard
                title="Illuminance"
                value={result.illuminanceAchieved.toFixed(1)}
                unit="lux"
                subtitle="achieved"
                status={result.illuminanceAchieved >= 1 ? "success" : "error"}
              />
              <ResultCard
                title="Uniformity Ratio"
                value={`${result.uniformityRatio.toFixed(1)}:1`}
                subtitle="max 40:1"
                status={result.uniformityRatio <= 40 ? "success" : "warning"}
              />
              <ResultCard
                title="Cable Size"
                value={result.cableSize}
                subtitle={`${result.circuitCurrent.toFixed(1)}A circuit`}
                icon={<Zap className="h-4 w-4 text-elec-yellow" />}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Compliance Issues */}
      {result.complianceIssues.length > 0 && (
        <Alert className="border-red-500/20 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-200">
            <div className="font-medium mb-2">Compliance Issues:</div>
            <ul className="space-y-1 text-sm">
              {result.complianceIssues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <InfoBox
          title="Recommendations"
          icon={<Lightbulb className="h-5 w-5 text-elec-yellow" />}
          points={result.recommendations}
        />
      )}

      {/* Why This Matters */}
      <WhyThisMatters
        points={[
          "Emergency lighting provides essential illumination during power failures, ensuring safe evacuation",
          "BS 5266-1 compliance is legally required for most commercial and public buildings",
          "Proper design prevents panic and ensures clear visibility of escape routes and exits",
          "Adequate battery capacity ensures system operation throughout required duration",
          "Regular testing and maintenance prevents system failure when needed most"
        ]}
      />

      {/* Regulatory Compliance */}
      <InfoBox
        title="Regulatory Requirements"
        icon={<FileText className="h-5 w-5 text-blue-400" />}
        points={result.regulatoryNotes}
        as="section"
      />

      {/* Installation Guidelines */}
      <InfoBox
        title="Installation Guidelines"
        icon={<Wrench className="h-5 w-5 text-green-400" />}
        points={result.installationNotes}
        as="section"
      />

      {/* Testing & Maintenance */}
      <InfoBox
        title="Testing & Maintenance Schedule"
        icon={<Clock className="h-5 w-5 text-orange-400" />}
        points={result.maintenanceSchedule.concat(result.testingRequirements)}
        as="section"
      />

      {/* Cost Information */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-light flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Cost Estimation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono text-elec-yellow mb-2">
            £{result.estimatedCost.toLocaleString()}
          </div>
          <p className="text-sm text-elec-light/70">
            Estimated material and installation cost. Final costs may vary based on specific requirements,
            site conditions, and local rates.
          </p>
        </CardContent>
      </Card>

      {/* Professional Note */}
      <Alert className="border-orange-500/20 bg-orange-500/10">
        <Info className="h-4 w-4 text-orange-500" />
        <AlertDescription className="text-orange-200">
          <div className="font-medium mb-1">Professional Design Required</div>
          This calculation provides initial sizing guidance. Professional emergency lighting design should 
          consider detailed escape route layouts, photometric calculations, risk assessments, and specific 
          local authority requirements. Always consult a qualified emergency lighting designer for final specifications.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EmergencyLightingGuidance;