
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Building, Factory, MapPin, ChevronRight, Zap, Star, BookOpen, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const ElectricalInstallationGuides = () => {
  const installationTypes = [
    {
      title: "Domestic Installations",
      icon: Home,
      description: "Residential electrical work including lighting, sockets, and consumer units",
      features: ["Socket circuits", "Lighting circuits", "Cooker circuits", "Shower circuits"],
      path: "/apprentice/on-job-tools/electrical-installation-guides/domestic",
      color: "blue"
    },
    {
      title: "Commercial Installations",
      icon: Building,
      description: "Office buildings, shops, and small commercial premises",
      features: ["Distribution boards", "Emergency lighting", "Fire alarm systems", "Data cabling"],
      path: "/apprentice/on-job-tools/electrical-installation-guides/commercial",
      color: "green"
    },
    {
      title: "Industrial Installations",
      icon: Factory,
      description: "Manufacturing facilities and heavy industrial environments",
      features: ["Motor control", "High voltage systems", "Control panels", "Industrial lighting"],
      path: "/apprentice/on-job-tools/electrical-installation-guides/industrial",
      color: "orange"
    },
    {
      title: "Outdoor Installations",
      icon: MapPin,
      description: "External electrical work and street lighting",
      features: ["Street lighting", "Car park lighting", "External sockets", "Underground cables"],
      path: "/apprentice/on-job-tools/electrical-installation-guides/outdoor",
      color: "purple"
    }
  ];

  const quickStats = [
    { label: "Installation Types", value: "4", icon: Building, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Key Topics", value: "16+", icon: BookOpen, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { label: "Standards", value: "BS 7671", icon: Shield, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" },
    { label: "Career Focus", value: "100%", icon: Star, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" }
  ];

  const getColorClass = (color: string, type: 'border' | 'bg' | 'text') => {
    const colors: { [key: string]: { [key: string]: string } } = {
      blue: { border: 'border-blue-500/30', bg: 'from-blue-500/10 to-blue-500/5', text: 'text-blue-400' },
      green: { border: 'border-green-500/30', bg: 'from-green-500/10 to-green-500/5', text: 'text-green-400' },
      orange: { border: 'border-orange-500/30', bg: 'from-orange-500/10 to-orange-500/5', text: 'text-orange-400' },
      purple: { border: 'border-purple-500/30', bg: 'from-purple-500/10 to-purple-500/5', text: 'text-purple-400' }
    };
    return colors[color]?.[type] || '';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Electrical Installation Guides
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Step-by-step guides for different types of electrical installations. From domestic wiring to industrial systems - comprehensive knowledge for every scenario.
        </p>
        <SmartBackButton />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.border} bg-gradient-to-br ${stat.bg}`}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-white/70">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Installation Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {installationTypes.map((type, index) => (
          <Link key={index} to={type.path} className="group">
            <Card className={`h-full ${getColorClass(type.color, 'border')} bg-gradient-to-br ${getColorClass(type.color, 'bg')} hover:border-white/30 transition-all duration-300 overflow-hidden`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/15 transition-all duration-300`}>
                      <type.icon className={`h-7 w-7 ${getColorClass(type.color, 'text')} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-white group-hover:text-elec-yellow transition-colors duration-300">
                      {type.title}
                    </CardTitle>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">{type.description}</p>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 group-hover:bg-white/8 transition-all">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-elec-yellow/80">Key Areas</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 ${getColorClass(type.color, 'text')} bg-current rounded-full`}></span>
                        <span className="text-sm text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-elec-yellow/60 group-hover:text-elec-yellow transition-colors duration-300">View Guide</span>
                  <div className="flex items-center gap-1 text-elec-yellow/60 group-hover:text-elec-yellow transition-colors duration-300">
                    <Zap className="h-4 w-4" />
                    <span className="text-xs font-medium">Learn More</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Getting Started Card */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/15 to-elec-yellow/5">
        <CardContent className="py-8 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/40">
                <Zap className="h-10 w-10 text-elec-yellow" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Getting Started</h3>
                <p className="text-white/70 max-w-md">
                  New to electrical installations? Start with our beginner-friendly domestic guides and work your way up to more complex systems.
                </p>
              </div>
            </div>
            <Link
              to="/apprentice/on-job-tools/electrical-installation-guides/domestic"
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              Start Learning
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Installation Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/80 leading-relaxed">
            Understanding different installation types is fundamental to your electrical career.
            Each environment presents unique challenges and requirements. Master these guides to become a versatile and skilled electrician.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Start with basics", icon: Home },
              { text: "Learn regulations", icon: Shield },
              { text: "Practice safely", icon: Star }
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                <tip.icon className="h-4 w-4 text-green-400" />
                <span className="text-white/90 text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalInstallationGuides;
