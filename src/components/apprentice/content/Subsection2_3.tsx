
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageSquare, ArrowRightCircle, Megaphone, FileText } from "lucide-react";
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow text-center mb-4">
        Safety Communication Systems
      </h2>
      
      {/* Introduction */}
      <div className="text-base mb-6">
        <p>
          Effective safety communication is vital to preventing accidents in electrical work. 
          Clear communication ensures hazards are reported promptly and safety information 
          reaches everyone who needs it.
        </p>
      </div>
      
      {/* Main Content Cards - Clean, separated style */}
      <div className="space-y-5">
        {/* Card 1: Communication Structures */}
        <div className="rounded-lg border border-elec-yellow/30 bg-elec-dark/50 overflow-hidden hover:shadow-md transition-all">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-elec-yellow">Communication Structures</h3>
            </div>
            
            <p className="mb-4">
              Effective communication structures prevent accidents and ensure safety information flows properly.
              These include reporting hierarchies, emergency procedures, and feedback systems.
            </p>
            
            <ul className="pl-5 mb-4 space-y-1 list-disc">
              <li>Clear chains of command for reporting hazards</li>
              <li>Designated safety representatives on each team</li>
              <li>Regular safety briefings and updates</li>
              <li>Documentation of all safety communications</li>
            </ul>
            
            <Link 
              to="/apprentice/resources/communication-structures" 
              className="flex items-center text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium gap-1"
            >
              Learn more about communication structures
              <ArrowRightCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Card 2: Communication Methods */}
        <div className="rounded-lg border border-elec-yellow/30 bg-elec-dark/50 overflow-hidden hover:shadow-md transition-all">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Megaphone className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-elec-yellow">Communication Methods</h3>
            </div>
            
            <p className="mb-4">
              Multiple communication methods help reach different people effectively, ensuring
              that important safety information is received and understood by all workers.
            </p>
            
            <ul className="pl-5 mb-4 space-y-1 list-disc">
              <li>Toolbox talks and safety briefings</li>
              <li>Visual safety signage and markings</li>
              <li>Written procedures and checklists</li>
              <li>Digital platforms for rapid notifications</li>
            </ul>
            
            <Link 
              to="/apprentice/resources/communication-methods" 
              className="flex items-center text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium gap-1"
            >
              Explore communication methods
              <ArrowRightCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Card 3: Safety Meeting Structure */}
        <div className="rounded-lg border border-elec-yellow/30 bg-elec-dark/50 overflow-hidden hover:shadow-md transition-all">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-elec-yellow">Safety Meeting Structure</h3>
            </div>
            
            <p className="mb-4">
              Regular structured safety meetings maintain awareness and ensure that all workers
              are kept up to date with the latest safety procedures and potential hazards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-elec-yellow mb-2">Essential Components:</h4>
                <ul className="pl-5 space-y-1 list-disc">
                  <li>Regular schedule (weekly or bi-weekly)</li>
                  <li>Clear agenda covering key topics</li>
                  <li>Review of recent incidents</li>
                  <li>Discussion of upcoming work risks</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-elec-yellow mb-2">Inclusive Approaches:</h4>
                <ul className="pl-5 space-y-1 list-disc">
                  <li>Materials in multiple languages</li>
                  <li>Visual aids for accessibility</li>
                  <li>Cultural sensitivity</li>
                  <li>Verification of understanding</li>
                </ul>
              </div>
            </div>
            
            <Link 
              to="/apprentice/resources/safety-meetings" 
              className="flex items-center text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium gap-1"
            >
              View complete safety meeting guide
              <ArrowRightCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Final Important Note */}
        <div className="rounded-lg border border-elec-yellow/40 bg-elec-dark/70 p-4 mt-6">
          <p className="font-medium mb-1 text-elec-yellow">Important Note:</p>
          <p className="text-sm">
            Communication is only effective if it leads to action. Always include clear instructions 
            about what workers should do with the information provided, and check that appropriate 
            actions are being taken. Create a culture where safety communication is valued and 
            acted upon at all levels of the organisation.
          </p>
        </div>
      </div>
      
      {/* Mark as Complete Button */}
      <div className="flex justify-center pt-6 border-t border-elec-yellow/20 mt-6">
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
