
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const CommunicationMethods = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      {/* Back button */}
      <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation/unit/elec2-01/section/2/subsection/2.3">
        <Button variant="outline" className="mb-8 border-elec-yellow/30 hover:bg-elec-yellow/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Safety Communication
        </Button>
      </Link>
      
      {/* Main content */}
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Communication Methods for Electrical Safety
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Multiple communication methods help ensure safety information reaches all workers effectively.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="space-y-6">
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Verbal Communication Methods</h2>
            <div className="space-y-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Toolbox Talks</h3>
                <p className="text-elec-light/90">Brief, focused safety discussions at the start of shifts that address specific hazards or procedures relevant to the day's work.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Safety Briefings</h3>
                <p className="text-elec-light/90">More comprehensive discussions covering broader safety topics, often scheduled weekly or monthly.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">One-on-One Instruction</h3>
                <p className="text-elec-light/90">Direct communication between supervisors and workers for specific task-related safety guidance.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Visual Communication Methods</h2>
            <div className="space-y-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Safety Signage</h3>
                <p className="text-elec-light/90">Clear, standardized signs that communicate hazards, required PPE, and safety procedures.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Safety Boards</h3>
                <p className="text-elec-light/90">Dedicated display areas for safety information, incident reports, and current safety focus areas.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Color Coding</h3>
                <p className="text-elec-light/90">Using consistent colors to indicate different hazards or safety requirements (e.g., red for fire equipment, yellow for caution).</p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Written Communication Methods</h2>
            <div className="space-y-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Safety Manuals</h3>
                <p className="text-elec-light/90">Comprehensive documents containing all safety policies, procedures, and reference information.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Method Statements</h3>
                <p className="text-elec-light/90">Detailed documents outlining how specific tasks should be performed safely.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Risk Assessments</h3>
                <p className="text-elec-light/90">Written evaluations of potential hazards and control measures for specific tasks or environments.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Digital Communication Methods</h2>
            <div className="space-y-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Safety Apps</h3>
                <p className="text-elec-light/90">Mobile applications that provide real-time safety information, hazard reporting, and reference materials.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Emergency Notification Systems</h3>
                <p className="text-elec-light/90">Digital systems that can rapidly communicate emergency information to all workers through multiple channels.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Digital Dashboards</h3>
                <p className="text-elec-light/90">Visual displays showing safety performance metrics, recent incidents, and current focus areas.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Best Practices for Communication Methods</h2>
            <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
              <li>Use multiple communication methods to reach workers with different learning preferences</li>
              <li>Ensure information is accessible to workers with different language abilities</li>
              <li>Keep messages clear, concise, and focused on key safety points</li>
              <li>Verify understanding through questions and demonstrations</li>
              <li>Regularly update and refresh safety communication to prevent complacency</li>
              <li>Enable two-way communication to encourage feedback and questions</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommunicationMethods;
