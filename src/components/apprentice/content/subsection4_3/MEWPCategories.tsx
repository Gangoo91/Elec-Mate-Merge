
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MEWPCategories = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">MEWP Categories & Selection for Electrical Work</h3>
      
      <div className="space-y-4 md:space-y-6">
        <p className="text-sm md:text-base">
          Understanding MEWP categories is essential for selecting the appropriate equipment for electrical installations.
          MEWPs are classified according to the International Powered Access Federation (IPAF) categories.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-elec-yellow">MEWP Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Group A: Vertical Lift</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Movement only permitted with platform in stowed position</li>
                  <li>All controls located on the platform</li>
                  <li>Includes vertical lifts and scissor lifts</li>
                  <li><span className="font-medium">Electrical usage:</span> Indoor lighting installations, cable tray fitting, distribution board work</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Group B: Boom Lifts</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Can be moved with platform raised</li>
                  <li>Controls at platform and often ground level</li>
                  <li>Includes articulating and telescopic booms</li>
                  <li><span className="font-medium">Electrical usage:</span> Exterior lighting, overhead line work, electrical panel access in confined spaces</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-elec-yellow">MEWP Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Type 1: Static Base</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Movement only by manual effort, towable</li>
                  <li>Must be stabilised before use</li>
                  <li><span className="font-medium">Electrical usage:</span> Fixed position lighting installation, limited access areas</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Type 2: Vehicle/Crawler Mounted</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Mounted on vehicles or tracked base</li>
                  <li>Can be driven between positions then stabilised</li>
                  <li><span className="font-medium">Electrical usage:</span> External electrical installations, street lighting</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">Type 3: Self-Propelled</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Can be driven with platform raised</li>
                  <li>Most versatile for electrical contracting</li>
                  <li><span className="font-medium">Electrical usage:</span> Factory installations, warehouse lighting</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-elec-yellow">Selection Criteria for Electrical Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><span className="font-medium">Working height requirement</span> - Select MEWP with sufficient height plus safety margin</li>
                <li><span className="font-medium">Reach requirements</span> - Consider horizontal reach needed for electrical access</li>
                <li><span className="font-medium">Ground conditions</span> - Ensure surface can support MEWP weight, especially near cable trenches</li>
                <li><span className="font-medium">Indoor/outdoor use</span> - Check noise, emissions, and weather capabilities</li>
                <li><span className="font-medium">Power source</span> - Electric for indoor work (no emissions), diesel for outdoor</li>
              </ul>
              
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><span className="font-medium">Space constraints</span> - Check doorway clearances and working area size</li>
                <li><span className="font-medium">Floor loadings</span> - Especially critical in raised floors housing cables</li>
                <li><span className="font-medium">Risk of electric shock</span> - Assess proximity to live electrical equipment</li>
                <li><span className="font-medium">Need to carry materials</span> - Platform capacity for tools and electrical components</li>
                <li><span className="font-medium">Duration of work</span> - Battery life for electric MEWPs during extended installations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MEWPCategories;
