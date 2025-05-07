
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
  FileCheck
} from "lucide-react";
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
      id: "courses",
      title: "Career Courses",
      description: "Professional courses to enhance your electrical career skills",
      icon: <BookOpen className="h-12 w-12 text-elec-yellow opacity-80" />
    },
    {
      id: "education",
      title: "Further Education",
      description: "Degrees and advanced learning opportunities for electrical professionals",
      icon: <GraduationCap className="h-12 w-12 text-elec-yellow opacity-80" />
    },
    {
      id: "accreditation",
      title: "Professional Accreditation",
      description: "Essential qualifications and certifications for career advancement",
      icon: <Award className="h-12 w-12 text-elec-yellow opacity-80" />
    },
    {
      id: "business",
      title: "Business Builder",
      description: "Resources and guidance for starting your own electrical business",
      icon: <Building className="h-12 w-12 text-elec-yellow opacity-80" />
    }
  ];

  // Pathways content
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
      requirements: "Journey-level experience + business licence",
      description: "Start your own electrical contracting business focusing on residential, commercial, or industrial work.",
      icon: <Building className="h-8 w-8 text-elec-yellow" />
    }
  ];

  // Courses content
  const careerCourses = [
    {
      id: 1,
      title: "18th Edition Wiring Regulations",
      provider: "NICEIC",
      description: "Essential course covering the latest BS7671 electrical regulations for all UK installations.",
      duration: "3 days"
    },
    {
      id: 2,
      title: "Inspection & Testing",
      provider: "City & Guilds",
      description: "Learn how to properly test and verify electrical installations to industry standards.",
      duration: "5 days"
    },
    {
      id: 3,
      title: "Electric Vehicle Charging",
      provider: "ECA",
      description: "Specialised training for installing and maintaining EV charging points.",
      duration: "2 days"
    }
  ];
  
  // Education content
  const educationOptions = [
    {
      id: 1,
      title: "HNC in Electrical Engineering",
      institution: "UK Colleges",
      description: "Higher National Certificate qualification providing advanced electrical theory and practice.",
      level: "Level 4"
    },
    {
      id: 2,
      title: "Bachelor's Degree",
      institution: "Universities",
      description: "BEng or BSc in Electrical Engineering, Building Services, or Energy Management.",
      level: "Level 6"
    },
    {
      id: 3,
      title: "Master's Degree",
      institution: "Universities",
      description: "MEng or MSc specialising in power systems, renewable energy, or building services.",
      level: "Level 7"
    }
  ];

  // Accreditation content
  const professionalAccreditations = [
    {
      id: 1,
      title: "IET Membership",
      level: "Professional",
      description: "Membership of the Institution of Engineering and Technology, providing recognition of professional competence."
    },
    {
      id: 2,
      title: "Chartered Engineer (CEng)",
      level: "Advanced",
      description: "Prestigious qualification demonstrating high-level competence and commitment to engineering."
    },
    {
      id: 3,
      title: "ECA Membership",
      level: "Industry",
      description: "Electrical Contractors' Association membership, vital for commercial credibility."
    }
  ];

  // Business builder content
  const businessResources = [
    {
      id: 1,
      title: "Business Start-up Kit",
      description: "Templates and resources for establishing your electrical contracting business, including business plans and marketing strategies."
    },
    {
      id: 2,
      title: "Contractor Certification",
      description: "Information on becoming NICEIC, NAPIT, or ELECSA approved, essential for gaining customer trust."
    },
    {
      id: 3,
      title: "Accounting & Tax Guidance",
      description: "Financial management resources specifically for electrical contractors and small businesses."
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
      case "courses":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Career Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {careerCourses.map((course) => (
                <Card key={course.id} className="border-elec-yellow/20 bg-elec-gray h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <p className="text-sm text-amber-400">Provider: {course.provider}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">{course.description}</p>
                    <div className="text-sm bg-elec-dark/30 p-2 rounded-md inline-block">
                      Duration: {course.duration}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "education":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Further Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {educationOptions.map((option) => (
                <Card key={option.id} className="border-elec-yellow/20 bg-elec-gray h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <p className="text-sm text-amber-400">{option.institution}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">{option.description}</p>
                    <div className="text-sm bg-elec-dark/30 p-2 rounded-md inline-block">
                      {option.level}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "accreditation":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Professional Accreditation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {professionalAccreditations.map((cert) => (
                <Card key={cert.id} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded ${
                        cert.level === "Professional" 
                          ? "bg-blue-500/20 text-blue-500" 
                          : cert.level === "Advanced" 
                          ? "bg-green-500/20 text-green-500" 
                          : "bg-amber-500/20 text-amber-500"
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
      case "business":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Business Builder</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businessResources.map((resource) => (
                <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <FileCheck className="h-6 w-6 text-elec-yellow" />
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{resource.description}</p>
                  </CardContent>
                </Card>
              ))}
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
