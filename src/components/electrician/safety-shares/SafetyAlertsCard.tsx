
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, ExternalLink, Bell, AlertCircle, Info } from "lucide-react";

interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  location: string;
  datePosted: string;
  source: string;
  category: string;
}

const SafetyAlertsCard = () => {
  const [alerts] = useState<SafetyAlert[]>([
    {
      id: "1",
      title: "Faulty RCD Units - Immediate Action Required",
      description: "Defective RCD units identified in specific batch numbers. Check your installations immediately.",
      severity: "critical",
      location: "UK Wide",
      datePosted: "2024-06-14",
      source: "HSE",
      category: "Product Recall"
    },
    {
      id: "2",
      title: "New Arc Flash Protection Requirements",
      description: "Updated guidance on arc flash protection for commercial installations above 415V.",
      severity: "high", 
      location: "England & Wales",
      datePosted: "2024-06-13",
      source: "IET",
      category: "Regulation Update"
    },
    {
      id: "3",
      title: "Cable Installation Safety Notice",
      description: "Best practices for underground cable installation following recent incidents.",
      severity: "medium",
      location: "Scotland",
      datePosted: "2024-06-12",
      source: "SELECT",
      category: "Safety Guidance"
    },
    {
      id: "4",
      title: "Weather Alert - High Winds Affecting Overhead Work",
      description: "Strong winds forecast across northern regions. Review outdoor electrical work plans.",
      severity: "high",
      location: "Northern England",
      datePosted: "2024-06-11",
      source: "Met Office",
      category: "Weather Alert"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "high": return <AlertCircle className="h-4 w-4" />;
      case "medium": return <Info className="h-4 w-4" />;
      case "low": return <Info className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Latest Safety Alerts</h2>
          <p className="text-muted-foreground">Critical safety warnings and updates from industry bodies</p>
        </div>
        <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Bell className="h-4 w-4 mr-2" />
          Subscribe to Alerts
        </Button>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-elec-yellow/30 text-white">
                      {alert.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg mb-2">
                    {alert.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm mb-3">
                    {alert.description}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(alert.datePosted).toLocaleDateString()}</span>
                  </div>
                  <span>Source: {alert.source}</span>
                </div>
                <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
          Load More Alerts
        </Button>
      </div>
    </div>
  );
};

export default SafetyAlertsCard;
