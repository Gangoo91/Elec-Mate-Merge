
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
  Target
} from "lucide-react";

const CertificationsTab = () => {
  const coreCertifications = [
    {
      title: "18th Edition BS 7671",
      provider: "Multiple providers",
      duration: "3-5 days",
      cost: "£400-600",
      validity: "Valid until 19th Edition",
      description: "Current wiring regulations - essential for all electrical work",
      icon: <Award className="h-6 w-6 text-elec-yellow" />,
      priority: "Essential",
      renewalRequired: true
    },
    {
      title: "AM2 Practical Assessment",
      provider: "EAL, City & Guilds",
      duration: "1 day assessment",
      cost: "£300-400",
      validity: "Lifetime",
      description: "Practical skills assessment for newly qualified electricians",
      icon: <CheckCircle className="h-6 w-6 text-green-400" />,
      priority: "Essential",
      renewalRequired: false
    },
    {
      title: "Part P Building Regulations",
      provider: "Various training centres",
      duration: "1-2 days",
      cost: "£200-350",
      validity: "Lifetime (knowledge)",
      description: "Domestic electrical work compliance and notification requirements",
      icon: <Building className="h-6 w-6 text-blue-400" />,
      priority: "Essential for Domestic",
      renewalRequired: false
    },
    {
      title: "2391 Inspection & Testing",
      provider: "Multiple providers",
      duration: "5 days + assessment",
      cost: "£800-1200",
      validity: "5 years",
      description: "Advanced testing and inspection of electrical installations",
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      priority: "Career Advancement",
      renewalRequired: true
    }
  ];

  const specialistCertifications = [
    {
      category: "Renewable Energy",
      icon: <Zap className="h-6 w-6 text-green-500" />,
      certifications: [
        {
          name: "Solar PV Installation",
          provider: "MCS approved centres",
          duration: "3-5 days",
          cost: "£800-1200",
          demand: "High"
        },
        {
          name: "Battery Storage Systems",
          provider: "Various providers",
          duration: "2-3 days", 
          cost: "£600-900",
          demand: "Growing"
        },
        {
          name: "Heat Pump Electrical",
          provider: "MCS approved centres",
          duration: "2-3 days",
          cost: "£500-800",
          demand: "Very High"
        }
      ]
    },
    {
      category: "High Voltage",
      icon: <AlertCircle className="h-6 w-6 text-red-400" />,
      certifications: [
        {
          name: "HV Switching",
          provider: "Specialist providers",
          duration: "5 days",
          cost: "£1500-2000",
          demand: "Medium"
        },
        {
          name: "HV Cable Jointing",
          provider: "NPTC approved",
          duration: "10-15 days",
          cost: "£3000-5000",
          demand: "High"
        }
      ]
    },
    {
      category: "Industrial Systems",
      icon: <Building className="h-6 w-6 text-amber-400" />,
      certifications: [
        {
          name: "PLC Programming",
          provider: "Siemens, Allen Bradley",
          duration: "5-10 days",
          cost: "£2000-4000",
          demand: "High"
        },
        {
          name: "Motor Control Systems",
          provider: "Various providers",
          duration: "3-5 days",
          cost: "£800-1200",
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
      costs: "£500-800 annually"
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
      costs: "£400-700 annually"
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
      costs: "£450-650 annually"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const colorMap: Record<string, string> = {
      "Essential": "bg-red-500/20 text-red-400 border-red-500/30",
      "Essential for Domestic": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Career Advancement": "bg-purple-500/20 text-purple-400 border-purple-500/30"
    };

    return (
      <Badge className={`${colorMap[priority]} text-xs`}>
        {priority}
      </Badge>
    );
  };

  const getDemandBadge = (demand: string) => {
    const colorMap: Record<string, string> = {
      "Very High": "bg-green-500/20 text-green-400 border-green-500/30",
      "High": "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
      "Growing": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Medium": "bg-amber-500/20 text-amber-400 border-amber-500/30"
    };

    return (
      <Badge className={`${colorMap[demand]} text-xs`}>
        {demand} Demand
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Essential Certifications & Qualifications</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Understanding the certification landscape helps you plan your professional development 
          and meet industry requirements. Focus on core certifications first, then specialise based on your career goals.
        </p>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Core Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreCertifications.map((cert, index) => (
              <div key={index} className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {cert.icon}
                    <h4 className="font-medium text-white">{cert.title}</h4>
                  </div>
                  {getPriorityBadge(cert.priority)}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Provider:</span>
                    <p className="text-white">{cert.provider}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="text-white">{cert.duration}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cost:</span>
                    <p className="text-white">{cert.cost}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Validity:</span>
                    <p className="text-white">{cert.validity}</p>
                  </div>
                </div>
                
                {cert.renewalRequired && (
                  <div className="mt-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-xs text-amber-300">Renewal required</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Specialist Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {specialistCertifications.map((category, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.certifications.map((cert, certIndex) => (
                    <div key={certIndex} className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white text-sm">{cert.name}</h4>
                        {getDemandBadge(cert.demand)}
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Provider:</span>
                          <span className="text-white">{cert.provider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="text-white">{cert.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost:</span>
                          <span className="text-white">{cert.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Competent Person Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemeProviders.map((provider, index) => (
              <div key={index} className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                <div className="mb-3">
                  <h4 className="font-medium text-white mb-1">{provider.name}</h4>
                  <p className="text-sm text-muted-foreground">{provider.type}</p>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs mt-2">
                    {provider.costs}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-white mb-1">Specialities</h5>
                  <div className="flex flex-wrap gap-1">
                    {provider.specialities.map((spec, specIndex) => (
                      <Badge key={specIndex} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Benefits</h5>
                  <ul className="space-y-1">
                    {provider.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
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

      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-purple-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Certification Planning Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-elec-yellow">Priority Order</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
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
                  Register with competent person scheme if doing domestic work
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-elec-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  Add specialist certifications based on career direction
                </li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-elec-yellow">Key Considerations</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <PoundSterling className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Budget for ongoing renewal costs and recertification
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Plan training around work commitments and course availability
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
