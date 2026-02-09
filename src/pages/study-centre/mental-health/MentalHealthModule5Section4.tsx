import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Heart,
  Users,
  Brain,
  RefreshCw,
  BookOpen,
  Eye,
  HandHeart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-compassion-fatigue-vs-burnout",
    question:
      "A Mental Health First Aider notices they feel increasingly detached from colleagues who come to them for support, and they have started to dread hearing about people's problems. They feel guilty about this because they used to care deeply. What is this most likely an example of?",
    options: [
      "General work-related stress that will pass on its own",
      "Compassion fatigue &mdash; secondary traumatic stress from repeated exposure to others' distress",
      "A sign that they are not suited to the MHFA role",
      "Clinical depression requiring immediate medication",
    ],
    correctIndex: 1,
    explanation:
      "This is a classic presentation of compassion fatigue &mdash; the emotional and physical exhaustion that develops from repeated exposure to others' distress. Unlike general burnout, compassion fatigue is specifically linked to the helping role. It does NOT mean the person is unsuited to the role &mdash; it means they need to prioritise their own self-care, access supervision, and consider whether they need a temporary break. Compassion fatigue is common, predictable, and treatable.",
  },
  {
    id: "mh-boundary-setting",
    question:
      "A colleague sends you a text at 11pm asking to talk because they are feeling low. You are off duty and exhausted after a long day. As an MHFA, what is the most appropriate response?",
    options: [
      "Ignore the message &mdash; you are off duty and it is not your problem",
      "Reply immediately and talk for as long as they need, regardless of how you feel",
      "Acknowledge their message, signpost them to 24/7 crisis support (Samaritans 116 123), and arrange to speak during working hours",
      "Tell them they should not be contacting you outside of work",
    ],
    correctIndex: 2,
    explanation:
      "Setting boundaries does not mean you stop caring &mdash; it means you care sustainably. Acknowledging the message shows you have not dismissed them. Signposting to 24/7 services (Samaritans 116 123 or text SHOUT to 85258) ensures they have immediate support available. Arranging to speak during working hours maintains your own wellbeing and models healthy boundaries. You are a Mental Health First Aider, not a 24/7 crisis counsellor.",
  },
  {
    id: "mh-reflective-practice",
    question:
      "After a particularly difficult conversation with a colleague who disclosed suicidal thoughts, an MHFA sits down to write in their reflective journal. Which of the following questions is MOST useful for reflective practice?",
    options: [
      "\"Why did I not fix their problem?\"",
      "\"What did I do well, what could I improve, and what did I learn from this experience?\"",
      "\"How can I make sure this never happens again?\"",
      "\"Should I have told their manager about what they said?\"",
    ],
    correctIndex: 1,
    explanation:
      "Effective reflective practice focuses on three key questions: What went well? What could I improve? What did I learn? This is not about self-criticism or trying to \"fix\" people &mdash; it is about continuous learning and professional development. Reflective practice helps MHFAs process difficult experiences, identify their own development needs, and build confidence over time. It is a tool for growth, not guilt.",
  },
];

const faqs = [
  {
    question:
      "Is it normal to feel emotionally drained after supporting someone through a mental health crisis?",
    answer:
      "Yes, absolutely. Emotional exhaustion after supporting someone in distress is a completely normal human response. When you listen empathetically to someone&rsquo;s pain, your brain processes elements of their experience as though it were happening to you &mdash; this is the neurological basis of empathy. The key is to recognise these feelings, acknowledge them without judgement, and take active steps to replenish your emotional reserves. Talk to a trusted colleague or supervisor, take time to decompress, and engage in activities that restore your energy. If the emotional toll becomes persistent or overwhelming, seek professional support through your GP, occupational health, or an Employee Assistance Programme.",
  },
  {
    question:
      "How often should Mental Health First Aiders receive supervision?",
    answer:
      "There is no single legal requirement specifying the frequency, but best practice recommends that MHFAs should have access to regular supervision &mdash; ideally at least once per month, with additional sessions available after particularly difficult conversations or incidents. Supervision can take different forms: one-to-one with a trained supervisor, peer group supervision with other MHFAs, or a combination of both. The purpose is to provide a safe, confidential space to reflect on experiences, process emotions, discuss challenging situations, and identify when additional support is needed. Employers who appoint MHFAs have a responsibility to provide ongoing supervision as part of the role.",
  },
  {
    question:
      "What is the difference between compassion fatigue and burnout?",
    answer:
      "While they share some symptoms, compassion fatigue and burnout have different causes. Burnout is caused by prolonged workplace stress &mdash; excessive workload, lack of control, insufficient reward, or poor organisational culture. It can affect anyone in any role. Compassion fatigue is specifically caused by the emotional cost of caring for others in distress. It is sometimes called &ldquo;secondary traumatic stress&rdquo; because the MHFA absorbs elements of the trauma experienced by the people they support. The key difference is that compassion fatigue is directly linked to the empathetic helping relationship, whereas burnout is linked to the broader work environment. An MHFA can experience both simultaneously.",
  },
  {
    question:
      "Can I step back from the MHFA role if it is affecting my own mental health?",
    answer:
      "Yes, and doing so is not a failure &mdash; it is responsible self-care. If the MHFA role is having a significant negative impact on your own mental health, wellbeing, or personal life, you should discuss this with your employer or MHFA coordinator. Options may include a temporary break from the role, reduced responsibilities, additional supervision and support, or a permanent step-down if that is what you need. Your employer has a duty of care to you as an employee, and this extends to the additional demands of the MHFA role. Stepping back when you need to protects both you and the people you support &mdash; an MHFA who is struggling cannot provide effective support to others.",
  },
  {
    question:
      "What should I do if I experience vicarious trauma after hearing a disclosure of abuse or a suicide attempt?",
    answer:
      "Vicarious trauma is a real and recognised condition that can develop after exposure to the traumatic experiences of others. If you are experiencing symptoms such as intrusive thoughts, disturbed sleep, heightened anxiety, changes in your worldview, or a reduced sense of personal safety, take these seriously. Speak to your MHFA supervisor or a trusted colleague as soon as possible. Access professional support through occupational health, your Employee Assistance Programme, or your GP. Do not try to process this alone. In the immediate aftermath, practise grounding techniques (focus on your five senses, slow breathing), talk to someone you trust, and avoid isolating yourself. These reactions are normal responses to abnormal disclosures &mdash; they do not make you weak or unsuitable for the role.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following BEST describes why self-care is important for Mental Health First Aiders?",
    options: [
      "It is a legal requirement under the Health and Safety at Work Act 1974",
      "It ensures the MHFA can continue to provide effective support without burning out or developing compassion fatigue",
      "It is only important for MHFAs who support more than 10 people per month",
      "Self-care is a personal choice and has no impact on the quality of support provided",
    ],
    correctAnswer: 1,
    explanation:
      "Self-care is essential because an MHFA who is emotionally exhausted, burnt out, or suffering from compassion fatigue cannot provide effective support to others. You cannot pour from an empty cup. Self-care is not selfish &mdash; it is a professional responsibility that directly affects the quality and sustainability of the support you provide. While there is no specific legal requirement for MHFA self-care, employers have a general duty of care under the Health and Safety at Work Act to protect employee wellbeing, which extends to the demands of the MHFA role.",
  },
  {
    id: 2,
    question:
      "Compassion fatigue is BEST defined as:",
    options: [
      "Feeling tired after a long day at work",
      "The emotional and physical exhaustion caused by repeated exposure to others' traumatic experiences and distress",
      "A clinical diagnosis that requires medication",
      "A sign that the MHFA should immediately resign from the role",
    ],
    correctAnswer: 1,
    explanation:
      "Compassion fatigue is the emotional and physical exhaustion that develops from the cumulative effect of supporting others through their distress and traumatic experiences. It is sometimes called secondary traumatic stress. Symptoms include emotional exhaustion, reduced empathy, cynicism, irritability, and physical symptoms such as headaches and fatigue. It is NOT a clinical diagnosis requiring medication, and it does NOT mean the person should resign. It is a normal, predictable response to the demands of helping roles, and it can be addressed through self-care, supervision, boundaries, and professional support.",
  },
  {
    id: 3,
    question:
      "Vicarious trauma differs from compassion fatigue because it specifically involves:",
    options: [
      "Physical injury sustained while helping others",
      "Feeling tired after a conversation",
      "A shift in worldview and sense of personal safety caused by exposure to others' traumatic experiences",
      "Disagreements with colleagues about how to support someone",
    ],
    correctAnswer: 2,
    explanation:
      "Vicarious trauma involves a fundamental shift in how the MHFA sees the world. After repeated exposure to others' traumatic experiences &mdash; particularly disclosures of suicide, abuse, or traumatic incidents &mdash; the MHFA may develop a changed worldview, a reduced sense of personal safety, disrupted beliefs about trust and human nature, and intrusive thoughts related to others' trauma. While compassion fatigue focuses on emotional exhaustion, vicarious trauma specifically affects core beliefs and psychological frameworks. Both conditions are real, both deserve attention, and both can be addressed with appropriate support.",
  },
  {
    id: 4,
    question:
      "An MHFA is contacted by three different colleagues in one week, all experiencing significant mental health difficulties. The MHFA is starting to feel overwhelmed. What is the MOST appropriate action?",
    options: [
      "Continue supporting all three without telling anyone, because that is their role",
      "Tell all three colleagues they cannot help and refuse to engage",
      "Speak to their MHFA supervisor or coordinator, debrief on the cases, and discuss whether to hand over some support to another MHFA",
      "Take a week off sick without telling anyone why",
    ],
    correctAnswer: 2,
    explanation:
      "The most appropriate action is to access supervision. Speaking to an MHFA supervisor or coordinator allows the MHFA to debrief, process the emotional impact, and discuss practical options &mdash; including handover to another MHFA if the volume of support exceeds their current capacity. MHFAs should never try to manage everything alone. Supervision exists specifically for these situations. Refusing to engage entirely or continuing while overwhelmed are both harmful approaches.",
  },
  {
    id: 5,
    question:
      "Which of the following is an example of good boundary-setting for an MHFA?",
    options: [
      "Being available by phone 24 hours a day, 7 days a week",
      "Never saying no to a request for support, even when exhausted",
      "Explaining that you are available during working hours and signposting to 24/7 crisis services for out-of-hours support",
      "Telling colleagues not to bring their problems to you",
    ],
    correctAnswer: 2,
    explanation:
      "Good boundary-setting means being clear about when you are available, while ensuring people always have access to support even when you are not. Signposting to 24/7 services like Samaritans (116 123) and the Shout Crisis Text Line (text SHOUT to 85258) ensures continuity of support. Being available 24/7 is unsustainable and will lead to burnout. Never saying no is a failure to protect your own wellbeing. Telling people not to bring problems is dismissive and defeats the purpose of the role.",
  },
  {
    id: 6,
    question:
      "The five dimensions of the self-care wheel are:",
    options: [
      "Sleep, exercise, diet, hydration, and rest",
      "Physical, emotional, social, professional, and spiritual",
      "Work, home, family, friends, and hobbies",
      "Mind, body, soul, career, and relationships",
    ],
    correctAnswer: 1,
    explanation:
      "The self-care wheel identifies five interconnected dimensions of wellbeing: physical (exercise, sleep, nutrition, health checks), emotional (processing feelings, journaling, therapy, self-compassion), social (relationships, community, connection, support networks), professional (boundaries, supervision, CPD, workload management), and spiritual (meaning, purpose, values, mindfulness, reflection). Effective self-care addresses all five dimensions &mdash; neglecting any one area can undermine the others.",
  },
  {
    id: 7,
    question:
      "An employer appoints MHFAs but provides no ongoing supervision, debriefing, or support for them. This is:",
    options: [
      "Perfectly acceptable &mdash; MHFAs are volunteers and do not need employer support",
      "A failure of the employer's duty of care &mdash; MHFAs need supervision, debriefing, and access to professional support",
      "Only a problem if an MHFA formally complains",
      "The MHFA's own responsibility to arrange",
    ],
    correctAnswer: 1,
    explanation:
      "Employers who appoint MHFAs have a duty of care to support them in that role. This includes providing regular supervision (ideally monthly), structured debriefing after difficult conversations or incidents, access to professional support such as counselling or an Employee Assistance Programme, and ongoing training and refresher courses. An MHFA programme without adequate support for the MHFAs themselves is not only ethically problematic but can lead to compassion fatigue, vicarious trauma, and burnout &mdash; which ultimately undermines the entire programme.",
  },
  {
    id: 8,
    question:
      "Reflective practice for MHFAs involves:",
    options: [
      "Writing a detailed report about every person you support, including their personal details",
      "Regularly reviewing your own practice &mdash; what went well, what could improve, and what you learned &mdash; to support continuous development",
      "Asking colleagues to rate your performance after each conversation",
      "Comparing yourself to other MHFAs to see who is performing best",
    ],
    correctAnswer: 1,
    explanation:
      "Reflective practice is a structured approach to reviewing your own experiences and learning from them. For MHFAs, this means regularly asking: What went well in that conversation? What could I have done differently? What did I learn? How did it affect me emotionally? Reflective practice can be done through journaling, supervision discussions, or peer reflection. It is NOT about recording personal details of people you support (this would breach confidentiality), comparing yourself to others, or seeking performance ratings. It is a personal development tool that builds competence and confidence over time.",
  },
];

export default function MentalHealthModule5Section4() {
  useSEO({
    title:
      "Self-Care for the Mental Health First Aider | Mental Health Module 5.4",
    description:
      "Compassion fatigue, vicarious trauma, setting boundaries, supervision and debriefing, personal resilience, reflective practice, and the self-care wheel for UK Mental Health First Aiders.",
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
            <Link to="../mental-health-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <ShieldCheck className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Self-Care for the Mental Health First Aider
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Protecting your own wellbeing so you can continue to support others
            &mdash; compassion fatigue, vicarious trauma, boundaries, supervision,
            resilience and reflective practice
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Self-care:</strong> Not selfish &mdash; it is essential
                for effective, sustainable support
              </li>
              <li>
                <strong>Compassion fatigue:</strong> Emotional exhaustion from
                repeated exposure to others&rsquo; distress
              </li>
              <li>
                <strong>Boundaries:</strong> Know your limits, say no without
                guilt, signpost to 24/7 services
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              In Practice
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Supervision:</strong> Regular, ideally monthly, with
                additional sessions after difficult conversations
              </li>
              <li>
                <strong>Reflective practice:</strong> What went well, what could
                improve, what did I learn
              </li>
              <li>
                <strong>Self-care wheel:</strong> Physical, emotional, social,
                professional, spiritual
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why self-care is essential for Mental Health First Aiders and the consequences of neglecting it",
              "Define compassion fatigue, recognise its symptoms, and distinguish it from general burnout",
              "Describe vicarious trauma, how it develops, and its impact on the MHFA's worldview and wellbeing",
              "Demonstrate effective boundary-setting strategies including knowing your limits and saying no without guilt",
              "Explain the importance of regular supervision and structured debriefing for MHFAs",
              "Apply reflective practice techniques and describe the five dimensions of the self-care wheel",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================= */}
        {/* Section 01: Why Self-Care Matters */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Why Self-Care Matters
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a well-known analogy in aviation: in the event of an
                emergency, you must put on your own oxygen mask before helping
                others. The same principle applies to Mental Health First Aiders.
                You cannot effectively support others if you are running on empty
                yourself. Self-care is not a luxury or a sign of weakness &mdash;
                it is a <strong>professional responsibility</strong> that
                directly affects the quality and sustainability of the support
                you provide.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    The Oxygen Mask Analogy:
                  </strong>{" "}
                  You cannot pour from an empty cup. If you neglect your own
                  mental health, physical health, and emotional wellbeing, you
                  will eventually have nothing left to give. This is not theory
                  &mdash; it is a well-documented reality in all helping
                  professions, from counsellors and therapists to paramedics and
                  social workers. Mental Health First Aiders are no exception.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Why MHFAs Are Particularly Vulnerable
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        MHFAs are not immune:
                      </strong>{" "}
                      Mental Health First Aiders are human beings with their own
                      mental health, their own stresses, and their own
                      vulnerabilities. Having the training and the title does not
                      make you invulnerable to the conditions you support others
                      with.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Emotional toll:
                      </strong>{" "}
                      Listening to colleagues&rsquo; distress, hearing
                      disclosures of suicidal thoughts, abuse, or trauma, and
                      carrying the weight of others&rsquo; pain takes a genuine
                      emotional toll. Over time, this cumulative exposure can
                      erode your own emotional resilience.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Preventing burnout:
                      </strong>{" "}
                      Without active self-care, MHFAs are at significant risk of
                      compassion fatigue, vicarious trauma, and burnout. When
                      this happens, the MHFA cannot function effectively in the
                      role, and the people who rely on them lose their primary
                      source of workplace support.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Dual role challenge:
                      </strong>{" "}
                      Most MHFAs carry the MHFA responsibility on top of their
                      normal job role. They are electricians, engineers, site
                      managers, or office workers first &mdash; and MHFAs
                      second. Balancing both demands requires deliberate
                      self-care strategies.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Remember:</strong>{" "}
                  Self-care is not selfish. An MHFA who looks after themselves
                  is not being self-indulgent &mdash; they are protecting their
                  ability to be there for others. If you burn out, you help
                  nobody. If you maintain your wellbeing, you can sustain your
                  support for years to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Section 02: Compassion Fatigue */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Compassion Fatigue
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Compassion fatigue</strong> is sometimes called{" "}
                <strong>secondary traumatic stress</strong>. It is the emotional
                and physical exhaustion that develops from the cumulative effect
                of supporting others through their distress and traumatic
                experiences. Unlike general burnout, compassion fatigue is
                specifically linked to the empathetic helping relationship &mdash;
                it is the cost of caring.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Symptoms of Compassion Fatigue
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Emotional Symptoms
                    </p>
                    <ul className="text-xs text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Emotional exhaustion and feeling &ldquo;drained&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Reduced empathy &mdash; difficulty feeling compassion for those you support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Growing cynicism about people and their problems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Irritability, frustration, or anger</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Feelings of guilt for not doing enough</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Physical Symptoms
                    </p>
                    <ul className="text-xs text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Chronic fatigue and low energy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Headaches, muscle tension, and stomach problems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Sleep disturbance &mdash; difficulty falling or staying asleep</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Changes in appetite or weight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Increased susceptibility to illness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How Compassion Fatigue Develops Over Time
                </p>
                <div className="space-y-2">
                  {[
                    {
                      stage: "Initial enthusiasm",
                      detail:
                        "You feel motivated, energised, and fulfilled by your MHFA role. Supporting others gives you a sense of purpose and satisfaction.",
                    },
                    {
                      stage: "Stagnation",
                      detail:
                        "The emotional demands start to take their toll. You begin to feel less satisfied and more drained. You may start to question whether you are making a difference.",
                    },
                    {
                      stage: "Frustration",
                      detail:
                        "You feel increasingly irritable, impatient, and frustrated. You may start to distance yourself emotionally from the people you support. Cynicism creeps in.",
                    },
                    {
                      stage: "Apathy",
                      detail:
                        "You feel detached, numb, and disengaged. You may go through the motions without genuine empathy. You dread being approached for support.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.stage}
                        </p>
                        <p className="text-sm text-white/70 mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">
                  Compassion Fatigue vs Burnout
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-300 mb-1">
                      Compassion Fatigue
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li>Caused by the helping relationship</li>
                      <li>Secondary traumatic stress</li>
                      <li>Specific to caring roles</li>
                      <li>Can develop quickly after a single intense event</li>
                      <li>Recovery possible with self-care and support</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-300 mb-1">
                      Burnout
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li>Caused by workplace stress and overload</li>
                      <li>Chronic stress response</li>
                      <li>Can affect anyone in any role</li>
                      <li>Develops gradually over months or years</li>
                      <li>Often requires organisational change</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================= */}
        {/* Section 03: Vicarious Trauma */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Vicarious Trauma
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Vicarious trauma</strong> is the trauma experienced
                through exposure to other people&rsquo;s traumatic experiences.
                When an MHFA listens to detailed disclosures of suicide
                attempts, abuse, self-harm, or traumatic incidents, their brain
                processes elements of those experiences as though they were
                happening to them. Over time, this can fundamentally alter how
                the MHFA sees the world.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    How Vicarious Trauma Affects MHFAs
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Changed worldview:
                      </strong>{" "}
                      After hearing multiple accounts of suffering, MHFAs may
                      develop a bleaker, more pessimistic view of the world and
                      of human nature. The world may start to feel less safe
                      than it did before.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduced sense of safety:
                      </strong>{" "}
                      Hearing about others&rsquo; traumatic experiences can make
                      the MHFA feel more vulnerable, anxious, or hypervigilant
                      in their own life. They may become overly protective of
                      their family or fearful of situations they previously felt
                      comfortable in.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Intrusive thoughts:
                      </strong>{" "}
                      Images, sounds, or details from others&rsquo; disclosures
                      may intrude into the MHFA&rsquo;s thoughts uninvited,
                      particularly at night or during quiet moments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Disrupted trust:
                      </strong>{" "}
                      Repeated exposure to stories of harm, abuse, and
                      exploitation can erode the MHFA&rsquo;s trust in other
                      people and in institutions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cumulative effect:
                      </strong>{" "}
                      Vicarious trauma is cumulative. Each disclosure adds to the
                      emotional burden. A single conversation may not cause
                      lasting harm, but the accumulation of many conversations
                      over months and years can have a profound impact.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Particularly High-Risk Disclosures for MHFAs
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">
                    <AlertTriangle className="h-5 w-5 text-red-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-red-300 mb-1">
                      Suicide Disclosures
                    </p>
                    <p className="text-[11px] text-white/60">
                      Hearing someone describe suicidal thoughts, plans, or
                      previous attempts carries a significant emotional weight
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">
                    <AlertTriangle className="h-5 w-5 text-red-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-red-300 mb-1">
                      Abuse Disclosures
                    </p>
                    <p className="text-[11px] text-white/60">
                      Accounts of physical, emotional, sexual, or domestic abuse
                      can be deeply distressing to hear
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">
                    <AlertTriangle className="h-5 w-5 text-red-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-red-300 mb-1">
                      Traumatic Incidents
                    </p>
                    <p className="text-[11px] text-white/60">
                      Detailed accounts of accidents, injuries, violence, or
                      bereavements that the person is reliving
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Key Point:
                  </strong>{" "}
                  Vicarious trauma does not mean you are weak or unsuited to the
                  MHFA role. It means you are a empathetic human being who has
                  been exposed to the pain of others. Recognising it, naming it,
                  and seeking support for it is a sign of strength and
                  self-awareness, not failure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Section 04: Setting Boundaries */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Setting Boundaries
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Boundaries are not walls &mdash; they are the sustainable
                limits that allow you to continue supporting others without
                destroying yourself in the process. Setting boundaries is one
                of the most important self-care skills an MHFA can develop.
                Without them, the role can quickly become all-consuming.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Boundary-Setting Strategies
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: "Know your emotional capacity",
                      description:
                        "Be honest with yourself about how much you can take on at any given time. Your capacity varies depending on what else is happening in your work and personal life. Some weeks you can handle multiple conversations; other weeks you may struggle with one.",
                    },
                    {
                      title: "Know your limits of expertise",
                      description:
                        "You are a Mental Health First Aider, not a therapist, counsellor, or psychiatrist. Your role is to listen, support, and signpost. If someone needs ongoing professional support, help them access it &mdash; do not try to provide it yourself.",
                    },
                    {
                      title: "Say no without guilt",
                      description:
                        "If you are not in the right state to support someone, it is better to say so and arrange for another MHFA to step in than to provide half-hearted or harmful support. Saying \"I'm not in the best position to help right now, but let me connect you with someone who can\" is not rejection &mdash; it is responsible care.",
                    },
                    {
                      title: "Have a support toolkit",
                      description:
                        "Know who YOU can turn to when you need support. This might be another MHFA, your supervisor, a trusted friend, your GP, or a professional counsellor. Do not wait until you are in crisis to think about who can help you.",
                    },
                    {
                      title: "Do not be available 24/7",
                      description:
                        "You are entitled to time off, rest, and a life outside of your MHFA role. Establish clear availability hours and signpost to 24/7 services (Samaritans 116 123, text SHOUT to 85258) for out-of-hours support.",
                    },
                    {
                      title: "Separate work from home life",
                      description:
                        "Develop rituals that help you transition from \"MHFA mode\" to \"home mode\". This might be a physical activity, a specific playlist on the way home, or a deliberate decompression routine. Carrying the weight of the day into your personal life erodes both your wellbeing and your relationships.",
                    },
                    {
                      title: "Handover to other MHFAs",
                      description:
                        "If you are going on leave, feeling overwhelmed, or need to step back temporarily, hand over any ongoing support to another MHFA. Brief them appropriately (with the person's consent) so that continuity of support is maintained.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400/70 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-white/80">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Remember:</strong>{" "}
                  Boundaries protect both you and the people you support. An
                  MHFA who has no boundaries will eventually have nothing left
                  to give. An MHFA who maintains healthy boundaries can sustain
                  their role for years, providing consistent, high-quality
                  support to many people over time. Boundaries are an act of
                  care, not an act of selfishness.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================= */}
        {/* Section 05: Supervision and Debriefing */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Supervision and Debriefing
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Supervision is not just for therapists. If you are in a role
                where you regularly support people through mental health
                difficulties, you need a structured system to process your
                experiences, reflect on your practice, and identify when you
                need additional support. Regular supervision is one of the most
                effective protective factors against compassion fatigue and
                vicarious trauma.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Types of Support for MHFAs
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Regular Supervision
                    </p>
                    <p className="text-sm text-white/80">
                      Ideally at least once per month, with a trained supervisor
                      or experienced MHFA coordinator. Supervision provides a
                      confidential space to discuss cases (without identifying
                      individuals), process emotional responses, explore
                      challenging situations, and receive guidance. It is not
                      performance management &mdash; it is professional support.
                    </p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Peer Support Between MHFAs
                    </p>
                    <p className="text-sm text-white/80">
                      Connecting with other MHFAs who understand the unique
                      challenges of the role. Peer support groups allow MHFAs to
                      share experiences, learn from one another, normalise
                      emotional reactions, and reduce feelings of isolation. If
                      your workplace has multiple MHFAs, regular group meetings
                      are invaluable.
                    </p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Structured Debriefing After Difficult Conversations
                    </p>
                    <p className="text-sm text-white/80">
                      After a particularly difficult or distressing conversation
                      &mdash; such as a suicide disclosure, an abuse
                      disclosure, or a traumatic incident &mdash; the MHFA
                      should have access to a structured debrief. This should
                      happen as soon as possible after the event and should
                      cover both the practical aspects (what happened, what
                      actions were taken) and the emotional impact (how did it
                      affect you, what support do you need).
                    </p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Access to Professional Counselling
                    </p>
                    <p className="text-sm text-white/80">
                      MHFAs should know when to access their own professional
                      support. This might be through an Employee Assistance
                      Programme (EAP), occupational health, their GP, or
                      private counselling. Accessing counselling is not a sign
                      of failure &mdash; it is a sign that you are taking your
                      wellbeing seriously and modelling good mental health
                      practice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Employer Responsibility
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Employers who appoint MHFAs have a responsibility to support
                  them in that role. This means providing access to regular
                  supervision, structured debriefing, ongoing training and
                  refresher courses, and professional support services. An MHFA
                  programme that appoints people but provides no ongoing
                  support is setting those individuals up to fail &mdash; and
                  potentially causing them harm.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Key Principle:
                  </strong>{" "}
                  Supervision is not optional. It is not a sign of weakness or
                  incompetence. Professional counsellors, psychologists, and
                  therapists all receive regular supervision throughout their
                  careers. If trained mental health professionals need
                  supervision, Mental Health First Aiders certainly do too.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================= */}
        {/* Section 06: Personal Resilience and Reflective Practice */}
        {/* ============================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Personal Resilience and Reflective Practice
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Personal resilience is not about being tough or never struggling.
                It is about having the self-awareness, strategies, and support
                networks to navigate difficult experiences, recover from
                setbacks, and continue to function effectively. For MHFAs,
                building and maintaining personal resilience is an ongoing,
                active process &mdash; not a personality trait you either have
                or do not have.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Building Personal Resilience
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Self-Awareness
                    </p>
                    <p className="text-xs text-white/80">
                      Know your own triggers, patterns, and warning signs.
                      Recognise when you are becoming emotionally overloaded
                      before you reach breaking point. Understanding yourself
                      is the foundation of resilience.
                    </p>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Realistic Optimism
                    </p>
                    <p className="text-xs text-white/80">
                      Maintain a balanced perspective. Acknowledge that
                      difficult things happen, but also recognise that most
                      people recover with the right support. You are making a
                      difference, even when you cannot see the outcome.
                    </p>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Adaptability
                    </p>
                    <p className="text-xs text-white/80">
                      Accept that not every conversation will go as planned.
                      Some people will not want your help. Some situations will
                      not have a neat resolution. Being able to adapt and accept
                      uncertainty is a key resilience skill.
                    </p>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Support Networks
                    </p>
                    <p className="text-xs text-white/80">
                      Cultivate relationships with people who support and
                      energise you &mdash; colleagues, friends, family,
                      mentors. Do not try to carry the burden alone. Strong
                      social connections are one of the most powerful
                      protective factors for mental health.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reflective Practice */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Reflective Practice for MHFAs
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Reflective practice is a structured approach to learning from
                  experience. After each significant MHFA interaction, take time
                  to consider:
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <p className="text-green-300 text-lg font-bold mb-1">
                      What went well?
                    </p>
                    <p className="text-[11px] text-white/70">
                      What did I do that was helpful? What skills did I use
                      effectively? What worked?
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-center">
                    <p className="text-amber-300 text-lg font-bold mb-1">
                      What could improve?
                    </p>
                    <p className="text-[11px] text-white/70">
                      What would I do differently next time? Where did I
                      struggle? What skills do I need to develop?
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg text-center">
                    <p className="text-blue-300 text-lg font-bold mb-1">
                      What did I learn?
                    </p>
                    <p className="text-[11px] text-white/70">
                      What new insight do I have? How has this experience
                      developed me? What will I take forward?
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Self-Care Tools */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Self-Care Tools
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Journaling
                    </p>
                    <p className="text-xs text-white/80">
                      Writing about your experiences helps your brain process
                      them. Keep a reflective journal (without identifiable
                      details of individuals) where you record your thoughts,
                      feelings, and learning after significant interactions.
                    </p>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Mindfulness
                    </p>
                    <p className="text-xs text-white/80">
                      Regular mindfulness practice &mdash; even 5 to 10 minutes
                      per day &mdash; can reduce stress, improve emotional
                      regulation, and build resilience. Focus on your breathing,
                      notice your thoughts without judgement, and bring
                      yourself back to the present moment.
                    </p>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Physical Health Foundations
                    </p>
                    <p className="text-xs text-white/80">
                      Physical and mental health are deeply connected. Regular
                      exercise, adequate sleep (7 to 9 hours), balanced
                      nutrition, limited alcohol, and staying hydrated all
                      contribute to emotional resilience and the ability to
                      cope with the demands of the MHFA role.
                    </p>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">
                      Ongoing CPD and Refresher Training
                    </p>
                    <p className="text-xs text-white/80">
                      Keep your skills and knowledge current through continuing
                      professional development. Attend refresher courses,
                      workshops, and learning events. Confidence in your
                      competence reduces anxiety and improves your ability to
                      support others effectively.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HandHeart className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Knowing When to Step Back
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  There is no shame in stepping back from the MHFA role &mdash;
                  temporarily or permanently &mdash; if it is affecting your
                  own mental health. Signs that you may need to step back
                  include: persistent symptoms of compassion fatigue or
                  vicarious trauma that are not improving with self-care and
                  supervision; dreading the role rather than finding it
                  meaningful; negative impact on your personal relationships,
                  physical health, or work performance; or significant personal
                  life events that require your full emotional capacity.
                  Stepping back is not failure &mdash; it is responsible
                  self-care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Self-Care Wheel Diagram */}
        {/* ============================================================= */}
        <section className="mb-10">
          <div className="bg-white/5 border border-purple-500/30 p-4 sm:p-6 rounded-lg">
            <p className="text-sm font-medium text-white mb-2 text-center">
              The Self-Care Wheel &mdash; Five Dimensions of Wellbeing
            </p>
            <p className="text-[11px] text-white/50 text-center mb-6">
              Effective self-care addresses all five dimensions. Neglecting any
              one area can undermine the others.
            </p>

            {/* Wheel Diagram — Circular Layout */}
            <div className="relative max-w-md mx-auto aspect-square">
              {/* Centre Circle */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-[10px] sm:text-xs font-semibold text-purple-300">
                      Self-Care
                    </p>
                  </div>
                </div>
              </div>

              {/* Top — Physical */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[42%] text-center">
                <div className="bg-green-500/15 border border-green-500/30 rounded-lg p-2 sm:p-3">
                  <p className="text-green-300 text-xs sm:text-sm font-bold mb-0.5">
                    Physical
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/60 leading-tight">
                    Exercise, sleep, nutrition, health checks, rest
                  </p>
                </div>
              </div>

              {/* Top-Right — Emotional */}
              <div className="absolute top-[22%] right-0 w-[42%] text-center">
                <div className="bg-rose-500/15 border border-rose-500/30 rounded-lg p-2 sm:p-3">
                  <p className="text-rose-300 text-xs sm:text-sm font-bold mb-0.5">
                    Emotional
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/60 leading-tight">
                    Processing feelings, journaling, therapy, self-compassion
                  </p>
                </div>
              </div>

              {/* Bottom-Right — Social */}
              <div className="absolute bottom-[12%] right-[2%] w-[42%] text-center">
                <div className="bg-blue-500/15 border border-blue-500/30 rounded-lg p-2 sm:p-3">
                  <p className="text-blue-300 text-xs sm:text-sm font-bold mb-0.5">
                    Social
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/60 leading-tight">
                    Relationships, community, connection, support networks
                  </p>
                </div>
              </div>

              {/* Bottom-Left — Professional */}
              <div className="absolute bottom-[12%] left-[2%] w-[42%] text-center">
                <div className="bg-amber-500/15 border border-amber-500/30 rounded-lg p-2 sm:p-3">
                  <p className="text-amber-300 text-xs sm:text-sm font-bold mb-0.5">
                    Professional
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/60 leading-tight">
                    Boundaries, supervision, CPD, workload management
                  </p>
                </div>
              </div>

              {/* Top-Left — Spiritual */}
              <div className="absolute top-[22%] left-0 w-[42%] text-center">
                <div className="bg-violet-500/15 border border-violet-500/30 rounded-lg p-2 sm:p-3">
                  <p className="text-violet-300 text-xs sm:text-sm font-bold mb-0.5">
                    Spiritual
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/60 leading-tight">
                    Meaning, purpose, values, mindfulness, reflection
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-white/40 text-center mt-4">
              Each dimension supports the others. Strong physical health
              supports emotional resilience. Social connections strengthen
              professional wellbeing. Spiritual clarity provides meaning in
              difficult times.
            </p>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Key Helplines */}
        {/* ============================================================= */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-purple-400" />
              <p className="text-lg font-semibold text-purple-400">
                Support for MHFAs &mdash; You Deserve Help Too
              </p>
            </div>
            <p className="text-sm text-white/80 mb-4">
              These services are available to everyone &mdash; including Mental
              Health First Aiders. If you are struggling, please reach out.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-purple-400 mb-1">
                  116 123
                </p>
                <p className="text-sm font-medium text-white mb-1">
                  Samaritans
                </p>
                <p className="text-xs text-white/60">
                  Free, 24 hours a day, 7 days a week. For anyone who is
                  struggling &mdash; you do not need to be suicidal to call.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-purple-400 mb-1">
                  Text SHOUT to 85258
                </p>
                <p className="text-sm font-medium text-white mb-1">
                  Shout Crisis Text Line
                </p>
                <p className="text-xs text-white/60">
                  Free, 24/7 text-based support. Useful if you cannot or prefer
                  not to speak on the phone.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-purple-400 mb-1">
                  Your EAP
                </p>
                <p className="text-sm font-medium text-white mb-1">
                  Employee Assistance Programme
                </p>
                <p className="text-xs text-white/60">
                  Free, confidential counselling through your employer. Ask HR
                  or your line manager for details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
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
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-6">
              Next: Module 6 &mdash; Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
