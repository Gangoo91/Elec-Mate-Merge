import { ArrowLeft, CreditCard, CheckCircle, AlertTriangle, Building2, BookOpen, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "cscs-why-needed",
    question: "Which of the following is the MOST accurate reason why a CSCS card is considered essential for working on UK construction sites?",
    options: [
      "It replaces the need for any formal qualifications",
      "It proves you have paid your CITB levy",
      "It verifies that you hold the required qualifications and training for your role",
      "It is only required for supervisors and managers"
    ],
    correctIndex: 2,
    explanation:
      "The CSCS card scheme verifies that workers on construction sites have the required qualifications and training for the type of work they carry out. It does not replace qualifications — it confirms them. Most major clients and tier 1 contractors require all operatives to hold a valid CSCS card before being allowed on site."
  },
  {
    id: "cscs-scheme-structure",
    question: "Which organisation owns CSCS Ltd?",
    options: [
      "Build UK and the Home Builders Federation",
      "CITB (Construction Industry Training Board) and the Construction Leadership Council",
      "The Health and Safety Executive (HSE)",
      "The Joint Industry Board (JIB)"
    ],
    correctIndex: 1,
    explanation:
      "CSCS Ltd is owned by CITB (Construction Industry Training Board) and the Construction Leadership Council. The scheme is endorsed by Build UK, the Civil Engineering Contractors Association, and the Home Builders Federation, but these organisations do not own it."
  },
  {
    id: "cscs-how-to-get",
    question: "What are the two general requirements to obtain most CSCS cards?",
    options: [
      "A first aid certificate and a site induction",
      "A CITB Health, Safety and Environment (HS&E) test pass and a relevant NVQ/SVQ or qualifying qualification",
      "An employer reference and five years of experience",
      "A DBS check and a CITB registration number"
    ],
    correctIndex: 1,
    explanation:
      "To obtain most CSCS cards, you generally need to pass the CITB Health, Safety and Environment (HS&E) test and hold a relevant NVQ/SVQ or other qualifying qualification. The specific HS&E test level and qualification required depend on the card type you are applying for."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can I work on a construction site without a CSCS card?",
    answer:
      "Technically, there is no law that makes it illegal to work on a construction site without a CSCS card. However, in practice, most major clients, principal contractors, and tier 1/tier 2 contractors require all workers to hold a valid CSCS card as a condition of site access. The Build UK Code of Conduct mandates CSCS cards for all operatives. Major clients such as Network Rail, Highways England, HS2, and Tideway all require them. Without one, you will almost certainly be turned away from the gate on any significant construction project."
  },
  {
    question: "Is my JIB/ECS card the same as a CSCS card?",
    answer:
      "Yes. The JIB (Joint Industry Board) issues ECS (Electrotechnical Certification Scheme) cards that carry the CSCS logo. Your ECS card is fully recognised as a CSCS card on construction sites. It confirms your electrical qualifications and competence level. You do not need a separate CSCS card in addition to your ECS card — they are part of the same scheme. The ECS card is a partner card scheme within the wider CSCS framework."
  },
  {
    question: "How long does it take to get a CSCS card after applying?",
    answer:
      "Once you have passed the appropriate CITB HS&E test and your qualifications have been verified, the application process is relatively quick. Online applications are typically processed within 5 to 10 working days, though it can take longer during busy periods. Postal applications take longer. It is important to ensure all your qualifications are registered on the Construction Training Register (CTR) before applying, as unregistered qualifications can cause delays. Always plan ahead and do not leave your application until the last minute, especially if you need the card for a specific start date."
  },
  {
    question: "What happens if my CSCS card expires while I am working on a project?",
    answer:
      "Working with an expired CSCS card is treated the same as not having one at all. You may be removed from site until you obtain a valid card. Most sites check card validity at the gate using the CSCS Smart Check app, so an expired card will be flagged immediately. To avoid disruption, check your expiry date well in advance — at least three months before it expires — and begin the renewal process early. Renewal requires a current HS&E test pass (if your previous test was taken more than two years ago) and current qualifications."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "In what year was the Construction Skills Certification Scheme (CSCS) established?",
    options: [
      "1990",
      "1995",
      "2000",
      "2003"
    ],
    correctAnswer: 1,
    explanation:
      "CSCS was established in 1995. It was created to provide a means of verifying that workers on construction sites have the required qualifications and training for the type of work they carry out. Over 2.1 million cards are currently in circulation."
  },
  {
    id: 2,
    question:
      "Which of the following major clients does NOT typically mandate CSCS cards?",
    options: [
      "Network Rail",
      "HS2",
      "Local corner shops",
      "Highways England"
    ],
    correctAnswer: 2,
    explanation:
      "Network Rail, HS2, Highways England, Crossrail, and Tideway are all major construction clients that mandate CSCS cards. Local corner shops are not construction clients and do not require CSCS cards. The Build UK Code of Conduct requires all operatives to hold a CSCS card."
  },
  {
    id: 3,
    question:
      "Who needs to hold a CSCS card on a construction site?",
    options: [
      "Only skilled tradespeople",
      "Only labourers and apprentices",
      "Only supervisors and managers",
      "Everyone working on site, from labourers to managers, including visitors"
    ],
    correctAnswer: 3,
    explanation:
      "Everyone working on a construction site should hold an appropriate card — from labourers and apprentices to skilled trades, supervisors, managers, and professionals. Even visitors need a temporary visitor card. Different card types exist for different roles and qualification levels."
  },
  {
    id: 4,
    question:
      "Which organisation owns CSCS Ltd?",
    options: [
      "The Health and Safety Executive (HSE)",
      "Build UK",
      "CITB and the Construction Leadership Council",
      "The Federation of Master Builders"
    ],
    correctAnswer: 2,
    explanation:
      "CSCS Ltd is owned by CITB (Construction Industry Training Board) and the Construction Leadership Council. The scheme is endorsed by Build UK, the Civil Engineering Contractors Association, and the Home Builders Federation."
  },
  {
    id: 5,
    question:
      "Which of the following is a CSCS partner card scheme for plant operators?",
    options: [
      "CISRS",
      "CPCS",
      "TICA",
      "SEATS"
    ],
    correctAnswer: 1,
    explanation:
      "CPCS (Construction Plant Competence Scheme) is the partner card scheme for plant operators. CISRS covers scaffolders, TICA covers thermal insulation contractors, and SEATS covers safety and environmental awareness. All partner scheme cards carry the CSCS logo."
  },
  {
    id: 6,
    question:
      "What is the standard validity period for most CSCS cards?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation:
      "Most CSCS cards are valid for 5 years from the date of issue. Renewal requires passing a current HS&E test (if the previous test was taken more than 2 years ago), holding current qualifications, and completing the application process. Some cards, such as Experienced Worker cards, may have shorter validity periods."
  },
  {
    id: 7,
    question:
      "For an electrician, what is the typical CSCS card progression path?",
    options: [
      "Red Trainee → Blue Skilled → Gold Advanced",
      "Green Labourer → Blue Skilled Worker → Gold Advanced Craft",
      "White Visitor → Green Labourer → Black Manager",
      "Blue Skilled → Gold Supervisor → Platinum Professional"
    ],
    correctAnswer: 1,
    explanation:
      "The typical path for an electrician is: Green Labourer card during apprenticeship, then Blue Skilled Worker card (Electrotechnical) after completing NVQ Level 3 in Electrical Installation or Electrotechnical Technology, then Gold Advanced Craft card for those with additional qualifications."
  },
  {
    id: 8,
    question:
      "What does the JIB ECS card provide in relation to CSCS?",
    options: [
      "It is a completely separate scheme with no CSCS recognition",
      "It provides CSCS recognition for electrical workers — your ECS card IS your CSCS card",
      "It is only valid for domestic electrical work, not construction sites",
      "It replaces the need for any HS&E test"
    ],
    correctAnswer: 1,
    explanation:
      "The JIB (Joint Industry Board) issues ECS (Electrotechnical Certification Scheme) cards that carry the CSCS logo. Your JIB/ECS card IS your CSCS card for electrical work on construction sites. It is a partner card scheme within the wider CSCS framework and is fully recognised on sites requiring 'a CSCS card'."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function CscsCardModule1Section1() {
  useSEO({
    title: "What Is CSCS? | Module 1 Section 1",
    description:
      "Understand what the Construction Skills Certification Scheme (CSCS) is, why you need a card, who needs one, how to get one, and what it means for electricians working on UK construction sites.",
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
            <Link to="../cscs-card-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <CreditCard className="h-7 w-7 text-green-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is CSCS?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the Construction Skills Certification Scheme &mdash; the UK&rsquo;s leading card scheme for construction, why it exists, who needs a card, and what it means for your career as an electrician
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Established:</strong> 1995 &mdash; over 2.1 million cards in circulation</li>
              <li><strong>Purpose:</strong> Verifies qualifications and training for construction workers</li>
              <li><strong>Required by:</strong> Most major clients, tier 1 &amp; 2 contractors</li>
              <li><strong>Validity:</strong> 5 years for most card types</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">For Electricians</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Apprentice:</strong> Green Labourer card during training</li>
              <li><strong>Qualified:</strong> Blue Skilled Worker (Electrotechnical) with NVQ L3</li>
              <li><strong>Advanced:</strong> Gold Advanced Craft for additional qualifications</li>
              <li><strong>JIB/ECS:</strong> Your ECS card IS your CSCS card</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what the CSCS scheme is and why it was established",
              "Describe why holding a CSCS card is essential for working on UK construction sites",
              "Identify who needs a CSCS card and the different roles covered",
              "Outline the CSCS scheme structure, including CITB ownership and partner card schemes",
              "Describe the general process for obtaining a CSCS card",
              "Explain the typical CSCS card path for electricians, including the JIB/ECS route"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: Introduction to the CSCS Scheme                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-green-400 font-mono text-sm">01</span>
              Introduction to the CSCS Scheme
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Construction Skills Certification Scheme (CSCS)</strong> is the United
                Kingdom&rsquo;s leading card scheme for the construction industry. Established
                in <strong>1995</strong>, it was created with a clear purpose: to verify that
                workers on construction sites have the required qualifications and training for
                the type of work they carry out. In the decades since its creation, the scheme
                has grown to become the industry standard for demonstrating competence on site.
              </p>

              <p>
                Today, over <strong>2.1 million CSCS cards</strong> are in circulation across the
                UK. The scheme covers everyone who works on a construction site &mdash; from
                labourers and apprentices to skilled tradespeople, supervisors, managers, and
                visiting professionals. It is not limited to any single trade or discipline;
                electricians, plumbers, bricklayers, carpenters, plant operators, scaffolders,
                and dozens of other occupations are all covered by the scheme or its partner
                card schemes.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Key Principle:</strong> The CSCS card does
                  not replace qualifications &mdash; it <strong>confirms</strong> them. When a
                  site manager checks your CSCS card, they are verifying that an independent body
                  has confirmed you hold the qualifications and training appropriate for your role.
                  It is a portable, verifiable proof of competence.
                </p>
              </div>

              <p>
                Most major construction sites and clients in the UK now require all workers to hold
                a valid CSCS card before being allowed on site. This requirement is enforced at
                site gates and turnstiles, typically using the <strong>CSCS Smart Check</strong> app
                which allows site managers to verify a card&rsquo;s validity in real time. Without a
                valid card, you will be turned away &mdash; regardless of your actual skill level
                or experience.
              </p>

              <p>
                The scheme has evolved significantly since 1995. Originally a voluntary initiative,
                it has become effectively mandatory on almost all commercial and infrastructure
                construction projects. The introduction of the HS&E (Health, Safety and Environment)
                test requirement, the development of partner card schemes for specialist sectors, and
                the move to smart card technology have all strengthened the scheme&rsquo;s ability to
                verify genuine competence and reduce the risk of unqualified or untrained workers
                being present on construction sites.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Why CSCS Matters for Your Career</p>
                <p className="text-sm text-white/80">
                  For anyone starting or progressing a career in the UK construction industry,
                  understanding the CSCS scheme is not optional &mdash; it is fundamental. Your
                  CSCS card (or partner scheme card) is the document that gets you through the
                  site gate. Without it, your qualifications, experience, and skills are
                  effectively invisible to the industry. This section gives you the complete
                  picture of what the scheme is, how it works, and how it applies specifically
                  to electricians.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Why Do You Need a CSCS Card?                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-green-400 font-mono text-sm">02</span>
              Why Do You Need a CSCS Card?
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The short answer is: because virtually every construction site in the UK requires
                one. But the reasons behind that requirement run deeper than simple site access.
                The CSCS card has become the industry&rsquo;s primary mechanism for ensuring that
                everyone on site is qualified, trained, and competent for the work they are doing.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Major Client Requirements</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The following major clients and organisations mandate CSCS cards for all workers
                  on their projects:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Network Rail</strong> &mdash; all rail infrastructure projects require CSCS or partner scheme cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Highways England (National Highways)</strong> &mdash; mandatory for all road and motorway projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>HS2</strong> &mdash; the UK&rsquo;s largest infrastructure project requires CSCS across the board</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Crossrail (Elizabeth Line)</strong> &mdash; all workers required to hold valid CSCS cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Tideway (Thames Tideway Tunnel)</strong> &mdash; CSCS mandatory for all site personnel</span>
                  </li>
                </ul>
              </div>

              <p>
                Beyond these headline clients, the <strong>Build UK Code of Conduct</strong> requires
                all operatives working for Build UK member companies to hold a CSCS card. Build UK
                represents the vast majority of the UK&rsquo;s largest contractors, so this
                requirement effectively covers most significant construction projects in the country.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Business &amp; Insurance Reasons</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Insurance requirements:</strong> Many employers&rsquo; liability and public liability insurance policies specify that workers must hold CSCS cards. Using unregistered workers could invalidate your insurance cover.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Tender requirements:</strong> Many tenders and contracts require evidence that all operatives hold valid CSCS cards. Without them, you cannot bid for work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Demonstrates competence:</strong> A CSCS card provides independent verification that you have the qualifications and training for your role, giving clients and contractors confidence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Commitment to safety:</strong> Holding a CSCS card shows you take health and safety seriously. The HS&E test component ensures a baseline level of safety knowledge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Industry recognition:</strong> The card is universally recognised across the UK construction industry. It is the single most widely accepted proof of construction competence.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-semibold text-red-400">Without a CSCS Card</p>
                </div>
                <p className="text-sm text-white/80">
                  Without a valid CSCS card, you may be <strong>turned away from sites</strong>,
                  unable to bid for or win contracts, find it difficult to work for tier 1 and
                  tier 2 contractors, and miss out on the most significant and best-paying projects.
                  For self-employed electricians, not having a card can mean being excluded from the
                  commercial construction market entirely. The card is effectively your passport
                  to the construction industry.
                </p>
              </div>

              <p>
                It is worth noting that while there is no specific law that makes it a criminal
                offence to work on a construction site without a CSCS card, the practical reality
                is that you will not get on site without one. The requirement comes from clients,
                principal contractors, and industry bodies rather than from statute &mdash; but
                the effect is the same. No card, no work on most sites.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Who Needs a CSCS Card?                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-green-400 font-mono text-sm">03</span>
              Who Needs a CSCS Card?
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The straightforward answer is: <strong>everyone</strong> who works on a
                construction site should hold an appropriate card. The CSCS scheme is not
                limited to a particular trade, role, or level of seniority. It covers the
                full spectrum of people who may be present on a construction site, from the
                most junior labourer to the most senior project director.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Who Is Covered?</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Labourers &amp; General Operatives</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Workers carrying out general labouring duties on site. Typically hold the
                      Green Labourer CSCS card, which requires passing the Operatives HS&E test
                      and being registered for, or holding, a relevant Level 1 qualification. This
                      is the most common entry-level card in the scheme.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Apprentices &amp; Trainees</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      People currently undertaking an apprenticeship or formal training programme.
                      Apprentices can obtain a Green CSCS card while they complete their training.
                      The card confirms they are engaged in a recognised training programme and
                      have passed the appropriate HS&E test.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Skilled Trades</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Qualified tradespeople including electricians, plumbers, bricklayers,
                      carpenters, plasterers, painters, and many more. Skilled workers typically
                      hold the Blue Skilled Worker CSCS card, which requires passing the appropriate
                      HS&E test and holding a relevant NVQ/SVQ at Level 2 or Level 3, depending
                      on the occupation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Supervisors &amp; Managers</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Site supervisors, foremen, site managers, project managers, and construction
                      managers all need appropriate CSCS cards. Supervisory roles typically require
                      the Gold Supervisory card, while management roles require the Black Manager
                      card. These require higher-level qualifications such as NVQ Level 4 or above
                      and the relevant HS&E test.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Professionals</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Architects, engineers, quantity surveyors, building surveyors, health and
                      safety professionals, and other construction professionals. The White
                      Professionally Qualified Person (PQP) card is available for those who are
                      members of a CIC-approved professional institution and have passed the
                      Managers and Professionals HS&E test.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Visitors</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Even people visiting a construction site &mdash; such as clients, inspectors,
                      or delivery drivers who need to enter beyond the site boundary &mdash; need
                      a temporary Visitor card. This ensures that everyone on site has at least a
                      basic level of health and safety awareness.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                It is important to understand that different card types exist for different roles
                and qualification levels. You must hold the card that is <strong>appropriate for
                the work you are actually doing</strong>. Holding a Green Labourer card does not
                entitle you to carry out skilled electrical work, and holding a Blue Skilled Worker
                card for one trade does not cover you for a different trade. The card must match
                the role.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Sub-Contractors, Agency Workers &amp; the Self-Employed</p>
                <p className="text-sm text-white/80">
                  The requirement for CSCS cards applies equally to directly employed workers,
                  sub-contractors, agency workers, and self-employed individuals. Your employment
                  status does not affect the requirement. If you are on a construction site, you
                  need a valid card appropriate to your role. Agency workers should ensure they hold
                  their own card &mdash; it is not the agency&rsquo;s responsibility to provide one
                  for you. Self-employed electricians must obtain and maintain their own cards as
                  part of their professional registration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: The CSCS Card Scheme Structure                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-green-400 font-mono text-sm">04</span>
              The CSCS Card Scheme Structure
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding how the CSCS scheme is structured helps you navigate it effectively
                and understand where your card fits within the wider framework. The scheme is not
                a single monolithic organisation &mdash; it is a carefully structured system
                involving multiple bodies, each with a defined role.
              </p>

              {/* CSCS Scheme Overview Diagram */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-4 text-center">CSCS Scheme Overview</p>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-sm font-semibold text-white mb-1">CSCS Ltd</p>
                    <p className="text-xs text-white/70">The company that operates the CSCS scheme and issues cards</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-white/20" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                      <p className="text-sm font-semibold text-white mb-1">CITB</p>
                      <p className="text-xs text-white/70">Construction Industry Training Board &mdash; co-owner of CSCS Ltd, operates the HS&E test</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                      <p className="text-sm font-semibold text-white mb-1">Construction Leadership Council</p>
                      <p className="text-xs text-white/70">Co-owner of CSCS Ltd &mdash; industry body representing the sector</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-white/20" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-sm font-semibold text-white mb-1">Endorsed By</p>
                    <p className="text-xs text-white/70">Build UK &middot; Civil Engineering Contractors Association &middot; Home Builders Federation</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-white/20" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-sm font-semibold text-white mb-1">Partner Card Schemes</p>
                    <p className="text-xs text-white/70">CPCS &middot; CISRS &middot; TICA &middot; SEATS &middot; ECS/JIB &middot; Others</p>
                  </div>
                </div>
              </div>

              <p>
                <strong>CSCS Ltd</strong> is the company that operates the scheme. It is owned
                jointly by the <strong>CITB (Construction Industry Training Board)</strong> and
                the <strong>Construction Leadership Council</strong>. CITB plays a particularly
                important role as it also operates the HS&E test that is a requirement for most
                CSCS cards.
              </p>

              <p>
                The scheme is endorsed by several major industry bodies, including <strong>Build
                UK</strong>, the <strong>Civil Engineering Contractors Association (CECA)</strong>,
                and the <strong>Home Builders Federation (HBF)</strong>. This endorsement is what
                gives the scheme its industry-wide authority &mdash; when these organisations
                require CSCS cards, their member companies follow.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Construction Training Register (CTR)</p>
                <p className="text-sm text-white/80">
                  Cards are issued based on verified qualifications registered on the
                  <strong> Construction Training Register (CTR)</strong>. The CTR is the
                  centralised database that records construction qualifications achieved by
                  individuals. When you apply for a CSCS card, your qualifications are checked
                  against the CTR. If your qualifications are not registered on the CTR, your
                  application may be delayed or rejected. It is important to ensure your awarding
                  body has registered your qualifications on the CTR before you apply.
                </p>
              </div>

              <p>
                The scheme also issues cards through <strong>partner card schemes</strong> &mdash;
                specialist organisations that cover particular sectors of the construction industry.
                All partner scheme cards carry the CSCS logo and are recognised on sites that require
                &ldquo;a CSCS card.&rdquo; This is a crucial point for electricians, as the
                JIB/ECS card is a partner scheme card.
              </p>

              <p>
                The CSCS scheme is part of the wider <strong>Construction Skills Certification
                Scheme</strong> which encompasses both the directly-issued CSCS cards and the
                partner scheme cards. Together, these schemes aim to ensure that every person on
                every construction site holds a card that verifies their qualifications and
                competence for their specific role.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Partner Card Schemes                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-green-400 font-mono text-sm">05</span>
              Partner Card Schemes
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While CSCS is the largest and most widely known card scheme, it is not the only one.
                The wider CSCS framework includes several <strong>partner card schemes</strong> that
                cover specialist sectors of the construction industry. Understanding these partner
                schemes is important because their cards carry the CSCS logo and are fully recognised
                on sites that require &ldquo;a CSCS card.&rdquo;
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Key Partner Card Schemes</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">CPCS &mdash; Construction Plant Competence Scheme</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The partner scheme for plant operators. CPCS covers operators of excavators,
                      cranes, telehandlers, dumpers, rollers, and all other categories of
                      construction plant. CPCS cards carry the CSCS logo and are the standard
                      requirement for plant operators on UK construction sites. The scheme includes
                      both a technical test and an NVQ/SVQ requirement for the full (blue) competence
                      card.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">CISRS &mdash; Construction Industry Scaffolders Record Scheme</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The partner scheme for scaffolders. CISRS cards are the recognised proof of
                      competence for scaffolding operatives, from trainees and labourers through to
                      advanced scaffolders and scaffold inspectors. The scheme requires completion of
                      specific CISRS training courses and relevant NVQ/SVQ qualifications. All CISRS
                      cards carry the CSCS logo.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">ECS/JIB &mdash; Electrotechnical Certification Scheme</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The partner scheme for the electrotechnical industry, operated by the Joint
                      Industry Board (JIB). This is the most directly relevant partner scheme for
                      electricians. ECS cards carry the CSCS logo and are fully recognised as CSCS
                      cards on construction sites. Your JIB/ECS card IS your CSCS card &mdash; you
                      do not need both.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">TICA &mdash; Thermal Insulation Contractors Association</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The partner scheme for thermal insulation engineers and operatives. TICA cards
                      cover workers who install, maintain, and remove thermal insulation on
                      industrial, commercial, and domestic projects. Like all partner schemes, TICA
                      cards carry the CSCS logo and are recognised on construction sites.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">SEATS &mdash; Safety and Environmental Awareness Training Scheme</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A partner scheme that covers safety and environmental awareness for workers
                      in specific sectors. SEATS cards demonstrate that the holder has completed
                      recognised safety and environmental awareness training relevant to their role
                      and sector.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Important:</strong> All partner scheme cards
                  carry the CSCS logo and are recognised on sites that require &ldquo;a CSCS
                  card.&rdquo; If a site requires a CSCS card, your partner scheme card (whether
                  CPCS, CISRS, ECS/JIB, TICA, or SEATS) will be accepted. You do not need a
                  separate, directly-issued CSCS card in addition to your partner scheme card.
                </p>
              </div>

              <p>
                There are also other partner schemes covering additional specialist sectors, and the
                list continues to evolve as the industry develops. The key point is that the CSCS
                framework is designed to be comprehensive &mdash; whatever your role in construction,
                there should be a card available that covers your occupation and qualifications.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Checking Card Validity</p>
                <p className="text-sm text-white/80">
                  All CSCS and partner scheme cards can be verified using the <strong>CSCS Smart
                  Check</strong> app. This free app allows site managers and gatehouse staff to scan
                  or manually check a card to confirm it is genuine, in date, and matches the
                  holder&rsquo;s identity. The app checks against the CSCS central database in
                  real time, so expired, cancelled, or fraudulent cards will be flagged immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: How to Get a CSCS Card                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-green-400 font-mono text-sm">06</span>
              How to Get a CSCS Card
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The process for obtaining a CSCS card varies depending on the card type you need,
                but the general requirements follow a consistent pattern. Understanding these
                requirements in advance will help you plan your application and avoid delays.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">General Requirements for Most CSCS Cards</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Pass the CITB Health, Safety and Environment (HS&E) Test</p>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed">
                        The HS&E test is a computer-based, multiple-choice test that assesses your
                        knowledge of health, safety, and environmental matters relevant to construction.
                        There are different versions of the test for different card levels: Operatives
                        (for labourer and skilled worker cards), Specialists (for certain specialist
                        roles), and Managers and Professionals (for supervisory, management, and
                        professional cards). The test must be booked and taken at an approved test centre.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">Hold a Relevant NVQ/SVQ or Other Qualifying Qualification</p>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed">
                        The specific qualification required depends on the card type and occupation. For
                        skilled worker cards, this is typically an NVQ or SVQ at Level 2 or Level 3 in
                        the relevant trade. For management cards, higher-level qualifications (Level 4+)
                        are required. Your qualification must be registered on the Construction Training
                        Register (CTR) for CSCS to verify it.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">Apply Online or by Post</p>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed">
                        Applications can be submitted online through the CSCS website or by post.
                        You will need to provide proof of your qualifications, proof of identity
                        (typically a passport or driving licence), and a recent passport-style
                        photograph. Online applications are faster and typically processed within
                        5 to 10 working days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CSCS Application Process Flowchart */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-4 text-center">CSCS Application Process Flowchart</p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-white">Step 1: Obtain Qualification</p>
                    <p className="text-xs text-white/70">Complete your NVQ/SVQ or other qualifying qualification and ensure it is registered on the CTR</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-green-400/30" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-white">Step 2: Book &amp; Pass the HS&E Test</p>
                    <p className="text-xs text-white/70">Book the correct level of HS&E test at an approved test centre and pass it</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-green-400/30" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-white">Step 3: Gather Documents</p>
                    <p className="text-xs text-white/70">Prepare your proof of qualifications, photo ID, and a passport-style photograph</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-green-400/30" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-white">Step 4: Submit Application</p>
                    <p className="text-xs text-white/70">Apply online (recommended) or by post through the CSCS website</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-green-400/30" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-white">Step 5: Card Issued</p>
                    <p className="text-xs text-white/70">Card is posted to you, typically within 5&ndash;10 working days for online applications</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Green Labourer Card &mdash; Entry Level</p>
                <p className="text-sm text-white/80 mb-2">
                  For the basic <strong>Green Labourer card</strong>, the requirements are:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Pass the <strong>Operatives HS&E test</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Complete, be registered for, or have applied for a <strong>Level 1 qualification</strong> relevant to your role</span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-2">
                  This is the most common entry-level card and is typically the first card that
                  apprentices and new entrants to the industry will obtain.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Blue Skilled Worker Card</p>
                <p className="text-sm text-white/80 mb-2">
                  For the <strong>Blue Skilled Worker card</strong>, you need:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Pass the <strong>appropriate HS&E test</strong> for your occupation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Hold the <strong>relevant NVQ/SVQ at the correct level</strong> (typically Level 2 or Level 3 depending on the trade)</span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-2">
                  For electricians, this means holding an NVQ Level 3 in Electrical Installation
                  or Electrotechnical Technology (or equivalent).
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Top Tip:</strong> Before applying, check
                  that your qualifications are registered on the Construction Training Register
                  (CTR). If they are not, contact your awarding body to arrange registration.
                  Applying before your qualifications are on the CTR is one of the most common
                  causes of delays and rejections.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Card Validity & Renewal                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-green-400 font-mono text-sm">07</span>
              Card Validity &amp; Renewal
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your CSCS card is not valid indefinitely. Understanding the validity period and
                renewal requirements is essential to avoid gaps in your card coverage that could
                prevent you from working on site.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Key Facts About Card Validity</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-400">5 Years</p>
                    <p className="text-white/70 text-xs">The standard validity period for most CSCS cards from the date of issue</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-400">2 Years</p>
                    <p className="text-white/70 text-xs">If your HS&E test was taken more than 2 years ago, you must re-sit it for renewal</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-400">3 Months</p>
                    <p className="text-white/70 text-xs">Start planning your renewal at least 3 months before your card expires</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">Expired = None</p>
                    <p className="text-white/70 text-xs">Working with an expired card is treated exactly the same as not having a card at all</p>
                  </div>
                </div>
              </div>

              <p>
                Most CSCS cards are valid for <strong>5 years</strong> from the date of issue. The
                expiry date is clearly printed on the front of your card. When your card approaches
                its expiry date, you need to go through the renewal process to obtain a new card
                with a new 5-year validity period.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Renewal Requirements</p>
                <p className="text-sm text-white/80 mb-2">
                  To renew your CSCS card, you typically need:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Current HS&E test pass:</strong> If your previous HS&E test was taken more than 2 years ago, you will need to pass a new test before your card can be renewed. Plan for this — test centres can be busy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Current qualifications:</strong> Your qualifications must still be valid and relevant. If you have gained additional qualifications since your last card was issued, you may be eligible for a higher-level card.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Application and payment:</strong> Complete the renewal application (online or by post) and pay the renewal fee. The process is similar to a new application.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-semibold text-red-400">Expired Cards</p>
                </div>
                <p className="text-sm text-white/80">
                  Cards expire on the date shown on the card. <strong>Working with an expired card
                  is treated exactly the same as not having a card at all.</strong> You will be
                  turned away from site, and your employer or client may face compliance issues.
                  Most sites now use the CSCS Smart Check app, which flags expired cards
                  automatically at the gate. Do not assume that being &ldquo;a few days&rdquo;
                  past expiry will be overlooked &mdash; it will not.
                </p>
              </div>

              <p>
                Some card types have shorter validity periods than the standard 5 years. For
                example, <strong>Experienced Worker cards</strong> (issued to workers who have
                significant experience but may not yet hold a formal NVQ/SVQ) typically have
                shorter validity periods and may require the holder to complete their NVQ/SVQ
                within the card&rsquo;s validity period in order to renew.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Best Practice:</strong> Set a reminder on
                  your phone or calendar for <strong>3 months before your card expires</strong>.
                  This gives you enough time to book and pass a new HS&E test (if needed), gather
                  your documents, submit your application, and receive your new card before the
                  old one expires. Leaving it until the last week is a recipe for being unable to
                  work.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Upgrading Your Card</p>
                <p className="text-sm text-white/80">
                  If you gain additional qualifications during your card&rsquo;s validity period,
                  you can apply to upgrade to a higher-level card before your current card expires.
                  For example, an apprentice who completes their NVQ Level 3 can upgrade from a
                  Green Labourer card to a Blue Skilled Worker card. You do not need to wait for
                  your current card to expire before upgrading &mdash; apply as soon as your new
                  qualifications are registered on the CTR.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: CSCS & the Electrical Industry                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-green-400 font-mono text-sm">08</span>
              CSCS &amp; the Electrical Industry
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For electricians, the CSCS card system intersects with the electrotechnical
                industry&rsquo;s own registration and certification framework. Understanding
                how these two systems relate to each other is essential for navigating your
                career in the electrical trade on construction sites.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-4 text-center">Electrician&rsquo;s CSCS Card Progression</p>
                <div className="space-y-3">
                  <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600/20 text-green-400 text-lg font-bold flex-shrink-0">1</span>
                      <div>
                        <p className="text-base font-semibold text-green-400 mb-1">Green Labourer Card &mdash; During Apprenticeship</p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          While you are completing your electrical apprenticeship, you can obtain a
                          Green Labourer CSCS card. This requires passing the Operatives HS&E test
                          and being registered for a Level 1 qualification (or above). This card
                          allows you to access construction sites while you are still in training.
                          It confirms you are a legitimate trainee, not an unregistered worker.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-white/20" />
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 text-lg font-bold flex-shrink-0">2</span>
                      <div>
                        <p className="text-base font-semibold text-blue-400 mb-1">Blue Skilled Worker Card (Electrotechnical)</p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          After completing your apprenticeship and achieving your <strong>NVQ Level 3
                          in Electrical Installation</strong> or <strong>Electrotechnical
                          Technology</strong> (or equivalent), you are eligible for the Blue Skilled
                          Worker card. This is the standard card for qualified electricians. You will
                          need to pass the appropriate HS&E test and have your NVQ registered on the
                          CTR. This card confirms you are a fully qualified electrician.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-white/20" />
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 text-lg font-bold flex-shrink-0">3</span>
                      <div>
                        <p className="text-base font-semibold text-yellow-400 mb-1">Gold Advanced Craft Card</p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          For electricians who have gained additional qualifications beyond the
                          standard NVQ Level 3, the Gold Advanced Craft card recognises a higher
                          level of competence. This may include additional NVQ units, higher-level
                          qualifications, or specialist certifications that demonstrate advanced
                          skill and knowledge in the electrotechnical field.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">The JIB/ECS Route</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  The <strong>Joint Industry Board (JIB)</strong> issues <strong>ECS
                  (Electrotechnical Certification Scheme)</strong> cards that carry the CSCS logo.
                  This is the route most commonly used by electricians in the UK. Your JIB/ECS
                  card <strong>IS</strong> your CSCS card for electrical work on construction sites.
                  You do not need a separate CSCS card in addition to your ECS card.
                </p>
              </div>

              <p>
                The JIB/ECS card system mirrors the CSCS card colour system but is specifically
                tailored to the electrotechnical industry. ECS cards are issued based on your
                electrical qualifications, JIB registration, and HS&E test status. They cover a
                range of roles from Electrical Labourer through to Electrical Technician,
                Approved Electrician, and Electrical Manager.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common ECS Card Categories for Electricians</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>ECS Labourer (Green):</strong> For those working as electrical labourers or assistants during apprenticeship, with a Level 1 qualification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>ECS Electrician (Blue):</strong> For qualified electricians holding NVQ Level 3 in Electrical Installation or Electrotechnical Technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>ECS Approved Electrician (Gold):</strong> For those with additional experience, qualifications, and JIB Approved Electrician status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>ECS Technician:</strong> For electrical technicians with appropriate higher-level qualifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>ECS Installation Electrician:</strong> For electricians who are registered with a competent person scheme (e.g., NICEIC, NAPIT) and carry out domestic/commercial installations</span>
                  </li>
                </ul>
              </div>

              <p>
                When you arrive at a construction site gate and are asked for your CSCS card, you
                present your JIB/ECS card. The site manager or gatehouse staff will verify it using
                the CSCS Smart Check app, which recognises all ECS cards as valid CSCS partner
                scheme cards. As long as your card is in date and matches your identity, you will
                be allowed on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Which Route Should You Take?</p>
                <p className="text-sm text-white/80">
                  If you are an electrician or electrical apprentice, the <strong>JIB/ECS
                  route</strong> is almost always the best option. The ECS card is specifically
                  designed for the electrotechnical industry and is recognised by all major
                  contractors and clients. It carries the CSCS logo and provides CSCS-equivalent
                  access to construction sites. Applying directly to CSCS for a standard card is
                  possible but unnecessary if you qualify for an ECS card &mdash; and the ECS card
                  provides clearer identification of your specific electrical qualifications and
                  competence level.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Key Takeaway:</strong> For electricians in
                  the UK, the path is clear: obtain your Green Labourer/ECS card during your
                  apprenticeship to get on site, then upgrade to your Blue Skilled Worker/ECS
                  Electrician card once you have completed your NVQ Level 3 and passed the HS&E
                  test. Your JIB/ECS card is your CSCS card &mdash; it gets you through the gate
                  on any construction site in the country. Keep it in date, keep it on you, and
                  plan your renewals early.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-1-section-2">
              Next: Card Types &amp; Colour Codes
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
