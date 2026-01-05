import { ArrowLeft, ArrowRight, AlertTriangle, Target, CheckCircle, Info, Shield, Wrench, BookOpen, AlertCircle, Lightbulb, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule6Section1QuizData } from '@/data/upskilling/bmsModule6Section1QuizData';

const BMSModule6Section1 = () => {
  const [inlineCheck1, setInlineCheck1] = useState(false);
  const [inlineCheck2, setInlineCheck2] = useState(false);
  const [inlineCheck3, setInlineCheck3] = useState(false);

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
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Alarm Priorities and Escalation Logic
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-white max-w-4xl leading-relaxed">
            Alarm management and escalation procedures for Building Management Systems
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
              Module 6.1
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
              30 minutes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
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
                A Building Management System (BMS) is not just about efficiency — it is also about <strong className="text-yellow-400">safety and reliability</strong>. Alarms notify operators when conditions deviate from set limits, whether it's a rise in temperature, a failed fan, or a fire alarm trigger.
              </p>
              <p>
                However, <strong className="text-yellow-400">not all alarms are equally important</strong>. A system that treats every event the same will overwhelm operators with false or low-level alerts.
              </p>
        <div className="grid grid-cols-1 gap-4 mt-6">
          <div className="p-3 sm:p-4 bg-card border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Problem
            </h4>
            <p className="text-white text-sm">Systems without alarm priorities overwhelm operators with noise, potentially masking critical safety issues.</p>
          </div>
          
          <div className="p-3 sm:p-4 bg-card border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Solution
            </h4>
            <p className="text-white text-sm">Alarm priorities and escalation ensure critical alerts receive immediate attention while minor issues are logged appropriately.</p>
          </div>
        </div>
              <p>
                For electricians, this means ensuring alarm signals are wired correctly, relays are functioning, and devices trigger alarms in line with design intent.
              </p>
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
                  <span>Explain the purpose of alarm priorities in a BMS</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Describe escalation logic and why it is critical</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Recognise the electrician's role in installing and testing alarm signals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Apply best practices for ensuring alarm reliability and clarity</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 1: Alarm Priorities */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Alarm Priorities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Alarms are categorised by severity to help operators respond appropriately. Think of it like a hospital triage system - the most serious cases get immediate attention while less urgent matters can wait.
              </p>
              
              <p>
                <strong className="text-red-400">Critical alarms (High Priority)</strong> are for life safety or system protection issues that require immediate action. These include fire alarms, boiler overpressure, or chiller failures that could endanger people or cause major damage. When you see a critical alarm, everything else stops - this is your top priority.
              </p>

              <p>
                <strong className="text-orange-400">Major alarms (Medium Priority)</strong> indicate significant issues that impact comfort or efficiency and require prompt attention. An AHU fan failure or high CO₂ levels in a lecture theatre fall into this category. These won't kill anyone immediately, but they need addressing within hours to prevent bigger problems.
              </p>

              <p>
                <strong className="text-yellow-400">Minor alarms (Low Priority)</strong> are typically maintenance-related issues that can be logged for later service. A filter dirty warning or low battery in a sensor are examples. These can usually wait until your next planned maintenance visit.
              </p>

              <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-2">Example in Practice</h4>
                <p className="text-blue-100 text-sm">A fire alarm should override everything else. A "filter dirty" warning should not distract operators from responding to a fire.</p>
              </div>

              {/* Inline Check 1 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 Why must alarms be prioritised instead of treating all events the same?</p>
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
                      <strong>Answer:</strong> Without prioritisation, operators become overwhelmed with low-level alerts and false alarms, potentially causing them to miss critical safety issues that require immediate action. Prioritisation ensures the most important alarms receive prompt attention while less urgent issues are handled appropriately.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Escalation Logic */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-yellow-400" />
                Escalation Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Escalation is like a safety net for your alarm system. It ensures that if an alarm is not acknowledged or acted upon, it automatically gets pushed to higher levels of responsibility until someone deals with it.
              </p>
              
              <p>
                Here's how it typically works: <strong className="text-yellow-400">First level</strong> - the alarm appears on the BMS dashboard for the operator to see. If they don't acknowledge it within a set time (usually 15-30 minutes), it moves to <strong className="text-orange-400">second level</strong> - escalated to the supervisor or maintenance team via SMS or email.
              </p>

              <p>
                For critical alarms, there's often a <strong className="text-red-400">third level</strong> where the alarm escalates further to security, fire brigade, or site management. This creates a chain of accountability that prevents important issues from being forgotten or ignored.
              </p>

              <p>
                The beauty of escalation is that it creates accountability throughout the organisation. No one can claim they "didn't know" about a critical issue because the system keeps pushing it up the chain until someone takes action.
              </p>

              {/* Inline Check 2 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 What is the purpose of escalation in alarm management?</p>
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
                      <strong>Answer:</strong> Escalation ensures that alarms are not ignored by pushing unacknowledged alerts to higher responsibility levels (supervisors, maintenance teams, management) until the issue is resolved. This creates accountability and prevents critical issues from being overlooked.
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
                Electrician's Role in Alarm Circuits
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>As an electrician, your role in alarm systems is absolutely critical for ensuring reliable operation. You're not just connecting wires - you're creating the nervous system that keeps buildings and people safe.</p>
              
              <p>
                <strong className="text-yellow-400">Correct wiring</strong> is your foundation. You need to properly wire both digital and analog inputs that trigger alarms. A loose connection or wrong terminal can mean the difference between a system that protects and one that fails when needed most.
              </p>

              <p>
                <strong className="text-green-400">Testing and commissioning</strong> is where you prove your work. Test every relay and interlock to ensure alarm signals actually reach the BMS. Don't just check continuity - simulate real fault conditions to verify the entire signal path works under actual operating conditions.
              </p>

              <p>
                <strong className="text-yellow-400">Clear labelling</strong> might seem basic, but it's vital. Label alarm circuits clearly as fire, fault, or status to avoid confusion. During an emergency at 3am, clear labels help technicians quickly identify the right circuit without guessing or checking drawings.
              </p>

              <p>
                <strong className="text-purple-400">Commissioning support</strong> means helping validate the system by simulating alarm conditions. Trip a fan overload, simulate an overheat condition, or disconnect a sensor to check that the BMS responds correctly. This testing ensures the cause and effect logic works as designed.
              </p>

              {/* Inline Check 3 */}
              <div className="bg-card/80 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Inline Check</span>
                </div>
                <p className="text-white mb-3">👉 Why should alarm circuits always be clearly labelled?</p>
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
                      <strong>Answer:</strong> Clear labelling prevents confusion between different alarm types (fire, fault, status) during installation, maintenance, and troubleshooting. This ensures correct connections and helps technicians quickly identify circuits during emergency repairs or system modifications.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Alarm Management Advanced Concepts */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Advanced Alarm Management Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Modern alarm systems can suffer from several common problems that you should understand as an electrician working with BMS installations.
              </p>
              
              <p>
                <strong className="text-red-400">Alarm flooding</strong> occurs when multiple alarms trigger simultaneously, overwhelming operators and masking the root cause. This is prevented through suppression logic and proper alarm delay settings.
              </p>

              <p>
                <strong className="text-orange-400">Nuisance alarms</strong> are false alarms triggered by sensor drift, poor calibration, or environmental factors. Regular calibration, proper sensor selection, and alarm deadbands are the solutions.
              </p>

              <p>
                <strong className="text-yellow-400">Alarm suppression</strong> involves temporarily disabling alarms during maintenance or known system states to prevent false alarms during planned shutdowns or equipment maintenance.
              </p>

              <p>
                <strong className="text-green-400">Alarm shelving</strong> temporarily removes alarms from active monitoring while maintaining logging. This must have time limits and management approval for safety-critical alarms.
              </p>
            </CardContent>
          </Card>

          {/* Section 5: Integration with Fire Alarm Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Integration with Fire Alarm Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Fire alarm integration is critical for life safety and requires special consideration in BMS design. Fire alarm systems must comply with BS 5839 standards for detection, warning, and emergency lighting.
              </p>
              
              <p>
                Key integration points include smoke extract fan activation, HVAC system shutdown, door release mechanisms, lift recall to ground floor, and emergency lighting activation. All of these must be documented in a detailed cause and effect matrix for commissioning and maintenance.
              </p>

              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-200 mb-2">Critical Wiring Requirements</h4>
                <p className="text-yellow-100 text-sm">
                  Fire alarm cables must be fire-resistant (FP200 or equivalent), use separate containment from standard BMS cabling, ensure all connections are accessible for testing, and use monitored inputs to detect cable faults.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Troubleshooting Common Alarm Issues */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Troubleshooting Common Alarm Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Understanding common alarm problems is crucial for any electrician working with BMS systems. Most issues fall into predictable patterns that you can diagnose systematically.
              </p>
              
              <p>
                <strong className="text-red-400">When alarms don't trigger</strong>, start with the basics: check sensor wiring continuity, verify input module configuration, confirm alarm setpoints in the software, and validate sensor calibration and range. Often it's something simple like a loose terminal or incorrect configuration.
              </p>

              <p>
                <strong className="text-orange-400">Constant false alarms</strong> are usually environmental or configuration issues. Adjust alarm deadbands (typically 2-5% of span), check if the sensor is mounted in the right location, verify environmental conditions match the sensor specs, and consider adding alarm delays for transient conditions.
              </p>

              <p>
                <strong className="text-yellow-400">No escalation notifications</strong> typically means communication problems. Check the email/SMS gateway configuration, test network connectivity, verify the contact database is accurate and up-to-date, and confirm escalation timer settings are correct.
              </p>

              <p>
                <strong className="text-green-400">Alarms that won't clear</strong> usually relate to the acknowledgment process, return to normal logic, latching alarm configuration, or manual reset requirements. Check if the alarm condition has actually cleared and whether the system expects manual intervention.
              </p>
            </CardContent>
          </Card>

          {/* Section 7: Maintenance and Testing Procedures */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-yellow-400" />
                Maintenance and Testing Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Regular maintenance and testing of alarm systems is not just good practice - it's essential for ensuring they work when lives depend on them. The key is having a systematic approach that covers all aspects of the system.
              </p>
              
              <p>
                <strong className="text-yellow-400">Monthly testing</strong> should include testing all critical alarm points, verifying escalation notifications actually reach the right people, checking that the alarm acknowledgment process works properly, and reviewing alarm logs for trends that might indicate developing problems.
              </p>

              <p>
                <strong className="text-green-400">Annual testing</strong> is more comprehensive: full end-to-end alarm testing from sensor to final notification, sensor calibration verification, updating contact databases (people change jobs and phone numbers), reviewing and updating alarm priorities based on operational experience, and testing backup communication methods.
              </p>

              <div className="p-4 bg-card border border-gray-600 rounded-lg">
                <h4 className="font-semibold text-yellow-200 mb-2">Documentation Requirements</h4>
                <p className="text-white text-sm">
                  Maintain test certificates, record all alarm modifications, update cause and effect matrices, and keep escalation contact lists current. Poor documentation is often the weak link in otherwise good systems.
                </p>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">BS 7671 Compliance Note</h4>
                <p className="text-white text-sm">
                  All alarm system testing must comply with BS 7671 requirements for electrical safety. Ensure proper isolation procedures and use appropriate test equipment rated for the system voltage.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Additional Real-World Scenarios */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Additional Real-World Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Let me share some real scenarios that show how alarm priorities and escalation work in practice, and what happens when they don't.
              </p>
              
              <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                <h4 className="font-semibold text-red-200 mb-2">Office Building HVAC Failure</h4>
                <p className="text-red-100 text-sm mb-2">
                  <strong>Situation:</strong> Main AHU fails during summer heatwave, affecting 500+ occupants. Critical priority alarm triggers immediate escalation to facilities manager and HVAC contractor. Rapid response prevents overheating and maintains occupant comfort through backup systems.
                </p>
              </div>

              <p>
                <strong className="text-indigo-400">Data Centre Cooling Loss:</strong> Chiller plant failure in server room with £2M+ of IT equipment. Multi-level escalation includes IT management, facilities, and emergency cooling contractor. Temperature rise alarms at multiple thresholds allow graduated response before critical shutdown.
              </p>

              <p>
                <strong className="text-teal-400">School Fire Alarm Integration:</strong> Fire alarm activation during school hours with 800 students on site. BMS automatically shuts down HVAC, activates smoke extract, and releases doors for evacuation routes. Integration must be tested regularly to ensure life safety systems work together effectively.
              </p>
            </CardContent>
          </Card>

          {/* Section 9: Best Practices */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                Best Practices for Alarm Wiring and Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Getting alarm wiring right is fundamental to a reliable BMS. Here are the key principles you need to follow:
              </p>
              
              <p>
                <strong className="text-yellow-400">Segregation:</strong> Keep alarm wiring separate from mains to reduce interference. <strong className="text-green-400">Fail-safe wiring:</strong> Use normally-closed (NC) circuits for critical alarms so faults like broken wires generate an alarm. <strong className="text-yellow-400">Testing:</strong> Simulate real conditions during commissioning — don't just rely on dry contact testing.
              </p>

              <p>
                <strong className="text-purple-400">Documentation:</strong> Provide clear alarm lists and escalation procedures in the O&M manuals. <strong className="text-red-400">Client briefing:</strong> Train staff on how alarms appear on the BMS and what escalation steps are triggered.
              </p>

              <div className="bg-yellow-400/10 border border-yellow-400 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">During Commissioning</h4>
                <p className="text-white text-sm">
                  Trigger alarms manually, confirm correct priority display, check escalation timing, verify acknowledgment clears alarms, test fail-safe operation, validate cause and effect matrix entries, and ensure proper alarm logging.
                </p>
              </div>

              <div className="bg-green-900/20 border border-green-600 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-green-200 mb-2">Advanced Configuration Tips</h4>
                <p className="text-green-100 text-sm">
                  Use alarm deadbands (2-5% of span), implement time delays for non-critical alarms, configure different escalation paths for weekdays vs weekends, set up automatic alarm reports, and use group alarms for related equipment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                  <h4 className="font-semibold text-red-200 mb-2">The Problem</h4>
                  <p className="text-red-100 text-sm">At a hospital, a boiler fault alarm was configured as "low priority" rather than "critical." Operators ignored it during the night shift, assuming it wasn't urgent.</p>
                </div>
                
                <div className="p-4 bg-orange-900/20 border border-orange-600 rounded-lg">
                  <h4 className="font-semibold text-orange-200 mb-2">The Impact</h4>
                  <p className="text-orange-100 text-sm">By morning, the boiler had locked out, and heating was lost across several wards, affecting patient care and comfort.</p>
                </div>
                
                <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
                  <h4 className="font-semibold text-green-200 mb-2">The Solution</h4>
                  <p className="text-green-100 text-sm">After reprogramming priorities and adding escalation logic, critical plant alarms were pushed to on-call engineers' phones, preventing repeat incidents.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Alarm priorities prevent operators being overwhelmed with low-level alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Critical, major, and minor alarms must be categorised correctly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Escalation ensures unacknowledged alarms are pushed to higher responsibility levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Electricians must wire, label, and test alarm circuits to ensure reliability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Poorly configured alarms can result in dangerous oversights</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz */}
          <SingleQuestionQuiz 
            questions={bmsModule6Section1QuizData}
            title="Test Your Knowledge: Alarm Priorities and Escalation Logic"
          />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <Link to="../bms-module-6" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Module 6</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            
            <Link to="../bms-module-6-section-2" className="w-full sm:w-auto">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto"
              >
                <span className="hidden sm:inline">Next: Data Logging Methods</span>
                <span className="sm:hidden">Next: Data Logging</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule6Section1;