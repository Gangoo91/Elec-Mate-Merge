
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const InspectionAreas = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="text-center py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-4">
          Content Being Updated
        </h1>
        <p className="text-elec-light/80 max-w-2xl mx-auto mb-8">
          This resource is currently being redeveloped. Please check back soon for updated content.
        </p>
        <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation">
          <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InspectionAreas;
