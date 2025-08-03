import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Star, Shield, Clock, Users, MessageSquare, Award, AlertTriangle, Heart } from "lucide-react";

const CustomerExperienceTab = () => {
  const isMobile = useIsMobile();

  const experienceMetrics = [
    {
      metric: "Customer Satisfaction Rate",
      data: "95%+ target satisfaction score",
      icon: <Star className="h-5 w-5 text-cyan-400" />,
      detail: "Measure of service excellence and quality delivery"
    },
    {
      metric: "First-Time Fix Rate",
      data: "85%+ problems resolved first visit",
      icon: <Shield className="h-5 w-5 text-green-400" />,
      detail: "Competence indicator reducing customer inconvenience"
    },
    {
      metric: "On-Time Arrival Rate",
      data: "98%+ punctuality performance",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Reliability and professionalism measurement"
    },
    {
      metric: "Customer Retention Rate",
      data: "80%+ customers return for future work",
      icon: <Heart className="h-5 w-5 text-purple-400" />,
      detail: "Long-term relationship building success"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-cyan-400/50 bg-cyan-400/10">
        <Star className="h-4 w-4 text-cyan-400" />
        <AlertDescription className="text-cyan-400">
          Exceptional customer experience increases referral rates by 400% and customer lifetime value by 200-300%.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {experienceMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="standards">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-cyan-400" />}>
            Professional Service Standards
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Consistent professional standards ensure every customer interaction reflects your commitment to quality and service excellence.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Appearance & Presentation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Clean, branded uniforms or workwear</li>
                    <li>• Professional ID badges clearly visible</li>
                    <li>• Well-maintained vehicles and equipment</li>
                    <li>• Personal grooming and hygiene standards</li>
                    <li>• Protective shoe covers for customer homes</li>
                    <li>• Company literature and business cards</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Work Site Behaviour</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Respect for customer property</li>
                    <li>• Use of dust sheets and protective covers</li>
                    <li>• Daily cleanup and completion tidying</li>
                    <li>• No smoking on customer premises</li>
                    <li>• Professional language at all times</li>
                    <li>• Appropriate mobile phone etiquette</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="communication">
          <MobileAccordionTrigger icon={<MessageSquare className="h-5 w-5 text-blue-400" />}>
            Customer Communication Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Clear, timely communication throughout the service process builds trust and prevents misunderstandings.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Pre-Work Communication</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Confirm appointment 24 hours ahead</li>
                    <li>• Provide arrival time window</li>
                    <li>• Explain what work will involve</li>
                    <li>• List any customer preparations needed</li>
                    <li>• Share electrician's contact details</li>
                    <li>• Weather contingency planning</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">During Work Communication</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Explain work being undertaken</li>
                    <li>• Discuss any changes or discoveries</li>
                    <li>• Provide regular progress updates</li>
                    <li>• Address customer questions promptly</li>
                    <li>• Notify immediately of any delays</li>
                    <li>• Seek approval for variations</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Post-Work Communication</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Walkthrough completed work</li>
                    <li>• Explain safety features installed</li>
                    <li>• Provide operating instructions</li>
                    <li>• Leave contact details for queries</li>
                    <li>• Follow up within 48 hours</li>
                    <li>• Schedule any maintenance reminders</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="quality">
          <MobileAccordionTrigger icon={<Award className="h-5 w-5 text-green-400" />}>
            Quality Assurance & Compliance
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Maintaining high technical standards and compliance ensures customer safety and builds long-term trust.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Technical Standards</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• BS7671:2018+A2:2022 compliance</li>
                    <li>• Proper testing and inspection procedures</li>
                    <li>• Electrical Installation Certificates</li>
                    <li>• Part P Building Regulations compliance</li>
                    <li>• Safe isolation procedures</li>
                    <li>• RCD protection implementation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Documentation Package</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Installation certificates provided</li>
                    <li>• Test results documented</li>
                    <li>• Warranty information included</li>
                    <li>• Safety instructions explained</li>
                    <li>• Maintenance recommendations</li>
                    <li>• Emergency contact information</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="feedback">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-purple-400" />}>
            Customer Feedback & Improvement
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Systematic feedback collection and service recovery processes ensure continuous improvement and customer satisfaction.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Feedback Collection</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Immediate verbal feedback at completion</li>
                    <li>• Quick satisfaction survey forms</li>
                    <li>• Follow-up email surveys within 48 hours</li>
                    <li>• Phone check-in after one week</li>
                    <li>• Online review requests</li>
                    <li>• Annual customer satisfaction surveys</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Service Recovery Process</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Listen actively to understand concerns</li>
                    <li>• Apologise and take responsibility</li>
                    <li>• Resolve issues quickly and thoroughly</li>
                    <li>• Follow up to ensure satisfaction</li>
                    <li>• Implement process improvements</li>
                    <li>• Document lessons learned</li>
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

export default CustomerExperienceTab;