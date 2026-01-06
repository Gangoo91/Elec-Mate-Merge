
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, GraduationCap } from "lucide-react";

const LearningOutcomes = () => {
  const outcomes = [
    "Critical thinking in high-pressure situations",
    "Regulations awareness and application",
    "Situational judgement skills development",
    "Professional communication under pressure",
    "UK regulatory framework compliance",
    "Risk assessment and hazard identification",
    "Emergency response preparedness",
    "Electrical safety in specialised environments"
  ];

  return (
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative animate-fade-in mt-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
            <GraduationCap className="h-5 w-5 text-green-400" />
          </div>
          Learning Outcomes
        </CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/10 border border-white/10 hover:border-green-500/30 transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-green-500/20 flex-shrink-0 mt-0.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
              </div>
              <span className="text-sm text-white/80">{outcome}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningOutcomes;
