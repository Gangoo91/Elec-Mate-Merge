import { ArrowLeft, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "register-regulation",
    question: "Under which regulation is the duty holder required to maintain an asbestos register?",
    options: [
      "Regulation 4 of the Control of Asbestos Regulations 2012",
      "Regulation 11 of the Management of Health and Safety at Work Regulations 1999",
      "Section 2 of the Health and Safety at Work etc. Act 1974",
      "Regulation 9 of the Construction (Design and Management) Regulations 2015"
    ],
    correctIndex: 0,
    explanation: "Regulation 4 of the Control of Asbestos Regulations 2012 (the 'duty to manage') requires the person responsible for maintenance of non-domestic premises to identify ACMs, assess their condition, and maintain a written record — the asbestos register."
  },
  {
    id: "material-assessment-highest",
    question: "In a material assessment, which product type scores the HIGHEST risk?",
    options: [
      "Sprayed coatings and lagging",
      "Asbestos insulating board (AIB)",
      "Asbestos cement products",
      "Floor tiles"
    ],
    correctIndex: 0,
    explanation: "Sprayed coatings and lagging score the highest (12 points) in the product type variable because they are friable — meaning the fibres are loosely bound and easily released into the air when disturbed, even by air movement or minor contact."
  },
  {
    id: "management-plan-contents",
    question: "Which of the following must the asbestos management plan include?",
    options: [
      "The asbestos register, assessment results, management decisions, monitoring schedule, and procedures for work near ACMs",
      "Only the locations of ACMs and the name of the surveyor",
      "A list of licensed removal contractors in the local area",
      "The original building plans from when the property was constructed"
    ],
    correctIndex: 0,
    explanation: "The management plan must include the asbestos register, assessment results for each ACM, the management decision for each ACM (leave, encapsulate, enclose, or remove), a monitoring schedule, and clear procedures for anyone carrying out work that might disturb ACMs."
  }
];

const faqs = [
  {
    question: "Who is responsible for maintaining the asbestos register?",
    answer: "Under Regulation 4 of CAR 2012, the 'duty holder' is the person responsible for maintenance and repair of non-domestic premises — typically the building owner, landlord, or managing agent. In leased buildings, the responsibility depends on the terms of the lease. If the lease is silent on maintenance obligations, the duty falls on the person who has control of the premises by virtue of a contract or tenancy. For multi-occupied buildings, there may be shared responsibilities. The duty holder must ensure the register is kept up to date and made available to anyone who might disturb ACMs."
  },
  {
    question: "How often should the asbestos register be reviewed?",
    answer: "The register should be reviewed at regular intervals — typically at least annually as part of a condition re-inspection. However, it must also be reviewed whenever there is a trigger event: damage to an ACM, planned building work, a change of building use, new survey results, or any incident involving ACMs. In practice, good management means the register is a living document that is updated whenever new information becomes available, not something that gathers dust in a filing cabinet until the annual review."
  },
  {
    question: "What is the difference between a material assessment and a priority assessment?",
    answer: "A material assessment scores the ACM based on its inherent properties — what type of asbestos product it is, how damaged or deteriorated it is, whether it is sealed or exposed, and which type of asbestos fibre it contains. This tells you how likely the material is to release fibres in its current state. A priority assessment then considers the building context — how the space is used, how likely the ACM is to be disturbed by occupants or maintenance workers, and how many people might be exposed. The two scores are combined to determine the overall risk rating and the priority for management action."
  },
  {
    question: "Do domestic properties need an asbestos register?",
    answer: "Regulation 4 of CAR 2012 applies to non-domestic premises and the common parts of multi-occupied residential buildings (such as corridors, stairwells, boiler rooms, and lift shafts in blocks of flats). Individual domestic dwellings are not covered by the duty to manage. However, landlords still have a general duty of care under the Defective Premises Act 1972 and the Housing Act 2004 to ensure that their properties are safe. In practice, any landlord or housing association managing pre-2000 properties should maintain records of known or suspected ACMs, even if a formal asbestos register is not legally required."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What must the asbestos register contain for each identified ACM?",
    options: [
      "Location, type of asbestos (if known), condition assessment, and risk score",
      "Only the room name and a photograph",
      "The name of the person who installed the material",
      "The date when the material will be removed"
    ],
    correctAnswer: 0,
    explanation: "The register must record the location of each ACM, the type of asbestos (if identified by analysis or presumed), a condition assessment, and a risk score derived from the material and priority assessments. Floor plans or drawings showing ACM locations should also be included where practical."
  },
  {
    id: 2,
    question: "In the material assessment scoring, what score does asbestos insulating board (AIB) receive for product type?",
    options: [
      "4",
      "6",
      "10",
      "12"
    ],
    correctAnswer: 2,
    explanation: "Asbestos insulating board (AIB) scores 10 for product type. It is a high-risk material because, although not as friable as sprayed coatings (which score 12), AIB can release significant quantities of fibres when cut, drilled, broken, or when the surface deteriorates."
  },
  {
    id: 3,
    question: "Which of the following is NOT a management option listed in a typical asbestos management plan?",
    options: [
      "Leave in situ and manage",
      "Encapsulate",
      "Bury on site",
      "Remove"
    ],
    correctAnswer: 2,
    explanation: "The four recognised management options are: leave in situ and manage, encapsulate, enclose, and remove. Burying asbestos on site is not a management option — asbestos waste must be disposed of at a licensed waste facility in accordance with hazardous waste regulations."
  },
  {
    id: 4,
    question: "What does 'encapsulate' mean in the context of asbestos management?",
    options: [
      "Remove the ACM and replace it with a modern alternative",
      "Seal the surface of the ACM to prevent fibre release",
      "Build a physical barrier around the ACM",
      "Spray the ACM with water before demolition"
    ],
    correctAnswer: 1,
    explanation: "Encapsulation means applying a sealant to the surface of the ACM (surface sealing) or using a penetrating sealant that binds the fibres together within the material. This prevents fibre release without removing or enclosing the ACM. It is suitable for ACMs in reasonable condition where disturbance is unlikely."
  },
  {
    id: 5,
    question: "What does the priority assessment consider that the material assessment does not?",
    options: [
      "The type of asbestos fibre present",
      "The condition of the ACM surface",
      "How the building is used and the likelihood of the ACM being disturbed",
      "Whether the ACM is sealed or exposed"
    ],
    correctAnswer: 2,
    explanation: "The priority assessment considers building-use factors: normal occupant activity, likelihood of disturbance, human exposure potential, and maintenance activity near the ACM. The material assessment focuses on the ACM's inherent properties — product type, damage, surface treatment, and fibre type."
  },
  {
    id: 6,
    question: "Who should be shown the asbestos register BEFORE starting work in a building?",
    options: [
      "Only the building owner",
      "Only licensed asbestos removal contractors",
      "All contractors and maintenance staff who might disturb ACMs",
      "Only the Health and Safety Executive"
    ],
    correctAnswer: 2,
    explanation: "The register must be made available to anyone who needs it, including all contractors and maintenance staff who might disturb ACMs during their work. Contractors must be shown relevant sections of the register BEFORE starting work so they know where ACMs are located and can take appropriate precautions."
  },
  {
    id: 7,
    question: "Which of the following is a trigger for reviewing the management plan?",
    options: [
      "Only the annual re-inspection date",
      "When the condition of ACMs changes, when work is planned near ACMs, or when the building use changes",
      "Only when the HSE requests a review",
      "Only when a licensed surveyor is available"
    ],
    correctAnswer: 1,
    explanation: "The management plan must be reviewed when the condition of ACMs changes, when work is planned that might disturb ACMs, after any incident involving ACMs, when the building use changes, when new information becomes available, at regular intervals (typically annually), and when responsible personnel change."
  },
  {
    id: 8,
    question: "A material assessment gives an ACM a total score of 14. What risk category does this indicate?",
    options: [
      "Very low risk",
      "Low risk",
      "Medium risk",
      "High risk"
    ],
    correctAnswer: 3,
    explanation: "A total material assessment score of 14 or above indicates high risk. The ACM is likely to be friable, damaged, or of a particularly hazardous type and condition. It requires urgent management action — typically enclosure or removal — and must not be disturbed by any work activity until appropriate controls are in place."
  }
];

export default function AsbestosModule2Section4() {
  useSEO({
    title: "The Asbestos Register & Management Plan | Asbestos Awareness Module 2.4",
    description: "How the asbestos register records ACMs, material and priority assessment scoring, the management plan, management options, review triggers, and communicating the register to contractors and staff.",
  });

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
            <Link to="../asbestos-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/20 border border-orange-500/30 mb-4">
            <FileText className="h-7 w-7 text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-500 text-xs font-semibold">MODULE 2 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Asbestos Register &amp; Management Plan
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How ACMs are recorded, assessed, and managed &mdash; from the written register to the practical decisions that keep workers safe
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Register:</strong> Written record of all known/presumed ACMs</li>
              <li><strong>Assessment:</strong> Material + priority scores determine risk</li>
              <li><strong>Plan:</strong> Manage, encapsulate, enclose, or remove each ACM</li>
              <li><strong>Review:</strong> Triggered by damage, works, or change of use</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Always:</strong> Check the asbestos register before starting work</li>
              <li><strong>Ask:</strong> The client or duty holder to show you the register</li>
              <li><strong>Never:</strong> Start work without knowing where ACMs are</li>
              <li><strong>Report:</strong> Any damage to ACMs immediately</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what the asbestos register is and what it must contain",
              "Describe the material assessment scoring system and its four variables",
              "Explain the purpose and factors of the priority assessment",
              "List the four management options and when each is appropriate",
              "Identify the triggers that require the management plan to be reviewed",
              "Understand who must have access to the register and how it should be communicated"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is the Asbestos Register? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">01</span>
            What Is the Asbestos Register?
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The asbestos register is a <strong>written record of all known or presumed
                asbestos-containing materials (ACMs)</strong> in a building. It is the cornerstone of
                asbestos management &mdash; without it, nobody working in or on the building can know
                where ACMs are located or what precautions are needed.
              </p>

              <p>
                The requirement to maintain an asbestos register comes from <strong>Regulation 4 of the
                Control of Asbestos Regulations 2012</strong> (CAR 2012), commonly known as the
                &ldquo;duty to manage&rdquo;. This regulation places a legal obligation on the person
                responsible for the maintenance and repair of non-domestic premises &mdash; the
                <strong> duty holder</strong> &mdash; to find out whether the building contains asbestos,
                to record the findings, and to manage the risk.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-3">The Register Must Record</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Location of each ACM</strong> &mdash; described clearly enough for anyone to find it (e.g., &ldquo;boiler room, pipe lagging on main hot water pipe, west wall&rdquo;)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Type of asbestos</strong> &mdash; if known from laboratory analysis (chrysotile, amosite, crocidolite) or presumed based on the survey type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Condition assessment</strong> &mdash; the current state of the material (good condition, minor damage, significant damage, severely damaged/delaminating)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Risk score</strong> &mdash; derived from the material assessment and priority assessment (covered in Sections 02 and 03 below)</span>
                  </li>
                </ul>
              </div>

              <p>
                The register should also include <strong>floor plans or drawings</strong> showing the
                locations of ACMs wherever practical. Visual records make it far easier for contractors
                and maintenance staff to understand exactly where asbestos is located, particularly in
                large or complex buildings with multiple floors, plant rooms, and service voids.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Who Must Have Access?</p>
                <p className="text-sm text-white/80">
                  The register must be <strong className="text-white">readily accessible</strong> to
                  anyone who needs it. This includes:
                </p>
                <ul className="text-sm text-white/80 space-y-1 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Contractors</strong> &mdash; before they start any work on the building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Maintenance staff</strong> &mdash; so they know which areas contain ACMs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Emergency services</strong> &mdash; so firefighters and paramedics know where asbestos hazards exist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Building occupants</strong> &mdash; employees, tenants, or anyone else who may be affected</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Rule for Tradespeople</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Never start work in a pre-2000 building without
                  checking the asbestos register.</strong> If the duty holder cannot produce a register
                  or tells you that no survey has been carried out, do not proceed with work that could
                  disturb building materials. Inform your supervisor and request that the register be
                  made available or that a survey be carried out before work begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Material Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">02</span>
            Material Assessment
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The material assessment is a <strong>scoring system used to assess the risk posed by each
                ACM based on its inherent properties</strong>. It answers the question: <em>&ldquo;How
                likely is this material to release asbestos fibres in its current state?&rdquo;</em>
              </p>

              <p>
                The assessment uses <strong>four variables</strong>, each of which is scored. The scores
                are added together to give a total material assessment score. A higher total indicates a
                material that is more likely to release fibres and therefore poses a greater risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Four Variables</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Product Type</p>
                      <p>What form is the ACM in? Sprayed coatings are the most friable (easiest to release fibres), while cement products are the most tightly bound.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Extent of Damage/Deterioration</p>
                      <p>What condition is the ACM in? Ranges from good condition (no visible damage) through to high damage with delaminating or crumbling material.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Surface Treatment</p>
                      <p>Is the ACM sealed, enclosed, or exposed? A material that is painted, sealed in a matrix, or boxed in is less likely to release fibres than one that is exposed and damaged.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Asbestos Type</p>
                      <p>Which type of asbestos fibre is present? Crocidolite (blue) is the most hazardous, followed by amosite (brown), then chrysotile (white).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Material Assessment Scoring Grid */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-orange-500/20 border-b border-orange-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-orange-400">Material Assessment Scoring Grid</p>
                </div>

                {/* Variable 1 — Product Type */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-orange-400 mb-3">Variable 1 &mdash; Product Type</p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Sprayed coating / lagging</div>
                    <div className="text-sm font-bold text-red-400 py-1.5 px-3 bg-red-500/10 rounded text-center min-w-[48px]">12</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Insulating board (AIB)</div>
                    <div className="text-sm font-bold text-red-400 py-1.5 px-3 bg-red-500/10 rounded text-center min-w-[48px]">10</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Textiles / gaskets</div>
                    <div className="text-sm font-bold text-orange-400 py-1.5 px-3 bg-orange-500/10 rounded text-center min-w-[48px]">8</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Cement products</div>
                    <div className="text-sm font-bold text-yellow-400 py-1.5 px-3 bg-yellow-500/10 rounded text-center min-w-[48px]">6</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Floor tiles</div>
                    <div className="text-sm font-bold text-green-400 py-1.5 px-3 bg-green-500/10 rounded text-center min-w-[48px]">4</div>
                  </div>
                </div>

                {/* Variable 2 — Damage/Deterioration */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-orange-400 mb-3">Variable 2 &mdash; Damage / Deterioration</p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Good condition</div>
                    <div className="text-sm font-bold text-green-400 py-1.5 px-3 bg-green-500/10 rounded text-center min-w-[48px]">0</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Low damage</div>
                    <div className="text-sm font-bold text-yellow-400 py-1.5 px-3 bg-yellow-500/10 rounded text-center min-w-[48px]">1</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Medium damage</div>
                    <div className="text-sm font-bold text-orange-400 py-1.5 px-3 bg-orange-500/10 rounded text-center min-w-[48px]">2</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">High damage / delaminating</div>
                    <div className="text-sm font-bold text-red-400 py-1.5 px-3 bg-red-500/10 rounded text-center min-w-[48px]">3</div>
                  </div>
                </div>

                {/* Variable 3 — Surface Treatment */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-orange-400 mb-3">Variable 3 &mdash; Surface Treatment</p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Composite material (sealed in matrix)</div>
                    <div className="text-sm font-bold text-green-400 py-1.5 px-3 bg-green-500/10 rounded text-center min-w-[48px]">0</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Enclosed (boxed in, painted over)</div>
                    <div className="text-sm font-bold text-yellow-400 py-1.5 px-3 bg-yellow-500/10 rounded text-center min-w-[48px]">1</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Exposed but undamaged</div>
                    <div className="text-sm font-bold text-orange-400 py-1.5 px-3 bg-orange-500/10 rounded text-center min-w-[48px]">2</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Exposed and damaged</div>
                    <div className="text-sm font-bold text-red-400 py-1.5 px-3 bg-red-500/10 rounded text-center min-w-[48px]">3</div>
                  </div>
                </div>

                {/* Variable 4 — Asbestos Type */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-orange-400 mb-3">Variable 4 &mdash; Asbestos Type</p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Chrysotile (white)</div>
                    <div className="text-sm font-bold text-green-400 py-1.5 px-3 bg-green-500/10 rounded text-center min-w-[48px]">1</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Amosite (brown)</div>
                    <div className="text-sm font-bold text-orange-400 py-1.5 px-3 bg-orange-500/10 rounded text-center min-w-[48px]">2</div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">Crocidolite (blue)</div>
                    <div className="text-sm font-bold text-red-400 py-1.5 px-3 bg-red-500/10 rounded text-center min-w-[48px]">3</div>
                  </div>
                </div>

                {/* Total Score Interpretation */}
                <div className="p-4">
                  <p className="text-sm font-medium text-orange-400 mb-3">Total Score &mdash; Risk Rating</p>
                  <div className="grid sm:grid-cols-4 gap-2">
                    <div className="rounded-lg border-2 border-green-500/40 bg-green-500/10 p-3 text-center">
                      <p className="text-lg font-bold text-green-400">0&ndash;5</p>
                      <p className="text-xs text-green-300 font-medium">Very Low Risk</p>
                    </div>
                    <div className="rounded-lg border-2 border-yellow-500/40 bg-yellow-500/10 p-3 text-center">
                      <p className="text-lg font-bold text-yellow-400">6&ndash;9</p>
                      <p className="text-xs text-yellow-300 font-medium">Low Risk</p>
                    </div>
                    <div className="rounded-lg border-2 border-orange-500/40 bg-orange-500/10 p-3 text-center">
                      <p className="text-lg font-bold text-orange-400">10&ndash;13</p>
                      <p className="text-xs text-orange-300 font-medium">Medium Risk</p>
                    </div>
                    <div className="rounded-lg border-2 border-red-500/40 bg-red-500/10 p-3 text-center">
                      <p className="text-lg font-bold text-red-400">14+</p>
                      <p className="text-xs text-red-300 font-medium">High Risk</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Worked Example:</strong> A sprayed coating
                  (12) in medium damage condition (2), exposed and damaged (3), containing amosite (2)
                  would score <strong>12 + 2 + 3 + 2 = 19</strong> &mdash; placing it firmly in the
                  <strong className="text-red-400"> high risk</strong> category. This ACM would require
                  urgent management action, most likely removal by a licensed contractor.
                </p>
              </div>

              <p>
                The material assessment score helps to rank ACMs by their inherent danger. However, it
                does not tell the whole story. A high-scoring ACM in a locked, unoccupied plant room
                poses a different practical risk than a medium-scoring ACM in a busy corridor. That is
                why the priority assessment is also needed.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Priority Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">03</span>
            Priority Assessment
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While the material assessment focuses on the ACM itself, the priority assessment looks at
                the <strong>building context</strong>. It assesses the <strong>likelihood of the ACM being
                disturbed</strong> based on how the building is used, who occupies it, and what maintenance
                activities take place near it.
              </p>

              <p>
                The priority assessment considers <strong>four factors</strong>:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Normal Occupant Activity</p>
                      <p>How is the area used? Is it a rarely accessed plant room, a storage area, an office, or a high-traffic corridor or reception? The more activity in the area, the higher the likelihood of accidental disturbance.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Likelihood of Disturbance</p>
                      <p>How likely is the ACM to be knocked, scraped, drilled into, or otherwise physically disturbed? A ceiling tile above a busy workspace is more likely to be disturbed than pipe lagging in a sealed riser cupboard.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Human Exposure Potential</p>
                      <p>How many people use the area, how frequently, and for how long? A boiler room visited weekly by one person is very different from a school classroom occupied by 30 children for six hours a day.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Maintenance Activity</p>
                      <p>How often is maintenance work carried out near the ACM? Areas where electricians, plumbers, or other tradespeople regularly work are at higher risk of accidental disturbance than areas that are never maintained.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The priority assessment score is <strong>combined with the material assessment
                score</strong> to determine the <strong>overall risk rating</strong> and the
                <strong> priority for management action</strong>. An ACM with a high material score
                <em>and</em> a high priority score demands the most urgent response. An ACM with a low
                material score and a low priority score may be safely left in situ and monitored.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Point:</strong> Higher priority = needs action
                  sooner. The combination of material and priority assessments ensures that management
                  decisions are proportionate &mdash; focusing resources on the ACMs that pose the
                  greatest actual risk to the people in the building.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Management Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">04</span>
            The Management Plan
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The asbestos management plan is a <strong>written document that sets out how each
                identified ACM will be managed</strong>. It turns the information in the register and the
                assessment scores into practical decisions and actions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Plan Must Include</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">The asbestos register</strong> &mdash; the complete record of all identified or presumed ACMs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Assessment results</strong> &mdash; material and priority assessment scores for each ACM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Management decisions</strong> &mdash; what action has been decided for each ACM (leave, encapsulate, enclose, or remove)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Monitoring schedule</strong> &mdash; how often each ACM will be re-inspected and by whom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Procedures for work near ACMs</strong> &mdash; what controls, permits, and precautions are required when any work is carried out near or on ACMs</span>
                  </li>
                </ul>
              </div>

              <p>
                For each ACM, the management plan must specify one of <strong>four management
                options</strong>:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">1. Leave in Situ &amp; Manage</p>
                  <p className="text-sm text-white/80 mb-2">
                    Monitor the condition regularly, label the ACM where appropriate, and inform all
                    workers of its location. This is the <strong className="text-white">lowest-cost
                    option</strong> and is suitable for ACMs in good condition that are unlikely to be
                    disturbed.
                  </p>
                  <p className="text-xs text-green-300/70">Suitable for: Good-condition ACMs in low-traffic areas</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-400 mb-2">2. Encapsulate</p>
                  <p className="text-sm text-white/80 mb-2">
                    Seal the surface of the ACM to prevent fibre release. This can be done using a
                    <strong className="text-white"> surface sealant</strong> (coating the outside) or a
                    <strong className="text-white"> penetrating sealant</strong> (binding fibres within
                    the material). The ACM remains in place but is less likely to release fibres.
                  </p>
                  <p className="text-xs text-yellow-300/70">Suitable for: ACMs in reasonable condition with minor surface damage</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-orange-400 mb-2">3. Enclose</p>
                  <p className="text-sm text-white/80 mb-2">
                    Build a <strong className="text-white">physical barrier</strong> around the ACM to
                    prevent access and fibre release. Examples include boxing in pipe lagging, installing
                    false ceilings below sprayed coatings, or constructing sealed panels over AIB. The
                    ACM remains in place behind the enclosure.
                  </p>
                  <p className="text-xs text-orange-300/70">Suitable for: ACMs that need protection from accidental disturbance</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">4. Remove</p>
                  <p className="text-sm text-white/80 mb-2">
                    Complete removal of the ACM by a <strong className="text-white">licensed or
                    competent contractor</strong> (depending on the type and quantity of asbestos). This
                    is the <strong className="text-white">most expensive option</strong> but it
                    permanently eliminates the hazard. Removal generates asbestos waste that must be
                    disposed of at a licensed facility.
                  </p>
                  <p className="text-xs text-red-300/70">Suitable for: High-risk ACMs, planned refurbishment, or demolition</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Proportionate Response:</strong> The management
                  plan must be proportionate to the level of risk. Not every ACM needs to be removed.
                  In many cases, the safest and most cost-effective approach is to leave well-conditioned
                  ACMs in place and manage them through regular monitoring, labelling, and information
                  sharing. Unnecessary removal can actually create <em>more</em> risk by disturbing
                  materials that were previously stable.
                </p>
              </div>

              <p>
                The plan must be <strong>reviewed and updated regularly</strong>. It is not a one-off
                document &mdash; it is a living management tool that must reflect the current condition
                and circumstances of every ACM in the building.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Review Triggers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">05</span>
            Review Triggers
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The register and management plan must be reviewed and updated whenever certain
                <strong> trigger events</strong> occur. Waiting for the next scheduled review is not
                acceptable if circumstances have changed. The following events should trigger an
                immediate review:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Events That Trigger a Review</p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1</span>
                    <span><strong className="text-white">Condition change</strong> &mdash; when the condition of any ACM changes due to damage, deterioration, water ingress, accidental impact, or any other cause</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">2</span>
                    <span><strong className="text-white">Planned work</strong> &mdash; when any work is planned that might disturb ACMs, including maintenance, refurbishment, renovation, or demolition</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">3</span>
                    <span><strong className="text-white">Incident</strong> &mdash; after any incident involving ACMs, such as accidental damage, fibre release, or an unplanned disturbance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">4</span>
                    <span><strong className="text-white">Change of use</strong> &mdash; when the building use changes (e.g., an office converted to a school, a warehouse repurposed as a gym)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">5</span>
                    <span><strong className="text-white">New information</strong> &mdash; when new information becomes available, such as results from a refurbishment/demolition survey, or analysis confirming the type of asbestos in a presumed ACM</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">6</span>
                    <span><strong className="text-white">Regular interval</strong> &mdash; at least annually as part of a scheduled condition re-inspection, even if no trigger events have occurred</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">7</span>
                    <span><strong className="text-white">Personnel change</strong> &mdash; when the people with asbestos management responsibilities change (e.g., new building manager, new facilities team)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">8</span>
                    <span><strong className="text-white">Change of occupancy</strong> &mdash; when the building is sold, leased, or transferred to new occupants who need to be informed of the asbestos situation</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Out-of-Date Registers Are Dangerous</p>
                </div>
                <p className="text-sm text-white/80">
                  An out-of-date register can be <strong className="text-white">worse than no register
                  at all</strong>, because it gives a false sense of security. If a register does not
                  reflect the current condition of ACMs, workers may rely on it and unknowingly disturb
                  materials that have deteriorated since the last inspection. If you are shown a register
                  that appears old or incomplete, raise this concern with the duty holder before
                  proceeding with work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Communicating the Register */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">06</span>
            Communicating the Register
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A register that nobody knows about or cannot access is worthless. The duty holder has a
                legal obligation to ensure that the register and management plan are
                <strong> communicated effectively</strong> to everyone who needs the information.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How the Register Should Be Shared</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Contractors</strong> &mdash; must be shown relevant sections of the register <strong className="text-white">BEFORE starting work</strong>. This is not optional &mdash; it is a legal requirement. Contractors should sign to confirm they have seen and understood the register.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Maintenance staff</strong> &mdash; must know where ACMs are located so they can avoid disturbing them during routine work. Regular briefings and induction training should cover the register.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Emergency services</strong> &mdash; should be informed of ACM locations so that firefighters, paramedics, and other responders can take appropriate precautions during emergencies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Building occupants</strong> &mdash; employees, tenants, and others who use the building should be made aware of asbestos locations, particularly if ACMs are in areas they can access.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-3">Practical Communication Methods</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Labels and stickers</strong> &mdash; apply warning labels directly to or near ACMs where appropriate (e.g., &ldquo;CAUTION &mdash; Contains Asbestos &mdash; Do Not Disturb&rdquo;). These provide an immediate visual warning to anyone in the area.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Permit-to-work systems</strong> &mdash; the permit-to-work system should reference the asbestos register. No work permit should be issued for areas containing ACMs without confirming that the register has been consulted and appropriate precautions are in place.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Digital systems</strong> &mdash; building management systems (BMS), computerised maintenance management systems (CMMS), and cloud-based platforms can make the register accessible in real time from tablets and smartphones on site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Site induction</strong> &mdash; every person entering the building to carry out work should receive an induction that covers the asbestos register and the locations of known ACMs.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Your Right to Information</p>
                </div>
                <p className="text-sm text-white/80">
                  As an electrician or tradesperson, you have a <strong className="text-white">legal
                  right</strong> to be shown the asbestos register before carrying out work that could
                  disturb building materials. If a duty holder refuses or fails to provide this
                  information, you should <strong className="text-white">not proceed with the
                  work</strong>. Report the situation to your supervisor, your employer, and, if
                  necessary, the Health and Safety Executive (HSE). Your safety is more important than
                  any deadline.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Asbestos Surveys
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-3-section-1">
              Next: Common ACMs &mdash; Boards &amp; Sheets
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
