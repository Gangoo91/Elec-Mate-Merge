
import React from "react";
import { Wrench, HelpCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const WorkingPractices = () => {
  return (
    <Card className="bg-elec-gray border border-elec-yellow/20">
      <CardHeader className="bg-gradient-to-r from-elec-yellow/10 to-transparent border-b border-elec-yellow/20 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-xl font-bold text-elec-yellow">Safe Working Practices for Electricians</h3>
          </div>
          <div className="px-3 py-1.5 bg-elec-yellow/10 rounded-full text-sm text-elec-yellow border border-elec-yellow/20 hidden md:flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Essential Knowledge</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <p className="text-base mb-6">
          Safe working practices are essential for electricians to maintain safety for themselves, colleagues, and end-users. 
          Following established procedures helps prevent accidents, injuries, and property damage throughout electrical work activities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Safety Principles */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/10 rounded-lg">
                <Wrench className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Core Safety Principles</h4>
            </div>
            
            <div className="space-y-3">
              <SafetyPrincipleCard title="Personal Safety">
                <li>Always wear appropriate PPE for the task</li>
                <li>Maintain up-to-date safety training and qualifications</li>
                <li>Never work on live equipment unless absolutely necessary</li>
                <li>Follow safe isolation procedures before commencing work</li>
                <li>Take regular breaks to avoid fatigue-related errors</li>
              </SafetyPrincipleCard>
              
              <SafetyPrincipleCard title="Site Safety">
                <li>Secure the work area with barriers and signage</li>
                <li>Keep work areas clean and free from trip hazards</li>
                <li>Store tools and materials safely when not in use</li>
                <li>Dispose of waste materials in appropriate containers</li>
                <li>Maintain clear emergency exit routes at all times</li>
              </SafetyPrincipleCard>
            </div>
          </div>
          
          {/* Procedural Safety */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/10 rounded-lg">
                <HelpCircle className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Procedural Safety</h4>
            </div>
            
            <div className="space-y-3">
              <SafetyPrincipleCard title="Tool & Equipment Safety">
                <li>Inspect tools and test equipment before each use</li>
                <li>Only use tools designed for electrical work</li>
                <li>Ensure tools are properly insulated and undamaged</li>
                <li>Maintain and calibrate test equipment regularly</li>
                <li>Never use damaged or makeshift tools</li>
                <li>Store tools properly to prevent damage</li>
              </SafetyPrincipleCard>
              
              <SafetyPrincipleCard title="Communication">
                <li>Brief all team members before commencing work</li>
                <li>Use clear, unambiguous language when giving instructions</li>
                <li>Report hazards immediately to supervisors</li>
                <li>Maintain clear communication during complex tasks</li>
                <li>Document all safety-related information</li>
              </SafetyPrincipleCard>
            </div>
          </div>
        </div>
        
        <div className="mt-5 p-4 border-t border-elec-yellow/20 bg-gradient-to-b from-elec-dark/70 to-elec-dark">
          <p className="font-medium mb-1 text-elec-yellow text-sm">Regulatory Requirements:</p>
          <p className="text-sm">The Electricity at Work Regulations 1989 require that all reasonable steps must be taken to ensure that work activities 
          do not give rise to danger. This includes following proper procedures, using appropriate equipment, and ensuring all 
          workers are competent to carry out their assigned tasks safely.</p>
        </div>
      </CardContent>
    </Card>
  );
};

// New reusable component for safety principle cards
const SafetyPrincipleCard = ({ title, children }) => (
  <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300">
    <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
      {title}
    </h5>
    <ul className="space-y-1.5 pl-4">
      {React.Children.map(children, (child, index) => (
        <div className="flex items-start gap-2 group">
          <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60 mt-2 shrink-0"></div>
          {child}
        </div>
      ))}
    </ul>
  </div>
);

export default WorkingPractices;
