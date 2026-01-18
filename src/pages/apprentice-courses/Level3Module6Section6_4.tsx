/**
 * Level 3 Module 6 Section 6.4 - Risk Assessments
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Risk Assessments - Level 3 Module 6 Section 6.4";
const DESCRIPTION = "Learn to conduct risk assessments for electrical installations. Cover hazard identification, risk evaluation, control measures, and legal requirements under the Management of Health and Safety at Work Regulations.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the primary purpose of a risk assessment?", options: ["To create paperwork", "To identify hazards and implement controls to prevent harm", "To delay work", "To blame workers for accidents"], correctIndex: 1, explanation: "Risk assessments identify hazards, evaluate the likelihood and severity of harm, and determine appropriate control measures to protect workers and others from injury or ill-health." },
  { id: "check-2", question: "Under which regulation is risk assessment a legal requirement?", options: ["Building Regulations", "Management of Health and Safety at Work Regulations 1999", "BS 7671", "Electricity Act"], correctIndex: 1, explanation: "The Management of Health and Safety at Work Regulations 1999 require employers to conduct suitable and sufficient risk assessments. Additional requirements apply under the Electricity at Work Regulations 1989." },
  { id: "check-3", question: "What does the risk rating typically consider?", options: ["Cost only", "Likelihood of harm multiplied by severity of harm", "Worker age", "Weather conditions only"], correctIndex: 1, explanation: "Risk rating combines the likelihood of harm occurring with the potential severity. This produces a risk score (Low, Medium, High) that helps prioritise control measures." },
  { id: "check-4", question: "What is the hierarchy of control in risk management?", options: ["PPE first", "Elimination, Substitution, Engineering controls, Admin controls, PPE", "Random selection", "Cost-based selection"], correctIndex: 1, explanation: "The hierarchy of control prioritises the most effective measures: Eliminate the hazard, Substitute with something safer, use Engineering controls, implement Administrative controls, and PPE as last resort." }
];

const quizQuestions = [
  { id: 1, question: "A hazard is defined as:", options: ["Something that causes actual harm", "Something with the potential to cause harm", "A minor inconvenience", "A workplace rule"], correctAnswer: 1, explanation: "A hazard is anything with the potential to cause harm - such as electricity, working at height, or hazardous substances. Risk is the likelihood of that potential harm being realised." },
  { id: 2, question: "The five steps to risk assessment are:", options: ["Plan, do, check, act, review", "Identify hazards, assess risks, control measures, record, review", "Design, install, test, certify, maintain", "None specific"], correctAnswer: 1, explanation: "HSE's five steps: 1) Identify hazards, 2) Decide who might be harmed, 3) Evaluate risks and decide on controls, 4) Record findings, 5) Review and update regularly." },
  { id: 3, question: "For electrical installation work, key hazards include:", options: ["Only electric shock", "Electric shock, arc flash, fire, falls, manual handling, and working in confined spaces", "Paperwork only", "Weather conditions only"], correctAnswer: 1, explanation: "Electrical work involves multiple hazards: electric shock, arc flash/burns, fire from faults, falls when working at height, manual handling injuries, confined space risks, and tool hazards." },
  { id: 4, question: "When should risk assessments be reviewed?", options: ["Never", "When there are significant changes, after incidents, or at regular intervals", "Only after accidents", "Every 10 years"], correctAnswer: 1, explanation: "Review risk assessments: when work methods change, after incidents or near misses, when new hazards emerge, when moving to new locations, or at regular intervals (typically annually)." },
  { id: 5, question: "A residual risk is:", options: ["Zero risk", "The risk remaining after control measures are applied", "Maximum risk", "Risk from residual current"], correctAnswer: 1, explanation: "Residual risk is what remains after implementing controls. Controls aim to reduce risk to an acceptable level - zero risk is rarely achievable, but residual risk should be 'as low as reasonably practicable' (ALARP)." },
  { id: 6, question: "Who should be involved in creating risk assessments?", options: ["Only managers", "Workers who do the job, supervisors, and health and safety personnel", "Only health and safety officers", "External consultants only"], correctAnswer: 1, explanation: "Effective risk assessments involve those who do the work (they understand the tasks and hazards), supervisors, and H&S personnel. This ensures practical, relevant assessments." },
  { id: 7, question: "Safe isolation procedures address which hazard?", options: ["Manual handling", "Exposure to live conductors during work", "Noise", "Dust"], correctAnswer: 1, explanation: "Safe isolation procedures protect against electric shock by ensuring circuits are dead before work begins. This involves: isolate, secure, prove dead, and lock off/tag out." },
  { id: 8, question: "PPE should be considered:", options: ["As the first line of defence", "As the last resort after other controls", "Only for visitors", "Never for electrical work"], correctAnswer: 1, explanation: "PPE is the last resort in the hierarchy of control. It doesn't eliminate the hazard - it only protects if used correctly. Higher-level controls (elimination, engineering) are more effective." },
  { id: 9, question: "A dynamic risk assessment is:", options: ["Written assessment only", "Ongoing assessment of changing conditions during work", "Assessment done by robots", "Assessment of electrical dynamics"], correctAnswer: 1, explanation: "Dynamic risk assessment is the continuous process of identifying hazards and assessing risks as work progresses and conditions change. It complements the written assessment." },
  { id: 10, question: "For work near overhead power lines, control measures include:", options: ["No specific precautions", "Exclusion zones, goal posts, banksmen, and liaison with DNO", "Just wearing rubber gloves", "Working faster"], correctAnswer: 1, explanation: "Working near overhead lines requires: establishing safe distances/exclusion zones, using goal posts for height restrictions, having trained banksmen, and liaison with the Distribution Network Operator." },
  { id: 11, question: "Risk assessment records should include:", options: ["Nothing specific", "Hazards identified, persons at risk, existing controls, risk rating, and additional controls needed", "Only the assessor's name", "Just the date"], correctAnswer: 1, explanation: "Records should document: hazards, who might be harmed, current control measures, risk evaluation (likelihood x severity), additional controls required, action owners, and review dates." },
  { id: 12, question: "Arc flash risk assessments are particularly important for:", options: ["All low voltage work", "Work on or near energised equipment where arc flash could occur", "Only domestic work", "Cable containment installation"], correctAnswer: 1, explanation: "Arc flash assessments are critical for work on or near energised equipment - particularly switchboards and distribution equipment where fault energy could cause burns, blast, and ignition of clothing." }
];

const faqs = [
  { question: "Do I need a risk assessment for every job?", answer: "Yes, work should not proceed without assessing risks. For routine tasks, a generic risk assessment covering typical hazards may suffice. Non-routine or higher-risk work needs specific assessments. Dynamic assessment supplements written assessments during work." },
  { question: "Who is legally responsible for risk assessments?", answer: "The employer has the legal duty to conduct risk assessments. However, competent workers may carry out assessments on behalf of the employer. Self-employed persons must also assess risks to themselves and others affected by their work." },
  { question: "What training do I need to conduct risk assessments?", answer: "There's no specific qualification required, but assessors need: understanding of the work activities, knowledge of hazards and controls, familiarity with the risk assessment process, and competence in the specific work area. Training courses are available from various providers." },
  { question: "What's the difference between generic and specific risk assessments?", answer: "Generic assessments cover routine activities with well-understood hazards - they're pre-prepared and apply to repeated tasks. Specific (or task/site-specific) assessments are prepared for particular jobs considering unique circumstances, environments, or non-routine work." },
  { question: "How detailed should a risk assessment be?", answer: "Detailed enough to identify significant risks and determine appropriate controls, but not excessively bureaucratic. The level of detail should match the complexity and risk level of the work. Simple tasks need simple assessments; complex or high-risk work needs more detail." }
];

const Level3Module6Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3"><Zap className="h-4 w-4" /><span>Module 6.6.4</span></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Risk Assessments</h1>
          <p className="text-white/80">Identifying hazards and controlling risks in electrical installation work</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Identify hazards, implement controls</li>
              <li><strong>Legal basis:</strong> MHSWR 1999, EAWR 1989</li>
              <li><strong>Risk = </strong> Likelihood x Severity</li>
              <li><strong>Hierarchy:</strong> Eliminate, Substitute, Engineer, Admin, PPE</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> RA forms, hazard boards, safe systems</li>
              <li><strong>Use:</strong> Before starting any work</li>
              <li><strong>Review:</strong> When conditions change</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Understand legal requirements for risk assessment", "Identify hazards in electrical installation work", "Evaluate risks using likelihood and severity", "Apply the hierarchy of control measures", "Document risk assessments effectively", "Review and update assessments appropriately"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Risk Assessment Fundamentals</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Risk assessment is a systematic process of identifying hazards, evaluating the risks they present, and determining appropriate controls. It's a legal requirement and essential for protecting workers and others.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Definitions:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Term</th><th className="border border-white/10 px-2 py-1 text-left">Definition</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Hazard</td><td className="border border-white/10 px-2 py-1">Something with potential to cause harm</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Risk</td><td className="border border-white/10 px-2 py-1">Likelihood of harm from exposure to hazard</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Control measure</td><td className="border border-white/10 px-2 py-1">Action taken to reduce or eliminate risk</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Residual risk</td><td className="border border-white/10 px-2 py-1">Risk remaining after controls implemented</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">ALARP</td><td className="border border-white/10 px-2 py-1">As Low As Reasonably Practicable</td></tr>
                </tbody>
              </table>
            </div>
            <p>The goal is not zero risk (usually impossible) but to reduce risks to an acceptable level where the cost of further reduction would be grossly disproportionate to the benefit.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[0]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Electrical Work Hazards</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Electrical installation work involves multiple hazards beyond just electricity. A comprehensive assessment must consider all risks workers may encounter.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Hazards in Electrical Work:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Hazard Category</th><th className="border border-white/10 px-2 py-1 text-left">Specific Hazards</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Electrical</td><td className="border border-white/10 px-2 py-1">Shock, arc flash, burns, fire, explosion</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Working at height</td><td className="border border-white/10 px-2 py-1">Falls from ladders, scaffolds, roofs</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Manual handling</td><td className="border border-white/10 px-2 py-1">Heavy equipment, cable drums, boards</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Tools and equipment</td><td className="border border-white/10 px-2 py-1">Cuts, impacts, entanglement</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Environment</td><td className="border border-white/10 px-2 py-1">Confined spaces, asbestos, dust, noise</td></tr>
                </tbody>
              </table>
            </div>
            <p>Each hazard needs evaluation for who might be harmed and how. Consider workers, other contractors, building occupants, and members of the public.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[1]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Risk Evaluation</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Risk evaluation involves considering both the likelihood of harm occurring and the potential severity. This produces a risk rating that helps prioritise controls.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk Matrix Example:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Likelihood/Severity</th><th className="border border-white/10 px-2 py-1 text-left">Minor</th><th className="border border-white/10 px-2 py-1 text-left">Moderate</th><th className="border border-white/10 px-2 py-1 text-left">Major</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Likely</td><td className="border border-white/10 px-2 py-1 bg-yellow-600/30">Medium</td><td className="border border-white/10 px-2 py-1 bg-red-600/30">High</td><td className="border border-white/10 px-2 py-1 bg-red-600/50">High</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Possible</td><td className="border border-white/10 px-2 py-1 bg-green-600/30">Low</td><td className="border border-white/10 px-2 py-1 bg-yellow-600/30">Medium</td><td className="border border-white/10 px-2 py-1 bg-red-600/30">High</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Unlikely</td><td className="border border-white/10 px-2 py-1 bg-green-600/30">Low</td><td className="border border-white/10 px-2 py-1 bg-green-600/30">Low</td><td className="border border-white/10 px-2 py-1 bg-yellow-600/30">Medium</td></tr>
                </tbody>
              </table>
            </div>
            <p>High-risk items need immediate attention and robust controls. Medium risks need controls but may be managed with existing measures. Low risks should still be monitored and controlled appropriately.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[2]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Control Measures</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Control measures follow a hierarchy - prioritise the most effective controls that address hazards at source rather than relying on worker behaviour.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hierarchy of Control:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Level</th><th className="border border-white/10 px-2 py-1 text-left">Control Type</th><th className="border border-white/10 px-2 py-1 text-left">Electrical Example</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">1 (Most effective)</td><td className="border border-white/10 px-2 py-1">Elimination</td><td className="border border-white/10 px-2 py-1">Work on dead circuits only</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">2</td><td className="border border-white/10 px-2 py-1">Substitution</td><td className="border border-white/10 px-2 py-1">Use SELV instead of mains voltage</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">3</td><td className="border border-white/10 px-2 py-1">Engineering</td><td className="border border-white/10 px-2 py-1">RCDs, insulated barriers, lock-out</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">4</td><td className="border border-white/10 px-2 py-1">Administrative</td><td className="border border-white/10 px-2 py-1">Permits, procedures, training</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">5 (Least effective)</td><td className="border border-white/10 px-2 py-1">PPE</td><td className="border border-white/10 px-2 py-1">Insulating gloves, arc flash gear</td></tr>
                </tbody>
              </table>
            </div>
            <p>Effective risk control usually combines multiple measures at different hierarchy levels. PPE should never be the primary control for high-risk activities.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[3]]} className="my-8" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/30 text-sm text-white space-y-2">
            <p><strong>HSE Five Steps to Risk Assessment:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Step 1: Identify the hazards - walk the site, consult workers, review incidents</li>
              <li>Step 2: Decide who might be harmed and how</li>
              <li>Step 3: Evaluate risks and decide on control measures</li>
              <li>Step 4: Record your findings and implement controls</li>
              <li>Step 5: Review and update as necessary</li>
            </ul>
            <p className="mt-3"><strong>Key electrical controls:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Safe isolation: isolate, secure, prove dead, lock off/tag</li>
              <li>Permits to work for high-risk activities</li>
              <li>Competent workers with appropriate training</li>
              <li>Appropriate test equipment (GS38 compliant)</li>
              <li>Emergency procedures and first aid provision</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Key Legislation</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Risk assessment duty</td><td className="py-1 text-white">MHSWR 1999 Reg 3</td></tr>
                  <tr><td className="py-1 text-white/70">Electrical safety</td><td className="py-1 text-white">EAWR 1989</td></tr>
                  <tr><td className="py-1 text-white/70">Working at height</td><td className="py-1 text-white">WAHR 2005</td></tr>
                  <tr><td className="py-1 text-white/70">PPE provision</td><td className="py-1 text-white">PPER 1992</td></tr>
                  <tr><td className="py-1 text-white/70">CDM</td><td className="py-1 text-white">CDM 2015</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Useful HSE Guidance</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Electrical safety</td><td className="py-1 text-white">HSG85</td></tr>
                  <tr><td className="py-1 text-white/70">Safe isolation</td><td className="py-1 text-white">GS38</td></tr>
                  <tr><td className="py-1 text-white/70">Working at height</td><td className="py-1 text-white">INDG401</td></tr>
                  <tr><td className="py-1 text-white/70">Risk assessment</td><td className="py-1 text-white">INDG163</td></tr>
                  <tr><td className="py-1 text-white/70">Manual handling</td><td className="py-1 text-white">INDG143</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Quiz questions={quizQuestions} />

        <section className="mt-12 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group p-3 rounded-lg bg-white/5 text-sm">
                <summary className="cursor-pointer text-white font-medium">{faq.question}</summary>
                <p className="mt-2 text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6-3"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Bill of Quantities</Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6-5">Next: Method Statements<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section6_4;
