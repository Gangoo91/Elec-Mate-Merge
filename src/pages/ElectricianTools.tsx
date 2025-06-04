
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Wrench, Brain, Settings, ArrowLeft, MapPin, TestTube, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ElectricianTools = () => {
  // Main tool categories
  const toolCategories = [
    {
      id: "install-planner",
      title: "Install Planner",
      description: "Plan electrical installations with professional guidance and calculations",
      icon: <MapPin className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/install-planner"
    },
    {
      id: "inspection-testing",
      title: "Inspection & Testing Walkthrough",
      description: "Step-by-step testing procedures with validation and automated reporting",
      icon: <TestTube className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/inspection-testing"
    },
    {
      id: "project-management",
      title: "Project Management",
      description: "Organise and track your electrical projects efficiently",
      icon: <Wrench className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/project-management"
    },
    {
      id: "ai-tooling",
      title: "AI Tooling",
      description: "Leverage AI to enhance your electrical work productivity",
      icon: <Brain className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/ai-tooling"
    },
    {
      id: "calculations",
      title: "Calculations",
      description: "Essential calculators for electrical work and planning",
      icon: <Calculator className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/calculations"
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage your electrical business and documentation",
      icon: <Settings className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/admin"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Electrician Tools</h1>
          <p className="text-muted-foreground">
            Professional resources to enhance your efficiency in the field.
          </p>
        </div>
        <Link to="/electrical-hub">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Electrical Hub
          </Button>
        </Link>
      </div>

      {/* Featured EICR Section */}
      <div className="w-full">
        <Link to="/electrician-tools/eicr-reports">
          <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80 hover:border-elec-yellow/50 transition-all group cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                    <FileText className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                      EICR Reports & Management
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      Create, manage, and export professional Electrical Installation Condition Reports with automated fault detection and BS 7671:2018+A2:2022 compliance.
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-elec-yellow font-medium">Featured Tool</p>
                    <p className="text-xs text-muted-foreground">Click to access</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-elec-yellow group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium">
                  BS 7671 Compliant
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-xs font-medium">
                  Automated Fault Codes
                </span>
                <span className="px-3 py-1 bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 rounded-full text-xs font-medium">
                  PDF Export
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-medium">
                  Live Dashboard
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Tool Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {toolCategories.map((category) => (
          <Link to={category.link} key={category.id}>
            <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="mt-1">{category.description}</CardDescription>
                </div>
                <div className="flex items-center justify-center p-2">
                  {category.icon}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-2 w-full rounded-full bg-elec-dark overflow-hidden">
                  <div className="h-full bg-elec-yellow rounded-full" style={{ width: "75%" }} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ElectricianTools;
