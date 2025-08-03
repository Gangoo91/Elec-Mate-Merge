import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Target, Phone, Mail, MessageCircle, Clock, CheckCircle, Users, FileText, TrendingUp, Filter, Calendar, AlertTriangle } from "lucide-react";

const LeadGenerationTab = () => {
  const isMobile = useIsMobile();

  const leadMetrics = [
    {
      metric: "Lead Response Time",
      data: "< 5 minutes optimal",
      icon: <Clock className="h-5 w-5 text-green-400" />,
      detail: "First to respond wins 50% of opportunities"
    },
    {
      metric: "Phone Lead Conversion",
      data: "65-85% conversion rate",
      icon: <Phone className="h-5 w-5 text-blue-400" />,
      detail: "Phone leads convert much higher than online"
    },
    {
      metric: "Quote-to-Job Success",
      data: "45-65% conversion rate",
      icon: <CheckCircle className="h-5 w-5 text-purple-400" />,
      detail: "Professional quoting process essential"
    },
    {
      metric: "Lead Qualification Rate",
      data: "70% of leads are qualified",
      icon: <Filter className="h-5 w-5 text-orange-400" />,
      detail: "Proper screening improves efficiency"
    },
    {
      metric: "Customer Acquisition Cost",
      data: "£35-85 per customer",
      icon: <Target className="h-5 w-5 text-yellow-400" />,
      detail: "Total cost to acquire paying customer"
    },
    {
      metric: "Emergency Call Premium",
      data: "3x higher conversion rate",
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      detail: "Emergency leads have urgency advantage"
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

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3 xl:grid-cols-6'}`}>
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
            Lead Generation Sources & Channels
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Successful electricians use multiple lead generation channels to ensure consistent customer flow and reduce dependency on single sources.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Channel Strategy</h4>
                    <p className="text-sm">Diversify lead sources across digital, referral, and traditional channels to maintain steady business flow.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Month 1: Optimise top 3 performing channels</li>
                      <li>• Month 2: Add 2-3 new lead sources</li>
                      <li>• Month 3: Test & measure channel performance</li>
                      <li>• Month 4+: Scale successful channels</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Channel Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Reduced market vulnerability</li>
                      <li>• Consistent lead flow</li>
                      <li>• Better cost management</li>
                      <li>• Improved lead quality mix</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">High-Converting Digital Sources</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Google Local Services Ads</li>
                      <li>• Website contact forms & chat</li>
                      <li>• Google My Business inquiries</li>
                      <li>• Facebook/Instagram targeted ads</li>
                      <li>• Checkatrade & TrustATrader leads</li>
                      <li>• Email marketing to past customers</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Referral & Traditional Sources</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Customer referral programmes</li>
                      <li>• Trade partner recommendations</li>
                      <li>• Vehicle signage inquiries</li>
                      <li>• Local networking events</li>
                      <li>• Community sponsorship leads</li>
                      <li>• Direct mail campaigns</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Channel Performance Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Cost per lead by source</li>
                      <li>• Conversion rate by channel</li>
                      <li>• Average job value per source</li>
                      <li>• Lead quality scoring</li>
                      <li>• Customer lifetime value</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="qualification">
          <MobileAccordionTrigger icon={<Filter className="h-5 w-5 text-blue-400" />}>
            Lead Qualification & Screening
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Proper lead qualification saves time, improves conversion rates, and ensures you focus on the most promising opportunities.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Qualification Strategy</h4>
                    <p className="text-sm">Screen leads early to identify budget, urgency, and decision-making authority before investing time in quotes.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Screening Process</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Initial phone call within 5 minutes</li>
                      <li>• BANT qualification questions</li>
                      <li>• Urgency and timeline assessment</li>
                      <li>• Budget range discussion</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Impact</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Improved time efficiency</li>
                      <li>• Higher conversion rates</li>
                      <li>• Better resource allocation</li>
                      <li>• Reduced wasted quotes</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Qualifying Questions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• "What's the nature of the electrical issue?"</li>
                      <li>• "When do you need this completed?"</li>
                      <li>• "What's your budget for this work?"</li>
                      <li>• "Are you the property owner/decision maker?"</li>
                      <li>• "Have you had any quotes already?"</li>
                      <li>• "What's most important to you - price, speed, or quality?"</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Lead Scoring Criteria</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Budget authority: High priority</li>
                      <li>• Urgency level: Time sensitivity</li>
                      <li>• Project size: Revenue potential</li>
                      <li>• Location: Service area coverage</li>
                      <li>• Referral source: Quality indicator</li>
                      <li>• Previous experience: Trust factor</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Qualification Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Qualification rate: 70% target</li>
                      <li>• Time per qualification: 5-10 minutes</li>
                      <li>• Qualified lead conversion: 50%+</li>
                      <li>• Average quote time saved: 2-3 hours</li>
                      <li>• ROI on qualification: 300%+</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="response">
          <MobileAccordionTrigger icon={<Phone className="h-5 w-5 text-purple-400" />}>
            Rapid Response & Initial Contact
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Speed of response is critical - the first electrician to respond professionally wins 50% of all opportunities.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Response Strategy</h4>
                    <p className="text-sm">Implement systems for immediate lead response across all channels to maximise conversion opportunities.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Response Timeline Standards</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Phone calls: Answer within 3 rings</li>
                      <li>• Text messages: Respond within 5 minutes</li>
                      <li>• Emails: Reply within 30 minutes</li>
                      <li>• Web forms: Contact within 15 minutes</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Speed Advantages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• First responder wins 50% of leads</li>
                      <li>• Demonstrates professionalism</li>
                      <li>• Shows commitment to customer service</li>
                      <li>• Reduces competitor opportunity</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Professional Phone Protocol</h4>
                    <ul className="text-sm space-y-1">
                      <li>• "Good morning, [Company Name], this is [Name]"</li>
                      <li>• Active listening with note-taking</li>
                      <li>• Clear, jargon-free explanations</li>
                      <li>• Immediate availability checking</li>
                      <li>• Confirmation of all details</li>
                      <li>• Professional follow-up scheduling</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Response Systems</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Call forwarding to mobile phones</li>
                      <li>• Automated email alerts for web forms</li>
                      <li>• SMS notifications for new leads</li>
                      <li>• Live chat on website</li>
                      <li>• Virtual assistant for after hours</li>
                      <li>• CRM integration for tracking</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Response Impact Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• &lt; 5 min response: 400% higher conversion</li>
                      <li>• Average response time: 2-3 minutes</li>
                      <li>• First contact resolution: 80%+</li>
                      <li>• Appointment booking rate: 70%+</li>
                      <li>• Customer satisfaction: 95%+</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="quoting">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-orange-400" />}>
            Professional Quoting & Pricing Strategy
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Professional quoting separates you from competitors and builds customer confidence in your expertise and pricing structure.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Quoting Strategy</h4>
                    <p className="text-sm">Create detailed, professional quotes that demonstrate value, build trust, and justify your pricing structure.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Quote Development Process</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Site visit within 24-48 hours</li>
                      <li>• Thorough electrical assessment</li>
                      <li>• Photo documentation of work area</li>
                      <li>• Professional quote delivery within 24hrs</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Professional Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Builds customer confidence</li>
                      <li>• Justifies premium pricing</li>
                      <li>• Reduces price objections</li>
                      <li>• Improves conversion rates</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Essential Quote Components</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Detailed scope of work description</li>
                      <li>• Materials list with specifications</li>
                      <li>• Labour costs broken down by task</li>
                      <li>• Clear timeline for completion</li>
                      <li>• Payment terms & schedule</li>
                      <li>• Warranty & guarantee details</li>
                      <li>• Professional company branding</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Pricing Strategy Elements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Competitive rate analysis</li>
                      <li>• Value-based pricing structure</li>
                      <li>• Clear cost breakdown</li>
                      <li>• Optional upgrade pricing</li>
                      <li>• Emergency call-out premiums</li>
                      <li>• Multiple payment options</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Quote Performance Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Quote-to-job conversion: 45-65%</li>
                      <li>• Average quote turnaround: 24 hours</li>
                      <li>• Price objection rate: &lt; 15%</li>
                      <li>• Quote accuracy: 95%+</li>
                      <li>• Follow-up success rate: 30%+</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="conversion">
          <MobileAccordionTrigger icon={<CheckCircle className="h-5 w-5 text-yellow-400" />}>
            Conversion Optimisation & Closing Techniques
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Converting leads to paying customers requires understanding customer psychology, addressing concerns, and presenting compelling value propositions.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Conversion Strategy</h4>
                    <p className="text-sm">Use proven sales psychology and customer relationship techniques to convert qualified leads into loyal customers.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Sales Process Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Initial contact: Establish rapport</li>
                      <li>• Needs assessment: Understand requirements</li>
                      <li>• Solution presentation: Demonstrate value</li>
                      <li>• Objection handling: Address concerns</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Psychological Factors</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Trust & credibility building</li>
                      <li>• Social proof & testimonials</li>
                      <li>• Urgency & scarcity principles</li>
                      <li>• Value demonstration</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Value Propositions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• NICEIC/NAPIT qualified electricians</li>
                      <li>• £2M+ public liability insurance</li>
                      <li>• 12-month guarantee on all work</li>
                      <li>• Emergency 24/7 call-out service</li>
                      <li>• Fixed-price, no hidden costs</li>
                      <li>• Local family business with 5★ reviews</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Common Objection Responses</h4>
                    <ul className="text-sm space-y-1">
                      <li>• "Price too high" → Value & quality focus</li>
                      <li>• "Need to think" → Limited time offers</li>
                      <li>• "Getting other quotes" → Unique benefits</li>
                      <li>• "Budget constraints" → Payment plans</li>
                      <li>• "Timing concerns" → Flexible scheduling</li>
                      <li>• "Previous bad experience" → Guarantees</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Conversion Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Overall lead conversion: 25-40%</li>
                      <li>• Phone lead conversion: 65-85%</li>
                      <li>• Emergency lead conversion: 80-95%</li>
                      <li>• Referral conversion: 70-90%</li>
                      <li>• Average sales cycle: 3-7 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="tracking">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-red-400" />}>
            Lead Tracking & Performance Analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Systematic lead tracking enables data-driven decisions about marketing investment and sales process optimisation.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Tracking Strategy</h4>
                    <p className="text-sm">Implement comprehensive lead tracking to measure ROI, optimise marketing spend, and improve sales processes.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">System Implementation</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: CRM system setup</li>
                      <li>• Week 2: Lead source tracking</li>
                      <li>• Week 3: Conversion funnel mapping</li>
                      <li>• Week 4: Reporting dashboard creation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Intelligence Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Optimise marketing budget allocation</li>
                      <li>• Identify best performing channels</li>
                      <li>• Improve sales process efficiency</li>
                      <li>• Track customer lifetime value</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Essential Tracking Metrics</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Lead source attribution</li>
                      <li>• Cost per lead by channel</li>
                      <li>• Lead-to-customer conversion rate</li>
                      <li>• Average project value by source</li>
                      <li>• Sales cycle length</li>
                      <li>• Customer lifetime value</li>
                      <li>• Return on marketing investment</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Tracking Tools</h4>
                    <ul className="text-sm space-y-1">
                      <li>• CRM systems (HubSpot, Pipedrive)</li>
                      <li>• Call tracking software</li>
                      <li>• Google Analytics & Tag Manager</li>
                      <li>• Lead attribution software</li>
                      <li>• Customer feedback surveys</li>
                      <li>• Sales performance dashboards</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Performance Benchmarks</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Lead response time: &lt; 5 minutes</li>
                      <li>• Qualification rate: 70%+</li>
                      <li>• Quote conversion: 45-65%</li>
                      <li>• Cost per acquisition: £35-85</li>
                      <li>• Customer retention: 80%+</li>
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

export default LeadGenerationTab;