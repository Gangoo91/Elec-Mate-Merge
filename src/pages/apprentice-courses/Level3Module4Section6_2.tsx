import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

// SEO metadata
const seoTitle = "Working Under Pressure and Meeting Deadlines - Level 3 Fault Diagnosis";
const seoDescription = "Learn strategies for managing time effectively and working efficiently under pressure in electrical fault diagnosis, including prioritisation techniques, stress management, and deadline negotiation.";

// Quick check questions for inline knowledge checks
const quickCheckQuestions = [
  {
    question: "When under time pressure during fault diagnosis, what should NEVER be compromised?",
    options: ["Documentation quality", "Customer communication", "Safety procedures", "Test equipment calibration dates"],
    correctAnswer: 2,
    explanation: "Safety must never be compromised regardless of time pressure. Shortcuts that risk safety can lead to injury, death, or fire. Other aspects may be adapted within reason, but safe working practices are non-negotiable."
  },
  {
    question: "A customer demands you complete an urgent repair faster than safely possible. What should you do?",
    options: ["Work faster to meet their demands", "Explain the safety requirements and provide realistic timescales", "Leave the job immediately", "Complete the work but don't certify it"],
    correctAnswer: 1,
    explanation: "Professional practice requires explaining why the work cannot be done faster without compromising safety. Provide realistic timescales and help the customer understand the implications of rushing safety-critical work."
  },
  {
    question: "What is the most effective way to handle multiple urgent callouts on the same day?",
    options: ["Accept all jobs and work through the night", "Prioritise based on safety risk and communicate with all customers", "Only attend the highest-paying job", "Complete half of each job"],
    correctAnswer: 1,
    explanation: "Effective management involves prioritising based on safety risk and urgency, then communicating honestly with all customers about realistic timescales. This maintains trust while ensuring the most critical situations are addressed first."
  },
  {
    question: "When you realise a job will take longer than quoted, when should you inform the customer?",
    options: ["After the work is complete", "When presenting the final invoice", "As soon as you become aware of the issue", "Only if they ask"],
    correctAnswer: 2,
    explanation: "Professional practice requires informing the customer as soon as you realise timescales or costs will exceed estimates. Early communication allows them to make informed decisions and maintains trust."
  }
];

// Quiz questions for end of section assessment
const quizQuestions = [
  {
    question: "What is the primary cause of stress when working on fault diagnosis under time pressure?",
    options: ["Physical exertion", "Uncertainty and perceived lack of control", "Technical complexity", "Equipment availability"],
    correctAnswer: 1,
    explanation: "Stress often stems from uncertainty and feeling out of control. Having systematic approaches, clear priorities, and good communication helps restore a sense of control and reduces stress even in demanding situations."
  },
  {
    question: "Which approach to time management is most effective for fault diagnosis work?",
    options: ["Always quote fixed times to appear confident", "Build contingency into estimates and communicate ranges", "Refuse to provide time estimates", "Complete all diagnosis before discussing timescales"],
    correctAnswer: 1,
    explanation: "Effective time management involves providing realistic ranges that include contingency for unexpected complications. This sets appropriate expectations and reduces pressure when issues arise."
  },
  {
    question: "When multiple tasks compete for your time, what should determine priority?",
    options: ["Which customer is most assertive", "Which job pays the most", "Safety risk, urgency, and customer impact", "Order in which jobs were received"],
    correctAnswer: 2,
    explanation: "Priority should be determined by safety risk first, then genuine urgency, and customer impact. A property without power or with a safety hazard takes precedence over routine work regardless of booking order."
  },
  {
    question: "How can systematic fault diagnosis methodology help with time pressure?",
    options: ["It eliminates all pressure", "It provides structure and prevents wasted effort", "It guarantees quick resolution", "It removes the need for customer communication"],
    correctAnswer: 1,
    explanation: "A systematic approach provides structure, ensures nothing is missed, and prevents wasted effort from random troubleshooting. This methodical process is actually faster than haphazard approaches and reduces stress."
  },
  {
    question: "What should you do if safety cannot be maintained due to time constraints?",
    options: ["Take calculated risks to meet the deadline", "Stop work and discuss options with the customer", "Complete the work but document your concerns", "Work faster to minimise exposure time"],
    correctAnswer: 1,
    explanation: "If safety cannot be maintained, work must stop. Discuss the situation with the customer, explain why more time is needed, and agree a revised plan that allows safe completion of the work."
  },
  {
    question: "How should you prepare for a callout where you know time will be critical?",
    options: ["Skip preparation to save time for the actual work", "Gather information, plan approach, and ensure equipment is ready", "Bring all equipment regardless of likely need", "Arrive as quickly as possible without planning"],
    correctAnswer: 1,
    explanation: "Good preparation saves time during the actual work. Gathering information about the fault, planning your approach, and ensuring appropriate equipment is ready reduces wasted time on site."
  },
  {
    question: "What is a key sign that you are taking on too much work?",
    options: ["You are busy all the time", "You are consistently missing deadlines and feeling overwhelmed", "Customers ask for urgent appointments", "You have to work some weekends"],
    correctAnswer: 1,
    explanation: "Consistently missing deadlines and feeling overwhelmed indicates unsustainable workload. Some busy periods are normal, but persistent overcommitment affects quality, safety, and wellbeing."
  },
  {
    question: "How can good record-keeping help manage time pressure?",
    options: ["It doesn't - documentation takes time away from productive work", "Previous records help diagnose recurring issues faster", "Records eliminate the need for testing", "Documentation should be skipped when busy"],
    correctAnswer: 1,
    explanation: "Good records from previous visits can significantly speed up diagnosis of recurring issues. Documentation invested now saves time in future and protects you professionally."
  },
  {
    question: "When should you decline or defer work?",
    options: ["Never - always accept available work", "When taking on more would compromise quality or safety", "Only when the pay is too low", "When the customer is difficult"],
    correctAnswer: 1,
    explanation: "Professional practice sometimes requires declining or deferring work when accepting it would compromise quality, safety, or existing commitments. Overcommitment harms everyone."
  },
  {
    question: "What role does physical and mental wellbeing play in working under pressure?",
    options: ["No role - professionalism overcomes fatigue", "Wellbeing directly affects judgement, safety, and performance", "Only affects customer interactions", "Only relevant for office workers"],
    correctAnswer: 1,
    explanation: "Physical and mental wellbeing directly affects judgement, concentration, and safety performance. Fatigue and stress impair decision-making and increase accident risk."
  },
  {
    question: "How should you handle a situation where you make an error due to rushing?",
    options: ["Cover it up to avoid embarrassment", "Acknowledge the error, inform affected parties, and correct it", "Blame time pressure from the customer", "Complete the job quickly and leave"],
    correctAnswer: 1,
    explanation: "Professional integrity requires acknowledging errors, informing affected parties, and taking corrective action. Attempting to hide mistakes can compound problems and creates liability."
  },
  {
    question: "What is the benefit of scheduling buffer time between jobs?",
    options: ["It reduces earnings", "It allows for overruns and reduces cascading delays", "It's only needed for inexperienced electricians", "Customers prefer back-to-back scheduling"],
    correctAnswer: 1,
    explanation: "Buffer time between jobs allows for inevitable overruns without creating cascading delays. This reduces stress, maintains customer relationships, and provides time for proper documentation."
  }
];

// FAQ data
const faqs = [
  {
    question: "How do I estimate time accurately for fault diagnosis when I don't know what's wrong?",
    answer: "Explain to customers that fault diagnosis is investigative and timescales depend on what is found. Provide ranges based on experience: simple faults typically take 30-60 minutes, moderate issues 1-2 hours, complex or intermittent faults may require 2-4 hours or multiple visits. Agree an initial investigation period after which you'll report findings and provide revised estimates. This manages expectations while allowing flexibility for the unpredictable nature of diagnosis work."
  },
  {
    question: "What should I do when I'm running late for an appointment?",
    answer: "Contact the customer as soon as you know you'll be late, even if only by a few minutes. Apologise briefly, give a realistic new arrival time with some contingency, and offer to reschedule if the delay is significant and doesn't suit them. Most customers appreciate the courtesy of being informed and can adjust their plans accordingly. Repeated lateness damages your reputation, so address underlying causes if it's a pattern."
  },
  {
    question: "How can I work faster without compromising safety?",
    answer: "Focus on efficiency rather than speed. Good preparation (right tools, clear information, systematic approach) eliminates wasted time. Use checklists to ensure nothing is missed. Maintain organised tools and van so equipment is quickly accessible. Develop muscle memory through practice so routine tasks become automatic. These improvements save time without rushing safety-critical decisions or procedures. Accept that some work genuinely cannot be done faster safely."
  },
  {
    question: "What are the warning signs of burnout from working under constant pressure?",
    answer: "Warning signs include persistent fatigue despite rest, difficulty concentrating, increased errors or forgetfulness, feeling detached from work, irritability with customers or colleagues, dreading going to work, and physical symptoms like headaches or sleep problems. If you notice these signs, take action before the situation worsens: review your workload, set boundaries, take proper breaks, and seek support if needed. Burnout affects safety as well as wellbeing."
  },
  {
    question: "How do I handle customers who create artificial urgency to get priority?",
    answer: "Some customers exaggerate urgency to jump the queue. Ask specific questions to assess genuine priority: Is there a safety hazard? Are people without power? What's the actual impact of waiting? Explain how you prioritise work and why genuine emergencies take precedence. If you suspect exaggeration, offer the next available routine appointment while remaining professional. Trust your judgement about genuine versus artificial urgency based on the specific circumstances described."
  },
  {
    question: "Should I work longer hours to meet commitments when overloaded?",
    answer: "Extended hours may be necessary occasionally but shouldn't become routine. Fatigue impairs judgement and increases accident risk - working tired on electrical systems is dangerous. Long hours also affect quality and customer service. If extended hours are frequently needed, address the underlying cause: over-commitment, poor estimation, or inefficient working practices. Set sustainable boundaries and learn to decline work when necessary rather than compromising safety and wellbeing."
  }
];

const Level3Module4Section6_2 = () => {
  useSEO(seoTitle, seoDescription);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400/80 text-xs sm:text-sm font-medium tracking-wider uppercase">
              Level 3 Module 4 - Section 6.2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Working Under Pressure and Meeting Deadlines
          </h1>
          <p className="text-lg sm:text-xl text-white/70">
            Managing time effectively and working efficiently under pressure situations
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-xl border border-yellow-400/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What You Will Learn</h2>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Recognise common sources of pressure in fault diagnosis work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Apply effective prioritisation techniques for multiple demands</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Manage stress while maintaining safety and quality standards</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Negotiate realistic deadlines with customers and employers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Develop sustainable work practices that prevent burnout</span>
            </li>
          </ul>
        </section>

        {/* Section 01: Understanding Pressure in Electrical Work */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Understanding Pressure in Electrical Work</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Pressure is inherent in fault diagnosis work. Customers are often without power or facing safety concerns, creating genuine urgency. Understanding the sources and nature of pressure helps you respond effectively while maintaining professional standards.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Common Sources of Pressure</h3>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Customer-Related Pressure</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Properties without power affecting daily life and work</li>
                <li>Safety concerns causing anxiety and fear</li>
                <li>Business customers losing income due to electrical failures</li>
                <li>Time constraints from customer commitments and schedules</li>
                <li>Unrealistic expectations about diagnosis timescales</li>
                <li>Previous bad experiences creating mistrust</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Work-Related Pressure</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Multiple callouts competing for attention</li>
                <li>Complex faults taking longer than expected</li>
                <li>Missing parts or equipment delaying completion</li>
                <li>Access limitations restricting working time</li>
                <li>Environmental conditions affecting work speed</li>
                <li>Regulatory and documentation requirements</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Self-Imposed Pressure</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Over-optimistic time estimates to win work</li>
                <li>Taking on too many commitments</li>
                <li>Perfectionism beyond what the situation requires</li>
                <li>Reluctance to communicate difficulties early</li>
                <li>Financial pressure to maximise billable work</li>
                <li>Pride preventing asking for help</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">The Pressure-Performance Relationship</h3>
            <p className="text-white/80 text-sm mb-3">
              Some pressure can enhance performance by increasing focus and motivation. However, excessive pressure causes:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li><strong>Reduced concentration:</strong> Missing important observations during diagnosis</li>
              <li><strong>Poor decision-making:</strong> Rushing to conclusions without proper verification</li>
              <li><strong>Safety shortcuts:</strong> Skipping safety procedures to save time</li>
              <li><strong>Communication breakdown:</strong> Failing to keep customers informed</li>
              <li><strong>Quality issues:</strong> Incomplete repairs or inadequate testing</li>
              <li><strong>Documentation gaps:</strong> Skipping records that provide protection</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctAnswer={quickCheckQuestions[0].correctAnswer}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Prioritisation and Time Management */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Prioritisation and Time Management</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Effective prioritisation ensures the most important and urgent work receives attention first. Good time management maximises productive use of available time while maintaining sustainable workload.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Priority Assessment Framework</h3>
            <p className="text-white/80 text-sm mb-3">
              When multiple demands compete for attention, assess each based on:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-white/80 border border-white/20">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">Priority Level</th>
                    <th className="border border-white/20 p-2 text-left">Characteristics</th>
                    <th className="border border-white/20 p-2 text-left">Response</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-2 text-red-400 font-semibold">Critical</td>
                    <td className="border border-white/20 p-2">Immediate safety hazard, risk to life</td>
                    <td className="border border-white/20 p-2">Attend immediately, defer other work</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2 text-orange-400 font-semibold">Urgent</td>
                    <td className="border border-white/20 p-2">Property without essential services, significant business impact</td>
                    <td className="border border-white/20 p-2">Attend same day, communicate delays to other customers</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2 text-yellow-400 font-semibold">Important</td>
                    <td className="border border-white/20 p-2">Significant inconvenience, scheduled commitments</td>
                    <td className="border border-white/20 p-2">Schedule promptly, honour existing appointments</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2 text-green-400 font-semibold">Routine</td>
                    <td className="border border-white/20 p-2">Planned work, flexible timing</td>
                    <td className="border border-white/20 p-2">Schedule at mutual convenience</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Effective Scheduling Practices</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li><strong>Buffer time:</strong> Leave gaps between appointments for overruns</li>
                <li><strong>Travel consideration:</strong> Account for realistic travel times</li>
                <li><strong>Complexity matching:</strong> Avoid scheduling complex work back-to-back</li>
                <li><strong>Documentation time:</strong> Include time for paperwork and certificates</li>
                <li><strong>Equipment preparation:</strong> Allow time to load van and check equipment</li>
                <li><strong>Emergency capacity:</strong> Leave some flexibility for urgent callouts</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Time Estimation Techniques</h3>
            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Realistic Estimation Approach:</h4>
              <ol className="list-decimal pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Base estimate:</strong> How long would this typically take in ideal conditions?</li>
                <li><strong>Add contingency:</strong> Include 20-30% for unexpected complications</li>
                <li><strong>Consider specifics:</strong> Account for access, property age, complexity indicators</li>
                <li><strong>Communicate ranges:</strong> Provide realistic ranges rather than fixed times</li>
                <li><strong>Update as needed:</strong> Revise estimates when new information emerges</li>
              </ol>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Managing Multiple Jobs</h3>
            <p className="text-white/80 text-sm mb-3">
              When handling several jobs simultaneously:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Keep a clear record of all commitments and deadlines</li>
              <li>Communicate proactively with all affected customers</li>
              <li>Complete jobs fully rather than jumping between partial completions</li>
              <li>Identify and address the genuine priorities first</li>
              <li>Be honest about what can realistically be achieved</li>
              <li>Seek help or delegate when overloaded</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctAnswer={quickCheckQuestions[1].correctAnswer}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Maintaining Safety Under Pressure */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Maintaining Safety Under Pressure</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Safety must remain the absolute priority regardless of time pressure. Rushing electrical work can result in electric shock, fire, or death. Understanding how pressure affects safety decisions helps maintain appropriate standards.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Common Safety Shortcuts Under Pressure</h3>
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-500/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Never compromise on these safety requirements:</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li>Isolation and proving dead before working on circuits</li>
                <li>Safe isolation procedures and lock-off</li>
                <li>Appropriate personal protective equipment</li>
                <li>Proper testing sequence before energising</li>
                <li>Verification that repairs are correctly completed</li>
                <li>Documentation of safety-critical work</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Recognising Dangerous Mindsets</h3>
            <p className="text-white/80 text-sm mb-3">
              Be alert to thought patterns that indicate pressure is affecting safety judgement:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>"Just this once won't hurt" - every shortcut creates risk</li>
                <li>"I'll be quick" - speed doesn't reduce electrical hazards</li>
                <li>"I've done this hundreds of times" - familiarity breeds complacency</li>
                <li>"The customer is waiting" - customer inconvenience never justifies safety risks</li>
                <li>"It's probably isolated" - probably isn't good enough</li>
                <li>"I'll test it afterwards" - some mistakes can't be fixed afterwards</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">When to Stop Work</h3>
            <p className="text-white/80 text-sm mb-3">
              Professional practice requires stopping work when:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>You cannot maintain safe working practices</li>
              <li>Pressure is causing you to consider shortcuts</li>
              <li>Fatigue is affecting your concentration or judgement</li>
              <li>Environmental conditions become unsafe</li>
              <li>You don't have the right equipment or expertise</li>
              <li>New hazards are discovered that weren't anticipated</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Having the Safety Conversation</h3>
            <p className="text-white/80 text-sm mb-3">
              When you need to explain why work cannot proceed as quickly as hoped:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Explain the specific safety requirements clearly</li>
                <li>Describe the consequences of shortcuts (injury, fire, death)</li>
                <li>Emphasise that you're protecting them, not being difficult</li>
                <li>Provide realistic timescales that allow safe completion</li>
                <li>Offer alternatives where possible (temporary measures, phased work)</li>
                <li>Document the discussion if the customer pressures you</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctAnswer={quickCheckQuestions[2].correctAnswer}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 04: Stress Management Techniques */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Stress Management Techniques</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Managing stress effectively is essential for maintaining safety, quality, and personal wellbeing. Practical techniques help you remain calm and focused even in demanding situations.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Immediate Stress Responses</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">When pressure builds during a job:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li><strong>Pause:</strong> Take a moment to step back and assess the situation</li>
                <li><strong>Breathe:</strong> Slow, deep breaths reduce the physical stress response</li>
                <li><strong>Prioritise:</strong> Identify what actually needs to happen next</li>
                <li><strong>Simplify:</strong> Break complex problems into manageable steps</li>
                <li><strong>Communicate:</strong> Sharing concerns reduces their weight</li>
                <li><strong>Focus:</strong> Concentrate on the current task, not everything else</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Preparation Reduces Stress</h3>
            <p className="text-white/80 text-sm mb-3">
              Good preparation minimises stress during jobs:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Gather information before arriving to plan your approach</li>
              <li>Ensure equipment is ready, charged, and calibrated</li>
              <li>Allow adequate travel time to avoid arriving flustered</li>
              <li>Review similar previous jobs for relevant experience</li>
              <li>Prepare mentally for likely challenges</li>
              <li>Have contingency plans for common complications</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Daily Wellbeing Practices</h3>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Sustainable work practices:</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Rest:</strong> Get adequate sleep - fatigue impairs judgement and safety</li>
                <li><strong>Breaks:</strong> Take proper breaks during the day, especially on difficult jobs</li>
                <li><strong>Nutrition:</strong> Eat properly - blood sugar affects concentration</li>
                <li><strong>Hydration:</strong> Drink water throughout the day</li>
                <li><strong>Exercise:</strong> Physical activity reduces stress and improves resilience</li>
                <li><strong>Boundaries:</strong> Maintain separation between work and personal time</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Seeking Support</h3>
            <p className="text-white/80 text-sm mb-3">
              Recognise when you need support and know where to find it:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Discuss difficult situations with colleagues or mentors</li>
              <li>Talk to your employer if workload is unsustainable</li>
              <li>Use industry support services if struggling</li>
              <li>Consider professional help for persistent stress or anxiety</li>
              <li>Build a network of people you can call for advice</li>
              <li>Don't suffer in silence - many have faced similar challenges</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 4 */}
        <InlineCheck
          question={quickCheckQuestions[3].question}
          options={quickCheckQuestions[3].options}
          correctAnswer={quickCheckQuestions[3].correctAnswer}
          explanation={quickCheckQuestions[3].explanation}
        />

        {/* Section 05: Negotiating Realistic Deadlines */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Negotiating Realistic Deadlines</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Setting and negotiating realistic deadlines prevents pressure from becoming unmanageable. Honest communication about what is achievable builds trust and prevents disappointment.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Setting Initial Expectations</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Explain the investigative nature of fault diagnosis</li>
                <li>Provide realistic time ranges rather than fixed commitments</li>
                <li>Identify factors that could affect timescales</li>
                <li>Agree checkpoints for updating estimates</li>
                <li>Be clear about what is and isn't included</li>
                <li>Document agreed expectations in writing</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Renegotiating When Necessary</h3>
            <p className="text-white/80 text-sm mb-3">
              When original timescales prove unrealistic:
            </p>
            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Renegotiation Steps:</h4>
              <ol className="list-decimal pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Early notification:</strong> Inform the customer as soon as you realise</li>
                <li><strong>Explain the reason:</strong> Be honest about what has changed</li>
                <li><strong>Provide revised estimate:</strong> Give realistic new timescales</li>
                <li><strong>Offer options:</strong> Where possible, provide choices</li>
                <li><strong>Document changes:</strong> Confirm revised agreements in writing</li>
                <li><strong>Apologise appropriately:</strong> Acknowledge any inconvenience caused</li>
              </ol>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Declining Unrealistic Requests</h3>
            <p className="text-white/80 text-sm mb-3">
              Sometimes you must decline work or timescales that aren't achievable:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Explain why the requested timescale isn't possible</li>
              <li>Offer the earliest realistic alternative</li>
              <li>Suggest other electricians if they need faster response</li>
              <li>Don't be pressured into unsafe commitments</li>
              <li>Remain professional even when declining</li>
              <li>Document the discussion for your records</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Managing Employer Expectations</h3>
            <p className="text-white/80 text-sm mb-3">
              When employed, communicate effectively with your employer about workload:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Provide honest assessments of job complexity and duration</li>
              <li>Flag scheduling conflicts early</li>
              <li>Explain when workload is becoming unsustainable</li>
              <li>Suggest solutions rather than just highlighting problems</li>
              <li>Maintain accurate records of time spent on jobs</li>
              <li>Discuss patterns that indicate systemic issues</li>
            </ul>
          </div>
        </section>

        {/* Practical Guidance Section */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">The 80/20 Rule</h3>
              <p className="text-white/70 text-sm">
                In fault diagnosis, 80% of faults often come from 20% of causes. Focus your systematic approach on the most likely causes first. This efficient approach resolves most faults quickly, leaving time and energy for the more complex cases.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Learn from Pressure</h3>
              <p className="text-white/70 text-sm">
                After particularly pressured jobs, reflect on what happened and what could be done differently. Were estimates unrealistic? Could preparation have been better? Use these insights to improve future practice rather than just moving on.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Build Your Toolkit</h3>
              <p className="text-white/70 text-sm">
                Having the right equipment, well-organised and readily available, saves significant time. Invest in quality tools, keep your van organised, maintain equipment properly, and ensure common consumables are always stocked.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 sm:p-6">
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Box */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Priority Levels</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Critical: Immediate safety hazard</li>
                <li>Urgent: Essential services affected</li>
                <li>Important: Scheduled commitments</li>
                <li>Routine: Flexible timing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Never Compromise</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Safe isolation procedures</li>
                <li>Proving dead before work</li>
                <li>PPE requirements</li>
                <li>Proper testing sequence</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">When Under Pressure</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Pause and breathe</li>
                <li>Identify priorities</li>
                <li>Break into steps</li>
                <li>Communicate proactively</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Warning Signs</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Considering shortcuts</li>
                <li>Feeling overwhelmed</li>
                <li>Missing deadlines regularly</li>
                <li>Persistent fatigue</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8 sm:mb-12">
          <Quiz
            title="Section 6.2 Knowledge Check"
            questions={quizQuestions}
            passingScore={75}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-black hover:bg-white/10 hover:text-white" asChild>
            <Link to="../level3-module4-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Communication with Clients
            </Link>
          </Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" asChild>
            <Link to="../level3-module4-section6-3">
              Next: Costing and Explaining Remedial Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module4Section6_2;
