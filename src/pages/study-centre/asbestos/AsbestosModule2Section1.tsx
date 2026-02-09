import { ArrowLeft, Scale, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "car2012-scope",
    question:
      "The Control of Asbestos Regulations 2012 apply to which types of workplace?",
    options: [
      "All workplaces in England, Scotland, and Wales",
      "Only construction sites with known asbestos",
      "Only factories built before 1990",
      "Only public-sector buildings",
    ],
    correctIndex: 0,
    explanation:
      "CAR 2012 applies to all workplaces in England, Scotland, and Wales — not just construction sites. Separate (but very similar) regulations apply in Northern Ireland. Any premises where people work can contain asbestos-containing materials, and the regulations apply regardless of sector or building age.",
  },
  {
    id: "control-limit",
    question:
      "What is the single control limit for airborne asbestos fibre concentration under CAR 2012?",
    options: [
      "0.1 fibres per cm\u00B3 averaged over a continuous 4-hour period",
      "0.3 fibres per cm\u00B3 averaged over a continuous 8-hour period",
      "0.05 fibres per cm\u00B3 averaged over a continuous 2-hour period",
      "1.0 fibres per cm\u00B3 averaged over a continuous 1-hour period",
    ],
    correctIndex: 0,
    explanation:
      "CAR 2012 introduced a single control limit of 0.1 fibres per cm\u00B3 of air averaged over a continuous 4-hour period for all types of asbestos. Previously there were different limits for amphibole asbestos (0.1 f/cm\u00B3) and chrysotile (0.3 f/cm\u00B3). The unified limit recognises that chrysotile is also a serious health hazard.",
  },
  {
    id: "licensed-vs-nnlw",
    question:
      "Which category of asbestos work requires an ASB5 online notification to the HSE but does NOT require a full HSE licence?",
    options: [
      "Licensed work",
      "Notifiable non-licensed work (NNLW)",
      "Non-licensed work",
      "All categories require a licence",
    ],
    correctIndex: 1,
    explanation:
      "Notifiable non-licensed work (NNLW) is the middle category. It covers brief, sporadic, low-intensity work with certain ACMs. An ASB5 notification must be submitted online to the HSE before work begins. Health records must be kept for 40 years and medical surveillance is required — but a full HSE asbestos licence is not needed.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Do the Control of Asbestos Regulations 2012 apply to domestic premises?",
    answer:
      "Regulation 4 (the duty to manage asbestos) applies to non-domestic premises and the common areas of domestic premises (e.g. corridors and stairwells in blocks of flats). However, the other regulations — such as those covering training, exposure limits, and control measures — apply whenever work with asbestos is carried out, regardless of whether the premises are domestic or non-domestic. So if a tradesperson is removing asbestos-containing textured coating from a house, the relevant regulations still apply to that work activity.",
  },
  {
    question:
      "What is the difference between CAR 2006 and CAR 2012?",
    answer:
      "CAR 2012 replaced CAR 2006 and introduced several important changes. The most significant was the introduction of the notifiable non-licensed work (NNLW) category, which sits between licensed and non-licensed work. CAR 2012 also unified the control limit at 0.1 fibres per cm\u00B3 for all asbestos types (previously chrysotile had a higher limit of 0.3 f/cm\u00B3). It also introduced requirements for medical surveillance and health records for NNLW, and required online notification via the ASB5 form for NNLW.",
  },
  {
    question:
      "Who is responsible for enforcing the Control of Asbestos Regulations?",
    answer:
      "The Health and Safety Executive (HSE) is the primary enforcing authority for CAR 2012. Local authorities also have enforcement powers in certain premises such as shops, offices, and leisure facilities. The HSE can issue improvement notices, prohibition notices, and prosecute offenders. Unlimited fines can be imposed on organisations, and individuals can face imprisonment for up to 2 years for serious breaches.",
  },
  {
    question:
      "How often must asbestos awareness training be refreshed?",
    answer:
      "CAR 2012 Regulation 10 requires that training is kept up to date. The HSE recommends that asbestos awareness training is refreshed annually for those whose work may disturb ACMs (e.g. electricians, plumbers, joiners). For more detailed training — such as for supervisors or those carrying out NNLW — a full refresher is recommended every three years, with annual top-up awareness sessions in between. Training records must be kept as evidence of compliance.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "When did the Control of Asbestos Regulations 2012 come into force?",
    options: [
      "1 January 2012",
      "6 April 2012",
      "6 April 2006",
      "1 October 2012",
    ],
    correctAnswer: 1,
    explanation:
      "CAR 2012 (SI 2012/632) came into force on 6 April 2012, replacing the Control of Asbestos Regulations 2006.",
  },
  {
    id: 2,
    question:
      "Which EU Directive does CAR 2012 implement in the UK?",
    options: [
      "Directive 89/391/EEC on health and safety at work",
      "Directive 2009/148/EC on asbestos exposure at work",
      "Directive 2003/18/EC on chemical agents",
      "Directive 98/24/EC on hazardous substances",
    ],
    correctAnswer: 1,
    explanation:
      "CAR 2012 implements EU Directive 2009/148/EC on the protection of workers from the risks related to exposure to asbestos at work. Although the UK has left the EU, the regulations remain in force under retained law.",
  },
  {
    id: 3,
    question:
      "Which regulation within CAR 2012 establishes the duty to manage asbestos in non-domestic premises?",
    options: [
      "Regulation 10",
      "Regulation 8",
      "Regulation 4",
      "Regulation 22",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 4 of CAR 2012 establishes the duty to manage asbestos in non-domestic premises. It requires the duty holder to find out whether asbestos is present, assess its condition, create a management plan, and ensure anyone who might disturb it is informed.",
  },
  {
    id: 4,
    question:
      "Which of the following is an example of notifiable non-licensed work (NNLW)?",
    options: [
      "Removing sprayed asbestos coating from steel beams",
      "Removing asbestos pipe lagging from a heating system",
      "Removing textured coatings containing asbestos",
      "Removing loose-fill asbestos insulation from a loft",
    ],
    correctAnswer: 2,
    explanation:
      "Removing textured coatings (e.g. Artex) containing asbestos is classified as notifiable non-licensed work (NNLW) provided it meets the criteria for brief, sporadic, low-intensity work. Work with sprayed coatings and pipe lagging requires a full HSE licence, and loose-fill insulation is also licensed work due to the extremely high fibre release potential.",
  },
  {
    id: 5,
    question:
      "What is the short-term exposure limit for airborne asbestos fibres under CAR 2012?",
    options: [
      "0.1 fibres per cm\u00B3 over 10 minutes",
      "0.3 fibres per cm\u00B3 over 10 minutes",
      "0.6 fibres per cm\u00B3 over 10 minutes",
      "1.0 fibres per cm\u00B3 over 10 minutes",
    ],
    correctAnswer: 2,
    explanation:
      "The short-term exposure limit (STEL) under CAR 2012 is 0.6 fibres per cm\u00B3 of air averaged over any continuous 10-minute period. This is in addition to the 4-hour time-weighted average control limit of 0.1 f/cm\u00B3.",
  },
  {
    id: 6,
    question:
      "Under CAR 2012, how long must health records be kept for workers who carry out notifiable non-licensed work (NNLW)?",
    options: [
      "5 years",
      "10 years",
      "20 years",
      "40 years",
    ],
    correctAnswer: 3,
    explanation:
      "Health records for workers carrying out NNLW must be kept for at least 40 years from the date of the last entry. This reflects the long latency period of asbestos-related diseases, which can take 15\u201360 years to develop after exposure.",
  },
  {
    id: 7,
    question:
      "Which Approved Code of Practice provides guidance on managing and working with asbestos under CAR 2012?",
    options: [
      "L8 — Legionnaires' disease",
      "L143 — Managing and working with asbestos",
      "L74 — First aid at work",
      "L21 — Management of health and safety at work",
    ],
    correctAnswer: 1,
    explanation:
      "L143 'Managing and working with asbestos' is the HSE's Approved Code of Practice (ACoP) that provides practical guidance on complying with CAR 2012. It has special legal status — if you follow the advice in L143 you will be doing enough to comply with the law. If you do not follow it, you must be able to show that you have complied in some other equally effective way.",
  },
  {
    id: 8,
    question:
      "What is the maximum prison sentence an individual can receive for serious breaches of the asbestos regulations?",
    options: [
      "6 months",
      "1 year",
      "2 years",
      "5 years",
    ],
    correctAnswer: 2,
    explanation:
      "Individuals convicted of serious breaches of the Health and Safety at Work etc. Act 1974 (under which CAR 2012 is made) can face imprisonment for up to 2 years. Organisations face unlimited fines. The HSE can also issue immediate prohibition notices to stop dangerous work.",
  },
];

/* ──────────────────────── Legislation timeline data ───────────────────── */

const timelineEvents = [
  { year: 1931, label: "Asbestos Industry Regulations \u2014 first UK asbestos law" },
  { year: 1969, label: "Asbestos Regulations 1969 \u2014 stricter workplace controls introduced" },
  { year: 1974, label: "Health and Safety at Work Act \u2014 general duties framework" },
  { year: 1983, label: "Asbestos (Licensing) Regulations \u2014 licensed removal introduced" },
  { year: 1985, label: "Ban on crocidolite (blue) and amosite (brown) asbestos" },
  { year: 1987, label: "Control of Asbestos at Work Regulations" },
  { year: 1992, label: "Prohibition extended to all amphibole asbestos" },
  { year: 1999, label: "Total ban on asbestos \u2014 all types including chrysotile (white)" },
  { year: 2002, label: "Duty to Manage introduced (CAWR amendment)" },
  { year: 2006, label: "Control of Asbestos Regulations 2006 \u2014 consolidation" },
  { year: 2012, label: "Control of Asbestos Regulations 2012 \u2014 current law" },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const AsbestosModule2Section1 = () => {
  useSEO({
    title:
      "Control of Asbestos Regulations 2012 | Asbestos Awareness Module 2 Section 1",
    description:
      "Understand the Control of Asbestos Regulations 2012 (CAR 2012), the three categories of asbestos work, the control limit, training requirements, and HSE enforcement powers.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Scale className="h-10 w-10 text-orange-500 mx-auto mb-4" />
          <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Control of Asbestos Regulations 2012
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding the primary UK legislation that governs all work with asbestos &mdash; who it
            applies to, what it requires, and how it is enforced
          </p>
        </div>

        {/* ─── Quick Summary Boxes ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            Overview of CAR 2012
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-orange-500/10 border-l-2 border-l-orange-500/50 border border-orange-500/30">
              <p className="font-semibold text-base text-orange-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>CAR 2012 (SI 2012/632)</strong> is the primary UK legislation governing
                    asbestos at work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Came into force <strong>6 April 2012</strong>, replacing CAR 2006.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Consolidates and updates all previous asbestos regulations into one comprehensive
                    framework.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Implements <strong>EU Directive 2009/148/EC</strong> on asbestos exposure at work.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-orange-500/10 border-l-2 border-l-orange-500/50 border border-orange-500/30">
              <p className="font-semibold text-base text-orange-400 mb-2">Scope &amp; Enforcement</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Applies to <strong>all workplaces</strong> in England, Scotland, and Wales.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Separate (but very similar) regulations in <strong>Northern Ireland</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Enforced by the <strong>Health and Safety Executive (HSE)</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Approved Code of Practice: <strong>L143</strong> &ldquo;Managing and working with
                    asbestos&rdquo;.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Learning Outcomes ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>
                Explain the purpose and scope of the Control of Asbestos Regulations 2012
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>
                Identify the key regulations within CAR 2012 and describe their requirements
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>
                Distinguish between licensed work, notifiable non-licensed work, and non-licensed work
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>
                State the current control limit for airborne asbestos fibres and explain its
                significance
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>
                Describe the training requirements under Regulation 10, including who must be trained
                and how often
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>
                Outline the HSE&rsquo;s enforcement powers, including improvement notices, prohibition
                notices, and prosecution
              </span>
            </li>
          </ul>
        </section>

        {/* ─── 03 Key Regulations Within CAR 2012 ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">03</span>
              Key Regulations Within CAR 2012
            </h2>
            <div className="space-y-4 text-white">
              <p>
                CAR 2012 contains a comprehensive set of regulations that cover every aspect of managing
                and working with asbestos. Below are the key regulations that you need to understand for
                this course:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Core Regulations</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 4:</strong> Duty to manage asbestos in non-domestic premises
                      &mdash; the duty holder must find, assess, and manage ACMs.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 5:</strong> Identification of asbestos &mdash; if you cannot
                      confirm a material is asbestos-free, you must <em>presume</em> it contains
                      asbestos (the presumption approach).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 6:</strong> Assessment of work with asbestos &mdash; a
                      suitable and sufficient assessment must be carried out before any work that may
                      disturb ACMs.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 7:</strong> Plans of work &mdash; a written plan must be
                      prepared before work with asbestos begins.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Licensing, Notification &amp; Training</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 8:</strong> Licensing of work with asbestos &mdash; certain
                      high-risk activities require an HSE licence.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 9:</strong> Notification of work with asbestos &mdash;
                      licensed work requires 14 days&rsquo; notice; NNLW requires an ASB5 online
                      notification.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 10:</strong> Information, instruction, and training &mdash;
                      anyone who may be exposed to asbestos must receive adequate training.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Exposure Control &amp; Welfare</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 11:</strong> Prevention or reduction of exposure &mdash;
                      exposure must be prevented or, where that is not reasonably practicable,
                      reduced to the lowest level reasonably practicable.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 12:</strong> Use of control measures &mdash; employers must
                      ensure that control measures are properly used and maintained.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 14:</strong> Provision of protective clothing &mdash;
                      adequate and suitable protective clothing must be provided.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 18:</strong> Air monitoring &mdash; required to verify that
                      exposure is kept below the control limit.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 19:</strong> Health records and medical surveillance &mdash;
                      required for licensed and NNLW workers.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 20:</strong> Washing and changing facilities &mdash; must be
                      provided where there is a risk of asbestos contamination.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regulation 22:</strong> Control limit &mdash; sets the maximum
                      permissible concentration of airborne asbestos fibres.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Legislation Timeline Diagram ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">04</span>
            UK Asbestos Legislation Timeline
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            The UK&rsquo;s approach to regulating asbestos has evolved over more than 80 years. Each
            step built on the last, culminating in the comprehensive framework we have today under CAR
            2012.
          </p>

          {/* Horizontal scrollable timeline */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="relative min-w-[900px]">
              {/* Centre line */}
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-orange-500/30" />

              <div className="flex justify-between items-center relative">
                {timelineEvents.map((evt, idx) => {
                  const isAbove = idx % 2 === 0;
                  return (
                    <div
                      key={evt.year}
                      className="flex flex-col items-center relative"
                      style={{ minWidth: "80px" }}
                    >
                      {/* Card above or below */}
                      {isAbove ? (
                        <>
                          <div className="mb-2 w-[110px] text-center">
                            <div className="bg-orange-500/15 border border-orange-500/30 rounded-lg p-2">
                              <p className="text-orange-400 font-bold text-sm leading-none mb-1">
                                {evt.year}
                              </p>
                              <p className="text-white/70 text-[10px] leading-tight">
                                {evt.label}
                              </p>
                            </div>
                          </div>
                          {/* Vertical connector + dot */}
                          <div className="w-px h-4 bg-orange-500/40" />
                          <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-[#1a1a1a] z-10" />
                          <div className="h-[72px]" /> {/* spacer below for symmetry */}
                        </>
                      ) : (
                        <>
                          <div className="h-[72px]" /> {/* spacer above for symmetry */}
                          <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-[#1a1a1a] z-10" />
                          <div className="w-px h-4 bg-orange-500/40" />
                          <div className="mt-2 w-[110px] text-center">
                            <div className="bg-orange-500/15 border border-orange-500/30 rounded-lg p-2">
                              <p className="text-orange-400 font-bold text-sm leading-none mb-1">
                                {evt.year}
                              </p>
                              <p className="text-white/70 text-[10px] leading-tight">
                                {evt.label}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs text-centre mt-2 italic">
            Scroll horizontally to view the full timeline
          </p>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 05 Three Categories of Asbestos Work ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">05</span>
              The Three Categories of Asbestos Work
            </h2>
            <div className="space-y-4 text-white">
              <p>
                CAR 2012 divides all work with asbestos-containing materials into three categories. The
                category determines the level of regulatory control, notification, medical surveillance,
                and training required. Getting the classification right is critical &mdash; carrying out
                licensed work without a licence is a criminal offence.
              </p>

              {/* Licensed work */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <h3 className="text-red-400 font-semibold mb-2">
                  1. Licensed Work &mdash; Highest Risk
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">
                    Licensed work involves the most dangerous ACMs and activities. It requires:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        A <strong>current HSE asbestos licence</strong> held by the contractor
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>14 days&rsquo; written notification</strong> to the HSE before work
                        begins (or a waiver in emergency situations)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Medical surveillance</strong> for all workers (every 3 years)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        Full <strong>enclosure, decontamination unit, and air monitoring</strong>
                      </div>
                    </li>
                  </ul>
                  <p className="text-white/60 mt-2 text-xs">
                    Examples: sprayed coatings, pipe lagging, asbestos insulating board (AIB)
                    removal, loose-fill insulation.
                  </p>
                </div>
              </div>

              {/* NNLW */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="text-amber-400 font-semibold mb-2">
                  2. Notifiable Non-Licensed Work (NNLW) &mdash; Medium Risk
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">
                    NNLW covers brief, sporadic, low-intensity work with certain ACMs. It requires:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>ASB5 online notification</strong> to the HSE before work starts
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Health records kept for 40 years</strong> from the date of last entry
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Medical surveillance</strong> (medical examination by a doctor)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                      <div>
                        No HSE licence required, but adequate <strong>training and competence</strong>{" "}
                        essential
                      </div>
                    </li>
                  </ul>
                  <p className="text-white/60 mt-2 text-xs">
                    Examples: textured coating removal, asbestos cement work with power tools, certain
                    AIB work meeting specific low-risk criteria.
                  </p>
                </div>
              </div>

              {/* Non-licensed */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-2">
                  3. Non-Licensed Work &mdash; Lowest Risk
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">
                    Non-licensed work covers low-risk activities where fibre release is minimal. It
                    requires:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>No HSE notification</strong> required
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Basic control measures</strong> (wet methods, RPE, waste disposal)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Asbestos awareness training</strong> for operatives
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <div>
                        Work must still be carried out safely and in accordance with CAR 2012
                      </div>
                    </li>
                  </ul>
                  <p className="text-white/60 mt-2 text-xs">
                    Examples: asbestos cement removal by hand, textured coating removal using wet
                    methods and hand scraping, floor tile removal.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Important</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Even non-licensed work must be carried out with proper controls. There is <strong className="text-white">
                  no category of asbestos work that can be done without any precautions</strong>.
                  Every category requires a risk assessment, a plan of work, appropriate training,
                  and suitable control measures. The only difference is the level of regulatory
                  oversight.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 06 The Control Limit ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">06</span>
              The Control Limit
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The control limit is the maximum permissible concentration of asbestos fibres in the air.
                It is set at a level intended to limit exposure, but it is{" "}
                <strong>not a safe level</strong> &mdash; there is no known safe level of asbestos
                exposure. The control limit is a legal maximum that must not be exceeded.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-orange-500/15 border border-orange-500/30 p-4 rounded-lg text-center">
                  <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    4-Hour TWA Control Limit
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    0.1 f/cm&sup3;
                  </p>
                  <p className="text-white/60 text-sm">
                    fibres per cm&sup3; averaged over a continuous 4-hour period
                  </p>
                </div>
                <div className="bg-orange-500/15 border border-orange-500/30 p-4 rounded-lg text-center">
                  <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Short-Term Exposure Limit
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    0.6 f/cm&sup3;
                  </p>
                  <p className="text-white/60 text-sm">
                    fibres per cm&sup3; averaged over any continuous 10-minute period
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    The Control Limit Is NOT a Safe Level
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  The control limit of 0.1 f/cm&sup3; does <strong className="text-white">not</strong>{" "}
                  represent a safe level of exposure. There is no known threshold below which
                  asbestos exposure is completely safe. The control limit is a legal maximum &mdash;
                  work must be planned and carried out to keep exposure{" "}
                  <strong className="text-white">as far below the control limit as is reasonably
                  practicable</strong>. Any exposure to asbestos fibres carries some risk.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-2">Key Points</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Unified limit:</strong> CAR 2012 introduced a single limit of 0.1
                      f/cm&sup3; for <em>all</em> types of asbestos. Previously, chrysotile had a
                      higher limit of 0.3 f/cm&sup3; and amphibole asbestos was already at 0.1
                      f/cm&sup3;.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Air monitoring:</strong> May be required to demonstrate that the control
                      limit is not being exceeded, particularly during licensed and NNLW activities.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Reasonably practicable:</strong> Even if air monitoring shows levels
                      below the control limit, the duty holder must still take all reasonably
                      practicable steps to reduce exposure further.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Exceeding the limit:</strong> If the control limit is exceeded, work
                      must stop immediately, the cause must be identified, and remedial action taken
                      before work resumes.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Training Requirements (Regulation 10) ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">07</span>
              Training Requirements (Regulation 10)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Regulation 10 of CAR 2012 requires every employer to ensure that employees who are, or
                who are liable to be, exposed to asbestos receive adequate information, instruction, and
                training. This is one of the most important requirements of the regulations &mdash;
                workers who do not know what asbestos looks like, or what to do when they encounter it,
                are at significantly greater risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Training Must Cover</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The <strong>properties of asbestos</strong> and its health effects
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The <strong>types of products and materials</strong> that may contain asbestos
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Operations and activities</strong> that could cause asbestos exposure
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Safe work practices and control measures</strong> to minimise exposure
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The correct use of <strong>PPE and RPE</strong> (personal/respiratory protective
                      equipment)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Emergency procedures</strong> in the event of uncontrolled fibre release
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Who Needs Training?</h3>
                <p className="text-white/80 text-sm mb-3">
                  Asbestos awareness training is required for anyone whose work could foreseeably
                  disturb asbestos-containing materials. This includes (but is not limited to):
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <ul className="text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Electricians</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Plumbers and heating engineers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Joiners and carpenters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>General builders</span>
                    </li>
                  </ul>
                  <ul className="text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Painters and decorators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Roofers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Demolition workers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Facilities and maintenance staff</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Training Frequency</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Asbestos awareness:</strong> Recommended annually for anyone whose work
                      may disturb ACMs &mdash; this is the training you are completing now.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Detailed refresher (NNLW/licensed):</strong> Full refresher recommended
                      every 3 years, with annual top-up awareness sessions in between.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Records:</strong> Training records must be kept and made available for
                      inspection by the HSE or local authority enforcers.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Scale className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Electricians &amp; Asbestos</h3>
                </div>
                <p className="text-white/80 text-sm">
                  As an electrician, you are in one of the trades most likely to encounter
                  asbestos-containing materials. Chasing cables into walls, lifting floorboards,
                  accessing ceiling voids, working in older consumer unit locations, and drilling
                  through partition walls can all disturb ACMs. That is why asbestos awareness
                  training is considered essential for all electricians, regardless of whether they
                  work on new builds, refurbishments, or maintenance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 08 HSE Enforcement ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">08</span>
              HSE Enforcement
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Health and Safety Executive (HSE) is responsible for enforcing the Control of
                Asbestos Regulations 2012. Local authorities also have enforcement powers in certain
                premises. The HSE has a range of enforcement tools at its disposal, from informal
                advice through to criminal prosecution.
              </p>

              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <h3 className="text-amber-400 font-semibold mb-2">Improvement Notice</h3>
                  <p className="text-white/80 text-sm">
                    An improvement notice requires the duty holder to <strong className="text-white">
                    take specific action within a stated timeframe</strong> to remedy a breach of the
                    regulations. Failure to comply with an improvement notice is itself a criminal
                    offence. The notice will set out clearly what needs to be done and by when.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-2">Prohibition Notice</h3>
                  <p className="text-white/80 text-sm">
                    A prohibition notice <strong className="text-white">stops work immediately</strong>{" "}
                    where the HSE inspector believes there is, or is likely to be, a serious risk of
                    personal injury. Work cannot resume until the notice is complied with. Prohibition
                    notices can be issued on the spot without prior warning.
                  </p>
                </div>

                <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-lg">
                  <h3 className="text-red-300 font-semibold mb-2">Prosecution</h3>
                  <p className="text-white/80 text-sm">
                    For serious breaches, the HSE can prosecute in the criminal courts. Penalties
                    include:
                  </p>
                  <ul className="text-white space-y-2 text-sm mt-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Organisations:</strong> Unlimited fines
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Individuals:</strong> Imprisonment for up to 2 years and/or
                        unlimited fines
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Other Enforcement Powers</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Entry and inspection:</strong> HSE inspectors have the right to enter
                      any workplace at any reasonable time to carry out inspections.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Seizure of documents and samples:</strong> Inspectors can seize
                      documents, take samples of substances, and take photographs as evidence.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Interview under caution:</strong> Inspectors can require any person to
                      answer questions and sign a declaration of truth.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Local authority powers:</strong> Local authorities also have enforcement
                      powers in certain premises such as shops, offices, hotels, leisure centres, and
                      places of worship.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Real-World Consequences</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The HSE regularly prosecutes businesses and individuals for asbestos-related
                  offences. Recent cases have resulted in fines of hundreds of thousands of pounds for
                  organisations, and custodial sentences for individuals who knowingly exposed workers
                  to asbestos without proper controls. Even small businesses and sole traders can be
                  prosecuted. Ignorance of the regulations is not a defence &mdash; which is exactly
                  why this training matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 09 Summary ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">09</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CAR 2012</strong> is the single, comprehensive set of regulations
                      governing all work with asbestos in England, Scotland, and Wales.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Asbestos work falls into <strong>three categories</strong>: licensed, notifiable
                      non-licensed (NNLW), and non-licensed &mdash; each with different requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>control limit</strong> is 0.1 f/cm&sup3; (4-hr TWA) and 0.6
                      f/cm&sup3; (10-min STEL) &mdash; but these are not safe levels.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Training (Regulation 10)</strong> is mandatory for anyone whose work
                      could disturb ACMs &mdash; including all electricians.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>HSE</strong> enforces the regulations through improvement notices,
                      prohibition notices, and prosecution &mdash; with unlimited fines and up to 2
                      years&rsquo; imprisonment.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">10</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Control of Asbestos Regulations 2012 Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-1-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Health Effects of Exposure
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2-section-2">
              Next: The Duty to Manage
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default AsbestosModule2Section1;
