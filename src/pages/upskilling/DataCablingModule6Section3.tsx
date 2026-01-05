import { ArrowLeft, Building, CheckCircle, AlertTriangle, MapPin, Layers, Shield, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const DataCablingModule6Section3 = () => {
  const quiz = [
    {
      question: "What is the maximum distance for backbone cabling between intermediate cross-connects (IC) and main cross-connects (MC)?",
      options: [
        "300 metres",
        "500 metres",
        "800 metres",
        "2000 metres"
      ],
      correct: 2,
      explanation: "The maximum distance for backbone cabling between IC and MC is 800 metres for copper and varies for fibre based on the specific application requirements."
    },
    {
      question: "Which standard specifies the minimum requirements for telecommunications rooms?",
      options: [
        "TIA-568 only",
        "TIA-569 only",
        "Both TIA-568 and TIA-569",
        "ISO/IEC 14763 only"
      ],
      correct: 2,
      explanation: "Both TIA-568 and TIA-569 specify telecommunications room requirements, with TIA-569 focusing specifically on pathways and spaces."
    },
    {
      question: "What is the minimum floor loading requirement for telecommunications rooms?",
      options: [
        "2.4 kN/m² (50 lbs/ft²)",
        "4.8 kN/m² (100 lbs/ft²)",
        "7.2 kN/m² (150 lbs/ft²)",
        "12.0 kN/m² (250 lbs/ft²)"
      ],
      correct: 1,
      explanation: "Telecommunications rooms require a minimum floor loading of 4.8 kN/m² (100 lbs/ft²) to support equipment racks and cable management systems."
    },
    {
      question: "Which fire rating is typically required for pathways passing through fire-rated walls?",
      options: [
        "30 minutes",
        "60 minutes",
        "90 minutes",
        "Same as the wall assembly"
      ],
      correct: 3,
      explanation: "Pathways must maintain the same fire rating as the wall assembly they pass through, often achieved using fire-rated sleeves or firestops."
    },
    {
      question: "What is the maximum recommended temperature range for telecommunications equipment rooms?",
      options: [
        "15-25°C (59-77°F)",
        "18-24°C (64-75°F)",
        "20-30°C (68-86°F)",
        "22-26°C (72-79°F)"
      ],
      correct: 1,
      explanation: "The recommended temperature range for telecommunications equipment rooms is 18-24°C (64-75°F) with humidity maintained between 45-55% RH."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../data-cabling-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Building className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Building and Campus Standards
              </h1>
              <p className="text-base md:text-lg text-gray-400">
                Installation standards for buildings and campuses
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Section 3
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              18 minutes
            </Badge>
          </div>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-5 w-5 text-yellow-400" />
                Understanding Building Cabling Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Building and campus cabling standards define the physical infrastructure requirements 
                for telecommunications systems. These standards ensure that cabling installations 
                support current and future communication needs while maintaining safety, accessibility, 
                and performance standards.
              </p>
              <p>
                Proper implementation of these standards is critical for creating robust, scalable 
                networks that can adapt to changing technology requirements over the building's lifetime.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2 list-disc list-inside">
                <li>Understand structured cabling hierarchy and topology requirements</li>
                <li>Learn telecommunications room design and space requirements</li>
                <li>Identify pathway and space standards for building infrastructure</li>
                <li>Understand campus backbone cabling specifications</li>
                <li>Learn about fire safety and building code compliance</li>
                <li>Apply standards to real-world building design scenarios</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-yellow-400" />
                Structured Cabling Hierarchy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Three-Tier Architecture</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Horizontal Cabling</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Function:</strong> Work area to TR</li>
                      <li><strong>Distance:</strong> 90m maximum</li>
                      <li><strong>Topology:</strong> Star configuration</li>
                      <li><strong>Media:</strong> UTP, STP, or fibre</li>
                      <li><strong>No splices:</strong> Point-to-point only</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Backbone Cabling</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Function:</strong> TR to ER/MC</li>
                      <li><strong>Distance:</strong> Varies by media</li>
                      <li><strong>Topology:</strong> Star or bus</li>
                      <li><strong>Media:</strong> Multimode/singlemode fibre</li>
                      <li><strong>Redundancy:</strong> Often required</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Campus Backbone</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Function:</strong> Building-to-building</li>
                      <li><strong>Distance:</strong> Up to 2000m</li>
                      <li><strong>Topology:</strong> Star from campus MC</li>
                      <li><strong>Media:</strong> Singlemode fibre</li>
                      <li><strong>Protection:</strong> Environmental rated</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Cross-Connect Hierarchy</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Main Cross-Connect (MC)</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Purpose and Function:</strong></p>
                        <ul className="space-y-1">
                          <li>• Central point for campus connectivity</li>
                          <li>• Interface to service provider networks</li>
                          <li>• Campus backbone distribution</li>
                          <li>• Primary network management location</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Design Requirements:</strong></p>
                        <ul className="space-y-1">
                          <li>• Redundant power and cooling</li>
                          <li>• 24/7 access control</li>
                          <li>• Comprehensive monitoring</li>
                          <li>• Disaster recovery provisions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Intermediate Cross-Connect (IC)</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Purpose and Function:</strong></p>
                        <ul className="space-y-1">
                          <li>• Floor or zone distribution point</li>
                          <li>• Backbone to horizontal interface</li>
                          <li>• Local network aggregation</li>
                          <li>• Optional in single-tier buildings</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Distance Limitations:</strong></p>
                        <ul className="space-y-1">
                          <li>• MC to IC: 500m (copper), varies (fibre)</li>
                          <li>• IC to HC: 300m (copper), varies (fibre)</li>
                          <li>• Total channel: Within application limits</li>
                          <li>• Consolidation points: Special rules</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Horizontal Cross-Connect (HC)</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Purpose and Function:</strong></p>
                        <ul className="space-y-1">
                          <li>• Telecommunications room (TR) location</li>
                          <li>• Horizontal cable termination</li>
                          <li>• Active equipment installation</li>
                          <li>• Work area service point</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Service Area:</strong></p>
                        <ul className="space-y-1">
                          <li>• Maximum 1000m² floor area</li>
                          <li>• 90m horizontal cable limit</li>
                          <li>• Multiple TRs per floor if needed</li>
                          <li>• Centralised vs distributed strategies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                Telecommunications Room Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Space Requirements and Sizing</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Minimum Size Calculations</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Floor Area Served</th>
                            <th className="text-left p-2 text-yellow-400">Minimum TR Size</th>
                            <th className="text-left p-2 text-yellow-400">Recommended Size</th>
                            <th className="text-left p-2 text-yellow-400">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">≤ 500m²</td>
                            <td className="p-2">3m × 2.2m</td>
                            <td className="p-2">3m × 3m</td>
                            <td className="p-2">Small office buildings</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">500-800m²</td>
                            <td className="p-2">3m × 2.8m</td>
                            <td className="p-2">3m × 3.5m</td>
                            <td className="p-2">Medium office floors</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">800-1000m²</td>
                            <td className="p-2">3m × 3.4m</td>
                            <td className="p-2">4m × 4m</td>
                            <td className="p-2">Large office floors</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">&gt; 1000m²</td>
                            <td className="p-2">Multiple TRs</td>
                            <td className="p-2">Multiple TRs</td>
                            <td className="p-2">Split into service areas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Physical Environment Requirements</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Structural Requirements:</strong></p>
                        <ul className="space-y-1">
                          <li>• Floor loading: 4.8 kN/m² (100 lbs/ft²)</li>
                          <li>• Ceiling height: 2.6m (8.5 ft) minimum</li>
                          <li>• No false ceiling obstructions</li>
                          <li>• Concrete or equivalent flooring</li>
                          <li>• No water pipes or drains</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Environmental Controls:</strong></p>
                        <ul className="space-y-1">
                          <li>• Temperature: 18-24°C (64-75°F)</li>
                          <li>• Humidity: 45-55% RH</li>
                          <li>• 24/7 HVAC operation</li>
                          <li>• Separate air handling</li>
                          <li>• Temperature monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Electrical and Safety Requirements</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Power System Requirements</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Primary Power:</strong></p>
                        <ul className="space-y-1">
                          <li>• Dedicated 20A circuit minimum</li>
                          <li>• 120V/240V depending on region</li>
                          <li>• Separate from general building loads</li>
                          <li>• Non-switched outlets</li>
                          <li>• Two outlets per wall minimum</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Grounding and Bonding:</strong></p>
                        <ul className="space-y-1">
                          <li>• Telecommunications grounding busbar (TGB)</li>
                          <li>• Bonding conductor to building ground</li>
                          <li>• Equipment rack grounding</li>
                          <li>• 6 AWG minimum bonding conductor</li>
                          <li>• Isolated ground system if specified</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Safety and Access Requirements</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Access and Security:</strong></p>
                        <ul className="space-y-1">
                          <li>• Lockable door with access control</li>
                          <li>• Outward-opening door preferred</li>
                          <li>• 900mm (36") door width minimum</li>
                          <li>• Emergency lighting provisions</li>
                          <li>• Clear egress path maintained</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Fire Safety:</strong></p>
                        <ul className="space-y-1">
                          <li>• Smoke detection system</li>
                          <li>• Fire suppression as required</li>
                          <li>• Plenum-rated cables in air spaces</li>
                          <li>• Fire-rated pathway penetrations</li>
                          <li>• Emergency shutdown provisions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Workflow className="h-5 w-5 text-green-400" />
                Pathway and Space Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Horizontal Pathway Requirements</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Conduit and Raceway Sizing</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Cable Type</th>
                            <th className="text-left p-2 text-yellow-400">Conduit Fill %</th>
                            <th className="text-left p-2 text-yellow-400">Tray Fill %</th>
                            <th className="text-left p-2 text-yellow-400">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Cat 5e/6 UTP</td>
                            <td className="p-2">40%</td>
                            <td className="p-2">50%</td>
                            <td className="p-2">Standard fill ratios</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Cat 6A UTP</td>
                            <td className="p-2">35%</td>
                            <td className="p-2">40%</td>
                            <td className="p-2">Larger diameter</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Cat 7 STP</td>
                            <td className="p-2">30%</td>
                            <td className="p-2">35%</td>
                            <td className="p-2">Shielded, larger</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Fibre optic</td>
                            <td className="p-2">50%</td>
                            <td className="p-2">60%</td>
                            <td className="p-2">Higher fill allowed</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Pathway Types and Applications</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Overhead Pathways:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cable tray systems</li>
                          <li>• J-hooks and bridle rings</li>
                          <li>• Suspended ceiling spaces</li>
                          <li>• Plenum considerations</li>
                          <li>• Support spacing requirements</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Floor and Wall Pathways:</strong></p>
                        <ul className="space-y-1">
                          <li>• Raised floor systems</li>
                          <li>• Conduit and EMT</li>
                          <li>• Surface raceway</li>
                          <li>• In-wall installation</li>
                          <li>• Access floor coordination</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Backbone Pathway Requirements</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Vertical Backbone Pathways</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Shaft Requirements:</strong></p>
                        <ul className="space-y-1">
                          <li>• Minimum 100mm × 300mm slot</li>
                          <li>• 75mm × 100mm per floor served</li>
                          <li>• Fire-rated construction</li>
                          <li>• Access at each floor</li>
                          <li>• Separate power/telecom shafts</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Installation Considerations:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cable support every 1.5m</li>
                          <li>• Pulling tension limitations</li>
                          <li>• Firestop penetrations</li>
                          <li>• Future expansion allowance</li>
                          <li>• Maintenance access provisions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Campus Backbone Pathways</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Underground Installation:</strong></p>
                        <ul className="space-y-1">
                          <li>• Direct buried cable rated</li>
                          <li>• Duct bank construction</li>
                          <li>• Minimum 600mm burial depth</li>
                          <li>• Warning tape 300mm above</li>
                          <li>• Manholes/handholes every 150m</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Aerial Installation:</strong></p>
                        <ul className="space-y-1">
                          <li>• Self-supporting cable</li>
                          <li>• Messenger wire systems</li>
                          <li>• Clearance requirements</li>
                          <li>• Weather protection</li>
                          <li>• Building entrance protocols</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-red-900/20 border-red-400">
            <Shield className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-100">
              <strong>Critical Safety Requirement:</strong> All pathway penetrations through fire-rated 
              walls, floors, or ceilings must maintain the fire rating using approved firestop materials 
              and methods. Failure to properly firestop can compromise building safety and void 
              insurance coverage.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-5 w-5 text-orange-400" />
                Campus Distribution Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Campus Topology and Architecture</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Star Topology Implementation</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Design Principles:</strong></p>
                        <ul className="space-y-1">
                          <li>• Central campus MC location</li>
                          <li>• Direct connection to each building</li>
                          <li>• No daisy-chaining between buildings</li>
                          <li>• Redundant paths for critical buildings</li>
                          <li>• Logical and physical star topology</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Scalability Factors:</strong></p>
                        <ul className="space-y-1">
                          <li>• Future building additions</li>
                          <li>• Bandwidth growth planning</li>
                          <li>• Technology migration paths</li>
                          <li>• Physical expansion capacity</li>
                          <li>• Equipment lifecycle planning</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Distance and Media Specifications</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Media Type</th>
                            <th className="text-left p-2 text-yellow-400">Maximum Distance</th>
                            <th className="text-left p-2 text-yellow-400">Typical Application</th>
                            <th className="text-left p-2 text-yellow-400">Installation Notes</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Cat 6 UTP</td>
                            <td className="p-2">90m</td>
                            <td className="p-2">Small campus only</td>
                            <td className="p-2">Not recommended</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">62.5/125 MM fibre</td>
                            <td className="p-2">300m (OM1)</td>
                            <td className="p-2">Legacy installations</td>
                            <td className="p-2">Being phased out</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">50/125 MM fibre</td>
                            <td className="p-2">550m (OM2/3)</td>
                            <td className="p-2">Current standard</td>
                            <td className="p-2">Good performance</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">9/125 SM fibre</td>
                            <td className="p-2">2000m+</td>
                            <td className="p-2">Large campus</td>
                            <td className="p-2">Future-proof choice</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Building Entrance Requirements</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Entrance Facility (EF) Design</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Physical Requirements:</strong></p>
                        <ul className="space-y-1">
                          <li>• Demarcation point for service providers</li>
                          <li>• Weather-protected cable entry</li>
                          <li>• Grounding and bonding connections</li>
                          <li>• Equipment mounting space</li>
                          <li>• Environmental protection</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Service Provider Interface:</strong></p>
                        <ul className="space-y-1">
                          <li>• Multiple provider accommodation</li>
                          <li>• Diverse route entry points</li>
                          <li>• Test access provisions</li>
                          <li>• Maintenance accessibility</li>
                          <li>• Security and monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Cable Transition and Protection</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Environmental Transitions:</strong></p>
                        <ul className="space-y-1">
                          <li>• Outdoor to indoor cable ratings</li>
                          <li>• Water and moisture sealing</li>
                          <li>• Rodent and pest protection</li>
                          <li>• UV protection for aerial cables</li>
                          <li>• Temperature cycling considerations</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Electrical Protection:</strong></p>
                        <ul className="space-y-1">
                          <li>• Primary electrical protection</li>
                          <li>• Secondary surge protection</li>
                          <li>• Grounding electrode connection</li>
                          <li>• Metallic sheath bonding</li>
                          <li>• Lightning protection systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Real-World Scenario: University Campus Expansion
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-card p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-2">Scenario:</h5>
                <p className="text-sm mb-4">
                  A major university is adding three new buildings to their campus: a 5-storey research 
                  facility, a 3-storey student centre, and a single-storey facilities building. The 
                  existing campus has 15 buildings connected via underground duct bank to a central 
                  data centre.
                </p>

                <div className="space-y-4">
                  <div>
                    <h6 className="text-white font-semibold mb-2">Design Challenges:</h6>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Research Facility:</strong></p>
                        <ul className="space-y-1">
                          <li>• High-density lab requirements</li>
                          <li>• Multiple TRs per floor needed</li>
                          <li>• Specialised equipment power/cooling</li>
                          <li>• Future expansion capability</li>
                          <li>• 10 Gbps minimum backbone</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Student Centre:</strong></p>
                        <ul className="space-y-1">
                          <li>• High user density (1000+ concurrent)</li>
                          <li>• Extensive wireless infrastructure</li>
                          <li>• PoE++ for high-power APs</li>
                          <li>• Public area monitoring</li>
                          <li>• Flexible space requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-white font-semibold mb-2">Solution Implementation:</h6>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Backbone Design:</strong></p>
                        <ul className="space-y-1">
                          <li>• Extend existing duct bank system</li>
                          <li>• 96-fibre singlemode to each building</li>
                          <li>• Redundant path for research facility</li>
                          <li>• 40 Gbps initial, 100 Gbps capable</li>
                          <li>• Ring topology for redundancy</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Building Infrastructure:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cat 6A horizontal throughout</li>
                          <li>• Multiple TRs per floor (research)</li>
                          <li>• Oversized pathways (50% spare)</li>
                          <li>• Enhanced HVAC for equipment rooms</li>
                          <li>• Integrated building management</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <p className="text-green-200 text-sm">
                      <strong>Result:</strong> The expansion successfully integrated with existing 
                      infrastructure while providing 20-year future capacity. The ring topology 
                      improved overall campus resilience, and the high-density design supports 
                      current research computing demands while allowing for emerging technologies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2 list-disc list-inside">
                <li>Structured cabling follows a hierarchical star topology from work area to campus backbone</li>
                <li>Telecommunications rooms require specific size, environmental, and safety standards</li>
                <li>Pathway sizing must consider cable type, fill ratios, and future expansion needs</li>
                <li>Campus backbone typically uses fibre optic media with distances up to 2000 metres</li>
                <li>Fire safety requirements include proper firestop materials and pathway fire ratings</li>
                <li>Building entrance facilities provide the critical transition between campus and building infrastructure</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quiz.map((q, index) => (
                <div key={index} className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">
                    Question {index + 1}: {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          optIndex === q.correct
                            ? 'bg-green-900/30 border border-green-500 text-green-200'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-blue-900/20 rounded border border-yellow-400">
                    <p className="text-blue-200 text-sm">
                      <strong>Answer:</strong> {String.fromCharCode(65 + q.correct)}. {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between pt-6">
            <Link to="../data-cabling-module-6-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Class D, E, EA, F Standards
              </Button>
            </Link>
            <Link to="../data-cabling-module-6-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next: Documentation Requirements
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule6Section3;