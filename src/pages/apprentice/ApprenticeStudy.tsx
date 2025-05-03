
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, GraduationCap, School } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeStudy = () => {
  const courseCategories = [
    {
      id: "eal",
      title: "EAL Courses",
      description: "Electrical and technical qualifications certified by Excellence, Achievement & Learning",
      icon: Book,
      courses: [
        "Electrical Level 2",
        "Electrical Level 3",
        "Level 3 MOET",
        "Electrical Level 4",
        "Inspection & Testing"
      ]
    },
    {
      id: "cityGuilds",
      title: "City & Guilds Courses",
      description: "Industry-standard vocational qualifications for electrical professionals",
      icon: GraduationCap,
      courses: [
        "Level 2 Electrical",
        "Level 3 Electrical",
        "Level 2 Plumbing",
        "Level 3 Plumbing"
      ]
    },
    {
      id: "higher",
      title: "Higher Learning Courses",
      description: "Advanced qualification courses including HNC, HND and degree-level studies",
      icon: School,
      courses: [
        "HNC Electrical Engineering",
        "HND Electrical Engineering",
        "BSc Electrical Engineering"
      ]
    },
    {
      id: "further",
      title: "Further Learning Courses",
      description: "Specialized short courses and additional certifications for career advancement",
      icon: Book,
      courses: [
        "18th Edition Regulations",
        "Electric Vehicle Charging",
        "Smart Home Installation"
      ]
    },
    {
      id: "onJob",
      title: "On the Job Courses",
      description: "Practical courses that can be completed during work hours and count toward qualifications",
      icon: GraduationCap,
      courses: [
        "Site Safety Management",
        "Risk Assessment Training",
        "First Aid Certification",
        "Working at Heights"
      ]
    }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseCategories.map((category) => (
          <Card 
            key={category.id}
            className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <category.icon className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mt-2">
                {category.courses.map((course, index) => (
                  <div 
                    key={index}
                    className="text-sm p-2 rounded-md bg-elec-dark flex justify-between items-center"
                  >
                    <span>{course}</span>
                    <span className="text-xs text-elec-yellow">Off-the-job eligible</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="default" size="sm" className="w-full">
                  View All {category.title}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-md p-4">
        <div className="flex items-center gap-2 mb-2">
          <Book className="h-5 w-5 text-elec-yellow" />
          <h3 className="font-semibold">Off-the-Job Training</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          All courses in the Study Centre count toward your 20% off-the-job training requirements. 
          Track your progress in the <Link to="/apprentice/ojt" className="text-elec-yellow hover:underline">Off-the-Job Time Keeping</Link> section.
        </p>
      </div>
    </div>
  );
};

export default ApprenticeStudy;
