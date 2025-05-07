
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LearningFromExperience = () => {
  const lfeItems = [
    {
      id: 1,
      title: "Cable Strike Incident",
      date: "18 Apr 2025",
      summary: "Account of a recent incident involving an underground cable strike and recommended practices to prevent similar occurrences.",
      type: "Case Study"
    },
    {
      id: 2,
      title: "Distribution Board Flashover",
      date: "10 Apr 2025",
      summary: "Analysis of a flashover incident that occurred during live distribution board work and preventative measures.",
      type: "Incident Report"
    },
    {
      id: 3,
      title: "Improper Isolation Incident",
      date: "2 Apr 2025",
      summary: "Investigation into a near-miss incident where lockout/tagout procedures were not correctly followed.",
      type: "Near Miss"
    },
    {
      id: 4,
      title: "Working Platform Collapse",
      date: "25 Mar 2025",
      summary: "Review of an accident where an improperly assembled scaffold platform failed during electrical installation work.",
      type: "Accident Review"
    },
    {
      id: 5,
      title: "Electrical Fire Prevention",
      date: "15 Mar 2025",
      summary: "Lessons learned from a domestic electrical fire caused by improper terminations and inspection failures.",
      type: "Case Study"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-amber-400" />
            Learning From Experience
          </h1>
          <p className="text-muted-foreground">
            Real-world incidents and valuable lessons for electricians
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {lfeItems.map(item => (
          <Card key={item.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:text-amber-400">
                  {item.type}
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
            <CardFooter className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Key Takeaways</Button>
              <Button size="sm" className="flex-1">Read Full Report</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningFromExperience;
