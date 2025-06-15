
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Download, FileText, Video, BookOpen, Users, Calendar, Star } from "lucide-react";

interface SafetyResource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "video" | "template" | "checklist" | "training" | "toolbox-talk";
  category: string;
  downloadCount: number;
  rating: number;
  lastUpdated: string;
  duration?: string;
  fileSize?: string;
}

const SafetyResourcesCard = () => {
  const [resources] = useState<SafetyResource[]>([
    {
      id: "1",
      title: "Safe Isolation Procedures Guide",
      description: "Comprehensive guide to safe isolation procedures for electrical work, including step-by-step instructions and safety checks.",
      type: "guide",
      category: "Safe Working",
      downloadCount: 2341,
      rating: 4.8,
      lastUpdated: "2024-06-10",
      fileSize: "2.4 MB"
    },
    {
      id: "2",
      title: "Arc Flash Risk Assessment Training",
      description: "Interactive video training module covering arc flash hazards, risk assessment, and protection measures.",
      type: "video",
      category: "Training",
      downloadCount: 1567,
      rating: 4.9,
      lastUpdated: "2024-06-08",
      duration: "45 min"
    },
    {
      id: "3",
      title: "Daily Safety Checklist Template",
      description: "Customisable daily safety checklist for electrical contractors and site supervisors.",
      type: "template",
      category: "Documentation",
      downloadCount: 3422,
      rating: 4.7,
      lastUpdated: "2024-06-05",
      fileSize: "156 KB"
    },
    {
      id: "4",
      title: "PPE Inspection Checklist",
      description: "Monthly PPE inspection checklist to ensure all safety equipment meets required standards.",
      type: "checklist",
      category: "PPE",
      downloadCount: 1789,
      rating: 4.6,
      lastUpdated: "2024-06-03",
      fileSize: "234 KB"
    },
    {
      id: "5",
      title: "Toolbox Talk: Working at Height",
      description: "Ready-to-use toolbox talk on electrical work at height, including ladder safety and access equipment.",
      type: "toolbox-talk",
      category: "Toolbox Talks",
      downloadCount: 2156,
      rating: 4.8,
      lastUpdated: "2024-05-30",
      fileSize: "1.1 MB"
    },
    {
      id: "6",
      title: "Emergency Response Procedures",
      description: "Step-by-step emergency response procedures for electrical incidents and first aid guidance.",
      type: "guide",
      category: "Emergency",
      downloadCount: 987,
      rating: 4.9,
      lastUpdated: "2024-05-28",
      fileSize: "3.2 MB"
    }
  ]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "guide": return <BookOpen className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "template": return <FileText className="h-5 w-5" />;
      case "checklist": return <FileText className="h-5 w-5" />;
      case "training": return <Users className="h-5 w-5" />;
      case "toolbox-talk": return <Users className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "video": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "template": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "checklist": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "training": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "toolbox-talk": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Safety Resources</h2>
          <p className="text-muted-foreground">Essential safety guides, training materials, and toolbox talks</p>
        </div>
        <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Shield className="h-4 w-4 mr-2" />
          Request Resource
        </Button>
      </div>

      <div className="grid gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-elec-yellow/20 rounded-lg text-elec-yellow">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {resource.type.replace("-", " ").toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-elec-yellow/30 text-white">
                        {resource.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-lg mb-2">
                      {resource.title}
                    </CardTitle>
                    <p className="text-gray-300 text-sm">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{resource.downloadCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(resource.rating)}
                    <span className="ml-1">({resource.rating})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(resource.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  {resource.duration && (
                    <span>{resource.duration}</span>
                  )}
                  {resource.fileSize && (
                    <span>{resource.fileSize}</span>
                  )}
                </div>
                <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
          Browse All Resources
        </Button>
      </div>
    </div>
  );
};

export default SafetyResourcesCard;
