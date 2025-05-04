
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SafetyShares = () => {
  const safetyItems = [
    {
      id: 1,
      title: "Working at Height Safety",
      type: "Safety Alert",
      date: "23 Apr 2025",
      summary: "Important reminder about proper ladder use and fall prevention when working at height."
    },
    {
      id: 2,
      title: "Cable Strike Prevention",
      type: "Lessons From Experience",
      date: "18 Apr 2025",
      summary: "Account of a recent incident involving an underground cable strike and recommended practices to prevent similar occurrences."
    },
    {
      id: 3,
      title: "Lock Out/Tag Out Procedures",
      type: "Safety Guide",
      date: "12 Apr 2025",
      summary: "Comprehensive guide to proper isolation procedures before working on electrical systems."
    },
    {
      id: 4,
      title: "Asbestos Awareness",
      type: "Safety Alert",
      date: "5 Apr 2025",
      summary: "Updated guidance on identifying potential asbestos-containing materials in pre-2000 buildings."
    },
    {
      id: 5,
      title: "Arc Flash Prevention",
      type: "Lessons From Experience",
      date: "28 Mar 2025",
      summary: "Case study of a serious arc flash incident and recommended PPE requirements."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-elec-yellow" />
            Safety & Industry Updates
          </h1>
          <p className="text-muted-foreground">
            Safety information and lessons from experience
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-red-500 flex items-center gap-2">
          <Shield className="h-5 w-5" /> Safety First
        </h2>
        <p className="mt-2">
          All electrical work must comply with the Electricity at Work Regulations and current BS7671 standards. 
          Always ensure proper isolation procedures before working on electrical systems. If in doubt, don't proceed.
        </p>
      </div>

      <div className="space-y-6">
        {safetyItems.map(item => (
          <Card key={item.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  item.type === "Safety Alert" 
                    ? "bg-red-500/20 text-red-500" 
                    : item.type === "Lessons From Experience" 
                    ? "bg-amber-500/20 text-amber-500" 
                    : "bg-blue-500/20 text-blue-500"
                }`}>
                  {item.type}
                </span>
                <span className="text-sm text-muted-foreground">{item.date}</span>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{item.summary}</p>
              <Button className="w-full">Read Full Report</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SafetyShares;
