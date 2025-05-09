
import { useState, useEffect } from "react";
import { useParams, Link, Route, Routes } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ealLevel3Units } from "@/data/courseUnitsLevel3";
import UnitDetails from "@/components/apprentice/UnitDetails";

const CourseDetail = () => {
  const { courseSlug, unitSlug } = useParams();
  const isMobile = useIsMobile();
  
  // Format the course title from the slug
  const formatCourseTitle = (slug?: string) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const courseTitle = formatCourseTitle(courseSlug);

  // Function to create a URL slug from a unit code and title
  const createUnitSlug = (code: string, title: string) => {
    return code.toLowerCase().replace('/', '-') + '-' + 
      title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  // If we have a unitSlug parameter, show the unit details instead of the course listing
  if (unitSlug) {
    // Find the unit that matches the unitSlug
    const unit = ealLevel3Units.find(unit => {
      const generatedSlug = createUnitSlug(unit.code, unit.title);
      return generatedSlug === unitSlug;
    });

    if (unit) {
      return (
        <UnitDetails 
          unit={unit} 
          onResourceClick={() => {}} 
          completedResources={{}} 
          onToggleResourceComplete={() => {}} 
        />
      );
    }
  }

  // Show the course listing if no unitSlug or if the unit wasn't found
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">{courseTitle}</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            EAL Level 3 qualification with advanced electrical units
          </p>
        </div>
        <Link to="/apprentice/study/eal" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EAL Courses
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ealLevel3Units.map((unit, index) => {
          const unitSlug = createUnitSlug(unit.code, unit.title);
          return (
            <Link 
              key={index}
              to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`}
              className="block h-full transition-transform hover:scale-102 duration-200"
            >
              <Card 
                className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                  <GraduationCap className="h-8 w-8 text-elec-yellow mb-4 opacity-80" />
                  <p className="text-elec-yellow text-sm mb-2">{unit.code}</p>
                  <h3 className={`text-base sm:text-lg font-medium text-center ${isMobile ? "leading-tight" : ""}`}>
                    {unit.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetail;
