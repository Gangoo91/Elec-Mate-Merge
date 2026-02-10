import {
  ArrowLeft,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Truck,
  Box,
  Cable,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-sack-truck-use",
    question:
      "What is the main advantage of using a stair-climbing sack truck over a standard sack truck?",
    options: [
      "It can carry heavier loads on flat ground",
      "It has a built-in mechanism (rotating wheels or tracks) that allows loads to be moved up and down stairs",
      "It is lighter and easier to store",
      "It eliminates the need for a risk assessment",
    ],
    correctIndex: 1,
    explanation:
      "Stair-climbing sack trucks have a tri-wheel or tracked mechanism specifically designed to allow loads to be moved up and down stairs. This eliminates the need to manually lift heavy items between floors, significantly reducing the risk of back injury on stairways. A risk assessment is still required even when using mechanical aids.",
  },
  {
    id: "mh-vacuum-lifter",
    question:
      "For which type of load are vacuum lifters specifically designed?",
    options: [
      "Cable drums and reels",
      "Bags of sand and cement",
      "Glass panels, sheet materials, and smooth flat surfaces",
      "Lengths of conduit and trunking",
    ],
    correctIndex: 2,
    explanation:
      "Vacuum lifters use suction cups to grip smooth, flat, non-porous surfaces. They are specifically designed for glass panels, sheet metal, plasterboard, composite panels, and similar materials. They are not suitable for porous, rough, or irregular surfaces where a seal cannot be formed.",
  },
  {
    id: "mh-equipment-inspection",
    question:
      "How often should mechanical handling aids be inspected for damage and defects?",
    options: [
      "Only when they break down",
      "Once a year during the annual service",
      "Before each use (pre-use check) and at regular planned intervals",
      "Only when the manufacturer recommends it",
    ],
    correctIndex: 2,
    explanation:
      "Mechanical handling aids should receive a pre-use visual check before each use (looking for obvious damage, wear, or defects) AND regular planned inspections at intervals determined by the risk assessment, manufacturer's guidance, and patterns of use. This two-tier approach catches both sudden damage and gradual deterioration.",
  },
];

const faqs = [
  {
    question:
      "Why do workers sometimes avoid using mechanical aids even when they are available?",
    answer:
      "There are several common reasons: the equipment takes too long to fetch or set up compared to 'just carrying it'; the equipment does not fit the actual working conditions (too wide for doorways, too tall for low ceilings, wheels not suitable for the floor surface); the equipment is poorly maintained and difficult to use (stiff wheels, broken handles, flat tyres); workers feel pressure to work quickly and see the equipment as slowing them down; storage locations are inconvenient (aids stored far from where they are needed); lack of training on how to use the equipment properly; and a workplace culture where using aids is seen as 'soft' or unnecessary. All of these barriers must be addressed for mechanical aids to be used consistently.",
  },
  {
    question:
      "Do I need training to use a manual pallet truck?",
    answer:
      "While manual (pump-action) pallet trucks do not require a formal licence or certificate in the way that powered forklift trucks do, training IS required. Under the Manual Handling Operations Regulations 1992 and the Provision and Use of Work Equipment Regulations 1998, employers must ensure workers are trained in the correct use of any equipment they are required to use. For manual pallet trucks, training should cover: pre-use checks, correct operation of the pump handle and release valve, safe loading limits and load positioning, manoeuvring (especially on slopes and around corners), parking and storage, and what to do if the truck is damaged or malfunctions.",
  },
  {
    question:
      "Can I use a cable drum jack on any size of cable drum?",
    answer:
      "No. Cable drum jacks and stands have specific weight and drum size ratings. You must check the safe working load (SWL) of the jack and ensure it is rated for the weight of the cable drum you intend to lift. You should also check that the spindle diameter and drum width are compatible with the jack. Using an undersized jack risks equipment failure, which could cause the drum to fall -- potentially causing serious injury. Always check the manufacturer's rating plate and the weight of the cable drum (usually marked on the drum or available from the cable datasheet) before use.",
  },
  {
    question:
      "What is the difference between a cable winch and a cable capstan?",
    answer:
      "Both are used for pulling cable, but they work differently. A cable winch wraps the pulling rope or wire around a drum, storing the rope on the drum as it pulls. The pulling length is limited by the drum capacity. A cable capstan uses a rotating bollard around which the pulling rope is wrapped several turns -- the friction between the rope and the bollard provides the pulling force, but the rope feeds through continuously rather than being stored. Capstans are better suited to long cable pulls where a winch drum would run out of capacity. Both require proper training, secure anchoring, and appropriate rope/wire selection for the pulling force involved.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which type of trolley is most suitable for moving tall, stacked loads such as multiple boxes of accessories?",
    options: [
      "A platform trolley with no sides",
      "A cage trolley with mesh sides",
      "A sack truck",
      "A stair-climbing trolley",
    ],
    correctAnswer: 1,
    explanation:
      "A cage trolley with mesh sides prevents stacked loads from falling off during transport. A platform trolley with no sides would allow stacked items to topple. A sack truck is designed for single items leaned against the back plate. A stair-climbing trolley is designed for stairs, not general transport of stacked loads.",
  },
  {
    id: 2,
    question:
      "What is the primary advantage of a powered pallet truck over a manual hydraulic pallet truck?",
    options: [
      "It is lighter and more portable",
      "It provides powered drive and lifting, eliminating the physical effort of pumping and pushing/pulling heavy pallets",
      "It does not require any training to operate",
      "It can fit through narrower spaces",
    ],
    correctAnswer: 1,
    explanation:
      "Powered pallet trucks provide electric drive (moving the pallet) and electric lifting (raising the forks), eliminating the physical effort of hand-pumping and pushing/pulling. This significantly reduces the manual handling risk, especially with heavy pallets or long transport distances. Training is still required, and powered trucks are typically larger than manual ones.",
  },
  {
    id: 3,
    question:
      "When selecting a mechanical aid for a particular task, which of the following is the MOST important consideration?",
    options: [
      "The colour and appearance of the equipment",
      "Whether the aid matches the actual working conditions (load type, weight, route, space, floor surface)",
      "Whether it is the cheapest option available",
      "Whether it was manufactured in the UK",
    ],
    correctAnswer: 1,
    explanation:
      "The most important consideration when selecting a mechanical aid is whether it actually matches the real working conditions. This includes the type and weight of load, the route (stairs, slopes, tight corners, door widths), the available space, the floor surface, and the frequency of use. An aid that does not suit the actual conditions will not be used by workers.",
  },
  {
    id: 4,
    question:
      "Which piece of equipment would you use to dispense cable from a large drum while pulling it through a building?",
    options: [
      "A sack truck",
      "A cable drum jack or stand with a free-spinning spindle",
      "A platform trolley",
      "An overhead hoist",
    ],
    correctAnswer: 1,
    explanation:
      "A cable drum jack or stand lifts the drum off the ground and supports it on a spindle that allows the drum to rotate freely. This enables cable to be pulled off the drum smoothly without the drum rolling away or the cable tangling. It is the standard equipment for dispensing cable on site.",
  },
  {
    id: 5,
    question:
      "An overhead hoist is typically used in which type of electrical installation scenario?",
    options: [
      "Moving cable drums from a delivery vehicle to a storage area",
      "Lifting heavy transformers, switchgear, or generators into position in plant rooms or substations",
      "Carrying hand tools between floors",
      "Moving lightweight cable trays along a corridor",
    ],
    correctAnswer: 1,
    explanation:
      "Overhead hoists (including chain blocks, electric hoists, and crane systems) are used for lifting heavy items vertically -- particularly transformers, switchgear, generators, and other heavy plant equipment that must be positioned precisely in plant rooms and substations. These items are far too heavy for manual handling.",
  },
  {
    id: 6,
    question:
      "What type of conveyor works by gravity alone, without any power source?",
    options: [
      "Belt conveyor",
      "Powered roller conveyor",
      "Gravity roller conveyor",
      "Chain conveyor",
    ],
    correctAnswer: 2,
    explanation:
      "A gravity roller conveyor uses freely rotating rollers on a slight downward slope. The load moves along the conveyor under the force of gravity alone, with no motor or power source required. These are useful for moving materials along a level or slightly sloped route, such as from a delivery vehicle to a storage area.",
  },
  {
    id: 7,
    question:
      "Before using any mechanical handling aid, you should always:",
    options: [
      "Paint it in a high-visibility colour",
      "Carry out a pre-use visual inspection to check for damage, wear, and correct function",
      "Weigh it to check it has not become heavier",
      "Test it by lifting a load heavier than the rated capacity",
    ],
    correctAnswer: 1,
    explanation:
      "A pre-use visual inspection should be carried out every time before using a mechanical handling aid. Check for visible damage, worn or flat tyres, stiff or damaged wheels, cracks or bends in the frame, correct operation of lifting mechanisms and brakes, and any missing or illegible capacity labels. Never use equipment that shows signs of damage or defect.",
  },
  {
    id: 8,
    question:
      "A spring-loaded cable reel dispenser is beneficial because:",
    options: [
      "It automatically cuts the cable to the correct length",
      "It holds the cable reel at a comfortable working height and provides controlled dispensing with tension",
      "It replaces the need for cable drum jacks entirely",
      "It can only be used outdoors",
    ],
    correctAnswer: 1,
    explanation:
      "Spring-loaded cable reel dispensers hold smaller cable reels at a comfortable working height and provide controlled tension during dispensing. This prevents cable from uncoiling too quickly (creating tangles and trip hazards) and holds the reel at a height that avoids stooping. They are suitable for smaller reels used in second-fix and containment work.",
  },
];

export default function ManualHandlingModule3Section3() {
  useSEO({
    title:
      "Mechanical Aids & Equipment | Manual Handling Module 3.3",
    description:
      "Sack trucks, trolleys, pallet trucks, hoists, conveyors, vacuum lifters, cable drum jacks, winches, and equipment selection for reducing manual handling risk in electrical work.",
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
            <Link to="../manual-handling-module-3">
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
            <Wrench className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mechanical Aids &amp; Equipment
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            A practical guide to mechanical handling aids available for
            electrical work &mdash; from sack trucks and trolleys to hoists,
            cable drum jacks, and powered pulling equipment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Trolleys:</strong> platform, cage, sack trucks,
                  stair-climbing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Pallet trucks:</strong> manual hydraulic and powered
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Hoists/cranes:</strong> overhead, mobile, chain blocks
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Cable-specific:</strong> drum jacks, winches, capstans,
                  reel dispensers
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              Key Principles
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Match:</strong> the aid to the actual task and
                  conditions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Inspect:</strong> before every use and at regular
                  planned intervals
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Train:</strong> all workers in correct use of each aid
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Maintain:</strong> regular servicing and prompt repair
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
              "Identify the main types of trolleys and sack trucks and their appropriate applications",
              "Describe the difference between manual and powered pallet trucks",
              "Explain when hoists, cranes, and chain blocks are required",
              "List mechanical aids specific to cable installation (drum jacks, winches, capstans)",
              "State the key principles for selecting the correct mechanical aid for a task",
              "Describe the inspection and maintenance requirements for mechanical handling equipment",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Sack Trucks and Trolleys */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            <Truck className="h-5 w-5 text-emerald-400" />
            Sack Trucks and Trolleys
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Trolleys and sack trucks are the most commonly used mechanical
                aids on electrical installation sites. They are relatively
                inexpensive, versatile, and can dramatically reduce the physical
                effort of moving materials across a site.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Platform Trolleys
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Flat platform on four wheels with a handle for pushing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Suitable for boxes, cable reels, toolboxes, and mixed loads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Typical capacity: 150&ndash;500 kg depending on model</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Best on smooth, level floors &mdash; poor on rough ground or steps</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Cage Trolleys
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Platform trolley with mesh or solid sides to contain loads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Prevents stacked items from falling during transport</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Ideal for multiple boxes of accessories, switches, sockets, and fittings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Folding versions available for easy storage and transport in vans</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Sack Trucks
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>L-shaped frame with two wheels, a nose plate, and handles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Load is tilted back onto the wheels and balanced by the handler</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Excellent for single heavy items: consumer units, distribution boards, cable drums</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Typical capacity: 100&ndash;300 kg</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Stair-Climbing Sack Trucks
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Feature tri-wheel or tracked mechanism for ascending and descending stairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Eliminates the need to manually lift heavy items between floors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Particularly valuable for multi-storey domestic and commercial work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Battery-powered versions available for heavier loads</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Pallet Trucks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            <Box className="h-5 w-5 text-emerald-400" />
            Pallet Trucks
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Pallet trucks are essential for moving palletised loads of cable,
                containment, switchgear, and bulk materials. They are used
                extensively in warehouses, stores, and on larger construction
                sites.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Manual Hydraulic
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Hand-pumped hydraulic lifting mechanism</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Pushed and pulled manually by the operator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Typical capacity: 2,000&ndash;2,500 kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Requires significant effort to start and stop heavy loads</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Powered
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Electric drive and electric lifting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Eliminates manual pumping and pushing effort</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Essential for heavy pallets or long transport distances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Requires training and battery charging facilities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Pallet Truck Hazards
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Even with a pallet truck, manual handling risks exist. The
                  initial force to start a heavy pallet moving can be
                  substantial. Slopes cause the load to run away. Feet can be
                  trapped under the forks or wheels. Poor floor surfaces make
                  steering difficult. Always check the route is clear, the floor
                  is suitable, and the load is stable on the forks before moving.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Hoists, Cranes, and Conveyors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Hoists, Cranes, and Conveyors
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For heavier items that cannot safely be moved by trolleys or
                pallet trucks, hoists, cranes, and conveyor systems provide
                the mechanical power needed. These are commonly encountered on
                larger electrical projects involving transformers, switchgear,
                generators, and heavy cable drums.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Overhead Hoists
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Fixed to overhead beams, gantries, or purpose-built tracks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Electric or manual chain operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Used for lifting transformers, switchgear panels, and heavy plant into position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Some plant rooms have permanent overhead lifting points specifically for equipment maintenance</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Mobile Cranes and Chain Blocks
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Mobile cranes used for positioning heavy equipment at ground level or on rooftops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Chain blocks are portable manual hoists that can be attached to any suitable anchor point</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>All lifting operations must comply with LOLER (Lifting Operations and Lifting Equipment Regulations 1998)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Must be thoroughly examined at least every 12 months (6 months if used for lifting persons)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Conveyors
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Roller conveyors:</strong> freely rotating rollers for moving items along a route, powered or gravity-fed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Belt conveyors:</strong> continuous belt surface for smaller items or irregular shapes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Gravity conveyors:</strong> use a slight slope to move items by gravity alone, no power required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Useful for unloading delivery vehicles and moving materials along distribution routes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Vacuum Lifters:
                  </strong>{" "}
                  For glass panels, sheet materials, plasterboard, and other
                  smooth flat surfaces, vacuum lifters use suction cups to grip
                  the material securely. They are commonly seen in glazing work
                  but are also useful for electricians handling large flat items
                  such as glass-fronted distribution boards or sheet metal
                  enclosures. The surface must be smooth, non-porous, and clean
                  for the vacuum seal to work reliably.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Cable-Specific Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            <Cable className="h-5 w-5 text-emerald-400" />
            Cable-Specific Equipment
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cable installation presents unique manual handling challenges due
                to the weight of cable drums, the forces involved in pulling
                cable, and the repetitive nature of cable preparation. Several
                specialised pieces of equipment are designed specifically for
                these tasks.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Cable Drum Jacks and Stands
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Lift the cable drum off the ground and support it on a spindle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Allow the drum to rotate freely for controlled cable dispensing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Available in various sizes from small stands for lightweight reels to heavy-duty hydraulic jacks for large drums</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Must be rated for the weight of the drum being supported (check SWL)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Cable Pulling Equipment
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Winches:</strong> wrap the pulling rope around a drum, providing mechanical advantage. Limited by drum capacity.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Capstans:</strong> rotating bollard around which rope is wrapped. The rope feeds through continuously, ideal for long pulls.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Both require secure anchoring, correct rope selection, and proper training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Pulling force must not exceed the cable manufacturer&rsquo;s maximum pulling tension</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Spring-Loaded Cable Reel Dispensers
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Hold smaller cable reels at comfortable working height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Spring tension provides controlled dispensing, preventing cable from uncoiling too quickly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Reduce bending and stooping when working with second-fix cable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Portable and lightweight &mdash; easy to move around site</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mechanical Aid Selection Guide Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">
              &mdash;
            </span>
            Mechanical Aid Selection Guide
          </h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="bg-white/5 border border-emerald-500/30 rounded-xl overflow-hidden min-w-[600px]">
              {/* Header Row */}
              <div className="grid grid-cols-4 bg-emerald-500/10 border-b border-emerald-500/30">
                <div className="px-3 py-2 text-xs font-bold text-emerald-400 border-r border-emerald-500/20">
                  Task Type
                </div>
                <div className="px-3 py-2 text-xs font-bold text-emerald-400 border-r border-emerald-500/20">
                  Recommended Aid
                </div>
                <div className="px-3 py-2 text-xs font-bold text-emerald-400 border-r border-emerald-500/20">
                  Typical Load
                </div>
                <div className="px-3 py-2 text-xs font-bold text-emerald-400">
                  Notes
                </div>
              </div>
              {/* Data Rows */}
              {[
                {
                  task: "Moving boxes/equipment on flat ground",
                  aid: "Platform / cage trolley",
                  load: "Up to 500 kg",
                  notes: "Cage sides prevent items toppling",
                },
                {
                  task: "Moving heavy single items (CUs, DBs)",
                  aid: "Sack truck",
                  load: "Up to 300 kg",
                  notes: "Tilt back and balance on wheels",
                },
                {
                  task: "Moving items up/down stairs",
                  aid: "Stair-climbing sack truck",
                  load: "Up to 200 kg",
                  notes: "Tri-wheel or tracked mechanism",
                },
                {
                  task: "Moving palletised loads",
                  aid: "Pallet truck (manual/powered)",
                  load: "Up to 2,500 kg",
                  notes: "Powered for heavy loads or long distances",
                },
                {
                  task: "Lifting transformers/switchgear",
                  aid: "Hoist / crane / chain block",
                  load: "Variable (check SWL)",
                  notes: "LOLER compliance required",
                },
                {
                  task: "Dispensing cable from drums",
                  aid: "Cable drum jack/stand",
                  load: "Match SWL to drum weight",
                  notes: "Drum rotates freely on spindle",
                },
                {
                  task: "Pulling cable through routes",
                  aid: "Winch or capstan",
                  load: "Based on cable pulling tension",
                  notes: "Capstan for long pulls",
                },
                {
                  task: "Handling glass/sheet materials",
                  aid: "Vacuum lifter",
                  load: "Varies by cup size/number",
                  notes: "Smooth, non-porous surfaces only",
                },
              ].map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 ${
                    index % 2 === 0 ? "bg-white/[0.02]" : ""
                  } ${
                    index < 7 ? "border-b border-white/5" : ""
                  }`}
                >
                  <div className="px-3 py-2.5 text-xs text-white border-r border-white/5 font-medium">
                    {row.task}
                  </div>
                  <div className="px-3 py-2.5 text-xs text-emerald-300 border-r border-white/5">
                    {row.aid}
                  </div>
                  <div className="px-3 py-2.5 text-xs text-white/70 border-r border-white/5">
                    {row.load}
                  </div>
                  <div className="px-3 py-2.5 text-xs text-white/60">
                    {row.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 05: Equipment Selection and Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            <Settings className="h-5 w-5 text-emerald-400" />
            Equipment Selection and Maintenance
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Selecting the right mechanical aid and keeping it properly
                maintained are critical for ensuring it actually reduces risk
                rather than creating new hazards. A poorly chosen or badly
                maintained aid will not be used by workers, defeating its
                purpose.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Selection Criteria
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Load compatibility:</strong>{" "}
                      Can the aid handle the type, weight, size, and shape of
                      the loads involved?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Route suitability:</strong>{" "}
                      Will it fit through doors, corridors, and around corners?
                      Can it handle the floor surface, slopes, and steps?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Frequency of use:</strong>{" "}
                      Is this a one-off move or a daily task? Higher frequency
                      justifies investment in better equipment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Storage and transport:</strong>{" "}
                      Can the aid be stored on site or transported in the work
                      vehicle? Folding and compact designs improve uptake.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Worker acceptance:</strong>{" "}
                      Involve workers in the selection process. They will use
                      equipment they helped choose. They will avoid equipment
                      imposed upon them that does not suit the real conditions.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Inspection and Maintenance
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pre-use check:</strong>{" "}
                      Visual inspection before every use &mdash; wheels, tyres,
                      handles, frame, lifting mechanism, brakes, capacity label
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Planned inspections:
                      </strong>{" "}
                      Regular inspections at intervals based on manufacturer
                      guidance and intensity of use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        LOLER examinations:
                      </strong>{" "}
                      Lifting equipment (hoists, chain blocks, cranes) must be
                      thoroughly examined at least every 12 months by a competent
                      person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Defect reporting:</strong>{" "}
                      Any defect found must be reported immediately and the
                      equipment taken out of service until repaired
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Exceed the SWL
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The Safe Working Load (SWL) or Working Load Limit (WLL) is the
                  maximum load the equipment is designed to handle safely. Never
                  exceed this limit. Overloading can cause structural failure,
                  wheel collapse, or tipping &mdash; all of which can cause
                  serious injury. If the load exceeds the SWL of available
                  equipment, use a higher-rated aid or break the load into
                  smaller units.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Identifying Hazards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-3-section-4">
              Next: Designing Out MH
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
