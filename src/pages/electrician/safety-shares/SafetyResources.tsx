
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CalendarDays, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SafetyResources = () => {
  const resources = [
    {
      id: 1,
      title: "Electrical Safety First Toolbox Talk",
      type: "PDF",
      date: "Apr 2025",
      summary: "Comprehensive guide to electrical safety standards for site work.",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "HSE Working at Height Summary",
      type: "PDF",
      date: "Mar 2025", 
      summary: "Visual guide to ladder safety and working at height regulations.",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Arc Flash Protection Chart",
      type: "PDF",
      date: "Feb 2025",
      summary: "Quick reference guide for arc flash PPE requirements by voltage category.",
      size: "950 KB"
    },
    {
      id: 4,
      title: "EICR Documentation Guide",
      type: "PDF",
      date: "Jan 2025",
      summary: "Template and guide for completing Electrical Installation Condition Reports.",
      size: "3.2 MB"
    },
    {
      id: 5,
      title: "Safe Isolation Procedure Video",
      type: "Video",
      date: "Dec 2024",
      summary: "Step-by-step demonstration of proper electrical isolation procedures.",
      size: "15 min"
    },
    {
      id: 6,
      title: "Risk Assessment Template",
      type: "Excel",
      date: "Nov 2024",
      summary: "Customizable template for electrical work risk assessments.",
      size: "1.1 MB"
    },
    {
      id: 7,
      title: "Method Statement Guide",
      type: "PDF",
      date: "Oct 2024",
      summary: "Template and examples for creating thorough electrical work method statements.",
      size: "2.7 MB"
    },
    {
      id: 8,
      title: "Emergency Response Flowchart",
      type: "PDF",
      date: "Sep 2024",
      summary: "Visual guide for responding to electrical accidents and emergencies.",
      size: "1.4 MB"
    }
  ];

  const resourceTypes = {
    PDF: "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-400",
    Excel: "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400",
    Video: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400"
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-400" />
            Safety Resources
          </h1>
          <p className="text-muted-foreground">
            Downloadable guides, toolbox talks and reference materials
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(resource => (
          <Card key={resource.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
            <div className="h-1 bg-purple-500" />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <Badge className={resourceTypes[resource.type as keyof typeof resourceTypes]}>
                  {resource.type}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {resource.date}
                </div>
              </div>
              <CardTitle className="text-lg truncate">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{resource.summary}</p>
              <div className="text-xs text-muted-foreground">Size: {resource.size}</div>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="default" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Resource
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="text-lg">Request Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Can't find what you're looking for? Let us know what safety resources would help you in your daily work.
          </p>
          <Button className="w-full sm:w-auto">Request Resources</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyResources;
