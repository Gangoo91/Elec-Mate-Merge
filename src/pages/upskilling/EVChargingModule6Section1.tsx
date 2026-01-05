import { ArrowLeft, ArrowRight, Shield, CheckCircle, Users, Lightbulb, HelpCircle, Settings, BookOpen, Target, AlertTriangle, Zap, Eye, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule6Section1Quiz } from '@/components/upskilling/quiz/EVChargingModule6Section1Quiz';

const EVChargingModule6Section1 = () => {
  useEffect(() => {
    document.title = 'Safe Installation: Isolation and Site Prep - EV Charging Module 6 Section 1';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master safe installation practices for EV charging systems. Learn isolation procedures, site preparation, and safety protocols according to BS 7671.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Safe Installation: Isolation and Site Prep
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Safety procedures and site preparation for professional EV charging installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Safe installation practices are paramount in EV charging installations. This section covers the critical 
                safety procedures, isolation requirements, and site preparation necessary to ensure the safety of 
                installers, property owners, and end users. Compliance with BS 7671, HSE guidelines, and industry 
                best practices forms the foundation of professional EV charging installations.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Key Safety Priorities</h4>
                <ul className="text-sm space-y-1">
                  <li>• Protection from electrical shock and burns</li>
                  <li>• Prevention of fire and arc flash incidents</li>
                  <li>• Proper isolation and proving dead procedures</li>
                  <li>• Site risk assessment and hazard mitigation</li>
                  <li>• Personal protective equipment compliance</li>
                  <li>• Emergency procedures and first aid protocols</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="space-y-3">
                {[
                  "Conduct comprehensive site risk assessments for EV charging installations",
                  "Implement proper electrical isolation and proving dead procedures",
                  "Select and use appropriate personal protective equipment",
                  "Establish safe working practices and permit-to-work systems",
                  "Identify and mitigate electrical and mechanical hazards",
                  "Apply emergency procedures and incident response protocols",
                  "Comply with BS 7671 and HSE safety requirements",
                  "Prepare installation sites for safe and efficient working"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content/Learning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Safe Installation Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* Site Risk Assessment */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Site Risk Assessment and Planning</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Comprehensive Pre-Installation Survey</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Electrical Infrastructure Assessment</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Existing installation condition and age</li>
                          <li>• Consumer unit type and available ways</li>
                          <li>• Main earthing terminal accessibility</li>
                          <li>• Equipotential bonding arrangements</li>
                          <li>• Supply characteristics (TN-S, TN-C-S, TT)</li>
                          <li>• Available fault current and diversity</li>
                          <li>• Solar PV or battery storage presence</li>
                          <li>• Smart meter compatibility assessment</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Physical Environment Factors</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Ground conditions and soil type</li>
                          <li>• Drainage and water ingress risks</li>
                          <li>• Underground services location</li>
                          <li>• Tree roots and landscaping impact</li>
                          <li>• Vehicle access and manoeuvring space</li>
                          <li>• Height restrictions and overhead lines</li>
                          <li>• Weather exposure and wind loading</li>
                          <li>• Vandalism and security considerations</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Regulatory and Planning Constraints</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Building regulations compliance</li>
                          <li>• Planning permission requirements</li>
                          <li>• Conservation area restrictions</li>
                          <li>• Highway authority permissions</li>
                          <li>• Landlord and freeholder consents</li>
                          <li>• Insurance and warranty implications</li>
                          <li>• Data protection and smart charging</li>
                          <li>• Future expansion capabilities</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Detailed Risk Assessment Matrix</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Hazard Category</th>
                            <th className="text-left p-2 text-yellow-400">Risk Level</th>
                            <th className="text-left p-2 text-yellow-400">Probability</th>
                            <th className="text-left p-2 text-yellow-400">Impact</th>
                            <th className="text-left p-2 text-yellow-400">Mitigation Measures</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Electrical shock</td>
                            <td className="p-2 text-red-400">High</td>
                            <td className="p-2">Medium</td>
                            <td className="p-2">Fatal</td>
                            <td className="p-2">Isolation, testing, PPE, training</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Arc flash</td>
                            <td className="p-2 text-red-400">High</td>
                            <td className="p-2">Low</td>
                            <td className="p-2">Severe burns</td>
                            <td className="p-2">Arc flash PPE, energy analysis</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Underground services</td>
                            <td className="p-2 text-yellow-400">Medium</td>
                            <td className="p-2">Medium</td>
                            <td className="p-2">Service damage</td>
                            <td className="p-2">CAT scanning, safe digging</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Falls from height</td>
                            <td className="p-2 text-yellow-400">Medium</td>
                            <td className="p-2">Low</td>
                            <td className="p-2">Major injury</td>
                            <td className="p-2">Working at height equipment</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Manual handling</td>
                            <td className="p-2 text-green-400">Low</td>
                            <td className="p-2">Medium</td>
                            <td className="p-2">Minor injury</td>
                            <td className="p-2">Mechanical aids, team lifting</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-200 mb-3">RIDDOR and Incident Management</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium mb-2">Reportable Incidents Include:</p>
                        <ul className="space-y-1">
                          <li>• Death or major injury to any person</li>
                          <li>• Over 7-day injury to employees</li>
                          <li>• Dangerous occurrences (arc flash, explosion)</li>
                          <li>• Occupational diseases</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium mb-2">Incident Response Protocol:</p>
                        <ul className="space-y-1">
                          <li>• Immediate emergency response</li>
                          <li>• Scene preservation and investigation</li>
                          <li>• HSE notification within 10 days</li>
                          <li>• Root cause analysis and prevention</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Method Statements and Risk Control</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Safe System of Work</h5>
                        <p className="text-sm">Documented procedures covering each phase of installation from arrival on site to completion testing. Include emergency procedures, communication protocols, and quality checkpoints.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Permit to Work Systems</h5>
                        <p className="text-sm">Formal authorisation for high-risk activities including excavation, work near overhead lines, and entry to confined spaces. Clear responsibility allocation and sign-off procedures.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Dynamic Risk Assessment</h5>
                        <p className="text-sm">Continuous assessment of changing conditions throughout installation. Authority to stop work if new hazards emerge. Regular safety briefings and tool box talks.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-200 mb-2">Critical Safety Alert: Arc Flash Protection</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Arc Flash Boundary Calculation:</p>
                        <p>Use IEEE 1584 or simplified tables. Typical domestic installation: 1.2m boundary for 100A supply. Commercial installations require detailed analysis.</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">PPE Categories:</p>
                        <p>Category 1: 4 cal/cm² (cotton clothing)<br/>
                        Category 2: 8 cal/cm² (arc-rated clothing)<br/>
                        Category 3: 25 cal/cm² (arc flash suits)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Electrical Isolation Procedures */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Electrical Isolation Procedures</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Safe Isolation Sequence (BS 7671)</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <p className="font-medium text-white">Identify the Circuit</p>
                          <p className="text-sm text-gray-400">Confirm the correct circuit using circuit schedules and testing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <p className="font-medium text-white">Switch Off and Isolate</p>
                          <p className="text-sm text-gray-400">Use suitable isolation device with visible break contact</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <p className="font-medium text-white">Secure the Isolation</p>
                          <p className="text-sm text-gray-400">Lock off and tag the isolation point</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <p className="font-medium text-white">Test Equipment</p>
                          <p className="text-sm text-gray-400">Verify voltage indicator on known live source</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                        <div>
                          <p className="font-medium text-white">Test for Dead</p>
                          <p className="text-sm text-gray-400">Test all conductors against earth and each other</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                        <div>
                          <p className="font-medium text-white">Re-test Equipment</p>
                          <p className="text-sm text-gray-400">Verify voltage indicator still functions correctly</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Approved Test Equipment</h4>
                      <ul className="text-sm space-y-1">
                        <li>• GS38 compliant voltage indicators</li>
                        <li>• Calibrated and in-date equipment</li>
                        <li>• CAT III rated instruments minimum</li>
                        <li>• Two-pole voltage testers</li>
                        <li>• Lock-off devices and warning signs</li>
                        <li>• Insulated tools and barriers</li>
                      </ul>
                    </div>
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Lock-Off Procedures</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Use unique keyed padlocks</li>
                        <li>• Attach danger tags with details</li>
                        <li>• Record isolation in permit/logbook</li>
                        <li>• Communicate with all personnel</li>
                        <li>• Test isolation effectiveness</li>
                        <li>• Maintain keys in secure location</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Protective Equipment */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Personal Protective Equipment</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Mandatory PPE for EV Installations</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Head Protection</h5>
                        <p className="text-xs">Hard hat to EN 397, suitable for electrical work environments</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Eye Protection</h5>
                        <p className="text-xs">Safety glasses to EN 166, side protection recommended</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Electrical Safety Footwear</h5>
                        <p className="text-xs">Class 0 electrical hazard boots, 18kV dielectric protection</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Additional PPE Considerations</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Hand Protection</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Class 0 insulating gloves (1kV rating)</li>
                          <li>• Leather protector gloves over insulating gloves</li>
                          <li>• Cut Level 5 gloves for cable handling</li>
                          <li>• Leather protector gloves over insulating gloves</li>
                          <li>• Regular inspection and testing required</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Arc Flash Protection</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Arc-rated clothing for live work</li>
                          <li>• Face shields with arc rating</li>
                          <li>• Natural fibre clothing underneath</li>
                          <li>• No synthetic materials near arc hazards</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-200 mb-2">PPE Inspection Requirements</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Daily Checks:</p>
                        <p>Visual inspection before use, check for damage, cleanliness, and expiry dates</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Formal Testing:</p>
                        <p>Electrical gloves tested every 6 months, hard hats replaced every 5 years</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Site Preparation */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Site Preparation and Setup</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Work Area Establishment</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Safety Barriers and Signage</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Establish exclusion zones around work area</li>
                          <li>• Warning signs for electrical danger</li>
                          <li>• Traffic management for roadside work</li>
                          <li>• Protect public from falling objects</li>
                          <li>• Emergency access routes maintained</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Tool and Equipment Setup</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Secure storage for tools and materials</li>
                          <li>• Weather protection for equipment</li>
                          <li>• Temporary electrical supplies with RCD</li>
                          <li>• First aid kit and emergency contacts</li>
                          <li>• Communication systems (mobile/radio)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Underground Services Detection</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Service Detection Procedure</h5>
                        <ol className="text-sm space-y-1 list-decimal list-inside">
                          <li>Obtain service records from utility companies</li>
                          <li>Use CAT scanner to detect live cables</li>
                          <li>Mark detected services with spray paint</li>
                          <li>Hand dig trial holes to confirm positions</li>
                          <li>Maintain safe working distances from services</li>
                        </ol>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Safe Digging Distances</h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <p><span className="text-yellow-400">Gas pipes:</span> 500mm minimum</p>
                          <p><span className="text-yellow-400">Water mains:</span> 300mm minimum</p>
                          <p><span className="text-yellow-400">Electricity cables:</span> 500mm minimum</p>
                          <p><span className="text-yellow-400">Telecoms:</span> 200mm minimum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Pre-Work Safety Checklist</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">✓ Documentation Complete</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Risk assessment signed off</li>
                      <li>• Method statement approved</li>
                      <li>• Permits to work issued</li>
                      <li>• Insurance and competency verified</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">✓ Safety Measures in Place</h5>
                    <ul className="text-sm space-y-1">
                      <li>• PPE inspected and worn correctly</li>
                      <li>• Isolation completed and tested</li>
                      <li>• Emergency procedures briefed</li>
                      <li>• Work area secured and signed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Examples */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Construction className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real World Examples</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card/80 p-5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Example 1: Domestic Driveway Installation</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Site Challenges:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Working near busy road</li>
                        <li>• Underground services unknown</li>
                        <li>• Customer's car needs moving</li>
                        <li>• Weather: light rain</li>
                      </ul>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Safety Measures Implemented:</p>
                      <ul className="text-sm space-y-1">
                        <li>• High-vis clothing and signage</li>
                        <li>• CAT scanning and hand digging</li>
                        <li>• Customer liaison for vehicle access</li>
                        <li>• Weather protection for electrical work</li>
                      </ul>
                    </div>
                    <div className="bg-green-800/30 p-3 rounded">
                      <p className="text-green-200 font-medium text-sm">Outcome:</p>
                      <p className="text-sm">Safe installation completed without incidents. Gas service pipe located 400mm from proposed cable route - installation path adjusted accordingly.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Example 2: Commercial Car Park Installation</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Site Challenges:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 24/7 operating car park</li>
                        <li>• Multiple underground services</li>
                        <li>• High voltage switchgear nearby</li>
                        <li>• Public access restrictions required</li>
                      </ul>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Safety Protocol:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Night shift working (2am-6am)</li>
                        <li>• Exclusion zone with barriers</li>
                        <li>• Banksman for vehicle movements</li>
                        <li>• HV competent person supervision</li>
                      </ul>
                    </div>
                    <div className="bg-blue-800/30 p-3 rounded">
                      <p className="text-blue-200 font-medium text-sm">Lesson Learned:</p>
                      <p className="text-sm">Early coordination with facility management crucial. Underground fibre optic cables discovered - required specialist jointing after accidental damage.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-600 p-5 rounded-lg">
                <h4 className="font-semibold text-red-200 mb-3">Case Study: Near-Miss Incident Analysis</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Incident:</p>
                    <p className="text-sm">Installer received electric shock when testing supply voltage without proper PPE during wet conditions.</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Root Causes:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Inadequate PPE selection</li>
                      <li>• Poor weather risk assessment</li>
                      <li>• Non-compliant test equipment</li>
                      <li>• Rushed work schedule</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Preventive Actions:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Mandatory pre-work toolbox talks</li>
                      <li>• Weather-specific PPE requirements</li>
                      <li>• Equipment calibration checks</li>
                      <li>• "Stop work" authority for safety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  question: "What should I do if I cannot achieve a safe isolation?",
                  answer: "Stop work immediately and consult with a competent person. Live working requires special procedures, permits, and additional PPE. Consider alternative isolation methods or postponing work until safe isolation can be achieved."
                },
                {
                  question: "How often should PPE be inspected and replaced?",
                  answer: "Visual inspection before each use is mandatory. Formal inspections: insulating gloves every 6 months, hard hats every 12 months or after impact, safety boots when showing wear. Replace immediately if any defects found."
                },
                {
                  question: "Who can authorise live working on EV charging installations?",
                  answer: "Only competent persons with appropriate training and experience. Most EV charging work should be done dead. Live working requires risk assessment, permits, enhanced PPE, and often two-person working."
                },
                {
                  question: "What if underground services are found where I need to install?",
                  answer: "Stop excavation immediately. Contact service owner to confirm exact position and depth. Maintain safe distances or use alternative routing. Never proceed without proper clearance."
                },
                {
                  question: "How do I handle customer safety during installation?",
                  answer: "Brief customers on safety requirements, establish exclusion zones, provide clear information about work progress. Ensure they understand when areas are safe to access and emergency procedures."
                },
                {
                  question: "What documentation is required before starting work?",
                  answer: "Risk assessment, method statement, permits to work (if required), proof of competency, insurance certificates, customer agreements, and emergency contact details."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-green-900/20 border-green-600 border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-200">Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-200 mb-3">Key Safety Principles</h4>
                  <ul className="space-y-2 text-sm text-green-100">
                    <li>• Comprehensive risk assessment is the foundation of safe working</li>
                    <li>• Proper electrical isolation and proving dead is non-negotiable</li>
                    <li>• Appropriate PPE must be worn and regularly inspected</li>
                    <li>• Emergency procedures must be planned and communicated</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-200 mb-3">Site Preparation Essentials</h4>
                  <ul className="space-y-2 text-sm text-green-100">
                    <li>• Underground service detection prevents costly and dangerous incidents</li>
                    <li>• Work area security protects both workers and the public</li>
                    <li>• Weather conditions must be considered in planning</li>
                    <li>• Communication and coordination ensure smooth operations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz */}
          <EVChargingModule6Section1Quiz />
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <Link to="../ev-charging-module-6">
            <Button 
              variant="outline" 
              className="bg-card border-gray-600 text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module 6
            </Button>
          </Link>
          <Link to="../ev-charging-module-6-section-2">
            <Button 
              variant="outline" 
              className="bg-card border-gray-600 text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200"
            >
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule6Section1;