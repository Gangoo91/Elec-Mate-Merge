
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const AboutCard = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          About These Safety Scenarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          These interactive case studies are based on real situations encountered by UK electrical apprentices and electricians. 
          Each scenario is designed to help you apply your knowledge of UK electrical regulations, safety standards, and professional conduct.
        </p>
        <p>
          All references to regulations are specific to the UK electrical industry, including BS 7671 (IET Wiring Regulations), 
          the Electricity at Work Regulations 1989, and other relevant HSE guidelines. Practising these scenarios will help prepare 
          you for real-world decision making on the job.
        </p>
      </CardContent>
    </Card>
  );
};

export default AboutCard;
