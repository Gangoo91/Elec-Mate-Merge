import { ArrowLeft, FileX, CheckCircle, AlertTriangle, Clock, Settings, Zap, Wrench, HelpCircle, ChevronRight, ChevronLeft, XCircle, Search, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Interpreting Results and Common Failures - PAT Testing Course';
const DESCRIPTION = 'Learn how to interpret PAT test results correctly and identify common failure modes and their causes.';

const quickCheckQuestions = [
  {
    id: 'm4s6-check1',
    question: 'An earth continuity reading of 0.45 ohms on a 3m cable appliance. What is the result?',
    options: ['Fail - exceeds maximum', 'Pass - within acceptable limits', 'Borderline - needs further investigation', 'Cannot determine from this information'],
    correctIndex: 1,
    explanation: 'Maximum for 3m cable = 0.1 + (0.1 x 3) = 0.4 ohms. A reading of 0.45 ohms exceeds this slightly. However, if test lead resistance was not nulled, this could account for the excess. Investigate further.'
  },
  {
    id: 'm4s6-check2',
    question: 'A Class II hairdryer shows an insulation resistance of 1.5 megohms. What is the result?',
    options: ['Pass - above 1 megohm', 'Fail - Class II requires 2 megohms minimum', 'Borderline - acceptable for domestic use', 'Need to check earth continuity first'],
    correctIndex: 1,
    explanation: 'Class II appliances require a minimum of 2 megohms insulation resistance. 1.5 megohms is below this threshold, so the appliance fails. Class II has stricter limits because there is no earth protection.'
  },
  {
    id: 'm4s6-check3',
    question: 'What is the most common cause of earth continuity test failures?',
    options: ['Manufacturing defects', 'Loose connections in the plug', 'Insulation breakdown', 'Wrong fuse rating'],
    correctIndex: 1,
    explanation: 'Loose terminal screws in the plug are the most common cause of high earth continuity readings. This is often easily fixed by tightening the terminals and retesting.'
  }
];

const quizQuestions = [
  { question: 'What is the first thing to check when an appliance fails earth continuity?', options: ['Replace the fuse', 'Check plug terminal connections', 'Replace the cable', 'Discard the appliance'], correctAnswer: 1 },
  { question: 'An insulation resistance reading showing OL or infinity indicates:', options: ['A fault condition', 'Very good insulation', 'The test has failed', 'The tester is broken'], correctAnswer: 1 },
  { question: 'A borderline result should be:', options: ['Passed if close to the limit', 'Investigated and monitored', 'Ignored if the appliance works', 'Recorded as a pass'], correctAnswer: 1 },
  { question: 'Common causes of insulation failure include:', options: ['Normal usage', 'Moisture and contamination', 'Modern manufacturing', 'Correct storage'], correctAnswer: 1 },
  { question: 'If polarity is reversed, the correct action is:', options: ['Use the appliance with care', 'Rewire correctly or replace', 'Record as advisory', 'Test again later'], correctAnswer: 1 },
  { question: 'When retesting a repaired appliance, you should:', options: ['Only test the repaired component', 'Perform a full test sequence', 'Visual inspection is sufficient', 'Wait 24 hours before testing'], correctAnswer: 1 },
  { question: 'Trending test results over time helps identify:', options: ['The best time to test', 'Gradual deterioration before failure', 'Who tested the equipment', 'Equipment location'], correctAnswer: 1 },
  { question: 'A Class I appliance with 0.8 megohms insulation resistance:', options: ['Passes - above minimum', 'Fails - below 1 megohm', 'Borderline - investigate', 'Depends on the appliance type'], correctAnswer: 1 },
  { question: 'After a fail result, the appliance should be:', options: ['Retested immediately', 'Labelled, withdrawn, and investigated', 'Discarded without further action', 'Put back in service with a warning'], correctAnswer: 1 },
  { question: 'Documentation of test results should include:', options: ['Only pass results', 'All results including fails', 'Only results over 12 months old', 'Only results for expensive equipment'], correctAnswer: 1 }
];

const faqs = [
  { question: 'Should I record failed test results?', answer: 'Yes, always. Recording failures provides evidence of your testing process, documents that unsafe equipment was identified and withdrawn, and helps identify patterns or problem equipment types.' },
  { question: 'Can I repair and retest failed equipment?', answer: 'Yes, if the repair is straightforward (like tightening plug terminals) and you are competent to do so. After repair, perform a full retest. For complex repairs, consider whether replacement is more cost-effective.' },
  { question: 'What if a result is just slightly outside limits?', answer: 'Borderline results warrant investigation. Check test lead resistance, ensure good probe contact, and consider environmental factors. If genuinely borderline, the appliance should be monitored more closely.' },
  { question: 'How do I handle equipment that fails repeatedly?', answer: 'Repeatedly failing equipment may indicate a design issue, inappropriate use, or end of life. Consider whether the equipment is suitable for its environment and usage, and whether replacement is the better option.' },
  { question: 'What labels should I apply after testing?', answer: 'Pass labels should include test date, next test due, and tester ID. Failed equipment should be clearly labelled as unsafe and removed from use. Some organisations use colour-coded labels for quick identification.' },
  { question: 'Who can authorise return to service after a fail?', answer: 'After repair and successful retest, the competent person performing the test can authorise return to service. Document the repair and retest results. For repeated failures, consider management review.' }
];

const PATTestingModule4Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="../pat-testing-module-4">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module 4</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">Module 4.6</Badge>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-8 pb-24">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30 mb-4">
            <FileX className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">Interpreting Results and Common Failures</h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">Understanding test results and failure modes</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 12 min read</span>
            <span className="hidden sm:inline">-</span>
            <span>Interactive quiz included</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Zap className="h-5 w-5" /> In 30 Seconds</h3>
            <p className="text-white/80 text-sm leading-relaxed">Interpret results by comparing to limits for the appliance class. Common failures include loose connections, moisture ingress, and cable damage. Document all results and investigate borderline readings.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/30 p-5">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Spot It / Use It</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>- Always check appliance class first</li>
              <li>- Investigate marginal results</li>
              <li>- Label and withdraw failed items</li>
              <li>- Document everything including failures</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Correctly interpret test results against limits', 'Identify common failure modes and their causes', 'Take appropriate action on failed equipment', 'Handle borderline results appropriately', 'Document and record test outcomes', 'Recognise patterns indicating equipment problems'].map((outcome, i) => (
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
            <h2 className="text-xl font-bold text-white">Result Categories</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Test results fall into three categories requiring different actions:</p>
            <div className="grid gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2"><ThumbsUp className="h-5 w-5 text-green-400" /><h4 className="text-green-400 font-semibold">PASS</h4></div>
                <p className="text-white/70 text-sm mb-2">All readings within acceptable limits with clear margin.</p>
                <p className="text-white/60 text-sm italic">Action: Apply pass label, record result, schedule next test date.</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2"><Search className="h-5 w-5 text-yellow-400" /><h4 className="text-yellow-400 font-semibold">BORDERLINE / INVESTIGATE</h4></div>
                <p className="text-white/70 text-sm mb-2">Reading close to limits or showing unusual pattern.</p>
                <p className="text-white/60 text-sm italic">Action: Investigate cause, check connections, consider reduced testing interval, monitor trend.</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2"><XCircle className="h-5 w-5 text-red-400" /><h4 className="text-red-400 font-semibold">FAIL</h4></div>
                <p className="text-white/70 text-sm mb-2">Reading exceeds acceptable limits.</p>
                <p className="text-white/60 text-sm italic">Action: Apply fail label, withdraw from use immediately, investigate cause, repair or replace.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-bold text-white">Common Earth Continuity Failures</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>High earth continuity readings are among the most common failures:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-white/20"><th className="text-left py-3 px-2 text-white font-semibold">Symptom</th><th className="text-left py-3 px-2 text-white font-semibold">Likely Cause</th><th className="text-left py-3 px-2 text-white font-semibold">Fix</th></tr></thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/10"><td className="py-3 px-2">High reading</td><td className="py-3 px-2">Loose terminal in plug</td><td className="py-3 px-2">Tighten screws, retest</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">Erratic reading</td><td className="py-3 px-2">Intermittent connection</td><td className="py-3 px-2">Check all connections</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">No reading (OL)</td><td className="py-3 px-2">Open circuit - broken wire</td><td className="py-3 px-2">Replace cable or repair</td></tr>
                  <tr><td className="py-3 px-2">Very high reading</td><td className="py-3 px-2">Corroded connections</td><td className="py-3 px-2">Clean or replace terminals</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-medium mb-2">Pro Tip</h4>
              <p className="text-white/70 text-sm">Before failing equipment for high earth continuity, check that you used lead null compensation. Test lead resistance can add 0.1-0.2 ohms to readings.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-bold text-white">Common Insulation Resistance Failures</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Low insulation resistance indicates potential shock or fire hazards:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Environmental Causes</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Moisture ingress</li>
                  <li>- Condensation buildup</li>
                  <li>- Contamination (dust, oil)</li>
                  <li>- High humidity exposure</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Physical Causes</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Cracked or damaged insulation</li>
                  <li>- Overheating damage</li>
                  <li>- Age-related breakdown</li>
                  <li>- Manufacturing defect</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Moisture-Related Failures</h4>
              <p className="text-white/70 text-sm">If moisture is suspected, allow the appliance to dry thoroughly (in a warm, dry place) and retest. If the reading improves significantly, moisture was likely the cause - but investigate why moisture entered.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-bold text-white">Handling Failed Equipment</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>When equipment fails testing, follow a clear process:</p>
            <div className="space-y-4">
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold">1</div><div><h4 className="text-white font-semibold">Immediate Actions</h4><p className="text-white/70 text-sm mt-1">Apply FAIL label clearly. Remove plug or disable so equipment cannot be used. Inform the user/owner.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">2</div><div><h4 className="text-white font-semibold">Investigation</h4><p className="text-white/70 text-sm mt-1">Identify the specific failure mode. Check for obvious causes (loose terminals, visible damage). Determine if repair is feasible.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">3</div><div><h4 className="text-white font-semibold">Repair or Replace Decision</h4><p className="text-white/70 text-sm mt-1">Consider cost of repair vs replacement. Age and condition of equipment. Frequency of previous failures.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">4</div><div><h4 className="text-white font-semibold">After Repair</h4><p className="text-white/70 text-sm mt-1">Perform full retest (not just the failed test). Document the repair and retest. Apply new pass label if successful.</p></div></div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">05</span>
            <h2 className="text-xl font-bold text-white">Trend Analysis</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Comparing results over time can identify problems before they cause failures:</p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">What to Look For</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Gradually decreasing insulation resistance over several tests</li>
                <li>- Earth continuity readings increasing slightly each time</li>
                <li>- Equipment that fails repeatedly after repair</li>
                <li>- Groups of similar equipment showing similar degradation</li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Healthy Trend</h4>
                <p className="text-white/70 text-sm">Stable readings over multiple test cycles. Values well within limits with consistent margins.</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Warning Signs</h4>
                <p className="text-white/70 text-sm">Progressive deterioration. Readings approaching limits. Increasing failure rates.</p>
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
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Record all results, including failures, for complete documentation</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Investigate borderline results rather than just passing them</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Compare current results to previous tests to identify trends</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Consider the environment and usage when interpreting results</span></li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-400 font-semibold mb-3">Common Mistakes to Avoid</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Passing borderline results without investigation</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Not recording failed test results</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Returning equipment to service after repair without full retest</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Applying wrong limits (Class I vs Class II)</span></li>
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
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: Results Interpretation</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-green-400 font-semibold mb-2">PASS Actions</h4><ul className="text-white/80 space-y-1"><li>- Apply pass label</li><li>- Record result</li><li>- Schedule next test</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-red-400 font-semibold mb-2">FAIL Actions</h4><ul className="text-white/80 space-y-1"><li>- Apply fail label</li><li>- Withdraw immediately</li><li>- Investigate and repair/replace</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Common Failures</h4><ul className="text-white/80 space-y-1"><li>- Loose plug terminals</li><li>- Moisture contamination</li><li>- Cable damage</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">After Repair</h4><ul className="text-white/80 space-y-1"><li>- Full retest required</li><li>- Document the repair</li><li>- Apply new pass label</li></ul></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 4.6 Quiz</h2>
          <p className="text-white/60">Test your understanding of result interpretation and failure handling.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m4s6" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../pat-testing-module-4-section-5" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Test Equipment
            </Button>
          </Link>
          <Link to="../pat-testing-module-5" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Module 5 <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule4Section6;
