import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Mechanical vs Fusion Splicing | Fibre Optics Module 4";
const DESCRIPTION = "Compare mechanical and fusion splicing methods for fibre optics. Learn when to use each technique, their advantages, limitations, and application scenarios.";

const quickCheckQuestions = [
  {
    id: "splicing-qc1",
    question: "Which splicing method permanently joins fibres using an electric arc?",
    options: [
      "Mechanical splicing",
      "Fusion splicing",
      "Connector termination",
      "Crimp splicing"
    ],
    correctIndex: 1,
    explanation: "Fusion splicing uses an electric arc to melt and permanently fuse the fibre ends together, creating the lowest loss and most reliable permanent joint."
  },
  {
    id: "splicing-qc2",
    question: "What is the typical insertion loss of a quality fusion splice?",
    options: [
      "0.5-1.0 dB",
      "0.1-0.5 dB",
      "Less than 0.1 dB",
      "1.0-2.0 dB"
    ],
    correctIndex: 2,
    explanation: "Quality fusion splices typically achieve less than 0.1 dB insertion loss (often 0.02-0.05 dB), significantly lower than mechanical splices."
  },
  {
    id: "splicing-qc3",
    question: "What is the main advantage of mechanical splicing over fusion?",
    options: [
      "Lower loss",
      "No expensive equipment needed",
      "More permanent joint",
      "Better for singlemode"
    ],
    correctIndex: 1,
    explanation: "Mechanical splicing requires simpler, lower-cost tools compared to fusion splicers, making it suitable for emergency repairs and low-volume work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What holds the fibres together in a mechanical splice?",
    options: [
      "Welded glass",
      "Index-matching gel and mechanical alignment",
      "Epoxy adhesive only",
      "Heat shrink tubing"
    ],
    correctAnswer: 1,
    explanation: "Mechanical splices use index-matching gel between aligned fibres held in a precision housing."
  },
  {
    id: 2,
    question: "What is the typical insertion loss for a mechanical splice?",
    options: [
      "Less than 0.1 dB",
      "0.1-0.5 dB",
      "0.5-2.0 dB",
      "Greater than 3 dB"
    ],
    correctAnswer: 1,
    explanation: "Mechanical splices typically achieve 0.1-0.5 dB insertion loss, higher than fusion but acceptable for many applications."
  },
  {
    id: 3,
    question: "Which type of splice is most suitable for permanent backbone installations?",
    options: [
      "Mechanical splice",
      "Fusion splice",
      "Quick connector",
      "They are equally suitable"
    ],
    correctAnswer: 1,
    explanation: "Fusion splicing is preferred for permanent backbone installations due to lowest loss and highest reliability."
  },
  {
    id: 4,
    question: "What is required after fusion splicing to protect the splice point?",
    options: [
      "Electrical tape",
      "Fusion splice protector/heat shrink",
      "Crimping",
      "No protection needed"
    ],
    correctAnswer: 1,
    explanation: "Fusion splices require heat-shrink splice protectors to provide mechanical protection."
  },
  {
    id: 5,
    question: "What does index-matching gel do in a mechanical splice?",
    options: [
      "Glues fibres permanently",
      "Reduces reflection and fills air gaps",
      "Provides mechanical strength",
      "Protects from moisture"
    ],
    correctAnswer: 1,
    explanation: "Index-matching gel reduces reflections and fills the small air gap between fibre ends."
  },
  {
    id: 6,
    question: "For how many splices is a mechanical splice kit typically used?",
    options: [
      "Unlimited - reusable",
      "Single use only",
      "10 uses per unit",
      "5 uses per unit"
    ],
    correctAnswer: 1,
    explanation: "Each mechanical splice unit is typically single-use."
  },
  {
    id: 7,
    question: "What factor most affects fusion splice quality?",
    options: [
      "Room temperature",
      "Fibre cleave angle and cleanliness",
      "Splice protector type",
      "Cable jacket colour"
    ],
    correctAnswer: 1,
    explanation: "Cleave angle and fibre cleanliness are the most critical factors for fusion splice quality."
  },
  {
    id: 8,
    question: "Which scenario best suits mechanical splicing?",
    options: [
      "Permanent data centre backbone",
      "Emergency restoration/temporary repair",
      "Long-haul telecommunications",
      "High-density patch panel"
    ],
    correctAnswer: 1,
    explanation: "Mechanical splicing is ideal for emergency repairs and temporary restoration."
  },
  {
    id: 9,
    question: "What is the approximate cost difference between methods?",
    options: [
      "Fusion equipment costs 10x more than mechanical",
      "They cost about the same",
      "Mechanical equipment costs more",
      "Fusion equipment can cost 3,000 to 30,000 pounds vs 100-500 for mechanical"
    ],
    correctAnswer: 3,
    explanation: "Fusion splicers cost significantly more (3,000-30,000+ pounds) compared to mechanical splice kits (100-500 pounds)."
  },
  {
    id: 10,
    question: "Can mechanical splices be used on singlemode fibre?",
    options: [
      "No, only multimode",
      "Yes, but alignment is more critical",
      "Only with special equipment",
      "Only for temporary repairs"
    ],
    correctAnswer: 1,
    explanation: "Mechanical splices can be used on singlemode fibre but require more precise alignment than multimode."
  }
];

const faqs = [
  {
    question: "Which splicing method should I learn first?",
    answer: "Start with mechanical splicing to understand fibre preparation fundamentals (stripping, cleaving, cleaning) with lower-cost equipment. These skills transfer directly to fusion splicing. Many organisations train technicians on mechanical splices before progressing to fusion splicing equipment."
  },
  {
    question: "How long does each type of splice take?",
    answer: "An experienced technician can complete a mechanical splice in 2-5 minutes including fibre prep. Fusion splicing takes similar preparation time but the actual splice is faster (under 10 seconds for the arc). However, fusion includes heat-shrink protection time. Overall, both methods take similar time per splice once proficient."
  },
  {
    question: "Can I convert a mechanical splice to fusion later?",
    answer: "Yes. If a mechanical splice was installed as a temporary repair, you can cut it out and fusion splice the fibres for a permanent solution. Allow sufficient fibre length for this when installing mechanical splices. The mechanical splice housing is removed, fibres re-prepared, and fusion spliced."
  },
  {
    question: "Do mechanical splices degrade over time?",
    answer: "Quality mechanical splices can last years if properly installed, but the index-matching gel can be affected by temperature cycling, moisture ingress, or contamination. For critical permanent installations, fusion splicing provides better long-term reliability. Mechanical splices should be periodically checked."
  },
  {
    question: "What about loss testing - is it the same for both types?",
    answer: "Yes, both splice types require loss testing using an OTDR or power meter. The test method is identical - only acceptable loss values differ. Fusion splices should be under 0.1 dB; mechanical splices under 0.3-0.5 dB typically. Document all test results regardless of splice type."
  },
  {
    question: "Are there hybrid solutions?",
    answer: "Yes, some field-installable connectors use mechanical splice technology to join factory-terminated pigtails to field fibres. These offer connector convenience with mechanical splice installation simplicity. Splice-on or fusion splice connectors are also available using fusion splicing of connector pigtails."
  }
];

const FiberOpticsModule4Section1 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mechanical vs Fusion Splicing
          </h1>
          <p className="text-white/80">
            Comparing splicing methods for fibre optic installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fusion:</strong> Arc welds fibres, &lt;0.1 dB loss</li>
              <li><strong>Mechanical:</strong> Aligns fibres in holder, 0.1-0.5 dB</li>
              <li><strong>Fusion cost:</strong> Equipment 3,000-30,000+ pounds</li>
              <li><strong>Mechanical cost:</strong> Equipment 100-500 pounds</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">When to Use</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fusion:</strong> Permanent backbone, high fibre count</li>
              <li><strong>Fusion:</strong> Specifications require &lt;0.1 dB</li>
              <li><strong>Mechanical:</strong> Emergency repairs</li>
              <li><strong>Mechanical:</strong> Low volume, budget constraints</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Fusion splicing principles and process",
              "Mechanical splicing operation",
              "Loss characteristics comparison",
              "Equipment and cost considerations",
              "Application selection criteria",
              "Quality and reliability factors"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Fusion Splicing Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fusion Splicing Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fusion splicing creates a permanent, low-loss joint by melting two optical fibre ends together using an electric arc. The process fuses the glass cores and cladding into a single continuous structure, providing the highest quality splice available.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Fusion Process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Fibre preparation: Strip coating, clean fibre, precision cleave to &lt;1 degree angle</li>
                <li>2. Alignment: Machine automatically aligns fibre cores using cameras and micro-positioners</li>
                <li>3. Arc fusion: Electric arc (2000C+) melts and fuses fibre ends together</li>
                <li>4. Loss estimation: Machine estimates splice loss based on geometry</li>
                <li>5. Protection: Heat-shrink sleeve applied to protect the splice point</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Fusion Splice Performance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Singlemode typical loss:</strong> 0.02-0.05 dB</li>
                <li><strong>Singlemode maximum:</strong> 0.1 dB</li>
                <li><strong>Reflectance:</strong> &lt;-60 dB</li>
                <li><strong>Multimode typical loss:</strong> 0.01-0.03 dB</li>
                <li><strong>Multimode maximum:</strong> 0.1 dB</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lowest loss:</strong> Best possible optical performance</li>
                <li><strong>Permanent:</strong> Glass-to-glass fusion creates lasting joint</li>
                <li><strong>Consistent:</strong> Machine-controlled process reduces variability</li>
                <li><strong>High reliability:</strong> No gel degradation or mechanical wear</li>
                <li><strong>Small size:</strong> Compact splice protectors fit in enclosures</li>
              </ul>
            </div>

            <p>
              Modern fusion splicers use sophisticated imaging and alignment systems. Core alignment splicers (used for singlemode) achieve the best results by directly viewing and aligning the fibre cores, while clad-alignment splicers (for multimode) are more economical.
            </p>
          </div>
        </section>

        {/* Section 2: Mechanical Splicing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Mechanical Splicing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mechanical splicing aligns and holds two fibre ends together in a precision housing without permanently fusing them. Index-matching gel fills the gap between fibres, reducing reflections and transmission loss.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mechanical Splice Construction:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Alignment mechanism:</strong> V-groove or precision tube holds fibres in alignment</li>
                <li><strong>Index-matching gel:</strong> Optical gel with refractive index matching glass fills gap</li>
                <li><strong>Locking mechanism:</strong> Clamp, snap, or cam lock secures fibres in place</li>
                <li><strong>Outer housing:</strong> Protective enclosure provides mechanical protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Strip fibre: Remove coating to expose bare fibre</li>
                <li>2. Clean fibre: Remove debris with lint-free wipes and alcohol</li>
                <li>3. Cleave fibre: Cut to specified length with precision cleaver</li>
                <li>4. Insert fibres: Push fibres into splice body from each end</li>
                <li>5. Engage lock: Activate locking mechanism to clamp fibres</li>
                <li>6. Test: Verify acceptable loss with power meter or OTDR</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Low equipment cost</li>
                <li>Portable - no power needed</li>
                <li>Quick training time</li>
                <li>Suitable for emergency repairs</li>
                <li>Can be re-made if needed</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Limitations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Higher loss than fusion</li>
                <li>Gel can degrade over time</li>
                <li>Temperature sensitivity</li>
                <li>Larger physical size</li>
                <li>Higher cost per splice</li>
              </ul>
            </div>

            <p>
              Common mechanical splice products include the 3M Fibrlok, Corning Unicam pre-polished connector, and various manufacturer-specific designs. Each requires specific tools and follows particular installation procedures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Loss Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Loss Characteristics Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the loss characteristics of each method is crucial for link budget calculations and meeting system requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Loss Values (dB):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion (SM):</strong> Typical 0.02-0.05 dB, Maximum 0.1 dB</li>
                <li><strong>Fusion (MM):</strong> Typical 0.01-0.03 dB, Maximum 0.1 dB</li>
                <li><strong>Mechanical (SM):</strong> Typical 0.1-0.2 dB, Maximum 0.3 dB</li>
                <li><strong>Mechanical (MM):</strong> Typical 0.1-0.2 dB, Maximum 0.5 dB</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Link Budget Impact:</p>
              <p className="text-sm text-white mb-2">Example: 10-splice backbone link calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion splices:</strong> 10 x 0.05 dB = 0.5 dB total splice loss</li>
                <li><strong>Mechanical splices:</strong> 10 x 0.2 dB = 2.0 dB total splice loss</li>
                <li><strong>Difference:</strong> 1.5 dB additional margin with fusion</li>
              </ul>
              <p className="text-xs text-white mt-2">
                On long links with many splices, this difference can determine if the link works.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Loss Factors (Both Methods):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cleave angle (critical)</li>
                <li>Fibre cleanliness</li>
                <li>Core diameter mismatch</li>
                <li>Mode field diameter</li>
                <li>Alignment accuracy</li>
                <li>End-face quality</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Equipment and Costs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Equipment and Cost Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The significant difference in equipment costs influences the choice between methods based on volume of work and budget constraints.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fusion Splicing Equipment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion splicer:</strong> 3,000-30,000+ pounds depending on features</li>
                <li><strong>Precision cleaver:</strong> 500-2,000 pounds</li>
                <li><strong>Splice protectors:</strong> 0.50-2 pounds each</li>
                <li><strong>Stripping tools:</strong> 50-200 pounds</li>
                <li><strong>Consumables:</strong> Electrodes, cleaning supplies</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mechanical Splicing Equipment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mechanical splice kit:</strong> 100-500 pounds for tool set</li>
                <li><strong>Basic cleaver:</strong> 100-500 pounds</li>
                <li><strong>Splice units:</strong> 5-20 pounds each (single use)</li>
                <li><strong>Stripping tools:</strong> 50-100 pounds</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Per Splice Comparison:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion (after equipment investment):</strong> Splice protector + consumables approximately 1-3 pounds per splice</li>
                <li><strong>Mechanical:</strong> Splice unit approximately 5-20 pounds per splice</li>
              </ul>
              <p className="text-xs text-white mt-2">
                Crossover point: Fusion becomes more economical at approximately 200-500 splices depending on equipment choice.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Equipment Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Portability:</strong> Both can be field-used; mechanical needs no power</li>
                <li><strong>Training:</strong> Fusion requires more training but produces consistent results</li>
                <li><strong>Maintenance:</strong> Fusion splicers need calibration and electrode replacement</li>
                <li><strong>Rental:</strong> Fusion splicers available for hire for occasional use</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Application Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Application Selection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Choosing the right splicing method depends on the application requirements, environment, budget, and permanence needed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Use Fusion Splicing When:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Permanent backbone or infrastructure installation</li>
                <li>Maximum performance and reliability required</li>
                <li>Long-haul telecommunications</li>
                <li>High fibre count cables (cost per splice matters)</li>
                <li>Specification requires low splice loss (&lt;0.1 dB)</li>
                <li>Data centre and enterprise backbone</li>
                <li>Submarine or inaccessible cable installations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Use Mechanical Splicing When:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Emergency restoration and temporary repairs</li>
                <li>Low-volume installations (fewer than 50-100 splices)</li>
                <li>No access to power for equipment</li>
                <li>Budget constraints on equipment purchase</li>
                <li>Training time is limited</li>
                <li>Future access for reconfiguration needed</li>
                <li>Field-installable connector applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Decision Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Permanence:</strong> Fusion excellent, Mechanical good</li>
                <li><strong>Low loss:</strong> Fusion excellent, Mechanical good</li>
                <li><strong>Low equipment cost:</strong> Fusion poor, Mechanical excellent</li>
                <li><strong>Field portability:</strong> Fusion good, Mechanical excellent</li>
                <li><strong>High volume cost:</strong> Fusion excellent, Mechanical poor</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Quality and Reliability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Quality and Reliability Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Long-term reliability and consistent quality are critical considerations, particularly for permanent infrastructure installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fusion Splice Reliability:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Glass-to-glass bond is permanent</li>
                <li>No degradation over time</li>
                <li>Temperature stable</li>
                <li>No moving parts to fail</li>
                <li>Expected life: 25+ years</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mechanical Splice Reliability:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Gel can dry or migrate</li>
                <li>Temperature cycling effects</li>
                <li>Potential for moisture ingress</li>
                <li>Mechanical parts can loosen</li>
                <li>Periodic inspection recommended</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Assurance (Both Methods):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Proper fibre preparation (stripping, cleaning, cleaving)</li>
                <li>Following manufacturer procedures exactly</li>
                <li>Testing every splice and documenting results</li>
                <li>Proper protection of completed splices</li>
                <li>Competent, trained technicians</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Testing Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OTDR testing:</strong> Verifies splice loss and location</li>
                <li><strong>Insertion loss:</strong> End-to-end power measurement</li>
                <li><strong>Visual inspection:</strong> Fusion splicer provides splice image</li>
                <li><strong>Documentation:</strong> Record all test results for handover</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Industry Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Permanent infrastructure:</strong> Always specify fusion splicing</li>
                <li><strong>Emergency kits:</strong> Keep mechanical splice kit for repairs</li>
                <li><strong>Training:</strong> Ensure technicians trained on equipment being used</li>
                <li><strong>Documentation:</strong> Record all splice loss values and locations</li>
                <li><strong>Cleaving:</strong> Invest in quality cleavers - critical for both methods</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Dirty fibres</strong> - Contamination causes high loss, always clean thoroughly</li>
                <li><strong>Poor cleave</strong> - Bad cleave angle ruins any splice, practice technique</li>
                <li><strong>Wrong method selection</strong> - Using mechanical for permanent backbone work</li>
                <li><strong>Skipping tests</strong> - Every splice must be tested, no exceptions</li>
                <li><strong>Inadequate protection</strong> - Splices need proper heat-shrink or housing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Method Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Is this a permanent installation? Then use Fusion</li>
                <li>Is budget extremely limited? Then Mechanical (short term)</li>
                <li>Are there many splices? Then Fusion (cost per splice)</li>
                <li>Is this emergency repair? Then Mechanical (replace later)</li>
                <li>Does specification require &lt;0.1 dB? Then Fusion only</li>
              </ul>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Splicing Methods</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Fusion Splicing</p>
                <ul className="space-y-0.5">
                  <li>Loss: &lt;0.1 dB (typical 0.02-0.05)</li>
                  <li>Equipment: 3,000-30,000+ pounds</li>
                  <li>Per splice: 1-3 pounds</li>
                  <li>Permanent, highest reliability</li>
                  <li>Backbone, infrastructure</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Mechanical Splicing</p>
                <ul className="space-y-0.5">
                  <li>Loss: 0.1-0.5 dB typical</li>
                  <li>Equipment: 100-500 pounds</li>
                  <li>Per splice: 5-20 pounds</li>
                  <li>Re-workable, portable</li>
                  <li>Repairs, low volume</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-white mt-4">
              <strong>Key:</strong> Quality depends on cleave angle + fibre cleanliness. Test every splice!
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next: Cleaving and Fibre Prep
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule4Section1;
