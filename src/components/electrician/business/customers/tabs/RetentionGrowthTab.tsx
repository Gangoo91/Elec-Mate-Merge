import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Repeat, TrendingUp, Calendar, Gift, Users, BarChart3 } from "lucide-react";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";

const RetentionGrowthTab = () => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Customer Retention & Business Growth</CardTitle>
          </div>
          <CardDescription>
            Build lasting relationships with customers to ensure repeat business, generate referrals, and create sustainable growth for your electrical contracting business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <Repeat className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Repeat Business</h4>
              <p className="text-xs text-muted-foreground">Regular maintenance contracts</p>
            </div>
            <div className="text-center space-y-2">
              <Users className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Referrals</h4>
              <p className="text-xs text-muted-foreground">Customer recommendations</p>
            </div>
            <div className="text-center space-y-2">
              <Calendar className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Follow-Up</h4>
              <p className="text-xs text-muted-foreground">Proactive customer care</p>
            </div>
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Growth</h4>
              <p className="text-xs text-muted-foreground">Sustainable expansion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Retention Strategies */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Customer Retention Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Relationship Building</h4>
              <ul className="space-y-2 text-sm">
                <li>• Remember customer preferences and history</li>
                <li>• Send birthday and anniversary greetings</li>
                <li>• Provide seasonal electrical safety tips</li>
                <li>• Check in after major weather events</li>
                <li>• Offer priority booking for regular customers</li>
                <li>• Maintain detailed customer records</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Value-Added Services</h4>
              <ul className="space-y-2 text-sm">
                <li>• Free annual electrical safety checks</li>
                <li>• Extended warranties for repeat customers</li>
                <li>• Emergency call-out priority</li>
                <li>• Discounted rates for multiple services</li>
                <li>• Free minor repairs during visits</li>
                <li>• Educational workshops and seminars</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Contracts */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Maintenance Contract Programs</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
        </CardContent>
      </Card>

      {/* Customer Communication Program */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Customer Communication Program</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Regular Communications</h4>
              <div className="space-y-3">
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">Quarterly Newsletter</h5>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Electrical safety tips</li>
                    <li>• New technology updates</li>
                    <li>• Customer spotlight stories</li>
                    <li>• Special offers and promotions</li>
                  </ul>
                </div>
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">Seasonal Reminders</h5>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Spring: Garden electrical safety</li>
                    <li>• Summer: Air conditioning preparation</li>
                    <li>• Autumn: Heating system checks</li>
                    <li>• Winter: Christmas light safety</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Follow-Up Schedule</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>48 Hours Post-Job</span>
                  <Badge variant="secondary">Satisfaction Call</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>1 Month Later</span>
                  <Badge variant="secondary">Check-in Email</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>6 Months Later</span>
                  <Badge variant="secondary">Maintenance Reminder</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>12 Months Later</span>
                  <Badge variant="secondary">Annual Check Offer</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Programs */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Customer Loyalty Programs</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Points-Based Rewards</h4>
              <div className="space-y-3">
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">Earning Points</h5>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• 1 point per £1 spent</li>
                    <li>• Bonus points for referrals</li>
                    <li>• Double points for maintenance contracts</li>
                    <li>• Birthday bonus points</li>
                  </ul>
                </div>
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">Redeeming Rewards</h5>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• 100 points = £10 discount</li>
                    <li>• 500 points = Free safety check</li>
                    <li>• 1000 points = Priority service upgrade</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">VIP Customer Benefits</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Gold</Badge>
                  <span>5+ years, 15% discount</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Silver</Badge>
                  <span>3+ years, 10% discount</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Bronze</Badge>
                  <span>1+ years, 5% discount</span>
                </li>
              </ul>
              <div className="mt-4 space-y-2 text-sm">
                <h5 className="font-medium">VIP Exclusive Benefits:</h5>
                <ul className="space-y-1">
                  <li>• Extended warranty periods</li>
                  <li>• Free emergency call-outs</li>
                  <li>• Exclusive access to new services</li>
                  <li>• Personal account manager</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Metrics & KPIs */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Growth Metrics & Performance Indicators</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Retention Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Customer Retention Rate</span>
                  <Badge variant="secondary">Target: 85%+</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Repeat Purchase Rate</span>
                  <Badge variant="secondary">Target: 60%+</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Customer Lifetime Value</span>
                  <Badge variant="secondary">Track Monthly</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Net Promoter Score</span>
                  <Badge variant="secondary">Target: 70+</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Growth Indicators</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Referral Rate</span>
                  <Badge variant="secondary">Target: 25%+</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Revenue per Customer</span>
                  <Badge variant="secondary">Increasing</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Contract Renewal Rate</span>
                  <Badge variant="secondary">Target: 90%+</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Upselling Success</span>
                  <Badge variant="secondary">Target: 20%+</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionGrowthTab;