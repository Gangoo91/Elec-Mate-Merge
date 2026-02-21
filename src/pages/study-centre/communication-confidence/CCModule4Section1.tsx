import {
  ArrowLeft,
  Mail,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Clock,
  FileText,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'email-structure',
    question: 'What is the correct order for the five core elements of a professional email?',
    options: [
      'Body, subject, greeting, signature, close',
      'Subject, greeting, body, close, signature',
      'Greeting, subject, body, signature, close',
      'Subject, body, greeting, close, signature',
    ],
    correctIndex: 1,
    explanation:
      'The five core elements in order are: subject line (so the recipient knows the topic before opening), greeting (professional salutation), body (your message), close (sign-off phrase), and signature (your name, role and contact details). Getting this structure right every time ensures your emails are easy to read and act on.',
  },
  {
    id: 'email-tone',
    question:
      'You need to chase a supplier who has missed a delivery date twice. Which approach is most professional?',
    options: [
      'Send a strongly worded email demanding immediate delivery',
      'Copy in the supplier\u2019s managing director to escalate pressure',
      'State the facts, reference the agreed dates, and request a confirmed delivery date',
      'Stop emailing and phone them instead every hour',
    ],
    correctIndex: 2,
    explanation:
      'Professional email communication relies on factual, measured language. Stating the facts (the agreed dates and the missed deliveries) and requesting a specific action (a confirmed new date) is firm but professional. Emotional language, unnecessary escalation, or harassment will damage the working relationship and may breach professional conduct standards.',
  },
  {
    id: 'email-24hour',
    question: 'What is the 24-hour rule for emails?',
    options: [
      'You must reply to all emails within 24 hours',
      'If you feel angry or frustrated, wait 24 hours before sending the email',
      'Emails should be no longer than content that takes 24 seconds to read',
      'You should check your email every 24 minutes during working hours',
    ],
    correctIndex: 1,
    explanation:
      'The 24-hour rule means that if you are writing an email while feeling angry, frustrated or upset, you should save it as a draft and wait at least 24 hours before sending. This cooling-off period allows your emotional state to settle, giving you the chance to revise the email with a clearer head. Emails sent in the heat of the moment often cause more problems than the original issue.',
  },
];

const faqs = [
  {
    question: 'How formal should my emails be to other tradespeople?',
    answer:
      'Match the formality to the relationship and context. A first email to a new subcontractor or client should be fully formal: proper greeting, full sentences, professional close. Once you have an established working relationship, you can relax slightly \u2014 but never to the point of text-speak, slang or missing punctuation. Even casual professional emails should be clear, correctly spelled and free of ambiguity. Remember that any email could be forwarded, printed or used as evidence in a dispute \u2014 write every email as if it might be read by someone you have never met.',
  },
  {
    question: 'Should I use Reply All on site emails?',
    answer:
      'Only use Reply All when every person on the original email genuinely needs to see your response. The test is simple: if your reply contains information that is relevant to all recipients, use Reply All. If it is only relevant to the sender or a subset of recipients, reply only to them. On construction projects, unnecessary Reply All messages clog inboxes and cause important information to be missed. A good rule is to default to Reply (to sender only) and consciously choose Reply All only when you have a clear reason. If you are unsure, reply to the sender only \u2014 they can always forward your response if needed.',
  },
  {
    question: 'What should I do if I send an email to the wrong person?',
    answer:
      'Act immediately. If you realise within seconds, some email clients have an "undo send" feature (Gmail offers a 30-second window). If the email has already been delivered, send a follow-up to the unintended recipient asking them to disregard and delete the message. If the email contained sensitive information (pricing, personal data, commercial details), you must also notify your line manager or the relevant data controller, as this may constitute a data breach under GDPR. Then send the correct email to the intended recipient. Do not try to pretend it did not happen \u2014 transparency is always better than cover-up.',
  },
  {
    question: 'Is it acceptable to use emojis in professional construction emails?',
    answer:
      'In formal professional emails \u2014 to clients, main contractors, building control or certification bodies \u2014 no. Emojis can be misinterpreted, appear unprofessional, and may not display correctly across all email clients. In informal internal communication with close colleagues (such as a quick team message), a thumbs-up or similar is generally acceptable, but even then, keep it minimal. The safest approach is to express tone through your words rather than symbols. If you need to convey friendliness, use warm but professional language: "Thanks for getting back to me so quickly" achieves more than a smiley face.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is the most effective email subject line for a construction project?',
    options: [
      'Quick question',
      'URGENT!!!',
      'Elm Grove Phase 2 \u2014 Second fix electrical start date confirmation',
      'Hello',
    ],
    correctAnswer: 2,
    explanation:
      'An effective subject line identifies the project and the specific topic clearly. "Elm Grove Phase 2 \u2014 Second fix electrical start date confirmation" tells the recipient exactly what the email is about before they open it. Vague subject lines like "Quick question" or "Hello" provide no information, and excessive punctuation like "URGENT!!!" is unprofessional and often ignored.',
  },
  {
    id: 2,
    question: 'When writing a professional email body, which structure is recommended?',
    options: [
      'One long paragraph covering all points',
      'Context first, then the request or action needed, then next steps',
      'Start with the request, then provide context afterwards',
      'Use bullet points only with no introductory text',
    ],
    correctAnswer: 1,
    explanation:
      'The recommended structure is: brief context (what this is about and why you are writing), then the specific request or action needed, then clear next steps or a deadline. This pattern ensures the reader understands the background before encountering your request, making it far more likely they will respond appropriately. One long paragraph is hard to scan, and bullet points without context leave the reader guessing.',
  },
  {
    id: 3,
    question: 'You receive an email from a client that makes you angry. What should you do?',
    options: [
      'Reply immediately while your points are fresh in your mind',
      'Forward it to colleagues with a sarcastic comment',
      'Save a draft reply, wait 24 hours, then revise and send',
      'Ignore the email entirely and hope the issue goes away',
    ],
    correctAnswer: 2,
    explanation:
      'The 24-hour rule exists precisely for this situation. Replying while angry almost always escalates the conflict and creates a written record of unprofessional communication. Forwarding with sarcasm is both unprofessional and risky \u2014 emails are easily forwarded further. Ignoring the email is avoidance, not resolution. Drafting, waiting, and revising allows you to respond firmly and professionally once your emotional state has settled.',
  },
  {
    id: 4,
    question: 'Which of the following is an appropriate professional email sign-off?',
    options: ['Cheers mate', 'Kind regards', 'Sent from my iPhone', 'Thx'],
    correctAnswer: 1,
    explanation:
      '"Kind regards" is a widely accepted professional sign-off that is appropriate for virtually all business correspondence. "Cheers mate" is too informal for professional communication. "Sent from my iPhone" is an auto-generated tag, not a sign-off. "Thx" is text-speak and looks unprofessional. Other acceptable options include "Best regards", "Regards", and "Many thanks".',
  },
  {
    id: 5,
    question: 'When should you NOT use email as your communication method?',
    options: [
      'When confirming agreed dates and actions in writing',
      'When the matter is genuinely urgent and needs an immediate response',
      'When you need a written record of a decision',
      'When sending technical documents or drawings',
    ],
    correctAnswer: 1,
    explanation:
      'Email is not suitable for genuinely urgent communication because there is no guarantee the recipient will read it in time. For urgent matters \u2014 such as a safety issue, an imminent delivery, or a time-critical decision \u2014 phone the person directly. Email is excellent for written records, confirmations and document sharing, but it should never be relied upon when an immediate response is essential.',
  },
  {
    id: 6,
    question: 'What is email chain management?',
    options: [
      'Forwarding every email to your entire contact list',
      'Keeping email threads organised, trimming irrelevant history, and starting new threads for new topics',
      'Never deleting any emails so you have a complete record',
      'Using the same email thread for all communication with one person',
    ],
    correctAnswer: 1,
    explanation:
      'Email chain management means keeping threads organised and purposeful. This includes starting new threads when the topic changes (rather than hijacking an existing thread), trimming long and irrelevant email history before forwarding, and ensuring the subject line still accurately reflects the content. Poor chain management leads to important information being buried in long, meandering threads that nobody reads properly.',
  },
  {
    id: 7,
    question:
      'You need to notify a main contractor of a two-day delay to your programme. What information should your email include?',
    options: [
      'Just an apology and a promise to catch up',
      'The reason for the delay, the revised completion date, any impact on other trades, and proposed mitigation',
      'A detailed explanation of why it is not your fault',
      'A request for a meeting to discuss the situation in person',
    ],
    correctAnswer: 1,
    explanation:
      'A professional delay notification should include: the specific reason for the delay (factual, not emotional), the revised completion date, any impact on other trades or the overall programme, and what you are doing to mitigate the impact. This demonstrates professionalism, accountability and proactive problem-solving. Simply apologising provides no useful information, blaming others is defensive, and requesting a meeting when a clear email would suffice wastes everyone\u2019s time.',
  },
  {
    id: 8,
    question: 'Which of the following is the best practice for your email signature?',
    options: [
      'Just your first name',
      'Your full name, job title, company name, phone number and any relevant certifications',
      'A long inspirational quote followed by your name',
      'Your name with a row of emojis representing your trade',
    ],
    correctAnswer: 1,
    explanation:
      'A professional email signature should include your full name, job title or role, company name, a contact phone number, and any relevant certifications or registration numbers (such as NICEIC, NAPIT or ECS card details). This makes it easy for the recipient to identify you, understand your role, and contact you by other means if needed. Inspirational quotes and emojis are unprofessional in a business context.',
  },
];

export default function CCModule4Section1() {
  useSEO({
    title: 'Professional Email Essentials | CC Module 4.1',
    description:
      'Email structure, tone and formality spectrum, reply-all etiquette, email chain management, the 24-hour rule, and practical construction email templates for electricians.',
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
            <Link to="../cc-module-4">
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
            <Mail className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Professional Email Essentials
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Writing clear, professional emails that get results and protect you in construction
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Structure:</strong> Subject, greeting, body, close, signature &mdash; every
                time
              </li>
              <li>
                <strong>Tone:</strong> Match formality to recipient and context
              </li>
              <li>
                <strong>Reply All:</strong> Only when every recipient needs your response
              </li>
              <li>
                <strong>24-hour rule:</strong> Never send an angry email &mdash; draft, wait, revise
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Legal record:</strong> Emails are admissible evidence in disputes and
                adjudication
              </li>
              <li>
                <strong>Professional reputation:</strong> Poorly written emails damage credibility
                instantly
              </li>
              <li>
                <strong>Efficiency:</strong> Clear emails reduce follow-up calls, misunderstandings
                and delays
              </li>
              <li>
                <strong>Career progression:</strong> Written communication is essential for
                supervisory and management roles
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Structure a professional email using the five core elements: subject, greeting, body, close, signature',
              'Select the appropriate tone and formality level for different recipients and contexts',
              'Apply Reply All etiquette and manage email chains effectively on construction projects',
              'Use the 24-hour rule to prevent emotional emails from damaging professional relationships',
              'Identify when email is NOT the right communication channel and choose a better alternative',
              'Write professional emails for common construction scenarios: chasing materials, confirming site access, notifying of delays',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Five Core Elements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Five Core Elements of a Professional Email
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every professional email follows the same fundamental structure. Regardless of
                whether you are writing to a client, a main contractor, a supplier or a colleague,
                these five elements form the skeleton of your message. Master them, and every email
                you send will be clear, professional and easy to act on.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Subject Line</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The subject line is the single most important line you will write. It determines
                    whether your email is opened promptly, filed for later, or lost in a crowded
                    inbox. A good subject line tells the recipient exactly what the email is about
                    and, where relevant, which project it relates to.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white mb-2">
                      <strong className="text-rose-400">Good examples:</strong>
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li>
                        &bull; &ldquo;Elm Grove Phase 2 &mdash; Second fix start date
                        confirmation&rdquo;
                      </li>
                      <li>
                        &bull; &ldquo;Victoria Court &mdash; Cable tray delivery delay
                        notification&rdquo;
                      </li>
                      <li>
                        &bull; &ldquo;45 Beech Road &mdash; Consumer unit specification query&rdquo;
                      </li>
                    </ul>
                    <p className="text-xs text-white mt-2 mb-1">
                      <strong className="text-rose-400">Poor examples:</strong>
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li>
                        &bull; &ldquo;Quick question&rdquo; &mdash; gives the recipient no
                        information
                      </li>
                      <li>
                        &bull; &ldquo;URGENT!!!&rdquo; &mdash; unprofessional and often ignored
                      </li>
                      <li>&bull; &ldquo;Hi&rdquo; &mdash; meaningless as a subject line</li>
                      <li>
                        &bull; &ldquo;Re: Re: Re: Re: Monday&rdquo; &mdash; a hijacked thread with a
                        stale subject
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Greeting</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The greeting sets the tone for the entire email. It tells the recipient how you
                    view the relationship &mdash; formal, semi-formal or familiar &mdash; and
                    signals whether the email is official or conversational.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white mb-2">
                      <strong className="text-rose-400">Formality spectrum:</strong>
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li>
                        &bull; <strong>Formal:</strong> &ldquo;Dear Mr Thompson,&rdquo; /
                        &ldquo;Dear Ms Patel,&rdquo;
                      </li>
                      <li>
                        &bull; <strong>Semi-formal:</strong> &ldquo;Good morning, Sarah,&rdquo; /
                        &ldquo;Hello, David,&rdquo;
                      </li>
                      <li>
                        &bull; <strong>Familiar (established relationship):</strong> &ldquo;Hi
                        James,&rdquo; / &ldquo;Morning, Pete,&rdquo;
                      </li>
                    </ul>
                    <p className="text-xs text-white mt-2">
                      <strong className="text-rose-400">Rule of thumb:</strong> If in doubt, go one
                      level more formal than you think is necessary. You can always relax formality
                      as the relationship develops; it is very difficult to recover from being too
                      casual too early.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Body</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The body is where you deliver your message. The best professional emails follow
                    a simple three-part structure: <strong>context</strong> (what this is about and
                    why you are writing), <strong>content</strong> (the information, request or
                    update), and <strong>action</strong> (what you need the recipient to do and by
                    when).
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Keep it concise:</strong> Most construction
                      professionals receive dozens of emails daily. If your email requires scrolling
                      on a mobile phone, it is probably too long. Use short paragraphs (2&ndash;3
                      sentences maximum), bullet points for lists, and bold text for key dates,
                      figures or actions. If the message is genuinely complex, consider whether a
                      phone call or meeting would be more effective.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Close</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The close is your sign-off phrase. Like the greeting, it should match the
                    formality level of the email. A mismatched close &mdash; such as
                    &ldquo;Cheers&rdquo; at the end of a formal complaint &mdash; undermines the
                    entire message.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white mb-2">
                      <strong className="text-rose-400">Appropriate closes:</strong>
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li>
                        &bull; <strong>Formal:</strong> &ldquo;Yours sincerely,&rdquo; (if you used
                        their name) / &ldquo;Yours faithfully,&rdquo; (if you used &ldquo;Dear
                        Sir/Madam&rdquo;)
                      </li>
                      <li>
                        &bull; <strong>Semi-formal:</strong> &ldquo;Kind regards,&rdquo; /
                        &ldquo;Best regards,&rdquo;
                      </li>
                      <li>
                        &bull; <strong>Familiar:</strong> &ldquo;Many thanks,&rdquo; /
                        &ldquo;Thanks,&rdquo; / &ldquo;Regards,&rdquo;
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Signature</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Your email signature is your digital business card. It should appear
                    automatically at the bottom of every email you send and contain all the
                    information someone needs to identify you and contact you by other means.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white mb-2">
                      <strong className="text-rose-400">Recommended signature format:</strong>
                    </p>
                    <div className="text-xs text-white font-mono bg-white/5 p-2 rounded mt-1">
                      <p>John Smith</p>
                      <p>Electrical Supervisor &mdash; Smith Electrical Ltd</p>
                      <p>NICEIC Approved Contractor | ECS Gold Card</p>
                      <p>Tel: 07700 900123</p>
                      <p>Email: john@smithelectrical.co.uk</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> These five elements are
                  not optional &mdash; they are the minimum standard for any professional email. An
                  email missing a clear subject line, a proper greeting, or a signature looks
                  rushed, unprofessional and difficult to file. In construction, where emails often
                  form part of the contractual record, this matters more than in most industries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Tone and the Formality Spectrum */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Tone &amp; the Formality Spectrum
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Tone is not just about the words you choose &mdash; it is about how those words land
                with the reader. The same factual information can come across as professional,
                aggressive, passive-aggressive or dismissive depending on the tone. In written
                communication, you do not have facial expressions, body language or vocal tone to
                soften or clarify your meaning. The words on the screen are all the recipient has to
                judge your intent.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Formality Spectrum for Construction Emails
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Level 1 &mdash; Formal</p>
                    <p className="text-xs text-white mb-1">
                      <strong>Use for:</strong> New clients, building control, certification bodies,
                      legal correspondence, complaints, formal contract notices
                    </p>
                    <p className="text-xs text-white italic">
                      &ldquo;Dear Mr Hartley, I am writing to confirm the scheduled inspection date
                      for the above property. Please find the relevant documentation attached for
                      your review prior to the visit.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Level 2 &mdash; Semi-Formal
                    </p>
                    <p className="text-xs text-white mb-1">
                      <strong>Use for:</strong> Established client relationships, main contractors,
                      project managers, suppliers you work with regularly
                    </p>
                    <p className="text-xs text-white italic">
                      &ldquo;Good morning, Sarah. Just to confirm, we are planning to start second
                      fix on Monday 14th. Could you confirm site access will be available from
                      07:30? Many thanks.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Level 3 &mdash; Professional-Casual
                    </p>
                    <p className="text-xs text-white mb-1">
                      <strong>Use for:</strong> Close colleagues, team members, internal
                      communication within your own company
                    </p>
                    <p className="text-xs text-white italic">
                      &ldquo;Hi Dave, can you bring the Megger to site tomorrow? We need it for the
                      insulation resistance tests on Block B. Thanks.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The critical skill is{' '}
                <strong>matching your tone to your audience and context</strong>. Writing too
                formally to a close colleague can seem cold or distant. Writing too casually to a
                new client or a certification body can seem unprofessional and disrespectful. When
                in doubt, lean towards more formal &mdash; it is far easier to relax formality in
                subsequent emails than to recover from a first impression of being too casual.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Tone Pitfalls to Avoid</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>ALL CAPS:</strong> Reads as shouting. Never use all capitals for
                      emphasis &mdash; use bold text instead
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Passive-aggressive phrases:</strong> &ldquo;As per my previous
                      email&hellip;&rdquo; and &ldquo;As I have already stated&hellip;&rdquo; are
                      widely recognised as hostile. If you need to refer back, try &ldquo;To confirm
                      the details from my email on [date]&hellip;&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Sarcasm:</strong> Never translates well in writing. What feels witty
                      in your head reads as hostile on screen
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Excessive exclamation marks:</strong> One is occasionally acceptable.
                      Multiple exclamation marks look unprofessional and frantic
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Reply All Etiquette & Email Chain Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Reply All Etiquette &amp; Email Chain Management
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On construction projects, a single email thread can include the client, architect,
                project manager, structural engineer, multiple subcontractors and suppliers.
                Misusing Reply All on these threads is one of the most common sources of email
                frustration in the industry. It fills inboxes with irrelevant messages, causes
                important information to be missed, and can inadvertently share commercially
                sensitive information with people who should not see it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Reply All Decision Framework
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                      &#10003;
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Use Reply All when:</p>
                      <ul className="text-sm text-white space-y-1 mt-1">
                        <li>
                          &bull; Your response contains information all recipients need to see
                        </li>
                        <li>
                          &bull; You are confirming a date, action or decision that affects everyone
                          on the thread
                        </li>
                        <li>
                          &bull; You are raising a concern that impacts the whole project team
                        </li>
                        <li>
                          &bull; The original sender specifically asked for everyone&rsquo;s input
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      &#10007;
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Use Reply (to sender only) when:
                      </p>
                      <ul className="text-sm text-white space-y-1 mt-1">
                        <li>
                          &bull; Your response is only relevant to the person who sent the email
                        </li>
                        <li>&bull; You are asking a question that only the sender can answer</li>
                        <li>
                          &bull; Your reply contains commercially sensitive information (your rates,
                          availability, internal issues)
                        </li>
                        <li>
                          &bull; You are simply saying &ldquo;thanks&rdquo; or &ldquo;noted&rdquo;
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                <strong>Email chain management</strong> is equally important. On a busy construction
                project, email threads can grow to dozens of messages over weeks. Without proper
                management, critical information gets buried and decisions become impossible to
                trace.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Chain Management Best Practices
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Start a new thread when the topic changes.</strong> If a thread about
                      &ldquo;second fix programme&rdquo; evolves into a discussion about snagging,
                      start a new email with a new subject line. Do not hijack existing threads.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Trim irrelevant history before forwarding.</strong> When forwarding an
                      email thread to someone new, remove the parts they do not need to see. A
                      20-message chain where only the last two messages are relevant wastes the new
                      recipient&rsquo;s time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Update the subject line if the topic has drifted.</strong> If you are
                      replying to a thread whose subject no longer matches the content, update the
                      subject line to reflect the current discussion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Summarise at the top when threads get long.</strong> If a chain has
                      become extended, start your reply with a brief summary: &ldquo;To summarise
                      the agreed position: [key points].&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: When NOT to Email & The 24-Hour Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            When NOT to Email &amp; the 24-Hour Rule
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Email is an excellent tool for written records, confirmations and non-urgent
                communication. But it is not the right tool for everything. Knowing when{' '}
                <strong>not</strong> to use email is just as important as knowing how to write a
                good one.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Do NOT Use Email When:</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      The matter is genuinely urgent
                    </p>
                    <p className="text-xs text-white">
                      There is no guarantee when an email will be read. If a safety issue needs
                      immediate attention, a delivery is about to arrive at the wrong location, or a
                      decision must be made in the next hour &mdash; phone the person directly.
                      Follow up with an email for the written record afterwards.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      The conversation is emotionally charged
                    </p>
                    <p className="text-xs text-white">
                      Disputes, complaints and sensitive issues are almost always better handled
                      face to face or by phone first. Email strips out tone, body language and
                      nuance, making misunderstandings far more likely. Resolve the issue verbally,
                      then confirm the agreed outcome by email.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      You need a real-time discussion
                    </p>
                    <p className="text-xs text-white">
                      If the topic requires back-and-forth discussion, email is painfully slow and
                      inefficient. A five-minute phone call can resolve what would take ten emails
                      over three days. Use email for the follow-up confirmation, not the discussion
                      itself.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      You are delivering bad news to a person
                    </p>
                    <p className="text-xs text-white">
                      Redundancy, disciplinary issues, significant project problems &mdash; these
                      deserve the respect of a direct conversation. Delivering bad news by email
                      feels impersonal and cowardly, and it denies the recipient the opportunity to
                      ask questions and process their reaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The 24-Hour Rule</p>
                </div>
                <p className="text-sm text-white mb-3">
                  The 24-hour rule is one of the most valuable professional habits you can develop:
                  <strong>
                    {' '}
                    if you are writing an email while feeling angry, frustrated or upset, save it as
                    a draft and wait at least 24 hours before sending.
                  </strong>
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm text-white">
                      <strong>Write the email.</strong> Get your thoughts out. Say everything you
                      want to say. Do not hold back &mdash; this draft is for you, not the
                      recipient.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm text-white">
                      <strong>Save it as a draft.</strong> Do NOT send it. Close the email and walk
                      away.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm text-white">
                      <strong>Wait 24 hours.</strong> Sleep on it. Your emotional state will be very
                      different tomorrow.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm text-white">
                      <strong>Revise with a clear head.</strong> Re-read the draft. Keep the valid
                      points. Remove the emotional language. Rewrite it so it is firm, factual and
                      professional.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm text-white">
                      <strong>Send the revised version.</strong> This email represents the
                      professional you &mdash; not the frustrated you.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  <strong className="text-rose-400">Why it works:</strong> Neuroscience research
                  shows that when you are emotionally aroused (angry, frustrated, anxious), your
                  prefrontal cortex &mdash; the part of your brain responsible for judgement,
                  planning and impulse control &mdash; is suppressed by the amygdala (your emotional
                  alarm system). Waiting 24 hours allows the amygdala to settle and the prefrontal
                  cortex to re-engage, meaning you make better decisions about what to write and how
                  to write it.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Pro Tip: Remove the Recipient</p>
                </div>
                <p className="text-sm text-white">
                  When drafting an emotional email, remove the recipient&rsquo;s address from the
                  &ldquo;To&rdquo; field before you start writing. This eliminates any risk of
                  accidentally sending the draft before you are ready. Add the recipient back only
                  after you have revised the email and are confident it represents your best
                  professional self.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Construction Email Templates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Construction Email Templates &amp; Examples
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following templates demonstrate how to apply the principles from this section to
                real construction scenarios. Study the structure, tone and content of each example
                &mdash; then adapt them for your own situations.
              </p>

              <div className="space-y-4">
                {/* Template 1: Chasing Materials */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Chasing Late Materials Delivery
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/20 p-4 rounded font-mono text-xs text-white space-y-2">
                    <p>
                      <strong className="text-rose-400">Subject:</strong> Victoria Court &mdash;
                      Outstanding cable tray delivery (Order #ET-4892)
                    </p>
                    <p>Good morning, Sarah,</p>
                    <p>
                      I am writing regarding our cable tray order #ET-4892, which was due for
                      delivery to Victoria Court on Monday 10th March. As of today (Wednesday 12th),
                      the materials have not arrived and we have received no notification of a
                      delay.
                    </p>
                    <p>
                      This delivery is on our critical path &mdash; without the cable tray we cannot
                      proceed with the containment installation in Blocks C and D, which is
                      programmed for this week.
                    </p>
                    <p>Could you please:</p>
                    <p>1. Confirm the current status of order #ET-4892</p>
                    <p>2. Provide a firm revised delivery date</p>
                    <p>
                      3. Advise whether partial delivery is possible to allow us to make a start
                    </p>
                    <p>
                      I would appreciate a response by 14:00 today so I can update the project
                      manager on the impact to our programme.
                    </p>
                    <p>Many thanks,</p>
                    <p>John Smith</p>
                    <p>Electrical Supervisor &mdash; Smith Electrical Ltd</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded mt-3">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Why this works:</strong> It is factual
                      (dates and order numbers), specific (exactly what is needed), firm but
                      professional (no blame or anger), and includes a deadline for response. The
                      numbered requests make it easy for the recipient to action.
                    </p>
                  </div>
                </div>

                {/* Template 2: Confirming Site Access */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Confirming Site Access Arrangements
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/20 p-4 rounded font-mono text-xs text-white space-y-2">
                    <p>
                      <strong className="text-rose-400">Subject:</strong> 45 Beech Road &mdash; Site
                      access confirmation for Monday 17th March
                    </p>
                    <p>Dear Mrs Patterson,</p>
                    <p>
                      Thank you for confirming the start date for the rewire at 45 Beech Road. I am
                      writing to confirm the access arrangements so we can make a smooth start.
                    </p>
                    <p>
                      We will require access from 08:00 on Monday 17th March. Our team of two
                      electricians will be on site for approximately five working days. During this
                      time we will need:
                    </p>
                    <p>&bull; Access to all rooms including the loft space</p>
                    <p>
                      &bull; The existing supply to remain live until we are ready to isolate (we
                      will give you advance notice)
                    </p>
                    <p>
                      &bull; A clear working area of approximately 1 metre around the consumer unit
                      position
                    </p>
                    <p>
                      We will lay dust sheets and protect flooring throughout. Please let me know if
                      there are any areas of the property that require special care or if you have
                      any concerns.
                    </p>
                    <p>
                      If any of the above is a problem, please let me know before Friday so we can
                      make alternative arrangements.
                    </p>
                    <p>Kind regards,</p>
                    <p>John Smith</p>
                    <p>Electrical Supervisor &mdash; Smith Electrical Ltd</p>
                    <p>NICEIC Approved Contractor | Tel: 07700 900123</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded mt-3">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Why this works:</strong> It is more formal
                      (domestic client, first major communication), clearly sets out what is needed,
                      shows professionalism by mentioning dust sheets and floor protection, and
                      gives the client time to raise concerns before the work starts.
                    </p>
                  </div>
                </div>

                {/* Template 3: Notifying of Delay */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Notifying of a Programme Delay
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/20 p-4 rounded font-mono text-xs text-white space-y-2">
                    <p>
                      <strong className="text-rose-400">Subject:</strong> Elm Grove Phase 2 &mdash;
                      Electrical second fix delay notification (2 working days)
                    </p>
                    <p>Good afternoon, David,</p>
                    <p>
                      I am writing to notify you of a delay to our electrical second fix programme
                      on Elm Grove Phase 2, Blocks A and B.
                    </p>
                    <p>
                      <strong>Reason for delay:</strong> The plasterboard installation in Blocks A
                      and B is running two days behind the agreed programme. As our second fix
                      cannot commence until plastering is complete and dry, our start date will need
                      to move accordingly.
                    </p>
                    <p>
                      <strong>Revised dates:</strong> Our second fix start date moves from Monday
                      24th March to Wednesday 26th March. Our revised completion date is Tuesday 8th
                      April (previously Friday 4th April).
                    </p>
                    <p>
                      <strong>Impact on other trades:</strong> This may affect the decorator&rsquo;s
                      start date in Blocks A and B. I would recommend coordinating directly with
                      their foreman.
                    </p>
                    <p>
                      <strong>Mitigation:</strong> We will bring an additional electrician to site
                      for the first three days to recover one of the two lost days where possible.
                    </p>
                    <p>
                      Please let me know if you would like to discuss this further. I am available
                      by phone this afternoon.
                    </p>
                    <p>Kind regards,</p>
                    <p>John Smith</p>
                    <p>Electrical Supervisor &mdash; Smith Electrical Ltd</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded mt-3">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Why this works:</strong> It states the
                      problem clearly, provides the reason without blame, gives revised dates,
                      identifies the impact on others, and offers mitigation. This is exactly what a
                      project manager needs &mdash; facts, dates and solutions, not excuses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Adaptation Principle:</strong> These templates
                  are starting points, not scripts. Adapt the tone, formality and level of detail to
                  match your specific situation and recipient. The underlying structure &mdash;
                  clear subject, context, specific information, clear action required &mdash;
                  remains the same regardless of the scenario.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Professional email is not a casual skill &mdash; it is a core competency for anyone
                working in construction. Every email you send represents you, your company and your
                profession. In an industry where disputes, delays and contractual claims are
                commonplace, clear and professional written communication is both a defensive tool
                and a competitive advantage.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Summary of Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Structure:</strong> Subject, greeting, body, close, signature &mdash;
                      every email, every time, no exceptions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Tone:</strong> Match your formality to the recipient and context
                      &mdash; when in doubt, go more formal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Reply All:</strong> Default to Reply; choose Reply All only when every
                      recipient genuinely needs your response
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Chain management:</strong> New topics deserve new threads; trim
                      history when forwarding; update stale subject lines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>24-hour rule:</strong> Never send an email written in anger &mdash;
                      draft, wait, revise, then send
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Right channel:</strong> Know when to pick up the phone instead &mdash;
                      email is not always the answer
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, you will apply these same principles of clarity and
                professionalism to a different type of written communication: site diaries and
                technical reports. These documents carry even greater contractual weight than
                emails, and the ability to write them well is an essential skill for anyone moving
                into supervisory or management roles.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coming Next: Site Diaries &amp; Technical Reports
                </p>
                <p className="text-sm text-white">
                  How do you write a site diary entry that would stand up in adjudication? What
                  makes an EICR report professional rather than just adequate? How do you
                  distinguish fact from opinion in technical writing? Section 2 covers the written
                  records that define professional construction communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4-section-2">
              Site Diaries &amp; Technical Reports
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
