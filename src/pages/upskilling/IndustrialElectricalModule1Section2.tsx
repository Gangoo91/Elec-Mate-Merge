import { ArrowLeft, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const TITLE = "HV/LV Separation and Transformer Overview - Industrial Electrical Module 1.2";
const DESCRIPTION = "Learn about high voltage and low voltage separation, transformer principles, substation layouts, and safety requirements in UK industrial electrical systems. Covers 11kV/400V systems, DNO responsibilities, and Electricity at Work Regulations 1989.";

const quickCheckQuestions = [
  {
    id: "hvlv-q1",
    question: "In the UK, at what voltage level does a supply become classified as High Voltage (HV)?",
    options: [
      "Above 230V AC",
      "Above 400V AC",
      "Above 1000V AC",
      "Above 3300V AC"
    ],
    correctIndex: 2,
    explanation: "According to UK regulations and BS 7671, High Voltage (HV) is defined as any voltage exceeding 1000V AC or 1500V DC. This threshold determines the additional safety precautions, authorisation requirements, and equipment specifications needed for working with HV systems."
  },
  {
    id: "hvlv-q2",
    question: "What is the primary purpose of transformer oil in an oil-filled transformer?",
    options: [
      "To increase the transformer efficiency",
      "To provide insulation and cooling",
      "To reduce electromagnetic interference",
      "To prevent rust on the windings"
    ],
    correctIndex: 1,
    explanation: "Transformer oil serves two critical functions: electrical insulation between windings and the tank, and heat dissipation through natural or forced circulation. The oil absorbs heat from the windings and core, transferring it to the tank walls or external radiators for cooling."
  },
  {
    id: "hvlv-q3",
    question: "Who is typically responsible for maintaining the 11kV network up to and including the transformer in a standard commercial installation?",
    options: [
      "The building owner",
      "The facilities management company",
      "The Distribution Network Operator (DNO)",
      "The Health and Safety Executive"
    ],
    correctIndex: 2,
    explanation: "The Distribution Network Operator (DNO) owns and maintains the high voltage network up to and including their transformer in most standard arrangements. The customer's responsibility typically begins at the LV terminals of the transformer or at the agreed point of supply, as defined in the connection agreement."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the standard distribution voltage used by UK DNOs to supply industrial and commercial premises?",
    options: ["3.3kV", "6.6kV", "11kV", "33kV"],
    correctAnswer: 2,
    explanation: "11kV is the standard distribution voltage used by UK DNOs for industrial and commercial supplies."
  },
  {
    id: 2,
    question: "Which type of transformer is most commonly used in indoor substations due to reduced fire risk?",
    options: ["Oil-filled transformer", "Dry-type transformer", "Auto-transformer", "Instrument transformer"],
    correctAnswer: 1,
    explanation: "Dry-type transformers are preferred for indoor substations because they eliminate the fire risk associated with transformer oil."
  },
  {
    id: 3,
    question: "What is the minimum safe approach distance for unqualified persons to exposed 11kV conductors?",
    options: ["1.0 metre", "2.0 metres", "3.0 metres", "5.0 metres"],
    correctAnswer: 2,
    explanation: "Unqualified persons must maintain a minimum distance of 3.0 metres from exposed 11kV conductors."
  },
  {
    id: 4,
    question: "Under the Electricity at Work Regulations 1989, which regulation specifically addresses working on or near live conductors?",
    options: ["Regulation 4", "Regulation 10", "Regulation 14", "Regulation 16"],
    correctAnswer: 2,
    explanation: "Regulation 14 of the Electricity at Work Regulations 1989 specifically addresses working on or near live conductors."
  },
  {
    id: 5,
    question: "What does the acronym 'CT' stand for in the context of HV/LV metering arrangements?",
    options: ["Current Tap", "Current Transformer", "Circuit Terminal", "Capacitor Trip"],
    correctAnswer: 1,
    explanation: "CT stands for Current Transformer, used in metering arrangements to step down high currents to measurable levels."
  },
  {
    id: 6,
    question: "In a ring main unit (RMU), what is the typical configuration?",
    options: [
      "Single circuit breaker with bus section",
      "Two switch disconnectors and one fused switch or circuit breaker",
      "Three circuit breakers in parallel",
      "Two transformers with automatic changeover"
    ],
    correctAnswer: 1,
    explanation: "A typical RMU has two switch disconnectors for the ring and one fused switch or circuit breaker for the transformer tee-off."
  },
  {
    id: 7,
    question: "What colour is typically used to identify 11kV cables in the UK?",
    options: ["Red", "Black", "Blue", "Orange"],
    correctAnswer: 1,
    explanation: "11kV cables in the UK are typically black, following standard cable identification practices."
  },
  {
    id: 8,
    question: "What is the standard secondary voltage from an 11kV/LV distribution transformer in the UK?",
    options: ["230V single phase", "400V three phase", "415V three phase", "440V three phase"],
    correctAnswer: 1,
    explanation: "The standard secondary voltage from an 11kV/LV transformer is 400V three phase (harmonised European standard)."
  },
  {
    id: 9,
    question: "Which document must be completed before accessing a substation containing HV equipment?",
    options: [
      "Risk assessment only",
      "Permit to work",
      "Method statement only",
      "Daily inspection checklist"
    ],
    correctAnswer: 1,
    explanation: "A permit to work must be completed before accessing substations containing HV equipment to ensure proper safety procedures."
  },
  {
    id: 10,
    question: "What is the purpose of a Buchholz relay fitted to an oil-filled transformer?",
    options: [
      "To regulate output voltage",
      "To detect internal faults and gas accumulation",
      "To measure oil temperature",
      "To control cooling fans"
    ],
    correctAnswer: 1,
    explanation: "A Buchholz relay detects internal faults by sensing gas accumulation caused by oil decomposition during fault conditions."
  }
];

const faqs = [
  {
    question: "What qualifications do I need to work on HV systems in the UK?",
    answer: "To work on HV systems, you typically need to be an Authorised Person (AP) or Senior Authorised Person (SAP) under your company's safety rules. This requires completion of HV training courses (such as City & Guilds 2330 or equivalent), practical experience under supervision, and formal authorisation by a competent assessor. You must also hold a current first aid certificate and be medically fit."
  },
  {
    question: "Why is the boundary between HV and LV systems so important?",
    answer: "The HV/LV boundary is critical because it defines where responsibility changes between the DNO and customer, determines which safety rules apply, and identifies the point where voltage transformation occurs. Equipment on either side has vastly different safety requirements, testing regimes, and maintenance protocols."
  },
  {
    question: "Can I enter a substation to read meters without HV authorisation?",
    answer: "This depends on the substation design and your company's safety rules. Many modern substations have segregated areas where LV metering equipment is accessible without entering HV compartments. However, if meters are located within the HV area, you will need appropriate authorisation and must follow permit-to-work procedures."
  },
  {
    question: "What is the difference between a DNO substation and a private substation?",
    answer: "A DNO substation is owned, operated, and maintained by the Distribution Network Operator. A private (customer) substation is owned by the customer, who takes responsibility for maintenance, testing, and operation of both HV and LV equipment. Private substations require employing or contracting Authorised Persons."
  },
  {
    question: "How often should transformer oil be tested?",
    answer: "For oil-filled transformers: new transformers should be tested after the first year, then every 2-3 years for the first 10 years. Older transformers (over 10 years) should be tested annually. Tests include dielectric strength, moisture content, acidity, dissolved gas analysis (DGA), and PCB content."
  },
  {
    question: "What should I do if I discover damage to HV equipment during a site visit?",
    answer: "Do not touch or approach the equipment closer than the safe clearance distance. Evacuate the immediate area and prevent others from entering. Report immediately to your Authorised Person or supervisor. Contact the DNO emergency number if it's their equipment. Document what you observed without putting yourself at risk."
  }
];

const IndustrialElectricalModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-1">
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
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            HV/LV Separation and Transformer Overview
          </h1>
          <p className="text-white/80">
            Understanding the critical boundary between high voltage and low voltage systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>HV Definition:</strong> &gt;1000V AC or &gt;1500V DC</li>
              <li><strong>Standard HV:</strong> 11kV distribution network</li>
              <li><strong>Standard LV:</strong> 400V three-phase / 230V single-phase</li>
              <li><strong>Safety:</strong> Strict access controls and clearances required</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Points</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Transformers:</strong> Oil-filled or dry-type designs</li>
              <li><strong>DNO boundary:</strong> Defines responsibility split</li>
              <li><strong>11kV clearance:</strong> 3.0m for unqualified persons</li>
              <li><strong>Regulations:</strong> EAW 1989 governs all HV work</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define HV and LV voltage classifications per UK standards",
              "Explain transformer operating principles and types",
              "Identify substation components and access requirements",
              "Understand HV/LV metering arrangements",
              "Apply safe approach distances for HV systems",
              "Distinguish DNO and customer responsibilities"
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

        {/* Section 1: HV vs LV Definitions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            HV vs LV Definitions and UK Voltage Levels
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In the UK, the classification of electrical systems into voltage bands is fundamental to determining safety requirements, equipment specifications, and working practices. These definitions are established by British Standards and enforced through the Electricity at Work Regulations 1989.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Low Voltage (LV)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Not exceeding 1000V AC</li>
                  <li>Not exceeding 1500V DC</li>
                  <li>Standard supply: 230V single phase</li>
                  <li>Standard supply: 400V three phase</li>
                  <li>Most common in building installations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High Voltage (HV)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Exceeding 1000V AC</li>
                  <li>Exceeding 1500V DC</li>
                  <li>Common HV levels: 3.3kV, 6.6kV, 11kV</li>
                  <li>Distribution: 33kV, 66kV, 132kV</li>
                  <li>Requires special authorisation</li>
                </ul>
              </div>
            </div>

            <p>
              The <strong>11kV distribution network</strong> is the most common HV system you will encounter in industrial settings. DNOs use this voltage level to efficiently distribute power across their network before stepping down to 400V for final distribution to customers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK Voltage Standards</p>
              <p className="text-sm text-white/90">
                The UK nominal supply voltage is 230V +10%/-6% single phase (216V to 253V) and 400V three phase. This was harmonised with European standards in 1995, although in practice the supply voltage often remains close to the previous 240V standard. For HV systems, 11kV has a tolerance of +/-6%.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Transformer Principles */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Transformer Principles and Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformers are the critical link between HV and LV systems, using electromagnetic induction to step voltage up or down while maintaining power transfer efficiency typically exceeding 98%. Understanding their construction and operation is essential for anyone working in industrial electrical environments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Operating Principle</p>
              <p className="text-sm text-white/90 mb-3">
                A transformer consists of two or more windings wound on a common magnetic core. Alternating current in the primary winding creates a changing magnetic flux in the core, which induces a voltage in the secondary winding. The voltage ratio equals the turns ratio:
              </p>
              <p className="text-sm text-elec-yellow/90 font-mono text-center py-2">
                V1/V2 = N1/N2 (Primary Voltage / Secondary Voltage = Primary Turns / Secondary Turns)
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Oil-Filled Transformers</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cooling:</strong> Mineral oil circulation (ONAN, ONAF, OFAF)</li>
                  <li><strong>Insulation:</strong> Oil-impregnated paper</li>
                  <li><strong>Advantages:</strong> Better cooling, higher ratings possible</li>
                  <li><strong>Disadvantages:</strong> Fire risk, requires bunding</li>
                  <li><strong>Protection:</strong> Buchholz relay, pressure relief valve</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dry-Type Transformers</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cooling:</strong> Air natural (AN) or air forced (AF)</li>
                  <li><strong>Insulation:</strong> Cast resin or VPI</li>
                  <li><strong>Advantages:</strong> Reduced fire risk, no bunding</li>
                  <li><strong>Disadvantages:</strong> Higher cost, lower overload capacity</li>
                  <li><strong>Protection:</strong> Temperature sensors, fan failure alarms</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Transformer Ratings (11kV/400V)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>315 kVA, 500 kVA, 800 kVA</li>
                <li>1000 kVA, 1500 kVA, 2000 kVA</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Substation Layouts */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Substation Layouts and Access Restrictions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Substations are the interface between the HV distribution network and LV consumer installations. Their design must balance operational requirements with safety considerations, ensuring authorised personnel can work safely while preventing unauthorised access.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HV Section</p>
                <ul className="text-sm text-white space-y-1">
                  <li>11kV cable terminations</li>
                  <li>Ring Main Unit (RMU)</li>
                  <li>HV fuses or circuit breaker</li>
                  <li>Earth switches</li>
                  <li>CT/VT metering</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer</p>
                <ul className="text-sm text-white space-y-1">
                  <li>11kV/400V transformer</li>
                  <li>Oil containment (if oil-filled)</li>
                  <li>Tap changer</li>
                  <li>Temperature indicators</li>
                  <li>Protection relays</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LV Section</p>
                <ul className="text-sm text-white space-y-1">
                  <li>LV distribution board</li>
                  <li>Main incoming switch</li>
                  <li>Metering equipment</li>
                  <li>Outgoing ways</li>
                  <li>Capacitor banks</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Access Control Requirements</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>Physical security:</strong> Locked doors, security fencing, intruder alarms</li>
                    <li><strong>Warning signage:</strong> "Danger of Death" signs on all access points</li>
                    <li><strong>Authorisation:</strong> Only Authorised Persons may enter HV areas</li>
                    <li><strong>Key control:</strong> HV keys held only by authorised personnel</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-4">
              Many modern substations incorporate <strong>segregated access</strong>, where LV equipment and metering can be accessed through a separate compartment without entering the HV area. This allows routine meter reading and LV maintenance without requiring HV authorisation.
            </p>
          </div>
        </section>

        {/* Section 4: HV/LV Interface */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            HV/LV Interface and Metering Arrangements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The interface between HV and LV systems involves not just the physical transformer but also the metering arrangements that determine how electricity consumption is measured and billed.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HV Metering</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Current Transformers (CTs) on HV side</li>
                  <li>Voltage Transformers (VTs) for measurement</li>
                  <li>Typically 11kV:110V VT ratio</li>
                  <li>Customer responsible for transformer losses</li>
                  <li>Lower unit rates but higher fixed charges</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LV Metering</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Direct connected or CT metering</li>
                  <li>Located after transformer</li>
                  <li>DNO responsible for transformer</li>
                  <li>Simpler installation and maintenance</li>
                  <li>No separate maximum demand charges</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common CT Ratios for LV Metering</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>100/5A, 200/5A, 400/5A, 800/5A</li>
                <li>1000/5A, 1500/5A, 2000/5A, 3000/5A</li>
                <li>CT accuracy class for billing: typically 0.5 or 0.2S for large consumers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximum Demand (MD) Metering</p>
              <p className="text-sm text-white/90">
                HV and large LV consumers are billed based on their maximum demand, typically measured in kVA over 30-minute intervals. The highest MD recorded in a month determines the demand charge. Understanding and managing peak demand through load scheduling can significantly reduce electricity costs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Safety Clearances */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Safety Clearances and Exclusion Zones
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Critical Safety Information</p>
                  <p className="text-sm text-white">
                    Electrical flashover from HV systems can occur across air gaps without direct contact. The safe approach distances specified below are minimum requirements and must never be compromised.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Minimum Safe Approach Distances</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Up to 1kV (LV):</strong> Avoid contact - no specific distance</li>
                <li><strong>3.3kV:</strong> AP 0.3m, Competent 1.2m, Unqualified 2.0m</li>
                <li><strong>6.6kV:</strong> AP 0.3m, Competent 1.2m, Unqualified 2.4m</li>
                <li><strong>11kV:</strong> AP 0.4m, Competent 1.5m, Unqualified 3.0m</li>
                <li><strong>33kV:</strong> AP 0.7m, Competent 2.0m, Unqualified 4.0m</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Exclusion Zone Definition</p>
                <p className="text-sm text-white/90">
                  The exclusion zone is the area around live HV conductors where only Authorised Persons may work, and only under strict safety procedures. This zone must be clearly marked with barriers and warning signs whenever work is being carried out nearby.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Working Near HV</p>
                <p className="text-sm text-white/90">
                  When working near but not on HV equipment, additional controls include: physical barriers, constant supervision by an Authorised Person, clear identification of safe working areas, and stop-work authority for any person who observes unsafe conditions.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Arc Flash Hazard</p>
              <p className="text-sm text-white/90">
                Beyond electrical shock, HV systems present severe arc flash hazards. An arc flash can produce temperatures exceeding 20,000 degrees C, causing severe burns, blindness, and hearing damage. Personal protective equipment (PPE) rated for the calculated arc flash energy must be worn when working within the arc flash boundary.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: DNO vs Private Responsibilities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            DNO vs Private Network Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the division of responsibilities between the Distribution Network Operator (DNO) and the customer is essential for maintaining compliance with regulations and ensuring safe operation of electrical systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electricity at Work Regulations 1989 - Key Regulations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Regulation 4:</strong> Systems, work activities, and protective equipment must be constructed and maintained to prevent danger</li>
                <li><strong>Regulation 14:</strong> No person shall work on or near live conductors unless it is unreasonable to make them dead</li>
                <li><strong>Regulation 16:</strong> Persons working on electrical systems must be competent to prevent danger and injury</li>
                <li><strong>Regulation 12:</strong> Adequate working space, means of access, and lighting must be provided</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Responsibilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Maintain HV network up to point of supply</li>
                  <li>Operate DNO-owned substations</li>
                  <li>Provide and maintain service cable/line</li>
                  <li>Emergency response to network faults</li>
                  <li>Metering installation (in most cases)</li>
                  <li>Network security and resilience</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Customer Responsibilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Maintain all equipment after point of supply</li>
                  <li>Operate private HV equipment (if applicable)</li>
                  <li>Employ/contract Authorised Persons</li>
                  <li>Regular testing and maintenance</li>
                  <li>Maintain safe access for DNO personnel</li>
                  <li>Compliance with connection agreement</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK Distribution Network Operators</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>UK Power Networks, Western Power Distribution</li>
                <li>Scottish Power Energy Networks, Northern Powergrid</li>
                <li>Electricity North West, SSE Networks</li>
              </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Working Near Substations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always verify whether HV equipment is present before entering</li>
                <li>Check your authorisation level and ensure it covers the work required</li>
                <li>Follow permit-to-work procedures where required</li>
                <li>Maintain safe clearance distances at all times</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing HV/LV Boundaries</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify the point of supply from connection agreement documentation</li>
                <li>Determine which equipment is DNO-owned vs customer-owned</li>
                <li>Understand metering arrangements and billing implications</li>
                <li>Review maintenance responsibilities and schedules</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming LV-only access</strong> - always verify what equipment is present</li>
                <li><strong>Ignoring clearance distances</strong> - flashover can occur without contact</li>
                <li><strong>Working without authorisation</strong> - ensure you have the correct permits</li>
                <li><strong>Touching unfamiliar equipment</strong> - never assume anything is dead</li>
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
                <p className="font-medium text-white mb-1">UK Voltage Classifications</p>
                <ul className="space-y-0.5">
                  <li>LV: Up to 1000V AC / 1500V DC</li>
                  <li>HV: Above 1000V AC / 1500V DC</li>
                  <li>Standard LV: 230V / 400V</li>
                  <li>Standard HV Distribution: 11kV</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Safety Distances (11kV)</p>
                <ul className="space-y-0.5">
                  <li>Authorised Person: 0.4m minimum</li>
                  <li>Competent Person: 1.5m minimum</li>
                  <li>Unqualified Person: 3.0m minimum</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>EAW Reg 4: Safe construction</li>
                  <li>EAW Reg 14: Live working</li>
                  <li>EAW Reg 16: Competence</li>
                  <li>BS 7671: Wiring Regulations</li>
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
            <Link to="/electrician/upskilling/industrial-electrical-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default IndustrialElectricalModule1Section2;
