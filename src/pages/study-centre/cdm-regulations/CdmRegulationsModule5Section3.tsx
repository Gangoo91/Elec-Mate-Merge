import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  HardHat,
  Droplets,
  Coffee,
  Shirt,
  Scale,
  Users,
  GlassWater,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  QUICK CHECK QUESTIONS                                              */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    id: "cdm-m5s3-schedule2-day-one",
    question:
      "A client appoints a principal contractor to begin construction work on Monday morning. The PC arrives on site and says the welfare facilities will be ordered this week and should be on site by Wednesday. Is this acceptable under CDM 2015?",
    options: [
      "Yes — a two-day delay is reasonable to allow for logistics",
      "No — CDM 2015 requires that welfare facilities complying with Schedule 2 are available from day one of the construction phase; work must not begin until they are in place",
      "Yes — as long as the PC provides bottled water and allows workers to use a nearby public toilet",
      "No — but only if there are more than five workers on site",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 4(8) of CDM 2015 requires the client to ensure that welfare facilities are provided before construction work begins. The principal contractor must not start work unless satisfied that Schedule 2 facilities are or will be available. A two-day gap is not acceptable — facilities must be in place on the first day. The client should have made arrangements during pre-construction so that facilities were delivered and operational before the construction phase started.",
  },
  {
    id: "cdm-m5s3-washing-showers",
    question:
      "Workers on a construction site are removing old lead paint from structural steelwork. The site has washing facilities with hot and cold water, soap, and paper towels, but no showers. Is this sufficient?",
    options: [
      "Yes — hot and cold water with soap meets the Schedule 2 requirements",
      "No — showers must be provided where the nature of the work involves exposure to hazardous substances such as lead, to ensure workers can properly decontaminate before eating, drinking, or leaving site",
      "Yes — showers are only required on sites with more than 50 workers",
      "No — but only if the workers are employed directly by the principal contractor",
    ],
    correctIndex: 1,
    explanation:
      "Schedule 2 of CDM 2015 requires showers to be provided where the nature of the work demands it — specifically where workers are exposed to hazardous substances such as lead, asbestos, or chemicals. Lead paint removal is a notifiable activity under the Control of Lead at Work Regulations 2002, and workers must be able to shower to remove lead contamination from their skin and hair before breaks and at the end of the shift. Hand-washing alone is insufficient for this type of contamination.",
  },
  {
    id: "cdm-m5s3-enforcement-indicator",
    question:
      "During an HSE site inspection, the inspector finds that the site toilets are dirty, there is no soap at the washing stations, and the drinking water tap is unlabelled and adjacent to a non-potable supply. The inspector says this indicates wider management failings. Why does the HSE view welfare failures this way?",
    options: [
      "Because welfare is the most expensive item on site, so poor welfare means poor budgeting",
      "Because the HSE is primarily concerned with worker comfort rather than safety",
      "Because welfare provision is a reliable indicator of overall site management standards — a PC who cannot maintain basic toilets and washing facilities is unlikely to be managing more complex risks such as falls from height, structural stability, or hazardous substances effectively",
      "Because welfare failures always result in prosecution, which generates revenue for the HSE",
    ],
    correctIndex: 2,
    explanation:
      "The HSE consistently reports that welfare provision is a barometer of overall site management. Maintaining clean toilets, stocked washing stations, and properly labelled drinking water requires basic management discipline — planning, monitoring, and corrective action. If a PC cannot manage these simple requirements, the HSE has good reason to suspect that more complex and dangerous aspects of the project are also poorly managed. This is why welfare failures often trigger a more thorough inspection of the entire site.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs                                                               */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question:
      "Who pays for welfare facilities on a construction site — the client or the principal contractor?",
    answer:
      "The client is responsible for making suitable arrangements for welfare facilities, which includes ensuring adequate funding. In practice, the cost is typically built into the project budget and the principal contractor manages the provision on a day-to-day basis. However, the client cannot avoid their legal duty by claiming they delegated it to the PC — if welfare facilities are inadequate, the client can be held liable for failing to make suitable arrangements under Regulation 4(8). On smaller projects with domestic clients, the duty transfers to the contractor or PC automatically, but the principle remains that welfare must be budgeted for and provided from day one.",
  },
  {
    question:
      "Are portable chemical toilets acceptable as sanitary conveniences under CDM 2015?",
    answer:
      "Flushing toilets connected to a mains drain or suitable drainage system should be provided wherever reasonably practicable. Portable chemical toilets may be used only where it is genuinely not reasonably practicable to provide flushing toilets — for example, on very short-duration works in remote locations with no water or drainage connection. Even then, chemical toilets must be properly maintained, cleaned regularly, adequately ventilated, and provided with hand-washing facilities nearby. On most construction sites of any significant duration, the HSE expects flushing toilets. Relying on chemical toilets when flushing alternatives are practicable is likely to result in an improvement notice.",
  },
  {
    question:
      "Do welfare requirements apply to small domestic construction projects such as a house extension?",
    answer:
      "Yes. CDM 2015 applies to all construction work, including domestic projects. For domestic clients, the duties that would normally fall on the client transfer automatically to the contractor (or principal contractor if there is more than one contractor). The contractor must ensure that adequate welfare facilities are provided. On very small or short-duration domestic works, the existing facilities in the client's house may be used by agreement, but this must be a genuine arrangement — not a default assumption. Workers must have access to a toilet, washing facilities with hot and cold water, a facility to warm food and make hot drinks, and somewhere sheltered to rest and eat. If the domestic client's facilities are not available, the contractor must provide alternatives.",
  },
  {
    question:
      "What should I do if the welfare facilities on my construction site are inadequate?",
    answer:
      "First, raise the issue with your supervisor or site manager — they may not be aware of the problem, and the principal contractor has a legal duty to maintain adequate welfare. If nothing changes, speak to your health and safety representative or trade union. You also have the right to report the issue directly to the HSE using their confidential concerns line (0300 003 1647) or online form. Workers are protected by whistleblowing legislation and cannot lawfully be dismissed or penalised for raising legitimate health and safety concerns. Poor welfare is a legal breach, not something to tolerate — the construction industry has moved on from the days when inadequate facilities were considered normal.",
  },
];

/* ------------------------------------------------------------------ */
/*  QUIZ QUESTIONS                                                     */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under CDM 2015, who is responsible for ensuring welfare facilities are available on site before construction work begins?",
    options: [
      "The principal contractor",
      "The client",
      "The individual workers",
      "The local authority",
    ],
    correctAnswer: 1,
    explanation:
      "Under CDM 2015 Regulation 4(8), it is the client's duty to ensure that welfare facilities are available on the construction site before any construction work begins. The client must make suitable arrangements, including budgeting and planning, so that facilities complying with Schedule 2 are operational from day one. Once construction is underway, the principal contractor takes responsibility for maintaining and managing those facilities.",
  },
  {
    id: 2,
    question:
      "What is the minimum ratio of flushing toilets to workers required under Schedule 2 of CDM 2015?",
    options: [
      "1 toilet per 15 workers",
      "1 toilet per 7 workers",
      "1 toilet per 10 workers",
      "1 toilet per 20 workers",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 2 of CDM 2015, read alongside the guidance in HSE publication L153, requires a minimum of 1 flushing toilet (or suitable alternative where flushing is not reasonably practicable) per 7 workers. These must be adequately ventilated, lit, and maintained in a clean and orderly condition. Separate facilities or lockable single-occupancy cubicles must be provided for men and women.",
  },
  {
    id: 3,
    question:
      "When must washing facilities include showers on a construction site?",
    options: [
      "On every construction site regardless of the work being carried out",
      "Only on sites with more than 50 workers",
      "Where the work is particularly dirty, involves exposure to contaminants, or involves work with hazardous substances",
      "Only when specifically requested by the workforce",
    ],
    correctAnswer: 2,
    explanation:
      "Showers must be provided where the nature of the work involves exposure to contaminants, hazardous substances, or is particularly dirty. This includes work involving asbestos, lead, certain chemicals, or heavily dusty and dirty conditions where ordinary washing is insufficient to prevent workers carrying contaminants home or to other areas of the site. The requirement is based on the nature of the work, not the number of workers.",
  },
  {
    id: 4,
    question:
      "Which of the following is a legal requirement for drinking water provision on a construction site?",
    options: [
      "Bottled water must be provided as the primary supply",
      "Water must be available only in the rest area",
      "Wholesome drinking water must be readily accessible, clearly marked, and free from contamination risk, with cups or a drinking fountain provided",
      "Drinking water only needs to be available during scheduled break times",
    ],
    correctAnswer: 2,
    explanation:
      "Schedule 2 requires that an adequate supply of wholesome drinking water is provided and is readily accessible at suitable and clearly marked points. Cups or other drinking vessels must be provided unless the supply is from a drinking fountain. The supply must be protected from contamination and must not be confused with non-potable water used for construction processes. Workers must be able to access drinking water throughout the working day, not only during breaks.",
  },
  {
    id: 5,
    question:
      "What facilities must be provided in a rest area on a construction site under Schedule 2?",
    options: [
      "A television and comfortable seating only",
      "Heated, sheltered accommodation with tables, seating, means of preparing hot drinks, and means of warming food",
      "Just a covered area with folding chairs",
      "A canteen with full catering staff",
    ],
    correctAnswer: 1,
    explanation:
      "Rest facilities must be heated, sheltered from the weather, and provided with tables and seating with backs. Workers must have access to a means of boiling water (for hot drinks) and a means of warming food (such as a microwave). The rest area must be separate from the work area and kept clean and orderly. The size must be adequate for the number of workers using it at any one time.",
  },
  {
    id: 6,
    question:
      "What specific provision must be made for workers who need to change into specialist clothing on site?",
    options: [
      "They can change in the rest area to save space",
      "Separate changing facilities with secure storage for personal clothing and drying facilities for wet clothing must be provided",
      "A screened area near the work zone is sufficient",
      "No specific provision is required — workers can change anywhere convenient",
    ],
    correctAnswer: 1,
    explanation:
      "Where workers need to wear special clothing (such as protective overalls, hi-vis, or PPE), separate changing facilities must be provided. These must include secure storage for workers' own clothing (so it is not contaminated or stolen), and drying facilities for wet working clothing. Changing areas must offer privacy and be separate from the rest area to prevent contamination of the eating environment. Separate facilities or time-separated use must be arranged for men and women.",
  },
  {
    id: 7,
    question:
      "A construction site has 36 workers. The principal contractor has provided 4 toilets and says this is adequate. Is the PC correct?",
    options: [
      "Yes — 4 toilets for 36 workers is generous",
      "No — with 36 workers the minimum requirement is 6 toilets (36 divided by 7, rounded up)",
      "Yes — the requirement is 1 toilet per 10 workers",
      "No — 36 workers require at least 10 toilets",
    ],
    correctAnswer: 1,
    explanation:
      "The minimum ratio is 1 toilet per 7 workers. For 36 workers: 36 / 7 = 5.14, which rounds up to 6. The PC must provide a minimum of 6 toilets. Providing only 4 is a breach of Schedule 2 and would likely result in an improvement notice from the HSE. The PC should also consider whether additional toilets are needed based on the site layout, shift patterns, and nature of the work.",
  },
  {
    id: 8,
    question:
      "What is the most common welfare-related enforcement action taken by the HSE on construction sites?",
    options: [
      "Prosecution for lack of drinking water",
      "Improvement notices for inadequate toilet and washing facilities (dirty, insufficient number, no hot water, poor maintenance)",
      "Prohibition notices for missing rest facilities",
      "Written warnings for no changing rooms",
    ],
    correctAnswer: 1,
    explanation:
      "The most common welfare enforcement action by the HSE involves improvement notices relating to inadequate sanitary and washing facilities. Common failures include dirty or unmaintained toilets, insufficient number of toilets for the workforce, no hot water at washing stations, no soap or drying facilities, and failure to maintain facilities in a clean condition. The HSE takes welfare breaches seriously as they indicate a wider disregard for worker health and safety management.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function CdmRegulationsModule5Section3() {
  useSEO({
    title: "Welfare Facilities | CDM Regulations Module 5.3",
    description:
      "Schedule 2 welfare requirements under CDM 2015: sanitary conveniences, washing facilities, drinking water, rest facilities, changing rooms, and HSE enforcement on construction sites.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ------------------------------------------------------------ */}
      {/*  Sticky Header                                                */}
      {/* ------------------------------------------------------------ */}
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
              Module 5 {"\u2022"} Section 3
            </p>
            <h1 className="text-sm font-semibold text-white truncate">
              Welfare Facilities
            </h1>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/*  Main Content                                                 */}
      {/* ------------------------------------------------------------ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Badge, Title, Subtitle */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <ShieldCheck className="h-8 w-8 text-blue-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              MODULE 5 {"\u2022"} SECTION 3
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welfare Facilities
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Understanding the minimum welfare facility requirements under
            Schedule 2 of CDM 2015 — what must be provided, who is
            responsible, and what happens when standards are not met
          </p>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Summary Boxes                                                */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Schedule 2 of CDM 2015 sets out mandatory welfare requirements for
            every construction site. The client must ensure facilities are
            available before work begins, and the principal contractor must
            maintain them throughout. These include flushing toilets (minimum
            1 per 7 workers), hot and cold running water for washing, wholesome
            drinking water, heated rest facilities with means of preparing hot
            drinks and warming food, and changing facilities where special
            clothing is required. Failure to provide adequate welfare is one of
            the most common reasons for HSE enforcement action on construction
            sites.
          </p>
        </div>

        <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            On Site
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            When you arrive on a construction site, check that welfare
            facilities are available and in good condition. Can you find clean
            toilets? Is there hot and cold running water with soap for washing?
            Is drinking water clearly marked and accessible? Is there a heated
            rest area where you can sit, make a hot drink, and warm your food?
            If any of these are missing or inadequate, raise it with your
            supervisor — it is a legal requirement, not a luxury.
          </p>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Learning Outcomes                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Explain why adequate welfare provision matters on construction sites and its impact on health, dignity, and productivity",
              "Identify the welfare facility requirements set out in Schedule 2 of CDM 2015 and who is responsible for providing them",
              "State the minimum standards for sanitary conveniences, including the ratio of toilets to workers and ventilation requirements",
              "Describe the requirements for washing facilities, including when showers must be provided",
              "Explain the requirements for drinking water provision, including marking, accessibility, and contamination prevention",
              "Describe the requirements for rest facilities and eating areas, including heating, seating, and separation from hazardous areas",
              "Explain the requirements for changing rooms and lockers, including drying facilities and secure storage",
              "Describe how the HSE enforces welfare requirements, the most common failures found on site, and the consequences of non-compliance",
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Quick Check                                                  */}
        {/* ------------------------------------------------------------ */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* ============================================================ */}
        {/*  SECTION 01 — Why Welfare Matters on Construction Sites       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-xl font-semibold text-white">
              Why Welfare Matters on Construction Sites
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              For decades, the construction industry had a poor reputation for
              welfare provision. Workers were expected to tolerate filthy
              toilets, cold water, no soap, and nowhere decent to eat their
              lunch. On too many sites, welfare was seen as an afterthought — a
              cost to be minimised rather than a basic standard to be maintained.
              The consequences were real: occupational skin disease from
              inadequate washing, gastrointestinal illness from poor sanitation,
              fatigue from nowhere to rest, and a general culture that
              devalued the workforce.
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              CDM 2015 changed this by making welfare legally enforceable
              through Schedule 2. The regulations set out clear minimum
              standards that must be met on every construction site, regardless
              of size or duration. These are not aspirational targets — they are
              legal requirements backed by the threat of enforcement action,
              including improvement notices, prohibition notices, prosecution,
              and unlimited fines.
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Adequate welfare provision is not just about compliance. It has a
              direct impact on worker health: proper washing facilities prevent
              dermatitis and the ingestion of hazardous substances; clean
              drinking water prevents dehydration and heat stress; rest
              facilities reduce fatigue-related accidents. It affects dignity:
              workers deserve to use clean toilets, wash with hot water, and eat
              their lunch in a clean, warm space — these are basic human needs,
              not luxuries. And it affects productivity: well-rested, properly
              hydrated workers who can take a decent break are measurably more
              productive and make fewer mistakes.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                The Client's Duty — Regulation 4(8)
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                CDM 2015 places the primary duty for welfare provision on the
                client. Under Regulation 4(8), the client must ensure that
                welfare facilities complying with Schedule 2 are available
                from the start of the construction phase. This means the client
                must plan and budget for welfare during the pre-construction
                phase, not leave it to the principal contractor to sort out on
                the first day. The facilities must be operational before any
                worker sets foot on site. A client who fails to make these
                arrangements can be personally liable for enforcement action,
                even if they appointed a competent PC.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                The Old Excuses No Longer Apply
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                "It's only a small job." "We'll sort the welfare out once
                we're set up." "The lads don't mind." "There's a pub down the
                road." None of these excuses have ever been acceptable, and
                under CDM 2015 they can lead directly to enforcement action.
                Schedule 2 applies to all construction work from day one. The
                HSE has made clear that welfare provision is non-negotiable — if
                you cannot provide adequate welfare, you should not be starting
                work.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Schedule 2: The Legal Requirements              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-xl font-semibold text-white">
              Schedule 2: The Legal Requirements
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Schedule 2 of the Construction (Design and Management)
              Regulations 2015 sets out the minimum welfare facilities that
              must be provided on every construction site. It is a
              comprehensive schedule covering five core categories of welfare
              provision: sanitary conveniences, washing facilities, drinking
              water, changing rooms and lockers, and rest facilities. These
              requirements apply from the first day of the construction phase
              and must be maintained throughout the project's duration.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                Responsibilities for Welfare Provision
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Client (Regulation 4(8))
                    </strong>{" "}
                    — must ensure that welfare facilities are provided from the
                    start of construction work. The client must make suitable
                    arrangements, including budgeting, so that facilities are
                    available before any worker sets foot on site
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Principal contractor (Regulation 13(4))
                    </strong>{" "}
                    — responsible for ensuring welfare facilities are maintained
                    and managed throughout the construction phase. The PC must
                    monitor that facilities remain adequate as the workforce
                    changes in number and composition
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Contractors (Regulation 15(11))
                    </strong>{" "}
                    — must not begin work on a construction site unless
                    satisfied that welfare facilities complying with Schedule 2
                    are or will be provided for their workers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Domestic clients
                    </strong>{" "}
                    — where the client is a domestic client, the duty to
                    arrange welfare facilities transfers to the contractor or
                    principal contractor automatically under Regulation 7
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              It is important to understand that mobile or temporary facilities
              are perfectly acceptable under Schedule 2, provided they meet the
              required standards. A portable welfare unit with flushing toilets,
              hot and cold running water, a rest area with heating, a kettle,
              and a microwave can fully comply with the regulations. The key is
              the standard of the facility, not whether it is a permanent
              building. On large or long-duration projects, more substantial
              welfare provision is expected, but the legal minimum applies to
              every project from a two-day domestic extension to a multi-year
              infrastructure scheme.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Schedule 2 — The Five Core Categories
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Schedule 2 organises welfare requirements into five distinct
                categories, each with specific legal standards:
              </p>
              <ol className="space-y-2 text-sm text-white/70 list-decimal list-inside">
                <li>
                  <strong className="text-white">Sanitary conveniences</strong>{" "}
                  — toilets in sufficient numbers, ventilated, lit, clean, and
                  separate for men and women
                </li>
                <li>
                  <strong className="text-white">Washing facilities</strong>{" "}
                  — hot and cold running water, soap, drying facilities, showers
                  where required
                </li>
                <li>
                  <strong className="text-white">Drinking water</strong>{" "}
                  — wholesome supply, clearly marked, cups provided, protected
                  from contamination
                </li>
                <li>
                  <strong className="text-white">Changing rooms and lockers</strong>{" "}
                  — where special clothing is needed, with secure storage and
                  drying facilities
                </li>
                <li>
                  <strong className="text-white">Rest facilities</strong>{" "}
                  — heated, sheltered, with seating, tables, and means of
                  heating food and boiling water
                </li>
              </ol>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Point — Day One Requirement
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Welfare facilities must be in place{" "}
                <strong className="text-white">before</strong> construction
                work begins — not a week later, not when the site is
                established. If a contractor sends workers to a site on
                Monday morning, there must be functioning toilets, washing
                facilities, drinking water, and a rest area available on that
                Monday morning. Starting work without welfare facilities is a
                breach of CDM 2015 from the very first hour.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 2 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* ============================================================ */}
        {/*  SECTION 03 — Sanitary Conveniences (Toilets)                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-xl font-semibold text-white">
              Sanitary Conveniences (Toilets)
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Adequate sanitary conveniences — toilets — must be provided on
              every construction site. These are one of the most fundamental
              welfare requirements, yet inadequate toilet facilities remain one
              of the most common welfare failures found by HSE inspectors.
              Dirty, insufficient, or poorly maintained toilets are the
              number-one welfare complaint from construction workers and the
              most frequent reason for welfare-related improvement notices.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                Sanitary Convenience Requirements
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Flushing toilets</strong>{" "}
                    must be provided wherever reasonably practicable — chemical
                    toilets are only acceptable where flushing is genuinely not
                    achievable (e.g., remote locations with no drainage)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Minimum ratio: 1 toilet per 7 workers
                    </strong>{" "}
                    — this is the baseline standard from BS 6465. Additional
                    toilets may be needed depending on the nature of the work,
                    shift patterns, and site layout
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Separate facilities for men and women
                    </strong>{" "}
                    — separate toilet facilities for male and female workers, or
                    individual lockable single-occupancy cubicles usable by
                    either gender. On sites with a mixed workforce, this must be
                    planned from the outset
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Adequately ventilated and lit
                    </strong>{" "}
                    — ventilation must be adequate (natural or mechanical) and
                    lighting sufficient for safe use at all times, including
                    early mornings and evenings in winter
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Connected to water supply
                    </strong>{" "}
                    — flushing toilets must be connected to a suitable water
                    supply and drainage system. Where this is not possible,
                    chemical alternatives must be properly maintained and
                    serviced regularly by a specialist contractor
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Clean and maintained
                    </strong>{" "}
                    — toilets must be kept in a clean, orderly condition with a
                    documented cleaning schedule. Toilet paper and hand-washing
                    facilities must be replenished regularly. The PC must assign
                    responsibility for cleaning and verify it is being done
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Within reasonable distance
                    </strong>{" "}
                    — toilets must be located within reasonable distance of the
                    work area. On large sites, multiple toilet facilities may be
                    needed to avoid workers travelling excessive distances
                  </span>
                </li>
              </ul>
            </div>

            {/* Minimum Welfare Standards Table */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/10 border border-blue-500/20 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Minimum Toilet Ratios — Workers vs Facilities
              </h4>
              <div className="space-y-2">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold mb-2">
                    <span className="text-blue-400">Workers on Site</span>
                    <span className="text-blue-400">Min. Toilets</span>
                    <span className="text-blue-400">Min. Wash Stations</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      ["1\u20137", "1", "1"],
                      ["8\u201314", "2", "2"],
                      ["15\u201321", "3", "3"],
                      ["22\u201328", "4", "4"],
                      ["29\u201335", "5", "5"],
                      ["36\u201342", "6", "6"],
                      ["43\u201349", "7", "7"],
                      ["50\u201356", "8", "8"],
                    ].map(([workers, toilets, wash], idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-3 gap-2 text-xs text-white/70"
                      >
                        <span>{workers}</span>
                        <span>{toilets}</span>
                        <span>{wash}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/60 italic">
                      <span>Every additional 7</span>
                      <span>+1</span>
                      <span>+1</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-xs mt-3 italic">
                These are minimum standards. The PC must assess whether
                additional facilities are needed based on shift patterns,
                site layout, nature of work, and specific workforce
                requirements.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Maintenance Schedules
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The principal contractor must establish and document a cleaning
                and maintenance schedule for all sanitary facilities. As a
                minimum, toilets should be cleaned at least once per day — more
                frequently on busy sites or where the workforce exceeds 50.
                Consumables (toilet paper, soap, hand sanitiser) must be checked
                and replenished at least twice daily. The cleaning schedule
                should be displayed in the welfare area, and records should be
                kept to demonstrate compliance in the event of an HSE
                inspection. Assigning named individuals to welfare maintenance
                is far more effective than leaving it as a collective
                responsibility.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04 — Washing Facilities                              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">
              04
            </span>
            <h3 className="text-xl font-semibold text-white">
              Washing Facilities
            </h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Adequate washing facilities are essential on construction sites
              to maintain basic hygiene, prevent the spread of disease, and
              remove contaminants from the skin before eating, drinking, or
              leaving site. Poor washing facilities are a significant health
              risk, particularly where workers handle hazardous substances.
              Occupational dermatitis — inflammation and damage to the skin
              caused by contact with workplace substances — is one of the most
              common occupational diseases in construction, and inadequate
              washing is a major contributing factor.
            </p>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Droplets className="h-4 w-4 text-cyan-400" />
                Washing Facility Requirements
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Hot and cold (or warm) running water
                    </strong>{" "}
                    — this is not optional. Cold water only is not sufficient.
                    Workers must be able to wash properly, which requires warm
                    or hot water. Portable instant hot water units are readily
                    available and inexpensive to hire
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Soap or suitable cleaning agents
                    </strong>{" "}
                    — ordinary soap for general use, plus specialist skin
                    cleansers where work involves particular contaminants (oils,
                    resins, adhesives, cement). Barrier creams should also be
                    available where appropriate
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Towels or other means of drying
                    </strong>{" "}
                    — paper towels, roller towels, or electric hand dryers.
                    Shared cloth towels are unhygienic and should not be used.
                    Disposable paper towels are the preferred option on most
                    construction sites
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Showers where the nature of the work requires it
                    </strong>{" "}
                    — showers with hot and cold water must be provided where
                    the work involves significant contamination: asbestos work,
                    lead work, work with certain chemicals, or particularly
                    dirty tasks. Showers must have adequate privacy and
                    be separate for men and women
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Located near toilets and changing rooms
                    </strong>{" "}
                    — washing facilities should be adjacent to or near the
                    sanitary conveniences and changing areas. Workers should not
                    have to walk significant distances between facilities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Accessibility considerations
                    </strong>{" "}
                    — where disabled workers are employed, at least one washing
                    station must be accessible, with adequate space for
                    manoeuvring and fixtures at an appropriate height
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Common Failure — No Hot Water
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                One of the most frequently cited welfare failures on
                construction sites is the absence of hot water at washing
                stations. Cold water alone does not effectively remove many
                construction contaminants (oils, greases, adhesives, cement
                residue) and is a deterrent to proper hand-washing, especially
                in cold weather. The HSE regularly issues improvement notices
                for this deficiency. There is no excuse — portable hot water
                units are readily available and inexpensive to hire, and the
                cost is negligible compared to the cost of enforcement action
                or the health consequences for workers.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 4 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* ============================================================ */}
        {/*  SECTION 05 — Drinking Water                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              05
            </span>
            <h3 className="text-xl font-semibold text-white">
              Drinking Water
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Access to clean, wholesome drinking water is a fundamental
              requirement on every construction site. Dehydration impairs
              concentration, reaction time, and physical performance — all of
              which increase accident risk. In hot weather or during physically
              demanding work, adequate hydration is critical. Construction
              workers performing heavy manual labour in summer conditions may
              need to consume significantly more water than under normal
              conditions, and the site must be able to meet this demand.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <GlassWater className="h-4 w-4 text-blue-400" />
                Drinking Water Requirements
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Adequate supply of wholesome drinking water
                    </strong>{" "}
                    — the water must be fit for drinking. Mains water supply is
                    the preferred source; where this is not available, bottled
                    water is acceptable as an interim measure provided it is
                    stored hygienically, kept within its use-by date, and
                    replenished as needed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Clearly marked</strong>{" "}
                    — drinking water points must be conspicuously marked so
                    workers can easily identify them and distinguish them from
                    non-potable water supplies. This is especially important on
                    construction sites where both types of supply commonly exist
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Cups or drinking fountains
                    </strong>{" "}
                    — unless the supply is from a drinking fountain, cups or
                    other suitable drinking vessels must be available. Disposable
                    cups or individually assigned refillable bottles are
                    preferred to prevent cross-contamination
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Not from a construction process supply
                    </strong>{" "}
                    — the drinking water supply must be entirely separate from
                    water used for construction processes such as dust
                    suppression, concrete mixing, or cleaning. Cross-connection
                    or shared pipework is a serious contamination risk
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Storage and temperature
                    </strong>{" "}
                    — drinking water must be stored and dispensed hygienically.
                    In hot weather, consideration should be given to keeping
                    water cool (insulated containers, cool storage). In freezing
                    conditions, precautions must be taken to prevent pipework
                    and taps from freezing and becoming unusable
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Non-Potable Water — A Serious Risk
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Construction sites frequently have both potable (drinking) and
                non-potable water supplies. Non-potable water may be used for
                dust suppression, concrete mixing, or cleaning. It is critical
                that non-potable supplies are clearly labelled as{" "}
                <strong className="text-white">
                  "NOT DRINKING WATER"
                </strong>{" "}
                and that pipework, taps, and hoses are colour-coded or
                physically separated to prevent accidental consumption. Drinking
                contaminated water can cause serious illness including
                gastroenteritis, Legionnaires' disease, or chemical poisoning.
                The HSE takes labelling failures very seriously given the
                potential consequences.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06 — Rest Facilities and Eating Areas                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm">
              06
            </span>
            <h3 className="text-xl font-semibold text-white">
              Rest Facilities and Eating Areas
            </h3>
          </div>
          <div className="border-l-2 border-green-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Rest facilities are essential for worker welfare, allowing
              people to take breaks, eat and drink in a clean environment, and
              recover from physical exertion. Inadequate rest facilities
              contribute to fatigue, which is a significant factor in
              construction accidents. A worker who has nowhere warm and clean to
              sit, eat a meal, and take a proper break is more likely to make
              errors, take shortcuts, and suffer health problems.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Coffee className="h-4 w-4 text-green-400" />
                Rest Facility Requirements
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Adequate seating
                    </strong>{" "}
                    — sufficient tables and chairs (with backs) for the number
                    of workers using the facility at any one time. Workers must
                    be able to sit comfortably to eat their meals, not perch on
                    upturned buckets or scaffolding
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Facilities for eating meals
                    </strong>{" "}
                    — clean tables at which workers can eat, with adequate space
                    for the number of people. The eating area must be
                    maintained in a hygienic condition with tables wiped and
                    bins emptied regularly
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Means of heating food and boiling water
                    </strong>{" "}
                    — a microwave or other appliance for warming food, and a
                    kettle, urn, or similar for boiling water so workers can
                    make hot drinks. Many construction workers bring food from
                    home and need these facilities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Protection from weather
                    </strong>{" "}
                    — the rest area must be weatherproof and sheltered from
                    rain, wind, and sun. Workers must be able to take breaks
                    in a dry, comfortable environment regardless of external
                    conditions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Separate from hazardous areas
                    </strong>{" "}
                    — the rest area must not be contaminated by dust, fumes,
                    noise, or hazardous substances from the work area. Workers
                    must not eat in areas where they could ingest harmful
                    materials
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Non-smoking policy
                    </strong>{" "}
                    — the rest area must comply with smoke-free legislation.
                    Smoking is not permitted in enclosed or substantially
                    enclosed welfare facilities. Designated smoking areas, if
                    provided, must be outside and away from the rest area
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Adequate heating, lighting, and ventilation
                    </strong>{" "}
                    — the rest area must be heated in cold weather, adequately
                    lit, and ventilated to prevent it becoming stuffy or damp.
                    Temperature, lighting, and air quality must be comfortable
                    for the duration of rest breaks
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                No Eating in the Work Area
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Workers must not eat or drink in the work area. This is
                particularly critical where hazardous substances are present —
                eating with contaminated hands or in a dusty environment can
                lead to ingestion of harmful materials. Cement dust, lead
                particles, silica, solvents, and other construction substances
                can cause serious illness if ingested. The provision of a
                separate, clean rest area is not just about comfort — it is a
                health protection measure that prevents ingestion exposure.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 6 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* ============================================================ */}
        {/*  SECTION 07 — Changing Rooms and Lockers                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">
              07
            </span>
            <h3 className="text-xl font-semibold text-white">
              Changing Rooms and Lockers
            </h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Where workers need to wear special clothing for their work —
              protective overalls, hi-vis, specialist PPE, or any clothing
              that is different from their ordinary personal clothing —
              suitable changing facilities must be provided. This requirement
              recognises that construction workers should not have to change
              in the open, in the rest area, or in their vehicles, and that
              proper separation of work and personal clothing is essential for
              health protection.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Shirt className="h-4 w-4 text-purple-400" />
                Changing Facility Requirements
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Required where workers change clothing
                    </strong>{" "}
                    — changing rooms must be provided wherever workers need to
                    change into or out of work clothing, PPE, or specialist
                    garments. This applies to the majority of construction
                    sites where workers wear overalls, hi-vis, or protective
                    clothing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Separate facilities for men and women
                    </strong>{" "}
                    — separate changing areas must be provided for male and
                    female workers. Where this is not practicable due to space
                    constraints, time-separated use with lockable doors is
                    acceptable, provided it is properly managed and monitored
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Secure storage for personal clothing
                    </strong>{" "}
                    — lockers or other secure storage must be provided so
                    workers' own clothes are not contaminated by work substances
                    and are not at risk of theft. Personal clothing must be
                    stored separately from contaminated work clothing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Drying facilities for wet work clothes
                    </strong>{" "}
                    — construction work frequently results in wet clothing
                    from rain, perspiration, or washing processes. A heated
                    drying area or drying cabinet must be provided so workers
                    do not have to put on wet clothing at the start of the next
                    shift. Wet clothing contributes to hypothermia risk in cold
                    weather
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Connection to washing facilities
                    </strong>{" "}
                    — changing rooms should be located adjacent to or connected
                    with washing facilities so workers can wash before changing
                    into their personal clothes. This is particularly important
                    where hazardous substances are involved
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Why Separation of Clothing Matters
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The separation of work clothing from personal clothing is a
                critical health protection measure, not merely a convenience.
                Workers who handle hazardous substances (lead, asbestos,
                cement, solvents, fibrous insulation) can carry those
                substances home on their clothing, exposing family members —
                including children — to harmful materials. This is known as
                secondary or para-occupational exposure and has been
                responsible for serious illness, including mesothelioma in
                family members of asbestos workers. Proper changing facilities
                with separate storage break this contamination pathway and
                protect not only the worker but their household.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08 — Enforcement and Common Failures                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">
              08
            </span>
            <h3 className="text-xl font-semibold text-white">
              Enforcement and Common Failures
            </h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Health and Safety Executive (HSE) actively enforces welfare
              requirements on construction sites. Welfare provision is one of
              the first things an HSE inspector checks during a site visit
              because it is a reliable indicator of overall management
              standards. Sites with poor welfare facilities almost invariably
              have other safety deficiencies. The HSE's position is clear: if
              a principal contractor cannot manage basic toilets and washing
              facilities, they are unlikely to be managing falls from height,
              structural stability, or hazardous substances effectively.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Scale className="h-4 w-4 text-red-400" />
                HSE Enforcement Approach
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Improvement notices
                    </strong>{" "}
                    — the most common enforcement tool for welfare failures. A
                    formal notice requiring the duty holder to remedy the
                    breach within a specified period (typically 21 days). The
                    notice specifies exactly what is wrong and what must be
                    done. Failure to comply with an improvement notice is a
                    criminal offence
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Prohibition notices
                    </strong>{" "}
                    — where welfare conditions are so poor that they pose an
                    immediate risk to health (e.g., complete absence of
                    sanitary facilities, contaminated drinking water), a
                    prohibition notice can stop work until the issue is
                    resolved. This is the "no welfare = no work" principle in
                    action
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Prosecution</strong>{" "}
                    — in serious cases or where improvement notices are not
                    complied with, the HSE can prosecute. Unlimited fines are
                    available to the courts. Both the PC and the client can
                    face prosecution for welfare failures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Fee for Intervention (FFI)
                    </strong>{" "}
                    — when the HSE identifies a material breach, the duty
                    holder must pay the HSE's costs for the investigation and
                    any follow-up, currently charged at {"\u00A3"}163 per hour.
                    Even a short welfare-related intervention can result in a
                    bill of several hundred pounds
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Most Common Welfare Failures Found by HSE
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      No welfare from day one
                    </strong>{" "}
                    — construction work started before welfare facilities were
                    in place. Workers expected to "manage" for the first few
                    days
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Inadequate cleaning
                    </strong>{" "}
                    — toilets that are not cleaned regularly, with no toilet
                    paper, broken seats, blocked drains, or overflowing waste.
                    This is the single most common welfare complaint
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Insufficient numbers
                    </strong>{" "}
                    — the workforce has grown but toilet and washing station
                    numbers have not been increased. This leads to excessive
                    queuing and unsanitary conditions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      No hot water
                    </strong>{" "}
                    — cold water only at washing stations, or hot water systems
                    that are broken and not repaired
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      No facilities for women
                    </strong>{" "}
                    — no separate or lockable toilet and changing facilities for
                    female workers. This is both a welfare failure and a
                    potential equality issue
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      No soap or drying facilities
                    </strong>{" "}
                    — washing stations without soap, without towels, or with
                    empty dispensers that are not refilled
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Drinking water not marked
                    </strong>{" "}
                    — drinking water taps indistinguishable from non-potable
                    supplies, creating a serious contamination risk
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                The "No Welfare = No Work" Principle
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The HSE has established a clear principle: if adequate welfare
                facilities are not available, construction work should not take
                place. This applies at the start of a project (the client and
                PC must ensure facilities are in place before work begins) and
                throughout the project (if facilities break down or become
                inadequate, work should stop until they are restored). A
                prohibition notice enforces this principle formally, but
                responsible duty holders should apply it voluntarily. Workers
                also have the right to refuse to work in conditions where
                basic welfare is not provided, and they are protected from
                dismissal or detriment for doing so under the Employment Rights
                Act 1996.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Good Practice Examples
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The best-managed construction sites treat welfare as a priority,
                not an afterthought. Good practice includes: appointing a named
                welfare champion responsible for daily checks; using a welfare
                log book to record cleaning, maintenance, and restocking;
                conducting weekly welfare audits as part of the site inspection
                regime; seeking feedback from workers on welfare provision and
                acting on it; budgeting for welfare improvements as the project
                evolves; and benchmarking against the Considerate Constructors
                Scheme standards, which go beyond the legal minimum. Sites that
                invest in welfare consistently report lower sickness absence,
                higher productivity, better workforce retention, and fewer HSE
                enforcement actions.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  STYLED DIV DIAGRAM — Schedule 2 Welfare Requirements         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-400" />
            Schedule 2 Welfare Requirements
          </h3>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/10 border border-blue-500/20 rounded-xl p-5">
            <p className="text-white/60 text-xs mb-4 italic">
              Every construction site must provide all five categories of
              welfare facility from day one of the construction phase.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Toilets */}
              <div className="bg-black/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <h4 className="text-blue-400 font-semibold text-sm">
                    Toilets
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Ratio: <strong className="text-white">1 per 7 workers</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Flushing where practicable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Ventilated, lit, clean</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Separate / lockable for men & women</span>
                  </li>
                </ul>
              </div>

              {/* Washing */}
              <div className="bg-black/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <h4 className="text-blue-400 font-semibold text-sm">
                    Washing
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Hot & cold</strong> running water</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Soap and cleaning agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Towels or drying facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Showers where contamination risk</span>
                  </li>
                </ul>
              </div>

              {/* Drinking Water */}
              <div className="bg-black/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <h4 className="text-blue-400 font-semibold text-sm">
                    Drinking Water
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Wholesome</strong> supply</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Clearly <strong className="text-white">marked</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Cups or drinking fountain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Separate from process water</span>
                  </li>
                </ul>
              </div>

              {/* Rest Facilities */}
              <div className="bg-black/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <h4 className="text-blue-400 font-semibold text-sm">
                    Rest Facilities
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Seating</strong> with backs and tables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Eating area, clean and maintained</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Heating</strong>, microwave, kettle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Sheltered from weather</span>
                  </li>
                </ul>
              </div>

              {/* Changing Rooms */}
              <div className="bg-black/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <h4 className="text-blue-400 font-semibold text-sm">
                    Changing Rooms
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Secure <strong className="text-white">lockers</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Drying</strong> facilities for wet clothing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Separate</strong> for men & women</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Adjacent to washing facilities</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-white/50 text-xs mt-4 italic">
              All facilities must be provided before construction work begins
              and maintained throughout the project. Mobile and temporary
              facilities are acceptable provided they meet these standards.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Legal Framework Summary                                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Legal Framework — Welfare on Construction Sites
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  CDM 2015 — Schedule 2
                </p>
                <p className="text-white/70 text-xs">
                  Sets out the mandatory welfare requirements for construction
                  sites: sanitary conveniences, washing facilities, drinking
                  water, changing rooms, and rest facilities. Applies to all
                  construction work from day one.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  CDM 2015 — Regulation 4(8)
                </p>
                <p className="text-white/70 text-xs">
                  Places the duty on the client to ensure welfare facilities
                  are provided before construction work begins. The client must
                  make suitable arrangements to ensure compliance with
                  Schedule 2.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  CDM 2015 — Regulation 13(4)
                </p>
                <p className="text-white/70 text-xs">
                  Requires the principal contractor to ensure welfare facilities
                  are maintained and managed throughout the construction phase
                  in compliance with Schedule 2.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  CDM 2015 — Regulation 15(11)
                </p>
                <p className="text-white/70 text-xs">
                  Requires contractors not to begin work unless satisfied that
                  welfare facilities complying with Schedule 2 are or will be
                  provided for their workers.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  Workplace (Health, Safety and Welfare) Regulations 1992
                </p>
                <p className="text-white/70 text-xs">
                  Provides additional requirements including rest facilities for
                  pregnant workers and nursing mothers, temperature control, and
                  ventilation in welfare areas. Applies alongside CDM 2015.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs mb-1">
                  Health and Safety at Work Act 1974 — Sections 2 & 3
                </p>
                <p className="text-white/70 text-xs">
                  General duty to ensure the welfare of employees and others
                  affected by the work. Welfare facilities are an express
                  component of this overarching duty.
                </p>
              </div>
            </div>
            <p className="text-white/60 text-xs mt-3 italic">
              Welfare is not a discretionary benefit — it is a legal
              requirement that protects worker health, dignity, and
              productivity. Failure to comply can result in enforcement action,
              prosecution, and unlimited fines.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQs                                                         */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  Quiz                                                         */}
        {/* ============================================================ */}
        <Quiz
          title="Section 3 — Welfare Facilities"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  Navigation Footer                                            */}
        {/* ============================================================ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5-section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Site Inductions & Competence
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-blue-500 hover:bg-blue-500/90 text-white font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5-section-4">
              Next: Monitoring, Review & Enforcement
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
