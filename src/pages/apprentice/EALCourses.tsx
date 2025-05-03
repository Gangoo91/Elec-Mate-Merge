
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { courseCategories } from "@/data/courseCategories";

const EALCourses = () => {
  // Find the EAL courses category
  const ealCategory = courseCategories.find(category => category.id === "eal");
  const courses = ealCategory?.courses || [];

  return (
    <div className="space-y-8 animate-fade-in px-2 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EAL Courses</h1>
          <p className="text-muted-foreground">
            Excellence, Achievement & Learning certified electrical qualifications
          </p>
        </div>
        <Link to="/apprentice/study" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Card 
            key={index}
            className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors cursor-pointer"
          >
            <CardContent className="flex items-center justify-center p-6 h-full">
              <h3 className="text-lg font-medium text-center">{course}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EALCourses;
