
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, FileText, Calendar, ExternalLink } from "lucide-react";

const LegalRequirementsChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const requirements = [
    {
      category: "Business Registration",
      priority: "Critical",
      items: [
        {
          id: "choose_structure",
          task: "Choose business structure (sole trader, partnership, limited company)",
          timeframe: "Week 1",
          cost: "£0-50",
          description: "Decide on the legal structure that best suits your business needs and tax situation"
        },
        {
          id: "register_company",
          task: "Register with Companies House (if limited company)",
          timeframe: "Week 1-2",
          cost: "£12",
          description: "Online registration takes 1-3 days. Required for limited companies only"
        },
        {
          id: "register_hmrc",
          task: "Register with HMRC for tax purposes",
          timeframe: "Week 2",
          cost: "Free",
          description: "Register for Self Assessment, VAT (if applicable), and PAYE (if employing staff)"
        }
      ]
    },
    {
      category: "Insurance Requirements",
      priority: "Critical",
      items: [
        {
          id: "public_liability",
          task: "Obtain Public Liability Insurance (minimum £2 million)",
          timeframe: "Week 1",
          cost: "£200-500/year",
          description: "Essential for all electrical work. Many clients require sight of certificate"
        },
        {
          id: "professional_indemnity",
          task: "Consider Professional Indemnity Insurance",
          timeframe: "Week 2",
          cost: "£300-800/year",
          description: "Protects against claims of professional negligence or advice"
        },
        {
          id: "employers_liability",
          task: "Employers' Liability Insurance (when hiring staff)",
          timeframe: "Before hiring",
          cost: "£100-300/year",
          description: "Legally required when you employ anyone, including subcontractors"
        }
      ]
    },
    {
      category: "Industry Compliance",
      priority: "High",
      items: [
        {
          id: "scheme_membership",
          task: "Join electrical competent person scheme (NICEIC/NAPIT/etc.)",
          timeframe: "Week 3-4",
          cost: "£500-800/year",
          description: "Essential for Part P compliance and self-certification of electrical work"
        },
        {
          id: "jib_membership",
          task: "Consider JIB membership and grading",
          timeframe: "Week 4-6",
          cost: "£150-300/year",
          description: "Industry recognition scheme that demonstrates your qualifications and experience"
        },
        {
          id: "safe_contractor",
          task: "SafeContractor or similar health & safety accreditation",
          timeframe: "Week 6-8",
          cost: "£200-400/year",
          description: "Many larger clients require this before allowing you on their premises"
        }
      ]
    },
    {
      category: "Health & Safety",
      priority: "Critical",
      items: [
        {
          id: "health_safety_policy",
          task: "Create Health & Safety Policy (if employing 5+ people)",
          timeframe: "Week 2-3",
          cost: "£200-500",
          description: "Legal requirement for businesses with 5 or more employees"
        },
        {
          id: "risk_assessments",
          task: "Develop standard risk assessment templates",
          timeframe: "Week 3-4",
          cost: "£100-300",
          description: "Required for all work sites and activities"
        },
        {
          id: "method_statements",
          task: "Create method statements for common tasks",
          timeframe: "Week 4-5",
          cost: "£100-200",
          description: "Demonstrates how work will be carried out safely"
        }
      ]
    },
    {
      category: "Documentation & Contracts",
      priority: "High",
      items: [
        {
          id: "terms_conditions",
          task: "Develop terms and conditions of service",
          timeframe: "Week 2-3",
          cost: "£300-800",
          description: "Protects your business and sets clear expectations with customers"
        },
        {
          id: "quote_templates",
          task: "Create professional quote and invoice templates",
          timeframe: "Week 2",
          cost: "£50-200",
          description: "Ensures consistency and professionalism in all customer communications"
        },
        {
          id: "contracts",
          task: "Standard contract templates for different job types",
          timeframe: "Week 3-4",
          cost: "£200-500",
          description: "Clear contracts prevent disputes and protect your interests"
        }
      ]
    }
  ];

  const handleCheckChange = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: checked
    }));
  };

  const getTotalItems = () => {
    return requirements.reduce((total, category) => total + category.items.length, 0);
  };

  const getCompletedItems = () => {
    return Object.values(checkedItems).filter(Boolean).length;
  };

  const getCompletionPercentage = () => {
    const total = getTotalItems();
    const completed = getCompletedItems();
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Medium': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-blue-500/5">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Legal Requirements Checklist
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress: {getCompletedItems()} of {getTotalItems()} completed</span>
            <span>{getCompletionPercentage().toFixed(0)}%</span>
          </div>
          <Progress value={getCompletionPercentage()} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {requirements.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-elec-yellow/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-white">{category.category}</h4>
              <Badge className={getPriorityColor(category.priority)}>
                {category.priority}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={item.id} className="bg-elec-dark p-3 rounded border border-elec-yellow/10">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={item.id}
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={(checked) => handleCheckChange(item.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <label htmlFor={item.id} className="font-medium text-white cursor-pointer">
                          {item.task}
                        </label>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="text-blue-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.timeframe}
                          </Badge>
                          <Badge variant="outline" className="text-green-400">
                            {item.cost}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Important Reminders
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-white mb-2">Critical Deadlines:</h5>
              <ul className="space-y-1 text-blue-200">
                <li>• Public Liability Insurance: Before any work</li>
                <li>• HMRC Registration: Within 3 months of starting</li>
                <li>• Scheme Membership: Before electrical certification</li>
                <li>• VAT Registration: When turnover exceeds £85,000</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-white mb-2">Getting Help:</h5>
              <ul className="space-y-1 text-blue-200">
                <li>• Business Link: Free government advice</li>
                <li>• Local Enterprise Partnership</li>
                <li>• Trade association guidance</li>
                <li>• Professional legal/accounting advice</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-green-500 text-green-900 hover:bg-green-400">
            <ExternalLink className="h-4 w-4 mr-2" />
            Download Printable Checklist
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Set Reminder Dates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalRequirementsChecklist;
