import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Users,
  Heart,
  MessageSquare,
  Award,
  GraduationCap,
  BookOpen,
  Shield,
  Handshake,
  Target,
  Brain,
  ClipboardCheck,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Workplace Culture', href: '/guides/apprentice-workplace-culture' },
];

const tocItems = [
  { id: 'fitting-in-on-site', label: 'Fitting In on Site' },
  { id: 'professional-behaviour', label: 'Professional Behaviour' },
  { id: 'communication-on-site', label: 'Communication on Site' },
  { id: 'dealing-with-bullying', label: 'Dealing with Bullying and Harassment' },
  { id: 'mentoring-relationships', label: 'Mentoring Relationships' },
  { id: 'site-hierarchy', label: 'Understanding the Site Hierarchy' },
  { id: 'being-part-of-a-team', label: 'Being Part of a Team' },
  { id: 'elecmate-support', label: 'Support from Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Fitting in on a construction site takes time. Nobody expects you to feel at home on your first day. Be punctual, be willing, be polite, and let your work ethic speak for itself. Relationships build naturally over weeks and months.',
  'Professional behaviour means more than doing your job well. It includes how you communicate, how you respond to feedback, how you treat colleagues, how you manage your time, and how you present yourself on site.',
  'Bullying and harassment have no place on any construction site. If you experience or witness bullying, you have the right to report it without fear of retaliation. Your employer, training provider, and bodies like ACAS and the HSE can all help.',
  'A good mentor accelerates your development dramatically. Seek out experienced electricians who are willing to teach, ask thoughtful questions, and show genuine interest in learning. The best mentoring relationships develop naturally from mutual respect.',
  'Elec-Mate supports your professional development with site diary tracking, mental health resources, professional development courses, and a community of apprentices going through the same experience.',
];

const faqs = [
  {
    question: 'How do I deal with banter and teasing on site?',
    answer:
      'Construction sites have a strong banter culture. Some of it is genuinely friendly and inclusive — experienced workers testing whether you can take a joke and fit in with the team. Some of it crosses the line into bullying. The distinction is important. Friendly banter is inclusive, reciprocal, and stops when someone is uncomfortable. Bullying is persistent, targeted, humiliating, or based on protected characteristics (race, gender, sexuality, disability, religion). If the banter feels hostile, demeaning, or makes you dread going to work, it has crossed the line. You do not have to tolerate it. Speak to your supervisor, your employer, or your training provider. If you are unsure whether something crosses the line, trust your feelings — if it makes you uncomfortable, it is worth raising.',
  },
  {
    question: 'What should I do if my supervisor is difficult to work with?',
    answer:
      'Not every working relationship will be easy. Some supervisors have different communication styles, higher expectations, or less patience than others. Before assuming the relationship is broken, try to adapt your approach. Ask direct questions about what they expect. Show initiative without overstepping. Be reliable and consistent. If you are genuinely struggling — if the supervisor is dismissive, aggressive, or providing inadequate supervision — speak to your employer or training provider. A good employer will recognise that apprentice supervision requires patience and skill, and will either support the supervisor to improve or reassign you to someone more suitable. You should not have to endure a hostile working relationship.',
  },
  {
    question: 'How important is timekeeping on a construction site?',
    answer:
      'Timekeeping is one of the most important professional habits you can develop. On construction sites, work starts at a fixed time — typically 7:30 or 8:00am — and late arrival disrupts the entire team. Your supervisor may need you to assist with a task first thing. Other trades may be waiting for electrical work to be completed before they can proceed. Consistent lateness will damage your reputation faster than almost anything else. Set two alarms. Plan your travel route with contingency time. If you are going to be late due to circumstances beyond your control (transport breakdown, illness), call your supervisor before your start time. One phone call saying "I will be 15 minutes late because my train is delayed" is infinitely better than arriving late with no warning.',
  },
  {
    question: 'Can I use my phone on site?',
    answer:
      'Phone use policies vary between sites and employers. Most construction sites prohibit personal phone use during working hours for safety reasons — distraction on a construction site can cause serious accidents. Some sites allow phone use during breaks only. Your employer may have a specific policy. As a general rule, keep your phone in your pocket or bag during working hours and only use it during designated breaks. If you need to use your phone for work purposes — checking technical information on Elec-Mate, photographing your work for your site diary, or looking up a regulation — tell your supervisor what you are doing so they know it is work-related, not personal scrolling.',
  },
  {
    question: 'How do I ask for more responsibility as an apprentice?',
    answer:
      'The best way to earn more responsibility is to demonstrate competence and reliability in your current tasks. Complete every task to a high standard, without needing to be reminded or chased. Show initiative — anticipate what needs to be done next. Ask questions that show you are thinking about the bigger picture, not just following instructions mechanically. When your supervisor trusts your reliability, they will naturally give you more complex tasks. If you feel ready for more responsibility but it is not being offered, have a direct conversation: "I feel confident with the tasks I am doing. Is there something more challenging I could try, with your supervision?" This shows ambition without arrogance.',
  },
  {
    question: 'What if I do not get on with the other apprentices?',
    answer:
      'You do not have to be best friends with every apprentice on your course or on your site. Professional relationships are about mutual respect, cooperation, and effective communication — not personal friendship. Focus on being reliable, helpful, and polite. If there is genuine conflict, address it directly and calmly, or ask your supervisor or training provider to mediate. Do not engage in gossip, cliques, or exclusion — these behaviours are unprofessional and counterproductive. Remember that you are all going through the same experience, and the apprentices you work with now may be colleagues, clients, or business contacts throughout your career.',
  },
  {
    question: 'How do I handle criticism of my work?',
    answer:
      'Criticism of your work is not criticism of you as a person. When a qualified electrician points out a mistake in your termination, cable routing, or installation, they are teaching you — not attacking you. The correct response is to listen, understand what went wrong, ask how to do it correctly, and apply the correction. Say "thank you" — because someone took the time to help you improve. If the criticism feels personal, aggressive, or public, that is a different matter and should be raised with your employer. But constructive feedback — even if it stings in the moment — is the mechanism by which you develop from a novice into a competent electrician.',
  },
];

const relatedPages = [
  {
    href: '/guides/apprentice-mental-health',
    title: 'Apprentice Mental Health',
    description:
      'Supporting your mental health through the pressures of an electrical apprenticeship.',
    icon: Heart,
    category: 'Guide' as const,
  },
  {
    href: '/guides/apprentice-rights-pay',
    title: 'Apprentice Rights and Pay',
    description:
      'Your legal rights as an apprentice including pay, hours, holiday, and workplace protections.',
    icon: Shield,
    category: 'Guide' as const,
  },
  {
    href: '/guides/apprentice-professional-development',
    title: 'Professional Development',
    description:
      'CPD, portfolio building, networking, and career planning from your apprenticeship onwards.',
    icon: Award,
    category: 'Guide' as const,
  },
  {
    href: '/guides/what-to-expect-as-apprentice',
    title: 'What to Expect as an Apprentice',
    description: 'Complete overview of the apprenticeship experience from induction to EPA.',
    icon: Target,
    category: 'Guide' as const,
  },
  {
    href: '/guides/year-1-apprentice-guide',
    title: 'Year 1 Apprentice Guide',
    description: 'Everything you need to know about your first year as an electrical apprentice.',
    icon: GraduationCap,
    category: 'Guide' as const,
  },
  {
    href: '/guides/site-diary-for-apprentices',
    title: 'Site Diary for Apprentices',
    description: 'How to keep an effective daily log from your very first day.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
];

const sections = [
  {
    id: 'fitting-in-on-site',
    heading: 'Fitting In on a Construction Site',
    content: (
      <>
        <p>
          Walking onto a construction site for the first time as an apprentice is intimidating.
          Everyone seems to know what they are doing. Everyone seems to know each other. The
          language is unfamiliar, the pace is fast, and you feel like the least experienced person
          in the room — because you are. This is completely normal, and every qualified electrician
          you see on that site once stood exactly where you are standing now.
        </p>
        <p>
          <strong>First impressions matter, but they are not everything:</strong> Arrive on time
          (ideally early), dress appropriately (clean workwear, correct PPE), and introduce
          yourself. A simple "Morning, I am [name], I am the new apprentice" is all you need. You do
          not need to be the loudest person on site or the funniest. You need to be present,
          willing, and attentive.
        </p>
        <p>
          <strong>Observe before you speak:</strong> Every site has its own rhythm, its own
          unwritten rules, and its own social dynamics. Spend your first few days observing how
          things work. Where do people have their breaks? What is the start and finish routine? How
          do the different trades interact? Who is in charge of what? Understanding the site culture
          before trying to participate in it prevents awkward missteps.
        </p>
        <p>
          <strong>Be useful:</strong> You cannot contribute expert electrical knowledge yet, but you
          can contribute willingness and effort. Carry materials, tidy workspaces, hold cables, pass
          tools, and sweep up. These tasks are not beneath you — they are how you demonstrate that
          you are part of the team. The apprentices who complain about carrying cables and making
          tea are the ones who take longest to earn trust and responsibility.
        </p>
        <p>
          <strong>Relationships build over time:</strong> You will not be best friends with everyone
          by the end of week one. Professional relationships on site develop through shared
          experience, demonstrated reliability, and mutual respect. Give it time. The electrician
          who seems distant in week one may become your best mentor by month three — once they have
          seen that you are serious about learning and willing to put in the work.
        </p>
        <p>
          Your <SEOInternalLink href="/guides/year-1-apprentice-guide">first year</SEOInternalLink>{' '}
          is fundamentally about building these relationships and demonstrating that you belong.
        </p>
      </>
    ),
  },
  {
    id: 'professional-behaviour',
    heading: 'Professional Behaviour on Site',
    content: (
      <>
        <p>
          Professional behaviour is the foundation of your reputation. In the electrical trade, your
          reputation follows you — electricians talk to each other, employers check references, and
          the industry is smaller than you think. How you conduct yourself as an apprentice shapes
          how you are perceived for years to come.
        </p>
        <p>
          <strong>Reliability:</strong> Turn up every day, on time, ready to work. This sounds
          basic, but it is the single most common complaint employers have about apprentices. If you
          are ill, call before your start time. If you have a genuine reason you cannot attend,
          communicate it clearly. Unexplained absences and habitual lateness destroy trust faster
          than anything else.
        </p>
        <p>
          <strong>Appearance:</strong> Wear clean, appropriate workwear. Your clothes do not need to
          be new or expensive, but they should be clean at the start of each day, in reasonable
          condition, and appropriate for the environment. Branded workwear from your employer should
          be worn with pride — it represents the company that is investing in your training.
        </p>
        <p>
          <strong>Language:</strong> Construction sites can be colourful in their language. Swearing
          is common on many sites, and you may find yourself adopting the language of those around
          you. Be aware of context — language that is acceptable in the tea hut may not be
          acceptable when clients, visitors, or members of the public are present. Discriminatory
          language, slurs, or aggressive verbal behaviour is never acceptable.
        </p>
        <p>
          <strong>Taking ownership of mistakes:</strong> When you make a mistake — and you will,
          because every apprentice does — own it immediately. Tell your supervisor, explain what
          happened, and ask how to correct it. Do not hide mistakes, do not blame others, and do not
          make excuses. Honesty about errors earns respect. Dishonesty about errors destroys it. For
          more on managing your early career, see our{' '}
          <SEOInternalLink href="/guides/what-to-expect-as-apprentice">
            guide to what to expect
          </SEOInternalLink>
          .
        </p>
        <p>
          <strong>Respecting other trades:</strong> On a construction site, you work alongside
          plumbers, carpenters, plasterers, bricklayers, and many other trades. Each trade has its
          own skills, its own pressures, and its own challenges. Treat every tradesperson with the
          same respect you want to receive. Do not obstruct their work, do not damage their
          installations, and communicate clearly when your work affects theirs.
        </p>
      </>
    ),
  },
  {
    id: 'communication-on-site',
    heading: 'Communication Skills for Apprentices',
    content: (
      <>
        <p>
          Effective communication is a professional skill that many apprentices underestimate. On a
          construction site, clear communication prevents errors, avoids conflicts, improves safety,
          and builds stronger working relationships. Poor communication causes misunderstandings,
          wasted time, rework, and — in the worst cases — dangerous situations.
        </p>
        <p>
          <strong>Asking questions:</strong> This is the most important communication skill for an
          apprentice. Ask when you do not understand an instruction. Ask when you are unsure about a
          procedure. Ask when you want to understand why something is done a particular way. "Why do
          we use a 6mm cable here instead of 4mm?" is a question that shows you are thinking.
          Experienced electricians generally enjoy explaining their trade to apprentices who are
          genuinely interested.
        </p>
        <p>
          <strong>Confirming instructions:</strong> When you receive an instruction, repeat it back
          to confirm you have understood. "So you want me to run the 2.5mm twin-and-earth from the
          consumer unit to the kitchen sockets, clipped to the joists at 300mm centres?" This takes
          three seconds and eliminates the possibility of doing the wrong thing for thirty minutes.
        </p>
        <p>
          <strong>Reporting problems:</strong> When something goes wrong — a mistake, a damaged
          cable, a missing material — report it immediately. The longer you wait, the worse it gets.
          Tell your supervisor directly, clearly, and factually. "I have drilled through a cable in
          the first-floor bedroom" is better than trying to fix it yourself or hoping nobody
          notices. Your{' '}
          <SEOInternalLink href="/guides/apprentice-safety-cases">safety training</SEOInternalLink>{' '}
          reinforces the importance of immediate reporting.
        </p>
        <p>
          <strong>Listening actively:</strong> When someone is explaining something to you, give
          them your full attention. Put down your tools, make eye contact, and listen without
          interrupting. If you do not understand, say so. If you need them to repeat something, ask.
          Taking notes is not a sign of weakness — it is a sign of professionalism.
        </p>
        <p>
          <strong>Written communication:</strong> Your{' '}
          <SEOInternalLink href="/guides/site-diary-for-apprentices">site diary</SEOInternalLink>,
          training records, and portfolio all require clear written communication. Practise writing
          concise, accurate descriptions of your daily work, the skills you are developing, and the
          knowledge you are gaining. This skill becomes increasingly important as you progress —
          qualified electricians write reports, certificates, quotations, and method statements.
        </p>
        <SEOAppBridge
          title="Record Your Professional Development Daily"
          description="Elec-Mate's site diary helps you record daily learning, track skills across 8 categories, and build portfolio evidence. The AI coach provides insights on your progress. Start building your professional record from day one."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'dealing-with-bullying',
    heading: 'Dealing with Bullying and Harassment',
    content: (
      <>
        <p>
          Bullying and harassment have no place in any workplace, including construction sites.
          While the industry has made significant progress in recent years, bullying remains a
          problem that disproportionately affects apprentices — who may feel vulnerable due to their
          junior position, their dependence on their employer for their training, and their desire
          to fit in.
        </p>
        <p>
          <strong>What constitutes bullying:</strong> Bullying is repeated behaviour that is
          intended to intimidate, degrade, humiliate, or undermine an individual. It includes
          persistent verbal abuse or shouting, deliberate exclusion from the team or from learning
          opportunities, setting unreasonable tasks or impossible deadlines, withholding information
          or training, taking credit for your work, public humiliation, threats or intimidation, and
          damaging or hiding your tools. A single incident can also constitute harassment,
          particularly if it relates to a protected characteristic (race, sex, sexual orientation,
          disability, religion, age, gender reassignment, marriage/civil partnership, or
          pregnancy/maternity).
        </p>
        <p>
          <strong>What to do if you are being bullied:</strong> First, recognise that it is not your
          fault. Bullying reflects the bully's behaviour, not your worth. Keep a written record of
          incidents — dates, times, what was said or done, and any witnesses. Tell someone you trust
          — a colleague, your supervisor (if they are not the bully), your employer's HR department,
          or your training provider. If internal reporting does not resolve the issue, contact ACAS
          (the Advisory, Conciliation and Arbitration Service) for free, confidential advice on 0300
          123 1100.
        </p>
        <p>
          <strong>Your legal protections:</strong> The{' '}
          <SEOInternalLink href="/guides/apprentice-rights-pay">Equality Act 2010</SEOInternalLink>{' '}
          protects you from harassment and discrimination based on protected characteristics. The
          Health and Safety at Work Act 1974 requires your employer to provide a safe working
          environment, which includes protection from bullying. Your employer has a legal duty to
          investigate complaints and take appropriate action. You cannot be dismissed or
          disadvantaged for raising a genuine complaint about bullying or harassment.
        </p>
        <p>
          <strong>Supporting others:</strong> If you witness a colleague being bullied, you have a
          responsibility to act. This does not mean confronting the bully directly — it means
          supporting the victim, offering to be a witness, and reporting what you have seen to
          someone in authority. Bystander silence enables bullying to continue. Your{' '}
          <SEOInternalLink href="/guides/apprentice-mental-health">mental health</SEOInternalLink>{' '}
          can also be affected by witnessing bullying, even if you are not the direct target.
        </p>
        <p>
          <strong>The role of employers:</strong> Good employers have clear anti-bullying policies,
          provide training on appropriate behaviour, investigate complaints promptly and thoroughly,
          and take disciplinary action against bullies. If your employer does not have these
          structures in place, raise it with your training provider — they have a vested interest in
          ensuring your workplace is safe and supportive.
        </p>
      </>
    ),
  },
  {
    id: 'mentoring-relationships',
    heading: 'Mentoring Relationships',
    content: (
      <>
        <p>
          The relationship between an apprentice and their mentor (or supervising electrician) is
          one of the most important factors in the quality of your apprenticeship. A good mentor
          does not just supervise your work — they teach, challenge, support, and guide your
          development. A poor mentoring relationship can make the apprenticeship feel isolating and
          frustrating.
        </p>
        <p>
          <strong>What makes a good mentor:</strong> A good mentor is patient — they explain things
          clearly and do not make you feel stupid for asking questions. They are generous with their
          knowledge — they share tips, techniques, and insights that go beyond the textbook. They
          give you increasing responsibility as you demonstrate competence. They provide honest
          feedback — telling you when you have done well and when you need to improve. They treat
          you with respect, even when correcting your mistakes.
        </p>
        <p>
          <strong>What makes a good mentee:</strong> You can influence the quality of your mentoring
          relationship through your own behaviour. Be eager to learn — ask questions, take notes,
          and show genuine interest. Be reliable — turn up on time, complete tasks to the best of
          your ability, and follow instructions. Be receptive to feedback — listen, learn, and apply
          corrections without defensiveness. Be proactive — anticipate needs, look for learning
          opportunities, and show initiative. The more you put into the relationship, the more your
          mentor will invest in teaching you.
        </p>
        <p>
          <strong>Finding informal mentors:</strong> Your formally assigned supervisor is not your
          only source of mentoring. On any site, there are experienced electricians, other trade
          professionals, project managers, and site supervisors who can teach you valuable lessons.
          Build relationships across the site. Ask questions of different people. Watch how
          different electricians approach the same task. Each person you learn from adds to your
          knowledge and broadens your perspective.
        </p>
        <p>
          <strong>When the relationship is not working:</strong> If your assigned mentor is
          unsupportive, dismissive, or providing inadequate supervision, speak to your employer or
          training provider. You deserve quality mentoring — it is a fundamental part of the
          apprenticeship that your employer has committed to providing. A change of supervisor is
          sometimes necessary and is not a reflection of failure on your part. Your{' '}
          <SEOInternalLink href="/guides/apprentice-professional-development">
            professional development
          </SEOInternalLink>{' '}
          depends on receiving proper guidance throughout your training.
        </p>
      </>
    ),
  },
  {
    id: 'site-hierarchy',
    heading: 'Understanding the Site Hierarchy',
    content: (
      <>
        <p>
          Construction sites have a clear hierarchy, and understanding where you fit within it helps
          you navigate the working environment effectively. As an apprentice, you are at the
          beginning of your career — but that does not mean you are unimportant. Your role in the
          hierarchy comes with specific responsibilities and expectations.
        </p>
        <p>
          <strong>The typical structure:</strong> On a construction site, the principal contractor
          manages the overall project. Under them, subcontractors provide specialist trades — your
          electrical employer is likely a subcontractor. Within your electrical team, the hierarchy
          typically runs from contracts manager (office-based), to project manager or site
          supervisor (manages the electrical work on site), to qualified electricians (carry out the
          work), to apprentices (learn and assist).
        </p>
        <p>
          <strong>Your direct report:</strong> As an apprentice, you report to the qualified
          electrician you are working with (your supervisor or mentor) and, above them, to the
          site-based project manager or foreman. Follow the chain of command — if you have a
          concern, raise it with your direct supervisor first. If they cannot resolve it, they will
          escalate it.
        </p>
        <p>
          <strong>Interactions with other trades:</strong> You will work alongside plumbers,
          carpenters, plasterers, painters, gas engineers, and many other trades. Treat everyone
          with respect, regardless of their trade. Communicate clearly when your work intersects
          with theirs — for example, if you need to chase a wall that a plasterer has just finished,
          discuss it with them and the site manager first.
        </p>
        <p>
          <strong>Dealing with instructions from outside your chain:</strong> Occasionally, a site
          manager or principal contractor may give you a direct instruction. If the instruction
          relates to general site safety (evacuate, stop work in a specific area), follow it
          immediately. If it relates to your electrical work, tell them you will check with your
          supervisor first. You should not carry out electrical work under instructions from someone
          outside your electrical team unless your supervisor has confirmed it. This protects both
          you and the quality of the installation. Track all of this learning in your{' '}
          <SEOInternalLink href="/guides/off-the-job-training-hours">
            off-the-job training hours
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'being-part-of-a-team',
    heading: 'Being Part of a Team',
    content: (
      <>
        <p>
          Electrical work is a team activity. Even when you are working on a task alone, you are
          part of a broader team that depends on you, and that you depend on. Understanding how to
          be an effective team member is a professional skill that will serve you throughout your
          career — whether you work for an employer or run your own business.
        </p>
        <p>
          <strong>Contributing positively:</strong> A positive team member turns up on time, works
          hard, communicates clearly, supports colleagues, and maintains a good attitude even on
          difficult days. You do not need to be the most skilled person on the team — as an
          apprentice, you will not be. But you can be the most willing, the most reliable, and the
          most enthusiastic. These qualities are valued by every employer and every team.
        </p>
        <p>
          <strong>Handling conflict:</strong> Disagreements are inevitable in any workplace. When
          they arise, address them calmly and directly. Focus on the issue, not the person. "I think
          we should route the cable this way because..." is productive. "You always do things wrong"
          is not. If a conflict cannot be resolved between you, involve your supervisor. Do not let
          disagreements fester — unresolved tension affects the whole team.
        </p>
        <p>
          <strong>Supporting other apprentices:</strong> If there are other apprentices on your site
          or in your team, support each other. Share knowledge, help each other with difficult
          tasks, and provide moral support during tough periods. The apprenticeship is demanding,
          and having someone who understands what you are going through makes it more manageable.
          The{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprenticeship
          </SEOInternalLink>{' '}
          is a shared journey.
        </p>
        <p>
          <strong>Celebrating team achievements:</strong> When a project is completed, when a
          difficult installation is finished, when an inspection passes — acknowledge the team
          effort. Recognising others' contributions builds goodwill and strengthens the team. The
          electrician who helped you with a tricky termination, the labourer who kept the site
          clean, the project manager who organised the materials — they all contributed to the
          success, and recognising that builds a positive workplace culture.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-support',
    heading: 'Supporting Your Workplace Experience with Elec-Mate',
    content: (
      <>
        <p>
          Navigating workplace culture is one of the most challenging aspects of an apprenticeship —
          and one of the least talked about. Elec-Mate provides tools and resources that support not
          just your technical development, but your professional and personal growth as well.
        </p>
        <p>
          <strong>Site diary with mood tracking:</strong> The Elec-Mate{' '}
          <SEOInternalLink href="/guides/site-diary-for-apprentices">site diary</SEOInternalLink>{' '}
          includes mood tracking alongside your daily work record. This helps you identify patterns
          — are certain tasks, people, or environments consistently affecting your wellbeing? This
          self-awareness is the first step towards addressing workplace challenges proactively.
        </p>
        <p>
          <strong>Mental health resources:</strong> The{' '}
          <SEOInternalLink href="/guides/apprentice-mental-health">
            mental health hub
          </SEOInternalLink>{' '}
          provides information and signposting specifically for construction and electrical trade
          apprentices. It covers stress management, anxiety, dealing with workplace pressure, and
          where to get professional support. Because looking after your mental health is not
          optional — it is essential.
        </p>
        <p>
          <strong>Professional development tracking:</strong> Record your skills development,
          training achievements, and professional milestones. Build a comprehensive portfolio that
          demonstrates not just your technical competence, but your professional growth —
          communication skills, teamwork, problem-solving, and safety awareness.
        </p>
        <p>
          <strong>Learning community:</strong> Join 430+ UK apprentices who are going through the
          same experience. Knowing that others face the same challenges, the same nerves, and the
          same workplace dynamics makes the apprenticeship feel less isolating. You are not alone in
          this.
        </p>
        <SEOAppBridge
          title="More Than Just Technical Training"
          description="Elec-Mate supports your whole apprenticeship experience — site diary with mood tracking, mental health resources, professional development tools, and a community of apprentices. 7-day free trial."
          icon={Heart}
        />
      </>
    ),
  },
];

export default function ApprenticeWorkplaceCulturePage() {
  return (
    <GuideTemplate
      title="Workplace Culture for Electrical Apprentices | Fitting In on Site"
      description="Guide to workplace culture for electrical apprentices. Fitting in on site, professional behaviour, communication, dealing with bullying, mentoring relationships, and being part of a team in the construction industry."
      datePublished="2026-01-22"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Workplace Culture for <span className="text-yellow-400">Electrical Apprentices</span>
        </>
      }
      heroSubtitle="Fitting in on a construction site, professional behaviour, communication, mentoring, and dealing with bullying. The unwritten rules of site culture that nobody teaches you at college — but everyone expects you to know."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Workplace Culture"
      relatedPages={relatedPages}
      ctaHeading="Navigate your apprenticeship with confidence"
      ctaSubheading="Join 430+ UK apprentices building technical skills and professional confidence with Elec-Mate. Site diary, mental health hub, professional development tracking, and structured courses. 7-day free trial, cancel anytime."
    />
  );
}
