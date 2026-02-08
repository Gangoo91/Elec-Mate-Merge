import { ArrowLeft, Building2, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "What is the approximate width of a single-width mobile access tower?",
    options: [
      "0.5 metres",
      "0.7 metres",
      "1.0 metres",
      "1.35 metres"
    ],
    correctAnswer: 1,
    explanation: "Single-width towers are approximately 0.7m wide. This narrower footprint makes them suitable for confined spaces such as corridors, stairwells, and between racking."
  },
  {
    id: 2,
    question: "Why would you choose a GRP (fibreglass) tower instead of a standard aluminium tower?",
    options: [
      "GRP towers are lighter and easier to transport",
      "GRP towers are non-conductive, making them safer for electrical work",
      "GRP towers are cheaper to purchase",
      "GRP towers can reach greater heights"
    ],
    correctAnswer: 1,
    explanation: "GRP (Glass Reinforced Plastic) towers are non-conductive, making them the preferred choice when working near or on live electrical installations where an aluminium tower could create a shock hazard."
  },
  {
    id: 3,
    question: "What is the approximate width of a double-width mobile access tower?",
    options: [
      "0.7 metres",
      "1.0 metres",
      "1.35 metres",
      "1.8 metres"
    ],
    correctAnswer: 2,
    explanation: "Double-width towers are approximately 1.35m wide. The wider platform provides a more stable working area and allows for more materials and personnel on the platform."
  },
  {
    id: 4,
    question: "Which type of tower is specifically designed for use in areas with limited headroom?",
    options: [
      "Stairwell tower",
      "Standard aluminium tower",
      "Low-level or folding tower",
      "GRP tower"
    ],
    correctAnswer: 2,
    explanation: "Low-level and folding towers are designed for work at lower heights, typically under 2.5m. They are ideal for areas with limited headroom such as beneath mezzanine floors or in rooms with low ceilings."
  },
  {
    id: 5,
    question: "What makes a stairwell tower different from a standard tower?",
    options: [
      "It uses different materials",
      "It has adjustable leg lengths to accommodate sloping or stepped surfaces",
      "It is always narrower than a standard tower",
      "It does not require guardrails"
    ],
    correctAnswer: 1,
    explanation: "Stairwell towers feature adjustable leg lengths, allowing the base to sit level on stairs or sloping ground. The legs can be extended independently to compensate for the change in level."
  },
  {
    id: 6,
    question: "When working on a domestic rewire, which tower type would typically be most suitable for accessing ceiling roses in a narrow hallway?",
    options: [
      "Double-width aluminium tower",
      "Single-width aluminium tower",
      "Stairwell tower",
      "GRP tower"
    ],
    correctAnswer: 1,
    explanation: "A single-width tower at approximately 0.7m wide is ideal for narrow hallways. It provides a stable working platform whilst fitting through standard doorways and along corridors."
  },
  {
    id: 7,
    question: "What standard governs the design and use of mobile access towers in the UK?",
    options: [
      "BS 7671",
      "BS EN 1004",
      "CDM 2015",
      "LOLER 1998"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1004 is the European standard for mobile access towers. It specifies design requirements, structural calculations, and user guidance. The current version is BS EN 1004-1:2020."
  },
  {
    id: 8,
    question: "A folding tower is most likely to be used for which type of task?",
    options: [
      "Exterior cladding installation at 8m height",
      "Painting a ceiling in a small office at 2m height",
      "Installing a fire alarm system in a warehouse at 6m",
      "Replacing roof-mounted plant equipment"
    ],
    correctAnswer: 1,
    explanation: "Folding towers are compact, low-level platforms ideal for tasks at modest heights (typically up to 2-2.5m) in small or indoor spaces. They fold flat for easy storage and transport."
  }
];

const quickCheckQuestions = [
  {
    id: "tower-width-choice",
    question: "You need to access a lighting fitting in a corridor that is 1.1m wide. Would you choose a single-width or double-width tower?",
    options: [
      "Double-width (1.35m) — more stable",
      "Single-width (0.7m) — fits the space",
      "Either width would work",
      "Neither — use a ladder instead"
    ],
    correctIndex: 1,
    explanation: "A single-width tower at 0.7m will fit comfortably in a 1.1m corridor with clearance either side. A double-width tower at 1.35m would not fit. Always check the available space before selecting your tower."
  },
  {
    id: "grp-vs-aluminium",
    question: "You are replacing a light fitting directly above a live busbar chamber. Which tower material should you use?",
    options: [
      "Standard aluminium — it is lighter",
      "GRP (fibreglass) — it is non-conductive",
      "Either material — both are equally safe",
      "Steel — it is the strongest"
    ],
    correctIndex: 1,
    explanation: "GRP towers are non-conductive and should always be used when working near live electrical equipment. An aluminium tower could become energised if it contacts a live conductor, creating a serious shock hazard."
  },
  {
    id: "stairwell-application",
    question: "You need to install emergency lighting on a staircase where the steps rise 3m between landings. What type of tower is required?",
    options: [
      "Standard double-width tower",
      "Folding low-level tower",
      "Stairwell tower with adjustable legs",
      "Single-width tower on the landing only"
    ],
    correctIndex: 2,
    explanation: "A stairwell tower with adjustable legs is the correct choice. The independently adjustable legs allow the tower to sit level on the steps, providing a safe and stable platform at the required working height."
  }
];

const faqs = [
  {
    question: "Can I use a standard aluminium tower for electrical work near live equipment?",
    answer: "No. If there is any risk of the tower contacting live conductors, you must use a GRP (fibreglass) tower. Aluminium is an excellent electrical conductor. Even if the work itself is on isolated circuits, adjacent live equipment means a GRP tower is the safer choice. Always carry out a risk assessment before selecting your tower type."
  },
  {
    question: "What is the maximum height I can build a mobile access tower?",
    answer: "Maximum height depends on the specific tower system, its configuration (single or double-width), and whether it is used indoors or outdoors. Manufacturer instructions will state the maximum permissible height for each configuration. As a general guide, indoor towers can reach higher than outdoor towers because wind loading is not a factor. Always follow the manufacturer's instruction manual."
  },
  {
    question: "Do folding towers need to comply with the same regulations as full-height towers?",
    answer: "Yes. All mobile access towers, including low-level and folding platforms, must comply with the Work at Height Regulations 2005. Even at lower heights, falls can cause serious injury. Guardrails, toeboards, and proper assembly are still required unless the platform height is below the threshold specified in the manufacturer's instructions."
  },
  {
    question: "Can I mix components from different tower manufacturers?",
    answer: "Absolutely not. Mixing components from different manufacturers is extremely dangerous and is prohibited. Components may look similar but have different load ratings, connection methods, and tolerances. Always use components from a single manufacturer and ensure they are compatible with the specific tower system you are using."
  }
];

const IpafModule2Section1 = () => {
  useSEO({
    title: "Types of Mobile Access Towers | IPAF Module 2 Section 1",
    description: "Learn about standard aluminium, GRP, single-width, double-width, stairwell, and folding mobile access towers. Understand when to use each type for safe working at height.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="mb-12 text-center">
          <Building2 className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2 — Section 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Types of Mobile Access Towers
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding the different tower types and knowing when to use each one for safe, efficient working at height
          </p>
        </div>

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Standard aluminium:</strong> Most common, lightweight, strong.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>GRP/fibreglass:</strong> Non-conductive — essential for electrical work.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Single-width:</strong> ~0.7m wide, for narrow spaces.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Double-width:</strong> ~1.35m wide, larger working area.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Stairwell:</strong> Adjustable legs for steps and slopes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Folding/low-level:</strong> Compact, for lower heights.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Assess:</strong> Check the workspace — width, floor surface, overhead obstructions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Select:</strong> Match tower type to the task, environment, and hazards present.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Verify:</strong> Confirm the tower system is BS EN 1004 compliant.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Check:</strong> Ensure all components are from the same manufacturer and system.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify the main types of mobile access tower and describe their key features</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain the differences between single-width and double-width towers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>State when a GRP tower must be used instead of an aluminium tower</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Describe the purpose and features of stairwell towers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify appropriate tower types for common electrical installation tasks</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise when a folding or low-level tower is the most practical choice</span>
            </li>
          </ul>
        </section>

        {/* Section 03: Standard Aluminium Towers */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Standard Aluminium Towers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Standard aluminium mobile access towers are the most commonly used type across the construction
                and maintenance industries. They are manufactured from lightweight aluminium alloy, making them
                easy to transport, handle, and assemble whilst still providing excellent structural strength.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Key Characteristics</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div><strong>Material:</strong> Aluminium alloy — lightweight yet strong. A typical frame weighs between 5kg and 12kg depending on size.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div><strong>Corrosion Resistant:</strong> Aluminium naturally forms a protective oxide layer, making it suitable for both indoor and outdoor use.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div><strong>Modular Design:</strong> Components interlock to build towers to various heights. The modular system means one set of components can create many different configurations.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div><strong>Compliance:</strong> Designed and tested to BS EN 1004-1:2020, ensuring structural integrity and safe working loads are met.</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Important Limitation</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Aluminium is an excellent electrical conductor. Standard aluminium towers must <strong className="text-white">never</strong> be
                  used in locations where there is any risk of contact with live electrical conductors or equipment.
                  If you are working near live electrical installations, you must use a GRP (fibreglass) tower instead.
                </p>
              </div>

              <p>
                Standard aluminium towers are available in both single-width and double-width configurations. They
                can typically be built to heights ranging from 2m to over 12m depending on the system and whether
                the tower is used indoors or outdoors. The manufacturer's instruction manual will specify the
                maximum permissible height for each configuration.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-2">Advantages</h4>
                  <ul className="text-white space-y-1 text-sm">
                    <li>+ Lightweight — easy to move and assemble</li>
                    <li>+ Strong — high strength-to-weight ratio</li>
                    <li>+ Corrosion resistant — long service life</li>
                    <li>+ Versatile — many configurations possible</li>
                    <li>+ Widely available — components easy to source</li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">Limitations</h4>
                  <ul className="text-white space-y-1 text-sm">
                    <li>- Electrically conductive — not for use near live equipment</li>
                    <li>- Can be damaged by impact or overloading</li>
                    <li>- Components must not be mixed between manufacturers</li>
                    <li>- Requires regular inspection for fatigue and damage</li>
                    <li>- Higher cost than basic scaffold systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: GRP (Fibreglass) Towers */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">04</span>
              GRP (Fibreglass) Towers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                GRP stands for Glass Reinforced Plastic, commonly known as fibreglass. GRP towers are specifically
                designed for use in environments where electrical conductivity is a hazard. For electricians, these
                are often the <strong>only</strong> appropriate choice when working near live equipment.
              </p>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-2">Why GRP Matters for Electricians</h3>
                <p className="text-white/80 text-sm mb-3">
                  As an electrician, you will frequently work in environments where live electrical equipment is present
                  nearby — even if the specific circuit you are working on has been isolated. Consider these scenarios:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Switchrooms:</strong> Working above switchgear panels where adjacent circuits remain live.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Substations:</strong> Overhead busbars and cable trays may carry live supplies.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Industrial units:</strong> Cable containment, trunking, and basket trays running at height.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Data centres:</strong> High-density power distribution with multiple live feeds.</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">GRP Tower Characteristics</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Non-conductive:</strong> Will not conduct electricity if it contacts a live source.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Heavier than aluminium:</strong> GRP components are typically 30-50% heavier than aluminium equivalents.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>UV sensitive:</strong> Prolonged outdoor exposure can degrade the material over time. Store under cover when not in use.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Surface condition:</strong> GRP must be kept clean and dry. Contamination with conductive materials (metal filings, wet grime) can reduce its insulating properties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Cost:</strong> GRP towers are more expensive than aluminium equivalents, but the safety benefit is essential where electrical hazards exist.</span>
                  </li>
                </ul>
              </div>

              <p>
                It is critical to understand that a GRP tower's non-conductive properties can be compromised. If
                the tower is wet, dirty, or contaminated with conductive substances, its insulating properties are
                reduced. Always ensure GRP components are clean and dry before use, and store them properly to
                maintain their integrity.
              </p>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Definition: GRP</h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Glass Reinforced Plastic (GRP)</strong> — a composite material made from a polymer
                  matrix reinforced with glass fibres. It combines the strength of glass with the flexibility of plastic,
                  producing a strong, lightweight, non-conductive material. Also known as fibreglass or FRP (Fibre
                  Reinforced Plastic).
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Single-Width vs Double-Width */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Single-Width vs Double-Width Towers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Mobile access towers come in two standard width configurations. The choice between single-width
                and double-width depends on the available space, the nature of the work, and the number of
                operatives who need to be on the platform simultaneously.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Single-Width (~0.7m)</h3>
                  <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Width:</strong> Approximately 0.7m (700mm)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Platform length:</strong> Typically 1.8m to 2.5m</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Best for:</strong> Narrow corridors, between shelving/racking, restricted access areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Doorways:</strong> Fits through standard doorways without dismantling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Operatives:</strong> Generally one person on the platform</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Max height:</strong> Lower than double-width due to reduced base area (check manufacturer's data)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Double-Width (~1.35m)</h3>
                  <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Width:</strong> Approximately 1.35m (1350mm)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Platform length:</strong> Typically 1.8m to 2.5m</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Best for:</strong> Open areas, external work, tasks requiring more workspace</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Stability:</strong> Greater base area provides increased stability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Operatives:</strong> Can accommodate two people and materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Max height:</strong> Can be built higher than single-width (check manufacturer's data)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Choosing the Right Width</h3>
                <p className="text-white/80 text-sm mb-3">
                  The decision between single and double-width should be based on a practical assessment of the work area:
                </p>
                <ul className="text-white space-y-1 text-sm">
                  <li>1. <strong>Measure the available space</strong> — can the tower physically fit?</li>
                  <li>2. <strong>Consider the task</strong> — do you need to lay out tools and materials on the platform?</li>
                  <li>3. <strong>Count the operatives</strong> — will more than one person need to work from the platform?</li>
                  <li>4. <strong>Check the height required</strong> — single-width towers have lower maximum heights.</li>
                  <li>5. <strong>Think about access</strong> — does the tower need to pass through doorways or lifts?</li>
                </ul>
              </div>

              <p>
                Remember that platform dimensions determine the available working area. A single-width tower
                platform of 0.7m x 2.5m gives approximately 1.75m² of workspace. A double-width platform of
                1.35m x 2.5m gives approximately 3.38m² — nearly double the working area. For tasks that require
                spreading out tools, materials, or having two operatives working side by side, double-width
                is the better choice.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Stairwell Towers */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">06</span>
              Stairwell Towers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Stairwell towers — sometimes called staircase towers or split-level towers — are specialised mobile
                access towers designed to provide a safe, level working platform on stairs, ramps, or other
                sloping surfaces where a standard tower cannot be used.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">Key Features</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Adjustable Legs:</strong> Each leg can be independently adjusted to different lengths, allowing the tower to sit level on steps or slopes.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Locking Mechanisms:</strong> Adjustable legs have positive locking pins or clamps to prevent movement once set.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Compact Footprint:</strong> Designed to fit within standard stairwells, typically using a narrow base configuration.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Level Platform:</strong> Despite the uneven base, the platform remains horizontal for safe working.</div>
                  </li>
                </ul>
              </div>

              <p>
                For electricians, stairwell towers are invaluable. Emergency lighting installations, fire alarm
                detectors on staircase ceilings, and rewiring work in stairwells all require safe access at height.
                Working from stepladders on stairs is extremely hazardous — the uneven surface creates an unstable
                base and significantly increases the risk of a fall.
              </p>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Common Mistake</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Never attempt to level a standard tower on stairs by packing under the castors or base plates with
                  bricks, blocks, or timber. This is extremely dangerous and is one of the most common causes of tower
                  collapses. Always use a purpose-built stairwell tower with proper adjustable legs and locking mechanisms.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Typical Electrical Applications</h3>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Emergency lighting installation and testing on staircase ceilings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fire alarm detector installation and maintenance on stairwell landings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Rewiring work — accessing junction boxes and cable routes above staircases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>CCTV camera installation at stairwell positions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Painting and decorating following first-fix electrical work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Folding & Low-Level Towers */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">07</span>
              Folding & Low-Level Towers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Folding towers and low-level platforms provide safe access for work at modest heights — typically
                up to 2.5m platform height. They are designed to be compact, quick to set up, and easy to
                transport, making them ideal for lighter tasks where a full-height tower would be impractical.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Folding Towers</h3>
                  <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Foldable frame:</strong> Collapses flat for storage and transport</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Quick assembly:</strong> Can typically be erected by one person in minutes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Platform height:</strong> Usually up to 1.5m-2.5m</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Guardrails:</strong> Fold-out or clip-on guardrails provided</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Castors:</strong> Fitted with braked castors for easy repositioning</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Low-Level Platforms</h3>
                  <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Step-up design:</strong> Simple, robust platforms with integrated steps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Platform height:</strong> Typically 0.5m-1.0m</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Guardrails:</strong> May not require guardrails at very low heights (check regs)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Lightweight:</strong> Often under 15kg for easy portability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Ideal for:</strong> Repetitive tasks at just-out-of-reach heights</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Folding and low-level towers are not a substitute for full-height towers when greater reach is needed.
                However, they fill an important gap between stepladders and full mobile access towers. They provide
                a safer, more stable platform than a stepladder, with the added benefit of guardrails and a larger
                working area.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">When to Use a Folding/Low-Level Tower</h3>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Installing ceiling-mounted accessories (light fittings, smoke detectors, speakers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Accessing consumer units mounted above head height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Running cable at dado or picture-rail height across long rooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maintenance tasks in offices, shops, and domestic properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Any task where a stepladder feels unstable but a full tower is overkill</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Definition: Low-Level Platform</h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">low-level work platform</strong> (sometimes called a podium step or
                  low-level access platform) is a lightweight, portable working platform with a guardrail and
                  platform height typically not exceeding 1m. They are covered by BS 8620:2022 and must still
                  comply with the Work at Height Regulations 2005.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Choosing the Right Tower Type */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">08</span>
              Choosing the Right Tower Type — Quick Reference
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Selecting the correct tower type is a key competence for anyone working at height. The wrong
                choice can create hazards, reduce productivity, and lead to non-compliance with regulations.
                Use this quick reference to guide your selection:
              </p>

              <div className="overflow-x-auto">
                <div className="space-y-3 min-w-0">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-1">Standard Aluminium Tower</h4>
                    <p className="text-white/80 text-sm"><strong className="text-white">Use when:</strong> General work at height, no electrical hazards nearby, indoor or outdoor use.</p>
                  </div>
                  <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">GRP (Fibreglass) Tower</h4>
                    <p className="text-white/80 text-sm"><strong className="text-white">Use when:</strong> Any risk of contact with live electrical conductors or equipment. Switchrooms, substations, data centres.</p>
                  </div>
                  <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-medium mb-1">Single-Width Tower</h4>
                    <p className="text-white/80 text-sm"><strong className="text-white">Use when:</strong> Narrow spaces (corridors, between racking), needs to pass through doorways, single operative.</p>
                  </div>
                  <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-medium mb-1">Double-Width Tower</h4>
                    <p className="text-white/80 text-sm"><strong className="text-white">Use when:</strong> Larger workspace needed, two operatives, materials storage on platform, higher reach required.</p>
                  </div>
                  <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                    <h4 className="text-purple-300 font-medium mb-1">Stairwell Tower</h4>
                    <p className="text-white/80 text-sm"><strong className="text-white">Use when:</strong> Working on stairs, ramps, or any sloping surface where a standard tower cannot sit level.</p>
                  </div>
                  <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                    <h4 className="text-cyan-300 font-medium mb-1">Folding / Low-Level Tower</h4>
                    <p className="text-white/80 text-sm"><strong className="text-white">Use when:</strong> Low-height tasks (under 2.5m), frequent repositioning, limited storage space, quick setup needed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 09: Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Practical Guidance for Electricians
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Before You Arrive on Site</h3>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ask about the workspace — dimensions, floor type, obstacles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Find out if live electrical equipment is present nearby</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Check ceiling height and working height required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Confirm vehicle access for delivering the tower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ask about floor loading restrictions (e.g., raised floors)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">On Site Checks</h3>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Verify the floor is level and can support the tower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Check for overhead obstructions (pipes, ducts, beams)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Confirm there is enough space to erect the tower safely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Identify any nearby hazards (open edges, traffic routes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure adequate lighting for assembly and work</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Common Electrician Tasks by Tower Type</h3>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Aluminium double-width:</strong> Warehouse lighting installations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">GRP single-width:</strong> Switchroom cable tray work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Stairwell:</strong> Emergency lighting in stairwells</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Folding:</strong> Office ceiling sensor installations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Low-level:</strong> Domestic light fitting changes</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Documentation Required</h3>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Risk assessment covering work at height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Method statement for tower use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tower inspection records (pre-use and weekly)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>IPAF/PASMA card for the operative</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Manufacturer's instruction manual on site</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Types of Mobile Access Towers Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2-section-2">
              Next: Components & Terminology
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IpafModule2Section1;
