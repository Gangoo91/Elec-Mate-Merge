import { ArrowLeft, Paintbrush, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pipe-lagging-removal",
    question: "What type of removal is ALWAYS required for asbestos pipe lagging?",
    options: [
      "Licensed removal by an HSE-licensed contractor",
      "Non-licensed removal by a competent person",
      "Notifiable non-licensed work (NNLW)",
      "Any competent tradesperson can remove it"
    ],
    correctIndex: 0,
    explanation: "Asbestos pipe lagging typically contains amosite and/or crocidolite and is highly friable, meaning it crumbles easily and releases large quantities of fibres when disturbed. It ALWAYS requires licensed removal by an HSE-licensed contractor working within a full enclosure under the Control of Asbestos Regulations 2012."
  },
  {
    id: "artex-risk",
    question: "When does textured decorative coating (Artex) become a risk?",
    options: [
      "When it is sanded, scraped, drilled into, or removed dry",
      "Only when it is more than 50 years old",
      "It is always dangerous, even when undisturbed",
      "Only when it contains more than 10% asbestos"
    ],
    correctIndex: 0,
    explanation: "Textured decorative coatings like Artex typically contain only 1-5% chrysotile asbestos. When intact and undisturbed, the fibres are bound within the coating matrix and pose low risk. However, any activity that breaks the matrix — sanding, scraping, drilling, or dry removal — releases asbestos fibres into the air. Wet scraping or steaming may be non-licensed work, but power tool removal is notifiable non-licensed work (NNLW)."
  },
  {
    id: "visual-identification",
    question: "How should you confirm whether an insulation material contains asbestos?",
    options: [
      "By laboratory analysis — visual inspection alone cannot confirm asbestos",
      "By its colour — asbestos insulation is always grey or brown",
      "By touching it — asbestos feels different to modern insulation",
      "By checking the product label on the material"
    ],
    correctIndex: 0,
    explanation: "You CANNOT identify asbestos by visual inspection alone. Colour, texture, and appearance are unreliable indicators because asbestos materials can look identical to non-asbestos alternatives. The only definitive method is laboratory analysis using Polarised Light Microscopy (PLM). Any insulation in a pre-2000 building should be presumed to contain asbestos until proven otherwise by lab testing."
  }
];

const faqs = [
  {
    question: "Is Artex in my home definitely asbestos?",
    answer: "Not necessarily. Textured decorative coatings manufactured before 2000 may contain chrysotile asbestos (typically 1-5%), but those manufactured after 2000 do not. You cannot determine whether Artex contains asbestos by looking at it — it must be sampled and analysed by a UKAS-accredited laboratory. If your property was built or decorated before 2000 and has textured coatings, it is sensible to have them tested before any work that would disturb them (sanding, scraping, overboarding, or removal)."
  },
  {
    question: "Can I remove asbestos pipe lagging myself?",
    answer: "Absolutely not. Asbestos pipe lagging is one of the highest-risk ACMs and ALWAYS requires licensed removal by an HSE-licensed contractor. It typically contains amosite and/or crocidolite, is highly friable, and releases enormous quantities of fibres when disturbed. Licensed removal must be carried out within a full enclosure with negative pressure, decontamination units, and air monitoring. Attempting to remove pipe lagging yourself is both extremely dangerous and a criminal offence under the Control of Asbestos Regulations 2012."
  },
  {
    question: "What is limpet asbestos and why is it so dangerous?",
    answer: "Limpet asbestos is a common name for sprayed asbestos coatings. It was applied by spraying a mixture of asbestos (often crocidolite or amosite, up to 85% content) with cement or calcium compounds onto surfaces such as structural steelwork, ceilings, and walls. It was used for fireproofing, thermal insulation, and acoustic treatment. It is considered the HIGHEST RISK ACM because it is extremely friable — surface fibres can be released by air currents alone without any physical disturbance. It always requires licensed removal within a full enclosure."
  },
  {
    question: "Are old fire blankets dangerous?",
    answer: "Fire blankets manufactured before 2000 may contain woven asbestos fabric (typically chrysotile). While they are not dangerous when stored undisturbed, worn or deteriorating asbestos textiles can release fibres when handled, folded, or shaken. If you encounter an older fire blanket in a pre-2000 building, do not use it, shake it, or dispose of it in general waste. It should be replaced with a modern non-asbestos fire blanket and the old one disposed of as asbestos waste by a licensed contractor."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which type(s) of asbestos are typically found in pipe lagging?",
    options: [
      "Chrysotile only",
      "Amosite and/or crocidolite",
      "Tremolite and actinolite",
      "Anthophyllite only"
    ],
    correctAnswer: 1,
    explanation: "Asbestos pipe lagging typically contains amosite (brown asbestos) and/or crocidolite (blue asbestos). These amphibole fibres were used because of their excellent thermal insulation properties. Pipe lagging is one of the highest-risk ACMs due to the dangerous fibre types and its highly friable nature."
  },
  {
    id: 2,
    question: "Sprayed asbestos coatings (limpet asbestos) can contain up to what percentage of asbestos?",
    options: [
      "5%",
      "25%",
      "50%",
      "85%"
    ],
    correctAnswer: 3,
    explanation: "Sprayed asbestos coatings can contain up to 85% asbestos, typically crocidolite or amosite. This extremely high fibre content, combined with the material's friable nature, makes sprayed coatings the HIGHEST RISK ACM. Surface fibres can be released by air currents alone, and any disturbance releases massive fibre counts."
  },
  {
    id: 3,
    question: "Textured decorative coatings (Artex) typically contain what percentage of chrysotile asbestos?",
    options: [
      "1-5%",
      "10-20%",
      "30-50%",
      "Over 50%"
    ],
    correctAnswer: 0,
    explanation: "Textured decorative coatings like Artex typically contain 1-5% chrysotile (white asbestos). Although this is a low concentration, it still poses a risk when the coating is disturbed — particularly by sanding, scraping, drilling, or dry removal. The fibres are bound within the coating matrix when intact, which is why undisturbed Artex is considered low risk."
  },
  {
    id: 4,
    question: "Which of the following statements about sprayed asbestos coatings is TRUE?",
    options: [
      "They are only dangerous when physically damaged",
      "Surface fibres can be released by air currents alone",
      "They only contain chrysotile asbestos",
      "They can be safely removed by non-licensed workers"
    ],
    correctAnswer: 1,
    explanation: "Sprayed asbestos coatings are extremely friable, meaning surface fibres can be released by air currents alone — without any physical contact or disturbance. This makes them the highest-risk ACM. They typically contain crocidolite or amosite (not chrysotile), and they ALWAYS require licensed removal within a full enclosure."
  },
  {
    id: 5,
    question: "Where would you most commonly find asbestos rope seals and gaskets?",
    options: [
      "In textured ceiling coatings",
      "In floor tile adhesives",
      "In boiler doors, flue joints, pipe flanges, and valve glands",
      "In exterior wall cladding"
    ],
    correctAnswer: 2,
    explanation: "Asbestos rope seals and gaskets were used for high-temperature sealing applications — boiler doors, flue joints, pipe flanges, valve glands, and pump seals. They are typically made from braided chrysotile and are still encountered in older heating systems, industrial plant, and some domestic boilers."
  },
  {
    id: 6,
    question: "What is the black bitumen-based adhesive used under floor tiles commonly known to contain?",
    options: [
      "No hazardous materials",
      "Lead only",
      "Asbestos",
      "Mercury"
    ],
    correctAnswer: 2,
    explanation: "Black bitumen-based floor tile adhesive (sometimes called black mastic) commonly contains asbestos. It is one of the most frequently overlooked ACMs during surveys because it is hidden beneath the floor tiles. When removing old floor tiles in pre-2000 buildings, always consider the possibility that the adhesive contains asbestos and have it tested before disturbing it."
  },
  {
    id: 7,
    question: "After what year were textured decorative coatings (Artex) manufactured without asbestos?",
    options: [
      "1985",
      "1990",
      "1999",
      "2000"
    ],
    correctAnswer: 3,
    explanation: "Artex and similar textured decorative coatings manufactured after 2000 do not contain asbestos. However, you cannot determine the manufacturing date by looking at the coating. Any textured coating in a property that may have been decorated before 2000 should be presumed to contain asbestos until laboratory analysis confirms otherwise."
  },
  {
    id: 8,
    question: "What should you do if you find insulation material in a pre-2000 building and are unsure whether it contains asbestos?",
    options: [
      "Remove a small sample for testing yourself",
      "Continue working but wear a dust mask",
      "Presume it contains asbestos until proven otherwise — stop work and report",
      "Check the colour to determine the asbestos type"
    ],
    correctAnswer: 2,
    explanation: "Any insulation material in a pre-2000 building should be presumed to contain asbestos until proven otherwise by laboratory analysis. You must stop work immediately, not disturb the material, leave the area, and report to your supervisor or the duty holder. Never attempt to sample or remove suspected asbestos materials yourself — this requires trained, competent (and potentially licensed) personnel."
  }
];

export default function AsbestosModule3Section2() {
  useSEO({
    title: "Common ACMs — Insulation & Coatings | Asbestos Awareness Module 3.2",
    description: "Pipe lagging, sprayed coatings, textured decorative coatings (Artex), rope seals, gaskets, millboard, fire blankets, and key identification tips for insulation and coating ACMs.",
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
            <Link to="../asbestos-awareness-module-3">
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
            <Paintbrush className="h-7 w-7 text-orange-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common ACMs &mdash; Insulation &amp; Coatings
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Pipe lagging, sprayed coatings (limpet asbestos), textured decorative coatings (Artex), rope seals, gaskets, millboard, fire blankets, and how to identify them
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Pipe lagging:</strong> Highest risk &mdash; amosite/crocidolite, licensed removal only</li>
              <li><strong>Sprayed coatings:</strong> Up to 85% asbestos &mdash; fibres released by air currents</li>
              <li><strong>Artex:</strong> 1-5% chrysotile &mdash; low risk when undisturbed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Identification:</strong> Lab analysis only &mdash; never by sight</li>
              <li><strong>Pre-2000 rule:</strong> Presume asbestos until proven otherwise</li>
              <li><strong>If in doubt:</strong> STOP &mdash; do not disturb &mdash; report</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the characteristics and risks of asbestos pipe lagging and thermal insulation",
              "Explain why sprayed asbestos coatings are the highest-risk ACM",
              "Identify when textured decorative coatings (Artex) become a risk",
              "Recognise rope seals, gaskets, and packing materials as potential ACMs",
              "Understand that millboard, asbestos paper, and bituminous products are often overlooked",
              "Apply the key identification rules: lab analysis, presume asbestos, stop and report"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Pipe Lagging and Thermal Insulation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            Pipe Lagging and Thermal Insulation
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos pipe lagging is widely regarded as the <strong>highest-risk ACM</strong> encountered
                in UK buildings. It was applied to pipes, boilers, calorifiers, vessels, and ductwork to
                provide thermal insulation and fire protection. It typically contains <strong>amosite
                (brown asbestos) and/or crocidolite (blue asbestos)</strong> &mdash; the two most dangerous
                commercially used fibre types.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Extreme Hazard &mdash; Do NOT Touch</p>
                </div>
                <p className="text-sm text-white/80">
                  Pipe lagging is <strong className="text-white">very friable</strong> &mdash; it crumbles
                  easily and releases large quantities of fibres when disturbed. Even minor contact, vibration,
                  or accidental damage can create a significant fibre release. <strong className="text-white">
                  ALWAYS requires licensed removal</strong> by an HSE-licensed contractor. Do NOT touch, disturb,
                  or attempt to remove asbestos pipe lagging under any circumstances.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Characteristics</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Appears as a <strong className="text-white">thick layer of grey, brown, or white insulation</strong> wrapped around pipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Often covered with a <strong className="text-white">canvas or hessian outer layer</strong>, sometimes painted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>May have an <strong className="text-white">aluminium foil or metal jacket</strong> outer casing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Insulation layer typically <strong className="text-white">50&ndash;100mm thick</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Found on pipes, boilers, calorifiers, vessels, and ductwork in pre-2000 buildings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Where You Will Find It</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Plant rooms and boiler houses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Heating pipe runs in ceiling voids, risers, and service ducts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Industrial buildings, schools, hospitals, and public buildings built before 2000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Domestic properties with older central heating systems</span>
                  </li>
                </ul>
              </div>

              {/* Pipe Lagging Cross-Section Diagram */}
              <div className="bg-white/5 border border-orange-500/30 rounded-xl p-6 sm:p-8">
                <p className="text-sm font-medium text-orange-400 mb-6 text-center">
                  Pipe Lagging Cross-Section
                </p>
                <div className="flex justify-center">
                  <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]">
                    {/* Layer 4 — External finish (outermost) */}
                    <div className="absolute inset-0 rounded-full bg-gray-400/20 border-2 border-gray-400/40 flex items-center justify-center">
                    </div>
                    {/* Layer 3 — Outer wrapping */}
                    <div className="absolute inset-[28px] sm:inset-[34px] rounded-full bg-amber-700/25 border-2 border-amber-600/40">
                    </div>
                    {/* Layer 2 — Asbestos insulation */}
                    <div className="absolute inset-[56px] sm:inset-[68px] rounded-full bg-amber-900/40 border-2 border-red-500/50">
                    </div>
                    {/* Layer 1 — Pipe (centre) */}
                    <div className="absolute inset-[100px] sm:inset-[120px] rounded-full bg-gray-600 border-2 border-gray-500 flex items-center justify-center">
                      <span className="text-[9px] sm:text-[10px] font-bold text-white text-center leading-tight px-1">
                        Steel/<wbr />copper<br />pipe
                      </span>
                    </div>

                    {/* Labels with lines */}
                    {/* Label: Pipe — top-left */}
                    <div className="absolute -top-2 -left-2 sm:-top-1 sm:-left-4">
                      <div className="bg-gray-600/90 border border-gray-500 rounded px-2 py-1">
                        <span className="text-[9px] sm:text-[10px] font-semibold text-white">Steel/copper pipe</span>
                      </div>
                      <div className="w-[1px] h-6 bg-gray-400/60 ml-12 sm:ml-16" />
                    </div>

                    {/* Label: Asbestos insulation — right */}
                    <div className="absolute top-[38%] -right-2 sm:-right-4 translate-x-full">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-[1px] bg-red-400/60" />
                        <div className="bg-red-500/20 border border-red-500/40 rounded px-2 py-1 max-w-[140px] sm:max-w-[170px]">
                          <span className="text-[9px] sm:text-[10px] font-semibold text-red-300 leading-tight block">
                            Asbestos insulation
                          </span>
                          <span className="text-[8px] sm:text-[9px] text-red-300/70 leading-tight block">
                            Amosite/crocidolite, 50&ndash;100mm thick
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Label: Canvas/hessian wrap — bottom-right */}
                    <div className="absolute bottom-[10%] -right-2 sm:-right-4 translate-x-full">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-[1px] bg-amber-500/60" />
                        <div className="bg-amber-700/20 border border-amber-600/40 rounded px-2 py-1 max-w-[140px] sm:max-w-[170px]">
                          <span className="text-[9px] sm:text-[10px] font-semibold text-amber-300 leading-tight block">
                            Canvas/hessian wrap
                          </span>
                          <span className="text-[8px] sm:text-[9px] text-amber-300/70 leading-tight block">
                            or aluminium foil jacket
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Label: External finish — bottom-left */}
                    <div className="absolute -bottom-2 -left-2 sm:-bottom-1 sm:-left-4">
                      <div className="w-[1px] h-6 bg-gray-400/60 ml-12 sm:ml-16 mb-0" />
                      <div className="bg-gray-400/20 border border-gray-400/40 rounded px-2 py-1 max-w-[140px] sm:max-w-[170px]">
                        <span className="text-[9px] sm:text-[10px] font-semibold text-gray-300 leading-tight block">
                          Paint finish or metal cladding
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-gray-300/70 leading-tight block">
                          (if present)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-red-400">
                      LICENSED REMOVAL ONLY &mdash; Do not disturb
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Sprayed Coatings (Limpet Asbestos) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">02</span>
            Sprayed Coatings (Limpet Asbestos)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sprayed asbestos coatings &mdash; commonly known as <strong>limpet asbestos</strong> &mdash;
                were created by mixing asbestos fibre with cement or calcium compounds and spraying the
                mixture onto surfaces. This technique was used for <strong>fireproofing structural steelwork,
                thermal insulation, and acoustic treatment</strong> in commercial and industrial buildings.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">HIGHEST RISK ACM</p>
                </div>
                <p className="text-sm text-white/80">
                  Sprayed coatings can contain <strong className="text-white">up to 85% asbestos</strong> &mdash;
                  often crocidolite or amosite. They are <strong className="text-white">extremely friable</strong>:
                  surface fibres can be released by <strong className="text-white">air currents alone</strong>,
                  without any physical contact or disturbance. Any work that disturbs sprayed coatings releases
                  massive fibre counts into the air. This is considered the <strong className="text-white">highest-risk
                  ACM</strong> you can encounter.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Characteristics</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Appearance:</strong> Rough, textured surface — grey or off-white</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Asbestos content:</strong> Up to 85% — often crocidolite or amosite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Friability:</strong> Extremely friable — the most dangerous ACM for fibre release</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Removal:</strong> ALWAYS licensed removal in a full enclosure</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Where You Will Find It</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Steel-framed buildings &mdash; structural steelwork coated for fire protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Plant rooms, ceiling voids, and above suspended ceilings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Industrial buildings, factories, and warehouses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ceilings of 1960s&ndash;1970s commercial and industrial buildings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">On Site:</strong> If you are working in a ceiling void,
                  above suspended ceilings, or near structural steelwork in a building from the 1950s&ndash;1970s,
                  be alert for sprayed coatings. Check the asbestos register before any work. If you see a rough,
                  grey, textured coating on steelwork or ceilings, <strong>do NOT touch it</strong>. Stop work
                  immediately, leave the area, and report to your supervisor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Textured Decorative Coatings (Artex) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">03</span>
            Textured Decorative Coatings (Artex)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The brand name <strong>&ldquo;Artex&rdquo;</strong> is commonly used as a generic term for
                textured decorative coatings applied to ceilings and sometimes walls. These coatings were
                extremely popular in UK properties from the <strong>1960s to the late 1990s</strong> and
                typically contain <strong>1&ndash;5% chrysotile asbestos</strong> (white asbestos).
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Important:</strong> Artex manufactured after
                  <strong> 2000 does not contain asbestos</strong>. However, you cannot determine the
                  manufacturing date or asbestos content by visual inspection alone &mdash; the coating
                  <strong> must be sampled and analysed</strong> by a UKAS-accredited laboratory.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Risk Assessment</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Low risk when intact:</strong> Fibres are bound within the coating matrix &mdash; undisturbed Artex poses minimal risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">BECOMES a risk when:</strong> Sanded, scraped, drilled into, or removed dry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Wet scraping or steaming:</strong> May be non-licensed work (with appropriate controls)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Power tool removal:</strong> Classified as notifiable non-licensed work (NNLW)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Points for Electricians</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Drilling into Artex:</strong> Drilling holes for light fittings, junction boxes, or cable routes through Artex ceilings will release fibres &mdash; always check the asbestos register first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Chasing walls:</strong> If textured coating is present on walls, chasing through it will release fibres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Domestic properties:</strong> Very common in UK homes from the 1960s&ndash;1990s &mdash; always assume textured coatings may contain asbestos in pre-2000 properties</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Never Sand or Scrape Dry</p>
                </div>
                <p className="text-sm text-white/80">
                  Dry sanding or scraping textured coatings is <strong className="text-white">extremely
                  dangerous</strong> &mdash; it generates a dust cloud that can contain millions of asbestos
                  fibres. Even low-concentration (1&ndash;5%) coatings release significant fibre counts when
                  mechanically broken up. If you need to work on a surface with textured coatings in a
                  pre-2000 property, <strong className="text-white">stop and get the material tested first</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Rope Seals, Gaskets, and Packings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">04</span>
            Rope Seals, Gaskets, and Packings
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos was widely used in rope seals, gaskets, and packing materials because of its
                exceptional heat resistance and ability to form tight seals at high temperatures. These
                components are <strong>still encountered in older heating systems, industrial plant,
                and some domestic boilers</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Types of Asbestos Sealing Materials</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Braided rope:</strong> Chrysotile rope used for sealing boiler doors, flue joints, and pipe flanges &mdash; appears as woven or braided cord, often grey-white</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Gaskets:</strong> Compressed asbestos fibre sheets cut to shape for high-temperature joints in pipework, flanges, and equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Packing materials:</strong> Used in valve glands and pump seals to prevent leakage around rotating or sliding components</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Fibre Type and Risk</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Typically <strong className="text-white">chrysotile</strong>, sometimes mixed with other fibre types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Can become friable when <strong className="text-white">old, dried out, or disturbed</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Usually <strong className="text-white">non-licensed or NNLW</strong> depending on condition and method of removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Must be removed by a competent person following appropriate procedures</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">On Site:</strong> If you are working on older heating
                  systems or industrial plant and encounter rope seals, gaskets, or packing materials, do not
                  assume they are non-asbestos. In pre-2000 installations, these materials should be treated
                  as suspected asbestos until confirmed otherwise. Do not cut, pull, or remove them without
                  checking the asbestos register and confirming the material type.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Millboard, Paper, and Bituminous Products */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">05</span>
            Millboard, Paper, and Bituminous Products
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Several thinner or less obvious asbestos-containing materials are frequently
                <strong> overlooked during surveys and site work</strong> because they are hidden, thin,
                or do not look like &ldquo;typical&rdquo; asbestos products. These include millboard,
                asbestos paper, and various bituminous products.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Millboard</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Thin asbestos board, typically <strong className="text-white">2&ndash;6mm thick</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Used for insulation, lining behind radiators and boilers, and fire protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can look similar to thick cardboard &mdash; easily mistaken for non-hazardous material</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Asbestos Paper</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Very thin sheets used for <strong className="text-white">insulation wrapping and cable insulation</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Often wrapped around pipes beneath other insulation layers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Easily torn and friable when old or damp</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Bituminous Products</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Roof felt:</strong> Bitumen-based roofing felt often contained asbestos for reinforcement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Damp-proof courses:</strong> Some older DPCs contain asbestos in the bituminous layer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Floor tile adhesive (black mastic):</strong> Black bitumen-based adhesive under floor tiles <strong className="text-white">commonly contains asbestos</strong> &mdash; one of the most frequently overlooked ACMs</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Frequently Overlooked</p>
                </div>
                <p className="text-sm text-white/80">
                  These products are <strong className="text-white">often missed during surveys</strong>
                  because they are thin, hidden behind other materials, or do not look like &ldquo;typical&rdquo;
                  asbestos. Black mastic (floor tile adhesive) is particularly important &mdash; when removing
                  old floor tiles in pre-2000 buildings, <strong className="text-white">always consider that
                  the adhesive may contain asbestos</strong> and have it tested before disturbing it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Fire Blankets and Protective Textiles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">06</span>
            Fire Blankets and Protective Textiles
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before modern heat-resistant materials were available, <strong>woven asbestos fabric</strong>
                was used to manufacture fire blankets, welding blankets, heat shields, protective gloves
                and aprons, and theatre fire curtains. These textiles typically contain <strong>chrysotile
                woven into fabric</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Types of Asbestos Textiles</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fire blankets (pre-2000):</strong> May contain woven asbestos fabric &mdash; found in kitchens, workshops, and plant rooms of older buildings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Welding blankets and heat shields:</strong> Used in industrial settings to protect against sparks, splatter, and radiant heat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Gloves and aprons:</strong> Used in foundries, glass works, and other high-temperature environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Theatre curtains (fire curtains):</strong> Older theatres, cinemas, and assembly halls may have asbestos fire curtains</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Action Required:</strong> All asbestos textiles should
                  be <strong>replaced with modern non-asbestos alternatives</strong>. Do not use, shake, fold,
                  or handle old asbestos textiles &mdash; worn or deteriorating fabric can release fibres.
                  If you find an older fire blanket or welding blanket in a pre-2000 building, report it and
                  arrange for safe removal and disposal as asbestos waste.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Handle With Care</p>
                </div>
                <p className="text-sm text-white/80">
                  Worn asbestos textiles can release fibres when handled, folded, shaken, or disturbed.
                  Even if a fire blanket appears to be in good condition, if it dates from before 2000 it
                  should be <strong className="text-white">treated as a suspected ACM</strong>. Do not place
                  it in general waste. It must be double-bagged, labelled as asbestos waste, and disposed of
                  at a licensed facility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Key Identification Tips for Insulation & Coatings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">07</span>
            Key Identification Tips for Insulation &amp; Coatings
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single most important rule when dealing with insulation and coatings in older buildings
                is this: <strong>you CANNOT identify asbestos by visual inspection alone</strong>. Always
                get laboratory confirmation before disturbing any suspect material.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Golden Rules</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">1</span>
                      <span><strong className="text-white">Never identify by sight alone</strong> &mdash; visual inspection cannot confirm or rule out asbestos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">2</span>
                      <span><strong className="text-white">Location and age are strong indicators</strong> &mdash; any insulation in a pre-2000 building should be presumed asbestos until proven otherwise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">3</span>
                      <span><strong className="text-white">Always get laboratory confirmation</strong> &mdash; Polarised Light Microscopy (PLM) by a UKAS-accredited lab</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">4</span>
                      <span><strong className="text-white">Look for signs of damage</strong> &mdash; deterioration, cracking, flaking, or previous disturbance increase fibre release risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">5</span>
                      <span><strong className="text-white">Check the asbestos register</strong> &mdash; always review the register before starting any work in a non-domestic building</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">6</span>
                      <span><strong className="text-white">If in doubt &mdash; STOP and report</strong> &mdash; do not disturb the material, leave the area, and inform your supervisor</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Quick Reference: Insulation &amp; Coatings Risk Summary</p>
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-white/60 py-2 pr-3 font-medium">Material</th>
                        <th className="text-left text-white/60 py-2 pr-3 font-medium">Typical Fibre</th>
                        <th className="text-left text-white/60 py-2 font-medium">Removal Type</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Pipe lagging</td>
                        <td className="py-2 pr-3">Amosite / crocidolite</td>
                        <td className="py-2"><span className="text-red-400 font-semibold">Licensed</span></td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Sprayed coatings</td>
                        <td className="py-2 pr-3">Crocidolite / amosite</td>
                        <td className="py-2"><span className="text-red-400 font-semibold">Licensed</span></td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Textured coatings (Artex)</td>
                        <td className="py-2 pr-3">Chrysotile (1&ndash;5%)</td>
                        <td className="py-2"><span className="text-orange-400 font-semibold">Non-licensed / NNLW</span></td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Rope seals / gaskets</td>
                        <td className="py-2 pr-3">Chrysotile</td>
                        <td className="py-2"><span className="text-orange-400 font-semibold">Non-licensed / NNLW</span></td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Millboard / paper</td>
                        <td className="py-2 pr-3">Varies</td>
                        <td className="py-2"><span className="text-orange-400 font-semibold">Varies</span></td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Black mastic (floor adhesive)</td>
                        <td className="py-2 pr-3">Chrysotile</td>
                        <td className="py-2"><span className="text-orange-400 font-semibold">Non-licensed / NNLW</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3">Fire blankets / textiles</td>
                        <td className="py-2 pr-3">Chrysotile</td>
                        <td className="py-2"><span className="text-orange-400 font-semibold">Non-licensed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Remember:</strong> The removal type depends on the
                  condition of the material, the fibre type, and the method of work &mdash; not just the
                  product type. A material that is normally non-licensed work can become licensed work if
                  it is in very poor condition and highly friable. Always follow the risk assessment and
                  the specific guidance in HSE publication HSG264 (Asbestos: The Survey Guide).
                </p>
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
            <Link to="../asbestos-awareness-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: ACMs &mdash; Boards &amp; Sheets
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-3-section-3">
              Next: ACMs in Electrical Installations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
