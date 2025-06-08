
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Download, ExternalLink, Video, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const EducationalResourcesTab = () => {
  const regulations = [
    {
      title: "BS 7671:2018+A2:2022 Requirements for Electrical Installations",
      description: "The IET Wiring Regulations - fundamental standard for electrical installation design",
      sections: [
        "Chapter 13: Fundamental principles",
        "Chapter 41: Protection against electric shock",
        "Chapter 61: Initial verification",
        "Chapter 62: Periodic inspection and testing",
        "Chapter 71: Special installations or locations"
      ],
      category: "Primary Standard"
    },
    {
      title: "Health and Safety at Work etc. Act 1974",
      description: "Primary legislation covering occupational health and safety",
      sections: [
        "Section 2: General duties of employers",
        "Section 7: General duties of employees",
        "Section 8: Duty not to interfere with safety provisions"
      ],
      category: "Primary Legislation"
    },
    {
      title: "Electricity at Work Regulations 1989",
      description: "Specific regulations for electrical work safety",
      sections: [
        "Regulation 4: Systems, work activities and protective equipment",
        "Regulation 13: Precautions for work on dead conductors",
        "Regulation 16: Persons to be competent"
      ],
      category: "Specific Regulations"
    },
    {
      title: "CDM Regulations 2015",
      description: "Construction (Design and Management) Regulations",
      sections: [
        "Part 2: Client duties",
        "Part 3: Health and safety duties",
        "Part 4: General requirements",
        "Schedule 2: Welfare facilities"
      ],
      category: "Construction Regulations"
    },
    {
      title: "Management of Health and Safety at Work Regulations 1999",
      description: "Risk assessment and management requirements",
      sections: [
        "Regulation 3: Risk assessment",
        "Regulation 5: Health and safety arrangements",
        "Regulation 13: Capabilities and training"
      ],
      category: "Management Regulations"
    }
  ];

  const bestPractices = [
    {
      category: "Planning & Preparation",
      practices: [
        "Always review drawings and specifications before starting",
        "Confirm electrical supply arrangements and isolation points",
        "Check availability of required materials and tools",
        "Coordinate with other trades to avoid conflicts",
        "Obtain necessary permits and authorisations",
        "Brief all team members on the work scope and hazards"
      ]
    },
    {
      category: "Documentation",
      practices: [
        "Complete risk assessments before commencing work",
        "Record all test results and measurements accurately",
        "Photograph significant conditions or findings",
        "Maintain clear and legible installation records",
        "Update as-built drawings as work progresses",
        "Keep method statements readily available on site"
      ]
    },
    {
      category: "Safety Culture",
      practices: [
        "Challenge unsafe practices regardless of seniority",
        "Report near misses and unsafe conditions",
        "Participate actively in safety briefings",
        "Lead by example in following safety procedures",
        "Continuously monitor changing site conditions",
        "Maintain situational awareness at all times"
      ]
    },
    {
      category: "Quality Assurance",
      practices: [
        "Follow manufacturer's installation instructions",
        "Use appropriate torque settings for connections",
        "Ensure proper cable support and protection",
        "Verify compliance with relevant standards",
        "Conduct thorough inspection before energising",
        "Document any deviations from standard practice"
      ]
    }
  ];

  const downloadableResources = [
    { name: "Site Assessment Checklist Template", type: "PDF", size: "245 KB", category: "Templates" },
    { name: "Risk Assessment Matrix Template", type: "Excel", size: "89 KB", category: "Templates" },
    { name: "Method Statement Template", type: "Word", size: "156 KB", category: "Templates" },
    { name: "Electrical Safety Pocket Guide", type: "PDF", size: "1.2 MB", category: "Guides" },
    { name: "PPE Inspection Checklist", type: "PDF", size: "178 KB", category: "Safety" },
    { name: "Safe Isolation Procedure", type: "PDF", size: "267 KB", category: "Procedures" },
    { name: "Emergency Contact Template", type: "Word", size: "45 KB", category: "Templates" },
    { name: "Tool Inspection Record", type: "Excel", size: "123 KB", category: "Safety" },
    { name: "Environmental Conditions Log", type: "PDF", size: "89 KB", category: "Monitoring" },
    { name: "Installation Certificate Template", type: "PDF", size: "234 KB", category: "Certification" }
  ];

  const trainingResources = [
    {
      title: "Site Assessment Fundamentals",
      duration: "45 minutes",
      type: "Video Course",
      description: "Comprehensive guide to conducting thorough site assessments"
    },
    {
      title: "Risk Assessment Masterclass",
      duration: "1 hour 20 minutes",
      type: "Interactive Course",
      description: "Advanced techniques for identifying and managing electrical hazards"
    },
    {
      title: "Environmental Monitoring",
      duration: "30 minutes",
      type: "Video Tutorial",
      description: "How to assess and monitor environmental conditions for electrical work"
    },
    {
      title: "Documentation Best Practices",
      duration: "25 minutes",
      type: "Tutorial",
      description: "Proper documentation techniques for site assessments"
    }
  ];

  const emergencyContacts = [
    { service: "Emergency Services", number: "999", description: "Fire, Police, Ambulance" },
    { service: "Health and Safety Executive", number: "0845 345 0055", description: "24-hour incident reporting" },
    { service: "Electrical Safety First", number: "020 3463 5100", description: "Electrical safety advice" },
    { service: "Gas Emergency", number: "0800 111 999", description: "Gas leaks and emergencies" },
    { service: "Electricity Networks", number: "105", description: "Power cuts and electrical emergencies" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Educational Resources & Guidance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Comprehensive guidance, regulations, and best practices to support professional site assessment activities.
            These resources help ensure compliance with UK electrical standards and safety regulations.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="regulations" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        <TabsContent value="regulations">
          <div className="space-y-4">
            {regulations.map((reg, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{reg.title}</CardTitle>
                      <p className="text-muted-foreground">{reg.description}</p>
                    </div>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      {reg.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-white mb-2">Key Sections:</h4>
                  <ul className="space-y-1 mb-4">
                    {reg.sections.map((section, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                        {section}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Document
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="best-practices">
          <div className="space-y-4">
            {bestPractices.map((category, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.practices.map((practice, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="downloads">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Downloadable Templates & Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {downloadableResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-white">{resource.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {resource.type} • {resource.size} • {resource.category}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <div className="space-y-4">
            <Card className="border-blue-500/20 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Training Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trainingResources.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-blue-400/20 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-white">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                        <p className="text-xs text-blue-300">{course.type} • {course.duration}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Start Course
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certification Pathways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Complete these courses to earn professional development credits:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Site Assessment Specialist Certification (8 CPD hours)</li>
                  <li>• Risk Management Professional (12 CPD hours)</li>
                  <li>• Environmental Monitoring Expert (6 CPD hours)</li>
                  <li>• Safety Documentation Specialist (4 CPD hours)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emergency">
          <div className="space-y-4">
            <Card className="border-red-500/20 bg-red-500/10">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Emergency Contact Numbers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-red-400/20 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-white">{contact.service}</h4>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                      </div>
                      <span className="text-xl font-bold text-red-300">{contact.number}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-500/10">
              <CardHeader>
                <CardTitle className="text-orange-300">Emergency Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-orange-200 mb-1">Electrical Emergency</h4>
                    <p>1. Isolate power if safe to do so • 2. Call 999 if injury occurred • 3. Administer first aid if trained • 4. Report incident</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-200 mb-1">Fire Emergency</h4>
                    <p>1. Raise alarm • 2. Evacuate area • 3. Call 999 • 4. Meet at assembly point • 5. Do not re-enter until authorised</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-200 mb-1">Serious Injury</h4>
                    <p>1. Ensure area is safe • 2. Call 999 immediately • 3. Provide first aid if trained • 4. Keep casualty warm and comfortable</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalResourcesTab;
