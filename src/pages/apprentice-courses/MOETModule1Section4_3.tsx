import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BS 7671 Wiring Regulations - MOET Module 1 Section 4.3";
const DESCRIPTION = "Comprehensive guide to BS 7671:2018+A3:2024 (IET Wiring Regulations) for electrical maintenance technicians: structure, 7 parts, fundamental principles, scope, amendments, and relationship to EAWR 1989.";

const quickCheckQuestions = [
  {
    id: "bs7671-status",
    question: "What is the legal status of BS 7671 (the IET Wiring Regulations)?",
    options: [
      "It is a statutory regulation with the full force of law",
      "It is a non-statutory British Standard — not law, but widely regarded as the benchmark for compliance with the EAWR",
      "It is an approved code of practice under the HSWA 1974",
      "It is a European directive transposed into UK law"
    ],
    correctIndex: 1,
    explanation: "BS 7671 is a British Standard published by the British Standards Institution (BSI) and the Institution of Engineering and Technology (IET). It is not law — it is non-statutory. However, it is widely accepted as the principal means of demonstrating compliance with the Electricity at Work Regulations 1989 for low voltage installations."
  },
  {
    id: "bs7671-parts",
    question: "How many main parts does BS 7671:2018+A3:2024 contain?",
    options: [
      "4 parts",
      "5 parts",
      "7 parts",
      "10 parts"
    ],
    correctIndex: 2,
    explanation: "BS 7671 is structured in 7 parts: Part 1 (Scope, object and fundamental principles), Part 2 (Definitions), Part 3 (Assessment of general characteristics), Part 4 (Protection for safety), Part 5 (Selection and erection of equipment), Part 6 (Inspection and testing), and Part 7 (Special installations or locations)."
  },
  {
    id: "bs7671-part6",
    question: "Part 6 of BS 7671 covers which aspect of electrical installations?",
    options: [
      "Selection and erection of equipment",
      "Protection for safety",
      "Inspection and testing",
      "Special installations or locations"
    ],
    correctIndex: 2,
    explanation: "Part 6 of BS 7671 covers inspection and testing. It sets out the requirements for initial verification of new installations and alterations, and for periodic inspection and testing of existing installations. For maintenance technicians, Part 6 is a key reference as it defines the tests you carry out and the criteria for compliance."
  },
  {
    id: "bs7671-amendment",
    question: "What does 'BS 7671:2018+A3:2024' mean in terms of the document's history?",
    options: [
      "It is the third version of BS 7671 published in 2024",
      "It is the 2018 edition with the third amendment (published 2024) incorporated",
      "It is valid from 2018 to 2024 only",
      "It is Amendment 3 to the 2024 edition"
    ],
    correctIndex: 1,
    explanation: "The notation 'BS 7671:2018+A3:2024' means the base document is the 2018 edition (the 18th Edition), with Amendment 3 (published in 2024) incorporated. Amendments update specific sections without replacing the entire standard. Previous amendments were A1:2020 (withdrawn) and A2:2022."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "BS 7671 is published jointly by:",
    options: [
      "The HSE and the UK Government",
      "The BSI and the IET (Institution of Engineering and Technology)",
      "The ECA and the JIB",
      "BEIS and Ofgem"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 is published jointly by the British Standards Institution (BSI) and the Institution of Engineering and Technology (IET). The IET also publishes the Guidance Notes (1–8) and the On-Site Guide, which provide practical interpretation of BS 7671 requirements."
  },
  {
    id: 2,
    question: "Part 1 of BS 7671 establishes the fundamental principles. Which of the following is a fundamental principle?",
    options: [
      "All installations must use copper conductors",
      "Protection against electric shock must be provided by at least one of the specified measures",
      "All circuits must be protected by RCDs",
      "Only qualified electricians may work on installations"
    ],
    correctAnswer: 1,
    explanation: "Chapter 13 of Part 1 establishes the fundamental principles of protection for safety. These include that persons and livestock shall be protected against dangers arising from contact with live parts (basic protection) and contact with exposed conductive parts made live by a fault (fault protection). The regulations specify approved measures for achieving this."
  },
  {
    id: 3,
    question: "Part 3 of BS 7671 requires assessment of:",
    options: [
      "The contractor's qualifications and insurance",
      "The general characteristics of the installation including purpose, supply, arrangement and maintainability",
      "The cost of the installation",
      "The environmental impact of the materials used"
    ],
    correctAnswer: 1,
    explanation: "Part 3 (Assessment of general characteristics) requires assessment of the purpose of the installation, the external influences (environment, temperature, humidity), the supply characteristics (earthing system, fault level, prospective fault current), the arrangement of circuits, and provisions for maintenance and safety services."
  },
  {
    id: 4,
    question: "Part 4 of BS 7671 covers protection for safety. Which of these protection measures is addressed?",
    options: [
      "Protection against vandalism",
      "Protection against theft of copper",
      "Protection against electric shock, thermal effects, overcurrent, voltage disturbances and electromagnetic influences",
      "Protection against market fluctuations in material costs"
    ],
    correctAnswer: 2,
    explanation: "Part 4 covers all aspects of protection for safety: Chapter 41 (electric shock), Chapter 42 (thermal effects), Chapter 43 (overcurrent), Chapter 44 (voltage disturbances and electromagnetic influences). These chapters define the technical requirements for protective measures that must be applied to every installation."
  },
  {
    id: 5,
    question: "Part 5 of BS 7671 covers the selection and erection of equipment. This includes requirements for:",
    options: [
      "Procurement and tendering procedures",
      "Common rules, wiring systems, switchgear, earthing, and other equipment",
      "Training syllabus for apprentices",
      "Insurance and indemnity for installers"
    ],
    correctAnswer: 1,
    explanation: "Part 5 covers the practical requirements for selecting and installing electrical equipment: Chapter 51 (common rules), Chapter 52 (wiring systems), Chapter 53 (switchgear and controlgear), Chapter 54 (earthing arrangements and protective conductors), Chapter 55 (other equipment), and Chapter 56 (supplies for safety services)."
  },
  {
    id: 6,
    question: "Under Part 6 of BS 7671, initial verification of a new installation must include:",
    options: [
      "Only a visual inspection",
      "Inspection, testing and certification — including an Electrical Installation Certificate",
      "Only insulation resistance testing",
      "A declaration by the installer that the work is complete"
    ],
    correctAnswer: 1,
    explanation: "Part 6 requires initial verification to include detailed visual inspection, a prescribed sequence of electrical tests (continuity, insulation resistance, polarity, earth fault loop impedance, RCD operation, etc.), and the production of an Electrical Installation Certificate (EIC) confirming the installation complies with BS 7671."
  },
  {
    id: 7,
    question: "Part 7 of BS 7671 covers special installations or locations. Which of the following is covered by Part 7?",
    options: [
      "Standard domestic dwellings",
      "Offices with standard lighting installations",
      "Locations such as bathrooms, swimming pools, construction sites, marinas and solar PV installations",
      "Only high voltage installations above 1000 V AC"
    ],
    correctAnswer: 2,
    explanation: "Part 7 addresses locations and installations requiring additional or modified protective measures due to increased risk. These include bathrooms (Section 701), swimming pools (Section 702), construction sites (Section 704), agricultural premises (Section 705), marinas (Section 709), solar PV (Section 712), EV charging (Section 722), and many others."
  },
  {
    id: 8,
    question: "The scope of BS 7671 excludes:",
    options: [
      "Domestic installations",
      "Systems for distribution of electricity to the public and equipment of electricity suppliers (covered by the ESQCR)",
      "Commercial installations",
      "Industrial installations"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 excludes electricity supply systems (covered by the Electricity Safety, Quality and Continuity Regulations 2002), lightning protection systems (BS EN 62305), electrical equipment of machines (BS EN 60204), radio interference suppression equipment, and some other specific applications. It covers consumer installations from the origin (meter position) onwards."
  },
  {
    id: 9,
    question: "How does BS 7671 relate to the EAWR 1989?",
    options: [
      "BS 7671 replaces the EAWR for low voltage installations",
      "BS 7671 provides one means of complying with the EAWR, but compliance with BS 7671 does not guarantee compliance with the EAWR in all circumstances",
      "The EAWR require mandatory compliance with BS 7671",
      "They are entirely separate and unrelated"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 provides technical standards that, when complied with, will generally demonstrate compliance with the EAWR. However, BS 7671 is not the only means of compliance, and there may be circumstances where BS 7671 compliance alone is insufficient (e.g., where the specific workplace conditions require additional precautions beyond BS 7671 minimums)."
  },
  {
    id: 10,
    question: "The recommended maximum interval for periodic inspection and testing of an industrial installation under BS 7671 guidance is:",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "IET Guidance Note 3 (Inspection and Testing) recommends maximum intervals for periodic inspection. For industrial installations, the recommended interval is typically 3 years (more frequently for harsher environments). Commercial installations are typically 5 years, and domestic installations are 10 years or on change of occupancy."
  },
  {
    id: 11,
    question: "What document is issued following a satisfactory periodic inspection and testing of an existing installation?",
    options: [
      "An Electrical Installation Certificate (EIC)",
      "A Minor Electrical Installation Works Certificate (MEIWC)",
      "An Electrical Installation Condition Report (EICR)",
      "A Building Regulations Compliance Certificate"
    ],
    correctAnswer: 2,
    explanation: "An EICR (Electrical Installation Condition Report) is issued following periodic inspection and testing. It reports on the condition of the existing installation, using classification codes (C1, C2, C3, FI) to indicate the urgency of any defects found. An EIC is issued for new installations or alterations, not periodic inspection."
  },
  {
    id: 12,
    question: "Under ST1426, why is knowledge of BS 7671 important for maintenance technicians?",
    options: [
      "It is required for electrical installation work only, not maintenance",
      "BS 7671 defines the technical standards against which electrical systems are designed, installed, tested and maintained — a maintenance technician must understand these standards to maintain systems safely",
      "It is optional reading for advanced practitioners only",
      "It only applies to new-build projects"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 defines the technical standards for electrical installations. A maintenance technician must understand these standards to assess whether an existing installation is safe, to carry out periodic testing correctly, to make alterations that comply with current requirements, and to identify defects that may indicate non-compliance with safety standards."
  }
];

const faqs = [
  {
    question: "Do I need to comply with BS 7671 when maintaining an old installation?",
    answer: "An existing installation does not need to be upgraded to the current edition of BS 7671 unless it is being altered or extended. However, you must assess whether the installation is safe and complies with the EAWR 1989. If an existing installation presents a danger (e.g., lack of earthing), the EAWR require it to be made safe regardless of when it was installed. BS 7671 provides the benchmark for assessing safety."
  },
  {
    question: "What is the difference between an EIC, MEIWC and EICR?",
    answer: "An Electrical Installation Certificate (EIC) is issued for new installations or major alterations. A Minor Electrical Installation Works Certificate (MEIWC) is for minor works such as adding a socket or light. An Electrical Installation Condition Report (EICR) is for periodic inspection and testing of existing installations. Each has a different purpose and format, but all are defined in BS 7671 Appendix 6."
  },
  {
    question: "How often is BS 7671 updated?",
    answer: "BS 7671 is typically updated on a cycle of approximately 3-5 years through amendments, with a full new edition every 10-15 years. The current edition is the 18th Edition (2018), with amendments A2:2022 and A3:2024. The 19th Edition is expected in due course. Electricians should keep up to date with amendments as they can introduce significant changes to specific requirements."
  },
  {
    question: "Is BS 7671 based on international or European standards?",
    answer: "Yes. BS 7671 is substantially based on the CENELEC Harmonisation Documents (HD 60364 series), which are themselves based on IEC 60364 (International Electrotechnical Commission). However, BS 7671 includes UK-specific national deviations and additions that reflect UK practice, supply characteristics, and regulatory requirements. It is not an exact copy of the European standards."
  },
  {
    question: "What are the IET Guidance Notes and how do they relate to BS 7671?",
    answer: "The IET publishes a series of Guidance Notes (GN1 to GN8) and the On-Site Guide that provide practical interpretation and worked examples for BS 7671 requirements. They are not part of BS 7671 itself but are widely used by electricians to understand and apply the regulations. Key guidance notes include GN3 (Inspection and Testing), GN5 (Protection Against Electric Shock), and GN8 (Earthing and Bonding)."
  }
];

const MOETModule1Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BS 7671 Wiring Regulations
          </h1>
          <p className="text-white/80">
            The UK national standard for electrical installation and maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671:</strong> Non-statutory British Standard — the IET Wiring Regulations</li>
              <li className="pl-1"><strong>Structure:</strong> 7 parts + appendices covering design to testing</li>
              <li className="pl-1"><strong>Current:</strong> 18th Edition (2018) + Amendment 3 (2024)</li>
              <li className="pl-1"><strong>Relationship:</strong> Provides means of compliance with EAWR 1989</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Part 6:</strong> Inspection, testing and certification requirements</li>
              <li className="pl-1"><strong>Part 4:</strong> Protection measures you verify during maintenance</li>
              <li className="pl-1"><strong>Part 7:</strong> Special locations requiring additional precautions</li>
              <li className="pl-1"><strong>ST1426:</strong> Knowledge of BS 7671 as technical compliance standard</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the structure and scope of BS 7671:2018+A3:2024",
              "Describe the non-statutory status of BS 7671 and its relationship to the EAWR 1989",
              "Identify the content and purpose of each of the 7 parts",
              "Explain the fundamental principles established in Part 1 (Chapter 13)",
              "Understand the role of Part 6 in inspection, testing and certification",
              "Describe the amendment history and how updates are incorporated"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Status and Scope */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Status, Scope and Relationship to Legislation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 — Requirements for Electrical Installations — is the UK's national standard for the design,
              erection, and verification of electrical installations. It is published jointly by the British
              Standards Institution (BSI) and the Institution of Engineering and Technology (IET), and is commonly
              referred to as the IET Wiring Regulations or simply "the Regs".
            </p>
            <p>
              The current edition is BS 7671:2018+A3:2024 — the 18th Edition with Amendment 3. The standard is
              based on the CENELEC Harmonisation Documents (HD 60364 series) with UK national deviations. It has
              a long history, with the first edition of the IEE (now IET) Wiring Regulations published in 1882.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Status</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Non-statutory:</strong> BS 7671 is not law. It is a British Standard — compliance is not legally mandated by the EAWR 1989</li>
                <li className="pl-1"><strong>De facto benchmark:</strong> However, it is universally accepted as the principal means of demonstrating compliance with the EAWR for LV installations</li>
                <li className="pl-1"><strong>Court recognition:</strong> In legal proceedings, compliance with BS 7671 is generally accepted as evidence that the EAWR have been satisfied (and vice versa — non-compliance may be evidence of breach)</li>
                <li className="pl-1"><strong>Building Regulations:</strong> Part P of the Building Regulations (England and Wales) references BS 7671 for domestic electrical work, giving it indirect regulatory force in that context</li>
                <li className="pl-1"><strong>Not an ACoP:</strong> Unlike some HSE publications, BS 7671 is not an approved code of practice under Section 16 of the HSWA 1974 — it does not have the special legal status of an ACoP</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scope of BS 7671</p>
              <p className="text-sm text-white mb-3">BS 7671 applies to:</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Electrical installations of buildings (domestic, commercial, industrial)</li>
                <li className="pl-1">Fixed wiring and associated equipment from the origin of the installation</li>
                <li className="pl-1">Circuits supplied at nominal voltages up to and including 1000 V AC or 1500 V DC</li>
                <li className="pl-1">Alterations and additions to existing installations</li>
                <li className="pl-1">Temporary installations (exhibitions, fairgrounds, construction sites)</li>
              </ul>
              <p className="text-sm text-white mt-3 mb-2">BS 7671 does NOT apply to:</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Electricity distribution systems (covered by ESQCR 2002)</li>
                <li className="pl-1">Lightning protection systems (BS EN 62305)</li>
                <li className="pl-1">Electrical equipment of machines (BS EN 60204)</li>
                <li className="pl-1">Equipment on board ships (BS 8450)</li>
                <li className="pl-1">Mining installations (separate regulations)</li>
                <li className="pl-1">Systems above 1000 V AC (though some general principles apply)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Misconception</p>
              <p className="text-sm text-white">
                Many electricians believe BS 7671 is "the law". It is not. The law is the EAWR 1989, the HSWA 1974,
                and associated statutory regulations. BS 7671 is a standard that provides a means of complying with
                the law. This distinction matters: in some circumstances, compliance with BS 7671 alone may not be
                sufficient to prevent danger (e.g., in unusual environments or applications not fully covered by the
                standard). Equally, an installation that does not comply with BS 7671 in every respect may still be
                safe and lawful if alternative measures provide equivalent protection.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Structure — The 7 Parts */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Structure of BS 7671 — The Seven Parts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 is organised into seven parts, each addressing a different aspect of electrical installations.
              The numbering follows the CENELEC/IEC 60364 structure. Understanding this structure helps you navigate
              the standard efficiently — which is essential when you need to reference specific requirements on site.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part 1 — Scope, Object and Fundamental Principles</h3>
                <p className="text-sm text-white mb-2">
                  Part 1 defines the scope of BS 7671 and establishes the fundamental principles that underpin every
                  other requirement. Chapter 13 is particularly important — it states the fundamental principles of
                  protection for safety.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Chapter 11:</strong> Scope — what BS 7671 covers and excludes</li>
                  <li className="pl-1"><strong>Chapter 12:</strong> Object and effects — the aims of the standard</li>
                  <li className="pl-1"><strong>Chapter 13:</strong> Fundamental principles — protection against electric shock, thermal effects, overcurrent, fault currents; isolation and switching; good workmanship; competent persons</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-2">
                  <strong>Key principle (13.1):</strong> Persons and livestock shall be protected against the dangers
                  that may arise from contact with or approach to live parts of the installation.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part 2 — Definitions</h3>
                <p className="text-sm text-white">
                  Part 2 provides definitions for all technical terms used in BS 7671. These are not general
                  dictionary definitions — they are precise technical definitions with specific legal and technical
                  meaning. Always refer to Part 2 if you are uncertain about a term. Key definitions include "basic
                  protection", "fault protection", "protective conductor", "earth fault loop impedance", and
                  "prospective fault current".
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part 3 — Assessment of General Characteristics</h3>
                <p className="text-sm text-white mb-2">
                  Part 3 requires the designer/installer to assess the characteristics of the supply and the
                  installation before design begins. This is critical for maintenance technicians because changes
                  to any of these characteristics may require alterations to the installation.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Chapter 31:</strong> Purposes, supplies and structure</li>
                  <li className="pl-1"><strong>Chapter 32:</strong> Classification of external influences (environment, utilisation, building construction)</li>
                  <li className="pl-1"><strong>Chapter 33:</strong> Compatibility of equipment</li>
                  <li className="pl-1"><strong>Chapter 34:</strong> Maintainability — the installation must be designed so it can be safely maintained</li>
                  <li className="pl-1"><strong>Chapter 35:</strong> Safety services (emergency lighting, fire alarms)</li>
                  <li className="pl-1"><strong>Chapter 36:</strong> Continuity of service</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part 4 — Protection for Safety</h3>
                <p className="text-sm text-white mb-2">
                  Part 4 contains the core protective requirements — the technical heart of BS 7671. As a
                  maintenance technician, you will reference Part 4 frequently when assessing whether an
                  installation's protective measures remain effective.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Chapter 41:</strong> Protection against electric shock — basic protection (insulation, barriers, enclosures) and fault protection (ADS, earthing, protective conductors, RCDs)</li>
                  <li className="pl-1"><strong>Chapter 42:</strong> Protection against thermal effects — fire protection, burns</li>
                  <li className="pl-1"><strong>Chapter 43:</strong> Protection against overcurrent — overload and short-circuit protection</li>
                  <li className="pl-1"><strong>Chapter 44:</strong> Protection against voltage disturbances and electromagnetic influences — surges, EMC</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part 5 — Selection and Erection of Equipment</h3>
                <p className="text-sm text-white mb-2">
                  Part 5 specifies the requirements for selecting and installing equipment to satisfy the protection
                  requirements of Part 4.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Chapter 51:</strong> Common rules for selection and erection</li>
                  <li className="pl-1"><strong>Chapter 52:</strong> Wiring systems — cable types, installation methods, current-carrying capacities, voltage drop</li>
                  <li className="pl-1"><strong>Chapter 53:</strong> Switchgear and controlgear — devices for protection, isolation and switching</li>
                  <li className="pl-1"><strong>Chapter 54:</strong> Earthing arrangements and protective conductors</li>
                  <li className="pl-1"><strong>Chapter 55:</strong> Other equipment (generators, UPS, luminaires, etc.)</li>
                  <li className="pl-1"><strong>Chapter 56:</strong> Supplies for safety services</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part 6 — Inspection and Testing</h3>
                <p className="text-sm text-white mb-2">
                  Part 6 defines the requirements for verifying that installations comply with BS 7671. It covers
                  both initial verification (new work) and periodic inspection and testing (existing installations).
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Chapter 61:</strong> Initial verification — inspection and testing before energisation</li>
                  <li className="pl-1"><strong>Chapter 62:</strong> Periodic inspection and testing — assessing condition of existing installations</li>
                  <li className="pl-1"><strong>Chapter 63:</strong> Requirements for reporting — EIC, MEIWC, EICR formats</li>
                  <li className="pl-1"><strong>Test sequence:</strong> Continuity → insulation resistance → polarity → earth fault loop impedance → RCD operation → prospective fault current</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part 7 — Special Installations or Locations</h3>
                <p className="text-sm text-white mb-2">
                  Part 7 provides additional or modified requirements for locations where the risk is higher than
                  normal. Each section (7XX) addresses a specific installation type or location.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Section 701:</strong> Bathrooms and shower rooms</li>
                  <li className="pl-1"><strong>Section 702:</strong> Swimming pools and fountains</li>
                  <li className="pl-1"><strong>Section 704:</strong> Construction and demolition sites</li>
                  <li className="pl-1"><strong>Section 705:</strong> Agricultural and horticultural premises</li>
                  <li className="pl-1"><strong>Section 708:</strong> Electrical installations in caravan/camping parks</li>
                  <li className="pl-1"><strong>Section 711:</strong> Exhibitions, shows and stands</li>
                  <li className="pl-1"><strong>Section 712:</strong> Solar photovoltaic (PV) systems</li>
                  <li className="pl-1"><strong>Section 722:</strong> Electric vehicle charging installations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Fundamental Principles */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fundamental Principles (Chapter 13)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Chapter 13 of Part 1 establishes the fundamental principles that every other requirement in BS 7671
              serves to implement. These principles are not merely aspirational — they define the objectives that
              every installation must achieve. For maintenance technicians, they provide the framework for assessing
              whether an installation remains safe.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Against Electric Shock (131.1–131.6)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Basic protection:</strong> Protection against contact with live parts in normal service conditions — achieved by insulation, barriers, enclosures, or obstacles/placing out of reach</li>
                <li className="pl-1"><strong>Fault protection:</strong> Protection against contact with parts made live by a fault — achieved by automatic disconnection of supply (ADS), the most common method, using earthing, protective conductors, and overcurrent/RCD devices</li>
                <li className="pl-1"><strong>Additional protection:</strong> Supplementary measures such as 30 mA RCD protection and supplementary bonding — providing an additional safety net</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other Fundamental Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Protection against thermal effects (131.3):</strong> Persons, fixed equipment and materials adjacent to electrical equipment must be protected against harmful thermal effects (fire, burns, impairment of equipment safety function)</li>
                <li className="pl-1"><strong>Protection against overcurrent (131.4):</strong> Persons and property must be protected against injury or damage due to excessive currents from overloads or short circuits</li>
                <li className="pl-1"><strong>Protection against fault currents (131.5):</strong> Conductors (other than circuit conductors) and connections must be able to carry fault current without danger</li>
                <li className="pl-1"><strong>Isolation and switching (132):</strong> Effective means must be provided for isolation, switching off for mechanical maintenance, emergency switching, and functional switching</li>
                <li className="pl-1"><strong>Good workmanship and materials (134):</strong> Every installation must be designed and erected with good workmanship and proper materials</li>
                <li className="pl-1"><strong>Competent persons (134.1.1):</strong> Design, erection, verification and operation must be carried out by competent persons</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance link:</strong> Chapter 34 (Part 3) specifically addresses maintainability. It
              requires that the frequency and quality of maintenance expected over the installation's life be
              assessed at the design stage. As a maintenance technician, if you find an installation that is
              practically impossible to maintain safely (e.g., no isolation facility, insufficient working space),
              this is a design deficiency that should be reported.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Amendments and Relevance to Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Amendment History and Relevance to Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 is a living document that evolves to reflect new technology, updated safety research, and
              changes in installation practice. Understanding the amendment history helps you identify which
              requirements apply to installations of different ages and recognise when older installations may
              need upgrading.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recent Edition and Amendment History</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Edition/Amendment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Year</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">17th Edition</td>
                      <td className="border border-white/10 px-3 py-2">2008</td>
                      <td className="border border-white/10 px-3 py-2">Major restructure to CENELEC format; new chapter numbering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">17th Ed. Amd 1</td>
                      <td className="border border-white/10 px-3 py-2">2011</td>
                      <td className="border border-white/10 px-3 py-2">Cable calculations; metal consumer units (later introduced in Amd 3)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">17th Ed. Amd 3</td>
                      <td className="border border-white/10 px-3 py-2">2015</td>
                      <td className="border border-white/10 px-3 py-2">Consumer unit enclosures; RCD protection for socket outlets; cable in walls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">18th Edition</td>
                      <td className="border border-white/10 px-3 py-2">2018</td>
                      <td className="border border-white/10 px-3 py-2">Arc fault detection; energy efficiency; prosumers; EV charging (Section 722)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">18th Ed. A2:2022</td>
                      <td className="border border-white/10 px-3 py-2">2022</td>
                      <td className="border border-white/10 px-3 py-2">Onshore generating sets (Section 717); PME at caravans/marinas; wiring in escape routes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">18th Ed. A3:2024</td>
                      <td className="border border-white/10 px-3 py-2">2024</td>
                      <td className="border border-white/10 px-3 py-2">Updated requirements for EV charging, PV systems, energy storage; prosumer installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance and Older Installations</h3>
                <p className="text-sm text-white">
                  When you carry out maintenance or periodic inspection on an existing installation, you assess it
                  against the edition of BS 7671 that applied when it was installed (or last significantly altered).
                  However, the EAWR 1989 require that the system is maintained to prevent danger — if an older
                  installation has features that are now known to be unsafe (e.g., no RCD protection on socket
                  circuits in a domestic premises), this should be reported as a departure that may need remediation.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Alterations and Additions</h3>
                <p className="text-sm text-white">
                  Any alteration or addition to an existing installation must comply with the current edition of
                  BS 7671. The existing installation need not be upgraded, but the new work must not make the
                  existing installation less safe. Regulation 132.16 requires you to verify that the existing
                  installation can safely support the proposed alteration — including confirming adequate earthing,
                  protective conductor integrity, and fault level capability.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Appendices</p>
              <p className="text-sm text-white mb-3">
                BS 7671 includes several appendices that provide essential reference data:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Appendix 1:</strong> British Standards for electrical installations</li>
                <li className="pl-1"><strong>Appendix 2:</strong> Statutory regulations and associated memoranda</li>
                <li className="pl-1"><strong>Appendix 3:</strong> Time/current characteristics of protective devices and cables</li>
                <li className="pl-1"><strong>Appendix 4:</strong> Current-carrying capacity and voltage drop tables</li>
                <li className="pl-1"><strong>Appendix 5:</strong> Classification of external influences</li>
                <li className="pl-1"><strong>Appendix 6:</strong> Model forms for certification and reporting (EIC, MEIWC, EICR)</li>
                <li className="pl-1"><strong>Appendix 15:</strong> Ring and radial final circuit arrangements</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 note:</strong> You are expected to understand the structure and purpose of BS 7671, and
              how it relates to your maintenance work. You do not need to memorise every regulation number, but
              you should be able to navigate the standard, identify which part addresses a particular requirement,
              and understand how it connects to the legal framework of the EAWR 1989.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">The 7 Parts</p>
                <ul className="space-y-0.5">
                  <li>Part 1 — Scope and fundamental principles</li>
                  <li>Part 2 — Definitions</li>
                  <li>Part 3 — Assessment of general characteristics</li>
                  <li>Part 4 — Protection for safety</li>
                  <li>Part 5 — Selection and erection of equipment</li>
                  <li>Part 6 — Inspection and testing</li>
                  <li>Part 7 — Special installations or locations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Facts</p>
                <ul className="space-y-0.5">
                  <li>Non-statutory British Standard (not law)</li>
                  <li>Published by BSI and IET</li>
                  <li>Current: 18th Edition + A3:2024</li>
                  <li>Based on CENELEC HD 60364 series</li>
                  <li>Scope: up to 1000 V AC / 1500 V DC</li>
                  <li>Certification: EIC, MEIWC, EICR (Appendix 6)</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-4">
              Next: PUWER 1998
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section4_3;