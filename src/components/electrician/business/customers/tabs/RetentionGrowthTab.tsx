import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart, Repeat, TrendingUp, Calendar, Gift, Users, BarChart3, PoundSterling, Phone, Mail, Star, Target } from "lucide-react";

const RetentionGrowthTab = () => {
  const isMobile = useIsMobile();

  const retentionMetrics = [
    {
      metric: "Customer Retention Rate",
      data: "80-90% annual retention target",
      icon: <Heart className="h-5 w-5 text-yellow-400" />,
      detail: "Percentage of customers returning for additional work"
    },
    {
      metric: "Referral Generation Rate",
      data: "25-35% customers provide referrals",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "Happy customers recommending your services"
    },
    {
      metric: "Customer Lifetime Value",
      data: "£2,500-5,000 average value",
      icon: <PoundSterling className="h-5 w-5 text-blue-400" />,
      detail: "Total revenue potential per customer relationship"
    },
    {
      metric: "Repeat Business Rate",
      data: "40-60% of annual revenue",
      icon: <Repeat className="h-5 w-5 text-purple-400" />,
      detail: "Revenue from existing customer relationships"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-yellow-400/50 bg-yellow-400/10">
        <Heart className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-400">
          Retaining customers costs 5-7 times less than acquiring new ones. A 5% increase in retention can boost profits by 25-95%.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {retentionMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="strategies">
          <MobileAccordionTrigger icon={<Heart className="h-5 w-5 text-yellow-400" />}>
            Customer Retention Strategies
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Retention Strategy</h4>
                <p className="text-sm text-slate-200">Building lasting relationships with customers ensures repeat business and creates sustainable growth. Retaining customers costs 5-7 times less than acquiring new ones, making it the most profitable growth strategy.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Relationship Building Excellence</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Maintain detailed customer records with preferences, family details, and service history</li>
                  <li>• Send personalised birthday and anniversary greetings with special offers</li>
                  <li>• Provide seasonal electrical safety tips and weather-related maintenance reminders</li>
                  <li>• Check in proactively after major weather events or power outages</li>
                  <li>• Offer priority booking and express service for regular customers</li>
                  <li>• Remember personal details like pet names, family members, and property quirks</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Value-Added Service Portfolio</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Complimentary annual electrical safety assessments for loyal customers</li>
                  <li>• Extended warranties (3-5 years) for repeat customers vs standard 1-2 years</li>
                  <li>• 24/7 emergency call-out priority service with guaranteed response times</li>
                  <li>• Progressive discount structure: 5% after 2 jobs, 10% after 5 jobs, 15% after 10 jobs</li>
                  <li>• Free minor repairs and adjustments during routine service visits</li>
                  <li>• Educational workshops on electrical safety, energy efficiency, and smart home technology</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Retention ROI Benefits</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Increases customer lifetime value from £1,500 to £4,500+ over 5 years</li>
                  <li>• Generates 65% of new business through referrals from satisfied customers</li>
                  <li>• Reduces marketing costs by 60% through word-of-mouth promotion</li>
                  <li>• Creates predictable revenue streams through maintenance contracts and repeat work</li>
                  <li>• Builds competitive moats that protect against price-based competition</li>
                  <li>• Establishes premium positioning allowing 15-25% higher pricing than competitors</li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="maintenance">
          <MobileAccordionTrigger icon={<Calendar className="h-5 w-5 text-blue-400" />}>
            Maintenance Contract Programs
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Maintenance Strategy</h4>
                <p className="text-sm text-slate-200">Regular maintenance contracts provide predictable revenue while ensuring customer electrical systems remain safe and efficient. This creates win-win relationships that generate 40-60% of annual revenue.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Comprehensive Service Packages</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-emerald-500/20">
                    <h5 className="font-semibold text-emerald-300 mb-2">Residential Basic</h5>
                    <ul className="space-y-1 text-xs text-slate-200">
                      <li>• Annual safety inspection</li>
                      <li>• Priority emergency service</li>
                      <li>• 10% discount on repairs</li>
                      <li>• Seasonal safety reminders</li>
                      <li>• Free smoke alarm testing</li>
                    </ul>
                    <div className="text-center mt-2 p-2 bg-emerald-500/10 rounded text-emerald-400 font-bold">£120/year</div>
                  </div>
                  
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-emerald-500/20">
                    <h5 className="font-semibold text-emerald-300 mb-2">Residential Premium</h5>
                    <ul className="space-y-1 text-xs text-slate-200">
                      <li>• Bi-annual inspections</li>
                      <li>• 24/7 emergency response</li>
                      <li>• 20% discount on all work</li>
                      <li>• Free minor repairs included</li>
                      <li>• Energy efficiency assessments</li>
                    </ul>
                    <div className="text-center mt-2 p-2 bg-emerald-500/10 rounded text-emerald-400 font-bold">£220/year</div>
                  </div>
                  
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-emerald-500/20">
                    <h5 className="font-semibold text-emerald-300 mb-2">Commercial</h5>
                    <ul className="space-y-1 text-xs text-slate-200">
                      <li>• Monthly/quarterly inspections</li>
                      <li>• Immediate emergency response</li>
                      <li>• Planned maintenance schedule</li>
                      <li>• Compliance documentation</li>
                      <li>• Energy monitoring reports</li>
                    </ul>
                    <div className="text-center mt-2 p-2 bg-emerald-500/10 rounded text-emerald-400 font-bold">Custom Quote</div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Contract Benefits & Features</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Predictable annual costs with no surprise emergency charges</li>
                  <li>• Proactive maintenance prevents costly breakdowns and safety hazards</li>
                  <li>• Priority response times: 2 hours for emergencies, next day for routine</li>
                  <li>• Detailed inspection reports with photos and recommendations</li>
                  <li>• Automatic renewal with inflation-adjusted pricing transparency</li>
                  <li>• Transferable contracts that add property value for homeowners</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Revenue Stability Impact</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Creates predictable monthly cash flow throughout the year</li>
                  <li>• Increases customer lifetime value by 300-400% over one-off jobs</li>
                  <li>• Reduces seasonal revenue fluctuations in residential work</li>
                  <li>• Builds business equity through recurring revenue streams</li>
                  <li>• Generates opportunities for additional project sales during visits</li>
                  <li>• Provides data for strategic planning and business growth</li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="communication">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-green-400" />}>
            Customer Communication Program
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Communication Strategy</h4>
                <p className="text-sm text-slate-200">Regular, valuable communication keeps your business top-of-mind and demonstrates ongoing care for customer safety and satisfaction. Strategic communication turns one-time customers into lifetime advocates.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Regular Communication Touchpoints</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Monthly newsletter featuring electrical safety tips, energy saving advice, and technology updates</li>
                  <li>• Seasonal maintenance reminders with weather-specific electrical safety guidance</li>
                  <li>• Customer success stories and testimonials showcasing quality work</li>
                  <li>• Special offers and promotions exclusive to existing customers</li>
                  <li>• Emergency weather alerts and power outage preparation tips</li>
                  <li>• New service announcements and capability expansions</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Systematic Follow-Up Schedule</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• 48 hours post-completion: Satisfaction call and immediate issue resolution</li>
                  <li>• 1 month follow-up: Email check-in with performance feedback form</li>
                  <li>• 6 months: Maintenance reminder with booking incentive</li>
                  <li>• 12 months: Annual safety check offer with loyalty discount</li>
                  <li>• 18 months: Comprehensive service review and upgrade consultation</li>
                  <li>• 24 months: Relationship assessment and future planning discussion</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Communication ROI Impact</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Increases repeat booking rates by 45% through consistent touchpoints</li>
                  <li>• Generates 30% more referrals through regular relationship maintenance</li>
                  <li>• Reduces customer acquisition costs by maintaining existing relationships</li>
                  <li>• Creates opportunities for upselling and additional service sales</li>
                  <li>• Builds brand loyalty that withstands competitive pricing pressure</li>
                  <li>• Establishes trust that justifies premium pricing strategies</li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="loyalty">
          <MobileAccordionTrigger icon={<Gift className="h-5 w-5 text-purple-400" />}>
            Loyalty Programs & Incentives
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Loyalty Strategy</h4>
                <p className="text-sm text-slate-200">Reward loyal customers with incentives that encourage repeat business and referrals while building long-term relationships. A structured loyalty program increases customer lifetime value by 25-100%.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Comprehensive Rewards System</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Points-based system: 1 point per £1 spent, with bonus multipliers for referrals (50 points) and maintenance contracts (2x points)</li>
                  <li>• Birthday and anniversary bonus points (25-50 points) with personalised offers</li>
                  <li>• Redemption tiers: 100 points = £10 discount, 500 points = free safety inspection, 1000 points = priority emergency service</li>
                  <li>• Seasonal bonus point campaigns during slower periods to drive business</li>
                  <li>• Family account linking to pool points across household electrical needs</li>
                  <li>• Points never expire with annual activity, encouraging ongoing engagement</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">VIP Customer Tier Benefits</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Bronze (1+ years): 5% discount, priority booking, extended payment terms</li>
                  <li>• Silver (3+ years): 10% discount, free annual safety check, dedicated support line</li>
                  <li>• Gold (5+ years): 15% discount, 24/7 emergency priority, complimentary minor repairs</li>
                  <li>• Platinum (10+ years): 20% discount, personal account manager, exclusive services</li>
                  <li>• Each tier includes progressively longer warranty periods and payment flexibility</li>
                  <li>• Tier-specific communications and exclusive event invitations</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Loyalty Program ROI</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Increases repeat purchase frequency by 35-50% through incentivised engagement</li>
                  <li>• Generates 40% more referrals through structured reward mechanisms</li>
                  <li>• Reduces price sensitivity by 60% through perceived value enhancement</li>
                  <li>• Creates emotional connection beyond transactional relationships</li>
                  <li>• Provides valuable customer data for targeted marketing and service improvement</li>
                  <li>• Justifies premium pricing through exclusive benefits and status recognition</li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="metrics">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-orange-400" />}>
            Growth Metrics & KPIs
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Metrics Strategy</h4>
                <p className="text-sm text-slate-200">Track key performance indicators to measure retention success and identify opportunities for improvement. Data-driven decisions ensure sustainable growth and profitability optimization.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Core Retention Metrics</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Customer retention rate: Target 85%+ annual retention (industry average: 68%)</li>
                  <li>• Repeat purchase rate: Target 60%+ customers returning within 24 months</li>
                  <li>• Customer lifetime value tracking: £2,500-5,000 average over 5 years</li>
                  <li>• Net Promoter Score: Target 70+ (excellent = 50+, world-class = 70+)</li>
                  <li>• Customer churn rate monitoring: Target &lt;15% annual churn</li>
                  <li>• Average time between services: Track seasonal patterns and decline indicators</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Growth & Revenue Indicators</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Referral generation rate: Target 25%+ customers actively referring (best-in-class: 35%+)</li>
                  <li>• Revenue per customer growth: Track increasing spend patterns and service expansion</li>
                  <li>• Maintenance contract renewal rate: Target 90%+ renewal with price increases</li>
                  <li>• Upselling success rate: Target 20%+ additional services per visit</li>
                  <li>• Customer satisfaction scores: Maintain 95%+ satisfaction across all touchpoints</li>
                  <li>• Online review ratings: Target 4.8+ stars across Google, Trustpilot, Checkatrade</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Advanced Analytics & Tracking</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Customer segmentation analysis: High-value, medium-value, at-risk customer categories</li>
                  <li>• Seasonal demand forecasting: Predict busy periods and resource requirements</li>
                  <li>• Profitability analysis per customer: Identify most valuable customer segments</li>
                  <li>• Service quality correlation tracking: Link quality metrics to retention rates</li>
                  <li>• Communication effectiveness measurement: Track response rates to different touchpoints</li>
                  <li>• Competitive positioning analysis: Monitor market share and pricing effectiveness</li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="referrals">
          <MobileAccordionTrigger icon={<Star className="h-5 w-5 text-cyan-400" />}>
            Strategic Referral Programs
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Referral Strategy</h4>
                <p className="text-sm text-slate-200">Referrals are the highest-quality leads with 5x higher conversion rates and 25% higher lifetime value. A systematic referral program can generate 40-70% of new business.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Referral Incentive Structure</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Dual reward system: £50 credit for referrer, £25 discount for new customer</li>
                  <li>• Tiered bonuses: 3 referrals = £200 bonus, 5 referrals = free annual service</li>
                  <li>• Business referral premium: £100 credit for commercial customer referrals</li>
                  <li>• Seasonal multipliers: Double rewards during slow periods (January-February)</li>
                  <li>• Family referral discounts: Special rates for extended family members</li>
                  <li>• Tradesperson cross-referrals: Partnership programs with plumbers, builders, decorators</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Referral Generation Process</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Ask for referrals at optimal moments: After successful project completion</li>
                  <li>• Provide referral cards with QR codes linking to special booking pages</li>
                  <li>• Follow up 48 hours post-job with referral request and incentive reminder</li>
                  <li>• Social media sharing incentives: Bonus rewards for public testimonials</li>
                  <li>• Neighbour targeting: Special offers for properties within 500m of completed work</li>
                  <li>• Annual referral campaigns: Special events and higher rewards during peak seasons</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Referral Program ROI</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Referred customers have 37% higher retention rates than other acquisition channels</li>
                  <li>• Cost per acquisition through referrals: £25-50 vs £150-300 for advertising</li>
                  <li>• Referral conversion rates: 35-50% vs 2-5% for cold marketing</li>
                  <li>• Creates compound growth: Referred customers also become referrers</li>
                  <li>• Builds community reputation and local market dominance</li>
                  <li>• Generates social proof that supports premium pricing strategies</li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default RetentionGrowthTab;