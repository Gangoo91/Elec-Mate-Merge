
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Clock, CheckCircle, Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Certifications = () => {
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
      Essential: { color: 'bg-red-500/20 text-red-400', label: 'Essential' },
      Specialist: { color: 'bg-blue-500/20 text-blue-400', label: 'Specialist' },
      Advanced: { color: 'bg-purple-500/20 text-purple-400', label: 'Advanced' },
      Professional: { color: 'bg-green-500/20 text-green-400', label: 'Professional' }
    };

    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.Essential;
    return <Badge className={config.color} variant="outline">{config.label}</Badge>;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Professional Certifications</h1>
          <p className="text-muted-foreground">Industry certifications and qualifications for electrical professionals</p>
        </div>
        <Link to="/apprentice/professional-development" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Professional Development
          </Button>
        </Link>
      </div>

      {/* Essential Certifications */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-red-400" />
            Essential Certifications
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            These certifications are required for most electrical work in the UK
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {essentialCertifications.map((cert, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                    </div>
                    {getLevelBadge(cert.level)}
                  </div>
                  <p className="text-sm text-elec-light/80 mb-3">{cert.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-medium text-white">{cert.duration}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Validity:</span>
                      <div className="font-medium text-white">{cert.validity}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost:</span>
                      <div className="font-medium text-elec-yellow">{cert.cost}</div>
                    </div>
                    <div className="flex items-center">
                      <Button size="sm" variant="outline" className="text-xs">
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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-400" />
            Specialist Certifications
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Expand your expertise into high-demand specialist areas
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {specialistCertifications.map((cert, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                    </div>
                    {getLevelBadge(cert.level)}
                  </div>
                  <p className="text-sm text-elec-light/80 mb-3">{cert.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium text-white">{cert.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost:</span>
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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-400" />
            Advanced Qualifications
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Higher level qualifications for career advancement and professional recognition
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {advancedCertifications.map((cert, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                    </div>
                    {getLevelBadge(cert.level)}
                  </div>
                  <p className="text-sm text-elec-light/80 mb-3">{cert.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-medium text-white">{cert.duration}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost:</span>
                      <div className="font-medium text-elec-yellow">{cert.cost}</div>
                    </div>
                    <div className="flex items-center">
                      <Button size="sm" variant="outline" className="text-xs">
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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Certification Planning Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Plan Ahead</h3>
              <p className="text-sm text-elec-light/80">
                Many courses book up months in advance. Plan your certification journey early.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Check Employer Support</h3>
              <p className="text-sm text-elec-light/80">
                Many employers will fund training. Check what support is available before booking.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Stay Current</h3>
              <p className="text-sm text-elec-light/80">
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
