import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Clock, Settings, FileText, Zap, Wrench, HelpCircle, ChevronRight, ChevronLeft, Gauge, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Insulation Resistance Testing - PAT Testing Course';
const DESCRIPTION = 'Learn insulation resistance testing procedures for Class I and Class II appliances to verify electrical safety.';

const quickCheckQuestions = [
  {
    id: 'm4s2-check1',
    question: 'What test voltage is typically used for insulation resistance testing on 230V appliances?',
    options: ['50V DC', '250V DC', '500V DC', '1000V DC'],
    correctIndex: 2,
    explanation: '500V DC is the standard test voltage for insulation resistance testing on 230V mains appliances. This provides adequate stress on the insulation without causing damage.'
  },
  {
    id: 'm4s2-check2',
    question: 'What is the minimum acceptable insulation resistance for a Class I appliance?',
    options: ['0.1 megohms', '1.0 megohm', '2.0 megohms', '10 megohms'],
    correctIndex: 1,
    explanation: 'The minimum acceptable insulation resistance for Class I appliances is 1.0 megohm (1 million ohms). However, new appliances typically read much higher, often 10 megohms or more.'
  },
  {
    id: 'm4s2-check3',
    question: 'What is the minimum acceptable insulation resistance for a Class II appliance?',
    options: ['0.5 megohms', '1.0 megohm', '2.0 megohms', '5.0 megohms'],
    correctIndex: 2,
    explanation: 'Class II appliances require a minimum of 2.0 megohms because they rely entirely on insulation for protection (no earth connection). The higher standard provides additional safety margin.'
  }
];

const quizQuestions = [
  { question: 'What does insulation resistance testing measure?', options: ['Current flow through the appliance', 'Resistance of the earth conductor', 'Resistance between live parts and accessible metal/earth', 'Voltage at the plug terminals'], correctAnswer: 2 },
  { question: 'The standard test voltage for 230V appliances is:', options: ['230V AC', '250V DC', '500V DC', '1000V DC'], correctAnswer: 2 },
  { question: 'What is the minimum acceptable IR for Class I appliances?', options: ['0.5 megohms', '1.0 megohm', '2.0 megohms', '5.0 megohms'], correctAnswer: 1 },
  { question: 'What is the minimum acceptable IR for Class II appliances?', options: ['0.5 megohms', '1.0 megohm', '2.0 megohms', '5.0 megohms'], correctAnswer: 2 },
  { question: 'A reading showing infinity or OL typically indicates:', options: ['A short circuit', 'Good insulation', 'A fault to earth', 'The test has failed'], correctAnswer: 1 },
  { question: 'Low insulation resistance readings can be caused by:', options: ['New insulation materials', 'Moisture contamination', 'Proper manufacturing', 'Normal ageing'], correctAnswer: 1 },
  { question: 'Why is DC used for insulation resistance testing?', options: ['It is safer than AC', 'It does not charge capacitors', 'It gives a true resistance reading without capacitive effects', 'It is required by regulations'], correctAnswer: 2 },
  { question: 'Which terminals are connected for insulation testing on Class I?', options: ['Live to neutral only', 'Live and neutral connected together, tested to earth', 'Earth to live only', 'Neutral to earth only'], correctAnswer: 1 },
  { question: 'Before insulation testing, you should:', options: ['Connect the appliance to mains', 'Ensure the appliance is switched ON', 'Ensure the appliance is disconnected from mains', 'Test the socket outlet first'], correctAnswer: 2 },
  { question: 'A gradual decrease in IR over time suggests:', options: ['Normal operation', 'Insulation degradation requiring monitoring', 'The appliance is being used correctly', 'No action needed'], correctAnswer: 1 }
];

const faqs = [
  { question: 'Why is the minimum for Class II higher than Class I?', answer: 'Class II appliances have no earth connection - they rely entirely on insulation for protection. The higher 2.0 megohm minimum provides additional safety margin since there is no backup protection.' },
  { question: 'Can insulation testing damage electronic equipment?', answer: 'The 500V test can potentially damage sensitive electronic components. Some testers offer a 250V option for electronics. Always check manufacturer guidance for sensitive equipment.' },
  { question: 'What causes low insulation resistance readings?', answer: 'Common causes include moisture ingress, contamination (dust, oil, chemicals), physical damage to insulation, overheating damage, and natural degradation over time.' },
  { question: 'How long should I apply the test voltage?', answer: 'Most PAT testers apply voltage for a few seconds - long enough to get a stable reading. Very long application times are unnecessary and may stress insulation.' },
  { question: 'What if the reading fluctuates during testing?', answer: 'Fluctuating readings may indicate marginal insulation condition, moisture, or poor test connections. Allow time for the reading to stabilise and investigate further if unstable.' },
  { question: 'Should I test Class III equipment?', answer: 'Class III (SELV) equipment operates at safety extra-low voltage and may not require the same testing. Check the specific requirements and manufacturer guidance.' }
];

const PATTestingModule4Section2 = () => {
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
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">Module 4.2</Badge>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-8 pb-24">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30 mb-4">
            <Shield className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">Insulation Resistance Testing</h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">Testing insulation integrity in Class I and II appliances</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 12 min read</span>
            <span className="hidden sm:inline">-</span>
            <span>Interactive quiz included</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Zap className="h-5 w-5" /> In 30 Seconds</h3>
            <p className="text-white/80 text-sm leading-relaxed">Insulation resistance (IR) testing applies 500V DC between live conductors and earth/metalwork to verify insulation integrity. Minimum: 1 megohm for Class I, 2 megohms for Class II.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/30 p-5">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Spot It / Use It</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>- Test voltage: 500V DC (250V for sensitive electronics)</li>
              <li>- Class I minimum: 1.0 megohm</li>
              <li>- Class II minimum: 2.0 megohms</li>
              <li>- New appliances: typically 10+ megohms</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Explain the purpose of insulation resistance testing', 'Describe test procedures for Class I and II appliances', 'State minimum acceptable values for each class', 'Identify common causes of low IR readings', 'Interpret test results correctly', 'Recognise limitations and precautions'].map((outcome, i) => (
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
            <h2 className="text-xl font-bold text-white">Purpose of Insulation Resistance Testing</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Insulation resistance testing verifies that the insulation separating live conductors from accessible parts and earth is in good condition. Healthy insulation should have very high resistance - millions of ohms (megohms).</p>
            <p>The test detects:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Breakdown or deterioration of insulation materials</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Moisture contamination inside the appliance</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Contamination from dust, oil, or chemicals</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Physical damage to insulation</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Heat damage from overloading or poor ventilation</span></li>
            </ul>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-red-400" /><h4 className="text-red-400 font-semibold">Safety Critical</h4></div>
              <p className="text-white/80 text-sm">Low insulation resistance can allow leakage current to flow through unintended paths, creating shock hazards and potential fire risks.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-bold text-white">Test Procedure - Class I Appliances</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>For Class I appliances, insulation is tested between the live conductors (live and neutral connected together) and earth:</p>
            <div className="space-y-4">
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">1</div><div><h4 className="text-white font-semibold">Preparation</h4><p className="text-white/70 text-sm mt-1">Disconnect from mains. Switch the appliance ON to include the switch in the test. Insert plug into tester.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">2</div><div><h4 className="text-white font-semibold">Connection</h4><p className="text-white/70 text-sm mt-1">The tester internally connects live and neutral together. The test measures resistance between this combined L-N and earth.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">3</div><div><h4 className="text-white font-semibold">Apply Test Voltage</h4><p className="text-white/70 text-sm mt-1">The tester applies 500V DC and measures the resulting current flow. From this, it calculates the insulation resistance.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">4</div><div><h4 className="text-white font-semibold">Record Result</h4><p className="text-white/70 text-sm mt-1">Reading should be at least 1.0 megohm. Higher is better. New appliances typically show 10+ megohms or display infinity/OL.</p></div></div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2"><Gauge className="h-5 w-5" /> Why 500V DC?</h4>
              <p className="text-white/70 text-sm">DC voltage is used because AC would charge any capacitance in the circuit, affecting readings. 500V provides adequate stress without damaging modern insulation materials.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-bold text-white">Test Procedure - Class II Appliances</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Class II appliances have no earth conductor, so the test is performed differently:</p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Class II Test Method</h4>
              <p className="text-white/80 text-sm">A test probe is applied to accessible conductive parts while 500V DC is applied between L-N combined and the probe. This tests insulation to any point a user might touch.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Minimum Requirement</h4>
                <p className="text-white/70 text-sm">Class II appliances must achieve at least 2.0 megohms - higher than Class I because there is no earth backup protection.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Test Points</h4>
                <p className="text-white/70 text-sm">Apply probe to any accessible metal parts, decorative trim, screws, or other points that might become conductive.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-bold text-white">Minimum Acceptable Values</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-white/20"><th className="text-left py-3 px-2 text-white font-semibold">Appliance Class</th><th className="text-center py-3 px-2 text-white font-semibold">Minimum IR</th><th className="text-left py-3 px-2 text-white font-semibold">Notes</th></tr></thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/10"><td className="py-3 px-2 font-medium text-white">Class I</td><td className="text-center py-3 px-2 text-green-400 font-semibold">1.0 megohm</td><td className="py-3 px-2">Has earth connection as backup protection</td></tr>
                  <tr><td className="py-3 px-2 font-medium text-white">Class II</td><td className="text-center py-3 px-2 text-green-400 font-semibold">2.0 megohms</td><td className="py-3 px-2">No earth - relies entirely on insulation</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-medium mb-2">Interpretation Guide</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li><strong className="text-white">Infinity/OL:</strong> Excellent - insulation is in very good condition</li>
                <li><strong className="text-white">&gt;10 megohms:</strong> Good - typical for new or well-maintained appliances</li>
                <li><strong className="text-white">2-10 megohms:</strong> Acceptable but monitor for decline</li>
                <li><strong className="text-white">1-2 megohms:</strong> Marginal for Class I, fail for Class II</li>
                <li><strong className="text-white">&lt;1 megohm:</strong> Fail - appliance should not be used</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">05</span>
            <h2 className="text-xl font-bold text-white">Common Causes of Low Readings</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>When insulation resistance is lower than acceptable, investigate these causes:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Activity className="h-5 w-5" /> Moisture</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Condensation inside appliance</li>
                  <li>- Use in humid environments</li>
                  <li>- Water ingress from spills</li>
                  <li>- Storage in damp conditions</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">Contamination</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Dust and dirt accumulation</li>
                  <li>- Oil or grease contamination</li>
                  <li>- Chemical exposure</li>
                  <li>- Carbon deposits</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Physical Damage</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Cracked or broken insulation</li>
                  <li>- Cable damage</li>
                  <li>- Internal wiring faults</li>
                  <li>- Impact damage</li>
                </ul>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Thermal Damage</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Overheating from overload</li>
                  <li>- Poor ventilation</li>
                  <li>- Aged insulation breakdown</li>
                  <li>- Heat damage near elements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><Wrench className="h-5 w-5 text-elec-yellow" /> Practical Guidance</h2>
          <div className="grid gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h3 className="text-green-400 font-semibold mb-3">Best Practice Tips</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Switch appliance ON before testing to include the switch in the circuit</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Allow reading to stabilise before recording</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Use 250V test for sensitive electronic equipment</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Compare results to previous tests to identify trends</span></li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-400 font-semibold mb-3">Common Mistakes to Avoid</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Testing with appliance switched OFF - may miss switch faults</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Using 500V on sensitive electronics that may be damaged</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Accepting marginal readings without further investigation</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Not testing Class II appliances to accessible parts</span></li>
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
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: Insulation Resistance</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Test Parameters</h4><ul className="text-white/80 space-y-1"><li>- Test voltage: 500V DC (250V for electronics)</li><li>- L and N connected together</li><li>- Measured to earth (Class I) or probe</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Minimum Values</h4><ul className="text-white/80 space-y-1"><li>- Class I: 1.0 megohm minimum</li><li>- Class II: 2.0 megohms minimum</li><li>- New appliances: 10+ megohms typical</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Low Reading Causes</h4><ul className="text-white/80 space-y-1"><li>- Moisture/contamination</li><li>- Physical damage</li><li>- Heat damage</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Test Tips</h4><ul className="text-white/80 space-y-1"><li>- Switch appliance ON</li><li>- Wait for stable reading</li><li>- Compare to previous tests</li></ul></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 4.2 Quiz</h2>
          <p className="text-white/60">Test your understanding of insulation resistance testing.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m4s2" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../section-1" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Earth Continuity
            </Button>
          </Link>
          <Link to="../section-3" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Polarity Testing <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule4Section2;
