import {
  ArrowLeft,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  CalendarCheck,
  ClipboardCheck,
  BookOpen,
  Target,
  Clock,
  RefreshCw,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cscs-m1s4-booking-method",
    question:
      "What is the correct way to book the CITB HS&E test?",
    options: [
      "Through the CITB website or by phone, choosing your preferred Pearson VUE test centre, date, and time",
      "By turning up at any Pearson VUE centre on the day and requesting a walk-in slot",
      "Through your employer only — individual bookings are not accepted",
      "By emailing CSCS directly with your preferred date and waiting for confirmation",
    ],
    correctIndex: 0,
    explanation:
      "The HS&E test is booked through the CITB website or by phone. You choose your preferred Pearson VUE test centre, date, and time. Bookings can be made up to a year in advance, and same-day or next-day slots may be available depending on demand. You can cancel or reschedule up to 3 clear working days before without charge.",
  },
  {
    id: "cscs-m1s4-key-focus-areas",
    question:
      "Which of the following groups of topics carries the most weight in the HS&E test?",
    options: [
      "Working at height, manual handling, fire safety, PPE, risk assessment, asbestos, COSHH, and electrical safety",
      "Contract law, employment rights, trade union regulations, and pension schemes",
      "Environmental sustainability, carbon reduction, renewable energy, and recycling procedures",
      "Vehicle maintenance, plant operation, crane signalling, and demolition techniques",
    ],
    correctIndex: 0,
    explanation:
      "Based on test analysis, the areas that carry the most weight include working at height, manual handling, fire safety, PPE, risk assessment, asbestos awareness, COSHH, electrical safety, and behavioural responses to unsafe situations. These core health and safety topics form the backbone of the HS&E test across all card categories.",
  },
  {
    id: "cscs-m1s4-test-day-strategy",
    question:
      "What is the recommended approach if you are unsure about an answer during the HS&E test?",
    options: [
      "Eliminate obviously wrong answers first, select your best option, and use the flag feature to revisit it later",
      "Leave the question blank and come back to it at the very end",
      "Spend as long as needed on that single question until you are certain",
      "Choose the longest answer option, as these are usually correct",
    ],
    correctIndex: 0,
    explanation:
      "The recommended approach is to eliminate obviously wrong answers first to improve your odds, select your best option (your first instinct is usually right), and use the flag feature to mark it for review. This keeps you moving through the test at a good pace while allowing you to revisit uncertain questions with any remaining time.",
  },
];

const faqs = [
  {
    question: "How much does the HS&E test cost, and what payment methods are accepted?",
    answer:
      "The HS&E test costs approximately £21 + VAT for Operatives and Specialists, and the same for Managers. Payment is made at the time of booking through the CITB website using a debit or credit card. Some employers pay for their workers' tests directly. The fee covers one attempt — if you fail, you must pay the same fee again to re-sit.",
  },
  {
    question: "What happens if I arrive late to my HS&E test appointment?",
    answer:
      "You should arrive at least 15 minutes early to allow time for ID checks and sign-in. If you arrive late, the test centre may refuse entry and you will lose your booking fee. There is no obligation for the centre to accommodate late arrivals because test sessions run to a strict timetable. If you know you will be late, contact the test centre as soon as possible, but be prepared that you may need to rebook and pay again.",
  },
  {
    question: "Can I use study materials from previous years to prepare?",
    answer:
      "It is strongly recommended that you use the most current CITB publications, particularly the latest edition of GE700 (the 'yellow book'). The question bank is regularly updated to reflect current regulations, industry practices, and new legislation. Using outdated materials risks learning incorrect or superseded information. The CITB also offers an official practice test app that is kept up to date with the current question bank.",
  },
  {
    question: "How long do I have to apply for my CSCS card after passing the HS&E test?",
    answer:
      "Your HS&E test result is stored on the CITB system for 2 years from the date you pass. You must apply for your CSCS card within this 2-year window. If you do not apply within 2 years, your test result expires and you must re-sit and pass the test again before you can apply. It is advisable to apply as soon as possible after passing to avoid any delays or complications.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "How far in advance can you book the CITB HS&E test, and how late can you cancel without charge?",
    options: [
      "Up to 6 months in advance; cancel up to 5 working days before",
      "Up to a year in advance; cancel up to 3 clear working days before",
      "Up to 3 months in advance; cancel up to 24 hours before",
      "Up to 2 years in advance; cancel up to 7 working days before",
    ],
    correctAnswer: 1,
    explanation:
      "Bookings can be made up to a year in advance through the CITB website or by phone. You can cancel or reschedule up to 3 clear working days before the test without charge. If you cancel with less notice, you will forfeit your booking fee.",
  },
  {
    id: 2,
    question:
      "How many forms of ID must you bring to the HS&E test, and what is required?",
    options: [
      "One form of photo ID only",
      "Two forms of ID, one of which must be a valid photo ID such as a passport or driving licence",
      "Three forms of ID including proof of address",
      "No ID is needed — the booking confirmation is sufficient",
    ],
    correctAnswer: 1,
    explanation:
      "You must bring two forms of ID to the test centre. At least one must be a valid photo ID — a passport, driving licence, or CSCS-approved biometric ID. Without the correct identification, you will not be allowed to sit the test and will lose your booking fee.",
  },
  {
    id: 3,
    question: "What is the official CITB study publication commonly known as the 'yellow book'?",
    options: [
      "GE700 — Health, Safety and Environment Information",
      "HSG65 — Managing for Health and Safety",
      "L21 — Management of Health and Safety at Work Regulations",
      "INDG163 — Five Steps to Risk Assessment",
    ],
    correctAnswer: 0,
    explanation:
      "The official CITB publication for HS&E test preparation is GE700 — Health, Safety and Environment Information, commonly referred to as the 'yellow book' due to its cover colour. It covers all the core topics that appear in the HS&E test and is updated regularly to reflect current regulations.",
  },
  {
    id: 4,
    question:
      "Which of the following regulations is NOT one of the key acts you should know well for the HS&E test?",
    options: [
      "Health and Safety at Work Act 1974 (HASAWA)",
      "Control of Substances Hazardous to Health Regulations 2002 (COSHH)",
      "Consumer Rights Act 2015",
      "Work at Height Regulations 2005",
    ],
    correctAnswer: 2,
    explanation:
      "The Consumer Rights Act 2015 relates to consumer protection and is not relevant to the HS&E test. The key regulations to know include HASAWA 1974, CDM 2015, COSHH 2002, Work at Height Regulations 2005, Manual Handling Operations Regulations 1992, Electricity at Work Regulations 1989, and the Control of Asbestos Regulations 2012.",
  },
  {
    id: 5,
    question:
      "What score should you aim for on practice tests before booking the real HS&E test?",
    options: [
      "Above 50% consistently",
      "Above 70% on at least one attempt",
      "Above 90% consistently",
      "100% on every practice test",
    ],
    correctAnswer: 2,
    explanation:
      "You should aim for consistently scoring above 90% on practice tests before booking the real exam. This provides a comfortable margin above the pass mark and accounts for the fact that the real test may include questions you have not seen in practice. Consistency is key — a single high score followed by lower scores suggests knowledge gaps that need addressing.",
  },
  {
    id: 6,
    question:
      "What should you look for when reading HS&E test questions carefully?",
    options: [
      "Keywords like 'MOST appropriate', 'FIRST thing', 'ALWAYS', and 'NEVER'",
      "The length of the question — longer questions are usually harder",
      "Whether the question has been asked before in previous tests",
      "The position of the correct answer — it is usually option B or C",
    ],
    correctAnswer: 0,
    explanation:
      "You should look for keywords like 'MOST appropriate', 'FIRST thing', 'ALWAYS', and 'NEVER'. These qualifier words are critical because they change the meaning of the question significantly. For example, several answers might be acceptable actions, but the question asks which is the MOST appropriate or the FIRST thing you should do.",
  },
  {
    id: 7,
    question:
      "If you fail the HS&E test, how long must you wait before re-sitting?",
    options: [
      "24 hours",
      "At least 2 clear working days",
      "At least 7 calendar days",
      "At least 30 days",
    ],
    correctAnswer: 1,
    explanation:
      "If you fail the HS&E test, you must wait at least 2 clear working days before re-sitting. This gives you time to review the areas you scored poorly on and do focused revision. The results screen shows broad categories of performance, helping you identify which topics need more study. Re-sit fees apply at the same rate as the original test.",
  },
  {
    id: 8,
    question:
      "Once you pass the HS&E test, how long is the result valid for, and approximately how much does the CSCS card cost?",
    options: [
      "1 year; approximately £20 including VAT",
      "2 years; approximately £36 including VAT",
      "5 years; approximately £50 including VAT",
      "The result never expires; the card is free",
    ],
    correctAnswer: 1,
    explanation:
      "Your HS&E test result is stored on the CITB system for 2 years. You must apply for your CSCS card within this period. The card costs approximately £36 including VAT, and processing takes about 10 working days. You apply online at cscs.uk.com with your test pass, proof of qualification, valid photo ID, a passport-style photo, and payment.",
  },
];

export default function CscsCardModule1Section4() {
  useSEO({
    title: "Booking, Preparation & Study Tips | CSCS Card Module 1.4",
    description:
      "How to book the CITB HS&E test at Pearson VUE centres, what to bring on test day, effective study strategies, key focus areas, practice test approach, test day tips, and applying for your CSCS card.",
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
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <Lightbulb className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Booking, Preparation &amp; Study Tips
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to book the HS&amp;E test, what to bring on the day, proven study strategies, key topics to focus on, and what to do after you pass
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Book:</strong> CITB website or phone &mdash; Pearson VUE centres</li>
              <li><strong>Cost:</strong> ~&pound;21 + VAT (test) &mdash; ~&pound;36 (card)</li>
              <li><strong>ID:</strong> Two forms, one must be photo ID</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">On the Day</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Arrive:</strong> 15 minutes early minimum</li>
              <li><strong>Format:</strong> 50 questions in 45 minutes</li>
              <li><strong>After:</strong> Result valid for 2 years</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain how to book the HS&E test through CITB and select a Pearson VUE test centre",
              "List the identification documents and items required on test day",
              "Describe effective study strategies including the official CITB resources",
              "Identify the key topic areas that carry the most weight in the HS&E test",
              "Apply test-taking techniques including time management and the flag-and-review method",
              "Outline the steps to apply for a CSCS card after passing the HS&E test",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Booking the HS&E Test */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Booking the HS&amp;E Test
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HS&amp;E test is booked through the <strong>CITB website</strong> or <strong>by phone</strong>.
                Tests are available at <strong>Pearson VUE centres</strong> throughout the UK, giving you
                a wide choice of location regardless of where you live or work. The cost is approximately
                <strong> &pound;21 + VAT</strong> for Operatives and Specialists, or <strong>&pound;21 + VAT</strong> for
                Managers.
              </p>

              <p>
                You choose your <strong>preferred date, time, and test centre</strong> when booking. Bookings
                can be made up to <strong>a year in advance</strong>, which is useful if you want to secure a
                specific date at a popular centre. Same-day or next-day slots may be available depending on
                demand, so last-minute bookings are sometimes possible if you need to sit the test urgently.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarCheck className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Cancellation Policy</p>
                </div>
                <p className="text-sm text-white/80">
                  You can <strong className="text-white">cancel or reschedule up to 3 clear working days</strong> before
                  your test without charge. If you cancel with less notice, you will forfeit your booking fee
                  and need to pay again to rebook. Always allow enough buffer when booking in case of unexpected
                  changes to your schedule.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Booking Summary</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Book through <strong className="text-white">CITB website or by phone</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Tests held at <strong className="text-white">Pearson VUE centres</strong> across the UK</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Cost: approximately <strong className="text-white">&pound;21 + VAT</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Book up to <strong className="text-white">1 year in advance</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Cancel or reschedule <strong className="text-white">3+ clear working days</strong> before without charge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Same-day / next-day slots may be available depending on demand</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: What to Bring on Test Day */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            What to Bring on Test Day
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Preparation for test day starts with making sure you have the right documents. Without the
                correct identification, you will <strong>not be allowed to sit the test</strong> and will
                lose your booking fee. The rules are strict and consistently enforced at all Pearson VUE centres.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">ID Requirements</p>
                </div>
                <p className="text-sm text-white/80">
                  You must bring <strong className="text-white">two forms of ID</strong>. At least one must be
                  a <strong className="text-white">valid photo ID</strong> &mdash; a passport, driving licence,
                  or CSCS-approved biometric ID. The name on your ID must match the name used when booking
                  the test. Expired ID will not be accepted.
                </p>
              </div>

              <p>
                Arrive at the test centre at least <strong>15 minutes early</strong>. This allows time for
                the sign-in process, ID verification, and familiarisation with the test environment. If you
                arrive late, the centre may refuse entry.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Test Room Rules</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">No personal items</strong> allowed in the test room &mdash; bags, phones, watches, and notes are stored in a locker</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">No food or drink</strong> in the test room</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>You may receive a <strong className="text-white">wipeable board and marker</strong> for notes during the test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>The test centre provides <strong className="text-white">everything else</strong> you need &mdash; the computer, headphones (for video questions), and instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Talking, looking at other screens, or communicating with other candidates is <strong className="text-white">not permitted</strong></span>
                  </li>
                </ul>
              </div>

              {/* Test Day Checklist Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-4 text-center">Test Day Checklist</p>

                <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {/* What to Bring */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-xs font-semibold text-green-300 mb-3 text-center uppercase tracking-wide">Bring</p>
                    <ul className="text-xs text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Photo ID (passport / licence)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Second form of ID</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Booking confirmation</span>
                      </li>
                    </ul>
                  </div>

                  {/* What to Expect */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-xs font-semibold text-green-300 mb-3 text-center uppercase tracking-wide">Expect</p>
                    <ul className="text-xs text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Sign-in &amp; ID check</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Store belongings in locker</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Wipeable board provided</span>
                      </li>
                    </ul>
                  </div>

                  {/* Timing */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-xs font-semibold text-green-300 mb-3 text-center uppercase tracking-wide">Timing</p>
                    <ul className="text-xs text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <Clock className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Arrive 15 mins early</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>50 questions &mdash; 45 mins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>~54 seconds per question</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4">
                  Without correct ID you will not be allowed to sit the test
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Effective Study Strategies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            Effective Study Strategies
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Preparing for the HS&amp;E test does not require months of study, but it does require
                <strong> structured, focused preparation</strong>. The test is designed to be passable
                with adequate study, and the vast majority of candidates who prepare properly pass on
                their first attempt.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Recommended Study Methods</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Use the <strong className="text-white">official CITB publications</strong> &mdash; the &ldquo;yellow book&rdquo; (GE700 Health, Safety and Environment Information) is the primary study resource</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Take <strong className="text-white">practice tests</strong> regularly &mdash; the CITB app and official online practice tests replicate the real test format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Study in <strong className="text-white">short focused sessions (30&ndash;45 minutes)</strong> rather than long cramming sessions &mdash; retention is far better with shorter, regular study</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Focus on <strong className="text-white">understanding concepts, not memorising answers</strong> &mdash; the question bank changes regularly, so rote memorisation is unreliable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Pay special attention to <strong className="text-white">behavioural case studies</strong> &mdash; these questions require judgement and cannot be answered by memorising facts alone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Study with a friend or colleague</strong> to discuss scenarios &mdash; talking through situations helps build deeper understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Use this <strong className="text-white">Elec-Mate course</strong> to cover all the key topics in a structured, comprehensive way</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Common Mistakes</p>
                </div>
                <p className="text-sm text-white/80">
                  The most common preparation mistakes are: relying solely on practice questions without
                  reading the underlying material; cramming everything the night before; using outdated or
                  unofficial study materials; and ignoring the behavioural case study questions. The
                  behavioural questions test your <strong className="text-white">judgement in real workplace
                  scenarios</strong> and require genuine understanding, not memorisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Key Areas to Focus On */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Key Areas to Focus On
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Based on analysis of the HS&amp;E test, certain topic areas carry significantly more weight
                than others. While you should study all topics, focusing your revision on these high-priority
                areas will give you the best chance of passing.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Highest-Weight Topics</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Working at height",
                    "Manual handling",
                    "Fire safety",
                    "Personal protective equipment (PPE)",
                    "Risk assessment",
                    "Asbestos awareness",
                    "COSHH (hazardous substances)",
                    "Electrical safety",
                    "Behavioural responses to unsafe situations",
                  ].map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Key Regulations to Know</p>
                <p className="text-sm text-white/80 mb-3">
                  You do not need to memorise regulation numbers, but you should understand the purpose,
                  scope, and key requirements of each:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Health and Safety at Work Act 1974</strong> (HASAWA) &mdash; the foundational UK health and safety law</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Construction (Design and Management) Regulations 2015</strong> (CDM) &mdash; duties for all construction project participants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Control of Substances Hazardous to Health Regulations 2002</strong> (COSHH) &mdash; managing chemical and biological hazards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Work at Height Regulations 2005</strong> &mdash; preventing falls from height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Manual Handling Operations Regulations 1992</strong> &mdash; safe lifting and carrying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Electricity at Work Regulations 1989</strong> &mdash; electrical safety in the workplace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Control of Asbestos Regulations 2012</strong> &mdash; managing asbestos risks</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Behavioural Questions</p>
                </div>
                <p className="text-sm text-white/80">
                  Behavioural case study questions present a workplace scenario and ask what you would do.
                  There is often more than one &ldquo;reasonable&rdquo; answer, but only one is the
                  <strong className="text-white"> MOST appropriate</strong> response. These questions test whether
                  you would prioritise safety, follow correct procedures, and take the right action in the
                  right order. Always think: &ldquo;What would a competent, safety-conscious worker do?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Practice Test Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Practice Test Approach
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Practice tests are one of the most effective preparation tools available. They familiarise
                you with the test format, help you identify knowledge gaps, and build confidence. However,
                they must be used <strong>correctly</strong> to be truly effective.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practice Test Strategy</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Take the <strong className="text-white">official CITB practice tests</strong> before booking your real test &mdash; these most closely match the actual exam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Track which topics you get wrong</strong> and focus your revision on those areas specifically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Practice under <strong className="text-white">timed conditions</strong> to build comfort with the 45-minute time limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Aim for <strong className="text-white">consistently scoring above 90%</strong> on practice tests before booking the real exam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Use the <strong className="text-white">&ldquo;flag and review&rdquo; technique</strong> &mdash; flag any question you are uncertain about and review them at the end</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-2">Why 90%?</p>
                <p className="text-sm text-white/80">
                  The pass mark for the HS&amp;E test varies depending on the card category, but consistently
                  scoring above 90% on practice tests gives you a <strong className="text-white">comfortable
                  margin</strong>. The real test may include questions you have not seen in practice, and test-day
                  nerves can affect performance. A 90%+ practice score means you have genuine understanding of
                  the material, not just familiarity with specific practice questions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Available Practice Resources</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">CITB HS&amp;E test app</strong> &mdash; official mobile app with practice questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">CITB online practice tests</strong> &mdash; web-based tests that replicate the real format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">GE700 revision questions</strong> &mdash; end-of-chapter questions in the yellow book</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Elec-Mate section quizzes</strong> &mdash; topic-by-topic knowledge checks throughout this course</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Test Day Tips */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Test Day Tips
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On the day of the test, your preparation should put you in a strong position. These
                practical tips will help you perform at your best and avoid common mistakes that cost
                marks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reading Questions</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Read each question carefully &mdash; look for keywords like <strong className="text-white">&ldquo;MOST appropriate&rdquo;</strong>, <strong className="text-white">&ldquo;FIRST thing&rdquo;</strong>, <strong className="text-white">&ldquo;ALWAYS&rdquo;</strong>, and <strong className="text-white">&ldquo;NEVER&rdquo;</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>These qualifier words change the meaning entirely &mdash; several answers might be acceptable, but only one is the <strong className="text-white">most correct</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>For behavioural questions, think about what a <strong className="text-white">competent, safety-conscious worker</strong> would do in that exact situation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Answering Strategy</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Eliminate obviously wrong answers first</strong> to improve your odds &mdash; even removing one option significantly increases your chances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Don&rsquo;t change answers</strong> unless you have a clear reason &mdash; your first instinct is usually right</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Use the <strong className="text-white">flag feature</strong> for questions you want to revisit &mdash; don&rsquo;t get stuck on any single question</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Always <strong className="text-white">select an answer</strong> before flagging and moving on &mdash; you may run out of time to come back</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Time Management</p>
                </div>
                <p className="text-sm text-white/80">
                  You have <strong className="text-white">45 minutes for 50 questions</strong>, which works out at
                  approximately <strong className="text-white">54 seconds per question</strong>. Most candidates find
                  they have time to spare, but if you get stuck on a question, flag it and move on. It is far
                  better to answer all 50 questions and come back to flagged ones than to run out of time with
                  unanswered questions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Staying Calm</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>The test is <strong className="text-white">designed to be passable</strong> with adequate preparation &mdash; it is not meant to trick you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>If you have prepared well and scored above 90% on practice tests, you are <strong className="text-white">well positioned to pass</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Take a deep breath before starting &mdash; a calm, focused approach produces better results than rushing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Remember that you do <strong className="text-white">not need 100%</strong> to pass &mdash; you are allowed to get some questions wrong</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: If You Fail */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            If You Fail
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Don&rsquo;t panic if you don&rsquo;t pass on your first attempt. Approximately
                <strong> 20% of candidates fail</strong> on their first try, so you are not alone.
                The important thing is to use the experience constructively and prepare more
                effectively for your re-sit.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Re-Sit Process</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>You must wait at least <strong className="text-white">2 clear working days</strong> before re-sitting the test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Identify which areas you scored poorly on &mdash; the <strong className="text-white">results screen shows broad categories</strong> of performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Spend focused time revising those <strong className="text-white">specific topics</strong> rather than re-studying everything</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Consider whether you need <strong className="text-white">different study materials or approaches</strong> &mdash; if your current method didn&rsquo;t work, change it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Re-sit fees apply</strong> at the same rate as the original test (~&pound;21 + VAT)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-2">Intensive Preparation Courses</p>
                <p className="text-sm text-white/80">
                  Many training providers offer <strong className="text-white">intensive one-day CSCS preparation
                  courses</strong> specifically designed for candidates who have failed or who want additional
                  support before their first attempt. These courses cover all key topics in a structured
                  classroom environment with an instructor who can answer questions and explain difficult
                  concepts. They typically cost between &pound;100 and &pound;200.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Common Reasons for Failure</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Insufficient preparation &mdash; underestimating the test difficulty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Using outdated or unofficial study materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Poor performance on behavioural case study questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Rushing through questions without reading them carefully</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Language barriers &mdash; if English is not your first language, additional support may be available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: After Passing — Applying for Your Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            After Passing &mdash; Applying for Your Card
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once you pass the HS&amp;E test, your result is stored on the <strong>CITB system for
                2 years</strong>. You must apply for your CSCS card within this 2-year window. If you
                do not apply in time, your test result expires and you will need to re-sit the test.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Application Requirements</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Apply for your CSCS card online at <strong className="text-white">cscs.uk.com</strong>. You will need:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">HS&amp;E test pass</strong> &mdash; linked to your name and date of birth on the CITB system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Proof of relevant qualification</strong> &mdash; NVQ, SVQ, or equivalent registered on the Construction Training Register (CTR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Valid photo ID</strong> &mdash; passport, driving licence, or equivalent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Passport-style photograph</strong> &mdash; digital photo meeting CSCS specification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Payment</strong> &mdash; approximately &pound;36 including VAT</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Processing Time</p>
                </div>
                <p className="text-sm text-white/80">
                  Processing takes approximately <strong className="text-white">10 working days</strong> from the
                  date your application is approved. Your card is posted to your <strong className="text-white">registered
                  address</strong>. If you need a card urgently for site access, check whether a digital card or
                  temporary confirmation of application is available through the CSCS system.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Important Timelines</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>HS&amp;E test result valid for <strong className="text-white">2 years</strong> &mdash; apply within this window</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Card processing takes approximately <strong className="text-white">10 working days</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Most CSCS cards are valid for <strong className="text-white">5 years</strong> from issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>You must <strong className="text-white">renew before expiry</strong> to maintain site access &mdash; renewal requires a new HS&amp;E test pass</span>
                  </li>
                </ul>
              </div>

              {/* Study Plan Template Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-4 text-center">Suggested Study Plan &mdash; 4 Weeks to Test Day</p>

                <div className="space-y-4 max-w-2xl mx-auto">
                  {/* Week 1 */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-300">W1</span>
                      </div>
                      <p className="text-sm font-medium text-green-300">Week 1 &mdash; Foundation</p>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1.5 ml-10">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Read GE700 chapters on HASAWA, CDM, and risk assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Complete Elec-Mate Modules 1 &amp; 2</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Take first practice test to establish baseline score</span>
                      </li>
                    </ul>
                  </div>

                  {/* Week 2 */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-300">W2</span>
                      </div>
                      <p className="text-sm font-medium text-green-300">Week 2 &mdash; Core Topics</p>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1.5 ml-10">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Working at height, manual handling, fire safety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Complete Elec-Mate Modules 3 &amp; 4</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Practice tests &mdash; note weak areas</span>
                      </li>
                    </ul>
                  </div>

                  {/* Week 3 */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-300">W3</span>
                      </div>
                      <p className="text-sm font-medium text-green-300">Week 3 &mdash; Specialist Topics</p>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1.5 ml-10">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Asbestos, COSHH, electrical safety, PPE</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Complete Elec-Mate Module 5</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Focus revision on identified weak areas</span>
                      </li>
                    </ul>
                  </div>

                  {/* Week 4 */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-300">W4</span>
                      </div>
                      <p className="text-sm font-medium text-green-300">Week 4 &mdash; Final Revision</p>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1.5 ml-10">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Timed practice tests daily &mdash; aim for 90%+ consistently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Behavioural case study practice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Light revision only on test eve &mdash; get a good night&rsquo;s sleep</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4">
                  30&ndash;45 minutes of focused study per session &mdash; short sessions beat long cramming
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Don&rsquo;t Delay</p>
                </div>
                <p className="text-sm text-white/80">
                  Apply for your card as soon as possible after passing the HS&amp;E test. Your result is valid
                  for 2 years, but delays can arise &mdash; for example, your qualification may take time to be
                  registered on the CTR, or there may be issues with your photograph. Starting the application
                  promptly gives you time to resolve any issues without risking your test result expiring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation — Back to Module 1 / Next: Module 2 */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pb-8 border-b border-white/10 mb-10">
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
            <Link to="../cscs-card-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

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

        {/* Repeated Bottom Navigation */}
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
            <Link to="../cscs-card-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
