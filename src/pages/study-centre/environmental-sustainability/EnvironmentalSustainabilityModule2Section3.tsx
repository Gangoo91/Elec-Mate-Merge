import { ArrowLeft, CheckCircle, AlertTriangle, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "hazardous-waste-definition",
    question: "Under UK law, what determines whether a waste is classified as hazardous?",
    options: [
      "Whether it displays one or more hazardous properties (HP1–HP15) listed in the Hazardous Waste Regulations 2005",
      "Whether the waste weighs more than 25 kg",
      "Whether the waste is produced on a construction site",
      "Whether the waste is liquid rather than solid"
    ],
    correctIndex: 0,
    explanation: "Waste is classified as hazardous if it displays one or more of the 15 hazardous properties (HP1–HP15) set out in the Hazardous Waste Regulations 2005 (as amended). These properties include explosive, oxidising, flammable, toxic, carcinogenic, corrosive, and ecotoxic characteristics. The classification depends on the properties of the waste, not its weight, origin, or physical state alone."
  },
  {
    id: "bunding-capacity",
    question: "What is the minimum bunding capacity required for the storage of hazardous liquid waste?",
    options: [
      "50% of the largest container",
      "75% of the largest container",
      "100% of the largest container",
      "110% of the largest container or 25% of total capacity, whichever is greater"
    ],
    correctIndex: 3,
    explanation: "The Environment Agency requires that bunds for hazardous liquid waste must be capable of holding 110% of the capacity of the largest container, or 25% of the total storage capacity, whichever is greater. Bunds must be impermeable, resistant to the stored materials, and regularly inspected for cracks or leaks."
  },
  {
    id: "plasterboard-landfill",
    question: "Why has plasterboard been banned from co-disposal with biodegradable waste in landfill since 2009?",
    options: [
      "Plasterboard is too heavy for standard landfill compaction",
      "Plasterboard releases hydrogen sulphide gas when mixed with biodegradable waste in anaerobic conditions",
      "Plasterboard is classified as hazardous waste under the EWC",
      "Plasterboard attracts vermin to landfill sites"
    ],
    correctIndex: 1,
    explanation: "When plasterboard (gypsum) is landfilled with biodegradable waste, bacteria break down the gypsum under anaerobic conditions and produce hydrogen sulphide (H₂S) — a toxic gas that smells of rotten eggs and can be lethal at high concentrations. Since 2009, plasterboard must be disposed of in dedicated cells at landfill sites or, preferably, recycled through specialist plasterboard recycling facilities."
  }
];

const faqs = [
  {
    question: "What is a mirror entry in the European Waste Catalogue?",
    answer: "A mirror entry is a pair of waste codes in the European Waste Catalogue (EWC) where the same waste type has both a hazardous and a non-hazardous code. Which code applies depends on whether the waste contains dangerous substances above the relevant threshold concentrations. For example, waste paint has a hazardous mirror entry (08 01 11*) if it contains organic solvents or other dangerous substances, and a non-hazardous mirror entry (08 01 12) if it does not. The asterisk (*) always denotes the hazardous entry. Correctly classifying mirror entries requires assessment and sometimes laboratory testing — you cannot simply assume the waste is non-hazardous."
  },
  {
    question: "Do I need to register with the Environment Agency to produce hazardous waste?",
    answer: "Since April 2016, the requirement for individual premises to notify (register) with the Environment Agency before producing hazardous waste was removed in England. However, you must still ensure that hazardous waste is correctly classified, stored, and disposed of through authorised waste carriers and facilities. Consignment notes must be completed for every movement of hazardous waste, and records must be retained for a minimum of 3 years. In Wales, premises notification is still required if you produce more than 500 kg of hazardous waste per year. Scotland and Northern Ireland have their own separate regulations."
  },
  {
    question: "Can I mix hazardous and non-hazardous waste in the same skip?",
    answer: "No. Mixing hazardous waste with non-hazardous waste is prohibited under the Hazardous Waste Regulations 2005 and the Waste Framework Directive. If hazardous waste is mixed with non-hazardous waste, the entire load is reclassified as hazardous waste, which significantly increases disposal costs and regulatory requirements. On construction sites, this means you must have separate, clearly labelled containers for hazardous waste streams (such as asbestos, oily rags, fluorescent tubes, and batteries) and ensure that operatives are trained to segregate waste correctly at source."
  },
  {
    question: "What are my obligations under the WEEE Regulations if I replace electrical equipment on site?",
    answer: "Under the WEEE Regulations 2013, if you are replacing old electrical equipment with new like-for-like equipment on a 1:1 basis, the distributor or retailer who supplied the new equipment has an obligation to take back the old equipment free of charge. For construction-relevant WEEE such as lighting fixtures, distribution boards, and heating controls, the contractor should arrange collection through the supplier or deliver the old equipment to a designated collection facility. WEEE must not be placed in general waste skips. It should be stored separately, handled carefully to avoid breakage (especially items containing mercury such as fluorescent tubes), and tracked through appropriate waste documentation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How many hazardous properties (HP codes) are defined under the Hazardous Waste Regulations?",
    options: [
      "10 (HP1–HP10)",
      "12 (HP1–HP12)",
      "15 (HP1–HP15)",
      "20 (HP1–HP20)"
    ],
    correctAnswer: 2,
    explanation: "There are 15 hazardous properties, coded HP1 through HP15. These include explosive (HP1), oxidising (HP2), flammable (HP3), irritant (HP4), toxic (HP5/HP6), carcinogenic (HP7), corrosive (HP8), infectious (HP9), toxic for reproduction (HP10), mutagenic (HP11), sensitising (HP12/HP13), ecotoxic (HP14), and capable of yielding another hazardous substance after disposal (HP15)."
  },
  {
    id: 2,
    question: "Which guidance document is the standard reference for waste classification in England and Wales?",
    options: [
      "HSG264 — Asbestos: The survey guide",
      "WM3 — Waste Classification: Guidance on the classification and assessment of waste",
      "CDM 2015 — Construction (Design and Management) Regulations",
      "PPG1 — General guide to the prevention of pollution"
    ],
    correctAnswer: 1,
    explanation: "WM3 (Waste Classification: Guidance on the classification and assessment of waste) is the technical guidance produced jointly by the Environment Agency, SEPA, and Natural Resources Wales. It provides the definitive methodology for classifying waste using EWC codes and determining whether waste is hazardous or non-hazardous based on its composition and hazardous properties."
  },
  {
    id: 3,
    question: "What does an asterisk (*) after a code in the European Waste Catalogue indicate?",
    options: [
      "The waste is inert and can go to any landfill",
      "The waste code is provisional and subject to review",
      "The waste is classified as hazardous",
      "The waste must be recycled rather than landfilled"
    ],
    correctAnswer: 2,
    explanation: "In the European Waste Catalogue (List of Wastes), an asterisk (*) after a six-digit code indicates that the waste is classified as hazardous. For example, 17 06 01* is asbestos insulation materials (hazardous), whilst 17 01 01 is concrete (non-hazardous, no asterisk). Mirror entries have both a hazardous (*) and non-hazardous version of the same waste type."
  },
  {
    id: 4,
    question: "How long must consignment note records for hazardous waste be retained?",
    options: [
      "1 year",
      "2 years",
      "3 years",
      "5 years"
    ],
    correctAnswer: 2,
    explanation: "Under the Hazardous Waste Regulations 2005, consignment note records must be retained for a minimum of 3 years. This applies to producers, carriers, and consignees of hazardous waste. The records must be available for inspection by the Environment Agency at any time during the retention period."
  },
  {
    id: 5,
    question: "Which of the following is classified as inert waste?",
    options: [
      "Plasterboard offcuts",
      "Untreated timber",
      "Clean concrete rubble",
      "Plastic conduit"
    ],
    correctAnswer: 2,
    explanation: "Clean concrete rubble is classified as inert waste — it does not undergo any significant physical, chemical, or biological transformation when landfilled. Plasterboard is non-hazardous but NOT inert (it produces hydrogen sulphide under anaerobic conditions). Untreated timber and plastic conduit are non-hazardous non-inert wastes, as timber is biodegradable and plastic does not meet the strict inert criteria."
  },
  {
    id: 6,
    question: "Under the WEEE Regulations 2013, what obligation does a distributor have when supplying replacement equipment on a like-for-like basis?",
    options: [
      "No obligation — WEEE is always the end user's responsibility",
      "They must take back the old equipment free of charge on a 1:1 basis",
      "They must pay the customer a recycling credit",
      "They must dispose of the old equipment within 24 hours"
    ],
    correctAnswer: 1,
    explanation: "Under the WEEE Regulations 2013, distributors (including retailers and trade suppliers) have a take-back obligation when supplying new electrical equipment on a like-for-like basis. They must accept the old equipment free of charge. This applies to construction-relevant WEEE such as lighting fixtures, distribution boards, and control systems."
  },
  {
    id: 7,
    question: "How must asbestos waste be packaged for disposal?",
    options: [
      "Single layer of standard black bin bags",
      "Wrapped in cling film and placed in a general waste skip",
      "Double-bagged in UN-approved asbestos waste sacks, clearly labelled",
      "Loose in a sealed metal container"
    ],
    correctAnswer: 2,
    explanation: "Asbestos waste must be double-bagged in UN-approved, heavy-duty asbestos waste sacks. The inner bag should be clear or red-striped, and the outer bag must be clearly labelled with the asbestos warning. The waste must be transported by a licensed carrier and disposed of only at a landfill site specifically licensed to accept asbestos waste. Asbestos is a special category of hazardous waste with additional requirements beyond the standard hazardous waste rules."
  },
  {
    id: 8,
    question: "Why is CCA-treated timber classified as hazardous waste?",
    options: [
      "Because it is heavier than untreated timber",
      "Because it contains chromated copper arsenate — a compound that includes arsenic, chromium, and copper",
      "Because it produces more smoke when burned",
      "Because it attracts wood-boring insects"
    ],
    correctAnswer: 1,
    explanation: "CCA (chromated copper arsenate) treated timber is classified as hazardous waste because the treatment contains arsenic, chromium, and copper compounds. These are toxic heavy metals that can leach into soil and groundwater. CCA-treated timber must never be burned on site (this releases toxic fumes) and must be segregated from non-hazardous timber waste. It carries the EWC code 17 02 04* (hazardous wood waste)."
  }
];

export default function EnvironmentalSustainabilityModule2Section3() {
  useSEO({
    title: "Hazardous vs Non-Hazardous Waste | Environmental & Sustainability Module 2.3",
    description: "Classification of hazardous and non-hazardous waste in construction — hazardous properties, EWC codes, storage, consignment notes, WEEE, and special waste streams.",
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
            <Link to="../environmental-sustainability-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Trash2 className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">MODULE 2 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Hazardous vs Non-Hazardous Waste
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to identify, classify, store, and dispose of hazardous and non-hazardous waste streams on construction sites &mdash; from EWC codes to consignment notes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>What:</strong> Waste classified by its hazardous properties (HP1&ndash;HP15)</li>
              <li><strong>Key law:</strong> Hazardous Waste Regulations 2005 (as amended)</li>
              <li><strong>Classification:</strong> European Waste Catalogue (EWC) codes</li>
              <li><strong>Guidance:</strong> WM3 &mdash; Waste Classification Technical Guidance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Segregate:</strong> Never mix hazardous with non-hazardous waste</li>
              <li><strong>Label:</strong> All hazardous waste containers clearly marked</li>
              <li><strong>Document:</strong> Consignment notes for every hazardous waste movement</li>
              <li><strong>Retain:</strong> Records kept for minimum 3 years</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define hazardous waste and list the 15 hazardous properties (HP1–HP15)",
              "Identify common hazardous wastes encountered on construction sites",
              "Explain how to classify waste using EWC codes and the WM3 guidance",
              "Describe the legal requirements for storing hazardous waste on site",
              "Outline the consignment note system and record-keeping obligations",
              "Distinguish between inert, non-hazardous non-inert, and hazardous waste",
              "Explain WEEE Regulations and producer/distributor responsibilities",
              "Describe disposal requirements for special waste streams including plasterboard and asbestos"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ── Section 01: What Is Hazardous Waste? ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            What Is Hazardous Waste?
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Hazardous waste is waste that contains substances or has properties that make it
                <strong> harmful to human health or the environment</strong>. In England and Wales,
                the legal definition and controls are set out in the <strong>Hazardous Waste
                Regulations 2005</strong> (as amended), which implement the European Waste Framework
                Directive and the List of Wastes Directive into UK law. Despite Brexit, these
                regulations remain in force as retained EU law with only minor amendments.
              </p>

              <p>
                Whether a waste is hazardous depends on whether it displays one or more of the
                <strong> 15 hazardous properties</strong>, coded HP1 through HP15. These properties
                are assessed against specific concentration thresholds &mdash; a waste is hazardous
                if a dangerous substance is present above the relevant threshold for that property.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">The 15 Hazardous Properties (HP1&ndash;HP15)</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP1 &mdash; Explosive:</strong> Waste capable of producing gas at such a temperature, pressure, and speed as to cause damage (e.g. certain chemical residues)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP2 &mdash; Oxidising:</strong> Waste that may cause or contribute to combustion of other materials (e.g. concentrated peroxides)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP3 &mdash; Flammable:</strong> Waste that is easily ignited, including liquid waste with a flash point below 60&deg;C (e.g. waste solvents, fuel residues)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP4 &mdash; Irritant:</strong> Waste that causes skin irritation or eye damage (e.g. certain cement dusts, cleaning chemicals)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP5 &mdash; Specific Target Organ Toxicity (STOT) / Aspiration Toxicity:</strong> Waste that causes damage to specific organs or the respiratory system on single exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP6 &mdash; Acute Toxicity:</strong> Waste that can cause death or serious illness through ingestion, inhalation, or skin contact (e.g. pesticide residues, lead compounds)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP7 &mdash; Carcinogenic:</strong> Waste that induces cancer or increases its incidence (e.g. asbestos, certain tar-based products)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP8 &mdash; Corrosive:</strong> Waste that causes destruction of living tissue on contact (e.g. strong acids, alkalis, battery acid)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP9 &mdash; Infectious:</strong> Waste containing viable micro-organisms known to cause disease (primarily medical waste, rarely encountered in construction)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP10 &mdash; Toxic for Reproduction:</strong> Waste that has adverse effects on sexual function, fertility, or development (e.g. certain lead compounds)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP11 &mdash; Mutagenic:</strong> Waste that may cause heritable genetic defects (e.g. certain chromium VI compounds)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP12 &mdash; Release of Acute Toxic Gas:</strong> Waste that releases toxic gas in contact with water, acid, or air (e.g. certain cyanide compounds)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP13 &mdash; Sensitising:</strong> Waste that contains substances known to cause sensitisation through inhalation or skin contact (e.g. isocyanates, epoxy resins)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP14 &mdash; Ecotoxic:</strong> Waste that presents or may present immediate or delayed risks to the environment (e.g. oils, pesticides, heavy metals leaching into watercourses)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">HP15 &mdash; Waste Capable of Yielding Another Hazardous Substance:</strong> Waste that after disposal is capable of exhibiting a hazardous property not directly displayed by the original waste</span>
                  </li>
                </ul>
              </div>

              <p>
                The <strong>List of Wastes</strong> (also known as the European Waste Catalogue or EWC)
                provides a standardised system of six-digit codes for classifying all waste types. Each
                waste is assigned to a chapter (first two digits), sub-chapter (first four digits), and
                specific entry (all six digits). Hazardous entries are marked with an asterisk (*). Some
                waste types have <strong>mirror entries</strong> &mdash; paired codes where one is
                hazardous and one is non-hazardous, depending on the concentration of dangerous substances.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Key Point:</strong> The classification of waste
                  as hazardous or non-hazardous is a <strong>legal responsibility</strong> that falls on
                  the waste producer. Getting it wrong can result in prosecution, unlimited fines, and
                  imprisonment. If you are unsure whether a waste is hazardous, you must assess it
                  using the WM3 technical guidance or seek specialist advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 02: Common Hazardous Wastes in Construction ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Common Hazardous Wastes in Construction
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction and demolition activities generate a wide range of hazardous waste.
                Electricians, in particular, encounter several hazardous waste streams during
                installation, maintenance, and refurbishment work. Recognising these materials and
                understanding their correct disposal routes is essential for legal compliance and
                environmental protection.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Hazardous Wastes Commonly Found on Construction Sites</p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Asbestos-containing materials (ACMs)</strong> &mdash;
                      insulation, floor tiles, cement sheets, textured coatings (Artex), pipe lagging. Classified under
                      EWC chapter 17 06. Carcinogenic (HP7). Must be removed by licensed contractors and disposed of
                      at licensed tips.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lead paint and lead-containing materials</strong> &mdash;
                      found in pre-1970s buildings. Toxic (HP6) and toxic for reproduction (HP10). Waste from
                      stripping lead paint must be treated as hazardous.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Contaminated soil</strong> &mdash; soil containing
                      hydrocarbons, heavy metals, pesticides, or other pollutants from previous industrial use.
                      Requires testing and classification before disposal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Waste oils, fuels, and lubricants</strong> &mdash;
                      hydraulic oil, diesel, engine oil, cutting fluids. Flammable (HP3) and ecotoxic (HP14).
                      Must be stored in bunded areas and collected by licensed waste oil collectors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Solvents and thinners</strong> &mdash; white spirit,
                      acetone, toluene, xylene. Highly flammable (HP3), may be toxic (HP6), and harmful to the
                      environment (HP14). Never pour down drains.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fluorescent tubes and discharge lamps</strong> &mdash;
                      contain mercury (toxic, HP6). Common during electrical rewiring and lighting upgrades.
                      Must not be broken &mdash; store intact in purpose-made tube coffins or boxes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Batteries</strong> &mdash; lead-acid batteries (from UPS
                      systems, emergency lighting) contain lead and sulphuric acid. Lithium-ion batteries
                      present fire risks. All batteries are hazardous waste.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">WEEE (Waste Electrical and Electronic Equipment)</strong> &mdash;
                      distribution boards, consumer units, lighting fixtures, heating controls, fire alarm panels.
                      May contain hazardous substances including lead solder, mercury, brominated flame retardants,
                      and PCBs in older capacitors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">CCA-treated timber</strong> &mdash; timber treated with
                      chromated copper arsenate. Contains arsenic, chromium, and copper &mdash; all toxic heavy
                      metals. Must never be burned on site. EWC code 17 02 04*.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Paint waste (hazardous)</strong> &mdash; waste paint
                      containing organic solvents, lead, cadmium, or chromium compounds. Water-based paints
                      are generally non-hazardous, but solvent-based paints and their residues are hazardous
                      (mirror entry &mdash; assessment required).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Site Safety</p>
                </div>
                <p className="text-sm text-white/80">
                  If you encounter any material on site that you suspect may be hazardous, <strong>stop
                  work immediately</strong> and report it to your supervisor or site manager. Do not
                  attempt to handle, move, or dispose of unknown materials yourself. Incorrect handling
                  of hazardous waste can cause serious injury, environmental contamination, and criminal
                  prosecution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ── Section 03: Identifying Hazardous Waste ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Identifying Hazardous Waste
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Correctly identifying and classifying waste is the <strong>first and most important
                step</strong> in the waste management process. The waste producer &mdash; typically the
                contractor or client &mdash; has the legal responsibility to classify every waste stream
                before it leaves site. This means assigning the correct <strong>European Waste Catalogue
                (EWC) code</strong> and determining whether the waste is hazardous or non-hazardous.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Step-by-Step Waste Classification</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Identify the Waste Source</p>
                      <p>Determine which industry or process generated the waste. The EWC is organised by source &mdash; Chapter 17 covers construction and demolition wastes.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Find the Correct EWC Code</p>
                      <p>Select the six-digit code that most accurately describes the waste. For example: 17 01 01 (concrete), 17 06 01* (asbestos insulation), 20 01 21* (fluorescent tubes).</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Check for Absolute and Mirror Entries</p>
                      <p><strong>Absolute hazardous entries</strong> (marked with *) are always hazardous regardless of concentration. <strong>Absolute non-hazardous entries</strong> are always non-hazardous. <strong>Mirror entries</strong> require assessment to determine which code applies.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Assess Mirror Entries</p>
                      <p>For mirror entries, you must determine the chemical composition of the waste and compare the concentrations of dangerous substances against the threshold limits for each hazardous property (HP1&ndash;HP15). This may require <strong>laboratory testing</strong>.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-white font-medium">Document the Classification</p>
                      <p>Record the EWC code, the classification decision (hazardous or non-hazardous), and the basis for the decision. This documentation must be retained and made available to waste carriers and receiving facilities.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">WM3 Guidance:</strong> The definitive reference
                  for waste classification in England and Wales is <strong>WM3 &mdash; Waste
                  Classification: Guidance on the classification and assessment of waste</strong>,
                  published jointly by the Environment Agency, SEPA, and Natural Resources Wales. This
                  document provides a detailed, step-by-step methodology for classifying waste using
                  EWC codes and determining hazardous properties. It should be used for all waste
                  classification decisions, particularly for mirror entries where assessment and
                  testing are required.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Common Mistake</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>Never assume a waste is non-hazardous without proper assessment.</strong> For
                  mirror entries, the default position must be that the waste is hazardous until
                  assessment or testing proves otherwise. Incorrectly classifying hazardous waste as
                  non-hazardous is an offence that can result in prosecution by the Environment Agency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 04: Storage of Hazardous Waste ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Storage of Hazardous Waste
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The storage of hazardous waste on construction sites is subject to strict
                regulatory requirements. Failure to store hazardous waste correctly can lead to
                environmental pollution, health risks to site workers, and prosecution. The
                following rules apply to all premises where hazardous waste is stored, including
                construction sites operating under a waste exemption or environmental permit.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Hazardous Waste Storage Requirements</p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Segregation</strong> &mdash; hazardous waste must be
                      kept completely separate from non-hazardous waste at all times. Different types of
                      hazardous waste that are incompatible (e.g. acids and alkalis, oxidisers and flammables)
                      must also be segregated from each other.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Labelling</strong> &mdash; all containers must be
                      clearly labelled with the contents, the EWC code, and appropriate hazard warning
                      symbols (GHS/CLP pictograms). Labels must be durable, legible, and visible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bunding for liquids</strong> &mdash; liquid hazardous
                      waste must be stored within a bund (secondary containment). The bund must have a
                      capacity of at least <strong>110% of the largest container</strong>, or <strong>25%
                      of the total storage capacity</strong>, whichever is greater. Bunds must be
                      impermeable, chemically resistant to the stored materials, and regularly inspected.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Secure containers</strong> &mdash; containers must be
                      in good condition, sealed to prevent leakage, and appropriate for the type of waste
                      (e.g. UN-approved drums for liquid waste, tube coffins for fluorescent lamps,
                      sealed asbestos bags for ACMs).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Time limits</strong> &mdash; hazardous waste must not
                      be stored for longer than 12 months (under a permit) or the period specified in any
                      applicable waste exemption. On construction sites, hazardous waste should be removed
                      as frequently as practicable to minimise on-site accumulation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Security</strong> &mdash; storage areas must be
                      secure against unauthorised access, vandalism, and fly-tipping. On construction sites,
                      hazardous waste storage should be within the site compound and protected by fencing
                      and locked gates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Registration with the Environment Agency</strong> &mdash;
                      sites storing hazardous waste may need to register a waste exemption or obtain an
                      environmental permit from the Environment Agency, depending on the type and quantity
                      of waste stored. Temporary construction site exemptions (T-series) have specific
                      conditions and limits.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Practical Tip:</strong> On a busy construction
                  site, designate a specific area for hazardous waste storage away from the main
                  working areas, welfare facilities, and watercourses. Use colour-coded containers
                  (e.g. yellow for clinical/hazardous, red for batteries) and ensure all operatives
                  are inducted on the waste segregation system during the site induction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ── Section 05: Hazardous Waste Consignment ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Hazardous Waste Consignment
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every movement of hazardous waste &mdash; from the site where it is produced to the
                facility where it is treated or disposed of &mdash; must be tracked using the
                <strong> consignment note system</strong>. This is a legal requirement under the
                Hazardous Waste Regulations 2005 and is the hazardous waste equivalent of a waste
                transfer note (which applies to non-hazardous waste). The consignment note provides
                a complete audit trail from &ldquo;cradle to grave&rdquo;.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Consignment Note Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">What it contains:</strong> Unique consignment note code, description of waste, EWC code, quantity, hazardous properties, producer details, carrier details, consignee (receiving facility) details, and signed declarations from each party</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Who completes it:</strong> The waste producer completes Parts A&ndash;D before the waste is collected. The carrier completes Part E on collection. The consignee completes Part F on receipt at the receiving facility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">When required:</strong> A consignment note must accompany EVERY movement of hazardous waste, regardless of quantity. There is no de minimis threshold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Multiple collections:</strong> Where a carrier collects hazardous waste from multiple premises on a single round, a schedule of carriers (multiple collection) consignment note may be used instead of individual notes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Record-Keeping Obligations</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Retention period:</strong> All parties must retain their copies of consignment notes for a minimum of <strong>3 years</strong> from the date of collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Quarterly returns:</strong> Consignees (receiving facilities) must submit quarterly returns to the Environment Agency listing all hazardous waste received. Producers do not submit returns, but must keep their records available for inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Premises notification (Wales):</strong> In Wales, premises producing more than 500 kg of hazardous waste per year must notify Natural Resources Wales. In England, this requirement was removed in 2016, but all other obligations remain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Inspection:</strong> Records must be available for inspection by Environment Agency officers at any time during the 3-year retention period. Failure to produce records on demand is an offence</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Legal Obligation</p>
                </div>
                <p className="text-sm text-white/80">
                  The waste producer has a <strong>duty of care</strong> that extends beyond the site
                  boundary. You must check that the waste carrier holds a valid waste carrier
                  registration and that the receiving facility has the appropriate environmental permit
                  to accept your waste. If your hazardous waste ends up being illegally dumped or
                  incorrectly disposed of, <strong>you as the producer can be held liable</strong> if you
                  failed to carry out reasonable checks on the carrier and consignee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 06: Non-Hazardous Waste Types ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Non-Hazardous Waste Types
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Non-hazardous waste makes up the <strong>majority of waste produced on construction
                sites</strong> by volume. However, &ldquo;non-hazardous&rdquo; does not mean
                &ldquo;no regulations&rdquo; &mdash; non-hazardous waste is still subject to the
                duty of care, waste transfer note requirements, and the waste hierarchy. Understanding
                the sub-categories of non-hazardous waste is important for correct disposal and
                maximising recycling opportunities.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Categories of Non-Hazardous Waste</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-medium text-sm mb-2">Inert Waste</p>
                    <p className="text-sm text-white/80 mb-2">
                      Inert waste does not undergo any significant physical, chemical, or biological
                      transformation when landfilled. It does not dissolve, burn, produce gas, or
                      adversely affect other materials it comes into contact with.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Clean concrete", "Bricks", "Tiles", "Ceramics", "Natural stone", "Clean soil", "Glass"].map((item) => (
                        <span key={item} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-400">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm mb-2">Non-Hazardous Non-Inert Waste</p>
                    <p className="text-sm text-white/80 mb-2">
                      This category covers waste that is not hazardous but does undergo physical,
                      chemical, or biological changes over time. It cannot be disposed of in inert
                      landfill sites and usually has higher disposal costs than inert waste.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Untreated timber", "Plasterboard", "Plastics", "Cardboard", "Mixed metals", "Insulation (non-hazardous)", "Rubber", "Textiles"].map((item) => (
                        <span key={item} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/70">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Mixed Waste Warning:</strong> One of the
                  biggest issues on construction sites is <strong>contamination of non-hazardous waste
                  with hazardous materials</strong>. If even a small amount of hazardous waste (such
                  as a single fluorescent tube or a tin of solvent-based paint) is placed in a
                  non-hazardous skip, the entire skip load may be reclassified as hazardous waste.
                  This dramatically increases disposal costs and can result in the skip being rejected
                  at the receiving facility. Proper <strong>segregation at source</strong> is the
                  only effective solution.
                </p>
              </div>

              <p>
                The distinction between inert and non-hazardous non-inert waste matters because
                these categories determine which landfill sites can accept the waste. There are
                three classes of landfill in the UK: <strong>inert landfill</strong> (cheapest,
                lowest environmental risk), <strong>non-hazardous landfill</strong> (accepts both
                inert and non-hazardous non-inert waste), and <strong>hazardous landfill</strong>
                (accepts hazardous waste, highest cost). Waste sent to the wrong class of landfill
                is a regulatory breach.
              </p>

              <p>
                From an environmental and cost perspective, the waste hierarchy always applies:
                <strong> prevent</strong> waste first, then <strong>reuse</strong>,
                <strong> recycle</strong>, <strong>recover</strong> energy, and only as a last
                resort <strong>dispose</strong> to landfill. Many non-hazardous construction wastes
                have excellent recycling pathways &mdash; concrete can be crushed for aggregate,
                timber can be chipped for biomass, metals have high scrap value, and plasterboard
                can be recycled at specialist facilities.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── DIAGRAM: Hazardous Properties Grid (HP1–HP15) ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">&mdash;</span>
            Hazardous Properties Grid (HP1&ndash;HP15)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { code: "HP1", name: "Explosive", example: "Chemical residues", colour: "bg-red-500/20 border-red-500/30 text-red-400" },
              { code: "HP2", name: "Oxidising", example: "Concentrated peroxides", colour: "bg-orange-500/20 border-orange-500/30 text-orange-400" },
              { code: "HP3", name: "Flammable", example: "Solvents, fuels", colour: "bg-red-500/20 border-red-500/30 text-red-400" },
              { code: "HP4", name: "Irritant", example: "Cement dust, cleaners", colour: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400" },
              { code: "HP5", name: "STOT / Aspiration", example: "Petroleum distillates", colour: "bg-orange-500/20 border-orange-500/30 text-orange-400" },
              { code: "HP6", name: "Acute Toxicity", example: "Lead, mercury compounds", colour: "bg-red-500/20 border-red-500/30 text-red-400" },
              { code: "HP7", name: "Carcinogenic", example: "Asbestos, coal tar", colour: "bg-red-500/20 border-red-500/30 text-red-400" },
              { code: "HP8", name: "Corrosive", example: "Battery acid, alkalis", colour: "bg-orange-500/20 border-orange-500/30 text-orange-400" },
              { code: "HP9", name: "Infectious", example: "Contaminated sharps", colour: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400" },
              { code: "HP10", name: "Toxic for Reproduction", example: "Lead compounds", colour: "bg-red-500/20 border-red-500/30 text-red-400" },
              { code: "HP11", name: "Mutagenic", example: "Chromium VI", colour: "bg-red-500/20 border-red-500/30 text-red-400" },
              { code: "HP12", name: "Release Toxic Gas", example: "Cyanide + acid", colour: "bg-orange-500/20 border-orange-500/30 text-orange-400" },
              { code: "HP13", name: "Sensitising", example: "Isocyanates, epoxy", colour: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400" },
              { code: "HP14", name: "Ecotoxic", example: "Oils, pesticides", colour: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" },
              { code: "HP15", name: "Yields Hazardous Substance", example: "Post-disposal reaction", colour: "bg-purple-500/20 border-purple-500/30 text-purple-400" },
            ].map((hp) => (
              <div key={hp.code} className={`p-3 rounded-lg border ${hp.colour.split(" ").slice(0, 2).join(" ")}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold ${hp.colour.split(" ").slice(2).join(" ")}`}>{hp.code}</span>
                  <span className="text-sm font-medium text-white">{hp.name}</span>
                </div>
                <p className="text-xs text-white/60">e.g. {hp.example}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-xs mt-3">
            All 15 hazardous properties defined under the Hazardous Waste Regulations 2005
          </p>
        </section>

        {/* ── DIAGRAM: Hazardous vs Non-Hazardous Comparison Table ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">&mdash;</span>
            Hazardous vs Non-Hazardous Comparison
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Hazardous Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-500/30 to-orange-500/20 border-b border-red-500/30 px-4 py-3">
                <p className="text-red-400 font-semibold text-base">Hazardous Waste</p>
                <p className="text-white/60 text-xs">Marked with * in the EWC</p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-red-400/80 text-xs font-medium uppercase tracking-wide mb-1">Definition</p>
                  <p className="text-white/80">Displays one or more hazardous properties (HP1&ndash;HP15)</p>
                </div>
                <div>
                  <p className="text-red-400/80 text-xs font-medium uppercase tracking-wide mb-1">Documentation</p>
                  <p className="text-white/80">Consignment note for every movement</p>
                </div>
                <div>
                  <p className="text-red-400/80 text-xs font-medium uppercase tracking-wide mb-1">Storage</p>
                  <p className="text-white/80">Segregated, labelled, bunded (liquids), secure</p>
                </div>
                <div>
                  <p className="text-red-400/80 text-xs font-medium uppercase tracking-wide mb-1">Mixing</p>
                  <p className="text-white/80">Prohibited &mdash; contaminates entire load</p>
                </div>
                <div>
                  <p className="text-red-400/80 text-xs font-medium uppercase tracking-wide mb-1">Record Retention</p>
                  <p className="text-white/80">Minimum 3 years</p>
                </div>
                <div>
                  <p className="text-red-400/80 text-xs font-medium uppercase tracking-wide mb-1">Disposal</p>
                  <p className="text-white/80">Hazardous landfill or specialist treatment only</p>
                </div>
                <div>
                  <p className="text-red-400/80 text-xs font-medium uppercase tracking-wide mb-1">Examples</p>
                  <p className="text-white/80">Asbestos, lead paint, oils, solvents, fluorescent tubes, batteries</p>
                </div>
                <div>
                  <p className="text-red-400/80 text-xs font-medium uppercase tracking-wide mb-1">Cost</p>
                  <p className="text-white/80">Significantly higher than non-hazardous disposal</p>
                </div>
              </div>
            </div>

            {/* Non-Hazardous Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500/30 to-emerald-400/20 border-b border-emerald-500/30 px-4 py-3">
                <p className="text-emerald-400 font-semibold text-base">Non-Hazardous Waste</p>
                <p className="text-white/60 text-xs">No * in the EWC code</p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide mb-1">Definition</p>
                  <p className="text-white/80">Does not display any hazardous properties</p>
                </div>
                <div>
                  <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide mb-1">Documentation</p>
                  <p className="text-white/80">Waste transfer note (can cover 12 months if same waste/carrier)</p>
                </div>
                <div>
                  <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide mb-1">Storage</p>
                  <p className="text-white/80">Segregated by type for recycling, contained, secure</p>
                </div>
                <div>
                  <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide mb-1">Mixing</p>
                  <p className="text-white/80">Different non-hazardous streams can be mixed (but reduces recyclability)</p>
                </div>
                <div>
                  <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide mb-1">Record Retention</p>
                  <p className="text-white/80">Minimum 2 years</p>
                </div>
                <div>
                  <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide mb-1">Disposal</p>
                  <p className="text-white/80">Non-hazardous landfill, recycling, energy recovery</p>
                </div>
                <div>
                  <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide mb-1">Examples</p>
                  <p className="text-white/80">Concrete, timber, plasterboard, plastics, cardboard, metals</p>
                </div>
                <div>
                  <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wide mb-1">Cost</p>
                  <p className="text-white/80">Lower disposal costs; recycling may generate revenue</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-white/40 text-xs mt-3 md:hidden">
            Scroll down to compare both waste categories
          </p>
        </section>

        {/* ── Section 07: Waste Electrical and Electronic Equipment (WEEE) ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            Waste Electrical and Electronic Equipment (WEEE)
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Waste Electrical and Electronic Equipment (WEEE) Regulations 2013</strong>
                implement the EU WEEE Directive in the UK and establish a framework for the
                collection, treatment, recycling, and recovery of waste electrical and electronic
                equipment. For electricians, these regulations are directly relevant because
                electrical installation, maintenance, and refurbishment work regularly generates
                WEEE.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Key Principles of the WEEE Regulations</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Producer responsibility:</strong> Manufacturers and
                      importers of electrical equipment are responsible for financing the collection,
                      treatment, and recycling of their products when they become waste. They must join
                      a Producer Compliance Scheme (PCS) and meet annual collection targets.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Distributor take-back:</strong> Distributors
                      (including retailers, wholesalers, and trade suppliers) must offer free take-back
                      of old equipment on a <strong>like-for-like, 1:1 basis</strong> when supplying
                      new replacement equipment. This means if you buy a new distribution board from a
                      wholesaler, they must accept the old one you are replacing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Separate collection:</strong> WEEE must be
                      collected separately from other waste streams. It must not go into general waste
                      skips or mixed recycling. Items containing hazardous substances (mercury in
                      fluorescent tubes, lead in CRT monitors, refrigerants in cooling equipment) must
                      be handled with particular care.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Treatment standards:</strong> WEEE must be treated
                      at Approved Authorised Treatment Facilities (AATFs) that meet specific
                      environmental and technical standards. Certain components must be removed for
                      separate treatment &mdash; including mercury-containing lamps, batteries,
                      PCB-containing capacitors, and refrigerants.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Construction-Relevant WEEE</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Distribution boards and consumer units",
                    "Lighting fixtures and luminaires",
                    "Fluorescent tubes and discharge lamps",
                    "Emergency lighting batteries and units",
                    "Fire alarm control panels and detectors",
                    "Heating controls and thermostats",
                    "Ventilation fans and extract units",
                    "Cable management systems with electronic components",
                    "UPS (uninterruptible power supply) systems",
                    "Building management system (BMS) controllers"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">For Electricians:</strong> When carrying out
                  rewiring, upgrades, or replacement work, always plan how you will deal with the old
                  equipment before starting the job. Check whether your supplier offers take-back,
                  identify your nearest WEEE collection point or Household Waste Recycling Centre that
                  accepts trade WEEE, and ensure you have suitable storage on site to keep WEEE
                  separate from other waste. Never place WEEE in a general waste skip.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 08: Special Waste Streams ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Special Waste Streams
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain waste types encountered in construction have <strong>additional regulatory
                requirements</strong> beyond the standard hazardous or non-hazardous waste rules.
                These &ldquo;special&rdquo; waste streams require specific handling, storage, and
                disposal methods due to their particular properties or the risks they present.
              </p>

              {/* Plasterboard */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Plasterboard (Gypsum Waste)</p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Plasterboard is classified as <strong>non-hazardous non-inert waste</strong>, but it
                    has been subject to special controls since <strong>2009</strong> when the Environment
                    Agency banned the co-disposal of plasterboard with biodegradable waste in landfill.
                  </p>
                  <p>
                    The reason is chemistry: plasterboard is made from gypsum (calcium sulphate). When
                    gypsum comes into contact with biodegradable waste in the oxygen-free (anaerobic)
                    conditions found in landfill, sulphate-reducing bacteria convert the sulphate into
                    <strong> hydrogen sulphide (H&#8322;S)</strong> gas. Hydrogen sulphide is highly toxic
                    &mdash; it smells of rotten eggs at low concentrations but causes loss of smell at
                    higher concentrations, followed by respiratory failure and death.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Must not</strong> be co-disposed with biodegradable waste in landfill</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Can be</strong> disposed of in dedicated gypsum cells at landfill sites or, preferably, recycled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Recycling:</strong> specialist plasterboard recycling facilities can reclaim the gypsum and paper for reuse in new plasterboard manufacturing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">On site:</strong> plasterboard must be segregated from other waste streams and stored separately in dedicated skips or containers</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Asbestos */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Asbestos Waste</p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Asbestos is one of the most heavily regulated waste streams in the UK. All asbestos
                    waste is classified as hazardous (carcinogenic &mdash; HP7) and is subject to both
                    the Hazardous Waste Regulations 2005 and the Control of Asbestos Regulations 2012.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Packaging:</strong> must be <strong>double-bagged</strong> in UN-approved, heavy-duty asbestos waste sacks. Inner bag sealed and wiped clean, outer bag clearly labelled with the asbestos warning symbol and &ldquo;CAUTION &mdash; CONTAINS ASBESTOS&rdquo; text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Storage:</strong> in a locked, designated area away from other waste. Must not be placed in or near any other skip or container</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Transport:</strong> by a registered waste carrier in a sealed vehicle or skip. A hazardous waste consignment note must be completed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Disposal:</strong> only at a landfill site specifically <strong>licensed to accept asbestos waste</strong>. The waste is buried in a dedicated cell and covered with clean soil to prevent fibre release</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Licensed removal:</strong> work with licensable asbestos (sprayed coatings, lagging, insulation board) must only be carried out by HSE-licensed asbestos removal contractors</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Refrigerants */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Refrigerants (F-Gas Regulations)</p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Refrigerants used in air conditioning, heat pumps, and refrigeration equipment are
                    regulated under the <strong>Fluorinated Greenhouse Gases (F-Gas) Regulations</strong>.
                    These substances &mdash; including HFCs (hydrofluorocarbons) &mdash; have extremely
                    high global warming potential (GWP), sometimes thousands of times greater than CO&#8322;.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Recovery:</strong> refrigerants must be recovered by a <strong>certified F-gas engineer</strong> before any equipment containing them is scrapped or decommissioned. Venting refrigerants to the atmosphere is a criminal offence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Leak checking:</strong> equipment containing F-gases above certain thresholds must be leak-checked at regular intervals by certified personnel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Record keeping:</strong> operators must maintain records of all F-gas equipment, including the type and quantity of refrigerant, leak check dates, and any additions or recoveries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span><strong className="text-white">Phase-down:</strong> the F-Gas Regulations include a phase-down schedule that progressively reduces the quantity of HFCs that can be placed on the market, driving the transition to lower-GWP alternatives</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Remember</p>
                </div>
                <p className="text-sm text-white/80">
                  Special waste streams often involve <strong>multiple overlapping regulations</strong>.
                  For example, a decommissioned air conditioning unit may involve F-gas recovery
                  regulations, WEEE Regulations, and hazardous waste regulations simultaneously.
                  Always check all applicable requirements before beginning work on or disposing of
                  equipment that may contain regulated substances.
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
          title="Section 3 Knowledge Check"
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
            <Link to="../environmental-sustainability-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-2-section-4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
