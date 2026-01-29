import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Continuous Professional Development - HNC Module 1 Section 4.5";
const DESCRIPTION = "Master health and safety CPD requirements, professional qualifications (NEBOSH, IOSH), keeping knowledge current, and IET registration requirements for building services engineers.";

const quickCheckQuestions = [
  {
    id: "cpd-requirement",
    question: "Why is CPD particularly important for health and safety competence?",
    options: [
      "It is only important for career progression",
      "Legislation, standards, and best practice evolve continuously, requiring updated knowledge",
      "CPD is only relevant for those seeking promotion",
      "It is optional for qualified professionals"
    ],
    correctIndex: 1,
    explanation: "Health and safety legislation, regulations, standards, and best practice are constantly evolving. CPD ensures professionals maintain current knowledge and competence. Without ongoing development, knowledge becomes outdated and practice may become non-compliant."
  },
  {
    id: "nebosh-certificate",
    question: "What is the NEBOSH National General Certificate designed to provide?",
    options: [
      "Expert-level knowledge for health and safety professionals only",
      "A broad understanding of health and safety for managers and supervisors",
      "Specialist electrical safety knowledge",
      "First aid at work certification"
    ],
    correctIndex: 1,
    explanation: "The NEBOSH National General Certificate provides a broad understanding of health and safety principles and management for people with H&S responsibilities, such as managers, supervisors, and safety representatives. It is a widely recognised qualification."
  },
  {
    id: "iosh-membership",
    question: "What is IOSH Managing Safely designed for?",
    options: [
      "Health and safety professionals only",
      "Managers and supervisors in any sector who need practical H&S skills",
      "Senior executives only",
      "Those with no workplace responsibilities"
    ],
    correctIndex: 1,
    explanation: "IOSH Managing Safely is a practical course for managers and supervisors in any sector. It covers risk assessment, hazard control, and legal responsibilities. It provides practical tools for managing safety rather than specialist H&S professional knowledge."
  },
  {
    id: "iet-cpd",
    question: "What are the CPD requirements for IET membership?",
    options: [
      "No CPD is required for IET membership",
      "35 hours per year is recommended, with demonstrable commitment to ongoing learning",
      "Exactly 100 hours per year mandatory",
      "CPD is only required for Chartered members"
    ],
    correctIndex: 1,
    explanation: "The IET recommends 35 hours of CPD per year across various activities. All members should demonstrate commitment to ongoing professional development, though specific requirements may vary. Chartered members must maintain CPD records for professional review."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is a benefit of structured CPD for health and safety?",
    options: [
      "It is only useful for getting pay rises",
      "It ensures knowledge remains current as legislation and practice evolve",
      "It is only required for those who failed their initial qualifications",
      "It has no practical benefit for experienced professionals"
    ],
    correctAnswer: 1,
    explanation: "Structured CPD ensures professionals maintain current knowledge of evolving legislation, standards, and best practice. Even experienced professionals need to update their knowledge as the H&S landscape changes."
  },
  {
    id: 2,
    question: "What does 'CPD' stand for?",
    options: [
      "Certificate of Professional Distinction",
      "Continuing Professional Development",
      "Comprehensive Project Delivery",
      "Company Policy Document"
    ],
    correctAnswer: 1,
    explanation: "CPD stands for Continuing Professional Development - the ongoing process of maintaining and developing professional knowledge and skills throughout a career."
  },
  {
    id: 3,
    question: "Which qualification would be most appropriate for someone wanting to specialise as a health and safety professional?",
    options: [
      "IOSH Working Safely",
      "NEBOSH National General Certificate",
      "NEBOSH Diploma or NVQ Level 6 in H&S",
      "Fire Marshal certificate"
    ],
    correctAnswer: 2,
    explanation: "The NEBOSH Diploma and NVQ Level 6 in Occupational Health and Safety are professional-level qualifications for those wanting to work as H&S specialists. The NEBOSH Certificate is intermediate, while IOSH Working Safely is introductory."
  },
  {
    id: 4,
    question: "What types of activities count towards CPD?",
    options: [
      "Only formal classroom training courses",
      "Only professional body meetings",
      "A variety including formal training, self-study, mentoring, technical reading, conferences",
      "Only activities that result in new qualifications"
    ],
    correctAnswer: 2,
    explanation: "CPD encompasses many activities: formal courses, conferences, seminars, professional body meetings, technical reading, online learning, mentoring, work-based learning, project work, and self-directed study. The key is that learning is taking place."
  },
  {
    id: 5,
    question: "What is the role of professional registration with bodies like the IET or Engineering Council?",
    options: [
      "It is purely optional with no practical benefit",
      "It demonstrates competence, commitment to standards, and ethical conduct",
      "It is only relevant for academic engineers",
      "It replaces the need for CPD"
    ],
    correctAnswer: 1,
    explanation: "Professional registration demonstrates that an individual meets defined standards of competence, commits to ethical conduct and CPD, and is accountable to the professional body. It provides assurance to employers and clients of professional standing."
  },
  {
    id: 6,
    question: "The IOSH qualification 'Working Safely' is designed for:",
    options: [
      "Health and safety managers only",
      "Directors and senior executives",
      "All workers to provide essential H&S awareness",
      "Safety inspectors"
    ],
    correctAnswer: 2,
    explanation: "IOSH Working Safely is an introductory-level course designed for all workers. It provides essential H&S awareness including hazard identification, risk, and individual responsibilities. It is often used for general workforce H&S induction."
  },
  {
    id: 7,
    question: "Why should building services engineers maintain CPD records?",
    options: [
      "Only because their employer requires it",
      "To demonstrate ongoing competence, support professional registration, and evidence compliance",
      "Records are not necessary if you attend training",
      "Only Chartered Engineers need records"
    ],
    correctAnswer: 1,
    explanation: "CPD records demonstrate ongoing commitment to professional development, support professional registration applications and reviews, provide evidence of competence for employers and clients, and may be required for regulatory compliance."
  },
  {
    id: 8,
    question: "What changed in BS 7671 that required all qualified electricians to update their knowledge?",
    options: [
      "Nothing has changed - BS 7671 has remained the same",
      "BS 7671 is updated every 3-4 years with amendments, requiring ongoing CPD to stay current",
      "Only the cover colour changed",
      "BS 7671 updates are optional to follow"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 is regularly updated (typically every 3-4 years with interim amendments). Changes affect installation requirements, testing procedures, and documentation. Electricians must undertake CPD to understand and correctly apply current requirements."
  },
  {
    id: 9,
    question: "Which organisation provides 'Chartered Engineer' (CEng) registration in the UK?",
    options: [
      "NICEIC",
      "JIB",
      "The Engineering Council through licensed bodies like the IET",
      "HSE"
    ],
    correctAnswer: 2,
    explanation: "The Engineering Council is the regulatory body for the engineering profession in the UK. It awards CEng through licensed professional bodies like the IET. CEng demonstrates high-level engineering competence and commitment to professional standards."
  },
  {
    id: 10,
    question: "What is 'reflective practice' in the context of CPD?",
    options: [
      "Working in front of a mirror",
      "Analysing your experiences to identify learning and areas for improvement",
      "Only counting formal course attendance",
      "Copying other professionals' approaches"
    ],
    correctAnswer: 1,
    explanation: "Reflective practice involves thinking critically about your experiences, analysing what went well and what could improve, identifying learning from both successes and failures, and using insights to develop practice. It is a key component of effective CPD."
  }
];

const faqs = [
  {
    question: "How many hours of CPD should I do per year?",
    answer: "Most professional bodies recommend around 35 hours per year, though this varies. The IET recommends 35 hours across a range of activities. Quality is more important than quantity - CPD should be relevant to your role and development needs. Some hours may be mandatory (e.g., BS 7671 updates) while others are self-directed based on your development plan."
  },
  {
    question: "Does informal learning count as CPD?",
    answer: "Yes, informal learning can count as CPD if it contributes to your professional development. This includes technical reading, attending site briefings, mentoring or being mentored, learning from colleagues, and work-based learning. The key is to reflect on what you learned and how it improves your practice, and to document it."
  },
  {
    question: "What's the difference between NEBOSH Certificate and NEBOSH Diploma?",
    answer: "The NEBOSH National General Certificate is an intermediate qualification providing broad H&S knowledge for managers and supervisors - typically requiring 80-120 study hours. The NEBOSH Diploma is a professional qualification for those wanting to work as H&S practitioners - requiring 400+ study hours and demonstrating ability to develop and manage H&S systems."
  },
  {
    question: "Do I need NEBOSH or IOSH qualifications as an electrician?",
    answer: "While not legally required for most electricians, H&S qualifications demonstrate competence and can enhance career prospects. IOSH Managing Safely is valuable for supervisors and those with H&S responsibilities. NEBOSH qualifications may be required for project managers or those in dedicated H&S roles. Many employers value these qualifications for senior positions."
  },
  {
    question: "How do I become a Chartered Engineer (CEng)?",
    answer: "CEng requires: an accredited degree (MEng or BEng plus further learning to master's level), demonstrated competence against the UK-SPEC standard through a professional review, commitment to CPD, and membership of a licensed professional body like the IET. The process involves submitting a competence report and attending a professional review interview."
  },
  {
    question: "What happens if I don't maintain my CPD?",
    answer: "Consequences depend on your professional registration. IET members should demonstrate ongoing commitment to development - failure to do so may affect membership status or Chartered registration. More practically, without CPD your knowledge becomes outdated, potentially leading to non-compliance with current standards, reduced competence, and career limitations."
  }
];

const HNCModule1Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4">
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
            <BookOpen className="h-4 w-4" />
            <span>Module 1.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Continuous Professional Development
          </h1>
          <p className="text-white/80">
            Maintaining and developing health and safety competence throughout your career
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CPD:</strong> Ongoing learning to maintain competence</li>
              <li className="pl-1"><strong>Why:</strong> H&S legislation and standards evolve constantly</li>
              <li className="pl-1"><strong>Key qualifications:</strong> NEBOSH, IOSH for H&S knowledge</li>
              <li className="pl-1"><strong>IET/Engineering Council:</strong> Professional registration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 7671 updates:</strong> Regular amendments require training</li>
              <li className="pl-1"><strong>ECS card renewal:</strong> Evidence of CPD required</li>
              <li className="pl-1"><strong>Competent person schemes:</strong> Ongoing assessment</li>
              <li className="pl-1"><strong>Technical standards:</strong> Constantly evolving</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the importance of CPD for health and safety competence",
              "Identify key H&S qualifications: NEBOSH Certificate, Diploma, IOSH courses",
              "Describe CPD activities and how to record them effectively",
              "Understand IET membership and Chartered Engineer requirements",
              "Plan a personal development approach for H&S competence",
              "Explain how CPD supports regulatory and professional compliance"
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

        {/* Section 1: The Importance of CPD */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Importance of CPD for Health and Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuing Professional Development (CPD) is the ongoing process of maintaining and developing
              your professional knowledge, skills, and competence. In health and safety, CPD is particularly
              important because legislation, standards, and best practice are continuously evolving.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why CPD is Essential for H&S</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Legislation changes:</strong> Regulations are regularly updated</li>
                  <li className="pl-1"><strong>Standards evolve:</strong> BS 7671 amendments every 3-4 years</li>
                  <li className="pl-1"><strong>Technology advances:</strong> New equipment, systems, hazards</li>
                  <li className="pl-1"><strong>Best practice develops:</strong> Industry learns from incidents</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Competence requirement:</strong> Legal duty to remain competent</li>
                  <li className="pl-1"><strong>Professional obligation:</strong> Codes of conduct require CPD</li>
                  <li className="pl-1"><strong>Career development:</strong> Progress requires updated skills</li>
                  <li className="pl-1"><strong>Quality assurance:</strong> Clients expect current knowledge</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The CPD Cycle</p>
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/30">
                  <p className="font-bold text-blue-400 mb-1">1. Assess</p>
                  <p className="text-xs text-white/70">Identify development needs</p>
                </div>
                <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                  <p className="font-bold text-green-400 mb-1">2. Plan</p>
                  <p className="text-xs text-white/70">Set learning objectives</p>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border border-purple-500/30">
                  <p className="font-bold text-purple-400 mb-1">3. Do</p>
                  <p className="text-xs text-white/70">Undertake activities</p>
                </div>
                <div className="p-3 rounded bg-orange-500/10 border border-orange-500/30">
                  <p className="font-bold text-orange-400 mb-1">4. Reflect</p>
                  <p className="text-xs text-white/70">Evaluate and record</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">BS 7671 Example</p>
              <p className="text-sm text-white/90">
                BS 7671 (the IET Wiring Regulations) is updated approximately every 3-4 years with significant
                amendments. The 18th Edition came into force in 2018, with Amendment 2 in 2022 introducing
                important changes to prosumer installations, EV charging, and other areas. Electricians must
                undertake CPD to understand and correctly apply current requirements. Working to outdated
                standards could result in non-compliant installations.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal context:</strong> The Management Regulations require employers to ensure workers remain competent - CPD is how this is achieved in practice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: H&S Qualifications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Health and Safety Qualifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Various qualifications are available for those wanting to develop health and safety knowledge,
              from introductory courses for all workers to professional-level qualifications for H&S specialists.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NEBOSH Qualifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Qualification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target Audience</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Study Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Health & Safety at Work Award</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Introductory</td>
                      <td className="border border-white/10 px-3 py-2">All workers</td>
                      <td className="border border-white/10 px-3 py-2">1 day</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">National General Certificate</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Intermediate</td>
                      <td className="border border-white/10 px-3 py-2">Managers, supervisors, safety reps</td>
                      <td className="border border-white/10 px-3 py-2">80-120 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction Certificate</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Intermediate</td>
                      <td className="border border-white/10 px-3 py-2">Construction managers, supervisors</td>
                      <td className="border border-white/10 px-3 py-2">80-120 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">National Diploma</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Professional</td>
                      <td className="border border-white/10 px-3 py-2">H&S practitioners/professionals</td>
                      <td className="border border-white/10 px-3 py-2">400+ hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">NEBOSH National General Certificate - Content</p>
              <p className="text-sm text-white/90 mb-3">
                The widely-recognised intermediate qualification covering:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Health and safety management systems</li>
                  <li className="pl-1">Managing health and safety risks</li>
                  <li className="pl-1">Health and safety monitoring and measuring</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Physical and psychological health hazards</li>
                  <li className="pl-1">Musculoskeletal hazards and controls</li>
                  <li className="pl-1">Work equipment, chemicals, fire, electricity</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IOSH Qualifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Course</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target Audience</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Working Safely</td>
                      <td className="border border-white/10 px-3 py-2">1 day</td>
                      <td className="border border-white/10 px-3 py-2">All workers</td>
                      <td className="border border-white/10 px-3 py-2">Essential H&S awareness</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Managing Safely</td>
                      <td className="border border-white/10 px-3 py-2">3-4 days</td>
                      <td className="border border-white/10 px-3 py-2">Managers, supervisors</td>
                      <td className="border border-white/10 px-3 py-2">Practical management skills</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Leading Safely</td>
                      <td className="border border-white/10 px-3 py-2">1 day</td>
                      <td className="border border-white/10 px-3 py-2">Senior leaders, directors</td>
                      <td className="border border-white/10 px-3 py-2">Strategic H&S leadership</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="text-sm font-medium text-purple-400 mb-2">IOSH Managing Safely - Content</p>
              <p className="text-sm text-white/90 mb-3">
                Practical course for managers and supervisors covering:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Introduction to managing safely</li>
                  <li className="pl-1">Assessing risks in the workplace</li>
                  <li className="pl-1">Controlling risks</li>
                  <li className="pl-1">Understanding responsibilities</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Common hazards identification</li>
                  <li className="pl-1">Investigating incidents</li>
                  <li className="pl-1">Measuring performance</li>
                  <li className="pl-1">Practical risk assessment project</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Which to choose:</strong> IOSH courses are shorter, practical courses. NEBOSH provides deeper knowledge suitable for those with significant H&S responsibilities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: CPD Activities and Recording */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CPD Activities and Recording
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CPD encompasses a wide range of activities beyond formal training courses. Effective CPD combines
              different types of learning and is documented to provide evidence of ongoing development.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of CPD Activities</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-blue-400">Formal Learning</td>
                      <td className="border border-white/10 px-3 py-2">Courses, qualifications, webinars</td>
                      <td className="border border-white/10 px-3 py-2">BS 7671 Amendment course, NEBOSH</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-green-400">Self-Directed</td>
                      <td className="border border-white/10 px-3 py-2">Technical reading, online study</td>
                      <td className="border border-white/10 px-3 py-2">Reading HSE guidance, IET publications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-purple-400">Work-Based</td>
                      <td className="border border-white/10 px-3 py-2">Projects, new responsibilities, job rotation</td>
                      <td className="border border-white/10 px-3 py-2">Leading a safety improvement project</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-orange-400">Professional</td>
                      <td className="border border-white/10 px-3 py-2">Conferences, professional body meetings</td>
                      <td className="border border-white/10 px-3 py-2">IET local network events, IOSH branch</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-yellow-400">Informal</td>
                      <td className="border border-white/10 px-3 py-2">Mentoring, peer discussion, toolbox talks</td>
                      <td className="border border-white/10 px-3 py-2">Coaching junior staff on safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Record in CPD Logs</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Date:</strong> When the activity took place</li>
                  <li className="pl-1"><strong>Activity:</strong> What you did</li>
                  <li className="pl-1"><strong>Duration:</strong> Time spent (hours)</li>
                  <li className="pl-1"><strong>Provider:</strong> Who delivered it</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Learning objectives:</strong> What you aimed to learn</li>
                  <li className="pl-1"><strong>Outcomes:</strong> What you actually learned</li>
                  <li className="pl-1"><strong>Application:</strong> How you will apply it</li>
                  <li className="pl-1"><strong>Evidence:</strong> Certificates, notes, etc.</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reflective Practice</p>
              <p className="text-sm text-white/90 mb-3">
                Effective CPD requires reflection - thinking critically about your experiences:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>What happened?</strong> Describe the situation or activity</li>
                <li className="pl-1"><strong>What did I learn?</strong> New knowledge, skills, or insights</li>
                <li className="pl-1"><strong>What worked well?</strong> Successes to build on</li>
                <li className="pl-1"><strong>What could improve?</strong> Areas for development</li>
                <li className="pl-1"><strong>What will I do differently?</strong> Concrete actions for the future</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Building Services CPD Examples</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">BS 7671 18th Edition Amendment 2 update course (8 hours)</li>
                <li className="pl-1">Reading new HSE guidance on electrical safety (2 hours)</li>
                <li className="pl-1">Attending IET local network seminar on arc flash (3 hours)</li>
                <li className="pl-1">Leading toolbox talks on isolation procedures (1 hour)</li>
                <li className="pl-1">Mentoring apprentice on safe working practices (ongoing)</li>
                <li className="pl-1">Completing online module on CDM duties (4 hours)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> Record CPD as you go, not at year end. Keep certificates, notes, and reflections organised for professional review.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Professional Registration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            IET Membership and Professional Registration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional registration through bodies like the IET and Engineering Council demonstrates
              competence, commitment to standards, and ethical conduct. It provides assurance to employers
              and clients and supports career development.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IET Membership Grades</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Grade</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Letters</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirements</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Student</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">Currently studying</td>
                      <td className="border border-white/10 px-3 py-2">HNC/degree students</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Associate</td>
                      <td className="border border-white/10 px-3 py-2">AMIET</td>
                      <td className="border border-white/10 px-3 py-2">Interest in sector</td>
                      <td className="border border-white/10 px-3 py-2">Early career, allied roles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Member</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">MIET</td>
                      <td className="border border-white/10 px-3 py-2">Accredited degree or equivalent</td>
                      <td className="border border-white/10 px-3 py-2">Graduate engineers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Fellow</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">FIET</td>
                      <td className="border border-white/10 px-3 py-2">Distinguished contribution</td>
                      <td className="border border-white/10 px-3 py-2">Senior leaders, experts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Engineering Council Registration</p>
              <p className="text-sm text-white/90 mb-3">
                The Engineering Council regulates the engineering profession through licensed bodies like the IET:
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-green-400 mb-1">EngTech</p>
                  <p className="text-xs text-white/70">Engineering Technician</p>
                  <p className="text-xs text-white/70 mt-1">Technician-level competence</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-yellow-400 mb-1">IEng</p>
                  <p className="text-xs text-white/70">Incorporated Engineer</p>
                  <p className="text-xs text-white/70 mt-1">Degree-level competence</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-elec-yellow mb-1">CEng</p>
                  <p className="text-xs text-white/70">Chartered Engineer</p>
                  <p className="text-xs text-white/70 mt-1">Master's-level competence</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Professional Registration</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">For You</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Recognition of your competence</li>
                    <li className="pl-1">Enhanced career opportunities</li>
                    <li className="pl-1">Access to professional networks</li>
                    <li className="pl-1">Use of professional titles (CEng, IEng)</li>
                    <li className="pl-1">International recognition</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">For Employers/Clients</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Assurance of competence</li>
                    <li className="pl-1">Commitment to ethical standards</li>
                    <li className="pl-1">Accountability to professional body</li>
                    <li className="pl-1">Evidence of CPD maintenance</li>
                    <li className="pl-1">Benchmark for recruitment</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IET CPD Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Recommended <strong>35 hours</strong> per year across varied activities</li>
                <li className="pl-1">All members expected to demonstrate commitment to ongoing learning</li>
                <li className="pl-1">Chartered/Incorporated members must maintain records for professional review</li>
                <li className="pl-1">CPD should be relevant to current role and future development</li>
                <li className="pl-1">Combination of technical, professional, and personal development</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services route:</strong> HNC provides foundation; HND/degree pathway to MIET and IEng/CEng registration with experience.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Planning Your CPD</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assess current competence:</strong> What are your strengths and gaps?</li>
                <li className="pl-1"><strong>Consider role requirements:</strong> What does your job require now and in future?</li>
                <li className="pl-1"><strong>Set SMART objectives:</strong> Specific, Measurable, Achievable, Relevant, Time-bound</li>
                <li className="pl-1"><strong>Mix activities:</strong> Combine formal, informal, and work-based learning</li>
                <li className="pl-1"><strong>Schedule time:</strong> Block time for CPD in your calendar</li>
                <li className="pl-1"><strong>Review regularly:</strong> Assess progress and adjust plan</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Resources for Building Services CPD</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IET:</strong> Wiring Matters, technical guidance, local networks</li>
                <li className="pl-1"><strong>HSE:</strong> Free guidance, alerts, statistics</li>
                <li className="pl-1"><strong>IOSH:</strong> Magazines, webinars, branch events</li>
                <li className="pl-1"><strong>Trade bodies:</strong> ECA, SELECT, NICEIC publications</li>
                <li className="pl-1"><strong>Manufacturers:</strong> Product training, technical updates</li>
                <li className="pl-1"><strong>Online platforms:</strong> E-learning, webinars, podcasts</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common CPD Mistakes</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Activity without learning:</strong> Attending courses without engaging or applying</li>
                <li className="pl-1"><strong>No record:</strong> Failing to document CPD for evidence</li>
                <li className="pl-1"><strong>No reflection:</strong> Not thinking about what was learned</li>
                <li className="pl-1"><strong>No plan:</strong> Random activities without strategic direction</li>
                <li className="pl-1"><strong>Only formal:</strong> Ignoring informal learning opportunities</li>
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
                <p className="font-medium text-white mb-1">Key H&S Qualifications</p>
                <ul className="space-y-0.5">
                  <li>IOSH Working Safely - All workers (1 day)</li>
                  <li>IOSH Managing Safely - Managers (3-4 days)</li>
                  <li>NEBOSH NGC - Managers, supervisors (80-120 hrs)</li>
                  <li>NEBOSH Diploma - H&S professionals (400+ hrs)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Engineering Council Registration</p>
                <ul className="space-y-0.5">
                  <li>EngTech - Engineering Technician</li>
                  <li>IEng - Incorporated Engineer</li>
                  <li>CEng - Chartered Engineer</li>
                  <li>Via IET or other licensed body</li>
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
            <Link to="../h-n-c-module1-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Ethical Responsibilities
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section4_5;
