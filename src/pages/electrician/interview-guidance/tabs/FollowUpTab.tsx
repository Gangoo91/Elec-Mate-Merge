import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { 
  HandHeart, 
  Mail, 
  Phone, 
  Calendar, 
  PoundSterling,
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
  Target,
  MessageSquare
} from "lucide-react";

export default function FollowUpTab() {
  const followUpTimeline = [
    {
      timeframe: "Within 24 Hours",
      actions: [
        "Send thank you email to all interviewers",
        "Connect on LinkedIn with appropriate message",
        "Reflect on interview and note key points discussed",
        "Prepare for potential follow-up questions or assessments"
      ],
      emailTemplate: "Thank you for taking the time to interview me for the [Position] role. I was particularly excited to learn about [specific project/aspect discussed]. I look forward to the next steps in the process."
    },
    {
      timeframe: "1 Week After",
      actions: [
        "Follow up if no response received",
        "Reiterate interest and enthusiasm",
        "Provide any additional information requested",
        "Ask about timeline for decision making"
      ],
      emailTemplate: "I wanted to follow up on my interview for the [Position] role. I remain very interested in the opportunity and wanted to check on the status of the selection process."
    },
    {
      timeframe: "2 Weeks After",
      actions: [
        "Send final polite follow-up",
        "Express continued interest",
        "Ask for feedback if position filled",
        "Maintain professional relationship for future opportunities"
      ],
      emailTemplate: "I understand these decisions take time, but I wanted to express my continued strong interest in the [Position] role and inquire about the timeline for the selection process."
    }
  ];

  const negotiationAreas = [
    {
      area: "Salary & Compensation",
      icon: <PoundSterling className="h-5 w-5" />,
      strategies: [
        "Research industry standards for your experience level and location",
        "Consider total compensation package, not just base salary",
        "Factor in benefits, pension, training opportunities, and progression",
        "Present salary expectations as a range based on market research",
        "Be prepared to justify requests with your value proposition"
      ],
      ukSpecifics: [
        "Know current market rates: £25k-£45k+ depending on experience",
        "Consider regional variations (London vs other areas)",
        "Understand apprenticeship rates vs qualified electrician rates",
        "Factor in overtime opportunities and call-out rates"
      ]
    },
    {
      area: "Working Conditions",
      icon: <Clock className="h-5 w-5" />,
      strategies: [
        "Discuss working hours and flexibility requirements",
        "Clarify travel expectations and mileage/time compensation",
        "Understand overtime policies and rates",
        "Discuss health and safety standards and expectations",
        "Clarify tool provision and uniform/PPE policies"
      ],
      ukSpecifics: [
        "Working Time Regulations - maximum 48-hour week",
        "Statutory holiday entitlement (28 days minimum)",
        "Night work regulations and restrictions",
        "Call-out arrangements and compensation"
      ]
    },
    {
      area: "Career Development",
      icon: <Target className="h-5 w-5" />,
      strategies: [
        "Discuss training opportunities and professional development",
        "Understand promotion pathways and timeframes",
        "Clarify support for additional qualifications",
        "Ask about mentoring and skills development programs",
        "Discuss potential for specialisation or leadership roles"
      ],
      ukSpecifics: [
        "18th Edition updates and ongoing training",
        "Support for HNC/HND or degree qualifications",
        "Progression to supervisory or management roles",
        "Specialist training (e.g., renewable energy, smart systems)"
      ]
    }
  ];

  const offerEvaluation = [
    {
      category: "Financial Package",
      considerations: [
        "Base salary compared to market rates",
        "Overtime rates and availability",
        "Pension scheme and employer contributions",
        "Company car or travel allowances",
        "Performance bonuses or profit sharing"
      ]
    },
    {
      category: "Work-Life Balance",
      considerations: [
        "Standard working hours and flexibility",
        "Holiday entitlement and booking flexibility",
        "Call-out requirements and frequency",
        "Work location and travel requirements",
        "Support for family commitments"
      ]
    },
    {
      category: "Career Growth",
      considerations: [
        "Training budget and development opportunities",
        "Clear progression pathways",
        "Exposure to varied projects and technologies",
        "Mentoring and support systems",
        "Company stability and growth prospects"
      ]
    }
  ];

  const negotiationDos = [
    "Research market rates thoroughly before any salary discussion",
    "Express enthusiasm for the role before discussing terms",
    "Focus on mutual benefit and value you bring",
    "Be reasonable and justify requests with data",
    "Consider the whole package, not just salary",
    "Maintain professional tone throughout"
  ];

  const negotiationDonts = [
    "Make demands or issue ultimatums",
    "Negotiate without research or justification",
    "Focus solely on what you want without considering employer needs",
    "Accept immediately - take time to consider offers properly",
    "Burn bridges if terms can't be agreed",
    "Negotiate every single point - pick your priorities"
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-4">
            <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">24 Hours</div>
            <div className="text-sm text-muted-foreground">Thank you email</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">1-2 Weeks</div>
            <div className="text-sm text-muted-foreground">Decision timeline</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <PoundSterling className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">£25k-£45k</div>
            <div className="text-sm text-muted-foreground">UK salary range</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">80%</div>
            <div className="text-sm text-muted-foreground">Follow-up success</div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Timing Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Critical:</strong> Follow-up within 24 hours shows professionalism and genuine interest. 
          However, balance persistence with patience - respect their decision-making timeline.
        </AlertDescription>
      </Alert>

      {/* Follow-Up Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Post-Interview Follow-Up Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {followUpTimeline.map((phase, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h4 className="font-medium">{phase.timeframe}</h4>
                </div>
                
                <div className="ml-11 space-y-3">
                  <ul className="space-y-1">
                    {phase.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-muted/50 p-3 rounded border-l-4 border-primary">
                    <p className="text-sm"><strong>Email Template:</strong></p>
                    <p className="text-sm italic mt-1">"{phase.emailTemplate}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Negotiation Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandHeart className="h-5 w-5 text-primary" />
            Salary & Terms Negotiation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible defaultValue="salary">
            {negotiationAreas.map((area, index) => (
              <AccordionItem key={index} value={area.area.toLowerCase().replace(/\s+/g, '-')}>
                <MobileAccordionTrigger icon={area.icon}>
                  {area.area}
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2">General Strategies</h5>
                      <ul className="space-y-1">
                        {area.strategies.map((strategy, strategyIndex) => (
                          <li key={strategyIndex} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-sm mb-2">UK-Specific Considerations</h5>
                      <ul className="space-y-1">
                        {area.ukSpecifics.map((specific, specificIndex) => (
                          <li key={specificIndex} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            {specific}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Offer Evaluation Framework */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Evaluating Job Offers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {offerEvaluation.map((category, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">{category.category}</h4>
                <ul className="space-y-2">
                  {category.considerations.map((consideration, consIndex) => (
                    <li key={consIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Negotiation Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircle className="h-5 w-5" />
              Negotiation Do's
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {negotiationDos.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertCircle className="h-5 w-5" />
              Negotiation Don'ts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {negotiationDonts.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="h-3 w-3 bg-red-500 rounded-full mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Communication Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Professional Communication Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Salary Negotiation</h4>
              <div className="bg-muted/50 p-3 rounded text-sm">
                <p className="italic">
                  "Based on my research of market rates for electricians with [X years] experience in [location], 
                  and considering the value I can bring through [specific skills/qualifications], 
                  I was hoping we could discuss a salary in the range of £[X-Y]k."
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Request for Time</h4>
              <div className="bg-muted/50 p-3 rounded text-sm">
                <p className="italic">
                  "Thank you for the offer. I'm very excited about the opportunity. 
                  Could I have [2-3 days] to review the details and get back to you? 
                  I want to make sure I can give this the consideration it deserves."
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Declining an Offer Professionally</h4>
            <div className="bg-muted/50 p-3 rounded text-sm">
              <p className="italic">
                "Thank you for offering me the [Position] role. After careful consideration, 
                I've decided that this opportunity isn't the right fit for me at this time. 
                I appreciate the time you invested in the interview process and wish you all the best in finding the right candidate."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}