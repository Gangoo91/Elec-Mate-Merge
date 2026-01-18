import { ArrowLeft, Wrench, CheckCircle, AlertTriangle, Clock, Zap, HelpCircle, ChevronRight, ChevronLeft, Gauge, Monitor, Smartphone, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Test Equipment Types - PAT Testing Course';
const DESCRIPTION = 'Learn about different types of PAT testing equipment from basic manual testers to advanced computerised systems.';

const quickCheckQuestions = [
  {
    id: 'm4s5-check1',
    question: 'What is the main advantage of a computerised PAT tester over a basic manual unit?',
    options: ['It costs less', 'It performs more accurate tests', 'It stores data, generates reports, and manages asset databases', 'It can test more appliances per day'],
    correctIndex: 2,
    explanation: 'Computerised testers provide data storage, asset management, barcode scanning, and automatic report generation. While they may be faster, the main advantage is the documentation and traceability features.'
  },
  {
    id: 'm4s5-check2',
    question: 'How often should PAT test equipment be calibrated?',
    options: ['Every month', 'Every 6 months', 'Annually (12 months) is typical', 'Only when readings seem wrong'],
    correctIndex: 2,
    explanation: 'Annual calibration is typical for PAT testing equipment. Some organisations require 6-monthly calibration for higher assurance. Calibration should be traceable to national standards.'
  },
  {
    id: 'm4s5-check3',
    question: 'What is the purpose of the lead null function on a PAT tester?',
    options: ['To test the test leads for damage', 'To compensate for test lead resistance in earth continuity readings', 'To connect to the network', 'To reset the device to factory settings'],
    correctIndex: 1,
    explanation: 'Lead null compensates for the resistance of the test leads themselves, ensuring accurate earth continuity readings. Without this, lead resistance would be included in the measurement.'
  }
];

const quizQuestions = [
  { question: 'What type of tester is best for a small business testing a few items occasionally?', options: ['Computerised with full database', 'Basic pass/fail tester', 'Manual tester with digital display', 'Network-connected enterprise system'], correctAnswer: 2 },
  { question: 'Computerised PAT testers typically offer:', options: ['Lower purchase cost', 'Data storage and report generation', 'More accurate readings', 'Faster individual tests'], correctAnswer: 1 },
  { question: 'Calibration of PAT test equipment should be:', options: ['Done whenever readings seem wrong', 'Performed annually as a minimum', 'Not necessary for digital equipment', 'Only required for industrial use'], correctAnswer: 1 },
  { question: 'What does traceable calibration mean?', options: ['The tester can be located if lost', 'Calibration is linked to national/international standards', 'The manufacturer can track sales', 'Test results can be traced to operators'], correctAnswer: 1 },
  { question: 'Lead null compensation is used for:', options: ['Testing extension leads', 'Removing test lead resistance from readings', 'Connecting to printers', 'Testing leakage current'], correctAnswer: 1 },
  { question: 'Barcode scanners on PAT testers are used for:', options: ['Reading product specifications', 'Quick asset identification', 'Calibration verification', 'Connecting to the internet'], correctAnswer: 1 },
  { question: 'Which feature helps ensure consistent testing?', options: ['Colour display', 'Automatic test sequences', 'Larger battery', 'Metal case'], correctAnswer: 1 },
  { question: 'What should you check before using a PAT tester?', options: ['That it is connected to mains', 'That calibration is current and leads are undamaged', 'That it has the latest software', 'That it matches the appliance brand'], correctAnswer: 1 },
  { question: 'Pass/fail testers are suitable for:', options: ['All testing situations', 'Quick go/no-go checks with limited documentation', 'Detailed fault diagnosis', 'Calibration laboratories'], correctAnswer: 1 },
  { question: 'What is the benefit of downloading test results to a computer?', options: ['Makes the tester faster', 'Enables report generation and record keeping', 'Improves test accuracy', 'Reduces calibration frequency'], correctAnswer: 1 }
];

const faqs = [
  { question: 'How much should I spend on a PAT tester?', answer: 'Basic testers start around 100-200 pounds, mid-range with data storage 300-600 pounds, and computerised units 600-1500+ pounds. Choose based on volume of testing and documentation needs.' },
  { question: 'Can I use a multimeter instead of a PAT tester?', answer: 'A multimeter can measure some values but uses very low test current (unsuitable for earth continuity) and does not provide the specific tests required. Dedicated PAT testers are strongly recommended.' },
  { question: 'How do I know if my tester is still accurate?', answer: 'Regular calibration by an accredited laboratory provides assurance of accuracy. Between calibrations, check against known reference values if available, and look for any obvious error indications.' },
  { question: 'Do I need a tester with a printer?', answer: 'Printers are useful for immediate labels and reports but add cost and consumables. Many testers now download to computers for printing, which may be more practical for most users.' },
  { question: 'What accessories do I need?', answer: 'Essential: good quality test leads, adapters for IEC and other connectors. Useful: carry case, barcode scanner (for computerised units), spare labels, reference resistors for checking accuracy.' },
  { question: 'Should I buy new or used equipment?', answer: 'New equipment comes with warranty and current calibration. Used equipment may save money but verify calibration status and check for damage. Some manufacturers offer refurbished units with warranty.' }
];

const PATTestingModule4Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 pb-24">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Wrench className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-elec-yellow/80 text-sm font-medium">Module 4 - Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Test Equipment Types</h1>
          <p className="text-white/60 text-base">Manual, automatic, and advanced PAT testing equipment</p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 10 min read</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="text-sm text-white space-y-1">
            <li>- PAT testers range from basic pass/fail units to computerised systems</li>
            <li>- Choose based on testing volume, documentation needs, and budget</li>
            <li>- Features include data storage, barcode scanning, and report generation</li>
            <li>- Annual calibration is typical minimum requirement</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Identify different categories of PAT test equipment', 'Explain features and benefits of each type', 'Select appropriate equipment for different scenarios', 'Understand calibration requirements', 'Describe essential accessories', 'Maintain test equipment properly'].map((outcome, i) => (
              <div key={i} className="flex items-start gap-2 text-white text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center font-medium">{i + 1}</span>
                {outcome}
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Basic Pass/Fail Testers
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Entry-level testers provide simple pass or fail indication without detailed readings:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Advantages</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Low cost (100-200 pounds)</li>
                  <li>- Simple to use</li>
                  <li>- Minimal training required</li>
                  <li>- Portable and lightweight</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Limitations</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- No actual readings displayed</li>
                  <li>- Cannot identify marginal results</li>
                  <li>- No data storage</li>
                  <li>- Limited fault diagnosis</li>
                </ul>
              </div>
            </div>
            <p className="text-white/60 text-sm italic">Best for: Very occasional testing, quick go/no-go checks, budget-conscious small users.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Mid-Range Digital Testers
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>These testers display actual measurements and often include basic memory functions:</p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Monitor className="h-5 w-5" /> Key Features</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Digital display showing actual readings (ohms, megohms, mA)</li>
                <li>- Pass/fail indication against programmed limits</li>
                <li>- Memory for storing test results</li>
                <li>- Download capability to computer</li>
                <li>- Automatic test sequences</li>
                <li>- Battery operation with mains option</li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Typical Price Range</h4>
                <p className="text-white/70 text-sm">300-600 pounds. Good balance of features and cost for regular testing.</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Best For</h4>
                <p className="text-white/70 text-sm">Regular testing, need for documentation, fault diagnosis, professional use.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Advanced Computerised Systems
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Full-featured testers with integrated databases and comprehensive documentation:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Smartphone className="h-5 w-5" /> Advanced Features</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Built-in asset database</li>
                  <li>- Barcode/QR code scanning</li>
                  <li>- Automatic report generation</li>
                  <li>- Retest date scheduling</li>
                  <li>- Photo capture capability</li>
                  <li>- Cloud connectivity</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><FileCheck className="h-5 w-5" /> Documentation</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Customisable certificates</li>
                  <li>- Compliance reports</li>
                  <li>- Trend analysis</li>
                  <li>- Asset history tracking</li>
                  <li>- Multi-site management</li>
                  <li>- Audit trails</li>
                </ul>
              </div>
            </div>
            <p className="text-white/60 text-sm italic mt-4">Price range: 600-1500+ pounds. Best for: High-volume testing, professional contractors, organisations with strict documentation requirements.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Calibration and Maintenance
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Regular calibration ensures test equipment provides accurate, reliable results:</p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Gauge className="h-5 w-5" /> Calibration Requirements</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li><strong>Frequency:</strong> Annual calibration is typical minimum</li>
                <li><strong>Traceability:</strong> Should be traceable to national standards (UKAS)</li>
                <li><strong>Certificate:</strong> Retain calibration certificates as evidence</li>
                <li><strong>Stickers:</strong> Apply calibration due date stickers to equipment</li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Daily Checks</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Visual inspection of leads</li>
                  <li>- Check lead connections</li>
                  <li>- Verify battery condition</li>
                  <li>- Use lead null function</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Before Calibration Due</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Plan ahead for service</li>
                  <li>- Consider backup equipment</li>
                  <li>- Budget for calibration cost</li>
                  <li>- Review any repairs needed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" /> Practical Guidance
          </h2>
          <div className="grid gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h3 className="text-green-400 font-semibold mb-3">Best Practice Tips</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Choose equipment based on your actual testing volume and documentation needs</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Always use lead null to compensate for test lead resistance</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Keep calibration certificates with the equipment</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Inspect test leads regularly for damage</span></li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-400 font-semibold mb-3">Common Mistakes to Avoid</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Using equipment beyond calibration date</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Not compensating for test lead resistance</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Using damaged test leads</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Over-specifying equipment needs (wasted cost)</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: Equipment Selection</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Basic (100-200 pounds)</h4><ul className="text-white space-y-1"><li>- Pass/fail only</li><li>- Occasional use</li><li>- Minimal documentation</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Mid-Range (300-600 pounds)</h4><ul className="text-white space-y-1"><li>- Digital readings</li><li>- Memory storage</li><li>- Regular professional use</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Advanced (600+ pounds)</h4><ul className="text-white space-y-1"><li>- Full database</li><li>- Barcode scanning</li><li>- High volume/compliance critical</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Calibration</h4><ul className="text-white space-y-1"><li>- Annual minimum</li><li>- UKAS traceable</li><li>- Keep certificates</li></ul></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 4.5 Quiz</h2>
          <p className="text-white/60">Test your understanding of PAT testing equipment.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m4s5" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../section-4" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Touch Current
            </Button>
          </Link>
          <Link to="../section-6" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Interpreting Results <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule4Section5;
