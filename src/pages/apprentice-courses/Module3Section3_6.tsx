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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "dust-protection",
    question: "Which PPE protects against dust from drilling into masonry?",
    options: [
      "Safety glasses only",
      "Dust mask or respirator",
      "Hard hat",
    ],
    correctIndex: 1,
    explanation:
      "Dust masks or respirators filter airborne particles generated during masonry drilling, protecting against inhalation of harmful dust.",
  },
  {
    id: "insulated-gloves",
    question: "Name one situation where insulated gloves would be required.",
    options: [
      "Handling general tools",
      "Live electrical testing or work",
      "Lifting heavy objects",
    ],
    correctIndex: 1,
    explanation:
      "Insulated gloves rated for the appropriate voltage are essential when working on or testing live electrical circuits to prevent electric shock.",
  },
  {
    id: "ppe-inspection",
    question: "Why should PPE be inspected before each use?",
    options: [
      "To check for damage that could compromise protection",
      "To make it look clean",
      "To count inventory",
    ],
    correctIndex: 0,
    explanation:
      "Pre-use inspection identifies damage, wear, or defects that could compromise the protective function of PPE, ensuring continued safety.",
  },
  {
    id: "multi-hazard",
    question: "Why might multiple types of PPE be needed for one task?",
    options: [
      "To look more professional",
      "Tasks often present multiple hazards simultaneously",
      "To meet minimum requirements",
    ],
    correctIndex: 1,
    explanation:
      "Many electrical tasks present multiple hazards (dust, noise, flying debris, shock risk) requiring coordinated PPE protection.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which PPE is essential when cutting metal trunking with a grinder?",
    options: [
      "Safety glasses or face shield",
      "Earplugs",
      "Dust mask",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Grinding metal produces sparks (eye protection), noise (hearing protection), and metal particles (respiratory protection), requiring all listed PPE.",
  },
  {
    id: 2,
    question: "What is the main function of insulated gloves?",
    options: [
      "Improve grip",
      "Protect against electric shock",
      "Keep hands warm",
      "Prevent cuts from sharp metal",
    ],
    correctAnswer: 1,
    explanation:
      "Insulated gloves are specifically designed and rated to protect against electric shock when working on live electrical circuits.",
  },
  {
    id: 3,
    question: "True or False: PPE does not need to be replaced unless it is visibly damaged.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. PPE should be replaced according to manufacturer recommendations, when performance degrades, or when it no longer meets current standards.",
  },
  {
    id: 4,
    question: "Give one example of respiratory protection used by electricians.",
    options: [
      "Safety glasses",
      "Dust mask",
      "Hard hat",
      "Gloves",
    ],
    correctAnswer: 1,
    explanation:
      "Dust masks, half-face respirators, and full-face respirators are all examples of respiratory protection equipment used by electricians.",
  },
  {
    id: 5,
    question: "Which type of footwear is generally required on construction sites?",
    options: [
      "Trainers",
      "Safety boots with toe caps",
      "Sandals",
      "Rubber slippers",
    ],
    correctAnswer: 1,
    explanation:
      "Safety boots with steel or composite toe caps protect against dropped tools and provide slip resistance required on construction sites.",
  },
  {
    id: 6,
    question: "Why is high-visibility clothing important in certain environments?",
    options: [
      "It looks professional",
      "Improves visibility to reduce collision risk",
      "It's waterproof",
      "It provides electrical insulation",
    ],
    correctAnswer: 1,
    explanation:
      "High-visibility clothing makes workers more visible to vehicle operators and machinery operators, reducing collision risks.",
  },
  {
    id: 7,
    question: "Name one maintenance step for PPE.",
    options: [
      "Ignore manufacturer instructions",
      "Cleaning after use and proper storage",
      "Use damaged equipment until replacement",
      "Store in damp conditions",
    ],
    correctAnswer: 1,
    explanation:
      "Regular cleaning, proper storage in dry conditions, and following manufacturer maintenance guidelines are essential for PPE longevity.",
  },
  {
    id: 8,
    question: "Which regulation requires employers to provide and maintain suitable PPE in the UK?",
    options: [
      "BS 7671",
      "PPE at Work Regulations 1992",
      "COSHH",
      "LOLER",
    ],
    correctAnswer: 1,
    explanation:
      "The PPE at Work Regulations 1992 (as amended) require employers to provide and maintain suitable PPE where risks cannot be controlled by other means.",
  },
];

const Module3Section3_6: React.FC = () => {
  console.log("Module3Section3_6 component loaded");

  useSEO(
    "PPE Associated with Tool Use – Module 3 (3.3.6)",
    "Complete guide to PPE for electrical tool use. Head, eye, hearing, hand, respiratory and foot protection requirements and maintenance."
  );

  const faqs = [
    {
      q: "Can I use the same gloves for electrical testing and handling sharp metal?",
      a: "No — gloves for electrical testing must be rated for voltage, while cut-resistant gloves are designed for mechanical protection. Use task-specific gloves.",
    },
    {
      q: "Are earplugs as effective as ear defenders?",
      a: "Yes, when used correctly, but defenders are often more comfortable for prolonged use and easier to ensure proper positioning.",
    },
    {
      q: "How often should dust mask filters be replaced?",
      a: "According to manufacturer recommendations, or sooner if breathing becomes difficult or the filter becomes clogged.",
    },
    {
      q: "Can I use my own PPE on site?",
      a: "Only if it meets site requirements and standards. Employers must ensure all PPE is suitable and maintained regardless of ownership.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
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
              Back to Section 3.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <span className="text-elec-yellow text-sm font-medium">Module 3 - Section 3.3.6</span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-white/5">
              <HardHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            PPE Associated with Tool Use
          </h1>
          <p className="text-white/70">
            Essential personal protective equipment for safe electrical tool operation and maintenance requirements.
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
                <li>Eyes: safety glasses for all cutting, drilling, grinding operations.</li>
                <li>Ears: protection for prolonged power tool use, especially SDS drills.</li>
                <li>Hands: cut-resistant for sharp metal, insulated for electrical work.</li>
                <li>Lungs: dust masks for masonry drilling, respirators for enclosed spaces.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Flying debris, noise levels, sharp edges, electrical hazards.
                </li>
                <li>
                  <strong>Use:</strong> Task-specific PPE - match protection to hazard type.
                </li>
                <li>
                  <strong>Check:</strong> Condition before use, ratings match requirements, proper fit.
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
            <li>Identify common PPE used when operating electrical tools.</li>
            <li>Match PPE types to specific hazards.</li>
            <li>Apply correct usage and maintenance procedures for PPE.</li>
            <li>Recognise when PPE must be replaced or upgraded.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content
          </h2>

          {/* Head and Eye Protection */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <HardHat className="w-5 h-5" /> Head and Eye Protection
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Head Protection</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose & Function</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Protects from falling objects and tool drops</li>
                        <li>Guards against impact with overhead structures</li>
                        <li>Prevents electrical shock in some applications</li>
                        <li>Required on all construction and industrial sites</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Types Available</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Hard hats (Class E for electrical work)</li>
                        <li>Bump caps for low-risk environments</li>
                        <li>Climbing helmets for rope access work</li>
                        <li>Vented designs for hot environments</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">When to Use</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>All construction site work</li>
                        <li>Overhead cable installation</li>
                        <li>Working under scaffolding or structures</li>
                        <li>Industrial plant maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Eye and Face Protection</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose & Function</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Shields against dust, sparks, and flying debris</li>
                        <li>Protects from chemical splashes and UV radiation</li>
                        <li>Prevents eye injuries from metal fragments</li>
                        <li>Essential for high-speed cutting operations</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Types Available</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Safety glasses (side shields recommended)</li>
                        <li>Goggles for dust and chemical protection</li>
                        <li>Face shields for grinding and welding</li>
                        <li>Prescription safety eyewear available</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">When to Use</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Drilling masonry or metal</li>
                        <li>Cutting conduit or trunking</li>
                        <li>Stripping cable with splinter risk</li>
                        <li>Any operation producing flying particles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* Hearing and Hand Protection */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Hearing and Hand Protection
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Hearing Protection</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose & Function</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Reduces risk of noise-induced hearing loss</li>
                        <li>Prevents tinnitus from prolonged exposure</li>
                        <li>Required for noise levels above 85dB(A)</li>
                        <li>Improves concentration in noisy environments</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Types Available</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Ear defenders (over-ear protection)</li>
                        <li>Earplugs (foam, silicone, or custom-fit)</li>
                        <li>Electronic defenders with communication</li>
                        <li>Combination with other PPE (hard hat integrated)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">When to Use</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Prolonged use of hammer drills or SDS drills</li>
                        <li>Angle grinding operations</li>
                        <li>Demolition or breaking work</li>
                        <li>Operating in noisy industrial environments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Hand Protection</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose & Function</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Prevents cuts, abrasions, and burns</li>
                        <li>Protects against electric shock (when rated)</li>
                        <li>Improves grip in wet or oily conditions</li>
                        <li>Shields against chemical contact</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Types Available</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>General work gloves (cut-resistant for metal)</li>
                        <li>Insulated gloves (voltage-rated for electrical)</li>
                        <li>Disposable nitrile for contamination protection</li>
                        <li>Heat-resistant for hot work applications</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">When to Use</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Handling sharp metal trunking or SWA cable</li>
                        <li>Live electrical testing (voltage-rated gloves)</li>
                        <li>Chemical handling or contaminated environments</li>
                        <li>Rough construction work requiring grip</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* Respiratory and Foot Protection */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Respiratory and Foot Protection
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                  <p className="font-medium mb-2">Respiratory Protection</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose & Function</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Filters dust, fumes, and airborne contaminants</li>
                        <li>Prevents respiratory diseases and lung damage</li>
                        <li>Essential in dusty or confined environments</li>
                        <li>Protects against harmful chemical vapours</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Types Available</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Disposable dust masks (FFP1, FFP2, FFP3)</li>
                        <li>Half-face respirators with replaceable filters</li>
                        <li>Full-face respirators for eye protection too</li>
                        <li>Powered air-purifying respirators (PAPR)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">When to Use</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Drilling into masonry or concrete</li>
                        <li>Cutting MDF or other composite materials</li>
                        <li>Working in dusty loft spaces</li>
                        <li>Confined space work with poor ventilation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                  <p className="font-medium mb-2">Foot Protection</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose & Function</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Prevents injury from dropped tools and materials</li>
                        <li>Protects against sharp debris and nails</li>
                        <li>Provides slip resistance on various surfaces</li>
                        <li>Some types offer electrical insulation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Types Available</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Safety boots with steel or composite toe caps</li>
                        <li>Anti-slip soles for wet or oily surfaces</li>
                        <li>Electrical hazard (EH) rated footwear</li>
                        <li>Wellington boots for wet environments</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">When to Use</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>All site work - mandatory in construction</li>
                        <li>Industrial environments with heavy machinery</li>
                        <li>Areas with potential electrical hazards</li>
                        <li>Wet or slippery working conditions</li>
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
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <Building className="w-5 h-5" /> What this means on site
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2">PPE Selection Strategy</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Assess task hazards before selecting appropriate PPE combinations</li>
                <li>Consider site-specific requirements and higher standards</li>
                <li>Plan for PPE changes when moving between different work areas</li>
                <li>Ensure PPE is compatible when multiple types are worn together</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium mb-2">Professional Impact</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Demonstrates professional competence and safety awareness</li>
                <li>Reduces insurance costs and liability for employers</li>
                <li>Prevents work stoppages due to injury incidents</li>
                <li>Ensures compliance with client and site safety requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation Practices */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <Settings className="w-5 h-5" /> Installation Practices
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">PPE Maintenance</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Inspect PPE before each use for damage or wear</li>
                  <li>Clean according to manufacturer guidance after use</li>
                  <li>Store in clean, dry conditions to prolong lifespan</li>
                  <li>Replace immediately if damaged or performance degrades</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-2">Clothing Protection</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Flame-retardant overalls for hot work or electrical hazards</li>
                  <li>High-visibility vests in areas with moving vehicles</li>
                  <li>Weather-appropriate outer layers for outdoor work</li>
                  <li>Avoid loose clothing that can catch in machinery</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <AlertTriangle className="w-5 h-5 text-elec-yellow" /> Common Mistakes
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Dangerous Practices</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Wrong glove type for electrical work</strong> - Risk of electric shock with non-insulated gloves</li>
                <li><strong>Damaged or expired PPE use</strong> - Compromised protection leading to injury</li>
                <li><strong>Removing PPE in hazardous areas</strong> - Exposure to risks during "quick tasks"</li>
                <li><strong>Incompatible PPE combinations</strong> - Reduced effectiveness when items don't work together</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Compliance Issues</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Inadequate hazard assessment</strong> - Missing PPE requirements for specific tasks</li>
                <li><strong>Poor maintenance records</strong> - Cannot demonstrate PPE fitness for use</li>
                <li><strong>No replacement schedule</strong> - Using PPE beyond recommended service life</li>
                <li><strong>Lack of training</strong> - Incorrect use reducing protective effectiveness</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PPE Regulations Context */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            <Shield className="w-5 h-5" /> PPE Regulations Context
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
              <p className="font-medium mb-2">PPE at Work Regulations 1992</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Regulation 4:</strong> Employers must provide suitable PPE</li>
                <li><strong>Regulation 7:</strong> PPE must be maintained in good working order</li>
                <li><strong>Regulation 9:</strong> Information, instruction and training required</li>
                <li><strong>Regulation 10:</strong> Employees must use PPE correctly</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
              <p className="font-medium mb-2">Compliance Requirements</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>PPE must be CE marked and meet relevant standards</li>
                <li>Risk assessments must identify PPE requirements</li>
                <li>Regular inspection and replacement programmes needed</li>
                <li>Training records must demonstrate competent use</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Real-world Scenario */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            <Factory className="w-5 h-5" /> Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
            <p className="font-medium mb-2">Scenario: Eye Injury from Overhead Drilling</p>
            <p className="text-sm mb-4">
              An electrician was drilling overhead into concrete without wearing safety glasses. A small piece of concrete
              fell into his eye, causing injury and a week off work. After the incident, the company made wearing eye protection
              mandatory for all drilling tasks, preventing further accidents.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Consequences</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Personal injury requiring medical treatment</li>
                  <li>Time off work and lost productivity</li>
                  <li>Potential for permanent vision damage</li>
                  <li>HSE investigation and potential enforcement</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-300 mb-1">Prevention Implementation</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Mandatory eye protection policy introduced</li>
                  <li>Toolbox talks on PPE importance</li>
                  <li>Site supervision to ensure compliance</li>
                  <li>PPE provision improved and monitored</li>
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
              <div key={index}>
                <p className="font-medium text-white mb-1">{faq.q}</p>
                <p className="text-sm text-white">{faq.a}</p>
                {index < faqs.length - 1 && <div className="my-4 border-t border-white/10" />}
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
              PPE provides crucial protection when using electrical tools. Choosing the right PPE for each task,
              maintaining it in good condition, and replacing it when worn ensures safety and compliance with workplace regulations.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-green-300 mb-2">Key Benefits</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Significantly reduces injury severity and frequency</li>
                  <li>Ensures compliance with legal requirements</li>
                  <li>Demonstrates professional safety awareness</li>
                  <li>Reduces insurance costs and liability risks</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-elec-yellow mb-2">Essential Points</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Match PPE type to specific hazards present</li>
                  <li>Inspect before use and maintain properly</li>
                  <li>Replace when damaged or beyond service life</li>
                  <li>Ensure compatibility when using multiple items</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Apprentice Do's and Don'ts */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            <Target className="w-5 h-5" /> Apprentice Do's and Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium text-green-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> DO
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Assess hazards before selecting PPE</li>
                <li>Inspect PPE before each use</li>
                <li>Use task-specific protection (insulated gloves for electrical)</li>
                <li>Maintain and store PPE properly</li>
                <li>Replace damaged or expired PPE immediately</li>
                <li>Follow site-specific PPE requirements</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> DON'T
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Use general gloves for electrical testing</li>
                <li>Work without appropriate eye protection</li>
                <li>Continue using damaged PPE</li>
                <li>Remove PPE in hazardous areas</li>
                <li>Share personal PPE with others</li>
                <li>Ignore manufacturer maintenance instructions</li>
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
                <p className="font-medium mb-2">PPE Selection Guide</p>
                <ul className="space-y-1">
                  <li>• <strong>Eyes:</strong> All cutting, drilling, grinding</li>
                  <li>• <strong>Ears:</strong> Power tools, prolonged noise</li>
                  <li>• <strong>Hands:</strong> Cut-resistant or voltage-rated</li>
                  <li>• <strong>Lungs:</strong> Dust, fumes, confined spaces</li>
                  <li>• <strong>Head:</strong> All construction sites</li>
                  <li>• <strong>Feet:</strong> Safety boots with toe caps</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Maintenance Reminders</p>
                <ul className="space-y-1">
                  <li>• Inspect before each use</li>
                  <li>• Clean after use per instructions</li>
                  <li>• Store in clean, dry conditions</li>
                  <li>• Replace if damaged or expired</li>
                  <li>• Check ratings match job requirements</li>
                  <li>• Follow manufacturer guidelines</li>
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
            <p><strong>PPE at Work Regulations 1992:</strong> Legal requirements for PPE provision and use</p>
            <p><strong>BS EN 166:</strong> Eye protection - specifications and testing</p>
            <p><strong>BS EN 60903:</strong> Gloves and mitts of insulating material for live working</p>
            <p><strong>HSE L25:</strong> Personal protective equipment at work guidance</p>
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
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safe Use & Storage
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              Back to Section 3.3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section3_6;
