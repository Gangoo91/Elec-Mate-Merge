import { ArrowLeft, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const TITLE = "Industrial vs Domestic Electrical Setup - Industrial Electrical Module 1.1";
const DESCRIPTION = "Learn the key differences between industrial and domestic electrical systems: voltage levels (230V vs 400V three-phase), protection systems, installation methods, documentation requirements, and competency standards per BS 7671 and BS EN 61439.";

const quickCheckQuestions = [
  {
    id: "voltage-levels",
    question: "What is the standard three-phase voltage in UK industrial installations?",
    options: [
      "230V line-to-neutral",
      "400V line-to-line (three-phase)",
      "110V reduced voltage",
      "415V DC supply"
    ],
    correctIndex: 1,
    explanation: "UK industrial installations use 400V line-to-line for three-phase systems, derived from 230V line-to-neutral. The previous 415V nominal was harmonised to 400V under European standards, though the actual measured voltage may still vary within tolerance."
  },
  {
    id: "earthing-systems",
    question: "Which earthing system uses a combined neutral and protective conductor from the supply transformer?",
    options: [
      "TT system",
      "TN-S system",
      "TN-C-S (PME) system",
      "IT system"
    ],
    correctIndex: 2,
    explanation: "TN-C-S (Protective Multiple Earthing) uses a combined PEN conductor from the transformer, which is split into separate neutral and earth at the service entrance. This is the most common supply arrangement in the UK."
  },
  {
    id: "discrimination",
    question: "What is the purpose of discrimination (selectivity) in industrial protection systems?",
    options: [
      "To reduce cable costs",
      "To ensure only the device nearest the fault operates first",
      "To increase the total available fault current",
      "To eliminate the need for RCDs"
    ],
    correctIndex: 1,
    explanation: "Discrimination ensures that protective devices operate in the correct sequence - the device nearest to the fault should trip first, isolating only the affected circuit while maintaining supply to healthy circuits. This is critical for industrial continuity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the nominal phase-to-phase voltage in a UK three-phase industrial supply?",
    options: ["230V", "400V", "415V", "440V"],
    correctAnswer: 1,
    explanation: "The harmonised European standard specifies 400V phase-to-phase for three-phase supplies, with 230V phase-to-neutral."
  },
  {
    id: 2,
    question: "Which British Standard covers requirements for electrical installations (the IET Wiring Regulations)?",
    options: ["BS EN 61439", "BS 5839", "BS 7671", "BS EN 60947"],
    correctAnswer: 2,
    explanation: "BS 7671 is the UK standard for electrical installations, commonly known as the IET Wiring Regulations or the 18th Edition."
  },
  {
    id: 3,
    question: "In a TN-S earthing system, how is the earth provided?",
    options: [
      "Via a local earth electrode only",
      "Via a separate conductor from the supply transformer",
      "Via a combined PEN conductor that splits at the origin",
      "Via the building steelwork only"
    ],
    correctAnswer: 1,
    explanation: "TN-S provides a separate earth conductor all the way back to the supply transformer, offering the most reliable earth path with no risk of neutral-earth faults."
  },
  {
    id: 4,
    question: "What is the typical maximum demand for a domestic dwelling compared to a small industrial unit?",
    options: [
      "Both typically under 10kVA",
      "Domestic 10-15kVA vs Industrial 50-500kVA",
      "Domestic 100kVA vs Industrial 50kVA",
      "Both typically over 1MVA"
    ],
    correctAnswer: 1,
    explanation: "Domestic properties typically have a maximum demand of 10-15kVA (single-phase 100A), while small industrial units commonly require 50-500kVA three-phase supplies."
  },
  {
    id: 5,
    question: "Which containment system is typically specified for industrial environments requiring fire performance?",
    options: [
      "Plastic conduit",
      "Steel trunking and cable tray with LSF/LSZH cables",
      "PVC trunking",
      "Surface-mounted clips"
    ],
    correctAnswer: 1,
    explanation: "Industrial installations typically specify steel containment (trunking, tray, basket) with LSF/LSZH (Low Smoke Zero Halogen) cables to minimise toxic fume emission during fire."
  },
  {
    id: 6,
    question: "BS EN 61439 covers which type of equipment?",
    options: [
      "Domestic consumer units",
      "Low-voltage switchgear and controlgear assemblies",
      "High-voltage transformers",
      "Emergency lighting systems"
    ],
    correctAnswer: 1,
    explanation: "BS EN 61439 is the harmonised European standard for low-voltage switchgear and controlgear assemblies, including distribution boards, motor control centres, and switchboards used in industrial installations."
  },
  {
    id: 7,
    question: "What additional qualification is typically required for industrial electrical work beyond domestic competency?",
    options: [
      "Part P competent person registration only",
      "NVQ Level 2 in Electrical Installation",
      "JIB ECS Gold Card or equivalent with industrial endorsement",
      "No additional qualification required"
    ],
    correctAnswer: 2,
    explanation: "Industrial electrical work typically requires JIB ECS Gold Card or equivalent registration, often with specific endorsements for industrial installations, demonstrating competency in three-phase systems, HV awareness, and industrial protection."
  },
  {
    id: 8,
    question: "What is the primary purpose of an EICR (Electrical Installation Condition Report)?",
    options: [
      "To certify new installations only",
      "To assess the condition of an existing installation against current standards",
      "To replace the need for design documentation",
      "To test individual appliances"
    ],
    correctAnswer: 1,
    explanation: "An EICR assesses existing installations against the current edition of BS 7671, identifying defects, potential dangers, and non-compliances that require attention."
  },
  {
    id: 9,
    question: "What minimum IP rating is typically required for industrial switchgear in a clean indoor environment?",
    options: ["IP20", "IP44", "IP65", "IP68"],
    correctAnswer: 0,
    explanation: "IP20 is the minimum for clean indoor industrial environments, providing finger protection. Higher ratings (IP44, IP54, IP65) are required for outdoor, dusty, or wet locations."
  },
  {
    id: 10,
    question: "Which document would specify discrimination study requirements for a new industrial installation?",
    options: [
      "The client's purchase order",
      "The electrical design specification and single-line diagram",
      "The building's fire risk assessment only",
      "The manufacturer's product catalogue"
    ],
    correctAnswer: 1,
    explanation: "The electrical design specification and single-line diagram define protection coordination requirements, device ratings, and discrimination margins that must be achieved during installation."
  }
];

const faqs = [
  {
    question: "Can I work on three-phase industrial systems with only domestic installation experience?",
    answer: "While the fundamental electrical principles are the same, industrial work requires additional competencies including three-phase system understanding, industrial protection coordination, safe isolation of high-energy circuits, and familiarity with BS EN 61439 switchgear. You should complete appropriate upskilling training and work under supervision until competent. Many employers require specific industrial endorsements on your ECS card."
  },
  {
    question: "What is the difference between TN-C-S (PME) and TN-S earthing, and why does it matter industrially?",
    answer: "TN-S provides a dedicated earth conductor from the transformer, offering superior earth fault loop impedance and no risk of neutral-earth voltage rise. TN-C-S (PME) uses a combined PEN conductor that splits at the origin, which can carry neutral current and is unsuitable for certain applications (e.g., swimming pools, petrol stations). Industrial sites often request or require TN-S supplies for critical systems and sensitive electronic equipment."
  },
  {
    question: "Why do industrial installations require discrimination studies?",
    answer: "Discrimination studies ensure protective devices operate in the correct sequence during faults - the device nearest the fault trips first, maintaining supply to unaffected circuits. In industrial settings, unplanned shutdowns can cause significant production losses, safety hazards (e.g., process interruption), and equipment damage. Studies verify that time-current characteristics of upstream and downstream devices achieve proper coordination."
  },
  {
    question: "What documentation is required for industrial electrical installations?",
    answer: "Industrial installations require comprehensive documentation including: design specifications, single-line diagrams, cable schedules, protection coordination studies, BS 7671 electrical installation certificates, assembly declarations of conformity per BS EN 61439, test results, operation and maintenance manuals, and as-built drawings. This documentation supports safe operation, maintenance, and future modifications."
  },
  {
    question: "What are the key cable management differences between domestic and industrial?",
    answer: "Industrial installations use robust containment systems including steel cable tray, ladder rack, trunking, and heavy-gauge conduit. Cables are typically multicore armoured (SWA) or installed in steel containment for mechanical protection. Segregation of power, control, and data cables is required to prevent EMI. Fire-rated routes must maintain integrity, and cable sizing must account for grouping, ambient temperature, and harmonics."
  },
  {
    question: "How do I verify that industrial switchgear meets BS EN 61439 requirements?",
    answer: "Request the manufacturer's Declaration of Conformity and test reports demonstrating compliance with BS EN 61439. Key verifications include: rated current (In), prospective fault current rating (Icw), temperature rise limits, IP rating for the environment, and verification of the assembly by design rules, testing, or derivation. The switchgear must be suitable for the specific installation conditions and fault levels."
  }
];

const IndustrialElectricalModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
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

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Industrial vs Domestic Electrical Setup
          </h1>
          <p className="text-white/80">
            Key differences in voltage, protection, installation methods, and compliance requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Voltage:</strong> Domestic 230V single-phase vs Industrial 400V three-phase</li>
              <li><strong>Load:</strong> 10-15kVA domestic vs 50kVA-10MVA+ industrial</li>
              <li><strong>Protection:</strong> Simple MCB/RCD vs coordinated discrimination</li>
              <li><strong>Standards:</strong> BS 7671 plus BS EN 61439 for switchgear</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Differences</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Earthing:</strong> TN-C-S common domestic; TN-S preferred industrial</li>
              <li><strong>Containment:</strong> PVC domestic vs steel tray/trunking industrial</li>
              <li><strong>Documentation:</strong> Basic certs vs full design packages</li>
              <li><strong>Competency:</strong> Part P vs JIB ECS industrial endorsement</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare 230V single-phase and 400V three-phase systems",
              "Understand industrial load characteristics and diversity",
              "Explain protection discrimination and coordination",
              "Identify industrial containment and cable management",
              "Recognise documentation and compliance requirements",
              "Understand competency and qualification differences"
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

        {/* Section 1: Voltage Levels */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Voltage Levels: 230V vs 400V Three-Phase Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The fundamental difference between domestic and industrial electrical systems begins with the supply voltage and configuration. Understanding this is essential for safe working and correct equipment specification.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Supply (Single-Phase)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Voltage:</strong> 230V AC nominal (216V-253V tolerance)</li>
                  <li><strong>Configuration:</strong> Single phase + neutral</li>
                  <li><strong>Typical supply:</strong> 100A single-phase (23kVA max)</li>
                  <li><strong>Frequency:</strong> 50Hz</li>
                  <li><strong>Supply type:</strong> Usually TN-C-S (PME)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Supply (Three-Phase)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Voltage:</strong> 400V phase-to-phase / 230V phase-to-neutral</li>
                  <li><strong>Configuration:</strong> Three phases (L1, L2, L3) + neutral</li>
                  <li><strong>Typical supply:</strong> 100A-3000A+ three-phase</li>
                  <li><strong>Frequency:</strong> 50Hz</li>
                  <li><strong>Supply type:</strong> TN-S preferred, TN-C-S common</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Three-Phase for Industrial?</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Higher power delivery:</strong> Three-phase delivers 1.73x more power than single-phase at the same current</li>
                <li><strong>Balanced loading:</strong> Load can be distributed across three phases, reducing neutral current</li>
                <li><strong>Motor efficiency:</strong> Three-phase motors are simpler, more efficient, and self-starting</li>
                <li><strong>Reduced cable size:</strong> For the same power, three-phase requires smaller conductors</li>
              </ul>
            </div>

            <p>
              The historical UK voltage of 415V phase-to-phase was harmonised to 400V under European standards (CENELEC HD 472 S1). However, the supply tolerance means actual measured voltages typically remain around 400-415V. Always verify the actual supply voltage when specifying equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Load Characteristics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Load Characteristics and Power Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial installations present fundamentally different load characteristics compared to domestic properties. Understanding these differences is crucial for proper design, cable sizing, and protection selection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Comparison of Load Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Maximum Demand:</strong> Domestic 10-15kVA typical vs Industrial 50kVA to 10MVA+</li>
                <li><strong>Load Type:</strong> Domestic resistive/small motors vs Industrial large motors, drives, welders</li>
                <li><strong>Starting Current:</strong> Domestic low (appliances) vs Industrial 6-8x FLC for DOL motors</li>
                <li><strong>Power Factor:</strong> Domestic ~0.95 (mostly resistive) vs Industrial 0.7-0.9 (inductive loads)</li>
                <li><strong>Harmonics:</strong> Domestic minimal vs Industrial significant (VFDs, rectifiers)</li>
                <li><strong>Diversity:</strong> Domestic high (0.4-0.6) vs Industrial lower (0.7-0.9 for production)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Load Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Motor starting currents require careful protection selection</li>
                  <li>Power factor correction may be required (capacitor banks)</li>
                  <li>Harmonic filters for non-linear loads (VFDs)</li>
                  <li>Phase balance monitoring and management</li>
                  <li>Demand-side management for peak shaving</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impact on Installation Design</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Larger cable cross-sections (up to 630mm sq and beyond)</li>
                  <li>Higher prospective fault currents (up to 50kA+)</li>
                  <li>Busbar systems for high-current distribution</li>
                  <li>Neutral sizing for harmonic currents</li>
                  <li>Dedicated transformer supplies common</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Protection Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protection Systems and Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial protection systems must handle higher fault currents, provide coordinated operation (discrimination), and maintain supply continuity to unaffected circuits. This requires careful selection and coordination of protective devices.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>MCBs (Type B, C) up to 63A</li>
                  <li>30mA RCDs for socket circuits</li>
                  <li>RCBO combination devices</li>
                  <li>Simple fuse boards (consumer units)</li>
                  <li>Limited discrimination requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>MCCBs and ACBs (up to 6300A)</li>
                  <li>HRC fuses for motor protection</li>
                  <li>Type S (selective) RCDs for discrimination</li>
                  <li>Motor protection relays (thermal, electronic)</li>
                  <li>Full discrimination studies required</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Discrimination (Selectivity) Explained</p>
              <p className="text-sm text-white/90 mb-3">
                Discrimination ensures that during a fault, only the protective device nearest to the fault operates, leaving upstream devices closed and maintaining supply to healthy circuits.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Time discrimination:</strong> Upstream device has longer time delay</li>
                <li><strong>Current discrimination:</strong> Upstream device has higher setting</li>
                <li><strong>Energy discrimination:</strong> Upstream device allows downstream to clear fault first (I2t)</li>
                <li><strong>Zone discrimination:</strong> Communication between devices for intelligent tripping</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Industrial Protection Devices</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>MCCB (Moulded Case Circuit Breaker):</strong> Adjustable thermal-magnetic protection, 16A-1600A</li>
                <li><strong>ACB (Air Circuit Breaker):</strong> Withdrawable, fully adjustable protection, 630A-6300A</li>
                <li><strong>Motor Protection Relay:</strong> Overload, phase loss, earth fault, stall protection</li>
                <li><strong>HRC Fuse:</strong> High rupturing capacity for motor backup protection</li>
                <li><strong>Surge Protection Device (SPD):</strong> Transient overvoltage protection for sensitive equipment</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Installation Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation Methods: Containment and Cable Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial environments demand robust cable containment systems that provide mechanical protection, fire performance, and facilitate maintenance. The choice of containment and cable type is driven by environmental conditions, fire strategy, and operational requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Installation Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li>PVC conduit and trunking</li>
                  <li>Surface-mounted or concealed in walls</li>
                  <li>Twin and earth (6242Y) cables</li>
                  <li>Minimal segregation requirements</li>
                  <li>Simple support and fixing methods</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Installation Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Steel cable tray, ladder, and basket</li>
                  <li>Steel trunking and heavy-gauge conduit</li>
                  <li>Multicore armoured cables (SWA)</li>
                  <li>LSF/LSZH sheathed cables for fire performance</li>
                  <li>Strict segregation of power, control, data</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Segregation Requirements</p>
              <p className="text-sm text-white/90 mb-3">
                BS 7671 and EMC requirements mandate segregation of different cable types to prevent electromagnetic interference and maintain circuit integrity.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Band I:</strong> Extra-low voltage (ELV), fire alarm, data, telecoms</li>
                <li><strong>Band II:</strong> Low voltage power and lighting circuits</li>
                <li><strong>Separation distances:</strong> Per BS 7671 Table 52.2 for parallel runs in containment</li>
                <li><strong>Separate compartments:</strong> Or physical barriers within shared containment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Industrial Cable Types</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>SWA (Steel Wire Armoured):</strong> Mechanical protection, direct burial, tray installation</li>
                <li><strong>LSF/LSZH:</strong> Low smoke and fume emission for occupied buildings</li>
                <li><strong>MICC (Mineral Insulated):</strong> Fire survival, enhanced fire rating applications</li>
                <li><strong>SY/CY Flex:</strong> Screened flexible cables for control and instrumentation</li>
                <li><strong>Busbar trunking:</strong> High-current distribution, tap-off flexibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Documentation and Compliance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Documentation and Compliance Differences
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial electrical installations require comprehensive documentation beyond the basic certificates used for domestic work. This documentation supports safe operation, maintenance, modifications, and regulatory compliance throughout the installation's lifecycle.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electrical Installation Certificate (EIC)</li>
                  <li>Minor Electrical Installation Works Certificate</li>
                  <li>Electrical Installation Condition Report (EICR)</li>
                  <li>Schedule of Test Results</li>
                  <li>Part P Building Control notification (if applicable)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All domestic documents plus:</li>
                  <li>Design specification and calculations</li>
                  <li>Single-line diagrams and schematics</li>
                  <li>Protection coordination studies</li>
                  <li>BS EN 61439 Declaration of Conformity</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Industrial Documents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Design Specification:</strong> Defines requirements and design basis (Project specific)</li>
                <li><strong>Single-Line Diagram:</strong> Shows power distribution architecture (IEC 60617)</li>
                <li><strong>Cable Schedule:</strong> Cable sizes, types, routes, lengths (BS 7671)</li>
                <li><strong>Protection Study:</strong> Discrimination and coordination analysis (BS 7671 / IEC 60909)</li>
                <li><strong>Switchgear DoC:</strong> Assembly compliance declaration (BS EN 61439)</li>
                <li><strong>O&amp;M Manual:</strong> Operation and maintenance guidance (Project specific)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS EN 61439 Compliance</p>
              <p className="text-sm text-white/90">
                Industrial switchgear and distribution boards must comply with BS EN 61439 (replacing the old BS EN 60439). This standard requires the original manufacturer or a competent assembler to verify design through one of three methods: verification by testing, verification by calculation, or verification by design rules. A Declaration of Conformity must be provided with every assembly.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Qualifications and Competency */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Qualifications and Competency Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial electrical work demands higher levels of competency and often specific qualifications beyond those required for domestic installations. Understanding these requirements is essential for career development and legal compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Competency</p>
                <ul className="text-sm text-white space-y-1">
                  <li>NVQ Level 3 / AM2 assessment</li>
                  <li>Part P competent person scheme (new build)</li>
                  <li>BS 7671 current edition knowledge</li>
                  <li>JIB ECS card (Electrician grade)</li>
                  <li>Basic safe isolation procedures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Competency</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All domestic qualifications plus:</li>
                  <li>Three-phase systems understanding</li>
                  <li>Industrial protection coordination</li>
                  <li>HV awareness (for sites with HV supplies)</li>
                  <li>Specific employer/site authorisations</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">JIB ECS Card Categories for Industrial Work</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Gold Card (Electrician):</strong> Basic qualification for electrical installation work</li>
                <li><strong>Gold Card (Approved Electrician):</strong> Higher grade with supervisory capability</li>
                <li><strong>Gold Card (Technician):</strong> Design, commissioning, and complex systems</li>
                <li><strong>Specific endorsements:</strong> Industrial, commissioning, inspection and testing</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Competency Warning</p>
                  <p className="text-sm text-white">
                    Working on industrial electrical systems without appropriate competency is dangerous and potentially illegal. Always work within your competence level, seek supervision when learning new skills, and ensure you hold the required qualifications and site authorisations before undertaking work.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Industrial Training</p>
                <ul className="text-sm text-white space-y-1">
                  <li>City &amp; Guilds 2391 (Inspection and Testing)</li>
                  <li>City &amp; Guilds 2396 (Design of Electrical Systems)</li>
                  <li>CompEx (explosive atmospheres)</li>
                  <li>High voltage authorisation training</li>
                  <li>Manufacturer-specific equipment training</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Site-Specific Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Site induction and safety training</li>
                  <li>Permit-to-work systems</li>
                  <li>Electrical authorisation procedures</li>
                  <li>Contractor management requirements</li>
                  <li>CSCS card for construction sites</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Transitioning to Industrial Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always work under supervision until you are competent</li>
                <li>Study three-phase theory and practice before working on live systems</li>
                <li>Familiarise yourself with industrial protection devices and their settings</li>
                <li>Learn to read single-line diagrams and protection coordination studies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Working on Industrial Sites</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always follow permit-to-work procedures</li>
                <li>Use appropriate PPE for the voltage and fault levels present</li>
                <li>Verify isolation at the point of work, not just at the switchboard</li>
                <li>Check prospective fault current before working on any circuit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Underestimating fault levels</strong> - industrial systems can have very high prospective fault currents</li>
                <li><strong>Ignoring phase rotation</strong> - motors can run backwards if phases are connected incorrectly</li>
                <li><strong>Not verifying discrimination</strong> - changes to protection settings can affect coordination</li>
                <li><strong>Poor cable segregation</strong> - mixing power and data cables causes EMI issues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Voltage Standards</p>
                <ul className="space-y-0.5">
                  <li>Single-phase: 230V (216-253V)</li>
                  <li>Three-phase: 400V L-L</li>
                  <li>Reduced voltage: 110V CTE</li>
                  <li>ELV/SELV: 50V AC / 120V DC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 - Wiring Regulations</li>
                  <li>BS EN 61439 - Switchgear</li>
                  <li>BS EN 60947 - LV Devices</li>
                  <li>IEC 60909 - Fault Calculations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Earthing Systems</p>
                <ul className="space-y-0.5">
                  <li>TN-S: Separate earth conductor</li>
                  <li>TN-C-S: Combined PEN, split at origin</li>
                  <li>TT: Local earth electrode</li>
                  <li>IT: Isolated/impedance earthed</li>
                </ul>
              </div>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default IndustrialElectricalModule1Section1;
