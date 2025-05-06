
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Scale, ShieldAlert, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const InspectionRegulations = () => {
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
            Legal Requirements for Workplace Inspections
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Understanding the regulatory framework that governs workplace inspections is essential for compliance and maintaining a safe electrical work environment.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="space-y-6">
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Scale className="mr-3 h-5 w-5" /> Key Regulations
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Several key regulations in the UK establish the legal requirements for workplace inspections, with particular relevance to electrical work environments.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Health and Safety at Work etc. Act 1974:</h3>
                <p className="text-elec-light/90">
                  The foundational legislation that places general duties on employers to ensure the health, safety and welfare of employees and others who may be affected by their work activities. While not specifically mandating inspections, the Act requires employers to take measures to provide a safe workplace, which necessitates regular checking of conditions.
                </p>
                <p className="text-elec-light/90 mt-2">
                  <span className="font-medium">Key sections:</span> Section 2 (general duties of employers) and Section 7 (duties of employees).
                </p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">The Management of Health and Safety at Work Regulations 1999:</h3>
                <p className="text-elec-light/90">
                  These regulations specifically require employers to have arrangements for the effective planning, organization, control, monitoring, and review of preventive and protective measures. This explicitly includes workplace inspections as part of the monitoring process.
                </p>
                <p className="text-elec-light/90 mt-2">
                  <span className="font-medium">Regulation 5</span> requires employers to have arrangements for the effective planning, organization, control, monitoring and review of preventive and protective measures.
                </p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">The Workplace (Health, Safety and Welfare) Regulations 1992:</h3>
                <p className="text-elec-light/90">
                  These regulations require that workplaces, equipment, devices and systems are maintained in efficient working order and in good repair. This implies a need for regular inspection to identify maintenance requirements.
                </p>
                <p className="text-elec-light/90 mt-2">
                  <span className="font-medium">Regulation 5</span> states that "The workplace and the equipment, devices and systems to which this regulation applies shall be maintained (including cleaned as appropriate) in an efficient state, in efficient working order and in good repair."
                </p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Electricity at Work Regulations 1989:</h3>
                <p className="text-elec-light/90">
                  Particularly relevant for electrical work, these regulations require that electrical systems are maintained to prevent danger. This necessitates regular inspection of electrical installations, equipment, and work practices.
                </p>
                <p className="text-elec-light/90 mt-2">
                  <span className="font-medium">Regulation 4(2)</span> requires that "As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger."
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ShieldAlert className="mr-3 h-5 w-5" /> Inspection Requirements
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                While regulations don't always specify exact inspection frequencies or methods, they establish clear expectations for what must be achieved through inspection programs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Risk Assessment</h3>
                  <p className="text-sm text-elec-light/90">
                    Inspections must be based on risk assessment (Management of Health and Safety at Work Regulations 1999), with higher-risk activities requiring more frequent and detailed inspections.
                  </p>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Competent Persons</h3>
                  <p className="text-sm text-elec-light/90">
                    Inspections must be carried out by "competent persons" with sufficient knowledge, training, and experience to understand what to look for and how to identify issues.
                  </p>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Documentation</h3>
                  <p className="text-sm text-elec-light/90">
                    Significant findings must be recorded (particularly for high-risk activities) and records must be maintained for an appropriate period (typically at least 3 years).
                  </p>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Corrective Actions</h3>
                  <p className="text-sm text-elec-light/90">
                    There must be systems in place to ensure that issues identified during inspections are addressed promptly and effectively to maintain a safe workplace.
                  </p>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10 mt-4">
                <h3 className="font-medium text-elec-yellow mb-2">Specific Requirements for Electrical Work:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>Portable electrical equipment must be visually inspected by users before use and undergo formal inspection and testing at appropriate intervals</li>
                  <li>Fixed electrical installations require periodic inspection and testing (typically every 5 years in commercial premises, or more frequently in high-risk environments)</li>
                  <li>Safety systems such as emergency lighting and fire detection systems have specific testing requirements outlined in regulations and standards</li>
                  <li>Personal protective equipment must be examined to ensure it remains in good condition and fit for purpose</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileText className="mr-3 h-5 w-5" /> Regulatory Compliance
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                To ensure compliance with legal requirements for workplace inspections, employers and electrical contractors should follow these guidelines:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Establish a Formal Program</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Develop written procedures for inspections</li>
                    <li>Define inspection schedules based on risk</li>
                    <li>Assign responsibilities to specific roles</li>
                    <li>Create standardized inspection forms</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Train Inspectors</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Provide training on hazard identification</li>
                    <li>Ensure understanding of relevant regulations</li>
                    <li>Develop skills in documenting findings</li>
                    <li>Keep records of inspector training</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Maintain Documentation</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Keep inspection records for at least 3 years</li>
                    <li>Document corrective actions taken</li>
                    <li>Update risk assessments based on findings</li>
                    <li>Make records available to authorities if requested</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Review and Improve</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Regularly evaluate the inspection program</li>
                    <li>Update based on regulatory changes</li>
                    <li>Consider feedback from inspectors and workers</li>
                    <li>Incorporate lessons from incidents or near misses</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <BookOpen className="mr-3 h-5 w-5" /> Guidance and Standards
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Beyond regulations, various guidance documents and standards provide detail on workplace inspection best practices.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Health and Safety Executive (HSE) Guidance:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li><span className="font-medium">HSG65 - Managing for Health and Safety:</span> Outlines the Plan-Do-Check-Act approach, with workplace inspections forming a key part of the "Check" stage.</li>
                  <li><span className="font-medium">INDG236 - Maintaining Portable Electrical Equipment:</span> Provides guidance on inspection frequencies for portable electrical equipment.</li>
                  <li><span className="font-medium">HSG85 - Electricity at Work: Safe Working Practices:</span> Contains guidance on inspection procedures for electrical work activities.</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Industry Standards:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li><span className="font-medium">BS 7671 - Requirements for Electrical Installations (IET Wiring Regulations):</span> Provides detailed requirements for inspection and testing of electrical installations.</li>
                  <li><span className="font-medium">IET Guidance Note 3:</span> Offers detailed guidance on inspection and testing frequencies and procedures.</li>
                  <li><span className="font-medium">BS EN 62305:</span> Provides guidance on inspection and testing of lightning protection systems.</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Organizational Resources:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li><span className="font-medium">ECA (Electrical Contractors' Association):</span> Provides guidance documents and templates for inspection regimes.</li>
                  <li><span className="font-medium">NICEIC (National Inspection Council for Electrical Installation Contracting):</span> Offers technical guidance on inspection procedures and documentation.</li>
                  <li><span className="font-medium">IOSH (Institution of Occupational Safety and Health):</span> Publishes guidance on workplace inspection best practices.</li>
                </ul>
              </div>
            </div>
          </section>
          
          <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Consequences of Non-Compliance</h2>
            <p className="text-elec-light/90 mb-4">
              Failing to implement adequate workplace inspection procedures can have serious consequences:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
              <li>Enforcement action by the HSE or local authority, including improvement notices or prohibition notices</li>
              <li>Prosecution resulting in fines or imprisonment for serious breaches</li>
              <li>Civil claims from employees or others injured due to unsafe conditions</li>
              <li>Reputational damage and loss of business opportunities</li>
              <li>Increased insurance premiums or difficulty obtaining insurance coverage</li>
              <li>Operational disruption from incidents or enforcement action</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionRegulations;
