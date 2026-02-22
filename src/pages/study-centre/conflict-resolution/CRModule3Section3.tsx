import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Heart,
  Camera,
  Scale,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cr-3-3-check1',
    question:
      'According to the service recovery paradox (Tax & Brown, 1998), what can a well-handled complaint create?',
    options: [
      'Guaranteed repeat business for the next five years',
      'A legal obligation for the client to leave a positive review',
      'More loyalty than if the problem had never occurred in the first place',
      'An automatic exemption from future complaints by the same client',
    ],
    correctIndex: 2,
    explanation:
      'The service recovery paradox, identified by Tax and Brown in their 1998 research, demonstrates that a well-handled complaint can create more loyalty than if the problem had never occurred. When a client experiences an issue and the response is swift, empathetic, and effective, they form a stronger positive impression of the business than clients who never had a problem at all. This happens because the complaint recovery process demonstrates the character and values of the business in a way that routine good service cannot. It is a powerful incentive to treat every complaint as an opportunity rather than a threat.',
  },
  {
    id: 'cr-3-3-check2',
    question: 'What does the "H" in the HEARD framework stand for?',
    options: [
      'Handle the situation immediately',
      'Hear them out fully without interrupting',
      'Highlight the terms and conditions that apply',
      'Hope the complaint resolves itself naturally',
    ],
    correctIndex: 1,
    explanation:
      'The "H" in the HEARD framework stands for "Hear them out" — meaning you listen fully to the client\'s complaint without interrupting, defending yourself, or offering solutions prematurely. This is the most important step because the client needs to feel genuinely heard before they are ready to engage with solutions. Research consistently shows that clients who feel their complaint was listened to are significantly more likely to accept the proposed resolution, even if it is not everything they wanted. Interrupting or becoming defensive at this stage almost always escalates the situation.',
  },
  {
    id: 'cr-3-3-check3',
    question:
      "Under the Consumer Rights Act 2015, what is the consumer's first remedy when a service has not been provided with reasonable care and skill?",
    options: [
      'A full refund of the entire contract price',
      'The right to have the work redone (repair/repeat performance)',
      'Automatic compensation of 50% of the contract value',
      'The right to hire another contractor and charge you the difference',
    ],
    correctIndex: 1,
    explanation:
      'Under the Consumer Rights Act 2015, the consumer\'s first remedy when a service has not been provided with reasonable care and skill is the right to have the work redone — known as "repeat performance" or the right to repair. This means the trader must redo the work to bring it to the required standard, at no additional cost, within a reasonable time, and without causing significant inconvenience. Only if the repair is impossible, or if the trader fails to complete the repair within a reasonable time, does the consumer then have the right to a price reduction. This tiered approach protects both the consumer and the tradesperson.',
  },
];

const faqs = [
  {
    question: 'Should I apologise even if the complaint is not my fault?',
    answer:
      'You can empathise without admitting fault. There is a critical difference between "I am sorry this happened" (empathy) and "I am sorry I did it wrong" (admission). Empathy statements like "I can see why that is frustrating" or "I understand this is not what you expected" acknowledge the client\'s experience without accepting liability. In many cases, the client\'s frustration is valid even when your work is technically correct — they may not have understood what to expect, or the issue may have been caused by another trade. Showing empathy costs nothing and often defuses the situation immediately. If the complaint does turn out to be your fault, then a genuine apology with a commitment to put it right is the fastest path to resolution.',
  },
  {
    question: 'What if a client is being abusive when making a complaint?',
    answer:
      'You are not obliged to accept abusive behaviour. There is a clear line between a client who is angry and frustrated (understandable, even if uncomfortable) and a client who is being personally abusive, threatening, or aggressive. If a client crosses that line, it is appropriate to calmly say, "I want to resolve this for you, but I am not able to have a productive conversation while being spoken to this way. Let us take a break and I will call you back in an hour when we have both had time to think." If the abuse continues, or if there are threats of violence, disengage entirely and communicate only in writing. Document everything. In extreme cases, you may need to involve the police. No amount of money is worth tolerating abuse.',
  },
  {
    question: 'How do I distinguish a genuine complaint from an attempt to avoid paying?',
    answer:
      'Timing and specificity are the two key indicators. Genuine complaints tend to be specific ("the socket in the bedroom does not work" or "the light flickers when I turn on the kettle") and are raised promptly when the issue is discovered. Payment avoidance complaints tend to be vague ("I am not happy with the quality of work"), arise suspiciously close to when payment is due, and escalate when payment is requested. Ask for specifics: "Can you tell me exactly what the issue is so I can investigate?" A genuine complainant will provide detail. Someone using the complaint as a payment avoidance tactic will often struggle to articulate the actual problem. Document everything, investigate the specific complaint on its merits, and invoice for the undisputed portion separately.',
  },
  {
    question: 'When should I involve my insurance?',
    answer:
      'You should notify your insurance in any situation where there is potential financial liability beyond a straightforward snag or minor correction. Specifically: if the client is alleging property damage caused by your work (public liability), if the client is claiming financial loss because of faulty design or advice you gave (professional indemnity), if the complaint involves personal injury, or if the client has engaged a solicitor or threatens legal action. It is better to notify your insurer too early than too late — most policies have a condition that you must notify them "as soon as reasonably practicable" after becoming aware of a potential claim. Failing to notify promptly can void your coverage. Your insurer will advise you on whether to admit fault, what to say, and how to proceed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the service recovery paradox?',
    options: [
      'The tendency for clients to complain more when service is actually excellent',
      'The finding that a well-handled complaint can create more loyalty than if the problem never occurred',
      'The principle that offering a discount prevents all future complaints',
      'The observation that complaints always increase during busy periods',
    ],
    correctAnswer: 1,
    explanation:
      'The service recovery paradox, identified by Tax and Brown (1998), is the finding that a well-handled complaint can actually create more customer loyalty than if the problem had never occurred in the first place. This happens because effective complaint handling demonstrates the character, values, and commitment of the business in a way that routine good service cannot. The client thinks, "Something went wrong, but they handled it brilliantly — I can trust them." This is why complaints should be viewed as opportunities to strengthen relationships, not just problems to be solved.',
  },
  {
    id: 2,
    question: 'What is the correct order of the HEARD framework?',
    options: [
      'Handle, Evaluate, Act, Resolve, Document',
      'Hear them out, Empathise, Apologise (where appropriate), Resolve, Do follow up',
      'Help, Explain, Accept, Redirect, Dismiss',
      'Hear, Escalate, Assign, Review, Determine',
    ],
    correctAnswer: 1,
    explanation:
      'The correct order is: Hear them out (listen fully without interrupting), Empathise (show you understand their frustration), Apologise where appropriate (empathy without necessarily admitting fault), Resolve (propose a clear solution and agree next steps), and Do follow up (check back to confirm they are satisfied). The order matters because each step builds on the previous one. You cannot effectively empathise if you have not fully heard the complaint, and you cannot resolve if you have not demonstrated understanding first. Skipping to "resolve" without the preceding steps often leads to the client rejecting perfectly reasonable solutions.',
  },
  {
    id: 3,
    question:
      'Which of the following is a sign that a complaint might be a tactic to avoid payment rather than a genuine issue?',
    options: [
      'The complaint is specific and raised promptly after the issue was discovered',
      'The complaint is vague, raised just before payment is due, and escalates when payment is requested',
      'The client provides photographs documenting the alleged issue',
      'The client contacts you directly rather than going to social media',
    ],
    correctAnswer: 1,
    explanation:
      'Payment avoidance complaints tend to be vague ("I am not happy with the quality"), arise suspiciously close to when payment is due (rather than when the issue was discovered), and escalate when payment is requested. By contrast, genuine complaints are typically specific ("the socket in the kitchen does not work"), are raised promptly when the issue is noticed, and the client is willing to discuss the specific problem. However, it is important not to assume bad faith — always investigate the specific complaint on its merits before drawing conclusions. Document everything and invoice for the undisputed portion separately.',
  },
  {
    id: 4,
    question:
      'Under the Consumer Rights Act 2015, what must the trader do when performing a repair (repeat performance)?',
    options: [
      'Complete the repair within 24 hours',
      'Provide a cash refund instead if the client prefers',
      'Complete the repair at no extra cost, within a reasonable time, and without significant inconvenience',
      'Pay for an independent inspector to verify the repair',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Consumer Rights Act 2015, when a service has not been provided with reasonable care and skill, the trader must perform the repair (repeat performance) at no additional cost to the consumer, within a reasonable time, and without causing significant inconvenience. What constitutes "reasonable time" depends on the nature of the work — rewiring a room might reasonably take a few days to schedule, but an unsafe socket should be addressed urgently. The key point is that the consumer should not be worse off because of the need for a repair. Only if the repair is impossible or fails can the consumer then claim a price reduction.',
  },
  {
    id: 5,
    question: 'What is the difference between empathy and admission of fault?',
    options: [
      'There is no difference — any expression of understanding implies fault',
      "Empathy acknowledges the client's experience; admission of fault accepts responsibility for causing it",
      'Empathy is a legal defence; admission of fault is a criminal offence',
      'Empathy requires a written statement; admission of fault can be verbal',
    ],
    correctAnswer: 1,
    explanation:
      'Empathy and admission of fault are fundamentally different. Empathy acknowledges the client\'s experience and feelings: "I can see why that is frustrating" or "I understand this is not what you expected." These statements validate the client\'s emotional state without accepting responsibility. Admission of fault accepts responsibility for causing the problem: "I did that incorrectly" or "That was my mistake." In complaint handling, leading with empathy is almost always appropriate, whereas admitting fault should only happen when you have investigated and confirmed that the issue was genuinely your error. Premature admission of fault can have insurance and liability implications.',
  },
  {
    id: 6,
    question:
      'An electrician receives a complaint that a newly installed light fitting is flickering. What should they do first according to the HEARD framework?',
    options: [
      'Immediately return to site to fix the problem',
      'Ask the client to send a video of the flickering as evidence',
      'Hear the client out fully — listen to their description of the problem, when it started, and how it affects them',
      'Explain that flickering is normal for the first few days with LED fittings',
    ],
    correctAnswer: 2,
    explanation:
      'According to the HEARD framework, the first step is always to "Hear them out" — listen fully to the client\'s complaint without interrupting, defending, or jumping to solutions. Let them describe the problem, when they first noticed it, how often it happens, and how it is affecting them. This serves multiple purposes: it gives you the information you need to diagnose the issue, it shows the client you take their complaint seriously, and it allows the client to express their frustration. Only after fully listening should you move to empathise, investigate, and resolve. Jumping straight to a solution (or an excuse) without listening first often makes the situation worse.',
  },
  {
    id: 7,
    question: 'When should you notify your insurance company about a complaint?',
    options: [
      'Only when the client has issued court proceedings',
      'Only when the complaint involves personal injury',
      'As soon as reasonably practicable after becoming aware of any potential claim involving property damage, financial loss, or legal threats',
      'You should never notify your insurer about a complaint — it will increase your premium',
    ],
    correctAnswer: 2,
    explanation:
      'You should notify your insurance company as soon as reasonably practicable after becoming aware of any potential claim. This includes allegations of property damage (public liability), claims of financial loss from faulty advice or design (professional indemnity), personal injury claims, or any situation where the client has engaged a solicitor or threatened legal action. Most insurance policies contain a condition requiring prompt notification, and failing to notify in time can void your coverage entirely. Notifying your insurer does not automatically mean a claim will be made or that your premium will increase — it simply puts them on notice so they can advise you on how to proceed.',
  },
  {
    id: 8,
    question: 'Why is following up after resolving a complaint (the "D" in HEARD) important?',
    options: [
      'It is a legal requirement under the Consumer Rights Act 2015',
      'It provides evidence for your insurance company',
      'It confirms the client is satisfied, demonstrates ongoing commitment, and completes the service recovery process to build loyalty',
      'It prevents the client from changing their mind about the resolution',
    ],
    correctAnswer: 2,
    explanation:
      'Following up after resolving a complaint is important because it confirms the client is satisfied with the resolution, demonstrates that you genuinely care about their experience (not just about closing the complaint), and completes the service recovery process that builds long-term loyalty. A simple text or call a few days later — "Hi [Name], just checking the [issue] is all sorted now. Any problems at all, just let me know" — takes 30 seconds but has a disproportionate impact on client perception. It transforms a complaint experience into a relationship-building moment, which is exactly what the service recovery paradox predicts.',
  },
];

export default function CRModule3Section3() {
  useSEO({
    title: 'Complaint Handling & Service Recovery | Conflict Resolution Module 3.3',
    description:
      'The service recovery paradox, the HEARD framework, legitimate vs unreasonable complaints, documentation and evidence, and Consumer Rights Act 2015 remedies.',
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
            <ShieldAlert className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Complaint Handling &amp; Service Recovery
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Turning complaints into opportunities using the HEARD framework, distinguishing genuine
            issues from payment avoidance, and understanding your legal obligations and protections
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Paradox:</strong> A well-handled complaint creates more loyalty than no
                problem at all
              </li>
              <li>
                <strong>Framework:</strong> HEARD &mdash; Hear, Empathise, Apologise, Resolve, Do
                follow up
              </li>
              <li>
                <strong>Law:</strong> CRA 2015 gives consumers the right to repair, then price
                reduction
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Reputation:</strong> How you handle complaints defines your professional
                reputation
              </li>
              <li>
                <strong>Retention:</strong> Clients who complain and are heard are more loyal than
                silent ones
              </li>
              <li>
                <strong>Protection:</strong> Proper documentation and process protects you legally
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the service recovery paradox and why complaints are opportunities, not threats',
              'Apply the HEARD framework step by step to real-world complaint scenarios',
              'Distinguish between legitimate complaints and attempts to avoid payment',
              'Describe the importance of documentation and evidence in complaint resolution',
              'Explain the Consumer Rights Act 2015 remedies for services not provided with reasonable care and skill',
              'Identify when to involve insurance and how to notify your insurer correctly',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Service Recovery Paradox */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Service Recovery Paradox
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Most tradespeople dread complaints. The phone rings, you see the client&rsquo;s
                name, and your stomach drops. But research by <strong>Tax and Brown (1998)</strong>{' '}
                reveals something counterintuitive: a well-handled complaint can actually create{' '}
                <strong>more loyalty</strong> than if the problem had never occurred in the first
                place. This finding, known as the <strong>service recovery paradox</strong>, has
                been replicated across industries and is one of the most powerful concepts in
                customer service research.
              </p>

              <p>
                The paradox works because complaint handling reveals character. When everything goes
                smoothly, a client never learns how you respond under pressure, how you handle
                adversity, or whether you take responsibility when things go wrong. When a problem
                occurs and you handle it superbly &mdash; quickly, empathetically, and effectively
                &mdash; the client learns something profound about your values. They think,
                &ldquo;Something went wrong, but they owned it and fixed it brilliantly. I can trust
                them.&rdquo; That trust, forged under pressure, is stronger than trust built during
                smooth sailing.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Core Principle:</strong> Every complaint is an
                  opportunity in disguise. The client who complains is giving you the chance to
                  demonstrate your professionalism, your values, and your commitment to their
                  satisfaction. The truly dangerous clients are not the ones who complain &mdash;
                  they are the ones who say nothing, leave unhappy, and tell everyone they know
                  about their negative experience without ever giving you the chance to fix it.
                </p>
              </div>

              <p>
                The ACAS approach to complaint handling &mdash; listen, acknowledge, investigate,
                respond, follow up &mdash; provides a solid foundation, but for construction and
                trades environments, the HEARD framework offers a more practical, memorable
                structure that works in real-time conversations on site, over the phone, or via
                email. We will explore HEARD in detail in the next section.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Construction Reality Check</p>
                </div>
                <p className="text-sm text-white">
                  In the electrical trade, the stakes of complaint handling are particularly high. A
                  complaint about a faulty socket is not the same as a complaint about a cold cup of
                  coffee &mdash; there are safety implications, regulatory requirements, and
                  certification responsibilities. This means you need to take every complaint
                  seriously, investigate it thoroughly, and resolve it promptly. But it also means
                  that when you handle it well, the impact on the client&rsquo;s trust is
                  proportionally greater. A client who sees you take a safety concern seriously,
                  investigate it immediately, and resolve it with care will become one of your
                  strongest advocates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The HEARD Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The HEARD Framework
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HEARD framework is a five-step complaint handling process designed to be
                practical, memorable, and effective in real-time conversations. Originally
                popularised in the hospitality industry and adapted for construction and trades, it
                works because it follows the natural emotional arc of a complaint: the client needs
                to feel heard before they are ready to engage with solutions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The HEARD Framework</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      H
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Hear Them Out</p>
                      <p className="text-sm text-white">
                        Listen fully to the complaint without interrupting, defending yourself, or
                        offering premature solutions. Let the client describe the problem
                        completely. Use open body language, maintain eye contact, and resist the
                        urge to explain or justify. This is the hardest step for most tradespeople
                        because the natural instinct when criticised is to defend your work. But the
                        client needs to feel heard first. If you interrupt or become defensive, they
                        will escalate.
                      </p>
                      <div className="mt-2 bg-white/5 border border-white/10 p-2 rounded">
                        <p className="text-xs text-white">
                          <strong className="text-rose-400">On site:</strong> A client calls to say
                          the new sockets in the kitchen are not level. Your immediate instinct is
                          to say &ldquo;They are level &mdash; I checked with a spirit level.&rdquo;
                          Instead, listen: &ldquo;Tell me exactly what you are seeing.&rdquo; It
                          turns out the worktop is not level, making the sockets above it look
                          crooked. By listening first, you understand the real issue.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      E
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Empathise</p>
                      <p className="text-sm text-white">
                        Show that you understand their frustration. This does not mean agreeing that
                        you did something wrong &mdash; it means acknowledging their emotional
                        experience. &ldquo;I can see why that is frustrating&rdquo; or &ldquo;I
                        understand that is not what you expected&rdquo; are empathy statements, not
                        admissions of fault. Empathy diffuses anger because the client feels
                        validated. Most people escalate complaints not because the problem is
                        severe, but because they feel ignored or dismissed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      A
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Apologise (Where Appropriate)
                      </p>
                      <p className="text-sm text-white">
                        If the complaint is valid and the issue is your fault, apologise sincerely.
                        &ldquo;I am sorry that has happened &mdash; let me put it right for
                        you.&rdquo; If you are not sure whether the issue is your fault, empathise
                        without apologising: &ldquo;I want to look into this properly and make sure
                        we get it sorted.&rdquo; Never apologise for something that is not your
                        fault just to end the conversation &mdash; this can have insurance and
                        liability implications. But equally, do not withhold a genuine apology when
                        one is warranted.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      R
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Resolve</p>
                      <p className="text-sm text-white">
                        Propose a clear, specific solution and agree next steps. &ldquo;Here is what
                        I am going to do...&rdquo; followed by a concrete action plan with a
                        timeline. Where possible, give the client a choice between two acceptable
                        resolutions rather than dictating a single option. A choice gives them a
                        sense of control, which reduces feelings of powerlessness that fuel
                        complaints. Whatever you agree, put it in writing (even a text message) so
                        both parties have a record.
                      </p>
                      <div className="mt-2 bg-white/5 border border-white/10 p-2 rounded">
                        <p className="text-xs text-white">
                          <strong className="text-rose-400">On site:</strong> &ldquo;I can either
                          come back tomorrow morning to move the sockets to align with the worktop,
                          or I can adjust them on Saturday when the kitchen fitter has finished.
                          Which works better for you?&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      D
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Do Follow Up</p>
                      <p className="text-sm text-white">
                        After resolving the complaint, follow up to confirm the client is satisfied.
                        A quick text or call a few days later: &ldquo;Hi [Name], just checking the
                        sockets are all looking good now. Any problems at all, just let me
                        know.&rdquo; This step is where the service recovery paradox activates. The
                        follow-up demonstrates that you genuinely care about their experience beyond
                        just closing the complaint. It transforms a negative experience into a
                        relationship-building moment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Legitimate vs Unreasonable Complaints */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Legitimate vs Unreasonable Complaints
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all complaints are equal. While most complaints are genuine and deserve a
                thorough, empathetic response, some are unreasonable or are being used strategically
                to avoid payment, negotiate a discount, or obtain free additional work. Learning to
                distinguish between these categories is essential for protecting your business while
                still providing excellent service to genuine complainants.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-green-400 mb-2">Genuine Complaints</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Specific: &ldquo;The socket in the bedroom does not work&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Raised promptly when the issue is discovered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Client is willing to discuss and work towards a resolution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Relates to the actual work you performed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Client has given you the opportunity to put it right</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-red-400 mb-2">
                    Warning Signs of Payment Avoidance
                  </p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Vague: &ldquo;I am not happy with the quality&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Raised suspiciously close to payment due date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Escalates when payment is requested</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Includes demands for unrelated &ldquo;fixes&rdquo; or discounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Client refuses to let you inspect or remedy the alleged issue</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The key principle when handling any complaint &mdash; whether you suspect it is
                genuine or not &mdash; is to{' '}
                <strong>take responsibility without accepting liability</strong>. Taking
                responsibility means saying, &ldquo;I take this seriously and I want to investigate
                it properly.&rdquo; Accepting liability means saying, &ldquo;That was my fault and I
                will pay for the damage.&rdquo; The former is always appropriate; the latter should
                only happen after a thorough investigation confirms the issue was genuinely your
                error.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Handling Suspected Payment Avoidance
                  </p>
                </div>
                <p className="text-sm text-white">
                  If you suspect a complaint is being used to avoid payment, ask for specifics:
                  &ldquo;Can you tell me exactly what the issue is so I can investigate?&rdquo;
                  Offer to attend site to inspect: &ldquo;I would like to come and look at this
                  properly.&rdquo; Document everything. Invoice for the undisputed portion
                  separately. If the client has a genuine issue, these steps will identify and
                  resolve it. If the complaint is a tactic, the request for specifics and the offer
                  to inspect will often cause the complaint to dissolve because the client cannot
                  point to a concrete problem. Whatever happens, maintain your professionalism
                  throughout &mdash; never accuse a client of lying, even if you are certain that is
                  what is happening.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Documentation and Evidence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Documentation and Evidence
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In any dispute, the party with the best documentation wins. This is true whether the
                dispute is resolved through a conversation, mediation, or court proceedings. As an
                electrician, your documentation serves as both your shield (proving your work was
                competent) and your sword (demonstrating the client agreed to the scope and cost).
                Building good documentation habits now protects you from every complaint you will
                ever receive.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Documentation Checklist for Every Job
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Photographs before work starts</strong> &mdash; document existing
                      conditions, existing faults, and the state of the property before you begin.
                      Time-stamped photographs are powerful evidence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Photographs during work</strong> &mdash; first fix, cable routes,
                      containment, anything that will be hidden behind plasterboard or under floors.
                      These are irreplaceable evidence of compliance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Photographs after completion</strong> &mdash; the finished work,
                      consumer unit, labelling, and any areas of concern.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Test results</strong> &mdash; all test sheets, certificates, and minor
                      works certificates. These prove your work met the required standard at the
                      point of completion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Written correspondence</strong> &mdash; save all emails, text
                      messages, and WhatsApp conversations with the client. These form a
                      contemporaneous record of what was discussed and agreed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Variation confirmations</strong> &mdash; written confirmation of every
                      change to the original scope and cost, as discussed in Section 2.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The habit of photographing your work takes minutes per job but can save you hours
                &mdash; or thousands of pounds &mdash; in a dispute. A client who claims your wiring
                was sub-standard is instantly refuted by time-stamped photographs showing neat,
                compliant cable routes and properly terminated connections. A client who claims
                damage was caused by your work is refuted by &ldquo;before&rdquo; photographs
                showing the damage already existed. The phone in your pocket is the most powerful
                evidence-gathering tool you own. Use it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Key Evidence Principle</p>
                </div>
                <p className="text-sm text-white">
                  Always document at the time, not after the complaint. Evidence created
                  <em> before</em> a dispute arises is vastly more credible than evidence created
                  <em> after</em> the complaint has been raised. A judge will give much more weight
                  to a time-stamped photograph taken on the day of installation than to a
                  retrospective statement written after a dispute has started. Build documentation
                  into your daily routine so it happens automatically, not as a reaction to
                  problems.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Consumer Rights Act 2015 Remedies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Consumer Rights Act 2015 Remedies
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a genuine complaint relates to the quality of your work, the{' '}
                <strong>Consumer Rights Act 2015</strong> sets out the remedies available to the
                consumer. Understanding these remedies is important for two reasons: it helps you
                respond appropriately when a complaint is valid, and it protects you from
                unreasonable demands that go beyond what the law requires.
              </p>

              <p>
                Under the CRA 2015, when a service has not been performed with reasonable care and
                skill, the consumer&rsquo;s remedies follow a <strong>tiered structure</strong>. The
                first remedy is the <strong>right to repair</strong> (also called repeat
                performance). This means the trader must redo or correct the work to bring it to the
                required standard. The repair must be done at no additional cost to the consumer,
                within a reasonable time, and without causing significant inconvenience.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    CRA 2015 Remedy Tiers for Services
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Right to Repair (Repeat Performance)
                      </p>
                      <p className="text-sm text-white">
                        The trader corrects the work at no extra cost, within a reasonable time, and
                        without significant inconvenience. This is the first and preferred remedy.
                        For electricians, this typically means returning to site to fix the specific
                        issue identified.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Right to Price Reduction</p>
                      <p className="text-sm text-white">
                        Only available if the repair is impossible, or the trader fails to complete
                        the repair within a reasonable time, or completing the repair would cause
                        significant inconvenience. The price reduction must be an appropriate
                        amount, which could be up to 100% of the contract price in extreme cases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                This tiered structure protects you as a tradesperson because it gives you the
                opportunity to put things right before any financial remedy applies. A client cannot
                jump straight to demanding a refund without first allowing you the chance to repair.
                If a client refuses to let you repair the work, they lose their right to a price
                reduction &mdash; they have not followed the statutory remedy pathway.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">When to Involve Insurance</p>
                </div>
                <p className="text-sm text-white mb-3">
                  You should notify your insurance company in any of the following situations:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Property damage</strong> &mdash; the client alleges your work caused
                      damage to their property (public liability)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Financial loss</strong> &mdash; the client claims financial loss from
                      faulty design or advice you provided (professional indemnity)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Personal injury</strong> &mdash; any allegation that your work caused
                      injury to a person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Legal threats</strong> &mdash; the client has engaged a solicitor or
                      threatened court proceedings
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Notify your insurer as soon as reasonably practicable. Most policies require
                  prompt notification, and failing to notify in time can void your coverage
                  entirely. Your insurer will advise you on whether to admit fault, what to
                  communicate to the client, and how to proceed.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                  <strong className="text-rose-400">Summary:</strong> Complaints are opportunities,
                  not threats. The service recovery paradox shows that well-handled complaints build
                  stronger loyalty than perfect service. The HEARD framework gives you a reliable,
                  repeatable process for every complaint. Good documentation protects you in every
                  scenario. And understanding the CRA 2015 remedies ensures you respond
                  appropriately &mdash; neither over-compensating nor under-delivering.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Concepts to Remember</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Service recovery paradox</strong> &mdash; a well-handled complaint
                      creates more loyalty than no problem at all (Tax &amp; Brown, 1998)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>HEARD framework</strong> &mdash; Hear them out, Empathise, Apologise
                      where appropriate, Resolve, Do follow up
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Empathy vs admission</strong> &mdash; &ldquo;I understand your
                      frustration&rdquo; is not the same as &ldquo;I did it wrong&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Documentation</strong> &mdash; photograph before, during, and after;
                      save all correspondence; document at the time, not after the dispute
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CRA 2015 remedies</strong> &mdash; right to repair first, then price
                      reduction only if repair fails or is impossible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Insurance</strong> &mdash; notify promptly for property damage,
                      financial loss, personal injury, or legal threats
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the final section of this module, we will explore managing client expectations
                &mdash; the proactive side of complaint prevention. You will learn how to set
                expectations at every stage of the customer journey, why under-promising and
                over-delivering works, and how to set professional boundaries that protect both your
                time and your relationships.
              </p>
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-3-section-4">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
