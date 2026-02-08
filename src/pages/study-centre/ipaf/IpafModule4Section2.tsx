import { ArrowLeft, FileSearch, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "Under which regulation is a formal inspection of a mobile access tower required?",
    options: [
      "Health and Safety at Work Act 1974 Section 2",
      "Work at Height Regulations 2005 Schedule 7",
      "Construction (Design and Management) Regulations 2015",
      "Provision and Use of Work Equipment Regulations 1998",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 7 of the Work at Height Regulations 2005 sets out the requirements for inspection of work equipment used for work at height, including mobile access towers.",
  },
  {
    id: 2,
    question: "How often must a mobile access tower be formally inspected after initial assembly?",
    options: [
      "Every 24 hours",
      "Every 3 days",
      "At intervals not exceeding 7 days",
      "Every 14 days",
    ],
    correctAnswer: 2,
    explanation:
      "Schedule 7 of the Work at Height Regulations requires formal inspections at intervals not exceeding 7 days for work equipment from which a person could fall 2 metres or more.",
  },
  {
    id: 3,
    question: "When must an additional formal inspection be carried out outside the 7-day cycle?",
    options: [
      "Whenever a new worker starts using the tower",
      "After any event liable to have affected the stability or structural integrity of the tower",
      "Only if the tower is moved to a different part of the site",
      "At the request of the client only",
    ],
    correctAnswer: 1,
    explanation:
      "An additional inspection is required after any event likely to have affected the tower's stability or structural integrity — for example, high winds, collision, ground settlement, or adverse weather conditions.",
  },
  {
    id: 4,
    question: "Who is legally permitted to carry out a formal inspection of a mobile access tower?",
    options: [
      "Any worker on site who has a CSCS card",
      "Only a PASMA instructor",
      "A competent person with sufficient training and experience",
      "The site manager only",
    ],
    correctAnswer: 2,
    explanation:
      "A formal inspection must be carried out by a competent person — someone with sufficient training, experience, and knowledge to identify defects and assess their significance. This is not limited to PASMA instructors.",
  },
  {
    id: 5,
    question: "Within what time frame must a written report of a formal inspection be produced?",
    options: [
      "Immediately at the time of inspection",
      "Within 24 hours of the inspection",
      "Within 7 days",
      "Within 28 days",
    ],
    correctAnswer: 1,
    explanation:
      "The Work at Height Regulations require that a written report of the inspection is prepared within 24 hours of its completion. The report should be kept on site or readily available.",
  },
  {
    id: 6,
    question: "What is the minimum retention period for formal inspection records of a mobile access tower?",
    options: [
      "Until the tower is next inspected",
      "3 months from the date of inspection",
      "6 months from the date of inspection",
      "12 months from the date of inspection",
    ],
    correctAnswer: 1,
    explanation:
      "Formal inspection records must be kept for a minimum of 3 months from the date of inspection. Many employers choose to keep them longer as part of their quality management system.",
  },
  {
    id: 7,
    question: "A tower is assembled on Monday morning and used throughout the week. On which day must the first 7-day formal inspection take place?",
    options: [
      "The following Monday at the latest",
      "The following Sunday at the latest",
      "7 working days later",
      "Within the same working shift as the 7th day",
    ],
    correctAnswer: 0,
    explanation:
      "The 7-day inspection interval runs from the date of the initial inspection after assembly. If the tower was assembled and initially inspected on Monday, the next inspection is due by the following Monday at the latest.",
  },
  {
    id: 8,
    question: "Which of the following is NOT a required element of a formal inspection report?",
    options: [
      "Name and address of the person for whom the inspection was carried out",
      "Location and description of the work equipment inspected",
      "The purchase price of the tower",
      "Details of any matters identified that could give rise to a risk to safety",
    ],
    correctAnswer: 2,
    explanation:
      "The purchase price of the tower is not relevant to the inspection report. The report must include identification details, location, date, findings, matters giving rise to risk, and the inspector's details.",
  },
];

const quickCheckQuestions = [
  {
    id: "inspection-trigger",
    question:
      "A tower has been in position for 5 days. Overnight, a lorry reversed into the base, denting a frame and displacing a stabiliser. The damage has been repaired. Is a formal inspection now required?",
    options: [
      "No — the 7-day inspection is not yet due",
      "No — the damage has been repaired so it is fine",
      "Yes — a formal inspection is required after any event liable to have affected stability",
      "Only if the site manager requests it",
    ],
    correctIndex: 2,
    explanation:
      "Any event liable to have affected the stability or structural integrity of the tower triggers a requirement for a formal inspection, regardless of how close the next scheduled inspection is.",
  },
  {
    id: "competent-person",
    question:
      "Which combination of attributes defines a 'competent person' for the purpose of formal tower inspections?",
    options: [
      "A PASMA card and 5 years' site experience",
      "Sufficient training, knowledge, and experience to identify defects and assess risk",
      "A university degree in structural engineering",
      "Membership of a professional body",
    ],
    correctIndex: 1,
    explanation:
      "A competent person must have sufficient training, knowledge, and experience appropriate to the task. There is no single prescribed qualification — competence is assessed on the basis of what the person can actually do.",
  },
  {
    id: "report-content",
    question:
      "A colleague has carried out a formal inspection and noted 'Tower OK' on a scrap of paper. Does this meet the legal requirements?",
    options: [
      "Yes — any written record is sufficient",
      "Yes — as long as it is dated and signed",
      "No — the report must include specific prescribed information such as location, equipment description, findings, and inspector details",
      "No — formal inspections do not require written reports",
    ],
    correctIndex: 2,
    explanation:
      "Schedule 7 prescribes specific content that must be included in the inspection report. A vague note such as 'Tower OK' does not satisfy the requirement for details of findings, equipment description, location, and inspector identification.",
  },
];

const faqs = [
  {
    question: "Can a PASMA-trained tower user carry out a formal inspection?",
    answer:
      "Possibly, depending on their level of competence. A standard PASMA Towers for Users certificate demonstrates competence in assembly and use, but not necessarily in formal inspection. Some PASMA courses (e.g. PASMA Towers for Users Plus, or Advanced courses) provide training in inspection. The key question is whether the individual has sufficient training, knowledge, and experience to carry out a thorough inspection and identify all relevant defects.",
  },
  {
    question: "Does the 7-day inspection period include weekends?",
    answer:
      "Yes. The 7-day interval is calendar days, not working days. If the tower was inspected on a Monday, the next inspection is due by the following Monday regardless of whether the weekend was worked. If the tower is not used at weekends, it should still be inspected before work resumes on Monday if 7 days have elapsed.",
  },
  {
    question: "What happens if the tower is dismantled and re-erected within the 7-day period?",
    answer:
      "If a tower is completely dismantled and then re-erected, it must be formally inspected after re-assembly before anyone uses it. The 7-day cycle then resets from the date of the new inspection. Simply moving the tower to a new position without full dismantling does not normally reset the cycle, but an inspection may be required if the move could have affected stability.",
  },
  {
    question: "Where should formal inspection records be kept?",
    answer:
      "Inspection records must be kept at the site where the tower is located (or readily accessible) for the minimum retention period of 3 months. Many principal contractors require inspection records to be available for review at any time. Digital records are acceptable provided they can be produced promptly if requested by an inspector.",
  },
];

export default function IpafModule4Section2() {
  useSEO({
    title: "Formal Inspections | Module 4 Section 2 | IPAF Mobile Scaffold",
    description:
      "Statutory 7-day formal inspections under Work at Height Regulations Schedule 7, competent person requirements, inspection triggers, written report obligations, and record retention.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <header className="text-center mb-12">
          <FileSearch className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 4.2
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Formal Inspections
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            Statutory inspection requirements under the Work at Height Regulations — when to inspect, who can inspect, and what must be recorded
          </p>
        </header>

        {/* Section 01: Quick Summary Boxes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            At a Glance
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
              <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li><strong>Law:</strong> Work at Height Regulations 2005, Schedule 7</li>
                <li><strong>Frequency:</strong> After assembly + every 7 days maximum</li>
                <li><strong>By whom:</strong> Competent person</li>
                <li><strong>Report:</strong> Written within 24 hours</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
              <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li><strong>Trigger:</strong> Assembly, 7-day cycle, or stability event</li>
                <li><strong>Record:</strong> Prescribed report content</li>
                <li><strong>Retain:</strong> Minimum 3 months</li>
                <li><strong>Action:</strong> Defects must be addressed before use</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State the legal basis for formal tower inspections",
              "Explain the 7-day inspection cycle and when it resets",
              "Identify events that trigger an additional inspection",
              "Define what makes a person 'competent' to inspect",
              "Describe the prescribed content of a formal inspection report",
              "Explain record retention requirements and their purpose",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 03: The Legal Requirement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Legal Requirement
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The requirement for formal inspection of mobile access towers comes from <strong>Schedule 7 of the Work at Height Regulations 2005</strong>. This schedule applies to any work equipment from which a person could fall <strong>2 metres or more</strong>.
              </p>
              <p>
                Regulation 12 of the Work at Height Regulations states that every employer shall ensure that work equipment used for work at height is <strong>inspected at suitable intervals</strong> appropriate to the environment and use. Schedule 7 then sets out the specific requirements.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white/60 mb-2">Key Legal Points</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Applies to:</strong> Any mobile access tower from which a person could fall 2 metres or more.</li>
                  <li><strong>Responsibility:</strong> Falls on the person who controls the way work equipment is used — typically the employer or principal contractor.</li>
                  <li><strong>Enforcement:</strong> The Health and Safety Executive (HSE) can issue improvement or prohibition notices and prosecute for non-compliance.</li>
                  <li><strong>Penalties:</strong> Failure to carry out inspections or maintain records can result in unlimited fines and, in serious cases, imprisonment.</li>
                </ul>
              </div>

              <p>
                Note that the 2-metre threshold means that even relatively low towers — a 3-rung tower with a platform height of 2.2 metres, for example — require formal inspection if a person could fall 2 metres or more from the platform or during access.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: When Inspections Are Required */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            When Inspections Are Required
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are three situations in which a formal inspection must be carried out:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">1. After Assembly, Before First Use</p>
                <p className="text-sm text-white mb-2">
                  Every tower must be formally inspected after assembly and before it is used for the first time on site. This applies whether the tower is assembled by the user, a specialist erector, or a subcontractor.
                </p>
                <p className="text-sm text-white">
                  The initial inspection confirms that the tower has been assembled correctly in accordance with the manufacturer's instructions and is safe to use. This inspection sets the start date for the 7-day cycle.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">2. At Intervals Not Exceeding 7 Days</p>
                <p className="text-sm text-white mb-2">
                  After the initial inspection, subsequent inspections must take place at intervals of <strong>no more than 7 calendar days</strong>. This is not 7 working days — weekends and bank holidays are included.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>If the tower was inspected on Monday 1st, the next inspection is due by Monday 8th.</li>
                  <li>If a tower is not used for several days, it must still be inspected before use resumes if 7 days have passed.</li>
                  <li>The inspection should ideally take place within the same working shift as the due date to avoid gaps.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">3. After Any Event Affecting Stability</p>
                <p className="text-sm text-white mb-2">
                  An additional inspection is required after <strong>any event liable to have affected the strength or stability</strong> of the tower. Examples include:
                </p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>High winds</strong> — particularly if wind speed exceeded the manufacturer's maximum during the period the tower was unattended.</li>
                  <li><strong>Vehicle collision</strong> — any impact from plant, vehicles, or materials handling equipment.</li>
                  <li><strong>Ground settlement</strong> — flooding, heavy rain, or thawing causing the ground to soften or move.</li>
                  <li><strong>Structural damage</strong> — discovery of bent, cracked, or missing components.</li>
                  <li><strong>Overloading</strong> — evidence that the safe working load has been exceeded.</li>
                  <li><strong>Unauthorised modification</strong> — any alteration to the tower configuration.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: The Competent Person */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Competent Person
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations require that formal inspections are carried out by a <strong>competent person</strong>. The regulations do not prescribe a specific qualification — competence is assessed on the basis of training, knowledge, and experience.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Defining Competence</p>
                <p className="text-sm text-white mb-2">
                  A competent person for tower inspection must have:
                </p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Sufficient training</strong> — Appropriate to the type and complexity of the tower being inspected. This might include PASMA training, scaffold inspection courses, or manufacturer-specific training.</li>
                  <li><strong>Adequate knowledge</strong> — Understanding of the relevant standards (BS EN 1004), regulations (WAHR 2005), and manufacturer's requirements for the specific tower system.</li>
                  <li><strong>Practical experience</strong> — Hands-on experience with the type of tower being inspected, including familiarity with common defects and their significance.</li>
                  <li><strong>Ability to identify defects</strong> — Can recognise structural damage, missing components, incorrect assembly, and environmental hazards.</li>
                  <li><strong>Judgement</strong> — Can assess the significance of findings and determine whether the tower is safe for continued use or must be taken out of service.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Who Typically Carries Out Inspections?</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>PASMA-trained supervisors</strong> — Supervisors with enhanced PASMA training who regularly work with towers.</li>
                  <li><strong>Scaffold inspectors</strong> — CISRS Advanced Scaffolders or scaffold inspectors with tower experience.</li>
                  <li><strong>Specialist tower inspectors</strong> — Individuals trained specifically in tower inspection by the manufacturer or a PASMA Advanced course.</li>
                  <li><strong>Competent site managers</strong> — Site managers with appropriate training and experience in tower systems.</li>
                </ul>
                <p className="text-sm text-white/70 mt-3">
                  The key point is that a person's competence must be appropriate to the specific task. A competent scaffolder is not automatically competent to inspect a proprietary aluminium tower system, and vice versa.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Important</p>
                    <p className="text-sm text-white">
                      A standard PASMA "Towers for Users" certificate alone may not be sufficient to demonstrate competence for formal inspections. Additional training in inspection techniques and report writing is normally required. Always check with your employer or principal contractor what level of training they require.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Tower Inspection Record */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            The Tower Inspection Record
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every formal inspection must result in a <strong>written report</strong> produced within <strong>24 hours</strong> of the inspection. This report must contain specific prescribed information.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Required Report Content</p>
                <p className="text-sm text-white mb-2">
                  Schedule 7 of the Work at Height Regulations prescribes the following content:
                </p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Name and address</strong> of the person for whom the inspection was carried out.</li>
                  <li><strong>Location and description</strong> of the work equipment inspected — tower type, manufacturer, model, and unique identifier if applicable.</li>
                  <li><strong>Date and time</strong> of the inspection.</li>
                  <li><strong>Details of any matter identified</strong> that could give rise to a risk to the health or safety of any person.</li>
                  <li><strong>Details of any action taken</strong> as a result of findings — for example, components replaced, tower taken out of service, or remedial work carried out.</li>
                  <li><strong>Details of any further action</strong> considered necessary — recommendations for future attention.</li>
                  <li><strong>Name and position</strong> of the person who carried out the inspection.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Report Format</p>
                <p className="text-sm text-white mb-2">
                  The regulations do not prescribe a specific form or template, but the report must be in writing and contain all the required information. Common formats include:
                </p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>PASMA Tower Inspection Record</strong> — A widely used standard form that covers all prescribed content. Available in pad format or via the PASMA TowerSure app.</li>
                  <li><strong>Manufacturer's inspection forms</strong> — Some tower manufacturers provide their own inspection forms tailored to their specific products.</li>
                  <li><strong>Company-specific forms</strong> — Principal contractors often have their own standardised inspection documentation.</li>
                  <li><strong>Digital records</strong> — Inspection apps and software that produce reports meeting the prescribed requirements. These are fully acceptable provided they can be produced as a hard copy if required.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Retention Period</p>
                <p className="text-sm text-white">
                  Inspection reports must be retained for a <strong>minimum of 3 months</strong> from the date of the inspection. However, best practice is to retain reports for longer — many employers keep them for the duration of the project or for a fixed period (typically 6-12 months). If the tower is hired, the hire company may also require copies of inspection records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: The Inspection Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            The Inspection Process
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A formal inspection is more thorough than a pre-use check. It should follow a systematic approach covering every aspect of the tower and its environment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Step-by-Step Inspection Procedure</p>
                <ol className="text-sm text-white space-y-2 ml-4 list-decimal list-inside">
                  <li><strong>Check documentation</strong> — Confirm previous inspection record exists, verify the tower type and configuration against the manufacturer's instructions, and check that any previous defects have been addressed.</li>
                  <li><strong>Ground and base assessment</strong> — Check ground conditions, base plates, sole boards, and levelness. Confirm the tower is plumb using a spirit level.</li>
                  <li><strong>Castor and wheel inspection</strong> — Check each castor for damage, correct insertion, brake operation, and locking pin presence. Test all brakes under load.</li>
                  <li><strong>Frame inspection</strong> — Examine every frame for bending, cracking, corrosion, and correct connection. Check all spigot pins and gravity locks.</li>
                  <li><strong>Brace inspection</strong> — Verify all braces are present, correctly positioned, and fully clipped. Check for bending or damage.</li>
                  <li><strong>Stabiliser inspection</strong> — Confirm stabilisers are correctly positioned, fully extended, and in firm contact with the ground. Check clamps and adjusting mechanisms.</li>
                  <li><strong>Platform inspection</strong> — Check platform condition, secure seating, trapdoor operation, and wind locks. Look for damage, contamination, or missing components.</li>
                  <li><strong>Guardrail and toeboard inspection</strong> — Confirm all guardrails and toeboards are in place at correct heights and securely connected.</li>
                  <li><strong>Environmental assessment</strong> — Review wind conditions, overhead hazards, proximity to excavations, vehicle routes, and public access.</li>
                  <li><strong>Complete the inspection report</strong> — Record all findings, actions taken, and recommendations within 24 hours.</li>
                </ol>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Inspection Within the Same Shift</p>
                <p className="text-sm text-white mb-2">
                  Best practice is to carry out inspections at the <strong>start of the working shift</strong> on the day the inspection falls due. This ensures the tower is confirmed safe before anyone uses it that day. If the inspection reveals defects, there is time within the shift to address them or take the tower out of service.
                </p>
                <p className="text-sm text-white">
                  Delaying the inspection until the end of the shift means the tower has been used all day without being formally inspected. If a defect is then found, the tower has been used unsafely — and the employer has failed to comply with the regulations for the duration of that shift.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Inspection After Moving a Tower</p>
                <p className="text-sm text-white mb-2">
                  Moving a tower to a new location on site does not automatically require a formal inspection, <strong>unless</strong> the move involved:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Complete or partial dismantling and re-assembly</li>
                  <li>Movement over rough ground that may have caused component damage</li>
                  <li>A change to the tower's configuration (different height, additional platforms)</li>
                  <li>Relocation to ground conditions significantly different from the original position</li>
                </ul>
                <p className="text-sm text-white mt-2">
                  In practice, many employers require an inspection after every move as a matter of policy, even if not strictly required by the regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Inspection Documentation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Inspection Documentation Standards
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The quality of the inspection report is just as important as the quality of the inspection itself. A thorough inspection followed by a poor report fails to meet the legal requirements and provides inadequate evidence of compliance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Characteristics of a Good Inspection Report</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Specific, not generic</strong> — Describe what was checked and what was found, not just "OK" or "Pass". For example: "All four castor brakes tested under load — all held firm with no creep."</li>
                  <li><strong>Dated and timed</strong> — The exact date and time of the inspection, not "week commencing" or "March 2025".</li>
                  <li><strong>Identifiable equipment</strong> — The specific tower must be uniquely identifiable: manufacturer, model, serial number or site tag number, configuration, and location.</li>
                  <li><strong>Quantified findings</strong> — Where defects are found, describe them with measurements where possible. "Frame slightly bent" is inadequate; "Frame B3 bowed approximately 8 mm over 1-metre length at rung 4 — rejected" is useful.</li>
                  <li><strong>Clear actions</strong> — What was done about each finding, and what further action is recommended.</li>
                  <li><strong>Signed</strong> — The inspector must be identifiable by name, position, and employer. A physical or electronic signature confirms authenticity.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Photographic Evidence</p>
                <p className="text-sm text-white">
                  While not legally required, photographs are invaluable supporting evidence for inspection reports. Photograph any defects found, the overall tower configuration, and site conditions at the time of inspection. Digital inspection apps like PASMA TowerSure allow photos to be embedded directly in the report. Date-stamped photographs provide powerful evidence in the event of an investigation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Hired Towers and Multi-Employer Sites */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Hired Towers and Multi-Employer Sites
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On many construction sites, towers are <strong>hired from specialist suppliers</strong> or provided by a principal contractor. This raises questions about who is responsible for carrying out inspections.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Inspection Responsibility for Hired Towers</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>The employer using the tower</strong> is responsible for ensuring inspections are carried out — not the hire company, unless the hire agreement specifically states otherwise.</li>
                  <li><strong>The principal contractor</strong> on a CDM project has overarching responsibility for managing work at height and should ensure a system is in place for all towers on site.</li>
                  <li><strong>The hire company</strong> is responsible for providing equipment that is fit for purpose and properly maintained, but the on-site inspection obligation rests with the user.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Multi-Employer Considerations</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Shared towers</strong> — If multiple employers use the same tower, they must agree who is responsible for inspections. This should be documented in writing before the tower is erected.</li>
                  <li><strong>Subcontractor towers</strong> — If a subcontractor brings their own tower to site, the principal contractor should verify that inspections are being carried out to the required standard.</li>
                  <li><strong>Inspection records access</strong> — All employers whose workers use a tower should have access to the inspection records for that tower. Records should be kept at the tower location or in a central accessible file.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Inspection Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Inspection Outcomes and Actions
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The outcome of a formal inspection falls into one of three categories, each requiring a different response:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-400 font-semibold text-sm mb-2">Safe to Use</p>
                  <p className="text-xs text-white">
                    No defects identified. Tower may continue in use. Record the inspection and schedule the next one within 7 days.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="text-orange-400 font-semibold text-sm mb-2">Minor Defects</p>
                  <p className="text-xs text-white">
                    Defects identified that do not immediately compromise safety but require attention. Record defects, schedule repairs, and reinspect after remedial work.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-semibold text-sm mb-2">Unsafe — Do Not Use</p>
                  <p className="text-xs text-white">
                    Serious defects that compromise safety. Tower must be taken out of service immediately, tagged "DO NOT USE", and either repaired by a competent person or dismantled.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Acting on Findings</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Immediate action</strong> — Serious defects must be addressed before the tower is used. This may mean replacing components, dismantling the tower, or restricting access.</li>
                  <li><strong>Notification</strong> — Inform the site supervisor, principal contractor, and tower owner of any defects found. If the tower is hired, notify the hire company.</li>
                  <li><strong>Follow-up</strong> — Ensure that any remedial work is carried out by a competent person and that the tower is reinspected before returning to service.</li>
                  <li><strong>Record</strong> — All actions taken must be recorded on the inspection report or as an addendum.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Consequences of Non-Compliance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Consequences of Non-Compliance
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Failure to carry out formal inspections or maintain adequate records is a <strong>criminal offence</strong> under the Work at Height Regulations. The consequences can be severe, even if no accident has occurred.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-semibold text-sm mb-2">Enforcement Action</p>
                  <ul className="text-xs text-white space-y-1">
                    <li>Improvement notice requiring inspections to be implemented</li>
                    <li>Prohibition notice stopping all tower use until compliance is achieved</li>
                    <li>Prosecution with unlimited fines in the Crown Court</li>
                    <li>Imprisonment for individuals in serious cases</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="text-orange-400 font-semibold text-sm mb-2">Business Impact</p>
                  <ul className="text-xs text-white space-y-1">
                    <li>Work stoppage while compliance is achieved — project delays and costs</li>
                    <li>Loss of principal contractor approval or removal from approved lists</li>
                    <li>Increased insurance premiums or policy exclusions</li>
                    <li>Reputational damage affecting future tender success</li>
                  </ul>
                </div>
              </div>

              <p>
                An HSE inspector does not need an accident to have occurred to take enforcement action. A routine site visit that reveals missing or inadequate inspection records is sufficient grounds for action.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Planning Your Inspections</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Create a tower register listing every tower on site with inspection due dates</li>
                <li>Set calendar reminders for 7-day inspection deadlines</li>
                <li>Ensure a competent person is available on every inspection due date</li>
                <li>Allow adequate time — a thorough inspection should not be rushed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Pitfalls</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Missing the 7-day deadline because weekends were not counted</li>
                <li>Failing to carry out an inspection after a stability-affecting event</li>
                <li>Using generic "tick and flick" checklists that do not capture findings properly</li>
                <li>Not retaining records for the required minimum period</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Inspect at the start of the shift on the due date, not at the end</li>
                <li>Use a standardised form (PASMA Tower Inspection Record or equivalent)</li>
                <li>Photograph any defects found as supporting evidence for the report</li>
                <li>Keep a copy of the inspection report at the tower base for easy reference</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Managing Multiple Towers on Site</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Create a tower register listing every tower with its inspection schedule</li>
                <li>Assign unique tag numbers to each tower for easy identification</li>
                <li>Stagger assembly dates where possible so inspections do not all fall on the same day</li>
                <li>Designate backup inspectors in case the primary competent person is unavailable</li>
                <li>Use colour-coded tags at the tower base: green (inspected), amber (due within 2 days), red (overdue)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Weather-Related Inspection Triggers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>After winds exceeding the manufacturer's maximum — typically 17 m/s (38 mph)</li>
                <li>After heavy rain or flooding that may have affected ground conditions</li>
                <li>After freezing conditions that may have caused ice formation on components</li>
                <li>After snow accumulation that may have overloaded the platform</li>
                <li>Always check the Met Office forecast before the start of each shift</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation Footer */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pre-Use Checks
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-4-section-3">
              Next: Defects & Component Care
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
