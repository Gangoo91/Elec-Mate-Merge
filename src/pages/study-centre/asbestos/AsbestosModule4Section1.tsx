import { ArrowLeft, Layers, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "three-categories",
    question:
      "How many categories of asbestos work does CAR 2012 define?",
    options: [
      "Three: licensed, notifiable non-licensed (NNLW), and non-licensed",
      "Two: licensed and non-licensed only",
      "Four: prohibited, licensed, notifiable, and exempt",
      "One: all asbestos work requires the same controls",
    ],
    correctIndex: 0,
    explanation:
      "CAR 2012 divides asbestos work into three categories based on risk. Licensed work is the highest risk and requires an HSE licence. Notifiable non-licensed work (NNLW) is the middle category and requires an ASB5 notification but no licence. Non-licensed work is the lowest risk category but still requires appropriate controls and awareness training.",
  },
  {
    id: "nnlw-notification",
    question:
      "What notification is required before starting notifiable non-licensed work (NNLW)?",
    options: [
      "An ASB5 form submitted online to the HSE before work begins",
      "A 14-day written notification to the local council",
      "No notification is required for non-licensed work",
      "A verbal notification to the building owner is sufficient",
    ],
    correctIndex: 0,
    explanation:
      "Notifiable non-licensed work requires an ASB5 online notification to the HSE before work begins. This is different from licensed work, which requires a 14-day written notification. Non-licensed work (the lowest category) does not require any notification. The ASB5 form captures details of the work, the contractor, the location, and the type of ACM involved.",
  },
  {
    id: "textured-coatings-category",
    question:
      "A contractor plans to remove asbestos-containing textured coatings using power tools. Which work category does this fall into?",
    options: [
      "Notifiable non-licensed work (NNLW)",
      "Non-licensed work",
      "Licensed work",
      "It depends on the age of the building",
    ],
    correctIndex: 0,
    explanation:
      "Removing textured coatings containing asbestos using power tools is classified as notifiable non-licensed work (NNLW). This is because power tools generate more dust and fibre release than hand methods. If the same textured coating were removed by hand using wet methods (steam/wet scraping), it would typically fall into the lower non-licensed category. The method of work is a key factor in determining the category.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Can a non-licensed contractor carry out licensed asbestos work?",
    answer:
      "No. Only contractors holding a current HSE asbestos licence can carry out licensed work. Carrying out licensed work without a licence is a criminal offence that can result in prosecution, unlimited fines, and imprisonment for up to 2 years. However, a licensed contractor can carry out all categories of work — licensed, NNLW, and non-licensed. If there is any doubt about whether work is licensed or non-licensed, the safer approach is to engage a licensed contractor.",
  },
  {
    question:
      "What happens if I get the work category wrong?",
    answer:
      "Getting the category wrong can have serious consequences. If licensed work is treated as non-licensed, this is a criminal offence and workers will be exposed to uncontrolled asbestos fibres. If NNLW is carried out without notification, the contractor is in breach of CAR 2012 and health records will not be properly maintained. Even treating non-licensed work as requiring no controls is dangerous. The HSE expects duty holders and contractors to exercise due diligence in determining the correct category. When in doubt, always err on the side of the higher-risk category.",
  },
  {
    question:
      "How long must health records be kept for NNLW?",
    answer:
      "Health records for workers carrying out notifiable non-licensed work must be kept for at least 40 years from the date of the last entry. This extremely long retention period reflects the fact that asbestos-related diseases can take 15 to 60 years to develop after exposure. Even if the employer ceases trading, the records must be offered to the HSE for safekeeping. Workers also have the right to access their own health records at any time.",
  },
  {
    question:
      "Is removing asbestos cement sheets always non-licensed work?",
    answer:
      "Not necessarily. Removing intact asbestos cement sheets by hand (careful dismantling without breaking) is generally classified as non-licensed work. However, if the work involves cutting, drilling, or using power tools on asbestos cement, it becomes NNLW because these methods release significantly more fibres. If the asbestos cement is in very poor condition, badly damaged, or if the work cannot be done without significant breakage, it may even require licensed removal. The condition of the material and the method of work both determine the category.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following types of work ALWAYS requires an HSE asbestos licence?",
    options: [
      "Removing intact asbestos cement sheets by hand",
      "Work with sprayed asbestos coatings (limpet asbestos)",
      "Removing asbestos-containing floor tiles by hand",
      "Removing textured coatings using wet scraping methods",
    ],
    correctAnswer: 1,
    explanation:
      "Work with sprayed asbestos coatings (limpet asbestos) always requires an HSE licence because it is one of the highest-risk ACMs. Sprayed coatings have a very high asbestos content and are extremely friable, releasing large quantities of fibres when disturbed. The other options describe work that can typically be carried out as non-licensed or NNLW.",
  },
  {
    id: 2,
    question:
      "How many days' written notification to the HSE is required before starting licensed asbestos work?",
    options: [
      "7 days",
      "14 days",
      "28 days",
      "No notification is required for licensed work",
    ],
    correctAnswer: 1,
    explanation:
      "Licensed work requires 14 days' written notification to the HSE before work begins. This gives the HSE time to review the plan of work and potentially inspect the site. In genuine emergency situations, the 14-day period can be reduced, but this must be agreed with the HSE in advance.",
  },
  {
    id: 3,
    question:
      "Which of the following is a criterion for work to be classified as notifiable non-licensed work (NNLW)?",
    options: [
      "The work involves sprayed asbestos coatings",
      "The work is sporadic and low intensity with short duration tasks",
      "The work requires a full enclosure to be constructed",
      "Worker exposure is expected to exceed the control limit",
    ],
    correctAnswer: 1,
    explanation:
      "For work to qualify as NNLW, it must be sporadic and low intensity, involve short-duration tasks, and worker exposure must not exceed the control limit. If any of these criteria are not met — for example, if exposure is expected to exceed the control limit or if the work involves sprayed coatings — the work must be treated as licensed work.",
  },
  {
    id: 4,
    question:
      "What is the minimum level of RPE recommended for non-licensed asbestos work?",
    options: [
      "A standard dust mask",
      "FFP3 disposable respirator",
      "Full-face powered air respirator",
      "No RPE is required for non-licensed work",
    ],
    correctAnswer: 1,
    explanation:
      "An FFP3 disposable respirator is the recommended minimum for non-licensed asbestos work. Standard dust masks do not provide adequate protection against asbestos fibres. While full-face powered air respirators provide higher protection, they are typically required for licensed work. Even for the lowest-risk category, FFP3 protection is recommended as good practice.",
  },
  {
    id: 5,
    question:
      "A contractor removes textured coating by hand using wet/steam methods. What category of work is this?",
    options: [
      "Licensed work",
      "Notifiable non-licensed work (NNLW)",
      "Non-licensed work",
      "Prohibited work",
    ],
    correctAnswer: 2,
    explanation:
      "Removing textured coatings by hand using wet methods (steam or wet scraping) is classified as non-licensed work because fibre release is kept to a minimum. However, if power tools were used instead, the work would be reclassified as NNLW because power tools generate significantly more dust and airborne fibres. The method of work is the determining factor.",
  },
  {
    id: 6,
    question:
      "Which HSE publication provides task sheets for common non-licensed asbestos tasks?",
    options: [
      "L143 — Managing and working with asbestos",
      "HSG210 — Asbestos Essentials",
      "HSG264 — Asbestos: The survey guide",
      "INDG223 — A short guide to managing asbestos",
    ],
    correctAnswer: 1,
    explanation:
      "HSG210 'Asbestos Essentials' provides practical task sheets for common non-licensed asbestos tasks. These task sheets give step-by-step guidance on how to carry out specific tasks safely, including what equipment is needed, what controls to use, and how to dispose of waste. L143 is the Approved Code of Practice, HSG264 covers surveys, and INDG223 is a short introductory guide.",
  },
  {
    id: 7,
    question:
      "What is one of the most common mistakes when categorising asbestos work?",
    options: [
      "Assuming all asbestos work requires a licence",
      "Treating licensed work as non-licensed work",
      "Notifying the HSE too early before starting work",
      "Providing too much training for non-licensed work",
    ],
    correctAnswer: 1,
    explanation:
      "Treating licensed work as non-licensed work is one of the most serious and common mistakes. This means workers are exposed to high-risk ACMs without adequate controls, training, or medical surveillance. It is a criminal offence that can lead to prosecution and imprisonment. Other common mistakes include not notifying NNLW to the HSE and assuming 'non-licensed' means 'no controls needed'.",
  },
  {
    id: 8,
    question:
      "How often must medical surveillance be carried out for workers performing licensed asbestos work?",
    options: [
      "Every year",
      "Every 2 years",
      "Every 3 years",
      "Every 5 years",
    ],
    correctAnswer: 1,
    explanation:
      "Medical surveillance for workers carrying out licensed asbestos work must be carried out every 2 years. This includes a medical examination by an HSE-appointed doctor (EMAS). Records of medical surveillance must be kept for 40 years. For NNLW, health records must also be kept for 40 years, though the medical surveillance requirements are slightly different.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const AsbestosModule4Section1 = () => {
  useSEO({
    title:
      "Categories of Asbestos Work | Asbestos Awareness Module 4 Section 1",
    description:
      "Learn about the three categories of asbestos work under CAR 2012: licensed work, notifiable non-licensed work (NNLW), and non-licensed work. Understand how to determine the correct category.",
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
            <Link to="../asbestos-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Layers className="h-10 w-10 text-orange-500 mx-auto mb-4" />
          <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 4 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Categories of Asbestos Work
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding the three categories of asbestos work under CAR 2012 &mdash; how to
            determine the correct category, what controls are required, and the consequences of
            getting it wrong
          </p>
        </div>

        {/* ─── 01 Three Categories Under CAR 2012 ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            Three Categories Under CAR 2012
          </h2>
          <div className="space-y-4 text-white">
            <p>
              The Control of Asbestos Regulations 2012 divides all asbestos work into{" "}
              <strong>three categories</strong> based on risk. The category determines the level
              of control, notification, training, and supervision required for the work to be
              carried out lawfully and safely.
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-3 sm:p-4 bg-orange-500/10 border-l-2 border-l-orange-500/50 border border-orange-500/30">
                <p className="font-semibold text-base text-orange-400 mb-2">Why It Matters</p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Getting the category <strong>wrong can result in prosecution</strong> &mdash;
                      carrying out licensed work without a licence is a criminal offence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Each category has different requirements for notification, training, RPE,
                      medical surveillance, and record-keeping.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Always <strong>err on the side of caution</strong> &mdash; if in any doubt
                      about the category, treat it as the higher-risk category.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-orange-500/10 border-l-2 border-l-orange-500/50 border border-orange-500/30">
                <p className="font-semibold text-base text-orange-400 mb-2">The Three Categories</p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span>
                      <strong>Licensed work</strong> &mdash; highest risk, requires HSE licence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>
                      <strong>Notifiable non-licensed work (NNLW)</strong> &mdash; medium risk,
                      requires HSE notification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span>
                      <strong>Non-licensed work</strong> &mdash; lowest risk, still requires controls
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-red-300">If in Doubt &mdash; Go Higher</h3>
              </div>
              <p className="text-white/80 text-sm">
                If there is <strong className="text-white">any doubt</strong> about which category
                applies, always treat the work as the higher-risk category. It is far better to
                apply more controls than necessary than to under-protect workers. A licensed
                contractor can carry out work in all three categories, so engaging a licensed
                contractor eliminates the risk of miscategorisation.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 Licensed Work (Highest Risk) ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">02</span>
              Licensed Work (Highest Risk)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Licensed work covers the most dangerous types of asbestos work. The contractor
                must hold a <strong>current HSE asbestos licence</strong> before starting any
                licensed work. The licence is granted by the HSE and is subject to regular review
                and renewal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Types of Work That ALWAYS Require a Licence
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Sprayed asbestos coatings</strong> (limpet asbestos) &mdash; extremely
                      friable with very high fibre content
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Asbestos lagging / pipe insulation</strong> &mdash; commonly found on
                      heating systems, boilers, and industrial pipework
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Asbestos insulating board (AIB)</strong> &mdash; unless it meets
                      specific NNLW criteria for short-duration, low-intensity work
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Any work where exposure cannot be reduced below the control limit</strong>{" "}
                      &mdash; regardless of the ACM type
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Licensed Work Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>14-day written notification</strong> to the HSE required before work
                      begins (can be reduced in genuine emergencies with HSE agreement)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Full medical surveillance</strong> every 2 years by an HSE-appointed
                      doctor
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Detailed plan of work</strong> must be prepared and made available
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Full enclosure</strong> may be needed, with negative pressure and
                      HEPA-filtered air extraction
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Air monitoring</strong> required throughout the work and during
                      clearance
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>4-stage clearance</strong> process before the area can be reoccupied
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Designated waste route</strong> &mdash; double-bagged, labelled, and
                      disposed of at a licensed waste facility
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Workers must hold <strong>appropriate training and competence cards</strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Records kept for 40 years</strong> from the date of last entry
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Traffic-Light Diagram — 3-Tier Work Categories ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-orange-400" />
            3-Tier Work Categories at a Glance
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            The diagram below compares the three categories of asbestos work side by side.
            Use it as a quick reference when determining the category for a particular task.
          </p>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {/* RED — Licensed Work */}
            <div className="rounded-xl border-2 border-red-500/50 bg-red-500/5 overflow-hidden">
              <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-3 text-center">
                <p className="text-red-400 font-bold text-lg">Licensed Work</p>
                <p className="text-red-300/70 text-xs uppercase tracking-wider mt-0.5">
                  Highest Risk
                </p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Examples
                  </p>
                  <p className="text-white/80">
                    Sprayed coatings, pipe lagging, AIB (general)
                  </p>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Notification
                  </p>
                  <p className="text-white/80">14 days to HSE (ASB5)</p>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Training
                  </p>
                  <p className="text-white/80">Full asbestos training + competence</p>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Medical
                  </p>
                  <p className="text-white/80">Surveillance every 2 years</p>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    RPE
                  </p>
                  <p className="text-white/80">Full-face or powered air</p>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Enclosure
                  </p>
                  <p className="text-white/80">Full enclosure may be required</p>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Air Monitoring
                  </p>
                  <p className="text-white/80">Required</p>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Clearance
                  </p>
                  <p className="text-white/80">4-stage clearance</p>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Records
                  </p>
                  <p className="text-white/80">40 years</p>
                </div>
              </div>
            </div>

            {/* AMBER — NNLW */}
            <div className="rounded-xl border-2 border-amber-500/50 bg-amber-500/5 overflow-hidden">
              <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3 text-center">
                <p className="text-amber-400 font-bold text-lg">NNLW</p>
                <p className="text-amber-300/70 text-xs uppercase tracking-wider mt-0.5">
                  Medium Risk
                </p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Examples
                  </p>
                  <p className="text-white/80">
                    Textured coatings (power tools), AC with power tools, short-duration AIB work
                  </p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Notification
                  </p>
                  <p className="text-white/80">ASB5 online to HSE before work</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Training
                  </p>
                  <p className="text-white/80">Asbestos awareness + task-specific</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Medical
                  </p>
                  <p className="text-white/80">Health records kept 40 years</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    RPE
                  </p>
                  <p className="text-white/80">FFP3 minimum</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Enclosure
                  </p>
                  <p className="text-white/80">Mini-enclosure or localised controls</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Air Monitoring
                  </p>
                  <p className="text-white/80">May be required</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Clearance
                  </p>
                  <p className="text-white/80">Visual inspection + possible air test</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Records
                  </p>
                  <p className="text-white/80">40 years</p>
                </div>
              </div>
            </div>

            {/* GREEN — Non-Licensed Work */}
            <div className="rounded-xl border-2 border-green-500/50 bg-green-500/5 overflow-hidden">
              <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3 text-center">
                <p className="text-green-400 font-bold text-lg">Non-Licensed</p>
                <p className="text-green-300/70 text-xs uppercase tracking-wider mt-0.5">
                  Lowest Risk
                </p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Examples
                  </p>
                  <p className="text-white/80">
                    AC sheets by hand, textured coatings by hand (wet), floor tiles
                  </p>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Notification
                  </p>
                  <p className="text-white/80">None required</p>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Training
                  </p>
                  <p className="text-white/80">Asbestos awareness</p>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Medical
                  </p>
                  <p className="text-white/80">Not required (but recommended)</p>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    RPE
                  </p>
                  <p className="text-white/80">FFP3 recommended</p>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Enclosure
                  </p>
                  <p className="text-white/80">Not required &mdash; localised controls</p>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Air Monitoring
                  </p>
                  <p className="text-white/80">Not usually required</p>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Clearance
                  </p>
                  <p className="text-white/80">Visual inspection</p>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Records
                  </p>
                  <p className="text-white/80">Good practice to keep</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-4 italic">
            On mobile, scroll down to compare all three categories
          </p>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Notifiable Non-Licensed Work (NNLW) ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">03</span>
              Notifiable Non-Licensed Work (NNLW)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                NNLW is the middle category &mdash; work that does not require a full HSE licence
                but still needs <strong>notification to the HSE</strong> before work begins. This
                category was introduced by CAR 2012 to provide additional regulatory oversight for
                work that falls between the extremes of licensed and non-licensed.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="text-amber-400 font-semibold mb-3">
                  Criteria for NNLW (ALL Must Be Met)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      The work must be <strong>sporadic and low intensity</strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Worker exposure must <strong>not exceed the control limit</strong> (0.1
                      f/cm&sup3; over 4 hours)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      The work must involve <strong>short-duration tasks</strong>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  If any of these criteria are not met, the work must be treated as licensed work.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Examples of NNLW</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Removal of <strong>textured coatings</strong> containing asbestos using power
                      tools
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Drilling, cutting, or working with <strong>asbestos cement using power
                      tools</strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Short-duration work with <strong>asbestos insulating board (AIB)</strong>{" "}
                      where strict controls are in place
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Removing <strong>asbestos-containing floor tiles</strong> with power tools
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">NNLW Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>ASB5 online notification</strong> to the HSE before work begins
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Health records kept for 40 years</strong> from the date of the last
                      entry
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Medical surveillance</strong> for all workers carrying out NNLW
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Appropriate <strong>RPE and PPE</strong> must be provided and used correctly
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Task-specific training</strong> beyond basic asbestos awareness
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Workers must be under <strong>adequate supervision</strong> at all times
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 04 Non-Licensed Work (Lowest Risk) ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">04</span>
              Non-Licensed Work (Lowest Risk)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Non-licensed work is the lowest-risk category. It does not require an HSE licence
                or notification. However, it <strong>still requires appropriate controls and
                awareness training</strong> &mdash; there is no category of asbestos work where no
                precautions are needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Examples of Non-Licensed Work</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Removing <strong>intact asbestos cement sheets by hand</strong> (careful
                      dismantling without breaking)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Removing <strong>textured coatings by hand</strong> using wet methods
                      (steam/wet scraping)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Removing <strong>asbestos-containing floor tiles by hand</strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Minor work with <strong>asbestos-containing gaskets or rope seals</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Non-Licensed Work Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Asbestos awareness training</strong> for all operatives involved
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Appropriate <strong>RPE (FFP3 recommended)</strong> as good practice
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Wet working methods</strong> to suppress fibre release
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Proper <strong>waste disposal procedures</strong> &mdash; double-bagged,
                      labelled, and taken to a licensed waste facility
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Basic controls</strong> to minimise exposure &mdash; localised
                      containment, HEPA vacuum, damp rags
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    &ldquo;Lowest Risk&rdquo; Is NOT &ldquo;No Risk&rdquo;
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  The &ldquo;lowest risk&rdquo; category still involves working with a material
                  that causes fatal diseases. There is <strong className="text-white">no safe
                  level</strong> of asbestos exposure. Even non-licensed work requires a risk
                  assessment, a plan of work, appropriate training, and suitable control measures.
                  Complacency in the lowest-risk category has led to avoidable exposures and HSE
                  enforcement action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 05 How to Determine the Category ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">05</span>
              How to Determine the Category
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Determining the correct category requires you to consider several factors about
                the work to be carried out. The following questions will help guide the decision:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Key Factors to Consider</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The type of ACM:</strong> Is it sprayed coating, lagging, AIB, asbestos
                      cement, textured coating, or another material? Higher-risk ACMs (sprayed
                      coatings, lagging) always require licensed work.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The method of work:</strong> Will power tools be used? Power tools
                      generate more fibres and can push work into a higher category. Hand methods
                      with wet suppression keep fibre release lower.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The duration:</strong> Is the work a short, one-off task or a
                      prolonged activity? Longer-duration work may move up a category.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The expected fibre release:</strong> How much fibre is likely to become
                      airborne? Materials in poor condition or those that are highly friable release
                      more fibres.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">Guidance &amp; Resources</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>HSG210 &mdash; Asbestos Essentials:</strong> Provides task sheets for
                      common non-licensed tasks, including step-by-step guidance on equipment,
                      controls, and waste disposal.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      If there is <strong>ANY doubt</strong> about the category, seek advice from a
                      competent person (e.g. an asbestos consultant or licensed contractor).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      A <strong>licensed contractor can carry out ALL categories</strong> of work
                      &mdash; licensed, NNLW, and non-licensed.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      A <strong>non-licensed contractor cannot carry out licensed work</strong>{" "}
                      &mdash; doing so is a criminal offence.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The <strong>dutyholder and contractor share responsibility</strong> for
                      ensuring the correct category is applied.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 06 Common Mistakes ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">06</span>
              Common Mistakes
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The following mistakes are commonly encountered in practice. Being aware of them
                will help you avoid serious legal and safety consequences.
              </p>

              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-red-300 font-semibold mb-1">
                        Treating Licensed Work as Non-Licensed
                      </h3>
                      <p className="text-white/80 text-sm">
                        This is the <strong className="text-white">most serious mistake</strong>{" "}
                        and constitutes a criminal offence. Workers are exposed to high-risk ACMs
                        without adequate controls, medical surveillance, or training. This can
                        result in prosecution, unlimited fines, and imprisonment for up to 2 years.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-amber-300 font-semibold mb-1">
                        Not Notifying NNLW to the HSE
                      </h3>
                      <p className="text-white/80 text-sm">
                        Failing to submit an ASB5 notification before NNLW is a breach of CAR 2012.
                        It also means health records may not be properly established, depriving
                        workers of important long-term health monitoring.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-amber-300 font-semibold mb-1">
                        Assuming Textured Coatings Are Always Non-Licensed
                      </h3>
                      <p className="text-white/80 text-sm">
                        The category depends on the <strong className="text-white">method of
                        removal</strong>. Removing textured coatings by hand using wet methods is
                        typically non-licensed work. However, using power tools pushes it into the
                        NNLW category because of the increased fibre release. Always check the
                        planned method before determining the category.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-amber-300 font-semibold mb-1">
                        Not Keeping Health Records for NNLW
                      </h3>
                      <p className="text-white/80 text-sm">
                        Health records for NNLW must be kept for <strong className="text-white">40
                        years</strong>. This is a legal requirement, not optional. Many contractors
                        fail to establish and maintain these records, leaving workers without
                        evidence of exposure that may be critical decades later when
                        asbestos-related diseases develop.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-orange-300 font-semibold mb-1">
                        Not Providing Adequate Training for Non-Licensed Work
                      </h3>
                      <p className="text-white/80 text-sm">
                        Even the lowest-risk category requires asbestos awareness training.
                        Workers who have not been trained cannot recognise ACMs, understand the
                        risks, or apply the correct control measures. Untrained workers are far
                        more likely to disturb asbestos unknowingly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-orange-300 font-semibold mb-1">
                        Assuming &ldquo;Non-Licensed&rdquo; Means &ldquo;No Controls Needed&rdquo;
                      </h3>
                      <p className="text-white/80 text-sm">
                        Every category of asbestos work requires appropriate controls. Non-licensed
                        work still needs a risk assessment, a plan of work, RPE, wet working
                        methods, and proper waste disposal. The word &ldquo;non-licensed&rdquo;
                        refers only to the licensing requirement &mdash; it does not mean the work
                        is safe or unregulated.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">07</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      CAR 2012 divides asbestos work into <strong>three categories</strong>:
                      licensed (highest risk), NNLW (medium risk), and non-licensed (lowest risk).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Licensed work</strong> requires an HSE licence, 14-day notification,
                      medical surveillance every 2 years, full enclosure, air monitoring, and
                      4-stage clearance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>NNLW</strong> requires an ASB5 notification, health records kept for
                      40 years, medical surveillance, and task-specific training.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Non-licensed work</strong> still requires awareness training,
                      appropriate RPE, wet methods, and proper waste disposal &mdash; it is NOT
                      &ldquo;no risk&rdquo; work.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>method of work</strong> (hand vs power tools) and the{" "}
                      <strong>type of ACM</strong> are key factors in determining the category.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      If in <strong>any doubt</strong>, treat the work as the higher-risk category.
                      A licensed contractor can carry out work in all three categories.
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
            <span className="text-orange-400/80 text-sm font-normal">08</span>
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
            title="Categories of Asbestos Work Quiz"
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
            <Link to="../asbestos-awareness-module-3-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Presuming, Sampling &amp; Analysis
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-4-section-2">
              Next: Risk Assessment &amp; Method Statements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default AsbestosModule4Section1;
