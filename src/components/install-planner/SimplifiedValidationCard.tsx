// Validation card that shows calculation confidence
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { InstallPlanData } from "./types";
import { getSimpleCableSpec, getAllCableTypes } from "./SimplifiedCableDatabase";

interface SimplifiedValidationCardProps {
  planData: InstallPlanData;
}

const SimplifiedValidationCard = ({ planData }: SimplifiedValidationCardProps) => {
  const validations = [];
  let confidence = 100;

  // Check cable type validity
  const availableCableTypes = getAllCableTypes();
  const isCableTypeValid = availableCableTypes.includes(planData.cableType);
  
  if (isCableTypeValid) {
    validations.push({
      type: "success",
      message: "Cable type recognised in simplified database",
      icon: <CheckCircle className="h-4 w-4" />
    });
  } else {
    validations.push({
      type: "error", 
      message: "Cable type not in simplified database - using fallback calculations",
      icon: <XCircle className="h-4 w-4" />
    });
    confidence -= 30;
  }

  // Check installation method mapping
  const methodMapped = ["clipped-direct", "in-conduit", "in-trunking", "through-insulation", "underground", "cable-tray"].includes(planData.installationMethod);
  
  if (methodMapped) {
    validations.push({
      type: "success",
      message: "Installation method properly mapped to current carrying capacity",
      icon: <CheckCircle className="h-4 w-4" />
    });
  } else {
    validations.push({
      type: "warning",
      message: "Installation method may use generic capacity values",
      icon: <AlertTriangle className="h-4 w-4" />
    });
    confidence -= 20;
  }

  // Check environmental conditions impact
  const tempImpact = (planData.ambientTemperature || 30) !== 30;
  if (tempImpact) {
    validations.push({
      type: "info",
      message: `Temperature derating applied for ${planData.ambientTemperature}°C`,
      icon: <Info className="h-4 w-4" />
    });
  }

  // Check grouping impact  
  const groupingImpact = (planData.groupingFactor || 1) < 1;
  if (groupingImpact) {
    validations.push({
      type: "info", 
      message: `Grouping derating applied (factor: ${planData.groupingFactor})`,
      icon: <Info className="h-4 w-4" />
    });
  }

  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return "text-green-400 bg-green-400/10 border-green-400/30";
    if (conf >= 70) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    return "text-red-400 bg-red-400/10 border-red-400/30";
  };

  const getValidationStyle = (type: string) => {
    switch (type) {
      case "success": return "text-green-400";
      case "warning": return "text-yellow-400"; 
      case "error": return "text-red-400";
      default: return "text-blue-400";
    }
  };

  return (
    <Card className="bg-elec-dark/50 border-elec-yellow/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-elec-yellow flex items-center justify-between">
          <span>Calculation Confidence</span>
          <Badge className={getConfidenceColor(confidence)}>
            {confidence}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {validations.map((validation, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={getValidationStyle(validation.type)}>
              {validation.icon}
            </div>
            <span className="text-sm text-muted-foreground leading-relaxed">
              {validation.message}
            </span>
          </div>
        ))}
        
        {confidence >= 90 && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-green-300 font-medium text-sm">
              ✅ High confidence - All calculations use verified BS 7671 data
            </div>
          </div>
        )}
        
        {confidence < 70 && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="text-red-300 font-medium text-sm">
              ⚠️ Lower confidence - Some selections may use generic values
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimplifiedValidationCard;