
// Enhanced Recovery Process Tab - Comprehensive debt recovery guidance

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Phone, Mail, FileText, Clock, TrendingUp, Users, CheckCircle, Target, Calculator, Award, CreditCard } from "lucide-react";

const RecoveryProcessTab = () => {
  const isMobile = useIsMobile();

  // Key recovery metrics
  const recoveryMetrics = [
    {
      metric: "Early Recovery Success Rate",
      data: "70% recovered in first contact",
      icon: <Phone className="h-5 w-5 text-green-400" />,
      detail: "Professional early contact resolves most payment issues quickly"
    },
    {
      metric: "Average Recovery Timeline", 
      data: "14-30 days structured process",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Systematic approach significantly reduces collection time"
    },
    {
      metric: "Relationship Preservation Rate",
      data: "85% maintain future business",
      icon: <Award className="h-5 w-5 text-purple-400" />,
      detail: "Professional recovery maintains valuable client relationships"
    },
    {
      metric: "Cost Effectiveness vs Legal",
      data: "90% lower than court proceedings",
      icon: <Calculator className="h-5 w-5 text-elec-yellow" />,
      detail: "Early professional intervention saves significant legal costs"
    }
  ];

  const recoverySteps = [
    {
      step: 1,
      title: "Immediate Follow-up Contact",
      timeframe: "Within 7 days of missed payment deadline",
      methods: ["Professional phone call", "Friendly email reminder", "Text message confirmation"],
      tone: "Professional, understanding, and solution-focused",
      objective: "Understand if there's a genuine issue and maintain positive relationship"
    },
    {
      step: 2,
      title: "Formal Payment Reminder",
      timeframe: "7-14 days after initial contact attempt",
      methods: ["Written formal letter", "Professional email follow-up", "Invoice re-submission with terms"],
      tone: "Firmer but still professional and respectful",
      objective: "Establish clear payment deadline and demonstrate seriousness"
    },
    {
      step: 3,
      title: "Direct Discussion & Negotiation",
      timeframe: "14-21 days after original payment due date",
      methods: ["Face-to-face meeting", "Formal phone discussion", "Site visit if appropriate"],
      tone: "Assertive but solution-focused and collaborative",
      objective: "Negotiate realistic payment plan or identify resolution pathway"
    },
    {
      step: 4,
      title: "Final Notice Before Action",
      timeframe: "21-30 days after original due date",
      methods: ["Letter before action", "Recorded delivery formal notice", "Final demand with legal warning"],
      tone: "Formal, serious, but still professional",
      objective: "Final opportunity for payment before legal proceedings commence"
    },
    {
      step: 5,
      title: "Legal Action Commencement",
      timeframe: "30+ days after due date with no response",
      methods: ["Court proceedings initiation", "Professional debt collection agency", "Legal representative engagement"],
      tone: "Formal legal process with professional representation",
      objective: "Recover debt through established legal channels and enforcement"
    }
  ];

  const communicationTemplates = [
    {
      stage: "Initial Payment Reminder",
      subject: "Outstanding Invoice Reminder - [Invoice Number]",
      template: "I hope this message finds you well. I'm writing to remind you that invoice [number] dated [date] for £[amount] is now overdue by [X] days. This may have been overlooked in your busy schedule. Could you please arrange payment at your earliest convenience? If there are any issues or questions regarding this invoice, please don't hesitate to contact me directly. I value our professional relationship and look forward to resolving this promptly."
    },
    {
      stage: "Formal Payment Notice",
      subject: "Formal Notice - Overdue Payment Action Required",
      template: "This is a formal reminder that invoice [number] for £[amount] dated [date] is now [X] days overdue. According to our agreed payment terms, settlement was due on [date]. Please arrange immediate payment to avoid late payment charges of £[amount] plus 8% annual interest being applied to this account. Payment must be received within 7 days of this notice to avoid further action. If you are experiencing difficulties, please contact me immediately to discuss payment arrangements."
    },
    {
      stage: "Final Notice Before Legal Action",
      subject: "FINAL NOTICE - Legal Action Will Commence",
      template: "Despite previous reminders, invoice [number] for £[amount] remains unpaid after [X] days overdue. This constitutes a serious breach of our agreed payment terms. This is your final opportunity to settle this debt before we commence legal proceedings through the County Court. You have 7 days from the date of this notice to make full payment or contact us to arrange an acceptable payment plan. Failure to respond will result in court action being initiated without further notice, which may result in additional costs and County Court Judgments against you."
    }
  ];

  const negotiationTips = [
    {
      tip: "Active Listening & Understanding",
      description: "Thoroughly understand their financial situation, constraints, and genuine ability to pay",
      benefit: "Helps identify realistic payment solutions that work for both parties"
    },
    {
      tip: "Flexible Payment Plan Options",
      description: "Offer structured installment plans that break large amounts into manageable payments",
      benefit: "Significantly increases likelihood of full recovery over time"
    },
    {
      tip: "Comprehensive Documentation",
      description: "Maintain detailed records of all conversations, agreements, and payment commitments",
      benefit: "Provides legal protection and evidence for future enforcement if needed"
    },
    {
      tip: "Clear Deadlines & Accountability",
      description: "Agree specific payment dates and follow-up procedures with consequences for missed payments",
      benefit: "Maintains momentum and demonstrates seriousness about collection"
    },
    {
      tip: "Strategic Partial Settlement",
      description: "Consider accepting reduced lump-sum payments when full recovery seems unlikely",
      benefit: "Avoids lengthy, expensive legal processes while securing immediate payment"
    },
    {
      tip: "Professional Relationship Preservation",
      description: "Keep all discussions solution-focused, respectful, and professionally conducted",
      benefit: "Maintains potential for future business relationships and referrals"
    }
  ];

  const paymentPlanStrategies = [
    {
      strategy: "Weekly Payment Plans",
      suitableFor: "Small debts under £1,000",
      structure: [
        "Maximum 8-week payment plan to maintain momentum",
        "Weekly payments of equal amounts every Friday",
        "First payment due within 7 days of agreement",
        "Late payment triggers immediate full balance demand"
      ],
      benefits: "Quick resolution with regular payment habit formation"
    },
    {
      strategy: "Monthly Installment Agreements",
      suitableFor: "Medium debts £1,000-£5,000",
      structure: [
        "Maximum 6-month payment schedule with 10% deposit",
        "Equal monthly payments on same date each month",
        "Include 5% annual interest on outstanding balance",
        "Immediate acceleration clause for missed payments"
      ],
      benefits: "Manageable for clients while ensuring reasonable recovery timeframe"
    },
    {
      strategy: "Milestone-Based Recovery",
      suitableFor: "Large debts over £5,000",
      structure: [
        "Staged payments tied to debtor's cash flow cycles",
        "Larger payments quarterly or based on business income",
        "Include security or guarantees for significant amounts",
        "Regular review meetings to assess payment capability"
      ],
      benefits: "Aligns with debtor's ability to pay while securing larger amounts"
    }
  ];

  const documentationRequirements = [
    {
      category: "Initial Contact Records",
      requirements: [
        "Date, time, method of contact, and person spoken to",
        "Summary of conversation including client's response and explanations",
        "Any commitments made by client regarding payment timeline",
        "Follow-up actions agreed and deadlines established"
      ]
    },
    {
      category: "Payment Plan Documentation",
      requirements: [
        "Written payment plan agreement signed by both parties",
        "Clear payment schedule with dates, amounts, and methods",
        "Consequences for missed payments and acceleration clauses",
        "Contact details and preferred communication methods"
      ]
    },
    {
      category: "Legal Preparation Records",
      requirements: [
        "All correspondence including emails, letters, and text messages",
        "Proof of delivery for formal notices and final demands",
        "Evidence of work completed and invoices issued",
        "Any admissions of debt or partial payments received"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Phone className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          A structured professional recovery process increases collection rates by 300% while preserving valuable business relationships.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {recoveryMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="recovery-process">
          <MobileAccordionTrigger icon={<Phone className="h-5 w-5 text-blue-400" />}>
            5-Step Professional Recovery Process
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {recoverySteps.map((step, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 text-sm font-semibold">
                          {step.step}
                        </div>
                        <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{step.title}</h4>
                      </div>
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {step.timeframe}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Methods & Approach</h5>
                    <div className="space-y-2">
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-start gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                        <div><strong>Methods:</strong> {step.methods.join(", ")}</div>
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-start gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                        <div><strong>Communication Tone:</strong> {step.tone}</div>
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-start gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                        <div><strong>Primary Objective:</strong> {step.objective}</div>
                      </div>
                    </div>
                  </div>

                  {index < recoverySteps.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="communication-templates">
          <MobileAccordionTrigger icon={<Mail className="h-5 w-5 text-green-400" />}>
            Professional Communication Templates
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {communicationTemplates.map((template, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{template.stage}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Subject: {template.subject}</p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Template Message</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 italic leading-relaxed`}>"{template.template}"</p>
                  </div>

                  {index < communicationTemplates.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="payment-plans">
          <MobileAccordionTrigger icon={<CreditCard className="h-5 w-5 text-purple-400" />}>
            Payment Plan Strategies & Structures
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {paymentPlanStrategies.map((strategy, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.strategy}</h4>
                      <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {strategy.suitableFor}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Payment Structure</h5>
                    <ul className="space-y-1">
                      {strategy.structure.map((item, itemIndex) => (
                        <li key={itemIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-start gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Benefits</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{strategy.benefits}</p>
                  </div>

                  {index < paymentPlanStrategies.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="negotiation-tips">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-orange-400" />}>
            Negotiation Best Practices & Techniques
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {negotiationTips.map((tip, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{tip.tip}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{tip.description}</p>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
                    <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Benefit</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{tip.benefit}</p>
                  </div>

                  {index < negotiationTips.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="documentation">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-amber-400" />}>
            Documentation & Record Keeping Requirements
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {documentationRequirements.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-amber-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  
                  <div>
                    <h5 className={`font-medium text-amber-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Essential Records</h5>
                    <ul className="space-y-2">
                      {category.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 p-2 bg-amber-500/5 border border-amber-500/20 rounded flex items-start gap-2`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {index < documentationRequirements.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default RecoveryProcessTab;
