/**
 * Level 3 Module 1 Section 1.3 - RIDDOR 2013
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
const TITLE = "RIDDOR 2013 - Reporting of Injuries, Diseases and Dangerous Occurrences - Level 3 Module 1 Section 1.3";
const DESCRIPTION = "Master RIDDOR reporting requirements for electrical work. Learn what incidents must be reported, reporting timeframes, and electrical-specific dangerous occurrences.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Within what timeframe must a death or specified injury be reported to the HSE?",
    options: [
      "Within 24 hours",
      "Within 10 days",
      "Without delay (immediately)",
      "Within 15 working days"
    ],
    correctIndex: 2,
    explanation: "Deaths and specified injuries must be reported WITHOUT DELAY - this means immediately by the quickest practical means, usually by telephone to the HSE Incident Contact Centre."
  },
  {
    id: "check-2",
    question: "Which of these is a 'specified injury' under RIDDOR?",
    options: [
      "A minor cut requiring a plaster",
      "A sprained ankle from tripping",
      "Loss of consciousness caused by electric shock",
      "A bruise from bumping into equipment"
    ],
    correctIndex: 2,
    explanation: "Loss of consciousness from head injury or asphyxia (including electric shock causing loss of consciousness) is a specified injury requiring immediate reporting under RIDDOR."
  },
  {
    id: "check-3",
    question: "An electrical short circuit causes a small fire that is quickly extinguished with no injuries. Is this reportable?",
    options: [
      "No, because no one was injured",
      "No, because the fire was small",
      "Yes, as a dangerous occurrence",
      "Only if it caused over 24 hours work stoppage"
    ],
    correctIndex: 2,
    explanation: "Electrical short circuits or overloads causing fire or explosion are dangerous occurrences that MUST be reported under RIDDOR, regardless of whether anyone was injured or the size of the fire."
  },
  {
    id: "check-4",
    question: "How long must RIDDOR records be kept?",
    options: [
      "1 year",
      "2 years",
      "3 years minimum",
      "5 years"
    ],
    correctIndex: 2,
    explanation: "RIDDOR records must be kept for a minimum of 3 years from the date of the incident. This includes the report itself and any supporting documentation."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does RIDDOR stand for?",
    options: [
      "Reporting of Industrial Diseases and Dangerous Occurrences Regulations",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "Recording of Incidents, Deaths and Dangerous Occurrences Regulations",
      "Regulations for Industrial Disease and Dangerous Occurrence Reporting"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013, which sets out the requirements for reporting workplace incidents to the HSE."
  },
  {
    id: 2,
    question: "Within what timeframe must over-7-day incapacitation injuries be reported?",
    options: [
      "Immediately without delay",
      "Within 5 working days",
      "Within 10 days of the incident",
      "Within 15 working days"
    ],
    correctAnswer: 2,
    explanation: "Over-7-day incapacitation injuries must be reported within 10 days of the incident occurring. Only deaths and specified injuries require immediate reporting."
  },
  {
    id: 3,
    question: "Who is responsible for making RIDDOR reports?",
    options: [
      "The injured person",
      "Any witness to the incident",
      "The responsible person (employer or person in control of premises)",
      "The emergency services"
    ],
    correctAnswer: 2,
    explanation: "The 'responsible person' - typically the employer, self-employed person, or person in control of the premises - has the legal duty to make RIDDOR reports."
  },
  {
    id: 4,
    question: "Which of the following qualifies as a specified injury under RIDDOR?",
    options: [
      "A minor cut requiring first aid",
      "Amputation of any finger or toe",
      "A minor electric shock with no lasting effects",
      "A bruised knee from a fall"
    ],
    correctAnswer: 1,
    explanation: "Amputation of any finger, toe, or limb is a specified injury under RIDDOR. Specified injuries are serious injuries that must be reported immediately."
  },
  {
    id: 5,
    question: "What is the primary method for reporting incidents under RIDDOR?",
    options: [
      "By letter to the HSE",
      "By email to any HSE address",
      "Through the HSE online reporting system",
      "By fax to the local authority"
    ],
    correctAnswer: 2,
    explanation: "The HSE online reporting system at www.hse.gov.uk/riddor is the primary method for RIDDOR reports. Only fatal or specified injuries can initially be reported by telephone."
  },
  {
    id: 6,
    question: "Which electrical incident is reportable as a dangerous occurrence under RIDDOR?",
    options: [
      "A minor electric shock with no injury",
      "Electrical short circuit or overload causing fire or explosion",
      "A tripped RCD",
      "A blown fuse in a distribution board"
    ],
    correctAnswer: 1,
    explanation: "Electrical short circuits or overloads causing fire or explosion are reportable as dangerous occurrences under RIDDOR, regardless of whether anyone was injured."
  },
  {
    id: 7,
    question: "An electrician receives an electric shock and is admitted to hospital for more than 24 hours. Is this reportable?",
    options: [
      "No, shocks are never reportable",
      "Only if they are off work for more than 7 days",
      "Yes, as a specified injury (hospital admission over 24 hours)",
      "Only if it causes permanent injury"
    ],
    correctAnswer: 2,
    explanation: "Any injury requiring admittance to hospital for more than 24 hours is a specified injury requiring immediate reporting under RIDDOR."
  },
  {
    id: 8,
    question: "What type of occupational diseases must be reported under RIDDOR?",
    options: [
      "Common colds caught at work",
      "Only diseases caused by chemicals",
      "Occupational diseases linked to work activities, such as occupational dermatitis",
      "Any illness occurring at work"
    ],
    correctAnswer: 2,
    explanation: "RIDDOR requires reporting of specific occupational diseases linked to work activities, such as occupational dermatitis, occupational asthma, and carpal tunnel syndrome."
  },
  {
    id: 9,
    question: "What constitutes 'over-7-day incapacitation' under RIDDOR?",
    options: [
      "Unable to work for 7 hours",
      "Unable to do normal work for more than 7 consecutive days (not counting day of accident)",
      "Any injury requiring 7 days of rest",
      "Unable to walk for 7 days"
    ],
    correctAnswer: 1,
    explanation: "Over-7-day incapacitation means the injured person is unable to do their normal work for more than 7 consecutive days, not counting the day of the accident. This includes weekends and rest days."
  },
  {
    id: 10,
    question: "What should an electrician do if unsure whether an incident is reportable under RIDDOR?",
    options: [
      "Do not report - only report certain incidents",
      "Wait until someone asks about it",
      "Contact the HSE for guidance - when in doubt, report",
      "Report it as a minor incident"
    ],
    correctAnswer: 2,
    explanation: "When in doubt, contact the HSE for guidance. The HSE prefers to receive reports that turn out not to be required than to miss incidents that should have been reported."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I need to report a minor electric shock with no visible injury?",
    answer: "A minor shock with no injury, no loss of consciousness, and no hospital admission is not typically reportable under RIDDOR. However, you should still record it internally and investigate to prevent recurrence. If the shock caused loss of consciousness or required hospital treatment, it becomes reportable."
  },
  {
    question: "What if the injured person is a contractor rather than an employee?",
    answer: "For self-employed contractors, the person in control of the premises may need to report the incident. The contractor's own employer (if they have one) may also have reporting duties. In complex situations, both parties should report to ensure compliance."
  },
  {
    question: "How do I know if an injury will result in over-7-day incapacitation?",
    answer: "You have 10 days from the incident to report over-7-day injuries. Monitor the injured person's recovery and report within the 10-day window once you know they will be incapacitated for more than 7 consecutive days (not counting the day of the accident)."
  },
  {
    question: "What information is required when making a RIDDOR report?",
    answer: "Reports must include: details of the injured person, date, time and place of incident, description of what happened and how, details of injuries sustained, and contact details of the responsible person making the report."
  },
  {
    question: "Can I be prosecuted for failing to report under RIDDOR?",
    answer: "Yes. Failure to report when required is a criminal offence that can result in prosecution and significant fines. The HSE takes non-reporting seriously as it undermines their ability to identify workplace hazards."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section1_3 = () => {
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
            <Link to="../level3-module1-section1">
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
            <span>Module 1.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RIDDOR 2013
          </h1>
          <p className="text-white/80">
            Reporting of Injuries, Diseases and Dangerous Occurrences Regulations
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Deaths/Specified Injuries:</strong> Report immediately without delay</li>
              <li><strong>Over-7-Day Injuries:</strong> Report within 10 days</li>
              <li><strong>Dangerous Occurrences:</strong> Report without delay (includes electrical fires)</li>
              <li><strong>Records:</strong> Keep for minimum 3 years</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Deaths, fractures, amputations, loss of consciousness, electrical fires</li>
              <li><strong>Use:</strong> HSE online system for most reports, telephone for fatal/specified injuries</li>
              <li><strong>Apply:</strong> Report immediately when in doubt - HSE prefers over-reporting</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what RIDDOR is and when reporting is required",
              "Identify types of reportable events: deaths, specified injuries, over-7-day injuries",
              "Know reporting timescales and methods for different incident types",
              "Recognise electrical-specific incidents that are reportable",
              "Understand record-keeping requirements (3-year minimum)",
              "Apply RIDDOR requirements in practical situations"
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
            What is RIDDOR and Why Does it Matter?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RIDDOR 2013 (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations) places legal duties on employers, the self-employed, and people in control of work premises to report certain serious workplace accidents, occupational diseases, and specified dangerous occurrences to the Health and Safety Executive (HSE).
            </p>

            <p>
              For electricians, understanding RIDDOR is essential because electrical work carries inherent risks that can result in reportable incidents - including electric shock injuries, arc flash burns, and electrical fires or explosions. The regulations exist to help the HSE identify where and how risks arise, investigate serious accidents, and target their resources to prevent future incidents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why RIDDOR Matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Legal Requirement:</strong> Failure to report when required is a criminal offence with significant fines</li>
                <li><strong>Prevention:</strong> Reports help identify patterns and prevent future incidents across the industry</li>
                <li><strong>Investigation:</strong> Enables HSE to investigate serious accidents and identify systemic failures</li>
                <li><strong>Accountability:</strong> Creates a formal record of workplace incidents for enforcement purposes</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Principle:</strong> The incident must be 'arising out of or in connection with work' to be reportable. This includes injuries to workers, self-employed people, and members of the public affected by work activities.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Reportable Events
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RIDDOR specifies four main categories of reportable events, each with different reporting requirements and timeframes. Understanding these categories is essential for compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Deaths - Report Immediately</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All work-related deaths of workers and non-workers</li>
                  <li>Includes deaths from physical violence</li>
                  <li>Includes delayed deaths from work injuries</li>
                  <li>Report by telephone, then written within 10 days</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-orange-400/80 mb-2">Specified Injuries - Report Immediately</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fractures (except fingers, thumbs, toes)</li>
                  <li>Amputations of any finger, toe, or limb</li>
                  <li>Burns covering more than 10% of body</li>
                  <li>Loss of consciousness</li>
                  <li>Hospital admission for more than 24 hours</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Over-7-Day Incapacitation - Report Within 10 Days</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Unable to do normal work for more than 7 consecutive days</li>
                  <li>Does not count the day of accident</li>
                  <li>Includes weekends and rest days</li>
                  <li>Report via online system</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dangerous Occurrences - Report Immediately</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electrical short circuit causing fire or explosion</li>
                  <li>Collapse of scaffolding</li>
                  <li>Failure of lifting equipment</li>
                  <li>Reportable even with no injury</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Occupational diseases must also be reported when a doctor confirms diagnosis - including occupational dermatitis, asthma, and carpal tunnel syndrome.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            How and When to Report
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the correct reporting methods and timeframes is essential for RIDDOR compliance. Different incident types have different requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Reporting Methods:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Online:</strong> HSE website (www.hse.gov.uk/riddor) - primary method, available 24/7</li>
                <li><strong>Telephone:</strong> 0345 300 9923 - for fatal and specified injuries only (initial notification)</li>
                <li><strong>Written follow-up:</strong> Required within 10 days of telephone reports</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-white mb-1">Immediately</p>
                <p className="text-white/90 text-xs">Deaths, specified injuries, dangerous occurrences</p>
              </div>
              <div className="p-3 rounded bg-orange-500/10 border border-orange-500/30">
                <p className="font-medium text-white mb-1">Within 10 Days</p>
                <p className="text-white/90 text-xs">Over-7-day incapacitation, written follow-up</p>
              </div>
              <div className="p-3 rounded bg-elec-yellow/10 border border-elec-yellow/30">
                <p className="font-medium text-white mb-1">3 Years</p>
                <p className="text-white/90 text-xs">Minimum record retention period</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> 'Without delay' means immediately - not tomorrow, not when convenient. For deaths and specified injuries, telephone first, then complete the online report within 10 days.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrical-Specific Incidents Under RIDDOR
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricians face specific hazards that can result in RIDDOR-reportable incidents. Understanding these helps ensure proper reporting and drives safety improvements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Electrical Incidents Requiring Reporting:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Electric Shock with Loss of Consciousness:</strong> A specified injury requiring immediate reporting</li>
                <li><strong>Electric Shock with Hospital Admission 24+ Hours:</strong> Specified injury regardless of shock severity</li>
                <li><strong>Arc Flash Burns:</strong> Burns 10%+ of body, or affecting eyes/respiratory system are specified injuries</li>
                <li><strong>Electrical Fire or Explosion:</strong> A dangerous occurrence - reportable even with no injury</li>
                <li><strong>Electrocution Deaths:</strong> Report immediately without delay</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician working on a distribution board experiences an arc flash. Burns cover 5% of body (below 10% threshold), but they are admitted to hospital for over 24 hours observation. This IS a specified injury (hospital admission 24+ hours) and must be reported immediately.
            </p>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Important:</strong> Near-miss electrical incidents should always be recorded internally and investigated, even if not RIDDOR-reportable. A shock that did not cause injury this time could cause a fatality next time.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RIDDOR Reporting Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Is it a death, specified injury, over-7-day injury, disease, or dangerous occurrence?</li>
                <li>Did it arise out of or in connection with work?</li>
                <li>Deaths/specified injuries: Phone HSE immediately, then online within 10 days</li>
                <li>Over-7-day injuries: Report within 10 days via online system</li>
                <li>Keep all records for minimum 3 years</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">After an Electrical Incident</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure the scene is made safe (isolate if possible)</li>
                <li>Administer first aid and call emergency services if needed</li>
                <li>Assess if incident is RIDDOR-reportable</li>
                <li>Preserve the scene for investigation</li>
                <li>Gather witness statements and evidence</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Delaying reports</strong> - 'Without delay' means immediately, not tomorrow</li>
                <li><strong>Not reporting dangerous occurrences</strong> - Electrical fires are reportable even without injury</li>
                <li><strong>Assuming someone else will report</strong> - The responsible person must ensure it happens</li>
                <li><strong>Not keeping records</strong> - 3 years minimum is a legal requirement</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - RIDDOR Reporting</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Report Immediately:</p>
                <ul className="space-y-0.5">
                  <li>Deaths</li>
                  <li>Specified injuries (amputations, fractures, burns 10%+)</li>
                  <li>Loss of consciousness</li>
                  <li>Hospital admission 24+ hours</li>
                  <li>Dangerous occurrences (electrical fires/explosions)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Report Within 10 Days:</p>
                <ul className="space-y-0.5">
                  <li>Over-7-day incapacitation injuries</li>
                  <li>Written follow-up to telephone reports</li>
                </ul>
                <p className="font-medium text-white mb-1 mt-3">Key Contacts:</p>
                <ul className="space-y-0.5">
                  <li>HSE: 0345 300 9923</li>
                  <li>Online: www.hse.gov.uk/riddor</li>
                  <li>Record retention: 3 years minimum</li>
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
            <Link to="../level3-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section1-4">
              Next: COSHH
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section1_3;
