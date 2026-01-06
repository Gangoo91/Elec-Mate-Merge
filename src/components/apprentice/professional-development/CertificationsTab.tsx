
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Clock,
  PoundSterling,
  Building,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Target,
  Sparkles,
  Battery,
  Flame,
  Home,
  Car
} from "lucide-react";

const CertificationsTab = () => {
  const coreCertifications = [
    {
      title: "18th Edition BS 7671",
      provider: "City & Guilds, EAL, NICEIC",
      duration: "3-5 days",
      cost: "£400-600",
      validity: "Valid until 19th Edition",
      description: "Current wiring regulations - essential for all electrical work in the UK",
      icon: Award,
      priority: "Essential",
      renewalRequired: true,
      color: "yellow"
    },
    {
      title: "AM2 Practical Assessment",
      provider: "EAL, City & Guilds",
      duration: "1 day assessment",
      cost: "£300-450",
      validity: "Lifetime",
      description: "Practical skills assessment for newly qualified electricians - industry gateway",
      icon: CheckCircle,
      priority: "Essential",
      renewalRequired: false,
      color: "green"
    },
    {
      title: "Part P Building Regulations",
      provider: "Various training centres",
      duration: "1-2 days",
      cost: "£200-350",
      validity: "Lifetime (knowledge)",
      description: "Domestic electrical work compliance and notification requirements",
      icon: Building,
      priority: "Essential for Domestic",
      renewalRequired: false,
      color: "blue"
    },
    {
      title: "2391 Inspection & Testing",
      provider: "City & Guilds, EAL",
      duration: "5-7 days + assessment",
      cost: "£900-1400",
      validity: "5 years",
      description: "Advanced testing and inspection of electrical installations - career essential",
      icon: Shield,
      priority: "Career Advancement",
      renewalRequired: true,
      color: "purple"
    }
  ];

  const specialistCertifications = [
    {
      category: "Electric Vehicle (EV)",
      icon: Car,
      color: "emerald",
      description: "Fastest growing sector - 45% annual growth",
      certifications: [
        {
          name: "EV Charging Installation",
          provider: "City & Guilds 2919, NICEIC",
          duration: "2-3 days",
          cost: "£600-900",
          demand: "Very High"
        },
        {
          name: "Smart Charging Systems",
          provider: "Various manufacturers",
          duration: "1-2 days",
          cost: "£400-600",
          demand: "High"
        },
        {
          name: "OZEV Grant Installer",
          provider: "OZEV approved",
          duration: "Online + assessment",
          cost: "£200-400",
          demand: "Very High"
        }
      ]
    },
    {
      category: "Battery Storage (BESS)",
      icon: Battery,
      color: "cyan",
      description: "Grid-scale to domestic - 42% growth",
      certifications: [
        {
          name: "Battery Storage Systems",
          provider: "MCS approved centres",
          duration: "2-3 days",
          cost: "£700-1000",
          demand: "Very High"
        },
        {
          name: "G99/G100 Grid Connection",
          provider: "ENA approved",
          duration: "1-2 days",
          cost: "£400-600",
          demand: "High"
        }
      ]
    },
    {
      category: "Heat Pumps",
      icon: Flame,
      color: "orange",
      description: "Net Zero target driving 38% growth",
      certifications: [
        {
          name: "Heat Pump Electrical",
          provider: "MCS approved centres",
          duration: "2-3 days",
          cost: "£600-900",
          demand: "Very High"
        },
        {
          name: "F-Gas Handling Awareness",
          provider: "City & Guilds",
          duration: "1 day",
          cost: "£300-450",
          demand: "High"
        }
      ]
    },
    {
      category: "Solar PV",
      icon: Zap,
      color: "yellow",
      description: "Established market with steady demand",
      certifications: [
        {
          name: "Solar PV Installation",
          provider: "MCS approved centres",
          duration: "3-5 days",
          cost: "£900-1400",
          demand: "High"
        },
        {
          name: "Solar PV Design",
          provider: "City & Guilds 2399",
          duration: "2-3 days",
          cost: "£600-900",
          demand: "Medium"
        }
      ]
    },
    {
      category: "High Voltage",
      icon: AlertCircle,
      color: "red",
      description: "Premium rates - specialist sector",
      certifications: [
        {
          name: "HV Switching Operations",
          provider: "Specialist providers",
          duration: "5 days",
          cost: "£1500-2500",
          demand: "Medium"
        },
        {
          name: "HV Cable Jointing",
          provider: "NPTC approved",
          duration: "10-15 days",
          cost: "£3500-5500",
          demand: "High"
        }
      ]
    },
    {
      category: "Industrial & Automation",
      icon: Building,
      color: "amber",
      description: "Manufacturing and process control",
      certifications: [
        {
          name: "PLC Programming (Siemens)",
          provider: "Siemens approved",
          duration: "5-10 days",
          cost: "£2500-4500",
          demand: "High"
        },
        {
          name: "Motor Control Systems",
          provider: "Various providers",
          duration: "3-5 days",
          cost: "£900-1400",
          demand: "Medium"
        }
      ]
    }
  ];

  const schemeProviders = [
    {
      name: "NICEIC",
      type: "Competent Person Scheme",
      specialities: ["Domestic", "Commercial", "Industrial"],
      benefits: [
        "Self-certification for notifiable work",
        "Technical support helpline",
        "Marketing support materials",
        "Public liability insurance discounts"
      ],
      costs: "£500-900 annually"
    },
    {
      name: "NAPIT",
      type: "Competent Person Scheme",
      specialities: ["Electrical", "Gas", "Renewable"],
      benefits: [
        "Multi-trade registrations available",
        "Competitive annual fees",
        "Technical guidance and support",
        "Business development resources"
      ],
      costs: "£400-750 annually"
    },
    {
      name: "ELECSA",
      type: "Competent Person Scheme",
      specialities: ["Electrical Installation"],
      benefits: [
        "Straightforward registration process",
        "Good customer support",
        "Regular technical updates",
        "Professional recognition"
      ],
      costs: "£450-700 annually"
    }
  ];

  const colorMap: Record<string, { border: string; bg: string; icon: string; iconBg: string; badge: string }> = {
    yellow: {
      border: "border-elec-yellow/20 hover:border-elec-yellow/40",
      bg: "bg-gradient-to-br from-white/5 to-yellow-950/20",
      icon: "text-elec-yellow",
      iconBg: "bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30",
      badge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30"
    },
    green: {
      border: "border-green-500/20 hover:border-green-500/40",
      bg: "bg-gradient-to-br from-white/5 to-green-950/20",
      icon: "text-green-400",
      iconBg: "bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30",
      badge: "bg-green-500/10 text-green-400 border-green-500/30"
    },
    blue: {
      border: "border-blue-500/20 hover:border-blue-500/40",
      bg: "bg-gradient-to-br from-white/5 to-blue-950/20",
      icon: "text-blue-400",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30"
    },
    purple: {
      border: "border-purple-500/20 hover:border-purple-500/40",
      bg: "bg-gradient-to-br from-white/5 to-purple-950/20",
      icon: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    },
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      bg: "bg-gradient-to-br from-white/5 to-emerald-950/20",
      icon: "text-emerald-400",
      iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    },
    cyan: {
      border: "border-cyan-500/20 hover:border-cyan-500/40",
      bg: "bg-gradient-to-br from-white/5 to-cyan-950/20",
      icon: "text-cyan-400",
      iconBg: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
    },
    orange: {
      border: "border-orange-500/20 hover:border-orange-500/40",
      bg: "bg-gradient-to-br from-white/5 to-orange-950/20",
      icon: "text-orange-400",
      iconBg: "bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/30"
    },
    red: {
      border: "border-red-500/20 hover:border-red-500/40",
      bg: "bg-gradient-to-br from-white/5 to-red-950/20",
      icon: "text-red-400",
      iconBg: "bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30",
      badge: "bg-red-500/10 text-red-400 border-red-500/30"
    },
    amber: {
      border: "border-amber-500/20 hover:border-amber-500/40",
      bg: "bg-gradient-to-br from-white/5 to-amber-950/20",
      icon: "text-amber-400",
      iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30"
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colorClasses: Record<string, string> = {
      "Essential": "bg-red-500/10 text-red-400 border-red-500/30",
      "Essential for Domestic": "bg-blue-500/10 text-blue-400 border-blue-500/30",
      "Career Advancement": "bg-purple-500/10 text-purple-400 border-purple-500/30"
    };
    return colorClasses[priority] || colorClasses["Essential"];
  };

  const getDemandBadge = (demand: string) => {
    const colorClasses: Record<string, string> = {
      "Very High": "bg-green-500/10 text-green-400 border-green-500/30",
      "High": "bg-blue-500/10 text-blue-400 border-blue-500/30",
      "Medium": "bg-amber-500/10 text-amber-400 border-amber-500/30"
    };
    return colorClasses[demand] || colorClasses["Medium"];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Award className="h-6 w-6 text-elec-yellow" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-xs font-medium text-elec-yellow uppercase tracking-wider">2026 Certification Guide</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">
              Essential Certifications & Qualifications
            </h2>
            <p className="text-sm text-white/70">
              Plan your certification journey strategically. Core certifications first,
              then specialise in <span className="text-green-400 font-medium">high-growth sectors</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Core Certifications */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Award className="h-5 w-5 text-elec-yellow" />
            </div>
            Core Certifications
          </CardTitle>
          <p className="text-sm text-white/70 mt-1">Essential qualifications for all UK electricians</p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreCertifications.map((cert, index) => {
              const colors = colorMap[cert.color];
              const IconComponent = cert.icon;
              return (
                <div key={index} className={`${colors.bg} ${colors.border} p-4 rounded-xl border transition-all group`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                        <IconComponent className={`h-5 w-5 ${colors.icon}`} />
                      </div>
                      <h4 className="font-medium text-white">{cert.title}</h4>
                    </div>
                    <Badge className={`text-xs ${getPriorityBadge(cert.priority)}`}>
                      {cert.priority}
                    </Badge>
                  </div>

                  <p className="text-sm text-white/70 mb-3">{cert.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white/5 rounded-lg p-2">
                      <span className="text-white/60 block">Provider</span>
                      <p className="text-white font-medium">{cert.provider}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <span className="text-white/60 block">Duration</span>
                      <p className="text-white font-medium">{cert.duration}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <span className="text-white/60 block">Cost</span>
                      <p className="text-green-400 font-medium">{cert.cost}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <span className="text-white/60 block">Validity</span>
                      <p className="text-white font-medium">{cert.validity}</p>
                    </div>
                  </div>

                  {cert.renewalRequired && (
                    <div className="mt-3 flex items-center gap-2 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span className="text-xs text-amber-400">Renewal required - plan ahead</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Specialist Certifications */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <Zap className="h-5 w-5 text-green-400" />
            </div>
            Specialist Certifications
          </CardTitle>
          <p className="text-sm text-white/70 mt-1">High-growth sectors with premium earning potential</p>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-6">
            {specialistCertifications.map((category, index) => {
              const colors = colorMap[category.color];
              const IconComponent = category.icon;
              return (
                <div key={index} className={`${colors.bg} ${colors.border} p-4 rounded-xl border transition-all`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl ${colors.iconBg}`}>
                      <IconComponent className={`h-5 w-5 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                      <p className="text-sm text-white/70">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.certifications.map((cert, certIndex) => (
                      <div key={certIndex} className="bg-white/5 p-3 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white text-sm">{cert.name}</h4>
                          <Badge className={`text-[10px] ${getDemandBadge(cert.demand)}`}>
                            {cert.demand}
                          </Badge>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-white/60">Provider</span>
                            <span className="text-white">{cert.provider}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Duration</span>
                            <span className="text-white">{cert.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Cost</span>
                            <span className="text-green-400 font-medium">{cert.cost}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Competent Person Schemes */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <CheckCircle className="h-5 w-5 text-blue-400" />
            </div>
            Competent Person Schemes
          </CardTitle>
          <p className="text-sm text-white/70 mt-1">Self-certify your work and gain professional recognition</p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schemeProviders.map((provider, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10/50 to-elec-dark/30 p-4 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
                <div className="mb-3">
                  <h4 className="font-semibold text-white mb-1">{provider.name}</h4>
                  <p className="text-sm text-white/70">{provider.type}</p>
                  <Badge className="bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30 text-xs mt-2">
                    {provider.costs}
                  </Badge>
                </div>

                <div className="mb-3">
                  <h5 className="text-sm font-medium text-white/80 mb-2">Specialities</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {provider.specialities.map((spec, specIndex) => (
                      <Badge key={specIndex} variant="outline" className="text-xs bg-white/5 border-white/20 text-white">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-white/80 mb-2">Benefits</h5>
                  <ul className="space-y-1.5">
                    {provider.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-xs text-white/70 flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certification Planning Strategy */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-elec-yellow flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Target className="h-5 w-5 text-elec-yellow" />
            </div>
            Certification Planning Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-elec-yellow text-sm">Priority Order</h3>
              <ol className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-elec-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  Complete core Level 3 qualification and AM2 assessment
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-elec-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  Obtain 18th Edition certification (essential for current work)
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-elec-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  Register with competent person scheme for domestic work
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-elec-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  Add EV/BESS/Heat Pump certifications for growth sectors
                </li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-elec-yellow text-sm">Key Considerations</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <PoundSterling className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Budget £2,000-3,000 for core certifications in year one
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Plan training around work commitments and availability
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Choose specialisations based on local market demand
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Verify training provider credentials and course recognition
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationsTab;
