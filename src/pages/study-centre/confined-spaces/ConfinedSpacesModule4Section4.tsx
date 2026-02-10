import { ArrowLeft, Zap, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "voltage-reduction",
    question:
      "What is the maximum voltage to earth permitted when using 110V CTE (centre-tapped earth) portable tools in a confined space?",
    options: [
      "110V",
      "55V",
      "25V",
      "12V",
    ],
    correctIndex: 1,
    explanation:
      "A 110V CTE (centre-tapped earth) supply provides a maximum of 55V to earth. The centre-tap on the secondary winding of the transformer means that each conductor is only 55V relative to earth, halving the shock risk compared to a standard 110V supply. This is the standard requirement for portable tools used in confined spaces under BS 7671.",
  },
  {
    id: "rcd-protection",
    question:
      "What trip current rating must RCDs have when protecting circuits supplying confined spaces?",
    options: [
      "100mA",
      "300mA",
      "30mA",
      "10mA",
    ],
    correctIndex: 2,
    explanation:
      "A 30mA RCD must protect ALL circuits supplying a confined space. This provides additional protection against electric shock by disconnecting the supply within 40ms if a fault current of 30mA or more flows to earth. However, RCD protection is additional protection only — it does NOT replace the requirement for reduced voltage systems. Both measures must be applied together.",
  },
  {
    id: "safe-isolation",
    question:
      "When performing safe isolation for confined space entry, what must you do AFTER locking off the supply?",
    options: [
      "Begin work immediately once the padlock is fitted",
      "Prove dead at the point of work using an approved voltage indicator",
      "Ask a colleague to confirm the supply is off verbally",
      "Check the circuit breaker position visually",
    ],
    correctIndex: 1,
    explanation:
      "After locking off the supply with a personal padlock, you MUST prove dead at the point of work using an approved voltage indicator that has been proved on a known live source both BEFORE and AFTER testing. This is the 'prove-test-prove' method. Visual checks of circuit breaker positions or verbal confirmations are NOT acceptable — the only reliable method is testing with an approved instrument.",
  },
];

const faqs = [
  {
    question:
      "Can I use standard 230V tools if I plug them into an RCD-protected socket?",
    answer:
      "No. RCD protection alone is NOT sufficient for confined space work. BS 7671 requires reduced voltage systems (110V CTE, 25V, or 12V depending on conditions) for all portable equipment used in confined spaces. The RCD provides additional protection on top of the reduced voltage — it is not a replacement. Using 230V tools in a confined space is extremely dangerous because the combination of damp conditions, conductive surroundings, and restricted escape routes means that even a brief contact with 230V could be fatal before the RCD trips.",
  },
  {
    question:
      "What IP rating should portable appliances have for use in damp confined spaces?",
    answer:
      "Portable appliances used in damp or wet confined spaces should have a minimum ingress protection rating of IP44 (protected against solid objects over 1mm and splashing water from all directions). For very wet conditions such as flooded manholes or water tanks, IP55 or higher is recommended (protected against dust ingress and water jets). Class II (double-insulated) equipment is preferred over Class I in confined spaces because it does not rely on an earth connection for protection. All portable appliances must be PAT tested and have current test labels before being taken into any confined space.",
  },
  {
    question:
      "Is it ever permitted to work on live electrical equipment inside a confined space?",
    answer:
      "Working on live electrical equipment is generally PROHIBITED in confined spaces. The combination of conductive surroundings, damp conditions, restricted movement, and limited escape routes makes live working exceptionally dangerous. The only circumstances where live working might be considered are when it is unreasonable in all circumstances for the equipment to be dead (e.g., essential process monitoring that cannot be isolated), when it is reasonable in all circumstances for the person to be working near live conductors, and when suitable additional precautions are in place. Even then, a specific risk assessment, method statement, and written authorisation from a senior authorised person are required. In practice, live working in confined spaces is almost never justified and must be avoided wherever possible.",
  },
  {
    question:
      "What type of temporary lighting should be used in a confined space with a potentially flammable atmosphere?",
    answer:
      "In any confined space where a flammable or explosive atmosphere may be present, ALL electrical equipment including lighting MUST be ATEX-rated (certified for use in explosive atmospheres). This means the luminaires must carry the Ex marking showing they are certified to the relevant ATEX directive (2014/34/EU) and appropriate for the zone classification. The voltage should be reduced to 12V or 25V depending on the dampness of the conditions. LED luminaires are preferred because they produce less heat (reducing ignition risk), consume less power (extending battery backup duration), and are more robust than traditional filament or fluorescent lamps. Before any electrical equipment is used in a potentially explosive atmosphere, the space must be gas-tested and a competent person must confirm the equipment rating matches the zone classification.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Why does electrical work in confined spaces carry additional risk compared to general electrical work?",
    options: [
      "Because confined spaces are always underground",
      "Because wet/damp conditions, conductive surroundings, and restricted escape routes combine to increase shock and arc flash danger",
      "Because confined spaces never have any ventilation",
      "Because electrical regulations do not apply in confined spaces",
    ],
    correctAnswer: 1,
    explanation:
      "Confined spaces carry additional electrical risk because multiple hazard factors combine: wet or damp conditions reduce body resistance (increasing shock severity), conductive surroundings such as metal tanks and vessels provide easy fault current paths, restricted movement limits the ability to escape from an arc flash or shock, and the enclosed nature of the space amplifies arc flash energy — the pressure wave and thermal effects are concentrated rather than dissipating into open air. These factors together make electrical incidents in confined spaces far more likely to be fatal.",
  },
  {
    id: 2,
    question:
      "What voltage system must be used for portable hand lamps in a very wet confined space?",
    options: [
      "230V with RCD protection",
      "110V CTE",
      "25V",
      "12V",
    ],
    correctAnswer: 3,
    explanation:
      "In very wet or flooded confined spaces, portable hand lamps must operate at no more than 12V. This is the lowest voltage category specified in BS 7671 and provides the maximum protection against electric shock in the most hazardous conditions. At 12V, even direct contact with a live conductor in wet conditions is unlikely to produce a dangerous shock current. The 25V limit applies to hand lamps in damp (but not very wet) confined spaces, while 110V CTE (55V to earth) applies to portable power tools.",
  },
  {
    id: 3,
    question:
      "What does BS 7671 Chapter 70 series cover?",
    options: [
      "Standard domestic wiring regulations only",
      "Special installations and locations including confined and conductive locations",
      "Testing procedures for new installations only",
      "Emergency lighting requirements for commercial buildings",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Chapter 70 series covers special installations and locations — environments where the standard regulations need additional or modified requirements to ensure safety. This includes Section 706 (conducting locations with restricted movement — essentially confined conductive spaces), which specifies the voltage limitations, isolation requirements, and additional protection measures needed when electrical work is carried out in confined and conductive locations. Other sections in the 700 series cover bathrooms, swimming pools, construction sites, agricultural premises, and other special locations.",
  },
  {
    id: 4,
    question:
      "What is the primary advantage of battery-powered tools for confined space work?",
    options: [
      "They are cheaper than mains-powered tools",
      "They eliminate the risk of mains electrical shock entirely",
      "They are always more powerful than mains tools",
      "They do not require any risk assessment",
    ],
    correctAnswer: 1,
    explanation:
      "Battery-powered (cordless) tools are the preferred option for confined space work because they completely eliminate the risk of mains electrical shock. There is no trailing cable connected to a mains supply, no risk of cable damage creating a live fault, and no need for reduced-voltage transformers or RCD protection for the tool supply. However, battery tools have limitations — they may not deliver sufficient power for heavy-duty tasks, battery duration is finite (particularly problematic in extended confined space work), and the batteries themselves must be managed safely. Despite these limitations, battery tools should always be the first choice where their capabilities are sufficient for the task.",
  },
  {
    id: 5,
    question:
      "When routing cables into a confined space, which of the following is a key safety requirement?",
    options: [
      "Cables should run directly across the entry/exit point for the shortest route",
      "Cables must be routed to avoid obstructing entry/exit, supported overhead where possible, and protected against mechanical damage",
      "Cables can be left loose on the floor as long as they are 110V",
      "Cable routing does not matter as long as an RCD is fitted",
    ],
    correctAnswer: 1,
    explanation:
      "Cable routing in and around confined spaces is critical for safety. Cables must NEVER trail across the entry/exit point — in an emergency, trailing cables across the escape route could trip a person trying to exit or prevent rescue teams from reaching a casualty. Cables should be supported overhead or along walls where possible, protected against mechanical damage (especially where they pass through access openings), and routed so they do not create trip hazards within the confined space itself. Proper cable management also reduces the risk of cable insulation damage from sharp edges or abrasion.",
  },
  {
    id: 6,
    question:
      "What must be included in the safe isolation procedure for confined space entry?",
    options: [
      "Switching off at the isolator and placing a warning notice only",
      "Lock off supplies, prove dead with an approved voltage indicator (prove-test-prove), fit personal padlock, and complete the isolation register",
      "Asking the duty holder to confirm the supply is off",
      "Checking the circuit diagram to identify which circuits are live",
    ],
    correctAnswer: 1,
    explanation:
      "Safe isolation for confined space entry follows a rigorous procedure: (1) Identify all sources of supply to the confined space and the equipment within it. (2) Switch off and lock off each supply with a personal padlock — each person entering the space must fit their own lock. (3) Prove dead at the point of work using an approved voltage indicator, following the prove-test-prove method (prove the instrument works on a known live source, test the isolated circuit, prove the instrument still works). (4) Fit caution notices at each isolation point. (5) Complete the isolation register with details of all isolation points, lock numbers, and the name of each person who has locked on. Only when all steps are completed may entry to the confined space begin.",
  },
  {
    id: 7,
    question:
      "An electrician needs to carry out insulation resistance testing inside a metal storage tank. Which additional precaution is essential?",
    options: [
      "No additional precautions are needed for testing",
      "The test instrument must be battery-powered, and the tank must be isolated from all supplies before testing begins",
      "Testing can be done with the supply still live if gloves are worn",
      "Only apprentices should carry out testing in confined spaces",
    ],
    correctAnswer: 1,
    explanation:
      "Electrical testing in confined spaces requires specific additional precautions. Test instruments must be battery-powered and in calibration. The installation being tested must be fully isolated and proved dead before insulation resistance testing begins — IR testing applies a high test voltage (typically 500V DC) which could cause a dangerous shock in a conductive confined space. All other circuits within the confined space must also be isolated. A standby person must be present outside the space, and the permit to work must specifically authorise the testing activity. The test equipment itself must be approved, in date for calibration, and appropriate for the environment.",
  },
  {
    id: 8,
    question:
      "Where must the emergency shutdown arrangements for electrical supplies to a confined space be located?",
    options: [
      "Inside the confined space for quick access by the worker",
      "At the nearest distribution board regardless of location",
      "Clearly identified and accessible from OUTSIDE the confined space",
      "Emergency shutdown is not required if RCDs are fitted",
    ],
    correctAnswer: 2,
    explanation:
      "Emergency shutdown arrangements for electrical supplies to a confined space must be clearly identified and accessible from OUTSIDE the confined space. If a person inside the space receives an electric shock, they may be unable to operate a shutdown switch themselves. The standby person or rescue team must be able to immediately disconnect ALL electrical supplies to the space from a clearly marked external point without needing to enter the space. The location of the emergency shutdown must be briefed to the standby person and all members of the rescue team as part of the confined space entry procedure.",
  },
];

export default function ConfinedSpacesModule4Section4() {
  useSEO({
    title:
      "Electrical Work in Confined Spaces | Confined Spaces Module 4.4",
    description:
      "Voltage reduction requirements, RCD protection, safe isolation, battery-powered tools, cable routing, temporary lighting, electrical testing, and emergency shutdown for electrical work in confined spaces.",
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
            <Link to="../confined-spaces-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <Zap className="h-7 w-7 text-cyan-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Work in Confined Spaces
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Voltage reduction requirements, RCD protection, safe isolation,
            battery-powered tools, cable routing, temporary lighting, electrical
            testing, and emergency shutdown procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>110V CTE:</strong> Max 55V to earth for portable
                tools in confined spaces
              </li>
              <li>
                <strong>30mA RCD:</strong> Additional protection on ALL
                circuits supplying confined spaces
              </li>
              <li>
                <strong>Battery tools:</strong> Preferred option &mdash;
                eliminates mains shock risk entirely
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>25V:</strong> Hand lamps in damp confined spaces
              </li>
              <li>
                <strong>12V:</strong> Hand lamps in very wet confined spaces
              </li>
              <li>
                <strong>BS 7671 Section 706:</strong> Conducting locations
                with restricted movement
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why electrical work in confined spaces carries additional risk compared to general electrical work",
              "State the voltage reduction requirements for portable tools, hand lamps, and very wet conditions",
              "Describe the role of 30mA RCD protection as additional (not replacement) protection in confined spaces",
              "Identify battery-powered tools as the preferred option and explain their advantages and limitations",
              "Explain the safe isolation procedure including lock off, prove dead, personal padlocks, and isolation register",
              "Describe correct cable routing, temporary lighting, and ATEX requirements for flammable atmospheres",
              "Outline safe procedures for electrical testing and the restrictions on live working in confined spaces",
              "Identify emergency shutdown requirements and apply knowledge to specific confined space scenarios",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Electrical Work in Confined Spaces Is More Dangerous */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Why Electrical Work in Confined Spaces Is More Dangerous
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical work always carries risk, but in a confined space those
                risks are <strong>significantly amplified</strong>. Multiple
                hazard factors combine to create conditions where even a relatively
                minor electrical fault can be fatal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Contributing Hazard Factors
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Wet and damp conditions:</strong>{" "}
                      Many confined spaces such as tanks, manholes, and ducts
                      are inherently damp or contain standing water. Moisture
                      dramatically <strong className="text-white">reduces body
                      resistance</strong> &mdash; dry skin typically has a
                      resistance of around 100,000&nbsp;&Omega;, but wet skin
                      can fall below 1,000&nbsp;&Omega;. This means the shock
                      current flowing through the body at any given voltage is
                      significantly higher in wet conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Conductive surroundings:</strong>{" "}
                      Metal tanks, steel vessels, cast-iron manholes, and
                      reinforced concrete structures create an environment where
                      the worker is in{" "}
                      <strong className="text-white">intimate contact with
                      earth</strong>. Any fault in electrical equipment can
                      find an easy return path through the worker&rsquo;s body
                      to the surrounding conductive structure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Restricted movement:</strong>{" "}
                      The physical constraints of a confined space mean the
                      worker cannot easily move away from an electrical hazard.
                      In an open area, a person receiving a shock may be thrown
                      clear or be able to step back &mdash; in a confined space,
                      there is <strong className="text-white">nowhere to
                      go</strong>. The limited escape route also means that
                      rescue is more difficult and takes longer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Arc flash amplification:</strong>{" "}
                      In an enclosed metal space, an arc flash does not
                      dissipate into the surrounding air as it would in an open
                      area. The <strong className="text-white">thermal energy
                      and pressure wave are concentrated</strong> within the
                      enclosure, reflecting off metal walls and intensifying the
                      blast effect. The superheated air, molten metal, and
                      pressure wave have nowhere to expand, making even a
                      relatively small arc flash potentially fatal in a confined
                      space
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Combined Effect
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  It is the <strong className="text-white">combination</strong>{" "}
                  of these factors that makes electrical work in confined spaces
                  so dangerous. A 230V contact that might cause a painful but
                  survivable shock in a dry, open workshop could easily be{" "}
                  <strong className="text-white">fatal</strong> inside a damp
                  metal tank where the worker is in direct contact with
                  conductive surfaces and cannot escape. This is why BS&nbsp;7671
                  requires specific additional precautions for all electrical
                  work in conducting locations with restricted movement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Voltage Reduction Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Voltage Reduction Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The primary protection against electric shock in confined spaces
                is <strong>voltage reduction</strong>. By reducing the supply
                voltage, the potential shock current through the body is reduced
                to a level that is less likely to cause serious injury or death.
                BS&nbsp;7671 Chapter 70 series specifies the maximum voltages
                permitted for different equipment types and conditions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  110V CTE (Centre-Tapped Earth) &mdash; Portable Tools
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The standard supply for{" "}
                      <strong className="text-white">portable power tools</strong>{" "}
                      in confined spaces is 110V from a centre-tapped earth
                      transformer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The centre-tap on the secondary winding means each
                      conductor is only{" "}
                      <strong className="text-white">55V relative to
                      earth</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If a person touches a live conductor, the maximum shock
                      voltage is 55V &mdash; roughly{" "}
                      <strong className="text-white">one quarter</strong> of the
                      standard 230V mains supply
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      110V CTE transformers use{" "}
                      <strong className="text-white">yellow sockets and
                      plugs</strong> so they are easily identified on site
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  25V &mdash; Portable Hand Lamps in Damp Confined Spaces
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Where conditions are{" "}
                      <strong className="text-white">damp</strong> (but not
                      flooded or very wet), portable hand lamps must not exceed{" "}
                      <strong className="text-white">25V</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Hand lamps are at higher risk because they are{" "}
                      <strong className="text-white">held in the hand</strong>{" "}
                      and frequently moved around the space, increasing the
                      chance of mechanical damage to the lamp or cable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Supplied from a{" "}
                      <strong className="text-white">safety isolating
                      transformer</strong> complying with BS&nbsp;EN&nbsp;61558
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  12V &mdash; Hand Lamps in Very Wet / Flooded Confined Spaces
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      In <strong className="text-white">very wet or
                      flooded</strong> confined spaces, hand lamps must not
                      exceed <strong className="text-white">12V</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      At 12V, even direct contact with a live conductor in wet
                      conditions is{" "}
                      <strong className="text-white">unlikely to produce a
                      dangerous shock current</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      This is the{" "}
                      <strong className="text-white">lowest voltage
                      category</strong> specified in BS&nbsp;7671 and provides
                      the maximum level of protection against electric shock
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">
                    BS 7671 Section 706:
                  </strong>{" "}
                  These voltage limits are specified in BS&nbsp;7671 Chapter 70
                  series, specifically <strong>Section 706 &mdash; Conducting
                  Locations with Restricted Movement</strong>. This section
                  applies to any location where a person is in contact with or
                  in close proximity to conductive parts and where freedom of
                  bodily movement is restricted. The voltage limits are{" "}
                  <strong>maximum values</strong> &mdash; lower voltages should
                  always be used where practicable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram 1: Voltage Reduction Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">&nbsp;</span>
            Voltage Reduction Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-cyan-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-cyan-400 font-semibold mb-4 text-center tracking-widest uppercase">
                Voltage Limits for Confined Space Electrical Equipment
              </p>

              {/* Voltage tiers */}
              <div className="space-y-3 min-w-[300px]">
                {/* 110V CTE */}
                <div className="relative border-2 border-yellow-400/50 bg-yellow-500/10 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="text-sm sm:text-base font-bold text-yellow-400 block">
                        110V CTE
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/60 block">
                        Centre-Tapped Earth &mdash; max 55V to earth
                      </span>
                    </div>
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-md px-3 py-1.5">
                      <span className="text-[10px] sm:text-xs text-yellow-300 font-medium">
                        Portable power tools
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full bg-yellow-500/30 rounded-full h-2" />
                  </div>
                </div>

                {/* 25V */}
                <div className="relative border-2 border-orange-400/50 bg-orange-500/10 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="text-sm sm:text-base font-bold text-orange-400 block">
                        25V
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/60 block">
                        Safety isolating transformer
                      </span>
                    </div>
                    <div className="bg-orange-500/20 border border-orange-500/30 rounded-md px-3 py-1.5">
                      <span className="text-[10px] sm:text-xs text-orange-300 font-medium">
                        Hand lamps &mdash; damp conditions
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-3/5 bg-orange-500/30 rounded-full h-2" />
                  </div>
                </div>

                {/* 12V */}
                <div className="relative border-2 border-red-400/50 bg-red-500/10 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="text-sm sm:text-base font-bold text-red-400 block">
                        12V
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/60 block">
                        Maximum protection &mdash; lowest voltage category
                      </span>
                    </div>
                    <div className="bg-red-500/20 border border-red-500/30 rounded-md px-3 py-1.5">
                      <span className="text-[10px] sm:text-xs text-red-300 font-medium">
                        Hand lamps &mdash; very wet / flooded
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-1/4 bg-red-500/30 rounded-full h-2" />
                  </div>
                </div>
              </div>

              {/* Scale indicator */}
              <div className="mt-4 flex items-center justify-between text-[9px] text-white/40">
                <span>0V</span>
                <span>&larr; Lower voltage = safer in confined spaces &rarr;</span>
                <span>230V</span>
              </div>

              {/* Key note */}
              <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] sm:text-xs text-cyan-300 font-medium">
                  ALL voltages above require 30mA RCD additional protection
                  &mdash; RCD does NOT replace reduced voltage
                </p>
              </div>

              {/* Legend */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500/50" />
                  <span className="text-[9px] text-white/50">110V CTE (55V to earth)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-orange-500/30 border border-orange-500/50" />
                  <span className="text-[9px] text-white/50">25V (damp)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-red-500/30 border border-red-500/50" />
                  <span className="text-[9px] text-white/50">12V (very wet)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: RCD Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            RCD Protection
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Residual current devices (RCDs) provide{" "}
                <strong>additional protection</strong> against electric shock by
                detecting imbalances between the line and neutral currents,
                which indicate that current is flowing to earth through an
                unintended path &mdash; potentially through a person&rsquo;s
                body.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  RCD Requirements for Confined Spaces
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">30mA RCD</strong> must
                      protect ALL circuits supplying a confined space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Must disconnect the supply within{" "}
                      <strong className="text-white">40ms</strong> at the rated
                      residual current
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Must be{" "}
                      <strong className="text-white">tested before
                      each use</strong> using the integral test button
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Applies to <strong className="text-white">all
                      voltage levels</strong> &mdash; 110V CTE, 25V, and 12V
                      circuits must all have RCD protection
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Additional Protection &mdash; NOT a Replacement
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  RCD protection is{" "}
                  <strong className="text-white">additional protection
                  only</strong>. It does NOT replace the requirement for reduced
                  voltage systems. Both measures must be applied together. An
                  RCD can fail to trip (e.g., due to nuisance tripping being
                  &ldquo;solved&rdquo; by bypassing the device, or a mechanical
                  fault in the trip mechanism), so it must never be relied upon
                  as the sole means of protection. The reduced voltage limits
                  the maximum shock energy, while the RCD provides a
                  fast-acting backup that disconnects the supply if a fault
                  occurs.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Testing:</strong> The RCD
                  must be tested using the integral test button{" "}
                  <strong>before each period of use</strong>. In addition,
                  periodic testing with a calibrated RCD tester should confirm
                  the actual trip time and trip current are within specification.
                  Any RCD that fails to trip when tested must be{" "}
                  <strong>immediately removed from service</strong> and replaced.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Battery-Powered Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Battery-Powered Tools
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Battery-powered (cordless) tools are the{" "}
                <strong>preferred option</strong> for all electrical work in
                confined spaces. They offer the most fundamental form of
                protection: <strong>eliminating the mains electrical risk
                entirely</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Advantages
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">No mains connection</strong>{" "}
                      &mdash; completely eliminates the risk of mains electric
                      shock
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">No trailing
                      cables</strong> &mdash; eliminates trip hazards and cable
                      damage risks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">No transformer
                      required</strong> &mdash; reduces the amount of equipment
                      needed at the entry point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Greater
                      mobility</strong> within the confined space without cable
                      constraints
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Limitations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Power output</strong>{" "}
                      &mdash; may not be sufficient for heavy-duty tasks such
                      as large cable cutting or heavy conduit bending
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Battery
                      duration</strong> &mdash; finite run time, which is
                      particularly problematic for extended confined space
                      operations where frequent battery changes require
                      re-entering and exiting the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Battery
                      management</strong> &mdash; spare batteries must be
                      available and charged; batteries should not be charged
                      inside the confined space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Not suitable for
                      all tasks</strong> &mdash; some operations such as
                      sustained drilling into concrete or large-diameter cable
                      preparation may exceed battery tool capabilities
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Best Practice:</strong>{" "}
                  Battery-powered tools should always be the{" "}
                  <strong>first choice</strong> for confined space work. Only
                  when battery tools cannot deliver the required performance
                  should mains-powered tools on reduced-voltage supplies be
                  considered. Even when mains-powered tools must be used, plan
                  the work so that the maximum amount is completed with battery
                  tools first, minimising the time mains supplies are present
                  in the confined space.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Safe Isolation Procedure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">05</span>
            Safe Isolation Procedure in and Around Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Safe isolation is{" "}
                <strong>critical before any confined space entry</strong> where
                electrical hazards exist. The consequences of a failure in
                isolation are far more severe in a confined space than in an
                open area, so the procedure must be followed rigorously with
                no shortcuts.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Step-by-Step Safe Isolation for Confined Space Entry
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Identify all
                      sources of supply</strong> to the confined space and to
                      all equipment within it &mdash; check drawings, trace
                      cables, and verify with the duty holder. Consider both
                      normal and emergency supplies, standby generators, UPS
                      systems, and any adjacent circuits that could be
                      inadvertently contacted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">Switch off and lock
                      off</strong> each supply at the nearest point of
                      isolation. Each supply must be individually identified,
                      switched off, and locked using a{" "}
                      <strong className="text-white">personal
                      padlock</strong> &mdash; every person entering the
                      confined space must fit their own lock to every
                      isolation point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">Prove dead</strong> at the
                      point of work using an approved voltage indicator. Follow
                      the <strong className="text-white">prove-test-prove
                      method</strong>: prove the voltage indicator works on a
                      known live source, test the isolated circuit at the point
                      of work, then prove the voltage indicator still works on
                      the known live source
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">Fit caution
                      notices</strong> at each isolation point &mdash;
                      &ldquo;DANGER &mdash; Do not switch on &mdash; Personnel
                      working in confined space&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">Complete the
                      isolation register</strong> &mdash; record all isolation
                      points, lock numbers, the name of each person who has
                      locked on, date and time of isolation, and the scope of
                      work authorised
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Personal Padlocks
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Each person entering the confined space must fit{" "}
                  <strong className="text-white">their own personal
                  padlock</strong> to every isolation point. No one else holds
                  a key to that lock. The lock may only be removed by the person
                  who fitted it, and only after they have personally confirmed
                  that they are clear of the confined space and it is safe to
                  re-energise. A &ldquo;master key&rdquo; system must{" "}
                  <strong className="text-white">never</strong> be used for
                  confined space isolation &mdash; there must be no possibility
                  of a supply being restored while someone is still inside the
                  space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Cable Routing and Temporary Lighting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">06</span>
            Cable Routing and Temporary Lighting
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When mains-powered equipment must be used in a confined space,
                the routing of supply cables and the provision of temporary
                lighting are <strong>critical safety considerations</strong>.
                Poor cable management or inadequate lighting significantly
                increases the risk of incidents.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Cable Routing Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Never trail cables
                      across the entry/exit point</strong> &mdash; in an
                      emergency, cables across the escape route could trip a
                      person or obstruct rescue
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use <strong className="text-white">overhead cable
                      supports</strong> or wall-mounted hangers where possible
                      to keep cables clear of the working area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Protect cables
                      against mechanical damage</strong> &mdash; especially
                      where they pass through access openings or over sharp
                      edges. Use cable protectors, rubber matting, or conduit
                      sections
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Avoid <strong className="text-white">tight bends or
                      kinks</strong> that could damage insulation and create
                      fault points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Inspect all cables
                      before use</strong> &mdash; check for cuts, abrasion,
                      damaged plugs, and signs of overheating at connections
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Temporary Lighting Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adequate
                      illumination</strong> must be provided throughout the
                      confined space &mdash; working in poor light increases
                      the risk of contact with live parts and slips/trips
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Voltage must match
                      conditions</strong> &mdash; 25V for damp, 12V for very
                      wet confined spaces (as above)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">LED luminaires
                      preferred</strong> &mdash; less heat output (reducing
                      burn risk and ignition hazard), lower power consumption,
                      longer battery-backup run times, more robust than
                      filament or fluorescent lamps
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">ATEX-rated in
                      flammable atmospheres</strong> &mdash; where gas, vapour,
                      or dust could create an explosive atmosphere, ALL
                      electrical equipment (including lighting) must carry the
                      appropriate Ex marking under the ATEX Directive
                      (2014/34/EU)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency
                      lighting</strong> &mdash; a battery-powered emergency
                      torch should be carried by each person entering the
                      space, in case the temporary lighting fails
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">ATEX Zones:</strong> Before
                  selecting lighting or any electrical equipment for a confined
                  space with a potentially flammable atmosphere, the space must
                  be <strong>gas-tested</strong> and a competent person must
                  determine the <strong>zone classification</strong> (Zone 0,
                  1, or 2 for gases; Zone 20, 21, or 22 for dusts). The
                  equipment&rsquo;s Ex rating must match or exceed the zone
                  classification. Using equipment rated for a lower-risk zone
                  in a higher-risk zone is a <strong>serious safety
                  breach</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Electrical Testing and Live Working Restrictions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">07</span>
            Electrical Testing and Live Working Restrictions
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical testing in confined spaces requires{" "}
                <strong>specific additional precautions</strong> beyond those
                applied to standard testing. The restricted environment and
                conductive surroundings mean that test voltages which would
                normally present minimal risk become significantly more
                dangerous.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Safe Testing Procedures
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Test instruments
                      must be battery-powered</strong> and within their
                      calibration date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Insulation
                      resistance testing</strong> (which applies a high test
                      voltage, typically 500V DC) must only be carried out
                      after full isolation and proving dead of all circuits
                      within the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Earth continuity
                      testing</strong> &mdash; ensure the test instrument leads
                      are in good condition and that exposed test probes do not
                      contact the conductive surroundings during testing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">A standby person
                      must be present</strong> outside the space at all times
                      during testing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The <strong className="text-white">permit to
                      work</strong> must specifically authorise the testing
                      activity and identify which tests are to be carried out
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use only <strong className="text-white">approved test
                      equipment</strong> that complies with
                      GS&nbsp;38 (guidance on test instruments)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Portable Appliance Considerations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All portable appliances must have a{" "}
                      <strong className="text-white">current PAT test
                      label</strong> before being taken into any confined space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">IP ratings</strong> must
                      be appropriate for the environment &mdash; minimum IP44
                      for damp conditions, IP55 or higher for very wet
                      conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Class II
                      (double-insulated)</strong> equipment is preferred over
                      Class I in confined spaces because it does not rely on
                      an earth connection for protection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Visually inspect all appliances and leads{" "}
                      <strong className="text-white">before each
                      use</strong> &mdash; reject any item showing damage,
                      discolouration, or signs of overheating
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Live Working &mdash; Generally PROHIBITED
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Working on or near live electrical equipment is{" "}
                  <strong className="text-white">generally prohibited in
                  confined spaces</strong>. The combination of conductive
                  surroundings, damp conditions, restricted movement, and
                  limited escape routes makes live working exceptionally
                  dangerous. Live working may only be considered where it is{" "}
                  <strong className="text-white">unreasonable in all the
                  circumstances</strong> for the equipment to be dead, where
                  it is reasonable for the person to be working near live
                  conductors, and where <strong className="text-white">suitable
                  additional precautions</strong> are in place. Even then, a
                  specific risk assessment, method statement, and written
                  authorisation from a senior authorised person are required.
                  In practice, live working in confined spaces is{" "}
                  <strong className="text-white">almost never justified</strong>{" "}
                  and must be avoided wherever possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Emergency Shutdown and Specific Scenarios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">08</span>
            Emergency Shutdown and Specific Scenarios
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emergency shutdown arrangements are a{" "}
                <strong>critical safety requirement</strong> for any confined
                space where electrical supplies are present. The ability to
                rapidly disconnect all supplies from outside the space can be
                the difference between a near-miss and a fatality.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Emergency Shutdown Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Emergency shutdown must be{" "}
                      <strong className="text-white">clearly identified
                      and accessible from OUTSIDE</strong> the confined space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Must disconnect <strong className="text-white">ALL
                      electrical supplies</strong> to the confined space,
                      including temporary supplies brought in for the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The <strong className="text-white">standby
                      person</strong> must know the location and operation of
                      the emergency shutdown before entry begins
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rescue team
                      members</strong> must also be briefed on the emergency
                      shutdown location and operation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The shutdown point must be{" "}
                      <strong className="text-white">clearly
                      labelled</strong> &mdash; &ldquo;EMERGENCY ELECTRICAL
                      SHUTDOWN &mdash; Confined Space&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Specific Scenarios
                </p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      A
                    </span>
                    <span>
                      <strong className="text-white">Cable jointing in
                      manholes:</strong> Manholes are often damp or flooded,
                      with metal ladder rungs, cast-iron covers, and cables
                      running through the walls. Use 12V or 25V lighting
                      depending on water levels. Battery-powered tools are
                      essential. All adjacent cables in the manhole must be
                      identified and isolated or proved dead before work begins.
                      Manhole covers must remain open for ventilation and escape
                      &mdash; never work in a sealed manhole with electrical
                      equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      B
                    </span>
                    <span>
                      <strong className="text-white">Switchgear
                      maintenance in substations:</strong> Small substations
                      can meet the definition of a confined space when access
                      is restricted and a foreseeable hazard exists.
                      High-voltage and low-voltage switchgear may be present.
                      Arc flash risk is extremely high in enclosed switchgear
                      rooms. Full safe isolation, arc flash PPE, and emergency
                      shutdown accessible from outside the substation are
                      essential. Consider remote racking of circuit breakers
                      to reduce time spent in the confined area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      C
                    </span>
                    <span>
                      <strong className="text-white">Motor replacement
                      in plant rooms:</strong> Enclosed plant rooms with large
                      rotating machinery can be classified as confined spaces.
                      Motors may have multiple supply feeds (power, control,
                      heaters). ALL supplies to the motor must be identified
                      and isolated &mdash; not just the main power supply.
                      Stored energy in capacitors must be safely discharged
                      before work begins. Adequate temporary lighting is
                      essential when the plant room&rsquo;s normal lighting
                      circuits are isolated for safety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-cyan-400">
                      D
                    </span>
                    <span>
                      <strong className="text-white">Cable installation
                      in ducts:</strong> Cable ducts and trunking routes can
                      become confined spaces, particularly underground or
                      within building risers. Existing cables in the duct may
                      be live &mdash; they must be identified and either
                      isolated or physically protected before new cables are
                      drawn through. Cable pulling equipment must be on
                      reduced-voltage supplies. Adequate lighting and
                      communication between the duct entry and exit points
                      are essential for safe cable pulling operations
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram 2: Electrical Safety in Confined Spaces Checklist */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">&nbsp;</span>
            Electrical Safety in Confined Spaces &mdash; Checklist
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-cyan-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-cyan-400 font-semibold mb-4 text-center tracking-widest uppercase">
                Pre-Entry Electrical Safety Verification
              </p>

              {/* Checklist phases */}
              <div className="space-y-4 min-w-[300px]">
                {/* Phase 1: Before Entry */}
                <div className="border-2 border-red-400/40 bg-red-500/5 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-red-400">1</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-red-400">
                      BEFORE ENTRY &mdash; Isolation
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1.5">
                    {[
                      "All supplies identified from drawings",
                      "Each supply switched off and locked off",
                      "Personal padlock fitted by each entrant",
                      "Proved dead (prove-test-prove method)",
                      "Caution notices fitted at all isolation points",
                      "Isolation register completed",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-0.5 w-4 h-4 rounded border border-red-400/40 flex-shrink-0 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-red-400/60" />
                        </div>
                        <span className="text-[10px] sm:text-xs text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase 2: Equipment Selection */}
                <div className="border-2 border-yellow-400/40 bg-yellow-500/5 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-yellow-400">2</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-yellow-400">
                      EQUIPMENT SELECTION
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1.5">
                    {[
                      "Battery tools selected as first choice",
                      "110V CTE for mains-powered tools",
                      "25V / 12V lighting for conditions",
                      "ATEX-rated if flammable atmosphere",
                      "PAT tested with current labels",
                      "IP rating appropriate for conditions",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-0.5 w-4 h-4 rounded border border-yellow-400/40 flex-shrink-0 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-yellow-400/60" />
                        </div>
                        <span className="text-[10px] sm:text-xs text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase 3: Cable and Supply Setup */}
                <div className="border-2 border-cyan-400/40 bg-cyan-500/5 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-cyan-400">3</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-cyan-400">
                      CABLE &amp; SUPPLY SETUP
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1.5">
                    {[
                      "Cables routed clear of entry/exit",
                      "Overhead supports or wall hangers fitted",
                      "Cable protection at access openings",
                      "30mA RCD fitted and tested",
                      "Transformer positioned outside space",
                      "Emergency shutdown identified and labelled",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-0.5 w-4 h-4 rounded border border-cyan-400/40 flex-shrink-0 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-cyan-400/60" />
                        </div>
                        <span className="text-[10px] sm:text-xs text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase 4: Briefing and Entry */}
                <div className="border-2 border-green-400/40 bg-green-500/5 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-green-400">4</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-green-400">
                      BRIEFING &amp; ENTRY
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1.5">
                    {[
                      "Standby person briefed on emergency shutdown",
                      "Rescue team knows shutdown location",
                      "Permit to work issued and signed",
                      "Emergency torch carried by each entrant",
                      "Communication system tested",
                      "All entrants briefed on electrical hazards",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-0.5 w-4 h-4 rounded border border-green-400/40 flex-shrink-0 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-green-400/60" />
                        </div>
                        <span className="text-[10px] sm:text-xs text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key note */}
              <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] sm:text-xs text-red-300 font-medium">
                  ALL phases must be completed and verified BEFORE electrical work begins in the confined space
                </p>
              </div>

              {/* Legend */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/40" />
                  <span className="text-[9px] text-white/50">Isolation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/40" />
                  <span className="text-[9px] text-white/50">Equipment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-cyan-500/20 border border-cyan-500/40" />
                  <span className="text-[9px] text-white/50">Supply setup</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/40" />
                  <span className="text-[9px] text-white/50">Briefing &amp; entry</span>
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-5">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
