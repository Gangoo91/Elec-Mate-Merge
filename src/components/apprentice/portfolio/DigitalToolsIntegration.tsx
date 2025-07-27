
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Smartphone, Cloud, Camera, FileText, Video } from "lucide-react";

interface DigitalTool {
  name: string;
  category: string;
  description: string;
  features: string[];
  platform: string[];
  cost: "Free" | "Paid" | "Freemium";
  icon: React.ReactNode;
  url: string;
}

const DigitalToolsIntegration = () => {
  const tools: DigitalTool[] = [
    {
      name: "Google Drive",
      category: "Cloud Storage",
      description: "Store and organise your portfolio files in the cloud",
      features: ["15GB free storage", "Document collaboration", "Mobile access", "Version history"],
      platform: ["Web", "iOS", "Android"],
      cost: "Freemium",
      icon: <Cloud className="h-5 w-5" />,
      url: "https://drive.google.com"
    },
    {
      name: "Adobe Creative Cloud",
      category: "Content Creation",
      description: "Professional tools for creating and editing portfolio content",
      features: ["Photo editing", "Video creation", "PDF documents", "Portfolio templates"],
      platform: ["Windows", "Mac", "Mobile"],
      cost: "Paid",
      icon: <Camera className="h-5 w-5" />,
      url: "https://www.adobe.com/uk/creativecloud.html"
    },
    {
      name: "Microsoft 365",
      category: "Documentation",
      description: "Create professional documentation and presentations",
      features: ["Word documents", "PowerPoint presentations", "Excel tracking", "OneDrive storage"],
      platform: ["Web", "Windows", "Mac", "Mobile"],
      cost: "Freemium",
      icon: <FileText className="h-5 w-5" />,
      url: "https://www.microsoft.com/en-gb/microsoft-365"
    },
    {
      name: "Canva",
      category: "Design",
      description: "Create professional-looking portfolio layouts and graphics",
      features: ["Portfolio templates", "Drag-and-drop design", "Photo editing", "Brand consistency"],
      platform: ["Web", "iOS", "Android"],
      cost: "Freemium",
      icon: <Video className="h-5 w-5" />,
      url: "https://www.canva.com"
    }
  ];

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "Free": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Paid": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Freemium": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleLearnMore = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-purple-400 text-base sm:text-lg">Digital Portfolio Tools</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Modern tools to create, organise, and present your portfolio professionally
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tools.map((tool, index) => (
              <div key={index} className="p-3 bg-black/20 rounded-lg border border-purple-500/20">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 bg-purple-500/20 rounded flex-shrink-0">
                      {tool.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-white text-sm truncate">{tool.name}</h4>
                      <p className="text-xs text-muted-foreground">{tool.category}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getCostColor(tool.cost)} flex-shrink-0`}>
                    {tool.cost}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{tool.description}</p>
                
                <div className="mb-2">
                  <span className="text-xs font-medium text-purple-400">Features:</span>
                  <ul className="mt-1 space-y-0.5">
                    {tool.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-purple-400 flex-shrink-0">•</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {tool.features.length > 2 && (
                      <li className="text-xs text-muted-foreground text-purple-400">
                        +{tool.features.length - 2} more features
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">
                    {tool.platform.join(", ")}
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => handleLearnMore(tool.url)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="font-medium text-blue-400 text-sm">Getting Started Tips</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
            <li>• Start with free tools to understand your needs</li>
            <li>• Choose tools that work across your devices</li>
            <li>• Ensure cloud backup for all important files</li>
            <li>• Consider your training provider's preferred formats</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalToolsIntegration;
