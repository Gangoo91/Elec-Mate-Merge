
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Phone, Mail, FileText, Clock, TrendingUp, Users, CheckCircle, Target, Calculator, Award } from "lucide-react";

const RecoveryProcessTab = () => {
  const isMobile = useIsMobile();

  // Key recovery metrics
  const recoveryMetrics = [
    {
      metric: "Success Rate Step 1-2",
      data: "70% recovered early",
      icon: <Phone className="h-5 w-5 text-green-400" />,
      detail: "Friendly contact resolves most issues quickly"
    },
    {
      metric: "Average Recovery Time", 
      data: "14-30 days process",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Structured approach reduces delays"
    },
    {
      metric: "Professional Success",
      data: "85% without legal action",
      icon: <Award className="h-5 w-5 text-purple-400" />,
      detail: "Maintaining relationships while recovering debts"
    },
    {
      metric: "Cost Effectiveness",
      data: "90% less than legal costs",
      icon: <Calculator className="h-5 w-5 text-elec-yellow" />,
      detail: "Early intervention saves significant money"
    }
  ];

  const recoverySteps = [
    {
      step: 1,
      title: "Immediate Follow-up",
      timeframe: "Within 7 days of missed payment",
      methods: ["Polite phone call", "Friendly email reminder", "Text message"],
      tone: "Professional and understanding",
      objective: "Understand if there's a genuine issue"
    },
    {
      step: 2,
      title: "Formal Reminder",
      timeframe: "7-14 days after first contact",
      methods: ["Written letter", "Formal email", "Invoice re-send"],
      tone: "Firmer but still professional",
      objective: "Establish clear payment deadline"
    },
    {
      step: 3,
      title: "Phone Discussion",
      timeframe: "14-21 days after initial due date",
      methods: ["Direct phone conversation", "Site visit if appropriate"],
      tone: "Assertive but solution-focused",
      objective: "Negotiate payment plan or resolution"
    },
    {
      step: 4,
      title: "Final Notice",
      timeframe: "21-30 days after due date",
      methods: ["Letter before action", "Recorded delivery letter"],
      tone: "Formal and serious",
      objective: "Final opportunity before legal action"
    },
    {
      step: 5,
      title: "Legal Action",
      timeframe: "30+ days after due date",
      methods: ["Court proceedings", "Debt collection agency"],
      tone: "Legal and formal",
      objective: "Recover debt through legal channels"
    }
  ];

  const communicationTemplates = [
    {
      stage: "Initial Reminder",
      subject: "Outstanding Invoice Reminder",
      template: "I hope this finds you well. I'm writing to remind you that invoice [number] dated [date] for £[amount] is now overdue. Perhaps this has been overlooked in your busy schedule. Could you please arrange payment at your earliest convenience? If there are any issues, please don't hesitate to contact me."
    },
    {
      stage: "Formal Notice",
      subject: "Overdue Payment - Action Required",
      template: "This is a formal reminder that invoice [number] for £[amount] is now [X] days overdue. According to our agreed terms, payment was due on [date]. Please arrange immediate payment to avoid late payment charges of £[amount] being applied. Payment must be received within 7 days of this notice."
    },
    {
      stage: "Final Warning",
      subject: "Final Notice Before Legal Action",
      template: "Despite previous reminders, invoice [number] for £[amount] remains unpaid after [X] days. This is your final opportunity to settle this debt before we commence legal proceedings. You have 7 days to make full payment or contact us to arrange an acceptable payment plan. Failure to respond will result in court action without further notice."
    }
  ];

  const negotiationTips = [
    {
      tip: "Listen to Their Position",
      description: "Understand their cash flow situation and constraints",
      benefit: "Helps identify realistic payment solutions"
    },
    {
      tip: "Offer Payment Plans",
      description: "Break large amounts into manageable instalments",
      benefit: "Increases likelihood of recovery"
    },
    {
      tip: "Document Everything",
      description: "Keep records of all conversations and agreements",
      benefit: "Protects you legally and professionally"
    },
    {
      tip: "Set Clear Deadlines",
      description: "Agree specific dates for payments and stick to them",
      benefit: "Maintains momentum and accountability"
    },
    {
      tip: "Consider Partial Settlement",
      description: "Sometimes accepting less immediately is better than nothing",
      benefit: "Avoids lengthy legal processes"
    },
    {
      tip: "Maintain Relationships",
      description: "Keep discussions professional and solution-focused",
      benefit: "Preserves potential for future business"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Phone className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          A structured recovery process increases collection rates by 300% while preserving professional relationships.
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
            5-Step Recovery Process
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {recoverySteps.map((step, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
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
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        <strong>Methods:</strong> {step.methods.join(", ")}
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        <strong>Tone:</strong> {step.tone}
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        <strong>Objective:</strong> {step.objective}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="communication-templates">
          <MobileAccordionTrigger icon={<Mail className="h-5 w-5 text-green-400" />}>
            Communication Templates & Scripts
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {communicationTemplates.map((template, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{template.stage}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Subject: {template.subject}</p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Template Message</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 italic`}>"{template.template}"</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="negotiation-tips">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-purple-400" />}>
            Negotiation Best Practices
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {negotiationTips.map((tip, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{tip.tip}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{tip.description}</p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Benefit</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{tip.benefit}</p>
                  </div>
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
