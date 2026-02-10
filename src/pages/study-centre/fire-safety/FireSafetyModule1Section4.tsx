import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Flame,
  ShieldAlert,
  Cigarette,
  Trash2,
  FlaskConical,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Thermometer,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────────────────────────────
   Quick-check questions (InlineCheck after 01 / 03 / 06)
   ─────────────────────────────────────────────── */
const quickCheckQuestions = [
  {
    id: "fs-arson-largest-cause",
    question:
      "What is the single largest cause of commercial fires in the UK?",
    options: [
      "Electrical faults",
      "Smoking materials",
      "Arson (deliberate fire-setting)",
      "Overheated machinery",
    ],
    correctIndex: 2,
    explanation:
      "Arson accounts for approximately 45% of all commercial fires in the UK, making it the single largest cause. This is why site security, waste management, perimeter fencing, adequate lighting, and CCTV are all critical elements of a fire risk assessment for commercial premises. Removing external fuel sources and securing the site perimeter are among the most effective prevention measures.",
  },
  {
    id: "fs-hot-work-fire-watch",
    question:
      "How long should a fire watch continue after hot works are completed?",
    options: [
      "10 minutes",
      "Minimum 30 minutes (many organisations specify 60 minutes)",
      "2 hours",
      "Until the end of the working day",
    ],
    correctIndex: 1,
    explanation:
      "The minimum fire watch period after hot works is 30 minutes, though many organisations and fire safety policies specify 60 minutes. This is because sparks and hot particles can lodge in insulation, within wall cavities, or under flooring and smoulder for a considerable time before bursting into flame. The fire watch person must remain in the area with appropriate extinguishing equipment and be trained to detect and deal with any ignition.",
  },
  {
    id: "fs-electrical-fires-per-year",
    question:
      "Approximately how many fires per year in the UK are caused by electrical faults?",
    options: [
      "Around 5,000",
      "Around 8,000",
      "Around 14,000",
      "Around 25,000",
    ],
    correctIndex: 2,
    explanation:
      "UK Home Office fire statistics indicate that electrical faults cause approximately 14,000 fires per year in the United Kingdom. This represents roughly 25% of all accidental dwelling fires. Common electrical causes include overloaded circuits, damaged cables, loose connections creating arcing, incorrect fuse ratings, and extension lead misuse. As an electrician, understanding these statistics reinforces why quality workmanship and proper testing are so critical.",
  },
];

/* ───────────────────────────────────────────────
   FAQs
   ─────────────────────────────────────────────── */
const faqs = [
  {
    question: "What is a hot work permit and when is one required?",
    answer:
      "A hot work permit is a formal document that authorises specific hot work activities — such as welding, cutting, brazing, soldering, grinding, or use of blowtorches — in a controlled area for a defined period. It is required whenever hot work is carried out outside a designated permanent hot work area, particularly on construction sites, in occupied buildings, near combustible materials or structures, or in any location where the fire risk assessment identifies a significant ignition risk. The permit typically specifies the exact location, the work to be performed, the precautions to be taken (removal of combustibles, fire blankets, extinguisher on standby), the person responsible, and the fire watch period after completion. The permit must be signed by a competent person who has inspected the work area and confirmed that all precautions are in place. Permits are usually valid for a single shift only and must be reissued for subsequent periods.",
  },
  {
    question:
      "Can an electrician be held personally responsible for a fire caused by their work?",
    answer:
      "Yes. An electrician can face both criminal prosecution and civil liability if a fire is caused by their negligent or incompetent work. Under the Health and Safety at Work etc. Act 1974, every employee has a duty to carry out their work with reasonable care and skill. Under the Regulatory Reform (Fire Safety) Order 2005, the 'responsible person' (usually the employer or building owner) has overarching fire safety duties, but this does not absolve the individual tradesperson of their own duty of care. If an electrician makes a poor termination that creates arcing, installs an incorrect fuse rating, overloads a circuit, or fails to properly test their installation, and a fire results, they may be personally prosecuted under health and safety legislation. They may also face civil claims for damages from the property owner, insurers, or injured parties. Additionally, their competent person scheme registration (e.g. NICEIC, NAPIT) may be revoked. BS 7671 compliance and proper certification (EIC/EICR) are critical evidence of competent workmanship.",
  },
  {
    question:
      "What is spontaneous combustion and how does it relate to workplace fires?",
    answer:
      "Spontaneous combustion occurs when a material generates heat through internal chemical reactions — typically oxidation — faster than the heat can dissipate to the surrounding environment. Over time, the temperature of the material rises to its ignition point and it catches fire without any external flame or spark. In the workplace, the most common cause of spontaneous combustion is oily rags, particularly those contaminated with linseed oil, tung oil, or other drying oils. When these rags are crumpled or piled together, the surface area exposed to air is large relative to the volume, the exothermic oxidation reaction generates heat, and the crumpled mass acts as insulation preventing heat loss. The temperature rises over hours until ignition occurs — often overnight or over a weekend when the premises are unoccupied. Other materials prone to spontaneous combustion include damp hay, coal dust, certain metal powders, and some chemical mixtures. Prevention involves disposing of oily rags in lidded metal containers, never leaving them piled or in contact with other combustible materials, and removing them from the premises at the end of each working day.",
  },
  {
    question:
      "How does the Dangerous Substances and Explosive Atmospheres Regulations (DSEAR) 2002 relate to fire safety?",
    answer:
      "DSEAR 2002 implements the EU ATEX Workplace Directive (1999/92/EC) in Great Britain and applies to any workplace where dangerous substances are present that could give rise to fire, explosion, or similar energetic events. 'Dangerous substances' include any substance or preparation that is explosive, oxidising, extremely flammable, highly flammable, or flammable — as well as any substance that, because of its physical or chemical properties and the way it is used or is present at the workplace, creates a risk. Under DSEAR, the employer must carry out a risk assessment of the fire and explosion risks arising from dangerous substances, eliminate or reduce those risks so far as is reasonably practicable, apply protective measures in a specified priority order, classify areas where explosive atmospheres may occur into zones, and avoid sources of ignition in those zones. For electricians, DSEAR is directly relevant because electrical equipment is a potential ignition source. In DSEAR-classified zones, only equipment certified for use in explosive atmospheres (ATEX-rated) may be installed. Electricians working in petrochemical, pharmaceutical, food processing, brewing, paint spraying, and similar environments must understand DSEAR zone classifications and the requirements for intrinsically safe, flameproof, or increased-safety electrical equipment.",
  },
];

/* ───────────────────────────────────────────────
   End-of-section quiz (8 questions)
   ─────────────────────────────────────────────── */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is the most common electrical cause of fire in domestic properties?",
    options: [
      "Lightning strikes on overhead cables",
      "Overloaded circuits and extension leads",
      "Smart meter faults",
      "Solar panel inverter failures",
    ],
    correctAnswer: 1,
    explanation:
      "Overloaded circuits and extension lead misuse are the most common electrical causes of domestic fire. Overloading occurs when the current drawn through a cable or extension lead exceeds its rated capacity, causing the conductor insulation to overheat, degrade, and eventually ignite surrounding combustible materials. Daisy-chaining extension leads, using adaptors to exceed socket capacity, and running high-power appliances on undersized cables are all common causes.",
  },
  {
    id: 2,
    question:
      "What is the primary purpose of a fire watch after hot works are completed?",
    options: [
      "To ensure the work area is tidy before leaving",
      "To detect and extinguish any smouldering materials or delayed ignition caused by sparks or hot particles",
      "To wait for the hot work permit to be counter-signed",
      "To allow welding gases to dissipate before the next shift",
    ],
    correctAnswer: 1,
    explanation:
      "The fire watch exists specifically to detect and deal with any smouldering or delayed ignition. Sparks and hot particles from welding, grinding, and cutting can travel over 10 metres and lodge in combustible materials — insulation, timber framing, dust accumulations, wall cavities — where they can smoulder for 30 minutes or more before developing into a visible fire. The fire watch person must remain in the area with suitable extinguishing equipment for a minimum of 30 minutes (many organisations require 60 minutes) after the last hot work activity.",
  },
  {
    id: 3,
    question:
      "What percentage of commercial fires in the UK are caused by arson?",
    options: [
      "Approximately 15%",
      "Approximately 25%",
      "Approximately 45%",
      "Approximately 70%",
    ],
    correctAnswer: 2,
    explanation:
      "Arson accounts for approximately 45% of all commercial fires in the UK, making it the single largest cause. Commercial premises are targeted because they often have accessible waste materials (skips, bins, pallets), poor perimeter security, inadequate lighting, and periods when the premises are unoccupied. Effective prevention includes securing the site perimeter, removing external fuel sources, installing CCTV and security lighting, managing waste storage, and conducting regular security patrols.",
  },
  {
    id: 4,
    question:
      "Which of the following is the most effective housekeeping measure to reduce fire risk in a workplace?",
    options: [
      "Painting all walls in fire-retardant paint",
      "Installing additional fire extinguishers",
      "Preventing the accumulation of combustible waste, keeping fire exits clear, and ensuring fire doors are not propped open",
      "Switching to LED lighting throughout the building",
    ],
    correctAnswer: 2,
    explanation:
      "Good housekeeping is one of the most effective and lowest-cost fire prevention measures. Preventing combustible waste accumulation removes fuel. Keeping fire exits clear ensures rapid evacuation. Ensuring fire doors are not propped open maintains compartmentation — the division of the building into fire-resistant compartments that contain the spread of fire and smoke. These measures are all required under the Regulatory Reform (Fire Safety) Order 2005 and are regularly checked during fire risk assessments.",
  },
  {
    id: 5,
    question:
      "Under DSEAR 2002, what must an employer do if dangerous substances are present in the workplace?",
    options: [
      "Notify the local fire and rescue service within 48 hours",
      "Carry out a risk assessment of fire and explosion risks, eliminate or reduce those risks, and classify zones where explosive atmospheres may occur",
      "Replace all dangerous substances with water-based alternatives",
      "Ensure all employees hold a NEBOSH fire safety certificate",
    ],
    correctAnswer: 1,
    explanation:
      "DSEAR 2002 requires employers to carry out a risk assessment of the fire and explosion risks from dangerous substances, eliminate or reduce those risks so far as is reasonably practicable, apply measures in a priority order (elimination, substitution, control), classify areas where explosive atmospheres may occur into ATEX zones, avoid sources of ignition in classified zones, and provide appropriate equipment (including ATEX-rated electrical equipment in classified zones). For electricians, this means understanding that in DSEAR-classified areas, only equipment certified for use in explosive atmospheres may be installed.",
  },
  {
    id: 6,
    question:
      "According to UK fire statistics, approximately how many fires per year are caused by electrical faults?",
    options: [
      "Around 3,000",
      "Around 7,000",
      "Around 14,000",
      "Around 30,000",
    ],
    correctAnswer: 2,
    explanation:
      "UK Home Office fire statistics show that electrical faults cause approximately 14,000 fires per year, representing roughly 25% of all accidental dwelling fires. This makes electrical faults one of the leading causes of accidental fire in the UK. Common causes include overloaded circuits, damaged insulation, loose connections causing arcing, incorrect fuse ratings, extension lead misuse, and faulty appliances. Regular PAT testing, proper installation to BS 7671, and periodic inspection and testing (EICR) are all essential prevention measures.",
  },
  {
    id: 7,
    question:
      "Which major UK fire incident highlighted the catastrophic consequences of combustible cladding and the failure of compartmentation?",
    options: [
      "Kings Cross Underground fire (1987)",
      "Piper Alpha (1988)",
      "Lakanal House (2009)",
      "Grenfell Tower (2017)",
    ],
    correctAnswer: 3,
    explanation:
      "The Grenfell Tower fire on 14 June 2017 killed 72 people and is the deadliest structural fire in the UK since the Second World War. The fire started in a fourth-floor flat due to a faulty fridge-freezer and spread catastrophically via the ACM (aluminium composite material) cladding system that had been installed during refurbishment. The cladding acted as a chimney, spreading fire rapidly up the exterior of the building. Compartmentation — the fire-resistant separation between flats designed to contain fire — failed because fire entered flats from the outside via the cladding. The stay-put policy, which relied on effective compartmentation, became untenable. Grenfell led to the most significant reform of building safety regulation in a generation.",
  },
  {
    id: 8,
    question:
      "Why is it important for construction sites to enforce designated smoking areas away from combustible materials?",
    options: [
      "Because the Construction (Design and Management) Regulations 2015 ban all smoking on site",
      "Because discarded cigarettes and smoking materials are a significant ignition source, particularly near timber, insulation, solvents, and other combustible construction materials",
      "Because smoking near wet paint affects the finish quality",
      "Because insurance companies require it for public liability purposes only",
    ],
    correctAnswer: 1,
    explanation:
      "Discarded cigarettes and smoking materials are a well-documented ignition source. A cigarette tip can reach temperatures of approximately 700\u00B0C, which is more than sufficient to ignite many construction materials including timber offcuts, insulation, plastic packaging, solvents, and adhesives. On construction sites where large quantities of combustible materials are present, often in an unfinished building without operational fire detection or suppression systems, a carelessly discarded cigarette can rapidly develop into a serious fire. Designated smoking areas must be located away from all combustible storage, waste skips, and work areas.",
  },
];

/* ═══════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════ */
export default function FireSafetyModule1Section4() {
  useSEO({
    title: "How Fires Start in the Workplace | Fire Safety Module 1.4",
    description:
      "Electrical causes of fire, hot works, arson, smoking materials, poor housekeeping, chemical risks, UK fire statistics, and case studies including Grenfell Tower. Section 4 of Fire Safety & Fire Marshal Module 1.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Flame className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            How Fires Start in the Workplace
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Electrical faults, hot works, arson, smoking materials, poor
            housekeeping, chemical risks, UK fire statistics, and the critical
            lessons from major fire incidents
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>~14,000 electrical fires/year</strong> in the UK (~25%
                of accidental dwelling fires)
              </li>
              <li>
                <strong>Arson = ~45%</strong> of all commercial fires
              </li>
              <li>
                <strong>Hot work sparks</strong> can travel 10+ metres and
                smoulder for 30+ minutes
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">
              Key Principle
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Every fire</strong> needs heat, fuel, and oxygen
              </li>
              <li>
                <strong>Remove one</strong> element and the fire cannot start
              </li>
              <li>
                <strong>Electricians</strong> are both at risk and a line of
                defence
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ───────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the main electrical causes of fire and explain their relevance to electricians",
              "Describe the hot work permit process and the purpose of a fire watch",
              "Explain why arson is the largest single cause of commercial fires and state key prevention measures",
              "List the fire risks associated with smoking materials, heating equipment, and poor housekeeping",
              "Describe the requirements of DSEAR 2002 in relation to flammable substances and explosive atmospheres",
              "Cite UK fire statistics including the approximate number of electrical fires per year",
              "Explain the key lessons from the Grenfell Tower fire and other major UK fire incidents",
              "Describe the risk of spontaneous combustion from oily rags and similar materials",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ═════════════════════════════════════════
            SECTION 01 — Electrical Causes of Fire
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Electrical Causes of Fire
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical faults are one of the leading causes of accidental
                fire in the United Kingdom. Home Office fire statistics indicate
                that electrical faults cause approximately{" "}
                <strong>14,000 fires per year</strong>, representing roughly{" "}
                <strong>25% of all accidental dwelling fires</strong>. For
                electricians, this statistic carries a dual significance: it
                underscores the importance of quality workmanship in preventing
                fires, and it highlights the specific risks faced when working
                on electrical installations.
              </p>

              <p>
                The mechanisms by which electrical faults cause fire are well
                understood. Each involves the conversion of electrical energy
                into heat energy at a rate that exceeds the ability of the
                surrounding materials to dissipate that heat, ultimately raising
                the temperature of nearby combustible materials to their
                ignition point.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Electrical Causes of Fire
                </p>
                <div className="space-y-3">
                  {[
                    {
                      cause: "Overloaded circuits and cables",
                      detail:
                        "When the current flowing through a conductor exceeds its rated capacity, the resistance of the conductor causes it to heat up. This overheating degrades the cable insulation (typically PVC), which can melt, char, and eventually ignite. Overloading is particularly common where circuits have been extended without upgrading the protective device or cable size, or where multiple high-power appliances are connected to a single ring final circuit.",
                    },
                    {
                      cause: "Loose connections and arcing",
                      detail:
                        "A loose connection — whether at a terminal, junction box, consumer unit, or socket outlet — creates a point of high resistance. Current flowing through this high-resistance point generates localised heating. If the connection degrades further, electrical arcing can occur. An arc can reach temperatures of 3,000\u00B0C or more, easily igniting any surrounding combustible material. Arcing at terminals is one of the most common causes of electrical fire in domestic and commercial installations.",
                    },
                    {
                      cause: "Damaged insulation",
                      detail:
                        "Cable insulation can be damaged during installation (e.g. nails or screws driven through cables in walls), by rodent gnawing, by UV degradation of exterior cables, by chemical attack, or simply by ageing. Damaged insulation exposes live conductors, creating the risk of short circuits, earth faults, and arcing — all of which can generate sufficient heat to ignite nearby materials. Cable routes through thermal insulation (loft spaces) can also cause overheating if the cable's current-carrying capacity has not been derated.",
                    },
                    {
                      cause: "Incorrect fuse ratings and protective devices",
                      detail:
                        "A fuse or circuit breaker that is rated higher than the cable it protects will allow excessive current to flow without tripping. The cable overheats, but the protective device does not disconnect the supply. This is a direct installation fault that can be caused by an unqualified person fitting an incorrect fuse wire or MCB, or by an electrician failing to properly coordinate protective devices with cable ratings during design.",
                    },
                    {
                      cause: "Extension lead misuse",
                      detail:
                        "Extension leads are a major cause of electrical fire. Daisy-chaining multiple extension leads, coiling leads (which prevents heat dissipation), running leads under carpets or rugs (trapping heat), and overloading multi-way adaptors are all common domestic practices that cause fires. A coiled extension lead on a 13A plug can generate sufficient heat to melt its own insulation within minutes if the load approaches the rated capacity.",
                    },
                    {
                      cause: "PAT testing failures",
                      detail:
                        "Portable Appliance Testing (PAT) identifies faults in portable electrical equipment — damaged cables, cracked plugs, earth continuity failures, insulation breakdown — before they cause fires or electric shock. The absence of a PAT testing regime means faulty appliances remain in use, increasing the fire risk. The Electricity at Work Regulations 1989 require all electrical equipment to be maintained in a safe condition.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">
                        {item.cause}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Specific Risks for Electricians
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  As an electrician, you are both a potential cause and a
                  critical line of defence against electrical fires. The
                  following risks are directly relevant to your daily work:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Working on live circuits</strong> &mdash; arcing
                      at switchgear, consumer units, and distribution boards
                      during live working can ignite dust, insulation, or nearby
                      combustible materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Cable damage during installation</strong> &mdash;
                      pulling cables through tight routes, around sharp edges,
                      or past fixings can damage insulation without visible
                      external evidence, creating a latent fire risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Poor terminations</strong> &mdash; inadequately
                      tightened terminals, insufficient conductor stripped into
                      the terminal, or damaged conductor strands all create
                      high-resistance joints that heat up under load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Failure to derate in thermal insulation</strong>{" "}
                      &mdash; cables routed through or surrounded by thermal
                      insulation must have their current-carrying capacity
                      derated per BS 7671. Failure to do so leads to chronic
                      overheating
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  2022 UK Electrical Fire Statistics
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    {
                      stat: "~14,000",
                      label: "Electrical fires per year",
                    },
                    {
                      stat: "~25%",
                      label: "Of all accidental dwelling fires",
                    },
                    {
                      stat: "~300",
                      label: "Deaths per year from accidental dwelling fires (all causes)",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-rose-400 mb-1">
                        {item.stat}
                      </p>
                      <p className="text-xs text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ═════════════════════════════════════════
            SECTION 02 — Hot Works
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Hot Works
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Hot works refers to any process that generates flames, sparks,
                or significant heat that could ignite nearby combustible
                materials. This includes welding (MIG, TIG, MMA/stick, oxy-fuel),
                thermal cutting, brazing, soldering, grinding, use of
                blowtorches, and any other operation that produces open flames
                or hot particles. Hot works are a significant cause of fire on
                construction sites and in commercial and industrial premises.
              </p>

              <p>
                The primary danger of hot works is the production of{" "}
                <strong>sparks and hot metal particles</strong> that can travel
                significant distances from the work area. Sparks from grinding
                and cutting operations can travel{" "}
                <strong>10 metres or more</strong>, passing through gaps in
                floors, walls, and ceilings, and lodging in combustible
                materials where they can smoulder undetected for extended
                periods before developing into a visible fire.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Hot Work Permits
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  A <strong>hot work permit</strong> is required on construction
                  sites and in any location where hot works are carried out
                  outside a designated permanent hot work area. The permit is a
                  formal document that specifies the location, the work to be
                  performed, the precautions required, and the fire watch period.
                  It must be authorised by a competent person who has inspected
                  the area and confirmed all control measures are in place. The
                  permit is typically valid for a single shift only.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Hot Work Control Measures
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Remove all combustible materials</strong> from a
                      minimum radius of 10 metres around the work area, or
                      cover them with fire-resistant blankets or screens where
                      removal is not practicable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Fireproof screens and fire blankets</strong>{" "}
                      &mdash; position around the work area to contain sparks and
                      prevent them reaching combustible materials in adjacent
                      areas, particularly above, below, and behind partition walls
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Fire extinguisher on standby</strong> &mdash; a
                      suitable extinguisher (typically water, foam, or dry powder
                      depending on the environment) must be immediately available
                      at the work location throughout the hot work activity and
                      during the fire watch period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Seal gaps and openings</strong> &mdash; close or
                      cover all gaps in floors, walls, and ceilings through which
                      sparks could travel to adjacent areas or concealed spaces
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Damp down the area</strong> &mdash; where
                      appropriate, wet the surrounding area to reduce the risk of
                      ignition from stray sparks (not applicable near electrical
                      installations or equipment sensitive to moisture)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Fire Watch &mdash; The Critical 30&ndash;60 Minutes
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  After completion of hot works, a{" "}
                  <strong>fire watch must be maintained for a minimum of
                  30 minutes</strong>. Many organisations and site fire safety
                  policies specify <strong>60 minutes</strong>. The fire watch
                  person must remain in the work area with suitable
                  extinguishing equipment, checking for any signs of smouldering,
                  smoke, unusual heat, or discolouration. They must check above,
                  below, and on the opposite side of any partition walls or
                  floors where sparks may have penetrated. A significant number
                  of hot work fires occur hours after the work has been completed
                  &mdash; sparks can smoulder in insulation or within wall
                  cavities for extended periods before developing into flame.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ═════════════════════════════════════════
            SECTION 03 — Arson
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Arson &mdash; Deliberate Fire-Setting
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Arson is the{" "}
                <strong>
                  largest single cause of commercial fires in the United Kingdom
                </strong>
                , accounting for approximately <strong>45%</strong> of all fires
                in commercial premises. It is also a significant cause of fire
                on construction sites, in schools, and in unoccupied buildings.
                Unlike other fire causes, arson is a criminal act &mdash;
                deliberate fire-setting with the intent to damage property, make
                an insurance claim, conceal another crime, or simply for the
                thrill of watching a fire.
              </p>

              <p>
                The impact of arson extends far beyond the direct fire damage.
                Arson fires tend to be more severe than accidental fires because
                the arsonist may use accelerants (petrol, paraffin, lighter
                fluid) and deliberately target areas that will promote rapid
                fire spread. Arson also tends to occur when premises are
                unoccupied &mdash; nights, weekends, and holidays &mdash;
                meaning the fire may burn for a considerable time before
                detection and fire service response.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Arson Risk Factors
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Poor site security</strong> &mdash; unsecured
                      perimeters, broken fencing, unlocked gates, and lack of
                      access control allow unauthorised persons to enter the
                      premises
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Accessible waste and combustible materials</strong>{" "}
                      &mdash; skips, bins, pallets, cardboard, and other
                      combustible waste stored against or near the exterior of a
                      building provide ready-made fuel for an arsonist
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Poor external lighting</strong> &mdash;
                      inadequately lit premises provide cover for arsonists to
                      approach undetected
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Unoccupied or derelict buildings</strong> &mdash;
                      empty premises, particularly those awaiting demolition or
                      refurbishment, are a frequent target for arson
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Lack of surveillance</strong> &mdash; absence of
                      CCTV, security patrols, or visible deterrents
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Arson Prevention Measures
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Effective arson prevention focuses on three principles:
                  denying access, removing fuel, and detecting attempts early.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Secure the site perimeter with appropriate fencing,
                      locked gates, and controlled access points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Remove combustible materials from the exterior of
                      buildings &mdash; move skips, bins, and waste storage
                      away from building walls
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Install CCTV covering all approaches and external storage
                      areas, with visible signage indicating surveillance is
                      in operation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Provide adequate external security lighting, particularly
                      around bins, waste storage, delivery areas, and building
                      entrances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Implement regular security patrols, especially during
                      periods when premises are unoccupied
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Implement a robust waste management programme &mdash;
                      regular removal of combustible waste, lockable waste
                      containers, and storage away from buildings
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ═════════════════════════════════════════
            SECTION 04 — Smoking Materials
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Smoking Materials
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Discarded cigarettes and other smoking materials remain a
                significant cause of fire in both domestic and workplace
                settings. A lit cigarette tip can reach temperatures of
                approximately <strong>700&deg;C</strong> &mdash; more than
                sufficient to ignite paper, dry grass, textiles, timber
                offcuts, plastic packaging, and many other common combustible
                materials found on construction sites and in commercial
                premises.
              </p>

              <p>
                The introduction of <strong>self-extinguishing cigarettes</strong>{" "}
                (also known as reduced ignition propensity cigarettes or RIP
                cigarettes) became mandatory across the European Union in{" "}
                <strong>November 2011</strong>. These cigarettes are designed
                to self-extinguish if not actively smoked, reducing the risk
                from carelessly discarded cigarettes. While this regulation has
                contributed to a reduction in smoking-related fires, it has not
                eliminated the risk entirely &mdash; particularly during the
                period when the cigarette is being actively smoked and
                immediately after disposal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Workplace Smoking Controls
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Designated smoking areas</strong> must be located
                      away from all combustible materials, waste storage, gas
                      cylinders, and fuel storage. On construction sites, these
                      areas must be clearly marked and provided with suitable
                      non-combustible ashtrays or disposal containers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>No smoking policies</strong> &mdash; many
                      construction sites operate a complete no-smoking policy
                      across the entire site. This must be enforced through
                      induction, signage, and disciplinary procedures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Proper disposal</strong> &mdash; cigarettes must
                      be fully extinguished before disposal in a suitable
                      non-combustible container. Cigarette butts must never be
                      discarded into general waste bins, skips, or onto the
                      ground near combustible materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>E-cigarettes and vapes</strong> &mdash; while
                      e-cigarettes do not produce an open flame, lithium-ion
                      battery failures (thermal runaway) have caused fires.
                      Charging should only occur using the manufacturer&rsquo;s
                      charger and must not be left unattended
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            SECTION 05 — Heating Equipment & Portable Heaters
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Heating Equipment &amp; Portable Heaters
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Heating equipment &mdash; particularly portable and temporary
                heaters &mdash; is a well-documented cause of workplace and
                domestic fire. The risk is greatest during winter months when
                temporary heating is frequently used on construction sites, in
                warehouses, and in poorly heated commercial premises.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Heating-Related Fire Risks
                </p>
                <div className="space-y-3">
                  {[
                    {
                      risk: "Space heaters too close to combustibles",
                      detail:
                        "Portable electric heaters, radiant heaters, and convector heaters placed too close to combustible materials — clothing, paper, curtains, furniture, packaging — can ignite them through radiated or convected heat. A minimum clearance of at least 1 metre from all combustible materials must be maintained. Heaters must never be positioned where they can be knocked over.",
                    },
                    {
                      risk: "LPG heaters in enclosed spaces",
                      detail:
                        "Liquefied petroleum gas (LPG) heaters consume oxygen and produce carbon monoxide, carbon dioxide, and water vapour. In enclosed or poorly ventilated spaces, this can lead to oxygen depletion, toxic gas accumulation, and condensation. LPG heaters also present an explosion risk if the gas supply leaks into the space. Adequate ventilation is essential, and LPG heaters should never be used in basements or small enclosed rooms.",
                    },
                    {
                      risk: "Fan heaters with blocked vents",
                      detail:
                        "Fan heaters rely on air circulation to prevent overheating. If vents are blocked — by dust, debris, or items placed too close — the internal temperature rises, potentially igniting the heater's own plastic casing or any combustible material in contact with it. Many fire safety incidents involve fan heaters left running unattended with blocked vents.",
                    },
                    {
                      risk: "Temporary heating on construction sites",
                      detail:
                        "Construction sites frequently require temporary heating for drying plaster, curing concrete, or maintaining working temperatures. Bottled gas heaters, torpedo heaters, and infrared radiant heaters all present fire risks if not properly positioned, supervised, and maintained. Fuel storage for temporary heating equipment must be in designated areas away from the building.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">
                        {item.risk}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Golden Rule for Heaters
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>
                    Never dry clothes, gloves, or any other materials on or near
                    a portable heater.
                  </strong>{" "}
                  This is one of the most common causes of heating-related fires,
                  both domestically and on construction sites. Wet clothing
                  draped over or placed near a heater will dry out, then
                  continue to heat until it reaches ignition temperature. Many
                  of these fires occur overnight or during breaks when the
                  heater is left running unattended.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            SECTION 06 — Poor Housekeeping & Waste Accumulation
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Poor Housekeeping &amp; Waste Accumulation
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Poor housekeeping is one of the most significant &mdash; and
                most preventable &mdash; contributors to workplace fire risk.
                The accumulation of combustible waste provides fuel. Blocked
                fire exits prevent evacuation. Propped-open fire doors destroy
                compartmentation. Storage in corridors and escape routes
                impedes both evacuation and fire service access. Each of these
                failures is a breach of the Regulatory Reform (Fire Safety)
                Order 2005 and each is routinely identified during fire risk
                assessments.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Housekeeping Fire Risks
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Combustible waste buildup</strong> &mdash;
                      cardboard, timber offcuts, plastic packaging, paper, and
                      general waste allowed to accumulate in work areas,
                      corridors, plant rooms, and storage areas provides readily
                      available fuel for any ignition source
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Blocked fire exits</strong> &mdash; fire exit
                      doors and routes that are obstructed by stored materials,
                      locked with non-compliant locks, or have had their push
                      bars disabled. In a fire, occupants may be unable to
                      escape, leading to fatalities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Propped-open fire doors</strong> &mdash; fire
                      doors are a critical element of compartmentation, designed
                      to resist fire for 30 or 60 minutes (FD30/FD60). A
                      propped-open fire door provides zero minutes of fire
                      resistance. Smoke and fire will spread freely through the
                      opening, destroying the compartmentation strategy that
                      protects escape routes and allows staged evacuation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Storage in corridors and escape routes</strong>{" "}
                      &mdash; materials stored in corridors add fuel load to
                      escape routes and physically restrict the width available
                      for evacuation, particularly for disabled persons and
                      those using evacuation chairs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Oily rags and spontaneous combustion</strong>{" "}
                      &mdash; rags contaminated with linseed oil, tung oil, or
                      other drying oils can undergo spontaneous combustion when
                      piled together. The oxidation process generates heat,
                      and the crumpled mass insulates against heat loss. Over
                      hours, the temperature rises to ignition point without
                      any external flame or spark
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      <strong>Spray can disposal</strong> &mdash; aerosol cans
                      containing flammable propellants (butane, propane, DME)
                      are pressurised vessels. If exposed to heat or punctured
                      during compaction in a waste skip, they can explode and
                      project burning contents, potentially igniting surrounding
                      waste
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Trash2 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    5S Principles Applied to Fire Safety
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The Japanese 5S methodology &mdash; originally developed for
                  manufacturing quality &mdash; translates directly to fire
                  safety housekeeping:
                </p>
                <div className="grid sm:grid-cols-5 gap-2">
                  {[
                    { s: "Sort", desc: "Remove unnecessary items and waste from the work area" },
                    { s: "Set in Order", desc: "Organise remaining items so everything has a designated place" },
                    { s: "Shine", desc: "Clean the area regularly; remove dust, oil, and debris" },
                    { s: "Standardise", desc: "Create consistent housekeeping procedures and checklists" },
                    { s: "Sustain", desc: "Maintain discipline through regular audits and inspections" },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-2 text-center">
                      <p className="text-xs font-bold text-rose-400 mb-1">
                        {item.s}
                      </p>
                      <p className="text-[10px] text-white/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                Regular housekeeping inspections &mdash; whether formal
                documented inspections or informal daily walkthroughs &mdash;
                are essential. The fire risk assessment should specify the
                frequency of housekeeping inspections and the standards to be
                maintained. On construction sites, the site manager or principal
                contractor has a duty under CDM 2015 to ensure that the site
                is kept in good order and that combustible waste is regularly
                removed.
              </p>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            SECTION 07 — Chemical & Substance Risks
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Chemical &amp; Substance Risks
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many workplaces store and use substances that are flammable,
                highly flammable, extremely flammable, explosive, or oxidising.
                These substances &mdash; ranging from common cleaning solvents
                and paints to industrial chemicals and compressed gases &mdash;
                present specific fire and explosion risks that must be managed
                under the{" "}
                <strong>
                  Dangerous Substances and Explosive Atmospheres Regulations
                  (DSEAR) 2002
                </strong>{" "}
                and the{" "}
                <strong>
                  Control of Substances Hazardous to Health (COSHH) Regulations
                  2002
                </strong>
                .
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Chemical &amp; Substance Fire Risks
                </p>
                <div className="space-y-3">
                  {[
                    {
                      risk: "Flammable liquids storage",
                      detail:
                        "Petrol, diesel, white spirit, acetone, thinners, and many industrial solvents are flammable or highly flammable liquids. They produce vapours that are heavier than air and can travel along the ground to a distant ignition source. Under DSEAR 2002, flammable liquids must be stored in approved flammable liquids cabinets or designated stores, in the minimum quantities necessary, away from ignition sources, and with appropriate signage. Maximum storage quantities are specified by the risk assessment.",
                    },
                    {
                      risk: "Gas cylinder handling",
                      detail:
                        "Compressed gas cylinders (oxygen, acetylene, propane, argon, nitrogen) are pressurised vessels that present both fire and explosion risks. Oxygen cylinders are particularly dangerous because oxygen does not burn itself but dramatically accelerates the combustion of other materials. Cylinders must be stored upright, secured against falling, segregated by type (flammable gases separated from oxidisers by at least 3 metres or a fire-resistant barrier), and protected from heat sources.",
                    },
                    {
                      risk: "Oxidising agents",
                      detail:
                        "Oxidisers (e.g. sodium hypochlorite, hydrogen peroxide, nitric acid, potassium permanganate) supply oxygen to a fire, dramatically increasing its intensity. They can cause materials that would not normally burn to ignite. Oxidisers must never be stored with flammable materials, organic materials, or reducing agents.",
                    },
                    {
                      risk: "Incompatible chemicals stored together",
                      detail:
                        "Certain chemicals react violently when they come into contact with each other — generating heat, flammable gases, or explosions. Acids and alkalis, oxidisers and flammable materials, and water-reactive chemicals stored near water sources are all examples of incompatible storage. Chemical storage must follow the manufacturer's safety data sheet (SDS) and the COSHH assessment.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">
                        {item.risk}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    DSEAR 2002 &mdash; Key Requirements for Electricians
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  DSEAR is directly relevant to electricians because electrical
                  equipment is a potential ignition source. In
                  DSEAR-classified zones:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Only <strong>ATEX-rated electrical equipment</strong>{" "}
                      (certified for use in explosive atmospheres) may be
                      installed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Equipment must be appropriate to the specific{" "}
                      <strong>zone classification</strong> (Zone 0, 1, 2 for
                      gases; Zone 20, 21, 22 for dusts) and the{" "}
                      <strong>gas group and temperature class</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Protection concepts include{" "}
                      <strong>intrinsically safe (Ex i)</strong>,{" "}
                      <strong>flameproof (Ex d)</strong>,{" "}
                      <strong>increased safety (Ex e)</strong>, and{" "}
                      <strong>pressurised (Ex p)</strong> &mdash; each with
                      specific installation requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span className="text-sm text-white/80">
                      Electricians working in petrochemical, pharmaceutical,
                      food processing, brewing, paint spraying, and grain
                      handling environments must understand DSEAR zone
                      classifications
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            SECTION 08 — UK Fire Statistics & Case Studies
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">08</span>
            UK Fire Statistics &amp; Case Studies
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding UK fire statistics and learning from major
                incidents is essential for every fire safety professional. The
                Home Office publishes annual fire statistics for England, with
                equivalent data published by the devolved administrations for
                Scotland, Wales, and Northern Ireland. These statistics reveal
                the scale of the problem, the most common causes, and the
                long-term trends that inform fire safety policy and regulation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key UK Fire Statistics (Home Office Data)
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      stat: "~150,000 fires attended per year",
                      detail:
                        "UK fire and rescue services attend approximately 150,000 fires per year across all categories — dwelling, non-dwelling, vehicles, outdoor, and chimney fires.",
                    },
                    {
                      stat: "~14,000 electrical fires per year",
                      detail:
                        "Electrical faults cause approximately 14,000 fires annually, representing roughly 25% of all accidental dwelling fires. This makes electrical faults one of the leading causes of accidental fire.",
                    },
                    {
                      stat: "~300 fire deaths per year",
                      detail:
                        "Approximately 300 people die per year in fires in the UK. The majority of fire deaths occur in dwelling fires, and the most common causes of fatal fires are cooking, smoking materials, and electrical faults.",
                    },
                    {
                      stat: "~45% of commercial fires are arson",
                      detail:
                        "Arson is the largest single cause of fire in commercial premises. Construction sites, schools, and unoccupied buildings are particularly vulnerable.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">
                        {item.stat}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Grenfell Tower ──── */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-red-300">
                    Case Study &mdash; Grenfell Tower (14 June 2017)
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-white/80">
                    The Grenfell Tower fire is the deadliest structural fire in
                    the UK since the Second World War.{" "}
                    <strong>72 people died</strong> when fire spread
                    catastrophically through the 24-storey residential tower
                    block in North Kensington, London. The fire started in a
                    fourth-floor flat due to a faulty Hotpoint fridge-freezer
                    and initially appeared to be a routine kitchen fire that
                    could be contained within the flat of origin.
                  </p>
                  <p className="text-sm text-white/80">
                    However, fire reached the exterior cladding system that had
                    been installed during a 2012&ndash;2016 refurbishment. The
                    cladding incorporated{" "}
                    <strong>
                      aluminium composite material (ACM) panels with a
                      polyethylene (PE) core
                    </strong>{" "}
                    &mdash; a material that is combustible and, once ignited,
                    burns rapidly and with intense heat. The cladding system
                    acted as a chimney, spreading fire vertically up the
                    exterior of the building at a devastating speed. Within
                    minutes, fire had spread from the fourth floor to the roof
                    of the 24-storey building.
                  </p>
                  <p className="text-sm text-white/80">
                    <strong>Compartmentation failed</strong> because fire
                    re-entered flats from the outside through windows and the
                    cladding system, bypassing the fire-resistant walls and
                    floors designed to contain fire within the flat of origin.
                    The <strong>stay-put policy</strong> &mdash; which advises
                    residents to remain in their flats during a fire, relying
                    on compartmentation to protect them &mdash; became
                    untenable. Residents who followed the stay-put advice were
                    trapped by fire entering from the exterior. The London Fire
                    Brigade delayed the decision to move to a simultaneous
                    evacuation, a decision that the Grenfell Tower Inquiry
                    subsequently identified as a critical failure.
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-400 mb-1">
                      Key Lessons from Grenfell
                    </p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>
                          Combustible cladding can cause catastrophic external
                          fire spread, completely bypassing internal fire
                          protection measures
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>
                          Compartmentation is only effective if it is maintained
                          and if fire cannot bypass it from the outside
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>
                          Stay-put policies rely entirely on effective
                          compartmentation &mdash; when compartmentation fails,
                          the policy must be immediately abandoned
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>
                          Building safety regulation required fundamental reform
                          &mdash; leading to the Building Safety Act 2022 and
                          the establishment of the Building Safety Regulator
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>
                          A small kitchen fire caused by a faulty appliance
                          became the UK&rsquo;s worst residential fire disaster
                          &mdash; demonstrating how building design failures can
                          amplify a minor incident into a major catastrophe
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── Lakanal House ──── */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-amber-300">
                    Case Study &mdash; Lakanal House (3 July 2009)
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-white/80">
                    Six people, including three children, died in a fire at
                    Lakanal House, a 14-storey residential tower block in
                    Camberwell, south London. The fire started on the ninth floor
                    due to a faulty television. Fire spread externally via
                    non-fire-rated panels that had been used to replace original
                    asbestos-containing panels during previous refurbishment
                    works. Compartmentation had been compromised during these
                    works.
                  </p>
                  <p className="text-sm text-white/80">
                    The inquest found that the London Borough of Southwark had
                    failed to carry out fire risk assessments as required by the
                    Regulatory Reform (Fire Safety) Order 2005. The coroner
                    recommended that the government review the guidance in
                    Approved Document B (fire safety) of the Building
                    Regulations &mdash; a recommendation that was not fully
                    acted upon before the Grenfell Tower fire eight years later.
                  </p>
                </div>
              </div>

              {/* ── Piper Alpha ──── */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-amber-300">
                    Case Study &mdash; Piper Alpha (6 July 1988)
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-white/80">
                    While an offshore oil platform disaster rather than a
                    building fire, Piper Alpha remains one of the most
                    significant fire safety case studies in UK history.{" "}
                    <strong>167 men died</strong> when a gas leak ignited on the
                    North Sea production platform. The initial leak occurred
                    because a pump that had been taken out of service for
                    maintenance was inadvertently brought back online &mdash; a
                    permit-to-work failure. The resulting gas explosion
                    ruptured oil pipelines, feeding a catastrophic fire that
                    destroyed the platform.
                  </p>
                  <p className="text-sm text-white/80">
                    The Cullen Inquiry that followed led to a fundamental reform
                    of offshore safety regulation, replacing prescriptive rules
                    with a goal-setting safety case regime. The key lesson for
                    all industries: <strong>permit-to-work systems and
                    isolation procedures</strong> are critical fire prevention
                    measures, and a failure in communication about the status
                    of equipment can have catastrophic consequences.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Common Thread
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Every major fire incident shares common themes: small
                  oversights that escalate into major disasters, failures in
                  maintenance and inspection, compromised fire protection
                  measures, inadequate emergency procedures, and the human
                  tendency to normalise risk through repeated safe experience.
                  As an electrician and fire safety professional, your role is
                  to recognise these patterns, challenge complacency, and
                  ensure that fire prevention measures are maintained to the
                  required standard &mdash; because the consequences of failure
                  are measured in human lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            Common Workplace Ignition Sources — Visual Diagram
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">
              Common Workplace Ignition Sources
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  icon: <Zap className="h-6 w-6 text-rose-400" />,
                  label: "Electrical Faults",
                  desc: "Overloading, arcing, damaged cables",
                },
                {
                  icon: <Flame className="h-6 w-6 text-orange-400" />,
                  label: "Hot Works",
                  desc: "Welding, cutting, grinding sparks",
                },
                {
                  icon: <ShieldAlert className="h-6 w-6 text-red-400" />,
                  label: "Arson",
                  desc: "Deliberate fire-setting",
                },
                {
                  icon: <Cigarette className="h-6 w-6 text-amber-400" />,
                  label: "Smoking",
                  desc: "Discarded cigarettes, improper disposal",
                },
                {
                  icon: <Thermometer className="h-6 w-6 text-yellow-400" />,
                  label: "Heating Equipment",
                  desc: "Portable heaters, LPG, blocked vents",
                },
                {
                  icon: <Trash2 className="h-6 w-6 text-green-400" />,
                  label: "Poor Housekeeping",
                  desc: "Waste buildup, oily rags, blocked exits",
                },
                {
                  icon: <FlaskConical className="h-6 w-6 text-purple-400" />,
                  label: "Chemical Risks",
                  desc: "Flammable liquids, gas cylinders, oxidisers",
                },
                {
                  icon: <AlertTriangle className="h-6 w-6 text-cyan-400" />,
                  label: "Human Error",
                  desc: "Complacency, shortcuts, lack of training",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-black/30 rounded-lg p-3 sm:p-4 text-center flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="text-xs font-medium text-white">{item.label}</p>
                  <p className="text-[10px] text-white/50 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            FAQ Section
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════
            Quiz
            ═════════════════════════════════════════ */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* ═════════════════════════════════════════
            Bottom Navigation
            ═════════════════════════════════════════ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fire Behaviour &amp; Development
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2">
              Continue to Module 2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
