import { ArrowLeft, RotateCcw, CheckCircle, AlertTriangle, Clock, Settings, Zap, Wrench, HelpCircle, ChevronRight, ChevronLeft, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Polarity Testing - PAT Testing Course';
const DESCRIPTION = 'Learn polarity testing procedures for extension leads, adapters, and IEC leads to verify correct wiring.';

const quickCheckQuestions = [
  {
    id: 'm4s3-check1',
    question: 'What could result from reversed polarity in a switched extension lead?',
    options: ['The fuse would blow immediately', 'The switch would only disconnect neutral, leaving live connected', 'The equipment would run in reverse', 'There would be no effect on safety'],
    correctIndex: 1,
    explanation: 'If polarity is reversed, the switch would disconnect neutral instead of live. This means the connected equipment would still have live voltage present even when switched off - a dangerous situation.'
  },
  {
    id: 'm4s3-check2',
    question: 'When testing an extension lead, what should show continuity from plug live pin?',
    options: ['Socket neutral hole', 'Socket earth hole', 'Socket live hole', 'All three holes'],
    correctIndex: 2,
    explanation: 'The plug live pin should show continuity only to the socket live hole. Any other result indicates incorrect wiring or a fault.'
  },
  {
    id: 'm4s3-check3',
    question: 'An IEC lead with the earth conductor swapped with neutral would:',
    options: ['Still work safely as both are at 0V', 'Present a serious shock hazard', 'Not fit into the equipment', 'Blow the fuse immediately'],
    correctIndex: 1,
    explanation: 'If earth and neutral are swapped, equipment cases that should be earthed would be connected to neutral. If neutral becomes disconnected, the case could become live - a serious shock hazard.'
  }
];

const quizQuestions = [
  { question: 'What is the primary purpose of polarity testing?', options: ['To measure resistance', 'To verify conductors are connected to correct terminals', 'To test insulation', 'To check earth continuity'], correctAnswer: 1 },
  { question: 'Which items particularly require polarity testing?', options: ['All appliances', 'Only Class II equipment', 'Extension leads, adapters, and IEC leads', 'Only power tools'], correctAnswer: 2 },
  { question: 'What could happen with reversed polarity in a switched extension?', options: ['Equipment runs backwards', 'Switch disconnects neutral instead of live', 'Fuse blows immediately', 'No effect'], correctAnswer: 1 },
  { question: 'How is polarity typically verified?', options: ['Visual inspection only', 'Insulation resistance test', 'Continuity test from each pin to corresponding socket hole', 'Earth continuity test'], correctAnswer: 2 },
  { question: 'The live conductor should be:', options: ['Brown', 'Blue', 'Green/yellow', 'Black'], correctAnswer: 0 },
  { question: 'The neutral conductor should be:', options: ['Brown', 'Blue', 'Green/yellow', 'Red'], correctAnswer: 1 },
  { question: 'If polarity is incorrect in an IEC lead, you should:', options: ['Use it anyway as it will still work', 'Rewire it correctly or replace', 'Just label it as faulty', 'Test it again later'], correctAnswer: 1 },
  { question: 'A PAT tester checks polarity by:', options: ['Applying mains voltage', 'Measuring insulation resistance', 'Using low-voltage continuity between terminals', 'Visual inspection'], correctAnswer: 2 },
  { question: 'Modern wiring colours in the UK are:', options: ['Red, black, green', 'Brown, blue, green/yellow', 'White, black, green', 'Brown, black, yellow'], correctAnswer: 1 },
  { question: 'Why is polarity important for single-pole switches?', options: ['They look better when correctly wired', 'The switch must break the live conductor for safety', 'To prevent overheating', 'For warranty purposes'], correctAnswer: 1 }
];

const faqs = [
  { question: 'Do all appliances need polarity testing?', answer: 'No. Polarity testing is mainly for extension leads, adapters, and detachable leads (IEC type). Standard appliances with fixed cables are tested during manufacture and rarely have polarity issues.' },
  { question: 'What if I find reversed polarity?', answer: 'The item should be withdrawn from use immediately. It should either be rewired correctly by a competent person or replaced. Never use equipment with incorrect polarity.' },
  { question: 'Can PAT testers check polarity automatically?', answer: 'Most modern PAT testers include automatic polarity checks for extension leads. Some display L-N-E indicator lights that should illuminate in the correct pattern.' },
  { question: 'Does polarity matter for non-switched leads?', answer: 'While less critical for non-switched leads, correct polarity is still important. Neutral-earth swap is dangerous, and correct wiring maintains safety standards.' },
  { question: 'How can polarity become reversed?', answer: 'Usually through incorrect rewiring - either at manufacture or after repair. Sometimes through damage that causes internal short circuits between conductors.' },
  { question: 'What about two-pin equipment (no earth)?', answer: 'Two-pin Class II equipment is usually non-polarised by design. The plug can be inserted either way. Polarity testing is not required for these items.' }
];

const PATTestingModule4Section3 = () => {
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
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">Module 4.3</Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-8 pb-24">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30 mb-4">
            <RotateCcw className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">Polarity Testing of Cords and Leads</h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">Verifying correct wiring polarity in extension leads and detachable cables</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 10 min read</span>
            <span className="hidden sm:inline">-</span>
            <span>Interactive quiz included</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Zap className="h-5 w-5" /> In 30 Seconds</h3>
            <p className="text-white/80 text-sm leading-relaxed">Polarity testing verifies that live, neutral, and earth conductors are connected to the correct terminals throughout extension leads and detachable cables. Reversed polarity can leave equipment live when switched off.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/30 p-5">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Spot It / Use It</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>- Brown = Live (right pin)</li>
              <li>- Blue = Neutral (left pin)</li>
              <li>- Green/Yellow = Earth (top pin)</li>
              <li>- Test: continuity pin-to-socket for each conductor</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Explain why polarity testing is important', 'Identify correct conductor colours and terminal positions', 'Describe polarity test procedures for extension leads', 'Recognise the hazards of reversed polarity', 'Use PAT tester polarity functions', 'Decide when polarity testing is required'].map((outcome, i) => (
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
            <h2 className="text-xl font-bold text-white">Why Polarity Matters</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Correct polarity ensures that each conductor performs its intended function:</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2"><Cable className="h-5 w-5" /> Live (Brown)</h4>
                <p className="text-white/70 text-sm">Carries current to the load. Should be interrupted by switches and protected by fuses.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Cable className="h-5 w-5" /> Neutral (Blue)</h4>
                <p className="text-white/70 text-sm">Return path for current. At or near earth potential during normal operation.</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2"><Cable className="h-5 w-5" /> Earth (G/Y)</h4>
                <p className="text-white/70 text-sm">Safety conductor. Carries fault current to operate protective devices.</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-red-400" /><h4 className="text-red-400 font-semibold">Reversed Polarity Hazards</h4></div>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- <strong>L-N swap:</strong> Switches disconnect neutral instead of live - equipment stays live when off</li>
                <li>- <strong>L-E swap:</strong> Metal cases become live - immediate shock hazard</li>
                <li>- <strong>N-E swap:</strong> Cases connected to neutral can become live if neutral fails</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-bold text-white">Items Requiring Polarity Testing</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Polarity testing is primarily required for items that could have been incorrectly wired during manufacture or repair:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="text-elec-yellow font-semibold mb-2">Test These</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Extension leads (especially multi-socket)</li>
                  <li>- Trailing socket boards</li>
                  <li>- IEC detachable leads</li>
                  <li>- Appliance couplers</li>
                  <li>- Adapters and converters</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Usually Not Required</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Appliances with factory-fitted cables</li>
                  <li>- Equipment with moulded plugs</li>
                  <li>- Class II two-pin equipment</li>
                  <li>- Fixed wiring installations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-bold text-white">Test Procedure</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Polarity is verified using continuity testing between plug pins and socket outlets:</p>
            <div className="space-y-4">
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">1</div><div><h4 className="text-white font-semibold">Insert Plug into PAT Tester</h4><p className="text-white/70 text-sm mt-1">The tester connects to the plug pins (L, N, E).</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">2</div><div><h4 className="text-white font-semibold">Test Probe in Socket</h4><p className="text-white/70 text-sm mt-1">Insert the test probe into each socket hole in turn, or use a flying lead adapter.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">3</div><div><h4 className="text-white font-semibold">Verify Continuity</h4><p className="text-white/70 text-sm mt-1">Check that Live pin connects only to Live socket, Neutral to Neutral, Earth to Earth.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">4</div><div><h4 className="text-white font-semibold">Check for Cross-Connections</h4><p className="text-white/70 text-sm mt-1">Verify there is NO continuity between different conductors (no short circuits).</p></div></div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-green-400 font-semibold mb-2">Automatic Testing</h4>
              <p className="text-white/70 text-sm">Many PAT testers have automatic polarity check with L-N-E indicator lights. All three should illuminate correctly when a properly wired lead is connected.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-bold text-white">IEC Lead Testing</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>IEC leads (kettle leads, computer power cords) require polarity testing because they can be rewired incorrectly:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="text-elec-yellow font-semibold mb-2">Test Method</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>1. Plug into PAT tester socket</li>
                  <li>2. Use IEC adapter on free end</li>
                  <li>3. Check L-L, N-N, E-E continuity</li>
                  <li>4. Verify no cross-connections</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Common Faults</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- L-N reversal at plug or IEC end</li>
                  <li>- Earth connected to wrong terminal</li>
                  <li>- Poor or missing earth connection</li>
                  <li>- Internal conductor damage</li>
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
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Test all extension leads and multi-socket boards</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Pay special attention to rewired or repaired items</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Check all sockets on multi-way extensions</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Use correct adapters for IEC and other connectors</span></li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-400 font-semibold mb-3">Common Mistakes to Avoid</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Assuming factory items are always correct</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Only testing one socket on multi-way extensions</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Ignoring polarity faults as minor issues</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Not testing after repairs or modifications</span></li>
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
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: Polarity</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Conductor Colours</h4><ul className="text-white/80 space-y-1"><li>- Brown = Live (L)</li><li>- Blue = Neutral (N)</li><li>- Green/Yellow = Earth (E)</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Plug Pin Positions</h4><ul className="text-white/80 space-y-1"><li>- Right pin = Live (facing plug)</li><li>- Left pin = Neutral</li><li>- Top pin = Earth</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Test These Items</h4><ul className="text-white/80 space-y-1"><li>- Extension leads</li><li>- Socket boards</li><li>- IEC leads</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Action on Fault</h4><ul className="text-white/80 space-y-1"><li>- Withdraw from use</li><li>- Rewire correctly or replace</li><li>- Retest before returning to service</li></ul></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 4.3 Quiz</h2>
          <p className="text-white/60">Test your understanding of polarity testing.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m4s3" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../pat-testing-module-4-section-2" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Insulation Resistance
            </Button>
          </Link>
          <Link to="../pat-testing-module-4-section-4" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Touch Current Testing <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule4Section3;
