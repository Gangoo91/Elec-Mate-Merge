import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, CheckCircle, AlertTriangle, ExternalLink, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const ComplianceChecker = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [score, setScore] = useState(0);

  const complianceCategories = [
    {
      category: "Legal Requirements",
      priority: "critical",
      items: [
        {
          id: "apprenticeship-agreement",
          text: "Written apprenticeship agreement signed by all parties",
          regulation: "Education and Skills Act 2008",
          penalty: "Invalid apprenticeship",
          guidance: "Must include start/end dates, training provider, qualifications"
        },
        {
          id: "minimum-wage",
          text: "Apprentice minimum wage compliance (£6.81/hour for under 19s or first year)",
          regulation: "National Minimum Wage Act 1998",
          penalty: "Fines up to £20,000 per apprentice",
          guidance: "Regular wage reviews required as apprentice progresses"
        },
        {
          id: "off-job-training",
          text: "20% off-the-job training documented and tracked",
          regulation: "Apprenticeship Funding Rules",
          penalty: "Funding clawback",
          guidance: "Minimum 8 hours per week, must be evidenced"
        },
        {
          id: "training-provider",
          text: "Approved training provider contract in place",
          regulation: "Education and Skills Act 2008",
          penalty: "Qualification invalid",
          guidance: "Provider must be on Register of Apprenticeship Training Providers"
        }
      ]
    },
    {
      category: "Health & Safety",
      priority: "critical",
      items: [
        {
          id: "risk-assessment",
          text: "Young person risk assessment completed (under 18s)",
          regulation: "Management of H&S at Work Regulations 1999",
          penalty: "Prosecution, unlimited fines",
          guidance: "Must consider restricted activities and working hours"
        },
        {
          id: "safety-training",
          text: "Comprehensive safety induction and ongoing training",
          regulation: "Health and Safety at Work Act 1974",
          penalty: "Prosecution, unlimited fines",
          guidance: "Must include site-specific hazards and emergency procedures"
        },
        {
          id: "supervision",
          text: "Appropriate supervision arrangements for apprentice",
          regulation: "Management of H&S at Work Regulations 1999",
          penalty: "Prosecution, enforcement notices",
          guidance: "Competent person assigned with clear responsibilities"
        },
        {
          id: "ppe",
          text: "Personal protective equipment provided and training given",
          regulation: "Personal Protective Equipment at Work Regulations 2022",
          penalty: "Improvement/prohibition notices",
          guidance: "Must be suitable for young person and task-specific"
        }
      ]
    },
    {
      category: "Documentation & Records",
      priority: "high",
      items: [
        {
          id: "progress-reviews",
          text: "Regular progress reviews documented (minimum every 12 weeks)",
          regulation: "Apprenticeship Funding Rules",
          penalty: "Funding issues",
          guidance: "Three-way meetings between employer, apprentice, and provider"
        },
        {
          id: "evidence-portfolio",
          text: "Digital portfolio maintained with regular evidence uploads",
          regulation: "Apprenticeship Standard Assessment Plan",
          penalty: "EPA failure",
          guidance: "Must demonstrate competency development over time"
        },
        {
          id: "time-records",
          text: "Accurate time recording system for on/off-job training",
          regulation: "Apprenticeship Funding Rules",
          penalty: "Audit failure, funding clawback",
          guidance: "Must be able to demonstrate 20% off-job compliance"
        },
        {
          id: "qualifications",
          text: "Functional skills and technical qualifications tracking",
          regulation: "Apprenticeship Standard",
          penalty: "EPA gateway failure",
          guidance: "Level 2 English and Maths required before EPA"
        }
      ]
    },
    {
      category: "Financial Compliance",
      priority: "medium",
      items: [
        {
          id: "funding-rules",
          text: "Apprenticeship levy/co-investment rules followed",
          regulation: "Apprenticeship Funding Rules",
          penalty: "Funding recovery",
          guidance: "Must use levy funds within 24 months or face expiry"
        },
        {
          id: "incentive-claims",
          text: "Government incentive payments claimed correctly",
          regulation: "Apprenticeship Incentive Terms",
          penalty: "Recovery of payments",
          guidance: "£3,000 for 16-18s, £1,500 for 19-24s, specific claim deadlines"
        },
        {
          id: "payroll-setup",
          text: "Apprentice correctly set up on payroll with appropriate deductions",
          regulation: "PAYE Regulations",
          penalty: "HMRC penalties",
          guidance: "Standard tax/NI rules apply, consider pension auto-enrolment"
        }
      ]
    },
    {
      category: "Quality Assurance",
      priority: "medium",
      items: [
        {
          id: "epa-preparation",
          text: "End Point Assessment preparation and gateway readiness",
          regulation: "Apprenticeship Standard Assessment Plan",
          penalty: "EPA failure, extended training",
          guidance: "Gateway must be passed before EPA booking"
        },
        {
          id: "employer-engagement",
          text: "Active employer engagement in apprentice development",
          regulation: "Apprenticeship Standard",
          penalty: "Poor outcomes",
          guidance: "Regular workplace projects and mentoring required"
        },
        {
          id: "continuous-improvement",
          text: "Feedback collection and continuous improvement processes",
          regulation: "Quality Assurance Framework",
          penalty: "Provider performance issues",
          guidance: "Regular surveys and outcome tracking"
        }
      ]
    }
  ];

  const handleItemCheck = (itemId, checked) => {
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
    <Card className="border-amber-500/20 bg-amber-500/10">
      <CardHeader>
        <CardTitle className="text-amber-400 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          2025 BS7671 Compliance Checker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Score Overview */}
          <div className="text-center p-4 bg-elec-gray border border-amber-500/30 rounded-lg">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className={`text-3xl font-bold ${getScoreColor()}`}>
                {score.toFixed(0)}%
              </div>
              <div className="text-right">
                <div className={`font-medium ${getScoreColor()}`}>{getScoreLevel()}</div>
                <div className="text-sm text-muted-foreground">Compliance Score</div>
              </div>
            </div>
            <Progress value={score} className="w-full" />
            
            {getCriticalIssues().length > 0 && (
              <Alert className="mt-4 border-red-500/50 bg-red-500/10">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  {getCriticalIssues().length} critical compliance issues require immediate attention
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Compliance Categories */}
          <div className="space-y-4">
            {complianceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
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
                
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border border-amber-500/10 rounded p-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={item.id}
                          checked={checkedItems[item.id] || false}
                          onCheckedChange={(checked) => handleItemCheck(item.id, checked)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-2">
                          <label htmlFor={item.id} className="text-white font-medium cursor-pointer">
                            {item.text}
                          </label>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                              <div className="font-medium text-blue-300">Regulation</div>
                              <div className="text-blue-200">{item.regulation}</div>
                            </div>
                            
                            <div className="p-2 bg-red-500/10 border border-red-500/30 rounded">
                              <div className="font-medium text-red-300">Non-Compliance Risk</div>
                              <div className="text-red-200">{item.penalty}</div>
                            </div>
                            
                            <div className="p-2 bg-green-500/10 border border-green-500/30 rounded">
                              <div className="font-medium text-green-300">Guidance</div>
                              <div className="text-green-200">{item.guidance}</div>
                            </div>
                          </div>
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
          <div className="p-4 bg-elec-gray border border-elec-yellow/20 rounded-lg">
            <h5 className="font-medium text-elec-yellow mb-2">Pro Tips for Maintaining Compliance</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Schedule monthly compliance reviews to catch issues early</li>
              <li>• Use digital systems for automatic record-keeping and alerts</li>
              <li>• Maintain regular contact with your training provider</li>
              <li>• Set calendar reminders for key compliance deadlines</li>
              <li>• Keep all documentation in a central, easily accessible location</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceChecker;