import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Target, Phone, Mail, MessageCircle, Clock, CheckCircle, Users, FileText, TrendingUp } from "lucide-react";

const LeadGenerationTab = () => {
  const isMobile = useIsMobile();

  const leadMetrics = [
    {
      metric: "Lead Response Time",
      data: "< 5 minutes optimal response",
      icon: <Clock className="h-5 w-5 text-green-400" />,
      detail: "Speed significantly impacts conversion rates"
    },
    {
      metric: "Quote Conversion Rate",
      data: "35-55% quote to job success",
      icon: <CheckCircle className="h-5 w-5 text-blue-400" />,
      detail: "Professional quoting process essential"
    },
    {
      metric: "Lead Quality Score",
      data: "70%+ leads from referrals/website",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "Focus on high-quality lead sources"
    },
    {
      metric: "Customer Acquisition Cost",
      data: "£25-75 per qualified lead",
      icon: <Target className="h-5 w-5 text-orange-400" />,
      detail: "Investment needed per new customer"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-green-400/50 bg-green-400/10">
        <Target className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-400">
          Rapid lead response can increase conversion rates by 300-400%. The first business to respond wins 50% of opportunities.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {leadMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="sources">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-green-400" />}>
            Lead Generation Sources
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Diversifying lead sources ensures consistent customer flow and reduces dependency on single channels.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Digital Sources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Google Ads and Local Service Ads</li>
                    <li>• Website contact forms</li>
                    <li>• Social media inquiries</li>
                    <li>• Trade website listings</li>
                    <li>• Online directories</li>
                    <li>• Email marketing campaigns</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Referral Sources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Existing customer referrals</li>
                    <li>• Trade partner recommendations</li>
                    <li>• Word-of-mouth marketing</li>
                    <li>• Professional networks</li>
                    <li>• Repeat customer projects</li>
                    <li>• Business partnerships</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Traditional Sources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Vehicle signage inquiries</li>
                    <li>• Local advertising responses</li>
                    <li>• Door-to-door campaigns</li>
                    <li>• Community networking</li>
                    <li>• Yellow Pages listings</li>
                    <li>• Local press features</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="contact">
          <MobileAccordionTrigger icon={<Phone className="h-5 w-5 text-blue-400" />}>
            Initial Contact & Response
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                First impressions matter. Professional, prompt responses set the tone for the entire customer relationship.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Phone Response Protocol</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Answer within 3 rings maximum</li>
                    <li>• Professional greeting with company name</li>
                    <li>• Active listening and note-taking</li>
                    <li>• Clear, jargon-free explanations</li>
                    <li>• Immediate availability scheduling</li>
                    <li>• Follow-up confirmation calls</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Information Gathering</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Contact details and property address</li>
                    <li>• Problem description and urgency</li>
                    <li>• Property type and age</li>
                    <li>• Previous electrical work history</li>
                    <li>• Budget considerations</li>
                    <li>• Preferred appointment times</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="quoting">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-purple-400" />}>
            Professional Quoting Process
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                A professional quoting process builds trust, demonstrates competence, and significantly improves conversion rates.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Site Visit Preparation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Schedule within 24-48 hours</li>
                    <li>• Confirm appointment details</li>
                    <li>• Bring professional equipment</li>
                    <li>• Company ID and insurance documentation</li>
                    <li>• Tablet/smartphone for photos</li>
                    <li>• Professional appearance and uniform</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Quote Presentation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Detailed cost breakdown</li>
                    <li>• Materials and labour separation</li>
                    <li>• Clear timeline for completion</li>
                    <li>• Payment terms and methods</li>
                    <li>• Warranty and guarantee information</li>
                    <li>• Professional document formatting</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="conversion">
          <MobileAccordionTrigger icon={<CheckCircle className="h-5 w-5 text-orange-400" />}>
            Lead Conversion Strategies
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Converting leads to customers requires understanding customer concerns and presenting compelling value propositions.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Value Propositions</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Qualified and certified electricians</li>
                    <li>• Fully insured and guaranteed work</li>
                    <li>• Emergency call-out availability</li>
                    <li>• Competitive and transparent pricing</li>
                    <li>• Local expertise and knowledge</li>
                    <li>• Customer testimonials and reviews</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Objection Handling</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• "Price too high" - Explain value and quality</li>
                    <li>• "Need to think" - Offer limited incentives</li>
                    <li>• "Getting other quotes" - Highlight uniqueness</li>
                    <li>• "Budget concerns" - Discuss payment options</li>
                    <li>• "Timing issues" - Flexible scheduling</li>
                    <li>• "Previous bad experience" - Provide reassurance</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Closing Techniques</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Assumptive close approach</li>
                    <li>• Alternative choice presentation</li>
                    <li>• Urgency and scarcity factors</li>
                    <li>• Summary benefit close</li>
                    <li>• Question-based closing</li>
                    <li>• Trial close opportunities</li>
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

export default LeadGenerationTab;