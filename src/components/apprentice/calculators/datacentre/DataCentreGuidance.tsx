import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResultCard } from "@/components/ui/result-card";
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
      <ResultCard>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium">What This Means</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Target className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">Efficiency Status</div>
                <div className="text-xs text-muted-foreground">
                  {results.pue <= 1.3 ? "Excellent efficiency - world-class design" :
                   results.pue <= 1.6 ? "Good efficiency - modern standard" :
                   results.pue <= 2.0 ? "Average efficiency - improvement opportunities" :
                   "Poor efficiency - significant improvements needed"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PoundSterling className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">Cost Impact</div>
                <div className="text-xs text-muted-foreground">
                  Annual energy costs of {formatLargeCurrency(results.annualCost)} represent significant operational expense requiring optimisation
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Gauge className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">Capacity Planning</div>
                <div className="text-xs text-muted-foreground">
                  {results.capacityHeadroom >= 20 ? "Good headroom for growth" :
                   results.capacityHeadroom >= 10 ? "Adequate capacity for near-term" :
                   "Expansion planning required soon"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Leaf className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">Environmental Impact</div>
                <div className="text-xs text-muted-foreground">
                  {formatLargeNumber(results.annualCo2e / 1000)}t CO2e annually - efficiency improvements reduce both costs and carbon footprint
                </div>
              </div>
            </div>
          </div>
        </div>
      </ResultCard>

      {/* Load Breakdown Results */}
      <ResultCard>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium">Load Analysis & Infrastructure Sizing</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium">Power Loads</span>
            </div>
            <div className="space-y-2 text-sm ml-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total IT load:</span>
                <span className="text-elec-yellow font-medium">{results.totalItLoad.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cooling load:</span>
                <span className="text-elec-yellow font-medium">{results.coolingLoad.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lights & misc:</span>
                <span className="text-elec-yellow font-medium">{results.lightsLoad.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-elec-yellow/20 pt-2">
                <span>Total facility:</span>
                <span className="text-elec-yellow">{results.totalFacilityLoad.toFixed(0)} kW</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium">Infrastructure</span>
            </div>
            <div className="space-y-2 text-sm ml-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">UPS capacity:</span>
                <span className="text-elec-yellow font-medium">{results.upsCapacity.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Generator:</span>
                <span className="text-elec-yellow font-medium">{results.generatorCapacity.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Battery:</span>
                <span className="text-elec-yellow font-medium">{results.batteryCapacity.toFixed(0)} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cooling:</span>
                <span className="text-elec-yellow font-medium">{results.coolingCapacity.toFixed(0)} kW</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium">Efficiency</span>
            </div>
            <div className="space-y-2 text-sm ml-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">PUE:</span>
                <span className="text-elec-yellow font-medium">{results.pue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">DCiE:</span>
                <span className="text-elec-yellow font-medium">{results.dcie.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacity headroom:</span>
                <span className="text-elec-yellow font-medium">{results.capacityHeadroom.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max IT capacity:</span>
                <span className="text-elec-yellow font-medium">{results.maxItLoadCapacity.toFixed(0)} kW</span>
              </div>
            </div>
          </div>
        </div>
      </ResultCard>

      {/* Annual Consumption & Costs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          title="Annual Energy"
          value={formatLargeNumber(results.annualKwh)}
          unit="kWh"
          icon={<Zap className="h-5 w-5" />}
        />
        <ResultCard
          title="Annual Cost"
          value={formatLargeCurrency(results.annualCost)}
          icon={<PoundSterling className="h-5 w-5" />}
        />
        <ResultCard
          title="CO2 Emissions"
          value={`${formatLargeNumber(results.annualCo2e / 1000)}t`}
          subtitle="CO2e per year"
          icon={<Leaf className="h-5 w-5" />}
        />
      </div>
      
      <ResultCard>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium">Financial Summary</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Estimated capital cost:</span>
            <span className="text-elec-yellow font-medium">{formatLargeCurrency(results.estimatedCapitalCost)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Annual operating cost:</span>
            <span className="text-elec-yellow font-medium">{formatLargeCurrency(results.annualOperatingCost)}</span>
          </div>
        </div>
      </ResultCard>

      {/* Compliance Status */}
      <ResultCard>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium">Standards Compliance</h3>
          </div>
        </div>
        <div className="space-y-3">
          {results.complianceStatus.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border border-border">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm sm:text-base">{item.standard}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{item.message}</div>
                </div>
              </div>
              <div className="flex-shrink-0 self-start sm:self-center">
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* Recommendations */}
      <ResultCard>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium">Recommendations & Actions</h3>
          </div>
        </div>
        <div className="space-y-4">
          {results.recommendations.map((rec, index) => (
            <div key={index} className="p-4 rounded-lg border border-border">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm sm:text-base">{rec.category}</span>
                  {getPriorityBadge(rec.priority)}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{rec.message}</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Target className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-xs text-elec-yellow font-medium">Impact:</span>
                    <span className="text-xs text-muted-foreground">{rec.impact}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-3 w-3 text-elec-yellow" />
                      <span className="text-muted-foreground">
                        Difficulty: <span className="text-elec-yellow">
                          {rec.priority === 'high' ? 'Complex' : rec.priority === 'medium' ? 'Moderate' : 'Simple'}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-elec-yellow" />
                      <span className="text-muted-foreground">
                        Timeframe: <span className="text-elec-yellow">
                          {rec.priority === 'high' ? '3-6 months' : rec.priority === 'medium' ? '1-3 months' : '2-4 weeks'}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PoundSterling className="h-3 w-3 text-elec-yellow" />
                      <span className="text-muted-foreground">
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
      </ResultCard>

      {/* Advanced Details */}
      <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
        <CollapsibleTrigger asChild>
          <ResultCard className="cursor-pointer hover:border-elec-yellow/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-elec-yellow" />
                <h3 className="text-lg font-medium">Advanced Details & Guidance</h3>
              </div>
              <ChevronDown className={`h-4 w-4 text-elec-yellow transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
            </div>
          </ResultCard>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 mt-2">
            {/* Why This Matters */}
            <ResultCard>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  <h4 className="font-medium">Why Data Centre Design Matters</h4>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>• <strong>Business Continuity:</strong> Poor design leads to costly downtime (average £4,500 per minute)</p>
                <p>• <strong>Energy Efficiency:</strong> Data centres consume 1% of global electricity - efficiency is crucial</p>
                <p>• <strong>Scalability:</strong> Proper planning prevents expensive retrofits and capacity constraints</p>
                <p>• <strong>Compliance:</strong> Industry standards ensure reliability and operational excellence</p>
                <p>• <strong>Environmental Impact:</strong> Efficient design reduces carbon footprint and operating costs</p>
              </div>
            </ResultCard>

            {/* Key Metrics Explained */}
            <ResultCard>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-elec-yellow" />
                  <h4 className="font-medium">Key Metrics Explained</h4>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">PUE (Power Usage Effectiveness)</div>
                    <div className="text-muted-foreground">Total facility power ÷ IT power</div>
                    <div className="text-xs text-elec-yellow">
                      • 1.0 = Perfect efficiency (impossible)<br/>
                      • 1.2-1.5 = Excellent (modern efficient)<br/>
                      • 1.5-2.0 = Good (typical)<br/>
                      • 2.0+ = Poor (needs improvement)
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">DCiE (Data Centre Infrastructure Efficiency)</div>
                    <div className="text-muted-foreground">IT power ÷ total facility power × 100</div>
                    <div className="text-xs text-elec-yellow">Inverse of PUE as percentage</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Capacity Headroom</div>
                    <div className="text-muted-foreground">Available capacity for growth</div>
                    <div className="text-xs text-elec-yellow">
                      • 20%+ = Good planning buffer<br/>
                      • 10-20% = Adequate short-term<br/>
                      • &lt;10% = Expansion needed soon
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Redundancy Levels</div>
                    <div className="text-muted-foreground">Protection against failures</div>
                    <div className="text-xs text-elec-yellow">
                      • N = No redundancy<br/>
                      • N+1 = Single component backup<br/>
                      • 2N = Complete duplicate systems
                    </div>
                  </div>
                </div>
              </div>
            </ResultCard>

            {/* Practical Guidance */}
            <ResultCard>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-elec-yellow" />
                  <h4 className="font-medium">Practical Implementation Guidance</h4>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium mb-2">Infrastructure Sizing Best Practices:</div>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Size UPS for peak load plus 15-25% design margin</li>
                    <li>Generator should be 125% of UPS capacity for starting loads</li>
                    <li>Battery runtime: minimum 15 minutes, recommend 30+ minutes</li>
                    <li>Cooling redundancy separate from power redundancy planning</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-2">Efficiency Improvements:</div>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Hot/cold aisle containment can improve PUE by 20-30%</li>
                    <li>Variable speed drive fans reduce energy by 10-15%</li>
                    <li>Free cooling in temperate climates saves 30% cooling energy</li>
                    <li>Higher supply temperatures (27°C) reduce cooling load</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-2">Monitoring & Maintenance:</div>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Real-time PUE monitoring enables optimisation</li>
                    <li>Regular thermal mapping identifies hot spots</li>
                    <li>Preventive maintenance schedules for critical systems</li>
                    <li>Annual load bank testing of backup power systems</li>
                  </ul>
                </div>
              </div>
            </ResultCard>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Warning Alerts */}
      <ResultCard status="warning">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm leading-relaxed">
            <strong className="text-amber-400">Professional Verification Required:</strong> These calculations provide design guidance only. Critical 
            infrastructure requires professional mechanical and electrical engineering validation, detailed 
            thermal modelling, and compliance verification with local building codes and industry 
            standards.
          </div>
        </div>
      </ResultCard>

      <ResultCard status="info">
        <div className="flex items-start gap-3">
          <Server className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
          <div className="text-sm leading-relaxed">
            This calculator provides comprehensive data centre design guidance including load analysis, 
            efficiency metrics, annual consumption, costs, and regulatory compliance. Results require 
            professional engineering validation for critical infrastructure projects.
          </div>
        </div>
      </ResultCard>
    </div>
  );
}