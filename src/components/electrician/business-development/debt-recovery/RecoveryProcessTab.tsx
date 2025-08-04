
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Phone, Mail, FileText, Clock, TrendingUp, Users, CheckCircle, Target } from "lucide-react";

const RecoveryProcessTab = () => {
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
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Phone className="h-4 w-4" />
        <AlertTitle className="text-blue-300">Professional Recovery Process</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Follow this structured approach to debt recovery. Each step escalates the pressure while 
          maintaining professionalism and legal compliance under UK law.
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-blue-300">65%</p>
                <p className="text-xs text-muted-foreground">Step 1-2 Success</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-2xl font-bold text-elec-yellow">14</p>
                <p className="text-xs text-muted-foreground">Average Days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-green-300">78%</p>
                <p className="text-xs text-muted-foreground">Client Retention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-purple-300">85%</p>
                <p className="text-xs text-muted-foreground">Total Recovery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recovery Process Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            5-Step Recovery Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible className="space-y-2">
            {recoverySteps.map((step, index) => (
              <AccordionItem key={index} value={`step-${index}`} className="border border-border rounded-lg">
                <MobileAccordionTrigger 
                  className="px-4"
                  icon={
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 text-sm font-semibold">
                      {step.step}
                    </div>
                  }
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{step.title}</span>
                    <span className="text-sm text-muted-foreground">{step.timeframe}</span>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="px-4 pb-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-blue-400 font-medium">Methods: </span>
                      <span className="text-muted-foreground">{step.methods.join(", ")}</span>
                    </div>
                    <div>
                      <span className="text-blue-400 font-medium">Tone: </span>
                      <span className="text-muted-foreground">{step.tone}</span>
                    </div>
                    <div>
                      <span className="text-blue-400 font-medium">Objective: </span>
                      <span className="text-muted-foreground">{step.objective}</span>
                    </div>
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Communication Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Communication Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible className="space-y-2">
            {communicationTemplates.map((template, index) => (
              <AccordionItem key={index} value={`template-${index}`} className="border border-border rounded-lg">
                <MobileAccordionTrigger 
                  className="px-4"
                  icon={<Mail className="h-4 w-4" />}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{template.stage}</span>
                    <span className="text-sm text-muted-foreground">{template.subject}</span>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="px-4 pb-4">
                  <div className="bg-muted/50 rounded p-3 text-sm">
                    <div className="mb-2">
                      <span className="font-medium">Subject: </span>
                      <span className="text-muted-foreground">{template.subject}</span>
                    </div>
                    <div className="border-t pt-2">
                      <span className="italic text-muted-foreground">"{template.template}"</span>
                    </div>
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Negotiation Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Negotiation Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible className="space-y-2">
            {negotiationTips.map((tip, index) => (
              <AccordionItem key={index} value={`tip-${index}`} className="border border-border rounded-lg">
                <MobileAccordionTrigger 
                  className="px-4"
                  icon={<CheckCircle className="h-4 w-4" />}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{tip.tip}</span>
                    <span className="text-sm text-muted-foreground">{tip.description}</span>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="px-4 pb-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-green-400 font-medium">Description: </span>
                      <span className="text-muted-foreground">{tip.description}</span>
                    </div>
                    <div>
                      <span className="text-green-400 font-medium">Benefit: </span>
                      <span className="text-muted-foreground">{tip.benefit}</span>
                    </div>
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecoveryProcessTab;
