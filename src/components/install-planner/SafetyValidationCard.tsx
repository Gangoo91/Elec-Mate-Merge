import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Shield, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SafetyValidationProps {
  designCurrent: number;
  recommendedProtection: number;
  cableCapacity: number;
  zsValue: number;
  maxZs: number;
  voltageDropPercent: number;
  voltageDropLimit: number;
  loadType: string;
}

export const SafetyValidationCard = ({
  designCurrent,
  recommendedProtection,
  cableCapacity,
  zsValue,
  maxZs,
  voltageDropPercent,
  voltageDropLimit,
  loadType
}: SafetyValidationProps) => {
  
  // Critical safety checks
  const protectionTooLow = recommendedProtection < designCurrent;
  const protectionTooHigh = recommendedProtection > cableCapacity;
  const zsNonCompliant = zsValue > maxZs;
  const voltageDropExceeded = voltageDropPercent > voltageDropLimit;
  
  // Calculate overall safety status
  const criticalErrors = [protectionTooLow, protectionTooHigh].filter(Boolean).length;
  const warnings = [zsNonCompliant, voltageDropExceeded].filter(Boolean).length;
  
  const overallStatus = criticalErrors > 0 ? "critical" : warnings > 0 ? "warning" : "safe";
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-red-300 border-red-500/30 bg-red-500/10";
      case "warning": return "text-amber-300 border-amber-500/30 bg-amber-500/10";
      default: return "text-green-300 border-green-500/30 bg-green-500/10";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return <XCircle className="h-5 w-5 text-red-300" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-amber-300" />;
      default: return <CheckCircle className="h-5 w-5 text-green-300" />;
    }
  };

  return (
    <Card className={`border ${getStatusColor(overallStatus)}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            BS 7671 Safety Validation
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(overallStatus)}
            <Badge 
              variant="outline" 
              className={`${overallStatus === "critical" ? "text-red-300 border-red-500/30" : 
                          overallStatus === "warning" ? "text-amber-300 border-amber-500/30" : 
                          "text-green-300 border-green-500/30"}`}
            >
              {overallStatus === "critical" ? "CRITICAL ERRORS" : 
               overallStatus === "warning" ? "WARNINGS" : "COMPLIANT"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Critical Safety Checks */}
        <div className="space-y-3">
          
          {/* Protection vs Design Current */}
          <div className={`p-3 rounded border ${protectionTooLow ? 
            'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {protectionTooLow ? 
                  <XCircle className="h-4 w-4 text-red-300" /> : 
                  <CheckCircle className="h-4 w-4 text-green-300" />
                }
                <span className="text-sm font-medium">
                  Ib ≤ In (Design ≤ Protection)
                </span>
              </div>
              <span className={`text-sm ${protectionTooLow ? 'text-red-300' : 'text-green-300'}`}>
                {designCurrent.toFixed(1)}A ≤ {recommendedProtection}A
              </span>
            </div>
            {protectionTooLow && (
              <p className="text-xs text-red-200/80 mt-2">
                <strong>CRITICAL:</strong> Protection device rating ({recommendedProtection}A) is below design current ({designCurrent.toFixed(1)}A). 
                Device will trip immediately!
              </p>
            )}
          </div>

          {/* Protection vs Cable Capacity */}
          <div className={`p-3 rounded border ${protectionTooHigh ? 
            'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {protectionTooHigh ? 
                  <XCircle className="h-4 w-4 text-red-300" /> : 
                  <CheckCircle className="h-4 w-4 text-green-300" />
                }
                <span className="text-sm font-medium">
                  In ≤ Iz (Protection ≤ Cable)
                </span>
              </div>
              <span className={`text-sm ${protectionTooHigh ? 'text-red-300' : 'text-green-300'}`}>
                {recommendedProtection}A ≤ {cableCapacity}A
              </span>
            </div>
            {protectionTooHigh && (
              <p className="text-xs text-red-200/80 mt-2">
                <strong>CRITICAL:</strong> Protection device ({recommendedProtection}A) exceeds cable capacity ({cableCapacity}A). 
                Cable overload risk!
              </p>
            )}
          </div>

          {/* Earth Fault Loop Impedance */}
          <div className={`p-3 rounded border ${zsNonCompliant ? 
            'bg-amber-500/10 border-amber-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {zsNonCompliant ? 
                  <AlertTriangle className="h-4 w-4 text-amber-300" /> : 
                  <CheckCircle className="h-4 w-4 text-green-300" />
                }
                <span className="text-sm font-medium">
                  Zs ≤ Zs max (Earth Fault Loop)
                </span>
              </div>
              <span className={`text-sm ${zsNonCompliant ? 'text-amber-300' : 'text-green-300'}`}>
                {zsValue.toFixed(3)}Ω ≤ {maxZs.toFixed(3)}Ω
              </span>
            </div>
            {zsNonCompliant && (
              <p className="text-xs text-amber-200/80 mt-2">
                Earth fault loop impedance too high. May not disconnect in required time. 
                Consider larger cable or supplementary bonding.
              </p>
            )}
          </div>

          {/* Voltage Drop */}
          <div className={`p-3 rounded border ${voltageDropExceeded ? 
            'bg-amber-500/10 border-amber-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {voltageDropExceeded ? 
                  <AlertTriangle className="h-4 w-4 text-amber-300" /> : 
                  <CheckCircle className="h-4 w-4 text-green-300" />
                }
                <span className="text-sm font-medium">
                  Voltage Drop ({loadType === "lighting" ? "Lighting" : "Power"})
                </span>
              </div>
              <span className={`text-sm ${voltageDropExceeded ? 'text-amber-300' : 'text-green-300'}`}>
                {voltageDropPercent.toFixed(2)}% ≤ {voltageDropLimit}%
              </span>
            </div>
            {voltageDropExceeded && (
              <p className="text-xs text-amber-200/80 mt-2">
                Voltage drop exceeds BS 7671 limits. Equipment may not operate correctly. 
                Consider larger cable size.
              </p>
            )}
          </div>
        </div>

        {/* Summary Message */}
        {overallStatus === "critical" && (
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertTriangle className="h-4 w-4 text-red-300" />
            <AlertDescription className="text-red-200">
              <strong>This design contains critical safety errors and must not be installed.</strong> 
              Review protective device rating and cable selection before proceeding.
            </AlertDescription>
          </Alert>
        )}
        
        {overallStatus === "warning" && (
          <Alert className="bg-amber-500/10 border-amber-500/30">
            <AlertTriangle className="h-4 w-4 text-amber-300" />
            <AlertDescription className="text-amber-200">
              This design has warnings that should be addressed for optimal performance and compliance.
            </AlertDescription>
          </Alert>
        )}
        
        {overallStatus === "safe" && (
          <Alert className="bg-green-500/10 border-green-500/30">
            <CheckCircle className="h-4 w-4 text-green-300" />
            <AlertDescription className="text-green-200">
              This design meets all BS 7671 safety requirements and is suitable for installation.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};