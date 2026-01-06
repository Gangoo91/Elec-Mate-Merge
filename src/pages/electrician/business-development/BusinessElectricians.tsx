import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  UserCheck,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Award,
  Target,
  PoundSterling,
  CheckCircle,
  FileText,
  Briefcase,
  Heart,
  Phone,
  Globe,
  ExternalLink,
  AlertTriangle,
  Calendar
} from "lucide-react";
import {
  BusinessPageLayout,
  SectionNav,
  ContentBlock,
  DataGrid,
  InfoList
} from "@/components/business-hub";

const BusinessElectricians = () => {
  const [activeSection, setActiveSection] = useState("recruitment");

  const sections = [
    { id: "recruitment", label: "Recruitment", icon: Users },
    { id: "onboarding", label: "Onboarding", icon: UserCheck },
    { id: "retention", label: "Retention", icon: Heart },
    { id: "management", label: "Management", icon: Shield },
  ];

  const canonical = `${window.location.origin}/electrician/business-development/electricians`;

  // Key Stats
  const keyStats = [
    { label: "Recruitment Cost", value: "£2.5-4.5k", sublabel: "Per quality hire" },
    { label: "Time to Hire", value: "4-6 weeks", sublabel: "Quality candidates" },
    { label: "Retention Rate", value: "85%", sublabel: "With proper onboarding" },
    { label: "Productivity Gain", value: "+30%", sublabel: "With structured approach" },
  ];

  return (
    <>
      <Helmet>
        <title>Electrician Onboarding & Management | Elec-Mate</title>
        <meta
          name="description"
          content="Complete guide to recruiting, onboarding, and retaining qualified electricians in your electrical contracting business."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BusinessPageLayout
        title="Onboarding Electricians"
        subtitle="Strategies for recruiting, integrating and retaining qualified electricians"
        icon={UserCheck}
        backUrl="/electrician/business-development"
      >
        {/* Key Stats */}
        <DataGrid items={keyStats} columns={4} />

        {/* Section Navigation */}
        <SectionNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Content Area */}
        <div className="space-y-8">

          {/* RECRUITMENT SECTION */}
          <section id="recruitment" className="scroll-mt-20 space-y-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">Recruitment</h2>
              <p className="text-base text-white/80 leading-relaxed">
                Finding qualified electricians is one of the biggest challenges facing electrical contractors. A strategic recruitment approach reduces time-to-hire by 40% and improves candidate quality significantly.
              </p>
            </div>

            <ContentBlock
              title="Recruitment Channels"
              icon={Target}
              summary={
                <p className="text-white">
                  The most effective recruitment combines specialist platforms, industry networks, and direct approaches. Quality candidates expect professional recruitment processes and competitive packages.
                </p>
              }
            >
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-4">Professional Trade Platforms</h4>
                  <div className="space-y-4">
                    {[
                      { name: "ElectricalJobs.com", desc: "Leading specialist electrical recruitment platform with skills-based matching and qualification verification.", cost: "£300-600/post" },
                      { name: "LinkedIn Professional", desc: "Target qualified electricians with proven experience. Advanced targeting and professional messaging.", cost: "£200-500/month" },
                      { name: "Indeed & Reed", desc: "High-volume general job boards with electrical filters. Good for entry-level and experienced roles.", cost: "£150-400/post" }
                    ].map((platform, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-3 border-b border-white/5 last:border-0">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-white">{platform.name}</span>
                          <p className="text-sm text-white/80 mt-1">{platform.desc}</p>
                        </div>
                        <span className="text-sm font-semibold text-yellow-400 whitespace-nowrap">{platform.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-4">Industry Networks & Agencies</h4>
                  <div className="space-y-4">
                    {[
                      { name: "Trade Association Networks", desc: "ECA, NICEIC, NAPIT member networks and job boards. Access to verified, qualified professionals.", cost: "£100-300/year" },
                      { name: "Specialist Recruitment Agencies", desc: "Electrical trade recruitment specialists with pre-screened candidates and placement guarantees.", cost: "15-25% of salary" },
                      { name: "Word of Mouth & Referrals", desc: "Employee referral schemes are highly effective. Offer bonuses for successful referrals.", cost: "£500-1,000 bonus" }
                    ].map((channel, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-3 border-b border-white/5 last:border-0">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-white">{channel.name}</span>
                          <p className="text-sm text-white/80 mt-1">{channel.desc}</p>
                        </div>
                        <span className="text-sm font-semibold text-yellow-400 whitespace-nowrap">{channel.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Selection & Interview Process"
              icon={CheckCircle}
              summary={
                <p className="text-white">
                  A structured selection process ensures you identify candidates with the right skills, qualifications, and cultural fit. Poor hiring decisions cost an average of £15,000 in lost productivity and re-recruitment.
                </p>
              }
            >
              <InfoList
                variant="numbered"
                items={[
                  { title: "Initial Screening (Day 1-3)", description: "Review CVs for essential qualifications (18th Edition, 2391), relevant experience, and career stability. Check qualification validity with awarding bodies." },
                  { title: "Phone Interview (Day 4-7)", description: "15-20 minute call to assess communication, confirm experience, discuss salary expectations, and gauge genuine interest in the role." },
                  { title: "Technical Assessment (Day 8-14)", description: "Practical skills test covering circuit diagnosis, testing procedures, and BS 7671 knowledge. Include scenario-based problem solving." },
                  { title: "In-Person Interview (Day 15-21)", description: "Face-to-face meeting to assess cultural fit, work ethic, and team compatibility. Include site visit where possible." },
                  { title: "Reference & Background Checks (Day 22-28)", description: "Verify employment history, qualifications, and obtain two professional references. Check for any industry sanctions." },
                  { title: "Offer & Negotiation (Day 29-35)", description: "Make competitive offer including salary, benefits, vehicle, and development opportunities. Allow 5-7 days for decision." }
                ]}
              />
            </ContentBlock>

            <ContentBlock
              title="Competitive Package Structure"
              icon={PoundSterling}
              summary={
                <p className="text-white">
                  Attracting quality electricians requires competitive compensation. The best packages combine base salary with benefits, development opportunities, and quality of work life factors.
                </p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Salary Benchmarks (2025)</h4>
                  <div className="space-y-2">
                    {[
                      { role: "Approved Electrician", range: "£38,000 - £48,000" },
                      { role: "Installation Electrician", range: "£35,000 - £42,000" },
                      { role: "Maintenance Electrician", range: "£36,000 - £45,000" },
                      { role: "Lead/Supervisor", range: "£45,000 - £55,000" }
                    ].map((salary, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm text-white">{salary.role}</span>
                        <span className="text-sm font-medium text-yellow-400">{salary.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Essential Benefits</h4>
                  <ul className="space-y-2">
                    {[
                      "Company vehicle or £5-7k car allowance",
                      "Pension contribution (5%+ employer)",
                      "25+ days holiday plus bank holidays",
                      "Private healthcare or cash plan",
                      "Training & development budget",
                      "Tool allowance or company tools",
                      "Overtime at premium rates"
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                        <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ContentBlock>
          </section>

          {/* ONBOARDING SECTION */}
          <section id="onboarding" className="scroll-mt-20 space-y-6 pt-10 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">Onboarding</h2>
              <p className="text-base text-white/80 leading-relaxed">
                Effective onboarding reduces time to full productivity from 12 weeks to 6 weeks and increases retention by 25%. A structured approach ensures new hires feel supported and can contribute quickly.
              </p>
            </div>

            <ContentBlock
              title="First Week Essentials"
              icon={Calendar}
              summary={
                <p className="text-white">
                  The first week sets the tone for the entire employment relationship. Focus on administrative setup, safety training, and introductions rather than immediately deploying to customer sites.
                </p>
              }
            >
              <div className="space-y-4">
                {[
                  { day: "Day 1", title: "Welcome & Administration", tasks: "Complete HR paperwork, issue equipment (tools, PPE, vehicle), set up IT access, introduce to office team, review company handbook and policies." },
                  { day: "Day 2", title: "Safety & Compliance", tasks: "H&S induction, site safety procedures, risk assessment training, review of company safety standards, emergency procedures." },
                  { day: "Day 3", title: "Technical Orientation", tasks: "Review company quality standards, certification procedures, documentation requirements, testing equipment familiarisation." },
                  { day: "Day 4-5", title: "Shadowing", tasks: "Accompany experienced electrician on typical jobs, observe customer interaction standards, understand job completion procedures." }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">{item.day}</span>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                    </div>
                    <p className="text-sm text-white/80">{item.tasks}</p>
                  </div>
                ))}
              </div>
            </ContentBlock>

            <ContentBlock
              title="90-Day Integration Plan"
              icon={TrendingUp}
              summary={
                <p className="text-white">
                  A structured 90-day plan with clear milestones and regular check-ins ensures new electricians develop the skills and confidence needed to work independently and represent your company well.
                </p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Month 1: Foundation</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Complete all compliance training</li>
                    <li>• Shadow on 10+ jobs</li>
                    <li>• First supervised solo work</li>
                    <li>• Weekly 1-to-1 with supervisor</li>
                    <li>• Review at day 30</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Month 2: Development</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Independent work on standard jobs</li>
                    <li>• Customer interaction training</li>
                    <li>• Quality audit of completed work</li>
                    <li>• Fortnightly check-ins</li>
                    <li>• Review at day 60</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Month 3: Independence</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Full independent working</li>
                    <li>• Complex job assignments</li>
                    <li>• Performance review</li>
                    <li>• Confirm probation pass</li>
                    <li>• Set development goals</li>
                  </ul>
                </div>
              </div>
            </ContentBlock>
          </section>

          {/* RETENTION SECTION */}
          <section id="retention" className="scroll-mt-20 space-y-6 pt-10 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">Retention</h2>
              <p className="text-base text-white/80 leading-relaxed">
                Replacing an electrician costs £15,000+ in recruitment, training, and lost productivity. Investing in retention through competitive packages, development opportunities, and positive culture delivers significant ROI.
              </p>
            </div>

            <ContentBlock
              title="Key Retention Factors"
              icon={Heart}
              summary={
                <p className="text-white">
                  Research shows that while pay is important, factors like development opportunities, work-life balance, and feeling valued have the biggest impact on long-term retention.
                </p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { factor: "Career Development", desc: "Clear progression path, training opportunities, and support for additional qualifications.", impact: "35% retention impact" },
                  { factor: "Competitive Compensation", desc: "Market-rate salary, regular reviews, and performance bonuses.", impact: "30% retention impact" },
                  { factor: "Work-Life Balance", desc: "Reasonable hours, flexible scheduling where possible, and respect for personal time.", impact: "20% retention impact" },
                  { factor: "Company Culture", desc: "Feeling valued, good team relationships, and alignment with company values.", impact: "15% retention impact" }
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{item.factor}</h4>
                      <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">{item.impact}</span>
                    </div>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </ContentBlock>

            <ContentBlock
              title="Development & Training"
              icon={Award}
              summary={
                <p className="text-white">
                  Ongoing development shows employees you're invested in their future. Training budgets of £500-1,500 per employee annually deliver returns through improved skills and loyalty.
                </p>
              }
            >
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Recommended Training Investment</h4>
                  <div className="space-y-3">
                    {[
                      { training: "18th Edition updates & amendments", cost: "£250-400", freq: "Every 3 years" },
                      { training: "Inspection & Testing refresher (2391)", cost: "£400-600", freq: "Every 5 years" },
                      { training: "EV charging installation (C&G 2919)", cost: "£600-900", freq: "One-time + updates" },
                      { training: "Solar PV installation", cost: "£800-1,200", freq: "One-time + updates" },
                      { training: "First Aid at Work", cost: "£150-250", freq: "Every 3 years" }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-white/5 last:border-0 gap-2">
                        <span className="text-sm text-white">{item.training}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white">{item.freq}</span>
                          <span className="text-sm font-medium text-yellow-400">{item.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ContentBlock>
          </section>

          {/* MANAGEMENT SECTION */}
          <section id="management" className="scroll-mt-20 space-y-6 pt-10 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">Management</h2>
              <p className="text-base text-white/80 leading-relaxed">
                Effective management of electricians balances accountability with autonomy. Clear expectations, regular communication, and fair treatment build a productive and loyal team.
              </p>
            </div>

            <ContentBlock
              title="Employment Law Essentials"
              icon={FileText}
              summary={
                <p className="text-white">
                  Understanding employment law protects your business and ensures fair treatment of employees. Non-compliance can result in tribunal claims averaging £10,000+.
                </p>
              }
            >
              <InfoList
                variant="checklist"
                items={[
                  { title: "Written employment contract", description: "Must be provided within 2 months of start date. Include job title, salary, hours, holiday entitlement, and notice periods." },
                  { title: "Right to work checks", description: "Verify all employees have legal right to work in UK before employment starts. Keep copies of documents." },
                  { title: "Minimum wage compliance", description: "Current rates: £11.44/hour (23+), £8.60 (18-20), £6.40 (under 18). Review annually each April." },
                  { title: "Working time regulations", description: "Maximum 48-hour average working week unless opt-out signed. Rest breaks and minimum rest periods required." },
                  { title: "Holiday entitlement", description: "Minimum 5.6 weeks (28 days) including bank holidays for full-time workers. Pro-rata for part-time." },
                  { title: "Health & safety duties", description: "Provide safe working environment, PPE, training, and risk assessments. H&S liability is non-delegable." }
                ]}
              />
            </ContentBlock>

            <ContentBlock
              title="Performance Management"
              icon={TrendingUp}
              summary={
                <p className="text-white">
                  Regular performance conversations prevent issues from escalating and ensure electricians understand expectations. Annual reviews alone are insufficient - aim for monthly touchpoints.
                </p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Key Performance Indicators</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• First-time fix rate (target: 90%+)</li>
                    <li>• Customer satisfaction scores</li>
                    <li>• Jobs completed per day/week</li>
                    <li>• Certification compliance rate</li>
                    <li>• Safety incident frequency</li>
                    <li>• Callback/rework rate (target: &lt;5%)</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Review Schedule</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Weekly: Brief catch-up (5-10 mins)</li>
                    <li>• Monthly: Performance discussion (30 mins)</li>
                    <li>• Quarterly: Development review (1 hour)</li>
                    <li>• Annually: Full appraisal & salary review</li>
                    <li>• As needed: Feedback on specific issues</li>
                  </ul>
                </div>
              </div>
            </ContentBlock>

            <ContentBlock
              title="Handling Difficult Situations"
              icon={AlertTriangle}
              summary={
                <p className="text-white">
                  Address performance or conduct issues promptly and fairly. Follow proper procedures to protect both the employee and your business.
                </p>
              }
            >
              <div className="space-y-4">
                {[
                  { issue: "Performance Issues", approach: "Informal conversation first, then formal performance improvement plan (PIP) with clear targets and support. Document everything." },
                  { issue: "Conduct Issues", approach: "Follow disciplinary procedure: investigation, hearing, decision. ACAS guidelines must be followed. Consider mediation for relationship issues." },
                  { issue: "Absence Management", approach: "Return-to-work interviews, trigger points for formal review, occupational health referral if needed. Balance support with business needs." },
                  { issue: "Grievances", approach: "Take seriously, investigate promptly, allow right to be accompanied. Resolve at lowest level possible. Document outcomes." }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <h4 className="font-semibold text-white mb-2">{item.issue}</h4>
                    <p className="text-sm text-white/80">{item.approach}</p>
                  </div>
                ))}
              </div>
            </ContentBlock>
          </section>

        </div>

        {/* Support Footer */}
        <div className="mt-10 p-5 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-yellow-400/20">
              <Shield className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Need Additional Support?</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Managing qualified electricians requires ongoing attention to employment law, market rates, and best practices.
                Contact ACAS (0300 123 1100) for free employment advice, or consult with an HR specialist for complex situations.
              </p>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default BusinessElectricians;
