
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Cable, AlertTriangle } from "lucide-react";

const ElectricalHazards = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Types of Electrical Hazards</h3>
      
      <div className="space-y-4 md:space-y-6">
        <p className="text-sm md:text-base">
          Electrical hazards are particularly dangerous in the workplace because electricity is invisible and often gives no warning before causing harm. As a qualified electrician, you must be able to identify, assess, and control these hazards.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Direct Contact</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li className="bg-elec-dark p-2 rounded">Exposed live parts in electrical equipment</li>
                <li className="bg-elec-dark p-2 rounded">Damaged insulation on conductors</li>
                <li className="bg-elec-dark p-2 rounded">Work on or near live electrical equipment</li>
                <li className="bg-elec-dark p-2 rounded">Overhead power lines contact</li>
                <li className="bg-elec-dark p-2 rounded">Inadequate earthing or bonding</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Cable className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Indirect Contact</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li className="bg-elec-dark p-2 rounded">Metalwork made live through faults</li>
                <li className="bg-elec-dark p-2 rounded">Water near electrical equipment</li>
                <li className="bg-elec-dark p-2 rounded">Defective earthing systems</li>
                <li className="bg-elec-dark p-2 rounded">Failure of protective devices</li>
                <li className="bg-elec-dark p-2 rounded">Incorrect installation methods</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Installation Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li className="bg-elec-dark p-2 rounded">Overloaded circuits</li>
                <li className="bg-elec-dark p-2 rounded">Damaged connections</li>
                <li className="bg-elec-dark p-2 rounded">Incorrect protective devices</li>
                <li className="bg-elec-dark p-2 rounded">Inadequate maintenance</li>
                <li className="bg-elec-dark p-2 rounded">Non-compliant installations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Environmental Factors</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <span className="font-medium text-elec-yellow min-w-[100px]">Moisture</span>
                  <span>Increasing shock risk and creating paths to earth</span>
                </div>
                
                <div className="flex gap-3 bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <span className="font-medium text-elec-yellow min-w-[100px]">Dust</span>
                  <span>May cause equipment overheating and fire risks</span>
                </div>
                
                <div className="flex gap-3 bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <span className="font-medium text-elec-yellow min-w-[100px]">Corrosion</span>
                  <span>Degrading electrical insulation and components</span>
                </div>
                
                <div className="flex gap-3 bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <span className="font-medium text-elec-yellow min-w-[100px]">Temperature</span>
                  <span>Affecting insulation properties and equipment operation</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Special Locations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <span className="font-medium text-elec-yellow min-w-[100px]">Construction</span>
                  <span>Temporary installations and damage risks</span>
                </div>
                
                <div className="flex gap-3 bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <span className="font-medium text-elec-yellow min-w-[100px]">ATEX Zones</span>
                  <span>Areas requiring explosion-proof equipment</span>
                </div>
                
                <div className="flex gap-3 bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <span className="font-medium text-elec-yellow min-w-[100px]">Confined Spaces</span>
                  <span>Limited access during emergencies</span>
                </div>
                
                <div className="flex gap-3 bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <span className="font-medium text-elec-yellow min-w-[100px]">Public Areas</span>
                  <span>Protection needed from unauthorised access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ElectricalHazards;
