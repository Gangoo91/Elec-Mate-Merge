import { ArrowLeft, ArrowRight, Home, Building2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { evModule1Section1Questions } from '@/data/upskilling/evChargingQuizzes';

const EVChargingModule1Section2 = () => {
  const quizQuestions = evModule1Section1Questions?.slice(0, 3)?.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  })) || [];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="../ev-charging-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Domestic vs Commercial EV Charging
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Understanding the key differences and requirements
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 2
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                EV charging installations fall into two main categories: domestic (residential) and commercial. Each has distinct requirements, regulations, and installation considerations that electrical professionals must understand.
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-blue-200">
                  <strong className="text-blue-300">Key Insight:</strong> The choice between domestic and commercial charging isn't just about location – it's about power requirements, usage patterns, safety considerations, and regulatory compliance.
                </p>
              </div>
              <p>
                This section explores the fundamental differences between domestic and commercial EV charging installations, helping you determine the appropriate solution for each application.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="text-sm text-white mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Distinguish between domestic and commercial EV charging requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Identify appropriate charging solutions for different property types</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Understand power capacity and infrastructure requirements for each</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Recognise cost implications and business considerations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Apply relevant regulations and safety standards to each installation type</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Domestic EV Charging - The Home Solution</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">What Makes Domestic Charging Different</h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-3 text-lg">Typical Specifications</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white">Power Rating:</span>
                      <span className="text-white">3.7kW - 22kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Supply:</span>
                      <span className="text-white">230V single / 400V three phase</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Current:</span>
                      <span className="text-white">16A - 32A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Connector:</span>
                      <span className="text-white">Type 2 (universal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Installation:</span>
                      <span className="text-white">Wall-mounted or post</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-3 text-lg">Key Characteristics</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Private use by household members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Overnight charging typically 6-8 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Lower duty cycle (intermittent use)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Smart features for load management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Integration with home energy systems</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-semibold mb-3">Domestic Installation Requirements</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-white font-medium mb-2">Electrical Requirements:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Dedicated circuit from consumer unit</li>
                      <li>• RCD protection (Type A or Type B)</li>
                      <li>• MCB rating appropriate to load</li>
                      <li>• Earthing and bonding compliance</li>
                      <li>• Cable sizing for voltage drop</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-white font-medium mb-2">Physical Requirements:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Weather protection (IP rating)</li>
                      <li>• Suitable mounting surface</li>
                      <li>• Vehicle access considerations</li>
                      <li>• Cable management solutions</li>
                      <li>• Security and theft prevention</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commercial EV Charging - Business Solutions</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Commercial Charging Considerations</h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-orange-500">
                  <h5 className="text-orange-300 font-bold mb-3 text-lg">Workplace Charging</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white">Power:</span>
                      <span className="text-white">7kW - 22kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Users:</span>
                      <span className="text-white">Employees & visitors</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Duration:</span>
                      <span className="text-white">8+ hours (working day)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Payment:</span>
                      <span className="text-white">Free/subsidised</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-purple-500">
                  <h5 className="text-purple-300 font-bold mb-3 text-lg">Public/Destination</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white">Power:</span>
                      <span className="text-white">7kW - 350kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Users:</span>
                      <span className="text-white">General public</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Duration:</span>
                      <span className="text-white">30min - 4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Payment:</span>
                      <span className="text-white">Pay-per-use</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-semibold mb-3">Commercial Installation Challenges</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h6 className="text-red-300 font-medium mb-2">Power Infrastructure:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Higher power demands</li>
                      <li>• Multiple charging points</li>
                      <li>• Load balancing systems</li>
                      <li>• Grid connection upgrades</li>
                      <li>• Power factor correction</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-yellow-300 font-medium mb-2">Management Systems:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Payment processing</li>
                      <li>• User authentication</li>
                      <li>• Remote monitoring</li>
                      <li>• Usage reporting</li>
                      <li>• Maintenance scheduling</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-green-300 font-medium mb-2">Compliance:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Accessibility requirements</li>
                      <li>• Safety regulations</li>
                      <li>• Planning permissions</li>
                      <li>• Environmental standards</li>
                      <li>• Data protection (GDPR)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Side-by-Side Comparison</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-600">
                  <thead>
                    <tr className="bg-yellow-400 text-black">
                      <th className="border border-gray-600 p-3 text-left font-bold">Aspect</th>
                      <th className="border border-gray-600 p-3 text-left font-bold">Domestic</th>
                      <th className="border border-gray-600 p-3 text-left font-bold">Commercial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold text-yellow-400">Power Rating</td>
                      <td className="border border-gray-600 p-3">3.7kW - 22kW (typically 7kW)</td>
                      <td className="border border-gray-600 p-3">7kW - 350kW+ (multiple units)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold text-yellow-400">Installation Cost</td>
                      <td className="border border-gray-600 p-3">£800 - £2,500 per unit</td>
                      <td className="border border-gray-600 p-3">£3,000 - £50,000+ per unit</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold text-yellow-400">Usage Pattern</td>
                      <td className="border border-gray-600 p-3">Overnight, predictable</td>
                      <td className="border border-gray-600 p-3">Throughout day, variable</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold text-yellow-400">User Authentication</td>
                      <td className="border border-gray-600 p-3">Simple or none required</td>
                      <td className="border border-gray-600 p-3">RFID, app, or payment card</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold text-yellow-400">Maintenance</td>
                      <td className="border border-gray-600 p-3">Minimal, user responsibility</td>
                      <td className="border border-gray-600 p-3">Regular, professional service</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold text-yellow-400">Revenue Model</td>
                      <td className="border border-gray-600 p-3">Personal use (electricity bill)</td>
                      <td className="border border-gray-600 p-3">Pay-per-use or subscription</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-semibold text-yellow-400">Regulatory Compliance</td>
                      <td className="border border-gray-600 p-3">Building Regs, BS 7671</td>
                      <td className="border border-gray-600 p-3">Additional H&S, accessibility laws</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Installation Procedures and Considerations</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-4 text-lg">Domestic Installation Process</h5>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                      <h6 className="text-blue-200 font-semibold mb-2">1. Site Survey & Assessment</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Electrical supply capacity assessment</li>
                        <li>• Consumer unit inspection and available ways</li>
                        <li>• Cable route planning (shortest practical route)</li>
                        <li>• Mounting location suitability check</li>
                        <li>• Vehicle access and parking considerations</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                      <h6 className="text-blue-200 font-semibold mb-2">2. Pre-Installation Requirements</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Building control notification (if required)</li>
                        <li>• DNO notification for loads &gt;32A</li>
                        <li>• Materials procurement and delivery</li>
                        <li>• Customer briefing on installation process</li>
                        <li>• Isolation and safety procedures</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                      <h6 className="text-blue-200 font-semibold mb-2">3. Installation Steps</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Install dedicated MCB and RCD protection</li>
                        <li>• Run supply cable to mounting location</li>
                        <li>• Mount charging unit securely</li>
                        <li>• Complete all electrical connections</li>
                        <li>• Configure smart features and connectivity</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-orange-500">
                  <h5 className="text-orange-300 font-bold mb-4 text-lg">Commercial Installation Process</h5>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded border-l-4 border-orange-400">
                      <h6 className="text-orange-200 font-semibold mb-2">1. Design & Planning Phase</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Load analysis and power demand calculations</li>
                        <li>• Grid connection capacity assessment</li>
                        <li>• Planning permission applications</li>
                        <li>• Traffic management and access planning</li>
                        <li>• Multi-disciplinary design coordination</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border-l-4 border-orange-400">
                      <h6 className="text-orange-200 font-semibold mb-2">2. Infrastructure Development</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Electrical supply upgrades (often 3-phase)</li>
                        <li>• Civil works (foundations, ducting, trenching)</li>
                        <li>• Data communication infrastructure</li>
                        <li>• Load management system installation</li>
                        <li>• Payment and access control systems</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border-l-4 border-orange-400">
                      <h6 className="text-orange-200 font-semibold mb-2">3. Commissioning & Testing</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Individual unit testing and calibration</li>
                        <li>• Network connectivity and communications</li>
                        <li>• Load balancing system verification</li>
                        <li>• Payment system integration testing</li>
                        <li>• Staff training and handover procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Cost Analysis and Business Considerations</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-4">Domestic Investment Analysis</h5>
                  <div className="space-y-4">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Initial Costs:</h6>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Basic 7kW unit:</span>
                          <span className="text-white">£500-£800</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Installation labour:</span>
                          <span className="text-white">£300-£600</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Materials & cable:</span>
                          <span className="text-white">£100-£300</span>
                        </div>
                        <div className="flex justify-between border-t border-green-600 pt-1">
                          <span className="font-semibold">Total Investment:</span>
                          <span className="text-green-200 font-semibold">£900-£1,700</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Running Costs:</h6>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Home electricity rate:</span>
                          <span className="text-white">14-35p/kWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual maintenance:</span>
                          <span className="text-white">£50-£100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Smart tariff savings:</span>
                          <span className="text-green-200">£200-£500/year</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-orange-500">
                  <h5 className="text-orange-300 font-bold mb-4">Commercial Business Case</h5>
                  <div className="space-y-4">
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Capital Investment:</h6>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>22kW charging unit:</span>
                          <span className="text-white">£2,000-£4,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Installation per unit:</span>
                          <span className="text-white">£1,500-£3,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Infrastructure (10 units):</span>
                          <span className="text-white">£15,000-£30,000</span>
                        </div>
                        <div className="flex justify-between border-t border-orange-600 pt-1">
                          <span className="font-semibold">Total per Unit:</span>
                          <span className="text-orange-200 font-semibold">£5,000-£10,000</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Revenue Potential:</h6>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Charging tariff:</span>
                          <span className="text-white">25-45p/kWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Utilisation rate:</span>
                          <span className="text-white">20-60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payback period:</span>
                          <span className="text-orange-200">3-7 years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="space-y-4">
                <p>
                  The distinction between domestic and commercial EV charging encompasses far more than just location and power requirements. It represents fundamentally different approaches to design, installation, operation, and business models.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-yellow-400">
                    <h5 className="text-blue-300 font-semibold mb-2">Domestic Success Factors:</h5>
                    <p className="text-blue-200 text-sm">
                      Focus on simplicity, reliability, and cost-effectiveness. Integration with home energy systems and smart tariffs provides additional value. Future-proofing through adequate power provision is essential.
                    </p>
                  </div>
                  <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500">
                    <h5 className="text-orange-300 font-semibold mb-2">Commercial Success Factors:</h5>
                    <p className="text-orange-200 text-sm">
                      Emphasise scalability, monitoring, and revenue generation. User experience, reliability, and comprehensive service support are critical for public-facing installations.
                    </p>
                  </div>
                </div>
                <p>
                  Both sectors offer significant opportunities for electrical professionals. Understanding the specific requirements, challenges, and business drivers of each enables informed decision-making and successful project delivery. The rapidly evolving EV market demands continuous learning and adaptation to emerging technologies and standards.
                </p>
              </div>
            </CardContent>
          </Card>

          {quizQuestions.length > 0 && (
            <SingleQuestionQuiz 
              questions={quizQuestions}
              title="Section 2 Knowledge Check"
            />
          )}

          <div className="flex justify-between items-center pt-6">
            <Link to="../ev-charging-module-1-section-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-1-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10">
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

export default EVChargingModule1Section2;