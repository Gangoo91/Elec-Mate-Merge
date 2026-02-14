import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Heart,
  Brain,
  Phone,
  Shield,
  BookOpen,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  Headphones,
  MessageCircle,
  Activity,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Tools', href: '/tools' },
  { label: 'Mental Health Hub', href: '/tools/mental-health-hub' },
];

const tocItems = [
  { id: 'why-mental-health-matters', label: 'Why Mental Health Matters in the Trades' },
  { id: 'self-assessment', label: 'Self-Assessment Tools' },
  { id: 'mindfulness-resources', label: 'Mindfulness & Coping Resources' },
  { id: 'support-contacts', label: 'Support Contacts & Helplines' },
  { id: 'industry-challenges', label: 'Industry-Specific Challenges' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Construction workers are six times more likely to die by suicide than from falls at work — mental health is the biggest safety issue in the industry.',
  'Self-assessment tools help you check in with yourself regularly, track your wellbeing over time, and recognise when you might need support.',
  'Guided mindfulness and coping exercises designed for tradespeople — short sessions you can do on a lunch break, in the van, or at home.',
  'Instant access to UK helplines and support organisations including the Samaritans, MATES in Mind, Lighthouse Club, and the Electrical Industries Charity.',
  'Content addresses the specific stressors tradespeople face: financial pressure, long hours, job insecurity, working away from home, and physical demands.',
];

const faqs = [
  {
    question: 'Why is mental health support important for electricians specifically?',
    answer:
      'The construction and electrical industries have some of the highest rates of mental health problems and suicide in the UK. According to the Office for National Statistics, male construction workers are more than three times as likely to die by suicide as the national average. The industry has specific risk factors that contribute to poor mental health: the physical demands of the work, long and irregular hours, pressure to meet deadlines, financial insecurity (especially for self-employed electricians), time away from family on distant sites, the isolation of working alone on domestic jobs, and a culture that has historically discouraged open discussion of mental health. The Elec-Mate Mental Health Hub addresses these industry-specific factors rather than offering generic wellbeing advice.',
  },
  {
    question: 'What do the self-assessment tools measure?',
    answer:
      'The self-assessment tools use validated screening questionnaires adapted for tradespeople. They cover general mental wellbeing (based on the Warwick-Edinburgh Mental Wellbeing Scale), stress levels, sleep quality, anxiety indicators, and work-life balance. The assessments are not diagnostic tools — they do not diagnose mental health conditions. Instead, they help you understand where you currently sit on a wellbeing scale and track changes over time. If your scores indicate you might benefit from professional support, the tools provide clear signposting to appropriate services. All assessment data is stored privately on your device and is never shared with employers, clients, or anyone else.',
  },
  {
    question: 'Are the mindfulness exercises designed for people on construction sites?',
    answer:
      'Yes. The mindfulness and coping exercises are specifically designed for tradespeople working on construction sites. They are short (2-10 minutes), can be done sitting in a van, on a lunch break, or in a quiet corner of a site, and do not require any special equipment or space. The exercises include guided breathing techniques for managing stress during a difficult job, body scan exercises for relieving physical tension after a demanding day, grounding techniques for moments of anxiety or overwhelm, and sleep improvement exercises for winding down after working long hours. The language and examples used are trade-specific — they reference real situations that electricians face, not generic office-based scenarios.',
  },
  {
    question: 'Which helplines and support organisations are included?',
    answer:
      "The support contacts section includes all major UK helplines and support organisations relevant to tradespeople: Samaritans (116 123, available 24/7), MATES in Mind (the construction industry mental health charity), Lighthouse Club (construction industry benevolent fund providing financial and emotional support), the Electrical Industries Charity (specific to the electrical sector, providing grants, support, and counselling), Andy's Man Club (men's mental health support groups), Papyrus (prevention of young suicide, relevant for apprentices), Mind (general mental health information and support), and CALM (Campaign Against Living Miserably). Each entry includes the phone number, website, opening hours, and a brief description of what kind of help they provide.",
  },
  {
    question: 'Is my mental health data kept private?',
    answer:
      'Absolutely. All mental health data — self-assessment results, wellbeing scores, journal entries, and usage patterns — is stored privately on your device using encrypted local storage. It is never shared with employers, clients, training providers, or anyone else. It is not visible to other Elec-Mate users. It does not appear on your profile or professional card. The only time data leaves your device is if you choose to sync it to your personal cloud account for backup, and even then it is encrypted in transit and at rest. We take the privacy of mental health data extremely seriously because we understand that any risk of data exposure would discourage people from using the tools at all.',
  },
  {
    question: 'Can employers or training providers access the Mental Health Hub for their teams?',
    answer:
      'Employers can provide access to the Mental Health Hub for their employees as part of the Elec-Mate employer subscription, but they cannot see individual employee usage data or assessment results. The employer dashboard shows only aggregate, anonymised engagement data — for example, "14 out of 20 team members have accessed the Mental Health Hub this month" — but never individual information. This approach encourages use while protecting privacy. Employers who provide access demonstrate their commitment to employee wellbeing, which is increasingly important for winning contracts (many principal contractors now ask about mental health provisions in pre-qualification questionnaires) and for meeting their duty of care under health and safety legislation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/apprentice-training-app',
    title: 'Apprentice Training App',
    description:
      'Training platform for electrical apprentices. Managing apprenticeship stress is easier when you feel prepared and supported.',
    icon: GraduationCap,
    category: 'Tool',
  },
  {
    href: '/tools/cv-builder-electrician',
    title: 'CV Builder',
    description:
      'Build a professional electrician CV. Reduce job-seeking stress with a polished CV ready to send to employers.',
    icon: Briefcase,
    category: 'Tool',
  },
  {
    href: '/guides/electrician-self-employed',
    title: 'Self-Employed Electrician Guide',
    description:
      'Guide to self-employment for electricians. Covers financial management, work-life balance, and managing business stress.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description:
      'Salary data for electricians across the UK. Understanding your market value helps reduce financial anxiety.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/elecid-professional-card',
    title: 'ElecID Professional Card',
    description:
      'Digital proof of your qualifications. Professional recognition supports self-worth and career confidence.',
    icon: Shield,
    category: 'Tool',
  },
  {
    href: '/tools/learning-videos-electrician',
    title: 'Learning Videos',
    description:
      'Video training courses for electricians. Continuous learning builds confidence and reduces imposter syndrome.',
    icon: BookOpen,
    category: 'Tool',
  },
];

const features = [
  {
    icon: Activity,
    title: 'Wellbeing Self-Assessment',
    description:
      'Validated screening tools adapted for tradespeople. Check in with yourself regularly, track your wellbeing over time, and get signposted to support when you need it.',
  },
  {
    icon: Brain,
    title: 'Mindfulness Exercises',
    description:
      'Short guided exercises designed for construction site environments. Breathing techniques, body scans, and grounding exercises you can do in 2-10 minutes on a break.',
  },
  {
    icon: Phone,
    title: 'Instant Support Contacts',
    description:
      'One-tap access to the Samaritans, MATES in Mind, Lighthouse Club, Electrical Industries Charity, and other UK helplines. Available offline for when you need them most.',
  },
  {
    icon: Shield,
    title: 'Complete Privacy',
    description:
      'All mental health data is encrypted on your device. Never shared with employers, clients, or anyone else. No data appears on your profile or professional card.',
  },
  {
    icon: MessageCircle,
    title: 'Industry-Specific Content',
    description:
      'Resources that address the real stressors tradespeople face: financial pressure, long hours, job insecurity, isolation, and the physical toll of manual work.',
  },
  {
    icon: Headphones,
    title: 'Audio & Guided Sessions',
    description:
      'Listen to guided sessions while driving to site or relaxing at home. Sleep improvement exercises for winding down after long, physically demanding days.',
  },
];

const howToSteps = [
  {
    name: 'Take a self-assessment',
    text: 'Complete a short wellbeing check-in to understand where you are right now. The assessment takes 2-3 minutes and gives you a clear picture of your current mental health status.',
  },
  {
    name: 'Explore resources that fit your situation',
    text: 'Based on your assessment or your own choice, explore mindfulness exercises, coping strategies, and educational content about managing stress, anxiety, and low mood.',
  },
  {
    name: 'Access support when you need it',
    text: 'If you need to talk to someone, access helpline numbers with a single tap. All major UK support organisations are listed with their contact details and operating hours.',
  },
  {
    name: 'Track your wellbeing over time',
    text: 'Regular check-ins build a private picture of your wellbeing trend. This helps you recognise patterns — for example, whether your wellbeing dips during certain types of work or at certain times of year.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-mental-health-matters',
    heading: 'Why Mental Health Matters in the Trades',
    content: (
      <>
        <p>
          Mental health is the biggest safety issue in the UK construction industry. According to
          the Health and Safety Executive and the Office for National Statistics, construction
          workers are significantly more likely to die by suicide than from accidents on site. In
          fact, construction workers are six times more likely to die by suicide than from a fall at
          work.
        </p>
        <p>
          The electrical trade shares all the risk factors that make construction a high-risk
          industry for mental health problems. Electricians often work long and irregular hours,
          face financial uncertainty (especially when self-employed), spend time away from family on
          distant sites, work in physically demanding and sometimes dangerous conditions, deal with
          the pressure of deadlines and client expectations, and experience the isolation of working
          alone on domestic jobs.
        </p>
        <p>
          Despite growing awareness, there remains a stigma around mental health in the trades. Many
          electricians feel unable to talk about their struggles because of the "tough it out"
          culture that has historically dominated the industry. The Elec-Mate Mental Health Hub
          provides a private, accessible way to check in with your mental health, access resources,
          and find support — without needing to tell anyone you are using it.
        </p>
        <p>
          Whether you are a{' '}
          <SEOInternalLink href="/tools/apprentice-training-app">young apprentice</SEOInternalLink>{' '}
          dealing with the pressures of training and exams, an experienced electrician going through
          a difficult period, or a{' '}
          <SEOInternalLink href="/guides/electrician-self-employed">
            self-employed electrician
          </SEOInternalLink>{' '}
          managing the stress of running a business, the Mental Health Hub has resources that speak
          to your specific situation.
        </p>
      </>
    ),
  },
  {
    id: 'self-assessment',
    heading: 'Self-Assessment Tools',
    content: (
      <>
        <p>
          The self-assessment tools in the Mental Health Hub help you check in with your mental
          health regularly and track your wellbeing over time. They use validated questionnaires
          that have been adapted for tradespeople — the language and scenarios are relevant to your
          daily experience, not generic office-based situations.
        </p>
        <p>
          A typical assessment takes 2-3 minutes and covers key areas of mental wellbeing: your mood
          over the past two weeks, your sleep quality, your energy levels, your stress at work and
          at home, your social connections, and your overall life satisfaction. Your responses are
          scored and presented as a simple wellbeing rating with clear explanations of what the
          score means.
        </p>
        <p>
          The assessments are not diagnostic tools — they do not diagnose depression, anxiety, or
          other conditions. What they do is help you notice changes in your wellbeing that you might
          otherwise overlook. When you are busy working six days a week, it is easy to ignore
          creeping stress or low mood until it becomes a serious problem. Regular self-assessment
          catches these changes early.
        </p>
        <p>
          If your scores suggest you might benefit from professional support, the tool provides
          clear, non-judgemental signposting to appropriate services — from your GP to specialist
          helplines. All assessment data is stored privately on your device and is never shared with
          anyone.
        </p>
        <SEOAppBridge
          title="Check in with your wellbeing today"
          description="Take a 2-minute self-assessment to understand where you are right now. Track your wellbeing over time and get signposted to support when you need it."
          icon={Heart}
        />
      </>
    ),
  },
  {
    id: 'mindfulness-resources',
    heading: 'Mindfulness and Coping Resources',
    content: (
      <>
        <p>
          The mindfulness and coping resources in the Mental Health Hub are designed specifically
          for tradespeople. This is important because most mindfulness apps are designed for office
          workers — they assume you have a quiet room, a yoga mat, and 30 minutes to spare. That is
          not the reality for an electrician on a construction site.
        </p>
        <p>
          The exercises in the Mental Health Hub are short (2-10 minutes), can be done sitting in a
          van or on a site bench, and do not require any special equipment. They cover four main
          areas:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stress management</strong> — breathing techniques and thought exercises for
                managing pressure during difficult jobs, tight deadlines, or confrontations with
                clients and other contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Physical tension relief</strong> — body scan and stretching exercises for
                releasing the physical tension that builds up from manual work, uncomfortable
                positions, and carrying heavy equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grounding techniques</strong> — exercises for moments of anxiety, overwhelm,
                or panic that can be done discreetly on site without anyone noticing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sleep improvement</strong> — guided exercises for winding down after long
                days and improving sleep quality. Essential for electricians who work irregular
                hours or struggle to switch off after demanding jobs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The resources use language and examples that resonate with tradespeople — not corporate
          wellness jargon, but practical, down-to-earth guidance that acknowledges the real
          pressures of working in the electrical trade.
        </p>
      </>
    ),
  },
  {
    id: 'support-contacts',
    heading: 'Support Contacts and Helplines',
    content: (
      <>
        <p>
          When you need to talk to someone, the Mental Health Hub provides instant access to UK
          helplines and support organisations. These contacts are stored on your device so they are
          available even when you have no internet connection — which is often exactly when you
          might need them most, on a remote site or in a basement with no signal.
        </p>
        <p>The key organisations included are:</p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-1">Samaritans — 116 123 (24/7, free)</h4>
            <p className="text-white text-sm leading-relaxed">
              Available any time, day or night. You do not have to be suicidal to call — the
              Samaritans are there for anyone who is struggling or needs to talk.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-1">Lighthouse Club</h4>
            <p className="text-white text-sm leading-relaxed">
              The construction industry benevolent fund. Provides financial emergency grants,
              emotional support, and legal advice for construction workers and their families.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-1">Electrical Industries Charity</h4>
            <p className="text-white text-sm leading-relaxed">
              Specific to the electrical sector. Provides grants, counselling, and support for
              anyone who works or has worked in the electrical industry. Covers financial hardship,
              mental health, and physical health needs.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-1">MATES in Mind</h4>
            <p className="text-white text-sm leading-relaxed">
              The construction industry mental health charity. Provides training, resources, and
              support for improving mental health in construction workplaces.
            </p>
          </div>
        </div>
        <p>
          Every contact includes a one-tap call button (on mobile), the website address, operating
          hours, and a brief description of the kind of help available. The{' '}
          <SEOInternalLink href="/tools/apprentice-training-app">
            apprentice training app
          </SEOInternalLink>{' '}
          also links to age-appropriate support services including Papyrus (for young people) and
          Childline.
        </p>
      </>
    ),
  },
  {
    id: 'industry-challenges',
    heading: 'Industry-Specific Mental Health Challenges',
    content: (
      <>
        <p>
          The Mental Health Hub includes educational content about the specific mental health
          challenges that tradespeople face. Understanding these challenges is the first step
          towards managing them effectively.
        </p>
        <p>
          The content covers financial pressure (particularly for{' '}
          <SEOInternalLink href="/guides/electrician-self-employed">
            self-employed electricians
          </SEOInternalLink>{' '}
          dealing with cash flow, late payments, and irregular income), work-related stress (tight
          deadlines, difficult clients, unsafe site conditions, and the responsibility of working
          with dangerous systems), isolation (lone working on domestic jobs, being the only
          electrician on a multi-trade site, and time away from family on distant projects), and
          physical health impacts (chronic pain, fatigue, the effect of physical demands on mood and
          motivation).
        </p>
        <p>
          For apprentices specifically, the content addresses exam stress, the pressure of balancing
          work and study, adjusting to a physically demanding job, and navigating workplace
          relationships as the youngest person on site. These are real challenges that many
          apprentices face but few feel comfortable discussing.
        </p>
        <p>
          Each topic includes practical strategies for managing the specific challenge, signs to
          watch for in yourself and colleagues, and guidance on when and how to seek professional
          help. The content is written in a straightforward, non-clinical style that respects the
          reader's intelligence and autonomy while providing genuinely useful information.
        </p>
        <SEOAppBridge
          title="Access mental health resources built for your industry"
          description="Resources that understand the real pressures of working in the electrical trade. Financial stress, isolation, physical demands, and workplace culture — all addressed with practical guidance."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MentalHealthHubPage() {
  return (
    <ToolTemplate
      title="Mental Health Hub for Tradespeople | Wellbeing Tools"
      description="Mental health and wellbeing resources designed for electricians and tradespeople. Self-assessment tools, mindfulness exercises, industry-specific support, and instant access to UK helplines including the Samaritans, Lighthouse Club, and Electrical Industries Charity."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wellbeing Resources"
      badgeIcon={Heart}
      heroTitle={
        <>
          Mental Health Hub:{' '}
          <span className="text-yellow-400">Wellbeing Tools for Tradespeople</span>
        </>
      }
      heroSubtitle="Self-assessment tools, mindfulness exercises, and instant access to industry support. Built specifically for the pressures electricians and tradespeople face every day. Completely private — your data is never shared."
      heroFeaturePills={[
        { icon: Activity, label: 'Self-Assessment' },
        { icon: Brain, label: 'Mindfulness' },
        { icon: Phone, label: 'Helplines' },
        { icon: Shield, label: 'Fully Private' },
      ]}
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="Mental Health Hub Features"
      featuresSubheading="Private wellbeing tools designed for the specific challenges electricians and tradespeople face. Self-assessment, mindfulness, support contacts, and industry-specific resources."
      howToSteps={howToSteps}
      howToHeading="How to Use the Mental Health Hub"
      howToDescription="Four ways to engage with your wellbeing. Assess, explore, access support, and track your progress."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Mental Health Hub"
      relatedPages={relatedPages}
      ctaHeading="Your Wellbeing Matters"
      ctaSubheading="Access private mental health resources designed for tradespeople. Self-assessment, mindfulness, and instant helpline access. 7-day free trial, cancel anytime."
      toolPath="/tools/mental-health-hub"
    />
  );
}
