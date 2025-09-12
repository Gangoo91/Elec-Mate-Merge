import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Clock,
  Zap,
  Shield,
  PoundSterling,
  Settings,
  Info,
  MapPin,
  Gauge
} from "lucide-react";
import { InstallPlanData, CableRecommendation } from "./types";
import { PracticalCalculationsEngine, PracticalCalculations } from "./PracticalCalculationsEngine";

interface EnhancedPracticalGuidanceProps {
  planData: InstallPlanData;
  recommendedCable: CableRecommendation;
}

const EnhancedPracticalGuidance: React.FC<EnhancedPracticalGuidanceProps> = ({ 
  planData, 
  recommendedCable 
}) => {
  const calculations = PracticalCalculationsEngine.generatePracticalCalculations(planData, recommendedCable);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "marginal": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "fail": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-elec-blue/10 to-cyan-500/10 border border-elec-blue/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-elec-blue">
            <div className="p-2 bg-elec-blue/20 rounded-lg">
              <Wrench className="h-5 w-5" />
            </div>
            Enhanced Practical Guidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="installation" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-elec-dark/50">
              <TabsTrigger value="installation" className="text-xs">Installation</TabsTrigger>
              <TabsTrigger value="testing" className="text-xs">Testing</TabsTrigger>
              <TabsTrigger value="costs" className="text-xs">Costs</TabsTrigger>
              <TabsTrigger value="schedule" className="text-xs">Schedule</TabsTrigger>
              <TabsTrigger value="compliance" className="text-xs">Compliance</TabsTrigger>
            </TabsList>

            {/* Installation Tab */}
            <TabsContent value="installation" className="space-y-4">
              {/* Cable Pulling Calculations */}
              <Card className="bg-elec-dark/30 border-elec-yellow/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-elec-yellow text-sm flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Cable Installation Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/60">Max Pulling Force</p>
                      <p className="font-semibold text-white">{calculations.cablePulling.maxPullingForce}N</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Bend Radius</p>
                      <p className="font-semibold text-white">{calculations.cablePulling.bendRadius}mm</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Support Spacing</p>
                      <p className="font-semibold text-white">{calculations.cablePulling.supportSpacing}m</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Recommended Lubricant</p>
                      <p className="font-semibold text-white text-xs">{calculations.cablePulling.recommendedLubricant}</p>
                    </div>
                  </div>
                  
                  {calculations.cablePulling.warnings.length > 0 && (
                    <Alert className="bg-amber-500/10 border-amber-500/30">
                      <AlertTriangle className="h-4 w-4 text-amber-300" />
                      <AlertDescription className="text-amber-200">
                        <div className="text-xs space-y-1">
                          {calculations.cablePulling.warnings.map((warning, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{warning}</span>
                            </div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Conduit Fill */}
              {planData.installationMethod?.includes('conduit') && (
                <Card className="bg-elec-dark/30 border-elec-blue/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-elec-blue text-sm flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Conduit Sizing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-white/60">Recommended Size</p>
                        <p className="font-semibold text-white">{calculations.conduitFill.conduitSize}mm</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Fill Percentage</p>
                        <p className="font-semibold text-white">{calculations.conduitFill.fillPercentage}%</p>
                      </div>
                    </div>
                    {calculations.conduitFill.recommendations.map((rec, index) => (
                      <div key={index} className="text-xs text-white/80 flex items-start gap-2">
                        <Info className="h-3 w-3 mt-0.5 text-elec-blue flex-shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Earthing Calculations */}
              <Card className="bg-elec-dark/30 border-green-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-300 text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Earthing & Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/60">CPC Resistance</p>
                      <p className="font-semibold text-white">{calculations.earthingContinuity.cpcResistance}Ω</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Earth Loop Impedance</p>
                      <p className="font-semibold text-white">{calculations.earthingContinuity.earthLoopImpedance}Ω</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Max Disconnection</p>
                      <p className="font-semibold text-white">{calculations.earthingContinuity.maxDisconnectionTime}s</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">SWA Earthing</p>
                      <Badge className={calculations.earthingContinuity.swaEarthingRequired ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"}>
                        {calculations.earthingContinuity.swaEarthingRequired ? "Required" : "N/A"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testing Tab */}
            <TabsContent value="testing" className="space-y-4">
              {/* Fault Current Analysis */}
              <Card className="bg-elec-dark/30 border-red-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-red-300 text-sm flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    Fault Current Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/60">Prospective Fault Current</p>
                      <p className="font-semibold text-white">{calculations.faultCurrent.prospectiveFaultCurrent}kA</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Max Permitted Zs</p>
                      <p className="font-semibold text-white">{calculations.faultCurrent.maxZs}Ω</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Actual Zs</p>
                      <p className="font-semibold text-white">{calculations.faultCurrent.actualZs}Ω</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Safety Margin</p>
                      <Badge className={getStatusColor(calculations.faultCurrent.complianceStatus)}>
                        {calculations.faultCurrent.safetyMargin}%
                      </Badge>
                    </div>
                  </div>
                  
                  <Alert className={`border-2 ${getStatusColor(calculations.faultCurrent.complianceStatus)}`}>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Compliance Status: {calculations.faultCurrent.complianceStatus.toUpperCase()}</strong>
                      <br />
                      {calculations.faultCurrent.complianceStatus === "fail" && "Circuit does not meet disconnection requirements"}
                      {calculations.faultCurrent.complianceStatus === "marginal" && "Limited safety margin - consider design review"}
                      {calculations.faultCurrent.complianceStatus === "pass" && "Circuit meets all BS 7671 requirements"}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Pre-commissioning Tests */}
              <Card className="bg-elec-dark/30 border-elec-yellow/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-elec-yellow text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Testing Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-white/80">Pre-commissioning Tests</h4>
                    {calculations.testingGuidance.preCommissioningTests.map((test, index) => (
                      <div key={index} className="p-3 bg-black/20 rounded border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                              {test.sequence}
                            </Badge>
                            <p className="text-xs font-medium text-white">{test.test}</p>
                          </div>
                        </div>
                        <div className="text-xs text-white/70 space-y-1">
                          <p><span className="text-white/60">Expected:</span> {test.expectedResult}</p>
                          <p><span className="text-white/60">Reference:</span> {test.reference}</p>
                          <p><span className="text-white/60">Tolerance:</span> {test.tolerance}</p>
                        </div>
                        {test.notes.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {test.notes.map((note, noteIndex) => (
                              <div key={noteIndex} className="text-xs text-white/60 flex items-start gap-2">
                                <Info className="h-3 w-3 mt-0.5 text-elec-blue flex-shrink-0" />
                                <span>{note}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Costs Tab */}
            <TabsContent value="costs" className="space-y-4">
              <Card className="bg-elec-dark/30 border-green-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-300 text-sm flex items-center gap-2">
                    <PoundSterling className="h-4 w-4" />
                    Cost Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-white/60">Materials</p>
                      <p className="font-bold text-green-300 text-lg">
                        £{(calculations.costEstimate.materials.cable + 
                           calculations.costEstimate.materials.accessories + 
                           calculations.costEstimate.materials.protective).toFixed(0)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Labour</p>
                      <p className="font-bold text-blue-300 text-lg">
                        £{calculations.costEstimate.labour.installation.toFixed(0)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Testing</p>
                      <p className="font-bold text-yellow-300 text-lg">
                        £{calculations.costEstimate.labour.testing.toFixed(0)}
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="text-center">
                    <p className="text-sm text-white/80">Total Project Cost</p>
                    <p className="font-bold text-white text-2xl">
                      £{calculations.costEstimate.total.toFixed(0)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-white/80">Detailed Breakdown</h4>
                    {calculations.costEstimate.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1 text-xs">
                        <span className="text-white/70">{item.description}</span>
                        <span className="text-white font-medium">£{item.totalCost.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-4">
              <Card className="bg-elec-dark/30 border-blue-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-300 text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Installation Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/60">Planning</p>
                      <p className="font-semibold text-white">{calculations.installationTime.planning}hr</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Installation</p>
                      <p className="font-semibold text-white">{calculations.installationTime.installation}hr</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Testing</p>
                      <p className="font-semibold text-white">{calculations.installationTime.testing}hr</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Certification</p>
                      <p className="font-semibold text-white">{calculations.installationTime.certification}hr</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="text-center">
                    <p className="text-sm text-white/80">Total Time Required</p>
                    <p className="font-bold text-white text-xl">
                      {calculations.installationTime.total.toFixed(1)} hours
                    </p>
                  </div>

                  {calculations.installationTime.factors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-white/80">Time Factors Applied</h4>
                      {calculations.installationTime.factors.map((factor, index) => (
                        <div key={index} className="text-xs text-white/70 flex items-start gap-2">
                          <Info className="h-3 w-3 mt-0.5 text-blue-400 flex-shrink-0" />
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-4">
              <Card className="bg-elec-dark/30 border-purple-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-300 text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Circuit Schedule Entry
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-white/60">Circuit Reference:</span>
                      <span className="text-white font-medium">{calculations.circuitSchedule.circuitRef}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-white/60">Description:</span>
                      <span className="text-white font-medium">{calculations.circuitSchedule.description}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-white/60">Type of Wiring:</span>
                      <span className="text-white font-medium">{calculations.circuitSchedule.typeOfWiring}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-white/60">Reference Method:</span>
                      <span className="text-white font-medium">{calculations.circuitSchedule.referenceMethod}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-white/60">Cable Size:</span>
                      <span className="text-white font-medium">{calculations.circuitSchedule.cableSize}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-white/60">Protective Device:</span>
                      <span className="text-white font-medium">{calculations.circuitSchedule.protectiveDevice}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-white/60">Max Permitted Zs:</span>
                      <span className="text-white font-medium">{calculations.circuitSchedule.maxPermittedZs.toFixed(2)}Ω</span>
                    </div>
                  </div>

                  <Alert className="bg-purple-500/10 border-purple-500/30">
                    <FileText className="h-4 w-4 text-purple-300" />
                    <AlertDescription className="text-purple-200 text-xs">
                      <strong>Periodic Inspection Due:</strong> {calculations.testingGuidance.periodicInspection.nextDue}
                      <br />
                      <strong>Frequency:</strong> {calculations.testingGuidance.periodicInspection.frequency}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPracticalGuidance;