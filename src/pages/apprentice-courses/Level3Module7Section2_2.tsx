/**
 * Level 3 Module 7 Section 2.2 - Codes of Practice and Industry Standards
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Codes of Practice and Industry Standards - Level 3 Module 7 Section 2.2";
const DESCRIPTION = "Understanding BS 7671, IET Guidance Notes, and industry codes of practice for professional electrical installation work in the UK.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the legal status of BS 7671 (the IET Wiring Regulations)?",
    options: [
      "It is an Act of Parliament that must be followed exactly",
      "It is a British Standard that provides a benchmark for compliance with regulations",
      "It is purely advisory with no legal significance",
      "It only applies to commercial installations"
    ],
    correctIndex: 1,
    explanation: "BS 7671 is a British Standard, not law itself. However, compliance with it is commonly accepted as meeting the requirements of the Electricity at Work Regulations and Building Regulations Part P. It is the benchmark for safe electrical installation."
  },
  {
    id: "check-2",
    question: "IET Guidance Notes are intended to:",
    options: [
      "Replace BS 7671 with simpler rules",
      "Provide detailed explanatory guidance on applying BS 7671 requirements",
      "Give legally binding instructions that override BS 7671",
      "Apply only to industrial installations"
    ],
    correctIndex: 1,
    explanation: "IET Guidance Notes provide detailed explanatory guidance to help electricians understand and apply BS 7671 requirements correctly. They expand on the regulations but do not replace or override them."
  },
  {
    id: "check-3",
    question: "A 'Competent Person Scheme' allows members to:",
    options: [
      "Self-certify notifiable electrical work without involving Building Control",
      "Skip the requirements of BS 7671",
      "Work on high voltage systems without additional training",
      "Issue their own qualifications"
    ],
    correctIndex: 0,
    explanation: "Competent Person Schemes allow registered members to self-certify that their work complies with Building Regulations, avoiding the need to notify Building Control separately. The work must still comply with all applicable standards."
  },
  {
    id: "check-4",
    question: "What is the purpose of an Approved Code of Practice (ACoP)?",
    options: [
      "To provide optional guidance with no legal weight",
      "To give practical guidance on meeting legal requirements, with special legal status",
      "To replace Acts of Parliament",
      "To set prices for electrical work"
    ],
    correctIndex: 1,
    explanation: "ACoPs provide practical guidance on meeting legal requirements and have special legal status. If you follow an ACoP, you are presumed to have met the legal requirement it addresses. If you don't follow it, you must prove your alternative approach is equally safe."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which organisation publishes BS 7671?",
    options: [
      "Health and Safety Executive",
      "British Standards Institution (published jointly by IET and BSI)",
      "City & Guilds",
      "NICEIC"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 is published jointly by the Institution of Engineering and Technology (IET) and the British Standards Institution (BSI). It is known as the IET Wiring Regulations."
  },
  {
    id: 2,
    question: "How often is BS 7671 typically updated?",
    options: [
      "Every year",
      "Every 3-4 years approximately",
      "Every 10 years",
      "Only when there's an incident"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 is typically updated every 3-4 years (with amendments in between) to incorporate new technologies, address emerging safety concerns, and align with international harmonisation documents."
  },
  {
    id: 3,
    question: "The IET Guidance Note 3 covers which topic?",
    options: [
      "Selection and erection of equipment",
      "Protection against overcurrent",
      "Inspection and testing",
      "Special installations or locations"
    ],
    correctAnswer: 2,
    explanation: "IET Guidance Note 3 covers Inspection and Testing. The full set of Guidance Notes covers: GN1 Selection & Erection, GN2 Isolation & Switching, GN3 Inspection & Testing, GN4 Protection Against Fire, GN5 Protection Against Electric Shock, GN6 Protection Against Overcurrent, GN7 Special Locations, GN8 Earthing & Bonding."
  },
  {
    id: 4,
    question: "Which of these is an example of a Competent Person Scheme operator?",
    options: [
      "City & Guilds",
      "NICEIC, NAPIT, or ELECSA",
      "Health and Safety Executive",
      "British Standards Institution"
    ],
    correctAnswer: 1,
    explanation: "NICEIC, NAPIT, ELECSA, and others operate Competent Person Schemes that allow registered electricians to self-certify their work. City & Guilds is an awarding body for qualifications, not a Competent Person Scheme operator."
  },
  {
    id: 5,
    question: "Building Regulations Approved Document P applies to:",
    options: [
      "All electrical work in the UK",
      "Electrical work in dwellings in England",
      "Only commercial buildings",
      "Only new-build properties"
    ],
    correctAnswer: 1,
    explanation: "Approved Document P applies to electrical work in dwellings in England. Scotland, Wales, and Northern Ireland have their own building regulations. It covers all dwellings including houses, flats, and parts of mixed-use buildings."
  },
  {
    id: 6,
    question: "What happens if you don't follow an Approved Code of Practice (ACoP)?",
    options: [
      "Automatic prosecution",
      "No consequences at all",
      "You must demonstrate your alternative approach provides equivalent safety",
      "Your ECS card is revoked"
    ],
    correctAnswer: 2,
    explanation: "If you don't follow an ACoP, you're not automatically in breach of the law, but you must be able to demonstrate that your alternative approach achieves the same level of safety. Following the ACoP provides a presumption of compliance."
  },
  {
    id: 7,
    question: "The term 'Deemed to Satisfy' in Building Regulations means:",
    options: [
      "The work is acceptable even if it doesn't meet standards",
      "Following the specified standard will satisfy the functional requirement",
      "Satisfaction is determined by the customer",
      "Only deemed satisfactory after 12 months"
    ],
    correctAnswer: 1,
    explanation: "When a standard is 'Deemed to Satisfy' the Building Regulations, following that standard is accepted as meeting the functional requirements of the regulations. For electrical work, compliance with BS 7671 is deemed to satisfy the requirements of Part P."
  },
  {
    id: 8,
    question: "IET Guidance Note 8 specifically addresses:",
    options: [
      "Inspection procedures",
      "Overcurrent protection",
      "Earthing and bonding",
      "Cable selection calculations"
    ],
    correctAnswer: 2,
    explanation: "IET Guidance Note 8 covers Earthing and Bonding, providing detailed guidance on earthing systems, bonding arrangements, and electrode testing. This is essential knowledge for safe electrical installation."
  },
  {
    id: 9,
    question: "What is the purpose of BS 7909?",
    options: [
      "Permanent electrical installations",
      "Temporary electrical systems for events and similar",
      "Agricultural installations only",
      "Domestic rewiring"
    ],
    correctAnswer: 1,
    explanation: "BS 7909 is the Code of Practice for temporary electrical systems in entertainment and related industries. It covers events, concerts, festivals, and similar temporary installations that have specific safety requirements."
  },
  {
    id: 10,
    question: "The On-Site Guide published by the IET is designed to:",
    options: [
      "Replace BS 7671 for site use",
      "Provide quick reference to BS 7671 requirements for site use",
      "Give more stringent requirements than BS 7671",
      "Apply only to new installations"
    ],
    correctAnswer: 1,
    explanation: "The On-Site Guide is a companion publication to BS 7671 that provides quick reference information for use on site. It does not replace BS 7671 but makes key information more accessible for everyday use."
  },
  {
    id: 11,
    question: "ESQCR stands for:",
    options: [
      "Electrical Safety Quality Control Regulations",
      "Electricity Safety, Quality and Continuity Regulations",
      "Electrician Standards and Qualification Control Requirements",
      "Electrical Supply and Quality Control Rules"
    ],
    correctAnswer: 1,
    explanation: "ESQCR stands for the Electricity Safety, Quality and Continuity Regulations 2002. These regulations govern the distribution network operators and set requirements for the supply of electricity, including earthing arrangements."
  },
  {
    id: 12,
    question: "When a new edition of BS 7671 is published, existing installations must:",
    options: [
      "Be immediately upgraded to meet the new requirements",
      "Continue to be safe but don't retrospectively need to meet new requirements",
      "Be reported to Building Control for review",
      "Have new EICs issued"
    ],
    correctAnswer: 1,
    explanation: "New editions of BS 7671 are not retrospective. Existing installations that were compliant when installed remain acceptable. However, any new work or alterations should comply with the current edition, and dangerous conditions should always be addressed."
  }
];

const faqs = [
  {
    question: "Do I need to buy a new copy of BS 7671 every time it's updated?",
    answer: "While having the current edition is highly recommended for professional practice, amendments are published between editions and these can be purchased separately. However, if your work involves self-certification through a Competent Person Scheme, you'll typically be required to work to the current edition and amendments."
  },
  {
    question: "What's the difference between a British Standard (BS) and a Code of Practice (CP)?",
    answer: "British Standards (like BS 7671) set technical specifications and requirements. Codes of Practice (like BS 7909) provide recommendations for good practice in specific areas. Both are developed through consensus processes, but standards are often more prescriptive while codes of practice offer more flexibility in approach."
  },
  {
    question: "Are Guidance Notes mandatory reading for electricians?",
    answer: "While not strictly mandatory, Guidance Notes are invaluable for understanding how to apply BS 7671 correctly. Competent Person Scheme operators often expect members to be familiar with relevant Guidance Notes, and they can be crucial evidence in demonstrating competence if work is questioned."
  },
  {
    question: "Can I use older standards if the equipment was manufactured to them?",
    answer: "Equipment manufactured to earlier standards can often still be used if it remains safe and suitable. However, the installation method must comply with current standards. You cannot use an old installation method just because old equipment is being installed."
  },
  {
    question: "What happens if BS 7671 and manufacturer's instructions conflict?",
    answer: "Manufacturer's instructions must always be followed (required by BS 7671 itself). If there appears to be a conflict, usually the manufacturer's instructions will be more specific to their product. If you believe there's a genuine safety conflict, consult with the manufacturer and document your decision-making."
  },
  {
    question: "How do I keep up with changes to standards and regulations?",
    answer: "Subscribe to updates from the IET, join a professional body, attend CPD courses, and maintain links with your Competent Person Scheme who will notify members of changes. Industry publications and electrical trade websites also cover regulatory changes."
  }
];

const Level3Module7Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Codes of Practice and Industry Standards
          </h1>
          <p className="text-white/80">
            Understanding BS 7671, Guidance Notes, and the regulatory framework
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 7671:</strong> The benchmark standard for electrical installation</li>
              <li><strong>Guidance Notes:</strong> Detailed help applying BS 7671</li>
              <li><strong>ACoPs:</strong> Legal weight for meeting regulations</li>
              <li><strong>Competent Person Schemes:</strong> Enable self-certification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Professional Essentials</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Current edition:</strong> Always work to the current BS 7671</li>
              <li><strong>On-Site Guide:</strong> Essential quick reference</li>
              <li><strong>Scheme membership:</strong> Professional recognition</li>
              <li><strong>Updates:</strong> Stay current with amendments</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the status and structure of BS 7671",
              "Know the role of IET Guidance Notes and supporting publications",
              "Recognise the legal framework including Building Regulations",
              "Understand Competent Person Schemes and their purpose",
              "Know the difference between standards, codes, and regulations",
              "Keep up to date with industry requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: BS 7671 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 7671 - The IET Wiring Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 is the national standard for electrical installations in the UK. Known as the IET Wiring Regulations, it sets out the requirements for the design, erection, and verification of electrical installations. While not law itself, compliance with BS 7671 is the recognised way of meeting legal requirements under the Electricity at Work Regulations and Building Regulations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 Structure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Part 1 - Scope, object, and fundamental principles</li>
                <li>Part 2 - Definitions</li>
                <li>Part 3 - Assessment of general characteristics</li>
                <li>Part 4 - Protection for safety</li>
                <li>Part 5 - Selection and erection of equipment</li>
                <li>Part 6 - Inspection and testing</li>
                <li>Part 7 - Special installations or locations</li>
                <li>Appendices - Including forms, cable tables, and test data</li>
              </ul>
            </div>

            <p>
              The standard is regularly updated to reflect new technologies, harmonisation with European standards, and lessons learned from incidents. When a new edition is published, there's typically a transition period where either the old or new edition can be used. After this period, all new work should comply with the current edition.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> BS 7671 is not retrospective - existing installations don't need to be upgraded just because a new edition is published. However, any alterations or additions must comply with the current edition.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: IET Guidance Notes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            IET Guidance Notes and Publications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IET publishes a series of Guidance Notes that expand on BS 7671 requirements, providing detailed explanations and practical examples. These publications help electricians understand not just what the regulations require, but why, and how to apply them in various situations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Guidance Notes Series</p>
                <ul className="text-sm text-white space-y-1">
                  <li>GN1 - Selection and Erection</li>
                  <li>GN2 - Isolation and Switching</li>
                  <li>GN3 - Inspection and Testing</li>
                  <li>GN4 - Protection Against Fire</li>
                  <li>GN5 - Protection Against Electric Shock</li>
                  <li>GN6 - Protection Against Overcurrent</li>
                  <li>GN7 - Special Locations</li>
                  <li>GN8 - Earthing and Bonding</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other Key Publications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>On-Site Guide - Quick reference for site use</li>
                  <li>Electrician's Guide to the Building Regulations</li>
                  <li>Commentary on IET Wiring Regulations</li>
                  <li>Electrical Installation Design Guide</li>
                  <li>Code of Practice for EV Charging</li>
                </ul>
              </div>
            </div>

            <p>
              Guidance Note 3 (Inspection and Testing) is particularly important for all electricians, as it covers the testing methods and procedures you'll use throughout your career. The On-Site Guide is designed to be carried on site for quick reference without needing the full BS 7671 document.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career tip:</strong> Invest in key Guidance Notes relevant to your work. They demonstrate professional commitment and provide invaluable reference material. Many employers expect their electricians to have access to at least the On-Site Guide and GN3.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Building Regulations and Part P */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Building Regulations and Competent Person Schemes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In England, Building Regulations Approved Document P covers electrical safety in dwellings. It requires certain types of electrical work to be either carried out by a person registered with a Competent Person Scheme or notified to Building Control. This ensures work is checked for compliance with safety standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Notifiable work (in special locations) includes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Work in bathrooms and shower rooms</li>
                <li>Work in kitchens within 3m of a sink</li>
                <li>Outdoor installations</li>
                <li>Installation of new circuits</li>
                <li>Consumer unit replacements</li>
                <li>Work in swimming pools and saunas</li>
              </ul>
            </div>

            <p>
              Competent Person Schemes (like NICEIC, NAPIT, ELECSA) allow registered members to self-certify their work. Instead of notifying Building Control, the scheme operator notifies the local authority and the homeowner receives certification. This is more efficient but requires maintaining scheme membership and meeting ongoing competence requirements.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Even for non-notifiable work, all electrical work must comply with BS 7671 and be safe. The notification requirements are about Building Control oversight, not about whether standards apply.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Approved Codes of Practice */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Approved Codes of Practice and Legal Status
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Approved Codes of Practice (ACoPs) have a special legal status. They are approved by the Health and Safety Executive (or similar body) and provide practical guidance on meeting legal requirements. If you follow an ACoP, you are presumed to have met the legal requirement it relates to.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Acts of Parliament</p>
                <p className="text-white/90 text-xs">Primary legislation - the law itself</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Regulations</p>
                <p className="text-white/90 text-xs">Secondary legislation - detailed legal requirements</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">ACoPs & Standards</p>
                <p className="text-white/90 text-xs">Practical guidance - presumed compliance</p>
              </div>
            </div>

            <p>
              The key point is that ACoPs are not the only way to comply with the law - you can take a different approach if you can demonstrate it provides equivalent safety. However, following an ACoP gives you automatic presumption of compliance, making it the simplest and safest approach.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> The Memorandum of Guidance on the Electricity at Work Regulations (HSR25) explains how to comply with the EWR 1989. Following its guidance means you can demonstrate you met the legal requirements. Deviating requires you to prove your alternative is equally safe.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Publications for Every Electrician</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>BS 7671 (current edition) - The fundamental standard</li>
                <li>On-Site Guide - Practical quick reference for daily use</li>
                <li>Guidance Note 3 - Testing procedures and requirements</li>
                <li>Electrician's Guide to Building Regulations - Part P compliance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Staying Current</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Subscribe to IET updates for notification of amendments</li>
                <li>Attend CPD courses when new editions are published</li>
                <li>Read industry magazines and websites for practical guidance</li>
                <li>Engage with your Competent Person Scheme's technical updates</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using outdated standards:</strong> Always check you have the current edition</li>
                <li><strong>Ignoring manufacturer's instructions:</strong> These take precedence over general guidance</li>
                <li><strong>Treating guidance as optional:</strong> While not law, guidance demonstrates good practice</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Document Hierarchy</p>
                <ul className="space-y-0.5">
                  <li>Acts of Parliament (Primary law)</li>
                  <li>Regulations (Secondary legislation)</li>
                  <li>Approved Codes of Practice</li>
                  <li>British Standards (e.g., BS 7671)</li>
                  <li>Guidance Notes and publications</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Competent Person Schemes</p>
                <ul className="space-y-0.5">
                  <li>NICEIC</li>
                  <li>NAPIT</li>
                  <li>ELECSA</li>
                  <li>Stroma</li>
                  <li>OFTEC (for oil/electrical)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Duty of Care
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section2-3">
              Next: Documentation and Records
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section2_2;
