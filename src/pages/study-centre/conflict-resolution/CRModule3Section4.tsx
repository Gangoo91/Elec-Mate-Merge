import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Clock,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cr-3-4-check1',
    question:
      'According to this section, what is the primary cause of most client disputes in the electrical trade?',
    options: [
      'Faulty workmanship that does not comply with BS 7671',
      'Misaligned expectations between the electrician and the client',
      'Deliberate underquoting to win the job',
      'Clients who refuse to pay on principle',
    ],
    correctIndex: 1,
    explanation:
      'The primary cause of most client disputes is misaligned expectations, not bad workmanship. When the client expects one thing and the electrician delivers another — even if the work is technically competent and compliant — the result is dissatisfaction and dispute. This can include expectations about timelines (when the job will be finished), scope (what is included), communication (how often they will be updated), and finish quality (what the completed work will look like). Setting clear expectations at every stage of the customer journey is the single most effective dispute prevention strategy.',
  },
  {
    id: 'cr-3-4-check2',
    question:
      'An electrician quotes 3 days for a job and finishes in 3 days. Another electrician quotes 4 days and finishes in 3 days. Both did identical work. Which client is more satisfied?',
    options: [
      'The first client, because 3 days is objectively faster',
      'The second client, because they experienced a positive surprise of finishing early',
      'Both are equally satisfied because the work took the same time',
      'Neither is satisfied because domestic clients always want work done in one day',
    ],
    correctIndex: 1,
    explanation:
      'The second client is more satisfied because they experienced a positive surprise — the job was finished a day earlier than expected. The first client simply had their expectation met (not exceeded). This is the principle of under-promise, over-deliver: satisfaction is not about the absolute outcome, but about the gap between expectation and reality. Both electricians did identical work in identical time, but the one who set a slightly conservative timeline created a positive experience. This does not mean quoting absurdly long timelines — it means quoting realistic timelines rather than optimistic ones, and letting efficiency work in your favour.',
  },
  {
    id: 'cr-3-4-check3',
    question:
      'A client calls you at 9pm on a Saturday about a non-urgent matter. What is the most professional response?',
    options: [
      'Answer immediately and deal with it on the spot to show excellent customer service',
      'Ignore the call and never respond',
      'Let it go to voicemail, then text on Monday morning: "Hi, I saw you called — I will ring you first thing Monday to discuss"',
      'Send an angry text explaining that you do not work weekends',
    ],
    correctIndex: 2,
    explanation:
      'The most professional response is to let it go to voicemail and then send a brief text or respond on Monday morning. This maintains your boundary (you are not available at 9pm on Saturday for non-urgent matters) while also demonstrating that you are responsive and reliable (you acknowledged the call and committed to a specific follow-up time). Answering immediately sets a precedent that you are available 24/7, which is unsustainable. Ignoring it entirely appears unprofessional. An angry text damages the relationship. The key is to be professional and responsive within the boundaries you have set — which means those boundaries need to be communicated early in the relationship.',
  },
];

const faqs = [
  {
    question: 'How do I set expectations without sounding negative or pessimistic?',
    answer:
      'Frame expectations positively rather than negatively. Instead of "The job might take longer if we find problems behind the plasterboard," say, "I have allowed 3 days for the job, and if everything goes smoothly it could be quicker. If we uncover anything unexpected — which is common in older properties — I will let you know straight away so we can discuss the best way forward." This sets the same expectation (possible delays) but in a positive, professional tone that the client can relate to. The key is to be realistic, not pessimistic, and to position potential challenges as things you are prepared to handle rather than things that might go wrong.',
  },
  {
    question: 'Should I give clients my personal mobile number?',
    answer:
      'This is a personal business decision, and many successful electricians do give out their personal mobile. The important thing is not whether you give out the number, but what boundaries you set around it. If you give out your personal number, make it clear what hours you are available: "Feel free to text or call on this number between 7am and 6pm Monday to Friday. Outside those hours, leave a message and I will get back to you next working day." If you prefer to keep your personal number private, consider a separate business line or a virtual number service. The technology you use matters less than the clarity of the boundary you set.',
  },
  {
    question: 'What if a client keeps changing their mind during the job?',
    answer:
      'Frequent changes during a job are a scope creep issue (covered in Section 2), but they are also an expectation management issue. If a client changes their mind repeatedly, it suggests that the specification was not fully agreed before work started. The best approach is to pause, sit down with the client, and agree the final specification in writing before continuing. Say, "I want to make sure we get this exactly right for you. Let us agree the final layout now so I can complete the work without any further changes. If you want to make any more changes after this point, I am happy to do them, but each change will be priced and confirmed separately." This is professional, protective, and prevents the endlessly shifting goalposts that drive tradespeople to distraction.',
  },
  {
    question: 'How do I handle clients who expect me to be available 24/7?',
    answer:
      'Set the boundary early and reinforce it consistently. At the quoting stage, include your working hours and contact preferences in your terms. When the client first contacts you outside hours, respond during your next working period: "Hi, I got your message last night. I am available Monday to Friday 7am to 6pm — let me deal with this for you now." Most clients will adjust quickly once they understand the boundary. For the rare client who cannot respect reasonable boundaries despite clear communication, consider whether the relationship is sustainable. A client who demands 24/7 availability for non-emergency matters is a client who will create more stress than revenue. It is better to have a respectful boundary conversation than to burn out trying to be permanently available.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the single most effective strategy for preventing client disputes?',
    options: [
      'Underquoting to ensure the client feels they are getting value',
      'Setting clear, realistic expectations at every stage of the customer journey',
      'Offering a money-back guarantee on all work',
      "Working faster to minimise the client's inconvenience",
    ],
    correctAnswer: 1,
    explanation:
      'Setting clear, realistic expectations at every stage of the customer journey is the single most effective dispute prevention strategy. Most disputes arise not from bad workmanship, but from a gap between what the client expected and what was delivered. By proactively managing expectations — about timelines, scope, cost, communication, and finish quality — you eliminate the conditions that cause disputes before they arise. This is far more effective than reactive strategies like guarantees, which only come into play after dissatisfaction has already occurred.',
  },
  {
    id: 2,
    question: 'Which stage of the customer journey is the most important for setting expectations?',
    options: [
      'The first contact / enquiry stage',
      'The quoting stage',
      'The handover / completion stage',
      'Every stage is equally important',
    ],
    correctAnswer: 3,
    explanation:
      'Every stage of the customer journey is equally important for expectation management, because different expectations are relevant at each stage. The first contact stage sets expectations about your responsiveness and professionalism. The quoting stage sets expectations about scope, cost, and timelines. The during-work stage sets expectations about communication, site cleanliness, and progress. The completion stage sets expectations about handover, certification, and aftercare. Neglecting any single stage creates a gap that can lead to dissatisfaction. Consistent, proactive communication throughout the entire journey is the key.',
  },
  {
    id: 3,
    question: 'What does the principle of "under-promise, over-deliver" mean in practice?',
    options: [
      'Quote a much higher price than necessary, then charge less',
      'Quote realistic (not optimistic) timelines and let your efficiency create positive surprises',
      'Promise less than you intend to deliver to create a low-quality expectation',
      'Deliberately delay the start of work so that the actual duration seems shorter',
    ],
    correctAnswer: 1,
    explanation:
      'Under-promise, over-deliver means quoting realistic (rather than optimistic) timelines and then letting your efficiency create positive surprises. If you genuinely believe a job will take 3 days, quoting 3-4 days gives you a buffer for unexpected issues and means that finishing in 3 days feels like a win for the client. It does not mean quoting absurdly long timelines (which would lose you jobs) or promising poor quality (which is unprofessional). It means building a small, honest margin into your commitments so that you consistently meet or exceed expectations rather than falling short.',
  },
  {
    id: 4,
    question:
      'A client has not heard from their electrician for three days during a week-long rewire. What is the client likely thinking?',
    options: [
      '"No news is good news — the job must be going well"',
      '"Something has gone wrong, they are avoiding me, or they have forgotten about my job"',
      '"The electrician is clearly very busy and professional"',
      '"Three days is a perfectly normal communication gap during a rewire"',
    ],
    correctAnswer: 1,
    explanation:
      'When a client has not heard from a tradesperson for an extended period, the "no news is bad news" perception takes hold. The client fills the silence with anxiety: something has gone wrong, the tradesperson has forgotten about them, or they are being avoided. This is true even when everything is going perfectly. The solution is proactive communication — a daily end-of-day text for domestic jobs ("Good progress today, first fix complete in the kitchen. Starting the bedrooms tomorrow") or weekly reports for commercial projects. This takes less than a minute and completely eliminates the anxiety that silence creates.',
  },
  {
    id: 5,
    question:
      'What information should you communicate at the quoting stage to set expectations effectively?',
    options: [
      'Price only — that is all the client cares about',
      'Price and timeline only',
      'Scope, price, timeline, payment terms, exclusions, and what to expect during the work',
      'A generic terms and conditions document with no job-specific detail',
    ],
    correctAnswer: 2,
    explanation:
      'Effective expectation setting at the quoting stage requires communicating: the scope (exactly what work is included and excluded), the price (broken down if possible), the timeline (estimated start and completion dates), payment terms (when payment is due, accepted methods), exclusions (what is not included), and what to expect during the work (disruption, access requirements, noise). This comprehensive approach eliminates ambiguity and gives the client a complete picture of what they are agreeing to. A quote that only states a price leaves too many expectations unset.',
  },
  {
    id: 6,
    question: 'What is the recommended communication frequency for a domestic electrical job?',
    options: [
      'No communication needed unless there is a problem',
      'One update at the start and one at the end of the job',
      'A brief daily end-of-day text or message summarising progress',
      'Hourly updates with photographs of every stage',
    ],
    correctAnswer: 2,
    explanation:
      'For domestic jobs, a brief daily end-of-day text or message summarising progress is the recommended communication frequency. This takes less than a minute to write ("Good progress today — first fix complete in the kitchen and lounge. Starting bedrooms tomorrow morning") but has a disproportionately positive effect on the client experience. It eliminates the "no news is bad news" anxiety, demonstrates professionalism, and provides a written record of progress. Hourly updates are excessive and impractical, while no communication creates anxiety and distrust.',
  },
  {
    id: 7,
    question: 'What is the best way to communicate your working hours and availability to clients?',
    options: [
      'Do not mention it and deal with each situation as it arises',
      'Include your working hours and contact preferences in your terms at the quoting stage, and reinforce when needed',
      'Wait until a client contacts you at an unreasonable hour, then tell them off',
      'Be available 24/7 to demonstrate superior customer service',
    ],
    correctAnswer: 1,
    explanation:
      'The best approach is to include your working hours and contact preferences in your terms at the quoting stage, and then reinforce the boundary calmly when needed. Setting boundaries proactively (before they are tested) is far more effective than setting them reactively (after someone has already crossed them). A simple statement in your terms — "Available Monday to Friday, 7am-6pm. Messages outside these hours will be responded to on the next working day" — sets a clear, professional expectation that most clients will respect. For the few who do not, a calm, consistent reinforcement is sufficient.',
  },
  {
    id: 8,
    question:
      'An electrician has been sending daily progress texts throughout a five-day rewire. On the final day, they send a comprehensive handover message including: what was done, test certificate reference, warranty information, and aftercare contact details. What impact does this have?',
    options: [
      'No impact — the client already knows what was done because they live there',
      'Negative impact — it looks like the electrician is trying too hard',
      'Significant positive impact — it completes the communication loop, demonstrates professionalism, and creates a positive lasting impression',
      'Minor impact — clients never read handover messages',
    ],
    correctAnswer: 2,
    explanation:
      'A comprehensive handover message has a significant positive impact because it completes the communication loop that began at the quoting stage, demonstrates a high level of professionalism that most tradespeople do not match, and creates a positive lasting impression. The handover is the client\'s final experience of working with you, and psychological research confirms that people judge experiences primarily by the ending (the "peak-end rule"). A strong handover means the client\'s final memory of your service is competence and care, which influences their likelihood of recommending you, leaving a review, and hiring you again in future.',
  },
];

export default function CRModule3Section4() {
  useSEO({
    title: 'Managing Client Expectations | Conflict Resolution Module 3.4',
    description:
      'Setting expectations at every stage of the customer journey, under-promise over-deliver, communication frequency, and professional boundaries.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <ClipboardList className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Managing Client Expectations
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The proactive side of dispute prevention &mdash; setting expectations at every stage of
            the customer journey, under-promising and over-delivering, communication frequency, and
            professional boundaries
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Root cause:</strong> Most disputes stem from misaligned expectations, not
                bad work
              </li>
              <li>
                <strong>Strategy:</strong> Under-promise, over-deliver at every stage of the journey
              </li>
              <li>
                <strong>Communication:</strong> Proactive updates eliminate the &ldquo;no news is
                bad news&rdquo; problem
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Prevention:</strong> Setting expectations prevents 80% of complaints before
                they start
              </li>
              <li>
                <strong>Wellbeing:</strong> Clear boundaries protect your time, energy, and mental
                health
              </li>
              <li>
                <strong>Growth:</strong> Clients who feel well-managed become repeat customers and
                referrers
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why misaligned expectations are the primary cause of client disputes',
              'Map the customer journey and identify what to communicate at each stage',
              'Apply the under-promise, over-deliver principle to timelines, scope, and quality',
              'Establish a proactive communication routine that eliminates client anxiety',
              'Set professional boundaries around working hours, contact methods, and response times',
              'Handle boundary challenges confidently while maintaining the client relationship',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Expectation Management as Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Expectation Management as Prevention
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you were to analyse every client dispute you have ever had &mdash; or heard about
                from colleagues &mdash; you would find that the vast majority did not start with
                genuinely bad workmanship. They started with a gap between what the client expected
                and what was delivered. The work might have been technically competent, compliant
                with BS 7671, and properly tested and certified. But if the client expected it to be
                finished on Thursday and you finished on Friday, or expected the cable routes to be
                invisible and they are surface-mounted, or expected daily updates and received
                silence for three days, their <strong>experience</strong> of the service is negative
                &mdash; regardless of the technical quality.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Core Principle:</strong> Client satisfaction is
                  not determined by the quality of your work alone. It is determined by the gap
                  between expectation and reality. If expectations are set too high (or not set at
                  all), even excellent work can feel disappointing. If expectations are set
                  realistically, competent work feels satisfying. And if expectations are slightly
                  conservative, good work feels exceptional. Managing expectations is not about
                  lowering standards &mdash; it is about ensuring the client&rsquo;s mental model
                  matches reality.
                </p>
              </div>

              <p>
                Setting expectations at the <strong>quoting stage</strong> is particularly important
                because this is when the client forms their initial mental picture of the project. A
                quote that specifies the scope (what is included and excluded), the timeline
                (estimated start and completion), the payment terms (when and how to pay), what to
                expect during the work (disruption, noise, access requirements), and what the
                finished product will look like eliminates ambiguity and gives the client a
                complete, realistic picture of the project before they commit.
              </p>

              <p>
                Many electricians resist providing this level of detail because it takes time. But
                the 15 minutes spent writing a comprehensive quote saves hours of dispute management
                later. It also sets you apart from competitors who send a one-line text saying
                &ldquo;Full rewire - £4,500.&rdquo; The client who receives a detailed, professional
                quote is already forming a positive impression of your reliability and attention to
                detail &mdash; long before you pick up a tool.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Quoting Conversation</p>
                </div>
                <p className="text-sm text-white">
                  The site survey and quoting conversation is your first opportunity to manage
                  expectations. Use it to educate the client about what the job involves. Many
                  homeowners have no understanding of what happens during a rewire &mdash; they
                  think you turn up, run some cables, and leave. Explaining the process (&ldquo;We
                  will need to lift floorboards upstairs, there will be some channelling in the
                  walls, and there will be dust and disruption for about 3-4 days&rdquo;) prevents
                  the shock and frustration that arises when the client discovers this reality
                  mid-job. A client who knows what to expect can prepare mentally and practically. A
                  client who is blindsided will complain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Customer Journey */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The Customer Journey
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The customer journey is the complete experience from the client&rsquo;s first
                contact with you through to aftercare. At each stage, there are specific
                expectations to set and specific communications to make. Mapping this journey and
                building expectation management into each stage creates a consistently positive
                client experience that prevents disputes before they start.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Electrical Customer Journey
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">First Contact</p>
                      <p className="text-sm text-white">
                        Respond promptly (within 24 hours for non-urgent enquiries). Be professional
                        and friendly. Set expectations about your availability and process: &ldquo;I
                        will arrange a site visit to look at the job, then send you a detailed quote
                        within 48 hours.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Site Survey</p>
                      <p className="text-sm text-white">
                        Arrive on time. Explain what you are looking at and why. Educate the client
                        about what the job will involve. Identify potential complications and
                        discuss them openly. This builds trust and prevents surprises later.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Quote</p>
                      <p className="text-sm text-white">
                        Deliver the quote when you said you would. Include: scope, exclusions,
                        timeline, payment terms, and what to expect during the work. Follow up if
                        you have not heard back within a week.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Acceptance &amp; Pre-Start</p>
                      <p className="text-sm text-white">
                        Confirm the start date and expected duration. Advise on any preparation
                        needed (&ldquo;Please clear the loft hatch area&rdquo; or &ldquo;We will
                        need to turn the power off for periods during the day&rdquo;). Request the
                        deposit if applicable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">During Work</p>
                      <p className="text-sm text-white">
                        Daily end-of-day progress updates (text or brief message). Flag any issues
                        or surprises immediately, not at the end. Maintain a clean and respectful
                        working environment. Be courteous to family members and other trades.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Completion &amp; Handover</p>
                      <p className="text-sm text-white">
                        Walk the client through the completed work. Explain what was done, show them
                        the consumer unit, demonstrate any new controls. Hand over certificates and
                        test results. Explain warranty and aftercare arrangements. Issue the final
                        invoice.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      7
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Aftercare</p>
                      <p className="text-sm text-white">
                        Follow up after a week to check everything is working well. Provide contact
                        details for any future issues. This is where long-term loyalty and referrals
                        are built. A simple &ldquo;How is everything working?&rdquo; text a week
                        later costs nothing and generates immense goodwill.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Under-Promise, Over-Deliver */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Under-Promise, Over-Deliver
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The principle of <strong>under-promise, over-deliver</strong> is one of the simplest
                and most effective strategies in client management. The concept is straightforward:
                set expectations slightly below what you realistically expect to achieve, so that
                when you meet your actual target, the client experiences a positive surprise rather
                than just a met expectation.
              </p>

              <p>
                Consider two electricians doing the same job. Electrician A quotes 3 days and
                finishes in 3 days. Electrician B quotes 4 days and finishes in 3 days. Both did
                identical work in identical time. But Electrician A merely met the client&rsquo;s
                expectation (&ldquo;They said 3 days, it took 3 days &mdash; fine&rdquo;), while
                Electrician B exceeded it (&ldquo;They said 4 days but finished in 3 &mdash;
                brilliant!&rdquo;). The second client has a significantly better experience, will
                leave a more enthusiastic review, and is more likely to recommend Electrician B to
                friends and family.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Important Distinction:</strong> Under-promising
                  does not mean quoting absurdly long timelines or low quality. If a rewire
                  genuinely takes 3 days, quoting 3-4 days is under-promising. Quoting 2 weeks would
                  be dishonest and would cost you the job. The aim is to quote{' '}
                  <strong>realistic rather than optimistic</strong> timelines, build in a small
                  buffer for the unexpected, and let your efficiency work in your favour. If things
                  go perfectly, you finish early and the client is delighted. If complications arise
                  (as they often do in older properties), you still finish within the quoted time.
                </p>
              </div>

              <p>
                This principle extends beyond timelines. It applies to finish quality (&ldquo;I will
                make good the chasing &mdash; it will not be invisible but it will be neat and ready
                for your decorator&rdquo; &mdash; then doing an exceptionally clean job), to
                communication (&ldquo;I will send you an update each evening&rdquo; &mdash; then
                sending a detailed update with photographs), and to problem-solving (&ldquo;I have
                found an issue with the existing wiring that needs addressing &mdash; I have
                included a solution at no extra charge because it was minor and it was the right
                thing to do&rdquo;). Each of these small moments of exceeding expectations builds
                trust and loyalty.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Risk of Over-Promising</p>
                </div>
                <p className="text-sm text-white">
                  The flip side of under-promising is the danger of over-promising. Electricians
                  often over-promise because they are enthusiastic about winning the work, want to
                  impress the client, or genuinely believe the optimistic timeline will hold. But
                  optimistic timelines almost never hold &mdash; unexpected discoveries, supply
                  delays, weather issues, and other trades running behind are all common in
                  construction. When you over-promise and under-deliver, the client is disappointed
                  even if your work is excellent. It is far better to set a realistic expectation
                  and pleasantly surprise the client than to set an optimistic one and disappoint
                  them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Communication Frequency */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Communication Frequency
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most underestimated aspects of client management is communication
                frequency. Most tradespeople communicate when they have something specific to say
                &mdash; a problem, a question, a request for payment. But this creates a negative
                association: every time the client hears from the electrician, it is bad news.{' '}
                <strong>Proactive updates</strong> reverse this pattern by ensuring that the
                majority of your communications are positive progress reports rather than problem
                escalations.
              </p>

              <p>
                The <strong>&ldquo;no news is bad news&rdquo; perception</strong> is a real and
                well-documented psychological phenomenon. When a client has not heard from their
                tradesperson for an extended period, they do not assume everything is going well.
                They assume the worst: something has gone wrong, the tradesperson has forgotten
                about them, or they are being avoided. This anxiety builds over time and primes the
                client for conflict when they eventually do make contact. A single daily text
                message completely eliminates this anxiety.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Recommended Communication Frequency
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Domestic jobs (1-5 days):</strong> A brief
                      daily end-of-day text summarising what was done today and what is planned for
                      tomorrow. Include a photograph if appropriate. &ldquo;Good progress today
                      &mdash; first fix complete in kitchen and lounge. Starting bedrooms tomorrow
                      morning. Everything on track.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Larger domestic jobs (1-2 weeks):</strong>{' '}
                      Daily texts plus a mid-week summary email or message covering overall
                      progress, any issues identified, and the projected completion date. This gives
                      the client a reliable rhythm they can depend on.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Commercial projects:</strong> Weekly
                      progress reports (usually required contractually) covering work completed,
                      work planned, issues and risks, and any variations. Daily communication is
                      typically through site meetings or direct discussion with the project manager.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Pre-start waiting period:</strong> If there
                      is a gap between quote acceptance and start date, send a brief confirmation a
                      week before: &ldquo;Just confirming I will be starting on Monday as planned.
                      Is there anything you need to prepare?&rdquo; This prevents the client
                      worrying that you have forgotten about them.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The key insight is that{' '}
                <strong>the cost of proactive communication is almost zero</strong>, while the
                benefit is enormous. A daily end-of-day text takes 30 seconds to write. Over the
                course of a five-day job, that is two and a half minutes of total effort. For that
                two and a half minutes, you eliminate client anxiety, demonstrate professionalism,
                create a written record of progress, and build a positive experience that generates
                referrals and repeat work. There is no other two-and-a-half-minute activity in your
                business that delivers a higher return on investment.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Setting Boundaries */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Setting Boundaries
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Professional boundaries are essential for sustainable client relationships. Without
                boundaries, the desire to provide excellent service can lead to burnout, resentment,
                and ultimately poorer service for everyone. A boundary is not a wall &mdash; it is a
                fence with a gate. It defines the limits while still allowing access within
                appropriate parameters.
              </p>

              <p>
                The three key boundaries for electricians are <strong>working hours</strong>,{' '}
                <strong>contact method</strong>, and <strong>response time</strong>. Setting these
                clearly at the start of the relationship prevents most boundary-related issues
                before they arise.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Three Essential Boundaries
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Working hours:</strong> Clearly communicate
                      your typical working hours. &ldquo;I work Monday to Friday, 7.30am to 5pm. I
                      am available for calls and messages during these hours.&rdquo; If you
                      occasionally work weekends, specify that they are by arrangement only, not the
                      default expectation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Contact method:</strong> Specify your
                      preferred contact method and when to use alternatives. &ldquo;For day-to-day
                      queries, text or WhatsApp is best. For anything urgent, call me. For formal
                      matters like quotes and invoices, email.&rdquo; This prevents the client
                      leaving a voicemail you do not check for three days, or sending an email you
                      do not see until the weekend.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Response time:</strong> Set a realistic
                      expectation. &ldquo;I will respond to messages within a working day, usually
                      much sooner. If it is genuinely urgent, call me and I will answer if I
                      can.&rdquo; This manages the client&rsquo;s expectation without committing you
                      to instant responses while you are elbow-deep in a consumer unit.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The <strong>9pm Saturday call</strong> is the classic boundary test. A client calls
                on Saturday evening about a non-urgent matter &mdash; perhaps they want to discuss
                adding a socket to the job you are starting on Monday. How you handle this moment
                sets the tone for the entire relationship.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Handling the 9pm Saturday Call</p>
                </div>
                <p className="text-sm text-white">
                  Let it go to voicemail. Then, on Monday morning (or Sunday evening if you prefer
                  to be proactive), send a text: &ldquo;Hi [Name], I saw you called on Saturday
                  evening. I will give you a ring first thing Monday to discuss &mdash; is there
                  anything urgent in the meantime?&rdquo; This response is professional, responsive,
                  and boundary-maintaining. It tells the client that you received their message
                  (they are not being ignored), that you will deal with it promptly within your
                  working hours, and that you are available for genuine emergencies. If you answer
                  the 9pm Saturday call and spend 20 minutes discussing socket positions, you have
                  established a precedent that you are available at 9pm on Saturday &mdash; and you
                  will get that call every Saturday for the duration of the project.
                </p>
              </div>

              <p>
                Being <strong>professional without being rigid</strong> is the balance to strike.
                Genuine emergencies (a loss of power, a burning smell, a safety concern) warrant an
                immediate response regardless of the time. Non-urgent queries can wait until working
                hours. The client should know the difference, and the clearest way to communicate
                this is to tell them: &ldquo;If it is a genuine emergency &mdash; safety issue, loss
                of supply, or anything dangerous &mdash; call me any time. For everything else, I
                will pick up messages during working hours.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> Managing client expectations
                  is the single most effective dispute prevention strategy. Most complaints arise
                  not from bad work, but from a gap between expectation and reality. By proactively
                  setting expectations at every stage of the customer journey, under-promising and
                  over-delivering, communicating frequently, and maintaining professional
                  boundaries, you create consistently positive client experiences that generate
                  repeat business, referrals, and a reputation for excellence.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Concepts to Remember</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Satisfaction = reality minus expectation</strong> &mdash; the gap
                      between what is expected and what is delivered determines satisfaction, not
                      the absolute quality of the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Set expectations at every stage</strong> &mdash; first contact,
                      survey, quote, pre-start, during work, completion, and aftercare
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Under-promise, over-deliver</strong> &mdash; quote realistic (not
                      optimistic) timelines and let your efficiency create positive surprises
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Proactive communication</strong> &mdash; daily end-of-day texts for
                      domestic, weekly reports for commercial; eliminate the &ldquo;no news is bad
                      news&rdquo; perception
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Professional boundaries</strong> &mdash; working hours, contact
                      method, and response time, set proactively and reinforced consistently
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The 9pm Saturday test</strong> &mdash; let it go to voicemail, respond
                      promptly during working hours, maintain the boundary while showing
                      responsiveness
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                This concludes Module 3: Resolving Client Disputes. You now have a comprehensive
                toolkit for dealing with the most common client-facing challenges in the electrical
                trade &mdash; from non-payment and scope creep to complaint handling and expectation
                management. In Module 4, we will shift focus to workplace conflicts with colleagues,
                supervisors, and other trades on site.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">A Note on Practice:</strong> The strategies in
                  this module are only effective if you actually use them. Start small: on your next
                  job, try sending a daily end-of-day progress text. On your next quote, include
                  explicit exclusions. On your next &ldquo;while you&rsquo;re here&rdquo; request,
                  try one of the variation conversation scripts. Each small change builds into a
                  fundamentally different client experience &mdash; and a fundamentally different
                  level of professional satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-rose-400 mb-2">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-4">
              Module 4
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
