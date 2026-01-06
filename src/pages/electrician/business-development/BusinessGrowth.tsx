import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  TrendingUp,
  Target,
  PoundSterling,
  Megaphone,
  Wrench,
  Settings,
  BarChart3,
  MapPin,
  Users,
  Smartphone,
  Shield,
  Calculator,
  CheckCircle,
  Zap,
  Crown,
  Award,
  LineChart,
  Timer,
  Calendar,
  Building,
  Heart,
  Globe,
  DollarSign,
  Clock,
  Briefcase,
} from "lucide-react";
import { BusinessPageLayout, SectionNav, ContentBlock, DataGrid, InfoList } from "@/components/business-hub";

const BusinessGrowth = () => {
  const [activeSection, setActiveSection] = useState("growth-strategies");

  const sections = [
    { id: "growth-strategies", label: "Growth", icon: Target },
    { id: "pricing", label: "Pricing", icon: PoundSterling },
    { id: "marketing", label: "Marketing", icon: Megaphone },
    { id: "services", label: "Services", icon: Wrench },
    { id: "operations", label: "Operations", icon: Settings },
    { id: "financial", label: "Financial", icon: BarChart3 },
  ];

  const keyStats = [
    { label: "Revenue Growth", value: "15-25%", sublabel: "Annual target" },
    { label: "Market ROI", value: "150-300%", sublabel: "With strategic planning" },
    { label: "Productivity", value: "200-400%", sublabel: "Team scaling efficiency" },
    { label: "Value Increase", value: "£50-200k", sublabel: "Annual business value" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const canonical = `${window.location.origin}/electrician/business-development/growth`;

  return (
    <>
      <Helmet>
        <title>Growing Your Electrical Business | Elec-Mate</title>
        <meta
          name="description"
          content="Strategies for expanding your electrical business, from marketing to diversifying services."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BusinessPageLayout
        title="Growing Your Business"
        subtitle="Strategies for expanding your electrical contracting business"
        icon={TrendingUp}
        backUrl="/electrician/business-development"
        accentColor="yellow"
      >
        {/* Key Stats */}
        <DataGrid items={keyStats} columns={4} />

        {/* Section Navigation */}
        <SectionNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Content Sections */}
        <div className="space-y-8 mt-8">
          {/* Growth Strategies Section */}
          <ContentBlock
            id="growth-strategies"
            title="Growth Strategies"
            icon={Target}
            summary={
              <p className="text-white">
                Strategic growth planning can increase business value by 200-400% over 2-3 years with proper execution.
                Focus on market expansion, team development, digital transformation, and financial planning for sustainable growth.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Market Expansion */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                    <MapPin className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">Market Expansion Strategy</h4>
                    <p className="text-sm text-white mt-1">6-18 months timeline • £15,000-50,000 investment • 150-300% expected ROI</p>
                  </div>
                </div>
                <p className="text-sm text-white mb-4">
                  Expand into new geographical areas and market segments for sustainable revenue growth.
                </p>
                <InfoList
                  variant="numbered"
                  items={[
                    { title: "Research & Analysis (1-2 months)", description: "Analyse local market demand, identify underserved areas within 50-mile radius, research commercial vs domestic opportunities" },
                    { title: "Strategic Planning (2-3 months)", description: "Develop expansion strategy, calculate investment requirements and expected ROI, establish local partnerships" },
                    { title: "Market Entry (3-12 months)", description: "Launch targeted digital marketing, establish local business relationships, hire qualified staff, monitor performance" },
                  ]}
                />
              </div>

              {/* Team Scaling */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                    <Users className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">Strategic Team Development</h4>
                    <p className="text-sm text-white mt-1">3-24 months timeline • £25,000-100,000 investment • 200-400% productivity return</p>
                  </div>
                </div>
                <p className="text-sm text-white mb-4">
                  Build and scale your workforce strategically for sustainable business growth.
                </p>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Workforce Assessment", description: "Assess current team capacity and skills, identify future requirements for growth targets" },
                    { title: "Strategic Recruitment", description: "Recruit qualified electricians and apprentices, establish subcontractor partnerships" },
                    { title: "Team Development", description: "Continuous skills training, performance management, career progression pathways" },
                  ]}
                />
              </div>

              {/* Digital Transformation */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                    <Smartphone className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">Digital Business Transformation</h4>
                    <p className="text-sm text-white mt-1">3-12 months timeline • £10,000-30,000 investment • 250-500% efficiency return</p>
                  </div>
                </div>
                <p className="text-sm text-white mb-4">
                  Modernise operations with digital tools and smart technology integration.
                </p>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Digital Project Management", description: "Implement project management and CRM systems for improved efficiency" },
                    { title: "Mobile Workforce Management", description: "Set up mobile tools for scheduling, job tracking, and real-time updates" },
                    { title: "Smart Technology Offerings", description: "Integrate smart home and IoT installation services for premium revenue" },
                  ]}
                />
              </div>

              {/* UK 2025 Opportunities */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  UK Market Opportunities 2025
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Government green energy infrastructure programmes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">EV charging network expansion opportunities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Smart home technology adoption surge</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Apprenticeship Levy utilisation for training</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Pricing Strategies Section */}
          <ContentBlock
            id="pricing"
            title="Pricing Strategies"
            icon={PoundSterling}
            summary={
              <p className="text-white">
                Strategic pricing optimisation can increase profit margins by 15-35% while maintaining competitive market position.
                UK average electrician rates range from £40-85/hour depending on region and specialisation.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Regional Pricing Benchmarks */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-yellow-400" />
                  Regional Pricing Standards
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">London Premium</span>
                      <span className="text-xs text-yellow-400">+25-35%</span>
                    </div>
                    <p className="text-sm text-white/90">£65-85/hour average</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">South East</span>
                      <span className="text-xs text-yellow-400">+15-25%</span>
                    </div>
                    <p className="text-sm text-white/90">£55-70/hour average</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Northern England</span>
                      <span className="text-xs text-yellow-400">Baseline</span>
                    </div>
                    <p className="text-sm text-white/90">£40-55/hour average</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Emergency Call-out</span>
                      <span className="text-xs text-yellow-400">+50-100%</span>
                    </div>
                    <p className="text-sm text-white/90">£75-120/hour typical</p>
                  </div>
                </div>
              </div>

              {/* Pricing Strategies */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Cost-Plus Pricing</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Build sustainable pricing based on true costs plus desired profit margin. Calculate hourly labour costs including NI, pension, and benefits.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">10-25% margin improvement</span>
                    <span className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-lg border border-white/10">Low risk</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Value-Based Pricing</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Price based on customer value received rather than just costs incurred. Quantify benefits like safety, compliance, and efficiency.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">20-50% price premium</span>
                    <span className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-lg border border-white/10">Medium risk</span>
                  </div>
                </div>
              </div>

              {/* Premium Service Justification */}
              <InfoList
                variant="checklist"
                items={[
                  { title: "Specialisation Premium", description: "Smart home automation, commercial renewable energy, emergency services command 25-50% above standard rates" },
                  { title: "Service Excellence", description: "Comprehensive warranties, transparent communication, 24/7 support justify premium positioning" },
                  { title: "Technology Enhancement", description: "Thermal imaging, drone inspections, IoT monitoring create efficiency gains of 20-35%" },
                ]}
              />
            </div>
          </ContentBlock>

          {/* Marketing Section */}
          <ContentBlock
            id="marketing"
            title="Marketing & Lead Generation"
            icon={Megaphone}
            summary={
              <p className="text-white">
                Effective marketing combines digital presence with traditional networking to generate consistent leads.
                Most successful electrical businesses allocate 5-10% of revenue to marketing efforts.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Digital Marketing */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-yellow-400" />
                  Digital Marketing Essentials
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Professional Website", description: "Mobile-optimised site with clear services, pricing, and contact information. Include portfolio and testimonials." },
                    { title: "Google Business Profile", description: "Fully optimised profile with photos, services, hours, and regular post updates. Respond to all reviews." },
                    { title: "Social Media Presence", description: "Facebook and Instagram for project showcases. LinkedIn for commercial clients and networking." },
                    { title: "Local SEO", description: "Target location-specific keywords, build local citations, and encourage customer reviews." },
                  ]}
                />
              </div>

              {/* Traditional Marketing */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-yellow-400" />
                  Traditional Marketing & Networking
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Trade Partnerships", description: "Build referral relationships with builders, plumbers, property managers, and estate agents" },
                    { title: "Vehicle Branding", description: "Professional van signage and wraps provide constant visibility throughout your service area" },
                    { title: "Local Business Groups", description: "Join BNI, Chamber of Commerce, and trade associations for networking opportunities" },
                    { title: "Customer Referral Programme", description: "Incentivise existing customers to refer new business with discounts or credits" },
                  ]}
                />
              </div>

              {/* Lead Generation Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">60-80%</p>
                  <p className="text-xs text-white/90 mt-1">Referral close rate</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">5-10%</p>
                  <p className="text-xs text-white/90 mt-1">Marketing budget</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">£50-150</p>
                  <p className="text-xs text-white/90 mt-1">Cost per lead</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">150-300%</p>
                  <p className="text-xs text-white/90 mt-1">Marketing ROI</p>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Service Diversification Section */}
          <ContentBlock
            id="services"
            title="Service Diversification"
            icon={Wrench}
            summary={
              <p className="text-white">
                Expand your service offerings to increase revenue per customer and reduce dependency on single service types.
                High-growth areas include renewable energy, smart home technology, and commercial maintenance contracts.
              </p>
            }
          >
            <div className="space-y-6">
              {/* High-Growth Services */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Renewable Energy</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Solar PV installation, battery storage systems, and EV charging infrastructure represent the fastest-growing segments in UK electrical work.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Solar PV: £8,000-15,000 average job value</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">EV charging: £800-2,500 per installation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Battery storage: £5,000-12,000 per system</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Smartphone className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Smart Home Technology</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Automated lighting, security systems, and integrated home management systems offer recurring revenue opportunities.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Smart lighting: £1,500-5,000 per property</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Security systems: £2,000-8,000 installation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Maintenance contracts: £200-500/year recurring</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commercial Opportunities */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5 text-yellow-400" />
                  Commercial Market Opportunities
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Maintenance Contracts", description: "Regular inspection and maintenance agreements provide predictable recurring revenue of £5,000-50,000/year per client" },
                    { title: "Fit-Out Work", description: "Office and retail electrical installations offer £10,000-100,000+ project values with repeat client potential" },
                    { title: "Emergency Response", description: "24/7 commercial emergency call-out services command premium rates and build client loyalty" },
                    { title: "Energy Audits", description: "Energy efficiency assessments and LED upgrades for commercial clients with typical ROI of 2-4 years" },
                  ]}
                />
              </div>

              {/* Certification Requirements */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Required Certifications for Service Expansion
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">MCS certification for solar PV installations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">OZEV approved installer for EV charging</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Part P certification for domestic work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">City & Guilds 2919 for EV charging</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Operations Section */}
          <ContentBlock
            id="operations"
            title="Operations & Efficiency"
            icon={Settings}
            summary={
              <p className="text-white">
                Streamlined operations increase profitability by reducing waste, improving productivity, and enhancing customer satisfaction.
                Top performers achieve 85%+ utilisation rates and 95%+ first-time fix rates.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Key Performance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">85%+</p>
                  <p className="text-xs text-white/90 mt-1">Target utilisation</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">95%+</p>
                  <p className="text-xs text-white/90 mt-1">First-time fix rate</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">2%</p>
                  <p className="text-xs text-white/90 mt-1">Target callback rate</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">4.8+</p>
                  <p className="text-xs text-white/90 mt-1">Review rating target</p>
                </div>
              </div>

              {/* Operational Systems */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  Essential Operational Systems
                </h4>
                <InfoList
                  variant="numbered"
                  items={[
                    { title: "Job Management Software", description: "Track jobs from quote to completion with scheduling, invoicing, and customer communication integrated" },
                    { title: "Inventory Management", description: "Monitor stock levels, automate reordering, and track material costs per job for accurate pricing" },
                    { title: "Time Tracking", description: "Capture accurate time per job for profitability analysis and billing accuracy" },
                    { title: "Quality Control", description: "Standardised checklists, photo documentation, and customer sign-off procedures" },
                  ]}
                />
              </div>

              {/* Process Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Timer className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Time Efficiency</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Optimise travel routes to reduce windscreen time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Pre-stage materials for common job types</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Use mobile apps for on-site documentation</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Customer Experience</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Automated appointment reminders and updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Professional uniforms and branded materials</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Post-job follow-up and review requests</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Financial Management Section */}
          <ContentBlock
            id="financial"
            title="Financial Management"
            icon={BarChart3}
            summary={
              <p className="text-white">
                Sound financial management ensures sustainable growth and business stability.
                Target gross margins of 35-50% and net margins of 8-15% for a healthy electrical contracting business.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Financial Benchmarks */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-yellow-400" />
                  Industry Financial Benchmarks
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Gross Profit Margin</span>
                      <span className="text-xs text-yellow-400">Target: 35-50%</span>
                    </div>
                    <p className="text-sm text-white/90">UK average: 42%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Net Profit Margin</span>
                      <span className="text-xs text-yellow-400">Target: 8-15%</span>
                    </div>
                    <p className="text-sm text-white/90">UK average: 11%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Revenue per Employee</span>
                      <span className="text-xs text-yellow-400">Target: £80-120k</span>
                    </div>
                    <p className="text-sm text-white/90">Industry average: £95k</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Annual Revenue Growth</span>
                      <span className="text-xs text-yellow-400">Target: 15-25%</span>
                    </div>
                    <p className="text-sm text-white/90">Top performers: 22%</p>
                  </div>
                </div>
              </div>

              {/* Cash Flow Management */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-yellow-400" />
                  Cash Flow Best Practices
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Deposit Collection", description: "Collect 25-50% deposits on larger jobs to improve cash flow and reduce risk" },
                    { title: "Invoice Promptly", description: "Send invoices same day as job completion with clear payment terms (14-30 days)" },
                    { title: "Chase Payments", description: "Systematic follow-up process for overdue payments including phone calls and statements" },
                    { title: "Operating Reserve", description: "Maintain 3-6 months operating expenses in reserve for stability" },
                  ]}
                />
              </div>

              {/* Growth Investment */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Financial Growth Strategy
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Access green energy grants and incentive schemes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Claim R&D tax credits for innovation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Establish business credit facilities early</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Reinvest 10-20% of profits for growth</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>
        </div>

        {/* Footer Tip */}
        <div className="mt-8 p-5 rounded-2xl bg-yellow-400/5 border border-yellow-400/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
              <Target className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Remember</h3>
              <p className="text-sm text-white leading-relaxed">
                Growing a successful electrical business requires patience, strategic planning, and consistent
                execution. Focus on building strong relationships, maintaining high-quality standards, and
                adapting to market changes. Sustainable growth of 15-25% annually is achievable with the right approach.
              </p>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default BusinessGrowth;
