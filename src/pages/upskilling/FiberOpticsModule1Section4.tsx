import { ArrowLeft, ShieldCheck, CheckCircle, AlertTriangle, Eye, Flame, Trash2, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Health & Safety in Fibre Work - Fibre Optics Course";
const DESCRIPTION = "Learn essential safety practices for working with fibre optics including eye protection, fibre handling, chemical safety, and proper disposal procedures.";

const quickCheckQuestions = [
  {
    id: "fo-m1s4-qc1",
    question: "Why should you never look directly into the end of a fibre or connector?",
    options: ["It damages the fibre", "Invisible laser light can cause permanent eye damage", "It affects test readings", "The fibre might break"],
    correctIndex: 1,
    explanation: "Fibre optic systems use infrared light that is invisible but can cause permanent retinal damage. Always assume a fibre is 'live' unless verified."
  },
  {
    id: "fo-m1s4-qc2",
    question: "How should fibre off-cuts and cleaved ends be disposed of?",
    options: ["In regular waste bins", "In designated sharps containers", "Flushed with water", "Left on the work surface"],
    correctIndex: 1,
    explanation: "Fibre shards are extremely sharp and nearly invisible. They must be collected in designated containers to prevent skin penetration injuries."
  },
  {
    id: "fo-m1s4-qc3",
    question: "What type of PPE is essential when cleaving or handling bare fibre?",
    options: ["Steel-toe boots only", "Safety glasses and avoid touching eyes/skin", "No PPE required", "Hearing protection"],
    correctIndex: 1,
    explanation: "Safety glasses protect against fibre shards. Bare hands should avoid touching face as fibre fragments can embed in skin or eyes."
  }
];

const quizQuestions = [
  {
    question: "What class of laser is typically used in fibre optic communications?",
    options: ["Class 1 only", "Class 1, 2, 3A, 3B, or 4 depending on equipment", "Always Class 4", "Lasers are not used"],
    correctAnswer: 1
  },
  {
    question: "Isopropyl alcohol (IPA) used for connector cleaning requires:",
    options: ["No precautions", "Good ventilation and keeping away from ignition sources", "Wearing full hazmat suit", "Heating before use"],
    correctAnswer: 1
  },
  {
    question: "What should you do before working on any fibre link?",
    options: ["Nothing - fibre is safe", "Verify the link is not active/transmitting", "Test with your eye", "Cover the connector"],
    correctAnswer: 1
  },
  {
    question: "The black sticky pad used during fibre work is for:",
    options: ["Decoration", "Collecting fibre off-cuts safely", "Cleaning connectors", "Testing continuity"],
    correctAnswer: 1
  },
  {
    question: "Why is eating and drinking prohibited in fibre work areas?",
    options: ["To prevent spills on equipment", "Fibre shards could be ingested accidentally", "It's not prohibited", "To save time"],
    correctAnswer: 1
  },
  {
    question: "If a fibre shard penetrates the skin, you should:",
    options: ["Ignore it - it will dissolve", "Use tape to remove and seek medical attention if needed", "Push it deeper", "Wash with alcohol"],
    correctAnswer: 1
  },
  {
    question: "What indicates a fusion splicer is operating?",
    options: ["Nothing visible", "An electric arc which can cause eye damage if viewed", "Red light only", "Sound alone"],
    correctAnswer: 1
  },
  {
    question: "Fibre work areas should have:",
    options: ["Carpeted floors", "Good lighting and clean work surfaces", "No ventilation", "Dark conditions"],
    correctAnswer: 1
  },
  {
    question: "When using UV cure adhesive, protection is needed against:",
    options: ["Heat only", "UV light exposure during curing", "Loud noise", "Strong odours only"],
    correctAnswer: 1
  },
  {
    question: "The COSHH regulations apply to fibre work because:",
    options: ["They don't apply", "Cleaning chemicals and adhesives are hazardous substances", "Fibre is toxic", "COSHH is only for laboratories"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Is fibre optic light dangerous?",
    answer: "Yes, it can be. While some fibre links use low-power light, many use laser sources that can cause permanent eye damage. Infrared wavelengths (850nm, 1310nm, 1550nm) are invisible, so you won't know if light is present. Always treat every fibre as potentially live."
  },
  {
    question: "What happens if I get a fibre splinter?",
    answer: "Glass fibre shards are extremely thin and can embed in skin without being visible. Use sticky tape to attempt removal. If you cannot remove it or experience pain, seek medical attention. Do not rub the area as this can push it deeper."
  },
  {
    question: "Are there specific first aid requirements for fibre work?",
    answer: "Yes. First aid kits should include sterile eyewash, tweezers, magnifying glass, adhesive tape (for splinter removal), and information on local medical facilities. Eye injuries require immediate professional medical attention."
  },
  {
    question: "Can fibre work be done without formal training?",
    answer: "While basic awareness can be self-taught, professional fibre installation and termination requires proper training. Many employers and contracts mandate certified training. Safety training is essential regardless of skill level."
  },
  {
    question: "What's the risk from cleaning solvents?",
    answer: "Isopropyl alcohol (IPA) and other solvents are flammable and can cause eye/skin irritation. Use in well-ventilated areas, away from ignition sources. Some cleaning solutions require specific handling - check SDS (Safety Data Sheets)."
  },
  {
    question: "Do I need a permit to work with fibre optics?",
    answer: "Fibre installation itself doesn't require permits in most cases. However, working at height, in confined spaces, or with high-power lasers may require permits. Hot work permits may be needed if using heat shrink guns near flammable materials."
  }
];

const FiberOpticsModule1Section4 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 items-center px-4">
          <Link
            to="/electrical-upskilling/fiber-optics-module-1"
            className="flex items-center gap-2 text-gray-400 hover:text-elec-yellow transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Module 1</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 md:py-8 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-4">
            <ShieldCheck className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 1 • Section 4</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Health & Safety in Fibre Work</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Essential safety practices to protect yourself and others when working with fibre optic systems.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              Key hazards: invisible laser light (eye damage), glass fibre shards (skin/eye penetration),
              cleaning chemicals (flammable/irritant). Always verify fibre is dark before inspection,
              use sharps containers, wear safety glasses, and maintain clean work areas.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Golden Rules
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Never look into fibre ends</li>
              <li>• Collect all fibre off-cuts</li>
              <li>• No eating/drinking in work area</li>
              <li>• Wear safety glasses when cleaving</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Identify hazards specific to fibre optic work",
              "Apply correct eye safety procedures",
              "Handle and dispose of fibre safely",
              "Use chemicals and cleaning agents safely",
              "Maintain a safe fibre work environment",
              "Respond to fibre-related injuries"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 01: Optical Radiation Hazards */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">Optical Radiation Hazards</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The most serious hazard in fibre optic work is invisible laser light. Unlike visible light,
              infrared wavelengths used in fibre optics (850nm, 1310nm, 1550nm) cannot be seen but can
              cause permanent eye damage.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                CRITICAL: Eye Safety
              </h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>NEVER</strong> look directly into the end of a fibre, connector, or patch lead</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>NEVER</strong> view active fibres with magnifying equipment (concentrates beam)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>ALWAYS</strong> assume fibres are live until verified with power meter</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>ALWAYS</strong> cap unused connectors and fibre ends</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Laser Safety Classifications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 border-b border-gray-700 pb-2">
                  <span className="text-green-400 font-bold w-16">Class 1</span>
                  <span>Safe under normal conditions. Most consumer fibre equipment. Eye-safe but don't stare.</span>
                </div>
                <div className="flex items-start gap-3 border-b border-gray-700 pb-2">
                  <span className="text-yellow-400 font-bold w-16">Class 2</span>
                  <span>Visible light only. Blink reflex provides protection. Brief exposure safe.</span>
                </div>
                <div className="flex items-start gap-3 border-b border-gray-700 pb-2">
                  <span className="text-orange-400 font-bold w-16">Class 3R</span>
                  <span>Low risk but avoid direct eye exposure. Some test equipment.</span>
                </div>
                <div className="flex items-start gap-3 border-b border-gray-700 pb-2">
                  <span className="text-red-400 font-bold w-16">Class 3B</span>
                  <span>Hazardous to eyes. Protective eyewear required. Some OTDR sources.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold w-16">Class 4</span>
                  <span>Hazardous to eyes and skin. High-power amplified systems. Strict controls required.</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Safe Inspection Procedure</h4>
              <ol className="text-sm space-y-1">
                <li>1. Verify link is not active (check with both ends)</li>
                <li>2. Use fibre optic power meter to confirm no light present</li>
                <li>3. Only then use inspection microscope if needed</li>
                <li>4. Never use standard magnifiers on potentially live fibres</li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Handling Glass Fibre */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Handling Glass Fibre Safely</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Glass optical fibres are extremely thin (125 micrometres) and when cleaved or broken,
              create needle-sharp fragments that can easily penetrate skin and are nearly invisible.
            </p>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Fibre Shard Hazards</h4>
              <ul className="text-sm space-y-2">
                <li>• Shards can penetrate skin painlessly and become embedded</li>
                <li>• Fragments are nearly invisible to the naked eye</li>
                <li>• Can cause infection if not removed</li>
                <li>• Eye penetration is a serious risk</li>
                <li>• Ingestion risk if eating/drinking in work area</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Safe Fibre Handling Practices</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">During Work</h5>
                  <ul className="space-y-1">
                    <li>• Wear safety glasses when cleaving</li>
                    <li>• Use black working mat (makes fibres visible)</li>
                    <li>• Keep hands away from face</li>
                    <li>• Don't let fibres drop on floor</li>
                    <li>• Work in well-lit area</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Collection Methods</h5>
                  <ul className="space-y-1">
                    <li>• Use sticky collection pad on work surface</li>
                    <li>• Place cleaved ends directly in sharps container</li>
                    <li>• Tape can pick up loose fibres</li>
                    <li>• Check clothing before leaving area</li>
                    <li>• Clean work surface after each job</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Disposal Requirements
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Use designated fibre waste containers (sharps-style)</li>
                <li>• Never put fibre in regular waste bins</li>
                <li>• Seal containers when 3/4 full</li>
                <li>• Label containers as "Glass Fibre Waste"</li>
                <li>• Arrange appropriate disposal (check local regulations)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Chemical Safety */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">Chemical Safety</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Fibre optic work involves various chemicals for cleaning, adhesives for termination, and
              solvents for cable preparation. Understanding these hazards is essential.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Common Chemicals and Hazards</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h5 className="font-medium text-blue-400">Isopropyl Alcohol (IPA)</h5>
                  <p className="text-sm mt-1">
                    <span className="text-orange-400">Hazards:</span> Flammable, eye/skin irritant, vapour inhalation.
                    <br /><span className="text-green-400">Controls:</span> Good ventilation, no ignition sources, safety glasses.
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h5 className="font-medium text-purple-400">Epoxy Adhesives</h5>
                  <p className="text-sm mt-1">
                    <span className="text-orange-400">Hazards:</span> Skin sensitiser, eye irritant, some are exothermic when curing.
                    <br /><span className="text-green-400">Controls:</span> Gloves, safety glasses, good ventilation, avoid skin contact.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h5 className="font-medium text-yellow-400">UV Cure Adhesives</h5>
                  <p className="text-sm mt-1">
                    <span className="text-orange-400">Hazards:</span> UV light exposure during curing, skin sensitiser.
                    <br /><span className="text-green-400">Controls:</span> UV blocking glasses, avoid looking at UV source, gloves.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h5 className="font-medium text-green-400">Index Matching Gel</h5>
                  <p className="text-sm mt-1">
                    <span className="text-orange-400">Hazards:</span> Generally low hazard but avoid ingestion and eye contact.
                    <br /><span className="text-green-400">Controls:</span> Basic hygiene, wash hands after use.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  Fire Prevention
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Store flammables in designated cabinets</li>
                  <li>• No smoking in fibre work areas</li>
                  <li>• Keep away from heat sources</li>
                  <li>• Fire extinguisher readily available</li>
                  <li>• Limit quantities in work area</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">COSHH Requirements</h4>
                <ul className="text-sm space-y-1">
                  <li>• Obtain SDS for all chemicals used</li>
                  <li>• Assess risks before use</li>
                  <li>• Implement control measures</li>
                  <li>• Provide information/training</li>
                  <li>• Monitor exposure where required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 04: Work Environment */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">Safe Work Environment</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Creating and maintaining a safe work environment prevents accidents and protects both
              the technician and anyone else who may enter the area.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Work Area Requirements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Physical Environment</h5>
                  <ul className="space-y-1">
                    <li>• Good lighting (see fibre clearly)</li>
                    <li>• Clean, uncluttered work surface</li>
                    <li>• Adequate ventilation</li>
                    <li>• Stable work bench/table</li>
                    <li>• Anti-static measures where needed</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Safety Equipment</h5>
                  <ul className="space-y-1">
                    <li>• First aid kit (including eyewash)</li>
                    <li>• Fire extinguisher</li>
                    <li>• Safety glasses available</li>
                    <li>• Fibre waste containers</li>
                    <li>• Cleaning supplies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Work Area Rules</h4>
              <ul className="text-sm space-y-1">
                <li>✗ <strong>No eating or drinking</strong> in fibre work areas</li>
                <li>✗ <strong>No loose clothing</strong> that could catch fibres</li>
                <li>✗ <strong>No contact lenses</strong> preferred (particles can get trapped)</li>
                <li>✓ <strong>Wash hands</strong> before leaving work area</li>
                <li>✓ <strong>Clean surfaces</strong> after completing work</li>
                <li>✓ <strong>Secure equipment</strong> when leaving unattended</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Additional Hazards to Consider</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Working at height:</strong> Ceiling installations, ladder safety, fall protection</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Confined spaces:</strong> Manholes, ceiling voids - may require permits</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Electrical:</strong> Though fibre is non-conductive, associated equipment is electrical</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Manual handling:</strong> Cable drums, equipment cases, pulling cables</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: First Aid and Incidents */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">05</span>
            </div>
            <h2 className="text-xl font-semibold">First Aid and Incident Response</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Despite precautions, incidents can occur. Knowing how to respond quickly and correctly
              can minimise harm and aid recovery.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Emergency Responses
              </h4>
              <div className="space-y-3 text-sm">
                <div className="border-b border-gray-700 pb-2">
                  <h5 className="font-medium text-white">Eye Exposure to Laser Light</h5>
                  <p className="mt-1">Seek immediate medical attention. Do not rub eyes. Note the wavelength and power if known. This is a medical emergency.</p>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <h5 className="font-medium text-white">Fibre in Eye</h5>
                  <p className="mt-1">Do NOT rub. Flush gently with sterile eyewash. Seek immediate medical attention. Cover eye loosely if transport needed.</p>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <h5 className="font-medium text-white">Fibre in Skin</h5>
                  <p className="mt-1">Use adhesive tape pressed gently over area to remove. If visible, remove with tweezers. If embedded or painful, seek medical attention.</p>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <h5 className="font-medium text-white">Chemical Splash - Eyes</h5>
                  <p className="mt-1">Flush immediately with eyewash for at least 15 minutes. Seek medical attention. Bring SDS for the chemical.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Chemical Splash - Skin</h5>
                  <p className="mt-1">Wash affected area with plenty of water. Remove contaminated clothing. Seek medical advice if irritation persists.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Incident Reporting</h4>
              <ul className="text-sm space-y-1">
                <li>• Report all incidents, however minor</li>
                <li>• Complete incident report forms</li>
                <li>• Investigate root causes</li>
                <li>• RIDDOR reporting if applicable (UK)</li>
                <li>• Review and improve procedures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Essential PPE for Fibre Work</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Always Required</h5>
                  <ul className="space-y-1">
                    <li>• Safety glasses (during cleaving/handling)</li>
                    <li>• Appropriate work clothing</li>
                    <li>• Enclosed footwear</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Task-Specific</h5>
                  <ul className="space-y-1">
                    <li>• Laser safety glasses (high-power systems)</li>
                    <li>• Chemical-resistant gloves (epoxies)</li>
                    <li>• UV blocking glasses (UV cure)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">Pre-Work Safety Checklist</h4>
              <ul className="text-sm space-y-1">
                <li>□ Work area clean and well-lit</li>
                <li>□ Safety glasses available</li>
                <li>□ Fibre waste container ready</li>
                <li>□ First aid kit accessible</li>
                <li>□ Chemicals properly stored</li>
                <li>□ Fire extinguisher nearby</li>
                <li>□ Link verified as dark (not transmitting)</li>
                <li>□ Ventilation adequate</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-800 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  <span className="text-elec-yellow transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Safety Essentials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Key Hazards</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Invisible laser light (eye damage)</li>
                  <li>• Glass fibre shards (skin/eye)</li>
                  <li>• Flammable cleaning solvents</li>
                  <li>• Adhesive chemicals</li>
                  <li>• UV curing light</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Essential Controls</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Never look into fibre ends</li>
                  <li>• Use sharps containers</li>
                  <li>• Safety glasses when cleaving</li>
                  <li>• Good ventilation</li>
                  <li>• No eating/drinking in work area</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 4 Quiz: Health & Safety in Fibre Work"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Module Complete */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-elec-yellow/10 rounded-xl p-6 border border-green-500/30 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Module 1 Complete!</h3>
            <p className="text-gray-300 mb-4">
              You've completed the Introduction to Fibre Optics module. You now understand the fundamentals
              of fibre technology, its advantages, applications, and essential safety practices.
            </p>
            <Link to="/electrical-upskilling/fiber-optics-module-2">
              <Button className="bg-green-500 text-white hover:bg-green-600 touch-manipulation min-h-[44px]">
                Continue to Module 2: Fibre Types and Connectors
              </Button>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="/electrical-upskilling/fiber-optics-module-1-section-3">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Commercial & Industrial
            </Button>
          </Link>
          <Link to="/electrical-upskilling/fiber-optics-module-2">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation min-h-[44px]">
              Next Module: Fibre Types
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule1Section4;
