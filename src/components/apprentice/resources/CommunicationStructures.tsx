
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const CommunicationStructures = () => {
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
            Communication Structures in Electrical Safety
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Effective communication structures ensure safety information flows efficiently throughout an organization.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="space-y-6">
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Reporting Hierarchies</h2>
            <p className="mb-4">Clear reporting hierarchies establish who to contact in different safety scenarios:</p>
            <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
              <li>Direct supervisors for immediate workplace hazards</li>
              <li>Health and safety representatives for ongoing concerns</li>
              <li>Emergency contacts for urgent dangerous situations</li>
              <li>Senior management for systemic safety issues</li>
            </ul>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Formal Communication Procedures</h2>
            <p className="mb-4">Standardized procedures ensure consistent and effective information flow:</p>
            <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
              <li>Incident reporting forms and processes</li>
              <li>Risk assessment documentation</li>
              <li>Safety briefing protocols</li>
              <li>Emergency response communication chains</li>
            </ul>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Clear Lines of Authority</h2>
            <p className="mb-4">Understanding who has authority in safety matters prevents confusion:</p>
            <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
              <li>Site safety officers and their jurisdiction</li>
              <li>Project managers' safety responsibilities</li>
              <li>Client representatives' safety authority</li>
              <li>Regulatory inspectors and their powers</li>
            </ul>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Communication Flow Charts</h2>
            <p className="mb-4">Visual representations help clarify who to contact in different situations:</p>
            <div className="bg-elec-dark/50 p-4 rounded border border-elec-yellow/10 text-center">
              <p className="text-elec-light/70 italic">Flow chart visualization would be displayed here</p>
            </div>
            <p className="mt-4">Flow charts should be posted in visible locations and included in safety manuals for quick reference.</p>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Best Practices</h2>
            <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
              <li>Review communication structures regularly to ensure effectiveness</li>
              <li>Train all personnel on communication protocols during onboarding</li>
              <li>Test emergency communication chains periodically</li>
              <li>Update contact information and procedures as personnel changes occur</li>
              <li>Ensure communication structures account for language barriers and shift work</li>
            </ul>
          </section>
        </div>
        
        {/* Resources */}
        <div className="bg-elec-dark/70 p-6 rounded-lg border border-elec-yellow/20 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>HSE Communication Guidelines</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Sample Communication Structure Templates</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Electrical Industry Safety Communication Standards</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Communication Effectiveness Assessment Tools</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationStructures;
