/**
 * Level 3 Module 7 Section 3.1 - Effective Communication
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Effective Communication - Level 3 Module 7 Section 3.1";
const DESCRIPTION = "Developing clear and professional communication skills for clients, colleagues, and other stakeholders in the electrical industry.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When explaining electrical work to a non-technical client, you should:",
    options: [
      "Use as much technical terminology as possible to show expertise",
      "Use clear, simple language and check they understand",
      "Avoid explaining anything to prevent confusion",
      "Only communicate in writing"
    ],
    correctIndex: 1,
    explanation: "Clear, jargon-free language helps clients understand what you're doing and why. Check for understanding by asking questions. Good communication builds trust and reduces misunderstandings."
  },
  {
    id: "check-2",
    question: "Active listening involves:",
    options: [
      "Waiting for the other person to finish so you can talk",
      "Fully concentrating, understanding, and responding thoughtfully",
      "Listening while doing other tasks",
      "Agreeing with everything said"
    ],
    correctIndex: 1,
    explanation: "Active listening means giving full attention, understanding the message, and responding appropriately. It involves not just hearing words but understanding meaning, which prevents errors and builds relationships."
  },
  {
    id: "check-3",
    question: "What is the most appropriate way to confirm instructions on site?",
    options: [
      "Assume you understood correctly",
      "Repeat back key points and ask clarifying questions",
      "Write everything down without checking",
      "Wait until problems arise then ask"
    ],
    correctIndex: 1,
    explanation: "Repeating back instructions and asking clarifying questions confirms understanding and catches errors early. It's much better to ask now than to do work incorrectly and have to redo it."
  },
  {
    id: "check-4",
    question: "When should you put communications in writing?",
    options: [
      "Never - verbal communication is always sufficient",
      "Only for formal contracts",
      "When recording agreements, safety concerns, or important decisions",
      "Only when forced to by lawyers"
    ],
    correctIndex: 2,
    explanation: "Written records of agreements, variations, safety concerns, and important decisions protect all parties. If something goes wrong, you need evidence of what was communicated and agreed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A client is clearly upset about the disruption from electrical work. The best first response is:",
    options: [
      "Defend yourself and explain why it's necessary",
      "Acknowledge their frustration and listen to their concerns",
      "Ignore them and continue working",
      "Leave the site until they calm down"
    ],
    correctAnswer: 1,
    explanation: "Acknowledging emotions shows you understand their position. Listen first before explaining. People are more receptive to solutions after they feel heard."
  },
  {
    id: 2,
    question: "Non-verbal communication includes all of the following EXCEPT:",
    options: [
      "Body language and posture",
      "Email messages",
      "Eye contact",
      "Facial expressions"
    ],
    correctAnswer: 1,
    explanation: "Non-verbal communication is body language, facial expressions, posture, gestures, and tone of voice. Email is written communication, which lacks non-verbal cues and can easily be misinterpreted."
  },
  {
    id: 3,
    question: "What is 'closed-loop communication' and why is it important?",
    options: [
      "Keeping information secret between parties",
      "The receiver confirms receipt and understanding of the message",
      "Only communicating through official channels",
      "Ending a conversation quickly"
    ],
    correctAnswer: 1,
    explanation: "Closed-loop communication means the receiver confirms they've received and understood the message. This is essential in safety-critical situations to ensure nothing is misunderstood or missed."
  },
  {
    id: 4,
    question: "When leaving a voicemail for a client, best practice is to:",
    options: [
      "Leave a long detailed message about all aspects of the work",
      "State your name, company, reason for calling, and callback number clearly",
      "Just ask them to call back without details",
      "Never leave voicemails"
    ],
    correctAnswer: 1,
    explanation: "A clear, concise voicemail with your name, company, reason for calling, and callback number gives the recipient the information they need to respond. Speak slowly and repeat the phone number."
  },
  {
    id: 5,
    question: "Email communication for work purposes should be:",
    options: [
      "Written as casually as a text message",
      "Professional, clear, and with an appropriate subject line",
      "As long and detailed as possible",
      "Sent immediately without checking"
    ],
    correctAnswer: 1,
    explanation: "Professional emails should be clear and concise, with a descriptive subject line. Proofread before sending. Remember, emails create a permanent record that could be used as evidence."
  },
  {
    id: 6,
    question: "A supervisor gives you instructions you don't fully understand. You should:",
    options: [
      "Figure it out as you go",
      "Ask for clarification immediately",
      "Complain to colleagues later",
      "Do what you think they meant"
    ],
    correctAnswer: 1,
    explanation: "Never guess at instructions. Asking for clarification is professional - it prevents errors and shows you want to do the job correctly. No good supervisor minds being asked to clarify."
  },
  {
    id: 7,
    question: "When communicating with someone whose first language isn't English:",
    options: [
      "Speak loudly so they can understand better",
      "Speak clearly, use simple language, and confirm understanding",
      "Avoid communicating directly with them",
      "Use more technical terms to sound professional"
    ],
    correctAnswer: 1,
    explanation: "Speak clearly at a normal volume, use simple language, and check understanding. Using diagrams or demonstrations can also help. Be patient and respectful."
  },
  {
    id: 8,
    question: "What should be documented when agreeing to variations or additional work?",
    options: [
      "Nothing - verbal agreement is sufficient",
      "Description of work, agreed cost, and written confirmation of acceptance",
      "Only the final invoice",
      "Just a text message"
    ],
    correctAnswer: 1,
    explanation: "Variations should be documented with clear description, cost, and written agreement. This prevents disputes about what was agreed and protects both parties. 'Handshake deals' cause problems."
  },
  {
    id: 9,
    question: "Barriers to effective communication include:",
    options: [
      "Speaking clearly and listening carefully",
      "Noise, distractions, assumptions, and using jargon",
      "Asking questions for clarification",
      "Taking notes during discussions"
    ],
    correctAnswer: 1,
    explanation: "Communication barriers include environmental factors (noise, distractions), psychological factors (assumptions, preconceptions), and language issues (jargon, unclear speech). Recognising barriers helps overcome them."
  },
  {
    id: 10,
    question: "A site manager gives contradictory instructions to what you were told by the client. You should:",
    options: [
      "Follow the site manager and ignore the client",
      "Seek clarification and get agreement between parties before proceeding",
      "Follow the client and ignore the site manager",
      "Do nothing until they resolve it themselves"
    ],
    correctAnswer: 1,
    explanation: "Contradictory instructions need resolution before proceeding. Clarify with both parties, document the issue, and ensure everyone agrees on the way forward. Don't assume who has authority."
  },
  {
    id: 11,
    question: "Professional communication on social media or messaging apps should:",
    options: [
      "Be as informal as personal posts",
      "Maintain professional standards as messages may be shared or evidenced",
      "Include emojis and abbreviations freely",
      "Be used for all client communication"
    ],
    correctAnswer: 1,
    explanation: "Even on informal platforms, professional standards apply. Messages can be screenshot and shared, so maintain the same professionalism as formal communication. Be aware that nothing is truly private."
  },
  {
    id: 12,
    question: "When giving feedback to a colleague about their work, effective communication involves:",
    options: [
      "Only pointing out negatives to help them improve",
      "Being specific, constructive, and focusing on behaviour not personality",
      "Avoiding feedback to prevent conflict",
      "Criticising in front of others to ensure they listen"
    ],
    correctAnswer: 1,
    explanation: "Effective feedback is specific (about particular actions), constructive (offers solutions), and professional (addresses behaviour, not character). Give feedback privately and be willing to receive it too."
  }
];

const faqs = [
  {
    question: "How do I handle a client who doesn't want to listen to my advice?",
    answer: "Explain your concerns clearly and the potential consequences of ignoring them. Put your advice in writing. If they insist on proceeding against your recommendations on safety matters, you may need to refuse the work. Document everything - you're protecting yourself and them."
  },
  {
    question: "What if I make a mistake in communication - give wrong information?",
    answer: "Correct it as soon as possible. Contact the person, explain the error, and provide the correct information. Apologise if appropriate. Everyone makes mistakes - how you handle them matters more than avoiding them entirely."
  },
  {
    question: "Is it unprofessional to admit I don't know something?",
    answer: "No - it's far more unprofessional to pretend you know and give wrong information. Say 'I'm not certain about that, let me find out and get back to you.' Clients respect honesty more than bluffing."
  },
  {
    question: "How formal should my communication be with regular clients?",
    answer: "You can be friendly while remaining professional. As relationships develop, formality often reduces, but maintain professional boundaries. Never let familiarity lead to cutting corners on documentation or processes."
  },
  {
    question: "What's the best way to deliver bad news to a client?",
    answer: "Be honest, be prompt, and have solutions ready. Don't delay bad news hoping it will go away. Explain what happened, what it means for them, and what you're doing about it. Take responsibility where appropriate."
  },
  {
    question: "Should I communicate differently with different generations of clients?",
    answer: "Communication preferences vary between individuals more than generations, but be adaptable. Some prefer phone calls, others text or email. Ask how they prefer to communicate and accommodate reasonable preferences."
  }
];

const Level3Module7Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <Link to="/study-centre/apprentice/level3-module7-section3">
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
            <span>Module 7.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Effective Communication
          </h1>
          <p className="text-white/80">
            Clear, professional communication with clients, colleagues, and stakeholders
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Clarity:</strong> Use simple language appropriate to audience</li>
              <li><strong>Listen:</strong> Active listening prevents misunderstandings</li>
              <li><strong>Confirm:</strong> Check understanding, repeat key points</li>
              <li><strong>Document:</strong> Put important agreements in writing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Business Impact</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Trust:</strong> Good communication builds client confidence</li>
              <li><strong>Efficiency:</strong> Clear instructions reduce errors</li>
              <li><strong>Safety:</strong> Miscommunication causes accidents</li>
              <li><strong>Reputation:</strong> Professional communication wins referrals</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Communicate effectively with clients at all levels",
              "Use active listening to understand needs",
              "Adapt communication style to different audiences",
              "Confirm understanding and avoid misinterpretation",
              "Write clear professional documentation",
              "Handle difficult conversations professionally"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Clear Communication */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Clear Communication Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective communication is a core skill for electrical professionals. Whether explaining work to a homeowner, coordinating with other trades, or reporting to supervisors, your ability to communicate clearly affects safety, efficiency, and customer satisfaction. Miscommunication is a leading cause of errors and accidents in the construction industry.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Keys to clear communication:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Know your audience:</strong> Adjust technical language accordingly</li>
                <li><strong>Be specific:</strong> Avoid vague statements that can be misinterpreted</li>
                <li><strong>Check understanding:</strong> Ask if they have questions</li>
                <li><strong>Use multiple methods:</strong> Verbal explanation plus written confirmation</li>
                <li><strong>Be timely:</strong> Communicate important information promptly</li>
              </ul>
            </div>

            <p>
              Technical jargon that makes perfect sense to electricians can confuse clients. When explaining work to non-technical people, use analogies and everyday language. Instead of "the Zs is too high," explain "the circuit can't carry enough current to make the protection devices work properly in case of a fault."
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The test of good communication isn't what you said - it's what they understood. If the message wasn't received correctly, the communication failed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Active Listening */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Active Listening Skills
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Listening is just as important as speaking. Active listening means fully concentrating on what's being said rather than just passively hearing words. It involves understanding the complete message, including emotions and unspoken concerns. Good listening prevents misunderstandings and shows respect.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Listening Techniques</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Give full attention - put down the phone</li>
                  <li>Make eye contact appropriately</li>
                  <li>Use acknowledging responses ("I see", "Go on")</li>
                  <li>Don't interrupt or plan your response while they talk</li>
                  <li>Summarise what you heard to confirm understanding</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signs of Poor Listening</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Thinking about your reply while they speak</li>
                  <li>Interrupting to give your opinion</li>
                  <li>Being distracted by surroundings</li>
                  <li>Making assumptions instead of hearing fully</li>
                  <li>Jumping to solutions before understanding</li>
                </ul>
              </div>
            </div>

            <p>
              When a client explains a problem, listen fully before responding. They may mention symptoms that help you diagnose the fault. If you interrupt or assume, you might miss crucial information. Ask open questions like "Can you tell me more about when this happens?" to gather complete information.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A client says "the lights keep flickering." Instead of immediately looking at the lights, ask: When does it happen? All lights or just some? Has anything changed recently? These questions reveal whether it's a loose connection, overloaded circuit, or supply issue.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Confirming Understanding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Confirming Understanding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Misunderstandings cause costly errors. The simple habit of confirming understanding - repeating back key points and asking clarifying questions - prevents most communication failures. This is particularly important for instructions, agreements, and safety-critical information.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Techniques for confirming understanding:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Paraphrase:</strong> "So if I understand correctly, you want..."</li>
                <li><strong>Clarifying questions:</strong> "When you say 'soon', do you mean this week?"</li>
                <li><strong>Specific confirmation:</strong> "Just to confirm: 6 double sockets in the kitchen extension?"</li>
                <li><strong>Written follow-up:</strong> Send an email summarising what was agreed</li>
              </ul>
            </div>

            <p>
              Closed-loop communication is essential in safety-critical situations. When receiving instructions, repeat back the key points. When giving instructions, ask the receiver to confirm what they heard. This ensures nothing is misunderstood or missed.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> It's never embarrassing to check you've understood correctly. It's very embarrassing to do work wrong because you assumed incorrectly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Written Communication */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Written Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Written communication creates permanent records that can protect you and your clients. Emails, texts, quotes, and letters document what was agreed, what was advised, and what was completed. This becomes crucial if disputes arise or if work is questioned later.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Emails</p>
                <p className="text-white/90 text-xs">Professional format, clear subject, proofread before sending</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Quotes</p>
                <p className="text-white/90 text-xs">Detailed scope, clear pricing, terms and conditions</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Reports</p>
                <p className="text-white/90 text-xs">Factual, structured, appropriate technical level</p>
              </div>
            </div>

            <p>
              Even informal written communication (texts, WhatsApp) should maintain professional standards. These messages can be screenshotted and shared, or used as evidence in disputes. Write as if the message might be read by a court - because it might be.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career tip:</strong> After verbal agreements, send a brief confirmation email: "Just to confirm our discussion today: we agreed to [work description] for [price], starting [date]. Please confirm this is correct." This creates a record and gives them the opportunity to correct any misunderstanding.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Daily Communication Habits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm appointments the day before</li>
                <li>Update clients on progress and any changes</li>
                <li>Respond to messages within a reasonable timeframe</li>
                <li>Keep written records of significant discussions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Difficult Conversations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Stay calm and professional regardless of the other person's tone</li>
                <li>Focus on facts and solutions rather than blame</li>
                <li>Listen fully before responding to complaints</li>
                <li>If needed, take a break and resume when calmer</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Communication Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming understanding:</strong> Always check important points</li>
                <li><strong>Responding emotionally:</strong> Pause before replying when annoyed</li>
                <li><strong>Over-promising:</strong> Be realistic about timelines and capabilities</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Communication Checklist</p>
                <ul className="space-y-0.5">
                  <li>Clear and concise message</li>
                  <li>Appropriate for audience</li>
                  <li>Understanding confirmed</li>
                  <li>Important points documented</li>
                  <li>Timely response/follow-up</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Document When</p>
                <ul className="space-y-0.5">
                  <li>Agreeing scope and price</li>
                  <li>Variations to original work</li>
                  <li>Safety concerns raised</li>
                  <li>Client decisions recorded</li>
                  <li>Complaints and resolutions</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section3-2">
              Next: Technical Reporting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section3_1;
