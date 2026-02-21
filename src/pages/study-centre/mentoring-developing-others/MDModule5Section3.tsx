import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Globe,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  Shield,
  BookOpen,
  Scale,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    question: 'How many protected characteristics are listed under the Equality Act 2010?',
    options: ['Six', 'Seven', 'Nine', 'Twelve'],
    correctIndex: 2,
    explanation:
      'The Equality Act 2010 lists nine protected characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation. These are the characteristics on the basis of which it is unlawful to discriminate against someone. As a mentor, you have both a legal and moral duty to ensure your mentoring practice treats everyone fairly regardless of these characteristics.',
  },
  {
    question: 'Affinity bias means that a mentor is more likely to:',
    options: [
      'Challenge learners they find difficult',
      'Give more time, attention, and positive feedback to learners who are similar to themselves',
      'Treat all learners equally regardless of background',
      'Be overly critical of learners from the same background as themselves',
    ],
    correctIndex: 1,
    explanation:
      'Affinity bias is the tendency to favour people who are similar to you — same background, same interests, same communication style, same age group. In a mentoring context, this can mean unconsciously giving more time, patience, and positive feedback to a learner who reminds you of your younger self, while being less patient or less invested in someone who is different. The key word is "unconsciously" — most mentors who exhibit affinity bias are completely unaware they are doing it.',
  },
  {
    question:
      'A Polish apprentice has excellent practical skills but struggles with written English. The most inclusive approach to gathering portfolio evidence would be:',
    options: [
      'Insist they improve their written English before gathering any evidence',
      'Complete the written evidence for them',
      'Use professional discussion (oral evidence) as the primary method, supplemented by photographs, annotated diagrams, and video evidence',
      'Reduce the evidence requirements because English is not their first language',
    ],
    correctIndex: 2,
    explanation:
      'Using professional discussion as the primary evidence method is a reasonable adjustment that allows the apprentice to demonstrate their genuine competence without being penalised for language skills that are separate from their electrical ability. Supplementing with photographs, annotated diagrams, and video evidence provides robust proof of competence in a way that plays to their strengths. This is not lowering the standard — it is removing an unnecessary barrier to demonstrating that the standard has been met.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'Is it my responsibility as a mentor to challenge discriminatory behaviour I witness on site?',
    answer:
      'Yes, it is. As a mentor, you are a role model, and your silence in the face of discriminatory behaviour sends a powerful message — it says that the behaviour is acceptable. You do not need to be confrontational, but you do need to be clear. If you hear someone make a racist, sexist, or otherwise discriminatory comment, a calm but direct response is appropriate: "That is not acceptable on this site" or "We do not talk about people like that here." If the behaviour is serious or persistent, report it through proper channels. Your apprentice is watching how you respond to these situations, and your response teaches them what kind of professional they should become.',
  },
  {
    question: 'How do I mentor someone whose cultural background is very different from my own?',
    answer:
      'Start with curiosity and respect, not assumptions. Ask open questions: "Is there anything about how I am approaching your training that does not work for you?" or "Are there any ways I can adjust my approach to help you learn better?" Different cultures have different norms around communication (direct vs indirect), hierarchy (formal vs informal), feedback (public vs private), and learning (observing vs doing). You do not need to be an expert in every culture — you need to be open, flexible, and willing to adapt. The apprentice is the expert on their own experience; your job is to listen and respond.',
  },
  {
    question: 'What reasonable adjustments should I consider for an apprentice with dyslexia?',
    answer:
      'Reasonable adjustments for dyslexia in a mentoring context might include: allowing extra time for written tasks, using verbal instructions and demonstrations rather than written ones, providing information in a visual format (diagrams, photos, colour coding), breaking complex written information into smaller chunks, using professional discussion rather than written exams where the awarding organisation allows it, and providing printed materials in a dyslexia-friendly font. The key principle is that the adjustment removes the barrier created by the dyslexia without changing the standard that needs to be met. The apprentice still needs to demonstrate competence — the adjustment ensures they have a fair opportunity to do so.',
  },
  {
    question:
      'What if an apprentice uses their protected characteristics as an excuse for poor performance?',
    answer:
      'This is a sensitive but important situation. Having a protected characteristic does not exempt anyone from meeting professional standards. If an apprentice is underperforming and attributing it to discrimination when the issue is actually effort, attitude, or skill, you need to address it honestly while being careful not to dismiss genuine concerns. The approach is: "I take equality seriously and I would never treat you differently because of [characteristic]. But the standard we need to meet is the same for everyone, and right now your work is not meeting that standard. Let us talk about what is getting in the way and how we can fix it." Document your conversations and assessments carefully so that your decisions are based on evidence, not assumptions.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is NOT a protected characteristic under the Equality Act 2010?',
    options: ['Age', 'Social class', 'Gender reassignment', 'Religion or belief'],
    correctAnswer: 1,
    explanation:
      'Social class is not a protected characteristic under the Equality Act 2010, although it is often discussed in the context of equality and diversity. The nine protected characteristics are: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation.',
  },
  {
    id: 2,
    question:
      'A mentor unconsciously gives more positive feedback and attention to male apprentices than female apprentices. This is an example of:',
    options: [
      'Halo effect',
      'Attribution bias',
      'Affinity bias or gender bias',
      'Confirmation bias',
    ],
    correctAnswer: 2,
    explanation:
      'This is an example of affinity bias (favouring people similar to yourself) combined with gender bias (treating people differently based on sex). In a male-dominated industry like electrical installation, mentors — who are predominantly male — may unconsciously give more time, attention, and positive feedback to male apprentices who remind them of their younger selves, while being less naturally comfortable or engaged with female apprentices.',
  },
  {
    id: 3,
    question:
      'What is the best definition of a "reasonable adjustment" in the context of mentoring a learner with a disability?',
    options: [
      'Reducing the standard that the learner needs to meet',
      'Removing a barrier that prevents a disabled person from demonstrating their genuine competence, without changing the standard itself',
      'Giving the learner less work to do',
      'Treating the learner the same as everyone else regardless of their disability',
    ],
    correctAnswer: 1,
    explanation:
      'A reasonable adjustment removes or reduces a barrier that puts a disabled person at a disadvantage compared to a non-disabled person, without lowering the standard they need to meet. For example, allowing extra time for a dyslexic apprentice to complete a written exam does not change the content or pass mark — it removes the speed disadvantage that dyslexia creates. The learner still has to demonstrate the same competence; the adjustment ensures they have a fair opportunity to do so.',
  },
  {
    id: 4,
    question:
      'A Polish apprentice is excellent practically but struggles with written English. Which assessment method would be most appropriate for gathering portfolio evidence?',
    options: [
      'Written assignments only — they need to improve their English',
      'Professional discussion supplemented with photographs and annotated diagrams',
      'No assessment is needed — their practical work speaks for itself',
      'The same written assessments as everyone else — treating them differently would be unfair',
    ],
    correctAnswer: 1,
    explanation:
      'Professional discussion (oral evidence) supplemented with visual evidence is a reasonable and inclusive approach. It allows the apprentice to demonstrate their genuine competence in the electrical trade without being penalised for a language barrier that is separate from their technical ability. This is not lowering the standard — it is using an alternative evidence method that is equally valid. Most awarding organisations explicitly permit professional discussion as an evidence method.',
  },
  {
    id: 5,
    question:
      "Which type of unconscious bias causes a mentor to judge an apprentice's overall competence based on a single positive or negative trait?",
    options: ['Affinity bias', 'Attribution bias', 'Halo/horns effect', 'Confirmation bias'],
    correctAnswer: 2,
    explanation:
      'The halo effect causes you to judge someone\'s overall competence positively based on one good trait (e.g., "they are always on time, so they must be a good worker"). The horns effect is the reverse — judging someone negatively overall based on one bad trait (e.g., "they dress untidily, so they probably do sloppy work"). Both lead to inaccurate assessments because they generalise from a single data point to an overall judgement.',
  },
  {
    id: 6,
    question:
      'A 25-year-old qualified electrician is mentoring a 45-year-old career changer. What is the most important thing for the younger mentor to remember?',
    options: [
      'That the older apprentice will be slower to learn because of their age',
      'That the older apprentice should be treated exactly the same as a 17-year-old apprentice',
      'That the older apprentice brings valuable life experience and transferable skills, but may feel uncomfortable being "the beginner" again',
      'That the older apprentice will resent being mentored by someone younger',
    ],
    correctAnswer: 2,
    explanation:
      'Mature apprentices and career changers bring significant assets: life experience, maturity, work ethic, and transferable skills from previous careers. However, they may feel uncomfortable in the role of learner, especially when mentored by someone younger. The most effective approach is to acknowledge and respect their experience, recognise the transferable skills they bring, and be patient with the adjustment to being a beginner in a new field. Assumptions based on age (either positive or negative) should be avoided.',
  },
  {
    id: 7,
    question:
      'An apprentice with ADHD struggles to follow long verbal instructions for multi-step tasks. Which of the following is the most appropriate reasonable adjustment?',
    options: [
      'Remove them from complex tasks until they can concentrate better',
      'Break instructions into smaller steps, use written checklists, and check understanding at each stage',
      'Repeat the same long instructions more slowly and more loudly',
      'Ask their college to provide a support worker to accompany them on site',
    ],
    correctAnswer: 1,
    explanation:
      'Breaking tasks into smaller, manageable steps with written checklists plays to the strengths of someone with ADHD rather than fighting against the condition. ADHD affects working memory and sustained attention, so long sequences of verbal instructions are particularly challenging. Short, clear steps with visual reminders (checklists, labelled diagrams) provide external scaffolding that compensates for the working memory difficulty. This is a practical, on-site reasonable adjustment that maintains the standard while removing the barrier.',
  },
  {
    id: 8,
    question: 'What is the primary purpose of equality and diversity training for mentors?',
    options: [
      'To meet a legal compliance requirement and avoid prosecution',
      'To develop awareness, challenge assumptions, and ensure fair and effective mentoring for every learner regardless of their background or characteristics',
      'To teach mentors how to treat all apprentices exactly the same',
      'To ensure that mentors give preferential treatment to underrepresented groups',
    ],
    correctAnswer: 1,
    explanation:
      'The primary purpose is to develop genuine awareness and practical skills for inclusive mentoring. Legal compliance is important but it is the minimum, not the goal. Treating everyone "exactly the same" (option C) is not the same as treating everyone fairly — different people may need different support to achieve the same outcome. And preferential treatment (option D) is positive discrimination, which is generally unlawful under the Equality Act 2010. The goal is equitable practice: giving every learner what they need to succeed.',
  },
];

export default function MDModule5Section3() {
  useSEO({
    title: 'Diversity, Inclusion & Cross-Cultural Mentoring | MD Module 5.3',
    description:
      'Equality Act 2010, unconscious bias, language barriers, neurodiversity, and gender in a male-dominated industry — ensuring inclusive mentoring for every learner.',
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
            <Link to="../md-module-5">
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
            <Globe className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Diversity, Inclusion &amp; Cross-Cultural Mentoring
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Your legal and moral responsibilities as a mentor, recognising and mitigating bias, and
            adapting your practice for every learner
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Equality Act 2010:</strong> Nine protected characteristics &mdash; you must
                not discriminate on the basis of any of them
              </li>
              <li>
                <strong>Unconscious bias:</strong> We all have it &mdash; the skill is recognising
                and mitigating it
              </li>
              <li>
                <strong>Reasonable adjustments:</strong> Remove barriers without lowering standards
              </li>
              <li>
                <strong>Inclusive mentoring:</strong> Treat every learner as an individual, not a
                stereotype
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Legal duty:</strong> Discrimination is unlawful &mdash; mentors must
                understand and comply with the Equality Act
              </li>
              <li>
                <strong>Moral duty:</strong> Every apprentice deserves fair treatment and equal
                access to development
              </li>
              <li>
                <strong>Industry need:</strong> The electrical trade needs to attract and retain
                diverse talent to address the skills shortage
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'List the nine protected characteristics under the Equality Act 2010',
              "Explain the mentor's legal and moral duty regarding equality and diversity",
              'Identify three types of unconscious bias and their impact on mentoring',
              'Describe appropriate reasonable adjustments for learners with language barriers or neurodiversity',
              'Apply inclusive mentoring strategies in a male-dominated industry',
              'Demonstrate respectful mentoring across age, gender, and cultural differences',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Protected Characteristics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Protected Characteristics Under the Equality Act 2010
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Equality Act 2010 is the primary piece of UK legislation that protects people
                from discrimination in the workplace, in education, and in the provision of
                services. It consolidated and replaced over 100 previous pieces of equality
                legislation into a single Act, making it simpler and more consistent.
              </p>

              <p>
                At its heart, the Equality Act identifies{' '}
                <strong>nine protected characteristics</strong> &mdash; aspects of a person&rsquo;s
                identity on the basis of which it is unlawful to discriminate against them. As a
                mentor, you have both a legal obligation and a moral responsibility to ensure that
                your mentoring practice does not discriminate on the basis of any of these
                characteristics, either directly or indirectly.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Nine Protected Characteristics
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-2">
                  {[
                    { num: '1', label: 'Age' },
                    { num: '2', label: 'Disability' },
                    { num: '3', label: 'Gender Reassignment' },
                    { num: '4', label: 'Marriage & Civil Partnership' },
                    { num: '5', label: 'Pregnancy & Maternity' },
                    { num: '6', label: 'Race' },
                    { num: '7', label: 'Religion or Belief' },
                    { num: '8', label: 'Sex' },
                    { num: '9', label: 'Sexual Orientation' },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {item.num}
                      </span>
                      <span className="text-sm text-white font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                <strong>Direct discrimination</strong> means treating someone less favourably
                because of a protected characteristic. For example, giving a male apprentice more
                challenging and interesting tasks while keeping a female apprentice on basic work,
                or being less patient with an older career changer than with a younger apprentice.
              </p>

              <p>
                <strong>Indirect discrimination</strong> means applying a provision, criterion, or
                practice that appears neutral but puts people with a particular protected
                characteristic at a disadvantage. For example, requiring all portfolio evidence to
                be handwritten (which disadvantages dyslexic learners) or scheduling all training
                sessions on Fridays (which disadvantages apprentices whose religious observance
                falls on that day).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Mentor&rsquo;s Duty</p>
                </div>
                <p className="text-sm text-white mb-3">
                  As a mentor, your duties under the Equality Act include:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Treating all learners with equal respect and professionalism regardless of
                      their characteristics
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Making reasonable adjustments for learners with disabilities (including hidden
                      disabilities like dyslexia, ADHD, and autism)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Challenging discriminatory behaviour when you witness it, whether from other
                      workers, managers, or other apprentices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Not making assumptions about a person&rsquo;s ability, interests, or potential
                      based on their protected characteristics
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Creating an environment where all learners feel safe, respected, and able to
                      raise concerns
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Distinction:</strong> Equality is not the
                  same as treating everyone identically. <strong>Equality</strong> means everyone
                  has the same rights and opportunities. <strong>Equity</strong> means giving people
                  what they need to achieve the same outcomes. A dyslexic apprentice given extra
                  time for a written test is not getting special treatment &mdash; they are getting
                  equitable treatment that removes a barrier to demonstrating their genuine
                  competence. The standard remains the same; the path to meeting it is adjusted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Unconscious Bias */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Unconscious Bias in Mentoring
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Unconscious bias (also called implicit bias) refers to the attitudes, stereotypes,
                and assumptions that affect our understanding, actions, and decisions without us
                being aware of them. Everyone has unconscious biases &mdash; they are a normal
                product of the brain&rsquo;s need to process vast amounts of information quickly by
                using mental shortcuts. The issue is not that you have biases (you do, and so does
                everyone else), but whether you recognise them and take steps to prevent them from
                unfairly influencing your mentoring.
              </p>

              <p>
                In a mentoring context, unconscious bias can manifest in subtle but significant
                ways: who you spend more time with, who you give more challenging tasks to, who you
                praise more readily, who you are more patient with, and whose mistakes you are more
                likely to overlook or forgive.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Types of Unconscious Bias in Mentoring
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Affinity Bias</p>
                    <p className="text-sm text-white">
                      The tendency to favour people who are similar to yourself &mdash; same
                      background, same age, same interests, same communication style. A male mentor
                      in his 40s may unconsciously invest more in a male apprentice who reminds him
                      of himself at that age, while being less engaged with a female apprentice or
                      an apprentice from a different cultural background.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Attribution Bias</p>
                    <p className="text-sm text-white">
                      The tendency to attribute success and failure differently based on the person.
                      For example, attributing a male apprentice&rsquo;s good work to skill and
                      ability (&ldquo;he is a natural&rdquo;) while attributing a female
                      apprentice&rsquo;s equally good work to luck or help (&ldquo;she had a lot of
                      guidance on that one&rdquo;). Or attributing a mistake by a British apprentice
                      to a bad day, while attributing the same mistake by a foreign-born apprentice
                      to general incompetence.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Halo and Horns Effect</p>
                    <p className="text-sm text-white">
                      The halo effect is judging someone&rsquo;s overall competence positively based
                      on a single positive trait (&ldquo;they are always punctual, so they must be a
                      good worker&rdquo;). The horns effect is the reverse &mdash; judging
                      negatively based on one negative trait (&ldquo;they have tattoos and
                      piercings, so they are probably not serious about the job&rdquo;). Both lead
                      to inaccurate, unfair assessments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Strategies for Recognising and Mitigating Bias
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Accept that you have biases.</strong> Denial is the biggest barrier to
                      improvement. Everyone, regardless of how fair-minded they believe themselves
                      to be, has unconscious biases. The question is not whether you have them but
                      whether you manage them.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use structured assessment criteria.</strong> When assessing an
                      apprentice&rsquo;s work, use a consistent checklist or rubric rather than
                      relying on gut feeling. Structured assessment reduces the influence of bias by
                      anchoring decisions to objective criteria.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Monitor your own behaviour.</strong> Periodically ask yourself:
                      &ldquo;Am I spending equal time with each of my learners? Am I giving equally
                      challenging tasks? Am I equally patient?&rdquo; If the answer is no, explore
                      why.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Seek feedback.</strong> Ask a trusted colleague to observe your
                      mentoring practice and give honest feedback on whether they notice any
                      patterns of differential treatment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Slow down your decision-making.</strong> Bias thrives on speed. When
                      making important decisions about a learner (assessment outcomes, task
                      allocation, feedback), pause and deliberately consider whether any assumptions
                      are influencing your thinking.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Unconscious bias is not a moral failing &mdash; it is a feature of human cognition.
                The moral dimension comes from whether you choose to examine and manage your biases
                or whether you allow them to operate unchecked. A mentor who acknowledges their
                biases and actively works to mitigate them is a far more effective and ethical
                practitioner than one who claims to have no biases at all.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Language Barriers & Neurodiversity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Language Barriers &amp; Neurodiversity
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The UK construction industry is diverse, and electrical teams frequently include
                workers and apprentices whose first language is not English, as well as those with
                neurodiverse conditions such as dyslexia, ADHD, and autism spectrum conditions.
                Effective mentoring requires you to adapt your practice to ensure that these
                learners have an equitable opportunity to develop and demonstrate their competence.
              </p>

              <p>
                <strong>Language barriers</strong> are common in construction. A significant
                proportion of the UK electrical workforce was born outside the UK, particularly from
                Poland, Romania, Portugal, and other European countries. These workers often have
                excellent practical skills but may struggle with written English, which creates a
                barrier when it comes to college work, portfolio evidence, and written assessments.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The Skilled but Struggling Apprentice
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Piotr is a Polish apprentice in his second year. His practical work is excellent
                  &mdash; his containment is perfectly level, his terminations are neat, and he has
                  a natural understanding of how electrical circuits work. But his written English
                  is limited, and he is falling behind on his college assignments and portfolio
                  evidence. His mentor, Dave, is concerned that Piotr might fail his qualification
                  despite being one of the most practically skilled apprentices on site.
                </p>
                <p className="text-sm text-white mb-3">
                  Dave works with Piotr&rsquo;s college tutor to implement adjustments:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Professional discussion</strong> replaces some written evidence
                      &mdash; Piotr demonstrates his knowledge verbally while Dave records it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Photographic evidence</strong> with short annotations captures his
                      practical work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Annotated diagrams</strong> allow Piotr to explain circuits visually
                      rather than in paragraph form
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Extra time</strong> is allowed for any written components
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Dave also signposts Piotr to free{' '}
                      <strong>ESOL (English for Speakers of Other Languages)</strong> classes at the
                      local college
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Neurodiversity</strong> refers to natural variations in how the human brain
                processes information. Common neurodiverse conditions that you may encounter in
                mentoring include:
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Dyslexia</p>
                  <p className="text-sm text-white mb-2">
                    Affects reading, writing, and spelling. Does NOT affect practical intelligence
                    or hands-on skill.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">Adjustments:</strong> Visual learning
                    materials, verbal instructions, professional discussion for assessment, coloured
                    overlays, extra time for written work.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">ADHD</p>
                  <p className="text-sm text-white mb-2">
                    Affects attention, impulse control, and working memory. Can also bring
                    creativity, energy, and the ability to hyperfocus.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">Adjustments:</strong> Short, clear
                    instructions, written checklists, regular check-ins, structured routines, break
                    tasks into smaller steps.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Autism Spectrum</p>
                  <p className="text-sm text-white mb-2">
                    Affects social interaction, communication, and sensory processing. Often brings
                    exceptional attention to detail and systematic thinking.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">Adjustments:</strong> Clear, literal
                    communication (avoid sarcasm and ambiguity), predictable routines, advance
                    notice of changes, sensory considerations (noise, lighting).
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Reasonable Adjustments Principle:</strong> A
                  reasonable adjustment removes or reduces a barrier that puts a person with a
                  disability at a disadvantage, without changing the competence standard they need
                  to meet. The adjustment levels the playing field &mdash; it does not give anyone
                  an unfair advantage. Most awarding organisations have clear policies on reasonable
                  adjustments and will work with employers and training providers to agree
                  appropriate measures.
                </p>
              </div>

              <p>
                The most important thing is to ask. Many neurodiverse apprentices have developed
                effective coping strategies and know exactly what helps them learn best. A simple
                question &mdash; &ldquo;Is there anything I can do to make the learning work better
                for you?&rdquo; &mdash; opens the door to a conversation that benefits everyone. Do
                not assume you know what someone needs based on a diagnostic label; listen to the
                individual.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Gender in a Male-Dominated Industry */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Gender in a Male-Dominated Industry
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The electrical installation trade remains one of the most male-dominated sectors in
                the UK economy. Women make up approximately 1-2% of the electrical workforce,
                although this figure is slowly increasing. For a female apprentice entering this
                environment, the experience can be significantly different from that of a male
                apprentice, and mentors need to be aware of these differences to provide equitable
                support.
              </p>

              <p>
                The barriers that women face in the electrical trade are not primarily about ability
                &mdash; there is no evidence that gender affects competence in electrical work. The
                barriers are social, cultural, and environmental:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Barriers Women Face in the Electrical Trade
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Being the only woman on site.</strong> This creates a constant sense
                      of visibility and scrutiny. Every mistake is noticed and may be attributed to
                      gender rather than inexperience.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Unwelcome comments and &ldquo;banter.&rdquo;</strong> Comments that
                      may be intended as jokes can be experienced as hostile, excluding, or
                      demeaning. What seems like harmless banter to the majority can feel very
                      different when you are the only person of your gender in the room.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Assumptions about competence.</strong> Being assumed to be less
                      capable, needing more help, or being steered toward &ldquo;lighter&rdquo;
                      tasks rather than given the same opportunities as male apprentices.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lack of role models.</strong> With so few women in the trade, female
                      apprentices have few visible examples of what success looks like for someone
                      like them.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Practical site issues.</strong> Inadequate welfare facilities (no
                      separate changing rooms or toilets), PPE designed for male body shapes, and
                      tools that assume larger hand sizes.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                As a mentor, your role is to create an environment where every apprentice &mdash;
                regardless of gender &mdash; has an equal opportunity to learn, develop, and
                succeed. This does not mean treating female apprentices differently in terms of the
                work they do or the standards they are held to. It means being aware of the
                additional barriers they may face and actively working to remove or reduce them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Mentor&rsquo;s Role in Creating Inclusive Environments
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Set the tone.</strong> Your behaviour sets the standard for the team.
                      If you treat a female apprentice with the same professional respect as a male
                      apprentice, others will follow your lead. If you laugh at sexist jokes, others
                      will see that as permission.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Challenge inappropriate behaviour.</strong> If you witness sexist
                      comments, &ldquo;banter,&rdquo; or exclusionary behaviour, address it promptly
                      and calmly. You do not need to make a scene &mdash; a quiet &ldquo;That is not
                      appropriate&rdquo; from a respected mentor carries enormous weight.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Give equal opportunities.</strong> Ensure female apprentices get the
                      same range of tasks, challenges, and responsibilities as male apprentices. Do
                      not &ldquo;protect&rdquo; them from heavy or complex work &mdash; that is
                      patronising and limits their development.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Provide the same honest feedback.</strong> Some mentors, in an effort
                      to be supportive, avoid giving critical feedback to female apprentices. This
                      is actually discriminatory &mdash; by withholding the feedback they need to
                      improve, you are undermining their development. Professional, honest feedback
                      is respectful regardless of the recipient&rsquo;s gender.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                It is also worth noting that age differences can create similar dynamics. A
                45-year-old career changer being mentored by a 25-year-old qualified electrician
                requires the same principles: respect for the individual, awareness of the dynamics,
                and a commitment to equitable treatment. The older learner has a wealth of life
                experience and transferable skills that should be acknowledged and utilised, while
                the younger mentor brings trade expertise and current technical knowledge. The best
                outcomes happen when both parties respect what the other brings.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> Inclusive mentoring is
                  not about political correctness or box-ticking. It is about recognising that every
                  apprentice is an individual with their own strengths, challenges, background, and
                  circumstances, and adapting your approach to give each one the best possible
                  chance of success. The standard does not change. The path to meeting it might.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Diversity and inclusion are not abstract concepts that belong in a training room
                &mdash; they are practical realities that affect how you mentor, assess, and develop
                every learner. The electrical trade needs diverse talent to address the skills
                shortage, and mentors play a critical role in ensuring that every apprentice,
                regardless of their background or characteristics, has a fair and genuine
                opportunity to succeed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaways</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Equality Act 2010:</strong> Nine protected characteristics. You have a
                      legal and moral duty not to discriminate on the basis of any of them.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Unconscious bias:</strong> Everyone has it. Recognise it, monitor it,
                      and use structured assessment to mitigate it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Language and neurodiversity:</strong> Use reasonable adjustments to
                      remove barriers without lowering standards. Professional discussion, visual
                      evidence, and adapted methods are all valid approaches.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Gender inclusion:</strong> Set the tone, challenge inappropriate
                      behaviour, give equal opportunities, and provide honest feedback to all
                      apprentices regardless of gender.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Individual, not stereotype:</strong> Treat every learner as a unique
                      individual. Ask what they need. Listen to the answer.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will turn the lens on you: your own development as a mentor.
                How do you reflect on and improve your practice? How do you seek feedback, pursue
                CPD, and build a mentoring legacy that extends far beyond any single apprentice?
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
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
            <Link to="../md-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-5-section-4">
              Your Development as a Mentor
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
