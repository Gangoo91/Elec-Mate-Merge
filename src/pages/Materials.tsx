
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Zap, Cable, Shield } from "lucide-react";

const Materials = () => {
  const materialCategories = [
    {
      title: "Cables & Wiring",
      description: "High-quality electrical cables and wiring solutions",
      icon: <Cable className="h-8 w-8 text-elec-yellow" />,
      items: ["Twin & Earth Cable", "SWA Cable", "Flex Cable", "Data Cable"]
    },
    {
      title: "Electrical Components",
      description: "Essential electrical components and fittings",
      icon: <Zap className="h-8 w-8 text-elec-yellow" />,
      items: ["Consumer Units", "MCBs", "RCDs", "Isolators"]
    },
    {
      title: "Protection Equipment",
      description: "Safety and protection equipment for electrical installations",
      icon: <Shield className="h-8 w-8 text-elec-yellow" />,
      items: ["Earth Rods", "Surge Protectors", "Fuses", "Circuit Breakers"]
    },
    {
      title: "Installation Accessories",
      description: "Complete range of installation accessories",
      icon: <Package className="h-8 w-8 text-elec-yellow" />,
      items: ["Junction Boxes", "Cable Glands", "Trunking", "Conduit"]
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Materials - Elec-Mate</title>
        <meta name="description" content="Browse and source electrical materials for your projects" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Materials</h1>
          <p className="text-muted-foreground">
            Browse and source electrical materials for your projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materialCategories.map((category, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {category.icon}
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center p-8">
          <p className="text-gray-400">Material sourcing and pricing coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Materials;
