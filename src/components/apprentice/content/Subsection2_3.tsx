
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Megaphone, MessageSquare, ShieldAlert, FileText } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const Subsection2_3 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow text-center mb-6">
        Safety Communication Systems
      </h2>
      
      {/* Overview Card */}
      <Card className="bg-elec-dark/50 border border-elec-yellow/30 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-elec-yellow flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2 inline" />
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base mb-4">
            Effective safety communication is vital to preventing accidents in electrical work. Clear communication ensures hazards are reported promptly and safety information reaches everyone who needs it.
          </p>
          
          <div className="pl-4 border-l-2 border-elec-yellow/30 mt-4">
            <p className="text-sm italic">Key points:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Clear communication structures prevent accidents</li>
              <li>Multiple communication methods reach different people effectively</li>
              <li>Regular structured safety meetings maintain awareness</li>
              <li>Inclusive communication considers language and cultural factors</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      {/* Content Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Communication Structures Card */}
        <Card className="bg-elec-dark/50 border border-elec-yellow/30 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 inline" />
              Communication Structures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base mb-4">
              Organised systems for safety information flow include reporting hierarchies, emergency procedures, safety representatives, and feedback loops.
            </p>
            <Link to={`/apprentice/resources/communication-structures`} className="text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium underline underline-offset-4 mt-2 inline-block">
              Learn more about communication structures →
            </Link>
          </CardContent>
        </Card>

        {/* Communication Methods Card */}
        <Card className="bg-elec-dark/50 border border-elec-yellow/30 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <Megaphone className="h-5 w-5 mr-2 inline" />
              Communication Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base mb-4">
              Effective approaches to delivering safety messages include toolbox talks, safety briefings, visual communication, and digital tools.
            </p>
            <Link to={`/apprentice/resources/communication-methods`} className="text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium underline underline-offset-4 mt-2 inline-block">
              Explore communication methods →
            </Link>
          </CardContent>
        </Card>

        {/* Safety Meeting Structure Card */}
        <Card className="bg-elec-dark/50 border border-elec-yellow/30 shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <FileText className="h-5 w-5 mr-2 inline" />
              Safety Meeting Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">Meeting Components:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Regular schedule (weekly or bi-weekly)</li>
                  <li>Clear agenda covering key safety topics</li>
                  <li>Review of recent incidents or near-misses</li>
                  <li>Discussion of upcoming work and associated risks</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">Inclusive Communication:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Materials in languages understood by all workers</li>
                  <li>Visual aids for those with limited reading ability</li>
                  <li>Cultural sensitivity in communication approaches</li>
                  <li>Verification that messages have been understood</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <Link to={`/apprentice/resources/safety-meetings`} className="text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium underline underline-offset-4 inline-block">
                View complete safety meeting guide →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Important Note Card */}
      <Card className="bg-elec-dark/70 border border-elec-yellow/40 shadow-md">
        <CardContent className="pt-4">
          <p className="font-medium mb-2 text-elec-yellow">Important Note:</p>
          <p className="text-sm">
            Communication is only effective if it leads to action. Always include clear instructions about what workers should do with the information provided, and check that appropriate actions are being taken. Create a culture where safety communication is valued and acted upon at all levels of the organisation.
          </p>
        </CardContent>
      </Card>
      
      {/* Mark as Complete Button */}
      <div className="flex justify-center pt-6 border-t border-elec-yellow/20">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Subsection2_3;
