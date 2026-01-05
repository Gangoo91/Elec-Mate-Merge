import { ArrowLeft, ArrowRight, Monitor, Target, CheckCircle, Info, Shield, Wrench, BookOpen, AlertCircle, Lightbulb, Database, Activity, Clock, Save, Settings, AlertTriangle, BarChart3, Eye, Users, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule6Section3Quiz } from '@/data/upskilling/bmsModule6Section3Quiz';

const BMSModule6Section3 = () => {
  const [inlineCheck1, setInlineCheck1] = useState(false);
  const [inlineCheck2, setInlineCheck2] = useState(false);
  const [inlineCheck3, setInlineCheck3] = useState(false);
  const [inlineCheck4, setInlineCheck4] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../bms-module-6">
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
            <Monitor className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              BMS Dashboards and Visualisation Platforms
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-white max-w-4xl leading-relaxed">
            Converting raw data into actionable information through intuitive displays
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
              Module 6.3
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
              30 minutes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                A Building Management System (BMS) generates huge amounts of data — temperatures, energy use, alarms, equipment status, and trends. But <strong className="text-yellow-400">raw data alone is not useful</strong>. To make sense of it, operators rely on dashboards and visualisation platforms.
              </p>
              <p>
                Dashboards present information in clear, interactive displays that allow facility managers to quickly assess building performance, identify problems, and take informed decisions.
              </p>
              <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="p-3 sm:p-4 bg-card border border-gray-600 rounded-lg">
                  <h4 className="font-semibold text-orange-200 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Critical Point for Electricians
                  </h4>
                  <p className="text-white text-sm">Dashboards are only as good as the underlying data. Ensuring inputs are installed correctly means dashboards reflect reliable, meaningful information that operators can trust.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Explain the purpose of dashboards in a BMS</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Describe common dashboard features and visualisation tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Understand how dashboards support operators and clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Recognise the electrician's role in ensuring accurate data feeds for visualisation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 1: Purpose of BMS Dashboards */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="h-5 w-5 text-yellow-400" />
                Purpose of BMS Dashboards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Dashboards are the <strong className="text-yellow-400">bridge between complex technical systems and human understanding</strong>. They transform thousands of data points into clear, actionable information that facility managers can use to make informed decisions quickly.
              </p>
              
              <p>
                <strong className="text-yellow-400">Simplification</strong> is the primary goal. Instead of scrolling through hundreds of sensor readings, operators see visual summaries with colour coding, charts, and graphics that instantly communicate system status. A building's entire HVAC performance can be understood at a glance.
              </p>

              <p>
                <strong className="text-green-400">Real-time monitoring</strong> provides immediate visibility into building operations. Operators can see current temperatures, energy consumption, equipment status, and alarm conditions without having to interrogate individual controllers or walk the building.
              </p>

              <p>
                <strong className="text-purple-400">Decision support</strong> comes from highlighting key metrics and trends. Energy usage patterns, comfort levels, system efficiency, and maintenance needs are all presented in ways that guide operational decisions and highlight areas needing attention.
              </p>

              <p>
                <strong className="text-orange-400">Remote access</strong> through web-based dashboards means facility managers can monitor multiple buildings from anywhere. Tablet and phone compatibility allows rapid response to issues even when staff are off-site.
              </p>

              <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-2">Visual Example</h4>
                <p className="text-blue-100 text-sm">Instead of reviewing hundreds of individual sensor logs, a dashboard displays a building floor plan with colour-coded zones: green = normal operation, red = alarm condition, yellow = warning status. Operators can instantly see which areas need attention.</p>
              </div>

              {/* Inline Check 1 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 Why are dashboards important for facility managers?</p>
                <Button
                  onClick={() => setInlineCheck1(!inlineCheck1)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {inlineCheck1 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck1 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Dashboards are essential because they convert complex technical data into clear, actionable information. They allow facility managers to quickly assess building performance, identify problems, make informed decisions, and respond to issues efficiently without needing deep technical knowledge of the underlying systems.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Common Dashboard Features */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-yellow-400" />
                Common Features of Dashboards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Modern BMS dashboards incorporate several key features designed to provide comprehensive building oversight while remaining intuitive for non-technical users.
              </p>
              
              <p>
                <strong className="text-yellow-400">Graphical floor plans</strong> are the foundation of most dashboards. These show building layouts with live data overlays, equipment locations, and real-time status indicators. Operators can click on rooms or equipment to drill down into detailed information.
              </p>

              <p>
                <strong className="text-green-400">Energy visualisation</strong> displays consumption data in easily understood formats. This includes kWh usage trends, CO₂ footprint calculations, efficiency benchmarks, and cost analysis. Charts and graphs make energy patterns immediately apparent.
              </p>

              <p>
                <strong className="text-red-400">Alarm views</strong> present prioritised alarm lists with acknowledgement functions. Critical alarms are highlighted, and operators can see alarm history, acknowledge alerts, and track resolution progress. This ensures nothing gets missed.
              </p>

              <p>
                <strong className="text-purple-400">Trend charts</strong> provide interactive graphs for analysing historical performance. Operators can zoom into specific time periods, compare different parameters, and identify patterns that might indicate developing problems or opportunities for optimisation.
              </p>

              <p>
                <strong className="text-yellow-400">Key Performance Indicators (KPIs)</strong> display target metrics such as "% time within comfort band," "energy efficiency ratio," or "equipment availability." These provide at-a-glance performance assessments against predetermined goals.
              </p>

              <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
                <h4 className="font-semibold text-green-200 mb-2">Dashboard Integration</h4>
                <p className="text-green-100 text-sm">Modern dashboards often integrate weather data, occupancy schedules, energy prices, and maintenance systems to provide complete operational context for decision-making.</p>
              </div>

              {/* Inline Check 2 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 Give one example of a KPI that might be displayed on a BMS dashboard.</p>
                <Button
                  onClick={() => setInlineCheck2(!inlineCheck2)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {inlineCheck2 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck2 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Examples include "% time within comfort temperature band" (showing how often spaces meet target conditions), "energy efficiency ratio" (comparing energy use to occupancy), "equipment availability" (percentage of time systems operate normally), or "alarm response time" (how quickly issues are resolved).
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Electrician's Role */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Electrician's Role in Dashboard Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Dashboards are only as accurate as the data feeding into them. As an electrician, your installation work directly impacts whether dashboards provide reliable information that operators can trust for critical decisions.
              </p>
              
              <p>
                <strong className="text-yellow-400">Installing and wiring sensors correctly</strong> is fundamental. Every temperature sensor, pressure transmitter, flow meter, and status contact must be wired to the correct input with proper signal conditioning. A single miswired sensor can compromise an entire dashboard display.
              </p>

              <p>
                <strong className="text-orange-400">Ensuring inputs/outputs match dashboard points</strong> requires careful coordination with the BMS programmer. The physical I/O point labels must exactly match the dashboard configuration. Discrepancies lead to dashboards showing data from wrong locations or equipment.
              </p>

              <p>
                <strong className="text-red-400">Avoiding miswiring that displays false values</strong> is critical for operator safety and building performance. A temperature sensor wired to the wrong input might show normal readings on the dashboard while actual conditions are dangerous or uncomfortable.
              </p>

              <p>
                <strong className="text-green-400">Testing devices during commissioning</strong> means verifying that dashboard displays update correctly when field conditions change. Heat a temperature sensor, apply pressure to a transmitter, or switch equipment on/off while watching dashboard responses.
              </p>

              <p>
                <strong className="text-purple-400">Maintaining communication networks</strong> ensures dashboard reliability. Ethernet cables, RS-485 networks, and wireless connections must be installed and terminated properly to prevent data dropouts that could compromise dashboard functionality.
              </p>

              {/* Inline Check 3 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 What can happen if sensors are miswired or incorrectly labelled?</p>
                <Button
                  onClick={() => setInlineCheck3(!inlineCheck3)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {inlineCheck3 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck3 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Miswired or incorrectly labelled sensors can cause dashboards to display false information, leading operators to make incorrect decisions about building systems. This can result in comfort problems, energy waste, equipment damage, or even safety hazards if critical alarms don't display properly.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Best Practices */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Best Practices for Supporting Dashboards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Supporting reliable dashboard operation requires attention to detail throughout the installation, commissioning, and maintenance phases. These practices ensure dashboards remain accurate and trustworthy.
              </p>
              
              <p>
                <strong className="text-yellow-400">Accurate labelling</strong> is absolutely critical. Every cable, every I/O point, and every sensor must be labelled to match exactly the naming convention used in the dashboard configuration. Use a systematic approach and verify labels against the BMS database.
              </p>

              <p>
                <strong className="text-orange-400">Calibrated sensors</strong> ensure dashboard displays represent reality. Verify sensor accuracy using calibrated reference instruments before connection. Don't assume factory calibration is sufficient - environmental conditions and handling can affect accuracy.
              </p>

              <p>
                <strong className="text-green-400">End-user clarity</strong> means remembering that dashboards are often used by non-technical facilities staff. Accurate and clear information is essential because operators rely on dashboard data for critical decisions about comfort, safety, and efficiency.
              </p>

              <p>
                <strong className="text-purple-400">Commissioning checks</strong> must verify real-time dashboard updates. Make physical changes in the field (adjust thermostats, switch equipment, trigger alarms) and confirm these changes appear instantly and accurately on dashboard displays.
              </p>

              <p>
                <strong className="text-red-400">Network reliability</strong> is fundamental to dashboard operation. Install communications cabling (Ethernet, RS-485) with proper shielding, termination, and routing to minimise dropouts. Dashboards depend on continuous data feeds to remain useful.
              </p>

              <div className="p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
                <h4 className="font-semibold text-yellow-200 mb-2">Pro Tip</h4>
                <p className="text-yellow-100 text-sm">Create a commissioning checklist that includes dashboard verification for every sensor and device. This systematic approach prevents issues and builds confidence in dashboard reliability.</p>
              </div>

              {/* Inline Check 4 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 Why is network reliability important for dashboard operation?</p>
                <Button
                  onClick={() => setInlineCheck4(!inlineCheck4)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {inlineCheck4 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck4 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Dashboards rely on continuous data feeds from field devices. Network dropouts or communication failures mean dashboards can't update with current information, making them unreliable for monitoring and decision-making. Poor network reliability undermines the entire purpose of dashboard visualisation.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                <h4 className="font-semibold text-red-200 mb-3">Case Study: The Misleading Dashboard</h4>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Problem:</strong> In a university, the BMS dashboard displayed classroom CO₂ levels as consistently low across all lecture halls, even though students reported stuffy conditions and poor air quality.
                  </p>
                  <p>
                    <strong>Investigation:</strong> Facilities staff trusted the dashboard and couldn't understand the complaints. Air quality seemed perfect according to the visual displays showing green zones throughout the building.
                  </p>
                  <p>
                    <strong>Discovery:</strong> Electricians discovered the CO₂ sensor had been wired into the wrong input channel. The dashboard was displaying values from an unused spare channel that always read low.
                  </p>
                  <p>
                    <strong>Resolution:</strong> Once rewired correctly, the dashboard reflected true air quality levels with red and yellow zones indicating poor conditions during occupied periods.
                  </p>
                  <p className="text-yellow-400">
                    <strong>Outcome:</strong> Ventilation settings were adjusted based on accurate dashboard data, resolving the air quality complaints and improving learning conditions.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-2">Key Lessons</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-100 text-sm">
                  <li>Dashboard accuracy depends entirely on correct field wiring</li>
                  <li>Operators make decisions based on displayed information</li>
                  <li>Incorrect data can mask real problems for extended periods</li>
                  <li>Thorough commissioning verification prevents these issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Modern Dashboard Technologies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-yellow-400" />
                Modern Dashboard Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Dashboard technology continues evolving to provide more intuitive, accessible, and powerful visualisation capabilities for building operators and facility managers.
              </p>
              
              <p>
                <strong className="text-yellow-400">Cloud-based dashboards</strong> enable access from anywhere with internet connectivity. This allows facility managers to monitor multiple buildings, respond to alarms remotely, and coordinate maintenance activities across portfolios of properties.
              </p>

              <p>
                <strong className="text-green-400">Mobile-responsive designs</strong> ensure dashboards work effectively on tablets and smartphones. Touch-friendly interfaces and simplified navigation make it easy to check building status and respond to issues while on the move.
              </p>

              <p>
                <strong className="text-purple-400">Integration capabilities</strong> allow dashboards to combine BMS data with weather forecasts, energy pricing, occupancy schedules, and maintenance systems. This provides complete operational context for better decision-making.
              </p>

              <p>
                <strong className="text-orange-400">Customisation options</strong> let different users see relevant information. Facility managers might see energy and cost data, while maintenance staff focus on equipment status and alarms. Security staff might emphasise access control and fire safety systems.
              </p>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    What happens if the dashboard server fails?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    The BMS controllers continue operating independently, but operators lose visualisation capabilities. Most systems include backup servers or cloud redundancy to prevent complete dashboard loss.
                  </p>
                </details>
                
                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    Can dashboards be customised for different users?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    Yes, modern dashboards support user-specific views and permissions. Facility managers might see energy data while maintenance staff focus on equipment status and alarms.
                  </p>
                </details>
                
                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    How often do dashboard displays update?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    Update frequencies vary by system and data type. Critical alarms update immediately, while trend data might refresh every few minutes. Real-time displays typically update every 10-30 seconds.
                  </p>
                </details>
                
                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    What skills do operators need to use dashboards effectively?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    Dashboards are designed for non-technical users, requiring basic computer skills and building systems knowledge. Training focuses on interpreting displays and responding to alerts rather than technical configuration.
                  </p>
                </details>

                <details className="p-3 bg-card rounded-lg border border-gray-600">
                  <summary className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300">
                    How do you troubleshoot dashboard display problems?
                  </summary>
                  <p className="mt-2 text-sm text-gray-300">
                    Start by verifying field device operation, check communication networks, confirm I/O point mapping, and test data flow from sensor to display. Most issues trace back to wiring or configuration problems.
                  </p>
                </details>
              </div>
            </CardContent>
          </Card>

          {/* Summary Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-medium text-yellow-400 mb-4">Key Takeaways</p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Dashboards convert raw BMS data into clear, actionable information for facility managers and operators</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Common features include floor plans, energy visualisation, alarm views, trend charts, and KPIs</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Dashboard accuracy depends entirely on correct wiring, labelling, and calibration of field devices</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Electricians support dashboard reliability through proper installation and thorough commissioning verification</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Modern dashboards offer remote access, mobile compatibility, and integration with multiple building systems</span>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg mt-6">
                <h4 className="font-semibold text-yellow-400 mb-2">Remember</h4>
                <p className="text-white text-sm">
                  Your electrical installation work is the foundation of dashboard reliability. Every sensor you wire, every label you apply, and every connection you test directly impacts whether operators can trust their dashboards for critical building management decisions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Check Quiz */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule6Section3Quiz}
                title="BMS Dashboards and Visualisation Platforms"
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <Link to="../bms-module-6-section-2" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Previous: Data Logging</span>
                <span className="sm:hidden">Previous: Data</span>
              </Button>
            </Link>
            
            <Link to="../bms-module-6" className="w-full sm:w-auto">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto"
              >
                <span className="hidden sm:inline">Back to Module 6</span>
                <span className="sm:hidden">Module 6</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule6Section3;