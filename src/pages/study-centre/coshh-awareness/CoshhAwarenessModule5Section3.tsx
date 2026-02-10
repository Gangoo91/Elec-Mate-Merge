import {
  ArrowLeft,
  Siren,
  CheckCircle,
  AlertTriangle,
  Droplets,
  Wind,
  Flame,
  ShieldAlert,
  FileWarning,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "spill-response-first-step",
    question:
      "You discover a small chemical spill in the workplace. What is the FIRST thing you should do?",
    options: [
      "Immediately mop it up with paper towels to prevent anyone slipping",
      "Identify the substance from the container label or SDS, assess the hazard, and don personal protective equipment before approaching",
      "Evacuate the entire building and call the fire brigade",
      "Pour water over it to dilute the chemical",
    ],
    correctIndex: 1,
    explanation:
      "Before approaching any chemical spill, you must first identify the substance and assess the hazard. Check the container label or Safety Data Sheet (SDS) to determine what you are dealing with and what PPE is required. Only then should you don appropriate PPE and begin containment. Approaching an unknown spill without protection could expose you to serious harm. Some chemicals react dangerously with water, so dilution may not be appropriate.",
  },
  {
    id: "eye-contact-irrigation-time",
    question:
      "A colleague gets a chemical splash in their eyes. For how long should you irrigate the eyes with clean water or saline?",
    options: [
      "2 to 3 minutes until the stinging stops",
      "5 minutes, then apply an eye patch",
      "15 to 20 minutes continuously, holding the eyelids open",
      "30 seconds, then transport to hospital immediately",
    ],
    correctIndex: 2,
    explanation:
      "Eyes contaminated with chemicals must be irrigated continuously for 15 to 20 minutes. The eyelids should be held open to ensure the water reaches all surfaces of the eye. Irrigation should begin immediately — every second of delay allows the chemical to cause further damage. If only one eye is affected, tilt the head so the contaminated eye is lower, preventing the chemical from washing into the unaffected eye. Continue irrigating during transport to hospital if possible.",
  },
  {
    id: "riddor-reporting-trigger",
    question:
      "Under RIDDOR, which of the following chemical exposure incidents MUST be reported to the HSE?",
    options: [
      "Any incident where a worker notices a chemical smell in the workplace",
      "Only incidents where the worker is hospitalised for more than 7 days",
      "An acute illness requiring medical treatment that results from exposure to a hazardous substance, or an occupational disease diagnosed by a doctor",
      "Only incidents involving substances classified as carcinogenic",
    ],
    correctIndex: 2,
    explanation:
      "RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires reporting of: acute illness requiring medical treatment caused by occupational exposure to a hazardous substance; occupational diseases prescribed by a doctor (such as occupational asthma or dermatitis); and dangerous occurrences such as the uncontrolled release of a hazardous substance. The duty to report falls on the employer, self-employed person, or person in control of the premises.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "What should I do if I am unsure what chemical has been spilled?",
    answer:
      "If you cannot identify the spilled substance, treat it as a high-hazard material. Do not approach the spill without appropriate PPE. Evacuate the immediate area, prevent others from entering, and contact your supervisor or the site emergency coordinator. Check nearby containers, labels, and storage records. If the substance remains unidentified, call the emergency services — they have specialist equipment and CHEMDATA access to identify unknown chemicals. Never attempt to clean up an unidentified substance, as it may be corrosive, flammable, toxic, or reactive with water.",
  },
  {
    question:
      "How often should spill kits be inspected and what should I check?",
    answer:
      "Spill kits should be inspected at least monthly, or after every use. Check that the kit is in its designated location, clearly signed, and easily accessible (not blocked by equipment or materials). Verify that all contents are present and in good condition: absorbent materials (pads, granules, or pillows), PPE (gloves, goggles, overalls), containment booms or socks, hazardous waste bags and labels, and the instruction card. Replace any used or damaged items immediately. Record the inspection date and findings. Some workplaces include spill kit checks in their weekly housekeeping inspections.",
  },
  {
    question:
      "What is the difference between RIDDOR and COSHH reporting requirements?",
    answer:
      "COSHH requires employers to keep records of risk assessments, exposure monitoring results, health surveillance records, and training records — these are ongoing internal records. RIDDOR is a separate legal duty to report specific incidents to the HSE: acute illness requiring medical treatment from hazardous substance exposure, prescribed occupational diseases diagnosed by a doctor, and dangerous occurrences such as uncontrolled releases of hazardous substances. Both sets of records serve different purposes — COSHH records demonstrate ongoing compliance, while RIDDOR reports alert the regulator to specific incidents that may require investigation.",
  },
  {
    question:
      "Can I use the same spill kit for acid and alkali spills?",
    answer:
      "General-purpose spill kits using inert absorbents (such as polypropylene pads or vermiculite) can absorb both acid and alkali spills safely, as the absorbent material does not react with either type of chemical. However, some workplaces use specialist spill kits that contain neutralising agents — acid spill kits contain alkaline neutralisers, and alkali spill kits contain acidic neutralisers. These specialist kits must NOT be mixed up, as using an acid neutraliser on an acid spill (or vice versa) would be ineffective. Always check the spill kit label and contents card before use. In doubt, use a general-purpose inert absorbent.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which COSHH Regulation specifically requires employers to have arrangements for dealing with accidents, incidents, and emergencies involving hazardous substances?",
    options: [
      "Regulation 7 — Control measures",
      "Regulation 9 — Monitoring exposure",
      "Regulation 11 — Health surveillance",
      "Regulation 13 — Arrangements for accidents, incidents, and emergencies",
    ],
    correctAnswer: 3,
    explanation:
      "Regulation 13 of the Control of Substances Hazardous to Health Regulations 2002 requires employers to prepare and implement procedures for dealing with accidents, incidents, and emergencies involving hazardous substances. This includes identifying foreseeable emergencies, establishing emergency procedures, providing appropriate first aid facilities and equipment, and ensuring that safety drills are practised at suitable intervals.",
  },
  {
    id: 2,
    question:
      "When dealing with a large chemical spill that is beyond the capability of site spill kits, what is the correct sequence of actions?",
    options: [
      "Clean up what you can, then call for help if needed",
      "Evacuate the area, prevent spread if safe to do so, call the emergency services, and arrange specialist clean-up",
      "Ventilate the area by opening all windows and doors, then mop up the spill",
      "Cover the spill with sand and leave it for the end of shift",
    ],
    correctAnswer: 1,
    explanation:
      "For large spills that exceed the capacity of on-site resources, the priority is: (1) evacuate personnel from the immediate area; (2) prevent further spread if it is safe to do so (e.g. closing valves, placing containment booms); (3) call the emergency services if the spill poses a risk to health, the environment, or property; and (4) arrange specialist clean-up through a licensed hazardous waste contractor. Attempting to clean up a large spill without specialist equipment and training can lead to further contamination and exposure.",
  },
  {
    id: 3,
    question:
      "What type of spill kit should be used for a mercury spill (e.g. from a broken thermometer)?",
    options: [
      "A general-purpose absorbent spill kit",
      "A solvent spill kit with polypropylene pads",
      "A specialist mercury spill kit containing mercury-absorbing powder (such as sulphur or zinc powder)",
      "An acid spill kit with neutralising granules",
    ],
    correctAnswer: 2,
    explanation:
      "Mercury spills require a specialist mercury spill kit. Mercury is a liquid metal that forms tiny droplets that are difficult to see and collect. Standard absorbents do not work on mercury. A mercury spill kit typically contains mercury-absorbing powder (sulphur or zinc amalgamation powder), a small brush and dustpan, aspirator syringe for collecting droplets, sealable container for waste, and PPE including nitrile gloves. Mercury vapour is toxic, so the area must be well ventilated during clean-up. Large mercury spills must be handled by specialist contractors.",
  },
  {
    id: 4,
    question:
      "A worker has inhaled toxic fumes and is coughing and feeling dizzy. What is the correct first aid response?",
    options: [
      "Give them a glass of water and tell them to sit down in the contaminated area",
      "Remove them from the contaminated area to fresh air, call 999 for significant exposures, and administer oxygen if available and trained to do so",
      "Make them breathe into a paper bag to regulate their breathing",
      "Apply a dust mask and send them back to work once they stop coughing",
    ],
    correctAnswer: 1,
    explanation:
      "For inhalation of toxic fumes: (1) remove the casualty from the contaminated atmosphere to fresh air — ensure your own safety first and do not enter the area without appropriate RPE if fumes are still present; (2) call 999 for any significant exposure; (3) administer oxygen if available and you are trained; (4) keep the casualty at rest in a comfortable position; (5) if the casualty stops breathing, begin CPR. Never re-enter a contaminated area without appropriate respiratory protection.",
  },
  {
    id: 5,
    question:
      "After a chemical exposure incident at work, an employee swallows a small quantity of a cleaning chemical. What should you do?",
    options: [
      "Induce vomiting immediately to remove the chemical from the stomach",
      "Give them milk to neutralise the chemical",
      "Do NOT induce vomiting (unless the SDS specifically advises it), give sips of water if conscious, and call 999",
      "Make them eat bread to absorb the chemical, then continue working",
    ],
    correctAnswer: 2,
    explanation:
      "For ingestion of hazardous substances: do NOT induce vomiting unless the Safety Data Sheet specifically states otherwise. Many chemicals cause burns — vomiting would cause a second burn to the throat and mouth as the chemical comes back up. Corrosive substances can also damage the lungs if vomited and inhaled. Give sips of water or milk if the casualty is conscious and able to swallow. Call 999 immediately. Take the container or SDS to hospital so medical staff know exactly what was ingested.",
  },
  {
    id: 6,
    question:
      "During a fire involving hazardous chemicals, why might water be an inappropriate extinguishing agent?",
    options: [
      "Water is always appropriate for chemical fires",
      "Water reacts with some chemicals (e.g. alkali metals, metal fires), can spread burning oil, and may generate additional toxic fumes or explosive hydrogen gas",
      "Water is too expensive to use on chemical fires",
      "Water can only be used on paper fires",
    ],
    correctAnswer: 1,
    explanation:
      "Water is inappropriate or dangerous for several types of chemical fire: (1) alkali metals (sodium, potassium, lithium) react violently with water, generating explosive hydrogen gas and intense heat; (2) metal fires (magnesium, aluminium powder) — water can cause steam explosions and intensify the fire; (3) oil and solvent fires — water spreads the burning liquid and can cause dangerous splattering; (4) some chemicals generate toxic fumes when they contact water. The SDS Section 5 specifies the correct extinguishing media for each substance. DSEAR assessments must also consider fire and explosion risks from hazardous substances.",
  },
  {
    id: 7,
    question:
      "What is the primary purpose of investigating a chemical exposure incident after it has been dealt with?",
    options: [
      "To assign blame to the individual who caused the incident",
      "To identify the root cause, implement corrective actions, and update the COSHH assessment to prevent recurrence",
      "To complete the paperwork required by the insurance company",
      "To determine whether the worker needs to be disciplined",
    ],
    correctAnswer: 1,
    explanation:
      "The primary purpose of incident investigation is to identify the root cause of the incident and implement corrective actions to prevent it from happening again. This includes: reviewing and updating the COSHH risk assessment; checking whether control measures were adequate and properly implemented; identifying any training gaps; updating emergency procedures if necessary; and sharing lessons learnt with the workforce. Investigation should focus on systems and processes, not on blaming individuals. A blame culture discourages reporting and prevents learning.",
  },
  {
    id: 8,
    question:
      "How often should emergency eye wash stations be checked, and what is the minimum flushing time for chemical eye contamination?",
    options: [
      "Checked annually; flush for 5 minutes",
      "Checked weekly; flush for 15 to 20 minutes",
      "Checked monthly; flush for 2 minutes",
      "Checked only before use; flush for 30 seconds",
    ],
    correctAnswer: 1,
    explanation:
      "Emergency eye wash stations should be checked weekly to ensure they are accessible, clean, and functioning correctly. Plumbed-in stations should be flushed weekly to prevent bacterial growth in stagnant water. Bottled eye wash solutions should be checked for expiry dates and seal integrity. When used for chemical eye contamination, the eyes must be irrigated continuously for 15 to 20 minutes. The eyelids should be held open throughout. Some workplaces test eye wash stations daily as part of their morning safety checks.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function CoshhAwarenessModule5Section3() {
  useSEO({
    title:
      "Emergency Procedures | COSHH Awareness Module 5 Section 3",
    description:
      "COSHH Regulation 13 emergency procedures: chemical spill response, gas and vapour release, first aid for chemical exposure, fire involving hazardous substances, RIDDOR reporting, incident investigation, and emergency equipment requirements.",
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
            <Link to="../coshh-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30 mb-4">
            <Siren className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Procedures
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            COSHH Regulation 13 requirements for dealing with accidents,
            incidents, and emergencies involving hazardous substances &mdash;
            spill response, first aid, fire procedures, RIDDOR reporting, and
            incident investigation
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
                <strong>Reg 13:</strong> Employers must plan for foreseeable
                chemical emergencies
              </li>
              <li>
                <strong>Spills:</strong> Identify &rarr; PPE &rarr; contain
                &rarr; absorb &rarr; dispose as hazardous waste
              </li>
              <li>
                <strong>First aid:</strong> Skin/eyes &mdash; flush 15&ndash;20
                min; ingestion &mdash; do NOT induce vomiting
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Spill kits:</strong> Right type, right location, staff
                trained to use them
              </li>
              <li>
                <strong>Eye wash:</strong> Check weekly, flush for 15&ndash;20
                min if contaminated
              </li>
              <li>
                <strong>RIDDOR:</strong> Report acute illness, occupational
                disease, dangerous occurrences
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
              "Explain the requirements of COSHH Regulation 13 for emergency planning",
              "Describe the correct response procedures for small and large chemical spills",
              "Identify the contents and types of spill kits for different chemicals",
              "Demonstrate the correct first aid response for skin, eye, inhalation, and ingestion exposure",
              "Explain why water must not be used on certain types of chemical fire",
              "State when a chemical exposure incident must be reported under RIDDOR",
              "Describe the process of incident investigation and root cause analysis",
              "Identify the location, maintenance, and inspection requirements for emergency equipment",
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

        {/* ─── 01 COSHH Regulation 13 — Emergency Planning ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            COSHH Regulation 13 &mdash; Emergency Planning
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 13</strong> of the Control of Substances
                Hazardous to Health Regulations 2002 (COSHH) requires every
                employer to ensure that procedures are in place for dealing with{" "}
                <strong>
                  accidents, incidents, and emergencies involving hazardous
                  substances
                </strong>
                . This is not optional &mdash; it is a legal duty that applies
                to all workplaces where hazardous substances are used, stored,
                or generated.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  What Regulation 13 Requires
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Identify foreseeable emergencies:</strong> consider
                      what could go wrong &mdash; spills, leaks, equipment
                      failure, fires, uncontrolled releases of gas or vapour,
                      and accidental mixing of incompatible chemicals
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Write emergency procedures:</strong> clear,
                      step-by-step instructions for each type of foreseeable
                      emergency, including who does what, what equipment is
                      available, and when to escalate
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Communicate procedures to workers:</strong> all
                      employees who may be affected must know the procedures,
                      the location of emergency equipment, and the names of
                      trained responders
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Provide appropriate equipment:</strong> spill
                      kits, eye wash stations, safety showers, first aid
                      supplies, and personal protective equipment must be
                      available and maintained
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Practise emergency drills:</strong> safety drills
                      must be carried out at suitable intervals so that workers
                      know what to do when an emergency occurs
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    The SDS Is Your Starting Point
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Every emergency procedure should be informed by the{" "}
                  <strong className="text-white">
                    Safety Data Sheet (SDS)
                  </strong>{" "}
                  for each hazardous substance in the workplace.{" "}
                  <strong className="text-white">Section 4</strong> of the SDS
                  covers first aid measures,{" "}
                  <strong className="text-white">Section 5</strong> covers
                  fire-fighting measures, and{" "}
                  <strong className="text-white">Section 6</strong> covers
                  accidental release measures. These sections provide
                  substance-specific guidance that must be incorporated into
                  your site emergency procedures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 02 Chemical Spill Response ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            Chemical Spill Response
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The response to a chemical spill depends on the{" "}
                <strong>substance involved</strong>, the{" "}
                <strong>quantity spilled</strong>, the{" "}
                <strong>location</strong>, and the{" "}
                <strong>risk to people and the environment</strong>. All spills
                must be taken seriously &mdash; even a small spill of a highly
                toxic or corrosive substance can cause serious harm.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Small Spills
                    </p>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Identify the substance — check the label and SDS",
                      "Don appropriate PPE (gloves, goggles, apron as needed)",
                      "Contain the spill — prevent it spreading to drains, watercourses, or other areas",
                      "Absorb using the correct absorbent from the spill kit",
                      "Clean the area thoroughly",
                      "Dispose of all contaminated materials as hazardous waste",
                      "Report the spill to your supervisor",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-white/80">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Large Spills
                    </p>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Evacuate the immediate area — alert all personnel",
                      "Prevent spread if safe to do so (close valves, place booms)",
                      "Call the emergency services if the spill poses a risk to health or the environment",
                      "Do NOT attempt to clean up — await specialist contractors",
                      "Account for all personnel at the assembly point",
                      "Provide the emergency services with the SDS and details of the substance",
                      "Do not allow re-entry until declared safe",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-white/80">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spill Kit Types */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Spill Kit Types
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Different chemicals require different spill kit contents.
                  Using the wrong kit can be ineffective or dangerous.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-violet-500/5 border border-violet-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300 mb-1">
                      General Purpose
                    </p>
                    <p className="text-xs text-white/70">
                      Polypropylene pads and granules. Absorbs most liquids
                      including oils, solvents, and water-based chemicals. The
                      most common type found in workplaces.
                    </p>
                  </div>
                  <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-amber-300 mb-1">
                      Acid Spill Kit
                    </p>
                    <p className="text-xs text-white/70">
                      Contains alkaline neutralising granules (e.g. sodium
                      bicarbonate) and acid-resistant PPE. Changes colour when
                      neutralisation is complete. For battery acid, etching
                      solutions, and mineral acids.
                    </p>
                  </div>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-300 mb-1">
                      Alkali Spill Kit
                    </p>
                    <p className="text-xs text-white/70">
                      Contains acidic neutralising granules (e.g. citric acid)
                      and alkali-resistant PPE. For caustic soda, bleach, cement
                      washings, and alkaline cleaning agents.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-300 mb-1">
                      Mercury Spill Kit
                    </p>
                    <p className="text-xs text-white/70">
                      Contains mercury-absorbing powder (sulphur or zinc
                      amalgamation powder), aspirator syringe, small brush, and
                      sealable container. For broken thermometers or mercury
                      switches. Standard absorbents do not work on mercury.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    Spill Kit Location &amp; Training
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Spill kits must be{" "}
                  <strong className="text-white">
                    located close to where hazardous substances are used and
                    stored
                  </strong>
                  , clearly signed, and not obstructed. All workers who may need
                  to respond to a spill must be{" "}
                  <strong className="text-white">
                    trained in the correct use of the kit
                  </strong>{" "}
                  for the chemicals in their area. Training should include
                  hands-on practice, not just a briefing. Kits must be inspected
                  regularly and restocked after every use.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── Spill Response Flowchart Diagram ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-violet-400" />
            Spill Response Flowchart
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            The diagram below shows the decision-making process when you
            discover a chemical spill in the workplace.
          </p>

          <div className="space-y-0">
            {/* Step 1 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 border-2 border-violet-500/50 flex items-center justify-center text-violet-400 text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div className="w-0.5 h-8 bg-violet-500/40"></div>
              </div>
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 flex-1 mb-2">
                <p className="text-violet-400 font-medium text-sm">
                  Discover the spill
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Stop. Do not walk through the spill or touch the substance.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 border-2 border-violet-500/50 flex items-center justify-center text-violet-400 text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div className="w-0.5 h-8 bg-violet-500/40"></div>
              </div>
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 flex-1 mb-2">
                <p className="text-violet-400 font-medium text-sm">
                  Identify the substance
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Check the container label and SDS. Determine the hazard
                  classification.
                </p>
              </div>
            </div>

            {/* Step 3 — Decision point */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div className="w-0.5 h-8 bg-amber-500/40"></div>
              </div>
              <div className="flex-1 mb-2">
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-3">
                  <p className="text-amber-400 font-medium text-sm">
                    Assess the size and risk
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Can you deal with it safely using your spill kit and
                    training?
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 ml-4 sm:ml-6">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-2.5">
                    <p className="text-green-300 text-xs font-medium">
                      YES &mdash; Small spill
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      Don PPE &rarr; contain &rarr; absorb &rarr; clean &rarr;
                      dispose as hazardous waste
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-2.5">
                    <p className="text-red-300 text-xs font-medium">
                      NO &mdash; Large spill
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      Evacuate area &rarr; call emergency services &rarr;
                      specialist clean-up
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3 sm:gap-4 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 border-2 border-violet-500/50 flex items-center justify-center text-violet-400 text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div className="w-0.5 h-8 bg-violet-500/40"></div>
              </div>
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 flex-1 mb-2">
                <p className="text-violet-400 font-medium text-sm">
                  Report the incident
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Notify your supervisor. Record the spill in the incident log.
                  Determine if RIDDOR reporting is required.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center text-blue-400 text-sm font-bold flex-shrink-0">
                  5
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex-1">
                <p className="text-blue-400 font-medium text-sm">
                  Investigate and learn
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Identify root cause &rarr; implement corrective actions
                  &rarr; update COSHH assessment &rarr; share lessons learnt
                </p>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-4 italic">
            Spill response decision flowchart &mdash; from discovery to
            investigation
          </p>
        </section>

        {/* ─── 03 Gas and Vapour Release ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            Gas &amp; Vapour Release
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An uncontrolled release of toxic gas or vapour is one of the
                most dangerous chemical emergencies. Gases and vapours can
                spread rapidly, are often invisible, and may be odourless at
                dangerous concentrations. The response must be swift and
                well-rehearsed.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Evacuation Procedures
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    "Raise the alarm immediately — activate the nearest alarm point or shout a clear warning",
                    "Move upwind and uphill from the release point — gases are often heavier than air and collect in low-lying areas",
                    "Evacuate to the designated assembly point — do NOT use lifts",
                    "Account for all personnel — use the roll call or signing-in system",
                    "Do NOT re-enter the area until declared safe by the emergency controller or emergency services",
                    "Provide information to the emergency services: substance name, SDS, estimated quantity, location of the source",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-violet-400 font-medium mb-2 text-sm">
                    Ventilation
                  </h3>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Natural:</strong> open
                        doors and windows (if safe to approach) to create
                        cross-ventilation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Forced:</strong>{" "}
                        mechanical ventilation fans to actively remove
                        contaminated air &mdash; ensure extracted air is
                        directed away from people
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Caution:</strong> if the
                        gas is flammable, do NOT use electrical switches or
                        equipment that could create a spark
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-violet-400 font-medium mb-2 text-sm">
                    Safe Re-Entry Criteria
                  </h3>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Atmospheric monitoring confirms gas concentration is{" "}
                        <strong className="text-white">below the WEL</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Oxygen levels are within the{" "}
                        <strong className="text-white">
                          safe range (19.5%&ndash;23.5%)
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The{" "}
                        <strong className="text-white">
                          source of the release has been identified and
                          controlled
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        A{" "}
                        <strong className="text-white">
                          competent person has authorised re-entry
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Search className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    Gas Detection Equipment
                  </h3>
                </div>
                <div className="text-white/80 text-sm space-y-2">
                  <p>
                    <strong className="text-white">
                      Multi-gas detectors
                    </strong>{" "}
                    can simultaneously monitor for oxygen levels, flammable
                    gases (LEL), and specific toxic gases (e.g. CO, H2S, SO2).
                    They provide real-time readings and alarms when safe limits
                    are exceeded.
                  </p>
                  <p>
                    <strong className="text-white">Bump testing</strong> must be
                    carried out before each use &mdash; a short burst of test
                    gas is applied to verify the sensors respond correctly.{" "}
                    <strong className="text-white">Calibration</strong> must be
                    performed at the intervals specified by the manufacturer
                    (typically every 3 to 6 months) using certified calibration
                    gas. A detector that has not been bump-tested or calibrated
                    cannot be relied upon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 First Aid for Chemical Exposure ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">04</span>
            First Aid for Chemical Exposure
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The correct first aid response depends on the{" "}
                <strong>route of exposure</strong> &mdash; skin contact, eye
                contact, inhalation, or ingestion. In every case, the Safety
                Data Sheet (SDS) Section 4 provides substance-specific first aid
                guidance that takes priority over general procedures.
              </p>

              {/* Skin Contact */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Skin Contact
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Remove contaminated clothing
                      </strong>{" "}
                      immediately &mdash; cut it off if necessary. Protect
                      yourself from contamination (wear gloves).
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Flush with running water for 15&ndash;20 minutes
                      </strong>
                      . Use a safety shower if available. Ensure water runs off
                      the body and does not contaminate unaffected areas.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">Specific measures:</strong>{" "}
                      for hydrofluoric acid (HF) burns, apply{" "}
                      <strong className="text-white">
                        calcium gluconate gel
                      </strong>{" "}
                      after flushing &mdash; HF penetrates deeply and causes
                      systemic fluoride poisoning. For cement burns, wash
                      thoroughly and remove all contaminated clothing including
                      boots.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-white/80">
                      Seek medical attention for all chemical skin burns. Take
                      the SDS with you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Eye Contact */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Eye Contact
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Irrigate immediately
                      </strong>{" "}
                      with clean water or saline for{" "}
                      <strong className="text-white">
                        15&ndash;20 minutes continuously
                      </strong>
                      . Use the nearest eye wash station.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Hold the eyelids open
                      </strong>{" "}
                      throughout irrigation to ensure the water reaches all
                      surfaces of the eye. The casualty will instinctively try
                      to close their eyes &mdash; you may need to assist.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-white/80">
                      If only one eye is affected,{" "}
                      <strong className="text-white">
                        tilt the head so the contaminated eye is lower
                      </strong>{" "}
                      to prevent the chemical from washing into the unaffected
                      eye.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Continue irrigating during transport to hospital
                      </strong>{" "}
                      if possible. Use bottles of saline or clean water. Every
                      second of delay increases the risk of permanent damage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Inhalation */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Inhalation
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Remove the casualty from the contaminated area
                      </strong>{" "}
                      to fresh air. Ensure your own safety first &mdash; do not
                      enter without appropriate RPE if fumes are still present.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-white/80">
                      Place the casualty in a{" "}
                      <strong className="text-white">
                        comfortable resting position
                      </strong>
                      . If conscious and breathing normally, sit them upright to
                      aid breathing.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Administer oxygen if available
                      </strong>{" "}
                      and you are trained to do so. High-flow oxygen at 15
                      litres per minute via a non-rebreather mask.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Call 999 for any significant exposure
                      </strong>
                      . Monitor breathing continuously. If the casualty stops
                      breathing, begin CPR immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ingestion */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h3 className="text-red-400 font-medium">Ingestion</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-white/80">
                      <strong className="text-red-300">
                        Do NOT induce vomiting
                      </strong>{" "}
                      unless the SDS specifically advises it. Corrosive
                      chemicals will burn the throat and mouth a second time if
                      vomited. Vomited chemicals may also be inhaled into the
                      lungs, causing additional damage.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-white/80">
                      If the casualty is conscious and able to swallow,{" "}
                      <strong className="text-white">
                        give sips of water or milk
                      </strong>{" "}
                      to dilute the chemical. Do not give large quantities.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-white/80">
                      <strong className="text-white">Call 999 immediately</strong>.
                      Take the container or SDS to hospital so medical staff
                      know exactly what was ingested.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-white/80">
                      If the casualty is unconscious, place in the{" "}
                      <strong className="text-white">recovery position</strong>{" "}
                      and monitor breathing. Do not give anything by mouth to an
                      unconscious person.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chemical Burns */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Chemical Burns
                </h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cool under running water
                      </strong>{" "}
                      for at least 20 minutes (longer for alkali burns, which
                      penetrate deeper than acid burns)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do not remove clothing that has adhered to the burn
                      </strong>{" "}
                      &mdash; cut around it and leave the stuck portion in place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cover with cling film
                      </strong>{" "}
                      applied lengthways (not wrapped around a limb) to protect
                      the burn and reduce pain
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Never attempt to neutralise
                      </strong>{" "}
                      a chemical on the skin with another chemical &mdash; this
                      can cause an exothermic reaction and worsen the burn
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── First Aid by Exposure Route Diagram ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-violet-400" />
            First Aid by Exposure Route
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            Quick-reference summary of first aid actions for each route of
            chemical exposure.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Skin */}
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                  <Droplets className="h-4 w-4 text-violet-400" />
                </div>
                <p className="text-sm font-semibold text-violet-400">
                  Skin Contact
                </p>
              </div>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Remove contaminated clothing</li>
                <li>
                  Flush with water{" "}
                  <strong className="text-white">15&ndash;20 min</strong>
                </li>
                <li>HF: calcium gluconate gel after flushing</li>
                <li>Seek medical attention</li>
              </ul>
            </div>

            {/* Eyes */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <Droplets className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-sm font-semibold text-blue-400">
                  Eye Contact
                </p>
              </div>
              <ul className="text-xs text-white/80 space-y-1">
                <li>
                  Irrigate immediately{" "}
                  <strong className="text-white">15&ndash;20 min</strong>
                </li>
                <li>Hold eyelids open throughout</li>
                <li>Tilt head — contaminated eye lower</li>
                <li>Continue irrigation en route to hospital</li>
              </ul>
            </div>

            {/* Inhalation */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Wind className="h-4 w-4 text-amber-400" />
                </div>
                <p className="text-sm font-semibold text-amber-400">
                  Inhalation
                </p>
              </div>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Remove to fresh air (protect yourself first)</li>
                <li>Sit upright if conscious</li>
                <li>Oxygen if available and trained</li>
                <li>
                  <strong className="text-white">Call 999</strong> for
                  significant exposures
                </li>
              </ul>
            </div>

            {/* Ingestion */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </div>
                <p className="text-sm font-semibold text-red-400">Ingestion</p>
              </div>
              <ul className="text-xs text-white/80 space-y-1">
                <li>
                  <strong className="text-red-300">
                    Do NOT induce vomiting
                  </strong>
                </li>
                <li>Sips of water if conscious</li>
                <li>
                  <strong className="text-white">Call 999</strong> immediately
                </li>
                <li>Take SDS or container to hospital</li>
              </ul>
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-4 italic">
            First aid quick-reference by exposure route &mdash; always check the
            SDS Section 4 for substance-specific guidance
          </p>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 Fire Involving Hazardous Substances ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">05</span>
            Fire Involving Hazardous Substances
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fires involving hazardous substances present additional risks
                beyond a standard fire. The{" "}
                <strong>
                  choice of extinguishing agent is critical
                </strong>{" "}
                &mdash; using the wrong type can make the fire worse, cause
                explosions, or generate highly toxic fumes. The SDS Section 5
                specifies the correct extinguishing media for each substance.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Extinguishant Requirements
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-red-300">
                        Never water on metal fires:
                      </strong>{" "}
                      alkali metals (sodium, potassium, lithium) react violently
                      with water, producing explosive hydrogen gas and intense
                      heat. Use dry powder (Class D) extinguishers or dry sand.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-red-300">
                        Never water on oil fires:
                      </strong>{" "}
                      water causes burning oil to splatter violently, spreading
                      the fire. Use foam, dry powder, or CO2 extinguishers.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-red-300">
                        Never water on electrical fires:
                      </strong>{" "}
                      water conducts electricity, creating a risk of
                      electrocution. Isolate the supply first. Use CO2 or dry
                      powder extinguishers.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-amber-300">
                        Toxic fume generation:
                      </strong>{" "}
                      many hazardous substances produce{" "}
                      <strong className="text-white">
                        highly toxic fumes when they burn
                      </strong>
                      . Plastics can release hydrogen cyanide, PVC produces
                      hydrogen chloride gas, and isocyanates generate toxic
                      vapours. Treat all smoke from chemical fires as toxic.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    DSEAR Considerations
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  The Dangerous Substances and Explosive Atmospheres Regulations
                  2002 (DSEAR) require employers to assess the risk of fire and
                  explosion from dangerous substances and take measures to
                  eliminate or reduce those risks. Where hazardous substances
                  create a risk of explosive atmospheres (e.g. flammable
                  solvents, gases, or dusts), the workplace must be classified
                  into{" "}
                  <strong className="text-white">
                    hazardous area zones
                  </strong>
                  , and only{" "}
                  <strong className="text-white">
                    ATEX-rated equipment
                  </strong>{" "}
                  may be used in those zones. Emergency procedures must account
                  for DSEAR risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 RIDDOR Reporting ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">06</span>
            RIDDOR Reporting
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Reporting of Injuries, Diseases and Dangerous Occurrences
                Regulations 2013 (<strong>RIDDOR</strong>) require certain
                chemical exposure incidents to be reported to the HSE. Failure
                to report is a criminal offence. The{" "}
                <strong>responsible person</strong> (usually the employer,
                self-employed person, or person in control of the premises) must
                make the report.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  When You Must Report Under RIDDOR
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Acute illness requiring medical treatment:</strong>{" "}
                      any acute illness that requires medical treatment and
                      results from occupational exposure to a hazardous
                      substance &mdash; for example, chemical burns requiring
                      hospital treatment, acute respiratory distress from fume
                      inhalation, or acute poisoning
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Occupational disease diagnosed by a doctor:</strong>{" "}
                      prescribed diseases linked to hazardous substance exposure
                      include occupational asthma (from isocyanates,
                      formaldehyde, etc.), occupational dermatitis (from
                      repeated chemical contact), and chronic beryllium disease
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Dangerous occurrence:</strong> the uncontrolled or
                      accidental release of a hazardous substance that could
                      have resulted in exposure causing acute ill health &mdash;
                      this includes large spills, gas leaks, and failure of
                      containment systems, even if no one was actually harmed
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <FileWarning className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    How to Report
                  </h3>
                </div>
                <div className="text-white/80 text-sm space-y-2">
                  <p>
                    Reports are made online via the{" "}
                    <strong className="text-white">
                      HSE RIDDOR reporting website
                    </strong>
                    . Fatal and specified injuries must be reported by the{" "}
                    <strong className="text-white">
                      quickest practicable means
                    </strong>{" "}
                    (usually telephone to the HSE Incident Contact Centre on
                    0345 300 9923), followed by a written report within 10 days.
                    Other reportable events must be reported within{" "}
                    <strong className="text-white">10 working days</strong> for
                    accidents, or{" "}
                    <strong className="text-white">15 working days</strong> for
                    over-7-day incapacitation injuries. Occupational disease
                    reports must be made as soon as the diagnosis is received.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Investigation and Learning ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">07</span>
            Investigation &amp; Learning
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every chemical exposure incident &mdash; whether it resulted in
                harm or was a near miss &mdash; must be{" "}
                <strong>investigated</strong> to identify the root cause and
                prevent recurrence. The purpose of investigation is{" "}
                <strong>learning, not blame</strong>. A blame culture
                discourages reporting and prevents organisations from learning
                from incidents.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Root Cause Analysis
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>What happened?</strong> &mdash; Establish the
                      facts: what substance, what quantity, where, when, who was
                      involved, and what injuries or exposures occurred
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>How did it happen?</strong> &mdash; Trace the
                      sequence of events leading to the incident. Identify the
                      immediate cause (e.g. container dropped, valve left open,
                      incompatible chemicals stored together)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Why did it happen?</strong> &mdash; Dig deeper to
                      find the root cause. Was there a failure in the risk
                      assessment? Were control measures inadequate or not
                      followed? Was training insufficient? Was the COSHH
                      assessment out of date?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>What must change?</strong> &mdash; Identify and
                      implement corrective actions: update the COSHH assessment,
                      improve control measures, provide additional training,
                      change procedures, or improve equipment
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  After the Investigation
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Update the COSHH assessment</strong> to reflect
                      what was learnt from the incident. If the risk assessment
                      did not anticipate the scenario, it needs revising.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Implement corrective actions</strong> with clear
                      ownership and deadlines. Track completion.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Share lessons learnt</strong> with the workforce
                      through toolbox talks, safety briefings, or notice board
                      updates. Workers who understand why an incident occurred
                      are better equipped to prevent it recurring.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Review emergency procedures</strong> &mdash; did
                      the emergency response work effectively? Were there delays
                      or gaps? Update procedures accordingly.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 08 Emergency Equipment ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">08</span>
            Emergency Equipment
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emergency equipment must be{" "}
                <strong>
                  readily available, clearly signed, regularly inspected, and
                  properly maintained
                </strong>
                . Equipment that is not working when needed is worse than no
                equipment at all, because workers may waste critical time
                attempting to use it.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-violet-400 font-semibold text-sm mb-2">
                    Eye Wash Stations
                  </h3>
                  <ul className="text-xs text-white/80 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Located within <strong className="text-white">10 seconds&apos; travel</strong> of
                        where chemicals are used
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Plumbed-in stations:{" "}
                        <strong className="text-white">
                          flush weekly
                        </strong>{" "}
                        to prevent bacterial growth
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Bottled eye wash: check{" "}
                        <strong className="text-white">expiry dates</strong>{" "}
                        and seal integrity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Clearly signed with the standard green and white eye
                        wash sign
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-violet-400 font-semibold text-sm mb-2">
                    Safety Showers
                  </h3>
                  <ul className="text-xs text-white/80 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Required where there is a risk of{" "}
                        <strong className="text-white">
                          large-area chemical contamination
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Must deliver a{" "}
                        <strong className="text-white">
                          minimum flow rate of 76 litres per minute
                        </strong>{" "}
                        (BS EN 15154)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Test monthly
                        </strong>{" "}
                        and record the test results
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Keep the area around the shower clear at all times
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-violet-400 font-semibold text-sm mb-2">
                    Spill Kits
                  </h3>
                  <ul className="text-xs text-white/80 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Correct type for the chemicals in the area (acid,
                        alkali, solvent, mercury, general)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Inspect monthly
                        </strong>{" "}
                        and restock after every use
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Located close to where hazardous substances are used,
                        not in a remote store
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Workers trained in correct use for each kit type
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-violet-400 font-semibold text-sm mb-2">
                    First Aid Supplies
                  </h3>
                  <ul className="text-xs text-white/80 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Standard first aid kit plus{" "}
                        <strong className="text-white">
                          additional items for chemical hazards
                        </strong>{" "}
                        (e.g. calcium gluconate gel for HF, saline for eye
                        irrigation)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Appointed first aiders with{" "}
                        <strong className="text-white">
                          chemical-specific training
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Contents checked regularly, expired items replaced, and
                        used items restocked
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Location clearly signed and known to all workers
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    Maintenance Is Not Optional
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  All emergency equipment must be{" "}
                  <strong className="text-white">
                    regularly inspected, tested, and maintained
                  </strong>
                  . Inspection records must be kept. If a piece of emergency
                  equipment is found to be faulty, out of date, or missing, it
                  must be reported and replaced{" "}
                  <strong className="text-white">immediately</strong>. During an
                  emergency is the worst time to discover that equipment does not
                  work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Key Takeaways
          </h2>
          <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
            <ul className="text-white space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>COSHH Regulation 13</strong> requires employers to
                  identify foreseeable emergencies, write procedures, provide
                  equipment, train workers, and practise drills.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Small spills:</strong> identify, PPE, contain, absorb,
                  clean, dispose as hazardous waste.{" "}
                  <strong>Large spills:</strong> evacuate, prevent spread, call
                  emergency services, specialist clean-up.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>
                  Different chemicals need different{" "}
                  <strong>spill kits</strong> &mdash; general purpose, acid,
                  alkali, solvent, or mercury. Using the wrong kit can be
                  dangerous.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>
                  First aid: <strong>skin and eyes</strong> &mdash; flush
                  15&ndash;20 minutes; <strong>inhalation</strong> &mdash; fresh
                  air, call 999; <strong>ingestion</strong> &mdash; do NOT
                  induce vomiting, call 999.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>
                  Fire: <strong>never use water</strong> on metal, oil, or
                  electrical fires. All smoke from chemical fires should be
                  treated as toxic. Check SDS Section 5.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>RIDDOR</strong> requires reporting of acute illness
                  from exposure, prescribed occupational diseases, and dangerous
                  occurrences.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Investigate every incident</strong> &mdash; root cause
                  analysis, corrective actions, update the COSHH assessment, and
                  share lessons learnt.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>
                  Emergency equipment &mdash; eye wash stations, safety showers,
                  spill kits, and first aid supplies &mdash; must be{" "}
                  <strong>inspected, maintained, and accessible</strong> at all
                  times.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── FAQs ─── */}
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

        {/* ─── Quiz ─── */}
        <Quiz
          title="Emergency Procedures Knowledge Check"
          questions={quizQuestions}
        />

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Health Surveillance
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5-section-4">
              Next: Training, Record Keeping &amp; Review
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
