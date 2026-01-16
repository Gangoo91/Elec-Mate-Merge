import { ArrowLeft, TrendingUp, CheckCircle, AlertTriangle, Clock, Users, Settings, FileText, Zap, Shield, Wrench, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Risk-Based Test Intervals - PAT Testing Course';
const DESCRIPTION = 'Learn how to apply risk assessment principles to determine appropriate PAT testing frequencies.';

const quickCheckQuestions = [
  {
    id: 'm3s5-check1',
    question: 'A construction site uses 110V power tools daily in dusty, wet conditions. How would you classify the testing frequency requirement?',
    options: ['Annual testing is sufficient', 'Monthly visual + 3-monthly formal testing recommended', 'Only test when equipment appears damaged', 'Six-monthly testing regardless of conditions'],
    correctIndex: 1,
    explanation: 'Construction sites with harsh conditions are high-risk environments. IET guidance recommends monthly user checks plus formal testing every 3 months.'
  },
  {
    id: 'm3s5-check2',
    question: 'An office printer used by trained staff in a clean environment was last tested 18 months ago. What is the appropriate action?',
    options: ['Immediate formal testing required', 'Testing is overdue - schedule within 1 month', 'The risk level may justify extended intervals up to 48 months', 'No testing needed for IT equipment'],
    correctIndex: 2,
    explanation: 'Low-risk environments with IT equipment may have extended intervals. IET guidance suggests up to 48 months for such scenarios.'
  },
  {
    id: 'm3s5-check3',
    question: 'What is the PRIMARY factor that should influence PAT testing intervals?',
    options: ['The manufacturer warranty period', 'The equipment purchase price', 'Risk assessment considering use, environment, and user competency', 'A fixed 12-month schedule'],
    correctIndex: 2,
    explanation: 'Risk-based testing uses assessment of multiple factors rather than arbitrary fixed intervals.'
  }
];

const quizQuestions = [
  { question: 'What does the IET Code of Practice recommend for PAT testing intervals?', options: ['Annual testing for all', 'Manufacturer intervals', 'Risk assessment considering equipment, environment, usage', 'Insurance requirements only'], correctAnswer: 2 },
  { question: 'Which factor requires shorter testing intervals?', options: ['Clean office environment', 'Trained users', 'Secure storage', 'Construction sites with cable trailing'], correctAnswer: 3 },
  { question: 'For Class I industrial equipment, what interval does IET suggest?', options: ['Weekly visual, 6-12 monthly formal', 'Monthly visual, 6-12 monthly formal', 'Annual visual and formal combined', 'No specific guidance'], correctAnswer: 1 },
  { question: 'Why document risk assessments for testing intervals?', options: ['To save money', 'To provide evidence of due diligence', 'To avoid inspections', 'Not required'], correctAnswer: 1 },
  { question: 'If equipment consistently passes tests, what action is appropriate?', options: ['Stop testing', 'Remove from register', 'Consider extending the interval', 'Continue same interval'], correctAnswer: 2 },
  { question: 'Which environment allows LONGEST intervals?', options: ['Hotel kitchen', 'Office with IT and trained users', 'School workshop', 'Outdoor event'], correctAnswer: 1 },
  { question: 'What if risk assessment for an area changes?', options: ['Continue existing intervals', 'Reassess and adjust accordingly', 'Only change after incident', 'Wait for annual review'], correctAnswer: 1 },
  { question: 'Primary purpose of user checks?', options: ['Replace formal testing', 'Identify obvious damage before use', 'Record measurements', 'Satisfy insurance'], correctAnswer: 1 },
  { question: 'Which indicates need for MORE frequent testing?', options: ['New with warranty', 'Portable and moved frequently', 'Fixed in position', 'Used occasionally'], correctAnswer: 1 },
  { question: 'IET suggests reviewing intervals:', options: ['When legislation changes', 'Every 5 years', 'Periodically based on test results', 'Never'], correctAnswer: 2 }
];

const faqs = [
  { question: 'Is annual PAT testing legally required?', answer: 'No. There is no legal requirement for annual testing. The law requires equipment to be maintained safely. IET recommends risk-based intervals.' },
  { question: 'Can I extend intervals if equipment consistently passes?', answer: 'Yes, if your risk assessment supports it. Document your reasoning - consistent passes, low-risk environment, trained users all justify extended intervals.' },
  { question: 'Difference between user checks and formal testing?', answer: 'User checks are visual inspections before use. Formal testing involves electrical measurements by a competent person.' },
  { question: 'How to determine interval for new equipment?', answer: 'Start with IET suggested intervals. After initial testing cycles, review pass/fail rates and adjust.' },
  { question: 'Should hire equipment be tested differently?', answer: 'Yes. Hire equipment experiences varied conditions. Test before each hire period or more frequently.' },
  { question: 'What if insurance requires specific intervals?', answer: 'Follow insurance requirements if shorter. Document this is for insurance compliance.' }
];

const PATTestingModule3Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="../pat-testing-module-3">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module 3</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">Module 3.5</Badge>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-8 pb-24">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30 mb-4">
            <TrendingUp className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">Risk-Based Approaches to Determine Test Intervals</h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">Apply risk assessment principles to determine appropriate testing frequencies</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 12 min read</span>
            <span className="hidden sm:inline">-</span>
            <span>Interactive quiz included</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Zap className="h-5 w-5" /> In 30 Seconds</h3>
            <p className="text-white/80 text-sm leading-relaxed">Testing intervals should be based on risk assessment, not arbitrary schedules. Consider equipment type, environment, usage frequency, and user competency.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/30 p-5">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Spot It / Use It</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>- Review IET suggested intervals for your environment</li>
              <li>- Document your risk assessment reasoning</li>
              <li>- Adjust intervals based on test history</li>
              <li>- Implement user checks between formal tests</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Explain principles of risk-based testing intervals', 'Identify factors affecting testing frequency', 'Apply IET guidance to determine intervals', 'Assess environmental and usage risk factors', 'Document and justify interval decisions', 'Review and adjust intervals based on data'].map((outcome, i) => (
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
            <h2 className="text-xl font-bold text-white">Risk-Based vs Fixed-Interval Testing</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>The traditional approach of testing all equipment annually regardless of type or use is increasingly recognised as inefficient. The IET Code of Practice advocates a <strong className="text-white">risk-based approach</strong> that tailors testing intervals to actual risk levels.</p>
            <p>Risk-based testing recognises that:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>A power tool on a construction site faces different hazards than an office desk lamp</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Equipment used by trained professionals may need less frequent testing</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Environmental conditions significantly affect deterioration rates</span></li>
              <li className="flex items-start gap-2"><span className="text-elec-yellow mt-1">-</span><span>Fixed intervals may over-test low-risk items while under-testing high-risk equipment</span></li>
            </ul>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <p className="text-elec-yellow font-medium mb-2">Key Principle</p>
              <p className="text-white/80 text-sm">The goal is not to test as often as possible, but as often as necessary to maintain safety.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-bold text-white">Equipment Type and Class Factors</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Different equipment types present different risk profiles. The IET provides suggested intervals:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[500px]">
                <thead><tr className="border-b border-white/20"><th className="text-left py-3 px-2 text-white font-semibold">Equipment Type</th><th className="text-center py-3 px-2 text-white font-semibold">User Check</th><th className="text-center py-3 px-2 text-white font-semibold">Formal Visual</th><th className="text-center py-3 px-2 text-white font-semibold">Combined Test</th></tr></thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/10"><td className="py-3 px-2">Stationary (offices)</td><td className="text-center py-3 px-2">No</td><td className="text-center py-3 px-2">24-48 months</td><td className="text-center py-3 px-2">48 months</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">IT equipment (offices)</td><td className="text-center py-3 px-2">No</td><td className="text-center py-3 px-2">24-48 months</td><td className="text-center py-3 px-2">48 months</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">Moveable (offices)</td><td className="text-center py-3 px-2">No</td><td className="text-center py-3 px-2">12-24 months</td><td className="text-center py-3 px-2">24 months</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">Portable (industrial)</td><td className="text-center py-3 px-2">Weekly</td><td className="text-center py-3 px-2">Monthly</td><td className="text-center py-3 px-2">6-12 months</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">Hand-held (industrial)</td><td className="text-center py-3 px-2">Daily</td><td className="text-center py-3 px-2">Weekly</td><td className="text-center py-3 px-2">6 months</td></tr>
                  <tr><td className="py-3 px-2">Cables and leads</td><td className="text-center py-3 px-2">Daily</td><td className="text-center py-3 px-2">Weekly</td><td className="text-center py-3 px-2">6-12 months</td></tr>
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Class I Equipment</h4>
                <p className="text-white/70 text-sm">Relies on earth connection for safety. Typically needs more frequent testing.</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Class II Equipment</h4>
                <p className="text-white/70 text-sm">Double insulated - no earth required. May allow slightly longer intervals.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-bold text-white">Environmental Risk Factors</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Environment significantly affects deterioration rates and testing frequency:</p>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-red-400" /><h4 className="text-red-400 font-semibold">High Risk Environments</h4></div>
                <ul className="text-white/70 text-sm space-y-1 ml-7"><li>- Construction sites, industrial workshops, outdoor events, commercial kitchens</li></ul>
                <p className="text-red-300 text-sm mt-2 ml-7 font-medium">Typical interval: 3-6 months formal testing</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-orange-400" /><h4 className="text-orange-400 font-semibold">Medium-High Risk</h4></div>
                <ul className="text-white/70 text-sm space-y-1 ml-7"><li>- Schools, hotels, retail environments, warehouses</li></ul>
                <p className="text-orange-300 text-sm mt-2 ml-7 font-medium">Typical interval: 6-12 months formal testing</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2"><Shield className="h-5 w-5 text-yellow-400" /><h4 className="text-yellow-400 font-semibold">Medium Risk</h4></div>
                <ul className="text-white/70 text-sm space-y-1 ml-7"><li>- Light industrial, laboratories, healthcare (non-clinical), gyms</li></ul>
                <p className="text-yellow-300 text-sm mt-2 ml-7 font-medium">Typical interval: 12-24 months formal testing</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="h-5 w-5 text-green-400" /><h4 className="text-green-400 font-semibold">Low Risk</h4></div>
                <ul className="text-white/70 text-sm space-y-1 ml-7"><li>- Offices, reception areas, server rooms, libraries</li></ul>
                <p className="text-green-300 text-sm mt-2 ml-7 font-medium">Typical interval: 24-48 months formal testing</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-bold text-white">Usage Patterns and User Factors</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>How equipment is used and who uses it significantly impacts risk:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="text-white font-semibold flex items-center gap-2"><Clock className="h-5 w-5 text-elec-yellow" /> Usage Frequency</h4>
                <ul className="text-white/70 text-sm space-y-2">
                  <li className="flex items-start gap-2"><span className="text-red-400 font-bold">-</span><span><strong className="text-white">Continuous:</strong> More frequent testing</span></li>
                  <li className="flex items-start gap-2"><span className="text-orange-400 font-bold">-</span><span><strong className="text-white">Daily:</strong> Regular inspection + periodic testing</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 font-bold">-</span><span><strong className="text-white">Occasional:</strong> May allow extended intervals</span></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-elec-yellow" /> User Competency</h4>
                <ul className="text-white/70 text-sm space-y-2">
                  <li className="flex items-start gap-2"><span className="text-green-400 font-bold">-</span><span><strong className="text-white">Trained staff:</strong> Better care, can do user checks</span></li>
                  <li className="flex items-start gap-2"><span className="text-orange-400 font-bold">-</span><span><strong className="text-white">Varied users:</strong> Less predictable treatment</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-400 font-bold">-</span><span><strong className="text-white">Public access:</strong> No control over handling</span></li>
                </ul>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 mt-4">
              <h4 className="text-white font-semibold mb-3">Additional Considerations</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2 text-white/70"><Wrench className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Is equipment regularly moved?</span></div>
                <div className="flex items-start gap-2 text-white/70"><Wrench className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Are cables subjected to repeated flexing?</span></div>
                <div className="flex items-start gap-2 text-white/70"><Wrench className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Is equipment used as intended?</span></div>
                <div className="flex items-start gap-2 text-white/70"><Wrench className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Are storage conditions appropriate?</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">05</span>
            <h2 className="text-xl font-bold text-white">Developing and Reviewing Test Schedules</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Creating an effective testing schedule requires initial assessment followed by ongoing review:</p>
            <div className="space-y-4">
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">1</div><div><h4 className="text-white font-semibold">Initial Assessment</h4><p className="text-white/70 text-sm mt-1">Categorise equipment by type and class. Assess each area for environmental risks. Use IET suggested intervals as a starting point.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">2</div><div><h4 className="text-white font-semibold">Document Your Reasoning</h4><p className="text-white/70 text-sm mt-1">Record risk factors considered and how they influenced decisions. This demonstrates due diligence.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">3</div><div><h4 className="text-white font-semibold">Implement User Checks</h4><p className="text-white/70 text-sm mt-1">Train users to perform visual checks before use. Provide simple checklists. Establish reporting procedures.</p></div></div>
              <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">4</div><div><h4 className="text-white font-semibold">Review and Adjust</h4><p className="text-white/70 text-sm mt-1">Analyse test results periodically. High failure rates indicate intervals are too long. Consistent passes may justify extension.</p></div></div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2"><FileText className="h-5 w-5" /> Documentation Requirements</h4>
              <ul className="text-white/70 text-sm space-y-1"><li>- Risk assessment methodology</li><li>- Interval decisions with justification</li><li>- Test results and pass/fail rates</li><li>- Incidents or near-misses</li><li>- Review dates and changes</li></ul>
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
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Start with IET suggested intervals, then adjust based on experience</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Group similar equipment for efficient scheduling</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Implement user check programmes to extend formal test intervals</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Review intervals annually using test data and incident reports</span></li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-400 font-semibold mb-3">Common Mistakes to Avoid</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Applying same interval to all equipment regardless of risk</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Extending intervals without documented risk assessment</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Ignoring environmental changes affecting equipment</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Failing to review intervals when failure rates change</span></li>
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
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: IET Suggested Intervals</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">High Risk / Industrial</h4><ul className="text-white/80 space-y-1"><li>- User checks: Daily/Weekly</li><li>- Formal visual: Weekly/Monthly</li><li>- Combined test: 3-6 months</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Medium Risk / Commercial</h4><ul className="text-white/80 space-y-1"><li>- User checks: Weekly/Monthly</li><li>- Formal visual: Monthly/Quarterly</li><li>- Combined test: 6-12 months</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Low Risk / Office IT</h4><ul className="text-white/80 space-y-1"><li>- User checks: Not required</li><li>- Formal visual: 24-48 months</li><li>- Combined test: 48 months</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Key Principle</h4><p className="text-white/80">Always document your risk assessment reasoning. Review based on test results.</p></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 3.5 Quiz</h2>
          <p className="text-white/60">Test your understanding of risk-based testing intervals.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m3s5" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../pat-testing-module-3-section-4" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Equipment Classification
            </Button>
          </Link>
          <Link to="../pat-testing-module-4" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Module 4 <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule3Section5;
