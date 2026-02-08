import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Working in Confined Spaces - MOET Module 1.1.5";
const DESCRIPTION = "Comprehensive guide to the Confined Spaces Regulations 1997 for electrical maintenance technicians: hazard identification, atmospheric monitoring, entry permits, rescue arrangements, and electrical work in cable tunnels, manholes and switchrooms.";

const quickCheckQuestions = [
  {
    id: "confined-space-definition",
    question: "Which of the following correctly defines a 'confined space' under the Confined Spaces Regulations 1997?",
    options: [
      "Any space that is too small for a person to stand up in",
      "A space that is substantially enclosed AND has a reasonably foreseeable risk of serious injury from hazardous conditions",
      "Any underground space",
      "A space with only one exit"
    ],
    correctIndex: 1,
    explanation: "Under the Confined Spaces Regulations 1997, a confined space has two defining characteristics: (1) it is substantially (but not necessarily entirely) enclosed, AND (2) there is a reasonably foreseeable risk of serious injury from hazardous conditions within the space or nearby. Both conditions must be met. A small room is not a confined space if there are no foreseeable hazards; a large tank IS a confined space if there is a risk of toxic atmosphere."
  },
  {
    id: "atmospheric-monitoring",
    question: "When must atmospheric monitoring be carried out for confined space entry?",
    options: [
      "Only when the space smells unusual",
      "Before entry AND continuously throughout the work",
      "Only at the start of the working day",
      "Only when gas cylinders are present nearby"
    ],
    correctIndex: 1,
    explanation: "Atmospheric monitoring must be carried out before entry to confirm the atmosphere is safe, and then continuously throughout the work. Conditions can change during the work — oxygen can be depleted by work processes, toxic gases can accumulate, and ventilation can fail. Continuous monitoring with an audible alarm is essential. Never rely on a single pre-entry test."
  },
  {
    id: "rescue-arrangements",
    question: "Under the Confined Spaces Regulations 1997, when must rescue arrangements be in place?",
    options: [
      "Only when the space is classified as 'high risk'",
      "Only when more than two people are entering the space",
      "Before any person enters the confined space",
      "Only when requested by the site safety officer"
    ],
    correctIndex: 2,
    explanation: "Regulation 5 of the Confined Spaces Regulations 1997 requires that suitable and sufficient rescue arrangements are in place BEFORE any person enters a confined space. This includes rescue equipment, trained rescuers, communication systems, and emergency services notification. Rescue is the most critical element — more people die attempting rescues in confined spaces than are killed by the initial incident."
  },
  {
    id: "oxygen-levels",
    question: "What is the normal oxygen concentration in air, and at what level must entry be prevented?",
    options: [
      "Normal is 21%; entry prevented below 23%",
      "Normal is 20.9%; entry prevented below 19.5% or above 23.5%",
      "Normal is 25%; entry prevented below 20%",
      "Normal is 20.9%; entry prevented only below 16%"
    ],
    correctIndex: 1,
    explanation: "Normal atmospheric oxygen concentration is approximately 20.9%. Entry must be prevented when oxygen levels fall below 19.5% (oxygen-deficient — risk of impaired judgement, unconsciousness, death) or rise above 23.5% (oxygen-enriched — greatly increased fire and explosion risk). Both conditions are dangerous. Many confined space fatalities involve oxygen depletion, which can occur without warning because the human senses cannot detect falling oxygen levels."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under the Confined Spaces Regulations 1997, the FIRST principle employers must apply is:",
    options: [
      "Provide respiratory protective equipment for all workers",
      "Avoid entry into confined spaces where reasonably practicable",
      "Install permanent ventilation in all confined spaces",
      "Employ a dedicated confined space rescue team"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(1) states: 'No person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry.' Avoidance is always the first priority. If the work can be done from outside — using remote tools, CCTV, extended equipment, or by redesigning the task — entry must be avoided."
  },
  {
    id: 2,
    question: "Which of the following is a confined space hazard that can kill WITHOUT any warning?",
    options: [
      "Poor lighting",
      "Oxygen depletion — the atmosphere becomes oxygen-deficient without any detectable change in smell or visibility",
      "Cold temperatures",
      "Noise from external traffic"
    ],
    correctAnswer: 1,
    explanation: "Oxygen depletion is one of the most insidious confined space hazards because human senses cannot detect it. There is no smell, no visible change, and no warning sensation. As oxygen drops below 16%, the victim experiences impaired judgement, then rapid loss of consciousness, then death — often in seconds. This is why atmospheric monitoring with calibrated instruments is essential."
  },
  {
    id: 3,
    question: "A safe system of work for confined space entry must include:",
    options: [
      "Only a verbal briefing to the workers",
      "A written risk assessment, entry permit, atmospheric monitoring, ventilation, communication, and rescue arrangements",
      "Just a method statement and hard hat",
      "Only the provision of a gas detector"
    ],
    correctAnswer: 1,
    explanation: "A safe system of work for confined space entry is comprehensive: it includes a written risk assessment specific to the space and task, a formal entry permit, pre-entry and continuous atmospheric monitoring, forced ventilation, communication systems, rescue equipment and trained rescuers, PPE/RPE where needed, and defined roles and responsibilities. No single element is sufficient alone."
  },
  {
    id: 4,
    question: "What is the role of the 'top man' (attendant/banksman) during confined space entry?",
    options: [
      "To enter the space and assist with the work",
      "To remain at the entry point, maintain communication, monitor conditions, and initiate rescue if needed",
      "To complete paperwork in the site office",
      "To operate machinery near the confined space"
    ],
    correctAnswer: 1,
    explanation: "The top man (attendant) remains at the entry point throughout the entry. They must never enter the space. Their duties include: maintaining constant communication with the entrants, monitoring atmospheric conditions, controlling access to the space, keeping a log of entrants, and — critically — raising the alarm and initiating the rescue procedure if an emergency occurs. The top man is the link between the confined space and the outside world."
  },
  {
    id: 5,
    question: "A multi-gas detector used for confined space entry should monitor for a minimum of:",
    options: [
      "Oxygen only",
      "Oxygen, flammable gases (LEL), carbon monoxide, and hydrogen sulphide",
      "Temperature and humidity only",
      "Carbon dioxide only"
    ],
    correctAnswer: 1,
    explanation: "A standard 4-gas detector monitors: oxygen (O2) for depletion or enrichment, flammable gases measured as a percentage of the Lower Explosive Limit (LEL), carbon monoxide (CO) — a common toxic gas from combustion or chemical reaction, and hydrogen sulphide (H2S) — toxic gas from decomposing organic matter. Additional sensors may be required depending on the specific hazards identified in the risk assessment."
  },
  {
    id: 6,
    question: "Before entering an electrical cable tunnel for maintenance, which additional hazard must be specifically assessed?",
    options: [
      "The colour of the tunnel walls",
      "Electromagnetic fields from energised cables, heat from cable runs, and the risk of arc flash in an enclosed space",
      "The type of cable clips used",
      "The age of the building above"
    ],
    correctAnswer: 1,
    explanation: "Electrical cable tunnels present specific hazards beyond the standard confined space risks: electromagnetic fields from high-current cables, radiated heat from loaded cable runs (which can also deplete oxygen and increase temperature), arc flash risk in a confined environment (where blast pressure has nowhere to dissipate), and the presence of potentially damaged or degraded cable insulation. These must be specifically assessed and controlled."
  },
  {
    id: 7,
    question: "What is the maximum recommended concentration of carbon monoxide (CO) for confined space entry?",
    options: [
      "100 ppm — the workplace exposure limit",
      "30 ppm (the 8-hour WEL), with an alarm at 20 ppm for confined space work",
      "500 ppm",
      "There is no limit for carbon monoxide"
    ],
    correctAnswer: 1,
    explanation: "The workplace exposure limit (WEL) for carbon monoxide is 30 ppm (8-hour TWA) and 200 ppm (15-minute STEL). However, for confined space work, detectors are typically set to alarm at 20-25 ppm to provide an early warning margin. CO is particularly dangerous because it is odourless and colourless — it binds to haemoglobin 200 times more strongly than oxygen, causing rapid suffocation at the cellular level."
  },
  {
    id: 8,
    question: "Ventilation in a confined space should be:",
    options: [
      "Natural ventilation through the entry point is always sufficient",
      "Forced (mechanical) ventilation using explosion-proof fans, providing a continuous supply of clean air",
      "Only needed if the space smells bad",
      "Provided by opening a window"
    ],
    correctAnswer: 1,
    explanation: "Natural ventilation through the entry point is rarely sufficient for confined spaces. Forced (mechanical) ventilation using fans rated for the environment (explosion-proof/ATEX if flammable atmospheres are possible) must provide a continuous supply of clean air. The air intake must be positioned away from any contamination source (vehicle exhausts, process vents). The ventilation rate must achieve adequate air changes per hour for the space volume."
  },
  {
    id: 9,
    question: "More people die attempting rescues in confined spaces than are killed by the initial incident. This is because:",
    options: [
      "Rescue equipment is usually defective",
      "Would-be rescuers enter without protection and are overcome by the same hazard that affected the first person",
      "Confined spaces always collapse during rescue",
      "The fire brigade takes too long to arrive"
    ],
    correctAnswer: 1,
    explanation: "The phenomenon of 'multiple-casualty confined space incidents' occurs when well-meaning colleagues enter a confined space to rescue a fallen worker — without breathing apparatus or atmospheric monitoring — and are overcome by the same hazardous atmosphere. In many documented incidents, 2-3 additional people have died trying to rescue the first victim. This is why planned rescue arrangements with proper equipment and training are essential — and why untrained, spontaneous rescue attempts must be prevented."
  },
  {
    id: 10,
    question: "An entry permit for a confined space must include:",
    options: [
      "Only the names of the entrants",
      "Identification of the space, hazards, controls, atmospheric readings, entrant names, time limits, communication, and rescue arrangements",
      "Only the date and location",
      "A general risk assessment that covers all confined spaces on site"
    ],
    correctAnswer: 1,
    explanation: "A confined space entry permit is a detailed document specific to the particular space and task. It must include: precise identification of the space, identified hazards, control measures in place, atmospheric monitoring readings (pre-entry and ongoing), names of all entrants and the top man, time limits, communication arrangements, rescue arrangements, PPE/RPE requirements, and authorisation signatures. A generic permit does not provide adequate protection."
  },
  {
    id: 11,
    question: "When carrying out electrical work in a manhole or cable pit, what specific electrical hazard exists that does not apply in open-air situations?",
    options: [
      "The voltage is higher underground",
      "Arc flash energy in a confined space has nowhere to dissipate, increasing blast pressure and thermal exposure",
      "Cables underground are not insulated",
      "There is no earthing available underground"
    ],
    correctAnswer: 1,
    explanation: "In an open-air environment, the energy from an arc flash can dissipate in all directions. In a confined space such as a manhole, the blast pressure wave is contained and reflected by the walls, greatly amplifying the pressure and thermal effects on anyone inside. The confined space acts like a pressure vessel during the arc event. This means that arc flash risk assessments for confined spaces must account for the containment effect, and PPE requirements may be more stringent."
  },
  {
    id: 12,
    question: "Under the Confined Spaces Regulations 1997, who is responsible for ensuring a safe system of work is in place?",
    options: [
      "Only the person entering the space",
      "The employer (or self-employed person), who must ensure no employee enters a confined space without a safe system of work",
      "The building owner only",
      "The local authority"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 places the duty on the employer to ensure that no employee enters a confined space to carry out work unless a safe system of work has been established. The employer must provide the risk assessment, the safe system of work, the equipment, the training, and the rescue arrangements. Employees have a duty to cooperate with these arrangements and not to enter without authorisation."
  }
];

const faqs = [
  {
    question: "Is a switchroom a confined space?",
    answer: "It depends. A standard walk-in switchroom with adequate ventilation and normal access is generally not a confined space. However, a switchroom can become a confined space if it has limited access (e.g., accessed via a manhole or restricted hatch), poor ventilation, or foreseeable hazards such as gas accumulation from battery rooms or SF6 leaks from switchgear. The key question is always: does the space meet BOTH criteria — substantially enclosed AND foreseeable risk of serious injury from hazardous conditions?"
  },
  {
    question: "Can I enter a confined space 'just for a quick look' without a full entry procedure?",
    answer: "No. There is no exemption for brief entry. The hazards in a confined space — particularly atmospheric hazards — can incapacitate and kill in seconds. An oxygen-depleted atmosphere will cause loss of consciousness within 1-2 breaths. Every entry, regardless of duration or purpose, requires atmospheric monitoring, a risk assessment, and rescue arrangements. A 'quick look' without these controls has killed many workers."
  },
  {
    question: "What qualifications do I need to enter a confined space?",
    answer: "At minimum, you need confined space entry training covering: hazard recognition, atmospheric monitoring, use of gas detectors, emergency procedures, and the use of any required RPE. Many employers require training to a standard such as City & Guilds 6150 or equivalent. The level of training depends on your role — entrants need a different level of competence to supervisors or rescue team members. Competence must be specific to the type of confined space you will be entering."
  },
  {
    question: "What is an ATEX zone and how does it affect electrical work in confined spaces?",
    answer: "ATEX (from the French 'ATmospheres EXplosibles') zones classify areas where explosive atmospheres may exist. Zone 0: continuously explosive; Zone 1: likely during normal operations; Zone 2: unlikely but possible. Confined spaces that may contain flammable gases or vapours must be classified under the Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR). All electrical equipment used within ATEX zones must be certified for that zone — standard tools, phones, and torches can provide an ignition source."
  },
  {
    question: "How does SF6 (sulphur hexafluoride) gas affect confined space entry near HV switchgear?",
    answer: "SF6 is used as an insulating and arc-quenching gas in HV switchgear. It is five times heavier than air and will accumulate at low points — cable pits, basements, and trenches below SF6 switchgear. While pure SF6 is non-toxic, it displaces oxygen and can cause rapid asphyxiation. Additionally, when SF6 is decomposed by electrical arcs, it produces toxic byproducts including sulphur dioxide and hydrogen fluoride. Any confined space near SF6 switchgear must be monitored for both oxygen depletion and SF6 decomposition products."
  }
];

const MOETModule1Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1">
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
            <Shield className="h-4 w-4" />
            <span>Module 1.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Working in Confined Spaces
          </h1>
          <p className="text-white/80">
            Safe entry, atmospheric monitoring, and rescue planning for electrical maintenance in enclosed environments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Law:</strong> Confined Spaces Regulations 1997 — avoid entry where possible</li>
              <li className="pl-1"><strong>Hazards:</strong> Toxic atmosphere, O2 depletion, flooding, entrapment, fire/explosion</li>
              <li className="pl-1"><strong>Controls:</strong> Risk assessment, entry permit, monitoring, ventilation, rescue plan</li>
              <li className="pl-1"><strong>Rule:</strong> Never enter without atmospheric monitoring and rescue arrangements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Cable tunnels:</strong> O2 depletion, heat, arc flash containment</li>
              <li className="pl-1"><strong>Manholes:</strong> Water ingress, gas accumulation, cramped access</li>
              <li className="pl-1"><strong>Switchrooms:</strong> SF6 gas, battery fumes, limited ventilation</li>
              <li className="pl-1"><strong>ST1426:</strong> Confined space awareness is a core safety competency</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define a confined space under the Confined Spaces Regulations 1997",
              "Identify the principal hazards associated with confined space entry",
              "Describe the safe system of work required for confined space entry",
              "Explain atmospheric monitoring requirements and alarm thresholds",
              "State the requirements for entry permits and rescue arrangements",
              "Apply confined space procedures to electrical maintenance scenarios"
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

        {/* Section 01: What Is a Confined Space? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is a Confined Space?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Confined Spaces Regulations 1997 define a confined space by two characteristics that
              must both be present: the space is substantially (but not necessarily entirely) enclosed,
              AND there is a reasonably foreseeable risk of serious injury from hazardous conditions
              within the space or in connection with it. This definition is deliberately broad — it is
              based on risk, not physical dimensions.
            </p>
            <p>
              A large warehouse with open doors is not a confined space. A small utility cupboard with
              good ventilation and no hazardous conditions is not a confined space. But a cable tunnel
              beneath a substation — even if it is 50 metres long — IS a confined space if there is a
              foreseeable risk of oxygen depletion, toxic gas accumulation, or flooding. The key is
              always the combination of enclosure and hazard.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Statistics</p>
              <p className="text-sm text-white">
                HSE data shows that approximately 15 workers are killed in confined space incidents in
                the UK each year, with a further significant number suffering serious injuries. A critical
                finding is that over 60% of deaths in confined spaces are of people attempting to rescue
                the first victim — would-be rescuers who enter without protection and are overcome by
                the same hazard. Planned, equipped, and trained rescue arrangements are the single
                most important control measure.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Common Confined Spaces in Electrical Maintenance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Work</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specific Hazards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable tunnels</td>
                      <td className="border border-white/10 px-3 py-2">Cable installation, jointing, fault repair</td>
                      <td className="border border-white/10 px-3 py-2">O2 depletion, heat from cables, flooding, limited egress, arc flash</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Manholes and cable pits</td>
                      <td className="border border-white/10 px-3 py-2">Cable pulling, jointing, testing</td>
                      <td className="border border-white/10 px-3 py-2">Gas accumulation (methane, CO, H2S), water ingress, cramped access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer chambers</td>
                      <td className="border border-white/10 px-3 py-2">Transformer maintenance, oil sampling</td>
                      <td className="border border-white/10 px-3 py-2">Oil fumes, heat, SF6 (if gas-insulated), restricted egress</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery rooms</td>
                      <td className="border border-white/10 px-3 py-2">UPS battery replacement, testing</td>
                      <td className="border border-white/10 px-3 py-2">Hydrogen gas from charging, sulphuric acid, poor ventilation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Underground substations</td>
                      <td className="border border-white/10 px-3 py-2">HV switchgear maintenance</td>
                      <td className="border border-white/10 px-3 py-2">SF6 gas, O2 depletion, flooding, limited access/egress</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Risers and ducts</td>
                      <td className="border border-white/10 px-3 py-2">Vertical cable runs, containment</td>
                      <td className="border border-white/10 px-3 py-2">Fall hazard, restricted movement, poor ventilation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Legal Framework</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Legislation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relevance to Confined Spaces</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Confined Spaces Regulations 1997</td>
                      <td className="border border-white/10 px-3 py-2">Primary legislation — avoid entry, safe system of work, rescue</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HSWA 1974, s.2</td>
                      <td className="border border-white/10 px-3 py-2">General duty to provide safe systems of work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MHSWR 1999, Reg 3</td>
                      <td className="border border-white/10 px-3 py-2">Risk assessment for all work activities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EAWR 1989</td>
                      <td className="border border-white/10 px-3 py-2">Electrical safety requirements for work in confined electrical spaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DSEAR 2002</td>
                      <td className="border border-white/10 px-3 py-2">ATEX zoning for flammable atmospheres</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ACoP L101</td>
                      <td className="border border-white/10 px-3 py-2">HSE Approved Code of Practice for the Confined Spaces Regulations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Regulation 4(1) is absolute — you must not enter a confined
              space if the work can be done without entry. Always explore alternatives first: remote
              monitoring, CCTV inspection, mechanical handling, or redesigning the task.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Confined Space Hazards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Confined Space Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Confined space hazards are particularly dangerous because they are often invisible, the
              enclosed environment amplifies their effects, and escape routes are typically restricted.
              A hazard that might be manageable in an open environment can be immediately lethal in a
              confined space. Understanding each hazard type and its mechanisms is essential for risk
              assessment and control.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="text-sm font-medium text-red-400 mb-3">1. Toxic Atmosphere</h3>
                <p className="text-sm text-white mb-3">
                  Toxic gases and vapours can accumulate in confined spaces from multiple sources:
                  decomposing organic matter (produces methane, hydrogen sulphide, carbon dioxide),
                  chemical reactions, industrial processes, vehicle exhausts, and work activities
                  (soldering fumes, adhesive vapours).
                </p>
                <div className="overflow-x-auto">
                  <table className="text-xs text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-black/30">
                        <th className="border border-white/10 px-2 py-1.5 text-left">Gas</th>
                        <th className="border border-white/10 px-2 py-1.5 text-left">Source</th>
                        <th className="border border-white/10 px-2 py-1.5 text-left">WEL (8-hr TWA)</th>
                        <th className="border border-white/10 px-2 py-1.5 text-left">Danger Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-2 py-1.5">Carbon monoxide (CO)</td>
                        <td className="border border-white/10 px-2 py-1.5">Combustion, engines, welding</td>
                        <td className="border border-white/10 px-2 py-1.5">30 ppm</td>
                        <td className="border border-white/10 px-2 py-1.5">400 ppm dangerous; 1,200+ ppm fatal</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-2 py-1.5">Hydrogen sulphide (H2S)</td>
                        <td className="border border-white/10 px-2 py-1.5">Decomposition, sewers, drains</td>
                        <td className="border border-white/10 px-2 py-1.5">5 ppm</td>
                        <td className="border border-white/10 px-2 py-1.5">100 ppm paralyses smell; 500+ ppm fatal</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-2 py-1.5">Methane (CH4)</td>
                        <td className="border border-white/10 px-2 py-1.5">Decomposition, natural gas leaks</td>
                        <td className="border border-white/10 px-2 py-1.5">n/a (asphyxiant)</td>
                        <td className="border border-white/10 px-2 py-1.5">5-15% LEL explosive range</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-2 py-1.5">Sulphur hexafluoride (SF6)</td>
                        <td className="border border-white/10 px-2 py-1.5">HV switchgear</td>
                        <td className="border border-white/10 px-2 py-1.5">1,000 ppm</td>
                        <td className="border border-white/10 px-2 py-1.5">Displaces O2; decomposition products toxic</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-2 py-1.5">Hydrogen (H2)</td>
                        <td className="border border-white/10 px-2 py-1.5">Battery charging</td>
                        <td className="border border-white/10 px-2 py-1.5">n/a</td>
                        <td className="border border-white/10 px-2 py-1.5">4-75% explosive range; ignites easily</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h3 className="text-sm font-medium text-blue-400 mb-3">2. Oxygen Depletion and Enrichment</h3>
                <p className="text-sm text-white mb-3">
                  Oxygen depletion occurs when oxygen is consumed by chemical reactions (rusting,
                  fermentation), displaced by other gases, or absorbed by materials. Oxygen enrichment
                  occurs from leaking oxygen cylinders or oxygen-using processes.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-xs font-medium text-blue-400 mb-1">Oxygen Depletion Effects</p>
                    <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                      <li>20.9% — Normal atmosphere</li>
                      <li>19.5% — Minimum safe level for entry</li>
                      <li>16% — Impaired judgement, rapid breathing</li>
                      <li>12% — Loss of consciousness in seconds</li>
                      <li>6% — Death within minutes</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-xs font-medium text-red-400 mb-1">Oxygen Enrichment Risks</p>
                    <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                      <li>23.5% — Maximum safe level for entry</li>
                      <li>Above 23.5% — Greatly increased fire risk</li>
                      <li>Materials that do not normally burn will ignite</li>
                      <li>Clothing becomes highly flammable</li>
                      <li>Even a small spark can cause fierce fire</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <h3 className="text-sm font-medium text-cyan-400 mb-3">3. Flooding and Ingress</h3>
                <p className="text-sm text-white">
                  Underground confined spaces — cable tunnels, manholes, pits — are at risk of water
                  ingress from groundwater, broken pipes, surface drainage, and tidal flooding. Water
                  levels can rise rapidly and without warning. Electrical work in a flooded or wet
                  confined space creates an additional electrocution risk, even at low voltages. Pumping
                  arrangements and water level monitoring must be established before entry.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h3 className="text-sm font-medium text-amber-400 mb-3">4. Entrapment and Limited Egress</h3>
                <p className="text-sm text-white">
                  Confined spaces often have narrow access points — manholes, hatches, ducts — that
                  restrict rapid exit in an emergency. If a worker is injured or overcome by fumes, rescue
                  through a narrow opening is extremely difficult. Free-flowing materials (sand, grain,
                  water) can engulf a worker, and converging walls or machinery can trap them. Access
                  and egress routes must be assessed and kept clear at all times.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h3 className="text-sm font-medium text-orange-400 mb-3">5. Fire and Explosion</h3>
                <p className="text-sm text-white">
                  Flammable gases (methane, hydrogen, solvents) can accumulate in confined spaces to
                  reach explosive concentrations. In a confined space, an explosion is magnified by the
                  containment effect — the blast pressure has nowhere to escape and is amplified
                  dramatically. Electrical sparks, hot work, and non-ATEX-rated equipment can provide
                  the ignition source. All electrical equipment used in potentially explosive confined
                  spaces must be certified to the appropriate ATEX category.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical warning:</strong> Many confined space hazards are invisible and odourless.
              You cannot smell oxygen depletion. Carbon monoxide is odourless. Hydrogen sulphide paralyses
              the sense of smell at dangerous concentrations. Never rely on your senses — always use
              calibrated instruments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Safe System of Work and Entry Permits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Safe System of Work and Entry Permits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When entry to a confined space cannot be avoided, Regulation 4(2) of the Confined Spaces
              Regulations requires that a safe system of work is established. This is a comprehensive,
              documented procedure that addresses every identified hazard and provides verifiable
              controls. The safe system of work is typically documented through a confined space
              entry permit — a formal authorisation document similar in principle to the permit to
              work systems covered in Module 1.1.1.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Elements of a Safe System of Work</h3>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">1. Risk Assessment</p>
                  <p className="text-xs text-white/80">
                    A specific risk assessment for the particular confined space and task. This must
                    identify all foreseeable hazards, the persons at risk, and the control measures
                    required. A generic 'confined space risk assessment' is not sufficient — each entry
                    must be individually assessed.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">2. Atmospheric Monitoring</p>
                  <p className="text-xs text-white/80">
                    Pre-entry testing using a calibrated multi-gas detector (minimum: O2, LEL, CO, H2S).
                    The detector must be lowered into the space before anyone enters — conditions at the
                    top of a space may differ from the bottom. Continuous monitoring throughout the work
                    with audible and visual alarms set at action levels.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">3. Ventilation</p>
                  <p className="text-xs text-white/80">
                    Forced mechanical ventilation to provide a continuous supply of clean air. The ventilation
                    rate must be sufficient to maintain safe atmospheric conditions throughout the work. Air
                    intakes must be positioned away from contamination sources (exhausts, process vents, road
                    traffic). Explosion-proof (ATEX) fans where flammable atmospheres are possible.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">4. Isolation of Hazards</p>
                  <p className="text-xs text-white/80">
                    Pipework blanked or disconnected (not just valved off). Electrical supplies isolated
                    and locked out. Mechanical equipment secured. Chemical feeds disconnected. This goes
                    beyond the standard LOTO procedure — in confined spaces, valves alone are not
                    acceptable isolation because they can leak or be opened inadvertently.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">5. Communication</p>
                  <p className="text-xs text-white/80">
                    Constant communication between the entrant(s) and the top man. Methods include:
                    visual contact, voice communication, radio, rope signals, or closed-circuit TV.
                    The communication method must work reliably in the specific space — radio may not
                    work in some metallic enclosures.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">6. Personal Protective Equipment</p>
                  <p className="text-xs text-white/80">
                    Appropriate PPE and RPE as identified by the risk assessment. This may include:
                    breathing apparatus (self-contained or airline), harness for rescue, head protection,
                    eye protection, knee pads, and appropriate clothing. RPE must be face-fit tested for
                    the individual wearer.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">Confined Space Entry Permit — Key Contents</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Precise identification of the confined space</li>
                  <li className="pl-1">Description of the work to be carried out</li>
                  <li className="pl-1">Hazards identified and controls in place</li>
                  <li className="pl-1">Atmospheric monitoring readings (pre-entry)</li>
                  <li className="pl-1">Ventilation arrangements</li>
                  <li className="pl-1">Isolation details (electrical, mechanical, chemical)</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Names of all entrants and the top man</li>
                  <li className="pl-1">PPE/RPE requirements</li>
                  <li className="pl-1">Communication method</li>
                  <li className="pl-1">Rescue arrangements and equipment</li>
                  <li className="pl-1">Time limits and review intervals</li>
                  <li className="pl-1">Authorisation signature and cancellation section</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Roles and Responsibilities</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibilities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Authorising Person</td>
                      <td className="border border-white/10 px-3 py-2">Assesses hazards, verifies controls, issues and cancels the entry permit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Entrant</td>
                      <td className="border border-white/10 px-3 py-2">Enters the space, carries out the work, monitors their own gas detector, evacuates immediately on alarm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Top Man (Attendant)</td>
                      <td className="border border-white/10 px-3 py-2">Remains at entry point, maintains communication, logs entrants, controls access, raises alarm, initiates rescue — must NEVER enter the space</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Rescue Team</td>
                      <td className="border border-white/10 px-3 py-2">Trained and equipped to perform rescue, on standby throughout the entry, practised in the specific rescue method</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The top man's most critical duty is to NOT enter the space. The
              natural human instinct to help a fallen colleague is what causes multiple-casualty incidents.
              The top man must raise the alarm and initiate the planned rescue — never attempt an
              unplanned, unequipped entry.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Atmospheric Monitoring and Rescue Arrangements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Atmospheric Monitoring and Rescue Arrangements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Atmospheric monitoring and rescue arrangements are the two most critical control measures
              for confined space entry. Monitoring provides early warning of deteriorating conditions,
              allowing evacuation before injury occurs. Rescue arrangements ensure that if someone is
              incapacitated, they can be recovered rapidly — within minutes, not hours.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Multi-Gas Detector Requirements</h3>
              <p className="text-sm text-white mb-3">
                A 4-gas (or more) portable detector is the standard instrument for confined space
                atmospheric monitoring. The detector must be calibrated, bump-tested, and maintained
                in accordance with the manufacturer's instructions.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safe Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Low Alarm</th>
                      <th className="border border-white/10 px-3 py-2 text-left">High Alarm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Oxygen (O2)</td>
                      <td className="border border-white/10 px-3 py-2">19.5% - 23.5%</td>
                      <td className="border border-white/10 px-3 py-2">19.5%</td>
                      <td className="border border-white/10 px-3 py-2">23.5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flammable Gas (LEL)</td>
                      <td className="border border-white/10 px-3 py-2">0% LEL</td>
                      <td className="border border-white/10 px-3 py-2">10% LEL</td>
                      <td className="border border-white/10 px-3 py-2">20% LEL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carbon Monoxide (CO)</td>
                      <td className="border border-white/10 px-3 py-2">0 ppm</td>
                      <td className="border border-white/10 px-3 py-2">20 ppm</td>
                      <td className="border border-white/10 px-3 py-2">100 ppm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hydrogen Sulphide (H2S)</td>
                      <td className="border border-white/10 px-3 py-2">0 ppm</td>
                      <td className="border border-white/10 px-3 py-2">5 ppm</td>
                      <td className="border border-white/10 px-3 py-2">10 ppm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-3">
                Note: These are typical alarm settings. The actual settings must be determined by the
                risk assessment and may be more stringent depending on the specific hazards identified.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Monitoring Procedure</h3>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Step-by-Step Atmospheric Monitoring:</p>
                <p>1. <strong>Calibration check</strong> — verify detector is within calibration date and bump test passes</p>
                <p>2. <strong>Pre-entry monitoring</strong> — lower detector into the space (top, middle, bottom) without anyone entering</p>
                <p>3. <strong>Record readings</strong> — document all readings on the entry permit before authorising entry</p>
                <p>4. <strong>Ventilate</strong> — if readings are outside safe range, ventilate and re-test. Do NOT enter until safe</p>
                <p>5. <strong>Continuous monitoring</strong> — each entrant wears a personal gas detector throughout the entry</p>
                <p>6. <strong>Alarm response</strong> — on ANY alarm, all entrants evacuate immediately. Do not investigate</p>
                <p>7. <strong>Re-test after breaks</strong> — if the space is left unattended (e.g., during a break), re-test before re-entry</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <h3 className="text-sm font-medium text-red-400 mb-3">Rescue Arrangements — The Most Critical Control</h3>
              <p className="text-sm text-white mb-3">
                Regulation 5 of the Confined Spaces Regulations requires suitable and sufficient
                arrangements for rescue before any person enters a confined space. The rescue plan
                must be specific to the space, practised, and immediately available — not a theoretical
                document filed in the office.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Self-rescue:</strong> The entrant evacuates under their own power on alarm — the simplest and fastest rescue method</li>
                <li className="pl-1"><strong>Non-entry rescue:</strong> Entrant is attached to a rescue line and can be pulled out by the top man without anyone entering the space — e.g., using a tripod and winch over a manhole</li>
                <li className="pl-1"><strong>Entry rescue:</strong> A trained rescue team enters the space with breathing apparatus to recover the casualty — the most complex and slowest method</li>
                <li className="pl-1"><strong>Emergency services:</strong> Fire and rescue service notified in advance that confined space work is taking place — but NOT relied upon as the primary rescue method (response times are too long)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Rescue Equipment</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Standard Equipment</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Tripod and winch for vertical entry points</li>
                    <li>Rescue harness with attachment point for lifting</li>
                    <li>Self-contained breathing apparatus (SCBA)</li>
                    <li>Airline breathing apparatus (for extended duration)</li>
                    <li>Escape sets (short-duration emergency breathing)</li>
                    <li>Stretcher suitable for confined space extraction</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Communication &amp; First Aid</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Two-way radio (intrinsically safe if ATEX zone)</li>
                    <li>Emergency whistle or audible alarm</li>
                    <li>First aid kit including oxygen therapy</li>
                    <li>AED (defibrillator) on standby</li>
                    <li>Trauma blankets</li>
                    <li>Emergency lighting (intrinsically safe)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Warning: Untrained Rescue Kills</p>
              <p className="text-sm text-white">
                More than 60% of confined space fatalities are would-be rescuers. When a colleague
                collapses in a confined space, the natural instinct is to rush in and help. But the
                atmosphere that incapacitated the first person will incapacitate the rescuer too — often
                within seconds. This is why the top man must NEVER enter, why rescue teams must have
                breathing apparatus, and why the rescue plan must be established and practised BEFORE
                any entry begins.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Electrical Work in Confined Spaces */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Electrical Work in Confined Spaces
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical maintenance in confined spaces presents a unique combination of hazards: the
              standard confined space risks (atmosphere, flooding, entrapment) are compounded by
              electrical hazards (electrocution, arc flash, burns). Furthermore, the confined environment
              amplifies the effects of electrical incidents — arc flash blast pressure in a cable tunnel
              is far more devastating than in an open switchroom, and the restricted space limits the
              worker's ability to escape.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-blue-400 mb-3">Cable Tunnels and Ducts</h3>
                <p className="text-sm text-white mb-3">
                  Cable tunnels are one of the most common confined spaces encountered by electrical
                  maintenance technicians. They present a complex combination of hazards:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Oxygen depletion:</strong> Heat from loaded cables promotes oxidation of materials, consuming oxygen. Poor ventilation means depleted air is not replaced.</li>
                  <li className="pl-1"><strong>Heat stress:</strong> Heavily loaded cables radiate heat, raising ambient temperatures to 40-50+°C in poorly ventilated tunnels. This causes fatigue, confusion, and collapse.</li>
                  <li className="pl-1"><strong>Arc flash containment:</strong> An arc flash in a cable tunnel creates a blast wave confined by the tunnel walls. The pressure and thermal effects are greatly amplified compared to an open environment.</li>
                  <li className="pl-1"><strong>Egress:</strong> Cable tunnels may have access points hundreds of metres apart. In an emergency, the distance to the nearest exit may be significant.</li>
                  <li className="pl-1"><strong>Flooding:</strong> Underground cable tunnels are prone to water ingress, creating electrocution risk even from low-voltage cables.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-purple-400 mb-3">Manholes and Cable Pits</h3>
                <p className="text-sm text-white mb-3">
                  Manholes and cable pits are typically vertical-entry confined spaces with restricted
                  openings. The vertical orientation means that heavy gases accumulate at the bottom
                  and oxygen-depleted air cannot easily escape.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Gas accumulation:</strong> Methane and CO2 from surrounding soil; H2S from drainage; CO from traffic above</li>
                  <li className="pl-1"><strong>Water:</strong> Groundwater and surface water collect in pits — must be pumped before entry</li>
                  <li className="pl-1"><strong>Access:</strong> Narrow openings restrict rescue — tripod and winch essential for vertical entry points</li>
                  <li className="pl-1"><strong>Cable jointing:</strong> Heat sources from jointing (gas torches, heat shrink) can alter the atmosphere and increase fire risk</li>
                  <li className="pl-1"><strong>Reduced voltage:</strong> Use 110V CTE (centre-tapped earth) or battery-powered tools to reduce electrocution risk in wet conditions</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-green-400 mb-3">Switchrooms and Transformer Chambers</h3>
                <p className="text-sm text-white mb-3">
                  Some switchrooms and transformer chambers meet the definition of confined spaces,
                  particularly underground or basement installations with limited access and ventilation:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>SF6 gas:</strong> HV switchgear containing SF6 can leak — the gas is five times heavier than air and accumulates at low levels, displacing oxygen</li>
                  <li className="pl-1"><strong>SF6 decomposition:</strong> When SF6 passes through an arc, it produces toxic byproducts (SO2, HF) that are acutely dangerous</li>
                  <li className="pl-1"><strong>Battery fumes:</strong> Lead-acid batteries produce hydrogen gas during charging — explosive at 4% concentration</li>
                  <li className="pl-1"><strong>Oil mist:</strong> Oil-filled transformers and switchgear can produce oil mist or vapour, particularly if overheated</li>
                  <li className="pl-1"><strong>Arc flash:</strong> The containment effect of an enclosed switchroom amplifies arc flash blast pressure and thermal hazard</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">Electrical Controls for Confined Space Work</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reduced voltage:</strong> Use 110V CTE supplies or battery-powered tools in wet or damp confined spaces</li>
                <li className="pl-1"><strong>RCD protection:</strong> 30mA RCD on all portable equipment — no exceptions in confined spaces</li>
                <li className="pl-1"><strong>ATEX equipment:</strong> All electrical equipment in spaces with flammable atmospheres must be ATEX-rated (intrinsically safe)</li>
                <li className="pl-1"><strong>Task lighting:</strong> Low-voltage (12V or 25V) task lighting, or intrinsically safe rechargeable lighting</li>
                <li className="pl-1"><strong>Full isolation:</strong> Isolate and prove dead ALL electrical circuits in the confined space before entry, using the full Prove-Test-Prove procedure</li>
                <li className="pl-1"><strong>Arc flash assessment:</strong> Where circuits cannot be isolated (e.g., the supply cables you are working on are energised from both ends), conduct an arc flash risk assessment that accounts for the containment effect</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Competence Requirements</h3>
              <p className="text-sm text-white mb-3">
                Electrical work in confined spaces requires a combination of competencies that goes
                beyond either confined space entry training or electrical competence alone:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Confined Space Competence</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Hazard recognition and risk assessment</li>
                    <li>Atmospheric monitoring equipment use</li>
                    <li>Emergency escape procedures</li>
                    <li>Communication protocols</li>
                    <li>RPE use and face-fit testing</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Electrical Competence</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Safe isolation procedures (Module 1.1.2)</li>
                    <li>LOTO procedures (Module 1.1.3)</li>
                    <li>Arc flash awareness and PPE selection</li>
                    <li>Reduced voltage system use</li>
                    <li>ATEX equipment selection</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> The Maintenance and Operations Engineering Technician
              standard requires awareness of confined space hazards, the ability to recognise when
              work constitutes confined space entry, and knowledge of the controls required. While
              not all technicians will be qualified confined space entrants, all must understand
              when the Confined Spaces Regulations apply and ensure that appropriate procedures are
              followed before any entry takes place.
            </p>
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
                <p className="font-medium text-white mb-1">Confined Space Definition</p>
                <ul className="space-y-0.5">
                  <li>Substantially enclosed AND</li>
                  <li>Foreseeable risk of serious injury from</li>
                  <li>hazardous conditions within/nearby</li>
                  <li>Both conditions must be met</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Atmospheric Limits</p>
                <ul className="space-y-0.5">
                  <li>O2: 19.5% - 23.5% (normal 20.9%)</li>
                  <li>LEL: alarm at 10%, evacuate at 20%</li>
                  <li>CO: alarm at 20 ppm, evacuate at 100 ppm</li>
                  <li>H2S: alarm at 5 ppm, evacuate at 10 ppm</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safe System of Work</p>
                <ul className="space-y-0.5">
                  <li>1. Risk assessment (space-specific)</li>
                  <li>2. Atmospheric monitoring (pre + continuous)</li>
                  <li>3. Ventilation (forced, mechanical)</li>
                  <li>4. Entry permit (formal authorisation)</li>
                  <li>5. Communication (constant contact)</li>
                  <li>6. Rescue arrangements (before entry)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>Confined Spaces Regulations 1997</li>
                  <li>ACoP L101 — Approved Code of Practice</li>
                  <li>HSWA 1974 — General safety duties</li>
                  <li>EAWR 1989 — Electrical safety</li>
                  <li>DSEAR 2002 — Explosive atmospheres</li>
                </ul>
              </div>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Work at Height
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section1_5;
