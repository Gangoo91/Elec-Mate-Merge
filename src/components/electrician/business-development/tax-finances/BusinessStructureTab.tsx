
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Building, Users, CreditCard } from "lucide-react";

const BusinessStructureTab = () => {
  const businessTypes = [
    {
      type: "Sole Trader",
      icon: <FileText className="h-5 w-5" />,
      description: "Simplest business structure for individual electricians",
      pros: [
        "Easy to set up and manage",
        "Complete control over business decisions",
        "All profits belong to you",
        "Simple tax obligations"
      ],
      cons: [
        "Unlimited personal liability",
        "Harder to raise capital",
        "Business ends if you become unable to work",
        "May pay more tax as profits increase"
      ],
      taxImplications: [
        "Pay income tax on profits",
        "Class 2 and Class 4 National Insurance",
        "Self Assessment tax return required",
        "Can claim business expenses"
      ]
    },
    {
      type: "Limited Company",
      icon: <Building className="h-5 w-5" />,
      description: "Separate legal entity providing liability protection",
      pros: [
        "Limited personal liability",
        "More tax-efficient for higher profits",
        "Professional credibility",
        "Easier to raise investment"
      ],
      cons: [
        "More complex administration",
        "Annual filing requirements",
        "Directors' responsibilities",
        "Less flexibility with money"
      ],
      taxImplications: [
        "Corporation tax on company profits (19-25%)",
        "PAYE and National Insurance on salary",
        "Dividend tax on profit distributions",
        "Annual accounts and CT600 required"
      ]
    },
    {
      type: "Partnership",
      icon: <Users className="h-5 w-5" />,
      description: "Two or more people running a business together",
      pros: [
        "Shared responsibilities and workload",
        "Combined skills and resources",
        "Shared startup costs",
        "Simple tax structure"
      ],
      cons: [
        "Joint and several liability",
        "Potential for disputes",
        "Shared profits",
        "Partners liable for each other's actions"
      ],
      taxImplications: [
        "Each partner pays income tax on their share",
        "Partnership tax return required",
        "Class 2 and Class 4 National Insurance",
        "Profit sharing agreement important"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Building className="h-5 w-5" />
            Choosing Your Business Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Your choice of business structure affects your tax obligations, personal liability, and administrative requirements. 
            Consider your circumstances, risk tolerance, and growth plans when deciding.
          </p>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-500/30">Key Factor</Badge>
              <span className="text-sm">Annual turnover and profit levels</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-500/30">Key Factor</Badge>
              <span className="text-sm">Risk exposure and liability concerns</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-500/30">Key Factor</Badge>
              <span className="text-sm">Administrative capacity and preferences</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {businessTypes.map((business, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  {business.icon}
                </div>
                <div>
                  <CardTitle className="text-xl text-elec-yellow">{business.type}</CardTitle>
                  <p className="text-muted-foreground text-sm">{business.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                  <ul className="space-y-1">
                    {business.pros.map((pro, proIndex) => (
                      <li key={proIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-green-400 mt-1">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Disadvantages</h4>
                  <ul className="space-y-1">
                    {business.cons.map((con, conIndex) => (
                      <li key={conIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-red-400 mt-1">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-elec-yellow/20 pt-4">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Tax Implications
                </h4>
                <ul className="space-y-1">
                  {business.taxImplications.map((tax, taxIndex) => (
                    <li key={taxIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-elec-yellow mt-1">•</span>
                      {tax}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessStructureTab;
