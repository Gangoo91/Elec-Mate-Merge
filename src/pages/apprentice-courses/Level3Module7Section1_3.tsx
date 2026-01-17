/**
 * Level 3 Module 7 Section 1.3 - Trade Bodies and Registration
 * Understanding professional trade bodies and registration requirements
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Trade Bodies and Registration - Level 3 Module 7 Section 1.3";
const DESCRIPTION = "Understanding NICEIC, NAPIT, ECA, JIB and other professional trade bodies in the UK electrical industry, including registration requirements and competent person schemes.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of a Competent Person Scheme in relation to Part P of the Building Regulations?",
    options: [
      "To provide cheap insurance",
      "To allow registered contractors to self-certify notifiable electrical work",
      "To supply tools and materials",
      "To offer training courses only"
    ],
    correctIndex: 1,
    explanation: "Competent Person Schemes (such as NICEIC, NAPIT, ELECSA) allow registered contractors to self-certify their work as compliant with Building Regulations Part P, without needing to notify Building Control for each job."
  },
  {
    id: "check-2",
    question: "What does the JIB (Joint Industry Board) primarily do for the electrical industry?",
    options: [
      "Tests electrical equipment",
      "Sets employment grades, pay rates, and issues ECS cards",
      "Provides insurance cover",
      "Supplies training materials only"
    ],
    correctIndex: 1,
    explanation: "The JIB (Joint Industry Board) sets national employment grades and pay rates for electricians, issues ECS (Electrotechnical Certification Scheme) cards, and maintains standards for employment in the electrical contracting industry."
  },
  {
    id: "check-3",
    question: "What happens during a Competent Person Scheme assessment visit?",
    options: [
      "They only check your qualifications",
      "They inspect work quality, documentation, test equipment calibration, and compliance systems",
      "They just collect the annual fee",
      "They test your knowledge with a written exam"
    ],
    correctIndex: 1,
    explanation: "Assessment visits involve checking: quality of completed work, proper documentation and certification, test instrument calibration, complaint handling procedures, and overall compliance with scheme requirements and BS 7671."
  },
  {
    id: "check-4",
    question: "What is the ECA (Electrical Contractors' Association)?",
    options: [
      "A government regulator",
      "A trade association representing electrical contractors' interests",
      "An insurance company",
      "A training provider only"
    ],
    correctIndex: 1,
    explanation: "The ECA is the UK's leading trade association for electrical contractors. It represents members' interests, provides business support, offers legal and technical advice, and lobbies government on industry issues."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is a recognised Competent Person Scheme for electrical work?",
    options: [
      "HSE",
      "NICEIC",
      "HMRC",
      "Building Control"
    ],
    correctAnswer: 1,
    explanation: "NICEIC (National Inspection Council for Electrical Installation Contracting) is one of the main Competent Person Schemes authorised by the government to allow self-certification of electrical work under Part P."
  },
  {
    id: 2,
    question: "What does Part P of the Building Regulations cover?",
    options: [
      "Plumbing installations",
      "Electrical safety in dwellings",
      "Fire safety in commercial buildings",
      "Structural alterations"
    ],
    correctAnswer: 1,
    explanation: "Part P of the Building Regulations applies to electrical safety in dwellings (domestic properties). It requires certain electrical work to be either carried out by a registered competent person or notified to Building Control."
  },
  {
    id: 3,
    question: "How often must a contractor typically renew their Competent Person Scheme registration?",
    options: [
      "Every 5 years",
      "Every 2 years",
      "Annually",
      "Once qualified, no renewal needed"
    ],
    correctAnswer: 2,
    explanation: "Competent Person Scheme registration typically requires annual renewal, including payment of fees, maintaining qualifications, and undergoing periodic assessment visits."
  },
  {
    id: 4,
    question: "What colour ECS card does an Approved Electrician hold?",
    options: [
      "Blue",
      "Red",
      "Gold",
      "Green"
    ],
    correctAnswer: 2,
    explanation: "An Approved Electrician holds a Gold ECS card, indicating they have completed their apprenticeship, achieved full qualifications, and are competent to work independently."
  },
  {
    id: 5,
    question: "What is the alternative to using a Competent Person Scheme for notifiable electrical work?",
    options: [
      "There is no alternative - you must be registered",
      "Notify Building Control before starting work",
      "Just issue your own certificate",
      "Ask a friend to sign off the work"
    ],
    correctAnswer: 1,
    explanation: "If not registered with a Competent Person Scheme, you must notify Building Control before starting notifiable work. They will inspect and issue a completion certificate (for a fee)."
  },
  {
    id: 6,
    question: "What does NAPIT stand for?",
    options: [
      "National Association of Professional Inspectors and Testers",
      "National Association of Professional Inspection and Testing",
      "National Association of Professional Installation Technicians",
      "New Assessment Programme for Installation Training"
    ],
    correctAnswer: 2,
    explanation: "NAPIT stands for National Association of Professional Inspectors and Testers. It is another major Competent Person Scheme operator alongside NICEIC and ELECSA."
  },
  {
    id: 7,
    question: "What must a Qualified Supervisor (QS) have to oversee work for a competent person scheme?",
    options: [
      "Level 2 qualification only",
      "Level 3 qualification plus inspection and testing qualification (e.g., 2391)",
      "No formal qualifications required",
      "Just 10 years of experience"
    ],
    correctAnswer: 1,
    explanation: "A Qualified Supervisor typically needs a Level 3 installation qualification plus an inspection and testing qualification (such as 2391), along with suitable experience, to sign off work under a competent person scheme."
  },
  {
    id: 8,
    question: "Which types of work are typically 'notifiable' under Part P?",
    options: [
      "Like-for-like replacements only",
      "New circuits, consumer unit changes, work in bathrooms and kitchens (special locations)",
      "Changing light fittings",
      "Adding a single socket to an existing circuit"
    ],
    correctAnswer: 1,
    explanation: "Notifiable work includes: new circuits, consumer unit changes/additions, work in special locations (bathrooms, kitchens near sinks, outdoors, swimming pools), and certain other installations requiring building control notification."
  },
  {
    id: 9,
    question: "What benefit does ECA membership provide beyond competent person registration?",
    options: [
      "Free tools and materials",
      "Guaranteed contracts",
      "Business support, legal advice, and representation of industry interests",
      "Higher pay rates"
    ],
    correctAnswer: 2,
    explanation: "ECA membership provides trade association benefits including business support services, legal and technical helplines, contract advice, training access, and representation of contractors' interests to government and industry bodies."
  },
  {
    id: 10,
    question: "What is the purpose of the Technical Helpline services offered by trade bodies?",
    options: [
      "To report competitors",
      "To provide guidance on technical and regulatory questions",
      "To order materials",
      "To book holidays"
    ],
    correctAnswer: 1,
    explanation: "Technical helplines provide members with expert guidance on technical matters, BS 7671 interpretation, regulatory compliance questions, and practical installation queries - a valuable support resource."
  }
];

const faqs = [
  {
    question: "Do I need to be registered with a Competent Person Scheme to work as an electrician?",
    answer: "No, registration is not legally required to work as an electrician. However, if you want to self-certify notifiable domestic electrical work under Part P, you must be registered. Without registration, you must notify Building Control for each notifiable job, which adds cost and delay. Most domestic electricians therefore choose to register."
  },
  {
    question: "What is the difference between NICEIC, NAPIT, and ELECSA?",
    answer: "All three are authorised Competent Person Scheme operators. They offer similar core services (self-certification ability, assessment, technical support) but may differ in fees, assessment frequency, additional benefits, and membership services. Choose based on cost, local support, and what best fits your business needs."
  },
  {
    question: "How much does Competent Person Scheme registration cost?",
    answer: "Costs vary by scheme and business size, but typically range from £300-600 per year for a sole trader. This includes registration, assessment visits, and access to scheme services. Additional costs may apply for multiple operatives or additional services. Compare schemes as prices and benefits differ."
  },
  {
    question: "What happens if I fail an assessment visit?",
    answer: "If issues are found during assessment, you will typically receive a report detailing problems and required improvements. You may be given a timeframe to address issues. Serious or repeated failures could result in suspension or removal from the scheme. Most issues can be resolved through corrective action and improved procedures."
  },
  {
    question: "Can I be registered with more than one Competent Person Scheme?",
    answer: "Yes, you can register with multiple schemes, but there is usually no practical benefit. One registration allows you to self-certify Part P work. Some contractors register with schemes that specialise in different areas (e.g., one for electrical, another for gas), but for electrical work alone, one registration suffices."
  },
  {
    question: "What is the difference between a trade body (like ECA) and a Competent Person Scheme (like NICEIC)?",
    answer: "A trade body (ECA, SELECT, EFT) represents members' interests, provides business support, and lobbies government. A Competent Person Scheme (NICEIC, NAPIT, ELECSA) specifically authorises self-certification under Building Regulations. Some organisations offer both services. You might join a trade body for business benefits and a scheme for self-certification."
  }
];

const Level3Module7Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section1">
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
            <span>Module 7.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Trade Bodies and Registration
          </h1>
          <p className="text-white/80">
            Understanding NICEIC, NAPIT, ECA, JIB and competent person schemes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>NICEIC/NAPIT:</strong> Competent Person Schemes for self-certification</li>
              <li><strong>JIB:</strong> Sets grades, pay rates, issues ECS cards</li>
              <li><strong>ECA:</strong> Trade association representing contractors</li>
              <li><strong>Part P:</strong> Building Regs requiring notification of domestic work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Why It Matters</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Credibility:</strong> Registration proves competence to clients</li>
              <li><strong>Compliance:</strong> Self-certify without Building Control</li>
              <li><strong>Support:</strong> Technical helplines and business advice</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The role of Competent Person Schemes (NICEIC, NAPIT, ELECSA)",
              "What Part P of the Building Regulations requires",
              "How the JIB grading and ECS card system works",
              "The difference between trade bodies and certification schemes",
              "Requirements for becoming a Qualified Supervisor",
              "Benefits and costs of scheme registration"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - Competent Person Schemes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Competent Person Schemes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Competent Person Schemes were introduced as part of Part P of the Building Regulations (2005, revised 2013) to allow qualified electrical contractors to self-certify their domestic electrical work without involving Building Control for every job. This streamlines the process while maintaining safety standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Major Competent Person Schemes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>NICEIC</strong> - National Inspection Council for Electrical Installation Contracting (largest scheme)</li>
                <li><strong>NAPIT</strong> - National Association of Professional Inspectors and Testers</li>
                <li><strong>ELECSA</strong> - Electrical Self-Assessment (part of Certsure)</li>
                <li><strong>STROMA</strong> - Offers multiple competent person scheme registrations</li>
                <li><strong>OFTEC</strong> - Primarily oil heating but offers electrical registration</li>
              </ul>
            </div>

            <p>
              To join a scheme, you need: appropriate qualifications (Level 3 Electrical Installation), inspection and testing qualification (2391 or equivalent), public liability insurance, and must pass an initial assessment. Schemes conduct regular assessment visits to maintain standards.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> Registration with a Competent Person Scheme is not a qualification - it is a licence to self-certify. You must already hold the relevant qualifications before applying.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Part P Building Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Part P of the Building Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part P applies to electrical installations in dwellings (houses, flats, maisonettes) and their associated outbuildings and gardens. It requires certain types of electrical work to be notified to Building Control or carried out by a registered competent person who can self-certify compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notifiable Work (requires notification or scheme registration)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installing a new circuit</li>
                  <li>Consumer unit replacement or alteration</li>
                  <li>Work in special locations (bathrooms, outdoors)</li>
                  <li>Work in kitchens within 3m of a sink</li>
                  <li>Installing a new distribution board</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Notifiable Work (no notification required)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Like-for-like replacements</li>
                  <li>Adding sockets/lights to existing circuits (not special locations)</li>
                  <li>Repairs and maintenance</li>
                  <li>Installing low voltage equipment (e.g., telephone, data)</li>
                  <li>Prefabricated equipment sets (cooker, shower) with manufacturer's instructions</li>
                </ul>
              </div>
            </div>

            <p>
              Even non-notifiable work must still comply with BS 7671 and be safe. The difference is in the administrative requirement, not the standard of workmanship. All work should be tested and an appropriate certificate issued.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Installing a new circuit for an electric vehicle charger in a domestic garage is notifiable work. A registered contractor can self-certify and issue the Building Regulations Compliance Certificate. An unregistered person must notify Building Control before starting work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - JIB and ECS Cards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The JIB and ECS Card System
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Joint Industry Board (JIB) is the body responsible for setting employment standards in the electrical contracting industry. It establishes grading structures, nationally agreed pay rates, and manages the ECS (Electrotechnical Certification Scheme) card system that proves an individual's competence and qualifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ECS Card Grades (main categories):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Blue Card - Apprentice</strong> - Enrolled on recognised apprenticeship programme</li>
                <li><strong>Green Card - Improver/Trainee</strong> - Recently qualified, gaining experience</li>
                <li><strong>Gold Card - Approved Electrician</strong> - Fully qualified, can work independently</li>
                <li><strong>Gold Card - Technician</strong> - Senior grade with additional competencies</li>
                <li><strong>Black Card - Supervisor/Manager</strong> - Leadership and management roles</li>
              </ul>
            </div>

            <p>
              ECS cards are required for site access on most construction projects. They include the holder's photo, qualifications, expiry date, and health and safety test (HS&E test) status. Cards must be renewed (typically every 3-5 years) and holders must maintain their qualifications and HS&E test.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>SJIB in Scotland:</strong> The Scottish Joint Industry Board (SJIB) operates similarly in Scotland, issuing SECTT (Scottish Electrical Charitable Training Trust) cards and maintaining Scottish-specific employment standards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Trade Associations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Trade Associations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Trade associations represent electrical contractors' interests and provide business support services. Unlike Competent Person Schemes, they do not authorise self-certification but offer valuable benefits including lobbying government, providing contracts and advice, and promoting professional standards.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">ECA</p>
                <p className="text-white/90 text-xs">Electrical Contractors' Association - UK's largest electrical trade body</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">SELECT</p>
                <p className="text-white/90 text-xs">Trade association for electrical contractors in Scotland</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EFT</p>
                <p className="text-white/90 text-xs">Electrical Federation of Trade - represents electrical wholesalers</p>
              </div>
            </div>

            <p>
              Trade association membership provides: access to standard contracts, legal and commercial advice, technical helplines, training and CPD opportunities, business development resources, and networking with other contractors. Many contractors combine trade association membership with Competent Person Scheme registration.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Professional Bodies:</strong> The IET (Institution of Engineering and Technology) is the professional body for engineers and technicians. Membership demonstrates professional commitment and provides access to Wiring Matters magazine, technical resources, and networking opportunities.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Choosing a Competent Person Scheme</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Compare costs - registration fees, assessment visit charges, additional services</li>
                <li>Check local support - assessor availability, regional office presence</li>
                <li>Evaluate additional benefits - technical helpline quality, insurance options, marketing support</li>
                <li>Read reviews from other contractors about their experience with the scheme</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Preparing for Assessment Visits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep completed certificates and documentation organised and accessible</li>
                <li>Ensure test instruments are in calibration (usually annually)</li>
                <li>Have examples of recent work available for discussion if requested</li>
                <li>Maintain records of customer complaints and how they were resolved</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Letting registration lapse</strong> - You cannot self-certify during gaps in registration</li>
                <li><strong>Poor documentation</strong> - Incomplete certificates are a common assessment failure</li>
                <li><strong>Out-of-date calibration</strong> - Test equipment must be within calibration dates</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Key Bodies</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Competent Person Schemes</p>
                <ul className="space-y-0.5">
                  <li>NICEIC - Self-certification + technical support</li>
                  <li>NAPIT - Self-certification + member benefits</li>
                  <li>ELECSA - Self-certification + industry recognition</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Industry Bodies</p>
                <ul className="space-y-0.5">
                  <li>JIB - Employment grades, ECS cards, pay rates</li>
                  <li>ECA - Trade association, business support</li>
                  <li>IET - Professional body for engineers</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Employment Routes
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section1-4">
              Next: Apprenticeships & AM2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module7Section1_3;
