import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Target,
  TrendingUp,
  Users,
  Search,
  Monitor,
  Megaphone,
  HandHelping,
  Globe,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Award,
  Heart,
  Zap,
  BarChart3,
  Calendar,
  Clock,
  FileText,
  Shield,
  Smartphone,
  ThumbsUp,
  Repeat,
  Gift,
} from "lucide-react";
import { BusinessPageLayout, SectionNav, ContentBlock, DataGrid, InfoList } from "@/components/business-hub";

const BusinessCustomers = () => {
  const [activeSection, setActiveSection] = useState("market-research");

  const sections = [
    { id: "market-research", label: "Research", icon: Search },
    { id: "digital-marketing", label: "Digital", icon: Monitor },
    { id: "traditional-marketing", label: "Traditional", icon: Megaphone },
    { id: "lead-generation", label: "Leads", icon: Target },
    { id: "customer-experience", label: "Experience", icon: Users },
    { id: "retention-growth", label: "Retention", icon: TrendingUp },
  ];

  const keyStats = [
    { label: "Referral Close Rate", value: "60-80%", sublabel: "Best lead source" },
    { label: "Marketing Budget", value: "5-10%", sublabel: "Of revenue" },
    { label: "Customer Lifetime", value: "£2-5k", sublabel: "Average value" },
    { label: "Retention Target", value: "85%+", sublabel: "Repeat customers" },
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

  const canonical = `${window.location.origin}/electrician/business-development/customers`;

  return (
    <>
      <Helmet>
        <title>Customer Acquisition for Electricians | Elec-Mate</title>
        <meta
          name="description"
          content="Comprehensive guide to customer acquisition for UK electricians. Learn market research, digital marketing, lead generation and customer retention strategies."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BusinessPageLayout
        title="Customer Acquisition"
        subtitle="Proven methods to attract and retain clients for your electrical services"
        icon={HandHelping}
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
          {/* Market Research Section */}
          <ContentBlock
            id="market-research"
            title="Market Research"
            icon={Search}
            summary={
              <p className="text-white">
                Understanding your local market is essential for targeting the right customers.
                Research competitor pricing, identify service gaps, and understand customer needs before investing in marketing.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Target Markets */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-400" />
                  Key Customer Segments
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">Domestic Customers</h5>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">Homeowners needing repairs and upgrades</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">New homebuyers requiring inspections</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">Landlords with compliance requirements</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">Commercial Customers</h5>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">Small businesses and retail units</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">Property management companies</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">Construction and development firms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitor Analysis */}
              <InfoList
                variant="numbered"
                items={[
                  { title: "Identify Competitors", description: "List all electrical businesses within your service area through Google, trade directories, and local advertising" },
                  { title: "Analyse Pricing", description: "Research competitor pricing through quotes, website information, and industry forums to position competitively" },
                  { title: "Find Service Gaps", description: "Identify services competitors don't offer or areas they underserve for competitive advantage" },
                  { title: "Monitor Reviews", description: "Read competitor reviews to understand customer complaints and exceed expectations" },
                ]}
              />
            </div>
          </ContentBlock>

          {/* Digital Marketing Section */}
          <ContentBlock
            id="digital-marketing"
            title="Digital Marketing"
            icon={Monitor}
            summary={
              <p className="text-white">
                A strong online presence is essential for modern electrical businesses.
                Over 80% of customers search online before choosing a tradesperson, making digital marketing your highest-ROI channel.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Essential Digital Channels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Professional Website</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Your website is your 24/7 sales representative. Invest in a professional, mobile-friendly site.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Clear service descriptions and pricing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Portfolio of completed work with photos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Customer testimonials and reviews</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Easy contact forms and click-to-call</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Google Business Profile</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Your Google profile appears in local searches and Google Maps. Optimise it for maximum visibility.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Complete all profile sections fully</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Add photos of work, team, and vehicles</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Respond to all reviews promptly</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Post regular updates and offers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Strategy */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-yellow-400" />
                  Social Media Strategy
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Facebook Business Page", description: "Share project photos, customer testimonials, and seasonal tips. Ideal for domestic customers and community engagement" },
                    { title: "Instagram Portfolio", description: "Visual showcase of your best work. Before/after photos perform exceptionally well for electrical installations" },
                    { title: "LinkedIn Presence", description: "Connect with property managers, developers, and commercial clients. Share industry expertise and certifications" },
                    { title: "Nextdoor Community", description: "Highly effective for local recommendations and community trust-building in specific neighbourhoods" },
                  ]}
                />
              </div>

              {/* Digital Marketing Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">80%+</p>
                  <p className="text-xs text-white/90 mt-1">Search online first</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">4.5+</p>
                  <p className="text-xs text-white/90 mt-1">Star rating needed</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">3-5x</p>
                  <p className="text-xs text-white/90 mt-1">ROI on SEO</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">£500-2k</p>
                  <p className="text-xs text-white/90 mt-1">Website cost</p>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Traditional Marketing Section */}
          <ContentBlock
            id="traditional-marketing"
            title="Traditional Marketing"
            icon={Megaphone}
            summary={
              <p className="text-white">
                Traditional marketing methods still deliver excellent results for local electrical businesses.
                Vehicle branding, leaflets, and local networking generate highly qualified leads with strong conversion rates.
              </p>
            }
          >
            <div className="space-y-6">
              {/* High-Impact Methods */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Vehicle Branding</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Your van is a mobile billboard seen by thousands daily. Professional signage builds credibility and generates enquiries.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">£500-2,000 investment</span>
                    <span className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-lg border border-white/10">5+ year lifespan</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Leaflets & Flyers</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Targeted leaflet drops in specific areas can generate consistent enquiries, especially after completing visible work.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">1-3% response rate</span>
                    <span className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-lg border border-white/10">£0.05-0.15 per drop</span>
                  </div>
                </div>
              </div>

              {/* Networking */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                  Networking & Partnerships
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Trade Referrals", description: "Build relationships with plumbers, builders, decorators, and kitchen fitters for mutual referral arrangements" },
                    { title: "Estate Agents", description: "Connect with local estate agents for referrals during property sales and electrical inspection requirements" },
                    { title: "Property Managers", description: "Establish relationships with letting agents and property management companies for regular maintenance work" },
                    { title: "Business Networks", description: "Join BNI, FSB, or local Chamber of Commerce for structured networking and business referrals" },
                  ]}
                />
              </div>

              {/* Local Advertising */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Local Advertising Options
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Local newspapers and community magazines</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Sports club and community sponsorships</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Trade directories (Checkatrade, Yell)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Local radio and community notice boards</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Lead Generation Section */}
          <ContentBlock
            id="lead-generation"
            title="Lead Generation"
            icon={Target}
            summary={
              <p className="text-white">
                Consistent lead generation ensures a steady pipeline of work.
                Diversify lead sources to avoid dependency on any single channel and maintain business stability.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Lead Sources */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-yellow-400" />
                  Lead Source Performance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Customer Referrals</span>
                      <span className="text-xs text-yellow-400">60-80% close rate</span>
                    </div>
                    <p className="text-sm text-white/90">Highest quality, lowest cost leads</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Google Search</span>
                      <span className="text-xs text-yellow-400">30-50% close rate</span>
                    </div>
                    <p className="text-sm text-white/90">High intent, actively searching</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Trade Platforms</span>
                      <span className="text-xs text-yellow-400">20-40% close rate</span>
                    </div>
                    <p className="text-sm text-white/90">Checkatrade, MyBuilder, Rated People</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Social Media</span>
                      <span className="text-xs text-yellow-400">15-30% close rate</span>
                    </div>
                    <p className="text-sm text-white/90">Relationship-based, longer nurture</p>
                  </div>
                </div>
              </div>

              {/* Lead Management */}
              <InfoList
                variant="numbered"
                items={[
                  { title: "Respond Quickly", description: "Aim to respond to all enquiries within 1 hour during business hours. Speed of response significantly impacts conversion" },
                  { title: "Qualify Leads", description: "Ask key questions upfront: location, job type, timeline, and budget to prioritise your time effectively" },
                  { title: "Follow Up Consistently", description: "Follow up on quotes within 48 hours. Many jobs are won simply by being persistent when competitors aren't" },
                  { title: "Track Everything", description: "Use a CRM or spreadsheet to track lead sources, conversion rates, and job values to optimise marketing spend" },
                ]}
              />

              {/* Response Time Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">&lt;1hr</p>
                  <p className="text-xs text-white/90 mt-1">Target response</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">48hr</p>
                  <p className="text-xs text-white/90 mt-1">Quote follow-up</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">3-5</p>
                  <p className="text-xs text-white/90 mt-1">Lead sources min</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">70%</p>
                  <p className="text-xs text-white/90 mt-1">Quote-to-job target</p>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Customer Experience Section */}
          <ContentBlock
            id="customer-experience"
            title="Customer Experience"
            icon={Users}
            summary={
              <p className="text-white">
                Exceptional customer experience differentiates your business and generates referrals.
                Every interaction is an opportunity to impress and build long-term relationships.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Service Excellence */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Service Excellence Standards
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Professional Appearance", description: "Clean uniforms, branded workwear, and tidy appearance build immediate trust and credibility" },
                    { title: "Clear Communication", description: "Explain work clearly, provide written quotes, and keep customers informed throughout the job" },
                    { title: "Respect Their Property", description: "Use dust sheets, clean up thoroughly, and treat customer homes with care and respect" },
                    { title: "Punctuality", description: "Arrive on time or communicate delays immediately. Being reliable sets you apart from competitors" },
                  ]}
                />
              </div>

              {/* Communication Journey */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Before the Job</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Confirm appointment day before</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Send arrival time update</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Provide contact information</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">During the Job</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Explain work as you proceed</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Discuss any changes needed</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Get approval before extras</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <ThumbsUp className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">After the Job</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Walk through completed work</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Provide certificates and docs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Request review and referral</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handling Issues */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Handling Customer Concerns
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Listen fully before responding</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Apologise for inconvenience caused</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Offer prompt resolution</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Follow up to ensure satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Retention & Growth Section */}
          <ContentBlock
            id="retention-growth"
            title="Retention & Growth"
            icon={TrendingUp}
            summary={
              <p className="text-white">
                Retaining existing customers costs 5-10x less than acquiring new ones.
                Focus on building long-term relationships that generate repeat business and referrals.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Retention Strategies */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Repeat className="h-5 w-5 text-yellow-400" />
                  Customer Retention Strategies
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Annual Safety Checks", description: "Offer annual electrical safety inspections to maintain regular contact and identify upgrade opportunities" },
                    { title: "Maintenance Reminders", description: "Send reminders for smoke detector testing, RCD checks, and EICR renewals to stay top of mind" },
                    { title: "Loyalty Benefits", description: "Offer returning customers priority booking, small discounts, or free minor repairs as appreciation" },
                    { title: "Regular Communication", description: "Send seasonal tips, safety advice, and relevant updates through email newsletters" },
                  ]}
                />
              </div>

              {/* Referral Programme */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Gift className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Referral Programme</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Formalise referrals with a structured programme that rewards customers for recommendations.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">£20-50 credit per successful referral</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Discount for the referred customer too</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Thank you cards for all referrals</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Reviews & Testimonials</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Positive reviews are powerful social proof that influence new customers' decisions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Ask every satisfied customer for a review</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Send direct links to make it easy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Respond to all reviews publicly</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retention Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">5-10x</p>
                  <p className="text-xs text-white/90 mt-1">Cheaper to retain</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">85%+</p>
                  <p className="text-xs text-white/90 mt-1">Retention target</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">3-5x</p>
                  <p className="text-xs text-white/90 mt-1">Repeat job value</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">60%</p>
                  <p className="text-xs text-white/90 mt-1">Revenue from referrals</p>
                </div>
              </div>
            </div>
          </ContentBlock>
        </div>

        {/* Footer Tip */}
        <div className="mt-8 p-5 rounded-2xl bg-yellow-400/5 border border-yellow-400/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
              <Heart className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Remember</h3>
              <p className="text-sm text-white leading-relaxed">
                Customer acquisition is a marathon, not a sprint. Focus on building genuine relationships,
                delivering exceptional service, and maintaining consistent marketing efforts. Satisfied
                customers are your best marketing tool through referrals and testimonials.
              </p>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default BusinessCustomers;
