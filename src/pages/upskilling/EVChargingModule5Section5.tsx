import { ArrowLeft, ArrowRight, Users, CheckCircle, Building, Lightbulb, HelpCircle, Settings, BookOpen, Target, AlertTriangle, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule5Section5Quiz } from '@/components/upskilling/quiz/EVChargingModule5Section5Quiz';

const EVChargingModule5Section5 = () => {
  useEffect(() => {
    document.title = 'Multiple Unit Coordination (Flats/Shared Sites) - EV Charging Module 5 Section 5';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn to manage EV charging infrastructure in multi-occupancy developments. Covers load balancing, billing systems, and coordination strategies.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Building className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Multiple Unit Coordination (Flats/Shared Sites)
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Managing EV charging infrastructure in multi-occupancy developments with intelligent coordination and fair allocation systems
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
                Multiple unit coordination presents unique challenges for EV charging infrastructure, requiring 
                careful planning of electrical capacity, fair allocation of resources, and sophisticated management 
                systems. This section covers the technical and regulatory requirements for implementing charging 
                solutions in flats, apartments, and shared residential or commercial sites.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Key Challenges in Multi-Unit Developments</h4>
                <ul className="text-sm space-y-1">
                  <li>• Limited electrical supply capacity across multiple units</li>
                  <li>• Fair allocation and billing of charging costs</li>
                  <li>• Queue management and scheduling conflicts</li>
                  <li>• Varying vehicle charging requirements and patterns</li>
                  <li>• Future-proofing for increasing EV adoption</li>
                  <li>• Compliance with building regulations and accessibility</li>
                </ul>
              </div>
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
              <div className="space-y-3">
                {[
                  "Design load management systems for multiple charging points",
                  "Implement fair allocation and billing systems for shared charging",
                  "Configure queue management and booking systems",
                  "Calculate diversity factors for multi-unit charging demand",
                  "Apply building regulations for accessible charging provision",
                  "Plan future expansion and capacity upgrades for growing demand"
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
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Multiple Unit Coordination Systems</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* Load Management Strategies */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Load Management Strategies</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Dynamic Load Balancing</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Power Sharing Algorithms</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Equal power distribution across active chargers</li>
                          <li>• Priority-based allocation (first-come-first-served)</li>
                          <li>• Time-remaining optimisation</li>
                          <li>• Emergency charging override</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Real-Time Monitoring</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Building electrical load monitoring</li>
                          <li>• Individual charger power consumption</li>
                          <li>• Grid supply capacity tracking</li>
                          <li>• Predictive demand forecasting</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Sequential Charging</h4>
                      <ul className="text-sm space-y-1">
                        <li>• One vehicle at full power</li>
                        <li>• Queue management system</li>
                        <li>• Automated switching</li>
                        <li>• Fastest charging times</li>
                      </ul>
                    </div>
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Parallel Load Sharing</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Power split equally</li>
                        <li>• All vehicles charge simultaneously</li>
                        <li>• Reduced individual charging speed</li>
                        <li>• Higher user satisfaction</li>
                      </ul>
                    </div>
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Intelligent Scheduling</h4>
                      <ul className="text-sm space-y-1">
                        <li>• User departure time input</li>
                        <li>• Optimised charging windows</li>
                        <li>• Off-peak preference</li>
                        <li>• Minimum charging guarantee</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing and Access Control */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Billing and Access Control</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Authentication Methods</h4>
                      <ul className="text-sm space-y-2">
                        <li>• RFID card/fob access</li>
                        <li>• Mobile app authentication</li>
                        <li>• PIN code entry systems</li>
                        <li>• Biometric access (advanced)</li>
                        <li>• Vehicle-to-charger communication</li>
                      </ul>
                    </div>
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Billing Models</h4>
                      <ul className="text-sm space-y-2">
                        <li>• Cost per kWh consumed</li>
                        <li>• Time-based charging fees</li>
                        <li>• Monthly subscription models</li>
                        <li>• Peak/off-peak rate structures</li>
                        <li>• Overstay penalty charges</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-200 mb-2">Fair Usage Policies</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Time Limits:</p>
                        <p>Maximum 4-hour sessions to ensure availability for all residents</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Booking Windows:</p>
                        <p>Advance booking up to 7 days, with 24-hour minimum notice for cancellation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infrastructure Planning */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Infrastructure Planning</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Capacity Assessment</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Current Demand Analysis</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Number of units/residents</li>
                          <li>• Current EV ownership rate</li>
                          <li>• Projected adoption growth</li>
                          <li>• Parking space availability</li>
                          <li>• Usage pattern analysis</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Electrical Infrastructure</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Existing supply capacity</li>
                          <li>• Distribution board availability</li>
                          <li>• Cable route planning</li>
                          <li>• Earth bonding requirements</li>
                          <li>• RCD/MCB protection design</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-200 mb-3">Phased Implementation Strategy</h4>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Phase 1 (0-2 years):</p>
                        <p>Install 20% capacity to meet immediate demand</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Phase 2 (2-5 years):</p>
                        <p>Expand to 50% capacity with smart load management</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Phase 3 (5+ years):</p>
                        <p>Scale to 80%+ capacity with grid integration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Load Management Calculation</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-yellow-400 font-medium">Building Details:</p>
                    <p>50-unit apartment block, 100A supply per phase</p>
                    <p>20% initial EV adoption (10 vehicles)</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium">Charging Infrastructure:</p>
                    <p>10 × 7kW charging points</p>
                    <p>Peak demand without management: 70kW</p>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-blue-800/30 rounded">
                  <p className="text-blue-200 text-sm">
                    <strong>Solution:</strong> Dynamic load management system limiting total charging load to 45kW 
                    (65% of available capacity), allowing 6.4kW average per active charger.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  question: "Who is responsible for maintaining shared charging infrastructure?",
                  answer: "Typically the building management company or residents' association. Maintenance contracts should cover both electrical safety testing and software updates. Clear agreements should establish responsibility for repairs, upgrades, and electricity costs."
                },
                {
                  question: "How do we handle disputes over charging access and costs?",
                  answer: "Implement clear usage policies from the start, including booking systems, time limits, and fair billing practices. Consider a residents' committee to oversee charging policies and resolve disputes. Transparent usage reporting helps prevent conflicts."
                },
                {
                  question: "What happens if someone's car breaks down while charging?",
                  answer: "Smart charging systems can detect charging faults and automatically release the connector or transfer power to other users. Emergency procedures should include manual override capabilities and contact details for immediate assistance."
                },
                {
                  question: "Can visitors use the charging facilities?",
                  answer: "This depends on building policies. Some developments offer visitor charging at higher rates or through temporary access codes. Consider separate visitor charging bays or time-limited access to prevent abuse of resident facilities."
                },
                {
                  question: "How do we future-proof for increasing EV adoption?",
                  answer: "Install infrastructure capable of easy expansion - oversized cable routes, spare ways in distribution boards, and scalable management systems. Consider conduit and ducting for future charging points even if not installing chargers initially."
                },
                {
                  question: "What are the insurance implications of shared charging?",
                  answer: "Building insurance should cover charging infrastructure as fixed installations. Personal vehicle insurance typically covers charging-related incidents. Consider public liability insurance for visitor charging and professional indemnity for system operators."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Advanced Technical Implementation */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Advanced Technical Implementation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* Smart Building Integration */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Smart Building Integration</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Building Management System (BMS) Integration</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Real-Time Data Exchange</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Total building electrical demand monitoring</li>
                          <li>• HVAC system load coordination</li>
                          <li>• Lift and common area consumption tracking</li>
                          <li>• Emergency system priority override</li>
                          <li>• Peak demand forecasting and alerts</li>
                          <li>• Integration with renewable energy systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Automated Load Shedding</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Priority hierarchy for different loads</li>
                          <li>• Graduated reduction protocols</li>
                          <li>• User notification systems</li>
                          <li>• Automatic restoration after peak periods</li>
                          <li>• Emergency charging reservation</li>
                          <li>• Grid frequency response participation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Internet of Things (IoT) Sensor Network</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Environmental Monitoring</h5>
                        <p className="text-sm">Temperature sensors in charging areas to monitor heat buildup, humidity sensors for electrical safety, and air quality monitoring for underground car parks.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Occupancy Detection</h5>
                        <p className="text-sm">Parking space sensors for real-time availability, vehicle presence detection, and automated check-in/check-out for accurate billing and queue management.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Security Integration</h5>
                        <p className="text-sm">CCTV integration for incident recording, access control integration, and anti-theft cable monitoring with automatic alerts.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Load Management Algorithms */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Load Management Algorithms</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Machine Learning Optimisation</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Predictive Modelling</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Historical usage pattern analysis</li>
                          <li>• Seasonal demand variations</li>
                          <li>• Individual user behaviour prediction</li>
                          <li>• Grid price forecasting integration</li>
                          <li>• Weather impact on demand</li>
                          <li>• Special event demand planning</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Dynamic Optimisation</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Real-time algorithm adjustment</li>
                          <li>• Multi-objective optimisation (cost, time, satisfaction)</li>
                          <li>• Reinforcement learning for user preferences</li>
                          <li>• Anomaly detection and response</li>
                          <li>• Continuous performance improvement</li>
                          <li>• A/B testing of allocation strategies</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Queue Management Strategies</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">First-Come-First-Served</h5>
                        <p className="text-xs">Simple queue with automatic progression. Fair but may not be optimal for urgent needs.</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Priority-Based Allocation</h5>
                        <p className="text-xs">Emergency needs, subscription tiers, or departure time urgency determine queue position.</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Dynamic Slot Booking</h5>
                        <p className="text-xs">Advanced reservation system with real-time optimisation and automatic rescheduling.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Tenancy Business Models */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Multi-Tenancy Business Models</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Revenue Models for Property Owners</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Subscription-Based</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Monthly unlimited charging: £80-120</li>
                          <li>• Peak/off-peak tier pricing</li>
                          <li>• Family/multi-vehicle discounts</li>
                          <li>• Annual payment incentives</li>
                          <li>• Visitor day pass options</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Pay-Per-Use</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Cost-plus model: electricity + 3-5p/kWh</li>
                          <li>• Time-based charging: £2-4/hour</li>
                          <li>• Peak time surcharges</li>
                          <li>• Minimum charge periods</li>
                          <li>• Overstay penalties</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Third-Party Operation Models</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Charge Point Operator (CPO) Partnership</h5>
                        <p className="text-sm">External company installs, operates, and maintains infrastructure. Property owner receives rental income (£500-2000/year per charging point) or revenue share (10-30%).</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Resident-Owned Cooperative</h5>
                        <p className="text-sm">Residents collectively own charging infrastructure through service charges. Democratic decision-making for policies and upgrades. Lower costs but requires active management.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Hybrid Management</h5>
                        <p className="text-sm">Property owner owns infrastructure, third-party provides software platform and user support. Combines control with professional management expertise.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Case Studies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Comprehensive Case Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card/80 p-5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Case Study 1: Luxury Apartment Development</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Project Overview:</p>
                      <p className="text-sm">200-unit high-end development, London Zone 2, underground parking</p>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Technical Solution:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 80 × 22kW AC charging points (Phase 1)</li>
                        <li>• 300A three-phase supply upgrade</li>
                        <li>• Siemens VersiCharge load management</li>
                        <li>• Dedicated parking bay allocation</li>
                        <li>• RFID and mobile app access</li>
                      </ul>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Business Model:</p>
                      <ul className="text-sm space-y-1">
                        <li>• £150/month unlimited charging subscription</li>
                        <li>• £300 installation fee per resident</li>
                        <li>• Service charge contribution: £25/month</li>
                        <li>• Visitor charging: £0.45/kWh</li>
                      </ul>
                    </div>
                    <div className="bg-green-800/30 p-3 rounded">
                      <p className="text-green-200 font-medium text-sm">Results After 18 Months:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 95% resident satisfaction score</li>
                        <li>• 60% EV adoption rate vs 25% area average</li>
                        <li>• 23% increase in property values</li>
                        <li>• £45,000 annual revenue generation</li>
                        <li>• 99.2% system uptime</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Case Study 2: Social Housing Estate</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Project Overview:</p>
                      <p className="text-sm">150-unit council estate, Birmingham, surface car parks</p>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Technical Solution:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 25 × 7kW charging posts (phased installation)</li>
                        <li>• Smart hub system with dynamic allocation</li>
                        <li>• Weatherproof design for outdoor use</li>
                        <li>• Simple card access system</li>
                        <li>• Community building integration</li>
                      </ul>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Accessibility Focus:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 4 wheelchair-accessible charging bays</li>
                        <li>• Voice guidance for visually impaired</li>
                        <li>• Large button emergency stop</li>
                        <li>• Multi-language user interface</li>
                      </ul>
                    </div>
                    <div className="bg-blue-800/30 p-3 rounded">
                      <p className="text-blue-200 font-medium text-sm">Community Impact:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 40% reduction in local air pollution</li>
                        <li>• 15 new EV purchases within 6 months</li>
                        <li>• £800/year average fuel savings per household</li>
                        <li>• Training programme for 12 local technicians</li>
                        <li>• Model for 5 additional council estates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-600 p-5 rounded-lg">
                <h4 className="font-semibold text-purple-200 mb-3">Case Study 3: Mixed-Use Development Innovation</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Development Profile:</p>
                    <ul className="text-sm space-y-1">
                      <li>• 180 residential units</li>
                      <li>• 50 commercial parking spaces</li>
                      <li>• Retail and office spaces</li>
                      <li>• 24/7 access requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Innovative Features:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Shared resident/commercial charging</li>
                      <li>• Vehicle-to-building (V2B) capability</li>
                      <li>• Solar canopy integration</li>
                      <li>• Battery storage buffer system</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Advanced Technology:</p>
                    <ul className="text-sm space-y-1">
                      <li>• AI-driven demand prediction</li>
                      <li>• Blockchain-based energy trading</li>
                      <li>• 5G connectivity for real-time control</li>
                      <li>• Augmented reality maintenance support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Checklist */}
          <Card className="bg-green-900/20 border-green-600 border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-200">Implementation Checklist</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-200 mb-3">Planning Phase</h4>
                  <div className="space-y-2">
                    {[
                      "Conduct resident/tenant EV ownership survey",
                      "Assess current electrical infrastructure capacity",
                      "Obtain landlord/freeholder consent",
                      "Review lease terms and service charge implications",
                      "Calculate business case and financing options",
                      "Select appropriate technology solution",
                      "Obtain planning permission if required",
                      "Design accessible and future-ready infrastructure"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-green-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-green-200 mb-3">Implementation Phase</h4>
                  <div className="space-y-2">
                    {[
                      "Install electrical infrastructure and charging points",
                      "Commission load management and billing systems",
                      "Conduct thorough testing and safety checks",
                      "Train property management staff",
                      "Develop user guides and support procedures",
                      "Launch resident communication campaign",
                      "Implement monitoring and maintenance schedules",
                      "Establish performance review and optimisation cycles"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-green-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz */}
          <EVChargingModule5Section5Quiz />
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <Link to="../ev-charging-module-5-section-4">
            <Button 
              variant="outline" 
              className="bg-card border-gray-600 text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
          </Link>
          <Link to="../ev-charging-module-6">
            <Button 
              variant="outline" 
              className="bg-card border-gray-600 text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200"
            >
              Next Module
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule5Section5;