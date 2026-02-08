import { ArrowLeft, Award, CheckCircle, AlertTriangle, BookOpen, Users, CreditCard, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-competence-vs-qualification",
    question: "What is the key difference between competence and qualification?",
    options: [
      "They mean exactly the same thing",
      "Qualification is a certificate; competence is the practical ability to do the job safely",
      "Competence is only needed for supervisors, not operatives",
      "Qualification is more important than competence"
    ],
    correctIndex: 1,
    explanation: "A qualification (e.g. a PASMA certificate) proves you completed a training course. Competence is broader \u2014 it combines training, knowledge, experience, and practical ability. You can hold a certificate but not be competent if you lack recent practical experience."
  },
  {
    id: "pasma-renewal",
    question: "How long is a standard PASMA Towers for Users card valid before renewal is required?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctIndex: 2,
    explanation: "PASMA Towers for Users cards are valid for 5 years from the date of the course. After 5 years, you must complete a renewal course to maintain your certification. However, competence should be maintained throughout through regular practice."
  },
  {
    id: "pasma-employer-duty",
    question: "Who is responsible for ensuring that tower users are competent?",
    options: [
      "PASMA",
      "The HSE",
      "The employer",
      "The individual worker"
    ],
    correctIndex: 2,
    explanation: "Under the Work at Height Regulations 2005, the employer has a duty to ensure that work at height is carried out by competent persons. This means employers must provide training, verify competence, and ensure ongoing development \u2014 not just check for a card."
  }
];

const faqs = [
  {
    question: "Do I legally need a PASMA card to use a mobile scaffold tower?",
    answer: "There is no specific legal requirement to hold a PASMA card. However, the Work at Height Regulations require that work at height is carried out by competent persons. PASMA training is the industry-recognised route to demonstrating competence for mobile tower work. In practice, most employers, principal contractors, and site managers require PASMA certification as evidence of competence."
  },
  {
    question: "Can I assemble a tower if my PASMA card has expired?",
    answer: "An expired PASMA card means your formal certification has lapsed, but it does not automatically make you incompetent. However, most sites will not permit you to work with towers without a valid card. You should renew your certification before the expiry date. Employers have a duty to ensure operatives hold current certifications."
  },
  {
    question: "What is the difference between PASMA Towers for Users and Towers for Managers?",
    answer: "Towers for Users is a practical, hands-on course for people who will assemble, dismantle, inspect, and use mobile towers. Towers for Managers is a classroom-based course for supervisors, safety officers, and managers who need to understand tower safety but will not physically assemble towers. Managers still need to know what safe tower work looks like so they can supervise effectively."
  },
  {
    question: "Can a trainee assemble a tower without a PASMA certificate?",
    answer: "Yes, but only under the direct supervision of a competent person who holds a valid PASMA certificate. The Work at Height Regulations require appropriate supervision proportionate to the competence of the worker. A trainee must never be left to assemble, alter, or dismantle a tower unsupervised until they have demonstrated competence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does PASMA stand for?",
    options: [
      "Professional Association of Safety Management Advisors",
      "Prefabricated Access Suppliers' and Manufacturers' Association",
      "Platform Access Safety and Maintenance Authority",
      "Portable Access Scaffold Manufacturers' Alliance"
    ],
    correctAnswer: 1,
    explanation: "PASMA is the Prefabricated Access Suppliers' and Manufacturers' Association. It is the recognised trade body for the mobile access tower industry in the UK."
  },
  {
    id: 2,
    question: "How long is a standard PASMA Towers for Users card valid?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "Indefinitely"
    ],
    correctAnswer: 2,
    explanation: "PASMA Towers for Users cards are valid for 5 years from the date of successful completion. Holders must complete a renewal course before expiry to maintain their certification."
  },
  {
    id: 3,
    question: "Which of the following best describes 'competence' for tower work?",
    options: [
      "Holding any health and safety certificate",
      "Having 10 years of experience",
      "A combination of training, knowledge, experience, and practical ability",
      "Being over 18 years of age"
    ],
    correctAnswer: 2,
    explanation: "Competence for tower work requires a combination of adequate training, relevant knowledge, sufficient experience, and practical ability to carry out the task safely. No single factor is sufficient on its own."
  },
  {
    id: 4,
    question: "Who must supervise a trainee assembling a mobile tower?",
    options: [
      "Any person on site",
      "A competent person with relevant training and experience",
      "The site security guard",
      "No supervision is needed if the trainee has watched a video"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations require that trainees are supervised by a competent person. For tower work, this means someone with current PASMA certification, practical experience, and the ability to intervene if the work is being done incorrectly."
  },
  {
    id: 5,
    question: "What type of PASMA course is designed for supervisors who will not physically assemble towers?",
    options: [
      "Towers for Users",
      "Towers for Managers",
      "Advanced Tower Assembly",
      "Scaffold Inspection"
    ],
    correctAnswer: 1,
    explanation: "Towers for Managers is a classroom-based course designed for supervisors, managers, and safety professionals who need to understand tower safety and oversee tower work without physically assembling or dismantling towers themselves."
  },
  {
    id: 6,
    question: "An employer sends a worker on a PASMA course. Is the employer's duty regarding competence now fully discharged?",
    options: [
      "Yes, the PASMA card proves the worker is competent",
      "No, the employer must also ensure ongoing experience, supervision, and refresher training as needed",
      "Yes, provided the worker passes the course assessment",
      "No, the employer must also obtain a separate HSE licence"
    ],
    correctAnswer: 1,
    explanation: "Training alone does not make someone competent. Employers must ensure ongoing competence through practical experience, appropriate supervision, refresher training, and regular assessment. A PASMA card is evidence of training, not a guarantee of continuing competence."
  },
  {
    id: 7,
    question: "What records should an employer maintain regarding tower training?",
    options: [
      "No records are needed once a PASMA card is issued",
      "Only the PASMA card number",
      "Training records including course dates, expiry dates, course type, and any additional competence assessments",
      "Only records for employees over 25"
    ],
    correctAnswer: 2,
    explanation: "Employers should maintain comprehensive training records including the course attended, date of completion, certificate/card number, expiry date, and any additional assessments of competence or refresher training. These records demonstrate compliance with the duty to use competent persons."
  },
  {
    id: 8,
    question: "What is the PASMA card verification system?",
    options: [
      "A database only accessible to PASMA members",
      "An online system where anyone can verify a cardholder's training and card validity",
      "A paper-based register held by the HSE",
      "A system only available to employers"
    ],
    correctAnswer: 1,
    explanation: "PASMA operates an online card verification system where anyone can check whether a PASMA card is valid by entering the card number. This allows site managers and employers to quickly verify a worker's training status."
  }
];

export default function IpafModule1Section4() {
  useSEO({
    title: "PASMA & Competence Requirements | IPAF Module 1.4",
    description: "What PASMA is, Towers for Users course, competence vs qualification, supervision of trainees, record keeping, 5-year renewal cycle, employer responsibilities, and card types.",
  });

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
            <Link to="../ipaf-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Award className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            PASMA & Competence Requirements
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the industry training body, card types, competence standards, and employer responsibilities for mobile tower scaffold work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>PASMA:</strong> Industry trade body for mobile access towers</li>
              <li><strong>Card:</strong> Valid 5 years, renewable with refresher course</li>
              <li><strong>Competence:</strong> Training + knowledge + experience + ability</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Carry:</strong> Valid PASMA card at all times when using towers</li>
              <li><strong>Verify:</strong> Check card validity via the PASMA online system</li>
              <li><strong>Supervise:</strong> Trainees must have direct competent supervision</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what PASMA is and its role in the tower industry",
              "Describe the Towers for Users course and what it covers",
              "Distinguish between competence and qualification",
              "Understand the employer's duty regarding training and competence",
              "Explain the 5-year renewal cycle and why it matters",
              "Identify the different PASMA card types and their purposes"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is PASMA? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is PASMA?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PASMA stands for the Prefabricated Access Suppliers' and Manufacturers' Association. It
                is the recognised trade association for the mobile access tower industry in the United
                Kingdom. Founded in 1974, PASMA represents manufacturers, hire companies, and training
                providers across the sector.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">PASMA's Role:</strong> PASMA develops industry
                  guidance, sets training standards, operates the card scheme for trained operatives, and
                  works with the HSE and other regulators to improve safety standards in mobile tower
                  scaffold work across all industries.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What PASMA Does:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Develops and maintains training courses for tower users, managers, and instructors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Operates the PASMA card scheme for certified individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Publishes technical guidance and best practice documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Represents the industry to government and regulators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Promotes safety awareness through campaigns and publications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Approves training centres and audits training delivery standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maintains an online card verification system</span>
                  </li>
                </ul>
              </div>

              <p>
                While PASMA is not a regulatory body and has no legal enforcement powers, its training
                and card scheme are universally recognised across the construction and maintenance
                industries. Holding a valid PASMA card is widely accepted as evidence of competence for
                mobile tower scaffold work.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Towers for Users Course */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Towers for Users Course
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The PASMA Towers for Users course is the flagship training programme for anyone who will
                assemble, alter, dismantle, move, inspect, or work from a mobile access tower. It is a
                practical, hands-on course that combines classroom theory with physical tower assembly
                and dismantling exercises.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Course Content</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Theory Component</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Relevant legislation and regulations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Types of mobile access towers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Tower components and their functions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Stability and safe working loads</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Hazard identification and risk assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Inspection requirements and recording</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Practical Component</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Component identification and checking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Assembly using the 3T method</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Assembly using the AGR method</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Moving a tower safely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Dismantling procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Pre-use inspection and checks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Course Details</p>
                <div className="grid sm:grid-cols-3 gap-4 text-sm text-white/80">
                  <div>
                    <p className="text-white font-medium">Duration</p>
                    <p>1 day (typically 6-7 hours)</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Assessment</p>
                    <p>Theory test + practical observation</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Card Validity</p>
                    <p>5 years from course date</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">On Successful Completion:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>PASMA photo ID card issued (posted within 10 working days)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Details entered on the PASMA online register</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Card shows holder's name, photograph, card number, issue and expiry dates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Temporary card provided on the day for immediate use</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Competence vs Qualification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Competence vs Qualification
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the distinction between competence and qualification is fundamental to
                complying with the Work at Height Regulations. The Regulations do not require specific
                qualifications &mdash; they require competence. A qualification is evidence towards
                competence, but it is not the whole picture.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Qualification</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>A certificate or card proving course completion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Evidence of formal training received</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Has an expiry date (5 years for PASMA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Does not guarantee ongoing ability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can be verified through the issuing body</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Necessary but not sufficient on its own</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Competence</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The practical ability to carry out the work safely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Combines training, knowledge, experience, and skill</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must be maintained through regular practice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Assessed through observation and performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can deteriorate if skills are not used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The legal requirement under WAHR</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">The Four Pillars of Competence</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Training:</strong> Formal instruction in the correct methods (e.g. PASMA course)</p>
                  <p><strong className="text-white">2. Knowledge:</strong> Understanding of the regulations, standards, hazards, and safe systems of work</p>
                  <p><strong className="text-white">3. Experience:</strong> Regular practical application of skills in real working situations</p>
                  <p><strong className="text-white">4. Ability:</strong> Physical and cognitive capacity to carry out the work safely, including recognising and responding to changing conditions</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Competence Can Be Lost</p>
                </div>
                <p className="text-sm text-white/80">
                  A person who completed their PASMA course three years ago but has not assembled a tower
                  since may hold a valid card but may no longer be competent. Employers must assess whether
                  a worker's competence is current, not just whether their card is in date. Refresher
                  training or supervised practice may be needed before allowing unsupervised tower work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Supervision of Trainees */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Supervision of Trainees
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations allow persons who are not yet fully competent to carry
                out work at height, provided they are under the direct supervision of a competent
                person. This is essential for allowing on-the-job training and development, but the
                supervision requirements are strict.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Requirements for Supervising Trainees</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Direct supervision:</strong> The competent person must be physically present and able to observe the trainee's work. Remote supervision (e.g. by phone) is not acceptable for tower assembly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Able to intervene:</strong> The supervisor must be in a position to stop incorrect work immediately and correct the trainee before an unsafe situation develops.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Competent supervisor:</strong> The supervisor must themselves be competent in the specific work being supervised. For tower work, this means holding a current PASMA certificate and having relevant practical experience.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Proportionate:</strong> The level of supervision must match the risk and the trainee's level of experience. A complete beginner needs closer supervision than someone who has completed their PASMA course but needs practice.</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Acceptable Supervision</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>PASMA-certified person standing alongside the trainee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Supervisor actively watching and guiding each step</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Clear communication between supervisor and trainee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Supervisor ready to stop work if unsafe</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Unacceptable Supervision</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Supervisor on a different floor or area of the site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>"Just call me if you get stuck" approach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Supervisor doing their own work and not watching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Relying on written instructions alone</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Record Keeping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Record Keeping Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Maintaining accurate training and competence records is not just good practice &mdash;
                it is essential evidence that the employer has fulfilled their legal duty to use competent
                persons for work at height. If an incident occurs, the HSE will ask to see these records.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Records Employers Should Maintain</p>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-medium text-cyan-400 mb-2">Training Records</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>PASMA course type and date completed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>PASMA card number and expiry date</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Name of training provider and instructor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Any additional specialist training (e.g. complex towers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Refresher training dates and outcomes</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cyan-400 mb-2">Competence Records</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>On-site competence assessments and observations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Records of supervised practice sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Any competence concerns raised and actions taken</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Date of last tower assembly by each operative</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Toolbox talks attended relating to tower work</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Tip:</strong> Create a simple training matrix
                  listing all workers who use towers, their PASMA card numbers, expiry dates, and when
                  they last assembled a tower. Set reminders 3 months before cards expire so renewal can
                  be arranged without a gap in certification.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Tower Inspection Records (Separate)</p>
                <p className="text-sm text-white/80">
                  In addition to training records, employers must maintain Schedule 5 inspection records
                  for every tower on site. These are separate documents and must include the date, time,
                  location, inspector details, and findings. Keep inspection records on site during the
                  work and retain for at least 3 months after completion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: 5-Year Renewal Cycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            The 5-Year Renewal Cycle
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PASMA Towers for Users certification is valid for 5 years from the date of successful
                completion. After this period, the card expires and the holder must complete a renewal
                course to maintain their certified status. The renewal course is shorter than the initial
                course as it builds on existing knowledge.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Renewal Timeline</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">1</span>
                    <p><strong className="text-white">Years 1-4:</strong> Card is valid. Maintain competence through regular practice. Employer should monitor ongoing competence.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">2</span>
                    <p><strong className="text-white">3 months before expiry:</strong> Book renewal course. PASMA sends reminder notifications to cardholders.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">3</span>
                    <p><strong className="text-white">Renewal course:</strong> Shorter than the initial course. Updates on regulation changes, refreshes practical skills, and assesses current competence.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">4</span>
                    <p><strong className="text-white">New card issued:</strong> Valid for a further 5 years from the renewal date. Old card becomes invalid.</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">What Happens if Your Card Expires?</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>You lose your certified status on the PASMA register</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Most sites will not permit you to assemble or use towers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If your card has been expired for more than 12 months, you may need to complete the full initial course again rather than the shorter renewal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Your employer may be in breach of the Regulations if they allow you to carry out tower work with an expired card</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Employer Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Employer Responsibilities for Training
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The employer bears the primary legal duty to ensure that anyone who assembles, alters,
                dismantles, inspects, or works from a mobile scaffold tower is competent to do so. This
                duty goes well beyond simply sending someone on a course &mdash; it requires an ongoing
                commitment to training, assessment, and development.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Employer's Duty Includes:</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Identify training needs:</strong> Determine which workers need PASMA training based on their job roles and the types of towers they will use.</p>
                  <p><strong className="text-white">2. Provide appropriate training:</strong> Fund and arrange PASMA courses (or equivalent) appropriate to the type of tower work involved.</p>
                  <p><strong className="text-white">3. Verify competence:</strong> Check that training has been received, cards are valid, and workers can demonstrate practical ability.</p>
                  <p><strong className="text-white">4. Monitor ongoing competence:</strong> Observe workers assembling and using towers to ensure standards are maintained.</p>
                  <p><strong className="text-white">5. Provide refresher training:</strong> Arrange renewal courses before cards expire and provide additional training if competence concerns arise.</p>
                  <p><strong className="text-white">6. Supervise appropriately:</strong> Ensure the level of supervision matches the experience and competence of each worker.</p>
                  <p><strong className="text-white">7. Keep records:</strong> Maintain up-to-date records of training, assessments, and card validity dates.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Good Practice</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Training matrix with expiry date alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Annual competence reviews for tower users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Toolbox talks on tower safety updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mentoring programme for newly qualified operatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Incident reporting and lessons learned sharing</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Common Employer Failures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Relying solely on a PASMA card without assessing competence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Allowing workers with expired cards to continue tower work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Not providing supervision for inexperienced workers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No training records maintained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Not budgeting for renewal training</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: PASMA Card Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            PASMA Card Types
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PASMA offers several different courses and card types to match different roles and
                responsibilities in the tower scaffold industry. Understanding which card you need
                depends on what you will be doing with mobile access towers.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Towers for Users</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The core PASMA course for anyone who will assemble, alter, dismantle, move, inspect,
                    or work from a mobile access tower. Includes both theory and practical elements.
                  </p>
                  <p className="text-xs text-white/60">Duration: 1 day | Validity: 5 years | Assessment: Theory + Practical</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Towers for Managers</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    A classroom-based course for supervisors, managers, and safety professionals who
                    need to understand tower safety but will not physically assemble towers.
                  </p>
                  <p className="text-xs text-white/60">Duration: Half day | Validity: 5 years | Assessment: Theory only</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Work at Height Essentials</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    A general awareness course covering the fundamentals of working at height safely.
                    Suitable for all workers, not just those using towers.
                  </p>
                  <p className="text-xs text-white/60">Duration: Half day | Validity: 5 years | Assessment: Theory</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Combined & Specialist Courses</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    PASMA also offers combined courses (e.g. Towers for Users + Low Level Access), specialist
                    courses for complex towers and cantilever configurations, and an instructor course for
                    those who wish to deliver PASMA training.
                  </p>
                  <p className="text-xs text-white/60">Duration: Varies | Validity: 5 years | Prerequisites may apply</p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">PASMA Online Card Verification</p>
                <p className="text-sm text-white/80">
                  Every PASMA card can be verified online through the PASMA website. Site managers and
                  employers can enter the card number to confirm the holder's name, course type, issue
                  date, and expiry date. This provides an instant check of whether a worker's certification
                  is current and valid.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: BS EN 1004-1:2020
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-2">
              Next: Module 2 &mdash; Tower Types
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
