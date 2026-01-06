import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Smartphone, Target, CheckCircle, AlertTriangle, Shield, Zap, Users, FileText, HelpCircle, ChevronDown, ChevronRight, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule6Section6Quiz } from '@/components/upskilling/bms/BMSModule6Section6Quiz';

const BMSModule6Section6 = () => {
  const [showInlineCheck1, setShowInlineCheck1] = useState(false);
  const [showInlineCheck2, setShowInlineCheck2] = useState(false);
  const [showInlineCheck3, setShowInlineCheck3] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../bms-module-6">
          <Button variant="ghost" className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Remote Monitoring and Fault Alerts</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">Remote access and notification systems for modern BMS installations</p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black text-sm sm:text-base">Module 6.6</Badge>
            <Badge variant="outline" className="border-gray-600 text-white text-sm sm:text-base">45 minutes</Badge>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-elec-yellow" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Modern Building Management Systems (BMS) are rarely monitored only from a control room. With remote monitoring and fault alerting, facility teams can access live data, receive alarm notifications, and even make adjustments from laptops, tablets, or smartphones.
              </p>
              <p>
                This improves response times and reduces downtime — but it also introduces new risks. If remote monitoring isn't set up correctly, staff may miss critical alerts, or systems may become vulnerable to cyberattacks.
              </p>
              <p>
                For electricians, the role is ensuring that network connections, notification hardware (GSM modules, IP routers), and alarm circuits are wired and tested correctly, so remote services function reliably.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-elec-yellow" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white">
                By the end of this section, you should be able to:
              </p>
              
              <div className="space-y-3">
                {[
                  "Explain the purpose of remote monitoring in a BMS",
                  "Describe how fault alerts are sent to operators",
                  "Recognise the benefits and risks of remote access",
                  "Apply best practices for supporting remote monitoring hardware and connectivity"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge 
                      variant="secondary" 
                      className="bg-elec-yellow text-black hover:bg-elec-yellow font-bold text-xs px-2 py-1 mt-1 flex-shrink-0"
                    >
                      {index + 1}
                    </Badge>
                    <div className="flex items-start gap-2 flex-1">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-white">{outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What is Remote Monitoring */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">What is Remote Monitoring?</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Remote monitoring means authorised staff can view and control BMS functions off-site. This technology has revolutionised facility management by providing 24/7 oversight of critical building systems without requiring physical presence.
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Remote Access Methods:</h4>
                
                <div className="p-4 bg-blue-900/10 border border-blue-600/20 rounded-lg">
                  <h4 className="font-semibold text-blue-200 mb-2">Web portals</h4>
                  <p className="text-blue-100 text-sm mb-2">Secure login to cloud-hosted dashboards with SSL encryption and multi-factor authentication.</p>
                  <ul className="text-blue-100 text-xs space-y-1 ml-4">
                    <li>• Real-time data visualisation and trending</li>
                    <li>• Historical data analysis and reporting</li>
                    <li>• System configuration and setpoint adjustments</li>
                    <li>• User access control and audit trails</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-900/10 border border-green-600/20 rounded-lg">
                  <h4 className="font-semibold text-green-200 mb-2">Mobile apps</h4>
                  <p className="text-green-100 text-sm mb-2">Push notifications and live controls through dedicated BMS applications.</p>
                  <ul className="text-green-100 text-xs space-y-1 ml-4">
                    <li>• Instant alarm notifications with escalation</li>
                    <li>• Quick system overrides and emergency controls</li>
                    <li>• Location-based services for multi-site management</li>
                    <li>• Offline mode for cached critical data</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-900/10 border border-purple-600/20 rounded-lg">
                  <h4 className="font-semibold text-purple-200 mb-2">VPN connections</h4>
                  <p className="text-purple-100 text-sm mb-2">Direct access to site BMS servers through IT-managed encrypted tunnels.</p>
                  <ul className="text-purple-100 text-xs space-y-1 ml-4">
                    <li>• Full system access equivalent to local control</li>
                    <li>• Integration with corporate network security policies</li>
                    <li>• Bandwidth optimisation for large data transfers</li>
                    <li>• Automatic connection management and failover</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow mb-3">Technical Infrastructure Requirements:</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
                    <h5 className="font-medium text-gray-200 mb-1">Network Connectivity</h5>
                    <p className="text-gray-300 text-sm">Reliable internet connection with minimum 10Mbps upload/download speeds for real-time data transmission.</p>
                  </div>
                  
                  <div className="p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
                    <h5 className="font-medium text-gray-200 mb-1">Security Hardware</h5>
                    <p className="text-gray-300 text-sm">Industrial firewalls, VPN routers, and encrypted communication modules for secure data transmission.</p>
                  </div>
                  
                  <div className="p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
                    <h5 className="font-medium text-gray-200 mb-1">Backup Communications</h5>
                    <p className="text-gray-300 text-sm">GSM/4G modules for redundant connectivity when primary internet connection fails.</p>
                  </div>
                  
                  <div className="p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
                    <h5 className="font-medium text-gray-200 mb-1">Edge Computing</h5>
                    <p className="text-gray-300 text-sm">Local data processing units to maintain critical functions during communication outages.</p>
                  </div>
                </div>
              </div>

              <div className="bg-transparent p-4 rounded-lg border border-gray-600">
                <p className="text-elec-yellow font-semibold">Example:</p>
                <p>A maintenance manager receives a push notification at 2am about a chiller fault. Using the mobile app, they remotely switch to a standby unit, adjust temperature setpoints, and schedule an engineer visit for the next morning - all while preventing a complete system failure and maintaining building comfort.</p>
              </div>

              <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                  <span className="text-elec-yellow font-semibold">Inline Check</span>
                </div>
                <button 
                  onClick={() => setShowInlineCheck1(!showInlineCheck1)}
                  className="text-white hover:text-elec-yellow transition-colors"
                >
                  👉 Why does remote monitoring improve response times?
                </button>
                {showInlineCheck1 && (
                  <div className="mt-3 p-3 bg-blue-800/30 rounded">
                    <p className="text-white">Remote monitoring improves response times because staff can receive instant notifications and take immediate action from any location, rather than waiting to physically visit the site. This 24/7 accessibility means critical issues can be addressed within minutes instead of hours, preventing minor problems from escalating into major system failures.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Fault Alerts */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Fault Alerts</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Fault alerts ensure that problems are flagged instantly, not hours later when someone checks the dashboard. Modern BMS systems can detect hundreds of different fault conditions and communicate them through multiple channels to ensure rapid response.
              </p>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Alert Delivery Methods:</h4>
                
                <div className="space-y-3">
                  <div className="p-4 bg-red-900/10 border border-red-600/20 rounded-lg">
                    <h5 className="font-semibold text-red-200 mb-2">SMS via GSM modules</h5>
                    <p className="text-red-100 text-sm mb-2">Text messages sent through cellular networks for immediate notification delivery.</p>
                    <ul className="text-red-100 text-xs space-y-1 ml-4">
                      <li>• Works independently of internet connectivity</li>
                      <li>• Instant delivery even during network outages</li>
                      <li>• Can include fault severity and location data</li>
                      <li>• Character limits require concise but clear messaging</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-orange-900/10 border border-orange-600/20 rounded-lg">
                    <h5 className="font-semibold text-orange-200 mb-2">Email alerts with escalation</h5>
                    <p className="text-orange-100 text-sm mb-2">Detailed notifications sent to multiple recipients with automatic escalation protocols.</p>
                    <ul className="text-orange-100 text-xs space-y-1 ml-4">
                      <li>• Rich content including graphs, images, and detailed fault descriptions</li>
                      <li>• Automatic forwarding to senior staff if not acknowledged</li>
                      <li>• Integration with corporate email security systems</li>
                      <li>• Attachment of relevant system logs and diagnostic data</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-cyan-900/10 border border-cyan-600/20 rounded-lg">
                    <h5 className="font-semibold text-cyan-200 mb-2">Push notifications through BMS apps</h5>
                    <p className="text-cyan-100 text-sm mb-2">Real-time alerts delivered directly to smartphones and tablets via dedicated applications.</p>
                    <ul className="text-cyan-100 text-xs space-y-1 ml-4">
                      <li>• Interactive acknowledgment and response capabilities</li>
                      <li>• Location-based routing to nearest qualified personnel</li>
                      <li>• Integration with device calendars and on-call schedules</li>
                      <li>• Biometric security for accessing critical system controls</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow mb-3">Escalation Protocols:</h4>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600/30 rounded-lg">
                    <p className="text-white mb-3">Alerts can be routed to different staff levels depending on urgency and response requirements:</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="bg-elec-yellow text-black px-2 py-1 rounded text-xs font-bold">Level 1</span>
                        <span className="text-sm">On-site technicians (0-5 minutes)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-orange-400 text-black px-2 py-1 rounded text-xs font-bold">Level 2</span>
                        <span className="text-sm">Shift supervisors (5-15 minutes)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-red-400 text-black px-2 py-1 rounded text-xs font-bold">Level 3</span>
                        <span className="text-sm">Facilities management (15-30 minutes)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">Critical</span>
                        <span className="text-sm">Emergency response team (immediate)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-transparent p-4 rounded-lg border border-gray-600">
                <p className="text-elec-yellow font-semibold">Extended Example:</p>
                <p>A critical AHU bearing temperature rises above 75°C. The system immediately sends an SMS to the maintenance technician and displays a Level 2 alarm on the BMS. If not acknowledged within 10 minutes, it escalates to the facilities manager via email and push notification. After 20 minutes without response, it triggers an automated shutdown sequence and alerts the emergency response team, preventing potential equipment fire and building evacuation.</p>
              </div>

              <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                  <span className="text-elec-yellow font-semibold">Inline Check</span>
                </div>
                <button 
                  onClick={() => setShowInlineCheck2(!showInlineCheck2)}
                  className="text-white hover:text-elec-yellow transition-colors"
                >
                  👉 What is one benefit of escalation in remote fault alerts?
                </button>
                {showInlineCheck2 && (
                  <div className="mt-3 p-3 bg-blue-800/30 rounded">
                    <p className="text-white">Escalation ensures that critical issues reach appropriate personnel if the primary contact doesn't respond, preventing important alerts from being missed. It also automatically involves senior staff for high-priority faults that require management-level decisions or additional resources.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Risks of Remote Access */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Risks of Remote Access
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Missed alerts:</strong> If systems are misconfigured, messages may not be delivered.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Over-reliance:</strong> Staff may assume alerts are always working, leading to complacency.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Cybersecurity risks:</strong> Poorly secured remote access can be exploited by attackers.
                  </div>
                </div>
              </div>

              <p>These risks underline the need for proper testing, secure setup, and staff training.</p>

              <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                  <span className="text-elec-yellow font-semibold">Inline Check</span>
                </div>
                <button 
                  onClick={() => setShowInlineCheck3(!showInlineCheck3)}
                  className="text-white hover:text-elec-yellow transition-colors"
                >
                  👉 What is one risk of relying solely on remote monitoring?
                </button>
                {showInlineCheck3 && (
                  <div className="mt-3 p-3 bg-blue-800/30 rounded">
                    <p className="text-white">Staff may become complacent and assume alerts are always working correctly, potentially missing critical issues if the alert system fails or is misconfigured.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Practical Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-elec-yellow mb-4">Setting Up Remote Monitoring</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Check connectivity:",
                      content: "Verify GSM signal strength or network availability before commissioning."
                    },
                    {
                      title: "Use redundancy:",
                      content: "Configure multiple reporting paths (e.g., both SMS and email)."
                    },
                    {
                      title: "Test notifications:",
                      content: "Send trial alerts to all recipients and confirm delivery."
                    },
                    {
                      title: "Label equipment:",
                      content: "Clearly identify GSM modules, routers, and notification hardware in panels."
                    },
                    {
                      title: "Coordinate with IT:",
                      content: "For VPN or cloud systems, confirm correct firewall and security settings."
                    }
                  ].map((item, index) => (
                    <div key={index} className="border-l-4 border-elec-yellow pl-4">
                      <span className="font-semibold text-elec-yellow">{item.title}</span> {item.content}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-elec-yellow mb-4">Supporting Ongoing Reliability</h3>
                <div className="space-y-4">
                  {[
                    "Train staff to acknowledge alerts promptly and not ignore repeated notifications.",
                    "Encourage regular testing of remote access links.",
                    "Document escalation paths so everyone knows who is notified and when.",
                    "Establish maintenance schedules for communication hardware."
                  ].map((item, index) => (
                    <div key={index} className="border-l-4 border-elec-yellow pl-4">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-400" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="bg-red-900/30 border border-red-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Problem:</h4>
                  <p>In a large distribution warehouse, a critical freezer unit failed overnight. The BMS was configured to send email alerts only — but the email server had been offline for weeks, and no one noticed.</p>
                </div>

                <div className="bg-yellow-900/30 border border-yellow-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Investigation:</h4>
                  <p>By the time staff discovered the fault the next morning, thousands of pounds of stock had spoiled. The investigation revealed that staff had become reliant on email notifications without checking if the system was actually working.</p>
                </div>

                <div className="bg-green-900/30 border border-green-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Solution:</h4>
                  <p>GSM SMS modules were installed as a backup alert method, ensuring future alarms reached staff even if email servers failed. Regular testing of all alert paths was also implemented.</p>
                </div>

                <div className="bg-blue-900/30 border border-blue-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Lessons Learned:</h4>
                  <p>Never rely on a single alert method. Always implement redundancy and test notification systems regularly. Staff training on acknowledging and escalating alerts is crucial.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-elec-yellow" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  question: "What happens if the GSM network goes down?",
                  answer: "This is why redundancy is crucial. Configure multiple alert paths including email, SMS, and app notifications. Some systems can also use landline autodiallers as a backup."
                },
                {
                  question: "How do we secure remote access against hackers?",
                  answer: "Use VPN connections, strong authentication, regular password changes, and limit access to specific IP addresses. Work with IT security teams to implement proper firewalls and monitoring."
                },
                {
                  question: "Can remote monitoring work during power outages?",
                  answer: "Yes, if properly designed. GSM modules should have battery backup, and critical network equipment should be on UPS systems. Some systems can send 'last gasp' alerts when power fails."
                },
                {
                  question: "Who is responsible for maintaining remote monitoring systems?",
                  answer: "It's typically shared between electricians (hardware), IT teams (networks), and facilities managers (procedures). Clear responsibility matrices should be established during commissioning."
                },
                {
                  question: "How often should we test remote alert systems?",
                  answer: "Monthly testing is recommended for critical systems, quarterly for less critical ones. Test should include all alert paths and staff response procedures, not just technical functionality."
                },
                {
                  question: "What if staff don't respond to alerts after hours?",
                  answer: "Implement escalation procedures that automatically notify backup staff or management. Some systems can escalate to security services or emergency contacts if no response is received."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-600 rounded-lg">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-transparent transition-colors"
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronDown className="h-5 w-5 text-elec-yellow" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-elec-yellow" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-4 pb-4">
                      <p className="text-white">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Remote monitoring allows access to BMS dashboards and controls from off-site.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fault alerts notify staff instantly via SMS, email, or app notifications.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Benefits include faster responses and reduced downtime, but risks include missed alerts and cybersecurity vulnerabilities.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Electricians support reliability by wiring communication hardware correctly, labelling clearly, and testing alert delivery.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extended UK Regulatory & Technical Content */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                UK Regulatory Standards and Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>Remote monitoring systems must comply with several UK regulations and standards to ensure proper operation and data protection:</p>
              
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">BS EN 16001 (Energy Management)</h4>
                  <p>Remote monitoring systems should support energy management compliance by providing accurate, timestamped data for energy reporting and demonstrating continuous monitoring capabilities.</p>
                </div>

                <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">GDPR and Data Protection</h4>
                  <p>Remote access systems must implement appropriate data protection measures, including encryption of data in transit, secure authentication, and audit logging of access attempts.</p>
                </div>

                <div className="bg-purple-900/20 border border-purple-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Telecommunications Regulations</h4>
                  <p>GSM modules must be registered with appropriate network operators and comply with Ofcom regulations for commercial use of mobile communications in alarm systems.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Implementation and Wiring Standards */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Technical Implementation and Wiring Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-elec-yellow">GSM Module Installation</h4>
                  <div className="space-y-2 text-sm">
                    <p>• Install external antenna with minimum 3dB gain</p>
                    <p>• Use shielded cables for RF connections</p>
                    <p>• Maintain 2m separation from high-power equipment</p>
                    <p>• Provide battery backup for minimum 8 hours operation</p>
                    <p>• Install surge protection on antenna feeds</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-elec-yellow">Network Infrastructure</h4>
                  <div className="space-y-2 text-sm">
                    <p>• Use Cat6A cables for Ethernet connections</p>
                    <p>• Install managed switches with VLAN capability</p>
                    <p>• Configure network redundancy with dual uplinks</p>
                    <p>• Implement network monitoring and logging</p>
                    <p>• Use PoE+ for powering network devices</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Commissioning Checklist</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>✓ Signal strength testing (-70dBm minimum)</p>
                    <p>✓ Network connectivity verification</p>
                    <p>✓ Alert delivery testing (all methods)</p>
                    <p>✓ Escalation procedure testing</p>
                  </div>
                  <div>
                    <p>✓ Battery backup testing</p>
                    <p>✓ Failover scenario testing</p>
                    <p>✓ Security audit completion</p>
                    <p>✓ Staff training delivery</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Applications */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                Real-World Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Hospitals</h4>
                  <p className="text-sm">Critical systems require 24/7 monitoring with immediate escalation to on-call engineers for life safety systems.</p>
                </div>
                
                <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Data Centres</h4>
                  <p className="text-sm">Environmental monitoring with automated responses and multiple redundant alert paths to prevent server downtime.</p>
                </div>
                
                <div className="bg-purple-900/20 border border-purple-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Manufacturing</h4>
                  <p className="text-sm">Production line monitoring with integration to maintenance management systems and automated work order generation.</p>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-600 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Cost-Benefit Analysis</h4>
                <p className="text-sm">
                  Remote monitoring typically pays for itself within 6-12 months through reduced callout costs, prevented equipment damage, and improved energy efficiency. 
                  The average cost of unplanned downtime (£5,000-£50,000 per incident) far exceeds the investment in proper remote monitoring infrastructure.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BMSModule6Section6Quiz />
        </div>
      </main>

      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-stretch sm:items-center">
            <Link to="../bms-module-6-section-5" className="flex-1 sm:flex-initial">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Previous: Energy Monitoring & Control</span>
              </Button>
            </Link>
            <Link to="../bms-module-7" className="flex-1 sm:flex-initial">
              <Button 
                className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <span className="truncate">Next Module: Advanced BMS Applications</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule6Section6;