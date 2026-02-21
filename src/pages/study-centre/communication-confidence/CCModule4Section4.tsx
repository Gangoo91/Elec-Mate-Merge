import {
  ArrowLeft,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Phone,
  Mail,
  Shield,
  Camera,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'tone-in-text',
    question:
      'A customer texts you: "When are you actually coming?" You read it as aggressive. Your colleague reads the same message and thinks the customer is simply asking for an update. What is the most likely explanation?',
    options: [
      'The customer is definitely being rude',
      'Your colleague is too relaxed about customer service',
      'Text strips tone &mdash; the reader fills in the emotion based on their own mood and assumptions',
      'The customer meant it as a joke',
    ],
    correctIndex: 2,
    explanation:
      'This is negativity bias in text communication. Without vocal tone, facial expression, or body language, the reader projects their own emotional state onto the words. Research shows people consistently interpret ambiguous text messages more negatively than intended. The safest approach is to assume neutral intent and, if unsure, pick up the phone.',
  },
  {
    id: 'gdpr-site-photos',
    question:
      'You have taken progress photos on a domestic rewire. The photos show the customer\u2019s hallway, including family photos on the wall and post on the side table with visible names and addresses. You want to share the photos in your company WhatsApp group to show the team the distribution board layout. What should you do?',
    options: [
      'Share them immediately \u2014 it\u2019s just your work group',
      'Crop or blur the photos to remove any identifiable personal information before sharing',
      'Ask the customer\u2019s permission to share the photos publicly on social media',
      'Delete the photos \u2014 you should never take site photos',
    ],
    correctIndex: 1,
    explanation:
      'Under GDPR, images containing personal data (names, addresses, recognisable faces, vehicle registration plates) must be handled carefully. Before sharing any site photos \u2014 even internally \u2014 you should crop or blur any identifiable information. You do not need to avoid taking site photos entirely, but you must ensure personal data is protected before sharing.',
  },
  {
    id: 'phone-vs-text',
    question:
      'A customer has texted you three times about a snagging issue, each message longer and more frustrated than the last. Your text replies don\u2019t seem to be resolving the situation. What is the best next step?',
    options: [
      'Send a longer, more detailed text explaining everything again',
      'Stop replying until they calm down',
      'Pick up the phone and call them \u2014 voice carries tone and empathy that text cannot',
      'Forward the messages to your manager and let them deal with it',
    ],
    correctIndex: 2,
    explanation:
      'When a text conversation is escalating, switching to a phone call is almost always the right decision. Voice communication carries tone, pace, and empathy that text simply cannot convey. A two-minute phone call can often resolve what ten text messages cannot. The decision framework is clear: if it\u2019s emotional, complex, or escalating \u2014 call.',
  },
];

const faqs = [
  {
    question: 'Is it unprofessional to use WhatsApp for business communication?',
    answer:
      'No \u2014 WhatsApp is now the standard communication tool across the UK construction industry. The key is how you use it. Professional WhatsApp use means clear messages, appropriate response times, no late-night messages unless genuinely urgent, and keeping group chats focused and well-managed. What makes it professional or unprofessional is your behaviour on the platform, not the platform itself.',
  },
  {
    question: 'Do I need written consent to take photos on a customer\u2019s property?',
    answer:
      'For your own records and work documentation, you generally do not need formal written consent \u2014 it falls under your legitimate business interest. However, if you plan to use photos for marketing, social media, or any public-facing purpose, you should obtain explicit consent, ideally in writing or via a clear text/email confirmation. Under GDPR, the customer has the right to ask you to delete their images at any time, and you must comply.',
  },
  {
    question: 'How quickly should I respond to customer messages?',
    answer:
      'A good benchmark is to acknowledge within 2\u20134 hours during working hours, even if the full answer will take longer. A quick acknowledgement (\u201cThanks for your message \u2014 I\u2019ll check and get back to you by end of day\u201d) manages expectations and prevents the customer from feeling ignored. If you cannot respond during working hours, set your WhatsApp status or auto-reply to indicate your availability.',
  },
  {
    question: 'What should I do if someone posts something inappropriate in a work WhatsApp group?',
    answer:
      'As a group admin, you have a responsibility to maintain professional standards. Address it promptly \u2014 either by messaging the person privately or, if it is serious (discriminatory content, personal attacks, confidential information), removing the message and addressing it directly. Set clear group rules from the start: no personal content, no forwarded memes or chain messages, no discriminatory material, and no sharing of customer details. Prevention through clear rules is always better than correction after the fact.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is "negativity bias" in the context of text communication?',
    options: [
      'A preference for sending negative messages over positive ones',
      'The tendency to interpret ambiguous text messages more negatively than intended',
      'A bias towards using negative emojis in professional messages',
      'The habit of only texting when something has gone wrong',
    ],
    correctAnswer: 1,
    explanation:
      'Negativity bias in text communication refers to the well-documented tendency for readers to interpret ambiguous messages more negatively than the sender intended. Because text strips out vocal tone, facial expression, and body language, the reader\u2019s brain fills in the gaps \u2014 and it tends to fill them with negative assumptions, especially when the reader is stressed or anxious.',
  },
  {
    id: 2,
    question:
      'Under GDPR, which of the following would be classified as personal data in a site photo?',
    options: [
      'A distribution board with circuit labels',
      'A cable run through a loft space',
      'A letter on a kitchen worktop showing a name and address',
      'A close-up of a socket outlet installation',
    ],
    correctAnswer: 2,
    explanation:
      'Under GDPR, personal data is any information that can identify a living individual \u2014 directly or indirectly. A letter showing a name and address is clearly personal data. The other options show electrical work with no identifiable personal information. Before sharing site photos, always check for visible names, addresses, faces, vehicle registrations, or any other identifying details.',
  },
  {
    id: 3,
    question:
      'According to the decision framework, which type of communication should you use for a dispute or complaint?',
    options: [
      'Text message \u2014 it creates a written record',
      'Email \u2014 it is the most formal option',
      'Phone call or face-to-face \u2014 voice carries tone and empathy',
      'WhatsApp voice note \u2014 it combines voice with convenience',
    ],
    correctAnswer: 2,
    explanation:
      'Disputes and complaints should always be handled by phone or face-to-face wherever possible. Voice communication carries the tone, empathy, and nuance needed to de-escalate emotional situations. Text and email lack these qualities and can easily make a tense situation worse. After the call, you can follow up with a written summary by email to create the record.',
  },
  {
    id: 4,
    question:
      'You are the admin of a site WhatsApp group with 14 members. What is the most effective way to keep the group focused and professional?',
    options: [
      'Remove anyone who posts anything off-topic',
      'Set clear group rules from the start and pin them at the top of the chat',
      'Allow anything \u2014 it builds team morale',
      'Create a separate group for every topic to avoid clutter',
    ],
    correctAnswer: 1,
    explanation:
      'The most effective approach is to set clear group rules from the outset and pin them as the first message. Good rules typically include: work-related content only, no forwarded memes or chain messages, no discriminatory material, no sharing of customer personal details, and a clear statement of the group\u2019s purpose. Prevention through clear expectations is always more effective than correction after problems arise.',
  },
  {
    id: 5,
    question:
      'A customer sends you a WhatsApp message at 10:45 PM asking about the start time tomorrow. What is the best response?',
    options: [
      'Reply immediately to show good customer service',
      'Ignore it until the morning \u2014 they should not message that late',
      'Reply the next morning at a professional hour with a clear, helpful answer',
      'Send a voice note at midnight when you remember',
    ],
    correctAnswer: 2,
    explanation:
      'Replying at a professional hour the next morning is the correct approach. Responding to non-urgent messages late at night blurs professional boundaries and sets an unsustainable precedent. Ignoring the message entirely risks the customer feeling disrespected. The balanced approach is to reply promptly the next working morning with a clear, helpful response.',
  },
  {
    id: 6,
    question:
      'You need to share progress photos of a bathroom rewire with the main contractor. The photos show the customer\u2019s bathroom, including prescription medication on a shelf. What should you do before sharing?',
    options: [
      'Share them as they are \u2014 the contractor needs to see the full picture',
      'Crop or blur the photos to remove the medication (which is sensitive personal data) before sending',
      'Only share the photos in person on site, never digitally',
      'Ask the customer to remove all personal items before you take photos',
    ],
    correctAnswer: 1,
    explanation:
      'Medical information (including visible prescription medication) is classified as special category data under GDPR \u2014 it has even stricter protections than standard personal data. Before sharing site photos, you must check for and remove any identifiable personal information, and health-related information requires particular care. Cropping or blurring the sensitive content is the practical solution.',
  },
  {
    id: 7,
    question:
      'Which of the following is the best example of a professional WhatsApp message to a customer?',
    options: [
      'ill be there 2moro around 10ish',
      'Hi Mrs Taylor \u2014 I\u2019ll be with you tomorrow (Thursday) at approximately 10:00 AM. Please let me know if that still works for you.',
      'COMING TOMORROW 10AM.',
      'hey! coming tmrw, c u then!! \ud83d\udc4d\ud83d\udc4d\ud83d\udc4d',
    ],
    correctAnswer: 1,
    explanation:
      'A professional WhatsApp message uses the customer\u2019s name, includes the day and date for clarity, gives a specific time, and invites confirmation. It avoids text-speak, excessive punctuation, all caps (which reads as shouting), and excessive emojis. The goal is to be warm but clear \u2014 professional does not mean cold, it means precise and respectful.',
  },
  {
    id: 8,
    question: 'When should you escalate from text to a phone call?',
    options: [
      'Only when the customer explicitly asks you to call',
      'When the subject is emotional, complex, or the text exchange is escalating',
      'Never \u2014 text always creates a better record',
      'Only for emergencies',
    ],
    correctAnswer: 1,
    explanation:
      'The decision framework is clear: escalate to a phone call whenever the subject is emotional (complaints, disputes, bad news), complex (multiple issues, technical explanations), or the text exchange is visibly escalating (longer messages, more frequent messages, frustrated tone). Voice carries empathy, nuance, and the ability to de-escalate \u2014 none of which text can reliably deliver.',
  },
];

export default function CCModule4Section4() {
  useSEO({
    title: 'Digital Communication & Social Media | Communication & Confidence Module 4.4',
    description:
      'WhatsApp etiquette, negativity bias in text, phone vs text vs email decision framework, and GDPR basics for tradespeople in construction.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <Smartphone className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 4 &middot; SECTION 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Digital Communication &amp; Social Media
          </h1>
          <p className="text-white max-w-xl mx-auto">
            Professional use of WhatsApp, text, and social media &mdash; and the GDPR
            responsibilities every tradesperson must understand
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>WhatsApp etiquette:</strong> Professional tone, clear messages,
                    appropriate response times.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Negativity bias:</strong> Text strips tone &mdash; readers fill in
                    emotion based on their own mood.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Decision framework:</strong> Routine = text, formal = email, emotional
                    or complex = phone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>GDPR:</strong> Crop/blur personal data in site photos before sharing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Group management:</strong> Set rules, pin them, enforce consistently.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Before texting:</strong> Check &mdash; would a phone call be better for
                    this?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Before sharing photos:</strong> Check for names, addresses, faces, and
                    sensitive items.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>If text is escalating:</strong> Stop typing, pick up the phone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Group chats:</strong> Keep them focused &mdash; work content only, no
                    forwarded memes.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply professional etiquette to WhatsApp and text-based communication in a
                construction context
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain negativity bias in text and describe strategies to prevent misinterpretation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Use a decision framework to choose the right communication channel &mdash; phone,
                text, or email
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Identify GDPR obligations relating to site photos, customer data, and digital
                communication
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Manage a professional WhatsApp group effectively, including setting rules and
                handling inappropriate content
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: WhatsApp & Text Etiquette */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">01</span>
              WhatsApp &amp; Text Etiquette for Professional Use
            </h2>
            <div className="space-y-4 text-white">
              <p>
                WhatsApp is now the default communication tool across the UK construction industry.
                Electricians use it daily to coordinate with customers, contractors, suppliers, and
                colleagues. But the informality of the platform can lead to unprofessional habits
                that damage your reputation and create misunderstandings.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  <MessageSquare className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Professional WhatsApp Standards
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Use the customer&rsquo;s name:</strong> &ldquo;Hi Mrs Taylor&rdquo;
                      not &ldquo;Hey&rdquo; or &ldquo;Hiya&rdquo; &mdash; it sets a professional
                      tone from the first word
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Write in full sentences:</strong> &ldquo;I&rsquo;ll be with you
                      tomorrow at 10:00 AM&rdquo; not &ldquo;2moro 10ish&rdquo; &mdash; text-speak
                      undermines credibility
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Include dates, not just days:</strong> &ldquo;Thursday 15th
                      March&rdquo; not just &ldquo;Thursday&rdquo; &mdash; prevents diary confusion
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>One message, one topic:</strong> Avoid sending 15 short messages in a
                      row &mdash; compose one clear message covering everything
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Avoid late-night messages:</strong> Unless genuinely urgent, keep
                      messages within working hours (08:00&ndash;18:00) &mdash; respect boundaries
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Response Time Guidelines</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Acknowledge within 2&ndash;4 hours</strong> during working hours, even
                      if the full answer will take longer &mdash; a quick &ldquo;Thanks for your
                      message, I&rsquo;ll check and get back to you by end of day&rdquo; is
                      sufficient
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Set expectations if you are on site:</strong> Use your WhatsApp status
                      or a brief reply to indicate you are working and will respond later
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>
                        Never leave a customer on &ldquo;read&rdquo; with no response:
                      </strong>{' '}
                      The blue ticks tell them you have seen the message &mdash; silence after that
                      feels like being ignored
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Voice Notes</h3>
                <p className="text-white text-sm mb-3">
                  Voice notes occupy a middle ground between text and phone calls. They carry tone
                  and personality, but they have significant drawbacks:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      The recipient cannot skim them &mdash; they must listen to the entire message
                      to find the key information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      They cannot be searched later &mdash; try finding a specific detail in a
                      string of voice notes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      They may be played aloud at an inconvenient time &mdash; the recipient may be
                      in a meeting or on a quiet site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Best practice:</strong> Use voice notes only for quick, informal
                      updates to colleagues &mdash; never for customer communications where
                      precision matters
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Negativity Bias in Text */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400 text-sm font-normal">02</span>
              Negativity Bias in Text
            </h2>
            <div className="space-y-4 text-white">
              <p>
                When you speak face-to-face, your words carry only about 7% of the meaning. The rest
                comes from vocal tone (38%) and body language (55%). When you send a text message,{' '}
                <strong>all of that context is stripped away</strong> &mdash; and the reader&rsquo;s
                brain fills in the gaps.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  <AlertTriangle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  How Negativity Bias Works
                </h3>
                <p className="text-white text-sm mb-3">
                  Research consistently shows that when a text message is ambiguous &mdash; neither
                  clearly positive nor clearly negative &mdash; the reader tends to interpret it
                  negatively. This effect is amplified when:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The reader is already stressed or anxious</strong> &mdash; a customer
                      waiting for a callback will read &ldquo;I&rsquo;ll get to it&rdquo; as
                      dismissive, when you meant &ldquo;I haven&rsquo;t forgotten, it&rsquo;s on my
                      list&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The message is short or blunt:</strong> &ldquo;Fine.&rdquo;
                      &ldquo;OK.&rdquo; &ldquo;Noted.&rdquo; &mdash; these read as cold or annoyed
                      in text, even if you meant them neutrally
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>There is a power imbalance:</strong> A message from a main contractor
                      saying &ldquo;Call me&rdquo; can trigger anxiety in a subcontractor, even if
                      the contractor simply has a question
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Strategies to Prevent Misinterpretation
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Add context to short replies:</strong> Instead of &ldquo;OK&rdquo;,
                      write &ldquo;OK, that works for me &mdash; I&rsquo;ll see you at 10&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Use a friendly opener or closer:</strong> &ldquo;Hi John&rdquo; or
                      &ldquo;Thanks&rdquo; softens the message without being unprofessional
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Re-read before sending:</strong> Read your message as if you were
                      stressed and looking for something to worry about &mdash; does it still read
                      well?
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>When in doubt, assume positive intent:</strong> If you receive an
                      ambiguous message, assume the sender meant it neutrally &mdash; and if you are
                      still unsure, pick up the phone
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-400 font-medium mb-3">
                  Construction Example: The &ldquo;When Are You Coming?&rdquo; Message
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-amber-500/10 border border-amber-400/30 p-3 rounded-lg">
                    <p className="text-white mb-1">
                      <strong>Customer texts:</strong> &ldquo;When are you actually coming?&rdquo;
                    </p>
                    <p className="text-white">
                      <strong>What you might read:</strong> Aggressive, accusatory, impatient.
                    </p>
                    <p className="text-white">
                      <strong>What they probably meant:</strong> &ldquo;I&rsquo;m trying to plan my
                      day and need to know when to expect you.&rdquo;
                    </p>
                  </div>
                  <p className="text-white">
                    The word &ldquo;actually&rdquo; is a classic negativity trigger in text. In
                    speech, it is often a filler word with no emotional weight. In text, it reads as
                    frustration. The professional response is to answer the question helpfully:
                    &ldquo;Hi &mdash; I&rsquo;m aiming to be with you by 2:00 PM this afternoon.
                    I&rsquo;ll send you a message when I&rsquo;m on my way.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Decision Framework — Phone vs Text vs Email */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400 text-sm font-normal">03</span>
              Decision Framework: Phone vs Text vs Email
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Choosing the wrong communication channel is one of the most common professional
                mistakes in construction. Trying to resolve a complaint by text, or sending a formal
                variation by WhatsApp, creates problems that are entirely avoidable. The framework
                below gives you a simple decision process.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-500/10 border border-green-400/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-5 w-5 text-green-400" />
                    <h3 className="font-semibold text-green-400">Text / WhatsApp</h3>
                  </div>
                  <p className="text-white text-xs mb-2 font-medium">Use for:</p>
                  <ul className="text-white space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Arrival times and scheduling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Quick confirmations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Progress photo updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Simple questions with yes/no answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Team coordination on site</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-400/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-blue-400">Email</h3>
                  </div>
                  <p className="text-white text-xs mb-2 font-medium">Use for:</p>
                  <ul className="text-white space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Formal quotes and proposals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Variation instructions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Anything requiring a formal record</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Attaching documents, certificates, or reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Written confirmations after phone conversations</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-400/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="h-5 w-5 text-purple-400" />
                    <h3 className="font-semibold text-purple-400">Phone Call</h3>
                  </div>
                  <p className="text-white text-xs mb-2 font-medium">Use for:</p>
                  <ul className="text-white space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Complaints and disputes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Delivering bad news</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Complex technical discussions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Escalating text conversations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Anything requiring tone, empathy, or nuance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-400">The Escalation Rule</h3>
                </div>
                <p className="text-white text-sm">
                  If a text exchange reaches three messages without resolution, or if the tone is
                  becoming tense, <strong>stop typing and call.</strong> A two-minute phone call can
                  resolve what ten text messages cannot. After the call, follow up with a brief
                  email or text summarising what was agreed &mdash; this gives you the written
                  record without the risk of text-based escalation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">Quick Decision Test</h3>
                <p className="text-white text-sm mb-3">
                  Before sending any message, ask yourself these three questions:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Is it emotional?</strong> &rarr; Call.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Does it need a formal record?</strong> &rarr; Email.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Is it routine and factual?</strong> &rarr; Text.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: GDPR Basics for Tradespeople */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400 text-sm font-normal">04</span>
              GDPR Basics for Tradespeople
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The General Data Protection Regulation (GDPR) applies to every business that handles
                personal data &mdash; including sole traders. As an electrician, you routinely
                handle customer names, addresses, phone numbers, email addresses, and site
                photographs. You have legal obligations around how you collect, store, use, and
                share this data.
              </p>

              <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-teal-400">
                  <Shield className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  What Counts as Personal Data?
                </h3>
                <p className="text-white text-sm mb-3">
                  Personal data is any information that can identify a living individual &mdash;
                  directly or indirectly. In a construction context, this includes:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>Customer names, addresses, phone numbers, and email addresses</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Photographs showing recognisable faces, names on post, vehicle registration
                      plates, or other identifying details
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Special category data:</strong> Medical information (e.g., visible
                      prescription medication in photos), religious items, or other sensitive
                      personal information
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-400 font-medium mb-3">
                  <Camera className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Site Photos &mdash; Practical Rules
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Taking photos for your own work records:</strong> Generally fine under
                      legitimate business interest &mdash; no formal consent needed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Sharing photos internally</strong> (e.g., with your team): Check for
                      and remove any personal data first &mdash; crop or blur names, addresses,
                      faces
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Sharing photos publicly</strong> (social media, website, marketing):
                      You must have explicit consent from the property owner/occupier
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Customer requests deletion:</strong> You must comply &mdash; delete
                      the images from all devices and backups where reasonably practical
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-400">
                    Common GDPR Mistakes in Construction
                  </h3>
                </div>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Sharing a customer&rsquo;s phone number with another tradesperson without the
                      customer&rsquo;s consent
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Posting &ldquo;before and after&rdquo; photos on social media that show the
                      property address or identifiable features without consent
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Keeping customer data indefinitely after the job is complete &mdash; data
                      should only be retained for as long as there is a legitimate business or legal
                      reason
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Adding customers to a marketing mailing list or group chat without their
                      explicit opt-in consent
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">Data Retention &mdash; How Long?</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Electrical certificates (EICRs, EICs, MWCs):</strong> Retain for the
                      period specified by BS 7671 or as required by your Part P notification body
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Invoices and financial records:</strong> 6 years (HMRC requirement)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Site photos with no personal data:</strong> Retain as long as useful
                      for your business
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Customer contact details:</strong> Delete when you no longer have a
                      legitimate business reason to hold them (unless the customer has opted in to
                      marketing)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Construction Examples — WhatsApp Group Management & Progress Photos */}
        <section className="mb-10">
          <div className="border-l-2 border-indigo-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-400 text-sm font-normal">05</span>
              Construction Examples: WhatsApp Groups &amp; Sharing Progress Photos
            </h2>
            <div className="space-y-4 text-white">
              <p>
                WhatsApp groups are the communication backbone of most construction projects. A
                well-managed group keeps everyone informed and coordinated. A poorly managed group
                becomes a source of confusion, missed messages, and unprofessional conduct.
              </p>

              <div className="bg-indigo-500/10 border border-indigo-400/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-indigo-400">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  WhatsApp Group Management Rules
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Name the group clearly:</strong> Include the project name and purpose
                      &mdash; e.g., &ldquo;15 Oak Road &mdash; Rewire Team&rdquo; or &ldquo;Smith
                      Developments &mdash; Site Updates&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Pin the group rules as the first message:</strong> Work content only,
                      no memes or forwards, no personal conversations, no sharing of customer
                      details
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Set admin-only posting if needed:</strong> For announcement-style
                      groups, restrict posting to admins to prevent clutter
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Remove members when they leave the project:</strong> Former team
                      members should not continue to receive project communications
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Archive completed project groups:</strong> Do not delete &mdash;
                      archive. You may need to refer back to conversations for dispute resolution or
                      reference
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-indigo-400/30 p-4 rounded-lg">
                <h3 className="text-indigo-400 font-medium mb-3">
                  <Camera className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Sharing Progress Photos &mdash; Best Practice
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-white">
                    Progress photos are a powerful communication tool. A single photo can convey
                    more than a paragraph of text. But they must be shared thoughtfully:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-green-500/10 border border-green-400/30 p-3 rounded-lg">
                      <p className="font-semibold text-green-400 text-sm mb-2">Do</p>
                      <ul className="text-white space-y-1.5 text-xs">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>
                            Focus on the work &mdash; distribution boards, cable routes, containment
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Add a brief caption explaining what the photo shows</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Crop or blur any personal data before sharing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Share in the relevant project group, not your personal feed</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-400/30 p-3 rounded-lg">
                      <p className="font-semibold text-red-400 text-sm mb-2">Do Not</p>
                      <ul className="text-white space-y-1.5 text-xs">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Share photos showing customer faces, names, or addresses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Post site photos on public social media without consent</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>
                            Share photos of other tradespeople&rsquo;s poor work to mock them
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>
                            Send dozens of photos without context &mdash; select the key ones
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Construction Scenario: The New-Build Site Group
                </h3>
                <div className="space-y-3 text-sm text-white">
                  <p>
                    You are the lead electrician on a new-build project with 14 people in the site
                    WhatsApp group. Over the past week, the group has become cluttered with:
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Forwarded memes and jokes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Personal conversations between two members visible to all</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>
                        A complaint about another subcontractor&rsquo;s work posted for everyone to
                        see
                      </span>
                    </li>
                  </ul>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg mt-3">
                    <p className="font-semibold text-rose-400 text-sm mb-1">
                      Professional Response:
                    </p>
                    <p className="text-white text-sm">
                      Post a polite but clear message reminding everyone of the group&rsquo;s
                      purpose. Address the complaint privately with the person who posted it. Pin
                      the group rules (or create them if they do not exist). If the behaviour
                      continues, message the individuals privately before considering removing them
                      from the group.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="Digital Communication &amp; Social Media Quiz" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-5-section-1">
              Next: Module 5 &mdash; Principled Negotiation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
