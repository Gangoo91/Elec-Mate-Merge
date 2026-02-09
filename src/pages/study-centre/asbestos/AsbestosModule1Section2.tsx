import { ArrowLeft, FlaskConical, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "two-families",
    question: "Asbestos minerals are divided into two families. Which family does chrysotile belong to?",
    options: [
      "Amphibole",
      "Serpentine",
      "Silicate",
      "Ite group"
    ],
    correctIndex: 1,
    explanation: "Chrysotile (white asbestos) is the only commercially used member of the serpentine group. Its fibres are curly and layered, unlike the straight, needle-like fibres of amphibole minerals (amosite, crocidolite, tremolite, actinolite, and anthophyllite)."
  },
  {
    id: "amosite-products",
    question: "Amosite (brown asbestos) is most commonly found in which of the following UK building products?",
    options: [
      "Brake linings and clutch plates",
      "Sprayed coatings on structural steelwork",
      "Asbestos insulating board (AIB) and thermal pipe lagging",
      "Floor tiles and textured coatings"
    ],
    correctIndex: 2,
    explanation: "Amosite (brown asbestos) was primarily used in asbestos insulating board (AIB), ceiling tiles, thermal insulation, and pipe section lagging. It is the second most commonly encountered type in UK buildings. Brake linings typically contained chrysotile, sprayed coatings were more commonly crocidolite, and floor tiles and textured coatings typically contained chrysotile."
  },
  {
    id: "identify-on-site",
    question: "How should you identify the type of asbestos present in a material on site?",
    options: [
      "By the colour of the material",
      "By the age of the building",
      "By laboratory analysis using Polarised Light Microscopy (PLM)",
      "By how easily the material crumbles"
    ],
    correctIndex: 2,
    explanation: "You cannot reliably identify asbestos type by visual inspection, colour, or texture alone. Colour can be misleading due to mixing, staining, paint, and weathering. The only definitive method is laboratory analysis, most commonly Polarised Light Microscopy (PLM). On site, if unsure, always presume the worst case under CAR 2012 Regulation 5."
  }
];

const faqs = [
  {
    question: "Is white asbestos (chrysotile) safer than blue or brown asbestos?",
    answer: "No. While chrysotile fibres have a different shape (curly rather than straight), all six types of asbestos are classified as Group 1 carcinogens by the WHO and IARC. Chrysotile causes all four asbestos-related diseases: mesothelioma, asbestos-related lung cancer, asbestosis, and diffuse pleural thickening. The claim that chrysotile is 'safe' or 'less dangerous' is rejected by UK law, the HSE, and the World Health Organisation. The same legal controls under CAR 2012 apply to all fibre types."
  },
  {
    question: "What are the 'contaminant' asbestos minerals and why do they matter?",
    answer: "Tremolite, actinolite, and anthophyllite are three amphibole asbestos minerals that were never used commercially in their own right. However, they occur naturally as contaminants in other minerals such as talc, vermiculite, and even chrysotile deposits. This means they can be present in products where the raw source material was contaminated. All three are classified as carcinogenic. They are important for surveyors and analysts because they can be found in unexpected locations and may not be identified without laboratory analysis."
  },
  {
    question: "Why was crocidolite (blue asbestos) banned before chrysotile in the UK?",
    answer: "Crocidolite was banned in the UK in 1985 (along with amosite) because it was recognised early on as the most dangerous type. Its fibres are the finest and most needle-like of all asbestos types, allowing them to penetrate deepest into lung tissue. Even very short exposures to crocidolite are considered hazardous. Chrysotile was not banned until 1999, partly due to industry lobbying that argued it was 'controlled use' safe. The UK eventually rejected this argument and banned all asbestos types."
  },
  {
    question: "Can you tell which type of asbestos is present just by looking at it?",
    answer: "No. Visual identification is unreliable. While raw chrysotile is typically white or grey-white, amosite is brown, and crocidolite is blue, in real building products the colour is often masked by binders, paints, staining, or weathering. Many products contain mixtures of fibre types. The only reliable method of identification is laboratory analysis using Polarised Light Microscopy (PLM) or Transmission Electron Microscopy (TEM). Under CAR 2012 Regulation 5, if you cannot confirm the type, you must presume the worst case and treat the material as if it contains the most hazardous fibre type."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How many types of asbestos are recognised and regulated under UK law?",
    options: [
      "Three (chrysotile, amosite, crocidolite)",
      "Four (chrysotile, amosite, crocidolite, tremolite)",
      "Six (chrysotile, amosite, crocidolite, tremolite, actinolite, anthophyllite)",
      "Two (serpentine and amphibole)"
    ],
    correctAnswer: 2,
    explanation: "Six types of asbestos are recognised and regulated: chrysotile (white), amosite (brown), crocidolite (blue), tremolite, actinolite, and anthophyllite. All six are classified as Group 1 carcinogens and are banned in the UK. The first three were used commercially; the latter three occur as contaminants."
  },
  {
    id: 2,
    question: "Which type of asbestos accounted for approximately 90% of all asbestos used in the UK?",
    options: [
      "Amosite (brown)",
      "Crocidolite (blue)",
      "Chrysotile (white)",
      "Tremolite"
    ],
    correctAnswer: 2,
    explanation: "Chrysotile (white asbestos) accounted for approximately 90% of all asbestos used worldwide and in the UK. It was the most versatile type, used in cement products, brake linings, roof materials, floor tiles, textured coatings (Artex), and gaskets. It was the last type to be banned in the UK in 1999."
  },
  {
    id: 3,
    question: "What is the key difference between serpentine and amphibole asbestos fibres?",
    options: [
      "Serpentine fibres are straight and needle-like; amphibole fibres are curly",
      "Serpentine fibres are curly and layered; amphibole fibres are straight and needle-like",
      "Serpentine fibres are blue; amphibole fibres are white",
      "There is no practical difference between the two families"
    ],
    correctAnswer: 1,
    explanation: "Serpentine asbestos (chrysotile) has curly, layered, flexible fibres. Amphibole asbestos (amosite, crocidolite, tremolite, actinolite, anthophyllite) has straight, needle-like, brittle fibres. This structural difference affects how the fibres behave in the lungs, though all types are carcinogenic."
  },
  {
    id: 4,
    question: "When were amosite and crocidolite banned in the UK?",
    options: [
      "1975",
      "1985",
      "1999",
      "2006"
    ],
    correctAnswer: 1,
    explanation: "Amosite (brown) and crocidolite (blue) were banned in the UK in 1985. They were recognised as particularly dangerous due to their straight, needle-like fibres. Chrysotile (white) was not banned until 1999, making the UK one of the later countries to achieve a complete ban on all asbestos types."
  },
  {
    id: 5,
    question: "Which statement about crocidolite (blue asbestos) is correct?",
    options: [
      "It was the most commonly used type in UK buildings",
      "Its fibres are the thickest of all asbestos types",
      "It has the finest, most needle-like fibres and is considered the most dangerous type",
      "It was primarily used in floor tiles and textured coatings"
    ],
    correctAnswer: 2,
    explanation: "Crocidolite (blue asbestos) has the finest, most needle-like fibres of all asbestos types, allowing them to penetrate deepest into lung tissue. It is widely considered the most dangerous type. It was used in sprayed coatings on structural steel, high-temperature pipe insulation, and some cement products. Even very short exposures are considered hazardous."
  },
  {
    id: 6,
    question: "Tremolite, actinolite, and anthophyllite are best described as:",
    options: [
      "The three most commonly used commercial asbestos types",
      "Serpentine minerals used in brake linings",
      "Amphibole minerals that occur as contaminants in other materials, not used commercially",
      "Synthetic forms of asbestos created in laboratories"
    ],
    correctAnswer: 2,
    explanation: "Tremolite, actinolite, and anthophyllite are amphibole asbestos minerals that were never used commercially in their own right. They occur naturally as contaminants in other minerals such as talc, vermiculite, and chrysotile deposits. All three are classified as carcinogenic and are important for surveyors and analysts to be aware of."
  },
  {
    id: 7,
    question: "Under CAR 2012, if you cannot confirm the type of asbestos in a material, what must you do?",
    options: [
      "Assume it is chrysotile, as this is the most common type",
      "Remove a sample yourself for testing",
      "Presume the worst case and treat it as the most hazardous fibre type",
      "Ignore it if the building was constructed after 1985"
    ],
    correctAnswer: 2,
    explanation: "Under CAR 2012 Regulation 5 (the presumption approach), if you cannot confirm the type of asbestos, you must presume the worst case. This means treating the material as if it contains the most hazardous fibre type and applying the highest level of control measures. You must never attempt to sample asbestos yourself unless you are trained and licensed to do so."
  },
  {
    id: 8,
    question: "Which of the following statements is TRUE about asbestos safety?",
    options: [
      "Chrysotile is safe if exposure is brief and controlled",
      "Only amphibole asbestos causes mesothelioma",
      "There is no safe level of exposure to any type of asbestos",
      "Asbestos is only dangerous when it is blue in colour"
    ],
    correctAnswer: 2,
    explanation: "There is no safe level of exposure to any type of asbestos. The WHO, HSE, and IARC classify all six types as Group 1 carcinogens. A single fibre exposure can theoretically cause disease. The claim that chrysotile is 'safe' at low levels is rejected by UK law. All forms of asbestos can cause mesothelioma, lung cancer, asbestosis, and diffuse pleural thickening."
  }
];

export default function AsbestosModule1Section2() {
  useSEO({
    title: "Types of Asbestos Fibres | Asbestos Awareness Module 1.2",
    description: "The six regulated types of asbestos: chrysotile (white), amosite (brown), crocidolite (blue), tremolite, actinolite, and anthophyllite. Fibre families, properties, UK ban dates, common products, and why all types are dangerous.",
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
            <Link to="../asbestos-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/20 border border-orange-500/30 mb-4">
            <FlaskConical className="h-7 w-7 text-orange-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Types of Asbestos Fibres
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The six regulated types of asbestos, their fibre families, physical properties, where they were used, UK ban dates, and why every type is dangerous
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>6 types:</strong> Chrysotile, amosite, crocidolite, tremolite, actinolite, anthophyllite</li>
              <li><strong>2 families:</strong> Serpentine (curly) and amphibole (straight, needle-like)</li>
              <li><strong>ALL are carcinogenic:</strong> No &ldquo;safe&rdquo; type exists</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Chrysotile:</strong> ~90% of UK use &mdash; banned 1999</li>
              <li><strong>Amosite &amp; crocidolite:</strong> ~5% each &mdash; banned 1985</li>
              <li><strong>Identification:</strong> Lab analysis only &mdash; never by sight alone</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Name the six regulated types of asbestos and their two mineral families",
              "Describe the physical properties of chrysotile, amosite, and crocidolite fibres",
              "Identify the common building products associated with each fibre type",
              "Explain why all six types are classified as Group 1 carcinogens",
              "State the UK ban dates for each asbestos type",
              "Understand why visual identification is unreliable and laboratory analysis is required"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Two Families of Asbestos */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            Two Families of Asbestos
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos is not a single mineral. It is a commercial term applied to six naturally occurring
                silicate minerals that share a common characteristic: they form long, thin, fibrous crystals.
                These six minerals are divided into two distinct families based on their crystal structure.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Key Distinction:</strong> The two families &mdash;
                  serpentine and amphibole &mdash; have fundamentally different fibre structures. This
                  distinction matters for identification, risk assessment, and understanding how the fibres
                  behave in the lungs. However, the critical point is that <strong>all six types are
                  classified as carcinogens</strong> and there is no &ldquo;safe&rdquo; type.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Serpentine Group</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Contains only one commercially used type: <strong className="text-white">chrysotile (white asbestos)</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fibres are <strong className="text-white">curly, flexible, and layered</strong> &mdash; like a rolled-up sheet of paper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Accounted for approximately 90% of all asbestos used worldwide</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Amphibole Group</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Contains five regulated types: <strong className="text-white">amosite (brown), crocidolite (blue), tremolite, actinolite, anthophyllite</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fibres are <strong className="text-white">straight, rigid, and needle-like</strong> &mdash; like tiny splinters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Amphibole fibres are generally more brittle and break into shorter, sharper fragments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Amosite and crocidolite were used commercially; tremolite, actinolite, and anthophyllite occur as contaminants</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">No Safe Type</p>
                </div>
                <p className="text-sm text-white/80">
                  ALL six types of asbestos are classified as <strong className="text-white">Group 1
                  carcinogens</strong> by the International Agency for Research on Cancer (IARC) and the
                  World Health Organisation (WHO). The HSE confirms there is <strong className="text-white">no
                  safe exposure level</strong> for any type. Industry claims that chrysotile is &ldquo;safer&rdquo;
                  than amphibole types are rejected by UK legislation. The same legal controls apply to all
                  fibre types under CAR 2012.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Chrysotile (White Asbestos) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">02</span>
            Chrysotile (White Asbestos)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Chrysotile is the most commonly used type of asbestos, accounting for approximately
                <strong> 90% of all asbestos used worldwide</strong>. It is the sole commercially used member
                of the serpentine mineral family. Its name comes from the Greek words <em>chrysos</em> (gold)
                and <em>tilos</em> (fibre), though the raw mineral is typically white or grey-white in colour.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Physical Properties</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fibre shape:</strong> Curly, flexible, layered (serpentine structure)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Colour:</strong> White to grey-white when raw</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Flexibility:</strong> Most flexible of all asbestos types &mdash; can be woven into textiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Heat resistance:</strong> Excellent &mdash; one reason for its widespread industrial use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Products Containing Chrysotile</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Asbestos cement products (roof sheets, gutters, downpipes, flue pipes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Textured coatings (Artex and similar decorative finishes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Floor tiles (thermoplastic tiles and vinyl floor tiles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Brake linings and clutch plates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Gaskets, rope seals, and packing materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Roofing felts and damp-proof courses</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The &ldquo;Less Dangerous&rdquo; Myth</p>
                </div>
                <p className="text-sm text-white/80">
                  Chrysotile has often been claimed to be &ldquo;less dangerous&rdquo; than amphibole types.
                  This is <strong className="text-white">misleading and rejected by UK law</strong>. Chrysotile
                  causes all four asbestos-related diseases: mesothelioma, asbestos-related lung cancer,
                  asbestosis, and diffuse pleural thickening. It was the last type to be banned in the UK
                  (1999) and is still mined and used in some countries, but the HSE, WHO, and IARC are clear:
                  <strong className="text-white"> there is no safe type or safe level of exposure</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* 3-Fibre Comparison Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">&nbsp;</span>
            Three-Fibre Comparison
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Chrysotile (White) */}
            <div className="bg-white/5 border border-orange-500/30 rounded-xl overflow-hidden">
              <div className="bg-orange-500/10 border-b border-orange-500/30 px-4 py-3 text-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 border-2 border-white/40 mx-auto mb-2" />
                <p className="text-sm font-bold text-orange-400">Chrysotile</p>
                <p className="text-xs text-white/60">White Asbestos</p>
              </div>
              <div className="px-4 py-3 space-y-2 text-xs text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/50">Family</span>
                  <span className="text-white font-medium">Serpentine</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Fibre shape</span>
                  <span className="text-white font-medium">Curly, layered</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Flexibility</span>
                  <span className="text-white font-medium">Flexible</span>
                </div>
                <hr className="border-white/10" />
                <div>
                  <span className="text-white/50">Common uses</span>
                  <p className="text-white mt-1">Cement, textured coatings, floor tiles, gaskets</p>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between">
                  <span className="text-white/50">% of UK use</span>
                  <span className="text-white font-medium">~90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Banned</span>
                  <span className="text-white font-medium">1999</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Risk</span>
                  <span className="text-red-400 font-bold text-[11px]">HIGH</span>
                </div>
                <p className="text-[11px] text-red-300/80 pt-1">Causes all 4 diseases</p>
              </div>
            </div>

            {/* Amosite (Brown) */}
            <div className="bg-white/5 border border-orange-500/30 rounded-xl overflow-hidden">
              <div className="bg-orange-500/10 border-b border-orange-500/30 px-4 py-3 text-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 border-2 border-amber-600/40 mx-auto mb-2" />
                <p className="text-sm font-bold text-orange-400">Amosite</p>
                <p className="text-xs text-white/60">Brown Asbestos</p>
              </div>
              <div className="px-4 py-3 space-y-2 text-xs text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/50">Family</span>
                  <span className="text-white font-medium">Amphibole</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Fibre shape</span>
                  <span className="text-white font-medium">Straight, spiky</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Flexibility</span>
                  <span className="text-white font-medium">Brittle</span>
                </div>
                <hr className="border-white/10" />
                <div>
                  <span className="text-white/50">Common uses</span>
                  <p className="text-white mt-1">Insulating board, ceiling tiles, pipe lagging, thermal insulation</p>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between">
                  <span className="text-white/50">% of UK use</span>
                  <span className="text-white font-medium">~5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Banned</span>
                  <span className="text-white font-medium">1985</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Risk</span>
                  <span className="text-red-400 font-bold text-[11px]">VERY HIGH</span>
                </div>
                <p className="text-[11px] text-red-300/80 pt-1">More dangerous than chrysotile</p>
              </div>
            </div>

            {/* Crocidolite (Blue) */}
            <div className="bg-white/5 border border-orange-500/30 rounded-xl overflow-hidden">
              <div className="bg-orange-500/10 border-b border-orange-500/30 px-4 py-3 text-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 border-2 border-blue-400/40 mx-auto mb-2" />
                <p className="text-sm font-bold text-orange-400">Crocidolite</p>
                <p className="text-xs text-white/60">Blue Asbestos</p>
              </div>
              <div className="px-4 py-3 space-y-2 text-xs text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/50">Family</span>
                  <span className="text-white font-medium">Amphibole</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Fibre shape</span>
                  <span className="text-white font-medium">Very fine, needle-like</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Flexibility</span>
                  <span className="text-white font-medium">Very brittle</span>
                </div>
                <hr className="border-white/10" />
                <div>
                  <span className="text-white/50">Common uses</span>
                  <p className="text-white mt-1">Sprayed coatings, pipe insulation, cement products</p>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between">
                  <span className="text-white/50">% of UK use</span>
                  <span className="text-white font-medium">~5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Banned</span>
                  <span className="text-white font-medium">1985</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Risk</span>
                  <span className="text-red-500 font-bold text-[11px]">EXTREMELY HIGH</span>
                </div>
                <p className="text-[11px] text-red-300/80 pt-1">Finest fibres, penetrate deepest</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Amosite (Brown Asbestos) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">03</span>
            Amosite (Brown Asbestos)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Amosite is the second most commonly encountered type of asbestos in UK buildings. It is an
                amphibole mineral with straight, harsh, needle-like fibres. The name &ldquo;amosite&rdquo; is
                an acronym derived from <strong>A</strong>sbestos <strong>M</strong>ines <strong>o</strong>f{" "}
                <strong>S</strong>outh <strong>A</strong>frica (AMOSA), where the mineral was extensively
                mined. Its proper mineralogical name is grunerite.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Physical Properties</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fibre shape:</strong> Straight, rigid, spiky (amphibole structure)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Colour:</strong> Brown to dark grey when raw</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Flexibility:</strong> Brittle &mdash; breaks into sharp fragments when disturbed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Friability:</strong> More friable (crumbly) than chrysotile products &mdash; releases fibres more readily when damaged</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Products Containing Amosite</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Asbestos insulating board (AIB) &mdash; widely used for fire protection, partitions, ceiling tiles, and soffits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Thermal insulation &mdash; boiler and pipe lagging in industrial and domestic settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Pipe section lagging (pre-formed insulation for heating pipes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ceiling tiles in commercial and public buildings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">On Site:</strong> Amosite products are often more
                  friable (easily crumbled) than chrysotile cement products. This means they release fibres
                  more readily when disturbed, damaged, or deteriorated. Asbestos insulating board (AIB) is
                  one of the most commonly encountered high-risk materials in UK buildings. If you suspect
                  AIB, stop work immediately, do not disturb the material, and follow your site&rsquo;s
                  asbestos emergency procedure.
                </p>
              </div>

              <p>
                Amosite was banned in the UK in 1985, alongside crocidolite. It was recognised as significantly
                more hazardous than chrysotile due to its straight, needle-like fibres which penetrate deeper
                into lung tissue and are more resistant to the body&rsquo;s natural defence mechanisms.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Crocidolite (Blue Asbestos) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">04</span>
            Crocidolite (Blue Asbestos)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Crocidolite is widely considered the most dangerous type of asbestos. It is an amphibole
                mineral with extremely fine, needle-like fibres that can penetrate deepest into lung tissue.
                Its name comes from the Greek word <em>krokys</em> (nap of cloth), referring to its fibrous
                appearance. Its proper mineralogical name is riebeckite.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Physical Properties</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fibre shape:</strong> Very fine, straight, needle-like (the thinnest of all asbestos fibres)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Colour:</strong> Blue to dark blue when raw (can appear grey when mixed into products)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Flexibility:</strong> Very brittle &mdash; shatters into extremely fine fragments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fibre diameter:</strong> Finest of all asbestos types &mdash; individual fibres can be thinner than a human hair by a factor of 1,000</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Products Containing Crocidolite</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Sprayed coatings (limpet asbestos) on structural steelwork for fire protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>High-temperature pipe insulation in industrial settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Some asbestos cement products (particularly older formulations)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Acid-resistant gaskets and laboratory equipment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Extreme Hazard</p>
                </div>
                <p className="text-sm text-white/80">
                  Crocidolite is considered the most hazardous asbestos type because its fibres are the
                  finest and most needle-like. They penetrate deeper into lung tissue, reach the pleura
                  (lining of the lungs) more readily, and are the most resistant to the body&rsquo;s
                  clearance mechanisms. <strong className="text-white">Even very short exposures to
                  crocidolite are considered hazardous.</strong> It was banned in the UK in 1985 alongside
                  amosite.
                </p>
              </div>

              <p>
                Sprayed crocidolite (sometimes called &ldquo;limpet asbestos&rdquo;) was widely used as fire
                protection on structural steelwork in the 1950s&ndash;1970s. It is one of the most dangerous
                materials a worker can encounter on site because it is highly friable and releases vast
                quantities of fibres when disturbed. Removal of sprayed coatings is licensed work under
                CAR 2012 and must only be carried out by HSE-licensed contractors.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Contaminant Minerals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">05</span>
            The Contaminant Minerals
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Three additional types of asbestos are regulated under UK law, even though they were never
                used commercially in their own right. These are <strong>tremolite</strong>,{" "}
                <strong>actinolite</strong>, and <strong>anthophyllite</strong>. All three are amphibole
                minerals, and all three are classified as carcinogenic.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Why They Matter:</strong> Although these minerals were
                  not manufactured into products intentionally, they occur naturally as contaminants in other
                  minerals. This means they can be present in building products where the raw source material
                  was contaminated &mdash; without anyone knowing they were there.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Tremolite</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Commonly found as a contaminant in chrysotile deposits, talc, and vermiculite</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Has been found in consumer products (talcum powder, for example) due to contaminated source minerals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Named after the Tremola valley in the Swiss Alps, where it was first identified</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Actinolite</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Found as a contaminant in vermiculite and some chrysotile deposits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can occur in a variety of forms, from fibrous (asbestiform) to non-fibrous</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Only the fibrous (asbestiform) variety is classified as asbestos</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Anthophyllite</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The rarest of the six regulated types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Found as a contaminant in talc and vermiculite deposits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Was mined in small quantities in Finland but never widely used commercially</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Surveyor &amp; Analyst Awareness</p>
                </div>
                <p className="text-sm text-white/80">
                  The contaminant minerals are particularly important for asbestos surveyors and laboratory
                  analysts. Because they were not deliberately added to products, their presence can be
                  unexpected. A material thought to contain only chrysotile may also contain tremolite or
                  actinolite as contaminants from the source mine. This can change the risk assessment and
                  the control measures required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Why ALL Types Are Dangerous */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">06</span>
            Why ALL Types Are Dangerous
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important messages in asbestos awareness training is this:{" "}
                <strong>all six types of asbestos cause cancer</strong>. There is no safe type, no safe
                level of exposure, and no threshold below which risk disappears entirely.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">All Types Are Group 1 Carcinogens</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The <strong className="text-white">World Health Organisation (WHO)</strong>, the{" "}
                    <strong className="text-white">International Agency for Research on Cancer (IARC)</strong>,
                    and the <strong className="text-white">Health and Safety Executive (HSE)</strong> all
                    classify every form of asbestos as a Group 1 carcinogen &mdash; the highest classification,
                    meaning there is <strong className="text-white">sufficient evidence</strong> that they cause
                    cancer in humans.
                  </p>
                  <p>
                    No safe exposure level exists. A single fibre exposure can theoretically initiate the
                    process that leads to mesothelioma decades later. This is why the legal control limit
                    under CAR 2012 is set as low as practically measurable (0.1 fibres per cubic centimetre
                    of air, averaged over 4 hours) &mdash; but this is a <strong className="text-white">control
                    limit, not a safe limit</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Industry Argument &mdash; And Why It Is Rejected</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Some countries and industries still argue that chrysotile can be used &ldquo;safely&rdquo; under controlled conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The UK government, the HSE, and the WHO reject this argument completely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The UK banned <strong className="text-white">all asbestos types by 1999</strong> &mdash; no exceptions, no exemptions for chrysotile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The same legal controls under <strong className="text-white">CAR 2012</strong> apply regardless of fibre type</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">All Types Cause All Four Diseases</p>
                <div className="grid sm:grid-cols-2 gap-2 mt-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-red-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Mesothelioma</strong> &mdash; cancer of the lining of the lungs or abdomen</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-red-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Lung cancer</strong> &mdash; asbestos-related carcinoma of the lung</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-red-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Asbestosis</strong> &mdash; scarring and fibrosis of lung tissue</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-red-400/70 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Diffuse pleural thickening</strong> &mdash; thickening of the lung lining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Identifying Fibre Type on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">07</span>
            Identifying Fibre Type on Site
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A common misconception is that you can identify asbestos type by looking at it &mdash; &ldquo;white
                means chrysotile, brown means amosite, blue means crocidolite.&rdquo; This is{" "}
                <strong>unreliable and potentially dangerous</strong>.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Never Identify by Sight Alone</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    You <strong className="text-white">CANNOT reliably identify asbestos type by visual
                    inspection alone</strong>. The reasons include:
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Colour is misleading:</strong> Products are often painted, stained, weathered, or discoloured with age</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Mixed products:</strong> Many materials contain more than one type of asbestos fibre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Binders and fillers:</strong> Asbestos is mixed with cement, resins, or other materials that change its appearance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Contaminants:</strong> A chrysotile product may contain tremolite or actinolite that is invisible to the naked eye</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Laboratory Analysis</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Polarised Light Microscopy (PLM)</strong> is the standard method for identifying asbestos type in bulk samples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Transmission Electron Microscopy (TEM)</strong> can be used for more detailed analysis or air samples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Samples must only be taken by trained and competent persons (or licensed analysts for certain work)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Analysis is carried out by UKAS-accredited laboratories</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">The Presumption Approach (CAR 2012 Regulation 5):</strong>{" "}
                  If you encounter a material that you suspect may contain asbestos and you cannot confirm
                  what it is, <strong>you must presume the worst case</strong>. Treat the material as if it
                  contains the most hazardous fibre type. Do not disturb it. Stop work, report it, and
                  ensure a competent person carries out an assessment. This presumption approach is a legal
                  requirement under the Control of Asbestos Regulations 2012.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What to Do on Site If You Suspect Asbestos</p>
                <ol className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">1</span>
                    <span><strong className="text-white">Stop work immediately</strong> &mdash; do not continue to disturb the material</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">2</span>
                    <span><strong className="text-white">Do not attempt to sample it</strong> &mdash; you are not trained or equipped to do so safely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">3</span>
                    <span><strong className="text-white">Leave the area</strong> and prevent others from entering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">4</span>
                    <span><strong className="text-white">Report immediately</strong> to your supervisor, site manager, or duty holder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">5</span>
                    <span><strong className="text-white">Presume the worst</strong> &mdash; treat it as the most hazardous type until proven otherwise</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            <Link to="../asbestos-awareness-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: History &amp; Properties
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-1-section-3">
              Next: Where Asbestos Is Found
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
