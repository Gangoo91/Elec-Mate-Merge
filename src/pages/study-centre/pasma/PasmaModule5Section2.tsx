import { ArrowLeft, Calendar, CheckCircle, AlertTriangle, Shield, Gavel, ClipboardList, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-schedule5-basis",
    question: "Which regulation mandates formal inspections for mobile scaffold towers?",
    options: [
      "PUWER 1998 Regulation 6",
      "WAHR 2005 Schedule 5",
      "CDM 2015 Regulation 13",
      "LOLER 1998 Regulation 9"
    ],
    correctIndex: 1,
    explanation: "Schedule 5 of the Work at Height Regulations 2005 mandates formal inspections for scaffolding, which includes mobile scaffold towers. It specifies when inspections must occur, what must be recorded, and how long records must be retained."
  },
  {
    id: "pasma-inspection-triggers",
    question: "Which of the following triggers a formal inspection requirement BEYOND the 7-day interval?",
    options: [
      "A change of operative working from the tower",
      "The tower being moved to a new position on the same site",
      "A tea break exceeding one hour",
      "A new subcontractor arriving on site"
    ],
    correctIndex: 1,
    explanation: "Relocating a tower to a new position counts as a change that could affect its stability and therefore triggers a formal inspection before the tower is used again in its new position. A change of operative alone does not trigger a formal inspection."
  },
  {
    id: "pasma-record-retention",
    question: "What is the minimum retention period for formal inspection records after work is completed?",
    options: [
      "1 month",
      "3 months",
      "6 months",
      "12 months"
    ],
    correctIndex: 1,
    explanation: "Inspection records must be kept on site until the work is completed and then retained for a minimum of 3 months. The HSE can request to see records at any time during this period, and failure to produce them is a criminal offence."
  }
];

const faqs = [
  {
    question: "Does the 7-day inspection interval start from the date of erection or the first day of use?",
    answer: "The 7-day interval runs from the date of the last inspection, not from the date of erection or first use. If a tower is inspected on Monday, the next inspection must be carried out no later than the following Monday. If the tower is not used for several days within that period, the 7-day clock still runs. The tower must still be inspected before it is used again if it has been left erected."
  },
  {
    question: "Can the same person who erected the tower carry out the formal inspection?",
    answer: "Yes, provided they are a competent person for the purpose of inspection. Competence for inspection requires sufficient training, knowledge, experience, and practical ability to identify defects and assess whether the tower is safe. In practice, a PASMA Towers for Users trained operative would typically have the necessary competence, though the legal requirement does not mandate any specific qualification."
  },
  {
    question: "What happens if the HSE visits and inspection records are not available on site?",
    answer: "Failure to have inspection records available on site while the tower is in use is a criminal offence under the Work at Height Regulations 2005. The HSE inspector may serve an improvement notice requiring records to be produced, or in more serious cases, a prohibition notice stopping all tower work immediately. Repeated or wilful non-compliance can lead to prosecution with unlimited fines."
  },
  {
    question: "Is a formal inspection required for a tower that is erected and dismantled within the same day?",
    answer: "A formal documented inspection is required before first use on site, regardless of how long the tower will remain erected. Even if the tower is erected in the morning and dismantled that afternoon, a Schedule 5 inspection must be carried out and recorded before anyone works from it. The 7-day interval only applies to towers that remain erected beyond the initial inspection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under which piece of legislation is the formal 7-day inspection requirement for mobile towers found?",
    options: [
      "Health and Safety at Work etc. Act 1974",
      "Provision and Use of Work Equipment Regulations 1998",
      "Work at Height Regulations 2005, Schedule 5",
      "Construction (Design and Management) Regulations 2015"
    ],
    correctAnswer: 2,
    explanation: "Schedule 5 of the Work at Height Regulations 2005 specifically sets out the inspection requirements for scaffolding, including mobile scaffold towers."
  },
  {
    id: 2,
    question: "Which of the following best describes a 'competent person' for the purpose of formal tower inspection?",
    options: [
      "Anyone who has worked in construction for more than 5 years",
      "A person with sufficient training, knowledge, experience, and practical ability",
      "Only a person holding a NEBOSH diploma",
      "Only a chartered structural engineer"
    ],
    correctAnswer: 1,
    explanation: "A competent person must have sufficient training, knowledge, experience, and practical ability to identify defects and assess tower safety. No specific qualification is mandated by law, though industry guidance recommends PASMA training as a minimum."
  },
  {
    id: 3,
    question: "A tower has been erected and inspected on a Monday. By which day must the next formal inspection take place?",
    options: [
      "The following Thursday (4 days)",
      "The following Friday (5 days)",
      "The following Monday (7 days)",
      "The following Wednesday (9 days)"
    ],
    correctAnswer: 2,
    explanation: "The inspection interval must not exceed 7 days. If the tower was inspected on Monday, the next inspection must be carried out no later than the following Monday."
  },
  {
    id: 4,
    question: "Which of the following events would NOT trigger a formal inspection requirement?",
    options: [
      "The tower being relocated to a new position on site",
      "A severe storm occurring overnight whilst the tower was left erected",
      "A different operative using the tower for the first time",
      "The tower being altered by adding an additional lift"
    ],
    correctAnswer: 2,
    explanation: "A change of operative does not trigger a formal inspection (though a pre-use check is still required). Relocation, adverse weather events, and alteration of the tower configuration all trigger mandatory formal inspections."
  },
  {
    id: 5,
    question: "How long must formal inspection records be retained after the work at that location is completed?",
    options: [
      "1 month",
      "3 months",
      "6 months",
      "12 months"
    ],
    correctAnswer: 1,
    explanation: "Schedule 5 requires that inspection records be kept on site until the work is completed, then retained for a minimum of 3 months after completion."
  },
  {
    id: 6,
    question: "What type of notice can the HSE serve to stop tower work immediately where there is a risk of serious injury?",
    options: [
      "Advisory notice",
      "Improvement notice",
      "Prohibition notice",
      "Warning letter"
    ],
    correctAnswer: 2,
    explanation: "A prohibition notice requires the activity to stop immediately (or not to start) where the inspector believes there is a risk of serious personal injury. An improvement notice allows time to remedy a breach but does not require immediate cessation."
  },
  {
    id: 7,
    question: "An improvement notice served by the HSE requires compliance within what minimum period?",
    options: [
      "24 hours",
      "7 days",
      "21 days",
      "3 months"
    ],
    correctAnswer: 2,
    explanation: "An improvement notice sets a deadline of at least 21 days for the duty holder to remedy the breach. The duty holder has the right to appeal to an employment tribunal within this 21-day period."
  },
  {
    id: 8,
    question: "Which of the following is an example of best practice that goes beyond the legal minimum for tower inspections?",
    options: [
      "Only inspecting the tower when the HSE visits the site",
      "Carrying out daily documented checks with photographic records",
      "Relying on the tower manufacturer to carry out all inspections",
      "Inspecting the tower every 14 days instead of every 7"
    ],
    correctAnswer: 1,
    explanation: "Daily documented checks with photographic records go beyond the legal minimum of 7-day formal inspections. This demonstrates a proactive approach to safety and provides an excellent audit trail for compliance purposes."
  }
];

export default function PasmaModule5Section2() {
  useSEO({
    title: "Formal 7-Day Inspections | PASMA Module 5.2",
    description: "WAHR Schedule 5 formal inspection requirements for mobile scaffold towers: legal basis, competent person, inspection triggers, retention, enforcement, and best practice.",
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
            <Calendar className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Formal 7-Day Inspections
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The legally mandated Schedule 5 inspection regime &mdash; who can inspect, what must be checked, when inspections are triggered, and the consequences of non-compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Law:</strong> WAHR 2005 Schedule 5 &mdash; criminal offence to breach</li>
              <li><strong>Interval:</strong> Every 7 days, plus before first use and after events</li>
              <li><strong>Records:</strong> On site during work, retained 3 months after</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Confirm competent person is available and scheduled</li>
              <li><strong>During:</strong> Systematic check of every component, record findings</li>
              <li><strong>After:</strong> Sign, date, and store record on site; schedule next inspection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the legal basis for formal tower inspections under Schedule 5",
              "Define who qualifies as a competent person for inspection",
              "List what the formal inspection must cover systematically",
              "Identify all triggers that require a formal inspection beyond the 7-day interval",
              "State the record retention requirements and consequences of non-compliance",
              "Describe best practice measures that exceed the legal minimum"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Legal Basis — WAHR Schedule 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Legal Basis &mdash; WAHR Schedule 5
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 (WAHR), Schedule 5, mandates formal inspections for all
                scaffolding used in the workplace, and this expressly includes mobile scaffold towers. The
                definition of &ldquo;scaffold&rdquo; within the Regulations is broad: it covers any
                temporarily provided structure from which persons work at height or which is used as a means
                of access to or egress from a place of work at height.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Non-compliance with Schedule 5
                  is a criminal offence. It is not simply a matter of best practice or industry guidance &mdash;
                  failure to carry out formal inspections, failure to record them, or failure to retain records
                  can all result in prosecution, unlimited fines, and in the most serious cases, imprisonment.
                </p>
              </div>

              <p>
                Schedule 5 sits alongside Regulation 12, which requires that all scaffolding (including towers)
                must not be used unless it has been inspected by a competent person. The two provisions work
                together: Regulation 12 imposes the duty to inspect, and Schedule 5 specifies the details of
                when, how, and what must be recorded.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Key Legal Definitions</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">&ldquo;Scaffold&rdquo;:</strong> Any temporarily provided structure on or from which persons perform work at height, or which is used as a means of access/egress &mdash; includes mobile towers, fixed scaffolding, and system scaffolding</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">&ldquo;Inspection&rdquo;:</strong> A visual and, where necessary, physical examination by a competent person to identify any defect or condition that could give rise to risk</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">&ldquo;Competent person&rdquo;:</strong> A person with sufficient training, knowledge, experience, and practical ability to carry out the inspection and identify relevant defects</span></li>
                </ul>
              </div>

              <p>
                The Regulations apply to all workplaces, not only construction sites. If a mobile tower is
                used in a warehouse, factory, school, hospital, or any other premises, Schedule 5 applies
                in full. There is no exemption based on the type of premises or the industry sector.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Competent Person Definition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Competent Person Definition
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations require that formal inspections are carried out by a
                &ldquo;competent person.&rdquo; The Regulations do not prescribe a specific qualification
                or certificate &mdash; instead, they define competence in terms of four attributes that the
                person must possess.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">The Four Pillars of Competence</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Sufficient Training</p>
                      <p className="text-sm text-white/80">Formal training in tower inspection, either through PASMA courses, manufacturer training, or equivalent programmes that cover the specific types of tower being inspected.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Sufficient Knowledge</p>
                      <p className="text-sm text-white/80">Understanding of the relevant legislation (WAHR 2005, Schedule 5), manufacturer&rsquo;s instructions, EN 1004 requirements, and the principles of tower stability and structural integrity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Sufficient Experience</p>
                      <p className="text-sm text-white/80">Practical, hands-on experience of assembling, using, and inspecting the type of tower in question. Theoretical knowledge alone is not sufficient.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Practical Ability</p>
                      <p className="text-sm text-white/80">The ability to physically carry out the inspection, including climbing the tower, testing components, and recognising defects through visual and tactile examination.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Industry Guidance on Competence</p>
                </div>
                <p className="text-sm text-white/80">
                  Although the law does not mandate a specific qualification, PASMA and the HSE recommend
                  that as a minimum the competent person should hold a PASMA Towers for Users certificate.
                  For complex tower configurations or towers used in high-risk environments, a higher level
                  of competence &mdash; such as PASMA Advance or manufacturer-specific training &mdash; may
                  be appropriate. The employer must assess the level of competence required based on the
                  complexity of the tower and the risks involved.
                </p>
              </div>

              <p>
                It is the employer&rsquo;s responsibility to ensure that the person they appoint to carry out
                formal inspections is genuinely competent. Simply nominating someone is not sufficient &mdash;
                the employer must be able to demonstrate, if challenged, that the appointed person meets all
                four competence criteria for the specific type of tower being inspected.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: What the Formal Inspection Covers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            What the Formal Inspection Covers
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A formal inspection is more thorough than a daily pre-use check. It is a systematic
                examination of every component of the tower, following the manufacturer&rsquo;s inspection
                protocol and covering all structural and safety-critical elements. The inspector must
                physically check each item, not simply give the tower a glance from ground level.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">Formal Inspection Scope</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Structural integrity:</strong> All frames, uprights, and transoms checked for straightness, damage, cracking, and corrosion. Each component examined individually</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Bracing:</strong> All horizontal and diagonal braces confirmed present, correctly positioned, and fully locked. No missing or substituted braces</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Connections:</strong> Spigot joints, locking pins, gravity locks, and spring clips all checked for full engagement and correct operation</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Platform:</strong> Fully decked, trapdoor operational, locking hooks engaged, no damage to deck surface or supporting members</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Guardrails &amp; toeboards:</strong> Full edge protection on all sides at correct heights (950mm guardrail, 150mm toeboard minimum), mid-rails present where required</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Castors:</strong> Brakes functional and engaged, wheels in good condition, swivel mechanisms operating correctly</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Stabilisers:</strong> Where fitted, correctly positioned, fully extended, and making proper ground contact</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Ground conditions:</strong> Base surface firm, level, and adequate to support the total applied load</span></li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The formal inspection must follow
                  the manufacturer&rsquo;s inspection protocol for the specific make and model of tower. Different
                  manufacturers use different locking mechanisms, bracing configurations, and component designs.
                  A generic checklist may miss manufacturer-specific items. The manufacturer&rsquo;s instruction
                  manual must be available to the inspector.
                </p>
              </div>

              <p>
                The difference between a pre-use check and a formal inspection is one of depth and rigour.
                The pre-use check is a quick visual scan to catch obvious defects. The formal inspection is
                a methodical, component-by-component examination that may involve climbing the tower,
                physically testing locking mechanisms, and applying force to check stability. Both are
                necessary &mdash; they are complementary, not interchangeable.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Inspection Triggers Beyond 7 Days */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Inspection Triggers Beyond 7 Days
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 7-day interval is the <strong>maximum</strong> period between formal inspections, but it
                is not the only trigger. Schedule 5 requires formal inspection at several other points, and
                these are frequently overlooked on site. Understanding all inspection triggers is essential
                for compliance.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">All Formal Inspection Triggers</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Before First Use on Site</p>
                      <p className="text-sm text-white/80">Every time a tower is erected on a new site or in a new location, it must receive a formal inspection before anyone works from it. This applies even if it was inspected at its previous location.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">After Substantial Alteration</p>
                      <p className="text-sm text-white/80">Any change to the tower configuration &mdash; adding a lift, removing a lift, reconfiguring the base, or changing the platform height &mdash; requires a new formal inspection before the tower is used again.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">After Any Event Likely to Affect Stability</p>
                      <p className="text-sm text-white/80">Any event that could have compromised the tower&rsquo;s structural integrity or stability: severe weather (storm, heavy rain, snow), impact from vehicles or plant, ground subsidence, or unauthorised interference.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-white">At Intervals Not Exceeding 7 Days</p>
                      <p className="text-sm text-white/80">If the tower remains erected on site, a formal inspection must be carried out at intervals of no more than 7 days from the date of the last inspection.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-sm font-medium text-white">After Relocation</p>
                      <p className="text-sm text-white/80">Moving a tower to a new position on the same site counts as a change of location. The new ground conditions, surroundings, and any stresses from the move must be assessed through a formal inspection.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Commonly Missed Triggers</p>
                </div>
                <p className="text-sm text-white/80">
                  The most commonly missed inspection triggers on site are: towers relocated short distances
                  (&ldquo;we only moved it a few metres&rdquo;), towers left erected over weekends or holiday
                  periods (the 7-day clock still runs), and towers subjected to overnight storms where no one
                  was present to witness the conditions. If in doubt, inspect. It takes far less time than
                  dealing with the consequences of an accident or an HSE enforcement action.
                </p>
              </div>

              <p>
                A useful way to manage inspection triggers is to keep a simple log attached to the tower
                or held in the site office. Record every event that could trigger an inspection: relocations,
                alterations, weather events, near misses, and any interference with the tower. This log
                creates a clear audit trail and makes it easy to demonstrate that you responded to each
                trigger with an appropriate inspection.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Practical Example</p>
                <p className="text-sm text-white/80">
                  A tower is erected on Monday and inspected. On Wednesday, it is moved 5 metres along the
                  building to follow the work. On Friday night, a severe storm hits the site. On Monday
                  morning, the 7-day interval expires. In this scenario, three formal inspections were
                  required: before first use (Monday), after relocation (Wednesday), and after the storm
                  event (Saturday or first thing Monday before use). The 7-day inspection on Monday is also
                  due, but the post-storm inspection covers it. If any of these inspections were missed,
                  the duty holder is in breach of Schedule 5.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Retention Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Retention Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Schedule 5 imposes specific requirements on how long inspection records must be kept and
                where they must be available. These requirements exist so that the HSE and other enforcing
                authorities can verify compliance at any time, and so that in the event of an incident,
                there is a clear audit trail.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Record Retention Timeline</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-cyan-400">During the Work</p>
                      <p className="text-sm text-white/80">Inspection records must be kept on site and available for examination throughout the period the tower is in use at that location.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-cyan-400">After Completion</p>
                      <p className="text-sm text-white/80">Once the work is completed and the tower dismantled, records must be retained for a minimum of 3 months from the date of completion.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-cyan-400">HSE Request</p>
                      <p className="text-sm text-white/80">The HSE can request to see inspection records at any time during the work or within the 3-month retention period. Failure to produce records when requested is a criminal offence.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Electronic records are acceptable
                  under the Regulations, provided they can be produced in a readable format when requested.
                  Digital inspection systems such as PASMA&rsquo;s TowerSure app produce time-stamped,
                  cloud-stored records that meet the legal requirements and are often easier to retrieve
                  than paper records.
                </p>
              </div>

              <p>
                Many organisations choose to retain records for longer than the 3-month minimum, particularly
                on larger projects or where the work involves higher-risk activities. Retaining records for
                the duration of the project plus 6 to 12 months is considered good practice. In the event
                of a civil claim for personal injury, records may be relevant for years after the work was
                completed.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Non-Compliance Consequences */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Non-Compliance Consequences
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety Executive takes work at height non-compliance extremely seriously.
                Falls from height remain the number one cause of workplace fatalities in the United Kingdom,
                and the HSE has extensive enforcement powers to address breaches of the Work at Height
                Regulations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gavel className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">HSE Enforcement Powers</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-amber-400">Improvement Notice</p>
                    <p className="text-sm text-white/80">Issued where the inspector identifies a breach of legislation. Specifies the breach and sets a minimum 21-day deadline for the duty holder to remedy it. Can be appealed to an employment tribunal.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-400">Prohibition Notice</p>
                    <p className="text-sm text-white/80">Issued where the inspector believes there is a risk of serious personal injury. Requires the activity to stop immediately. Takes effect immediately (or can be deferred). Not dependent on a breach having occurred &mdash; risk alone is sufficient.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-400">Prosecution</p>
                    <p className="text-sm text-white/80">For serious breaches, the HSE can prosecute in the criminal courts. Cases can be heard in the magistrates&rsquo; court or the Crown Court depending on severity.</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Penalties for Organisations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Unlimited fines in the Crown Court</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Sentencing guidelines consider turnover and culpability</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Publicity orders (public naming of the offender)</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Remediation orders requiring corrective action</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Loss of approved contractor status</span></li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Penalties for Individuals</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Unlimited fines</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Imprisonment (up to 2 years for most offences)</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Disqualification as a company director</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Personal criminal record</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Both corporate and individual liability can apply</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Fee for Intervention (FFI)</p>
                </div>
                <p className="text-sm text-white/80">
                  Since October 2012, the HSE operates a Fee for Intervention scheme. If an inspector
                  identifies a material breach of health and safety legislation, the duty holder is charged
                  for the HSE&rsquo;s time at a rate of &pound;163 per hour (2024/25 rate). This is in
                  addition to any fine or enforcement action and applies even if no prosecution follows.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Best Practice Beyond the Minimum */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Best Practice Beyond the Minimum
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The legal minimum is just that &mdash; a minimum. Organisations that take tower safety
                seriously will implement additional measures that go beyond Schedule 5 requirements. These
                measures not only reduce risk but also demonstrate a positive safety culture and provide
                stronger protection in the event of an incident or enforcement action.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Best Practice Measures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Daily documented checks:</strong> Record every pre-use check in writing, not just formal 7-day inspections. Creates a comprehensive audit trail</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Photographic records:</strong> Take date-stamped photographs at each inspection showing the tower&rsquo;s condition, location, and surroundings</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Competent person register:</strong> Maintain a register of all persons authorised to carry out formal inspections, including their qualifications, training dates, and competence assessments</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Inspection scheduling system:</strong> Use a calendar or digital system to schedule inspections in advance and alert when they are due, preventing missed deadlines</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Management review:</strong> Periodically review inspection findings at management level to identify trends, recurring defects, and areas for improvement</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Digital inspection tools:</strong> Use apps such as PASMA TowerSure for time-stamped, cloud-backed inspection records that cannot be backdated</span></li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Benefits of Going Beyond</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Stronger legal defence if an incident occurs</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Better audit trail for client and HSE inspection</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Earlier identification of recurring defects</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Improved safety culture across the workforce</span></li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Risks of Minimum Compliance Only</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Gaps in records between 7-day intervals</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Defects may go undetected for up to a week</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Weaker legal position if questioned</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Reactive rather than proactive safety approach</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> In the event of a prosecution,
                  the court will consider whether the duty holder did everything &ldquo;reasonably practicable&rdquo;
                  to prevent harm. Demonstrating that you went beyond the minimum &mdash; with daily checks,
                  photographic records, and a robust inspection system &mdash; significantly strengthens
                  your defence and shows the court that safety was a genuine priority, not an afterthought.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../pasma-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pre-Use Checks
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-5-section-3">
              Next: Records &amp; Documentation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}