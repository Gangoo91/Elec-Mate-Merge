import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Users,
  Heart,
  TrendingUp,
  Award,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Briefcase,
  Lightbulb,
  Star,
  Brain,
  Wrench,
  FileCheck2,
  Calculator,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician-uk' },
  { label: 'Women in Electrical', href: '/guides/women-in-electrical-trade' },
];

const tocItems = [
  { id: 'introduction', label: 'Women in the Electrical Trade' },
  { id: 'industry-stats', label: 'Industry Statistics' },
  { id: 'breaking-barriers', label: 'Breaking Barriers' },
  { id: 'role-models', label: 'Role Models and Mentors' },
  { id: 'apprenticeships', label: 'Apprenticeship Advice' },
  { id: 'support-networks', label: 'Support Networks' },
  { id: 'career-progression', label: 'Career Progression' },
  { id: 'employers', label: 'Advice for Employers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Women make up approximately 2% of the UK electrical workforce — the lowest representation of any construction trade, but the number is growing year on year.',
  'The UK faces a shortage of over 10,000 qualified electricians. Increasing female participation is essential to meeting demand and improving the quality of the workforce.',
  'Organisations like NICEIC, the JIB, Women Into Construction, and the Electrical Contractors Association actively support women entering the trade with mentoring, networking, and apprenticeship schemes.',
  'Women who complete their apprenticeship and gain experience report high job satisfaction, strong earning potential, and genuine career independence.',
  'Elec-Mate provides the same professional tools to every electrician regardless of background — digital certificates, AI study tools, and business management features that help all tradespeople succeed.',
];

const faqs = [
  {
    question: 'What qualifications do women need to become an electrician in the UK?',
    answer:
      'The qualifications are identical for everyone. You need a Level 3 NVQ Diploma in Electrotechnical Services, the 18th Edition IET Wiring Regulations qualification (C&G 2382), and the AM2 practical assessment. Most people complete these through a 3 to 4-year apprenticeship, although mature learners can take accelerated courses if they have relevant experience. There are no gender-specific requirements — the same standards apply to all candidates. Some training providers and colleges offer women-only cohorts or taster sessions, which can be a good way to get started if you want a supportive environment during the early stages.',
  },
  {
    question: 'Is the electrical trade welcoming to women?',
    answer:
      'The honest answer is that it depends on the employer and the site. Many companies actively welcome women and have diversity policies in place. The JIB (Joint Industry Board) and major contractors have improved significantly in recent years. However, some smaller firms and older sites can still have outdated attitudes. The key is to find an employer who values your work and invests in your development. Organisations like Women Into Construction, NAWIC (National Association of Women in Construction), and the Electrical Contractors Association can help connect you with supportive employers. The trade is changing — slowly but genuinely — and women who enter now are helping to shape that change.',
  },
  {
    question: 'What is the earning potential for female electricians?',
    answer:
      'Earning potential is the same regardless of gender. A qualified electrician in the UK earns between £30,000 and £45,000 per year in employment, with experienced electricians in London and the South East earning over £50,000. Self-employed electricians can earn significantly more — £50,000 to £70,000 or higher — depending on the type of work, their client base, and how efficiently they run their business. Specialist areas like inspection and testing, EV charger installation, solar PV, and commercial work command higher rates. The JIB sets standard rates for employed electricians, and these apply equally to all workers.',
  },
  {
    question: 'Are there apprenticeships specifically for women in electrical?',
    answer:
      'There are no women-only apprenticeships as such — all apprenticeships are open to everyone. However, several organisations and training providers run women-focused initiatives. The JIB has supported women-in-electrical campaigns. NICEIC and NAPIT promote diversity through their events and marketing. Women Into Construction offers pre-employment training, mentoring, and help with finding apprenticeship placements. Some local colleges run women-only taster days for electrical installation to help women try the trade before committing to a full apprenticeship. The government Apprenticeship Service website (gov.uk/apply-apprenticeship) lists all available electrical apprenticeships, and you can filter by location and level.',
  },
  {
    question: 'How can I deal with discrimination on site?',
    answer:
      'Discrimination based on sex is illegal under the Equality Act 2010. If you experience harassment, bullying, or discriminatory treatment, you have several options: raise it with your site supervisor or line manager, report it through your employer HR process, contact your union representative (Unite the Union covers electricians), or seek advice from ACAS (the Advisory, Conciliation and Arbitration Service). Document incidents with dates, times, and witnesses. Major contractors have zero-tolerance policies for harassment and dedicated reporting channels. The CITB (Construction Industry Training Board) also provides guidance on equality and diversity in construction. You should never have to tolerate discriminatory behaviour — it is unlawful and most employers take it seriously.',
  },
  {
    question: 'What support does Elec-Mate offer women in electrical?',
    answer:
      'Elec-Mate is built for every electrician. The platform provides digital certification tools (EICR, EIC, Minor Works), AI-powered study materials for 18th Edition, 2391, and AM2 exams, business management features (quoting, invoicing, job tracking), and technical calculators. These tools help all electricians work more efficiently and professionally. For apprentices — including women entering the trade — the study centre provides structured revision, flashcards, mock exams, and progress tracking that make exam preparation more manageable. The platform does not differentiate by gender because professional tools should be available to everyone equally.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Everything you need to know about starting an electrical apprenticeship in the UK.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'Average earnings by region, experience level, and specialisation for UK electricians.',
    icon: TrendingUp,
    category: 'Career',
  },
  {
    href: '/guides/how-to-become-electrician-uk',
    title: 'How to Become an Electrician',
    description:
      'Step-by-step route from school leaver or career changer to qualified electrician.',
    icon: Wrench,
    category: 'Career',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description: 'From Level 2 to Level 4 — the full map of electrical qualifications in the UK.',
    icon: Award,
    category: 'Training',
  },
  {
    href: '/guides/mock-exams-electrical',
    title: 'Mock Exams for Electricians',
    description:
      'Practice tests for 18th Edition, 2391, AM2, and EPA to build confidence before exam day.',
    icon: Brain,
    category: 'Training',
  },
  {
    href: '/guides/self-employed-electrician-guide',
    title: 'Self-Employed Electrician Guide',
    description:
      'How to set up your own electrical business — from registration to finding clients.',
    icon: Briefcase,
    category: 'Business',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'introduction',
    heading: 'Women in the Electrical Trade: A Changing Landscape',
    content: (
      <>
        <p>
          The UK electrical industry has been male-dominated for as long as anyone can remember.
          Walk onto any construction site or into any domestic property where electrical work is
          underway, and the chances are the electrician is male. That is a fact — but it is a fact
          that is changing, and changing for the better.
        </p>
        <p>
          Women are entering the electrical trade in growing numbers. They are completing
          apprenticeships, passing the{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">18th Edition</SEOInternalLink>{' '}
          exam, gaining their{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            2391 inspection and testing qualification
          </SEOInternalLink>
          , and building successful careers as employed and self-employed electricians. Some are
          specialising in commercial work, others in domestic installations, and a growing number
          are moving into inspection and testing, EV charger installation, and renewable energy.
        </p>
        <p>
          This guide is for women considering a career in the electrical trade, for women already in
          the trade looking for support and progression opportunities, and for employers who want to
          build more diverse and effective teams. The electrical industry needs more qualified
          electricians — and half the population has been largely overlooked as a source of talent.
        </p>
      </>
    ),
  },
  {
    id: 'industry-stats',
    heading: 'Industry Statistics: Where We Stand',
    content: (
      <>
        <p>
          The numbers tell a clear story. Women are underrepresented in the electrical trade, but
          the trend is moving in the right direction.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approximately 2% of UK electricians are women.</strong> This is the lowest
                representation of any construction trade. Plumbing is around 3%, painting and
                decorating around 5%, and architecture around 30%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Female apprenticeship starts in electrical are increasing.</strong> CITB
                data shows a steady year-on-year rise in women starting electrical apprenticeships,
                although the absolute numbers remain small. The target set by industry bodies is to
                reach 5% by 2030.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The UK needs over 10,000 additional qualified electricians.</strong> The
                electrification of heating (heat pumps), transport (EV chargers), and energy (solar
                PV, battery storage) is creating massive demand. The current workforce cannot meet
                it. Recruiting from the full population — not just 50% of it — is essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention is the bigger challenge.</strong> Getting women into the trade is
                one thing; keeping them is another. Site culture, lack of facilities (changing
                rooms, toilets), and limited progression opportunities are cited as reasons women
                leave. Companies that address these issues have significantly better retention
                rates.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These statistics matter because they highlight both the problem and the opportunity. The
          electrical trade offers excellent earning potential, job security, and career
          independence. The barrier is not ability — it is perception, culture, and access.
        </p>
      </>
    ),
  },
  {
    id: 'breaking-barriers',
    heading: 'Breaking Barriers: Challenges Women Face',
    content: (
      <>
        <p>
          Being honest about the challenges is important. Women entering the electrical trade should
          know what to expect — not to discourage them, but so they can prepare and find support.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Being the only woman on site.</strong> Many women report being the only
                female electrician — or the only woman in any trade role — on their site. This can
                feel isolating, particularly early in your career. Finding a mentor and connecting
                with other women in the trade makes a significant difference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdated attitudes.</strong> Most tradespeople are supportive and
                professional. However, some individuals still hold outdated views. The Equality Act
                2010 protects against discrimination, and most employers have policies in place.
                Knowing your rights and having a support network helps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical challenges.</strong> Inadequate facilities on site (no female
                changing rooms or toilets), PPE that does not fit properly (designed for male body
                shapes), and physical assumptions about capability are common practical issues.
                These are improving — especially on major projects — but smaller sites can lag
                behind.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Having to prove yourself more.</strong> Many women in the trade report
                feeling they have to demonstrate competence more than their male colleagues before
                being taken seriously. This is frustrating but tends to diminish as you build
                experience and your work speaks for itself.
              </span>
            </li>
          </ul>
        </div>
        <p>
          None of these challenges are insurmountable. The women who have built successful careers
          in the electrical trade consistently say the same thing: the work itself is rewarding, the
          earning potential is excellent, and the independence of being a qualified electrician is
          worth the early difficulties.
        </p>
      </>
    ),
  },
  {
    id: 'role-models',
    heading: 'Role Models and Mentors',
    content: (
      <>
        <p>
          Seeing someone who looks like you doing the job you want makes a difference. The
          electrical trade now has a growing number of visible female role models — qualified
          electricians, business owners, trainers, and inspectors who are sharing their experience
          and encouraging others.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Social media communities.</strong> Instagram, TikTok, and YouTube have
                active communities of female electricians sharing their daily work, study tips,
                career advice, and honest accounts of life in the trade. Search for hashtags like
                #WomenInElectrical, #FemaleElectrician, and #WomenInTrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industry awards.</strong> The Electrical Industry Awards, the NICEIC Awards,
                and the Women in Construction Awards regularly recognise female electricians for
                their technical skill and contribution to the industry. These events raise
                visibility and create networking opportunities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mentoring programmes.</strong> The JIB, Women Into Construction, and some
                competent person schemes offer formal mentoring programmes that pair experienced
                tradeswomen with newcomers. Having a mentor who understands both the technical and
                cultural aspects of the trade is invaluable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are considering the trade, reach out. The women who have gone before you are
          overwhelmingly supportive and willing to share their experience. You do not have to
          navigate this alone.
        </p>
      </>
    ),
  },
  {
    id: 'apprenticeships',
    heading: 'Apprenticeship Advice for Women',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprenticeship
          </SEOInternalLink>{' '}
          is the most common route into the trade. It typically takes 3 to 4 years and combines
          on-the-job training with college study. Here is practical advice for women applying for
          and completing an electrical apprenticeship.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Research employers carefully.</strong> Before accepting an apprenticeship,
                ask about the company culture, whether they have or have had female apprentices, and
                what support is available. A company that has experience with diverse teams is more
                likely to provide a positive environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Try a taster session first.</strong> Many colleges and training providers
                offer short taster courses in electrical installation. These let you experience the
                work — wiring circuits, using test equipment, reading drawings — before committing
                to a multi-year apprenticeship. Some providers offer women-only taster sessions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use all available study resources.</strong> The{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  18th Edition exam
                </SEOInternalLink>{' '}
                and the practical assessments require solid preparation. Use a combination of
                textbooks, online resources, and apps like Elec-Mate to study. The more prepared you
                are, the more confident you will feel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Build your portfolio from day one.</strong> Document your work with photos,
                descriptions, and evidence of competence. The{' '}
                <SEOInternalLink href="/guides/apprentice-portfolio-guide">
                  apprentice portfolio
                </SEOInternalLink>{' '}
                is a requirement for your NVQ — start it early and keep it up to date throughout
                your apprenticeship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connect with other female apprentices.</strong> Whether through social
                media, Women Into Construction events, or your college, find other women going
                through the same experience. Peer support makes a real difference during the tougher
                days.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Study smarter with AI-powered revision"
          description="Elec-Mate's study centre gives apprentices structured courses, flashcards, and mock exams for 18th Edition, 2391, and AM2 preparation. Track your progress and identify weak areas before exam day."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'support-networks',
    heading: 'Support Networks and Organisations',
    content: (
      <>
        <p>
          You do not have to do this alone. Several organisations in the UK actively support women
          entering and progressing in the electrical and wider construction trades.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Women Into Construction</h4>
                <p className="text-white text-sm leading-relaxed">
                  A not-for-profit organisation that helps women access training, work experience,
                  and employment in construction. They run pre-employment programmes, provide
                  mentoring, and work with major contractors to place women in trade roles.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  NAWIC — National Association of Women in Construction
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  A networking and advocacy organisation for women across all construction roles.
                  They host events, provide resources, and campaign for better conditions and
                  representation in the industry.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">The JIB (Joint Industry Board)</h4>
                <p className="text-white text-sm leading-relaxed">
                  The JIB sets employment standards for the electrical industry and has actively
                  supported initiatives to increase female participation. Their website has
                  information on apprenticeship routes and registered employers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  CITB — Construction Industry Training Board
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The CITB funds training and supports diversity initiatives across construction.
                  They provide grants for employers who take on apprentices and have specific
                  programmes aimed at underrepresented groups, including women.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Beyond formal organisations, the online community of female electricians is active and
          supportive. Facebook groups, Instagram accounts, and TikTok creators share daily
          experiences, study tips, and career advice. Finding your community — whether online or in
          person — is one of the most valuable things you can do early in your career.
        </p>
      </>
    ),
  },
  {
    id: 'career-progression',
    heading: 'Career Progression for Women in Electrical',
    content: (
      <>
        <p>
          Once qualified, the career options are the same for everyone. The electrical trade offers
          multiple progression routes, and women are increasingly visible at every level.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialisation.</strong> After gaining your core qualifications, you can
                specialise in{' '}
                <SEOInternalLink href="/training/inspection-and-testing">
                  inspection and testing (C&G 2391)
                </SEOInternalLink>
                ,{' '}
                <SEOInternalLink href="/guides/ev-charger-installation-guide">
                  EV charger installation
                </SEOInternalLink>
                , fire alarm systems, emergency lighting, solar PV, or building management systems.
                Each specialisation increases your earning potential and opens new markets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employment.</strong> Many electricians — men and women — eventually go
                self-employed. Running your own business gives you control over your schedule, your
                clients, and your income. The{' '}
                <SEOInternalLink href="/guides/self-employed-electrician-guide">
                  self-employed electrician guide
                </SEOInternalLink>{' '}
                covers the practical steps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Training and education.</strong> Experienced electricians can move into
                training roles — teaching at colleges, delivering in-house training for contractors,
                or becoming approved NICEIC or NAPIT assessors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management and leadership.</strong> Site supervisor, contracts manager,
                project manager, and director-level roles are all achievable. The electrical
                industry needs leaders from diverse backgrounds to reflect its changing workforce
                and client base.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Professional tools for every stage of your career"
          description="Whether you are an apprentice studying for your 18th Edition or a self-employed electrician running your own business, Elec-Mate provides digital certificates, AI calculators, quoting tools, and study resources. 7-day free trial."
          icon={Briefcase}
        />
      </>
    ),
  },
  {
    id: 'employers',
    heading: 'Advice for Employers: How to Attract and Retain Women',
    content: (
      <>
        <p>
          If you are an electrical contractor looking to build a more diverse team, the actions that
          make the biggest difference are practical, not performative.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide proper facilities.</strong> Separate changing rooms, clean toilets,
                and correctly sized PPE. These are basic requirements under CDM 2015 and the
                Equality Act 2010, but they are still missing on many sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zero-tolerance policy on harassment.</strong> Have a clear, enforced policy.
                Make sure all employees know what constitutes harassment and what the consequences
                are. Follow through — a policy that is not enforced is worse than no policy at all.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Invest in training and progression.</strong> Fund qualifications, provide
                mentoring, and create clear progression paths. Women — like all employees — are more
                likely to stay with an employer who invests in their development.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review your recruitment.</strong> Look at your job adverts, your interview
                panels, and your selection criteria. Are they inadvertently filtering out female
                candidates? Simple changes — like using gender-neutral language, including photos of
                diverse teams, and advertising through organisations like Women Into Construction —
                can make a significant difference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexible working where possible.</strong> Construction is not always
                compatible with flexible working, but where it is possible — for example, office
                days for paperwork, flexible start and finish times — offering it improves retention
                for all employees, not just women.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Diversity is not a box-ticking exercise. Companies that genuinely invest in building
          inclusive teams report better employee retention, higher customer satisfaction, and
          stronger business performance. The electrical trade is changing — employers who lead that
          change will attract the best talent.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WomenInElectricalTradePage() {
  return (
    <GuideTemplate
      title="Women in the Electrical Trade | Career Guide UK"
      description="Complete guide for women considering or pursuing a career in the UK electrical trade. Industry statistics, apprenticeship advice, support networks, role models, career progression, and practical guidance for breaking barriers."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Women in the Electrical Trade:{' '}
          <span className="text-yellow-400">Breaking Barriers, Building Careers</span>
        </>
      }
      heroSubtitle="Women make up just 2% of UK electricians — but the number is growing. This guide covers everything from apprenticeship routes and support networks to career progression and earning potential. The electrical trade needs more qualified people, and that means everyone."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Women in the Electrical Trade"
      relatedPages={relatedPages}
      ctaHeading="Professional Tools for Every Electrician"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for digital certificates, AI study tools, and business management. The same professional platform for everyone. 7-day free trial, cancel anytime."
    />
  );
}
