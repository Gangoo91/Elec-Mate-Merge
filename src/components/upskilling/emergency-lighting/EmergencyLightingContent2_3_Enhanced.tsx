import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Settings, 
  Wrench, 
  CheckSquare, 
  Zap,
  Eye,
  Calculator,
  Clock,
  Shield,
  Target,
  Factory,
  FlaskConical,
  Gauge
} from 'lucide-react';

export const EmergencyLightingContent2_3_Enhanced = () => {
  return (
    <div className="space-y-8">
      
      {/* Section 1: Purpose and Regulatory Requirements */}
      <Card className="bg-[#323232] border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Purpose and Regulatory Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Key Distinction */}
          <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-blue-400" />
              <Badge variant="outline" className="border-blue-400/50 text-blue-300 bg-blue-600/20">
                Critical Distinction
              </Badge>
            </div>
            <p className="text-foreground text-sm">
              Unlike escape or anti-panic lighting, high-risk task area lighting supports <strong>task completion</strong> in dangerous environments rather than evacuation guidance.
            </p>
          </div>

          {/* BS 5266 Requirements */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              BS 5266 Illumination Standards
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-600/15 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-4 w-4 text-green-400" />
                  <span className="text-green-300 font-medium text-sm">Minimum Lux Level</span>
                </div>
                <p className="text-foreground text-lg font-bold">15 lux maintained</p>
                <p className="text-foreground text-xs">Significantly higher than 0.5 lux for escape routes</p>
              </div>
              
              <div className="bg-yellow-600/15 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-300 font-medium text-sm">Percentage Rule</span>
                </div>
                <p className="text-foreground text-lg font-bold">10% of normal illuminance</p>
                <p className="text-foreground text-xs">Whichever is greater: 15 lux or 10%</p>
              </div>
            </div>
          </div>

          {/* Activation Requirements */}
          <div className="space-y-3">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Activation and Duration Requirements
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">1</Badge>
                <p className="text-foreground text-sm font-medium mb-1">Automatic Activation</p>
                <p className="text-foreground text-xs">Must activate immediately upon mains failure</p>
              </div>
              
              <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">2</Badge>
                <p className="text-foreground text-sm font-medium mb-1">Stable Operation</p>
                <p className="text-foreground text-xs">Remain operational until tasks are made safe</p>
              </div>
              
              <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">3</Badge>
                <p className="text-foreground text-sm font-medium mb-1">Risk Assessment</p>
                <p className="text-foreground text-xs">Areas determined by formal risk evaluation</p>
              </div>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-4 w-4 text-elec-yellow" />
              <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow bg-elec-yellow/20">
                Calculation Example
              </Badge>
            </div>
            <p className="text-foreground text-sm mb-2">
              <strong>Workshop Example:</strong> Normal task illuminance = 200 lux
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• 10% of 200 lux = 20 lux</p>
              <p className="text-foreground">• BS 5266 minimum = 15 lux</p>
              <p className="text-elec-yellow font-medium">• Required emergency level = 20 lux (higher value)</p>
            </div>
          </div>
          
        </CardContent>
      </Card>

      {/* Section 2: Identifying High-Risk Areas */}
      <Card className="bg-[#323232] border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Factory className="h-5 w-5 text-orange-400" />
            Identifying High-Risk Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <p className="text-foreground">
            High-risk task lighting is required wherever dangerous processes or equipment are in use. 
            These environments demand stable, bright lighting to avoid accidents during shutdown.
          </p>

          {/* High-Risk Environment Categories */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              High-Risk Environment Categories
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Manufacturing & Machinery */}
              <div className="bg-red-600/15 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-4 w-4 text-red-400" />
                  <span className="text-red-300 font-medium">Manufacturing & Machinery</span>
                </div>
                <ul className="space-y-1 text-sm">
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    Workshops with lathes, milling machines
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    Circular saws and cutting equipment
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    Conveyor systems with moving blades
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    Press and stamping operations
                  </li>
                </ul>
              </div>

              {/* Chemical & Laboratory */}
              <div className="bg-orange-600/15 border border-orange-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-300 font-medium">Chemical & Laboratory</span>
                </div>
                <ul className="space-y-1 text-sm">
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                    Laboratories handling hazardous chemicals
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                    Chemical processing plants
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                    Pharmaceutical manufacturing
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                    Fuel storage and handling areas
                  </li>
                </ul>
              </div>

              {/* Industrial Processes */}
              <div className="bg-purple-600/15 border border-purple-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-300 font-medium">Industrial Processes</span>
                </div>
                <ul className="space-y-1 text-sm">
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    High-pressure systems and vessels
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    Welding bays and hot work areas
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    Furnace and kiln operations
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    Power generation equipment
                  </li>
                </ul>
              </div>

              {/* Height & Access */}
              <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-300 font-medium">Height & Access Work</span>
                </div>
                <ul className="space-y-1 text-sm">
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Overhead crane operations
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Mezzanine work platforms
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Maintenance gantries
                  </li>
                  <li className="text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Loading bay operations
                  </li>
                </ul>
              </div>
              
            </div>
          </div>

          {/* Risk Assessment Process */}
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="h-4 w-4 text-elec-yellow" />
              <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow bg-elec-yellow/20">
                Risk Assessment Criteria
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-foreground font-medium mb-1">Process Analysis</p>
                <p className="text-foreground">Identify dangerous operations and shutdown requirements</p>
              </div>
              <div>
                <p className="text-foreground font-medium mb-1">Consequence Assessment</p>
                <p className="text-foreground">Evaluate potential injury severity if lighting fails</p>
              </div>
              <div>
                <p className="text-foreground font-medium mb-1">Duration Requirements</p>
                <p className="text-foreground">Determine safe shutdown time needed</p>
              </div>
            </div>
          </div>
          
        </CardContent>
      </Card>

      {/* Section 3: Installation and Design Principles */}
      <Card className="bg-[#323232] border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-green-400" />
            Installation and Design Principles  
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <p className="text-foreground">
            Designing for high-risk areas involves stricter criteria than standard emergency lighting. 
            Electricians must ensure precise coverage and reliable performance.
          </p>

          {/* Design Requirements */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Target className="h-4 w-4 text-elec-yellow" />
              Critical Design Requirements
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div className="bg-green-600/15 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="h-4 w-4 text-green-400" />
                  <Badge className="bg-green-600/40 text-green-300 text-xs">Illuminance</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">Minimum Lux Levels</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• 15 lux minimum at task plane</li>
                  <li className="text-foreground">• Measured at working height</li>
                  <li className="text-foreground">• Maintained throughout duration</li>
                </ul>
              </div>

              <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-4 w-4 text-blue-400" />
                  <Badge className="bg-blue-600/40 text-blue-300 text-xs">Visual Quality</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">Glare & Shadow Control</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• Use fittings that minimise glare</li>
                  <li className="text-foreground">• Avoid harsh shadows on work surfaces</li>
                  <li className="text-foreground">• Consider operator viewing angles</li>
                </ul>
              </div>

              <div className="bg-orange-600/15 border border-orange-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-orange-400" />
                  <Badge className="bg-orange-600/40 text-orange-300 text-xs">Coverage</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">Uniform Distribution</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• Even illumination across hazard area</li>
                  <li className="text-foreground">• No dark spots on critical equipment</li>
                  <li className="text-foreground">• Consider equipment shadows</li>
                </ul>
              </div>

              <div className="bg-purple-600/15 border border-purple-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-4 w-4 text-purple-400" />
                  <Badge className="bg-purple-600/40 text-purple-300 text-xs">Positioning</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">Strategic Placement</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• Direct coverage of machinery</li>
                  <li className="text-foreground">• Illuminate control panels</li>
                  <li className="text-foreground">• Cover shutdown procedures</li>
                </ul>
              </div>

              <div className="bg-red-600/15 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-red-400" />
                  <Badge className="bg-red-600/40 text-red-300 text-xs">Duration</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">Supply Duration</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• Minimum 1 hour (BS 5266)</li>
                  <li className="text-foreground">• Often 3 hours in industrial settings</li>
                  <li className="text-foreground">• Based on shutdown complexity</li>
                </ul>
              </div>

              <div className="bg-yellow-600/15 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-yellow-400" />
                  <Badge className="bg-yellow-600/40 text-yellow-300 text-xs">Reliability</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">System Integrity</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• High-reliability components</li>
                  <li className="text-foreground">• Redundancy for critical areas</li>
                  <li className="text-foreground">• Environmental protection</li>
                </ul>
              </div>
              
            </div>
          </div>

          {/* Installation Guidelines */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Wrench className="h-4 w-4 text-elec-yellow" />
              Installation Best Practices
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              <div className="space-y-3">
                <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                  <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">1</Badge>
                  <p className="text-foreground text-sm font-medium mb-1">Pre-Installation Survey</p>
                  <p className="text-foreground text-xs">Map dangerous equipment, identify shutdown procedures, assess viewing angles and potential shadows</p>
                </div>
                
                <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                  <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">2</Badge>
                  <p className="text-foreground text-sm font-medium mb-1">Luminaire Selection</p>
                  <p className="text-foreground text-xs">Choose fittings with appropriate beam patterns, anti-glare features, and environmental protection ratings</p>
                </div>
                
                <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                  <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">3</Badge>
                  <p className="text-foreground text-sm font-medium mb-1">Circuit Design</p>
                  <p className="text-foreground text-xs">Separate circuits for high-risk lighting, clear labelling at distribution board, consider sub-circuit monitoring</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                  <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">4</Badge>
                  <p className="text-foreground text-sm font-medium mb-1">Mounting & Positioning</p>
                  <p className="text-foreground text-xs">Mount at appropriate height for task illumination, avoid interference with equipment operation or maintenance</p>
                </div>
                
                <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                  <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">5</Badge>
                  <p className="text-foreground text-sm font-medium mb-1">Testing & Commissioning</p>
                  <p className="text-foreground text-xs">Measure lux levels at task planes, test activation under load conditions, verify duration performance</p>
                </div>
                
                <div className="bg-elec-gray/40 rounded-lg p-3 border border-gray-600/30">
                  <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">6</Badge>
                  <p className="text-foreground text-sm font-medium mb-1">Documentation</p>
                  <p className="text-foreground text-xs">Create detailed as-built drawings, record test results, provide user instructions for shutdown procedures</p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Coverage Calculation Example */}
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-4 w-4 text-elec-yellow" />
              <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow bg-elec-yellow/20">
                Luminaire Spacing Calculation
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-foreground font-medium mb-2">Given Parameters:</p>
                <ul className="space-y-1 text-foreground">
                  <li>• Workshop area: 10m × 8m</li>
                  <li>• Required illuminance: 20 lux</li>
                  <li>• Luminaire output: 150 lumens</li>
                  <li>• Utilisation factor: 0.4</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-medium mb-2">Calculation:</p>
                <div className="space-y-1 text-foreground">
                  <p>Area = 10 × 8 = 80 m²</p>
                  <p>Total lumens required = 80 × 20 = 1600 lm</p>
                  <p>Effective lumens per fitting = 150 × 0.4 = 60 lm</p>
                  <p className="text-elec-yellow font-medium">Number of fittings = 1600 ÷ 60 = 27 fittings</p>
                </div>
              </div>
            </div>
          </div>
          
        </CardContent>
      </Card>

      {/* Section 4: Testing and Maintenance */}
      <Card className="bg-[#323232] border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-blue-400" />
            Testing and Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <p className="text-foreground">
            As with all emergency lighting, high-risk task area lighting must be tested and recorded. 
            However, the critical nature of these systems demands enhanced testing procedures.
          </p>

          {/* Testing Schedule */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              Enhanced Testing Schedule
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-blue-600/40 text-blue-300 text-xs">Monthly</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">Functional Testing</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• Activation test (brief operation)</li>
                  <li className="text-foreground">• Visual inspection of fittings</li>
                  <li className="text-foreground">• Check indication lamps</li>
                  <li className="text-foreground">• Record any defects found</li>
                </ul>
              </div>

              <div className="bg-orange-600/15 border border-orange-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-orange-600/40 text-orange-300 text-xs">Annually</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">Full Duration Testing</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• Complete battery discharge test</li>
                  <li className="text-foreground">• Verify full rated duration</li>
                  <li className="text-foreground">• Check light output maintenance</li>
                  <li className="text-foreground">• Test automatic recharge function</li>
                </ul>
              </div>

              <div className="bg-red-600/15 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-red-600/40 text-red-300 text-xs">Periodic</Badge>
                </div>
                <p className="text-foreground text-sm font-medium mb-2">Lux Level Verification</p>
                <ul className="space-y-1 text-xs">
                  <li className="text-foreground">• Measure illuminance at task planes</li>
                  <li className="text-foreground">• Check uniformity ratios</li>
                  <li className="text-foreground">• Verify minimum 15 lux maintained</li>
                  <li className="text-foreground">• Document any deterioration</li>
                </ul>
              </div>
              
            </div>
          </div>

          {/* Critical Maintenance Requirements */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Wrench className="h-4 w-4 text-elec-yellow" />
              Critical Maintenance Requirements
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              <div className="space-y-3">
                <div className="bg-red-600/15 border border-red-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-red-300 font-medium text-sm">Immediate Fault Rectification</span>
                  </div>
                  <ul className="space-y-1 text-xs">
                    <li className="text-foreground">• Any failure must be fixed immediately</li>
                    <li className="text-foreground">• No temporary 'make-do' solutions</li>
                    <li className="text-foreground">• Consider temporary lighting if needed</li>
                    <li className="text-foreground">• Document all emergency repairs</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/15 border border-green-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckSquare className="h-4 w-4 text-green-400" />
                    <span className="text-green-300 font-medium text-sm">Preventive Maintenance</span>
                  </div>
                  <ul className="space-y-1 text-xs">
                    <li className="text-foreground">• Regular battery performance checks</li>
                    <li className="text-foreground">• Clean luminaire optics quarterly</li>
                    <li className="text-foreground">• Inspect environmental seals</li>
                    <li className="text-foreground">• Update maintenance schedules</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Gauge className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-300 font-medium text-sm">Performance Monitoring</span>
                  </div>
                  <ul className="space-y-1 text-xs">
                    <li className="text-foreground">• Track illuminance degradation over time</li>
                    <li className="text-foreground">• Monitor battery life expectancy</li>
                    <li className="text-foreground">• Record environmental conditions</li>
                    <li className="text-foreground">• Plan proactive replacements</li>
                  </ul>
                </div>
                
                <div className="bg-purple-600/15 border border-purple-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-300 font-medium text-sm">System Updates</span>
                  </div>
                  <ul className="space-y-1 text-xs">
                    <li className="text-foreground">• Review risk assessments annually</li>
                    <li className="text-foreground">• Update lighting when processes change</li>
                    <li className="text-foreground">• Incorporate new technology upgrades</li>
                    <li className="text-foreground">• Train maintenance personnel</li>
                  </ul>
                </div>
              </div>
              
            </div>
          </div>

          {/* Why Critical Testing Matters */}
          <div className="bg-red-600/10 border border-red-400/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <Badge variant="outline" className="border-red-400/50 text-red-300 bg-red-600/20">
                Why Enhanced Testing is Critical
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-foreground font-medium mb-2">Safety Consequences:</p>
                <ul className="space-y-1 text-foreground">
                  <li>• Equipment damage from improper shutdown</li>
                  <li>• Worker injury from sudden light loss</li>
                  <li>• Chemical spills or process failures</li>
                  <li>• Legal liability for accidents</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-medium mb-2">Testing Benefits:</p>
                <ul className="space-y-1 text-foreground">
                  <li>• Early detection of degraded performance</li>
                  <li>• Compliance with safety regulations</li>
                  <li>• Reduced insurance premiums</li>
                  <li>• Demonstrated duty of care</li>
                </ul>
              </div>
            </div>
          </div>
          
        </CardContent>
      </Card>
      
    </div>
  );
};