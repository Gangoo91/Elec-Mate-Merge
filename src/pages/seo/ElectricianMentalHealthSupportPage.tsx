import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Heart,
  Phone,
  Users,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  Star,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrician-career-ladder-uk' },
  { label: 'Mental Health Support', href: '/guides/electrician-mental-health-support' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'industry-context', label: 'Mental Health in the Trades' },
  { id: 'helplines', label: 'Helplines and Crisis Support' },
  { id: 'charities', label: 'Construction Industry Charities' },
  { id: 'self-employed', label: 'Self-Employed Specific Pressures' },
  { id: 'site-culture', label: 'Changing the Culture on Site' },
  { id: 'employer-duties', label: 'Employer Duties and Responsibilities' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The construction and trades sector has one of the highest suicide rates of any industry in the UK — male construction workers are 3.7 times more likely to die by suicide than the UK male average.',
  'The Lighthouse Construction Industry Charity and the Construction Industry Helpline (0345 605 1956) provide free, confidential mental health support specifically for construction and trades workers.',
  'Self-employed electricians face specific mental health pressures: irregular income, isolation from colleagues, administrative burden, and the difficulty of "switching off" when business worries follow you home.',
  'Asking someone directly "are you OK?" and listening without judgement is one of the most effective evidence-based interventions for someone who is struggling.',
  'Many employers have a legal duty to consider mental health risks under the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999.',
];

const faqs = [
  {
    question: 'Why is mental health a particular issue in the electrical and construction trades?',
    answer:
      'Several industry-specific factors contribute to poor mental health outcomes in the trades. Working patterns — long hours, early starts, working away from home on large projects — disrupt family life and social relationships. The culture of the industry has historically discouraged emotional openness and help-seeking (though this is improving). Financial pressures — irregular payments, retentions, bad debts, and the vulnerability of small contractors to cash flow problems — create sustained anxiety. Physical pain from injuries and wear and tear adds to mental load. And the self-employment model, which is very common in the trades, removes the social and professional support network that employed colleagues provide. The Office for National Statistics consistently identifies construction as one of the occupations with the highest rates of male suicide.',
  },
  {
    question: 'What is the Construction Industry Helpline?',
    answer:
      'The Construction Industry Helpline is a dedicated support service for construction and trades workers and their families, run by the Lighthouse Construction Industry Charity. The helpline number is 0345 605 1956, available 24 hours a day, 7 days a week. The helpline provides emotional support, mental health advice, and practical assistance (including welfare grants, legal advice, and debt counselling). It is completely free and confidential. The service is open to all construction and trades workers — employees, self-employed individuals, apprentices, and their immediate families. The Lighthouse Charity also provides an app (Lighthouse Club Construction Industry App) with self-help tools, a mood tracker, and direct access to the helpline.',
  },
  {
    question: 'What resources does the Lighthouse Club provide?',
    answer:
      'The Lighthouse Club is the principal mental health and welfare charity for the UK construction industry. Services include: the 24/7 Construction Industry Helpline (0345 605 1956), the Lighthouse Club App (free to download), welfare grants to help workers and families in financial crisis, an apprentice support programme, mental health training (Mental Health First Aid and the Lighthouse Club\'s own training for site managers and companies), and a network of volunteer worker befrienders. The Lighthouse Club is entirely funded by voluntary donations from the construction industry, including through events such as the industry\'s charity golf day, sponsored challenges, and corporate fundraising.',
  },
  {
    question: 'Is there specific support for self-employed electricians?',
    answer:
      'Self-employed electricians can access all the same services as employed workers — the Construction Industry Helpline does not distinguish based on employment status. Specific challenges for self-employed trades workers are well understood by the helpline counsellors, who regularly support sole traders dealing with business failure, debt, cash flow anxiety, and the isolation of working alone. The NAPIT Foundation provides an additional layer of support specifically for NAPIT registered members — welfare assistance, signposting to support services, and a member assistance programme. The Federation of Small Businesses (FSB) also provides a mental health and wellbeing support line as part of its membership package.',
  },
  {
    question: 'How should an electrical contractor support the mental health of their employees?',
    answer:
      'Employers have a legal duty to assess and manage workplace mental health risks under the Health and Safety at Work Act 1974 and associated regulations. Practical steps for electrical contractors: complete mental health risk assessments as part of your standard risk assessment process; train at least one member of the team as a Mental Health First Aider (MHFA England offers 2-day training, the Lighthouse Club offers a shorter construction-specific version); share information about the Construction Industry Helpline with all employees; create a culture where it is acceptable to talk about struggling — the manager or business owner modelling openness is the single most powerful culture change lever; be alert to signs of distress (changed behaviour, withdrawal, presenteeism — turning up but not functioning); and ensure workloads are realistic and that employees can take their full holiday entitlement.',
  },
  {
    question: 'What should I do if I am worried about a colleague on site?',
    answer:
      'If you are worried about a colleague: find a private moment to ask directly — "I have noticed you seem a bit flat lately, are you OK?" Direct, genuine questions are more effective than indirect hints. Listen without judgement — do not try to fix or advise, just listen. Ask what would help. Share the Construction Industry Helpline number (0345 605 1956). Do not promise to keep concerns secret if you believe there is a serious risk — in a genuine crisis, share information with someone who can help. Follow up — a text or a coffee the next day shows you meant it. Most people who are struggling find it very hard to ask for help; asking them directly removes that barrier. The evidence from suicide prevention research consistently shows that directly asking someone if they are thinking of suicide does not plant the idea — it opens a door.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-retirement-planning-uk',
    title: 'Electrician Retirement Planning',
    description: 'Financial planning and managing the transition out of physical electrical work.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/guides/from-electrician-to-electrical-contractor',
    title: 'From Electrician to Contractor',
    description: 'Managing the pressures and rewards of running your own electrical business.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-ladder-uk',
    title: 'Electrician Career Ladder UK',
    description: 'Career progression options including lower-stress routes in later career.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/female-electricians-uk',
    title: 'Female Electricians in the UK',
    description: 'Inclusive culture in the electrical trade — support and networks.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/specialist-electrician-routes-uk',
    title: 'Specialist Electrician Routes',
    description: 'Exploring different career paths to find work that suits you.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Training',
    description: 'Developing skills that open up less physically demanding work types.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Mental Health Support for Electricians and Trades Workers',
    content: (
      <>
        <p>
          The electrical and construction trades have some of the poorest mental health outcomes
          of any sector in the UK. Construction workers are significantly more likely to die by
          suicide than the national male average, and the culture of many site environments has
          historically made it very hard for workers to acknowledge they are struggling or to
          seek help.
        </p>
        <p>
          This is changing — the Lighthouse Club, MHFA England, and many of the major contractors
          and trade bodies are investing significantly in mental health awareness, training, and
          support infrastructure. But awareness matters. Knowing where to turn when you or a
          colleague is struggling can save a life.
        </p>
        <p>
          This guide covers the specific mental health pressures in the electrical trade, the
          key support organisations and helplines, the particular challenges for self-employed
          electricians, and what employers can do to create healthier workplaces.
        </p>
      </>
    ),
  },
  {
    id: 'industry-context',
    heading: 'Mental Health in the Electrical and Construction Trades',
    content: (
      <>
        <p>
          The data is stark. The Office for National Statistics suicide statistics consistently
          show that construction occupations have among the highest age-standardised suicide
          rates of any occupational group. Key contributing factors specific to the industry:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Irregular work and financial insecurity</strong> — cash flow problems, bad
                debts, late-paying clients, and the anxiety of an empty diary are significant
                stressors for self-employed trades workers. Financial stress is one of the most
                common triggers for mental health crises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation</strong> — sole traders working alone on jobs have limited
                social contact during the working day. The absence of colleagues to talk to is
                a genuine mental health risk factor for self-employed workers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Physical pain and injury</strong> — musculoskeletal problems are extremely
                common in the trades. Chronic pain has a strong bidirectional relationship with
                depression and anxiety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cultural barriers to help-seeking</strong> — while improving, the
                historically masculine culture of site environments has made it difficult for
                workers to acknowledge mental health difficulties. The stigma of "not coping"
                remains a significant barrier in parts of the industry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working away from home</strong> — electricians on large commercial or
                infrastructure projects who are away from home for extended periods experience
                disruption to family relationships and social support networks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'helplines',
    heading: 'Helplines and Crisis Support: Where to Turn',
    content: (
      <>
        <p>
          If you or someone you know is struggling, these are the key contacts. All are free
          and confidential:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Construction Industry Helpline — 0345 605 1956</h4>
                <p className="text-white text-sm leading-relaxed">
                  The primary dedicated support line for all construction and trades workers and
                  their families. Available 24 hours a day, 7 days a week. Free to call. Provides
                  emotional support, practical advice, and access to welfare assistance. Run by
                  the Lighthouse Construction Industry Charity.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Samaritans — 116 123</h4>
                <p className="text-white text-sm leading-relaxed">
                  Free to call from any phone, 24 hours a day, 365 days a year. Confidential
                  emotional support for anyone feeling distressed or desperate. You do not have
                  to be suicidal to call — the Samaritans are there for anyone who is struggling.
                  Also available by email: jo@samaritans.org.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">CALM (Campaign Against Living Miserably) — 0800 58 58 58</h4>
                <p className="text-white text-sm leading-relaxed">
                  Free to call 5pm to midnight daily. Specifically aimed at men, who are
                  statistically less likely to seek help through mainstream services. Also
                  provides a webchat service at thecalmzone.net. Particularly relevant for the
                  predominantly male trades workforce.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">In a crisis — 999 or A&E</h4>
                <p className="text-white text-sm leading-relaxed">
                  If someone is in immediate danger — call 999. For a mental health crisis that
                  does not require 999, call NHS 111 and select the mental health option. Most
                  areas now have a 24/7 mental health crisis team available via 111. A&E
                  departments can also provide emergency mental health support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'charities',
    heading: 'Construction Industry Mental Health Charities and Programmes',
    content: (
      <>
        <p>
          Several charities and programmes exist specifically for the construction and trades
          sector:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighthouse Construction Industry Charity</strong> — the primary mental
                health and welfare charity for the UK construction industry. Operates the
                Construction Industry Helpline (0345 605 1956), provides welfare grants, and
                delivers mental health training for companies. The Lighthouse Club App is a free
                download with self-help tools, a mood tracker, and direct helpline access.
                Website: lighthouseclub.org
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mates in Mind</strong> — a charitable programme improving and promoting
                positive mental health within the UK construction industry. Provides mental health
                programmes, training, and resources specifically designed for site environments.
                Works with contractors of all sizes to build mental health awareness culture.
                Website: matesinmind.org
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Band of Builders</strong> — a charity that mobilises construction
                industry volunteers to carry out home adaptations for tradespeople and their
                families who have suffered life-changing illness or injury, reducing a significant
                source of stress and anxiety for affected workers. Website: bandofbuilders.org
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT Foundation</strong> — provides welfare support for NAPIT registered
                members and their families, including signposting to mental health services and
                practical assistance. Contact NAPIT directly for details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECA (Electrical Contractors Association)</strong> — the ECA has an
                employee assistance programme available to member companies and their staff,
                providing confidential telephone counselling and access to mental health
                professionals.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'self-employed',
    heading: 'Self-Employed Electricians: Specific Pressures and Support',
    content: (
      <>
        <p>
          Self-employment creates specific mental health pressures that are not shared by employed
          colleagues. Understanding and planning for these pressures is an important part of
          sustainable self-employment:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation mitigation</strong> — deliberately maintain social contact.
                Joining local trade associations, attending industry events, and building
                relationships with other local self-employed trades workers creates a peer
                network that substitutes for the workplace social environment. Sharing a WhatsApp
                group with a few other local sparks provides both practical and social support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Financial stress management</strong> — maintain 3 months of operating
                costs as a cash buffer in a business account. This single measure removes the
                anxiety spiral that accompanies a quiet week or a slow-paying client more than
                any other. Invoice promptly, follow up on overdue payments, and do not let
                unpaid invoices accumulate without action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work boundaries</strong> — self-employed workers are often "always on".
                Set defined working hours and defend them. Do not take client calls in the evening
                or at weekends unless you have chosen to offer that service. Use technology to
                manage expectations — an out-of-hours message setting response time expectations
                removes the anxiety of feeling obligated to respond immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access to your GP</strong> — do not delay seeking help from your GP for
                mental health symptoms. As a self-employed worker you have the same right to NHS
                services as anyone else. Early intervention for anxiety and depression is
                significantly more effective than waiting until you are in crisis.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Take the admin stress out of your electrical business"
          description="Elec-Mate reduces the administrative burden of running an electrical business — faster quoting, automated certification, and clear job management to give you more mental space."
          icon={Heart}
        />
      </>
    ),
  },
  {
    id: 'site-culture',
    heading: 'Changing the Culture on Site',
    content: (
      <>
        <p>
          Culture change in the construction industry is happening, but slowly. Every electrician
          and electrical contractor can contribute to a healthier site culture:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Make it normal to talk</h4>
                <p className="text-white text-sm leading-relaxed">
                  Regular check-ins with colleagues — "how are you actually getting on?" — normalise
                  the idea that mental health is discussed at work. A site with a culture where
                  people genuinely look out for each other identifies struggling colleagues earlier
                  and creates an environment where getting help is not shameful.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Mental Health First Aid training</h4>
                <p className="text-white text-sm leading-relaxed">
                  MHFA England's 2-day course qualifies a person as a Mental Health First Aider —
                  able to identify signs of mental ill health, listen without judgement, and
                  provide initial support and signposting. For electrical contractors with a team,
                  having a trained MHFA on site is as important as having a physical First Aider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'employer-duties',
    heading: 'Employer Duties and Mental Health at Work',
    content: (
      <>
        <p>
          Employers (including working proprietors who employ staff) have legal responsibilities
          for employee mental health under:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974</strong> — the general duty to ensure,
                so far as reasonably practicable, the health, safety, and welfare of employees
                encompasses mental health as well as physical health.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> — require
                employers to assess risks to mental health (including stress) and to take
                preventive action. A documented stress risk assessment is increasingly expected
                by enforcement authorities and insurers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equality Act 2010</strong> — mental health conditions that have a
                substantial and long-term adverse effect on normal day-to-day activities are
                likely to constitute a disability under the Act, triggering the duty to make
                reasonable adjustments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical minimum steps for electrical contractors with staff</strong> —
                display the Construction Industry Helpline number in the office and van; include
                mental health support signposting in new employee inductions; ensure working
                hours are reasonable; act promptly if an employee's behaviour or performance
                changes (this is often an early sign of mental health difficulty).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianMentalHealthSupportPage() {
  return (
    <GuideTemplate
      title="Electrician Mental Health Support UK | Construction Industry Resources"
      description="Mental health support for UK electricians and trades workers — Construction Industry Helpline (0345 605 1956), Lighthouse Club, Mates in Mind, CALM, and Samaritans. Self-employed pressures, site culture, and employer duties."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Health and Wellbeing"
      badgeIcon={Heart}
      heroTitle={
        <>
          Electrician Mental Health Support:{' '}
          <span className="text-yellow-400">Resources, Helplines, and Culture</span>
        </>
      }
      heroSubtitle="Construction workers are 3.7 times more likely to die by suicide than the UK male average. This guide covers the dedicated support resources for electricians and trades workers, the specific pressures of self-employment, and how to change the culture on site."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Mental Health Support for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Reduce Admin Stress — Focus on What Matters"
      ctaSubheading="Elec-Mate helps electricians spend less time on paperwork and more time on the work they enjoy. Professional quoting, certificates, and job management in one app."
    />
  );
}
