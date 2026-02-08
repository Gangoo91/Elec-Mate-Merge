import { ArrowLeft, FolderOpen, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum legal retention period for a Tower Inspection Record?",
    options: [
      "Until the end of the project",
      "1 month from the date of inspection",
      "3 months from the date of inspection",
      "12 months from the date of inspection",
    ],
    correctAnswer: 2,
    explanation:
      "Schedule 7 of the Work at Height Regulations 2005 requires inspection records to be kept for a minimum of 3 months from the date of the inspection. Many employers retain them for longer as good practice.",
  },
  {
    id: 2,
    question: "Which of the following must be recorded on a formal Tower Inspection Record?",
    options: [
      "The purchase price and age of the tower",
      "The name and address of the person for whom the inspection was carried out, plus findings and inspector details",
      "Only the date and a pass/fail result",
      "The names of all workers who have used the tower",
    ],
    correctAnswer: 1,
    explanation:
      "The prescribed content includes: name and address of the person for whom the inspection was carried out, location and description of equipment, date and time, details of any matters affecting safety, actions taken, further actions needed, and inspector details.",
  },
  {
    id: 3,
    question: "What is PASMA TowerSure?",
    options: [
      "A type of mobile access tower",
      "A digital inspection record app for recording and managing tower inspections",
      "A PASMA training course for tower inspectors",
      "A government database of tower accidents",
    ],
    correctAnswer: 1,
    explanation:
      "PASMA TowerSure is a digital inspection app that allows competent persons to create, store, and share Tower Inspection Records electronically. It produces reports that meet the prescribed legal requirements.",
  },
  {
    id: 4,
    question: "During a shift handover, what information about the tower must be communicated?",
    options: [
      "Only whether the tower is in use or not",
      "The tower's condition, any defects noted, last inspection date, and any limitations on use",
      "The purchase order number and hire company details",
      "Only information about the work being done from the tower",
    ],
    correctAnswer: 1,
    explanation:
      "Shift handover for towers must include the current condition of the tower, any defects noted or repaired, the date of the last inspection, any limitations on use (such as wind speed restrictions), and whether the tower is due for inspection.",
  },
  {
    id: 5,
    question: "A worker falls from a tower and breaks their arm. Under RIDDOR, who must report this?",
    options: [
      "The injured worker",
      "The hospital that treats the injury",
      "The responsible person (employer, self-employed person, or person in control of the premises)",
      "PASMA",
    ],
    correctAnswer: 2,
    explanation:
      "Under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013), the responsible person must report the incident. This is typically the employer, self-employed person, or person in control of the premises where the work was taking place.",
  },
  {
    id: 6,
    question: "What is the purpose of a site-specific tower register?",
    options: [
      "To record the names of all PASMA-trained workers on site",
      "To maintain a list of every tower on site with its location, configuration, inspection status, and responsible person",
      "To record the cost of tower hire",
      "To plan future tower purchases",
    ],
    correctAnswer: 1,
    explanation:
      "A tower register provides a complete record of every tower on site — its location, type, configuration, current inspection status, next inspection due date, and responsible person. This enables effective management of inspection schedules and compliance.",
  },
  {
    id: 7,
    question: "How long should training records for tower users be retained?",
    options: [
      "For the duration of the current project only",
      "Until the PASMA card expires",
      "For the duration of employment plus a reasonable period afterwards",
      "Training records do not need to be kept",
    ],
    correctAnswer: 2,
    explanation:
      "Training records should be retained for the duration of employment and for a reasonable period afterwards (typically 3-5 years). This provides evidence of competence and due diligence in the event of an investigation or claim.",
  },
  {
    id: 8,
    question: "Under RIDDOR, which of the following tower-related incidents must be reported?",
    options: [
      "A minor bruise from bumping into a tower frame",
      "A tower collapse, even if no one is injured",
      "A near miss that only one person saw",
      "A worker feeling dizzy at height but completing the task safely",
    ],
    correctAnswer: 1,
    explanation:
      "A tower collapse is a dangerous occurrence that must be reported under RIDDOR regardless of whether anyone was injured. Dangerous occurrences are events with the potential to cause serious harm, including the collapse or overturning of scaffolding.",
  },
];

const quickCheckQuestions = [
  {
    id: "retention-period",
    question:
      "An inspector carries out a formal tower inspection on 15 March. What is the earliest date the inspection record can legally be destroyed?",
    options: [
      "16 March (the day after)",
      "15 April (one month later)",
      "15 June (three months later)",
      "15 September (six months later)",
    ],
    correctIndex: 2,
    explanation:
      "The minimum retention period is 3 months from the date of the inspection. A record dated 15 March cannot be destroyed before 15 June. Many employers retain records for longer as best practice.",
  },
  {
    id: "handover-requirement",
    question:
      "You are finishing a shift and a new team is taking over work from the same tower. What is the correct handover procedure?",
    options: [
      "Leave the tower standing — the next team will check it themselves",
      "Send a text message to the incoming supervisor",
      "Provide a verbal and written handover covering the tower's condition, last inspection, and any defects or limitations",
      "Only hand over if the tower has defects",
    ],
    correctIndex: 2,
    explanation:
      "Every shift handover involving a tower should include both a verbal and written briefing. The incoming team needs to know the tower's current condition, when it was last inspected, whether any defects have been noted, and any restrictions on use.",
  },
  {
    id: "riddor-reporting",
    question:
      "A mobile access tower overturns on site during high winds overnight. No one was on or near the tower. Does this need to be reported under RIDDOR?",
    options: [
      "No — no one was injured so there is nothing to report",
      "No — it happened outside working hours",
      "Yes — the collapse or overturning of scaffolding is a dangerous occurrence reportable under RIDDOR",
      "Only if the tower was damaged beyond repair",
    ],
    correctIndex: 2,
    explanation:
      "The collapse or overturning of scaffolding (including mobile access towers) is classified as a 'dangerous occurrence' under RIDDOR and must be reported regardless of whether anyone was injured or whether it happened during working hours.",
  },
];

const faqs = [
  {
    question: "Are digital inspection records legally acceptable?",
    answer:
      "Yes. The Work at Height Regulations require a 'written report' but do not prescribe paper. Digital records created via apps such as PASMA TowerSure, or company-specific software, are fully acceptable provided they contain all the prescribed information and can be produced as a hard copy if requested by an HSE inspector. Digital records offer advantages including secure storage, easy sharing, and reduced risk of loss.",
  },
  {
    question: "Who is responsible for maintaining the tower register on a multi-contractor site?",
    answer:
      "On sites where the Construction (Design and Management) Regulations 2015 apply, the principal contractor is responsible for managing work at height and should maintain the tower register. In practice, this is often delegated to a site supervisor or scaffolding coordinator, but the principal contractor retains overall responsibility for ensuring all towers are properly inspected and documented.",
  },
  {
    question: "What happens if inspection records are lost or destroyed before the retention period expires?",
    answer:
      "Loss of inspection records is a compliance failure. If the HSE investigates and records cannot be produced, the employer cannot demonstrate that inspections were carried out. This is treated as a failure to inspect, which can result in enforcement action. Best practice is to keep both a physical copy at the tower location and a digital backup in a central system.",
  },
  {
    question: "Do I need to report a near miss involving a tower under RIDDOR?",
    answer:
      "Near misses are not reportable under RIDDOR unless they fall within the definition of a 'dangerous occurrence' — for example, the collapse or partial collapse of a tower. However, employers are strongly encouraged to record and investigate all near misses internally. A near miss is a warning that a serious incident could occur, and investigation can prevent future accidents.",
  },
];

export default function IpafModule4Section4() {
  useSEO({
    title: "Documentation & Record Keeping | Module 4 Section 4 | IPAF Mobile Scaffold",
    description:
      "Tower Inspection Records, retention periods, PASMA TowerSure, shift handovers, tower registers, training records, and RIDDOR reporting for mobile access towers.",
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
          <FolderOpen className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 4.4
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation & Record Keeping
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            Legal requirements for inspection records, digital tools, shift handovers, training documentation, and incident reporting
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
                <li><strong>Inspection records:</strong> Legal requirement (WAHR Sch 7)</li>
                <li><strong>Retain for:</strong> Minimum 3 months</li>
                <li><strong>Written within:</strong> 24 hours of inspection</li>
                <li><strong>RIDDOR:</strong> Report collapses even if no injury</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
              <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li><strong>Tower register:</strong> List every tower, track inspections</li>
                <li><strong>Handover:</strong> Verbal + written at every shift change</li>
                <li><strong>Digital records:</strong> PASMA TowerSure or equivalent</li>
                <li><strong>Training:</strong> Keep PASMA cards and records current</li>
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
              "Explain the legal requirements for Tower Inspection Records",
              "List the prescribed content of a formal inspection report",
              "State the minimum retention periods for different record types",
              "Describe the PASMA TowerSure digital inspection system",
              "Explain correct shift handover procedures for towers",
              "Identify RIDDOR-reportable tower-related incidents",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 03: Tower Inspection Records — Legal Requirement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Tower Inspection Records — Legal Requirement
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Work at Height Regulations 2005, Schedule 7</strong> requires that every formal inspection of work equipment for work at height is recorded in a written report. This is not optional — it is a statutory obligation enforced by the HSE.
              </p>
              <p>
                The purpose of the Tower Inspection Record is to provide <strong>documented evidence</strong> that inspections have been carried out by a competent person, that findings have been recorded, and that appropriate action has been taken on any defects identified.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Why Records Matter</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Legal compliance</strong> — Demonstrates compliance with the Work at Height Regulations. Without records, you cannot prove inspections were carried out.</li>
                  <li><strong>Audit trail</strong> — Creates a history of the tower's condition over time. Patterns of recurring defects can be identified and addressed.</li>
                  <li><strong>Defence in proceedings</strong> — If an incident occurs, inspection records can demonstrate due diligence and reasonable steps taken to ensure safety.</li>
                  <li><strong>Continuity</strong> — Allows incoming inspectors to see what was found previously and track the progress of remedial actions.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Key Point</p>
                    <p className="text-sm text-white">
                      If an HSE inspector asks to see your Tower Inspection Records and they do not exist, are incomplete, or cannot be produced, this is treated as <strong>failure to comply with the regulations</strong> — regardless of whether the tower was actually inspected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: What to Record */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            What to Record
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Schedule 7 prescribes specific information that <strong>must</strong> be included in every Tower Inspection Record. A generic "Tower OK" note does not meet the requirements.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Prescribed Content</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Client details</strong> — Name and address of the person for whom the inspection was carried out (the employer, principal contractor, or site occupier).</li>
                  <li><strong>Equipment identification</strong> — Location and description of the work equipment: tower manufacturer, model/type, serial number or unique site identifier, configuration (height, number of platforms, stabiliser arrangement).</li>
                  <li><strong>Date and time</strong> — The date and time at which the inspection was carried out. Not "week commencing" — the actual date.</li>
                  <li><strong>Findings</strong> — Details of any matter identified that could give rise to a risk to the health or safety of any person. This includes defects found, environmental concerns, and conditions that may deteriorate.</li>
                  <li><strong>Actions taken</strong> — Details of any action taken as a result of findings, such as components replaced, tower taken out of service, or restrictions on use imposed.</li>
                  <li><strong>Further action needed</strong> — Details of any further action considered necessary, such as monitoring a specific component, scheduling replacement parts, or bringing forward the next inspection.</li>
                  <li><strong>Inspector details</strong> — Name and position of the person carrying out the inspection, including their employer's details and a signature (physical or electronic).</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Common Recording Errors</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Vague findings</strong> — "Tower looks OK" or "No issues" without specific confirmation of what was checked. The report should confirm what was inspected even if no defects were found.</li>
                  <li><strong>Missing dates</strong> — Undated records are worthless for demonstrating compliance with the 7-day cycle.</li>
                  <li><strong>No inspector identification</strong> — The report must identify who carried out the inspection. An unsigned, anonymous report has no evidential value.</li>
                  <li><strong>No equipment identification</strong> — "Tower on level 3" is insufficient. The specific tower must be identifiable — include model, serial number, or site tag number.</li>
                  <li><strong>Actions not recorded</strong> — Finding a defect but not recording what was done about it suggests the defect was ignored.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Retention Periods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Retention Periods
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Different types of tower-related documentation have different retention requirements. Understanding these is essential for compliance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Statutory Retention Periods</p>
                <div className="space-y-3">
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">Tower Inspection Records (formal inspections)</span>
                    <span className="text-elec-yellow font-semibold">Min. 3 months</span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">Tower register / equipment log</span>
                    <span className="text-elec-yellow font-semibold">Until next inspection</span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">Risk assessments for tower work</span>
                    <span className="text-elec-yellow font-semibold">Duration of work + review</span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">RIDDOR reports</span>
                    <span className="text-elec-yellow font-semibold">Min. 3 years</span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">Training records (PASMA cards, etc.)</span>
                    <span className="text-elec-yellow font-semibold">Employment + 3-5 years</span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">Accident/incident records</span>
                    <span className="text-elec-yellow font-semibold">Min. 3 years</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Best Practice Retention</p>
                <p className="text-sm text-white mb-2">
                  While the statutory minimum for inspection records is 3 months, many employers and industry bodies recommend longer retention:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>6-12 months</strong> — Allows review of inspection history across a full project lifecycle.</li>
                  <li><strong>Duration of hire</strong> — If the tower is hired, keep all records until it is returned and the hire company has confirmed receipt.</li>
                  <li><strong>Civil liability period</strong> — Personal injury claims can be made up to 3 years after an incident. Retaining records for 3+ years provides protection.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: PASMA TowerSure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            PASMA TowerSure
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>PASMA TowerSure</strong> is a digital inspection record system developed by the Prefabricated Access Suppliers' and Manufacturers' Association. It provides a standardised, legally compliant method for recording tower inspections electronically.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Key Features</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Mobile app</strong> — Available on iOS and Android. Inspections can be recorded on site using a smartphone or tablet, even without an internet connection (syncs when connectivity is available).</li>
                  <li><strong>Guided inspection</strong> — The app guides the inspector through a structured checklist covering all required inspection points, reducing the risk of missed items.</li>
                  <li><strong>Photo evidence</strong> — Allows photographs of defects, tower configuration, and site conditions to be attached to the inspection record.</li>
                  <li><strong>GPS location</strong> — Automatically records the geographic location of the tower at the time of inspection.</li>
                  <li><strong>Automatic reminders</strong> — Alerts when the 7-day inspection interval is approaching, helping to prevent missed deadlines.</li>
                  <li><strong>Cloud storage</strong> — Records are stored securely in the cloud with automatic backup, reducing the risk of records being lost or damaged.</li>
                  <li><strong>Report generation</strong> — Produces PDF reports that meet Schedule 7 requirements and can be emailed, printed, or shared with principal contractors.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Alternatives to TowerSure</p>
                <p className="text-sm text-white mb-2">
                  PASMA TowerSure is not the only option. Other acceptable methods include:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>PASMA paper Tower Inspection Record pads</strong> — Triplicate pads with all prescribed fields. One copy at the tower, one for the employer, one for the file.</li>
                  <li><strong>Manufacturer-specific inspection forms</strong> — Some tower manufacturers provide their own inspection documentation.</li>
                  <li><strong>Company bespoke systems</strong> — Large contractors often have their own digital inspection platforms integrated with their site management systems.</li>
                  <li><strong>Generic inspection apps</strong> — Apps like iAuditor, Procore, or Site Diary can be configured with tower inspection templates.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Handover Procedures Between Shifts */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Handover Procedures Between Shifts
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On sites where multiple shifts use the same tower, a clear <strong>handover procedure</strong> is essential to ensure continuity of safety management. The incoming shift must be fully informed about the tower's current status.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Handover Content</p>
                <p className="text-sm text-white mb-2">
                  Every shift handover involving a tower should communicate the following information, both <strong>verbally and in writing</strong>:
                </p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Current condition</strong> — Is the tower in good condition? Have any defects been noted during the shift?</li>
                  <li><strong>Last inspection date</strong> — When was the tower last formally inspected? When is the next inspection due?</li>
                  <li><strong>Defects and repairs</strong> — Were any defects found and repaired during the shift? What components were affected?</li>
                  <li><strong>Limitations on use</strong> — Are there any restrictions? For example: maximum number of persons, wind speed limits approached, particular areas of concern.</li>
                  <li><strong>Environmental changes</strong> — Has the weather changed? Have ground conditions deteriorated? Have new hazards appeared nearby?</li>
                  <li><strong>Loading</strong> — What tools, materials, or equipment are currently on the platform? Is the tower close to its safe working load?</li>
                  <li><strong>Planned changes</strong> — Is the tower due to be moved, altered, or dismantled? Is any work scheduled that might affect the tower?</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Written Handover Record</p>
                <p className="text-sm text-white mb-2">
                  A written handover record does not need to be complex. A simple log at the tower base or in the site diary should include:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Date and time of handover</li>
                  <li>Name of outgoing and incoming responsible persons</li>
                  <li>Brief summary of tower condition</li>
                  <li>Any defects, actions, or concerns</li>
                  <li>Both parties' signatures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Site-Specific Tower Register */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Site-Specific Tower Register
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>tower register</strong> is a central document that lists every mobile access tower on site and tracks their inspection status. While not explicitly required by the regulations, it is considered <strong>industry best practice</strong> and is often required by principal contractors.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">What to Include in the Register</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Tower identifier</strong> — Unique tag number, serial number, or site reference for each tower.</li>
                  <li><strong>Manufacturer and model</strong> — The make and model of each tower system.</li>
                  <li><strong>Location</strong> — Current position on site (building, floor, grid reference).</li>
                  <li><strong>Configuration</strong> — Platform height, number of platforms, stabiliser arrangement, base dimensions.</li>
                  <li><strong>Date of assembly</strong> — When the tower was erected and by whom.</li>
                  <li><strong>Last inspection date</strong> — Date of the most recent formal inspection.</li>
                  <li><strong>Next inspection due</strong> — The date by which the next 7-day inspection must take place.</li>
                  <li><strong>Responsible person</strong> — The name of the person or company responsible for the tower.</li>
                  <li><strong>Current status</strong> — In use, out of service, due for dismantling, etc.</li>
                </ul>
              </div>

              <p>
                The register should be reviewed and updated daily. On large sites with multiple towers, a colour-coded status system (green = inspected, amber = inspection due within 2 days, red = overdue) can provide an at-a-glance overview.
              </p>
            </div>
          </div>
        </section>

        {/* Section 09: Manufacturer's Logbook */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Manufacturer's Logbook
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many tower manufacturers supply a <strong>logbook or maintenance record booklet</strong> with their products. This document should remain with the tower throughout its working life and provides a complete history of inspections, defects, repairs, and component replacements.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">What the Logbook Should Contain</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Tower identification</strong> — Manufacturer, model, serial number, date of manufacture, and original specification.</li>
                  <li><strong>Inspection history</strong> — A chronological record of every formal inspection, with dates, findings, and inspector details.</li>
                  <li><strong>Defect history</strong> — Details of every defect found, when it was found, what action was taken, and who authorised the action.</li>
                  <li><strong>Component replacements</strong> — A record of every component that has been replaced, including the reason, the date, and the replacement part number.</li>
                  <li><strong>Repairs</strong> — Details of any manufacturer-authorised repairs, including the repair method, date, and confirmation of fitness for continued use.</li>
                  <li><strong>Ownership history</strong> — If the tower has changed hands, the logbook should record previous owners and any relevant information about how the tower was used and maintained.</li>
                </ul>
              </div>

              <p>
                The logbook is particularly valuable when towers are <strong>hired out</strong>. The hire company can review the logbook on return to identify whether the tower was properly cared for during the hire period. Damage not recorded in the logbook may indicate unreported incidents.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: Training Records */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Training Records
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Employers must ensure that anyone who assembles, uses, inspects, or dismantles a mobile access tower is <strong>competent to do so</strong>. Training records provide the evidence of this competence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">What Training Records Should Include</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>PASMA card details</strong> — Card number, date of issue, expiry date, course type (Towers for Users, Work at Height Essentials, Combined Low Level Access, etc.).</li>
                  <li><strong>Course attendance records</strong> — Certificates or records of attendance for tower-specific training courses.</li>
                  <li><strong>Refresher training</strong> — Evidence of refresher training, which PASMA recommends every 5 years (though many employers require more frequent updates).</li>
                  <li><strong>Toolbox talks</strong> — Records of tower-related toolbox talks attended, including date, topic, and presenter.</li>
                  <li><strong>Competence assessments</strong> — Records of practical assessments demonstrating the individual can safely assemble, use, and dismantle the specific tower systems on site.</li>
                  <li><strong>CPD activity</strong> — Evidence of continuing professional development related to work at height and tower safety.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Retention and Verification</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Duration of employment</strong> — Training records should be retained for the full period of employment plus a reasonable period afterwards (typically 3-5 years).</li>
                  <li><strong>Verification on site</strong> — Principal contractors may require all tower users to present their PASMA card before being permitted to use towers on site. Keep a record of card checks in the site induction register.</li>
                  <li><strong>Expiry monitoring</strong> — Set up reminders for PASMA card expiry dates so refresher training can be booked in advance. Allowing a card to expire means the individual is no longer demonstrably competent.</li>
                  <li><strong>Subcontractor records</strong> — When subcontractors bring their own tower users to site, request copies of their training records and PASMA cards before they start work.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 11: Document Control and Accessibility */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Document Control and Accessibility
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Having the right records is only useful if they can be <strong>found, read, and produced when needed</strong>. Poor document control can turn compliant inspection practices into non-compliance simply because evidence cannot be located.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Storage and Access</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>At the tower</strong> — Keep the most recent inspection record at the tower base, protected in a weatherproof wallet or holder. This allows anyone approaching the tower to immediately see its inspection status.</li>
                  <li><strong>Central file</strong> — Keep copies of all inspection records in a central site file, organised by tower identifier and date. This file should be accessible to the site manager, principal contractor, and HSE inspectors.</li>
                  <li><strong>Digital backup</strong> — If using paper records, scan or photograph them and store digitally. Paper records can be damaged by water, wind, or general site conditions.</li>
                  <li><strong>Off-site backup</strong> — For critical records (RIDDOR reports, incident investigations), maintain an off-site backup copy with the employer's head office or in cloud storage.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Producing Records for Inspectors</p>
                <p className="text-sm text-white">
                  An HSE inspector can request to see tower inspection records at any time during a site visit. You should be able to produce records <strong>within minutes, not hours or days</strong>. If records are stored digitally, ensure that the device or system is accessible on site and that the responsible person knows how to retrieve and display or print the records. An inability to produce records promptly may be treated as non-compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Accident and Incident Reporting — RIDDOR */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">12</span>
            Accident and Incident Reporting — RIDDOR
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR)</strong> require certain tower-related incidents to be reported to the HSE. Failure to report a RIDDOR-notifiable event is a criminal offence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">What Must Be Reported</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Fatal injuries</strong> — Any death resulting from a tower-related incident must be reported immediately by the quickest practicable means (usually telephone), followed by written notification within 10 days.</li>
                  <li><strong>Specified injuries</strong> — Fractures (other than fingers/thumbs/toes), amputations, crush injuries, dislocations of major joints, serious burns, loss of consciousness, and injuries requiring hospital admission for more than 24 hours.</li>
                  <li><strong>Over-7-day incapacitation</strong> — If a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident) as a result of a tower-related incident.</li>
                  <li><strong>Dangerous occurrences</strong> — The <strong className="text-elec-yellow">collapse or partial collapse</strong> of scaffolding (including mobile access towers) more than 5 metres high, OR any scaffold from which a person could fall more than 2 metres.</li>
                  <li><strong>Non-worker injuries</strong> — If a member of the public is injured by a tower-related incident and is taken to hospital for treatment.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">How to Report</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Online</strong> — Via the HSE RIDDOR reporting website at www.hse.gov.uk/riddor. This is the preferred method for most incidents.</li>
                  <li><strong>Telephone</strong> — Fatal and specified injuries should be reported by telephone immediately on 0345 300 9923.</li>
                  <li><strong>Timescales</strong> — Fatal/specified injuries: immediately by phone, then written within 10 days. Over-7-day injuries: within 15 days. Dangerous occurrences: immediately by phone, then written within 10 days.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Remember</p>
                    <p className="text-sm text-white">
                      A tower collapse is a <strong>dangerous occurrence</strong> reportable under RIDDOR <strong>even if no one is injured</strong>. The overturning of an unoccupied tower during high winds overnight, for example, must still be reported because it had the potential to cause serious harm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 13: Internal Accident Investigation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">13</span>
            Internal Accident Investigation
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond RIDDOR reporting, employers should conduct <strong>internal investigations</strong> of all tower-related incidents, including near misses. The purpose is to identify root causes and implement measures to prevent recurrence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Investigation Documentation Should Include</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Date, time, and location</strong> of the incident.</li>
                  <li><strong>Description of events</strong> — What happened, in what sequence, and who was involved.</li>
                  <li><strong>Tower details</strong> — Type, configuration, last inspection date, and condition at the time of the incident.</li>
                  <li><strong>Contributing factors</strong> — Weather, ground conditions, training levels, supervision, equipment condition.</li>
                  <li><strong>Root cause analysis</strong> — Underlying reasons for the incident, not just the immediate trigger.</li>
                  <li><strong>Corrective actions</strong> — Specific measures to be implemented, with responsibilities and deadlines.</li>
                  <li><strong>Photographs and witness statements</strong> — Taken at the scene as soon as possible after the incident.</li>
                </ul>
              </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Setting Up a Documentation System</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Choose a recording method (digital or paper) and standardise across the site</li>
                <li>Create a tower register template before the first tower arrives on site</li>
                <li>Train all inspectors in how to complete inspection records correctly</li>
                <li>Designate a single point of contact for managing tower documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Documentation Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Completing inspection records retrospectively (filling in forms days later from memory)</li>
                <li>Keeping records only in one location with no backup</li>
                <li>Failing to update the tower register when towers are moved, altered, or removed</li>
                <li>Not recording "nil defects" — the record should still confirm what was checked</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">HSE Inspector Visits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Be able to produce all tower inspection records on demand</li>
                <li>Keep the tower register up to date and accessible at all times</li>
                <li>Ensure the competent person who carried out the inspection can be identified</li>
                <li>Have copies of PASMA cards or training records available for all tower users</li>
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
            <Link to="../ipaf-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Defects & Component Care
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
