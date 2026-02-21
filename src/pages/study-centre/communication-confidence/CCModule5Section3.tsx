import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkles,
  HelpCircle,
  Target,
  Users,
  Heart,
  BookOpen,
  Lightbulb,
  Shield,
  Gift,
  ThumbsUp,
  Award,
  Clock,
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
    question:
      'A client is hesitant about upgrading their consumer unit. Which of Cialdini\'s principles would be MOST ethically effective if you show them that "9 out of 10 homeowners on this street have upgraded to a dual-RCD board"?',
    options: ['Reciprocity', 'Social proof', 'Authority', 'Scarcity'],
    correctIndex: 1,
    explanation:
      "This is social proof in action. People are heavily influenced by what others similar to them are doing. Showing that neighbours have made the same decision reduces the perceived risk and uncertainty of the upgrade. This is ethical because the information is true and the recommendation is genuinely in the client's interest.",
  },
  {
    question: 'What is the key difference between framing and anchoring in a persuasion context?',
    options: [
      'They are the same thing with different names',
      'Framing is about how you present information to highlight different aspects; anchoring is about setting a reference point that influences subsequent judgements',
      'Framing only works in writing; anchoring only works in speech',
      'Anchoring is ethical but framing is manipulative',
    ],
    correctIndex: 1,
    explanation:
      'Framing is about how you present information &mdash; emphasising the positive or negative aspects of the same facts to influence perception. Anchoring is about setting a reference point (usually a number) that then influences all subsequent judgements. Both are powerful persuasion tools that can be used ethically in construction contexts.',
  },
  {
    question:
      'An electrician recommends an upgrade that the client does not strictly need but would genuinely improve safety. This is an example of:',
    options: [
      'Manipulative selling that should be avoided',
      'Ethical influence &mdash; using professional expertise to guide a client toward a better outcome',
      'Scarcity &mdash; creating urgency where none exists',
      'Authority bias &mdash; abusing the power imbalance',
    ],
    correctIndex: 1,
    explanation:
      'Recommending a genuine safety improvement is ethical influence at its best. You are using your professional expertise (authority) to guide the client toward a better outcome. The key ethical test is: would you make this same recommendation if it were your own home? If yes, it is ethical influence. If no, it is manipulation.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is influence the same as manipulation?',
    answer:
      'No &mdash; and understanding the distinction is critical. Influence is helping someone make a decision that is genuinely in their interest, using transparent and honest methods. Manipulation is getting someone to make a decision that primarily serves YOUR interest, using deception or psychological pressure. The ethical test is straightforward: would you be comfortable if the client knew exactly what you were doing and why? If yes, it is influence. If no, it is manipulation. A second test: would you make this recommendation if it were your own home or your own family? If yes, it is ethical.',
  },
  {
    question: 'Can I use these techniques with other tradespeople and not just clients?',
    answer:
      'Absolutely. Influence skills are just as valuable when working with other trades, suppliers, and site management. Reciprocity works brilliantly on multi-trade sites &mdash; help the plumber route around your containment and they will return the favour. Social proof helps when proposing new methods &mdash; "the team on Block A tried this approach and it saved them two days." Authority is built through demonstrating consistent competence, not through job titles. These principles apply to every professional relationship in construction.',
  },
  {
    question: 'What if a client accuses me of just trying to upsell them?',
    answer:
      'This is where credibility and trust are essential. First, acknowledge their concern directly: "I understand it might feel that way." Then explain your reasoning transparently, referencing the regulations and the specific risks. Offer them the choice: "You are not obligated to do this, and I will complete the work either way. But I would not be doing my job properly if I did not point out the safety issue." Finally, offer to put it in writing so they can get a second opinion. A professional who is transparent about their reasoning and gives the client genuine choice will almost always be trusted.',
  },
  {
    question: 'How do I build credibility quickly with a new client?',
    answer:
      'Credibility is built through a combination of competence, professionalism, and likeability. Arrive on time and prepared. Show your qualifications when asked (or proactively). Explain what you are doing and why as you work. Reference the relevant regulations naturally, not to show off but to demonstrate that your recommendations are grounded in standards. Be honest about costs and timescales, including any uncertainty. Admit what you do not know rather than bluffing. Follow up on promises. Over time, these behaviours compound into a professional reputation that makes all future influence easier.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which of Cialdini\'s six principles is described as "people feel obligated to return favours and give back to others who have given to them"?',
    options: ['Social proof', 'Authority', 'Reciprocity', 'Commitment and consistency'],
    correctAnswer: 2,
    explanation:
      "Reciprocity is the principle that people feel a strong obligation to return favours, gifts, and concessions. In construction, this means that small acts of helpfulness (lending tools, sharing knowledge, accommodating another trade's schedule) create a social debt that others feel compelled to repay.",
  },
  {
    id: 2,
    question:
      'An electrician tells a homeowner: "Replacing your fuseboard is not mandatory right now, but if you are planning to sell within two years, the buyer\'s surveyor will almost certainly flag it." This uses which principle?',
    options: ['Reciprocity', 'Scarcity', 'Commitment and consistency', 'Authority'],
    correctAnswer: 1,
    explanation:
      'This is scarcity applied ethically. The electrician is highlighting a genuine time-limited opportunity &mdash; doing the work now, while they are already on site, avoids future cost and disruption. The scarcity is real (the opportunity to do it during this visit at lower cost), not manufactured.',
  },
  {
    id: 3,
    question:
      'Framing a safety upgrade as "protecting your family" rather than "meeting regulation 314.1" is an example of:',
    options: [
      'Manipulation &mdash; hiding the real reason behind emotional language',
      "Framing &mdash; presenting the same information in a way that resonates with the client's values",
      'Scarcity &mdash; implying their family is in danger',
      'Authority &mdash; using your expertise to intimidate',
    ],
    correctAnswer: 1,
    explanation:
      "This is framing. The regulation IS about protecting people &mdash; you are simply presenting the same information in language that connects with what the client actually cares about. Clients rarely care about regulation numbers, but they care deeply about their family's safety. This is not deception; it is effective communication.",
  },
  {
    id: 4,
    question: 'The commitment and consistency principle suggests that people who have:',
    options: [
      'Been given a free gift will always buy from you',
      'Made a small commitment are more likely to follow through with a larger related commitment',
      'Seen authority figures will always obey them',
      'Been told something is scarce will always panic-buy',
    ],
    correctAnswer: 1,
    explanation:
      "The commitment and consistency principle states that once people make a commitment (especially publicly or in writing), they feel internal pressure to behave consistently with that commitment. In construction, getting a client to agree to a small initial improvement makes them more likely to agree to further related improvements, because they have already established themselves as someone who invests in their property's safety.",
  },
  {
    id: 5,
    question: 'Which of the following is the MOST ethical application of the authority principle?',
    options: [
      'Wearing a branded uniform to look more professional than you are',
      'Referencing specific BS 7671 regulations to explain why a recommendation is necessary',
      'Telling the client they have no choice but to follow your advice',
      'Using technical jargon to confuse the client into agreeing',
    ],
    correctAnswer: 1,
    explanation:
      'Ethical authority means using your genuine expertise to guide clients toward safe, compliant decisions. Referencing specific regulations demonstrates that your recommendation is grounded in objective standards, not personal opinion. This builds trust and helps the client understand the "why" behind your advice. Using jargon to confuse or claiming they have no choice is manipulation, not influence.',
  },
  {
    id: 6,
    question:
      'An electrician always helps the plumber on multi-trade jobs, and finds the plumber always accommodates their cable routes in return. This demonstrates:',
    options: ['Liking', 'Scarcity', 'Reciprocity', 'Social proof'],
    correctAnswer: 2,
    explanation:
      'This is reciprocity in action between trades. By consistently helping the plumber (giving first), the electrician creates a social obligation that is naturally repaid through cooperation. This is one of the most powerful and practical applications of influence on multi-trade construction sites.',
  },
  {
    id: 7,
    question: 'Anchoring works by:',
    options: [
      'Tying the client to a contract they cannot cancel',
      'Setting an initial reference point that influences all subsequent judgements about value or price',
      'Making the client feel guilty about not accepting the first offer',
      'Presenting multiple options so the client is confused',
    ],
    correctAnswer: 1,
    explanation:
      'Anchoring is a cognitive bias where the first piece of information (the "anchor") disproportionately influences subsequent decisions. In construction pricing, presenting a comprehensive quote first (the anchor) makes a mid-range option seem more reasonable. This is why it is important to present the full-scope option before the reduced-scope alternative.',
  },
  {
    id: 8,
    question: 'The ethical boundary of influence in construction is best described as:',
    options: [
      'Never recommending anything beyond what the client specifically asked for',
      'Using your expertise to guide clients toward genuinely beneficial decisions while being transparent about your reasoning and respecting their right to choose',
      'Always giving the cheapest option to avoid any appearance of upselling',
      'Only making recommendations when regulations force you to',
    ],
    correctAnswer: 1,
    explanation:
      "Ethical influence means using your professional knowledge to help clients make informed decisions that genuinely serve their interests. This includes recommending improvements they did not ask for, as long as the recommendation is honest, the reasoning is transparent, and the client's right to decline is respected. Failing to recommend a genuine safety improvement because you are afraid of seeming pushy is a failure of professional duty.",
  },
];

export default function CCModule5Section3() {
  useSEO({
    title: 'Influence & Persuasion | Communication & Confidence Module 5.3',
    description:
      "Cialdini's six principles of influence ethically applied in construction, building credibility, framing and anchoring, upselling safety improvements, and convincing clients on regulations.",
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
            <Sparkles className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Influence &amp; Persuasion
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding and ethically applying the science of influence in construction &mdash;
            from client conversations to multi-trade collaboration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Six principles:</strong> Cialdini identified six universal principles of
                ethical influence
              </li>
              <li>
                <strong>Credibility:</strong> Influence without authority starts with trust and
                competence
              </li>
              <li>
                <strong>Framing:</strong> How you present information matters as much as the
                information itself
              </li>
              <li>
                <strong>Ethics first:</strong> Influence is helping clients decide well;
                manipulation is serving yourself
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety outcomes:</strong> Persuading clients to accept safety upgrades saves
                lives
              </li>
              <li>
                <strong>Professional duty:</strong> Electricians have an obligation to recommend
                best practice
              </li>
              <li>
                <strong>Business growth:</strong> Ethical influence builds repeat business and
                referrals
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain Cialdini's six principles of influence and their ethical application in construction",
              'Build professional credibility that supports influence without formal authority',
              'Use framing and anchoring to present recommendations effectively',
              'Apply influence principles to upsell genuine safety improvements ethically',
              'Convince clients on regulatory requirements without being confrontational',
              'Distinguish clearly between ethical influence and manipulation',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Cialdini's Six Principles of Influence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Cialdini&rsquo;s Six Principles of Influence
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1984, Professor Robert Cialdini published{' '}
                <em>Influence: The Psychology of Persuasion</em>, one of the most important books
                ever written on human decision-making. Based on years of research &mdash; including
                undercover work in sales organisations, fundraising operations, and recruitment
                firms &mdash; Cialdini identified six universal principles that drive human
                compliance. These principles work because they are rooted in evolutionary
                psychology: they are mental shortcuts that help us navigate a complex world.
              </p>

              <p>
                For electricians and construction professionals, understanding these principles is
                not about manipulation. It is about communicating more effectively, presenting
                recommendations in ways that resonate with clients, and fulfilling your professional
                duty to guide people toward safe, compliant decisions. Every principle below
                includes an ethical construction application.
              </p>

              {/* Cialdini's 6 Principles Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* 1. Reciprocity */}
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <Gift className="h-4 w-4 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Reciprocity</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People feel obligated to return favours and give back to those who have given to
                    them. When someone does something for us, we feel a powerful urge to repay the
                    debt.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Ethical construction use:</strong> On a
                      multi-trade site, help the plumber route around your containment. Lend tools
                      when another trade is short. Share useful information freely. These small
                      investments create goodwill that is naturally returned when you need
                      cooperation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Client example:</strong> Provide a free,
                      honest assessment of the overall electrical condition during a callout.
                      Clients who receive genuine value for free are far more likely to accept your
                      recommendations and hire you for future work.
                    </p>
                  </div>
                </div>

                {/* 2. Commitment & Consistency */}
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <Shield className="h-4 w-4 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Commitment &amp; Consistency
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Once people make a commitment &mdash; especially publicly or in writing &mdash;
                    they feel strong internal pressure to behave consistently with that commitment.
                    We want to be seen as people who keep our word.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Ethical construction use:</strong> During
                      the initial consultation, ask the client what their priorities are: &ldquo;Is
                      safety the most important thing to you?&rdquo; Once they say yes, your safety
                      recommendations align with their own stated values, making them easier to
                      accept.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Client example:</strong> Get agreement on a
                      small improvement first (e.g. replacing a damaged socket). This establishes
                      the client as someone who invests in their property, making them more
                      receptive to larger recommendations.
                    </p>
                  </div>
                </div>

                {/* 3. Social Proof */}
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <Users className="h-4 w-4 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Social Proof</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People look to what others are doing to determine the correct course of action,
                    especially in situations of uncertainty. We assume that if many people are doing
                    something, it must be right.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Ethical construction use:</strong>{' '}
                      &ldquo;Most homeowners in properties of this age are upgrading their consumer
                      units to modern split-load boards with RCBOs.&rdquo; This is social proof
                      &mdash; showing the client that their peers are making the same decision
                      reduces uncertainty.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Client example:</strong> Share genuine
                      testimonials or reviews. &ldquo;The last three customers I did this upgrade
                      for said they wished they had done it sooner.&rdquo; Only use this if it is
                      true.
                    </p>
                  </div>
                </div>

                {/* 4. Authority */}
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <Award className="h-4 w-4 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Authority</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People are more likely to comply with requests from perceived experts and
                    authority figures. We defer to those who demonstrate knowledge, credentials, and
                    experience.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Ethical construction use:</strong> Reference
                      specific regulations when making recommendations: &ldquo;BS 7671 requires RCD
                      protection for all socket-outlet circuits.&rdquo; This grounds your advice in
                      objective standards, not personal opinion.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Client example:</strong> Display your
                      qualifications naturally. Mention your registration body. Explain things
                      clearly and knowledgeably. Authority is earned through demonstrated
                      competence, not through claiming superiority.
                    </p>
                  </div>
                </div>

                {/* 5. Liking */}
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <ThumbsUp className="h-4 w-4 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Liking</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People are more easily influenced by those they like. Factors that increase
                    liking include physical attractiveness, similarity, compliments, cooperation,
                    and familiarity.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Ethical construction use:</strong> Build
                      genuine rapport with clients and colleagues. Show interest in their
                      priorities. Find common ground. Be friendly, professional, and approachable.
                      People who like and trust you are far more receptive to your recommendations.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Client example:</strong> Take time to
                      understand the client&rsquo;s situation and priorities before making
                      recommendations. &ldquo;I can see you have put a lot of work into this kitchen
                      &mdash; let us make sure the electrics match the quality of the rest of the
                      room.&rdquo;
                    </p>
                  </div>
                </div>

                {/* 6. Scarcity */}
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <Clock className="h-4 w-4 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Scarcity</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People value things more when they are rare or when availability is limited. The
                    fear of missing out is a powerful motivator. Opportunities seem more valuable
                    when they are about to disappear.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded mb-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Ethical construction use:</strong> Highlight
                      genuine scarcity: &ldquo;While I have the floorboards up and the first fix
                      exposed, it would be much cheaper to upgrade the cabling now than to come back
                      and lift the floors again later.&rdquo; The scarcity is real &mdash; the
                      access opportunity is genuinely time-limited.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Client example:</strong> &ldquo;I have
                      availability next week, but after that I am booked up for six weeks.&rdquo;
                      Only use this if it is true &mdash; manufacturing false urgency destroys
                      trust.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Ethical Boundary:</strong> Cialdini himself
                  emphasises that these principles should be used ethically. The difference between
                  influence and manipulation is intent and transparency. Influence means using these
                  principles to help people make decisions that are{' '}
                  <strong>genuinely in their interest</strong>. Manipulation means using them to
                  serve your own interest at the other person&rsquo;s expense. Always ask: would I
                  make this recommendation if it were my own home?
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Building Credibility — Influence Without Authority */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Building Credibility &mdash; Influence Without Authority
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Credibility is the foundation of all influence. Without it, none of Cialdini&rsquo;s
                principles work reliably. Credibility is not about having the loudest voice or the
                most impressive job title &mdash; it is about being consistently competent, honest,
                and trustworthy over time.
              </p>

              <p>
                In construction, you frequently need to influence people who do not report to you:
                clients, other trades, site managers, building inspectors, and suppliers. This is{' '}
                <strong>influence without authority</strong> &mdash; the ability to shape decisions
                and outcomes through credibility, expertise, and relationship rather than through
                formal power.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Four Pillars of Professional Credibility
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      1. Competence &mdash; &ldquo;They know what they are doing&rdquo;
                    </p>
                    <p className="text-sm text-white">
                      Demonstrate technical knowledge naturally during conversations. Reference
                      regulations accurately. Explain your reasoning. Show that your recommendations
                      are grounded in expertise, not guesswork. Competence is the bedrock &mdash;
                      without it, nothing else matters.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      2. Reliability &mdash; &ldquo;They do what they say&rdquo;
                    </p>
                    <p className="text-sm text-white">
                      Arrive when you say you will. Finish when you say you will. Follow up on
                      promises. Return calls. Every promise kept is a deposit in your credibility
                      account. Every broken promise is a significant withdrawal. In construction,
                      reliability is often valued more than brilliance.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      3. Honesty &mdash; &ldquo;They tell me the truth&rdquo;
                    </p>
                    <p className="text-sm text-white">
                      Be transparent about costs, timescales, and limitations. Admit what you do not
                      know. If a job is going to cost more or take longer than expected, say so
                      early. Clients and colleagues can forgive mistakes; they rarely forgive
                      dishonesty.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      4. Goodwill &mdash; &ldquo;They have my interests at heart&rdquo;
                    </p>
                    <p className="text-sm text-white">
                      Show genuine concern for the client&rsquo;s or colleague&rsquo;s wellbeing.
                      Sometimes this means recommending against work that would benefit you
                      financially: &ldquo;Honestly, your current board is fine for another five
                      years. I would not recommend replacing it yet.&rdquo; This kind of honesty
                      builds immense trust and future business.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> Credibility compounds over
                  time like interest. Every interaction either adds to or subtracts from your
                  credibility account. A single act of dishonesty or incompetence can wipe out years
                  of accumulated trust. Conversely, consistent professionalism builds a reputation
                  that precedes you &mdash; clients recommend you, colleagues trust your judgement,
                  and your influence grows without you needing to push.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Influence Without Authority &mdash; Practical Examples
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Influencing another trade:</strong> Rather than complaining to the
                      site manager that the plasterer has boarded over your back boxes, approach the
                      plasterer directly: &ldquo;I know it is easier to board straight through, but
                      if we mark the box positions first, it saves both of us time &mdash; you will
                      not need to re-do the board and I will not need to cut through it.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Influencing a site manager:</strong> &ldquo;I have checked the
                      programme and I think we could save two days if we re-sequence the second fix
                      on floors three and four. I have done this on similar projects and it works
                      well. Want me to sketch out the revised sequence?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Influencing a reluctant client:</strong> &ldquo;I completely
                      understand the concern about cost. Let me show you what the upgrade involves,
                      what it protects against, and then you can make an informed decision. There is
                      no pressure either way.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Framing and Anchoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Framing and Anchoring
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Two of the most powerful persuasion techniques available to construction
                professionals are <strong>framing</strong> and <strong>anchoring</strong>. Both are
                well-established in behavioural psychology and, when used ethically, they help
                clients understand the true value of your recommendations.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Framing</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Framing is the principle that <strong>how</strong> you present information
                    significantly affects how it is perceived. The same facts, presented
                    differently, lead to different decisions. This is not deception &mdash; it is
                    choosing which aspect of the truth to emphasise.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Regulation frame:</strong> &ldquo;Your
                        installation does not comply with Regulation 411.3.3.&rdquo;
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-green-400">Safety frame:</strong> &ldquo;Without
                        this upgrade, if a fault develops on a socket circuit, there is nothing to
                        protect your family from electric shock.&rdquo;
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Same information</strong>, different
                        emphasis. The safety frame connects with what the client actually cares
                        about. Both statements are true.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Anchoring</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Anchoring is the cognitive bias where the{' '}
                    <strong>first piece of information</strong> (the &ldquo;anchor&rdquo;)
                    disproportionately influences all subsequent judgements. The anchor sets a
                    reference point against which everything else is compared.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Without anchor:</strong> &ldquo;The
                        consumer unit upgrade will cost &pound;850.&rdquo; Client thinks: is that a
                        lot?
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-green-400">With anchor:</strong> &ldquo;A full
                        rewire of this property would cost around &pound;4,500. However, since your
                        wiring is actually in decent condition, you only need the consumer unit
                        upgraded, which is &pound;850.&rdquo;
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">The &pound;4,500 anchor</strong> makes
                        &pound;850 feel much more reasonable. Both numbers are honest.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Framing Techniques for Construction Professionals
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Loss vs Gain Framing</p>
                    <p className="text-sm text-white">
                      Research shows that people are more motivated by the fear of losing something
                      than by the prospect of gaining something (loss aversion). &ldquo;Without RCD
                      protection, a fault could put your family at risk&rdquo; (loss frame) is more
                      motivating than &ldquo;RCD protection would make your home safer&rdquo; (gain
                      frame). Both are true, but the loss frame is psychologically more compelling.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Cost-Per-Day Framing</p>
                    <p className="text-sm text-white">
                      An &pound;850 consumer unit upgrade sounds expensive. But framed as
                      &ldquo;that is less than &pound;2.50 per day over a year, and it protects your
                      family for the next 20 years&rdquo;, the same cost feels trivial. This is
                      ethical because both frames are true &mdash; you are simply choosing the one
                      that helps the client see the value clearly.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Comparison Framing</p>
                    <p className="text-sm text-white">
                      &ldquo;The cost of the upgrade is about the same as a family meal out once a
                      month for a year. For that, you get 20 years of protection.&rdquo; Comparing
                      the cost to something the client already spends money on without thinking
                      twice makes the investment seem proportionate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Ethical Rule:</strong> Framing and anchoring are
                  ethical when <strong>both the frame and the anchor are truthful</strong>. The
                  safety frame is true &mdash; the regulation does protect people. The cost anchor
                  is true &mdash; a full rewire would cost that amount. The moment you use a false
                  anchor (&ldquo;normally this would cost &pound;2,000 but I will do it for
                  &pound;850&rdquo; when it was always &pound;850) or a misleading frame
                  (&ldquo;your house could burn down&rdquo; when the risk is minimal), you have
                  crossed into manipulation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Upselling Safety Improvements & Convincing on Regulations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Upselling Safety Improvements &amp; Convincing Clients on Regulations
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common challenges for electricians is convincing a client to accept
                a safety upgrade they did not ask for and may not want to pay for. This is not about
                upselling for profit &mdash; it is about fulfilling your professional duty to
                recommend best practice. Cialdini&rsquo;s principles, combined with framing and
                anchoring, provide a powerful ethical toolkit for this situation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Ethical Upsell Framework</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Step 1: Establish the Client&rsquo;s Priorities (Commitment)
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;Before I start, can I ask what is most important to you &mdash; is it
                      keeping costs down, or making sure the electrics are as safe as
                      possible?&rdquo; Most clients say safety. This establishes a commitment you
                      can reference later.
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Step 2: Explain What You Found (Authority)
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;While I was working on the job you called me for, I noticed that your
                      consumer unit does not have RCD protection on the socket circuits. Under
                      current regulations, all new installations require this. Your existing
                      installation is technically not required to be upgraded, but I want to make
                      you aware of the risk.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Step 3: Frame the Risk (Safety Frame)
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;Without RCD protection, if a fault develops on any of your socket
                      circuits &mdash; for example from a damaged appliance cable &mdash; there is
                      nothing to cut the power quickly enough to prevent a serious electric shock.
                      RCDs are designed to trip in under 0.04 seconds, which is fast enough to
                      prevent fatal injury.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Step 4: Provide Options with Anchoring
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;I can offer you three options. Option one is a full consumer unit
                      replacement with RCBO protection on every circuit &mdash; that is around
                      &pound;950. Option two is adding a stand-alone RCD to the existing board for
                      around &pound;350. Option three is to leave it as it is, which costs nothing
                      now but leaves the risk in place.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Step 5: Reference Their Commitment (Consistency)
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;You mentioned safety is your priority, so I wanted to make sure you had
                      the full picture before making a decision. There is no pressure &mdash; I am
                      happy to complete the original job either way.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Convincing Clients on Regulatory Requirements
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  When regulations require specific work and the client pushes back, combine
                  authority with empathy:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Acknowledge their frustration:</strong> &ldquo;I completely understand
                      this was not in the budget and it is frustrating.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Explain the obligation clearly:</strong> &ldquo;As a registered
                      electrician, I am required to comply with BS 7671. If I certify this
                      installation without the required protection, I am personally liable and I
                      risk losing my registration.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Translate regulation to benefit:</strong> &ldquo;The regulation exists
                      because without RCD protection, people have been seriously injured and killed.
                      This is not bureaucracy for the sake of it &mdash; it genuinely saves
                      lives.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Offer alternatives where possible:</strong> &ldquo;I cannot skip the
                      requirement, but I can look at the most cost-effective way to achieve
                      compliance. Let me see what options are available.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The key to all of these conversations is{' '}
                <strong>respecting the client&rsquo;s autonomy</strong>. You are not there to force
                anyone into anything. You are there to ensure they have the information they need to
                make an informed decision. Present the facts, explain the risks, offer options, and
                let them choose. If you have been clear and honest, you have fulfilled your
                professional duty regardless of what they decide.
              </p>
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
                Influence is not a dark art &mdash; it is a professional skill. Electricians who
                understand how people make decisions can communicate more effectively, guide clients
                toward safer outcomes, and build stronger professional relationships across the
                construction industry.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cialdini&rsquo;s six principles:</strong> Reciprocity, commitment and
                      consistency, social proof, authority, liking, and scarcity &mdash; all have
                      ethical construction applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Credibility is the foundation:</strong> Competence, reliability,
                      honesty, and goodwill compound over time to create influence that does not
                      require pushing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Framing and anchoring:</strong> How you present information matters as
                      much as the information itself. Use safety frames and honest anchors to help
                      clients see value clearly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Ethical boundary:</strong> Influence helps people make decisions in
                      their own interest. Manipulation serves your interest at their expense. The
                      test: would you make this recommendation for your own home?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Professional duty:</strong> Recommending genuine safety improvements
                      is not upselling &mdash; it is fulfilling your obligation as a qualified
                      electrician. Failing to recommend a known improvement is a failure of duty.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, you will learn how to handle difficult conversations &mdash;
                delivering bad news, managing confrontation, having the money conversation, and
                de-escalating tense situations on site and with clients.
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
            <Link to="../cc-module-5-section-4">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
