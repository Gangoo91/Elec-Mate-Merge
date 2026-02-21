import {
  ArrowLeft,
  ArrowRight,
  Presentation,
  CheckCircle,
  HelpCircle,
  Users,
  MessageSquare,
  Lightbulb,
  Eye,
  ListChecks,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'speech-structure',
    question:
      'What is the classic three-part speech structure recommended by Toastmasters Pathways?',
    options: [
      'Introduction, Body, Conclusion',
      'Tell them what you will tell them, tell them, tell them what you told them',
      'Hook, Evidence, Call to Action',
      'Problem, Analysis, Solution',
    ],
    correctIndex: 1,
    explanation:
      "The Toastmasters Pathways programme recommends the classic three-part structure: 'Tell them what you will tell them' (preview your key points), 'Tell them' (deliver your content), and 'Tell them what you told them' (summarise and reinforce). This structure works because it leverages the primacy and recency effects — people remember what they hear first and last. It also reduces cognitive load by giving the audience a roadmap before the detail.",
  },
  {
    id: 'storytelling-impact',
    question:
      'Why is storytelling more effective than listing facts when presenting technical information to clients?',
    options: [
      'Stories are shorter and take less time to deliver',
      'Clients prefer entertainment over information',
      'Stories activate more areas of the brain, create emotional engagement, and are remembered far longer than isolated facts',
      'Storytelling avoids the need for technical accuracy',
    ],
    correctIndex: 2,
    explanation:
      "Neuroscience research (Paul Zak, Princeton University) demonstrates that stories trigger the release of oxytocin and cortisol, activating multiple brain regions simultaneously — not just the language processing centres that facts alone engage. This means stories create emotional engagement, build empathy, and are encoded into long-term memory far more effectively than isolated data points. In a construction context, explaining why a consumer unit upgrade matters through a real scenario ('Last month a family in Bristol had a fire because...') is dramatically more persuasive than listing regulation numbers.",
  },
  {
    id: 'reading-the-room',
    question:
      'What is the most important non-verbal signal to watch for when presenting to a client or group?',
    options: [
      'Whether they are wearing formal or casual clothing',
      'Eye contact, body orientation, and facial micro-expressions — signs of engagement or disengagement',
      'How many questions they ask during the first five minutes',
      'Whether they arrived on time to the meeting',
    ],
    correctIndex: 1,
    explanation:
      "Reading the room means continuously monitoring your audience's non-verbal signals: sustained eye contact indicates engagement; looking away, checking phones, or shifting posture indicates disengagement; furrowed brows suggest confusion; nodding suggests agreement. These cues tell you whether to speed up, slow down, add more detail, simplify your language, or pause and invite questions. Effective presenters adjust in real time based on what they observe, rather than ploughing through a prepared script regardless of audience response.",
  },
];

const faqs = [
  {
    question: 'How do I handle a client who keeps interrupting my presentation?',
    answer:
      "Interruptions are usually a sign that the client has an urgent concern or does not feel heard. Rather than viewing interruptions as rude, treat them as valuable information about what matters most to the client. Pause, acknowledge the question ('That is a great point — let me address that directly'), provide a concise answer, and then guide the conversation back: 'I will cover that in more detail in a moment, but the short answer is...' If a client is persistently interrupting, it often means your presentation structure does not match their priorities. Adapt: ask what they most want to know, address that first, and restructure on the fly. The goal is meeting the client's needs, not delivering your prepared script perfectly.",
  },
  {
    question: 'What if I lose my place during a presentation or go blank?',
    answer:
      "This happens to every presenter. The key is to have strategies ready so it does not become a crisis. First, pause — silence feels much longer to you than to the audience. Take a breath. If you have a summary slide or printed outline, glance at it. If not, summarise what you have covered so far: 'So we have looked at the current board, the proposed upgrade, and the timeline — let me now move on to...' This buys you time to re-orient. You can also ask the audience: 'Does anyone have a question about what we have covered so far?' This gives you breathing space while appearing engaged and professional. The audience is far more forgiving than you think — they are focused on the content, not judging your delivery.",
  },
  {
    question:
      'How much technical detail should I include when presenting to a non-technical client?',
    answer:
      "The answer depends entirely on the client. As a general rule, lead with outcomes and benefits ('This upgrade will protect your family and bring your installation up to current safety standards'), then offer technical detail as a secondary layer for those who want it ('The specific regulation is BS 7671 Regulation 411.3.3, which requires...'). Watch for cues: if the client nods along and seems satisfied with the outcome-level explanation, do not overload them with technical detail. If they ask 'Why?' or lean forward with interest, they want more depth — provide it. The skill is calibrating your level of technical detail to each individual client, not delivering the same script to everyone.",
  },
  {
    question:
      'How do I present a quote without the client feeling I am just trying to sell them something?',
    answer:
      "Present the quote as a transparent breakdown, not a sales pitch. Walk through each line item, explain what it covers and why it is necessary, and be upfront about where there is flexibility and where there is not. Use language like 'Here is what the work involves and what each element costs' rather than 'Here is what I am charging you.' If there are options at different price points, present all of them honestly with the pros and cons of each — including the option of not doing the work at all if it is genuinely optional. Clients trust electricians who educate rather than sell. When you help them understand what they are paying for and give them genuine choices, the price becomes secondary to the value.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the recommended structure from Toastmasters Pathways for a clear, memorable presentation?',
    options: [
      'Start with a joke, deliver the content, end with a question',
      'Tell them what you will tell them, tell them, tell them what you told them',
      'Open with a statistic, present five key points, close with a call to action',
      'Ask the audience what they want to hear, then improvise the content',
    ],
    correctAnswer: 1,
    explanation:
      "The three-part structure — preview, deliver, summarise — is the backbone of effective presentation. 'Tell them what you will tell them' sets expectations and reduces cognitive load. 'Tell them' delivers the substance. 'Tell them what you told them' reinforces key messages and leverages the recency effect. This structure has been taught in Toastmasters for decades because it consistently produces clear, memorable presentations regardless of topic or audience.",
  },
  {
    id: 2,
    question:
      'According to neuroscience research, why are stories more effective than facts alone when communicating with clients?',
    options: [
      'Stories are always shorter and more concise than factual explanations',
      'Stories activate multiple brain regions, trigger emotional engagement, and are retained in long-term memory more effectively',
      'Clients cannot understand technical facts without a narrative wrapper',
      'Stories allow the presenter to avoid needing accurate technical knowledge',
    ],
    correctAnswer: 1,
    explanation:
      "Research by Paul Zak and others has shown that narrative activates neural coupling — the listener's brain mirrors the speaker's brain patterns. Stories trigger the release of oxytocin (building trust and empathy) and cortisol (creating attention and focus). Facts alone activate only the language processing centres (Broca's and Wernicke's areas), while stories engage the motor cortex, sensory cortex, and frontal cortex simultaneously. This multi-region activation means stories are encoded more deeply and retained far longer than isolated data.",
  },
  {
    id: 3,
    question:
      'An electrician is presenting a quote for a consumer unit upgrade to a homeowner. Which approach is most effective?',
    options: [
      'Present the total price and ask for a decision immediately',
      'Walk through each line item transparently, explain what it covers and why it is necessary, and present options at different price points',
      'Focus entirely on the technical specifications of the new consumer unit',
      'Offer the lowest possible price to win the job, then add extras later',
    ],
    correctAnswer: 1,
    explanation:
      "Transparent, educational quote presentation builds trust and reduces price resistance. Walking through each line item shows the client what they are paying for and why. Presenting options at different price points gives the client agency and demonstrates that you are focused on their needs, not just maximising your fee. This approach reduces the client's self-orientation perception (they see you are working for them, not yourself) and increases their confidence in the value of the work.",
  },
  {
    id: 4,
    question:
      'During a site walkthrough with a client, you notice they are checking their phone and not engaging. The best response is to:',
    options: [
      'Continue with your prepared walkthrough and ignore the disengagement',
      'Stop speaking and wait silently until they put their phone away',
      'Pause, re-engage by asking a question relevant to their priorities, and adjust your approach based on what matters to them',
      'Speed up to finish the walkthrough as quickly as possible',
    ],
    correctAnswer: 2,
    explanation:
      "Disengagement signals that your current approach is not meeting the client's needs. Pausing and asking a targeted question — 'What is most important to you about this project?' or 'Is there a specific area you would like me to focus on?' — re-establishes engagement and gives you critical information about their priorities. This demonstrates reading the room in real time and adapting your delivery, which is a hallmark of confident, client-centred communication.",
  },
  {
    id: 5,
    question:
      'What is the most effective way to handle a question you cannot answer during a client presentation?',
    options: [
      'Guess an answer to maintain confidence and credibility',
      'Deflect by changing the subject to something you know about',
      'Be honest that you do not have the answer, commit to finding out, and follow up within a specific timeframe',
      'Tell the client the question is not relevant to the current discussion',
    ],
    correctAnswer: 2,
    explanation:
      "Honesty about the limits of your knowledge builds more trust than bluffing. Saying 'I do not have that information to hand, but I will find out and get back to you by tomorrow afternoon' demonstrates integrity, reliability (if you follow through), and low self-orientation (you prioritise accuracy over appearing omniscient). Guessing risks providing incorrect information, which destroys credibility — the most difficult Trust Equation component to rebuild once lost.",
  },
  {
    id: 6,
    question: 'When presenting design options to a client, the ideal approach is to:',
    options: [
      'Present only the option you prefer and explain why it is the best choice',
      'Present all viable options with honest pros, cons, and cost implications for each, and let the client make an informed decision',
      'Present the most expensive option first to anchor the price high',
      'Avoid presenting options and just tell the client what they need',
    ],
    correctAnswer: 1,
    explanation:
      "Presenting all viable options with honest analysis respects the client's autonomy, demonstrates low self-orientation, and builds trust. When you lay out the pros, cons, and costs transparently — including options that are less profitable for you — the client sees that you are working in their interest. This educational approach transforms the conversation from a sales interaction into a consultative partnership, which is far more likely to result in repeat business and referrals.",
  },
  {
    id: 7,
    question: 'A key principle of "reading the room" during a presentation is:',
    options: [
      'Deciding in advance how the audience will react and preparing responses',
      'Continuously monitoring non-verbal cues and adjusting your delivery, pace, and level of detail in real time',
      'Asking the audience to rate your performance on a scale of 1 to 10',
      'Maintaining the exact same pace and tone regardless of audience reaction',
    ],
    correctAnswer: 1,
    explanation:
      'Reading the room is a dynamic, real-time skill. It involves continuously observing non-verbal signals — eye contact (engagement vs disengagement), body language (leaning in vs crossing arms), facial expressions (nodding vs furrowed brows) — and adjusting accordingly. If you see confusion, slow down and simplify. If you see boredom, speed up or ask an engaging question. If you see interest, provide more depth. The best presenters treat every presentation as a conversation, not a monologue, and adapt to what the audience needs in the moment.',
  },
  {
    id: 8,
    question:
      'When telling a story to illustrate a technical point in a client conversation, the most important element is:',
    options: [
      'Making the story as long and detailed as possible to fill time',
      'Using complex technical terminology to demonstrate expertise',
      "Ensuring the story has a clear, relevant point that connects directly to the client's situation and reinforces your key message",
      'Including humour to keep the conversation light-hearted',
    ],
    correctAnswer: 2,
    explanation:
      "The power of a story lies in its relevance and clarity of purpose. Every story you tell in a professional context should have a clear point that connects directly to the client's situation. A concise story about a similar project, a safety incident that illustrates why a particular measure matters, or a real example of the difference between two design options is far more effective than a long, unfocused narrative. The story serves the message — the message does not serve the story. Ask yourself: 'What do I want the client to understand or feel after hearing this?' and build the story around that single purpose.",
  },
];

export default function CCModule3Section4() {
  useSEO({
    title: 'Presentations & Client Conversations | CC Module 3.4',
    description:
      'Toastmasters Pathways speech structure, storytelling for impact, reading the room, handling questions, and presenting to construction clients with confidence.',
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
            <Link to="../cc-module-3">
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
            <Presentation className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Presentations &amp; Client Conversations
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Structuring presentations that land, telling stories that persuade, reading the room in
            real time, and handling questions with confidence
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Structure:</strong> Tell them what you&rsquo;ll tell them, tell them, tell
                them what you told them
              </li>
              <li>
                <strong>Storytelling:</strong> Stories activate more brain regions and are
                remembered far longer than facts alone
              </li>
              <li>
                <strong>Adaptability:</strong> Read the room and adjust in real time &mdash; every
                presentation is a conversation
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Client Trust:</strong> How you present determines whether clients feel
                informed or sold to
              </li>
              <li>
                <strong>Career:</strong> Electricians who present well win more work, charge higher
                rates, and build stronger reputations
              </li>
              <li>
                <strong>Safety:</strong> Clear presentations prevent misunderstandings that lead to
                costly errors on site
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Apply the Toastmasters Pathways three-part speech structure to any presentation or client conversation',
              'Use storytelling techniques to make technical information engaging, memorable, and persuasive',
              'Read non-verbal audience cues and adjust delivery, pace, and detail level in real time',
              'Handle questions confidently, including questions you cannot immediately answer',
              'Structure and deliver a site walkthrough that builds client confidence and trust',
              'Present quotes and design options transparently in a way that educates rather than sells',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Toastmasters Pathways Speech Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Toastmasters Pathways Speech Structure
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Toastmasters International</strong>, founded in 1924, is the world&rsquo;s
                largest organisation dedicated to developing public speaking and leadership skills.
                Their <strong>Pathways</strong> programme, launched in 2018, provides a structured
                learning path that has trained millions of speakers worldwide. At the heart of the
                Pathways methodology is a deceptively simple speech structure that works for any
                audience, any topic, and any context.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Three-Part Structure</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      1. Tell Them What You Will Tell Them (Preview)
                    </p>
                    <p className="text-sm text-white">
                      Open by clearly stating what you are going to cover and why it matters. This
                      sets expectations, reduces cognitive load, and gives your audience a mental
                      roadmap. In a client conversation, this might be: &ldquo;I am going to walk
                      you through three things today: the current condition of your installation,
                      the work I am recommending, and what it will cost. By the end, you will have
                      everything you need to make a decision.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">2. Tell Them (Deliver)</p>
                    <p className="text-sm text-white">
                      Deliver your content in a logical sequence. Use clear transitions between
                      points (&ldquo;That covers the current condition &mdash; now let me explain
                      what I am recommending&rdquo;). Keep each point focused. Use examples,
                      analogies, and stories to make abstract or technical concepts concrete. In
                      construction, this is where you walk through the detail &mdash; the findings,
                      the options, the reasoning behind your recommendations.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      3. Tell Them What You Told Them (Summarise)
                    </p>
                    <p className="text-sm text-white">
                      Close by summarising your key points and reinforcing the most important
                      message. This leverages the <strong>recency effect</strong> &mdash; people
                      remember what they hear last. In a client conversation: &ldquo;So to
                      summarise: the installation needs a consumer unit upgrade for safety
                      compliance, I have given you two options at different price points, and I can
                      start next Tuesday. What questions do you have?&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Why This Structure Works</p>
                <p className="text-sm text-white mb-3">
                  Cognitive psychology research explains why this structure is so effective:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Primacy effect:</strong> People remember what they hear first. Your
                      preview primes the audience for what is coming and anchors the key messages
                      early.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Recency effect:</strong> People remember what they hear last. Your
                      summary reinforces the key messages at the point where retention is highest.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reduced cognitive load:</strong> When the audience knows the structure
                      in advance, they can focus on understanding the content rather than trying to
                      figure out where the presentation is going.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Repetition without redundancy:</strong> Hearing the key messages three
                      times (preview, detail, summary) dramatically increases retention without
                      feeling repetitive because each pass serves a different purpose.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                This structure scales to any length &mdash; from a two-minute explanation at a
                consumer unit to a 30-minute formal presentation to a project team. The principle is
                always the same: set expectations, deliver the substance, reinforce the key
                messages.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Storytelling for Impact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Storytelling for Impact
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Human beings are wired for stories. For 100,000 years before writing existed, every
                piece of important knowledge &mdash; survival skills, cultural values, technical
                know-how &mdash; was transmitted through narrative. Modern neuroscience confirms
                what our ancestors knew instinctively: stories are the most powerful communication
                tool we have.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Neuroscience of Storytelling
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Research by <strong>Paul Zak</strong> (Claremont Graduate University) and teams at{' '}
                  <strong>Princeton University</strong> has revealed what happens in the brain when
                  we hear a story versus when we hear isolated facts:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Facts alone</strong> activate only Broca&rsquo;s and Wernicke&rsquo;s
                      areas (language processing). The brain decodes the words but does not{' '}
                      <em>experience</em> them.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Stories</strong> activate the motor cortex, sensory cortex, frontal
                      cortex, and limbic system simultaneously. The brain <em>simulates</em> the
                      experience as though it were happening.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Neural coupling:</strong> The listener&rsquo;s brain patterns begin to
                      mirror the speaker&rsquo;s brain patterns &mdash; literally getting on the
                      same wavelength.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Oxytocin release:</strong> Stories that create tension and resolution
                      trigger oxytocin, the &ldquo;trust hormone&rdquo;, making the listener more
                      empathetic and more likely to take action.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The STAR Framework for Construction Stories
                </p>
                <p className="text-sm text-white mb-3">
                  When telling a story in a professional context, use the <strong>STAR</strong>{' '}
                  framework to keep it focused and purposeful:
                </p>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">S &mdash; Situation:</strong> Set the scene
                      briefly. &ldquo;Last year I was called to a property in Leeds&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">T &mdash; Task:</strong> What needed to be
                      done? &ldquo;The homeowner wanted a full rewire but was concerned about
                      disruption and cost&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">A &mdash; Action:</strong> What did you do?
                      &ldquo;I walked them through the installation room by room, showed them
                      exactly what would happen, and gave them two phased options&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">R &mdash; Result:</strong> What was the
                      outcome? &ldquo;They chose the phased approach, the work went smoothly, and
                      they have since referred three neighbours to me.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Facts vs Stories: A Side-by-Side Comparison
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Facts Only</p>
                    <p className="text-sm text-white">
                      &ldquo;A consumer unit upgrade is required under BS 7671. The existing unit
                      does not have RCD protection. The cost is &pound;1,200 including
                      materials.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      Result: Technically accurate but emotionally flat. The client hears a
                      regulation number, a technical term, and a price. No urgency, no context, no
                      connection.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Story + Facts</p>
                    <p className="text-sm text-white">
                      &ldquo;Last month I worked on a property very similar to yours. The homeowner
                      had the same type of consumer unit &mdash; no RCD protection. They had been
                      living with it for years without knowing the risk. I explained what an RCD
                      does: if a fault occurs, it cuts the power in milliseconds, before anyone gets
                      hurt. They went ahead with the upgrade and told me afterwards they sleep
                      better knowing their family is protected.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      Result: The client sees themselves in the story. The technical information is
                      embedded in a human context. The urgency and value are felt, not just
                      understood.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The key principle is that every story must have a{' '}
                <strong>clear, relevant point</strong> that connects directly to the client&rsquo;s
                situation. Stories without purpose are anecdotes; stories with purpose are
                persuasion. Before telling any story, ask yourself: &ldquo;What do I want the client
                to understand or feel after hearing this?&rdquo; and build the narrative around that
                single objective.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Reading the Room */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Reading the Room
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The difference between a good presenter and a great presenter is not the quality of
                their prepared material &mdash; it is their ability to{' '}
                <strong>read the room</strong> and adapt in real time. A great presenter treats
                every presentation as a conversation, continuously monitoring the audience&rsquo;s
                response and adjusting accordingly.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Non-Verbal Cues to Watch For</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Engagement Signals</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Sustained eye contact &mdash; they are focused on you</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Leaning forward &mdash; they are interested and want more</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Nodding &mdash; they agree or understand</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Taking notes &mdash; they value what you are saying</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Asking questions &mdash; they are actively processing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Disengagement Signals</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Looking away or checking phone &mdash; you are losing them</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Leaning back or crossing arms &mdash; resistance or boredom</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Furrowed brows &mdash; confusion or disagreement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Fidgeting or shifting posture &mdash; restlessness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Glazed expression &mdash; information overload or lost thread</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Real-Time Adjustments: What to Do When You Read the Signals
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>If you see confusion:</strong> Stop and check understanding.
                      &ldquo;Let me explain that differently&rdquo; or &ldquo;Does that make sense
                      so far?&rdquo; Simplify your language. Use an analogy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>If you see boredom:</strong> Speed up, skip detail, ask an engaging
                      question, or move to the part they care about most. &ldquo;Let me jump ahead
                      to the part that affects you directly.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>If you see resistance:</strong> Acknowledge it openly. &ldquo;I can
                      see you have concerns about this &mdash; what is on your mind?&rdquo;
                      Addressing resistance directly is far more effective than ignoring it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>If you see high engagement:</strong> Lean into it. Provide more depth,
                      slow down, give examples. This is where persuasion happens &mdash; when the
                      audience is actively with you.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>If one person dominates and others disengage:</strong> Direct
                      questions to the quieter members. &ldquo;What are your thoughts on
                      this?&rdquo; This redistributes engagement and ensures all stakeholders are
                      heard.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Reading the room is a skill that improves with practice. Start by making a conscious
                effort to observe your audience during every conversation &mdash; not just formal
                presentations but everyday interactions on site. Over time, this observation becomes
                automatic, and you develop an intuitive sense of when to adjust your approach.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Handling Questions with Confidence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Handling Questions with Confidence
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Questions are not interruptions &mdash; they are engagement. When someone asks a
                question, it means they are actively thinking about what you have said and want to
                understand more. The ability to handle questions well is one of the most visible
                markers of confidence and competence in any professional setting.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The PAUSE Framework for Handling Questions
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">P &mdash; Pause:</strong> Take a beat before
                      answering. This gives you time to think and signals that you are taking the
                      question seriously. Rushing to answer often produces a worse response than
                      pausing for two seconds.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">A &mdash; Acknowledge:</strong> Validate the
                      question. &ldquo;That is a really good question&rdquo; or &ldquo;I am glad you
                      asked that&rdquo;. This makes the questioner feel heard and buys you another
                      second of thinking time.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">U &mdash; Understand:</strong> Make sure you
                      have understood the question correctly. If there is any ambiguity, clarify:
                      &ldquo;Just to make sure I am answering the right thing &mdash; are you asking
                      about the cost of the materials or the total including labour?&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">S &mdash; State:</strong> Deliver your
                      answer clearly and concisely. Do not ramble. If the answer is complex,
                      structure it: &ldquo;There are two parts to that&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">E &mdash; Ensure:</strong> Check that you
                      have answered the question satisfactorily. &ldquo;Does that answer your
                      question, or would you like me to go into more detail?&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Handling Difficult Question Types
                </p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Questions you cannot answer:</strong> Be honest. &ldquo;I do not have
                      that information to hand, but I will find out and get back to you by [specific
                      time].&rdquo; Then follow through. This builds credibility and reliability
                      simultaneously.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Hostile or challenging questions:</strong> Stay calm and treat the
                      question with respect regardless of tone. Separate the emotion from the
                      content. &ldquo;I understand your concern. Let me address that
                      directly.&rdquo; Never become defensive &mdash; it escalates the situation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Off-topic questions:</strong> Acknowledge and redirect. &ldquo;That is
                      an interesting point &mdash; it is slightly outside what we are discussing
                      today, but I am happy to cover it separately afterwards.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Questions that expose a genuine issue:</strong> Do not deflect.
                      Acknowledge the issue, explain what you know, and commit to a resolution.
                      Trying to minimise a legitimate concern destroys trust instantly.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Construction Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Construction Applications: Walkthroughs, Options &amp; Quotes
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Everything covered in this section &mdash; speech structure, storytelling, reading
                the room, and handling questions &mdash; comes together in three core construction
                scenarios: site walkthroughs with clients, explaining design options, and presenting
                quotes. These are the moments where your communication skills directly determine
                whether a client trusts you, chooses you, and refers you.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Scenario 1: The Site Walkthrough
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A site walkthrough is your opportunity to build trust by showing the client what
                  you see, explaining it in terms they understand, and demonstrating that you are
                  thorough and transparent.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-white mb-2">Walkthrough Structure</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Preview:</strong> &ldquo;I am going to walk you through the
                        installation area by area. I will show you what I have found, explain what
                        needs attention, and outline your options.&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Walk and talk:</strong> Move through each area, pointing out
                        findings. Use plain language: &ldquo;This is your consumer unit &mdash;
                        think of it as the brain of your electrics&rdquo; rather than jargon. Tell
                        relevant stories: &ldquo;I saw a similar setup last month
                        where&hellip;&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Pause and check:</strong> At each area, read the client. Are they
                        following? Concerned? Bored? Adjust accordingly.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Summarise:</strong> At the end, recap the key findings and
                        recommended actions. &ldquo;So the three main items are&hellip;&rdquo;
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Scenario 2: Explaining Design Options
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  When a client has choices &mdash; consumer unit type, lighting layout, smart home
                  integration, cable routing &mdash; the way you present those options determines
                  how confident they feel in their decision.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Present all viable options</strong> &mdash; not just the one you
                      prefer or the most expensive. Include pros, cons, and cost for each.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Be honest about trade-offs.</strong> &ldquo;Option A is cheaper
                      upfront but will cost more to run. Option B costs more initially but saves
                      money over five years.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Make a recommendation, but respect their choice.</strong> &ldquo;If it
                      were my home, I would go with Option B &mdash; but Option A is perfectly safe
                      and meets all requirements. It is your decision.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use stories and analogies</strong> to make technical differences
                      tangible. &ldquo;Think of RCBOs like individual fuses for each circuit &mdash;
                      if one trips, everything else stays on.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Presentation className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Scenario 3: Presenting a Quote
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A quote is not just a number &mdash; it is a presentation. How you present it
                  determines whether the client sees a price or sees value.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-white mb-2">
                    Quote Presentation Structure
                  </p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Context first:</strong> Remind them of the findings and the agreed
                        scope before revealing any numbers.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Walk through line by line:</strong> Explain what each item covers
                        and why it is necessary. Never present a lump sum without a breakdown.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Be transparent about what is included:</strong> Materials, labour,
                        testing, certification, making good, waste removal. No surprises.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Present options if applicable:</strong> &ldquo;Here is the essential
                        work at &pound;X, and here is the enhanced option at &pound;Y which also
                        includes&hellip;&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Invite questions:</strong> &ldquo;What questions do you have about
                        any of these items?&rdquo; Not &ldquo;Is that OK?&rdquo; which invites a
                        yes/no response.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-white mt-3">
                  The goal is to educate, not to sell. When a client understands exactly what they
                  are paying for and why, price objections become rare. Transparency is the most
                  powerful sales tool an electrician has.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Bringing It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Bringing It All Together
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> Effective presentations and
                  client conversations are built on structure (tell them three times), storytelling
                  (engage the whole brain), reading the room (adapt in real time), and handling
                  questions (with honesty and composure). These are not separate skills &mdash; they
                  work together. Structure gives you confidence, storytelling creates connection,
                  reading the room ensures relevance, and question-handling demonstrates expertise
                  and integrity.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Your Presentation &amp; Client Conversation Toolkit
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Three-Part Structure:</strong> Preview, deliver, summarise. Use it for
                      every presentation, walkthrough, and client conversation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>STAR Stories:</strong> Situation, Task, Action, Result. Keep stories
                      focused, relevant, and connected to the client&rsquo;s situation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Read the Room:</strong> Watch for engagement and disengagement
                      signals. Adapt your pace, depth, and approach in real time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>PAUSE for Questions:</strong> Pause, Acknowledge, Understand, State,
                      Ensure. Handle every question with composure.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Educate, Do Not Sell:</strong> Present quotes and options
                      transparently. Help clients understand value, not just price.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Be Honest:</strong> If you do not know, say so and follow up.
                      Integrity in client conversations builds the kind of trust that generates
                      referrals.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                This is the final section of Module 3: Speaking with Confidence. You have now
                covered the four pillars of confident speaking: understanding where confidence comes
                from, overcoming speaking anxiety, delivering effective toolbox talks, and
                presenting to clients with structure and impact. Together, these skills equip you to
                communicate with confidence in any professional situation &mdash; from a one-to-one
                client conversation to a formal presentation to a room full of people.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Moving to Module 4:</strong> In the next module,
                  you will explore Negotiation &amp; Persuasion &mdash; the skills that enable you
                  to influence outcomes, resolve disputes, and advocate effectively for yourself and
                  your clients. The communication and presentation skills you have developed in
                  Module 3 provide the essential foundation for what comes next.
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
            <Link to="../cc-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4-section-1">
              Continue to Module 4
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
