import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Heart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh3s2-algee-stands-for",
    question: "What does the ALGEE acronym stand for in Mental Health First Aid?",
    options: [
      "Assess, Listen, Guide, Encourage, Evaluate",
      "Approach/Assess/Assist, Listen non-judgementally, Give reassurance and information, Encourage professional help, Encourage other supports",
      "Ask, Learn, Gather, Educate, Empower",
      "Acknowledge, Locate, Get help, Engage, Exit safely"
    ],
    correctIndex: 1,
    explanation: "ALGEE stands for: Approach, Assess and Assist with any crisis; Listen non-judgementally; Give reassurance and information; Encourage appropriate professional help; and Encourage other supports. Developed by Betty Kitchener and Tony Jorm as part of the Mental Health First Aid programme, ALGEE provides a structured, evidence-based framework for supporting someone experiencing a mental health problem or crisis."
  },
  {
    id: "mh3s2-non-judgemental-listening",
    question: "What is the MOST important element of non-judgemental listening in the ALGEE framework?",
    options: [
      "Giving the person detailed advice on how to solve their problem",
      "Telling the person about a time when you experienced something similar",
      "Suspending your own opinions and reactions to create a safe space where the person feels heard without being evaluated or criticised",
      "Maintaining complete silence and never speaking throughout the entire conversation"
    ],
    correctIndex: 2,
    explanation: "Non-judgemental listening means temporarily setting aside your own opinions, reactions, and urge to advise, in order to create a safe emotional space where the person feels they can share without being evaluated, criticised, or judged. This does not mean you agree with everything they say — it means you prioritise understanding their experience over expressing your own views. This is often the most powerful and healing part of the ALGEE process."
  },
  {
    id: "mh3s2-encourage-professional",
    question: "When encouraging someone to seek professional help (the 'E' in ALGEE), what is the BEST approach?",
    options: [
      "Tell them firmly that they need to see a doctor immediately or you will report them",
      "Gently explain what professional help options look like, address their fears, and support them in making their own choice about next steps",
      "Book a GP appointment for them without their knowledge to make sure they attend",
      "Tell them that professional help is unnecessary because talking to you is sufficient"
    ],
    correctIndex: 1,
    explanation: "Encouraging professional help should always be done gently and with respect for the person's autonomy. This means explaining what options are available (GP, counselling, therapy, helplines), addressing common fears (it is not a sign of weakness, GP conversations are confidential, treatment works), and supporting them in making their own informed choice. Forcing, threatening, or making decisions for someone undermines their sense of control — which is often already compromised by their mental health problem."
  }
];

const faqs = [
  {
    question: "Do I have to follow the ALGEE steps in exact order?",
    answer: "No — ALGEE is a framework, not a rigid script. In real conversations, the steps often overlap or occur in a different order. You might start listening (L) before you have formally 'approached' (A), or you might find yourself giving reassurance (G) while still listening. The value of ALGEE is that it gives you a structured way to think about what the person needs, ensuring you cover all the essential elements. Think of it as a checklist rather than a recipe — you want to make sure all the elements are present, but the order and emphasis will vary depending on the person and situation."
  },
  {
    question: "What should I do if there is an immediate danger or crisis when I approach someone?",
    answer: "If someone is in immediate danger — for example, they are at risk of self-harm, they are in a state of extreme distress, or they have expressed active suicidal intent with a plan — your first priority is safety. Stay calm. Do not leave the person alone if you believe they are at immediate risk. Remove or secure any means of harm if you can do so safely. Call 999 if there is an immediate threat to life. Call the Samaritans on 116 123 for guidance. You do not need to handle a crisis alone. The 'Assist with any crisis' part of the first A in ALGEE specifically covers this: safety always comes first, and getting emergency help is always the right call when someone's life may be at risk."
  },
  {
    question: "What if the person does not want professional help?",
    answer: "This is common, especially in construction where there can be stigma around seeking help. Respect their decision — you cannot force someone to get help (except in cases of immediate danger to life). Instead, keep the door open: 'That is completely your choice. Just know that if you ever change your mind, I will help you find what you need.' Continue to be a supportive presence. Sometimes people need to hear the encouragement several times before they feel ready. You might also gently address specific fears: 'Seeing your GP is completely confidential — your employer will not know.' or 'Counselling is not about lying on a couch — it is a practical conversation about what is going on.' Planting seeds of possibility can make all the difference."
  },
  {
    question: "Is ALGEE only for mental health emergencies?",
    answer: "No — ALGEE is designed for the full spectrum of mental health situations, from everyday stress and low mood through to acute crisis. In fact, it is often most powerful when used early, before a situation becomes a crisis. You can use the ALGEE framework to support a colleague who seems a bit down, a friend going through a difficult time, or a team member who is not coping well with pressure. The framework scales naturally: for mild situations, you might focus primarily on listening and reassurance; for more serious situations, you will place greater emphasis on assessing for crisis and encouraging professional help."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The ALGEE action plan was developed as part of which internationally recognised programme?",
    options: [
      "The NHS Mental Health Strategy",
      "Mental Health First Aid (MHFA), developed by Betty Kitchener and Tony Jorm",
      "The World Health Organisation's Mental Health Action Plan",
      "The Construction Industry Training Board's Wellbeing Programme"
    ],
    correctAnswer: 1,
    explanation: "The ALGEE action plan was developed by Betty Kitchener and Professor Tony Jorm as the core framework of the Mental Health First Aid (MHFA) programme, which originated in Australia in 2000 and has since been adopted in over 25 countries worldwide, including the UK. It is recognised as an international gold standard for providing initial support to someone experiencing a mental health problem."
  },
  {
    id: 2,
    question: "The first 'A' in ALGEE stands for 'Approach, Assess and Assist.' When approaching someone you are concerned about, which of the following is MOST important?",
    options: [
      "Approaching them during a busy team meeting so others can provide support too",
      "Choosing an appropriate time and private place where the person feels safe and not exposed",
      "Sending a formal email to arrange a scheduled meeting to discuss their mental health",
      "Approaching them immediately regardless of the situation because time is critical"
    ],
    correctAnswer: 1,
    explanation: "When approaching someone you are concerned about, choosing the right time and place is crucial. A private, quiet setting where the person will not feel exposed or embarrassed is essential. On a construction site, this might mean catching them during a quiet moment, walking to the van together, or having a chat away from the rest of the team. A public approach in front of colleagues can feel confrontational and is likely to trigger a defensive reaction."
  },
  {
    id: 3,
    question: "When assessing the situation (part of the first 'A'), what is the FIRST thing you should determine?",
    options: [
      "Whether the person has a diagnosed mental health condition",
      "Whether there is an immediate danger or crisis that requires emergency intervention",
      "Whether the person's work performance has been affected",
      "Whether the person's supervisor has already been informed"
    ],
    correctAnswer: 1,
    explanation: "The first priority when assessing a situation is always safety: is there an immediate danger or crisis? This means determining whether the person is at risk of harming themselves or others, whether they are in a state of extreme distress that requires immediate intervention, or whether there is any other safety concern. If there is immediate danger, you move to 'Assist with any crisis' — which may mean calling emergency services, staying with the person, or removing means of harm. Only once safety is established do you move to the listening and support phases."
  },
  {
    id: 4,
    question: "What does 'Listen non-judgementally' (the L in ALGEE) specifically require you to do?",
    options: [
      "Listen quietly and then tell the person what they should do to fix their problem",
      "Listen while forming your own opinion about whether their concerns are valid",
      "Set aside your own opinions and reactions, use open questions, reflect back what you hear, and create a safe space where the person feels heard without being evaluated",
      "Listen for specific keywords that indicate a diagnosable mental health condition"
    ],
    correctAnswer: 2,
    explanation: "Non-judgemental listening is an active skill that involves: suspending your own opinions, beliefs, and urge to advise; using open-ended questions ('How are you feeling about that?') rather than closed ones ('Are you depressed?'); reflecting back what you hear ('It sounds like you are feeling overwhelmed'); being comfortable with silence; and creating a safe emotional space where the person feels they can share without being judged, evaluated, or told what to do. This is often the most powerful and healing part of the ALGEE process."
  },
  {
    id: 5,
    question: "When 'Giving reassurance and information' (the G in ALGEE), which of the following is MOST appropriate?",
    options: [
      "Telling the person 'Everyone goes through tough times — you will be fine' to make them feel better",
      "Normalising their experience while providing factual information: 'What you are going through is more common than you might think, and effective help is available'",
      "Diagnosing their condition and recommending specific medication",
      "Comparing their situation to someone worse off to help them gain perspective"
    ],
    correctAnswer: 1,
    explanation: "Giving reassurance and information means normalising the person's experience ('What you are going through is more common than you think — around 1 in 4 people experience mental health problems'), reassuring them that help is available and effective, and providing factual information. It does NOT mean minimising ('You will be fine'), making false promises ('Everything will be OK'), comparing them to others ('Some people have it worse'), or diagnosing. The goal is to reduce shame and isolation while providing hope."
  },
  {
    id: 6,
    question: "The two E's in ALGEE stand for 'Encourage professional help' and 'Encourage other supports.' Which of the following is an example of 'other supports'?",
    options: [
      "Prescribing medication to the person based on your understanding of their symptoms",
      "Encouraging social connections, self-help strategies, physical activity, faith communities, hobbies, and other sources of support beyond professional treatment",
      "Encouraging the person to keep their problems to themselves to avoid burdening others",
      "Encouraging the person to change jobs as the primary solution to their mental health problems"
    ],
    correctAnswer: 1,
    explanation: "The second 'E' recognises that professional help is not the only source of support. 'Other supports' include: social connections (friends, family, community), self-help strategies (exercise, mindfulness, journaling, routine), faith or spiritual communities, hobbies and activities that bring joy, peer support groups, and workplace support programmes. Recovery is rarely achieved through professional help alone — it involves building a network of support across multiple areas of life."
  },
  {
    id: 7,
    question: "Which of the following statements about the ALGEE framework is CORRECT?",
    options: [
      "ALGEE is a replacement for professional mental health treatment",
      "ALGEE can only be used by trained mental health professionals",
      "ALGEE is an evidence-based framework for providing initial support — a bridge to professional help, not a replacement for it",
      "ALGEE is only effective for people with mild mental health problems"
    ],
    correctAnswer: 2,
    explanation: "ALGEE is explicitly designed as a bridge between the onset of a mental health problem and the point at which the person receives professional help. It is not a replacement for professional treatment — just as physical first aid is not a replacement for a doctor. ALGEE can be used by anyone, not just professionals, and is effective across the full spectrum of mental health situations, from mild distress to acute crisis."
  },
  {
    id: 8,
    question: "On a construction site, a colleague confides that they have been feeling very low for several weeks and have been drinking more than usual. Using the ALGEE framework, what is the MOST appropriate immediate response?",
    options: [
      "Tell them to stop drinking and see their GP first thing tomorrow morning",
      "Listen non-judgementally, validate their courage in opening up, provide reassurance that what they are experiencing is common and treatable, and gently explore whether they would be open to speaking with their GP or a helpline",
      "Report the drinking to their supervisor as it is a safety concern that overrides confidentiality",
      "Share your own experiences with drinking to show that you understand what they are going through"
    ],
    correctAnswer: 1,
    explanation: "This scenario requires the full ALGEE approach: the person is not in immediate crisis (so the Assist step focuses on emotional support rather than emergency intervention), so your primary focus should be on listening non-judgementally (L), giving reassurance that what they are experiencing is common and treatable (G), and gently encouraging professional help such as their GP or a helpline (E). Telling them what to do (stop drinking, see a GP) removes their autonomy. Sharing your own experiences shifts the focus away from them. While the drinking is a concern, the immediate priority is building trust and encouraging them towards support."
  }
];

export default function MentalHealthModule3Section2() {
  useSEO({
    title: "The ALGEE Action Plan | Mental Health Module 3.2",
    description: "Learn Mental Health First Aid's evidence-based ALGEE action plan — Approach, Listen, Give reassurance, Encourage professional help, and Encourage other supports.",
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
            <Link to="../mental-health-module-3">
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
            <Shield className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The ALGEE Action Plan
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Mental Health First Aid&rsquo;s evidence-based, 5-step framework for supporting someone experiencing a mental health problem &mdash; your structured guide from first approach to ongoing support
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>A:</strong> Approach, Assess and Assist with any crisis</li>
              <li><strong>L:</strong> Listen non-judgementally</li>
              <li><strong>G:</strong> Give reassurance and information</li>
              <li><strong>E:</strong> Encourage appropriate professional help</li>
              <li><strong>E:</strong> Encourage other supports</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Evidence-based:</strong> International gold standard for initial mental health support</li>
              <li><strong>Not therapy:</strong> A bridge to professional help, not a replacement</li>
              <li><strong>Anyone can use it:</strong> No professional qualifications needed</li>
              <li><strong>Saves lives:</strong> Structured action in the critical early window</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Recall all five steps of the ALGEE action plan and explain their purpose",
              "Describe how to approach someone and assess for immediate crisis",
              "Apply non-judgemental listening skills in a mental health conversation",
              "Provide appropriate reassurance without minimising or making false promises",
              "Encourage professional help while respecting the person's autonomy",
              "Identify other supports beyond professional treatment that aid recovery"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is ALGEE? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What Is ALGEE?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                ALGEE is the core action plan at the heart of <strong>Mental Health First Aid (MHFA)</strong>,
                an internationally recognised training programme that teaches people how to provide initial
                support to someone experiencing a mental health problem or crisis. It was developed by
                <strong> Betty Kitchener</strong> and <strong>Professor Tony Jorm</strong> at the University
                of Melbourne in 2000, and has since been adopted in over 25 countries worldwide, including the UK.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The ALGEE Framework</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>A</strong>pproach, Assess and Assist with any crisis &bull;
                  <strong> L</strong>isten non-judgementally &bull;
                  <strong> G</strong>ive reassurance and information &bull;
                  <strong> E</strong>ncourage appropriate professional help &bull;
                  <strong> E</strong>ncourage other supports
                </p>
              </div>

              <p>
                Think of ALGEE as the mental health equivalent of <strong>DR ABC</strong> in physical first
                aid. Just as DR ABC gives you a structured approach to a physical emergency (Danger, Response,
                Airway, Breathing, Circulation), ALGEE gives you a structured approach to a mental health
                situation. And just as physical first aid does not replace a doctor, ALGEE does not replace
                professional mental health treatment. It is a <strong>critical bridge</strong> &mdash; the
                support that is provided in the vital period between the onset of a problem and the point
                at which professional help is accessed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Principles of ALGEE</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Evidence-based</strong> &mdash; developed from extensive research and refined through decades of application in real-world settings across multiple countries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Accessible to everyone</strong> &mdash; designed to be used by ordinary people, not just health professionals. If you can have a conversation, you can use ALGEE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Flexible and adaptable</strong> &mdash; not a rigid script but a framework that adapts to different situations, cultures, and contexts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Person-centred</strong> &mdash; the focus is always on the person and what they need, not on following a procedure for its own sake</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>A bridge, not a destination</strong> &mdash; ALGEE connects the person to professional help and ongoing support; it does not attempt to replace them</span>
                  </li>
                </ul>
              </div>

              <p>
                Over 4 million people worldwide have been trained in MHFA, and research consistently shows
                that the programme increases mental health literacy, reduces stigma, increases helping behaviours,
                and improves the confidence of people providing support. In the UK, MHFA England has trained
                over 500,000 people, including a growing number in the construction industry. The ALGEE
                framework gives structure and confidence to what might otherwise feel overwhelming &mdash;
                the act of supporting another human being through a mental health crisis.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: A — Approach, Assess and Assist */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            A &mdash; Approach, Assess and Assist
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The first step in ALGEE is to <strong>approach the person, assess the situation, and assist
                with any immediate crisis</strong>. This is the step that requires the most courage because
                it involves making the decision to act rather than walking past or hoping someone else will
                deal with it. But as we covered in Section 1, the hardest part is simply starting &mdash; and
                you do not need to be perfect.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Approach</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Choose the Right Time</p>
                    <p>Find a moment when the person is not under immediate work pressure. Break time, walking to the van, end of the day, or a quiet moment between tasks are all good opportunities. Avoid approaching when they are in the middle of a critical task.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Choose the Right Place</p>
                    <p>Privacy is essential. Do NOT approach someone about their mental health in front of the whole site team, in a busy canteen, or within earshot of colleagues. Find somewhere quiet where you can talk without being overheard or interrupted.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Be Genuine and Natural</p>
                    <p>You do not need a rehearsed speech. A natural, caring approach works best: &ldquo;I have noticed you have not seemed yourself lately. I just wanted to check in &mdash; is everything OK?&rdquo; Keep it simple, warm, and sincere.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Respect Their Response</p>
                    <p>The person may not be ready to talk. If they say they are fine or brush off your concern, do not push. Simply say: &ldquo;OK, no problem. I just want you to know I am here if you ever want to chat.&rdquo; Leave the door open.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Assess: Is There Immediate Danger?</p>
                <p className="text-sm text-white mb-3">
                  Once you have approached the person and begun the conversation, your first assessment is
                  always about <strong>safety</strong>. Is there an immediate crisis?
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Is the person at risk of self-harm or suicide?</strong> If so, do not leave them alone. Ask directly: &ldquo;Are you thinking about harming yourself?&rdquo; (This does NOT increase risk &mdash; it shows you take them seriously.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Is there a risk to others?</strong> If someone is extremely distressed or behaving erratically, consider whether there is a safety risk on site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Is the person under the influence?</strong> Alcohol or substances can amplify distress and increase risk. If you suspect impairment on site, the safety protocol takes priority.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Assist: If There IS a Crisis</p>
                </div>
                <p className="text-sm text-white mb-3">
                  If your assessment reveals an immediate crisis, safety is the absolute priority:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stay calm</strong> &mdash; your composure helps the person feel safer. If you panic, they will feel more afraid.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Do not leave them alone</strong> &mdash; if there is a risk of self-harm, stay with them or ensure someone stays with them.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Call for help</strong> &mdash; 999 for emergencies, Samaritans on 116 123, or your site mental health first aider.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Remove means of harm</strong> &mdash; if you can safely do so, secure or remove anything that could be used for self-harm.</span>
                  </li>
                </ul>
              </div>

              <p>
                If there is <strong>no immediate crisis</strong> &mdash; which is the case in the vast majority
                of mental health conversations &mdash; you move to the next step: listening. Most of the time,
                the person simply needs someone to hear them, and the &ldquo;Approach&rdquo; step flows naturally
                into the &ldquo;Listen&rdquo; step.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: L — Listen Non-Judgementally */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            L &mdash; Listen Non-Judgementally
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Non-judgemental listening is often the most powerful thing you can do for someone who is
                struggling. It sounds simple, but true non-judgemental listening is a skill that requires
                practice, self-awareness, and discipline. It means temporarily setting aside your own opinions,
                beliefs, experiences, and &mdash; crucially &mdash; your urge to fix things, in order to
                create a safe space where the person feels truly heard.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">What Non-Judgemental Listening Looks Like</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;I hear you. I am not going to judge you. I am not going to tell you what to do.
                  I am just going to listen, and try to understand what you are going through.&rdquo;</strong>
                </p>
                <p className="text-sm text-white/80 mt-2">
                  This is the unspoken message that non-judgemental listening communicates. Even if you never
                  say these words explicitly, your body language, tone of voice, and responses will convey
                  this message if you are truly listening without judgement.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Listening Skills</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Body language</strong> &mdash; face the person, maintain comfortable (not intense) eye contact, adopt an open posture (no crossed arms), lean in slightly to show engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Open questions</strong> &mdash; &ldquo;How have you been feeling?&rdquo; &ldquo;What has been on your mind?&rdquo; &ldquo;Can you tell me more about that?&rdquo; rather than &ldquo;Are you depressed?&rdquo; or &ldquo;Is it work stress?&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Reflecting back</strong> &mdash; &ldquo;It sounds like you have been feeling really overwhelmed lately&rdquo; &mdash; this shows you are genuinely hearing and understanding what they say</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Minimal encouragers</strong> &mdash; &ldquo;I see,&rdquo; &ldquo;Go on,&rdquo; &ldquo;Mm-hmm,&rdquo; &ldquo;Tell me more&rdquo; &mdash; small verbal cues that keep the person talking without interrupting their flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Comfortable silence</strong> &mdash; resist the urge to fill every pause. Sometimes people need a moment to gather their thoughts or summon the courage to share something difficult</span>
                  </li>
                </ul>
              </div>

              <p>
                One of the hardest aspects of non-judgemental listening, especially for construction workers
                who are natural problem-solvers, is <strong>resisting the urge to fix</strong>. When someone
                tells you they are struggling, your instinct is to offer solutions. But in a mental health
                context, jumping to solutions can feel dismissive &mdash; as though you are saying &ldquo;your
                problem is simple and here is how to fix it.&rdquo; The person usually knows the solutions.
                What they need is to feel heard first.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What NOT to Say While Listening</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-medium mb-1">Avoid These</p>
                    <p>&ldquo;Have you tried...?&rdquo; (jumping to solutions)</p>
                    <p className="mt-1">&ldquo;At least you have got...&rdquo; (minimising)</p>
                    <p className="mt-1">&ldquo;I know exactly how you feel&rdquo; (you do not)</p>
                    <p className="mt-1">&ldquo;You should...&rdquo; (prescriptive)</p>
                    <p className="mt-1">&ldquo;When I was going through...&rdquo; (shifting focus)</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-medium mb-1">Say These Instead</p>
                    <p>&ldquo;That sounds really tough&rdquo;</p>
                    <p className="mt-1">&ldquo;I can see why that would be difficult&rdquo;</p>
                    <p className="mt-1">&ldquo;Thank you for telling me&rdquo;</p>
                    <p className="mt-1">&ldquo;What would help right now?&rdquo;</p>
                    <p className="mt-1">&ldquo;Take your time &mdash; there is no rush&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: G — Give Reassurance and Information */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            G &mdash; Give Reassurance and Information
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once you have listened and the person feels heard, the next step is to <strong>give
                reassurance and provide factual information</strong>. This step addresses two of the most
                common feelings that accompany mental health problems: <strong>shame</strong> (&ldquo;There
                is something wrong with me&rdquo;) and <strong>hopelessness</strong> (&ldquo;Nothing will
                help&rdquo;). Effective reassurance tackles both.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Normalising Their Experience</p>
                <p className="text-sm text-white mb-3">
                  One of the most powerful things you can do is help the person understand that what they
                  are experiencing is <strong>far more common than they think</strong>. Many people suffering
                  from mental health problems believe they are uniquely broken or weak. Hearing that others
                  go through similar experiences can be enormously relieving:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;What you are going through is more common than you might think &mdash; about 1 in 4 people experience a mental health problem every year.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;Lots of people in construction go through similar things &mdash; it does not mean there is something wrong with you as a person.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;It takes real courage to talk about this. That says a lot about your strength, not your weakness.&rdquo;</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Reassurance That Help Is Available</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Providing hope is essential. Many people believe their situation is hopeless or that
                  nothing can help. Counter this with factual reassurance:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;The good news is that most mental health problems respond really well to support and treatment.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;There are people who are really good at helping with exactly this kind of thing.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;You do not have to go through this alone &mdash; there is support available and I will help you find it.&rdquo;</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What to Avoid</p>
                <p className="text-sm text-white mb-3">
                  Reassurance must be genuine and measured. Certain well-intentioned responses can
                  actually be harmful:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-medium mb-1">Avoid</p>
                    <p><strong>False promises:</strong> &ldquo;Everything will be fine&rdquo; &mdash; you cannot guarantee this</p>
                    <p className="mt-1"><strong>Minimising:</strong> &ldquo;It could be worse&rdquo; or &ldquo;There are people worse off&rdquo;</p>
                    <p className="mt-1"><strong>Toxic positivity:</strong> &ldquo;Just stay positive&rdquo; or &ldquo;Look on the bright side&rdquo;</p>
                    <p className="mt-1"><strong>Dismissing:</strong> &ldquo;You will get over it&rdquo; or &ldquo;Time heals everything&rdquo;</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-medium mb-1">Instead</p>
                    <p><strong>Honest hope:</strong> &ldquo;This is treatable and help is available&rdquo;</p>
                    <p className="mt-1"><strong>Validation:</strong> &ldquo;What you are feeling is valid and understandable&rdquo;</p>
                    <p className="mt-1"><strong>Realistic support:</strong> &ldquo;I am here and we will figure out next steps together&rdquo;</p>
                    <p className="mt-1"><strong>Acknowledging courage:</strong> &ldquo;It took real guts to tell me this&rdquo;</p>
                  </div>
                </div>
              </div>

              <p>
                The key principle is this: <strong>validate the feeling, provide hope about the future, and
                offer factual information</strong>. You are not minimising, dismissing, or making promises
                you cannot keep. You are helping the person understand that what they are experiencing has a
                name, is common, is treatable, and that they are not alone. That combination of validation and
                hope is incredibly powerful.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: E — Encourage Professional Help + E — Encourage Other Supports */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            E &mdash; Encourage Professional Help + E &mdash; Encourage Other Supports
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The final two steps of ALGEE focus on <strong>connecting the person with ongoing support</strong>
                &mdash; both professional and personal. Your role as a mental health first aider or concerned
                colleague is to be a bridge, not a destination. You have listened, you have reassured, and now
                you help the person take the next steps towards recovery.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Encouraging Professional Help</p>
                <p className="text-sm text-white mb-3">
                  Many people &mdash; particularly construction workers &mdash; are reluctant to seek
                  professional help. Addressing their specific fears is essential:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-white">
                    <p className="font-medium mb-1">&ldquo;Seeing a GP feels like a big deal&rdquo;</p>
                    <p>Explain that a GP appointment for mental health is just like any other appointment. It is confidential. The GP will not judge them. Most GPs have significant experience with mental health and will be supportive and understanding.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-white">
                    <p className="font-medium mb-1">&ldquo;Will my employer find out?&rdquo;</p>
                    <p>GP consultations are completely confidential. Your employer has no right to know what you discuss with your doctor. If the person needs time off, the GP can provide a fit note without specifying the exact condition if the person prefers.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-white">
                    <p className="font-medium mb-1">&ldquo;Counselling is not for people like me&rdquo;</p>
                    <p>Counselling is not lying on a couch being analysed. Modern therapy is a practical, structured conversation about what is going on and how to manage it. Many construction workers who have accessed counselling say they wish they had done it sooner.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-white">
                    <p className="font-medium mb-1">&ldquo;It means I am weak&rdquo;</p>
                    <p>Seeking help is an act of strength, not weakness. It takes more courage to acknowledge you are struggling and ask for support than it does to suffer in silence. The toughest thing a construction worker can do is admit they are not OK.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Encouraging Other Supports</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Recovery is rarely achieved through professional help alone. The second &lsquo;E&rsquo;
                  recognises the vital role of other sources of support:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Social connections</strong> &mdash; trusted friends, family members, colleagues who understand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Physical activity</strong> &mdash; exercise is one of the most effective interventions for mild to moderate depression and anxiety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Self-help strategies</strong> &mdash; mindfulness, breathing exercises, journaling, maintaining a routine, reducing alcohol</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Faith and community</strong> &mdash; religious or spiritual communities, local groups, charity organisations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Hobbies and interests</strong> &mdash; activities that bring joy, purpose, and a sense of achievement outside of work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Peer support</strong> &mdash; groups where people with shared experiences support each other, such as Andy&rsquo;s Man Club or Men&rsquo;s Sheds</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Recovery Model</p>
                <p className="text-sm text-white">
                  Modern mental health care is built on the <strong>recovery model</strong>, which recognises
                  that recovery is not necessarily about the absence of symptoms, but about living a
                  meaningful, fulfilling life. Recovery looks different for everyone, and it is not always
                  linear &mdash; there will be good days and bad days. The role of both professional and
                  personal supports is to help the person build a life that they find worth living, with
                  the tools and strategies to manage their mental health along the way. By encouraging both
                  professional help AND other supports, you are helping the person build a comprehensive
                  recovery network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has equipped you with the ALGEE action plan &mdash; a structured, evidence-based
                framework for supporting someone through a mental health problem. The key points to carry
                forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>ALGEE is your roadmap</strong> &mdash; Approach/Assess/Assist, Listen, Give reassurance, Encourage professional help, Encourage other supports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Safety first</strong> &mdash; always assess for immediate crisis before anything else. If someone is in danger, call 999 or Samaritans 116 123.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Listening is the most powerful step</strong> &mdash; non-judgemental, open, patient listening that creates a safe space to be heard.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Reassure with facts, not clich&eacute;s</strong> &mdash; normalise their experience, provide hope, and avoid minimising or making false promises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Encourage professional help gently</strong> &mdash; address fears, explain options, and respect their autonomy to choose.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Other supports matter too</strong> &mdash; social connections, exercise, self-help, faith, hobbies, and peer groups all contribute to recovery.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will go deeper into the
                  &ldquo;L&rdquo; of ALGEE &mdash; Listening Without Judgement. You will learn the specific
                  skills of active listening, empathic responding, the power of silence, and the common
                  mistakes that even well-meaning listeners make. This is the skill that makes the biggest
                  difference.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Helplines</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Samaritans:</strong> 116 123 (free, 24/7, 365 days a year)</li>
                  <li><strong>Construction Industry Helpline:</strong> 0345 605 1956</li>
                  <li><strong>Mind Infoline:</strong> 0300 123 3393</li>
                  <li><strong>Emergency:</strong> 999</li>
                </ul>
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
          title="Section 2 Knowledge Check"
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
            <Link to="../mental-health-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Why Conversations Matter
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3-section-3">
              Next: Listening Without Judgement
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
