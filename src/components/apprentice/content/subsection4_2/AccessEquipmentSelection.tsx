
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, HardHat } from "lucide-react";

const AccessEquipmentSelection = () => {
  return (
    <Card className="border border-elec-yellow/30 bg-elec-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-elec-yellow">Access Equipment Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm md:text-base">
          Selecting the appropriate access equipment for electrical work is crucial for both safety and 
          efficiency. The choice depends on the task duration, height, location, and specific electrical 
          hazards present.
        </p>
        
        <div className="bg-elec-dark/50 border-l-4 border-red-500 p-4 rounded-r">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h4 className="font-semibold text-elec-yellow">Electrical Specific Considerations</h4>
          </div>
          <p className="text-sm">
            When working near electrical installations, standard height access equipment may present additional hazards. 
            Never use metal ladders or conductive access equipment near live electrical systems. Fiberglass ladders and 
            insulated platforms should be used when electrical shock risks are present.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <HardHat className="h-5 w-5 text-elec-yellow mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Short Duration Work</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">Best for tasks under 30 minutes where minimal movement is required</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Step ladders (non-conductive)</li>
                <li>Platform step ladders</li>
                <li>Lightweight mobile scaffold towers</li>
                <li>Podium steps</li>
                <li>Hop-ups and work platforms</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <HardHat className="h-5 w-5 text-elec-yellow mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Medium Duration Work</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">For tasks taking 30 minutes to several hours</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Mobile scaffold towers</li>
                <li>Podium platforms</li>
                <li>Mobile Elevating Work Platforms (MEWPs)</li>
                <li>Fixed scaffolds</li>
                <li>Specialist electrical access platforms</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <HardHat className="h-5 w-5 text-elec-yellow mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Long Duration Work</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">For electrical installations taking days or weeks</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Fixed scaffolding</li>
                <li>Mast climbing work platforms</li>
                <li>Tower scaffolds with multiple levels</li>
                <li>Custom-built work platforms</li>
                <li>Specialist electrical access systems</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20 mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-elec-yellow">Selection Decision Process</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-medium">Task Risk Assessment</span>
                <p className="text-sm mt-1">
                  Evaluate electrical hazards, working height, task duration, access constraints, and environmental conditions.
                </p>
              </li>
              <li>
                <span className="font-medium">Consider Electrical Hazards</span>
                <p className="text-sm mt-1">
                  For work near live systems, non-conductive equipment is essential. Metal scaffolding and MEWPs 
                  require additional precautions near overhead lines.
                </p>
              </li>
              <li>
                <span className="font-medium">Evaluate Working Space</span>
                <p className="text-sm mt-1">
                  Consider space constraints, floor loading capacity, and surface conditions. Some equipment requires 
                  level, stable ground while other types can accommodate uneven surfaces.
                </p>
              </li>
              <li>
                <span className="font-medium">Competence Assessment</span>
                <p className="text-sm mt-1">
                  Ensure workers are trained and competent to use the selected equipment. Specialised access equipment 
                  like MEWPs requires specific certification.
                </p>
              </li>
              <li>
                <span className="font-medium">Emergency Planning</span>
                <p className="text-sm mt-1">
                  Consider how a worker would be rescued in the event of an emergency, particularly for isolated 
                  electrical work at height. Rescue plans must be documented.
                </p>
              </li>
            </ol>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20 mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-elec-yellow">Fall Protection Systems for Electrical Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-elec-yellow mb-2">Collective Protection</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Guardrails on scaffold systems</li>
                  <li>Nets and soft landing systems</li>
                  <li>Mobile elevated work platforms with guardrails</li>
                  <li>Roof edge protection systems</li>
                  <li>Scaffolding systems with full edge protection</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-elec-yellow mb-2">Personal Protection</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Full body harnesses with shock-absorbing lanyards</li>
                  <li>Fall arrest systems with overhead anchor points</li>
                  <li>Work restraint systems preventing access to fall hazards</li>
                  <li>Properly rated anchor points suitable for electrical areas</li>
                  <li>Non-conductive components for electrical environments</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AccessEquipmentSelection;
