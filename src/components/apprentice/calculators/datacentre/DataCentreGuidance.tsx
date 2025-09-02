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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Target className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Efficiency Status</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {results.pue <= 1.3 ? "Excellent efficiency - world-class design" :
                   results.pue <= 1.6 ? "Good efficiency - modern standard" :
                   results.pue <= 2.0 ? "Average efficiency - improvement opportunities" :
                   "Poor efficiency - significant improvements needed"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PoundSterling className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Cost Impact</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Annual energy costs of {formatLargeCurrency(results.annualCost)} represent significant operational expense requiring optimisation
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Gauge className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Capacity Planning</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {results.capacityHeadroom >= 20 ? "Good headroom for growth" :
                   results.capacityHeadroom >= 10 ? "Adequate capacity for near-term" :
                   "Expansion planning required soon"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Leaf className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Environmental Impact</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium">Power Loads</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total IT load:</span>
                <span className="text-elec-yellow font-medium">{results.totalItLoad.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cooling load:</span>
                <span className="text-elec-yellow font-medium">{results.coolingLoad.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Lights & misc:</span>
                <span className="text-elec-yellow font-medium">{results.lightsLoad.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between items-center font-semibold border-t border-border pt-2">
                <span>Total facility:</span>
                <span className="text-elec-yellow">{results.totalFacilityLoad.toFixed(0)} kW</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Battery className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium">Infrastructure</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">UPS capacity:</span>
                <span className="text-elec-yellow font-medium">{results.upsCapacity.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Generator:</span>
                <span className="text-elec-yellow font-medium">{results.generatorCapacity.toFixed(0)} kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Battery:</span>
                <span className="text-elec-yellow font-medium">{results.batteryCapacity.toFixed(0)} kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cooling:</span>
                <span className="text-elec-yellow font-medium">{results.coolingCapacity.toFixed(0)} kW</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium">Efficiency</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">PUE:</span>
                <span className="text-elec-yellow font-medium">{results.pue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">DCiE:</span>
                <span className="text-elec-yellow font-medium">{results.dcie.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Capacity headroom:</span>
                <span className="text-elec-yellow font-medium">{results.capacityHeadroom.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Estimated capital cost:</span>
            <span className="text-elec-yellow font-medium">{formatLargeCurrency(results.estimatedCapitalCost)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
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
        <div className="space-y-4">
          {results.complianceStatus.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm sm:text-base mb-1">{item.standard}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.message}</div>
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
              <div className="space-y-3 text-sm leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Business Continuity:</strong> Poor design leads to costly downtime (average £4,500 per minute)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Energy Efficiency:</strong> Data centres consume 1% of global electricity - efficiency is crucial</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Scalability:</strong> Proper planning prevents expensive retrofits and capacity constraints</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Compliance:</strong> Industry standards ensure reliability and operational excellence</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Environmental Impact:</strong> Efficient design reduces carbon footprint and operating costs</span>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium mb-2">PUE (Power Usage Effectiveness)</div>
                    <div className="text-muted-foreground text-xs mb-2">Total facility power ÷ IT power</div>
                    <div className="text-xs text-elec-yellow space-y-1">
                      <div>• 1.0 = Perfect efficiency (impossible)</div>
                      <div>• 1.2-1.5 = Excellent (modern efficient)</div>
                      <div>• 1.5-2.0 = Good (typical)</div>
                      <div>• 2.0+ = Poor (needs improvement)</div>
                    </div>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium mb-2">DCiE (Data Centre Infrastructure Efficiency)</div>
                    <div className="text-muted-foreground text-xs mb-2">IT power ÷ total facility power × 100</div>
                    <div className="text-xs text-elec-yellow">Inverse of PUE as percentage</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium mb-2">Capacity Headroom</div>
                    <div className="text-muted-foreground text-xs mb-2">Available capacity for growth</div>
                    <div className="text-xs text-elec-yellow space-y-1">
                      <div>• 20%+ = Good planning buffer</div>
                      <div>• 10-20% = Adequate short-term</div>
                      <div>• &lt;10% = Expansion needed soon</div>
                    </div>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium mb-2">Redundancy Levels</div>
                    <div className="text-muted-foreground text-xs mb-2">Protection against failures</div>
                    <div className="text-xs text-elec-yellow space-y-1">
                      <div>• N = No redundancy</div>
                      <div>• N+1 = Single component backup</div>
                      <div>• 2N = Complete duplicate systems</div>
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
              <div className="space-y-6 text-sm">
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    Infrastructure Sizing Best Practices
                  </div>
                  <div className="space-y-2 text-muted-foreground pl-4">
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Size UPS for peak load plus 15-25% design margin</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Generator should be 125% of UPS capacity for starting loads</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Battery runtime: minimum 15 minutes, recommend 30+ minutes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Cooling redundancy separate from power redundancy planning</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    Efficiency Improvements
                  </div>
                  <div className="space-y-2 text-muted-foreground pl-4">
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Hot/cold aisle containment can improve PUE by 20-30%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Variable speed drive fans reduce energy by 10-15%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Free cooling in temperate climates saves 30% cooling energy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Higher supply temperatures (27°C) reduce cooling load</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    Monitoring & Maintenance
                  </div>
                  <div className="space-y-2 text-muted-foreground pl-4">
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Real-time PUE monitoring enables optimisation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Regular thermal mapping identifies hot spots</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Preventive maintenance schedules for critical systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Annual load bank testing of backup power systems</span>
                    </div>
                  </div>
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