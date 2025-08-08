import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  FileText, 
  Wrench, 
  Zap,
  Settings,
  BookOpen,
  MapPin,
  Shield,
  ChevronLeft
} from "lucide-react";

const ElectricianTools = () => {
  // Main 2x2 grid - 4 most essential tools
  const mainTools = [
    {
      id: 1,
      title: "Electrical Calculations",
      icon: Calculator,
      link: "/electrician-tools/calculations"
    },
    {
      id: 2,
      title: "Inspection & Testing",
      icon: Zap,
      link: "/electrician-tools/inspection-testing"
    },
    {
      id: 3,
      title: "Install Planner",
      icon: MapPin,
      link: "/electrician-tools/install-planner"
    },
    {
      id: 4,
      title: "Site Safety & RAMS",
      icon: Shield,
      link: "/electrician-tools/site-safety"
    }
  ];

  // Additional tools in smaller grid
  const additionalTools = [
    {
      id: 5,
      title: "Business Admin",
      icon: Settings,
      link: "/electrician-tools/admin"
    },
    {
      id: 6,
      title: "Document Templates",
      icon: FileText,
      link: "/electrician-tools/document-templates"
    },
    {
      id: 7,
      title: "AI Assistant Tools",
      icon: BookOpen,
      link: "/electrician-tools/ai-tooling"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left flex items-center gap-3 justify-center sm:justify-start">
            <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
            Electrical Workshop
          </h1>
          <p className="text-muted-foreground text-center sm:text-left">
            Professional tools and calculators for electrical work
          </p>
        </div>
        <Link to="/electrician" className="flex-shrink-0 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Electrical Hub
          </Button>
        </Link>
      </div>

      {/* Main 2x2 Grid - Essential Tools */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center">Essential Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {mainTools.map((tool) => (
            <Link to={tool.link} key={tool.id} className="focus:outline-none hover-scale">
              <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-col items-center justify-center text-center py-6 md:py-8">
                  <tool.icon className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-elec-yellow" />
                  <CardTitle className="text-base sm:text-lg leading-tight">{tool.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Additional Tools Section */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center">Additional Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {additionalTools.map((tool) => (
            <Link to={tool.link} key={tool.id} className="focus:outline-none hover-scale">
              <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-col items-center justify-center text-center py-4 md:py-6 px-2 md:px-6">
                  <tool.icon className="h-6 w-6 sm:h-8 sm:w-8 mb-2 text-elec-yellow" />
                  <CardTitle className="text-xs sm:text-sm md:text-base leading-tight text-center">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardContent className="p-4 md:p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Professional Tools for Electricians</h3>
            <p className="text-sm text-muted-foreground">
              Access industry-standard calculations, project management tools, and business resources 
              designed specifically for electrical professionals.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricianTools;
