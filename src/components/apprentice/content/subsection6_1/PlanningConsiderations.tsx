
import React from "react";
import { LayoutTemplate, ClipboardList, CheckCircle, UserCheck } from "lucide-react";

const PlanningConsiderations = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-elec-yellow">Planning Considerations for Electrical Work</h3>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-elec-yellow/10 rounded-full text-sm text-elec-yellow border border-elec-yellow/20">
          <ClipboardList className="h-4 w-4" />
          <span>Preparation Required</span>
        </div>
      </div>
      
      <p className="text-base md:text-lg mb-4">
        Proper planning is essential for safe and efficient electrical installation and maintenance. 
        This involves careful consideration of the work environment, resources needed, and potential hazards.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-elec-yellow/10 to-transparent p-4 border-b border-elec-yellow/20">
          <h4 className="font-semibold text-lg text-elec-yellow">Comprehensive Work Planning</h4>
          <p className="text-sm mt-1 text-gray-300">Essential elements for safe and effective electrical work</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-elec-gray to-elec-gray/80 rounded-lg overflow-hidden border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex items-center gap-3 p-4 border-b border-elec-yellow/10 bg-elec-yellow/5">
                  <div className="p-1.5 bg-elec-yellow/10 rounded">
                    <LayoutTemplate className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <h4 className="font-medium text-elec-yellow text-lg">Site Assessment & Preparation</h4>
                </div>
                
                <div className="p-5">
                  <div className="space-y-5">
                    <div>
                      <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Pre-Work Site Survey
                      </h5>
                      <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                        <li>Conduct detailed site survey before commencing work</li>
                        <li>Identify all potential hazards and control measures</li>
                        <li>Map out electrical supply points and circuit routes</li>
                        <li>Confirm isolation possibilities and requirements</li>
                        <li>Document existing installation conditions with photos</li>
                        <li>Assess access restrictions and special equipment needs</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Environmental Considerations
                      </h5>
                      <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                        <li>Evaluate weather conditions for outdoor work</li>
                        <li>Identify wet areas requiring special precautions</li>
                        <li>Consider temperature extremes affecting working conditions</li>
                        <li>Plan for adequate lighting in work areas</li>
                        <li>Assess ventilation requirements for confined spaces</li>
                        <li>Identify material storage areas and requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-elec-gray to-elec-gray/80 rounded-lg overflow-hidden border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex items-center gap-3 p-4 border-b border-elec-yellow/10 bg-elec-yellow/5">
                  <div className="p-1.5 bg-elec-yellow/10 rounded">
                    <UserCheck className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <h4 className="font-medium text-elec-yellow text-lg">Resource Planning</h4>
                </div>
                
                <div className="p-5">
                  <div className="space-y-5">
                    <div>
                      <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Personnel Requirements
                      </h5>
                      <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                        <li>Determine appropriate staffing levels for the work</li>
                        <li>Verify qualifications and competencies required</li>
                        <li>Plan for specialized skills needed (e.g. testing)</li>
                        <li>Consider task rotation to prevent fatigue</li>
                        <li>Schedule breaks and refreshment arrangements</li>
                        <li>Establish clear roles and responsibilities</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Equipment & Materials
                      </h5>
                      <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                        <li>List all required tools and testing equipment</li>
                        <li>Ensure tools are calibrated and in good condition</li>
                        <li>Plan for material delivery and storage logistics</li>
                        <li>Arrange specialized equipment if needed</li>
                        <li>Include contingency materials for unexpected issues</li>
                        <li>Allocate time for testing and commissioning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-elec-gray to-elec-gray/80 rounded-lg overflow-hidden border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex items-center gap-3 p-4 border-b border-elec-yellow/10 bg-elec-yellow/5">
                  <div className="p-1.5 bg-elec-yellow/10 rounded">
                    <ClipboardList className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <h4 className="font-medium text-elec-yellow text-lg">Documentation & Compliance</h4>
                </div>
                
                <div className="p-5">
                  <div className="space-y-5">
                    <div>
                      <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Required Documentation
                      </h5>
                      <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                        <li>Prepare detailed risk assessments for all tasks</li>
                        <li>Develop method statements outlining work processes</li>
                        <li>Organize permits to work where applicable</li>
                        <li>Prepare electrical installation certification documents</li>
                        <li>Set up test results and commissioning records</li>
                        <li>Prepare hand-over documentation templates</li>
                        <li>Organize building regulations notification if required</li>
                        <li>Prepare health and safety file contributions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Regulatory Compliance
                      </h5>
                      <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                        <li>Ensure all work complies with BS 7671</li>
                        <li>Plan for compliance with Building Regulations Part P</li>
                        <li>Address Electricity at Work Regulations requirements</li>
                        <li>Incorporate CDM Regulations if applicable</li>
                        <li>Consider environmental regulations for waste disposal</li>
                        <li>Plan for noise management under Control of Noise at Work</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-elec-gray to-elec-gray/80 rounded-lg overflow-hidden border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex items-center gap-3 p-4 border-b border-elec-yellow/10 bg-elec-yellow/5">
                  <div className="p-1.5 bg-elec-yellow/10 rounded">
                    <UserCheck className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <h4 className="font-medium text-elec-yellow text-lg">Communication & Coordination</h4>
                </div>
                
                <div className="p-5">
                  <div className="space-y-5">
                    <div>
                      <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Communication Plan
                      </h5>
                      <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                        <li>Schedule detailed briefings before work commences</li>
                        <li>Establish clear communication methods during work</li>
                        <li>Document emergency procedures and contacts</li>
                        <li>Set up client communication protocols</li>
                        <li>Create reporting procedures for issues</li>
                        <li>Plan for daily toolbox talks on specific hazards</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Stakeholder Coordination
                      </h5>
                      <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                        <li>Identify all stakeholders affected by the work</li>
                        <li>Plan coordination with other trades and contractors</li>
                        <li>Schedule outage notifications for affected parties</li>
                        <li>Arrange access requirements with building owners</li>
                        <li>Coordinate with utility providers if necessary</li>
                        <li>Plan for inspection scheduling with authorities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-5 bg-gradient-to-br from-elec-dark/70 to-elec-dark border border-elec-yellow/20 rounded-lg">
            <h5 className="font-medium text-elec-yellow mb-3">Planning Checklist</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h6 className="text-sm font-medium text-gray-300 mb-2">Before Starting</h6>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Site survey completed</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Risk assessment prepared</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Method statement developed</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Resources allocated</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h6 className="text-sm font-medium text-gray-300 mb-2">During Work</h6>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Daily briefings conducted</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Safe isolation verified</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Work area secured</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Progress documented</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h6 className="text-sm font-medium text-gray-300 mb-2">Completion</h6>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Testing completed</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Certification prepared</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Client handover conducted</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 border border-elec-yellow/30 rounded flex-shrink-0"></div>
                    <span>Documentation filed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-elec-yellow/20">
              <p className="font-medium text-sm text-elec-yellow mb-1">Legal Compliance:</p>
              <p className="text-sm">The Management of Health and Safety at Work Regulations 1999 require suitable and sufficient planning, 
              including risk assessment, before undertaking work activities. For electrical work, the Electricity at Work 
              Regulations 1989 require that all work is properly planned, with consideration given to the risks associated 
              with electricity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningConsiderations;
