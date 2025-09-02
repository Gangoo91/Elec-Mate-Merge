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
  Leaf
} from "lucide-react";
import { DataCentreResults } from "@/lib/datacentre";
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
    <div className="space-y-6">
      {/* Load Breakdown Results */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <Server className="h-5 w-5 text-elec-yellow" />
            Load Analysis & Infrastructure Sizing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium text-elec-light">Power Loads</span>
              </div>
              <div className="space-y-2 text-sm ml-6">
                <div className="flex justify-between">
                  <span className="text-elec-muted">Total IT load:</span>
                  <span className="text-elec-yellow font-medium">{results.totalItLoad.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-muted">Cooling load:</span>
                  <span className="text-elec-yellow font-medium">{results.coolingLoad.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-muted">Lights & misc:</span>
                  <span className="text-elec-yellow font-medium">{results.lightsLoad.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-elec-yellow/20 pt-2">
                  <span className="text-elec-light">Total facility:</span>
                  <span className="text-elec-yellow">{results.totalFacilityLoad.toFixed(0)} kW</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium text-elec-light">Infrastructure</span>
              </div>
              <div className="space-y-2 text-sm ml-6">
                <div className="flex justify-between">
                  <span className="text-elec-muted">UPS capacity:</span>
                  <span className="text-elec-yellow font-medium">{results.upsCapacity.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-muted">Generator:</span>
                  <span className="text-elec-yellow font-medium">{results.generatorCapacity.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-muted">Battery:</span>
                  <span className="text-elec-yellow font-medium">{results.batteryCapacity.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-muted">Cooling:</span>
                  <span className="text-elec-yellow font-medium">{results.coolingCapacity.toFixed(0)} kW</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium text-elec-light">Efficiency</span>
              </div>
              <div className="space-y-2 text-sm ml-6">
                <div className="flex justify-between">
                  <span className="text-elec-muted">PUE:</span>
                  <span className="text-elec-yellow font-medium">{results.pue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-muted">DCiE:</span>
                  <span className="text-elec-yellow font-medium">{results.dcie.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-muted">Capacity headroom:</span>
                  <span className="text-elec-yellow font-medium">{results.capacityHeadroom.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-muted">Max IT capacity:</span>
                  <span className="text-elec-yellow font-medium">{results.maxItLoadCapacity.toFixed(0)} kW</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Annual Consumption & Costs */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Annual Consumption & Financial Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-elec-dark rounded-lg border border-elec-yellow/10">
              <Zap className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-elec-yellow">{(results.annualKwh / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-elec-muted">kWh per year</div>
            </div>
            <div className="text-center p-4 bg-elec-dark rounded-lg border border-elec-yellow/10">
              <PoundSterling className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-elec-yellow">£{(results.annualCost / 1000).toFixed(0)}k</div>
              <div className="text-sm text-elec-muted">Energy cost per year</div>
            </div>
            <div className="text-center p-4 bg-elec-dark rounded-lg border border-elec-yellow/10">
              <Leaf className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-elec-yellow">{(results.annualCo2e / 1000).toFixed(0)}t</div>
              <div className="text-sm text-elec-muted">CO2e per year</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-elec-dark/50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-elec-muted">Estimated capital cost:</span>
                <span className="text-elec-yellow font-medium">£{(results.estimatedCapitalCost / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-muted">Annual operating cost:</span>
                <span className="text-elec-yellow font-medium">£{(results.annualOperatingCost / 1000).toFixed(0)}k</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Standards Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.complianceStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-elec-dark/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <div className="font-medium text-elec-light">{item.standard}</div>
                    <div className="text-sm text-elec-muted">{item.message}</div>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Recommendations & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-elec-light">{rec.category}</span>
                    {getPriorityBadge(rec.priority)}
                  </div>
                </div>
                <p className="text-sm text-elec-muted mb-2">{rec.message}</p>
                <p className="text-xs text-elec-yellow">{rec.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Details */}
      <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
        <CollapsibleTrigger asChild>
          <Card className="border-elec-yellow/20 bg-elec-card cursor-pointer hover:border-elec-yellow/30 transition-colors">
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
          <Card className="border-elec-yellow/20 bg-elec-card mt-2">
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

      {/* Important Notice */}
      <Alert>
        <Server className="h-4 w-4" />
        <AlertDescription>
          <strong>Professional Verification Required:</strong> These calculations provide design guidance only. 
          Critical infrastructure requires professional mechanical and electrical engineering validation, 
          detailed thermal modelling, and compliance verification with local building codes and industry standards.
        </AlertDescription>
      </Alert>
    </div>
  );
}