
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, HardHat, Shield } from "lucide-react";

const SafeWorkPractices = () => {
  return (
    <Card className="border border-elec-yellow/30 bg-elec-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-elec-yellow">Safe Working Practices with Ladders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-elec-dark/50 border-l-4 border-amber-500 p-4 rounded-r">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h4 className="font-semibold text-elec-yellow">Risk Assessment Requirement</h4>
          </div>
          <p className="text-sm">
            A task-specific risk assessment must be completed before using ladders for electrical work. 
            This assessment should identify hazards, evaluate risks, and determine control measures needed 
            to work safely at height whilst managing electrical hazards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <HardHat className="h-5 w-5 text-elec-yellow mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Working Near Electrical Services</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="font-medium text-elec-yellow">Safe Clearance Distances</span>
                  <p className="mt-1">Maintain minimum clearances from overhead power lines: 3m from low voltage, 6m from high voltage. Distance increases with voltage level.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Fiberglass Ladders Only</span>
                  <p className="mt-1">When working near any energised electrical equipment, only use fully insulated fiberglass ladders with non-conductive stiles.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Weather Conditions</span>
                  <p className="mt-1">Avoid using ladders outdoors during high winds, heavy rain, or lightning storms as these conditions increase electrical hazards.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Isolation Verification</span>
                  <p className="mt-1">Always verify electrical isolation before positioning ladder near electrical equipment. Never assume a circuit is dead.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-elec-yellow mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Ladder Placement & Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="font-medium text-elec-yellow">Correct Angle</span>
                  <p className="mt-1">Always position extension ladders at a 75° angle (1 out for every 4 up). A simple check: stand with toes against ladder feet, extend arms - palms should touch rung at shoulder height.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Level Base</span>
                  <p className="mt-1">Ensure ladder feet are on firm, level ground. Never use bricks or other materials to level a ladder - use purpose-designed leg levellers instead.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Securing Methods</span>
                  <p className="mt-1">Tie ladders at the top, bottom or both when possible. When securing isn't possible, have a second person 'foot' the ladder during use.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Stabilising Devices</span>
                  <p className="mt-1">Use appropriate stabilisers, stand-offs, or outriggers in accordance with manufacturer's recommendations for additional stability.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-elec-yellow">Legal Requirements & Alternatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-elec-yellow mb-2">Work at Height Regulations 2005</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Ladders should only be used for low-risk, short-duration tasks</li>
                  <li>Risk assessment must justify ladder use over safer alternatives</li>
                  <li>Users must be competent and properly trained</li>
                  <li>Ladders must be suitable for the environment and task</li>
                  <li>Regular documented inspections are legally required</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-elec-yellow mb-2">When to Consider Alternatives</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>For work lasting more than 30 minutes</li>
                  <li>When working at heights above 4.5 metres</li>
                  <li>When carrying heavy or bulky equipment</li>
                  <li>Where work requires extending reach sideways</li>
                  <li>When ground conditions are unsuitable</li>
                  <li>Consider scaffolding towers or MEWPs instead</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SafeWorkPractices;
