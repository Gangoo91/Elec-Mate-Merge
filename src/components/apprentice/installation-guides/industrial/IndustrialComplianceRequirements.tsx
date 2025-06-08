
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Shield } from "lucide-react";

const IndustrialComplianceRequirements = () => {
  const complianceRequirements = [
    {
      standard: "ATEX Directive 2014/34/EU",
      description: "Equipment for explosive atmospheres",
      application: "All equipment in classified zones"
    },
    {
      standard: "DSEAR Regulations 2002",
      description: "Dangerous substances and explosive atmospheres",
      application: "Risk assessment and control measures"
    },
    {
      standard: "BS EN 60079 Series",
      description: "Explosive atmospheres protection",
      application: "Equipment selection and installation"
    },
    {
      standard: "BS EN 60204-1",
      description: "Safety of machinery - Electrical equipment",
      application: "Machine control systems"
    }
  ];

  return (
    <Card className="border-red-500/30 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileCheck className="h-6 w-6 text-red-400" />
          <CardTitle className="text-red-300">Essential Compliance Standards</CardTitle>
        </div>
        <p className="text-muted-foreground">Mandatory standards for industrial installations</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {complianceRequirements.map((req, index) => (
          <div key={index} className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-red-200 mb-1">{req.standard}</h4>
                <p className="text-sm text-muted-foreground mb-2">{req.description}</p>
                <p className="text-xs text-orange-300">Application: {req.application}</p>
              </div>
              <Shield className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IndustrialComplianceRequirements;
