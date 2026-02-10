import { ArrowLeft, ArrowRight, BookOpen, FileText, ClipboardList, Shield, Wrench, ScrollText, Briefcase, Lightbulb } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule2Section1 = () => {
  useSEO(
    "Section 1: Reading Technical Documents - English for Electricians",
    "Learn to read and understand BS 7671, datasheets, regulations, method statements, O&M manuals and risk assessments used by UK electricians."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Which part of BS 7671 covers inspection and testing requirements?",
      options: ["Part 4 — Protection for Safety", "Part 5 — Selection and Erection", "Part 6 — Inspection and Testing", "Part 7 — Special Installations"],
      correctAnswer: 2,
      explanation: "Part 6 of BS 7671 covers initial verification (inspection and testing) of electrical installations. This is one of the most commonly referenced parts for electricians carrying out testing and certification work."
    },
    {
      id: 2,
      question: "On a product datasheet, what does the rated voltage (Ue) indicate?",
      options: [
        "The maximum fault current the device can handle",
        "The nominal voltage at which the device is designed to operate",
        "The voltage drop across the device",
        "The test voltage applied during manufacture"
      ],
      correctAnswer: 1,
      explanation: "Rated voltage (Ue) indicates the nominal voltage at which the device is designed to operate under normal conditions. Selecting equipment with the correct rated voltage is essential for safe and reliable operation."
    },
    {
      id: 3,
      question: "What does 'Part P' of the Building Regulations specifically cover?",
      options: [
        "Structural requirements for cable routes",
        "Electrical safety in dwellings",
        "Fire alarm installation standards",
        "Energy efficiency of lighting"
      ],
      correctAnswer: 1,
      explanation: "Part P of the Building Regulations (England and Wales) specifically covers electrical safety in dwellings. It sets out requirements for the design, installation, inspection and testing of electrical installations in domestic properties."
    },
    {
      id: 4,
      question: "What does an IP rating of IP65 tell you about a product?",
      options: [
        "It is suitable for use in explosive atmospheres",
        "It is dust-tight and protected against water jets from any direction",
        "It has a power rating of 65 watts",
        "It can withstand temperatures up to 65 degrees Celsius"
      ],
      correctAnswer: 1,
      explanation: "IP65 means the product is completely protected against dust ingress (first digit 6) and protected against water jets from any direction (second digit 5). Understanding IP ratings is essential when selecting equipment for different environments such as bathrooms or outdoor locations."
    },
    {
      id: 5,
      question: "In a method statement, what does the 'sequence of operations' section describe?",
      options: [
        "The order in which trades will arrive on site",
        "The step-by-step process for carrying out the work safely",
        "The schedule of materials to be ordered",
        "The inspection dates for the project"
      ],
      correctAnswer: 1,
      explanation: "The sequence of operations is the core of a method statement. It breaks down the task into numbered steps, describing exactly how the work will be carried out. Each step should identify any associated hazards and the control measures to be applied."
    },
    {
      id: 6,
      question: "Where would you typically find recommended maintenance intervals for an RCD?",
      options: [
        "In BS 7671 Part 3",
        "In the Operation & Maintenance manual",
        "On the building plans",
        "In the risk assessment"
      ],
      correctAnswer: 1,
      explanation: "The O&M manual for the installation or specific equipment will contain recommended maintenance intervals, including how often to test RCDs. While BS 7671 gives general guidance, the O&M manual provides site-specific schedules and manufacturer recommendations."
    },
    {
      id: 7,
      question: "What does the breaking capacity (Icn) of an MCB tell you?",
      options: [
        "The normal operating current of the device",
        "The maximum fault current the device can safely interrupt",
        "The time taken to trip under overload",
        "The ambient temperature rating"
      ],
      correctAnswer: 1,
      explanation: "Breaking capacity (Icn or Icu) is the maximum prospective fault current that the device can safely interrupt without damage. This must be equal to or greater than the prospective fault current at the point of installation."
    },
    {
      id: 8,
      question: "When reading a cable schedule on a commercial project, which information would you NOT typically find?",
      options: [
        "Cable type and size",
        "Circuit reference number",
        "The electrician assigned to install it",
        "Protective device rating"
      ],
      correctAnswer: 2,
      explanation: "Cable schedules typically list the circuit reference, cable type and size, route, protective device rating, and design parameters. They do not normally include personnel assignments — that information would be found in a project programme or resource schedule."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/study-centre/apprentice/functional-skills/module2" className="p-2 -ml-2 touch-manipulation">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 2 &bull; Section 1</p>
            <h1 className="text-base font-bold text-white">Reading Technical Documents</h1>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Reading Technical Documents</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">Develop the reading skills needed to understand the technical documents you will encounter every day as an electrician.</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* Section 01 — Why Technical Reading Matters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Why Technical Reading Matters</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              As an electrician, your ability to read and understand technical documents is not just an academic skill — it directly affects the safety of everyone who uses the installations you work on. Misreading a regulation, overlooking a specification on a datasheet, or misunderstanding a method statement can lead to non-compliant installations, failed inspections, costly rework, or even dangerous situations.
            </p>
            <p>
              Technical literacy is what separates a competent electrician from someone who simply connects wires. When you can confidently navigate BS 7671, interpret manufacturer datasheets, and understand the requirements of a project specification, you become a more valuable, more employable, and safer professional.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Every electrical installation you work on is governed by written documents — regulations, specifications, drawings, and certificates. Your ability to read and interpret these documents accurately is fundamental to your competence as an electrician.</p>
            </div>

            <p>
              Throughout your career, you will encounter a wide range of technical documents. Some you will use daily (such as datasheets and regulations), while others you will refer to less frequently (such as O&M manuals and contract specifications). This section will introduce you to the most important types and give you strategies for reading them effectively.
            </p>

            <h4 className="text-white font-semibold pt-2">Types of documents you will encounter:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Standards and regulations</strong> — BS 7671, Building Regulations, IET Guidance Notes</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Product datasheets</strong> — technical specifications for cables, protective devices, accessories</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Safety documentation</strong> — method statements, risk assessments, permits to work</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Project documentation</strong> — specifications, drawings, schedules, O&M manuals</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Certification forms</strong> — EIC, EICR, Minor Works certificates</span></li>
            </ul>

            <p>
              Do not worry if some of these seem unfamiliar. By the end of this section, you will have a solid understanding of each type and know how to extract the information you need from them quickly and accurately.
            </p>
          </div>
        </motion.div>

        {/* Section 02 — Understanding BS 7671 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Understanding BS 7671</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              BS 7671 — the IET Wiring Regulations — is the national standard for electrical installations in the United Kingdom. It is the single most important document in your career as an electrician. Whether you are installing a new consumer unit in a domestic property or wiring a commercial office building, BS 7671 sets out the requirements you must follow.
            </p>

            <h4 className="text-white font-semibold pt-2">Structure of BS 7671</h4>
            <p>The regulations are organised into seven main parts, each covering a different aspect of electrical installation work:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 1 — Scope, Object and Fundamental Principles:</strong> Defines what the regulations cover, who they apply to, and the fundamental safety principles that underpin everything else.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 2 — Definitions:</strong> A comprehensive glossary of technical terms. If you encounter an unfamiliar term anywhere in the regulations, look it up here first.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 3 — Assessment of General Characteristics:</strong> Covers what you need to assess before starting an installation — the supply characteristics, the intended use, and environmental conditions.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 4 — Protection for Safety:</strong> The core of the regulations. Covers protection against electric shock (Chapter 41), thermal effects (Chapter 42), overcurrent (Chapter 43), voltage disturbances (Chapter 44), and other hazards.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 5 — Selection and Erection of Equipment:</strong> Guidance on choosing the right cables, devices, and accessories, and how to install them correctly.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 6 — Inspection and Testing:</strong> Requirements for initial verification and periodic inspection. This is where you will find the tests you need to carry out and the values you must achieve.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 7 — Special Installations or Locations:</strong> Additional requirements for specific environments such as bathrooms (Section 701), swimming pools (Section 702), construction sites (Section 704), and solar PV installations (Section 712).</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Understanding the numbering system</h4>
            <p>
              Every regulation has a structured reference number that tells you exactly where it sits within the standard. Understanding this system allows you to navigate quickly. Take Regulation <strong className="text-white">411.3.3</strong> as an example:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">4</strong> = Part 4 (Protection for Safety)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">41</strong> = Chapter 41 (Protection Against Electric Shock)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">411</strong> = Section 411 (Protective Measure: Automatic Disconnection of Supply)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">411.3</strong> = Group of regulations within that section</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">411.3.3</strong> = The specific regulation</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Reading regulation tables</h4>
            <p>
              BS 7671 contains many tables that you will need to interpret. For example, Table 41.1 lists maximum disconnection times for final circuits, and the cable current-carrying capacity tables in Appendix 4 are essential for cable sizing. When reading these tables:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Always read the table title and any footnotes before using the data</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Check the column headings carefully — similar tables may have different conditions</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Look for the installation method, ambient temperature, and grouping factors that apply to your situation</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Cross-reference with Appendix 4 tables when sizing cables</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Use the index at the back of BS 7671 to find regulations by topic. Familiarity with the numbering system and the structure of the standard will save you significant time on site and during assessments.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 02 */}
        <InlineCheck
          id="m2s1-bs7671-parts"
          question="Which part of BS 7671 would you consult to find the requirements for electrical installations in a bathroom?"
          options={["Part 4 — Protection for Safety", "Part 5 — Selection and Erection", "Part 6 — Inspection and Testing", "Part 7 — Special Installations or Locations"]}
          correctIndex={3}
          explanation="Part 7 of BS 7671 covers special installations or locations, including bathrooms (Section 701). These sections contain additional requirements that supplement the general requirements in Parts 1 to 6."
        />

        {/* Section 03 — Reading Datasheets */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Reading Datasheets</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Product datasheets are the manufacturer's official technical specifications for a piece of equipment. They tell you everything you need to know to correctly select, install, and maintain a product. As an electrician, you will read datasheets for cables, MCBs, RCDs, RCBOs, consumer units, luminaires, socket outlets, and many other items.
            </p>

            <h4 className="text-white font-semibold pt-2">Key specifications on a typical datasheet</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Rated voltage (Ue):</strong> The nominal operating voltage — typically 230V single-phase or 400V three-phase in the UK. The equipment must be suitable for your supply voltage.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Rated current (In):</strong> The maximum continuous current the device is designed to carry under normal conditions. For an MCB, this is the value stamped on the front — 6A, 16A, 32A, etc.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Breaking capacity (Icn/Icu):</strong> The maximum fault current the device can safely interrupt. This must be equal to or greater than the prospective fault current at the installation point.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">IP rating:</strong> Ingress Protection rating. The first digit indicates protection against solid objects (0-6), and the second indicates protection against water (0-9). For example, IP20 is suitable for dry indoor locations; IP65 is suitable for outdoor or wet environments.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Operating temperature range:</strong> The ambient temperatures within which the device will function correctly. Important in environments that may be unusually hot (e.g. near boilers) or cold (e.g. outdoor enclosures).</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Dimensions and weight:</strong> Physical size for planning cable entries, enclosure space, and mounting arrangements.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Example: Reading a cable datasheet</h4>
            <p>
              When selecting a cable, the datasheet will typically provide the following information:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Cable type:</strong> e.g. 6242Y (Twin and Earth, PVC insulated, PVC sheathed)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Conductor size:</strong> e.g. 2.5mm² — the cross-sectional area of the live conductors</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Current-carrying capacity:</strong> e.g. 27A when clipped direct (Reference Method C). This value depends on the installation method.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Voltage drop:</strong> e.g. 18 mV/A/m — used to calculate whether the cable meets the voltage drop limits in BS 7671</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Conductor resistance:</strong> Used in earth fault loop impedance calculations (Zs)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Insulation type and temperature rating:</strong> PVC (70 degrees C) or thermoplastic (90 degrees C), which affects derating in hot environments</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Understanding tripping characteristics</h4>
            <p>
              For MCBs and RCBOs, datasheets include time-current characteristic curves. These graphs show how quickly the device will trip at different levels of overcurrent. The curve type (B, C, or D) determines the magnetic trip threshold:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Type B:</strong> Trips magnetically between 3 and 5 times rated current — used for general domestic and commercial circuits</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Type C:</strong> Trips between 5 and 10 times rated current — used where higher inrush currents are expected (e.g. motors, fluorescent lighting)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Type D:</strong> Trips between 10 and 20 times rated current — used for high-inrush equipment like transformers and welding machines</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Compliance markings</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">UKCA mark:</strong> Confirms the product meets UK safety, health, and environmental requirements</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">CE mark:</strong> European conformity (still accepted during transition period)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">BASEC:</strong> British Approvals Service for Cables — independent verification of cable quality</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Kitemark:</strong> BSI product certification — shows the product meets the relevant British Standard</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Always check the datasheet before installing any unfamiliar product. Never assume a product is suitable based solely on its appearance or packaging — the datasheet is your definitive source of technical information.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 04 — Regulations & Guidance Notes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Regulations &amp; Guidance Notes</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Beyond BS 7671 itself, there is a family of supporting publications that help you understand and apply the regulations. The IET publishes a series of Guidance Notes that provide detailed explanations, worked examples, and practical advice on specific topics.
            </p>

            <h4 className="text-white font-semibold pt-2">IET Guidance Notes series</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">GN1 — Selection &amp; Erection of Equipment:</strong> Expands on Part 5 of BS 7671 with practical guidance on choosing and installing equipment</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">GN2 — Isolation &amp; Switching:</strong> Covers the requirements for safe isolation, switching, and emergency stopping</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">GN3 — Inspection &amp; Testing:</strong> The essential companion to Part 6. Contains detailed test procedures, sequence of tests, and recording requirements</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">GN4 — Protection Against Fire:</strong> Expands on Chapter 42 with guidance on cable selection, fire barriers, and fire alarm systems</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">GN5 — Protection Against Electric Shock:</strong> Detailed guidance on Chapter 41, including ADS, earth fault loop impedance, and RCD protection</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">GN6 — Protection Against Overcurrent:</strong> Covers Chapter 43 with worked examples for cable sizing and protective device coordination</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">GN7 — Special Locations:</strong> Companion to Part 7 with detailed guidance on bathrooms, swimming pools, marinas, and other special locations</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">GN8 — Earthing &amp; Bonding:</strong> Comprehensive guidance on earthing arrangements, protective conductors, and equipotential bonding</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Building Regulations — Part P</h4>
            <p>
              Part P of the Building Regulations (England and Wales) covers electrical safety in dwellings. It requires that electrical installation work in homes is designed and installed to protect people from fire and electric shock, and that work complies with BS 7671. Key points:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Notifiable work:</strong> New circuits, consumer unit replacements, and work in special locations (bathrooms, outdoors) must be notified to Building Control</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Self-certification:</strong> Electricians registered with a competent person scheme (NICEIC, NAPIT, ELECSA, STROMA) can self-certify notifiable work</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Non-notifiable work:</strong> Like-for-like replacements and minor additions in non-special locations do not require notification, but must still comply with BS 7671</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Other key regulations</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Electricity at Work Regulations 1989:</strong> Places legal duties on employers and employees to prevent danger from electricity in the workplace</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">The Health and Safety at Work Act 1974:</strong> The overarching legislation covering workplace health and safety</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Construction (Design and Management) Regulations 2015 (CDM):</strong> Applies to construction projects and sets out roles and responsibilities for managing health and safety</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The IET Guidance Notes are not a substitute for BS 7671 — they are a companion to it. Always check the regulation itself for the definitive requirement, and use the Guidance Notes for clarification and practical advice.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 04 */}
        <InlineCheck
          id="m2s1-guidance-notes"
          question="Which IET Guidance Note would you consult for detailed test procedures and the sequence of tests during initial verification?"
          options={["GN1 — Selection & Erection", "GN3 — Inspection & Testing", "GN5 — Protection Against Electric Shock", "GN8 — Earthing & Bonding"]}
          correctIndex={1}
          explanation="GN3 (Inspection & Testing) is the essential companion to Part 6 of BS 7671. It contains detailed test procedures, the correct sequence of tests, how to record results, and guidance on interpreting test values."
        />

        {/* Section 05 — Method Statements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Method Statements</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A method statement is a document that describes how a particular task or activity will be carried out safely. It breaks the work down into a logical sequence of steps, identifies the hazards at each stage, and specifies the control measures to be used. On commercial and industrial sites, you will be required to read, understand, and sign method statements before starting work.
            </p>

            <h4 className="text-white font-semibold pt-2">Typical structure of a method statement</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Header information:</strong> Project name, site address, task description, date, revision number, and the name of the person who prepared it</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Scope of works:</strong> A clear description of what work is covered by this method statement and any exclusions</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Personnel and competence:</strong> Who will carry out the work and what qualifications or training they require</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Plant, tools and equipment:</strong> What tools and equipment are needed, including any that require inspection or certification</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Sequence of operations:</strong> Numbered steps describing exactly how the work will be done, from set-up to completion and clean-up</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Safety measures:</strong> PPE requirements, isolation procedures, permits to work, safe working distances, and emergency procedures</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Environmental controls:</strong> Waste disposal, dust suppression, noise control</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Sign-off section:</strong> Space for all personnel to sign, confirming they have read and understood the method statement</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Example: Method statement for consumer unit replacement</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-white/90 font-semibold mb-2">Sequence of operations (extract):</p>
              <ol className="space-y-2 list-decimal list-inside text-white/70">
                <li>Notify the client and agree an isolation period</li>
                <li>Set up safe working area with barriers and warning signs</li>
                <li>Carry out safe isolation of the supply using a proven voltage indicator (GS38 compliant)</li>
                <li>Confirm dead using a voltage indicator, prove-test-prove method</li>
                <li>Lock off supply and attach warning labels</li>
                <li>Photograph existing connections for reference</li>
                <li>Disconnect and remove existing consumer unit</li>
                <li>Install new consumer unit, connecting circuits to correctly rated protective devices</li>
                <li>Complete initial verification tests (continuity, insulation resistance, polarity, earth fault loop impedance, RCD testing)</li>
                <li>Re-energise supply and carry out functional testing</li>
                <li>Issue Electrical Installation Certificate to the client</li>
                <li>Clear work area and dispose of waste responsibly</li>
              </ol>
            </div>

            <p>
              When reading a method statement, always start with the scope to confirm it covers the work you are about to do. Then read through the sequence of operations carefully, paying particular attention to any isolation procedures, permits required, and PPE specified. If anything is unclear, ask your supervisor before proceeding.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Method statements are living documents. If site conditions change — for example, if you discover asbestos or the supply arrangement is different from expected — the method statement must be updated before work continues. Never proceed with work that does not match the method statement.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 06 — O&M Manuals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">O&amp;M Manuals</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Operation and Maintenance (O&amp;M) manuals are comprehensive documents provided at the handover of an electrical installation. They contain everything needed to safely operate, maintain, and service the electrical systems within a building. You will encounter O&amp;M manuals when carrying out maintenance work, periodic inspections, or alterations to existing installations.
            </p>

            <h4 className="text-white font-semibold pt-2">What you will find in an O&amp;M manual</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">As-built drawings:</strong> The final drawings showing the installation as it was actually built (which may differ from the original design drawings)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Equipment schedules:</strong> Lists of all installed equipment including model numbers, ratings, locations, and manufacturer details</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Test certificates:</strong> Initial verification results (EIC), including all test values recorded at the time of installation</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Manufacturer datasheets:</strong> Technical specifications for every installed product</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Warranty information:</strong> Duration, conditions, and contact details for warranty claims</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Spare parts lists:</strong> Recommended spares, part numbers, and supplier information</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Maintenance schedules:</strong> How often to inspect, test, and service each piece of equipment</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Operating instructions:</strong> How to operate switchgear, lighting controls, emergency systems, etc.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Navigating large O&amp;M manuals</h4>
            <p>
              On large commercial projects, O&amp;M manuals can run to several volumes. Here are strategies for finding information quickly:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Start with the contents page or index — do not try to read the manual from cover to cover</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Look for the equipment schedule first to identify the specific product you are working on</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use the as-built drawings to understand the layout before visiting the site</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Check the test certificates for baseline values when carrying out periodic inspections</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Maintenance schedules — what to look for</h4>
            <p>
              The maintenance schedule in an O&amp;M manual will typically specify:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Frequency:</strong> How often each check or test should be carried out (daily, weekly, monthly, quarterly, annually)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Scope:</strong> What exactly needs to be checked, tested, or serviced</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Competence:</strong> Whether the task can be done by the building user or requires a qualified electrician</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Records:</strong> What records need to be kept and for how long</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">When carrying out a periodic inspection, always request the O&amp;M manual and the previous EICR (if available). Comparing your test results with the initial verification values can reveal deterioration in the installation, such as increasing earth fault loop impedance values.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 06 */}
        <InlineCheck
          id="m2s1-om-manuals"
          question="You are carrying out a periodic inspection of a commercial building. Where would you find the initial test results to compare with your current readings?"
          options={["In the risk assessment", "In the O&M manual (test certificates section)", "On the manufacturer's website", "In BS 7671 Appendix 4"]}
          correctIndex={1}
          explanation="The O&M manual will contain the initial verification results (EIC and associated test schedules) recorded when the installation was first completed. These baseline values are invaluable for comparison during periodic inspections."
        />

        {/* Section 07 — Risk Assessments & RAMS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Risk Assessments &amp; RAMS</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Risk assessments identify hazards associated with a task, evaluate the level of risk, and determine what control measures are needed to reduce that risk to an acceptable level. Together with method statements, they form RAMS (Risk Assessments and Method Statements) — a fundamental part of site safety documentation that you will encounter on virtually every commercial or industrial project.
            </p>

            <h4 className="text-white font-semibold pt-2">Understanding hazard identification</h4>
            <p>A risk assessment starts by identifying all the hazards associated with a task. As an electrician, common hazards include:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Electric shock:</strong> Contact with live conductors — the most significant hazard in your work</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Burns and arc flash:</strong> From short circuits or working on equipment with high prospective fault currents</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Working at height:</strong> Using ladders, scaffolding, or mobile elevating work platforms (MEWPs)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Manual handling:</strong> Lifting heavy cable drums, distribution boards, or cable trays</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Dust and debris:</strong> From chasing walls, drilling, or cutting cable containment</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Asbestos:</strong> Present in many older buildings, particularly around cable routes and distribution boards</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Risk rating</h4>
            <p>
              Once hazards are identified, each is assessed for likelihood and severity. These are typically scored on a scale of 1-5 and multiplied together to give a risk rating:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <ul className="space-y-1">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">1-4 (Low risk):</strong> Acceptable — proceed with standard precautions</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">5-12 (Medium risk):</strong> Additional control measures required before proceeding</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">13-25 (High risk):</strong> Work should not proceed until the risk is reduced — may require a permit to work</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">The hierarchy of controls</h4>
            <p>Control measures must follow the hierarchy of controls, starting from the most effective:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Eliminate:</strong> Remove the hazard entirely (e.g. work dead instead of live)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Substitute:</strong> Replace with something less hazardous (e.g. battery tools instead of mains-powered)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Engineering controls:</strong> Physical barriers, guarding, isolation (e.g. insulated shrouds on live busbars)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Administrative controls:</strong> Safe systems of work, permits, training, signage (e.g. permit to work system)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">PPE:</strong> Personal protective equipment — always the last resort, not the first (e.g. insulated gloves, safety glasses)</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Your responsibilities</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Read and understand the risk assessment before starting any work</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Follow the control measures specified — do not take shortcuts</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Report any new hazards or changed conditions to your supervisor immediately</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Sign to confirm you have read and understood the assessment</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>If you feel the risk assessment does not adequately address a hazard, raise your concern — you have the right to stop work if you believe it is unsafe</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">RAMS are not just paperwork to be filed away. They are safety documents designed to protect you and everyone around you. Take the time to read them properly, ask questions if anything is unclear, and always follow the control measures specified.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 08 — Developing Your Reading Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Developing Your Reading Skills</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Reading technical documents on site is different from reading at a desk. Time pressure, distractions, poor lighting, and physical discomfort all make it harder to concentrate. Developing practical strategies will help you get the information you need quickly and accurately, even under difficult conditions.
            </p>

            <h4 className="text-white font-semibold pt-2">Strategies for effective reading</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Skim first, then read in detail:</strong> Scan headings, bold text, and table titles to find the relevant section before reading carefully. This saves time and helps you focus on what matters.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Use the index or contents page:</strong> Do not attempt to read from cover to cover. Go straight to the section you need using the index, contents page, or search function (for digital documents).</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Highlight or bookmark:</strong> If you have your own copy of BS 7671, mark the sections you use most frequently with sticky tabs. This turns a 600-page reference into a quick-access tool.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Take notes:</strong> Write down key values, regulation numbers, or instructions you will need. Do not rely on memory alone — especially for numerical values like Zs limits or disconnection times.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Read actively:</strong> As you read, ask yourself: What does this mean for my work? What action do I need to take? What values do I need to record?</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Building your technical vocabulary</h4>
            <p>
              Technical documents use precise language. A word that means one thing in everyday English may have a specific technical meaning in the electrical trade. For example:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">"Earth"</strong> — not the planet, but the conductive mass of the ground used as a reference point for electrical potential</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">"Neutral"</strong> — not inactive, but the conductor connected to the star point of the supply transformer</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">"Competent"</strong> — not just skilled, but having the technical knowledge, experience, and qualifications appropriate for the work</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">"Shall"</strong> — in BS 7671, this means a mandatory requirement, not a suggestion</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">"Should"</strong> — in the regulations, this indicates a recommendation that you are expected to follow unless there is good reason not to</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Asking for clarification</h4>
            <p>
              There is no shame in asking for help when something is unclear. In fact, it is a sign of professionalism and competence:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>If a specification or instruction is unclear, ask your supervisor or the project engineer — never guess</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>On larger projects, use RFIs (Requests for Information) to formally ask for clarification</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Keep a record of clarifications received — they may affect the scope of works or have contractual implications</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>It is always better to ask and get it right than to assume and make a costly or dangerous mistake</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Practice makes permanent</h4>
            <p>
              The more you engage with technical documents, the more fluent you will become. Set yourself a goal of reading one regulation, one datasheet, or one section of a Guidance Note each week. Over time, you will build a comprehensive understanding that makes your work faster, safer, and more professional.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The ability to read and understand technical documents is a skill that improves with practice. The more you engage with BS 7671, datasheets, method statements, and O&amp;M manuals, the faster and more confident you will become. Make it a habit to read a little every day.</p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Section 1: Reading Technical Documents Quiz" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link to="/study-centre/apprentice/functional-skills/module2" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation">
            <ArrowLeft className="w-4 h-4" />Back to Module
          </Link>
          <Link to="/study-centre/apprentice/functional-skills/module2/section2" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25">
            Technical Writing<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule2Section1;
