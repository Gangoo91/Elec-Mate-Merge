import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Agricultural and Industrial Installations - Level 3 Module 6 Section 4.3";
const DESCRIPTION = "Special requirements for electrical installations in agricultural and industrial environments under BS 7671 Sections 705 and 700 series, covering livestock safety, hazardous atmospheres, and industrial demands.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why do agricultural installations have stricter requirements than standard domestic installations?",
    options: [
      "Farming is more profitable than domestic work",
      "Animals are more sensitive to electric shock, environments are harsh, and fire risks are elevated",
      "Agricultural buildings are always larger",
      "Insurance companies require additional protection"
    ],
    correctIndex: 1,
    explanation: "Agricultural installations face multiple challenges: livestock are extremely sensitive to even small leakage currents, environments include moisture, dust, corrosive substances and fire risks (hay, straw), and the consequences of failure can be catastrophic for both animals and buildings."
  },
  {
    id: "check-2",
    question: "What is the maximum RCD rating required for socket outlet circuits in agricultural premises?",
    options: [
      "100mA for all circuits",
      "30mA for socket outlets and mobile equipment circuits",
      "300mA is acceptable for agricultural use",
      "RCDs are not required in agricultural installations"
    ],
    correctIndex: 1,
    explanation: "Regulation 705.411.1 requires 30mA RCD protection for all socket outlet circuits and circuits supplying hand-held or mobile equipment. The 30mA threshold provides protection for humans and helps protect livestock from harmful leakage currents."
  },
  {
    id: "check-3",
    question: "What additional bonding requirement applies to locations where livestock are kept?",
    options: [
      "No additional bonding is required",
      "Supplementary equipotential bonding connecting all exposed and extraneous conductive parts within animal reach",
      "Only the main earthing terminal needs bonding",
      "Bonding is prohibited near animals"
    ],
    correctIndex: 1,
    explanation: "Regulation 705.415.2 requires supplementary equipotential bonding in locations containing livestock. This connects all exposed and extraneous conductive parts that animals may contact, creating an equipotential zone to prevent even small potential differences that could stress or harm animals."
  },
  {
    id: "check-4",
    question: "What special consideration applies to motor circuits in industrial installations?",
    options: [
      "Motors can use any standard domestic protection",
      "Motor starting currents require careful protective device selection to avoid nuisance tripping while maintaining fault protection",
      "Motors do not require overcurrent protection",
      "Only DC motors need special consideration"
    ],
    correctIndex: 1,
    explanation: "Motor starting currents (typically 6-8 times running current) can trip incorrectly sized MCBs. Designers must select devices that accommodate inrush current while still providing adequate short-circuit and overload protection. Type C or D MCBs, or motor-rated devices, are often required."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671 Section 705, what additional protection measure is required for all circuits in agricultural premises?",
    options: [
      "Surge protection devices only",
      "30mA RCD protection for all circuits except where 100mA is permitted",
      "Arc fault detection devices",
      "No additional measures beyond standard requirements"
    ],
    correctAnswer: 1,
    explanation: "Section 705 requires RCD protection with rated residual current not exceeding 30mA for most circuits. 100mA RCDs may be used for fire protection in specific circumstances, but 30mA is the standard requirement for agricultural installations."
  },
  {
    id: 2,
    question: "Why are steel-wire armoured cables commonly specified for agricultural buildings?",
    options: [
      "They are the cheapest option",
      "They provide mechanical protection against livestock damage, rodents, and harsh handling",
      "They have higher current ratings than standard cables",
      "Building regulations mandate their use"
    ],
    correctAnswer: 1,
    explanation: "SWA cables resist damage from livestock rubbing, kicking, or chewing, rodent attack, and the general rough treatment common in agricultural environments. The mechanical protection is essential for long-term reliability in these challenging conditions."
  },
  {
    id: 3,
    question: "What is the minimum IP rating generally required for electrical equipment in locations where animals are kept?",
    options: [
      "IP2X",
      "IP44 minimum, often IP55 or higher in wet/dusty conditions",
      "IP20 is acceptable",
      "IP ratings do not apply to agricultural installations"
    ],
    correctAnswer: 1,
    explanation: "Equipment in animal housing must resist water (cleaning, animal waste, condensation) and dust/particles (feed, bedding). IP44 is typically the minimum, with IP55 or IP65 preferred in areas subject to pressure washing or high dust levels."
  },
  {
    id: 4,
    question: "A dairy farm has automatic milking equipment. What fault protection consideration is particularly important?",
    options: [
      "Using only 12V supplies",
      "Ensuring rapid disconnection to protect animals from even small leakage currents during milking",
      "Providing only manual isolation",
      "Using fuses instead of MCBs"
    ],
    correctAnswer: 1,
    explanation: "During milking, cows are in close contact with equipment, and the milk provides an excellent conductive path. Even small leakage currents can cause distress, reduced milk yield, or refusal to enter the parlour. Rapid disconnection via 30mA RCDs is essential."
  },
  {
    id: 5,
    question: "In industrial installations, what does 'selectivity' between protective devices mean?",
    options: [
      "Choosing the most expensive devices",
      "Ensuring only the device nearest the fault operates, leaving upstream circuits operational",
      "Selecting devices from the same manufacturer",
      "Using the same rated current for all devices"
    ],
    correctAnswer: 1,
    explanation: "Selectivity (discrimination) ensures that a fault disconnects only the affected circuit while upstream devices remain closed. This maintains power to unaffected parts of the installation, which is crucial for industrial processes and safety systems."
  },
  {
    id: 6,
    question: "What special consideration applies to emergency switching in industrial motor installations?",
    options: [
      "Emergency stops are optional for small motors",
      "Emergency stop buttons must be readily accessible, clearly identified, and capable of stopping all hazardous motion",
      "Only main isolators are required",
      "Emergency stops can be locked away for safety"
    ],
    correctAnswer: 1,
    explanation: "Industrial machinery requires emergency stop facilities that are immediately accessible, clearly marked (red/yellow), and capable of removing power from all hazardous motion. They must be designed so release does not automatically restart the machinery."
  },
  {
    id: 7,
    question: "Grain storage facilities present what specific electrical hazard?",
    options: [
      "High voltage requirements only",
      "Explosive dust atmospheres requiring equipment rated for hazardous zones",
      "Extremely low temperatures",
      "No specific hazards"
    ],
    correctAnswer: 1,
    explanation: "Grain dust in suspension can form explosive atmospheres. Electrical equipment in these areas must be suitable for hazardous zones (typically Zone 21 or 22), using appropriate Ex-rated enclosures and wiring methods to prevent ignition sources."
  },
  {
    id: 8,
    question: "What cable installation method provides the best protection in livestock buildings?",
    options: [
      "Surface PVC conduit",
      "Cables in galvanised steel conduit or trunking mounted out of animal reach",
      "Direct clipping at low level for easy access",
      "Flexible cord throughout"
    ],
    correctAnswer: 1,
    explanation: "Cables in steel conduit or trunking provide excellent mechanical protection. Mounting above animal reach (typically 2.5m minimum) protects against direct damage, while steel provides resistance to rodents and fire. This method also provides easy maintenance access."
  },
  {
    id: 9,
    question: "In industrial three-phase motor installations, what protection is typically provided by a motor starter?",
    options: [
      "Only on/off switching",
      "Overload protection, short-circuit protection (via fuses or MCB), and often phase-failure protection",
      "Earth fault protection only",
      "No protection - motors are self-protecting"
    ],
    correctAnswer: 1,
    explanation: "Motor starters incorporate overload relays (protecting against sustained overcurrent), short-circuit protection (via fuses or back-up MCB), and often phase-failure/imbalance protection. This comprehensive protection prevents motor burnout and fire risks."
  },
  {
    id: 10,
    question: "What is 'stray voltage' in agricultural installations and why is it a concern?",
    options: [
      "Voltage from nearby power lines",
      "Small potential differences between grounded objects that can stress or harm livestock",
      "Static electricity from animal movement",
      "Voltage from batteries"
    ],
    correctAnswer: 1,
    explanation: "Stray voltage refers to small AC potentials (even 1-2V) between grounded objects that animals may contact. Livestock are far more sensitive than humans to these voltages. Proper equipotential bonding is essential to eliminate stray voltage conditions."
  },
  {
    id: 11,
    question: "What switching arrangement is required for fixed heating appliances in agricultural buildings?",
    options: [
      "Any standard switch",
      "A means of isolation that disconnects all live conductors and is clearly identifiable",
      "Heating appliances do not need switches",
      "Only time switches are required"
    ],
    correctAnswer: 1,
    explanation: "Fixed heating appliances (heat lamps, underfloor heating, etc.) in agricultural premises must have readily accessible isolation capable of disconnecting all poles. This enables safe maintenance and emergency disconnection, particularly important given fire risks with bedding materials."
  },
  {
    id: 12,
    question: "An industrial installation uses variable speed drives (VSDs) for motor control. What design consideration applies to protective conductor sizing?",
    options: [
      "Standard sizing rules apply",
      "Higher frequency harmonics may require increased protective conductor CSA",
      "No protective conductor is needed with VSDs",
      "Only the VSD manufacturer can specify conductor sizes"
    ],
    correctAnswer: 1,
    explanation: "VSDs generate high-frequency harmonics that can flow through the protective conductor. BS 7671 and manufacturer guidance may require increased protective conductor sizing and/or the use of shielded cables to manage EMC effects and ensure effective fault protection."
  }
];

const faqs = [
  {
    question: "Can I use standard domestic accessories in agricultural buildings?",
    answer: "Generally no. Standard domestic socket outlets and switches lack the IP ratings, mechanical strength, and environmental protection needed for agricultural conditions. Specify industrial-rated accessories with appropriate IP ratings (minimum IP44, often IP55 or IP66), robust construction, and if necessary, corrosion-resistant materials. Some farm buildings may have office areas where domestic standards apply, but these must be clearly separated from agricultural areas."
  },
  {
    question: "How do I protect against fire risks in barn installations?",
    answer: "Key measures include: RCD protection on all circuits (reducing fire risk from earth faults), mechanical protection for cables (preventing damage that could cause shorts), appropriate IP ratings (keeping dust and moisture out of equipment), careful routing away from combustible materials (hay, straw, bedding), and correct sizing to prevent overheating. Regular inspection and testing is essential as agricultural environments accelerate degradation."
  },
  {
    question: "What special requirements apply to portable equipment on farms?",
    answer: "Portable equipment must be supplied via 30mA RCD-protected socket outlets. For outdoor or wet locations, 110V CTE (centre-tapped earth) systems provide additional safety. Equipment should be regularly inspected (PAT testing) and stored properly when not in use. Trailing cables must be protected from livestock and machinery, and preferably routed overhead where practical."
  },
  {
    question: "How do industrial installations differ from commercial premises?",
    answer: "Industrial installations typically feature: higher power demands and three-phase supplies, motor loads requiring special protection coordination, hazardous areas (explosive, corrosive, hot), complex process control systems, higher fault levels requiring careful equipment ratings, and stricter uptime requirements affecting maintenance strategies. The design process is more rigorous, often involving power system studies and formal safety assessments."
  },
  {
    question: "What are ATEX requirements and when do they apply?",
    answer: "ATEX (Atmospheres Explosibles) regulations apply wherever explosive atmospheres may occur - dust or gas. This includes grain stores, fuel storage, chemical processing, and painting facilities. Equipment must be certified for the specific zone classification (Zone 0/20, 1/21, or 2/22) and atmosphere type. Only certified electricians with appropriate training should install or maintain ATEX equipment."
  },
  {
    question: "How should I approach motor circuit design in industrial installations?",
    answer: "Start by determining motor characteristics: power, starting current, duty cycle, and control requirements. Select starters providing appropriate protection (DOL, star-delta, soft starter, VSD). Size cables for running current with factors for starting conditions. Choose protective devices that coordinate correctly - allowing starting currents while protecting against faults. Consider selectivity with upstream devices and include emergency stop facilities."
  }
];

const Level3Module6Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Agricultural and Industrial Installations
          </h1>
          <p className="text-white/80">
            Designing for demanding environments - livestock safety, hazardous areas, and industrial power systems
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Animal Sensitivity:</strong> Livestock react to voltages as low as 1-2V</li>
              <li><strong>30mA RCDs:</strong> Required for virtually all agricultural circuits</li>
              <li><strong>Bonding Critical:</strong> Supplementary bonding essential in animal areas</li>
              <li><strong>Harsh Conditions:</strong> IP44+ ratings, mechanical protection mandatory</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Animals avoiding water troughs or becoming reluctant to enter areas</li>
              <li><strong>Use:</strong> SWA cable for all livestock building wiring</li>
              <li><strong>Apply:</strong> Zone classification for explosive atmosphere areas</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "BS 7671 Section 705 requirements for agricultural premises",
              "Equipotential bonding for livestock protection",
              "Cable and equipment selection for harsh environments",
              "Industrial motor circuit design principles",
              "Hazardous area (ATEX) zone classification",
              "Selectivity and discrimination in industrial systems"
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
            Agricultural Installation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Agricultural installations present unique challenges that standard wiring practices cannot adequately address. BS 7671 Section 705 recognises these challenges and imposes additional requirements beyond those for normal domestic or commercial premises.
            </p>
            <p>
              The key factors driving these requirements are: the extreme sensitivity of livestock to electric current, harsh environmental conditions (moisture, dust, corrosive atmospheres), elevated fire risks (combustible materials everywhere), and mechanical damage risks from animals and machinery.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Why Animals Are Different:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Lower Threshold</p>
                  <p className="text-white/90">Cattle and pigs can perceive currents as low as 1-2mA - about 10 times more sensitive than humans. Voltages of just 2-4V between contact points can cause behavioural changes.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Contact Points</p>
                  <p className="text-white/90">Animals contact many surfaces simultaneously - floors, water troughs, feeders, stalls. Any potential difference between these surfaces creates current flow through the animal.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Behavioural Signs</p>
                  <p className="text-white/90">Stray voltage causes reduced feed and water intake, reluctance to enter areas, reduced milk production, increased stress, and in severe cases, injury from startled reactions.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Economic Impact</p>
                  <p className="text-white/90">Beyond animal welfare, stray voltage causes significant economic losses. A dairy herd affected by stray voltage can show 5-10% reduction in milk yield before symptoms become obvious.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The goal in agricultural installations is not just to protect against dangerous shock levels for humans, but to eliminate potential differences that could affect animal welfare and productivity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Protection and Bonding Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Section 705 establishes a comprehensive protection regime centred on RCD protection and enhanced equipotential bonding. These measures work together to minimise both fault currents and potential differences within the installation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">RCD Protection Requirements (Regulation 705.411.1):</p>
              <ul className="text-sm text-white/90 space-y-2 ml-4">
                <li><strong>30mA RCDs:</strong> Required for socket outlet circuits and circuits supplying hand-held or mobile equipment</li>
                <li><strong>100mA RCDs:</strong> May be used for fixed equipment where 30mA would cause excessive nuisance tripping</li>
                <li><strong>300mA RCDs:</strong> Maximum for any agricultural circuit - primarily for fire protection</li>
              </ul>
            </div>

            <p>
              Supplementary equipotential bonding is mandatory in locations containing livestock. This creates an equipotential zone by connecting all simultaneously accessible exposed and extraneous conductive parts within reach of animals.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Parts Requiring Bonding in Animal Areas:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Metal stall divisions and feeding barriers</li>
                <li>Water troughs and drinkers (including pipework)</li>
                <li>Metallic floors, gratings, and drainage covers</li>
                <li>Milking equipment and pipelines</li>
                <li>Structural steelwork within animal reach</li>
                <li>Any other metalwork animals can contact</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A dairy parlour has metal stalls, stainless steel milking clusters connected via aluminium pipework, a metal-grated floor, and steel structure. All these elements must be bonded together with conductors sized per Table 54.8, creating an equipotential zone where no dangerous potential differences can exist even during a fault.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Industrial Installation Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial installations typically feature higher power demands, three-phase supplies, significant motor loads, and often hazardous areas. Design must address fault levels, protection coordination, motor starting, and maintaining supply continuity.
            </p>
            <p>
              Unlike domestic installations where fault levels are relatively predictable, industrial sites may have prospective fault currents of tens of kA. All equipment must be rated for the actual fault level at its location, requiring power system studies for larger installations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Motor Circuit Design Considerations:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Starting Current</p>
                  <p className="text-white/90">DOL (direct-on-line) starting draws 6-8 times full load current. MCBs must be selected to ride through this inrush without tripping. Type C (5-10 In) or Type D (10-20 In) may be required.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Overload Protection</p>
                  <p className="text-white/90">Thermal overload relays protect against sustained overcurrent. Set at 105-110% of motor full load current, they allow brief overloads whilst protecting against damaging sustained conditions.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Cable Sizing</p>
                  <p className="text-white/90">Cables must carry starting current without excessive temperature rise. For frequent starting or long starting times, cables may need to be larger than the running current would suggest.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Voltage Drop</p>
                  <p className="text-white/90">Motor starting causes voltage dip. Excessive dip affects other equipment and may prevent motors starting. BS 7671 limits are 3% lighting, 5% other - measured during normal operation, not starting.</p>
                </div>
              </div>
            </div>

            <p>
              Selectivity between protective devices ensures that a fault disconnects only the affected circuit. In industrial systems, this is achieved through time-grading (upstream devices have longer delay) or current-grading (upstream devices have higher settings) or a combination.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Industrial systems often require coordination studies to verify that protective devices operate correctly together. This is beyond simple application of BS 7671 tables and may require manufacturer's characteristic curves.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Hazardous Areas and ATEX
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many agricultural and industrial locations contain areas where explosive atmospheres may occur. Grain stores, fuel storage, paint shops, chemical processing, and many other applications require hazardous area classification and appropriate equipment selection.
            </p>
            <p>
              The ATEX Directives (Equipment Directive 2014/34/EU and Workplace Directive 1999/92/EC) establish the legal framework. BS EN 60079 series provides technical guidance. Hazardous areas are classified by zone, indicating the likelihood of an explosive atmosphere being present.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Zone Classification:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-400 mb-1">Gas Zones</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>Zone 0:</strong> Continuously or long periods</li>
                    <li><strong>Zone 1:</strong> Likely in normal operation</li>
                    <li><strong>Zone 2:</strong> Not likely, brief if occurs</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-orange-500/10 border border-orange-500/30">
                  <p className="font-medium text-orange-400 mb-1">Dust Zones</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>Zone 20:</strong> Continuously or long periods</li>
                    <li><strong>Zone 21:</strong> Likely in normal operation</li>
                    <li><strong>Zone 22:</strong> Not likely, brief if occurs</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              Equipment for hazardous areas must be certified to the appropriate standards, marked with the 'Ex' symbol, and suitable for the specific zone. Installation, maintenance, and modification can only be carried out by competent persons with appropriate training and using certified methods.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Hazardous Areas in Agriculture/Industry:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Grain silos, hoppers, and conveying systems (dust Zone 21/22)</li>
                <li>Fuel storage and dispensing areas (gas Zone 1/2)</li>
                <li>Spray painting booths and drying areas (gas Zone 1/2)</li>
                <li>Battery charging rooms (gas Zone 2 for hydrogen)</li>
                <li>Flour and food processing areas (dust zones)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A grain silo interior during filling is Zone 21 (dust cloud likely during normal operation). The conveyor entry point may be Zone 21, reducing to Zone 22 further from the discharge. Equipment must be rated for the zone - typically Ex tb or Ex tc for dust applications.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Agricultural Building Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use SWA cable or cables in galvanised steel conduit for all wiring</li>
                <li>Route cables at minimum 2.5m height to protect from livestock and machinery</li>
                <li>Specify IP55 or higher rated equipment in animal housing areas</li>
                <li>Install supplementary equipotential bonding before commissioning</li>
                <li>Use stainless steel or hot-dip galvanised accessories and fixings</li>
                <li>Allow for pressure washing during cleaning - IP66 preferred for wash-down areas</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Motor Circuit Design</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain motor nameplate data: rated power, current, starting method, duty cycle</li>
                <li>Select starter type: DOL, star-delta, soft starter, or VSD as appropriate</li>
                <li>Size cables for running current with starting consideration factors</li>
                <li>Select MCB type to accommodate starting current (typically Type C or D)</li>
                <li>Specify overload relay settings at 105-110% of motor full load current</li>
                <li>Verify selectivity with upstream devices using manufacturer data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inadequate bonding</strong> - Missing or undersized supplementary bonding in animal areas</li>
                <li><strong>Wrong RCD rating</strong> - Using 100mA or 300mA where 30mA is required</li>
                <li><strong>Standard accessories</strong> - Using domestic-grade equipment in harsh environments</li>
                <li><strong>MCB nuisance tripping</strong> - Type B MCBs tripping on motor starting</li>
                <li><strong>Ignoring ATEX</strong> - Installing standard equipment in hazardous zones</li>
                <li><strong>Poor cable routing</strong> - Cables accessible to livestock or machinery damage</li>
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
                <p className="font-medium text-white mb-1">Agricultural Requirements</p>
                <ul className="space-y-0.5">
                  <li>30mA RCD for sockets and mobile equipment</li>
                  <li>100mA RCD maximum for fixed equipment</li>
                  <li>300mA RCD maximum for fire protection</li>
                  <li>Supplementary bonding in animal areas</li>
                  <li>IP44 minimum, IP55+ preferred</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Section 705 - Agricultural installations</li>
                  <li>Regulation 705.411.1 - RCD requirements</li>
                  <li>Regulation 705.415.2 - Bonding</li>
                  <li>Section 422 - Fire protection</li>
                  <li>Section 537 - Isolation and switching</li>
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
            <Link to="../level3-module6-section4-4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Outdoor Installations
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module6-section4-4-4">
              Next: EV Charging Points
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section4_3;
