
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Calculator, FileCheck, MapPin, CalendarClock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const BusinessManagementTab = () => {
  const coreBusinessTools = [
    {
      title: "Project Management",
      description: "Track electrical projects from quote to completion",
      icon: <Building2 className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/business-management",
      status: "Active"
    },
    {
      title: "Financial Tools",
      description: "Calculate profit margins and manage business finances",
      icon: <Calculator className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/financial-tools",
      status: "Active"
    },
    {
      title: "Compliance Manager",
      description: "Track certifications, insurance and regulatory requirements",
      icon: <FileCheck className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/compliance",
      status: "Active"
    },
    {
      title: "Install Planner",
      description: "Plan electrical installations with load calculations",
      icon: <MapPin className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/install-planner",
      status: "Active"
    },
    {
      title: "Schedule Manager",
      description: "Manage appointments and electrical job scheduling",
      icon: <CalendarClock className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/schedule",
      status: "Active"
    },
    {
      title: "Site Safety & RAMS",
      description: "Risk assessments and safety management tools",
      icon: <Shield className="h-5 w-5 text-elec-yellow" />,
      link: "/electrician-tools/site-safety",
      status: "Active"
    }
  ];

  const businessBenefits = [
    "Reduce administrative time by up to 60%",
    "Improve project profitability tracking",
    "Ensure compliance with electrical regulations",
    "Streamline client communication",
    "Professional documentation templates",
    "Real-time project status tracking"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Core Business Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreBusinessTools.map((tool, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {tool.icon}
                      <h4 className="font-semibold text-white text-sm">{tool.title}</h4>
                    </div>
                    <Badge variant="outline" className="border-green-500/40 text-green-400 text-xs">
                      {tool.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-3">{tool.description}</p>
                  <Link to={tool.link}>
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                      Open Tool
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400">Business Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {businessBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-400">Industry Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <h4 className="font-medium text-white mb-1">Electrical Specific Features</h4>
                <p className="text-muted-foreground text-xs">Tools designed with electrical industry regulations and best practices in mind</p>
              </div>
              <div className="text-sm">
                <h4 className="font-medium text-white mb-1">Compliance Ready</h4>
                <p className="text-muted-foreground text-xs">Built-in templates for BS 7671, Part P notifications, and certification requirements</p>
              </div>
              <div className="text-sm">
                <h4 className="font-medium text-white mb-1">Time Saving</h4>
                <p className="text-muted-foreground text-xs">Reduce paperwork and administrative overhead with automated workflows</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessManagementTab;
