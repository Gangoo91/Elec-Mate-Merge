import { ArrowLeft, Tag, CheckCircle, AlertTriangle, Clock, Zap, Wrench, HelpCircle, ChevronRight, ChevronLeft, Calendar, QrCode, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'PAT Labels - PAT Testing Course';
const DESCRIPTION = 'Learn about PAT labelling requirements, systems, and best practices for clear identification and tracking of tested equipment.';

const quickCheckQuestions = [
  {
    id: 'm5s1-check1',
    question: 'What information should a PAT pass label include as a minimum?',
    options: ['Just the date tested', 'Date tested, retest date, and tester identification', 'Equipment make and model', 'The test results and readings'],
    correctIndex: 1,
    explanation: 'As a minimum, PAT labels should show the date of test, when the next test is due, and identification of who performed the test (initials, name, or ID number). Some also include asset ID.'
  },
  {
    id: 'm5s1-check2',
    question: 'How should equipment that has failed PAT testing be labelled?',
    options: ['With a standard pass label but marked as borderline', 'With a clear FAIL or DO NOT USE label', 'No label is required - just remove from use', 'With a red pass label'],
    correctIndex: 1,
    explanation: 'Failed equipment must be clearly labelled with a FAIL or DO NOT USE label to prevent accidental use. The label should be obvious and the equipment should be withdrawn from service immediately.'
  },
  {
    id: 'm5s1-check3',
    question: 'What is the main purpose of an asset ID number on PAT labels?',
    options: ['To satisfy insurance requirements', 'To track equipment cost for accounting', 'To link the equipment to its test history in records', 'To identify the manufacturer'],
    correctIndex: 2,
    explanation: 'Asset ID numbers create a unique identifier that links physical equipment to its complete test history, location records, and maintenance information in your database or records system.'
  }
];

const quizQuestions = [
  { question: 'What is the primary purpose of PAT labels?', options: ['To satisfy insurance companies', 'To provide clear evidence of test status and due dates', 'To make equipment look professional', 'To track warranty periods'], correctAnswer: 1 },
  { question: 'A PASS label should include:', options: ['Only the test date', 'Test date, retest date, and tester ID as minimum', 'Full test results and readings', 'Equipment specifications'], correctAnswer: 1 },
  { question: 'Failed equipment should be labelled with:', options: ['A pass label with notes', 'A clear FAIL or DO NOT USE label', 'No label required', 'A red pass label'], correctAnswer: 1 },
  { question: 'Colour-coded label systems typically use which colour for pass?', options: ['Red', 'Green', 'Yellow', 'Blue'], correctAnswer: 1 },
  { question: 'Where should PAT labels be placed?', options: ['On the cable', 'Visible and secure, typically on the equipment body', 'Inside the equipment', 'On the plug only'], correctAnswer: 1 },
  { question: 'Labels should be made from materials that are:', options: ['Paper for easy replacement', 'Durable and resistant to the working environment', 'Decorative and colourful', 'As large as possible'], correctAnswer: 1 },
  { question: 'Asset ID numbers should be:', options: ['Changed each test', 'Unique and consistent throughout equipment life', 'Based on the test date', 'The same as the serial number'], correctAnswer: 1 },
  { question: 'Barcode or QR code labels are useful for:', options: ['Making labels look modern', 'Quick data entry and linking to electronic records', 'Proving equipment is genuine', 'Reducing label cost'], correctAnswer: 1 },
  { question: 'When should a new label be applied?', options: ['Only on first test', 'After each test, replacing the previous label', 'Only if the equipment changes location', 'Only after a fail'], correctAnswer: 1 },
  { question: 'Monthly colour coding systems help:', options: ['Reduce label costs', 'Quick visual identification of test due dates', 'Satisfy legal requirements', 'Make equipment look better'], correctAnswer: 1 }
];

const faqs = [
  { question: 'Are PAT labels legally required?', answer: 'Labels are not specifically required by law, but they are strongly recommended as part of a practical maintenance system. They provide evidence of testing and prevent use of untested or failed equipment.' },
  { question: 'What size should labels be?', answer: 'Labels should be large enough to be easily read but small enough to fit the equipment. Typical sizes range from 25x50mm to 50x100mm. The key is that information must be clearly legible.' },
  { question: 'Can I write labels by hand?', answer: 'Yes, hand-written labels are acceptable if they are clear and legible. However, printed labels (from PAT testers or printers) are more professional and reduce transcription errors.' },
  { question: 'What if a label falls off?', answer: 'Re-label the equipment at the next test or immediately if you notice. Consider using more durable labels or better placement. Some use cable ties through a hole in the label for security.' },
  { question: 'Should I label extension leads differently?', answer: 'Extension leads should be labelled the same as other equipment. Place the label where it is visible - often on the socket board body. Some testers also print separate lead identification tags.' },
  { question: 'How long should labels last?', answer: 'Labels should remain legible until the next test. For annual testing, labels must last at least 12 months. Choose appropriate materials for the environment - laminated or synthetic labels for harsh conditions.' }
];

const PATTestingModule5Section1 = () => {
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
              <Tag className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-elec-yellow/80 text-sm font-medium">Module 5 - Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">PAT Labels: Pass/Fail, Retest Dates, Asset ID</h1>
          <p className="text-white/60 text-base">Labelling systems and identification requirements</p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 12 min read</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="text-sm text-white space-y-1">
            <li>- PAT labels provide visible evidence of testing</li>
            <li>- Minimum info: test date, retest date, tester ID</li>
            <li>- Use PASS (green) or FAIL (red) labels clearly</li>
            <li>- Asset IDs link equipment to records</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Describe the purpose and importance of PAT labels', 'List the minimum information required on labels', 'Explain pass and fail labelling procedures', 'Describe asset identification systems', 'Select appropriate label types for different environments', 'Apply labels correctly for maximum durability'].map((outcome, i) => (
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
            Purpose of PAT Labels
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>PAT labels serve several important purposes in a maintenance system:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Visual Evidence</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Shows equipment has been tested</li>
                  <li>- Indicates when the next test is due</li>
                  <li>- Identifies who performed the test</li>
                  <li>- Provides quick status check at a glance</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Control Purposes</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Prevents use of untested equipment</li>
                  <li>- Identifies failed equipment clearly</li>
                  <li>- Links to test records via asset ID</li>
                  <li>- Supports audit and compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Label Information Requirements
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>PAT labels should include certain minimum information:</p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2"><Calendar className="h-5 w-5" /> Minimum Requirements</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium mb-1">Essential:</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>- Date of test (DD/MM/YYYY)</li>
                    <li>- Date of next test (retest date)</li>
                    <li>- Tester identification</li>
                    <li>- PASS or FAIL indication</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Recommended:</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>- Asset/equipment ID number</li>
                    <li>- Company name or logo</li>
                    <li>- Barcode or QR code</li>
                    <li>- Location code</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-medium mb-2">Tester Identification</h4>
              <p className="text-white/70 text-sm">Tester ID can be initials, full name, or an ID number. The key is that it allows tracing back to who performed the test if questions arise. Some organisations use numbered ID cards.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Pass and Fail Labels
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2"><CheckCircle className="h-5 w-5" /> PASS Labels</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Usually green colour scheme</li>
                  <li>- Clear PASS or TESTED indication</li>
                  <li>- Shows next test due date</li>
                  <li>- Applied after successful testing</li>
                  <li>- Replaces any previous label</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> FAIL Labels</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Usually red colour scheme</li>
                  <li>- Clear FAIL or DO NOT USE</li>
                  <li>- Applied immediately on failure</li>
                  <li>- Equipment withdrawn from use</li>
                  <li>- Prevents accidental use</li>
                </ul>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-red-400" /><h4 className="text-red-400 font-semibold">Important</h4></div>
              <p className="text-white/70 text-sm">Never leave failed equipment unlabelled. Always apply a clear FAIL label and physically prevent use (remove plug, isolate, or secure away) to prevent accidental use by others.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Asset Identification Systems
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Asset ID numbers create a unique, permanent identifier for each piece of equipment:</p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><QrCode className="h-5 w-5" /> ID Number Formats</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-sm mb-2"><strong className="text-white">Simple sequential:</strong></p>
                  <p className="text-white/60 text-sm font-mono">001, 002, 003...</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-2"><strong className="text-white">Location prefixed:</strong></p>
                  <p className="text-white/60 text-sm font-mono">OFF-001, WKS-001, KIT-001</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-2"><strong className="text-white">Department coded:</strong></p>
                  <p className="text-white/60 text-sm font-mono">IT-PC-001, MNT-TL-001</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-2"><strong className="text-white">Year prefixed:</strong></p>
                  <p className="text-white/60 text-sm font-mono">2024-001, 2024-002</p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Barcode/QR Benefits</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Fast, error-free data entry</li>
                  <li>- Links directly to records</li>
                  <li>- Speeds up testing process</li>
                  <li>- Reduces manual transcription</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Key Principles</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- One ID per equipment for life</li>
                  <li>- Never reuse numbers</li>
                  <li>- Keep system consistent</li>
                  <li>- Document the numbering scheme</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Label Types and Durability
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Choose label materials appropriate for the environment:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Palette className="h-5 w-5" /> Label Materials</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li><strong className="text-white">Paper:</strong> Low cost, office use only</li>
                  <li><strong className="text-white">Vinyl:</strong> Good durability, most applications</li>
                  <li><strong className="text-white">Polyester:</strong> Excellent durability, harsh environments</li>
                  <li><strong className="text-white">Metallic:</strong> Very durable, high temperature</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Placement Guidelines</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Visible when equipment is in use</li>
                  <li>- Clean, dry, flat surface</li>
                  <li>- Away from heat sources</li>
                  <li>- Not on moving parts or cables</li>
                  <li>- Consider cable tie for leads</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" /> Practical Guidance
          </h2>
          <div className="grid gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h3 className="text-green-400 font-semibold mb-3">Best Practice Tips</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Remove old labels before applying new ones</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Clean the surface before applying labels</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Use colour coding for quick visual identification</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /><span>Consider monthly colour codes for large inventories</span></li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-400 font-semibold mb-3">Common Mistakes to Avoid</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Applying labels to dirty or oily surfaces</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Using paper labels in harsh environments</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Not labelling failed equipment immediately</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span>Reusing asset ID numbers for new equipment</span></li>
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
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: PAT Labels</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-green-400 font-semibold mb-2">PASS Label Must Show</h4><ul className="text-white space-y-1"><li>- Test date</li><li>- Retest date</li><li>- Tester ID</li><li>- Asset ID (recommended)</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-red-400 font-semibold mb-2">FAIL Label Must</h4><ul className="text-white space-y-1"><li>- Be clearly visible</li><li>- Say FAIL or DO NOT USE</li><li>- Be applied immediately</li><li>- Equipment withdrawn</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Label Placement</h4><ul className="text-white space-y-1"><li>- Visible in normal use</li><li>- Clean, flat surface</li><li>- Away from heat/damage</li></ul></div>
            <div className="bg-black/20 rounded-lg p-4"><h4 className="text-elec-yellow font-semibold mb-2">Asset ID Rules</h4><ul className="text-white space-y-1"><li>- Unique per equipment</li><li>- Never reuse numbers</li><li>- Permanent for life</li></ul></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 5.1 Quiz</h2>
          <p className="text-white/60">Test your understanding of PAT labelling systems.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m5s1" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../../pat-testing/module-4/section-6" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Interpreting Results
            </Button>
          </Link>
          <Link to="../section-2" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Test Record Keeping <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule5Section1;
