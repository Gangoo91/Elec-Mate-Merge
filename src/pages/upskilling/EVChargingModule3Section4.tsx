import { ArrowLeft, ArrowRight, Cable, AlertTriangle, CheckCircle, BookOpen, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule3Section4Quiz } from '@/components/upskilling/quiz/EVChargingModule3Section4Quiz';

const EVChargingModule3Section4 = () => {
  useEffect(() => {
    document.title = 'Cable Routing and Containment - EV Charging Module 3 Section 4';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn professional cable routing and containment methods for EV charging installations. Covers BS 7671 requirements, protection methods, and installation techniques.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Cable className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 3 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Cable Routing and Containment
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Professional cable installation practices, containment systems, and BS 7671 compliance for EV charging infrastructure
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Proper cable routing and containment are fundamental to safe, reliable, and compliant EV charging installations. This section covers professional installation methods, BS 7671 requirements, and best practices for cable management systems.
              </p>
              <p>
                Effective cable routing ensures protection from mechanical damage, environmental hazards, and electromagnetic interference whilst maintaining accessibility for inspection and maintenance. Understanding containment systems and their selection criteria is essential for creating installations that meet current standards and facilitate future modifications.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Upon completion of this section, you will be able to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Select appropriate cable routing methods for different installation environments</li>
                <li>Specify containment systems meeting fire safety and segregation requirements</li>
                <li>Apply correct installation techniques including bend radius and support spacing</li>
                <li>Implement mechanical protection and marking systems</li>
                <li>Ensure compliance with BS 7671 wiring system requirements</li>
                <li>Apply best practice guidelines for professional cable management</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cable Routing Methods */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-5 w-5 text-yellow-400" />
                Cable Routing Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Surface Mounting</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Clipped direct (Method C) for internal areas with minimal risk</li>
                    <li>SWA cable with appropriate clips at 300-400mm centres</li>
                    <li>Consider expansion/contraction with temperature changes</li>
                    <li>Minimum 50mm clearance from other services</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Underground Burial</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Minimum 450mm depth (600mm under roads/driveways)</li>
                    <li>Sand bed and covering with warning tape 150mm above</li>
                    <li>Suitable cable markers at changes of direction</li>
                    <li>Ducted systems for future cable changes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Conduit Systems</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Heavy gauge steel/PVC conduit for mechanical protection</li>
                    <li>Maximum 40% fill factor for cable installation</li>
                    <li>Inspection boxes at maximum 15m intervals</li>
                    <li>Proper sealing against moisture ingress</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Cable Tray Systems</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Galvanised steel or aluminium for corrosion resistance</li>
                    <li>Support spacing: 1.5m for steel, 1.2m for aluminium</li>
                    <li>Segregation between power and data cables</li>
                    <li>Cover requirements in public access areas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Containment System Selection */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Containment System Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Fire-Rated Systems</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>30, 60, or 120-minute fire resistance ratings</li>
                    <li>Compartmentation requirements for escape routes</li>
                    <li>Fire-stopping at wall and floor penetrations</li>
                    <li>Material selection: steel vs plastic considerations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Segregation Requirements</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>ELV (extra-low voltage) and LV (low voltage) separation</li>
                    <li>Minimum 100mm separation or metal barrier</li>
                    <li>Data cable segregation from power circuits</li>
                    <li>EMC considerations for sensitive equipment</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-2">IP Rating Selection</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Environment</th>
                          <th className="border border-gray-600 p-2 text-left">Minimum IP Rating</th>
                          <th className="border border-gray-600 p-2 text-left">Typical Application</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Internal dry</td>
                          <td className="border border-gray-600 p-2">IP2X</td>
                          <td className="border border-gray-600 p-2">Office/commercial areas</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Internal wet</td>
                          <td className="border border-gray-600 p-2">IP54</td>
                          <td className="border border-gray-600 p-2">Washdown areas</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">External</td>
                          <td className="border border-gray-600 p-2">IP65</td>
                          <td className="border border-gray-600 p-2">Outdoor installations</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Underground</td>
                          <td className="border border-gray-600 p-2">IP68</td>
                          <td className="border border-gray-600 p-2">Buried/flooded areas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Techniques */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-purple-400" />
                Installation Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Bend Radius Requirements</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Cable Type</th>
                          <th className="border border-gray-600 p-2 text-left">Minimum Bend Radius</th>
                          <th className="border border-gray-600 p-2 text-left">Installation</th>
                          <th className="border border-gray-600 p-2 text-left">Fixed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">PVC Singles</td>
                          <td className="border border-gray-600 p-2">3 × diameter</td>
                          <td className="border border-gray-600 p-2">4 × diameter</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">SWA Cable</td>
                          <td className="border border-gray-600 p-2">6 × diameter</td>
                          <td className="border border-gray-600 p-2">8 × diameter</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Flexible Cable</td>
                          <td className="border border-gray-600 p-2">4 × diameter</td>
                          <td className="border border-gray-600 p-2">6 × diameter</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Support Spacing</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>PVC cables: 300mm vertical, 400mm horizontal</li>
                    <li>SWA cables: 600mm vertical, 750mm horizontal</li>
                    <li>Increased spacing for higher temperatures</li>
                    <li>Additional support within 150mm of terminations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Cable Pulling Techniques</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Maximum pulling tension: 50N per mm² conductor</li>
                    <li>Use pulling eyes for larger cables</li>
                    <li>Lubrication for long conduit runs</li>
                    <li>Temperature considerations during installation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mechanical Protection */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Mechanical Protection Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Impact Protection</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>AG rating for vehicle impact areas (2m height)</li>
                    <li>Steel barrier posts or concrete bollards</li>
                    <li>Impact-resistant containment systems</li>
                    <li>Buried cable protection from excavation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Route Marking</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Underground cable markers every 25m</li>
                    <li>Warning tape 150mm above buried cables</li>
                    <li>Cable route plans and as-built drawings</li>
                    <li>GPS coordinates for future reference</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Access Provisions</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Joint boxes accessible without damage</li>
                    <li>Cable removal without structural damage</li>
                    <li>Maintenance access requirements</li>
                    <li>Future cable route provisions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BS 7671 Requirements */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-red-400" />
                BS 7671 Compliance Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Wiring System Selection (Chapter 52)</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Regulation 521.5: External influences assessment</li>
                    <li>Regulation 522.6: Installation methods and current-carrying capacity</li>
                    <li>Regulation 522.8: Proximity to other services</li>
                    <li>Regulation 526: Electrical connections and joints</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">External Influences (Appendix 5)</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>AD conditions: Presence of water (AD1-AD8)</li>
                    <li>AF conditions: Corrosion (AF1-AF4)</li>
                    <li>AG conditions: Mechanical stress (AG1-AG3)</li>
                    <li>AH conditions: Vibration (AH1-AH3)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Support Requirements (Regulation 522.8.5)</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Cables supported at appropriate intervals</li>
                    <li>No strain on terminations or joints</li>
                    <li>Expansion joints for temperature variation</li>
                    <li>Support material compatibility with cable</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practice Guidelines */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                Best Practice Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Professional Installation Standards</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Neat, workmanlike installation appearance</li>
                    <li>Consistent spacing and alignment</li>
                    <li>Appropriate marking and labelling</li>
                    <li>Documentation of installation methods</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Future Maintenance Access</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Accessible terminations and joints</li>
                    <li>Cable identification systems</li>
                    <li>Spare capacity in containment (25% minimum)</li>
                    <li>Removable covers for inspection points</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Common Installation Issues</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Insufficient bend radius causing cable damage</li>
                    <li>Inadequate support leading to cable sag</li>
                    <li>Poor segregation causing EMC problems</li>
                    <li>Inadequate protection in vulnerable areas</li>
                    <li>Missing or incorrect cable marking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Installation Examples */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-indigo-400" />
                Practical Installation Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="font-semibold text-indigo-400 mb-3">Example 1: Domestic Garage Installation</h4>
                <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-300 mb-2">Installation Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 25m run from consumer unit to charge point</li>
                        <li>• Route: Through house, external wall, garage</li>
                        <li>• Cable: 6mm² 3-core SWA (Method D)</li>
                        <li>• Protection: 32A Type B MCB + 30mA RCD</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-300 mb-2">Routing Method</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Internal: 25mm PVC conduit in wall void</li>
                        <li>• External: Clipped direct on masonry clips</li>
                        <li>• Ground level: 50mm impact protection</li>
                        <li>• Garage entry: Sealed cable gland IP65</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-indigo-300 mb-2">Support Calculations</h5>
                    <p className="text-sm">
                      Cable supports: 6mm² SWA requires supports every 750mm horizontal, 600mm vertical. 
                      Total supports required: 34 clips for 25m run. Additional support within 150mm of terminations.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-indigo-400 mb-3">Example 2: Commercial Car Park Installation</h4>
                <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-300 mb-2">System Overview</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 10 charging bays with expansion to 20</li>
                        <li>• Underground ducted system</li>
                        <li>• 150mm HDPE ducts with draw pits</li>
                        <li>• Future 22kW capability planning</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-300 mb-2">Cable Specification</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Primary: 95mm² 4-core XLPE</li>
                        <li>• Secondary: 16mm² 4-core SWA per bay</li>
                        <li>• Data: Cat6 FTP for communications</li>
                        <li>• Spare: 25% duct capacity for expansion</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-indigo-300 mb-2">Installation Method</h5>
                    <p className="text-sm">
                      Main distribution: 150mm duct at 1m depth with concrete surround. Secondary feeds: 100mm ducts 
                      to individual charge points. Draw pits every 50m for cable pulling. Warning tape and markers throughout.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Installation Issues */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Common Installation Issues and Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-red-400">Cable Routing Problems</h4>
                  
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-red-300 mb-2">Issue: Excessive Voltage Drop</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>Cause:</strong> Undersized cable for long runs</p>
                      <p><strong>Solution:</strong> Upsize cable or install local distribution board</p>
                      <p><strong>Prevention:</strong> Calculate Vd early in design phase</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-red-300 mb-2">Issue: Inadequate Mechanical Protection</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>Cause:</strong> Exposed cables in vulnerable areas</p>
                      <p><strong>Solution:</strong> Install impact barriers or reroute cables</p>
                      <p><strong>Prevention:</strong> Risk assessment during route planning</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-red-400">Containment Issues</h4>
                  
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-red-300 mb-2">Issue: Incorrect Segregation</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>Cause:</strong> Mixed voltage circuits in same containment</p>
                      <p><strong>Solution:</strong> Install physical barriers or separate routes</p>
                      <p><strong>Prevention:</strong> Circuit classification during design</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-red-300 mb-2">Issue: Moisture Ingress</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>Cause:</strong> Inadequate IP rating for environment</p>
                      <p><strong>Solution:</strong> Upgrade containment or improve sealing</p>
                      <p><strong>Prevention:</strong> Environmental assessment (Appendix 5)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Techniques */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-cyan-400" />
                Advanced Installation Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="font-semibold text-cyan-400 mb-3">Horizontal Directional Drilling (HDD)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-cyan-300 mb-2">Applications</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Road crossings without excavation</li>
                      <li>Landscaped areas preservation</li>
                      <li>Existing services avoidance</li>
                      <li>Rock or difficult ground conditions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-cyan-300 mb-2">Technical Requirements</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Minimum bend radius: 150 × pipe diameter</li>
                      <li>Entry/exit angles: 8-12 degrees typical</li>
                      <li>Duct specification: HDPE SDR11 minimum</li>
                      <li>Pulling force calculations essential</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-cyan-400 mb-3">EMC and Interference Mitigation</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-cyan-300 mb-2">Power Cable EMC</h5>
                    <ul className="text-sm space-y-1">
                      <li>• SWA earthing at both ends for low impedance path</li>
                      <li>• Avoid steel containment parallel runs over 10m</li>
                      <li>• Cross power and data cables at 90° only</li>
                      <li>• Minimum 300mm separation for unscreened data</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-cyan-300 mb-2">Communication Cable Protection</h5>
                    <ul className="text-sm space-y-1">
                      <li>• FTP (Foiled Twisted Pair) cable minimum for data</li>
                      <li>• Dedicated data containment systems</li>
                      <li>• Earthed metallic screens at communication equipment</li>
                      <li>• Isolation transformers for long data runs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule3Section4Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-3-section-3">
              <Button variant="outline" className="bg-card border-gray-600 text-white hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-3-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule3Section4;