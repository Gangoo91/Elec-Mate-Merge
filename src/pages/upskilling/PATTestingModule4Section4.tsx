import { ArrowLeft, Activity, CheckCircle, AlertTriangle, Clock, Settings, Zap, Wrench, HelpCircle, ChevronRight, ChevronLeft, Shield, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Touch Current and Leakage Testing - PAT Testing Course';
const DESCRIPTION = 'Learn about touch current and leakage current testing methods for advanced PAT testing scenarios.';

const quickCheckQuestions = [
  {
    id: 'm4s4-check1',
    question: 'What is the maximum acceptable protective earth conductor current for a Class I appliance?',
    options: ['0.25mA', '0.75mA', '3.5mA', '10mA'],
    correctIndex: 2,
    explanation: 'The maximum acceptable protective earth conductor current for Class I appliances is 3.5mA. Values higher than this indicate excessive leakage through the earth path.'
  },
  {
    id: 'm4s4-check2',
    question: 'What is the maximum acceptable touch current for a Class II appliance?',
    options: ['0.25mA', '0.75mA', '3.5mA', '5mA'],
    correctIndex: 0,
    explanation: 'Class II appliances have a stricter limit of 0.25mA touch current because they have no earth connection - all protection comes from insulation.'
  },
  {
    id: 'm4s4-check3',
    question: 'Why is leakage testing sometimes preferred over insulation resistance testing?',
    options: ['It is faster to perform', 'It tests under operating voltage conditions', 'It requires cheaper equipment', 'It does not require disconnection'],
    correctIndex: 1,
    explanation: 'Leakage testing is performed at or near operating voltage, which more accurately represents real-world conditions. Insulation that passes at 500V DC might have different characteristics under AC operating conditions.'
  }
];

const quizQuestions = [
  { question: 'What does touch current testing measure?', options: ['Current through the live conductor', 'Current that could flow through a person touching the appliance', 'Current through the neutral', 'Total power consumption'], correctAnswer: 1 },
  { question: 'Maximum protective earth conductor current for Class I is:', options: ['0.25mA', '0.75mA', '3.5mA', '10mA'], correctAnswer: 2 },
  { question: 'Maximum touch current for Class II appliances is:', options: ['0.25mA', '0.75mA', '3.5mA', '5mA'], correctAnswer: 0 },
  { question: 'Why is touch current testing valuable for Class II appliances?', options: ['They have no insulation resistance test', 'There is no earth to measure earth leakage', 'It is required by law', 'It is faster than other tests'], correctAnswer: 1 },
  { question: 'At what voltage is leakage testing typically performed?', options: ['500V DC', '40V AC', 'Mains operating voltage (230V AC)', '1000V DC'], correctAnswer: 2 },
  { question: 'High leakage current could indicate:', options: ['A well-insulated appliance', 'Moisture ingress or insulation breakdown', 'The appliance is energy efficient', 'Normal operation'], correctAnswer: 1 },
  { question: 'Which test provides results closest to real operating conditions?', options: ['Earth continuity', 'Insulation resistance at 500V', 'Touch current at operating voltage', 'Visual inspection'], correctAnswer: 2 },
  { question: 'Substitute leakage testing is useful for:', options: ['All appliances', 'Class I appliances that cannot be powered on', 'Class II appliances only', 'Extension leads only'], correctAnswer: 1 },
  { question: 'The lethal threshold of electric current is approximately:', options: ['1mA', '10mA', '30mA', '100mA'], correctAnswer: 2 },
  { question: 'Touch current limits are stricter for Class II because:', options: ['They use more power', 'They have no earth protection backup', 'They are always hand-held', 'Regulations require it'], correctAnswer: 1 }
];

const faqs = [
  { question: 'Why are there different limits for Class I and Class II?', answer: 'Class I appliances have earth as backup protection - if insulation fails, the earth carries fault current. Class II has no earth, so stricter limits ensure insulation alone provides adequate protection.' },
  { question: 'When should I use leakage testing instead of insulation resistance?', answer: 'Leakage testing is preferred when testing at operating voltage is important, for medical equipment, or when insulation resistance testing at 500V might damage sensitive electronics.' },
  { question: 'Can high leakage current cause RCD tripping?', answer: 'Yes. If leakage current exceeds 30mA (typical RCD sensitivity), it can cause nuisance tripping. Multiple appliances with moderate leakage on one circuit can also cause trips.' },
  { question: 'What is substitute leakage testing?', answer: 'A method where the appliance is not powered from mains. The tester applies voltage between shorted L-N and earth to measure leakage. Useful for appliances that cannot be safely powered on.' },
  { question: 'Is 3.5mA dangerous?', answer: 'While 3.5mA can be felt and is uncomfortable, it is below the typical let-go threshold (around 10mA). However, it indicates significant insulation deterioration requiring investigation.' },
  { question: 'Do I need to test touch current on all appliances?', answer: 'Touch current testing is particularly valuable for Class II appliances and IT equipment. Many PAT testing schedules use insulation resistance for general testing and reserve touch current for specific applications.' }
];

const PATTestingModule4Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="../pat-testing-module-4">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module 4</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">Module 4.4</Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-8 pb-24">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30 mb-4">
            <Activity className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">Touch Current and Leakage Testing</h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">Advanced current measurement techniques for comprehensive safety testing</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 12 min read</span>
            <span className="hidden sm:inline">-</span>
            <span>Interactive quiz included</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Zap className="h-5 w-5" /> In 30 Seconds</h3>
            <p className="text-white/80 text-sm leading-relaxed">Touch current tests measure current that could flow through a person at operating voltage. Maximum limits: 3.5mA for Class I (earth conductor current), 0.25mA for Class II (touch current).</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/30 p-5">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Spot It / Use It</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>- Class I limit: 3.5mA earth conductor current</li>
              <li>- Class II limit: 0.25mA touch current</li>
              <li>- Test at operating voltage (230V AC)</li>
              <li>- More realistic than 500V DC insulation test</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Explain the difference between earth leakage and touch current', 'State maximum acceptable current values for each class', 'Describe when leakage testing is preferred', 'Perform touch current measurements safely', 'Interpret leakage test results', 'Understand the relationship between leakage and RCD operation'].map((outcome, i) => (
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
            <h2 className="text-xl font-bold text-white">Understanding Leakage Current</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>All electrical appliances have some level of leakage current - small currents that flow through insulation, filters, and surge suppressors. This is normal, but excessive leakage indicates problems.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Shield className="h-5 w-5" /> Normal Sources</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- EMC filters in electronics</li>
                  <li>- Surge protection components</li>
                  <li>- Capacitive coupling</li>
                  <li>- Minor insulation imperfections</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Abnormal Sources</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Moisture contamination</li>
                  <li>- Insulation breakdown</li>
                  <li>- Carbon tracking</li>
                  <li>- Component failure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-bold text-white">Types of Leakage Tests</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <div className="space-y-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="text-elec-yellow font-semibold mb-2">Protective Earth Conductor Current (Class I)</h4>
                <p className="text-white/70 text-sm mb-2">Measures current flowing through the earth conductor when the appliance is operating. This is the current that would flow to earth during a fault.</p>
                <p className="text-green-400 font-medium text-sm">Maximum: 3.5mA</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Touch Current (Class II and accessible parts)</h4>
                <p className="text-white/70 text-sm mb-2">Measures current that would flow through a person touching the appliance. Critical for Class II where there is no earth protection.</p>
                <p className="text-green-400 font-medium text-sm">Maximum: 0.25mA (Class II) / 0.75mA (Class I accessible parts)</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Substitute Leakage Test</h4>
                <p className="text-white/70 text-sm mb-2">Used when the appliance cannot be powered on. Tests leakage by applying voltage between shorted L-N and earth without mains power.</p>
                <p className="text-white/70 text-sm">Useful for damaged appliances or initial fault finding.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-bold text-white">Current Limits and Safety</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-white/20"><th className="text-left py-3 px-2 text-white font-semibold">Measurement</th><th className="text-center py-3 px-2 text-white font-semibold">Class I Limit</th><th className="text-center py-3 px-2 text-white font-semibold">Class II Limit</th></tr></thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/10"><td className="py-3 px-2">Earth conductor current</td><td className="text-center py-3 px-2 text-green-400 font-medium">3.5mA</td><td className="text-center py-3 px-2 text-white/50">N/A</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">Touch current</td><td className="text-center py-3 px-2 text-green-400 font-medium">0.75mA</td><td className="text-center py-3 px-2 text-green-400 font-medium">0.25mA</td></tr>
                  <tr><td className="py-3 px-2">Substitute leakage</td><td className="text-center py-3 px-2 text-green-400 font-medium">3.5mA</td><td className="text-center py-3 px-2 text-green-400 font-medium">0.25mA</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-medium mb-2 flex items-center gap-2"><Gauge className="h-5 w-5" /> Human Sensitivity to Current</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li><strong>0.5mA:</strong> Threshold of perception</li>
                <li><strong>1-2mA:</strong> Slight tingling sensation</li>
                <li><strong>5-10mA:</strong> Painful but can let go</li>
                <li><strong>10-30mA:</strong> Muscular contraction - may not be able to let go</li>
                <li><strong>30mA+:</strong> RCD trip threshold - potentially dangerous</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-bold text-white">When to Use Leakage Testing</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Leakage testing is preferred in certain situations:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Use Leakage Testing For:</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Class II appliances (touch current)</li>
                  <li>- IT equipment with EMC filters</li>
                  <li>- Medical/dental equipment</li>
                  <li>- Equipment sensitive to 500V DC</li>
                  <li>- When RCD compatibility is important</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Benefits Over Insulation Test:</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Tests at real operating voltage</li>
                  <li>- Includes EMC filter effects</li>
                  <li>- More realistic for electronics</li>
                  <li>- Relates to RCD operation</li>
                  <li>- Lower stress on components</li>
                </ul>
              </div>
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
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Use touch current testing for Class II appliances</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Consider leakage testing for sensitive electronics</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Use substitute test when appliance cannot be powered</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Consider total leakage when multiple items share an RCD</span></li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-400 font-semibold mb-3">Common Mistakes to Avoid</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Ignoring high leakage that is still within limits</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Not considering cumulative leakage on circuits</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Using only insulation test for Class II equipment</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Applying Class I limits to Class II appliances</span></li>
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
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: Leakage Limits</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Class I Limits</h4><ul className="text-white/80 space-y-1"><li>- Earth conductor: 3.5mA max</li><li>- Touch current: 0.75mA max</li><li>- Substitute leakage: 3.5mA max</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Class II Limits</h4><ul className="text-white/80 space-y-1"><li>- Touch current: 0.25mA max</li><li>- Substitute leakage: 0.25mA max</li><li>- Stricter due to no earth protection</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">When to Use</h4><ul className="text-white/80 space-y-1"><li>- Class II appliances</li><li>- Sensitive electronics</li><li>- Medical equipment</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">RCD Consideration</h4><ul className="text-white/80 space-y-1"><li>- 30mA RCD threshold</li><li>- Consider cumulative leakage</li><li>- Multiple items add up</li></ul></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 4.4 Quiz</h2>
          <p className="text-white/60">Test your understanding of leakage and touch current testing.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m4s4" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../pat-testing-module-4-section-3" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Polarity Testing
            </Button>
          </Link>
          <Link to="../pat-testing-module-4-section-5" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Test Equipment Types <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule4Section4;
