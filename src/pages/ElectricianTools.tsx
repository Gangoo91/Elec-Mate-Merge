import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  FileText, 
  Wrench, 
  Search,
  Zap,
  Settings,
  BookOpen,
  TrendingUp,
  MapPin,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ElectricianTools = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const toolCategories = [
    {
      id: "calculations",
      title: "Electrical Calculations",
      description: "Essential calculations for electrical work",
      icon: <Calculator className="h-6 w-6" />,
      path: "/electrician-tools/calculations",
      color: "bg-blue-500/10 border-blue-500/20"
    },
    {
      id: "inspection-testing",
      title: "Inspection & Testing",
      description: "Testing procedures and compliance tools",
      icon: <Zap className="h-6 w-6" />,
      path: "/electrician-tools/inspection-testing",
      color: "bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "install-planner",
      title: "Install Planner",
      description: "Plan electrical installations with load calculations",
      icon: <MapPin className="h-6 w-6" />,
      path: "/electrician-tools/install-planner",
      color: "bg-purple-500/10 border-purple-500/20"
    },
    {
      id: "site-safety",
      title: "Site Safety & RAMS",
      description: "Risk assessments and safety management tools",
      icon: <Shield className="h-6 w-6" />,
      path: "/electrician-tools/site-safety",
      color: "bg-red-500/10 border-red-500/20"
    },
    {
      id: "business-administration",
      title: "Business Administration",
      description: "Complete business management hub for electrical contractors",
      icon: <Settings className="h-6 w-6" />,
      path: "/electrician-tools/admin",
      color: "bg-green-500/10 border-green-500/20"
    },
    {
      id: "document-templates",
      title: "Document Templates",
      description: "Professional templates and forms",
      icon: <FileText className="h-6 w-6" />,
      path: "/electrician-tools/document-templates",
      color: "bg-orange-500/10 border-orange-500/20"
    },
    {
      id: "ai-tooling",
      title: "AI Assistant Tools",
      description: "AI-powered tools for electrical work",
      icon: <BookOpen className="h-6 w-6" />,
      path: "/electrician-tools/ai-tooling",
      color: "bg-pink-500/10 border-pink-500/20"
    }
  ];

  const filteredTools = toolCategories.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
          <Wrench className="h-8 w-8 text-elec-yellow" />
          Electrical Workshop
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Professional tools and calculators for electrical work. Everything you need to work efficiently and safely.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-elec-gray/50 border-elec-yellow/20"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Card 
            key={tool.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${tool.color} bg-elec-gray/50`}
            onClick={() => navigate(tool.path)}
          >
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-elec-yellow/10">
                  {tool.icon}
                </div>
              </div>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center mb-4">
                {tool.description}
              </p>
              <Button 
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(tool.path);
                }}
              >
                Open Tool
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No tools found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all available tools.
          </p>
        </div>
      )}

      {/* Quick Info */}
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardContent className="p-6">
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
