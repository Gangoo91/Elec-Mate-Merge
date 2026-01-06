import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BusinessPageLayout,
  SectionNav,
  ContentBlock,
  DataGrid,
  InfoList
} from "@/components/business-hub";

// Interactive tools imports
import EnhancedCostCalculator from "@/components/electrician/business-development/apprentices/interactive/EnhancedCostCalculator";
import DigitalSkillsAnalyser from "@/components/electrician/business-development/apprentices/interactive/DigitalSkillsAnalyser";
import TrainingScheduleOptimiser from "@/components/electrician/business-development/apprentices/interactive/TrainingScheduleOptimizer";
import ComplianceChecker from "@/components/electrician/business-development/apprentices/interactive/ComplianceChecker";

const BusinessApprentices = () => {
  const [activeSection, setActiveSection] = useState("recruitment");
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "recruitment", label: "Recruitment", icon: Users },
    { id: "legal", label: "Legal", icon: FileText },
    { id: "training", label: "Training", icon: BookOpen },
    { id: "support", label: "Support", icon: Phone },
    { id: "assessment", label: "Assessment", icon: GraduationCap },
    { id: "tools", label: "Tools", icon: Calculator },
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
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
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
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const canonical = `${window.location.origin}/electrician/business-development/apprentices`;

  // Key Stats Data
  const keyStats = [
    { label: "Gov Incentive", value: "£3,000", sublabel: "Per apprentice", icon: PoundSterling },
    { label: "Retention Rate", value: "85%", sublabel: "Well-managed", icon: Users },
    { label: "Full Qualification", value: "4 Years", sublabel: "Training period", icon: BookOpen },
  ];

  // Recruitment Section Data
  const recruitmentMetrics = [
    { label: "Time to Hire", value: "6-8 weeks", sublabel: "Quality candidates" },
    { label: "ROI", value: "£7.50/£1", sublabel: "Investment return" },
    { label: "Success Rate", value: "85%", sublabel: "Structured hiring" },
    { label: "Cost Per Hire", value: "£1,200-2,500", sublabel: "Total investment" },
  ];

  const recruitmentStrategies = [
    {
      title: "Digital-First Approach",
      description: "Social media presence, video content, interactive applications, virtual open days. Attracts tech-savvy candidates and reduces recruitment timeline by 30%."
    },
    {
      title: "Partnership Ecosystem",
      description: "College partnerships, school career days, community groups, industry events. Lower cost per hire through trusted referrals."
    },
    {
      title: "Employer Brand Development",
      description: "Professional website, Google My Business, testimonials, industry awards. Candidates seek you out directly."
    },
  ];

  const selectionFramework = [
    {
      title: "Digital Pre-Screening (Week 1-2)",
      description: "Online skills assessment, video introductions, digital portfolio review. Filters 60-80% of applications efficiently."
    },
    {
      title: "Structured Interview (Week 3)",
      description: "Competency assessment, practical demonstration, scenario questions. Identifies candidates with highest success probability."
    },
    {
      title: "Final Selection & Onboarding (Week 4-5)",
      description: "DBS check, medical assessment, training provider liaison, mentor assignment. Ensures compliance from day one."
    },
  ];

  // Legal Section Data
  const complianceMetrics = [
    { label: "Non-Compliance Risk", value: "15%", sublabel: "Face penalties annually" },
    { label: "Average Penalty", value: "£12,500", sublabel: "Per violation" },
    { label: "Compliance ROI", value: "£4.50/£1", sublabel: "Investment return" },
    { label: "Time to Comply", value: "4-6 weeks", sublabel: "Structured approach" },
  ];

  const legalRequirements = [
    {
      title: "2025 Minimum Wage Requirements",
      description: "Apprentice rate: £7.00/hour (first year or under 19). 18-20: £12.21/hour (after first year). Automatic penalties up to £25,000 per worker for underpayment."
    },
    {
      title: "Training Time Legal Requirements",
      description: "Minimum 20% off-the-job training. Detailed time tracking required. Regular progress reviews every 12 weeks minimum."
    },
    {
      title: "Health & Safety Framework",
      description: "Young worker risk assessments (under 18), CSCS card provision, electrical safety training, RIDDOR compliance. Zero tolerance for safety breaches."
    },
  ];

  const criticalCompliance = [
    {
      title: "Employment Contract",
      description: "Written statement within 2 months, apprenticeship agreement signed. Penalty: £20,000 tribunal + legal costs."
    },
    {
      title: "Minimum Wage",
      description: "Correct rates from day one with proper records. Penalty: £25,000 per worker + naming/shaming + back-pay."
    },
    {
      title: "H&S Training",
      description: "Site induction, PPE provision, young worker assessments. Penalty: Unlimited fines + potential imprisonment."
    },
  ];

  // Training Section Data
  const trainingMetrics = [
    { label: "Training ROI", value: "£4.20/£1", sublabel: "Investment return" },
    { label: "Skill Development", value: "36 months", sublabel: "Full competency" },
    { label: "Retention Rate", value: "92%", sublabel: "With proper support" },
    { label: "Total Investment", value: "£12k-18k", sublabel: "Per apprentice" },
  ];

  const trainingFramework = [
    {
      title: "Digital Foundation Phase (Months 1-6)",
      description: "VR safety training, blended online/classroom delivery, digital portfolio development, smart mentoring apps. Reduced training time while improving outcomes."
    },
    {
      title: "Applied Skills Development (Months 7-18)",
      description: "Smart building systems, EV charging infrastructure, renewable energy systems, advanced diagnostics. Future-ready skills commanding premium rates."
    },
    {
      title: "Professional Mastery & EPA (Months 19-36)",
      description: "Project management, comprehensive EPA prep, specialisation pathway, leadership skills. Qualified electrician ready for senior responsibilities."
    },
  ];

  const trainingProviders = [
    {
      title: "Digital-First Training Providers",
      description: "VR/AR modules, AI progress tracking, mobile-first learning. £4,500-7,000/year. 98% EPA first-time pass rate with comprehensive support."
    },
    {
      title: "Hybrid Learning Solutions",
      description: "Face-to-face practical + digital tools. Local FE colleges and CITB centres. £3,500-6,500/year. Strong local employer networks."
    },
  ];

  // Support Section Data
  const supportMetrics = [
    { label: "Early Support Impact", value: "75%", sublabel: "Dropout reduction" },
    { label: "Response Time", value: "24 hours", sublabel: "Critical needs" },
    { label: "Issue Resolution", value: "90%", sublabel: "Within one week" },
    { label: "Mental Health ROI", value: "£5.20/£1", sublabel: "Wellbeing investment" },
  ];

  const supportPlatforms = [
    {
      title: "AI-Powered Support Hub (24/7)",
      description: "24/7 AI chatbot, smart routing to specialists, digital mental health screening, personalised recommendations. Reduces supervisor burden."
    },
    {
      title: "Crisis Intervention Network",
      description: "Direct counsellor hotline, emergency mediation, legal advice triage, safety assessment. Professional crisis management."
    },
    {
      title: "Peer & Community Networks",
      description: "Moderated online communities, local meetups, mentor matching, skills-sharing workshops. Stronger retention through belonging."
    },
  ];

  const emergencyContacts = [
    {
      title: "Apprenticeship Crisis Support",
      description: "0800 APPRENTICE (0800 277 736). Training disputes, workplace safety, employer conflicts. Immediate triage, callback within 2 hours."
    },
    {
      title: "Mental Health Crisis",
      description: "NHS 111 or Samaritans 116 123. Suicide prevention, mental health emergency, crisis counselling. 24/7 trained counsellors."
    },
    {
      title: "Workplace Safety Emergency",
      description: "HSE: 0345 300 9923. Immediate danger, serious injury, safety violations. Inspector response within 24 hours."
    },
  ];

  // Assessment Section Data
  const assessmentMetrics = [
    { label: "Completion Rate", value: "87%", sublabel: "With structured assessment" },
    { label: "College Support", value: "95%", sublabel: "Rated good/excellent" },
    { label: "Employer ROI", value: "£7.50/£1", sublabel: "Assessment tracking" },
    { label: "Time Saved", value: "3-4 months", sublabel: "To independence" },
  ];

  const assessmentFramework = [
    {
      title: "Digital Onboarding (Week 1-2)",
      description: "Interactive knowledge assessment (BS 7671), digital portfolio setup, H&S evaluation, functional skills diagnostic. Identifies skill gaps early."
    },
    {
      title: "Progress Gateway Reviews (Every 12 weeks)",
      description: "Practical demonstrations, portfolio evidence review, employer feedback, development planning. Track ROI and training needs."
    },
    {
      title: "EPA Gateway (Month 15-18)",
      description: "Portfolio validation, mock EPA assessment, professional discussion prep, knowledge verification. Confidence in readiness."
    },
  ];

  const interventionStrategies = [
    {
      title: "Assessment scores below 60%",
      description: "Skills gap analysis, additional college support, workplace mentor assignment, learning style assessment. Within 48 hours."
    },
    {
      title: "Poor portfolio engagement",
      description: "Digital skills training, simplified templates, peer mentoring, workplace evidence opportunities. Weekly review until improvement."
    },
    {
      title: "Employer concern reports",
      description: "Three-way meeting, workplace adjustment plan, additional supervision, skills reinforcement. Meeting within 5 days."
    },
  ];

  // Tools Section Data
  const toolsMetrics = [
    { label: "Cost per Qualified", value: "£68,000", sublabel: "-12% vs. external" },
    { label: "Time to Competency", value: "18 months", sublabel: "3 months faster" },
    { label: "ROI After 5 Years", value: "287%", sublabel: "+15% with 2025 rates" },
    { label: "Success Improvement", value: "23%", sublabel: "Digital tools" },
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
      >
        {/* Key Stats */}
        <DataGrid items={keyStats} columns={3} />

        {/* Section Navigation */}
        <SectionNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        {/* Content Area */}
        <div ref={contentRef} className="space-y-8">

          {/* RECRUITMENT SECTION */}
          <section id="recruitment" className="scroll-mt-20 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Users className="h-6 w-6 text-yellow-400" />
              Recruitment
            </h2>

            <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
              <p className="text-sm text-white/80">
                Strategic recruitment reduces time-to-hire by 40% and increases apprentice completion rates to 85%+.
              </p>
            </div>

            <DataGrid items={recruitmentMetrics} columns={4} />

            <ContentBlock
              title="2025 Recruitment Strategy"
              icon={Target}
              summary="Modern digital-first approach with partnership ecosystem and employer branding for maximum candidate quality."
            >
              <InfoList items={recruitmentStrategies} variant="numbered" />
            </ContentBlock>

            <ContentBlock
              title="Selection Framework"
              icon={Search}
              summary="Three-stage process from digital pre-screening through structured interviews to final onboarding."
            >
              <InfoList items={selectionFramework} variant="numbered" />
            </ContentBlock>

            <ContentBlock
              title="Digital Recruitment Channels"
              icon={Brain}
              summary="Government portals, social media, and professional networks for comprehensive candidate reach."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Government Digital Gateway</h4>
                  <p className="text-xs text-white/80">Find an Apprenticeship (Gov.uk) - Free automated matching and application tracking</p>
                  <p className="text-xs text-white/80">Apprenticeship Service Portal - Employer dashboard for vacancy and provider management</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Social & Professional Networks</h4>
                  <p className="text-xs text-white/80">LinkedIn Business (£150-400/month) - Skills-based targeting and employer branding</p>
                  <p className="text-xs text-white/80">TikTok For Business (£200-500/month) - Gen Z recruitment through authentic video content</p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Investment Analysis"
              icon={PoundSterling}
              summary="Initial recruitment investment vs. government support - often results in net positive ROI."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Recruitment Costs</h4>
                  <ul className="space-y-1 text-xs text-white/80">
                    <li>Job advertising: £800-1,500/campaign</li>
                    <li>Assessment tools: £300-600/year</li>
                    <li>Interview resources: £400-800/hire</li>
                    <li>Background checks: £200-400/hire</li>
                    <li className="font-medium text-white/80 pt-1">Total: £1,700-3,300/hire</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                  <h4 className="text-sm font-medium text-white mb-2">Government Support</h4>
                  <ul className="space-y-1 text-xs text-white/80">
                    <li>16-18 incentive: £3,000/apprentice</li>
                    <li>Small employer bonus: £1,000</li>
                    <li>Training funding: 95-100%</li>
                    <li>Levy offset: £15,000/year</li>
                    <li className="font-medium text-yellow-300 pt-1">Often net positive ROI</li>
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
              <p className="text-sm text-white/80 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                Legal compliance is strictly enforced with severe penalties. Proper systems prevent 90% of violations.
              </p>
            </div>

            <DataGrid items={complianceMetrics} columns={4} />

            <ContentBlock
              title="2025 Legal Framework"
              icon={Shield}
              summary="Wage requirements, training time obligations, and health & safety framework with strict enforcement."
            >
              <InfoList items={legalRequirements} variant="default" />
            </ContentBlock>

            <ContentBlock
              title="Critical Compliance Requirements"
              icon={AlertTriangle}
              summary="Immediate action required items with significant penalty risks. Employment contracts, wages, and H&S training."
            >
              <InfoList items={criticalCompliance} variant="default" />
            </ContentBlock>

            <ContentBlock
              title="Government Support & Guidance"
              icon={CheckCircle}
              summary="Free compliance guidance from ACAS, CITB safety training, and financial incentives available."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Compliance Support</h4>
                  <ul className="space-y-1 text-xs text-white/80">
                    <li>ACAS Employment Law Guidance (Free)</li>
                    <li>CITB Safety Training (Subsidised)</li>
                    <li>Phone, online, face-to-face consultations</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                  <h4 className="text-sm font-medium text-white mb-2">Financial Incentives</h4>
                  <ul className="space-y-1 text-xs text-white/80">
                    <li>£3,000 for 16-18 year olds</li>
                    <li>£1,500 for 19-24 year olds</li>
                    <li>95-100% training funding</li>
                  </ul>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Regional Compliance Variations"
              icon={Globe}
              summary="Different authorities and requirements across England, Scotland, Wales, and Northern Ireland."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-xs font-medium text-white">England - ESFA</h4>
                  <p className="text-xs text-white/70">Levy compliance, ESFA rules, Ofsted readiness</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-xs font-medium text-white">Scotland - SDS</h4>
                  <p className="text-xs text-white/70">Scottish standards, enhanced funding rates</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-xs font-medium text-white">Wales - Welsh Gov</h4>
                  <p className="text-xs text-white/70">Working Wales standards, Welsh language</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-xs font-medium text-white">N. Ireland - DfE</h4>
                  <p className="text-xs text-white/70">Apprenticeship NI, separate system</p>
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

            <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
              <p className="text-sm text-white/80">
                Modern training approaches improve apprentice completion rates by 25% and reduce time to competency.
              </p>
            </div>

            <DataGrid items={trainingMetrics} columns={4} />

            <ContentBlock
              title="2025 Training Framework"
              icon={Target}
              summary="Three-phase approach from digital foundation through applied skills to professional mastery and EPA."
            >
              <InfoList items={trainingFramework} variant="numbered" />
            </ContentBlock>

            <ContentBlock
              title="Training Provider Options"
              icon={BookOpen}
              summary="Digital-first providers with VR/AR modules or hybrid learning solutions with local colleges."
            >
              <InfoList items={trainingProviders} variant="default" />
            </ContentBlock>

            <ContentBlock
              title="Skills Progression Framework"
              icon={Award}
              summary="Structured progression across safety leadership, technical excellence, and business & customer focus."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Safety Leadership</h4>
                  <p className="text-xs text-white/80">Foundation: H&S awareness, PPE competency, risk identification</p>
                  <p className="text-xs text-white/80">Practitioner: Risk assessment creation, safety training delivery</p>
                  <p className="text-xs text-white/80">Expert: Safety culture development, policy creation, audits</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Technical Excellence</h4>
                  <p className="text-xs text-white/80">Foundation: Basic theory, simple circuits, basic testing</p>
                  <p className="text-xs text-white/80">Practitioner: Complex design, advanced testing, fault diagnosis</p>
                  <p className="text-xs text-white/80">Expert: System design, innovation projects, technical mentoring</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Business & Customer Focus</h4>
                  <p className="text-xs text-white/80">Foundation: Customer service basics, communication skills</p>
                  <p className="text-xs text-white/80">Practitioner: Consultation, quote preparation, project management</p>
                  <p className="text-xs text-white/80">Expert: Business development, team leadership, process improvement</p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Modern Mentoring Approaches"
              icon={Users}
              summary="Digital mentoring platforms, structured competency pathways, and industry exposure programmes."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Digital Mentoring Platform</h4>
                  <p className="text-xs text-white/80">Daily progress logging, video coaching, AI recommendations, peer networking. 40% improvement in engagement.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Structured Competency Pathways</h4>
                  <p className="text-xs text-white/80">Skills matrix, monthly assessments, personalised planning, recognition systems. Faster skill development.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Industry Exposure Programme</h4>
                  <p className="text-xs text-white/80">Project rotation, industry events, guest experts, tech demonstrations. Broader skills base.</p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Training Investment Analysis"
              icon={PoundSterling}
              summary="Direct costs (mostly government funded) and indirect costs (mentor time, productivity, equipment)."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Direct Training Costs</h4>
                  <ul className="space-y-1 text-xs text-white/80">
                    <li>Provider fees: £4,500-7,000/year (95-100% funded)</li>
                    <li>Assessment/EPA: £1,500-2,500 total</li>
                    <li>Materials: £800-1,200/year</li>
                    <li>Digital platforms: £300-600/year</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Indirect Costs</h4>
                  <ul className="space-y-1 text-xs text-white/80">
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

            <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
              <p className="text-sm text-white/80 flex items-center gap-2">
                <Heart className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                Early support intervention prevents 75% of apprentice failures. Getting help quickly makes all the difference.
              </p>
            </div>

            <DataGrid items={supportMetrics} columns={4} />

            <ContentBlock
              title="2025 Digital Support Platforms"
              icon={Brain}
              summary="AI-powered support hub, crisis intervention network, and peer community networks for comprehensive coverage."
            >
              <InfoList items={supportPlatforms} variant="default" />
            </ContentBlock>

            <ContentBlock
              title="Support Service Categories"
              icon={Users}
              summary="Professional & career support, personal & mental wellbeing, and legal & employment rights."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Professional & Career Support</h4>
                  <p className="text-xs text-white/80">Career development guidance from CITB, industry mentorship, professional bodies. Skills development support from training providers and employer coordinators.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Personal & Mental Wellbeing</h4>
                  <p className="text-xs text-white/80">NHS psychological services, industry wellbeing programmes, employer assistance. Financial guidance from Citizens Advice and hardship funds.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">Legal & Employment Rights</h4>
                  <p className="text-xs text-white/80">ACAS, trade unions, employment law specialists. Training & assessment support from Apprenticeship Support Service and Ofsted.</p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Emergency & Crisis Support"
              icon={Phone}
              summary="Critical contact numbers for apprenticeship crises, mental health emergencies, and workplace safety incidents."
            >
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h4 className="text-sm font-medium text-white">{contact.title}</h4>
                    <p className="text-xs text-white/70 mt-1">{contact.description}</p>
                  </div>
                ))}
              </div>
            </ContentBlock>

            <ContentBlock
              title="Digital Support Resources"
              icon={Globe}
              summary="Government and industry-specific digital platforms for ongoing support and guidance."
            >
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/20 text-left h-auto p-3 hover:border-yellow-400/40"
                  onClick={() => window.open('https://apprenticeshipsupport.apprenticeships.gov.uk', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-3 text-yellow-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-sm text-white">Apprenticeship Support Service Portal</div>
                    <div className="text-xs text-white/70">Live chat, resource library, progress tracking</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/20 text-left h-auto p-3 hover:border-yellow-400/40"
                  onClick={() => window.open('https://www.citb.co.uk/apprentices/support', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-3 text-yellow-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-sm text-white">CITB Apprentice Support Hub</div>
                    <div className="text-xs text-white/70">Career guidance, training support, financial assistance</div>
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

            <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
              <p className="text-sm text-white/80 flex items-center gap-2">
                <Eye className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                Effective assessment tracking increases completion rates by 19% and provides clear ROI visibility.
              </p>
            </div>

            <DataGrid items={assessmentMetrics} columns={4} />

            <ContentBlock
              title="2025 Assessment Framework"
              icon={Target}
              summary="Digital onboarding assessment, progress gateway reviews, and EPA gateway preparation."
            >
              <InfoList items={assessmentFramework} variant="numbered" />
            </ContentBlock>

            <ContentBlock
              title="Digital Assessment Tools"
              icon={Brain}
              summary="EPA-aligned platforms and performance analytics for comprehensive progress tracking."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-white">Skills Bank Pro</h4>
                    <span className="text-xs text-yellow-400">£25/month</span>
                  </div>
                  <p className="text-xs text-white/80">EPA-aligned digital assessment. Real-time tracking, automated reporting, competency mapping. Reduces admin by 60%.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-white">OneFile Portfolio</h4>
                    <span className="text-xs text-yellow-400">£20/month</span>
                  </div>
                  <p className="text-xs text-white/80">Industry-standard digital portfolio. Mobile evidence capture, supervisor sign-off, progress analytics.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-white">Apprentice Insights Dashboard</h4>
                    <span className="text-xs text-yellow-400">£150/month</span>
                  </div>
                  <p className="text-xs text-white/80">Real-time employer monitoring. Progress visualisation, risk alerts, ROI tracking. Early intervention enabled.</p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="College Performance Monitoring"
              icon={Award}
              summary="Teaching quality, assessment standards, and support systems benchmarks for provider evaluation."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Teaching Quality</h4>
                  <p className="text-xs text-white/80">Look for Good/Outstanding Ofsted, 85%+ pass rates, high student satisfaction, strong industry partnerships.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Assessment Standards</h4>
                  <p className="text-xs text-white/80">Target 80%+ EPA pass rate, 95%+ portfolio completion, efficient time to gateway, consistent assessment.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white">Support Systems</h4>
                  <p className="text-xs text-white/80">Same-day employer query response, strong apprentice support, effective digital platforms, weekly progress updates.</p>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Early Intervention Strategies"
              icon={AlertTriangle}
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

            <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
              <p className="text-sm text-white/80 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                Advanced 2025 tools for apprentice planning, cost optimization, and compliance management.
              </p>
            </div>

            <DataGrid items={toolsMetrics} columns={4} />

            <ContentBlock
              title="Advanced Cost Calculator"
              icon={Calculator}
              summary="Calculate total apprentice investment including government incentives, training costs, and ROI projections."
            >
              <EnhancedCostCalculator />
            </ContentBlock>

            <ContentBlock
              title="Skills Gap Analyser"
              icon={Brain}
              summary="Assess current competencies and identify development priorities for individual apprentices."
            >
              <DigitalSkillsAnalyser />
            </ContentBlock>

            <ContentBlock
              title="Training Schedule Optimiser"
              icon={Calendar}
              summary="Plan and optimise off-the-job training time allocation for maximum efficiency."
            >
              <TrainingScheduleOptimiser />
            </ContentBlock>

            <ContentBlock
              title="Compliance Checker"
              icon={Shield}
              summary="Verify legal compliance status across employment, training, and health & safety requirements."
            >
              <ComplianceChecker />
            </ContentBlock>

            <ContentBlock
              title="2025 Business Impact Summary"
              icon={TrendingUp}
              summary="Financial benefits, operational advantages, and strategic impact of apprentice programmes."
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Financial Benefits</h4>
                  <ul className="space-y-1 text-xs text-white/80">
                    <li>287% ROI over 5 years</li>
                    <li>£15,000 saved vs. external</li>
                    <li>Up to £4,000 gov incentives</li>
                    <li>Reduced agency fees</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Operational Advantages</h4>
                  <ul className="space-y-1 text-xs text-white/80">
                    <li>Skills tailored to needs</li>
                    <li>Higher retention rates</li>
                    <li>Improved company culture</li>
                    <li>Knowledge transfer</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-2">Strategic Impact</h4>
                  <ul className="space-y-1 text-xs text-white/80">
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
        <div className="mt-8 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-yellow-400/20">
              <Phone className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Need Additional Support?</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Managing apprentices successfully requires ongoing support. Contact CITB, local training
                providers, or government resources for help with recruitment, training, or compliance.
              </p>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default BusinessApprentices;
