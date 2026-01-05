import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Zap, Clock, Gauge, Settings, AlertCircle } from 'lucide-react';

export const EmergencyLightingTechnicalSection2_3 = () => {
  return (
    <Card className="bg-[#323232] border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-400" />
          Technical Specifications & Calculations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Illuminance Requirements */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Gauge className="h-4 w-4 text-elec-yellow" />
            Illuminance Calculation Standards
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-green-600/15 border border-green-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-green-600/40 text-green-300 text-xs">Formula 1</Badge>
              </div>
              <p className="text-foreground text-sm font-medium mb-2">Basic Lux Requirement</p>
              <div className="bg-elec-gray/40 rounded-lg p-3 mb-2">
                <code className="text-elec-yellow text-sm">
                  Required Lux = max(15 lux, Normal Task × 0.1)
                </code>
              </div>
              <p className="text-foreground text-xs">
                Take the higher value between 15 lux minimum and 10% of normal task illuminance
              </p>
            </div>

            <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-blue-600/40 text-blue-300 text-xs">Formula 2</Badge>
              </div>
              <p className="text-foreground text-sm font-medium mb-2">Luminaire Quantity</p>
              <div className="bg-elec-gray/40 rounded-lg p-3 mb-2">
                <code className="text-elec-yellow text-sm">
                  N = (A × E) ÷ (Φ × UF × MF)
                </code>
              </div>
              <p className="text-foreground text-xs">
                N = number of luminaires, A = area (m²), E = illuminance (lux), Φ = luminous flux, UF = utilisation factor, MF = maintenance factor
              </p>
            </div>
            
          </div>
        </div>

        {/* Battery Sizing Calculations */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Battery Sizing & Duration
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            <div className="bg-orange-600/15 border border-orange-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-orange-400" />
                <Badge className="bg-orange-600/40 text-orange-300 text-xs">Duration</Badge>
              </div>
              <p className="text-foreground text-sm font-medium mb-2">Standard Requirements</p>
              <ul className="space-y-1 text-xs">
                <li className="text-foreground">• Minimum: 1 hour (BS 5266)</li>
                <li className="text-foreground">• Industrial: Often 3 hours</li>
                <li className="text-foreground">• Complex processes: Up to 8 hours</li>
                <li className="text-foreground">• Based on shutdown time analysis</li>
              </ul>
            </div>

            <div className="bg-purple-600/15 border border-purple-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-purple-400" />
                <Badge className="bg-purple-600/40 text-purple-300 text-xs">Capacity</Badge>
              </div>
              <p className="text-foreground text-sm font-medium mb-2">Battery Calculation</p>
              <div className="bg-elec-gray/40 rounded-lg p-3 mb-1">
                <code className="text-elec-yellow text-xs">
                  Capacity = (Load × Duration × 1.25) ÷ 0.8
                </code>
              </div>
              <p className="text-foreground text-xs">
                Including 25% safety factor and 80% discharge depth
              </p>
            </div>

            <div className="bg-red-600/15 border border-red-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-4 w-4 text-red-400" />
                <Badge className="bg-red-600/40 text-red-300 text-xs">Factors</Badge>
              </div>
              <p className="text-foreground text-sm font-medium mb-2">Temperature Effects</p>
              <ul className="space-y-1 text-xs">
                <li className="text-foreground">• Standard: 20°C operation</li>
                <li className="text-foreground">• Cold: +20% capacity at 0°C</li>
                <li className="text-foreground">• Hot: -20% capacity at 40°C</li>
                <li className="text-foreground">• Factor into system design</li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* Worked Example */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="h-4 w-4 text-elec-yellow" />
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow bg-elec-yellow/20">
              Worked Example: Machine Shop
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Given Parameters:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Shop area: 15m × 12m = 180 m²</li>
                  <li>• Normal task illuminance: 300 lux</li>
                  <li>• Emergency requirement: max(15, 30) = 30 lux</li>
                  <li>• LED fitting: 200 lumens emergency output</li>
                  <li>• Utilisation factor: 0.5</li>
                  <li>• Maintenance factor: 0.8</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Calculation Steps:</p>
                <div className="space-y-1 text-xs text-foreground">
                  <p>1. Total lumens needed = 180 × 30 = 5,400 lm</p>
                  <p>2. Effective output per fitting = 200 × 0.5 × 0.8 = 80 lm</p>
                  <p>3. Number of fittings = 5,400 ÷ 80 = 67.5</p>
                  <p className="text-elec-yellow font-medium">4. Install 68 emergency light fittings</p>
                  <p className="text-elec-yellow font-medium">5. Spacing ≈ 1.6m centres</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Standards */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Gauge className="h-4 w-4 text-elec-yellow" />
            Performance Standards & Testing
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
              <p className="text-foreground text-sm font-medium mb-3">Illuminance Uniformity</p>
              <ul className="space-y-2 text-xs">
                <li className="text-foreground flex justify-between">
                  <span>Minimum/Average ratio:</span>
                  <span className="text-foreground font-medium">≥ 0.1</span>
                </li>
                <li className="text-foreground flex justify-between">
                  <span>Task area uniformity:</span>
                  <span className="text-foreground font-medium">≥ 0.4</span>
                </li>
                <li className="text-foreground flex justify-between">
                  <span>Maximum/Minimum ratio:</span>
                  <span className="text-foreground font-medium">≤ 40:1</span>
                </li>
                <li className="text-foreground flex justify-between">
                  <span>Measurement grid:</span>
                  <span className="text-foreground font-medium">1m × 1m</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-600/15 border border-green-400/30 rounded-lg p-4">
              <p className="text-foreground text-sm font-medium mb-3">Activation Standards</p>
              <ul className="space-y-2 text-xs">
                <li className="text-foreground flex justify-between">
                  <span>Activation time:</span>
                  <span className="text-foreground font-medium">≤ 5 seconds</span>
                </li>
                <li className="text-foreground flex justify-between">
                  <span>Full output time:</span>
                  <span className="text-foreground font-medium">≤ 60 seconds</span>
                </li>
                <li className="text-foreground flex justify-between">
                  <span>Recharge time:</span>
                  <span className="text-foreground font-medium">≤ 24 hours</span>
                </li>
                <li className="text-foreground flex justify-between">
                  <span>End of discharge:</span>
                  <span className="text-foreground font-medium">≥ 50% output</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* Environmental Considerations */}
        <div className="bg-red-600/10 border border-red-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <Badge variant="outline" className="border-red-400/50 text-red-300 bg-red-600/20">
              Environmental Factors
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium mb-2">Temperature Range:</p>
               <ul className="space-y-1 text-foreground text-xs">
                <li>• Standard: 0°C to +40°C</li>
                <li>• Extended: -20°C to +60°C</li>
                <li>• Derate capacity outside standard range</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-medium mb-2">Protection Ratings:</p>
               <ul className="space-y-1 text-foreground text-xs">
                <li>• Indoor dry: IP20 minimum</li>
                <li>• Damp locations: IP54</li>
                <li>• Washdown areas: IP65</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-medium mb-2">Special Environments:</p>
              <ul className="space-y-1 text-foreground text-xs">
                <li>• ATEX zones: Certified fittings</li>
                <li>• Corrosive: Stainless steel housing</li>
                <li>• Vibration: Shock-resistant mounting</li>
              </ul>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};