import { ArrowLeft, ArrowRight, Zap, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule5Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary advantage of Power over Ethernet Plus (PoE+) compared to standard PoE?",
      options: [
        "Higher data transmission rates",
        "Increased power delivery capacity up to 25.5W",
        "Better cable shielding requirements",
        "Reduced installation complexity"
      ],
      correctAnswer: 1,
      explanation: "PoE+ (IEEE 802.3at) delivers up to 25.5W of power to powered devices, compared to standard PoE's 15.4W, enabling support for more demanding devices like PTZ cameras and access points."
    },
    {
      id: 2,
      question: "According to IEEE 802.3bt Type 4, what is the maximum power delivery for PoE applications?",
      options: [
        "60W",
        "71W",
        "90W",
        "100W"
      ],
      correctAnswer: 2,
      explanation: "IEEE 802.3bt Type 4 (also known as UPoE or PoE++) can deliver up to 90W of power, supporting high-power devices like LED lighting, wireless access points, and IP phones with displays."
    },
    {
      id: 3,
      question: "What is the primary cable consideration for high-power PoE applications over Cat 6A?",
      options: [
        "Colour coding requirements",
        "Temperature rise and power derating",
        "Connector type selection",
        "Cable length increases"
      ],
      correctAnswer: 1,
      explanation: "High-power PoE causes temperature rise in cables, particularly in bundled installations. Cat 6A cables may require power derating when multiple PoE cables are bundled together to prevent overheating."
    },
    {
      id: 4,
      question: "Which cable pairs are used for power delivery in 4-pair PoE (IEEE 802.3bt)?",
      options: [
        "Pairs 1 and 2 only",
        "Pairs 2 and 3 only", 
        "All four pairs (1, 2, 3, and 4)",
        "Pairs 1 and 4 only"
      ],
      correctAnswer: 2,
      explanation: "IEEE 802.3bt (4-pair PoE) uses all four pairs for power delivery, allowing higher power transmission while distributing current across more conductors to manage heat generation."
    },
    {
      id: 5,
      question: "What is the maximum cable length for PoE applications according to IEEE standards?",
      options: [
        "90 metres",
        "100 metres",
        "120 metres",
        "150 metres"
      ],
      correctAnswer: 1,
      explanation: "PoE applications maintain the standard 100-metre channel length limit (90m permanent link + 10m patch cords), but power delivery may be reduced over longer distances due to voltage drop."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 max-w-6xl mx-auto">
        <Link to="../data-cabling-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-8">
          <div className="text-center">
            <Badge variant="secondary" className="bg-yellow-400 text-black mb-4">
              Module 5 • Section 4
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Power over Ethernet (PoE) Applications and Considerations
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Understanding PoE standards, power delivery systems, and cable infrastructure requirements for power and data integration
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Zap className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">Power Integration:</strong> PoE combines power and data transmission over standard Ethernet cables, requiring careful consideration of cable specifications and thermal management.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                PoE Standards and Evolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">IEEE PoE Standard Development</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Power over Ethernet has evolved through multiple IEEE standards to support increasingly demanding applications. 
                  Each generation increases power delivery capability whilst maintaining backward compatibility with existing infrastructure.
                  Understanding these standards helps you choose the right solution for your applications and plan for future upgrades.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Original PoE Standards (Legacy)</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>IEEE 802.3af (2003):</strong> Original PoE standard - the foundation</li>
                      <li><strong>Power Delivery:</strong> 15.4W at PSE, 12.95W at PD (20% loss in cable)</li>
                      <li><strong>Voltage:</strong> 44-57V DC, nominal 48V for safety and efficiency</li>
                      <li><strong>Current:</strong> 350mA maximum per pair to stay within Cat 5e limits</li>
                      <li><strong>Pairs Used:</strong> 2 pairs only (1,2 and 3,6) to preserve spare pairs</li>
                      <li><strong>Real Applications:</strong> IP phones (6-8W), basic wireless APs (10-12W), CCTV cameras</li>
                      <li><strong>Detection Method:</strong> 25kΩ signature resistance for device identification</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Modern PoE Standards (Current)</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>IEEE 802.3at (2009):</strong> PoE+ for higher power devices</li>
                      <li><strong>Power Delivery:</strong> 25.5W at PSE, 20W at PD - nearly double the original</li>
                      <li><strong>IEEE 802.3bt Type 3 (2018):</strong> 4-pair PoE for demanding applications</li>
                      <li><strong>Type 3 Power:</strong> 60W at PSE, 51W at PD using all 4 pairs</li>
                      <li><strong>IEEE 802.3bt Type 4:</strong> Ultra PoE for high-power devices</li>
                      <li><strong>Type 4 Power:</strong> 90W at PSE, 71W at PD - enough for laptops and displays</li>
                      <li><strong>4-Pair Advantage:</strong> Current distributed across all conductors reduces heating</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-800/30 mt-4">
                  <h4 className="font-medium text-orange-400 mb-2">⚡ Real-World Power Examples</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">Standard PoE (15.4W)</p>
                      <ul className="text-orange-300 space-y-1">
                        <li>• Desktop IP phone: 6-8W</li>
                        <li>• Basic access point: 10-12W</li>
                        <li>• Indoor security camera: 8-10W</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">PoE+ (25.5W)</p>
                      <ul className="text-orange-300 space-y-1">
                        <li>• Wi-Fi 5 dual-band AP: 18-22W</li>
                        <li>• PTZ security camera: 20-25W</li>
                        <li>• Video phone with display: 15-20W</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">PoE++ (60-90W)</p>
                      <ul className="text-orange-300 space-y-1">
                        <li>• Wi-Fi 6 high-density AP: 45-60W</li>
                        <li>• LED light fixture: 30-75W</li>
                        <li>• Laptop charging: 45-65W</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Power Delivery Mechanisms and Technical Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">PoE Power Sourcing and Delivery Methods</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  PoE systems utilise sophisticated power sourcing equipment (PSE) and powered device (PD) interactions to ensure safe, 
                  efficient power delivery whilst maintaining data integrity and system protection.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Alternative A (Data Pairs)</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Uses pairs 1,2 and 3,6 (pins 1,2,3,6)</li>
                      <li>• Centre taps of data transformers</li>
                      <li>• Most common implementation method</li>
                      <li>• Phantom power delivery system</li>
                      <li>• Minimal impact on data transmission</li>
                      <li>• Standard for endspan PSE equipment</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Alternative B (Spare Pairs)</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Uses pairs 4,5 and 7,8 (pins 4,5,7,8)</li>
                      <li>• Dedicated power conductors</li>
                      <li>• Common in midspan injector systems</li>
                      <li>• Simplified power circuit design</li>
                      <li>• No interference with data signals</li>
                      <li>• Legacy compatibility considerations</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">4-Pair PoE (802.3bt)</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• All four pairs carry power and data</li>
                      <li>• Doubled current capacity per pair</li>
                      <li>• Enhanced power efficiency</li>
                      <li>• Reduced cable heating effects</li>
                      <li>• Supports up to 90W applications</li>
                      <li>• Future-ready for higher power needs</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Power Detection and Classification Process</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Understanding the PoE handshake process is crucial for troubleshooting connection issues and ensuring proper device operation.
                  This automated process protects both equipment and ensures optimal power delivery.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">PSE Detection Sequence (Step-by-Step)</p>
                    <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                      <li><strong>Detection Phase:</strong> PSE applies 2.8-10V, measures 19-26.5kΩ signature</li>
                      <li><strong>Classification Phase:</strong> Applies 14.5-20.5V, measures current draw (0-44mA)</li>
                      <li><strong>Power Enable:</strong> Ramps up to 48V with inrush current limiting</li>
                      <li><strong>Monitoring:</strong> Continuously checks for 5-26.5mA maintain current</li>
                      <li><strong>Disconnect Detection:</strong> Powers down if current drops below 5mA</li>
                      <li><strong>Protection:</strong> Immediate shutdown on overcurrent or short circuit</li>
                    </ol>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">PD Classification Levels (What the Numbers Mean)</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Class 0:</strong> 0.44-4mA - Unknown/default (could be up to 15.4W)</li>
                      <li>• <strong>Class 1:</strong> 9-12mA - Very low power (maximum 4W needed)</li>
                      <li>• <strong>Class 2:</strong> 17-20mA - Low power (maximum 7W needed)</li>
                      <li>• <strong>Class 3:</strong> 26-30mA - Medium power (maximum 15.4W needed)</li>
                      <li>• <strong>Class 4:</strong> 36-44mA - High power (PoE+ or higher needed)</li>
                      <li>• <strong>Class 8:</strong> Dual signature indicates 4-pair PoE capability</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30 mt-3">
                  <h5 className="font-medium text-red-400 mb-2">🚨 Common Detection Problems</h5>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-red-300 font-medium mb-1">Detection Failures</p>
                      <ul className="text-red-200 space-y-1">
                        <li>• Cable too long (&gt;100m) - voltage drop</li>
                        <li>• Poor connections - resistance too high</li>
                        <li>• Wrong cable type - solid vs stranded</li>
                        <li>• Damaged conductors - open circuits</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-red-300 font-medium mb-1">Classification Issues</p>
                      <ul className="text-red-200 space-y-1">
                        <li>• Device draws more power than classified</li>
                        <li>• Intermittent connections cause resets</li>
                        <li>• Temperature affects resistance values</li>
                        <li>• Legacy devices may not classify properly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Cable Infrastructure Requirements and Thermal Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cable Performance and Power Delivery Correlation</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-yellow-400">Cable Type</th>
                        <th className="text-left p-3 text-yellow-400">Max Power</th>
                        <th className="text-left p-3 text-yellow-400">Voltage Drop</th>
                        <th className="text-left p-3 text-yellow-400">Temperature Rise</th>
                        <th className="text-left p-3 text-yellow-400">Bundle Derating</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Cat 5e (24 AWG)</td>
                        <td className="p-3">25.5W (PoE+)</td>
                        <td className="p-3">6.2V @ 100m</td>
                        <td className="p-3">15°C typical</td>
                        <td className="p-3">20% @ 7+ cables</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Cat 6 (23 AWG)</td>
                        <td className="p-3">60W (Type 3)</td>
                        <td className="p-3">4.9V @ 100m</td>
                        <td className="p-3">12°C typical</td>
                        <td className="p-3">15% @ 7+ cables</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Cat 6A (23 AWG)</td>
                        <td className="p-3">90W (Type 4)</td>
                        <td className="p-3">4.9V @ 100m</td>
                        <td className="p-3">10°C typical</td>
                        <td className="p-3">10% @ 7+ cables</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Cat 8 (22 AWG)</td>
                        <td className="p-3">90W+ future</td>
                        <td className="p-3">3.9V @ 100m</td>
                        <td className="p-3">8°C typical</td>
                        <td className="p-3">5% @ 7+ cables</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Thermal Management and Installation Guidelines</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Bundle Size Calculations</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 1-6 cables: No derating required</li>
                      <li>• 7-12 cables: 20% power reduction</li>
                      <li>• 13-24 cables: 30% power reduction</li>
                      <li>• 25+ cables: 40% power reduction</li>
                      <li>• Consider ambient temperature effects</li>
                      <li>• Monitor cable jacket temperature limits</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Installation Best Practices</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maintain adequate cable separation</li>
                      <li>• Use cable trays with ventilation</li>
                      <li>• Avoid enclosed conduit runs</li>
                      <li>• Monitor environmental conditions</li>
                      <li>• Plan for future power upgrades</li>
                      <li>• Document power allocation per cable</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Safety Considerations</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maximum 60°C conductor temperature</li>
                      <li>• Fire safety rating compliance</li>
                      <li>• Proper circuit protection at PSE</li>
                      <li>• Regular thermal monitoring</li>
                      <li>• Emergency shutdown procedures</li>
                      <li>• Maintenance access planning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">PoE Applications and Design Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Application-Specific Power Requirements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Low Power Applications (15.4W)</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>IP Phones:</strong> 6-12W typical consumption</li>
                      <li><strong>Basic Access Points:</strong> 8-15W for single radio</li>
                      <li><strong>Security Cameras:</strong> Fixed dome/bullet cameras</li>
                      <li><strong>Card Readers:</strong> Access control systems</li>
                      <li><strong>Sensors:</strong> Environmental monitoring devices</li>
                      <li><strong>LED Signage:</strong> Basic digital displays</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">High Power Applications (60-90W)</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>PTZ Cameras:</strong> High-performance surveillance</li>
                      <li><strong>Wi-Fi 6 Access Points:</strong> Multi-radio high-density</li>
                      <li><strong>LED Lighting:</strong> Smart building illumination</li>
                      <li><strong>Digital Displays:</strong> Interactive kiosks/monitors</li>
                      <li><strong>Thin Clients:</strong> Zero client computing devices</li>
                      <li><strong>Building Automation:</strong> HVAC controllers</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">System Design and Planning Considerations</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Power Budget Planning</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Calculate total power requirements per switch</li>
                      <li>• Include 20% headroom for future expansion</li>
                      <li>• Consider device startup inrush currents</li>
                      <li>• Plan for redundancy and backup power</li>
                      <li>• Document power allocation per port</li>
                      <li>• Monitor actual vs. planned consumption</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Infrastructure Considerations</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• UPS sizing for PoE load requirements</li>
                      <li>• Cable selection for power delivery needs</li>
                      <li>• Thermal management in equipment rooms</li>
                      <li>• Future upgrade path planning</li>
                      <li>• Integration with building management systems</li>
                      <li>• Emergency shutdown and safety systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Quiz 
            questions={quizQuestions} 
            title="Power over Ethernet Knowledge Check"
            description="Test your understanding of PoE standards, power delivery mechanisms, and cable infrastructure requirements"
          />

          <div className="flex justify-between">
            <Link to="../data-cabling-module-5-section-3">
              <Button variant="outline" className="border-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-5-section-5">
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

export default DataCablingModule5Section4;