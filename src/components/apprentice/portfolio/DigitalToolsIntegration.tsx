
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
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
      <CardHeader>
        <CardTitle className="text-purple-400">Digital Portfolio Tools</CardTitle>
        <p className="text-sm text-muted-foreground">
          Modern tools to create, organise, and present your portfolio professionally
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-purple-500/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded">
                    {tool.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{tool.name}</h4>
                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                  </div>
                </div>
                <Badge className={`text-xs ${getCostColor(tool.cost)}`}>
                  {tool.cost}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
              
              <div className="mb-3">
                <span className="text-xs font-medium text-purple-400">Key Features:</span>
                <ul className="mt-1 space-y-1">
                  {tool.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                      <span className="text-purple-400">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {tool.platform.join(", ")}
                </span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleLearnMore(tool.url)}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Learn More
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <h5 className="font-medium text-blue-400 mb-2">Getting Started Tips</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Start with free tools to understand your needs</li>
            <li>• Choose tools that work across your devices</li>
            <li>• Ensure cloud backup for all important files</li>
            <li>• Consider your training provider's preferred formats</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalToolsIntegration;
