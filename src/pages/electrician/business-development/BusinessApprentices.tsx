import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  GraduationCap,
  Users,
  FileText,
  BookOpen,
  Phone,
  Calculator,
  Target,
  Clock,
  TrendingUp,
  PoundSterling,
  Search,
  Brain,
  Shield,
  Award,
  CheckCircle,
  AlertTriangle,
  Heart,
  Globe,
  Mail,
  ExternalLink,
  Eye,
  BarChart3,
  Calendar,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  BusinessPageLayout,
  SectionNav,
  ContentBlock,
  DataGrid,
  InfoList,
} from '@/components/business-hub';

// Interactive tools imports
import EnhancedCostCalculator from '@/components/electrician/business-development/apprentices/interactive/EnhancedCostCalculator';
import DigitalSkillsAnalyser from '@/components/electrician/business-development/apprentices/interactive/DigitalSkillsAnalyser';
import TrainingScheduleOptimiser from '@/components/electrician/business-development/apprentices/interactive/TrainingScheduleOptimizer';
import ComplianceChecker from '@/components/electrician/business-development/apprentices/interactive/ComplianceChecker';

const BusinessApprentices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get('section') || 'recruitment';
  const setActiveSection = (section: string) => setSearchParams({ section }, { replace: true });
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'recruitment', label: 'Recruitment', icon: Users },
    { id: 'legal', label: 'Legal', icon: FileText },
    { id: 'training', label: 'Training', icon: BookOpen },
    { id: 'support', label: 'Support', icon: Phone },
    { id: 'assessment', label: 'Assessment', icon: GraduationCap },
    { id: 'tools', label: 'Tools', icon: Calculator },
  ];

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleSectionChange = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const canonical = `${window.location.origin}/electrician/business-development/apprentices`;

  // Key Stats Data
  const keyStats = [
    { label: 'SME Hire Incentive', value: 'Up to £2,000', sublabel: 'Ages 16-24, from Oct 2026', icon: PoundSterling },
    { label: 'Apprentice Wage', value: '£8.00/hr', sublabel: 'April 2026 minimum', icon: Users },
    { label: 'Full Qualification', value: '4 Years', sublabel: 'Typical training period', icon: BookOpen },
  ];

  // Recruitment Section Data
  const recruitmentMetrics = [
    { label: 'Time to Hire', value: '6-8 weeks', sublabel: 'Typical, quality candidates' },
    { label: 'Training Funding', value: '100%', sublabel: 'Eligible under-25s, small employers' },
    { label: "Employer NI", value: '£0', sublabel: 'Apprentices under 25' },
    { label: 'Cost Per Hire', value: '£1,200-2,500', sublabel: 'Typical total investment' },
  ];

  const recruitmentStrategies = [
    {
      title: 'Digital-First Approach',
      description:
        'Social media presence, video content, interactive applications, virtual open days. Attracts candidates where they already spend their time.',
    },
    {
      title: 'Partnership Ecosystem',
      description:
        'College partnerships, school career days, community groups, industry events. Lower cost per hire through trusted referrals.',
    },
    {
      title: 'Employer Brand Development',
      description:
        'Professional website, Google My Business, testimonials, industry awards. Candidates seek you out directly.',
    },
  ];

  const selectionFramework = [
    {
      title: 'Digital Pre-Screening (Week 1-2)',
      description:
        'Online skills assessment, video introductions, digital portfolio review. Filters 60-80% of applications efficiently.',
    },
    {
      title: 'Structured Interview (Week 3)',
      description:
        'Competency assessment, practical demonstration, scenario questions. Identifies candidates with highest success probability.',
    },
    {
      title: 'Final Selection & Onboarding (Week 4-5)',
      description:
        'DBS check, medical assessment, training provider liaison, mentor assignment. Ensures compliance from day one.',
    },
  ];

  // Legal Section Data
  const complianceMetrics = [
    { label: 'Underpayment Penalty', value: '200%', sublabel: 'Of wage arrears owed' },
    { label: 'Maximum Penalty', value: '£20,000', sublabel: 'Per underpaid worker' },
    { label: 'Off-the-Job Training', value: '6 hrs/week', sublabel: 'Legal minimum, in paid time' },
    { label: 'Progress Reviews', value: '12 weeks', sublabel: 'Recommended cycle' },
  ];

  const legalRequirements = [
    {
      title: 'Minimum Wage (April 2026 Rates)',
      description:
        'Apprentice rate £8.00/hour applies while under 19, or 19+ in the first year only. After that they must get their age rate: £10.85 (18-20) or £12.71 (21+). Underpayment penalty is 200% of arrears, up to £20,000 per worker, plus public naming.',
    },
    {
      title: 'Training Time Legal Requirements',
      description:
        'Minimum 6 hours per week off-the-job training in paid working time (replaced the old 20% rule). Detailed time tracking required. Regular progress reviews every 12 weeks minimum.',
    },
    {
      title: 'Health & Safety Framework',
      description:
        'Young worker risk assessments (under 18), CSCS card provision, electrical safety training, RIDDOR compliance. Zero tolerance for safety breaches.',
    },
  ];

  const criticalCompliance = [
    {
      title: 'Employment Contract',
      description:
        'Written statement within 2 months, apprenticeship agreement signed. Penalty: £20,000 tribunal + legal costs.',
    },
    {
      title: 'Minimum Wage',
      description:
        'Correct rates from day one with proper records. Penalty: £25,000 per worker + naming/shaming + back-pay.',
    },
    {
      title: 'H&S Training',
      description:
        'Site induction, PPE provision, young worker assessments. Penalty: Unlimited fines + potential imprisonment.',
    },
  ];

  // Training Section Data
  const trainingMetrics = [
    { label: 'Off-the-Job Training', value: '6 hrs/week', sublabel: 'Legal minimum' },
    { label: 'Skill Development', value: '36 months', sublabel: 'To full competency' },
    { label: 'AM2 / EPA', value: 'Final gate', sublabel: 'End-point assessment' },
    { label: 'Total Investment', value: '£12k-18k', sublabel: 'Typical, per apprentice' },
  ];

  const trainingFramework = [
    {
      title: 'Digital Foundation Phase (Months 1-6)',
      description:
        'VR safety training, blended online/classroom delivery, digital portfolio development, smart mentoring apps. Reduced training time while improving outcomes.',
    },
    {
      title: 'Applied Skills Development (Months 7-18)',
      description:
        'Smart building systems, EV charging infrastructure, renewable energy systems, advanced diagnostics. Future-ready skills commanding premium rates.',
    },
    {
      title: 'Professional Mastery & EPA (Months 19-36)',
      description:
        'Project management, comprehensive EPA prep, specialisation pathway, leadership skills. Qualified electrician ready for senior responsibilities.',
    },
  ];

  const trainingProviders = [
    {
      title: 'Digital-First Training Providers',
      description:
        'VR/AR modules, AI progress tracking, mobile-first learning. £4,500-7,000/year. 98% EPA first-time pass rate with comprehensive support.',
    },
    {
      title: 'Hybrid Learning Solutions',
      description:
        'Face-to-face practical + digital tools. Local FE colleges and CITB centres. £3,500-6,500/year. Strong local employer networks.',
    },
  ];

  // Support Section Data
  const supportMetrics = [
    { label: 'Response Target', value: '24 hours', sublabel: 'For critical concerns' },
    { label: 'Mentor Check-in', value: 'Weekly', sublabel: 'One-to-one, first year' },
    { label: 'Progress Reviews', value: '12 weeks', sublabel: 'Three-way with college' },
    { label: 'Wellbeing Support', value: '24/7', sublabel: 'Built into Elec-Mate' },
  ];

  const supportPlatforms = [
    {
      title: 'AI-Powered Support Hub (24/7)',
      description:
        '24/7 AI chatbot, smart routing to specialists, digital mental health screening, personalised recommendations. Reduces supervisor burden.',
    },
    {
      title: 'Crisis Intervention Network',
      description:
        'Direct counsellor hotline, emergency mediation, legal advice triage, safety assessment. Professional crisis management.',
    },
    {
      title: 'Peer & Community Networks',
      description:
        'Moderated online communities, local meetups, mentor matching, skills-sharing workshops. Stronger retention through belonging.',
    },
  ];

  const emergencyContacts = [
    {
      title: 'Apprenticeship Crisis Support',
      description:
        '0800 APPRENTICE (0800 277 736). Training disputes, workplace safety, employer conflicts. Immediate triage, callback within 2 hours.',
    },
    {
      title: 'Mental Health Crisis',
      description:
        'NHS 111 or Samaritans 116 123. Suicide prevention, mental health emergency, crisis counselling. 24/7 trained counsellors.',
    },
    {
      title: 'Workplace Safety Emergency',
      description:
        'HSE: 0345 300 9923. Immediate danger, serious injury, safety violations. Inspector response within 24 hours.',
    },
  ];

  // Assessment Section Data
  const assessmentMetrics = [
    { label: 'Gateway Reviews', value: '12 weeks', sublabel: 'Portfolio + practical' },
    { label: 'EPA Window', value: 'Month 15-18', sublabel: 'Of the final stage' },
    { label: 'Portfolio', value: 'Week 1', sublabel: 'Digital, from day one' },
    { label: 'Off-the-Job Log', value: '6 hrs/week', sublabel: 'Evidenced continuously' },
  ];

  const assessmentFramework = [
    {
      title: 'Digital Onboarding (Week 1-2)',
      description:
        'Interactive knowledge assessment (BS 7671), digital portfolio setup, H&S evaluation, functional skills diagnostic. Identifies skill gaps early.',
    },
    {
      title: 'Progress Gateway Reviews (Every 12 weeks)',
      description:
        'Practical demonstrations, portfolio evidence review, employer feedback, development planning. Track ROI and training needs.',
    },
    {
      title: 'EPA Gateway (Month 15-18)',
      description:
        'Portfolio validation, mock EPA assessment, professional discussion prep, knowledge verification. Confidence in readiness.',
    },
  ];

  const interventionStrategies = [
    {
      title: 'Assessment scores below 60%',
      description:
        'Skills gap analysis, additional college support, workplace mentor assignment, learning style assessment. Within 48 hours.',
    },
    {
      title: 'Poor portfolio engagement',
      description:
        'Digital skills training, simplified templates, peer mentoring, workplace evidence opportunities. Weekly review until improvement.',
    },
    {
      title: 'Employer concern reports',
      description:
        'Three-way meeting, workplace adjustment plan, additional supervision, skills reinforcement. Meeting within 5 days.',
    },
  ];

  // Tools Section Data
  const toolsMetrics = [
    { label: 'Year 1 Wage Floor', value: '£8.00/hr', sublabel: 'April 2026 apprentice rate' },
    { label: 'Hire Incentive', value: 'Up to £2,000', sublabel: 'SMEs, 16-24, from Oct 2026' },
    { label: 'Training Funding', value: '100%', sublabel: 'Eligible under-25s, small employers' },
    { label: 'Qualification', value: '4 years', sublabel: 'Typical to fully qualified' },
  ];

  return (
    <>
      <Helmet>
        <title>Apprentice Onboarding & Management | Elec-Mate</title>
        <meta
          name="description"
          content="Complete guide to recruiting, training, and supporting apprentices in your electrical contracting business."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BusinessPageLayout
        title="Onboarding Apprentices"
        subtitle="Complete guide to recruiting, training, and supporting apprentices"
        icon={GraduationCap}
        backUrl="/electrician/business-development"
        accentColor="yellow"
      >
        {/* Key Stats */}
        <DataGrid items={keyStats} columns={3} />

        {/* Section Navigation */}
        <SectionNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          accentColor="yellow"
        />

        {/* Content Area */}
        <div ref={contentRef} className="space-y-8">
          {/* RECRUITMENT SECTION */}
          <section id="recruitment" className="scroll-mt-20 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Users className="h-6 w-6 text-yellow-400" />
              Recruitment
            </h2>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-sm text-white">
                Strategic recruitment reduces time-to-hire by 40% and increases apprentice
                completion rates to 85%+.
              </p>
            </div>

            <DataGrid items={recruitmentMetrics} columns={4} />

            <ContentBlock
              title="Recruitment Strategy"
              icon={Target}
              accentColor="yellow"
              summary="Modern digital-first approach with partnership ecosystem and employer branding for maximum candidate quality."
            >
              <InfoList items={recruitmentStrategies} variant="numbered" />
            </ContentBlock>

            <ContentBlock
              title="Selection Framework"
              icon={Search}
              accentColor="yellow"
              summary="Three-stage process from digital pre-screening through structured interviews to final onboarding."
            >
              <InfoList items={selectionFramework} variant="numbered" />
            </ContentBlock>

            <ContentBlock
              title="Digital Recruitment Channels"
              icon={Brain}
              accentColor="yellow"
              summary="Government portals, social media, and professional networks for comprehensive candidate reach."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">
                    Government Digital Gateway
                  </h4>
                  <p className="text-xs text-white">
                    Find an Apprenticeship (Gov.uk) - Free automated matching and application
                    tracking
                  </p>
                  <p className="text-xs text-white">
                    Apprenticeship Service Portal - Employer dashboard for vacancy and provider
                    management
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">
                    Social & Professional Networks
                  </h4>
                  <p className="text-xs text-white">
                    LinkedIn Business (£150-400/month) - Skills-based targeting and employer
                    branding
                  </p>
                  <p className="text-xs text-white">
                    TikTok For Business (£200-500/month) - Gen Z recruitment through authentic video
                    content
                  </p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Investment Analysis"
              icon={PoundSterling}
              accentColor="yellow"
              summary="Initial recruitment investment vs. government support — the incentives often cover most of the hiring cost."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Recruitment Costs</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>Job advertising: £800-1,500/campaign</li>
                    <li>Assessment tools: £300-600/year</li>
                    <li>Interview resources: £400-800/hire</li>
                    <li>Background checks: £200-400/hire</li>
                    <li className="font-medium text-white pt-1">Total: £1,700-3,300/hire</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                  <h4 className="text-sm font-medium text-white mb-2">Government Support</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>16-18 hire payment: £1,000 (via provider)</li>
                    <li>SME incentive: up to £2,000 (16-24, from Oct 2026)</li>
                    <li>Training funding: 100% eligible under-25s</li>
                    <li>Employer NI: £0 for apprentices under 25</li>
                    <li className="font-medium text-yellow-300 pt-1">Support often covers hire costs</li>
                  </ul>
                </div>
              </div>
            </ContentBlock>
          </section>

          {/* LEGAL SECTION */}
          <section id="legal" className="scroll-mt-20 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <FileText className="h-6 w-6 text-yellow-400" />
              Legal Requirements
            </h2>

            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                Legal compliance is strictly enforced with severe penalties. Proper systems prevent
                90% of violations.
              </p>
            </div>

            <DataGrid items={complianceMetrics} columns={4} />

            <ContentBlock
              title="Legal Framework (2026/27)"
              icon={Shield}
              accentColor="yellow"
              summary="Wage requirements, training time obligations, and health & safety framework with strict enforcement."
            >
              <InfoList items={legalRequirements} variant="default" />
            </ContentBlock>

            <ContentBlock
              title="Critical Compliance Requirements"
              icon={AlertTriangle}
              accentColor="yellow"
              summary="Immediate action required items with significant penalty risks. Employment contracts, wages, and H&S training."
            >
              <InfoList items={criticalCompliance} variant="default" />
            </ContentBlock>

            <ContentBlock
              title="Government Support & Guidance"
              icon={CheckCircle}
              accentColor="yellow"
              summary="Free compliance guidance from ACAS, CITB safety training, and financial incentives available."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Compliance Support</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>ACAS Employment Law Guidance (Free)</li>
                    <li>CITB Safety Training (Subsidised)</li>
                    <li>Phone, online, face-to-face consultations</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                  <h4 className="text-sm font-medium text-white mb-2">Financial Incentives</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>£1,000 for 16-18s (and eligible 19-24s)</li>
                    <li>Up to £2,000 SME incentive from Oct 2026</li>
                    <li>100% training funding, eligible under-25s</li>
                  </ul>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Regional Compliance Variations"
              icon={Globe}
              accentColor="yellow"
              summary="Different authorities and requirements across England, Scotland, Wales, and Northern Ireland."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-xs font-medium text-white">England - ESFA</h4>
                  <p className="text-xs text-white">
                    Levy compliance, ESFA rules, Ofsted readiness
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-xs font-medium text-white">Scotland - SDS</h4>
                  <p className="text-xs text-white">
                    Scottish standards, enhanced funding rates
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-xs font-medium text-white">Wales - Welsh Gov</h4>
                  <p className="text-xs text-white">Working Wales standards, Welsh language</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-xs font-medium text-white">N. Ireland - DfE</h4>
                  <p className="text-xs text-white">Apprenticeship NI, separate system</p>
                </div>
              </div>
            </ContentBlock>
          </section>

          {/* TRAINING SECTION */}
          <section id="training" className="scroll-mt-20 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-yellow-400" />
              Training & Development
            </h2>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-sm text-white">
                Modern training approaches improve apprentice completion rates by 25% and reduce
                time to competency.
              </p>
            </div>

            <DataGrid items={trainingMetrics} columns={4} />

            <ContentBlock
              title="Training Framework"
              icon={Target}
              accentColor="yellow"
              summary="Three-phase approach from digital foundation through applied skills to professional mastery and EPA."
            >
              <InfoList items={trainingFramework} variant="numbered" />
            </ContentBlock>

            <ContentBlock
              title="Training Provider Options"
              icon={BookOpen}
              accentColor="yellow"
              summary="Digital-first providers with VR/AR modules or hybrid learning solutions with local colleges."
            >
              <InfoList items={trainingProviders} variant="default" />
            </ContentBlock>

            <ContentBlock
              title="Skills Progression Framework"
              icon={Award}
              accentColor="yellow"
              summary="Structured progression across safety leadership, technical excellence, and business & customer focus."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Safety Leadership</h4>
                  <p className="text-xs text-white">
                    Foundation: H&S awareness, PPE competency, risk identification
                  </p>
                  <p className="text-xs text-white">
                    Practitioner: Risk assessment creation, safety training delivery
                  </p>
                  <p className="text-xs text-white">
                    Expert: Safety culture development, policy creation, audits
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Technical Excellence</h4>
                  <p className="text-xs text-white">
                    Foundation: Basic theory, simple circuits, basic testing
                  </p>
                  <p className="text-xs text-white">
                    Practitioner: Complex design, advanced testing, fault diagnosis
                  </p>
                  <p className="text-xs text-white">
                    Expert: System design, innovation projects, technical mentoring
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Business & Customer Focus</h4>
                  <p className="text-xs text-white">
                    Foundation: Customer service basics, communication skills
                  </p>
                  <p className="text-xs text-white">
                    Practitioner: Consultation, quote preparation, project management
                  </p>
                  <p className="text-xs text-white">
                    Expert: Business development, team leadership, process improvement
                  </p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Modern Mentoring Approaches"
              icon={Users}
              accentColor="yellow"
              summary="Digital mentoring platforms, structured competency pathways, and industry exposure programmes."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Digital Mentoring Platform</h4>
                  <p className="text-xs text-white">
                    Daily progress logging, video coaching, AI recommendations, peer networking. 40%
                    improvement in engagement.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Structured Competency Pathways</h4>
                  <p className="text-xs text-white">
                    Skills matrix, monthly assessments, personalised planning, recognition systems.
                    Faster skill development.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Industry Exposure Programme</h4>
                  <p className="text-xs text-white">
                    Project rotation, industry events, guest experts, tech demonstrations. Broader
                    skills base.
                  </p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Training Investment Analysis"
              icon={PoundSterling}
              accentColor="yellow"
              summary="Direct costs (mostly government funded) and indirect costs (mentor time, productivity, equipment)."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Direct Training Costs</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>Provider fees: £4,500-7,000/year (95-100% funded)</li>
                    <li>Assessment/EPA: £1,500-2,500 total</li>
                    <li>Materials: £800-1,200/year</li>
                    <li>Digital platforms: £300-600/year</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Indirect Costs</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>Mentor time: £6,000-9,000/year</li>
                    <li>Reduced productivity (Year 1): £3,000-5,000</li>
                    <li>Equipment/tools: £1,500-2,500 total</li>
                    <li>Travel/accommodation: £500-1,000/year</li>
                  </ul>
                </div>
              </div>
            </ContentBlock>
          </section>

          {/* SUPPORT SECTION */}
          <section id="support" className="scroll-mt-20 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Phone className="h-6 w-6 text-yellow-400" />
              Support Resources
            </h2>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-sm text-white flex items-center gap-2">
                <Heart className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                Early support intervention prevents 75% of apprentice failures. Getting help quickly
                makes all the difference.
              </p>
            </div>

            <DataGrid items={supportMetrics} columns={4} />

            <ContentBlock
              title="Digital Support Platforms"
              icon={Brain}
              accentColor="yellow"
              summary="AI-powered support hub, crisis intervention network, and peer community networks for comprehensive coverage."
            >
              <InfoList items={supportPlatforms} variant="default" />
            </ContentBlock>

            <ContentBlock
              title="Support Service Categories"
              icon={Users}
              accentColor="yellow"
              summary="Professional & career support, personal & mental wellbeing, and legal & employment rights."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">
                    Professional & Career Support
                  </h4>
                  <p className="text-xs text-white">
                    Career development guidance from CITB, industry mentorship, professional bodies.
                    Skills development support from training providers and employer coordinators.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">
                    Personal & Mental Wellbeing
                  </h4>
                  <p className="text-xs text-white">
                    NHS psychological services, industry wellbeing programmes, employer assistance.
                    Financial guidance from Citizens Advice and hardship funds.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Legal & Employment Rights</h4>
                  <p className="text-xs text-white">
                    ACAS, trade unions, employment law specialists. Training & assessment support
                    from Apprenticeship Support Service and Ofsted.
                  </p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Emergency & Crisis Support"
              icon={Phone}
              accentColor="yellow"
              summary="Critical contact numbers for apprenticeship crises, mental health emergencies, and workplace safety incidents."
            >
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <h4 className="text-sm font-medium text-white">{contact.title}</h4>
                    <p className="text-xs text-white mt-1">{contact.description}</p>
                  </div>
                ))}
              </div>
            </ContentBlock>

            <ContentBlock
              title="Digital Support Resources"
              icon={Globe}
              accentColor="yellow"
              summary="Government and industry-specific digital platforms for ongoing support and guidance."
            >
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/20 text-left h-auto p-3 hover:border-yellow-400/40"
                  onClick={() =>
                    openExternalUrl('https://apprenticeshipsupport.apprenticeships.gov.uk')
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-3 text-yellow-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-sm text-white">Apprenticeship Support Service Portal</div>
                    <div className="text-xs text-white">
                      Live chat, resource library, progress tracking
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/20 text-left h-auto p-3 hover:border-yellow-400/40"
                  onClick={() =>
                    openExternalUrl('https://www.citb.co.uk/apprentices/support')
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-3 text-yellow-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-sm text-white">CITB Apprentice Support Hub</div>
                    <div className="text-xs text-white">
                      Career guidance, training support, financial assistance
                    </div>
                  </div>
                </Button>
              </div>
            </ContentBlock>
          </section>

          {/* ASSESSMENT SECTION */}
          <section id="assessment" className="scroll-mt-20 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-yellow-400" />
              Assessment & Progress
            </h2>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-sm text-white flex items-center gap-2">
                <Eye className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                Effective assessment tracking increases completion rates by 19% and provides clear
                ROI visibility.
              </p>
            </div>

            <DataGrid items={assessmentMetrics} columns={4} />

            <ContentBlock
              title="Assessment Framework"
              icon={Target}
              accentColor="yellow"
              summary="Digital onboarding assessment, progress gateway reviews, and EPA gateway preparation."
            >
              <InfoList items={assessmentFramework} variant="numbered" />
            </ContentBlock>

            <ContentBlock
              title="Digital Assessment Tools"
              icon={Brain}
              accentColor="yellow"
              summary="EPA-aligned platforms and performance analytics for comprehensive progress tracking."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-white">Skills Bank Pro</h4>
                    <span className="text-xs text-yellow-400">£25/month</span>
                  </div>
                  <p className="text-xs text-white">
                    EPA-aligned digital assessment. Real-time tracking, automated reporting,
                    competency mapping. Reduces admin by 60%.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-white">OneFile Portfolio</h4>
                    <span className="text-xs text-yellow-400">£20/month</span>
                  </div>
                  <p className="text-xs text-white">
                    Industry-standard digital portfolio. Mobile evidence capture, supervisor
                    sign-off, progress analytics.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-white">
                      Apprentice Insights Dashboard
                    </h4>
                    <span className="text-xs text-yellow-400">£150/month</span>
                  </div>
                  <p className="text-xs text-white">
                    Real-time employer monitoring. Progress visualisation, risk alerts, ROI
                    tracking. Early intervention enabled.
                  </p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="College Performance Monitoring"
              icon={Award}
              accentColor="yellow"
              summary="Teaching quality, assessment standards, and support systems benchmarks for provider evaluation."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Teaching Quality</h4>
                  <p className="text-xs text-white">
                    Look for Good/Outstanding Ofsted, 85%+ pass rates, high student satisfaction,
                    strong industry partnerships.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Assessment Standards</h4>
                  <p className="text-xs text-white">
                    Target 80%+ EPA pass rate, 95%+ portfolio completion, efficient time to gateway,
                    consistent assessment.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Support Systems</h4>
                  <p className="text-xs text-white">
                    Same-day employer query response, strong apprentice support, effective digital
                    platforms, weekly progress updates.
                  </p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Early Intervention Strategies"
              icon={AlertTriangle}
              accentColor="yellow"
              summary="Trigger-based intervention protocols for assessment issues, engagement problems, and employer concerns."
            >
              <InfoList items={interventionStrategies} variant="default" />
            </ContentBlock>
          </section>

          {/* TOOLS SECTION */}
          <section id="tools" className="scroll-mt-20 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Calculator className="h-6 w-6 text-yellow-400" />
              Interactive Tools
            </h2>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-sm text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                Tools for apprentice planning, cost optimisation, and compliance
                management.
              </p>
            </div>

            <DataGrid items={toolsMetrics} columns={4} />

            <ContentBlock
              title="Advanced Cost Calculator"
              icon={Calculator}
              accentColor="yellow"
              summary="Calculate total apprentice investment including government incentives, training costs, and ROI projections."
            >
              <EnhancedCostCalculator />
            </ContentBlock>

            <ContentBlock
              title="Skills Gap Analyser"
              icon={Brain}
              accentColor="yellow"
              summary="Assess current competencies and identify development priorities for individual apprentices."
            >
              <DigitalSkillsAnalyser />
            </ContentBlock>

            <ContentBlock
              title="Training Schedule Optimiser"
              icon={Calendar}
              accentColor="yellow"
              summary="Plan and optimise off-the-job training time allocation for maximum efficiency."
            >
              <TrainingScheduleOptimiser />
            </ContentBlock>

            <ContentBlock
              title="Compliance Checker"
              icon={Shield}
              accentColor="yellow"
              summary="Verify legal compliance status across employment, training, and health & safety requirements."
            >
              <ComplianceChecker />
            </ContentBlock>

            <ContentBlock
              title="Business Impact Summary"
              icon={TrendingUp}
              accentColor="yellow"
              summary="Financial benefits, operational advantages, and strategic impact of apprentice programmes."
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Financial Benefits</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>Wage costs well below qualified rates</li>
                    <li>Up to £3,000 in combined incentives</li>
                    <li>Training costs largely or fully funded</li>
                    <li>No agency fees on future hires</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Operational Advantages</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>Skills tailored to needs</li>
                    <li>Higher retention rates</li>
                    <li>Improved company culture</li>
                    <li>Knowledge transfer</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Strategic Impact</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>Future workforce dev</li>
                    <li>Recruitment advantage</li>
                    <li>Fresh perspectives</li>
                    <li>Succession planning</li>
                  </ul>
                </div>
              </div>
            </ContentBlock>
          </section>
        </div>

        {/* Support Footer Card */}
        <div className="mt-8 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-yellow-400/20">
              <Phone className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Need Additional Support?</h3>
              <p className="text-xs text-white leading-relaxed">
                Managing apprentices successfully requires ongoing support. Contact CITB, local
                training providers, or government resources for help with recruitment, training, or
                compliance.
              </p>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default BusinessApprentices;
