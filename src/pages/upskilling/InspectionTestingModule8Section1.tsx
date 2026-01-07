import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, Eye, Search, Clipboard, Camera, ShieldAlert, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule8Section1 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Initial Visual Inspection | Module 8 Section 1 | Inspection & Testing",
    description: "Master visual inspection techniques to identify defects, damage, and non-compliance before performing electrical tests."
  });

  const learningOutcomes = [
    { icon: Eye, text: "Understand the purpose and importance of visual inspection" },
    { icon: Search, text: "Identify what to look for during inspection" },
    { icon: Clipboard, text: "Follow a systematic inspection approach" },
    { icon: Camera, text: "Recognise common defects and hazards" },
    { icon: ShieldAlert, text: "Apply appropriate observation codes" },
    { icon: CheckCircle2, text: "Document visual inspection findings" }
  ];

  const quizQuestions = [
    {
      question: "When should visual inspection be performed during initial verification?",
      options: [
        "After all electrical tests are complete",
        "Before energising and before testing",
        "Only if defects are suspected",
        "Only during periodic inspection"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection must be performed before energising the installation and before electrical testing. This identifies obvious hazards and defects that could make testing dangerous."
    },
    {
      question: "What percentage of defects can visual inspection typically identify?",
      options: [
        "About 10-20%",
        "About 30-40%",
        "About 60-70%",
        "About 90-100%"
      ],
      correctAnswer: 2,
      explanation: "Industry estimates suggest 60-70% of defects can be identified through careful visual inspection alone. This highlights the importance of thorough visual examination before testing."
    },
    {
      question: "During visual inspection, which of the following should be checked?",
      options: [
        "Earth fault loop impedance values",
        "Correct connection of conductors and condition of insulation",
        "RCD trip times",
        "Prospective fault current"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection checks physical conditions: conductor connections, insulation condition, cable routing, equipment damage, labelling, and compliance with requirements. Electrical values are checked during testing."
    },
    {
      question: "An exposed conductor is found during visual inspection. What action is required?",
      options: [
        "Continue testing and note it later",
        "Do not energise - rectify before proceeding",
        "It's acceptable if the conductor is small",
        "Apply insulation tape and continue"
      ],
      correctAnswer: 1,
      explanation: "Exposed live conductors present immediate danger. The installation must not be energised until the defect is rectified. This is a fundamental safety requirement."
    },
    {
      question: "Which regulation requires visual inspection to be carried out?",
      options: [
        "Regulation 411.1",
        "Regulation 612.1 (Chapter 61 Section 611)",
        "Regulation 721.1",
        "Regulation 434.1"
      ],
      correctAnswer: 1,
      explanation: "Chapter 61 requires inspection and testing. Section 611 specifically covers visual inspection requirements, listing items that must be verified before testing."
    },
    {
      question: "What should be verified regarding cable selection during visual inspection?",
      options: [
        "The cable manufacturer",
        "Cables are suitable for their environmental conditions and current-carrying capacity",
        "The cable colour only",
        "Cable price"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection verifies cables are suitable for their installed conditions (temperature, moisture, mechanical protection) and appropriately sized for their protective device ratings."
    },
    {
      question: "Thermal damage to an accessory faceplate indicates:",
      options: [
        "Normal wear from long use",
        "Possible loose connection causing overheating",
        "The wrong type of plastic",
        "Exposure to sunlight"
      ],
      correctAnswer: 1,
      explanation: "Thermal damage (discolouration, melting, burning) around terminals indicates overheating, usually from loose connections causing high-resistance joints. This is a serious defect requiring investigation."
    },
    {
      question: "During visual inspection of a consumer unit, what IP rating aspects should be checked?",
      options: [
        "Only that it looks weatherproof",
        "All entries are sealed, blanks fitted, no damage compromising the enclosure",
        "Just that the door closes",
        "IP rating is only checked outdoors"
      ],
      correctAnswer: 1,
      explanation: "IP rating protection is verified by checking: all cable entries properly sealed, unused entries blanked, covers intact, no holes or damage that would allow ingress of moisture or foreign objects."
    },
    {
      question: "What does 'adequate access and working space' mean for inspection purposes?",
      options: [
        "The inspector can reach the installation",
        "Sufficient space for safe operation and maintenance as required by regulations",
        "Any amount of space is acceptable",
        "Only applies to industrial installations"
      ],
      correctAnswer: 1,
      explanation: "Regulation 132.12 requires adequate space for safe operation, inspection, testing, and maintenance. This includes space to operate switchgear safely and perform future work."
    },
    {
      question: "If an accessory is damaged but still functional, what should be recorded?",
      options: [
        "Nothing - it works fine",
        "The defect and appropriate observation code (C2 or C3)",
        "Just a verbal warning to the client",
        "Only record if it completely fails"
      ],
      correctAnswer: 1,
      explanation: "All defects should be recorded with appropriate codes. A damaged but functional accessory is typically C2 (potentially dangerous) or C3 (improvement recommended) depending on the nature of damage."
    }
  ];

  const faqData = [
    {
      question: "Why is visual inspection performed before testing?",
      answer: "Visual inspection identifies obvious hazards (exposed conductors, damage, incorrect wiring) that could make energising or testing dangerous. It also identifies issues that wouldn't be detected by electrical tests alone, such as incorrect cable types or inadequate mechanical protection."
    },
    {
      question: "What access do I need for visual inspection?",
      answer: "Visual inspection requires access to all parts of the installation where practically possible. This includes consumer units, distribution boards, junction boxes, accessories, and anywhere that can be accessed without damage. Limitations should be recorded."
    },
    {
      question: "Can I skip visual inspection if the installation looks fine?",
      answer: "No. Visual inspection is a mandatory part of initial verification and periodic inspection. Many serious defects are not obvious at first glance. A systematic approach ensures all aspects are checked regardless of initial appearance."
    },
    {
      question: "What if I can't access certain parts of the installation?",
      answer: "Record any limitations in the inspection schedule and on the certificate. For EICR, areas that cannot be inspected should be noted and may affect the overall assessment. The client should be informed of any limitations."
    },
    {
      question: "Should I remove every accessory faceplate during inspection?",
      answer: "During initial verification, yes - all connections should be verified. During periodic inspection, a representative sample may be acceptable, with any limitations recorded. However, any accessories showing signs of damage should always be opened."
    },
    {
      question: "How do I record visual inspection results?",
      answer: "Results are recorded on the Schedule of Inspections. Each item is marked as satisfactory (✓), not applicable (N/A), or with a limitation (LIM). Defects are detailed in the observations section with appropriate C1, C2, C3, or FI codes."
    }
  ];

  const pocketCardUnits = [
    { name: "When", symbol: "First", unit: "before tests" },
    { name: "Defects Found", symbol: "60-70%", unit: "by visual" },
    { name: "BS 7671 Ref", symbol: "Ch.61", unit: "Section 611" },
    { name: "Danger Found", symbol: "Do not", unit: "energise" },
    { name: "Record On", symbol: "Schedule", unit: "of Inspection" },
    { name: "Access Needed", symbol: "All", unit: "practical areas" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8')}
            className="flex items-center gap-2 text-sky-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 8</span>
          </button>
          <span className="text-white/60 text-sm">1 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/20 rounded-full mb-4">
            <span className="text-sky-400 text-sm font-medium">Module 8 • Visual Inspection & Documentation</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Initial Visual Inspection
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Perform thorough visual examination to identify defects, damage, and non-compliance before electrical testing.
          </p>
        </section>

        {/* Interactive Guide Link */}
        <Link to="/study-centre/apprentice/study/guides/visual-inspection">
          <Card variant="ios-elevated" className="mb-6 border-sky-500/30 active:scale-[0.98] transition-transform touch-manipulation">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Visual Inspection Guide</h3>
                    <p className="text-white/60 text-sm">Interactive checklist and procedures</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-sky-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

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
                <span className="text-white/80 text-base">Visual inspection is performed FIRST, before any testing</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">60-70% of defects can be identified by careful visual examination</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Do NOT energise if dangerous conditions are found</span>
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
            <h2 className="text-xl font-semibold text-white">Purpose of Visual Inspection</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Visual inspection is the critical first step in verifying an electrical installation. Performed before energising and testing, it identifies hazards that could make testing dangerous and defects that electrical tests alone cannot detect.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-2">Why Visual Inspection First?</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Identifies dangers before energising</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Reveals defects tests won't find (wrong cable type, routing issues)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Catches approximately 60-70% of installation defects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Required by BS 7671 Chapter 61</span>
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
            <h2 className="text-xl font-semibold text-white">What to Inspect</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                BS 7671 Section 611 provides a comprehensive list of items to inspect. Key areas include:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Conductors and Connections</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Correct conductor identification (colours/marking)</li>
                    <li>• Connections properly made and secure</li>
                    <li>• No damage to conductor insulation</li>
                    <li>• Correct CSA for circuit requirements</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Protective Measures</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Basic protection (insulation, enclosures, barriers)</li>
                    <li>• Fault protection (earthing arrangements)</li>
                    <li>• Protective devices correctly selected and installed</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Equipment and Accessories</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• No visible damage or deterioration</li>
                    <li>• Suitable for environmental conditions</li>
                    <li>• Correctly installed and accessible</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="During visual inspection, you notice a cable passing through a metal enclosure without a grommet. Why is this a defect?"
            answer="The cable insulation could be damaged by the sharp metal edge over time (mechanical damage). This compromises basic protection and could lead to exposed live conductors or earth faults. A grommet or proper cable gland is required."
            color="sky"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Common Defects to Identify</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Common defects found during visual inspection include:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">C1 - Danger Present</span>
                    <p className="text-white/60 text-sm">Exposed live conductors, fire hazards, immediate shock risk</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">C2 - Potentially Dangerous</span>
                    <p className="text-white/60 text-sm">Damaged enclosures, missing earths, overloaded circuits</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">C3 - Improvement Recommended</span>
                    <p className="text-white/60 text-sm">Outdated equipment, lack of RCD protection where now required</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Systematic Approach</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                A systematic approach ensures nothing is missed. Work through the installation logically:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Inspection Sequence</h4>
                <ol className="space-y-3 text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-sm flex items-center justify-center shrink-0">1</span>
                    <span>Intake and main earthing arrangements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-sm flex items-center justify-center shrink-0">2</span>
                    <span>Consumer unit / distribution boards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-sm flex items-center justify-center shrink-0">3</span>
                    <span>Fixed wiring and cable routes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-sm flex items-center justify-center shrink-0">4</span>
                    <span>Accessories - sockets, switches, FCUs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-sm flex items-center justify-center shrink-0">5</span>
                    <span>Fixed equipment and luminaires</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-sm flex items-center justify-center shrink-0">6</span>
                    <span>Special locations (bathrooms, outdoor)</span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="Why should the intake position and main earthing be inspected first?"
            answer="The intake provides the supply and main earthing arrangements that all other circuits depend on. Any defects here affect the entire installation. Also, understanding the earthing system (TN-S, TN-C-S, TT) informs subsequent inspection and testing."
            color="sky"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Signs of Damage and Deterioration</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Look for visible signs that indicate damage, overheating, or deterioration:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Thermal Damage Signs</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Discolouration around terminals (brown/black)</li>
                    <li>• Melted or deformed plastic</li>
                    <li>• Smell of burning or burnt residue</li>
                    <li>• Damaged or brittle cable insulation</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Mechanical Damage Signs</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Cracked or broken enclosures</li>
                    <li>• Exposed or damaged cables</li>
                    <li>• Missing covers or blanking plates</li>
                    <li>• Impact damage to equipment</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Environmental Damage</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Corrosion on metalwork</li>
                    <li>• Water ingress or staining</li>
                    <li>• UV degradation of cables</li>
                    <li>• Pest damage</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Recording Inspection Results</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Visual inspection results are recorded on the Schedule of Inspections. Each item is marked:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Recording Codes</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 py-2 border-b border-white/10">
                    <span className="text-green-400 font-bold text-lg">✓</span>
                    <span className="text-white/70">Satisfactory - acceptable condition</span>
                  </div>
                  <div className="flex items-center gap-3 py-2 border-b border-white/10">
                    <span className="text-sky-400 font-bold text-lg">N/A</span>
                    <span className="text-white/70">Not applicable to this installation</span>
                  </div>
                  <div className="flex items-center gap-3 py-2 border-b border-white/10">
                    <span className="text-amber-400 font-bold text-lg">LIM</span>
                    <span className="text-white/70">Limitation - could not be inspected</span>
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <span className="text-red-400 font-bold text-lg">C1/C2/C3</span>
                    <span className="text-white/70">Defect found - see observations</span>
                  </div>
                </div>
              </div>
              <p>
                All defects must be described in detail in the observations section, with appropriate classification codes.
              </p>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="What code should be used when an area cannot be inspected due to access limitations?"
            answer="LIM (Limitation) should be recorded for that inspection item, with a note explaining why inspection was not possible. The limitation should also be recorded in the general section of the certificate."
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
                  <h4 className="text-white font-medium mb-1">Use Good Lighting</h4>
                  <p className="text-white/60 text-sm">A torch is essential - many defects hide in dark corners</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Photograph Defects</h4>
                  <p className="text-white/60 text-sm">Photos support your findings and help explain issues to clients</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Stop If Dangerous</h4>
                  <p className="text-white/60 text-sm">If you find C1 conditions, don't energise until rectified</p>
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
            title="Visual Inspection Reference"
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
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8/section2')}
          >
            Continue to Section 2
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

export default InspectionTestingModule8Section1;
