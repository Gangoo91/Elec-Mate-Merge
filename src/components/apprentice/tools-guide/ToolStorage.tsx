
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Shield, Truck, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ToolStorage = () => {
  const isMobile = useIsMobile();
  
  const storageOptions = [
    {
      type: "Portable Tool Storage",
      icon: Package,
      options: [
        {
          name: "Professional Tool Cases",
          price: "£80-200",
          features: ["Weather resistant", "Organised compartments", "Professional appearance"],
          bestFor: "Site work & client visits"
        },
        {
          name: "Modular Tool Systems",
          price: "£60-150",
          features: ["Stackable design", "Multiple configurations", "Easy transport"],
          bestFor: "Van storage & flexibility"
        },
        {
          name: "Tool Bags & Pouches",
          price: "£25-80",
          features: ["Lightweight", "Quick access", "Belt mounting"],
          bestFor: "Daily carry tools"
        }
      ]
    },
    {
      type: "Vehicle Storage",
      icon: Truck,
      options: [
        {
          name: "Van Racking Systems",
          price: "£300-800",
          features: ["Custom fit", "Maximises space", "Secure mounting"],
          bestFor: "Mobile electricians"
        },
        {
          name: "Secure Tool Cabinets",
          price: "£200-500",
          features: ["Lockable storage", "Weather protection", "Organised drawers"],
          bestFor: "Valuable equipment"
        },
        {
          name: "Cable & Material Racks",
          price: "£50-150",
          features: ["Organised storage", "Easy access", "Space efficient"],
          bestFor: "Cable management"
        }
      ]
    },
    {
      type: "Workshop Storage",
      icon: Home,
      options: [
        {
          name: "Tool Chests",
          price: "£150-500",
          features: ["Large capacity", "Multiple drawers", "Secure locking"],
          bestFor: "Home workshop base"
        },
        {
          name: "Wall Storage Systems",
          price: "£50-200",
          features: ["Space saving", "Visual organisation", "Easy access"],
          bestFor: "Workshop walls"
        },
        {
          name: "Mobile Tool Trolleys",
          price: "£100-300",
          features: ["Wheels for mobility", "Multiple levels", "Workspace top"],
          bestFor: "Workshop flexibility"
        }
      ]
    },
    {
      type: "Security & Protection",
      icon: Shield,
      options: [
        {
          name: "Tool Insurance",
          price: "£10-40/month",
          features: ["Theft protection", "Replacement cover", "Public liability"],
          bestFor: "Financial protection"
        },
        {
          name: "Vehicle Security",
          price: "£100-300",
          features: ["Deadlocks", "Alarms", "Visible deterrents"],
          bestFor: "Theft prevention"
        },
        {
          name: "Tool Marking",
          price: "£10-30",
          features: ["UV marking", "Postcode etching", "Identification"],
          bestFor: "Recovery assistance"
        }
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-elec-yellow mb-2 flex items-center justify-center gap-2">
          <Package className="h-6 w-6" />
          Tool Storage Solutions
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Protect your investment with proper storage. Good organisation improves efficiency and maintains professional standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {storageOptions.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-dark/50 hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.type}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {category.options.map((option, optionIndex) => (
                <div key={optionIndex} className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm text-white">{option.name}</h4>
                    <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                      {option.price}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    <strong>Best for:</strong> {option.bestFor}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {option.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex} 
                        variant="secondary" 
                        className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-r from-elec-yellow/5 to-green-500/5 border border-elec-yellow/20 rounded-lg">
          <h3 className="font-medium text-elec-yellow mb-2">📋 Organisation Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Label storage clearly</li>
            <li>• Keep daily tools accessible</li>
            <li>• Maintain tool inventories</li>
            <li>• Regular condition checks</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-500/5 to-elec-yellow/5 border border-blue-500/20 rounded-lg">
          <h3 className="font-medium text-blue-400 mb-2">🔒 Security Essentials</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Never leave tools visible in vehicles</li>
            <li>• Use multiple security measures</li>
            <li>• Keep purchase receipts safe</li>
            <li>• Mark tools for identification</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-purple-500/5 to-elec-yellow/5 border border-purple-500/20 rounded-lg">
          <h3 className="font-medium text-purple-400 mb-2">💡 Efficiency Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Foam inserts for organisation</li>
            <li>• Keep spare consumables</li>
            <li>• Clean tools after use</li>
            <li>• Schedule maintenance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToolStorage;
