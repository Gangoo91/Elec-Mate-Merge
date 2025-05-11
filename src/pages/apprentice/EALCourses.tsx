
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Award, FileText, Lightbulb } from "lucide-react";

const EALCourses = () => {
  const courses = [
    {
      id: "level-2-diploma",
      title: "EAL Level 2 Diploma in Electrical Installation",
      icon: <BookOpen className="h-8 w-8 text-elec-yellow" />,
      description: "Foundation qualification for electrical apprentices"
    },
    {
      id: "level-3-advanced-diploma",
      title: "EAL Level 3 Advanced Diploma in Electrical Installation",
      icon: <Award className="h-8 w-8 text-elec-yellow" />,
      description: "Advanced qualification for progressing electrical professionals"
    },
    {
      id: "level-3-verification",
      title: "EAL Level 3 Award in the Initial Verification and Certification of Electrical Installations",
      icon: <FileText className="h-8 w-8 text-elec-yellow" />,
      description: "Specialized qualification for testing and certification"
    },
    {
      id: "level-3-bs7671",
      title: "EAL Level 3 Award in the Requirements for Electrical Installations (BS 7671) – 18th Edition",
      icon: <Lightbulb className="h-8 w-8 text-elec-yellow" />,
      description: "Essential regulations qualification for all electrical professionals"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">EAL Courses</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Excellence, Achievement & Learning certified electrical qualifications
          </p>
        </div>
        <Link to="/apprentice/study" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Link key={course.id} to={`/apprentice/study/eal/${course.id}`} className="block h-full group">
            <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-md bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
                  {course.icon}
                </div>
                <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-sm"
                  >
                    View Course Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EALCourses;
