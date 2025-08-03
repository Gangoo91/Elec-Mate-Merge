import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Search, 
  Users, 
  MapPin, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Eye, 
  Building, 
  PoundSterling,
  Home,
  Briefcase,
  UserCheck,
  Calendar,
  CheckCircle,
  Heart,
  Route,
  Phone
} from "lucide-react";

const MarketResearchTab = () => {
  const isMobile = useIsMobile();

  const marketMetrics = [
    {
      metric: "Market Penetration Rate",
      data: "5-15% of local market addressable",
      icon: <Target className="h-5 w-5 text-blue-400" />,
      detail: "Realistic market share for local electrical contractors"
    },
    {
      metric: "Customer Acquisition Cost",
      data: "£25-75 per customer acquired",
      icon: <PoundSterling className="h-5 w-5 text-green-400" />,
      detail: "Average investment needed to gain new customers"
    },
    {
      metric: "Local Competition Density",
      data: "3-8 competitors per 10k population",
      icon: <BarChart3 className="h-5 w-5 text-orange-400" />,
      detail: "Typical electrical contractor density in UK markets"
    },
    {
      metric: "Market Growth Potential",
      data: "12-18% annual market expansion",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "Expected growth in electrical services demand"
    }
  ];

  const demographicAnalysis = [
    {
      category: "Age & Income Distribution",
      timeline: "Week 1",
      description: "Comprehensive analysis of target customer age groups and income brackets",
      components: [
        "Primary: 35-55 homeowners with £40k-80k household income",
        "Secondary: 25-35 first-time buyers and property investors", 
        "Tertiary: 55+ established homeowners planning renovations",
        "Premium segment: £80k+ earners investing in smart home technology"
      ],
      businessImpact: "Target messaging and pricing strategies to match customer financial capacity",
      kpis: ["Average job value by age group", "Customer lifetime value", "Repeat business rate"]
    },
    {
      category: "Property Types & Electrical Needs",
      timeline: "Week 1-2",
      description: "Understanding the electrical requirements of different property types in your area",
      components: [
        "Victorian/Edwardian houses: rewiring, consumer unit upgrades, period-appropriate solutions",
        "1960s-80s properties: partial rewiring, extension work, modern safety systems",
        "New builds: fault finding, additional circuits, smart home installations", 
        "Commercial properties: PAT testing, emergency lighting, compliance certificates"
      ],
      businessImpact: "Specialise in high-demand services and develop appropriate skill sets",
      kpis: ["Job frequency by property type", "Profit margin per category", "Skill development needs"]
    },
    {
      category: "Seasonal Demand Patterns",
      timeline: "Week 2-3",
      description: "Identifying peak periods and seasonal variations in electrical service demand",
      components: [
        "Winter peak: heating systems, lighting installations, fault finding",
        "Spring: garden electrical work, shed connections, outdoor lighting", 
        "Summer: air conditioning, extension work, holiday property maintenance",
        "Autumn: safety checks, winter preparation, commercial compliance renewals"
      ],
      businessImpact: "Plan capacity, staffing and cash flow around predictable demand cycles",
      kpis: ["Monthly revenue variance", "Capacity utilisation", "Cash flow predictability"]
    }
  ];

  const residentialProfiles = [
    {
      segment: "Young Professionals",
      demographics: {
        ageRange: "25-35 years",
        income: "£30k-50k household",
        propertyType: "Flats, starter homes",
        location: "Urban areas, commuter towns"
      },
      characteristics: [
        "Tech-savvy and research extensively before hiring",
        "Budget-conscious but willing to pay for quality",
        "Prefer online booking and digital communication",
        "Value energy efficiency and smart home features"
      ],
      electricalNeeds: [
        "Additional sockets for home offices",
        "USB charging points and smart switches", 
        "Wi-Fi extender installations",
        "Electric vehicle charging preparation"
      ],
      marketingApproach: [
        "Strong online presence and Google reviews",
        "Social media testimonials and before/after photos",
        "Competitive pricing with transparent quotes",
        "Quick response times and flexible scheduling"
      ],
      averageJobValue: "£150-400",
      businessImpact: "High volume, moderate value work with strong online reputation benefits"
    },
    {
      segment: "Family Homeowners",
      demographics: {
        ageRange: "35-50 years",
        income: "£50k-80k household",
        propertyType: "3-4 bed houses",
        location: "Suburbs, family areas"
      },
      characteristics: [
        "Safety-focused with children in the home",
        "Plan larger projects and seek comprehensive solutions",
        "Prefer established contractors with insurance coverage",
        "Value reliability and follow-up service"
      ],
      electricalNeeds: [
        "Consumer unit upgrades and RCD protection",
        "Extension wiring and kitchen renovations",
        "Garden lighting and shed supplies",
        "Electric car charging point installations"
      ],
      marketingApproach: [
        "Emphasise safety certifications and insurance",
        "Provide detailed quotes with safety explanations",
        "Offer family-friendly scheduling options",
        "Follow up with maintenance reminders"
      ],
      averageJobValue: "£400-1,200",
      businessImpact: "Premium pricing potential with high customer loyalty and referral rates"
    },
    {
      segment: "Established Homeowners",
      demographics: {
        ageRange: "50+ years",
        income: "£40k-100k+ household",
        propertyType: "Older properties, large homes",
        location: "Established neighbourhoods"
      },
      characteristics: [
        "Experience-driven with clear quality expectations",
        "Willing to invest in comprehensive solutions",
        "Prefer phone contact and personal recommendations",
        "Value craftmanship and attention to detail"
      ],
      electricalNeeds: [
        "Full or partial rewiring of older properties",
        "Accessibility modifications and safety upgrades",
        "High-end lighting and automation systems",
        "Generator installations and backup systems"
      ],
      marketingApproach: [
        "Personal referrals and word-of-mouth marketing",
        "Professional appearance and detailed consultations",
        "Emphasis on experience and traditional craftsmanship",
        "Premium service options and extended warranties"
      ],
      averageJobValue: "£800-3,000+",
      businessImpact: "Highest value customers with potential for extensive projects and ongoing relationships"
    }
  ];

  const commercialAnalysis = [
    {
      sector: "Retail & Hospitality",
      timeline: "Ongoing demand",
      description: "Shops, restaurants, pubs and customer-facing businesses requiring reliable electrical systems",
      requirements: [
        "Emergency lighting testing and maintenance",
        "PAT testing for portable appliances",
        "EICR certificates for insurance compliance",
        "Lighting upgrades for energy efficiency"
      ],
      decisionMakers: [
        "Business owners (small independents)",
        "Facilities managers (chains and franchises)",
        "Property managers (leased premises)",
        "Health & safety officers (larger businesses)"
      ],
      businessImpact: "Regular contract opportunities with predictable revenue streams",
      kpis: ["Contract retention rate", "Average contract value", "Compliance renewal rate"]
    },
    {
      sector: "Office & Professional Services",
      timeline: "Peak: Monday-Friday",
      description: "Offices, clinics, professional services requiring minimal disruption electrical work",
      requirements: [
        "After-hours electrical work to avoid disruption",
        "Data cabling and network infrastructure support",
        "Lighting control systems and energy management",
        "Backup power systems and UPS installations"
      ],
      decisionMakers: [
        "Office managers and administrative staff",
        "IT managers (for data-related work)",
        "Building owners and property managers",
        "Facilities management companies"
      ],
      businessImpact: "Premium rates for out-of-hours work with professional client relationships",
      kpis: ["Premium rate achievement", "Client retention", "Referral generation"]
    },
    {
      sector: "Industrial & Manufacturing",
      timeline: "Planned maintenance windows",
      description: "Workshops, light manufacturing and industrial units requiring specialist electrical services",
      requirements: [
        "Three-phase installations and motor controls",
        "Machinery electrical connections and testing",
        "Fire alarm systems and emergency procedures",
        "Energy monitoring and power factor correction"
      ],
      decisionMakers: [
        "Production managers and technical staff",
        "Maintenance supervisors",
        "Health & safety managers",
        "Plant engineers and facilities teams"
      ],
      businessImpact: "Specialised services commanding higher rates with long-term relationships",
      kpis: ["Specialist skill premium", "Contract duration", "Technical expertise recognition"]
    }
  ];

  const segmentationStrategy = [
    {
      strategy: "Geographic Segmentation",
      timeline: "Week 1-2",
      description: "Divide your service area into manageable zones based on travel time and market density",
      components: [
        "Primary zone: 15-minute travel radius for premium rates",
        "Secondary zone: 30-minute radius for standard rates",
        "Strategic expansion: High-value areas within 45 minutes",
        "Specialist callouts: Extended radius for unique services"
      ],
      businessImpact: "Optimise travel time, pricing strategy and service delivery efficiency",
      kpis: ["Travel cost percentage", "Jobs per mile radius", "Zone profitability"]
    },
    {
      strategy: "Service-Based Segmentation",
      timeline: "Week 2-3",
      description: "Categorise customers by the type and complexity of electrical services they require",
      components: [
        "Emergency callouts: immediate response, premium pricing",
        "Planned installations: scheduled work, competitive pricing",
        "Maintenance contracts: regular services, guaranteed revenue",
        "Specialist projects: unique skills, consultative approach"
      ],
      businessImpact: "Develop specific expertise areas and pricing models for different service types",
      kpis: ["Service mix ratio", "Profit margin by type", "Capacity utilisation"]
    },
    {
      strategy: "Customer Value Segmentation",
      timeline: "Week 3-4",
      description: "Classify customers based on their lifetime value and relationship potential",
      components: [
        "High-value clients: comprehensive service, account management",
        "Regular customers: loyalty programmes, priority scheduling",
        "Occasional users: efficient service, upselling opportunities",
        "One-off projects: competitive pricing, referral incentives"
      ],
      businessImpact: "Allocate resources effectively and develop appropriate customer relationship strategies",
      kpis: ["Customer lifetime value", "Retention rate by segment", "Upselling success"]
    }
  ];

  const customerJourney = [
    {
      stage: "Problem Recognition",
      timeline: "Initial awareness",
      description: "Customer identifies an electrical need or problem requiring professional attention",
      touchpoints: [
        "Electrical fault or safety concern arises",
        "Planning home renovation or extension work",
        "Compliance certificate required for property sale",
        "Recommendation from friend or online research"
      ],
      customerThoughts: [
        "Do I need a qualified electrician for this?",
        "Is this electrical work safe to delay?",
        "What qualifications should I look for?",
        "How much might this cost?"
      ],
      opportunities: [
        "Educational content about electrical safety",
        "Quick response emergency contact information",
        "Clear qualification and certification display",
        "Transparent pricing guides and estimates"
      ],
      businessImpact: "Early engagement increases likelihood of being chosen over competitors"
    },
    {
      stage: "Information Search",
      timeline: "Research phase",
      description: "Customer actively researches local electricians and evaluates service options",
      touchpoints: [
        "Google search for 'electrician near me'",
        "Checkatrade, Rated People profile views",
        "Friend and neighbour recommendations",
        "Social media reviews and testimonials"
      ],
      customerThoughts: [
        "Which electricians serve my area?",
        "What do previous customers say about quality?",
        "Who offers the best value for money?",
        "Can they handle my specific electrical problem?"
      ],
      opportunities: [
        "Strong SEO and Google My Business presence",
        "Compelling customer testimonials and reviews",
        "Portfolio of similar work and case studies",
        "Professional website with clear service information"
      ],
      businessImpact: "Strong online presence and reviews significantly influence customer choice"
    },
    {
      stage: "Quote & Evaluation",
      timeline: "Decision making",
      description: "Customer contacts shortlisted electricians for quotes and evaluates proposals",
      touchpoints: [
        "Initial phone call or online enquiry",
        "Site visit for detailed assessment",
        "Written quote with scope and pricing",
        "Follow-up communication and clarifications"
      ],
      customerThoughts: [
        "Does this electrician understand my needs?",
        "Is the quote fair and comprehensive?",
        "Do they seem professional and reliable?",
        "When can they start the work?"
      ],
      opportunities: [
        "Prompt response and professional consultation",
        "Detailed, clear quotes with breakdown",
        "Demonstration of expertise and safety focus",
        "Flexible scheduling and competitive timing"
      ],
      businessImpact: "Professional quote process and customer service directly impacts conversion rates"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-400/50 bg-blue-400/10">
        <Search className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-400">
          Thorough market research can increase customer acquisition efficiency by 200-300% and reduce marketing spend by up to 40%.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {marketMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="demographic-analysis">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-blue-400" />}>
            Customer Demographics Analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {demographicAnalysis.map((analysis, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{analysis.category}</h4>
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {analysis.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{analysis.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Analysis Components</h5>
                    <ul className="space-y-1">
                      {analysis.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{analysis.businessImpact}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Performance Indicators</h5>
                    <div className="flex flex-wrap gap-1">
                      {analysis.kpis.map((kpi, kpiIndex) => (
                        <Badge key={kpiIndex} variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="residential-profiles">
          <MobileAccordionTrigger icon={<Home className="h-5 w-5 text-green-400" />}>
            Residential Customer Profiles
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {residentialProfiles.map((profile, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{profile.segment}</h4>
                    <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {profile.averageJobValue}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <h5 className={`font-medium text-green-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Demographics</h5>
                      <div className="space-y-1 text-xs">
                        <div className="text-green-200">Age: {profile.demographics.ageRange}</div>
                        <div className="text-green-200">Income: {profile.demographics.income}</div>
                        <div className="text-green-200">Property: {profile.demographics.propertyType}</div>
                        <div className="text-green-200">Location: {profile.demographics.location}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className={`font-medium text-blue-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Characteristics</h5>
                      <ul className="space-y-1">
                        {profile.characteristics.map((char, charIndex) => (
                          <li key={charIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-start gap-1`}>
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <h5 className={`font-medium text-purple-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Electrical Needs</h5>
                      <ul className="space-y-1">
                        {profile.electricalNeeds.map((need, needIndex) => (
                          <li key={needIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-start gap-1`}>
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                            {need}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className={`font-medium text-orange-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Marketing Approach</h5>
                      <ul className="space-y-1">
                        {profile.marketingApproach.map((approach, approachIndex) => (
                          <li key={approachIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-start gap-1`}>
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                            {approach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                    <h5 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200`}>{profile.businessImpact}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="commercial-analysis">
          <MobileAccordionTrigger icon={<Briefcase className="h-5 w-5 text-orange-400" />}>
            Commercial Client Analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {commercialAnalysis.map((analysis, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{analysis.sector}</h4>
                      <Badge variant="outline" className={`text-orange-300 border-orange-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {analysis.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{analysis.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Requirements</h5>
                      <ul className="space-y-1">
                        {analysis.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-center gap-1`}>
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Decision Makers</h5>
                      <ul className="space-y-1">
                        {analysis.decisionMakers.map((maker, makerIndex) => (
                          <li key={makerIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {maker}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{analysis.businessImpact}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Performance Indicators</h5>
                    <div className="flex flex-wrap gap-1">
                      {analysis.kpis.map((kpi, kpiIndex) => (
                        <Badge key={kpiIndex} variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="segmentation-strategy">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-purple-400" />}>
            Market Segmentation Strategy
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {segmentationStrategy.map((strategy, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.strategy}</h4>
                      <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {strategy.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Strategy Components</h5>
                    <ul className="space-y-1">
                      {strategy.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                    <h5 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{strategy.businessImpact}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Performance Indicators</h5>
                    <div className="flex flex-wrap gap-1">
                      {strategy.kpis.map((kpi, kpiIndex) => (
                        <Badge key={kpiIndex} variant="outline" className={`text-amber-300 border-amber-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="customer-journey">
          <MobileAccordionTrigger icon={<Route className="h-5 w-5 text-pink-400" />}>
            Customer Journey Mapping
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {customerJourney.map((stage, index) => (
                <div key={index} className="border border-pink-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{stage.stage}</h4>
                      <Badge variant="outline" className={`text-pink-300 border-pink-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {stage.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{stage.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className={`font-medium text-pink-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Customer Touchpoints</h5>
                      <ul className="space-y-1">
                        {stage.touchpoints.map((touchpoint, touchIndex) => (
                          <li key={touchIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-pink-200 flex items-start gap-1`}>
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                            {touchpoint}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Customer Thoughts</h5>
                      <ul className="space-y-1">
                        {stage.customerThoughts.map((thought, thoughtIndex) => (
                          <li key={thoughtIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-start gap-1`}>
                            <Heart className="h-3 w-3 text-red-400 flex-shrink-0 mt-0.5" />
                            {thought}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Opportunities</h5>
                    <ul className="space-y-1">
                      {stage.opportunities.map((opportunity, oppIndex) => (
                        <li key={oppIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-start gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                    <h5 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200`}>{stage.businessImpact}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default MarketResearchTab;