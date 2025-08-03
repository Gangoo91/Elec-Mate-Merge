import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Star, Shield, Clock, Users, MessageSquare, Award, AlertTriangle, Heart, Monitor } from "lucide-react";

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
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                <p className="text-sm text-slate-200">Consistent professional standards ensure every customer interaction reflects your commitment to quality and service excellence, building trust and credibility from first contact.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Professional Appearance Standards</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Clean, branded uniforms or workwear with company logo and contact details</li>
                  <li>• Professional ID badges clearly visible with current certifications displayed</li>
                  <li>• Well-maintained vehicles and modern testing equipment</li>
                  <li>• Personal grooming and hygiene standards appropriate for customer homes</li>
                  <li>• Protective shoe covers and dust sheets for customer property protection</li>
                  <li>• Professional business cards and branded paperwork ready for distribution</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Professional Conduct Guidelines</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Treat customer property with utmost respect and care</li>
                  <li>• Use dust sheets and protective covers for all work areas</li>
                  <li>• Complete daily cleanup and thorough completion tidying</li>
                  <li>• Maintain professional language and courteous demeanour at all times</li>
                  <li>• Follow appropriate mobile phone etiquette - answer calls professionally</li>
                  <li>• No smoking, drinking, or inappropriate behaviour on customer premises</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Quality Presentation Benefits</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Increases customer confidence and willingness to pay premium rates</li>
                  <li>• Generates positive word-of-mouth referrals and online reviews</li>
                  <li>• Differentiates your service from less professional competitors</li>
                  <li>• Builds long-term customer relationships and repeat business opportunities</li>
                  <li>• Supports higher pricing and premium service positioning</li>
                  <li>• Reduces customer complaints and service recovery incidents</li>
                </ul>
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
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Communication Strategy</h4>
                <p className="text-sm text-slate-200">Clear, timely communication throughout the service process builds trust, prevents misunderstandings, and demonstrates professionalism at every customer touchpoint.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Pre-Work Communication Protocol</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Confirm appointment 24 hours ahead with SMS and phone call</li>
                  <li>• Provide specific arrival time window (not just "morning" or "afternoon")</li>
                  <li>• Explain clearly what work will involve and expected duration</li>
                  <li>• List any customer preparations needed (access, power isolation, pets)</li>
                  <li>• Share assigned electrician's direct contact details</li>
                  <li>• Discuss weather contingency planning for external work</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">On-Site Communication Excellence</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Explain work being undertaken in clear, non-technical language</li>
                  <li>• Discuss any unexpected discoveries or necessary changes immediately</li>
                  <li>• Provide regular progress updates, especially for multi-day jobs</li>
                  <li>• Address customer questions promptly and thoroughly</li>
                  <li>• Notify immediately of any delays with revised completion times</li>
                  <li>• Seek written approval for any variations or additional work</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Post-Completion Follow-Up</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Conduct comprehensive walkthrough of all completed work</li>
                  <li>• Explain safety features and new systems installed</li>
                  <li>• Provide clear operating instructions and maintenance advice</li>
                  <li>• Leave contact details for any future queries or concerns</li>
                  <li>• Follow up within 48 hours to ensure complete satisfaction</li>
                  <li>• Schedule maintenance reminders and future service opportunities</li>
                </ul>
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
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Quality Strategy</h4>
                <p className="text-sm text-slate-200">Maintaining high technical standards and compliance ensures customer safety, builds long-term trust, and demonstrates professional competence in all electrical work.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Technical Compliance Standards</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• BS7671:2018+A2:2022 (18th Edition Wiring Regulations) full compliance</li>
                  <li>• Proper testing and inspection procedures with calibrated equipment</li>
                  <li>• Electrical Installation Certificates completed accurately and promptly</li>
                  <li>• Part P Building Regulations compliance for all notifiable work</li>
                  <li>• Safe isolation procedures following approved code of practice</li>
                  <li>• RCD protection implementation according to current standards</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Documentation Excellence</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Complete installation certificates provided same day</li>
                  <li>• Comprehensive test results documented with explanations</li>
                  <li>• Warranty information included with terms clearly explained</li>
                  <li>• Safety instructions explained verbally and in writing</li>
                  <li>• Maintenance recommendations with scheduling suggestions</li>
                  <li>• Emergency contact information for urgent call-outs</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Quality Assurance Benefits</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Reduces liability and insurance claims through proper compliance</li>
                  <li>• Builds customer confidence in technical competence</li>
                  <li>• Prevents call-backs and remedial work costs</li>
                  <li>• Supports premium pricing for certified quality work</li>
                  <li>• Creates competitive advantage over non-compliant competitors</li>
                  <li>• Establishes professional reputation and referral generation</li>
                </ul>
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
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Feedback Strategy</h4>
                <p className="text-sm text-slate-200">Systematic feedback collection and service recovery processes ensure continuous improvement, customer satisfaction, and long-term business growth through customer insights.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Comprehensive Feedback Collection</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Immediate verbal feedback at job completion with satisfaction rating</li>
                  <li>• Quick satisfaction survey forms left with customers</li>
                  <li>• Follow-up email surveys within 48 hours with detailed questions</li>
                  <li>• Phone check-in after one week to address any concerns</li>
                  <li>• Online review requests with direct links to Google and Trustpilot</li>
                  <li>• Annual customer satisfaction surveys for relationship management</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Service Recovery Excellence</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Listen actively to understand concerns without defensive responses</li>
                  <li>• Apologise sincerely and take full responsibility for any issues</li>
                  <li>• Resolve issues quickly and thoroughly, exceeding expectations</li>
                  <li>• Follow up personally to ensure complete satisfaction</li>
                  <li>• Implement process improvements based on feedback</li>
                  <li>• Document lessons learned and share with team for training</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Continuous Improvement Impact</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Identifies service gaps before they become widespread issues</li>
                  <li>• Builds customer loyalty through demonstration of care</li>
                  <li>• Provides testimonials and case studies for marketing</li>
                  <li>• Improves team performance through specific feedback insights</li>
                  <li>• Reduces negative reviews through proactive issue resolution</li>
                  <li>• Creates competitive advantage through superior customer service</li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="digital">
          <MobileAccordionTrigger icon={<Monitor className="h-5 w-5 text-orange-400" />}>
            Digital Customer Experience
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Digital Strategy</h4>
                <p className="text-sm text-slate-200">Leveraging digital tools and platforms to enhance customer convenience, streamline communication, and create a superior service experience that differentiates your electrical business.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-3">Digital Service Platform</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Online booking system with real-time availability and instant confirmation</li>
                  <li>• Customer portal for appointment tracking and service history access</li>
                  <li>• Digital invoicing and multiple payment options (card, bank transfer, mobile)</li>
                  <li>• Electronic certificates and warranties with secure cloud storage</li>
                  <li>• Photo documentation of completed work with before/after comparisons</li>
                  <li>• QR codes linking to service manuals, support guides, and contact information</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-3">Multi-Channel Communication</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• SMS notifications for appointment confirmations and arrival updates</li>
                  <li>• WhatsApp Business for quick queries and emergency contact</li>
                  <li>• Email progress updates with photos and completion reports</li>
                  <li>• Live chat on website for immediate support and quotes</li>
                  <li>• Video calls for remote consultations and technical assessments</li>
                  <li>• Social media channels for customer service and community engagement</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">Customer Self-Service & Analytics</h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Comprehensive online FAQ and electrical troubleshooting guides</li>
                  <li>• Emergency contact information portal with 24/7 availability</li>
                  <li>• Customer satisfaction tracking with automated survey systems</li>
                  <li>• Service performance metrics and response time monitoring</li>
                  <li>• Personalised service recommendations based on property history</li>
                  <li>• Predictive maintenance scheduling with automatic reminder systems</li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default CustomerExperienceTab;