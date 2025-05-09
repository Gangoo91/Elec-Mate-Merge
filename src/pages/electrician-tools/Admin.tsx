
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, ClipboardList, Briefcase, Users, Book, BarChart4, CalendarClock, Calculator, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const handleTool = (tool: string) => {
    toast({
      title: "Tool Selected",
      description: `You've selected the ${tool} tool.`,
    });
  };

  const adminTools = [
    {
      id: 1,
      title: "Document Templates",
      description: "Access professional document templates for electrical contractors",
      icon: <FileText className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/document-templates"
    },
    {
      id: 2,
      title: "Business Management",
      description: "Track clients, invoices, expenses and financial data",
      icon: <ClipboardList className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/business-management"
    },
    {
      id: 3,
      title: "Compliance Manager",
      description: "Track certifications, insurance and compliance requirements",
      icon: <FileCheck className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/compliance"
    },
    {
      id: 4,
      title: "Staff Management",
      description: "Manage staff hours, qualifications and assignments",
      icon: <Users className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/staff-management"
    },
    {
      id: 5,
      title: "Business Analytics",
      description: "View performance metrics and reports for your business",
      icon: <BarChart4 className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/business-analytics"
    },
    {
      id: 6,
      title: "Schedule Manager",
      description: "Manage appointments and schedule electrical jobs",
      icon: <CalendarClock className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/schedule"
    },
    {
      id: 7,
      title: "Financial Tools",
      description: "Calculate profit margins and manage financial aspects",
      icon: <Calculator className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/financial-tools"
    },
    {
      id: 8,
      title: "Quote Library",
      description: "Generate professional quotes for electrical jobs",
      icon: <Book className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/quote-library"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Tools</h1>
          <p className="text-muted-foreground">
            Streamline your electrical business administration and documentation.
          </p>
        </div>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {adminTools.map((tool) => (
          <Link 
            key={tool.id} 
            to={tool.link} 
            onClick={() => handleTool(tool.title)}
            className="block"
          >
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  {tool.icon}
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-elec-light/80">
                  {tool.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Admin;
