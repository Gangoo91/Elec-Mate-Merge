
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Wrench } from "lucide-react";

const CommercialPlanningSection = () => {
  const planningPhases = [
    {
      phase: "Pre-Design Survey",
      icon: Building,
      activities: [
        "Assess building structure and layout",
        "Identify load requirements and diversity",
        "Survey existing electrical infrastructure",
        "Coordinate with other building services",
        "Identify fire compartments and escape routes"
      ]
    },
    {
      phase: "System Design",
      icon: Wrench,
      activities: [
        "Calculate maximum demand with diversity factors",
        "Design distribution board layouts",
        "Plan emergency lighting systems",
        "Design fire alarm detection zones",
        "Specify cable containment systems"
      ]
    },
    {
      phase: "Implementation Planning",
      icon: Users,
      activities: [
        "Coordinate with building management",
        "Plan phased installation to minimise disruption",
        "Schedule inspections and testing",
        "Arrange Building Control notifications",
        "Plan commissioning procedures"
      ]
    }
  ];

  const specialConsiderations = [
    {
      area: "Emergency Lighting",
      requirements: [
        "Minimum 1 lux on escape routes",
        "3-hour duration for sleeping accommodation",
        "Central battery or self-contained systems",
        "Monthly function tests required"
      ]
    },
    {
      area: "Fire Alarm Systems",
      requirements: [
        "BS 5839 Part 1 compliance",
        "Zone identification and monitoring", 
        "Interface with building management systems",
        "Regular testing and maintenance schedules"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Commercial Planning Process</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {planningPhases.map((phase, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <phase.icon className="h-5 w-5 text-blue-400" />
                <h4 className="font-medium text-white">{phase.phase}</h4>
              </div>
              <ul className="space-y-2">
                {phase.activities.map((activity, idx) => (
                  <li key={idx} className="text-sm text-blue-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Special System Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {specialConsiderations.map((consideration, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-white mb-3">{consideration.area}</h4>
              <ul className="space-y-1">
                {consideration.requirements.map((requirement, idx) => (
                  <li key={idx} className="text-sm text-green-200 flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommercialPlanningSection;
