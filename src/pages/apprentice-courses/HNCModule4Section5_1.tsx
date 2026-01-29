import { ArrowLeft, Server, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "LV Switchgear Selection - HNC Module 4 Section 5.1";
const DESCRIPTION = "Master LV switchgear selection for building services: main switchboards, form of separation, IP ratings, fault ratings and type-tested assemblies.";

const quickCheckQuestions = [
  {
    id: "form-4",
    question: "Which form of separation provides separate compartments for busbars, functional units AND terminals?",
    options: ["Form 1", "Form 2", "Form 3", "Form 4"],
    correctIndex: 3,
    explanation: "Form 4 provides the highest level of internal separation with distinct compartments for busbars, functional units and terminals, allowing safe access to one section without exposure to others."
  },
  {
    id: "ip-rating",
    question: "What does an IP rating of IP54 indicate?",
    options: ["Dust tight, splash proof", "Dust protected, water jet proof", "Dust tight, water jet proof", "Dust protected, splash proof"],
    correctIndex: 3,
    explanation: "IP54 means protected against dust ingress (5) and protected against splashing water from all directions (4). The first digit is solids protection (0-6), second is liquids (0-8)."
  },
  {
    id: "fault-rating",
    question: "What does the 'Icw' rating of switchgear represent?",
    options: ["Making capacity", "Breaking capacity", "Short-time withstand", "Peak withstand"],
    correctIndex: 2,
    explanation: "Icw is the rated short-time withstand current - the RMS value of current the assembly can carry for a specified time (typically 1 second) without damage. This is crucial for discrimination."
  },
  {
    id: "type-tested",
    question: "What standard governs type-tested LV switchgear assemblies?",
    options: ["BS 7671", "BS EN 61439", "BS 88", "BS EN 60947"],
    correctIndex: 1,
    explanation: "BS EN 61439 covers low-voltage switchgear and controlgear assemblies, replacing the previous BS EN 60439. It defines requirements for type-tested assemblies (TTA)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of main switchboard in a building?",
    options: [
      "To provide emergency lighting",
      "To receive and distribute the incoming electrical supply",
      "To generate backup power",
      "To monitor energy consumption"
    ],
    correctAnswer: 1,
    explanation: "The main switchboard (MSB) receives the incoming supply from the DNO and distributes it to sub-mains and final circuits throughout the building. It houses the main protective devices and metering."
  },
  {
    id: 2,
    question: "Form 1 switchgear provides:",
    options: [
      "No internal separation",
      "Separation between busbars and functional units",
      "Separation between all functional units",
      "Separate terminals for each unit"
    ],
    correctAnswer: 0,
    explanation: "Form 1 has no internal separation - all components are in a single common compartment. This is the most basic form, suitable where work will only be done with all circuits isolated."
  },
  {
    id: 3,
    question: "Why would you specify Form 3b separation?",
    options: [
      "To reduce cost",
      "To allow access to terminals while other units remain live",
      "To enable withdrawal of units under load",
      "For outdoor installations only"
    ],
    correctAnswer: 1,
    explanation: "Form 3b provides separation between busbars and functional units, plus separation of terminals from busbars but not from each other. This allows terminal access without busbar exposure."
  },
  {
    id: 4,
    question: "What IP rating is typically required for switchgear in a general plant room?",
    options: ["IP2X minimum", "IP3X minimum", "IP4X minimum", "IP5X minimum"],
    correctAnswer: 0,
    explanation: "IP2X (protection against finger contact with live parts) is the minimum for general indoor locations. Plant rooms typically require IP2X to IP3X depending on environmental conditions."
  },
  {
    id: 5,
    question: "The prospective fault current (PFC) at a switchboard is 25kA. What minimum fault rating should the switchgear have?",
    options: ["20kA", "25kA", "32kA", "50kA"],
    correctAnswer: 1,
    explanation: "Switchgear must have a fault rating at least equal to the PFC at the point of installation. With 25kA PFC, you need minimum 25kA rated equipment, though specifying higher provides a safety margin."
  },
  {
    id: 6,
    question: "What does 'partially type-tested assembly' (PTTA) mean?",
    options: [
      "The assembly failed some tests",
      "Only the enclosure was tested",
      "Verification based on tested components plus design rules",
      "The assembly requires further testing on site"
    ],
    correctAnswer: 2,
    explanation: "PTTA verification combines type-tested components with design rules and calculations from BS EN 61439 to verify performance without full assembly testing. This is common for modified standard designs."
  },
  {
    id: 7,
    question: "Which busbar configuration provides the best continuity of supply?",
    options: [
      "Single busbar",
      "Single busbar with bus section",
      "Duplicate busbars with bus coupler",
      "Ring busbar"
    ],
    correctAnswer: 2,
    explanation: "Duplicate busbars with bus coupler allows either busbar to supply all loads. If one busbar or its incomer fails, the coupler closes to maintain supply from the healthy busbar."
  },
  {
    id: 8,
    question: "What clearance is required in front of switchgear for safe operation?",
    options: ["500mm minimum", "700mm minimum", "900mm minimum", "1200mm minimum"],
    correctAnswer: 1,
    explanation: "BS 7671 requires 700mm minimum clear working space in front of switchgear. This allows safe operation, access for testing, and emergency escape."
  },
  {
    id: 9,
    question: "When is IP65 rated switchgear required?",
    options: [
      "Standard plant rooms",
      "Wash-down areas or external locations",
      "IT equipment rooms",
      "Domestic installations"
    ],
    correctAnswer: 1,
    explanation: "IP65 (dust tight, protected against water jets) is specified for harsh environments including external locations, wash-down areas in food processing, and similar applications with water exposure."
  },
  {
    id: 10,
    question: "What is the purpose of arc fault containment in modern switchgear?",
    options: [
      "To reduce noise levels",
      "To improve energy efficiency",
      "To protect personnel and limit damage during internal faults",
      "To simplify maintenance procedures"
    ],
    correctAnswer: 2,
    explanation: "Arc fault containment features (arc vents, reinforced construction, flame-retardant materials) protect personnel and limit damage if an internal arc fault occurs, directing energy safely away from operators."
  }
];

const faqs = [
  {
    question: "What is the difference between Form 2 and Form 3 separation?",
    answer: "Form 2 separates busbars from functional units but provides no separation between functional units themselves. Form 3 adds separation between each functional unit, so work can be done on one unit without risk from adjacent units. Form 3b further separates terminals from busbars."
  },
  {
    question: "How do I determine the required fault rating for a switchboard?",
    answer: "Request the prospective fault current (PFC) from the DNO for new supplies, or have it calculated/measured. The switchgear must have fault ratings (Icu, Ics, Icw) at least equal to the PFC. Consider future network changes that might increase PFC and specify appropriate margins."
  },
  {
    question: "When should I specify withdrawable circuit breakers versus fixed?",
    answer: "Withdrawable units cost more but allow maintenance without complete shutdown. Specify them for critical circuits where downtime must be minimised, or where frequent testing/maintenance is required. Fixed units are suitable where planned shutdown for maintenance is acceptable."
  },
  {
    question: "What ventilation is required for switchrooms?",
    answer: "Calculate heat dissipation from all equipment and size ventilation to maintain temperature below 35°C ambient. Typical switchgear dissipates 2-5W per amp of rated current. Natural ventilation often suffices for smaller installations; larger switchrooms may need mechanical cooling."
  }
];

const HNCModule4Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Server className="h-4 w-4" />
            <span>Module 4.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            LV Switchgear Selection
          </h1>
          <p className="text-white/80">
            Specifying main switchboards and distribution equipment for reliable, safe power distribution
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Main switchboard:</strong> Receives DNO supply, distributes to building</li>
              <li className="pl-1"><strong>Form of separation:</strong> 1-4 defines internal compartmentalisation</li>
              <li className="pl-1"><strong>IP rating:</strong> Protection against solids and liquids</li>
              <li className="pl-1"><strong>Fault rating:</strong> Must exceed prospective fault current</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Standard:</strong> BS EN 61439 for type-tested assemblies</li>
              <li className="pl-1"><strong>Clearances:</strong> 700mm minimum working space</li>
              <li className="pl-1"><strong>Environment:</strong> IP rating matched to location</li>
              <li className="pl-1"><strong>Future-proofing:</strong> 20-30% spare capacity typical</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand main switchboard functions and configurations",
              "Select appropriate form of separation for each application",
              "Specify IP ratings based on environmental conditions",
              "Determine fault ratings from prospective fault current data",
              "Distinguish type-tested from partially type-tested assemblies",
              "Apply BS EN 61439 requirements to switchgear specifications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Main Switchboards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Main Switchboards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The main switchboard (MSB) is the central point for power distribution in a building.
              It receives the incoming supply from the Distribution Network Operator (DNO) and
              distributes power to sub-mains and final circuits throughout the installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Main switchboard functions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">House main incoming device and DNO metering equipment</li>
                <li className="pl-1">Provide main isolation point for the entire installation</li>
                <li className="pl-1">Distribute power to sub-distribution boards and major loads</li>
                <li className="pl-1">Incorporate protective devices for fault current interruption</li>
                <li className="pl-1">Enable measurement and monitoring of power quality</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switchboard Configurations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single busbar</td>
                      <td className="border border-white/10 px-3 py-2">One set of busbars serving all circuits</td>
                      <td className="border border-white/10 px-3 py-2">Standard buildings, non-critical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bus section</td>
                      <td className="border border-white/10 px-3 py-2">Single busbar split by section switch</td>
                      <td className="border border-white/10 px-3 py-2">Partial shutdown for maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duplicate busbar</td>
                      <td className="border border-white/10 px-3 py-2">Two busbars with bus coupler</td>
                      <td className="border border-white/10 px-3 py-2">Critical facilities, high availability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ring busbar</td>
                      <td className="border border-white/10 px-3 py-2">Busbars form closed ring</td>
                      <td className="border border-white/10 px-3 py-2">Maximum resilience, dual-fed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Always specify 20-30% spare capacity in switchboards for future expansion. Adding ways later is expensive and disruptive.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Form of Separation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Form of Separation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The form of separation defines the internal compartmentalisation of switchgear assemblies.
              Higher forms provide greater safety for maintenance personnel by isolating different
              sections within the assembly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Forms of Internal Separation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Form</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Separation Provided</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 1</td>
                      <td className="border border-white/10 px-3 py-2">No internal separation</td>
                      <td className="border border-white/10 px-3 py-2">Small DBs, full isolation for work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 2a</td>
                      <td className="border border-white/10 px-3 py-2">Busbars separated from functional units</td>
                      <td className="border border-white/10 px-3 py-2">Standard distribution boards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 2b</td>
                      <td className="border border-white/10 px-3 py-2">As 2a plus terminals in same compartment</td>
                      <td className="border border-white/10 px-3 py-2">Standard distribution boards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 3a</td>
                      <td className="border border-white/10 px-3 py-2">Busbars and all units separated</td>
                      <td className="border border-white/10 px-3 py-2">Main switchboards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 3b</td>
                      <td className="border border-white/10 px-3 py-2">As 3a plus terminals separate from busbars</td>
                      <td className="border border-white/10 px-3 py-2">Main switchboards, live working</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 4a</td>
                      <td className="border border-white/10 px-3 py-2">All separate including terminals in unit</td>
                      <td className="border border-white/10 px-3 py-2">Critical installations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 4b</td>
                      <td className="border border-white/10 px-3 py-2">All separate including external terminals</td>
                      <td className="border border-white/10 px-3 py-2">Highest safety requirement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Specify Higher Forms</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maintenance on live equipment required</li>
                  <li className="pl-1">Multiple maintenance teams working</li>
                  <li className="pl-1">Critical loads cannot be interrupted</li>
                  <li className="pl-1">Client specification requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Form 4 typically 40-60% more than Form 2</li>
                  <li className="pl-1">Larger footprint for higher forms</li>
                  <li className="pl-1">Balance safety against budget</li>
                  <li className="pl-1">Consider operational requirements</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Form 3b is commonly specified for main switchboards where occasional terminal work may be needed without complete shutdown.
            </p>
          </div>
        </section>

        {/* Section 3: IP Ratings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IP Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IP (Ingress Protection) ratings define the level of protection an enclosure provides
              against solid objects and liquids. Correct IP selection ensures equipment reliability
              in its intended environment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Rating Structure: IP XY</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">First Digit (X) - Solids</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>0:</strong> No protection</li>
                    <li><strong>1:</strong> Objects &gt;50mm</li>
                    <li><strong>2:</strong> Objects &gt;12.5mm (fingers)</li>
                    <li><strong>3:</strong> Objects &gt;2.5mm (tools)</li>
                    <li><strong>4:</strong> Objects &gt;1mm (wires)</li>
                    <li><strong>5:</strong> Dust protected</li>
                    <li><strong>6:</strong> Dust tight</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Second Digit (Y) - Liquids</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>0:</strong> No protection</li>
                    <li><strong>1:</strong> Vertical drips</li>
                    <li><strong>2:</strong> Drips at 15° angle</li>
                    <li><strong>3:</strong> Spraying water</li>
                    <li><strong>4:</strong> Splashing water</li>
                    <li><strong>5:</strong> Water jets</li>
                    <li><strong>6:</strong> Powerful water jets</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Ratings for Building Services Locations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dedicated switchroom</td>
                      <td className="border border-white/10 px-3 py-2">IP2X</td>
                      <td className="border border-white/10 px-3 py-2">Controlled access, clean environment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General plant room</td>
                      <td className="border border-white/10 px-3 py-2">IP3X to IP4X</td>
                      <td className="border border-white/10 px-3 py-2">Tools may be present, some dust</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Car park</td>
                      <td className="border border-white/10 px-3 py-2">IP54</td>
                      <td className="border border-white/10 px-3 py-2">Dust and splash from vehicles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial kitchen</td>
                      <td className="border border-white/10 px-3 py-2">IP55/IP65</td>
                      <td className="border border-white/10 px-3 py-2">Wash-down cleaning procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External (sheltered)</td>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                      <td className="border border-white/10 px-3 py-2">Rain ingress risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External (exposed)</td>
                      <td className="border border-white/10 px-3 py-2">IP65/IP66</td>
                      <td className="border border-white/10 px-3 py-2">Direct weather exposure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> IP rating applies to the complete assembly when closed. Doors open for operation reduce protection - consider additional measures for harsh environments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Fault Ratings and Type Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fault Ratings and Type-Tested Assemblies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Switchgear must withstand and interrupt fault currents safely. Understanding fault
              ratings ensures equipment selection matches the prospective fault current (PFC)
              at each location in the installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Fault Current Ratings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Name</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Significance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Icu</td>
                      <td className="border border-white/10 px-3 py-2">Ultimate breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Maximum fault current device can break</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ics</td>
                      <td className="border border-white/10 px-3 py-2">Service breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Breaking capacity for continued use</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Icw</td>
                      <td className="border border-white/10 px-3 py-2">Short-time withstand</td>
                      <td className="border border-white/10 px-3 py-2">Current assembly can carry for 1 second</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ipk</td>
                      <td className="border border-white/10 px-3 py-2">Peak withstand</td>
                      <td className="border border-white/10 px-3 py-2">Peak value of fault current tolerated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical PFC Values in Building Services</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>At DNO transformer:</strong> 25-50kA (check with DNO)</li>
                <li className="pl-1"><strong>Main switchboard:</strong> 25-40kA typically</li>
                <li className="pl-1"><strong>Sub-distribution boards:</strong> 10-25kA</li>
                <li className="pl-1"><strong>Final distribution:</strong> 6-16kA</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 61439 Assembly Types</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Type-Tested Assembly (TTA)</p>
                  <ul className="text-sm space-y-1">
                    <li>Complete assembly tested to standard</li>
                    <li>Design verified by physical testing</li>
                    <li>Standard designs from manufacturers</li>
                    <li>Highest assurance level</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Partially Type-Tested (PTTA)</p>
                  <ul className="text-sm space-y-1">
                    <li>Based on type-tested components</li>
                    <li>Verification by calculation/rules</li>
                    <li>Allows customisation</li>
                    <li>Common for bespoke assemblies</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Verification requirements:</strong> BS EN 61439 specifies 13 design verifications including temperature rise, dielectric properties, short-circuit withstand, and EMC compliance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Specifying Form of Separation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A main switchboard serves a hospital with 24/7 operations. Maintenance must be possible with minimum disruption.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Requirements analysis:</p>
                <p>• Critical loads cannot be interrupted</p>
                <p>• Maintenance teams need safe access</p>
                <p>• Cable termination work may be needed</p>
                <p className="mt-2">Recommendation: <strong>Form 3b minimum</strong></p>
                <p className="text-white/60">Allows terminal access without busbar exposure</p>
                <p className="text-white/60">Consider Form 4b for maximum safety</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: IP Rating Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Distribution board in a multi-storey car park riser cupboard.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Environmental assessment:</p>
                <p>• Vehicle exhaust particles and dust</p>
                <p>• Possible water ingress from cleaning</p>
                <p>• No direct weather exposure</p>
                <p className="mt-2">Analysis:</p>
                <p>Solids: IP5X needed (dust protected)</p>
                <p>Liquids: IP X4 minimum (splashing)</p>
                <p className="mt-2">Specification: <strong>IP54 minimum</strong></p>
                <p className="text-green-400">Consider IP55 for extra margin</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Fault Rating Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> DNO confirms PFC at intake is 32kA. Select main switchboard fault rating.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: PFC = 32kA RMS</p>
                <p>Peak factor (k) typically 2.2</p>
                <p>Peak current = 32 × 2.2 = 70.4kA</p>
                <p className="mt-2">Minimum ratings required:</p>
                <p>Icw ≥ 32kA (1 second)</p>
                <p>Ipk ≥ 70.4kA</p>
                <p className="mt-2">Specification: <strong>40kA/1s rated switchboard</strong></p>
                <p className="text-white/60">25% margin for future network changes</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Switchroom Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>700mm minimum</strong> clear working space in front of switchgear</li>
                <li className="pl-1"><strong>600mm minimum</strong> clear space at rear if access required</li>
                <li className="pl-1">Door opening outward for emergency escape</li>
                <li className="pl-1">Adequate ventilation for heat dissipation</li>
                <li className="pl-1">Fire-resistant construction (typically 1 hour)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Rated voltage and frequency (230/400V, 50Hz)</li>
                <li className="pl-1">Rated current (main busbar and outgoing ways)</li>
                <li className="pl-1">Short-circuit ratings (Icw, Ipk)</li>
                <li className="pl-1">Form of separation required</li>
                <li className="pl-1">IP rating for the environment</li>
                <li className="pl-1">Number and rating of outgoing ways</li>
                <li className="pl-1">Metering and monitoring requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Specification Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Under-rating fault level</strong> - Always verify PFC with DNO</li>
                <li className="pl-1"><strong>Wrong IP for environment</strong> - Site survey essential</li>
                <li className="pl-1"><strong>Insufficient spare ways</strong> - Plan for 20-30% growth</li>
                <li className="pl-1"><strong>Ignoring access requirements</strong> - Operational needs matter</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Form of Separation</p>
                <ul className="space-y-0.5">
                  <li>Form 1 - No separation</li>
                  <li>Form 2 - Busbars separated</li>
                  <li>Form 3 - Units separated</li>
                  <li>Form 4 - All sections separate</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 61439 - Assemblies</li>
                  <li>BS EN 60947 - Switchgear devices</li>
                  <li>BS 7671 - Installation requirements</li>
                  <li>IEC 60529 - IP ratings</li>
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

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5-2">
              Next: Distribution Board Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section5_1;
