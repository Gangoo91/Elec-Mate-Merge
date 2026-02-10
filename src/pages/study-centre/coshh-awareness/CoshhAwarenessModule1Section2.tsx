import { ArrowLeft, Layers, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ghs-pictograms",
    question:
      "How many hazard pictograms are used in the GHS/CLP classification system?",
    options: ["6", "7", "9", "12"],
    correctIndex: 2,
    explanation:
      "The GHS/CLP system uses 9 hazard pictograms, each displayed within a red diamond-shaped border on a white background. They are: flame, exploding bomb, oxidising flame over circle, gas cylinder, corrosion, skull and crossbones, health hazard (silhouette), exclamation mark, and environment (dead tree and fish).",
  },
  {
    id: "dust-wel",
    question:
      "What is the workplace exposure limit (WEL) for respirable dust under UK regulations?",
    options: [
      "10 mg/m\u00B3",
      "4 mg/m\u00B3",
      "0.1 mg/m\u00B3",
      "1 mg/m\u00B3",
    ],
    correctIndex: 1,
    explanation:
      "The WEL for respirable dust (particles small enough to reach the gas exchange region of the lungs) is 4 mg/m\u00B3 as an 8-hour TWA. Inhalable dust has a WEL of 10 mg/m\u00B3. Specific substances such as respirable crystalline silica have much lower limits \u2014 0.1 mg/m\u00B3.",
  },
  {
    id: "biological-groups",
    question:
      "Under the COSHH Regulations, biological agents are classified into how many hazard groups?",
    options: ["2", "3", "4", "5"],
    correctIndex: 2,
    explanation:
      "Biological agents are classified into 4 hazard groups under COSHH. Group 1 is unlikely to cause human disease. Group 2 can cause disease but is unlikely to spread to the community and effective treatment is available. Group 3 can cause severe disease and may spread. Group 4 causes severe disease with no effective treatment and a high risk of spreading.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between a hazard statement (H-code) and a precautionary statement (P-code)?",
    answer:
      'Hazard statements (H-codes) describe the nature and degree of a hazard \u2014 for example, H314 means "Causes severe skin burns and eye damage." Precautionary statements (P-codes) describe recommended measures to minimise or prevent adverse effects \u2014 for example, P280 means "Wear protective gloves, protective clothing, eye protection, face protection." H-codes tell you what the substance can do to you; P-codes tell you what to do to protect yourself. Both are found on safety data sheets (SDS) and product labels.',
  },
  {
    question:
      'What does "Danger" vs "Warning" mean on a CLP-classified substance label?',
    answer:
      'CLP labels use two signal words to indicate the severity of the hazard. "Danger" is used for the more severe hazard categories \u2014 substances that pose the greatest risk to health, safety, or the environment. "Warning" is used for less severe hazard categories. A substance labelled "Danger" requires more stringent control measures than one labelled "Warning", although both must be used safely and in accordance with the safety data sheet. Some hazard categories do not require either signal word.',
  },
  {
    question: "Are all dusts hazardous, or only certain types?",
    answer:
      "All dusts are potentially hazardous if exposure is high enough or prolonged enough. The COSHH Regulations set general workplace exposure limits for inhalable dust (10 mg/m\u00B3) and respirable dust (4 mg/m\u00B3). However, certain dusts are far more dangerous than others. Respirable crystalline silica (from cutting concrete, brick, or stone) has a WEL of just 0.1 mg/m\u00B3 and is a Group 1 carcinogen. Hardwood dust (WEL 3 mg/m\u00B3) is a nasal carcinogen. Even nuisance dust at high levels can cause chronic obstructive pulmonary disease (COPD). The key principle is that no dust should be dismissed as harmless.",
  },
  {
    question:
      "Why are sensitisers particularly concerning in electrical work?",
    answer:
      "Sensitisers are substances that cause the immune system to develop an allergic response. Once sensitised, even tiny exposures can trigger severe reactions. In electrical work, common sensitisers include epoxy resins (used in cable jointing, potting compounds, and adhesives), isocyanates (found in some spray foams and coatings), and rosin-based solder flux (released as fume during soldering). Sensitisation is irreversible \u2014 once you become sensitised, you may never be able to work with that substance again. This can be career-ending for electricians who regularly use these materials. Prevention through proper RPE, ventilation, and skin protection is essential.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT one of the nine GHS/CLP hazard pictograms?",
    options: [
      "Flame",
      "Skull and crossbones",
      "Radioactive trefoil",
      "Exploding bomb",
    ],
    correctAnswer: 2,
    explanation:
      "The radioactive trefoil is not one of the nine GHS/CLP hazard pictograms. The nine pictograms are: flame, exploding bomb, oxidising flame over circle, gas cylinder, corrosion, skull and crossbones, health hazard (silhouette), exclamation mark, and environment (dead tree and fish). Radioactive materials are classified under separate regulations (IRR 2017 in the UK).",
  },
  {
    id: 2,
    question:
      "What physical form do welding fumes take when they enter the atmosphere?",
    options: [
      "Liquid droplets (mist)",
      "Very fine solid particles formed by condensation of vaporised metal",
      "Invisible gas",
      "Coarse dust particles",
    ],
    correctAnswer: 1,
    explanation:
      "Welding fumes are very fine solid particles formed when vaporised metal condenses in the air. The intense heat of the welding arc vaporises the base metal, filler rod, and any coatings. As the vapour cools rapidly, it condenses into extremely fine particles (typically less than 1 micrometre) that remain suspended in the air and can penetrate deep into the lungs. Since 2019, the HSE has classified all welding fume as a carcinogen.",
  },
  {
    id: 3,
    question:
      "Under CLP, what signal word is used for the most severe hazard categories?",
    options: ["Caution", "Warning", "Danger", "Fatal"],
    correctAnswer: 2,
    explanation:
      'The signal word "Danger" is used for the most severe hazard categories under CLP. "Warning" is used for less severe categories. These are the only two signal words in the CLP system. Some lower hazard categories have no signal word at all. The signal word appears on the product label alongside the hazard pictogram(s) and hazard statements.',
  },
  {
    id: 4,
    question:
      "What is the workplace exposure limit (WEL) for respirable crystalline silica dust?",
    options: ["10 mg/m\u00B3", "4 mg/m\u00B3", "1 mg/m\u00B3", "0.1 mg/m\u00B3"],
    correctAnswer: 3,
    explanation:
      "The WEL for respirable crystalline silica (RCS) is 0.1 mg/m\u00B3 as an 8-hour TWA. This is significantly lower than the general respirable dust limit of 4 mg/m\u00B3 because silica is classified as a Group 1 carcinogen (IARC). Silica dust is generated when cutting, drilling, grinding, or chasing concrete, brick, stone, or mortar \u2014 all common activities in electrical installation work.",
  },
  {
    id: 5,
    question:
      "Which hazard group of biological agent can cause severe human disease AND may spread to the community, with no effective treatment available?",
    options: ["Group 1", "Group 2", "Group 3", "Group 4"],
    correctAnswer: 3,
    explanation:
      "Hazard Group 4 biological agents cause severe human disease, present a serious hazard to workers, may spread to the community, and there is usually no effective prophylaxis or treatment available. Examples include Ebola virus and Marburg virus. Group 3 agents can cause severe disease and may spread but effective treatment or prophylaxis is usually available (e.g. hepatitis B, tuberculosis).",
  },
  {
    id: 6,
    question:
      "A substance classified as a CMR is toxic to which of the following?",
    options: [
      "The cardiovascular system only",
      "The central nervous system only",
      "It can cause cancer, genetic mutations, or damage to reproduction",
      "The musculoskeletal system only",
    ],
    correctAnswer: 2,
    explanation:
      "CMR stands for Carcinogen, Mutagen, or substance toxic to Reproduction. Carcinogens cause cancer. Mutagens cause heritable genetic damage. Reprotoxins can impair fertility or harm the developing foetus. CMRs have special requirements under COSHH \u2014 exposure must be reduced to as low as is reasonably practicable, and substitution with a less hazardous substance must be considered as a priority.",
  },
  {
    id: 7,
    question:
      "Once a person becomes sensitised to a substance such as epoxy resin, what is the long-term consequence?",
    options: [
      "They will build up immunity over time",
      "They can continue working with reduced exposure",
      "The sensitisation is irreversible \u2014 even tiny future exposures may trigger severe allergic reactions",
      "Antihistamine medication will fully prevent reactions",
    ],
    correctAnswer: 2,
    explanation:
      "Sensitisation is irreversible. Once the immune system has developed an allergic response to a substance, even minute future exposures can trigger severe reactions \u2014 including occupational asthma (respiratory sensitisers) or severe dermatitis (skin sensitisers). The affected person may never be able to work with that substance again. This is why prevention is critical: proper RPE, LEV, gloves, and barrier creams must be used from the very first exposure.",
  },
  {
    id: 8,
    question:
      "Which of the following correctly lists the physical forms a hazardous substance can take?",
    options: [
      "Solid, liquid, gas only",
      "Solid, liquid, gas, vapour, mist, fume, dust, fibre",
      "Powder, liquid, smoke",
      "Dust, fume, gas only",
    ],
    correctAnswer: 1,
    explanation:
      "Hazardous substances can exist in eight physical forms: solids, liquids, gases, vapours, mists, fumes, dusts, and fibres. Understanding the physical form is essential because it determines how the substance enters the body (route of exposure), how far it can travel in the air, how deep it penetrates the respiratory system, and what control measures are needed.",
  },
];

export default function CoshhAwarenessModule1Section2() {
  useSEO({
    title: "Types of Hazardous Substances | COSHH Awareness Module 1.2",
    description:
      "Classification of hazardous substances by physical form, GHS/CLP system, hazard pictograms, chemical hazards, dusts, fumes, biological agents, CMRs, and sensitisers in the workplace.",
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
            <Link to="../coshh-awareness-module-1">
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
            <Layers className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Types of Hazardous Substances
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How hazardous substances are classified by physical form, the
            GHS/CLP system, chemical hazards, dusts, fumes, biological agents,
            CMRs, and sensitisers
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
                <strong>8 physical forms:</strong> solids, liquids, gases,
                vapours, mists, fumes, dusts, fibres
              </li>
              <li>
                <strong>9 GHS pictograms:</strong> standardised hazard symbols
                on red diamond labels
              </li>
              <li>
                <strong>4 biological hazard groups:</strong> from low risk
                (Group 1) to severe with no treatment (Group 4)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400/90 text-base font-medium mb-2">
              Key Limits
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Inhalable dust WEL:</strong> 10 mg/m&sup3; (8-hr TWA)
              </li>
              <li>
                <strong>Respirable dust WEL:</strong> 4 mg/m&sup3; (8-hr TWA)
              </li>
              <li>
                <strong>Silica dust WEL:</strong> 0.1 mg/m&sup3; &mdash; a
                Group 1 carcinogen
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
              "Classify hazardous substances by their eight physical forms and explain why form matters for exposure control",
              "Identify the nine GHS/CLP hazard pictograms and explain what each represents",
              "Distinguish between hazard statements (H-codes), precautionary statements (P-codes), and signal words",
              "Describe common chemical hazards encountered in electrical installation work",
              "Explain the health risks of dusts, fumes, and biological agents, including workplace exposure limits",
              "Define CMRs and sensitisers and explain their special requirements under COSHH",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 01: Introduction to Hazardous Substance Types        */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            Introduction to Hazardous Substance Types
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The COSHH Regulations 2002 cover a vast range of substances that
                can harm health. Before you can control a hazardous substance,
                you need to understand <strong>what it is</strong>,{" "}
                <strong>what form it takes</strong>, and{" "}
                <strong>how it is classified</strong>. This section introduces
                the different ways hazardous substances are categorised &mdash;
                by physical form, by chemical type, and by regulatory
                classification.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Why This Matters:</strong>{" "}
                  The physical form of a substance determines how it enters the
                  body, how far it travels in the air, how deep it penetrates
                  the lungs, and what control measures are effective. A substance
                  that is harmless as a solid block can be lethal as a fine dust
                  or vapour. Understanding substance types is the foundation of
                  every COSHH risk assessment.
                </p>
              </div>

              <p>
                COSHH covers chemicals, products containing chemicals, fumes,
                dusts, vapours, mists, nanotechnology particles, biological
                agents (bacteria, viruses, fungi), and any other substance that
                is connected with work and can damage health. The only
                substances excluded from COSHH are asbestos (covered by CAR
                2012), lead (covered by the Control of Lead at Work Regulations
                2002), radioactive materials (covered by IRR 2017), and
                substances that are hazardous only because they are at high
                pressure, extreme temperature, or are explosive or flammable
                (covered by other specific regulations).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Substances Covered by COSHH Include
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Chemicals used directly at work &mdash; adhesives,
                      solvents, paints, resins, cleaning agents
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Substances generated by work processes &mdash; welding
                      fume, wood dust, silica dust, solder fume
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Naturally occurring substances &mdash; grain dust, flour
                      dust, enzyme proteins
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Biological agents &mdash; bacteria, viruses, fungi,
                      parasites encountered at work
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 02: Physical Forms of Hazardous Substances           */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            Physical Forms of Hazardous Substances
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Hazardous substances can exist in eight distinct physical forms.
                The form determines the route of exposure, how the substance
                behaves in the working environment, and what control measures are
                required. Many substances can exist in more than one form
                depending on how they are used &mdash; for example, a solid
                metal becomes a fume when welded.
              </p>

              {/* Physical Forms Classification Diagram */}
              <div className="bg-white/5 border border-violet-500/30 rounded-xl overflow-hidden">
                <div className="bg-violet-500/10 border-b border-violet-500/30 px-4 py-3 text-center">
                  <p className="text-sm font-bold text-violet-400">
                    Physical Forms Classification
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    Eight forms of hazardous substances
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 p-0.5">
                  {[
                    {
                      form: "Solids",
                      desc: "Intact materials \u2014 hazardous when cut, ground, or heated to release particles",
                      example: "Lead, calcium silicate board, cement",
                    },
                    {
                      form: "Liquids",
                      desc: "Can splash onto skin/eyes or give off vapours when heated or agitated",
                      example: "Acids, solvents, oils, liquid adhesives",
                    },
                    {
                      form: "Gases",
                      desc: "Substances that are gaseous at room temperature \u2014 can displace oxygen or be toxic",
                      example: "Carbon monoxide, chlorine, hydrogen sulphide",
                    },
                    {
                      form: "Vapours",
                      desc: "Gaseous form of substances normally liquid at room temperature",
                      example: "Solvent vapours, petrol vapour, paint thinner",
                    },
                    {
                      form: "Mists",
                      desc: "Tiny liquid droplets suspended in air, often from spraying processes",
                      example: "Oil mist, paint spray mist, coolant mist",
                    },
                    {
                      form: "Fumes",
                      desc: "Very fine solid particles formed by condensation of vaporised material (usually metal)",
                      example: "Welding fume, solder fume, PVC fume",
                    },
                    {
                      form: "Dusts",
                      desc: "Solid particles generated by mechanical action \u2014 cutting, grinding, drilling, sanding",
                      example: "Silica dust, wood dust, cement dust, plaster dust",
                    },
                    {
                      form: "Fibres",
                      desc: "Elongated solid particles with length-to-width ratio \u2265 3:1",
                      example: "Man-made mineral fibres (MMMF), ceramic fibres",
                    },
                  ].map((item) => (
                    <div
                      key={item.form}
                      className="bg-[#1a1a1a] p-3 sm:p-4"
                    >
                      <p className="text-sm font-semibold text-violet-400 mb-1">
                        {item.form}
                      </p>
                      <p className="text-xs text-white/80 mb-1.5">
                        {item.desc}
                      </p>
                      <p className="text-xs text-white/50">
                        <em>e.g. {item.example}</em>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Key Principle:
                  </strong>{" "}
                  The smaller the particle, the deeper it penetrates into the
                  respiratory system. Coarse dust particles are trapped in the
                  nose and upper airways. Fine respirable dust reaches the
                  alveoli (gas exchange region) deep in the lungs. Fume
                  particles are even smaller &mdash; typically less than 1
                  micrometre &mdash; and can penetrate into the bloodstream via
                  the alveoli.
                </p>
              </div>

              <p>
                Understanding physical form is critical for selecting the right
                control measures. A local exhaust ventilation (LEV) system that
                captures dust may not be effective against vapours. A chemical
                cartridge respirator designed for organic vapours will not
                protect against particulates. The COSHH assessment must consider
                the form the substance takes during the actual work activity,
                not just its form in the container.
              </p>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 03: The GHS/CLP Classification System                */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            The GHS/CLP Classification System
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Globally Harmonised System of Classification and
                Labelling of Chemicals (GHS)</strong> is an internationally
                agreed system for classifying hazardous chemicals and
                communicating information about their hazards through
                standardised labels and safety data sheets. In the UK and EU,
                GHS is implemented through the{" "}
                <strong>
                  CLP Regulation (Classification, Labelling and Packaging)
                </strong>
                .
              </p>

              <p>
                Before GHS/CLP, different countries used different
                classification systems. A substance classified as
                &ldquo;toxic&rdquo; in one country might have been labelled
                &ldquo;harmful&rdquo; in another. This was dangerous for
                international trade and for workers who encountered imported
                products. GHS created a single, worldwide standard.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Three Key Elements of GHS/CLP Labels
                </p>
                <div className="space-y-3">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <p className="text-sm font-semibold text-violet-400 mb-1">
                      1. Hazard Pictograms
                    </p>
                    <p className="text-xs text-white/80">
                      Red diamond-shaped symbols that give an immediate visual
                      indication of the type of hazard. There are 9 pictograms,
                      each representing a different category of hazard.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <p className="text-sm font-semibold text-violet-400 mb-1">
                      2. Signal Words
                    </p>
                    <p className="text-xs text-white/80">
                      Either <strong className="text-white">&ldquo;Danger&rdquo;</strong>{" "}
                      (for the most severe hazards) or{" "}
                      <strong className="text-white">&ldquo;Warning&rdquo;</strong> (for
                      less severe hazards). Some categories have no signal word
                      at all.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <p className="text-sm font-semibold text-violet-400 mb-1">
                      3. Hazard &amp; Precautionary Statements
                    </p>
                    <p className="text-xs text-white/80">
                      <strong className="text-white">H-codes</strong> (Hazard
                      statements) describe the nature of the hazard (e.g. H314:
                      &ldquo;Causes severe skin burns and eye damage&rdquo;).{" "}
                      <strong className="text-white">P-codes</strong>{" "}
                      (Precautionary statements) describe protective measures
                      (e.g. P280: &ldquo;Wear protective gloves&rdquo;).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  H-Code Numbering System
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H2xx</strong> &mdash;
                      Physical hazards (flammable, explosive, oxidising,
                      corrosive to metals)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H3xx</strong> &mdash;
                      Health hazards (acute toxicity, skin corrosion,
                      sensitisation, carcinogenicity)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H4xx</strong> &mdash;
                      Environmental hazards (aquatic toxicity)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Safety Data Sheets (SDS) Are Mandatory
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Every hazardous substance supplied for workplace use must be
                  accompanied by a{" "}
                  <strong className="text-white">Safety Data Sheet (SDS)</strong>{" "}
                  in the required CLP format. The SDS contains 16 sections
                  covering identification, hazards, composition, first aid,
                  fire-fighting measures, exposure controls, and disposal. The
                  SDS is the primary source of information for your COSHH
                  assessment. If a product does not have an SDS, do not use it
                  until one is obtained.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 04: GHS Hazard Pictograms                            */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">04</span>
            GHS Hazard Pictograms
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The GHS/CLP system uses nine standardised hazard pictograms.
                Each is displayed as a black symbol on a white background within
                a red diamond-shaped border. Every worker should be able to
                recognise these symbols instantly &mdash; they provide an
                immediate visual warning before you even read the label text.
              </p>

              {/* GHS Pictograms Grid Diagram */}
              <div className="bg-white/5 border border-violet-500/30 rounded-xl overflow-hidden">
                <div className="bg-violet-500/10 border-b border-violet-500/30 px-4 py-3 text-center">
                  <p className="text-sm font-bold text-violet-400">
                    GHS Pictograms Grid
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    Nine standardised hazard symbols under CLP
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 p-0.5">
                  {[
                    {
                      symbol: "GHS01",
                      name: "Exploding Bomb",
                      hazards:
                        "Explosives, self-reactive substances, organic peroxides",
                      example: "Detonators, some organic peroxides used in resin curing",
                    },
                    {
                      symbol: "GHS02",
                      name: "Flame",
                      hazards:
                        "Flammable gases, liquids, solids, aerosols, self-reactive, pyrophoric, self-heating",
                      example:
                        "Acetone, white spirit, contact adhesives, aerosol sprays",
                    },
                    {
                      symbol: "GHS03",
                      name: "Flame over Circle",
                      hazards: "Oxidising gases, liquids, solids",
                      example:
                        "Oxygen cylinders, hydrogen peroxide, bleach concentrates",
                    },
                    {
                      symbol: "GHS04",
                      name: "Gas Cylinder",
                      hazards:
                        "Gases under pressure \u2014 compressed, liquefied, dissolved, refrigerated",
                      example: "Argon, CO\u2082, nitrogen, propane cylinders",
                    },
                    {
                      symbol: "GHS05",
                      name: "Corrosion",
                      hazards:
                        "Corrosive to skin, serious eye damage, corrosive to metals",
                      example:
                        "Hydrochloric acid, sodium hydroxide (caustic soda), battery acid",
                    },
                    {
                      symbol: "GHS06",
                      name: "Skull & Crossbones",
                      hazards: "Acute toxicity (fatal or toxic if swallowed, inhaled, or in contact with skin)",
                      example:
                        "Methanol, certain pesticides, hydrogen cyanide",
                    },
                    {
                      symbol: "GHS07",
                      name: "Exclamation Mark",
                      hazards:
                        "Harmful, irritant, skin/eye irritation, narcotic effects, respiratory tract irritation, hazardous to ozone layer",
                      example:
                        "Many cleaning products, some solvents, cement powder",
                    },
                    {
                      symbol: "GHS08",
                      name: "Health Hazard",
                      hazards:
                        "Carcinogenicity, mutagenicity, reproductive toxicity, respiratory sensitisation, STOT, aspiration hazard",
                      example:
                        "Benzene, silica dust, isocyanates, some epoxy hardeners",
                    },
                    {
                      symbol: "GHS09",
                      name: "Environment",
                      hazards:
                        "Hazardous to aquatic environment (acute and chronic)",
                      example:
                        "Many pesticides, some solvents, waste oils, transformer PCBs",
                    },
                  ].map((item) => (
                    <div key={item.symbol} className="bg-[#1a1a1a] p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded bg-white/10 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400 flex-shrink-0 rotate-45">
                          <span className="-rotate-45">{item.symbol.replace("GHS0", "")}</span>
                        </div>
                        <p className="text-sm font-semibold text-violet-400">
                          {item.name}
                        </p>
                      </div>
                      <p className="text-xs text-white/80 mb-1.5">
                        {item.hazards}
                      </p>
                      <p className="text-xs text-white/50">
                        <em>e.g. {item.example}</em>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    GHS08 &mdash; The One to Watch:
                  </strong>{" "}
                  The &ldquo;health hazard&rdquo; pictogram (silhouette with a
                  starburst on the chest) is particularly important because it
                  indicates the most serious chronic health effects: cancer,
                  genetic damage, reproductive toxicity, respiratory
                  sensitisation, and specific target organ toxicity. Many
                  substances you encounter in electrical work carry this
                  pictogram &mdash; including isocyanate-based foams, some epoxy
                  hardeners, and silica-generating activities.
                </p>
              </div>

              <p>
                A single product can carry multiple pictograms. For example, a
                solvent-based adhesive might display the flame (flammable), the
                exclamation mark (irritant), and the health hazard (contains a
                respiratory sensitiser). You must read all the information on
                the label and SDS, not just react to the most obvious pictogram.
              </p>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 05: Chemical Hazards in the Workplace                */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">05</span>
            Chemical Hazards in the Workplace
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Chemical hazards in the workplace can be grouped into categories
                based on their chemical nature and the types of harm they cause.
                Electricians encounter many of these daily &mdash; from
                solvent-based adhesives and cable-pulling lubricants to the
                acids in batteries and the resins used in cable joints.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Acids
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">What they are:</strong>{" "}
                        Substances with a pH below 7 that can corrode skin,
                        eyes, and metals
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Examples:</strong>{" "}
                        Sulphuric acid (lead-acid batteries), hydrochloric acid
                        (brick/mortar cleaning), phosphoric acid (rust removers)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Risks:</strong> Severe
                        skin burns, permanent eye damage, toxic fumes when
                        heated or mixed with other chemicals
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Alkalis (Bases)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">What they are:</strong>{" "}
                        Substances with a pH above 7 &mdash; often more
                        damaging to skin than acids because they dissolve tissue
                        without immediate pain
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Examples:</strong> Wet
                        cement (calcium hydroxide, pH ~12-13), caustic soda,
                        lime, strong degreasing agents
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Risks:</strong> Deep
                        alkali burns (penetrate further than acid burns), cement
                        dermatitis, chrome ulceration from hexavalent chromium
                        in wet cement
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Solvents
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">What they are:</strong>{" "}
                        Liquids that dissolve other substances. Many are
                        volatile (evaporate readily), producing flammable or
                        toxic vapours
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Examples:</strong>{" "}
                        Acetone, white spirit, toluene, xylene, isopropyl
                        alcohol, trichloroethylene
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Risks:</strong>{" "}
                        Dizziness, headaches, narcotic effects (drowsiness,
                        loss of coordination), skin defatting/dermatitis, liver
                        and kidney damage with chronic exposure, some are
                        carcinogenic (benzene)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-white mb-2">
                      Adhesives &amp; Resins
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Epoxy resins (cable joints, potting compounds)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Cyanoacrylate adhesives (superglues)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Polyurethane sealants and foams (isocyanate-based)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Risk: skin/respiratory sensitisation, dermatitis, occupational asthma
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-white mb-2">
                      Paints, Oils &amp; Fuels
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Solvent-based paints (flammable, narcotic vapours)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Cutting oils and lubricants (dermatitis, oil acne)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Diesel and petrol (skin defatting, benzene in petrol)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Transformer oil (older oils may contain PCBs)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Mix Chemicals
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Mixing chemicals can create reactions that are far more
                  dangerous than either substance alone. Mixing acid with bleach
                  produces toxic chlorine gas. Mixing different solvents can
                  increase fire risk. Even mixing cleaning products can produce
                  toxic fumes. Always follow the SDS and never mix substances
                  unless the manufacturer&rsquo;s instructions specifically
                  require it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 06: Dust — The Silent Killer                         */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">06</span>
            Dust &mdash; The Silent Killer
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dust is one of the most underestimated hazards in the
                construction industry. It causes more deaths than falls from
                height. The HSE estimates that occupational lung disease causes{" "}
                <strong>approximately 12,000 deaths per year in the UK</strong>,
                with construction workers being among the most affected groups.
                Many of these deaths are caused by dust exposure that occurred
                decades earlier.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Why &ldquo;Silent Killer&rdquo;?
                  </strong>{" "}
                  Dust particles small enough to cause serious lung disease are
                  invisible to the naked eye. You cannot see respirable dust.
                  The visible cloud of dust you see when cutting concrete is
                  mostly coarse particles that are filtered out by the nose and
                  throat. The real danger is the invisible fraction that passes
                  through your airways and reaches the deepest parts of your
                  lungs &mdash; and stays there permanently.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Dust Categories and Workplace Exposure Limits
                </p>
                <div className="space-y-3">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-violet-400">
                        Inhalable Dust
                      </p>
                      <span className="text-xs font-mono bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded">
                        WEL: 10 mg/m&sup3;
                      </span>
                    </div>
                    <p className="text-xs text-white/80">
                      Particles that can enter the nose and mouth during
                      breathing. Includes all particle sizes up to about 100
                      micrometres. Trapped by the upper respiratory tract (nose,
                      throat, upper airways). Can cause rhinitis, pharyngitis,
                      and upper airway irritation.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-violet-400">
                        Respirable Dust
                      </p>
                      <span className="text-xs font-mono bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded">
                        WEL: 4 mg/m&sup3;
                      </span>
                    </div>
                    <p className="text-xs text-white/80">
                      Particles small enough (less than ~10 micrometres) to
                      penetrate past the upper airways and reach the alveoli
                      &mdash; the gas exchange region deep in the lungs. These
                      particles cannot be cleared by normal lung defences and
                      accumulate over time, causing progressive lung damage.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-red-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-red-400">
                        Respirable Crystalline Silica (RCS)
                      </p>
                      <span className="text-xs font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                        WEL: 0.1 mg/m&sup3;
                      </span>
                    </div>
                    <p className="text-xs text-white/80">
                      Classified as a <strong className="text-white">Group 1 carcinogen</strong> by
                      IARC. Generated when cutting, drilling, grinding, or
                      chasing concrete, brick, stone, mortar, or sandstone.{" "}
                      <strong className="text-white">
                        Extremely common in electrical installation work
                      </strong>{" "}
                      (chasing walls, drilling holes, cutting chases for
                      trunking). Causes silicosis, lung cancer, COPD, and
                      kidney disease. The WEL is 40 times lower than general
                      respirable dust.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Other Specific Dusts With Lower WELs
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hardwood dust:</strong>{" "}
                      WEL 3 mg/m&sup3; &mdash; classified as a nasal
                      carcinogen. Generated when drilling through hardwood
                      floors, dado rails, or timber frames
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Softwood dust:</strong>{" "}
                      WEL 5 mg/m&sup3; &mdash; causes occupational asthma
                      and rhinitis in sensitised individuals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cement dust:</strong>{" "}
                      Contains hexavalent chromium (a skin sensitiser) and
                      calcium compounds (alkaline, pH 12-13). Causes cement
                      dermatitis and respiratory irritation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Plaster dust:</strong>{" "}
                      Gypsum-based, causes respiratory irritation and eye
                      irritation. Generated when chasing into plasterboard
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Electricians and Silica Dust
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Electrical installers are among the most silica-exposed
                  workers in construction. Chasing walls for cables, drilling
                  holes through concrete floors and blockwork, cutting chases
                  for trunking and conduit, and core drilling for containment
                  all generate respirable crystalline silica. Every one of
                  these tasks requires dust suppression (water), local exhaust
                  ventilation (on-tool extraction), or both. A dust mask alone
                  is <strong className="text-white">not sufficient</strong> as
                  the sole control measure for silica dust.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 07: Fumes, Vapours & Gases                           */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">07</span>
            Fumes, Vapours &amp; Gases
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fumes, vapours, and gases are airborne hazards that enter the
                body primarily through inhalation. They behave differently in
                the workplace and require different control strategies. It is
                important to understand the distinction between them.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Fumes
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    Fumes are very fine solid particles formed when a material
                    is heated to the point of vaporisation and then condenses
                    rapidly in the air. The particles are typically less than 1
                    micrometre in diameter &mdash; far smaller than dust &mdash;
                    and can remain airborne for hours.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-[#1a1a1a] p-3 rounded-lg">
                      <p className="text-xs font-semibold text-violet-400 mb-1">
                        Welding Fume
                      </p>
                      <p className="text-xs text-white/80">
                        Generated by the intense heat of the welding arc, which
                        vaporises the base metal, filler material, coatings
                        (zinc galvanising, paint, primer), and flux. The vapour
                        condenses into extremely fine metallic particles. Since{" "}
                        <strong className="text-white">February 2019</strong>,
                        the HSE reclassified all welding fume (including mild
                        steel welding fume) as a human carcinogen. All welding
                        must now be carried out with adequate LEV or RPE
                        &mdash; even outdoors in some circumstances.
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3 rounded-lg">
                      <p className="text-xs font-semibold text-violet-400 mb-1">
                        Solder Fume
                      </p>
                      <p className="text-xs text-white/80">
                        Produced when soldering electronic components or
                        plumbing joints. The fume comes primarily from the flux,
                        not the solder itself. Rosin-based flux (colophony)
                        releases fume that is a potent respiratory sensitiser
                        and a cause of occupational asthma. Once sensitised,
                        even tiny exposures can trigger severe asthma attacks.
                        Lead-free solder still produces hazardous rosin fume.
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3 rounded-lg">
                      <p className="text-xs font-semibold text-violet-400 mb-1">
                        PVC Fume
                      </p>
                      <p className="text-xs text-white/80">
                        Generated when PVC (polyvinyl chloride) is heated,
                        burned, or cut with hot tools. PVC is common in
                        electrical cable insulation, conduit, and trunking. When
                        heated above 200&deg;C, PVC releases hydrogen chloride
                        gas and other toxic decomposition products. In fires,
                        burning PVC produces extremely toxic fumes including
                        dioxins and furans. Never burn PVC cable insulation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Vapours
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    Vapours are the gaseous form of substances that are normally
                    liquid at room temperature. They form when a liquid
                    evaporates. The more volatile a liquid (the lower its
                    boiling point), the more readily it produces vapours.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Solvent vapours:</strong>{" "}
                        From paints, adhesives, cleaning agents, degreasers.
                        Cause headaches, dizziness, drowsiness, and liver/kidney
                        damage with prolonged exposure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Isocyanate vapours:
                        </strong>{" "}
                        From spray foam insulation, two-pack paints, and
                        polyurethane coatings. Extremely potent respiratory
                        sensitisers with very low WELs (typically 0.02 mg/m&sup3;)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Fuel vapours:
                        </strong>{" "}
                        Petrol vapour is heavier than air and accumulates in low-lying
                        areas, creating fire and explosion risks as well as
                        inhalation hazards (benzene content)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Gases
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    Gases are substances that exist in the gaseous state at
                    normal room temperature and pressure. They may be toxic,
                    asphyxiant (displacing oxygen), or both.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Carbon monoxide (CO):
                        </strong>{" "}
                        Colourless, odourless, lethal. Produced by incomplete
                        combustion of fuels. Binds to haemoglobin 200-250 times
                        more strongly than oxygen
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Hydrogen sulphide (H&sub2;S):
                        </strong>{" "}
                        &ldquo;Rotten egg&rdquo; smell at low concentrations,
                        but at higher concentrations it deadens the sense of
                        smell &mdash; making it undetectable and extremely
                        dangerous. Found in sewers, drains, and confined spaces
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Nitrogen/argon/CO&sub2;:
                        </strong>{" "}
                        Simple asphyxiants that displace oxygen in enclosed
                        spaces. Not toxic themselves but cause suffocation by
                        reducing the oxygen concentration below 19.5%
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          SF&sub6; (sulphur hexafluoride):
                        </strong>{" "}
                        Used as an insulating gas in high-voltage switchgear.
                        Non-toxic but a potent greenhouse gas and a simple
                        asphyxiant in enclosed spaces. Decomposition products
                        (from electrical arcing) are highly toxic
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Confined Spaces
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Gases, vapours, and fumes are particularly dangerous in
                  confined spaces (tanks, voids, risers, ceiling spaces,
                  basements, ducts) where they can accumulate to lethal
                  concentrations. Electricians frequently work in confined or
                  poorly ventilated spaces. Always check the atmosphere before
                  entry, ensure adequate ventilation, and follow the Confined
                  Spaces Regulations 1997. Never enter a confined space without
                  a safe system of work and a permit to work where required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 08: Biological Agents                                */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">08</span>
            Biological Agents
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Biological agents are micro-organisms (and the toxins they
                produce) that can cause infection, allergy, or toxic effects in
                humans. They are covered by COSHH because they are substances
                hazardous to health encountered at work. In construction and
                electrical work, biological agents are more common than many
                workers realise.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Types of Biological Agent
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bacteria:</strong>{" "}
                      Single-celled organisms. Examples relevant to
                      construction: Leptospira (causes Weil&rsquo;s disease
                      &mdash; spread through rat urine in water), Legionella
                      (Legionnaires&rsquo; disease &mdash; water systems,
                      cooling towers), tetanus (Clostridium tetani &mdash; soil
                      contamination through puncture wounds)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Viruses:</strong>{" "}
                      Sub-microscopic infectious agents. Examples: hepatitis B
                      and C (bloodborne, risk from sharps injuries), norovirus
                      (contaminated welfare facilities), respiratory viruses
                      (person-to-person transmission on site)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fungi:</strong> Including
                      moulds, yeasts, and fungal spores. Examples: Aspergillus
                      (found in damp buildings, causes aspergillosis and
                      allergic reactions), dry rot fungi, mould spores in
                      ceiling voids and damp wall cavities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Parasites:</strong>{" "}
                      Organisms that live on or in a host. Examples: roundworms
                      in contaminated soil (toxocariasis), bird mites in loft
                      spaces, parasites in untreated water
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Four Hazard Groups
                </p>
                <div className="space-y-2">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono bg-green-500/20 text-green-300 px-2 py-0.5 rounded">
                        Group 1
                      </span>
                      <span className="text-xs text-white/50">
                        Lowest risk
                      </span>
                    </div>
                    <p className="text-xs text-white/80">
                      Unlikely to cause human disease. No special precautions
                      beyond standard hygiene.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded">
                        Group 2
                      </span>
                      <span className="text-xs text-white/50">
                        Moderate risk
                      </span>
                    </div>
                    <p className="text-xs text-white/80">
                      Can cause human disease. May be a hazard to workers but is
                      unlikely to spread to the community. Effective
                      prophylaxis or treatment is usually available. E.g.
                      Legionella, Leptospira.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded">
                        Group 3
                      </span>
                      <span className="text-xs text-white/50">High risk</span>
                    </div>
                    <p className="text-xs text-white/80">
                      Can cause severe human disease. Presents a serious hazard
                      to workers and may spread to the community, but effective
                      prophylaxis or treatment is usually available. E.g.
                      hepatitis B, tuberculosis, anthrax.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-red-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                        Group 4
                      </span>
                      <span className="text-xs text-white/50">
                        Extreme risk
                      </span>
                    </div>
                    <p className="text-xs text-white/80">
                      Causes severe human disease. Presents a serious hazard to
                      workers. Likely to spread to the community. No effective
                      prophylaxis or treatment available. E.g. Ebola virus,
                      Marburg virus. (Extremely unlikely in construction but
                      included in the classification system.)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    For Electricians:
                  </strong>{" "}
                  The most relevant biological risks in electrical work include
                  Weil&rsquo;s disease (leptospirosis) when working in areas
                  with rat contamination (basements, drains, old buildings),
                  Legionella when working on or near water systems, mould
                  spores when opening up damp wall cavities or ceiling voids,
                  bird and bat droppings in loft spaces (histoplasmosis risk),
                  and tetanus from puncture wounds on contaminated sites.
                  Ensure tetanus vaccination is up to date and always wash
                  hands before eating, drinking, or smoking on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 09: Carcinogens, Mutagens & Sensitisers              */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">09</span>
            Carcinogens, Mutagens &amp; Sensitisers
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain categories of hazardous substance are considered so
                dangerous that COSHH imposes additional, stricter requirements
                for their control. These are{" "}
                <strong>carcinogens, mutagens, and substances toxic to
                reproduction (CMRs)</strong>, and{" "}
                <strong>sensitisers</strong> (both respiratory and skin).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Carcinogens
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Definition:</strong>{" "}
                      Substances that can cause cancer or increase the risk of
                      cancer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">CLP classification:</strong>{" "}
                      Category 1A (known human carcinogen), Category 1B
                      (presumed human carcinogen), Category 2 (suspected human
                      carcinogen)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Examples in electrical work:
                      </strong>{" "}
                      Respirable crystalline silica (from concrete/brick
                      cutting), welding fume, benzene (in some solvents and
                      petrol), hexavalent chromium (in stainless steel welding
                      fume and wet cement), some wood dusts (hardwood)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H-codes:</strong> H350
                      (&ldquo;May cause cancer&rdquo;), H351 (&ldquo;Suspected
                      of causing cancer&rdquo;)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Mutagens
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Definition:</strong>{" "}
                      Substances that can cause heritable genetic damage
                      (mutations in DNA that can be passed to offspring)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H-codes:</strong> H340
                      (&ldquo;May cause genetic defects&rdquo;), H341
                      (&ldquo;Suspected of causing genetic defects&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Key point:</strong>{" "}
                      Mutations are heritable &mdash; they affect not just the
                      exposed worker but potentially their future children
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Substances Toxic to Reproduction (Reprotoxins)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Definition:</strong>{" "}
                      Substances that can impair fertility in men or women, or
                      cause developmental harm to the unborn child
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">H-codes:</strong> H360
                      (&ldquo;May damage fertility or the unborn child&rdquo;),
                      H361 (&ldquo;Suspected of damaging fertility or the
                      unborn child&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Examples:</strong> Lead
                      compounds, some glycol ethers (in certain paints and
                      coatings), carbon disulphide, some pesticides
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Special COSHH Requirements for CMRs
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    COSHH imposes additional requirements when working with CMR
                    substances (Regulation 11):
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Substitution</strong>{" "}
                        must be considered as a priority &mdash; can the CMR be
                        replaced with a less hazardous substance?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Exposure must be reduced to{" "}
                        <strong className="text-white">
                          as low as is reasonably practicable
                        </strong>{" "}
                        (ALARP), not just below the WEL
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The number of workers exposed must be{" "}
                        <strong className="text-white">minimised</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Health surveillance
                        </strong>{" "}
                        is mandatory for workers regularly exposed to CMRs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Exposure records must be kept for{" "}
                        <strong className="text-white">40 years</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Sensitisers
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Sensitisers are substances that cause the immune system to
                  develop a specific allergic response. There are two types:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <p className="text-xs font-semibold text-violet-400 mb-1">
                      Respiratory Sensitisers
                    </p>
                    <p className="text-xs text-white/80 mb-2">
                      Cause occupational asthma. Once sensitised, even minute
                      airborne exposures trigger bronchospasm, wheezing, and
                      breathlessness.
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Isocyanates (spray foam, 2-pack paints)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Rosin/colophony (solder flux fume)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Epoxy resin hardeners (amine-based)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Wood dusts (especially western red cedar)
                        </span>
                      </li>
                    </ul>
                    <p className="text-xs text-white/50 mt-2">
                      H-code: H334 &mdash; &ldquo;May cause allergy or asthma
                      symptoms or breathing difficulties if inhaled&rdquo;
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-lg">
                    <p className="text-xs font-semibold text-violet-400 mb-1">
                      Skin Sensitisers
                    </p>
                    <p className="text-xs text-white/80 mb-2">
                      Cause allergic contact dermatitis. Once sensitised, skin
                      contact with even tiny amounts triggers redness, itching,
                      blistering, and cracking.
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Epoxy resins (cable jointing, potting)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Hexavalent chromium (wet cement)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Nickel compounds (metalwork, plating)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Some acrylate adhesives
                        </span>
                      </li>
                    </ul>
                    <p className="text-xs text-white/50 mt-2">
                      H-code: H317 &mdash; &ldquo;May cause an allergic skin
                      reaction&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Sensitisation Is Irreversible
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Once you become sensitised to a substance, there is{" "}
                  <strong className="text-white">no cure</strong>. The immune
                  system&rsquo;s response is permanent. Even minute future
                  exposures &mdash; far below the level that caused the original
                  sensitisation &mdash; can trigger severe allergic reactions.
                  For respiratory sensitisers, this means{" "}
                  <strong className="text-white">
                    permanent occupational asthma
                  </strong>
                  . For skin sensitisers, it means{" "}
                  <strong className="text-white">
                    lifelong allergic contact dermatitis
                  </strong>
                  . Sensitisation can be{" "}
                  <strong className="text-white">career-ending</strong> for
                  electricians who regularly work with epoxy resins, solder
                  flux, or isocyanate-based products. Prevention is the only
                  effective strategy.
                </p>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Prevention for Electricians:
                  </strong>{" "}
                  When using epoxy resins for cable joints, always wear
                  chemical-resistant gloves (nitrile, not latex), use barrier
                  cream on exposed skin, work in well-ventilated areas, and
                  never handle mixed resin with bare hands. When soldering,
                  always use fume extraction (a bench-top LEV unit or tip
                  extraction). When working near spray foam insulation, ensure
                  the area is cleared and ventilated before you enter &mdash;
                  isocyanate vapour can persist for hours after spraying. Health
                  surveillance (lung function testing and skin checks) must be
                  provided for workers regularly exposed to sensitisers.
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
            <Link to="../coshh-awareness-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: What Is COSHH?
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-1-section-3">
              Next: Routes of Exposure
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
