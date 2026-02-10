import {
  ArrowLeft,
  Scale,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  HardHat,
  Shield,
  FileWarning,
  Gavel,
  ClipboardCheck,
  Eye,
  Users,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under the Health and Safety at Work etc. Act 1974, Section 20, what is the primary power granted to HSE inspectors?",
    options: [
      "The power to issue fines directly without court proceedings",
      "The right of entry to any workplace at any reasonable time, or at any time if they believe a dangerous situation exists",
      "The power to arrest individuals on site",
      "The power to close a business permanently",
    ],
    correctAnswer: 1,
    explanation:
      "Section 20 of HASAWA 1974 grants HSE inspectors the right of entry to any workplace at any reasonable time, or at any time if the inspector has reasonable cause to believe a situation exists that may be dangerous. This right of entry is the foundation of all HSE enforcement powers and cannot be refused by the duty holder. Obstruction of an inspector is itself a criminal offence.",
  },
  {
    id: 2,
    question:
      "What is the minimum period an improvement notice must allow for the duty holder to comply?",
    options: [
      "7 days",
      "14 days",
      "21 days",
      "28 days",
    ],
    correctAnswer: 2,
    explanation:
      "An improvement notice must allow a minimum of 21 days for the duty holder to comply. The inspector may allow longer if the remedial work requires it. Crucially, the 21-day period also represents the window within which the duty holder can appeal the notice to an Employment Tribunal. During the appeal period, the improvement notice is suspended — meaning the duty holder does not have to comply until the appeal is determined.",
  },
  {
    id: 3,
    question:
      "What happens when a prohibition notice is appealed to an Employment Tribunal?",
    options: [
      "The notice is automatically suspended during the appeal, just like an improvement notice",
      "The notice remains in force unless the tribunal specifically orders otherwise — the dangerous activity must remain stopped",
      "The appeal cancels the notice immediately",
      "The HSE must withdraw the notice pending the tribunal hearing",
    ],
    correctAnswer: 1,
    explanation:
      "Unlike an improvement notice (which is suspended during appeal), a prohibition notice remains in force even when an appeal is lodged. The dangerous activity must remain stopped unless the Employment Tribunal specifically orders that the notice be suspended. This reflects the serious nature of prohibition notices — they are issued because the inspector believes there is a risk of serious personal injury, so the activity cannot be allowed to continue while the appeal is heard.",
  },
  {
    id: 4,
    question:
      "Under the Sentencing Council's Health and Safety Offences guidelines (2016), what is the primary factor used to calculate the starting point for fines against organisations?",
    options: [
      "The number of workers employed",
      "The annual turnover of the organisation",
      "The number of previous convictions",
      "The cost of remedying the breach",
    ],
    correctAnswer: 1,
    explanation:
      "The Sentencing Council's 2016 guidelines introduced a turnover-based approach to health and safety fines for organisations. The court assesses culpability (low, medium, high, very high) and harm (categories 1-4), then uses the organisation's annual turnover to determine the starting point and range for the fine. This means larger organisations face proportionally larger fines. The guidelines were specifically designed to ensure fines are large enough to have a real economic impact on the offender.",
  },
  {
    id: 5,
    question:
      "Under RIDDOR 2013, within what timescale must a fatal or specified injury be reported to the HSE?",
    options: [
      "Within 24 hours",
      "Without delay — as soon as practicable, and a written report within 10 days",
      "Within 15 days",
      "Within 7 days",
    ],
    correctAnswer: 1,
    explanation:
      "Fatal injuries and specified injuries (such as fractures other than to fingers, thumbs, or toes, amputations, crush injuries, loss of consciousness, and others listed in Regulation 4) must be reported without delay. The responsible person must notify the HSE by the quickest practicable means (typically by telephone to the Incident Contact Centre), followed by a written report via the online system within 10 days. Over-7-day injuries have a longer reporting window of 15 days.",
  },
  {
    id: 6,
    question:
      "What is the current Fee for Intervention (FFI) rate charged by the HSE when a material breach of health and safety law is identified?",
    options: [
      "No fee is charged — HSE enforcement is funded by taxation",
      "A flat fee of \u00a31,000 per breach",
      "\u00a3171 per hour for the time spent by the HSE dealing with the material breach",
      "\u00a350 per hour for investigator time only",
    ],
    correctAnswer: 2,
    explanation:
      "The Fee for Intervention (FFI) scheme requires duty holders who are found to be in material breach of health and safety law to pay for the time the HSE spends identifying the breach, investigating it, and taking enforcement action. The current rate is \u00a3171 per hour. This can quickly accumulate to thousands of pounds, especially where multiple breaches are found or where the investigation is complex. FFI applies regardless of whether formal enforcement action (improvement notice, prohibition notice, or prosecution) follows.",
  },
  {
    id: 7,
    question:
      "What is the difference between active monitoring and reactive monitoring in the context of ongoing CDM compliance?",
    options: [
      "Active monitoring focuses on past incidents; reactive monitoring focuses on preventing future incidents",
      "Active monitoring involves proactive inspections, audits, and observations before incidents occur; reactive monitoring involves investigating incidents, near misses, and ill health after they occur",
      "There is no difference — they are interchangeable terms",
      "Active monitoring is carried out by the HSE; reactive monitoring is carried out by the principal contractor",
    ],
    correctAnswer: 1,
    explanation:
      "Active monitoring is proactive — it involves planned safety inspections, compliance audits, behavioural observations, and checking that control measures are working before anything goes wrong. Reactive monitoring is responsive — it involves investigating incidents, accidents, near misses, and cases of ill health after they have occurred. Both are essential: active monitoring helps prevent incidents, while reactive monitoring helps learn from them. The construction phase plan should include both types.",
  },
  {
    id: 8,
    question:
      "Under the Corporate Manslaughter and Corporate Homicide Act 2007, which of the following sanctions can a court impose on an organisation convicted of corporate manslaughter?",
    options: [
      "Imprisonment of company directors for up to 14 years",
      "An unlimited fine, a publicity order requiring the organisation to publicise its conviction, and a remedial order requiring it to address the management failures",
      "A fixed fine of \u00a3500,000 and a ban on future construction work",
      "Community service orders for senior management",
    ],
    correctAnswer: 1,
    explanation:
      "The Corporate Manslaughter and Corporate Homicide Act 2007 provides for three sanctions against convicted organisations: an unlimited fine (which in practice has reached tens of millions of pounds), a publicity order (requiring the organisation to publicise its conviction, the fine, and the reasons in a specified manner), and a remedial order (requiring it to take specified steps to remedy the management failure that led to the death). Notably, the Act does not provide for imprisonment of individuals — that remains available under HASAWA 1974 and other legislation for individual offenders.",
  },
];

const quickCheckQuestions = [
  {
    question:
      "An HSE inspector arrives at a construction site and asks to enter. The site manager says the principal contractor is not available and asks the inspector to come back tomorrow. Can the inspector insist on entering the site?",
    options: [
      "No — the inspector must make an appointment and return when the PC is available",
      "Yes — HSE inspectors have the right of entry under HASAWA 1974 Section 20 and do not need permission or an appointment. Obstructing an inspector is a criminal offence",
      "Only if the inspector has a warrant issued by a magistrate",
      "Only if there is an active investigation already underway",
    ],
    correctIndex: 1,
    explanation:
      "HSE inspectors have the statutory right of entry to any workplace at any reasonable time under Section 20 of HASAWA 1974. They do not need to make an appointment, and they do not need the permission of the site manager or principal contractor. Deliberately obstructing or preventing an inspector from exercising their powers is itself a criminal offence under Section 33 of HASAWA 1974. The inspector can insist on immediate entry and can exercise all their investigatory powers regardless of who is or is not available on site.",
  },
  {
    question:
      "A construction company receives a prohibition notice stopping work on scaffolding. The company immediately lodges an appeal with the Employment Tribunal. Can they resume the scaffolding work while the appeal is being heard?",
    options: [
      "Yes — lodging an appeal automatically suspends any enforcement notice",
      "No — a prohibition notice remains in force during an appeal unless the tribunal specifically orders otherwise. The scaffolding work must remain stopped",
      "Yes — but only if the company provides a written risk assessment to the HSE",
      "No — but they can apply to the HSE for a temporary exemption",
    ],
    correctIndex: 1,
    explanation:
      "This is one of the most important distinctions in enforcement law. An improvement notice is suspended when an appeal is lodged — the duty holder does not have to comply during the appeal. A prohibition notice, however, is NOT suspended by an appeal. The dangerous activity must remain stopped unless and until the Employment Tribunal specifically orders that the notice be suspended (which is rare, given that prohibition notices are issued where there is a risk of serious personal injury). Resuming the prohibited activity before the appeal is determined would be a criminal offence.",
  },
  {
    question:
      "A worker falls from a height of 3 metres on a construction site and fractures their wrist. They are taken to hospital and are unable to work for 10 days. Under RIDDOR 2013, what reporting obligation does this trigger?",
    options: [
      "No reporting obligation — the injury is minor",
      "The responsible person must report it as a specified injury (fracture) without delay by the fastest practicable means, followed by a written report within 10 days via the online RIDDOR system",
      "It only needs to be reported as an over-7-day injury within 15 days",
      "It only needs to be recorded in the site accident book — no RIDDOR report is required",
    ],
    correctIndex: 1,
    explanation:
      "A fracture (other than to fingers, thumbs, or toes) is a specified injury under RIDDOR 2013, regardless of how long the worker is off work. Specified injuries must be reported without delay — the responsible person (usually the employer or the principal contractor) must notify the HSE by the fastest practicable means (telephone to the Incident Contact Centre), followed by a written report within 10 days. The over-7-day injury category would only apply if the injury was NOT a specified injury but resulted in the worker being incapacitated for more than 7 consecutive days. Always check the specified injuries list first.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between an improvement notice and a prohibition notice?",
    answer:
      "An improvement notice is issued when an inspector believes a contravention of health and safety law has occurred and can be remedied. It requires the duty holder to put things right within a specified period (minimum 21 days). The notice is suspended if an appeal is lodged. A prohibition notice is more serious — it is issued when an inspector believes there is a risk of serious personal injury. It takes immediate effect and stops the activity until the risk is removed. Crucially, a prohibition notice is NOT suspended by an appeal — the activity must remain stopped unless the Employment Tribunal specifically orders otherwise. Think of an improvement notice as 'fix this within a deadline' and a prohibition notice as 'stop this now'.",
  },
  {
    question:
      "Can an individual worker be prosecuted under CDM 2015 or HASAWA 1974, or is it only organisations?",
    answer:
      "Both individuals and organisations can be prosecuted. Under HASAWA 1974, Section 37 provides that where an offence by a body corporate is proved to have been committed with the consent or connivance of, or attributable to neglect by, a director, manager, secretary, or similar officer, that individual can be prosecuted personally alongside the organisation. Under CDM 2015, individual duty holders (such as a principal designer or principal contractor who is a sole trader) can be prosecuted directly. In the Crown Court, individuals face unlimited fines and up to 2 years' imprisonment. The Corporate Manslaughter Act 2007 applies only to organisations — but the individuals within those organisations can still be prosecuted under HASAWA 1974.",
  },
  {
    question:
      "How does the Fee for Intervention (FFI) work, and is it possible to challenge it?",
    answer:
      "FFI applies when an HSE inspector identifies a material breach of health and safety law — meaning a breach that is serious enough to warrant at least a notification letter. The HSE then charges the duty holder for the time spent dealing with the breach at a rate of \u00a3171 per hour. This covers the inspector's time investigating, writing reports, issuing notices, and any follow-up visits. FFI invoices can be challenged through the HSE's dispute process. Common grounds for challenge include: disputing that a material breach existed, disputing the number of hours charged, or arguing that certain activities were not related to the breach. If the dispute is not resolved, the duty holder can escalate to an independent review. However, FFI cannot be challenged simply on the basis that the duty holder disagrees with the policy — it is a statutory scheme under the Health and Safety (Fees) Regulations 2012.",
  },
  {
    question:
      "What is the role of leading indicators versus lagging indicators in monitoring CDM compliance?",
    answer:
      "Lagging indicators measure what has already gone wrong — incident rates, injury frequency, enforcement notices received, days lost to accidents. They are important but they are backward-looking. Leading indicators measure proactive safety activities — training completion rates, safety inspection frequency, near-miss reporting rates, toolbox talk attendance, construction phase plan reviews completed. Leading indicators predict future safety performance: a site where inspections are being done regularly, workers are trained, and near misses are reported is less likely to have a serious incident. Best practice is to monitor both: use leading indicators to drive continuous improvement and lagging indicators to validate that the approach is working. The construction phase plan should specify which indicators will be monitored, by whom, and at what frequency.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function CdmRegulationsModule5Section4() {
  useSEO({
    title:
      "Monitoring, Review & Enforcement | CDM Regulations Module 5.4",
    description:
      "HSE enforcement of CDM 2015: inspector powers, improvement notices, prohibition notices, prosecution, penalties, RIDDOR reporting, monitoring, and building a compliance culture.",
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">
              Module 5 {"\u2022"} Section 4
            </p>
            <h1 className="text-sm font-semibold text-white truncate">
              Monitoring, Review & Enforcement
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <Scale className="h-8 w-8 text-blue-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              MODULE 5 {"\u2022"} SECTION 4
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Monitoring, Review & Enforcement
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            How CDM 2015 is enforced by the HSE, the powers of inspectors,
            the escalation from advice to prosecution, and the importance
            of ongoing monitoring, review, and a genuine compliance culture
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            The Health and Safety Executive (HSE) is the primary enforcer of
            CDM 2015. HSE inspectors have extensive powers under HASAWA 1974,
            including the right of entry to any workplace. Enforcement
            escalates from verbal advice through improvement notices (minimum
            21 days to comply), prohibition notices (immediate stop), and
            prosecution (unlimited fines, up to 2 years&apos; imprisonment).
            The most serious cases may involve corporate manslaughter charges.
            Duty holders must also report incidents under RIDDOR 2013 and
            maintain ongoing active and reactive monitoring to ensure
            continued compliance throughout the project lifecycle.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            On Site
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Enforcement is not something that only happens to other sites.
            HSE inspectors carry out both planned inspections and unannounced
            visits. If an inspector arrives on your site, cooperate fully
            — obstruction is a criminal offence. Know what triggers a
            RIDDOR report. Understand that monitoring is everyone&apos;s
            responsibility: report hazards, attend toolbox talks, and never
            ignore a near miss. A site that monitors proactively is far
            less likely to face enforcement action than one that only reacts
            after something goes wrong.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Describe the role and structure of the HSE as the primary enforcer of CDM 2015, including the Fee for Intervention scheme",
              "Explain the powers of HSE inspectors under Section 20 of HASAWA 1974",
              "Distinguish between improvement notices and prohibition notices, including appeal processes",
              "Outline the penalties available for health and safety offences, including the Sentencing Council guidelines (2016)",
              "Describe RIDDOR 2013 reporting requirements: what, who, when, and how",
              "Explain the difference between active monitoring and reactive monitoring in ongoing CDM compliance",
              "Identify leading and lagging indicators used to measure safety performance",
              "Describe the elements of a genuine compliance culture that goes beyond legal minimums",
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — The Health and Safety Executive (HSE)           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-xl font-semibold text-white">
              The Health and Safety Executive (HSE)
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Health and Safety Executive (HSE) is the independent regulator
              responsible for enforcing health and safety law in Great Britain,
              including CDM 2015. Established under the Health and Safety at Work
              etc. Act 1974, the HSE has a dual role: it promotes good health and
              safety practice through guidance, education, and industry engagement,
              and it enforces the law through inspections, investigations, and
              prosecution where necessary. The HSE is not a government department
              — it is a non-departmental public body that operates independently
              to ensure impartiality in its enforcement decisions.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                HSE Structure and Organisation
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Construction Division
                    </strong>{" "}
                    — a specialist division within the HSE dedicated to the
                    construction industry. Employs inspectors with specific
                    construction knowledge and experience. Leads the HSE&apos;s
                    strategy for reducing death, injury, and ill health in
                    construction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Inspectors
                    </strong>{" "}
                    — HSE inspectors are warranted officers with legal powers
                    under HASAWA 1974. They carry out planned inspections,
                    investigate complaints and incidents, and take enforcement
                    action where necessary. Construction inspectors typically
                    have engineering, building, or health and safety qualifications
                    and significant industry experience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Specialist Teams
                    </strong>{" "}
                    — the HSE has specialist teams covering areas such as
                    occupational health, major hazards, and workplace transport.
                    These teams can be called upon to support construction
                    inspections where specialist knowledge is required (e.g.,
                    asbestos, structural collapse, chemical exposure)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Proactive Inspection Programmes
                    </strong>{" "}
                    — the HSE runs targeted inspection programmes focused on
                    high-risk sectors and activities. In construction, these
                    often target work at height, refurbishment, small
                    contractors, and specific trades (such as roofing and
                    demolition). Sites may be inspected without prior notice
                    as part of these programmes
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Fee for Intervention (FFI)
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Since October 2012, the HSE operates a Fee for Intervention
                scheme. When an HSE inspector identifies a{" "}
                <strong className="text-white">material breach</strong> of
                health and safety law — meaning a breach serious enough to
                warrant the inspector writing to the duty holder — the duty
                holder must pay the HSE&apos;s costs. The current rate is{" "}
                <strong className="text-white">&pound;171 per hour</strong>.
                This covers all time spent by the HSE dealing with the breach:
                the inspection itself, follow-up investigations, correspondence,
                and any enforcement action. FFI invoices can accumulate
                rapidly — a single site visit involving multiple breaches can
                cost thousands of pounds before any fine or enforcement notice
                is even considered. FFI is separate from and additional to any
                fines imposed by the courts.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                The HSE&apos;s Enforcement Policy Statement
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The HSE publishes an Enforcement Policy Statement that sets
                out the principles guiding its enforcement decisions. These
                include: enforcement action should be proportionate to the
                risk and the seriousness of the breach; enforcement should be
                consistent — similar situations should be treated similarly;
                enforcement should be targeted at those with primary
                responsibility; and enforcement decisions should be
                transparent — duty holders should understand what is expected
                of them and why action has been taken. The HSE uses an
                Enforcement Management Model (EMM) to guide inspectors in
                making consistent enforcement decisions.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 — HSE Inspector Powers                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-xl font-semibold text-white">
              HSE Inspector Powers
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              HSE inspectors derive their powers from Section 20 of the Health
              and Safety at Work etc. Act 1974 (HASAWA 1974). These powers are
              extensive and are designed to enable thorough investigation of
              workplace health and safety conditions. It is a criminal offence
              under Section 33 of HASAWA 1974 to intentionally obstruct an
              inspector in the exercise of their powers, or to fail to comply
              with a requirement made by an inspector.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Scale className="h-4 w-4 text-blue-400" />
                Powers Under HASAWA 1974 Section 20
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Right of entry
                    </strong>{" "}
                    — an inspector may enter any premises at any reasonable time,
                    or at any time if they have reasonable cause to believe a
                    dangerous situation exists. No appointment or permission is
                    required. The inspector must produce their warrant of
                    appointment if asked to do so
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Inspect and examine
                    </strong>{" "}
                    — the power to carry out any examination and investigation
                    that the inspector considers necessary. This includes
                    inspecting plant, equipment, substances, working methods,
                    and documentation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Take measurements, photographs, and samples
                    </strong>{" "}
                    — the inspector may take any measurements, photographs, or
                    recordings they consider necessary. They may take samples
                    of any articles or substances found on the premises
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Require documents
                    </strong>{" "}
                    — the inspector may require the production of, inspect, and
                    take copies of any books, documents, or records (including
                    those kept electronically) that they consider relevant. This
                    includes risk assessments, method statements, the
                    construction phase plan, training records, and any other
                    documentation relating to health and safety
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Interview under caution
                    </strong>{" "}
                    — the inspector may require any person to answer questions
                    and sign a declaration of the truth of their answers. In
                    cases where criminal proceedings may follow, interviews are
                    conducted under caution in accordance with PACE (Police and
                    Criminal Evidence Act 1984) procedures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Seize and render harmless
                    </strong>{" "}
                    — where the inspector considers that any article or substance
                    is a cause of imminent danger of serious personal injury,
                    they may seize it and cause it to be rendered harmless
                    (whether by destruction or otherwise)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                The Cooperation Duty
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                All persons on a construction site have a duty to cooperate
                with HSE inspectors. This means answering questions truthfully,
                providing access to all areas of the site, producing documents
                when requested, and not interfering with any investigation.
                Intentional obstruction of an inspector — including refusing
                entry, hiding documents, providing false information, or
                instructing workers not to speak to the inspector — is a
                criminal offence punishable by a fine and, in some cases,
                imprisonment. Even where an investigation may lead to
                prosecution, the duty to cooperate remains, subject to the
                privilege against self-incrimination (which is why formal
                interviews are conducted under PACE caution).
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 — after Section 2 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 — Improvement Notices                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-xl font-semibold text-white">
              Improvement Notices
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              An improvement notice is issued by an HSE inspector when they
              are of the opinion that a person is contravening one or more
              statutory provisions, or has contravened one or more statutory
              provisions in circumstances that make it likely that the
              contravention will continue or be repeated. The improvement
              notice is the most common formal enforcement tool used by the
              HSE on construction sites.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <FileWarning className="h-4 w-4 text-blue-400" />
                Improvement Notice — Key Features
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">When issued</strong> — the
                    inspector believes there is a contravention of health and
                    safety law that is occurring or is likely to recur. The
                    contravention must be capable of being remedied
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Content</strong> — the notice
                    must state the inspector&apos;s opinion, specify the
                    statutory provision being contravened, give reasons for
                    the opinion, and require the person to remedy the
                    contravention (or the matters giving rise to it) within a
                    specified period
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Compliance period</strong> —
                    minimum 21 days from the date of service. The inspector may
                    allow a longer period if the remedial work is complex or
                    requires time to arrange
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Appeal</strong> — the
                    recipient can appeal to an Employment Tribunal within 21
                    days of service. Crucially,{" "}
                    <strong className="text-white">
                      the improvement notice is suspended during the appeal
                    </strong>{" "}
                    — the duty holder does not have to comply until the appeal
                    is determined
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Failure to comply
                    </strong>{" "}
                    — failing to comply with an improvement notice within the
                    specified period is a criminal offence. On conviction in the
                    magistrates&apos; court or Crown Court, the offender faces
                    an unlimited fine and potentially imprisonment
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Common Construction Improvement Notice Examples
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Improvement notices on construction sites commonly relate to:
                inadequate welfare facilities (dirty toilets, no hot water),
                deficient risk assessments or method statements, failure to
                maintain the construction phase plan, inadequate edge protection
                or scaffolding standards, poor housekeeping creating trip or
                fire hazards, lack of worker training records, and failure to
                properly manage asbestos-containing materials during
                refurbishment. The notice will specify exactly what is wrong
                and what must be done to comply, giving the duty holder a clear
                path to remediation.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — Prohibition Notices                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">
              04
            </span>
            <h3 className="text-xl font-semibold text-white">
              Prohibition Notices
            </h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A prohibition notice is the most serious enforcement tool
              available to an HSE inspector short of prosecution. It is issued
              when the inspector is of the opinion that the activities being
              carried on, or about to be carried on, involve or will involve
              a risk of serious personal injury. The prohibition notice is a
              powerful instrument because it takes immediate effect and
              requires the dangerous activity to stop.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                Prohibition Notice — Key Features
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">When issued</strong> — the
                    inspector believes there is a risk of serious personal
                    injury from the activity being carried on (or about to be
                    carried on). A contravention need not have already occurred
                    — the test is the risk of serious injury
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Immediate or deferred effect
                    </strong>{" "}
                    — most prohibition notices take immediate effect, meaning
                    the activity must stop at once. However, an inspector may
                    issue a deferred prohibition notice that takes effect at a
                    specified future time, allowing a brief period to make the
                    area safe before the full stoppage begins
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      The activity must cease
                    </strong>{" "}
                    — the prohibited activity cannot resume until the matters
                    specified in the notice have been remedied. This can have
                    significant consequences for a construction project: a
                    prohibition notice stopping scaffolding work can halt an
                    entire building phase
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Appeal does NOT suspend the notice
                    </strong>{" "}
                    — unlike an improvement notice, appealing a prohibition
                    notice does NOT automatically suspend it. The activity
                    must remain stopped unless the Employment Tribunal
                    specifically orders that the notice be suspended. This
                    reflects the seriousness of the risk involved
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      More serious than improvement notices
                    </strong>{" "}
                    — prohibition notices indicate a higher level of risk and
                    are a stronger indicator of management failure. Receiving
                    a prohibition notice is a significant event for any
                    construction company and should trigger an immediate
                    management review
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Common Construction Prohibition Notices
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The most common triggers for prohibition notices on
                construction sites include: unsafe work at height (missing
                edge protection, inadequate scaffolding, unprotected
                openings), unsafe excavations (no shoring, risk of collapse),
                unsafe demolition methods, lack of segregation between
                vehicles and pedestrians, live electrical work without
                adequate precautions, and structural instability where there
                is a risk of collapse. In each case, the inspector has
                concluded that someone could be seriously injured or killed if
                the activity continues.
              </p>
            </div>

            {/* Key Comparison Box */}
            <div className="bg-gradient-to-br from-blue-500/10 to-red-500/10 border border-white/20 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <Scale className="h-4 w-4 text-blue-400" />
                Improvement Notice vs Prohibition Notice — Key Differences
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-blue-400 font-semibold text-xs mb-2">
                    Improvement Notice
                  </p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li>&#8226; Based on a contravention of law</li>
                    <li>&#8226; Minimum 21 days to comply</li>
                    <li>&#8226; Work can continue while complying</li>
                    <li>&#8226; Appeal suspends the notice</li>
                    <li>&#8226; Lower severity</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 font-semibold text-xs mb-2">
                    Prohibition Notice
                  </p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li>&#8226; Based on risk of serious personal injury</li>
                    <li>&#8226; Immediate effect (or deferred)</li>
                    <li>&#8226; Activity must stop immediately</li>
                    <li>&#8226; Appeal does NOT suspend the notice</li>
                    <li>&#8226; Higher severity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 — after Section 4 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — Prosecution and Penalties                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">
              05
            </span>
            <h3 className="text-xl font-semibold text-white">
              Prosecution and Penalties
            </h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The HSE can prosecute individuals and organisations for criminal
              offences under CDM 2015 and the Health and Safety at Work etc.
              Act 1974. Prosecution is reserved for the most serious cases:
              where there has been a death or serious injury, where there is a
              flagrant disregard for the law, where there has been a failure
              to comply with an enforcement notice, or where the duty holder
              has a history of non-compliance. However, prosecution does not
              require an actual injury — the offence is the failure to comply
              with the duty, regardless of whether harm resulted.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Gavel className="h-4 w-4 text-red-400" />
                Criminal Penalties — Courts and Sanctions
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Magistrates&apos; Court
                    </strong>{" "}
                    — for less serious offences (summary offences).{" "}
                    <strong className="text-white">Unlimited fines</strong>{" "}
                    (since the Legal Aid, Sentencing and Punishment of Offenders
                    Act 2012 removed the cap on magistrates&apos; fines for
                    health and safety offences) and up to{" "}
                    <strong className="text-white">
                      6 months&apos; imprisonment
                    </strong>{" "}
                    for individuals convicted of certain offences
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Crown Court
                    </strong>{" "}
                    — for more serious offences tried on indictment.{" "}
                    <strong className="text-white">Unlimited fines</strong>{" "}
                    and up to{" "}
                    <strong className="text-white">
                      2 years&apos; imprisonment
                    </strong>{" "}
                    for individuals. The most serious construction cases are
                    typically heard in the Crown Court
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Scale className="h-4 w-4 text-blue-400" />
                Sentencing Council Guidelines (2016)
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Turnover-based fines
                    </strong>{" "}
                    — the 2016 Sentencing Council guidelines introduced a
                    framework that uses the organisation&apos;s annual turnover
                    as the basis for calculating fines. Organisations are
                    classified as micro (&pound;2m or less), small
                    (&pound;2m{"\u2013"}&pound;10m), medium
                    (&pound;10m{"\u2013"}&pound;50m), or large (&pound;50m+)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Culpability</strong> —
                    assessed on a four-point scale: low, medium, high, and
                    very high. Very high culpability indicates a deliberate
                    breach or flagrant disregard for the law
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Harm categories (1{"\u2013"}4)
                    </strong>{" "}
                    — ranging from Category 1 (death or physical injury
                    equivalent to GBH) to Category 4 (low risk of harm). The
                    seriousness of actual or potential harm is a key driver of
                    the fine level
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Aggravating and mitigating factors
                    </strong>{" "}
                    — aggravating factors include previous convictions, cost-
                    cutting motivation, and failure to respond to advice.
                    Mitigating factors include good safety record, prompt
                    remedial action, and cooperation with the investigation.
                    These adjust the fine from its starting point
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2 flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                Corporate Manslaughter
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The Corporate Manslaughter and Corporate Homicide Act 2007
                created a specific offence for organisations whose gross
                management failures cause death. The offence applies where
                the way in which an organisation&apos;s activities are managed
                or organised causes a person&apos;s death, and that management
                or organisation amounts to a gross breach of a relevant duty
                of care. A substantial element of the breach must be in the
                way activities were managed by senior management. Sanctions
                include:{" "}
                <strong className="text-white">unlimited fines</strong>{" "}
                (which in practice have reached tens of millions of pounds),{" "}
                <strong className="text-white">publicity orders</strong>{" "}
                (requiring the organisation to publicise its conviction and the
                details of the offence), and{" "}
                <strong className="text-white">remedial orders</strong>{" "}
                (requiring the organisation to take specific steps to address
                the management failures). The Act applies to organisations
                only — individuals cannot be convicted of corporate
                manslaughter, but they can still face prosecution under
                HASAWA 1974.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 — RIDDOR Reporting                                */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              06
            </span>
            <h3 className="text-xl font-semibold text-white">
              RIDDOR Reporting
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Reporting of Injuries, Diseases and Dangerous Occurrences
              Regulations 2013 (RIDDOR) require the responsible person to
              report certain workplace incidents to the HSE. On construction
              sites, RIDDOR reporting is essential for regulatory oversight
              and for learning from incidents. Failure to report a RIDDOR
              event is itself a criminal offence.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-blue-400" />
                What Must Be Reported Under RIDDOR 2013
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Fatal injuries
                    </strong>{" "}
                    — any death of a worker or non-worker arising from a
                    work-related accident. Must be reported immediately by the
                    quickest practicable means (telephone), followed by a
                    written report within 10 days
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Specified injuries (Regulation 4)
                    </strong>{" "}
                    — fractures (other than to fingers, thumbs, or toes),
                    amputations, any injury likely to lead to permanent loss
                    of sight, crush injuries leading to internal organ damage,
                    scalping, any burn covering more than 10% of the body or
                    causing significant damage to the eyes, respiratory system,
                    or internal organs, loss of consciousness caused by head
                    injury or asphyxia, and hypothermia, heat-induced illness,
                    or unconsciousness requiring resuscitation or hospital
                    admission for more than 24 hours
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Over-7-day injuries
                    </strong>{" "}
                    — where a worker is incapacitated for more than 7
                    consecutive days (not counting the day of the incident) as
                    a result of a workplace injury. Must be reported within 15
                    days of the incident
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Dangerous occurrences (Schedule 2)
                    </strong>{" "}
                    — specific near-miss events listed in Schedule 2 of RIDDOR,
                    including: collapse, overturning, or failure of load-bearing
                    parts of lifts and lifting equipment; collapse of scaffolding
                    over 5 metres in height; collapse or partial collapse of a
                    building or structure under construction; unintended collapse
                    of a wall or floor in a place of work; and an explosion or
                    fire causing work stoppage for more than 24 hours
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Occupational diseases
                    </strong>{" "}
                    — certain diseases linked to specific work activities must
                    be reported when diagnosed by a doctor and the worker&apos;s
                    current job involves the associated exposure. Construction-
                    relevant examples include: carpal tunnel syndrome, hand-arm
                    vibration syndrome (HAVS), occupational dermatitis, and
                    occupational asthma
                  </span>
                </li>
              </ul>
            </div>

            {/* RIDDOR Timescales Summary */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/10 border border-blue-500/20 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-blue-400" />
                RIDDOR Reporting Timescales
              </h4>
              <div className="space-y-2">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold mb-2">
                    <span className="text-blue-400">Event Type</span>
                    <span className="text-blue-400">Initial Notification</span>
                    <span className="text-blue-400">Written Report</span>
                  </div>
                  <div className="space-y-1">
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                      <span>Fatal injury</span>
                      <span>Immediate (telephone)</span>
                      <span>Within 10 days</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                      <span>Specified injury</span>
                      <span>Immediate (telephone)</span>
                      <span>Within 10 days</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                      <span>Over-7-day injury</span>
                      <span>Not required</span>
                      <span>Within 15 days</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                      <span>Dangerous occurrence</span>
                      <span>Immediate (telephone)</span>
                      <span>Within 10 days</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                      <span>Occupational disease</span>
                      <span>Not required</span>
                      <span>Without delay</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-xs mt-3 italic">
                Written reports are made online via the HSE&apos;s RIDDOR
                reporting website. The responsible person is typically the
                employer or, on multi-contractor sites, the principal
                contractor.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Point — Who Is the Responsible Person?
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                On a construction site, the responsible person for RIDDOR
                reporting is usually the employer of the injured person. On
                multi-contractor sites, the principal contractor should have
                arrangements in place to ensure all reportable incidents are
                captured and reported, even if the injured worker is employed
                by a subcontractor. For fatal and specified injuries to non-
                workers (such as members of the public), the person in control
                of the premises — typically the principal contractor — is
                responsible for reporting. Clear reporting procedures should be
                set out in the construction phase plan to avoid any incident
                going unreported.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 — after Section 6 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 — Ongoing Monitoring and Review                   */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              07
            </span>
            <h3 className="text-xl font-semibold text-white">
              Ongoing Monitoring and Review
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Compliance with CDM 2015 is not a one-off exercise completed at
              the start of a project and then forgotten. The duty to manage
              health and safety is ongoing throughout the construction phase.
              The construction phase plan, risk assessments, and method
              statements must be living documents that are monitored, reviewed,
              and updated as work progresses and circumstances change.
              Effective monitoring is a core element of the principal
              contractor&apos;s duty under Regulation 13.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-400" />
                Active Monitoring (Proactive)
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Safety inspections
                    </strong>{" "}
                    — regular planned inspections of the workplace, equipment,
                    and working practices. Frequency should be proportionate to
                    the risk — high-risk activities may require daily
                    inspections, while lower-risk areas may be inspected weekly
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Compliance audits
                    </strong>{" "}
                    — systematic reviews of whether the arrangements set out in
                    the construction phase plan, risk assessments, and method
                    statements are being followed in practice. Are workers
                    actually using the PPE specified? Are exclusion zones being
                    maintained? Are permits to work being properly managed?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Behavioural observations
                    </strong>{" "}
                    — observing how workers actually carry out tasks, looking
                    for unsafe behaviours, shortcuts, and deviations from the
                    agreed safe system of work. Behavioural safety programmes
                    use structured observation to identify and address at-risk
                    behaviours before they cause incidents
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Statutory inspections
                    </strong>{" "}
                    — certain equipment and work arrangements require inspection
                    at prescribed intervals: scaffolding (every 7 days and after
                    adverse weather), lifting equipment (per LOLER 1998), and
                    excavations (per CDM 2015 Regulation 22). Records must be
                    kept
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-400" />
                Reactive Monitoring (Responsive)
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Incident investigation
                    </strong>{" "}
                    — thorough investigation of accidents, injuries, and ill
                    health to identify root causes and prevent recurrence.
                    Investigation should go beyond the immediate cause to
                    examine underlying management and organisational factors
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Near-miss analysis
                    </strong>{" "}
                    — investigating near misses is critical because they reveal
                    hazards and control failures that could cause serious harm
                    in different circumstances. A culture that reports and
                    investigates near misses is far more effective at preventing
                    serious incidents than one that only investigates after
                    someone is hurt
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Enforcement response
                    </strong>{" "}
                    — if the HSE issues an enforcement notice or provides
                    advice following an inspection, the response should include
                    not only complying with the specific requirements but also
                    reviewing whether similar issues exist elsewhere on the
                    site and updating the construction phase plan accordingly
                  </span>
                </li>
              </ul>
            </div>

            {/* Leading vs Lagging Indicators */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/10 border border-blue-500/20 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                Leading Indicators vs Lagging Indicators
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-green-400 font-semibold text-xs mb-2">
                    Leading Indicators (Proactive)
                  </p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li>&#8226; Safety inspection completion rates</li>
                    <li>&#8226; Training and induction completion</li>
                    <li>&#8226; Near-miss reports submitted</li>
                    <li>&#8226; Toolbox talk attendance</li>
                    <li>&#8226; Construction phase plan reviews completed</li>
                    <li>&#8226; Permit-to-work compliance rates</li>
                    <li>&#8226; Behavioural observation scores</li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-amber-400 font-semibold text-xs mb-2">
                    Lagging Indicators (Reactive)
                  </p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li>&#8226; Accident frequency rate (AFR)</li>
                    <li>&#8226; Injury incidence rate</li>
                    <li>&#8226; Days lost to injury/ill health</li>
                    <li>&#8226; RIDDOR reports submitted</li>
                    <li>&#8226; Enforcement notices received</li>
                    <li>&#8226; Insurance claims</li>
                    <li>&#8226; Occupational disease cases</li>
                  </ul>
                </div>
              </div>
              <p className="text-white/50 text-xs mt-3 italic">
                Best practice: monitor both types. Leading indicators predict
                future performance; lagging indicators confirm whether
                current arrangements are effective. Relying solely on lagging
                indicators means waiting for something to go wrong.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 08 — Building a Compliance Culture                   */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              08
            </span>
            <h3 className="text-xl font-semibold text-white">
              Building a Compliance Culture
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              True compliance with CDM 2015 goes beyond ticking boxes and
              avoiding prosecution. A genuine compliance culture means that
              health and safety is embedded in every decision, at every level
              of the organisation, from the boardroom to the site. It is the
              difference between an organisation that does the legal minimum
              and one where workers actively look out for each other, report
              hazards without hesitation, and take pride in a safe workplace.
              Research consistently shows that organisations with strong
              safety cultures have fewer incidents, lower costs, and better
              overall performance.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Elements of a Compliance Culture
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Leadership commitment
                    </strong>{" "}
                    — senior management must visibly demonstrate commitment to
                    health and safety. This means allocating adequate resources,
                    attending site safety meetings, responding promptly to safety
                    concerns, and never pressuring workers to take shortcuts. When
                    leadership takes safety seriously, the rest of the
                    organisation follows
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Worker engagement
                    </strong>{" "}
                    — workers are the people closest to the risks. Engaging them
                    in risk assessment, planning safe systems of work, and
                    reviewing incidents gives them ownership of safety. Effective
                    worker consultation (required under CDM 2015 Regulation 14)
                    means genuinely listening to concerns and acting on them, not
                    just holding meetings to satisfy a legal requirement
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Continuous improvement
                    </strong>{" "}
                    — a compliance culture does not stand still. Regular reviews
                    of safety performance, lessons learned from incidents and
                    near misses, benchmarking against industry standards, and
                    adopting new and better working practices drive ongoing
                    improvement. The Plan-Do-Check-Act cycle (as promoted by
                    HSG65 &ldquo;Managing for Health and Safety&rdquo;) provides
                    a framework for this
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Sharing good practice
                    </strong>{" "}
                    — organisations that share what works — and what does not
                    — contribute to raising standards across the industry.
                    Sharing can be internal (between projects and teams) or
                    external (through industry bodies, conferences, and
                    publications)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                Industry Initiatives
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Considerate Constructors Scheme (CCS)
                    </strong>{" "}
                    — a voluntary scheme that promotes best practice beyond
                    the legal minimum. Registered sites are assessed against
                    a code of considerate practice covering community, safety,
                    environment, workforce, and appearance. CCS membership is
                    increasingly expected by clients and local authorities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      CITB (Construction Industry Training Board)
                    </strong>{" "}
                    — provides training, qualifications, and standards that
                    support CDM compliance, including the CITB Health, Safety
                    and Environment (HS&E) Test, the Site Management Safety
                    Training Scheme (SMSTS), and Site Supervisor Safety Training
                    Scheme (SSSTS)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      CSCS (Construction Skills Certification Scheme)
                    </strong>{" "}
                    — the CSCS card scheme demonstrates that workers have the
                    required training and qualifications for their role. While
                    CSCS cards are not a legal requirement under CDM 2015, they
                    are widely used as evidence of competence and are required
                    by most principal contractors for site access
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                The Business Case for Compliance
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The business case for going beyond the legal minimum is
                compelling. Fewer incidents mean fewer days lost, lower
                insurance premiums, and reduced costs of recruitment and
                retraining. Companies with strong safety records win more
                work — clients increasingly use safety performance as a
                pre-qualification criterion. Avoiding prosecution and
                enforcement notices protects the company&apos;s reputation
                and avoids the substantial legal and administrative costs
                associated with enforcement. Good safety performance also
                improves worker morale and retention — skilled workers choose
                to work for employers who look after them. In a competitive
                construction labour market, a strong safety culture is a
                genuine commercial advantage.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  DIAGRAM — HSE Enforcement Escalation Ladder                  */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-400" />
            HSE Enforcement Escalation Ladder
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <p className="text-white/60 text-xs mb-5 italic">
              Enforcement escalates from least to most severe. Each level
              represents a more serious intervention by the HSE.
            </p>
            <div className="flex flex-col gap-0">
              {/* Level 5 — Most Severe */}
              <div className="relative">
                <div className="bg-gradient-to-r from-red-700/40 to-red-900/40 border border-red-500/50 rounded-t-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[32px] h-8 rounded-lg bg-red-600/30 text-red-300 font-bold text-xs">
                      5
                    </span>
                    <div>
                      <p className="text-red-300 font-bold text-sm">
                        Corporate Manslaughter
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Unlimited fines (tens of millions), publicity orders
                        requiring the organisation to publicise its conviction,
                        and remedial orders. Applies where gross management
                        failures cause death.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 4 */}
              <div className="relative">
                <div className="bg-gradient-to-r from-red-600/30 to-red-700/30 border-x border-red-500/40 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[32px] h-8 rounded-lg bg-red-500/30 text-red-400 font-bold text-xs">
                      4
                    </span>
                    <div>
                      <p className="text-red-400 font-bold text-sm">
                        Prosecution
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Criminal offence. Unlimited fines for organisations
                        and individuals. Up to 2 years&apos; imprisonment for
                        individuals in the Crown Court. Turnover-based
                        sentencing guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="relative">
                <div className="bg-gradient-to-r from-amber-600/25 to-red-600/25 border-x border-amber-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[32px] h-8 rounded-lg bg-amber-500/30 text-amber-400 font-bold text-xs">
                      3
                    </span>
                    <div>
                      <p className="text-amber-400 font-bold text-sm">
                        Prohibition Notice
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Immediate stop to the dangerous activity. Appeal does
                        NOT suspend the notice. Issued where there is a risk
                        of serious personal injury. Activity must remain stopped
                        until the risk is eliminated.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600/25 to-amber-600/20 border-x border-blue-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[32px] h-8 rounded-lg bg-blue-500/30 text-blue-400 font-bold text-xs">
                      2
                    </span>
                    <div>
                      <p className="text-blue-400 font-bold text-sm">
                        Improvement Notice
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Minimum 21 days to comply. Work may continue.
                        Specifies the contravention and what must be done.
                        Appeal suspends the notice during the tribunal
                        process. Failure to comply is a criminal offence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 1 — Least Severe */}
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-b-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[32px] h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs">
                      1
                    </span>
                    <div>
                      <p className="text-blue-400 font-bold text-sm">
                        Verbal Advice and Guidance
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Informal advice from an inspector during a site visit.
                        No formal enforcement action. The inspector may explain
                        what is required and give the duty holder an opportunity
                        to put things right voluntarily. May still trigger FFI
                        if a material breach is identified.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 px-2">
              <span className="text-blue-400 text-xs font-semibold">
                Least Severe
              </span>
              <div className="flex-1 mx-3 h-1 rounded-full bg-gradient-to-r from-blue-500 via-amber-500 to-red-600" />
              <span className="text-red-400 text-xs font-semibold">
                Most Severe
              </span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Legal Framework Summary                                      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Legal Framework — Enforcement and Monitoring
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  Health and Safety at Work etc. Act 1974 (HASAWA)
                </p>
                <p className="text-white/70 text-xs">
                  The enabling Act. Sections 20{"\u2013"}25 set out inspector
                  powers, improvement and prohibition notices, and prosecution
                  provisions. Section 33 creates criminal offences for
                  breaches. Section 37 allows prosecution of individual
                  directors and managers.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  Construction (Design and Management) Regulations 2015
                </p>
                <p className="text-white/70 text-xs">
                  Creates specific duties for clients, principal designers,
                  principal contractors, contractors, designers, and workers.
                  Breach of these duties is a criminal offence enforceable by
                  the HSE.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  RIDDOR 2013
                </p>
                <p className="text-white/70 text-xs">
                  Requires reporting of fatal injuries, specified injuries,
                  over-7-day injuries, dangerous occurrences, and occupational
                  diseases. Failure to report is a criminal offence.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  Sentencing Council Guidelines (2016)
                </p>
                <p className="text-white/70 text-xs">
                  Provide the framework for courts sentencing health and safety
                  offences. Introduced turnover-based fines, culpability
                  assessment, and harm categories. Significantly increased
                  fine levels across the industry.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  Corporate Manslaughter and Corporate Homicide Act 2007
                </p>
                <p className="text-white/70 text-xs">
                  Creates the offence of corporate manslaughter where gross
                  management failures cause death. Sanctions: unlimited fines,
                  publicity orders, and remedial orders. Applies to
                  organisations only.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  Health and Safety (Fees) Regulations 2012
                </p>
                <p className="text-white/70 text-xs">
                  Establishes the Fee for Intervention (FFI) scheme. Duty
                  holders in material breach must pay the HSE&apos;s costs at
                  &pound;171 per hour.
                </p>
              </div>
            </div>
            <p className="text-white/60 text-xs mt-3 italic">
              Enforcement is the backstop of the regulatory system. The
              ultimate goal is prevention through good management, not
              punishment after failure.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <h4 className="font-medium text-white mb-2 text-sm">
                  {faq.question}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 4 — Monitoring, Review & Enforcement"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5-section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Welfare Facilities
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-blue-500 hover:bg-blue-500/90 text-white font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-6">
              Next: Mock Exam
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
