
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Wrench, Brain, Settings, FileText, Zap, Ruler, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ElectricianTools = () => {
  // Main tool categories
  const toolCategories = [
    {
      id: "project-management",
      title: "Project Management",
      description: "Organize and track your electrical projects efficiently",
      icon: <Wrench className="h-10 w-10 text-elec-yellow" />,
      link: "#project-management"
    },
    {
      id: "ai-tooling",
      title: "AI Tooling",
      description: "Leverage AI to enhance your electrical work productivity",
      icon: <Brain className="h-10 w-10 text-elec-yellow" />,
      link: "#ai-tooling"
    },
    {
      id: "calculations",
      title: "Calculations",
      description: "Essential calculators for electrical work and planning",
      icon: <Calculator className="h-10 w-10 text-elec-yellow" />,
      link: "#calculations"
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage your electrical business and documentation",
      icon: <Settings className="h-10 w-10 text-elec-yellow" />,
      link: "#admin"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Electrician Tools</h1>
        <p className="text-muted-foreground">
          Professional resources to enhance your efficiency in the field.
        </p>
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

      {/* Tool Details Section */}
      <Tabs defaultValue="calculators" className="space-y-4">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="calculators">Calculators</TabsTrigger>
          <TabsTrigger value="projects">Project Management</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
          <TabsTrigger value="admin">Admin Tools</TabsTrigger>
        </TabsList>
        
        {/* Calculators Tab */}
        <TabsContent value="calculators" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Voltage Drop Calculator</CardTitle>
                </div>
                <CardDescription>
                  Calculate voltage drop in electrical cables based on load and distance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Click to access the voltage drop calculator.</p>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Load Calculator</CardTitle>
                </div>
                <CardDescription>
                  Calculate the total load on a circuit based on connected appliances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Click to access the load calculator.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Power Factor", "Conduit Fill", "Ohm's Law", "Transformer Sizing"].map((calc, i) => (
              <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Calculator className="h-6 w-6 text-elec-yellow mb-2" />
                  <h3 className="font-medium text-sm">{calc}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Calculator</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Project Management Tab */}
        <TabsContent value="projects" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Electrical Workshop</CardTitle>
                  <CardDescription>
                    A used daily toolkit for all electrical jobs.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage your electrical projects efficiently.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* AI Tools Tab */}
        <TabsContent value="ai-tools" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Get help with electrical queries, code compliance, and troubleshooting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Our AI assistant can help you with technical questions and provide guidance based on electrical standards.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Admin Tab */}
        <TabsContent value="admin" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
                Manage your business, invoicing, and client records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Administrative tools for electrical contractors and businesses.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElectricianTools;
