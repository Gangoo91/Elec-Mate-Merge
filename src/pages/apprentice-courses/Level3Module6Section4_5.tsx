import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Temporary Installations - Level 3 Module 6 Section 4.5";
const DESCRIPTION = "Design requirements for temporary electrical installations including construction sites, exhibitions, and events under BS 7671 Sections 704, 711, and 740.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What reduced voltage system is commonly specified for portable hand tools on construction sites?",
    options: [
      "230V single phase",
      "110V centre-tapped earth (CTE) system",
      "400V three-phase",
      "12V SELV"
    ],
    correctIndex: 1,
    explanation: "The 110V CTE system limits the maximum voltage to earth to 55V (half of 110V due to centre-tapped transformer). This significantly reduces shock severity if contact occurs. Yellow equipment and plugs indicate 110V rating."
  },
  {
    id: "check-2",
    question: "What is the maximum RCD operating current for socket outlets at construction sites?",
    options: [
      "100mA",
      "30mA",
      "300mA",
      "10mA"
    ],
    correctIndex: 1,
    explanation: "Regulation 704.411.3.2 requires socket outlet circuits up to 32A to have RCD protection not exceeding 30mA. This applies even to 110V systems, providing additional protection against direct contact in the harsh site environment."
  },
  {
    id: "check-3",
    question: "Exhibition installations require final circuits to be disconnected after the event. Why is this requirement imposed?",
    options: [
      "To save electricity costs",
      "To prevent unauthorised use and eliminate residual fire risk from temporary wiring",
      "It is only a recommendation, not a requirement",
      "To allow the equipment to be reused elsewhere"
    ],
    correctIndex: 1,
    explanation: "Section 711 requires that final circuits be capable of being disconnected individually from the supply when the installation is not in use. This addresses fire risks from temporary connections that may not be to permanent installation standards."
  },
  {
    id: "check-4",
    question: "What special consideration applies to cable routing at outdoor events?",
    options: [
      "Cables can be laid anywhere convenient",
      "Cables must be protected from mechanical damage, vehicle crossing, and weather, with clear routes for emergency access",
      "Only overhead cables are permitted",
      "Cables must be buried at least 1 metre deep"
    ],
    correctIndex: 1,
    explanation: "Outdoor event cables face vehicle traffic, pedestrian footfall, weather exposure, and must not obstruct emergency vehicle access. Cable covers, overhead routing, or duct protection are typically required. Routes must be planned with event safety officers."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671, what voltage system provides the greatest protection for portable tools on construction sites?",
    options: [
      "230V with 30mA RCD",
      "110V centre-tapped earth (CTE) limiting voltage to earth to 55V",
      "400V three-phase with earth monitoring",
      "SELV at 50V AC"
    ],
    correctAnswer: 1,
    explanation: "The 110V CTE system limits the voltage to earth to approximately 55V, making electric shock significantly less dangerous than 230V. Combined with tool construction and RCD protection, this provides comprehensive protection for the harsh construction environment."
  },
  {
    id: 2,
    question: "What minimum IP rating is typically required for temporary distribution equipment on construction sites?",
    options: [
      "IP2X for internal use only",
      "IP44 minimum, often IP55 or IP65 for outdoor exposure",
      "No specific IP rating applies",
      "IP68 mandatory for all equipment"
    ],
    correctAnswer: 1,
    explanation: "Construction site equipment is exposed to dust, water, and rough handling. IP44 is the minimum for protected locations, with IP55 or higher for outdoor positions. Equipment must also be robust enough to withstand the site environment."
  },
  {
    id: 3,
    question: "Exhibition stands often use 'plug-in' temporary wiring systems. What standard governs these installations?",
    options: [
      "BS 7671 Section 701",
      "BS 7671 Section 711 - Exhibitions, Shows and Stands",
      "BS 1363 only",
      "No specific standard applies"
    ],
    correctAnswer: 1,
    explanation: "Section 711 covers temporary electrical installations in exhibitions, shows and stands. It addresses the particular risks of temporary wiring, multiple contractors, and public access, with requirements for protection, documentation, and de-energisation when not in use."
  },
  {
    id: 4,
    question: "What protection measure is mandatory for temporary supplies used for events in outdoor locations?",
    options: [
      "Type D MCBs only",
      "30mA RCD protection on all circuits",
      "Fuses instead of MCBs",
      "No specific protection beyond standard requirements"
    ],
    correctAnswer: 1,
    explanation: "Section 740 (Temporary Installations for Structures, Amusement Devices and Booths at Fairgrounds, etc.) and Section 711 both require 30mA RCD protection. This protects against the elevated shock risks in outdoor, public environments with temporary installations."
  },
  {
    id: 5,
    question: "When supplying a construction site from the DNO network, what type of temporary supply is typically provided?",
    options: [
      "A permanent meter installation",
      "A temporary builders' supply (TBS) from a site pillar or cabinet",
      "Direct connection to street lighting",
      "Generator power only"
    ],
    correctAnswer: 1,
    explanation: "DNOs provide temporary builders' supplies, typically via temporary cabinets or pillars. These supplies include metering and a main protective device. The contractor is responsible for all downstream distribution, protection, and earthing arrangements."
  },
  {
    id: 6,
    question: "What documentation is required before energising a construction site electrical installation?",
    options: [
      "Only a verbal agreement",
      "Electrical Installation Certificate and appropriate notification if required",
      "The site manager's signature only",
      "No documentation is required for temporary installations"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate is required for the temporary distribution system. Part P notification may apply depending on the works. The certificate confirms the installation is safe to energise and provides a record for safety file purposes."
  },
  {
    id: 7,
    question: "A music festival requires power for sound, lighting, and catering. What earthing consideration applies?",
    options: [
      "All equipment can share a single earth point",
      "The various systems may need separate clean earths for audio equipment while maintaining safety earthing",
      "Earthing is not required for temporary events",
      "Only the main stage needs earthing"
    ],
    correctAnswer: 1,
    explanation: "Audio and lighting systems may require separate 'technical' earths to prevent interference, while safety earthing must be maintained. This requires careful design to achieve both electromagnetic compatibility and electrical safety - a common challenge at events."
  },
  {
    id: 8,
    question: "What inspection regime is required during a multi-week construction project?",
    options: [
      "Initial inspection only",
      "Regular inspection throughout the project, typically weekly or as conditions change",
      "Inspection only when problems occur",
      "Final inspection at project completion only"
    ],
    correctAnswer: 1,
    explanation: "Construction sites are dynamic environments where installations may be damaged, modified, or exposed to changing conditions. Regular inspection - typically weekly - ensures ongoing safety. More frequent inspection may be needed in harsh conditions or after incidents."
  },
  {
    id: 9,
    question: "A temporary installation uses a generator as the power source. What protection arrangements apply?",
    options: [
      "Generators don't require protective devices",
      "RCD protection, overcurrent protection, and consideration of the earthing system provided by the generator",
      "Only the generator's internal protection matters",
      "Standard domestic protection is adequate"
    ],
    correctAnswer: 1,
    explanation: "Generator-supplied installations require careful consideration of the earthing arrangement (often IT or TN-S from the generator), RCD protection (which may behave differently without solid earthing), and coordination of protective devices with generator characteristics."
  },
  {
    id: 10,
    question: "What is the purpose of the 'competent person' requirement for event electrical installations?",
    options: [
      "To ensure the cheapest installation",
      "To verify that personnel have appropriate knowledge and skills for the specific risks of temporary event installations",
      "It only applies to permanent buildings",
      "Anyone can install event electrical systems"
    ],
    correctAnswer: 1,
    explanation: "Event electrical work involves specific risks: time pressure, public access, outdoor conditions, and interface with other contractors. Competent persons understand these risks and can deliver safe installations despite the pressures. This is typically verified through relevant qualifications and experience."
  },
  {
    id: 11,
    question: "When must cables crossing vehicle routes at events be protected?",
    options: [
      "Only for heavy vehicles",
      "Always - using appropriate cable protectors, ramps, or overhead/underground routing",
      "Protection is optional",
      "Only during setup and takedown"
    ],
    correctAnswer: 1,
    explanation: "Any cable crossing a vehicle route must be protected to prevent damage from vehicle weight and movement. This applies throughout the event including setup and takedown. Cable ramps also protect pedestrians from tripping hazards."
  },
  {
    id: 12,
    question: "What happens to a construction site's electrical installation when the permanent building supply is connected?",
    options: [
      "The temporary installation can supply the building",
      "The temporary installation should be removed or formally isolated; it cannot supply the permanent works",
      "Both systems can operate in parallel",
      "The temporary installation automatically becomes permanent"
    ],
    correctAnswer: 1,
    explanation: "Temporary and permanent installations must be kept separate. When permanent power is available, the temporary installation should be progressively removed or formally isolated. Temporary wiring cannot become part of the permanent installation without proper installation and certification."
  }
];

const faqs = [
  {
    question: "Who is responsible for electrical safety on a construction site?",
    answer: "The principal contractor has overall responsibility for site safety including electrical. However, electrical contractors have specific responsibility for their installations. A competent person should manage the electrical installation, conduct regular inspections, and ensure all users are trained. Client duties also apply under CDM Regulations. Multiple parties share responsibility, making clear communication and documentation essential."
  },
  {
    question: "Can I use domestic extension leads on a construction site?",
    answer: "No. Domestic extension leads (13A, BS 1363) are not designed for site conditions. They lack mechanical protection, weather resistance, and appropriate ratings. Construction sites should use industrial connectors (typically BS EN 60309 - round pin, colour-coded) and cables rated for tough use. 110V equipment with yellow connectors is standard for portable tools."
  },
  {
    question: "How do I calculate the size of temporary supply needed for a construction site?",
    answer: "Estimate maximum demand considering: tower cranes (if any), hoists, welfare facilities, small power tools, site lighting, and office equipment. Apply appropriate diversity factors as multiple loads rarely operate simultaneously. Consult the DNO for available supply options. A 63A or 100A three-phase supply covers many medium sites. Large sites may need multiple supplies or on-site transformers."
  },
  {
    question: "What are the main electrical risks at outdoor events?",
    answer: "Key risks include: weather exposure affecting equipment and cables, vehicle and pedestrian damage to cables, public access to electrical equipment, time pressure causing shortcuts, multiple contractors with varying competence, and temporary structures with poor earthing connections. Risk assessment should address each of these and specify appropriate controls."
  },
  {
    question: "Do temporary installations need periodic inspection and testing?",
    answer: "Yes, but the period is typically shorter than permanent installations. BS 7671 Appendix 6 suggests 3 months for construction site installations. In practice, visual inspection should be more frequent (weekly or daily in harsh conditions). Formal testing after significant modifications or damage is also required. Outdoor event installations should be tested before each event."
  },
  {
    question: "What training is needed for construction site electricians?",
    answer: "Beyond standard electrical qualifications, site electricians should understand: construction site electrical systems (110V, temporary supplies, site distribution), site safety procedures (CDM Regulations, site inductions, permits), temporary installation requirements (BS 7671 Section 704), and inspection and testing of temporary systems. Many employers require specific site electrical competency cards."
  }
];

const Level3Module6Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>110V CTE:</strong> Standard for site tools - 55V max to earth</li>
              <li><strong>30mA RCDs:</strong> Required for all temporary installation socket circuits</li>
              <li><strong>IP44 Minimum:</strong> Higher ratings for exposed outdoor locations</li>
              <li><strong>Regular Inspection:</strong> Weekly or more frequently on active sites</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Damaged cables, exposed conductors, missing covers</li>
              <li><strong>Use:</strong> Industrial connectors (BS EN 60309) not domestic plugs</li>
              <li><strong>Apply:</strong> Cable protection at every vehicle crossing point</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Construction Site Electrical Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Construction sites present some of the most challenging environments for electrical safety. The combination of temporary installations, harsh conditions, inexperienced users, and constantly changing layouts creates elevated risks that BS 7671 Section 704 specifically addresses.
            </p>
            <p>
              The fundamental principle is risk reduction through voltage limitation and comprehensive protection. The 110V centre-tapped earth (CTE) system has become the UK standard for portable tools, dramatically reducing shock severity compared to 230V supplies.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">110V Centre-Tapped Earth System:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">How It Works</p>
                  <p className="text-white/90">A transformer produces 110V between lines, with the centre point of the secondary winding connected to earth. This limits the maximum voltage to earth to 55V (half of 110V).</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Why 55V Is Safer</p>
                  <p className="text-white/90">At 55V, the current through a person (even with wet hands) is significantly lower than at 230V. Combined with time limits, the risk of ventricular fibrillation is dramatically reduced.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Equipment Identification</p>
                  <p className="text-white/90">110V equipment and plugs are coloured yellow to distinguish from other voltages. 230V is blue, 400V three-phase is red. This colour coding prevents dangerous mix-ups.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Typical Applications</p>
                  <p className="text-white/90">Portable tools (drills, grinders, saws), task lighting, small plant items. Fixed equipment (tower cranes, hoists, welfare) may use 400V with appropriate protection.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The 110V system doesn't eliminate shock risk - it reduces it. RCD protection is still required on site socket outlets, and equipment must still be properly maintained and inspected.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Site Distribution and Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Construction site distribution typically follows a hierarchy: incoming supply from DNO, main distribution board, sub-distribution boards serving work areas, and transformer/distribution units providing 110V at the point of use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Site Distribution Hierarchy:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li><strong>1. Temporary builders' supply:</strong> DNO provides metered supply, typically 3-phase</li>
                <li><strong>2. Main distribution board:</strong> Located in secure compound, supplies site backbone</li>
                <li><strong>3. Sub-distribution:</strong> Distribution boards serving work areas</li>
                <li><strong>4. Transformer units:</strong> 230V/400V to 110V CTE transformation</li>
                <li><strong>5. Socket outlets:</strong> 110V yellow sockets for tool connection</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Protection Requirements (Section 704):</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Socket Outlets up to 32A</p>
                  <p className="text-white/90">RCD protection not exceeding 30mA (Regulation 704.411.3.2)</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Socket Outlets 32-63A</p>
                  <p className="text-white/90">RCD protection not exceeding 30mA or 110V CTE supply</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Socket Outlets over 63A</p>
                  <p className="text-white/90">RCD protection at appropriate rating with suitable disconnection time</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Fixed Equipment (400V)</p>
                  <p className="text-white/90">Protection coordinated with equipment characteristics; RCDs where touch contact possible</p>
                </div>
              </div>
            </div>

            <p>
              Distribution equipment must be suitable for the site environment. This typically means IP44 minimum (IP55 or IP65 for exposed outdoor positions), robust enclosures capable of withstanding site handling, and industrial connectors to BS EN 60309.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Exhibitions and Events
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Exhibitions, shows, and outdoor events present distinct challenges from construction sites. The temporary nature is similar, but public access, aesthetic requirements, and the involvement of multiple contractors add complexity. BS 7671 addresses these in Sections 711 (Exhibitions) and 740 (Fairgrounds).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Key Exhibition Requirements (Section 711):</p>
              <ul className="text-sm text-white/90 space-y-2 ml-4">
                <li><strong>RCD Protection:</strong> 30mA RCDs required for all circuits</li>
                <li><strong>Isolation:</strong> Means to disconnect individual stands and the whole installation</li>
                <li><strong>De-energisation:</strong> Final circuits capable of being disconnected when not in use</li>
                <li><strong>Luminaire mounting:</strong> At least 2.5m above floor unless protected or low voltage</li>
                <li><strong>Cable protection:</strong> Mechanical protection for floor-level cables</li>
                <li><strong>Inspection:</strong> Visual inspection before opening to public each day</li>
              </ul>
            </div>

            <p>
              Outdoor events add weather protection requirements. All equipment must be suitable for outdoor use with appropriate IP ratings. Cable routes must consider vehicle access, pedestrian traffic, and emergency evacuation paths.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Event Cable Management:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Use cable protectors (ramps) at all pedestrian and vehicle crossings</li>
                <li>Route cables along fence lines or structure edges where possible</li>
                <li>Overhead routing preferred where practical (minimum 5.8m for vehicle access)</li>
                <li>Mark all cable routes and bury/protect cables in vehicle trafficking areas</li>
                <li>Maintain clear emergency access routes without cable obstructions</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A county show has multiple exhibitor tents, a main arena, and food vendors. The electrical installation includes a main distribution compound (fenced, locked), sub-distributions at each area, and individual supplies to each stand. All supplies are metered for recharge, protected by 30mA RCDs, and can be isolated individually and collectively.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Generators and Standalone Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many temporary installations rely on generators for power - either as the primary supply or as backup. Generator-supplied installations require careful consideration of earthing arrangements and protection coordination, as the characteristics differ from mains supplies.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Generator Earthing Options:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Isolated (IT) System</p>
                  <p className="text-white/90">Generator neutral not connected to earth. First fault doesn't cause disconnection but must be detected. Requires insulation monitoring. Not common in UK temporary installations.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">TN-S System</p>
                  <p className="text-white/90">Generator neutral connected to generator frame earth. Fault loop impedance through generator and cabling. Most common arrangement - functions similarly to mains TN-S.</p>
                </div>
              </div>
            </div>

            <p>
              RCD protection with generator supplies requires attention. Unlike mains supplies with solid earthing, generator earth impedance may be higher, affecting RCD operation. Testing should verify correct operation in the actual installation configuration.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Generator Installation Considerations:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Position generators on firm, level ground with adequate ventilation</li>
                <li>Ensure exhaust gases cannot enter occupied areas</li>
                <li>Provide adequate fuel storage with appropriate fire precautions</li>
                <li>Earth the generator frame and establish the supply earthing arrangement</li>
                <li>Verify RCD operation with the generator actually running</li>
                <li>Consider noise impact on neighbours and venue restrictions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Generator characteristics (voltage regulation, frequency stability, fault current capacity) affect equipment operation. Sensitive electronic equipment may need power conditioning. Large motor starting may cause voltage dip issues on smaller generators.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Site Setup</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Order temporary supply early - DNO lead times can be weeks</li>
                <li>Plan distribution layout considering phases of construction</li>
                <li>Locate main distribution in secure, accessible compound</li>
                <li>Provide adequate 110V transformation capacity for tool usage</li>
                <li>Install clear labelling showing voltage, circuit function, and isolation points</li>
                <li>Establish inspection and testing regime before site opens</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Event Electrical Coordination</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Survey venue early - assess supply capacity and access points</li>
                <li>Coordinate with event safety officer on cable routes and emergency access</li>
                <li>Schedule installation allowing time for testing before event opening</li>
                <li>Brief all exhibitors on electrical safety and connection procedures</li>
                <li>Maintain competent electrical presence throughout event</li>
                <li>Plan de-rigging to maintain safety during takedown</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic equipment on site</strong> - Using 13A leads and equipment rated for indoor domestic use</li>
                <li><strong>Missing RCD protection</strong> - Omitting 30mA RCDs on temporary socket outlets</li>
                <li><strong>Unprotected cables</strong> - Cables across vehicle routes without ramps or protection</li>
                <li><strong>Inadequate inspection</strong> - Not checking installations as conditions change</li>
                <li><strong>Poor documentation</strong> - No records of temporary installation or modifications</li>
                <li><strong>Mixed voltages</strong> - 230V tools on sites that should be 110V only</li>
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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Requirements</p>
                <ul className="space-y-0.5">
                  <li>110V CTE for portable tools</li>
                  <li>30mA RCD for socket outlets</li>
                  <li>IP44+ for site equipment</li>
                  <li>Weekly inspection minimum</li>
                  <li>Cable protection at crossings</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Section 704 - Construction sites</li>
                  <li>Section 711 - Exhibitions</li>
                  <li>Section 740 - Fairgrounds</li>
                  <li>Regulation 704.411.3.2 - RCD protection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4-4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: EV Charging Points
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section5">
              Next: Section 5 - Documentation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section4_5;
