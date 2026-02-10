import { ArrowLeft, Zap, CheckCircle, AlertTriangle, ShieldAlert, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cs-m1s4-cable-tunnel",
    question: "What are the THREE main hazards that make cable ducts and tunnels confined spaces for electricians?",
    options: [
      "Heat build-up from loaded cables, gas ingress from ground or services, and limited egress routes",
      "Water ingress, falling objects, and poor mobile signal",
      "UV radiation, wind exposure, and traffic hazards",
      "Manual handling risk, working at height, and noise exposure"
    ],
    correctIndex: 0,
    explanation: "Cable ducts and tunnels are classified as confined spaces primarily because of heat build-up from current-carrying cables (which can raise ambient temperatures well above 40\u00b0C), gas ingress from surrounding ground or adjacent services (such as methane, CO\u2082, or leaked gas), and limited egress routes meaning escape in an emergency is restricted. These three factors combine to create a foreseeable risk of serious injury."
  },
  {
    id: "cs-m1s4-sf6-hazard",
    question: "Why is SF\u2086 (sulphur hexafluoride) gas considered a confined-space hazard in switchgear rooms?",
    options: [
      "SF\u2086 is highly flammable and creates explosion risk",
      "SF\u2086 is 5 times heavier than air, displaces oxygen, and produces toxic decomposition products when arced",
      "SF\u2086 corrodes copper conductors and damages cable insulation",
      "SF\u2086 creates static electricity that increases the risk of electric shock"
    ],
    correctIndex: 1,
    explanation: "SF\u2086 is approximately 5 times heavier than air, so it sinks and accumulates at low levels in enclosed rooms. In its pure state it is an asphyxiant that displaces oxygen. More critically, when SF\u2086 is exposed to an electrical arc (e.g. during a fault), it decomposes into extremely toxic by-products including sulphur dioxide (SO\u2082), hydrogen fluoride (HF), and other compounds that are immediately dangerous to life and health. This is why SF\u2086 switchgear rooms must be treated as potential confined spaces."
  },
  {
    id: "cs-m1s4-reduced-voltage",
    question: "Under BS 7671 requirements for confined spaces, what is the maximum voltage permitted for portable hand lamps?",
    options: [
      "230V with RCD protection",
      "110V from a centre-tapped earth transformer",
      "25V from a safety isolating transformer",
      "12V from a safety extra-low voltage (SELV) source"
    ],
    correctIndex: 3,
    explanation: "BS 7671 requires that in confined or restrictive conductive locations, portable hand lamps must be supplied at no more than 12V SELV (Safety Extra-Low Voltage). The reduced voltage hierarchy for confined spaces is: 110V centre-tapped earth for general portable tools, 25V from a safety isolating transformer for portable lighting, and 12V SELV for hand lamps. This is because the body\u2019s resistance is significantly reduced in confined spaces due to perspiration, contact with conductive surfaces, and restricted movement that makes it harder to break free from a shock."
  }
];

const faqs = [
  {
    question: "Do all cable tunnels count as confined spaces?",
    answer: "Not automatically. A cable tunnel becomes a confined space when it meets the criteria under the Confined Spaces Regulations 1997: it is substantially (though not always entirely) enclosed, has limited means of access or egress, and there is a reasonably foreseeable risk of serious injury from a specified hazard such as oxygen depletion, toxic gas accumulation, heat build-up, or fire. A well-ventilated, easily accessible cable trench may not qualify, but a long underground tunnel with limited exits, poor ventilation, and heat from loaded cables almost certainly will. The assessment must be specific to each location and its conditions at the time of work."
  },
  {
    question: "Why are UPS battery rooms considered confined spaces?",
    answer: "UPS (Uninterruptible Power Supply) battery rooms typically contain large banks of lead-acid or valve-regulated lead-acid (VRLA) batteries. During normal charging and especially overcharging, these batteries release hydrogen gas. Hydrogen is highly flammable and explosive at concentrations between 4% and 75% in air. In an enclosed room with poor ventilation, hydrogen can accumulate to dangerous levels. Additionally, sulphuric acid mist may be released, creating a toxic atmosphere. The combination of enclosed space, limited ventilation, potential oxygen enrichment from electrolysis, and explosive gas accumulation means UPS battery rooms must be treated as potential confined spaces with appropriate ventilation monitoring and controls."
  },
  {
    question: "Why is arc flash risk amplified in a confined space?",
    answer: "Arc flash in a confined space is significantly more dangerous than in open air for several reasons. First, the blast pressure wave cannot dissipate and is reflected off walls, floors, and ceilings, multiplying the force on the worker. Second, the superheated gases (which can exceed 19,000\u00b0C) have nowhere to escape, meaning the worker is engulfed for longer. Third, molten metal and debris are projected with greater force in the confined volume. Fourth, toxic fumes from burning insulation, cable sheathing, and other materials accumulate rapidly with no natural ventilation. Fifth, the worker has limited ability to move away from the arc. For these reasons, arc flash risk assessments in confined spaces must account for the amplification effect, and the selection of PPE, switching procedures, and remote racking should all be enhanced."
  },
  {
    question: "Can I use standard 230V tools in a confined space?",
    answer: "No. BS 7671 and the Electricity at Work Regulations 1989 require reduced voltage in confined and restrictive conductive locations. Standard 230V tools must never be used. The hierarchy is: battery-powered tools are preferred as the safest option; 110V centre-tapped earth (CTE) tools may be used for general power tools where the maximum voltage to earth is 55V; 25V from a safety isolating transformer for portable lighting; and 12V SELV for hand lamps. RCD protection at 30mA must also be provided as a secondary measure, but it is not a substitute for reduced voltage. The reason is that body impedance is significantly lowered in confined spaces due to sweat, contact with conductive surfaces, and restricted movement, making even relatively low voltages potentially lethal."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT typically classified as a confined space encountered by electricians?",
    options: [
      "A cable tunnel beneath a university campus",
      "A well-ventilated open-plan office with suspended ceiling tiles",
      "An underground transformer chamber accessed via a vertical ladder",
      "A lift motor room at the top of a building shaft"
    ],
    correctAnswer: 1,
    explanation: "A well-ventilated open-plan office is not a confined space. It is not substantially enclosed, has multiple means of egress, and does not present a foreseeable risk of serious injury from a specified hazard. Cable tunnels, underground transformer chambers, and lift motor rooms all meet the criteria: substantially enclosed, limited access/egress, and foreseeable risks from heat, gas accumulation, or atmospheric hazards."
  },
  {
    id: 2,
    question: "What specific atmospheric hazard is associated with UPS battery rooms during charging?",
    options: [
      "Carbon monoxide from diesel generators",
      "Hydrogen gas released from lead-acid batteries",
      "Nitrogen from purged cable insulation",
      "Radon gas from concrete floor slabs"
    ],
    correctAnswer: 1,
    explanation: "Lead-acid and VRLA batteries release hydrogen gas during charging, particularly overcharging. Hydrogen is explosive at concentrations between 4% and 75% in air (the lower explosive limit, LEL, is 4%). In an enclosed UPS battery room with inadequate ventilation, hydrogen can accumulate to dangerous levels. This is why battery rooms require forced ventilation, hydrogen gas detection, and prohibition of ignition sources."
  },
  {
    id: 3,
    question: "What are the toxic decomposition products of SF\u2086 gas when exposed to an electrical arc?",
    options: [
      "Carbon dioxide and water vapour",
      "Sulphur dioxide (SO\u2082) and hydrogen fluoride (HF)",
      "Methane and ethane",
      "Ammonia and chlorine"
    ],
    correctAnswer: 1,
    explanation: "When SF\u2086 is exposed to an electrical arc (such as during a fault in gas-insulated switchgear), it decomposes into extremely toxic by-products including sulphur dioxide (SO\u2082), hydrogen fluoride (HF), sulphur tetrafluoride (SF\u2084), and disulphur decafluoride (S\u2082F\u2081\u2080). These compounds are immediately dangerous to life and health (IDLH). Workers must never enter an SF\u2086 switchgear room after a fault without atmospheric monitoring and appropriate respiratory protective equipment."
  },
  {
    id: 4,
    question: "At what depth does a cable-laying trench become a confined space under standard guidance?",
    options: [
      "Any depth below 0.5m",
      "Depths exceeding 1.2m",
      "Only trenches deeper than 2.0m",
      "Trenches over 3.0m deep only"
    ],
    correctAnswer: 1,
    explanation: "Standard industry guidance treats excavations exceeding 1.2m in depth as potential confined spaces, because at this depth a worker cannot easily climb out unaided, and the trench walls create a substantially enclosed environment where gases can accumulate. Ground gas (methane, carbon dioxide, hydrogen sulphide), water ingress, and collapse risk all increase with depth. A specific risk assessment is required for any trench work, and confined-space procedures apply where the 1.2m threshold is exceeded."
  },
  {
    id: 5,
    question: "Why is arc flash MORE dangerous in a confined space compared to an open switchboard room?",
    options: [
      "The voltage is higher in confined spaces",
      "Blast pressure waves are reflected and amplified, superheated gases cannot dissipate, and escape is restricted",
      "The electrical equipment in confined spaces is always older and less maintained",
      "Arc flash can only occur in confined spaces, not in open environments"
    ],
    correctAnswer: 1,
    explanation: "Arc flash in a confined space is amplified because the blast pressure wave reflects off surrounding walls and surfaces rather than dissipating into open air. Superheated gases (potentially exceeding 19,000\u00b0C) engulf the worker for longer because they have nowhere to escape. Molten metal and debris ricochet within the enclosed volume. Toxic combustion fumes accumulate rapidly. And critically, the worker\u2019s ability to move away from the arc is severely restricted. This amplification effect must be factored into arc flash risk assessments for confined-space electrical work."
  },
  {
    id: 6,
    question: "What maximum voltage is permitted for portable hand lamps in a confined or restrictive conductive location under BS 7671?",
    options: [
      "230V with RCD protection",
      "110V centre-tapped earth",
      "25V from a safety isolating transformer",
      "12V SELV (Safety Extra-Low Voltage)"
    ],
    correctAnswer: 3,
    explanation: "BS 7671 requires portable hand lamps in confined or restrictive conductive locations to be supplied at no more than 12V SELV (Safety Extra-Low Voltage). This is the lowest tier in the reduced voltage hierarchy. Body resistance is significantly reduced in confined spaces due to perspiration, contact with conductive surfaces, and inability to break free from a shock source. At 12V SELV, the risk of a lethal shock is minimised even under these worst-case conditions."
  },
  {
    id: 7,
    question: "Which gas hazard is most commonly associated with manholes and joint bays in power or telecoms networks?",
    options: [
      "Chlorine from water treatment",
      "Methane from decomposing organic matter and ground gas",
      "Propane from nearby LPG storage",
      "Ozone from electrical discharge"
    ],
    correctAnswer: 1,
    explanation: "Manholes and joint bays are particularly susceptible to methane accumulation. Methane enters from decomposing organic matter in surrounding soil, leaking gas mains, sewage systems, and landfill sites. Because methane is lighter than air but can become trapped in covered manholes, it can accumulate to explosive concentrations. Methane is explosive between 5% and 15% in air (LEL 5%). Every manhole and joint bay must be tested for methane, oxygen levels, and other gases before entry, and continuous monitoring maintained throughout the work."
  },
  {
    id: 8,
    question: "A wind turbine nacelle is considered a confined space primarily because of which combination of hazards?",
    options: [
      "Noise from the gearbox, vibration from the blades, and UV radiation from the sun",
      "Height above ground, restricted internal volume, limited egress, heat from machinery, and potential for SF\u2086 or oil vapour accumulation",
      "Electromagnetic fields from the generator, lightning strike risk, and ice throw",
      "Manual handling of heavy tools, working alone, and fatigue from climbing"
    ],
    correctAnswer: 1,
    explanation: "A wind turbine nacelle meets confined-space criteria because of its restricted internal volume (typically only enough space for one or two workers), limited egress (a single ladder or hatch leading to the tower interior), significant heat build-up from the gearbox and generator, and potential accumulation of hazardous atmospheres including oil vapour from the gearbox, SF\u2086 from switchgear (in some designs), and reduced oxygen levels. The height above ground (often 80\u2013120m) compounds the danger because emergency rescue is extremely difficult. Working at height and confined-space risks interact to create a particularly hazardous environment."
  }
];

export default function ConfinedSpacesModule1Section4() {
  useSEO({
    title: "Confined Spaces in Electrical Work | Confined Spaces Module 1.4",
    description: "Cable ducts, transformer chambers, substations, plant rooms, risers, voids, lift motor rooms, trenches, manholes, and specific electrical hazards in confined spaces including arc flash amplification and reduced voltage requirements.",
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
            <Link to="../confined-spaces-module-1">
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
            <span className="text-cyan-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Confined Spaces in Electrical Work
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Cable ducts and tunnels, transformer chambers, substations, plant rooms, risers, voids, and other confined spaces that electricians encounter &mdash; plus the specific electrical hazards that make these environments uniquely dangerous
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>11 types</strong> of confined space common in electrical work</li>
              <li><strong>Arc flash risk amplified</strong> &mdash; blast reflects off walls</li>
              <li><strong>12V SELV</strong> for hand lamps in confined spaces</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Battery tools preferred</strong> &mdash; no trailing leads</li>
              <li><strong>110V CTE max</strong> for portable power tools</li>
              <li><strong>RCD at 30mA</strong> as secondary protection &mdash; not a substitute for reduced voltage</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify at least eight types of confined space commonly encountered by electricians",
              "Explain the specific hazards of cable tunnels including heat build-up, gas ingress, and limited egress",
              "Describe the dangers of SF\u2086 decomposition products in switchgear rooms and transformer chambers",
              "Explain why arc flash risk is amplified in a confined space and what additional controls are required",
              "State the reduced voltage requirements under BS 7671 for confined and restrictive conductive locations",
              "Identify the atmospheric hazards in UPS battery rooms, manholes, joint bays, and trench excavations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Cable Ducts and Tunnels */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Cable Ducts and Tunnels
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cable tunnels are found beneath universities, hospitals, industrial campuses, data centres,
                and military installations. They provide a continuous underground route for high-voltage and
                low-voltage power cables, fibre-optic links, and control cabling between buildings. Tunnels
                can extend for <strong>hundreds of metres</strong> and are typically just wide enough for a
                single person to walk through &mdash; often requiring stooping or crawling in older
                installations.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Key Hazards</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Heat build-up:</strong> Current-carrying cables generate significant heat. In a tunnel with poor ventilation, ambient temperatures can exceed 40&ndash;50&deg;C, creating a risk of heat exhaustion, heat stroke, and reduced cognitive function</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Gas ingress:</strong> Methane, carbon dioxide, and hydrogen sulphide can migrate through soil into tunnels. Leaks from adjacent gas mains, drainage systems, or contaminated land add further risk. Oxygen depletion can occur without warning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Limited egress:</strong> Entry and exit points may be hundreds of metres apart. If a fire, gas release, or medical emergency occurs, escape is slow and difficult. Some tunnels have only a single access point</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fire and smoke:</strong> Cable insulation is combustible. A cable fault or fire in a tunnel produces dense toxic smoke that fills the space within seconds, making visibility zero and breathing impossible without BA</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Locations</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "University campuses (inter-building HV/LV distribution)",
                    "Hospital sites (critical infrastructure links)",
                    "Industrial estates and manufacturing plants",
                    "Data centres (redundant power routing)",
                    "Military bases and government facilities",
                    "District heating and combined services tunnels"
                  ].map((location, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                      <span>{location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Transformer Chambers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Transformer Chambers
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Transformer chambers house oil-filled transformers, dry-type transformers, and associated
                switchgear. They are often located in basements, underground vaults, or purpose-built
                enclosures with restricted access. These spaces present a unique combination of
                <strong> electrical, chemical, and atmospheric hazards</strong> that qualify them as confined spaces.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-cyan-400 mb-3">Oil-Filled Transformers</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mineral oil vapour creates fire and explosion risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Oil leaks produce slip hazards on confined floors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Older transformers may contain PCBs (polychlorinated biphenyls) &mdash; a toxic, carcinogenic substance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Significant heat output reduces air quality and causes heat stress</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-cyan-400 mb-3">SF&#8326; Switchgear</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>SF&#8326; is 5&times; heavier than air &mdash; sinks and pools at floor level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Displaces oxygen &mdash; asphyxiation risk at low levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Arc decomposition produces SO&#8322;, HF, and other IDLH compounds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Gas leaks are colourless and may go undetected without instruments</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  After an <strong className="text-white">electrical fault in an SF&#8326; switchgear room</strong>, the
                  atmosphere must be assumed to be immediately dangerous to life and health (IDLH). No one
                  may enter without full breathing apparatus (BA) and atmospheric monitoring. The toxic
                  decomposition products &mdash; including hydrogen fluoride (HF) &mdash; can cause severe
                  chemical burns to the lungs, eyes, and skin even at very low concentrations. Ventilation
                  must be established before any unprotected entry.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Substations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Substations
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Substations range from small kiosk-type units on residential streets to large indoor,
                basement, and underground installations serving commercial and industrial premises.
                Many substations meet confined-space criteria, particularly those that are
                <strong> below ground, within buildings, or of the sealed gas-insulated switchgear (GIS) type</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types Most Likely to Be Confined Spaces</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Underground substations:</strong> Found beneath city streets and large buildings. Access via vertical shafts, manholes, or steep stairways. Poor natural ventilation, potential water ingress, and accumulation of exhaust gases from street level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Basement substations:</strong> Located beneath commercial buildings. Often share ventilation with car parks (carbon monoxide risk), have limited egress routes, and experience heat build-up from transformers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Indoor substations:</strong> Purpose-built rooms within factories, hospitals, and data centres. May have sealed doors, forced ventilation systems (which can fail), and contain SF&#8326; equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Gas-insulated switchgear (GIS) rooms:</strong> Sealed environments with SF&#8326; equipment. Oxygen displacement risk, toxic decomposition products if faults occur, and often very restricted internal space around the equipment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-2">Common Substation Hazards</p>
                <p className="text-sm text-white/80">
                  All substations &mdash; whether classified as confined spaces or not &mdash; present electrical
                  hazards including arc flash, contact with live conductors, and step/touch potential.
                  When a substation <strong className="text-white">also qualifies as a confined space</strong>,
                  these electrical hazards are compounded by atmospheric risks (oxygen depletion, toxic gases),
                  thermal risks (heat stress from transformer losses), and access/egress limitations. The
                  combined risk profile requires both <strong className="text-white">electrical safety procedures</strong> (permit to
                  work, isolation, proving dead) and <strong className="text-white">confined-space procedures</strong> (risk assessment,
                  atmospheric monitoring, rescue plan) to be applied simultaneously.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Plant Rooms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Plant Rooms
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Plant rooms house the mechanical and electrical infrastructure that serves a building:
                boilers, chillers, air-handling units, switchgear, UPS systems, and battery banks.
                Electricians frequently work in plant rooms for installation, maintenance, and fault-finding.
                Several types of plant room can meet confined-space criteria.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Plant Room and Their Hazards</p>
                <div className="space-y-4">
                  <div className="bg-cyan-500/5 border border-cyan-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-cyan-300 mb-2">Boiler Rooms</p>
                    <p className="text-sm text-white/80">
                      Gas-fired boilers produce carbon monoxide (CO) if combustion is incomplete. Flue leaks
                      can fill a room with CO &mdash; a colourless, odourless, lethal gas. Natural gas leaks
                      create explosion risk. High temperatures cause heat stress. Basement boiler rooms
                      often have limited ventilation and a single access point.
                    </p>
                  </div>

                  <div className="bg-cyan-500/5 border border-cyan-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-cyan-300 mb-2">Switch Rooms</p>
                    <p className="text-sm text-white/80">
                      Main LV switch rooms in large commercial buildings can be enclosed, windowless rooms
                      with a single door. Heat from loaded busbars and switchgear raises ambient temperatures.
                      Arc flash risk is significant. If the door is closed and ventilation fails, oxygen
                      levels may drop and heat build-up can become dangerous during prolonged work.
                    </p>
                  </div>

                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-300 mb-2">UPS Battery Rooms</p>
                    <p className="text-sm text-white/80">
                      Lead-acid and VRLA batteries release <strong className="text-white">hydrogen gas</strong> during
                      charging. Hydrogen is <strong className="text-white">explosive between 4% and 75% in air</strong>.
                      Sulphuric acid mist can also be released. Battery rooms are typically sealed to prevent
                      unauthorised access, creating an enclosed environment where hydrogen accumulates if
                      ventilation fails. A single spark from a tool, switch, or static discharge can trigger
                      a hydrogen explosion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Diagram: Plant Room Hazard Map */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-4 text-center">Plant Room Hazard Map &mdash; Electrician&rsquo;s Perspective</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-red-300 mb-1">UPS / Battery</p>
                    <p className="text-[10px] text-white/50">Hydrogen gas</p>
                    <p className="text-[10px] text-white/50">Acid mist</p>
                    <p className="text-[10px] text-white/50">Explosion risk</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-orange-300 mb-1">Boiler / Gas</p>
                    <p className="text-[10px] text-white/50">CO poisoning</p>
                    <p className="text-[10px] text-white/50">Gas leak</p>
                    <p className="text-[10px] text-white/50">Heat stress</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-cyan-300 mb-1">Switchgear</p>
                    <p className="text-[10px] text-white/50">Arc flash</p>
                    <p className="text-[10px] text-white/50">Heat build-up</p>
                    <p className="text-[10px] text-white/50">Busbar contact</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-yellow-300 mb-1">Chiller / AHU</p>
                    <p className="text-[10px] text-white/50">Refrigerant leak</p>
                    <p className="text-[10px] text-white/50">O&#8322; displacement</p>
                    <p className="text-[10px] text-white/50">Rotating parts</p>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-white/40">
                    All four zones share: <strong className="text-white/60">limited ventilation</strong>,{" "}
                    <strong className="text-white/60">restricted egress</strong>,{" "}
                    <strong className="text-white/60">noise exposure</strong>
                  </p>
                </div>

                <p className="text-xs text-white/40 text-center mt-3">
                  Any plant room that is substantially enclosed with limited access and a foreseeable risk of serious injury must be treated as a confined space
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Electrical Risers, Ceiling Voids, and Floor Voids */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">05</span>
            Electrical Risers, Ceiling Voids &amp; Floor Voids
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                These are the &ldquo;hidden&rdquo; confined spaces that electricians encounter daily but often
                fail to recognise as such. Because access is frequent and the spaces feel familiar, the
                risks are routinely underestimated.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Electrical Risers (Vertical Shafts)</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Vertical shafts running through multi-storey buildings, shared with water pipes, gas pipes, data cabling, and ventilation ducts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Access is typically through small fire-rated doors at each floor level &mdash; very restricted working space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Chimney effect can draw smoke, gas, or heat from lower floors upward through the shaft</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Gas leaks from adjacent services (water, gas) can accumulate in the shaft</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Falling objects hazard when working above or below other operatives</span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-cyan-400 mb-3">Ceiling Voids</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Accumulation of dust, fibres, and particulates (including potential asbestos in older buildings)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Gas accumulation from leaking services above the ceiling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Restricted movement &mdash; often crawling or lying prone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Poor ventilation and elevated temperatures above lighting and HVAC</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-cyan-400 mb-3">Floor Voids (Raised Access Floors)</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Common in server rooms and offices &mdash; 150mm to 600mm+ depth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Dust and debris accumulation reduces air quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Refrigerant from under-floor cooling can displace oxygen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fire suppression gas (FM200, Novec) may discharge into the void &mdash; immediately oxygen-depleting</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Often Overlooked</p>
                </div>
                <p className="text-sm text-white/80">
                  Ceiling voids and floor voids are among the most commonly <strong className="text-white">unrecognised
                  confined spaces</strong> in the electrical trade. Because electricians access them routinely,
                  the tendency is to treat them as &ldquo;normal&rdquo; working environments. However, any
                  void that is substantially enclosed, has limited access/egress, and presents a foreseeable
                  risk of serious injury from a specified hazard <strong className="text-white">is a confined space under the law</strong>.
                  A specific risk assessment must determine whether confined-space procedures apply &mdash; never
                  assume they do not.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Lift Motor Rooms, Trenches, Manholes, and Joint Bays */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">06</span>
            Lift Motor Rooms, Trenches, Manholes &amp; Joint Bays
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Lift Motor Rooms</p>
                <p className="text-sm text-white/80 mb-3">
                  Located at the top of lift shafts, typically accessed via narrow ladders or steep stairways.
                  The room houses the motor, controller, governor, and electrical switchgear for the lift.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Restricted space &mdash; often very compact with limited room to manoeuvre around equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Heat build-up from motor and controller, especially in summer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Single access point makes evacuation and rescue difficult</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Oil from hydraulic systems or motor bearings creates fire and slip hazards</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Trench Work for Cable Laying</p>
                <p className="text-sm text-white/80 mb-3">
                  Excavations for laying power cables, duct runs, and earthing conductors are a routine part
                  of electrical installation work. Trenches exceeding <strong className="text-white">1.2m in depth</strong> must
                  be assessed as potential confined spaces.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Ground gas:</strong> Methane, CO&#8322;, and H&#8322;S can migrate from contaminated land, old landfill sites, or natural geological sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Water ingress:</strong> Heavy rain, water table, or burst mains can flood the trench rapidly, trapping workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Collapse:</strong> Unsupported trench walls can collapse without warning, burying workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Existing services:</strong> Gas mains, water pipes, and other buried services may be struck during excavation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Manholes and Joint Bays</p>
                <p className="text-sm text-white/80 mb-3">
                  Found throughout power distribution and telecommunications networks, manholes and joint
                  bays are underground chambers used for cable jointing, termination, and connection. They
                  are <strong className="text-white">classic confined spaces</strong> with multiple overlapping hazards.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Methane:</strong> From decomposing organic matter, sewage systems, old landfill, and natural ground gas &mdash; explosive between 5% and 15% in air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Hydrogen sulphide (H&#8322;S):</strong> From sewage contamination &mdash; toxic at very low concentrations, rapidly fatal above 100 ppm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Water ingress:</strong> Manholes frequently flood, creating drowning risk and electrical hazards from submerged cables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Oxygen depletion:</strong> Sealed covers prevent natural air exchange &mdash; oxygen levels can drop below safe limits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Renewable Energy Confined Spaces */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">07</span>
            Renewable Energy Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The growth of renewable energy has introduced new types of confined space that electricians
                must recognise. Solar farm inverter rooms and wind turbine nacelles/towers present unique
                combinations of restricted access, atmospheric hazards, and electrical risk.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-cyan-400 mb-3">Solar Farm Inverter Rooms</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Enclosed container-type rooms housing inverters, transformers, and switchgear</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Extreme heat &mdash; inverters and transformers generate significant thermal output in a small, sealed space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Potential for battery storage (lithium-ion) &mdash; thermal runaway produces toxic gases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>DC systems cannot be fully isolated while the sun is shining &mdash; PV panels always produce voltage</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-cyan-400 mb-3">Wind Turbine Nacelles &amp; Towers</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Nacelle: restricted volume, limited egress (single hatch to tower), 80&ndash;120m above ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tower interior: confined cylindrical space, vertical ladder climb, atmospheric hazards from oil vapour and SF&#8326;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Heat from gearbox and generator raises internal temperature</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Emergency rescue is extremely difficult at height &mdash; helicopter may be required</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Growing Sector</p>
                </div>
                <p className="text-sm text-white/80">
                  As the UK moves toward net zero, more electricians will work in renewable energy environments.
                  <strong className="text-white"> Battery Energy Storage Systems (BESS)</strong> are an emerging confined-space risk &mdash;
                  large containerised battery installations can experience thermal runaway events that produce
                  hydrogen fluoride, carbon monoxide, and other toxic gases in an enclosed space. Confined-space
                  training is increasingly essential for electricians entering the renewable energy sector.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Specific Electrical Hazards in Confined Spaces */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">08</span>
            Specific Electrical Hazards in Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical hazards that are manageable in open environments become <strong>significantly
                more dangerous</strong> in confined spaces. The combination of restricted movement,
                conductive surroundings, reduced body impedance, and limited escape routes means that
                even relatively low voltages can be lethal. BS 7671 (the IET Wiring Regulations) and
                the Electricity at Work Regulations 1989 impose strict requirements for electrical work
                in confined and restrictive conductive locations.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Arc Flash Amplification</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  In a confined space, arc flash is amplified because:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Blast pressure:</strong> The pressure wave reflects off walls and ceiling, multiplying the force on the worker &mdash; internal injuries, ruptured eardrums, and being thrown against structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Superheated gases:</strong> Cannot escape &mdash; the worker is engulfed at temperatures exceeding 19,000&deg;C for longer than in open air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Molten metal:</strong> Copper and aluminium projectiles ricochet within the confined volume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Toxic fumes:</strong> Burning insulation, cable sheathing, and plastics produce dense toxic smoke that fills the space within seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span><strong className="text-white">No escape:</strong> The worker cannot move away quickly &mdash; restricted egress means prolonged exposure to all of the above</span>
                  </li>
                </ul>
              </div>

              {/* Voltage Hierarchy Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-4 text-center">Reduced Voltage Hierarchy for Confined Spaces (BS 7671)</p>
                <p className="text-xs text-white/50 text-center mb-6">
                  Safest option at the top &mdash; voltage increases downward
                </p>

                <div className="flex flex-col items-center gap-0 max-w-md mx-auto">
                  {/* Battery Tools */}
                  <div className="w-full bg-green-500/15 border border-green-500/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-green-300">Battery-Powered Tools</p>
                    <p className="text-xs text-white/60">Preferred option &mdash; no trailing leads, no external voltage source</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30">
                      <span className="text-[10px] text-green-300 font-medium">SAFEST</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-cyan-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-cyan-400/60" />
                  </div>

                  {/* 12V SELV */}
                  <div className="w-full bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-cyan-300">12V SELV</p>
                    <p className="text-xs text-white/60">Hand lamps &mdash; Safety Extra-Low Voltage</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                      <span className="text-[10px] text-cyan-300 font-medium">HAND LAMPS ONLY</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-cyan-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-cyan-400/60" />
                  </div>

                  {/* 25V */}
                  <div className="w-full bg-cyan-500/15 border border-cyan-500/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-cyan-300">25V</p>
                    <p className="text-xs text-white/60">Portable lighting &mdash; from safety isolating transformer</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                      <span className="text-[10px] text-cyan-300 font-medium">PORTABLE LIGHTING</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-cyan-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-cyan-400/60" />
                  </div>

                  {/* 110V CTE */}
                  <div className="w-full bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-yellow-300">110V Centre-Tapped Earth (CTE)</p>
                    <p className="text-xs text-white/60">Portable power tools &mdash; max 55V to earth</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                      <span className="text-[10px] text-yellow-300 font-medium">PORTABLE TOOLS</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-red-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-400/60" />
                  </div>

                  {/* 230V PROHIBITED */}
                  <div className="w-full bg-red-500/15 border border-red-500/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-red-300">230V Mains</p>
                    <p className="text-xs text-white/60">PROHIBITED in confined / restrictive conductive locations</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/30 border border-red-500/40">
                      <span className="text-[10px] text-red-200 font-bold">NEVER USE</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-cyan-300 font-medium">
                    RCD protection at 30mA must ALWAYS be provided as secondary protection &mdash; but it is NOT a substitute for reduced voltage
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Why Reduced Voltage Is Essential</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Reduced body impedance:</strong> In confined spaces, perspiration is increased, the body is in contact with conductive surfaces (metal walls, pipes, wet concrete), and clothing may be damp &mdash; all of which reduce body impedance, meaning less voltage is needed to drive a lethal current</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Cannot break free:</strong> In a confined space, a worker who receives a shock may be unable to pull away from the source due to restricted movement &mdash; prolonging the shock duration and increasing the risk of ventricular fibrillation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Rescue difficulty:</strong> If a worker is incapacitated by electric shock in a confined space, rescue is complicated by the restricted access, the need for isolation, and the risk to rescuers from the same electrical hazard</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-2">BS 7671 Requirements for Special Locations</p>
                <p className="text-sm text-white/80 mb-3">
                  BS 7671 (the IET Wiring Regulations) contains specific requirements for electrical
                  installations in <strong className="text-white">restrictive conductive locations</strong> (Section 706).
                  Key requirements include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>SELV or PELV supply systems for hand-held equipment and hand lamps (12V max)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Safety isolating transformer placed <strong className="text-white">outside</strong> the confined space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Additional protection by 30mA RCD for all circuits supplying equipment in the space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Automatic disconnection of supply within the prescribed time limits for the voltage used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Protective equipotential bonding of all simultaneously accessible extraneous-conductive-parts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Emergency switching accessible from <strong className="text-white">outside</strong> the confined space</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Why Confined Spaces Kill
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
