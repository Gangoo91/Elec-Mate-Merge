import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Briefcase,
  TrendingUp,
  Scale,
  Users,
  PoundSterling,
  Clock,
  Target,
  BarChart3,
  Building,
  CheckCircle,
  Phone,
  Globe,
  ExternalLink,
  Shield,
  Award,
  Lightbulb,
  FileText,
  Banknote
} from "lucide-react";
import {
  BusinessPageLayout,
  SectionNav,
  ContentBlock,
  DataGrid,
  InfoList
} from "@/components/business-hub";

const BusinessStartup = () => {
  const [activeSection, setActiveSection] = useState("planning");

  const sections = [
    { id: "planning", label: "Business Planning", icon: TrendingUp },
    { id: "legal", label: "Legal & Compliance", icon: Scale },
    { id: "support", label: "Support & Resources", icon: Users },
  ];

  const canonical = `${window.location.origin}/electrician/business-development/startup`;

  return (
    <>
      <Helmet>
        <title>Starting an Electrical Business | Elec-Mate</title>
        <meta
          name="description"
          content="Complete guide to starting an electrical contracting business in the UK. Learn business planning, legal requirements, and find support resources."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BusinessPageLayout
        title="Starting a Business"
        subtitle="Your complete guide to establishing a successful electrical contracting business in the UK"
        icon={Briefcase}
        backUrl="/electrician/business-development"
      >
        <SectionNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Business Planning Section */}
        <section id="planning" className="scroll-mt-32 space-y-6">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Business Planning</h2>
            <p className="text-base text-white/80 leading-relaxed">
              A comprehensive business plan is the foundation of every successful electrical contracting business.
              Research shows that businesses with detailed plans are 300% more likely to succeed and reach profitability 40% faster than those without.
            </p>
          </div>

          {/* Key Metrics */}
          <DataGrid
            items={[
              { label: "Average Startup Cost", value: "£15-35k", sublabel: "Total initial investment" },
              { label: "Break-even Timeline", value: "6-12 months", sublabel: "With structured planning" },
              { label: "Success Rate", value: "85%", sublabel: "With detailed business plan" },
              { label: "Year 1 Revenue", value: "£8-15k/month", sublabel: "Average achievable" },
            ]}
            columns={4}
          />

          {/* Market Research */}
          <ContentBlock
            title="Market Research & Analysis"
            icon={BarChart3}
            id="market-research"
            summary={
              <div className="space-y-3">
                <p className="text-white/90">
                  Understanding your local market is the critical first step to business success. Thorough market research helps you identify gaps in the market, understand competitor pricing, and define your ideal customer profile. This knowledge directly influences your service offerings, pricing strategy, and marketing approach.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">Local Competition Analysis</span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">Customer Segmentation</span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">Revenue Forecasting</span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">Pricing Strategy</span>
                </div>
              </div>
            }
          >
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Local Market Analysis</h4>
                  <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg">Week 1-2</span>
                </div>
                <p className="text-sm text-white/80 mb-4">Conduct a comprehensive assessment of your target service area to understand the competitive landscape and market opportunities.</p>
                <ul className="space-y-2.5">
                  {[
                    "Map all competitor locations within your target radius using Google Maps and trade directories",
                    "Research competitor pricing through mystery shopping and requesting quotes for common jobs",
                    "Analyse local housing stock - older properties need rewiring, new builds need first-fix work",
                    "Monitor local planning applications for new developments requiring electrical contractors",
                    "Identify underserved areas or specialisms with less competition (EV charging, solar, smart homes)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Customer Segmentation</h4>
                  <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg">Week 2-3</span>
                </div>
                <p className="text-sm text-white/80 mb-4">Define your target customer groups and understand their specific needs, pain points, and buying behaviour.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { segment: "Domestic Homeowners", desc: "Repairs, upgrades, safety certificates. Value trust and reliability.", avg: "£150-500/job" },
                    { segment: "Landlords & Letting Agents", desc: "EICR certificates, compliance work, regular maintenance contracts.", avg: "£200-400/property" },
                    { segment: "Property Developers", desc: "New builds, renovations, large-scale projects. Volume work, longer payment terms.", avg: "£5k-50k/project" },
                    { segment: "Commercial Clients", desc: "Offices, retail, industrial. Regular maintenance, emergency callouts.", avg: "£500-5k/job" }
                  ].map((cust, i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                      <h5 className="font-medium text-white mb-1">{cust.segment}</h5>
                      <p className="text-xs text-white/80 mb-2">{cust.desc}</p>
                      <p className="text-xs font-medium text-yellow-400">Avg. value: {cust.avg}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Revenue Forecasting</h4>
                  <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg">Week 3-4</span>
                </div>
                <p className="text-sm text-white/80 mb-4">Create realistic income projections based on market conditions, your capacity, and seasonal variations.</p>
                <ul className="space-y-2.5">
                  {[
                    "Calculate realistic billable hours (typically 25-30 per week after travel, admin, and quotes)",
                    "Research average job values for your target services in your area",
                    "Factor in seasonal patterns - heating and lighting work increases in winter months",
                    "Plan for gradual growth - aim for 50% capacity in months 1-3, building to 80%+ by month 12",
                    "Include contingency for slower periods and non-paying clients (5-10% of projected revenue)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ContentBlock>

          {/* Financial Planning */}
          <ContentBlock
            title="Financial Planning & Investment"
            icon={PoundSterling}
            id="financial-planning"
            summary={
              <div className="space-y-3">
                <p className="text-white/90">
                  Proper financial planning is crucial for business survival. Statistics show that 82% of small business failures are due to cash flow problems. Understanding your startup costs, ongoing expenses, and working capital requirements will set you up for sustainable success.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <p className="text-2xl font-bold text-yellow-400">£13-33k</p>
                    <p className="text-sm text-white/80 mt-1">Essential Equipment</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <p className="text-2xl font-bold text-yellow-400">£3.6-8k</p>
                    <p className="text-sm text-white/80 mt-1">Business Setup</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <p className="text-2xl font-bold text-yellow-400">£13-30k</p>
                    <p className="text-sm text-white/80 mt-1">Working Capital</p>
                  </div>
                </div>
              </div>
            }
          >
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="font-semibold text-white mb-4">Essential Startup Equipment (£13,300 - £33,500)</h4>
                <p className="text-sm text-white/80 mb-4">Quality tools and equipment are essential investments that directly impact your work quality and efficiency.</p>
                <div className="space-y-3">
                  {[
                    { item: "Professional hand & power tool kit", amount: "£3,000 - £8,000", note: "Quality brands last longer and inspire client confidence" },
                    { item: "Test equipment (multifunction tester, voltage indicators)", amount: "£1,500 - £3,000", note: "Essential for Part P compliance and certification" },
                    { item: "Commercial vehicle (van)", amount: "£8,000 - £20,000", note: "Consider lease options to preserve cash flow" },
                    { item: "Public liability insurance (£2-5m cover)", amount: "£800 - £2,500/year", note: "Required by most scheme providers and commercial clients" }
                  ].map((inv, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-white/5 last:border-0 gap-2">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-white">{inv.item}</span>
                        <p className="text-xs text-white/80 mt-0.5">{inv.note}</p>
                      </div>
                      <span className="text-sm font-semibold text-yellow-400 whitespace-nowrap">{inv.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="font-semibold text-white mb-4">Business Setup Costs (£3,600 - £8,300)</h4>
                <p className="text-sm text-white/80 mb-4">One-time costs to establish your business legally and professionally.</p>
                <div className="space-y-3">
                  {[
                    { item: "Company registration & legal setup", amount: "£100 - £500", note: "Ltd company via Companies House or accountant" },
                    { item: "Professional qualifications (if needed)", amount: "£2,000 - £4,000", note: "18th Edition, 2391, AM2 if not already qualified" },
                    { item: "Scheme membership (NICEIC/NAPIT/ELECSA)", amount: "£500 - £800/year", note: "Required for Part P self-certification" },
                    { item: "Branding, website & marketing materials", amount: "£1,000 - £3,000", note: "Professional image attracts better clients" }
                  ].map((inv, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-white/5 last:border-0 gap-2">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-white">{inv.item}</span>
                        <p className="text-xs text-white/80 mt-0.5">{inv.note}</p>
                      </div>
                      <span className="text-sm font-semibold text-yellow-400 whitespace-nowrap">{inv.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="font-semibold text-white mb-4">Working Capital Reserve (£13,000 - £30,000)</h4>
                <p className="text-sm text-white/80 mb-4">Cash reserve to cover expenses while building your client base. This is often the most overlooked startup requirement.</p>
                <div className="space-y-3">
                  {[
                    { item: "3-6 month personal living expenses", amount: "£6,000 - £12,000", note: "You may not draw a salary immediately" },
                    { item: "Initial material stock & consumables", amount: "£2,000 - £5,000", note: "Cable, accessories, fixings for first jobs" },
                    { item: "Emergency & contingency fund", amount: "£3,000 - £8,000", note: "Van breakdown, tool replacement, slow periods" },
                    { item: "Marketing & growth investment", amount: "£2,000 - £5,000", note: "Google Ads, Checkatrade, vehicle graphics" }
                  ].map((inv, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-white/5 last:border-0 gap-2">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-white">{inv.item}</span>
                        <p className="text-xs text-white/80 mt-0.5">{inv.note}</p>
                      </div>
                      <span className="text-sm font-semibold text-yellow-400 whitespace-nowrap">{inv.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Funding Options</h4>
                    <p className="text-sm text-white/80">Consider Start Up Loans (gov.uk) offering up to £25,000 at 6% fixed interest with free mentoring. Many banks also offer business accounts with interest-free overdrafts for the first year.</p>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Business Structure */}
          <ContentBlock
            title="Business Structure & Legal Setup"
            icon={Building}
            id="business-structure"
            summary={
              <div className="space-y-3">
                <p className="text-white/90">
                  Choosing the right business structure affects your tax liability, personal risk, and administrative burden. Most electrical contractors start as sole traders for simplicity, then transition to limited company status as turnover grows beyond £40-50k for tax efficiency.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-white/80 border border-white/10">Sole Trader - Simplest setup</span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-white/80 border border-white/10">Limited Company - Tax efficient</span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-white/80 border border-white/10">Partnership - Shared resources</span>
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              {[
                {
                  name: "Sole Trader",
                  timeline: "Setup: 1-2 days",
                  desc: "The simplest business structure, ideal for starting out. You and your business are legally the same entity - quick to set up but you're personally liable for all business debts.",
                  pros: ["Register online in minutes with HMRC", "Simple annual self-assessment tax return", "Keep all profits after tax", "No public disclosure of accounts"],
                  cons: ["Unlimited personal liability for debts", "Pay income tax and Class 2/4 NI on all profits", "Can look less professional to larger clients", "Harder to get business credit"]
                },
                {
                  name: "Limited Company",
                  timeline: "Setup: 1-2 weeks",
                  desc: "A separate legal entity from yourself, offering liability protection and potential tax advantages. Recommended once profits exceed £40-50k annually.",
                  pros: ["Limited liability - personal assets protected", "More tax efficient at higher earnings (Corporation Tax 19-25%)", "Professional image attracts commercial clients", "Easier access to business finance and credit"],
                  cons: ["More complex accounting and annual filings", "Director responsibilities and compliance duties", "Accounts filed publicly at Companies House", "Accountancy fees typically £800-2,000/year"]
                },
                {
                  name: "Partnership (LLP)",
                  timeline: "Setup: 2-3 weeks",
                  desc: "Share ownership with one or more partners. Combines resources and expertise while spreading risk and workload. Popular for established electricians joining forces.",
                  pros: ["Pool resources, tools, and client bases", "Share workload and cover each other's holidays", "Combined skills cover more service types", "Limited liability with LLP structure"],
                  cons: ["Joint decision-making required on major issues", "Profits shared according to partnership agreement", "Potential for disputes between partners", "More complex exit if partnership dissolves"]
                }
              ].map((structure, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white text-lg">{structure.name}</h4>
                    <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg">{structure.timeline}</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">{structure.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-white/[0.02]">
                      <p className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                        Advantages
                      </p>
                      {structure.pros.map((p, j) => (
                        <p key={j} className="text-xs text-white/80 mb-1">• {p}</p>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.02]">
                      <p className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-orange-400" />
                        Considerations
                      </p>
                      {structure.cons.map((c, j) => (
                        <p key={j} className="text-xs text-white/80 mb-1">• {c}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ContentBlock>

          {/* Planning Checklist */}
          <ContentBlock
            title="Business Planning Checklist"
            icon={Target}
            id="checklist"
            summary={
              <p className="text-white/90">
                Use this comprehensive checklist to track your progress through the essential planning stages. Each item should be completed before launching your business to maximise your chances of success.
              </p>
            }
          >
            <div className="space-y-5">
              <InfoList
                variant="checklist"
                items={[
                  { title: "Complete detailed local market research", description: "Analyse competitors, pricing, and identify your target customer segments and service area." },
                  { title: "Define service offerings and pricing strategy", description: "Decide which services you'll offer and research competitive pricing for your area." },
                  { title: "Calculate startup costs and create 12-month cash flow forecast", description: "Document all required investments and project monthly income/expenses." },
                  { title: "Choose business structure and complete registration", description: "Register as sole trader with HMRC or incorporate limited company." },
                  { title: "Arrange insurance and join competent person scheme", description: "Public liability, employers liability (if hiring), and NICEIC/NAPIT membership." },
                  { title: "Set up business banking and accounting systems", description: "Separate business account, accounting software, and processes for invoicing and expenses." },
                  { title: "Create marketing plan and establish online presence", description: "Website, Google Business Profile, social media, and customer acquisition strategy." }
                ]}
              />

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="font-semibold text-white mb-4">Key Success Milestones</h4>
                <div className="space-y-3">
                  {[
                    { milestone: "Month 1: First paying customer", target: "Revenue: £2,000-4,000" },
                    { milestone: "Month 3: Established regular workflow", target: "Revenue: £5,000-8,000/month" },
                    { milestone: "Month 6: Break-even achieved", target: "Covering all expenses" },
                    { milestone: "Month 12: Sustainable business", target: "Revenue: £8,000-15,000/month" },
                    { milestone: "Year 2: Growth & scaling", target: "Consider hiring first employee" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-white/5 last:border-0 gap-1">
                      <span className="text-sm font-medium text-white">{item.milestone}</span>
                      <span className="text-sm font-semibold text-yellow-400">{item.target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ContentBlock>
        </section>

        {/* Legal & Compliance Section */}
        <section id="legal" className="scroll-mt-32 space-y-6 pt-10 border-t border-white/10">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Legal & Compliance</h2>
            <p className="text-base text-white/80 leading-relaxed">
              Operating legally is non-negotiable for electrical contractors. Understanding registration requirements, professional qualifications, and insurance obligations protects both you and your clients. Non-compliance can result in fines up to £30,000 and imprisonment.
            </p>
          </div>

          <DataGrid
            items={[
              { label: "Setup Time", value: "2-6 weeks", sublabel: "For full compliance" },
              { label: "Core Certifications", value: "3-4", sublabel: "Essential qualifications" },
              { label: "Compliance Rate", value: "95%+", sublabel: "With proper setup" },
              { label: "Total Cost", value: "£3-6k", sublabel: "First year compliance" },
            ]}
            columns={4}
          />

          <ContentBlock
            title="Business Registration Requirements"
            icon={FileText}
            summary={
              <p className="text-white/90">
                All electrical businesses must be properly registered with HMRC and, if operating as a limited company, with Companies House. Registration is straightforward but must be completed within specific timeframes to avoid penalties.
              </p>
            }
          >
            <InfoList
              variant="numbered"
              items={[
                { title: "Register with HMRC for Self-Assessment or Corporation Tax", description: "Sole traders register for self-assessment within 3 months of starting. Limited companies register for corporation tax within 3 months of starting to trade.", detail: "Online registration takes 10-20 minutes" },
                { title: "Companies House registration (Limited Company only)", description: "Register your company name, director details, registered office address, and shareholding structure. Costs £12 online.", detail: "Approval typically within 24 hours" },
                { title: "Open a dedicated business bank account", description: "Keep business and personal finances completely separate. Most banks offer free business banking for the first 1-2 years.", detail: "Required for professional image and tax compliance" },
                { title: "Register for VAT (when turnover exceeds £85,000)", description: "Mandatory registration required when taxable turnover exceeds the threshold. Consider voluntary registration earlier for credibility with commercial clients.", detail: "Can reclaim VAT on tools and materials" }
              ]}
            />
          </ContentBlock>

          <ContentBlock
            title="Professional Qualifications & Certifications"
            icon={Award}
            summary={
              <p className="text-white/90">
                Legitimate electrical contractors must hold recognised qualifications and maintain competence through ongoing training. The 18th Edition Wiring Regulations (BS 7671) is the minimum standard, with additional certifications required for inspection and testing work.
              </p>
            }
          >
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="font-semibold text-white mb-4">Essential Qualifications</h4>
                <div className="space-y-3">
                  {[
                    { qual: "Level 3 NVQ/Diploma in Electrical Installation", cost: "£2,000 - £3,500", note: "Foundation qualification for electrical work" },
                    { qual: "18th Edition Wiring Regulations (BS 7671:2018+A2:2022)", cost: "£250 - £400", note: "Mandatory for all practising electricians" },
                    { qual: "City & Guilds 2391 Inspection & Testing", cost: "£600 - £900", note: "Required for certification of completed work" },
                    { qual: "AM2 Assessment (if not completed in apprenticeship)", cost: "£500 - £700", note: "Practical assessment for scheme membership" }
                  ].map((q, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-white/5 last:border-0 gap-2">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-white">{q.qual}</span>
                        <p className="text-xs text-white/80 mt-0.5">{q.note}</p>
                      </div>
                      <span className="text-sm font-semibold text-yellow-400 whitespace-nowrap">{q.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="font-semibold text-white mb-4">Competent Person Scheme Membership</h4>
                <p className="text-sm text-white/80 mb-4">Joining a government-approved scheme allows you to self-certify notifiable electrical work without involving Building Control. This is essential for domestic installation work.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { scheme: "NICEIC", cost: "£500-800/year", note: "Most recognised scheme" },
                    { scheme: "NAPIT", cost: "£400-700/year", note: "Good value option" },
                    { scheme: "ELECSA", cost: "£350-600/year", note: "Part of NAPIT group" }
                  ].map((s, i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                      <p className="font-semibold text-white">{s.scheme}</p>
                      <p className="text-sm text-yellow-400 mt-1">{s.cost}</p>
                      <p className="text-xs text-white/80 mt-1">{s.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ContentBlock>

          <ContentBlock
            title="Insurance Requirements"
            icon={Shield}
            summary={
              <p className="text-white/90">
                Adequate insurance protects your business, your clients, and yourself from financial disaster. Public liability is essential for all contractors, while employers liability becomes mandatory as soon as you hire anyone - even part-time or temporary staff.
              </p>
            }
          >
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
              <h4 className="font-semibold text-white mb-4">Essential Insurance Coverage</h4>
              <div className="space-y-4">
                {[
                  { type: "Public Liability Insurance", coverage: "£2-5 million recommended", cost: "£300 - £600/year", note: "Covers injury to public and damage to property. Required by most scheme providers." },
                  { type: "Employers Liability Insurance", coverage: "£10 million minimum (legal requirement)", cost: "£400 - £800/year", note: "Legally required if you employ anyone, even casually. Fines up to £2,500 per day without it." },
                  { type: "Professional Indemnity Insurance", coverage: "£1-2 million recommended", cost: "£200 - £400/year", note: "Covers claims arising from professional advice or design errors. Important for design work." },
                  { type: "Tool & Equipment Insurance", coverage: "Full replacement value", cost: "£150 - £300/year", note: "Covers theft from van and damage. Check van insurance doesn't already include this." }
                ].map((ins, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <p className="font-medium text-white">{ins.type}</p>
                        <p className="text-xs text-white/80">{ins.coverage}</p>
                      </div>
                      <span className="text-sm font-semibold text-yellow-400 whitespace-nowrap">{ins.cost}</span>
                    </div>
                    <p className="text-xs text-white/80">{ins.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </ContentBlock>
        </section>

        {/* Support & Resources Section */}
        <section id="support" className="scroll-mt-32 space-y-6 pt-10 border-t border-white/10">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Support & Resources</h2>
            <p className="text-base text-white/80 leading-relaxed">
              You don't have to figure everything out alone. The UK has excellent support infrastructure for new businesses, from free government advice lines to industry-specific bodies offering guidance, training, and networking opportunities.
            </p>
          </div>

          <DataGrid
            items={[
              { label: "Support Lines", value: "10+", sublabel: "Free helplines available" },
              { label: "Online Resources", value: "50+", sublabel: "Guides & templates" },
              { label: "Success Rate", value: "90%+", sublabel: "With mentor support" },
              { label: "Training Providers", value: "20+", sublabel: "Across the UK" },
            ]}
            columns={4}
          />

          <ContentBlock
            title="Industry Bodies & Scheme Providers"
            icon={Users}
            summary={
              <p className="text-white/90">
                Joining industry bodies provides credibility, access to technical support, networking opportunities, and enables you to self-certify notifiable work. Membership demonstrates professionalism to clients and is often required for commercial contracts.
              </p>
            }
          >
            <div className="space-y-3">
              {[
                { name: "NICEIC", desc: "The leading certification body for electrical contractors. Offers domestic and commercial installer schemes. Trusted by insurance companies and commercial clients.", link: "niceic.com" },
                { name: "NAPIT", desc: "National Association of Professional Inspectors and Testers. Comprehensive scheme with good value pricing and excellent support.", link: "napit.org.uk" },
                { name: "ELECSA", desc: "Electrical Self-Assessment scheme, now part of NAPIT group. Good option for those focusing on domestic work.", link: "elecsa.co.uk" },
                { name: "ECA", desc: "The Electrical Contractors' Association. Trade association offering business support, legal advice, and networking. Best for larger contractors.", link: "eca.co.uk" },
                { name: "JIB", desc: "Joint Industry Board. Sets employment standards, grades, and pay rates. Important if you're employing others.", link: "jib.org.uk" }
              ].map((body, i) => (
                <div key={i} className="flex items-start justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{body.name}</p>
                    <p className="text-sm text-white/70 mt-1">{body.desc}</p>
                  </div>
                  <a
                    href={`https://${body.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-yellow-400 hover:text-yellow-300 whitespace-nowrap"
                  >
                    <Globe className="h-4 w-4" />
                    Visit
                  </a>
                </div>
              ))}
            </div>
          </ContentBlock>

          <ContentBlock
            title="Free Business Support Helplines"
            icon={Phone}
            summary={
              <p className="text-white/90">
                Free helplines provide expert advice on tax, employment law, health and safety, and general business guidance. These services are funded by the government and completely free to use.
              </p>
            }
          >
            <div className="space-y-3">
              {[
                { name: "HMRC Business Support", phone: "0300 200 3300", desc: "Tax registration, VAT queries, self-assessment help. Open Mon-Fri 8am-6pm." },
                { name: "Business Wales / Business Gateway (Scotland)", phone: "03000 6 03000", desc: "Free business advice, mentoring, and startup support. Regional advisors available." },
                { name: "ACAS Helpline", phone: "0300 123 1100", desc: "Employment relations, contracts, disputes, and HR guidance. Essential when hiring." },
                { name: "Health & Safety Executive", phone: "0300 003 1747", desc: "Workplace safety requirements, COSHH, risk assessments, reporting incidents." }
              ].map((line, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{line.name}</p>
                    <p className="text-sm text-white/70 mt-1">{line.desc}</p>
                  </div>
                  <a
                    href={`tel:${line.phone.replace(/\s/g, '')}`}
                    className="text-base font-bold text-yellow-400 hover:text-yellow-300 whitespace-nowrap"
                  >
                    {line.phone}
                  </a>
                </div>
              ))}
            </div>
          </ContentBlock>

          <ContentBlock
            title="Essential Online Resources"
            icon={Globe}
            summary={
              <p className="text-white/90">
                Government and industry websites offer comprehensive guides, templates, and tools to help you set up and run your electrical business legally and professionally.
              </p>
            }
          >
            <div className="space-y-3">
              {[
                { name: "GOV.UK - Set up a Business", url: "gov.uk/set-up-business", desc: "Official government guide covering registration, tax, and legal requirements." },
                { name: "Companies House WebFiling", url: "companieshouse.gov.uk", desc: "Register and manage your limited company online. File annual accounts and returns." },
                { name: "Start Up Loans", url: "startuploans.co.uk", desc: "Government-backed loans up to £25,000 at 6% fixed interest with free mentoring." },
                { name: "Electrical Safety First", url: "electricalsafetyfirst.org.uk", desc: "Safety guidance, best practice resources, and consumer information." },
                { name: "IET Wiring Regulations", url: "theiet.org", desc: "BS 7671 updates, guidance notes, and technical resources from the regulation authors." }
              ].map((resource, i) => (
                <a
                  key={i}
                  href={`https://${resource.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-yellow-400/30 transition-colors group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-white group-hover:text-yellow-400 transition-colors">{resource.name}</p>
                    <p className="text-sm text-white/70 mt-1">{resource.desc}</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-yellow-400 flex-shrink-0 ml-4" />
                </a>
              ))}
            </div>
          </ContentBlock>
        </section>

        {/* Final Tip Card */}
        <div className="p-5 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 mt-10">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-yellow-400/20">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Your Journey Starts Here</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Starting a business requires careful planning and preparation, but thousands of electricians successfully make this transition every year. Take your time with the planning phase, seek advice when needed, and remember that every successful business started with a single step. Use the resources on this page, join industry bodies for support, and don't hesitate to ask questions.
              </p>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default BusinessStartup;
