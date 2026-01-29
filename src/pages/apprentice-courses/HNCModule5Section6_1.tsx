import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Site Organisation - HNC Module 5 Section 6.1";
const DESCRIPTION = "Master site organisation for building services projects: site facilities, welfare provisions, security arrangements, access control, and temporary services coordination under CDM regulations.";

const quickCheckQuestions = [
  {
    id: "welfare-cdm",
    question: "Under CDM 2015, who has the primary duty to provide welfare facilities on site?",
    options: ["The client", "The principal designer", "The principal contractor", "The building services contractor"],
    correctIndex: 2,
    explanation: "The principal contractor has the primary duty under CDM 2015 to provide adequate welfare facilities for all workers on the construction site."
  },
  {
    id: "compound-layout",
    question: "What is the primary consideration when planning site compound layout?",
    options: ["Minimising land rental costs", "Maximising storage capacity", "Maintaining safe traffic and pedestrian segregation", "Locating nearest to the building entrance"],
    correctIndex: 2,
    explanation: "Safe segregation of vehicle and pedestrian routes is the primary safety consideration in compound layout planning to prevent struck-by incidents."
  },
  {
    id: "temp-electrical",
    question: "What voltage is required for portable tools on construction sites under BS 7671?",
    options: ["230V single phase", "110V centre-tapped earth", "400V three phase", "50V SELV"],
    correctIndex: 1,
    explanation: "110V centre-tapped earth (CTE) is the standard for portable tools on UK construction sites, limiting shock voltage to 55V to earth."
  },
  {
    id: "access-control",
    question: "An induction is required before site access primarily to:",
    options: ["Check qualifications", "Issue PPE", "Communicate site-specific hazards and rules", "Register for payroll"],
    correctIndex: 2,
    explanation: "Site inductions ensure all workers understand site-specific hazards, emergency procedures, and rules before starting work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to CDM 2015, welfare facilities must include which minimum provisions?",
    options: [
      "Toilets, washing facilities, drinking water, rest area, changing rooms",
      "Toilets and drinking water only",
      "Toilets, washing facilities, and first aid",
      "Rest area and canteen facilities only"
    ],
    correctAnswer: 0,
    explanation: "CDM 2015 Schedule 2 specifies minimum welfare requirements: sanitary conveniences, washing facilities, drinking water, changing rooms/lockers, and facilities for rest."
  },
  {
    id: 2,
    question: "How many sanitary conveniences are required for up to 25 workers under CDM 2015?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0,
    explanation: "CDM 2015 guidance recommends minimum 1 toilet per 7 males or 1 per 25 if urinals also provided, and 1 per 7 females. For mixed sites up to 25, minimum 1 is required."
  },
  {
    id: 3,
    question: "Temporary electrical supplies on construction sites should be installed in accordance with:",
    options: ["BS 7671 only", "BS 7671 and BS 7909", "HSE guidance only", "Site manager's discretion"],
    correctAnswer: 1,
    explanation: "BS 7671 provides general requirements whilst BS 7909 gives specific guidance for temporary electrical installations at events and construction sites."
  },
  {
    id: 4,
    question: "The recommended maximum cable run for 110V supplies on site is:",
    options: ["25 metres", "50 metres", "100 metres", "No specific limit"],
    correctAnswer: 2,
    explanation: "While there's no absolute limit, 100 metres is typically the practical maximum for 110V supplies to maintain acceptable voltage drop and protection."
  },
  {
    id: 5,
    question: "A site compound fire assembly point should be:",
    options: [
      "Inside the compound near the office",
      "At a safe distance from the compound with clear access",
      "At the site entrance gate",
      "Wherever space allows"
    ],
    correctAnswer: 1,
    explanation: "Fire assembly points must be at a safe distance from potential fire hazards, clearly signed, and with clear access for emergency services."
  },
  {
    id: 6,
    question: "Temporary water supplies on construction sites typically require:",
    options: [
      "Connection to mains only",
      "Bowser tanks only",
      "Either mains connection or bowser with appropriate treatment",
      "Bottled water provision"
    ],
    correctAnswer: 2,
    explanation: "Temporary water can be supplied via mains connection or bowser tanks. Bowser water for drinking must be treated and regularly tested."
  },
  {
    id: 7,
    question: "What is the minimum illumination level required in welfare facilities?",
    options: ["50 lux", "100 lux", "150 lux", "200 lux"],
    correctAnswer: 2,
    explanation: "HSE guidance recommends minimum 150 lux in welfare facilities to enable safe use of facilities and reading of safety notices."
  },
  {
    id: 8,
    question: "Site security fencing should typically be a minimum height of:",
    options: ["1.2 metres", "1.8 metres", "2.0 metres", "2.4 metres"],
    correctAnswer: 2,
    explanation: "2.0 metres is the recommended minimum height for site security fencing to deter unauthorised access and protect the public."
  },
  {
    id: 9,
    question: "Hot work permits are required when working within what distance of combustible materials?",
    options: ["3 metres", "6 metres", "10 metres", "15 metres"],
    correctAnswer: 2,
    explanation: "Hot work permits are typically required when working within 10 metres of combustible materials, though this may vary by site rules."
  },
  {
    id: 10,
    question: "Material storage areas should be positioned:",
    options: [
      "At the furthest point from the building",
      "Adjacent to delivery access with good ground conditions",
      "Inside the building under construction",
      "Outside the site compound"
    ],
    correctAnswer: 1,
    explanation: "Storage areas should be accessible for deliveries, on firm level ground, and positioned to minimise double-handling of materials."
  },
  {
    id: 11,
    question: "The Construction Logistics and Community Safety (CLOCS) standard primarily addresses:",
    options: [
      "Material ordering procedures",
      "Safe vehicle movements and driver competence",
      "Community consultation requirements",
      "Environmental protection"
    ],
    correctAnswer: 1,
    explanation: "CLOCS focuses on construction vehicle safety, particularly protecting vulnerable road users through driver training, vehicle standards, and route planning."
  },
  {
    id: 12,
    question: "Temporary electrical distribution boards on site must be:",
    options: [
      "Protected by 30mA RCD only",
      "IP44 rated minimum and 30mA RCD protected",
      "Located inside site cabins only",
      "Protected by fuses rather than MCBs"
    ],
    correctAnswer: 1,
    explanation: "Site distribution equipment must be minimum IP44 rated for outdoor use and all socket circuits protected by 30mA RCDs for personal protection."
  }
];

const faqs = [
  {
    question: "Who is responsible for site welfare facilities on a multi-contractor project?",
    answer: "The principal contractor has overall responsibility for welfare provisions under CDM 2015. However, the client must ensure adequate arrangements are in place before work starts, and individual contractors must not obstruct welfare access. On larger projects, welfare costs are often shared through preliminaries or levies."
  },
  {
    question: "Can 230V equipment be used on construction sites?",
    answer: "Yes, but only where it's fixed installation or where 110V is impractical. Fixed 230V equipment must have appropriate RCD protection. Some specialist equipment (large power tools, welding equipment) may operate at 230V or 400V with specific risk assessments and additional safety measures including RCDs and competent operators."
  },
  {
    question: "What records should be kept for temporary electrical installations?",
    answer: "Records should include: initial installation certificate, periodic inspection records (typically every 3 months), PAT testing records for portable equipment, fault logs, and any modifications. These demonstrate compliance with CDM and Electricity at Work Regulations."
  },
  {
    question: "How often should site security be reviewed?",
    answer: "Security arrangements should be reviewed: weekly as part of site inspections, after any security incidents, when site layout changes, when valuable materials/equipment arrive, and at key project phases. Night-time security may need enhancement during sensitive fit-out phases."
  },
  {
    question: "What temporary services coordination is needed between trades?",
    answer: "The principal contractor should establish a temporary services strategy covering: power distribution routing, transformer locations, water supply points, compressed air if required, temporary heating, data/communications, and phased handover as permanent services come online. Regular coordination meetings prevent conflicts."
  },
  {
    question: "What are the requirements for site cabins and offices?",
    answer: "Site accommodation must be: structurally sound, weatherproof, adequately heated (minimum 16 degrees for sedentary work), ventilated, lit to appropriate standards, with emergency exits. Offices need data connections, meeting space, and secure document storage. Welfare units need hot water, adequate heating, and proper drainage."
  }
];

const HNCModule5Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Site Organisation
          </h1>
          <p className="text-white/80">
            Site facilities, welfare provisions, security arrangements, access control and temporary services coordination
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Principal contractor:</strong> Responsible for welfare and site setup</li>
              <li className="pl-1"><strong>CDM Schedule 2:</strong> Defines minimum welfare requirements</li>
              <li className="pl-1"><strong>110V CTE:</strong> Standard for portable tools on site</li>
              <li className="pl-1"><strong>Access control:</strong> Induction before entry mandatory</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Temporary power:</strong> Transformers, distribution boards, RCDs</li>
              <li className="pl-1"><strong>Services coordination:</strong> Water, power, data routing</li>
              <li className="pl-1"><strong>Tool storage:</strong> Secure compound for valuable equipment</li>
              <li className="pl-1"><strong>Phased handover:</strong> Permanent services take over from temporary</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan site compound layout for safe and efficient operations",
              "Specify welfare facilities compliant with CDM 2015 requirements",
              "Design temporary electrical distribution systems for construction",
              "Implement effective security and access control measures",
              "Coordinate temporary services between multiple contractors",
              "Manage material storage and handling logistics"
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

        {/* Section 1: Site Setup Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Site Setup Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective site organisation begins before construction starts. The principal contractor must plan
              the compound layout, access routes, and temporary services to support safe and efficient work
              throughout the project duration.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Site Setup Planning Sequence:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pre-construction survey:</strong> Ground conditions, services, access constraints</li>
                <li className="pl-1"><strong>Compound layout design:</strong> Offices, welfare, storage, parking zones</li>
                <li className="pl-1"><strong>Traffic management plan:</strong> Vehicle/pedestrian segregation, delivery routes</li>
                <li className="pl-1"><strong>Temporary services specification:</strong> Power, water, drainage, communications</li>
                <li className="pl-1"><strong>Security strategy:</strong> Fencing, CCTV, access control, lighting</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compound Layout Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Zone</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirements</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Positioning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site entrance</td>
                      <td className="border border-white/10 px-3 py-2">Gatehouse, signing-in, wheel wash</td>
                      <td className="border border-white/10 px-3 py-2">Main road access with visibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offices</td>
                      <td className="border border-white/10 px-3 py-2">Meeting space, document storage</td>
                      <td className="border border-white/10 px-3 py-2">Near entrance, overlooking site</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Welfare</td>
                      <td className="border border-white/10 px-3 py-2">Toilets, canteen, drying room</td>
                      <td className="border border-white/10 px-3 py-2">Central for all workers, drainage access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Material storage</td>
                      <td className="border border-white/10 px-3 py-2">Level ground, secure, weather protection</td>
                      <td className="border border-white/10 px-3 py-2">Crane/forklift accessible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Waste management</td>
                      <td className="border border-white/10 px-3 py-2">Segregated skips, recycling</td>
                      <td className="border border-white/10 px-3 py-2">Vehicle access for collection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Planning principle:</strong> Site layout should evolve through project phases - plan for adaptability as work progresses from groundworks through to fit-out.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Welfare Facilities (CDM Requirements) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Welfare Facilities (CDM Requirements)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CDM 2015 Schedule 2 mandates specific welfare provisions for construction sites. The principal
              contractor must ensure adequate facilities are available from day one and maintained throughout
              the project.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">CDM 2015 Schedule 2 - Mandatory Welfare Provisions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sanitary conveniences:</strong> Adequate numbers, properly ventilated, lit, maintained</li>
                <li className="pl-1"><strong>Washing facilities:</strong> Hot and cold (or warm) water, soap, towels or drying</li>
                <li className="pl-1"><strong>Drinking water:</strong> Readily accessible, clearly marked, cups provided</li>
                <li className="pl-1"><strong>Changing/storage:</strong> Secure lockers for clothing and personal effects</li>
                <li className="pl-1"><strong>Rest facilities:</strong> Shelter, seating, means to heat food, boil water</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Welfare Provision Ratios</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Number of Workers</th>
                      <th className="border border-white/10 px-3 py-2 text-left">WCs</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Wash Stations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-5</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6-25</td>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">26-50</td>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">51-75</td>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">4</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">76-100</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Note: Additional facilities may be required for mixed-gender workforces</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rest Facilities Must Include</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Adequate seating with backs</li>
                  <li className="pl-1">Tables for eating</li>
                  <li className="pl-1">Means to heat food (microwave)</li>
                  <li className="pl-1">Boiling water for hot drinks</li>
                  <li className="pl-1">Heating in cold weather</li>
                  <li className="pl-1">Protection from tobacco smoke</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Drying room for wet clothing</li>
                  <li className="pl-1">Separate facilities for women</li>
                  <li className="pl-1">Accessible facilities (disabled)</li>
                  <li className="pl-1">First aid room for larger sites</li>
                  <li className="pl-1">Cleaning regime and supplies</li>
                  <li className="pl-1">Waste disposal arrangements</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance tip:</strong> Document welfare provision in the construction phase plan and conduct regular inspections to maintain standards.
            </p>
          </div>
        </section>

        {/* Section 3: Security and Access Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Security and Access Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Construction sites present security challenges from theft, vandalism, and unauthorised access.
              Effective security protects workers, the public, and valuable materials and equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Security Measures</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Measure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Perimeter fencing</td>
                      <td className="border border-white/10 px-3 py-2">2.0m minimum, anti-climb</td>
                      <td className="border border-white/10 px-3 py-2">Prevent unauthorised entry</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Security lighting</td>
                      <td className="border border-white/10 px-3 py-2">Motion-activated, full perimeter</td>
                      <td className="border border-white/10 px-3 py-2">Deter intruders, CCTV effectiveness</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CCTV</td>
                      <td className="border border-white/10 px-3 py-2">IP cameras, remote monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Surveillance, incident evidence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Intruder alarms</td>
                      <td className="border border-white/10 px-3 py-2">Monitored, compound and stores</td>
                      <td className="border border-white/10 px-3 py-2">Alert security/response</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Secure containers</td>
                      <td className="border border-white/10 px-3 py-2">Heavy-duty locks, ground anchors</td>
                      <td className="border border-white/10 px-3 py-2">Protect valuable tools/materials</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Access Control Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Site induction:</strong> Mandatory before any access, covers hazards, rules, emergency procedures</li>
                <li className="pl-1"><strong>Identity verification:</strong> Check CSCS/ECS cards, photo ID, right to work</li>
                <li className="pl-1"><strong>Sign-in/out system:</strong> Electronic or manual register for fire evacuation roll call</li>
                <li className="pl-1"><strong>Visitor management:</strong> Escorted access, visitor PPE, limited areas</li>
                <li className="pl-1"><strong>Vehicle control:</strong> Delivery booking system, authorised drivers only</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Induction Content (Minimum)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Site-specific hazards</li>
                  <li className="pl-1">Emergency procedures and assembly</li>
                  <li className="pl-1">First aid arrangements</li>
                  <li className="pl-1">PPE requirements</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Prohibited areas/activities</li>
                  <li className="pl-1">Reporting procedures</li>
                  <li className="pl-1">Welfare facilities location</li>
                  <li className="pl-1">Working hours and access times</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use electronic access control cards that integrate with time recording and automatically prevent access for workers with expired inductions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Temporary Services Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Temporary Services Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Temporary electrical supplies, water, and other services are critical infrastructure for construction
              operations. The building services contractor often leads this coordination given their technical expertise.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Temporary Electrical Installation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>110V CTE:</strong> Standard for all portable hand tools (55V to earth)</li>
                <li className="pl-1"><strong>RCD protection:</strong> 30mA on all socket circuits, time-delay on upstream</li>
                <li className="pl-1"><strong>IP rating:</strong> Minimum IP44 for outdoor distribution boards</li>
                <li className="pl-1"><strong>Inspection:</strong> Initial certification, 3-monthly periodic inspection</li>
                <li className="pl-1"><strong>PAT testing:</strong> All portable equipment before first use, then 3-monthly</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temporary Power Distribution Layout</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site transformer (110V)</td>
                      <td className="border border-white/10 px-3 py-2">5-10 kVA per work area</td>
                      <td className="border border-white/10 px-3 py-2">Central to work activities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main distribution board</td>
                      <td className="border border-white/10 px-3 py-2">100-200A three-phase</td>
                      <td className="border border-white/10 px-3 py-2">Near DNO supply point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-distribution</td>
                      <td className="border border-white/10 px-3 py-2">32-63A per floor/zone</td>
                      <td className="border border-white/10 px-3 py-2">Each working level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tower/task lighting</td>
                      <td className="border border-white/10 px-3 py-2">LED, 110V or SELV</td>
                      <td className="border border-white/10 px-3 py-2">Work areas, access routes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temporary Water Supply</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Mains connection or bowser tanks</li>
                  <li className="pl-1">Potable water clearly marked</li>
                  <li className="pl-1">Hose points for dust suppression</li>
                  <li className="pl-1">Protection from freezing</li>
                  <li className="pl-1">Regular testing if from bowser</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Storage Areas</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Segregated by trade/material type</li>
                  <li className="pl-1">Weather protection for moisture-sensitive</li>
                  <li className="pl-1">COSHH store for hazardous substances</li>
                  <li className="pl-1">Cylinder storage (gases) ventilated</li>
                  <li className="pl-1">Cable drum storage area</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Responsibilities</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Principal contractor:</strong> Overall temporary services strategy, main supplies</li>
                <li className="pl-1"><strong>Building services contractor:</strong> Distribution design, installation, maintenance</li>
                <li className="pl-1"><strong>Individual contractors:</strong> Comply with connection rules, report faults</li>
                <li className="pl-1"><strong>Coordination meetings:</strong> Weekly review of capacity, routing, phased handover</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Handover planning:</strong> As permanent electrical and mechanical services are commissioned, plan phased transfer from temporary supplies. Maintain temporary backup until permanent systems proven reliable.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Welfare Provision Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A construction site has peak workforce of 85 workers. What welfare facilities are required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using CDM Schedule 2 ratios for 76-100 workers:</p>
                <p className="mt-2">Toilets: <strong>5 minimum</strong></p>
                <p>Wash stations: <strong>5 minimum</strong></p>
                <p className="mt-2">Additional requirements:</p>
                <p>- Rest area seating for 85 (typically provide for 50% = 43 seats minimum)</p>
                <p>- Drinking water points - minimum 2 locations</p>
                <p>- Changing/locker facilities for 85 workers</p>
                <p className="mt-2 text-green-400">Also consider: drying room, separate female facilities if mixed workforce</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Temporary Power Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Estimate temporary power requirement for fit-out phase with 20 electricians and 15 mechanical fitters working across 4 floors.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Typical tool loads per trade worker:</p>
                <p>- Power tools: 1.5kW average, 3kW peak</p>
                <p>- Task lighting: 0.5kW per work area</p>
                <p className="mt-2">Calculation:</p>
                <p>35 workers × 1.5kW = 52.5kW average connected</p>
                <p>Apply diversity (0.4): 52.5 × 0.4 = <strong>21kW typical demand</strong></p>
                <p className="mt-2">Plus site lighting: 4 floors × 2kW = 8kW</p>
                <p>Plus welfare: 15kW (heating, water heating, canteen)</p>
                <p className="mt-2">Total: 21 + 8 + 15 = <strong>44kW</strong></p>
                <p className="mt-2 text-green-400">Provision: 63A three-phase supply (44kVA at 0.8 PF = 55kVA)</p>
                <p className="text-green-400">4× 5kVA 110V transformers (one per floor)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Security Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A city centre site has high-value M&E equipment arriving for installation. What security measures are appropriate?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Risk factors:</p>
                <p>- Urban location: higher theft risk</p>
                <p>- High-value equipment: attractive target</p>
                <p>- City centre: public access nearby</p>
                <p className="mt-2">Recommended measures:</p>
                <p>1. Solid hoarding (2.4m) replacing mesh fencing</p>
                <p>2. 24-hour manned security during equipment delivery phase</p>
                <p>3. CCTV with remote monitoring and recording</p>
                <p>4. Secure internal compound for high-value items</p>
                <p>5. Just-in-time delivery to minimise storage time</p>
                <p>6. Asset tracking tags on major equipment</p>
                <p className="mt-2 text-green-400">Consider: coordinated delivery with immediate installation to avoid overnight storage</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Site Setup Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Perimeter secured with appropriate fencing/hoarding</li>
                <li className="pl-1">Welfare facilities in place and operational</li>
                <li className="pl-1">Temporary power connected and distribution installed</li>
                <li className="pl-1">Water supply available (potable and construction use)</li>
                <li className="pl-1">Access control and induction system ready</li>
                <li className="pl-1">Emergency procedures posted and assembly point marked</li>
                <li className="pl-1">First aid provision in place</li>
                <li className="pl-1">Waste management arrangements operational</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Security fencing: <strong>2.0m minimum height</strong></li>
                <li className="pl-1">Portable tool voltage: <strong>110V CTE</strong></li>
                <li className="pl-1">Welfare lighting: <strong>150 lux minimum</strong></li>
                <li className="pl-1">Distribution board IP rating: <strong>IP44 minimum outdoor</strong></li>
                <li className="pl-1">RCD rating: <strong>30mA, 40ms</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insufficient welfare:</strong> Calculate for peak workforce, not average</li>
                <li className="pl-1"><strong>Poor transformer positioning:</strong> Leads to excessive cable runs and voltage drop</li>
                <li className="pl-1"><strong>Ignoring phased requirements:</strong> Site layout must adapt through project</li>
                <li className="pl-1"><strong>Inadequate records:</strong> Maintain inspection logs for temporary installations</li>
                <li className="pl-1"><strong>Late handover planning:</strong> Plan permanent services takeover early</li>
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
                <p className="font-medium text-white mb-1">Welfare (CDM Schedule 2)</p>
                <ul className="space-y-0.5">
                  <li>Toilets, washing, drinking water</li>
                  <li>Changing rooms and lockers</li>
                  <li>Rest area with heating and seating</li>
                  <li>Means to heat food, boil water</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Temporary Electrical</p>
                <ul className="space-y-0.5">
                  <li>110V CTE for portable tools</li>
                  <li>30mA RCD protection on sockets</li>
                  <li>IP44 minimum for outdoor DBs</li>
                  <li>3-monthly periodic inspection</li>
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
            <Link to="../h-n-c-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6-2">
              Next: CDM Regulations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section6_1;
