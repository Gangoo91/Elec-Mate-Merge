
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Clock, GraduationCap, FileText, Phone, AlertTriangle } from "lucide-react";

const ApprenticeRightsTab = () => {
  const rights = [
    {
      category: "Working Time",
      icon: <Clock className="h-5 w-5" />,
      items: [
        "Maximum 48-hour working week (averaged over 17 weeks)",
        "Minimum 20 days paid holiday plus bank holidays", 
        "Rest breaks: 20 minutes if working over 6 hours",
        "11 hours rest between working days",
        "24 hours rest in each 7-day period"
      ]
    },
    {
      category: "Training & Development",
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        "Minimum 20% off-the-job training",
        "Access to structured learning programme",
        "Regular progress reviews and assessments",
        "Qualified mentor or supervisor support",
        "Training costs covered by employer"
      ]
    },
    {
      category: "Health & Safety",
      icon: <Shield className="h-5 w-5" />,
      items: [
        "Safe working environment and equipment",
        "Proper health and safety training",
        "Personal protective equipment (PPE) provided",
        "Right to refuse unsafe work",
        "Access to first aid facilities"
      ]
    },
    {
      category: "Employment Protection",
      icon: <FileText className="h-5 w-5" />,
      items: [
        "Written apprenticeship agreement",
        "Protection against unfair dismissal",
        "Statutory sick pay entitlement",
        "Maternity/paternity leave rights",
        "Right to join a trade union"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Shield className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          These rights are protected by law. If any are being violated, seek help immediately.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {rights.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                {section.icon}
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                    <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Remember:</strong> You have the right to speak up about issues. Document any problems and seek support early.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ApprenticeRightsTab;
