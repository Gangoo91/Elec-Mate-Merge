import { ArrowLeft, History, CheckCircle, AlertTriangle, Flame, Shield, Factory, Skull } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "asbestos-greek-name",
    question: "What does the Greek word 'asbestos' mean?",
    options: [
      "Fireproof stone",
      "Indestructible / inextinguishable",
      "Magic mineral",
      "White fibre"
    ],
    correctIndex: 1,
    explanation: "The word 'asbestos' derives from the ancient Greek 'asbestos' (ἄσβεστος), meaning indestructible or inextinguishable — a reference to its remarkable resistance to fire and heat."
  },
  {
    id: "asbestos-uk-ban",
    question: "In what year was all asbestos (including chrysotile/white) finally banned in the UK?",
    options: [
      "1985",
      "1992",
      "1999",
      "2006"
    ],
    correctIndex: 2,
    explanation: "A total ban on all forms of asbestos, including chrysotile (white asbestos), came into force in the UK in 1999. Prior to this, blue and brown asbestos were banned in 1985."
  },
  {
    id: "asbestos-annual-deaths",
    question: "Approximately how many people die from asbestos-related diseases each year in the UK?",
    options: [
      "500",
      "1,500",
      "5,000",
      "10,000"
    ],
    correctIndex: 2,
    explanation: "Asbestos-related diseases kill approximately 5,000 people per year in the UK — more than those killed in road traffic accidents. Of these, around 2,700 are mesothelioma deaths."
  }
];

const faqs = [
  {
    question: "Is asbestos still present in UK buildings?",
    answer: "Yes. Any building constructed or refurbished before the year 2000 may contain asbestos-containing materials (ACMs). It is estimated that over 500,000 non-domestic buildings in the UK still contain asbestos, along with millions of domestic properties built between the 1930s and 1999. Asbestos is only dangerous when disturbed, so undamaged ACMs that are in good condition and not likely to be disturbed are generally left in place and managed."
  },
  {
    question: "Why was asbestos used so widely if it was known to be dangerous?",
    answer: "Despite early warnings dating back to 1898, asbestos was incredibly cheap, abundant, and possessed a unique combination of properties — fire resistance, thermal insulation, tensile strength, chemical resistance, and flexibility. The asbestos industry actively promoted it as safe and modern, and the very long latency period (15–60 years) between exposure and disease meant the full scale of harm was not immediately apparent. Economic interests and industrial lobbying delayed regulation for decades."
  },
  {
    question: "What is the difference between serpentine and amphibole asbestos?",
    answer: "Serpentine asbestos has curly, layered fibres. The only serpentine type is chrysotile (white asbestos), which accounts for approximately 90–95% of all asbestos used worldwide. Amphibole asbestos has straight, needle-like fibres and includes five types: amosite (brown), crocidolite (blue), tremolite, actinolite, and anthophyllite. Amphibole fibres are generally considered more hazardous because their straight shape allows them to penetrate deeper into lung tissue, though all forms of asbestos are classified as carcinogenic."
  },
  {
    question: "Which trades are most at risk from asbestos exposure today?",
    answer: "Electricians, plumbers, joiners, carpenters, heating engineers, and general builders are among the most at-risk trades. These workers frequently disturb building fabric during routine maintenance, refurbishment, and installation work, bringing them into contact with hidden asbestos-containing materials in walls, ceilings, floor tiles, pipe lagging, and electrical installations. The HSE estimates that tradespeople carry out work that disturbs asbestos in around 1.5 million buildings each year."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is the ONLY serpentine form of asbestos?",
    options: [
      "Amosite",
      "Crocidolite",
      "Chrysotile",
      "Tremolite"
    ],
    correctAnswer: 2,
    explanation: "Chrysotile (white asbestos) is the only serpentine form. It has curly, layered fibres and accounted for approximately 90–95% of all asbestos used worldwide. All other types belong to the amphibole family."
  },
  {
    id: 2,
    question: "What temperature can asbestos withstand without degrading?",
    options: [
      "Up to 200°C",
      "Up to 500°C",
      "Up to 1,000°C",
      "Up to 2,000°C"
    ],
    correctAnswer: 2,
    explanation: "Asbestos can withstand temperatures up to approximately 1,000°C, which is one of the key properties that made it so valuable for fireproofing, insulation, and heat-resistant applications."
  },
  {
    id: 3,
    question: "Approximately how many tonnes of asbestos did the UK import between 1900 and 1999?",
    options: [
      "1 million tonnes",
      "3 million tonnes",
      "6 million tonnes",
      "10 million tonnes"
    ],
    correctAnswer: 2,
    explanation: "The UK imported approximately 6 million tonnes of raw asbestos between 1900 and 1999. This was used in over 3,000 different products across construction, shipbuilding, power generation, and many other industries."
  },
  {
    id: 4,
    question: "Who first documented the harmful effects of asbestos dust in 1898?",
    options: [
      "Richard Doll",
      "Lucy Deane",
      "Christopher Wagner",
      "Merewether & Price"
    ],
    correctAnswer: 1,
    explanation: "Lucy Deane, one of the first female HM Inspectors of Factories, noted the harmful and 'evil' effects of asbestos dust on workers' lungs in her 1898 report. Despite this early warning, effective regulation did not follow for decades."
  },
  {
    id: 5,
    question: "In what year was the link between asbestos and mesothelioma confirmed?",
    options: [
      "1930",
      "1955",
      "1960",
      "1985"
    ],
    correctAnswer: 2,
    explanation: "In 1960, Dr Christopher Wagner published research confirming the link between asbestos exposure and mesothelioma — a cancer of the lining of the lungs. This was a landmark finding, though it took many more years before comprehensive bans were introduced."
  },
  {
    id: 6,
    question: "Which of the following is NOT a property of asbestos?",
    options: [
      "Electrical insulation",
      "Chemical resistance",
      "Biodegradable",
      "High tensile strength"
    ],
    correctAnswer: 2,
    explanation: "Asbestos is not biodegradable — in fact, its extreme durability and resistance to degradation are among the reasons it is so dangerous. Once inhaled, asbestos fibres remain in the lungs permanently because the body cannot break them down."
  },
  {
    id: 7,
    question: "What is the current primary legislation governing asbestos management in UK workplaces?",
    options: [
      "Asbestos Industry Regulations 1931",
      "Asbestos Regulations 1969",
      "Control of Asbestos Regulations 2006",
      "Control of Asbestos Regulations 2012"
    ],
    correctAnswer: 3,
    explanation: "The Control of Asbestos Regulations 2012 (CAR 2012) is the current primary legislation governing the management of asbestos in UK workplaces. It consolidated and updated earlier regulations and remains in force today."
  },
  {
    id: 8,
    question: "How many asbestos-related mesothelioma deaths occur in the UK each year?",
    options: [
      "Approximately 500",
      "Approximately 1,200",
      "Approximately 2,700",
      "Approximately 5,000"
    ],
    correctAnswer: 2,
    explanation: "Approximately 2,700 people die from mesothelioma each year in the UK. The total annual death toll from all asbestos-related diseases is approximately 5,000, which also includes asbestos-related lung cancer and asbestosis."
  }
];

export default function AsbestosModule1Section1() {
  useSEO({
    title: "History, Properties & Why It Was Used | Asbestos Awareness Module 1.1",
    description: "The discovery of asbestos, its remarkable properties, UK timeline of use and regulation, peak industrial scale, early warnings, and why it remains a critical hazard today.",
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
            <History className="h-7 w-7 text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-500 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            History, Properties &amp; Why It Was Used
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            From ancient Greece to twentieth-century industry &mdash; how a &ldquo;magic mineral&rdquo; became Britain&rsquo;s biggest workplace killer
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>What:</strong> Six naturally occurring silicate minerals in two families</li>
              <li><strong>Why used:</strong> Fireproof, strong, cheap &mdash; over 3,000 products</li>
              <li><strong>Banned:</strong> Fully banned in the UK in 1999</li>
              <li><strong>Deaths:</strong> ~5,000 per year in the UK &mdash; still rising</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Assume:</strong> Any pre-2000 building may contain asbestos</li>
              <li><strong>Never:</strong> Drill, cut, sand, or disturb suspect materials</li>
              <li><strong>Always:</strong> Stop work and report if you suspect ACMs</li>
              <li><strong>Check:</strong> The asbestos register before starting any work</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the origins and ancient history of asbestos use",
              "List the six types of asbestos and their two mineral families",
              "Explain the key properties that made asbestos commercially valuable",
              "Outline the UK timeline from peak use to total ban",
              "Identify the early warnings and key figures who linked asbestos to disease",
              "Understand why asbestos remains a critical risk for tradespeople today"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Discovery of Asbestos */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">01</span>
            The Discovery of Asbestos
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos is not a modern material. Its extraordinary resistance to fire has been recognised
                for thousands of years. The ancient Greeks and Romans were well aware of its unique
                properties, and historical records show it was used in ways that now seem both ingenious
                and deeply troubling.
              </p>

              <p>
                The word <strong>&ldquo;asbestos&rdquo;</strong> comes from the ancient Greek
                <em> asbestos</em> (&alpha;&sigma;&beta;&epsilon;&sigma;&tau;&omicron;&sigmaf;), meaning
                <strong> indestructible</strong> or <strong>inextinguishable</strong>. The Romans also
                called it <em>amiantus</em>, meaning &ldquo;unpolluted&rdquo; or &ldquo;unstained&rdquo;,
                because cloth woven from asbestos fibres could be thrown into fire and retrieved clean and
                undamaged. This property led to its use in cremation cloths for wrapping the bodies of
                royalty, ensuring that the ashes of the deceased were kept separate from those of the
                funeral pyre. It was also used for lamp wicks, tablecloths, and napkins that could be
                cleaned simply by throwing them into the fire.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Historical Note:</strong> The Roman naturalist
                  Pliny the Elder (23&ndash;79 AD) wrote about asbestos in his encyclopaedic work
                  <em> Naturalis Historia</em>, describing it as a rare cloth that rivalled the most
                  expensive linens. He also noted that slaves who worked with asbestos developed a
                  &ldquo;sickness of the lungs&rdquo; &mdash; perhaps the earliest recorded observation
                  of asbestos-related disease.
                </p>
              </div>

              <p>
                Asbestos is not a single substance. It is a commercial and legal term covering
                <strong> six naturally occurring silicate minerals</strong> that form in two distinct
                mineral families:
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-orange-400 mb-2">Serpentine Family (Curly Fibres)</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Chrysotile (White Asbestos)</strong> &mdash; The only serpentine type. Curly, layered fibres. Accounts for approximately 90&ndash;95% of all asbestos used worldwide. Found in roofing sheets, brake linings, textured coatings, and cement products.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-orange-400 mb-2">Amphibole Family (Needle-Like Fibres)</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Amosite (Brown Asbestos)</strong> &mdash; Straight, spiky fibres. Widely used in insulating board, ceiling tiles, and thermal insulation. Second most commonly used type in the UK.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Crocidolite (Blue Asbestos)</strong> &mdash; Very fine, needle-like fibres. Considered the most dangerous form. Used in spray coatings, pipe insulation, and cement products. Banned in UK in 1985.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Tremolite</strong> &mdash; Rarely used commercially but found as a contaminant in other minerals including chrysotile, talc, and vermiculite.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Actinolite</strong> &mdash; Also rarely used commercially. Occasionally found as a contaminant in building materials.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Anthophyllite</strong> &mdash; The rarest form. Limited commercial use, primarily in Finland. Can occur as a contaminant in talc and vermiculite deposits.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Asbestos was mined from rock deposits in countries across the globe. The largest producers
                were <strong>Canada</strong> (the world&rsquo;s leading chrysotile exporter for most of the
                twentieth century), <strong>South Africa</strong> (a major source of amosite and
                crocidolite), <strong>Russia</strong> (still mining today), and <strong>Australia</strong>
                (home to the notorious Wittenoom crocidolite mine, which closed in 1966 after devastating
                health consequences for its workers and the surrounding community). Other significant
                producers included Brazil, China, Zimbabwe, and Italy.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Fact</p>
                <p className="text-sm text-white/80">
                  All six types of asbestos are classified as <strong className="text-red-400">Group 1
                  carcinogens</strong> by the International Agency for Research on Cancer (IARC). There is
                  no safe level of exposure. Even brief, low-level exposure can potentially cause
                  mesothelioma decades later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Properties That Made Asbestos Valuable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">02</span>
            Properties That Made Asbestos Valuable
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos earned the nicknames <strong>&ldquo;the magic mineral&rdquo;</strong> and
                <strong> &ldquo;the mineral of a thousand uses&rdquo;</strong> because of its
                extraordinary combination of physical and chemical properties. No single synthetic
                material has ever been able to replicate all of these properties in one substance,
                which is why asbestos was so widely used and why finding substitutes proved so
                difficult.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-3">The Properties at a Glance</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Flame className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">Fireproof / Heat Resistant</p>
                      <p className="text-xs text-white/70">Withstands temperatures up to 1,000&deg;C</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">Chemical Resistance</p>
                      <p className="text-xs text-white/70">Resistant to acids, alkalis, and most chemicals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 w-4 h-4 flex items-center justify-center text-green-400 text-xs font-bold flex-shrink-0">&#x26A1;</span>
                    <div>
                      <p className="text-sm font-medium text-white">Electrical Insulation</p>
                      <p className="text-xs text-white/70">Excellent dielectric properties</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 w-4 h-4 flex items-center justify-center text-purple-400 text-xs font-bold flex-shrink-0">&#x266B;</span>
                    <div>
                      <p className="text-sm font-medium text-white">Sound Absorption</p>
                      <p className="text-xs text-white/70">Effective acoustic insulation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Full Property List</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Fireproof and heat resistant</strong> &mdash; asbestos does not burn and can withstand sustained temperatures up to approximately 1,000&deg;C, making it ideal for fireproofing, lagging, and heat-resistant barriers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Excellent thermal insulation</strong> &mdash; its fibrous structure traps air, creating an effective thermal barrier. Used extensively for pipe lagging, boiler insulation, and thermal boards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">High tensile strength</strong> &mdash; stronger than steel by weight. Asbestos fibres can be woven, bonded into cement, or mixed into composite materials to add structural strength.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Chemical resistance</strong> &mdash; resistant to acids, alkalis, salt water, and virtually all industrial chemicals. This made it invaluable in chemical plants, laboratories, and marine environments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Sound absorption</strong> &mdash; effective at dampening noise and vibration. Widely used in acoustic ceiling tiles, sound-deadening panels, and theatre linings.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Electrical insulation</strong> &mdash; excellent dielectric properties made it widely used in electrical switchboards, fuse boxes, cable insulation, and flash guards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Flexible and weavable</strong> &mdash; chrysotile fibres in particular could be spun and woven into cloth, rope, tape, and gaskets, behaving more like a textile than a mineral.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Extremely cheap and abundant</strong> &mdash; asbestos was mined in vast quantities at low cost. It could be added to almost any material to improve its fire resistance, strength, and durability at minimal extra expense.</span>
                  </li>
                </ul>
              </div>

              <p>
                It was this unique combination of properties &mdash; fire resistance, strength, chemical
                stability, insulation, flexibility, and low cost &mdash; that made asbestos seem like the
                perfect industrial material. By the mid-twentieth century, it had found its way into over
                3,000 different commercial products. No other naturally occurring material offered anything
                close to the same versatility, and the industries that depended on it resisted calls for
                restriction for as long as they could.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Why &ldquo;Magic Mineral&rdquo; Is a Dangerous Label</p>
                </div>
                <p className="text-sm text-white/80">
                  Marketing materials throughout the twentieth century promoted asbestos as a miracle
                  material &mdash; safe, modern, and essential for progress. Manufacturers published
                  advertisements showing families living happily in asbestos-insulated homes and workers
                  handling asbestos products without any protective equipment. This deliberate normalisation
                  meant that millions of workers were exposed to lethal fibres without understanding the
                  risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* UK Asbestos Timeline Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">&mdash;</span>
            UK Asbestos Timeline
          </h2>
          <div className="relative overflow-x-auto pb-4">
            {/* Timeline Container */}
            <div className="min-w-[800px] px-4">
              {/* Horizontal line */}
              <div className="relative h-1 bg-gradient-to-r from-orange-500/30 via-orange-500 to-orange-500/30 rounded-full my-8">
                {/* Timeline events */}
                {[
                  { year: "1900s", label: "Asbestos use grows rapidly in UK industry", position: "0%", above: true },
                  { year: "1931", label: "First asbestos regulations (Asbestos Industry Regulations)", position: "12%", above: false },
                  { year: "1960s", label: "Link to mesothelioma confirmed by Wagner", position: "25%", above: true },
                  { year: "1969", label: "Asbestos Regulations 1969 introduced", position: "37%", above: false },
                  { year: "1985", label: "Blue (crocidolite) and brown (amosite) asbestos banned", position: "50%", above: true },
                  { year: "1992", label: "Prohibition extended to most amphibole asbestos", position: "62%", above: false },
                  { year: "1999", label: "Total ban on all asbestos including chrysotile (white)", position: "75%", above: true },
                  { year: "2006", label: "Control of Asbestos Regulations 2006", position: "87%", above: false },
                  { year: "2012", label: "Control of Asbestos Regulations 2012 (current)", position: "100%", above: true },
                ].map((event, idx) => (
                  <div
                    key={idx}
                    className="absolute"
                    style={{ left: event.position, transform: "translateX(-50%)" }}
                  >
                    {/* Marker dot */}
                    <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-[#1a1a1a] -mt-1.5 mx-auto relative z-10" />

                    {/* Event card */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-32 sm:w-36 ${
                        event.above ? "bottom-full mb-3" : "top-full mt-3"
                      }`}
                    >
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 text-center">
                        <p className="text-orange-400 text-xs font-bold mb-0.5">{event.year}</p>
                        <p className="text-white/80 text-[10px] leading-tight">{event.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll hint for mobile */}
            <p className="text-center text-white/40 text-xs mt-2 sm:hidden">
              &larr; Scroll to view full timeline &rarr;
            </p>
          </div>
        </section>

        {/* Section 03: Peak UK Use and Industrial Scale */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">03</span>
            Peak UK Use &amp; Industrial Scale
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The scale of asbestos use in the United Kingdom during the twentieth century was
                staggering. Between 1900 and 1999, the UK imported approximately
                <strong> 6 million tonnes</strong> of raw asbestos fibre, making it one of the
                heaviest users of asbestos in the world relative to its population. The material was
                woven into the fabric of British industry, infrastructure, and daily life.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-3">UK Asbestos Use &mdash; Key Statistics</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-orange-400">6M</p>
                    <p className="text-white/70 text-xs">tonnes of asbestos imported (1900&ndash;1999)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-orange-400">3,000+</p>
                    <p className="text-white/70 text-xs">different products contained asbestos</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-orange-400">500,000+</p>
                    <p className="text-white/70 text-xs">non-domestic buildings still containing asbestos</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-orange-400">1950s&ndash;80s</p>
                    <p className="text-white/70 text-xs">peak decades of UK asbestos usage</p>
                  </div>
                </div>
              </div>

              <p>
                Asbestos usage reached its peak during the <strong>1950s to 1980s</strong>, when the
                post-war building boom and industrial expansion drove enormous demand. It was used in
                over <strong>3,000 different products</strong>, from roofing sheets and floor tiles to
                pipe lagging and electrical insulation. It was sprayed onto structural steelwork for
                fire protection, mixed into cement for guttering and downpipes, pressed into gaskets for
                boilers and engines, and woven into fireproof blankets and protective clothing.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Factory className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Industries and Sectors That Used Asbestos</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Construction</strong> &mdash; roofing, cladding, insulation boards, floor tiles, textured coatings (Artex), cement products, fireproofing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Shipbuilding</strong> &mdash; boiler rooms, engine rooms, pipe lagging, bulkhead insulation, fire doors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Power generation</strong> &mdash; power station insulation, turbine lagging, boiler seals, cable conduits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Railways</strong> &mdash; brake linings, carriage insulation, station buildings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Education &amp; healthcare</strong> &mdash; school buildings, hospital wards, laboratory benches, ceiling tiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Domestic housing</strong> &mdash; garage roofs, soffits, flue pipes, water tanks, textured coatings, floor tiles, pipe insulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Electrical installations</strong> &mdash; switchboards, fuse boxes, cable insulation, flash guards, distribution boards, heater storage elements</span>
                  </li>
                </ul>
              </div>

              <p>
                Entire companies were built around the asbestos industry. <strong>Turner &amp; Newall</strong>,
                based in Rochdale, was one of the world&rsquo;s largest asbestos manufacturers, employing
                thousands of workers and producing everything from asbestos cement to insulation products.
                <strong> Cape Asbestos</strong>, headquartered in London, operated mines in South Africa
                and manufactured asbestos products for the UK market. These corporations wielded considerable
                political influence and, as internal documents later revealed, were aware of the health
                risks long before they took action to protect their workforce.
              </p>

              <p>
                Marketing and advertising campaigns actively promoted asbestos as safe, modern, and
                essential. Advertisements in trade magazines encouraged builders and architects to
                specify asbestos products, emphasising their fire resistance, durability, and low cost.
                The true scale of the health catastrophe would not become clear for decades, by which
                time millions of tonnes of asbestos had been permanently embedded into Britain&rsquo;s
                built environment.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Early Warnings and Growing Evidence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">04</span>
            Early Warnings &amp; Growing Evidence
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most disturbing aspects of the asbestos story is how long it took for
                effective regulations to be introduced, despite clear evidence of harm dating back
                over a century. The gap between knowledge and action cost hundreds of thousands of
                lives worldwide.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Timeline of Key Evidence</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1898</span>
                    <div>
                      <p className="text-white font-medium">Lucy Deane &mdash; HM Inspector of Factories</p>
                      <p>One of the first female factory inspectors, Deane documented the &ldquo;evil effects&rdquo; of asbestos dust on the lungs of workers in her annual report. She noted the sharp, jagged nature of the dust particles and their harmful impact on the respiratory system.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1906</span>
                    <div>
                      <p className="text-white font-medium">First documented asbestos-related death in the UK</p>
                      <p>A 33-year-old man who had worked in an asbestos textile factory for 14 years died of pulmonary fibrosis. The post-mortem examination found his lungs were severely scarred and filled with asbestos fibres. This is widely regarded as the first recorded asbestos death in Britain.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1930</span>
                    <div>
                      <p className="text-white font-medium">Merewether &amp; Price Report</p>
                      <p>Dr Edward Merewether and Mr Charles Price published a landmark report for the Home Office that conclusively linked asbestos dust to a fibrotic lung disease, which they termed <strong className="text-white">&ldquo;asbestosis&rdquo;</strong>. The report examined workers in asbestos textile factories and found that the majority had some degree of lung damage.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1931</span>
                    <div>
                      <p className="text-white font-medium">Asbestos Industry Regulations 1931</p>
                      <p>The first UK regulations specifically targeting asbestos. These required dust suppression measures and medical examinations for workers in asbestos factories. However, they applied only to manufacturing &mdash; they did not cover the millions of workers who used asbestos products on construction sites and in other industries.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1955</span>
                    <div>
                      <p className="text-white font-medium">Sir Richard Doll &mdash; Link to Lung Cancer</p>
                      <p>The renowned epidemiologist Sir Richard Doll published research confirming a direct link between asbestos exposure and lung cancer. His study showed that asbestos workers had a significantly elevated risk of developing lung cancer compared to the general population.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1960</span>
                    <div>
                      <p className="text-white font-medium">Dr Christopher Wagner &mdash; Link to Mesothelioma</p>
                      <p>Working in South Africa, Wagner published research confirming the link between asbestos exposure and <strong className="text-white">mesothelioma</strong> &mdash; an aggressive and invariably fatal cancer of the lining of the lungs or abdomen. This was a watershed moment in asbestos science.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1969</span>
                    <div>
                      <p className="text-white font-medium">Asbestos Regulations 1969</p>
                      <p>Updated regulations introduced tighter controls on dust exposure in asbestos manufacturing and, for the first time, extended some requirements to construction and other industries where asbestos products were used.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Skull className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Industry Denial and Delay</p>
                </div>
                <p className="text-sm text-white/80">
                  Despite the mounting evidence, the asbestos industry continued to promote its products
                  well into the 1970s. Internal company documents, uncovered during later litigation,
                  revealed that major manufacturers were aware of the health risks decades before they
                  acted. Industry lobbying groups fought against tighter regulations, funded counter-research,
                  and argued that controlled exposure was safe. The tragic consequence of this deliberate
                  delay was that millions of additional workers were exposed unnecessarily.
                </p>
              </div>

              <p>
                A critical factor in the asbestos tragedy is the <strong>latency period</strong>. Asbestos-related
                diseases typically take between <strong>15 and 60 years</strong> to develop after initial
                exposure. This meant that workers exposed in the 1950s, 1960s, and 1970s did not begin
                developing symptoms until the 1980s, 1990s, and beyond. By the time the full scale of
                the epidemic became apparent, decades of exposure had already occurred and millions of
                tonnes of asbestos had been installed in buildings across the country.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Takeaway:</strong> The history of asbestos
                  regulation is a sobering lesson in the consequences of prioritising economic interests
                  over worker safety. Despite clear evidence of harm from as early as 1898, a total ban
                  was not achieved until 1999 &mdash; a gap of over 100 years. The workers who paid the
                  highest price were those in trades such as electricians, plumbers, joiners, and laggers
                  who handled asbestos daily without adequate protection or information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Why It Matters Today */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">05</span>
            Why It Matters Today
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Asbestos Is NOT Just a Historical Problem</p>
                </div>
                <p className="text-sm text-white/80">
                  Although asbestos has been banned in the UK since 1999, it was not removed from
                  existing buildings. Millions of tonnes of asbestos-containing materials remain in
                  place in homes, schools, hospitals, offices, factories, and public buildings across
                  the country. Every time a tradesperson drills into a wall, lifts a ceiling tile, or
                  strips out old wiring, there is a risk of disturbing hidden asbestos.
                </p>
              </div>

              <p>
                The fundamental point that every tradesperson must understand is this:
                <strong> any building constructed or refurbished before the year 2000 may contain
                asbestos-containing materials</strong>. This includes not only large commercial and
                industrial buildings but also ordinary houses, flats, schools, and community buildings.
                Asbestos was so widely used, so cheap, and so versatile that it found its way into
                virtually every type of construction during the second half of the twentieth century.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-3">The Human Cost &mdash; UK Statistics</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~5,000</p>
                    <p className="text-white/70 text-xs">asbestos-related deaths per year in the UK</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~2,700</p>
                    <p className="text-white/70 text-xs">mesothelioma deaths per year in the UK</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">More</p>
                    <p className="text-white/70 text-xs">deaths than road traffic accidents annually</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">Rising</p>
                    <p className="text-white/70 text-xs">annual deaths still increasing (peak ~2020s)</p>
                  </div>
                </div>
              </div>

              <p>
                Asbestos kills approximately <strong>5,000 people per year</strong> in the United
                Kingdom. This is more than the number of people killed in road traffic accidents. Of
                these, approximately <strong>2,700 are mesothelioma deaths</strong> &mdash; a cancer
                that is almost exclusively caused by asbestos exposure and for which there is currently
                no cure. The remaining deaths include asbestos-related lung cancer, asbestosis, and
                diffuse pleural thickening.
              </p>

              <p>
                Due to the long latency periods involved, the number of annual deaths from
                asbestos-related diseases has been <strong>continuing to rise</strong>, with the peak
                expected to occur during the 2020s. This means that we are still in the worst phase of
                the asbestos epidemic, despite the fact that the material was banned over two decades
                ago. The deaths occurring today are largely the result of exposures that happened in the
                1960s, 1970s, and 1980s.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Trades Most at Risk</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Electricians</strong> &mdash; cable routes through asbestos boards, old fuse boxes, flash guards, heater elements</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Plumbers</strong> &mdash; pipe lagging, boiler insulation, flue pipes, cistern panels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Joiners &amp; carpenters</strong> &mdash; partition walls, ceiling tiles, soffits, door panels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">General builders</strong> &mdash; demolition, refurbishment, roofing, flooring, plastering</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Heating engineers</strong> &mdash; boiler rooms, ductwork, pipe runs, storage heaters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Painters &amp; decorators</strong> &mdash; textured coatings (Artex), preparation of asbestos-containing surfaces</span>
                  </div>
                </div>
              </div>

              <p>
                Understanding what asbestos is, where it was used, and why it is dangerous is the
                essential first step in staying safe. As you progress through this course, you will
                learn how to identify asbestos-containing materials, what to do if you encounter or
                suspect asbestos, and how the law protects you and your colleagues on site. The
                knowledge you gain here could quite literally save your life.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Remember</p>
                </div>
                <p className="text-sm text-white/80">
                  You <strong>cannot</strong> identify asbestos by looking at it. You cannot smell it,
                  taste it, or feel it in the air. The fibres that cause fatal disease are invisible to
                  the naked eye &mdash; a single asbestos fibre is approximately 700 times thinner than
                  a human hair. The only way to confirm whether a material contains asbestos is through
                  laboratory analysis of a sample taken by a competent person. When in doubt,
                  <strong> always assume it is asbestos and stop work immediately</strong>.
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
          title="Section 1 Knowledge Check"
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
            <Link to="../asbestos-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-1-section-2">
              Next: Types of Asbestos Fibres
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
