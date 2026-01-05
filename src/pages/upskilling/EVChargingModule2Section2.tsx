import { ArrowLeft, BookOpen, CheckCircle, Clock, Plug, Cable, Zap, Settings, Shield, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';
import { evModule1Section1Questions } from '@/data/upskilling/evChargingQuizzes';

const EVChargingModule2Section2 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12 max-w-6xl mx-auto">
        <Link to="../ev-charging-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header Section */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-400/10 rounded-lg">
                <Plug className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Socketed vs Tethered EVSE
                </h1>
                <p className="text-xl text-gray-400 mt-2">
                  EVSE connection types and applications
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                <Clock className="w-4 h-4 mr-1" />
                12 minutes
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                <BookOpen className="w-4 h-4 mr-1" />
                Intermediate
              </Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Distinguish between socketed and tethered EVSE configurations
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Understand the advantages and disadvantages of each system
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Identify appropriate applications for different EVSE types
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Evaluate cost, maintenance, and user experience factors
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">EVSE Connection Types Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                EVSE systems are categorised as socketed or tethered, affecting installation costs, user experience, 
                maintenance requirements, and long-term flexibility. This choice impacts the overall charging solution design.
              </p>
            </CardContent>
          </Card>

          {/* Socketed EVSE */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plug className="h-5 w-5 text-yellow-400" />
                Socketed EVSE Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">System Description</h4>
                  <p className="text-gray-300 text-sm">
                    Socketed EVSE provides a charging outlet (socket) into which the user plugs their own charging cable. 
                    The EVSE contains all control and safety systems but relies on the user to provide the cable connection 
                    between the charge point and their vehicle.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-white mt-6">Key Components</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Charging outlet (Type 2 socket typically)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Control and safety electronics
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      User interface (LED indicators/display)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Protective housing and mounting system
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Advantages</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Lower initial cost (no cable included)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Universal compatibility with all EVs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">No cable wear from weather exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Reduced vandalism risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Easier maintenance access</span>
                    </li>
                  </ul>
                  
                  <h4 className="text-lg font-semibold text-white mt-6">Disadvantages</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-300">Users must provide and carry cable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-300">Additional cost for users (cable purchase)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-300">Less convenient for casual users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-300">Potential for incompatible cables</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                <h5 className="text-blue-300 font-semibold mb-2">🔌 Common Socket Types</h5>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-blue-300">Type 2 (Mennekes)</div>
                    <div className="text-xs text-blue-200">European standard, 3-phase capable</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-blue-300">Type 1 (J1772)</div>
                    <div className="text-xs text-blue-200">North American, single-phase only</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-blue-300">CHAdeMO/CCS</div>
                    <div className="text-xs text-blue-200">DC rapid charging sockets</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tethered EVSE */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-5 w-5 text-yellow-400" />
                Tethered EVSE Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">System Description</h4>
                  <p className="text-gray-300 text-sm">
                    Tethered EVSE includes a permanently attached charging cable with vehicle connector. 
                    The cable is typically 5-8 metres long and includes all necessary control and safety 
                    conductors integrated within the cable assembly.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-white mt-6">Key Components</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Integrated charging cable (5-8m typical)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Vehicle connector (Type 2, Type 1, or CCS)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Cable management system (holster/retractor)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Integrated control and safety systems
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Advantages</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Maximum user convenience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">No additional cable purchase required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Always available for use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Ideal for public charging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Guaranteed cable compatibility</span>
                    </li>
                  </ul>
                  
                  <h4 className="text-lg font-semibold text-white mt-6">Disadvantages</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-300">Higher initial investment cost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-300">Cable exposed to weather and vandalism</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-300">Higher maintenance requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-300">Vehicle-specific connector type</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h5 className="text-green-300 font-semibold mb-2">🛡️ Cable Protection Features</h5>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h6 className="text-sm font-semibold text-green-300 mb-2">Weather Protection</h6>
                    <ul className="text-xs text-green-200 space-y-1">
                      <li>• UV-resistant cable jacket materials</li>
                      <li>• Water-resistant connector sealing</li>
                      <li>• Temperature-rated insulation systems</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-green-300 mb-2">Security Features</h6>
                    <ul className="text-xs text-green-200 space-y-1">
                      <li>• Integrated cable locking mechanisms</li>
                      <li>• Vandal-resistant housing design</li>
                      <li>• Theft deterrent cable attachment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Detailed Comparison Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-3 text-white font-semibold">Factor</th>
                      <th className="text-left p-3 text-white font-semibold">Socketed EVSE</th>
                      <th className="text-left p-3 text-white font-semibold">Tethered EVSE</th>
                      <th className="text-left p-3 text-white font-semibold">Impact</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-semibold text-white">Initial Cost</td>
                      <td className="p-3">
                        <span className="text-green-400">Lower (£400-800)</span>
                      </td>
                      <td className="p-3">
                        <span className="text-red-400">Higher (£600-1200)</span>
                      </td>
                      <td className="p-3 text-sm">£200-400 difference typical</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-semibold text-white">User Experience</td>
                      <td className="p-3">
                        <span className="text-yellow-400">Requires user cable</span>
                      </td>
                      <td className="p-3">
                        <span className="text-green-400">Plug and charge</span>
                      </td>
                      <td className="p-3 text-sm">Significant convenience factor</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-semibold text-white">Maintenance</td>
                      <td className="p-3">
                        <span className="text-green-400">Minimal</span>
                      </td>
                      <td className="p-3">
                        <span className="text-red-400">Regular cable inspection</span>
                      </td>
                      <td className="p-3 text-sm">Annual maintenance difference</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-semibold text-white">Compatibility</td>
                      <td className="p-3">
                        <span className="text-green-400">Universal</span>
                      </td>
                      <td className="p-3">
                        <span className="text-yellow-400">Connector specific</span>
                      </td>
                      <td className="p-3 text-sm">Future-proofing consideration</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-semibold text-white">Vandalism Risk</td>
                      <td className="p-3">
                        <span className="text-green-400">Lower</span>
                      </td>
                      <td className="p-3">
                        <span className="text-red-400">Higher</span>
                      </td>
                      <td className="p-3 text-sm">Location-dependent factor</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Installation</td>
                      <td className="p-3">
                        <span className="text-green-400">Simpler</span>
                      </td>
                      <td className="p-3">
                        <span className="text-yellow-400">Cable management required</span>
                      </td>
                      <td className="p-3 text-sm">Installation complexity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Application Scenarios */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Application Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Domestic Charging</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Socketed Preferred When:</div>
                      <ul className="text-xs text-gray-300 mt-1 space-y-1">
                        <li>• Multiple vehicle types in household</li>
                        <li>• Budget-conscious installation</li>
                        <li>• Secure garage environment</li>
                        <li>• Occasional charging needs</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Tethered Preferred When:</div>
                      <ul className="text-xs text-gray-300 mt-1 space-y-1">
                        <li>• Daily charging routine</li>
                        <li>• Maximum convenience required</li>
                        <li>• Single vehicle household</li>
                        <li>• Elderly or disabled users</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Workplace Charging</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Socketed Preferred When:</div>
                      <ul className="text-xs text-gray-300 mt-1 space-y-1">
                        <li>• Diverse vehicle fleet</li>
                        <li>• Lower installation budget</li>
                        <li>• Secure car park</li>
                        <li>• Future flexibility needed</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Tethered Preferred When:</div>
                      <ul className="text-xs text-gray-300 mt-1 space-y-1">
                        <li>• Visitor/guest charging</li>
                        <li>• High utilisation expected</li>
                        <li>• Fleet with uniform vehicles</li>
                        <li>• Minimal user training required</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Public Charging</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Socketed Rarely Used:</div>
                      <ul className="text-xs text-gray-300 mt-1 space-y-1">
                        <li>• Lower user convenience</li>
                        <li>• Cable availability issues</li>
                        <li>• Compatibility concerns</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Tethered Standard:</div>
                      <ul className="text-xs text-gray-300 mt-1 space-y-1">
                        <li>• Maximum accessibility</li>
                        <li>• Guaranteed functionality</li>
                        <li>• Commercial viability</li>
                        <li>• Rapid charging capability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Total Cost of Ownership Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-4">5-Year Cost Comparison</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-white mb-2">Socketed EVSE</div>
                      <div className="space-y-1 text-xs text-gray-300">
                        <div className="flex justify-between">
                          <span>Initial EVSE cost:</span>
                          <span>£600</span>
                        </div>
                        <div className="flex justify-between">
                          <span>User cable cost:</span>
                          <span>£200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Installation:</span>
                          <span>£300</span>
                        </div>
                        <div className="flex justify-between">
                          <span>5yr maintenance:</span>
                          <span>£100</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-600 pt-1 font-semibold text-yellow-400">
                          <span>Total:</span>
                          <span>£1,200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-4">&nbsp;</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-white mb-2">Tethered EVSE</div>
                      <div className="space-y-1 text-xs text-gray-300">
                        <div className="flex justify-between">
                          <span>Initial EVSE cost:</span>
                          <span>£900</span>
                        </div>
                        <div className="flex justify-between">
                          <span>User cable cost:</span>
                          <span>£0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Installation:</span>
                          <span>£350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>5yr maintenance:</span>
                          <span>£300</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-600 pt-1 font-semibold text-yellow-400">
                          <span>Total:</span>
                          <span>£1,550</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-4">
                <h5 className="text-yellow-300 font-semibold mb-2">💡 Cost Considerations</h5>
                <div className="text-yellow-200 text-sm space-y-1">
                  <p>• Tethered systems typically cost 20-30% more over 5 years</p>
                  <p>• Higher utilisation can justify tethered premium through convenience</p>
                  <p>• Cable replacement costs £150-300 for tethered systems</p>
                  <p>• Socketed systems offer better long-term value for low-usage scenarios</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Installation and Safety Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Socketed EVSE Installation</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Simpler mounting requirements
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      No cable management system needed
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Lower installation complexity
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Reduced space requirements
                    </li>
                  </ul>
                  
                  <h5 className="text-white font-semibold mt-4">Safety Requirements</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• RCD protection (Type A minimum)</li>
                    <li>• MCB rating appropriate to EVSE</li>
                    <li>• Earth fault loop impedance verification</li>
                    <li>• Socket contact resistance testing</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Tethered EVSE Installation</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      Cable management system required
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      Additional mounting considerations
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      Cable routing and protection
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      Greater space requirements
                    </li>
                  </ul>
                  
                  <h5 className="text-white font-semibold mt-4">Additional Safety Tests</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Cable insulation resistance</li>
                    <li>• Connector contact resistance</li>
                    <li>• Cable flexing and strain relief</li>
                    <li>• Temperature rise testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Future-Proofing and Technology Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Emerging Technologies</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Plug & Charge (ISO 15118) authentication</li>
                    <li>• Vehicle-to-Grid (V2G) capabilities</li>
                    <li>• Dynamic load management systems</li>
                    <li>• Automated cable management systems</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Market Trends</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Increasing power levels (up to 22kW domestic)</li>
                    <li>• Smart charging integration requirements</li>
                    <li>• Enhanced cybersecurity features</li>
                    <li>• Improved user interface designs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Installation Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Installation Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Socketed EVSE: Technical Details</h4>
                  
                  <div className="bg-[#404040] rounded p-4">
                    <h5 className="text-yellow-400 font-semibold mb-2">Socket Types and Specifications</h5>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex justify-between">
                        <span>Type 2 Socket (IEC 62196-2):</span>
                        <span>EU standard</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current rating:</span>
                        <span>16A/32A/63A options</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Voltage rating:</span>
                        <span>480V AC (line-line)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IP rating:</span>
                        <span>IP54 minimum</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Operating temperature:</span>
                        <span>-30°C to +50°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#404040] rounded p-4">
                    <h5 className="text-yellow-400 font-semibold mb-2">Installation Requirements</h5>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• Dedicated 30mA Type B RCD protection</li>
                      <li>• MCB sized to EVSE maximum current</li>
                      <li>• 1.5m minimum height from ground</li>
                      <li>• 0.5m minimum from property boundary</li>
                      <li>• Adequate IP rating for location</li>
                      <li>• Emergency isolation switch provision</li>
                    </ul>
                  </div>

                  <div className="bg-[#404040] rounded p-4">
                    <h5 className="text-yellow-400 font-semibold mb-2">Testing and Commissioning</h5>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• Socket contact resistance (&lt;2.5mΩ)</li>
                      <li>• Insulation resistance (&gt;1MΩ)</li>
                      <li>• Earth fault loop impedance verification</li>
                      <li>• RCD operation testing (×1, ×5 test)</li>
                      <li>• Control pilot signal verification</li>
                      <li>• Temperature rise testing under load</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Tethered EVSE: Technical Details</h4>
                  
                  <div className="bg-[#404040] rounded p-4">
                    <h5 className="text-yellow-400 font-semibold mb-2">Cable Specifications</h5>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex justify-between">
                        <span>Standard length:</span>
                        <span>5-8 metres</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conductor material:</span>
                        <span>Copper (Class 5 flexible)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insulation:</span>
                        <span>XLPE or EPR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outer sheath:</span>
                        <span>TPU (Thermoplastic Polyurethane)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bend radius:</span>
                        <span>5 × cable diameter</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#404040] rounded p-4">
                    <h5 className="text-yellow-400 font-semibold mb-2">Cable Management Systems</h5>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• Spring-loaded retractable reels</li>
                      <li>• Gravity-fed cable hangers</li>
                      <li>• Manual wind-up systems</li>
                      <li>• Motorised cable reels (commercial)</li>
                      <li>• Wall-mounted holster systems</li>
                      <li>• Floor-standing cable supports</li>
                    </ul>
                  </div>

                  <div className="bg-[#404040] rounded p-4">
                    <h5 className="text-yellow-400 font-semibold mb-2">Additional Testing Requirements</h5>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• Cable flexing test (10,000 cycles)</li>
                      <li>• Connector mating force testing</li>
                      <li>• Temperature rise under rated load</li>
                      <li>• Cable retention force testing</li>
                      <li>• Weather sealing verification</li>
                      <li>• Vandal resistance assessment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Analysis and Selection Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Market Analysis and Selection Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">UK Market Share (2024)</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Domestic Socketed:</span>
                      <span className="text-yellow-400">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domestic Tethered:</span>
                      <span className="text-green-400">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Public Socketed:</span>
                      <span className="text-red-400">5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Public Tethered:</span>
                      <span className="text-green-400">95%</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-400">
                    Source: Zapmap, ChargeUK, OLEV data
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Cost Trends (2020-2024)</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>
                      <span className="text-white">Socketed EVSE:</span>
                      <div className="text-xs">2020: £800 → 2024: £500</div>
                      <div className="text-green-400 text-xs">37% reduction</div>
                    </div>
                    <div>
                      <span className="text-white">Tethered EVSE:</span>
                      <div className="text-xs">2020: £1200 → 2024: £850</div>
                      <div className="text-green-400 text-xs">29% reduction</div>
                    </div>
                    <div>
                      <span className="text-white">Type 2 Cables:</span>
                      <div className="text-xs">2020: £300 → 2024: £180</div>
                      <div className="text-green-400 text-xs">40% reduction</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Reliability Statistics</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>
                      <span className="text-white">Socketed Failures:</span>
                      <div className="text-xs">Socket wear: 0.2% annually</div>
                      <div className="text-xs">Electronics: 1.5% annually</div>
                    </div>
                    <div>
                      <span className="text-white">Tethered Failures:</span>
                      <div className="text-xs">Cable damage: 2.8% annually</div>
                      <div className="text-xs">Connector wear: 1.2% annually</div>
                    </div>
                    <div className="text-yellow-400 text-xs mt-2">
                      Tethered systems: 3× higher maintenance
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Decision Matrix Tool</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2 text-white">Factor</th>
                        <th className="text-center p-2 text-white">Weight</th>
                        <th className="text-center p-2 text-white">Socketed Score</th>
                        <th className="text-center p-2 text-white">Tethered Score</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Initial Cost</td>
                        <td className="text-center p-2">20%</td>
                        <td className="text-center p-2 text-green-400">9/10</td>
                        <td className="text-center p-2 text-yellow-400">6/10</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">User Convenience</td>
                        <td className="text-center p-2">25%</td>
                        <td className="text-center p-2 text-yellow-400">6/10</td>
                        <td className="text-center p-2 text-green-400">9/10</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Maintenance Cost</td>
                        <td className="text-center p-2">15%</td>
                        <td className="text-center p-2 text-green-400">9/10</td>
                        <td className="text-center p-2 text-red-400">4/10</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Compatibility</td>
                        <td className="text-center p-2">20%</td>
                        <td className="text-center p-2 text-green-400">10/10</td>
                        <td className="text-center p-2 text-yellow-400">7/10</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Security/Vandalism</td>
                        <td className="text-center p-2">10%</td>
                        <td className="text-center p-2 text-green-400">8/10</td>
                        <td className="text-center p-2 text-red-400">4/10</td>
                      </tr>
                      <tr>
                        <td className="p-2">Future Flexibility</td>
                        <td className="text-center p-2">10%</td>
                        <td className="text-center p-2 text-green-400">9/10</td>
                        <td className="text-center p-2 text-yellow-400">6/10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                    <div className="text-green-300 font-semibold">Socketed Weighted Score: 8.1/10</div>
                    <div className="text-green-200 text-xs">Best for: Budget-conscious, multi-vehicle households</div>
                  </div>
                  <div className="bg-blue-900/20 border border-yellow-400/30 rounded p-3">
                    <div className="text-blue-300 font-semibold">Tethered Weighted Score: 7.2/10</div>
                    <div className="text-blue-200 text-xs">Best for: Convenience-focused, high-usage scenarios</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manufacturer-Specific Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Manufacturer-Specific EVSE Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Tesla Charging Ecosystem</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Supercharger Network (Tethered)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Proprietary connector (North America)</li>
                        <li>• Type 2 CCS in Europe</li>
                        <li>• Up to 250kW charging power</li>
                        <li>• Integrated payment system</li>
                        <li>• Pre-conditioning coordination</li>
                        <li>• Dynamic load sharing</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Wall Connector (Tethered)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• 7.4kW/11kW/22kW options</li>
                        <li>• WiFi connectivity standard</li>
                        <li>• Load sharing capability</li>
                        <li>• Tesla app integration</li>
                        <li>• Scheduled charging</li>
                        <li>• Usage monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Traditional OEM Approaches</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">BMW/MINI Charging</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Flexible charging cable (Mode 2)</li>
                        <li>• Wallbox Pure/Plus (socketed/tethered)</li>
                        <li>• ChargeNow network integration</li>
                        <li>• BMW ConnectedDrive app</li>
                        <li>• Intelligent charging features</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Volkswagen Group</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• ID.Charger range (socketed preferred)</li>
                        <li>• IONITY network partnership</li>
                        <li>• We Charge service integration</li>
                        <li>• MEB platform optimisation</li>
                        <li>• Bidirectional charging ready</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Nissan LEAF Ecosystem</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• CHAdeMO DC charging</li>
                        <li>• Vehicle-to-Home capability</li>
                        <li>• NissanConnect EV app</li>
                        <li>• Flexible home charging options</li>
                        <li>• Energy management integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Cable Technology */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Cable Technology and Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Conductor Technology</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-1">Copper Specifications</div>
                      <ul className="text-xs space-y-1">
                        <li>• Class 5 flexibility (IEC 60228)</li>
                        <li>• 99.9% purity minimum</li>
                        <li>• Tinned for corrosion resistance</li>
                        <li>• Optimal strand configuration</li>
                        <li>• Low resistance targets</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Current Carrying Capacity</div>
                      <ul className="text-xs space-y-1">
                        <li>• 16A: 2.5mm² minimum</li>
                        <li>• 32A: 6mm² standard</li>
                        <li>• 63A: 16mm² commercial</li>
                        <li>• Derating factors applied</li>
                        <li>• Temperature rise limits</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Insulation Systems</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-1">XLPE (Cross-linked Polyethylene)</div>
                      <ul className="text-xs space-y-1">
                        <li>• 90°C continuous rating</li>
                        <li>• Excellent dielectric properties</li>
                        <li>• Moisture resistance</li>
                        <li>• Chemical stability</li>
                        <li>• Cost-effective solution</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">EPR (Ethylene Propylene Rubber)</div>
                      <ul className="text-xs space-y-1">
                        <li>• Superior flexibility</li>
                        <li>• -40°C to +90°C range</li>
                        <li>• Ozone resistance</li>
                        <li>• UV stability</li>
                        <li>• Premium applications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Sheath Materials</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-1">TPU (Thermoplastic Polyurethane)</div>
                      <ul className="text-xs space-y-1">
                        <li>• Exceptional abrasion resistance</li>
                        <li>• High flexibility retention</li>
                        <li>• Oil and fuel resistance</li>
                        <li>• Tear resistance</li>
                        <li>• Recyclable material</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Halogen-Free Options</div>
                      <ul className="text-xs space-y-1">
                        <li>• LSZH (Low Smoke Zero Halogen)</li>
                        <li>• Environmental compliance</li>
                        <li>• Fire safety enhancement</li>
                        <li>• Indoor installation preferred</li>
                        <li>• Regulatory requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Intelligent Cable Features</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#404040] rounded p-4">
                    <h5 className="text-yellow-400 font-semibold mb-3">Temperature Monitoring</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>NTC thermistors:</span>
                        <span>10kΩ at 25°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sensing locations:</span>
                        <span>Connector + cable</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response time:</span>
                        <span>&lt;10 seconds</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span>±2°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protection level:</span>
                        <span>80°C shutdown</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#404040] rounded p-4">
                    <h5 className="text-yellow-400 font-semibold mb-3">Smart Diagnostics</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Insulation resistance monitoring</li>
                      <li>• Contact resistance measurement</li>
                      <li>• Flex cycle counting</li>
                      <li>• Thermal history logging</li>
                      <li>• Predictive maintenance alerts</li>
                      <li>• Usage pattern analysis</li>
                      <li>• Fault location identification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Environment Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Installation Environment Analysis and Adaptation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Environmental Factors</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Coastal Environments</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• High salt content atmosphere</li>
                        <li>• Accelerated corrosion rates</li>
                        <li>• IP65+ rating essential</li>
                        <li>• Stainless steel fixings required</li>
                        <li>• Regular maintenance intervals</li>
                        <li>• Socketed preferred for protection</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Urban Pollution</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Particulate matter accumulation</li>
                        <li>• Chemical contamination</li>
                        <li>• Ventilation requirements</li>
                        <li>• Filtration system benefits</li>
                        <li>• Regular cleaning protocols</li>
                        <li>• Material selection critical</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Extreme Temperatures</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• -30°C to +50°C operation</li>
                        <li>• Thermal cycling stress</li>
                        <li>• Expansion/contraction effects</li>
                        <li>• Heating/cooling requirements</li>
                        <li>• Insulation performance</li>
                        <li>• Component derating needed</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Security Considerations</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Vandalism Protection</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Hardened enclosure materials</li>
                        <li>• Tamper-resistant fixings</li>
                        <li>• Cable protection systems</li>
                        <li>• Security camera integration</li>
                        <li>• Motion detection alerts</li>
                        <li>• Insurance considerations</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Theft Prevention</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Cable locking mechanisms</li>
                        <li>• RFID/PIN access control</li>
                        <li>• GPS tracking systems</li>
                        <li>• Alarm integration</li>
                        <li>• Remote monitoring</li>
                        <li>• Socketed advantage in security</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Data Security</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Encrypted communication</li>
                        <li>• Secure authentication</li>
                        <li>• Regular security updates</li>
                        <li>• Network isolation</li>
                        <li>• GDPR compliance</li>
                        <li>• Cybersecurity frameworks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Economic Impact Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Economic Impact and Business Case Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Residential Economics</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-2">Property Value Impact</div>
                      <ul className="text-xs space-y-1">
                        <li>• 2-5% property value increase</li>
                        <li>• Faster sale times</li>
                        <li>• Future-proofing benefit</li>
                        <li>• Tethered systems more attractive</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Running Costs</div>
                      <ul className="text-xs space-y-1">
                        <li>• Off-peak electricity rates</li>
                        <li>• Solar PV integration savings</li>
                        <li>• Maintenance cost differences</li>
                        <li>• Insurance implications</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Grant Availability</div>
                      <ul className="text-xs space-y-1">
                        <li>• OZEV grant: £350 contribution</li>
                        <li>• Installation requirements</li>
                        <li>• Smart charging mandatory</li>
                        <li>• Approved installer network</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Commercial Viability</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-2">Revenue Models</div>
                      <ul className="text-xs space-y-1">
                        <li>• Pay-per-use charging</li>
                        <li>• Subscription services</li>
                        <li>• Employer benefit schemes</li>
                        <li>• Grid services revenue</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Operational Efficiency</div>
                      <ul className="text-xs space-y-1">
                        <li>• Utilisation rate targets</li>
                        <li>• Peak demand management</li>
                        <li>• Maintenance scheduling</li>
                        <li>• User experience impact</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Risk Factors</div>
                      <ul className="text-xs space-y-1">
                        <li>• Technology obsolescence</li>
                        <li>• Regulatory changes</li>
                        <li>• Competition intensity</li>
                        <li>• Infrastructure dependencies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Network Economics</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-2">Scale Benefits</div>
                      <ul className="text-xs space-y-1">
                        <li>• Bulk purchasing power</li>
                        <li>• Standardisation savings</li>
                        <li>• Maintenance optimisation</li>
                        <li>• Brand recognition value</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Grid Integration</div>
                      <ul className="text-xs space-y-1">
                        <li>• Demand response revenue</li>
                        <li>• Grid balancing services</li>
                        <li>• Energy arbitrage</li>
                        <li>• Infrastructure reinforcement</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Future Opportunities</div>
                      <ul className="text-xs space-y-1">
                        <li>• Vehicle-to-Grid services</li>
                        <li>• Energy storage integration</li>
                        <li>• Autonomous vehicle support</li>
                        <li>• Hydrogen infrastructure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Key Decision Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Choose Socketed When:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Budget is primary concern</li>
                    <li>• Multiple vehicle types expected</li>
                    <li>• Low to moderate usage anticipated</li>
                    <li>• Future flexibility important</li>
                    <li>• Secure installation environment</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Choose Tethered When:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• User convenience is priority</li>
                    <li>• High utilisation expected</li>
                    <li>• Public or commercial installation</li>
                    <li>• Single vehicle type predominant</li>
                    <li>• Premium user experience required</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Check */}
          <div className="mt-12">
            <Quiz 
              questions={evModule1Section1Questions}
              title="Socketed vs Tethered EVSE - Knowledge Check"
              description="Test your understanding of EVSE connection types and their applications"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingModule2Section2;