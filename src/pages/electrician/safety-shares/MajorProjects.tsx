
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MajorProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Commercial Warehouse Electrical Infrastructure",
      safetyFocus: "Distribution System Design Safety",
      date: "21 Apr 2025",
      summary: "Safety considerations for large-scale industrial electrical distribution systems.",
      location: "Manchester",
      size: "large"
    },
    {
      id: 2,
      title: "School Renovation Electrical Requirements",
      safetyFocus: "Low Voltage Systems in Public Buildings",
      date: "12 Apr 2025",
      summary: "Managing safety in educational environments during renovation work.",
      location: "Birmingham",
      size: "medium"
    },
    {
      id: 3,
      title: "EV Charging Infrastructure Development",
      safetyFocus: "High-Current Installation Safety",
      date: "5 Apr 2025",
      summary: "Risk assessment and safety protocols for installing multiple charging points.",
      location: "London",
      size: "large"
    },
    {
      id: 4,
      title: "Data Center Power Infrastructure",
      safetyFocus: "Redundant Power Systems Safety",
      date: "28 Mar 2025",
      summary: "Critical safety standards for high-reliability electrical systems in data centers.",
      location: "Leeds",
      size: "large"
    },
    {
      id: 5,
      title: "Hospital Wing Electrical Refit",
      safetyFocus: "Medical Facility Electrical Safety",
      date: "15 Mar 2025",
      summary: "Special considerations for electrical work in healthcare facilities with patient safety requirements.",
      location: "Glasgow",
      size: "medium"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Construction className="h-6 w-6 text-green-400" />
            Major Projects
          </h1>
          <p className="text-muted-foreground">
            Safety considerations for upcoming large-scale electrical projects
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => (
          <Card key={project.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
            <div className="h-1 bg-green-500" />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400">
                  {project.size === "large" ? "Major Project" : "Standard Project"}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {project.date}
                </div>
              </div>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <CardDescription className="text-green-400/80">{project.safetyFocus}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{project.summary}</p>
              <div className="text-sm">
                <span className="text-muted-foreground">Location:</span> {project.location}
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline" className="w-full">View Safety Guidelines</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MajorProjects;
