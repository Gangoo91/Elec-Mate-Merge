import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, CheckCircle, AlertTriangle, ExternalLink, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const ComplianceChecker = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);

  const complianceCategories = [
    {
      category: "Legal Requirements",
      priority: "critical" as const,
      items: [
        {
          id: "apprenticeship-agreement",
          text: "Written apprenticeship agreement signed by all parties",
          regulation: "Education and Skills Act 2008",
          penalty: "Invalid apprenticeship"
        },
        {
          id: "minimum-wage",
          text: "Apprentice minimum wage compliance (£6.81/hour for under 19s or first year)",
          regulation: "National Minimum Wage Act 1998",
          penalty: "Fines up to £20,000 per apprentice"
        },
        {
          id: "off-job-training",
          text: "20% off-the-job training documented and tracked",
          regulation: "Apprenticeship Funding Rules",
          penalty: "Funding clawback"
        },
        {
          id: "training-provider",
          text: "Approved training provider contract in place",
          regulation: "Education and Skills Act 2008",
          penalty: "Qualification invalid"
        }
      ]
    },
    {
      category: "Health & Safety",
      priority: "critical" as const,
      items: [
        {
          id: "risk-assessment",
          text: "Young person risk assessment completed (under 18s)",
          regulation: "Management of H&S at Work Regulations 1999",
          penalty: "Prosecution, unlimited fines"
        },
        {
          id: "safety-training",
          text: "Comprehensive safety induction and ongoing training",
          regulation: "Health and Safety at Work Act 1974",
          penalty: "Prosecution, unlimited fines"
        },
        {
          id: "supervision",
          text: "Appropriate supervision arrangements for apprentice",
          regulation: "Management of H&S at Work Regulations 1999",
          penalty: "Prosecution, enforcement notices"
        },
        {
          id: "ppe",
          text: "Personal protective equipment provided and training given",
          regulation: "Personal Protective Equipment at Work Regulations 2022",
          penalty: "Improvement/prohibition notices"
        }
      ]
    },
    {
      category: "Documentation & Records",
      priority: "high" as const,
      items: [
        {
          id: "progress-reviews",
          text: "Regular progress reviews documented (minimum every 12 weeks)",
          regulation: "Apprenticeship Funding Rules",
          penalty: "Funding issues"
        },
        {
          id: "evidence-portfolio",
          text: "Digital portfolio maintained with regular evidence uploads",
          regulation: "Apprenticeship Standard Assessment Plan",
          penalty: "EPA failure"
        },
        {
          id: "time-records",
          text: "Accurate time recording system for on/off-job training",
          regulation: "Apprenticeship Funding Rules",
          penalty: "Audit failure, funding clawback"
        },
        {
          id: "qualifications",
          text: "Functional skills and technical qualifications tracking",
          regulation: "Apprenticeship Standard",
          penalty: "EPA gateway failure"
        }
      ]
    },
    {
      category: "Financial Compliance",
      priority: "medium" as const,
      items: [
        {
          id: "funding-rules",
          text: "Apprenticeship levy/co-investment rules followed",
          regulation: "Apprenticeship Funding Rules",
          penalty: "Funding recovery"
        },
        {
          id: "incentive-claims",
          text: "Government incentive payments claimed correctly",
          regulation: "Apprenticeship Incentive Terms",
          penalty: "Recovery of payments"
        },
        {
          id: "payroll-setup",
          text: "Apprentice correctly set up on payroll with appropriate deductions",
          regulation: "PAYE Regulations",
          penalty: "HMRC penalties"
        }
      ]
    }
  ];

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: checked
    }));
  };

  useEffect(() => {
    const totalItems = complianceCategories.reduce((sum, category) => sum + category.items.length, 0);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    setScore((checkedCount / totalItems) * 100);
  }, [checkedItems]);

  const getScoreColor = () => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-blue-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreLevel = () => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Adequate";
    return "Needs Attention";
  };

  const getCriticalIssues = () => {
    const criticalCategories = complianceCategories.filter(cat => cat.priority === "critical");
    const criticalItems = criticalCategories.flatMap(cat => cat.items);
    return criticalItems.filter(item => !checkedItems[item.id]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-elec-yellow mb-2">2025 BS7671 Compliance Checker</h3>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-amber-400" />
          <span className="text-muted-foreground">Ensure apprenticeship programme compliance</span>
        </div>
      </div>

      {/* Score Overview - Simplified */}
      <div className="text-center p-6 bg-elec-gray rounded-lg border border-amber-500/30">
        <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
          {score.toFixed(0)}%
        </div>
        <div className={`text-lg font-medium ${getScoreColor()} mb-3`}>{getScoreLevel()}</div>
        <div className="text-sm text-muted-foreground mb-4">Compliance Score</div>
        <Progress value={score} className="w-full max-w-md mx-auto mb-4" />
        
        {getCriticalIssues().length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-red-200 text-sm">
              {getCriticalIssues().length} critical compliance issues require immediate attention
            </span>
          </div>
        )}
      </div>

      {/* Compliance Items - Flat List */}
      <div className="space-y-3">
        {complianceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center justify-between mb-3 p-3 bg-elec-dark/30 rounded-lg">
              <h4 className="font-semibold text-white">{category.category}</h4>
              <Badge 
                variant="outline" 
                className={`${
                  category.priority === 'critical' ? 'border-red-400/30 text-red-300' :
                  category.priority === 'high' ? 'border-amber-400/30 text-amber-300' : 
                  'border-blue-400/30 text-blue-300'
                }`}
              >
                {category.priority}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="p-4 bg-elec-gray/50 rounded-lg border border-amber-500/10 text-center">
                  {/* Checkbox at top center */}
                  <div className="flex justify-center mb-4">
                    <Checkbox
                      id={item.id}
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={(checked) => handleItemCheck(item.id, !!checked)}
                      className="h-5 w-5"
                    />
                  </div>
                  
                  {/* Main text centered */}
                  <label htmlFor={item.id} className="block text-white font-medium cursor-pointer mb-4">
                    {item.text}
                  </label>
                  
                  {/* Regulation and Risk stacked centrally */}
                  <div className="space-y-3">
                    <div className="max-w-md mx-auto">
                      <span className="text-blue-300 font-medium">Regulation: </span>
                      <span className="text-blue-200">{item.regulation}</span>
                    </div>
                    <div className="max-w-md mx-auto">
                      <span className="text-red-300 font-medium">Risk: </span>
                      <span className="text-red-200">{item.penalty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button variant="outline" className="border-blue-500/30">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
        
        <Button variant="outline" className="border-green-500/30">
          <ExternalLink className="h-4 w-4 mr-2" />
          ESFA Guidance
        </Button>
        
        <Button variant="outline" className="border-purple-500/30">
          <CheckCircle className="h-4 w-4 mr-2" />
          Schedule Review
        </Button>
      </div>

      {/* Quick Tips */}
      <div className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
        <h5 className="font-medium text-elec-yellow mb-2">Pro Tips for Maintaining Compliance</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>• Schedule monthly compliance reviews</div>
          <div>• Use digital systems for record-keeping</div>
          <div>• Maintain regular contact with training provider</div>
          <div>• Set calendar reminders for key deadlines</div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChecker;