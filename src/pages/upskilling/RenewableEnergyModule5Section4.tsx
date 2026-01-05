import { ArrowLeft, ArrowRight, Wifi, Shield, Gauge, AlertTriangle, Settings, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule5Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is islanding and why is it a risk?",
      options: [
        "When panels are isolated from each other",
        "When the inverter continues to energise a dead grid section",
        "When batteries become disconnected",
        "When export is limited by the inverter"
      ],
      correct: 1,
      explanation: "Islanding occurs when an inverter continues to energise a section of the grid that has been isolated by the utility, creating a safety hazard for utility workers and equipment."
    },
    {
      id: 2,
      question: "What does anti-islanding protection do?",
      options: [
        "Prevents battery overcharging",
        "Automatically shuts down the inverter when grid power is lost",
        "Limits power export to the grid",
        "Synchronises multiple inverters"
      ],
      correct: 1,
      explanation: "Anti-islanding protection detects grid failure and immediately shuts down the inverter to prevent energising dead grid sections, protecting utility workers and equipment."
    },
    {
      id: 3,
      question: "What's the function of export limiters?",
      options: [
        "To increase system efficiency",
        "To prevent grid overloading and voltage rise",
        "To reduce installation costs",
        "To improve power quality"
      ],
      correct: 1,
      explanation: "Export limiters prevent the solar system from exporting more power than the grid connection can handle, avoiding voltage rise and potential grid instability."
    },
    {
      id: 4,
      question: "What's a G100 relay used for?",
      options: [
        "Synchronising with grid frequency",
        "Protection and isolation in larger installations",
        "Measuring export power",
        "Controlling battery charging"
      ],
      correct: 1,
      explanation: "G100 relays provide protection and isolation functions for larger solar installations, monitoring grid parameters and disconnecting the system when necessary."
    },
    {
      id: 5,
      question: "Why is grid synchronisation necessary?",
      options: [
        "To reduce installation costs",
        "To ensure safe and stable grid connection",
        "To increase solar panel efficiency",
        "To reduce system maintenance"
      ],
      correct: 1,
      explanation: "Grid synchronisation ensures the inverter's output matches the grid's voltage, frequency, and phase, allowing safe and stable interconnection without disrupting the grid."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Synchronisation, Anti-Islanding, and Export Limits
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Critical safety features and grid regulations for secure utility interconnection
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Grid Safety & Compliance
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn how solar systems synchronise safely with the electricity grid
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand islanding risks and anti-islanding protection mechanisms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Know export limitation requirements and compliance obligations
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                When connecting solar systems to the public electricity grid, safety and compliance are paramount. This section explores the critical protection systems that ensure safe grid integration, including synchronisation protocols, anti-islanding mechanisms, and export limitation requirements that protect both utility infrastructure and personnel.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="h-6 w-6 text-yellow-400" />
                Grid Synchronisation: Perfect Alignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Grid synchronisation ensures that solar inverters connect seamlessly to the utility grid by matching voltage, frequency, and phase parameters before energising the connection.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Synchronisation Parameters:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage magnitude:</strong> Must match grid voltage ±10%</li>
                    <li>• <strong>Frequency:</strong> 50Hz ±0.5Hz tolerance in UK</li>
                    <li>• <strong>Phase angle:</strong> Within ±10° of grid phase</li>
                    <li>• <strong>Waveform quality:</strong> Low total harmonic distortion</li>
                    <li>• <strong>Voltage stability:</strong> No sudden jumps or sags</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Synchronisation Process:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Grid monitoring:</strong> Continuous voltage/frequency sampling</li>
                    <li>• <strong>Parameter matching:</strong> Inverter output adjustment</li>
                    <li>• <strong>Phase lock loop:</strong> Precise frequency tracking</li>
                    <li>• <strong>Soft connection:</strong> Gradual power ramp-up</li>
                    <li>• <strong>Continuous tracking:</strong> Real-time grid following</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Advanced Synchronisation Technologies:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Phase-Locked Loop (PLL):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Real-time frequency tracking</li>
                      <li>• Phase angle compensation</li>
                      <li>• Harmonic filtering capability</li>
                      <li>• Fast dynamic response</li>
                      <li>• Grid disturbance rejection</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Smart Grid Features:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Voltage regulation support</li>
                      <li>• Frequency response capability</li>
                      <li>• Power factor control</li>
                      <li>• Reactive power support</li>
                      <li>• Grid stability enhancement</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Monitoring Parameters:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Voltage magnitude and waveform</li>
                      <li>• Frequency stability and rate of change</li>
                      <li>• Phase relationships</li>
                      <li>• Harmonic distortion levels</li>
                      <li>• Grid impedance variations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                Anti-Islanding Protection: Critical Safety System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Anti-islanding protection prevents solar inverters from continuing to energise grid sections that have been isolated by the utility, protecting workers and equipment from unexpected energisation.
              </p>
              
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30 mb-4">
                <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  The Islanding Hazard
                </h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Scenario:</strong> A grid fault causes the utility to disconnect a section of the distribution network for maintenance or fault clearance.</p>
                  <p><strong>Risk:</strong> If solar inverters continue operating, they create an "island" of energised lines that utility workers believe to be dead.</p>
                  <p><strong>Consequences:</strong> Electrocution risk for workers, equipment damage, fire hazard, and out-of-phase reconnection damage.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Passive Detection Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Over/under voltage:</strong> Detects voltage deviations</li>
                    <li>• <strong>Over/under frequency:</strong> Monitors frequency drift</li>
                    <li>• <strong>Rate of change:</strong> Fast parameter changes</li>
                    <li>• <strong>Phase jump detection:</strong> Sudden phase shifts</li>
                    <li>• <strong>Response time:</strong> 0.5-2 seconds typical</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Active Detection Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Impedance measurement:</strong> Grid impedance changes</li>
                    <li>• <strong>Frequency shift:</strong> Deliberate frequency perturbation</li>
                    <li>• <strong>Sandia methods:</strong> Advanced active techniques</li>
                    <li>• <strong>Communication-based:</strong> SCADA/smart grid signals</li>
                    <li>• <strong>Response time:</strong> 0.1-0.5 seconds typical</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-red-400 font-semibold mb-3">UK Compliance Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">G59/3 Standards:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Anti-islanding detection mandatory</li>
                      <li>• Maximum disconnection time: 0.5s</li>
                      <li>• Type testing requirements</li>
                      <li>• Regular maintenance and testing</li>
                      <li>• Documentation and certification</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">IEEE 1547 Compliance:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• International standard alignment</li>
                      <li>• Non-detection zone minimisation</li>
                      <li>• Quality factor testing</li>
                      <li>• Interconnection system response</li>
                      <li>• Commissioning verification tests</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-6 w-6 text-green-400" />
                Export Limitation: Managing Grid Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Export limitation controls ensure that solar systems don't inject more power into the grid than the local infrastructure can safely handle, preventing voltage rise and grid instability.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Why Export Limits Matter:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage rise:</strong> Excess power causes voltage increase</li>
                    <li>• <strong>Grid capacity:</strong> Local transformers have limits</li>
                    <li>• <strong>Power quality:</strong> Harmonic distortion concerns</li>
                    <li>• <strong>Protection coordination:</strong> Fault level impacts</li>
                    <li>• <strong>Network stability:</strong> Prevents oscillations</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Limitation Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Fixed export limit:</strong> Maximum power setting</li>
                    <li>• <strong>Zero export systems:</strong> No grid injection allowed</li>
                    <li>• <strong>Dynamic limitation:</strong> Real-time power control</li>
                    <li>• <strong>Export meters:</strong> Monitoring and enforcement</li>
                    <li>• <strong>Smart inverters:</strong> Intelligent grid response</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Export Control Technologies:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Power Curtailment:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• MPPT derating during excess</li>
                      <li>• String-level disconnection</li>
                      <li>• Inverter power limiting</li>
                      <li>• Temporary shutdown capability</li>
                      <li>• Energy yield optimisation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Smart Grid Integration:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Real-time communication</li>
                      <li>• Grid voltage monitoring</li>
                      <li>• Frequency response services</li>
                      <li>• Demand response capability</li>
                      <li>• Virtual power plant participation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Zero Export Solutions:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• CT clamp monitoring</li>
                      <li>• Real-time load balancing</li>
                      <li>• Battery storage integration</li>
                      <li>• Load shifting strategies</li>
                      <li>• Self-consumption maximisation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-400" />
                G100 Relays and Protection Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                G100 relays provide comprehensive protection and control for larger solar installations, ensuring coordinated response to grid disturbances and seamless disconnection when required.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">G100 Relay Functions:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Loss of mains detection:</strong> Grid failure recognition</li>
                    <li>• <strong>Vector surge protection:</strong> Over/under voltage/frequency</li>
                    <li>• <strong>Rate of change monitoring:</strong> df/dt and dV/dt limits</li>
                    <li>• <strong>Neutral voltage displacement:</strong> Unbalanced conditions</li>
                    <li>• <strong>Reverse power protection:</strong> Export control capability</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Installation Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Capacity thresholds:</strong> {'>'}16A or {'>'}50kW typically</li>
                    <li>• <strong>DNO coordination:</strong> Settings approval required</li>
                    <li>• <strong>CT and VT connections:</strong> Proper instrument transformers</li>
                    <li>• <strong>Communication links:</strong> SCADA integration capability</li>
                    <li>• <strong>Testing and commissioning:</strong> Verification procedures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Protection Coordination Examples:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">Protection Type</th>
                        <th className="text-left p-2">Setting Range</th>
                        <th className="text-left p-2">Time Delay</th>
                        <th className="text-left p-2">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Over Voltage</td>
                        <td className="p-2">253V (110%)</td>
                        <td className="p-2">0.5s</td>
                        <td className="p-2">Voltage rise protection</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Under Voltage</td>
                        <td className="p-2">207V (90%)</td>
                        <td className="p-2">0.5s</td>
                        <td className="p-2">Grid failure detection</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Over Frequency</td>
                        <td className="p-2">50.5Hz</td>
                        <td className="p-2">0.5s</td>
                        <td className="p-2">Grid instability protection</td>
                      </tr>
                      <tr>
                        <td className="p-2">Under Frequency</td>
                        <td className="p-2">49.5Hz</td>
                        <td className="p-2">0.5s</td>
                        <td className="p-2">Load shedding coordination</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-900/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">UK Grid Code Compliance and DNO Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding UK-specific requirements ensures compliant installation and smooth grid connection approval processes.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-3">G98 Applications (≤16A per phase):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Notification only:</strong> No formal application required</li>
                    <li>• <strong>Post-installation:</strong> 28-day notification to DNO</li>
                    <li>• <strong>Standard settings:</strong> Pre-approved protection parameters</li>
                    <li>• <strong>Fast-track process:</strong> Simplified grid connection</li>
                    <li>• <strong>Inverter compliance:</strong> Type-approved equipment only</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-orange-400 font-semibold mb-3">G99 Applications ({'>'}16A per phase):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Formal application:</strong> Pre-installation DNO approval</li>
                    <li>• <strong>Technical assessment:</strong> Grid impact studies required</li>
                    <li>• <strong>Bespoke settings:</strong> Site-specific protection coordination</li>
                    <li>• <strong>Connection offer:</strong> Terms and conditions document</li>
                    <li>• <strong>Witnessing tests:</strong> DNO commissioning verification</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Common DNO Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Technical Documentation:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Single line diagrams</li>
                      <li>• Protection settings schedules</li>
                      <li>• Equipment certificates</li>
                      <li>• Commissioning test results</li>
                      <li>• As-built drawings</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Operational Requirements:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Remote monitoring capability</li>
                      <li>• Curtailment compliance</li>
                      <li>• Power factor control</li>
                      <li>• Voltage regulation support</li>
                      <li>• Emergency disconnection</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Ongoing Obligations:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Annual protection testing</li>
                      <li>• Performance data reporting</li>
                      <li>• Maintenance records</li>
                      <li>• Fault incident reporting</li>
                      <li>• Settings change notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Safe grid integration requires sophisticated protection systems that ensure solar installations synchronise properly with the utility grid, detect and respond to grid disturbances, and comply with export limitations. Anti-islanding protection is particularly critical for worker safety, while export controls protect grid infrastructure from overloading and voltage rise.
              </p>
              <p className="text-yellow-400 font-medium">
                Compliance with UK grid codes (G98/G99) and DNO requirements is mandatory, with safety-first design principles protecting both utility workers and grid infrastructure from solar system interactions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">What is the difference between passive and active anti-islanding protection?</h4>
                  <p className="text-gray-300 text-sm">
                    Passive methods monitor grid parameters (voltage, frequency) and trip when they go outside normal ranges. Active methods inject small test signals to detect grid impedance changes. Active methods are faster and more reliable but require more sophisticated inverter design.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Can export limiters be bypassed or overridden?</h4>
                  <p className="text-gray-300 text-sm">
                    Export limiters are typically hardware-enforced and cannot be bypassed without tampering. Modern systems use encryption and secure communication to prevent unauthorised changes. Attempting to bypass export limits violates grid connection agreements and can result in system disconnection.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">How quickly does anti-islanding protection respond to grid failures?</h4>
                  <p className="text-gray-300 text-sm">
                    UK standards require disconnection within 0.5 seconds for voltage/frequency deviations. Advanced active methods can detect islanding in 0.1-0.3 seconds. Some smart inverters use communication-based detection for even faster response times when grid infrastructure supports it.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">What is power factor control and why is it important?</h4>
                  <p className="text-gray-300 text-sm">
                    Power factor control manages reactive power to support grid voltage stability. Smart inverters can operate at leading or lagging power factors (typically 0.8-1.0) to provide voltage support. This capability is increasingly required for larger installations and grid service participation.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Do export limiters reduce my system's energy production?</h4>
                  <p className="text-gray-300 text-sm">
                    Export limiters can cause curtailment (lost generation) when solar production exceeds local consumption plus export limit. This mainly affects peak generation periods. Smart systems can shift generation to batteries or dump loads to minimise curtailment losses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Grid Integration Safety Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between pt-8">
            <Link to="../renewable-energy-module-5-section-3">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-5-section-5">
              <Button
                variant="default"
                className="bg-yellow-400 text-black hover:bg-yellow-400"
              >
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

export default RenewableEnergyModule5Section4;