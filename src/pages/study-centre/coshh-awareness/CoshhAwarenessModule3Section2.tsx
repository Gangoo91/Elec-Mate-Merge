import { ArrowLeft, Zap, CheckCircle, AlertTriangle, Skull } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pvc-fumes",
    question: "What is the PRIMARY hazardous gas released when PVC cable insulation is overheated or burned?",
    options: [
      "Hydrogen chloride (HCl) gas",
      "Carbon monoxide only",
      "Nitrogen dioxide",
      "Methane gas"
    ],
    correctIndex: 0,
    explanation: "When PVC (polyvinyl chloride) cable insulation is overheated, cut with hot tools, or burned, it releases hydrogen chloride (HCl) gas. HCl is a severe respiratory irritant that causes burns to the eyes, nose, throat, and lungs. At higher temperatures (above approximately 300\u00b0C), PVC can also produce dioxins and furans \u2014 extremely toxic persistent organic pollutants. This is why local exhaust ventilation (LEV) and appropriate RPE are essential whenever PVC cables are subjected to heat."
  },
  {
    id: "colophony-flux",
    question: "Colophony (rosin) in soldering flux is classified as which type of health hazard?",
    options: [
      "A carcinogen",
      "A respiratory sensitiser",
      "An acute poison",
      "A radioactive substance"
    ],
    correctIndex: 1,
    explanation: "Colophony (also called rosin) is the main component of many traditional soldering fluxes. It is classified as a respiratory sensitiser under COSHH, meaning that repeated exposure can cause occupational asthma. Once sensitised, even very low levels of colophony fume can trigger severe asthmatic reactions. This sensitisation is irreversible \u2014 the individual will always react to colophony fume exposure. Adequate local exhaust ventilation at the point of soldering is the primary control measure, supplemented by RPE where ventilation alone is insufficient."
  },
  {
    id: "sf6-decomposition",
    question: "Why must electricians take special precautions when working with switchgear that has experienced an internal arc in an SF6-filled compartment?",
    options: [
      "SF6 gas is flammable after arcing",
      "The arc produces toxic decomposition products including sulphur dioxide and hydrogen fluoride",
      "SF6 becomes radioactive after electrical discharge",
      "The gas pressure doubles after an arc event"
    ],
    correctIndex: 1,
    explanation: "Sulphur hexafluoride (SF6) is itself non-toxic and chemically inert under normal conditions. However, when an electrical arc passes through SF6 \u2014 during a fault, switching operation, or equipment failure \u2014 the gas decomposes to produce highly toxic by-products including sulphur dioxide (SO2), hydrogen fluoride (HF), sulphur tetrafluoride (SF4), and metal fluorides. These decomposition products are acutely toxic and corrosive, causing severe burns to the lungs, eyes, and skin. Compartments that have experienced internal arcing must only be opened by trained personnel wearing full RPE (including supplied-air breathing apparatus) and chemical-resistant PPE."
  }
];

const faqs = [
  {
    question: "Is lead-free solder actually safe to breathe?",
    answer: "No. Although lead-free solders eliminate the risk of lead exposure, they still produce hazardous fumes during soldering. Lead-free solders typically contain tin, silver, and copper alloys, and the flux used with them (often colophony/rosin-based or organic acid flux) generates fume that is a respiratory sensitiser. The solder itself produces metal oxide fumes (particularly tin oxide) when heated. Local exhaust ventilation is required for ALL soldering work, regardless of whether the solder is leaded or lead-free. The HSE Workplace Exposure Limit (WEL) for colophony fume is extremely low, reflecting its potency as a sensitiser."
  },
  {
    question: "Can I use brake cleaner to clean electrical contacts?",
    answer: "This is strongly discouraged. Brake cleaner (typically containing acetone, toluene, or methanol) is not formulated for electrical use and often contains aggressive solvents that can damage plastics, rubber seals, and component coatings. More importantly, many brake cleaners contain chlorinated solvents which produce phosgene gas (a highly toxic chemical warfare agent) when exposed to heat or flame. In the confined spaces where electricians often work, solvent vapour concentrations can build rapidly to dangerous levels. Always use dedicated electrical contact cleaners that are formulated to be safe on electrical components and less hazardous to health when used with adequate ventilation."
  },
  {
    question: "Are two-part epoxy resins dangerous once they have fully cured?",
    answer: "Once fully cured (polymerised), two-part epoxy resins are generally inert and pose minimal health risk. The hazards arise during mixing, application, and the curing process itself. The resin component contains bisphenol A diglycidyl ether (BADGE/DGEBA), which is a skin sensitiser. The hardener component (typically an amine) is corrosive, can cause severe skin burns, and is also a potent sensitiser. During curing, exothermic heat is generated which can release irritant fumes. Skin sensitisation from uncured epoxy is irreversible and can force affected individuals to leave the electrical trade entirely. Always wear nitrile gloves (not latex), safety glasses, and ensure adequate ventilation during mixing and application."
  },
  {
    question: "What should I do if I spill battery acid (sulphuric acid) from a lead-acid battery?",
    answer: "Immediately isolate the area and prevent anyone from walking through the spill. Wear acid-resistant gloves, safety glasses/goggles, and appropriate footwear. For small spills, neutralise the acid using sodium bicarbonate (baking soda) or a proprietary acid spill neutraliser \u2014 apply generously until fizzing stops, indicating the acid has been neutralised. Absorb the neutralised liquid with absorbent granules or paper towels. For larger spills, evacuate the area and call the site emergency response team. Never add water to concentrated acid (it can cause violent spattering). Sulphuric acid concentrations in lead-acid batteries are typically 30\u201340%, which is strong enough to cause severe chemical burns to skin and eyes within seconds of contact. Flush any skin or eye contact immediately with copious water for at least 20 minutes."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When PVC cable insulation is heated above approximately 300\u00b0C, which extremely toxic substances can be produced in addition to hydrogen chloride?",
    options: [
      "Carbon dioxide and water vapour",
      "Dioxins and furans",
      "Ammonia and methane",
      "Ozone and nitrogen"
    ],
    correctAnswer: 1,
    explanation: "At temperatures above approximately 300\u00b0C, PVC thermal decomposition produces dioxins and furans \u2014 persistent organic pollutants that are among the most toxic substances known. Even very small quantities are hazardous. This is why burning PVC cable waste on site is prohibited, and why hot-work operations on or near PVC cables require effective local exhaust ventilation and appropriate RPE."
  },
  {
    id: 2,
    question: "Epoxy resin cable jointing compounds can cause which irreversible health condition through repeated skin contact?",
    options: [
      "Lead poisoning",
      "Hearing loss",
      "Skin sensitisation (allergic contact dermatitis)",
      "Vibration white finger"
    ],
    correctAnswer: 2,
    explanation: "Epoxy resins are potent skin sensitisers. Repeated skin contact with uncured epoxy resin or hardener can cause allergic contact dermatitis \u2014 a type of skin sensitisation that is irreversible. Once sensitised, even very brief contact with trace amounts of epoxy triggers a severe allergic skin reaction. This can force affected electricians to leave cable jointing work entirely. Nitrile gloves (not latex), barrier cream, and strict personal hygiene are essential controls."
  },
  {
    id: 3,
    question: "What is the correct hierarchy of control for managing colophony fume exposure during soldering?",
    options: [
      "RPE first, then ventilation if RPE is uncomfortable",
      "Open a window, and wear a dust mask if fumes are visible",
      "Local exhaust ventilation (LEV) at the point of soldering, supplemented by RPE where LEV alone is insufficient",
      "General room ventilation is always adequate for soldering"
    ],
    correctAnswer: 2,
    explanation: "The correct approach follows the COSHH hierarchy of control. Local exhaust ventilation (LEV) \u2014 typically a bench-top fume extractor positioned close to the soldering point \u2014 is the primary engineering control. This captures fume at source before it reaches the breathing zone. Where LEV alone cannot reduce exposure below the WEL (for example, in awkward positions or confined spaces), RPE must be provided as a supplementary measure. General room ventilation and open windows are NOT adequate substitutes for LEV."
  },
  {
    id: 4,
    question: "Why is trichloroethylene (TCE) no longer recommended as an electrical cleaning agent?",
    options: [
      "It is too expensive for commercial use",
      "It evaporates too quickly to be effective",
      "It is classified as a carcinogen (category 1B) and causes liver and kidney damage",
      "It leaves a residue that reduces electrical conductivity"
    ],
    correctAnswer: 2,
    explanation: "Trichloroethylene (TCE) was widely used as a degreaser and electrical cleaning agent but is now classified as a category 1B carcinogen under CLP Regulation. It causes cancer (particularly kidney cancer), liver damage, and neurological effects with chronic exposure. Acute exposure causes narcotic effects (dizziness, confusion, unconsciousness). Its use is now restricted under REACH and it has been largely replaced by less hazardous alternatives such as isopropyl alcohol, modified alcohols, and proprietary electrical contact cleaners. If TCE is still present on site as a legacy product, it must be managed under strict COSHH controls and replaced as soon as practicable."
  },
  {
    id: 5,
    question: "What is the primary health risk from petroleum-based cable pulling lubricants?",
    options: [
      "Explosive vapour in confined spaces",
      "Skin irritation, dermatitis, and potential aspiration hazard if swallowed",
      "Radiation exposure from petroleum compounds",
      "Allergic reaction causing anaphylaxis"
    ],
    correctAnswer: 1,
    explanation: "Petroleum-based cable pulling lubricants can cause skin irritation and occupational dermatitis with repeated or prolonged skin contact. They strip the natural oils from the skin, leading to drying, cracking, and inflammation. If accidentally swallowed, petroleum-based products present an aspiration hazard \u2014 they can enter the lungs during swallowing or vomiting, causing chemical pneumonitis. Water-based lubricants are generally preferred where possible as they present lower dermal and ingestion risks, though they still require appropriate hygiene measures."
  },
  {
    id: 6,
    question: "Why must older transformer oil be treated as potentially highly hazardous?",
    options: [
      "It may contain PCBs (polychlorinated biphenyls), which are persistent toxic pollutants",
      "Transformer oil becomes radioactive over time",
      "All transformer oil contains asbestos fibres",
      "Older oil produces methane gas spontaneously"
    ],
    correctAnswer: 0,
    explanation: "Transformer and switchgear insulating oils manufactured before the mid-1980s may contain polychlorinated biphenyls (PCBs). PCBs are persistent organic pollutants classified as probable human carcinogens (Group 2A by IARC). They accumulate in the body over time and cause liver damage, immune suppression, and endocrine disruption. PCB-contaminated oil requires specialist disposal as hazardous waste under the Environmental Permitting Regulations. Before working on older oil-filled electrical equipment, always check whether the oil has been tested for PCB contamination."
  },
  {
    id: 7,
    question: "When cutting fire-resistant boards or intumescent coatings, what is the primary inhalation hazard?",
    options: [
      "Asbestos fibres from modern fire-stop products",
      "Respirable dust containing mineral fibres, calcium silicate, or vermiculite particles",
      "Radioactive particles from fire-resistant additives",
      "Carbon monoxide from thermal decomposition"
    ],
    correctAnswer: 1,
    explanation: "Modern fire-resistant boards, intumescent coatings, and fire-stop compounds (post-2000) do not contain asbestos, but cutting, drilling, or sanding them generates respirable dust that can contain mineral fibres (ceramic or glass), calcium silicate particles, vermiculite, or chemical additives. This dust irritates the respiratory system and may cause occupational lung disease with chronic exposure. Controls include wet cutting where possible, on-tool extraction (H-class vacuum), RPE (minimum FFP3 for prolonged work), and thorough cleanup to prevent secondary exposure."
  },
  {
    id: 8,
    question: "What neutralising agent should be applied to a small sulphuric acid spill from a lead-acid battery?",
    options: [
      "Water only \u2014 dilute and mop up",
      "Bleach solution",
      "Sodium bicarbonate (baking soda) or proprietary acid neutraliser",
      "Petroleum jelly to seal the spill"
    ],
    correctAnswer: 2,
    explanation: "Sodium bicarbonate (baking soda) is the standard neutralising agent for sulphuric acid spills from lead-acid batteries. It reacts with the acid in a controlled exothermic reaction, converting it to sodium sulphate, carbon dioxide, and water. Apply generously until fizzing stops, indicating complete neutralisation. Proprietary acid spill neutralisers (often sodium bicarbonate-based with pH indicator dye) are also suitable. Never use water alone on concentrated acid \u2014 it can cause violent spattering and spread the acid. Bleach is never used as it can react dangerously with acids to produce toxic chlorine gas."
  }
];

export default function CoshhAwarenessModule3Section2() {
  useSEO({
    title: "Electrical Trade Hazards | COSHH Awareness Module 3.2",
    description: "PVC fumes, soldering flux, cable jointing compounds, cleaning agents, battery acid, SF6, insulating oils, and fire-resistant materials \u2014 hazardous substances specific to the electrical trade.",
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
            <Link to="../coshh-awareness-module-3">
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
            <Zap className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Trade Hazards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Hazardous substances specific to the electrical trade &mdash; PVC fumes, soldering flux, cable jointing compounds, cleaning agents, battery acid, SF6 gas, insulating oils, and fire-resistant materials
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>PVC fumes:</strong> HCl gas and dioxins from hot work on cables</li>
              <li><strong>Soldering flux:</strong> Colophony is a respiratory sensitiser &mdash; causes occupational asthma</li>
              <li><strong>Epoxy resins:</strong> Skin sensitisers &mdash; irreversible allergic dermatitis</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>SF6 arcing:</strong> Toxic decomposition products &mdash; specialist RPE required</li>
              <li><strong>Older oils:</strong> May contain PCBs &mdash; probable carcinogen</li>
              <li><strong>Battery acid:</strong> Sulphuric acid &mdash; severe chemical burns in seconds</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the hazardous fumes produced when PVC cable insulation is overheated or burned",
              "Explain why colophony (rosin) flux fume is classified as a respiratory sensitiser",
              "Describe the health risks of uncured epoxy resin cable jointing compounds",
              "Select appropriate control measures for soldering, cleaning, and cable jointing operations",
              "Recognise the hazards of SF6 decomposition products and older PCB-contaminated oils",
              "Apply correct emergency procedures for battery acid spills and chemical splashes"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ================================================================ */}
        {/* Section 01: PVC (Polyvinyl Chloride) Fumes                      */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            PVC (Polyvinyl Chloride) Fumes
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Polyvinyl chloride (PVC) is the most widely used cable insulation and sheathing material
                in UK electrical installations. Under normal conditions PVC is stable and poses no
                significant health risk. However, when PVC is <strong>overheated, cut with hot tools,
                soldered, or burned</strong>, it undergoes thermal decomposition and releases a range of
                highly hazardous substances.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Toxic Fume Hazard</p>
                </div>
                <p className="text-sm text-white/80">
                  The <strong className="text-white">primary hazardous gas</strong> released from heated PVC
                  is <strong className="text-white">hydrogen chloride (HCl)</strong>. This is a severe
                  respiratory irritant that attacks the eyes, nose, throat, and lungs. Exposure can cause
                  pulmonary oedema (fluid in the lungs) which may be delayed by several hours after exposure.
                  At temperatures above approximately <strong className="text-white">300&deg;C</strong>,
                  PVC decomposition also produces <strong className="text-white">dioxins and furans</strong>
                  &mdash; extremely toxic persistent organic pollutants.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">When Does PVC Become Hazardous?</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Hot-knife cutting:</strong> Using heated blades to strip or cut PVC cable insulation releases HCl fume directly into the breathing zone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Soldering near PVC:</strong> Soldering connections close to PVC insulation can heat the PVC sufficiently to cause fume release</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Cable fires:</strong> PVC cables involved in fire release large quantities of HCl, dioxins, and dense black smoke containing carbon particles and plasticiser fumes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Burning waste cable:</strong> Illegal and extremely dangerous &mdash; burning PVC cable waste produces concentrated dioxin emissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Laser marking/engraving:</strong> Industrial processes that use lasers on PVC can produce fume</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Control Measures for PVC Fumes</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Eliminate:</strong> Use cold-cutting methods (cable cutters, strippers) wherever possible to avoid generating fume entirely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">LEV:</strong> Local exhaust ventilation at the point of fume generation when hot work on PVC is unavoidable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">RPE:</strong> Minimum FFP3 particulate respirator; for prolonged exposure or confined spaces, use a half-face respirator with combined ABEK/P3 filters (acid gas plus particulate)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Ventilation:</strong> Ensure adequate general ventilation in addition to LEV &mdash; never perform hot work on PVC in unventilated or confined spaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">LSZH cable:</strong> In new installations, consider Low Smoke Zero Halogen (LSZH) cable which does not produce HCl or dioxins when heated</span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">On Site:</strong> If you smell a sharp, acrid, acidic
                  odour when working with cables &mdash; particularly during soldering or hot work &mdash;
                  you are inhaling HCl fume. Stop work immediately, move to fresh air, and do not return
                  until adequate ventilation or LEV is in place. Report any exposure to your supervisor.
                  If you experience breathing difficulty, chest tightness, or persistent cough after
                  PVC fume exposure, seek medical attention &mdash; pulmonary oedema can develop hours
                  after exposure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Section 02: Cable Jointing Compounds                            */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            Cable Jointing Compounds
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cable jointing involves the use of various chemical compounds to seal, insulate, and
                protect cable joints and terminations. These compounds present significant health
                hazards, particularly through <strong>skin contact and inhalation of fumes during
                mixing and curing</strong>.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Epoxy Resin Systems</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Resin component (Part A):</strong> Contains bisphenol A diglycidyl ether (BADGE/DGEBA) &mdash; a <strong className="text-white">skin sensitiser</strong> that causes allergic contact dermatitis with repeated exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Hardener component (Part B):</strong> Typically an amine compound &mdash; <strong className="text-white">corrosive</strong>, causes severe skin burns, eye damage, and is also a respiratory and skin sensitiser</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Curing reaction:</strong> Exothermic (generates heat) &mdash; produces irritant fumes, particularly in enclosed joint housings or cable pits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Sensitisation is irreversible:</strong> Once sensitised to epoxy, even trace contact triggers severe reactions &mdash; can force workers out of cable jointing permanently</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Polyurethane Compounds</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Isocyanates:</strong> Many polyurethane jointing compounds contain isocyanates, which are <strong className="text-white">potent respiratory sensitisers</strong> and a leading cause of occupational asthma in the UK</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Skin absorption:</strong> Isocyanates can be absorbed through the skin and cause sensitisation via the dermal route, not just by inhalation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">WEL:</strong> The Workplace Exposure Limit for isocyanates is extremely low (0.02 mg/m&sup3; 8-hr TWA), reflecting their extreme potency</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Hot-Melt Adhesives and Mastics</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Thermal burns:</strong> Hot-melt compounds are applied at temperatures of 150&ndash;200&deg;C and cause severe contact burns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Fume hazard:</strong> Overheating hot-melt compounds produces irritant and potentially toxic fumes from thermal degradation of the polymer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Skin contact:</strong> Even after cooling, some hot-melt formulations can cause skin irritation with prolonged contact</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Skull className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical: Epoxy Skin Sensitisation</p>
                </div>
                <p className="text-sm text-white/80">
                  Epoxy sensitisation is the <strong className="text-white">most common occupational skin
                  disease</strong> among cable jointers. It typically develops after weeks to months of
                  repeated exposure through inadequate glove use. Once sensitised, the condition is
                  <strong className="text-white"> permanent</strong>. Always wear <strong className="text-white">
                  nitrile gloves</strong> (not latex &mdash; latex does not provide adequate protection
                  against epoxy), safety glasses, and disposable coveralls when mixing and applying
                  jointing compounds. Change gloves immediately if they become contaminated or damaged.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================ */}
        {/* Section 03: Soldering and Brazing                               */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            Soldering and Brazing
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Soldering is one of the most common operations in the electrical trade, used for
                terminations, PCB assembly, and cable jointing. Both traditional lead-based and modern
                lead-free solders present significant fume hazards, primarily from the <strong>flux
                </strong> rather than the metal alloy itself.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Colophony (Rosin) &mdash; Respiratory Sensitiser</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Colophony</strong> (also called rosin) is the primary component
                  of most traditional soldering fluxes. When heated during soldering, it produces a complex fume
                  containing aldehydes and organic acids. Colophony fume is classified as a
                  <strong className="text-white"> respiratory sensitiser</strong> under COSHH. Repeated exposure
                  causes <strong className="text-white">occupational asthma</strong> &mdash; once sensitised,
                  even very low concentrations of colophony fume trigger severe asthmatic reactions. This
                  sensitisation is <strong className="text-white">irreversible</strong>.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Solder Types and Their Hazards</p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Leaded solder (60/40 tin/lead):</strong> Produces both
                      flux fume and lead fume. Lead is a cumulative poison that causes damage to the nervous
                      system, kidneys, reproductive system, and blood. The WEL for lead in air is 0.15 mg/m&sup3;.
                      Blood lead monitoring is required for regular lead soldering work. Now largely restricted
                      under RoHS (Restriction of Hazardous Substances) for electronics but still used in some
                      electrical installations and maintenance work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lead-free solder (SAC305 &mdash; tin/silver/copper):</strong> Eliminates
                      lead exposure but still produces flux fume (colophony or organic acid flux). The higher
                      melting temperature of lead-free solder (approximately 217&deg;C versus 183&deg;C for
                      60/40) can generate <strong className="text-white">more fume</strong> because of the
                      increased heat. Tin oxide and silver oxide fumes are produced from the metal alloy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Water-soluble (organic acid) flux:</strong> An alternative
                      to colophony flux. While not a respiratory sensitiser in the same way as colophony,
                      organic acid fluxes are corrosive and produce irritant fumes. They require thorough
                      cleaning after soldering to prevent corrosion.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Brazing and Silver Soldering</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Higher temperatures:</strong> Brazing operates at 600&ndash;900&deg;C, generating significantly more metal fume than soft soldering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Cadmium-containing alloys:</strong> Some older brazing alloys contain cadmium, which produces extremely toxic cadmium oxide fume &mdash; a single heavy exposure can be fatal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fluoride-based fluxes:</strong> Brazing fluxes often contain fluorides, which produce hydrogen fluoride (HF) fume &mdash; highly toxic and corrosive to the respiratory system</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Ventilation Requirements for Soldering</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">LEV at source:</strong> A bench-top fume extractor or extraction arm positioned within 50&ndash;100mm of the soldering point. This is the PRIMARY control measure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Solder fume extraction tips:</strong> Integrated extraction built into the soldering iron itself &mdash; highly effective for fine work and PCB soldering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">General ventilation:</strong> Supports LEV but is NOT a substitute for it. Opening a window is never adequate for regular soldering work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">RPE (supplementary):</strong> Where LEV alone cannot reduce exposure below the WEL &mdash; minimum FFP3 disposable or half-face with P3 filters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">LEV maintenance:</strong> Extract systems must be examined and tested at least every 14 months (LEV statutory examination under COSHH Reg. 9)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">On Site:</strong> Many electricians solder without any
                  fume extraction, especially on site where bench-top extractors are impractical. At minimum,
                  position yourself so that natural air movement carries fume away from your breathing zone
                  (never lean over the work). For repeated or prolonged soldering, portable extraction units
                  with activated carbon filters are available and should be used. If you develop a persistent
                  cough, wheeze, or chest tightness that improves on days away from work, report this to
                  your GP and occupational health &mdash; these are early signs of occupational asthma.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Section 04: Electrical Cleaning Agents                          */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">04</span>
            Electrical Cleaning Agents
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricians routinely use cleaning agents for degreasing contacts, cleaning switchgear,
                removing flux residues, and preparing surfaces. These products contain volatile organic
                solvents that present <strong>inhalation, skin contact, and fire hazards</strong> &mdash;
                particularly in the confined spaces where electrical work is often performed.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Contact Cleaners</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Contents:</strong> Typically isopropyl alcohol (IPA), hydrofluoroether (HFE), or hydrocarbon solvents in aerosol cans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Inhalation risk:</strong> Aerosol sprays produce a concentrated vapour cloud that can rapidly build to hazardous concentrations in enclosed switchrooms, cable pits, and panel enclosures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">CNS effects:</strong> Many solvents are central nervous system depressants &mdash; high vapour concentrations cause dizziness, headache, nausea, and loss of consciousness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Flammability:</strong> Most electrical contact cleaners are highly flammable &mdash; never spray near live equipment, arcing contacts, or ignition sources</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Degreasers</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Isopropyl alcohol (IPA):</strong> Widely used, relatively low toxicity but flammable (flash point 12&deg;C). Causes eye and skin irritation. Adequate ventilation required.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Acetone:</strong> Very volatile, highly flammable, CNS depressant at high concentrations. Causes dry, cracked skin with repeated contact. Use with LEV or in well-ventilated areas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">n-Hexane:</strong> Formerly common in degreasers. Chronic exposure causes peripheral neuropathy (nerve damage in hands and feet). Now largely replaced by less hazardous alternatives.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Skull className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Legacy Hazard: Trichloroethylene (TCE)</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Trichloroethylene was once widely used as an electrical degreaser and cleaning agent. It is
                    now classified as a <strong className="text-white">category 1B carcinogen</strong> (causes
                    kidney cancer) and is restricted under REACH. TCE also causes liver damage, neurological
                    effects, and cardiac sensitisation (sudden death from heart arrhythmia). If you encounter
                    TCE on site as a legacy product, <strong className="text-white">do not use it</strong> &mdash;
                    report it to your supervisor for safe disposal and replacement with a modern alternative.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Brake Cleaner Misuse</p>
                  </div>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Brake cleaner is NOT suitable for electrical cleaning.</strong> It
                    is commonly misused on site as a general-purpose degreaser. Many brake cleaners contain chlorinated
                    solvents that produce <strong className="text-white">phosgene gas</strong> (a lethal chemical
                    warfare agent) when exposed to heat, flame, or UV light. They can also damage plastic components,
                    rubber seals, and cable insulation. Additionally, the aggressive solvent formulation can cause
                    rapid skin defatting and chemical burns. Always use dedicated electrical contact cleaners
                    that are formulated to be safe on electrical components.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Ventilation in Confined Areas</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Switchrooms:</strong> Often poorly ventilated &mdash; solvent vapours accumulate rapidly. Open doors and use portable fans before and during cleaning operations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Cable pits and trenches:</strong> Solvent vapours are heavier than air and pool in low-lying areas. These are confined spaces &mdash; a confined space entry permit may be required.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Panel enclosures:</strong> Spraying contact cleaner inside an enclosed panel creates a concentrated vapour pocket. Allow adequate time for vapour to disperse before re-energising.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                    <span><strong className="text-white">Minimum controls:</strong> Forced ventilation, RPE (organic vapour filters), limit exposure duration, use the minimum quantity needed.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Section 05: Cable Pulling Lubricants, Insulating Oils, and SF6  */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">05</span>
            Cable Pulling Lubricants, Insulating Oils, and SF6 Gas
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical installation and maintenance involves exposure to a range of oils, lubricants,
                and specialised gases that present distinct health hazards. Understanding these hazards
                is essential for electricians working on power distribution, cable installation, and
                high-voltage switchgear.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Cable Pulling Lubricants</p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Petroleum-based lubricants:</strong> Traditional cable-pulling
                      lubricants are petroleum-derived. They strip natural oils from the skin, causing drying,
                      cracking, and <strong className="text-white">occupational dermatitis</strong> with repeated
                      exposure. If accidentally swallowed (for example, from contaminated hands while eating or
                      drinking), petroleum-based products present an <strong className="text-white">aspiration
                      hazard</strong> &mdash; they can enter the lungs and cause chemical pneumonitis. Prolonged
                      skin contact may also allow absorption of hydrocarbon components.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Water-based lubricants:</strong> Generally preferred as they
                      present lower dermal and ingestion risks. However, they can still cause skin irritation
                      (particularly if they contain biocides or preservatives), and some formulations may cause
                      allergic reactions in sensitised individuals. Water-based lubricants are also less effective
                      in cold conditions and can promote corrosion on cable sheaths if not compatible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Controls:</strong> Wear gloves (nitrile preferred) during
                      cable pulling. Wash hands before eating, drinking, or smoking. Use barrier cream. Change
                      contaminated clothing. Never store lubricants in food containers.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Insulating Oils (Transformer and Switchgear Oil)</p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mineral oil:</strong> Transformer oil is a highly refined
                      mineral oil used for insulation and cooling. Contact causes skin irritation and dermatitis.
                      Oil mist (generated during maintenance, filling, or leaks under pressure) is an inhalation
                      hazard that irritates the respiratory system and has a WEL of 5 mg/m&sup3; (inhalable fraction).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">PCB contamination:</strong> Oils in transformers and switchgear
                      manufactured <strong className="text-white">before the mid-1980s</strong> may contain
                      <strong className="text-white"> polychlorinated biphenyls (PCBs)</strong>. PCBs are persistent
                      organic pollutants classified as <strong className="text-white">probable human carcinogens</strong>
                      (Group 2A, IARC). They accumulate in the body, cause liver damage, immune suppression, and
                      endocrine disruption. PCB-contaminated equipment requires specialist handling, decontamination,
                      and disposal as hazardous waste.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Testing:</strong> Before any maintenance work on older oil-filled
                      equipment, confirm whether the oil has been tested for PCB content. Equipment containing more
                      than 50 ppm PCB must be managed under the PCB Regulations (SI 2000/3359).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Skull className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">SF6 (Sulphur Hexafluoride) &mdash; Decomposition Hazard</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    SF6 is a synthetic gas used as an insulating and arc-quenching medium in high-voltage
                    switchgear, circuit breakers, and gas-insulated substations (GIS). <strong className="text-white">
                    Under normal conditions SF6 is non-toxic</strong> (it is odourless, colourless, and chemically
                    inert). However, it is an <strong className="text-white">asphyxiant</strong> &mdash; being five
                    times heavier than air, it displaces oxygen in low-lying areas and enclosed spaces.
                  </p>
                  <p>
                    The critical hazard arises when SF6 is <strong className="text-white">decomposed by electrical
                    arcing</strong>. Arc decomposition products include:
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span><strong className="text-white">Sulphur dioxide (SO2):</strong> Toxic, corrosive to lungs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span><strong className="text-white">Hydrogen fluoride (HF):</strong> Extremely toxic, causes deep tissue burns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span><strong className="text-white">Sulphur tetrafluoride (SF4):</strong> Highly toxic lung irritant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span><strong className="text-white">Metal fluorides:</strong> From arc contact with metal components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span><strong className="text-white">White powder residue:</strong> Toxic solid by-products deposited on internal surfaces</span>
                    </li>
                  </ul>
                  <p className="mt-2">
                    <strong className="text-white">Compartments that have experienced internal arcing must
                    ONLY be opened by trained personnel wearing full RPE (supplied-air breathing apparatus)
                    and chemical-resistant PPE.</strong>
                  </p>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Environmental Note:</strong> SF6 is also the most potent
                  greenhouse gas known &mdash; with a global warming potential <strong>23,500 times greater than
                  CO2</strong> and an atmospheric lifetime of approximately 3,200 years. Under the
                  F-Gas Regulation, SF6 must be recovered during maintenance and not vented to the atmosphere.
                  Leaks must be detected and repaired promptly. The electrical industry is actively developing
                  SF6-free alternatives for high-voltage switchgear.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================ */}
        {/* Section 06: Battery Acid and Battery Hazards                    */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">06</span>
            Battery Acid and Battery Hazards
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricians encounter batteries in UPS (uninterruptible power supply) systems, emergency
                lighting, standby generators, solar PV installations, and industrial control systems. Both
                traditional lead-acid and modern lithium-ion batteries present distinct chemical hazards
                that require specific control measures.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Lead-Acid Batteries &mdash; Sulphuric Acid</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Electrolyte:</strong> Dilute sulphuric acid (H2SO4), typically 30&ndash;40% concentration &mdash; strong enough to cause <strong className="text-white">severe chemical burns</strong> to skin and eyes within seconds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Splash hazard:</strong> Moving, tipping, or dropping batteries can cause acid to splash from vents or cracked casings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Hydrogen gas:</strong> Charging lead-acid batteries produces hydrogen gas, which is explosive at concentrations of 4&ndash;75% in air. Battery rooms must be ventilated to prevent hydrogen accumulation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Lead exposure:</strong> Lead-acid battery terminals and plates contain lead. Handling batteries without gloves and then touching the face or eating causes lead ingestion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Acid mist:</strong> During charging, sulphuric acid mist can be released, particularly from vented (flooded) cells. The WEL for sulphuric acid mist is 0.05 mg/m&sup3; (thoracic fraction).</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Lithium Batteries &mdash; Electrolyte Hazards</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Electrolyte:</strong> Lithium-ion batteries contain organic carbonate solvents (ethylene carbonate, dimethyl carbonate) with lithium hexafluorophosphate (LiPF6) salt &mdash; <strong className="text-white">flammable, toxic, and corrosive</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Thermal runaway:</strong> Damaged or overcharged lithium cells can enter thermal runaway, producing temperatures exceeding 500&deg;C and releasing toxic gases including hydrogen fluoride (HF), phosphoryl fluoride (POF3), and carbon monoxide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Hydrofluoric acid:</strong> LiPF6 reacts with moisture to produce hydrofluoric acid (HF), which causes deep tissue burns and systemic fluoride poisoning &mdash; even small skin exposures can be life-threatening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Venting:</strong> Swollen or venting lithium batteries must be treated as an emergency. Evacuate the area, ventilate, and call the fire service. Do NOT attempt to handle a venting lithium battery without specialist equipment.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Battery Acid Spill Response</p>
                <ol className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">1</span>
                    <span><strong className="text-white">Isolate the area</strong> and prevent others from walking through the spill</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">2</span>
                    <span><strong className="text-white">Wear PPE</strong> &mdash; acid-resistant gloves, safety goggles, and appropriate footwear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">3</span>
                    <span><strong className="text-white">Neutralise</strong> with sodium bicarbonate (baking soda) or proprietary acid neutraliser &mdash; apply generously until fizzing stops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">4</span>
                    <span><strong className="text-white">Absorb</strong> the neutralised liquid with absorbent granules or paper towels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">5</span>
                    <span><strong className="text-white">Dispose</strong> as chemical waste &mdash; do not pour down drains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">6</span>
                    <span><strong className="text-white">Skin/eye contact:</strong> Flush immediately with copious water for at least 20 minutes &mdash; seek medical attention</span>
                  </li>
                </ol>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Never Add Water to Concentrated Acid</p>
                </div>
                <p className="text-sm text-white/80">
                  Adding water to concentrated sulphuric acid causes a <strong className="text-white">violent
                  exothermic reaction</strong> that can cause the acid to boil and spatter. Always add acid to
                  water (when diluting), never water to acid. For spill response, use a neutralising agent
                  (sodium bicarbonate) rather than attempting to dilute with water. Remember the phrase:
                  <strong className="text-white"> &ldquo;Do as you oughta &mdash; add acid to water&rdquo;</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Section 07: Fire-Resistant Materials and Resin Compounds        */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">07</span>
            Fire-Resistant Materials and Resin Casting Compounds
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricians regularly work with fire-resistant materials for cable penetration sealing,
                fire barriers, and compartmentation. They also use resin casting and potting compounds
                to encapsulate cable joints, terminals, and electronic assemblies. Both categories contain
                substances that are hazardous during installation and application.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Intumescent Coatings</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Purpose:</strong> Applied to cable trays, structural steel, and penetration seals to expand in fire and provide fire resistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Wet application hazards:</strong> Many intumescent paints contain volatile solvents (xylene, toluene, white spirit) that produce irritant vapour. In enclosed cable risers and plant rooms, vapour can accumulate rapidly to hazardous concentrations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Isocyanate content:</strong> Some two-component intumescent coatings contain isocyanates &mdash; respiratory sensitisers with extremely low WELs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Skin contact:</strong> Causes irritation and dermatitis. Some formulations contain epoxy components that are skin sensitisers.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Fire-Stop Compounds and Pillows</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Silicone-based sealants:</strong> Release acetic acid vapour during curing (the vinegar smell) &mdash; eye and respiratory irritant in poorly ventilated spaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Cement-based fire stops:</strong> Generate alkaline dust during mixing and application &mdash; causes skin burns (cement dermatitis) and eye damage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Mineral fibre fire pillows:</strong> Handling and cutting releases mineral fibre dust that irritates the skin, eyes, and respiratory system. Fibres may be glass, rock wool, or ceramic &mdash; ceramic fibres are classified as possibly carcinogenic (Group 2B, IARC).</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Cutting Fire-Resistant Boards</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Calcium silicate boards:</strong> Cutting generates respirable calcium silicate dust. Use wet cutting where possible, on-tool extraction (H-class vacuum), and FFP3 RPE for dry cutting.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Vermiculite boards:</strong> Dust from cutting contains fine vermiculite particles. Older vermiculite products may contain trace amounts of tremolite asbestos &mdash; always check the product data sheet.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">General rule:</strong> Any dust-generating operation on fire-resistant materials requires on-tool extraction or LEV, RPE (minimum FFP3), and thorough cleanup to prevent secondary exposure from settled dust.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Resin Casting and Potting Compounds</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Two-part epoxy systems:</strong> Used for encapsulating
                        cable joints, junction boxes, and outdoor terminations. The same sensitisation hazards
                        as cable jointing compounds apply &mdash; resin (skin sensitiser), hardener (corrosive
                        and sensitiser), exothermic curing reaction producing irritant fumes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Two-part polyurethane systems:</strong> Often used for
                        underground cable joints. Contain isocyanates (respiratory sensitiser) in the hardener
                        component. Mixing generates heat and can produce isocyanate vapour, especially in warm
                        conditions or when mixing large quantities.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Mixing hazards:</strong> Incorrect mixing ratios can cause
                        uncontrolled exothermic reactions. In extreme cases, the compound can overheat sufficiently
                        to produce toxic fumes, smoke, or even ignite. Always follow the manufacturer&rsquo;s
                        mixing instructions precisely.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Controls:</strong> Nitrile gloves (double-gloving recommended),
                        safety glasses, disposable coveralls, LEV or forced ventilation in cable pits and joint bays,
                        RPE if working in confined or poorly ventilated spaces, strict adherence to mixing ratios.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ================================================================ */}
        {/* Section 08: Practical Control Measures — Electrical Trade       */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">08</span>
            Practical Control Measures for Electrical Trade Hazards
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Each electrical trade hazard requires specific control measures tailored to the substance,
                the task, and the working environment. The following reference table and practical guidance
                summarise the key controls for the hazards covered in this section.
              </p>

              {/* Diagram 1: Common Electrical Trade Substances Table */}
              <div className="bg-white/5 border border-violet-500/30 rounded-xl p-4 sm:p-6">
                <p className="text-sm font-medium text-violet-400 mb-4 text-center">
                  Common Electrical Trade Substances &mdash; Hazards and Controls
                </p>
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-white/60 py-2 pr-3 font-medium min-w-[120px]">Substance</th>
                        <th className="text-left text-white/60 py-2 pr-3 font-medium min-w-[140px]">Primary Hazard</th>
                        <th className="text-left text-white/60 py-2 pr-3 font-medium min-w-[100px]">Route</th>
                        <th className="text-left text-white/60 py-2 font-medium min-w-[160px]">Key Control</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">PVC fumes (HCl)</td>
                        <td className="py-2 pr-3"><span className="text-red-400">Respiratory irritant, dioxins</span></td>
                        <td className="py-2 pr-3">Inhalation</td>
                        <td className="py-2">Cold cutting; LEV; ABEK/P3 RPE</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Epoxy resin</td>
                        <td className="py-2 pr-3"><span className="text-red-400">Skin sensitiser</span></td>
                        <td className="py-2 pr-3">Skin</td>
                        <td className="py-2">Nitrile gloves; barrier cream; hygiene</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Colophony flux fume</td>
                        <td className="py-2 pr-3"><span className="text-red-400">Respiratory sensitiser</span></td>
                        <td className="py-2 pr-3">Inhalation</td>
                        <td className="py-2">LEV at source; FFP3 RPE</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Lead solder fume</td>
                        <td className="py-2 pr-3"><span className="text-orange-400">Cumulative poison</span></td>
                        <td className="py-2 pr-3">Inhalation / ingestion</td>
                        <td className="py-2">LEV; lead-free alternative; blood monitoring</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Contact cleaners</td>
                        <td className="py-2 pr-3"><span className="text-orange-400">CNS depressant; flammable</span></td>
                        <td className="py-2 pr-3">Inhalation / skin</td>
                        <td className="py-2">Ventilation; minimum quantity; no ignition sources</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Cable lubricant (petroleum)</td>
                        <td className="py-2 pr-3"><span className="text-orange-400">Skin irritant; aspiration</span></td>
                        <td className="py-2 pr-3">Skin / ingestion</td>
                        <td className="py-2">Gloves; hygiene; water-based alternative</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Transformer oil (PCBs)</td>
                        <td className="py-2 pr-3"><span className="text-red-400">Probable carcinogen</span></td>
                        <td className="py-2 pr-3">Skin / inhalation</td>
                        <td className="py-2">PCB testing; specialist disposal; full PPE</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">SF6 decomposition</td>
                        <td className="py-2 pr-3"><span className="text-red-400">Acutely toxic (HF, SO2)</span></td>
                        <td className="py-2 pr-3">Inhalation / skin</td>
                        <td className="py-2">Supplied-air BA; chemical PPE; trained personnel only</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Sulphuric acid (battery)</td>
                        <td className="py-2 pr-3"><span className="text-red-400">Corrosive; severe burns</span></td>
                        <td className="py-2 pr-3">Skin / eyes / inhalation</td>
                        <td className="py-2">Acid-resistant PPE; neutraliser; eye wash</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Lithium electrolyte</td>
                        <td className="py-2 pr-3"><span className="text-red-400">Flammable; HF production</span></td>
                        <td className="py-2 pr-3">Skin / inhalation</td>
                        <td className="py-2">Specialist handling; fire service for thermal runaway</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Intumescent coatings</td>
                        <td className="py-2 pr-3"><span className="text-orange-400">Solvent vapour; sensitiser</span></td>
                        <td className="py-2 pr-3">Inhalation / skin</td>
                        <td className="py-2">LEV; organic vapour RPE; gloves</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3">Fire-stop dust</td>
                        <td className="py-2 pr-3"><span className="text-orange-400">Respirable dust; mineral fibres</span></td>
                        <td className="py-2 pr-3">Inhalation</td>
                        <td className="py-2">Wet cutting; on-tool extraction; FFP3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Diagram 2: COSHH Hierarchy Applied to Electrical Work */}
              <div className="bg-white/5 border border-violet-500/30 rounded-xl p-6 sm:p-8">
                <p className="text-sm font-medium text-violet-400 mb-6 text-center">
                  COSHH Hierarchy of Control &mdash; Applied to Electrical Trade Hazards
                </p>
                <div className="space-y-3">
                  {[
                    {
                      level: "1",
                      title: "Eliminate",
                      colour: "bg-green-500/20 border-green-500/40 text-green-400",
                      dotColour: "bg-green-400",
                      examples: "Use LSZH cable instead of PVC; use lead-free solder; use water-based lubricants; use non-colophony flux"
                    },
                    {
                      level: "2",
                      title: "Substitute",
                      colour: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
                      dotColour: "bg-emerald-400",
                      examples: "Replace TCE with IPA; use water-soluble flux; use silicone-based sealant instead of solvent-based intumescent"
                    },
                    {
                      level: "3",
                      title: "Engineering Controls",
                      colour: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400",
                      dotColour: "bg-yellow-400",
                      examples: "LEV at soldering stations; on-tool extraction for cutting; forced ventilation in switchrooms; fume extraction arms"
                    },
                    {
                      level: "4",
                      title: "Administrative Controls",
                      colour: "bg-orange-500/20 border-orange-500/40 text-orange-400",
                      dotColour: "bg-orange-400",
                      examples: "COSHH assessments; training; safe systems of work; health surveillance; exposure monitoring; rotate workers to limit exposure"
                    },
                    {
                      level: "5",
                      title: "PPE / RPE",
                      colour: "bg-red-500/20 border-red-500/40 text-red-400",
                      dotColour: "bg-red-400",
                      examples: "FFP3 masks; organic vapour half-face respirators; nitrile gloves; acid-resistant PPE; safety goggles; disposable coveralls"
                    }
                  ].map((item) => (
                    <div key={item.level} className={`p-4 rounded-lg border ${item.colour}`}>
                      <div className="flex items-start gap-3">
                        <span className={`mt-0.5 w-8 h-8 rounded-lg ${item.colour.split(" ")[0]} border ${item.colour.split(" ")[1]} flex items-center justify-center flex-shrink-0 text-sm font-bold`}>
                          {item.level}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                          <p className="text-sm text-white/80">{item.examples}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-white/40">
                    Always start at the top (eliminate) and work downwards. PPE/RPE is the LAST resort, not the first.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Practical On-Site Checklist</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Read the SDS:</strong> Always read the Safety Data Sheet for any chemical product before first use &mdash; it contains hazard information, exposure limits, first aid measures, and storage requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Check the COSHH assessment:</strong> Your employer must provide a written COSHH assessment for every hazardous substance you work with &mdash; if one does not exist, request it before proceeding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Use the right gloves:</strong> Nitrile for epoxy/resin/solvents, acid-resistant for battery work, disposable and changed frequently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Ventilate before you start:</strong> Open doors, set up fans, or position extraction equipment BEFORE beginning work with chemicals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Know the emergency procedures:</strong> Location of eye wash stations, first aid kits, spill kits, and emergency showers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Wash before breaks:</strong> Wash hands thoroughly before eating, drinking, or smoking to prevent ingestion of hazardous substances transferred from contaminated hands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Report symptoms early:</strong> Persistent cough, skin rash, breathing difficulty, or headaches related to work may indicate early occupational disease &mdash; report to your supervisor and GP immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Store chemicals correctly:</strong> In original containers, lids on, in ventilated storage, away from heat sources, and separated by hazard class (acids away from solvents, oxidisers away from flammables)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Remember:</strong> Many electrical trade substances cause
                  <strong> irreversible health damage</strong> through sensitisation (epoxy, colophony, isocyanates).
                  Once sensitised, you will react to even trace exposures for the rest of your career. Prevention
                  through proper controls is essential &mdash; there is no cure for occupational sensitisation.
                  Take COSHH controls seriously from day one of your career, not after symptoms develop.
                </p>
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
          title="Section 2 Knowledge Check"
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
            <Link to="../coshh-awareness-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Construction Hazards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-3-section-3">
              Next: Dust &amp; Fume Control
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
