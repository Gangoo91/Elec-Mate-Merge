import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, FileCheck, Award, Users, Stamp, Building, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule8Section4 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Electrical Installation Certificates | Module 8 Section 4 | Inspection & Testing",
    description: "Learn to correctly complete Electrical Installation Certificates (EICs) for new installations and additions, including all required signatures and declarations."
  });

  const learningOutcomes = [
    { icon: FileCheck, text: "Understand when an EIC is required" },
    { icon: Award, text: "Complete all sections of the certificate correctly" },
    { icon: Users, text: "Identify who can sign which parts" },
    { icon: Stamp, text: "Apply correct declaration statements" },
    { icon: Building, text: "Differentiate between EIC and other certificates" },
    { icon: Calendar, text: "Determine recommended retest intervals" }
  ];

  const quizQuestions = [
    {
      question: "When is an Electrical Installation Certificate (EIC) required?",
      options: [
        "For all electrical work regardless of size",
        "For new installations and additions to existing installations",
        "Only for commercial installations",
        "Only when specifically requested by the client"
      ],
      correctAnswer: 1,
      explanation: "An EIC is required for new electrical installations and for additions or alterations to existing installations where new circuits are added. It's a mandatory requirement under BS 7671."
    },
    {
      question: "How many signatures are required on a standard EIC?",
      options: [
        "One - the installer only",
        "Two - installer and client",
        "Three - designer, constructor, inspector/tester",
        "Four - including the DNO"
      ],
      correctAnswer: 2,
      explanation: "An EIC requires three signatures: the designer (design responsibility), the constructor (installation responsibility), and the inspector/tester (inspection and testing responsibility)."
    },
    {
      question: "What does the designer's signature on an EIC confirm?",
      options: [
        "They witnessed the installation",
        "The design complies with BS 7671 and the characteristics checked",
        "They will maintain the installation",
        "The installation matches their drawings"
      ],
      correctAnswer: 1,
      explanation: "The designer's signature confirms that the design of the installation complies with BS 7671 and that the characteristics of the supply have been checked and recorded."
    },
    {
      question: "Can one person sign all three parts of an EIC?",
      options: [
        "No - three different people are always required",
        "Yes - if qualified to do all three roles",
        "Only in domestic installations",
        "Only with special permission"
      ],
      correctAnswer: 1,
      explanation: "One person can sign all three parts if they are qualified and have personally undertaken the design, construction, and inspection/testing. This is common for smaller jobs by competent electricians."
    },
    {
      question: "What documentation must accompany an EIC?",
      options: [
        "No additional documentation required",
        "Schedule of Inspections and Schedule of Test Results",
        "Only manufacturer's datasheets",
        "Insurance certificate"
      ],
      correctAnswer: 1,
      explanation: "An EIC must be accompanied by a completed Schedule of Inspections (inspection checklist) and Schedule of Test Results (all measured values for each circuit)."
    },
    {
      question: "The 'extent' section of an EIC describes:",
      options: [
        "The total cable length used",
        "Which parts of the installation are covered by this certificate",
        "The duration of the work",
        "The cost of materials"
      ],
      correctAnswer: 1,
      explanation: "The 'extent and limitations' section describes exactly what work is covered by this certificate, including any parts not inspected/tested due to access limitations."
    },
    {
      question: "What recommended interval should be stated for a domestic installation?",
      options: [
        "1 year",
        "5 years (or on change of occupancy)",
        "10 years",
        "No interval is stated on an EIC"
      ],
      correctAnswer: 1,
      explanation: "For domestic installations, a 5-year maximum interval (or on change of occupancy) is typically recommended for periodic inspection and testing. This should be stated on the certificate."
    },
    {
      question: "An EIC for an addition to an existing installation should reference:",
      options: [
        "Only the new circuits added",
        "The whole building's electrical system",
        "Only the consumer unit",
        "Previous certificates"
      ],
      correctAnswer: 0,
      explanation: "The EIC covers only the work carried out (the addition). The extent should clearly state this is for additional circuits only. The existing installation requires its own EICR if inspection is needed."
    },
    {
      question: "Who should receive the original EIC?",
      options: [
        "The electrical contractor",
        "The local authority",
        "The person ordering the work (client)",
        "The DNO"
      ],
      correctAnswer: 2,
      explanation: "Regulation 632.4 requires the original certificate to be given to the person ordering the work. The contractor should retain a copy. For Building Regulations work, a copy goes to Building Control."
    },
    {
      question: "If inspection reveals a dangerous condition (C1), can an EIC still be issued?",
      options: [
        "Yes - the defect is noted but certificate issued",
        "No - the dangerous condition must be rectified first",
        "Yes - if the client signs a waiver",
        "No - an EICR must be issued instead"
      ],
      correctAnswer: 1,
      explanation: "An EIC can only be issued when the installation complies with BS 7671. Dangerous conditions must be rectified before the certificate is issued. The installation cannot be certified until safe."
    }
  ];

  const faqData = [
    {
      question: "Can I issue an EIC if I didn't do the design?",
      answer: "The EIC requires separate signatures for design, construction, and inspection. If you didn't design it, the designer should sign their section. If design information isn't available, you may need to assess and take design responsibility before signing."
    },
    {
      question: "What's the difference between EIC and Minor Works Certificate?",
      answer: "An EIC is for new installations, additions, or alterations that include new circuits. A Minor Works Certificate is for work that doesn't add new circuits - such as adding a socket to an existing circuit or replacing a consumer unit."
    },
    {
      question: "How long should I keep copies of certificates?",
      answer: "Contractors should retain copies of certificates for the recommended inspection interval (e.g., 5 years for domestic) as a minimum. Many recommend keeping them for at least 10 years or longer for professional indemnity purposes."
    },
    {
      question: "Does an EIC need to be issued for notifiable work?",
      answer: "Yes. For work notifiable under Building Regulations Part P, an EIC is required and a copy must be provided to Building Control (either directly or via a competent person scheme). The EIC demonstrates compliance."
    },
    {
      question: "What if I find issues with the existing installation during an addition?",
      answer: "Note limitations on the EIC that it covers only the new work. Advise the client in writing about any observed issues with the existing installation and recommend an EICR. Do not try to certify work you haven't done."
    },
    {
      question: "Can an apprentice sign an EIC?",
      answer: "Only someone competent (qualified and experienced) to undertake the work can sign. An apprentice under supervision would not typically sign - the supervising electrician would sign. The signature confirms competence and responsibility."
    }
  ];

  const pocketCardUnits = [
    { name: "Signatures", symbol: "3", unit: "required" },
    { name: "Designer", symbol: "Design", unit: "compliance" },
    { name: "Constructor", symbol: "Build", unit: "compliance" },
    { name: "Inspector", symbol: "Test", unit: "results" },
    { name: "Domestic Retest", symbol: "5", unit: "years max" },
    { name: "Commercial", symbol: "1-5", unit: "years" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8')}
            className="flex items-center gap-2 text-sky-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 8</span>
          </button>
          <span className="text-white/60 text-sm">4 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/20 rounded-full mb-4">
            <span className="text-sky-400 text-sm font-medium">Module 8 • Visual Inspection & Documentation</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Electrical Installation Certificates
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Complete and issue Electrical Installation Certificates correctly for new installations and additions, with all required signatures and declarations.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <Card variant="ios-elevated" className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-sky-400" />
              <h2 className="text-white font-semibold text-lg">In 30 Seconds</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">EIC required for new installations and additions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Three signatures: Designer, Constructor, Inspector/Tester</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Must include Schedule of Inspections and Test Results</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-sky-400" />
            Learning Outcomes
          </h2>
          <div className="grid gap-3">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} variant="ios" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center shrink-0">
                    <outcome.icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <span className="text-white/90 text-base">{outcome.text}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Section 01 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">01</span>
            <h2 className="text-xl font-semibold text-white">When to Use an EIC</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                An Electrical Installation Certificate is required when new circuits are created or new installations are completed:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-2">EIC Required For</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Complete new electrical installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Additions to existing installations (new circuits)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Alterations that include new circuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Work notifiable under Building Regulations</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">The Three Signatures</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                An EIC requires three signatures, each confirming different responsibilities:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">1. Designer</h4>
                  <p className="text-white/70 text-sm">Confirms the design complies with BS 7671, supply characteristics are checked and recorded, and the design will provide for safe operation.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">2. Constructor (Installer)</h4>
                  <p className="text-white/70 text-sm">Confirms the installation has been constructed in accordance with BS 7671, using suitable materials and good workmanship.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">3. Inspector and Tester</h4>
                  <p className="text-white/70 text-sm">Confirms inspection and testing has been carried out in accordance with BS 7671, the results are attached, and the installation is safe for use.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="You designed, installed, and tested a new installation yourself. How many signatures do you need on the EIC?"
            answer="Still three signatures, but you sign all three sections yourself. You're signing as the designer, constructor, and inspector/tester - taking responsibility for all three roles."
            color="sky"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Certificate Sections</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                The EIC has several sections that must be completed fully:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Key Sections</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-sky-400 shrink-0" />
                    <span><strong>Details:</strong> Address, description, extent and limitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-sky-400 shrink-0" />
                    <span><strong>Supply:</strong> Type (TN-S, TN-C-S, TT), voltage, PSCC, Ze</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-sky-400 shrink-0" />
                    <span><strong>Installation:</strong> Type of wiring, earthing arrangements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-sky-400 shrink-0" />
                    <span><strong>Signatures:</strong> All three with dates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-sky-400 shrink-0" />
                    <span><strong>Recommendation:</strong> Next inspection date</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Extent and Limitations</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                The 'extent and limitations' section is crucial - it defines exactly what the certificate covers:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-2">What to Include</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Specific description of work covered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Circuit numbers or distribution boards included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Any areas that could not be inspected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Any items agreed as exclusions</span>
                  </li>
                </ul>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    Never certify work you haven't done or inspected. If the existing installation has issues, note this separately and recommend an EICR.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="You're adding a new circuit to an existing installation. Should the EIC cover the whole installation?"
            answer="No. The EIC covers only the new work (the additional circuit). State clearly in the extent section that this certificate covers only the new circuit. The existing installation requires its own separate inspection."
            color="sky"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Recommended Inspection Intervals</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                The EIC should state a recommended maximum interval before the next periodic inspection:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Typical Intervals</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Domestic</span>
                    <span className="text-sky-400">5 years / change of occupancy</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Commercial</span>
                    <span className="text-sky-400">5 years</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Industrial</span>
                    <span className="text-sky-400">3 years</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Swimming pools</span>
                    <span className="text-sky-400">1 year</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">Construction sites</span>
                    <span className="text-sky-400">3 months</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Distribution and Retention</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Correct distribution of the certificate is a regulatory requirement:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Distribution Requirements</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span><strong>Original:</strong> To the person ordering the work (client)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span><strong>Copy:</strong> Retained by the contractor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span><strong>Building Control:</strong> Copy if notifiable work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span><strong>Scheme Provider:</strong> If registered with competent person scheme</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="You've completed notifiable work (new circuit in a kitchen) as a registered competent person. Who needs the EIC?"
            answer="Original to client, copy retained by you, and notification to your competent person scheme who notify Building Control. The scheme handles the Building Control notification on your behalf."
            color="sky"
          />
        </div>

        {/* Practical Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-400" />
            Practical Tips
          </h2>
          <div className="space-y-3">
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Use Model Forms</h4>
                  <p className="text-white/60 text-sm">BS 7671 appendix includes model forms - use these or equivalent</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Check All Sections</h4>
                  <p className="text-white/60 text-sm">Don't leave blanks - use N/A where not applicable</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Don't Back-Date</h4>
                  <p className="text-white/60 text-sm">Sign and date when work is complete and tested - never back-date</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <Card key={index} variant="ios" className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 active:bg-white/5 transition-colors touch-manipulation"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-white/40 transition-transform shrink-0",
                    expandedFaq === index && "rotate-180"
                  )} />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-8">
          <UnitsPocketCard
            title="EIC Quick Reference"
            units={pocketCardUnits}
            color="sky"
          />
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            color="sky"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 pt-4 pb-safe">
          <Button
            variant="ios-primary"
            size="lg"
            className="w-full touch-target bg-sky-500 hover:bg-sky-600"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8/section5')}
          >
            Continue to Section 5
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="ios-secondary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8')}
          >
            Back to Module 8
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule8Section4;
