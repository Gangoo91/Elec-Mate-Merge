import { ArrowLeft, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'gs-4-4-check1',
    question:
      'According to the ASTD (Association for Talent Development) research on accountability, what is the approximate likelihood of completing a goal if you have regular accountability meetings with a specific person?',
    options: [
      '25% &mdash; regular meetings make little difference compared to setting a goal alone',
      '50% &mdash; about the same as writing the goal down',
      '65% &mdash; the same as simply committing to someone that you will do it',
      '95% &mdash; regular accountability meetings dramatically increase completion rates',
    ],
    correctIndex: 3,
    explanation:
      'The ASTD research found a striking escalation in goal completion rates based on the level of accountability. Simply having an idea or goal gives you roughly a 10% chance of completing it. Writing it down raises this to approximately 50%. Committing to someone that you will do it raises the rate to about 65%. But having regular scheduled accountability meetings &mdash; where you report progress, discuss obstacles, and plan next steps with a specific person &mdash; raises the completion rate to approximately 95%. This finding demonstrates that accountability is not just a nice-to-have; it is one of the most powerful predictors of whether a goal will be achieved. For electricians pursuing qualifications, building a business, or developing new skills, having a regular check-in with a mentor, colleague, or study partner can transform good intentions into completed outcomes.',
  },
  {
    id: 'gs-4-4-check2',
    question:
      'A self-employed electrician works alone most days and has no colleagues, line manager, or formal mentor. They want to complete their Level 4 Design qualification within 12 months but are struggling with motivation. Which approach would be MOST effective for creating accountability?',
    options: [
      'Relying entirely on self-discipline and willpower, since working alone means accountability must come from within',
      'Joining or forming a mastermind group of 3&ndash;5 tradespeople who meet fortnightly to review progress, share challenges, and hold each other accountable',
      'Posting the goal on social media and hoping the public commitment creates enough pressure',
      'Waiting until they find a full-time employer who can provide formal structure and oversight',
    ],
    correctIndex: 1,
    explanation:
      'A mastermind group is one of the most effective accountability structures for self-employed tradespeople. It provides regular check-ins (creating the accountability meeting structure that the ASTD research identifies as most effective), peer support from people who understand the realities of trade work, diverse perspectives on problem-solving, and a social commitment that is harder to break than a private resolution. Relying solely on self-discipline (Option A) ignores decades of research showing that external accountability dramatically improves follow-through. Social media posting (Option C) is a form of public accountability that can help, but without regular meetings and genuine relationship, it often becomes performative rather than functional. Waiting for formal employment (Option D) delays action indefinitely. Mastermind groups can be formed informally &mdash; even two or three electricians meeting at a cafe every fortnight to discuss their goals can create transformative accountability.',
  },
  {
    id: 'gs-4-4-check3',
    question:
      'Reverse mentoring is the concept where younger or less experienced workers mentor older or more experienced colleagues. In the electrical trade, which scenario best illustrates effective reverse mentoring?',
    options: [
      'A 22-year-old apprentice teaches a 55-year-old electrician how to use cloud-based certification software, digital job sheets, and social media marketing, while the experienced electrician shares knowledge of complex fault-finding techniques and customer relationship management',
      'A young electrician tells an experienced electrician that their methods are outdated and need to change',
      'An apprentice refuses to learn traditional methods because they believe technology has made them obsolete',
      'A young electrician takes over a senior role because they are more digitally skilled',
    ],
    correctIndex: 0,
    explanation:
      'Effective reverse mentoring is a two-way exchange where both parties contribute genuine expertise. Option A illustrates this perfectly: the younger electrician has grown up with digital technology and can share practical skills in cloud software, apps, digital marketing, and social media that the experienced electrician may not have developed. In return, the experienced electrician shares decades of accumulated knowledge in fault finding, customer management, regulatory interpretation, and practical problem-solving that cannot be learned from a textbook. Both parties benefit, and neither is positioned as superior. This model is particularly powerful in the electrical trade because the industry is experiencing rapid digital transformation while simultaneously requiring deep traditional knowledge. Options B, C, and D describe one-sided, disrespectful, or hierarchical approaches that miss the collaborative essence of reverse mentoring.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I&rsquo;m self-employed and work alone every day. How do I create accountability without colleagues or a boss?',
    answer:
      'Working alone is one of the biggest challenges for self-employed electricians seeking accountability. The key is to deliberately build external structures that replace the natural accountability of a workplace. Practical options include: joining or forming a mastermind group (even 2&ndash;3 tradespeople meeting fortnightly at a cafe), finding a study partner if you are pursuing qualifications, hiring a business coach for monthly check-ins, joining a trade association that holds regular meetings (such as the ECA or NAPIT local groups), participating in online forums where you commit publicly to goals, scheduling regular phone calls with a trusted colleague or friend in the trade, or using an accountability app where you pair with another user. The ASTD research suggests that the specific form of accountability matters less than its regularity and the presence of genuine social commitment. Even a weekly text message exchange with another electrician (&ldquo;Did you complete what you said you would this week?&rdquo;) can significantly improve follow-through. The worst approach is relying entirely on willpower and self-discipline, which research consistently shows is insufficient for sustained goal pursuit.',
  },
  {
    question: 'What is the difference between a mentor and a coach, and which do I need?',
    answer:
      'A mentor is typically someone with more experience in your specific field who shares their knowledge, provides guidance based on their own journey, and helps you navigate challenges they have already faced. Mentoring is usually informal, free, and based on a personal relationship. A mentor in the electrical trade might be an experienced electrician who has already built the type of career you want &mdash; they can advise on qualifications, career moves, business decisions, and technical development based on what worked (and what didn&rsquo;t work) for them. A coach, by contrast, is a trained professional who uses structured techniques to help you clarify goals, overcome obstacles, develop strategies, and maintain accountability. Coaches do not need industry-specific experience because their expertise is in the process of change, not the content of your field. Coaching is usually paid (typically &pound;50&ndash;&pound;200 per session) and time-limited. Which do you need? If you want trade-specific guidance and are early in your career, a mentor is probably more valuable. If you are established but stuck &mdash; struggling with business growth, work-life balance, or a career transition &mdash; a coach may be more effective. Many successful electricians use both: a mentor for technical and industry guidance, and a coach for personal and business development.',
  },
  {
    question:
      'How do I find a mentor in the electrical trade? I don&rsquo;t know any experienced electricians who would be willing.',
    answer:
      'Finding a mentor is easier than most people think, primarily because most experienced professionals are flattered to be asked and genuinely enjoy sharing their knowledge. Start with your immediate network: colleagues, former supervisors, tutors from your training course, or electricians you have worked alongside on larger projects. If you are a member of the IET (Institution of Engineering and Technology), they offer a formal mentoring scheme that pairs members with experienced professionals. Trade associations like the ECA (Electrical Contractors&rsquo; Association) and NAPIT hold local events where you can meet potential mentors in person. Online communities such as ElectriciansForums.net, trade Facebook groups, and LinkedIn are also excellent sources &mdash; many experienced electricians actively participate and are open to mentoring relationships. When approaching a potential mentor, be specific about what you are looking for: &ldquo;I&rsquo;m working towards my 2391 and would value occasional guidance from someone who has been through the process&rdquo; is more effective than a vague request for mentoring. Keep the ask manageable &mdash; even a monthly phone call or coffee meeting is enough to create a valuable mentoring relationship. Most mentors are not looking for a time-consuming commitment; they want to help someone who is genuinely motivated and respectful of their time.',
  },
  {
    question:
      'I tried having an accountability partner before but it fell apart after a few weeks. What went wrong?',
    answer:
      'Accountability partnerships fail for several predictable reasons, and understanding them helps you build a more resilient arrangement next time. The most common causes of failure are: lack of structure (meeting &ldquo;when we can&rdquo; instead of on a fixed schedule), mismatched commitment levels (one person is more serious than the other), unclear expectations (not agreeing in advance what accountability looks like), no consequences for missed commitments, and choosing someone who is too polite to challenge you. To build a successful accountability partnership, you need: a fixed meeting schedule (e.g., every Tuesday at 7pm for 20 minutes, either in person or on a video call), clear ground rules (each person states what they committed to last week, reports honestly on progress, and sets specific commitments for the coming week), mutual investment (both parties must have goals they are pursuing, not just one), and honest communication (your accountability partner must be willing to say &ldquo;You said you would do X and you didn&rsquo;t &mdash; what happened?&rdquo;). It also helps to put a review date in the diary &mdash; after 8 weeks, both parties assess whether the arrangement is working and adjust if needed. Finally, choose someone you respect enough that you would feel genuinely uncomfortable letting them down. Mild social pressure is the engine of accountability.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'The ASTD (Association for Talent Development) research found that writing a goal down and committing to someone that you will achieve it gives approximately what chance of completion?',
    options: [
      '10% &mdash; barely better than having no goal at all',
      '35% &mdash; a moderate improvement over just thinking about the goal',
      '65% &mdash; a significant improvement driven by social commitment',
      '95% &mdash; the highest level of accountability measured in the study',
    ],
    correctAnswer: 2,
    explanation:
      'The ASTD research identified a clear hierarchy of accountability and goal completion. Having an idea or goal alone gives roughly 10%. Making a conscious decision to pursue it raises this to 25%. Writing the goal down reaches approximately 50%. Committing to someone else that you will do it reaches 65%. The highest level &mdash; having regular scheduled accountability meetings with a specific person &mdash; reaches approximately 95%. The 65% figure for social commitment is significant because it shows that simply telling another person about your goal creates a powerful psychological contract. Humans are deeply social beings, and the desire to maintain consistency and avoid the discomfort of admitting failure to someone else acts as a potent motivator. For electricians, this means that telling a colleague, partner, or mentor &ldquo;I am going to complete my 2391 by December&rdquo; is far more effective than keeping the goal private.',
  },
  {
    id: 2,
    question:
      'Which type of accountability has been shown by research to produce the HIGHEST rates of goal completion?',
    options: [
      'Self-accountability through habit tracking and journaling',
      'Public accountability by sharing goals on social media',
      'Peer accountability through regular scheduled meetings with a specific accountability partner',
      'Professional accountability through formal performance reviews with a line manager',
    ],
    correctAnswer: 2,
    explanation:
      'Regular scheduled meetings with a specific accountability partner produce the highest rates of goal completion according to the ASTD research (approximately 95%). The key elements are: regularity (scheduled, not ad hoc), specificity (a particular person, not a vague audience), and structure (reporting on progress, discussing obstacles, setting next commitments). Self-accountability through tracking (Option A) is valuable but limited by self-deception and the ease of quietly abandoning a commitment when no one else knows. Public accountability on social media (Option B) creates initial pressure but often fades because the audience is diffuse and rarely follows up. Formal performance reviews (Option D) happen too infrequently (typically annually or quarterly) and are often focused on the employer&rsquo;s priorities rather than the individual&rsquo;s personal development goals. The power of regular peer meetings lies in the combination of social commitment, genuine relationship, and frequent check-ins that make it psychologically difficult to repeatedly show up and say &ldquo;I didn&rsquo;t do what I said I would.&rdquo;',
  },
  {
    id: 3,
    question:
      'A qualified electrician wants to transition from domestic work into commercial inspection and testing. They have no formal mentor. Which combination of accountability and support strategies would be MOST effective?',
    options: [
      'Setting a private goal and relying on self-discipline to study for the 2391 qualification',
      'Posting the career goal on LinkedIn and waiting for opportunities to present themselves',
      'Finding a mentor who specialises in commercial inspection (via IET, trade forums, or local networking), joining a study group for the 2391, and scheduling fortnightly accountability check-ins with a colleague who is also pursuing career development',
      'Enrolling on a training course and assuming that course attendance alone will be sufficient',
    ],
    correctAnswer: 2,
    explanation:
      'Option C combines multiple layers of support that address different aspects of the transition. A mentor who specialises in commercial inspection provides domain-specific guidance, real-world insight, and potentially the opportunity to shadow experienced inspectors &mdash; knowledge that cannot be obtained from textbooks alone. A study group creates academic accountability and collaborative learning for the 2391 qualification. Fortnightly accountability check-ins with a peer create the regular meeting structure that the ASTD research identifies as most effective for goal completion. Together, these three elements form a comprehensive support system. Option A relies entirely on willpower, which research shows is insufficient for sustained goal pursuit. Option B is passive and provides no structural support. Option D addresses only the formal learning component without accountability, mentoring, or real-world experience, and many electricians who enrol on courses fail to complete them or pass the exam because course attendance alone is not enough.',
  },
  {
    id: 4,
    question:
      'In a reverse mentoring relationship within the electrical trade, which of the following represents the most effective exchange?',
    options: [
      'The younger electrician teaches everything and the older electrician simply listens and learns',
      'The older electrician dismisses the younger person&rsquo;s input because experience always trumps innovation',
      'The younger electrician shares expertise in digital tools, apps, and marketing, while the experienced electrician shares deep knowledge of complex installations, fault finding, and customer management &mdash; creating genuine two-way value',
      'Both parties focus exclusively on technical electrical knowledge, ignoring business and technology skills',
    ],
    correctAnswer: 2,
    explanation:
      'Effective reverse mentoring is fundamentally a two-way exchange. The concept was popularised by Jack Welch at General Electric in the late 1990s, who paired senior executives with younger employees to learn about the internet and digital technology. In the electrical trade, this model is particularly powerful because the industry sits at the intersection of traditional craft knowledge (which takes decades to accumulate) and rapid digital transformation (which younger electricians navigate more naturally). The younger electrician might teach cloud-based certification software, social media marketing for the business, drone inspection technology, smart home programming, or digital project management tools. The experienced electrician shares fault-finding methodology, regulatory interpretation, customer relationship skills, commercial awareness, and the tacit knowledge that comes from decades of varied installations. Neither party&rsquo;s contribution is more valuable than the other&rsquo;s &mdash; they are complementary. Options A, B, and D all describe one-sided or limited exchanges that miss the collaborative essence of the concept.',
  },
  {
    id: 5,
    question:
      'What is the primary purpose of building a &ldquo;personal board of advisers&rdquo; for career development?',
    options: [
      'To have a group of people who always agree with your decisions and provide encouragement',
      'To create a formal governance structure similar to a company board of directors',
      'To assemble 3&ndash;5 trusted individuals who each bring different expertise and perspectives to support various aspects of your professional development, providing honest feedback, diverse viewpoints, and accountability',
      'To build a network of contacts who can provide job referrals and business leads',
    ],
    correctAnswer: 2,
    explanation:
      'A personal board of advisers is an informal concept where you deliberately identify 3&ndash;5 individuals who each contribute different types of support and expertise to your development. The key word is &ldquo;different&rdquo; &mdash; each person should fill a distinct role. For example, one might be a technical expert who can advise on complex electrical matters; another might be a successful business owner who can advise on commercial decisions; a third might be someone who knows you personally and can provide honest, candid feedback about your behaviour and blind spots; a fourth might be someone in a different industry who brings a fresh perspective. The board is not a formal structure (Option B) and its purpose is not agreement (Option A) or networking (Option D). Its purpose is to ensure that you have access to diverse, honest counsel across the different dimensions of your career. No single person can provide all the guidance you need, but a well-chosen group of 3&ndash;5 people can cover most of the important areas: technical development, business strategy, personal growth, industry trends, and honest accountability.',
  },
  {
    id: 6,
    question:
      'When accountability crosses the line from helpful motivation into unhelpful pressure, the most common warning sign is:',
    options: [
      'Feeling a healthy sense of commitment to your stated goals',
      'Experiencing mild discomfort when you consider not following through on a commitment',
      'Feeling anxiety, guilt, shame, or dread associated with accountability check-ins, leading to avoidance, dishonesty about progress, or abandonment of the goal entirely',
      'Your accountability partner asking challenging questions about your progress',
    ],
    correctAnswer: 2,
    explanation:
      'Accountability should create a moderate, motivating level of social commitment &mdash; the feeling that you do not want to let someone down, which drives you to follow through. This mild discomfort (Option B) is normal and productive. However, when accountability becomes associated with anxiety, guilt, shame, or dread, it has crossed from motivation into pressure. The warning signs are: dreading accountability meetings, feeling compelled to lie or exaggerate progress, experiencing physical stress symptoms (poor sleep, irritability) related to the accountability relationship, feeling judged rather than supported, or abandoning the goal entirely because the emotional cost of the accountability relationship exceeds the benefit. This often happens when accountability partners are overly critical, when the goals were set too ambitiously, when the relationship lacks empathy and flexibility, or when the individual has people-pleasing tendencies that turn accountability into a source of shame rather than motivation. The solution is to recalibrate: adjust goals to be challenging but achievable, choose accountability partners who balance challenge with support, and remember that the purpose of accountability is to help you succeed, not to punish you for imperfection.',
  },
  {
    id: 7,
    question:
      'A self-employed electrician who works alone is considering forming a mastermind group. According to the principles of effective mastermind groups, the IDEAL structure would be:',
    options: [
      'A large group of 15&ndash;20 people who meet quarterly for networking',
      'A small group of 3&ndash;5 committed individuals who meet regularly (fortnightly or monthly), with a structured agenda including progress reports, problem-solving, and goal-setting for the next period',
      'An informal group with no fixed schedule that meets whenever members are available',
      'A group exclusively of electricians at the same career stage, to ensure everyone has similar challenges',
    ],
    correctAnswer: 1,
    explanation:
      'Effective mastermind groups share several key characteristics: small size (3&ndash;5 members, rarely more than 6), regular meetings on a fixed schedule (fortnightly or monthly, not ad hoc), a structured agenda that ensures each member gets dedicated time for accountability and problem-solving, and genuine commitment from all participants. The concept was popularised by Napoleon Hill in Think and Grow Rich (1937), who described the mastermind as &ldquo;the coordination of knowledge and effort of two or more people who work toward a definite purpose in the spirit of harmony.&rdquo; Large groups (Option A) lose intimacy and individual attention. Groups without fixed schedules (Option C) quickly dissolve because there is no structural commitment. Homogeneous groups (Option D) miss the benefit of diverse perspectives &mdash; a mastermind group is often most valuable when members come from different specialisms or career stages, because they see each other&rsquo;s problems from fresh angles. For electricians, a mastermind might include a domestic installer, a commercial contractor, an inspection specialist, and a designer &mdash; each bringing different expertise and challenges to the table.',
  },
  {
    id: 8,
    question:
      'The IET (Institution of Engineering and Technology) offers a formal mentoring scheme for members. Which statement about formal mentoring programmes is MOST accurate?',
    options: [
      'Formal mentoring is always superior to informal mentoring because it has more structure and oversight',
      'Informal mentoring is always superior because it develops naturally and is therefore more authentic',
      'Both formal and informal mentoring have distinct advantages: formal programmes provide structure, matching expertise, and clear expectations, while informal mentoring offers flexibility, natural rapport, and organic development &mdash; the most effective approach often combines elements of both',
      'Formal mentoring programmes are only useful for apprentices and early-career professionals, not for experienced electricians',
    ],
    correctAnswer: 2,
    explanation:
      'Both formal and informal mentoring have genuine advantages, and the most effective development strategies often incorporate both. Formal mentoring programmes (such as the IET scheme, or structured workplace mentoring within larger contractors) provide: deliberate matching based on skills and goals, clear expectations and timelines, structure that prevents the relationship from drifting, and institutional support. Informal mentoring (such as a naturally developing relationship with an experienced electrician you meet on site or at a trade event) provides: organic rapport built on genuine connection, flexibility to adapt to changing needs, and a less pressured dynamic. Neither is universally superior. Many successful electricians have both a formal mentor (perhaps through a professional institution or employer programme) and one or more informal mentors (experienced colleagues they turn to for advice). The key is not the format but the quality: effective mentoring requires trust, honest feedback, relevant expertise, regular contact, and genuine investment from both parties.',
  },
];

export default function GSModule4Section4() {
  useSEO({
    title: 'Accountability & Support Systems | Goal Setting & Growth Module 4.4',
    description:
      'Accountability partners, mentoring relationships, mastermind groups, personal boards of advisers, and support systems for electricians.',
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
            <Link to="../gs-module-4">
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
            <Users className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Accountability &amp; Support Systems
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why we perform better when someone is watching, the science of accountability
            partnerships, mentoring in the trades, and building support structures for sustained
            growth
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Accountability effect:</strong> We perform significantly better when someone
                else is aware of our commitments and expecting results
              </li>
              <li>
                <strong>ASTD research:</strong> 95% goal completion rate with regular accountability
                meetings vs 10% for goals kept private
              </li>
              <li>
                <strong>Mentoring</strong> accelerates career development and benefits both mentor
                and mentee
              </li>
              <li>
                <strong>Support systems</strong> must be deliberately built &mdash; they rarely form
                by accident, especially for self-employed tradespeople
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Willpower is limited:</strong> Self-discipline alone is insufficient for
                sustained goal pursuit &mdash; external structures multiply your effectiveness
              </li>
              <li>
                <strong>Isolation risk:</strong> Self-employed electricians who work alone are
                particularly vulnerable to losing momentum without accountability
              </li>
              <li>
                <strong>Career acceleration:</strong> Electricians with mentors and support networks
                progress faster and earn more than those who go it alone
              </li>
              <li>
                <strong>Mental health:</strong> Strong professional support systems reduce
                isolation, stress, and burnout in the trades
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain the accountability effect and cite the ASTD research on goal completion rates',
              'Distinguish between self-accountability, peer accountability, professional accountability, and public accountability',
              'Identify practical strategies for building accountability relationships in the electrical trade',
              'Describe the role of mentoring and explain how to find and develop a mentoring relationship',
              'Explain the concept of reverse mentoring and its relevance to the trades',
              'Build a personal board of advisers covering different aspects of professional development',
              'Recognise when accountability becomes unhelpful pressure and how to recalibrate',
              'Create accountability structures for self-employed electricians who work alone',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Accountability Effect */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Accountability Effect &mdash; Why We Perform Better When Someone Is Watching
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accountability is one of the most powerful and yet most underutilised forces in
                human performance. Put simply, the accountability effect is the observation that
                people are significantly more likely to follow through on commitments when they know
                that someone else is aware of those commitments and expecting results. This is not a
                new insight &mdash; it has been understood intuitively for centuries in military
                organisations, religious communities, apprenticeship systems, and team sports. But
                modern research has quantified the effect, and the numbers are striking.
              </p>

              <p>
                The most widely cited research comes from the ASTD (American Society for Training
                and Development, now the Association for Talent Development), which studied the
                relationship between accountability and goal achievement. Their findings revealed a
                clear hierarchy of effectiveness:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Having an idea or goal:</strong> 10% chance of completion
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Consciously deciding to pursue it:</strong> 25% chance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Deciding when you will do it:</strong> 40% chance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Writing the goal down with a plan:</strong> 50% chance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Committing to someone else that you will do it:</strong> 65% chance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Having regular accountability meetings with a specific person:</strong>{' '}
                    95% chance
                  </span>
                </li>
              </ul>

              <p>
                The jump from 10% (private goal) to 95% (regular accountability meetings) is
                extraordinary. It means that the single most effective thing you can do to increase
                your chances of achieving a goal is to create a structured accountability
                relationship with another person. Not willpower. Not motivation. Not a better
                planner or app. Another human being who expects you to report on your progress at
                regular intervals.
              </p>

              <p>
                Why does this work? Several psychological mechanisms are at play. First, there is
                <strong> social commitment theory</strong>: humans are deeply social creatures, and
                we have a powerful drive to maintain consistency between what we say and what we do.
                When you tell someone you will do something, breaking that commitment creates
                cognitive dissonance &mdash; a psychologically uncomfortable state that we are
                motivated to avoid. Second, there is <strong>the Hawthorne effect</strong> &mdash;
                the well-documented observation that people change their behaviour when they know
                they are being observed. Third, there is <strong>loss aversion</strong>: the pain of
                admitting failure to someone you respect is psychologically more powerful than the
                pleasure of private success, which means the accountability relationship creates a
                motivational asymmetry that favours action. Fourth, regular check-ins create
                <strong> temporal structure</strong> &mdash; they break long-term goals into
                short-term reporting periods, which reduces procrastination and creates urgency.
              </p>

              <p>
                For electricians, the accountability effect explains a pattern that many will
                recognise: goals that are kept private tend to drift, while goals that are shared
                with others tend to get done. The electrician who tells their partner &ldquo;I am
                going to book my 18th Edition update course this month&rdquo; is far more likely to
                actually book it than the one who merely thinks about it. The apprentice who tells
                their assessor &ldquo;I will have the assignment completed by Friday&rdquo; is far
                more likely to complete it than the one who sets a private deadline. The business
                owner who tells their accountant &ldquo;I will have the quotes system set up by our
                next meeting&rdquo; is far more likely to follow through.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Accountability Ladder &mdash; Applied to Electrical Career Goals
                </p>
                <p className="text-base text-white leading-relaxed">
                  Consider a qualified electrician who wants to pass the 2391 Inspection &amp;
                  Testing qualification. At the bottom of the ladder, they think about it
                  occasionally (10% chance). Moving up: they decide to do it this year (25%), they
                  set a start date and research courses (40%), they write the goal down with study
                  milestones (50%), they tell a colleague or family member they are going to do it
                  (65%), and finally they arrange fortnightly study sessions with a colleague who is
                  also preparing for the 2391 and they review each other&rsquo;s progress at each
                  session (95%). Same goal &mdash; dramatically different outcomes based solely on
                  the level of accountability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Types of Accountability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Types of Accountability
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all accountability is created equal. Understanding the different types allows
                you to choose and combine the approaches that best suit your personality, goals, and
                circumstances. There are four main categories of accountability, each with distinct
                strengths and limitations.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Self-Accountability</h3>

              <p>
                Self-accountability is the practice of holding yourself responsible for your own
                commitments through personal systems and tracking. It includes tools such as habit
                trackers (apps like Habitica, Streaks, or simple paper charts), journaling (daily or
                weekly reflection on progress, obstacles, and lessons), goal-tracking spreadsheets,
                personal reviews (weekly review of what you planned vs what you actually did), and
                visual progress indicators (wall charts, completion percentages, streak counters).
              </p>

              <p>
                Self-accountability is the foundation of all other accountability &mdash; without
                personal responsibility, no external system will be effective. However, it is also
                the weakest form of accountability when used in isolation. The fundamental problem
                is that you are both the judge and the judged. It is remarkably easy to renegotiate
                commitments with yourself, make excuses that you accept uncritically, or simply stop
                tracking without consequence. Research on self-monitoring consistently shows that
                while it improves performance compared to no tracking at all, it is significantly
                less effective than external accountability.
              </p>

              <p>
                For electricians, self-accountability might look like: keeping a CPD log that you
                review monthly, tracking study hours for a qualification, maintaining a daily site
                diary that includes reflection on what you learned, using a habit tracker to build
                consistent study routines, or keeping a financial dashboard for your business that
                you review weekly. These practices build self-awareness and discipline, but they
                work best when combined with at least one form of external accountability.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Peer Accountability</h3>

              <p>
                Peer accountability involves a reciprocal arrangement with someone at a similar
                level &mdash; a colleague, fellow apprentice, study partner, or business peer. Both
                parties have goals and hold each other accountable through regular check-ins. This
                is the form of accountability most strongly supported by the ASTD research, and it
                is particularly effective because the relationship is equal (neither party has
                authority over the other), reciprocal (both parties benefit), and personal (you
                develop a genuine relationship with someone who understands your challenges).
              </p>

              <p>
                The most common structures for peer accountability include: study buddies (two
                people preparing for the same qualification who meet regularly to review material
                and test each other), business accountability partners (two self-employed
                electricians who meet monthly to review business goals, share challenges, and plan
                next steps), mastermind groups (small groups of 3&ndash;5 people who meet regularly
                for structured progress reviews and problem-solving), and informal check-in
                arrangements (a weekly text or phone call where each person reports on their
                commitments).
              </p>

              <p>
                Peer accountability works because it creates genuine social commitment without the
                power dynamics of a managerial or professional relationship. You are accountable to
                someone you like and respect as an equal, which creates a particularly motivating
                form of social pressure. The key to effective peer accountability is choosing the
                right partner: someone with a similar level of commitment, willingness to be honest,
                and enough respect for you (and you for them) that neither party wants to
                consistently fail to deliver.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Professional Accountability
              </h3>

              <p>
                Professional accountability comes from relationships with people in positions of
                expertise or authority: mentors, coaches, line managers, tutors, assessors, or
                business advisers. These relationships differ from peer accountability because the
                other person typically has more experience, expertise, or authority, which creates a
                different (and often stronger) motivational dynamic. You are accountable to someone
                whose judgement you value and whose approval matters to your career.
              </p>

              <p>
                Professional accountability is particularly valuable for specific, structured goals
                such as: completing a qualification (accountable to a tutor or assessor), improving
                technical competence (accountable to a mentor or supervisor), growing a business
                (accountable to a business coach or accountant), and developing leadership skills
                (accountable to a management coach or senior colleague). The limitation of
                professional accountability is that it can feel one-directional &mdash; the
                accountability comes from above rather than being mutual. This can create
                performance anxiety in some individuals, particularly if the professional
                relationship lacks warmth or psychological safety.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Public Accountability</h3>

              <p>
                Public accountability involves sharing your goals with a wider audience: posting on
                social media, telling family and friends, making a public commitment at a trade
                event, publishing a business plan, or joining a community challenge. The strength of
                public accountability is that it creates a wide circle of awareness &mdash; many
                people know about your commitment, which amplifies the social pressure to follow
                through. The weakness is that the audience is diffuse: no single person is actively
                tracking your progress or asking challenging questions, so it is easy to quietly
                abandon the commitment without anyone noticing or asking why.
              </p>

              <p>
                Public accountability works best for bold, visible goals: launching a new business,
                completing a major qualification, making a career change, or committing to a
                specific professional standard. It works less well for incremental, day-to-day goals
                because the audience quickly loses interest. For electricians, public accountability
                might include: announcing on LinkedIn that you are pursuing a specific
                qualification, telling your customer base that you are becoming an EV charging
                specialist, committing at a trade association meeting that you will present your
                project at the next event, or publicly declaring a business growth target. The key
                is that public accountability should be combined with private peer or professional
                accountability to create both the broad social commitment and the specific, regular
                check-ins that drive completion.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Combining Accountability Types for Maximum Effectiveness
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Self-accountability</strong> provides the daily discipline and
                      self-awareness foundation (habit tracking, journaling, weekly reviews)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Peer accountability</strong> provides the regular, reciprocal
                      check-ins that the ASTD research identifies as most effective (study buddy,
                      accountability partner, mastermind group)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Professional accountability</strong> provides expert guidance and
                      domain-specific feedback (mentor, coach, assessor)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Public accountability</strong> provides broad social commitment for
                      significant goals (social media announcement, family commitment, trade
                      association declaration)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Building Accountability Relationships in the Trades */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Building Accountability Relationships in the Trades
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The electrical trade offers several natural contexts for building accountability
                relationships, though many electricians fail to recognise or leverage them. Unlike
                office-based professions where team structures, regular meetings, and performance
                reviews create built-in accountability, tradespeople &mdash; particularly those who
                are self-employed &mdash; often work in relative isolation. This makes deliberate
                relationship-building even more important.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                The Apprentice&ndash;Mentor Relationship
              </h3>

              <p>
                The traditional apprenticeship model is, at its core, an accountability structure.
                The apprentice is accountable to the mentor (their supervising electrician) for
                learning, performance, and professional development. But the best
                apprentice&ndash;mentor relationships are not one-directional &mdash; they benefit
                both parties. The apprentice gains technical knowledge, practical skill,
                professional standards, and career guidance. The mentor gains the satisfaction of
                developing the next generation, a fresh perspective on their own practice (teaching
                a skill forces you to articulate and examine what you do instinctively), an extra
                pair of hands on site, and often renewed enthusiasm for the trade.
              </p>

              <p>
                Too often, the apprentice&ndash;mentor relationship is treated as purely a labour
                arrangement (the apprentice does the work the electrician does not want to do)
                rather than a genuine developmental partnership. The most effective
                apprentice&ndash;mentor relationships involve explicit goal-setting (&ldquo;By the
                end of this month, I want you to be able to independently test a domestic consumer
                unit to BS 7671 standards&rdquo;), regular feedback (&ldquo;Here is what you did
                well today and here is what you need to work on&rdquo;), progressive responsibility
                (increasing the complexity and independence of tasks as competence develops), and
                reflective conversation (&ldquo;What did you learn today? What would you do
                differently next time?&rdquo;). If you are an apprentice, actively ask for this kind
                of structured feedback. If you are a supervising electrician, provide it
                deliberately.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Trade Buddy System</h3>

              <p>
                A trade buddy is a peer &mdash; another electrician at a similar career stage
                &mdash; with whom you form a deliberate partnership for mutual accountability and
                support. This might be a fellow apprentice you met at college, a colleague from a
                previous employer, or another self-employed electrician in your area. The trade
                buddy system works because it addresses the specific challenges of the electrical
                trade: isolation (especially for sole traders), the difficulty of getting honest
                feedback on your work (you rarely see other electricians&rsquo; installations and
                they rarely see yours), and the tendency to stay in your comfort zone rather than
                developing new skills.
              </p>

              <p>
                Practical trade buddy activities include: meeting fortnightly for a coffee and
                progress review, studying together for qualifications, visiting each other&rsquo;s
                job sites to offer a second pair of eyes, sharing resources (tools, equipment,
                knowledge), covering for each other during holidays, and jointly attending training
                courses or trade events. The accountability element comes from regular check-ins
                where each person reports on their commitments: &ldquo;Last time I said I would book
                my 18th Edition update &mdash; I have done that and the course is on the 15th. What
                about you? You said you would start pricing for that commercial job.&rdquo;
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Supplier and Manufacturer Relationships
              </h3>

              <p>
                An often-overlooked source of support and accountability comes from relationships
                with product suppliers and manufacturers. Many manufacturers offer free training on
                their products (Schneider Electric, Hager, Eaton, and others all run regular CPD
                events), product updates and technical support lines, and opportunities to become
                approved or certified installers of specific product ranges. These relationships
                provide both learning opportunities and a form of professional accountability: if
                you commit to a manufacturer&rsquo;s training programme or certification scheme, you
                have an external party tracking your progress and expecting you to meet their
                standards.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Local Trade Associations and Networking Groups
              </h3>

              <p>
                Joining a trade association or networking group provides a ready-made community of
                peers and potential accountability partners. Relevant organisations for electricians
                in the UK include: the ECA (Electrical Contractors&rsquo; Association), which holds
                regional meetings and events; NAPIT, which offers member networking and CPD
                opportunities; the IET (Institution of Engineering and Technology), which runs local
                sections with regular technical talks and networking events; local business
                networking groups such as BNI, Federation of Small Businesses (FSB), or Chamber of
                Commerce groups, which provide broader business accountability; and informal local
                trade groups that meet regularly in pubs, cafes, or trade counters.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Online Communities</h3>

              <p>
                Digital communities have become an increasingly important source of peer support and
                accountability for electricians. Key platforms include: ElectriciansForums.net (the
                largest UK electrical forum, with active discussions on technical issues,
                qualifications, and business), trade-specific Facebook groups (such as
                &ldquo;Electricians UK&rdquo;, &ldquo;NICEIC Electricians&rdquo;, and various
                regional groups), LinkedIn professional networks (particularly useful for connecting
                with inspectors, designers, and engineers), and Reddit communities (r/electricians,
                r/UKDIY for customer-facing advice). Online communities work best when combined with
                real-world accountability structures. Posting &ldquo;I am going to pass my 2391 by
                June&rdquo; on a forum creates a mild form of public accountability, but it is far
                more effective when paired with a specific accountability partner you met through
                the forum.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Action: Identify Your Accountability Network
                </p>
                <p className="text-base text-white leading-relaxed">
                  Take five minutes to map your current accountability network. Write down every
                  person who currently holds you accountable in some way: your employer or
                  supervisor, any colleagues who check on your progress, family members who ask
                  about your goals, study partners, online groups you participate in, professional
                  associations you belong to. If the list is short (fewer than 3 people), identify
                  one specific action you can take this week to strengthen it: approaching a
                  colleague about a study partnership, joining a trade association, or contacting a
                  potential mentor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Role of Mentoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Role of Mentoring
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mentoring is one of the oldest and most effective forms of professional development.
                In the electrical trade, mentoring has always been central &mdash; the entire
                apprenticeship system is, at its heart, a mentoring model. But mentoring extends far
                beyond the apprentice years. At every stage of an electrician&rsquo;s career, having
                access to someone with more experience, different expertise, or a broader
                perspective can accelerate development, prevent costly mistakes, and open doors that
                would otherwise remain closed.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                What Makes a Good Mentor in the Electrical Trade
              </h3>

              <p>
                A good mentor is not simply someone with more experience &mdash; although experience
                is important. A good mentor possesses several specific qualities. First, they have
                <strong> relevant expertise</strong>: they have knowledge and experience in the area
                you want to develop, whether that is technical skill, business acumen, inspection
                competence, or career strategy. Second, they have{' '}
                <strong>willingness to share</strong>: not all skilled electricians make good
                mentors. Some are protective of their knowledge, dismissive of questions, or simply
                uninterested in teaching. A good mentor genuinely wants to help others develop and
                is willing to invest time and energy. Third, they have <strong>honesty</strong>: a
                mentor who only tells you what you want to hear is not a mentor &mdash; they are a
                cheerleader. A good mentor will challenge your thinking, point out blind spots, and
                tell you uncomfortable truths when necessary. Fourth, they have{' '}
                <strong>patience</strong>: they remember what it was like to be at your stage and do
                not expect you to know things before you have had the opportunity to learn them.
                Fifth, they have <strong>availability</strong>: they can commit to regular (even if
                infrequent) contact and are responsive when you need guidance.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">How to Find a Mentor</h3>

              <p>
                Finding a mentor is easier than most electricians think. The main barrier is not the
                availability of potential mentors but the reluctance of potential mentees to ask.
                Most experienced professionals are flattered to be approached for mentoring &mdash;
                it signals that their experience is valued and their knowledge is worth sharing.
                Practical approaches to finding a mentor include:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Your immediate network:</strong> Think about experienced electricians
                    you have worked with, been supervised by, or encountered on site. Is there
                    someone whose career you admire or whose expertise you would like to learn from?
                    Approach them directly: &ldquo;I&rsquo;m looking to develop my inspection
                    skills. You&rsquo;re one of the best inspectors I know. Would you be open to an
                    occasional coffee where I could ask you questions and get your advice?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The IET Mentoring Scheme:</strong> The Institution of Engineering and
                    Technology offers a formal mentoring programme that pairs members with
                    experienced professionals. This is particularly valuable if you do not have an
                    obvious mentor in your immediate circle, as the IET does the matching for you
                    based on your development goals.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Trade associations and events:</strong> ECA and NAPIT events, trade
                    shows (such as ELEX), manufacturer training sessions, and IET local section
                    meetings all provide opportunities to meet experienced electricians in a
                    professional context. Attending regularly and building genuine relationships is
                    the most natural path to a mentoring connection.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Online forums and social media:</strong> Many experienced electricians
                    are active on ElectriciansForums.net, LinkedIn, and trade Facebook groups.
                    Engaging thoughtfully with their posts, asking intelligent questions, and
                    demonstrating genuine interest in learning can lead to informal mentoring
                    relationships that develop naturally.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Training providers and tutors:</strong> The tutors who delivered your
                    qualifications are potential mentors, particularly for ongoing technical
                    development. Many training providers encourage post-course relationships with
                    their graduates.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Formal vs Informal Mentoring
              </h3>

              <p>
                Formal mentoring involves a structured arrangement with clear expectations: defined
                goals, a meeting schedule, a set duration (e.g., 6 or 12 months), and often
                institutional support from an organisation such as the IET or a large employer.
                Formal mentoring provides clarity and commitment, but it can feel rigid or
                artificial if the personal chemistry between mentor and mentee is not right.
              </p>

              <p>
                Informal mentoring develops naturally from professional relationships. An
                experienced electrician you meet on a project, a supplier representative who takes
                an interest in your development, or a former college tutor who continues to offer
                guidance after the course ends &mdash; these are all forms of informal mentoring.
                Informal mentoring is flexible and based on genuine rapport, but it can lack
                structure and consistency, and it may drift or fade without deliberate effort to
                maintain it.
              </p>

              <p>
                The most effective approach for many electricians is a combination: one or two
                informal mentors for general guidance and support, supplemented by a formal
                mentoring arrangement (through the IET, an employer, or a trade body) for specific,
                structured development goals. Neither approach is inherently superior &mdash; the
                best mentoring relationship is one that fits your personality, goals, and
                circumstances.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Reverse Mentoring</h3>

              <p>
                Reverse mentoring is the concept where a younger or less experienced person mentors
                someone older or more senior, flipping the traditional direction of the mentoring
                relationship. The concept was popularised by Jack Welch, the former CEO of General
                Electric, in the late 1990s. Welch paired 500 senior executives with younger
                employees to teach them about the internet and digital technology &mdash; areas
                where the younger generation had more practical expertise.
              </p>

              <p>
                In the electrical trade, reverse mentoring is particularly relevant because the
                industry is experiencing simultaneous transformation across multiple dimensions.
                Technology is changing rapidly (digital certification, cloud-based project
                management, drone inspections, BIM, smart home programming, social media marketing),
                and younger electricians who have grown up with these technologies often have
                practical skills that their more experienced colleagues lack. At the same time,
                experienced electricians hold deep knowledge of complex installations, advanced
                fault finding, regulatory interpretation, customer management, and commercial
                awareness that can only be accumulated over decades.
              </p>

              <p>
                Effective reverse mentoring pairs these complementary strengths: the younger
                electrician teaches digital tools and modern approaches, while the experienced
                electrician shares craft knowledge and professional wisdom. Both parties benefit,
                and neither is positioned as superior. This model breaks down the generational
                barriers that sometimes exist in the trades, where older electricians dismiss
                younger colleagues as &ldquo;too reliant on gadgets&rdquo; and younger electricians
                dismiss older colleagues as &ldquo;stuck in the past&rdquo;. In reality, both
                generations hold valuable knowledge that the other needs.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Mentoring Best Practices</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Be specific about what you want:</strong> &ldquo;I want to develop my
                      commercial inspection skills over the next 12 months&rdquo; is far more
                      actionable than &ldquo;I want to improve as an electrician&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Respect your mentor&rsquo;s time:</strong> Come to meetings prepared,
                      be punctual, and keep to the agreed time. A monthly 30-minute call is better
                      than an unstructured arrangement that makes your mentor feel imposed upon
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Act on advice:</strong> Nothing discourages a mentor faster than
                      giving guidance that is consistently ignored. Follow through on suggestions
                      and report back on the results
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Give back:</strong> Mentoring should not be entirely one-directional.
                      Offer value in return: share an article, recommend a product, provide a
                      customer referral, or offer to help with a task. Reverse mentoring is one way
                      to formalise this exchange
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Building a Personal Board of Advisers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Building a Personal Board of Advisers
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A personal board of advisers is an informal concept borrowed from corporate
                governance. Just as a company has a board of directors with diverse expertise to
                guide strategic decisions, you can assemble a small group of 3&ndash;5 trusted
                individuals who each bring different perspectives and expertise to support your
                professional development. The key principle is diversity &mdash; each person on your
                board should fill a distinct role, covering a different aspect of your career and
                personal growth.
              </p>

              <p>
                For an electrician, a personal board of advisers might include the following roles:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The Technical Expert:</strong> An experienced electrician or engineer
                    with deep technical knowledge who can advise on complex installations,
                    regulatory interpretation, and technical career development. This person helps
                    you grow your core trade competence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The Business Adviser:</strong> Someone with experience in running a
                    successful trade business &mdash; not necessarily an electrician. This could be
                    an accountant, a business coach, a successful plumber or builder, or a small
                    business mentor from a programme such as the Prince&rsquo;s Trust or Enterprise
                    Nation. This person helps you with pricing, marketing, finance, growth strategy,
                    and the commercial side of your career.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The Truth-Teller:</strong> Someone who knows you well enough to be
                    brutally honest &mdash; about your strengths, your weaknesses, your blind spots,
                    and whether you are living up to your potential. This might be a close friend, a
                    partner, a former supervisor, or a trusted colleague. This person prevents
                    self-deception and keeps you accountable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The Industry Connector:</strong> Someone with a wide network in the
                    electrical industry or broader construction sector who can introduce you to
                    opportunities, people, and ideas that you would not otherwise encounter. This
                    might be a trade association contact, a manufacturer representative, a training
                    provider, or an active networker.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The Outside Perspective:</strong> Someone from outside the electrical
                    trade entirely who can offer fresh perspectives and challenge industry
                    assumptions. This might be a friend in a completely different field (technology,
                    healthcare, education, finance) who sees your challenges through different eyes
                    and asks questions that no one inside the trade would think to ask.
                  </span>
                </li>
              </ul>

              <p>
                You do not need to formally tell these people that they are on your
                &ldquo;board&rdquo;. The concept is more of a mental framework to ensure that you
                are deliberately seeking diverse perspectives rather than relying on a single source
                of advice or, worse, making all decisions in isolation. When you face a significant
                career decision &mdash; whether to pursue a qualification, start a business, change
                specialisation, invest in equipment, or hire an employee &mdash; mentally consult
                your board. What would each person advise? Better yet, actually call them and ask.
              </p>

              <p>
                The personal board of advisers model is particularly valuable for self-employed
                electricians who lack the natural advisory structures of a larger organisation.
                Employed electricians often have access to supervisors, managers, training
                departments, and colleagues who provide multiple perspectives on career decisions.
                Self-employed electricians must build this advisory network deliberately, or risk
                making important decisions based solely on their own limited perspective.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Exercise: Map Your Personal Board
                </p>
                <p className="text-base text-white leading-relaxed">
                  Write down the five roles described above (Technical Expert, Business Adviser,
                  Truth-Teller, Industry Connector, Outside Perspective). For each role, write the
                  name of someone in your life who could fill it. If you cannot think of anyone for
                  a particular role, that is a gap in your support network &mdash; and identifying
                  it is the first step to filling it. Your action plan should include one specific
                  step to build or strengthen each relationship on your board.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: When Accountability Becomes Pressure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            When Accountability Becomes Pressure &mdash; Finding the Right Balance
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While accountability is a powerful positive force, it can cross the line from
                helpful motivation into unhelpful pressure. Understanding where this line is &mdash;
                and how to manage it &mdash; is essential for sustainable goal pursuit. The
                difference between productive accountability and destructive pressure is primarily
                one of emotional quality. Productive accountability feels like a supportive
                commitment: &ldquo;I want to follow through because I said I would, and I respect
                the person I made the commitment to.&rdquo; Destructive pressure feels like anxiety,
                shame, or dread: &ldquo;I have to report on my progress and I am terrified of
                admitting that I have not done enough.&rdquo;
              </p>

              <p>Warning signs that accountability has become unhelpful pressure include:</p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Dreading check-ins:</strong> If you feel genuine dread rather than
                    healthy anticipation before an accountability meeting, the relationship or the
                    goals may need recalibrating
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Lying or exaggerating:</strong> If you find yourself being dishonest
                    about your progress to avoid the discomfort of admitting shortfalls, the
                    accountability relationship has become a source of shame rather than support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Physical stress symptoms:</strong> Poor sleep, irritability, or anxiety
                    directly related to the accountability relationship or the goals attached to it
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Abandoning the goal entirely:</strong> Paradoxically, excessive pressure
                    can lead to giving up completely. If the emotional cost of continuing (and
                    reporting on failure) exceeds the benefit of the goal, people quit
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Resentment towards the accountability partner:</strong> If you start
                    viewing your accountability partner as a critic, judge, or source of stress
                    rather than a supportive ally
                  </span>
                </li>
              </ul>

              <p>
                If you recognise these signs, several adjustments can help. First, recalibrate your
                goals: if you are consistently failing to meet your commitments, the goals may be
                too ambitious for your current circumstances. Reducing them to achievable levels
                restores the positive feedback loop where accountability leads to completion, which
                leads to confidence, which leads to more ambitious goals over time. Second,
                communicate honestly with your accountability partner: tell them how you are
                feeling. A good partner will adjust their approach &mdash; perhaps being less
                challenging and more supportive for a period, or focusing on what you have achieved
                rather than what you have not. Third, examine whether the accountability partner is
                the right fit: some people are naturally more critical than supportive, and this
                dynamic may not suit your personality. It is acceptable to change accountability
                partners if the relationship is not working. Fourth, separate identity from
                performance: the purpose of accountability is to help you achieve goals, not to
                define your worth. Missing a commitment does not make you a failure &mdash; it makes
                you a human being who had a difficult week. Healthy accountability acknowledges
                this.
              </p>

              <p>
                The optimal level of accountability creates what psychologists call
                <strong> moderate arousal</strong> &mdash; enough social pressure to motivate
                action, but not so much that it triggers anxiety and avoidance. Think of it as a
                thermostat: you want the temperature high enough to create energy, but not so high
                that it becomes unbearable. The Yerkes&ndash;Dodson law describes this principle:
                moderate levels of arousal lead to optimal performance, while both low and high
                levels lead to poor performance. Your accountability structures should be calibrated
                to keep you in this productive middle zone.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Accountability Spectrum</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Too little:</strong> No external accountability. Goals drift.
                      Procrastination goes unchecked. Progress is slow or nonexistent. Common for
                      self-employed electricians who work alone.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Just right:</strong> Regular, supportive check-ins with a trusted
                      person. Mild social pressure that motivates action. Honest reporting without
                      shame. Celebration of progress and constructive response to setbacks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Too much:</strong> Excessive pressure. Anxiety and dread. Dishonest
                      reporting. Identity attached to performance. Goal abandonment. Resentment
                      towards the accountability partner.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Professional Coaching */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Professional Coaching &mdash; What It Is, How It Works, and Whether It&rsquo;s Worth It
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Professional coaching is a structured, paid relationship with a trained professional
                who helps you clarify goals, overcome obstacles, develop strategies, and maintain
                accountability. Unlike mentoring (which is based on the mentor&rsquo;s direct
                experience in your field), coaching is based on the coach&rsquo;s expertise in the
                process of change, development, and performance optimisation. A coach does not need
                to be an electrician or even understand the electrical trade in detail &mdash; their
                value lies in asking the right questions, challenging your assumptions, holding you
                accountable, and helping you develop strategies for achieving your specific goals.
              </p>

              <p>
                Coaching typically involves regular sessions (fortnightly or monthly), usually
                lasting 45&ndash;90 minutes, conducted in person, by phone, or by video call. The
                cost varies widely: from &pound;50&ndash;&pound;100 per session for newer coaches to
                &pound;150&ndash;&pound;300+ for experienced, accredited coaches (ICF, EMCC, or AC
                accredited). Some coaches specialise in trades and construction, though this is not
                common in the UK market. General business coaches, career coaches, and performance
                coaches can all be effective for electricians.
              </p>

              <p>
                Is coaching worth the investment? The answer depends on your circumstances. Coaching
                is most valuable when you are: at a career crossroads (considering a major change in
                direction, starting a business, or transitioning to a new specialisation), feeling
                stuck (you know what you want to achieve but cannot seem to make progress),
                struggling with a specific challenge (work-life balance, confidence, business
                growth, delegation), wanting to accelerate your development (you are ambitious and
                want structured, regular support to stay on track), or lacking the accountability
                structures that the ASTD research shows are most effective for goal completion.
              </p>

              <p>
                Coaching is less valuable when: you are early in your career and primarily need
                technical knowledge (a mentor would be more appropriate), you are not willing to be
                honest about your challenges and take action on the coach&rsquo;s guidance, or you
                are looking for someone to tell you what to do rather than help you figure out what
                you want. Coaching is fundamentally a collaborative process &mdash; the coach asks
                questions and provides frameworks; you do the thinking and the doing.
              </p>

              <p>
                For many electricians, the idea of hiring a coach feels alien or extravagant. The
                trades have traditionally valued self-reliance and practical action over
                &ldquo;talking about your feelings.&rdquo; But coaching is not therapy &mdash; it is
                a performance tool. Professional athletes, CEOs, and high performers across every
                field use coaches because the external perspective, structured accountability, and
                strategic thinking support are genuinely effective. An electrician who invests
                &pound;150 per month in coaching and, as a result, starts a successful business six
                months earlier, wins a major contract, or avoids a costly career mistake has
                received an enormous return on that investment.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">How to Choose a Coach</p>
                <p className="text-base text-white leading-relaxed">
                  If you decide to explore coaching, look for: accreditation from a recognised body
                  (ICF, EMCC, or AC), a free initial consultation (most coaches offer a 20&ndash;30
                  minute discovery call to check fit), clear pricing with no hidden costs,
                  testimonials or references from previous clients, a coaching style that suits you
                  (some coaches are very structured and goal-focused; others are more reflective and
                  exploratory), and ideally some understanding of small business or trade
                  environments (though this is not essential). Avoid coaches who promise specific
                  outcomes (&ldquo;I guarantee you will double your income&rdquo;) or who use
                  high-pressure sales tactics to lock you into long contracts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Support Systems for Self-Employed Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Support Systems for Self-Employed Electricians Who Work Alone
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self-employment is the aspiration of many electricians, and the UK electrical
                industry has a high proportion of sole traders and small businesses. But
                self-employment brings a specific and often underestimated challenge: isolation.
                When you work alone, there is no team meeting to attend, no line manager to report
                to, no colleague to bounce ideas off, no supervisor to give feedback, and no peer
                group to compare yourself with. This isolation affects both accountability (there is
                no one expecting you to follow through on development goals) and wellbeing (the
                mental health impact of working alone, day after day, is well documented).
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">The Isolation Problem</h3>

              <p>
                Research on self-employment and isolation consistently identifies several risks.
                <strong> Decision-making suffers</strong> when you have no one to discuss options
                with &mdash; you are more likely to make impulsive or poorly considered choices.
                <strong> Standards can drift</strong> when there is no external quality check
                &mdash; it is easy to cut corners or lower standards when no one is watching.
                <strong> Motivation fluctuates</strong> more widely without the social energy and
                accountability of a team.
                <strong> Professional development stalls</strong> because there is no structured
                training programme, no CPD requirement enforced by an employer, and no pressure from
                colleagues who are visibly developing their skills.
                <strong> Mental health can deteriorate</strong> because humans are social creatures
                and prolonged isolation increases the risk of stress, anxiety, and depression. The
                construction and trades sectors already have disproportionately high rates of mental
                health problems and suicide, and working in isolation is a contributing factor.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Creating Structure Without a Boss
              </h3>

              <p>
                Self-employed electricians must deliberately create the structures that employed
                electricians receive by default. This requires conscious effort because these
                structures do not form naturally in the absence of organisational support. Key
                strategies include:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Weekly self-review:</strong> Set aside 30 minutes every Friday to review
                    the week. What did you accomplish? What did you learn? What problems did you
                    encounter? What will you focus on next week? Writing this down creates a record
                    of progress and a structure for continuous improvement.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Monthly business review:</strong> Once a month, review your business
                    metrics: revenue, profit margin, number of jobs, customer satisfaction, lead
                    sources, marketing effectiveness. Treat yourself as the managing director of a
                    small company (which you are) and hold a monthly board meeting with yourself.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>CPD schedule:</strong> Set a minimum annual CPD target (the IET
                    recommends 30 hours per year for professional registration) and schedule
                    specific training events, courses, and study sessions at the start of each year.
                    Put them in the diary as non-negotiable appointments.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Financial accountability:</strong> Schedule regular meetings with your
                    accountant (not just at year-end). A quarterly financial review creates external
                    accountability for the business side of your work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Social contact:</strong> Deliberately schedule social and professional
                    interactions: trade association meetings, supplier events, breakfast networking,
                    pub lunches with fellow tradespeople. These are not luxuries &mdash; they are
                    essential for both accountability and mental health.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Mastermind Groups for Tradespeople
              </h3>

              <p>
                The mastermind group concept was popularised by Napoleon Hill in his 1937 book Think
                and Grow Rich. Hill described the mastermind as &ldquo;the coordination of knowledge
                and effort of two or more people who work toward a definite purpose in the spirit of
                harmony.&rdquo; A mastermind group is a small group of people (typically 3&ndash;5,
                rarely more than 6) who meet regularly (fortnightly or monthly) to support each
                other&rsquo;s goals through accountability, problem-solving, and shared learning.
              </p>

              <p>
                For self-employed electricians, a mastermind group can replace the accountability,
                social support, and collective problem-solving that employed workers receive from
                their teams. The ideal mastermind group for a tradesperson has the following
                characteristics:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Small size (3&ndash;5 members):</strong> Large enough for diverse
                    perspectives, small enough for each member to get meaningful attention at every
                    meeting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Regular schedule:</strong> Fortnightly or monthly, on a fixed day and
                    time, treated as a non-negotiable commitment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Structured agenda:</strong> Each meeting follows a format: brief updates
                    from each member on progress since the last meeting, a &ldquo;hot seat&rdquo;
                    where one member presents a challenge and the group problem-solves, and
                    commitment-setting where each member states what they will accomplish before the
                    next meeting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Diverse membership:</strong> A mix of specialisations, career stages,
                    and perspectives creates richer discussion. A group of five domestic installers
                    at the same career stage will have less to offer each other than a group
                    containing a domestic installer, a commercial contractor, an inspector, a
                    designer, and perhaps a tradesperson from a different sector entirely
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Confidentiality and trust:</strong> Members must feel safe sharing
                    business figures, personal struggles, and honest assessments of their progress.
                    What is discussed in the mastermind stays in the mastermind
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Equal commitment:</strong> Every member must be genuinely invested. A
                    mastermind group quickly collapses if one or two members are consistently
                    absent, unprepared, or disengaged
                  </span>
                </li>
              </ul>

              <p>
                Starting a mastermind group is simpler than it sounds. Identify 2&ndash;4 other
                tradespeople or small business owners you respect, explain the concept, propose a
                regular meeting (a cafe, a pub, a trade counter, or a video call), and agree on a
                basic structure. The first few meetings may feel awkward or unstructured, but with
                consistency and genuine commitment, mastermind groups quickly become one of the most
                valuable elements of a self-employed tradesperson&rsquo;s support system.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sample Mastermind Meeting Agenda (90 Minutes)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>0&ndash;10 mins:</strong> Check-in. Each member shares a one-minute
                      update: biggest win since last meeting, biggest challenge, accountability
                      report (did you do what you committed to?)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>10&ndash;50 mins:</strong> Hot seat. One member (rotating each
                      meeting) presents a challenge or decision in detail. The group asks questions,
                      brainstorms solutions, and offers advice.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>50&ndash;70 mins:</strong> Round-robin. Each remaining member gets 5
                      minutes to raise a quick question or challenge for group input.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>70&ndash;80 mins:</strong> Commitments. Each member states one
                      specific, measurable action they will complete before the next meeting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>80&ndash;90 mins:</strong> Wrap-up. Confirm next meeting date. Share
                      any useful resources, contacts, or tools discovered since last time.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has examined the critical role of accountability and support systems in
                achieving professional goals. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The accountability effect</strong> is one of the most powerful forces in
                    goal achievement. The ASTD research shows that regular accountability meetings
                    raise goal completion rates from 10% to 95%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Four types of accountability</strong> &mdash; self, peer, professional,
                    and public &mdash; each have distinct strengths. The most effective approach
                    combines multiple types.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The electrical trade</strong> offers natural accountability contexts
                    (apprentice&ndash;mentor relationships, trade buddies, supplier networks, trade
                    associations, online communities) that must be deliberately cultivated.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Mentoring</strong> accelerates career development. Good mentors combine
                    relevant expertise, honesty, patience, and availability. The IET mentoring
                    scheme offers formal matching.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Reverse mentoring</strong> creates two-way value: younger electricians
                    share digital skills while experienced electricians share craft knowledge and
                    professional wisdom.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>A personal board of advisers</strong> (3&ndash;5 trusted individuals
                    covering different aspects of your development) ensures diverse perspectives on
                    important decisions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Accountability can become pressure</strong> if it triggers anxiety,
                    shame, or avoidance. The optimal level creates moderate, motivating social
                    commitment without dread.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Self-employed electricians</strong> face particular isolation risks and
                    must deliberately create accountability structures. Mastermind groups are one of
                    the most effective solutions.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    This completes Module 4: Tracking Progress &amp; Continuous Improvement.
                  </strong>{' '}
                  You have now covered progress tracking methods, self-assessment and reflection,
                  overcoming setbacks, and accountability and support systems. In Module 5, you will
                  bring everything together into a comprehensive Growth Action Plan &mdash; a
                  practical, personalised roadmap for your professional development as an
                  electrician.
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
            <Link to="../gs-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-5">
              Next Module: Your Growth Action Plan
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
