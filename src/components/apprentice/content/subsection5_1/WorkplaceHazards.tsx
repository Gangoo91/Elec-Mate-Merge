
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HardHat, Construction, AlertTriangle } from "lucide-react";

const WorkplaceHazards = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Non-Electrical Workplace Hazards</h3>
      
      <div className="space-y-4 md:space-y-6">
        <p className="text-sm md:text-base">
          While electrical hazards are a primary concern for electricians, there are numerous non-electrical hazards present in the workplace that require equal attention. Recognising and managing these hazards is essential for overall workplace safety.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <HardHat className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Physical Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-3">
                <li className="border-l-4 border-elec-yellow/40 pl-3 py-1">
                  <span className="font-medium text-elec-yellow">Slips, trips and falls</span>
                  <p className="mt-1">Caused by uneven surfaces, trailing cables, poor housekeeping, and improper storage of materials.</p>
                </li>
                <li className="border-l-4 border-elec-yellow/40 pl-3 py-1">
                  <span className="font-medium text-elec-yellow">Working at height</span>
                  <p className="mt-1">Risks when using ladders, scaffolds or platforms without proper safety measures.</p>
                </li>
                <li className="border-l-4 border-elec-yellow/40 pl-3 py-1">
                  <span className="font-medium text-elec-yellow">Confined spaces</span>
                  <p className="mt-1">Limited access/egress points creating additional risks during emergency situations.</p>
                </li>
                <li className="border-l-4 border-elec-yellow/40 pl-3 py-1">
                  <span className="font-medium text-elec-yellow">Manual handling</span>
                  <p className="mt-1">Injuries from lifting heavy equipment, cable drums or awkward loads incorrectly.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Construction className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Environmental Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-3">
                <li className="border-l-4 border-elec-yellow/40 pl-3 py-1">
                  <span className="font-medium text-elec-yellow">Noise exposure</span>
                  <p className="mt-1">Extended exposure to high noise levels on construction sites or in industrial settings.</p>
                </li>
                <li className="border-l-4 border-elec-yellow/40 pl-3 py-1">
                  <span className="font-medium text-elec-yellow">Hazardous substances</span>
                  <p className="mt-1">Contact with chemicals, solvents, cleaning agents, and other COSHH-regulated materials.</p>
                </li>
                <li className="border-l-4 border-elec-yellow/40 pl-3 py-1">
                  <span className="font-medium text-elec-yellow">Thermal comfort issues</span>
                  <p className="mt-1">Working in extreme heat or cold environments affecting concentration and performance.</p>
                </li>
                <li className="border-l-4 border-elec-yellow/40 pl-3 py-1">
                  <span className="font-medium text-elec-yellow">Dust and airborne particles</span>
                  <p className="mt-1">Respiratory hazards when drilling, cutting or working in dusty environments.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Work-Related Risks</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Work Process Hazards</h4>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Working with power tools and hand tools (risk of cuts, injuries)</li>
                  <li>Lone working (lack of immediate assistance in emergency)</li>
                  <li>Hot work procedures (soldering, welding, heat guns)</li>
                  <li>Insufficient training for tasks or equipment operation</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Organisational Risks</h4>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Inadequate emergency procedures or evacuation plans</li>
                  <li>Poor communication of hazards between teams or contractors</li>
                  <li>Time pressure leading to taking shortcuts on safety measures</li>
                  <li>Lack of proper supervision for apprentices and trainees</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 bg-elec-dark p-3 rounded border border-elec-yellow/20 text-sm">
              <p className="text-elec-yellow font-medium">Remember:</p>
              <p className="mt-1">The Control of Substances Hazardous to Health Regulations 2002 (COSHH) requires employers to control exposure to hazardous substances to prevent ill health. Electricians commonly encounter substances such as solvents, cleaning agents, dust, and fumes that may require specific control measures.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkplaceHazards;
