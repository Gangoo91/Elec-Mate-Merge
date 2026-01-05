import { ArrowLeft, ArrowRight, Link2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { useMemo } from 'react';

const FireAlarmModule7Section3 = () => {
  // Quiz Data
  const questions = useMemo(() => [
    {
      id: 1,
      question: "What is the maximum time for emergency lighting to activate automatically following a fire alarm signal?",
      options: [
        "1 second",
        "3 seconds", 
        "5 seconds",
        "10 seconds"
      ],
      correct: 2,
      explanation: "BS 5266-1 requires emergency lighting to activate within 5 seconds of receiving a fire alarm signal to ensure adequate illumination for safe evacuation."
    },
    {
      id: 2,
      question: "In gaseous suppression systems, what is the minimum pre-discharge warning time required before agent release?",
      options: [
        "10 seconds",
        "20 seconds",
        "30 seconds", 
        "60 seconds"
      ],
      correct: 2,
      explanation: "BS ISO 14520 requires a minimum 30-second pre-discharge warning to allow personnel to evacuate the protected area before gas agent release."
    },
    {
      id: 3,
      question: "Which type of detection is typically required for gaseous suppression system activation?",
      options: [
        "Single detector activation",
        "Cross-zone detection from two different detectors",
        "Manual activation only",
        "Three detector confirmation"
      ],
      correct: 1,
      explanation: "Cross-zone detection requiring activation from two different detectors is standard practice to prevent accidental discharge of expensive gaseous suppression agents."
    },
    {
      id: 4,
      question: "What is the primary purpose of HVAC shutdown upon fire alarm activation?",
      options: [
        "Save energy during emergency",
        "Prevent smoke spread through ductwork",
        "Reduce noise for evacuation",
        "Protect equipment from damage"
      ],
      correct: 1,
      explanation: "HVAC shutdown prevents smoke from being distributed throughout the building via air handling systems, maintaining tenable conditions in escape routes."
    },
    {
      id: 5,
      question: "What is the maximum response time for access control doors to unlock upon fire alarm activation?",
      options: [
        "1 second",
        "3 seconds",
        "5 seconds",
        "10 seconds"
      ],
      correct: 1,
      explanation: "Access control doors must unlock within 3 seconds of fire alarm activation to ensure rapid egress without impediment during emergency evacuation."
    }
  ], []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Link2 className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Interface with Emergency Lighting and Suppression
                </h1>
                <p className="text-xl text-gray-400">
                  Integration with other fire safety systems
                </p>
              </div>
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
            <CardContent className="text-gray-300 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Understand fire alarm and emergency lighting integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Learn suppression system interface requirements</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Identify cause and effect programming needs</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Understand system coordination and timing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Learn about HVAC and access control integration</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Lighting Integration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Emergency Lighting Integration and Control</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Emergency lighting systems must integrate seamlessly with fire alarm systems to ensure coordinated 
                operation during emergency conditions, providing safe egress routes for building occupants.
              </p>
              <div className="space-y-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Integration Methods and Standards:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Hard-wired Control:</strong> Direct connection from fire panel output</li>
                      <li><strong>Monitored Output:</strong> Supervised control circuit with fault monitoring</li>
                      <li><strong>Network Interface:</strong> Digital communication over field bus</li>
                      <li><strong>Mains Failure Detection:</strong> Automatic activation on power loss</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Zone Coordination:</strong> Area-specific lighting control</li>
                      <li><strong>Timed Sequences:</strong> Phased activation for orderly evacuation</li>
                      <li><strong>Manual Override:</strong> Local control capability maintained</li>
                      <li><strong>Test Integration:</strong> Coordinated testing with fire system</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">BS 5266-1 Compliance Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Automatic activation within 5 seconds of fire alarm</li>
                      <li>Independent battery power supply for 3-hour duration</li>
                      <li>Minimum 1 lux illumination on escape routes</li>
                      <li>Monthly functional testing and annual full duration tests</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Self-test facilities with fault indication</li>
                      <li>Central monitoring and reporting capability</li>
                      <li>Maintained or non-maintained operation modes</li>
                      <li>High-risk task area illumination provisions</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Advanced Control Functions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Intelligent switching between emergency and normal modes</li>
                    <li>Remote monitoring of battery condition and lamp status</li>
                    <li>Automatic testing schedules with result logging</li>
                    <li>Integration with building management systems (BMS)</li>
                    <li>Dynamic exit sign direction control</li>
                    <li>Voice evacuation system coordination</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fire Suppression Systems Comprehensive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Fire Suppression System Interface and Control</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Sprinkler System Integration (BS EN 12845):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Flow Switches:</strong> Monitor water flow and provide immediate alarm</li>
                      <li><strong>Pressure Switches:</strong> Detect system integrity and operational status</li>
                      <li><strong>Valve Tamper Switches:</strong> Monitor critical valve positions</li>
                      <li><strong>Pre-action Control:</strong> Two-stage detection for protected areas</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Pump Control:</strong> Auto-start fire pumps on system demand</li>
                      <li><strong>Zone Isolation:</strong> Sectional valve control capability</li>
                      <li><strong>Supervisory Monitoring:</strong> 24/7 system health monitoring</li>
                      <li><strong>Remote Transmission:</strong> Alert fire brigade and monitoring centre</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-md p-4">
                  <h4 className="text-orange-400 font-semibold mb-2">Gaseous Suppression Systems (BS ISO 14520):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Cross-zone Detection:</strong> Two detectors required for discharge</li>
                      <li><strong>Pre-discharge Warning:</strong> 30-second evacuation warning minimum</li>
                      <li><strong>Abort Switches:</strong> Manual discharge prevention capability</li>
                      <li><strong>Room Integrity:</strong> Pressure monitoring and leakage detection</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Discharge Monitoring:</strong> Confirm agent release occurred</li>
                      <li><strong>Environmental Controls:</strong> HVAC shutdown and damper closure</li>
                      <li><strong>Personnel Safety:</strong> Access control and breathing apparatus</li>
                      <li><strong>Post-discharge:</strong> Ventilation control and safe re-entry</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Foam and Water Mist Systems:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Deluge valve control and monitoring for rapid response</li>
                    <li>Foam concentrate level monitoring and low-level alarms</li>
                    <li>Water mist nozzle pressure monitoring and blockage detection</li>
                    <li>Integration with vehicle detection in car parks</li>
                    <li>Oil/fuel fire detection and specialised response protocols</li>
                    <li>Coordination with foam/water spray curtains</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cause and Effect Programming Detailed */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Cause and Effect Programming</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Sophisticated cause and effect matrices define complex system interactions, ensuring coordinated 
                response across all building safety systems during fire emergencies.
              </p>
              <div className="space-y-4">
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Advanced Input Processing:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Multi-sensor Confirmation:</strong> Cross-zone verification required</li>
                      <li><strong>Time Delays:</strong> Graduated response based on confirmation time</li>
                      <li><strong>Priority Algorithms:</strong> Critical area response takes precedence</li>
                      <li><strong>Manual Override:</strong> Authorised personnel intervention capability</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Fault Tolerance:</strong> System operation during component failures</li>
                      <li><strong>Seasonal Adjustment:</strong> Environmental compensation algorithms</li>
                      <li><strong>Maintenance Mode:</strong> Controlled testing without full activation</li>
                      <li><strong>Event Logging:</strong> Comprehensive audit trail of all activities</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Complex Output Sequencing:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-green-500/20">
                          <th className="text-left p-2">Stage</th>
                          <th className="text-left p-2">Time Delay</th>
                          <th className="text-left p-2">Actions</th>
                          <th className="text-left p-2">Monitoring</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-green-500/10">
                          <td className="p-2">Stage 1</td>
                          <td className="p-2">0 seconds</td>
                          <td className="p-2">Local sounders, emergency lighting</td>
                          <td className="p-2">Zone confirmation</td>
                        </tr>
                        <tr className="border-b border-green-500/10">
                          <td className="p-2">Stage 2</td>
                          <td className="p-2">30 seconds</td>
                          <td className="p-2">General alarm, HVAC shutdown</td>
                          <td className="p-2">Evacuation progress</td>
                        </tr>
                        <tr className="border-b border-green-500/10">
                          <td className="p-2">Stage 3</td>
                          <td className="p-2">2 minutes</td>
                          <td className="p-2">Suppression pre-warning</td>
                          <td className="p-2">Area clearance</td>
                        </tr>
                        <tr>
                          <td className="p-2">Stage 4</td>
                          <td className="p-2">5 minutes</td>
                          <td className="p-2">Suppression activation</td>
                          <td className="p-2">System effectiveness</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Intelligent Building Integration:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Real-time occupancy monitoring for targeted evacuation</li>
                    <li>Weather condition adjustment for smoke extract systems</li>
                    <li>Power management during emergency conditions</li>
                    <li>Communication system integration for coordination</li>
                    <li>Post-incident analysis and system optimisation</li>
                    <li>Predictive maintenance based on performance data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* HVAC Integration Comprehensive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">HVAC System Integration and Smoke Control</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Air Handling Unit Control (BS EN 12101):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Supply Fan Shutdown:</strong> Prevent smoke spread through supply systems</li>
                      <li><strong>Extract Fan Control:</strong> Coordinated operation with smoke extraction</li>
                      <li><strong>Damper Positioning:</strong> Fire/smoke dampers close automatically</li>
                      <li><strong>Fresh Air Control:</strong> Outside air intake management</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Recirculation Prevention:</strong> Stop air recirculation systems</li>
                      <li><strong>Pressure Control:</strong> Maintain pressure differentials</li>
                      <li><strong>Energy Recovery:</strong> Heat recovery system shutdown</li>
                      <li><strong>Filter Bypass:</strong> Reduce system resistance during emergency</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Smoke Control Systems (BS EN 12101 Series):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Natural Smoke Extraction:</strong> Automatic opening vents (AOVs)</li>
                      <li><strong>Mechanical Extraction:</strong> Powered smoke extract fans</li>
                      <li><strong>Stairwell Pressurisation:</strong> Positive pressure in escape routes</li>
                      <li><strong>Smoke Curtains:</strong> Barrier deployment to contain smoke</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Make-up Air Supply:</strong> Controlled air replacement</li>
                      <li><strong>Atrium Smoke Control:</strong> Large volume space management</li>
                      <li><strong>Car Park Ventilation:</strong> CO and fire gas extraction</li>
                      <li><strong>Tunnel Ventilation:</strong> Longitudinal airflow control</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-md p-4">
                  <h4 className="text-orange-400 font-semibold mb-2">Advanced Control Strategies:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Weather compensation for wind effects on natural ventilation</li>
                    <li>Stack effect calculation and automatic adjustment</li>
                    <li>Multi-zone coordination for large complex buildings</li>
                    <li>Integration with CFD modelling for optimised airflow</li>
                    <li>Real-time smoke detection feedback control</li>
                    <li>Post-fire ventilation for safe re-entry procedures</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access Control and Security Comprehensive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Access Control and Security System Integration</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Electronic Door Control Systems:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Electromagnetic Locks:</strong> Immediate release on fire alarm</li>
                      <li><strong>Electric Strikes:</strong> Fail-safe operation for emergency egress</li>
                      <li><strong>Magnetic Hold-open:</strong> Fire door release for smoke control</li>
                      <li><strong>Turnstiles/Gates:</strong> Free-access mode activation</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Card Readers:</strong> Override security during evacuation</li>
                      <li><strong>Biometric Systems:</strong> Emergency bypass procedures</li>
                      <li><strong>Revolving Doors:</strong> Emergency stop and egress mode</li>
                      <li><strong>Vehicle Barriers:</strong> Emergency services access</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Critical Safety Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Fail-Safe Design:</strong> Doors unlock on power failure</li>
                      <li><strong>Manual Override:</strong> Local release mechanism always available</li>
                      <li><strong>Emergency Power:</strong> Battery backup for critical systems</li>
                      <li><strong>Response Time:</strong> Maximum 3-second release delay</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Visual Indication:</strong> Clear door status displays</li>
                      <li><strong>Audible Warning:</strong> Door release notification</li>
                      <li><strong>Monitoring Capability:</strong> Central security system integration</li>
                      <li><strong>Test Procedures:</strong> Regular functional verification</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-amber-600/10 border border-amber-600/20 rounded-md p-4">
                  <h4 className="text-amber-400 font-semibold mb-2">Advanced Integration Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Intelligent evacuation routing based on real-time conditions</li>
                    <li>Personnel tracking for accountability during emergencies</li>
                    <li>Integration with lift control for emergency service access</li>
                    <li>CCTV system coordination for evacuation monitoring</li>
                    <li>Public address system integration for clear instructions</li>
                    <li>Mobile device integration for remote monitoring and control</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={questions} 
            title="Test Your Knowledge: System Integration" 
          />

          <div className="flex justify-between">
            <Link to="../fire-alarm-module-7-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-7-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default FireAlarmModule7Section3;