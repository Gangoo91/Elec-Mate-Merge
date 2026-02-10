import { ArrowLeft, ShieldCheck, CheckCircle, AlertTriangle, BookOpen, HardHat, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "welfare-facilities",
    question: "Under CDM 2015, who has primary responsibility for providing welfare facilities on a construction site with more than one contractor?",
    options: [
      "Each individual contractor for their own workers",
      "The principal contractor",
      "The client directly",
      "The Health and Safety Executive"
    ],
    correctIndex: 1,
    explanation: "The principal contractor has the primary duty to ensure adequate welfare facilities are provided and maintained for all workers on site, as required by CDM 2015 Schedule 2. The client must ensure a principal contractor is appointed to fulfil this duty."
  },
  {
    id: "safety-sign-types",
    question: "A circular blue sign with a white symbol indicates which type of safety message?",
    options: [
      "Prohibition — you must not do this",
      "Warning — be aware of a hazard",
      "Mandatory — you must do this",
      "Safe condition — escape route or first aid"
    ],
    correctIndex: 2,
    explanation: "A blue circle with a white symbol is a mandatory sign — it tells you something you must do. For example, a blue circle with a hard hat symbol means 'hard hats must be worn'. Prohibition signs are red circles, warning signs are yellow triangles, and safe condition signs are green rectangles."
  },
  {
    id: "occupational-health",
    question: "An electrician notices white patches on their hands after regularly handling cement without gloves. What condition is most likely developing?",
    options: [
      "Hand-arm vibration syndrome (HAVS)",
      "Occupational asthma",
      "Contact dermatitis",
      "Noise-induced hearing loss"
    ],
    correctIndex: 2,
    explanation: "Contact dermatitis is an inflammatory skin condition caused by direct contact with irritants (like cement, solvents, or cutting oils) or allergens. Symptoms include redness, itching, cracking, blistering, and white patches. Electricians are particularly at risk from cement, PVC solvent weld, flux, and cable-pulling compounds."
  }
];

const faqs = [
  {
    question: "What happens if there are no welfare facilities on site when I arrive?",
    answer: "You should raise the issue immediately with your supervisor or site manager. Under CDM 2015, the principal contractor has a legal duty to provide welfare facilities before work begins. If facilities are not available and the issue is not resolved promptly, you can report the matter to the HSE. You are within your rights to refuse to start work until adequate facilities are provided — this is a legal requirement, not an optional extra."
  },
  {
    question: "How often should site inductions be refreshed?",
    answer: "There is no single legal timeframe for refresher inductions, but best practice is to provide a refresher whenever site conditions change significantly, when new hazards are introduced, after a serious incident, or at least every 12 months for long-term projects. Some principal contractors require refreshers every 6 months. Additionally, anyone returning to site after a prolonged absence should receive a refresher covering any changes that have occurred."
  },
  {
    question: "Can I refuse to work if I think the traffic management on site is unsafe?",
    answer: "Yes. Under Section 7 of the Health and Safety at Work etc. Act 1974, you have a duty to take reasonable care for your own health and safety and that of others. If you believe traffic management arrangements are inadequate and pose a serious risk, you should raise the concern with your supervisor and, if necessary, refuse to work in that area until the issue is resolved. Report it formally through the site's safety reporting system."
  },
  {
    question: "What is the difference between a first aider and an appointed person?",
    answer: "A first aider holds a valid first aid at work certificate (FAW or EFAW) and is trained to administer first aid treatment. An appointed person is someone designated to take charge of first aid arrangements — they call the emergency services, look after the first aid box, and manage the situation — but they are not necessarily trained to provide treatment beyond basic life support. Every site must have at least an appointed person; whether qualified first aiders are required depends on the site risk assessment and number of workers."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under CDM 2015 Schedule 2, which of the following is NOT a mandatory welfare facility requirement for construction sites?",
    options: [
      "Drinking water supply",
      "Heated drying room for wet clothing",
      "On-site canteen with hot food",
      "Washing facilities with hot and cold water"
    ],
    correctAnswer: 2,
    explanation: "CDM 2015 Schedule 2 requires drinking water, washing facilities (with hot and cold water), toilets, changing rooms, rest areas, and facilities for drying wet clothing. A canteen with hot food is not a legal requirement — rest areas with the means to heat food and boil water are sufficient."
  },
  {
    id: 2,
    question: "What must a site induction cover as a minimum?",
    options: [
      "Emergency procedures, first aid locations, welfare facilities, site rules, and PPE requirements",
      "Only the location of the site office and car park",
      "A general overview of the construction industry",
      "The client's business strategy and project budget"
    ],
    correctAnswer: 0,
    explanation: "A site induction must cover emergency procedures, first aid arrangements, welfare facility locations, site-specific rules, PPE requirements, hazard locations, reporting procedures, and the identity of key personnel such as the site manager and safety officer."
  },
  {
    id: 3,
    question: "A yellow triangular sign with a black border and black symbol indicates what?",
    options: [
      "A mandatory action you must take",
      "A prohibition — something you must not do",
      "A warning — hazard ahead",
      "A safe condition — escape route"
    ],
    correctAnswer: 2,
    explanation: "Yellow triangles with a black border and black symbol are warning signs. They alert you to a hazard in the area. Examples include warnings for electrical danger, overhead loads, slippery surfaces, and hazardous substances."
  },
  {
    id: 4,
    question: "What is the primary purpose of separating pedestrians and vehicles on a construction site?",
    options: [
      "To make the site look more organised for client visits",
      "To reduce noise levels for workers on foot",
      "To prevent struck-by incidents, which are a leading cause of construction fatalities",
      "To comply with local council parking regulations"
    ],
    correctAnswer: 2,
    explanation: "Being struck by a moving vehicle is one of the most common causes of fatal accidents on construction sites. Traffic management plans separate vehicle routes from pedestrian walkways, reducing the risk of workers being struck. This includes designated crossing points, barriers, and high-visibility requirements."
  },
  {
    id: 5,
    question: "Which of the following is an example of good housekeeping practice on a construction site?",
    options: [
      "Stacking materials against fire exits to save space",
      "Leaving cable offcuts on the floor for the cleaner to collect",
      "Clearing work areas at the end of each task and storing materials properly",
      "Keeping all walkways locked to prevent unauthorised access"
    ],
    correctAnswer: 2,
    explanation: "Good housekeeping means keeping work areas tidy as you go, clearing waste and offcuts promptly, storing materials safely, maintaining clear access routes, and ensuring walkways and emergency exits remain unobstructed. Poor housekeeping is one of the most common causes of slips, trips, and falls on construction sites."
  },
  {
    id: 6,
    question: "What is hand-arm vibration syndrome (HAVS)?",
    options: [
      "A skin condition caused by contact with solvents",
      "A respiratory disease from inhaling dust",
      "A condition affecting blood vessels, nerves, muscles and joints in the hand and arm caused by regular use of vibrating tools",
      "A hearing condition caused by loud machinery"
    ],
    correctAnswer: 2,
    explanation: "HAVS is caused by regular and prolonged use of vibrating hand-held tools such as hammer drills, breakers, grinders, and chasing machines. Symptoms include tingling, numbness, pain, loss of grip strength, and whitening of the fingers (white finger). It is irreversible once established and is particularly relevant to electricians who regularly use rotary hammer drills and chasing equipment."
  },
  {
    id: 7,
    question: "Site hoarding and fencing is required primarily to:",
    options: [
      "Advertise the construction company to passing traffic",
      "Keep the site dry during wet weather",
      "Prevent unauthorised access and protect the public from site hazards",
      "Reduce noise from site activities"
    ],
    correctAnswer: 2,
    explanation: "The primary purpose of hoarding and fencing is to prevent unauthorised persons — especially children — from entering the site, and to protect the public from hazards such as falling materials, moving plant, and open excavations. Under the Highways Act 1980 and CDM 2015, duty holders must take reasonable steps to protect anyone who might be affected by site activities."
  },
  {
    id: 8,
    question: "During a site emergency, what is the FIRST thing you should do?",
    options: [
      "Collect your personal belongings and tools",
      "Phone your employer to let them know",
      "Follow the site emergency procedure — stop work, raise the alarm, and proceed to the assembly point",
      "Continue working until told to stop by the site manager"
    ],
    correctAnswer: 2,
    explanation: "In any site emergency, the immediate priority is to follow the site emergency procedure: stop work, raise the alarm (or respond to it), and proceed to the designated assembly point by the safest route. Do not stop to collect belongings. Report to the roll-call marshal so you can be accounted for. Only return to work when authorised by the site manager or emergency services."
  }
];

const CscsCardModule2Section3 = () => {
  useSEO({
    title: "Workplace Welfare & Site Safety | CSCS Card Module 2 Section 3",
    description: "Learn about welfare facilities, site inductions, housekeeping, safety signs, traffic management, site security, occupational health, and emergency procedures for the CSCS HS&E test.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../cscs-card-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <HardHat className="h-10 w-10 text-green-400 mx-auto mb-4" />
          <span className="inline-block bg-green-500/15 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Workplace Welfare &amp; Site Safety
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Essential welfare standards, safety procedures, and occupational health awareness for every construction worker
          </p>
        </div>

        {/* Section 01: Welfare Facilities */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">01</span>
              Welfare Facilities
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Construction (Design and Management) Regulations 2015 (CDM 2015), Schedule 2, sets out the minimum
                welfare facilities that must be provided on every construction site before work begins. These are not
                optional extras — they are legal requirements. The <strong>principal contractor</strong> is responsible
                for ensuring these facilities are in place, maintained, and accessible to all workers on site.
              </p>

              {/* Welfare Facility Requirements Diagram */}
              <div className="bg-white/5 border border-green-500/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-green-400 font-semibold text-base mb-4 text-center">
                  CDM 2015 Schedule 2 — Minimum Welfare Facility Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🚻</div>
                    <div className="text-sm font-semibold text-green-400 mb-1">Toilets</div>
                    <p className="text-white/70 text-xs">
                      Adequate number, clean, ventilated, lit, lockable. Separate facilities for men and women unless each is a single-occupancy lockable room.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🚿</div>
                    <div className="text-sm font-semibold text-green-400 mb-1">Washing Facilities</div>
                    <p className="text-white/70 text-xs">
                      Hot and cold (or warm) running water, soap, towels or hand dryers. Must be in the immediate vicinity of toilets and changing rooms.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🚰</div>
                    <div className="text-sm font-semibold text-green-400 mb-1">Drinking Water</div>
                    <p className="text-white/70 text-xs">
                      Wholesome drinking water readily accessible. Must be clearly marked. Cups must be provided unless the supply is a drinking fountain.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">👕</div>
                    <div className="text-sm font-semibold text-green-400 mb-1">Changing Rooms</div>
                    <p className="text-white/70 text-xs">
                      Secure area to change and store personal clothing not worn at work. Separate facilities for men and women where necessary for decency.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">☕</div>
                    <div className="text-sm font-semibold text-green-400 mb-1">Rest Areas</div>
                    <p className="text-white/70 text-xs">
                      Heated, sheltered rest area with seating and tables. Means to heat food and boil water. Separate from work areas and contaminants.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🧥</div>
                    <div className="text-sm font-semibold text-green-400 mb-1">Drying Rooms</div>
                    <p className="text-white/70 text-xs">
                      Facilities for drying wet clothing and PPE. Essential on UK sites where rain is frequent. Prevents workers wearing damp clothing all day.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Who Is Responsible?</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Principal contractor:</strong> Primary duty to provide and maintain all welfare facilities on multi-contractor sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Contractors:</strong> Must cooperate with the principal contractor and report any welfare deficiencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Client:</strong> Must ensure that the principal contractor has adequate arrangements in place before work starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Workers:</strong> Must use the facilities properly and report damage, deficiencies, or cleanliness issues</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">Key Point for Electricians</h3>
                <p className="text-white/80 text-sm">
                  If you are working on a site where welfare facilities have not been provided — or are not being
                  maintained to an acceptable standard — you should raise this with the principal contractor or site
                  manager immediately. It is a criminal offence to operate a construction site without adequate welfare
                  provisions. This applies regardless of the size of the site or the duration of the work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Site Inductions */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">02</span>
              Site Inductions
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Every person who enters a construction site for the first time must receive a site-specific induction
                before commencing any work. This applies to everyone — not just manual workers — including visitors,
                delivery drivers, and client representatives. The induction is the principal contractor's responsibility,
                though the task is often delegated to the site safety officer or supervisor.
              </p>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">What Must a Site Induction Cover?</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Emergency procedures:</strong> Fire alarm sound, evacuation routes, assembly points, and what to do if you discover an emergency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>First aid:</strong> Location of first aid points, identity of first aiders and appointed persons, how to summon help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Welfare facilities:</strong> Location of toilets, washing facilities, rest areas, drinking water, drying rooms, and changing rooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Site rules:</strong> Working hours, smoking areas, mobile phone policy, speed limits, parking, permits to work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>PPE requirements:</strong> Minimum PPE for general site access, additional PPE for specific areas or tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Hazard locations:</strong> Live services, excavations, overhead hazards, confined spaces, asbestos-containing materials, fragile surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Reporting procedures:</strong> How to report accidents, near misses, unsafe conditions, and defective equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Key personnel:</strong> Site manager, safety officer, first aiders, fire marshals, and their contact details</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Recording & Refreshers</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Attendance records:</strong> Every induction must be recorded with the person's name, employer, date, and signature. These records must be kept for the duration of the project.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Refresher inductions:</strong> Required when site conditions change significantly, after a serious incident, or at regular intervals on long-term projects (typically every 6-12 months).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Returning workers:</strong> Anyone absent for a prolonged period should receive a refresher covering any changes since their last attendance.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">No Induction = No Access</h3>
                </div>
                <p className="text-white/80 text-sm">
                  You must not start work on any construction site until you have received the site-specific induction.
                  If you arrive on site and nobody is available to deliver the induction, you must wait. Working without
                  an induction puts you and others at risk and is a breach of site safety rules. Increasingly, induction
                  records are checked during site audits, and workers without records can be removed from site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Housekeeping & Good Order */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">03</span>
              Housekeeping &amp; Good Order
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Poor housekeeping is one of the leading causes of accidents on construction sites. Slips, trips, and
                falls account for a significant proportion of all injuries, and the majority of these are caused by
                untidy work areas, poor storage, and cluttered access routes. Keeping your work area clean and orderly
                is not just good practice — it is a legal requirement under CDM 2015 and the Workplace (Health, Safety
                and Welfare) Regulations 1992.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Housekeeping Essentials</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Clear access routes:</strong> Corridors, stairways, and escape routes must be kept free from materials, tools, waste, and trailing cables at all times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Waste management:</strong> Remove waste regularly. Use designated skips and waste segregation areas. Never allow waste to accumulate in work areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Material storage:</strong> Store materials safely — stacked securely, on level ground, away from edges, and protected from weather where necessary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Trip hazards:</strong> Immediately deal with trailing cables, loose fixings, offcuts, packaging, and any item that could cause someone to trip or fall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Spill management:</strong> Clean up spills (water, oil, chemicals) immediately or cordon off the area until they can be dealt with safely</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Cable Management for Electricians</h3>
                <p className="text-white/80 text-sm mb-3">
                  As an electrician, cable management is both a professional skill and a safety responsibility. Trailing
                  cables are one of the most common trip hazards on construction sites.
                </p>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Route temporary power cables overhead where possible, using cable hangers or catenary wire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Where floor-level routing is unavoidable, use cable protectors (yellow ramps) across walkways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Keep cable offcuts contained — never leave lengths of cable lying on the floor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Coil and secure any temporary extension leads when not in active use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Route cables away from heat sources, sharp edges, and areas where they could be damaged by plant or traffic</span>
                  </li>
                </ul>
              </div>

              <p>
                Good housekeeping is everyone's responsibility — not just the site labourer's. The principle of
                "clean as you go" means that each trade is expected to tidy up after completing their work in an area.
                If you strip cable, collect the offcuts. If you drill holes, sweep up the dust. If you open packaging,
                dispose of it properly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Safety Signs & Signals */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">04</span>
              Safety Signs &amp; Signals
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Health and Safety (Safety Signs and Signals) Regulations 1996 require employers to provide safety
                signs where there is a significant risk that cannot be avoided or reduced by other means. Construction
                sites use five main types of safety sign, each with a distinct shape, colour, and meaning. You must be
                able to recognise all five types instantly.
              </p>

              {/* Safety Sign Types Diagram */}
              <div className="bg-white/5 border border-green-500/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-green-400 font-semibold text-base mb-4 text-center">
                  The Five Types of Safety Sign
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {/* Prohibition */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full border-[3px] border-red-500 flex items-center justify-center relative">
                        <div className="w-7 h-[3px] bg-red-500 rotate-45 absolute" />
                      </div>
                      <div>
                        <div className="text-red-400 font-semibold text-sm">Prohibition</div>
                        <div className="text-white/50 text-xs">Red circle, diagonal line</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs">
                      <strong className="text-red-400">Meaning:</strong> You must NOT do this. Examples: no smoking, no entry, no mobile phones, do not extinguish with water.
                    </p>
                  </div>

                  {/* Mandatory */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">!</span>
                      </div>
                      <div>
                        <div className="text-blue-400 font-semibold text-sm">Mandatory</div>
                        <div className="text-white/50 text-xs">Blue circle, white symbol</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs">
                      <strong className="text-blue-400">Meaning:</strong> You MUST do this. Examples: wear hard hat, wear hi-vis, wear eye protection, wear hearing protection.
                    </p>
                  </div>

                  {/* Warning */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-yellow-500 relative">
                        <span className="absolute -bottom-[28px] left-1/2 -translate-x-1/2 text-black font-bold text-sm">!</span>
                      </div>
                      <div>
                        <div className="text-yellow-400 font-semibold text-sm">Warning</div>
                        <div className="text-white/50 text-xs">Yellow triangle, black border</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs">
                      <strong className="text-yellow-400">Meaning:</strong> Danger — be aware. Examples: electrical hazard, overhead loads, slippery surface, hazardous substances.
                    </p>
                  </div>

                  {/* Safe Condition */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-7 rounded-sm bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">EXIT</span>
                      </div>
                      <div>
                        <div className="text-green-400 font-semibold text-sm">Safe Condition</div>
                        <div className="text-white/50 text-xs">Green rectangle, white symbol</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs">
                      <strong className="text-green-400">Meaning:</strong> Safety information. Examples: emergency exit, first aid point, emergency shower, assembly point.
                    </p>
                  </div>

                  {/* Fire Safety */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-7 rounded-sm bg-red-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">FIRE</span>
                      </div>
                      <div>
                        <div className="text-red-400 font-semibold text-sm">Fire Safety</div>
                        <div className="text-white/50 text-xs">Red rectangle, white symbol</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs">
                      <strong className="text-red-400">Meaning:</strong> Fire equipment location. Examples: fire extinguisher, fire hose reel, fire alarm call point, fire blanket.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Banksman Signals for Plant Operations</h3>
                <p className="text-white/80 text-sm mb-3">
                  In addition to fixed signage, construction sites use hand signals to guide plant and vehicle
                  movements. A banksman (also called a signaller or marshal) uses standardised hand signals to direct
                  operations such as crane lifts, reversing vehicles, and excavator movements.
                </p>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Start / Attention:</strong> Both arms extended horizontally, palms facing forward</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Stop:</strong> Right arm raised, palm facing forward — the universal halt signal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Emergency stop:</strong> Both arms raised and waved vigorously above the head</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Raise / Hoist up:</strong> Right arm extended upward, circling slowly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Lower:</strong> Right arm extended downward, circling slowly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Move towards me:</strong> Both arms bent, palms facing inward, beckoning towards the body</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Move away:</strong> Both arms bent, palms facing outward, pushing away from the body</span>
                  </li>
                </ul>
              </div>

              <p>
                All banksmen must be trained and competent. On most sites, they must hold a recognised qualification
                (such as a CPCS or CSCS card with the banksman/slinger endorsement). High-visibility clothing is
                essential so that plant operators can clearly see the signaller at all times.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Traffic Management */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">05</span>
              Traffic Management
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Being struck by a moving vehicle is one of the most common causes of fatal accidents on construction
                sites in the UK. An effective traffic management plan is essential on any site where vehicles and
                pedestrians share space. The plan must be prepared before work starts and communicated to all workers
                through the site induction.
              </p>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Key Elements of a Traffic Management Plan</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Separation:</strong> Physical barriers, fencing, or clearly marked routes separating vehicle traffic from pedestrian walkways wherever possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>One-way systems:</strong> Reducing or eliminating the need for vehicles to reverse by implementing one-way traffic flows around the site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Speed limits:</strong> Typically 5-10 mph on site. Enforced through signage, speed bumps, and monitoring by site management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Reversing vehicles:</strong> Minimised wherever possible. Where unavoidable, a trained banksman must guide the vehicle. Reversing alarms and cameras should be fitted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Designated crossing points:</strong> Where pedestrians need to cross vehicle routes, marked crossing points with clear sightlines must be provided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Visibility:</strong> All pedestrians in traffic areas must wear high-visibility clothing. Vehicles must have working lights, mirrors, and warning devices</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Banksmen and Marshals</h3>
                <p className="text-white/80 text-sm mb-3">
                  Banksmen (vehicle marshals) play a critical role in traffic management, particularly for:
                </p>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Guiding reversing vehicles in areas where rear visibility is limited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Directing deliveries to loading/unloading areas safely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Stopping pedestrian traffic at crossing points when vehicles are moving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Managing temporary traffic diversions when work affects vehicle routes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Pedestrian PPE in Traffic Areas</h3>
                </div>
                <p className="text-white/80 text-sm">
                  When working in or near vehicle traffic areas, you must wear high-visibility clothing that meets
                  EN ISO 20471 (minimum Class 2 for daytime, Class 3 for low-light or night work). This is in addition
                  to your standard PPE. Many sites require high-visibility clothing at all times as a general site rule,
                  but it is especially critical near vehicle movements where being seen is the difference between life
                  and death.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Site Security & Public Protection */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">06</span>
              Site Security &amp; Public Protection
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Construction sites present significant hazards to the public, particularly to children who may be
                attracted to the site as a place to explore. The principal contractor has a duty to prevent unauthorised
                access and protect anyone who might be affected by site activities. This duty extends beyond the site
                boundary — activities such as crane operations, deliveries, and scaffolding work can all affect people
                on adjacent land and highways.
              </p>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Physical Security Measures</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Hoarding:</strong> Solid timber or metal hoarding around the site perimeter, typically 2.4m high minimum, to prevent access and shield the public from site activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Fencing:</strong> Heras-type mesh fencing for less hazardous areas or temporary works. Must be stable, complete, and properly maintained</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Secure gates:</strong> Locked when the site is unattended. Manned during working hours with sign-in procedures for all visitors and deliveries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Warning signs:</strong> "Construction Site — Keep Out", "Danger — Hard Hat Area", "Unauthorised Persons Must Not Enter" displayed prominently on all access points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>CCTV and lighting:</strong> Security cameras and adequate lighting to deter trespassers during non-working hours</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Highways Act 1980 Obligations</h3>
                <p className="text-white/80 text-sm mb-3">
                  Where construction work is adjacent to or affects a public highway, additional obligations apply under
                  the Highways Act 1980:
                </p>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>A licence from the local authority is required for any hoarding or scaffolding on or over the public highway</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Adequate lighting must be provided on hoarding and scaffolding adjacent to the highway, particularly at night</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Pedestrian walkways must be provided if the pavement is obstructed, with barriers and appropriate signage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Materials must not be deposited on the highway without authorisation, and any spillage must be cleaned immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Vehicles leaving site must not deposit mud or debris on the public road — wheel-washing facilities may be required</span>
                  </li>
                </ul>
              </div>

              <p>
                Protecting the public is not solely the site manager's concern. Every worker has a responsibility to
                ensure that site security is not compromised. This means closing gates after yourself, not leaving gaps
                in fencing, reporting any damage to hoarding, and ensuring that materials or equipment are not left
                where they could fall onto public areas.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Occupational Health */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">07</span>
              Occupational Health
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Occupational health hazards are often called the "silent killers" of the construction industry.
                Unlike accidents, which happen suddenly, occupational diseases develop gradually over months or years
                of exposure. By the time symptoms appear, irreversible damage may already have occurred. Understanding
                these hazards and taking preventive action is essential for every construction worker.
              </p>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">Common Occupational Health Conditions in Construction</h3>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-white font-semibold text-sm mb-1">Dermatitis (Contact Dermatitis)</h4>
                    <p className="text-white/70 text-xs mb-2">
                      Inflammation of the skin caused by contact with irritants or allergens. Common causes include
                      cement, epoxy resins, solvents, PVC solvent weld, flux, and cutting oils.
                    </p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Symptoms:</strong> Redness, itching, cracking, blistering, dry scaly skin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Prevention:</strong> Wear appropriate gloves, use barrier creams, wash hands properly, avoid skin contact with irritants</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-white font-semibold text-sm mb-1">Occupational Asthma</h4>
                    <p className="text-white/70 text-xs mb-2">
                      A lung condition caused by breathing in certain dusts, fumes, or vapours at work. Construction
                      workers are exposed to silica dust, wood dust, isocyanates (in some paints and foams), and welding fumes.
                    </p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Symptoms:</strong> Wheezing, coughing, chest tightness, breathlessness — often worse during or after work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Prevention:</strong> Use dust extraction, wear RPE, minimise exposure, ensure adequate ventilation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-white font-semibold text-sm mb-1">Hand-Arm Vibration Syndrome (HAVS)</h4>
                    <p className="text-white/70 text-xs mb-2">
                      Damage to blood vessels, nerves, muscles, and joints caused by regular use of vibrating hand-held
                      tools. Particularly relevant to electricians who use rotary hammer drills, chasing machines, and grinders.
                    </p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Symptoms:</strong> Tingling, numbness, pain in fingers, loss of grip, white finger (blanching of fingertips in cold)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Prevention:</strong> Limit exposure time, use low-vibration tools, take regular breaks, keep hands warm</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-white font-semibold text-sm mb-1">Noise-Induced Hearing Loss (NIHL)</h4>
                    <p className="text-white/70 text-xs mb-2">
                      Permanent, irreversible hearing damage caused by prolonged exposure to high noise levels.
                      Construction sites frequently exceed safe noise levels, particularly during demolition, piling,
                      drilling, and cutting operations.
                    </p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Action levels:</strong> Lower exposure action value: 80 dB(A) daily average. Upper value: 85 dB(A). Exposure limit: 87 dB(A)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Prevention:</strong> Wear hearing protection, reduce exposure time, use quieter tools and methods where available</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-white font-semibold text-sm mb-1">Musculoskeletal Disorders (MSDs)</h4>
                    <p className="text-white/70 text-xs mb-2">
                      Injuries to muscles, tendons, ligaments, joints, and nerves caused by manual handling, repetitive
                      movements, awkward postures, and heavy lifting. Common in electrical work due to overhead work,
                      cable pulling, and carrying heavy materials.
                    </p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Symptoms:</strong> Back pain, shoulder and neck pain, tendonitis, carpal tunnel syndrome</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Prevention:</strong> Use correct manual handling techniques, take breaks, use mechanical aids, vary work activities</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">Work-Related Stress</h4>
                    <p className="text-white/70 text-xs mb-2">
                      Mental health is an increasingly recognised aspect of occupational health. Construction workers
                      face particular pressures including long hours, job insecurity, time away from family, physical
                      demands, and a culture that can discourage seeking help.
                    </p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Signs:</strong> Fatigue, irritability, difficulty concentrating, increased absence, withdrawal from colleagues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Support:</strong> Speak to your supervisor, contact your employer's EAP, or call the Construction Industry Helpline</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Health Surveillance & Pre-Employment Medicals</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Health surveillance:</strong> Regular monitoring required where workers are exposed to specific hazards (noise, vibration, hazardous substances, dust). Identifies early signs of disease before irreversible damage occurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Pre-employment medicals:</strong> Some employers and principal contractors require a health assessment before starting work. Establishes a baseline and identifies any pre-existing conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Skin checks:</strong> Regular self-inspection of hands and forearms for signs of dermatitis, particularly if you handle cement, solvents, or chemical products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Audiometry:</strong> Hearing tests for workers regularly exposed to high noise levels — typically at baseline and then at regular intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>HAVS tier assessment:</strong> Questionnaire-based screening followed by clinical assessment if symptoms are reported. Uses the Stockholm Workshop scale to grade severity</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">Key Point</h3>
                <p className="text-white/80 text-sm">
                  Many occupational diseases are irreversible once established — you cannot undo hearing loss, cure HAVS,
                  or repair scarred lungs. Prevention is the only effective strategy. Report any early symptoms to your
                  employer immediately. Early intervention can prevent mild symptoms from becoming permanent disability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Emergency Procedures */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">08</span>
              Emergency Procedures
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Every construction site must have a written emergency plan that covers fire, medical emergencies,
                structural collapse, chemical spills, gas leaks, and any other foreseeable emergency scenario. The plan
                must be communicated to all workers through the site induction and displayed prominently in rest areas,
                site offices, and at key locations around the site.
              </p>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Site Emergency Plan — Key Components</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Alarm systems:</strong> The type of alarm (continuous siren, air horn, tannoy announcement), what it sounds like, and what action to take when you hear it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Evacuation routes:</strong> Primary and secondary routes from all parts of the site. Routes must be kept clear, well-lit, and clearly signed with green safe-condition signs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Assembly points:</strong> Designated muster points away from buildings and hazards. You must go directly to the assembly point — do not return to collect belongings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Roll call:</strong> Fire marshals or supervisors conduct a headcount at the assembly point. You must remain at the assembly point until the all-clear is given</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Emergency contacts:</strong> Site manager, safety officer, emergency services, and utility companies (gas, electric, water) for service strikes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Fire Evacuation on Construction Sites</h3>
                <p className="text-white/80 text-sm mb-3">
                  Fire is a significant risk on construction sites due to the presence of combustible materials, hot
                  works, temporary electrical installations, and limited fire detection and suppression systems during
                  the construction phase.
                </p>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>On hearing the alarm:</strong> Stop work immediately. Make safe any work in progress (isolate electrical supplies, turn off gas torches)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Evacuate:</strong> Leave by the nearest safe route. Do not use lifts. If a route is blocked by smoke or fire, use an alternative</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Close doors:</strong> Close doors behind you as you leave to slow the spread of fire and smoke</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Report:</strong> At the assembly point, report to your roll-call marshal and inform them of any people unaccounted for or anyone who may still be in the building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Do not re-enter:</strong> Never go back into the site until the fire service or site manager gives the all-clear</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">First Aiders & Appointed Persons</h3>
                <p className="text-white/80 text-sm mb-3">
                  The Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate first aid
                  arrangements. On construction sites, this means:
                </p>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>First aiders:</strong> Hold a valid first aid at work (FAW) or emergency first aid at work (EFAW) certificate. Trained to provide treatment for injuries and illness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Appointed persons:</strong> Take charge of first aid arrangements. Call emergency services, maintain the first aid box, and manage the situation — but not necessarily trained to treat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>First aid boxes:</strong> Stocked with appropriate supplies, regularly checked, and located where they are easily accessible. Contents should be suitable for the risks on site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Information:</strong> The names and locations of first aiders must be displayed on the site noticeboard and communicated during the site induction</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">Know Your Site</h3>
                <p className="text-white/80 text-sm">
                  Every site is different. When you arrive at a new site, make it a personal priority to learn:
                  where the assembly point is, the quickest route to it from your work area, where the nearest first
                  aid point is, who the first aiders are, what the alarm sounds like, and where the nearest fire
                  extinguisher is located. Do not wait for an emergency to find out — by then it will be too late.
                  This information should all be covered in the site induction, but take the time to physically walk
                  the routes yourself.
                </p>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Electrical Emergencies</h3>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  As an electrician, you should be particularly aware of the emergency procedures for electrical
                  incidents:
                </p>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Electric shock:</strong> Do not touch the casualty until the circuit is isolated. Use an insulating material to separate them from the source if you cannot isolate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Electrical fire:</strong> Isolate the supply if safe to do so. Use a CO2 or dry powder extinguisher — never water on a live electrical fire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Cable strike:</strong> If you strike a buried cable, move away immediately, warn others, isolate the area, and report to the site manager and utility company</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-green-400/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Workplace Welfare & Site Safety Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../cscs-card-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../cscs-card-module-2-section-4">
              Next: Accident Reporting &amp; RIDDOR
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default CscsCardModule2Section3;
