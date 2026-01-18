import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    id: 1,
    question: "What class of laser is typically used in fibre optic communications?",
    options: ["Class 1 only", "Class 1, 2, 3A, 3B, or 4 depending on equipment", "Always Class 4", "Lasers are not used"],
    correctAnswer: 1,
    explanation: "Different fibre equipment uses different laser classes. Know what you're working with and follow appropriate precautions."
  },
  {
    id: 2,
    question: "Isopropyl alcohol (IPA) used for connector cleaning requires:",
    options: ["No precautions", "Good ventilation and keeping away from ignition sources", "Wearing full hazmat suit", "Heating before use"],
    correctAnswer: 1,
    explanation: "IPA is flammable and should be used with good ventilation and away from ignition sources."
  },
  {
    id: 3,
    question: "What should you do before working on any fibre link?",
    options: ["Nothing - fibre is safe", "Verify the link is not active/transmitting", "Test with your eye", "Cover the connector"],
    correctAnswer: 1,
    explanation: "Always verify a link is not active using a power meter before inspection or work."
  },
  {
    id: 4,
    question: "The black sticky pad used during fibre work is for:",
    options: ["Decoration", "Collecting fibre off-cuts safely", "Cleaning connectors", "Testing continuity"],
    correctAnswer: 1,
    explanation: "The sticky pad safely collects fibre off-cuts and cleaved ends, preventing them from scattering."
  },
  {
    id: 5,
    question: "Why is eating and drinking prohibited in fibre work areas?",
    options: ["To prevent spills on equipment", "Fibre shards could be ingested accidentally", "It's not prohibited", "To save time"],
    correctAnswer: 1,
    explanation: "Microscopic fibre shards could contaminate food and drink and be accidentally ingested."
  },
  {
    id: 6,
    question: "If a fibre shard penetrates the skin, you should:",
    options: ["Ignore it - it will dissolve", "Use tape to remove and seek medical attention if needed", "Push it deeper", "Wash with alcohol"],
    correctAnswer: 1,
    explanation: "Use adhesive tape to attempt removal. If you cannot remove it or experience pain, seek medical attention."
  },
  {
    id: 7,
    question: "What indicates a fusion splicer is operating?",
    options: ["Nothing visible", "An electric arc which can cause eye damage if viewed", "Red light only", "Sound alone"],
    correctAnswer: 1,
    explanation: "Fusion splicers create an electric arc that can damage eyes. Never look directly at the arc."
  },
  {
    id: 8,
    question: "Fibre work areas should have:",
    options: ["Carpeted floors", "Good lighting and clean work surfaces", "No ventilation", "Dark conditions"],
    correctAnswer: 1,
    explanation: "Good lighting helps you see fibres clearly, and clean surfaces prevent contamination and help locate dropped fibres."
  },
  {
    id: 9,
    question: "When using UV cure adhesive, protection is needed against:",
    options: ["Heat only", "UV light exposure during curing", "Loud noise", "Strong odours only"],
    correctAnswer: 1,
    explanation: "UV light used to cure adhesives can damage eyes. Use UV-blocking glasses."
  },
  {
    id: 10,
    question: "The COSHH regulations apply to fibre work because:",
    options: ["They don't apply", "Cleaning chemicals and adhesives are hazardous substances", "Fibre is toxic", "COSHH is only for laboratories"],
    correctAnswer: 1,
    explanation: "Chemicals used in fibre work (IPA, adhesives, etc.) are hazardous substances under COSHH."
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

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health & Safety in Fibre Work
          </h1>
          <p className="text-white/80">
            Essential safety practices to protect yourself and others when working with fibre optic systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Eye:</strong> Never look into fibre ends (laser damage)</li>
              <li><strong>Skin:</strong> Fibre shards penetrate and embed</li>
              <li><strong>Chemical:</strong> IPA flammable, adhesives irritant</li>
              <li><strong>Disposal:</strong> Sharps containers for fibre waste</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Golden Rules</p>
            <ul className="text-sm text-white space-y-1">
              <li>Never look into fibre ends</li>
              <li>Collect all fibre off-cuts</li>
              <li>No eating/drinking in work area</li>
              <li>Wear safety glasses when cleaving</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify hazards specific to fibre optic work",
              "Apply correct eye safety procedures",
              "Handle and dispose of fibre safely",
              "Use chemicals and cleaning agents safely",
              "Maintain a safe fibre work environment",
              "Respond to fibre-related injuries"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Optical Radiation Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most serious hazard in fibre optic work is invisible laser light. Unlike visible light,
              infrared wavelengths used in fibre optics (850nm, 1310nm, 1550nm) cannot be seen but can
              cause permanent eye damage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">CRITICAL: Eye Safety</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>NEVER</strong> look directly into the end of a fibre, connector, or patch lead</li>
                <li><strong>NEVER</strong> view active fibres with magnifying equipment (concentrates beam)</li>
                <li><strong>ALWAYS</strong> assume fibres are live until verified with power meter</li>
                <li><strong>ALWAYS</strong> cap unused connectors and fibre ends</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Laser Safety Classifications:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-green-400">Class 1:</strong> Safe under normal conditions. Most consumer fibre equipment.</li>
                <li><strong className="text-yellow-400">Class 2:</strong> Visible light only. Blink reflex provides protection.</li>
                <li><strong className="text-orange-400">Class 3R:</strong> Low risk but avoid direct eye exposure. Some test equipment.</li>
                <li><strong className="text-red-400">Class 3B:</strong> Hazardous to eyes. Protective eyewear required. Some OTDR sources.</li>
                <li><strong className="text-red-500">Class 4:</strong> Hazardous to eyes and skin. High-power amplified systems.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Safe Inspection Procedure</p>
              <ul className="text-sm text-white space-y-1">
                <li>1. Verify link is not active (check with both ends)</li>
                <li>2. Use fibre optic power meter to confirm no light present</li>
                <li>3. Only then use inspection microscope if needed</li>
                <li>4. Never use standard magnifiers on potentially live fibres</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Handling Glass Fibre Safely
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Glass optical fibres are extremely thin (125 micrometres) and when cleaved or broken,
              create needle-sharp fragments that can easily penetrate skin and are nearly invisible.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Fibre Shard Hazards</p>
              <ul className="text-sm text-white space-y-1">
                <li>Shards can penetrate skin painlessly and become embedded</li>
                <li>Fragments are nearly invisible to the naked eye</li>
                <li>Can cause infection if not removed</li>
                <li>Eye penetration is a serious risk</li>
                <li>Ingestion risk if eating/drinking in work area</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">During Work</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wear safety glasses when cleaving</li>
                  <li>Use black working mat (makes fibres visible)</li>
                  <li>Keep hands away from face</li>
                  <li>Don't let fibres drop on floor</li>
                  <li>Work in well-lit area</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Collection Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use sticky collection pad on work surface</li>
                  <li>Place cleaved ends directly in sharps container</li>
                  <li>Tape can pick up loose fibres</li>
                  <li>Check clothing before leaving area</li>
                  <li>Clean work surface after each job</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Disposal Requirements</p>
              <ul className="text-sm text-white space-y-1">
                <li>Use designated fibre waste containers (sharps-style)</li>
                <li>Never put fibre in regular waste bins</li>
                <li>Seal containers when 3/4 full</li>
                <li>Label containers as "Glass Fibre Waste"</li>
                <li>Arrange appropriate disposal (check local regulations)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Chemical Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre optic work involves various chemicals for cleaning, adhesives for termination, and
              solvents for cable preparation. Understanding these hazards is essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Chemicals and Hazards:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Isopropyl Alcohol (IPA):</strong> Flammable, eye/skin irritant, vapour inhalation. Use good ventilation, no ignition sources, safety glasses.</li>
                <li><strong className="text-elec-yellow">Epoxy Adhesives:</strong> Skin sensitiser, eye irritant, exothermic when curing. Use gloves, safety glasses, good ventilation.</li>
                <li><strong className="text-elec-yellow">UV Cure Adhesives:</strong> UV light exposure during curing, skin sensitiser. Use UV blocking glasses, avoid looking at UV source.</li>
                <li><strong className="text-elec-yellow">Index Matching Gel:</strong> Generally low hazard but avoid ingestion and eye contact. Basic hygiene, wash hands after use.</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm font-medium text-red-400 mb-2">Fire Prevention</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Store flammables in designated cabinets</li>
                  <li>No smoking in fibre work areas</li>
                  <li>Keep away from heat sources</li>
                  <li>Fire extinguisher readily available</li>
                  <li>Limit quantities in work area</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">COSHH Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Obtain SDS for all chemicals used</li>
                  <li>Assess risks before use</li>
                  <li>Implement control measures</li>
                  <li>Provide information/training</li>
                  <li>Monitor exposure where required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safe Work Environment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Creating and maintaining a safe work environment prevents accidents and protects both
              the technician and anyone else who may enter the area.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Physical Environment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Good lighting (see fibre clearly)</li>
                  <li>Clean, uncluttered work surface</li>
                  <li>Adequate ventilation</li>
                  <li>Stable work bench/table</li>
                  <li>Anti-static measures where needed</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Safety Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>First aid kit (including eyewash)</li>
                  <li>Fire extinguisher</li>
                  <li>Safety glasses available</li>
                  <li>Fibre waste containers</li>
                  <li>Cleaning supplies</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Work Area Rules</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>No eating or drinking</strong> in fibre work areas</li>
                <li><strong>No loose clothing</strong> that could catch fibres</li>
                <li><strong>No contact lenses</strong> preferred (particles can get trapped)</li>
                <li><strong>Wash hands</strong> before leaving work area</li>
                <li><strong>Clean surfaces</strong> after completing work</li>
                <li><strong>Secure equipment</strong> when leaving unattended</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Additional Hazards to Consider:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Working at height:</strong> Ceiling installations, ladder safety, fall protection</li>
                <li><strong>Confined spaces:</strong> Manholes, ceiling voids - may require permits</li>
                <li><strong>Electrical:</strong> Though fibre is non-conductive, associated equipment is electrical</li>
                <li><strong>Manual handling:</strong> Cable drums, equipment cases, pulling cables</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            First Aid and Incident Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Despite precautions, incidents can occur. Knowing how to respond quickly and correctly
              can minimise harm and aid recovery.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Emergency Responses</p>
              <ul className="text-sm text-white space-y-2">
                <li><strong>Eye Exposure to Laser Light:</strong> Seek immediate medical attention. Do not rub eyes. Note the wavelength and power if known. This is a medical emergency.</li>
                <li><strong>Fibre in Eye:</strong> Do NOT rub. Flush gently with sterile eyewash. Seek immediate medical attention. Cover eye loosely if transport needed.</li>
                <li><strong>Fibre in Skin:</strong> Use adhesive tape pressed gently over area to remove. If visible, remove with tweezers. If embedded or painful, seek medical attention.</li>
                <li><strong>Chemical Splash - Eyes:</strong> Flush immediately with eyewash for at least 15 minutes. Seek medical attention. Bring SDS for the chemical.</li>
                <li><strong>Chemical Splash - Skin:</strong> Wash affected area with plenty of water. Remove contaminated clothing. Seek medical advice if irritation persists.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Incident Reporting</p>
              <ul className="text-sm text-white space-y-1">
                <li>Report all incidents, however minor</li>
                <li>Complete incident report forms</li>
                <li>Investigate root causes</li>
                <li>RIDDOR reporting if applicable (UK)</li>
                <li>Review and improve procedures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential PPE for Fibre Work</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Always Required</p>
                  <ul className="text-sm text-white space-y-0.5 ml-4">
                    <li>Safety glasses (during cleaving/handling)</li>
                    <li>Appropriate work clothing</li>
                    <li>Enclosed footwear</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Task-Specific</p>
                  <ul className="text-sm text-white space-y-0.5 ml-4">
                    <li>Laser safety glasses (high-power systems)</li>
                    <li>Chemical-resistant gloves (epoxies)</li>
                    <li>UV blocking glasses (UV cure)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Work Safety Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Work area clean and well-lit</li>
                <li>Safety glasses available</li>
                <li>Fibre waste container ready</li>
                <li>First aid kit accessible</li>
                <li>Chemicals properly stored</li>
                <li>Fire extinguisher nearby</li>
                <li>Link verified as dark (not transmitting)</li>
                <li>Ventilation adequate</li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Safety Essentials</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Key Hazards</p>
                <ul className="space-y-0.5">
                  <li>Invisible laser light (eye damage)</li>
                  <li>Glass fibre shards (skin/eye)</li>
                  <li>Flammable cleaning solvents</li>
                  <li>Adhesive chemicals</li>
                  <li>UV curing light</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Essential Controls</p>
                <ul className="space-y-0.5">
                  <li>Never look into fibre ends</li>
                  <li>Use sharps containers</li>
                  <li>Safety glasses when cleaving</li>
                  <li>Good ventilation</li>
                  <li>No eating/drinking in work area</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Module Complete */}
        <section className="mb-10 p-6 rounded-lg bg-elec-yellow/5 border border-elec-yellow/30 text-center">
          <CheckCircle className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Module 1 Complete!</h3>
          <p className="text-white/80 mb-4">
            You've completed the Introduction to Fibre Optics module. You now understand the fundamentals
            of fibre technology, its advantages, applications, and essential safety practices.
          </p>
          <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../../module-2">
              Continue to Module 2: Fibre Types and Connectors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Commercial & Industrial
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../../module-2">
              Next Module: Fibre Types
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule1Section4;
