import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SelectivityResult } from "@/lib/selectivity";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  Zap,
  Target,
  Clock,
  TrendingUp
} from "lucide-react";

interface SelectivityGuidanceProps {
  result: SelectivityResult;
}

const SelectivityGuidance: React.FC<SelectivityGuidanceProps> = ({ result }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-elec-gray';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'requires-verification': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'non-compliant': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-elec-gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Selectivity Analysis Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-elec-light/80 mb-1">Overall Status</div>
              <Badge 
                variant={result.isSelective ? "default" : "destructive"}
                className="text-sm"
              >
                {result.isSelective ? "✓ Selective" : "✗ Not Selective"}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm text-elec-light/80 mb-1">Risk Level</div>
              <Badge className={getRiskColor(result.riskLevel)}>
                {result.riskLevel.toUpperCase()}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm text-elec-light/80 mb-1">Compliance</div>
              <Badge className={getComplianceColor(result.complianceStatus)}>
                {result.complianceStatus.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-elec-light/80 mb-2">Selectivity Breakdown</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Overload Protection:</span>
                  <Badge variant={result.overloadSelectivity ? "default" : "destructive"} className="text-xs">
                    {result.overloadSelectivity ? "✓" : "✗"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Short-Circuit Protection:</span>
                  <Badge variant={result.shortCircuitSelectivity ? "default" : "destructive"} className="text-xs">
                    {result.shortCircuitSelectivity ? "✓" : "✗"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Breaking Capacity:</span>
                  <Badge variant={result.breakingCapacityCheck ? "default" : "destructive"} className="text-xs">
                    {result.breakingCapacityCheck ? "✓" : "✗"}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-elec-light/80 mb-2">Key Metrics</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-elec-light/70">Selectivity Ratio:</span>
                  <span className="text-elec-yellow font-mono">{result.selectivityRatio.toFixed(2)}:1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-elec-light/70">Selectivity Limit:</span>
                  <span className="text-elec-yellow font-mono">{result.selectivityLimit.toFixed(0)}A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-elec-light/70">Time Margin:</span>
                  <span className="text-elec-yellow font-mono">
                    {((result.operatingTimes.upstream - result.operatingTimes.downstream) * 1000).toFixed(0)}ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Immediate Actions */}
      {result.immediateActions.length > 0 && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <CardTitle className="text-lg text-red-400">Immediate Actions Required</CardTitle>
            </div>
            <CardDescription>
              Critical issues that require immediate attention before energising the installation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.immediateActions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span className="text-red-200 text-sm">{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Concerns */}
      {result.concerns.length > 0 && (
        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <CardTitle className="text-lg text-orange-400">Primary Concerns</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.concerns.map((concern, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span className="text-orange-200 text-sm">{concern}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Technical Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span className="text-elec-light text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Regulatory Guidance */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-lg text-blue-400">Regulatory Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-blue-300 mb-2">BS 7671:2018 Requirements</h4>
            <ul className="space-y-1 text-sm text-blue-200">
              <li>• Regulation 536.4.1: Selectivity between protective devices</li>
              <li>• Section 536: Co-ordination of protective devices</li>
              <li>• Appendix 3: Time/current characteristics must be verified</li>
              <li>• Regulation 432.1: Protection against overload currents</li>
            </ul>
          </div>

          <Separator className="border-blue-500/20" />

          <div>
            <h4 className="font-medium text-blue-300 mb-2">IET Guidance Notes</h4>
            <ul className="space-y-1 text-sm text-blue-200">
              <li>• GN1: Selection & Erection of Equipment</li>
              <li>• GN5: Protection Against Electric Shock</li>
              <li>• Design calculations must demonstrate selectivity</li>
              <li>• Testing schedules must verify coordination</li>
            </ul>
          </div>

          <Separator className="border-blue-500/20" />

          <div>
            <h4 className="font-medium text-blue-300 mb-2">Professional Standards</h4>
            <ul className="space-y-1 text-sm text-blue-200">
              <li>• IET Code of Practice for Electrical Safety Management</li>
              <li>• CIBSE Guide L: Lighting</li>
              <li>• BEAMA Guide to Protection Coordination</li>
              <li>• Manufacturer selectivity tables must be consulted</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Technical Analysis */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Technical Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-elec-yellow mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Operating Times Analysis
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-elec-light/70">Downstream Operation:</span>
                  <span className="text-elec-yellow font-mono">
                    {(result.operatingTimes.downstream * 1000).toFixed(0)}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/70">Upstream Operation:</span>
                  <span className="text-elec-yellow font-mono">
                    {(result.operatingTimes.upstream * 1000).toFixed(0)}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/70">Time Discrimination:</span>
                  <span className={`font-mono ${
                    (result.operatingTimes.upstream - result.operatingTimes.downstream) >= 0.1 
                      ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {((result.operatingTimes.upstream - result.operatingTimes.downstream) * 1000).toFixed(0)}ms
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-elec-yellow mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Magnetic Trip Settings
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-elec-light/70">Downstream Magnetic:</span>
                  <span className="text-elec-yellow font-mono">
                    {result.magneticTrips.downstream.toFixed(0)}A
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/70">Upstream Magnetic:</span>
                  <span className="text-elec-yellow font-mono">
                    {result.magneticTrips.upstream.toFixed(0)}A
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/70">Magnetic Ratio:</span>
                  <span className={`font-mono ${
                    (result.magneticTrips.upstream / result.magneticTrips.downstream) >= 1.6 
                      ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {(result.magneticTrips.upstream / result.magneticTrips.downstream).toFixed(2)}:1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why This Matters */}
      <WhyThisMatters
        title="Why Selectivity Matters"
        points={[
          "Prevents unnecessary outages by isolating only the faulted circuit",
          "Reduces downtime and improves system availability for critical loads",
          "Ensures compliance with BS 7671 coordination requirements",
          "Minimises risk of cascading failures and equipment damage",
          "Essential for maintaining electrical safety in complex installations",
          "Required for insurance compliance and professional liability",
        ]}
      />
    </div>
  );
};

export default SelectivityGuidance;