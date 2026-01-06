
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, FileCheck, Sparkles, RotateCcw, ArrowRight } from "lucide-react";
import { useState } from "react";

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

  const categoryColors: Record<string, { icon: string; bg: string; border: string }> = {
    residency: { icon: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    academic: { icon: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    professional: { icon: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
    employment: { icon: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    financial: { icon: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    age: { icon: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" }
  };

  const categoryLabels: Record<string, string> = {
    residency: "Residency",
    academic: "Academic",
    professional: "Professional",
    employment: "Employment",
    financial: "Financial",
    age: "Age"
  };

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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <FileCheck className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Funding Eligibility Checker</h3>
            <p className="text-sm text-white/70">
              Select criteria that apply to you to discover your funding options for further education
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Criteria Selection */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <FileCheck className="h-5 w-5 text-elec-yellow" />
              </div>
              Your Circumstances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 relative">
            {Object.entries(groupedCriteria).map(([category, criteria]) => {
              const colors = categoryColors[category];
              return (
                <div key={category} className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                  <h4 className={`font-semibold ${colors.icon} mb-3 text-sm uppercase tracking-wider`}>
                    {categoryLabels[category]}
                  </h4>
                  <div className="space-y-3">
                    {criteria.map((criterion) => (
                      <div key={criterion.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={criterion.id}
                          checked={selectedCriteria.includes(criterion.id)}
                          onCheckedChange={(checked) => handleCriteriaChange(criterion.id, Boolean(checked))}
                          className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                        />
                        <label
                          htmlFor={criterion.id}
                          className="text-sm text-white/80 leading-none cursor-pointer hover:text-white transition-colors"
                        >
                          {criterion.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="flex gap-2 pt-2">
              <Button
                onClick={checkEligibility}
                className="flex-1 h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Check Eligibility
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                className="h-11 border-white/20 hover:border-white/40 touch-manipulation active:scale-95 transition-all"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <Sparkles className="h-5 w-5 text-green-400" />
              </div>
              Eligibility Results
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {result ? (
              <div className="space-y-5">
                {/* Eligible For */}
                {result.eligibleFor.length > 0 && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      You're Eligible For:
                    </h4>
                    <div className="space-y-2">
                      {result.eligibleFor.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-green-500/10">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Not Eligible For */}
                {result.notEligibleFor.length > 0 && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2 text-sm">
                      <XCircle className="h-4 w-4" />
                      Currently Not Eligible For:
                    </h4>
                    <div className="space-y-2">
                      {result.notEligibleFor.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-red-500/10">
                          <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Recommendations:
                    </h4>
                    <div className="space-y-2">
                      {result.recommendations.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10">
                          <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-3 text-sm">Next Steps:</h4>
                  <div className="space-y-2">
                    {result.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs px-2">
                          {idx + 1}
                        </Badge>
                        <span className="text-sm text-white/80">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="p-4 rounded-full bg-white/5 mb-4">
                  <ArrowRight className="h-8 w-8 text-white/30" />
                </div>
                <p className="text-white/50 text-sm">
                  Select your circumstances on the left<br />to check your eligibility
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <AlertCircle className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="font-medium text-purple-400 mb-1">Important Note</p>
            <p className="text-sm text-white/70">
              This checker provides general guidance based on common eligibility criteria. Individual circumstances vary,
              and you should always verify eligibility directly with funding providers and course institutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityChecker;
