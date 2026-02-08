import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Camera, Database, Users, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-schedule5-fields",
    question: "Which of the following is NOT a mandatory field in a Schedule 5 inspection record?",
    options: [
      "Name and position of the person carrying out the inspection",
      "The manufacturer's serial number of every component",
      "Date and time of the inspection",
      "Details of any matter identified that could give rise to risk"
    ],
    correctIndex: 1,
    explanation: "Schedule 5 requires the inspector's name and position, date and time, location and description, matters giving rise to risk, actions taken, further actions needed, and the name/address of the person for whom the inspection was done. It does not require individual serial numbers of every component."
  },
  {
    id: "pasma-digital-legal",
    question: "Are digital inspection records legally acceptable under the Work at Height Regulations?",
    options: [
      "No, only handwritten paper records are accepted by the HSE",
      "Yes, provided they can be produced in a readable format when requested",
      "Only if they are printed out within 24 hours of the inspection",
      "Only if they are stored on a government-approved system"
    ],
    correctIndex: 1,
    explanation: "Digital records are fully acceptable under the Regulations, provided they can be produced in a readable format when requested by the HSE or another enforcing authority. There is no requirement for a specific system or for records to be printed."
  },
  {
    id: "pasma-common-failure",
    question: "Which of the following is the most commonly identified documentation failure on site?",
    options: [
      "Using the wrong colour ink",
      "Missing signatures or unsigned records",
      "Records printed on A3 instead of A4 paper",
      "Records stored in a ring binder rather than a folder"
    ],
    correctIndex: 1,
    explanation: "Missing signatures are consistently the most commonly identified documentation failure. An unsigned inspection record has no legal value because it cannot be attributed to a specific competent person. All records must be signed by the inspector."
  }
];

const faqs = [
  {
    question: "What exactly must a Schedule 5 inspection record contain?",
    answer: "The record must include: (1) the name and address of the person for whom the inspection was carried out, (2) the location and description of the scaffold, (3) the date and time of the inspection, (4) details of any matter identified that could give rise to risk, (5) details of any action taken as a result, (6) details of any further action considered necessary, and (7) the name and position of the person carrying out the inspection."
  },
  {
    question: "Can I use a generic checklist form instead of the PASMA inspection checklist?",
    answer: "Yes, any form can be used provided it captures all the information required by Schedule 5. However, the PASMA inspection checklist is specifically designed for mobile scaffold towers and covers additional items that a generic form may miss. Using a tower-specific form reduces the risk of omitting important checks and demonstrates a thorough approach to compliance."
  },
  {
    question: "Do I need to take photographs at every inspection?",
    answer: "Photographs are not legally required by Schedule 5. However, they are strongly recommended as best practice. Time-stamped photographs provide objective evidence of the tower's condition at the time of inspection and can be invaluable in the event of a dispute, incident investigation, or HSE enquiry. Many digital inspection tools include built-in camera functionality for this reason."
  },
  {
    question: "Who needs access to tower inspection records on site?",
    answer: "The primary people who need access are: the site manager or principal contractor responsible for safety, any HSE inspector who visits the site, the client or building owner if they request them, and the competent person carrying out subsequent inspections (to review previous findings). Records must be readily available — keeping them locked in an office where no one can access them defeats the purpose."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How many mandatory data fields does Schedule 5 require in an inspection record?",
    options: ["4 fields", "5 fields", "7 fields", "10 fields"],
    correctAnswer: 2,
    explanation: "Schedule 5 requires 7 specific data fields: (1) name/address of person for whom inspection was done, (2) location/description, (3) date/time, (4) matters giving rise to risk, (5) actions taken, (6) further actions needed, (7) inspector's name and position."
  },
  {
    id: 2,
    question: "What additional information does the PASMA inspection checklist capture beyond the Schedule 5 minimum?",
    options: [
      "The colour of the tower components",
      "Tower-specific checks such as castor condition, stabiliser deployment, and platform latch function",
      "The inspector's home address and telephone number",
      "The weather forecast for the following week"
    ],
    correctAnswer: 1,
    explanation: "The PASMA checklist is designed specifically for mobile towers and includes detailed checks for castors, stabilisers, platform latches, bracing, and other tower-specific items that a generic Schedule 5 form would not prompt the inspector to examine."
  },
  {
    id: 3,
    question: "When taking photographic evidence of an inspection, which of the following is most important?",
    options: [
      "Using a professional DSLR camera",
      "Ensuring images are time-stamped and clearly show the tower's condition and location",
      "Taking at least 50 photographs per inspection",
      "Using black and white photography for clarity"
    ],
    correctAnswer: 1,
    explanation: "The key requirement for inspection photographs is that they are time-stamped (proving when they were taken) and clearly show the tower's condition and location. A smartphone camera is perfectly adequate — the content and metadata matter more than the equipment."
  },
  {
    id: 4,
    question: "What is one key advantage of digital inspection records over paper records?",
    options: [
      "They are more expensive to produce",
      "They cannot be time-stamped",
      "They are searchable, shareable, and automatically backed up",
      "They are only valid for 30 days"
    ],
    correctAnswer: 2,
    explanation: "Digital records offer significant advantages: they are searchable (find any inspection instantly), shareable (send to a client or HSE inspector immediately), automatically backed up (no risk of loss from fire, water, or theft), and time-stamped (preventing backdating)."
  },
  {
    id: 5,
    question: "Under which circumstances can the HSE request to see tower inspection records?",
    options: [
      "Only during a formal site audit announced 28 days in advance",
      "Only after a reportable accident has occurred",
      "At any time, without prior notice",
      "Only with a court order"
    ],
    correctAnswer: 2,
    explanation: "HSE inspectors can request to see inspection records at any time, without prior notice. They have the power to enter any workplace at any reasonable time and examine any documents relevant to health and safety. Records must be readily available."
  },
  {
    id: 6,
    question: "How should tower inspection records integrate with wider site safety documentation?",
    options: [
      "They should be kept completely separate from all other records",
      "They should be cross-referenced with the construction phase plan, method statements, and risk assessments",
      "They should only be shared with the tower manufacturer",
      "They should be destroyed once the method statement is approved"
    ],
    correctAnswer: 1,
    explanation: "Tower inspection records should be integrated with the wider site safety documentation system, cross-referenced with the construction phase plan, method statements, and risk assessments. This creates a complete picture of how tower safety is managed on the project."
  },
  {
    id: 7,
    question: "Which of the following is a common documentation failure that could invalidate an inspection record?",
    options: [
      "Using blue ink instead of black ink",
      "Missing signature of the person who carried out the inspection",
      "Recording the inspection on a Tuesday instead of a Monday",
      "Using a checklist form that is slightly different from the PASMA template"
    ],
    correctAnswer: 1,
    explanation: "A missing signature means the record cannot be attributed to a specific competent person and has no legal value. The ink colour and exact day are not relevant, and any form that captures the Schedule 5 information is acceptable."
  },
  {
    id: 8,
    question: "What should happen to inspection records when a project is handed over to the client?",
    options: [
      "All records should be destroyed for data protection reasons",
      "Records should be included in the handover documentation and retained for at least 3 months after completion",
      "Records should be sent to the HSE for their archives",
      "Records only need to be kept if the client specifically requests them"
    ],
    correctAnswer: 1,
    explanation: "Inspection records should form part of the project handover documentation. They must be retained for a minimum of 3 months after completion (legal requirement) and should ideally be kept longer as evidence of compliance throughout the project."
  }
];

export default function PasmaModule5Section3() {
  useSEO({
    title: "Records & Documentation | PASMA Module 5.3",
    description: "Schedule 5 inspection records, PASMA checklists, photographic evidence, digital vs paper records, access requirements, site system integration, and common documentation failures.",
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
            <Link to="../pasma-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <FileText className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Records &amp; Documentation
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            What must be recorded, how to record it correctly, where to store it, and the common failures that leave organisations exposed to enforcement action
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Schedule 5:</strong> 7 mandatory data fields in every inspection record</li>
              <li><strong>Format:</strong> Paper or digital &mdash; both legally acceptable</li>
              <li><strong>Access:</strong> Records must be on site and available at all times</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Have blank forms or digital app ready before inspection</li>
              <li><strong>During:</strong> Complete every field, sign, date, and add photos</li>
              <li><strong>After:</strong> Store on site, share with relevant parties, schedule next review</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "List all 7 mandatory fields in a Schedule 5 inspection record",
              "Complete a PASMA inspection checklist correctly and thoroughly",
              "Explain when and how to use photographic evidence effectively",
              "Compare the advantages and legal standing of digital vs paper records",
              "Identify who needs access to inspection records and when",
              "Recognise common documentation failures and how to avoid them"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Schedule 5 Record Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Schedule 5 Record Requirements
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Schedule 5 of the Work at Height Regulations 2005 prescribes exactly what information must
                be included in every formal inspection record. There are seven mandatory fields. Omitting
                any one of them renders the record incomplete and potentially non-compliant.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">The 7 Mandatory Record Fields</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Name &amp; Address</p>
                      <p className="text-sm text-white/80">The name and address of the person for whom the inspection was carried out. This is typically the employer, principal contractor, or site controller &mdash; not the inspector themselves.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">Location &amp; Description</p>
                      <p className="text-sm text-white/80">The location of the scaffold and a description sufficient to identify it. Include site name, specific position (e.g. &ldquo;north elevation, bay 3&rdquo;), tower type, and height.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">Date &amp; Time</p>
                      <p className="text-sm text-white/80">The date and time the inspection was carried out. This establishes the 7-day interval start point and proves the inspection occurred before the tower was used.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-white">Matters Giving Rise to Risk</p>
                      <p className="text-sm text-white/80">Details of any matter identified during the inspection that could give rise to a risk to the health or safety of any person. If nothing was found, record &ldquo;no defects identified.&rdquo;</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-sm font-medium text-white">Actions Taken</p>
                      <p className="text-sm text-white/80">Details of any action taken as a result of the matters identified. For example: &ldquo;Damaged brace replaced with new component from stock&rdquo; or &ldquo;Tower taken out of service pending repair.&rdquo;</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-sm font-medium text-white">Further Actions Needed</p>
                      <p className="text-sm text-white/80">Details of any further action considered necessary that has not yet been completed. This creates a follow-up obligation and audit trail.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">7</span>
                    <div>
                      <p className="text-sm font-medium text-white">Inspector&rsquo;s Name &amp; Position</p>
                      <p className="text-sm text-white/80">The name and position of the person who carried out the inspection. This must be the actual inspector, not a supervisor who was not present. A signature is essential.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Every single field must be completed for every inspection. Leaving a field blank &mdash;
                even if &ldquo;nothing to report&rdquo; &mdash; creates an ambiguity that an HSE inspector
                will challenge. Best practice is to write &ldquo;None identified&rdquo; or &ldquo;N/A&rdquo;
                in any field where there is nothing adverse to record, confirming that the field was
                considered and not simply overlooked.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: PASMA Inspection Checklist */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PASMA Inspection Checklist
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PASMA publishes a recommended inspection checklist specifically designed for mobile scaffold
                towers. This checklist goes beyond the Schedule 5 minimum by prompting the inspector to check
                tower-specific items that a generic scaffold inspection form would not cover.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">What the PASMA Checklist Covers</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">All Schedule 5 mandatory fields</strong> &mdash; ensuring legal compliance from the outset</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Tower identification:</strong> Manufacturer, model, configuration, serial number (where available), and platform height</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Component-level checks:</strong> Individual tick boxes for frames, braces, platforms, guardrails, toeboards, mid-rails, castors, stabilisers, and adjustable legs</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Condition assessment:</strong> Pass/fail for each component with space for notes on specific defects</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Ground conditions:</strong> Specific prompts for ground firmness, levelness, sole boards, and proximity to excavations or slopes</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Environmental conditions:</strong> Wind speed, weather, overhead obstructions, and nearby hazards at the time of inspection</span></li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Completion Errors</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ticking all boxes as &ldquo;pass&rdquo; without physically checking each item (known as &ldquo;tick and flick&rdquo;)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Completing the form at the end of the day rather than during the actual inspection</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Using correction fluid (Tipp-Ex) instead of crossing through errors with a single line and initialling</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Leaving the signature or date fields blank</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Not recording the time of inspection (only the date)</span></li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The &ldquo;tick and flick&rdquo;
                  approach &mdash; where an inspector ticks every box as &ldquo;pass&rdquo; without actually
                  checking each component &mdash; is one of the most dangerous practices on site. It creates
                  a false record of compliance and may result in a defective tower being used. If an accident
                  occurs and the investigation reveals that the inspector did not physically check the items
                  they signed off, they face personal criminal liability under HSWA 1974 Section 7.
                </p>
              </div>

              <p>
                The PASMA checklist is available as a free download from the PASMA website and is also built
                into the TowerSure digital inspection app. Using it consistently ensures that every inspection
                follows the same structured process and that nothing is missed.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Photographic Evidence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Photographic Evidence
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Photographs are not a legal requirement under Schedule 5, but they are one of the most
                powerful tools available for demonstrating compliance, recording defects, and providing
                evidence in the event of an incident or dispute. A well-taken photograph can be worth
                more than a page of written description.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">When Photographs Add Value</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Before first use:</strong> Record the tower&rsquo;s condition, configuration, and location when initially erected</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Defect documentation:</strong> Close-up images of any defect found during inspection, showing the nature and extent of the damage</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">After rectification:</strong> Before and after photographs showing that a defect was identified and corrected</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Site conditions:</strong> Ground conditions, nearby hazards, exclusion zones, and the general environment around the tower</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Adverse events:</strong> Photographs taken immediately after a storm, impact, or other event that triggered an inspection</span></li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Taking Useful Inspection Photographs</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Time-stamp:</strong> Ensure your camera or phone has the correct date and time set. The metadata (EXIF data) in the image file provides an automatic, tamper-resistant timestamp.</p>
                  <p><strong className="text-white">Context shots:</strong> Take wide-angle shots showing the whole tower in its location, then close-ups of specific items. Without context, a close-up of a defect may be meaningless.</p>
                  <p><strong className="text-white">Lighting:</strong> Ensure adequate lighting so that details are visible. Use the phone&rsquo;s flash or torch function if inspecting in poor light.</p>
                  <p><strong className="text-white">Naming convention:</strong> Organise photographs by date and tower location. A consistent naming system (e.g. &ldquo;2025-01-15_Tower-NorthElev_Inspection&rdquo;) makes retrieval straightforward.</p>
                </div>
              </div>

              <p>
                Store photographs securely with the corresponding inspection record. If using a digital
                inspection system, photographs can be attached directly to the record. If using paper records,
                print key photographs and attach them, or store them electronically with a clear reference
                back to the paper form.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What NOT to Photograph</p>
                <p className="text-sm text-white/80">
                  Avoid photographs that include identifiable people without their consent, particularly
                  if the images may be shared externally. Focus on the tower, its components, and its
                  surroundings. If a person must be in the image for scale or context, ensure you have
                  their permission and that the image complies with your organisation&rsquo;s data
                  protection policies. Also avoid photographing security-sensitive areas or client-
                  confidential work unless specifically authorised.
                </p>
              </div>

              <p>
                A practical tip: before your first inspection on a new site, take a set of baseline
                photographs showing the tower in its fully erected, defect-free condition. These baseline
                images become a valuable reference for future inspections, making it easier to spot
                changes or deterioration over time. Store baseline images separately from routine
                inspection photographs so they are easy to locate.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Digital vs Paper Records */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Digital vs Paper Records
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations do not prescribe the format of inspection records. Both paper
                and digital records are legally acceptable, and each has advantages and disadvantages. The
                choice depends on the organisation&rsquo;s resources, the complexity of the project, and the
                preferences of the people using the system.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Digital Record Advantages</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Searchable &mdash; find any record instantly</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Shareable &mdash; send to clients, HSE, or colleagues in seconds</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Time-stamped &mdash; records cannot be backdated</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Backed up &mdash; cloud storage protects against loss</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Integrated &mdash; photos, notes, and checklists in one place</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Analytics &mdash; identify trends and recurring defects</span></li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Paper Record Advantages</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>No technology required &mdash; works anywhere</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Familiar to all operatives regardless of tech skills</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>No battery, connectivity, or device dependency</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Physical signature provides clear attribution</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Can be completed in extreme conditions (rain, dust)</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Low cost to implement</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Legal Standing</p>
                </div>
                <p className="text-sm text-white/80">
                  Both paper and digital records have equal legal standing under the Regulations. The HSE
                  accepts digital records provided they can be produced in a readable format when requested.
                  There is no requirement to print digital records unless the HSE specifically asks for a
                  hard copy. However, you must ensure that digital records are accessible &mdash; a record
                  stored in a cloud system that cannot be accessed on site due to poor signal is not
                  &ldquo;available&rdquo; in the way the Regulations require.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> If transitioning from paper to
                  digital, do not dispose of existing paper records. Maintain them for the required retention
                  period (minimum 3 months after work completion). Run both systems in parallel during the
                  transition to ensure no records are lost.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Access to Records */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Access to Records
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Inspection records are only useful if the right people can access them when they need to.
                Schedule 5 requires records to be kept on site during the work, but practical access goes
                beyond simply having them somewhere in a site office. Records must be readily accessible
                to those who need them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Who Needs Access?</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Site manager / principal contractor:</strong> Responsible for ensuring compliance across the site. Needs to verify that inspections are being carried out and recorded</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">HSE inspector:</strong> Can request records at any time without notice. Records must be producible quickly, not after a lengthy search</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Client / building owner:</strong> May require access as part of their contractual obligations or their own duty of care</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Competent person:</strong> The inspector carrying out subsequent inspections should review previous records to identify recurring issues or outstanding actions</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Insurance representative:</strong> In the event of a claim, the insurer may require access to all relevant inspection records</span></li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Consider data protection when
                  sharing records. Inspection records contain the names and positions of individuals, which
                  is personal data under the UK GDPR. Share records only with those who have a legitimate
                  need, and ensure that cloud-based systems have appropriate access controls and encryption.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Record Accessibility Checklist</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Are records stored in a known, consistent location (physical or digital)?</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Can an HSE inspector be shown records within 5 minutes of requesting them?</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Is there a designated person responsible for maintaining and locating records?</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Are digital records accessible offline or is a backup copy available on site?</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Are previous inspection findings available to the person carrying out the next inspection?</span></li>
                </ul>
              </div>

              <p>
                For digital records, cloud storage offers the advantage of access from anywhere with an
                internet connection. However, you must also have a contingency for situations where
                connectivity is unavailable &mdash; this might mean having a cached copy on the device or
                a printed backup of recent records kept on site.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Record Integration with Site Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Record Integration with Site Systems
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Tower inspection records do not exist in isolation. They are part of a broader site safety
                documentation system and should be cross-referenced with other project documents to create
                a complete picture of how tower safety is managed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Integration Points</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Construction phase plan:</strong> The plan should reference the tower inspection regime, including who is responsible, what intervals apply, and where records are stored</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Method statements:</strong> Method statements for tower work should specify the inspection requirements and reference the inspection forms being used</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Risk assessments:</strong> Tower-specific risk assessments should be cross-referenced with inspection findings. If an inspection identifies a recurring defect, the risk assessment should be updated</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Permit-to-work systems:</strong> Where permits are used, the tower inspection record should be referenced as a prerequisite for issuing the permit</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Handover documentation:</strong> When a project is completed, tower inspection records form part of the safety file and should be included in the handover pack</span></li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> On CDM 2015 notifiable projects,
                  the principal contractor is responsible for ensuring that all scaffold inspection records
                  (including mobile towers) are available on site and that the inspection regime is documented
                  in the construction phase plan. This is a duty that cannot be delegated to subcontractors,
                  even if they are the ones carrying out the inspections.
                </p>
              </div>

              <p>
                Integrating tower inspection records with the wider site system also makes it easier to
                demonstrate compliance during audits. When a client or HSE inspector asks about tower safety,
                you can present a coherent picture: the risk assessment identifies the hazards, the method
                statement describes the controls, the inspection records prove the controls are being
                implemented, and the construction phase plan ties everything together.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Multi-Contractor Sites</p>
                </div>
                <p className="text-sm text-white/80">
                  On sites where multiple contractors use mobile towers, the principal contractor must
                  establish a clear system for managing inspection records across all parties. This might
                  include a centralised inspection log, shared digital platform, or a requirement for each
                  contractor to submit copies of their inspection records to the principal contractor&rsquo;s
                  site office. Without a coordinated approach, gaps in coverage are almost inevitable.
                </p>
              </div>

              <p>
                Consider maintaining a simple register of all mobile towers on site, listing each tower&rsquo;s
                location, the contractor responsible for it, the date of last inspection, and the date the
                next inspection is due. This register can be displayed in the site office and updated daily,
                giving an at-a-glance view of compliance across the entire project.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Common Documentation Failures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Common Documentation Failures
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HSE consistently identifies the same documentation failures on site visits. These
                failures are almost always avoidable with basic training, a structured process, and
                attention to detail. Understanding the most common failures helps you avoid them.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">The Most Common Failures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Missing signatures:</strong> The single most common failure. An unsigned record cannot be attributed to a competent person and has no evidential value</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Incomplete descriptions:</strong> Vague entries such as &ldquo;tower OK&rdquo; or &ldquo;all fine&rdquo; do not meet the Schedule 5 requirement to record matters giving rise to risk</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Wrong or missing dates:</strong> Records without dates cannot prove when the inspection took place, making it impossible to verify the 7-day interval was met</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">No follow-up recorded:</strong> Defects identified but no record of what action was taken or what further action is needed</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Records not on site:</strong> Records kept in a head office or in a vehicle rather than being available on site where the tower is in use</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Out-of-date forms:</strong> Using old versions of inspection forms that do not capture all Schedule 5 requirements or current PASMA guidance</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Illegible handwriting:</strong> Paper records that cannot be read by anyone other than the person who wrote them. This is especially problematic if the inspector is not available to clarify</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Unsigned corrections:</strong> Amendments made with correction fluid rather than a single line through the error, dated and initialled</span></li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">How to Avoid These Failures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Use a structured checklist (PASMA or equivalent)</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Train all inspectors on correct form completion</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Review completed records before filing</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Switch to digital where possible (eliminates legibility and dating issues)</span></li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Consequences of Poor Records</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>HSE improvement or prohibition notice</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Fee for Intervention charges</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Weakened legal defence if an incident occurs</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Loss of client confidence and contract termination</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> A good inspection record should
                  tell the story of what was found, what was done about it, and what still needs to be done.
                  If someone who was not present at the inspection reads the record, they should be able to
                  understand exactly what condition the tower was in and whether it was safe to use. If they
                  cannot, the record is not fit for purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

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
          title="Section 3 Knowledge Check"
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
            <Link to="../pasma-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: 7-Day Inspections
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-5-section-4">
              Next: TowerSure App
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}