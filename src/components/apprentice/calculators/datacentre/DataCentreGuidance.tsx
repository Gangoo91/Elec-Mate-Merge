import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Server, 
  Zap, 
  Thermometer, 
  Battery, 
  TrendingUp, 
  Shield, 
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  Gauge,
  PoundSterling,
  Leaf,
  Info,
  Clock,
  Target
} from "lucide-react";
import { DataCentreResults } from "@/lib/datacentre";
import { formatLargeCurrency, formatLargeNumber } from "@/lib/format";
import { useState } from "react";

interface DataCentreGuidanceProps {
  results: DataCentreResults;
}

export function DataCentreGuidance({ results }: DataCentreGuidanceProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-elec-yellow" />;
      case 'non-compliant': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-elec-yellow" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge variant="success">Compliant</Badge>;
      case 'warning': return <Badge variant="warning">Warning</Badge>;
      case 'non-compliant': return <Badge variant="destructive">Non-compliant</Badge>;
      default: return <Badge variant="warning">Warning</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">High</Badge>;
      case 'medium': return <Badge variant="warning">Medium</Badge>;
      case 'low': return <Badge variant="secondary">Low</Badge>;
      default: return <Badge variant="secondary">Low</Badge>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Executive Summary - What This Means */}
      <Card className="border-elec-yellow/20 bg-elec-grey">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-elec-light text-lg">
            <Info className="h-5 w-5 text-elec-yellow" />
            What This Means
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="p-5 bg-elec-grey rounded-xl border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-6 w-6 text-elec-yellow flex-shrink-0" />
                <h4 className="font-semibold text-elec-light text-lg">Efficiency Status</h4>
              </div>
              <p className="text-sm text-elec-light leading-relaxed">
                {results.pue <= 1.3 ? "Excellent efficiency - world-class design" :
                 results.pue <= 1.6 ? "Good efficiency - modern standard" :
                 results.pue <= 2.0 ? "Average efficiency - improvement opportunities" :
                 "Poor efficiency - significant improvements needed"}
              </p>
            </div>
            
            <div className="p-5 bg-elec-grey rounded-xl border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Gauge className="h-6 w-6 text-elec-yellow flex-shrink-0" />
                <h4 className="font-semibold text-elec-light text-lg">Capacity Planning</h4>
              </div>
              <p className="text-sm text-elec-light leading-relaxed">
                {results.capacityHeadroom >= 20 ? "Good headroom for growth" :
                 results.capacityHeadroom >= 10 ? "Adequate capacity for near-term" :
                 "Expansion planning required soon"}
              </p>
            </div>
            
            <div className="p-5 bg-elec-grey rounded-xl border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <PoundSterling className="h-6 w-6 text-elec-yellow flex-shrink-0" />
                <h4 className="font-semibold text-elec-light text-lg">Cost Impact</h4>
              </div>
              <p className="text-sm text-elec-light leading-relaxed">
                Annual energy costs of {formatLargeCurrency(results.annualCost)} represent significant operational expense requiring optimisation
              </p>
            </div>
              
            <div className="p-5 bg-elec-grey rounded-xl border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="h-6 w-6 text-elec-yellow flex-shrink-0" />
                <h4 className="font-semibold text-elec-light text-lg">Environmental Impact</h4>
              </div>
              <p className="text-sm text-elec-light leading-relaxed">
                {formatLargeNumber(results.annualCo2e / 1000)}t CO2e annually - efficiency improvements reduce both costs and carbon footprint
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Load Breakdown Results */}
      <Card className="border-elec-yellow/20 bg-elec-grey">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <Server className="h-5 w-5 text-elec-yellow" />
            Load Analysis & Infrastructure Sizing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-elec-grey rounded-lg border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium text-elec-light text-lg">Power Loads</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-elec-light">Total IT load:</span>
                  <span className="text-elec-yellow font-medium">{results.totalItLoad.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light">Cooling load:</span>
                  <span className="text-elec-yellow font-medium">{results.coolingLoad.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light">Lights & misc:</span>
                  <span className="text-elec-yellow font-medium">{results.lightsLoad.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-elec-yellow/20 pt-3">
                  <span className="text-elec-light">Total facility:</span>
                  <span className="text-elec-yellow">{results.totalFacilityLoad.toFixed(0)} kW</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-elec-grey rounded-lg border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-4">
                <Battery className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium text-elec-light text-lg">Infrastructure</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-elec-light">UPS capacity:</span>
                  <span className="text-elec-yellow font-medium">{results.upsCapacity.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light">Generator:</span>
                  <span className="text-elec-yellow font-medium">{results.generatorCapacity.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light">Battery:</span>
                  <span className="text-elec-yellow font-medium">{results.batteryCapacity.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light">Cooling:</span>
                  <span className="text-elec-yellow font-medium">{results.coolingCapacity.toFixed(0)} kW</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-elec-grey rounded-lg border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-4">
                <Gauge className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium text-elec-light text-lg">Efficiency</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-elec-light">PUE:</span>
                  <span className="text-elec-yellow font-medium">{results.pue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light">DCiE:</span>
                  <span className="text-elec-yellow font-medium">{results.dcie.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light">Capacity headroom:</span>
                  <span className="text-elec-yellow font-medium">{results.capacityHeadroom.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light">Max IT capacity:</span>
                  <span className="text-elec-yellow font-medium">{results.maxItLoadCapacity.toFixed(0)} kW</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Annual Consumption & Costs */}
      <Card className="border-elec-yellow/20 bg-elec-grey">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Annual Consumption & Financial Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
              <Zap className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{formatLargeNumber(results.annualKwh)}</div>
              <div className="text-xs sm:text-sm text-elec-muted">kWh per year</div>
            </div>
            <div className="text-center p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
              <PoundSterling className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{formatLargeCurrency(results.annualCost)}</div>
              <div className="text-xs sm:text-sm text-elec-muted">Energy cost per year</div>
            </div>
            <div className="text-center p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
              <Leaf className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{formatLargeNumber(results.annualCo2e / 1000)}t</div>
              <div className="text-xs sm:text-sm text-elec-muted">CO2e per year</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-elec-card/50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center">
                <span className="text-elec-muted">Estimated capital cost:</span>
                <span className="text-elec-yellow font-medium">{formatLargeCurrency(results.estimatedCapitalCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-elec-muted">Annual operating cost:</span>
                <span className="text-elec-yellow font-medium">{formatLargeCurrency(results.annualOperatingCost)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card className="border-elec-yellow/20 bg-elec-grey">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-elec-light text-lg">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Standards Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.complianceStatus.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-elec-card/50 rounded-lg border border-elec-yellow/10">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-elec-light text-sm sm:text-base">{item.standard}</div>
                    <div className="text-xs sm:text-sm text-elec-muted mt-1 leading-relaxed">{item.message}</div>
                  </div>
                </div>
                <div className="flex-shrink-0 self-start sm:self-center">
                  {getStatusBadge(item.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-elec-yellow/20 bg-elec-grey">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-elec-light text-lg">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Recommendations & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-elec-card/50 rounded-lg border border-elec-yellow/10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-elec-light text-sm sm:text-base">{rec.category}</span>
                    {getPriorityBadge(rec.priority)}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-elec-muted leading-relaxed">{rec.message}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Target className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span className="text-xs text-elec-yellow font-medium">Impact:</span>
                      <span className="text-xs text-elec-muted">{rec.impact}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-3 w-3 text-elec-yellow" />
                        <span className="text-elec-muted">
                          Difficulty: <span className="text-elec-yellow">
                            {rec.priority === 'high' ? 'Complex' : rec.priority === 'medium' ? 'Moderate' : 'Simple'}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-elec-yellow" />
                        <span className="text-elec-muted">
                          Timeframe: <span className="text-elec-yellow">
                            {rec.priority === 'high' ? '3-6 months' : rec.priority === 'medium' ? '1-3 months' : '2-4 weeks'}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PoundSterling className="h-3 w-3 text-elec-yellow" />
                        <span className="text-elec-muted">
                          Cost: <span className="text-elec-yellow">
                            {rec.priority === 'high' ? 'High (£50k+)' : rec.priority === 'medium' ? 'Medium (£10-50k)' : 'Low (<£10k)'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Details */}
      <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
        <CollapsibleTrigger asChild>
          <Card className="border-elec-yellow/20 bg-elec-grey cursor-pointer hover:border-elec-yellow/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-elec-light">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-elec-yellow" />
                  Advanced Details & Guidance
                </div>
                <ChevronDown className={`h-4 w-4 text-elec-yellow transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="border-elec-yellow/20 bg-elec-grey mt-2">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Why This Matters */}
                <div>
                  <h3 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Why Data Centre Design Matters
                  </h3>
                  <div className="space-y-2 text-sm text-elec-muted">
                    <p>• <strong>Business Continuity:</strong> Poor design leads to costly downtime (average £4,500 per minute)</p>
                    <p>• <strong>Energy Efficiency:</strong> Data centres consume 1% of global electricity - efficiency is crucial</p>
                    <p>• <strong>Scalability:</strong> Proper planning prevents expensive retrofits and capacity constraints</p>
                    <p>• <strong>Compliance:</strong> Industry standards ensure reliability and operational excellence</p>
                    <p>• <strong>Environmental Impact:</strong> Efficient design reduces carbon footprint and operating costs</p>
                  </div>
                </div>

                {/* Key Metrics Explained */}
                <div>
                  <h3 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    Key Metrics Explained
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-elec-light">PUE (Power Usage Effectiveness)</div>
                        <div className="text-elec-muted">Total facility power ÷ IT power</div>
                        <div className="text-xs text-elec-yellow">
                          • 1.0 = Perfect efficiency (impossible)<br/>
                          • 1.2-1.5 = Excellent (modern efficient)<br/>
                          • 1.5-2.0 = Good (typical)<br/>
                          • 2.0+ = Poor (needs improvement)
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-elec-light">DCiE (Data Centre Infrastructure Efficiency)</div>
                        <div className="text-elec-muted">IT power ÷ total facility power × 100</div>
                        <div className="text-xs text-elec-yellow">Inverse of PUE as percentage</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-elec-light">Capacity Headroom</div>
                        <div className="text-elec-muted">Available capacity for growth</div>
                        <div className="text-xs text-elec-yellow">
                          • 20%+ = Good planning buffer<br/>
                          • 10-20% = Adequate short-term<br/>
                          • &lt;10% = Expansion needed soon
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-elec-light">Redundancy Levels</div>
                        <div className="text-elec-muted">Protection against failures</div>
                        <div className="text-xs text-elec-yellow">
                          • N = No redundancy<br/>
                          • N+1 = Single component backup<br/>
                          • 2N = Complete duplicate systems
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Guidance */}
                <div>
                  <h3 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Practical Implementation Guidance
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="font-medium text-elec-light mb-2">Infrastructure Sizing Best Practices:</div>
                      <ul className="list-disc list-inside space-y-1 text-elec-muted ml-4">
                        <li>Size UPS for peak load plus 15-25% design margin</li>
                        <li>Generator should be 125% of UPS capacity for starting loads</li>
                        <li>Battery runtime: minimum 15 minutes, recommend 30+ minutes</li>
                        <li>Cooling redundancy separate from power redundancy planning</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-elec-light mb-2">Efficiency Improvements:</div>
                      <ul className="list-disc list-inside space-y-1 text-elec-muted ml-4">
                        <li>Hot/cold aisle containment can improve PUE by 20-30%</li>
                        <li>Variable speed drive fans reduce energy by 10-15%</li>
                        <li>Free cooling in temperate climates saves 30% cooling energy</li>
                        <li>Higher supply temperatures (27°C) reduce cooling load</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-elec-light mb-2">Monitoring & Maintenance:</div>
                      <ul className="list-disc list-inside space-y-1 text-elec-muted ml-4">
                        <li>Real-time PUE monitoring enables optimisation</li>
                        <li>Regular thermal mapping identifies hot spots</li>
                        <li>Preventive maintenance schedules for critical systems</li>
                        <li>Annual load bank testing of backup power systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Warning Alerts */}
      <Alert className="border-elec-yellow/20 bg-elec-grey">
        <AlertTriangle className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-light text-sm leading-relaxed">
          <strong className="text-elec-yellow">Professional Verification Required:</strong> These calculations provide design guidance only. Critical 
          infrastructure requires professional mechanical and electrical engineering validation, detailed 
          thermal modelling, and compliance verification with local building codes and industry 
          standards.
        </AlertDescription>
      </Alert>

      <Alert className="border-elec-yellow/20 bg-elec-grey">
        <Server className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-light text-sm leading-relaxed">
          This calculator provides comprehensive data centre design guidance including load analysis, 
          efficiency metrics, annual consumption, costs, and regulatory compliance. Results require 
          professional engineering validation for critical infrastructure projects.
        </AlertDescription>
      </Alert>
    </div>
  );
}