
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoundSterling, FileText, Calculator, AlertTriangle } from "lucide-react";

const VATComplianceTab = () => {
  const vatThresholds = [
    {
      threshold: "£90,000",
      description: "VAT registration threshold (2024/25)",
      requirement: "Must register within 30 days of exceeding threshold",
      impact: "Mandatory VAT registration and quarterly returns"
    },
    {
      threshold: "£88,000",
      description: "VAT deregistration threshold (2024/25)",
      requirement: "Can deregister if turnover falls below this level",
      impact: "Optional deregistration to simplify administration"
    }
  ];

  const vatSchemes = [
    {
      scheme: "Standard VAT",
      rate: "20%",
      description: "Charge VAT on all taxable supplies, reclaim VAT on purchases",
      suitability: "Most electrical contractors",
      advantages: [
        "Can reclaim all VAT on business purchases",
        "Standard approach expected by most clients",
        "Full input tax recovery on equipment and materials",
        "No restrictions on types of supplies"
      ],
      disadvantages: [
        "Additional administrative burden",
        "Cash flow impact of VAT payments",
        "Quarterly return deadlines to meet",
        "Need to maintain detailed VAT records"
      ]
    },
    {
      scheme: "Flat Rate Scheme",
      rate: "12.5%*",
      description: "Pay a fixed percentage of turnover, limited VAT reclaim",
      suitability: "Businesses with low input VAT",
      advantages: [
        "Simplified VAT calculations",
        "Reduced administrative burden",
        "Potential cash flow benefits",
        "Less detailed record keeping required"
      ],
      disadvantages: [
        "Cannot reclaim VAT on most purchases",
        "Higher rate for first year (13.5%)",
        "Annual turnover limit of £230,000",
        "Less beneficial with high equipment costs"
      ]
    }
  ];

  const vatRecords = [
    {
      record: "Sales Records",
      requirements: [
        "VAT invoices for all VAT-registered customers",
        "Sales receipts for cash transactions",
        "Record of all supplies made",
        "Customer details and invoice numbers"
      ]
    },
    {
      record: "Purchase Records",
      requirements: [
        "VAT receipts for all business purchases",
        "Supplier invoices and delivery notes",
        "Vehicle and fuel purchase records",
        "Equipment and materials documentation"
      ]
    },
    {
      record: "VAT Account",
      requirements: [
        "Summary of VAT charged on sales",
        "Summary of VAT paid on purchases",
        "Net VAT calculation for each period",
        "Record of VAT payments made to HMRC"
      ]
    }
  ];

  const constructionIndustryScheme = [
    {
      aspect: "CIS Overview",
      description: "Special tax deduction scheme for construction industry",
      details: [
        "Clients deduct 20% tax from payments (0% if you have gross payment status)",
        "Deductions count towards your income tax bill",
        "Must register as subcontractor if working for CIS contractors",
        "Separate from VAT - both may apply to same work"
      ]
    },
    {
      aspect: "VAT and CIS Interaction",
      description: "How VAT and CIS work together on construction projects",
      details: [
        "VAT charged on gross amount before CIS deduction",
        "CIS deduction taken from VAT-inclusive amount",
        "Need to account for both on invoices",
        "Different payment timings for VAT and CIS"
      ]
    },
    {
      aspect: "Domestic Installation",
      description: "Reduced VAT rates for domestic electrical work",
      details: [
        "5% VAT on installation of energy-saving materials",
        "20% VAT on most other domestic electrical work",
        "Careful categorisation required",
        "Documentation needed to support reduced rates"
      ]
    }
  ];

  const complianceTips = [
    {
      tip: "Regular Reconciliation",
      description: "Reconcile VAT account monthly to avoid year-end surprises",
      priority: "High"
    },
    {
      tip: "Digital Records",
      description: "Use Making Tax Digital compliant software from April 2024",
      priority: "Critical"
    },
    {
      tip: "Invoice Requirements",
      description: "Ensure all VAT invoices meet HMRC requirements",
      priority: "Critical"
    },
    {
      tip: "Deadline Management",
      description: "Submit returns and pay VAT by the due date to avoid penalties",
      priority: "Critical"
    },
    {
      tip: "Professional Advice",
      description: "Get specialist advice for complex VAT situations",
      priority: "Medium"
    },
    {
      tip: "Regular Reviews",
      description: "Review VAT scheme annually to ensure it remains optimal",
      priority: "Medium"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2 text-lg md:text-xl">
            <PoundSterling className="h-5 w-5" />
            VAT & HMRC Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
            Understanding VAT obligations is crucial for electrical contractors. Proper compliance 
            avoids penalties and can provide cash flow advantages when managed effectively.
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2 text-lg md:text-xl">
            <AlertTriangle className="h-5 w-5" />
            VAT Thresholds 2024/25
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vatThresholds.map((threshold, index) => (
              <div key={index} className="p-4 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  <Badge variant="outline" className="border-red-500/50 text-red-300 shrink-0 text-lg font-bold">
                    {threshold.threshold}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{threshold.description}</h4>
                    <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{threshold.requirement}</p>
                    <p className="text-sm text-red-300 leading-relaxed">{threshold.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {vatSchemes.map((scheme, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
                  <Calculator className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                    <CardTitle className="text-lg md:text-xl text-elec-yellow leading-tight">
                      {scheme.scheme}
                    </CardTitle>
                    <div className="flex flex-col md:items-end gap-1">
                      <Badge variant="outline" className="border-elec-yellow/30 shrink-0 text-lg font-bold">
                        {scheme.rate}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{scheme.suitability}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{scheme.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                  <ul className="space-y-1">
                    {scheme.advantages.map((advantage, advantageIndex) => (
                      <li key={advantageIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-green-400 mt-1 shrink-0">•</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Disadvantages</h4>
                  <ul className="space-y-1">
                    {scheme.disadvantages.map((disadvantage, disadvantageIndex) => (
                      <li key={disadvantageIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-red-400 mt-1 shrink-0">•</span>
                        <span>{disadvantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg md:text-xl">
            <FileText className="h-5 w-5" />
            Record Keeping Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {vatRecords.map((record, index) => (
              <div key={index} className="p-4 border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-green-200 mb-3">{record.record}</h4>
                <ul className="space-y-2">
                  {record.requirements.map((requirement, requirementIndex) => (
                    <li key={requirementIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-green-400 mt-1 shrink-0">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2 text-lg md:text-xl">
            <AlertTriangle className="h-5 w-5" />
            Construction Industry Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {constructionIndustryScheme.map((item, index) => (
              <div key={index} className="border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-200 mb-2">{item.aspect}</h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                <ul className="space-y-1">
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-orange-400 mt-1 shrink-0">•</span>
                      <span>{detail}</span>
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
          <CardTitle className="text-purple-300 text-lg md:text-xl">VAT Compliance Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {complianceTips.map((tip, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge 
                    variant="outline" 
                    className={`border-purple-500/30 shrink-0 ${
                      tip.priority === 'Critical' ? 'text-red-400' :
                      tip.priority === 'High' ? 'text-orange-400' :
                      'text-purple-400'
                    }`}
                  >
                    {tip.priority}
                  </Badge>
                  <h4 className="font-semibold text-white leading-tight">{tip.tip}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VATComplianceTab;
