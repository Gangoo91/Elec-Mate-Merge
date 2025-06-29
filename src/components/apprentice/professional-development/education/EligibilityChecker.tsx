
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, FileCheck } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EligibilityChecker = () => {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [result, setResult] = useState<{
    eligibleFor: string[];
    notEligibleFor: string[];
    recommendations: string[];
    nextSteps: string[];
  } | null>(null);

  const eligibilityCriteria = [
    { id: "uk-resident", label: "UK resident for 3+ years", category: "residency" },
    { id: "level-3", label: "Level 3 qualification (A-Levels, BTEC, etc.)", category: "academic" },
    { id: "apprenticeship", label: "Completed electrical apprenticeship", category: "professional" },
    { id: "work-experience", label: "2+ years electrical work experience", category: "professional" },
    { id: "employed", label: "Currently employed", category: "employment" },
    { id: "employer-support", label: "Employer willing to support studies", category: "employment" },
    { id: "income-under-25k", label: "Annual income under £25,000", category: "financial" },
    { id: "income-25k-plus", label: "Annual income £25,000+", category: "financial" },
    { id: "self-employed", label: "Self-employed for 2+ years", category: "employment" },
    { id: "union-member", label: "Trade union member", category: "professional" },
    { id: "iet-member", label: "IET (Institution of Engineering and Technology) member", category: "professional" },
    { id: "under-25", label: "Under 25 years old", category: "age" }
  ];

  const checkEligibility = () => {
    const eligibleFor = [];
    const notEligibleFor = [];
    const recommendations = [];
    const nextSteps = [];

    // HNC/HND Eligibility
    if (selectedCriteria.includes("uk-resident") && 
        (selectedCriteria.includes("level-3") || selectedCriteria.includes("work-experience"))) {
      eligibleFor.push("HNC/HND Electrical Engineering - Advanced Learner Loan");
    } else {
      notEligibleFor.push("HNC/HND - Need UK residency and Level 3 qualification or relevant experience");
    }

    // Degree Top-Up
    if (selectedCriteria.includes("uk-resident") && selectedCriteria.includes("level-3")) {
      eligibleFor.push("Degree Top-Up - Student Finance");
    }

    // Employer Funding
    if (selectedCriteria.includes("employed") && selectedCriteria.includes("employer-support")) {
      eligibleFor.push("Employer-Funded Training");
      nextSteps.push("Schedule a meeting with your supervisor or HR to discuss training opportunities");
    } else if (selectedCriteria.includes("employed")) {
      recommendations.push("Discuss training opportunities with your employer - many support professional development");
    }

    // Professional Body Support
    if (selectedCriteria.includes("iet-member")) {
      eligibleFor.push("IET Education Grants (£500-£2,000)");
    } else {
      recommendations.push("Consider IET membership for access to grants and professional support");
    }

    // Union Support
    if (selectedCriteria.includes("union-member")) {
      eligibleFor.push("Union Education Support and Grants");
    } else {
      recommendations.push("Check if your workplace has union representation for additional education support");
    }

    // Age-based support
    if (selectedCriteria.includes("under-25")) {
      eligibleFor.push("Enhanced support through local colleges and career services");
    }

    // Skills Development Funding
    if (selectedCriteria.includes("apprenticeship") || selectedCriteria.includes("work-experience")) {
      eligibleFor.push("Skills Development Grants for specialist courses");
    }

    // Financial considerations
    if (selectedCriteria.includes("income-under-25k")) {
      nextSteps.push("You may be eligible for additional financial support - check with course providers");
    }

    // Self-employed considerations
    if (selectedCriteria.includes("self-employed")) {
      eligibleFor.push("Self-employed specific funding schemes");
      nextSteps.push("Explore CITB grants for self-employed construction workers");
    }

    // General recommendations
    if (!selectedCriteria.includes("level-3")) {
      recommendations.push("Consider achieving a Level 3 qualification first to unlock more funding options");
    }

    if (recommendations.length === 0) {
      recommendations.push("You have good eligibility for various funding options - explore multiple sources");
    }

    if (nextSteps.length === 0) {
      nextSteps.push("Contact course providers directly to discuss your specific circumstances");
      nextSteps.push("Book an appointment with a careers advisor for personalised guidance");
    }

    setResult({
      eligibleFor,
      notEligibleFor,
      recommendations,
      nextSteps
    });
  };

  const handleCriteriaChange = (criteriaId: string, checked: boolean) => {
    if (checked) {
      setSelectedCriteria([...selectedCriteria, criteriaId]);
    } else {
      setSelectedCriteria(selectedCriteria.filter(id => id !== criteriaId));
    }
  };

  const reset = () => {
    setSelectedCriteria([]);
    setResult(null);
  };

  const groupedCriteria = eligibilityCriteria.reduce((acc, criteria) => {
    if (!acc[criteria.category]) {
      acc[criteria.category] = [];
    }
    acc[criteria.category].push(criteria);
    return acc;
  }, {} as Record<string, typeof eligibilityCriteria>);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Education Funding Eligibility Checker</h3>
        <p className="text-muted-foreground">
          Check your eligibility for various funding options by selecting criteria that apply to you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Criteria Selection */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-elec-yellow" />
              Your Circumstances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(groupedCriteria).map(([category, criteria]) => (
              <div key={category}>
                <h4 className="font-semibold text-elec-yellow mb-3 capitalize">
                  {category.replace('-', ' ')}
                </h4>
                <div className="space-y-3">
                  {criteria.map((criterion) => (
                    <div key={criterion.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={criterion.id}
                        checked={selectedCriteria.includes(criterion.id)}
                        onCheckedChange={(checked) => handleCriteriaChange(criterion.id, Boolean(checked))}
                      />
                      <label
                        htmlFor={criterion.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {criterion.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-2 pt-4">
              <Button onClick={checkEligibility} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <CheckCircle className="h-4 w-4 mr-2" />
                Check Eligibility
              </Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow" />
              Eligibility Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                {/* Eligible For */}
                {result.eligibleFor.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      You're Eligible For:
                    </h4>
                    <div className="space-y-2">
                      {result.eligibleFor.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-green-900/20 p-2 rounded">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Not Eligible For */}
                {result.notEligibleFor.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Currently Not Eligible For:
                    </h4>
                    <div className="space-y-2">
                      {result.notEligibleFor.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-red-900/20 p-2 rounded">
                          <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Recommendations:
                    </h4>
                    <div className="space-y-2">
                      {result.recommendations.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-yellow-900/20 p-2 rounded">
                          <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div>
                  <h4 className="font-semibold text-elec-yellow mb-3">Next Steps:</h4>
                  <div className="space-y-2">
                    {result.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">{idx + 1}</Badge>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Select your circumstances to check eligibility
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Alert className="border-blue-500/20 bg-blue-500/10">
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-200">
          <strong>Disclaimer:</strong> This checker provides general guidance based on common eligibility criteria. 
          Individual circumstances vary, and you should always verify eligibility directly with funding providers 
          and course institutions.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EligibilityChecker;
