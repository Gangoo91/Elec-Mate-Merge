
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRightCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubsectionProps } from "./subsection1_1/types";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Subsection2_3 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  
  const handleMarkComplete = () => {
    markAsComplete();
    toast({
      title: "Section completed",
      description: "Your progress has been saved",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-8">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
          Safety Communication Systems
        </h1>
        <p className="text-elec-light/80 max-w-2xl mx-auto">
          Effective communication systems help prevent accidents and ensure safety information 
          reaches everyone on site quickly and clearly.
        </p>
      </div>
      
      {/* Clean, Simple Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <Card className="border-elec-yellow/30 bg-elec-dark hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-elec-yellow text-xl flex items-center gap-2">
              Communication Structures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/90 mb-4">
              Clear structures ensure safety information flows efficiently. These include reporting
              hierarchies and formal procedures.
            </p>
            <Link 
              to="/apprentice/resources/communication-structures" 
              className="flex items-center text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium gap-1 mt-4"
            >
              Learn more
              <ArrowRightCircle className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="border-elec-yellow/30 bg-elec-dark hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-elec-yellow text-xl flex items-center gap-2">
              Communication Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/90 mb-4">
              Multiple methods help reach workers effectively, from toolbox talks to visual
              signage and digital notifications.
            </p>
            <Link 
              to="/apprentice/resources/communication-methods" 
              className="flex items-center text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium gap-1 mt-4"
            >
              Explore methods
              <ArrowRightCircle className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="border-elec-yellow/30 bg-elec-dark hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-elec-yellow text-xl flex items-center gap-2">
              Safety Meeting Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/90 mb-4">
              Regular structured meetings maintain safety awareness and ensure all workers
              stay updated with the latest information.
            </p>
            <Link 
              to="/apprentice/resources/safety-meetings" 
              className="flex items-center text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium gap-1 mt-4"
            >
              View meeting guide
              <ArrowRightCircle className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="border-elec-yellow/30 bg-elec-dark hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-elec-yellow text-xl flex items-center gap-2">
              Documentation Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/90 mb-4">
              Proper documentation creates records of safety communications, ensuring
              accountability and tracking information flow.
            </p>
            <Link 
              to="/apprentice/resources/documentation-systems" 
              className="flex items-center text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium gap-1 mt-4"
            >
              Documentation templates
              <ArrowRightCircle className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Key Points Summary */}
      <Card className="border-elec-yellow/30 bg-elec-dark/70 mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-elec-yellow text-xl">
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Clear communication channels must be established on every worksite</li>
            <li>Multiple communication methods should be used for safety information</li>
            <li>Regular safety meetings form the backbone of good communication</li>
            <li>Documentation creates accountability and record-keeping</li>
            <li>All workers must know how to report hazards immediately</li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Mark as Complete Button */}
      <div className="flex justify-center pt-6">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={handleMarkComplete}
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
