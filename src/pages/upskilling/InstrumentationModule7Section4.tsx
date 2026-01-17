import { ArrowLeft, ArrowRight, Palette, Book, CheckCircle2, Cable, AlertTriangle, Brain, Target, Shield, Settings, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule7Section4 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Palette className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Wiring Standards and Colour Coding
                </h1>
                <p className="text-xl text-gray-400">
                  Module 7, Section 4
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 7.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                18 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Proper wiring standards and colour coding are essential for safety, troubleshooting, 
                and system identification in instrumentation installations. Consistent application 
                of these standards reduces installation time, prevents errors, and ensures safe operation.
              </p>
              <p>
                This section covers international standards for instrumentation wiring, cable selection 
                criteria, labelling conventions, and the critical safety benefits of standardised 
                wiring practices in industrial environments.
              </p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn standard wire colour codes used in instrumentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand the role of cable labelling and documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify risks of poor wiring practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply international standards for safe wiring installation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* IEC and ISA Standards */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                IEC and ISA Standards for Wiring Colours
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">International Wiring Standards</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">IEC 60757 Colour Coding</h5>
                  <p className="text-sm mb-2">
                    International Electrotechnical Commission standards for conductor identification:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong className="text-green-400">Green/Yellow:</strong> Protective earth (mandatory)</li>
                    <li>• <strong className="text-yellow-400">Blue:</strong> Neutral conductor</li>
                    <li>• <strong className="text-red-400">Brown:</strong> Line/Live conductor (single phase)</li>
                    <li>• <strong className="text-gray-300">Black:</strong> Line conductor L1 (three phase)</li>
                    <li>• <strong className="text-yellow-400">Brown:</strong> Line conductor L2 (three phase)</li>
                    <li>• <strong className="text-gray-400">Grey:</strong> Line conductor L3 (three phase)</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">ISA-5.1 Instrumentation Standards</h5>
                  <p className="text-sm mb-2">
                    Instrument Society of America guidelines for instrumentation identification:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong className="text-red-400">Red (+):</strong> Positive 4-20mA signal wire</li>
                    <li>• <strong className="text-black">Black (-):</strong> Negative 4-20mA return wire</li>
                    <li>• <strong className="text-yellow-400">Blue:</strong> 24VDC positive supply</li>
                    <li>• <strong className="text-white">White:</strong> 24VDC negative/common</li>
                    <li>• <strong className="text-orange-400">Orange:</strong> Shield/drain wire termination</li>
                    <li>• <strong className="text-purple-400">Purple:</strong> HART communication pairs</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">UK Specific Standards (BS 7671)</h5>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm mb-2">
                    <strong>BS 7671 Requirements for Electrical Installations:</strong>
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Protective Conductors:</strong> Green/Yellow stripes (mandatory)</li>
                    <li>• <strong>Functional Earth:</strong> Cream or light blue with green/yellow identification</li>
                    <li>• <strong>Control Circuits:</strong> Black for switch wires, red for permanent live</li>
                    <li>• <strong>Emergency Stop:</strong> Red conductors for emergency stop circuits</li>
                    <li>• <strong>Instrumentation:</strong> Follow manufacturer specifications with clear labelling</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Multi-Core Cable Standards</h5>
                <div className="space-y-2">
                  <div className="bg-blue-900/20 p-3 rounded border border-blue-600/30">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-1">Two-Core Instrumentation Cable</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Core 1: Red (positive signal)</li>
                      <li>• Core 2: Black (negative/return)</li>
                      <li>• Shield: Drain wire (orange/bare copper)</li>
                      <li>• Overall shield: Connected to instrument earth</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                    <h6 className="text-green-400 font-semibold text-sm mb-1">Multi-Pair Instrumentation Cable</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Pair 1: Red/Black (primary signal)</li>
                      <li>• Pair 2: Blue/White (secondary signal or power)</li>
                      <li>• Pair 3: Orange/Orange-White (communications)</li>
                      <li>• Pair 4: Green/Green-White (spare/auxiliary)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cable Types and Conductor Sizing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-5 w-5 text-yellow-400" />
                Cable Types and Conductor Sizing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Instrumentation Cable Selection</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Cable Construction Types</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h6 className="text-yellow-400 text-sm font-semibold mb-1">Individual Screen (IS)</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Each pair individually screened</li>
                        <li>• Best noise immunity</li>
                        <li>• Suitable for mixed signals</li>
                        <li>• Higher cost option</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-yellow-400 text-sm font-semibold mb-1">Overall Screen (OS)</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Single screen over all pairs</li>
                        <li>• Good general protection</li>
                        <li>• Cost effective solution</li>
                        <li>• Standard for most applications</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-yellow-400 text-sm font-semibold mb-1">Collective Screen (CS)</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Groups of pairs screened</li>
                        <li>• Medium noise protection</li>
                        <li>• Moderate cost increase</li>
                        <li>• Specialised applications</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Conductor Sizing Considerations</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-semibold mb-1">Current Carrying Capacity</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>0.5mm²:</strong> Up to 50mA (not recommended for loops)</li>
                        <li>• <strong>0.75mm²:</strong> Standard for 4-20mA loops up to 100mA</li>
                        <li>• <strong>1.0mm²:</strong> Preferred for long runs and multiple loops</li>
                        <li>• <strong>1.5mm²:</strong> Heavy duty applications and high current</li>
                        <li>• <strong>2.5mm²:</strong> Power distribution to instruments</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-semibold mb-1">Voltage Drop Considerations</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Resistance:</strong> Inversely proportional to cross-sectional area</li>
                        <li>• <strong>0.75mm²:</strong> ~24Ω/km resistance</li>
                        <li>• <strong>1.0mm²:</strong> ~18Ω/km resistance</li>
                        <li>• <strong>1.5mm²:</strong> ~12Ω/km resistance</li>
                        <li>• <strong>Selection:</strong> Based on loop resistance calculations</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Environmental and Safety Requirements</h5>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-1">Fire Performance</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>LSZH (Low Smoke Zero Halogen):</strong> Essential for enclosed spaces</li>
                        <li>• <strong>Fire Retardant:</strong> IEC 60332-1 single cable flame test</li>
                        <li>• <strong>Circuit Integrity:</strong> BS 6387 CWZ for emergency systems</li>
                        <li>• <strong>Smoke Emission:</strong> IEC 61034 smoke density test</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-1">Chemical Resistance</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Oil Resistance:</strong> Required in industrial environments</li>
                        <li>• <strong>UV Resistance:</strong> For outdoor installations</li>
                        <li>• <strong>Chemical Compatibility:</strong> Specific to plant environment</li>
                        <li>• <strong>Temperature Rating:</strong> -40°C to +105°C typical</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Labelling and Documentation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Labelling, Terminal Tags, and Control Panel Wiring Conventions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Systematic Labelling and Documentation</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Cable and Wire Identification</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-semibold mb-1">Cable Labelling Standards</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Unique Identifier:</strong> Each cable requires unique designation</li>
                        <li>• <strong>Source/Destination:</strong> Clear origin and termination points</li>
                        <li>• <strong>Signal Type:</strong> 4-20mA, 24VDC, HART, etc.</li>
                        <li>• <strong>Circuit Reference:</strong> P&ID tag or loop number</li>
                        <li>• <strong>Installation Date:</strong> For maintenance records</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-semibold mb-1">Wire Marking Methods</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Heat Shrink Labels:</strong> Permanent, chemical resistant</li>
                        <li>• <strong>Self-Adhesive Labels:</strong> Quick application, good adhesion</li>
                        <li>• <strong>Wrap-Around Labels:</strong> Visible from any angle</li>
                        <li>• <strong>Flag Labels:</strong> Easy to read in dense installations</li>
                        <li>• <strong>Laser Engraving:</strong> Permanent marking, highest durability</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Terminal Block Organisation</h5>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 p-3 rounded border border-blue-600/30">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-1">Terminal Numbering Systems</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Sequential Numbering:</strong> 1, 2, 3... for simple systems</li>
                        <li>• <strong>Function-Based:</strong> AI01+, AI01- for analog inputs</li>
                        <li>• <strong>Location-Based:</strong> Panel-Row-Position format</li>
                        <li>• <strong>Circuit Reference:</strong> Matching P&ID tag numbers</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                      <h6 className="text-green-400 font-semibold text-sm mb-1">Terminal Strip Layout</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Functional Grouping:</strong> Power, signals, communications separate</li>
                        <li>• <strong>Signal Direction:</strong> Inputs and outputs clearly separated</li>
                        <li>• <strong>Spare Terminals:</strong> 20% spare capacity for modifications</li>
                        <li>• <strong>Test Points:</strong> Easy access for maintenance and testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Documentation Requirements</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-semibold mb-1">Essential Documents</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Wiring Diagrams:</strong> Complete circuit documentation</li>
                        <li>• <strong>Terminal Lists:</strong> Every connection detailed</li>
                        <li>• <strong>Cable Schedules:</strong> Type, length, routing information</li>
                        <li>• <strong>Loop Diagrams:</strong> Signal flow and device locations</li>
                        <li>• <strong>As-Built Drawings:</strong> Final installation configuration</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-semibold mb-1">Maintenance Information</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Cable Routes:</strong> Physical routing and access points</li>
                        <li>• <strong>Test Procedures:</strong> Commissioning and maintenance tests</li>
                        <li>• <strong>Fault Finding:</strong> Troubleshooting guides and procedures</li>
                        <li>• <strong>Modification Records:</strong> Change control documentation</li>
                        <li>• <strong>Spare Parts Lists:</strong> Replacement component specifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting and Safety Benefits */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Troubleshooting and Safety Benefits of Standardisation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Operational and Safety Advantages</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Troubleshooting Benefits</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Rapid Identification:</strong> Immediate signal recognition by colour</li>
                      <li>• <strong>Reduced Downtime:</strong> Faster fault location and resolution</li>
                      <li>• <strong>Error Prevention:</strong> Consistent coding prevents connection mistakes</li>
                      <li>• <strong>Test Point Access:</strong> Clear identification of measurement points</li>
                      <li>• <strong>Signal Tracing:</strong> Easy to follow signal paths through system</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Maintenance Efficiency</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Technician Training:</strong> Universal understanding across sites</li>
                      <li>• <strong>Documentation Clarity:</strong> Drawings match physical installation</li>
                      <li>• <strong>Spare Parts:</strong> Standardised components and cables</li>
                      <li>• <strong>Modification Safety:</strong> Clear identification during alterations</li>
                      <li>• <strong>Knowledge Transfer:</strong> Easier handover between personnel</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Safety Advantages</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Electrical Safety:</strong> Clear identification of live conductors</li>
                      <li>• <strong>Earth Protection:</strong> Unmistakable green/yellow coding</li>
                      <li>• <strong>Isolation Safety:</strong> Correct circuits identified for maintenance</li>
                      <li>• <strong>Emergency Response:</strong> Rapid identification during emergencies</li>
                      <li>• <strong>Regulatory Compliance:</strong> Meets safety standard requirements</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Risk Mitigation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Human Error:</strong> Reduced risk of incorrect connections</li>
                      <li>• <strong>Cross-Wiring:</strong> Prevention of signal interference</li>
                      <li>• <strong>Equipment Damage:</strong> Correct polarity and voltage levels</li>
                      <li>• <strong>Process Safety:</strong> Reliable instrumentation operation</li>
                      <li>• <strong>Legal Liability:</strong> Compliance with installation standards</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Cost-Benefit Analysis</h5>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-green-400 font-semibold text-sm mb-1">Investment Costs</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Initial training on standards</li>
                        <li>• Quality labelling materials</li>
                        <li>• Documentation time</li>
                        <li>• Standard cable inventory</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-yellow-400 font-semibold text-sm mb-1">Long-term Savings</h6>
                      <ul className="text-sm space-y-1">
                        <li>• 50-70% reduction in troubleshooting time</li>
                        <li>• Reduced equipment damage from errors</li>
                        <li>• Lower maintenance and commissioning costs</li>
                        <li>• Improved system reliability and uptime</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                Emergency Repair in Junction Box: Standardised Colour Coding Saves the Day
              </p>
              <p>
                A technician receives an urgent call-out to a chemical processing plant where a critical 
                temperature measurement has failed, threatening to shut down a £50,000 per hour production 
                line. The instrument is located in a large junction box containing 40+ wire terminations 
                from multiple loops.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Emergency Situation:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Plant shutdown imminent if temperature loop not restored within 30 minutes</li>
                  <li>• Multiple instrumentation cables in congested junction box</li>
                  <li>• Original installer no longer available for consultation</li>
                  <li>• Limited lighting and cramped working conditions</li>
                  <li>• High pressure environment with production manager present</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Standard Colour Coding Benefits:</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Immediate Recognition:</strong> Red and black wires identified as 4-20mA signal</li>
                  <li>• <strong>Cable Labels:</strong> Clear "TI-101" label matches P&ID documentation</li>
                  <li>• <strong>Terminal Marking:</strong> Sequential numbering allows quick tracing</li>
                  <li>• <strong>Shield Identification:</strong> Orange drain wire clearly visible</li>
                  <li>• <strong>Safety First:</strong> Green/yellow earth wires avoided during testing</li>
                </ul>
              </div>
              <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                <h5 className="text-red-400 font-semibold text-sm mb-2">What Could Have Gone Wrong:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Non-standard colours could have led to wrong signal identification</li>
                  <li>• Unlabelled cables would require extensive circuit tracing</li>
                  <li>• Mixed numbering systems could cause connection errors</li>
                  <li>• Poor documentation might necessitate plant shutdown for safety</li>
                </ul>
              </div>
              <div className="bg-blue-900/20 p-3 rounded border border-blue-600/30">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Successful Resolution:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Fault located and isolated within 5 minutes using colour coding</li>
                  <li>• Temporary repair implemented using spare cable with matching colours</li>
                  <li>• Production maintained without shutdown, saving £25,000 in lost production</li>
                  <li>• Permanent repair scheduled during next planned maintenance window</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: Standardised colour coding and labelling enabled rapid fault identification 
                and repair, preventing costly production shutdown and demonstrating the critical 
                importance of following wiring standards in industrial environments.
              </p>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Following wiring standards ensures clarity, safety, and ease of maintenance across 
                the lifecycle of the system. Consistent colour coding, proper labelling, and thorough 
                documentation reduce installation errors, accelerate troubleshooting, and enhance 
                overall system safety and reliability in industrial environments.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What colour is typically used for 24V DC positive signal wires in instrumentation?",
                options: [
                  "Black",
                  "Red for positive signal wires and blue for 24VDC positive supply",
                  "Green",
                  "Yellow"
                ],
                correctAnswer: 1,
                explanation: "According to ISA-5.1 standards, red is used for positive 4-20mA signal wires, while blue is used for 24VDC positive supply wires in instrumentation applications."
              },
              {
                id: 2,
                question: "Why is consistent wire labelling important?",
                options: [
                  "It looks professional",
                  "It enables rapid fault identification, prevents connection errors, ensures safety during maintenance, and facilitates troubleshooting",
                  "It's required by insurance companies",
                  "It reduces cable costs"
                ],
                correctAnswer: 1,
                explanation: "Consistent wire labelling is critical for safety and efficiency - it enables rapid fault identification, prevents dangerous connection errors, ensures safe maintenance practices, and significantly reduces troubleshooting time."
              },
              {
                id: 3,
                question: "Name one international standard related to instrumentation wiring.",
                options: [
                  "ISA-5.1 (Instrumentation Symbols and Identification) or IEC 60757 (Code for designation of colours)",
                  "ISO 9001",
                  "ANSI Z87.1",
                  "NEMA 4X"
                ],
                correctAnswer: 0,
                explanation: "ISA-5.1 provides guidelines for instrumentation symbols and identification including wire colour coding, while IEC 60757 specifies the international standard for conductor colour designation."
              },
              {
                id: 4,
                question: "What hazard can incorrect colour coding cause?",
                options: [
                  "Higher installation costs",
                  "Electrical shock, equipment damage, wrong connections leading to process safety incidents, and delayed emergency response",
                  "Reduced signal quality",
                  "Increased cable length requirements"
                ],
                correctAnswer: 1,
                explanation: "Incorrect colour coding can cause serious safety hazards including electrical shock from touching live conductors, equipment damage from wrong connections, process safety incidents from faulty signals, and delayed emergency response due to misidentification."
              },
              {
                id: 5,
                question: "How does wire sizing affect signal transmission?",
                options: [
                  "Wire size doesn't affect signals",
                  "Larger wires increase resistance",
                  "Wire cross-sectional area affects resistance - larger wires have lower resistance, reducing voltage drop and improving signal integrity",
                  "Wire size only affects current capacity"
                ],
                correctAnswer: 2,
                explanation: "Wire sizing directly affects signal transmission through resistance. Larger cross-sectional areas have lower resistance, which reduces voltage drop along the cable run and improves signal integrity, especially important for long cable runs in 4-20mA loops."
            }
            ]}
            title="Section 4 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/instrumentation-module-7-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-7-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule7Section4;