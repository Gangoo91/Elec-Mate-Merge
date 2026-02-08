import { ArrowLeft, FileText, CheckCircle, AlertTriangle, BookOpen, Ruler, Weight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "en1004-load-class",
    question: "What is the maximum platform loading for a Class 3 tower under BS EN 1004-1:2020?",
    options: [
      "100 kg/m\u00B2",
      "150 kg/m\u00B2",
      "200 kg/m\u00B2",
      "250 kg/m\u00B2"
    ],
    correctIndex: 2,
    explanation: "Class 3 towers have a maximum uniformly distributed load of 200 kg/m\u00B2 on the working platform. Class 2 towers have a lower limit of 150 kg/m\u00B2. The load class must be clearly marked on the tower."
  },
  {
    id: "en1004-max-height",
    question: "What is the maximum height for a standard EN 1004 tower used outdoors?",
    options: [
      "4 metres",
      "8 metres",
      "12 metres",
      "16 metres"
    ],
    correctIndex: 1,
    explanation: "BS EN 1004-1:2020 limits standard mobile towers to a maximum platform height of 8 metres for outdoor use and 12 metres for indoor use. Towers exceeding these heights fall outside the scope of the standard."
  },
  {
    id: "en1004-manual",
    question: "What does BS EN 1004-2:2021 specifically cover?",
    options: [
      "Tower design calculations",
      "Instruction manuals and assembly guides provided by manufacturers",
      "Load testing procedures",
      "Competence requirements for users"
    ],
    correctIndex: 1,
    explanation: "BS EN 1004-2:2021 sets out the requirements for the instruction manual that must accompany every mobile access tower. It specifies what information the manual must contain, including assembly sequences, safe use guidance, and maximum heights."
  }
];

const faqs = [
  {
    question: "What is the difference between BS EN 1004-1:2020 and the previous EN 1004:2004?",
    answer: "The 2020 revision introduced several key changes: it added Class 2 and Class 3 load classifications (replacing the single load class), updated stability requirements, clarified wind load considerations, improved requirements for castors and outriggers, and aligned with updated European testing standards. The 2020 standard is more prescriptive about how manufacturers must prove their designs meet safety requirements."
  },
  {
    question: "Can I use a tower that exceeds the height limits in BS EN 1004?",
    answer: "Towers exceeding 12 metres indoor or 8 metres outdoor fall outside the scope of BS EN 1004. Such towers may be covered by BS 1139-6 for special scaffold structures, or may require bespoke design by a structural engineer. They must still comply with the Work at Height Regulations and any tower exceeding EN 1004 limits must have a specific design calculation and method statement."
  },
  {
    question: "How do I identify the load class of a tower on site?",
    answer: "Every EN 1004-compliant tower must be permanently marked with its load class (Class 2 or Class 3), the manufacturer's name, the standard reference (EN 1004-1:2020), and the maximum platform height. This marking is typically on a label affixed to the base frame or first rung. Always check this marking before loading the platform."
  },
  {
    question: "Does BS EN 1004 apply to all scaffold towers?",
    answer: "No. BS EN 1004 only applies to prefabricated mobile access towers that can be moved by manual effort. It does not cover fixed scaffolding (covered by EN 12811), bespoke designed towers, towers on vehicles, or towers that require mechanical means to move. Non-standard or oversized towers may fall under BS 1139-6 instead."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does BS EN 1004-1:2020 cover?",
    options: [
      "Fixed scaffolding design",
      "Prefabricated mobile access towers",
      "Ladder safety requirements",
      "Fall arrest equipment"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1004-1:2020 is the European standard for prefabricated mobile access towers made from prefabricated elements. It covers design, structural requirements, and marking."
  },
  {
    id: 2,
    question: "What is the maximum uniformly distributed load for a Class 2 tower?",
    options: [
      "100 kg/m\u00B2",
      "150 kg/m\u00B2",
      "200 kg/m\u00B2",
      "250 kg/m\u00B2"
    ],
    correctAnswer: 1,
    explanation: "Class 2 towers support a maximum uniformly distributed load of 150 kg/m\u00B2 on the working platform. This is suitable for light-duty work such as inspection, painting, and light maintenance."
  },
  {
    id: 3,
    question: "What is the maximum platform height for an EN 1004 tower used indoors?",
    options: [
      "6 metres",
      "8 metres",
      "10 metres",
      "12 metres"
    ],
    correctAnswer: 3,
    explanation: "BS EN 1004-1:2020 permits a maximum platform height of 12 metres for towers used indoors, where wind loading is not a factor. Outdoor towers are limited to 8 metres."
  },
  {
    id: 4,
    question: "Which standard covers the instruction manual requirements for mobile towers?",
    options: [
      "BS EN 1004-1:2020",
      "BS EN 1004-2:2021",
      "BS 1139-6",
      "BS EN 12811-1"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1004-2:2021 specifically covers the requirements for instruction manuals provided with mobile access towers, including assembly sequences, stability information, and safe use guidance."
  },
  {
    id: 5,
    question: "What must be permanently marked on every EN 1004-compliant tower?",
    options: [
      "The date of manufacture only",
      "The load class, manufacturer, standard reference, and maximum height",
      "The name of the site where it was first used",
      "The colour code for the scaffold type"
    ],
    correctAnswer: 1,
    explanation: "EN 1004 requires permanent marking showing the load class (2 or 3), manufacturer's identity, the standard reference (EN 1004-1:2020), and the maximum platform height of the tower."
  },
  {
    id: 6,
    question: "Which standard would apply to a tower exceeding 12 metres indoors?",
    options: [
      "BS EN 1004-1:2020",
      "BS EN 12811-1",
      "BS 1139-6",
      "No standard applies"
    ],
    correctAnswer: 2,
    explanation: "Towers exceeding the height limits of BS EN 1004 (12m indoors, 8m outdoors) may fall under BS 1139-6, which covers non-standard and special scaffold structures requiring bespoke design calculations."
  },
  {
    id: 7,
    question: "A tower is rated Class 3 with a 1.3m x 1.8m platform. What is the maximum total platform load?",
    options: [
      "234 kg",
      "351 kg",
      "468 kg",
      "702 kg"
    ],
    correctAnswer: 2,
    explanation: "Platform area = 1.3 \u00D7 1.8 = 2.34 m\u00B2. Class 3 allows 200 kg/m\u00B2, so maximum load = 2.34 \u00D7 200 = 468 kg. This includes people, tools, and materials on the platform."
  },
  {
    id: 8,
    question: "What is the minimum safety factor applied to EN 1004 tower components during design?",
    options: [
      "1.2",
      "1.5",
      "2.0",
      "2.5"
    ],
    correctAnswer: 1,
    explanation: "EN 1004-1:2020 requires structural components to be designed with a minimum safety factor of 1.5 against ultimate failure. This means the tower must withstand at least 1.5 times the maximum rated load without structural failure."
  }
];

export default function IpafModule1Section3() {
  useSEO({
    title: "BS EN 1004-1:2020 & Related Standards | IPAF Module 1.3",
    description: "Scope of BS EN 1004, load classes 2 and 3, maximum heights, BS 1139-6 for non-standard towers, instruction manual requirements, marking, and design safety factors.",
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
            <Link to="../ipaf-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <FileText className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BS EN 1004-1:2020 & Related Standards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The European standard for prefabricated mobile access towers &mdash; load classes, height limits, design requirements, and marking
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>EN 1004:</strong> Standard for prefabricated mobile access towers</li>
              <li><strong>Classes:</strong> Class 2 = 150 kg/m&sup2;, Class 3 = 200 kg/m&sup2;</li>
              <li><strong>Heights:</strong> Max 8m outdoor, 12m indoor</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Check:</strong> Load class label before loading the platform</li>
              <li><strong>Verify:</strong> Tower does not exceed its rated max height</li>
              <li><strong>Keep:</strong> Manufacturer's instruction manual accessible on site</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the scope and purpose of BS EN 1004-1:2020",
              "Distinguish between Class 2 and Class 3 load ratings",
              "State the maximum height limits for indoor and outdoor use",
              "Understand the role of BS 1139-6 for non-standard towers",
              "Describe the marking and labelling requirements",
              "Explain the minimum safety factors for tower design"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Scope of EN 1004 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Scope of BS EN 1004-1:2020
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS EN 1004-1:2020 is the European standard that specifies the design, structural, and
                safety requirements for prefabricated mobile access towers. It replaced the earlier
                EN 1004:2004 and introduced significant changes, including the new load classification
                system and updated stability requirements.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Full Title:</strong> BS EN 1004-1:2020 &mdash;
                  "Mobile access and working towers made of prefabricated elements &mdash; Part 1: Materials,
                  dimensions, design loads, safety and performance requirements"
                </p>
              </div>

              <p>
                The standard applies to mobile access towers that are assembled from prefabricated
                components, can be moved by manual effort (pushing or pulling), and are supported on
                castors or wheels. It covers towers used for temporary access to carry out work at
                height such as maintenance, inspection, installation, and decoration.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">EN 1004 Applies To:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Prefabricated aluminium or steel mobile towers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers moved by manual effort on castors or wheels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers used on firm, level surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers within specified height limits (8m outdoor / 12m indoor)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers supporting persons, tools, and materials on working platforms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">EN 1004 Does NOT Apply To:</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fixed scaffolding (covered by BS EN 12811)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers exceeding 12m indoor or 8m outdoor platform height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers mounted on vehicles or trailers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Bespoke or custom-designed scaffold structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers requiring mechanical means to move</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Suspended scaffolding or cradle systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Load Classes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Load Classes: Class 2 & Class 3
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most significant changes in the 2020 revision was the introduction of two
                load classes. Previously, EN 1004:2004 specified a single load capacity. The new system
                gives users and specifiers a clearer choice based on the intended use of the tower.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Weight className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Class 2 &mdash; 150 kg/m&sup2;</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">Light-duty applications</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Inspection and survey work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Painting and decorating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Light maintenance tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Electrical installation (light fittings, cable tray)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>CCTV and sensor installation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Weight className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Class 3 &mdash; 200 kg/m&sup2;</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">Heavy-duty applications</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Bricklaying and blockwork</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Plastering and rendering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Heavy mechanical installations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Cladding and curtain wall work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tasks requiring heavier tools and materials</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Calculating Maximum Platform Load</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p>Maximum load = Platform area (m&sup2;) &times; Load class rating (kg/m&sup2;)</p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-3">
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs text-white/60 mb-1">Example: Class 2, 1.3m &times; 2.5m platform</p>
                      <p className="text-white font-mono">3.25 m&sup2; &times; 150 = <span className="text-blue-400">487.5 kg max</span></p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs text-white/60 mb-1">Example: Class 3, 1.3m &times; 2.5m platform</p>
                      <p className="text-white font-mono">3.25 m&sup2; &times; 200 = <span className="text-green-400">650 kg max</span></p>
                    </div>
                  </div>
                  <p className="mt-2 text-white/60 text-xs">
                    Remember: the total load includes the weight of all persons, tools, materials, and equipment on the platform.
                  </p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Critical Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Never exceed the rated load class of the tower. Overloading can cause structural failure,
                  instability, or collapse. If your task requires more than the tower's rated capacity, you
                  must use a higher-rated tower or find an alternative method of access.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Maximum Heights */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Maximum Height Limits
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS EN 1004-1:2020 sets clear maximum platform height limits based on whether the tower
                is used indoors or outdoors. These limits are determined by the stability requirements
                of the standard, particularly the effect of wind loading on outdoor towers.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Ruler className="h-5 w-5 text-teal-400" />
                    <p className="text-sm font-medium text-teal-400">Indoor Use</p>
                  </div>
                  <p className="text-3xl font-bold text-teal-400 mb-2">12m</p>
                  <p className="text-sm text-white/80">Maximum platform height</p>
                  <ul className="text-sm text-white/60 space-y-1 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No wind loading consideration required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Enclosed building with no significant draughts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ground must be firm and level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Outriggers may be required at greater heights</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Ruler className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Outdoor Use</p>
                  </div>
                  <p className="text-3xl font-bold text-amber-400 mb-2">8m</p>
                  <p className="text-sm text-white/80">Maximum platform height</p>
                  <ul className="text-sm text-white/60 space-y-1 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Wind loading must be considered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Maximum wind speed for use: typically 7.7 m/s (force 4)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Outriggers often mandatory at outdoor heights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Sheeting or netting increases wind load dramatically</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Height Measurement:</strong> Platform height is measured
                  from the ground (or supporting surface) to the top of the working platform deck. It does
                  not include the guardrail height above the platform. Always refer to the manufacturer's
                  data sheet for the specific tower configuration and its rated maximum platform height.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Height-to-Base Ratios</p>
                <p className="text-sm text-white/80 mb-3">
                  EN 1004 uses height-to-base ratio as a key stability parameter. The taller the tower
                  relative to its base, the less stable it becomes:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs text-white/60 mb-1">Without outriggers (typical)</p>
                    <p className="text-white font-mono text-sm">Max ratio: <span className="text-teal-400">3.5:1</span></p>
                    <p className="text-xs text-white/60 mt-1">e.g. 1.3m base = max 4.55m platform height</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs text-white/60 mb-1">With outriggers fitted</p>
                    <p className="text-white font-mono text-sm">Ratio increases to approx. <span className="text-teal-400">up to the max rated height</span></p>
                    <p className="text-xs text-white/60 mt-1">Outriggers effectively widen the base dimension</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: BS 1139-6 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BS 1139-6: Non-Standard Towers
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a mobile tower falls outside the scope of BS EN 1004 &mdash; for example because it
                exceeds the maximum height limits or uses a non-standard configuration &mdash; BS 1139-6
                provides the relevant guidance. This British Standard covers metal scaffolding and is used
                as a reference for special scaffold structures.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">When BS 1139-6 Applies:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Mobile towers exceeding 12 metres indoor or 8 metres outdoor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers with non-standard base configurations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers supporting unusual or eccentric loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers used in unusual environments (e.g. on slopes, on other structures)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Bespoke tower designs not using standard prefabricated components</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Important</p>
                </div>
                <p className="text-sm text-white/80">
                  Any tower outside the scope of EN 1004 must have a specific structural design calculation
                  prepared by a competent person (typically a chartered structural engineer). The design must
                  account for all loadings including wind, the intended use, ground conditions, and any
                  unusual features. A method statement based on this design is essential.
                </p>
              </div>

              <p>
                In practice, most towers used on construction sites and for maintenance work fall within
                the scope of BS EN 1004. Towers falling under BS 1139-6 are the exception rather than
                the rule, and their use requires specialist knowledge and design input.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: EN 1004-2:2021 Instruction Manuals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            EN 1004-2:2021 &mdash; Instruction Manuals
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS EN 1004-2:2021 is the companion standard to EN 1004-1 and sets out the requirements
                for the instruction manual that must accompany every mobile access tower sold or hired.
                The manual is a critical safety document and must be available on site whenever a tower
                is in use.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">What the Manual Must Contain:</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Manufacturer's name and contact details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Full list of components with part numbers and quantities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Step-by-step assembly sequences with clear illustrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Dismantling sequence (which may differ from assembly)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maximum platform height for each configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Load class rating and maximum platform loading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>When outriggers are required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Stability information and safe use guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Inspection requirements and checklist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Safe use instructions (e.g. locking castors, not over-reaching)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Restrictions on use (wind speed limits, ground requirements)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Storage and maintenance guidance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Legal Requirement:</strong> Under the Work at Height
                  Regulations 2005, the manufacturer's instruction manual must be available at the place
                  where the tower is being used. The person assembling the tower must follow the
                  manufacturer's instructions. Assembling a tower without the manual is a breach of
                  the Regulations.
                </p>
              </div>

              <p>
                The instruction manual is not a substitute for training. A competent person must still
                assemble the tower, but they must do so in accordance with the manufacturer's specific
                instructions for that particular tower model and configuration.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Marking Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Marking & Labelling Requirements
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS EN 1004-1:2020 requires every tower to be permanently and legibly marked with specific
                information. This marking allows users to quickly identify the tower's capabilities and
                limitations, which is essential for safe use on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Mandatory Marking Information:</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Manufacturer's name or trademark</strong> &mdash; identifies who made the tower</p>
                  <p><strong className="text-white">2. Standard reference</strong> &mdash; "EN 1004-1:2020" confirms compliance</p>
                  <p><strong className="text-white">3. Load class</strong> &mdash; "Class 2" or "Class 3" with the maximum UDL</p>
                  <p><strong className="text-white">4. Maximum platform height</strong> &mdash; the highest platform configuration permitted</p>
                  <p><strong className="text-white">5. Tower model or type designation</strong> &mdash; identifies the specific model</p>
                  <p><strong className="text-white">6. Year of manufacture</strong> &mdash; for traceability and age assessment</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Where to Find the Marking</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Typically on a durable label on the base frame</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>May be stamped or engraved on the main frame</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Some manufacturers use QR codes linking to digital data sheets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must be visible when the tower is assembled</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Warning Signs</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Missing or illegible labels &mdash; do not use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No standard reference &mdash; may not be compliant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mixed components from different manufacturers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No load class stated &mdash; assume lowest capacity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Design Loads and Safety Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Design Loads & Safety Factors
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS EN 1004-1:2020 specifies the design loads and safety factors that manufacturers must
                use when designing mobile access towers. Understanding these helps you appreciate why
                exceeding the rated load is dangerous and how the margin of safety is built into the tower.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Design Load Categories</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Dead load:</strong> The self-weight of the tower structure, platforms, and all permanent components.</p>
                  <p><strong className="text-white">Imposed load:</strong> The working load on the platform &mdash; persons, tools, and materials (up to the class rating).</p>
                  <p><strong className="text-white">Wind load:</strong> The force exerted by wind on the tower and anything attached to it (sheeting, netting, banners).</p>
                  <p><strong className="text-white">Horizontal forces:</strong> Forces from people leaning, pushing, or pulling whilst working on the platform.</p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Safety Factors</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Structural strength:</strong> Components must withstand at least <strong className="text-elec-yellow">1.5 times</strong> the maximum rated load without structural failure (the ultimate limit state).</p>
                  <p><strong className="text-white">Stability:</strong> The tower must remain stable under the combined effects of all design loads. The overturning moment must not exceed the stabilising moment.</p>
                  <p><strong className="text-white">Deformation:</strong> Under working loads, deflection of any component must remain within specified limits to ensure the tower remains safe and usable.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Why This Matters on Site</p>
                </div>
                <p className="text-sm text-white/80">
                  The safety factor of 1.5 means a tower rated at 200 kg/m&sup2; should survive a load of
                  300 kg/m&sup2; without collapsing. However, this margin exists to account for dynamic
                  loads, impact forces, material degradation, and manufacturing tolerances &mdash; not to
                  allow overloading. Always work within the rated load class and never rely on the safety
                  margin as additional capacity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Practical On-Site Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Practical On-Site Guidance
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-teal-400 mb-2">Before Using a Tower &mdash; Check:</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Is the EN 1004 label present and legible?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>What load class is it rated for?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>What is the maximum platform height?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Is the instruction manual available on site?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Are all components from the same manufacturer?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Has it been assembled to the manufacturer's instructions?</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-2">Related Standards to Know</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>EN 1004-1:2020</strong> &mdash; Tower design and requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>EN 1004-2:2021</strong> &mdash; Instruction manual requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>BS 1139-6</strong> &mdash; Non-standard/special towers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>EN 12811-1</strong> &mdash; Fixed scaffolding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>PAS 250</strong> &mdash; Low-level platforms (under 2.5m)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Quick Reference: Standards Summary</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-white/60 border-b border-white/10">
                        <th className="pb-2 pr-4">Standard</th>
                        <th className="pb-2 pr-4">Covers</th>
                        <th className="pb-2">Key Limit</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4 font-mono text-xs">EN 1004-1:2020</td>
                        <td className="pr-4">Standard mobile towers</td>
                        <td>8m outdoor / 12m indoor</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4 font-mono text-xs">EN 1004-2:2021</td>
                        <td className="pr-4">Instruction manuals</td>
                        <td>Must be on site</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4 font-mono text-xs">BS 1139-6</td>
                        <td className="pr-4">Non-standard towers</td>
                        <td>Requires design calc</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">PAS 250</td>
                        <td className="pr-4">Low-level platforms</td>
                        <td>Under 2.5m platform</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
            <Link to="../ipaf-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: HSWA 1974 & CDM 2015
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-1-section-4">
              Next: PASMA & Competence
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
