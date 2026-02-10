import {
  ArrowLeft,
  Package,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bunding-requirement",
    question:
      "What is the minimum bunding capacity required for secondary containment of hazardous substance stores?",
    options: [
      "110% of the volume of the largest container stored within the bund",
      "100% of the total volume of all containers stored within the bund",
      "50% of the volume of the largest container stored within the bund",
      "Equal to the volume of the smallest container stored within the bund",
    ],
    correctIndex: 0,
    explanation:
      "Secondary containment (bunding) must be capable of holding at least 110% of the volume of the largest single container stored within the bund. This extra 10% accounts for potential rainwater ingress and ensures that even a complete container failure can be fully contained without overflow into the surrounding environment.",
  },
  {
    id: "acid-dilution",
    question:
      "When diluting a concentrated acid, what is the correct procedure?",
    options: [
      "Always add acid to water, never water to acid",
      "Always add water to acid, never acid to water",
      "It does not matter which is added to which, as long as you stir continuously",
      "Always use equal volumes of acid and water simultaneously",
    ],
    correctIndex: 0,
    explanation:
      "The golden rule of acid dilution is 'always add acid to water' — never the other way around. Adding water to concentrated acid causes a violent exothermic reaction, generating intense localised heat that can cause the mixture to boil and spit concentrated acid. Adding acid slowly to a large volume of water disperses the heat safely across the water mass. Remember the mnemonic: 'Do as you oughta — add acid to water.'",
  },
  {
    id: "spill-kit-contents",
    question:
      "Which of the following is NOT typically found in a chemical spill kit?",
    options: [
      "A fire extinguisher",
      "Absorbent pads and pillows",
      "Chemical-resistant gloves and goggles",
      "Absorbent socks for containing spread",
    ],
    correctIndex: 0,
    explanation:
      "A chemical spill kit typically contains absorbent materials (pads, pillows, granules, socks), chemical-resistant PPE (gloves, goggles, apron), neutralising agents, disposal bags, and instructions. Fire extinguishers are separate fire-fighting equipment and are NOT part of a spill kit — although fire-fighting equipment should be available nearby in chemical storage areas.",
  },
];

const faqs = [
  {
    question:
      "Can I transfer a hazardous substance into an unlabelled container?",
    answer:
      "No. Under the CLP Regulation, any container holding a hazardous substance must be labelled with the correct product name, GHS hazard pictograms, signal word (Danger or Warning), hazard statements, and precautionary statements. Even temporary transfer containers used for decanting must carry at minimum the product name and the relevant hazard pictograms. The only exception is where the substance will be used immediately by the person who decanted it and the container is under their direct control at all times — but best practice is to always label every container.",
  },
  {
    question: "What should I do if I find a container with no label?",
    answer:
      "Never attempt to identify an unknown substance by smelling, tasting, or touching it. Treat any unlabelled container as potentially hazardous. Isolate the container in a safe area, inform your supervisor immediately, and do not use the contents until the substance has been positively identified and properly labelled. If necessary, arrange for laboratory analysis. The unlabelled container itself constitutes a COSHH breach that should be reported and corrected.",
  },
  {
    question:
      "How long must hazardous waste consignment notes be kept?",
    answer:
      "Under the Hazardous Waste (England and Wales) Regulations 2005 (as amended), consignment notes for hazardous waste must be retained for a minimum of three years from the date the waste was collected. Consignment notes must record the waste producer, the description and quantity of waste, the European Waste Catalogue (EWC) code, the carrier details, and the destination site. These records may be required by the Environment Agency during inspections and must be available for examination at all reasonable times.",
  },
  {
    question:
      "Do I need to be a licensed waste carrier to move hazardous waste on my own site?",
    answer:
      "Moving hazardous waste within the boundary of your own premises does not require a waste carrier licence. However, you must still comply with the duty of care requirements, ensure the waste is stored securely, and use appropriate containment during transport (e.g., sealed, labelled containers on a drip tray). As soon as the waste leaves your site — even if you are transporting it yourself to a disposal facility — you or the carrier must hold a valid waste carrier registration issued by the Environment Agency.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under DSEAR 2002, what must an employer do if dangerous substances are present in the workplace?",
    options: [
      "Carry out a risk assessment covering fire, explosion, and similar energy-releasing events",
      "Immediately remove all dangerous substances from the premises",
      "Register the premises with the local fire service as a COMAH site",
      "Provide Type H vacuum cleaners for all workers",
    ],
    correctAnswer: 0,
    explanation:
      "DSEAR 2002 requires employers to carry out a risk assessment where dangerous substances are present, covering the risks of fire, explosion, and similar energy-releasing events. The assessment must identify hazardous areas (zones), classify them according to the likelihood of an explosive atmosphere forming, and implement appropriate control measures including elimination, substitution, and engineering controls.",
  },
  {
    id: 2,
    question:
      "Which of the following chemical combinations must NEVER be stored together?",
    options: [
      "Oxidisers and flammable liquids",
      "Two different brands of the same solvent",
      "Neutral pH cleaning agents and neutral pH detergents",
      "Water-based paints and water-based adhesives",
    ],
    correctAnswer: 0,
    explanation:
      "Oxidisers and flammable liquids must NEVER be stored together. Oxidisers supply oxygen that dramatically accelerates combustion — if a flammable liquid comes into contact with a strong oxidiser, it can ignite spontaneously or cause a violent fire. Chemical segregation rules also require acids to be separated from alkalis, and water-reactive substances to be isolated from any source of moisture.",
  },
  {
    id: 3,
    question:
      "What type of storage cabinet should be used for flammable liquids?",
    options: [
      "A purpose-built flammable liquids cabinet with self-closing doors and integral bunding",
      "Any metal filing cabinet with a lock",
      "A wooden cupboard lined with plastic sheeting",
      "A standard chemical storage shelf with a drip tray",
    ],
    correctAnswer: 0,
    explanation:
      "Flammable liquids must be stored in purpose-built flammable liquids cabinets that comply with BS EN 14470-1. These cabinets feature fire-resistant construction (minimum 30 minutes), self-closing doors, integral bunding to contain spills, ventilation points, clear labelling, and are designed to limit the consequences of fire. Standard metal cabinets, wooden cupboards, and open shelves do not provide adequate protection.",
  },
  {
    id: 4,
    question:
      "When decanting a hazardous substance from a bulk container to a smaller one, what is the MOST important control measure?",
    options: [
      "Minimising exposure by using closed transfer systems, funnels with lids, and appropriate PPE",
      "Working as quickly as possible to reduce the time the container is open",
      "Performing the transfer outdoors where natural ventilation will disperse fumes",
      "Using a standard plastic funnel and pouring slowly",
    ],
    correctAnswer: 0,
    explanation:
      "The most important control when decanting hazardous substances is to minimise exposure using engineering controls: closed transfer systems (pumps, taps), funnels with lids to prevent splashing and vapour release, local exhaust ventilation, and appropriate PPE (chemical-resistant gloves, goggles, apron). Speed alone does not control exposure, outdoor work may spread contamination, and a standard funnel without a lid allows vapour release and splashing.",
  },
  {
    id: 5,
    question:
      "What is the FIRST action to take when a significant chemical spill occurs?",
    options: [
      "Evacuate the area if the spill involves toxic, flammable, or unknown substances",
      "Immediately attempt to mop up the spill with paper towels",
      "Open all windows and doors to ventilate the area",
      "Pour water onto the spill to dilute it",
    ],
    correctAnswer: 0,
    explanation:
      "The first priority in any significant chemical spill is to ensure the safety of people. If the spill involves toxic substances, flammable materials, or unknown chemicals, the area must be evacuated immediately. Only trained personnel wearing appropriate PPE should then approach the spill to contain and clean it up using the correct spill kit materials. Mopping with paper towels is ineffective and dangerous, opening doors may spread contamination, and adding water may cause a violent reaction with some chemicals.",
  },
  {
    id: 6,
    question:
      "What are European Waste Catalogue (EWC) codes used for?",
    options: [
      "Classifying and identifying different types of waste, including hazardous waste, for correct disposal",
      "Labelling chemical products for retail sale under CLP",
      "Grading the toxicity of substances for COSHH assessments",
      "Categorising PPE by the level of protection provided",
    ],
    correctAnswer: 0,
    explanation:
      "European Waste Catalogue (EWC) codes are six-digit codes used to classify and identify waste types for disposal purposes. Each waste stream has a unique code, and codes marked with an asterisk (*) indicate hazardous waste. Waste producers must assign the correct EWC code when completing consignment notes, and the code determines which disposal routes and licensed facilities can accept the waste. Using the wrong code is a breach of duty of care.",
  },
  {
    id: 7,
    question:
      "What must be done with empty containers that previously held hazardous substances?",
    options: [
      "Triple rinse the container, deface the label, and dispose of via the correct waste route",
      "Reuse them immediately for storing a different chemical",
      "Place them directly into the general waste skip",
      "Leave them in the COSHH store until the next scheduled collection",
    ],
    correctAnswer: 0,
    explanation:
      "Empty containers that held hazardous substances must be triple rinsed to remove residues (the rinsate itself must be disposed of as hazardous waste). The label must then be defaced — typically by crossing through it — so the container cannot be confused with a full one. The container is then disposed of via the correct waste route, which may still be the hazardous waste stream depending on the substance and any remaining contamination. Empty containers must NEVER be reused for different chemicals without proper decontamination.",
  },
  {
    id: 8,
    question:
      "Under the duty of care for waste, what is the waste producer responsible for?",
    options: [
      "Ensuring waste is correctly described, stored securely, and transferred only to a licensed carrier with a valid consignment note",
      "Only ensuring the waste leaves the premises — the carrier is responsible after that",
      "Disposing of the waste personally at the nearest landfill site",
      "Telephoning the Environment Agency each time a waste collection occurs",
    ],
    correctAnswer: 0,
    explanation:
      "Under the Environmental Protection Act 1990 duty of care, the waste producer must: correctly describe and classify the waste (including EWC codes), store it securely to prevent escape, ensure it is transferred only to an authorised (licensed) waste carrier, complete a consignment note for hazardous waste, and retain records for at least three years. The duty of care follows the waste from cradle to grave — the producer cannot simply hand it over and forget about it.",
  },
];

export default function CoshhAwarenessModule4Section4() {
  useSEO({
    title:
      "Storage, Handling & Disposal | COSHH Awareness Module 4.4",
    description:
      "DSEAR 2002 requirements, chemical segregation rules, safe storage and handling of hazardous substances, spill response procedures, and hazardous waste disposal under COSHH.",
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
            <Link to="../coshh-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30 mb-4">
            <Package className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Storage, Handling &amp; Disposal
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            DSEAR requirements, chemical segregation, safe storage and
            handling procedures, spill response, and hazardous waste
            disposal obligations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>DSEAR 2002:</strong> Zone classification for
                explosive atmospheres
              </li>
              <li>
                <strong>Segregation:</strong> Oxidisers away from
                flammables, acids from alkalis
              </li>
              <li>
                <strong>Bunding:</strong> Secondary containment at 110% of
                largest container
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Spill kits:</strong> Absorbent pads, pillows,
                socks, neutralisers, PPE
              </li>
              <li>
                <strong>Hazardous waste:</strong> EWC codes, consignment
                notes, 3-year records
              </li>
              <li>
                <strong>Empty containers:</strong> Triple rinse, deface
                label, correct waste route
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
              "Describe the requirements of DSEAR 2002 including zone classification and ATEX compliance",
              "Explain chemical segregation rules and why certain substances must be stored apart",
              "Identify the correct storage containers, secondary containment, and labelling requirements",
              "Describe safe decanting, mixing, and on-site transportation procedures",
              "Outline the contents and use of spill kits and the correct spill response procedure",
              "Explain hazardous waste classification using EWC codes and the duty of care for waste producers",
              "Describe the correct procedure for disposing of empty containers that held hazardous substances",
              "Understand the record-keeping requirements for hazardous waste consignment notes",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: DSEAR 2002 and Explosive Atmospheres */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              01
            </span>
            DSEAR 2002 &amp; Explosive Atmospheres
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>
                  Dangerous Substances and Explosive Atmospheres
                  Regulations 2002 (DSEAR)
                </strong>{" "}
                apply wherever dangerous substances are stored, handled, or
                used at work. A dangerous substance is any substance that
                could create a risk of fire, explosion, or a similar
                energy-releasing event &mdash; including flammable gases,
                liquids, and dusts.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Key DSEAR Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Risk assessment:
                      </strong>{" "}
                      Employers must assess the risks from dangerous
                      substances, covering fire, explosion, and similar
                      events
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Elimination or reduction:
                      </strong>{" "}
                      Replace dangerous substances with safer alternatives
                      where reasonably practicable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Zone classification:
                      </strong>{" "}
                      Areas where explosive atmospheres may form must be
                      classified into zones (0, 1, 2 for gases; 20, 21, 22
                      for dusts)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        ATEX equipment:
                      </strong>{" "}
                      Only equipment and protective systems certified for
                      the relevant zone category may be used within
                      classified zones
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ignition source control:
                      </strong>{" "}
                      Eliminate or control all potential ignition sources
                      within classified zones &mdash; naked flames,
                      sparking tools, hot surfaces, static discharge
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  DSEAR Zone Classification (Gases &amp; Vapours)
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold min-w-[52px]">
                      Zone 0
                    </span>
                    <span>
                      Explosive atmosphere is present{" "}
                      <strong className="text-white">continuously</strong>{" "}
                      or for long periods (e.g., inside a storage tank)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold min-w-[52px]">
                      Zone 1
                    </span>
                    <span>
                      Explosive atmosphere is{" "}
                      <strong className="text-white">
                        likely to occur occasionally
                      </strong>{" "}
                      during normal operation (e.g., around filling points)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold min-w-[52px]">
                      Zone 2
                    </span>
                    <span>
                      Explosive atmosphere is{" "}
                      <strong className="text-white">
                        not likely during normal operation
                      </strong>{" "}
                      but may occur briefly (e.g., surrounding area during
                      abnormal conditions)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Signage:
                  </strong>{" "}
                  All DSEAR-classified zones must display the{" "}
                  <strong>EX warning triangle</strong> (yellow triangle
                  with &ldquo;EX&rdquo;) at all entry points. Zone
                  markings must be clearly visible and maintained. Any
                  electrical installation work within classified zones must
                  be carried out by competent persons in accordance with
                  BS&nbsp;EN&nbsp;60079 (explosive atmospheres standards).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Chemical Segregation Rules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              02
            </span>
            Chemical Segregation Rules
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all hazardous substances can be stored together.
                Certain chemical combinations create{" "}
                <strong>
                  dangerous reactions &mdash; fire, explosion, toxic gas
                  release, or violent exothermic reactions
                </strong>
                . Segregation rules ensure incompatible chemicals are kept
                physically apart so that a spill, leak, or container
                failure cannot bring them into contact.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Must-Separate Combinations
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Oxidisers + Flammables:
                      </strong>{" "}
                      Oxidisers supply oxygen that accelerates combustion
                      &mdash; contact can cause spontaneous ignition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Acids + Alkalis:
                      </strong>{" "}
                      Mixing produces violent exothermic neutralisation
                      reactions with potential splashing and gas release
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Water-reactive substances + Any moisture source:
                      </strong>{" "}
                      Contact with water produces flammable hydrogen gas or
                      toxic fumes (e.g., alkali metals, calcium carbide)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Concentrated acids + Organic materials:
                      </strong>{" "}
                      Strong acids (e.g., sulphuric, nitric) can ignite
                      organic materials on contact
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Segregation Methods
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Separate cabinets:
                      </strong>{" "}
                      Incompatible groups stored in different cabinets
                      within the same room
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Separate rooms:
                      </strong>{" "}
                      High-risk incompatibles stored in entirely separate
                      areas with independent bunding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Distance separation:
                      </strong>{" "}
                      Where separate rooms are not available, a minimum
                      distance of 3&nbsp;metres between incompatible groups
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Consult the SDS:
                      </strong>{" "}
                      Section 7 (Handling and Storage) and Section 10
                      (Stability and Reactivity) of every Safety Data
                      Sheet list incompatible materials
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Diagram: Chemical Segregation Chart */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              &nbsp;
            </span>
            Chemical Segregation Chart
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-violet-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-violet-400 font-semibold mb-4 text-center tracking-widest uppercase">
                Segregation Compatibility Matrix
              </p>

              <div className="min-w-[320px] space-y-3">
                {/* Header row */}
                <div className="grid grid-cols-5 gap-1.5 text-center">
                  <div />
                  <div className="bg-red-500/20 border border-red-500/40 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold text-red-400 block">
                      Flammables
                    </span>
                  </div>
                  <div className="bg-amber-500/20 border border-amber-500/40 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 block">
                      Oxidisers
                    </span>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold text-blue-400 block">
                      Acids
                    </span>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/40 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold text-purple-400 block">
                      Alkalis
                    </span>
                  </div>
                </div>

                {/* Flammables row */}
                <div className="grid grid-cols-5 gap-1.5 items-center text-center">
                  <div className="bg-red-500/20 border border-red-500/40 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold text-red-400">
                      Flammables
                    </span>
                  </div>
                  <div className="bg-green-500/15 border border-green-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-green-400 font-bold">
                      &#10003;
                    </span>
                  </div>
                  <div className="bg-red-500/15 border border-red-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-red-400 font-bold">
                      &#10007;
                    </span>
                  </div>
                  <div className="bg-red-500/15 border border-red-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-red-400 font-bold">
                      &#10007;
                    </span>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold">
                      Caution
                    </span>
                  </div>
                </div>

                {/* Oxidisers row */}
                <div className="grid grid-cols-5 gap-1.5 items-center text-center">
                  <div className="bg-amber-500/20 border border-amber-500/40 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold text-amber-400">
                      Oxidisers
                    </span>
                  </div>
                  <div className="bg-red-500/15 border border-red-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-red-400 font-bold">
                      &#10007;
                    </span>
                  </div>
                  <div className="bg-green-500/15 border border-green-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-green-400 font-bold">
                      &#10003;
                    </span>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold">
                      Caution
                    </span>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold">
                      Caution
                    </span>
                  </div>
                </div>

                {/* Acids row */}
                <div className="grid grid-cols-5 gap-1.5 items-center text-center">
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold text-blue-400">
                      Acids
                    </span>
                  </div>
                  <div className="bg-red-500/15 border border-red-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-red-400 font-bold">
                      &#10007;
                    </span>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold">
                      Caution
                    </span>
                  </div>
                  <div className="bg-green-500/15 border border-green-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-green-400 font-bold">
                      &#10003;
                    </span>
                  </div>
                  <div className="bg-red-500/15 border border-red-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-red-400 font-bold">
                      &#10007;
                    </span>
                  </div>
                </div>

                {/* Alkalis row */}
                <div className="grid grid-cols-5 gap-1.5 items-center text-center">
                  <div className="bg-purple-500/20 border border-purple-500/40 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold text-purple-400">
                      Alkalis
                    </span>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold">
                      Caution
                    </span>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded p-1.5">
                    <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold">
                      Caution
                    </span>
                  </div>
                  <div className="bg-red-500/15 border border-red-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-red-400 font-bold">
                      &#10007;
                    </span>
                  </div>
                  <div className="bg-green-500/15 border border-green-500/30 rounded p-1.5">
                    <span className="text-[10px] sm:text-xs text-green-400 font-bold">
                      &#10003;
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-green-400 font-bold text-xs">
                    &#10003;
                  </span>
                  <span className="text-[9px] text-white/50">
                    May store together
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold text-[10px]">
                    Caution
                  </span>
                  <span className="text-[9px] text-white/50">
                    Check SDS first
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-400 font-bold text-xs">
                    &#10007;
                  </span>
                  <span className="text-[9px] text-white/50">
                    Must segregate
                  </span>
                </div>
              </div>

              <div className="mt-3 bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] sm:text-xs text-violet-300 font-medium">
                  Always consult Safety Data Sheet Section&nbsp;7 and
                  Section&nbsp;10 for substance-specific incompatibilities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Storage Containers and Cabinets */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              03
            </span>
            Storage Containers &amp; Cabinets
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Hazardous substances should always be kept in their{" "}
                <strong>original containers</strong> wherever possible. The
                original container has been specifically designed for the
                substance it holds, carries the correct CLP label, and is
                constructed from compatible materials. Transferring
                substances into unsuitable containers introduces risks of
                leakage, chemical reaction with the container material, and
                loss of hazard information.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Labelling Requirements (CLP Regulation)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Product name:</strong>{" "}
                      Chemical identity of the substance or mixture
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        GHS hazard pictograms:
                      </strong>{" "}
                      Red-bordered diamonds showing the hazard type (flame,
                      skull, exclamation mark, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Signal word:</strong>{" "}
                      &ldquo;Danger&rdquo; (more severe) or
                      &ldquo;Warning&rdquo; (less severe)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Hazard statements (H-codes):
                      </strong>{" "}
                      Describe the nature and degree of hazard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Precautionary statements (P-codes):
                      </strong>{" "}
                      Recommended prevention, response, storage, and
                      disposal measures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Supplier details:
                      </strong>{" "}
                      Name, address, and telephone number of the
                      manufacturer or importer
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Secondary Containment (Bunding)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Bunds must hold{" "}
                      <strong className="text-white">
                        at least 110%
                      </strong>{" "}
                      of the volume of the largest single container within
                      the bund
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Bund material must be{" "}
                      <strong className="text-white">
                        chemically resistant
                      </strong>{" "}
                      to the substances being stored
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Bunds must be{" "}
                      <strong className="text-white">
                        impervious to liquids
                      </strong>{" "}
                      &mdash; no cracks, gaps, or unsealed joints
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Drip trays under individual containers provide{" "}
                      <strong className="text-white">
                        point-of-use containment
                      </strong>{" "}
                      for small volumes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Storage Cabinets
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Flammable liquids cabinets (BS&nbsp;EN&nbsp;14470-1):
                      </strong>{" "}
                      Fire-resistant construction (min. 30&nbsp;min),
                      self-closing doors, integral bunding, ventilation
                      points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Corrosive substance cabinets:
                      </strong>{" "}
                      Acid-resistant lining, separate compartments for
                      acids and alkalis, integral sump
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        COSHH cupboard (point-of-use):
                      </strong>{" "}
                      Small lockable cabinet holding{" "}
                      <strong className="text-white">
                        minimum day-to-day working quantities
                      </strong>{" "}
                      only &mdash; bulk stock remains in the main store
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Storage Environment:
                  </strong>{" "}
                  Chemical stores must have{" "}
                  <strong>temperature control</strong> (many substances
                  have maximum storage temperatures listed on the SDS),{" "}
                  <strong>adequate ventilation</strong> to prevent vapour
                  build-up (natural or mechanical), and{" "}
                  <strong>fire detection</strong> linked to the site alarm
                  system. Store rooms must be clearly signed with GHS/CLP
                  hazard symbols showing which substance classes are stored
                  within.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Safe Handling Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              04
            </span>
            Safe Handling Procedures
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Safe handling of hazardous substances requires careful
                attention to{" "}
                <strong>
                  decanting procedures, mixing precautions, on-site
                  transportation, and personal hygiene
                </strong>
                . The majority of workplace chemical exposure incidents
                occur during routine handling tasks &mdash; not during
                emergencies.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Decanting Safely
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use{" "}
                      <strong className="text-white">
                        closed transfer systems
                      </strong>{" "}
                      (pumps, taps, self-closing dispensers) wherever
                      possible to minimise vapour release and splashing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If open pouring is necessary, use a{" "}
                      <strong className="text-white">
                        funnel with a lid
                      </strong>{" "}
                      to reduce exposure and prevent splashing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Decant in a{" "}
                      <strong className="text-white">
                        well-ventilated area
                      </strong>{" "}
                      or under local exhaust ventilation (LEV)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Always{" "}
                      <strong className="text-white">
                        label the receiving container
                      </strong>{" "}
                      immediately with the product name and hazard
                      pictograms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Wear{" "}
                      <strong className="text-white">
                        appropriate PPE
                      </strong>{" "}
                      as specified on the SDS &mdash; chemical-resistant
                      gloves, goggles, apron
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Mixing Chemicals &mdash; Critical Precautions
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Never mix different chemical products
                      </strong>{" "}
                      unless specifically directed by the manufacturer or a
                      documented procedure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      Common example:{" "}
                      <strong className="text-white">
                        bleach + acidic cleaners = chlorine gas
                      </strong>{" "}
                      (toxic, potentially fatal)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      When diluting acids:{" "}
                      <strong className="text-white">
                        always add acid to water
                      </strong>{" "}
                      &mdash; never water to acid (&ldquo;Do as you oughta
                      &mdash; add acid to water&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      Add the concentrate{" "}
                      <strong className="text-white">slowly</strong> with
                      stirring to allow heat to dissipate safely
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Transportation on Site
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use a{" "}
                      <strong className="text-white">
                        chemical trolley with drip tray
                      </strong>{" "}
                      for moving containers between storage and work areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Containers must be{" "}
                      <strong className="text-white">
                        securely closed and kept upright
                      </strong>{" "}
                      at all times during transit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Never transport{" "}
                      <strong className="text-white">
                        incompatible substances on the same trolley
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Ensure route is clear of obstructions and avoid using
                      lifts with other occupants
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Personal Hygiene
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Wash hands</strong>{" "}
                      thoroughly before eating, drinking, or smoking &mdash;
                      and always before leaving the work area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No eating, drinking, or smoking
                      </strong>{" "}
                      in areas where hazardous substances are stored or
                      used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Separate{" "}
                      <strong className="text-white">
                        clean welfare facilities
                      </strong>{" "}
                      (mess room, toilets) must be provided away from
                      chemical handling areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Remove contaminated clothing and PPE before entering
                      welfare areas
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Spill Kits and Spill Response */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              05
            </span>
            Spill Kits &amp; Spill Response
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Spill kits must be available wherever hazardous substances
                are stored, handled, or used. All workers who may encounter
                a chemical spill must be{" "}
                <strong>
                  trained in the location and use of spill kits
                </strong>{" "}
                before they begin work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Spill Kit Contents
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Absorbent pads:
                      </strong>{" "}
                      Placed directly on the spill to soak up liquid
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Absorbent pillows:
                      </strong>{" "}
                      For larger volumes &mdash; placed on or around the
                      spill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Absorbent socks:
                      </strong>{" "}
                      Flexible tubes placed around the spill perimeter to
                      contain spread
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Loose absorbent granules:
                      </strong>{" "}
                      Sprinkled onto the spill, then swept up after
                      absorption
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Neutralising agents:
                      </strong>{" "}
                      For acid or alkali spills (e.g., sodium bicarbonate
                      for acids, citric acid for alkalis)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">PPE:</strong>{" "}
                      Chemical-resistant gloves, splash-proof goggles,
                      apron
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Disposal bags:
                      </strong>{" "}
                      For contaminated absorbent materials (hazardous
                      waste)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Instructions card:
                      </strong>{" "}
                      Quick-reference spill response procedure
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    When to Evacuate
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Large spills</strong>{" "}
                      that exceed the capacity of available spill kits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      Spills producing{" "}
                      <strong className="text-white">
                        toxic or irritant gases or fumes
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Unknown substances
                      </strong>{" "}
                      &mdash; do not attempt to clean up if you do not know
                      what has been spilt
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      Spills involving{" "}
                      <strong className="text-white">
                        flammable substances near ignition sources
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Any situation where you feel unsafe
                      </strong>{" "}
                      &mdash; evacuate first, assess from a safe distance
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Diagram: Spill Response Steps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              &nbsp;
            </span>
            Spill Response Steps
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-violet-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-violet-400 font-semibold mb-4 text-center tracking-widest uppercase">
                Chemical Spill Response Procedure
              </p>

              <div className="min-w-[300px] space-y-2">
                {/* Step 1 */}
                <div className="flex items-stretch gap-0">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-red-400">
                        1
                      </span>
                    </div>
                    <div className="w-0.5 flex-1 bg-white/10 mt-1" />
                  </div>
                  <div className="flex-1 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-1">
                    <p className="text-xs font-bold text-red-400 mb-0.5">
                      ALERT &amp; EVACUATE
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/70">
                      Warn others. Evacuate if toxic, flammable, or
                      unknown. Call emergency services if necessary.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-stretch gap-0">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-400">
                        2
                      </span>
                    </div>
                    <div className="w-0.5 flex-1 bg-white/10 mt-1" />
                  </div>
                  <div className="flex-1 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-1">
                    <p className="text-xs font-bold text-amber-400 mb-0.5">
                      VENTILATE
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/70">
                      Open windows/doors to ventilate the area. Switch off
                      ignition sources if safe to do so.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-stretch gap-0">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-400">
                        3
                      </span>
                    </div>
                    <div className="w-0.5 flex-1 bg-white/10 mt-1" />
                  </div>
                  <div className="flex-1 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-1">
                    <p className="text-xs font-bold text-blue-400 mb-0.5">
                      DON PPE
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/70">
                      Put on chemical-resistant gloves, goggles, and apron
                      from the spill kit before approaching.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-stretch gap-0">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-violet-400">
                        4
                      </span>
                    </div>
                    <div className="w-0.5 flex-1 bg-white/10 mt-1" />
                  </div>
                  <div className="flex-1 bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 mb-1">
                    <p className="text-xs font-bold text-violet-400 mb-0.5">
                      CONTAIN
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/70">
                      Place absorbent socks around the spill perimeter to
                      prevent further spread to drains or soil.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-stretch gap-0">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-cyan-400">
                        5
                      </span>
                    </div>
                    <div className="w-0.5 flex-1 bg-white/10 mt-1" />
                  </div>
                  <div className="flex-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-1">
                    <p className="text-xs font-bold text-cyan-400 mb-0.5">
                      ABSORB
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/70">
                      Apply absorbent pads, pillows, or granules onto the
                      contained spill. Neutralise acids/alkalis if
                      appropriate.
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex items-stretch gap-0">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-green-400">
                        6
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-green-400 mb-0.5">
                      CLEAN &amp; DISPOSE
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/70">
                      Collect all contaminated absorbent material into
                      hazardous waste bags. Clean the area. Complete an
                      incident report.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] sm:text-xs text-violet-300 font-medium">
                  All used spill kit materials are hazardous waste &mdash;
                  dispose of via licensed waste carrier with consignment
                  note
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Hazardous Waste Classification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              06
            </span>
            Hazardous Waste Classification
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Waste from hazardous substances is controlled under the{" "}
                <strong>
                  Hazardous Waste (England and Wales) Regulations 2005
                </strong>{" "}
                (as amended). Waste producers have a{" "}
                <strong>legal duty of care</strong> to ensure hazardous
                waste is correctly classified, described, stored,
                transported, and disposed of.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  European Waste Catalogue (EWC) Codes
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      EWC codes are{" "}
                      <strong className="text-white">
                        six-digit codes
                      </strong>{" "}
                      that classify every waste type
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Codes marked with an{" "}
                      <strong className="text-white">
                        asterisk (*)
                      </strong>{" "}
                      indicate hazardous waste &mdash; e.g., 07&nbsp;01&nbsp;03*
                      (organic halogenated solvents)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The waste producer must assign the{" "}
                      <strong className="text-white">
                        correct EWC code
                      </strong>{" "}
                      to each waste stream &mdash; this determines the
                      legal disposal route
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Using the{" "}
                      <strong className="text-white">wrong code</strong>{" "}
                      is a breach of the duty of care and may result in
                      enforcement action
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Duty of Care &mdash; Waste Producer Responsibilities
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Describe:</strong>{" "}
                      Correctly classify and describe the waste, including
                      the EWC code, physical form, and hazardous properties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">Store:</strong>{" "}
                      Keep waste securely in suitable, labelled containers
                      to prevent escape, leakage, or unauthorised access
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">Transfer:</strong>{" "}
                      Only hand over waste to a{" "}
                      <strong className="text-white">
                        licensed waste carrier
                      </strong>{" "}
                      registered with the Environment Agency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">Document:</strong>{" "}
                      Complete a{" "}
                      <strong className="text-white">
                        consignment note
                      </strong>{" "}
                      for every hazardous waste collection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">Record:</strong>{" "}
                      Retain consignment notes for a{" "}
                      <strong className="text-white">
                        minimum of 3&nbsp;years
                      </strong>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Licensed disposal:
                  </strong>{" "}
                  Hazardous waste must be taken to a{" "}
                  <strong>licensed disposal site</strong> that holds the
                  correct environmental permit for the waste type. The
                  waste producer&rsquo;s duty of care follows the waste{" "}
                  <strong>from cradle to grave</strong> &mdash; you remain
                  legally responsible even after it leaves your site if you
                  failed to check the carrier&rsquo;s credentials or
                  described the waste incorrectly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Empty Container Disposal */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              07
            </span>
            Empty Container Disposal
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Containers that previously held hazardous substances are{" "}
                <strong>not automatically safe to handle or discard</strong>
                . Residues remain on internal surfaces, and fumes from
                &ldquo;empty&rdquo; containers of volatile substances can
                still pose a significant health and fire risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Correct Disposal Procedure
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        Triple rinse:
                      </strong>{" "}
                      Rinse the container three times with an appropriate
                      solvent (usually water). Each rinse should use
                      approximately one-quarter of the container&rsquo;s
                      volume. Swirl or agitate to remove all internal
                      residues.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Dispose of rinsate:
                      </strong>{" "}
                      The rinse liquid itself is{" "}
                      <strong className="text-white">
                        hazardous waste
                      </strong>{" "}
                      and must be collected and disposed of through the
                      correct waste stream &mdash; never pour it down the
                      drain.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Deface the label:
                      </strong>{" "}
                      Cross through or remove the original label so the
                      container cannot be confused with a full one or
                      reused without proper decontamination.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-violet-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Dispose correctly:
                      </strong>{" "}
                      The container may still need to go through the{" "}
                      <strong className="text-white">
                        hazardous waste route
                      </strong>{" "}
                      depending on the original contents and the level of
                      residual contamination. Consult the SDS and your
                      waste contractor.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Reuse Without Decontamination
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Empty containers must{" "}
                  <strong className="text-white">
                    NEVER be reused for a different chemical
                  </strong>{" "}
                  without proper decontamination and re-labelling.
                  Residual traces of the original substance can react with
                  the new contents, causing fires, toxic gas release, or
                  container failure. Even apparently &ldquo;clean&rdquo;
                  containers may retain sufficient residue to create a
                  dangerous reaction. When in doubt, dispose of the
                  container rather than attempt to reuse it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Record Keeping Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              08
            </span>
            Record Keeping Requirements
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Comprehensive record keeping is a{" "}
                <strong>legal requirement</strong> under the Hazardous
                Waste Regulations, the Environmental Protection Act 1990
                duty of care, and COSHH itself. Records provide an audit
                trail demonstrating that hazardous substances have been
                managed, stored, handled, and disposed of in compliance
                with the law.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What Must Be Recorded
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Consignment notes:
                      </strong>{" "}
                      Completed for every hazardous waste collection —
                      waste description, EWC code, quantity, carrier
                      details, destination site — retained for minimum
                      3&nbsp;years
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Safety Data Sheets:
                      </strong>{" "}
                      Up-to-date SDS for every hazardous substance on site
                      &mdash; accessible to all workers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        COSHH assessments:
                      </strong>{" "}
                      Written risk assessments for each substance or
                      process &mdash; reviewed at least annually or after
                      any significant change
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Stock inventory:
                      </strong>{" "}
                      Register of all hazardous substances held on site
                      including quantities, locations, and date of receipt
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Spill/incident reports:
                      </strong>{" "}
                      Details of any spills, leaks, or exposure incidents
                      including root cause and corrective actions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Training records:
                      </strong>{" "}
                      Evidence that all workers have received COSHH
                      training relevant to their role, including spill
                      response training
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Waste carrier licences:
                      </strong>{" "}
                      Copies of the carrier&rsquo;s waste carrier
                      registration and the disposal site&rsquo;s
                      environmental permit
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Environment Agency inspections:
                  </strong>{" "}
                  The Environment Agency can inspect your premises and
                  request to see all waste-related records at any
                  reasonable time. Failure to produce consignment notes,
                  duty of care documentation, or evidence of correct waste
                  classification can result in{" "}
                  <strong>enforcement notices, fines, or prosecution</strong>.
                  Good record keeping is not optional &mdash; it is a
                  fundamental legal obligation.
                </p>
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
            <Link to="../coshh-awareness-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: RPE &amp; PPE Selection
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5">
              Next Module: Monitoring &amp; Surveillance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
