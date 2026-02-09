import { ArrowLeft, MapPin, CheckCircle, AlertTriangle, Building, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "asb-pre2000-assumption",
    question: "What is the fundamental assumption that underpins UK asbestos management in buildings?",
    options: [
      "Any building constructed or refurbished before the year 2000 may contain asbestos",
      "Only industrial buildings built before 1980 may contain asbestos",
      "Asbestos is only found in buildings constructed before 1960",
      "Only buildings that have been specifically tested may contain asbestos"
    ],
    correctIndex: 0,
    explanation: "The fundamental assumption is that any building constructed or refurbished before the year 2000 may contain asbestos-containing materials. The total ban on asbestos in the UK came into force on 24 November 1999, so buildings from all eras before this date are potentially affected. This includes domestic, commercial, and industrial properties."
  },
  {
    id: "asb-pipe-lagging-risk",
    question: "Why is pipe lagging considered one of the highest-risk asbestos-containing materials?",
    options: [
      "Because it is always blue asbestos",
      "Because it is often friable (easily crumbled) and may contain amosite or crocidolite, releasing fibres readily when disturbed",
      "Because it is the most common ACM found in buildings",
      "Because it was never manufactured to any safety standard"
    ],
    correctIndex: 1,
    explanation: "Pipe lagging is considered one of the highest-risk ACMs because it is often very friable — meaning it can be easily crumbled or broken by hand pressure. It frequently contains amosite (brown asbestos) or crocidolite (blue asbestos), both of which are the most dangerous fibre types. When disturbed, friable lagging releases fibres readily into the air, creating significant inhalation risk."
  },
  {
    id: "asb-electrician-pre2000",
    question: "What must an electrician do before carrying out work on any pre-2000 electrical installation?",
    options: [
      "Nothing specific — normal PPE is sufficient",
      "Include asbestos checks as part of the work planning process",
      "Refuse all work on pre-2000 installations",
      "Only check for asbestos if the building is industrial"
    ],
    correctIndex: 1,
    explanation: "Any work on pre-2000 electrical installations must include asbestos checks as part of the work planning process. Electrical installations from this era may contain ACMs in consumer units (flash guards), distribution board backing boards, cable trenching, floor ducts, and heater storage bricks. The electrician or their employer must check the asbestos register or arrange a survey before work begins."
  }
];

const faqs = [
  {
    question: "How can I tell if a material contains asbestos just by looking at it?",
    answer: "You cannot reliably identify asbestos by visual inspection alone. While some ACMs have characteristic appearances (e.g. corrugated cement sheets, textured ceiling coatings, dark thermoplastic floor tiles), the only way to confirm whether a material contains asbestos is laboratory analysis of a sample taken by a competent person. The golden rule is: if you are unsure, assume it contains asbestos and do not disturb it until it has been tested."
  },
  {
    question: "My house was built in 1985. Which areas are most likely to contain asbestos?",
    answer: "Properties built in the 1980s commonly contain ACMs in several locations: textured decorative coatings on ceilings and walls (Artex and similar products), thermoplastic floor tiles (typically 25x25cm, often dark-coloured) and the black bitumen adhesive beneath them, soffit and fascia boards on the exterior, garage or shed roofing (corrugated cement sheets), boiler flue pipes and cupboard insulation, and the consumer unit or old fuse box (flash guards made from AIB). A professional survey is recommended before any renovation work."
  },
  {
    question: "Are all Artex ceilings dangerous?",
    answer: "Not all textured coatings contain asbestos. Artex and similar products manufactured after the mid-1980s were increasingly made without asbestos, and by 1999 asbestos was banned entirely. However, textured coatings applied before the late 1980s commonly contain chrysotile (white asbestos) at concentrations of 1-5%. If the coating is intact and undisturbed, the risk is low. The risk increases significantly when the coating is sanded, scraped, drilled into, or otherwise disturbed — activities that release fibres into the air. Always test before disturbing textured coatings in pre-2000 properties."
  },
  {
    question: "I need to replace a fuse box in a 1970s property. What asbestos risks should I consider?",
    answer: "Pre-2000 consumer units and distribution boards frequently contain asbestos-insulating board (AIB) flash guards behind the fuse carriers, arc shields between fuse ways, and backing boards mounted on the wall behind the unit. AIB is a higher-risk material because it can release fibres when cut, drilled, or broken. Before removing or working on the unit, check the asbestos register (for non-domestic premises) or arrange for a sample to be tested. If AIB is confirmed, the removal must be carried out by a licensed asbestos removal contractor or, for certain lower-risk AIB work, by a trained operative under a non-licensed asbestos work procedure with notification to the HSE."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The total ban on asbestos in the UK came into force on which date?",
    options: [
      "1 January 1990",
      "24 November 1999",
      "31 December 2000",
      "1 April 1985"
    ],
    correctAnswer: 1,
    explanation: "The Asbestos (Prohibitions) (Amendment) Regulations 1999 brought a total ban on the import, supply, and use of all forms of asbestos in the UK, effective from 24 November 1999. This is why buildings constructed or refurbished before the year 2000 are assumed to potentially contain ACMs."
  },
  {
    id: 2,
    question: "Which of the following is the most common location for asbestos-insulating board (AIB) in domestic properties?",
    options: [
      "External brickwork",
      "Bath panels, airing cupboard linings, and fuse box flash guards",
      "Concrete foundations",
      "PVC window frames"
    ],
    correctAnswer: 1,
    explanation: "In domestic properties, AIB was commonly used for bath panels, airing cupboard linings, partition walls, and flash guards inside consumer units (fuse boxes). AIB is a higher-risk material because it is denser than sprayed coatings but more friable than asbestos cement, meaning it releases fibres relatively easily when disturbed."
  },
  {
    id: 3,
    question: "What type of asbestos is most commonly found in textured decorative coatings such as Artex?",
    options: [
      "Amosite (brown asbestos)",
      "Crocidolite (blue asbestos)",
      "Chrysotile (white asbestos) at concentrations of 1-5%",
      "Tremolite"
    ],
    correctAnswer: 2,
    explanation: "Textured decorative coatings such as Artex typically contain chrysotile (white asbestos) at concentrations of 1-5%. While chrysotile is considered the least dangerous of the regulated fibre types, it still poses a significant health risk when disturbed — particularly during sanding, scraping, or drilling, which releases fibres into the air."
  },
  {
    id: 4,
    question: "Thermoplastic floor tiles containing asbestos are typically which size?",
    options: [
      "10x10cm or 15x15cm",
      "25x25cm or 30x30cm, often dark-coloured",
      "50x50cm, always white",
      "60x60cm, usually patterned"
    ],
    correctAnswer: 1,
    explanation: "Asbestos-containing thermoplastic floor tiles are typically 25x25cm (9 inch) or 30x30cm (12 inch) and are often dark-coloured (brown, dark red, or black). The black bitumen-based adhesive used to stick them down may also contain asbestos. These tiles should never be sanded, ground, or dry-swept if asbestos is suspected."
  },
  {
    id: 5,
    question: "Which building type saw extensive use of AIB in ceilings, walls, and heater cupboards?",
    options: [
      "Modern apartment blocks built after 2010",
      "Victorian terraced houses",
      "Schools",
      "Timber-framed barns"
    ],
    correctAnswer: 2,
    explanation: "Schools are one of the highest-risk building types for asbestos. During the post-war building programme of the 1950s-1970s, AIB was used extensively in school ceilings, wall linings, heater cupboards, and fire doors. The DfE (Department for Education) continues to manage the legacy of asbestos in schools, and any maintenance or refurbishment work requires careful asbestos management."
  },
  {
    id: 6,
    question: "Why is the black adhesive beneath old floor tiles a concern for asbestos?",
    options: [
      "It always contains crocidolite",
      "It is a bitumen-based adhesive that may contain asbestos fibres, making tile removal hazardous",
      "It is water-soluble and spreads asbestos when wet",
      "It is only dangerous if the building was built before 1950"
    ],
    correctAnswer: 1,
    explanation: "The black bitumen-based adhesive used to fix thermoplastic floor tiles often contains asbestos fibres (typically chrysotile). This means that removing old floor tiles can disturb not just the tiles themselves but also the adhesive layer, releasing fibres. The adhesive must be treated as a potential ACM and sampled or assumed to contain asbestos before any removal work is undertaken."
  },
  {
    id: 7,
    question: "An electrician discovers what appears to be a textured coating on a ceiling while preparing to install new lighting in a 1975 property. What should they do?",
    options: [
      "Proceed carefully using a dust mask",
      "Stop work, assume the coating may contain asbestos, and arrange for it to be tested before proceeding",
      "Scrape a small area to check if it crumbles",
      "Proceed if the coating appears to be in good condition"
    ],
    correctAnswer: 1,
    explanation: "The electrician must stop work and assume the textured coating may contain asbestos. Textured coatings in properties from the 1970s very commonly contain chrysotile. Drilling, cutting, or disturbing the coating would release fibres. The coating must be sampled and tested by a competent person before any work proceeds. A dust mask alone does not provide adequate protection against asbestos fibres."
  },
  {
    id: 8,
    question: "Approximately how many non-domestic buildings in the UK are estimated to contain asbestos-containing materials?",
    options: [
      "50,000",
      "100,000",
      "Over 500,000",
      "Over 5 million"
    ],
    correctAnswer: 2,
    explanation: "It is estimated that over 500,000 non-domestic buildings in the UK contain asbestos-containing materials. This includes offices, schools, hospitals, factories, and public buildings. The Control of Asbestos Regulations 2012 place a duty on the person responsible for managing these buildings (the 'duty holder') to identify and manage any ACMs present."
  }
];

export default function AsbestosModule1Section3() {
  useSEO({
    title: "Where Asbestos Is Found | Asbestos Awareness Module 1.3",
    description: "Common locations of asbestos-containing materials in buildings: roofs, walls, floors, services, electrical installations, domestic properties, and high-risk building types. Pre-2000 building assumption explained.",
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
            <MapPin className="h-7 w-7 text-orange-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Where Asbestos Is Found
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Common locations of asbestos-containing materials in UK buildings &mdash; from roofs and walls to electrical installations and domestic properties
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Pre-2000:</strong> Any building built or refurbished before 2000 may contain ACMs</li>
              <li><strong>500,000+</strong> non-domestic UK buildings contain asbestos</li>
              <li><strong>Everywhere:</strong> Roofs, walls, floors, services, electrics, domestic</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Assume:</strong> ACMs present until proven otherwise in pre-2000 buildings</li>
              <li><strong>Check:</strong> The asbestos register before starting any work</li>
              <li><strong>Stop:</strong> If you encounter suspected ACMs &mdash; do not disturb</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the pre-2000 assumption and why it is the foundation of UK asbestos management",
              "Identify common ACM locations in roofs, walls, floors, and service areas",
              "Describe the specific asbestos risks associated with electrical installations",
              "List the most common ACMs found in domestic properties",
              "Recognise high-risk building types and why they present greater asbestos hazards",
              "Explain why visual identification alone is not sufficient to confirm asbestos"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Pre-2000 Assumption */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            The Pre-2000 Assumption
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single most important principle in UK asbestos management is this: <strong>any building
                constructed or refurbished before the year 2000 may contain asbestos</strong>. This is the
                fundamental assumption that guides every asbestos survey, risk assessment, and work decision
                in the UK.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Key Definition &mdash; The Pre-2000 Assumption</p>
                <p className="text-sm text-white">
                  Because the total ban on the import, supply, and use of all forms of asbestos did not come
                  into force until <strong>24 November 1999</strong>, any building from any era before this
                  date may contain asbestos-containing materials (ACMs). This includes Victorian buildings,
                  post-war construction, 1960s system builds, 1970s office blocks, 1980s housing estates,
                  and 1990s commercial properties.
                </p>
              </div>

              <p>
                The ban came through the <strong>Asbestos (Prohibitions) (Amendment) Regulations 1999</strong>.
                Before this, different types of asbestos were banned at different times &mdash; blue asbestos
                (crocidolite) and brown asbestos (amosite) were banned in 1985, but white asbestos (chrysotile)
                remained legal and widely used until 1999. This means buildings refurbished as recently as 1998
                may contain chrysotile products.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Why the Pre-2000 Date Matters</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { point: "All eras affected", detail: "Buildings from the 1930s through to 1999 commonly contain ACMs — not just older industrial buildings" },
                    { point: "Refurbishment risk", detail: "Even buildings refurbished after 2000 may contain legacy ACMs that were not removed during the works" },
                    { point: "Scale of the problem", detail: "An estimated 500,000+ non-domestic buildings in the UK still contain ACMs today" },
                    { point: "Domestic properties", detail: "Homes built from the 1930s to 1999 commonly contain ACMs in multiple locations — textured coatings, floor tiles, soffits, and more" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-orange-400 mb-1">{item.point}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Critical Point</p>
                </div>
                <p className="text-sm text-white/80">
                  The pre-2000 assumption is <strong>not optional</strong>. Under the Control of Asbestos
                  Regulations 2012, the duty holder for any non-domestic building must manage asbestos risk.
                  For anyone carrying out work on a building &mdash; whether a plumber, electrician, builder,
                  or decorator &mdash; the assumption applies to every job in every pre-2000 property. You must
                  check the asbestos register (or arrange a survey) before starting work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Common Locations — Roofs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">02</span>
            Common Locations by Building Element &mdash; Roofs
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Roofs are one of the most common locations for asbestos-containing materials, particularly
                in industrial, agricultural, and domestic outbuildings. Asbestos cement (AC) products were
                widely used in roofing due to their durability, weather resistance, and fire-resistant properties.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Roof ACMs</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { location: "Corrugated roof sheets", detail: "Asbestos cement sheets — extremely common on garages, industrial units, farm buildings, and sheds" },
                    { location: "Roof slates", detail: "Asbestos cement slates — visually similar to natural slate but lighter and more uniform in appearance" },
                    { location: "Soffits and fascia boards", detail: "AIB (asbestos-insulating board) or AC panels fitted beneath roof overhangs and along eaves" },
                    { location: "Guttering and downpipes", detail: "Asbestos cement guttering — lightweight, grey, often with a smooth finish" },
                    { location: "Flat roof felt", detail: "Some older bituminous roof felts and weathering materials contain asbestos fibres" },
                    { location: "Roof-void insulation", detail: "Loose-fill or sprayed insulation materials in loft spaces — may contain asbestos" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-orange-400 mb-1">{item.location}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning &mdash; Corrugated Cement Sheets</p>
                </div>
                <p className="text-sm text-white/80">
                  Corrugated asbestos cement roof sheets are one of the most widespread ACMs in the UK.
                  While intact AC is relatively low-risk (the fibres are bound in cement), the risk increases
                  significantly when sheets are <strong>broken, drilled, cut, or weathered</strong>. Moss growth
                  and weathering over decades can weaken the cement matrix, making the material more friable.
                  Never walk on asbestos cement roofs &mdash; they are fragile and can shatter without warning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Building Cross-Section Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <Building className="h-5 w-5 text-orange-400" />
            Building Cross-Section &mdash; Where ACMs Are Found
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">Typical Pre-2000 Building &mdash; 16 Common ACM Locations</p>

            {/* Building Diagram */}
            <div className="relative mx-auto max-w-2xl">
              {/* Building Outline */}
              <div className="relative border-2 border-orange-500/40 rounded-lg bg-gradient-to-b from-orange-500/5 to-transparent">

                {/* Roof Section */}
                <div className="border-b border-dashed border-orange-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">Roof Area</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">1</span>
                      <span className="text-xs text-white/80">Cement roof sheets</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">2</span>
                      <span className="text-xs text-white/80">Soffits &amp; fascia</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">3</span>
                      <span className="text-xs text-white/80">Guttering (AC)</span>
                    </div>
                  </div>
                </div>

                {/* Walls Section */}
                <div className="border-b border-dashed border-orange-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">Walls</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">4</span>
                      <span className="text-xs text-white/80">AIB partition walls</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">5</span>
                      <span className="text-xs text-white/80">Textured coatings (Artex)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">6</span>
                      <span className="text-xs text-white/80">Window putty</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">7</span>
                      <span className="text-xs text-white/80">External cement cladding</span>
                    </div>
                  </div>
                </div>

                {/* Floor Section */}
                <div className="border-b border-dashed border-orange-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">Floors</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">8</span>
                      <span className="text-xs text-white/80">Floor tiles (thermoplastic)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">9</span>
                      <span className="text-xs text-white/80">Bitumen adhesive beneath tiles</span>
                    </div>
                  </div>
                </div>

                {/* Services Section */}
                <div className="border-b border-dashed border-orange-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">Services</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">10</span>
                      <span className="text-xs text-white/80">Pipe lagging <span className="text-red-400 text-[10px] font-semibold">(HIGH RISK)</span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">11</span>
                      <span className="text-xs text-white/80">Boiler flue</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">12</span>
                      <span className="text-xs text-white/80">Rope seals on boiler</span>
                    </div>
                  </div>
                </div>

                {/* Electrical Section */}
                <div className="border-b border-dashed border-orange-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">Electrical</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">13</span>
                      <span className="text-xs text-white/80">Fuse box flash guards</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">14</span>
                      <span className="text-xs text-white/80">Electrical backing boards</span>
                    </div>
                  </div>
                </div>

                {/* Other Section */}
                <div className="p-3 sm:p-4">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">Other</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">15</span>
                      <span className="text-xs text-white/80">Fire doors (AIB core)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">16</span>
                      <span className="text-xs text-white/80">Toilet cisterns (AC)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-4 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-orange-500/30 border border-orange-500/50" />
                  <span className="text-[10px] text-white/50">Standard ACM location</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                  <span className="text-[10px] text-white/50">High-risk / friable ACM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Common Locations — Walls */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">03</span>
            Common Locations &mdash; Walls
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Walls are another major location for ACMs. Asbestos was used in wall construction and
                decoration for its fire resistance, thermal insulation, and durability. Wall-based ACMs
                range from low-risk asbestos cement cladding to higher-risk AIB partitions and textured
                coatings.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Wall ACMs</p>
                <div className="space-y-3">
                  {[
                    { location: "Asbestos-insulating board (AIB) partition walls", detail: "AIB was widely used to create internal partition walls and linings, particularly in commercial and industrial buildings. It is denser than sprayed coatings but more friable than cement products." },
                    { location: "Textured decorative coatings (Artex)", detail: "Artex and similar products applied to ceilings and walls typically contain chrysotile at 1-5%. Extremely common in properties from the 1960s to 1980s. Low risk when intact, high risk when sanded or scraped." },
                    { location: "External asbestos cement wall cladding", detail: "Flat or profiled AC sheets used as external cladding on commercial and industrial buildings. Similar risk profile to AC roof sheets — low risk when intact, higher risk when cut or weathered." },
                    { location: "Window panels beneath windows (AIB)", detail: "AIB panels were commonly fitted beneath windows as infill panels, particularly in system-built schools and offices. Often painted and may not be immediately obvious." },
                    { location: "Window putty and sealant", detail: "Some window putties and mastics from the pre-2000 era contain chrysotile fibres. This is often overlooked during building surveys." },
                    { location: "Internal wall linings and firebreaks", detail: "AIB was used to line walls in corridors, stairwells, and service risers for fire-resistance purposes." },
                    { location: "Fire-resistant wall panels", detail: "Corridors, stairwells, and escape routes in commercial buildings often have AIB panels providing fire compartmentation." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-orange-400 mb-1">{item.location}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning &mdash; Textured Coatings</p>
                </div>
                <p className="text-sm text-white/80">
                  Textured decorative coatings are one of the most commonly encountered ACMs in domestic
                  properties. They were applied to millions of ceilings and walls across the UK. The coating
                  is low-risk when intact and undisturbed. However, <strong>sanding, scraping, drilling,
                  or removing</strong> textured coatings releases asbestos fibres into the air. Always assume
                  pre-1990s textured coatings contain asbestos until proven otherwise by laboratory testing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Common Locations — Floors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">04</span>
            Common Locations &mdash; Floors
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Floor materials containing asbestos are extremely common in pre-2000 buildings. The two most
                significant ACMs found in floors are <strong>thermoplastic floor tiles</strong> and the
                <strong> black bitumen-based adhesive</strong> used to stick them down. Both must be treated
                as potential ACMs.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Floor ACMs</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { location: "Thermoplastic floor tiles", detail: "Typically 25x25cm (9\") or 30x30cm (12\"), often dark-coloured (brown, dark red, black). Contain chrysotile fibres bound in a resin matrix." },
                    { location: "Bitumen-based tile adhesive", detail: "The black adhesive layer beneath old tiles frequently contains asbestos. This is often overlooked — removing tiles exposes and disturbs this adhesive layer." },
                    { location: "Floor linoleum backing", detail: "The hessian or felt backing of some older linoleum floor coverings may contain asbestos fibres." },
                    { location: "Resin-based flooring", detail: "Some poured resin and composite flooring materials from the pre-2000 era contain asbestos." },
                    { location: "Floor ducts and cable channels", detail: "Asbestos cement or AIB was used to form floor-level ducts for cables and services, particularly in offices and commercial buildings." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-orange-400 mb-1">{item.location}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Important &mdash; The Hidden Adhesive</p>
                </div>
                <p className="text-sm text-white/80">
                  Many people focus on the floor tiles themselves but forget about the <strong>bitumen adhesive
                  beneath them</strong>. Even if the tiles are confirmed as non-asbestos, the black adhesive
                  layer may still contain asbestos fibres. Both the tiles and the adhesive must be sampled
                  and tested. Never use power tools, sanders, or grinding equipment to remove old floor tiles
                  or adhesive until asbestos has been ruled out.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Common Locations — Services & Mechanical */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">05</span>
            Common Locations &mdash; Services &amp; Mechanical
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mechanical services — particularly heating and plumbing systems — are among the
                <strong> highest-risk locations</strong> for asbestos in buildings. Asbestos was prized for its
                heat resistance, making it the insulation material of choice for pipes, boilers, and hot-water
                systems throughout the 20th century.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Highest Risk &mdash; Pipe Lagging</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>Pipe lagging and insulation</strong> is consistently identified as one of the
                  highest-risk ACMs. It is often very <strong>friable</strong> (easily crumbled by hand
                  pressure), frequently contains <strong>amosite (brown asbestos)</strong> or
                  <strong> crocidolite (blue asbestos)</strong> — the two most dangerous fibre types — and
                  releases fibres readily when disturbed. Even minor contact, vibration, or water damage can
                  cause fibre release. Pipe lagging removal is <strong>licensed asbestos work</strong> that
                  must be carried out by an HSE-licensed contractor.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Services &amp; Mechanical ACMs</p>
                <div className="space-y-3">
                  {[
                    { location: "Pipe lagging and insulation", risk: "HIGH", detail: "Often amosite or crocidolite. Very friable. Found on heating pipes, hot-water pipes, and steam pipes throughout buildings." },
                    { location: "Boiler and calorifier insulation", risk: "HIGH", detail: "Boilers, calorifiers, and hot-water cylinders were commonly insulated with asbestos-containing materials — often amosite lagging." },
                    { location: "Rope seals and gaskets", risk: "MEDIUM", detail: "Woven asbestos rope was used to seal boiler doors, flue joints, and pipe connections. Still commonly found in older heating systems." },
                    { location: "Flue pipes", risk: "MEDIUM", detail: "Asbestos cement flue pipes were standard for gas boilers and fires. Found in domestic and commercial properties." },
                    { location: "Water tanks and cisterns", risk: "LOW", detail: "Asbestos cement water tanks and toilet cisterns were widely used. Low risk when intact but must not be drilled or broken." },
                    { location: "Fire blankets (older types)", risk: "MEDIUM", detail: "Some older fire blankets were made from woven asbestos cloth. Modern fire blankets are fibreglass." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-orange-400">{item.location}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.risk === "HIGH"
                            ? "bg-red-500/30 text-red-300"
                            : item.risk === "MEDIUM"
                            ? "bg-amber-500/30 text-amber-300"
                            : "bg-green-500/30 text-green-300"
                        }`}>{item.risk} RISK</span>
                      </div>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Common Locations — Electrical Installations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">06</span>
            Common Locations &mdash; Electrical Installations
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical installations are a particularly important area of concern for electricians.
                Asbestos was used in electrical components for its excellent insulating and fire-resistant
                properties. Many of these ACMs are concealed within enclosures and are not immediately
                visible during routine inspection.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical for Electricians</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>Any work on pre-2000 electrical installations must include asbestos checks.</strong> This
                  is not optional. Before opening consumer units, removing distribution boards, chasing walls,
                  lifting floor ducts, or drilling into surfaces in pre-2000 buildings, you must check the
                  asbestos register (for non-domestic premises) or assess the risk of encountering ACMs. Failure
                  to do so puts you and others at risk of fibre exposure and breaches the Control of Asbestos
                  Regulations 2012.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Electrical ACMs</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { location: "Consumer unit / distribution board flash guards", detail: "AIB panels fitted inside consumer units to act as arc barriers between fuse carriers. Very common in pre-2000 domestic and commercial installations." },
                    { location: "Fuse carriers and arc shields", detail: "Some older fuse carriers and arc shields within switchgear contain asbestos-based insulating materials." },
                    { location: "Cable trenching and floor ducts", detail: "Asbestos cement or AIB was used to form floor-level and below-ground cable ducts and trenches." },
                    { location: "Electrical backing boards", detail: "AIB boards mounted on walls behind switchgear, distribution boards, and meter cupboards to provide fire resistance." },
                    { location: "Heater storage bricks", detail: "Older electric storage heaters may contain asbestos in the insulation bricks and internal linings." },
                    { location: "Switchroom linings", detail: "Walls and ceilings in electrical switchrooms were often lined with AIB for fire protection." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-orange-400 mb-1">{item.location}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Practical Scenario &mdash; Consumer Unit Change</p>
                </div>
                <p className="text-sm text-white/80">
                  You are replacing a consumer unit in a 1970s property. When you remove the cover, you
                  notice a grey/white board material behind the fuse carriers. <strong>Stop immediately.</strong> This
                  is likely an AIB flash guard. Do not break, cut, drill, or remove it. Close the unit, inform
                  the customer, and arrange for the material to be sampled. If confirmed as AIB, its removal must
                  follow the correct asbestos work procedures — either licensed or notifiable non-licensed work
                  depending on the material condition and extent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Domestic Properties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">07</span>
            Domestic Properties
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Domestic properties built or refurbished between the 1930s and 1999 commonly contain
                asbestos-containing materials. Unlike non-domestic buildings, there is no legal duty to
                maintain an asbestos register for private homes. This means homeowners and tradespeople
                must be particularly vigilant when working in domestic settings.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Home className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-white">Common Domestic ACM Locations</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { location: "Artex / textured coatings", detail: "Ceilings and walls — very common in 1960s-1980s properties. Chrysotile at 1-5%." },
                    { location: "Garage roofs", detail: "Corrugated AC sheets on garage and shed roofs. Extremely common in pre-2000 housing." },
                    { location: "Exterior soffits and fascia", detail: "AC or AIB panels beneath roof overhangs and along eaves." },
                    { location: "Floor tiles", detail: "Thermoplastic tiles in kitchens, bathrooms, and hallways — often 25x25cm, dark-coloured." },
                    { location: "Boiler cupboard insulation", detail: "Asbestos insulation around boilers, hot-water cylinders, and flue pipes in airing cupboards." },
                    { location: "Bath panels", detail: "AIB panels fitted around baths — often painted and not immediately recognisable." },
                    { location: "Airing cupboard insulation", detail: "Pipe lagging and cylinder insulation within airing cupboards — may be amosite." },
                    { location: "Window sills and panels", detail: "AIB panels beneath windows and as window board linings, particularly in system-built houses." },
                    { location: "Old fuse boxes", detail: "AIB flash guards, backing boards, and arc shields within pre-2000 consumer units." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-orange-400 mb-1">{item.location}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">No Register, No Excuse</p>
                </div>
                <p className="text-sm text-white/80">
                  Although there is no legal duty for homeowners to maintain an asbestos register, this does
                  <strong> not</strong> reduce the risk to tradespeople. As an electrician, plumber, or builder
                  working in a domestic property, <strong>you</strong> have a duty under the Health and Safety
                  at Work Act 1974 and the Control of Asbestos Regulations 2012 to ensure you do not expose
                  yourself or others to asbestos fibres. If you suspect ACMs, stop work and arrange for testing.
                  The duty to manage asbestos risk applies to your own work activities regardless of what the
                  homeowner knows or does not know.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: High-Risk Building Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">08</span>
            High-Risk Building Types
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While ACMs can be found in virtually any pre-2000 building, certain building types are
                recognised as <strong>particularly high-risk</strong> due to the extent and type of asbestos
                used during their construction. Workers entering these buildings must be especially vigilant
                and should always consult the asbestos management plan before beginning any work.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-orange-500/20 border-b border-orange-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-orange-300">High-Risk Building Types</p>
                </div>

                {/* Schools */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-red-500/30 text-red-300 text-xs font-bold">SCHOOLS</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Schools are one of the most heavily affected building types. The post-war building
                        programme (1950s-1970s) used AIB extensively in ceilings, wall linings, heater
                        cupboards, window panels, and fire doors. The DfE (Department for Education) estimates
                        that the majority of schools built before 2000 contain some form of ACM. Any
                        maintenance, refurbishment, or electrical work in schools requires thorough asbestos
                        checks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hospitals */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-red-500/30 text-red-300 text-xs font-bold">HOSPITALS</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Hospitals contain extensive ACMs including pipe lagging (often amosite), ceiling tiles,
                        fire doors, floor tiles, and sprayed coatings. The combination of large building footprints,
                        complex service installations, and frequent refurbishment makes hospitals particularly
                        challenging to manage for asbestos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Industrial / Factory */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-orange-500/30 text-orange-300 text-xs font-bold">INDUSTRIAL</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Factories and industrial buildings used asbestos extensively for thermal insulation
                        (pipe lagging, boiler insulation), fire protection (sprayed coatings on steelwork,
                        fire doors), and weatherproofing (AC roof sheets and wall cladding). Sprayed asbestos
                        coatings on structural steelwork are among the highest-risk ACMs encountered.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Council Housing */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-orange-500/30 text-orange-300 text-xs font-bold">COUNCIL HOUSING</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        System-built council housing from the 1950s-1970s made extensive use of AIB in walls,
                        ceilings, soffits, and service risers. Some system-build types (e.g. BISF houses,
                        Airey houses) are particularly well-known for containing significant quantities of ACMs.
                        Social housing providers maintain asbestos registers and management plans for these properties.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Power Stations */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-red-500/30 text-red-300 text-xs font-bold">POWER STATIONS</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Power stations and heavy industrial facilities contain some of the most extensive and
                        highest-risk asbestos installations anywhere. Sprayed coatings, thermal insulation
                        (lagging), gaskets, and fire protection materials are found throughout. Decommissioning
                        and demolition of these facilities requires specialist licensed asbestos removal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ships & Dockyards */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">SHIPS &amp; DOCKYARDS</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Ships built before the 1990s used asbestos extensively for insulation, fireproofing,
                        and gaskets. Dockyard workers (laggers, electricians, engineers) are among the most
                        heavily exposed occupational groups. Mesothelioma rates remain elevated in former
                        dockyard towns such as Plymouth, Barrow, and the Clyde.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Railway */}
                <div className="p-4">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">RAILWAY</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Railway buildings, signal boxes, and older rolling stock contain ACMs. Station buildings
                        from the Victorian and Edwardian eras through to the 1990s may contain AC roofing,
                        AIB partitions, and pipe lagging. Older trains and carriages used asbestos in brakes,
                        insulation, and electrical components.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Key Takeaway</p>
                </div>
                <p className="text-sm text-white/80">
                  The type of building you are working in determines the <strong>likelihood and extent</strong> of
                  ACMs you may encounter. Schools, hospitals, industrial buildings, and system-built housing
                  are statistically more likely to contain significant quantities of asbestos. However, even a
                  simple domestic property can contain multiple ACMs. <strong>Never assume a building is
                  asbestos-free</strong> based on its appearance or age alone — always check the records or
                  arrange a survey.
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
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Types of Asbestos Fibres
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-1-section-4">
              Next: Health Effects of Exposure
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
