import { ArrowLeft, Zap, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "flash-guard-material",
    question: "What material was most commonly used for flash guards inside pre-2000 consumer units and distribution boards?",
    options: [
      "Asbestos insulating board (AIB) containing amosite",
      "Asbestos cement containing chrysotile",
      "Sprayed limpet asbestos containing crocidolite",
      "Asbestos rope containing chrysotile"
    ],
    correctIndex: 0,
    explanation: "Flash guards and arc barriers inside consumer units and distribution boards were typically made from asbestos insulating board (AIB) containing amosite (brown asbestos). AIB was chosen for its excellent fire resistance and electrical insulation properties."
  },
  {
    id: "electrician-first-step",
    question: "What is the FIRST thing an electrician should do before starting any work in a pre-2000 building?",
    options: [
      "Ask the dutyholder or client about the asbestos register",
      "Visually inspect the work area for suspected ACMs",
      "Put on an FFP3 mask as a precaution",
      "Begin work carefully and stop only if something suspicious is found"
    ],
    correctIndex: 0,
    explanation: "The very first step is to ask the dutyholder or client about the asbestos register and check whether a management survey has been carried out. This should happen before you even enter the work area. Visual inspection is important but comes after checking the register."
  },
  {
    id: "electrician-never-do",
    question: "Which of the following should an electrician NEVER do if they suspect a material contains asbestos?",
    options: [
      "Stop work immediately and leave the area",
      "Drill through the material carefully while wearing a dust mask",
      "Report the material to the supervisor and dutyholder",
      "Presume the material is asbestos until proven otherwise"
    ],
    correctIndex: 1,
    explanation: "An electrician must NEVER drill into, cut, or disturb suspected asbestos-containing materials, regardless of what PPE they are wearing. A standard dust mask does not protect against asbestos fibres. The correct actions are to stop work, leave the area, and report the suspected ACM immediately."
  }
];

const faqs = [
  {
    question: "How can I tell if a flash guard or backing board contains asbestos?",
    answer: "You cannot tell by visual inspection alone. Many AIB flash guards and backing boards look like ordinary fibreboard or hardboard, especially when painted. The only reliable way to confirm whether a material contains asbestos is through laboratory analysis (Polarised Light Microscopy) of a sample taken by a competent person. If you are working in a pre-2000 building and encounter a board material inside a consumer unit, distribution board, or behind electrical equipment, you must presume it contains asbestos until proven otherwise."
  },
  {
    question: "Am I allowed to remove an asbestos flash guard from a consumer unit myself?",
    answer: "No. Electricians with only asbestos awareness training are NOT qualified to remove asbestos-containing materials. Removal of AIB flash guards may constitute licensed work under the Control of Asbestos Regulations 2012, depending on the condition of the material and the risk assessment. If you discover a suspected asbestos flash guard, you must stop work immediately, close the board, report to the dutyholder, and arrange for a competent asbestos professional to assess the material. Only a licensed asbestos removal contractor (or, in some limited cases, a contractor holding a non-licensed work notification) may carry out the removal."
  },
  {
    question: "What should I do if I have already disturbed what I now think might be asbestos?",
    answer: "Stop work immediately. Do not attempt to clean up. Leave the area and prevent others from entering. Report the incident to your supervisor and the dutyholder immediately. If dust or debris has been created, do not sweep or vacuum it with a standard vacuum cleaner — this will spread fibres further. The area will need to be assessed by a competent person and may require specialist cleaning by a licensed contractor. You should also record the incident and seek advice from your employer about health surveillance. A single brief exposure does not mean you will definitely develop disease, but it is important that the incident is properly recorded and managed."
  },
  {
    question: "Do modern consumer units and distribution boards contain asbestos?",
    answer: "No. Any consumer unit, distribution board, or switchgear manufactured after the year 2000 will not contain asbestos, as all forms of asbestos were banned in the UK in 1999. Modern boards use non-asbestos fire-resistant materials. However, when replacing an old board, the existing board being removed may contain asbestos flash guards or backing boards, and the wall behind the board may be an asbestos-containing backing board. Always check before beginning a board change in a pre-2000 building."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why are electricians considered one of the trades MOST at risk of asbestos exposure?",
    options: [
      "They work with high-voltage equipment that generates asbestos fibres",
      "Their work frequently involves drilling, chasing, and accessing concealed spaces where ACMs may be present",
      "Electrical tools generate static that attracts asbestos fibres",
      "They are required to remove asbestos as part of their normal duties"
    ],
    correctAnswer: 1,
    explanation: "Electricians are among the highest-risk trades because their work routinely involves drilling into walls, chasing cables, opening consumer units, and working in ceiling voids and confined spaces — all activities that can disturb hidden asbestos-containing materials in pre-2000 buildings."
  },
  {
    id: 2,
    question: "What was the primary purpose of AIB flash guards inside consumer units and distribution boards?",
    options: [
      "To improve the electrical conductivity between busbars",
      "To prevent condensation inside the enclosure",
      "To prevent arcing between busbars and provide fire resistance",
      "To act as cable support brackets"
    ],
    correctAnswer: 2,
    explanation: "AIB flash guards were installed as arc barriers between busbars inside consumer units and distribution boards. Their purpose was to prevent arcing (electrical flashover) between live conductors and to provide fire resistance within the enclosure."
  },
  {
    id: 3,
    question: "Which of the following activities could disturb asbestos flash guards in a consumer unit?",
    options: [
      "Reading the serial number on the outside of the board",
      "Carrying out a board change, circuit modification, or inspection and testing",
      "Switching off an MCB from the front panel",
      "Labelling circuits on the schedule of circuits"
    ],
    correctAnswer: 1,
    explanation: "Opening a pre-2000 consumer unit for board changes, circuit modifications, fuse replacement, or inspection and testing can disturb asbestos flash guards inside. Activities that only involve the external surface of the board (reading labels, switching MCBs) are less likely to cause disturbance, but a check should still be made before opening any pre-2000 board."
  },
  {
    id: 4,
    question: "Asbestos cement cable trench covers are most commonly found in which type of building?",
    options: [
      "Post-2000 domestic new-builds",
      "Modern modular housing",
      "Industrial buildings, power stations, and older commercial premises",
      "Garden sheds and outbuildings"
    ],
    correctAnswer: 2,
    explanation: "Asbestos cement cable trench covers and floor duct systems are most commonly found in industrial buildings, power stations, and older commercial premises where large cable runs required protected routes. They may be hidden under raised floors or carpet tiles."
  },
  {
    id: 5,
    question: "What type of asbestos product might you find used as a backing board behind electrical switchgear?",
    options: [
      "Sprayed limpet asbestos",
      "Asbestos insulating board (AIB)",
      "Asbestos rope and yarn",
      "Loose-fill asbestos insulation"
    ],
    correctAnswer: 1,
    explanation: "Asbestos insulating board (AIB) was widely used as backing boards for switchgear, distribution boards, and electrical equipment. These boards were mounted on walls behind installations to provide fire resistance. They can be large panels (1m x 2m or more) and are often painted, making them difficult to identify visually."
  },
  {
    id: 6,
    question: "Before starting any electrical work in a pre-2000 building, what should you check FIRST?",
    options: [
      "Whether you have an FFP3 mask in your toolkit",
      "Whether the building has been recently redecorated",
      "The asbestos register and whether a management survey has been carried out",
      "Whether the local council has an asbestos database"
    ],
    correctAnswer: 2,
    explanation: "The first action is always to ask the dutyholder or client about the asbestos register and check whether a management survey has been carried out under the Control of Asbestos Regulations 2012, Regulation 4. If no register exists, you must presume that ACMs may be present."
  },
  {
    id: 7,
    question: "Older night storage heaters may contain which of the following asbestos-containing components?",
    options: [
      "Asbestos-wrapped copper cables",
      "Asbestos insulation bricks",
      "Sprayed crocidolite coatings",
      "Asbestos cement roof tiles"
    ],
    correctAnswer: 1,
    explanation: "Older night storage heaters may contain asbestos insulation bricks inside the unit. These bricks retain heat and were manufactured using asbestos for its excellent thermal insulation properties. Always check before disconnecting or removing old electric heating equipment."
  },
  {
    id: 8,
    question: "If you discover a suspected ACM during electrical work, what is the correct sequence of actions?",
    options: [
      "Take a sample, send it to a lab, continue work if the result is negative",
      "Cover the material with tape, continue work around it, report at the end of the day",
      "Stop work immediately, do not disturb the material, leave the area, report to your supervisor and the dutyholder",
      "Put on a dust mask, carefully work around the material, and report it later"
    ],
    correctAnswer: 2,
    explanation: "The correct sequence is: STOP work immediately, do NOT disturb the material further, leave the area, prevent others from entering, and report to your supervisor and the dutyholder immediately. Do not attempt to sample, remove, or work around suspected ACMs. Work must not resume until the material has been assessed by a competent person."
  }
];

export default function AsbestosModule3Section3() {
  useSEO({
    title: "ACMs in Electrical Installations | Asbestos Awareness Module 3.3",
    description: "Flash guards, backing boards, cable trenching, switchgear, fuse carriers, and pre-work checks for electricians working in pre-2000 buildings.",
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
            <Zap className="h-7 w-7 text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-500 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            ACMs in Electrical Installations
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Flash guards, backing boards, cable trenching, switchgear, and the pre-work checks that could save your life
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Who:</strong> Electricians are among the trades MOST at risk</li>
              <li><strong>Where:</strong> Consumer units, backing boards, cable ducts, switchgear</li>
              <li><strong>When:</strong> Any pre-2000 electrical installation</li>
              <li><strong>Rule:</strong> Always check the asbestos register before starting work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Check the register &mdash; ask the dutyholder</li>
              <li><strong>During:</strong> If you suspect ACMs &mdash; STOP immediately</li>
              <li><strong>Never:</strong> Drill, chase, or cut through suspected ACMs</li>
              <li><strong>Report:</strong> Every suspected ACM &mdash; it could save lives</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why electricians are among the highest-risk trades for asbestos exposure",
              "Identify common ACM locations within electrical installations",
              "Describe the risks posed by flash guards in consumer units and distribution boards",
              "Recognise asbestos backing boards, cable trenching, and switchgear components",
              "Outline the pre-work checks required before starting any work in a pre-2000 building",
              "List the actions an electrician must NEVER take when encountering suspected ACMs"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why This Section Matters for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">01</span>
            Why This Section Matters for Electricians
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Information for Every Electrician</p>
                </div>
                <p className="text-sm text-white/80">
                  Electricians are among the trades <strong className="text-white">MOST at risk</strong> of
                  asbestos exposure. This is not a historical problem &mdash; it is a current, daily risk
                  for anyone carrying out electrical work in buildings constructed or refurbished before the
                  year 2000. This section is specifically written for you.
                </p>
              </div>

              <p>
                Electrical work frequently involves <strong>drilling into walls, chasing cables, lifting
                floorboards, working in ceiling voids, and accessing confined spaces</strong> &mdash; all
                activities that carry a high risk of disturbing hidden asbestos-containing materials. Unlike
                some trades where contact with building fabric is occasional, electricians interact with the
                structure of a building on almost every job.
              </p>

              <p>
                Pre-2000 electrical installations commonly used asbestos-containing components. Flash guards
                inside consumer units, backing boards behind distribution boards, cable trench covers, and
                switchgear arc shields were all routinely manufactured using asbestos insulating board (AIB)
                or asbestos cement (AC). Many of these components remain in service today, hidden inside
                enclosures and behind panels where they are not immediately visible.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">JIB Guidance:</strong> The Joint Industry Board (JIB)
                  emphasises that all electrical workers must hold asbestos awareness training and understand
                  the specific risks relevant to their trade. The JIB recognises that electricians have
                  historically been one of the most heavily exposed groups, and that ongoing vigilance is
                  essential to prevent further harm.
                </p>
              </div>

              <p>
                Many electricians have historically been exposed to asbestos fibres without knowing it.
                Opening old fuse boards, drilling into AIB backing boards, pulling cables through
                asbestos-lined ducts &mdash; these were routine activities that no one thought twice about
                before the risks were widely understood. This historical exposure is a significant
                contributor to the <strong>approximately 5,000 asbestos-related deaths</strong> that occur
                in the UK every year.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Bottom Line</p>
                <p className="text-sm text-white/80">
                  <strong className="text-orange-400">Every electrical job in a pre-2000 building requires a
                  pre-work asbestos check.</strong> This is not optional. It is not something you do only on
                  large commercial jobs. It applies to every rewire, every board change, every socket
                  addition, every inspection and test &mdash; in every building built or refurbished before
                  2000. No exceptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Flash Guards in Consumer Units and Distribution Boards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">02</span>
            Flash Guards in Consumer Units &amp; Distribution Boards
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos insulating board (AIB) was widely used as <strong>flash guards</strong> (also
                called arc barriers) inside consumer units and distribution boards. These thin panels of AIB
                were positioned between busbars and other live components to prevent electrical arcing and to
                provide fire resistance within the enclosure.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-3">Flash Guard Key Facts</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-orange-400">Purpose</p>
                    <p className="text-white/70 text-xs">Prevent arcing between busbars and provide fire resistance</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-orange-400">Material</p>
                    <p className="text-white/70 text-xs">Typically AIB containing amosite (brown asbestos)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-orange-400">Found In</p>
                    <p className="text-white/70 text-xs">Rewireable fuse boards, older MCB boards, commercial distribution boards</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-orange-400">Disturbed By</p>
                    <p className="text-white/70 text-xs">Board changes, circuit mods, fuse replacement, inspection &amp; testing</p>
                  </div>
                </div>
              </div>

              <p>
                Flash guards are found in <strong>rewireable fuse boards</strong> (BS 3036),
                <strong> older MCB boards</strong>, and <strong>distribution boards</strong> in commercial
                and industrial buildings. They are typically thin, flat panels slotted between busbars or
                fixed to internal partitions within the enclosure. Because they sit inside the board, they
                are not visible from the outside &mdash; you only encounter them when you open the cover.
              </p>

              <p>
                These flash guards can be disturbed during a range of common electrical activities:
                <strong> board changes</strong> (removing the old board), <strong>circuit modifications</strong>
                (accessing the busbars), <strong>fuse replacement</strong> (particularly in rewireable
                boards), and <strong>inspection and testing</strong> (opening the board for visual
                inspection). Any of these activities can crack, break, or abrade the AIB, releasing asbestos
                fibres into the air within the enclosed space of the board &mdash; and directly into the
                breathing zone of the electrician.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">CRITICAL &mdash; Before Opening Any Pre-2000 Board</p>
                </div>
                <p className="text-sm text-white/80">
                  Before opening <strong className="text-white">any</strong> pre-2000 consumer unit or distribution
                  board, you must check whether asbestos flash guards are present. Consult the asbestos
                  register. If there is no register, or if the board has not been assessed, <strong
                  className="text-white">presume that AIB may be present</strong> and do not proceed until
                  the material has been identified by a competent person.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">If Flash Guards Are Found</p>
                <ol className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">1</span>
                    <span><strong className="text-white">STOP work</strong> &mdash; do not attempt to remove the flash guards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">2</span>
                    <span><strong className="text-white">Close the board</strong> carefully to prevent further disturbance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">3</span>
                    <span><strong className="text-white">Report</strong> to your supervisor and the dutyholder immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">4</span>
                    <span><strong className="text-white">Arrange removal</strong> by a licensed contractor (may be licensed work depending on condition)</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Styled-Div Diagram: Electrical Installation ACM Locations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">&mdash;</span>
            Electrical Installation ACM Locations
          </h2>
          <div className="space-y-6">
            {/* Consumer Unit / Distribution Board Cutaway */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
              <p className="text-sm font-medium text-orange-400 mb-4 text-centre">Consumer Unit / Distribution Board &mdash; Cutaway View</p>
              <div className="relative mx-auto max-w-lg">
                {/* Outer enclosure */}
                <div className="border-2 border-white/30 rounded-lg bg-[#1a1a1a] p-3 sm:p-4">
                  {/* Cable entries top */}
                  <div className="flex justify-around mb-2">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-6 border border-white/40 rounded-t-sm bg-white/5" />
                      <span className="text-[9px] text-white/40 mt-0.5">Cable in</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-6 border border-white/40 rounded-t-sm bg-white/5" />
                      <span className="text-[9px] text-white/40 mt-0.5">Cable in</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-6 border border-white/40 rounded-t-sm bg-white/5" />
                      <span className="text-[9px] text-white/40 mt-0.5">Cable in</span>
                    </div>
                  </div>

                  {/* Internal layout */}
                  <div className="flex gap-1 sm:gap-2 items-stretch min-h-[180px] sm:min-h-[220px]">
                    {/* Left busbar section */}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex-1 border border-white/20 rounded bg-white/5 p-2 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-white/60 text-center">MCB / Fuse way</span>
                      </div>
                      <div className="flex-1 border border-white/20 rounded bg-white/5 p-2 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-white/60 text-center">MCB / Fuse way</span>
                      </div>
                      <div className="flex-1 border border-white/20 rounded bg-white/5 p-2 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-white/60 text-center">MCB / Fuse way</span>
                      </div>
                    </div>

                    {/* Flash guard panel - HIGHLIGHTED */}
                    <div className="w-6 sm:w-8 border-2 border-orange-500 rounded bg-orange-500/20 flex items-center justify-center relative">
                      <span className="text-[8px] sm:text-[9px] text-orange-400 font-bold writing-mode-vertical rotate-180" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                        AIB FLASH GUARD
                      </span>
                    </div>

                    {/* Busbars */}
                    <div className="w-3 sm:w-4 flex flex-col justify-between py-2">
                      <div className="h-full bg-red-500/60 rounded-sm w-1 mx-auto" />
                    </div>

                    {/* Flash guard panel - HIGHLIGHTED */}
                    <div className="w-6 sm:w-8 border-2 border-orange-500 rounded bg-orange-500/20 flex items-center justify-center relative">
                      <span className="text-[8px] sm:text-[9px] text-orange-400 font-bold" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                        AIB FLASH GUARD
                      </span>
                    </div>

                    {/* Right busbar section */}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex-1 border border-white/20 rounded bg-white/5 p-2 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-white/60 text-center">MCB / Fuse way</span>
                      </div>
                      <div className="flex-1 border border-white/20 rounded bg-white/5 p-2 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-white/60 text-center">MCB / Fuse way</span>
                      </div>
                      <div className="flex-1 border border-white/20 rounded bg-white/5 p-2 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-white/60 text-center">MCB / Fuse way</span>
                      </div>
                    </div>
                  </div>

                  {/* Cable entries bottom */}
                  <div className="flex justify-around mt-2">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] text-white/40 mb-0.5">Cable out</span>
                      <div className="w-4 h-6 border border-white/40 rounded-b-sm bg-white/5" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] text-white/40 mb-0.5">Cable out</span>
                      <div className="w-4 h-6 border border-white/40 rounded-b-sm bg-white/5" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] text-white/40 mb-0.5">Cable out</span>
                      <div className="w-4 h-6 border border-white/40 rounded-b-sm bg-white/5" />
                    </div>
                  </div>

                  {/* Backing board indicator */}
                  <div className="mt-3 border-2 border-dashed border-orange-400/50 rounded bg-orange-500/10 p-2 text-center">
                    <span className="text-[10px] sm:text-xs text-orange-400 font-medium">&#8595; Possible AIB backing board behind unit (mounted on wall) &#8595;</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-3 justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-orange-500 bg-orange-500/20 rounded-sm" />
                    <span className="text-[10px] text-white/60">Possible ACM</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-red-500/60 rounded-sm" />
                    <span className="text-[10px] text-white/60">Busbar</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border border-white/20 bg-white/5 rounded-sm" />
                    <span className="text-[10px] text-white/60">MCB / Fuse way</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cable Routes Diagram */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
              <p className="text-sm font-medium text-orange-400 mb-4 text-centre">Cable Routes &mdash; Potential ACM Locations</p>
              <div className="relative mx-auto max-w-lg space-y-2">
                {/* Ceiling void */}
                <div className="border border-white/20 rounded bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Ceiling Void</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-[10px] text-orange-400">Possible sprayed coatings or AIB</span>
                    </div>
                  </div>
                  <div className="mt-2 border-t border-dashed border-orange-400/40 pt-1">
                    <div className="h-1 bg-white/20 rounded mx-8" />
                    <span className="text-[9px] text-white/40 block text-center mt-0.5">Cable route through void</span>
                  </div>
                </div>

                {/* Wall partition */}
                <div className="flex gap-2 items-stretch min-h-[60px]">
                  <div className="flex-1 border border-white/20 rounded bg-white/5 p-2 flex items-center justify-center">
                    <span className="text-[10px] text-white/40">Room A</span>
                  </div>
                  <div className="w-8 border-2 border-orange-500 rounded bg-orange-500/20 flex items-center justify-center">
                    <span className="text-[8px] text-orange-400 font-bold" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>AIB WALL</span>
                  </div>
                  <div className="flex-1 border border-white/20 rounded bg-white/5 p-2 flex items-center justify-center">
                    <span className="text-[10px] text-white/40">Room B</span>
                  </div>
                </div>

                {/* Floor duct */}
                <div className="border border-white/20 rounded bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Floor Level</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-[10px] text-orange-400">AC cable trench covers</span>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-1">
                    <div className="flex-1 h-5 border-2 border-orange-500/60 rounded bg-orange-500/10 flex items-center justify-center">
                      <span className="text-[8px] text-orange-400">AC Cover</span>
                    </div>
                    <div className="flex-1 h-5 border-2 border-orange-500/60 rounded bg-orange-500/10 flex items-center justify-center">
                      <span className="text-[8px] text-orange-400">AC Cover</span>
                    </div>
                    <div className="flex-1 h-5 border-2 border-orange-500/60 rounded bg-orange-500/10 flex items-center justify-center">
                      <span className="text-[8px] text-orange-400">AC Cover</span>
                    </div>
                  </div>
                  <div className="mt-1 h-4 border border-white/10 rounded bg-white/5 flex items-center justify-center">
                    <span className="text-[8px] text-white/40">Cable duct below</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Electrical Backing Boards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">03</span>
            Electrical Backing Boards
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos insulating board (AIB) was extensively used as <strong>backing boards</strong> for
                switchgear, distribution boards, and electrical equipment. These boards were mounted on walls
                behind electrical installations to provide fire resistance and a stable, insulating surface
                for mounting equipment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Where Backing Boards Are Found</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Commercial premises</strong> &mdash; behind main switch panels and distribution boards</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Industrial buildings</strong> &mdash; behind switchgear and motor control centres</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Schools &amp; hospitals</strong> &mdash; behind distribution boards and sub-main panels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Plant rooms</strong> &mdash; behind control panels and electrical enclosures</span>
                  </div>
                </div>
              </div>

              <p>
                Backing boards can be <strong>large panels</strong> &mdash; 1 metre by 2 metres or more in
                some cases. They are often <strong>painted</strong> and may not be immediately obvious as
                asbestos. A painted AIB backing board can look identical to standard fibreboard, plywood, or
                even plasterboard. You cannot tell the difference by appearance alone.
              </p>

              <p>
                These boards are disturbed during common electrical activities: <strong>mounting new
                equipment</strong> (drilling fixings into the board), <strong>replacing distribution
                boards</strong> (removing the old board exposes the backing), <strong>chasing cables</strong>
                (running new cable routes behind or through the board), and <strong>drilling fixings</strong>
                (attaching brackets, clips, or containment to the board surface).
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Removal:</strong> AIB backing boards in poor
                  condition may require <strong>licensed removal</strong> under the Control of Asbestos
                  Regulations 2012. Even boards in good condition must only be removed by a competent
                  contractor following appropriate controls. An electrician with awareness training alone is
                  not qualified to remove these materials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Cable Trenching and Floor Ducts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">04</span>
            Cable Trenching &amp; Floor Ducts
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos cement (AC) was widely used for <strong>cable trenching covers</strong> and
                <strong> floor duct systems</strong>. These heavy grey sheets provided fire-resistant
                protection for cable routes running beneath floors, through risers, and across service
                corridors.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Locations for AC Cable Trenching</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Industrial buildings</strong> &mdash; cable runs across factory floors and between switchrooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Power stations</strong> &mdash; extensive cable duct systems throughout the plant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Commercial premises</strong> &mdash; floor ducts in older office buildings and retail units</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Older office buildings</strong> &mdash; hidden under raised floors or carpet tiles</span>
                  </li>
                </ul>
              </div>

              <p>
                AC cable trench covers are typically <strong>heavy grey sheets</strong>, often with a
                slightly rough or textured surface. They may be flush with the floor surface or recessed
                into channels. Over time they may become painted, covered with adhesive from floor tiles, or
                obscured by raised flooring systems &mdash; making them difficult to identify.
              </p>

              <p>
                In addition to AC covers, you may find <strong>AIB used as duct linings or separators</strong>
                inside floor duct systems. These internal partitions divided cables into separate
                compartments and were sometimes installed using asbestos insulating board.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">When ACMs Are Disturbed</p>
                </div>
                <p className="text-sm text-white/80">
                  Cable trench covers and floor ducts are disturbed when <strong className="text-white">pulling
                  new cables</strong>, <strong className="text-white">accessing existing cables</strong> for
                  testing or modification, and <strong className="text-white">modifying cable routes</strong>.
                  Lifting, sliding, or breaking AC covers can release asbestos fibres. Floor ducts hidden
                  under raised floors or carpet tiles may be encountered unexpectedly during electrical work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Switchgear Arc Shields and Fuse Carriers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">05</span>
            Switchgear Arc Shields &amp; Fuse Carriers
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Older switchgear used <strong>asbestos arc shields and barriers</strong> to contain
                electrical arcs and prevent fire spread. These components are found in a range of electrical
                equipment from domestic fuse carriers to high-voltage industrial switchgear.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Asbestos in Switchgear Components</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">BS 3036 rewireable fuse carriers</strong> &mdash; some contain asbestos linings within the fuse carrier body, designed to contain the arc when a fuse blows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">High-voltage switchgear</strong> &mdash; in industrial and commercial buildings, HV switchgear may contain asbestos arc chutes designed to extinguish the arc when the switch opens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Transformer insulation</strong> &mdash; older transformers may include asbestos materials in their insulation systems and terminal bushings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Motor insulation</strong> &mdash; older motors may have asbestos insulation in their windings and terminal boxes</span>
                  </li>
                </ul>
              </div>

              <p>
                These components are often <strong>small</strong> but can release significant quantities of
                fibres when handled, broken, or damaged. A cracked fuse carrier, a deteriorating arc shield,
                or a damaged transformer bushing can all generate airborne asbestos fibres. The confined
                spaces inside switchgear enclosures mean that any fibres released are concentrated in the
                breathing zone of the person working on the equipment.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Important:</strong> If you encounter old BS 3036
                  rewireable fuse boards, do not assume the fuse carriers are safe to handle. Some
                  carriers contain asbestos linings. If you are carrying out a board upgrade and need to
                  remove old fuse carriers, check whether they contain asbestos before proceeding. When in
                  doubt, treat them as ACMs and seek professional assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Heater Storage Bricks and Thermal Components */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">06</span>
            Heater Storage Bricks &amp; Thermal Components
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos was widely used in <strong>electrical heating equipment</strong> for its outstanding
                thermal insulation properties. Several types of electrical heating appliance may contain
                asbestos components, and electricians are frequently called upon to disconnect, replace, or
                remove these items.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Heating Equipment That May Contain Asbestos</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Night storage heaters</strong> &mdash; may contain asbestos insulation bricks that store and slowly release heat</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Electric heater panels</strong> &mdash; may have asbestos backing boards providing thermal protection</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Immersion heater plates</strong> &mdash; mounting plates may be AIB, providing insulation around the cylinder</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Electric fire surrounds</strong> &mdash; older electric fires may contain asbestos components in the surround and backing</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Night Storage Heaters &mdash; Particular Risk</p>
                </div>
                <p className="text-sm text-white/80">
                  Older night storage heaters are a <strong className="text-white">particular risk</strong> for
                  electricians. The asbestos insulation bricks inside can weigh up to 100&nbsp;kg per heater,
                  and they may deteriorate over time, especially if the heater has been damaged or moved. When
                  called to disconnect or remove an old storage heater, <strong className="text-white">always
                  check whether it contains asbestos</strong> before attempting any work. Some manufacturers
                  have published lists of models that contain asbestos &mdash; check these before proceeding.
                  If in doubt, presume asbestos is present.
                </p>
              </div>

              <p>
                <strong>Always check before disconnecting or removing old electric heating equipment.</strong>
                {" "}This applies to any heating appliance manufactured before 2000. The presence of asbestos
                may not be obvious from the outside of the appliance &mdash; it may only become apparent when
                the unit is opened, dismantled, or moved.
              </p>
            </div>
          </div>
        </section>

        {/* Section 07: Pre-Work Checks for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">07</span>
            Pre-Work Checks for Electricians
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Before Starting ANY Work in a Pre-2000 Building</p>
                </div>
                <p className="text-sm text-white/80">
                  The following checks are <strong className="text-white">mandatory</strong> for every
                  electrical job in a building constructed or refurbished before the year 2000. They are not
                  optional and they are not only for large commercial projects &mdash; they apply to domestic
                  rewires, socket additions, board changes, and every other type of electrical work.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The 8-Step Pre-Work Asbestos Check</p>
                <ol className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">1</span>
                    <span><strong className="text-white">Ask the dutyholder/client about the asbestos register</strong> &mdash; every non-domestic building should have one under Regulation 4 of CAR 2012. For domestic properties, ask the homeowner about any known asbestos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">2</span>
                    <span><strong className="text-white">Check if a management survey has been carried out</strong> &mdash; this should identify and record the location, condition, and type of all known or presumed ACMs in the building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">3</span>
                    <span><strong className="text-white">If no register exists, presume that ACMs may be present</strong> &mdash; the absence of information is not evidence of absence. Treat every suspect material as asbestos until proven otherwise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">4</span>
                    <span><strong className="text-white">Visually inspect the work area for suspected ACMs</strong> &mdash; look for textured coatings, board materials, pipe lagging, ceiling tiles, and any materials that match ACM descriptions from your training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">5</span>
                    <span><strong className="text-white">Check behind boards, inside ducts, and in ceiling voids</strong> &mdash; before working in these concealed areas, visually inspect for ACMs. Do not reach into or disturb materials without first checking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">6</span>
                    <span><strong className="text-white">If ANY suspected ACM is found &mdash; STOP work immediately</strong> &mdash; do not continue. Do not attempt to identify or sample the material yourself</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">7</span>
                    <span><strong className="text-white">Report to supervisor and dutyholder</strong> &mdash; inform them of the suspected ACM, its location, and condition. Leave the area and prevent others from entering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-400">8</span>
                    <span><strong className="text-white">Do NOT resume work until the material has been assessed</strong> &mdash; a competent person must identify the material before work can continue. This may involve laboratory analysis</span>
                  </li>
                </ol>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Additional Controls</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Permit-to-work systems</strong> should be in place for any work near known ACMs. The permit should detail the ACM location, condition, and the controls required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Dynamic risk assessment:</strong> if you encounter anything unexpected during work &mdash; an unfamiliar board material, a suspect coating, dust in a ceiling void &mdash; STOP immediately and reassess</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: What Electricians Must NEVER Do */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">08</span>
            What Electricians Must NEVER Do
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Absolute Rules &mdash; No Exceptions</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The following actions must <strong className="text-white">NEVER</strong> be taken by an
                  electrician when encountering or suspecting asbestos-containing materials. These rules
                  apply regardless of time pressure, client demands, or workload. Breaking these rules could
                  expose you and others to lethal fibres.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span><strong className="text-white">Never drill into suspected ACMs</strong> &mdash; drilling generates dust that can contain millions of asbestos fibres per cubic centimetre of air</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span><strong className="text-white">Never chase cables through suspected AIB panels</strong> &mdash; chasing creates large volumes of dust and debris from the entire length of the chase</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span><strong className="text-white">Never break or cut suspected asbestos materials</strong> &mdash; any mechanical action that damages ACMs releases fibres into the air</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span><strong className="text-white">Never sweep up asbestos debris with a normal vacuum or broom</strong> &mdash; this spreads fibres further. Only a Type H (HEPA) vacuum approved for asbestos should be used, by trained personnel</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span><strong className="text-white">Never remove suspected asbestos flash guards or backing boards yourself</strong> &mdash; removal of AIB is controlled work and may require a licensed contractor</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span><strong className="text-white">Never assume a material is safe because it &ldquo;doesn&rsquo;t look like asbestos&rdquo;</strong> &mdash; asbestos is often hidden, painted, or mixed with other materials. Visual identification is unreliable</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span><strong className="text-white">Never work in a ceiling void without checking for sprayed coatings or AIB</strong> &mdash; ceiling voids are one of the most common locations for hidden ACMs, including sprayed asbestos coatings</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">What You SHOULD Do Instead</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                    <span><strong className="text-white">Always check the asbestos register</strong> before starting any work in a pre-2000 building</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                    <span><strong className="text-white">Always stop work</strong> if you discover or suspect any ACM during the course of your work</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                    <span><strong className="text-white">Always report suspected ACMs</strong> to your supervisor and the dutyholder immediately</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                    <span><strong className="text-white">Always presume the worst</strong> when a material cannot be identified &mdash; treat it as asbestos</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                    <span><strong className="text-white">Always report &mdash; it could save your life and your colleagues&rsquo; lives</strong></span>
                  </div>
                </div>
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
            <Link to="../asbestos-awareness-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: ACMs &mdash; Insulation &amp; Coatings
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-3-section-4">
              Next: Presuming, Sampling &amp; Analysis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
