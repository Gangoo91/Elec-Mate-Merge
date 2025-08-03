import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Megaphone, Car, Users, Handshake, MapPin, Newspaper, Radio, FileText, Calendar, Award, Phone } from "lucide-react";

const TraditionalMarketingTab = () => {
  const isMobile = useIsMobile();

  const traditionalMetrics = [
    {
      metric: "Referral Conversion Rate",
      data: "70-90% close rate",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "Word-of-mouth referrals have highest conversion"
    },
    {
      metric: "Vehicle Advertising ROI",
      data: "1,500+ daily impressions",
      icon: <Car className="h-5 w-5 text-orange-400" />,
      detail: "Professional vehicle livery on average UK roads"
    },
    {
      metric: "Local Networking Value",
      data: "£800-3,000 per connection",
      icon: <Handshake className="h-5 w-5 text-blue-400" />,
      detail: "Quality business relationships and partnerships"
    },
    {
      metric: "Community Sponsorship ROI",
      data: "45% brand recognition boost",
      icon: <Award className="h-5 w-5 text-purple-400" />,
      detail: "Local sports teams and community events"
    },
    {
      metric: "Local Press Coverage Value",
      data: "£2,000-5,000 equivalent",
      icon: <Newspaper className="h-5 w-5 text-yellow-400" />,
      detail: "Free publicity through local newspaper features"
    },
    {
      metric: "Direct Mail Response Rate",
      data: "2-5% response rate",
      icon: <FileText className="h-5 w-5 text-red-400" />,
      detail: "Targeted leaflet drops in service areas"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-orange-400/50 bg-orange-400/10">
        <Megaphone className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-400">
          Traditional marketing builds local trust and credibility - 85% of customers still prefer local recommendations over online reviews.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3 xl:grid-cols-6'}`}>
        {traditionalMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="vehicle">
          <MobileAccordionTrigger icon={<Car className="h-5 w-5 text-orange-400" />}>
            Vehicle Branding & Mobile Advertising
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Professional vehicle livery turns every journey into a marketing opportunity, providing continuous exposure in your service area.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Branding Strategy</h4>
                    <p className="text-sm">Create consistent, professional vehicle livery that builds brand recognition and trust throughout your service area.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Design consultation & approval</li>
                      <li>• Week 2: Vehicle measurement & preparation</li>
                      <li>• Week 3: Vinyl application & quality check</li>
                      <li>• Week 4: Staff training on brand representation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Impact</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 24/7 passive marketing exposure</li>
                      <li>• Enhanced professional credibility</li>
                      <li>• Mobile advertisement coverage</li>
                      <li>• Brand recognition in local area</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Essential Design Elements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Company name in bold, readable font</li>
                      <li>• Large phone number (minimum 4-inch height)</li>
                      <li>• Website URL prominently displayed</li>
                      <li>• Service area coverage map</li>
                      <li>• Professional certifications & logos</li>
                      <li>• Emergency availability messaging</li>
                      <li>• High-contrast colour scheme</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Quality Standards</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 3M commercial-grade vinyl</li>
                      <li>• Weather-resistant materials</li>
                      <li>• Professional installation standards</li>
                      <li>• Reflective elements for safety</li>
                      <li>• Regular cleaning & maintenance</li>
                      <li>• Consistent across entire fleet</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Performance Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Daily impressions: 1,000-2,000</li>
                      <li>• Brand recall: 40-60% increase</li>
                      <li>• Cost per impression: £0.001-0.003</li>
                      <li>• Lead attribution: 15-25%</li>
                      <li>• Investment payback: 6-12 months</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="referral">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-green-400" />}>
            Referral Programs & Word-of-Mouth
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Word-of-mouth referrals remain the highest converting lead source, with 90% of satisfied customers willing to refer when asked.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Referral Strategy</h4>
                    <p className="text-sm">Build systematic referral generation processes that turn satisfied customers into active brand ambassadors.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Program Development</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Design referral rewards structure</li>
                      <li>• Week 2: Create referral cards & materials</li>
                      <li>• Week 3: Train team on referral process</li>
                      <li>• Week 4: Launch with existing customers</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Highest conversion rate (70-90%)</li>
                      <li>• Lower acquisition costs</li>
                      <li>• Pre-qualified warm leads</li>
                      <li>• Enhanced customer loyalty</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Referral Program Components</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Professional referral cards</li>
                      <li>• Customer incentive structure</li>
                      <li>• Referrer reward system</li>
                      <li>• Thank you gift packages</li>
                      <li>• Follow-up communication system</li>
                      <li>• Tracking & attribution system</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Reward Structure Ideas</h4>
                    <ul className="text-sm space-y-1">
                      <li>• £25-50 credit for successful referrals</li>
                      <li>• Free electrical safety checks</li>
                      <li>• Priority scheduling for referrers</li>
                      <li>• Annual maintenance discounts</li>
                      <li>• Gift vouchers for local businesses</li>
                      <li>• Charity donations in customer name</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Referral rate: 15-25% of customers</li>
                      <li>• Conversion rate: 70-90%</li>
                      <li>• Cost per acquisition: £15-30</li>
                      <li>• Customer lifetime value: 3x higher</li>
                      <li>• Program ROI: 400-600%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="networking">
          <MobileAccordionTrigger icon={<Handshake className="h-5 w-5 text-blue-400" />}>
            Local Networking & Business Partnerships
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Strategic networking builds valuable business relationships that generate consistent, high-quality referrals from other professionals.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Networking Strategy</h4>
                    <p className="text-sm">Build mutually beneficial relationships with complementary trades and local businesses to create referral networks.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Relationship Building Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Month 1: Identify key networking targets</li>
                      <li>• Month 2: Attend 4-6 local business events</li>
                      <li>• Month 3: Establish formal partnerships</li>
                      <li>• Month 4+: Maintain regular contact</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Partnership Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Consistent referral flow</li>
                      <li>• Pre-qualified leads</li>
                      <li>• Shared marketing costs</li>
                      <li>• Enhanced local reputation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Partnership Targets</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Plumbers & heating engineers</li>
                      <li>• Building contractors & developers</li>
                      <li>• Kitchen & bathroom fitters</li>
                      <li>• Estate agents & property managers</li>
                      <li>• Architects & building surveyors</li>
                      <li>• Insurance assessors & loss adjusters</li>
                      <li>• Solar panel installers</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Networking Opportunities</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Local Chamber of Commerce</li>
                      <li>• BNI (Business Network International)</li>
                      <li>• Trade association events</li>
                      <li>• Local business breakfast meetings</li>
                      <li>• Property & construction exhibitions</li>
                      <li>• Community charity events</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Networking ROI Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Referrals per contact: 2-5 annually</li>
                      <li>• Average project value: £800-3,000</li>
                      <li>• Conversion rate: 60-80%</li>
                      <li>• Networking investment: £500-1,500/year</li>
                      <li>• Return on investment: 300-800%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="community">
          <MobileAccordionTrigger icon={<Award className="h-5 w-5 text-purple-400" />}>
            Community Sponsorship & Events
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Community involvement builds local brand recognition and positions your business as a trusted community partner.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Community Strategy</h4>
                    <p className="text-sm">Strategically sponsor local events and organisations that align with your target customer demographic.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Engagement Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Quarter 1: Research community opportunities</li>
                      <li>• Quarter 2: Select 2-3 sponsorship targets</li>
                      <li>• Quarter 3: Begin active participation</li>
                      <li>• Quarter 4: Evaluate ROI & plan expansion</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Brand Building Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Enhanced local reputation</li>
                      <li>• Positive brand association</li>
                      <li>• Community trust building</li>
                      <li>• Long-term customer loyalty</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Sponsorship Opportunities</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Local football & cricket teams</li>
                      <li>• School fairs & fundraising events</li>
                      <li>• Village fetes & community festivals</li>
                      <li>• Charity runs & sponsored events</li>
                      <li>• Local youth clubs & scouts</li>
                      <li>• Parish newsletter advertising</li>
                      <li>• Community centre events</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Sponsorship Packages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Kit sponsorship: £200-800/season</li>
                      <li>• Event programme ads: £50-200</li>
                      <li>• Pitch-side advertising: £300-1,000</li>
                      <li>• Trophy sponsorship: £100-500</li>
                      <li>• Equipment donations: Various</li>
                      <li>• Safety demonstration days: Free service</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Community Impact Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Brand recognition: 35-50% increase</li>
                      <li>• Community reach: 500-2,000 people</li>
                      <li>• Lead generation: 5-15 per event</li>
                      <li>• Annual investment: £1,000-3,000</li>
                      <li>• Long-term ROI: 200-400%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="print">
          <MobileAccordionTrigger icon={<Newspaper className="h-5 w-5 text-yellow-400" />}>
            Print & Local Media Advertising
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Local print media remains effective for reaching older demographics and establishing credibility in traditional communities.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Print Media Strategy</h4>
                    <p className="text-sm">Target local publications with high readership in your service area, focusing on regular presence over one-off ads.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Campaign Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Research local publications</li>
                      <li>• Week 2: Design ads & negotiate rates</li>
                      <li>• Week 3: Launch first advertisements</li>
                      <li>• Week 4+: Monitor response & optimise</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Media Advantages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• High credibility & trust factor</li>
                      <li>• Targeted local demographics</li>
                      <li>• Longer reading attention spans</li>
                      <li>• Premium positioning opportunities</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Local Publication Types</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Regional newspapers (weekly/daily)</li>
                      <li>• Parish magazines & newsletters</li>
                      <li>• Community magazines</li>
                      <li>• Property & homes publications</li>
                      <li>• Local business directories</li>
                      <li>• Yellow Pages & Thomson Local</li>
                      <li>• WI magazines & club newsletters</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Advertising Costs (Monthly)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Local newspaper quarter page: £150-400</li>
                      <li>• Parish magazine ads: £25-100</li>
                      <li>• Community magazine features: £200-600</li>
                      <li>• Business directory listings: £30-150</li>
                      <li>• Radio sponsorship: £200-800</li>
                      <li>• Editorial features: £300-1,000</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Print Media KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Response rate: 1-3% of circulation</li>
                      <li>• Cost per lead: £25-60</li>
                      <li>• Brand awareness lift: 20-35%</li>
                      <li>• Lead quality: High (local focus)</li>
                      <li>• Campaign duration: 3-6 months optimal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="direct">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-red-400" />}>
            Direct Mail & Door-to-Door Marketing
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Targeted direct mail and leaflet distribution can effectively reach specific postcode areas with tailored messaging for electrical services.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Direct Mail Strategy</h4>
                    <p className="text-sm">Target high-value postcodes with professional leaflets focusing on safety, compliance, and emergency services.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Campaign Schedule</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Design leaflets & select areas</li>
                      <li>• Week 2: Print materials & book distribution</li>
                      <li>• Week 3: Execute leaflet drop</li>
                      <li>• Week 4: Track responses & follow up</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Direct Mail Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Precise geographic targeting</li>
                      <li>• Tangible brand presence</li>
                      <li>• High retention rates</li>
                      <li>• Measurable response tracking</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Effective Messaging Themes</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Emergency electrical services</li>
                      <li>• EICR testing & certification</li>
                      <li>• EV charger installations</li>
                      <li>• Consumer unit upgrades</li>
                      <li>• Smart home installations</li>
                      <li>• Free safety checks offers</li>
                      <li>• New customer discounts</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Distribution Costs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Leaflet design: £200-500</li>
                      <li>• Printing (10,000): £300-600</li>
                      <li>• Distribution: £250-400 per 10,000</li>
                      <li>• Total per campaign: £750-1,500</li>
                      <li>• Cost per household: £0.08-0.15</li>
                      <li>• Follow-up postcards: £0.20-0.35 each</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Direct Mail Performance</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Response rate: 1-4% typical</li>
                      <li>• Cost per lead: £25-75</li>
                      <li>• Optimal frequency: Monthly drops</li>
                      <li>• Best performing areas: Owner-occupied</li>
                      <li>• Peak response times: 3-7 days post-drop</li>
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

export default TraditionalMarketingTab;