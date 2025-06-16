
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoundSterling, FileText, Shield, AlertTriangle } from "lucide-react";

const VATComplianceTab = () => {
  const vatThresholds = [
    {
      threshold: "£85,000",
      description: "Mandatory VAT registration threshold",
      requirement: "Must register within 30 days of exceeding",
      implications: "Add 20% VAT to invoices, quarterly returns required"
    },
    {
      threshold: "£83,000",
      description: "Deregistration threshold",
      requirement: "Can deregister if turnover falls below",
      implications: "Continue monitoring for 12 months"
    },
    {
      threshold: "Any amount",
      description: "Voluntary registration",
      requirement: "Can register at any turnover level",
      implications: "Useful for claiming VAT on expenses"
    }
  ];

  const cisRequirements = [
    {
      scenario: "Working as Subcontractor",
      description: "When you work for larger electrical contractors",
      requirements: [
        "Register with HMRC for CIS",
        "Provide UTR and business details",
        "Contractor deducts 20% tax (or 30% if not registered)",
        "Receive monthly CIS statements",
        "Include deductions in Self Assessment"
      ]
    },
    {
      scenario: "Working as Contractor",
      description: "When you employ subcontractors",
      requirements: [
        "Verify subcontractors with HMRC",
        "Deduct tax at correct rate (0%, 20%, or 30%)",
        "Submit monthly CIS returns",
        "Provide monthly statements to subcontractors",
        "Pay deducted tax to HMRC"
      ]
    }
  ];

  const ir35Rules = [
    {
      factor: "Control",
      lowRisk: "You decide how, when, and where to work",
      mediumRisk: "Some client direction on working methods",
      highRisk: "Client controls your work like an employee"
    },
    {
      factor: "Substitution",
      lowRisk: "You can send someone else to do the work",
      mediumRisk: "Limited ability to substitute",
      highRisk: "You must personally do the work"
    },
    {
      factor: "Financial Risk",
      lowRisk: "You bear risk of losses and provide equipment",
      mediumRisk: "Some financial risk",
      highRisk: "Guaranteed payment with no financial risk"
    },
    {
      factor: "Part and Parcel",
      lowRisk: "Clearly separate from client's organisation",
      mediumRisk: "Some integration with client",
      highRisk: "Treated like an employee by client"
    }
  ];

  const complianceTips = [
    {
      area: "Record Keeping",
      tip: "Keep all records for at least 6 years",
      details: "Include VAT receipts, invoices, bank statements, and CIS statements"
    },
    {
      area: "VAT Returns",
      tip: "Submit quarterly returns by deadline",
      details: "Usually due one month and seven days after quarter end"
    },
    {
      area: "CIS Verification",
      tip: "Verify all subcontractors before first payment",
      details: "Use HMRC's online verification service or phone line"
    },
    {
      area: "IR35 Assessment",
      tip: "Regularly review working arrangements",
      details: "Use HMRC's Check Employment Status tool for guidance"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Critical Compliance Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            HMRC compliance is mandatory for electrical contractors. Failure to meet these requirements 
            can result in penalties, interest charges, and legal consequences.
          </p>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            VAT Registration Thresholds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {vatThresholds.map((vat, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{vat.threshold}</h4>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
                    {vat.description}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-elec-yellow">Requirement: </span>
                    <span className="text-muted-foreground">{vat.requirement}</span>
                  </div>
                  <div>
                    <span className="text-elec-yellow">Implications: </span>
                    <span className="text-muted-foreground">{vat.implications}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Construction Industry Scheme (CIS)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {cisRequirements.map((cis, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{cis.scenario}</h4>
                <p className="text-sm text-muted-foreground mb-3">{cis.description}</p>
                <ul className="space-y-1">
                  {cis.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-blue-400 mt-1">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            IR35 Off-Payroll Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            IR35 determines whether you're truly self-employed or should be treated as an employee for tax purposes. 
            Assess these key factors for each contract:
          </p>
          <div className="grid gap-4">
            {ir35Rules.map((rule, index) => (
              <div key={index} className="border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{rule.factor}</h4>
                <div className="grid md:grid-cols-3 gap-2 text-xs">
                  <div className="border border-green-500/30 rounded p-2">
                    <Badge variant="outline" className="border-green-500/30 text-green-400 mb-1">Low Risk</Badge>
                    <p className="text-muted-foreground">{rule.lowRisk}</p>
                  </div>
                  <div className="border border-yellow-500/30 rounded p-2">
                    <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 mb-1">Medium Risk</Badge>
                    <p className="text-muted-foreground">{rule.mediumRisk}</p>
                  </div>
                  <div className="border border-red-500/30 rounded p-2">
                    <Badge variant="outline" className="border-red-500/30 text-red-400 mb-1">High Risk</Badge>
                    <p className="text-muted-foreground">{rule.highRisk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">Compliance Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {complianceTips.map((tip, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-500/30">
                    {tip.area}
                  </Badge>
                </div>
                <h4 className="font-semibold text-white">{tip.tip}</h4>
                <p className="text-sm text-muted-foreground">{tip.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VATComplianceTab;
