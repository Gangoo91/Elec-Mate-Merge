
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowLeft, 
  Award, 
  BookOpen, 
  Briefcase,
  Building,
  Users,
  ScrollText,
  FileCheck,
  PanelRight,
  GraduationCap as GradCap,
  Certificate
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const CareerProgression = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const careerSections = [
    {
      id: "pathways",
      title: "Career Pathways",
      description: "Explore different career advancement routes in the electrical industry",
      icon: <Briefcase className="h-12 w-12 text-elec-yellow opacity-80" />
    },
    {
      id: "education",
      title: "Education Options",
      description: "Discover courses and learning opportunities for electrical professionals",
      icon: <GraduationCap className="h-12 w-12 text-elec-yellow opacity-80" />
    },
    {
      id: "specializations",
      title: "Specializations",
      description: "High-demand areas to focus your skills and expertise",
      icon: <PanelRight className="h-12 w-12 text-elec-yellow opacity-80" />
    },
    {
      id: "certifications",
      title: "Key Certifications",
      description: "Essential qualifications to advance your electrical career",
      icon: <Certificate className="h-12 w-12 text-elec-yellow opacity-80" />
    },
    {
      id: "resources",
      title: "Industry Resources",
      description: "Tools and organizations to support your professional growth",
      icon: <ScrollText className="h-12 w-12 text-elec-yellow opacity-80" />
    }
  ];

  // Content data - same as your existing data
  const careerPaths = [
    {
      id: 1,
      title: "Electrical Engineer",
      requirements: "Degree in Electrical Engineering + professional experience",
      description: "Design, develop and test electrical equipment and systems for buildings, transportation, or power generation.",
      icon: <Award className="h-8 w-8 text-elec-yellow" />
    },
    {
      id: 2,
      title: "Master Electrician",
      requirements: "Journey-level experience + advanced certification",
      description: "Lead complex installations, manage teams of electricians, and take on supervisory responsibilities.",
      icon: <Briefcase className="h-8 w-8 text-elec-yellow" />
    },
    {
      id: 3,
      title: "Specialist Contractor",
      requirements: "Journey-level experience + business license",
      description: "Start your own electrical contracting business focusing on residential, commercial, or industrial work.",
      icon: <Building className="h-8 w-8 text-elec-yellow" />
    }
  ];

  const educationOptions = [
    {
      id: 1,
      title: "Technical Courses",
      description: "Specialized courses in advanced electrical topics like automation, renewable energy systems, and industrial controls.",
      icon: <BookOpen className="h-8 w-8 text-elec-yellow" />
    },
    {
      id: 2,
      title: "University Degrees",
      description: "Bachelor's and Master's degrees in Electrical Engineering, Building Services, or Energy Management.",
      icon: <GradCap className="h-8 w-8 text-elec-yellow" />
    },
    {
      id: 3,
      title: "Industry Workshops",
      description: "Hands-on workshops focused on emerging technologies and specialized installation techniques.",
      icon: <Users className="h-8 w-8 text-elec-yellow" />
    }
  ];
  
  const specializations = [
    {
      id: 1,
      title: "Renewable Energy",
      description: "Solar panel installation, energy storage systems, and smart grid integration.",
      badge: "High Demand"
    },
    {
      id: 2,
      title: "Industrial Automation",
      description: "PLC programming, SCADA systems, and industrial control panels.",
      badge: "Growing Field"
    },
    {
      id: 3,
      title: "Building Management",
      description: "Smart building systems, BMS implementation, and energy efficiency optimization.",
      badge: "Future Growth"
    },
    {
      id: 4,
      title: "Data Centers",
      description: "Mission-critical power systems, cooling infrastructure, and redundant electrical design.",
      badge: "Specialist Role"
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "18th Edition BS7671 Wiring Regulations",
      level: "Mandatory",
      description: "Essential qualification for all practicing electricians in the UK"
    },
    {
      id: 2,
      title: "Level 3 NVQ Diploma in Electrotechnical Services",
      level: "Advanced",
      description: "Industry-recognized qualification for electricians"
    },
    {
      id: 3,
      title: "Inspection and Testing Certification",
      level: "Specialist",
      description: "Required for testing electrical installations"
    },
    {
      id: 4,
      title: "EV Charger Installation",
      level: "Specialist",
      description: "Certification for installing electric vehicle charging points"
    }
  ];

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case "pathways":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Career Pathways</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {careerPaths.map((path) => (
                <Card key={path.id} className="border-elec-yellow/20 bg-elec-gray h-full">
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    {path.icon}
                    <div>
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <p className="text-sm text-amber-400">{path.requirements}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{path.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "education":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Education Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {educationOptions.map((option) => (
                <Card key={option.id} className="border-elec-yellow/20 bg-elec-gray h-full">
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    {option.icon}
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "specializations":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Specializations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specializations.map((specialization) => (
                <Card key={specialization.id} className="border-elec-yellow/20 bg-elec-gray h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{specialization.title}</CardTitle>
                      <Badge variant="gold" className="text-xs">{specialization.badge}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{specialization.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "certifications":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Key Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded ${
                        cert.level === "Mandatory" 
                          ? "bg-red-500/20 text-red-500" 
                          : cert.level === "Advanced" 
                          ? "bg-blue-500/20 text-blue-500" 
                          : "bg-green-500/20 text-green-500"
                      }`}>
                        {cert.level}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "resources":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Industry Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <Building className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <CardTitle className="text-lg">Professional Associations</CardTitle>
                      <CardDescription>Connect with industry organizations</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mr-2"></span>
                      National Inspection Council for Electrical Installation Contracting (NICEIC)
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mr-2"></span>
                      Electrical Contractors' Association (ECA)
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mr-2"></span>
                      Joint Industry Board (JIB)
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <ScrollText className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <CardTitle className="text-lg">Career Development Resources</CardTitle>
                      <CardDescription>Tools to advance your career</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Resume Builder</p>
                    <Button size="sm" variant="outline">Access</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Interview Preparation</p>
                    <Button size="sm" variant="outline">Access</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Salary Calculator</p>
                    <Button size="sm" variant="outline">Access</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center p-8">
            <GraduationCap className="h-16 w-16 text-elec-yellow mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Choose a Career Path Section</h3>
            <p className="text-muted-foreground">
              Click on one of the boxes above to explore different aspects of your electrical career progression.
            </p>
          </div>
        );
    }
  };

  // Handle back to sections
  const handleBackToSections = () => {
    setActiveSection(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-elec-yellow" />
            Career Progression
          </h1>
          <p className="text-muted-foreground">
            Resources and guidance for advancing your electrical career
          </p>
        </div>
        <Link to="/apprentice/hub">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Apprentice Hub
          </Button>
        </Link>
      </div>

      {activeSection === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerSections.map((section) => (
            <Card 
              key={section.id} 
              className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all duration-200 cursor-pointer h-full"
              onClick={() => setActiveSection(section.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-6">
                <div className="transition-transform group-hover:scale-110">
                  {section.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="mb-4 flex items-center gap-2" 
            onClick={handleBackToSections}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Career Path Sections
          </Button>
          {renderSectionContent()}
        </div>
      )}
    </div>
  );
};

export default CareerProgression;
