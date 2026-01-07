import { ArrowLeft, FileText, Clock, CheckCircle, AlertTriangle, Wrench, HelpCircle, ChevronRight, ChevronLeft, BookOpen, ClipboardCheck, List, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const TITLE = "BS 7671 Testing Requirements Overview - Inspection & Testing";
const DESCRIPTION = "Comprehensive overview of BS 7671 Part 6 testing requirements, including initial verification, periodic inspection, test sequences, and certification requirements.";

const quickCheckQuestions = [
  {
    question: "Which part of BS 7671 covers inspection and testing requirements?",
    options: ["Part 4", "Part 5", "Part 6", "Part 7"],
    correctAnswer: 2,
    explanation: "Part 6 of BS 7671 covers 'Inspection and Testing' including initial verification (Chapter 61) and periodic inspection and testing (Chapter 62)."
  },
  {
    question: "What is the recommended maximum inspection interval for a domestic dwelling?",
    options: ["1 year", "5 years", "10 years", "25 years"],
    correctAnswer: 2,
    explanation: "BS 7671 Table 62.1 recommends a maximum interval of 10 years for domestic dwellings (owner-occupied), or 5 years for rented properties."
  },
  {
    question: "Which tests must be done before the supply is connected?",
    options: ["RCD tests only", "Earth fault loop tests", "Continuity and insulation resistance tests", "Functional tests"],
    correctAnswer: 2,
    explanation: "Dead tests (continuity of protective conductors, insulation resistance, polarity) must be completed before the supply is connected. Live tests follow after."
  }
];

const quizQuestions = [
  {
    question: "Regulation 610.1 of BS 7671 requires that every installation shall be:",
    options: ["Inspected once completed", "Tested annually", "Inspected and tested during erection and on completion", "Certified by building control"],
    correctAnswer: 2,
    explanation: "Regulation 610.1 states that every installation shall be inspected and tested during erection and on completion before being put into service."
  },
  {
    question: "What does Chapter 62 of BS 7671 cover?",
    options: ["Initial verification", "Periodic inspection and testing", "Equipment selection", "Earthing arrangements"],
    correctAnswer: 1,
    explanation: "Chapter 62 covers periodic inspection and testing of existing installations, while Chapter 61 covers initial verification."
  },
  {
    question: "The recommended inspection interval for an industrial installation is:",
    options: ["1 year", "3 years", "5 years", "10 years"],
    correctAnswer: 1,
    explanation: "Table 62.1 recommends a maximum interval of 3 years for industrial installations."
  },
  {
    question: "Which document should be issued after initial verification of a new installation?",
    options: ["EICR", "Minor Works Certificate", "Electrical Installation Certificate (EIC)", "PAT Test Certificate"],
    correctAnswer: 2,
    explanation: "An Electrical Installation Certificate (EIC) must be issued after initial verification of a new installation or addition to an existing installation."
  },
  {
    question: "Visual inspection should be carried out:",
    options: ["After testing", "Before testing", "Only if tests fail", "At random"],
    correctAnswer: 1,
    explanation: "Visual inspection must be carried out before testing, with the installation isolated from the supply."
  },
  {
    question: "The correct sequence for testing is:",
    options: ["Live tests then dead tests", "Dead tests then live tests", "Tests can be done in any order", "Only dead tests are required"],
    correctAnswer: 1,
    explanation: "Dead tests (continuity, insulation resistance, polarity) must be completed before live tests (earth fault loop, RCD, functional) are carried out."
  },
  {
    question: "What is the purpose of Guidance Note 3 (GN3)?",
    options: ["To replace BS 7671", "To provide practical guidance on inspection and testing", "To certify electricians", "To define cable sizes"],
    correctAnswer: 1,
    explanation: "GN3 provides practical guidance on implementing Part 6 of BS 7671, including test procedures, equipment requirements, and worked examples."
  },
  {
    question: "An EICR is required for:",
    options: ["New installations only", "Alterations only", "Periodic inspection of existing installations", "Portable appliances"],
    correctAnswer: 2,
    explanation: "An Electrical Installation Condition Report (EICR) is used for periodic inspection of existing installations to report on their condition."
  },
  {
    question: "Who must sign an Electrical Installation Certificate?",
    options: ["The client", "Any contractor", "The skilled person who designed, constructed and verified the installation", "A building inspector"],
    correctAnswer: 2,
    explanation: "An EIC must be signed by the skilled persons responsible for design, construction, and inspection & testing of the installation."
  },
  {
    question: "Swimming pool electrical installations should be inspected at maximum intervals of:",
    options: ["6 months", "1 year", "3 years", "5 years"],
    correctAnswer: 1,
    explanation: "Swimming pools and other special locations require more frequent inspection - typically annually due to the increased risk of electric shock."
  }
];

const faqs = [
  {
    question: "What's the difference between initial verification and periodic inspection?",
    answer: "Initial verification is carried out during and after installation of new work to confirm it meets BS 7671 requirements. Periodic inspection examines existing installations to check they remain safe for continued use. Initial verification results in an EIC; periodic inspection results in an EICR."
  },
  {
    question: "Can I use old certification forms?",
    answer: "Certification forms should align with the current edition of BS 7671. While older forms may be legally valid if completed at the time, it's best practice to use current model forms from the IET or your competent person scheme."
  },
  {
    question: "What if the installation predates BS 7671?",
    answer: "Installations don't have to be upgraded to current standards unless they're unsafe. However, any new work or alterations must comply with current requirements. EICR observations should note where the installation differs from current standards."
  },
  {
    question: "Who should retain copies of certificates?",
    answer: "The client/owner should receive the original certificate. The contractor should retain a copy. For competent person scheme work, the scheme operator also retains copies. Records should be kept for at least the next inspection interval."
  },
  {
    question: "What tests are mandatory for initial verification?",
    answer: "BS 7671 requires: continuity of protective conductors, continuity of ring final circuits, insulation resistance, polarity, earth electrode resistance (where applicable), earth fault loop impedance, prospective fault current, RCD operation, and functional testing."
  },
  {
    question: "Can periodic inspection be done without disconnecting the supply?",
    answer: "While some tests require isolation, periodic inspection can often proceed with circuits live if safe to do so. However, insulation resistance testing requires circuits to be isolated. A risk assessment determines the safest approach."
  }
];

const referenceItems = [
  { label: "Part 6", value: "Inspection & Testing" },
  { label: "Chapter 61", value: "Initial Verification" },
  { label: "Chapter 62", value: "Periodic Inspection" },
  { label: "Reg 610.1", value: "Every installation tested" },
  { label: "Reg 631.1", value: "Visual inspection first" },
  { label: "Reg 650.1", value: "Periodic inspection purpose" },
  { label: "GN3", value: "Guidance Note 3" },
  { label: "EIC", value: "New installations" },
  { label: "EICR", value: "Existing installations" },
];

const InspectionTestingModule1Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module1">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 1</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 2</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <FileText className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
            Module 1 • Section 2
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          BS 7671 Testing Requirements
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed">
          A comprehensive overview of Part 6 requirements, initial verification, periodic inspection, and the correct sequence of tests.
        </p>
      </section>

      {/* In 30 Seconds */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Part 6 of BS 7671 covers all inspection and testing requirements for electrical installations</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Visual inspection must be completed before any testing begins</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Dead tests must be completed before live tests - sequence matters for safety</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Understand Part 6 of BS 7671",
            "Identify initial verification requirements",
            "Explain periodic inspection requirements",
            "Describe the correct sequence of tests",
            "Understand certification requirements",
            "Apply correct test procedures"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="text-[15px] text-white/80">{outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Section 01 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">01</span>
          <h2 className="text-[22px] font-semibold text-white">Part 6 of BS 7671 Overview</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Part 6</strong> of BS 7671 is dedicated entirely to inspection and testing. It provides the requirements for verifying that electrical installations comply with the standard and are safe for use.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Structure of Part 6</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <BookOpen className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Chapter 61</p>
                <p className="text-[13px] text-white/60">Initial Verification</p>
                <p className="text-[13px] text-white/60 mt-1">Requirements for testing new installations</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Calendar className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Chapter 62</p>
                <p className="text-[13px] text-white/60">Periodic Inspection</p>
                <p className="text-[13px] text-white/60 mt-1">Requirements for testing existing installations</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <ClipboardCheck className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Chapter 63</p>
                <p className="text-[13px] text-white/60">Certification & Reporting</p>
                <p className="text-[13px] text-white/60 mt-1">Documentation requirements</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <List className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Appendix 6</p>
                <p className="text-[13px] text-white/60">Model Forms</p>
                <p className="text-[13px] text-white/60 mt-1">Standard certification templates</p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Relationship to Other Parts</h3>
            <p>
              Part 6 references requirements from other parts of BS 7671:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• <strong className="text-white">Part 4</strong> - Protection for safety (shock, fire, overcurrent)</li>
              <li>• <strong className="text-white">Part 5</strong> - Selection and erection of equipment</li>
              <li>• <strong className="text-white">Part 7</strong> - Special installations (additional test requirements)</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">02</span>
          <h2 className="text-[22px] font-semibold text-white">Initial Verification</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Initial verification</strong> is required for all new installations, additions, and alterations. It confirms that the installation complies with BS 7671 before being put into service.
            </p>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/20">
              <p className="text-white italic">
                <strong>Regulation 610.1:</strong> "Every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as reasonably practicable, that the requirements of the Regulations have been met."
              </p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">When Initial Verification is Required</h3>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>New electrical installations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Additions to existing installations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Alterations to existing installations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>After major modifications or repairs</span>
              </li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Extent of Initial Verification</h3>
            <p>
              The extent of testing depends on the nature of the work:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• <strong className="text-white">New installation:</strong> All tests on all circuits</li>
              <li>• <strong className="text-white">Addition:</strong> Tests on new work plus verification existing installation can accommodate it</li>
              <li>• <strong className="text-white">Alteration:</strong> Tests on altered work plus verification of non-interference with existing installation</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* InlineCheck 1 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[0]} />
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">03</span>
          <h2 className="text-[22px] font-semibold text-white">Periodic Inspection</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Periodic inspection and testing</strong> examines existing installations to confirm they remain safe for continued use. It identifies wear, damage, deterioration, and defects.
            </p>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/20">
              <p className="text-white italic">
                <strong>Regulation 650.1:</strong> "Periodic inspection and testing shall reveal whether an installation is in a satisfactory condition for continued use."
              </p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Recommended Maximum Intervals (Table 62.1)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white">Installation Type</th>
                    <th className="text-right py-2 text-elec-yellow">Max Interval</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/5">
                    <td className="py-2">Domestic (owner occupied)</td>
                    <td className="text-right text-elec-yellow">10 years</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Domestic (rented/change of tenancy)</td>
                    <td className="text-right text-elec-yellow">5 years</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Commercial</td>
                    <td className="text-right text-elec-yellow">5 years</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Industrial</td>
                    <td className="text-right text-elec-yellow">3 years</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Leisure / Entertainment</td>
                    <td className="text-right text-elec-yellow">3 years</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Swimming pools</td>
                    <td className="text-right text-elec-yellow">1 year</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Construction sites</td>
                    <td className="text-right text-elec-yellow">3 months</td>
                  </tr>
                  <tr>
                    <td className="py-2">Agricultural / Horticultural</td>
                    <td className="text-right text-elec-yellow">3 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  These are <strong className="text-white">maximum</strong> intervals. Risk assessment may require more frequent inspection. Change of use, building alterations, or environmental factors may reduce appropriate intervals.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Section 04 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">04</span>
          <h2 className="text-[22px] font-semibold text-white">Required Tests Sequence</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Tests must be carried out in the correct sequence for safety reasons. The order ensures that any faults are identified before the installation is energised.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Stage 1: Visual Inspection (Supply Off)</h3>
            <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 mb-4">
              <p className="text-white">Regulation 631.1 requires visual inspection before testing commences.</p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-4 mb-3">Stage 2: Dead Tests (Supply Isolated)</h3>
            <ol className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">1</span>
                <span>Continuity of protective conductors (R1+R2)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">2</span>
                <span>Continuity of ring final circuit conductors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">3</span>
                <span>Insulation resistance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">4</span>
                <span>Polarity (can also be live)</span>
              </li>
            </ol>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Stage 3: Live Tests (Supply Connected)</h3>
            <ol className="space-y-3 ml-4" start={5}>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-[13px] font-bold flex-shrink-0">5</span>
                <span>Earth electrode resistance (where applicable)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-[13px] font-bold flex-shrink-0">6</span>
                <span>Earth fault loop impedance (Ze and Zs)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-[13px] font-bold flex-shrink-0">7</span>
                <span>Prospective fault current</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-[13px] font-bold flex-shrink-0">8</span>
                <span>RCD operation (trip time testing)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-[13px] font-bold flex-shrink-0">9</span>
                <span>Functional testing</span>
              </li>
            </ol>
          </div>
        </Card>
      </section>

      {/* InlineCheck 2 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[1]} />
      </section>

      {/* Content Section 05 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">05</span>
          <h2 className="text-[22px] font-semibold text-white">Certification Requirements</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Chapter 63 of BS 7671 requires that appropriate certification is provided on completion of initial verification and periodic inspection.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Types of Certification</h3>
            <div className="space-y-3">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Electrical Installation Certificate (EIC)</p>
                    <p className="text-[14px] text-white/80 mt-1">For new installations or additions/alterations. Confirms compliance with BS 7671. Includes Schedule of Inspections and Schedule of Test Results.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <ClipboardCheck className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Electrical Installation Condition Report (EICR)</p>
                    <p className="text-[14px] text-white/80 mt-1">For periodic inspection of existing installations. Reports on condition rather than confirming compliance. Uses classification codes for observations.</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Minor Electrical Installation Works Certificate</p>
                    <p className="text-[14px] text-white/80 mt-1">For minor work that doesn't include new circuits. Examples: adding a socket to an existing circuit, replacing a consumer unit like-for-like.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Who Can Sign Certificates</h3>
            <p>
              Certificates must be signed by <strong className="text-white">skilled persons</strong> who are competent in the relevant area:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• <strong className="text-white">EIC:</strong> Designer, constructor, and person responsible for inspection & testing (may be different people)</li>
              <li>• <strong className="text-white">EICR:</strong> The person responsible for the inspection and testing</li>
              <li>• <strong className="text-white">Minor Works:</strong> The person carrying out the work</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 06 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">06</span>
          <h2 className="text-[22px] font-semibold text-white">Guidance Note 3 (GN3)</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">IET Guidance Note 3 (GN3)</strong> is an essential companion to BS 7671 Part 6. It provides practical guidance on implementing inspection and testing requirements.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">What GN3 Covers</h3>
            <ul className="space-y-2 ml-4">
              <li>• Detailed test procedures and methods</li>
              <li>• Worked examples of test calculations</li>
              <li>• Equipment requirements and selection</li>
              <li>• Recording and documentation guidance</li>
              <li>• Common problems and solutions</li>
              <li>• Expanded explanation of BS 7671 requirements</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">GN3 and BS 7671</h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/80">
                GN3 does <strong className="text-white">not</strong> replace or override BS 7671. Where there appears to be conflict, BS 7671 takes precedence. GN3 provides interpretation and practical application guidance.
              </p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Key Sections in GN3</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-elec-yellow font-semibold text-[14px]">Chapter 2</p>
                <p className="text-[13px] text-white/60">Test equipment requirements</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-elec-yellow font-semibold text-[14px]">Chapter 3</p>
                <p className="text-[13px] text-white/60">Visual inspection guidance</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-elec-yellow font-semibold text-[14px]">Chapter 4</p>
                <p className="text-[13px] text-white/60">Testing methods and procedures</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-elec-yellow font-semibold text-[14px]">Chapter 5</p>
                <p className="text-[13px] text-white/60">Certification and reporting</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* InlineCheck 3 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[2]} />
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Practical Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Applying BS 7671 in Practice</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Always have the current edition of BS 7671 available on site</li>
                <li>• Use GN3 for detailed test procedure guidance</li>
                <li>• Check for amendments that may affect your work</li>
                <li>• Reference specific regulations in your documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Testing in wrong sequence (live tests before dead tests)</li>
                <li>• Missing visual inspection items</li>
                <li>• Using incorrect certification forms</li>
                <li>• Not completing all required tests</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Documentation Tips</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Record all test results, not just pass/fail</li>
                <li>• Note any limitations to the inspection</li>
                <li>• Document observations even if not defects</li>
                <li>• Keep copies of all certification issued</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} variant="ios" className="p-4">
              <h3 className="text-[17px] font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-[15px] text-white/70 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reference Card */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <UnitsPocketCard
          title="BS 7671 Part 6 Reference"
          items={referenceItems}
        />
      </section>

      {/* Quiz */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Quiz
          questions={quizQuestions}
          title="Section 2 Quiz"
          description="Test your knowledge of BS 7671 testing requirements"
        />
      </section>

      {/* Navigation */}
      <footer className="px-4 pb-safe pt-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="flex gap-3">
          <Button variant="ios-secondary" size="ios-default" className="flex-1" asChild>
            <Link to="../section1">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </Link>
          </Button>
          <Button variant="ios-primary" size="ios-default" className="flex-1" asChild>
            <Link to="../section3">
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default InspectionTestingModule1Section2;
