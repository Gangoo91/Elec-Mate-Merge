import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, MessageSquare, Shield, Clock, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "dc-avoidance",
    question: "What typically happens when a leader avoids a difficult conversation about a team member's poor behaviour?",
    options: [
      "The problem resolves itself naturally over time without intervention",
      "The behaviour becomes ingrained, other team members lose respect for the leader, and small issues escalate into formal grievances",
      "The team member realises their mistake and corrects their own behaviour",
      "Other team members step in and manage the situation on the leader's behalf"
    ],
    correctIndex: 1,
    explanation: "Avoidance ALWAYS makes things worse. Unaddressed behaviour becomes ingrained because the person assumes it is acceptable. Other team members see the inaction, lose respect for the leader, and either replicate the behaviour or become resentful. Small issues that could have been resolved with a quiet word escalate into formal grievances, disciplinary proceedings, or team-wide conflict."
  },
  {
    id: "dc-desc-d",
    question: "In the DESC model for difficult conversations, what does the 'D' (Describe) step require you to do?",
    options: [
      "Describe how the behaviour makes you feel before stating the facts",
      "Describe the person's character and attitude to help them understand your concern",
      "Describe the specific behaviour objectively, using facts, dates, and examples without judgement",
      "Describe what other team members have been saying about the person"
    ],
    correctIndex: 2,
    explanation: "The 'D' in DESC stands for Describe the behaviour objectively. This means stating specific, observable facts without judgement or character assessment. For example: 'Dave, on the last three Mondays — the 5th, 12th, and 19th — you arrived at 7:50, twenty minutes after the 7:30 start time.' This is factual, specific, and inarguable. It is NOT 'You're always late' (vague) or 'You're lazy' (judgement)."
  },
  {
    id: "dc-preparation",
    question: "When preparing for a difficult conversation, which of the following should a leader do?",
    options: [
      "Have the conversation immediately while the emotion is still fresh to show urgency",
      "Raise the issue publicly in the next team briefing so everyone hears the same message",
      "Plan the timing, choose a private location, gather specific facts, check your own emotions, and decide on the desired outcome",
      "Send a text message or email to avoid the discomfort of a face-to-face discussion"
    ],
    correctIndex: 2,
    explanation: "Preparation is essential. Never wing a difficult conversation. Plan when (not Friday afternoon, not when you or they are stressed), where (private — never publicly), what (specific facts and examples, not vague accusations), and the desired outcome. Check your own emotions — if you are angry, wait until you have calmed down. Going in unprepared or emotionally charged almost always makes the situation worse."
  }
];

const faqs = [
  {
    question: "What if the person gets angry or aggressive during the conversation?",
    answer: "Stay calm. Do not match their energy. Lower your voice slightly (this naturally de-escalates). Acknowledge the emotion: 'I can see this is frustrating for you.' If they become verbally abusive or threatening, calmly end the conversation: 'I want to discuss this properly, but I need us both to be calm. Let's take a break and come back to this in an hour.' Never continue a conversation where you feel unsafe or where the other person is too emotional to listen. You have a right to pause it. Document what happened and, if necessary, involve your line manager or HR. Under ACAS guidance, if the behaviour constitutes gross misconduct (threats of violence, for example), you may need to move directly to the formal disciplinary process rather than continuing informally."
  },
  {
    question: "How do I raise a hygiene issue without humiliating someone?",
    answer: "Hygiene conversations are among the most difficult because they feel deeply personal. The key is absolute privacy — no one else should be within earshot. Be direct but compassionate: 'I need to raise something sensitive with you, and I want you to know I'm doing this because I respect you. I've noticed a body odour issue on a few occasions this week. I don't know the cause, and it might be something medical or personal, and that's completely fine. But I wanted to mention it privately rather than let it become something others comment on.' Offer support: 'Is there anything going on that I can help with?' Many hygiene issues have underlying causes — medication, living conditions, mental health, financial hardship — so approach with empathy, not judgement. If the issue persists after an initial conversation, follow up privately and consider whether occupational health involvement would be appropriate."
  },
  {
    question: "Should I document difficult conversations, and what should that look like?",
    answer: "Yes, always document. After the conversation, make a brief written note of: the date and time, who was present, what was discussed, what was agreed, and any follow-up actions with deadlines. This is not about building a case against someone — it is about having a clear record so that both parties know what was agreed, and so that if the issue continues, there is documented evidence that it was addressed informally before any formal process begins. The ACAS Code of Practice expects organisations to show they have attempted informal resolution before moving to formal procedures, so your notes become crucial evidence. Keep notes factual and objective. A simple follow-up email confirming the agreed actions is good practice: 'Just to confirm what we discussed today — [summary of agreed actions]. Let me know if I've missed anything.' Store notes securely and in line with your organisation's data protection policies."
  },
  {
    question: "What if I have a difficult conversation and the person's behaviour doesn't change?",
    answer: "Follow up on the date you agreed. If the behaviour has not improved, have a second conversation referencing the previous one: 'We discussed this on [date] and agreed [actions]. I've noticed that [specific examples of continued behaviour]. What's happened since our last conversation?' Listen to their response — there may be genuine barriers you can help with. If the behaviour still does not change after a reasonable period and a second informal conversation, it is time to escalate to the formal process. Under the ACAS Code of Practice, this means a formal investigation, a written invitation to a disciplinary hearing with at least 48 hours' notice, the right to be accompanied by a trade union representative or work colleague, and a formal hearing where the evidence is presented. This is not a failure on your part — you gave the person a fair opportunity to improve, documented it, and followed up. The formal process exists precisely for situations where informal approaches have not worked. Speak to your HR department or line manager before initiating the formal stage."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When a leader avoids addressing a team member's poor timekeeping, the most likely outcome is:",
    options: [
      "The team member improves once they realise they are being watched",
      "The behaviour becomes ingrained, the team loses respect for the leader, and the problem escalates",
      "Other team members naturally correct the behaviour through peer pressure",
      "The issue resolves itself within two to three weeks without intervention"
    ],
    correctAnswer: 1,
    explanation: "Avoidance always makes it worse. The team member assumes the behaviour is acceptable because no one has said otherwise. Other team members see the double standard, lose respect for the leader, and either replicate the behaviour or become resentful. Small issues that could have been resolved with a quiet word escalate into formal grievances or team-wide conflict."
  },
  {
    id: 2,
    question: "The DESC model for difficult conversations was developed by:",
    options: [
      "Stephen Covey",
      "Daniel Goleman",
      "Sharon and Gordon Bower",
      "Gerard Egan"
    ],
    correctAnswer: 2,
    explanation: "The DESC model was developed by Sharon Anthony Bower and Gordon H. Bower in their book 'Asserting Yourself.' It provides a structured, four-step framework for assertive communication: Describe, Express, Specify, Consequences."
  },
  {
    id: 3,
    question: "In the DESC model, the correct order of steps is:",
    options: [
      "Demand, Explain, Suggest, Conclude",
      "Describe, Express, Specify, Consequences",
      "Discuss, Evaluate, Summarise, Close",
      "Define, Empathise, State, Confirm"
    ],
    correctAnswer: 1,
    explanation: "DESC stands for: Describe the behaviour objectively, Express how it affects you using 'I' statements, Specify what you need to change, and outline the Consequences (both positive if they comply and negative if they do not). This structured approach keeps conversations factual, fair, and focused on a clear path forward."
  },
  {
    id: 4,
    question: "Which of the following is the best example of the 'Describe' step in DESC?",
    options: [
      "'You're always late and it's really disrespectful to the rest of the team.'",
      "'Dave, on the last three Mondays you arrived at 7:50, twenty minutes after the 7:30 start time.'",
      "'Everyone has noticed that you can't be bothered to turn up on time.'",
      "'Your timekeeping is terrible and it needs to sort itself out.'"
    ],
    correctAnswer: 1,
    explanation: "The Describe step requires objective, specific, factual statements. 'Dave, on the last three Mondays you arrived at 7:50, twenty minutes after the 7:30 start time' states specific dates, specific times, and a specific gap — all inarguable facts. The other options contain judgements ('disrespectful', 'can't be bothered', 'terrible'), generalisations ('always', 'everyone'), and vague language that the person can dispute."
  },
  {
    id: 5,
    question: "When preparing for a difficult conversation, a leader should:",
    options: [
      "Have the conversation immediately while emotions are high to demonstrate urgency",
      "Raise the issue in front of the team so everyone understands the standards",
      "Plan the timing, location, specific facts, desired outcome, and check their own emotional state",
      "Send an email instead to avoid the discomfort of a face-to-face discussion"
    ],
    correctAnswer: 2,
    explanation: "Preparation is essential. Plan: when (not Friday afternoon, not when you or they are stressed), where (private, never publicly), what (specific facts and examples), and the desired outcome. Check your own emotions — if you are angry, wait until you have calmed down. Going in unprepared or emotionally charged almost always makes the situation worse."
  },
  {
    id: 6,
    question: "During a difficult conversation, the leader should:",
    options: [
      "Do most of the talking to make sure the message is clear and unambiguous",
      "Stay calm, stick to facts, use 'I' language, listen to the other person's side, and end with clear agreed actions",
      "Raise their voice if the person is not listening to show they are serious",
      "Bring another team member as a witness to apply additional pressure"
    ],
    correctAnswer: 1,
    explanation: "During the conversation, the leader should stay calm, stick to factual observations, use 'I' language rather than accusatory 'you always' statements, listen to the other person's perspective, maintain composure, allow silence, and end with clear, agreed actions and a follow-up date. The goal is resolution, not punishment."
  },
  {
    id: 7,
    question: "Under the ACAS Code of Practice, before moving to formal disciplinary action an employer should:",
    options: [
      "Issue an immediate written warning to demonstrate seriousness",
      "Attempt to resolve the issue informally first, with documented conversations and agreed improvement actions",
      "Suspend the employee without pay until the investigation is complete",
      "Gather statements from colleagues without telling the employee about the complaint"
    ],
    correctAnswer: 1,
    explanation: "The ACAS Code of Practice on Disciplinary and Grievance Procedures recommends that employers attempt to resolve issues informally wherever possible before moving to formal procedures. This means having documented informal conversations, setting clear expectations, agreeing improvement actions, and giving the person a reasonable opportunity to improve. Only if informal resolution fails should the formal process begin."
  },
  {
    id: 8,
    question: "The 'C' in the DESC model — Consequences — should include:",
    options: [
      "Only the negative consequences if the behaviour continues, to create urgency",
      "A threat of immediate dismissal to show the seriousness of the situation",
      "Both the positive outcome if the behaviour improves and the formal process that follows if it does not",
      "A comparison with other team members who perform better"
    ],
    correctAnswer: 2,
    explanation: "The Consequences step should include both sides: the positive outcome ('Sort it now and there's no issue — clean slate') and the escalation path ('If it continues, I'll need to start the formal process'). This is fair, transparent, and gives the person a genuine choice. Threatening immediate dismissal is disproportionate for a first conversation, and comparing with others is demoralising and unhelpful."
  }
];

export default function LeadershipModule3Section3() {
  useSEO({
    title: "Having Difficult Conversations | Leadership Module 3.3",
    description: "The DESC model for assertive communication, preparing for and conducting difficult conversations, and handling common challenging situations on construction sites.",
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
            <Link to="../leadership-module-3">
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
            <MessageSquare className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Having Difficult Conversations
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to address problems directly using a structured, fair approach &mdash; and why the conversations you dread most are the ones your team needs you to have
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Core truth:</strong> Avoiding difficult conversations ALWAYS makes it worse</li>
              <li><strong>DESC model:</strong> Describe, Express, Specify, Consequences</li>
              <li><strong>Preparation:</strong> Never wing it &mdash; plan when, where, what, outcome</li>
              <li><strong>Key rule:</strong> Timely, private, factual, fair</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Stay calm:</strong> Facts and &ldquo;I&rdquo; language, not &ldquo;you always&rdquo;</li>
              <li><strong>Listen:</strong> Hear their side before deciding next steps</li>
              <li><strong>ACAS:</strong> Informal first, formal only when informal has failed</li>
              <li><strong>Follow up:</strong> Agreed actions with a review date every time</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why avoiding difficult conversations always escalates the problem",
              "Apply the DESC model (Describe, Express, Specify, Consequences) to structure a difficult conversation",
              "Prepare effectively for a difficult conversation by planning timing, location, facts, and desired outcome",
              "Conduct a difficult conversation using calm, factual, 'I' language while listening to the other person's perspective",
              "Identify the most common difficult conversations that arise on construction sites, including sensitive issues like substance misuse and mental health",
              "Understand the ACAS Code of Practice and know when to escalate from informal to formal processes"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Leaders Cannot Avoid Difficult Conversations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Leaders Cannot Avoid Difficult Conversations
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every leader dreads them. The conversation where you have to tell someone their work
                is not good enough, their behaviour is unacceptable, or their attitude is dragging
                the team down. The temptation to avoid, delay, or hope the problem resolves itself
                is enormous. But here is the truth that every experienced leader knows:
                <strong> avoiding a difficult conversation ALWAYS makes it worse</strong>.
              </p>

              <p>
                Research from the Chartered Institute of Personnel and Development (CIPD) consistently
                shows that managers who delay addressing performance and conduct issues spend significantly
                more time dealing with the fallout than they would have spent having the original
                conversation. What starts as a two-minute quiet word becomes a two-month formal
                investigation. The cost of avoidance is always greater than the discomfort of the
                conversation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">The Cost of Avoidance</p>
                <p className="text-base text-white leading-relaxed">
                  <em>&ldquo;The conversation you are avoiding is the one your team most needs you
                  to have.&rdquo;</em>
                </p>
              </div>

              <p>
                When you avoid addressing a problem, several things happen &mdash; all of them bad:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Happens When You Avoid</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The behaviour becomes ingrained</strong> &mdash; If nobody says anything, the person assumes their behaviour is acceptable. Why would they change something that nobody has flagged as a problem? Every day you leave it, it becomes more &ldquo;normal&rdquo; and harder to challenge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Small problems escalate to formal grievances</strong> &mdash; A quiet word on day three could have resolved it. By week six, it has become a pattern. By month three, other team members are filing complaints and HR is involved. What could have been a two-minute conversation is now a formal disciplinary process costing time, money, and morale.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The team sees your inaction and loses respect</strong> &mdash; Your team is watching. They see the poor behaviour. They see you doing nothing about it. They draw one of two conclusions: either you do not care, or you are too weak to deal with it. Both destroy your credibility as a leader.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Others replicate the behaviour</strong> &mdash; If Dave gets away with turning up 20 minutes late every Monday, why should anyone else bother being on time? Unchallenged poor behaviour sets a new, lower standard for the entire team.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your best people leave</strong> &mdash; High performers do not tolerate working alongside people who are not pulling their weight, especially when the leader refuses to deal with it. They will find a team where standards are maintained.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Your own stress increases</strong> &mdash; Unresolved issues do not go away. They sit in the back of your mind, draining your energy. The longer you leave it, the bigger the issue feels in your head, and the harder it becomes to address. Early action reduces your own stress as well as the team&rsquo;s.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Safety-Critical Avoidance</p>
                </div>
                <p className="text-sm text-white">
                  When the difficult conversation involves <strong>unsafe behaviour</strong>, avoidance
                  is not just a leadership failure &mdash; it is a <strong>duty of care failure</strong>.
                  Under the Health and Safety at Work Act 1974, employers and their representatives have
                  a legal duty to take reasonable steps to ensure the safety of workers. If you see someone
                  working unsafely and say nothing, you are complicit in the risk. The next time they take
                  that shortcut, someone could be seriously injured or killed. The discomfort of a difficult
                  conversation is nothing compared to the weight of knowing you could have prevented an
                  accident.
                </p>
              </div>

              <p>
                The good news is this: difficult conversations get <strong>easier with practice</strong>.
                They are never comfortable &mdash; anyone who says they enjoy them is either lying or
                lacks empathy &mdash; but they become manageable when you have a clear structure, good
                preparation, and the right mindset. That structure is the DESC model.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The DESC Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The DESC Scripting Model (Sharon &amp; Gordon Bower)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>DESC model</strong> was developed by Sharon Anthony Bower and Gordon H. Bower
                in their book <em>Asserting Yourself</em>. It provides a structured, four-step scripting
                framework for having assertive conversations that are factual, fair, and focused on a clear
                path forward. It is one of the most widely taught communication models in leadership training
                &mdash; featured across ILM Level 2, CIPD qualifications, and ACAS management guidance &mdash;
                because it works. On site, in the office, and in everyday life.
              </p>

              <p>
                The word &ldquo;scripting&rdquo; is important. DESC gives you a <strong>script</strong> to
                follow so that you know exactly what to say before you open your mouth. You are not
                improvising. You are not relying on finding the right words in the moment. You prepare
                your four statements in advance, practise them if needed, and deliver them calmly and
                clearly. This removes the biggest source of anxiety in difficult conversations: not
                knowing what to say.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Four Steps of DESC</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-lg mb-1">D</p>
                    <p className="text-white font-medium mb-1">Describe the Behaviour</p>
                    <p>State the specific, observable behaviour using facts, dates, and examples. No judgement, no interpretation, no character assessment. Just what happened. Stick to what you saw, heard, or can prove.</p>
                    <div className="mt-2 bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                      <p className="text-xs text-white"><strong>Example:</strong> &ldquo;Dave, on the last three Mondays &mdash; the 5th, 12th, and 19th &mdash; you arrived at 7:50, twenty minutes after the 7:30 start time.&rdquo;</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-lg mb-1">E</p>
                    <p className="text-white font-medium mb-1">Express the Impact</p>
                    <p>Use &ldquo;I&rdquo; statements to explain how the behaviour affects you, the team, the project, or the work. This is about impact, not blame. Express your concern, not your anger.</p>
                    <div className="mt-2 bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                      <p className="text-xs text-white"><strong>Example:</strong> &ldquo;I&rsquo;m concerned because I&rsquo;m having to redistribute your first-fix tasks to the rest of the team, and it&rsquo;s not fair on them. It&rsquo;s also putting us behind programme.&rdquo;</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-lg mb-1">S</p>
                    <p className="text-white font-medium mb-1">Specify What You Need</p>
                    <p>Make a clear, specific, achievable request. Not vague (&ldquo;sort it out&rdquo;) but precise and measurable. The person should know exactly what &ldquo;success&rdquo; looks like.</p>
                    <div className="mt-2 bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                      <p className="text-xs text-white"><strong>Example:</strong> &ldquo;I need you on site, tools ready, at 7:30 every morning. That&rsquo;s the standard for the whole team and I need you to meet it.&rdquo;</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-lg mb-1">C</p>
                    <p className="text-white font-medium mb-1">Consequences</p>
                    <p>Outline both the positive outcome if they comply and the escalation path if they do not. This is fair, transparent, and gives the person a genuine choice about what happens next.</p>
                    <div className="mt-2 bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                      <p className="text-xs text-white"><strong>Example:</strong> &ldquo;Sort it now and there&rsquo;s no issue &mdash; clean slate, we move on. If it continues, I&rsquo;ll need to start the formal process, and neither of us wants that.&rdquo;</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Full DESC Script &mdash; In One Flow</p>
                </div>
                <p className="text-sm text-white leading-relaxed">
                  &ldquo;Dave, on the last three Mondays you&rsquo;ve arrived at 7:50, twenty minutes
                  after the 7:30 start. <strong>[D]</strong> I&rsquo;m concerned because I&rsquo;m
                  redistributing your tasks and it&rsquo;s putting pressure on the lads. It&rsquo;s
                  also putting us behind on the programme. <strong>[E]</strong> I need you here at 7:30,
                  tools ready, same as everyone else. <strong>[S]</strong> Get it sorted now and
                  there&rsquo;s no issue &mdash; clean slate. If it carries on, I&rsquo;ll have to go
                  formal, and I&rsquo;d rather not do that. <strong>[C]</strong>&rdquo;
                </p>
              </div>

              <p>
                Notice what this approach achieves: it is <strong>structured</strong> (you know exactly
                what to say), <strong>factual</strong> (no vague accusations, only specific observable
                behaviour), <strong>fair</strong> (the person knows exactly what the problem is and
                what they need to do), and it offers a <strong>clear path forward</strong> (both the
                positive and negative outcomes are transparent). There is no ambiguity, no room for
                &ldquo;I didn&rsquo;t know what you meant,&rdquo; and no personal attack.
              </p>

              <p>
                The entire conversation takes <strong>less than two minutes</strong>. That is the
                power of preparation and structure. You are not rambling, not repeating yourself, not
                getting sidetracked. You deliver your four points, pause, and listen. Most people
                respond well to this approach because it is obviously fair.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Mistakes When Using DESC</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Being vague in the Describe step</strong> &mdash; &ldquo;You&rsquo;re always late&rdquo; is not a description. It is a generalisation the person can dispute. &ldquo;Always&rdquo; is almost never true, and the person will focus on the one time they were on time to disprove your point. Use dates, times, and specifics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Using &ldquo;you&rdquo; accusations in the Express step</strong> &mdash; &ldquo;You&rsquo;re making everyone&rsquo;s life difficult&rdquo; puts them on the defensive immediately. Use &ldquo;I&rdquo; statements: &ldquo;I&rsquo;m concerned because&hellip;&rdquo;, &ldquo;I&rsquo;ve noticed that&hellip;&rdquo;, &ldquo;I need&hellip;&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Making the Specify step too vague</strong> &mdash; &ldquo;Sort yourself out&rdquo; is not specific. What does &ldquo;sorted&rdquo; look like? &ldquo;I need you on site at 7:30&rdquo; is specific, measurable, and inarguable. The person knows exactly what is expected.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Only stating negative consequences</strong> &mdash; &ldquo;Do it or you&rsquo;re in trouble&rdquo; feels threatening and backs the person into a corner. Always include the positive first: &ldquo;Sort it now and there&rsquo;s no issue &mdash; clean slate.&rdquo; Give them something to aim for, not just something to fear.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Delivering it aggressively</strong> &mdash; The DESC model is assertive, not aggressive. The tone should be calm, firm, and professional. If you deliver a perfectly structured DESC script while shouting, pointing, or being sarcastic, the structure is meaningless. Tone carries the message.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Preparing for the Conversation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Preparing for the Conversation
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single biggest mistake leaders make with difficult conversations is <strong>winging
                it</strong>. They get frustrated, storm over, and say whatever comes into their head.
                The result is usually a mess &mdash; they say things they regret, they forget important
                points, the other person gets defensive, and the conversation achieves nothing except
                making the relationship worse.
              </p>

              <p>
                <strong>Never wing a difficult conversation.</strong> Preparation is what separates a
                productive discussion from an argument. Even five minutes of structured thinking before
                you open your mouth makes an enormous difference. The ILM Level 2 leadership framework
                specifically identifies preparation as the most critical factor in successful performance
                management conversations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Preparation Checklist</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">When?</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Not Friday afternoon &mdash; they stew over the weekend</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Not first thing Monday &mdash; sets a negative tone for the week</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Not when either of you is stressed, rushed, or angry</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Early in the week, at a natural break, when you are both calm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>As soon as reasonably practicable &mdash; do not let it drag on for weeks</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Where?</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span><strong>Private</strong> &mdash; always, without exception</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Away from the team &mdash; the cabin, a quiet corner, off site</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Never in front of other workers &mdash; public humiliation destroys trust</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Somewhere the person can react without being observed by colleagues</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">What?</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Write down the specific facts &mdash; dates, times, examples</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Have at least two or three concrete examples ready</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Separate fact from opinion &mdash; only use facts you can evidence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Prepare your DESC script &mdash; know your opening line word for word</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Desired Outcome?</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>What do you want to be different after this conversation?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Be specific: &ldquo;On site at 7:30&rdquo; not &ldquo;better timekeeping&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Is the outcome achievable and realistic for this person?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>How will you follow up and measure improvement?</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Check Your Own Emotions First</p>
                </div>
                <p className="text-sm text-white">
                  Before you have the conversation, <strong>check yourself</strong>. Are you angry? Are
                  you frustrated? Are you taking this personally? If the answer to any of these is yes,
                  <strong> wait</strong>. A difficult conversation conducted in anger is not a difficult
                  conversation &mdash; it is an argument. You will say things you regret, the other person
                  will become defensive, and you will achieve nothing. Give yourself time to cool down.
                  Go for a walk. Sleep on it if necessary. The conversation will still be there tomorrow,
                  and you will handle it far better when you are calm. The only exception is an immediate
                  safety issue, which must be stopped in the moment regardless of your emotional state.
                </p>
              </div>

              <p>
                A well-prepared five-minute conversation achieves more than an unprepared thirty-minute
                argument. The preparation is the work. The conversation itself should be straightforward
                if you have done the thinking beforehand. Many experienced leaders keep a small notebook
                in their pocket for jotting down the key points before they initiate a difficult conversation
                &mdash; even if it is just four bullet points matching the DESC framework.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: During the Conversation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            During the Conversation &mdash; and What Comes After
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You have prepared. You have your facts. You are calm. Now it is time to have the
                conversation. Here are the principles that will keep it on track and make it
                productive rather than destructive.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Rules of Engagement</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stay calm</strong> &mdash; Your tone sets the tone of the entire conversation. If you are calm, the other person is more likely to stay calm. If you raise your voice, they will raise theirs. Breathe. Speak slowly and deliberately. Keep your body language open.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stick to facts</strong> &mdash; Use your prepared DESC script. State the specific behaviour with dates, times, and examples. Do not exaggerate. Do not use words like &ldquo;always&rdquo; or &ldquo;never&rdquo; &mdash; they invite argument because they are almost never literally true.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Use &ldquo;I&rdquo; language, not &ldquo;you&rdquo; accusations</strong> &mdash; &ldquo;I&rsquo;ve noticed&rdquo;, &ldquo;I&rsquo;m concerned&rdquo;, &ldquo;I need&rdquo; keeps it professional. &ldquo;You always&rdquo;, &ldquo;You never&rdquo;, &ldquo;You&rsquo;re being&rdquo; triggers instant defensiveness and turns a conversation into a confrontation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Listen to their side</strong> &mdash; After you have stated the issue, pause and let them respond. There may be a genuine reason you are not aware of. Family problems. Health issues. A misunderstanding. A skills gap. You will not know unless you ask and genuinely listen to the answer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Do not get drawn into arguments</strong> &mdash; If they become defensive, argumentative, or try to deflect (&ldquo;Well, what about Steve, he does it too&rdquo;), calmly bring it back: &ldquo;I hear that, and I&rsquo;ll address other issues separately. Right now, I&rsquo;m talking to you about this specific thing.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Never make personal attacks</strong> &mdash; Address the behaviour, never the person. &ldquo;Your timekeeping needs to improve&rdquo; is about behaviour. &ldquo;You&rsquo;re lazy&rdquo; is a personal attack. The first can be discussed; the second destroys the relationship.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Maintain composure</strong> &mdash; If they get angry, do not match their energy. Lower your voice slightly. Stay seated if you are sitting. Do not cross your arms. Calm presence de-escalates conflict. If they become aggressive or threatening, end the conversation and resume later.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Allow silence</strong> &mdash; After you state the issue or ask a question, resist the urge to fill the silence. Silence gives the other person time to process and respond. It is uncomfortable, but it is powerful. Many people will open up more during silence than when questioned.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Ending the Conversation</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Every difficult conversation must end with <strong>three things</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-rose-400 font-bold text-lg mb-1">1</p>
                    <p className="text-white font-medium mb-1">Clear Agreed Actions</p>
                    <p className="text-white text-xs">What specifically is going to change? &ldquo;On site at 7:30 every day.&rdquo; Not vague promises.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-rose-400 font-bold text-lg mb-1">2</p>
                    <p className="text-white font-medium mb-1">A Follow-Up Date</p>
                    <p className="text-white text-xs">When will you review progress? &ldquo;Let&rsquo;s catch up in two weeks on the 3rd.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-rose-400 font-bold text-lg mb-1">3</p>
                    <p className="text-white font-medium mb-1">A Positive Close</p>
                    <p className="text-white text-xs">&ldquo;I appreciate you hearing me out. I know you can sort this. Let&rsquo;s move forward.&rdquo;</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">The Power of the Positive Close</p>
                <p className="text-sm text-white">
                  Ending on a positive note is not about being soft &mdash; it is about being smart.
                  The person has just received difficult feedback. How you end the conversation determines
                  whether they walk away motivated to change or resentful and resistant. A simple
                  &ldquo;I believe in you, I know you can sort this&rdquo; or &ldquo;Thanks for hearing
                  me out, let&rsquo;s draw a line under it and move forward&rdquo; costs nothing and
                  dramatically increases the chance of a positive outcome.
                </p>
              </div>

              <p className="text-white font-medium text-lg mt-6">After the Conversation: Documenting and Following Up</p>

              <p>
                The conversation itself is only half the job. What you do <strong>afterwards</strong> is
                equally important. Too many leaders have a good conversation and then fail to follow through,
                which means the whole effort is wasted.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">After Every Difficult Conversation</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Document it immediately</strong> &mdash; Write a brief note of the date, time, what was discussed, what was agreed, and the follow-up date. Do this within the hour while it is fresh. Keep the note factual and objective &mdash; this is not a diary entry, it is a record.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Send a confirmation</strong> &mdash; A short email or message to the person confirming the agreed actions: &ldquo;Hi Dave, just to confirm what we discussed today &mdash; [summary of agreed actions and follow-up date]. Let me know if I&rsquo;ve missed anything.&rdquo; This creates a shared record and avoids any &ldquo;I didn&rsquo;t agree to that&rdquo; later on.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Follow up on the agreed date</strong> &mdash; This is critical. If you set a review date and then forget about it, the person concludes you were not serious. Put it in your diary and keep the appointment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Acknowledge improvement</strong> &mdash; If the behaviour has improved at the follow-up, say so. &ldquo;I&rsquo;ve noticed you&rsquo;ve been on site at 7:30 every day for the last two weeks. Appreciate it.&rdquo; Positive reinforcement cements the change.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Maintain the relationship</strong> &mdash; After a difficult conversation, do not avoid the person or treat them differently. Be normal. Be professional. Show that a difficult conversation does not damage your working relationship &mdash; it strengthens it.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Common Difficult Conversations on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Common Difficult Conversations on a Construction Site
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every site leader will face the same set of difficult conversations throughout their
                career. Knowing how to apply the DESC approach to each makes them far more manageable.
                Here are the most common scenarios and specific guidance for handling each one.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Most Common Difficult Conversations on Site</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">1. Poor Timekeeping and Attendance</p>
                    <p className="text-white mb-2">The most frequent issue on any site. Arrives late, extended breaks, leaves early, frequent unexplained absences, pattern absences (always off on Mondays or Fridays).</p>
                    <p className="text-white text-xs"><strong>DESC approach:</strong> &ldquo;On [dates], you clocked in at [times]. [D] I&rsquo;m having to cover your tasks, which puts pressure on the team and delays the programme. [E] I need you here at [time] every day, ready to work. [S] Get it right and we move on &mdash; clean slate. If it continues, I&rsquo;ll need to follow the formal absence management process. [C]&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">2. Poor Workmanship</p>
                    <p className="text-white mb-2">Sloppy installation, not following drawings, cutting corners on quality, not meeting the specification.</p>
                    <p className="text-white text-xs"><strong>DESC approach:</strong> &ldquo;The cable routing in the riser on level 3 does not match the specification &mdash; the clips are at 400mm spacing instead of 300mm. [D] I&rsquo;m concerned because it will fail QA and need ripping out, which costs time and money. [E] I need everything to match the spec going forward &mdash; if you are unsure about anything, ask before you install. [S] Do that and we&rsquo;re golden &mdash; no issue. [C]&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">3. Unsafe Behaviour (MOST SAFETY-CRITICAL)</p>
                    <p className="text-white mb-2">Not wearing PPE, bypassing isolations, working at height without protection, horseplay, not following method statements.</p>
                    <div className="bg-red-500/10 border border-red-500/20 p-2 rounded mt-2">
                      <p className="text-white text-xs"><strong>This one is different.</strong> Unsafe behaviour must be stopped <strong>immediately in the moment</strong>: &ldquo;Stop. Put your harness on now.&rdquo; Safety cannot wait for a planned conversation. Once the immediate danger is removed, then address it formally using DESC. Depending on severity, this may go straight to formal disciplinary. A deliberate safety violation (removing a lock-off, for example) may constitute gross misconduct.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">4. Conflict Between Team Members</p>
                    <p className="text-white mb-2">Two or more workers in conflict &mdash; arguments, refusal to work together, bullying, intimidation.</p>
                    <p className="text-white text-xs"><strong>Approach:</strong> Speak to each person separately first. Establish the facts from both sides without taking sides. Then, if appropriate, bring them together: &ldquo;I&rsquo;ve spoken to both of you individually. Here is what I need going forward &mdash; [specific expectations]. I don&rsquo;t need you to be best mates, but I do need you to work together professionally and respectfully.&rdquo; If the conflict involves bullying or harassment, follow your organisation&rsquo;s formal grievance process.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">5. Personal Hygiene</p>
                    <p className="text-white mb-2">Body odour, dirty clothing, poor personal hygiene affecting colleagues.</p>
                    <p className="text-white text-xs"><strong>Approach:</strong> Absolute privacy &mdash; no one else within earshot. Direct but compassionate: &ldquo;I need to raise something sensitive. I&rsquo;ve noticed a body odour issue and I wanted to mention it privately rather than let it become something others comment on.&rdquo; Offer support. Many hygiene issues have underlying causes &mdash; medication, housing, mental health, financial hardship. Never humiliate. This is a welfare conversation, not a disciplinary one.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-orange-400 font-semibold mb-1">6. Suspected Substance Misuse</p>
                    <p className="text-white mb-2">Signs of alcohol or drug use &mdash; smell of alcohol, erratic behaviour, impaired coordination, bloodshot eyes, personality changes.</p>
                    <div className="bg-orange-500/10 border border-orange-500/20 p-2 rounded mt-2">
                      <p className="text-white text-xs"><strong>Safety first.</strong> If someone is impaired on site, remove them from work immediately &mdash; they are a danger to themselves and others. Do not accuse them of being drunk or on drugs. Say: &ldquo;I&rsquo;m concerned about your fitness to work safely today. I need you to stop work and come with me.&rdquo; Follow your organisation&rsquo;s substance misuse policy. Many companies offer support through occupational health or Employee Assistance Programmes (EAP). Substance misuse may be a symptom of deeper issues &mdash; approach with concern, not condemnation.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">7. Mental Health Concerns</p>
                    <p className="text-white mb-2">A team member showing signs of poor mental health &mdash; withdrawal, mood changes, loss of concentration, increased absence, uncharacteristic behaviour.</p>
                    <div className="bg-green-500/10 border border-green-500/20 p-2 rounded mt-2">
                      <p className="text-white text-xs"><strong>This is a welfare conversation, not a performance conversation.</strong> Approach privately and with genuine care: &ldquo;I&rsquo;ve noticed you don&rsquo;t seem yourself recently. I&rsquo;m not prying, but I wanted to check in and see if there&rsquo;s anything going on that I can help with.&rdquo; You do not need to be a counsellor. Your job is to notice, ask, listen, and signpost to support. Know your organisation&rsquo;s mental health resources, the Construction Industry Helpline (0345 605 1956), and the Samaritans (116 123). In construction, men are three times more likely to die by suicide than the national average. Noticing and asking could save a life.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Golden Rule for All Difficult Conversations</p>
                </div>
                <p className="text-sm text-white">
                  Whatever the issue, the same four principles apply: <strong>Timely</strong> &mdash;
                  deal with it early, do not let it fester. <strong>Private</strong> &mdash; never in
                  front of others. <strong>Factual</strong> &mdash; specific examples, not vague
                  accusations. <strong>Fair</strong> &mdash; hear their side, offer support, give a
                  clear path to improvement. Get these four right and you will handle 90% of difficult
                  conversations effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: ACAS, Escalation, and Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            The ACAS Code of Practice, Escalation, and Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                As a site leader, you need to understand the boundary between <strong>informal resolution</strong>
                and <strong>formal disciplinary or grievance processes</strong>. The ACAS Code of Practice on
                Disciplinary and Grievance Procedures is the framework that governs this in the UK. Employment
                tribunals are legally required to take the ACAS Code into account when considering cases, so
                following it protects both the employee and the organisation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The ACAS Code of Practice &mdash; Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Informal resolution first</strong> &mdash; Wherever possible, issues should be resolved informally through conversation, coaching, and agreed improvement actions before any formal process is started. This is where your DESC conversations sit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Formal investigation</strong> &mdash; If informal approaches have not worked, the issue must be properly investigated before any disciplinary hearing. This means gathering evidence, speaking to witnesses, and establishing the facts objectively.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Written notification</strong> &mdash; The employee must receive written notice of the allegation and the evidence against them, with enough time to prepare their response (at least 48 hours before any hearing).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Right to be accompanied</strong> &mdash; At any formal disciplinary or grievance hearing, the employee has a legal right to be accompanied by a trade union representative or a work colleague of their choice.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Fair hearing</strong> &mdash; The employee must have the opportunity to state their case, present evidence, and ask questions before any decision is made.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Right of appeal</strong> &mdash; The employee must have the right to appeal any formal disciplinary decision. The appeal should be heard by someone who was not involved in the original decision where possible.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">When to Escalate: Informal vs Formal</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-2">Stay Informal When:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>This is the first time you are raising the issue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>The issue is minor or moderate (timekeeping, attitude, workmanship)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>The person is likely to respond positively to a conversation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>There are no previous documented incidents of the same issue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>There are possible underlying causes you need to understand</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-2">Escalate to Formal When:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Informal conversations have already taken place and the behaviour has not changed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>The issue is serious (gross misconduct, serious safety violation, theft, violence)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>There is a pattern of repeated poor behaviour despite previous informal interventions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>The behaviour puts others at risk and requires immediate formal action</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>You need to involve HR, your line manager, or occupational health</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Know Your Limits</p>
                </div>
                <p className="text-sm text-white">
                  As a site leader or supervisor, your role in the formal process is usually to <strong>report
                  and provide evidence</strong>, not to conduct disciplinary hearings yourself. If an issue
                  needs to go formal, speak to your line manager or HR department. Provide your documented
                  notes from the informal conversations, the specific evidence, and your recommendations.
                  Do not try to run a formal process without guidance &mdash; getting it wrong can expose
                  your organisation to unfair dismissal claims.
                </p>
              </div>

              <p className="text-white font-medium text-lg mt-6">Section Summary</p>

              <p>
                Difficult conversations are an unavoidable part of leadership. You cannot lead a team
                without occasionally addressing behaviour that falls below the standard. The leaders
                who earn the most respect are not those who avoid conflict &mdash; they are those who
                deal with issues early, fairly, and professionally.
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Avoidance fails:</strong> Ignoring problems makes them worse &mdash; behaviour becomes ingrained, the team loses respect, and small issues become formal grievances</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>DESC model:</strong> Describe the behaviour, Express the impact, Specify what you need, outline the Consequences &mdash; structured, factual, and fair</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Preparation is essential:</strong> Plan the when, where, what, and desired outcome. Check your emotions. Never wing it</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>During the conversation:</strong> Stay calm, stick to facts, use &ldquo;I&rdquo; language, listen, do not argue, allow silence, end with clear actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>After the conversation:</strong> Document outcomes immediately, send a confirmation, follow up on the agreed date, acknowledge improvement, maintain the relationship</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Common scenarios:</strong> Timekeeping, workmanship, unsafe behaviour, conflict, hygiene, substance misuse, and mental health concerns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>ACAS Code:</strong> Informal first, then formal investigation, written notification, right to be accompanied, fair hearing, right of appeal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Four principles:</strong> Timely, private, factual, fair &mdash; get these right and you will handle the vast majority of difficult conversations effectively</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 4, we move from spoken
                  to written communication &mdash; how to write clear site instructions, emails,
                  reports, and method statements that leave no room for misunderstanding.
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
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-3-section-4">
              Next: Written Communication
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
