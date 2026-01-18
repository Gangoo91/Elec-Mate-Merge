import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Small Wind and Grid Connection - Renewable Energy Module 3";
const DESCRIPTION = "Learn about small-scale wind turbine systems, grid connection requirements, G98/G99 regulations, and electrical system design for UK wind installations.";

const quickCheckQuestions = [
  {
    id: "small-wind-capacity",
    question: "What capacity defines small-scale wind generation in the UK?",
    options: ["Up to 10kW", "Up to 50kW", "Up to 100kW", "Up to 500kW"],
    correctIndex: 1,
    explanation: "Small-scale wind is typically defined as up to 50kW capacity. Systems up to 16A per phase (approximately 3.68kW single-phase) can connect under G98, while larger systems require G99 approval."
  },
  {
    id: "g98-notification",
    question: "What is the maximum capacity for G98 notification-only grid connection?",
    options: ["3.68kW (16A per phase)", "10kW", "50kW", "100kW"],
    correctIndex: 0,
    explanation: "G98 allows notification-only connection for systems up to 16A per phase (3.68kW single-phase, 11.04kW three-phase). Larger systems require G99 application and DNO approval."
  },
  {
    id: "inverter-requirement",
    question: "What type of inverter is required for grid-connected wind turbines?",
    options: ["Standard DC-AC inverter", "Grid-forming inverter only", "G98/G99 compliant inverter with anti-islanding", "Any inverter with MPPT"],
    correctIndex: 2,
    explanation: "Grid-connected wind systems require inverters compliant with G98/G99 standards, including anti-islanding protection that disconnects within 0.5 seconds of grid loss to protect line workers."
  },
  {
    id: "wind-planning",
    question: "What planning consideration is unique to small wind installations?",
    options: ["Building regulations only", "Grid connection costs", "Noise impact and permitted development rights", "Panel efficiency ratings"],
    correctIndex: 2,
    explanation: "Small wind installations must consider noise impact on neighbours and may qualify for permitted development rights if meeting specific criteria, avoiding full planning applications."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What voltage does a typical domestic small wind system operate at?",
    options: [
      "12V DC only",
      "48V DC or 230V AC grid-tied",
      "400V three-phase only",
      "11kV distribution voltage"
    ],
    correctAnswer: 1,
    explanation: "Domestic small wind systems typically operate at 48V DC for battery charging or 230V AC for grid-tied systems. Three-phase 400V is used for larger installations."
  },
  {
    id: 2,
    question: "What is the required anti-islanding disconnection time for G98/G99 compliant inverters?",
    options: [
      "Within 5 seconds",
      "Within 2 seconds",
      "Within 0.5 seconds",
      "Within 0.1 seconds"
    ],
    correctAnswer: 2,
    explanation: "G98/G99 compliant inverters must disconnect within 0.5 seconds of detecting grid loss (islanding) to protect DNO workers who may be working on de-energised lines."
  },
  {
    id: 3,
    question: "What additional protection is typically required for wind turbine generators?",
    options: [
      "Only fuse protection",
      "Overspeed protection and dump load",
      "Manual disconnect only",
      "No additional protection needed"
    ],
    correctAnswer: 1,
    explanation: "Wind turbines require overspeed protection (mechanical or electronic braking) and often a dump load to absorb excess energy when the grid or battery cannot accept power, preventing turbine damage."
  },
  {
    id: 4,
    question: "What earthing arrangement is typically required for small wind installations?",
    options: [
      "TT system only",
      "TN-S system only",
      "Compatible with existing property earthing (TN-S, TN-C-S, or TT with RCD)",
      "No earthing required for DC systems"
    ],
    correctAnswer: 2,
    explanation: "Small wind installations must be compatible with the property's existing earthing arrangement. Additional earth electrodes may be required for tower earthing and lightning protection."
  },
  {
    id: 5,
    question: "What is the typical tower height for a domestic small wind turbine?",
    options: [
      "5-10 metres",
      "10-25 metres",
      "30-50 metres",
      "Over 50 metres"
    ],
    correctAnswer: 1,
    explanation: "Domestic small wind turbines typically use towers of 10-25 metres to access less turbulent wind above obstacles. Permitted development rights may limit height to 15m in some cases."
  },
  {
    id: 6,
    question: "What cable sizing consideration is critical for small wind installations?",
    options: [
      "Only current carrying capacity",
      "Voltage drop over long cable runs from turbine to inverter",
      "Cable colour only",
      "Only fire resistance"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop is critical for small wind installations due to potentially long cable runs from the turbine to the inverter/controller. Excessive voltage drop reduces system efficiency and may affect MPPT operation."
  },
  {
    id: 7,
    question: "What type of charge controller is commonly used for small wind battery systems?",
    options: [
      "PWM solar charge controller",
      "Wind-specific controller with dump load capability",
      "Standard DC-DC converter",
      "No controller needed"
    ],
    correctAnswer: 1,
    explanation: "Small wind battery systems require wind-specific charge controllers that can handle variable frequency AC input and include dump load capability to protect the turbine when batteries are full."
  },
  {
    id: 8,
    question: "What is the typical capacity factor for a well-sited small wind turbine in the UK?",
    options: [
      "5-10%",
      "15-25%",
      "35-45%",
      "50-60%"
    ],
    correctAnswer: 1,
    explanation: "Well-sited small wind turbines in the UK typically achieve 15-25% capacity factors, lower than commercial installations due to lower hub heights and more turbulent conditions."
  },
  {
    id: 9,
    question: "What document must be provided to the DNO for G98 connections?",
    options: [
      "Full engineering study",
      "Commissioning confirmation form within 28 days",
      "Annual performance report",
      "No documentation required"
    ],
    correctAnswer: 1,
    explanation: "For G98 connections, installers must submit a commissioning confirmation form to the DNO within 28 days of energisation, confirming the installation meets relevant standards."
  },
  {
    id: 10,
    question: "What protection is required at the grid connection point for small wind?",
    options: [
      "Main fuse only",
      "Isolation switch, RCD, and MCB protection with lockable isolator",
      "Circuit breaker only",
      "No specific protection required"
    ],
    correctAnswer: 1,
    explanation: "Grid connection points require isolation switches (lockable for DNO access), RCD protection, MCB/RCBO protection, and clear labelling indicating the presence of an embedded generator."
  }
];

const faqs = [
  {
    question: "What is the difference between G98 and G99 for wind turbine connections?",
    answer: "G98 applies to systems up to 16A per phase (3.68kW single-phase) requiring only notification to the DNO. G99 applies to larger systems and requires formal application, technical assessment, and DNO approval before connection. Both require compliant equipment and proper commissioning."
  },
  {
    question: "Can I install a wind turbine under permitted development rights?",
    answer: "Permitted development rights allow certain small wind installations without full planning permission, subject to conditions: turbine must be for property's own use, only one turbine per property, specific height limits (15m stand-alone, 3m above roof), and noise limits. Listed buildings, conservation areas, and AONBs typically require full planning permission."
  },
  {
    question: "What maintenance is required for small wind turbines?",
    answer: "Small wind turbines typically require annual inspection including: checking blade condition for damage or erosion, tower bolt torque verification, yaw bearing lubrication, generator brush inspection (if applicable), guy wire tension checks, and electrical connection inspection. More frequent checks may be needed after severe weather."
  },
  {
    question: "How do I size cables for a wind turbine installation?",
    answer: "Cable sizing must account for maximum turbine current, cable run length, and acceptable voltage drop (typically 3% maximum). For DC systems, larger cables are often needed due to lower voltages. Use manufacturer guidelines and BS 7671 for selection, considering both current carrying capacity and voltage drop calculations."
  },
  {
    question: "What battery systems work with small wind turbines?",
    answer: "Small wind systems commonly use lead-acid (flooded or AGM) or lithium batteries. Wind-specific charge controllers are essential as they differ from solar controllers. System must handle variable wind input and include dump load protection. Battery bank sizing should consider wind resource variability and typical usage patterns."
  },
  {
    question: "Why do small wind turbines often underperform expectations?",
    answer: "Common reasons include: poor site selection with insufficient wind speed or excessive turbulence, lower hub heights than commercial turbines, optimistic manufacturer performance claims, obstacles creating wind shadow, and urban locations with complex wind patterns. Thorough site assessment before installation is essential."
  }
];

const RenewableEnergyModule3Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 3 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Small Wind and Grid Connection
          </h1>
          <p className="text-white/80">
            Electrical systems, G98/G99 requirements, and installation considerations for small wind
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Grid Connection</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>G98:</strong> Up to 16A per phase (notification)</li>
              <li><strong>G99:</strong> &gt;16A per phase (application)</li>
              <li><strong>Anti-islanding:</strong> 0.5 second disconnect</li>
              <li><strong>Commissioning:</strong> 28-day notification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Small Wind Specs</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Capacity:</strong> Up to 50kW typical</li>
              <li><strong>Tower height:</strong> 10-25m domestic</li>
              <li><strong>Capacity factor:</strong> 15-25% typical UK</li>
              <li><strong>Voltage:</strong> 48V DC or 230/400V AC</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand G98 and G99 connection requirements",
              "Design small wind electrical systems safely",
              "Select appropriate protection and control equipment",
              "Size cables and components correctly",
              "Navigate planning and permitted development",
              "Commission and maintain small wind installations"
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
            Small Wind System Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Small-scale wind systems range from micro turbines for battery charging to larger grid-connected installations. Understanding the different configurations is essential for appropriate system design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Off-Grid Battery Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Typical capacity:</strong> 400W to 5kW turbines</li>
                <li><strong>Battery voltage:</strong> 12V, 24V, or 48V DC systems</li>
                <li><strong>Charge controller:</strong> Wind-specific with dump load output</li>
                <li><strong>Applications:</strong> Remote properties, boats, caravans, telecoms</li>
                <li><strong>Hybrid systems:</strong> Often combined with solar PV</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Grid-Connected Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Typical capacity:</strong> 1kW to 50kW turbines</li>
                <li><strong>Output voltage:</strong> 230V single-phase or 400V three-phase</li>
                <li><strong>Inverter type:</strong> G98/G99 compliant grid-tie inverter</li>
                <li><strong>Metering:</strong> Generation meter and smart export meter</li>
                <li><strong>Export:</strong> Excess energy exported to grid (Smart Export Guarantee)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Hybrid Grid-Connected with Battery:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Configuration:</strong> Wind turbine, battery storage, and grid connection</li>
                <li><strong>Energy management:</strong> Intelligent system prioritises self-consumption</li>
                <li><strong>Backup capability:</strong> Can provide power during grid outages</li>
                <li><strong>Complexity:</strong> Requires compatible hybrid inverter system</li>
                <li><strong>G98/G99:</strong> Must still meet grid connection requirements</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Grid Connection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Grid connection of small wind systems in the UK is governed by G98 and G99 standards (formerly G83 and G59), which ensure safe and compatible connection to the distribution network.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">G98 Requirements (up to 16A per phase):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Capacity limit:</strong> 3.68kW single-phase, 11.04kW three-phase</li>
                <li><strong>Process:</strong> Notification only (no DNO approval required)</li>
                <li><strong>Equipment:</strong> Must use G98-listed inverter/interface</li>
                <li><strong>Commissioning:</strong> Submit form to DNO within 28 days</li>
                <li><strong>Multiple installations:</strong> Aggregate capacity must remain within limits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">G99 Requirements (above 16A per phase):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Application process:</strong> Formal application to DNO required</li>
                <li><strong>Technical assessment:</strong> DNO evaluates network impact</li>
                <li><strong>Connection agreement:</strong> Written agreement before installation</li>
                <li><strong>Witness testing:</strong> May require DNO commissioning attendance</li>
                <li><strong>Ongoing compliance:</strong> Regular testing and reporting requirements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Protection Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Anti-islanding:</strong> Automatic disconnect within 0.5 seconds of grid loss</li>
                <li><strong>Over/under voltage:</strong> Trip outside 207-253V (single-phase)</li>
                <li><strong>Over/under frequency:</strong> Trip outside 47.5-52Hz</li>
                <li><strong>DC injection:</strong> Limit DC component in AC output</li>
                <li><strong>Reconnection delay:</strong> Minimum 20 second delay after grid restoration</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrical System Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper electrical system design ensures safe, efficient, and code-compliant small wind installations. Key considerations include cable sizing, protection coordination, and earthing arrangements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Sizing Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current capacity:</strong> Based on maximum turbine output current</li>
                <li><strong>Voltage drop:</strong> Limit to 3% maximum for efficiency</li>
                <li><strong>Cable length:</strong> Tower to controller/inverter often 30-50m+</li>
                <li><strong>DC systems:</strong> Larger cables needed due to lower voltage</li>
                <li><strong>Installation method:</strong> Consider underground, overhead, or tower-mounted</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Protection and Isolation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>DC isolator:</strong> At turbine base for safe maintenance</li>
                <li><strong>AC isolator:</strong> Lockable isolator accessible to DNO</li>
                <li><strong>Overcurrent protection:</strong> MCB/RCBO for AC circuits</li>
                <li><strong>DC fusing:</strong> At battery and controller for DC systems</li>
                <li><strong>Surge protection:</strong> SPDs recommended for exposed installations</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Earthing and Lightning Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tower earthing:</strong> Dedicated earth electrode at tower base</li>
                <li><strong>Bonding:</strong> Connect tower earth to main earthing terminal</li>
                <li><strong>Lightning risk:</strong> Elevated turbines are lightning targets</li>
                <li><strong>Down conductors:</strong> Route lightning current safely to earth</li>
                <li><strong>SPD coordination:</strong> Type 1+2 SPDs for lightning-prone sites</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Planning and Site Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Small wind installations must consider planning requirements, site suitability, and potential impacts on neighbours and the environment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Permitted Development Conditions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Must be for property's own electricity use</li>
                <li><strong>Quantity:</strong> Only one turbine per property</li>
                <li><strong>Height limits:</strong> Stand-alone max 15m, building-mounted +3m above roof</li>
                <li><strong>Noise:</strong> Must not exceed 45dB at nearest dwelling</li>
                <li><strong>Location:</strong> Not in conservation areas, AONBs, or on listed buildings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Site Assessment Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wind resource:</strong> Minimum 5m/s annual average recommended</li>
                <li><strong>Obstacles:</strong> Trees and buildings create turbulence</li>
                <li><strong>Clear fetch:</strong> Open area in prevailing wind direction</li>
                <li><strong>Tower height:</strong> Hub should be 10m+ above nearby obstacles</li>
                <li><strong>Access:</strong> Consider crane or gin pole access for installation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Neighbour and Environmental Impacts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Noise:</strong> Mechanical and aerodynamic noise at various wind speeds</li>
                <li><strong>Shadow flicker:</strong> Rotating blade shadows on neighbouring properties</li>
                <li><strong>Visual impact:</strong> Turbine visibility from surrounding areas</li>
                <li><strong>Wildlife:</strong> Bat and bird collision risk assessment</li>
                <li><strong>Electromagnetic:</strong> TV/radio interference rare but possible</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Commissioning and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper commissioning ensures safe operation and regulatory compliance. Regular maintenance extends turbine life and maintains performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Commissioning Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Structural:</strong> Verify tower plumb, guy wire tension, foundation integrity</li>
                <li><strong>Electrical:</strong> Insulation resistance, earth continuity, polarity checks</li>
                <li><strong>Protection:</strong> Verify anti-islanding and protection settings</li>
                <li><strong>Metering:</strong> Install and verify generation/export meters</li>
                <li><strong>Documentation:</strong> Submit G98/G99 commissioning form to DNO</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Annual Maintenance Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Blade inspection:</strong> Check for cracks, erosion, or damage</li>
                <li><strong>Tower inspection:</strong> Bolts, corrosion, guy wire condition</li>
                <li><strong>Electrical checks:</strong> Connections, cable condition, earth resistance</li>
                <li><strong>Yaw and bearings:</strong> Lubrication and free movement</li>
                <li><strong>Performance review:</strong> Compare output to expected generation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Safety During Maintenance</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lock out:</strong> Always isolate turbine before any work</li>
                <li><strong>Blade securing:</strong> Prevent rotation during maintenance</li>
                <li><strong>Working at height:</strong> Use appropriate fall protection for tower work</li>
                <li><strong>Weather conditions:</strong> Do not work in high winds or storms</li>
                <li><strong>Two-person rule:</strong> Never work alone on turbine maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Small Wind Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always conduct thorough site wind assessment before committing to purchase</li>
                <li>Use wind-specific charge controllers - solar controllers are not suitable</li>
                <li>Size cables for voltage drop, especially on long runs from turbine</li>
                <li>Install lockable DC isolator at tower base for safe maintenance access</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Connecting to Grid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify total connected generation stays within G98 limits before notification</li>
                <li>Use only inverters from the approved G98/G99 equipment list</li>
                <li>Install clear labelling warning of embedded generation</li>
                <li>Submit commissioning form to DNO within 28 days of energisation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor site selection</strong> - insufficient wind or excessive turbulence ruins ROI</li>
                <li><strong>Undersized cables</strong> - voltage drop wastes energy and affects performance</li>
                <li><strong>Missing dump load</strong> - turbine damage when battery full and no grid connection</li>
                <li><strong>Inadequate earthing</strong> - lightning damage risk on elevated turbines</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule3Section4;
