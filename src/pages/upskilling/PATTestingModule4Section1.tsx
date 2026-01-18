import { ArrowLeft, Zap, CheckCircle, AlertTriangle, Clock, Settings, FileText, Shield, Wrench, HelpCircle, ChevronRight, ChevronLeft, Activity, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Earth Continuity Testing - PAT Testing Course';
const DESCRIPTION = 'Learn the principles and procedures for testing earth continuity in Class I appliances to ensure protective earthing is effective.';

const quickCheckQuestions = [
  {
    id: 'm4s1-check1',
    question: 'What is the maximum acceptable earth continuity resistance for a Class I appliance with a 5m cable?',
    options: ['0.1 + 0.1 ohms = 0.2 ohms', '0.1 + (5 x 0.1) = 0.6 ohms maximum', '1.0 ohms for all cable lengths', 'No maximum - any reading is acceptable'],
    correctIndex: 1,
    explanation: 'The maximum acceptable resistance is 0.1 ohms plus 0.1 ohms per metre of cable. For a 5m cable: 0.1 + (5 x 0.1) = 0.6 ohms maximum.'
  },
  {
    id: 'm4s1-check2',
    question: 'Why is a test current of at least 200mA (or higher) used for earth continuity testing?',
    options: ['To check if the fuse will blow', 'To verify the connection can carry significant current, not just make contact', 'To test the insulation at the same time', 'Because lower currents are dangerous'],
    correctIndex: 1,
    explanation: 'A substantial test current (200mA minimum, often 10A or 25A) ensures the earth path can actually carry protective current, not just make superficial contact. This reveals loose or corroded connections.'
  },
  {
    id: 'm4s1-check3',
    question: 'When testing earth continuity, where should the test lead be connected on a kettle?',
    options: ['The heating element terminals', 'Any exposed metal part that should be earthed', 'The live terminal in the plug', 'The cable outer sheath'],
    correctIndex: 1,
    explanation: 'The test lead connects to any exposed metal part that should be earthed - this verifies the earth bonding throughout the appliance, not just at the plug.'
  }
];

const quizQuestions = [
  { question: 'What is the primary purpose of earth continuity testing?', options: ['To check the cable is long enough', 'To verify the protective earth path has low resistance', 'To test insulation resistance', 'To measure leakage current'], correctAnswer: 1 },
  { question: 'The formula for maximum acceptable earth continuity resistance is:', options: ['0.5 ohms for all appliances', '1.0 ohms + cable length', '0.1 ohms + (0.1 ohms x cable length in metres)', 'Depends on the appliance wattage'], correctAnswer: 2 },
  { question: 'Class I appliances rely on which safety mechanism?', options: ['Double insulation only', 'Reduced voltage supply', 'Protective earth connection', 'Sealed construction'], correctAnswer: 2 },
  { question: 'What test current is typically used for earth continuity testing?', options: ['10-25A DC or AC', '1mA test signal', '230V mains voltage', 'Variable depending on fuse rating'], correctAnswer: 0 },
  { question: 'A high earth continuity reading could indicate:', options: ['The appliance is safe to use', 'A loose or corroded earth connection', 'The insulation is damaged', 'The fuse needs replacing'], correctAnswer: 1 },
  { question: 'Which appliances require earth continuity testing?', options: ['Class I appliances only', 'Class II appliances only', 'All portable appliances', 'Only appliances over 1kW'], correctAnswer: 0 },
  { question: 'Where should the earth probe be placed during testing?', options: ['On the live terminal', 'On the neutral terminal', 'On exposed metalwork that should be earthed', 'On the cable outer sheath'], correctAnswer: 2 },
  { question: 'If an earth reading is 0.15 ohms on a 2m cable, the result is:', options: ['Fail - too high', 'Pass - within acceptable limits', 'Borderline - needs investigation', 'Cannot determine without more information'], correctAnswer: 1 },
  { question: 'The test current for earth continuity must be:', options: ['Less than 1mA for safety', 'At least 200mA (typically 10A or 25A)', 'Equal to the fuse rating', 'Exactly 230V'], correctAnswer: 1 },
  { question: 'What should you check before performing earth continuity test?', options: ['That the appliance is plugged in and switched on', 'That the appliance is disconnected from mains supply', 'That the room is well ventilated', 'That you are wearing rubber gloves'], correctAnswer: 1 }
];

const faqs = [
  { question: 'Why do some testers use 10A or 25A test current?', answer: 'Higher test currents more effectively reveal high-resistance joints, loose connections, or corroded terminals that might pass with lower currents. The brief high current simulates fault conditions.' },
  { question: 'Can I test earth continuity with a multimeter?', answer: 'A standard multimeter can give a basic resistance reading, but it uses very low test current. Professional PAT testers use higher currents (200mA-25A) which more reliably detect poor connections.' },
  { question: 'What if the appliance has a two-core cable?', answer: 'If the appliance has only two-core cable (live and neutral, no earth), it is likely a Class II double-insulated appliance and does not require earth continuity testing.' },
  { question: 'Why is 0.1 ohms per metre used in the calculation?', answer: 'This figure accounts for the resistance of the conductor in typical flexible cables. Longer cables naturally have higher resistance, so the calculation allows for this proportionally.' },
  { question: 'What causes a high earth continuity reading?', answer: 'Common causes include: loose terminal screws, corroded connections, damaged conductors, poor crimping, dirty contact surfaces, or a break in the earth path within the appliance.' },
  { question: 'Should I test earth continuity if the plug earth pin is plastic?', answer: 'A plastic earth pin indicates a Class II appliance (double insulated). These do not require earth continuity testing as they have no protective earth conductor.' }
];

const PATTestingModule4Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="..">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module 4</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">Module 4.1</Badge>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-8 pb-24">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30 mb-4">
            <Zap className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">Earth Continuity Testing (Class I)</h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">Testing earth connections in Class I appliances</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 15 min read</span>
            <span className="hidden sm:inline">-</span>
            <span>Interactive quiz included</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Zap className="h-5 w-5" /> In 30 Seconds</h3>
            <p className="text-white/80 text-sm leading-relaxed">Earth continuity testing verifies that the protective earth path in Class I appliances has sufficiently low resistance to carry fault current safely. Maximum acceptable: 0.1 ohms + 0.1 ohms per metre of cable.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/30 p-5">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Spot It / Use It</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>- Connect tester between earth pin and exposed metalwork</li>
              <li>- Test current: 200mA minimum (typically 10A or 25A)</li>
              <li>- Max resistance: 0.1 + (0.1 x cable length in metres)</li>
              <li>- Test all accessible earthed metalwork</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Explain why earth continuity testing is essential for Class I appliances', 'Describe the test procedure and connection points', 'Calculate maximum acceptable resistance values', 'Identify common causes of high resistance readings', 'Interpret test results correctly', 'Recognise when earth continuity testing is not required'].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3 text-white/80 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center font-medium">{i + 1}</span>
                {outcome}
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">01</span>
            <h2 className="text-xl font-bold text-white">Why Earth Continuity Matters</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Class I appliances rely on a protective earth connection as their primary safety mechanism. If an internal fault causes the metal casing to become live, the earth connection provides a low-resistance path for fault current to flow, causing the protective device (fuse or MCB) to operate quickly.</p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-red-400" /><h4 className="text-red-400 font-semibold">Safety Critical</h4></div>
              <p className="text-white/80 text-sm">A high-resistance earth connection may not allow enough fault current to flow to operate protective devices quickly. This could leave a user in contact with a dangerous voltage for an extended period.</p>
            </div>
            <p>Earth continuity testing verifies that:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>The earth conductor in the cable is intact and correctly connected</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>All exposed metalwork is properly bonded to earth</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>The resistance is low enough to allow sufficient fault current</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Connections are secure, not loose or corroded</span></li>
            </ul>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-bold text-white">Test Procedure</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>The earth continuity test measures the resistance of the earth path from the plug earth pin to exposed metalwork on the appliance:</p>
            <div className="space-y-4">
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">1</div><div><h4 className="text-white font-semibold">Preparation</h4><p className="text-white/70 text-sm mt-1">Ensure the appliance is disconnected from mains supply. Visually inspect the plug, cable, and appliance for obvious damage.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">2</div><div><h4 className="text-white font-semibold">Connect the Tester</h4><p className="text-white/70 text-sm mt-1">Insert the plug into the PAT tester socket. Connect the test probe lead to the tester if required.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">3</div><div><h4 className="text-white font-semibold">Apply Test Probe</h4><p className="text-white/70 text-sm mt-1">Touch the test probe to exposed metal parts that should be earthed (casing, handles, control panels). The tester applies current and measures resistance.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">4</div><div><h4 className="text-white font-semibold">Record Results</h4><p className="text-white/70 text-sm mt-1">Note the resistance reading. Test multiple points if the appliance has several exposed metal areas.</p></div></div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2"><Gauge className="h-5 w-5" /> Test Current</h4>
              <p className="text-white/70 text-sm">Professional PAT testers use test currents of 10A or 25A (for a short duration) or a minimum of 200mA. Higher currents more effectively reveal poor connections that might pass with low-current testing.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-bold text-white">Acceptable Resistance Values</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>The maximum acceptable earth continuity resistance depends on the cable length:</p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Maximum Resistance Formula</h4>
              <p className="text-white text-lg font-mono">R(max) = 0.1 + (0.1 x L) ohms</p>
              <p className="text-white/70 text-sm mt-2">Where L = cable length in metres</p>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-white/20"><th className="text-left py-3 px-2 text-white font-semibold">Cable Length</th><th className="text-center py-3 px-2 text-white font-semibold">Maximum Resistance</th><th className="text-left py-3 px-2 text-white font-semibold">Calculation</th></tr></thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/10"><td className="py-3 px-2">1 metre</td><td className="text-center py-3 px-2">0.2 ohms</td><td className="py-3 px-2">0.1 + (0.1 x 1)</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">2 metres</td><td className="text-center py-3 px-2">0.3 ohms</td><td className="py-3 px-2">0.1 + (0.1 x 2)</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">5 metres</td><td className="text-center py-3 px-2">0.6 ohms</td><td className="py-3 px-2">0.1 + (0.1 x 5)</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">10 metres</td><td className="text-center py-3 px-2">1.1 ohms</td><td className="py-3 px-2">0.1 + (0.1 x 10)</td></tr>
                  <tr><td className="py-3 px-2">15 metres</td><td className="text-center py-3 px-2">1.6 ohms</td><td className="py-3 px-2">0.1 + (0.1 x 15)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-green-400 font-medium mb-2">Practical Tip</h4>
              <p className="text-white/70 text-sm">Most household appliances with short cables (1-2m) should read well under 0.3 ohms. Readings above this for short cables indicate a problem that needs investigation.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-bold text-white">Common Causes of High Readings</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>When earth continuity readings are higher than expected, investigate these common causes:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Connection Problems</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Loose terminal screws in plug</li>
                  <li>- Corroded connections</li>
                  <li>- Poor crimping of terminals</li>
                  <li>- Damaged conductor strands</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">Cable Issues</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Partially broken earth conductor</li>
                  <li>- Internal damage not visible externally</li>
                  <li>- Wrong cable type for application</li>
                  <li>- Excessively long cable run</li>
                </ul>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Appliance Faults</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Internal earth connection broken</li>
                  <li>- Bonding wire disconnected</li>
                  <li>- Corrosion on earth points</li>
                  <li>- Manufacturing defect</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Testing Errors</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Poor probe contact</li>
                  <li>- Paint or coating on test point</li>
                  <li>- Dirty contact surfaces</li>
                  <li>- Faulty test leads</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">05</span>
            <h2 className="text-xl font-bold text-white">When Earth Continuity Testing is Not Required</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Not all appliances require earth continuity testing:</p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2"><Shield className="h-5 w-5" /> Class II (Double Insulated) Appliances</h4>
              <p className="text-white/70 text-sm mb-2">These have two-core cables and plastic earth pins. They rely on double insulation rather than earth protection.</p>
              <p className="text-white/70 text-sm">Identified by the double square symbol on the rating plate.</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-semibold mb-2">Class III (SELV) Appliances</h4>
              <p className="text-white/70 text-sm">These operate at safety extra-low voltage (typically via a transformer) and do not require earth protection.</p>
            </div>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-medium mb-2">Quick Identification</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Metal earth pin on plug = Class I = Requires earth test</li>
                <li>- Plastic earth pin on plug = Class II = No earth test needed</li>
                <li>- Three-core cable = Class I = Requires earth test</li>
                <li>- Two-core cable = Usually Class II = No earth test needed</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><Wrench className="h-5 w-5 text-elec-yellow" /> Practical Guidance</h2>
          <div className="grid gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h3 className="text-green-400 font-semibold mb-3">Best Practice Tips</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Test multiple points on appliances with large metal areas</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Ensure good probe contact - clean test points if necessary</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Measure cable length accurately for resistance calculation</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Record the reading and cable length for reference</span></li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-400 font-semibold mb-3">Common Mistakes to Avoid</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Testing on painted or coated surfaces without cleaning</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Using incorrect cable length in the calculation</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Testing Class II appliances for earth continuity</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Ignoring borderline readings without investigation</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><HelpCircle className="h-5 w-5 text-elec-yellow" /> Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors list-none">
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ChevronRight className="h-5 w-5 text-white/50 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: Earth Continuity</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Test Requirements</h4><ul className="text-white/80 space-y-1"><li>- Test current: 200mA min (10A/25A typical)</li><li>- Apply to exposed metalwork</li><li>- Test from plug earth pin</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Maximum Resistance</h4><ul className="text-white/80 space-y-1"><li>- Formula: 0.1 + (0.1 x L) ohms</li><li>- L = cable length in metres</li><li>- Short cables: typically less than 0.3 ohms</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Class I Identification</h4><ul className="text-white/80 space-y-1"><li>- Metal earth pin in plug</li><li>- Three-core cable</li><li>- Metal casing or parts</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Fail Actions</h4><ul className="text-white/80 space-y-1"><li>- Check connections in plug</li><li>- Inspect cable for damage</li><li>- Check internal bonding</li></ul></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 4.1 Quiz</h2>
          <p className="text-white/60">Test your understanding of earth continuity testing.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m4s1" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../../pat-testing/module-3/section-5" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Risk-Based Intervals
            </Button>
          </Link>
          <Link to="../section-2" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Insulation Resistance <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule4Section1;
