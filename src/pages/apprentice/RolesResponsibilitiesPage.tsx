
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { rolesResponsibilitiesSubsections } from "@/data/healthAndSafety/subsections";

const RolesResponsibilitiesPage = () => {
  const { courseSlug, unitSlug } = useParams();

  return (
    <div className="space-y-6 animate-fade-in px-4 md:px-6">
      <div className="max-w-5xl mx-auto py-6">
        <div className="flex items-center mb-6">
          <Link 
            to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`}
            className="mr-4"
          >
            <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Unit
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-elec-yellow">Roles and Responsibilities</h1>
        </div>
        
        <p className="text-elec-light/80 mb-8">
          Identification of duties for employers, employees, and other stakeholders in maintaining a safe working environment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rolesResponsibilitiesSubsections.map((subsection) => (
            <Link
              key={subsection.id}
              to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/roles/${subsection.id}`}
              className="block transition-transform hover:scale-102 duration-200"
            >
              <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
                <CardContent className="flex flex-col p-4 h-full">
                  <h3 className="text-lg font-medium text-elec-yellow mb-2">{subsection.title}</h3>
                  <p className="text-elec-light/80 text-sm">{subsection.description}</p>
                  <div className="flex justify-end mt-auto pt-2">
                    <BookOpen className="h-5 w-5 text-elec-yellow opacity-70" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolesResponsibilitiesPage;
