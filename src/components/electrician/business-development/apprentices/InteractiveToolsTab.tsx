
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, FileText, Clock, PoundSterling, TrendingUp, Download, CheckCircle } from "lucide-react";
import { useState } from "react";

const InteractiveToolsTab = () => {
  const [apprenticeAge, setApprenticeAge] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [calculatedCosts, setCalculatedCosts] = useState(null);

  const calculateApprenticeshipCosts = () => {
    if (!apprenticeAge || !businessSize) return;

    const baseWage = apprenticeAge === "16-18" ? 6.40 : apprenticeAge === "19-24" ? 8.60 : 10.42;
    const annualSalary = baseWage * 40 * 52;
    const employerNI = annualSalary * 0.138;
    const pension = annualSalary * 0.03;
    
    let incentive = 0;
    if (apprenticeAge === "16-18") incentive = 3000;
    else if (apprenticeAge === "19-24") incentive = 1500;

    const equipment = 1000;
    const admin = 600;
    const trainingFunding = apprenticeAge === "16-18" ? 0 : (businessSize === "small" ? 500 : 2000);

    const totalCost = annualSalary + employerNI + pension + equipment + admin + trainingFunding - incentive;

    setCalculatedCosts({
      baseWage,
      annualSalary,
      employerNI,
      pension,
      incentive,
      equipment,
      admin,
      trainingFunding,
      totalCost
    });
  };

  const timeAllocationData = [
    { week: 1, onJob: 32, offJob: 8, notes: "Initial orientation and safety training" },
    { week: 2, onJob: 32, offJob: 8, notes: "Basic skills development" },
    { week: 3, onJob: 32, offJob: 8, notes: "College theory and practical workshops" },
    { week: 4, onJob: 32, offJob: 8, notes: "Workplace assessment and review" }
  ];

  const documentTemplates = [
    {
      title: "Apprenticeship Agreement Template",
      description: "Comprehensive agreement covering all legal requirements",
      sections: ["Personal details", "Training provider", "Qualifications", "Terms and conditions"],
      downloadSize: "2.1 MB"
    },
    {
      title: "Individual Learning Plan",
      description: "Structured plan for apprentice development",
      sections: ["Learning objectives", "Assessment milestones", "Support needs", "Progress tracking"],
      downloadSize: "1.8 MB"
    },
    {
      title: "20% Off-Job Training Tracker",
      description: "Excel template for tracking training time compliance",
      sections: ["Weekly time log", "Activity categories", "Compliance dashboard", "Reporting tools"],
      downloadSize: "1.2 MB"
    },
    {
      title: "Skills Assessment Matrix",
      description: "Competency tracking across all skill areas",
      sections: ["Technical skills", "Health & safety", "Customer service", "Professional development"],
      downloadSize: "950 KB"
    },
    {
      title: "Progress Review Template",
      description: "Structured review meetings with apprentice",
      sections: ["Performance review", "Goal setting", "Support planning", "Career development"],
      downloadSize: "800 KB"
    }
  ];

  const quickAssessmentQuestions = [
    "Do you have a written apprenticeship agreement in place?",
    "Is 20% off-job training time clearly scheduled and tracked?",
    "Does the apprentice have access to a qualified mentor?",
    "Are regular progress reviews scheduled and documented?",
    "Is health and safety training comprehensive and up-to-date?",
    "Are government incentives and funding being maximised?",
    "Is the apprentice enrolled with an approved training provider?",
    "Are you compliant with apprentice minimum wage requirements?"
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Calculator className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Use these interactive tools to plan, calculate costs, and manage your apprenticeship programme effectively.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Apprenticeship Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="age-range">Apprentice Age Range</Label>
                <Select value={apprenticeAge} onValueChange={setApprenticeAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16-18">16-18 years</SelectItem>
                    <SelectItem value="19-24">19-24 years</SelectItem>
                    <SelectItem value="25+">25+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="business-size">Business Size</Label>
                <Select value={businessSize} onValueChange={setBusinessSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (under 50 employees)</SelectItem>
                    <SelectItem value="medium">Medium (50-250 employees)</SelectItem>
                    <SelectItem value="large">Large (over 250 employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateApprenticeshipCosts} className="w-full">
                Calculate Costs
              </Button>
            </div>

            {calculatedCosts && (
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Cost Breakdown (Year 1)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-elec-dark/50 rounded">
                    <span className="text-muted-foreground">Base Salary</span>
                    <span className="text-white">£{calculatedCosts.annualSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-elec-dark/50 rounded">
                    <span className="text-muted-foreground">Employer NI</span>
                    <span className="text-white">£{calculatedCosts.employerNI.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-elec-dark/50 rounded">
                    <span className="text-muted-foreground">Pension</span>
                    <span className="text-white">£{calculatedCosts.pension.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-elec-dark/50 rounded">
                    <span className="text-muted-foreground">Equipment</span>
                    <span className="text-white">£{calculatedCosts.equipment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-500/20 rounded">
                    <span className="text-green-300">Government Incentive</span>
                    <span className="text-green-400">-£{calculatedCosts.incentive.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-elec-yellow/20 border border-elec-yellow/30 rounded">
                    <span className="text-elec-yellow font-semibold">Total Cost</span>
                    <span className="text-elec-yellow font-semibold">£{calculatedCosts.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            20% Off-Job Training Planner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-2">Training Time Requirements</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-green-200">Weekly Hours:</span>
                  <div className="text-white font-medium">8 hours minimum</div>
                </div>
                <div>
                  <span className="text-green-200">Annual Hours:</span>
                  <div className="text-white font-medium">416 hours minimum</div>
                </div>
                <div>
                  <span className="text-green-200">Documentation:</span>
                  <div className="text-white font-medium">Required by law</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Sample Weekly Schedule</h4>
              {timeAllocationData.map((week, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-300">Week {week.week}</span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-white">On-job: {week.onJob}h</span>
                      <span className="text-green-400">Off-job: {week.offJob}h</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{week.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Templates & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTemplates.map((template, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-white">{template.title}</h4>
                  <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                    {template.downloadSize}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                
                <div className="space-y-2 mb-3">
                  <h5 className="text-sm font-medium text-purple-300">Includes:</h5>
                  <div className="flex flex-wrap gap-1">
                    {template.sections.map((section, sectionIndex) => (
                      <Badge key={sectionIndex} variant="outline" className="text-purple-200 border-purple-400/30 text-xs">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full border-purple-500/30">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-500/20 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Compliance Quick Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground mb-4">
              Use this checklist to ensure your apprenticeship programme meets all legal requirements:
            </p>
            
            {quickAssessmentQuestions.map((question, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-amber-500/20 rounded-lg">
                <input type="checkbox" className="rounded border-amber-500" />
                <span className="text-amber-200 text-sm">{question}</span>
              </div>
            ))}

            <div className="mt-4 p-3 bg-amber-500/20 border border-amber-500/40 rounded-lg">
              <h5 className="font-medium text-amber-300 mb-2">Assessment Score</h5>
              <p className="text-sm text-amber-200">
                <strong>8/8:</strong> Excellent compliance - you're well-prepared<br />
                <strong>6-7/8:</strong> Good progress - address remaining items<br />
                <strong>4-5/8:</strong> Some gaps - seek additional support<br />
                <strong>0-3/8:</strong> Significant issues - professional advice recommended
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            ROI Calculator & Business Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Investment vs Return</h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <h5 className="text-red-400 font-medium">4-Year Investment</h5>
                  <div className="text-2xl font-bold text-red-300">£65,000</div>
                  <p className="text-xs text-red-200">Total cost including salary progression</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <h5 className="text-green-400 font-medium">Qualified Electrician Value</h5>
                  <div className="text-2xl font-bold text-green-300">£180,000</div>
                  <p className="text-xs text-green-200">5-year earning potential (£36k/year)</p>
                </div>
                
                <div className="p-3 bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg">
                  <h5 className="text-elec-yellow font-medium">Net ROI</h5>
                  <div className="text-2xl font-bold text-elec-yellow">277%</div>
                  <p className="text-xs text-muted-foreground">Return on investment over 5 years</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Additional Benefits</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Reduced recruitment costs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Higher employee loyalty</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Skills tailored to your business</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Fresh perspectives and ideas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Enhanced reputation as training provider</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Potential for business growth</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
