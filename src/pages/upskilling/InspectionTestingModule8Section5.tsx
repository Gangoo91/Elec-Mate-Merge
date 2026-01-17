import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, FileText, ClipboardList, Search, AlertCircle, Scale, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule8Section5 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Minor Works & EICR | Module 8 Section 5 | Inspection & Testing",
    description: "Learn when to use Minor Works Certificates and Electrical Installation Condition Reports (EICRs), including observation codes and classification systems."
  });

  const learningOutcomes = [
    { icon: FileText, text: "Understand when Minor Works Certificates apply" },
    { icon: ClipboardList, text: "Complete EICRs correctly with appropriate codes" },
    { icon: Search, text: "Apply C1, C2, C3, and FI classification codes" },
    { icon: AlertCircle, text: "Determine overall installation condition" },
    { icon: Scale, text: "Choose the correct certificate for each situation" },
    { icon: Award, text: "Issue professional, compliant documentation" }
  ];

  const quizQuestions = [
    {
      question: "When should a Minor Works Certificate be used instead of an EIC?",
      options: [
        "For all small jobs",
        "For work that does not include adding a new circuit",
        "Only for repairs",
        "Only for non-notifiable work"
      ],
      correctAnswer: 1,
      explanation: "A Minor Works Certificate is used for alterations or additions that do not extend to the provision of a new circuit. Examples include adding a socket to an existing circuit or replacing a consumer unit."
    },
    {
      question: "What does an EICR assess?",
      options: [
        "New installation compliance only",
        "The condition of an existing electrical installation",
        "Individual circuit installation",
        "Equipment warranty status"
      ],
      correctAnswer: 1,
      explanation: "An Electrical Installation Condition Report (EICR) assesses the condition of an existing installation, identifying defects and providing an overall assessment of safety."
    },
    {
      question: "What does classification code C1 indicate on an EICR?",
      options: [
        "Satisfactory condition",
        "Improvement recommended",
        "Danger present - immediate remedial action required",
        "Further investigation required"
      ],
      correctAnswer: 2,
      explanation: "C1 indicates danger is present and risk of injury exists. Immediate remedial action is required. The person responsible should be informed and the danger made safe immediately."
    },
    {
      question: "What does classification code C2 indicate?",
      options: [
        "Danger present",
        "Potentially dangerous - urgent remedial action required",
        "Minor cosmetic issue",
        "Item not tested"
      ],
      correctAnswer: 1,
      explanation: "C2 indicates a potentially dangerous condition that requires urgent remedial action. While not immediately dangerous like C1, it could become dangerous and needs prompt attention."
    },
    {
      question: "What does classification code C3 indicate?",
      options: [
        "Dangerous condition",
        "Potentially dangerous",
        "Improvement recommended but not dangerous",
        "Item not inspected"
      ],
      correctAnswer: 2,
      explanation: "C3 indicates improvement is recommended. The issue doesn't create immediate danger but improvement would enhance safety. The client should consider this remedial work."
    },
    {
      question: "What does 'FI' (Further Investigation) indicate on an EICR?",
      options: [
        "A fault has been found and repaired",
        "A potential issue requiring more detailed investigation",
        "Full inspection was completed",
        "Testing was not done"
      ],
      correctAnswer: 1,
      explanation: "FI indicates further investigation is needed to determine the nature and extent of a potential defect. The inspector couldn't fully assess the condition without additional work."
    },
    {
      question: "If an EICR has one C2 and several C3 observations, what is the overall assessment?",
      options: [
        "Satisfactory",
        "Unsatisfactory",
        "Depends on the age of installation",
        "Further assessment needed"
      ],
      correctAnswer: 1,
      explanation: "Any C1 or C2 observation results in an 'Unsatisfactory' overall assessment. The installation does not meet the required standard and remedial work is needed."
    },
    {
      question: "Can a Minor Works Certificate have multiple entries?",
      options: [
        "No - one certificate per item of work",
        "Yes - for up to 5 separate items",
        "Yes - if all work is on the same circuit",
        "Only if requested by the client"
      ],
      correctAnswer: 2,
      explanation: "A single Minor Works Certificate can cover multiple items of work if they are all on the same circuit. Separate circuits or larger scope work requires an EIC."
    },
    {
      question: "Who is responsible for remedying defects identified on an EICR?",
      options: [
        "The inspector who carried out the report",
        "The person responsible for the installation (duty holder/owner)",
        "The original installer",
        "The DNO"
      ],
      correctAnswer: 1,
      explanation: "The duty holder (usually the property owner or landlord) is responsible for arranging remedial work. The inspector reports findings but isn't responsible for remediation unless commissioned to do so."
    },
    {
      question: "A Minor Works Certificate requires how many signatures?",
      options: [
        "One - the installer only",
        "Two - installer and supervisor",
        "One - the installer, who takes responsibility for design and construction",
        "Three - like an EIC"
      ],
      correctAnswer: 2,
      explanation: "A Minor Works Certificate has a single signature from the person carrying out the work, who takes responsibility for design, construction, and inspection/testing of the minor work."
    }
  ];

  const faqData = [
    {
      question: "What's the difference between an EIC and EICR?",
      answer: "An EIC (Electrical Installation Certificate) is for new work - new installations or additions. An EICR (Electrical Installation Condition Report) assesses existing installations to determine their condition and safety. They serve different purposes."
    },
    {
      question: "Is replacing a consumer unit Minor Works or EIC?",
      answer: "Typically a Minor Works Certificate, as you're not adding new circuits. However, if circuit protection is upgraded (adding RCBOs/RCDs) or any new circuits are added, an EIC may be more appropriate. Some schemes specify EIC for consumer unit changes."
    },
    {
      question: "Can I convert C2 observations to C3 if the client accepts the risk?",
      answer: "No. Classification codes are based on technical assessment, not client preference. C2 means potentially dangerous and urgent remedial action is required. The overall assessment remains Unsatisfactory regardless of client acceptance."
    },
    {
      question: "What if I can't complete all tests during an EICR?",
      options: [
        "Record limitations clearly. Items not inspected should be listed. Use 'LIM' for limitations and 'FI' where further investigation is needed. The extent of inspection achieved should be clear."
      ]
    },
    {
      question: "How often is an EICR required for rental properties?",
      answer: "In England, landlords must have an EICR every 5 years (or as recommended on previous report if sooner). Scotland has similar requirements. The report must be provided to tenants and the local authority if requested."
    },
    {
      question: "What happens if observations are found during Minor Works?",
      answer: "Record any observations on the Minor Works Certificate. If you discover dangerous conditions in the existing installation (not related to your work), advise the client in writing and recommend a full EICR."
    }
  ];

  const pocketCardUnits = [
    { name: "C1", symbol: "Danger", unit: "immediate action" },
    { name: "C2", symbol: "Potential", unit: "urgent action" },
    { name: "C3", symbol: "Improve", unit: "recommended" },
    { name: "FI", symbol: "Further", unit: "investigation" },
    { name: "Minor Works", symbol: "No new", unit: "circuits" },
    { name: "EICR Rental", symbol: "5", unit: "years max" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-8')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 8</span>
          </button>
          <span className="text-white/60 text-sm">5 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-elec-yellow/20 rounded-full mb-4">
            <span className="text-elec-yellow text-sm font-medium">Module 8 • Visual Inspection & Documentation</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Minor Works & EICR
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Select the correct certification for each job and apply observation codes correctly to provide clear, professional documentation.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <Card variant="ios-elevated" className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-elec-yellow" />
              <h2 className="text-white font-semibold text-lg">In 30 Seconds</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 shrink-0" />
                <span className="text-white/80 text-base">Minor Works: no new circuits added</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 shrink-0" />
                <span className="text-white/80 text-base">EICR: condition report for existing installations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 shrink-0" />
                <span className="text-white/80 text-base">C1/C2 = Unsatisfactory, C3 = Improvement only</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="grid gap-3">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} variant="ios" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
                    <outcome.icon className="w-5 h-5 text-elec-yellow" />
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
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Minor Works Certificate</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                A Minor Works Certificate is used for additions or alterations to an existing installation that do not include adding a new circuit:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-elec-yellow/20">
                <h4 className="text-elec-yellow font-semibold mb-2">Examples of Minor Works</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Adding a socket outlet to an existing circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Replacing a consumer unit (same circuits)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Adding a light point to an existing lighting circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Replacing an accessory like-for-like</span>
                  </li>
                </ul>
              </div>
              <p>
                The certificate has a single signature - the installer takes responsibility for design, construction, and inspection/testing of the minor work.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">EICR Purpose and Application</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                An Electrical Installation Condition Report assesses the safety and condition of an existing electrical installation:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-elec-yellow/20">
                <h4 className="text-elec-yellow font-semibold mb-2">When EICR is Required</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Periodic inspection (5 years domestic, varies by use)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Change of property use or occupancy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Before major alterations or additions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Rental properties (legal requirement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Property sale (buyer/seller request)</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A landlord asks for an EICR 3 years after the last one. The previous report was satisfactory. Is a new one required?"
            answer="It depends on the recommended interval stated on the previous report. If it recommended 5 years and no material changes have occurred, it's not legally required yet. However, the landlord may want one for due diligence or insurance purposes."
            color="sky"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Classification Codes</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                EICR observations are classified using standard codes that indicate severity:
              </p>
              <div className="space-y-3">
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-lg shrink-0">C1</span>
                    <div>
                      <h4 className="text-red-400 font-semibold">Danger Present</h4>
                      <p className="text-white/70 text-sm">Risk of injury. Immediate remedial action required. Person responsible must be informed immediately.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg shrink-0">C2</span>
                    <div>
                      <h4 className="text-amber-400 font-semibold">Potentially Dangerous</h4>
                      <p className="text-white/70 text-sm">Urgent remedial action required. May become dangerous under fault conditions or in future.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg shrink-0">C3</span>
                    <div>
                      <h4 className="text-blue-400 font-semibold">Improvement Recommended</h4>
                      <p className="text-white/70 text-sm">Not dangerous but improvement would enhance safety. Client should consider the recommendation.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-lg shrink-0">FI</span>
                    <div>
                      <h4 className="text-purple-400 font-semibold">Further Investigation</h4>
                      <p className="text-white/70 text-sm">Cannot fully assess without further investigation. May require intrusive inspection or specialist assessment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Overall Assessment</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                The EICR requires an overall assessment of whether the installation is satisfactory:
              </p>
              <div className="space-y-3">
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-2">SATISFACTORY</h4>
                  <p className="text-white/70 text-sm">No C1 or C2 observations. Installation meets the required standard. May have C3 recommendations but these don't affect the overall assessment.</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-2">UNSATISFACTORY</h4>
                  <p className="text-white/70 text-sm">Any C1 or C2 observations. Installation does not meet the required standard. Remedial work is required to make it satisfactory.</p>
                </div>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    <strong className="text-amber-400">Note:</strong> FI (Further Investigation) items should be listed but don't directly affect the overall assessment until investigated and classified.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="An EICR has three C3 items but no C1 or C2 observations. What is the overall assessment?"
            answer="SATISFACTORY. C3 items are recommendations for improvement but don't indicate danger. The installation meets the required standard. The recommendations should still be communicated to the duty holder."
            color="sky"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Choosing the Right Certificate</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Selecting the correct certification document is essential:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-elec-yellow/20">
                <h4 className="text-elec-yellow font-semibold mb-3">Certificate Selection Guide</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">New installation</span>
                    <span className="text-elec-yellow font-semibold">EIC</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">New circuit added</span>
                    <span className="text-elec-yellow font-semibold">EIC</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Socket added (existing circuit)</span>
                    <span className="text-elec-yellow font-semibold">Minor Works</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Consumer unit replacement</span>
                    <span className="text-elec-yellow font-semibold">Minor Works*</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Periodic inspection</span>
                    <span className="text-elec-yellow font-semibold">EICR</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">Pre-purchase check</span>
                    <span className="text-elec-yellow font-semibold">EICR</span>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-3">*Some schemes require EIC for consumer unit changes</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-xl font-semibold text-white">Professional Standards</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Certification documentation reflects professional standards and carries legal significance:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-elec-yellow/20">
                <h4 className="text-elec-yellow font-semibold mb-3">Professional Obligations</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Certificates are legal documents - accuracy is essential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Never issue false or misleading certificates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Keep copies for required retention periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Use only model forms or approved equivalents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-elec-yellow shrink-0" />
                    <span>Complete all sections - don't leave blanks</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A client asks you to change a C2 to C3 because they don't want to do the work right now. Should you?"
            answer="No. Classification codes are based on technical assessment of danger, not client preference. The code reflects the actual condition. Falsifying certificates is professional misconduct and potentially illegal."
            color="sky"
          />
        </div>

        {/* Practical Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            Practical Tips
          </h2>
          <div className="space-y-3">
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Be Clear and Specific</h4>
                  <p className="text-white/60 text-sm">Observations should clearly describe the defect and location</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Explain to Clients</h4>
                  <p className="text-white/60 text-sm">Help clients understand what codes mean and what action is needed</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Document Limitations</h4>
                  <p className="text-white/60 text-sm">Clearly state what couldn't be inspected and why</p>
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
                    <p className="text-white/70 text-sm leading-relaxed">{typeof faq.answer === 'string' ? faq.answer : faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-8">
          <UnitsPocketCard
            title="EICR Codes Reference"
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

        {/* Course Completion Card */}
        <Card variant="ios-elevated" className="mb-8 border-elec-yellow/30">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">🎉 Course Complete!</h3>
            <p className="text-white/60 mb-4">
              Congratulations! You've completed all 8 modules of the Inspection & Testing course covering BS 7671 requirements.
            </p>
            <div className="space-y-2 text-left text-sm text-white/70 bg-white/5 rounded-xl p-4 mb-4">
              <p>✓ Module 1: Introduction to I&T</p>
              <p>✓ Module 2: Safe Isolation</p>
              <p>✓ Module 3: Continuity Testing</p>
              <p>✓ Module 4: Insulation Resistance</p>
              <p>✓ Module 5: Earth Fault Loop Impedance</p>
              <p>✓ Module 6: RCD Testing</p>
              <p>✓ Module 7: Polarity & Functional Testing</p>
              <p>✓ Module 8: Visual Inspection & Documentation</p>
            </div>
            <p className="text-elec-yellow text-sm">
              Return to the course page to review any modules or explore other courses.
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 pt-4 pb-safe">
          <Button
            variant="ios-primary"
            size="lg"
            className="w-full touch-target bg-sky-500 hover:bg-sky-600"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing')}
          >
            Return to Course Overview
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="ios-secondary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-8')}
          >
            Back to Module 8
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule8Section5;
