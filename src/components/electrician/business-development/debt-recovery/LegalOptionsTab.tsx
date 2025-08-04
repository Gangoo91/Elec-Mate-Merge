
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Scale, CreditCard, FileText, Phone, TrendingUp, Clock, Target, CheckCircle } from "lucide-react";

const LegalOptionsTab = () => {
  const legalOptions = [
    {
      option: "Money Claim Online",
      cost: "£35-£770 (based on claim value)",
      timeframe: "4-6 weeks for judgment",
      description: "HMRC's online service for debt recovery up to £100,000",
      process: [
        "Submit claim online with details and evidence",
        "Defendant has 14 days to respond",
        "If no response, judgment granted automatically",
        "If disputed, case may go to court hearing",
        "Judgment allows enforcement action"
      ],
      suitableFor: "Straightforward debts with clear documentation"
    },
    {
      option: "Small Claims Court",
      cost: "£35-£770 plus hearing fees",
      timeframe: "2-6 months depending on complexity",
      description: "Court proceedings for claims up to £10,000",
      process: [
        "File claim form N1 with court",
        "Serve papers on defendant",
        "Attend preliminary hearing if required",
        "Present case at final hearing",
        "Judge makes decision on liability and costs"
      ],
      suitableFor: "Disputed debts requiring evidence presentation"
    },
    {
      option: "High Court Enforcement",
      cost: "£66-£600 plus percentage of debt",
      timeframe: "2-4 weeks after judgment",
      description: "Transfer County Court judgment to High Court for enforcement",
      process: [
        "Apply to transfer judgment to High Court",
        "High Court Enforcement Officers attend debtor",
        "Can remove goods to value of debt",
        "Often more effective than bailiffs",
        "Higher recovery rates than County Court"
      ],
      suitableFor: "Judgments over £600 where debtor has assets"
    },
    {
      option: "Statutory Demand",
      cost: "£154 court fee",
      timeframe: "21 days for payment or challenge",
      description: "Formal demand for payment threatening bankruptcy/liquidation",
      process: [
        "Serve statutory demand on debtor",
        "Debtor has 21 days to pay or challenge",
        "If no response, can petition for bankruptcy",
        "Often prompts immediate payment",
        "Serious consequences for debtor's credit"
      ],
      suitableFor: "Debts over £750 where other methods failed"
    }
  ];

  const enforcementMethods = [
    {
      method: "Warrant of Execution",
      description: "Bailiffs seize and sell debtor's goods",
      cost: "£110 plus bailiff fees",
      effectiveness: "Moderate - depends on debtor's assets"
    },
    {
      method: "Attachment of Earnings",
      description: "Deductions taken directly from debtor's salary",
      cost: "£110 application fee",
      effectiveness: "High for employed debtors"
    },
    {
      method: "Third Party Debt Order",
      description: "Freeze and recover money from debtor's bank account",
      cost: "£110 application fee",
      effectiveness: "High if debtor has bank funds"
    },
    {
      method: "Charging Order",
      description: "Place legal charge on debtor's property",
      cost: "£110 application fee",
      effectiveness: "Long-term security for substantial debts"
    }
  ];

  const costConsiderations = [
    {
      factor: "Court Fees",
      details: "Based on claim value - £35 for claims up to £300, scaling up to £770 for £50,000+",
      recovery: "Usually recoverable from losing party"
    },
    {
      factor: "Legal Costs",
      details: "Solicitor fees typically £150-£600 per hour depending on location and complexity",
      recovery: "Limited recovery in small claims track"
    },
    {
      factor: "Enforcement Costs",
      details: "Additional fees for bailiffs, High Court enforcement, or other collection methods",
      recovery: "Usually added to the debt amount"
    },
    {
      factor: "Time Investment",
      details: "Court proceedings require significant time for preparation and attendance",
      recovery: "Consider opportunity cost of time spent"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert className="border-purple-500/50 bg-purple-500/10">
        <Scale className="h-4 w-4" />
        <AlertTitle className="text-purple-300">Legal Recovery Options</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          When professional recovery methods fail, legal action may be necessary. Choose the 
          appropriate option based on your debt value, evidence quality, and debtor's circumstances.
        </AlertDescription>
      </Alert>


      {/* Legal Options Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Legal Recovery Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible className="w-full">
            {legalOptions.map((option, index) => (
              <AccordionItem key={index} value={`legal-${index}`}>
                <MobileAccordionTrigger icon={<Scale className="h-4 w-4" />}>
                  <div className="text-left flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{option.option}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge variant="outline" className="border-primary/30 text-primary mb-1">
                          {option.cost}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{option.timeframe}</div>
                      </div>
                    </div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Process</h4>
                      <ol className="space-y-2">
                        {option.process.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                            <span className="text-primary mt-1 font-semibold">{stepIndex + 1}.</span>
                            <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="border-t border-border pt-3">
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        Best for: {option.suitableFor}
                      </Badge>
                    </div>
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Enforcement Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Enforcement Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            After obtaining a court judgment, these enforcement methods can help recover your debt:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {enforcementMethods.map((method, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">{method.method}</h4>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-primary">Cost: </span>
                    <span className="text-muted-foreground">{method.cost}</span>
                  </div>
                  <div>
                    <span className="text-primary">Effectiveness: </span>
                    <span className="text-muted-foreground">{method.effectiveness}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Considerations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Cost Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="multiple" className="w-full">
            {costConsiderations.map((consideration, index) => (
              <AccordionItem key={index} value={`cost-${index}`}>
                <MobileAccordionTrigger icon={<FileText className="h-4 w-4" />}>
                  <div className="text-left">
                    <div className="font-semibold">{consideration.factor}</div>
                    <div className="text-sm text-muted-foreground">{consideration.details}</div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="pt-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <span className="text-primary font-medium">Recovery: </span>
                      <span className="text-muted-foreground">{consideration.recovery}</span>
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

export default LegalOptionsTab;
