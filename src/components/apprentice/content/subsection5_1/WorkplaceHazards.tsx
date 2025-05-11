
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
          <Card className="bg-elec-dark/50 border border-elec-yellow/20 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <HardHat className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Physical Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Slips, Trips and Falls</h4>
                  <p>Caused by uneven surfaces, trailing cables, poor housekeeping, and improper storage of materials.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Working at Height</h4>
                  <p>Risks when using ladders, scaffolds or platforms without proper safety measures.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Confined Spaces</h4>
                  <p>Limited access/egress points creating additional risks during emergency situations.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Manual Handling</h4>
                  <p>Injuries from lifting heavy equipment, cable drums or awkward loads incorrectly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Construction className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Environmental Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Noise Exposure</h4>
                  <p>Extended exposure to high noise levels on construction sites or in industrial settings.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Hazardous Substances</h4>
                  <p>Contact with chemicals, solvents, cleaning agents, and other COSHH-regulated materials.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Thermal Issues</h4>
                  <p>Working in extreme heat or cold environments affecting concentration and performance.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Dust and Particles</h4>
                  <p>Respiratory hazards when drilling, cutting or working in dusty environments.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20 col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Work Process Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Power Tools</h4>
                  <p>Risk of cuts, abrasions and entanglement when using power tools without proper training or guards.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Lone Working</h4>
                  <p>Lack of immediate assistance in emergency situations when working alone on site.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Hot Work</h4>
                  <p>Soldering, welding and using heat guns can create fire hazards and burn injuries.</p>
                </div>
                
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                  <h4 className="font-medium text-elec-yellow mb-1">Inadequate Training</h4>
                  <p>Insufficient knowledge to safely operate equipment or perform tasks correctly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">COSHH</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-elec-dark p-3 rounded border border-elec-yellow/20 text-sm">
                <p className="text-elec-yellow font-medium mb-2">Control of Substances Hazardous to Health</p>
                <p>The COSHH Regulations 2002 require employers to control exposure to hazardous substances to prevent ill health.</p>
                <div className="mt-3 pt-3 border-t border-elec-yellow/20">
                  <p>Electricians commonly encounter:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Solvents and cleaners</li>
                    <li>Cable lubricants</li>
                    <li>Drilling dust</li>
                    <li>Sealants and adhesives</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceHazards;
