
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Shield, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SafetyAlerts = () => {
  const safetyItems = [
    {
      id: 1,
      title: "Working at Height Safety",
      date: "23 Apr 2025",
      summary: "Important reminder about proper ladder use and fall prevention when working at height.",
      severity: "high"
    },
    {
      id: 2,
      title: "Lock Out/Tag Out Procedures",
      date: "12 Apr 2025",
      summary: "Comprehensive guide to proper isolation procedures before working on electrical systems.",
      severity: "high"
    },
    {
      id: 3,
      title: "Asbestos Awareness",
      date: "5 Apr 2025",
      summary: "Updated guidance on identifying potential asbestos-containing materials in pre-2000 buildings.",
      severity: "medium"
    },
    {
      id: 4,
      title: "Arc Flash Prevention",
      date: "28 Mar 2025",
      summary: "Case study of a serious arc flash incident and recommended PPE requirements.",
      severity: "high"
    },
    {
      id: 5,
      title: "Manual Handling Guidelines",
      date: "20 Mar 2025",
      summary: "Updated HSE guidance on safe lifting and moving of electrical equipment and materials.",
      severity: "medium"
    },
    {
      id: 6,
      title: "Confined Space Entry",
      date: "15 Mar 2025",
      summary: "Safety protocols for working in restricted spaces with limited access and ventilation.",
      severity: "high"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            Safety Alerts
          </h1>
          <p className="text-muted-foreground">
            Critical safety notifications and bulletins from industry regulators
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      <Card className="bg-gradient-to-r from-red-900/40 to-red-800/20 border-red-500/30">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="rounded-full bg-red-500/20 p-3">
            <Shield className="h-6 w-6 text-red-400" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-lg font-semibold text-red-400">How to Use Safety Alerts</h2>
            <p className="text-sm text-white/90">
              Review all safety alerts during daily briefings. Document that team members have been informed of relevant alerts and implement required actions.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safetyItems.map(item => (
          <Card key={item.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
            <div className={`h-1 ${
              item.severity === "high" ? "bg-red-500" : 
              item.severity === "medium" ? "bg-amber-500" : 
              "bg-blue-500"
            }`} />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <Badge className={`px-2 py-1 ${
                  item.severity === "high" 
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-400" 
                    : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:text-amber-400"
                }`}>
                  {item.severity === "high" ? "Critical" : "Important"}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {item.date}
                </div>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">Read Full Alert</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SafetyAlerts;
