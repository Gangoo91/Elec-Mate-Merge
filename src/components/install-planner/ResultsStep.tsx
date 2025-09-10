
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstallPlanData } from "./types";
import { Download, Calculator, AlertTriangle, CheckCircle, XCircle, Lightbulb, Shield } from "lucide-react";
import { getSuitableDevices, getDeviceInfo, getRecommendedDeviceType } from "@/lib/calculators/bs7671-data/protectiveDevices";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CableSelectionEngine } from "./CableSelectionEngine";
import CableRecommendationsCard from "./CableRecommendationsCard";
import InstallationSuggestionsCard from "./InstallationSuggestionsCard";
import ComplianceChecksCard from "./ComplianceChecksCard";
import VisualCircuitDesigner from "./VisualCircuitDesigner";
import PostResultGuidance from "./PostResultGuidance";
import { UnifiedResultsCard } from "./unified-results-card";

interface ResultsStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const ResultsStep = ({ planData }: ResultsStepProps) => {
  
  // Enhanced device recommendations function
  const getEnhancedDeviceRecommendations = (
    designCurrent: number, 
    cableCapacity: number, 
    currentDevice: string,
    loadType: string,
    voltage: number
  ) => {
    // Get all suitable devices from the enhanced database
    const suitableDevices = getSuitableDevices(designCurrent, cableCapacity);
    
    // Determine the recommended device type for this application
    const recommendedType = getRecommendedDeviceType(designCurrent, loadType, voltage);
    
    return suitableDevices.map(deviceOption => {
      const deviceInfo = getDeviceInfo(deviceOption.deviceType);
      const isRecommended = deviceOption.deviceType === recommendedType || 
                           (currentDevice && deviceOption.deviceType === currentDevice);
      
      return {
        name: deviceInfo?.type.toUpperCase() + (deviceInfo?.curve ? ` Type ${deviceInfo.curve}` : ''),
        description: deviceInfo?.characteristics.applications.join(', ') || 'General purpose protection',
        rating: deviceOption.recommended,
        ratingRange: `${deviceInfo?.ratingRange[0]}A - ${deviceInfo?.ratingRange[1]}A`,
        maxZs: deviceInfo?.maxZs[deviceOption.recommended] || 0,
        breakingCapacity: deviceInfo?.characteristics.breakingCapacity || 10,
        compliant: deviceOption.compliance,
        recommended: isRecommended,
        cost: deviceInfo?.procurement.costRange || 'medium',
        procurement: {
          suppliers: deviceInfo?.procurement.typical || 'Standard suppliers',
          leadTime: deviceInfo?.procurement.leadTime || '1-2 weeks',
          availability: deviceInfo?.procurement.availability || 'good'
        }
      };
    }).sort((a, b) => {
      // Sort recommended first, then by rating
      if (a.recommended !== b.recommended) {
        return a.recommended ? -1 : 1;
      }
      return a.rating - b.rating;
    });
  };
  // Calculate design current
  const designCurrent = planData.phases === "single" 
    ? planData.totalLoad / planData.voltage 
    : planData.totalLoad / (planData.voltage * Math.sqrt(3) * (planData.powerFactor || 0.85));

  // Use the enhanced cable selection engine
  const cableOptions = CableSelectionEngine.calculateCableOptions(planData);
  const suitableCables = cableOptions.filter(cable => cable.suitability === "suitable");
  const recommendedCable = suitableCables.length > 0 ? suitableCables[0] : null;
  const closestNonCompliant = suitableCables.length === 0 ? cableOptions[0] : null;
  const alternativeCables = suitableCables.slice(1, 4);

  // Safe cable for calculations - use recommended or closest non-compliant
  const baseCable = recommendedCable || closestNonCompliant;
  
  // Calculate Zs (enhanced calculation)
  const r1r2 = planData.cableLength * (
    baseCable?.size === "1.5mm²" ? 24.2 : 
    baseCable?.size === "2.5mm²" ? 14.8 : 
    baseCable?.size === "4.0mm²" ? 9.2 : 
    baseCable?.size === "6.0mm²" ? 6.2 : 
    baseCable?.size === "10.0mm²" ? 3.66 : 
    baseCable?.size === "16.0mm²" ? 2.3 : 
    baseCable?.size === "25.0mm²" ? 1.454 : 1.0
  ) / 1000;
  
  const zsValue = planData.ze + r1r2;
  
  // Enhanced Zs compliance check
  const getMaxZs = () => {
    if (planData.protectiveDevice.includes("rcbo") || planData.protectiveDevice.includes("mcb")) {
      return planData.voltage === 230 ? 1.44 : 0.83;
    } else {
      return planData.voltage === 230 ? 1.15 : 0.66;
    }
  };
  
  const maxZs = getMaxZs();
  const zsCompliance = zsValue <= maxZs;

  // Generate enhanced suggestions and compliance checks
  const suggestions = CableSelectionEngine.generateSuggestions(planData, cableOptions);
  const complianceChecks = recommendedCable ? 
    CableSelectionEngine.performComplianceChecks(planData, zsValue, recommendedCable) : [];

  // Calculate diversity factor based on installation type and load
  const getDiversityFactor = () => {
    if (planData.installationType === "domestic") {
      switch (planData.loadType) {
        case "power": return 0.4; // 40% diversity for socket outlets
        case "lighting": return 0.66; // 66% diversity for lighting
        case "cooker": return 0.1; // 10% diversity for cookers
        default: return 0.8;
      }
    } else if (planData.installationType === "commercial") {
      return 0.75; // 75% diversity for commercial
    }
    return 1.0; // No diversity for industrial/specialised
  };

  const diversityFactor = getDiversityFactor();
  const diversifiedLoad = planData.totalLoad * diversityFactor;

  const exportResults = () => {
    const exportData = {
      planData,
      calculations: {
        designCurrent: designCurrent.toFixed(2),
        zsValue: zsValue.toFixed(3),
        zsCompliance,
        diversityFactor,
        diversifiedLoad: diversifiedLoad.toFixed(0)
      },
      recommendedCable,
      alternativeCables,
      suggestions,
      complianceChecks,
      timestamp: new Date().toISOString(),
      generatedBy: "Elec-Mate Installation Planner v2.0"
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elec-mate-install-plan-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!recommendedCable && !closestNonCompliant) {
    return (
      <div className="space-y-6">
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-300" />
          <AlertDescription className="text-red-200">
            <strong>Unable to generate recommendations.</strong> Please check your input parameters and try again.
            The design current may exceed available cable capacities for the specified conditions.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Professional Installation Plan</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Comprehensive analysis with visual circuit design, multiple recommendations, and BS 7671 compliance verification.
        </p>
      </div>

      {/* Visual Circuit Designer - Full Width */}
      <VisualCircuitDesigner 
        planData={planData} 
        recommendedCable={recommendedCable}
      />

      {/* Unified Results Card - Same as Multi-Circuit */}
      <UnifiedResultsCard
        planData={planData}
        recommendations={cableOptions}
        designCurrent={designCurrent}
        zsValue={zsValue}
        maxZs={maxZs}
      />

      {/* Main Results Grid - Mobile-First Layout */}
      <div className="space-y-4 sm:space-y-6">
        {/* Design Summary - Mobile First */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Design Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Key Metrics Grid - Mobile Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-elec-dark/50 rounded border border-elec-yellow/20 text-center">
                <p className="text-xs text-muted-foreground mb-1">Design Current</p>
                <p className="text-xl sm:text-2xl font-bold text-elec-yellow">{designCurrent.toFixed(2)}A</p>
              </div>
              
              <div className="p-4 bg-elec-dark/50 rounded border border-elec-yellow/20 text-center">
                <p className="text-xs text-muted-foreground mb-1">Cable Size</p>
                <p className={`text-lg sm:text-xl font-bold ${recommendedCable ? 'text-green-400' : 'text-red-400'}`}>
                  {recommendedCable ? recommendedCable.size : (closestNonCompliant ? closestNonCompliant.size : "--")}
                </p>
                {!recommendedCable && closestNonCompliant && (
                  <p className="text-xs text-red-400">NON-COMPLIANT</p>
                )}
              </div>

              <div className="p-4 bg-elec-dark/50 rounded border border-elec-yellow/20 text-center">
                <p className="text-xs text-muted-foreground mb-1">Voltage Drop</p>
                <p className={`text-lg font-bold ${recommendedCable ? 'text-blue-400' : 'text-red-400'}`}>
                  {recommendedCable ? recommendedCable.voltageDropPercentage.toFixed(1) : (closestNonCompliant ? closestNonCompliant.voltageDropPercentage.toFixed(1) : "--")}%
                </p>
                {!recommendedCable && closestNonCompliant && closestNonCompliant.voltageDropPercentage > (planData.loadType === "lighting" ? 3 : 5) && (
                  <p className="text-xs text-red-400">EXCEEDS LIMIT</p>
                )}
              </div>

              <div className="p-4 bg-elec-dark/50 rounded border border-elec-yellow/20 text-center">
                <p className="text-xs text-muted-foreground mb-1">Zs Value</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-bold">{zsValue.toFixed(2)}Ω</span>
                  {zsCompliance ? 
                    <CheckCircle className="h-4 w-4 text-green-400" /> : 
                    <XCircle className="h-4 w-4 text-red-400" />
                  }
                </div>
              </div>
            </div>

            {/* Enhanced Protective Device Selection */}
            <div className="p-4 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-light">Protective Device Options</p>
                </div>
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 self-start sm:self-center">
                  BS 7671 COMPLIANT
                </Badge>
              </div>
              <div className="space-y-3">
                {getEnhancedDeviceRecommendations(designCurrent, baseCable?.currentCarryingCapacity || 0, planData.protectiveDevice, planData.loadType, planData.voltage)
                  .slice(0, 3).map((device, index) => (
                  <div key={index} className={`p-3 rounded border ${
                    device.recommended 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium text-sm sm:text-base ${
                            device.recommended ? 'text-green-300' : 'text-blue-300'
                          }`}>
                            {device.rating}A {device.name}
                          </span>
                          <Badge variant="outline" className={`text-xs ${
                            device.recommended 
                              ? 'text-green-400 border-green-400/30' 
                              : 'text-blue-400 border-blue-400/30'
                          } self-start sm:self-center`}>
                            {device.recommended ? 'RECOMMENDED' : 'ALTERNATIVE'}
                          </Badge>
                        </div>
                        <p className={`text-xs ${
                          device.recommended ? 'text-green-200/60' : 'text-blue-200/60'
                        }`}>
                          Max Zs: {device.maxZs.toFixed(3)}Ω • Range: {device.ratingRange}
                        </p>
                      </div>
                      {device.compliant ? (
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Show critical non-compliance for high currents */}
                {designCurrent > 125 && (
                  <div className="p-3 bg-amber-500/10 rounded border border-amber-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-amber-300" />
                      <span className="text-amber-300 font-medium text-sm">High Current Design</span>
                    </div>
                    <p className="text-xs text-amber-200/80">
                      Design current {designCurrent.toFixed(1)}A exceeds standard MCB range. 
                      BS88 HRC fuses or MCCB recommended for currents above 125A.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Additional Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                <p className="text-sm text-muted-foreground">Installation Method</p>
                <p className="font-medium capitalize text-sm sm:text-base">{planData.installationMethod.replace('-', ' ')}</p>
              </div>

              <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                <p className="text-sm text-muted-foreground">Environment</p>
                <p className="font-medium text-sm sm:text-base">{planData.ambientTemperature}°C</p>
              </div>

              <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                <p className="text-sm text-muted-foreground">Load After Diversity</p>
                <p className="font-medium text-sm sm:text-base">{(diversifiedLoad / 1000).toFixed(1)}kW</p>
                <p className="text-xs text-muted-foreground">({(diversityFactor * 100).toFixed(0)}% applied)</p>
              </div>

              {baseCable && (
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Expected Cost</p>
                  <p className="font-medium text-green-400 text-sm sm:text-base">£{(baseCable.size === "1.5mm²" ? 45 : baseCable.size === "2.5mm²" ? 65 : 85)}-{(baseCable.size === "1.5mm²" ? 85 : baseCable.size === "2.5mm²" ? 125 : 165)}</p>
                  <p className="text-xs text-muted-foreground">Per 100m estimate</p>
                </div>
              )}
            </div>

            {/* Quick Status Indicators */}
            {baseCable && (
              <div className="pt-4 border-t border-elec-yellow/20">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Capacity</span>
                    <div className="flex items-center gap-1">
                      {baseCable.currentCarryingCapacity >= designCurrent * 1.1 ? 
                        <CheckCircle className="h-4 w-4 text-green-400" /> : 
                        <XCircle className="h-4 w-4 text-red-400" />
                      }
                      <span className={`text-xs sm:text-sm ${baseCable.currentCarryingCapacity >= designCurrent * 1.1 ? 
                        "text-green-400" : "text-red-400"}`}>
                        {baseCable.currentCarryingCapacity >= designCurrent * 1.1 ? "OK" : "INSUFFICIENT"}
                        {!recommendedCable && " (NON-COMPLIANT)"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Voltage Drop</span>
                    <div className="flex items-center gap-1">
                      {baseCable.voltageDropPercentage <= 
                        (planData.loadType === "lighting" ? 3 : 5) ? 
                        <CheckCircle className="h-4 w-4 text-green-400" /> : 
                        <XCircle className="h-4 w-4 text-red-400" />
                      }
                      <span className={`text-xs sm:text-sm ${baseCable.voltageDropPercentage <= 
                        (planData.loadType === "lighting" ? 3 : 5) ? 
                        "text-green-400" : "text-red-400"}`}>
                        {baseCable.voltageDropPercentage <= 
                          (planData.loadType === "lighting" ? 3 : 5) ? "OK" : "EXCESSIVE"}
                        {!recommendedCable && " (NON-COMPLIANT)"}
                      </span>
                    </div>
                  </div>
                
                 <div className="flex items-center justify-between text-sm">
                   <span>Earth Fault Loop</span>
                   <div className="flex items-center gap-1">
                     {zsCompliance ? 
                       <CheckCircle className="h-4 w-4 text-green-400" /> : 
                       <XCircle className="h-4 w-4 text-red-400" />
                     }
                     <span className={`text-xs sm:text-sm ${zsCompliance ? "text-green-400" : "text-red-400"}`}>
                       {zsCompliance ? "COMPLIANT" : "NON-COMPLIANT"}
                     </span>
                   </div>
                 </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Non-Compliance Alert */}
        {!recommendedCable && closestNonCompliant && (
          <Alert className="bg-red-500/10 border-red-500/30">
            <XCircle className="h-4 w-4 text-red-300" />
            <AlertDescription className="text-red-200">
              <strong>No BS 7671 Compliant Cable Found:</strong> No single cable meets all requirements for this design. 
              The closest option ({closestNonCompliant.size}) has {closestNonCompliant.voltageDropPercentage.toFixed(2)}% voltage drop, 
              exceeding the {planData.loadType === "lighting" ? "3%" : "5%"} limit. Consider design modifications.
            </AlertDescription>
          </Alert>
        )}

        {/* Cable Recommendations */}
        <CableRecommendationsCard 
          recommendations={recommendedCable ? [recommendedCable, ...alternativeCables] : (closestNonCompliant ? [closestNonCompliant] : [])}
          showNonCompliant={!recommendedCable}
        />

        {/* Suggestions and Compliance - Stacked for Mobile */}
        <div className="space-y-4 sm:space-y-6">
          <ComplianceChecksCard checks={complianceChecks} />
          <InstallationSuggestionsCard suggestions={suggestions} />
        </div>
        
        {/* Professional Guidance */}
        {recommendedCable && (
          <PostResultGuidance 
            planData={planData} 
            recommendedCable={recommendedCable}
          />
        )}
      </div>

      {/* Professional Notice */}
      <Alert className="bg-amber-500/10 border-amber-500/30">
        <Lightbulb className="h-4 w-4 text-amber-300" />
        <AlertDescription className="text-amber-200">
          <strong>Professional Verification Required:</strong> This tool provides guidance based on BS 7671:2018+A2:2022 requirements and simplified calculations. 
          Always verify results with current regulations, manufacturer specifications, and site-specific conditions. 
          Professional design verification and testing is recommended for all electrical installations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultsStep;
