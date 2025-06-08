
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Shield, Truck, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ToolStorage = () => {
  const isMobile = useIsMobile();
  
  const storageOptions = [
    {
      type: "Toolbox Systems",
      icon: Package,
      options: [
        {
          name: "CK Magma Professional Case",
          price: "£150-250",
          features: ["Modular design", "Weather resistant", "Professional appearance"],
          bestFor: "Site work & client visits"
        },
        {
          name: "DeWalt TSTAK System",
          price: "£80-150",
          features: ["Stackable modules", "Robust construction", "Multiple sizes"],
          bestFor: "Van storage & organisation"
        },
        {
          name: "Wiha Tool Cases",
          price: "£50-120",
          features: ["Precise tool organisation", "Foam inserts", "Compact design"],
          bestFor: "Hand tool storage"
        }
      ]
    },
    {
      type: "Van Storage",
      icon: Truck,
      options: [
        {
          name: "Van Racking Systems",
          price: "£300-800",
          features: ["Custom fit", "Maximises space", "Professional appearance"],
          bestFor: "Mobile electricians"
        },
        {
          name: "Tool Drawers & Cabinets",
          price: "£200-500",
          features: ["Secure storage", "Easy access", "Weather protection"],
          bestFor: "Expensive equipment"
        },
        {
          name: "Cable Reels & Holders",
          price: "£50-150",
          features: ["Organised cable storage", "Easy deployment", "Reduces tangling"],
          bestFor: "Cable management"
        }
      ]
    },
    {
      type: "Workshop Storage",
      icon: Home,
      options: [
        {
          name: "Tool Chests & Cabinets",
          price: "£200-600",
          features: ["Large capacity", "Multiple drawers", "Secure locking"],
          bestFor: "Home workshop"
        },
        {
          name: "Wall-Mounted Systems",
          price: "£100-300",
          features: ["Space efficient", "Easy access", "Customisable layout"],
          bestFor: "Small workshops"
        },
        {
          name: "Pegboard Systems",
          price: "£30-100",
          features: ["Flexible organisation", "Visual tool tracking", "Easy reconfiguration"],
          bestFor: "Hand tool display"
        }
      ]
    },
    {
      type: "Security Solutions",
      icon: Shield,
      options: [
        {
          name: "Van Security Systems",
          price: "£150-400",
          features: ["Deadlocks & alarms", "Tool safes", "Window protection"],
          bestFor: "Theft prevention"
        },
        {
          name: "Tool Insurance",
          price: "£10-50/month",
          features: ["Comprehensive cover", "Replacement costs", "Public liability"],
          bestFor: "Financial protection"
        },
        {
          name: "GPS Tracking",
          price: "£20-80",
          features: ["Real-time location", "Theft alerts", "Recovery assistance"],
          bestFor: "Expensive equipment"
        }
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-elec-yellow mb-2 flex items-center justify-center gap-2">
          <Package className="h-6 w-6" />
          Tool Storage & Organisation
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Proper tool storage protects your investment, improves efficiency, and maintains professional appearance. 
          Choose storage solutions that match your working environment and tool collection size.
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
            <li>• Label everything clearly</li>
            <li>• Keep frequently used tools accessible</li>
            <li>• Create a tool inventory list</li>
            <li>• Check tools before each job</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-500/5 to-elec-yellow/5 border border-blue-500/20 rounded-lg">
          <h3 className="font-medium text-blue-400 mb-2">🔒 Security Best Practices</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Never leave tools visible in vehicles</li>
            <li>• Use multiple security layers</li>
            <li>• Keep receipts for insurance</li>
            <li>• Mark tools with postcode</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-purple-500/5 to-elec-yellow/5 border border-purple-500/20 rounded-lg">
          <h3 className="font-medium text-purple-400 mb-2">💡 Efficiency Hacks</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use foam inserts for organisation</li>
            <li>• Keep spares of essential items</li>
            <li>• Clean tools after each use</li>
            <li>• Regular maintenance schedules</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToolStorage;
