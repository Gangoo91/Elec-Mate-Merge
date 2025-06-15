
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, MapPin, ExternalLink, Bell, Search, Filter, Bookmark, Star, Eye, ThumbsUp } from "lucide-react";

interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  location: string;
  datePosted: string;
  source: string;
  category: string;
  views: number;
  likes: number;
  bookmarked: boolean;
  rating: number;
}

const EnhancedSafetyAlertsCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [alerts, setAlerts] = useState<SafetyAlert[]>([
    {
      id: "1",
      title: "Faulty RCD Units - Immediate Action Required",
      description: "Defective RCD units identified in specific batch numbers. Check your installations immediately.",
      severity: "critical",
      location: "UK Wide",
      datePosted: "2024-06-14",
      source: "HSE",
      category: "Product Recall",
      views: 3421,
      likes: 89,
      bookmarked: false,
      rating: 4.8
    },
    {
      id: "2",
      title: "New Arc Flash Protection Requirements",
      description: "Updated guidance on arc flash protection for commercial installations above 415V.",
      severity: "high",
      location: "England & Wales",
      datePosted: "2024-06-13",
      source: "IET",
      category: "Regulation Update",
      views: 2156,
      likes: 67,
      bookmarked: true,
      rating: 4.6
    },
    {
      id: "3",
      title: "Cable Installation Safety Notice",
      description: "Best practices for underground cable installation following recent incidents.",
      severity: "medium",
      location: "Scotland",
      datePosted: "2024-06-12",
      source: "SELECT",
      category: "Safety Guidance",
      views: 1834,
      likes: 45,
      bookmarked: false,
      rating: 4.4
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

  const toggleBookmark = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, bookmarked: !alert.bookmarked }
        : alert
    ));
  };

  const handleLike = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, likes: alert.likes + 1 }
        : alert
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-600"
        }`}
      />
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity;
    const matchesCategory = selectedCategory === "all" || alert.category === selectedCategory;
    
    return matchesSearch && matchesSeverity && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Enhanced Safety Alerts</h2>
          <p className="text-muted-foreground">Interactive safety alerts with ratings, bookmarks, and real-time tracking</p>
        </div>
        <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Bell className="h-4 w-4 mr-2" />
          Subscribe to Alerts
        </Button>
      </div>

      {/* Enhanced Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-elec-dark/50 border-elec-yellow/30"
              />
            </div>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Product Recall">Product Recall</SelectItem>
                <SelectItem value="Regulation Update">Regulation Update</SelectItem>
                <SelectItem value="Safety Guidance">Safety Guidance</SelectItem>
                <SelectItem value="Weather Alert">Weather Alert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-elec-yellow/30 text-white">
                      {alert.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {renderStars(alert.rating)}
                      <span className="text-xs text-muted-foreground ml-1">({alert.rating})</span>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg mb-2">
                    {alert.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm mb-3">
                    {alert.description}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => toggleBookmark(alert.id)}
                  className={alert.bookmarked ? "text-elec-yellow" : "text-gray-400"}
                >
                  <Bookmark className={`h-4 w-4 ${alert.bookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{alert.views.toLocaleString()}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLike(alert.id)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-elec-yellow"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{alert.likes}</span>
                  </Button>
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

      {filteredAlerts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No alerts found matching your search criteria.
        </div>
      )}

      <div className="text-center pt-4">
        <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
          Load More Alerts
        </Button>
      </div>
    </div>
  );
};

export default EnhancedSafetyAlertsCard;
