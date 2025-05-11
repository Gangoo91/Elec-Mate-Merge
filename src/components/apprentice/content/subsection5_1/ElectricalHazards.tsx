
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Cable, AlertTriangle, Shield } from "lucide-react";

const ElectricalHazards = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Types of Electrical Hazards</h3>
      
      <div className="space-y-4 md:space-y-6">
        <p className="text-sm md:text-base">
          Electrical hazards are particularly dangerous in the workplace because electricity is invisible and often gives no warning before causing harm. As a qualified electrician, you must be able to identify, assess, and control these hazards.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Electrical Contact Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Direct Contact</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Exposed live parts in electrical equipment</li>
                  <li>Damaged insulation on conductors</li>
                  <li>Work on or near live electrical equipment</li>
                  <li>Overhead power lines contact</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Indirect Contact</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Metalwork made live through faults</li>
                  <li>Water near electrical equipment</li>
                  <li>Defective earthing systems</li>
                  <li>Failure of protective devices</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Cable className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Installation Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Equipment Faults</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Overloaded circuits and distribution boards</li>
                  <li>Damaged or poor connections</li>
                  <li>Incorrect fuse ratings or protective devices</li>
                  <li>Inadequate maintenance of equipment</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Installation Issues</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Non-compliant wiring installations</li>
                  <li>Improper cable selection for environment</li>
                  <li>Inadequate protection of cables</li>
                  <li>Incorrect equipment selection for zones</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Environmental Electrical Hazards</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Environmental Factors</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">Moisture and water</span> - Increasing shock risk and creating paths to earth</li>
                  <li><span className="font-medium">Dusty environments</span> - May cause equipment overheating and fire risks</li>
                  <li><span className="font-medium">Corrosive atmospheres</span> - Degrading electrical insulation and components</li>
                  <li><span className="font-medium">Extreme temperatures</span> - Affecting insulation properties and equipment operation</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Special Location Hazards</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><span className="font-medium">Construction sites</span> - Temporary installations and damage risks</li>
                  <li><span className="font-medium">Explosive atmospheres</span> - Requiring ATEX-rated equipment</li>
                  <li><span className="font-medium">Confined spaces</span> - Limited access and increased risk during emergencies</li>
                  <li><span className="font-medium">Public areas</span> - Additional protection needs for unauthorised access</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElectricalHazards;
