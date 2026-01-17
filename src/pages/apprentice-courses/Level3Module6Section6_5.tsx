/**
 * Level 3 Module 6 Section 6.5 - Method Statements
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Method Statements - Level 3 Module 6 Section 6.5";
const DESCRIPTION = "Learn to write effective method statements for electrical installation work. Cover safe systems of work, step-by-step procedures, permit requirements, and integration with risk assessments.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the primary purpose of a method statement?", options: ["To create paperwork", "To describe how work will be carried out safely, step by step", "To estimate costs", "To blame workers"], correctIndex: 1, explanation: "Method statements describe the safe sequence of work, identifying hazards at each stage and the controls required. They communicate the planned work method to all involved." },
  { id: "check-2", question: "How do method statements relate to risk assessments?", options: ["They are the same document", "Method statements incorporate risk assessment findings and specify controls", "They are unrelated", "Method statements replace risk assessments"], correctIndex: 1, explanation: "Method statements and risk assessments work together. The risk assessment identifies hazards; the method statement describes how work will be done safely, incorporating the control measures from the risk assessment." },
  { id: "check-3", question: "Who should read and understand the method statement before work starts?", options: ["Only the supervisor", "All workers involved in the task", "Only the client", "No one - it's just for records"], correctIndex: 1, explanation: "All workers involved must read, understand, and follow the method statement. Briefings should ensure everyone knows their role, the hazards, and the controls. Sign-off may be required to confirm understanding." },
  { id: "check-4", question: "What should happen if site conditions differ from those assumed in the method statement?", options: ["Ignore the differences", "Stop work, reassess, and revise the method statement if needed", "Continue anyway", "Work faster to get finished"], correctIndex: 1, explanation: "If conditions differ from those planned, work should stop until the method statement is reviewed. Changes may require revision to maintain safety. Never proceed with an invalid method statement." }
];

const quizQuestions = [
  { id: 1, question: "A method statement typically includes:", options: ["Only material costs", "Work sequence, hazards, controls, responsibilities, and emergency procedures", "Just the completion date", "Only the client's address"], correctAnswer: 1, explanation: "Method statements include: scope of work, sequence of operations, hazards and controls at each stage, personnel and responsibilities, equipment required, emergency procedures, and sign-off requirements." },
  { id: 2, question: "The work sequence in a method statement should:", options: ["Be vague to allow flexibility", "Describe each step in logical order with associated controls", "Only cover the final result", "Omit safety measures"], correctAnswer: 1, explanation: "Work sequences should be detailed enough to guide workers safely through each step. Each stage should identify associated hazards and the specific controls to be applied." },
  { id: 3, question: "For safe isolation, the method statement should specify:", options: ["Nothing specific", "The isolation procedure: identify, isolate, secure, prove dead, lock off/tag", "Just 'turn off power'", "Only the voltage"], correctAnswer: 1, explanation: "Safe isolation requires a specific sequence: identify the circuit, isolate at the correct point, secure against re-energisation, prove dead with approved voltage indicator, and apply lock-off/tagging." },
  { id: 4, question: "RAMS stands for:", options: ["Random Assessment Method System", "Risk Assessment and Method Statement", "Repair And Maintenance Schedule", "Required Asset Management System"], correctAnswer: 1, explanation: "RAMS combines the Risk Assessment and Method Statement - often required by principal contractors as a single document covering hazard identification, risk evaluation, and the safe system of work." },
  { id: 5, question: "Method statements for work in occupied premises should address:", options: ["Nothing extra", "Protection of occupants, communication, access restrictions, and noise/disruption", "Only working hours", "Just the parking arrangements"], correctAnswer: 1, explanation: "Working in occupied premises requires additional considerations: protecting occupants from hazards, communication about work timing, access restrictions/barriers, minimising disruption, and maintaining safe egress." },
  { id: 6, question: "Emergency procedures in method statements should include:", options: ["Nothing - emergencies are unpredictable", "Actions for fire, electric shock, injury, and evacuation routes", "Only phone numbers", "Just 'call 999'"], correctAnswer: 1, explanation: "Emergency procedures should cover: response to electrical incidents, first aid arrangements, fire procedures, evacuation routes, emergency contacts, and location of safety equipment." },
  { id: 7, question: "A permit to work is typically required for:", options: ["All electrical work", "High-risk activities such as live working, confined spaces, or hot work", "Only new installations", "Never"], correctAnswer: 1, explanation: "Permits to work provide additional control for high-risk activities. They formally authorise work, specify precautions, and require sign-off before and after work. Examples include: live working, hot work, confined spaces." },
  { id: 8, question: "Method statement reviews should occur:", options: ["Never once written", "Before work starts and when conditions change", "Only after accidents", "Every 5 years"], correctAnswer: 1, explanation: "Review method statements: before starting work, when site conditions differ from assumptions, when work scope changes, after incidents or near misses, and for lessons learned improvement." },
  { id: 9, question: "PPE requirements in method statements should specify:", options: ["Just 'wear PPE'", "Specific PPE items, standards, and when each is required", "Nothing about PPE", "Only hard hat colours"], correctAnswer: 1, explanation: "PPE specifications should be specific: what items are required (safety boots, glasses, gloves), what standards they must meet, and during which operations each is needed." },
  { id: 10, question: "Communication arrangements in method statements cover:", options: ["Social media", "How information will be shared between workers, supervisors, and others on site", "Only radio channels", "Personal phone calls"], correctAnswer: 1, explanation: "Communication arrangements include: how workers will communicate during tasks, how to report problems, coordination with other trades, contact details for supervisors, and methods for emergency communication." },
  { id: 11, question: "The 'competency requirements' section of a method statement should identify:", options: ["Nothing specific", "Qualifications, training, and experience needed for personnel", "Only the manager's name", "Just age requirements"], correctAnswer: 1, explanation: "Competency requirements specify what qualifications, training, and experience workers need. This might include: JIB grade, specific training (working at height, confined space), and experience with particular equipment." },
  { id: 12, question: "Quality hold points in method statements are:", options: ["Delays in the project", "Stages where work must be inspected/approved before proceeding", "Optional checks", "End of day breaks"], correctAnswer: 1, explanation: "Quality hold points are defined stages where work must stop for inspection, testing, or approval before proceeding. Examples: inspection before covering cables, testing before energisation, witness points for critical connections." }
];

const faqs = [
  { question: "What's the difference between a method statement and a procedure?", answer: "Method statements are task-specific documents for particular jobs or projects. Procedures are standing documents covering standard activities that apply repeatedly. A method statement might reference standard procedures but adds site/task-specific details." },
  { question: "Do I always need a method statement?", answer: "For complex, high-risk, or non-routine work - yes. Many sites require RAMS for all work. For simple, routine tasks covered by standard procedures and training, a detailed method statement may not add value, but you should always plan work safely." },
  { question: "How detailed should a method statement be?", answer: "Detailed enough that workers can understand and follow the safe system of work. The level of detail should match the complexity and risk. High-risk work needs more detail; simple tasks need less. Avoid excessive length that people won't read." },
  { question: "Who writes method statements?", answer: "Typically the contractor doing the work, as they understand their methods best. The supervisor or site manager usually prepares them, possibly with input from H&S personnel. They should be reviewed by someone competent before issue." },
  { question: "Can I use generic method statements?", answer: "Generic templates can be a starting point, but they must be tailored to specific site conditions, hazards, and requirements. A generic document that doesn't address actual conditions provides false assurance and may miss critical hazards." }
];

const Level3Module6Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3"><Zap className="h-4 w-4" /><span>Module 6.6.5</span></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Method Statements</h1>
          <p className="text-white/80">Writing safe systems of work for electrical installation</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Describe safe work sequence</li>
              <li><strong>Link to RA:</strong> Incorporates control measures</li>
              <li><strong>Contents:</strong> Steps, hazards, controls, PPE</li>
              <li><strong>Briefing:</strong> All workers must understand</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> RAMS documents, permit packs</li>
              <li><strong>Use:</strong> Plan and brief work safely</li>
              <li><strong>Review:</strong> Before starting, when changes occur</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Write clear method statements for electrical work", "Structure work sequences with hazards and controls", "Integrate method statements with risk assessments", "Specify PPE and competency requirements", "Include emergency procedures appropriately", "Review and update method statements effectively"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Method Statement Purpose</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>A method statement describes how work will be carried out safely. It translates risk assessment findings into a practical work plan that all involved can follow.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Method Statement Components:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Section</th><th className="border border-white/10 px-2 py-1 text-left">Content</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Scope</td><td className="border border-white/10 px-2 py-1">Description of work, location, duration</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Responsibilities</td><td className="border border-white/10 px-2 py-1">Who does what, supervision arrangements</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Work sequence</td><td className="border border-white/10 px-2 py-1">Step-by-step procedure with controls</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Resources</td><td className="border border-white/10 px-2 py-1">Equipment, materials, PPE required</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Emergency</td><td className="border border-white/10 px-2 py-1">Procedures, contacts, first aid</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Sign-off</td><td className="border border-white/10 px-2 py-1">Authorisation, briefing confirmation</td></tr>
                </tbody>
              </table>
            </div>
            <p>Method statements are living documents - they should be reviewed and updated as conditions change or lessons are learned.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[0]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Work Sequence Planning</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>The work sequence is the core of the method statement. Each step should be clear, with associated hazards and specific controls identified.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example: Cable Installation Sequence</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Step</th><th className="border border-white/10 px-2 py-1 text-left">Activity</th><th className="border border-white/10 px-2 py-1 text-left">Hazards/Controls</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">1</td><td className="border border-white/10 px-2 py-1">Set up work area</td><td className="border border-white/10 px-2 py-1">Barriers, warning signs, lighting</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">2</td><td className="border border-white/10 px-2 py-1">Position cable drum</td><td className="border border-white/10 px-2 py-1">Manual handling, drum stand, team lift</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">3</td><td className="border border-white/10 px-2 py-1">Install containment</td><td className="border border-white/10 px-2 py-1">Working at height controls, tool tethers</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">4</td><td className="border border-white/10 px-2 py-1">Draw in cables</td><td className="border border-white/10 px-2 py-1">Cut protection, gloves, communication</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">5</td><td className="border border-white/10 px-2 py-1">Terminate cables</td><td className="border border-white/10 px-2 py-1">Isolation verified, correct tools</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">6</td><td className="border border-white/10 px-2 py-1">Test and certify</td><td className="border border-white/10 px-2 py-1">GS38 instruments, recorded results</td></tr>
                </tbody>
              </table>
            </div>
            <p>Break complex work into logical stages. Each stage should be completable and checkable before moving to the next.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[1]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Integration with Risk Assessment</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Method statements and risk assessments work together. The risk assessment identifies what could go wrong; the method statement describes how to prevent it.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">RAMS - Combined Document Structure:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Section</th><th className="border border-white/10 px-2 py-1 text-left">Purpose</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Project details</td><td className="border border-white/10 px-2 py-1">Location, client, scope, dates</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Risk assessment</td><td className="border border-white/10 px-2 py-1">Hazards, evaluation, controls</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Method statement</td><td className="border border-white/10 px-2 py-1">Work sequence applying controls</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Resources</td><td className="border border-white/10 px-2 py-1">Personnel, equipment, PPE</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Emergency</td><td className="border border-white/10 px-2 py-1">Procedures and contacts</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Approvals</td><td className="border border-white/10 px-2 py-1">Sign-off by relevant parties</td></tr>
                </tbody>
              </table>
            </div>
            <p>RAMS (Risk Assessment and Method Statement) combines both documents. This ensures controls identified in the risk assessment appear in the work method.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[2]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Briefing and Review</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>A method statement is only effective if workers know and follow it. Proper briefing and ongoing review are essential for safe work.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Method Statement Briefing Checklist:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Item</th><th className="border border-white/10 px-2 py-1 text-left">Detail</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Scope of work</td><td className="border border-white/10 px-2 py-1">What we're doing, where, and when</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Key hazards</td><td className="border border-white/10 px-2 py-1">Main risks everyone must understand</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Controls</td><td className="border border-white/10 px-2 py-1">How we're managing the risks</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Individual roles</td><td className="border border-white/10 px-2 py-1">Each person's responsibilities</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Emergency</td><td className="border border-white/10 px-2 py-1">What to do if things go wrong</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Questions</td><td className="border border-white/10 px-2 py-1">Opportunity to clarify anything</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Sign-off</td><td className="border border-white/10 px-2 py-1">Confirmation of understanding</td></tr>
                </tbody>
              </table>
            </div>
            <p>If conditions change from those in the method statement, stop work and reassess. Never continue with a plan that no longer matches reality.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[3]]} className="my-8" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/30 text-sm text-white space-y-2">
            <p><strong>Writing effective method statements:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use clear, simple language - avoid jargon</li>
              <li>Be specific about controls - not just "take care"</li>
              <li>Include enough detail to guide work, but keep it readable</li>
              <li>Reference standards and procedures rather than repeating them</li>
              <li>Involve workers who will do the job in developing the method</li>
            </ul>
            <p className="mt-3"><strong>Electrical work specifics:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Always detail safe isolation procedures step by step</li>
              <li>Specify test equipment requirements (GS38 compliant)</li>
              <li>Include lock-off and tagging requirements</li>
              <li>Describe proving dead at each work location</li>
              <li>Specify how live working will be avoided (or if unavoidable, the permit process)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Method Statement Contents</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Work description</td><td className="py-1 text-white">Scope, location, duration</td></tr>
                  <tr><td className="py-1 text-white/70">Sequence</td><td className="py-1 text-white">Step-by-step with controls</td></tr>
                  <tr><td className="py-1 text-white/70">Resources</td><td className="py-1 text-white">People, equipment, PPE</td></tr>
                  <tr><td className="py-1 text-white/70">Emergency</td><td className="py-1 text-white">Procedures and contacts</td></tr>
                  <tr><td className="py-1 text-white/70">Sign-off</td><td className="py-1 text-white">Authorisation and briefing</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Safe Isolation Sequence</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">1. Identify</td><td className="py-1 text-white">Correct circuit/equipment</td></tr>
                  <tr><td className="py-1 text-white/70">2. Isolate</td><td className="py-1 text-white">Switch off, remove fuses</td></tr>
                  <tr><td className="py-1 text-white/70">3. Secure</td><td className="py-1 text-white">Lock off, apply tags</td></tr>
                  <tr><td className="py-1 text-white/70">4. Prove dead</td><td className="py-1 text-white">Test with approved indicator</td></tr>
                  <tr><td className="py-1 text-white/70">5. Work safely</td><td className="py-1 text-white">Follow method statement</td></tr>
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
            <Link to="/study-centre/apprentice/level3-module6-section6-4"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Risk Assessments</Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/apprentice/level3-module6">Back to Module 6 Overview<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section6_5;
