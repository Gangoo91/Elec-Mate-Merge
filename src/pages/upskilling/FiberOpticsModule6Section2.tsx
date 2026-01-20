import { ArrowLeft, Zap, CheckCircle, Building, Network, Cable, MapPin, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Structured Cabling Design Rules - Fibre Optics Technology";
const DESCRIPTION = "Master the principles of structured cabling design including star topology, backbone and horizontal subsystems, telecommunications rooms, and cable pathway planning.";

const quickCheckQuestions = [
  {
    id: "design-qc1",
    question: "What topology does structured cabling use?",
    options: [
      "Ring topology",
      "Bus topology",
      "Star topology",
      "Mesh topology"
    ],
    correctIndex: 2,
    explanation: "Structured cabling uses a hierarchical star topology, with all horizontal cables terminating at a central point (telecommunications room) and backbone cables linking these central points."
  },
  {
    id: "design-qc2",
    question: "What is the maximum horizontal cable length in structured cabling?",
    options: [
      "50 metres",
      "90 metres",
      "100 metres",
      "300 metres"
    ],
    correctIndex: 1,
    explanation: "The permanent link (horizontal cable) is limited to 90 metres, with an additional 10 metres allowed for work area and equipment cords, giving a total channel length of 100 metres."
  },
  {
    id: "design-qc3",
    question: "What does a telecommunications room (TR) contain?",
    options: [
      "Only telephone equipment",
      "Cross-connects, active equipment, and cable terminations",
      "Power distribution only",
      "Security systems"
    ],
    correctIndex: 1,
    explanation: "A telecommunications room (TR) houses cross-connects (patch panels), active network equipment, cable terminations, and provides the transition point between backbone and horizontal cabling."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the backbone cabling subsystem?",
    options: [
      "Cables from work area to patch panel",
      "Cables linking telecommunications rooms and equipment rooms",
      "Cables within a single room",
      "Cables to external services"
    ],
    correctAnswer: 1,
    explanation: "Backbone cabling connects telecommunications rooms (TRs) to equipment rooms (ERs) and building entrance facilities, forming the 'backbone' of the network."
  },
  {
    id: 2,
    question: "What is the work area in structured cabling?",
    options: [
      "The telecommunications room",
      "The area from the outlet to the user equipment",
      "The equipment room",
      "The entrance facility"
    ],
    correctAnswer: 1,
    explanation: "The work area extends from the telecommunications outlet to the user's equipment, including the work area cord (patch lead)."
  },
  {
    id: 3,
    question: "What is a consolidation point (CP)?",
    options: [
      "A main distribution frame",
      "An intermediate connection point in horizontal cabling",
      "A building entrance",
      "A splice enclosure"
    ],
    correctAnswer: 1,
    explanation: "A consolidation point allows transition between different cable types in horizontal cabling, often used in open-plan offices for flexibility."
  },
  {
    id: 4,
    question: "What is the minimum floor space recommended for a TR per TIA standards?",
    options: [
      "5 square metres",
      "10 square metres / 1000 sq metres of floor space served",
      "50 square metres",
      "No minimum specified"
    ],
    correctAnswer: 1,
    explanation: "TIA recommends approximately 10 square metres (0.07 sq metres per sq metre of usable floor space) as a starting point for TR sizing."
  },
  {
    id: 5,
    question: "What is a mutoa (multi-user telecommunications outlet assembly)?",
    options: [
      "A single outlet",
      "A group of outlets serving an open area",
      "A patch panel",
      "A splice tray"
    ],
    correctAnswer: 1,
    explanation: "A MUTOA is a group of telecommunications outlets in a common location, serving multiple work areas in open-plan environments."
  },
  {
    id: 6,
    question: "How many telecommunications rooms are typically required per floor?",
    options: [
      "One per building",
      "One per 1000 square metres of floor space",
      "One per 10 outlets",
      "One per floor regardless of size"
    ],
    correctAnswer: 1,
    explanation: "Standards recommend one TR per 1000 square metres of floor space to stay within horizontal distance limits."
  },
  {
    id: 7,
    question: "What is a zone distribution system?",
    options: [
      "A security zone",
      "Pre-terminated cabling to zone boxes for flexibility",
      "Wireless coverage area",
      "Fire alarm zone"
    ],
    correctAnswer: 1,
    explanation: "Zone distribution uses pre-terminated cables to zone boxes, providing flexibility for moves, adds, and changes in dynamic environments."
  },
  {
    id: 8,
    question: "What should be avoided when routing fibre cables?",
    options: [
      "Cable trays",
      "Straight runs",
      "Sharp bends below minimum bend radius",
      "Vertical risers"
    ],
    correctAnswer: 2,
    explanation: "Sharp bends below minimum bend radius cause signal loss and potential fibre damage. Always maintain manufacturer-specified bend radius."
  },
  {
    id: 9,
    question: "What is pathway in cabling design?",
    options: [
      "The cable itself",
      "The route and support system for cables (trays, conduit, etc.)",
      "The network protocol",
      "The floor plan"
    ],
    correctAnswer: 1,
    explanation: "Pathway refers to the physical route and support system for cables including cable trays, conduit, raceways, and risers."
  },
  {
    id: 10,
    question: "What determines the number of fibres needed in backbone cabling?",
    options: [
      "Building height only",
      "Current and future application requirements",
      "Cable colour only",
      "Distance only"
    ],
    correctAnswer: 1,
    explanation: "Backbone fibre count depends on current requirements plus allowance for growth, redundancy, and future applications. Standards provide minimum guidelines."
  }
];

const faqs = [
  {
    question: "Why is star topology used instead of other topologies?",
    answer: "Star topology provides centralised management at the telecommunications room, easy fault isolation (a single cable failure only affects one work area), simple moves/adds/changes, and consistent performance to each outlet. It's also the basis for active network equipment design, making integration straightforward."
  },
  {
    question: "Can I exceed the 90-metre horizontal distance?",
    answer: "The 90-metre limit applies to copper balanced twisted-pair cabling to ensure signal quality. Fibre optic horizontal cabling can extend further (300m+ for multimode) but is typically kept to similar distances for design consistency. Always check specific application requirements and standards for your fibre type."
  },
  {
    question: "What's the difference between an equipment room (ER) and telecommunications room (TR)?",
    answer: "An equipment room houses core network equipment and may serve the entire building or campus. A telecommunications room is a floor-level or zone-level facility serving local work areas. Large buildings have one or more ERs plus TRs on each floor. The TR is sometimes called an IDF (intermediate distribution frame) and the ER an MDF (main distribution frame)."
  },
  {
    question: "How do I plan for future growth?",
    answer: "Install spare capacity in backbone fibres (typically 25-50% extra), size pathways for growth, ensure TRs have space for additional equipment, and use modular designs that can expand. For fibre, it's often more cost-effective to install extra strands initially than to add cables later."
  },
  {
    question: "What about wireless access points in structured cabling?",
    answer: "Wireless access points are work area devices that connect via structured cabling. Each AP location needs a telecommunications outlet. Standards now include guidance for AP density planning. The cabling infrastructure remains structured even when the end devices are wireless."
  },
  {
    question: "How do I handle open-plan offices with no fixed desks?",
    answer: "Use zone distribution with consolidation points or MUTOAs. Place zone boxes in accessible ceiling or floor locations, then run shorter cables to furniture clusters. This provides flexibility while maintaining structured cabling principles."
  }
];

const FiberOpticsModule6Section2 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Structured Cabling Design Rules
          </h1>
          <p className="text-white/80">
            Creating organised, scalable network infrastructure
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Topology:</strong> Hierarchical star design</li>
              <li><strong>Subsystems:</strong> Backbone + Horizontal</li>
              <li><strong>Horizontal limit:</strong> 90m permanent link</li>
              <li><strong>Central point:</strong> Telecommunications room (TR)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Principles</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Centralised:</strong> All cables to central points</li>
              <li><strong>Modular:</strong> Easy to expand and change</li>
              <li><strong>Standardised:</strong> Consistent design approach</li>
              <li><strong>Future-proof:</strong> Built for growth</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Star topology principles",
              "Backbone cabling design",
              "Horizontal cabling rules",
              "Telecommunications room requirements",
              "Pathway and space planning",
              "Zone distribution concepts"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Structured Cabling Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Structured cabling is a standardised approach to building telecommunications infrastructure. It uses a hierarchical star topology where all cables terminate at central distribution points, creating an organised, manageable system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key components of structured cabling:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Entrance facility (EF):</strong> Where external services enter the building</li>
                <li><strong>Equipment room (ER):</strong> Houses main distribution and core equipment</li>
                <li><strong>Telecommunications room (TR):</strong> Floor or zone distribution point</li>
                <li><strong>Backbone cabling:</strong> Links ERs and TRs vertically/horizontally</li>
                <li><strong>Horizontal cabling:</strong> From TR to work area outlets</li>
                <li><strong>Work area:</strong> User connection point to equipment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Benefits of structured approach:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Flexibility:</strong> Changes made at patch panels, not cable runs</li>
                <li><strong>Scalability:</strong> Easy to add new connections</li>
                <li><strong>Manageability:</strong> Centralised administration points</li>
                <li><strong>Reliability:</strong> Standardised, tested infrastructure</li>
                <li><strong>Cost-effective:</strong> Reduced long-term maintenance costs</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Backbone Cabling Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Backbone cabling forms the main distribution paths connecting telecommunications rooms, equipment rooms, and entrance facilities. For fibre optic systems, the backbone is critical for high-speed inter-floor and inter-building connectivity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Backbone cabling functions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Vertical backbone:</strong> Between floors within a building (risers)</li>
                <li><strong>Horizontal backbone:</strong> Between TRs on the same floor</li>
                <li><strong>Campus backbone:</strong> Between buildings on a site</li>
                <li><strong>Inter-building:</strong> Connecting separate premises</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Backbone fibre count guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minimum:</strong> 2 fibres per TR (one pair for redundancy)</li>
                <li><strong>Recommended:</strong> 6-12 fibres per TR for growth</li>
                <li><strong>High-density:</strong> 24-48 fibres for major distribution points</li>
                <li><strong>Campus:</strong> Based on building count and anticipated traffic</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Backbone distance limits (fibre):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OM3/OM4 multimode:</strong> Up to 300m for most applications</li>
                <li><strong>OS2 singlemode:</strong> Up to 2000m intra-building, longer inter-building</li>
                <li><strong>Application-specific:</strong> Check protocol requirements (e.g., 10GBASE-SR)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Backbone Topology</p>
              <p className="text-sm text-white">
                Backbone cabling uses a star or extended star topology with no more than two levels of cross-connect between equipment rooms and telecommunications rooms. This limits the number of connection points and potential failure points.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Horizontal Cabling Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Horizontal cabling connects the telecommunications room to individual work area outlets. This is the most visible part of the infrastructure and must be designed for both current needs and future flexibility.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Horizontal cabling rules:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Topology:</strong> Star - each outlet has dedicated cable to TR</li>
                <li><strong>Distance:</strong> 90m maximum for permanent link</li>
                <li><strong>Channel:</strong> 100m total including patch cords (5m work area + 5m equipment)</li>
                <li><strong>No splices:</strong> Continuous cable from outlet to patch panel</li>
                <li><strong>Minimum outlets:</strong> Two per work area (voice + data historically)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fibre horizontal cabling:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fibre to the desk:</strong> Direct fibre to work area outlets</li>
                <li><strong>Centralised optical fibre:</strong> Longer runs with splice/connection at TR</li>
                <li><strong>Zone cabling:</strong> Fibre to zone boxes, then copper or fibre to outlets</li>
                <li><strong>Distance:</strong> Up to 300m for multimode in horizontal (check application)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Consolidation points (CP):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Intermediate connection in horizontal cabling</li>
                <li><strong>Location:</strong> Minimum 15m from TR, ceiling or raised floor</li>
                <li><strong>Use case:</strong> Open-plan offices, furniture clusters</li>
                <li><strong>Limit:</strong> One CP per horizontal cable run</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Telecommunications Room Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The telecommunications room (TR) is the heart of each floor's cabling infrastructure. Proper TR design is essential for installation, maintenance, and future expansion.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TR sizing guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minimum size:</strong> 3m × 3m (approximately 10 sq metres)</li>
                <li><strong>Scaling:</strong> Increase for larger floor areas or high-density requirements</li>
                <li><strong>Ceiling height:</strong> Minimum 2.6m for rack mounting</li>
                <li><strong>Door:</strong> Minimum 0.9m wide, opening outward, lockable</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TR environmental requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> 18-24°C with HVAC (continuous operation)</li>
                <li><strong>Humidity:</strong> 30-55% relative humidity</li>
                <li><strong>Power:</strong> Dedicated circuits, UPS consideration</li>
                <li><strong>Lighting:</strong> Minimum 500 lux at floor level</li>
                <li><strong>Fire protection:</strong> Smoke detection, appropriate suppression</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TR layout considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable entry:</strong> From multiple directions (above and/or below)</li>
                <li><strong>Rack placement:</strong> Allow front and rear access (1m clearance)</li>
                <li><strong>Grounding:</strong> Telecommunications grounding busbar (TGB)</li>
                <li><strong>Labelling:</strong> Clear identification of all terminations</li>
                <li><strong>Expansion:</strong> Space for additional racks and equipment</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">TR Location</p>
              <p className="text-sm text-white">
                Locate TRs centrally within the served floor area to minimise horizontal cable lengths. Align TRs vertically between floors for efficient backbone routing. Avoid locations near EMI sources, water pipes, or external walls.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Pathway and Space Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pathways are the routes and support systems for cables throughout the building. Proper pathway design ensures cables are protected, accessible, and can be expanded.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pathway types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable tray:</strong> Open or closed trays, good capacity and accessibility</li>
                <li><strong>Conduit:</strong> Metal or plastic tubes, provides protection</li>
                <li><strong>Raceway:</strong> Surface-mounted channels for retrofits</li>
                <li><strong>Raised floor:</strong> Underfloor distribution, flexible</li>
                <li><strong>Ceiling distribution:</strong> Above suspended ceilings</li>
                <li><strong>Risers:</strong> Vertical pathways between floors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pathway sizing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fill ratio:</strong> Maximum 40% initial, 60% ultimate capacity</li>
                <li><strong>Growth allowance:</strong> Plan for 25-50% additional cables</li>
                <li><strong>Bend radius:</strong> Maintain minimum radius at all turns</li>
                <li><strong>Pull points:</strong> Access for cable installation every 30m</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fibre-specific pathway considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Bend radius:</strong> Larger radius requirements than copper</li>
                <li><strong>Pulling tension:</strong> Lower maximum tension, use innerduct</li>
                <li><strong>Protection:</strong> Avoid crushing, sharp edges, excessive loads</li>
                <li><strong>Innerduct:</strong> Protects fibre cables in shared pathways</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Zone Distribution and Flexibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Zone distribution provides flexibility for dynamic work environments where outlet locations may change frequently. It bridges traditional structured cabling with modern workspace needs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Zone distribution concepts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zone box:</strong> Intermediate connection point in work area</li>
                <li><strong>Pre-terminated cables:</strong> Factory-terminated for quick installation</li>
                <li><strong>Modular approach:</strong> Zones can be reconfigured independently</li>
                <li><strong>Reduced waste:</strong> Only active outlets connected</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Zone distribution benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Flexibility:</strong> Easy moves, adds, and changes</li>
                <li><strong>Speed:</strong> Faster deployment with pre-terminated cables</li>
                <li><strong>Cost:</strong> Lower ongoing churn costs</li>
                <li><strong>Sustainability:</strong> Reusable, relocatable components</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Implementation options:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ceiling zones:</strong> Zone boxes above ceiling tiles</li>
                <li><strong>Floor zones:</strong> In raised floor pedestals or floor boxes</li>
                <li><strong>Column zones:</strong> Mounted on structural columns</li>
                <li><strong>Furniture zones:</strong> Integrated with modular furniture</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Standards Compliance</p>
              <p className="text-sm text-white">
                Zone distribution must still comply with overall channel length limits and connection requirements. The zone box functions as a consolidation point (CP) with the same rules applying - minimum 15m from TR, maximum one CP per horizontal run.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Process Steps</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Requirements:</strong> Determine outlet quantities and locations</li>
                <li><strong>2. TR locations:</strong> Position TRs to serve all areas within distance limits</li>
                <li><strong>3. Backbone:</strong> Design inter-TR cabling with adequate fibre count</li>
                <li><strong>4. Pathways:</strong> Plan routes with capacity for growth</li>
                <li><strong>5. Documentation:</strong> Create detailed drawings and specifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Outlet Density Planning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Office:</strong> 1 outlet per 10 square metres (minimum)</li>
                <li><strong>Open plan:</strong> Consider zone distribution approach</li>
                <li><strong>Meeting rooms:</strong> 2-4 outlets plus display/AV connections</li>
                <li><strong>Wireless APs:</strong> One outlet per AP location (ceiling/wall)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersized pathways:</strong> No room for growth or additional cables</li>
                <li><strong>Poor TR location:</strong> Too far from work areas, exceeds distances</li>
                <li><strong>Insufficient fibre count:</strong> Not enough strands for future needs</li>
                <li><strong>Ignoring bend radius:</strong> Sharp turns damage fibre</li>
                <li><strong>No spare capacity:</strong> Always plan for 25%+ growth</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Design Limits</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Horizontal Cabling</p>
                <ul className="space-y-0.5">
                  <li>Permanent link: 90m max</li>
                  <li>Channel: 100m max</li>
                  <li>Work area cord: 5m typical</li>
                  <li>Equipment cord: 5m typical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">TR Requirements</p>
                <ul className="space-y-0.5">
                  <li>Minimum size: 3m × 3m</li>
                  <li>One per 1000 sq metres</li>
                  <li>Temp: 18-24°C</li>
                  <li>Humidity: 30-55%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../fiber-optics-module-6-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../fiber-optics-module-6-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule6Section2;
