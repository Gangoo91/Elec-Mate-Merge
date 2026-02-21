import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Search,
  Eye,
  EyeOff,
  Brain,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  HelpCircle,
  Users,
  Shield,
  Lock,
  Unlock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions                                              */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    question: 'In the Johari Window, the "blind spot" quadrant refers to:',
    options: [
      'Things you know about yourself but hide from others',
      'Things others can see about you but you cannot see yourself',
      'Things nobody knows — neither you nor others',
      'Things that are open and known to everyone',
    ],
    correctIndex: 1,
    explanation:
      'The blind spot quadrant contains information about you that other people can observe (your habits, mannerisms, impact on others) but that you are not aware of yourself. Feedback from trusted colleagues is the primary way to reduce this quadrant.',
  },
  {
    question: 'The Dunning-Kruger effect predicts that people with low competence in an area will:',
    options: [
      'Accurately assess their own abilities',
      'Underestimate their abilities due to imposter syndrome',
      'Overestimate their abilities because they lack the knowledge to recognise their own gaps',
      'Have no opinion about their abilities',
    ],
    correctIndex: 2,
    explanation:
      'Dunning and Kruger (1999) found that people with low competence tend to overestimate their ability because they lack the meta-cognitive skills to recognise what they do not know. Paradoxically, as competence increases, self-assessment often becomes more modest because the person now understands the complexity of the field.',
  },
  {
    question: 'In the SBI Feedback Model, what do S, B, and I stand for?',
    options: [
      'Strengths, Barriers, Improvements',
      'Situation, Behaviour, Impact',
      'Self, Blind spot, Insight',
      'Standard, Benchmark, Indicator',
    ],
    correctIndex: 1,
    explanation:
      'SBI stands for Situation (when and where it happened), Behaviour (the specific observable action), and Impact (the effect that behaviour had). This structure keeps feedback factual and non-personal, focusing on what was done rather than who the person is.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I ask for feedback without it being awkward?',
    answer:
      'The key is to be specific and make it easy for the other person. Instead of "How am I doing?" (which is too broad and invites platitudes), ask something concrete: "When I ran that toolbox talk this morning, was there anything I could have explained more clearly?" or "You watched me do that installation — was there a neater way to route the cables?" Specificity removes the awkwardness because the other person knows exactly what you are asking about and can give a targeted, useful response.',
  },
  {
    question: 'What if the feedback I receive feels unfair or wrong?',
    answer:
      'First, resist the urge to argue immediately. Thank the person for sharing their perspective, then take time to sit with it before deciding whether it is valid. Not all feedback is accurate — people have their own biases and blind spots. But even feedback that feels wrong can contain a useful grain of truth. Ask yourself: "Is there any part of this I can learn from, even if I disagree with the overall conclusion?" If multiple people give you the same feedback independently, it is almost certainly worth taking seriously, even if it is uncomfortable to hear.',
  },
  {
    question: 'Does having a growth mindset mean I should never feel disappointed by failure?',
    answer:
      'No. Growth mindset does not mean being perpetually positive or immune to disappointment. It is perfectly normal and healthy to feel disappointed when something goes wrong. The difference is in what happens after the disappointment. A fixed mindset says "I failed because I am not good enough — there is no point trying again." A growth mindset says "I feel disappointed, but I can learn from this and improve." The emotion is the same; the interpretation and the next step are what differ.',
  },
  {
    question: 'Is the Dunning-Kruger effect the same as arrogance?',
    answer:
      'Not exactly. Arrogance is a personality trait where someone knowingly acts superior. The Dunning-Kruger effect is a cognitive bias where someone genuinely believes they are more competent than they are — they are not pretending; they truly lack the awareness to see their own gaps. The person affected by Dunning-Kruger is often well-intentioned and would be surprised to learn that their self-assessment is inaccurate. This is why self-awareness and honest feedback are so important: they provide the external data that corrects the internal miscalibration.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Who developed the Johari Window model?',
    options: [
      'Daniel Goleman and Peter Salovey',
      'Joseph Luft and Harrington Ingham',
      'Albert Ellis and Aaron Beck',
      'Carol Dweck and Martin Seligman',
    ],
    correctAnswer: 1,
    explanation:
      'The Johari Window was created in 1955 by American psychologists Joseph Luft and Harrington Ingham. The name "Johari" is a portmanteau of their first names (Jo + Harry).',
  },
  {
    id: 2,
    question: 'In the Johari Window, the "hidden area" contains:',
    options: [
      'Things others know about you but you do not',
      'Things nobody knows about you',
      'Things you know about yourself but choose not to reveal to others',
      'Things that are openly known by everyone',
    ],
    correctAnswer: 2,
    explanation:
      'The hidden area (also called the "facade") contains information, feelings, and experiences that you are aware of but have chosen not to share with others. Appropriate self-disclosure can move information from the hidden area into the open area, building trust and transparency.',
  },
  {
    id: 3,
    question:
      "According to the Dunning-Kruger effect, what typically happens as a person's competence increases?",
    options: [
      'Their confidence increases at the same rate as their competence',
      'Their confidence initially drops as they realise how much they do not know',
      'Their confidence remains permanently low',
      'They become more arrogant and refuse feedback',
    ],
    correctAnswer: 1,
    explanation:
      'The Dunning-Kruger effect shows that after an initial peak of overconfidence (when competence is low), confidence typically drops as the person gains enough knowledge to recognise the complexity of the field. This is sometimes called the "valley of despair." Confidence then gradually rebuilds on a more realistic foundation as true expertise develops.',
  },
  {
    id: 4,
    question: "Carol Dweck's research on mindset found that people with a fixed mindset:",
    options: [
      'Embrace challenges and persist through setbacks',
      'Believe abilities are largely innate and unchangeable, leading them to avoid challenges that might reveal inadequacy',
      'Consistently seek feedback to improve their performance',
      'View failure as a learning opportunity',
    ],
    correctAnswer: 1,
    explanation:
      'Dweck found that people with a fixed mindset believe their abilities are innate traits — you either have talent or you do not. This leads them to avoid challenges (which might expose a lack of talent), give up easily when things get hard, and ignore useful negative feedback. People with a growth mindset, by contrast, believe abilities can be developed through effort and learning.',
  },
  {
    id: 5,
    question: 'When giving feedback using the SBI model, "Situation" means:',
    options: [
      "Describing the person's general personality",
      'Stating when and where the specific event occurred',
      'Explaining how you feel about the person overall',
      'Comparing the person to their colleagues',
    ],
    correctAnswer: 1,
    explanation:
      'The "S" in SBI specifies the when and where of the event: "During yesterday\'s toolbox talk" or "When we were working on the second-floor distribution board on Monday." This grounds the feedback in a specific, observable moment rather than making vague generalisations.',
  },
  {
    id: 6,
    question:
      'A qualified electrician who has ten years of experience tells an apprentice, "I know everything there is to know about domestic rewires." This statement best illustrates:',
    options: [
      'Growth mindset',
      'Accurate self-assessment',
      'The Dunning-Kruger effect or overconfidence bias',
      "The Johari Window's open area",
    ],
    correctAnswer: 2,
    explanation:
      'Claiming complete knowledge in any area suggests overconfidence and a lack of accurate self-assessment. Even extensive experience does not mean there is nothing left to learn — regulations change, techniques evolve, and new products emerge. A self-aware expert would acknowledge their deep experience while remaining open to continued learning.',
  },
  {
    id: 7,
    question: 'The primary way to reduce your blind spot area in the Johari Window is to:',
    options: [
      'Spend more time in self-reflection and journaling',
      'Actively seek honest feedback from colleagues, supervisors, and mentors',
      'Hide your weaknesses more effectively',
      'Ignore what others think and focus only on your own self-assessment',
    ],
    correctAnswer: 1,
    explanation:
      'Because blind spots are things others can see but you cannot, the only reliable way to reduce them is to actively seek feedback from people who observe you regularly. Self-reflection alone cannot reveal blind spots — by definition, you are not aware of them.',
  },
  {
    id: 8,
    question:
      'An apprentice receives feedback that they speak too quietly during toolbox talks. Instead of getting defensive, they think: "That is useful — I will work on projecting my voice." This response demonstrates:',
    options: [
      'A fixed mindset — they are accepting they have a permanent weakness',
      'A growth mindset — they see the feedback as an opportunity to develop a skill',
      'The Dunning-Kruger effect — they are overestimating their speaking ability',
      'Emotional suppression — they are hiding their true feelings',
    ],
    correctAnswer: 1,
    explanation:
      'This is a classic growth mindset response: treating feedback as actionable information rather than a judgement of innate ability. The apprentice does not take the feedback as evidence that they are "bad at presenting" (fixed mindset), but as a specific skill they can practise and improve.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Describe the four quadrants of the Johari Window and explain how each relates to self-awareness',
  'Identify common blind spots that affect working relationships on construction sites',
  'Explain the Dunning-Kruger effect and its implications for accurate self-assessment',
  'Distinguish between a fixed mindset and a growth mindset and describe how each affects learning',
  'Apply the SBI Feedback Model to give and receive structured, non-personal feedback',
  'Develop practical strategies for expanding your open area and reducing blind spots',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function EIModule2Section3() {
  useSEO({
    title: 'Strengths, Weaknesses & Blind Spots | Module 2: Self-Awareness',
    description:
      "The Johari Window, blind spots in the workplace, the Dunning-Kruger effect, Carol Dweck's growth mindset, and the SBI Feedback Model for construction professionals.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Self-Awareness
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article Body ──────────────────────────────────────────── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Search className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 2 &middot; SECTION 3
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Strengths, Weaknesses &amp; Blind Spots
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding what you know about yourself, what others see that you do not, and how to
            use feedback and self-reflection to close the gap.
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  The Johari Window maps four areas of self-knowledge: open, blind, hidden, and
                  unknown
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Everyone has blind spots &mdash; things others can see about you that you cannot
                  see yourself
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  The Dunning-Kruger effect shows that low competence often comes with
                  overconfidence
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  A growth mindset treats weaknesses as areas for development, not fixed limitations
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Blind spots damage relationships and reputation without you realising it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Accurate self-assessment prevents both overconfidence and imposter syndrome
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Giving and receiving good feedback is essential for team performance on site
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  A growth mindset is the foundation of continuous professional development
                  throughout your career
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01 — The Johari Window                              */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The Johari Window</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In 1955, American psychologists Joseph Luft and Harrington Ingham created a model for
              understanding self-awareness in the context of relationships. They called it the
              &ldquo;Johari Window&rdquo; (a portmanteau of their first names, Jo and Harry). It has
              since become one of the most widely used frameworks in leadership development,
              team-building, and emotional intelligence training worldwide.
            </p>

            <p className="text-white text-base leading-relaxed">
              The model divides self-knowledge into four quadrants, based on two dimensions: what
              <em> you</em> know about yourself, and what <em>others</em> know about you. Each
              quadrant has distinct implications for self-awareness and interpersonal effectiveness.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Four Quadrants</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Unlock className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">1. Open Area</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Known to self &amp; known to others</strong>
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    This quadrant contains everything that is openly known &mdash; your visible
                    skills, your stated opinions, your publicly known strengths and weaknesses, your
                    behaviour patterns that both you and your colleagues can see. This is the area
                    of free and effective communication.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Construction example:</strong> Everyone on site knows you are excellent
                    at complex consumer unit work, and you know it too. You are also known for being
                    punctual, and you take pride in this. This information is in the open area.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <EyeOff className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">2. Blind Spot</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Unknown to self &amp; known to others</strong>
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    This quadrant contains things about you that other people can see but you
                    cannot. These might be habits, mannerisms, the impact of your behaviour on
                    others, or patterns you are unaware of. Blind spots are, by definition,
                    invisible to you &mdash; which is what makes them so important and so difficult
                    to address without external feedback.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Construction example:</strong> You do not realise that you sigh loudly
                    and roll your eyes whenever someone asks you a question you think is obvious.
                    Your colleagues have all noticed it and it makes apprentices reluctant to ask
                    you for help. You have no idea this is happening.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">3. Hidden Area</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Known to self &amp; unknown to others</strong>
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    This quadrant contains things you know about yourself but choose not to reveal
                    to others. This includes private feelings, insecurities, past experiences, or
                    aspects of your knowledge that you keep hidden. While some privacy is healthy,
                    an excessively large hidden area can prevent genuine connection and trust.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Construction example:</strong> You feel anxious about working at height
                    but have never mentioned it to anyone because you think it would be seen as
                    weakness. You also have a background in electronics that could be useful for
                    control-system work, but you have never told your supervisor because you are
                    worried about being given extra responsibilities.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">4. Unknown Area</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Unknown to self &amp; unknown to others</strong>
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    This quadrant contains things that neither you nor others are aware of. These
                    might be latent talents, unconscious motivations, deeply buried feelings, or
                    capabilities that have never been tested. New experiences, challenges, and
                    self-discovery can gradually reveal what lies in this quadrant.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Construction example:</strong> You have never been asked to lead a team,
                    so neither you nor your colleagues know that you have a natural talent for
                    coordinating people and managing workflows. This ability sits in your unknown
                    area until circumstances bring it to light.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                The Goal: Expand the Open Area
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                The most effective and self-aware individuals have a large open area. They know
                their own strengths and weaknesses, and the people around them see the same picture.
                There is alignment between self-perception and external perception, which builds
                trust, reduces misunderstandings, and makes collaboration smoother.
              </p>
              <p className="text-white text-sm leading-relaxed">
                You expand the open area in two ways: by <strong>seeking feedback</strong> (which
                moves information from the blind spot into the open area) and by appropriate
                <strong> self-disclosure</strong> (which moves information from the hidden area into
                the open area). Both require courage and vulnerability, but both are essential for
                developing genuine self-awareness.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Blind Spots in the Workplace                   */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Blind Spots in the Workplace</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Blind spots are the most consequential quadrant of the Johari Window for working
              relationships. Because you are unaware of them, they operate without your knowledge,
              affecting how others perceive you, how they respond to you, and whether they trust and
              respect you &mdash; all without you realising there is a problem.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <EyeOff className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Common Blind Spots on Construction Sites
                </h3>
              </div>
              <ul className="text-white text-sm space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Communication tone:</strong> You think you are being direct and
                    efficient; others experience you as abrupt or dismissive. This is especially
                    common when experienced electricians communicate with apprentices or with other
                    trades they perceive as less technically skilled.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Body language under stress:</strong> You are unaware that when you feel
                    pressured, you cross your arms, avoid eye contact, and give one-word answers.
                    Others read this as hostility or unapproachability, even though you are simply
                    concentrating.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Knowledge assumptions:</strong> You assume everyone understands what you
                    mean when you use technical shorthand. You do not realise that your instructions
                    are unclear to people who have not been doing the job as long as you have.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Impact of mood:</strong> You think you are good at hiding your bad
                    moods, but your colleagues can always tell when you have had a difficult
                    morning. Your mood leaks out through your behaviour in ways you do not notice.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Listening habits:</strong> You believe you listen well, but others
                    notice that you frequently interrupt, finish people&rsquo;s sentences, or check
                    your phone while they are speaking. They feel unheard, even though you think you
                    are fully engaged.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">
                    Why Blind Spots Persist
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Blind spots persist because people rarely give unsolicited honest feedback,
                    especially upward or sideways. On a construction site, the culture often
                    discourages vulnerability and direct interpersonal feedback. Colleagues may
                    complain about your blind spot to each other (&ldquo;He is always like
                    that&rdquo;) but never tell you directly. This means your blind spots can
                    operate for years &mdash; even an entire career &mdash; unless you actively seek
                    feedback and create a safe environment for people to give it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — The Dunning-Kruger Effect                      */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The Dunning-Kruger Effect</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In 1999, psychologists David Dunning and Justin Kruger of Cornell University published
              a landmark paper titled &ldquo;Unskilled and Unaware of It: How Difficulties in
              Recognising One&rsquo;s Own Incompetence Lead to Inflated Self-Assessments.&rdquo;
              Their research revealed a striking cognitive bias that has profound implications for
              self-awareness.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Core Finding</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Dunning and Kruger found that people with low competence in a given area tend to
                significantly <em>overestimate</em> their ability. This is not arrogance or
                dishonesty &mdash; they genuinely believe they are more competent than they are. The
                reason is paradoxical: the same skills needed to perform well are also the skills
                needed to <em>recognise</em> good performance. If you lack the knowledge to do
                something properly, you also lack the knowledge to see that you are doing it badly.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Conversely, people with high competence tend to <em>underestimate</em> their
                ability. Because they understand the complexity and nuance of their field, they
                assume that what comes easily to them must come easily to everyone. This creates a
                systematic miscalibration: the least competent are the most confident, and the most
                competent are the most humble.
              </p>
              <p className="text-white text-sm leading-relaxed">
                This pattern has been replicated across dozens of studies and domains &mdash; from
                logical reasoning to grammar to emotional intelligence itself.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                The Competence-Confidence Curve
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Stage 1: &ldquo;Peak of Mount Stupid&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    When you first learn something new, a little knowledge gives you a lot of
                    confidence. You have learned enough to feel you understand the topic but not
                    enough to see how much you do not know. An apprentice in their first year might
                    feel they have mastered domestic wiring after completing a few successful
                    installations, not yet understanding the complexity of fault-finding, testing,
                    or non-standard situations.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Stage 2: &ldquo;Valley of Despair&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    As competence increases, you begin to realise how much there is to know. Your
                    confidence drops because you can now see the gaps in your knowledge. This is the
                    stage where imposter syndrome often strikes &mdash; you know enough to recognise
                    quality work but feel you fall short of it yourself. A third-year apprentice
                    studying for their AM2 might feel less confident than they did in year one, even
                    though they are objectively far more competent.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Stage 3: &ldquo;Slope of Enlightenment&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    With continued experience and deliberate practice, confidence gradually rebuilds
                    on a more realistic foundation. You develop a calibrated sense of what you know,
                    what you do not know, and what you can figure out. This is the zone of accurate
                    self-assessment that Goleman identified as a core self-awareness competency.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Stage 4: &ldquo;Plateau of Sustainability&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    True experts have high competence and appropriately high confidence, but they
                    remain humble because they understand the depth and complexity of their field.
                    They readily acknowledge what they do not know and actively continue learning. A
                    master electrician who has been in the trade for twenty-five years still studies
                    regulation updates and attends CPD because they understand that expertise
                    requires continuous maintenance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Construction Example: The Dunning-Kruger Effect on Site
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                A newly qualified electrician confidently declares they can wire a complex
                three-phase distribution board without any reference documentation. They have done
                it once before during training and it went well. They do not realise that the
                training scenario was heavily simplified compared to a real-world installation with
                multiple sub-circuits, PFC considerations, and coordination requirements.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Meanwhile, the experienced charge-hand on site — who could wire the same board in
                their sleep — insists on double-checking the design specification before starting,
                not because they lack confidence, but because they have enough experience to know
                how easily things can go wrong when assumptions are made. The charge-hand&rsquo;s
                caution is a sign of competence, not of insecurity.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — Carol Dweck's Growth Mindset                   */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Carol Dweck&rsquo;s Growth Mindset</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Stanford psychologist Carol Dweck spent decades researching how people&rsquo;s beliefs
              about their own abilities affect their behaviour, learning, and resilience. Her
              findings, published in <em>Mindset: The New Psychology of Success</em> (2006), have
              transformed how we understand motivation and personal development.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-4">Two Mindsets</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/5 rounded-lg p-4 border border-rose-500/20">
                  <p className="text-rose-400 text-sm font-semibold mb-3">Fixed Mindset</p>
                  <p className="text-white text-xs leading-relaxed mb-3">
                    The belief that your abilities, intelligence, and talents are essentially fixed
                    traits &mdash; you either have them or you do not. &ldquo;I am just not good at
                    maths,&rdquo; or &ldquo;Some people are natural leaders and I am not one of
                    them.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Effects on behaviour:</strong>
                  </p>
                  <ul className="text-white text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>Avoids challenges that might reveal a lack of talent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        Gives up quickly when things get hard (&ldquo;I cannot do this&rdquo;)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        Sees effort as pointless (&ldquo;If I were good at it, it would come
                        naturally&rdquo;)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        Ignores useful criticism because it feels like an attack on identity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>Feels threatened by others&rsquo; success</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white text-sm font-semibold mb-3">Growth Mindset</p>
                  <p className="text-white text-xs leading-relaxed mb-3">
                    The belief that abilities can be developed through effort, good strategies, and
                    input from others. &ldquo;I am not good at this <em>yet</em>, but I can
                    learn,&rdquo; or &ldquo;If I put the work in and get the right guidance, I can
                    improve.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Effects on behaviour:</strong>
                  </p>
                  <ul className="text-white text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>Embraces challenges as opportunities to learn and grow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        Persists through setbacks (&ldquo;This is hard but I am making
                        progress&rdquo;)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>Sees effort as the path to mastery, not a sign of inadequacy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>Welcomes feedback as useful data for improvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        Is inspired by others&rsquo; success (&ldquo;If they can do it, I can learn
                        how&rdquo;)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Growth Mindset in the Electrical Trade
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                The construction industry, and the electrical trade specifically, provides countless
                opportunities to observe both mindsets in action:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Receiving feedback on workmanship:</strong> Fixed mindset: &ldquo;He is
                    saying I am a bad electrician.&rdquo; Growth mindset: &ldquo;He is showing me a
                    better way to do this.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Encountering new technology:</strong> Fixed mindset: &ldquo;I do not
                    understand smart home systems &mdash; that is not my thing.&rdquo; Growth
                    mindset: &ldquo;I have not worked with smart home systems yet, but I can
                    learn.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Failing a test or inspection:</strong> Fixed mindset: &ldquo;I knew I
                    was not cut out for this.&rdquo; Growth mindset: &ldquo;What do I need to study
                    or practise to pass next time?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Watching a colleague excel:</strong> Fixed mindset: &ldquo;They are just
                    naturally talented &mdash; I could never be that good.&rdquo; Growth mindset:
                    &ldquo;What are they doing that I could learn from?&rdquo;
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">
                    The Power of &ldquo;Yet&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    One of Dweck&rsquo;s most practical insights is the power of adding the word
                    &ldquo;yet&rdquo; to statements about your abilities. &ldquo;I cannot do
                    three-phase design&rdquo; becomes &ldquo;I cannot do three-phase design
                    <em> yet</em>.&rdquo; &ldquo;I am not confident running toolbox talks&rdquo;
                    becomes &ldquo;I am not confident running toolbox talks <em>yet</em>.&rdquo;
                    This single word shifts the statement from a fixed judgement about who you are
                    to a temporary description of where you currently stand on a journey of
                    learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — The SBI Feedback Model                         */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The SBI Feedback Model</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              The SBI (Situation-Behaviour-Impact) Feedback Model was developed by the Centre for
              Creative Leadership (CCL) as a structured method for giving feedback that is specific,
              factual, and non-personal. It removes the subjective judgement that makes feedback
              feel like an attack and replaces it with objective observation.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Three Components</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">S — Situation</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Describe <em>when</em> and <em>where</em> the behaviour occurred. Be specific
                    about the context so the person knows exactly which moment you are referring to.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Example:</strong> &ldquo;During the toolbox talk on Monday morning, when
                    you were explaining the permit-to-work procedures...&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">B — Behaviour</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Describe the <em>specific, observable action</em> you witnessed. Stick to what
                    you could see or hear &mdash; do not interpret motives or make character
                    judgements. &ldquo;You did X&rdquo; rather than &ldquo;You are X.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Example:</strong> &ldquo;...you used a real-life example from last
                    week&rsquo;s incident and asked the team questions to check their understanding
                    rather than just reading from the sheet.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">I — Impact</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Describe the <em>effect</em> that the behaviour had &mdash; on you, on others,
                    on the team, on the outcome. This connects the behaviour to a real consequence,
                    which helps the person understand why it matters.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Example:</strong> &ldquo;...the team was much more engaged than usual. I
                    noticed people asking follow-up questions and the whole talk felt more like a
                    conversation than a lecture. The key safety messages seemed to really
                    land.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                SBI for Constructive Feedback
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                SBI works equally well for feedback about behaviour that needs to change. The
                structure keeps the conversation factual and reduces defensiveness:
              </p>
              <div className="bg-rose-500/5 rounded-lg p-3 border border-rose-500/20">
                <p className="text-white text-xs leading-relaxed mb-2">
                  <strong>S:</strong> &ldquo;Yesterday afternoon, when we were working together on
                  the second-floor distribution board...&rdquo;
                </p>
                <p className="text-white text-xs leading-relaxed mb-2">
                  <strong>B:</strong> &ldquo;...you connected the RCBO before I had finished
                  checking the circuit calculations, and you did not mention what you were
                  doing...&rdquo;
                </p>
                <p className="text-white text-xs leading-relaxed">
                  <strong>I:</strong> &ldquo;...I was not able to verify the calculation before the
                  circuit was live, which put me in an uncomfortable position for safety sign-off.
                  It also meant I had to isolate the circuit and recheck after the fact, which added
                  twenty minutes.&rdquo;
                </p>
              </div>
              <p className="text-white text-sm leading-relaxed mt-3">
                Notice what is <em>not</em> in this feedback: no character judgement (&ldquo;you are
                reckless&rdquo;), no mind-reading (&ldquo;you obviously do not care about
                safety&rdquo;), no exaggeration (&ldquo;you always do this&rdquo;). Just a specific
                situation, a specific behaviour, and the specific impact it had.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Receiving Feedback Using SBI Thinking
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                You can also use SBI as a mental framework when <em>receiving</em> feedback. If
                someone gives you vague or emotional feedback (&ldquo;You need to improve your
                attitude&rdquo;), you can ask SBI-style questions to get useful, actionable
                information:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Situation:</strong> &ldquo;Can you give me a specific example of when
                    this happened?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Behaviour:</strong> &ldquo;What specifically did I do or say that gave
                    you that impression?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Impact:</strong> &ldquo;How did that affect you or the team?&rdquo;
                  </span>
                </li>
              </ul>
              <p className="text-white text-sm leading-relaxed mt-3">
                These questions are not defensive &mdash; they show genuine interest in
                understanding the feedback so you can act on it. They also train the other person to
                give better feedback in the future.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 06 — Expanding Your Open Area                       */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">06</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Expanding Your Open Area</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              The ultimate goal of this section is to give you practical strategies for expanding
              your Johari Window&rsquo;s open area &mdash; increasing the overlap between what you
              know about yourself and what others know about you. Here are the most effective
              approaches for construction professionals.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Strategy 1: Active Feedback-Seeking
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Do not wait for feedback to come to you &mdash; go and get it. Make it a habit to
                ask specific, focused questions after significant events:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;How did I come across during that client meeting?&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;Was there anything I could have done better on that installation?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;When I was explaining the testing procedure, was I clear enough?&rdquo;
                  </span>
                </li>
              </ul>
              <p className="text-white text-sm leading-relaxed mt-3">
                Crucially, when you receive feedback, thank the person &mdash; even if the feedback
                is uncomfortable. If people see that you respond to honest feedback with gratitude
                rather than defensiveness, they will be more willing to give it in the future.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Strategy 2: Appropriate Self-Disclosure
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Moving information from your hidden area to your open area means sharing relevant
                aspects of yourself with colleagues. This does not mean over-sharing personal
                details &mdash; it means being honest about things that affect your work:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Admitting when you do not know something: &ldquo;I have not worked with that
                    system before &mdash; can you show me?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Sharing relevant concerns: &ldquo;I am finding this programme tight &mdash; can
                    we discuss priorities?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Acknowledging mistakes: &ldquo;I got that wrong yesterday. Here is what I have
                    done to fix it.&rdquo;
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Strategy 3: Adopt a Growth Mindset Towards Weaknesses
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Instead of hiding weaknesses (which keeps them in the hidden area) or being unaware
                of them (which keeps them in the blind area), adopt a growth mindset that treats
                weaknesses as the next frontier of development. Reframe &ldquo;I am bad at
                testing&rdquo; as &ldquo;Testing is the area where I have the most room to
                grow.&rdquo; This shifts the weakness from something shameful to something
                actionable.
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Self-awareness is not about achieving perfection &mdash; it is about closing the
                    gap between how you see yourself and how others see you. The Johari Window shows
                    you where those gaps exist. The Dunning-Kruger effect warns you that your
                    self-assessment may be less accurate than you think. Carol Dweck&rsquo;s growth
                    mindset gives you permission to treat weaknesses as opportunities. And the SBI
                    Model gives you a practical tool for seeking and giving the feedback that makes
                    all of this possible. The most self-aware people are not those with the fewest
                    blind spots &mdash; they are the ones who actively look for them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQs ────────────────────────────────────────────────── */}
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

        {/* ── Quiz ────────────────────────────────────────────────── */}
        <Quiz questions={quizQuestions} />

        {/* ── Bottom Navigation ───────────────────────────────────── */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
          <Button
            variant="ghost"
            asChild
            className="text-white hover:text-white hover:bg-white/5 touch-manipulation min-h-[44px]"
          >
            <Link to="../ei-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../ei-module-2-section-4">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
