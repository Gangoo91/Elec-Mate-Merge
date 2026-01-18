import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Horizontal vs Vertical Axis Turbines - Renewable Energy Module 3";
const DESCRIPTION = "Compare HAWT and VAWT wind turbine technologies, their design principles, efficiency characteristics, and optimal applications for UK renewable energy.";

const quickCheckQuestions = [
  {
    id: "turbine-wind-direction",
    question: "Which type of wind turbine requires wind direction alignment for optimal operation?",
    options: ["Vertical Axis Wind Turbines (VAWTs)", "Horizontal Axis Wind Turbines (HAWTs)", "Both types require alignment", "Neither type requires alignment"],
    correctIndex: 1,
    explanation: "HAWTs must be oriented into the wind using yaw systems for optimal energy capture. VAWTs can accept wind from any direction without needing to track wind changes."
  },
  {
    id: "turbine-urban-use",
    question: "Which turbine type is generally more suited for urban rooftop installations?",
    options: ["Horizontal Axis Wind Turbines (HAWTs)", "Vertical Axis Wind Turbines (VAWTs)", "Both are equally suitable", "Neither should be used on rooftops"],
    correctIndex: 1,
    explanation: "VAWTs are better suited for rooftops due to omni-directional operation, lower noise, simpler structures, and ability to handle turbulent urban wind conditions."
  },
  {
    id: "hawt-efficiency",
    question: "Why are HAWTs generally more efficient than VAWTs?",
    options: ["Simpler construction", "Lower cost", "Better aerodynamic design and wind capture optimisation", "Require less maintenance"],
    correctIndex: 2,
    explanation: "HAWTs achieve higher efficiency through optimised aerodynamic blade design, better wind capture when properly oriented, and more mature technology from decades of research."
  },
  {
    id: "turbine-market-share",
    question: "What percentage of global wind capacity uses HAWT technology?",
    options: ["About 50%", "About 75%", "About 85%", "Over 95%"],
    correctIndex: 3,
    explanation: "HAWTs dominate with over 95% of global wind capacity due to their higher efficiency, proven reliability at utility scale, and lower levelised cost of energy."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a key advantage of Vertical Axis Wind Turbines (VAWTs)?",
    options: [
      "Higher efficiency than HAWTs",
      "Lower cost per MW installed",
      "Omni-directional wind acceptance",
      "Better performance at high wind speeds"
    ],
    correctAnswer: 2,
    explanation: "VAWTs can accept wind from any direction without requiring yaw mechanisms, making them ideal for locations with variable or turbulent wind patterns, such as urban environments."
  },
  {
    id: 2,
    question: "What is the typical efficiency range for HAWTs compared to the Betz limit?",
    options: [
      "10-20% of Betz limit",
      "20-35% of Betz limit",
      "35-50% of Betz limit",
      "50-60% of Betz limit"
    ],
    correctAnswer: 2,
    explanation: "Modern HAWTs achieve 35-50% of the theoretical Betz limit (59.3%), while VAWTs typically achieve 20-40% due to less optimal aerodynamic characteristics."
  },
  {
    id: 3,
    question: "What type of VAWT design uses a lift-based principle with curved blades?",
    options: [
      "Savonius turbine",
      "Darrieus turbine",
      "Giromill turbine",
      "H-rotor turbine"
    ],
    correctAnswer: 1,
    explanation: "The Darrieus turbine uses aerodynamic lift forces with curved (troposkien) or helical blades, achieving higher efficiency among VAWT designs but may require motor assistance for starting."
  },
  {
    id: 4,
    question: "What is a significant maintenance advantage of VAWTs over HAWTs?",
    options: [
      "Longer blade life",
      "Ground-level access to generator and controls",
      "No gearbox required",
      "Lower turbulence loading"
    ],
    correctAnswer: 1,
    explanation: "VAWTs typically have ground-level access to the generator and control systems, making maintenance safer and simpler compared to nacelle-mounted components in HAWTs."
  },
  {
    id: 5,
    question: "What is the typical cost per MW for onshore HAWT installations in the UK?",
    options: [
      "GBP 0.5-0.8M",
      "GBP 1.2-1.8M",
      "GBP 2.5-3.5M",
      "GBP 4.0-5.0M"
    ],
    correctAnswer: 1,
    explanation: "Onshore HAWT installations typically cost GBP 1.2-1.8M per MW, while VAWTs are generally more expensive at GBP 2.0-3.5M per MW due to lower production volumes and less mature supply chains."
  },
  {
    id: 6,
    question: "Which VAWT design operates on the drag principle with S-shaped rotors?",
    options: [
      "Darrieus turbine",
      "Savonius turbine",
      "Helical turbine",
      "Giromill turbine"
    ],
    correctAnswer: 1,
    explanation: "Savonius turbines use drag-based operation with S-shaped rotors. They are self-starting, have simple construction, but achieve lower efficiency (20-30% power coefficient) compared to lift-based designs."
  },
  {
    id: 7,
    question: "What feature helps reduce vibration in helical VAWT designs?",
    options: [
      "Heavier blades",
      "Twisted blade configuration",
      "Multiple blade sets",
      "Active dampening systems"
    ],
    correctAnswer: 1,
    explanation: "Helical VAWT designs use twisted blades that provide smoother torque output and reduced vibration, making them quieter and more suitable for urban environments."
  },
  {
    id: 8,
    question: "Why are HAWTs less suitable for turbulent urban wind conditions?",
    options: [
      "They are too large for urban areas",
      "They require consistent wind direction for optimal performance",
      "They produce too much noise",
      "They require large foundations"
    ],
    correctAnswer: 1,
    explanation: "HAWTs need to track wind direction using yaw systems and perform best in steady, laminar flow. Rapidly changing wind directions in urban environments reduce their effectiveness and increase mechanical wear."
  },
  {
    id: 9,
    question: "What environmental advantage do VAWTs offer over HAWTs?",
    options: [
      "Higher energy production",
      "Lower visual impact and noise levels",
      "Better grid integration",
      "Longer operational life"
    ],
    correctAnswer: 1,
    explanation: "VAWTs typically produce lower noise due to lower tip speeds and have reduced visual impact due to their compact size, making them more acceptable for installation near residential areas."
  },
  {
    id: 10,
    question: "What is the primary market application for HAWT technology?",
    options: [
      "Urban rooftop installations",
      "Utility-scale wind farms",
      "Off-grid domestic systems",
      "Building-integrated generation"
    ],
    correctAnswer: 1,
    explanation: "HAWTs dominate utility-scale applications with over 95% market share due to their higher efficiency, proven reliability at multi-MW scale, and lowest levelised cost of energy."
  }
];

const faqs = [
  {
    question: "Why do HAWTs dominate the commercial wind energy market?",
    answer: "HAWTs achieve higher efficiency (35-50% vs 20-40% for VAWTs), benefit from decades of research and development, have proven reliability at multi-MW scale, and offer the lowest levelised cost of energy. The mature supply chain and standardised designs make them the preferred choice for utility-scale installations."
  },
  {
    question: "Can VAWTs ever be competitive with HAWTs for large-scale generation?",
    answer: "VAWTs face fundamental aerodynamic efficiency limitations, but research into floating offshore VAWT platforms suggests potential advantages in extreme marine environments. Some designs may become competitive for specific applications where omni-directional operation and simplified maintenance outweigh efficiency disadvantages."
  },
  {
    question: "What makes VAWTs better for urban environments?",
    answer: "VAWTs handle turbulent, multi-directional urban winds better than HAWTs. They operate at lower tip speeds producing less noise, have lower visual impact, can be installed on rooftops with simpler structures, and provide ground-level maintenance access. Their omni-directional operation eliminates the need for complex yaw systems."
  },
  {
    question: "How do maintenance requirements compare between HAWT and VAWT?",
    answer: "HAWTs require nacelle access via climbing systems or cranes for most maintenance, with blade inspection often requiring rope access teams or drones. VAWTs offer ground-level access to generators and controls, simpler blade inspection, and generally lower safety risks during maintenance operations."
  },
  {
    question: "What are the noise differences between turbine types?",
    answer: "HAWTs produce aerodynamic noise from blade tip vortices and mechanical noise from gearboxes, typically 40-50 dB(A) at 500m. VAWTs operate at lower tip speeds with reduced aerodynamic noise, often achieving 35-45 dB(A) at similar distances, making them more suitable for noise-sensitive locations."
  },
  {
    question: "Are there hybrid designs combining HAWT and VAWT features?",
    answer: "Research into hybrid designs explores combining HAWT efficiency with VAWT operational flexibility. Some concepts include co-axial arrangements or modified blade geometries. However, commercial hybrid designs remain limited, with most development focusing on improving existing HAWT and VAWT configurations separately."
  }
];

const RenewableEnergyModule3Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Horizontal vs Vertical Axis Turbines
          </h1>
          <p className="text-white/80">
            Comparing turbine configurations, design principles, and optimal applications
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">HAWT Summary</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Efficiency:</strong> 35-50% of Betz limit</li>
              <li><strong>Market share:</strong> &gt;95% of global capacity</li>
              <li><strong>Best for:</strong> Utility-scale wind farms</li>
              <li><strong>Cost:</strong> GBP 1.2-1.8M per MW onshore</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">VAWT Summary</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Efficiency:</strong> 20-40% of Betz limit</li>
              <li><strong>Market share:</strong> Niche applications</li>
              <li><strong>Best for:</strong> Urban and distributed generation</li>
              <li><strong>Advantage:</strong> Omni-directional operation</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differentiate between HAWT and VAWT configurations",
              "Understand design principles and orientation requirements",
              "Compare efficiency characteristics and cost factors",
              "Identify optimal applications for each turbine type",
              "Evaluate maintenance and installation requirements",
              "Assess environmental impact and noise considerations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Horizontal Axis Wind Turbines (HAWTs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HAWTs represent the dominant wind turbine technology, with the rotor shaft oriented horizontally and parallel to the ground. These turbines must face into the wind for optimal energy capture.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rotor orientation:</strong> Horizontal shaft perpendicular to tower</li>
                <li><strong>Blade configuration:</strong> Typically 2-3 blades in upwind or downwind designs</li>
                <li><strong>Yaw system:</strong> Active wind direction tracking mechanism</li>
                <li><strong>Nacelle housing:</strong> Contains gearbox, generator, and control systems</li>
                <li><strong>Tower height:</strong> Elevated to access stronger, less turbulent winds</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Performance Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High efficiency:</strong> Up to 45-50% of theoretical Betz limit</li>
                <li><strong>Optimal wind capture:</strong> Perpendicular blade orientation to wind flow</li>
                <li><strong>Mature technology:</strong> Decades of development and optimisation</li>
                <li><strong>Large scale capability:</strong> Proven for multi-MW installations (15MW+ offshore)</li>
                <li><strong>Cost effectiveness:</strong> Lowest levelised cost of energy (LCOE)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Modern HAWT Innovations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Smart blade systems:</strong> Adaptive surfaces with micro-tabs</li>
                <li><strong>Individual pitch control:</strong> Each blade adjusted independently</li>
                <li><strong>LiDAR-assisted control:</strong> Wind prediction for proactive adjustments</li>
                <li><strong>Wake steering:</strong> Array optimisation through yaw misalignment</li>
                <li><strong>Advanced materials:</strong> Carbon fibre composites for longer, lighter blades</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Vertical Axis Wind Turbines (VAWTs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VAWTs feature a vertically oriented rotor shaft, allowing them to capture wind from any direction without requiring yaw mechanisms. This configuration offers unique advantages for specific applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Darrieus Design (Lift-Based):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Curved blades:</strong> Troposkien or helical configuration</li>
                <li><strong>Lift-based operation:</strong> Aerodynamic lift forces drive rotation</li>
                <li><strong>Higher efficiency:</strong> Better performance among VAWT designs</li>
                <li><strong>Self-starting issues:</strong> May require motor assistance for start-up</li>
                <li><strong>Fatigue loading:</strong> Cyclic stress patterns on blades</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Savonius Design (Drag-Based):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>S-shaped rotor:</strong> Drag-based operation principle</li>
                <li><strong>Self-starting:</strong> Reliable start-up at low wind speeds</li>
                <li><strong>Simple construction:</strong> Fewer moving parts, lower manufacturing cost</li>
                <li><strong>Lower efficiency:</strong> Typically 20-30% power coefficient</li>
                <li><strong>Small scale focus:</strong> Suitable for distributed applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Helical Designs:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Twisted blades:</strong> Helical twist reduces vibration and noise</li>
                <li><strong>Smooth torque:</strong> More consistent power output</li>
                <li><strong>Reduced noise:</strong> Lower acoustic emissions</li>
                <li><strong>Manufacturing complexity:</strong> More challenging to produce</li>
                <li><strong>Aesthetic appeal:</strong> Better architectural integration potential</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation and Maintenance Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Installation requirements, maintenance accessibility, and operational considerations differ significantly between HAWT and VAWT configurations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">HAWT Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Foundation requirements:</strong> Deep foundations for tall towers (80-150m)</li>
                <li><strong>Crane access:</strong> Large mobile cranes required for assembly</li>
                <li><strong>Transport logistics:</strong> Road width limits for blade transport (60-100m blades)</li>
                <li><strong>Height restrictions:</strong> Aviation clearance requirements</li>
                <li><strong>Site preparation:</strong> Substantial civil works needed</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VAWT Installation Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Simpler foundations:</strong> Lower tower height reduces structural loads</li>
                <li><strong>Smaller cranes:</strong> Ground-level assembly possible for many designs</li>
                <li><strong>Compact transport:</strong> Smaller component dimensions</li>
                <li><strong>Urban integration:</strong> Better suited for built environments</li>
                <li><strong>Modular design:</strong> Easier expansion and modification</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Maintenance Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>HAWT nacelle access:</strong> Requires climbing systems, cranes, or rope access</li>
                <li><strong>HAWT blade inspection:</strong> Rope access teams or drone-based inspection</li>
                <li><strong>VAWT ground access:</strong> Generator and controls accessible at ground level</li>
                <li><strong>VAWT blade inspection:</strong> Simpler inspection and maintenance procedures</li>
                <li><strong>Safety comparison:</strong> VAWTs present lower working-at-height risks</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Environmental Impact and Noise
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Environmental factors including noise, visual impact, and wildlife interactions vary significantly between turbine configurations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Noise Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>HAWT noise sources:</strong> Blade tip vortices, gearbox, and transformer</li>
                <li><strong>HAWT levels:</strong> Typically 40-50 dB(A) at 500m distance</li>
                <li><strong>VAWT advantages:</strong> Lower tip speeds reduce aerodynamic noise</li>
                <li><strong>VAWT levels:</strong> Often 35-45 dB(A) at similar distances</li>
                <li><strong>Infrasound:</strong> HAWTs may generate low-frequency noise affecting some people</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Visual and Wildlife Impact:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Visual intrusion:</strong> HAWTs more prominent due to height (80-150m)</li>
                <li><strong>Shadow flicker:</strong> HAWT blades create periodic shadows on nearby properties</li>
                <li><strong>Bird and bat impact:</strong> HAWTs present collision risks at height</li>
                <li><strong>VAWT wildlife impact:</strong> Lower height reduces bird strike risk</li>
                <li><strong>Landscape integration:</strong> VAWTs offer better architectural compatibility</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Technology Comparison and Market Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the trade-offs between turbine types enables appropriate technology selection for specific project requirements.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Technology Comparison Summary</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Efficiency:</strong> HAWT 35-50% vs VAWT 20-40% of Betz limit</p>
                <p><strong>Wind tracking:</strong> HAWT requires yaw system; VAWT omni-directional</p>
                <p><strong>Installation:</strong> HAWT high complexity; VAWT moderate complexity</p>
                <p><strong>Maintenance:</strong> HAWT difficult (height); VAWT easier (ground access)</p>
                <p><strong>Noise:</strong> HAWT moderate-high; VAWT generally lower</p>
                <p><strong>Cost per MW:</strong> HAWT GBP 1.2-1.8M onshore; VAWT GBP 2.0-3.5M</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">HAWT Market Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Utility-scale leadership:</strong> &gt;95% of global wind capacity</li>
                <li><strong>Offshore expansion:</strong> 15MW+ turbines entering service</li>
                <li><strong>Floating platforms:</strong> Accessing deeper water resources</li>
                <li><strong>Hybrid systems:</strong> Integration with solar and battery storage</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VAWT Niche Markets:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Urban environments:</strong> Building-integrated applications</li>
                <li><strong>Distributed generation:</strong> Community and residential scale</li>
                <li><strong>Harsh environments:</strong> Areas with extreme weather or limited access</li>
                <li><strong>Offshore innovation:</strong> Floating VAWT platforms under development</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Case Study: Urban VAWT Deployment</p>
              <p className="text-white text-sm mb-2">
                A pioneering urban wind project demonstrates practical VAWT deployment with lessons for UK applications:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>2 x 35kW helical VAWTs at 30m tower height</li>
                <li>22% capacity factor in urban environment</li>
                <li>45 dB(A) noise level at 100m - residential acceptable</li>
                <li>High public acceptance due to visual appeal</li>
                <li>Ground-level servicing reduced operational costs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Turbine Technology</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>HAWTs for utility-scale projects with good wind resources and grid access</li>
                <li>VAWTs for urban locations with turbulent, multi-directional winds</li>
                <li>Consider noise restrictions - VAWTs may be essential near residential areas</li>
                <li>Evaluate maintenance access - VAWTs advantageous where crane access is difficult</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Sites</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>HAWTs require consistent wind direction - assess wind rose data</li>
                <li>VAWTs better suited for sites with high turbulence intensity (&gt;15%)</li>
                <li>Consider visual impact and planning requirements for each technology</li>
                <li>Evaluate transport routes for HAWT components (blade length limits)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Choosing on efficiency alone</strong> - site conditions may favour lower-efficiency VAWTs</li>
                <li><strong>Ignoring urban wind patterns</strong> - HAWTs underperform in turbulent environments</li>
                <li><strong>Underestimating maintenance costs</strong> - HAWT nacelle access adds significant expense</li>
                <li><strong>Overlooking noise limits</strong> - planning conditions may preclude HAWTs near residents</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule3Section2;
