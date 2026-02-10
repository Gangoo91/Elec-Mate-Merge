import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ShieldCheck, ClipboardList, Calendar, Eye, UserCheck, Clock, Award, Search, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "scaffolding-awareness-reg12-triggers",
    question: "Under Regulation 12 of the Work at Height Regulations 2005, how frequently must a scaffold that is in continuous use be inspected as a minimum?",
    options: [
      "Every 24 hours",
      "Every 7 days",
      "Every 14 days",
      "Every 28 days"
    ],
    correctIndex: 1,
    explanation:
      "Regulation 12 of the Work at Height Regulations 2005 requires that a scaffold in use must be inspected at intervals not exceeding 7 days. This 7-day cycle is a legal maximum \u2014 in practice, many sites carry out more frequent inspections (for example, daily visual checks in addition to the formal 7-day inspection). The 7-day inspection must be carried out by a competent person and a written report must be prepared within 24 hours. If conditions change (for example, after heavy winds or an impact), an additional inspection must be carried out before the scaffold is used again, regardless of when the last 7-day inspection took place."
  },
  {
    id: "scaffolding-awareness-competent-person",
    question: "What does 'competent person' mean in the context of scaffold inspection under the Work at Height Regulations 2005?",
    options: [
      "Any person who has worked on a construction site for more than 12 months",
      "A person with sufficient training, knowledge, and practical experience to identify defects and assess whether the scaffold is safe for use",
      "Only a person who holds a CISRS Advanced Scaffolder card",
      "A person appointed in writing by the Health and Safety Executive"
    ],
    correctIndex: 1,
    explanation:
      "The Work at Height Regulations 2005 define a competent person as someone with 'such practical and theoretical knowledge and experience of the equipment to be inspected as will enable them to detect defects or weaknesses and to assess their importance in relation to the safety of the equipment.' This means they must have sufficient training, knowledge, and practical experience to carry out the inspection properly. While a CISRS scaffold inspection training scheme (SITS) card is widely recognised as evidence of competence, the regulations do not mandate a specific qualification \u2014 the person must simply demonstrate the required combination of training, knowledge, and experience."
  },
  {
    id: "scaffolding-awareness-inspection-report",
    question: "Within what time period must a scaffold inspection report be completed after the inspection has taken place?",
    options: [
      "Immediately, before the inspection team leaves the scaffold",
      "Within 24 hours of the inspection being completed",
      "Within 48 hours of the inspection being completed",
      "Within 7 days, in time for the next scheduled inspection"
    ],
    correctIndex: 1,
    explanation:
      "Schedule 7 of the Work at Height Regulations 2005 requires that the report of an inspection must be completed within 24 hours of the inspection being carried out. The report must contain specific information including the name and address of the person for whom the inspection was carried out, the location and description of the scaffold, the date and time of the inspection, the results of the inspection (including any defects found), the details of any action taken, and the name and position of the person who carried out the inspection. The report must be kept on site and be available for inspection by an HSE inspector at any time."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can the scaffold user (e.g. a bricklayer or electrician) carry out the 7-day scaffold inspection, or must it be a scaffolder?",
    answer:
      "The Work at Height Regulations 2005 do not specify that the competent person must be a scaffolder. In theory, any person who has the necessary combination of training, knowledge, and practical experience to detect defects and assess their significance can carry out the inspection. In practice, however, the level of technical knowledge required to properly inspect a scaffold \u2014 understanding load capacities, bracing patterns, tie arrangements, coupler torques, foundation adequacy, and platform compliance \u2014 means that the competent person is almost always someone with scaffold-specific training. The CISRS Scaffold Inspection Training Scheme (SITS) and the CITB Scaffold Inspection course are the most widely recognised training programmes for non-scaffolders who need to carry out inspections. Many principal contractors now require evidence of specific scaffold inspection training (such as a SITS card) before allowing anyone to carry out formal 7-day inspections on their sites."
  },
  {
    question: "What constitutes a 'substantial alteration' that triggers an inspection before the scaffold can be used again?",
    answer:
      "A substantial alteration is any change to the scaffold that could affect its structural integrity or safety. This includes adding or removing lifts (additional working levels), adding or removing bays (extending or reducing the scaffold horizontally), changing or removing ties (which directly affects stability), adding loading bays or hoist towers, altering the foundations or base support, and changing the configuration of the working platforms. Minor changes such as replacing a single damaged board with a like-for-like board, or tightening a loose coupler, would not normally constitute a substantial alteration. However, if there is any doubt, an inspection should be carried out. The key principle is that any change that could affect the scaffold\u2019s stability, strength, or the safety of its users triggers the requirement for a fresh inspection by a competent person before the scaffold is used again."
  },
  {
    question: "What wind speed is considered significant enough to trigger a post-event scaffold inspection?",
    answer:
      "The Work at Height Regulations 2005 do not specify a precise wind speed threshold. However, industry guidance (including TG20 and the NASC Technical Guidance) generally considers that scaffold inspections should be triggered after sustained wind speeds exceeding approximately 30 mph (48 km/h) or gusts exceeding approximately 40 mph (64 km/h). Many site-specific scaffold design calculations and wind loading assessments will specify the design wind speed for the particular scaffold, and inspections should be triggered whenever conditions approach or exceed the design parameters. In practice, most principal contractors have site-specific trigger points defined in their scaffold management plans. After any period of strong winds, the scaffold should not be used until a competent person has inspected it and confirmed it is safe. Common areas to check after high winds include ties (which may have been loosened or displaced), sheeting and netting (which can significantly increase wind loading), bracing (which may have been overstressed), and foundations (which may have been affected by water run-off or soil movement associated with storms)."
  },
  {
    question: "Is there a specific form that must be used for scaffold inspection reports, or can a company use its own format?",
    answer:
      "The Work at Height Regulations 2005 do not prescribe a specific form. However, Schedule 7 of the regulations sets out the minimum information that must be included in every inspection report: the name and address of the person for whom the inspection was carried out; the location and description of the workplace or equipment inspected; the date and time of the inspection; details of any matters identified that could give rise to a risk to the health or safety of any person; details of any action taken as a result of matters identified; details of any further action considered necessary; and the name and position of the person who carried out the inspection. Many companies use the NASC standard scaffold inspection checklist (form SG4), the CIS61 form, or similar industry-standard documents that are designed to capture all the required information in a systematic format. Some companies have developed their own bespoke inspection forms or use digital inspection apps that guide the inspector through a structured checklist. Whatever format is used, the report must be completed within 24 hours, kept on site, and retained for at least 3 months after the scaffold is dismantled."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Under the Work at Height Regulations 2005, when must a scaffold be inspected before first use?",
    options: [
      "Only when the scaffold is higher than 4 metres",
      "After erection or after any substantial alteration, before any person uses it for work",
      "Only if the scaffold will be in use for more than 7 days",
      "Only if the client specifically requests an inspection"
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 12 of the Work at Height Regulations 2005 requires that a scaffold must be inspected by a competent person after erection in any position in which it is intended to be used (i.e. before first use) and after any substantial alteration. This requirement applies to all scaffolds regardless of height and is not dependent on the duration of use or a client request. The inspection must confirm that the scaffold has been erected in accordance with the design and is safe for the intended use before any person is permitted to work from it."
  },
  {
    id: 2,
    question:
      "What is the maximum interval between periodic inspections of a scaffold that is in continuous use?",
    options: [
      "24 hours",
      "3 days",
      "7 days",
      "14 days"
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 12(3) of the Work at Height Regulations 2005 requires that a scaffold in use must be inspected at intervals not exceeding 7 days. This is a statutory maximum interval \u2014 it cannot be extended under any circumstances while the scaffold is in use. Many sites carry out more frequent inspections (daily visual checks plus the formal 7-day inspection) as a matter of good practice. The 7-day cycle begins from the date of the initial inspection (after erection) and runs continuously for as long as the scaffold remains in use."
  },
  {
    id: 3,
    question:
      "Which of the following events requires a scaffold to be inspected before it is used again, regardless of when the last periodic inspection took place?",
    options: [
      "A change in the trade using the scaffold (e.g. from bricklayers to electricians)",
      "The arrival of new materials to be stored on the scaffold platform",
      "Exposure to conditions likely to have affected its strength or stability, such as strong winds",
      "The scaffold having been unused over a weekend"
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 12(4) of the Work at Height Regulations 2005 requires an inspection after any event likely to have affected the strength or stability of the scaffold. This includes adverse weather conditions (strong winds, heavy rain, frost, snow), any impact from vehicles, plant or falling objects, any subsidence or movement of the ground, and any other occurrence that could compromise the scaffold\u2019s structural integrity. A change of trade using the scaffold or the arrival of new materials does not in itself trigger an inspection (though a change in the intended load may require a reassessment of the scaffold design). Being unused over a weekend does not trigger an inspection unless an adverse event occurred during that period."
  },
  {
    id: 4,
    question:
      "What does the term 'competent person' mean in the context of scaffold inspection under the Work at Height Regulations 2005?",
    options: [
      "A person who holds a current CSCS card of any colour",
      "A person who has been appointed in writing by the Health and Safety Executive",
      "A person with sufficient practical and theoretical knowledge and experience to detect defects and assess their importance in relation to safety",
      "A person who has completed a minimum of 5 years\u2019 experience working as a scaffolder"
    ],
    correctAnswer: 2,
    explanation:
      "The Work at Height Regulations 2005 define a competent person for the purposes of scaffold inspection as someone with such practical and theoretical knowledge and experience of the type of scaffold being inspected as will enable them to detect defects or weaknesses and to assess their importance in relation to the safety of the scaffold. The definition is functional \u2014 it focuses on what the person can do (detect defects and assess their significance) rather than mandating a specific qualification or period of experience. In practice, this requires a combination of relevant training, practical experience, and up-to-date knowledge of current standards and regulations."
  },
  {
    id: 5,
    question:
      "What information must a scaffold inspection report contain under Schedule 7 of the Work at Height Regulations 2005?",
    options: [
      "Only the date of the inspection and the name of the inspector",
      "The scaffold design drawings and calculations only",
      "Details including location, date and time, description of the scaffold, results of the inspection, any defects found, action taken, and the name and position of the inspector",
      "Only a pass or fail result with the inspector\u2019s signature"
    ],
    correctAnswer: 2,
    explanation:
      "Schedule 7 of the Work at Height Regulations 2005 sets out detailed requirements for the content of inspection reports. The report must include: the name and address of the person for whom the inspection was carried out; the location and description of the workplace or equipment; the date and time of the inspection; details of any matters identified that could give rise to a risk to health or safety; details of any action taken as a result; details of any further action considered necessary; and the name and position of the person who carried out the inspection. A simple pass/fail result is not sufficient \u2014 the report must provide enough detail to demonstrate that a thorough inspection was carried out."
  },
  {
    id: 6,
    question:
      "Within what time period must a scaffold inspection report be completed after the inspection?",
    options: [
      "Immediately, before leaving the scaffold",
      "Within 24 hours of the inspection",
      "Within 48 hours of the inspection",
      "Within 7 days, before the next periodic inspection"
    ],
    correctAnswer: 1,
    explanation:
      "The Work at Height Regulations 2005 require that the report of a scaffold inspection must be completed within 24 hours of the inspection being carried out. This ensures that the findings of the inspection are formally recorded while they are fresh in the inspector\u2019s mind, and that any defects identified are documented promptly so that corrective action can be tracked. The completed report must be kept at the site where the inspection was carried out until the construction work is completed, and then kept at the office of the person for whom the inspection was carried out for a further 3 months."
  },
  {
    id: 7,
    question:
      "The CISRS Scaffold Inspection Training Scheme (SITS) is primarily designed for which group of people?",
    options: [
      "Only qualified CISRS Advanced Scaffolders",
      "Only HSE inspectors and enforcement officers",
      "Non-scaffolders who need to inspect scaffolds, such as site managers, supervisors, and safety officers",
      "Only scaffold design engineers and structural engineers"
    ],
    correctAnswer: 2,
    explanation:
      "The CISRS Scaffold Inspection Training Scheme (SITS) is specifically designed for non-scaffolders who need to carry out scaffold inspections as part of their role. This includes site managers, site supervisors, project managers, safety officers, and other construction professionals who are responsible for managing scaffold safety on site but who are not themselves qualified scaffolders. The course covers the legal requirements for scaffold inspection, how to identify common defects and hazards, how to assess whether a scaffold is safe for use, and how to complete inspection reports correctly. CISRS scaffolders receive inspection training as part of their core scaffolder training programme, so SITS is designed to bridge the knowledge gap for non-scaffolders."
  },
  {
    id: 8,
    question:
      "A scaffold was last inspected on Monday morning. On Wednesday afternoon, heavy rain and strong winds affect the site. When must the scaffold next be inspected?",
    options: [
      "At the next scheduled 7-day inspection the following Monday",
      "Before the scaffold is used again after the adverse weather, regardless of the 7-day cycle",
      "Within 48 hours of the weather event",
      "Only if visible damage is observed from ground level"
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 12(4) of the Work at Height Regulations 2005, a scaffold must be inspected after any event likely to have affected its strength or stability. Heavy rain and strong winds are specifically recognised as events that can affect scaffold stability \u2014 wind can loosen ties, displace sheeting, and overstress bracing, while heavy rain can cause ground subsidence and affect foundations. The scaffold must not be used again until a competent person has carried out an inspection and confirmed it is safe. This inspection is required regardless of when the last 7-day periodic inspection took place. The 7-day cycle continues to run from the original schedule, but the post-event inspection is an additional requirement on top of the periodic inspections."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function ScaffoldingAwarenessModule4Section1() {
  useSEO({
    title: "When to Inspect | Scaffolding Awareness Module 4.1",
    description:
      "Understand when scaffold inspections are legally required under WAH Regulations 2005 Regulation 12 \u2014 before first use, every 7 days, after adverse events, and after modifications. Learn who can inspect and what competence means.",
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
            <Link to="../scaffolding-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Search className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            When to Inspect
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the legal triggers for scaffold inspection under the Work at Height Regulations
            2005 &mdash; when inspections must take place, who can carry them out, and what &ldquo;competent
            person&rdquo; means in the context of scaffold safety
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Law:</strong> WAH Regulations 2005, Regulation 12</li>
              <li><strong>Before first use:</strong> After erection or substantial alteration</li>
              <li><strong>Periodic:</strong> At least every 7 days while in use</li>
              <li><strong>After events:</strong> Winds, rain, impact, subsidence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">For Site Workers</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Who inspects:</strong> A competent person (trained + experienced)</li>
              <li><strong>Report deadline:</strong> Within 24 hours of inspection</li>
              <li><strong>Keep reports:</strong> On site until work complete, then 3 months</li>
              <li><strong>Never use:</strong> An uninspected or tagged-out scaffold</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the legal requirements for scaffold inspection under Regulation 12 of the WAH Regulations 2005",
              "Identify the four circumstances that trigger a mandatory scaffold inspection",
              "Define what \u2018competent person\u2019 means in the context of scaffold inspection",
              "Describe the role and purpose of the CISRS Scaffold Inspection Training Scheme (SITS)",
              "Explain what information a scaffold inspection report must contain under Schedule 7",
              "Describe the timing requirements for completing and retaining inspection reports",
              "Recognise the types of events that are likely to affect scaffold strength or stability",
              "Understand why inspections must be carried out within the working day and before work commences"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: The Legal Framework                              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">01</span>
              The Legal Framework
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The legal requirement to inspect scaffolds before use and at regular intervals is set out in
                <strong> Regulation 12</strong> of the <strong>Work at Height Regulations 2005</strong> (SI
                2005/735). These regulations apply throughout England, Wales, and Scotland and are enforced
                by the Health and Safety Executive (HSE) and local authorities. Regulation 12 specifically
                addresses the <strong>inspection of work equipment</strong> used for work at height, including
                all types of scaffolding &mdash; tube and fitting, system scaffolds, birdcage scaffolds,
                independent tied scaffolds, putlog scaffolds, and mobile tower scaffolds.
              </p>

              <p>
                The purpose of Regulation 12 is to ensure that scaffolds are inspected at critical points in
                their lifecycle so that defects, damage, and deterioration are detected before they can lead
                to a collapse, partial failure, or any other event that could endanger the safety of workers
                or members of the public. Scaffold failures remain one of the leading causes of serious
                injuries and fatalities in the UK construction industry. The HSE&rsquo;s analysis of scaffold
                incidents consistently identifies <strong>failure to inspect</strong> or <strong>inadequate
                inspection</strong> as contributing factors in a significant proportion of scaffold-related
                accidents.
              </p>

              <p>
                Regulation 12 does not exist in isolation. It operates alongside other important legal
                requirements, including:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>The Health and Safety at Work etc. Act 1974</strong> &mdash; the overarching duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of employees and others affected by work activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>The Management of Health and Safety at Work Regulations 1999</strong> &mdash; the requirement for suitable and sufficient risk assessment and competent health and safety assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>The Construction (Design and Management) Regulations 2015 (CDM 2015)</strong> &mdash; the duty on principal contractors to plan, manage, and monitor construction work, including the management of scaffolding</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>The Provision and Use of Work Equipment Regulations 1998 (PUWER)</strong> &mdash; the duty to ensure work equipment is maintained in an efficient state, in efficient working order, and in good repair</span>
                </li>
              </ul>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Key Legal Point:</strong> Failure to comply with
                  Regulation 12 is a criminal offence. Employers, scaffold contractors, and individuals
                  responsible for scaffold management can be prosecuted by the HSE. Penalties include
                  unlimited fines and, in cases involving serious injury or death, custodial sentences.
                  In 2024, the Sentencing Council guidelines for health and safety offences mean that
                  even medium-sized companies can face fines of hundreds of thousands of pounds for
                  scaffold inspection failures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: The Four Inspection Triggers                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">02</span>
              The Four Inspection Triggers
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 12 of the Work at Height Regulations 2005 establishes <strong>four distinct
                circumstances</strong> in which a scaffold must be inspected by a competent person before
                it can be used for work. Each trigger serves a specific purpose in the scaffold safety
                lifecycle:
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">The Four Mandatory Inspection Triggers</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Trigger 1: Before First Use (After Erection)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A scaffold must be inspected after it has been erected in any position in which it is
                      intended to be used, and before any person uses it for work. This initial inspection
                      confirms that the scaffold has been built in accordance with the design specification,
                      that all components are correctly positioned and secured, that the foundations are
                      adequate, that the working platforms are fully boarded and fitted with guard rails and
                      toe boards, and that the scaffold is safe for its intended use. The scaffold must not
                      be used by any trade until this initial inspection has been completed and the scaffold
                      has been signed off as safe.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Trigger 2: After Any Substantial Alteration</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Whenever a scaffold is substantially altered &mdash; for example, when additional lifts
                      are added, bays are extended or removed, ties are repositioned, loading bays are
                      installed, or the scaffold is partially dismantled and rebuilt in a different
                      configuration &mdash; it must be inspected again before anyone uses it. The alteration
                      may have changed the structural behaviour of the scaffold, introduced new loading
                      patterns, or affected the tie arrangement. A fresh inspection ensures that the altered
                      scaffold is still structurally sound and compliant with the design.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Trigger 3: At Intervals Not Exceeding 7 Days</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      While a scaffold remains in use, it must be inspected at intervals not exceeding 7
                      days. This 7-day maximum is a statutory requirement and cannot be extended under any
                      circumstances. The periodic inspection is designed to detect progressive deterioration,
                      unauthorised modifications by scaffold users, damage caused by construction activities
                      (loading, impact from materials handling), loosening of couplers through vibration, and
                      changes in ground conditions. The 7-day cycle runs continuously from the date of the
                      initial inspection for as long as the scaffold remains erected and in use.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Trigger 4: After Any Event Likely to Have Affected Stability</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A scaffold must be inspected after any event that is likely to have affected its strength
                      or stability, regardless of when the last periodic inspection took place. This includes
                      strong winds, heavy rain, snow or ice loading, impact from vehicles or plant, impact
                      from falling objects or materials, subsidence or movement of the ground beneath the
                      scaffold, fire or heat exposure near the scaffold, and any other occurrence that could
                      have compromised the structural integrity. The scaffold must not be used again until the
                      post-event inspection has been completed and the competent person has confirmed it is safe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Diagram: Inspection Schedule Timeline */}
              <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-slate-500/20">
                <h3 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Inspection Schedule Timeline &mdash; Example Scenario
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-20 text-xs text-slate-400 font-mono pt-0.5">Day 1</div>
                    <div className="flex-1 bg-slate-500/10 border border-slate-500/20 rounded-lg p-2.5">
                      <p className="text-xs text-white font-medium">Scaffold erection completed</p>
                      <p className="text-xs text-white/60">Initial inspection required before any trade uses the scaffold (Trigger 1)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-20 text-xs text-slate-400 font-mono pt-0.5">Day 1</div>
                    <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5">
                      <p className="text-xs text-white font-medium">Initial inspection completed &mdash; scaffold signed off as safe</p>
                      <p className="text-xs text-white/60">Report completed within 24 hours. 7-day cycle starts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-20 text-xs text-slate-400 font-mono pt-0.5">Day 4</div>
                    <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5">
                      <p className="text-xs text-white font-medium">Strong winds overnight (gusts exceeding 40 mph)</p>
                      <p className="text-xs text-white/60">Post-event inspection required before scaffold is used (Trigger 4). 7-day cycle continues from original schedule</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-20 text-xs text-slate-400 font-mono pt-0.5">Day 4</div>
                    <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5">
                      <p className="text-xs text-white font-medium">Post-event inspection completed &mdash; scaffold confirmed safe</p>
                      <p className="text-xs text-white/60">Report completed within 24 hours. This does NOT reset the 7-day cycle</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-20 text-xs text-slate-400 font-mono pt-0.5">Day 8</div>
                    <div className="flex-1 bg-slate-500/10 border border-slate-500/20 rounded-lg p-2.5">
                      <p className="text-xs text-white font-medium">7-day periodic inspection due (7 days from Day 1)</p>
                      <p className="text-xs text-white/60">Must be completed before end of day. Report within 24 hours (Trigger 3)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-20 text-xs text-slate-400 font-mono pt-0.5">Day 10</div>
                    <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5">
                      <p className="text-xs text-white font-medium">Additional lift added to scaffold (substantial alteration)</p>
                      <p className="text-xs text-white/60">Inspection required before altered scaffold is used (Trigger 2). 7-day cycle continues</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-20 text-xs text-slate-400 font-mono pt-0.5">Day 15</div>
                    <div className="flex-1 bg-slate-500/10 border border-slate-500/20 rounded-lg p-2.5">
                      <p className="text-xs text-white font-medium">Next 7-day periodic inspection due (7 days from Day 8)</p>
                      <p className="text-xs text-white/60">The cycle continues regardless of any interim inspections triggered by events or alterations</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-3 italic">
                  Note: Event-triggered and alteration-triggered inspections are <strong>additional</strong> to
                  the 7-day periodic inspections. They do not replace or reset the 7-day cycle.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  A scaffold that has not been inspected in accordance with Regulation 12 must <strong>not be
                  used</strong> for work. If an overdue inspection is discovered, the scaffold should be
                  immediately taken out of service (scaffolding tags changed to &ldquo;Do Not Use&rdquo;,
                  access ladders removed or blocked) until a competent person has carried out a full
                  inspection and confirmed the scaffold is safe. Allowing workers to use an uninspected
                  scaffold is a serious breach of the regulations and can result in prosecution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Before First Use                                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">03</span>
              Before First Use &mdash; The Initial Inspection
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The initial inspection is arguably the most important inspection in the scaffold&rsquo;s
                lifecycle. It takes place <strong>after the scaffold has been fully erected</strong> (or
                after a substantial alteration) and <strong>before any person uses it for work</strong>.
                The purpose is to verify that the scaffold has been built correctly, in accordance with the
                design, and that it is safe for its intended purpose.
              </p>

              <p>
                During the initial inspection, the competent person should systematically check the
                following elements:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Foundations</strong> &mdash; sole boards are in place and of adequate size, base plates are correctly positioned on the sole boards, the ground is firm and level, there is no evidence of subsidence or instability, and any base jacks are within their safe extension range</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Standards (vertical tubes)</strong> &mdash; plumb (within acceptable tolerance), correctly spaced according to the design, correctly joined at couplers, free from visible damage (bends, dents, excessive corrosion), and resting securely on base plates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Ledgers (horizontal tubes)</strong> &mdash; level, correctly spaced at the specified lift heights, connected to standards with right-angle couplers at the correct torque, and continuous or correctly joined with sleeve couplers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Transoms and putlogs</strong> &mdash; correctly spaced to support the platform boards without excessive deflection, securely connected with the correct coupler type, and at the correct level relative to the ledgers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Bracing</strong> &mdash; ledger bracing, plan bracing, and facade bracing installed in accordance with the design, all couplers tight, and the bracing pattern providing adequate rigidity in all directions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Ties</strong> &mdash; installed at the correct spacing and pattern as specified in the design, each tie tested for effectiveness (push/pull test), tie tubes correctly connected to the scaffold and to the building, and all tie fixings into the building structure are secure and into competent material</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Working platforms</strong> &mdash; fully boarded with no gaps exceeding 25 mm, boards in good condition (no splits, excessive warping, or decay), boards secured with board clips, platform width adequate for the intended use (minimum 600 mm for access, 800 mm for working), and no tripping hazards</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Guard rails and toe boards</strong> &mdash; top guard rail at minimum 950 mm above the working platform, intermediate guard rail fitted to reduce the unprotected gap to no more than 470 mm, toe boards at minimum 150 mm height, and all guard rails and toe boards securely fixed and continuous</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Access</strong> &mdash; safe access and egress provided at each working level (internal ladders, staircase towers, or ladder access bays), ladders secured and extending at least 1 metre above the platform landing, self-closing gates fitted at access points, and ladder traps in position</span>
                </li>
              </ul>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Handover Procedure:</strong> On most construction sites,
                  the scaffold contractor will carry out the initial inspection as part of the handover process.
                  The scaffolding contractor hands the scaffold over to the principal contractor (or the
                  scaffold user) with a completed inspection report and a scaffolding permit or tag indicating
                  that the scaffold has been inspected and is safe for use. The scaffold tag system (typically
                  green for &ldquo;safe to use&rdquo;, red for &ldquo;do not use&rdquo;, and amber for
                  &ldquo;incomplete / under construction&rdquo;) is the visible, on-scaffold confirmation that
                  the inspection status is current.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Events Affecting Stability                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">04</span>
              Events Likely to Affect Strength or Stability
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 12(4) requires an inspection after <strong>any event likely to have affected
                the strength or stability</strong> of the scaffold. This is one of the most important
                inspection triggers because it addresses unplanned situations that could have compromised
                the scaffold&rsquo;s structural integrity between regular inspections. The range of events
                that can affect a scaffold&rsquo;s stability is broad, and site managers and scaffold users
                must be trained to recognise when an additional inspection is required.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Common Events Triggering Post-Event Inspection</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Strong Winds</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Wind is the most common environmental event triggering scaffold inspections. Strong winds
                      can loosen couplers (especially those that were under-torqued), displace or rip scaffold
                      sheeting and debris netting (which dramatically increases wind loading on the scaffold),
                      bend or buckle bracing members, pull ties out of the building structure, cause the scaffold
                      to sway and fatigue components, and in extreme cases cause partial or total collapse. Industry
                      guidance (TG20, NASC) generally recommends inspections after sustained wind speeds exceeding
                      approximately 30 mph or gusts exceeding approximately 40 mph, though site-specific trigger
                      points should be established in the scaffold management plan.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Heavy Rain and Flooding</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Heavy rainfall can cause soil erosion and softening beneath scaffold foundations, leading
                      to subsidence and uneven settlement. Water accumulation around base plates and sole boards
                      can wash away compacted ground and undermine the bearing capacity of the foundations. On
                      sloping ground, surface water run-off can cause differential settlement. Flooding can
                      submerge the lower portion of the scaffold, potentially displacing sole boards and base
                      plates entirely. After heavy rain, the competent person should pay particular attention
                      to foundations, sole board condition, ground firmness, and any signs of settlement or
                      tilting.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Impact from Vehicles, Plant, or Materials</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Scaffolds on construction sites are vulnerable to impact from delivery vehicles, telehandlers,
                      excavators, cranes, and falling materials being loaded or unloaded. Even a seemingly minor
                      impact can bend standards, loosen couplers, displace ties, and transfer shock loads through
                      the scaffold structure in ways that are not immediately visible from ground level. Vehicle
                      impact to the lower portion of a scaffold can compromise the load path from the foundations
                      upwards, potentially affecting the stability of the entire structure. Any impact, regardless
                      of how minor it appears, should trigger an inspection.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Subsidence, Ground Movement, and Excavation</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Any movement of the ground beneath a scaffold &mdash; whether caused by natural subsidence,
                      vibration from nearby piling or compaction equipment, excavation work close to the scaffold
                      foundations, or changes in the water table &mdash; can cause differential settlement of the
                      scaffold base. This can lead to the scaffold leaning, standards going out of plumb, couplers
                      being overstressed, and ties being loaded in unintended directions. Excavation work within
                      the zone of influence of the scaffold foundations (typically a 45-degree angle from the base
                      of the scaffold) is particularly hazardous and should always trigger an inspection.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Snow, Ice, and Frost</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Snow accumulation on scaffold platforms adds significant dead load that the scaffold may
                      not have been designed to carry. Ice formation on couplers and tubes can mask defects and
                      also create slip hazards on working platforms and access ladders. Freeze-thaw cycles can
                      affect ground conditions beneath the scaffold, causing heave and subsequent settlement.
                      After any period of snow, ice, or prolonged frost, the scaffold should be inspected with
                      particular attention to loading, platform condition, access routes, and foundation integrity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Important:</strong> The list above is not exhaustive. The
                  overarching principle is that <strong>any occurrence that could reasonably be expected to have
                  affected the scaffold&rsquo;s strength or stability</strong> triggers the requirement for an
                  inspection. If there is any doubt about whether an event requires an inspection, the prudent
                  and legally correct approach is to carry out the inspection. The cost and time of an inspection
                  are negligible compared to the consequences of a scaffold failure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: After Modification                               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">05</span>
              After Modification &mdash; Substantial Alterations
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>substantial alteration</strong> is any change to the scaffold that could affect its
                structural integrity, stability, or the safety of the persons using it. Whenever a scaffold
                is substantially altered, it must be inspected by a competent person before it is used again.
                This inspection requirement exists because alterations change the way the scaffold behaves
                structurally and may introduce new risks that were not present in the original design.
              </p>

              <p>
                The following types of changes are generally considered substantial alterations that require
                a fresh inspection:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Adding or removing lifts</strong> &mdash; increasing the height of the scaffold by adding one or more additional lifts (working levels) changes the wind loading, the dead weight, the tie requirements, and the overall stability. Removing lifts (partial dismantling from the top) also constitutes a substantial alteration as it changes the structural configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Adding or removing bays</strong> &mdash; extending the scaffold horizontally or reducing its length changes the number and distribution of foundations, affects the bracing pattern, and alters the tie arrangement</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Changing or removing ties</strong> &mdash; ties are critical to scaffold stability. Any change to the tie arrangement (repositioning, removing, or adding ties) directly affects the scaffold&rsquo;s resistance to overturning, and the inspection must confirm that the revised tie pattern still provides adequate restraint</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Installing loading bays</strong> &mdash; loading bays impose concentrated point loads on the scaffold that may exceed the design loads for the original scaffold. The scaffold structure in the vicinity of the loading bay may need to be strengthened with additional standards, transoms, or bracing</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Installing hoist towers or gin wheels</strong> &mdash; these impose dynamic loading (loads that change rapidly as materials are hoisted) which creates different stresses on the scaffold compared to static loading</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Altering the foundation arrangement</strong> &mdash; changing sole boards, base plates, or adjustable bases, or carrying out groundwork near the scaffold foundations that could affect the bearing capacity or drainage</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Adding sheeting, netting, or cladding</strong> &mdash; enclosing a scaffold with sheeting or cladding dramatically increases the wind loading on the structure. The scaffold design must account for this increased loading, and the tie pattern may need to be revised</span>
                </li>
              </ul>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Unauthorised Modifications</p>
                </div>
                <p className="text-sm text-white/80">
                  One of the most common causes of scaffold incidents is <strong>unauthorised modification</strong>
                  by scaffold users. This includes removing boards to create openings for materials handling,
                  removing guard rails or toe boards to &ldquo;make more room&rdquo;, removing ties because they
                  are &ldquo;in the way&rdquo; of the building work, and adding materials or equipment that
                  overload the platform beyond its design capacity. Unauthorised modifications are extremely
                  dangerous and are a serious breach of the regulations. Any unauthorised modification discovered
                  during an inspection should be immediately rectified, and the scaffold should be taken out of
                  service until it has been restored to its correct configuration and re-inspected.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What Is NOT a Substantial Alteration?</p>
                <p className="text-sm text-white/80">
                  Minor maintenance activities that do not change the structural configuration of the scaffold
                  are generally not considered substantial alterations. Examples include replacing a single
                  damaged board with a like-for-like replacement, tightening a loose coupler, replacing a
                  missing board clip, or replacing a single damaged toe board. However, even for these minor
                  repairs, the work should be carried out by a competent person and a record should be kept.
                  If there is any doubt about whether a change constitutes a substantial alteration, it should
                  be treated as one and an inspection carried out.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Who Can Inspect                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">06</span>
              Who Can Inspect &mdash; The Competent Person
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 12 requires that scaffold inspections are carried out by a <strong>competent
                person</strong>. The Work at Height Regulations 2005 define a competent person as a person
                who has <em>&ldquo;such practical and theoretical knowledge and experience of the equipment
                to be inspected as will enable them to detect defects or weaknesses and to assess their
                importance in relation to the safety of the equipment.&rdquo;</em>
              </p>

              <p>
                This definition is <strong>functional</strong> rather than prescriptive &mdash; it focuses on
                what the person can do (detect and assess defects) rather than mandating a specific qualification
                or job title. However, in practice, meeting this definition requires a substantial combination
                of training, knowledge, and hands-on experience with scaffolding.
              </p>

              {/* Diagram: Competent Person Requirements */}
              <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-slate-500/20">
                <h3 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Competent Person Requirements &mdash; Three Pillars of Competence
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-slate-500/10 border border-slate-500/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-slate-500/20 border border-slate-500/30 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-2">Theoretical Knowledge</p>
                    <ul className="text-xs text-white/70 text-left space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Understanding of the Work at Height Regulations 2005</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Knowledge of scaffold design principles and loading</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Understanding of TG20 and NASC guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Knowledge of scaffold component specifications</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-500/10 border border-slate-500/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-slate-500/20 border border-slate-500/30 rounded-full flex items-center justify-center">
                      <Eye className="h-5 w-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-2">Practical Experience</p>
                    <ul className="text-xs text-white/70 text-left space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Hands-on experience with scaffold erection and dismantling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Ability to identify worn, damaged, or defective components</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Experience of inspecting different scaffold types</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Familiarity with common defects and failure modes</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-500/10 border border-slate-500/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-slate-500/20 border border-slate-500/30 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-2">Relevant Training</p>
                    <ul className="text-xs text-white/70 text-left space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>CISRS scaffold inspection training (for scaffolders)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>CISRS SITS course (for non-scaffolders)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>CITB scaffold inspection course</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Ongoing CPD to maintain up-to-date knowledge</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-3 italic">
                  All three pillars must be present. Training alone is not sufficient without experience, and
                  experience alone is not sufficient without formal training and up-to-date knowledge.
                </p>
              </div>

              <p>
                In practice, the following categories of people are generally considered competent to inspect
                scaffolds, provided they meet the combined requirements of training, knowledge, and experience:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>CISRS Advanced Scaffolders</strong> &mdash; holders of a current CISRS Advanced Scaffolder card have undergone extensive training in scaffold erection, alteration, and dismantling, and inspection is a core part of their training programme. They are widely accepted as competent to carry out scaffold inspections</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>CISRS Scaffolders</strong> &mdash; holders of a current CISRS Scaffolder card (as distinct from Advanced Scaffolder) are trained in basic scaffold erection and are generally competent to inspect basic scaffolds within the scope of their training. For complex or non-standard scaffolds, an Advanced Scaffolder or scaffold design engineer may be more appropriate</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>SITS card holders</strong> &mdash; non-scaffolders (site managers, supervisors, safety officers) who have completed the CISRS Scaffold Inspection Training Scheme and hold a current SITS card are recognised as competent to inspect scaffolds within the scope of their training</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Scaffold design engineers</strong> &mdash; qualified structural or scaffold design engineers with relevant experience may also be competent to carry out inspections, particularly for complex or non-standard scaffold structures</span>
                </li>
              </ul>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Who Is NOT Competent</p>
                </div>
                <p className="text-sm text-white/80">
                  A person who has not received specific scaffold inspection training, who does not understand
                  scaffold design and loading principles, or who cannot identify defects and assess their
                  significance is <strong>not a competent person</strong> for the purposes of Regulation 12,
                  regardless of their job title, seniority, or length of service in construction. A general
                  labourer, an untrained operative, or a manager with no scaffold-specific training should
                  never carry out formal scaffold inspections. Appointing an incompetent person to carry out
                  inspections provides a false sense of security and can itself lead to prosecution if an
                  incident occurs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 07: CISRS Scaffold Inspection Training               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">07</span>
              CISRS Scaffold Inspection Training
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Construction Industry Scaffolders Record Scheme (CISRS)</strong> is the UK&rsquo;s
                industry-recognised training and competence scheme for scaffolders and scaffold inspectors.
                CISRS is managed by the <strong>National Access and Scaffolding Confederation (NASC)</strong>
                and the <strong>Construction Industry Training Board (CITB)</strong>. It provides a structured
                training pathway from trainee scaffolder through to advanced scaffolder, and also offers
                specific inspection training for both scaffolders and non-scaffolders.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">CISRS Inspection Training Pathway</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">CISRS Scaffold Inspection Training Scheme (SITS)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The SITS course is specifically designed for <strong>non-scaffolders</strong> who need
                      to inspect scaffolds as part of their role. This includes site managers, project managers,
                      site supervisors, health and safety officers, and other construction professionals. The
                      course typically runs over 2 days and covers: the legal framework for scaffold inspection
                      (WAH Regulations 2005, CDM 2015), types of scaffold and their components, how to identify
                      common defects and hazards, how to assess whether a scaffold is safe for use, how to
                      complete inspection reports in accordance with Schedule 7, the scaffold tag system, and
                      practical exercises involving the inspection of real scaffolds. Successful completion leads
                      to the issue of a CISRS SITS card, which is valid for 5 years.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">CISRS Scaffolder Training (Core Programme)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Qualified CISRS scaffolders (both Part 1 and Part 2 / Advanced) receive scaffold inspection
                      training as an integral part of their core training programme. The CISRS scaffolder training
                      pathway includes: Scaffolder Trainee (minimum 6 months&rsquo; on-site experience plus
                      assessment), Scaffolder (Part 1, typically after 12&ndash;18 months plus further
                      assessment), and Advanced Scaffolder (Part 2, after further experience and a 2-week advanced
                      course plus assessment). At each level, inspection skills are developed and assessed, with
                      the Advanced Scaffolder qualification providing the highest level of inspection competence
                      within the CISRS framework.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">CITB Scaffold Inspection Course</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The CITB also offers its own scaffold inspection course, which covers similar content to
                      the CISRS SITS course and is aimed at non-scaffolders. The CITB course is another
                      recognised route to demonstrating competence for scaffold inspection. Both the CISRS SITS
                      and CITB courses are accepted by principal contractors, the HSE, and the wider construction
                      industry as evidence that the holder has received appropriate scaffold inspection training.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                It is important to understand that <strong>holding a SITS card or a CISRS scaffolder card
                alone does not make a person competent</strong>. The card is evidence of training, which is
                one of the three pillars of competence. The card holder must also have relevant practical
                experience and up-to-date knowledge. A person who completed a SITS course 4 years ago but
                has not inspected a scaffold since is unlikely to be genuinely competent, even though their
                card may still be valid. Competence must be maintained through regular practice and
                continuing professional development.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Principal Contractor Requirements</p>
                </div>
                <p className="text-sm text-white/80">
                  Most major principal contractors in the UK now require evidence of specific scaffold
                  inspection training before allowing anyone to carry out formal 7-day inspections on their
                  sites. This typically means a current CISRS SITS card (for non-scaffolders) or a current
                  CISRS Scaffolder / Advanced Scaffolder card (for scaffolders). Some principal contractors
                  also require inspectors to demonstrate ongoing CPD and to attend refresher training at
                  specified intervals. The scaffold management plan for the site should clearly identify
                  who is responsible for carrying out inspections and what evidence of competence they hold.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 08: Inspection Within the Working Day                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">08</span>
              Inspection Within the Working Day
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A scaffold inspection under Regulation 12 must be carried out <strong>within the working
                day</strong> &mdash; that is, during normal working hours when the scaffold can be properly
                accessed and examined in adequate light conditions. The inspection must be completed before
                work commences on the scaffold, or at the very latest before the end of the working day on
                which it is due. The purpose of this requirement is to ensure that the inspection is
                thorough, that the inspector can physically access all parts of the scaffold, and that any
                defects can be identified and addressed before workers are placed at risk.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Practical Timing Considerations</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Early Morning Inspections</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Many sites carry out the 7-day inspection first thing in the morning, before the trades
                      arrive and begin work. This is considered best practice for several reasons: the scaffold
                      is unloaded and unoccupied, making it easier to inspect; any changes or damage that
                      occurred overnight (weather, unauthorised access, vandalism) can be detected before
                      workers are exposed to risk; and if defects are found, there is time to rectify them
                      before the working day begins, minimising disruption to the site programme. On sites
                      with multiple scaffolds, the inspection programme should be planned so that all scaffolds
                      are inspected within their 7-day cycle without causing bottlenecks at the start of the day.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Post-Event Inspections &mdash; Timing</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      After an event likely to have affected stability (such as overnight high winds), the
                      inspection must be carried out <strong>before the scaffold is used again</strong>. This
                      means the scaffold should be taken out of service (red-tagged) until the inspection is
                      complete. Workers must not be permitted to access the scaffold until the competent person
                      has confirmed it is safe. This may require the competent person to attend site at short
                      notice, and the scaffold management plan should include arrangements for this.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">The 24-Hour Report Deadline</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      While the inspection itself must be carried out within the working day, the formal written
                      report must be completed <strong>within 24 hours</strong> of the inspection taking place.
                      This allows the inspector time to compile their findings into a properly structured report
                      that meets the requirements of Schedule 7. Many inspectors now use digital inspection
                      apps on tablets or smartphones, which allow the report to be completed in real time as
                      the inspection progresses, with photographs attached as evidence. This approach ensures
                      the report is completed immediately and provides a more comprehensive record than a
                      hand-written report completed from memory later in the day.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                In addition to the formal 7-day inspection required by Regulation 12, many sites implement
                a system of <strong>daily pre-use visual checks</strong>. These are not formal inspections
                under the regulations, but they provide an additional layer of protection by detecting
                obvious defects (missing boards, damaged guard rails, displaced ties, overloaded platforms)
                at the start of each working day. The daily check is typically carried out by the scaffold
                user&rsquo;s supervisor or foreman and recorded in a simple checklist format. If the daily
                check reveals any concerns, the scaffold should be taken out of service and a formal
                inspection carried out by a competent person before it is used again.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Inspection Report Requirements (Schedule 7)</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Every inspection under Regulation 12 must result in a written report containing the
                  following information as specified in Schedule 7 of the Work at Height Regulations 2005:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong>Name and address</strong> of the person for whom the inspection was carried out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong>Location and description</strong> of the workplace or work equipment inspected (sufficient to identify the specific scaffold)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong>Date and time</strong> of the inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong>Details of any matters identified</strong> that could give rise to a risk to the health or safety of any person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong>Details of any action taken</strong> as a result of the matters identified during the inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong>Details of any further action considered necessary</strong> &mdash; actions that could not be completed immediately and require follow-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong>Name and position</strong> of the person who carried out the inspection</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Report Retention</p>
                <p className="text-sm text-white/80">
                  The completed inspection report must be kept at the site where the inspection was carried
                  out for as long as the construction work continues at that site. After the construction work
                  is completed, the reports must be kept at the office of the person for whom the inspection
                  was carried out for a further period of <strong>3 months</strong>. In practice, many
                  companies retain inspection reports for much longer than the statutory minimum &mdash;
                  typically for the duration of the project plus several years &mdash; as they may be required
                  as evidence in the event of a future legal claim or investigation.
                </p>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Key Takeaway:</strong> Scaffold inspection is not a
                  tick-box exercise. It is a critical safety function that requires a competent person to
                  physically examine the scaffold, identify defects, assess their significance, and take
                  appropriate action. The legal framework &mdash; Regulation 12, Schedule 7, and the
                  competent person definition &mdash; exists to ensure that inspections are carried out
                  properly, at the right times, by the right people, and that the results are formally
                  recorded and retained. Every person who works on or near a scaffold has a right to know
                  that it has been properly inspected and is safe for use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-4-section-2">
              The Inspection Process
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
