
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CourseDetail = () => {
  const { courseSlug, unitSlug } = useParams();
  const location = useLocation();
  
  return (
    <div className="space-y-8 animate-fade-in px-4 md:px-6 lg:px-8">
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-6">
          <span className="gradient-text">Content Being Updated</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          The EAL Level 2 Diploma in Electrical Installation content is currently being redeveloped.
          Please check back soon for the updated course materials.
        </p>
        <Link to="/apprentice/study/eal">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EAL Courses
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;
