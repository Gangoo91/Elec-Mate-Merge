import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Users, Smartphone, ShieldCheck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-cop-standing",
    question: "What is the legal standing of the PASMA Code of Practice?",
    options: [
      "It is a criminal law enforceable by the police",
      "It is not law but is considered best practice by the HSE",
      "It is a European directive that overrides UK law",
      "It only applies to PASMA member companies"
    ],
    correctIndex: 1,
    explanation: "The PASMA Code of Practice is not legislation, but it is widely recognised as industry best practice by the HSE. It is frequently referenced in court cases and enforcement action as the benchmark for competent tower use."
  },
  {
    id: "pasma-card-validity",
    question: "How long is a PASMA Towers for Users card valid?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "Lifetime"
    ],
    correctIndex: 2,
    explanation: "PASMA cards are valid for 5 years from the date of training. After 5 years, operatives must complete a refresher course to renew their certification and maintain competence."
  },
  {
    id: "pasma-digital-date",
    question: "From what date did PASMA transition to digital certification?",
    options: [
      "1 January 2024",
      "31 March 2025",
      "1 April 2026",
      "30 June 2025"
    ],
    correctIndex: 1,
    explanation: "PASMA transitioned to digital certification from 31 March 2025, replacing the traditional physical card system with a digital card accessible via app and online portal."
  }
];

const faqs = [
  {
    question: "What is PASMA and why does it matter?",
    answer: "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) is the lead trade body for the mobile access tower industry. Founded in 1974, it sets the industry standard for tower training and best practice. Holding a PASMA card demonstrates that you are competent to assemble, use, and dismantle mobile towers safely. Most sites and employers require PASMA certification as a condition of working with towers."
  },
  {
    question: "Is PASMA training a legal requirement?",
    answer: "PASMA training itself is not specifically required by law. However, the Work at Height Regulations 2005 require that work at height is carried out by competent persons. PASMA training is the industry-recognised way to demonstrate competence in mobile tower work. In practice, most sites require a valid PASMA card, and the HSE considers PASMA training as strong evidence of competence."
  },
  {
    question: "What happens if my PASMA card expires?",
    answer: "If your PASMA card expires, you are no longer able to demonstrate current competence in mobile tower work. Most sites will not allow you to assemble or work from towers without a valid card. You will need to complete a refresher course to renew your certification. There is no grace period — once expired, you must retrain before resuming tower work."
  },
  {
    question: "Can I still use a physical PASMA card after the digital transition?",
    answer: "Physical cards issued before 31 March 2025 remain valid until their expiry date. However, all new certifications and renewals from that date onwards are issued digitally only. You can access your digital card via the PASMA app or the online verification portal at any time."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When was PASMA founded?",
    options: ["1964", "1974", "1984", "1994"],
    correctAnswer: 1,
    explanation: "PASMA was founded in 1974, the same year as the Health and Safety at Work etc. Act. It has been setting standards for mobile tower safety for over 50 years."
  },
  {
    id: 2,
    question: "What does PASMA stand for?",
    options: [
      "Prefabricated Access Suppliers' and Manufacturers' Association",
      "Professional Access Safety and Management Association",
      "Portable Access Scaffolding Manufacturers' Alliance",
      "Platform Access Standards and Methods Association"
    ],
    correctAnswer: 0,
    explanation: "PASMA stands for Prefabricated Access Suppliers' and Manufacturers' Association. It is the lead trade body for the mobile access tower industry in the UK."
  },
  {
    id: 3,
    question: "Which PASMA course is the most commonly taken by tower operatives?",
    options: [
      "Towers for Managers",
      "Low Level Access",
      "Towers for Users",
      "Work at Height Essentials"
    ],
    correctAnswer: 2,
    explanation: "Towers for Users is the most commonly taken PASMA course. It covers the safe assembly, use, and dismantling of mobile scaffold towers and is typically delivered as a half-day practical course."
  },
  {
    id: 4,
    question: "How many member companies does PASMA have approximately?",
    options: [
      "50+",
      "100+",
      "250+",
      "400+"
    ],
    correctAnswer: 3,
    explanation: "PASMA has over 400 member companies, including tower manufacturers, hire companies, training providers, and contractors who commit to upholding PASMA's standards."
  },
  {
    id: 5,
    question: "What is the validity period of a PASMA Towers for Users card?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "A PASMA card is valid for 5 years from the date of successful course completion. After 5 years, a refresher course must be taken to renew the certification."
  },
  {
    id: 6,
    question: "From 31 March 2025, how are new PASMA certifications issued?",
    options: [
      "As physical plastic cards only",
      "As digitally issued certifications via app and online portal",
      "As paper certificates posted to the candidate",
      "As employer-held records only"
    ],
    correctAnswer: 1,
    explanation: "From 31 March 2025, PASMA transitioned to digital certification. All new certifications are issued digitally and can be accessed via the PASMA app and the online verification portal."
  },
  {
    id: 7,
    question: "The PASMA Code of Practice is referenced by the HSE as what?",
    options: [
      "Criminal law",
      "Advisory guidance with no legal weight",
      "Industry best practice for mobile tower work",
      "European legislation"
    ],
    correctAnswer: 2,
    explanation: "The PASMA Code of Practice is considered industry best practice by the HSE. While it is not law itself, it is regularly referenced in enforcement action and court proceedings as the standard against which competence and safe practice are measured."
  },
  {
    id: 8,
    question: "What is the purpose of the PASMA online verification portal?",
    options: [
      "To book PASMA courses online",
      "To order replacement physical cards",
      "To verify a person's PASMA certification status and validity",
      "To report accidents involving towers"
    ],
    correctAnswer: 2,
    explanation: "The PASMA online verification portal allows employers, site managers, and clients to check whether a person holds a valid, current PASMA certification. This is essential for verifying competence before allowing someone to assemble or work from a tower."
  }
];

export default function PasmaModule1Section3() {
  useSEO({
    title: "PASMA Code of Practice | PASMA Module 1.3",
    description: "What PASMA is, the Code of Practice scope, course types including Towers for Users, digital certification from 31 March 2025, card validity and renewal process.",
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
            <Link to="../pasma-module-1">
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
            <FileText className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            PASMA Code of Practice
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The industry trade body, its Code of Practice, course types, digital certification, and what PASMA credentials mean for your work on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>PASMA:</strong> Trade body since 1974, 400+ members</li>
              <li><strong>CoP:</strong> Industry best practice, referenced by HSE</li>
              <li><strong>Card:</strong> 5-year validity, digital from March 2025</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Check:</strong> Valid PASMA card before tower work</li>
              <li><strong>Verify:</strong> Use online portal or QR code scan</li>
              <li><strong>Renew:</strong> Before expiry to avoid gaps in competence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what PASMA is and its role in the industry",
              "Describe the scope and legal standing of the Code of Practice",
              "Identify the main PASMA course types and their purposes",
              "Understand the digital certification system from 2025",
              "Know the card validity period and renewal process",
              "Verify PASMA credentials using the online portal"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is PASMA? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is PASMA?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PASMA stands for the <strong>Prefabricated Access Suppliers&rsquo; and Manufacturers&rsquo;
                Association</strong>. Founded in 1974, it is a not-for-profit trade body that represents
                the mobile access tower industry in the United Kingdom and beyond.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Facts:</strong> PASMA has over
                  <strong> 400 member companies</strong> including tower manufacturers, hire companies,
                  training providers, and contractors. It is the recognised authority on mobile tower
                  safety and training in the UK construction and facilities management sectors.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">PASMA&rsquo;s Role Includes:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Setting industry standards for mobile tower training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Publishing the Code of Practice for mobile tower use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Developing and maintaining training courses and assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Operating the certification and card scheme for trained operatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Liaising with the HSE and other regulators on tower safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Providing technical guidance to the industry</span>
                  </li>
                </ul>
              </div>

              <p>
                While PASMA is not a government body and its Code of Practice is not law, it is the
                <strong> de facto standard</strong> for demonstrating competence in mobile tower work.
                The vast majority of construction sites, facilities, and employers require a valid PASMA
                card as a condition of working with towers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Code of Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Code of Practice
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The PASMA Code of Practice is the definitive guidance document for the safe use of mobile
                access towers. It brings together legislative requirements, European and British standards,
                and industry best practice into a single, practical reference.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Legal Standing:</strong> The Code of Practice is
                  not law. However, it is considered <strong>best practice by the HSE</strong> and is
                  regularly referenced in court cases, inquests, and enforcement action. Failing to follow
                  the Code of Practice can be used as evidence that a duty holder did not take reasonably
                  practicable steps to manage the risk of falls from height.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Code of Practice Covers:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Selection of the correct tower for the task and environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Planning and risk assessment for tower work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Safe assembly, alteration, and dismantling procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Inspection requirements and competence standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Safe use of towers, including access/egress and loading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Storage, maintenance, and transport of tower components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Specific guidance for advanced configurations and unusual environments</span>
                  </li>
                </ul>
              </div>

              <p>
                The Code of Practice is aligned with the Work at Height Regulations 2005, EN 1004:2020,
                BS 1139-6, and other relevant legislation. It translates these legal and technical
                requirements into clear, practical guidance that tower users can follow on site.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: PASMA Course Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            PASMA Course Types
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PASMA offers a range of training courses tailored to different roles and levels of
                involvement with mobile towers. Each course is designed to provide the knowledge and
                skills appropriate to the person&rsquo;s responsibilities.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-green-400">Towers for Users (Half Day)</p>
                  </div>
                  <p className="text-sm text-white/80">
                    The most common PASMA course. Covers safe assembly, use, and dismantling of standard
                    mobile towers. Includes both theory and hands-on practical assessment. This is the
                    baseline qualification for anyone who will physically assemble or work from a tower.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-blue-400">Towers for Managers (Awareness)</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Designed for managers, supervisors, and safety professionals who need to understand
                    tower safety without physically assembling towers. Covers legal requirements, planning,
                    risk assessment, and supervision duties.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-purple-400">Work at Height Essentials (Online)</p>
                  </div>
                  <p className="text-sm text-white/80">
                    An online awareness course covering general work-at-height principles. Suitable as
                    a pre-course refresher or for those who need a basic understanding of height safety
                    without needing to assemble towers.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-amber-400">Low Level Access &amp; Combined/Plus</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Low Level Access covers platforms under 2.5 metres. Combined and Plus courses extend
                    the standard Towers for Users course with additional modules such as towers on stairways,
                    cantilever towers, or linked towers for advanced configurations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Digital Certification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Digital Certification (from 31 March 2025)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                From 31 March 2025, PASMA transitioned from traditional physical plastic cards to a
                fully digital certification system. This represents the biggest change to the PASMA card
                scheme since its inception and affects how you access and present your credentials.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">What Changed</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">No more physical cards:</strong> New certifications and renewals are issued digitally only. No plastic card will be posted to you.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Digital card via app:</strong> Your PASMA card is accessible through the official PASMA app on your smartphone, available offline once downloaded.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Online portal access:</strong> You can also access and share your certification via the PASMA website verification portal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">QR code verification:</strong> Each digital card includes a QR code that can be scanned by site managers and clients to instantly verify your credentials.</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Benefits of Digital</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Cannot be lost, stolen, or damaged</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Instantly verifiable by anyone with a smartphone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Always up to date with correct expiry information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Available immediately after course completion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No waiting weeks for a card in the post</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">How to Access Your Card</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Download the official PASMA app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Log in with your registered details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Your digital card displays automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Show the card or QR code on demand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Works offline once initially loaded</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Existing Physical Cards</p>
                </div>
                <p className="text-sm text-white/80">
                  Physical cards issued before 31 March 2025 remain valid until their printed expiry date.
                  You do not need to replace them early. However, when your card expires and you complete a
                  refresher course, your new certification will be issued digitally only.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Card Validity & Renewal */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Card Validity &amp; Renewal
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PASMA certifications have a fixed validity period. Understanding the renewal process and
                your employer&rsquo;s duty to check card validity is essential for maintaining compliance
                and ensuring that everyone working with towers is demonstrably competent.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Validity &amp; Renewal Summary</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">5-Year Validity Period</p>
                    <p className="text-sm text-white/80">Every PASMA card is valid for exactly 5 years from the date of successful course completion. There is no automatic renewal and no grace period after expiry.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Renewal Process</p>
                    <p className="text-sm text-white/80">To renew, you must complete a PASMA refresher course before your card expires. The refresher updates your knowledge on any changes to legislation, standards, or best practice that have occurred since your last training.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Expired Card Implications</p>
                    <p className="text-sm text-white/80">Once expired, you can no longer demonstrate current competence. Most sites will refuse entry for tower work. You must complete a full or refresher course to regain your certification.</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Employer Duty to Check:</strong> Employers have a
                  duty under the Work at Height Regulations to ensure that persons working at height are
                  competent. This includes checking that PASMA cards are valid and current before allowing
                  operatives to assemble or work from towers. The online verification system makes this
                  straightforward.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">Common Pitfalls</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Allowing expired card holders to continue assembling towers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not checking card validity at site induction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Assuming a card is valid without online verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Waiting until after expiry to book a refresher course</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Relying on a photocopy rather than the actual card or digital version</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: PASMA Operator Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            PASMA Operative Responsibilities
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Holding a PASMA card means you have demonstrated competence to safely assemble, alter,
                dismantle, and use mobile scaffold towers. But the card comes with responsibilities and
                limitations that you must understand.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">What a PASMA-Trained Operative Must Do</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Follow the manufacturer&rsquo;s instruction manual for the specific tower system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Carry out or arrange a pre-use inspection before each work session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ensure the tower is assembled on firm, level ground with castors locked</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Never exceed the maximum platform height or load capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Use the correct access method (internal ladder or built-in stairway)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Report any defects or damage to components immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not modify the tower in any way not described in the manual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ensure the tower is not used in wind speeds exceeding the manufacturer&rsquo;s limit</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">What the Card Covers</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Standard 3T and advance guardrail towers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Towers from the system you were trained on</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Assembly, use, and dismantling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Pre-use visual inspections</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Limitations</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Does not cover towers on stairways (needs Plus course)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Does not cover cantilever or linked configurations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Does not replace manufacturer-specific familiarisation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Does not qualify you as a scaffold inspector</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Verifying PASMA Credentials */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Verifying PASMA Credentials
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Whether you are a site manager checking a subcontractor&rsquo;s credentials or an
                employer verifying your team&rsquo;s competence, knowing how to check PASMA
                certification is a practical skill you need.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Verification Methods</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Online Verification Portal</p>
                      <p className="text-sm text-white/80">Visit the PASMA website and enter the card holder&rsquo;s details to check their certification status, course type, issue date, and expiry date.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-blue-400">QR Code Scanning</p>
                      <p className="text-sm text-white/80">Digital cards include a QR code. Scan it with any smartphone camera to be taken directly to the verification result, confirming the holder&rsquo;s name, course, and validity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-amber-400">Physical Card Check (Legacy)</p>
                      <p className="text-sm text-white/80">For physical cards still within their validity period, check the photo matches the holder, the expiry date has not passed, and the card shows no signs of tampering.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">What Employers Should Check:</strong> The
                  operative&rsquo;s name matches their identity, the course type matches the work they
                  will carry out (e.g. Towers for Users, not just Work at Height Essentials), the card
                  is within its 5-year validity period, and the card has not been reported lost or
                  suspended.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Dealing with Invalid or Expired Cards</p>
                </div>
                <p className="text-sm text-white/80">
                  If verification reveals that a card is expired, invalid, or the holder cannot produce
                  any credentials, they must not be permitted to assemble, alter, dismantle, or work from
                  a mobile tower. This is a non-negotiable safety requirement. Allowing untrained persons
                  to work with towers breaches the Work at Height Regulations and exposes everyone on site
                  to unacceptable risk.
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
          title="Section 3 Knowledge Check"
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
            <Link to="../pasma-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: EN 1004:2020
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-1-section-4">
              Next: CDM 2015 &amp; Duty Holders
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}