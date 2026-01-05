import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Factory, FlaskConical, Zap, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

export const EmergencyLightingCaseStudies2_3 = () => {
  return (
    <Card className="bg-[#323232] border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Factory className="h-5 w-5 text-green-400" />
          Case Studies: High-Risk Installations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Case Study 1: Manufacturing Plant */}
        <div className="bg-green-600/15 border border-green-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Factory className="h-4 w-4 text-green-400" />
            <Badge className="bg-green-600/40 text-green-300 text-xs">Case Study 1</Badge>
            <span className="text-green-300 font-medium text-sm">Automotive Manufacturing Plant</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Challenge:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• 50 CNC machines across 2,000m² workshop</li>
                  <li>• Normal illuminance: 500 lux at machine level</li>
                  <li>• Complex shutdown procedures for each machine</li>
                  <li>• High-value work pieces in progress</li>
                  <li>• 24/7 operation with shift changes</li>
                </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Risk Assessment Findings:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Cutting tools continue spinning for 30-60 seconds</li>
                  <li>• Hydraulic systems need controlled pressure release</li>
                  <li>• Work pieces worth £10k+ each</li>
                  <li>• Emergency stop systems require visual confirmation</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Solution Implemented:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• 50 lux emergency lighting (10% of 500 lux)</li>
                  <li>• Individual luminaires above each machine</li>
                  <li>• 3-hour duration batteries for extended shutdowns</li>
                  <li>• Separate emergency circuit per production line</li>
                  <li>• LED fittings with instant-on capability</li>
                </ul>
              </div>
              
              <div className="bg-green-600/20 rounded-lg p-3">
                <p className="text-green-300 font-medium text-sm mb-1">Results:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Zero accidents during power outages</li>
                  <li>• £2M+ work pieces saved during emergencies</li>
                  <li>• Reduced insurance premiums by 15%</li>
                  <li>• Compliance with HSE requirements achieved</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study 2: Chemical Laboratory */}
        <div className="bg-orange-600/15 border border-orange-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="h-4 w-4 text-orange-400" />
            <Badge className="bg-orange-600/40 text-orange-300 text-xs">Case Study 2</Badge>
            <span className="text-orange-300 font-medium text-sm">Pharmaceutical Research Laboratory</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Challenge:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Handling Category 3 hazardous chemicals</li>
                  <li>• Fume hoods requiring controlled shutdown</li>
                  <li>• Precision analytical equipment worth £500k+</li>
                  <li>• Experiments running 24/7 with remote monitoring</li>
                  <li>• Clean room environment with strict protocols</li>
                </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Critical Requirements:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Visual confirmation of chemical storage security</li>
                  <li>• Instrument shutdown in correct sequence</li>
                  <li>• Fume hood sash position verification</li>
                  <li>• Emergency shower/eyewash station illumination</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Solution Implemented:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• 30 lux at fume hood work surfaces</li>
                  <li>• IP65 rated fittings for washdown capability</li>
                  <li>• 8-hour battery duration for weekend coverage</li>
                  <li>• Emergency circuits isolated from normal supply</li>
                  <li>• Backup lighting for emergency equipment areas</li>
                </ul>
              </div>
              
              <div className="bg-orange-600/20 rounded-lg p-3">
                <p className="text-orange-300 font-medium text-sm mb-1">Outcomes:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Safe chemical containment during outages</li>
                  <li>• No equipment damage in 5 years operation</li>
                  <li>• Regulatory compliance maintained</li>
                  <li>• Enhanced safety culture among staff</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study 3: Power Generation Facility */}
        <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-blue-400" />
            <Badge className="bg-blue-600/40 text-blue-300 text-xs">Case Study 3</Badge>
            <span className="text-blue-300 font-medium text-sm">Combined Heat & Power Plant</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Challenge:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Gas turbine control room operations</li>
                  <li>• High-pressure steam system management</li>
                  <li>• Critical infrastructure serving 10,000 homes</li>
                  <li>• Complex multi-stage shutdown procedures</li>
                  <li>• 24/7 staffed control room requirements</li>
                </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Safety Considerations:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Turbine bearing temperature monitoring</li>
                  <li>• Steam pressure gauge readings</li>
                  <li>• Emergency stop button identification</li>
                  <li>• Control panel switch positions</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Solution Implemented:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• 100 lux in control room (10% of 1000 lux)</li>
                  <li>• Redundant emergency lighting circuits</li>
                  <li>• UPS backup for critical monitoring systems</li>
                  <li>• Manual transfer switches for essential circuits</li>
                  <li>• Diesel generator as tertiary backup</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/20 rounded-lg p-3">
                <p className="text-blue-300 font-medium text-sm mb-1">Performance:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Successful controlled shutdowns during grid faults</li>
                  <li>• No damage to £50M+ turbine equipment</li>
                  <li>• Maintained supply to critical services</li>
                  <li>• Exceeded regulatory availability targets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study 4: Food Processing Plant */}
        <div className="bg-purple-600/15 border border-purple-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-4 w-4 text-purple-400" />
            <Badge className="bg-purple-600/40 text-purple-300 text-xs">Case Study 4</Badge>
            <span className="text-purple-300 font-medium text-sm">Meat Processing Facility</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Unique Challenges:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• High-speed conveyor belt systems</li>
                  <li>• Automated cutting and processing equipment</li>
                  <li>• Refrigeration systems requiring monitoring</li>
                  <li>• Hygiene protocols with regular washdowns</li>
                  <li>• Multiple shift operations across 24 hours</li>
                </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Environmental Factors:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Temperature range: -5°C to +35°C</li>
                  <li>• High humidity and wash-down requirements</li>
                  <li>• Corrosive cleaning chemicals used daily</li>
                  <li>• Strict food safety and hygiene standards</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Specialised Solution:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• IP69K rated stainless steel fittings</li>
                  <li>• 25 lux over conveyor systems</li>
                  <li>• Sealed battery compartments</li>
                  <li>• Food-grade gasket materials</li>
                  <li>• Temperature-compensated battery systems</li>
                </ul>
              </div>
              
              <div className="bg-purple-600/20 rounded-lg p-3">
                <p className="text-purple-300 font-medium text-sm mb-1">Benefits Achieved:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Zero contamination incidents during outages</li>
                  <li>• Prevented product spoilage worth £100k+</li>
                  <li>• Maintained HACCP certification</li>
                  <li>• Staff safety enhanced during cleaning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Learning Points */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-4 w-4 text-elec-yellow" />
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow bg-elec-yellow/20">
              Key Learning Points from Case Studies
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Design Principles:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Risk assessment drives lighting requirements</li>
                  <li>• Consider shutdown time and complexity</li>
                  <li>• Environmental conditions affect equipment choice</li>
                  <li>• Redundancy essential for critical processes</li>
                </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Installation Factors:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Higher lux levels than minimum often required</li>
                  <li>• Duration may exceed 1-hour standard</li>
                  <li>• Consider maintenance access and procedures</li>
                  <li>• Train operators on emergency procedures</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Economic Benefits:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Prevent equipment damage and product loss</li>
                  <li>• Reduce insurance premiums significantly</li>
                  <li>• Avoid regulatory fines and shutdowns</li>
                  <li>• Enhance reputation for safety excellence</li>
                </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Maintenance Insights:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Regular testing prevents critical failures</li>
                  <li>• Environmental monitoring extends equipment life</li>
                  <li>• Proactive replacement reduces downtime</li>
                  <li>• Documentation essential for compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};