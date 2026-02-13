
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Award, Clock, CheckCircle, Star, ExternalLink, Zap, Shield } from "lucide-react";

const Certifications = () => {
  const quickStats = [
    { label: "Essential Certs", value: "3", icon: CheckCircle, color: "text-red-400", bg: "from-red-500/10 to-red-500/5", border: "border-red-500/30" },
    { label: "Specialist Areas", value: "4", icon: Star, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Advanced Quals", value: "2", icon: Award, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" },
    { label: "Career Focus", value: "100%", icon: Zap, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" }
  ];

  const essentialCertifications = [
    {
      title: "18th Edition IET Wiring Regulations (BS 7671)",
      provider: "City & Guilds / EAL",
      duration: "3 days",
      validity: "Updates every 3-5 years",
      level: "Essential",
      description: "Current wiring regulations - mandatory for all electrical work",
      cost: "£300-500"
    },
    {
      title: "PAT Testing (Portable Appliance Testing)",
      provider: "Various providers",
      duration: "1 day",
      validity: "3 years",
      level: "Essential",
      description: "Test and inspect portable electrical equipment",
      cost: "£150-250"
    },
    {
      title: "Inspection & Testing (2391-52)",
      provider: "City & Guilds",
      duration: "5 days",
      validity: "5 years",
      level: "Essential",
      description: "Initial verification and periodic inspection of electrical installations",
      cost: "£600-800"
    }
  ];

  const specialistCertifications = [
    {
      title: "Solar PV Installation",
      provider: "NICEIC / NAPIT",
      duration: "5 days",
      validity: "5 years",
      level: "Specialist",
      description: "Design and install photovoltaic systems",
      cost: "£800-1200"
    },
    {
      title: "EV Charging Point Installation",
      provider: "NICEIC / NAPIT",
      duration: "2 days",
      validity: "3 years",
      level: "Specialist",
      description: "Install electric vehicle charging equipment",
      cost: "£400-600"
    },
    {
      title: "Smart Meters (SMETS)",
      provider: "Various providers",
      duration: "10 days",
      validity: "5 years",
      level: "Specialist",
      description: "Install and maintain smart metering systems",
      cost: "£1000-1500"
    },
    {
      title: "Fire Alarm Systems (BS 5839)",
      provider: "FIA / BAFE",
      duration: "5 days",
      validity: "3 years",
      level: "Specialist",
      description: "Design, install and maintain fire detection systems",
      cost: "£700-1000"
    }
  ];

  const advancedCertifications = [
    {
      title: "HNC/HND Electrical Engineering",
      provider: "Colleges / Universities",
      duration: "2-3 years part-time",
      validity: "Lifetime",
      level: "Advanced",
      description: "Higher National qualification for career progression",
      cost: "£3000-6000"
    },
    {
      title: "IET Membership (MIET)",
      provider: "Institution of Engineering & Technology",
      duration: "Application process",
      validity: "Annual renewal",
      level: "Professional",
      description: "Professional membership and recognition",
      cost: "£150/year"
    }
  ];

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      Essential: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Essential' },
      Specialist: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Specialist' },
      Advanced: { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', label: 'Advanced' },
      Professional: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Professional' }
    };

    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.Essential;
    return <Badge className={config.color} variant="outline">{config.label}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <Award className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Professional Certifications
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Industry certifications and qualifications for electrical professionals. Plan your certification journey for career success.
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
              <p className="text-xs text-white">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Essential Certifications */}
      <Card className="border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <CheckCircle className="h-5 w-5" />
            Essential Certifications
          </CardTitle>
          <p className="text-sm text-white">
            These certifications are required for most electrical work in the UK
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {essentialCertifications.map((cert, index) => (
              <Card key={index} className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{cert.title}</h3>
                      <p className="text-sm text-white">{cert.provider}</p>
                    </div>
                    {getLevelBadge(cert.level)}
                  </div>
                  <p className="text-sm text-white mb-3">{cert.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-white">Duration:</span>
                      <div className="font-medium text-white">{cert.duration}</div>
                    </div>
                    <div>
                      <span className="text-white">Validity:</span>
                      <div className="font-medium text-white">{cert.validity}</div>
                    </div>
                    <div>
                      <span className="text-white">Cost:</span>
                      <div className="font-medium text-elec-yellow">{cert.cost}</div>
                    </div>
                    <div className="flex items-center">
                      <Button size="sm" variant="outline" className="text-xs border-white/20 text-white hover:bg-white/10">
                        Find Providers
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specialist Certifications */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Star className="h-5 w-5" />
            Specialist Certifications
          </CardTitle>
          <p className="text-sm text-white">
            Expand your expertise into high-demand specialist areas
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {specialistCertifications.map((cert, index) => (
              <Card key={index} className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{cert.title}</h3>
                      <p className="text-sm text-white">{cert.provider}</p>
                    </div>
                    {getLevelBadge(cert.level)}
                  </div>
                  <p className="text-sm text-white mb-3">{cert.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white">Duration:</span>
                      <span className="font-medium text-white">{cert.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Cost:</span>
                      <span className="font-medium text-elec-yellow">{cert.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Qualifications */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Award className="h-5 w-5" />
            Advanced Qualifications
          </CardTitle>
          <p className="text-sm text-white">
            Higher level qualifications for career advancement and professional recognition
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {advancedCertifications.map((cert, index) => (
              <Card key={index} className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{cert.title}</h3>
                      <p className="text-sm text-white">{cert.provider}</p>
                    </div>
                    {getLevelBadge(cert.level)}
                  </div>
                  <p className="text-sm text-white mb-3">{cert.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-white">Duration:</span>
                      <div className="font-medium text-white">{cert.duration}</div>
                    </div>
                    <div>
                      <span className="text-white">Cost:</span>
                      <div className="font-medium text-elec-yellow">{cert.cost}</div>
                    </div>
                    <div className="flex items-center">
                      <Button size="sm" variant="outline" className="text-xs border-white/20 text-white hover:bg-white/10">
                        Learn More
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certification Tips */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Clock className="h-5 w-5" />
            Certification Planning Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-elec-yellow">Plan Ahead</h3>
              <p className="text-sm text-white">
                Many courses book up months in advance. Plan your certification journey early.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-elec-yellow">Check Employer Support</h3>
              <p className="text-sm text-white">
                Many employers will fund training. Check what support is available before booking.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-elec-yellow">Stay Current</h3>
              <p className="text-sm text-white">
                Regulations change regularly. Keep track of when your certifications need renewal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Certifications;
