
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, PlayCircle, FileText, Download, MessageSquare } from "lucide-react";

const LearningResourcesCard = () => {
  const resources = [
    {
      icon: Lightbulb,
      title: "Audio Roleplays",
      description: "Listen to common workplace scenarios and how to navigate them effectively",
      color: "orange"
    },
    {
      icon: FileText,
      title: "Site Checklists",
      description: "Downloadable first-day checklists for new sites and projects",
      color: "green"
    },
    {
      icon: Download,
      title: "Downloadable Resources",
      description: "Pocket guides and reference cards for common workplace situations",
      color: "blue"
    },
    {
      icon: MessageSquare,
      title: "Communication Templates",
      description: "Ready-to-use phrases for difficult workplace conversations",
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "orange": return { bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "bg-orange-500/20 text-orange-400" };
      case "green": return { bg: "bg-green-500/10", border: "border-green-500/20", icon: "bg-green-500/20 text-green-400" };
      case "blue": return { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "bg-blue-500/20 text-blue-400" };
      case "purple": return { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "bg-purple-500/20 text-purple-400" };
      default: return { bg: "bg-elec-yellow/10", border: "border-elec-yellow/20", icon: "bg-elec-yellow/20 text-elec-yellow" };
    }
  };

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-cyan-500/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
            <PlayCircle className="h-5 w-5 text-cyan-400" />
          </div>
          <CardTitle className="text-white">Learning Resources</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const colors = getColorClasses(resource.color);
            const IconComponent = resource.icon;
            return (
              <div key={index} className={`flex items-start gap-3 p-4 rounded-xl ${colors.bg} border ${colors.border} hover:scale-[1.02] transition-transform cursor-pointer`}>
                <div className={`p-2 rounded-lg ${colors.icon} flex-shrink-0`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">{resource.title}</h3>
                  <p className="text-sm text-white/60">{resource.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningResourcesCard;
