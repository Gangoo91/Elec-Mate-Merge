import { ArrowLeft, ArrowRight, Zap, Target, CheckCircle, Info, Settings, Wrench, BookOpen, AlertCircle, Lightbulb, Clock, Bell, Activity, Database, Shield, Users, Smartphone, AlertTriangle, Play, Pause, RotateCcw, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { eventTriggersQuizData } from '@/data/upskilling/eventTriggersQuizData';

const BMSModule6Section4 = () => {
  const [inlineCheck1, setInlineCheck1] = useState(false);
  const [inlineCheck2, setInlineCheck2] = useState(false);
  const [inlineCheck3, setInlineCheck3] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Event Triggers and Auto-Reporting
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Automated systems for intelligent building response and comprehensive reporting
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black text-xs sm:text-sm">
              Module 6.4
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
              35 minutes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-elec-yellow" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Modern Building Management Systems don't just monitor—they <strong className="text-elec-yellow">respond intelligently</strong> to changing conditions. Event triggers automate building responses, while auto-reporting ensures stakeholders receive timely, relevant information without manual intervention.
              </p>
              <p>
                Event triggers allow buildings to <strong className="text-elec-yellow">make smart decisions automatically</strong>: switching to emergency mode when smoke is detected, adjusting HVAC when occupancy changes, or optimising energy use based on time-of-day tariffs.
              </p>
              <p>
                Auto-reporting transforms raw data into <strong className="text-green-400">actionable information</strong>, delivering energy summaries, maintenance alerts, and performance reports to the right people at the right time.
              </p>
              <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="p-3 sm:p-4 bg-transparent border border-gray-600 rounded-lg">
                  <h4 className="font-semibold text-orange-200 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Critical for Electricians
                  </h4>
                  <p className="text-white text-sm">Your installation work directly impacts automation reliability. Properly wired inputs, correct signal conditioning, and reliable communications ensure automated systems respond safely and effectively to building conditions.</p>
                </div>
              </div>
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
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Explain the purpose of event triggers in building automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Describe common trigger types and their applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Understand auto-reporting systems and their benefits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Recognise the electrician's role in supporting automated systems</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 1: Understanding Event Triggers */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Play className="h-5 w-5 text-elec-yellow" />
                Understanding Event Triggers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Event triggers are the <strong className="text-elec-yellow">intelligent decision-making rules</strong> that allow buildings to respond automatically to changing conditions. They monitor specific parameters and execute predefined actions when trigger conditions are met.
              </p>
              
              <p>
                <strong className="text-elec-yellow">Time-based triggers</strong> execute actions according to schedules: switching lights at sunset, starting HVAC before occupancy, or generating weekly energy reports. These provide predictable, routine automation that optimises building operation.
              </p>

              <p>
                <strong className="text-green-400">Sensor-based triggers</strong> respond to environmental conditions: activating cooling when temperature exceeds setpoints, switching to natural ventilation when outdoor air quality improves, or alerting maintenance when equipment operates outside normal parameters.
              </p>

              <p>
                <strong className="text-red-400">Alarm-based triggers</strong> provide safety and security responses: evacuating lifts during fire alarms, notifying security of after-hours access, or switching to backup systems when primary equipment fails. These ensure rapid response to critical conditions.
              </p>

              <p>
                <strong className="text-purple-400">Occupancy-based triggers</strong> optimise building services based on usage patterns: reducing lighting in unoccupied areas, adjusting ventilation for crowd levels, or modifying security settings during business hours.
              </p>

              <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-2">Trigger Logic Example</h4>
                <p className="text-blue-100 text-sm">IF (outdoor temperature &gt; 25°C) AND (occupancy detected) AND (time between 08:00-18:00) THEN (activate cooling, open motorised blinds, send comfort notification to facilities team).</p>
              </div>

              {/* Inline Check 1 */}
              <div className="bg-transparent/80 border border-elec-yellow/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-elec-yellow" />
                  <span className="font-semibold text-elec-yellow">Inline Check</span>
                </div>
                <p className="text-white mb-3">What are the main types of event triggers in building automation?</p>
                <Button
                  onClick={() => setInlineCheck1(!inlineCheck1)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
                >
                  {inlineCheck1 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck1 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> The main types are: Time-based triggers (scheduled actions), Sensor-based triggers (environmental responses), Alarm-based triggers (safety/security responses), and Occupancy-based triggers (usage pattern responses). Each type serves different automation needs and building requirements.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Auto-Reporting Systems */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-elec-yellow" />
                Auto-Reporting Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Auto-reporting transforms building data into <strong className="text-elec-yellow">meaningful information</strong> delivered automatically to stakeholders. This eliminates manual report generation while ensuring timely access to critical building performance data.
              </p>
              
              <p>
                <strong className="text-elec-yellow">Energy reports</strong> provide consumption analysis, efficiency trends, and cost breakdowns. Daily summaries help facility managers identify unusual usage, while monthly reports support strategic energy management and budget planning.
              </p>

              <p>
                <strong className="text-green-400">Maintenance reports</strong> highlight equipment performance, filter replacement needs, and scheduled service requirements. Predictive reporting identifies developing issues before they cause failures or comfort problems.
              </p>

              <p>
                <strong className="text-orange-400">Alarm summaries</strong> consolidate all building alarms into digestible formats showing frequency, resolution times, and recurring issues. This helps identify systemic problems and maintenance priorities.
              </p>

              <p>
                <strong className="text-purple-400">Compliance reporting</strong> automatically generates documentation for regulatory requirements, energy certificates, and tenant service level agreements. This reduces administrative burden while ensuring complete records.
              </p>

              <p>
                <strong className="text-cyan-400">Custom dashboards</strong> can be configured for different stakeholders: technical detail for maintenance teams, cost focus for financial managers, or comfort metrics for facility management. Each audience gets relevant information without data overload.
              </p>

              <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
                <h4 className="font-semibold text-green-200 mb-2">Report Automation Benefits</h4>
                <p className="text-green-100 text-sm">Automated reporting ensures consistent data collection, reduces human error, provides timely alerts, and enables proactive building management by highlighting trends before they become problems.</p>
              </div>

              {/* Inline Check 2 */}
              <div className="bg-transparent/80 border border-elec-yellow/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-elec-yellow" />
                  <span className="font-semibold text-elec-yellow">Inline Check</span>
                </div>
                <p className="text-white mb-3">How do auto-reporting systems benefit building management?</p>
                <Button
                  onClick={() => setInlineCheck2(!inlineCheck2)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
                >
                  {inlineCheck2 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck2 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Auto-reporting provides consistent data collection, reduces manual workload, ensures timely alerts, enables proactive management, eliminates human error in report generation, and delivers tailored information to different stakeholders without overwhelming them with irrelevant data.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Electrician's Role */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-elec-yellow" />
                Electrician's Role in Automation Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Reliable automation depends on <strong className="text-elec-yellow">accurate, stable data inputs</strong>. Your installation work provides the foundation that allows intelligent building systems to make correct decisions and generate trustworthy reports.
              </p>
              
              <p>
                <strong className="text-elec-yellow">Signal integrity</strong> is crucial for trigger reliability. Properly terminated communications cables, appropriate cable separation from power circuits, and correct earthing prevent data corruption that could cause false triggers or missed events.
              </p>

              <p>
                <strong className="text-orange-400">Power supply reliability</strong> ensures automation systems remain operational during critical events. UPS systems, proper load balancing, and backup power connections maintain automation functionality when it's most needed.
              </p>

              <p>
                <strong className="text-green-400">Sensor calibration and maintenance</strong> keeps automation accurate. Regular verification that sensors provide correct readings ensures trigger setpoints operate as designed and reports reflect true building conditions.
              </p>

              <p>
                <strong className="text-red-400">Safety integration</strong> requires understanding how automation interacts with safety systems. Fire alarm inputs, emergency stops, and security systems must be wired to override automation when safety takes priority.
              </p>

              <p>
                <strong className="text-purple-400">Documentation accuracy</strong> supports troubleshooting and modifications. As-built drawings, cable schedules, and I/O lists enable efficient diagnosis when automation doesn't behave as expected.
              </p>

              {/* Inline Check 3 */}
              <div className="bg-transparent/80 border border-elec-yellow/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-elec-yellow" />
                  <span className="font-semibold text-elec-yellow">Inline Check</span>
                </div>
                <p className="text-white mb-3">Why is signal integrity important for automation systems?</p>
                <Button
                  onClick={() => setInlineCheck3(!inlineCheck3)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
                >
                  {inlineCheck3 ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {inlineCheck3 && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded">
                    <p className="text-green-100 text-sm">
                      <strong>Answer:</strong> Signal integrity ensures automation systems receive accurate, uncorrupted data for decision-making. Poor signal integrity can cause false triggers, missed events, incorrect automation responses, and unreliable reports, potentially compromising building safety, comfort, and efficiency.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Best Practices for Supporting Automation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-elec-yellow flex items-center gap-2">
                    <CheckSquare className="h-4 w-4" />
                    Installation Quality
                  </h4>
                  <ul className="text-sm space-y-2 pl-6">
                    <li>• Use appropriate cable types for signal and power circuits</li>
                    <li>• Maintain proper separation between data and power cables</li>
                    <li>• Ensure secure terminations to prevent loose connections</li>
                    <li>• Test all circuits before system commissioning</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-400 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    System Reliability
                  </h4>
                  <ul className="text-sm space-y-2 pl-6">
                    <li>• Install appropriate surge protection devices</li>
                    <li>• Provide dedicated UPS for critical automation components</li>
                    <li>• Label all circuits clearly for future maintenance</li>
                    <li>• Document all modifications accurately</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Commissioning Support
                  </h4>
                  <ul className="text-sm space-y-2 pl-6">
                    <li>• Verify sensor readings against known conditions</li>
                    <li>• Test automation responses during commissioning</li>
                    <li>• Confirm emergency overrides function correctly</li>
                    <li>• Validate alarm and notification systems</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-purple-400 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Ongoing Support
                  </h4>
                  <ul className="text-sm space-y-2 pl-6">
                    <li>• Maintain accurate as-built documentation</li>
                    <li>• Perform regular system health checks</li>
                    <li>• Report automation anomalies to BMS specialists</li>
                    <li>• Support system upgrades and modifications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="p-4 bg-amber-900/20 border border-amber-600 rounded-lg">
                <h4 className="font-semibold text-amber-200 mb-3">Hospital Emergency Response Automation</h4>
                <p className="text-amber-100 text-sm mb-3">
                  A major hospital implemented comprehensive event triggers for emergency response. When a fire alarm activates, the system automatically: recalls all lifts to ground floor, pressurises stairwells, switches air handling to smoke extraction mode, unlocks all security doors, and sends notifications to fire brigade and senior staff.
                </p>
                <p className="text-amber-100 text-sm mb-3">
                  <strong>The Challenge:</strong> During testing, the automation responded incorrectly - lifts went to wrong floors, some air handling units didn't switch modes, and notification delays occurred.
                </p>
                <p className="text-amber-100 text-sm mb-3">
                  <strong>The Investigation:</strong> Electricians discovered multiple issues: fire alarm contacts had been wired to wrong BMS inputs, communications cables had interference from adjacent power circuits, and some devices lacked proper surge protection causing intermittent failures.
                </p>
                <p className="text-amber-100 text-sm">
                  <strong>The Solution:</strong> Correct I/O wiring, proper cable separation, improved earthing, and comprehensive surge protection resolved all issues. The automation now provides reliable emergency response, potentially saving lives during real incidents.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-elec-yellow" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              {[
                {
                  question: "How do I test event triggers without disrupting building operations?",
                  answer: "Test during planned maintenance windows or use simulation inputs when possible. For critical safety triggers, coordinate with facility management and notify all affected parties. Use BMS override functions to prevent unwanted equipment operation during testing."
                },
                {
                  question: "What should I do if automation systems respond unexpectedly?",
                  answer: "Document the unexpected behaviour, check all relevant I/O connections and signal integrity, verify sensor readings, and consult with BMS programmers. Don't modify automation logic yourself - report issues to qualified BMS specialists for proper resolution."
                },
                {
                  question: "How often should automated reports be generated?",
                  answer: "This depends on the audience and purpose. Operational staff might need daily summaries, energy managers weekly analysis, and senior management monthly overviews. The key is providing actionable information without overwhelming users with too much data."
                },
                {
                  question: "Can event triggers interfere with each other?",
                  answer: "Yes, poorly designed trigger logic can create conflicts. For example, energy-saving triggers might conflict with comfort triggers. This is why BMS programming requires careful priority management and why electricians should understand the overall automation strategy."
                },
                {
                  question: "What documentation is essential for automation systems?",
                  answer: "Maintain accurate I/O lists, cable schedules, device locations, calibration records, and as-built drawings. Include contact details for BMS specialists and system passwords/access procedures. This documentation is crucial for troubleshooting and future modifications."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-600 rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-transparent/80 transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <span className="text-elec-yellow">
                      {faqOpen.includes(index) ? '−' : '+'}
                    </span>
                  </button>
                  {faqOpen.includes(index) && (
                    <div className="p-4 pt-0 text-gray-300 text-sm border-t border-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-transparent border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-elec-yellow mb-3">Key Concepts</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Event triggers enable intelligent automated responses to building conditions</li>
                    <li>• Auto-reporting transforms data into actionable information for stakeholders</li>
                    <li>• Trigger types include time-based, sensor-based, alarm-based, and occupancy-based</li>
                    <li>• Automation requires reliable inputs and communications to function correctly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Electrician's Responsibilities</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Ensure signal integrity through proper installation practices</li>
                    <li>• Provide reliable power supplies and appropriate protection</li>
                    <li>• Maintain accurate documentation for troubleshooting</li>
                    <li>• Support commissioning and ongoing system maintenance</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow rounded-lg">
                <p className="text-elec-yellow text-sm font-medium">
                  <strong>Remember:</strong> Your installation work is the foundation of automation reliability. Proper techniques ensure buildings respond intelligently to changing conditions and provide trustworthy information to building managers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz */}
          <SingleQuestionQuiz 
            questions={eventTriggersQuizData}
            title="Section 4 Quiz: Event Triggers and Auto-Reporting"
          />

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-stretch sm:items-center">
            <Link to="/study-centre/upskilling/bms-module-6-section-3" className="flex-1 sm:flex-initial">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Previous: Dashboards</span>
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/bms-module-6-section-5" className="flex-1 sm:flex-initial">
              <Button 
                className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <span className="truncate">Next: Section 5</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule6Section4;