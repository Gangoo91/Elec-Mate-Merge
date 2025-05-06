
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";

const InspectionTypes = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      {/* Back button */}
      <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation/unit/elec2-01/section/2/subsection/2.1">
        <Button variant="outline" className="mb-8 border-elec-yellow/30 hover:bg-elec-yellow/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workplace Inspection Procedures
        </Button>
      </Link>
      
      {/* Main content */}
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Inspection Types and Frequency
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Different types of inspections should be conducted at varying frequencies to ensure comprehensive coverage of all safety concerns.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="space-y-6">
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Clock className="mr-3 h-5 w-5" /> Daily Pre-Work Checks
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Daily pre-work checks are the first line of defense against workplace hazards. They should be conducted before work begins each day to identify any immediate safety concerns.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">What to Check:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>Work area for trip hazards or obstructions</li>
                  <li>Tools and equipment for visible damage</li>
                  <li>Electrical cords and connections</li>
                  <li>Personal protective equipment (PPE) condition</li>
                  <li>Emergency exits and access routes</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Documentation:</h3>
                <p className="text-elec-light/90">
                  While daily checks may be less formal, it's good practice to use a simple checklist and record any issues found. This creates an audit trail and ensures issues are addressed.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Calendar className="mr-3 h-5 w-5" /> Weekly Documented Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Weekly inspections provide a more thorough examination of workplace conditions. These should be formal, documented inspections conducted by supervisors or designated safety personnel.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">What to Check:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>Electrical equipment and installations</li>
                  <li>Access paths and work areas</li>
                  <li>Fire safety provisions</li>
                  <li>First aid facilities</li>
                  <li>Storage practices for materials and equipment</li>
                  <li>Waste management systems</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Documentation:</h3>
                <p className="text-elec-light/90">
                  Use standardized inspection forms that include space for observations, corrective actions, and follow-up responsibilities. These records should be reviewed regularly to identify recurring issues.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ClipboardCheck className="mr-3 h-5 w-5" /> Monthly Safety Audits
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Monthly safety audits are comprehensive reviews conducted by supervisors or safety officers. These examine both physical conditions and procedural adherence.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">What to Check:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>Physical workplace conditions</li>
                  <li>Work practices and procedures</li>
                  <li>Safety documentation and records</li>
                  <li>Training records and requirements</li>
                  <li>Risk assessments and method statements</li>
                  <li>Previous inspection findings and corrective actions</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Documentation:</h3>
                <p className="text-elec-light/90">
                  Monthly audits should result in formal reports that are shared with management and relevant team members. These reports should include trend analysis and recommendations for improvement.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Calendar className="mr-3 h-5 w-5" /> Quarterly System Reviews
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Quarterly reviews focus on evaluating the effectiveness of the inspection program itself. These reviews should be conducted by senior management or safety specialists.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">What to Review:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>Effectiveness of inspection procedures</li>
                  <li>Frequency and coverage of inspections</li>
                  <li>Implementation of corrective actions</li>
                  <li>Accident and near-miss trends</li>
                  <li>Changes in regulations or industry standards</li>
                  <li>New hazards or changing work conditions</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Documentation:</h3>
                <p className="text-elec-light/90">
                  Quarterly reviews should produce strategic recommendations for improving the overall safety inspection program. These might include changes to inspection forms, frequencies, or training requirements.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InspectionTypes;
