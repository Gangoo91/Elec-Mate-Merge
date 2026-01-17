/**
 * Level 3 Module 7 Section 4.5 - Industry Qualifications
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
const TITLE = "Industry Qualifications for Electricians - Level 3 Module 7 Section 4.5";
const DESCRIPTION = "Comprehensive guide to UK electrical qualifications. Learn about ECS cards, Part P registration, competent person schemes (NICEIC, NAPIT, ELECSA), and professional body membership.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the AM2 assessment?",
    options: [
      "A written exam only",
      "A practical assessment of installation skills demonstrating occupational competence",
      "An online test about regulations",
      "A first aid qualification"
    ],
    correctIndex: 1,
    explanation: "The AM2 is a practical assessment that tests your ability to complete installation work to industry standards. It's typically required at the end of an apprenticeship to demonstrate occupational competence."
  },
  {
    id: "check-2",
    question: "What is the main purpose of Part P of the Building Regulations?",
    options: [
      "To set electrician pay rates",
      "To ensure electrical work in dwellings is safe and compliant",
      "To regulate commercial electrical installations only",
      "To provide insurance for electrical work"
    ],
    correctIndex: 1,
    explanation: "Part P regulates electrical safety in dwellings. It requires that electrical work is designed, installed, inspected, and tested safely. Certain notifiable work must be certified through a competent person scheme or building control."
  },
  {
    id: "check-3",
    question: "What is a competent person scheme?",
    options: [
      "A scheme that pays for electrical training",
      "A government-authorised scheme allowing members to self-certify notifiable work under Part P",
      "A union membership requirement",
      "An insurance scheme for electricians"
    ],
    correctIndex: 1,
    explanation: "Competent person schemes (like NICEIC, NAPIT, ELECSA) are authorised by government to allow registered members to self-certify their notifiable electrical work in dwellings, without involving building control."
  },
  {
    id: "check-4",
    question: "Which qualification is typically required to inspect and test existing electrical installations?",
    options: [
      "Level 2 Diploma only",
      "C&G 2391 or equivalent inspection and testing qualification",
      "AM2 only",
      "No specific qualification is needed"
    ],
    correctIndex: 1,
    explanation: "The C&G 2391 (or equivalent like C&G 2394/2395 combined) is the standard qualification for inspection and testing. It demonstrates competence to inspect, test, and report on electrical installations."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does ECS stand for?",
    options: [
      "Electrical Compliance Scheme",
      "Electrotechnical Certification Scheme",
      "Engineering Competence Standard",
      "Electrical Contractor Services"
    ],
    correctAnswer: 1,
    explanation: "ECS stands for Electrotechnical Certification Scheme. The ECS card is the industry ID card that evidences your qualifications, competence level, and health and safety training."
  },
  {
    id: 2,
    question: "Which of the following is NOT a competent person scheme for electrical work?",
    options: [
      "NICEIC",
      "NAPIT",
      "HSE",
      "ELECSA"
    ],
    correctAnswer: 2,
    explanation: "The HSE (Health and Safety Executive) is a regulatory body, not a competent person scheme. NICEIC, NAPIT, and ELECSA are all recognised competent person schemes for electrical work."
  },
  {
    id: 3,
    question: "What is the C&G 2382 qualification?",
    options: [
      "A practical installation qualification",
      "The BS 7671 Requirements for Electrical Installations qualification",
      "A first aid certificate",
      "A management qualification"
    ],
    correctAnswer: 1,
    explanation: "C&G 2382 is the City & Guilds qualification covering BS 7671 (the Wiring Regulations). It demonstrates knowledge of the requirements for electrical installations and is essential for qualified electricians."
  },
  {
    id: 4,
    question: "What work is notifiable under Part P of the Building Regulations?",
    options: [
      "All electrical work without exception",
      "Only work in commercial premises",
      "New circuits and work in special locations (bathrooms, outdoors) in dwellings",
      "Only work done by qualified electricians"
    ],
    correctAnswer: 2,
    explanation: "Notifiable work under Part P includes new circuits, consumer unit changes/replacements, and work in special locations (bathrooms, swimming pools, gardens) in dwellings. Minor works like adding a socket to an existing circuit are typically non-notifiable."
  },
  {
    id: 5,
    question: "What qualification is the C&G 2919?",
    options: [
      "Solar PV installation",
      "Electric Vehicle charging equipment installation",
      "Fire alarm systems",
      "Emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "C&G 2919 covers the installation of electric vehicle charging equipment. It's an important qualification as EV charging becomes increasingly common and has specific requirements."
  },
  {
    id: 6,
    question: "Which card colour indicates an Installation Electrician on the ECS scheme?",
    options: [
      "Blue",
      "Gold",
      "Red",
      "Green"
    ],
    correctAnswer: 1,
    explanation: "The Gold ECS card indicates a fully qualified Installation Electrician who has completed their apprenticeship and AM2 assessment. Different card colours indicate different qualification levels."
  },
  {
    id: 7,
    question: "What is required to maintain ECS card validity?",
    options: [
      "Nothing once issued",
      "Renewal every 5 years with evidence of CPD and current health and safety training",
      "Annual exams",
      "Monthly fee payments only"
    ],
    correctAnswer: 1,
    explanation: "ECS cards must be renewed every 5 years. You need to provide evidence of continuing professional development and hold a current health and safety qualification (like CSCS health and safety test)."
  },
  {
    id: 8,
    question: "What does MCS certification relate to?",
    options: [
      "Motor control systems",
      "Microgeneration Certification Scheme (solar PV, heat pumps)",
      "Mechanical control services",
      "Master craftsman status"
    ],
    correctAnswer: 1,
    explanation: "MCS (Microgeneration Certification Scheme) certification is required to install renewable technologies (solar PV, heat pumps, batteries) where customers want to access government grants or feed-in tariffs."
  },
  {
    id: 9,
    question: "Which organisation would you join for professional membership as an electrical engineer?",
    options: [
      "The Plumbing Association",
      "The Institution of Engineering and Technology (IET)",
      "The Royal Society of Chemistry",
      "The Chartered Institute of Building"
    ],
    correctAnswer: 1,
    explanation: "The IET (Institution of Engineering and Technology) is the relevant professional body for electrical engineers and technicians. Membership provides professional recognition and access to resources."
  },
  {
    id: 10,
    question: "What is the purpose of the SSSTS certification?",
    options: [
      "Site Safety Training Scheme - health and safety for supervisors on construction sites",
      "Socket System Testing Standard",
      "Solar System Technical Standard",
      "Security System Testing Specification"
    ],
    correctAnswer: 0,
    explanation: "SSSTS (Site Supervisors Safety Training Scheme) provides health and safety training for those supervising work on construction sites. It's often required for site supervisor roles."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I need to be registered with a competent person scheme?",
    answer: "If you work on notifiable domestic electrical work, you either need to be registered with a competent person scheme or notify building control for each job (and pay their fees). For regular domestic work, scheme membership is more practical and cost-effective."
  },
  {
    question: "Which competent person scheme should I join?",
    answer: "The main schemes (NICEIC, NAPIT, ELECSA, STROMA) all provide the same legal authorisation. Consider: cost of membership and renewals, assessment process, additional services offered, recognition in your area, and whether your employer has a preference."
  },
  {
    question: "Can I do commercial work without scheme membership?",
    answer: "Yes. Part P and competent person schemes specifically relate to domestic dwellings. Commercial, industrial, and public building work doesn't require scheme membership, though clients may still prefer registered contractors."
  },
  {
    question: "What's the difference between C&G 2391 and C&G 2394/2395?",
    answer: "They're equivalent qualifications for inspection and testing. The 2391 is a combined qualification, while 2394 (initial verification) and 2395 (periodic inspection) can be taken separately. Most employers accept either route."
  },
  {
    question: "How do I get my ECS card?",
    answer: "Apply through the JIB website with evidence of your qualifications, AM2 pass (for Gold card), and current health and safety qualification. Your employer may handle the application. Cards are issued based on your qualification level."
  },
  {
    question: "What qualifications do I need for solar PV installation?",
    answer: "You need electrical qualifications plus specific solar PV training. To access government schemes and be MCS registered, you typically need a qualification like C&G 2399 or equivalent, plus work for an MCS-certified company."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section4_5 = () => {
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
            <Link to="/study-centre/apprentice/level3-module7-section4">
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
            <span>Module 7.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Industry Qualifications
          </h1>
          <p className="text-white/80">
            Essential qualifications, cards, and registrations for UK electricians
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ECS Card:</strong> Industry ID proving qualifications and competence</li>
              <li><strong>Part P:</strong> Building Regulations for domestic electrical safety</li>
              <li><strong>Schemes:</strong> NICEIC, NAPIT, ELECSA for self-certification</li>
              <li><strong>Specialist:</strong> Additional qualifications for EV, solar, testing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Requirements for the work you want to do</li>
              <li><strong>Use:</strong> Right qualifications for each type of work</li>
              <li><strong>Apply:</strong> Plan qualification pathway for career goals</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the ECS card system and requirements",
              "Know the requirements of Part P Building Regulations",
              "Identify the main competent person schemes",
              "Recognise specialist qualifications and when they're needed",
              "Understand professional body membership benefits",
              "Plan your qualification pathway for career goals"
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
            ECS Cards and the JIB
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electrotechnical Certification Scheme (ECS) provides the industry-standard ID card for electrical workers. Administered by the JIB (Joint Industry Board), ECS cards evidence your qualifications, competence level, and health and safety training.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common ECS Card Types:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Gold - Installation Electrician:</strong> Fully qualified, completed apprenticeship and AM2</li>
                <li><strong>Gold - Approved Electrician:</strong> Installation Electrician plus inspection and testing qualification</li>
                <li><strong>Blue - Apprentice:</strong> Undertaking formal electrical apprenticeship</li>
                <li><strong>White - Provisional:</strong> Working towards full qualification</li>
                <li><strong>Green - Labourer:</strong> Non-skilled support worker</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ECS Card Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Relevant electrical qualifications for your grade</li>
                <li>AM2 (or AM2S) for Installation Electrician grade</li>
                <li>Valid health and safety qualification (CSCS test or equivalent)</li>
                <li>Renewal every 5 years with evidence of CPD</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Many construction sites require ECS cards for access. Keep yours current and carry it whenever working on site. It's your professional ID.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Part P and Building Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part P of the Building Regulations (England) regulates electrical safety in dwellings. Its purpose is to ensure electrical work is designed, installed, inspected, and tested so that it's safe. Similar regulations apply in Wales, Scotland (through building standards), and Northern Ireland.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notifiable Work (requires certification)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>New circuits</li>
                  <li>Consumer unit replacement</li>
                  <li>Work in bathrooms (new circuits)</li>
                  <li>Work outdoors</li>
                  <li>Work in swimming pool zones</li>
                  <li>Work in saunas</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Notifiable Work</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Adding sockets/lights to existing circuits</li>
                  <li>Like-for-like replacements</li>
                  <li>Repairs and maintenance</li>
                  <li>Work not in special locations</li>
                  <li>Minor alterations to existing circuits</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Adding a new socket outlet to an existing ring circuit in a living room is non-notifiable. Installing a new circuit for an electric shower in a bathroom is notifiable and requires certification.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Competent Person Schemes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Competent person schemes are government-authorised to allow registered members to self-certify their notifiable electrical work in dwellings. This means you can certify your own work without involving building control for each job.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Main Competent Person Schemes:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>NICEIC:</strong> National Inspection Council for Electrical Installation Contracting - largest scheme</li>
                <li><strong>NAPIT:</strong> National Association of Professional Inspectors and Testers</li>
                <li><strong>ELECSA:</strong> Electrical Self-Assessment scheme</li>
                <li><strong>STROMA:</strong> Offers electrical and other building services certification</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Scheme Membership Typically Requires:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Appropriate electrical qualifications</li>
                <li>Adequate test equipment (calibrated)</li>
                <li>Public liability insurance</li>
                <li>Initial assessment of competence</li>
                <li>Ongoing periodic assessments</li>
                <li>Annual CPD requirements</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> Scheme membership allows you to notify and certify your own notifiable work. Without membership, you must notify building control and pay their fees for each notifiable job.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Specialist Qualifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond core electrical qualifications, specialist qualifications demonstrate competence in specific areas. These are increasingly important as the industry diversifies into new technologies and specialist fields.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">C&G 2391</p>
                <p className="text-white/90 text-xs">Inspection and Testing</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">C&G 2919</p>
                <p className="text-white/90 text-xs">EV Charging Installation</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">C&G 2399</p>
                <p className="text-white/90 text-xs">Solar PV Installation</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Other Specialist Areas:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fire alarm systems:</strong> FIA qualifications, BS 5839 training</li>
                <li><strong>Emergency lighting:</strong> BS 5266 training</li>
                <li><strong>Data and communications:</strong> C&G 3667 and similar</li>
                <li><strong>Heat pumps:</strong> Specific training for GSHP/ASHP</li>
                <li><strong>Battery storage:</strong> Manufacturer and general training</li>
                <li><strong>High voltage:</strong> HV authorisation and training</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> To install EV charging points professionally, you need core electrical qualifications plus C&G 2919 (or equivalent). To be OZEV-approved (for government grants), you must work for an approved installer and meet additional criteria.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Your Qualification Portfolio</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with core qualifications (Level 3 Diploma, AM2, C&G 2382)</li>
                <li>Add inspection and testing (C&G 2391) to become Approved Electrician</li>
                <li>Consider specialist qualifications based on market demand</li>
                <li>Keep qualifications current - update for BS 7671 changes</li>
                <li>Join a competent person scheme when doing domestic work</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Body Membership</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>IET membership demonstrates professional commitment</li>
                <li>Access to technical resources and guidance</li>
                <li>Pathway to professional registration (EngTech, IEng, CEng)</li>
                <li>Networking and industry events</li>
                <li>Discounts on publications and training</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Expired cards</strong> - Keep ECS card and scheme memberships current</li>
                <li><strong>Working beyond qualifications</strong> - Only do work you're qualified for</li>
                <li><strong>Ignoring Part P</strong> - Notifiable work must be certified properly</li>
                <li><strong>No evidence</strong> - Keep certificates and qualification evidence organised</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Industry Qualifications</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Core Qualifications</p>
                <ul className="space-y-0.5">
                  <li>Level 3 Diploma in Electrical Installation</li>
                  <li>C&G 2382 - BS 7671 Requirements</li>
                  <li>AM2 - Practical Assessment</li>
                  <li>C&G 2391 - Inspection and Testing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Competent Person Schemes</p>
                <ul className="space-y-0.5">
                  <li>NICEIC - Domestic Installer / Approved Contractor</li>
                  <li>NAPIT - Electrical schemes</li>
                  <li>ELECSA - Electrical self-assessment</li>
                  <li>STROMA - Multi-discipline scheme</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section5">
              Next: Section 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section4_5;
