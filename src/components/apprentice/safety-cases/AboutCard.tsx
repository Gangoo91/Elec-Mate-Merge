
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Info, Scale } from "lucide-react";

const AboutCard = () => {
  return (
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <Shield className="h-5 w-5 text-blue-400" />
          </div>
          About These Safety Scenarios
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <div className="p-4 rounded-xl bg-white/10 border border-white/10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
              <Info className="h-4 w-4 text-elec-yellow" />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              These interactive case studies are based on real situations encountered by UK electrical apprentices and electricians.
              Each scenario is designed to help you apply your knowledge of UK electrical regulations, safety standards, and professional conduct.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
              <Scale className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-sm text-blue-300 leading-relaxed">
              All references to regulations are specific to the UK electrical industry, including BS 7671 (IET Wiring Regulations),
              the Electricity at Work Regulations 1989, and other relevant HSE guidelines. Practising these scenarios will help prepare
              you for real-world decision making on the job.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutCard;
