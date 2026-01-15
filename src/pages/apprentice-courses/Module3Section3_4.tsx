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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "insulated-tools",
    question: "Why should insulated tools be inspected before each use?",
    options: [
      "To check for nicks or cuts in insulation",
      "To see if they need cleaning",
      "To verify the manufacturer details",
    ],
    correctIndex: 0,
    explanation:
      "Damaged insulation on electrical tools can expose users to electric shock, making visual inspection for nicks, cuts, or wear essential before each use.",
  },
  {
    id: "unsafe-power-tool",
    question: "Name one sign that a power tool is unsafe to use.",
    options: [
      "Clean exterior surface",
      "Cracked casing or frayed cable",
      "Recent purchase date",
    ],
    correctIndex: 1,
    explanation:
      "Cracked casings can expose internal wiring, while frayed cables present electric shock risks. Either condition makes the tool unsafe for use.",
  },
  {
    id: "calibration-importance",
    question: "Why is calibration important for test equipment?",
    options: [
      "To make it look professional",
      "To maintain accuracy and compliance",
      "To increase battery life",
    ],
    correctIndex: 1,
    explanation:
      "Regular calibration ensures test equipment provides accurate readings, maintaining compliance with testing standards and ensuring reliable, trustworthy results.",
  },
  {
    id: "storage-conditions",
    question: "Why should tools be stored in dry conditions?",
    options: [
      "To improve appearance",
      "To prevent corrosion and electrical damage",
      "To reduce storage space",
    ],
    correctIndex: 1,
    explanation:
      "Moisture causes corrosion on metal parts and can damage electrical components, significantly reducing tool life and safety.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What regulation covers the safe use and maintenance of tools in the workplace?",
    options: [
      "BS 7671",
      "PUWER",
      "COSHH",
      "LOLER",
    ],
    correctAnswer: 1,
    explanation:
      "PUWER (Provision and Use of Work Equipment Regulations) specifically covers the safe use and maintenance of work equipment including tools.",
  },
  {
    id: 2,
    question: "Which of the following is a sign that a cutting tool needs maintenance?",
    options: [
      "Sharp edges",
      "Blunt or chipped edges",
      "Clean, polished surface",
      "New packaging",
    ],
    correctAnswer: 1,
    explanation:
      "Blunt or chipped cutting edges indicate wear and reduce tool effectiveness, potentially causing poor cuts and increased effort.",
  },
  {
    id: 3,
    question: "True or False: Insulated tools do not need regular inspection.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Insulated tools require regular inspection to check for damage to the insulation that could compromise electrical safety.",
  },
  {
    id: 4,
    question: "Give one example of basic power tool maintenance.",
    options: [
      "Changing the colour",
      "Cleaning vents and checking cables",
      "Adding stickers",
      "Increasing power output",
    ],
    correctAnswer: 1,
    explanation:
      "Cleaning vents prevents overheating, while checking cables ensures electrical safety - both are essential maintenance tasks.",
  },
  {
    id: 5,
    question: "Why should tools be stored in a dry environment?",
    options: [
      "To improve aesthetics",
      "To prevent corrosion and electrical damage",
      "To reduce weight",
      "To comply with recycling laws",
    ],
    correctAnswer: 1,
    explanation:
      "Dry storage prevents corrosion of metal parts and protects electrical components from moisture damage.",
  },
  {
    id: 6,
    question: "What should be done with damaged tools?",
    options: [
      "Continue using them until they fail completely",
      "Repair immediately or remove from service",
      "Lend them to another worker",
      "Use them only on low-voltage systems",
    ],
    correctAnswer: 1,
    explanation:
      "Damaged tools should be immediately repaired by qualified personnel or removed from service to prevent injury and poor workmanship.",
  },
  {
    id: 7,
    question: "Why is record-keeping important for tool maintenance?",
    options: [
      "To increase tool value",
      "To track inspections and comply with safety policies",
      "To impress clients",
      "To reduce insurance costs",
    ],
    correctAnswer: 1,
    explanation:
      "Records help track inspections, identify recurring issues, demonstrate compliance with safety regulations, and plan preventive maintenance.",
  },
  {
    id: 8,
    question: "Give one method of protecting tools during transport.",
    options: [
      "Wrap in newspaper",
      "Use a toolbox with protective inserts",
      "Carry them loose",
      "Tie them together",
    ],
    correctAnswer: 1,
    explanation:
      "Toolboxes with protective foam inserts prevent tools from moving and damaging each other during transport.",
  },
];

const Module3Section3_4: React.FC = () => {
  console.log("Module3Section3_4 component loaded");

  useSEO(
    "Tool Inspection and Maintenance – Module 3 (3.3.4)",
    "Essential guide to tool inspection and maintenance. Safety checks, maintenance practices, storage and PUWER compliance."
  );

  const faqs = [
    {
      q: "How often should tools be inspected?",
      a: "Before each use for obvious defects, with more formal inspections at set intervals depending on the tool and work environment.",
    },
    {
      q: "Do cordless tools need maintenance?",
      a: "Yes — batteries, chargers, and the tool itself all need regular checks and maintenance according to manufacturer guidelines.",
    },
    {
      q: "Should I repair tools myself?",
      a: "Only if you are trained and authorised; otherwise, send them to an approved repair centre to maintain safety and warranty.",
    },
    {
      q: "What should I do if I find a damaged tool on site?",
      a: "Remove it from service immediately, tag it as defective, and report it to the supervisor. Do not use damaged tools.",
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
            <span className="text-elec-yellow text-sm font-medium">Module 3 - Section 3.3.4</span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-white/5">
              <Search className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Tool Inspection and Maintenance
          </h1>
          <p className="text-white/70">
            Essential practices for safe, reliable tools and compliance with workplace safety regulations.
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
                <li>Daily inspection: check handles, casings, cables, insulation for damage.</li>
                <li>Regular maintenance: clean, lubricate, sharpen, calibrate as needed.</li>
                <li>Proper storage: dry conditions, protective cases, organised systems.</li>
                <li>PUWER compliance: formal inspections, records, defect reporting.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Cracked handles, frayed cables, blunt edges, corrosion signs.
                </li>
                <li>
                  <strong>Use:</strong> Remove damaged tools immediately - never compromise safety.
                </li>
                <li>
                  <strong>Check:</strong> Before each use, formal intervals, calibration dates.
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
            <li>Explain why tool inspection and maintenance are critical for safety and performance.</li>
            <li>Identify common signs of tool damage or wear.</li>
            <li>Carry out basic maintenance for hand tools and power tools.</li>
            <li>Apply correct storage and handling practices to prolong tool life.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content
          </h2>

          {/* Routine Inspection */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Search className="w-5 h-5" /> Routine Tool Inspection
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Hand Tools</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Visual Checks</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Check for cracked or split handles</li>
                        <li>Inspect cutting edges for wear or chips</li>
                        <li>Look for rust or corrosion on metal parts</li>
                        <li>Verify joints and moving parts are secure</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Insulated Tools</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Check insulation for nicks, cuts, or wear</li>
                        <li>Ensure VDE markings are visible and intact</li>
                        <li>Look for discolouration indicating heat damage</li>
                        <li>Test that insulation is firmly attached</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Power Tools</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Casing & Mechanical</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Check casings for cracks or loose fittings</li>
                        <li>Ensure guards and safety features operate</li>
                        <li>Test switches function correctly</li>
                        <li>Verify chuck or bit holders are secure</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Electrical Safety</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Inspect cables for cuts, fraying, or burn marks</li>
                        <li>Check plugs are intact and pins not bent</li>
                        <li>Ensure cable strain relief is working</li>
                        <li>Look for signs of overheating or arcing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* Signs of Damage */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Signs of Tool Damage or Wear
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Common Warning Signs</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-white mb-1">Performance Issues</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Blunt cutting edges or worn bits</li>
                      <li>Loose joints affecting accuracy</li>
                      <li>Reduced power or efficiency</li>
                      <li>Excessive vibration or noise</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Safety Concerns</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Rust or corrosion on metal parts</li>
                      <li>Damaged insulation or cables</li>
                      <li>Cracked or split components</li>
                      <li>Faulty switches or safety mechanisms</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
                <p className="font-medium mb-2">Test Equipment Specific</p>
                <ul className="list-disc pl-6 space-y-1 text-violet-200">
                  <li>Inaccurate readings compared to known standards</li>
                  <li>Failed self-checks or calibration tests</li>
                  <li>Damaged test leads or probes</li>
                  <li>Display problems or intermittent operation</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* Maintenance Practices */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Maintenance Practices
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Regular Cleaning</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">After Each Use</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Remove dust, dirt, and debris</li>
                        <li>Clean air vents on power tools</li>
                        <li>Wipe down handles and casings</li>
                        <li>Clear cutting edges of material buildup</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Deep Cleaning</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Disassemble where appropriate</li>
                        <li>Clean internal components safely</li>
                        <li>Use compressed air for dust removal</li>
                        <li>Apply protective coatings if recommended</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Mechanical Maintenance</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Lubrication</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Oil moving parts per manufacturer specs</li>
                        <li>Use correct lubricant type and quantity</li>
                        <li>Avoid over-lubrication attracting dirt</li>
                        <li>Regular lubrication schedule for heavy use</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Sharpening & Adjustment</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Maintain cutting edges on blades and chisels</li>
                        <li>Replace worn bits and blades promptly</li>
                        <li>Adjust tool settings for optimal performance</li>
                        <li>Calibrate test equipment to maintain accuracy</li>
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
              <p className="font-medium mb-2">Daily Site Practices</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Start each day with tool inspection before work begins</li>
                <li>Remove damaged tools from service immediately</li>
                <li>Report defects to supervisors and maintain site safety logs</li>
                <li>Use site tool inspection tags and tracking systems</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium mb-2">Professional Benefits</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Well-maintained tools improve work quality and efficiency</li>
                <li>Reduces downtime from tool failures and replacements</li>
                <li>Demonstrates professional competence to clients</li>
                <li>Ensures compliance with health and safety requirements</li>
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
                <p className="font-medium mb-2">Storage & Handling</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Store tools in dry, secure conditions away from moisture</li>
                  <li>Use toolboxes, racks, or foam inserts for protection</li>
                  <li>Separate insulated tools to avoid mix-ups</li>
                  <li>Keep blades and sharp tools in protective covers</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-2">Battery & Power Management</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Follow charging guidelines and avoid deep discharge</li>
                  <li>Store batteries at recommended temperature and charge</li>
                  <li>Regular PAT testing for 110V and 230V equipment</li>
                  <li>Maintain spare batteries for critical cordless tools</li>
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
                <li><strong>Using damaged insulated tools</strong> - Electric shock risk from compromised insulation</li>
                <li><strong>Continuing with cracked casings</strong> - Exposes internal wiring, creates shock hazard</li>
                <li><strong>Ignoring frayed cables</strong> - Risk of electrocution and tool failure</li>
                <li><strong>Skipping calibration</strong> - Inaccurate test results, compliance failures</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Performance Issues</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Poor storage conditions</strong> - Accelerated corrosion, premature failure</li>
                <li><strong>Inadequate cleaning</strong> - Dust buildup causes overheating and wear</li>
                <li><strong>Using blunt tools</strong> - Poor results, increased effort, safety risks</li>
                <li><strong>No maintenance records</strong> - Cannot demonstrate compliance or track issues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PUWER Context */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            <Shield className="w-5 h-5" /> PUWER & Regulatory Context
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
              <p className="font-medium mb-2">PUWER Requirements</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Regulation 5:</strong> Work equipment must be suitable and maintained</li>
                <li><strong>Regulation 6:</strong> Regular inspection and testing required</li>
                <li><strong>Regulation 22:</strong> Inspection records must be kept</li>
                <li><strong>Regulation 23:</strong> Defects must be remedied before continued use</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
              <p className="font-medium mb-2">Compliance Obligations</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Maintain tool register for company-owned equipment</li>
                <li>Record inspection dates, defects found, and maintenance performed</li>
                <li>Ensure competent persons carry out inspections</li>
                <li>Remove defective equipment from service immediately</li>
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
            <p className="font-medium mb-2">Scenario: Cracked SDS Drill Causes Site Shutdown</p>
            <p className="text-sm mb-4">
              An electrician on a commercial site used a damaged SDS drill with a cracked casing. The crack exposed internal wiring,
              which caused a short circuit when the tool contacted metal conduit. The incident led to a site safety shutdown.
              Routine inspection would have identified the defect before use.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Consequences</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Site safety shutdown and investigation</li>
                  <li>Potential injury to the electrician</li>
                  <li>Lost productivity and project delays</li>
                  <li>Possible HSE enforcement action</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-300 mb-1">Prevention Measures</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Daily visual inspection before use</li>
                  <li>Immediate removal of damaged tools</li>
                  <li>Proper defect reporting systems</li>
                  <li>Regular formal tool inspections</li>
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
              Regular inspection and maintenance of tools are essential for safety, compliance, and long service life.
              By cleaning, storing, and repairing tools correctly, electricians can work more efficiently and avoid
              unnecessary downtime or hazards.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-green-300 mb-2">Key Benefits</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Prevents accidents and ensures electrical safety</li>
                  <li>Maintains tool performance and extends service life</li>
                  <li>Ensures compliance with PUWER regulations</li>
                  <li>Reduces downtime and replacement costs</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-elec-yellow mb-2">Essential Points</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Inspect before each use and at formal intervals</li>
                  <li>Remove damaged tools from service immediately</li>
                  <li>Maintain records for compliance and tracking</li>
                  <li>Proper storage prevents premature deterioration</li>
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
                <li>Inspect tools before each use</li>
                <li>Clean tools after every work session</li>
                <li>Store tools in dry, organised conditions</li>
                <li>Report damaged tools immediately</li>
                <li>Keep maintenance records up to date</li>
                <li>Follow manufacturer maintenance guidelines</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> DON'T
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Use tools with damaged insulation</li>
                <li>Continue using visibly damaged tools</li>
                <li>Skip cleaning to save time</li>
                <li>Store tools in damp conditions</li>
                <li>Attempt repairs beyond your competence</li>
                <li>Ignore calibration requirements</li>
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
                <p className="font-medium mb-2">Daily Inspection Checklist</p>
                <ul className="space-y-1">
                  <li>• <strong>Handles:</strong> No cracks or splits</li>
                  <li>• <strong>Insulation:</strong> No nicks or cuts</li>
                  <li>• <strong>Cables:</strong> No fraying or damage</li>
                  <li>• <strong>Casings:</strong> No cracks or loose parts</li>
                  <li>• <strong>Edges:</strong> Sharp and chip-free</li>
                  <li>• <strong>Operation:</strong> All functions work</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Maintenance Schedule</p>
                <ul className="space-y-1">
                  <li>• <strong>Daily:</strong> Clean and visual check</li>
                  <li>• <strong>Weekly:</strong> Deep clean and lubricate</li>
                  <li>• <strong>Monthly:</strong> Formal inspection</li>
                  <li>• <strong>Annually:</strong> Calibration check</li>
                  <li>• <strong>As needed:</strong> Sharpen, repair</li>
                  <li>• <strong>Immediately:</strong> Remove if damaged</li>
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
            <p><strong>PUWER 1998:</strong> Provision and Use of Work Equipment Regulations</p>
            <p><strong>HSE INDG291:</strong> Safe use of work equipment</p>
            <p><strong>BS EN 60900:</strong> Live working - Hand tools for use up to 1000V AC</p>
            <p><strong>GS38:</strong> Electrical test equipment for use by electricians</p>
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
            <Link to="../3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Test Equipment
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-5">
              Next: PPE Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section3_4;
