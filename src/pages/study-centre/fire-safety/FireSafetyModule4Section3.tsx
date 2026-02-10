import { ArrowLeft, ArrowRight, MapPin, Shield, Users, ClipboardList, Radio, AlertTriangle, CheckCircle, BookOpen, HardHat, Megaphone, Ban, Eye, Building2, UserCheck } from "lucide-react";
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
    id: "all-clear-authority",
    question: "Who has the authority to give the all-clear for re-entry to a building after a fire evacuation?",
    options: [
      "The building manager",
      "The most senior fire marshal on site",
      "The fire and rescue service or the Responsible Person",
      "Any member of staff once the alarm stops"
    ],
    correctIndex: 2,
    explanation:
      "The all-clear to re-enter a building after a fire evacuation can only be given by the fire and rescue service (if they have attended) or by the Responsible Person (RP) designated under the RRFSO. This is a critical safety control. The fire and rescue service has the legal authority under the Fire and Rescue Services Act 2004 to take charge of the scene and must confirm that the building is safe before anyone re-enters. If the fire service has not attended (for example, after a false alarm that was quickly confirmed), the Responsible Person may authorise re-entry once they are satisfied there is no risk. No other person, including fire marshals or building managers (unless they are the RP), has the authority to give this instruction."
  },
  {
    id: "visitor-sign-in-importance",
    question: "Why is a visitor sign-in system essential for fire safety?",
    options: [
      "It is required for insurance purposes only",
      "It allows security staff to monitor who enters the building",
      "It ensures all visitors can be accounted for during roll call at the assembly point",
      "It prevents unauthorised persons from entering the building"
    ],
    correctIndex: 2,
    explanation:
      "A visitor sign-in system is essential for fire safety because it ensures that all visitors can be accounted for during roll call at the assembly point following an evacuation. Without a comprehensive record of who is in the building at any given time, it is impossible to confirm whether everyone has evacuated safely. If a visitor is not on the roll call list, their absence will not be noticed and they may be trapped inside the building without anyone raising the alarm. The sign-in record must include the visitor's name, the time of arrival, who they are visiting, and crucially, the time of departure (sign-out). This is a requirement under Article 15 of the RRFSO, which mandates procedures for serious and imminent danger, including arrangements for accounting for all persons present."
  },
  {
    id: "fire-marshal-report-info",
    question: "What key information must fire marshals report to the assembly point coordinator?",
    options: [
      "Only the total number of people in their zone",
      "The number evacuated, any missing persons, fire location, hazardous materials, and persons awaiting rescue",
      "The names of everyone who was late to arrive at the assembly point",
      "Whether the fire alarm was genuine or a false alarm"
    ],
    correctIndex: 1,
    explanation:
      "Fire marshals must report comprehensive information to the assembly point coordinator, including: the number of people evacuated from their zone, any confirmed or suspected missing persons (with names if known), the observed location and nature of the fire (if applicable), the presence of any hazardous substances or materials in the area, and any disabled persons or others who are waiting in a place of relative safety (such as a refuge) and require assistance from the fire and rescue service. This information is critical because it is relayed directly to the fire and rescue service to inform their operational decisions. Incomplete or inaccurate information can lead to rescue crews being deployed unnecessarily or, worse, failing to search an area where someone is trapped."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "What should happen if a person is unaccounted for after roll call?",
    answer:
      "If a person is unaccounted for after roll call, this must be reported to the fire and rescue service immediately upon their arrival. The assembly point coordinator should provide the fire service with the missing person's name, last known location within the building, and any relevant details (such as whether they have a disability or were known to be working in a specific area). The fire service will then prioritise a search of the relevant area. Under no circumstances should anyone re-enter the building to search for a missing person — this is one of the most dangerous actions that can be taken and has resulted in numerous firefighter and civilian fatalities. It is also important to verify that the person is genuinely missing and has not simply left the site via a different exit, signed out without being noticed, or gone home before the alarm was raised. Cross-checking with electronic access records, car park observations, and contacting the person by telephone should all be attempted."
  },
  {
    question: "Can the assembly point be a covered or sheltered area?",
    answer:
      "Yes, the assembly point can be a covered or sheltered area, and in fact this is desirable in the UK climate. The key requirements are that the area is at a safe distance from the building (a minimum of 15-20 metres as a general rule, though the specific distance depends on the fire risk assessment and the building height), that it does not obstruct fire service access, and that it is on hard standing (not muddy ground or grass that becomes waterlogged). Covered areas such as car parks with roofs, adjacent buildings' forecourts, or purpose-built shelters can all serve as assembly points provided they meet the safety criteria. The critical factor is that the assembly point must not itself be at risk from the fire — for example, it should not be downwind of the building where smoke could accumulate, and it should not be beneath a facade that could collapse or shed burning material. For outdoor assembly points, the fire risk assessment should consider the impact of adverse weather on vulnerable occupants (elderly, very young, or those with medical conditions) and make appropriate provision."
  },
  {
    question: "How do you manage assembly and roll call for a building with hundreds or thousands of occupants?",
    answer:
      "Managing assembly and roll call for very large buildings requires a structured, zone-based approach. The building is divided into zones (typically by floor, wing, department, or tenant), and each zone has a designated fire marshal responsible for evacuating and accounting for the occupants of that zone. At the assembly point, the area is divided into clearly marked zones that correspond to the building zones, so that people from Floor 3, for example, gather in the Floor 3 section of the assembly point. Each fire marshal conducts a roll call for their zone using a pre-prepared list. Zone-clear reports are then cascaded to the assembly point coordinator, who compiles a building-wide status. For very large sites, electronic systems are increasingly used: swipe-card or proximity-card access control systems can generate a real-time list of everyone currently in the building, and handheld devices or tablets at the assembly point can be used to check people off electronically. Some modern systems use mobile phone apps that allow employees to self-register at the assembly point. Regardless of the technology used, a manual fallback procedure must always be in place in case the electronic system fails."
  },
  {
    question: "Can the assembly point be inside another building?",
    answer:
      "Yes, the assembly point can be inside another building, and this is a practical solution for some premises, particularly in dense urban environments, campus-style developments, or where the weather makes prolonged outdoor assembly impractical. The alternative building must itself meet fire safety requirements, must be at a safe distance from the evacuated building (or separated by fire-resistant construction), and must have sufficient capacity to accommodate the evacuees without creating a crush hazard. The arrangement must be formally agreed with the management of the receiving building and documented in both buildings' fire safety management plans. There must also be a contingency plan in case the receiving building itself needs to be evacuated simultaneously. This arrangement is common in university campuses, hospital complexes, shopping centres, and large office parks. The assembly point building should ideally have toilet facilities, seating for vulnerable persons, and communication equipment."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What is the recommended minimum safe distance for an assembly point from the building?",
    options: [
      "5-10 metres",
      "10-15 metres",
      "15-20 metres",
      "25-30 metres"
    ],
    correctAnswer: 2,
    explanation:
      "The recommended minimum safe distance for an assembly point from the building is 15-20 metres as a general rule. This distance is derived from fire safety guidance and is intended to protect evacuees from the effects of the fire, including radiant heat, falling debris, and smoke. The specific distance should be determined by the fire risk assessment and may need to be greater for buildings with large quantities of flammable materials, tall buildings where facades could collapse, or buildings with hazardous substances. The assembly point must also not obstruct fire service access routes."
  },
  {
    id: 2,
    question:
      "Which method of roll call involves using electronic access data to determine who is in the building?",
    options: [
      "Name-check roll call",
      "Headcount by zone",
      "Badge count roll call",
      "Electronic access data reconciliation"
    ],
    correctAnswer: 3,
    explanation:
      "Electronic access data reconciliation uses data from swipe-card, proximity-card, or biometric access control systems to generate a real-time list of everyone who has entered the building but not yet exited. This list can then be cross-referenced with those present at the assembly point. This method is particularly effective in large buildings with hundreds or thousands of occupants, where manual name-check roll calls would be extremely time-consuming. However, a manual fallback procedure must always be available in case the electronic system fails or loses power during the fire."
  },
  {
    id: 3,
    question:
      "Who is responsible for ensuring visitors are accounted for during an evacuation?",
    options: [
      "The receptionist only",
      "The fire and rescue service",
      "The host (the person the visitor is visiting) and the reception/sign-in system",
      "Visitors are responsible for themselves"
    ],
    correctAnswer: 2,
    explanation:
      "The host (the person the visitor is visiting) bears primary responsibility for ensuring their visitor is accounted for during an evacuation. The host should ensure the visitor knows the evacuation procedure, the location of the nearest exit, and the assembly point. During an evacuation, the host should accompany their visitor to the assembly point. The reception or sign-in system provides the backup record that allows the assembly point coordinator to verify that all visitors listed as being in the building have been accounted for. This dual system — host responsibility plus central record — is essential because the host may themselves be absent (e.g., in a meeting on a different floor) when the alarm sounds."
  },
  {
    id: 4,
    question:
      "In the assembly point communication chain, who does the assembly point coordinator report to?",
    options: [
      "The building owner",
      "The local authority",
      "The senior fire marshal or incident controller, who then briefs the fire service",
      "Directly to 999 control room"
    ],
    correctAnswer: 2,
    explanation:
      "The assembly point communication chain follows a structured hierarchy: individual fire marshals report their zone-clear status to the assembly point coordinator, who compiles the building-wide status and reports to the senior fire marshal or incident controller. The senior fire marshal then briefs the fire and rescue service upon their arrival, providing a comprehensive picture of the evacuation status, any missing persons, the suspected fire location, and any hazards. This chain of command ensures that information is consolidated and verified before being passed to the fire service, reducing the risk of conflicting or inaccurate reports."
  },
  {
    id: 5,
    question:
      "Under what legislation does the fire and rescue service have authority to prevent re-entry to a building?",
    options: [
      "The Health and Safety at Work Act 1974",
      "The Regulatory Reform (Fire Safety) Order 2005",
      "The Fire and Rescue Services Act 2004",
      "The Building Safety Act 2022"
    ],
    correctAnswer: 2,
    explanation:
      "The Fire and Rescue Services Act 2004 gives the fire and rescue service the legal authority to take charge of the scene of a fire, control access to the building, and prevent re-entry until it is safe. Section 44 of the Act provides powers to do anything reasonably believed to be necessary for the purpose of extinguishing fires, protecting life, or protecting property. This includes establishing cordons, closing roads, and prohibiting entry to buildings. The Responsible Person under the RRFSO also has a duty to prevent re-entry as part of their emergency procedures under Article 15."
  },
  {
    id: 6,
    question:
      "What additional challenge do construction sites present for assembly point management?",
    options: [
      "Construction workers do not need to follow fire safety procedures",
      "Multi-contractor coordination with individual contractor roll calls is required",
      "Assembly points are not required on construction sites",
      "Only the principal contractor needs to conduct roll call"
    ],
    correctAnswer: 1,
    explanation:
      "Construction sites present the additional challenge of multi-contractor coordination. A large construction site may have dozens of different contractors and sub-contractors working simultaneously, each with their own workers. Individual contractor roll calls are required because only each contractor's supervisor knows who from their team is on site that day. The principal contractor is responsible for overall site coordination, including ensuring all contractors have a designated assembly point, that site induction covers the fire evacuation procedure, that temporary signage is maintained as the site layout changes, and that all contractors participate in site-wide fire drills. Multiple assembly points may be needed for large sites."
  },
  {
    id: 7,
    question:
      "What equipment should be available at the assembly point for the fire marshal or coordinator?",
    options: [
      "Fire extinguishers and hose reels",
      "First aid kits and defibrillators",
      "Clipboard, roll call list, high-visibility vest, and radio/communication device",
      "Building plans and structural drawings"
    ],
    correctAnswer: 2,
    explanation:
      "The assembly point coordinator should have the following equipment readily available: a clipboard with pre-prepared roll call lists (updated daily or as shifts change), a high-visibility vest for easy identification, a radio or other communication device for relaying information to the senior fire marshal and fire service, and a torch (for night-time or power failure scenarios). Some organisations also provide a tabard marked 'Assembly Point Coordinator' or 'Fire Marshal', a loud-hailer or whistle for getting attention in noisy environments, and a waterproof cover for the clipboard. The roll call list should be stored in a grab bag at a known location so it can be taken to the assembly point quickly."
  },
  {
    id: 8,
    question:
      "What standard governs the signage used to identify assembly points?",
    options: [
      "BS 5839",
      "BS 9999",
      "BS ISO 7010",
      "BS EN 12845"
    ],
    correctAnswer: 2,
    explanation:
      "BS ISO 7010 is the international standard that governs safety signs, including the green and white assembly point sign (reference E007). This standard ensures that safety signs are universally recognisable regardless of language, using standardised pictograms. The assembly point sign features a group of people with an arrow pointing to a designated location, all in white on a green background (the colour for safe condition signs). Assembly point signs must be positioned at the assembly point itself and on evacuation route signage pointing towards it. Additional text in English (and other languages as appropriate) may supplement the pictogram but the pictogram alone must be sufficient for comprehension."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function FireSafetyModule4Section3() {
  useSEO({
    title: "Assembly Points & Roll Call | Fire Safety Module 4.3",
    description:
      "Learn about assembly point selection, roll call procedures, visitor and contractor accounting, communication during emergencies, preventing re-entry, and construction site assembly points. Covers RRFSO Article 15, BS ISO 7010 signage, and Fire and Rescue Services Act 2004.",
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
            <Link to="../fire-safety-module-4">
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <MapPin className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Assembly Points &amp; Roll Call
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how to select and manage assembly points, conduct effective roll calls, account for all occupants including visitors and contractors, and communicate critical information to the fire and rescue service
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Assembly points:</strong> Safe gathering location, 15-20m minimum distance</li>
              <li><strong>Roll call:</strong> Pre-prepared lists, zone-based accounting</li>
              <li><strong>Visitors:</strong> Sign-in system essential for accountability</li>
              <li><strong>No re-entry</strong> until all-clear from fire service or RP</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Legislation</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>RRFSO Art. 15:</strong> Procedures for serious and imminent danger</li>
              <li><strong>BS ISO 7010:</strong> Assembly point signage standard</li>
              <li><strong>Fire &amp; Rescue Services Act 2004:</strong> Authority to prevent re-entry</li>
              <li><strong>CDM 2015:</strong> Construction site fire safety coordination</li>
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
              "Explain the purpose of assembly points and their legal basis under the RRFSO",
              "Describe the criteria for selecting a suitable assembly point location",
              "Outline the procedures for conducting an effective roll call",
              "Explain the importance of visitor and contractor sign-in systems for fire safety",
              "Describe the communication chain during an emergency assembly",
              "State the legal authority for preventing re-entry and the role of the fire service"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: Purpose of Assembly Points                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">01</span>
              Purpose of Assembly Points
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An <strong>assembly point</strong> is a designated safe location where all building occupants gather following an evacuation. It is far more than simply a place to stand &mdash; it serves several critical safety functions that are fundamental to the emergency procedures required under the Regulatory Reform (Fire Safety) Order 2005 (RRFSO).
              </p>

              <p>
                The primary purposes of an assembly point are:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Safe gathering location</strong> &mdash; provides a place of safety at a sufficient distance from the building where evacuees are protected from the effects of fire, including radiant heat, smoke, falling debris, and potential structural collapse</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Confirming all persons are accounted for</strong> &mdash; enables roll call to be conducted so that any missing persons can be identified and reported to the fire and rescue service for search and rescue</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Providing information to the fire service</strong> &mdash; the assembly point is where the fire and rescue service receives critical information about the number of people evacuated, missing persons, the suspected fire location, and any hazardous materials or persons requiring rescue assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Preventing re-entry</strong> &mdash; by gathering everyone at a single controlled location, it is easier to prevent individuals from re-entering the building before the all-clear has been given</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Legal Basis:</strong> Article 15 of the RRFSO requires the Responsible Person to establish and, where necessary, implement procedures for serious and imminent danger. This includes nominating a sufficient number of competent persons to implement those procedures insofar as they relate to evacuation, and ensuring that persons are informed of arrangements. The designation and management of assembly points is a fundamental part of these procedures. Failure to establish adequate assembly point arrangements is a breach of Article 15 and may result in enforcement action by the fire and rescue authority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Selecting an Assembly Point                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">02</span>
              Selecting an Assembly Point
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The selection of an assembly point is a critical decision that must be made as part of the fire risk assessment. A poorly chosen assembly point can compromise the safety of evacuees, obstruct the fire service, or become untenable due to smoke or heat exposure. The following criteria must be considered:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Assembly Point Selection Criteria</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Safe Distance</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A minimum of <strong>15-20 metres</strong> from the building as a general rule. The specific distance depends on the building height, the fire risk assessment, and the potential for radiant heat or falling debris. Taller buildings or those storing flammable materials may require a greater distance. The assembly point must be far enough away that evacuees are not exposed to dangerous levels of heat radiation, which can cause burns at surprisingly long distances from a fully developed fire.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Away from Fire Service Access</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The assembly point must not obstruct the routes that fire appliances will use to access the building. Fire engines, aerial ladder platforms, and other appliances need clear access to fire hydrants, dry risers, and the building frontage. An assembly point that blocks these access routes could delay the fire service response and endanger both evacuees and firefighters.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Hard Standing Surface</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The assembly point should be on a hard-standing surface (tarmac, concrete, paving) rather than grass or bare earth, which can become muddy and impassable in wet weather. This is particularly important for wheelchair users and others with mobility impairments. The surface must be level and free from trip hazards.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Adequate Capacity</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The assembly point must be large enough to accommodate all occupants of the building without overcrowding. For very large buildings, multiple assembly points may be needed, with occupants from different floors or zones directed to specific assembly areas. The capacity calculation should account for peak occupancy plus visitors and contractors.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Not in the Smoke Path</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The assembly point should not be located downwind of the building where smoke is likely to accumulate. While wind direction is variable, the prevailing wind direction should be considered. An alternative assembly point should be designated for use when conditions make the primary assembly point untenable.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Signposted to BS ISO 7010</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The assembly point must be clearly identified with signage conforming to <strong>BS ISO 7010</strong> (reference E007). The green and white pictogram sign features a group of people with an arrow indicating the designated location. Signs must be positioned at the assembly point itself and along evacuation routes directing people towards it. The signs must be visible in all lighting conditions, including darkness (photoluminescent or illuminated).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Alternative Assembly Point</p>
                <p className="text-sm text-white/80">
                  Every premises should designate at least one <strong>alternative assembly point</strong> for use when the primary location is unsuitable &mdash; for example, due to wind direction carrying smoke across the primary assembly area, a fire affecting the route to the primary point, or construction works blocking access. The alternative assembly point must meet the same selection criteria as the primary point. All occupants must be informed of both the primary and alternative locations, and signage must be provided for both. The fire evacuation procedure should specify who has the authority to redirect evacuees to the alternative point and how this decision is communicated during an active evacuation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Assembly Point Management                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">03</span>
              Assembly Point Management
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An assembly point is only effective if it is properly managed during an evacuation. Without a designated person in charge and the right equipment, roll call cannot be conducted, information cannot be relayed to the fire service, and chaos can undermine the entire evacuation procedure. The following elements are essential:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Designated assembly point controller</strong> &mdash; a trained person (typically a senior fire marshal or a specifically appointed individual) who takes charge at the assembly point, oversees roll call, receives reports from fire marshals, and acts as the primary point of contact for the fire and rescue service. A deputy must also be designated in case the primary controller is absent, off-site, or incapacitated</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Equipment: clipboard and roll call list</strong> &mdash; a pre-prepared list of all persons expected to be in the building. This list must be <strong>updated daily</strong> (or per shift) to reflect staff absences, visitors, and contractors. The list should be stored in a known location (grab bag) near the exit used to reach the assembly point, so it can be collected quickly during an evacuation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>High-visibility vest or tabard</strong> &mdash; the assembly point controller and fire marshals should wear high-visibility vests or tabards clearly marked with their role (e.g., &ldquo;Fire Marshal&rdquo;, &ldquo;Assembly Point Controller&rdquo;). This makes them easily identifiable by evacuees, other marshals, and the fire service, especially in large crowds or low-visibility conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Radio or communication device</strong> &mdash; a two-way radio or mobile phone is essential for communication between the assembly point controller, fire marshals who may still be completing their sweep of the building, and the incident controller. Radio protocol should be agreed in advance, using clear, concise language and avoiding jargon</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Zone/Floor Segregation:</strong> For buildings with multiple floors or zones, the assembly point should be organised into clearly marked sections corresponding to the building zones. People from Floor 1 gather in the Floor 1 area, Floor 2 in the Floor 2 area, and so on. This dramatically speeds up the roll call process because each fire marshal can conduct their roll call within a defined area rather than searching through an unorganised crowd. Zone markers can be simple signs on posts, cones with labels, or designated areas marked on the ground.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Roll Call Procedures                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">04</span>
              Roll Call Procedures
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The roll call is the process by which the assembly point coordinator confirms that all persons known to be in the building have been accounted for at the assembly point. It is one of the most critical aspects of the emergency procedure, because the information gathered during roll call directly determines whether the fire and rescue service needs to conduct a search and rescue operation inside the burning building.
              </p>

              <p>
                <strong>Pre-prepared lists</strong> are the foundation of an effective roll call. These lists must be:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Updated daily</strong> &mdash; reflecting staff who are present, absent, on leave, working from home, or on different shifts. An outdated list will produce inaccurate results, potentially leading to unnecessary search and rescue operations or, worse, failing to identify a genuinely missing person</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Organised by zone or floor</strong> &mdash; so that each fire marshal has a list relevant to their area of responsibility, rather than a single list for the entire building</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Inclusive of visitors and contractors</strong> &mdash; the visitor sign-in record and contractor register must be incorporated into the roll call process</span>
                </li>
              </ul>

              <p className="font-medium text-white">Methods of Roll Call</p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <ClipboardList className="h-6 w-6 text-rose-400 mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">Name-Check Roll Call</p>
                  <p className="text-xs text-white/70">The fire marshal calls out each name on the list and marks off those who respond. Thorough but time-consuming for large groups. Most reliable for smaller teams.</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <UserCheck className="h-6 w-6 text-rose-400 mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">Badge Count Roll Call</p>
                  <p className="text-xs text-white/70">Staff present their ID badges which are checked against the list or scanned electronically. Faster than name-check and less prone to error in noisy conditions.</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <Shield className="h-6 w-6 text-rose-400 mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">Electronic Access Data</p>
                  <p className="text-xs text-white/70">Swipe-card or proximity-card systems generate a real-time list of who entered but has not exited. Cross-referenced with assembly point attendance. Requires power backup.</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <Users className="h-6 w-6 text-rose-400 mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">Headcount by Zone</p>
                  <p className="text-xs text-white/70">A quick headcount of each zone to verify numbers match expectations. Fastest method but does not identify specific missing individuals. Often used as an initial check.</p>
                </div>
              </div>

              <p>
                Each <strong>fire marshal reports their zone-clear status</strong> to the assembly point coordinator. The report should state clearly: &ldquo;Floor 3 &mdash; all accounted for&rdquo; or &ldquo;Floor 3 &mdash; two persons unaccounted for: [names]&rdquo;. Any <strong>missing persons must be reported immediately</strong> to the coordinator, who will relay this information to the fire and rescue service. The fire service will then prioritise a search of the relevant area.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Critical Rule:</strong> Under no circumstances should anyone re-enter the building to search for a missing person. This is the responsibility of the trained and equipped fire and rescue service. Re-entry by untrained persons has resulted in numerous deaths and is one of the most dangerous actions that can be taken during a fire emergency.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Accounting for Visitors & Contractors           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">05</span>
              Accounting for Visitors &amp; Contractors
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Visitors and contractors present a particular challenge for fire safety because they are typically unfamiliar with the building layout, the evacuation procedure, and the location of the assembly point. They may not know where the nearest exit is, may not recognise the fire alarm, and will not appear on the standard staff roll call list unless specific arrangements are in place.
              </p>

              <p>
                A <strong>visitor sign-in system</strong> is essential. This is not merely an administrative convenience &mdash; it is a fire safety requirement under Article 15 of the RRFSO, which mandates that procedures for serious and imminent danger must include arrangements for accounting for all persons present in the premises.
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Visitor sign-in must record:</strong> the visitor&rsquo;s name, company (if applicable), the person they are visiting (the host), the time of arrival, and a visitor badge or pass number. A visitor badge is also helpful for identification at the assembly point</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Host responsibility:</strong> the person being visited (the host) is responsible for their visitor&rsquo;s safety. The host should brief the visitor on the fire evacuation procedure, point out the nearest exit and the assembly point location, and accompany the visitor to the assembly point during an evacuation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Sign-out on departure:</strong> visitors must sign out when they leave. This is critical because a visitor who has left the building but not signed out will appear as a missing person during roll call, potentially triggering an unnecessary and dangerous search and rescue operation by the fire service</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Electronic visitor management systems</strong> &mdash; many modern buildings use electronic sign-in systems (tablets, kiosks) that automatically generate a real-time list of visitors currently on the premises. These systems can be integrated with the access control system and can generate visitor lists at the touch of a button for use at the assembly point</span>
                </li>
              </ul>

              <p>
                <strong>Contractor arrangements</strong> require additional planning:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Contractor permits and induction:</strong> all contractors should receive a fire safety induction before starting work, covering the fire alarm, evacuation routes, and assembly point. This should be documented as part of the permit-to-work system</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Contractor register:</strong> a separate register of all contractors on site, maintained by the facilities team or the contractor&rsquo;s supervisor. The register must be available at the assembly point for roll call purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Construction sites &mdash; contractor muster points:</strong> on construction sites, each principal contractor may have their own muster point. The overall site fire safety plan must coordinate these to ensure a complete roll call across all contractors. This is covered in more detail in Section 08</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Communication During Assembly                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">06</span>
              Communication During Assembly
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective communication during an emergency assembly is critical. The fire and rescue service needs accurate, consolidated information as quickly as possible to make operational decisions &mdash; particularly whether anyone is unaccounted for and may be trapped inside the building. A structured <strong>communication chain</strong> ensures information flows reliably and is not lost, duplicated, or contradicted.
              </p>

              <p>
                The communication chain operates as follows:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Megaphone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Communication Chain</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-white">Fire Marshals</p>
                    <p className="text-xs text-white/50">Report zone-clear status from each floor/zone</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-rose-500/30" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-white">Assembly Point Coordinator</p>
                    <p className="text-xs text-white/50">Compiles building-wide roll call status</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-rose-500/30" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-white">Senior Fire Marshal / Incident Controller</p>
                    <p className="text-xs text-white/50">Consolidates all information for fire service briefing</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-rose-500/30" />
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-center">
                    <Megaphone className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-rose-400">Fire &amp; Rescue Service</p>
                    <p className="text-xs text-white/50">Receives briefing and makes operational decisions</p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Radio protocol</strong> should be established in advance. Communications should be:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Clear and concise</strong> &mdash; use plain language, avoid jargon or abbreviations that may not be understood by all parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Structured</strong> &mdash; follow a standard format: identify yourself, state the zone/floor, state the status (all clear or unaccounted persons), then provide any additional information</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Confirmed</strong> &mdash; the receiving party should repeat back key information (especially the number of missing persons and their names) to avoid miscommunication</span>
                </li>
              </ul>

              <p>
                <strong>Information to pass to the fire and rescue service</strong> includes:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Numbers evacuated</strong> &mdash; total headcount at the assembly point, broken down by zone if possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Missing persons</strong> &mdash; names, last known locations, and any relevant details (e.g., mobility impairments, hearing impairments)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Fire location</strong> &mdash; the suspected location and nature of the fire, if known (e.g., &ldquo;fire in the kitchen on the second floor&rdquo;)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Hazardous substances</strong> &mdash; the presence and location of any hazardous materials, chemicals, compressed gases, or radioactive sources that the fire service needs to be aware of</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Disabled persons awaiting rescue</strong> &mdash; the names and locations of any persons who are waiting in a place of relative safety (refuge area) and require the fire service to assist with their evacuation</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Preventing Re-Entry                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">07</span>
              Preventing Re-Entry
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Preventing re-entry to the building is one of the most important safety controls during a fire evacuation. People may attempt to re-enter for a variety of reasons: to retrieve personal belongings (laptop, car keys, wallet), to search for a colleague or family member, to attempt to fight the fire themselves, or simply because they believe the alarm is false and the emergency is over. Every one of these reasons is insufficient justification for the potentially fatal risk of re-entering a building that may be on fire.
              </p>

              <p>
                Re-entry is not permitted until the <strong>all-clear</strong> has been given. The all-clear can only be issued by:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>The fire and rescue service</strong> &mdash; if they have attended the scene. The incident commander will confirm when the building is safe for re-occupation. Under the <strong>Fire and Rescue Services Act 2004</strong> (Section 44), the fire service has the legal authority to take charge of the scene, establish cordons, and prohibit entry to buildings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>The Responsible Person (RP)</strong> &mdash; if the fire service has not attended (for example, after a confirmed false alarm). The RP must be satisfied that there is no risk before authorising re-entry</span>
                </li>
              </ul>

              <p>
                <strong>Methods of preventing re-entry:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Physical barriers</strong> &mdash; fire doors with electromagnetic locks that engage when the alarm sounds, preventing the door from being opened from the outside. Barrier tape or cones may be deployed at entrances by fire marshals</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Fire marshals stationed at entrances</strong> &mdash; designated fire marshals should be positioned at all building entrances to physically prevent anyone from re-entering. This is one of the most effective methods because it provides a human presence who can explain why re-entry is prohibited and report any attempts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Clear communication</strong> &mdash; the assembly point coordinator should announce that the building is closed and re-entry is prohibited. This should be repeated periodically, especially if the evacuation is prolonged</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Fire and Rescue Services Act 2004 &mdash; Section 44:</strong> This section gives fire and rescue authority employees (firefighters) the power to do anything they reasonably believe to be necessary for the purpose of extinguishing fires, protecting life, or protecting property. This includes establishing cordons, closing roads, and prohibiting entry to buildings. Obstructing or impeding a firefighter exercising these powers is a criminal offence under Section 49 of the Act.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Construction Site Assembly Points               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">08</span>
              Construction Site Assembly Points
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites present unique challenges for assembly point management and roll call. The workforce changes daily, the site layout evolves continuously as construction progresses, and multiple contractors and sub-contractors may be working simultaneously with limited coordination between them. Fire safety on construction sites is governed by the RRFSO (which applies to all workplaces) and the Construction (Design and Management) Regulations 2015 (CDM 2015), which place specific duties on the principal contractor to manage fire safety across the site.
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Multi-contractor coordination</strong> &mdash; a large construction site may have dozens of contractors and sub-contractors, each with their own workers. The principal contractor is responsible for coordinating the fire safety arrangements across all contractors, including establishing a unified evacuation procedure and assembly point system</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Individual contractor roll calls</strong> &mdash; each contractor&rsquo;s site supervisor is responsible for maintaining a daily register of their workers on site and conducting a roll call of their own team at the assembly point. The results of each contractor&rsquo;s roll call are then reported to the principal contractor&rsquo;s site safety coordinator, who compiles the overall site status</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Site induction</strong> &mdash; every person entering the construction site for the first time must receive a fire safety induction covering the fire alarm type (which on construction sites may be a manually operated siren, air horn, or tannoy rather than a conventional fire alarm system), the evacuation routes (which change as the site develops), and the location of the assembly point(s)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Temporary signage</strong> &mdash; because the site layout changes frequently, evacuation route signage and assembly point signs must be regularly reviewed and repositioned. This is the responsibility of the principal contractor and should be included in the site fire safety plan. Temporary signs must still comply with BS ISO 7010 and be visible in all conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Multiple assembly points for large sites</strong> &mdash; large construction sites may require multiple assembly points, particularly where the site covers a large area or where different parts of the site have different access routes. Each assembly point must be clearly identified, adequately separated from the hazard area, and have a designated controller</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <HardHat className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Construction Site Fire Drills</p>
                    <p className="text-sm text-white/80">
                      Fire drills on construction sites should be conducted at least monthly during the early phases of construction and whenever significant changes to the site layout affect evacuation routes. All contractors must participate in the drill, and the results should be recorded by the principal contractor. Common issues identified during construction site fire drills include: blocked evacuation routes due to materials or equipment, assembly point locations that have become unsuitable due to site development, workers who did not hear the alarm due to noise from machinery, and contractors who were not informed of the drill and failed to evacuate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  ASSEMBLY POINT COMMUNICATION CHAIN DIAGRAM                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-rose-500/10 to-rose-400/5 border border-rose-500/20 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">Assembly Point Communication Chain</h2>
            <p className="text-xs text-white/50 text-center mb-6">How information flows from individual fire marshals to the fire and rescue service during an evacuation</p>

            <div className="max-w-md mx-auto space-y-0">
              {/* Row 1: Fire Marshals */}
              <div className="grid grid-cols-3 gap-2 mb-1">
                <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-3 text-center">
                  <Eye className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-white">MARSHAL</p>
                  <p className="text-[9px] text-white/50">Zone A</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-3 text-center">
                  <Eye className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-white">MARSHAL</p>
                  <p className="text-[9px] text-white/50">Zone B</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-3 text-center">
                  <Eye className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-white">MARSHAL</p>
                  <p className="text-[9px] text-white/50">Zone C</p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-px h-3 bg-rose-500/40" />
                  <div className="text-[9px] text-rose-400/70 px-2">zone-clear reports</div>
                  <div className="w-px h-3 bg-rose-500/40" />
                </div>
              </div>

              {/* Row 2: Coordinator */}
              <div className="flex justify-center mb-1">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-4 py-3 text-center w-full max-w-[200px]">
                  <ClipboardList className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-rose-400">COORDINATOR</p>
                  <p className="text-[10px] text-white/50">Compiles building status</p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-px h-3 bg-rose-500/40" />
                  <div className="text-[9px] text-rose-400/70 px-2">consolidated report</div>
                  <div className="w-px h-3 bg-rose-500/40" />
                </div>
              </div>

              {/* Row 3: Senior Marshal */}
              <div className="flex justify-center mb-1">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-4 py-3 text-center w-full max-w-[220px]">
                  <Shield className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-rose-400">SENIOR MARSHAL</p>
                  <p className="text-[10px] text-white/50">Incident controller &amp; liaison</p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-px h-3 bg-rose-500/40" />
                  <div className="text-[9px] text-rose-400/70 px-2">briefing on arrival</div>
                  <div className="w-px h-3 bg-rose-500/40" />
                </div>
              </div>

              {/* Row 4: Fire Service */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-rose-500/20 to-rose-400/10 border-2 border-rose-500/40 rounded-lg px-4 py-3 text-center w-full max-w-[240px]">
                  <Megaphone className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-rose-400">FIRE &amp; RESCUE SERVICE</p>
                  <p className="text-[10px] text-white/50">Operational decisions &amp; all-clear</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-3">
              <p className="text-xs text-white/60 text-center">
                <strong className="text-white/80">Information passed at each stage:</strong> numbers evacuated, missing persons (names &amp; last known locations), fire location, hazardous substances, disabled persons awaiting rescue
              </p>
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
          title="Section 3 Knowledge Check"
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
            <Link to="../fire-safety-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Evacuation Procedures
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-4-section-4">
              Personal Emergency Evacuation Plans
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
