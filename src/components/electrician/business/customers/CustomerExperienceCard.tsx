
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Clock, Trophy, Target, Heart, Zap } from "lucide-react";

const CustomerExperienceCard = () => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Star className="h-6 w-6 text-elec-yellow" />
          <div>
            <CardTitle>Customer Experience Excellence</CardTitle>
            <CardDescription>Creating delighted customers who become advocates for your electrical business</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="multiple" className="w-full space-y-3">
          <AccordionItem value="communication" className="border border-elec-yellow/20 rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                <div>
                  <div className="font-semibold">Professional Communication Systems</div>
                  <div className="text-sm text-muted-foreground">Building trust through clear, consistent communication</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-200 pt-4 space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Implementation Strategy:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Set up automated appointment confirmation and reminder systems (24 hours and 2 hours before)</li>
                  <li>Provide real-time updates if delays occur, with estimated arrival times</li>
                  <li>Send job completion summaries with photos and explanations of work completed</li>
                  <li>Implement a customer portal for easy scheduling and access to service history</li>
                  <li>Create standardised communication templates for common scenarios</li>
                </ul>
                
                <h4 className="font-medium text-white">Timeline:</h4>
                <p>2-4 weeks to implement basic systems, 2-3 months to optimise based on customer feedback</p>
                
                <h4 className="font-medium text-white">Expected Benefits:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>40% reduction in customer service calls about appointment status</li>
                  <li>25% improvement in customer satisfaction scores</li>
                  <li>Higher likelihood of positive online reviews</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="service-standards" className="border border-elec-yellow/20 rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                <div>
                  <div className="font-semibold">Professional Service Standards</div>
                  <div className="text-sm text-muted-foreground">Consistent excellence in every customer interaction</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-200 pt-4 space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Service Excellence Framework:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Train all technicians in customer service skills alongside technical competencies</li>
                  <li>Implement protective measures: shoe covers, dust sheets, floor protection for all jobs</li>
                  <li>Establish clear protocols for explaining work to customers in plain English</li>
                  <li>Create before/after photo documentation standards for all installations</li>
                  <li>Develop a quality checklist that customers can see and sign off on</li>
                </ul>
                
                <h4 className="font-medium text-white">Timeline:</h4>
                <p>1-2 months for initial training and protocol implementation, ongoing refinement</p>
                
                <h4 className="font-medium text-white">Key Metrics:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Customer satisfaction ratings above 4.5/5</li>
                  <li>Zero complaints about property protection or cleanliness</li>
                  <li>90% customer understanding of work completed</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="follow-up" className="border border-elec-yellow/20 rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                <div>
                  <div className="font-semibold">Systematic Follow-Up Processes</div>
                  <div className="text-sm text-muted-foreground">Maintaining relationships beyond job completion</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-200 pt-4 space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Follow-Up Strategy:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>48-hour post-completion satisfaction check via phone or email</li>
                  <li>7-day follow-up to address any concerns or additional questions</li>
                  <li>Annual maintenance reminder system for PAT testing, EICR renewals</li>
                  <li>Seasonal safety check offers (before winter, summer holidays)</li>
                  <li>Birthday or anniversary discounts for loyal customers</li>
                </ul>
                
                <h4 className="font-medium text-white">Implementation Cost:</h4>
                <p>£200-500/month for CRM system and automation tools, staff time equivalent to 5-10 hours/week</p>
                
                <h4 className="font-medium text-white">ROI Potential:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>25-40% increase in repeat business</li>
                  <li>3x higher likelihood of customer referrals</li>
                  <li>15-20% premium pricing acceptance for trusted contractors</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="value-added" className="border border-elec-yellow/20 rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                <div>
                  <div className="font-semibold">Value-Added Services</div>
                  <div className="text-sm text-muted-foreground">Going beyond expectations to create memorable experiences</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-200 pt-4 space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Additional Value Services:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Complimentary electrical safety audit with every service call</li>
                  <li>Energy efficiency recommendations and cost-saving tips</li>
                  <li>Branded promotional items: electrical safety checklists, emergency contact magnets</li>
                  <li>Extended warranties on installations (3-5 years vs. standard 1-2 years)</li>
                  <li>24/7 emergency helpline for existing customers</li>
                  <li>Senior citizen and NHS worker discount programmes</li>
                </ul>
                
                <h4 className="font-medium text-white">Investment Required:</h4>
                <p>£100-300/month for promotional items and extended warranty provision</p>
                
                <h4 className="font-medium text-white">Customer Impact:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>85% customer retention rate for businesses offering value-added services</li>
                  <li>50% more likely to receive 5-star reviews</li>
                  <li>Higher customer lifetime value and referral rates</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="loyalty-programs" className="border border-elec-yellow/20 rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                <div>
                  <div className="font-semibold">Customer Loyalty & Retention</div>
                  <div className="text-sm text-muted-foreground">Building long-term relationships through structured programmes</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-200 pt-4 space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Loyalty Programme Structure:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Points-based system: 1 point per £1 spent, 100 points = £10 discount</li>
                  <li>Referral bonuses: £25 credit for each successful referral</li>
                  <li>Annual service contracts with 15% discount and priority booking</li>
                  <li>VIP maintenance programmes for commercial clients</li>
                  <li>Milestone rewards: 5th service free inspection, 10th service 20% discount</li>
                </ul>
                
                <h4 className="font-medium text-white">Technology Platform:</h4>
                <p>Customer portal integration, mobile app, or simple CRM tracking system</p>
                
                <h4 className="font-medium text-white">Business Impact:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>60% improvement in customer retention rates</li>
                  <li>35% increase in average order value</li>
                  <li>2-3x higher customer lifetime value</li>
                  <li>Competitive differentiation in crowded market</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CustomerExperienceCard;
