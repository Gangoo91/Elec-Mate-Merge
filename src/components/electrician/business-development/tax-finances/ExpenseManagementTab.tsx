
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Car, Home, Wrench, Receipt } from "lucide-react";

const ExpenseManagementTab = () => {
  const expenseCategories = [
    {
      category: "Vehicle & Travel",
      icon: <Car className="h-5 w-5" />,
      description: "Transport costs for business purposes",
      allowableExpenses: [
        "Business mileage (45p per mile for first 10,000 miles)",
        "Van lease payments or depreciation",
        "Fuel for business journeys",
        "Vehicle insurance and MOT",
        "Parking fees and congestion charges",
        "Commercial vehicle tax"
      ],
      recordKeeping: [
        "Mileage log with dates, destinations, and purposes",
        "Fuel receipts and maintenance costs",
        "Insurance and tax documentation",
        "Business vs personal use split"
      ]
    },
    {
      category: "Tools & Equipment",
      icon: <Wrench className="h-5 w-5" />,
      description: "Essential tools and equipment for electrical work",
      allowableExpenses: [
        "Hand tools and power tools",
        "Testing equipment and meters",
        "Consumable items (screws, cables, etc.)",
        "Tool storage and organisation",
        "Equipment repairs and maintenance",
        "Annual equipment calibration"
      ],
      recordKeeping: [
        "Purchase receipts and invoices",
        "Equipment register with serial numbers",
        "Depreciation schedules for expensive items",
        "Maintenance and repair records"
      ]
    },
    {
      category: "Home Office",
      icon: <Home className="h-5 w-5" />,
      description: "Costs related to working from home",
      allowableExpenses: [
        "Proportion of electricity and heating",
        "Home telephone and internet",
        "Office equipment and furniture",
        "Stationery and printing costs",
        "Professional software subscriptions",
        "Home office insurance"
      ],
      recordKeeping: [
        "Floor area calculation for home office",
        "Utility bills and usage records",
        "Equipment purchase receipts",
        "Time spent working from home"
      ]
    },
    {
      category: "Professional Services",
      icon: <Receipt className="h-5 w-5" />,
      description: "Professional fees and business services",
      allowableExpenses: [
        "Accountancy and bookkeeping fees",
        "Legal and professional advice",
        "Professional body memberships",
        "Training and certification costs",
        "Insurance premiums",
        "Bank charges and interest"
      ],
      recordKeeping: [
        "Service provider invoices",
        "Professional qualification certificates",
        "Insurance policy documents",
        "Bank statements and charge details"
      ]
    }
  ];

  const taxTips = [
    {
      tip: "Keep Digital Records",
      description: "Use accounting software or apps to photograph and store receipts digitally",
      importance: "High"
    },
    {
      tip: "Separate Business & Personal",
      description: "Use a dedicated business bank account and credit card for all business expenses",
      importance: "Critical"
    },
    {
      tip: "Track Mileage Accurately",
      description: "Vehicle expenses are often the largest deduction - keep detailed mileage logs",
      importance: "High"
    },
    {
      tip: "Plan for Self Assessment",
      description: "Set aside money for tax bills and keep records organised throughout the year",
      importance: "Critical"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Maximising Your Business Deductions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Proper expense management can significantly reduce your tax liability. Keep detailed records 
            and understand what qualifies as a legitimate business expense for electrical contractors.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {expenseCategories.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  {category.icon}
                </div>
                <div>
                  <CardTitle className="text-xl text-elec-yellow">{category.category}</CardTitle>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Allowable Expenses</h4>
                  <ul className="space-y-1">
                    {category.allowableExpenses.map((expense, expenseIndex) => (
                      <li key={expenseIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-green-400 mt-1">•</span>
                        {expense}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Record Keeping</h4>
                  <ul className="space-y-1">
                    {category.recordKeeping.map((record, recordIndex) => (
                      <li key={recordIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-elec-yellow mt-1">•</span>
                        {record}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Essential Tax Management Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {taxTips.map((tip, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`border-blue-500/30 ${
                      tip.importance === 'Critical' ? 'text-red-400' : 'text-blue-400'
                    }`}
                  >
                    {tip.importance}
                  </Badge>
                  <h4 className="font-semibold text-white">{tip.tip}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseManagementTab;
