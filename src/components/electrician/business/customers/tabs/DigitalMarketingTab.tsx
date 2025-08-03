import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Monitor, Globe, Search, Facebook, Instagram, Smartphone, TrendingUp, Users, Target, Star, FileText, BarChart3, MessageSquare, Calendar } from "lucide-react";

const DigitalMarketingTab = () => {
  const isMobile = useIsMobile();

  const digitalMetrics = [
    {
      metric: "Google My Business Impact",
      data: "3x more enquiries",
      icon: <Search className="h-5 w-5 text-purple-400" />,
      detail: "Optimised GMB profiles generate significantly more leads"
    },
    {
      metric: "Local Search Results",
      data: "Top 3 positioning achievable",
      icon: <Target className="h-5 w-5 text-blue-400" />,
      detail: "75% of users never scroll past first 3 results"
    },
    {
      metric: "Social Media ROI",
      data: "£4.20 return per £1 spent",
      icon: <Facebook className="h-5 w-5 text-green-400" />,
      detail: "Facebook/Instagram ads for UK electrical contractors"
    },
    {
      metric: "Website Conversion Rate",
      data: "5-12% visitor to enquiry",
      icon: <Monitor className="h-5 w-5 text-orange-400" />,
      detail: "Professional electrical contractor websites"
    },
    {
      metric: "Online Review Impact",
      data: "86% more likely to be chosen",
      icon: <Star className="h-5 w-5 text-yellow-400" />,
      detail: "Businesses with 4+ star ratings vs unreviewed"
    },
    {
      metric: "Digital Lead Quality",
      data: "70% higher conversion",
      icon: <TrendingUp className="h-5 w-5 text-red-400" />,
      detail: "Digital leads vs traditional advertising"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-purple-400/50 bg-purple-400/10">
        <Monitor className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-400">
          Digital marketing can reduce customer acquisition costs by 50-70% compared to traditional advertising methods.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3 xl:grid-cols-6'}`}>
        {digitalMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="website">
          <MobileAccordionTrigger icon={<Globe className="h-5 w-5 text-purple-400" />}>
            Website Development & SEO
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Your website is your digital shopfront - it needs to look professional, load quickly, and convert visitors into customers.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                    <p className="text-sm">Build a professional, SEO-optimised website that ranks locally and converts visitors to customers.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1-2: Website design & development</li>
                      <li>• Week 3: Content creation & SEO optimisation</li>
                      <li>• Week 4: Testing & launch</li>
                      <li>• Ongoing: Content updates & SEO maintenance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Impact</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 24/7 lead generation capability</li>
                      <li>• Increased credibility & trust</li>
                      <li>• Better Google ranking visibility</li>
                      <li>• Reduced cost per lead over time</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Essential Website Features</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Mobile-first responsive design</li>
                      <li>• Fast loading speed (under 3 seconds)</li>
                      <li>• Clear service pages with pricing</li>
                      <li>• Contact forms & click-to-call buttons</li>
                      <li>• Customer testimonials & case studies</li>
                      <li>• Professional photography portfolio</li>
                      <li>• Certificate & qualification displays</li>
                      <li>• Service area maps</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Local SEO Essentials</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Location-specific landing pages</li>
                      <li>• Google My Business integration</li>
                      <li>• Local schema markup</li>
                      <li>• NAP consistency across web</li>
                      <li>• Local keyword optimisation</li>
                      <li>• Customer review integration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Key Performance Indicators</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Page load speed: Under 3 seconds</li>
                      <li>• Mobile usability score: 95%+</li>
                      <li>• Local search ranking: Top 3</li>
                      <li>• Conversion rate: 5-12%</li>
                      <li>• Organic traffic growth: 20% monthly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="social-media">
          <MobileAccordionTrigger icon={<Facebook className="h-5 w-5 text-blue-400" />}>
            Social Media Marketing
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Facebook and Instagram advertising offers precise local targeting for electrical contractors with excellent ROI potential.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Platform Strategy</h4>
                    <p className="text-sm">Focus on Facebook for lead generation and Instagram for building brand awareness through visual content.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Campaign Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Profile setup & content creation</li>
                      <li>• Week 2: Audience research & targeting</li>
                      <li>• Week 3: Launch first ad campaigns</li>
                      <li>• Week 4+: Optimise based on performance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Precise geographic targeting</li>
                      <li>• Lower cost per lead than Google</li>
                      <li>• Build community trust & recognition</li>
                      <li>• Showcase before/after work</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Content Strategy</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Before/after project photos</li>
                      <li>• Safety tips & electrical advice</li>
                      <li>• Behind-the-scenes work content</li>
                      <li>• Customer testimonial videos</li>
                      <li>• Emergency electrical tips</li>
                      <li>• Team introduction posts</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Targeting Parameters</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Geographic: 10-20 mile radius</li>
                      <li>• Demographics: Homeowners 25-65</li>
                      <li>• Interests: Home improvement, DIY</li>
                      <li>• Behaviours: Recently moved, renovating</li>
                      <li>• Custom audiences: Website visitors</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Cost per lead: £15-30</li>
                      <li>• Click-through rate: 2%+</li>
                      <li>• Conversion rate: 8-15%</li>
                      <li>• Return on ad spend: 300%+</li>
                      <li>• Follower growth: 50+ monthly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="google-ads">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-green-400" />}>
            Google Ads & Local Services
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Google Local Services Ads appear at the top of search results with the Google Guarantee badge, providing premium visibility.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Campaign Strategy</h4>
                    <p className="text-sm">Combine Google Local Services with Search Ads for maximum coverage of local electrical searches.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Setup Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Google Local Services application</li>
                      <li>• Week 2: Background checks & verification</li>
                      <li>• Week 3: Search ads campaign setup</li>
                      <li>• Week 4: Launch & initial optimisation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Competitive Advantages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Google Guarantee badge builds trust</li>
                      <li>• Premium position above organic results</li>
                      <li>• Pay per qualified lead, not clicks</li>
                      <li>• Higher conversion rates than Search Ads</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Local Services Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Valid Part P certification</li>
                      <li>• Public liability insurance</li>
                      <li>• Business licence verification</li>
                      <li>• Background check completion</li>
                      <li>• Customer review minimum</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Search Ads Keywords</h4>
                    <ul className="text-sm space-y-1">
                      <li>• "Emergency electrician [location]"</li>
                      <li>• "Electrical testing [area]"</li>
                      <li>• "Rewiring costs [town]"</li>
                      <li>• "Qualified electrician near me"</li>
                      <li>• "EICR certificate [location]"</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Performance Targets</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Local Services: £25-50 per lead</li>
                      <li>• Search Ads: £20-40 per lead</li>
                      <li>• Quality Score: 7/10 minimum</li>
                      <li>• Lead-to-customer rate: 25%+</li>
                      <li>• Monthly budget: £800-1,500</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="directories">
          <MobileAccordionTrigger icon={<Star className="h-5 w-5 text-yellow-400" />}>
            Online Directories & Reviews
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Online directories and review platforms are crucial for local SEO and building customer trust in the UK market.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Directory Strategy</h4>
                    <p className="text-sm">Focus on quality UK directories that electricians actually use and customers trust for finding tradespeople.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Schedule</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Google My Business optimisation</li>
                      <li>• Week 2: Checkatrade & TrustATrader setup</li>
                      <li>• Week 3: MyBuilder & Rated People profiles</li>
                      <li>• Week 4: Review generation campaign launch</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Impact</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Improved local search rankings</li>
                      <li>• Increased customer trust & credibility</li>
                      <li>• Multiple lead generation sources</li>
                      <li>• Higher conversion rates from reviews</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Priority UK Directories</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Google My Business (Free - Essential)</li>
                      <li>• Checkatrade (£300-600/year)</li>
                      <li>• TrustATrader (£200-400/year)</li>
                      <li>• MyBuilder (Pay per lead)</li>
                      <li>• Rated People (Pay per lead)</li>
                      <li>• Which? Trusted Traders</li>
                      <li>• Bark.com (Pay per lead)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Review Generation Strategy</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Post-job follow-up emails</li>
                      <li>• SMS review requests</li>
                      <li>• QR codes on invoices</li>
                      <li>• Review incentive programmes</li>
                      <li>• Professional review management</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Google rating: 4.5+ stars</li>
                      <li>• Review volume: 20+ monthly</li>
                      <li>• Response rate: 90%+</li>
                      <li>• Directory leads: 10-20 monthly</li>
                      <li>• Cost per lead: £30-60</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="content">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-orange-400" />}>
            Content Marketing Strategy
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Educational content positions you as the local electrical expert while improving SEO and building customer trust.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Content Strategy</h4>
                    <p className="text-sm">Create helpful, educational content that answers common electrical questions while showcasing expertise.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Content Calendar</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Blog post + social content</li>
                      <li>• Week 2: Video tutorial + case study</li>
                      <li>• Week 3: FAQ content + testimonials</li>
                      <li>• Week 4: Seasonal safety tips</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">SEO Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Improved Google rankings</li>
                      <li>• Increased website traffic</li>
                      <li>• Better domain authority</li>
                      <li>• Long-term lead generation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Content Ideas for Electricians</h4>
                    <ul className="text-sm space-y-1">
                      <li>• "How to spot dangerous wiring"</li>
                      <li>• "EICR testing: What to expect"</li>
                      <li>• "EV charger installation guide"</li>
                      <li>• "Smart home electrical upgrades"</li>
                      <li>• "Preparing for electrical inspection"</li>
                      <li>• "Emergency electrical safety tips"</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Content Formats</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Blog posts (800-1,200 words)</li>
                      <li>• Video tutorials (2-5 minutes)</li>
                      <li>• Infographics & visual guides</li>
                      <li>• Customer case studies</li>
                      <li>• Before/after photo stories</li>
                      <li>• Live Q&A sessions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Content KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Organic traffic: +30% monthly</li>
                      <li>• Engagement rate: 5%+</li>
                      <li>• Content shares: 20+ per post</li>
                      <li>• Lead generation: 5-10 monthly</li>
                      <li>• Time on page: 2+ minutes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="analytics">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-red-400" />}>
            Digital Analytics & Tracking
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Proper tracking and analytics are essential for measuring ROI and optimising your digital marketing investments.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Analytics Strategy</h4>
                    <p className="text-sm">Track every customer touchpoint to understand what marketing channels deliver the best ROI.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Setup Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Google Analytics 4 & Tag Manager</li>
                      <li>• Week 2: Call tracking & form analytics</li>
                      <li>• Week 3: Social media & ad tracking</li>
                      <li>• Week 4: Dashboard creation & training</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Identify best performing channels</li>
                      <li>• Optimise marketing budget allocation</li>
                      <li>• Track customer journey patterns</li>
                      <li>• Improve conversion rates</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Essential Tracking Tools</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Google Analytics 4 (Free)</li>
                      <li>• Google Tag Manager (Free)</li>
                      <li>• Call tracking software (£30-80/month)</li>
                      <li>• Facebook Pixel & Conversions API</li>
                      <li>• Google Ads conversion tracking</li>
                      <li>• Heat mapping tools (Optional)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Key Metrics to Track</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Cost per lead by channel</li>
                      <li>• Lead-to-customer conversion rate</li>
                      <li>• Customer lifetime value</li>
                      <li>• Website conversion rate</li>
                      <li>• Phone call conversions</li>
                      <li>• Return on ad spend (ROAS)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Monthly Reporting KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Total leads generated: Target 50+</li>
                      <li>• Cost per lead: £25-45 average</li>
                      <li>• Conversion rate: 25%+ target</li>
                      <li>• Revenue attribution: 80%+ tracked</li>
                      <li>• ROI: 300%+ return target</li>
                    </ul>
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

export default DigitalMarketingTab;