import {
  ArrowLeft,
  MessageSquareWarning,
  CheckCircle,
  Zap,
  AlertTriangle,
  ShieldAlert,
  Clock,
  HandMetal,
  PoundSterling,
  Lightbulb,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    id: 'cc-difficult-prep-framework',
    question:
      'You need to tell a homeowner that the rewire will cost &pound;1,200 more than the original quote because concealed asbestos was found behind the consumer unit. Using the preparation framework, what should you do BEFORE the conversation?',
    options: [
      'Ring the customer immediately and blurt out the bad news to get it over with',
      'Plan what you will say, gather evidence (photos, asbestos survey report, revised quote), anticipate their likely reaction, and practise delivering the key message clearly and calmly',
      'Send a text message so you do not have to speak to them directly',
      'Add the cost to the final invoice without mentioning it and hope they do not notice',
    ],
    correctIndex: 1,
    explanation:
      'The preparation framework (Plan, Practise, Execute) requires you to gather your facts and evidence, structure your key message, anticipate the other person&rsquo;s emotional reaction and likely questions, and rehearse your delivery before the conversation. Walking in unprepared leads to rambling, defensiveness, and a worse outcome for everyone. Having the asbestos survey report and photographs ready demonstrates professionalism and justifies the additional cost with evidence rather than opinion.',
  },
  {
    id: 'cc-difficult-i-message',
    question:
      'A labourer on site keeps leaving cable drums in the walkway, creating a trip hazard. Which of the following is the best Thomas Gordon I-message to address this?',
    options: [
      '"You&rsquo;re always leaving cables everywhere &mdash; you&rsquo;re going to get someone killed."',
      '"When cable drums are left in the walkway, I worry that someone will trip and be seriously injured, and I need them stored in the designated area after use."',
      '"The site manager says you need to stop being so careless."',
      '"Everyone is fed up with your mess."',
    ],
    correctIndex: 1,
    explanation:
      'A Thomas Gordon I-message has three parts: (1) "When [specific behaviour]" &mdash; describes the observable behaviour without judgement; (2) "I feel/I worry" &mdash; states the impact on you or the team; (3) "I need" &mdash; states what you need to change. Option B follows this formula precisely. Option A uses "you always" which is a generalisation and an accusation. Options C and D are third-party blame statements that invite defensiveness rather than cooperation.',
  },
  {
    id: 'cc-difficult-deescalation',
    question:
      'A subcontractor is shouting angrily because you have flagged unsafe work that needs to be ripped out and redone. Which de-escalation technique should you use FIRST?',
    options: [
      'Shout back louder to assert dominance',
      'Walk away and refuse to engage',
      'Acknowledge their frustration, lower your voice, and allow them a moment to vent before calmly restating the safety issue',
      'Threaten to report them to the principal contractor immediately',
    ],
    correctIndex: 2,
    explanation:
      'The first step in de-escalation is always to acknowledge the other person&rsquo;s emotion ("I can see you&rsquo;re frustrated") and create space for them to vent. Lowering your own voice and speaking calmly triggers a natural mirroring response. Once the emotional intensity drops, you can restate the factual issue. Shouting back escalates the conflict. Walking away may be necessary eventually but should not be the first move. Threatening to report them is an escalation, not a de-escalation.',
  },
];

const faqs = [
  {
    question: 'What if the customer refuses to pay the additional cost?',
    answer:
      'If a customer disputes additional costs, stay calm and professional. Refer to the terms and conditions in your original contract &mdash; most well-drafted contracts include a variation clause that covers unforeseen work. Present the evidence (photographs, survey reports, written correspondence) and explain why the additional work was necessary. If the customer still refuses, you have several options: offer a payment plan, suggest mediation through a trade body (such as the NICEIC or NAPIT complaints procedure), or as a last resort, pursue the debt through the small claims court (for amounts under &pound;10,000 in England and Wales). The key is to keep written records of all communications and never do additional work without written agreement on cost.',
  },
  {
    question:
      'How do I raise a safety concern with a more senior tradesperson without causing conflict?',
    answer:
      'Use the I-message formula: "When I see [specific unsafe behaviour], I worry about [specific risk], and I need [specific action]." This keeps the focus on the behaviour and the hazard rather than attacking the person. Frame it as a shared responsibility rather than a criticism &mdash; "I know we both want to get home safely." If the person is dismissive, you have a legal duty under Section 7 of the Health and Safety at Work etc. Act 1974 to report it to your supervisor or the site manager. You are protected from retaliation under employment law. Preparing what you will say in advance (the "Plan" stage of the preparation framework) significantly increases confidence when raising concerns with senior colleagues.',
  },
  {
    question:
      'Is it ever appropriate to have a difficult conversation by text or email instead of face-to-face?',
    answer:
      'Written communication can be appropriate for following up after a face-to-face conversation (to create a record), for sending formal notices (such as a payment reminder or variation order), or when emotions are running too high for a productive in-person discussion. However, the initial difficult conversation should almost always be face-to-face or by phone, because text and email strip out tone, facial expressions, and vocal cues &mdash; all of which are critical for de-escalation and building understanding. A message reading "We need to discuss additional costs" can sound very different depending on the tone the reader imagines. The rule of thumb: if the conversation involves emotion, have it in person; then follow up in writing.',
  },
  {
    question: 'What should I do if a difficult conversation becomes aggressive or threatening?',
    answer:
      'Your personal safety always comes first. If someone becomes physically threatening, verbally abusive, or you feel unsafe, remove yourself from the situation immediately. Do not attempt to continue the conversation. State clearly and calmly: "I want to resolve this, but I cannot continue while you are [shouting/threatening]. I am going to leave now and we can talk again when things are calmer." Document what happened (date, time, what was said, any witnesses). Report the incident to your employer or the site manager. On a construction site, aggressive behaviour is a disciplinary matter and may be a criminal offence. You are never required to tolerate abuse as part of your job, regardless of the other person&rsquo;s seniority or role.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In Thomas Gordon&rsquo;s I-message framework, what are the three components of an effective I-message?',
    options: [
      '"You always..." + accusation + demand for change',
      '"When [behaviour]..." + "I feel/I worry..." + "I need..."',
      '"Everyone thinks..." + generalisation + ultimatum',
      '"The boss says..." + blame + punishment',
    ],
    correctAnswer: 1,
    explanation:
      'Thomas Gordon&rsquo;s I-message has three parts: (1) "When [specific observable behaviour]" describes what is happening without judgement or generalisation; (2) "I feel" or "I worry" states the tangible effect or emotional impact on you; (3) "I need" states the specific change you are requesting. This structure avoids blame, reduces defensiveness, and keeps the focus on the problem rather than the person. It was first described in Gordon&rsquo;s "Parent Effectiveness Training" (1970) and later adapted for workplace communication.',
  },
  {
    id: 2,
    question:
      'Which of the following is the correct order for the difficult conversation preparation framework?',
    options: [
      'Execute, Plan, Practise',
      'Practise, Execute, Plan',
      'Plan, Practise, Execute',
      'React, Justify, Defend',
    ],
    correctAnswer: 2,
    explanation:
      'The preparation framework follows the sequence Plan, Practise, Execute. Planning involves gathering facts, structuring your key message, anticipating the other person&rsquo;s reaction, and deciding on your desired outcome. Practising means rehearsing your opening line and key points &mdash; ideally out loud or with a trusted colleague. Executing means delivering the conversation using the skills you have prepared. "React, Justify, Defend" is the opposite of a planned approach and typically leads to poor outcomes.',
  },
  {
    id: 3,
    question:
      'A customer becomes angry when you explain that their consumer unit does not meet current regulations and needs replacing. Which de-escalation technique should you apply FIRST?',
    options: [
      'Immediately offer a discount to calm them down',
      'Tell them they are wrong to be upset because regulations are regulations',
      'Acknowledge their frustration ("I understand this is unexpected"), pause, then explain the regulation and the safety reason behind it',
      'Hand them a printed copy of BS 7671 and leave the room',
    ],
    correctAnswer: 2,
    explanation:
      'The first de-escalation step is always to acknowledge the emotion: "I understand this is unexpected" or "I can see this is frustrating." This validates the person&rsquo;s feelings without agreeing that the situation is wrong. A brief pause allows the emotional intensity to drop. Only then should you present the factual explanation. Offering an immediate discount undermines your professional position. Telling someone they are wrong to feel upset escalates the situation. Handing over a technical document and leaving is dismissive and unprofessional.',
  },
  {
    id: 4,
    question:
      'You quoted &pound;3,800 for a domestic rewire but the job has taken two days longer than expected due to unforeseen plaster damage. The customer is expecting the original price. What is the BEST approach?',
    options: [
      'Absorb the loss silently and resent the customer',
      'Add the extra cost to the invoice without warning',
      'Explain the situation honestly with evidence (photographs, time records), present the revised figure, and offer options such as a payment plan or a breakdown showing exactly where the additional time went',
      'Blame the customer for having an old property',
    ],
    correctAnswer: 2,
    explanation:
      'The "money conversation" requires honesty, evidence, and options. Explain what happened (the unforeseen plaster damage), show the evidence (photographs, time records), present the revised cost clearly, and offer the customer control through options (payment plan, itemised breakdown). This builds trust even in a difficult situation. Absorbing losses silently is unsustainable and breeds resentment. Surprise invoices destroy client relationships. Blaming the customer is defensive and unprofessional.',
  },
  {
    id: 5,
    question: 'Which of the following is an example of "fogging" as a de-escalation technique?',
    options: [
      'Agreeing with everything the angry person says to make them stop',
      'Partially agreeing with any truth in their complaint while maintaining your position: "You&rsquo;re right that this has taken longer than we planned, and I want to explain why"',
      'Ignoring their complaint entirely and changing the subject',
      'Repeating "I understand" robotically until they give up',
    ],
    correctAnswer: 1,
    explanation:
      'Fogging (from Manuel J. Smith&rsquo;s "When I Say No, I Feel Guilty") involves partially agreeing with whatever element of truth exists in the other person&rsquo;s statement without surrendering your position. It disarms aggression by removing the adversarial dynamic &mdash; you are not fighting back, but you are not giving in either. Agreeing with everything is capitulation, not fogging. Ignoring the complaint is dismissive. Robotic repetition of "I understand" without genuine engagement will be perceived as insincere and escalate frustration.',
  },
  {
    id: 6,
    question:
      'An apprentice colleague regularly turns up late, meaning you have to cover their work. You have raised it informally twice but nothing has changed. What is the most appropriate next step?',
    options: [
      'Continue covering their work and say nothing',
      'Complain about them to everyone else on site',
      'Have a structured, planned conversation using a DESC script: Describe the behaviour, Express how it affects you, Specify what needs to change, state the Consequences if it does not',
      'Refuse to work with them and demand a different partner',
    ],
    correctAnswer: 2,
    explanation:
      'When informal approaches have not worked, escalating to a structured conversation using the DESC model (from Bower &amp; Bower, covered in Section 5.2) is the appropriate next step. DESC gives the conversation a clear framework: Describe the specific behaviour (arriving late), Express the impact (you are covering extra work, the team is short), Specify the change needed (arrive on time), and state the Consequence (you will need to raise it with the supervisor). This is assertive, not aggressive, and gives the other person a clear picture of the situation and the stakes.',
  },
  {
    id: 7,
    question:
      'You discover that a subcontractor has installed a shower circuit without RCD protection, contrary to BS 7671. You need to tell them the work must be ripped out. Which preparation step is MOST important before this conversation?',
    options: [
      'Deciding what insults to use if they argue',
      'Gathering your evidence: the specific regulation reference (BS 7671 Regulation 411.3.3), photographs of the installation, and a clear explanation of the safety risk',
      'Practising how to shout louder than them',
      'Writing an email to their boss first without talking to them',
    ],
    correctAnswer: 1,
    explanation:
      'The most important preparation step is gathering evidence: the specific regulation reference, photographic documentation, and a clear, factual explanation of the safety risk. When you can point to a specific regulation and explain the risk to life in plain language, the conversation is grounded in facts rather than opinion. This makes it much harder for the other person to dismiss your concern. Going behind their back to their boss first (without speaking to them directly) damages the working relationship and is perceived as undermining.',
  },
  {
    id: 8,
    question:
      'A client owes you &pound;4,500 for completed work and has not responded to two invoices. What is the recommended escalation sequence for the unpaid invoice conversation?',
    options: [
      'Immediately instruct a solicitor to issue court proceedings',
      'Turn up at their house unannounced and demand payment',
      'Friendly reminder call &rarr; formal written reminder &rarr; final notice with deadline &rarr; letter before action &rarr; small claims court or mediation',
      'Post about them on social media to shame them into paying',
    ],
    correctAnswer: 2,
    explanation:
      'The recommended escalation sequence is graduated: (1) a friendly reminder phone call or email; (2) a formal written reminder referencing the contract terms and payment due date; (3) a final notice giving a specific deadline (typically 7&ndash;14 days); (4) a "letter before action" (required before court proceedings); (5) small claims court (for debts under &pound;10,000 in England and Wales) or mediation. Each step is documented in writing. Jumping straight to legal action is expensive and disproportionate. Social media shaming can constitute defamation and is unprofessional. Turning up unannounced is intimidating and potentially unlawful.',
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function CCModule5Section4() {
  useSEO({
    title: 'Handling Difficult Conversations | Communication & Confidence Module 5.4',
    description:
      'Preparation framework, de-escalation techniques, delivering bad news, the money conversation, Thomas Gordon I-messages, and practical construction examples for cost overruns, unsafe behaviour, and unpaid invoices.',
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
            <Link to="../cc-module-5">
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
            <MessageSquareWarning className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Handling Difficult Conversations
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Preparation framework, de-escalation techniques, delivering bad news, the money
            conversation, and Thomas Gordon I-messages applied to real construction scenarios
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Preparation:</strong> Plan &rarr; Practise &rarr; Execute
              </li>
              <li>
                <strong>De-escalation:</strong> Acknowledge, lower voice, pause, restate facts
              </li>
              <li>
                <strong>I-messages:</strong> When [behaviour]&hellip; I feel&hellip; I need&hellip;
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Cost overruns:</strong> Evidence + honesty + options
              </li>
              <li>
                <strong>Unsafe work:</strong> Regulation reference + photographs + calm delivery
              </li>
              <li>
                <strong>Unpaid invoices:</strong> Graduated escalation with written records
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Apply the Plan, Practise, Execute preparation framework to structure difficult conversations',
              'Use Thomas Gordon I-messages to raise concerns without triggering defensiveness',
              'Demonstrate de-escalation techniques including acknowledgement, fogging, and the broken record',
              'Deliver bad news about cost overruns, delays, and non-compliant work professionally',
              'Conduct "the money conversation" with evidence, honesty, and options',
              'Follow a graduated escalation process for unpaid invoices',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 -- The Preparation Framework                      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            The Preparation Framework: Plan, Practise, Execute
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single biggest reason difficult conversations go badly is lack of preparation.
                Walking into a confrontation, a cost dispute, or a safety challenge without planning
                what you will say is like turning up to a first fix without a wiring diagram &mdash;
                you might get through it, but the result will be messy and take longer than it
                should.
              </p>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Three-Stage Framework
                </h3>
                <div className="space-y-4">
                  <div className="bg-black/20 rounded-lg p-4 border-l-4 border-rose-500">
                    <p className="text-rose-400 font-semibold text-sm mb-2">Stage 1: Plan</p>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Gather your facts.</strong> What specifically happened? What
                          evidence do you have (photographs, measurements, regulations, time
                          records, invoices)?
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Structure your key message.</strong> What is the one thing the
                          other person must understand by the end of this conversation?
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Anticipate their reaction.</strong> Will they be angry, upset,
                          defensive, dismissive? What questions will they ask? What objections will
                          they raise?
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Decide your outcome.</strong> What does success look like? What is
                          your minimum acceptable result? What is your BATNA (best alternative to a
                          negotiated agreement)?
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4 border-l-4 border-amber-500">
                    <p className="text-amber-400 font-semibold text-sm mb-2">Stage 2: Practise</p>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          <strong>Rehearse your opening line out loud.</strong> The first 10 seconds
                          set the tone for the entire conversation. Write it down and say it aloud
                          until it feels natural.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          <strong>Role-play if possible.</strong> Ask a trusted colleague or partner
                          to play the difficult person. Practise staying calm when they push back.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          <strong>Prepare for the worst case.</strong> What will you say if they
                          shout? If they cry? If they refuse to engage? Having a planned response
                          for the worst case prevents you from being ambushed by your own emotions.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-green-400 font-semibold text-sm mb-2">Stage 3: Execute</p>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Choose the right time and place.</strong> Never in front of
                          others, never at the end of a long shift, never when either party is
                          hungry or exhausted.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Deliver your planned opening.</strong> Use the exact words you
                          rehearsed. Stay calm. Speak at a measured pace.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Listen actively.</strong> After delivering your message, stop
                          talking and listen. Resist the urge to fill silence.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Confirm next steps.</strong> End with a clear agreement: who will
                          do what, by when? Follow up in writing.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 -- De-escalation Techniques                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            De-escalation Techniques
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When someone is angry, their prefrontal cortex (the rational, decision-making part
                of the brain) is effectively offline. Logical arguments will not land until the
                emotional intensity drops. De-escalation techniques are designed to bring the
                temperature down so that productive conversation can begin.
              </p>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <HandMetal className="h-4 w-4" />
                  Core De-escalation Toolkit
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                    <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium text-sm">Acknowledge the Emotion</p>
                      <p className="text-white text-xs">
                        &ldquo;I can see you&rsquo;re frustrated&rdquo; or &ldquo;I understand this
                        is not what you were expecting.&rdquo; Acknowledgement is not agreement
                        &mdash; it is validation. It tells the other person you have heard them,
                        which immediately reduces the urge to escalate.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                    <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium text-sm">
                        Lower Your Voice and Slow Down
                      </p>
                      <p className="text-white text-xs">
                        Mirror neurons mean that people unconsciously match the energy of the person
                        they are talking to. If you speak quietly and slowly, the other person will
                        gradually follow. If you match their volume, the conversation spirals
                        upward.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                    <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium text-sm">Allow a Pause</p>
                      <p className="text-white text-xs">
                        After acknowledging, stop talking. Let silence do the work. The urge to fill
                        silence is strong but resist it. A 5&ndash;10 second pause after
                        acknowledgement gives the other person space to process their emotions and
                        begin to calm down.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                    <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium text-sm">Fogging (Partial Agreement)</p>
                      <p className="text-white text-xs">
                        From Manuel J. Smith&rsquo;s assertiveness framework: agree with whatever
                        element of truth exists in the complaint without surrendering your position.
                        &ldquo;You&rsquo;re right that this has taken longer than planned, and I
                        want to explain why.&rdquo; This disarms the adversarial dynamic.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                    <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium text-sm">
                        Broken Record (Calm Repetition)
                      </p>
                      <p className="text-white text-xs">
                        When someone tries to derail, argue, or intimidate, calmly repeat your key
                        message without escalation: &ldquo;I understand your frustration, and the
                        regulation requires RCD protection on this circuit.&rdquo; Repeat as many
                        times as necessary, always in the same calm tone.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                    <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-white font-medium text-sm">Strategic Withdrawal</p>
                      <p className="text-white text-xs">
                        If the conversation becomes unproductive or threatening, it is perfectly
                        acceptable to pause: &ldquo;I want to resolve this. Let&rsquo;s take a break
                        and come back to it in an hour.&rdquo; Withdrawal is not weakness &mdash; it
                        is emotional intelligence. Return when both parties are calmer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* On-site warning */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <h3 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Safety First
                </h3>
                <p className="text-white text-sm">
                  <strong className="text-red-400">
                    If a conversation becomes physically threatening, leave immediately.
                  </strong>{' '}
                  No invoice, no regulation, no point of principle is worth your physical safety.
                  State calmly: &ldquo;I want to resolve this but I cannot continue right now. I am
                  going to leave.&rdquo; Document the incident and report it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 -- Thomas Gordon I-Messages (Revisited)           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Thomas Gordon I-Messages (Revisited)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You first encountered Thomas Gordon&rsquo;s I-message framework in Module 1. Here we
                revisit it specifically in the context of difficult conversations, because it is one
                of the most powerful tools for raising a concern without triggering a defensive
                reaction.
              </p>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-base font-bold text-rose-400 mb-4">The I-Message Formula</h3>
                <div className="space-y-3">
                  <div className="bg-black/20 rounded-lg p-4 border-l-4 border-rose-500">
                    <p className="text-rose-400 font-semibold text-sm">
                      &ldquo;When [specific, observable behaviour]&hellip;&rdquo;
                    </p>
                    <p className="text-white text-xs mt-1">
                      Describe what you see or hear without judgement, generalisation, or
                      accusation. Not &ldquo;you always&rdquo; or &ldquo;you never&rdquo; &mdash;
                      just the specific, observable fact.
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border-l-4 border-amber-500">
                    <p className="text-amber-400 font-semibold text-sm">
                      &ldquo;I feel / I worry / The effect is&hellip;&rdquo;
                    </p>
                    <p className="text-white text-xs mt-1">
                      State the tangible impact &mdash; on you, on the team, on safety, on the
                      project. Owning the impact (&ldquo;I worry&rdquo;) is less confrontational
                      than assigning blame (&ldquo;you are causing&rdquo;).
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-green-400 font-semibold text-sm">
                      &ldquo;I need / What I&rsquo;d like is&hellip;&rdquo;
                    </p>
                    <p className="text-white text-xs mt-1">
                      State clearly and specifically what you need to change. Not a vague wish but a
                      concrete, actionable request.
                    </p>
                  </div>
                </div>
              </div>

              {/* You-Message vs I-Message Comparison */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-rose-400" />
                  You-Message vs I-Message: Construction Examples
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-xs font-semibold mb-1">
                        You-Message (triggers defensiveness)
                      </p>
                      <p className="text-white text-sm italic">
                        &ldquo;You never clean up after yourself. The site is a tip because of
                        you.&rdquo;
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-green-400 text-xs font-semibold mb-1">
                        I-Message (invites cooperation)
                      </p>
                      <p className="text-white text-sm italic">
                        &ldquo;When materials are left on the walkway at the end of the day, I worry
                        about trip hazards for the early shift, and I need the area cleared before
                        you finish.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-xs font-semibold mb-1">You-Message</p>
                      <p className="text-white text-sm italic">
                        &ldquo;You&rsquo;ve wired this completely wrong. Don&rsquo;t you know the
                        regs?&rdquo;
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-green-400 text-xs font-semibold mb-1">I-Message</p>
                      <p className="text-white text-sm italic">
                        &ldquo;When I tested this circuit, I found the protective conductor is not
                        continuous. I&rsquo;m concerned it won&rsquo;t disconnect in a fault, and I
                        need us to trace and fix the break before we can sign it off.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-xs font-semibold mb-1">You-Message</p>
                      <p className="text-white text-sm italic">
                        &ldquo;You&rsquo;re always late and it&rsquo;s costing us money.&rdquo;
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-green-400 text-xs font-semibold mb-1">I-Message</p>
                      <p className="text-white text-sm italic">
                        &ldquo;When the start is delayed, the first fix schedule slips and I end up
                        working late to catch up. I need us both on site by 07:30 so we can finish
                        on programme.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 -- Delivering Bad News                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Delivering Bad News
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In construction, bad news is inevitable: cost overruns, delays, non-compliant work
                that needs redoing, failed tests, unforeseen problems behind walls and under floors.
                How you deliver bad news determines whether the client trusts you more afterward or
                never calls you again.
              </p>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  The Bad News Delivery Framework
                </h3>
                <div className="space-y-3">
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-rose-400 font-semibold text-sm">1. Lead with the headline</p>
                    <p className="text-white text-xs mt-1">
                      Do not bury the bad news in a long preamble. State the key fact clearly and
                      early: &ldquo;I&rsquo;ve found something that means the job will cost more
                      than quoted.&rdquo; The other person needs to know what the conversation is
                      about before they can process the detail.
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-rose-400 font-semibold text-sm">2. Explain the why</p>
                    <p className="text-white text-xs mt-1">
                      Immediately follow with a clear, factual explanation: &ldquo;When we lifted
                      the floorboards we found the existing wiring is aluminium, not copper, and it
                      all needs replacing.&rdquo; Show evidence &mdash; photographs, test results,
                      regulation references.
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-rose-400 font-semibold text-sm">3. Show the impact</p>
                    <p className="text-white text-xs mt-1">
                      Be specific about what this means: &ldquo;This adds approximately &pound;900
                      to the cost and two extra days to the programme.&rdquo; Vague bad news is
                      worse than specific bad news because the person imagines the worst.
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-rose-400 font-semibold text-sm">4. Offer options</p>
                    <p className="text-white text-xs mt-1">
                      Give the other person choices where possible: &ldquo;We can replace the full
                      run now for &pound;900, or replace only the affected section for &pound;450
                      &mdash; though I&rsquo;d recommend the full replacement for safety
                      reasons.&rdquo; Options give the person a sense of control.
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-rose-400 font-semibold text-sm">5. Confirm in writing</p>
                    <p className="text-white text-xs mt-1">
                      Follow up every bad-news conversation with a written summary: what was found,
                      what was agreed, revised cost, revised timescale. This protects both parties
                      and prevents &ldquo;I never agreed to that&rdquo; disputes later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 -- The Money Conversation                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            The Money Conversation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Money is the most common source of difficult conversations in construction. Whether
                it is a cost overrun, a disputed invoice, or negotiating payment terms, most
                electricians find money conversations uncomfortable. The preparation framework makes
                them significantly easier.
              </p>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <PoundSterling className="h-4 w-4" />
                  Construction Scenario: Cost Overrun
                </h3>
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <p className="text-white text-sm mb-3">
                    <strong>Situation:</strong> You quoted &pound;3,800 for a domestic rewire.
                    During the first fix, you discover concealed asbestos behind the old consumer
                    unit and significant water damage to the first-floor joists requiring additional
                    cable routing. The revised cost is &pound;5,200.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-amber-400">Prepare:</strong> Take photographs of the
                        asbestos and water damage. Get the asbestos survey report. Prepare an
                        itemised breakdown showing the original quote vs the revised figure.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-amber-400">Opening line:</strong> &ldquo;Mrs
                        Johnson, I&rsquo;ve found something during the rewire that I need to talk to
                        you about. We&rsquo;ve discovered asbestos behind the old consumer unit and
                        water damage on the first floor. This means additional work is needed and
                        the cost will be higher than quoted.&rdquo;
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-amber-400">Evidence:</strong> Show photographs on
                        your phone. Walk the customer to the affected area if safe. Explain in plain
                        language why the work is necessary.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-amber-400">Options:</strong> &ldquo;I can arrange
                        the asbestos removal and reroute the cables for &pound;5,200 total, or if
                        you prefer I can get a second quote for the asbestos removal so you can
                        compare. I&rsquo;m also happy to set up a payment plan if that helps.&rdquo;
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <PoundSterling className="h-4 w-4" />
                  Construction Scenario: Unpaid Invoice
                </h3>
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <p className="text-white text-sm mb-3">
                    <strong>Situation:</strong> A landlord owes you &pound;4,500 for an EICR and
                    remedial works on a block of flats. The invoice was due 30 days ago. Two email
                    reminders have been ignored.
                  </p>
                  <p className="text-white text-xs font-semibold mb-2">
                    Graduated Escalation Path:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                      <span className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        1
                      </span>
                      <div>
                        <p className="text-white font-medium text-xs">Friendly Reminder Call</p>
                        <p className="text-white text-xs">
                          &ldquo;Hi Mr Patel, I&rsquo;m just following up on invoice 1042 for the
                          EICR and remedial works at Maple Court. It was due on the 15th &mdash; is
                          everything okay with the payment?&rdquo;
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                      <span className="bg-amber-500/20 text-amber-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        2
                      </span>
                      <div>
                        <p className="text-white font-medium text-xs">Formal Written Reminder</p>
                        <p className="text-white text-xs">
                          A formal letter or email referencing the contract, the work completed, the
                          amount outstanding, and the original payment terms.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                      <span className="bg-orange-500/20 text-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        3
                      </span>
                      <div>
                        <p className="text-white font-medium text-xs">
                          Final Notice (7&ndash;14 days)
                        </p>
                        <p className="text-white text-xs">
                          A clear deadline: &ldquo;If payment of &pound;4,500 is not received by
                          [date], I will be left with no option but to pursue the debt through
                          formal channels.&rdquo;
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                      <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        4
                      </span>
                      <div>
                        <p className="text-white font-medium text-xs">Letter Before Action</p>
                        <p className="text-white text-xs">
                          A formal letter (required before court proceedings) stating your intention
                          to issue proceedings unless payment is received within 14 days. This must
                          comply with the Pre-Action Protocol for Debt Claims.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                      <span className="bg-purple-500/20 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        5
                      </span>
                      <div>
                        <p className="text-white font-medium text-xs">
                          Small Claims Court or Mediation
                        </p>
                        <p className="text-white text-xs">
                          For debts under &pound;10,000 in England and Wales, the small claims court
                          is straightforward and does not require a solicitor. Alternatively, trade
                          body mediation (NICEIC, NAPIT) can resolve disputes without court.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white text-xs">
                  <strong className="text-rose-400">Key rule:</strong> Keep written records of every
                  communication. Every phone call should be followed up with an email summarising
                  what was discussed. These records are essential evidence if the matter reaches
                  court.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 -- Scenario: Unsafe Behaviour on Site             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Scenario: Addressing Unsafe Behaviour
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Telling someone their work is unsafe or non-compliant is one of the hardest
                conversations in construction. It challenges their competence, costs them time and
                money, and can feel like a personal attack. The preparation framework and I-message
                formula are critical here.
              </p>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  Scenario: Subcontractor Has Installed Without RCD Protection
                </h3>
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-white text-sm mb-3">
                    <strong>Situation:</strong> A subcontractor has installed a shower circuit on a
                    new-build bathroom without 30&thinsp;mA RCD protection, contrary to BS 7671
                    Regulation 411.3.3. The circuit needs to be isolated and the protective device
                    replaced before the installation can be signed off.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-rose-400 font-semibold text-xs mb-1">
                        Step 1: Prepare your evidence
                      </p>
                      <p className="text-white text-xs">
                        Photograph the installation. Note the specific regulation reference (BS 7671
                        Regulation 411.3.3). Prepare a clear explanation of the safety risk in plain
                        language: a shower circuit without RCD protection means that if there is an
                        earth fault, the disconnection time may be too long to prevent a fatal
                        electric shock.
                      </p>
                    </div>
                    <div>
                      <p className="text-rose-400 font-semibold text-xs mb-1">
                        Step 2: I-message delivery
                      </p>
                      <p className="text-white text-xs italic">
                        &ldquo;When I inspected the shower circuit in bathroom 2, I found there is
                        no 30&thinsp;mA RCD protection. I&rsquo;m concerned because without it, the
                        disconnection time in a fault condition could be long enough to cause a
                        fatal shock. I need us to isolate the circuit and fit the correct protective
                        device before we can sign off the installation.&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="text-rose-400 font-semibold text-xs mb-1">
                        Step 3: If they push back
                      </p>
                      <p className="text-white text-xs">
                        Use the broken record: &ldquo;I understand this is frustrating and I know it
                        means extra work, but the regulation is clear and I cannot sign off the
                        installation without it.&rdquo; If they continue to refuse, escalate to the
                        site manager or principal contractor in writing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Scenario: Job Taking Longer Than Quoted
                </h3>
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-white text-sm mb-3">
                    <strong>Situation:</strong> You quoted three days for a kitchen and utility room
                    rewire. It is now day four and you still have a day&rsquo;s work left. The
                    customer is asking when you will be finished. The delay was caused by
                    discovering that all existing cables were run through asbestos artex that had to
                    be avoided.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-amber-400 font-semibold text-xs mb-1">
                        Honest, Early Communication
                      </p>
                      <p className="text-white text-xs">
                        The moment you realise the job will overrun, tell the customer. Do not wait
                        until the end of day three to say &ldquo;I need another two days.&rdquo;
                        Honesty at day two (&ldquo;I&rsquo;ve hit a problem and I want to let you
                        know early&rdquo;) builds far more trust than a surprise overrun
                        announcement.
                      </p>
                    </div>
                    <div>
                      <p className="text-amber-400 font-semibold text-xs mb-1">
                        Evidence and Explanation
                      </p>
                      <p className="text-white text-xs">
                        Show the customer the asbestos artex. Explain why you cannot disturb it and
                        why the cable routes must be changed. Customers accept delays when they
                        understand the reason &mdash; they do not accept delays when the reason is
                        hidden or unclear.
                      </p>
                    </div>
                    <div>
                      <p className="text-amber-400 font-semibold text-xs mb-1">
                        Revised Timeline and Cost
                      </p>
                      <p className="text-white text-xs">
                        Be specific: &ldquo;I need one additional day, so I will finish by Friday
                        afternoon. The extra day will add &pound;280 to the original quote because
                        of the additional routing required.&rdquo; Specific is always better than
                        vague.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Key Rules Summary                                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-rose-400" />
            Key Rules &mdash; Quick Reference
          </h3>
          <div className="bg-gradient-to-br from-rose-500/10 to-rose-400/10 border border-rose-500/20 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-rose-400 font-bold text-lg flex-shrink-0">1</span>
                <p className="text-white">
                  <strong className="text-rose-400">Prepare every time.</strong> Plan, Practise,
                  Execute &mdash; even 5 minutes of preparation transforms the outcome
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold text-lg flex-shrink-0">2</span>
                <p className="text-white">
                  <strong className="text-amber-400">De-escalate first, explain second.</strong>{' '}
                  Acknowledge the emotion before presenting the facts
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-green-400 font-bold text-lg flex-shrink-0">3</span>
                <p className="text-white">
                  <strong className="text-green-400">Use I-messages.</strong> &ldquo;When&hellip; I
                  feel&hellip; I need&hellip;&rdquo; keeps the focus on the problem, not the person
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-blue-400 font-bold text-lg flex-shrink-0">4</span>
                <p className="text-white">
                  <strong className="text-blue-400">Evidence beats opinion.</strong> Photographs,
                  regulation references, test results, and written records
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-purple-400 font-bold text-lg flex-shrink-0">5</span>
                <p className="text-white">
                  <strong className="text-purple-400">Offer options.</strong> Give the other person
                  choices wherever possible &mdash; options create a sense of control
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-cyan-400 font-bold text-lg flex-shrink-0">6</span>
                <p className="text-white">
                  <strong className="text-cyan-400">Confirm in writing.</strong> Every difficult
                  conversation should be followed up with a written summary
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-red-400 font-bold text-lg flex-shrink-0">7</span>
                <p className="text-white">
                  <strong className="text-red-400">Safety first.</strong> If a conversation becomes
                  threatening, leave. No money or principle is worth your physical safety
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 4 &mdash; Handling Difficult Conversations"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Completion Message                                           */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-gradient-to-br from-green-500/10 to-rose-500/10 border border-green-500/30 rounded-xl p-6 mt-10 text-center">
          <CheckCircle className="h-10 w-10 text-green-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">
            You&rsquo;ve completed all modules! Ready for the mock exam?
          </h3>
          <p className="text-white text-sm mb-4">
            You have worked through all five modules of the Communication &amp; Confidence course.
            The mock exam will test your knowledge across all modules with timed questions in exam
            conditions.
          </p>
          <Button
            className="min-h-[44px] bg-rose-500 hover:bg-rose-500/90 text-white font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-6">
              Start the Mock Exam
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-6">
              Next: Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
