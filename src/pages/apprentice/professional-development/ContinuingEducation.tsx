
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { BookOpen, Clock, Users, Lightbulb, Zap, Star, TrendingUp, Heart } from "lucide-react";

const ContinuingEducation = () => {
  const quickStats = [
    { label: "Education Options", value: "4+", icon: BookOpen, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Specialist Areas", value: "5+", icon: Star, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { label: "Career Impact", value: "High", icon: TrendingUp, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" },
    { label: "Future Focus", value: "100%", icon: Zap, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" }
  ];

  const educationOptions = [
    {
      title: "HNC/HND in Electrical Engineering",
      provider: "Colleges & Universities",
      duration: "2-3 years part-time",
      level: "Level 4-5",
      icon: BookOpen,
      color: "blue",
      description: "Higher level qualification for career advancement"
    },
    {
      title: "Renewable Energy Courses",
      provider: "Various providers",
      duration: "1-5 days",
      level: "Specialist",
      icon: Lightbulb,
      color: "green",
      description: "Solar PV, heat pumps, and green energy systems"
    },
    {
      title: "Smart Home Technology",
      provider: "Industry providers",
      duration: "2-3 days",
      level: "Emerging",
      icon: Users,
      color: "purple",
      description: "Home automation and IoT electrical systems"
    },
    {
      title: "Electric Vehicle Charging",
      provider: "NICEIC, NAPIT",
      duration: "1-2 days",
      level: "Growing Market",
      icon: Zap,
      color: "yellow",
      description: "EV charging point installation and maintenance"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string; badge: string }> = {
      blue: { border: 'border-blue-500/20', bg: 'from-blue-500/10 to-blue-500/5', text: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-400' },
      green: { border: 'border-green-500/20', bg: 'from-green-500/10 to-green-500/5', text: 'text-green-400', badge: 'bg-green-500/10 text-green-400' },
      purple: { border: 'border-purple-500/20', bg: 'from-purple-500/10 to-purple-500/5', text: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-400' },
      yellow: { border: 'border-elec-yellow/20', bg: 'from-elec-yellow/10 to-elec-yellow/5', text: 'text-elec-yellow', badge: 'bg-elec-yellow/10 text-elec-yellow' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-blue-500/20 rounded-2xl mb-4">
          <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Continuing Education
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Keep your skills current and expand into new areas. The electrical industry is constantly evolving - stay ahead of the curve.
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

      {/* Education Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationOptions.map((option, index) => {
          const colorClasses = getColorClasses(option.color);
          return (
            <Card key={index} className={`${colorClasses.border} bg-gradient-to-br ${colorClasses.bg}`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-white/10 border border-white/20`}>
                    <option.icon className={`h-6 w-6 ${colorClasses.text}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">{option.title}</CardTitle>
                    <p className="text-sm text-white/60">{option.provider}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded w-fit ${colorClasses.badge}`}>
                  {option.level}
                </span>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80">{option.description}</p>
                <div className="flex items-center gap-2">
                  <Clock className={`h-4 w-4 ${colorClasses.text}`} />
                  <span className="text-sm text-white/80">{option.duration}</span>
                </div>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Why Continue Learning */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Why Continue Learning?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-elec-yellow">Stay Current</h3>
              <p className="text-sm text-white/80">
                Technology and regulations are constantly evolving. Continuing education keeps you relevant.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-elec-yellow">Higher Earnings</h3>
              <p className="text-sm text-white/80">
                Specialist skills command premium rates and open doors to better opportunities.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-elec-yellow">Future-Proof Career</h3>
              <p className="text-sm text-white/80">
                Green energy and smart technology are the future of electrical work.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/80 leading-relaxed">
            The best electricians never stop learning. Whether it's keeping up with regulation changes, mastering new technologies, or expanding into specialist areas - continuous development is the key to a successful career.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Stay curious", icon: Lightbulb },
              { text: "Embrace change", icon: TrendingUp },
              { text: "Invest in yourself", icon: Star }
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

export default ContinuingEducation;
