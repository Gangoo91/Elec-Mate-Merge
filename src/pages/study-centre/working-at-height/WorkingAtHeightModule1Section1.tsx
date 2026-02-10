import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, HardHat, TrendingDown, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wah-definition",
    question: "According to the Work at Height Regulations 2005, what is the definition of 'working at height'?",
    options: [
      "Working above 2 metres from the ground",
      "Any place where a person could fall a distance liable to cause personal injury",
      "Working from scaffolding or ladders only",
      "Any work carried out above head height"
    ],
    correctIndex: 1,
    explanation: "The WAH Regulations 2005 define working at height as any place where a person could fall a distance liable to cause personal injury. This includes working at ground level near an opening, an excavation, or a loading bay — not just elevated positions."
  },
  {
    id: "wah-fatal-falls",
    question: "From which height band do the majority of fatal falls at work occur?",
    options: [
      "Above 10 metres",
      "5 to 10 metres",
      "2 to 5 metres",
      "Below 2 metres"
    ],
    correctIndex: 3,
    explanation: "The majority of fatal falls at work occur from below 2 metres. This is a critically important statistic because it demonstrates that even low-level falls can be deadly. A fall from standing height onto a hard surface, or a fall from a short stepladder, can cause fatal head injuries."
  },
  {
    id: "wah-electrician-scenarios",
    question: "Which of the following is NOT typically considered working at height for an electrician?",
    options: [
      "Installing cable tray on a ceiling at 3 metres",
      "Working at a distribution board mounted at chest height on a wall",
      "Replacing a luminaire from a mobile tower scaffold",
      "Accessing a rooftop plant room via a fixed ladder"
    ],
    correctIndex: 1,
    explanation: "Working at a distribution board mounted at chest height on a wall, where there is a solid floor beneath you and no risk of falling, is not working at height. The other three scenarios all involve a risk of falling a distance liable to cause personal injury."
  }
];

const faqs = [
  {
    question: "Does working at height include working below ground level?",
    answer: "Yes. The Work at Height Regulations 2005 apply to any place from which a person could fall a distance liable to cause personal injury. This explicitly includes excavations, shafts, pits, and sunken areas. An electrician working in a cable trench, service pit, or below-ground plant room is working at height under the regulations if there is a risk of falling."
  },
  {
    question: "Is standing on a chair or desk to change a light bulb considered working at height?",
    answer: "Yes. Standing on any improvised platform — including chairs, desks, upturned buckets, or stacked materials — constitutes working at height because there is a risk of falling. Improvised platforms are also extremely dangerous because they are not designed to be stood on and may be unstable, have no edge protection, or collapse under load. A proper stepladder or step stool should always be used instead."
  },
  {
    question: "Are most fatal falls from great heights?",
    answer: "No. Most fatal falls at work occur from relatively low heights — below 2 metres. Falls from ladders, stepladders, and low-level working platforms account for a disproportionately large number of fatalities and serious injuries. A fall from standing height onto a hard surface can cause fatal head injuries. This is why the regulations apply regardless of the height involved."
  },
  {
    question: "What should I do if I am asked to work at height but have not received training?",
    answer: "You should not carry out the work. Under the Work at Height Regulations 2005 and the Management of Health and Safety at Work Regulations 1999, your employer has a legal duty to ensure that anyone who works at height is competent to do so, or is being supervised by a competent person. You have the right to refuse unsafe work, and your employer cannot discipline you for doing so. Raise your concern with your supervisor, site manager, or health and safety representative."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Work at Height Regulations 2005 define working at height as:",
    options: [
      "Any work carried out above 2 metres from ground level",
      "Any place where a person could fall a distance liable to cause personal injury",
      "Working from ladders, scaffolds, or roofs only",
      "Any work above head height that requires access equipment"
    ],
    correctAnswer: 1,
    explanation: "The regulations define working at height as any place where a person could fall a distance liable to cause personal injury. There is no minimum height threshold — even work at ground level near an unprotected edge or opening is included."
  },
  {
    id: 2,
    question: "Approximately how many workers die from falls at height in the UK each year?",
    options: [
      "Around 10",
      "Around 40",
      "Around 150",
      "Around 500"
    ],
    correctAnswer: 1,
    explanation: "Approximately 40 workers die from falls at height in the UK each year, making it the single largest cause of workplace fatality in the construction industry. In addition, over 5,000 major injuries result from falls at height annually."
  },
  {
    id: 3,
    question: "Falls at height are the largest single cause of workplace fatality in which UK industry?",
    options: [
      "Manufacturing",
      "Agriculture",
      "Construction",
      "Transport and logistics"
    ],
    correctAnswer: 2,
    explanation: "Falls from height are the single largest cause of workplace death in the UK construction industry, accounting for approximately 50% of all construction fatalities in a typical year."
  },
  {
    id: 4,
    question: "Which of the following scenarios is NOT covered by the Work at Height Regulations 2005?",
    options: [
      "Working on a flat roof with no edge protection",
      "Walking on a permanent, level floor with no openings",
      "Working from a mobile elevating work platform (MEWP)",
      "Working near an unguarded excavation"
    ],
    correctAnswer: 1,
    explanation: "Walking on a permanent, level floor with no openings, edges, or fragile surfaces does not constitute working at height because there is no risk of falling a distance liable to cause personal injury. All the other scenarios involve a fall risk."
  },
  {
    id: 5,
    question: "From which height range do the most fatal falls occur?",
    options: [
      "Above 10 metres",
      "5 to 10 metres",
      "2 to 5 metres",
      "Below 2 metres"
    ],
    correctAnswer: 3,
    explanation: "The majority of fatal falls at work occur from below 2 metres. This statistic is critical because it challenges the common misconception that only high-level work is dangerous. Low-level falls onto hard surfaces frequently cause fatal head injuries."
  },
  {
    id: 6,
    question: "Which of the following is a common working at height scenario for electricians?",
    options: [
      "Testing a socket outlet at skirting level",
      "Installing cable tray at ceiling height from a tower scaffold",
      "Programming a consumer unit at eye level",
      "Reading a meter at waist height"
    ],
    correctAnswer: 1,
    explanation: "Installing cable tray at ceiling height from a tower scaffold is a common working at height scenario for electricians. The other options involve work at ground level with no risk of falling."
  },
  {
    id: 7,
    question: "Which of the following surfaces is specifically highlighted as a working at height hazard?",
    options: [
      "Concrete floors",
      "Tarmac car parks",
      "Fragile surfaces such as roof lights and fibre cement sheets",
      "Paved footpaths"
    ],
    correctAnswer: 2,
    explanation: "Fragile surfaces — including roof lights, fibre cement sheets, liner panels, and deteriorated asbestos cement — are specifically highlighted as a major working at height hazard. Workers can fall through fragile surfaces without warning, often with fatal consequences."
  },
  {
    id: 8,
    question: "What does the Work at Height Regulations 2005 say about the minimum height that triggers the regulations?",
    options: [
      "The regulations only apply above 2 metres",
      "The regulations only apply above 3 metres",
      "The regulations apply above head height",
      "There is no minimum height — the regulations apply wherever a fall could cause injury"
    ],
    correctAnswer: 3,
    explanation: "There is no minimum height threshold in the Work at Height Regulations 2005. The regulations apply to any place where a person could fall a distance liable to cause personal injury. Even a fall from standing height can be fatal."
  }
];

export default function WorkingAtHeightModule1Section1() {
  useSEO({
    title: "What Is Working at Height? | Working at Height Module 1.1",
    description: "WAH Regulations 2005 definition, common scenarios for electricians, fatal fall statistics, and what counts as working at height in the UK.",
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
            <Link to="../working-at-height-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Working at Height?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The legal definition, real-world scenarios, and the statistics that show why falls from height remain the biggest killer on UK construction sites
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Definition:</strong> Any place where a person could fall a distance liable to cause personal injury</li>
              <li><strong>Includes:</strong> Ladders, scaffolds, roofs, excavations, loading bays, fragile surfaces</li>
              <li><strong>Deaths:</strong> ~40 per year in the UK from falls at height</li>
              <li><strong>Key fact:</strong> Most fatal falls are from below 2 metres</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400 text-base font-medium mb-2">For Electricians</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Cable tray:</strong> Ceiling-level installation from towers/scaffolds</li>
              <li><strong>Lighting:</strong> Luminaire installation and maintenance at height</li>
              <li><strong>Distribution:</strong> High-level DB access, busbar trunking</li>
              <li><strong>Rooftops:</strong> Plant room access, PV array wiring, containment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State the legal definition of working at height under the WAH Regulations 2005",
              "Explain why there is no minimum height threshold in the regulations",
              "Describe common working at height scenarios for electricians",
              "Identify what is included and excluded from the definition",
              "Recall the key UK statistics on falls from height",
              "Explain why low-level falls are the most common cause of fatal injury"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-amber-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Legal Definition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">01</span>
            The Legal Definition
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Work at Height Regulations 2005</strong> (SI 2005/735) provide the legal
                framework for all work at height in England, Wales, and Scotland. These regulations
                replaced a patchwork of older legislation and introduced a single, clear definition
                that applies across all industries and workplaces.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-500 mb-2">Legal Definition</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;Working at height&rdquo;</strong> means work in any place where, if
                  precautions were not taken, a person could fall a distance liable to cause
                  personal injury.
                </p>
              </div>

              <p>
                This definition is deliberately broad. It is not limited to work at extreme heights
                or to particular types of equipment. It covers <strong>any situation</strong> where
                a fall could result in injury, regardless of the height involved. There is
                <strong> no minimum height threshold</strong> in the regulations &mdash; a fall
                from standing height onto a concrete floor can cause a fatal head injury just as
                surely as a fall from a scaffold.
              </p>

              <p>
                The regulations apply to <strong>all employers, the self-employed, and anyone who
                controls the work of others</strong> (such as building owners, facilities managers,
                or principal contractors). They cover all work activities, not just construction
                &mdash; maintenance, cleaning, installation, inspection, and routine access are
                all within scope.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What the Definition Includes</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Working above ground or floor level</strong> &mdash; on ladders, stepladders, scaffolds, tower scaffolds, mobile elevating work platforms (MEWPs), roofs, false ceilings, or any elevated structure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Working at ground level near an opening or edge</strong> &mdash; adjacent to an unprotected excavation, pit, shaft, loading bay, open manhole, or floor opening.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Working on or near fragile surfaces</strong> &mdash; roof lights, fibre cement sheets, corroded metal decking, liner panels, and any surface that could give way under a person&rsquo;s weight.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Working on or from a moving vehicle</strong> &mdash; where there is a risk of falling from the vehicle platform (e.g. working from the back of a flatbed lorry).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Accessing or egressing a workplace</strong> &mdash; climbing stairs without handrails, using a ladder to access a roof, or walking across a scaffold to reach a work position.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Working below ground level</strong> &mdash; inside excavations, trenches, pits, or shafts where a person could fall further or be injured by falling into the excavation.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Is NOT Working at Height</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Walking on a permanent, level floor with no openings, edges, or fragile surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Using a permanent staircase with handrails in good condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Working at a bench or desk at ground floor level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Working at a wall-mounted distribution board where the floor is solid and level beneath you</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Common Misconception</p>
                </div>
                <p className="text-sm text-white/80">
                  Many people believe that working at height only means being high up &mdash; on a
                  roof, a scaffold, or a tall ladder. In reality, the regulations apply to any
                  situation where a fall could cause injury. Standing on a 600mm-high stepladder
                  to access a ceiling void is working at height. Walking along an unprotected edge
                  of a first-floor slab is working at height. Leaning over an unguarded loading
                  bay at ground level is working at height.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Statistics — Why Falls at Height Matter */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">02</span>
            The Statistics &mdash; Why Falls at Height Matter
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Falls from height are the <strong>single largest cause of workplace fatality</strong> in
                the UK construction industry and one of the leading causes of death across all industries.
                The numbers are stark and sobering, and they demonstrate why working at height is treated
                as a high-risk activity that demands rigorous planning, competent personnel, and
                appropriate equipment.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">UK Falls from Height &mdash; Key Statistics</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~40</p>
                    <p className="text-white/70 text-xs">workers killed by falls from height each year</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">5,000+</p>
                    <p className="text-white/70 text-xs">major injuries from falls at height each year</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~50%</p>
                    <p className="text-white/70 text-xs">of all construction fatalities involve falls</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">&lt;2m</p>
                    <p className="text-white/70 text-xs">height band with the most fatal falls</p>
                  </div>
                </div>
              </div>

              <p>
                According to the Health and Safety Executive (HSE), falls from height consistently
                account for approximately <strong>25&ndash;30% of all workplace fatalities</strong>
                across all industries, and around <strong>50% of fatalities in
                construction</strong> specifically. This makes falls the number one killer on
                building sites year after year.
              </p>

              <p>
                Beyond fatalities, falls from height cause over <strong>5,000 major injuries</strong>
                every year in the UK. Major injuries include fractures, spinal injuries, traumatic
                brain injuries, and crush injuries. Many of these result in permanent disability,
                life-changing consequences, and an inability to return to work. The human cost is
                immense, and the financial cost to the economy runs into billions of pounds annually
                when accounting for NHS treatment, rehabilitation, lost productivity, and
                compensation claims.
              </p>

              {/* Falls Statistics Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">Fatal Falls by Height Band (Approximate Annual Distribution)</p>
                <div className="space-y-4">
                  {/* Below 2m */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">Below 2m</span>
                      <span className="text-sm font-bold text-red-400">~35%</span>
                    </div>
                    <div className="h-6 sm:h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-end pr-2" style={{ width: "35%" }}>
                        <span className="text-[10px] font-bold text-white hidden sm:inline">MOST FATAL</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Stepladders, low platforms, ground-level edges</p>
                  </div>
                  {/* 2-5m */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">2&ndash;5m</span>
                      <span className="text-sm font-bold text-amber-400">~30%</span>
                    </div>
                    <div className="h-6 sm:h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: "30%" }}>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Ladders, low scaffolds, vehicle platforms</p>
                  </div>
                  {/* 5-10m */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">5&ndash;10m</span>
                      <span className="text-sm font-bold text-yellow-400">~20%</span>
                    </div>
                    <div className="h-6 sm:h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" style={{ width: "20%" }}>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Scaffolds, roofs, MEWPs</p>
                  </div>
                  {/* Above 10m */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">Above 10m</span>
                      <span className="text-sm font-bold text-blue-400">~15%</span>
                    </div>
                    <div className="h-6 sm:h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: "15%" }}>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">High-level scaffolds, steelwork, towers</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <TrendingDown className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-white/80">
                      <strong className="text-red-400">Critical insight:</strong> Over 60% of all fatal falls occur from below 5 metres. The greatest risk is not extreme height &mdash; it is complacency at low level. Workers often take fewer precautions for short-duration, low-level tasks, which is precisely when most accidents happen.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                These statistics challenge the widespread assumption that working at height is only
                dangerous at extreme elevations. In practice, the most dangerous scenario is often
                a tradesperson standing on an unsecured stepladder or working from an unguarded
                platform at a relatively modest height. The combination of a hard landing surface,
                an awkward fall position, and the absence of head protection means that even a
                fall of one metre can be fatal.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Why Low-Level Falls Are So Deadly</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Head injuries</strong> &mdash; a fall from standing height onto concrete can cause fatal skull fractures and traumatic brain injuries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">No time to react</strong> &mdash; in a fall from below 2 metres, there is virtually no time to adopt a protective posture or break the fall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Complacency</strong> &mdash; workers tend to take fewer precautions for short-duration, low-level tasks, increasing the likelihood of an incident</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Hard surfaces</strong> &mdash; construction sites typically have concrete, steel, or compacted earth surfaces with zero energy absorption</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Common Scenarios for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">03</span>
            Common Scenarios for Electricians
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricians frequently work at height as a routine part of their job. Many
                electrical installations are located at ceiling level, on rooftops, or in areas
                that require access equipment. Understanding which of your daily tasks constitute
                working at height is essential for complying with the law and staying safe.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Typical Electrician Working at Height Scenarios</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Cable Tray &amp; Containment</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Installing cable tray, basket, and trunking at ceiling level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Running conduit along high walls and above suspended ceilings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Fixing support brackets to structural steelwork</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Lighting</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Installing luminaires in offices, warehouses, and retail units</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Lamp replacement and maintenance in high-bay environments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>External floodlight installation on building facades</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Distribution &amp; Panels</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Accessing high-level distribution boards and switchgear</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Installing busbar trunking and rising mains in risers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Working in electrical risers with open floor hatches</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Rooftop &amp; External</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Accessing plant rooms on flat roofs (AHUs, chillers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Solar PV array installation and wiring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>External CCTV, antenna, and lightning protection work</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                In each of these scenarios, the electrician faces a risk of falling. The specific
                risk will depend on the height involved, the access equipment being used, the
                condition of the working surface, the duration of the task, and the environmental
                conditions (weather, lighting, etc.). Each situation requires its own risk
                assessment and its own selection of control measures.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Danger: Fragile Surfaces</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Electricians are particularly at risk from <strong className="text-white">fragile surfaces</strong> when
                  accessing rooftops, ceiling voids, and industrial buildings. The following surfaces
                  should always be treated as fragile unless proven otherwise:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Roof lights and skylights</strong> &mdash; both plastic dome types and glass panels, often impossible to see when covered in dirt or algae</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Fibre cement sheets</strong> &mdash; commonly found on industrial roofs, these deteriorate with age and become increasingly fragile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Liner panels</strong> &mdash; the inner sheet of a profiled metal roof system, not designed to support a person&rsquo;s weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Suspended ceiling tiles</strong> &mdash; mineral fibre tiles in a grid system will collapse immediately if stepped on</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Asbestos cement sheets</strong> &mdash; found on older buildings, these become more fragile with age and are also an asbestos hazard</span>
                  </li>
                </ul>
              </div>

              <p>
                Falls through fragile surfaces are a particularly deadly category. The HSE
                reports that falls through fragile roofs account for a significant proportion of
                fatal falls at work each year. In many cases, the worker was not even aware that
                the surface was fragile, or walked onto a roof light that was obscured by dirt,
                moss, or accumulated debris. The rule is simple: <strong>if you cannot confirm
                that a surface will support your weight, treat it as fragile</strong>.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Electrician-Specific Risks</p>
                </div>
                <p className="text-sm text-white/80">
                  Electricians face additional risks when working at height because electrical work
                  often requires both hands to be free for connecting, terminating, or testing
                  cables. This can make it difficult to maintain three points of contact on a
                  ladder, and it often means that appropriate work platforms (tower scaffolds,
                  podium steps, or MEWPs) are needed rather than ladders. Carrying tools and
                  materials to height also increases the risk of imbalance and falling objects.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: What "Working at Height" Includes and Excludes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">04</span>
            Detailed Scope of the Regulations
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the precise scope of the Work at Height Regulations 2005 is
                essential for compliance. The regulations are not limited to construction &mdash;
                they apply to all work at height in all industries, including maintenance,
                facilities management, telecommunications, arboriculture, entertainment,
                agriculture, and any other sector where work at height occurs.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Activities Covered by the Regulations</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Construction work</strong> &mdash; new builds, extensions, refurbishments, demolition, and civil engineering projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Maintenance and repair</strong> &mdash; roof repairs, gutter clearing, painting, window cleaning, lamp replacement, equipment servicing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Inspection and surveying</strong> &mdash; building surveys, condition assessments, pre-purchase inspections, periodic testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Installation</strong> &mdash; fitting electrical systems, mechanical plant, signage, telecommunications equipment, solar panels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Access and egress</strong> &mdash; the journey to and from a work position at height (e.g. climbing a ladder to access a roof)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Passing near an opening or edge</strong> &mdash; even walking past an unprotected edge or opening constitutes being at risk from a fall</span>
                  </li>
                </ul>
              </div>

              <p>
                The regulations place specific duties on <strong>employers</strong> (or any person
                who controls the work) to:
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-500 mb-3">Key Duties Under WAH Regulations 2005</p>
                <ol className="text-sm text-white/80 space-y-2 list-decimal list-inside">
                  <li className="leading-relaxed"><strong className="text-white">Avoid</strong> work at height wherever it is reasonably practicable to do so</li>
                  <li className="leading-relaxed"><strong className="text-white">Prevent</strong> falls by using the right type of work equipment and safety measures where work at height cannot be avoided</li>
                  <li className="leading-relaxed"><strong className="text-white">Mitigate</strong> the distance and consequences of a fall, if the risk of falling cannot be entirely eliminated</li>
                  <li className="leading-relaxed">Ensure all work at height is <strong className="text-white">properly planned, appropriately supervised, and carried out by competent persons</strong></li>
                  <li className="leading-relaxed">Ensure that work equipment for working at height is <strong className="text-white">inspected, maintained, and used correctly</strong></li>
                  <li className="leading-relaxed">Take account of <strong className="text-white">weather conditions</strong> that could jeopardise safety</li>
                  <li className="leading-relaxed">Ensure that the place where work at height is carried out is <strong className="text-white">safe and has appropriate edge protection, guardrails, or other safeguards</strong></li>
                </ol>
              </div>

              <p>
                These duties are absolute in some cases (meaning they must be complied with
                regardless of cost or difficulty) and qualified in others (meaning they must be
                complied with &ldquo;so far as is reasonably practicable&rdquo;). The hierarchy
                of avoid &rarr; prevent &rarr; mitigate is a core principle of the regulations
                and will be covered in detail in Section 4 of this module.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Regulation Details</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 text-xs font-semibold mb-1">Regulation 4</p>
                    <p className="text-white/80 text-xs">Organisation and planning &mdash; all work at height must be properly planned, appropriately supervised, and carried out in a safe manner</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 text-xs font-semibold mb-1">Regulation 6</p>
                    <p className="text-white/80 text-xs">Avoidance of risks &mdash; the avoid/prevent/mitigate hierarchy</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 text-xs font-semibold mb-1">Regulation 7</p>
                    <p className="text-white/80 text-xs">Selection of work equipment &mdash; must give collective protection priority over personal protection</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 text-xs font-semibold mb-1">Regulation 9</p>
                    <p className="text-white/80 text-xs">Fragile surfaces &mdash; no person shall pass across or near, or work on, from, or near a fragile surface unless safe to do so</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Real-World Case Studies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">05</span>
            Real-World Case Studies
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following case studies, drawn from HSE prosecution reports and RIDDOR data,
                illustrate how quickly things can go wrong when working at height is not properly
                managed. Each case involves an electrician or electrical contractor and
                demonstrates the very real consequences of failing to follow the regulations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">Case Study 1: Stepladder Fall &mdash; Fatal Head Injury</p>
                <p className="text-sm text-white/80 mb-2">
                  An experienced electrician was replacing a fluorescent luminaire in a commercial
                  office. He was standing on a standard two-tread stepladder approximately 600mm
                  above floor level. While reaching to disconnect the old fitting, the stepladder
                  shifted on the polished floor, causing him to fall backwards. He struck the back
                  of his head on the edge of a desk and suffered a fatal traumatic brain injury.
                </p>
                <p className="text-sm text-white/60">
                  <strong className="text-amber-400">Lessons:</strong> The stepladder had no
                  non-slip feet. No risk assessment had been carried out. A podium step with
                  guardrails would have provided a stable, protected working platform. The task
                  was seen as &ldquo;too simple&rdquo; to warrant formal planning.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">Case Study 2: Fragile Roof Fall &mdash; Through a Roof Light</p>
                <p className="text-sm text-white/80 mb-2">
                  An electrical contractor was installing external security lighting on an
                  industrial unit. To run a cable across the roof, he walked across the flat roof
                  area. He stepped onto what appeared to be a solid section of the roof but was in
                  fact a polycarbonate roof light that had become opaque with age and was covered in
                  a thin layer of moss. The roof light gave way and he fell approximately 6 metres
                  to the concrete floor below, sustaining multiple fractures and a severe spinal
                  injury.
                </p>
                <p className="text-sm text-white/60">
                  <strong className="text-amber-400">Lessons:</strong> No roof survey had been
                  carried out. Fragile surfaces had not been identified. No crawl boards, guard
                  rails, or fall arrest equipment were in use. The roof plan should have been
                  reviewed before any access.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">Case Study 3: Ladder Overreach &mdash; Spinal Injury</p>
                <p className="text-sm text-white/80 mb-2">
                  A second-year apprentice was installing cable clips to a cable run along a wall
                  in a warehouse. He was working from a standard 3-section extension ladder.
                  Rather than moving the ladder along each time, he repeatedly overreached to the
                  side to fix the next clip. On one occasion, the ladder slipped sideways and he
                  fell approximately 4 metres, landing on his back on the concrete floor. He
                  sustained a fractured vertebra and a ruptured disc, resulting in permanent
                  partial paralysis.
                </p>
                <p className="text-sm text-white/60">
                  <strong className="text-amber-400">Lessons:</strong> A ladder was not the
                  right access equipment for a task requiring sustained work along a horizontal
                  run. A tower scaffold or mobile scaffold would have been more appropriate. The
                  apprentice had not received specific training on ladder use. Supervision was
                  inadequate.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-500">Key Takeaway:</strong> Every one of these
                  incidents was entirely preventable. In each case, the work at height was not
                  properly planned, the wrong access equipment was selected, or a basic risk
                  assessment was not carried out. Working at height must never be treated as a
                  minor or routine matter &mdash; regardless of how simple the task may appear.
                </p>
              </div>

              <p>
                The HSE investigates every workplace death and many serious injuries. Employers
                and individuals who are found to have breached the Work at Height Regulations
                face prosecution, unlimited fines, and in the most serious cases, imprisonment
                for up to two years under the Health and Safety at Work Act 1974. Company
                directors can also face personal prosecution under the Corporate Manslaughter
                and Corporate Homicide Act 2007.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Enforcement Penalties</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-amber-400 font-semibold text-xs mb-1">Improvement Notice</p>
                    <p className="text-white/70 text-xs">Requires the duty holder to remedy a contravention within a specified timeframe</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-amber-400 font-semibold text-xs mb-1">Prohibition Notice</p>
                    <p className="text-white/70 text-xs">Immediately stops a work activity that poses a risk of serious personal injury</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-red-400 font-semibold text-xs mb-1">Prosecution</p>
                    <p className="text-white/70 text-xs">Unlimited fines and up to 2 years&rsquo; imprisonment for individuals</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-red-400 font-semibold text-xs mb-1">Fee for Intervention (FFI)</p>
                    <p className="text-white/70 text-xs">HSE charges &pound;163/hour for time spent investigating material breaches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established the foundational understanding of what working at
                height means, why it matters, and how it applies to the daily work of
                electricians. The key points to remember are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Definition:</strong> Working at height means any place where a person could fall a distance liable to cause personal injury &mdash; there is no minimum height</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Scope:</strong> The regulations cover ladders, scaffolds, roofs, MEWPs, excavations, loading bays, fragile surfaces, and access/egress routes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Statistics:</strong> Approximately 40 deaths and 5,000+ major injuries per year &mdash; most fatal falls are from below 2 metres</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Electrician relevance:</strong> Cable tray, lighting, distribution, rooftop plant, and solar PV work all routinely involve working at height</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Fragile surfaces:</strong> Roof lights, fibre cement sheets, and suspended ceilings are deadly &mdash; always assume they are fragile unless confirmed otherwise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Enforcement:</strong> Breaching the regulations can result in unlimited fines, imprisonment, and prohibition notices</span>
                </li>
              </ul>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-500">Next:</strong> In Section 2, we will examine
                  the legal framework in detail &mdash; the specific legislation, the duties it
                  places on employers, employees, and the self-employed, and the British and
                  European standards that govern work at height equipment and practices.
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
            <Link to="../working-at-height-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-amber-500 text-white hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-1-section-2">
              Next: The Legal Framework
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
