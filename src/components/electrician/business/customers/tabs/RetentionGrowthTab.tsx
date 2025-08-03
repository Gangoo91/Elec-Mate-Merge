import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart, Repeat, TrendingUp, Calendar, Gift, Users, BarChart3, PoundSterling } from "lucide-react";

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
              <div className="text-sm text-muted-foreground">
                Building lasting relationships with customers ensures repeat business and creates sustainable growth for your electrical contracting business.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Relationship Building</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Remember customer preferences and history</li>
                    <li>• Send birthday and anniversary greetings</li>
                    <li>• Provide seasonal electrical safety tips</li>
                    <li>• Check in after major weather events</li>
                    <li>• Offer priority booking for regular customers</li>
                    <li>• Maintain detailed customer records and notes</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Value-Added Services</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Free annual electrical safety checks</li>
                    <li>• Extended warranties for repeat customers</li>
                    <li>• Emergency call-out priority service</li>
                    <li>• Discounted rates for multiple services</li>
                    <li>• Free minor repairs during visits</li>
                    <li>• Educational workshops and seminars</li>
                  </ul>
                </div>
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
              <div className="text-sm text-muted-foreground">
                Regular maintenance contracts provide predictable revenue while ensuring customer electrical systems remain safe and efficient.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-elec-yellow/20 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3">Basic Plan</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Annual Safety Check</span>
                      <Badge variant="secondary">✓</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emergency Call-out</span>
                      <Badge variant="secondary">10% Off</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Priority Booking</span>
                      <Badge variant="secondary">✓</Badge>
                    </div>
                    <div className="text-center mt-3 p-2 bg-elec-yellow/10 rounded">
                      <strong>£120/year</strong>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-elec-yellow/20 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3">Premium Plan</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Bi-annual Inspections</span>
                      <Badge variant="secondary">✓</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emergency Call-out</span>
                      <Badge variant="secondary">20% Off</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Minor Repairs</span>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                    <div className="text-center mt-3 p-2 bg-elec-yellow/10 rounded">
                      <strong>£220/year</strong>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-elec-yellow/20 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3">Commercial Plan</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Monthly Inspections</span>
                      <Badge variant="secondary">✓</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>24/7 Emergency</span>
                      <Badge variant="secondary">✓</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>All Minor Repairs</span>
                      <Badge variant="secondary">Included</Badge>
                    </div>
                    <div className="text-center mt-3 p-2 bg-elec-yellow/10 rounded">
                      <strong>Custom Quote</strong>
                    </div>
                  </div>
                </div>
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
              <div className="text-sm text-muted-foreground">
                Regular, valuable communication keeps your business top-of-mind and demonstrates ongoing care for customer safety and satisfaction.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Regular Communications</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Quarterly newsletter with safety tips</li>
                    <li>• Seasonal electrical maintenance reminders</li>
                    <li>• New technology and service updates</li>
                    <li>• Customer spotlight success stories</li>
                    <li>• Special offers and promotions</li>
                    <li>• Weather-related safety alerts</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Follow-Up Schedule</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 48 hours: Post-job satisfaction call</li>
                    <li>• 1 month: Check-in email or call</li>
                    <li>• 6 months: Maintenance reminder</li>
                    <li>• 12 months: Annual check offer</li>
                    <li>• 18 months: Service review call</li>
                    <li>• 24 months: Relationship assessment</li>
                  </ul>
                </div>
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
              <div className="text-sm text-muted-foreground">
                Reward loyal customers with incentives that encourage repeat business and referrals while building long-term relationships.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Points-Based Rewards</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 1 point per £1 spent on services</li>
                    <li>• Bonus points for referrals (50 points)</li>
                    <li>• Double points for maintenance contracts</li>
                    <li>• Birthday bonus points annually</li>
                    <li>• 100 points = £10 service discount</li>
                    <li>• 500 points = Free safety inspection</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">VIP Customer Tiers</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Bronze (1+ years): 5% discount</li>
                    <li>• Silver (3+ years): 10% discount</li>
                    <li>• Gold (5+ years): 15% discount</li>
                    <li>• Platinum (10+ years): 20% discount</li>
                    <li>• Extended warranty periods</li>
                    <li>• Personal account manager access</li>
                  </ul>
                </div>
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
              <div className="text-sm text-muted-foreground">
                Track key performance indicators to measure retention success and identify opportunities for improvement.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Retention Metrics</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Customer retention rate (Target: 85%+)</li>
                    <li>• Repeat purchase rate (Target: 60%+)</li>
                    <li>• Customer lifetime value tracking</li>
                    <li>• Net Promoter Score (Target: 70+)</li>
                    <li>• Churn rate monitoring</li>
                    <li>• Average time between services</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Growth Indicators</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Referral rate (Target: 25%+)</li>
                    <li>• Revenue per customer (increasing)</li>
                    <li>• Contract renewal rate (Target: 90%+)</li>
                    <li>• Upselling success (Target: 20%+)</li>
                    <li>• Customer satisfaction scores</li>
                    <li>• Social media reviews and ratings</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default RetentionGrowthTab;