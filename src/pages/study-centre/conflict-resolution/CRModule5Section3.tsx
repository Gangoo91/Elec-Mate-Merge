import { ArrowLeft, Handshake, CheckCircle } from 'lucide-react';
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
    id: 'cr-5-3-check1',
    question:
      "According to the Trust Equation (Maister, Green & Galford), which of the following would MOST damage a tradesperson's trustworthiness?",
    options: [
      'Having a slightly higher price than competitors for equivalent work',
      "Consistently prioritising their own financial interest over the client's best outcome (high self-orientation)",
      'Occasionally being 10 minutes late to a site visit but always calling ahead',
      'Not having a website or social media presence',
    ],
    correctIndex: 1,
    explanation:
      "In the Trust Equation — Trust = (Credibility + Reliability + Intimacy) / Self-Orientation — self-orientation is the denominator. This means that high self-orientation (being perceived as primarily motivated by your own interests rather than the client's) divides and therefore reduces all the trust you have built through credibility, reliability, and intimacy. You could be highly credible, perfectly reliable, and personally warm, but if the client believes your primary motivation is extracting money from them rather than solving their problem, all of that trust evaporates. This is why pushy upselling, recommending unnecessary work, and prioritising speed over quality are so destructive to trust — they signal that your own interests come first.",
  },
  {
    id: 'cr-5-3-check2',
    question:
      'An electrician finishes a job and the client mentions they are having problems with their plumbing. The electrician knows a reliable plumber. According to the reciprocity principle, what should the electrician do?',
    options: [
      'Ignore the comment — plumbing is not their concern and helping would be unprofessional',
      'Offer to fix the plumbing themselves to earn extra income',
      'Recommend the reliable plumber genuinely and without expecting anything in return, knowing that this kind of genuine helpfulness builds goodwill that tends to be reciprocated over time',
      'Only recommend the plumber if the plumber agrees to pay a referral fee',
    ],
    correctIndex: 2,
    explanation:
      'Cialdini\'s reciprocity principle demonstrates that when you do something genuinely helpful for another person, they feel a natural psychological obligation to return the favour. Recommending a reliable plumber costs the electrician nothing, provides genuine value to the client, and creates goodwill that makes the client significantly more likely to use the electrician again and to recommend them to others. The key word is "genuinely" — the recommendation must be based on the plumber\'s actual quality, not on a referral fee arrangement. Clients are perceptive and will quickly recognise if your recommendations are driven by your financial interest rather than their wellbeing. Authentic generosity builds trust; transactional behaviour erodes it.',
  },
  {
    id: 'cr-5-3-check3',
    question:
      'An electrician always delivers high-quality work but frequently misses agreed start times, forgets to return calls, and occasionally leaves tools on site that need collecting the following week. According to the Trust Equation, which component of trust are they failing on?',
    options: [
      'Credibility — their technical knowledge is in question',
      'Reliability — they do not consistently do what they say they will do',
      'Intimacy — they are not building personal connections with clients',
      "Self-orientation — they are prioritising their own needs over the client's",
    ],
    correctIndex: 1,
    explanation:
      'Reliability in the Trust Equation means consistently doing what you say you will do — keeping promises, meeting deadlines, and delivering a predictable standard of behaviour. The electrician in this scenario has strong credibility (high-quality technical work) but weak reliability (inconsistent on timing, communication, and organisation). Clients value predictability almost as much as quality. An electrician who always arrives within five minutes of the agreed time, always returns calls the same day, and always cleans up after themselves is perceived as more trustworthy than one who does excellent work but is unreliable on everything else. Reliability is demonstrated through the small, consistent behaviours that accumulate over time to build — or destroy — confidence.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What is the Trust Equation and who created it?',
    answer:
      'The Trust Equation was developed by David Maister, Charles Green, and Robert Galford and published in their 2000 book "The Trusted Advisor." The formula is: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. Credibility is your expertise and track record. Reliability is your consistency in doing what you say you will do. Intimacy is the safety and comfort the other person feels in the relationship. Self-Orientation is the degree to which you are perceived as focused on your own interests rather than the other person\'s. The key insight is that the first three factors add to trust (they are in the numerator) while self-orientation divides it (it is in the denominator). This means that even high levels of credibility, reliability, and intimacy can be undermined by a perception that you are primarily self-serving.',
  },
  {
    question: 'How does networking prevent conflict for tradespeople?',
    answer:
      "Strong professional networks prevent conflict in several ways. First, when you have established relationships with other trades, disagreements are less likely to escalate because there is mutual respect and a shared desire to maintain the relationship. An electrician who knows the plumber personally will approach a routing disagreement very differently from one dealing with a stranger. Second, having a network of trusted contacts gives you alternative options when a professional relationship becomes toxic — you are less dependent on any single client or contractor. Third, networking creates informal accountability: tradespeople who are known and respected in their professional community have a stronger incentive to resolve conflicts fairly because their reputation is visible. Fourth, many conflicts can be prevented entirely through the information and advice that flows through professional networks — learning from others' mistakes before you make them yourself.",
  },
  {
    question: 'What is the lifetime value of a trusted client relationship?',
    answer:
      'The lifetime value of a trusted client relationship in electrical work is substantial and often underestimated. Consider a homeowner who has their consumer unit replaced by an electrician they trust: they are likely to return for every future electrical need — additional sockets, new lighting, outdoor power, EV charger installation, periodic inspection and testing. Over 20 to 30 years of home ownership, a single trusted relationship could generate £10,000 to £30,000 in repeat work. But the value extends beyond direct repeat business. Trusted clients refer friends, family, and neighbours — and referred clients arrive with a built-in level of trust that makes the working relationship smoother from day one. A single strong client relationship can generate dozens of referrals over time, each of which creates its own lifetime value. This is why protecting and nurturing professional relationships is not a soft skill — it is a core business strategy.',
  },
  {
    question:
      'How do I build credibility as a newly qualified electrician with limited experience?',
    answer:
      'Credibility is built through demonstrated competence, not just years of experience. As a newly qualified electrician, you can build credibility by being transparent about your qualifications and their currency (your training is up to date with the latest edition of BS 7671, which is an advantage over some experienced electricians who have not kept current); by explaining your work clearly and confidently to clients (showing that you understand why you are doing what you are doing, not just how); by presenting professional documentation (clean quotes, clear T&Cs, thorough certification); by admitting when something is outside your experience and consulting a mentor rather than guessing; and by seeking feedback and acting on it. Clients are not looking for decades of experience — they are looking for competence, professionalism, and integrity. A newly qualified electrician who demonstrates all three will build credibility far faster than an experienced one who is sloppy, arrogant, or unreliable.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The Trust Equation (Maister, Green & Galford) is expressed as:',
    options: [
      'Trust = Credibility × Reliability × Intimacy',
      'Trust = (Credibility + Reliability + Intimacy) / Self-Orientation',
      'Trust = Self-Orientation / (Credibility + Reliability)',
      'Trust = (Experience + Qualifications) / Price',
    ],
    correctAnswer: 1,
    explanation:
      'The Trust Equation is Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. The three numerator factors all contribute positively to trust: Credibility (your expertise and track record), Reliability (your consistency in delivering on promises), and Intimacy (the safety and comfort the other person feels with you). Self-Orientation is the denominator, which means it divides the total. The higher your self-orientation (the more you are perceived as self-serving), the more it reduces your overall trustworthiness. This formula explains why highly competent tradespeople can still be distrusted — if clients perceive that the tradesperson is primarily motivated by their own financial gain, all the credibility and reliability in the world will not fully compensate.',
  },
  {
    id: 2,
    question: 'In the context of the Trust Equation, "Reliability" for a tradesperson means:',
    options: [
      'Having the most advanced tools and equipment available',
      'Consistently doing what you say you will do — keeping promises, meeting deadlines, delivering a predictable standard',
      'Being available 24 hours a day, 7 days a week for emergencies',
      'Having been in business for at least 10 years',
    ],
    correctAnswer: 1,
    explanation:
      'Reliability in the Trust Equation is about consistency and predictability. It means arriving when you said you would arrive, completing work when you said you would complete it, charging what you quoted, returning calls when you said you would, and delivering the same high standard on every job. Clients value predictability because it reduces their anxiety and demonstrates respect for their time and commitments. An electrician who is occasionally brilliant but frequently unreliable is less trusted than one who is consistently good and always dependable. Reliability is built through hundreds of small, consistent actions over time — and it can be destroyed by a single broken promise at a critical moment.',
  },
  {
    id: 3,
    question: "Cialdini's reciprocity principle suggests that in professional relationships:",
    options: [
      'You should always expect immediate payment for any favour or referral',
      'Genuine helpfulness and generosity create a natural psychological obligation in others to return the favour, building long-term goodwill',
      'Reciprocity only works in personal relationships, not professional ones',
      'You should keep a detailed ledger of favours given and received to ensure fairness',
    ],
    correctAnswer: 1,
    explanation:
      "Robert Cialdini's research on influence and persuasion identifies reciprocity as one of the most powerful drivers of human social behaviour. When someone does something genuinely helpful for you — without expecting immediate return — you feel a natural psychological obligation to reciprocate. For tradespeople, this principle operates constantly: recommending a reliable plumber creates goodwill with both the client and the plumber, lending tools to another trade on site creates an informal bond, sharing useful information helps build your professional network. The key is authenticity — the gesture must be genuine, not calculated. People are remarkably perceptive at distinguishing authentic generosity from strategic manipulation, and calculated reciprocity quickly erodes rather than builds trust.",
  },
  {
    id: 4,
    question: 'Why do strong professional relationships reduce conflict frequency and severity?',
    options: [
      'Because people who like each other never disagree about anything',
      'Because strong relationships create mutual respect, assumed good intent, investment in resolution, and informal accountability',
      'Because professional relationships are purely transactional and have no emotional component',
      'Because people in strong relationships always avoid raising difficult issues',
    ],
    correctAnswer: 1,
    explanation:
      'Strong professional relationships reduce conflict through multiple mechanisms. Mutual respect means that disagreements start from a position of goodwill rather than suspicion. Assumed good intent means that when problems arise, both parties assume the other meant well rather than assuming malice. Investment in the relationship creates a shared motivation to resolve disputes constructively rather than destructively. Informal accountability means that people who value a professional relationship are more careful to behave well within it. Conflicts will still occur — they are an inevitable part of any working relationship — but in the context of a strong relationship, they are less frequent (because many triggers are prevented), less intense (because trust provides a buffer), and more likely to be resolved constructively (because both parties want to preserve the relationship).',
  },
  {
    id: 5,
    question:
      'An electrician consistently delivers excellent technical work but is perceived by clients as only interested in maximising their invoice. According to the Trust Equation, what is the problem?',
    options: [
      'Low Credibility — the quality of their work is being questioned',
      'Low Reliability — they are not meeting deadlines',
      'High Self-Orientation — the perception that they prioritise their own financial interest divides and reduces the trust built by their credibility',
      'Low Intimacy — they are not building personal connections',
    ],
    correctAnswer: 2,
    explanation:
      "This scenario perfectly illustrates the power of Self-Orientation as the denominator in the Trust Equation. The electrician has high Credibility (excellent technical work), presumably adequate Reliability, and perhaps reasonable Intimacy. But high Self-Orientation — the perception that they are primarily motivated by maximising their own income — divides all of that positive trust. The result is that despite being technically excellent, the client does not fully trust them because they suspect every recommendation is financially motivated. The solution is not to reduce the quality of work or lower prices — it is to demonstrate genuine concern for the client's interest. This might mean recommending a cheaper option when appropriate, explaining why a more expensive solution is genuinely better rather than just more profitable, or occasionally doing small favours that have no financial benefit.",
  },
  {
    id: 6,
    question:
      'What is the most effective way for an electrician to build "Intimacy" (as defined in the Trust Equation) with clients?',
    options: [
      'Sharing personal problems and asking clients about their private lives',
      "Creating genuine rapport through remembering details, showing interest in the client's home and plans, and making them feel safe to raise concerns without judgement",
      'Adding clients on social media and liking their posts',
      'Offering significant discounts to make clients feel valued',
    ],
    correctAnswer: 1,
    explanation:
      "Intimacy in the Trust Equation refers to the sense of safety and comfort that a person feels in the relationship — the degree to which they feel they can share concerns, raise issues, and be vulnerable without being judged, dismissed, or taken advantage of. For electricians, this is built through genuine human connection: remembering details about the client's family, home renovation plans, or previous conversations; showing genuine interest in their goals for the work; creating an environment where the client feels comfortable asking questions or raising concerns. It is not about becoming friends — it is about creating a professional relationship where the client feels genuinely cared for as a person, not treated as a transaction. This is particularly important for domestic work where clients are inviting you into their home.",
  },
  {
    id: 7,
    question: 'Which of the following best describes the relationship between trust and conflict?',
    options: [
      'Trust eliminates conflict entirely — trusted relationships never experience disagreements',
      'Trust has no effect on conflict — disputes happen regardless of the relationship quality',
      'Trust acts as a buffer — it reduces conflict frequency, reduces severity when it occurs, and increases the likelihood of constructive resolution',
      'Trust makes conflict worse because expectations are higher',
    ],
    correctAnswer: 2,
    explanation:
      'Trust does not eliminate conflict — disagreements are a natural and inevitable part of any working relationship. However, trust fundamentally changes how conflict plays out. In high-trust relationships, conflicts are less frequent because trust reduces misunderstandings and provides the benefit of the doubt. When conflicts do occur, they are less intense because both parties approach the disagreement from a position of mutual respect and assumed good intent. And they are more likely to be resolved constructively because both parties are invested in preserving the relationship and are willing to compromise. In low-trust relationships, by contrast, even minor disagreements can escalate rapidly because there is no buffer of goodwill, no assumption of good intent, and no shared investment in resolution.',
  },
  {
    id: 8,
    question:
      'An electrician knows the owner of the local electrical wholesale by first name, always chats when collecting materials, and occasionally recommends the branch to other tradespeople. This is an example of:',
    options: [
      'Wasting time that should be spent on productive work',
      'Building supplier relationships through genuine rapport and reciprocity, which creates goodwill that can be invaluable during material shortages, urgent orders, or pricing negotiations',
      'An unprofessional approach to business relationships',
      'A strategy that only benefits the wholesale branch, not the electrician',
    ],
    correctAnswer: 1,
    explanation:
      'Supplier relationships are one of the most undervalued aspects of professional networking for tradespeople. An electrician who has a genuine personal relationship with their wholesale branch staff receives tangible benefits: priority access during material shortages (the branch will hold stock for someone they know and like), better pricing (wholesale staff have discretion on pricing, and they use it for customers they value), faster processing of urgent orders, advance notice of new products or price increases, and credit terms that may not be available to anonymous customers. All of this is built through the same principles that build client trust: genuine interest, reciprocity, reliability, and consistent professional behaviour. The five minutes spent chatting at the trade counter is not wasted time — it is an investment in a commercial relationship that pays dividends throughout your career.',
  },
];

export default function CRModule5Section3() {
  useSEO({
    title: 'Building Professional Relationships | Conflict Resolution Module 5.3',
    description:
      'The trust equation, credibility and reliability, professional networking, the reciprocity principle, and lifetime client value.',
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
            <Link to="../cr-module-5">
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
            <Handshake className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Professional Relationships
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The trust equation, credibility and reliability, professional networking, and the
            reciprocity principle
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Strong relationships</strong> are the most effective long-term conflict
                prevention strategy
              </li>
              <li>
                <strong>The Trust Equation:</strong> Trust = (Credibility + Reliability + Intimacy)
                / Self-Orientation
              </li>
              <li>
                <strong>Reliability</strong> means doing what you say, every time &mdash;
                predictability builds confidence
              </li>
              <li>
                <strong>Reciprocity:</strong> genuine helpfulness creates goodwill that compounds
                over your career
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Conflict buffer:</strong> Trust reduces the frequency, intensity, and
                destructiveness of disputes
              </li>
              <li>
                <strong>Lifetime value:</strong> A single trusted client relationship can generate
                &pound;10,000&ndash;&pound;30,000 in repeat work plus referrals
              </li>
              <li>
                <strong>Premium pricing:</strong> Trusted tradespeople can charge more because
                clients pay for confidence
              </li>
              <li>
                <strong>Network effects:</strong> Strong relationships with other trades, suppliers,
                and building control open doors that cold calling never will
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain why strong professional relationships are the most effective long-term conflict prevention strategy',
              'Apply the Trust Equation (Maister, Green & Galford) to analyse and improve your trustworthiness as a tradesperson',
              'Demonstrate how credibility and reliability are built through consistent small actions over time',
              'Describe how genuine rapport and networking create professional opportunities and prevent disputes',
              "Apply Cialdini's reciprocity principle to build goodwill across your professional network",
              'Calculate the approximate lifetime value of a trusted client relationship and explain why it justifies investment in relationship building',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Prevention Through Relationships
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Throughout this course, we have explored what conflict is, how people respond to it,
                frameworks for resolving it, and techniques for de-escalating it. All of those
                skills are essential. But the most effective conflict strategy of all is prevention,
                and the most powerful preventive tool available to any tradesperson is a portfolio
                of strong, genuine professional relationships. When you have built real trust with a
                client, contractor, or fellow tradesperson, the entire dynamic of disagreement
                changes. Problems are raised early instead of festering. Assumptions are charitable
                instead of hostile. Mistakes are forgiven instead of weaponised. Solutions are
                collaborative instead of adversarial.
              </p>

              <p>
                This is not abstract theory &mdash; it is the daily lived experience of every
                successful tradesperson. Think about the clients you have the strongest
                relationships with. When something goes wrong on one of their jobs, you do not avoid
                the conversation or fear their reaction &mdash; you call them, explain what has
                happened, and work together to fix it. And they respond with understanding rather
                than anger because they trust you. Now think about the clients you have weaker
                relationships with &mdash; perhaps a new client or one you have only worked for
                once. The same problem with that client feels entirely different: you worry about
                their reaction, you choose your words carefully, and you brace for conflict. The
                technical problem is identical in both cases. The relationship changes everything.
              </p>

              <p>
                Strong professional relationships reduce conflict through four mechanisms. First,
                <strong> mutual respect</strong> means that disagreements start from a position of
                goodwill rather than suspicion. Second, <strong>assumed good intent</strong> means
                that when problems arise, both parties assume the other meant well rather than
                assuming negligence or dishonesty. Third,{' '}
                <strong>investment in the relationship</strong> creates a shared motivation to
                resolve disputes constructively because both parties want the relationship to
                survive and thrive. Fourth,
                <strong> informal accountability</strong> means that people who value a professional
                relationship are more careful to communicate clearly, deliver on promises, and
                behave professionally, because the relationship matters to them.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Trust Equation
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2000, business consultants David Maister, Charles Green, and Robert Galford
                published <em>The Trusted Advisor</em>, in which they proposed a formula for
                understanding what makes someone trustworthy. The <strong>Trust Equation</strong> is
                deceptively simple but extraordinarily useful:{' '}
                <strong>Trust = (Credibility + Reliability + Intimacy) / Self-Orientation</strong>.
                Each component can be understood and improved by any tradesperson, and the formula
                as a whole explains why some electricians build fiercely loyal client bases while
                others with identical technical skills struggle to retain clients.
              </p>

              <p>
                <strong>Credibility</strong> is the first component in the numerator. It refers to
                the degree to which the other person believes in your expertise, knowledge, and
                track record. For an electrician, credibility comes from demonstrable qualifications
                (your JIB card, competent person scheme membership, inspection body registration),
                from the quality of your work (clean installations, proper cable management,
                attention to detail), from your ability to explain technical matters clearly to
                non-technical clients, and from your professional presentation (branded van, clean
                workwear, organised tools). Credibility is what makes the client believe you know
                what you are doing. It is necessary for trust but not sufficient on its own &mdash;
                many credible tradespeople are still not trusted because they fail on other
                components.
              </p>

              <p>
                <strong>Reliability</strong> is the second component. It means consistently doing
                what you say you will do. For a tradesperson, this is demonstrated through arriving
                when you said you would arrive, completing work within the agreed timeline, charging
                what you quoted, returning phone calls when you said you would, and delivering the
                same high standard of work on every job regardless of its size or the client&rsquo;s
                ability to judge quality. Reliability is perhaps the most valued component of trust
                for domestic clients, because so many tradespeople fail on it. The electrician who
                always arrives on time, always answers their phone, and always delivers what they
                promised is rare &mdash; and therefore highly valued.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Trust Equation for Electricians
                </p>
                <div className="text-center my-4">
                  <p className="text-lg font-bold text-white">
                    Trust = (Credibility + Reliability + Intimacy) / Self-Orientation
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Credibility:</strong> Qualifications, quality of work, clear
                      explanations, professional presentation. &ldquo;Do I believe they know what
                      they are doing?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reliability:</strong> On time, on budget, on quality, every time.
                      Returns calls. Meets deadlines. Predictable and consistent. &ldquo;Do they do
                      what they say they will do?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Intimacy:</strong> Genuine rapport, remembering details, creating
                      safety to raise concerns. &ldquo;Do I feel comfortable and cared for as a
                      person, not just a transaction?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Self-Orientation (divides trust):</strong> Perception of self-interest
                      over client&rsquo;s interest. Pushy upselling, unnecessary work
                      recommendations, prioritising speed over quality. &ldquo;Are they more
                      interested in my money than my problem?&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Credibility and Reliability
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Credibility and reliability are the two components of trust that tradespeople
                understand most intuitively because they relate directly to the work. Yet it is
                surprising how many technically excellent electricians undermine their own
                credibility and reliability through behaviours they do not even recognise as
                problematic. The principle is straightforward:{' '}
                <strong>do what you say you will do, every single time, without exception</strong>.
                This applies to the big things (completing the job on time and on budget) and the
                small things (returning a phone call within the hour you promised, cleaning up at
                the end of each day as you said you would, emailing the certificate when you said
                you would email it).
              </p>

              <p>
                The reason small actions matter so much is that clients use them as proxies for your
                overall competence and reliability. If you are 30 minutes late without calling
                ahead, the client does not just think &ldquo;they are late&rdquo; &mdash; they think
                &ldquo;if they cannot manage their own time, can they really manage a complex
                electrical installation?&rdquo; If you promise to send a certificate &ldquo;this
                evening&rdquo; and it arrives three days later, the client does not just think
                &ldquo;the certificate was late&rdquo; &mdash; they think &ldquo;they do not keep
                their promises.&rdquo; These judgements may seem unfair, but they are universal and
                predictable. Every interaction is a data point that the client uses to calibrate
                their trust in you.
              </p>

              <p>
                Building credibility and reliability is not about grand gestures &mdash; it is about
                relentless consistency in small behaviours. Arrive five minutes early rather than
                five minutes late. Return every call the same day. Send every document when you
                promised to send it. Leave every job site cleaner than you found it. Explain every
                piece of work clearly and without jargon. Follow up after completion to check the
                client is happy. None of these individually is remarkable. But done consistently,
                over months and years, they create a reputation that is almost impervious to the
                occasional honest mistake. When you have established deep reliability, a client will
                forgive the one time you are late because it is so out of character. Without that
                track record, every mistake is confirmation of their suspicions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Rapport and Networking
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Intimacy</strong> &mdash; the third component of the Trust Equation &mdash;
                refers to the safety and comfort that the other person feels in the relationship.
                For tradespeople, this is built through genuine human connection: showing authentic
                interest in the client as a person (not just as a source of revenue), remembering
                details from previous conversations (their children&rsquo;s names, their renovation
                plans, the issue they mentioned last time), and creating an environment where the
                client feels comfortable raising concerns or asking questions without fear of being
                patronised or dismissed.
              </p>

              <p>
                Professional networking &mdash; building relationships with other trades, suppliers,
                and industry contacts &mdash; is equally important and serves multiple purposes. A
                strong relationship with a plumber, carpenter, or plasterer means that when you work
                together on a project, disagreements about sequencing, access, or workmanship are
                handled between colleagues rather than between strangers. These informal
                professional relationships prevent the inter-trade conflicts that are so common on
                construction sites. Strong relationships with <strong>suppliers</strong> &mdash;
                knowing the merchant staff by name, being a reliable and respectful customer &mdash;
                creates advantages that directly affect your business: better pricing, priority
                during shortages, credit terms, and advance notice of product changes. Relationships
                with
                <strong> building control officers</strong>,{' '}
                <strong>competent person scheme assessors</strong>, and{' '}
                <strong>other professionals</strong> create an informal support network that you can
                draw on for advice, referrals, and professional development.
              </p>

              <p>
                Networking is not about collecting business cards or accumulating LinkedIn
                connections. It is about building genuine, mutually beneficial relationships over
                time. The electrician who takes five minutes to chat with the merchant counter
                staff, who recommends a good plumber to a client, who offers advice to a younger
                tradesperson on site, who attends a local trade association meeting occasionally
                &mdash; this electrician is building a professional network that will pay dividends
                throughout their career. When they need a favour, people will help them because they
                have helped others. When a dispute arises with another trade, it is resolved
                informally because there is mutual respect. When work is quiet, referrals flow
                because they have invested in relationships during busy times.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Long-term Value and Reciprocity
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The financial case for investing in professional relationships is overwhelming when
                you consider the <strong>lifetime value</strong> of a trusted client. Consider a
                typical homeowner who has a consumer unit replacement done by an electrician they
                trust. Over the next 20 to 30 years of home ownership, that client is likely to need
                additional sockets and lighting installed during renovations, an outdoor power
                supply for a garden room or workshop, an EV charger installation, periodic
                inspection and testing (every 10 years for owner-occupied properties), emergency
                repairs, and potentially a further rewire when they move house. The cumulative value
                of this repeat work could easily reach &pound;10,000 to &pound;30,000 over the
                lifetime of the relationship.
              </p>

              <p>
                But the value extends far beyond direct repeat business. Trusted clients are your
                most powerful marketing channel. They recommend you to friends, family, neighbours,
                and colleagues without being asked. And the clients who arrive through personal
                referral come with a built-in level of trust that makes the entire working
                relationship smoother from day one &mdash; they are less likely to question your
                prices, less likely to dispute your recommendations, and more likely to pay
                promptly, because someone they trust has already vouched for you. A single strong
                client relationship can generate dozens of referrals over a decade, each of which
                creates its own lifetime value and its own referral potential. This compound effect
                means that the true financial value of a single trusted client relationship is many
                times the direct revenue it generates.
              </p>

              <p>
                Robert Cialdini&rsquo;s research on influence identifies{' '}
                <strong>reciprocity</strong>
                as one of the most powerful drivers of human social behaviour. The principle is
                simple: when someone does something genuinely helpful for you, you feel a natural
                psychological obligation to return the favour. For tradespeople, this principle
                operates constantly and can be harnessed consciously. Recommending a reliable
                plumber to a client creates goodwill with both the client (who appreciates the
                helpful recommendation) and the plumber (who is likely to reciprocate with referrals
                of their own). Going slightly above and beyond on a job &mdash; tightening a loose
                fitting that is not part of the scope, pointing out a potential issue before it
                becomes a problem, leaving the work area exceptionally clean &mdash; creates a
                positive impression that the client remembers and talks about. The key is
                authenticity: the gesture must be genuinely motivated by a desire to help, not by a
                calculated expectation of return. People are remarkably perceptive at distinguishing
                genuine helpfulness from strategic manipulation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Reciprocity: Small Actions That Build Big Goodwill
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Recommend other trusted trades</strong> when the client mentions other
                      work needed &mdash; creates goodwill with both the client and the referred
                      tradesperson
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Flag potential issues early</strong> &mdash; &ldquo;I noticed your
                      smoke alarms are over 10 years old, it might be worth replacing them&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Leave the site exceptionally clean</strong> &mdash; hoovering up dust,
                      wiping down surfaces, removing all packaging and offcuts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Follow up after completion</strong> &mdash; a brief call or text a
                      week later asking if everything is working well
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Share knowledge freely</strong> &mdash; explain what you are doing and
                      why, helping the client understand their own electrical installation
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has explored the long-term strategy of building professional
                relationships as the ultimate conflict prevention tool. The key points to carry
                forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Relationships are the best prevention.</strong> Strong professional
                    relationships reduce conflict frequency, severity, and destructiveness.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The Trust Equation works.</strong> Credibility + Reliability + Intimacy,
                    divided by Self-Orientation. Focus on all four components.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Consistency beats excellence.</strong> Doing what you say, every time,
                    in small things and large, builds trust faster than occasional brilliance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Networking is investment, not socialising.</strong> Relationships with
                    other trades, suppliers, and professionals pay tangible dividends.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Reciprocity compounds.</strong> Genuine helpfulness creates goodwill
                    that is returned many times over across your career.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Lifetime value is massive.</strong> A single trusted client can generate
                    &pound;10,000&ndash;&pound;30,000 in direct work plus dozens of referrals.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will bring
                  everything together into your personal Conflict Resolution Action Plan &mdash;
                  your communication toolkit, prevention checklist, escalation ladder, and the quick
                  wins you can implement this week.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: De-escalation Techniques
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5-section-4">
              Next: Your Action Plan
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
