import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertTriangle, Calculator, Target, CheckCircle, Settings, Lightbulb, MapPin, Clock, Zap, BookOpen, Wrench, Shield, Ruler } from 'lucide-react';

export const EmergencyLightingContent2_2_Enhanced = () => {
  const illuminanceLevels = [
    { area: "Open Areas > 60m²", level: "0.5 lux average", uniformity: "40:1 max ratio" },
    { area: "Circulation Areas", level: "1.0 lux on floor", uniformity: "Along escape route" },
    { area: "High Risk Areas", level: "15 lux average", uniformity: "Based on task requirements" }
  ];

  const spacingCalculations = [
    { mounting: "2.5m height", spacing: "7.5m maximum", coverage: "3:1 height ratio" },
    { mounting: "3.0m height", spacing: "9.0m maximum", coverage: "Standard ceiling height" },
    { mounting: "4.0m height", spacing: "12.0m maximum", coverage: "Industrial applications" }
  ];

  const commonIssues = [
    "Inadequate illuminance levels",
    "Poor uniformity distribution",
    "Insufficient battery duration",
    "Incorrect luminaire positioning",
    "Obstructed light distribution",
    "Missing or damaged diffusers"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content - Open Area (Anti-Panic) Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* What is Anti-Panic Lighting */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">What is Open Area (Anti-Panic) Lighting?</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed">
              Open area (anti-panic) lighting is a category of emergency lighting designed to reduce panic and provide 
              sufficient illumination for people to move safely towards escape routes when normal lighting fails. 
              Unlike escape route lighting which guides along specific paths, anti-panic lighting covers large open spaces.
            </p>
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Primary Functions
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Prevent panic in large open spaces during power failure</li>
                <li>• Allow safe movement towards designated escape routes</li>
                <li>• Provide sufficient visibility to identify obstacles and hazards</li>
                <li>• Enable recognition of other occupants and safety signage</li>
                <li>• Maintain general orientation and spatial awareness</li>
              </ul>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-elec-yellow text-black">BS 5266-1 Definition</Badge>
              </div>
              <p className="text-foreground text-sm">
                <strong>Anti-panic lighting:</strong> That part of emergency lighting provided to reduce the likelihood 
                of panic and to enable safe movement of occupants towards escape routes by providing appropriate 
                visual conditions and directional orientation.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Requirements and Standards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Legal Requirements and Standards</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">BS 5266-1 Requirements:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Minimum 0.5 lux average illuminance</li>
                  <li>• Maximum 40:1 uniformity ratio</li>
                  <li>• 1-hour minimum duration (3-hour in some cases)</li>
                  <li>• Coverage of entire floor area</li>
                  <li>• Automatic operation on mains failure</li>
                </ul>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Building Regulations:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Approved Document B requirements</li>
                  <li>• Fire Risk Assessment compliance</li>
                  <li>• Means of escape provisions</li>
                  <li>• Regular testing and maintenance</li>
                  <li>• Certification and documentation</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium mb-2">Mandatory Applications:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Open areas exceeding 60m² without natural lighting</li>
                    <li>• Areas where normal lighting may create panic if failed</li>
                    <li>• Large assembly areas, halls, and open-plan offices</li>
                    <li>• Industrial spaces with potential hazards in darkness</li>
                    <li>• Underground areas and windowless spaces</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Technical Specifications and Design Parameters</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Illuminance Requirements
              </h4>
              <div className="space-y-3">
                {illuminanceLevels.map((level, index) => (
                  <div key={index} className="bg-[#404040] rounded p-3">
                    <h5 className="text-foreground font-medium mb-1">{level.area}</h5>
                    <p className="text-foreground text-sm">
                      <strong>Level:</strong> {level.level} | <strong>Uniformity:</strong> {level.uniformity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-3 flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Luminaire Spacing Guidelines
              </h4>
              <div className="space-y-3">
                {spacingCalculations.map((spacing, index) => (
                  <div key={index} className="bg-[#404040] rounded p-3">
                    <h5 className="text-foreground font-medium mb-1">{spacing.mounting}</h5>
                    <p className="text-foreground text-sm">
                      <strong>Max Spacing:</strong> {spacing.spacing} | <strong>Application:</strong> {spacing.coverage}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h4 className="text-yellow-400 font-medium mb-2">Key Design Formulas:</h4>
              <div className="text-foreground text-sm space-y-2">
                <p><strong>Spacing/Height Ratio:</strong> S/H ≤ 3:1 (where S = spacing, H = mounting height)</p>
                <p><strong>Utilisation Factor:</strong> UF = (Useful lumens) / (Total lamp lumens)</p>
                <p><strong>Room Index:</strong> RI = (L × W) / [H × (L + W)]</p>
                <p><strong>Average Illuminance:</strong> E = (Φ × UF × MF) / A</p>
              </div>
            </div>
          </div>
        </div>

        {/* Design Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Design Considerations and Planning</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Spatial Analysis:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Map room dimensions and layout accurately</li>
                  <li>• Identify potential obstacles and obstructions</li>
                  <li>• Consider ceiling height variations</li>
                  <li>• Account for furniture and equipment placement</li>
                  <li>• Assess reflectance of surfaces and finishes</li>
                </ul>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Strategic Positioning:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Position to avoid shadows from obstacles</li>
                  <li>• Ensure uniform coverage across floor area</li>
                  <li>• Consider maintenance access requirements</li>
                  <li>• Avoid glare zones and excessive contrast</li>
                  <li>• Coordinate with escape route lighting</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <h4 className="text-orange-400 font-medium mb-2">Environmental Factors:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Temperature variations and heating effects</li>
                  <li>• Humidity and condensation potential</li>
                  <li>• Dust accumulation and maintenance frequency</li>
                  <li>• Chemical exposure and corrosion risks</li>
                </ul>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Vibration and mechanical stress</li>
                  <li>• IP rating requirements for environment</li>
                  <li>• Fire resistance and emergency conditions</li>
                  <li>• Integration with other building systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Procedures */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Installation Procedures and Best Practices</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-elec-yellow text-black">Step 1</Badge>
                <h4 className="text-blue-400 font-medium">Pre-Installation Planning</h4>
              </div>
              <div className="space-y-2">
                <ol className="text-foreground text-sm space-y-1 list-decimal list-inside">
                  <li>Review architectural drawings and specifications</li>
                  <li>Conduct site survey and measure actual dimensions</li>
                  <li>Identify cable routes and containment systems</li>
                  <li>Coordinate with other trades and building services</li>
                  <li>Order equipment and materials based on final design</li>
                  <li>Plan installation sequence and access requirements</li>
                </ol>
              </div>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-elec-yellow text-black">Step 2</Badge>
                <h4 className="text-green-400 font-medium">Luminaire Installation</h4>
              </div>
              <div className="space-y-2">
                <ol className="text-foreground text-sm space-y-1 list-decimal list-inside">
                  <li>Mark positions accurately using laser level or theodolite</li>
                  <li>Install appropriate mounting hardware for ceiling type</li>
                  <li>Route cables using approved containment methods</li>
                  <li>Make electrical connections in accessible junction boxes</li>
                  <li>Secure luminaires ensuring proper mechanical fixing</li>
                  <li>Install batteries and verify polarity connections</li>
                </ol>
              </div>
            </div>

            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-elec-yellow text-black">Step 3</Badge>
                <h4 className="text-purple-400 font-medium">System Integration</h4>
              </div>
              <div className="space-y-2">
                <ol className="text-foreground text-sm space-y-1 list-decimal list-inside">
                  <li>Connect to central monitoring system (if required)</li>
                  <li>Program addressable systems with zone identification</li>
                  <li>Set up remote testing and monitoring functions</li>
                  <li>Configure switching arrangements and control inputs</li>
                  <li>Test integration with fire alarm and BMS systems</li>
                  <li>Verify all luminaires respond correctly to test signals</li>
                </ol>
              </div>
            </div>

            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium mb-2">Critical Safety Requirements:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• All electrical work must comply with BS 7671</li>
                    <li>• Use appropriate PPE and safe working practices</li>
                    <li>• Ensure adequate earthing and bonding</li>
                    <li>• Test insulation resistance before energising</li>
                    <li>• Verify RCD protection operates correctly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing and Commissioning */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Testing and Commissioning Procedures</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Commissioning Test Sequence
              </h4>
              <div className="space-y-3">
                <div className="bg-[#404040] rounded p-3">
                  <h5 className="text-foreground font-medium mb-2">Initial Electrical Tests</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Continuity of protective conductors</li>
                    <li>• Insulation resistance (minimum 1MΩ)</li>
                    <li>• Polarity verification</li>
                    <li>• Earth fault loop impedance</li>
                    <li>• RCD operation and timing</li>
                  </ul>
                </div>
                <div className="bg-[#404040] rounded p-3">
                  <h5 className="text-foreground font-medium mb-2">Emergency Lighting Function Tests</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• All luminaires illuminate on mains failure</li>
                    <li>• Achieve specified duration (1 or 3 hours)</li>
                    <li>• Illuminance levels meet BS 5266-1 requirements</li>
                    <li>• Uniformity ratios within acceptable limits</li>
                    <li>• Automatic changeover operation verified</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Illuminance Measurement Procedure
              </h4>
              <ol className="text-foreground text-sm space-y-2 list-decimal list-inside">
                <li><strong>Equipment Setup:</strong> Calibrated lux meter, measurement grid plan</li>
                <li><strong>Grid Pattern:</strong> Measure at 2m intervals across floor area</li>
                <li><strong>Measurement Height:</strong> 0.85m above floor level (work plane height)</li>
                <li><strong>Environmental Conditions:</strong> Record temperature and humidity</li>
                <li><strong>Data Recording:</strong> Document all readings on site plan</li>
                <li><strong>Calculation:</strong> Verify average levels and uniformity ratios</li>
              </ol>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h4 className="text-yellow-400 font-medium mb-2">Documentation Requirements:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Installation certificate (BS 7671)</li>
                  <li>• Emergency lighting certificate</li>
                  <li>• Illuminance measurement results</li>
                  <li>• Equipment schedule and specifications</li>
                </ul>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Test record sheets</li>
                  <li>• Operation and maintenance manual</li>
                  <li>• System schematic drawings</li>
                  <li>• Battery replacement schedule</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting Common Issues */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Troubleshooting Common Issues</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground">
              Identify and resolve typical problems encountered in anti-panic lighting installations:
            </p>
            
            <div className="space-y-3">
              {commonIssues.map((issue, index) => (
                <div key={index} className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="text-red-400 font-medium">{issue}</h4>
                      <div className="text-foreground text-sm">
                        {issue === "Inadequate illuminance levels" && (
                          <div>
                            <p><strong>Causes:</strong> Insufficient luminaires, wrong lamp types, dirty optics</p>
                            <p><strong>Solution:</strong> Add luminaires, upgrade lamps, clean regularly</p>
                          </div>
                        )}
                        {issue === "Poor uniformity distribution" && (
                          <div>
                            <p><strong>Causes:</strong> Uneven spacing, obstacles, reflectance variations</p>
                            <p><strong>Solution:</strong> Redesign layout, relocate luminaires, improve optics</p>
                          </div>
                        )}
                        {issue === "Insufficient battery duration" && (
                          <div>
                            <p><strong>Causes:</strong> Aged batteries, high lamp loads, poor charging</p>
                            <p><strong>Solution:</strong> Replace batteries, reduce loads, check charger circuits</p>
                          </div>
                        )}
                        {issue === "Incorrect luminaire positioning" && (
                          <div>
                            <p><strong>Causes:</strong> Poor planning, site constraints, installation errors</p>
                            <p><strong>Solution:</strong> Survey and redesign, relocate if necessary</p>
                          </div>
                        )}
                        {issue === "Obstructed light distribution" && (
                          <div>
                            <p><strong>Causes:</strong> Structural elements, equipment, suspended items</p>
                            <p><strong>Solution:</strong> Relocate luminaires, add supplementary lighting</p>
                          </div>
                        )}
                        {issue === "Missing or damaged diffusers" && (
                          <div>
                            <p><strong>Causes:</strong> Impact damage, UV degradation, thermal stress</p>
                            <p><strong>Solution:</strong> Replace with correct specification, improve protection</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maintenance and Testing Schedule */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Maintenance and Testing Schedule</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Daily Checks:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Visual inspection of indicators</li>
                  <li>• Check for physical damage</li>
                  <li>• Verify charge indicators active</li>
                  <li>• Report any defects immediately</li>
                </ul>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Monthly Tests:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Brief function test (switch off for few minutes)</li>
                  <li>• Check all luminaires illuminate</li>
                  <li>• Verify automatic changeover</li>
                  <li>• Record results in logbook</li>
                </ul>
              </div>
              <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2">Annual Tests:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Full duration discharge test</li>
                  <li>• Illuminance level verification</li>
                  <li>• Battery condition assessment</li>
                  <li>• Complete system certification</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h4 className="text-yellow-400 font-medium mb-2">Record Keeping Requirements:</h4>
              <div className="text-foreground text-sm space-y-1">
                <p>• Maintain detailed logbook of all tests and maintenance</p>
                <p>• Record date, time, duration, and results of each test</p>
                <p>• Document any defects found and remedial action taken</p>
                <p>• Keep records available for inspection by authorities</p>
                <p>• Retain records for minimum 3 years or building lifecycle</p>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};