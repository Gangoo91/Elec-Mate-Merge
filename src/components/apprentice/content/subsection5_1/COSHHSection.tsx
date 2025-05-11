
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const COSHHSection = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">COSHH - Control of Substances Hazardous to Health</h3>
      
      <p className="text-sm md:text-base mb-4">
        The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers to control exposure to 
        hazardous substances to prevent ill health. These regulations are particularly important for electricians who 
        frequently encounter various chemicals and substances in their work.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Common COSHH Substances</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Solvents and Cleaners</h4>
                <p className="text-sm">Used for cleaning electrical contacts and components, can cause skin irritation and respiratory issues.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Cable Lubricants</h4>
                <p className="text-sm">Used to ease cable installation, may contain chemicals harmful if ingested or in contact with eyes.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Drilling Dust</h4>
                <p className="text-sm">Can contain silica, plaster, and other harmful particles that can damage lungs when inhaled.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Sealants and Adhesives</h4>
                <p className="text-sm">Often contain volatile organic compounds (VOCs) that can cause headaches and respiratory problems.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">COSHH Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Risk Assessment</h4>
                <p className="text-sm">Employers must assess risks from hazardous substances before work begins.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Control Measures</h4>
                <p className="text-sm">Implementation of appropriate control measures to prevent or reduce exposure.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Safety Data Sheets</h4>
                <p className="text-sm">Manufacturers must provide these for all hazardous substances, containing vital safety information.</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Training</h4>
                <p className="text-sm">Workers must be informed about the hazards, risks, and precautions required when working with these substances.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-elec-dark/50 border border-elec-yellow/20 mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-elec-yellow">COSHH Control Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="p-3 rounded bg-elec-dark border border-elec-yellow/10 flex items-center gap-3">
              <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <h4 className="font-medium">Elimination</h4>
                <p className="text-sm">Completely remove the hazardous substance from the work process</p>
              </div>
            </li>
            
            <li className="p-3 rounded bg-elec-dark border border-elec-yellow/10 flex items-center gap-3">
              <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">2</span>
              <div>
                <h4 className="font-medium">Substitution</h4>
                <p className="text-sm">Replace with a less hazardous alternative</p>
              </div>
            </li>
            
            <li className="p-3 rounded bg-elec-dark border border-elec-yellow/10 flex items-center gap-3">
              <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">3</span>
              <div>
                <h4 className="font-medium">Engineering Controls</h4>
                <p className="text-sm">Use physical controls like ventilation systems</p>
              </div>
            </li>
            
            <li className="p-3 rounded bg-elec-dark border border-elec-yellow/10 flex items-center gap-3">
              <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">4</span>
              <div>
                <h4 className="font-medium">Administrative Controls</h4>
                <p className="text-sm">Implement safe working procedures and training</p>
              </div>
            </li>
            
            <li className="p-3 rounded bg-elec-dark border border-elec-yellow/10 flex items-center gap-3">
              <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">5</span>
              <div>
                <h4 className="font-medium">Personal Protective Equipment</h4>
                <p className="text-sm">Use PPE as a last resort when other controls are insufficient</p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default COSHHSection;
