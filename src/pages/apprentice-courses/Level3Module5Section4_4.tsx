/**
 * Level 3 Module 5 Section 4.4 - Client Handover and Demonstration of Systems
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Client Handover and Demonstration of Systems - Level 3 Module 5 Section 4.4";
const DESCRIPTION = "Master client handover procedures including system demonstrations, documentation provision, and explaining installation operation for safe and effective use.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of client handover?",
    options: [
      "To get the invoice signed",
      "To transfer responsibility and ensure the client can safely operate the installation",
      "To demonstrate technical knowledge",
      "To complete paperwork only"
    ],
    correctIndex: 1,
    explanation: "Handover transfers responsibility from contractor to client. The client must understand how to safely operate the installation, when to test safety devices, and who to contact for maintenance. Without proper handover, the client may misuse equipment."
  },
  {
    id: "check-2",
    question: "According to BS 7671, what documentation must be provided to the client?",
    options: [
      "Only an invoice",
      "Installation certificate, schedule of inspections, schedule of test results, and operating instructions",
      "Just a completion note",
      "Only the test results"
    ],
    correctIndex: 1,
    explanation: "Regulation 644.1 requires the person carrying out verification to provide an Electrical Installation Certificate (or MEIWC), schedule of inspections, schedule of test results, and manufacturer operating instructions/maintenance guidance."
  },
  {
    id: "check-3",
    question: "What should be demonstrated to the client regarding RCD protection?",
    options: [
      "Nothing - they'll figure it out",
      "Location of RCDs, purpose, how to reset, and the need for periodic testing using the test button",
      "Only how to reset after tripping",
      "Only where the test button is"
    ],
    correctIndex: 1,
    explanation: "Clients must understand RCD location and purpose, how to reset after tripping, and that they should test RCDs quarterly using the test button. Reg 514.12.2 requires a notice advising periodic testing."
  },
  {
    id: "check-4",
    question: "What information should be given regarding emergency procedures?",
    options: [
      "Nothing unless asked",
      "Location of main isolation, how to isolate in emergency, and who to contact",
      "Only the electrician's phone number",
      "Only fire exit locations"
    ],
    correctIndex: 1,
    explanation: "Clients must know where the main isolation is located and how to use it in an emergency. They should know who to contact for electrical emergencies and maintenance. This is essential safety information."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When should client handover take place?",
    options: [
      "At any time convenient for the electrician",
      "After verification is complete and before the client takes responsibility",
      "Before testing",
      "Only if the client requests it"
    ],
    correctAnswer: 1,
    explanation: "Handover occurs after all verification, testing and commissioning is complete, but before the client takes over responsibility for the installation. This ensures they receive a fully operational, tested installation with complete documentation."
  },
  {
    id: 2,
    question: "What does Regulation 514.12.2 require regarding RCD testing?",
    options: [
      "Nothing specific",
      "A notice to be fixed in a prominent position advising periodic testing",
      "Only verbal advice",
      "Testing by the electrician annually"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.12.2 requires a notice fixed in a prominent position recommending that the user should periodically press the RCD test button. The typical recommendation is quarterly testing."
  },
  {
    id: 3,
    question: "What should be explained about consumer unit labelling?",
    options: [
      "Nothing - it's self-explanatory",
      "What each circuit supplies and how to identify circuits in an emergency",
      "Only the circuit numbers",
      "Only the main switch"
    ],
    correctAnswer: 1,
    explanation: "The client should understand the circuit schedule so they can isolate specific circuits when needed and identify what has tripped if there's a problem. Clear explanation of labelling helps with emergency isolation and fault finding."
  },
  {
    id: 4,
    question: "What operating instructions must be provided with the installation?",
    options: [
      "Only if requested",
      "Manufacturer's instructions for all installed equipment requiring user attention",
      "Only for complex systems",
      "A general electrical safety leaflet"
    ],
    correctAnswer: 1,
    explanation: "Manufacturer's instructions for equipment like heating controls, time switches, ventilation systems, and smart home devices should be handed over. The client needs these to operate the equipment correctly and safely."
  },
  {
    id: 5,
    question: "What should the client be told about circuit alterations?",
    options: [
      "They can do anything they like",
      "That modifications should only be undertaken by competent persons",
      "That no changes are ever allowed",
      "Nothing about future work"
    ],
    correctAnswer: 1,
    explanation: "Clients should understand that electrical alterations require competent persons. DIY electrical work can be dangerous and may not comply with Building Regulations. Future work should be done by qualified electricians."
  },
  {
    id: 6,
    question: "How should complex control systems be demonstrated?",
    options: [
      "Just leave the manual",
      "Walk through all operating modes, settings, and typical adjustments the client may need",
      "Only show the on/off switch",
      "Send a video link later"
    ],
    correctAnswer: 1,
    explanation: "Complex systems (heating controls, BMS, smart home) require thorough demonstration. Walk through normal operation, how to adjust settings, what indicators mean, and common issues. Allow time for questions."
  },
  {
    id: 7,
    question: "What warranty or guarantee information should be discussed at handover?",
    options: [
      "Nothing - warranties are separate",
      "Duration, coverage, who to contact, and any conditions that may void warranty",
      "Only if there's a written warranty",
      "Only for expensive equipment"
    ],
    correctAnswer: 1,
    explanation: "Clients should understand what warranties apply (workmanship, equipment manufacturer), how long they last, who to contact for claims, and any conditions (like annual servicing) that must be met to maintain warranty."
  },
  {
    id: 8,
    question: "What periodic maintenance requirements should be explained?",
    options: [
      "None - electrical work doesn't need maintenance",
      "Recommended periodic inspection intervals, RCD testing, and any equipment servicing needs",
      "Only if asked",
      "Only for commercial premises"
    ],
    correctAnswer: 1,
    explanation: "Clients should know about recommended periodic inspection (typically 5-10 years for domestic, varies for other premises), quarterly RCD testing, and any specific equipment maintenance (like ventilation filters, battery backup testing)."
  },
  {
    id: 9,
    question: "A client struggles to understand the heating control system. What should you do?",
    options: [
      "Leave them with the manual",
      "Take time to ensure they understand, offer a follow-up visit if needed",
      "That's not your responsibility",
      "Tell them to call the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Part of professional handover is ensuring the client can actually use what you've installed. If they don't understand, take more time or offer a follow-up. An installation the client can't use properly is a poor outcome."
  },
  {
    id: 10,
    question: "What documentation should be retained by the contractor after handover?",
    options: [
      "Nothing - give everything to client",
      "Copies of certificates, test results, and any deviation approvals",
      "Only the invoice",
      "Only if asked by the client"
    ],
    correctAnswer: 1,
    explanation: "Contractors should retain copies of all certification and significant documentation. This provides evidence of compliance, assists with warranty issues, and helps if there are future queries. Good record keeping is professional practice."
  },
  {
    id: 11,
    question: "What should be explained about smoke and CO alarm testing?",
    options: [
      "Nothing - alarms are separate from electrical work",
      "Location, test procedure, battery replacement, and how often to test",
      "Only point out where they are",
      "Only if you installed them"
    ],
    correctAnswer: 1,
    explanation: "If smoke or CO alarms are part of the installation, demonstrate their location, how to test (test button), battery replacement procedure if applicable, and that they should be tested weekly. These are life-safety devices."
  },
  {
    id: 12,
    question: "What is 'practical completion' in relation to handover?",
    options: [
      "When payment is received",
      "When the installation is complete, tested, and ready for use with minor snagging only",
      "When the certificate is signed",
      "When the client moves in"
    ],
    correctAnswer: 1,
    explanation: "Practical completion is when the installation is substantially complete, verified, and ready for beneficial use - even if minor 'snagging' items remain. Handover typically occurs at practical completion, with snagging addressed promptly after."
  }
];

const faqs = [
  {
    question: "What if the client refuses to sign acknowledging receipt of documents?",
    answer: "Document that you offered the documents and the client refused. Keep your copies. Send documents by recorded delivery if necessary. The client's refusal doesn't remove your obligation to provide them, but you have evidence of offering them."
  },
  {
    question: "Should handover be to the property owner or tenant?",
    answer: "Ideally to the person who commissioned the work (usually property owner or their agent). For rental properties, the landlord should receive certification. Operating instructions may be shared with tenants. Discuss with the client who should receive what."
  },
  {
    question: "How do I handle handover for work I didn't design?",
    answer: "You can still hand over the installation you built. Explain the design was by others if relevant. Provide all certificates and test results. If you have concerns about the design, raise them with the designer/client before handover."
  },
  {
    question: "What if minor snagging remains at handover?",
    answer: "Handover can proceed at practical completion with a documented snagging list. Both parties should sign the list agreeing what will be resolved. Complete snagging promptly - it's unprofessional to leave loose ends."
  },
  {
    question: "How long should a handover meeting take?",
    answer: "Allow sufficient time - typically 30-60 minutes for a domestic installation, longer for commercial or complex systems. Rushing handover leads to confused clients and callbacks. Build adequate handover time into your project planning."
  },
  {
    question: "What if the client doesn't attend the arranged handover?",
    answer: "Document the missed appointment. Attempt to reschedule. If the client repeatedly fails to attend, send documents by recorded delivery with a cover letter explaining they should contact you with any questions. Keep evidence of your attempts."
  }
];

const Level3Module5Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Client Handover and Demonstration of Systems
          </h1>
          <p className="text-white/80">
            Professional handover ensuring clients can safely operate their installation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Transfer responsibility safely</li>
              <li><strong>Documents:</strong> EIC, schedules, instructions</li>
              <li><strong>Demonstrate:</strong> Main isolation, RCDs, controls</li>
              <li><strong>Explain:</strong> Maintenance needs, who to contact</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Completed installation ready for use</li>
              <li><strong>Use:</strong> Structured handover meeting</li>
              <li><strong>Apply:</strong> Document acknowledgement of receipt</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and importance of professional handover",
              "Identify documentation required for client handover",
              "Demonstrate key system operations effectively",
              "Explain maintenance and testing requirements",
              "Ensure clients understand emergency procedures",
              "Document the handover process correctly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Purpose of Client Handover */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Client Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Client handover is the formal transfer of responsibility from contractor to client. It ensures the client receives a verified, documented installation they can safely operate. A good handover prevents misunderstandings, reduces callbacks, and is a mark of professional service.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key handover objectives:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Transfer responsibility:</strong> Client accepts the installation</li>
                <li><strong>Provide documentation:</strong> Certificates, test results, instructions</li>
                <li><strong>Enable safe operation:</strong> Client understands how to use it</li>
                <li><strong>Explain maintenance:</strong> What the client needs to do</li>
                <li><strong>Answer questions:</strong> Clear any uncertainties</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Before Handover</p>
                <p className="text-white/90 text-xs">Contractor responsible, installation not in use</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">During Handover</p>
                <p className="text-white/90 text-xs">Documentation, demonstration, questions</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">After Handover</p>
                <p className="text-white/90 text-xs">Client responsible, using the installation</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Handover is not just handing over keys - it's ensuring the client can safely and effectively use what you've installed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Documentation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Documentation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Regulation 644.1 specifies the documentation that must be provided. This includes certification proving the installation was properly verified, test results demonstrating compliance, and information enabling safe operation and future maintenance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electrical Installation Certificate (or MEIWC)</li>
                  <li>Schedule of Inspections</li>
                  <li>Schedule of Test Results</li>
                  <li>Circuit schedule/chart (Reg 514.9.1)</li>
                  <li>RCD test notice (Reg 514.12.2)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supporting Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Manufacturer's operating instructions</li>
                  <li>As-built drawings</li>
                  <li>Equipment datasheets</li>
                  <li>Warranty information</li>
                  <li>Commissioning records</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why documentation matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Legal evidence:</strong> Proves compliant installation</li>
                <li><strong>Future reference:</strong> Essential for periodic inspection</li>
                <li><strong>Insurance/mortgage:</strong> Often required for property transactions</li>
                <li><strong>Building regulations:</strong> Part P compliance evidence</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Keep copies of all documentation you provide. You may need to prove what was handed over, and clients sometimes lose documents.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: System Demonstration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            System Demonstration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demonstration ensures the client can actually operate the installation. Walk through each system, explain controls, demonstrate operation, and allow the client to try things while you're there to answer questions. Adjust your explanations to the client's technical understanding.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential demonstrations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Main isolation:</strong> Location and operation</li>
                <li><strong>Consumer unit:</strong> Circuit identification, what each MCB controls</li>
                <li><strong>RCDs:</strong> Purpose, test button, how to reset</li>
                <li><strong>Heating controls:</strong> Programming, adjusting temperatures</li>
                <li><strong>Security/fire systems:</strong> Operation, testing, what to do if activated</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Good Demonstration Practice</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Show, then let client try</li>
                  <li>Use simple language</li>
                  <li>Allow time for questions</li>
                  <li>Provide written operating guides</li>
                  <li>Check understanding</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Poor Practice</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Rushing through</li>
                  <li>Using technical jargon</li>
                  <li>Not checking understanding</li>
                  <li>Leaving before questions answered</li>
                  <li>Not allowing hands-on practice</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> Consider the client's situation. An elderly person may need simpler explanations and written reminders. A facilities manager may want technical detail.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Emergency and Maintenance Information */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Emergency and Maintenance Information
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Clients need to know what to do in an emergency and how to maintain their installation. This includes knowing where isolation points are, when to test RCDs, and who to contact for electrical emergencies and routine maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Emergency information to provide:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Main isolation location:</strong> How to turn off all electricity</li>
                <li><strong>What to do if:</strong> Smell burning, hear buzzing, see sparks</li>
                <li><strong>After tripping:</strong> How to identify problem, when to call electrician</li>
                <li><strong>Emergency contacts:</strong> Your details, DNO emergency number</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">RCD Testing</p>
                <p className="text-white/90 text-xs">Quarterly using test button</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Periodic Inspection</p>
                <p className="text-white/90 text-xs">Every 5-10 years for domestic</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Equipment Service</p>
                <p className="text-white/90 text-xs">Per manufacturer schedules</p>
              </div>
            </div>

            <p>
              Explain that alterations and additions should be done by competent electricians and may require notification to Building Control. Discourage DIY electrical work beyond changing light bulbs and like-for-like accessory replacements.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Provide in writing:</strong> Emergency contact numbers, RCD test reminder, and recommended periodic inspection interval on a simple handover sheet.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All documentation complete and ready</li>
                <li>Installation clean and covers fitted</li>
                <li>All circuits labelled and chart complete</li>
                <li>Snagging items documented</li>
                <li>Time allowed for demonstration and questions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Demonstration Sequence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Start at main isolation - most important safety item</li>
                <li>2. Explain consumer unit - circuits, RCDs, labelling</li>
                <li>3. Demonstrate RCD test button operation</li>
                <li>4. Walk through each control system installed</li>
                <li>5. End with questions and provide contact details</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No formal handover:</strong> Just leaving when work is done</li>
                <li><strong>Missing documents:</strong> Not providing required certificates</li>
                <li><strong>Assuming knowledge:</strong> Client may not understand technical terms</li>
                <li><strong>No time for questions:</strong> Rushing away to next job</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Documentation Required</p>
                <ul className="space-y-0.5">
                  <li>EIC or MEIWC</li>
                  <li>Schedule of Inspections</li>
                  <li>Schedule of Test Results</li>
                  <li>Circuit chart (Reg 514.9.1)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Demonstrations</p>
                <ul className="space-y-0.5">
                  <li>Main isolation location/operation</li>
                  <li>RCD test button and purpose</li>
                  <li>Circuit identification</li>
                  <li>Control system operation</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4-4-5">
              Next: Commissioning Reports
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section4_4;
