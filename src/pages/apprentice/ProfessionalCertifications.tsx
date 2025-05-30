
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, BookOpen, CheckCircle, Zap, Shield, Home, Building } from "lucide-react";

const ProfessionalCertifications = () => {
  const certifications = [
    {
      title: "18th Edition (BS 7671)",
      provider: "Various Approved Providers",
      duration: "3-5 days",
      cost: "£300-£500",
      description: "Essential qualification covering current wiring regulations",
      requirements: ["Basic electrical knowledge", "Previous electrical experience recommended"],
      benefits: ["Legal requirement for electrical work", "Industry standard qualification", "Career progression"],
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      category: "Essential"
    },
    {
      title: "Inspection & Testing (2391-52)",
      provider: "City & Guilds / EAL",
      duration: "5 days + assessment",
      cost: "£800-£1,200",
      description: "Qualification to inspect and test electrical installations",
      requirements: ["Level 3 Electrical qualification", "AM2 or equivalent", "Practical experience"],
      benefits: ["Higher earning potential", "Independent working", "EICR certification"],
      icon: <CheckCircle className="h-6 w-6 text-elec-yellow" />,
      category: "Advanced"
    },
    {
      title: "PAT Testing",
      provider: "Various Providers",
      duration: "1-2 days",
      cost: "£200-£400",
      description: "Portable Appliance Testing certification",
      requirements: ["Basic electrical knowledge", "Understanding of electrical safety"],
      benefits: ["Additional income stream", "Commercial opportunities", "Self-employment option"],
      icon: <Zap className="h-6 w-6 text-elec-yellow" />,
      category: "Specialist"
    },
    {
      title: "Fire Alarm Systems (FIA)",
      provider: "Fire Industry Association",
      duration: "3-5 days",
      cost: "£600-£900",
      description: "Design, installation and maintenance of fire alarm systems",
      requirements: ["Electrical qualification", "Understanding of fire safety"],
      benefits: ["Specialist market access", "High-value projects", "Commercial sector work"],
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      category: "Specialist"
    },
    {
      title: "Smart Home Technology",
      provider: "KNX / Lutron / Control4",
      duration: "2-5 days",
      cost: "£500-£1,500",
      description: "Home automation and smart building systems",
      requirements: ["Electrical qualification", "IT understanding helpful"],
      benefits: ["Growing market", "Premium pricing", "Technology integration"],
      icon: <Home className="h-6 w-6 text-elec-yellow" />,
      category: "Emerging"
    },
    {
      title: "Solar PV Installation (MCS)",
      provider: "Various MCS Providers",
      duration: "3-5 days",
      cost: "£800-£1,200",
      description: "Solar photovoltaic system installation certification",
      requirements: ["Level 3 Electrical", "Working at height certification"],
      benefits: ["Green energy sector", "Government incentives", "Growing demand"],
      icon: <Building className="h-6 w-6 text-elec-yellow" />,
      category: "Green Energy"
    }
  ];

  const categoryColors = {
    "Essential": "bg-red-500/20 text-red-300 border-red-500/30",
    "Advanced": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Specialist": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Emerging": "bg-green-500/20 text-green-300 border-green-500/30",
    "Green Energy": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Certifications</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Enhance your electrical career with additional qualifications and specialist certifications that open new opportunities.
        </p>
        <BackButton customUrl="/apprentice/professional-development" label="Back to Professional Development" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {cert.icon}
                  <div>
                    <CardTitle className="text-lg text-elec-yellow">{cert.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cert.provider}</p>
                  </div>
                </div>
                <Badge className={categoryColors[cert.category as keyof typeof categoryColors]}>
                  {cert.category}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">{cert.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">{cert.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">{cert.cost}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {cert.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {cert.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Choosing the Right Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Priority Order for Apprentices:</h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">1.</span>
                  Complete your Level 3 Electrical Installation qualification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">2.</span>
                  Obtain 18th Edition certification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">3.</span>
                  Pass AM2 practical assessment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">4.</span>
                  Consider Inspection & Testing qualification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">5.</span>
                  Specialise based on career interests
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Financial Considerations:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Check if your employer will fund training
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Look into apprenticeship levy funding
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Consider return on investment for specialist courses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Some certifications may qualify for tax relief
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalCertifications;
