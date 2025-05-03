
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "@/components/apprentice/ResourceCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ApprenticeStudy = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("level2");

  const courseLevels = [
    {
      id: "level2",
      title: "EAL Electrical Level 2",
      description: "Foundation electrical principles and installation techniques",
      modules: [
        {
          id: 1,
          title: "Basic Electrical Theory",
          description: "Core concepts of voltage, current, and resistance",
          progress: 85,
        },
        {
          id: 2,
          title: "Safety Regulations",
          description: "Essential safety practices and regulatory requirements",
          progress: 70,
        },
        {
          id: 3,
          title: "Circuit Design",
          description: "Planning and implementing electrical circuits",
          progress: 40,
        },
        {
          id: 4,
          title: "Wiring Standards",
          description: "Industry-standard wiring techniques and requirements",
          progress: 20,
        },
      ]
    },
    {
      id: "level3",
      title: "EAL Electrical Level 3",
      description: "Advanced electrical installation and commissioning",
      modules: [
        {
          id: 1,
          title: "Complex Circuit Analysis",
          description: "Design and troubleshooting of complex electrical systems",
          progress: 60,
        },
        {
          id: 2,
          title: "Regulations & Standards",
          description: "Detailed exploration of BS 7671 wiring regulations",
          progress: 45,
        },
        {
          id: 3,
          title: "Testing & Commissioning",
          description: "Methodologies for testing electrical installations",
          progress: 30,
        },
        {
          id: 4,
          title: "Fault Diagnosis",
          description: "Techniques for identifying and resolving electrical faults",
          progress: 15,
        },
      ]
    },
    {
      id: "level3moet",
      title: "EAL Level 3 MOET",
      description: "Management of Electrical Technology systems",
      modules: [
        {
          id: 1,
          title: "System Design",
          description: "Design principles for electrical technology systems",
          progress: 40,
        },
        {
          id: 2,
          title: "Project Management",
          description: "Managing electrical installation projects effectively",
          progress: 35,
        },
        {
          id: 3,
          title: "Quality Control",
          description: "Ensuring standards compliance in installations",
          progress: 25,
        },
        {
          id: 4,
          title: "Technology Integration",
          description: "Integrating modern technologies in electrical systems",
          progress: 10,
        },
      ]
    },
    {
      id: "level4",
      title: "EAL Electrical Level 4",
      description: "Higher-level electrical engineering principles",
      modules: [
        {
          id: 1,
          title: "Advanced Electrical Theory",
          description: "Complex electrical principles and applications",
          progress: 30,
        },
        {
          id: 2,
          title: "System Design & Planning",
          description: "Comprehensive electrical system design methodology",
          progress: 20,
        },
        {
          id: 3,
          title: "Regulations Mastery",
          description: "Expert-level understanding of electrical regulations",
          progress: 15,
        },
        {
          id: 4,
          title: "Project Leadership",
          description: "Leading and managing complex electrical projects",
          progress: 5,
        },
      ]
    },
    {
      id: "inspection",
      title: "Inspection & Testing",
      description: "Specialized qualification for electrical inspection procedures",
      modules: [
        {
          id: 1,
          title: "Initial Verification",
          description: "Procedures for testing new electrical installations",
          progress: 50,
        },
        {
          id: 2,
          title: "Periodic Testing",
          description: "Methodologies for routine electrical system inspection",
          progress: 40,
        },
        {
          id: 3,
          title: "Documentation",
          description: "Creating compliant inspection certification and reports",
          progress: 30,
        },
        {
          id: 4,
          title: "Safety & Compliance",
          description: "Ensuring installations meet regulatory requirements",
          progress: 25,
        },
      ]
    },
  ];

  const supplementaryResources = [
    {
      title: "BS 7671 Wiring Regulations",
      description: "Latest 18th Edition regulations reference",
      type: "document" as const,
      duration: "4 hours",
      cta: "Access Document"
    },
    {
      title: "Practical Installation Workshop",
      description: "Video series on proper installation techniques",
      type: "video" as const,
      duration: "6 hours",
      cta: "Watch Series"
    },
    {
      title: "Interactive Circuit Builder",
      description: "Practice building and troubleshooting circuits",
      type: "learning" as const,
      duration: "Self-paced",
      cta: "Start Activity"
    },
  ];

  // Find the selected course level
  const selectedCourse = courseLevels.find(course => course.id === selectedLevel) || courseLevels[0];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Centre</h1>
          <p className="text-muted-foreground">
            Access structured learning paths and study materials for electrical apprentices
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>

      {/* Course Level Selection */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle>EAL Electrical Courses</CardTitle>
          </div>
          <CardDescription>
            Select your course level to access modules and track your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-4">
              {courseLevels.map((level) => (
                <TabsTrigger key={level.id} value={level.id} className="whitespace-normal text-xs md:text-sm">
                  {level.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedLevel} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">{selectedCourse.title}</h2>
                <p className="text-muted-foreground mb-4">{selectedCourse.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCourse.modules.map((module) => (
                  <Card key={module.id} className="border-elec-yellow/20 bg-elec-gray/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Book className="h-6 w-6 text-elec-yellow" />
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                        </div>
                        <span className="text-sm font-medium">{module.progress}%</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{module.description}</CardDescription>
                      <div className="h-2 w-full bg-elec-dark rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-elec-yellow rounded-full" 
                          style={{ width: `${module.progress}%` }} 
                        />
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-elec-yellow">Off-the-job training eligible</span>
                        <Button variant="default" size="sm">Continue</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Supplementary Resources */}
      <Collapsible className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex items-center justify-between w-full">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Supplementary Learning Resources
            </span>
            <span className="text-xs text-elec-yellow">All count toward off-the-job training</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supplementaryResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                type={resource.type}
                duration={resource.duration}
                cta={resource.cta}
                onClick={() => console.log(`Resource clicked: ${resource.title}`)}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ApprenticeStudy;
