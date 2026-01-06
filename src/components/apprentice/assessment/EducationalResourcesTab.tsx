
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, AlertTriangle, Shield, CheckCircle, FileText, Lightbulb,
  ExternalLink, Scale, Phone, MapPin, GraduationCap, Sparkles
} from "lucide-react";

const EducationalResourcesTab = () => {
  const regulations = [
    {
      id: 1,
      title: "BS 7671 (18th Edition) Wiring Regulations",
      category: "Installation Standards",
      color: "yellow",
      icon: FileText,
      keyAreas: [
        "Protection against electric shock (Section 411)",
        "Isolation and switching procedures (Section 537)",
        "Initial verification requirements (Section 611)",
        "Periodic inspection schedules (Section 651)"
      ],
      whatItMeans: "These regulations ensure all electrical installations are safe and compliant. They specify minimum safety requirements for design, installation, inspection and testing.",
      whereToFind: "Available from IET (Institution of Engineering and Technology) website, technical libraries, and through your employer's document management system."
    },
    {
      id: 2,
      title: "Health and Safety at Work Act 1974",
      category: "Safety Legislation",
      color: "red",
      icon: Shield,
      keyAreas: [
        "Employer duty of care responsibilities",
        "Employee safety obligations",
        "Risk assessment requirements",
        "Incident reporting procedures"
      ],
      whatItMeans: "This act places legal duties on both employers and employees to ensure workplace safety. Failure to comply can result in prosecution and serious penalties.",
      whereToFind: "HSE website (hse.gov.uk), workplace safety handbooks, and your company's health and safety policy documents."
    },
    {
      id: 3,
      title: "Electricity at Work Regulations 1989",
      category: "Electrical Safety",
      color: "blue",
      icon: AlertTriangle,
      keyAreas: [
        "Safe working procedures on electrical systems",
        "Competency requirements for electrical work",
        "Equipment maintenance standards",
        "Isolation and proving procedures"
      ],
      whatItMeans: "These regulations specifically address electrical safety in the workplace. They require that electrical systems are properly maintained and work is only carried out by competent persons.",
      whereToFind: "HSE website, electrical training materials, and workplace electrical safety procedures."
    },
    {
      id: 4,
      title: "CDM Regulations 2015",
      category: "Construction Safety",
      color: "green",
      icon: Scale,
      keyAreas: [
        "Construction phase planning requirements",
        "Health and safety file maintenance",
        "Coordination between trades",
        "Risk assessment documentation"
      ],
      whatItMeans: "These regulations ensure health and safety is properly managed on construction projects. They define roles and responsibilities for all parties involved.",
      whereToFind: "HSE website, construction industry guidance documents, and project-specific health and safety plans."
    }
  ];

  const practicalGuidance = [
    {
      title: "Site Safety Checklist",
      description: "Essential safety checks before starting work",
      color: "green",
      icon: CheckCircle,
      items: [
        "Verify isolation procedures are followed",
        "Check all PPE is available and in good condition",
        "Identify emergency procedures and exits",
        "Confirm hazard identification is complete",
        "Ensure communication systems are working"
      ]
    },
    {
      title: "Common Assessment Issues",
      description: "Frequently encountered problems and solutions",
      color: "orange",
      icon: AlertTriangle,
      items: [
        "Poor lighting conditions - bring additional portable lighting",
        "Damp conditions - use appropriate IP-rated equipment",
        "Confined spaces - ensure rescue procedures are in place",
        "Live equipment nearby - implement additional barriers",
        "Multiple trades working - coordinate activities carefully"
      ]
    },
    {
      title: "Documentation Requirements",
      description: "Essential paperwork for site assessments",
      color: "purple",
      icon: FileText,
      items: [
        "Risk assessment forms (RAMS)",
        "Method statements for planned work",
        "Equipment inspection certificates",
        "Competency records for team members",
        "Emergency contact information"
      ]
    }
  ];

  const officialPublications = [
    { title: "IET On-Site Guide", description: "Practical guidance for BS 7671 compliance in real-world scenarios." },
    { title: "HSE Guidance Notes", description: "Detailed safety guidance for electrical work and site management." },
    { title: "NICEIC Technical Bulletins", description: "Regular updates on electrical installation best practices." }
  ];

  const emergencyProcedures = [
    { title: "Emergency Contacts", description: "Always have emergency services and supervisor contact details readily available." },
    { title: "First Aid Procedures", description: "Know the location of first aid equipment and qualified first aiders." },
    { title: "Evacuation Routes", description: "Identify and communicate emergency evacuation procedures to all team members." }
  ];

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', iconBg: 'from-elec-yellow/20 to-elec-yellow/5', border: 'border-elec-yellow/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', iconBg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30' },
      green: { bg: 'bg-green-500/10', text: 'text-green-400', iconBg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30' },
      red: { bg: 'bg-red-500/10', text: 'text-red-400', iconBg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', iconBg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', iconBg: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30' }
    };
    return configs[color] || configs.yellow;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <GraduationCap className="h-7 w-7 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                Educational <span className="text-purple-400">Resources</span>
              </CardTitle>
              <p className="text-sm text-white/60 mt-1">
                Regulations, Standards & Practical Guidance
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70">
            Understanding these regulations helps ensure your assessments meet legal and safety requirements.
            Access essential resources for conducting thorough and compliant site assessments.
          </p>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="regulations" className="w-full">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-full min-w-max bg-white/10 border border-white/10 p-1 rounded-xl">
            <TabsTrigger
              value="regulations"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-elec-yellow/20 data-[state=active]:to-elec-yellow/10 data-[state=active]:text-elec-yellow data-[state=active]:border-elec-yellow/30 rounded-lg border border-transparent transition-all"
            >
              <Scale className="h-4 w-4 mr-2" />
              Regulations
            </TabsTrigger>
            <TabsTrigger
              value="guidance"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-green-500/10 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 rounded-lg border border-transparent transition-all"
            >
              <Shield className="h-4 w-4 mr-2" />
              Guidance
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-500/10 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 rounded-lg border border-transparent transition-all"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Regulations Tab */}
        <TabsContent value="regulations" className="space-y-6 mt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-elec-yellow/20">
              <Scale className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Key Regulations for Site Assessment</h3>
              <p className="text-sm text-white/60">
                Understanding these regulations helps ensure your assessments meet legal and safety requirements.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {regulations.map((regulation) => {
              const colorConfig = getColorConfig(regulation.color);
              const RegIcon = regulation.icon;
              return (
                <Card key={regulation.id} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 hover:border-white/20 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorConfig.iconBg} border ${colorConfig.border} flex-shrink-0`}>
                          <RegIcon className={`h-5 w-5 ${colorConfig.text}`} />
                        </div>
                        <div>
                          <CardTitle className="text-white text-base sm:text-lg">{regulation.title}</CardTitle>
                          <Badge className={`mt-2 ${colorConfig.bg} ${colorConfig.text} ${colorConfig.border}`}>
                            {regulation.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-green-500/20">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                        </div>
                        Key Areas to Focus On
                      </h4>
                      <ul className="space-y-2">
                        {regulation.keyAreas.map((area, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                            <span className={`w-1.5 h-1.5 ${colorConfig.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-500/20">
                          <Lightbulb className="h-3.5 w-3.5 text-blue-400" />
                        </div>
                        What This Means for You
                      </h4>
                      <p className="text-sm text-white/70">{regulation.whatItMeans}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-purple-500/20">
                          <ExternalLink className="h-3.5 w-3.5 text-purple-400" />
                        </div>
                        Where to Find More Information
                      </h4>
                      <p className="text-sm text-white/70">{regulation.whereToFind}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Guidance Tab */}
        <TabsContent value="guidance" className="space-y-6 mt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Shield className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Practical Assessment Guidance</h3>
              <p className="text-sm text-white/60">
                Real-world tips and checklists to help you conduct thorough and effective site assessments.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {practicalGuidance.map((guide, index) => {
              const colorConfig = getColorConfig(guide.color);
              const GuideIcon = guide.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 hover:border-white/20 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorConfig.iconBg} border ${colorConfig.border}`}>
                        <GuideIcon className={`h-5 w-5 ${colorConfig.text}`} />
                      </div>
                      <div>
                        <span className="text-base sm:text-lg">{guide.title}</span>
                        <p className="text-sm text-white/60 font-normal mt-1">{guide.description}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {guide.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 p-3 rounded-xl bg-white/10 border border-white/10">
                          <div className="p-1.5 rounded-lg bg-green-500/20 flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                          </div>
                          <span className="text-sm text-white/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6 mt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <BookOpen className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Additional Learning Resources</h3>
              <p className="text-sm text-white/60">
                Further reading and resources to deepen your understanding of site assessment requirements.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  Official Publications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {officialPublications.map((pub, index) => (
                  <div key={index} className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <p className="font-medium text-white mb-1">{pub.title}</p>
                    <p className="text-sm text-white/60">{pub.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-red-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30">
                    <Phone className="h-5 w-5 text-red-400" />
                  </div>
                  Emergency Procedures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyProcedures.map((proc, index) => (
                  <div key={index} className="p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                    <p className="font-medium text-white mb-1">{proc.title}</p>
                    <p className="text-sm text-white/60">{proc.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Pro Tip Banner */}
          <Card className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/30">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-300 mb-2">Pro Tip: Continuous Learning</h3>
                  <p className="text-sm text-white/70">
                    Regulations and best practices evolve regularly. Stay updated by subscribing to industry publications,
                    attending training courses, and participating in professional development activities. Your employer
                    should provide access to the latest versions of all relevant documents and training materials.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalResourcesTab;
