
import React from "react";
import { Wrench, ChevronRight, HelpCircle, ShieldCheck } from "lucide-react";

const WorkingPractices = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-elec-yellow">Safe Working Practices for Electricians</h3>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-elec-yellow/10 rounded-full text-sm text-elec-yellow border border-elec-yellow/20">
          <ShieldCheck className="h-4 w-4" />
          <span>Essential Knowledge</span>
        </div>
      </div>
      
      <p className="text-base md:text-lg">
        Safe working practices are essential for electricians to maintain safety for themselves, colleagues, and end-users. 
        Following established procedures helps prevent accidents, injuries, and property damage throughout electrical work activities.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-elec-yellow/20">
          {/* Left Column */}
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-elec-yellow/10 rounded-lg">
                <Wrench className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Core Safety Principles</h4>
            </div>
            
            <div className="space-y-5">
              <div className="bg-elec-gray rounded-md p-4">
                <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                  Personal Safety
                </h5>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Always wear appropriate PPE for the task</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Maintain up-to-date safety training and qualifications</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Never work on live equipment unless absolutely necessary</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Follow safe isolation procedures before commencing work</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Take regular breaks to avoid fatigue-related errors</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-4">
                <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                  Site Safety
                </h5>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Secure the work area with barriers and signage</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Keep work areas clean and free from trip hazards</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Store tools and materials safely when not in use</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Dispose of waste materials in appropriate containers</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Maintain clear emergency exit routes at all times</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-elec-yellow/10 rounded-lg">
                <HelpCircle className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Procedural Safety</h4>
            </div>
            
            <div className="space-y-5">
              <div className="bg-elec-gray rounded-md p-4">
                <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                  Tool & Equipment Safety
                </h5>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Inspect tools and test equipment before each use</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Only use tools designed for electrical work</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Ensure tools are properly insulated and undamaged</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Maintain and calibrate test equipment regularly</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Never use damaged or makeshift tools</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Store tools properly to prevent damage</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-4">
                <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                  Communication
                </h5>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Brief all team members before commencing work</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Use clear, unambiguous language when giving instructions</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Report hazards immediately to supervisors</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Maintain clear communication during complex tasks</p>
                  </li>
                  <li className="flex items-start gap-2.5 group">
                    <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    <p className="text-base">Document all safety-related information</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-elec-yellow/20 bg-gradient-to-b from-elec-dark/70 to-elec-dark">
          <p className="font-medium mb-1 text-elec-yellow text-sm">Regulatory Requirements:</p>
          <p className="text-sm">The Electricity at Work Regulations 1989 require that all reasonable steps must be taken to ensure that work activities 
          do not give rise to danger. This includes following proper procedures, using appropriate equipment, and ensuring all 
          workers are competent to carry out their assigned tasks safely.</p>
        </div>
      </div>
    </div>
  );
};

export default WorkingPractices;
