
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, FileText, Clock } from "lucide-react";

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
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Professional Recovery Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Follow this structured approach to debt recovery. Each step escalates the pressure while 
            maintaining professionalism and legal compliance.
          </p>
          <div className="grid gap-4">
            {recoverySteps.map((step, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-semibold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{step.title}</h4>
                      <Badge variant="outline" className="border-blue-500/30">
                        {step.timeframe}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-blue-400">Methods: </span>
                        <span className="text-muted-foreground">{step.methods.join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-blue-400">Tone: </span>
                        <span className="text-muted-foreground">{step.tone}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-blue-400">Objective: </span>
                      <span className="text-muted-foreground">{step.objective}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Communication Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {communicationTemplates.map((template, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
                    {template.stage}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Subject: {template.subject}</span>
                </div>
                <div className="bg-elec-dark/50 rounded p-3 text-sm text-muted-foreground border border-elec-yellow/10">
                  "{template.template}"
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Negotiation Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {negotiationTips.map((tip, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{tip.tip}</h4>
                <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                <div className="text-xs">
                  <span className="text-green-400">Benefit: </span>
                  <span className="text-muted-foreground">{tip.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecoveryProcessTab;
