
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Zap, Cable, Shield } from "lucide-react";

const Materials = () => {
  const materialCategories = [
    {
      title: "Cables & Wiring",
      description: "High-quality electrical cables and wiring solutions",
      icon: <Cable className="h-6 w-6 text-elec-yellow" />,
      items: ["Twin & Earth Cable", "SWA Cable", "Flex Cable", "Data Cable"]
    },
    {
      title: "Electrical Components", 
      description: "Essential electrical components and fittings",
      icon: <Zap className="h-6 w-6 text-elec-yellow" />,
      items: ["Consumer Units", "MCBs", "RCDs", "Isolators"]
    },
    {
      title: "Protection Equipment",
      description: "Safety and protection equipment for electrical installations", 
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      items: ["Earth Rods", "Surge Protectors", "Fuses", "Circuit Breakers"]
    },
    {
      title: "Installation Accessories",
      description: "Complete range of installation accessories",
      icon: <Package className="h-6 w-6 text-elec-yellow" />,
      items: ["Junction Boxes", "Cable Glands", "Trunking", "Conduit"]
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Materials - Elec-Mate</title>
        <meta name="description" content="Browse and source electrical materials for your projects" />
      </Helmet>
      
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Materials</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Browse electrical materials for your projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {materialCategories.map((category, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  {category.icon}
                  {category.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-sm text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Material sourcing and pricing features coming soon
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Materials;
