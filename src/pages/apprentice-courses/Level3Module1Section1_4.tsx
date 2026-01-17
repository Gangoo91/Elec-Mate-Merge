/**
 * Level 3 Module 1 Section 1.4 - COSHH 2002
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "COSHH 2002 - Control of Substances Hazardous to Health - Level 3 Module 1 Section 1.4";
const DESCRIPTION = "Master COSHH regulations for electrical work. Learn about hazardous substances electricians encounter, COSHH assessments, hierarchy of controls, and Safety Data Sheets.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the FIRST priority in the hierarchy of control measures under COSHH?",
    options: [
      "Provide PPE to workers",
      "Improve ventilation",
      "Eliminate the hazardous substance entirely",
      "Reduce exposure time"
    ],
    correctIndex: 2,
    explanation: "The hierarchy of controls prioritises ELIMINATION first - removing the hazardous substance entirely is the most effective control measure. PPE is the last resort when other controls are not reasonably practicable."
  },
  {
    id: "check-2",
    question: "What document must suppliers provide with hazardous substances?",
    options: [
      "An instruction manual",
      "A Safety Data Sheet (SDS)",
      "A warranty card",
      "A certificate of conformity"
    ],
    correctIndex: 1,
    explanation: "Suppliers must provide a Safety Data Sheet (SDS) with hazardous substances. The SDS contains critical information about hazards, safe handling, storage, emergency procedures, and PPE requirements."
  },
  {
    id: "check-3",
    question: "Which gas used in some high-voltage switchgear is a health and environmental hazard?",
    options: [
      "Nitrogen",
      "Carbon dioxide",
      "SF6 (Sulphur hexafluoride)",
      "Oxygen"
    ],
    correctIndex: 2,
    explanation: "SF6 (Sulphur hexafluoride) is used as an insulating gas in high-voltage switchgear. It is a potent greenhouse gas and can cause asphyxiation in enclosed spaces. Special procedures are required when working with SF6 equipment."
  },
  {
    id: "check-4",
    question: "How often should COSHH assessments be reviewed?",
    options: [
      "Only when an incident occurs",
      "Every 5 years",
      "Regularly, and whenever circumstances change",
      "Only when new substances are introduced"
    ],
    correctIndex: 2,
    explanation: "COSHH assessments must be reviewed regularly and whenever there is reason to believe they may no longer be valid - such as changes in work practices, new substances, or new information about hazards."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does COSHH stand for?",
    options: [
      "Control of Safety and Health Hazards",
      "Control of Substances Hazardous to Health",
      "Careful Operation of Substances and Health Hazards",
      "Control of Storage and Handling of Hazards"
    ],
    correctAnswer: 1,
    explanation: "COSHH stands for Control of Substances Hazardous to Health Regulations 2002, which requires employers to control substances that can harm workers' health."
  },
  {
    id: 2,
    question: "Which of the following is NOT covered by COSHH regulations?",
    options: [
      "Solvents and cleaning chemicals",
      "Asbestos (covered by separate regulations)",
      "Dust from drilling",
      "Fumes from soldering"
    ],
    correctAnswer: 1,
    explanation: "Asbestos has its own specific regulations (Control of Asbestos Regulations 2012) and is not covered by COSHH. However, asbestos awareness is still essential for electricians."
  },
  {
    id: 3,
    question: "What is the correct order of the hierarchy of control measures?",
    options: [
      "PPE, Engineering controls, Elimination, Substitution",
      "Elimination, Substitution, Engineering controls, Administrative controls, PPE",
      "Substitution, PPE, Elimination, Engineering controls",
      "Administrative controls, PPE, Elimination, Substitution"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy is: Elimination, Substitution, Engineering controls, Administrative controls, PPE. This prioritises removing the hazard over protecting workers from it."
  },
  {
    id: 4,
    question: "What information does a Safety Data Sheet (SDS) provide?",
    options: [
      "Only the product price",
      "Hazards, safe handling, storage, emergency procedures, and PPE requirements",
      "Just the chemical name",
      "Only first aid information"
    ],
    correctAnswer: 1,
    explanation: "An SDS provides comprehensive information including hazard identification, composition, first aid measures, firefighting measures, handling and storage, exposure controls, physical properties, and disposal considerations."
  },
  {
    id: 5,
    question: "Which hazardous substance might electricians encounter when working on older installations?",
    options: [
      "Only modern cable insulation",
      "Lead-based solder, PCBs in older capacitors, asbestos in old cable routes",
      "No hazardous substances in older installations",
      "Only paint fumes"
    ],
    correctAnswer: 1,
    explanation: "Older installations may contain lead-based solder, PCBs (polychlorinated biphenyls) in capacitors and transformers, and asbestos in cable routes, flash guards, and distribution board backing."
  },
  {
    id: 6,
    question: "What should you do FIRST if you suspect asbestos-containing materials during electrical work?",
    options: [
      "Continue working carefully",
      "Stop work immediately and report to supervisor",
      "Remove the material yourself",
      "Cover it with plastic sheeting"
    ],
    correctAnswer: 1,
    explanation: "If asbestos is suspected, STOP work immediately, do not disturb the material, and report to your supervisor. Only licensed contractors can remove most asbestos-containing materials."
  },
  {
    id: 7,
    question: "What type of exposure monitoring might be required under COSHH?",
    options: [
      "Only temperature monitoring",
      "Air monitoring and/or health surveillance depending on the substance",
      "No monitoring is ever required",
      "Only noise level monitoring"
    ],
    correctAnswer: 1,
    explanation: "COSHH may require air monitoring to measure exposure levels and health surveillance (medical checks) for workers exposed to certain substances. This depends on the substance and exposure risk."
  },
  {
    id: 8,
    question: "How should empty containers of hazardous substances be treated?",
    options: [
      "Thrown in normal waste",
      "Treated as hazardous waste - residues may remain",
      "Reused for any purpose",
      "Left on site for others to dispose of"
    ],
    correctAnswer: 1,
    explanation: "Empty containers may still contain hazardous residues and vapours. They must be treated as hazardous waste and disposed of properly according to the SDS and local regulations."
  },
  {
    id: 9,
    question: "What health effects can soldering flux fumes cause?",
    options: [
      "No health effects",
      "Occupational asthma and respiratory irritation",
      "Only minor eye irritation",
      "Only skin rashes"
    ],
    correctAnswer: 1,
    explanation: "Soldering flux fumes, particularly from rosin-based fluxes, can cause occupational asthma and respiratory sensitisation. Adequate ventilation or fume extraction is essential when soldering."
  },
  {
    id: 10,
    question: "Under COSHH, who is responsible for conducting risk assessments?",
    options: [
      "Individual workers only",
      "The employer",
      "The HSE",
      "The substance manufacturer"
    ],
    correctAnswer: 1,
    explanation: "The employer is responsible for conducting COSHH risk assessments. This includes identifying hazardous substances, assessing exposure risks, and implementing appropriate controls."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What hazardous substances do electricians commonly encounter?",
    answer: "Common substances include: solvents and degreasers, cable lubricants, soldering flux fumes, dust from drilling (especially in older buildings), SF6 gas in HV switchgear, lead solder in older installations, and potentially asbestos in older buildings."
  },
  {
    question: "Do I need to read the Safety Data Sheet for every substance I use?",
    answer: "You should be familiar with the SDS for any hazardous substance you work with. The key sections to know are hazard identification, safe handling procedures, PPE requirements, and first aid measures. Your employer should provide training on substances you use regularly."
  },
  {
    question: "What should I do if I feel unwell after exposure to a substance?",
    answer: "Stop work immediately and move to fresh air if appropriate. Report the incident to your supervisor. Seek medical attention if symptoms persist. The incident should be recorded, and the COSHH assessment reviewed."
  },
  {
    question: "Can I refuse to work with a hazardous substance?",
    answer: "If you believe the controls are inadequate or you haven't received proper training, you should raise concerns with your supervisor. Employers must provide adequate information, training, and controls before requiring work with hazardous substances."
  },
  {
    question: "Is lead solder still used, and is it a COSHH concern?",
    answer: "Lead-free solder is now standard for most applications. However, lead solder may be found in older installations and some specialist applications. Lead is a COSHH substance - avoid skin contact and inhalation of fumes, wash hands thoroughly after handling."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            COSHH 2002
          </h1>
          <p className="text-white/80">
            Control of Substances Hazardous to Health Regulations
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Control exposure to hazardous substances at work</li>
              <li><strong>Hierarchy:</strong> Eliminate, Substitute, Engineer, Administrate, PPE</li>
              <li><strong>Assessment:</strong> Identify hazards, assess risks, implement controls</li>
              <li><strong>SDS:</strong> Safety Data Sheets provide essential substance information</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Hazard symbols, SDS documents, COSHH assessments, warning labels</li>
              <li><strong>Use:</strong> Read SDS before use, follow controls, wear correct PPE</li>
              <li><strong>Apply:</strong> Solvents, flux fumes, drilling dust, cable lubricants</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and scope of COSHH regulations",
              "Identify hazardous substances electricians commonly encounter",
              "Explain the hierarchy of control measures",
              "Describe the role and content of Safety Data Sheets",
              "Apply COSHH requirements in practical electrical work",
              "Recognise when specialist controls are required (asbestos, SF6)"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is COSHH and Why Does it Matter?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers to control substances that are hazardous to health. This includes chemicals, products containing chemicals, fumes, dusts, vapours, mists, gases, and biological agents.
            </p>

            <p>
              For electricians, COSHH is directly relevant because the trade involves regular exposure to various substances - from solvents and degreasers to soldering flux fumes and drilling dust. Understanding COSHH helps you protect your health and work safely with these materials.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Substances Covered by COSHH:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Chemicals:</strong> Solvents, adhesives, cleaning agents, lubricants</li>
                <li><strong>Fumes:</strong> Soldering flux fumes, welding fumes</li>
                <li><strong>Dusts:</strong> Wood dust, silica dust from drilling masonry, general construction dust</li>
                <li><strong>Gases:</strong> SF6 in high-voltage switchgear</li>
                <li><strong>Biological agents:</strong> Bacteria in cooling systems, bird droppings in loft spaces</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Asbestos, lead, and radioactive substances have their own specific regulations, but awareness of these is still essential for electricians working in older buildings.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Hierarchy of Control Measures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              COSHH requires employers to prevent or adequately control exposure to hazardous substances. The hierarchy of controls prioritises the most effective measures:
            </p>

            <div className="my-6 space-y-3">
              <div className="p-3 rounded bg-green-500/10 border-l-2 border-green-500/50">
                <p className="text-sm font-medium text-green-400/80 mb-1">1. Elimination - Most Effective</p>
                <p className="text-sm text-white">Remove the hazardous substance entirely. Example: Use mechanical cable pulling instead of lubricant where possible.</p>
              </div>
              <div className="p-3 rounded bg-blue-500/10 border-l-2 border-blue-500/50">
                <p className="text-sm font-medium text-blue-400/80 mb-1">2. Substitution</p>
                <p className="text-sm text-white">Replace with a less hazardous substance. Example: Use water-based cleaner instead of solvent-based.</p>
              </div>
              <div className="p-3 rounded bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="text-sm font-medium text-purple-400/80 mb-1">3. Engineering Controls</p>
                <p className="text-sm text-white">Physical measures to reduce exposure. Example: Use local exhaust ventilation when soldering.</p>
              </div>
              <div className="p-3 rounded bg-orange-500/10 border-l-2 border-orange-500/50">
                <p className="text-sm font-medium text-orange-400/80 mb-1">4. Administrative Controls</p>
                <p className="text-sm text-white">Safe working procedures. Example: Limit time spent in contaminated areas, rotate workers.</p>
              </div>
              <div className="p-3 rounded bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm font-medium text-red-400/80 mb-1">5. PPE - Last Resort</p>
                <p className="text-sm text-white">Personal protective equipment. Example: Respirators, gloves, goggles. Only use when other controls are not practicable.</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Why this order?</strong> Higher controls protect everyone automatically. PPE only protects the wearer, can be uncomfortable, may not be worn correctly, and can fail.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Hazardous Substances in Electrical Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricians encounter various hazardous substances in their daily work. Understanding these helps you take appropriate precautions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Substances</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Solvents/Degreasers:</strong> Skin absorption, inhalation hazards</li>
                  <li><strong>Cable lubricants:</strong> Skin irritation, environmental contamination</li>
                  <li><strong>Soldering flux:</strong> Respiratory sensitisation, occupational asthma</li>
                  <li><strong>Drilling dust:</strong> Silica (masonry), wood dust - respiratory hazards</li>
                  <li><strong>PVC fumes:</strong> From cutting/burning cables - toxic fumes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specialist Hazards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>SF6 gas:</strong> In HV switchgear - asphyxiant in confined spaces</li>
                  <li><strong>PCBs:</strong> In older capacitors/transformers - carcinogenic</li>
                  <li><strong>Lead solder:</strong> Older installations - toxic metal</li>
                  <li><strong>Asbestos:</strong> Older buildings - separate regulations apply</li>
                  <li><strong>Battery acid:</strong> Corrosive - in UPS/emergency lighting systems</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> If you suspect asbestos-containing materials during work, STOP immediately and report to your supervisor. Only licensed contractors can remove most asbestos materials.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Data Sheets and COSHH Assessments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety Data Sheets (SDS) and COSHH assessments are essential documents for working safely with hazardous substances.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety Data Sheet (SDS) - Key Sections:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Section 1:</strong> Identification - Product name, supplier details</li>
                <li><strong>Section 2:</strong> Hazard identification - What dangers the substance poses</li>
                <li><strong>Section 4:</strong> First aid measures - What to do if exposed</li>
                <li><strong>Section 7:</strong> Handling and storage - Safe use procedures</li>
                <li><strong>Section 8:</strong> Exposure controls/PPE - What protection is needed</li>
                <li><strong>Section 11:</strong> Toxicological information - Health effects</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-white mb-1">Flammable</p>
                <p className="text-white/90 text-xs">Fire hazard</p>
              </div>
              <div className="p-3 rounded bg-orange-500/10 border border-orange-500/30">
                <p className="font-medium text-white mb-1">Corrosive</p>
                <p className="text-white/90 text-xs">Skin/eye burns</p>
              </div>
              <div className="p-3 rounded bg-purple-500/10 border border-purple-500/30">
                <p className="font-medium text-white mb-1">Toxic</p>
                <p className="text-white/90 text-xs">Serious health risk</p>
              </div>
              <div className="p-3 rounded bg-elec-yellow/10 border border-elec-yellow/30">
                <p className="font-medium text-white mb-1">Irritant</p>
                <p className="text-white/90 text-xs">Skin/eye irritation</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> COSHH assessments must be reviewed regularly and whenever circumstances change - such as new substances, changed work practices, or new health information.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Using Any Substance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check if a COSHH assessment exists and read it</li>
                <li>Review the Safety Data Sheet for hazards and controls</li>
                <li>Ensure you have the correct PPE and know how to use it</li>
                <li>Check ventilation is adequate</li>
                <li>Know the first aid and emergency procedures</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Working with Substances</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use the minimum amount necessary</li>
                <li>Keep containers closed when not in use</li>
                <li>Avoid skin contact - use gloves appropriate for the substance</li>
                <li>Work in well-ventilated areas</li>
                <li>Do not eat, drink or smoke in work areas</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring SDS information</strong> - Contains critical safety data</li>
                <li><strong>Using wrong PPE</strong> - Not all gloves protect against all chemicals</li>
                <li><strong>Poor ventilation when soldering</strong> - Flux fumes cause occupational asthma</li>
                <li><strong>Decanting into unmarked containers</strong> - Others won't know the hazards</li>
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

        <hr className="border-white/5 my-12" />

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - COSHH Controls</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Hierarchy of Controls:</p>
                <ul className="space-y-0.5">
                  <li>1. Eliminate - Remove the substance</li>
                  <li>2. Substitute - Use less hazardous alternative</li>
                  <li>3. Engineer - Ventilation, enclosure</li>
                  <li>4. Administrate - Procedures, training</li>
                  <li>5. PPE - Last resort protection</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Documents:</p>
                <ul className="space-y-0.5">
                  <li>Safety Data Sheet (SDS) - From supplier</li>
                  <li>COSHH Assessment - From employer</li>
                  <li>Training records - Your competence</li>
                </ul>
                <p className="font-medium text-white mb-1 mt-3">Electrical Trade Hazards:</p>
                <ul className="space-y-0.5">
                  <li>Solvents, degreasers, flux fumes</li>
                  <li>Drilling dust, SF6, PCBs, asbestos</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1-5">
              Next: PUWER & LOLER
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section1_4;
