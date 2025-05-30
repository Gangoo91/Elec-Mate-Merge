
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  FileText,
  Home,
  Building,
  Factory,
  Plug,
  Wrench,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle
} from "lucide-react";

const ElectricalInstallationGuides = () => {
  const installationTypes = [
    {
      id: "domestic",
      title: "Domestic Installations",
      icon: <Home className="h-8 w-8 text-elec-yellow" />,
      description: "Residential electrical work including new builds, extensions, and rewires",
      features: ["Full house rewires", "Kitchen installations", "Consumer unit upgrades", "Garden lighting"],
      difficulty: "Intermediate",
      estimatedTime: "2-3 hours read"
    },
    {
      id: "commercial",
      title: "Commercial Installations", 
      icon: <Building className="h-8 w-8 text-elec-yellow" />,
      description: "Office buildings, shops, restaurants and small commercial premises",
      features: ["Office lighting", "Three-phase supplies", "Emergency lighting", "Fire alarm systems"],
      difficulty: "Advanced",
      estimatedTime: "3-4 hours read"
    },
    {
      id: "industrial",
      title: "Industrial Installations",
      icon: <Factory className="h-8 w-8 text-elec-yellow" />,
      description: "Manufacturing facilities, warehouses and heavy-duty electrical systems",
      features: ["Motor control systems", "High bay lighting", "Distribution boards", "Emergency systems"],
      difficulty: "Expert",
      estimatedTime: "4-5 hours read"
    },
    {
      id: "specialist",
      title: "Specialist Installations",
      icon: <Plug className="h-8 w-8 text-elec-yellow" />,
      description: "Solar PV, EV charging, swimming pools and special location installations",
      features: ["Solar PV systems", "EV charging points", "Swimming pools", "Special locations"],
      difficulty: "Advanced",
      estimatedTime: "3-4 hours read"
    }
  ];

  const additionalGuides = [
    {
      id: "tools-materials",
      title: "Tools & Materials Guide",
      icon: <Wrench className="h-8 w-8 text-elec-yellow" />,
      description: "Essential tools, equipment and materials for professional electrical installations",
      features: ["Testing equipment", "Hand tools", "Cable types", "Safety equipment"],
      estimatedTime: "2 hours read"
    },
    {
      id: "bs7671-reference",
      title: "BS 7671 Quick Reference",
      icon: <BookOpen className="h-8 w-8 text-elec-yellow" />,
      description: "Essential sections of the 18th Edition Wiring Regulations",
      features: ["Key standards", "Protection requirements", "Testing procedures", "Special locations"],
      estimatedTime: "1-2 hours read"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-elec-yellow">
          Electrical Installation Guides
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Comprehensive electrical installation guidance for UK electricians. 
          Choose your installation type to access detailed guides with BS 7671 compliance information.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      {/* Installation Types */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            Installation Types
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {installationTypes.map((installation) => (
              <Link key={installation.id} to={`/apprentice/electrical-installation-guides/${installation.id}`}>
                <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 via-elec-gray to-elec-dark/80 hover:bg-elec-yellow/10 transition-all duration-300 h-full cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
                          {installation.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-elec-yellow text-lg flex items-center gap-2 group-hover:gap-3 transition-all">
                            {installation.title}
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className={`text-xs ${
                              installation.difficulty === 'Expert' ? 'border-red-500 text-red-400' :
                              installation.difficulty === 'Advanced' ? 'border-orange-500 text-orange-400' :
                              'border-blue-500 text-blue-400'
                            }`}>
                              {installation.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {installation.estimatedTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4">{installation.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Key Topics:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {installation.features.map((feature, index) => (
                          <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Guides */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {additionalGuides.map((guide) => (
              <Link key={guide.id} to={`/apprentice/electrical-installation-guides/${guide.id}`}>
                <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 via-elec-gray to-elec-dark/80 hover:bg-elec-yellow/10 transition-all duration-300 h-full cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
                          {guide.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-elec-yellow text-lg flex items-center gap-2 group-hover:gap-3 transition-all">
                            {guide.title}
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </CardTitle>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                            <Clock className="h-3 w-3" />
                            {guide.estimatedTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4">{guide.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Includes:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {guide.features.map((feature, index) => (
                          <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Info */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Getting Started</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">For Apprentices</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Start with <strong className="text-orange-300">Domestic Installations</strong> to learn the fundamentals, 
                then progress to commercial and industrial work as you gain experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">For Qualified Electricians</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Use these guides as quick reference materials and to stay updated with the latest 
                <strong className="text-orange-300"> BS 7671 requirements</strong> and best practices.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalInstallationGuides;
