import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InstallPlanData, CableRecommendation } from "./types";
import { Calculator, Zap, ShoppingCart, Clock, Shield, CheckCircle, AlertTriangle, Download } from "lucide-react";

interface IntelligentResultsCardProps {
  planData: InstallPlanData;
  recommendations: CableRecommendation[];
  protectionDevice: { type: string; rating: number; cost: number } | null;
  costEstimate: {
    materials: number;
    labour: number;
    total: number;
    breakdown: { item: string; cost: number }[];
  } | null;
  designCurrent: number;
}

const IntelligentResultsCard = ({ 
  planData, 
  recommendations, 
  protectionDevice, 
  costEstimate,
  designCurrent 
}: IntelligentResultsCardProps) => {
  
  const primaryRecommendation = recommendations[0];
  const alternatives = recommendations.slice(1, 3);

  const exportRecommendation = () => {
    const exportData = {
      project: `${planData.loadType} installation - ${planData.totalLoad}W`,
      designCurrent: `${designCurrent.toFixed(1)}A`,
      recommendedSolution: {
        cable: `${primaryRecommendation.size} ${primaryRecommendation.type}`,
        protection: protectionDevice ? `${protectionDevice.rating}A ${protectionDevice.type.toUpperCase()}` : "TBD",
        installationMethod: planData.installationMethod?.replace('-', ' '),
        environment: planData.environmentalConditions?.replace('-', ' ')
      },
      costEstimate: costEstimate ? {
        materials: `£${costEstimate.materials.toFixed(0)}`,
        labour: `£${costEstimate.labour.toFixed(0)}`,
        total: `£${costEstimate.total.toFixed(0)}`
      } : null,
      shoppingList: costEstimate?.breakdown || [],
      regulatoryNotes: [
        "Installation requires Building Regulations compliance",
        "Part P notification may be required",
        "Testing and certification in accordance with BS 7671",
        "Installation by competent person recommended"
      ],
      generatedBy: "Elec-Mate Installation Planner",
      timestamp: new Date().toLocaleDateString('en-GB')
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `installation-specification-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!primaryRecommendation) {
    return (
      <Card className="border-red-500/30 bg-red-500/10">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-300 mb-2">No Suitable Solution Found</h3>
          <p className="text-red-200/80">
            The current load requirements exceed available cable capacities. 
            Consider reducing load or using multiple circuits.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Primary Recommendation */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-green-300 flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg">Recommended Solution</div>
              <div className="text-sm font-normal text-green-200/80">
                Intelligent analysis for {planData.environmentalConditions?.replace('-', ' ')} environment
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Solution Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-300">Cable Solution</span>
              </div>
              <p className="text-lg font-bold text-green-200">
                {primaryRecommendation.size} {primaryRecommendation.type.toUpperCase().replace('-', ' ')}
              </p>
              <p className="text-xs text-green-200/70">
                Capacity: {primaryRecommendation.currentCarryingCapacity.toFixed(0)}A
              </p>
            </div>

            {protectionDevice && (
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Protection</span>
                </div>
                <p className="text-lg font-bold text-green-200">
                  {protectionDevice.rating}A {protectionDevice.type.toUpperCase()}
                </p>
                <p className="text-xs text-green-200/70">
                  Auto-selected for load protection
                </p>
              </div>
            )}

            {costEstimate && (
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingCart className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Total Cost</span>
                </div>
                <p className="text-lg font-bold text-green-200">
                  £{costEstimate.total.toFixed(0)}
                </p>
                <p className="text-xs text-green-200/70">
                  Materials + Labour
                </p>
              </div>
            )}
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="text-center">
              <p className="text-xs text-green-200/60">Design Current</p>
              <p className="text-sm font-bold text-green-300">{designCurrent.toFixed(1)}A</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-green-200/60">Voltage Drop</p>
              <p className="text-sm font-bold text-green-300">{primaryRecommendation.voltageDropPercentage.toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-green-200/60">Safety Margin</p>
              <p className="text-sm font-bold text-green-300">
                {((primaryRecommendation.currentCarryingCapacity / designCurrent - 1) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-green-200/60">Installation</p>
              <p className="text-sm font-bold text-green-300 capitalize">
                {primaryRecommendation.installationComplexity}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-300">Key Features:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-green-300 border-green-500/30">
                BS 7671 Compliant
              </Badge>
              <Badge variant="outline" className="text-green-300 border-green-500/30">
                {primaryRecommendation.availability} Availability
              </Badge>
              <Badge variant="outline" className="text-green-300 border-green-500/30">
                {primaryRecommendation.cost} Cost
              </Badge>
              {primaryRecommendation.specialConsiderations?.map((consideration, index) => (
                <Badge key={index} variant="outline" className="text-green-300 border-green-500/30 text-xs">
                  {consideration.split(' ').slice(0, 2).join(' ')}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      {costEstimate && (
        <Card className="border-blue-500/30 bg-blue-500/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-blue-300 flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg">Cost Breakdown</div>
                <div className="text-sm font-normal text-blue-200/80">Professional estimation</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {costEstimate.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-blue-500/10 rounded">
                  <span className="text-sm text-blue-200">{item.item}</span>
                  <span className="text-sm font-medium text-blue-300">£{item.cost.toFixed(0)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-blue-500/30 pt-3">
              <div className="flex justify-between items-center text-base font-bold">
                <span className="text-blue-200">Total Project Cost:</span>
                <span className="text-blue-300">£{costEstimate.total.toFixed(0)}</span>
              </div>
              <p className="text-xs text-blue-200/60 mt-1">
                Estimate includes materials and typical labour rates
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alternative Options */}
      {alternatives.length > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-amber-300 flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg">Alternative Options</div>
                <div className="text-sm font-normal text-amber-200/80">Cost vs performance trade-offs</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alternatives.map((alt, index) => (
              <div key={index} className="p-3 bg-amber-500/10 rounded border border-amber-500/30">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium text-amber-200">
                      {alt.size} {alt.type.toUpperCase().replace('-', ' ')}
                    </span>
                    <p className="text-xs text-amber-200/70">
                      Capacity: {alt.currentCarryingCapacity.toFixed(0)}A | VD: {alt.voltageDropPercentage.toFixed(1)}%
                    </p>
                  </div>
                  <Badge variant="outline" className="text-amber-300 border-amber-500/30">
                    {alt.cost} Cost
                  </Badge>
                </div>
                <p className="text-xs text-amber-200/80">
                  {alt.notes[0] || "Alternative solution with different cost/performance balance"}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Export Button */}
      <div className="flex justify-center">
        <Button 
          onClick={exportRecommendation}
          className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark font-medium"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Installation Specification
        </Button>
      </div>
    </div>
  );
};

export default IntelligentResultsCard;