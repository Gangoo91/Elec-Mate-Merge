import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, Info, Settings, Wrench, BookOpen, AlertCircle, Lightbulb, Clock, Bell, Activity, Database, Users, Smartphone, AlertTriangle, Play, Pause, RotateCcw, CheckSquare, Zap, Eye, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule6Section5Quiz } from '@/data/upskilling/bmsModule6Section5Quiz';

const BMSModule6Section5 = () => {
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8">
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-elec-yellow" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Integration with Fire Panels and Emergency Shutdowns
                </h1>
                <p className="text-xl text-white">
                  Safety system integration for life-critical emergency response
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-elec-yellow text-black">
                Module 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 5
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                In an emergency, safety always takes precedence over efficiency or comfort. That's why a Building Management System (BMS) must integrate seamlessly with fire panels and emergency shutdown systems. When a fire alarm is triggered, the BMS must instantly override normal operation, shutting down equipment that could spread smoke and unlocking exit routes.
              </p>
              <p>
                For electricians, this integration is safety-critical. If alarm inputs, relays, or interlocks are miswired, doors may stay locked during a fire, or ventilation systems may continue circulating smoke — both potentially life-threatening failures.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Explain why BMS and fire panels must be integrated.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Describe the key shutdown actions triggered during a fire alarm.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Recognise the electrician's responsibilities in wiring interlocks and safety relays.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Apply best practices for installation, labelling, and testing of safety-critical circuits.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Why Integration Matters */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Why Integration Matters</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>Fire panels are designed for life safety, but they need the BMS to act on their signals:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-transparent rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-elec-yellow">Ventilation Control</h4>
                  </div>
                  <p className="text-sm">Air Handling Units (AHUs) and fans must shut down to prevent smoke spread through the building's ventilation system.</p>
                </div>
                <div className="p-4 bg-transparent rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Bell className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-elec-yellow">Smoke Control</h4>
                  </div>
                  <p className="text-sm">Smoke extract fans and dampers must activate to clear escape routes and maintain safe egress paths.</p>
                </div>
                <div className="p-4 bg-transparent rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-elec-yellow">Access Control</h4>
                  </div>
                  <p className="text-sm">Fire alarm signals unlock all exit doors and turnstiles to enable rapid evacuation without access cards.</p>
                </div>
                <div className="p-4 bg-transparent rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-elec-yellow">Plant Shutdown</h4>
                  </div>
                  <p className="text-sm">Boilers, chillers, and gas supplies may be isolated to reduce fire hazards and prevent fuel sources.</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-elec-yellow" />
                    <span className="font-semibold text-elec-yellow">Inline Check 1</span>
                  </div>
                  <Button
                    onClick={() => setInlineCheck1(!inlineCheck1)}
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-elec-yellow hover:bg-elec-yellow hover:text-white"
                  >
                    {inlineCheck1 ? 'Hide' : 'Show'} Answer
                  </Button>
                </div>
                <p className="text-white mt-2">👉 Why must AHUs and fans be shut down during a fire alarm event?</p>
                {inlineCheck1 && (
                  <div className="mt-3 p-3 bg-blue-800/30 rounded border border-elec-yellow">
                    <p className="text-blue-200 text-sm">
                      <strong>Answer:</strong> AHUs and fans must be shut down to prevent the ventilation system from circulating smoke throughout the building, which could make evacuation routes impassable and spread fire/smoke to unaffected areas.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Fire-BMS Interface Types */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Typical Fire-BMS Interfaces</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>Understanding the different types of connections between fire panels and BMS:</p>
              
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-2">Digital Inputs</h4>
                      <p>Fire panel provides a contact signal to BMS (alarm activated). These are typically volt-free contacts that close or open on alarm activation.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                  <div className="flex items-start gap-3">
                    <Settings className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-2">Relays/Interlocks</h4>
                      <p>BMS relays cut power to AHUs, dampers, or plant equipment. These must be rated for the loads they control and fire-rated where required.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                  <div className="flex items-start gap-3">
                    <Smartphone className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-2">Override Logic</h4>
                      <p>BMS software forces emergency mode, ignoring normal schedules or setpoints. This ensures safety takes priority over comfort or efficiency.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-2">Feedback to Fire Panel</h4>
                      <p>BMS may report back status (e.g., fan stopped, damper open) to confirm actions have been completed successfully.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-elec-yellow" />
                    <span className="font-semibold text-elec-yellow">Inline Check 2</span>
                  </div>
                  <Button
                    onClick={() => setInlineCheck2(!inlineCheck2)}
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-elec-yellow hover:bg-elec-yellow hover:text-white"
                  >
                    {inlineCheck2 ? 'Hide' : 'Show'} Answer
                  </Button>
                </div>
                <p className="text-white mt-2">👉 What type of signal is typically used by a fire panel to trigger BMS responses?</p>
                {inlineCheck2 && (
                  <div className="mt-3 p-3 bg-blue-800/30 rounded border border-elec-yellow">
                    <p className="text-blue-200 text-sm">
                      <strong>Answer:</strong> Digital contact signals (dry contacts) are typically used. These are simple volt-free contacts that open or close to indicate alarm activation, providing a reliable and fail-safe interface.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Shutdowns Beyond Fire */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Emergency Shutdowns Beyond Fire</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>BMS emergency shutdowns aren't limited to fire alarms. Other critical situations require immediate response:</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <h4 className="font-semibold text-red-400">Gas Leaks</h4>
                  </div>
                  <p>Gas detection systems trigger BMS shutdown of boilers, ignition sources, and gas supply valves. Ventilation may be activated to disperse gas safely.</p>
                </div>
                
                <div className="p-4 bg-orange-900/20 border border-orange-600 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-orange-400" />
                    <h4 className="font-semibold text-orange-400">Electrical Faults</h4>
                  </div>
                  <p>Overcurrent or earth fault relays trip plant to prevent damage or fire risk. Arc fault detection can trigger immediate isolation of electrical systems.</p>
                </div>
                
                <div className="p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-elec-yellow">Critical Plant Safety</h4>
                  </div>
                  <p>High pressure/temperature trips isolate boilers, chillers, or pumps. These protect equipment and prevent catastrophic failures that could endanger occupants.</p>
                </div>
                
                <div className="p-4 bg-purple-900/20 border border-purple-600 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Wrench className="h-5 w-5 text-purple-400" />
                    <h4 className="font-semibold text-purple-400">Water System Failures</h4>
                  </div>
                  <p>Major water leaks can trigger pump shutdowns and isolation valve closure to prevent flooding and electrical hazards.</p>
                </div>
              </div>
              
              <p className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                <strong>Key Point:</strong> These shutdowns protect both people and equipment, often preventing minor incidents from becoming major emergencies.
              </p>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-elec-yellow" />
                    <span className="font-semibold text-elec-yellow">Inline Check 3</span>
                  </div>
                  <Button
                    onClick={() => setInlineCheck3(!inlineCheck3)}
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-elec-yellow hover:bg-elec-yellow hover:text-white"
                  >
                    {inlineCheck3 ? 'Hide' : 'Show'} Answer
                  </Button>
                </div>
                <p className="text-white mt-2">👉 Give one example of a non-fire event that would require a BMS emergency shutdown.</p>
                {inlineCheck3 && (
                  <div className="mt-3 p-3 bg-blue-800/30 rounded border border-elec-yellow">
                    <p className="text-blue-200 text-sm">
                      <strong>Answer:</strong> Gas leak detection would require immediate BMS shutdown of boilers, gas supply valves, and ignition sources to prevent explosion risk. Other examples include electrical faults, high pressure trips, or major water leaks.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Wrench className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Practical Installation Guidance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-elec-yellow flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Installing Fire-BMS Interlocks
                </h3>
                <div className="space-y-4">
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-400 mb-1">Use Fail-Safe Design</h4>
                        <p>Normally-closed (NC) wiring ensures broken circuits still generate a fire signal. If a wire breaks or connection fails, the system assumes an alarm condition rather than failing silently.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-elec-yellow mb-1">Segregate Cabling</h4>
                        <p>Run fire alarm wiring separately from standard BMS cabling. Use fire-rated cables in dedicated conduits or cable trays to maintain integrity during emergencies.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-purple-400 mb-1">Use Approved Interfaces</h4>
                        <p>Only use fire-rated relays and interfaces tested for life-safety applications. Check compliance with BS EN 12101 and other relevant safety standards.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-elec-yellow mb-1">Clear Labelling</h4>
                        <p>Identify fire-related cabling and relays distinctly from standard controls. Use red labels or cable markers stating "FIRE SYSTEM - DO NOT DISCONNECT".</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-orange-400 mb-1">Document Everything</h4>
                        <p>Provide detailed drawings showing every fire-to-BMS link for clients and fire officers. Include cable schedules, relay contact details, and testing procedures.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-elec-yellow flex items-center gap-2">
                  <CheckSquare className="h-5 w-5" />
                  Commissioning Emergency Shutdowns
                </h3>
                <div className="space-y-4">
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <Play className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-400 mb-1">Simulate Alarm Conditions</h4>
                        <p>Trigger fire panel alarms during commissioning using test buttons or simulation modes. Test all alarm zones and types (smoke, heat, manual call points).</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <Activity className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-elec-yellow mb-1">Verify BMS Response</h4>
                        <p>Confirm AHUs shut down, dampers open/close correctly, doors release, and plant isolates as designed. Use BMS graphics to monitor responses in real-time.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-purple-400 mb-1">Test Feedback Systems</h4>
                        <p>Ensure the fire panel receives confirmation signals where required. Test that status feedback is accurate and timely.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-600 rounded-lg p-4 bg-transparent">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-400 mb-1">Joint Sign-Off</h4>
                        <p>Always carry out joint testing with fire safety authorities, building control, and end users. Document all tests with witnessed signatures.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-600">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <CardTitle className="text-white text-xl">Real World Example: Retail Complex Fire Integration Failure</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/30 p-4 rounded-lg border border-red-500">
                <h4 className="font-semibold text-red-300 mb-2">The Problem</h4>
                <p>
                  During commissioning at a large retail complex, fire tests revealed a critical safety failure. When the fire alarm was activated in multiple zones, several Air Handling Units (AHUs) continued running at full speed, potentially circulating smoke throughout the building.
                </p>
              </div>
              
              <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500">
                <h4 className="font-semibold text-orange-300 mb-2">Investigation</h4>
                <p>
                  Electricians systematically traced the fire panel connections and discovered that the fire panel's relay outputs had been wired into the wrong BMS input terminals. The signals were reaching the BMS, but being interpreted as normal operational commands rather than emergency shutdowns.
                </p>
              </div>
              
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500">
                <h4 className="font-semibold text-green-300 mb-2">The Solution</h4>
                <p>
                  After careful rewiring to the correct emergency input terminals and updating the BMS software logic, comprehensive re-testing confirmed all AHUs correctly shut down within seconds of fire alarm activation. Door release systems also operated correctly.
                </p>
              </div>
              
              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500">
                <h4 className="font-semibold text-purple-300 mb-2">Key Lessons Learned</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Miswired interlocks can directly compromise life safety</li>
                  <li>Complete system testing is essential before handover</li>
                  <li>Clear labelling and documentation prevent installation errors</li>
                  <li>Emergency systems must be tested under realistic conditions</li>
                  <li>Joint commissioning with fire authorities catches critical issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white">
              <div className="space-y-4">
                {[
                  {
                    question: "What happens if fire cabling is damaged during normal operation?",
                    answer: "If properly wired using fail-safe (normally-closed) contacts, damaged fire cabling will trigger an alarm condition, alerting operators to the fault and maintaining safety integrity. The system fails to a safe state rather than failing silently."
                  },
                  {
                    question: "Can BMS override fire panel commands during an emergency?",
                    answer: "No, fire panel commands must have ultimate priority. BMS systems should be designed so fire signals cannot be overridden by normal building control logic. Emergency override takes precedence over all other functions."
                  },
                  {
                    question: "How often should fire-BMS integration be tested?",
                    answer: "Fire-BMS integration should be tested during initial commissioning, annually as part of fire system maintenance, after any modifications to either system, and following any building alterations that affect fire safety systems."
                  },
                  {
                    question: "What documentation is required for fire-BMS connections?",
                    answer: "Complete wiring diagrams, input/output schedules, testing certificates, operation manuals, and as-built drawings must be provided to building owners and fire authorities. This documentation is legally required in most jurisdictions."
                  },
                  {
                    question: "Who can work on fire-BMS integration systems?",
                    answer: "Only qualified electricians with appropriate fire system training should work on these connections. Many jurisdictions require specific certifications for fire system work, and some connections must be witnessed by fire authorities."
                  },
                  {
                    question: "What happens if the BMS fails during a fire alarm?",
                    answer: "Critical safety functions like door release should have independent backup systems. Fire dampers should fail to their safe position (typically closed for fire dampers, open for smoke dampers), and plant shutdowns should be hardwired where possible."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border border-gray-600 rounded-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-transparent transition-colors"
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      <span className={`transform transition-transform ${faqOpen.includes(index) ? 'rotate-180' : ''}`}>
                        ⌄
                      </span>
                    </button>
                    {faqOpen.includes(index) && (
                      <div className="px-4 pb-4">
                        <p className="text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-600">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <CardTitle className="text-white text-xl">Section Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">BMS must integrate with fire panels to perform critical shutdowns</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Actions include AHU shutdown, smoke extract activation, access door release</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Emergency shutdowns also triggered by gas leaks, electrical faults</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Electricians must install fail-safe wiring and approved devices</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Thorough testing and documentation is essential</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Joint commissioning with fire authorities is mandatory</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extended Content */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">UK Regulatory Standards & Technical Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                Fire safety integration in the UK must comply with several critical regulatory standards. BS EN 12101 covers smoke and heat control systems, specifying requirements for powered smoke control systems and natural smoke exhaust ventilators that are essential for BMS integration. Building Regulations Approved Document B provides comprehensive guidance on fire safety design, means of escape, and fire spread limitations, defining specific requirements for emergency lighting and alarm system integration that electricians must understand and implement correctly.
              </p>
              
              <p>
                BS 5839 specifies the design, installation, and maintenance requirements for fire detection and alarm systems, making it critical for understanding interface requirements between fire panels and building management systems. The 18th Edition Wiring Regulations (BS 7671) define electrical installation standards including emergency circuits, fire-rated cables, and safety system requirements that apply to all BMS-fire panel interconnections. All fire-BMS integrations must be certified by competent persons and witnessed by building control or fire service where required, as non-compliance can result in building closure and serious legal liability for contractors and building owners.
              </p>

              <div className="bg-yellow-600/20 border border-yellow-600 rounded-lg p-4">
                <p className="text-yellow-100">
                  <strong>Technical Implementation:</strong> Fire panel outputs are typically 24V DC systems, requiring careful consideration of BMS input compatibility. Fire-rated cables (PH30, PH60, or PH120 rated) must be used for critical fire system connections, with minimum 300mm separation from power cables using separate containment systems. Relay contacts must be properly rated to handle the full load current of controlled equipment plus appropriate safety margins to prevent failure during emergency conditions.
                </p>
              </div>

              <p>
                Common installation faults include connecting BMS inputs to standard rather than emergency terminals, using undersized relay contacts that fail under load conditions, and installing non-fire-rated cables that degrade during emergency situations. Diagnostic procedures should include quarterly loop impedance testing on fire circuits, monitoring relay contact resistance and operating times, annual verification of cable insulation resistance, and regular testing of emergency override logic under simulated alarm conditions. A comprehensive preventive maintenance schedule should include monthly visual inspections, quarterly full integration tests, and annual complete system commissioning with witness testing by relevant authorities.
              </p>
            </CardContent>
          </Card>

          {/* Real-World Learning */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Real-World Applications & Learning Scenarios</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p>
                In hospital critical care units, fire-BMS integration becomes particularly complex because life support systems cannot be immediately shut down during a fire alarm without potentially endangering patients. The solution involves programming the BMS with time-delayed shutdown sequences where non-critical systems shut down immediately, but essential life support equipment maintains operation for a predetermined period (typically 10 minutes) to allow safe patient transfer to alternative locations. This demonstrates how different building types require customised emergency response strategies that go far beyond standard shutdown procedures.
              </p>

              <p>
                Data centres present unique challenges where fire suppression system activation must be balanced with server cooling requirements to prevent thermal damage during emergency shutdown. Successful implementations use intelligent BMS logic to provide gradual cooling system shutdown with emergency backup power maintaining critical cooling during suppression system discharge. The key learning here is that high-value equipment requires sophisticated shutdown sequences to prevent secondary damage from the emergency response actions themselves.
              </p>

              <p>
                Chemical manufacturing facilities demonstrate the most complex integration requirements, where BMS must coordinate with fire panels, gas detection systems, and process control systems using redundant communication links and hardwired backup interlocks. These installations typically feature multiple detection systems (smoke, heat, gas) with different BMS responses, staged shutdowns to prevent process instability and secondary hazards, automatic restart inhibition until manual safety confirmation, and comprehensive documentation with regular witness testing by multiple authorities including fire service, HSE, and environmental agencies.
              </p>

              <div className="bg-red-600/20 border border-red-600 rounded-lg p-4">
                <p className="text-red-100">
                  <strong>Critical Learning Point:</strong> The retail complex case study highlighted how miswired fire panel connections can create life-threatening situations where Air Handling Units continue running during a fire alarm, potentially circulating smoke throughout the building. This emphasises why complete system testing under realistic conditions is absolutely essential before handover, and why clear labelling and documentation are not just good practice but critical safety requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckSquare className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Knowledge Check Quiz</CardTitle>
              </div>
              <p className="text-white mt-2">Test your understanding of fire panel integration and emergency shutdown systems. You need to score 70% or higher to pass.</p>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule6Section5Quiz} 
                title="Fire Panel Integration Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/bms-module-6-section-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/bms-module-6-section-6">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600">
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

export default BMSModule6Section5;