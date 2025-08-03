import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Megaphone, 
  Star, 
  Users, 
  Globe, 
  Phone, 
  MessageSquare, 
  TrendingUp,
  Target,
  Eye,
  Search,
  Share2,
  Mail,
  Smartphone,
  Camera,
  FileText,
  Calendar,
  PoundSterling,
  Calculator,
  CheckCircle,
  Award,
  Shield,
  Lightbulb,
  BarChart3,
  Heart,
  Zap,
  Building,
  MapPin,
  Clock,
  Brain,
  Settings,
  Network,
  DollarSign,
  Percent,
  Timer,
  LineChart
} from "lucide-react";

export const MarketingTab = () => {
  const isMobile = useIsMobile();

  // Marketing metrics matching the pattern from other tabs
  const marketingMetrics = [
    {
      metric: "Lead Generation Cost",
      data: "£30-80 per qualified lead",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Digital marketing channels for electrical contractors"
    },
    {
      metric: "Conversion Rate Target",
      data: "15-25% quote to job ratio",
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
      detail: "Industry standard for electrical service quotes"
    },
    {
      metric: "Customer Lifetime Value",
      data: "£2,500-8,000 average CLV",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "Including repeat business and referrals"
    },
    {
      metric: "Marketing ROI Target",
      data: "300-500% return investment",
      icon: <PoundSterling className="h-5 w-5 text-purple-400" />,
      detail: "Sustainable marketing spend efficiency"
    }
  ];

  const marketingStrategies = [
    {
      id: "digital-marketing",
      title: "Digital Marketing & Online Presence",
      timeline: "3-6 months to establish",
      description: "Build a comprehensive digital marketing strategy to dominate local search results and attract customers online",
      components: [
        "Professional website with local SEO optimisation",
        "Google My Business profile management and optimisation",
        "Social media presence and content marketing strategy",
        "Online review management and reputation building",
        "Pay-per-click advertising campaigns (Google Ads, Facebook)"
      ],
      implementation: [
        {
          phase: "Foundation Setup (1-2 months)",
          tasks: [
            "Create professional website with mobile responsiveness and fast loading",
            "Set up Google My Business profile with complete information and photos",
            "Claim and optimise listings on major trade directories and review sites",
            "Establish social media profiles on Facebook, Instagram, and LinkedIn"
          ]
        },
        {
          phase: "Content & SEO Development (2-3 months)",
          tasks: [
            "Develop local SEO strategy targeting 'electrician near me' keywords",
            "Create valuable content including electrical safety tips and guides",
            "Implement Google My Business posting schedule with project photos",
            "Launch customer review acquisition campaign with follow-up processes"
          ]
        },
        {
          phase: "Paid Advertising & Optimisation (3-6 months)",
          tasks: [
            "Launch targeted Google Ads campaigns for emergency electrical services",
            "Implement Facebook and Instagram advertising for residential projects",
            "Monitor and optimise ad performance with A/B testing",
            "Track ROI and adjust budget allocation across channels"
          ]
        }
      ],
      ukSpecific2025: [
        "Digital Services Tax implications for online advertising spend",
        "GDPR compliance for customer data collection and email marketing",
        "Local search algorithm changes favouring verified UK businesses",
        "Post-Brexit changes affecting international marketing tool availability"
      ],
      investment: "£1,500-5,000 setup + £500-2,000/month ongoing",
      roi: "300-600% with proper execution",
      riskLevel: "Low risk with high potential returns"
    },
    {
      id: "local-community",
      title: "Local Community Marketing & Networking",
      timeline: "2-12 months ongoing",
      description: "Build strong local relationships and establish your business as the go-to electrical contractor in your area",
      components: [
        "Strategic business networking and trade associations",
        "Community sponsorship and local event participation",
        "Partnership development with complementary trades",
        "Local print and radio advertising campaigns",
        "Neighbourhood marketing and door-to-door strategies"
      ],
      implementation: [
        {
          phase: "Network Building (1-3 months)",
          tasks: [
            "Join local Chamber of Commerce and business networking groups",
            "Attend trade association meetings and electrical industry events",
            "Connect with local builders, plumbers, and property managers",
            "Identify community sponsorship opportunities within budget"
          ]
        },
        {
          phase: "Community Engagement (2-6 months)",
          tasks: [
            "Sponsor local sports teams or community events",
            "Participate in home and trade shows with professional booth",
            "Offer free electrical safety talks to community groups",
            "Develop referral programme with complementary trade businesses"
          ]
        },
        {
          phase: "Local Advertising (3-12 months)",
          tasks: [
            "Place strategic ads in local newspapers and magazines",
            "Sponsor local radio shows or traffic reports during peak times",
            "Implement targeted leaflet distribution in high-value areas",
            "Monitor local advertising ROI and adjust strategy accordingly"
          ]
        }
      ],
      ukSpecific2025: [
        "Community investment tax relief opportunities for local sponsorship",
        "Post-pandemic resurgence in local community events and networking",
        "Increased focus on supporting local businesses over national chains",
        "Local council initiatives promoting small business collaboration"
      ],
      investment: "£500-2,500/month community engagement",
      roi: "200-400% through referrals and relationships",
      riskLevel: "Low risk with long-term relationship benefits"
    },
    {
      id: "referral-systems",
      title: "Customer Referral & Retention Systems",
      timeline: "1-3 months to implement",
      description: "Develop systematic approaches to turn satisfied customers into brand ambassadors and repeat clients",
      components: [
        "Structured customer feedback and review acquisition",
        "Referral incentive programmes and reward systems",
        "Customer retention strategies and follow-up protocols",
        "Testimonial and case study development process",
        "Customer loyalty programme for repeat business"
      ],
      implementation: [
        {
          phase: "System Development (1 month)",
          tasks: [
            "Create customer feedback survey and review request process",
            "Design referral programme with attractive incentives for customers",
            "Develop customer database and CRM system for follow-ups",
            "Create professional case study templates and testimonial formats"
          ]
        },
        {
          phase: "Process Implementation (1-2 months)",
          tasks: [
            "Train team on customer service excellence and review requests",
            "Implement post-job follow-up system within 24-48 hours",
            "Launch referral programme with existing satisfied customers",
            "Begin collecting testimonials and before/after project photos"
          ]
        },
        {
          phase: "Optimisation & Scaling (2-3 months)",
          tasks: [
            "Monitor referral programme performance and adjust incentives",
            "Analyse customer feedback to improve service delivery",
            "Develop customer retention campaigns for past clients",
            "Create customer appreciation events or special offers"
          ]
        }
      ],
      ukSpecific2025: [
        "Consumer Duty regulations affecting customer communication",
        "Data protection requirements for customer follow-up systems",
        "Economic pressures increasing value of customer retention",
        "Trust and reputation becoming critical in uncertain economy"
      ],
      investment: "£500-1,500 system setup + ongoing incentive costs",
      roi: "400-800% through referrals and repeat business",
      riskLevel: "Very low risk with high customer satisfaction"
    },
    {
      id: "content-marketing",
      title: "Content Marketing & Thought Leadership",
      timeline: "3-12 months to establish authority",
      description: "Position yourself as the electrical expert in your area through valuable content and educational marketing",
      components: [
        "Educational blog content and electrical safety guides",
        "Video content showcasing expertise and projects",
        "Email newsletter with tips and electrical insights",
        "Webinar and workshop hosting for potential customers",
        "Industry thought leadership and media appearances"
      ],
      implementation: [
        {
          phase: "Content Strategy Development (1-2 months)",
          tasks: [
            "Research customer questions and electrical safety concerns",
            "Plan content calendar with seasonal electrical topics",
            "Set up blog, YouTube channel, and email marketing platform",
            "Develop content templates and brand voice guidelines"
          ]
        },
        {
          phase: "Content Creation & Distribution (2-6 months)",
          tasks: [
            "Produce weekly blog posts on electrical safety and maintenance",
            "Create video content showing electrical installations and repairs",
            "Launch monthly email newsletter with electrical tips and offers",
            "Share content across social media platforms consistently"
          ]
        },
        {
          phase: "Authority Building (6-12 months)",
          tasks: [
            "Host webinars on electrical safety for homeowners",
            "Speak at local business events and home improvement shows",
            "Collaborate with local media for electrical safety segments",
            "Build email list and nurture leads through educational content"
          ]
        }
      ],
      ukSpecific2025: [
        "Building Safety Act creating demand for electrical safety education",
        "Energy efficiency regulations driving content opportunities",
        "Smart home technology adoption requiring expert guidance",
        "Video content consumption increasing on mobile platforms"
      ],
      investment: "£300-1,000/month content creation and tools",
      roi: "250-450% through education-based lead generation",
      riskLevel: "Medium risk requiring consistent content creation"
    }
  ];

  const marketingChannelsBenchmarks = [
    {
      category: "Digital Marketing Channels",
      benchmarks: [
        { metric: "Google Ads Cost Per Click", target: "£2-8 CPC", current: "Electrical services average £4.50" },
        { metric: "Facebook Ads Cost Per Lead", target: "£15-40 CPL", current: "Local services average £25" },
        { metric: "SEO Lead Generation", target: "20-50 leads/month", current: "Well-optimised sites achieve 35+" },
        { metric: "Email Marketing ROI", target: "£25-42 per £1 spent", current: "Industry average £38 return" }
      ]
    },
    {
      category: "Traditional Marketing Channels",
      benchmarks: [
        { metric: "Local Print Advertising", target: "2-5% response rate", current: "Community papers average 3.2%" },
        { metric: "Direct Mail Response", target: "1-3% response rate", current: "Targeted areas achieve 2.1%" },
        { metric: "Radio Advertising ROI", target: "£3-7 per £1 spent", current: "Local stations average £4.80" },
        { metric: "Referral Programme Success", target: "15-30% customer participation", current: "Well-designed programmes 22%" }
      ]
    }
  ];

  const salesConversionStrategies = [
    {
      title: "Quote Presentation Excellence",
      description: "Master the art of presenting quotes that win business",
      strategies: [
        "Professional quote presentation with clear breakdown of costs",
        "Multiple option presentation (good, better, best approach)",
        "Value-based selling focusing on safety, reliability, and compliance",
        "Same-day quote delivery for competitive advantage"
      ],
      impact: "Quote conversion improvement 25-40%"
    },
    {
      title: "Customer Trust Building",
      description: "Establish credibility and trust from first contact",
      strategies: [
        "Professional appearance and fully branded vehicles",
        "Display certifications, insurance, and trade memberships",
        "Provide customer references and testimonials",
        "Offer guarantees and warranties on all electrical work"
      ],
      impact: "Customer confidence increase 35-50%"
    },
    {
      title: "Follow-Up & Persistence",
      description: "Systematic follow-up process to convert delayed decisions",
      strategies: [
        "24-hour quote follow-up with additional information",
        "Weekly check-ins without being pushy or aggressive",
        "Seasonal reminders for electrical maintenance and upgrades",
        "Lost quote analysis to improve future presentations"
      ],
      impact: "Conversion rate improvement 15-25%"
    }
  ];

  const performanceMetrics = [
    {
      category: "Lead Generation",
      kpis: [
        "Monthly lead volume by marketing channel",
        "Cost per lead across different marketing strategies",
        "Lead quality scoring and qualification rates",
        "Source attribution and conversion tracking by channel"
      ]
    },
    {
      category: "Sales Conversion",
      kpis: [
        "Quote-to-job conversion rates by project type",
        "Sales cycle length from enquiry to completion",
        "Average project value and profit margins by lead source",
        "Customer acquisition cost (CAC) vs lifetime value (CLV)"
      ]
    },
    {
      category: "Brand & Reputation",
      kpis: [
        "Online review ratings and response rates",
        "Brand awareness in target geographical areas",
        "Social media engagement and follower growth",
        "Website traffic, rankings, and conversion rates"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <Megaphone className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow">
          Effective marketing can increase lead generation by 300-500% and reduce customer acquisition costs by 40-60%.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {marketingMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        {marketingStrategies.map((strategy) => (
          <MobileAccordionItem key={strategy.id} value={strategy.id}>
            <MobileAccordionTrigger icon={
              strategy.id === "digital-marketing" ? <Globe className="h-5 w-5 text-blue-400" /> :
              strategy.id === "local-community" ? <Building className="h-5 w-5 text-green-400" /> :
              strategy.id === "referral-systems" ? <Users className="h-5 w-5 text-purple-400" /> :
              <FileText className="h-5 w-5 text-orange-400" />
            }>
              {strategy.title}
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                <div className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.title}</h4>
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {strategy.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                  </div>

                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{strategy.investment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{strategy.roi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{strategy.riskLevel}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Components</h5>
                    <ul className="space-y-1">
                      {strategy.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Timeline</h5>
                    <div className="space-y-3">
                      {strategy.implementation.map((phase, phaseIndex) => (
                        <div key={phaseIndex} className="border-l-2 border-elec-yellow/30 pl-3 space-y-1">
                          <h6 className={`font-medium text-elec-yellow ${isMobile ? 'text-xs' : 'text-sm'}`}>{phase.phase}</h6>
                          <ul className="space-y-0.5">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-start gap-1`}>
                                <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-yellow-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>UK Market Opportunities 2025</h5>
                    <ul className="space-y-1">
                      {strategy.ukSpecific2025.map((opportunity, oppIndex) => (
                        <li key={oppIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-yellow-200 flex items-center gap-1`}>
                          <Zap className="h-3 w-3 text-elec-yellow shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}

        <MobileAccordionItem value="channel-benchmarks">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-cyan-400" />}>
            Marketing Channel Benchmarks & ROI
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  Industry benchmarks and performance standards for electrical marketing channels
                </p>
                
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {marketingChannelsBenchmarks.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-4">
                      <h4 className={`font-semibold text-elec-yellow ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                      <div className="space-y-3">
                        {category.benchmarks.map((benchmark, benchmarkIndex) => (
                          <div key={benchmarkIndex} className="bg-elec-gray/30 rounded-lg p-4 space-y-2">
                            <div className="flex justify-center">
                              <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                {benchmark.target}
                              </Badge>
                            </div>
                            <div className="text-center">
                              <h5 className={`font-medium text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                {benchmark.metric}
                              </h5>
                              <div className="flex items-center justify-center gap-2 mt-1">
                                <LineChart className="h-3 w-3 text-muted-foreground" />
                                <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                                  {benchmark.current}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="sales-conversion">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-emerald-400" />}>
            Sales Conversion Strategies
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  Proven strategies to convert leads into paying customers and increase quote success rates
                </p>
                
                <div className="space-y-4">
                  {salesConversionStrategies.map((strategy, strategyIndex) => (
                    <div key={strategyIndex} className="border border-purple-500/20 rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-semibold text-purple-300 ${isMobile ? 'text-sm' : 'text-base'}`}>
                            {strategy.title}
                          </h4>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mt-1`}>
                            {strategy.description}
                          </p>
                        </div>
                        <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ml-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          <Star className="h-3 w-3 mr-1" />
                          Proven
                        </Badge>
                      </div>
                      
                      <div className="grid gap-2">
                        {strategy.strategies.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <Award className="h-3 w-3 text-purple-400 shrink-0" />
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2 border-t border-purple-500/20">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-300 font-medium`}>
                          Impact: {strategy.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="performance-tracking">
          <MobileAccordionTrigger icon={<Eye className="h-5 w-5 text-amber-400" />}>
            Marketing Performance Tracking
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  Essential metrics and KPIs to measure marketing effectiveness and ROI
                </p>
                
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                  {performanceMetrics.map((metricCategory, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-4">
                      <h4 className={`font-semibold text-elec-yellow flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {metricCategory.category === "Lead Generation" && <Megaphone className="h-4 w-4" />}
                        {metricCategory.category === "Sales Conversion" && <Target className="h-4 w-4" />}
                        {metricCategory.category === "Brand & Reputation" && <Heart className="h-4 w-4" />}
                        {metricCategory.category}
                      </h4>
                      <div className="space-y-2">
                        {metricCategory.kpis.map((kpi, kpiIndex) => (
                          <div key={kpiIndex} className="flex items-start gap-2 p-2 bg-elec-gray/30 rounded-lg">
                            <CheckCircle className="h-3 w-3 text-green-400 shrink-0 mt-0.5" />
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                              {kpi}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="what-this-means">
          <MobileAccordionTrigger icon={<Lightbulb className="h-5 w-5 text-blue-400" />}>
            What this means
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  Understanding the impact and significance of effective marketing for your electrical business
                </p>
                
                <div className="space-y-4">
                  <div className="bg-elec-gray/30 rounded-lg p-4 space-y-3">
                    <h4 className={`font-semibold text-blue-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Business Growth Impact</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          Effective marketing can increase your customer base by 200-400% within the first year
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <PoundSterling className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          Proper digital presence reduces customer acquisition costs by 30-50%
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          Strong brand reputation leads to premium pricing opportunities (15-25% higher rates)
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-elec-gray/30 rounded-lg p-4 space-y-3">
                    <h4 className={`font-semibold text-blue-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Market Position</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          Most electrical contractors still rely heavily on word-of-mouth, creating opportunities for digital-savvy businesses
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          78% of customers research electricians online before making contact, making digital presence crucial
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          Referral systems can generate 40-60% of new business for established electrical contractors
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-elec-gray/30 rounded-lg p-4 space-y-3">
                    <h4 className={`font-semibold text-blue-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Long-term Benefits</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          Consistent marketing creates business stability and reduces dependence on irregular work patterns
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Building className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          Strong brand presence enables business scaling and potential expansion into new service areas
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                          Established marketing systems increase business value for potential sale or succession planning
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="who-can-do-this">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-green-400" />}>
            Who can do this
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  Understanding who can effectively implement marketing strategies for electrical businesses
                </p>
                
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-3">
                    <h4 className={`font-semibold text-green-300 flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      <CheckCircle className="h-4 w-4" />
                      Solo Electricians & Small Teams
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>
                          Can start with digital marketing basics (Google My Business, social media presence)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>
                          Focus on local networking and referral systems as primary growth strategies
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>
                          Can implement customer follow-up systems and review management independently
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-3">
                    <h4 className={`font-semibold text-blue-300 flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      <Building className="h-4 w-4" />
                      Established Electrical Contractors
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>
                          Can invest in comprehensive digital marketing campaigns and professional websites
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>
                          Have resources to hire marketing specialists or agencies for advanced strategies
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>
                          Can implement multi-channel marketing approaches and track detailed performance metrics
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 space-y-3">
                    <h4 className={`font-semibold text-purple-300 flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      <Network className="h-4 w-4" />
                      Marketing Partners & Support
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>
                          Digital marketing agencies specialising in trade businesses
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>
                          Local business consultants with electrical industry experience
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 shrink-0" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>
                          Trade association marketing resources and networking opportunities
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 space-y-3">
                    <h4 className={`font-semibold text-orange-300 flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      <Brain className="h-4 w-4" />
                      Required Skills & Resources
                    </h4>
                    <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                      <div className="space-y-2">
                        <h5 className={`font-medium text-orange-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>Essential Skills:</h5>
                        <ul className="space-y-1">
                          <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 flex items-center gap-1`}>
                            <CheckCircle className="h-3 w-3 text-orange-400" />
                            Basic computer and internet skills
                          </li>
                          <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 flex items-center gap-1`}>
                            <CheckCircle className="h-3 w-3 text-orange-400" />
                            Customer communication abilities
                          </li>
                          <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 flex items-center gap-1`}>
                            <CheckCircle className="h-3 w-3 text-orange-400" />
                            Basic photography for project documentation
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className={`font-medium text-orange-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>Time Investment:</h5>
                        <ul className="space-y-1">
                          <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 flex items-center gap-1`}>
                            <Clock className="h-3 w-3 text-orange-400" />
                            2-5 hours/week for basic marketing
                          </li>
                          <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 flex items-center gap-1`}>
                            <Clock className="h-3 w-3 text-orange-400" />
                            10-15 hours/week for comprehensive campaigns
                          </li>
                          <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 flex items-center gap-1`}>
                            <Clock className="h-3 w-3 text-orange-400" />
                            Consistent daily social media engagement
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 space-y-3">
                    <h4 className={`font-semibold text-cyan-300 flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      <PoundSterling className="h-4 w-4" />
                      Hiring Marketing Support
                    </h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 mb-3`}>
                      Where to find and what to expect when hiring marketing professionals
                    </p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h5 className={`font-medium text-cyan-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>Freelance Social Media Managers</h5>
                        <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium`}>Where to find:</p>
                            <ul className="space-y-1 mt-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Upwork, Fiverr, PeoplePerHour</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Local Facebook business groups</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• LinkedIn freelancer networks</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Local marketing students</li>
                            </ul>
                          </div>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium`}>Expected costs:</p>
                            <ul className="space-y-1 mt-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £300-800/month basic management</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £15-40/hour project rates</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £50-150 per content package</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £200-500 website setup</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className={`font-medium text-cyan-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>Digital Marketing Agencies</h5>
                        <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium`}>Where to find:</p>
                            <ul className="space-y-1 mt-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Google "trade marketing agency UK"</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Chamber of Commerce directories</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Electrical trade publications</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Local business networking events</li>
                            </ul>
                          </div>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium`}>Expected costs:</p>
                            <ul className="space-y-1 mt-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £800-2,500/month retainer</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £2,000-8,000 website build</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• 15-20% of ad spend management</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £500-1,500 strategy consultation</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className={`font-medium text-cyan-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>Part-time Marketing Assistant</h5>
                        <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium`}>Where to find:</p>
                            <ul className="space-y-1 mt-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Indeed, Reed, Totaljobs</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Local college marketing courses</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Apprenticeship programmes</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Local job centres</li>
                            </ul>
                          </div>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium`}>Expected costs:</p>
                            <ul className="space-y-1 mt-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £10-18/hour depending on experience</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• 8-16 hours/week commitment</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• £400-1,200/month salary cost</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Training investment required</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className={`font-medium text-cyan-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>What to Look For When Hiring</h5>
                        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium mb-1`}>Essential Skills:</p>
                            <ul className="space-y-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Trade industry knowledge</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Local market understanding</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Portfolio of trade clients</li>
                            </ul>
                          </div>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium mb-1`}>Platform Experience:</p>
                            <ul className="space-y-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Google My Business</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Facebook & Instagram</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Google Ads experience</li>
                            </ul>
                          </div>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100 font-medium mb-1`}>Red Flags:</p>
                            <ul className="space-y-1">
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Guaranteed rankings</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• No clear reporting</li>
                              <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-100`}>• Upfront large payments</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};