
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, AlertTriangle, Shield, CheckCircle, FileText, Lightbulb, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EducationalResourcesTab = () => {
  const regulations = [
    {
      id: 1,
      title: "BS 7671 (18th Edition) Wiring Regulations",
      category: "Installation Standards",
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
      items: [
        "Risk assessment forms (RAMS)",
        "Method statements for planned work",
        "Equipment inspection certificates",
        "Competency records for team members",
        "Emergency contact information"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="regulations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="regulations">Regulations & Standards</TabsTrigger>
          <TabsTrigger value="guidance">Practical Guidance</TabsTrigger>
          <TabsTrigger value="resources">Additional Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="regulations" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Regulations for Site Assessment</h3>
            <p className="text-muted-foreground text-sm">
              Understanding these regulations helps ensure your assessments meet legal and safety requirements.
            </p>
          </div>
          
          <div className="grid gap-4">
            {regulations.map((regulation) => (
              <Card key={regulation.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-base">{regulation.title}</CardTitle>
                      <Badge variant="outline" className="mt-2 bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        {regulation.category}
                      </Badge>
                    </div>
                    <FileText className="h-5 w-5 text-elec-yellow mt-1" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Key Areas to Focus On
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {regulation.keyAreas.map((area, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1">•</span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-blue-400" />
                      What This Means for You
                    </h4>
                    <p className="text-sm text-muted-foreground">{regulation.whatItMeans}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-purple-400" />
                      Where to Find More Information
                    </h4>
                    <p className="text-sm text-muted-foreground">{regulation.whereToFind}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="guidance" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Practical Assessment Guidance</h3>
            <p className="text-muted-foreground text-sm">
              Real-world tips and checklists to help you conduct thorough and effective site assessments.
            </p>
          </div>
          
          <div className="grid gap-4">
            {practicalGuidance.map((guide, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white text-base flex items-center gap-2">
                    <Shield className="h-5 w-5 text-elec-yellow" />
                    {guide.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{guide.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Additional Learning Resources</h3>
            <p className="text-muted-foreground text-sm">
              Further reading and resources to deepen your understanding of site assessment requirements.
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-blue-500/20 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Official Publications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-white mb-1">IET On-Site Guide</p>
                  <p>Practical guidance for BS 7671 compliance in real-world scenarios.</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-white mb-1">HSE Guidance Notes</p>
                  <p>Detailed safety guidance for electrical work and site management.</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-white mb-1">NICEIC Technical Bulletins</p>
                  <p>Regular updates on electrical installation best practices.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-500/20 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Procedures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-white mb-1">Emergency Contacts</p>
                  <p>Always have emergency services and supervisor contact details readily available.</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-white mb-1">First Aid Procedures</p>
                  <p>Know the location of first aid equipment and qualified first aiders.</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-white mb-1">Evacuation Routes</p>
                  <p>Identify and communicate emergency evacuation procedures to all team members.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Pro Tip: Continuous Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Regulations and best practices evolve regularly. Stay updated by subscribing to industry publications, 
                attending training courses, and participating in professional development activities. Your employer 
                should provide access to the latest versions of all relevant documents and training materials.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalResourcesTab;
