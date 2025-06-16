
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, CreditCard, FileText, Phone } from "lucide-react";

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
      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Legal Recovery Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            When professional recovery methods fail, legal action may be necessary. Choose the 
            appropriate option based on your debt value, evidence quality, and debtor's circumstances.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {legalOptions.map((option, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl text-elec-yellow">{option.option}</CardTitle>
                <div className="text-right">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40 mb-1">
                    {option.cost}
                  </Badge>
                  <div className="text-xs text-muted-foreground">{option.timeframe}</div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{option.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Process</h4>
                <ol className="space-y-1">
                  {option.process.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-elec-yellow mt-1 font-semibold">{stepIndex + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="border-t border-elec-yellow/20 pt-3">
                <Badge variant="outline" className="border-green-500/30 text-green-400">
                  Best for: {option.suitableFor}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
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
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{method.method}</h4>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-blue-400">Cost: </span>
                    <span className="text-muted-foreground">{method.cost}</span>
                  </div>
                  <div>
                    <span className="text-blue-400">Effectiveness: </span>
                    <span className="text-muted-foreground">{method.effectiveness}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Cost Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {costConsiderations.map((consideration, index) => (
              <div key={index} className="border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{consideration.factor}</h4>
                <p className="text-sm text-muted-foreground mb-2">{consideration.details}</p>
                <div className="text-xs">
                  <span className="text-orange-400">Recovery: </span>
                  <span className="text-muted-foreground">{consideration.recovery}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalOptionsTab;
