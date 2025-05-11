
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const LadderTypes = () => {
  return (
    <Card className="border border-elec-yellow/30 bg-elec-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-elec-yellow">Types of Ladders for Electrical Work</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-elec-light/90">
          For electrical work, selecting the appropriate ladder type is crucial not only for access but also 
          for electrical safety. Different materials and designs offer various advantages and safety features.
        </p>
        
        <div className="pt-4">
          <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-elec-yellow/20">
            <ResizablePanel defaultSize={33} minSize={20} className="bg-elec-dark/50 p-4 rounded-l-lg">
              <h4 className="font-semibold text-elec-yellow mb-3">Fiberglass Ladders</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><span className="font-medium">Non-conductive</span> - Safe for electrical work</li>
                <li>Resistant to corrosion and chemical damage</li>
                <li>Heavier than aluminium alternatives</li>
                <li>Mandatory near exposed electrical components</li>
                <li>Typically colour-coded yellow for electrical work</li>
                <li>Meets BS EN 131-7 insulation standards</li>
              </ul>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={33} minSize={20} className="bg-elec-dark/50 p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Aluminium Ladders</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><span className="text-red-400 font-medium">Conductive</span> - NOT suitable near live electricity</li>
                <li>Lightweight and easy to transport</li>
                <li>Corrosion resistant</li>
                <li>Can only be used on fully isolated electrical systems</li>
                <li>Typically more affordable than fiberglass</li>
                <li>Common in general construction settings</li>
              </ul>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={33} minSize={20} className="bg-elec-dark/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-elec-yellow mb-3">Wooden Ladders</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Naturally non-conductive when dry</li>
                <li>Rarely used in modern electrical work</li>
                <li>Can become conductive when wet</li>
                <li>Subject to deterioration over time</li>
                <li>Regular inspection critical for integrity</li>
                <li>Limited by BS EN 131 standards</li>
              </ul>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-elec-yellow">Ladder Designs for Electrical Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <span className="font-medium text-elec-yellow">Extension Ladders</span>
                  <p className="text-sm mt-1">Used for accessing higher elevations; must be properly secured before climbing. 
                  Required overlap sections increase with ladder length.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Stepladders</span>
                  <p className="text-sm mt-1">Self-supporting; ideal for lighting installations and low-level distribution board work.
                  Must be fully opened with spreaders locked.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Platform Ladders</span>
                  <p className="text-sm mt-1">Include a standing platform; excellent for extended work periods and when using both hands
                  for electrical connections. Provide better stability.</p>
                </li>
                <li>
                  <span className="font-medium text-elec-yellow">Combination Ladders</span>
                  <p className="text-sm mt-1">Versatile design; can function as stepladder, extension ladder, or stairwell ladder.
                  Useful for varying electrical tasks throughout a project.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-elec-yellow">Classification Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Ladders for professional electrical work must conform to EN 131 Professional standard or 
                BS 2037 Class 1. These classifications ensure appropriate duty ratings for industrial use.
              </p>
              <div className="bg-elec-dark/70 p-4 rounded-lg border border-elec-yellow/20">
                <h5 className="font-medium text-elec-yellow mb-2">Load Ratings</h5>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-medium">Class 1 (Industrial):</span> Maximum load - 175kg</li>
                  <li><span className="font-medium">EN131 Professional:</span> Maximum load - 150kg</li>
                  <li><span className="font-medium">EN131 Non-Professional:</span> Maximum load - 120kg</li>
                  <li><span className="font-medium">Class 3 (Domestic):</span> NOT suitable for electrical work</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default LadderTypes;
