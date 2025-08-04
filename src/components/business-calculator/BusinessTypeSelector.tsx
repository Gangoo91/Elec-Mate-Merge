import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, User, Users, Briefcase } from "lucide-react";

interface BusinessType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  startupMultiplier: number;
  monthlyMultiplier: number;
}

interface BusinessTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const businessTypes: BusinessType[] = [
    {
      id: "sole-trader",
      name: "Sole Trader",
      description: "Individual contractor working independently",
      icon: <User className="h-5 w-5" />,
      benefits: ["Simple setup", "Full control", "Lower admin costs"],
      startupMultiplier: 1.0,
      monthlyMultiplier: 1.0,
    },
    {
      id: "partnership",
      name: "Partnership",
      description: "Two or more people sharing business ownership",
      icon: <Users className="h-5 w-5" />,
      benefits: ["Shared resources", "Combined expertise", "Risk sharing"],
      startupMultiplier: 1.5,
      monthlyMultiplier: 1.3,
    },
    {
      id: "limited-company",
      name: "Limited Company",
      description: "Incorporated business with limited liability",
      icon: <Building className="h-5 w-5" />,
      benefits: ["Limited liability", "Tax efficiency", "Professional image"],
      startupMultiplier: 1.8,
      monthlyMultiplier: 1.6,
    },
    {
      id: "franchise",
      name: "Franchise",
      description: "Established brand with ongoing support",
      icon: <Briefcase className="h-5 w-5" />,
      benefits: ["Proven model", "Marketing support", "Training provided"],
      startupMultiplier: 3.0,
      monthlyMultiplier: 1.4,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {businessTypes.map((type) => (
        <Card
          key={type.id}
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
            selectedType === type.id
              ? "border-elec-yellow bg-elec-yellow/10"
              : "border-muted bg-elec-card hover:border-elec-yellow/50"
          }`}
          onClick={() => onTypeChange(type.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`${selectedType === type.id ? "text-elec-yellow" : "text-muted-foreground"}`}>
                {type.icon}
              </div>
              <h3 className="font-semibold text-sm">{type.name}</h3>
              {selectedType === type.id && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  Selected
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {type.description}
            </p>
            <div className="space-y-1">
              {type.benefits.slice(0, 2).map((benefit, index) => (
                <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full"></div>
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessTypeSelector;