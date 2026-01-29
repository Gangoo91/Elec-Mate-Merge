import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Hazard Identification Methods - HNC Module 1 Section 2.1";
const DESCRIPTION = "Master hazard identification techniques for building services: workplace inspections, task analysis, job safety analysis, incident data analysis, and hazard categorisation in electrical and mechanical systems.";

const quickCheckQuestions = [
  {
    id: "hazard-vs-risk",
    question: "What is the key difference between a hazard and a risk?",
    options: [
      "Hazards are more dangerous than risks",
      "A hazard is a potential source of harm; risk is the likelihood and severity of harm occurring",
      "Risks are physical, hazards are procedural",
      "There is no difference - they mean the same thing"
    ],
    correctIndex: 1,
    explanation: "A hazard is anything with the potential to cause harm (e.g., exposed live conductors). Risk is the combination of how likely the harm is to occur and how severe it would be. Identifying hazards is the first step; assessing risk comes next."
  },
  {
    id: "workplace-inspection",
    question: "How often should formal workplace inspections be conducted in building services environments?",
    options: [
      "Only after an accident occurs",
      "Once per year",
      "Regularly - typically weekly, monthly, or quarterly depending on risk level",
      "Only when requested by the HSE"
    ],
    correctIndex: 2,
    explanation: "Regular scheduled inspections are essential for proactive hazard identification. Higher-risk environments require more frequent inspections. Daily informal checks complement formal scheduled inspections."
  },
  {
    id: "jsa-purpose",
    question: "What is the primary purpose of a Job Safety Analysis (JSA)?",
    options: [
      "To record accidents after they happen",
      "To break down tasks into steps and identify hazards at each stage",
      "To calculate project costs",
      "To assign blame for safety failures"
    ],
    correctIndex: 1,
    explanation: "JSA systematically breaks down a job into its component steps, identifies potential hazards at each step, and determines appropriate control measures. It's a proactive tool for preventing incidents before work begins."
  },
  {
    id: "near-miss",
    question: "Why is reporting near misses important for hazard identification?",
    options: [
      "It's not important - only actual injuries need reporting",
      "Near misses reveal hazards before they cause actual harm",
      "It's only required for RIDDOR purposes",
      "Near miss reports are only for insurance claims"
    ],
    correctIndex: 1,
    explanation: "Near misses are 'free lessons' - they reveal hazards and system failures without injury occurring. Research shows for every serious injury, there are hundreds of near misses. Capturing this data helps prevent future incidents."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following best defines a 'hazard' in workplace safety?",
    options: [
      "The probability of an accident occurring",
      "A potential source of harm or adverse health effect",
      "A measure of how severe an injury might be",
      "A type of safety control measure"
    ],
    correctAnswer: 1,
    explanation: "A hazard is anything with the potential to cause harm - this could be a substance, piece of equipment, work method, or environmental condition. Identifying hazards is the foundation of all risk assessment."
  },
  {
    id: 2,
    question: "During a workplace inspection, which area should receive PARTICULAR attention in a building services environment?",
    options: [
      "Staff canteen facilities",
      "Distribution boards, switch rooms, and plant areas",
      "Car parking arrangements",
      "Office desk layouts"
    ],
    correctAnswer: 1,
    explanation: "Electrical distribution areas, switch rooms, and plant rooms present the highest hazard potential in building services. These areas combine electrical, mechanical, and sometimes chemical hazards requiring thorough inspection."
  },
  {
    id: 3,
    question: "What does the hierarchy of controls prioritise as the most effective control measure?",
    options: [
      "Personal protective equipment",
      "Administrative controls",
      "Elimination of the hazard",
      "Warning signs and labels"
    ],
    correctAnswer: 2,
    explanation: "The hierarchy prioritises: Elimination > Substitution > Engineering controls > Administrative controls > PPE. Eliminating a hazard entirely is always the most effective solution, though not always practicable."
  },
  {
    id: 4,
    question: "A task analysis reveals that an electrician must work at height to install luminaires. What type of hazard category does this primarily represent?",
    options: [
      "Electrical hazard",
      "Environmental hazard",
      "Physical/mechanical hazard",
      "Ergonomic hazard"
    ],
    correctAnswer: 2,
    explanation: "Working at height is a physical/mechanical hazard - the potential for falls from height. While the task is electrical installation, the work at height hazard must be assessed separately and often presents the greater risk."
  },
  {
    id: 5,
    question: "Which document would you consult to determine if an incident is RIDDOR reportable?",
    options: [
      "BS 7671 Wiring Regulations",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013",
      "Construction (Design and Management) Regulations 2015",
      "Electricity at Work Regulations 1989"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR 2013 specifies which workplace injuries, diseases, and dangerous occurrences must be reported to the HSE. This includes fatalities, specified injuries, over-7-day incapacitation, and certain dangerous occurrences."
  },
  {
    id: 6,
    question: "What is the recommended frequency for reviewing and updating Job Safety Analyses?",
    options: [
      "Only when an accident occurs",
      "Every five years",
      "When work methods, equipment, or conditions change, or after incidents",
      "JSAs never need updating once created"
    ],
    correctAnswer: 2,
    explanation: "JSAs are living documents that must be reviewed when work methods change, new equipment is introduced, after incidents or near misses, or when workers identify new hazards. Regular scheduled reviews are also good practice."
  },
  {
    id: 7,
    question: "An electrician develops back pain from repeatedly lifting heavy cable drums. This is primarily which type of hazard?",
    options: [
      "Electrical hazard",
      "Chemical hazard",
      "Ergonomic hazard",
      "Environmental hazard"
    ],
    correctAnswer: 2,
    explanation: "Ergonomic hazards relate to the physical demands of work that can cause musculoskeletal injuries. Manual handling, repetitive movements, awkward postures, and prolonged standing are common ergonomic hazards in building services."
  },
  {
    id: 8,
    question: "Which observation technique involves watching workers perform their normal tasks without prior notice?",
    options: [
      "Scheduled safety audit",
      "Formal inspection",
      "Behavioural safety observation",
      "Incident investigation"
    ],
    correctAnswer: 2,
    explanation: "Behavioural safety observations capture how work is actually performed, not how workers think it should be done when they know they're being watched. This reveals genuine hazardous behaviours and unsafe conditions."
  },
  {
    id: 9,
    question: "According to Heinrich's Triangle, for every serious injury there are approximately how many near misses?",
    options: [
      "10",
      "29",
      "300",
      "1000"
    ],
    correctAnswer: 2,
    explanation: "Heinrich's research suggested a ratio of 1:29:300 - for every serious injury, there are 29 minor injuries and 300 near misses. Modern studies suggest the near-miss ratio may be even higher. This demonstrates the importance of near-miss reporting."
  },
  {
    id: 10,
    question: "When using a hazard checklist for electrical installations, which item would NOT typically be included?",
    options: [
      "Condition of cable insulation",
      "Adequacy of isolation procedures",
      "Staff holiday entitlements",
      "Presence of safety signage"
    ],
    correctAnswer: 2,
    explanation: "Hazard checklists for electrical work focus on physical conditions, equipment state, procedures, and safety controls. Administrative matters like holiday entitlements are HR issues, not safety hazard identification items."
  }
];

const faqs = [
  {
    question: "What's the difference between a hazard inspection and a risk assessment?",
    answer: "A hazard inspection identifies what hazards are present in the workplace - it's observational and factual. A risk assessment evaluates those hazards to determine the likelihood and severity of harm, then specifies control measures. Inspection comes first; assessment follows using the inspection findings."
  },
  {
    question: "How do I encourage workers to report near misses without fear of blame?",
    answer: "Establish a 'just culture' where honest reporting is valued and protected. Focus investigations on system failures, not individual blame. Provide anonymous reporting options. Give feedback showing how reports led to improvements. Recognise and thank those who report. Management must lead by example in reporting their own near misses."
  },
  {
    question: "Should I use generic checklists or create site-specific ones?",
    answer: "Both have value. Generic checklists from HSE or industry bodies ensure you cover standard hazards and regulatory requirements. However, these should be supplemented with site-specific items based on your workplace's unique equipment, processes, and conditions. The most effective approach combines generic foundations with site-specific additions."
  },
  {
    question: "How detailed should a Job Safety Analysis be?",
    answer: "A JSA should break the job into enough steps to identify hazards at each stage, but not so many that it becomes unworkable. Typically 10-20 steps for a complex task. Each step should describe what the worker does, potential hazards at that step, and specific control measures. It should be practical enough for workers to actually use."
  },
  {
    question: "What qualifications do I need to conduct workplace inspections?",
    answer: "No specific qualification is legally required, but inspectors must be 'competent' - meaning they have sufficient training, knowledge, and experience to identify hazards in the workplace being inspected. For building services, this typically means understanding electrical, mechanical, and environmental hazards. Many employers use IOSH or NEBOSH trained personnel for formal inspections."
  },
  {
    question: "How do I identify hazards in work I haven't done before?",
    answer: "Consult manufacturer's instructions and safety data sheets. Review industry guidance (HSE, ECA, JIB publications). Speak to experienced workers who have done similar work. Look at incident records from similar jobs. Conduct a thorough JSA before starting. If uncertain, seek specialist advice - don't proceed without understanding the hazards."
  }
];

const HNCModule1Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Hazard Identification Methods
          </h1>
          <p className="text-white/80">
            Systematic techniques for identifying workplace hazards in building services environments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Hazard:</strong> Anything with potential to cause harm</li>
              <li className="pl-1"><strong>Risk:</strong> Likelihood and severity of harm occurring</li>
              <li className="pl-1"><strong>Methods:</strong> Inspections, JSA, incident analysis, checklists</li>
              <li className="pl-1"><strong>Categories:</strong> Electrical, mechanical, environmental, ergonomic</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical:</strong> Live working, isolation, arc flash</li>
              <li className="pl-1"><strong>Mechanical:</strong> Moving parts, pressure systems, lifting</li>
              <li className="pl-1"><strong>Environmental:</strong> Confined spaces, working at height, asbestos</li>
              <li className="pl-1"><strong>Ergonomic:</strong> Manual handling, repetitive tasks, posture</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between hazards and risks in workplace safety",
              "Conduct effective workplace safety inspections",
              "Apply task analysis and Job Safety Analysis (JSA) techniques",
              "Analyse incident and near-miss data for hazard identification",
              "Use checklists and observation techniques effectively",
              "Categorise building services hazards appropriately"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Hazard vs Risk */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Definition of Hazard vs Risk
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the distinction between hazards and risks is fundamental to workplace safety.
              These terms are often confused but represent different concepts that together form the
              foundation of risk assessment.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Hazard</p>
                <p className="text-sm text-white/90 mb-3">
                  A hazard is anything with the <strong>potential</strong> to cause harm. This includes:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Physical objects (machinery, cables, heights)</li>
                  <li className="pl-1">Substances (chemicals, asbestos, fumes)</li>
                  <li className="pl-1">Energy sources (electricity, heat, radiation)</li>
                  <li className="pl-1">Work methods (manual handling, repetitive tasks)</li>
                  <li className="pl-1">Environmental conditions (noise, temperature, lighting)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Risk</p>
                <p className="text-sm text-white/90 mb-3">
                  Risk is the <strong>likelihood</strong> of harm occurring combined with its <strong>severity</strong>:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">How likely is someone to be exposed?</li>
                  <li className="pl-1">How often does exposure occur?</li>
                  <li className="pl-1">How severe could the harm be?</li>
                  <li className="pl-1">How many people could be affected?</li>
                  <li className="pl-1">What existing controls are in place?</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Practical Example</p>
              <p className="text-sm text-white/90">
                <strong>Hazard:</strong> A distribution board with exposed live terminals<br />
                <strong>Risk assessment considers:</strong> Who has access? Is it locked? How often is it accessed?
                What voltage? Are workers trained? Is PPE available?<br />
                <strong>Risk level:</strong> Could range from low (locked room, trained personnel only) to
                extreme (open access, untrained workers)
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Risk Equation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Factors</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Likelihood</td>
                      <td className="border border-white/10 px-3 py-2">Probability of harm occurring</td>
                      <td className="border border-white/10 px-3 py-2">Frequency, duration, existing controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Severity</td>
                      <td className="border border-white/10 px-3 py-2">Potential consequences</td>
                      <td className="border border-white/10 px-3 py-2">Minor injury to fatality</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exposure</td>
                      <td className="border border-white/10 px-3 py-2">Number and vulnerability of people</td>
                      <td className="border border-white/10 px-3 py-2">Workers, public, vulnerable groups</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Hazard identification comes first - you cannot assess risk until you know what hazards exist.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Workplace Inspections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Workplace Inspections and Task Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Workplace inspections are systematic examinations to identify hazards, assess compliance,
              and verify that control measures are working. They range from informal daily checks to
              comprehensive formal audits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Workplace Inspection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Conducted By</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Informal/Daily</td>
                      <td className="border border-white/10 px-3 py-2">Daily/continuous</td>
                      <td className="border border-white/10 px-3 py-2">All workers</td>
                      <td className="border border-white/10 px-3 py-2">Spot immediate hazards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scheduled</td>
                      <td className="border border-white/10 px-3 py-2">Weekly/monthly</td>
                      <td className="border border-white/10 px-3 py-2">Supervisors, safety reps</td>
                      <td className="border border-white/10 px-3 py-2">Systematic area checks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Formal audit</td>
                      <td className="border border-white/10 px-3 py-2">Quarterly/annually</td>
                      <td className="border border-white/10 px-3 py-2">H&S professionals</td>
                      <td className="border border-white/10 px-3 py-2">Comprehensive compliance review</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Statutory</td>
                      <td className="border border-white/10 px-3 py-2">As required by law</td>
                      <td className="border border-white/10 px-3 py-2">Competent persons</td>
                      <td className="border border-white/10 px-3 py-2">LOLER, PUWER, pressure systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Inspection Practice</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Use structured checklists appropriate to the area</li>
                  <li className="pl-1">Involve workers who know the area</li>
                  <li className="pl-1">Look at normal work, not just tidy 'inspection ready' conditions</li>
                  <li className="pl-1">Check paperwork matches reality (permits, risk assessments)</li>
                  <li className="pl-1">Document findings with photos where appropriate</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Focus Areas</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Electrical switch rooms and distribution areas</li>
                  <li className="pl-1">Plant rooms (boilers, chillers, pumps)</li>
                  <li className="pl-1">Roof access and equipment</li>
                  <li className="pl-1">Cable routes and containment</li>
                  <li className="pl-1">Access equipment storage and condition</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Task Analysis Process</p>
              <p className="text-sm text-white/90 mb-3">
                Task analysis systematically examines how work is actually performed to identify hazards
                inherent in the task itself:
              </p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Select the task</strong> - prioritise high-risk or frequently performed tasks</li>
                <li className="pl-1"><strong>Break it down</strong> - identify each step in sequence</li>
                <li className="pl-1"><strong>Identify hazards</strong> - what could go wrong at each step?</li>
                <li className="pl-1"><strong>Assess demands</strong> - physical, mental, environmental</li>
                <li className="pl-1"><strong>Consider variations</strong> - what if conditions aren't ideal?</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Inspections identify hazards; they don't replace risk assessments. Findings must be actioned, not just recorded.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Job Safety Analysis and Incident Data */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Job Safety Analysis and Incident Data Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Job Safety Analysis (JSA) - also called Job Hazard Analysis (JHA) - is a technique for
              systematically identifying hazards associated with specific jobs before work begins.
              Combined with incident data analysis, it provides both proactive and reactive hazard identification.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">JSA Development Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Select job</td>
                      <td className="border border-white/10 px-3 py-2">Choose task for analysis</td>
                      <td className="border border-white/10 px-3 py-2">Job title and scope defined</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Break down</td>
                      <td className="border border-white/10 px-3 py-2">List sequential steps</td>
                      <td className="border border-white/10 px-3 py-2">10-20 discrete steps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Identify hazards</td>
                      <td className="border border-white/10 px-3 py-2">For each step, ask "what could go wrong?"</td>
                      <td className="border border-white/10 px-3 py-2">Hazard list per step</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Develop controls</td>
                      <td className="border border-white/10 px-3 py-2">Determine preventive measures</td>
                      <td className="border border-white/10 px-3 py-2">Control measures per hazard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Review</td>
                      <td className="border border-white/10 px-3 py-2">Validate with experienced workers</td>
                      <td className="border border-white/10 px-3 py-2">Approved JSA document</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example JSA: DB Installation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hazards</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Transport DB to location</td>
                      <td className="border border-white/10 px-3 py-2">Manual handling, trips</td>
                      <td className="border border-white/10 px-3 py-2">Trolley, clear route, two-person lift</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Mark fixing positions</td>
                      <td className="border border-white/10 px-3 py-2">Working at height, dust</td>
                      <td className="border border-white/10 px-3 py-2">Stepladder, eye protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Drill fixings</td>
                      <td className="border border-white/10 px-3 py-2">Buried services, dust, noise</td>
                      <td className="border border-white/10 px-3 py-2">CAT scan, RPE, hearing protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Mount enclosure</td>
                      <td className="border border-white/10 px-3 py-2">Lifting, sharp edges</td>
                      <td className="border border-white/10 px-3 py-2">Two-person lift, gloves</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Incident Data Analysis</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Review accident reports for root causes</li>
                  <li className="pl-1">Analyse near-miss reports for patterns</li>
                  <li className="pl-1">Track first-aid cases by type and location</li>
                  <li className="pl-1">Identify common contributing factors</li>
                  <li className="pl-1">Compare with industry incident data</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heinrich's Triangle</p>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="text-xs text-white/70 mb-2">For every:</p>
                  <p className="text-lg font-bold text-red-400">1 Serious Injury</p>
                  <p className="text-xs text-white/70 my-1">there are</p>
                  <p className="text-lg font-bold text-orange-400">29 Minor Injuries</p>
                  <p className="text-xs text-white/70 my-1">and</p>
                  <p className="text-lg font-bold text-yellow-400">300 Near Misses</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Near Miss Importance</p>
              <p className="text-sm text-white/90">
                Near misses are 'free lessons' - incidents where harm could have occurred but didn't.
                They reveal the same hazards and system failures as actual injuries but without the human cost.
                Organisations with strong near-miss reporting cultures have significantly lower injury rates.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> JSAs should be developed with input from workers who actually perform the task - they know the real hazards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Checklists, Observation and Hazard Categories */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Checklists, Observation Techniques and Hazard Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Checklists and structured observation techniques ensure consistent, thorough hazard identification.
              Understanding hazard categories helps ensure nothing is overlooked in building services environments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Use of Checklists</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-green-400 text-sm mb-2">Advantages</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Ensures consistent coverage</li>
                    <li className="pl-1">Prompts for easily forgotten items</li>
                    <li className="pl-1">Provides audit trail</li>
                    <li className="pl-1">Useful for training inspectors</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-red-400 text-sm mb-2">Limitations</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Can become tick-box exercise</li>
                    <li className="pl-1">May miss unlisted hazards</li>
                    <li className="pl-1">Generic lists miss site-specific issues</li>
                    <li className="pl-1">Must be kept current</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Observation Techniques</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technique</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Behavioural observation</td>
                      <td className="border border-white/10 px-3 py-2">Watch work as normally performed</td>
                      <td className="border border-white/10 px-3 py-2">Identifying unsafe acts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety tours</td>
                      <td className="border border-white/10 px-3 py-2">Management walkabouts</td>
                      <td className="border border-white/10 px-3 py-2">General awareness, engagement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety sampling</td>
                      <td className="border border-white/10 px-3 py-2">Check specific items randomly</td>
                      <td className="border border-white/10 px-3 py-2">PPE compliance, housekeeping</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Task observation</td>
                      <td className="border border-white/10 px-3 py-2">Watch complete task performance</td>
                      <td className="border border-white/10 px-3 py-2">Validating JSAs, training needs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Hazard Categories</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-400 mb-2">Electrical Hazards</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Electric shock (direct/indirect contact)</li>
                    <li className="pl-1">Arc flash and arc blast</li>
                    <li className="pl-1">Burns from overheated equipment</li>
                    <li className="pl-1">Fire from electrical faults</li>
                    <li className="pl-1">Explosion in hazardous areas</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <p className="font-medium text-blue-400 mb-2">Mechanical Hazards</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Moving parts (fans, pumps, belts)</li>
                    <li className="pl-1">Pressure systems (compressors, vessels)</li>
                    <li className="pl-1">Lifting equipment failure</li>
                    <li className="pl-1">Falling objects</li>
                    <li className="pl-1">Sharp edges and projections</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="font-medium text-green-400 mb-2">Environmental Hazards</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Working at height</li>
                    <li className="pl-1">Confined spaces</li>
                    <li className="pl-1">Asbestos (in older buildings)</li>
                    <li className="pl-1">Extreme temperatures</li>
                    <li className="pl-1">Noise exposure</li>
                    <li className="pl-1">Poor lighting</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <p className="font-medium text-purple-400 mb-2">Ergonomic Hazards</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Manual handling (cables, equipment)</li>
                    <li className="pl-1">Repetitive movements</li>
                    <li className="pl-1">Awkward postures</li>
                    <li className="pl-1">Prolonged standing/kneeling</li>
                    <li className="pl-1">Vibrating tools (HAVs)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Comprehensive approach:</strong> Check all four hazard categories for every task - electrical work involves more than just electrical hazards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Principles for Hazard Identification</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Be systematic</strong> - use checklists, categories, and structured methods</li>
                <li className="pl-1"><strong>Involve workers</strong> - they know the real hazards from daily experience</li>
                <li className="pl-1"><strong>Look at actual work</strong> - not just procedures and policies</li>
                <li className="pl-1"><strong>Consider variations</strong> - what happens when things aren't normal?</li>
                <li className="pl-1"><strong>Document and act</strong> - identification without action is pointless</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Management of Health and Safety at Work Regulations 1999 - requires risk assessment</li>
                <li className="pl-1">RIDDOR 2013 - requires reporting of specified incidents</li>
                <li className="pl-1">HASAWA 1974 - general duty to identify and control hazards</li>
                <li className="pl-1">CDM Regulations 2015 - specific requirements for construction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic assessments</strong> - copying without site-specific consideration</li>
                <li className="pl-1"><strong>Desk-based only</strong> - not physically inspecting the work area</li>
                <li className="pl-1"><strong>Ignoring near misses</strong> - missing valuable leading indicators</li>
                <li className="pl-1"><strong>One-time exercise</strong> - not reviewing when conditions change</li>
                <li className="pl-1"><strong>Worker exclusion</strong> - not involving those who do the work</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Hazard Identification Methods</p>
                <ul className="space-y-0.5">
                  <li>Workplace inspections - systematic area checks</li>
                  <li>Task analysis - breaking down work steps</li>
                  <li>JSA/JHA - job-specific hazard identification</li>
                  <li>Incident data analysis - learning from events</li>
                  <li>Checklists - consistent coverage tool</li>
                  <li>Behavioural observation - watching actual work</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services Hazard Categories</p>
                <ul className="space-y-0.5">
                  <li>Electrical - shock, arc flash, burns, fire</li>
                  <li>Mechanical - moving parts, pressure, lifting</li>
                  <li>Environmental - height, confined space, asbestos</li>
                  <li>Ergonomic - manual handling, posture, vibration</li>
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

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2-2">
              Next: Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section2_1;
