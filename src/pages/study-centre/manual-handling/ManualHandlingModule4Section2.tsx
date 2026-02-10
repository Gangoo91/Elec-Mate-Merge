import {
  ArrowLeft,
  HardHat,
  CheckCircle,
  AlertTriangle,
  CloudRain,
  Footprints,
  Shield,
  Layers,
  Users,
  Truck,
  Construction,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-m4s2-uneven-ground",
    question:
      "When carrying a heavy load across uneven ground on a construction site, what is the single most important precaution?",
    options: [
      "Walk as fast as possible to minimise exposure time",
      "Assess the route first, clear obstacles, and take shorter steps to maintain balance",
      "Lean backwards to counterbalance the uneven terrain",
      "Close your eyes to improve your sense of balance",
    ],
    correctIndex: 1,
    explanation:
      "On uneven ground, the risk of tripping, slipping, or losing balance while carrying a load is significantly increased. The correct approach is to assess and clear the route before lifting, then walk with shorter steps to keep your centre of gravity over your feet. Rushing increases the risk, leaning backwards shifts your centre of gravity dangerously, and you must always watch where you are stepping.",
  },
  {
    id: "mh-m4s2-ppe-grip",
    question:
      "By how much can standard safety gloves reduce grip strength compared to bare hands?",
    options: [
      "They have no effect on grip strength",
      "5-10% reduction",
      "20-30% reduction",
      "60-70% reduction",
    ],
    correctIndex: 2,
    explanation:
      "Research shows that standard safety gloves reduce grip strength by approximately 20-30%. This is significant because a load that feels secure in bare hands may slip from gloved hands. When conducting risk assessments, this reduction must be factored in — the effective safe weight for gloved handling is lower than for bare-hand handling. Specialised grip-enhanced gloves can reduce this effect but do not eliminate it entirely.",
  },
  {
    id: "mh-m4s2-housekeeping",
    question:
      "Why is site tidiness (housekeeping) considered a manual handling control measure?",
    options: [
      "Because tidy sites look better in photographs for the client",
      "Because clear walkways and organised storage reduce trip hazards, allow safe carrying routes, and prevent obstructions that force awkward postures",
      "Because the HSE only inspects tidy sites",
      "Because mess attracts vermin that may bite workers",
    ],
    correctIndex: 1,
    explanation:
      "Good housekeeping directly reduces manual handling risk. Clear walkways allow workers to carry loads along the safest route without deviation. Organised storage means items are at accessible heights rather than on the floor or above head height. Removing trip hazards (offcuts, trailing cables, packaging) prevents falls while carrying. A cluttered site forces workers into awkward postures as they navigate around obstructions whilst carrying loads.",
  },
];

const faqs = [
  {
    question:
      "Can I refuse to carry out a manual handling task if the weather is making it dangerous?",
    answer:
      "Yes. Under Section 7 of the Health and Safety at Work etc. Act 1974, you have a duty to take reasonable care of your own safety. If weather conditions (wet surfaces, high wind, ice, extreme cold) make a manual handling task unsafe, you should stop and report it to your supervisor. The Manual Handling Operations Regulations 1992 require the employer to assess the working environment as part of the risk assessment, and weather is a key environmental factor. Your employer should have contingency plans for adverse weather, including postponing tasks or providing additional controls.",
  },
  {
    question:
      "How should manual handling be managed when multiple trades are working in the same area?",
    answer:
      "Site congestion is a common manual handling hazard on construction sites. The principal contractor should coordinate work sequences so that trades are not competing for the same space at the same time. When this is unavoidable, additional controls include designated carrying routes, one-way traffic systems in corridors, agreed material storage zones for each trade, and clear communication between teams about heavy or awkward lifts. If you need to carry a long or heavy load through an area where others are working, warn them verbally before you start moving.",
  },
  {
    question:
      "What adaptations should be made for manual handling on scaffold platforms?",
    answer:
      "Scaffold platforms have limited space, board gaps, and no room to manoeuvre if something goes wrong. Materials should be lifted to scaffold level using a gin wheel (pulley), hoist, or crane — not carried up ladders. Once on the platform, loads should be kept small and manageable. Never stack materials so high that they obstruct guard rails or create a topple hazard. Keep the platform clear of unnecessary items so there is always a safe walking route. Two-person lifts on scaffold require extra coordination because the working space is narrow.",
  },
  {
    question:
      "How does cold weather affect manual handling beyond making surfaces slippery?",
    answer:
      "Cold weather has several effects on manual handling beyond the obvious slip risk. Cold reduces blood flow to the fingers and hands, impairing dexterity and grip strength — workers struggle to maintain a secure hold on loads. Cold muscles are stiffer and more prone to strain; the body's normal warm-up process takes longer in cold conditions. Cold also impairs concentration and reaction time, meaning workers may be slower to react to a shifting load. Wearing additional layers for warmth adds bulk, which can restrict movement and make it harder to keep loads close to the body. Adequate warm-up, frequent breaks in a heated space, and thermal gloves are key controls.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the primary manual handling risk when working on uneven ground?",
    options: [
      "The load becomes heavier on uneven ground",
      "Loss of balance and stability, leading to trips, falls, or uncontrolled load release",
      "The ground absorbs the weight of the load, making it lighter",
      "Uneven ground causes the load to change colour",
    ],
    correctAnswer: 1,
    explanation:
      "Uneven ground destabilises the person carrying the load. Stepping onto a higher or lower surface unexpectedly shifts the centre of gravity, potentially causing a stumble or fall. If the person falls while holding a load, the risk of musculoskeletal injury is compounded by the weight of the load landing on or being thrown by the body.",
  },
  {
    id: 2,
    question:
      "Why does wearing a hard hat create a manual handling risk when lifting above shoulder height?",
    options: [
      "Hard hats are extremely heavy and add to the load",
      "The brim of a hard hat restricts upward vision, making it harder to see overhead obstructions and the placement point",
      "Hard hats reflect sunlight into the eyes",
      "Hard hats are not required on construction sites",
    ],
    correctAnswer: 1,
    explanation:
      "The brim of a hard hat restricts the wearer's ability to look directly upward. When lifting items above shoulder height or positioning materials overhead (such as mounting cable tray to a ceiling), this restricted vision makes it harder to see where the item is going, increasing the risk of misplacement, dropped loads, or striking overhead hazards. Workers may compensate by tilting their head back excessively, which strains the neck.",
  },
  {
    id: 3,
    question:
      "At what wind speed should you consider stopping manual handling of large, flat items outdoors?",
    options: [
      "Any wind above Beaufort Force 1 (light air)",
      "Beaufort Force 4 (moderate breeze, 13-18 mph) for large sheet materials",
      "Beaufort Force 7 (near gale, 32-38 mph) for all items",
      "Wind has no effect on manual handling",
    ],
    correctAnswer: 1,
    explanation:
      "Large, flat items such as plasterboard sheets, plywood panels, or metal cladding act as sails in the wind. At Beaufort Force 4 (moderate breeze, 13-18 mph), these items can catch the wind and become uncontrollable, pulling the handler off balance or ripping the item from their grip. The wind force on a 2.4 m x 1.2 m sheet in a moderate breeze can exceed the handler's grip strength, creating a serious risk.",
  },
  {
    id: 4,
    question:
      "How do safety boots affect manual handling?",
    options: [
      "Safety boots make manual handling easier because they are heavier",
      "Safety boots have reinforced toe caps that improve kicking power",
      "Safety boots have stiffer soles and ankle supports that reduce ankle flexibility, affecting balance and making it harder to adopt correct lifting postures",
      "Safety boots have no effect on manual handling",
    ],
    correctAnswer: 2,
    explanation:
      "Safety boots are designed to protect the feet from impact and compression, but the rigid soles and ankle reinforcement reduce the natural flexibility of the foot and ankle. This makes it harder to achieve a deep squat lifting position, affects balance on uneven surfaces, and can cause the wearer to compensate with poor back posture. Workers should practise correct lifting technique while wearing their site boots, not just in training shoes.",
  },
  {
    id: 5,
    question:
      "What is the purpose of delivery coordination as a manual handling control?",
    options: [
      "To ensure materials arrive in the correct colour",
      "To minimise the distance materials need to be carried by arranging delivery as close to the point of use as possible",
      "To ensure the delivery driver receives a tip",
      "To make the site manager's schedule look organised",
    ],
    correctAnswer: 1,
    explanation:
      "Delivery coordination is a key manual handling control. By arranging for materials to be delivered as close to the point of use as possible (e.g., to the correct floor, room, or work area), the distance they need to be carried manually is minimised. This reduces cumulative handling, exposure to carrying routes with hazards, and the overall physical demand on workers. It requires planning with the supplier, the site logistics team, and the receiving trade.",
  },
  {
    id: 6,
    question:
      "What is the main hazard of manual handling in areas congested with other trades?",
    options: [
      "Other trades may criticise your lifting technique",
      "Limited space forces awkward postures, blocked routes, and risk of collision between workers carrying loads",
      "Other trades use louder tools that affect concentration only",
      "Congestion makes the site warmer due to body heat",
    ],
    correctAnswer: 1,
    explanation:
      "Site congestion means less space for the handler to adopt a correct posture, restricted carrying routes that force detours or awkward sideways movement, and the risk of collision with other workers or their materials. A person carrying a 3-metre cable tray through a corridor where plumbers are working on pipework has very little margin for error. Coordination, clear routes, and communication are essential.",
  },
  {
    id: 7,
    question:
      "Why should materials not be carried up scaffold ladders?",
    options: [
      "Because scaffolds are only for painting work",
      "Because climbing a ladder requires both hands for three-point contact, making it impossible to safely carry a load at the same time",
      "Because scaffold ladders are too narrow for materials",
      "Because scaffold ladders face the wrong direction",
    ],
    correctAnswer: 1,
    explanation:
      "Safe ladder use requires three points of contact at all times (two hands and one foot, or two feet and one hand). Carrying a load up a ladder means sacrificing one or more contact points, which dramatically increases the risk of falling. Materials should be lifted to scaffold level using a gin wheel (pulley), material hoist, or crane, and the worker should climb the ladder with hands free.",
  },
  {
    id: 8,
    question:
      "What is the most effective housekeeping measure for reducing manual handling risk on site?",
    options: [
      "Painting all floors a bright colour",
      "Keeping walkways clear of obstructions, removing waste immediately, and storing materials at accessible heights in designated areas",
      "Hiring a cleaning company to visit once a week",
      "Covering all surfaces with non-slip mats",
    ],
    correctAnswer: 1,
    explanation:
      "Continuous housekeeping — keeping walkways clear, removing waste as it is generated, and storing materials at accessible heights in designated zones — is the most effective single control for manual handling risk on construction sites. It removes trip hazards, provides clear carrying routes, and ensures materials can be accessed without bending to the floor or reaching above head height.",
  },
];

export default function ManualHandlingModule4Section2() {
  useSEO({
    title:
      "Working in Construction Environments | Manual Handling Module 4.2",
    description:
      "Manual handling risks on construction sites including uneven ground, PPE constraints, weather effects, scaffold platforms, site congestion, and delivery coordination.",
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
            <Link to="../manual-handling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <HardHat className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Working in Construction Environments
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Site-specific manual handling risks including uneven ground, PPE
            constraints, weather effects, scaffold platforms, congestion, and
            delivery coordination
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Ground:</strong> uneven terrain doubles trip risk when
                  loaded
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>PPE:</strong> gloves cut grip strength 20&ndash;30%
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Weather:</strong> wet, cold, and wind all increase
                  handling risk
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Before:</strong> walk the route, check conditions,
                  plan delivery
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>During:</strong> shorter steps, clear routes, team
                  coordination
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Always:</strong> housekeeping is a handling control
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Identify how uneven ground and slopes affect stability during manual handling",
              "Explain the impact of PPE on grip strength, vision, and flexibility",
              "Describe how weather conditions change manual handling risk profiles",
              "Apply control measures for handling on scaffold platforms",
              "Recognise the role of housekeeping in reducing manual handling hazards",
              "Plan delivery coordination to minimise on-site carrying distances",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Uneven Ground and Slopes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            Uneven Ground &amp; Slopes
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites rarely have smooth, level floors. Excavations,
                backfilled trenches, loose rubble, temporary ramps, and unpaved
                areas create surfaces that are fundamentally different from the
                flat floors assumed in standard manual handling training. When
                carrying a load across uneven ground, the risk of tripping or
                losing balance is <strong>significantly increased</strong>{" "}
                because the body must constantly adjust posture to maintain
                stability.
              </p>

              <p>
                On a flat surface, a person carrying a load can predict where
                each step will land. On uneven ground, each step is slightly
                different &mdash; higher, lower, softer, or angled. This
                constant adjustment engages core muscles that are already under
                load from carrying, accelerating fatigue. If the foot lands
                unexpectedly on an uneven surface, the resulting jolt is
                transmitted through the spine while it is already loaded,
                increasing the risk of disc injury.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong>{" "}
                  Always walk the carrying route before lifting the load.
                  Identify trip hazards, soft spots, and level changes. Clear or
                  mark obstacles. On slopes, always carry the load uphill rather
                  than downhill where possible &mdash; walking downhill with a
                  load puts significantly more strain on the knees and increases
                  the risk of losing control. If the load must go downhill, take
                  very short steps and consider using a trolley or chute.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Uneven Ground Controls
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Assess the route before every carry &mdash; conditions
                      change daily on construction sites
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use temporary walkways, boards, or compacted stone paths
                      for regular carrying routes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Reduce load weight on uneven ground &mdash; the safe
                      weight is lower than on flat floors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Take shorter steps to keep your centre of gravity over
                      your feet at all times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use wheeled equipment (sack trucks, trolleys) on firm
                      ground but not on loose or very soft surfaces
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Site Congestion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Site Congestion
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On busy construction sites, multiple trades often work in the
                same area simultaneously. Plumbers, plasterers, carpenters, and
                electricians may all need access to the same corridor, room, or
                ceiling void. This congestion creates manual handling risks
                that do not exist when working alone: <strong>blocked
                routes</strong>, <strong>restricted space</strong> for
                adopting correct postures, <strong>collision risk</strong>{" "}
                between workers carrying loads, and <strong>unexpected
                obstructions</strong> from other trades&rsquo; materials and
                equipment.
              </p>

              <p>
                The most dangerous scenario is when two workers carrying loads
                meet in a narrow corridor with no room to pass. Neither can
                easily put their load down, and both are under strain. The
                result is often an awkward sideways shuffle past each other,
                with loads at arm&rsquo;s length in poor posture. This is
                entirely preventable with simple traffic management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Congestion Control Measures
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Designated carrying routes marked with signage or tape
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      One-way traffic systems in narrow corridors during
                      material delivery periods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Time-slot material deliveries so trades are not competing
                      for the same space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Verbal warnings before moving long or heavy loads through
                      occupied areas
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Weather Effects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Weather Effects
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Weather is a constantly changing environmental factor that
                directly affects every aspect of manual handling on construction
                sites. Unlike indoor work, outdoor and partially enclosed
                construction environments expose workers to conditions that can
                transform a routine handling task into a high-risk operation
                within minutes.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CloudRain className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Weather Risk Factors
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="font-medium text-white mb-1">
                      Wet Conditions
                    </p>
                    <p>
                      Rain makes surfaces slippery &mdash; concrete, steel
                      plates, scaffold boards, and ramps all become significantly
                      more hazardous. Wet loads are harder to grip. Wet cardboard
                      packaging weakens and can fail, causing the contents to
                      drop. Visibility is reduced through safety glasses. Wet
                      clothing adds weight and restricts movement. Standing water
                      on platforms creates a hydroplaning effect under foot.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="font-medium text-white mb-1">
                      Cold Conditions
                    </p>
                    <p>
                      Cold reduces grip strength by restricting blood flow to the
                      hands and fingers. Reduced dexterity makes it harder to
                      secure a firm hold on loads. Cold muscles are stiffer, less
                      flexible, and more prone to strain &mdash; the risk of a
                      muscle pull is higher in the first hour of a cold morning
                      shift. Cold metal and plastic surfaces draw heat from the
                      hands rapidly, causing the grip to weaken further.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="font-medium text-white mb-1">
                      Wind
                    </p>
                    <p>
                      Wind affects the stability of both the worker and the load.
                      Large flat items (plasterboard, plywood, sheet metal) act
                      as sails and can be ripped from the handler&rsquo;s grip
                      or push the handler off balance. Even smaller items can be
                      affected in strong gusts. At{" "}
                      <strong>Beaufort Force 4 (13&ndash;18 mph)</strong>, large
                      sheet handling should be reviewed. At{" "}
                      <strong>Force 5 (19&ndash;24 mph)</strong>, most outdoor
                      manual handling of oversized items should stop.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Weather assessment must be part of the daily site start-up
                procedure. Check the forecast, observe current conditions, and
                set trigger points for reviewing or stopping manual handling
                activities. Conditions can change rapidly &mdash; a dry morning
                can become a wet afternoon, and a calm start can give way to
                gusty winds by midday.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: PPE Constraints */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            PPE Constraints
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Personal protective equipment (PPE) is essential on construction
                sites, but it creates secondary effects that impact manual
                handling capability. PPE is designed to protect against specific
                hazards (impact, cuts, eye injuries), but it also{" "}
                <strong>restricts movement, reduces sensitivity, and limits
                vision</strong>. These effects must be factored into manual
                handling risk assessments.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    PPE Effects on Handling
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">
                      Gloves (20&ndash;30% grip reduction):
                    </strong>{" "}
                    Standard rigger gloves and cut-resistant gloves reduce grip
                    strength by 20&ndash;30% compared to bare hands. They also
                    reduce tactile feedback &mdash; the ability to feel whether
                    a load is slipping. This means loads that feel secure may be
                    closer to the slip threshold than the handler realises.
                    Grip-enhanced gloves with textured palms reduce but do not
                    eliminate this effect.
                  </p>
                  <p>
                    <strong className="text-white">
                      Hard hats (limited upward vision):
                    </strong>{" "}
                    The brim and peak of a hard hat restrict the field of vision,
                    particularly when looking upward. When lifting items above
                    shoulder height, mounting cable tray to a ceiling, or
                    positioning items on high shelves, the handler cannot see the
                    target clearly without tilting the head back uncomfortably.
                    This neck hyperextension while lifting is a compounding risk.
                  </p>
                  <p>
                    <strong className="text-white">
                      Safety boots (reduced ankle flexibility):
                    </strong>{" "}
                    Safety boots with rigid soles and ankle reinforcement reduce
                    the natural range of motion in the ankle and foot. This makes
                    it harder to achieve a proper squat lifting position and
                    reduces balance on uneven surfaces. The added weight of steel
                    toe caps (approximately 200&ndash;400 g per boot) also
                    increases energy expenditure over a full working day.
                  </p>
                  <p>
                    <strong className="text-white">
                      Hi-vis clothing (heat retention):
                    </strong>{" "}
                    In warm weather, hi-vis jackets and vests add a layer of
                    insulation that increases the rate of heat build-up and
                    sweating. Excessive sweating reduces grip on smooth surfaces
                    and accelerates fatigue. In hot conditions, additional rest
                    breaks and hydration are needed to compensate.
                  </p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Never remove PPE to make a manual handling task easier. The
                  correct response is to adjust the task (reduce the weight,
                  use mechanical aids, or change the method) rather than
                  removing protection. Removing gloves to get a better grip
                  exposes the hands to cuts, abrasions, and chemical contact.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Scaffold Platforms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Scaffold Platforms
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffold platforms present a unique combination of manual
                handling challenges: <strong>limited space</strong>,{" "}
                <strong>potential board gaps</strong>,{" "}
                <strong>height exposure</strong>, and{" "}
                <strong>restricted access for materials</strong>. Working on
                a scaffold platform means handling materials in an environment
                that is fundamentally more constrained and hazardous than
                ground level.
              </p>

              <p>
                Materials should be lifted to scaffold level using mechanical
                means &mdash; a gin wheel (pulley), material hoist, or crane.
                Workers must <strong>never carry loads up scaffold
                ladders</strong> because safe ladder use requires three points
                of contact. A worker carrying a load on a ladder has, at best,
                two points of contact, and the load shifts their centre of
                gravity away from the ladder, dramatically increasing fall risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Scaffold Platform Handling Rules
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Lift materials to platform level mechanically, not by
                      carrying up ladders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Keep loads small and manageable on platforms &mdash;
                      there is no room to recover from a fumble
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Never stack materials above guard rail height &mdash;
                      they can topple over the edge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Maintain a clear walkway on the platform at all times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Check board condition &mdash; warped, cracked, or wet
                      boards are a slip and trip hazard
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Temporary Structures and Site Tidiness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Site Tidiness &amp; Housekeeping
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Housekeeping is not just about appearance &mdash; it is a{" "}
                <strong>primary manual handling control measure</strong>. A
                tidy site with clear walkways, organised storage, and prompt
                waste removal directly reduces the risk of trips, slips, and
                falls during manual handling operations. Conversely, a
                cluttered site forces workers to step over obstacles, squeeze
                through gaps, and adopt awkward postures to navigate around
                obstructions while carrying loads.
              </p>

              <p>
                The HSE identifies poor housekeeping as a contributing factor
                in a significant proportion of manual handling incidents on
                construction sites. Common culprits include offcuts of cable
                and conduit on the floor, trailing temporary power leads,
                packaging materials left in walkways, tools and equipment
                stored at ankle-trip height, and materials leaning against
                walls where they can slide and fall.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong>{" "}
                  Housekeeping is everyone&rsquo;s responsibility, not just the
                  labourer&rsquo;s. The CDM Regulations 2015 require the
                  principal contractor to maintain a tidy and safe site, but
                  every worker has a duty to clean up after their own work and
                  to report hazards they cannot address themselves. A 30-second
                  tidy-up after each task prevents a trip hazard for the next
                  person carrying a load through the area.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Delivery Coordination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            Delivery Coordination
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most effective but often overlooked manual handling
                controls is <strong>delivery coordination</strong> &mdash;
                planning where materials are delivered to minimise the distance
                and difficulty of on-site handling. The principle is simple:
                every metre a load needs to be carried manually is a metre of
                manual handling risk. Reducing the carrying distance reduces
                the exposure.
              </p>

              <p>
                Effective delivery coordination involves working with the
                supplier to arrange delivery to the closest practical point to
                the point of use. On multi-storey buildings, this may mean
                arranging crane lifts to specific floors, using goods lifts,
                or timing deliveries to coincide with periods when the hoist is
                available. It also means arranging for materials to arrive in
                manageable quantities rather than bulk drops that then require
                redistribution across the site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Delivery Coordination Checklist
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Identify the point of use before ordering materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Arrange delivery to the nearest accessible point (floor,
                      room, or zone)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Order in quantities that match the capacity to store and
                      handle safely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Coordinate with other trades so deliveries do not all
                      arrive simultaneously
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Confirm access routes, lifting equipment availability,
                      and storage areas before the delivery date
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Construction Site MH Risk Map */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Construction Site MH Risk Map
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following diagram illustrates the typical manual handling
                risk zones found on a construction site. Each zone presents
                different hazards that must be assessed and controlled.
              </p>

              {/* Styled-div diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Construction className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                      Construction Site MH Risk Map
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Delivery Zone */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="h-5 w-5 text-blue-400" />
                      <p className="text-sm font-semibold text-blue-400">
                        Delivery &amp; Unloading Zone
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Vehicle reversing &mdash; pedestrian exclusion zone
                          needed
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Tailgate height &mdash; loads above shoulder when
                          unloading
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Congestion from multiple deliveries at peak times
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Storage Zone */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="h-5 w-5 text-amber-400" />
                      <p className="text-sm font-semibold text-amber-400">
                        Material Storage Zone
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Stacking height &mdash; items above head height
                          require steps
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Floor-level storage &mdash; bending/stooping to
                          retrieve items
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Weather exposure &mdash; uncovered storage makes items
                          wet/icy
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Transit Routes */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Footprints className="h-5 w-5 text-red-400" />
                      <p className="text-sm font-semibold text-red-400">
                        Carrying Routes &amp; Corridors
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Uneven ground, temporary ramps, and loose debris
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Narrow doorways requiring load rotation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Stairs &mdash; no lift available during build phase
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Work Area */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">
                        Active Work Area
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Multiple trades in same space &mdash; congestion
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Scaffold and MEWP platforms &mdash; restricted space
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Overhead work &mdash; materials at height, above
                          shoulder handling
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-xs text-white/60 leading-relaxed">
                    <strong className="text-emerald-400">Planning Tip:</strong>{" "}
                    Walk the full route from delivery point to final work
                    position before any materials arrive. Identify every risk
                    zone, clear or control the hazards, and brief the team on
                    the planned route and the controls at each stage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-[#1a1a1a] hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-4-section-3">
              Next: Confined &amp; Restricted Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
