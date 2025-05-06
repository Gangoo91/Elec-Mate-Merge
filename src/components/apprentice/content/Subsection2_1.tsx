
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText, ClipboardCheck, Eye, ShieldAlert, ArrowRight } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import { Link } from "react-router-dom";

const Subsection2_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
          Workplace Inspection Procedures
        </h1>
        <p className="text-elec-light/80 max-w-2xl mx-auto">
          Regular inspections are essential to identify and address hazards before they cause accidents in electrical work environments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-elec-dark border-elec-yellow/20 hover:border-elec-yellow/40 transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-elec-yellow/10 p-2 rounded-lg">
                <ClipboardCheck className="h-6 w-6 text-elec-yellow" />
              </div>
              <h2 className="text-xl font-semibold text-elec-yellow">Inspection Types</h2>
            </div>
            
            <p className="text-elec-light/80">
              Different types of inspections should be conducted at varying frequencies to ensure comprehensive coverage of all safety concerns.
            </p>
            
            <Button asChild variant="study" className="w-full justify-between mt-2">
              <Link to="/apprentice/study/resources/inspection-types">
                View Inspection Types
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border-elec-yellow/20 hover:border-elec-yellow/40 transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-elec-yellow/10 p-2 rounded-lg">
                <Eye className="h-6 w-6 text-elec-yellow" />
              </div>
              <h2 className="text-xl font-semibold text-elec-yellow">What to Inspect</h2>
            </div>
            
            <p className="text-elec-light/80">
              Comprehensive workplace inspections should cover key areas including work environment, tools, safety systems and documentation.
            </p>
            
            <Button asChild variant="study" className="w-full justify-between mt-2">
              <Link to="/apprentice/study/resources/inspection-areas">
                View Inspection Areas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border-elec-yellow/20 hover:border-elec-yellow/40 transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-elec-yellow/10 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-elec-yellow" />
              </div>
              <h2 className="text-xl font-semibold text-elec-yellow">Documentation Process</h2>
            </div>
            
            <p className="text-elec-light/80">
              Learn how to properly document inspections, record findings, and track corrective actions to ensure safety issues are addressed.
            </p>
            
            <Button asChild variant="study" className="w-full justify-between mt-2">
              <Link to="/apprentice/study/resources/inspection-documentation">
                View Documentation Process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border-elec-yellow/20 hover:border-elec-yellow/40 transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-elec-yellow/10 p-2 rounded-lg">
                <ShieldAlert className="h-6 w-6 text-elec-yellow" />
              </div>
              <h2 className="text-xl font-semibold text-elec-yellow">Legal Requirements</h2>
            </div>
            
            <p className="text-elec-light/80">
              Understand the regulatory framework that governs workplace inspections, including the Management of Health and Safety at Work Regulations.
            </p>
            
            <Button asChild variant="study" className="w-full justify-between mt-2">
              <Link to="/apprentice/study/resources/inspection-regulations">
                View Legal Requirements
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4">Key Points to Remember</h2>
        <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
          <li>Regular inspections identify hazards before they cause accidents</li>
          <li>Inspections should follow a structured frequency (daily, weekly, monthly)</li>
          <li>Document all findings and assign responsibility for corrective actions</li>
          <li>Follow up on identified issues to ensure they are properly resolved</li>
          <li>Review trends to identify recurring safety concerns</li>
        </ul>
      </div>
      
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
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

export default Subsection2_1;
