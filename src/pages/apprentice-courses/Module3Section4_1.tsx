import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
  Zap,
  Hammer,
  Power,
  Activity,
  Search,
  Truck,
  HardHat,
  Cable,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "access-repairs",
    question: "Which installation method offers easier future access for repairs?",
    options: [
      "Concealed wiring",
      "Surface wiring",
      "Both are equally accessible",
    ],
    correctIndex: 1,
    explanation:
      "Surface wiring is directly accessible on walls and ceilings, making inspection, testing, and repairs much easier than concealed systems.",
  },
  {
    id: "safe-zones",
    question: "Why must concealed wiring be installed in safe zones?",
    options: [
      "To improve appearance",
      "To prevent accidental damage during future work",
      "To reduce installation cost",
    ],
    correctIndex: 1,
    explanation:
      "Safe zones are prescribed areas where cables are expected to be located, helping prevent accidental damage during drilling or renovation work.",
  },
  {
    id: "surface-disadvantage",
    question: "Name one disadvantage of surface wiring in a domestic living room.",
    options: [
      "Higher electrical resistance",
      "Less visually appealing appearance",
      "Requires more power",
    ],
    correctIndex: 1,
    explanation:
      "In finished domestic spaces, visible cables, conduit, or trunking can detract from the room's aesthetic appeal and interior design.",
  },
  {
    id: "installation-choice",
    question: "What factors influence the choice between surface and concealed wiring?",
    options: [
      "Cable colour only",
      "Environment, aesthetics, budget, and future access needs",
      "Weather conditions",
    ],
    correctIndex: 1,
    explanation:
      "Multiple factors including the environment type, aesthetic requirements, budget constraints, and anticipated future modifications influence the installation method choice.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which installation method is generally faster to install?",
    options: [
      "Concealed wiring",
      "Surface wiring",
      "Both take the same time",
      "Neither",
    ],
    correctAnswer: 1,
    explanation:
      "Surface wiring is faster to install as it avoids the time-consuming processes of chasing walls and making good finishes.",
  },
  {
    id: 2,
    question: "What is one major advantage of concealed wiring?",
    options: [
      "Cheaper labour cost",
      "Reduced risk of accidental damage",
      "Easier to modify after installation",
      "No finishing work needed",
    ],
    correctAnswer: 1,
    explanation:
      "Concealed wiring is protected within the building structure, significantly reducing the risk of accidental damage from impact or interference.",
  },
  {
    id: 3,
    question: "True or False: Cables concealed in walls do not need to follow safe zones if they are in conduit.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Even when in conduit, concealed cables must still follow prescribed safe zones or have adequate mechanical protection per BS 7671.",
  },
  {
    id: 4,
    question: "Name one disadvantage of surface wiring.",
    options: [
      "Higher electrical resistance",
      "Less visually appealing in finished spaces",
      "Requires more voltage",
      "Cannot be earthed properly",
    ],
    correctAnswer: 1,
    explanation:
      "Surface wiring is less visually appealing in finished spaces and has a higher risk of accidental damage unless properly protected.",
  },
  {
    id: 5,
    question: "Which type of installation is preferred for plant rooms and workshops?",
    options: [
      "Surface wiring",
      "Concealed wiring",
      "Neither",
      "Both",
    ],
    correctAnswer: 0,
    explanation:
      "Surface wiring is preferred in industrial environments for easier access, maintenance, and future modifications without aesthetic concerns.",
  },
  {
    id: 6,
    question: "Why can concealed wiring be more expensive?",
    options: [
      "Requires more copper",
      "Requires chasing and making good finishes",
      "Needs longer cables",
      "Requires extra testing",
    ],
    correctAnswer: 1,
    explanation:
      "Concealed wiring requires additional labour for chasing channels, installing conduit, and making good wall finishes, increasing overall costs.",
  },
  {
    id: 7,
    question: "What must be provided for concealed wiring to allow inspection?",
    options: [
      "Windows in walls",
      "Access points for junction boxes or pull points",
      "Surface indicators",
      "Special tools only",
    ],
    correctAnswer: 1,
    explanation:
      "Access points must be provided for junction boxes, connection points, or cable pulling locations to enable future inspection and maintenance.",
  },
  {
    id: 8,
    question: "Which UK regulation covers requirements for safe zones in wiring?",
    options: [
      "Building Regulations",
      "BS 7671 (IET Wiring Regulations)",
      "Health and Safety at Work Act",
      "Fire Safety Order",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 (IET Wiring Regulations) specifies the requirements for safe zones and installation methods for concealed wiring systems.",
  },
];

const Module3Section4_1: React.FC = () => {
  console.log("Module3Section4_1 component loaded");

  useSEO(
    "Surface vs Concealed Wiring Installations – Module 3 (3.4.1)",
    "Complete guide to surface and concealed wiring methods. Installation techniques, advantages, disadvantages and BS 7671 compliance."
  );

  const faqs = [
    {
      q: "Can I run concealed wiring without conduit?",
      a: "Only if the cable type is suitable for direct embedding and complies with BS 7671 — but conduit is strongly recommended for protection and future replacement.",
    },
    {
      q: "Is surface wiring allowed in domestic properties?",
      a: "Yes, but it's often avoided in main living areas for aesthetic reasons unless installed neatly in trunking or conduit.",
    },
    {
      q: "Which method is faster to install?",
      a: "Surface wiring, as it avoids chasing and making good walls, reducing both time and labour costs.",
    },
    {
      q: "Can I mix surface and concealed wiring in the same installation?",
      a: "Yes, it's common to use concealed wiring in finished areas and surface wiring in plant rooms or service areas within the same building.",
    },
  ];

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <span className="text-elec-yellow text-sm font-medium">Module 3</span>
            <span className="text-white/50">|</span>
            <span className="text-white/70 text-sm">Section 3.4.1</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Surface vs Concealed Wiring Installations
          </h1>
          <p className="text-white/70">
            Understanding installation methods, advantages, disadvantages and selection criteria for different environments.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Surface: visible on walls/ceilings, faster install, easier access, less aesthetic.</li>
                <li>Concealed: hidden in walls/ceilings, neater finish, harder to modify, higher cost.</li>
                <li>Choice depends on: environment, aesthetics, budget, future access needs.</li>
                <li>BS 7671: safe zones mandatory for concealed, access points required.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Visible trunking/conduit (surface), flush sockets (concealed).
                </li>
                <li>
                  <strong>Use:</strong> Surface for industrial/plant rooms, concealed for offices/homes.
                </li>
                <li>
                  <strong>Check:</strong> Safe zones, access points, mechanical protection, aesthetics.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Describe the characteristics of surface-mounted and concealed wiring systems.</li>
            <li>Identify the advantages and disadvantages of each method.</li>
            <li>Select the most appropriate installation method for given environments.</li>
            <li>Recognise key compliance and safety considerations for both methods.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content
          </h2>

          {/* Surface Wiring */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Surface Wiring Installations
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/20">
                <p className="font-medium mb-2">Description & Methods</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Installation Characteristics</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Cables or conduit fixed directly to surface of walls/ceilings</li>
                      <li>Uses cable clips, trunking, PVC conduit, or steel conduit</li>
                      <li>No chasing or embedding required in building structure</li>
                      <li>Fully visible and accessible for inspection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Key Advantages</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Easier and faster installation process</li>
                      <li>Easy access for inspection, testing, and repairs</li>
                      <li>Lower labour costs and installation time</li>
                      <li>Simple to modify or extend existing circuits</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Disadvantages</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Less visually appealing in finished spaces</li>
                      <li>Higher risk of accidental damage unless protected</li>
                      <li>May require more robust containment for safety</li>
                      <li>Can accumulate dust and require more cleaning</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Common Applications</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Industrial sites and manufacturing facilities</li>
                      <li>Utility rooms and plant areas</li>
                      <li>Temporary installations and site accommodation</li>
                      <li>Workshops and service areas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* Concealed Wiring */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Home className="w-5 h-5" /> Concealed Wiring Installations
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-2">Description & Methods</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Installation Characteristics</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Cables hidden inside walls, floors, or ceilings</li>
                      <li>Often in recessed conduit or trunking systems</li>
                      <li>Requires chasing or routing through building structure</li>
                      <li>Finishing work needed to restore surface appearance</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Installation Methods</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Chasing walls to embed conduit or trunking</li>
                      <li>Routing above ceilings or within stud partitions</li>
                      <li>Installing in service ducts or floor voids</li>
                      <li>Threading through pre-formed building cavities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Key Advantages</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Neater finish with no visible cables or conduit</li>
                      <li>Reduced risk of accidental damage</li>
                      <li>Preferred for aesthetic appeal in finished spaces</li>
                      <li>Better protection from environmental factors</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Disadvantages</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>More time-consuming and labour-intensive</li>
                      <li>Higher cost due to chasing and finishing work</li>
                      <li>Difficult to modify after installation</li>
                      <li>Limited access for future inspection or testing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Common Applications</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Domestic properties and residential buildings</li>
                      <li>Offices and commercial interiors</li>
                      <li>Hotels and hospitality venues</li>
                      <li>Retail spaces and showrooms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* Selection Factors */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" /> Installation Method Selection
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                  <p className="font-medium mb-2">Primary Factors</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Environment Type</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Industrial: Surface preferred for accessibility</li>
                        <li>Commercial: Mixed approach based on areas</li>
                        <li>Domestic: Concealed preferred for aesthetics</li>
                        <li>Temporary: Surface for easy removal</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Budget Considerations</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Surface: Lower initial cost and faster install</li>
                        <li>Concealed: Higher cost but better long-term value</li>
                        <li>Consider lifecycle costs including maintenance</li>
                        <li>Factor in potential future modification needs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/20">
                  <p className="font-medium mb-2">Practical Considerations</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Aesthetic Requirements</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Client expectations for finished appearance</li>
                        <li>Interior design coordination requirements</li>
                        <li>Building use and visitor expectations</li>
                        <li>Heritage or architectural constraints</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Future Access Needs</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Likelihood of circuit modifications</li>
                        <li>Frequency of maintenance requirements</li>
                        <li>Building use change potential</li>
                        <li>Technology upgrade considerations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* What this means on site */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" />
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            What this means on site
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/20">
              <p className="font-medium mb-2">Installation Planning</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Survey building structure and assess chasing requirements early</li>
                <li>Coordinate with other trades to avoid conflicts in walls/ceilings</li>
                <li>Plan cable routes to minimise structural impact and maximise efficiency</li>
                <li>Consider building phasing and access requirements during installation</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium mb-2">Quality Delivery</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Surface work requires neat, uniform spacing and professional appearance</li>
                <li>Concealed work needs careful coordination with building finishes</li>
                <li>Access points must be clearly marked and easily identifiable</li>
                <li>Documentation critical for concealed installations for future reference</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation Practices */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Installation Practices
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Surface Installation Best Practice</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use appropriate fixings for substrate type and load</li>
                  <li>Maintain consistent spacing and alignment for professional appearance</li>
                  <li>Protect cables from physical damage with suitable containment</li>
                  <li>Provide clear labelling and identification systems</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-2">Concealed Installation Best Practice</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Follow prescribed safe zones or provide mechanical protection</li>
                  <li>Ensure adequate depth and covering per BS 7671 requirements</li>
                  <li>Install access points at junctions and connection points</li>
                  <li>Document installation with accurate as-built drawings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Mistakes
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/20">
              <p className="font-medium mb-2 text-elec-yellow">Dangerous Practices</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Ignoring safe zones for concealed wiring</strong> - Risk of cable damage during future work</li>
                <li><strong>Inadequate mechanical protection</strong> - Cables vulnerable to damage from nails/screws</li>
                <li><strong>No access points for concealed systems</strong> - Cannot inspect or test installations</li>
                <li><strong>Poor documentation</strong> - Cannot locate cables for future work or emergency repairs</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/20">
              <p className="font-medium mb-2 text-elec-yellow">Quality Issues</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Inconsistent surface mounting</strong> - Unprofessional appearance affecting client satisfaction</li>
                <li><strong>Poor chasing technique</strong> - Structural damage or inadequate cable protection</li>
                <li><strong>Mixing methods inappropriately</strong> - Aesthetically poor transitions between surface and concealed</li>
                <li><strong>Inadequate finishing</strong> - Visible damage or poor making good after concealed installation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* BS 7671 Context */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            BS 7671 Context
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
              <p className="font-medium mb-2">Safety and Compliance Requirements</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Section 522:</strong> Selection and erection of wiring systems</li>
                <li><strong>Section 522.6:</strong> Cables concealed in walls and partitions</li>
                <li><strong>Section 528:</strong> Proximity to other services</li>
                <li><strong>Section 543:</strong> Protective conductor continuity</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
              <p className="font-medium mb-2">Specific Requirements</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Concealed cables must be in prescribed safe zones or mechanically protected</li>
                <li>Adequate depth and covering required for embedded installations</li>
                <li>Fire safety: cable supports must be non-combustible in escape routes</li>
                <li>Access points required for junction boxes and connection points</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Real-world Scenario */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Factory className="w-5 h-5" />
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
            <p className="font-medium mb-2">Scenario: School Refurbishment Installation Strategy</p>
            <p className="text-sm mb-4">
              In a school refurbishment, surface-mounted trunking was used in classrooms to reduce cost and allow easy access
              for future IT upgrades. In contrast, concealed wiring was used in the new administrative offices to maintain
              a high-quality interior finish appropriate for client meetings and professional presentation.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Classroom Approach (Surface)</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Fast installation during school holidays</li>
                  <li>Easy access for frequent technology updates</li>
                  <li>Cost-effective approach for educational budget</li>
                  <li>Robust trunking protects against student impact</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-300 mb-1">Office Approach (Concealed)</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Professional appearance for client meetings</li>
                  <li>Clean lines complement modern office design</li>
                  <li>Reduced maintenance and cleaning requirements</li>
                  <li>Higher investment justified by building use</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/20">
                <p className="font-medium text-white mb-1">{faq.q}</p>
                <p className="text-sm text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Summary
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p>
              Surface wiring is quicker, cheaper, and easier to maintain, but less attractive in finished spaces.
              Concealed wiring provides a neater look and better protection from damage but is more expensive and harder to modify.
              The choice depends on environment, budget, aesthetics, and safety requirements.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-green-300 mb-2">Key Benefits</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Clear understanding enables appropriate method selection</li>
                  <li>Proper installation ensures compliance and safety</li>
                  <li>Cost-effective approach balances budget and requirements</li>
                  <li>Future-proofing considerations reduce long-term costs</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border-l-2 border-l-elec-yellow border border-white/20">
                <p className="font-medium text-elec-yellow mb-2">Essential Points</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Environment and use determine appropriate method</li>
                  <li>BS 7671 compliance essential for both approaches</li>
                  <li>Access and maintenance needs influence selection</li>
                  <li>Documentation critical for concealed installations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Apprentice Do's and Don'ts */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Apprentice Do's and Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium text-green-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> DO
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Consider all factors before choosing installation method</li>
                <li>Follow prescribed safe zones for concealed wiring</li>
                <li>Provide adequate access points for future inspection</li>
                <li>Document concealed installations with accurate drawings</li>
                <li>Use appropriate containment for surface installations</li>
                <li>Coordinate with other trades on concealed work</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/20">
              <p className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> DON'T
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Install concealed cables outside safe zones without protection</li>
                <li>Compromise structural integrity when chasing</li>
                <li>Create concealed installations without access points</li>
                <li>Mix methods inappropriately in finished areas</li>
                <li>Neglect mechanical protection for embedded cables</li>
                <li>Fail to document hidden cable routes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pocket Card Quick Reference */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">12</span>
            Pocket Card Quick Reference
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Surface vs Concealed Selection</p>
                <ul className="space-y-1">
                  <li><strong>Industrial:</strong> Surface preferred</li>
                  <li><strong>Domestic:</strong> Concealed preferred</li>
                  <li><strong>Budget tight:</strong> Surface cheaper/faster</li>
                  <li><strong>Aesthetics critical:</strong> Concealed better</li>
                  <li><strong>Future changes likely:</strong> Surface easier</li>
                  <li><strong>Protection needed:</strong> Concealed safer</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Compliance Reminders</p>
                <ul className="space-y-1">
                  <li>Safe zones mandatory for concealed cables</li>
                  <li>Mechanical protection if outside safe zones</li>
                  <li>Access points required for junctions</li>
                  <li>Adequate depth and covering needed</li>
                  <li>Document concealed routes accurately</li>
                  <li>Fire-rated supports in escape routes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key References */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">13</span>
            Key References
          </h2>
          <div className="text-xs sm:text-sm text-white space-y-2">
            <p><strong>BS 7671:</strong> IET Wiring Regulations (18th Edition) - Sections 522, 528, 543</p>
            <p><strong>IET On-Site Guide:</strong> Practical guidance for electrical installations</p>
            <p><strong>Building Regulations:</strong> Part P - Electrical safety in dwellings</p>
            <p><strong>IET Guidance Note 1:</strong> Selection and erection of equipment</p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">14</span>
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.4
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-2">
              Next: Cable Installation Methods
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section4_1;
