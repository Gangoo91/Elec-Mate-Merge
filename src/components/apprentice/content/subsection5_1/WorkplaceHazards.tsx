
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HardHat, Construction } from "lucide-react";

const WorkplaceHazards = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Non-Electrical Workplace Hazards</h3>
      
      <p className="text-sm md:text-base mb-4">
        While electrical hazards are a primary concern for electricians, there are numerous non-electrical hazards present 
        in the workplace that require equal attention. Recognising and managing these hazards is essential for overall safety.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Physical Hazards</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Slips, Trips and Falls</h4>
                <p className="text-sm">Caused by uneven surfaces, trailing cables, poor housekeeping, and improper storage of materials.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Working at Height</h4>
                <p className="text-sm">Risks when using ladders, scaffolds or platforms without proper safety measures.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Confined Spaces</h4>
                <p className="text-sm">Limited access/egress points creating additional risks during emergency situations.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Manual Handling</h4>
                <p className="text-sm">Injuries from lifting heavy equipment, cable drums or awkward loads incorrectly.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Environmental Hazards</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Noise Exposure</h4>
                <p className="text-sm">Extended exposure to high noise levels on construction sites or in industrial settings.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Thermal Issues</h4>
                <p className="text-sm">Working in extreme heat or cold environments affecting concentration and performance.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Dust and Particles</h4>
                <p className="text-sm">Respiratory hazards when drilling, cutting or working in dusty environments.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Work Process Hazards</h4>
                <p className="text-sm">Risks from power tools, soldering, welding and using heat guns that can create fire hazards and burn injuries.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkplaceHazards;
