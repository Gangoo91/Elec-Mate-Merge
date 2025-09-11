import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, Users, Briefcase } from "lucide-react";

export type ClientType = "homeowner" | "business" | "landlord" | "contractor";

interface ClientTypeSelectorProps {
  selected: ClientType;
  onSelect: (type: ClientType) => void;
}

const clientTypes = [
  {
    type: "homeowner" as ClientType,
    label: "Homeowner",
    icon: Home,
    description: "Residential property owner",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/30"
  },
  {
    type: "business" as ClientType,
    label: "Business",
    icon: Building,
    description: "Commercial property",
    color: "text-green-400 bg-green-400/10 border-green-400/30"
  },
  {
    type: "landlord" as ClientType,
    label: "Landlord",
    icon: Users,
    description: "Rental property owner",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/30"
  },
  {
    type: "contractor" as ClientType,
    label: "Contractor",
    icon: Briefcase,
    description: "Fellow trades professional",
    color: "text-orange-400 bg-orange-400/10 border-orange-400/30"
  }
];

const ClientTypeSelector = ({ selected, onSelect }: ClientTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground mb-3">Client Type</h3>
      <div className="grid grid-cols-2 gap-3">
        {clientTypes.map(({ type, label, icon: Icon, description, color }) => (
          <Card
            key={type}
            className={`cursor-pointer transition-all duration-200 ${
              selected === type
                ? `border-elec-yellow bg-elec-yellow/5 ${color}`
                : "border-border/50 bg-card/50 hover:border-border hover:bg-card/80"
            }`}
            onClick={() => onSelect(type)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selected === type ? color : "bg-muted"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientTypeSelector;