
import React from "react";

const MEWPCategories = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">MEWP Categories & Selection for Electrical Work</h3>
      
      <div className="space-y-4">
        <p>
          Understanding MEWP categories is essential for selecting the appropriate equipment for electrical installations.
          MEWPs are classified according to the International Powered Access Federation (IPAF) categories.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">MEWP Groups</h4>
            
            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20 mb-4">
              <h5 className="font-medium mb-2">Group A: Vertical Lift</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Movement is only permitted with platform in stowed position</li>
                <li>All controls located on the platform</li>
                <li>Includes vertical lifts and scissor lifts</li>
                <li><span className="font-medium">Electrical usage:</span> Indoor lighting installations, cable tray fitting, fixed distribution board work</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
              <h5 className="font-medium mb-2">Group B: Boom Lifts</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Can be moved with platform raised</li>
                <li>Controls at platform and often ground level</li>
                <li>Includes articulating and telescopic booms</li>
                <li><span className="font-medium">Electrical usage:</span> Exterior lighting, overhead line work, electrical panel access in congested areas</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">MEWP Types</h4>
            
            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20 mb-4">
              <h5 className="font-medium mb-2">Type 1: Static Base</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Movement only by manual effort, towable</li>
                <li>Must be stabilized before use</li>
                <li><span className="font-medium">Electrical usage:</span> Fixed position lighting installation, limited access areas where vehicle MEWPs cannot enter</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20 mb-4">
              <h5 className="font-medium mb-2">Type 2: Vehicle/Crawler Mounted</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Mounted on vehicles or tracked base</li>
                <li>Can be driven between positions then stabilized</li>
                <li><span className="font-medium">Electrical usage:</span> External electrical installations, street lighting, extensive cable run installation</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
              <h5 className="font-medium mb-2">Type 3: Self-Propelled</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Can be driven with platform raised</li>
                <li>Most versatile for electrical contracting</li>
                <li><span className="font-medium">Electrical usage:</span> Factory installations, warehouse lighting, versatile electrical services work</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold text-elec-yellow mb-3">Selection Criteria for Electrical Applications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Working height requirement</span> - Select MEWP with sufficient height plus safety margin</li>
              <li><span className="font-medium">Reach requirements</span> - Consider horizontal reach needed for electrical access</li>
              <li><span className="font-medium">Ground conditions</span> - Ensure surface can support MEWP weight, especially near cable trenches</li>
              <li><span className="font-medium">Indoor/outdoor use</span> - Check noise, emissions, and weather capabilities</li>
              <li><span className="font-medium">Power source</span> - Electric for indoor work (no emissions), diesel for outdoor</li>
            </ul>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Space constraints</span> - Check doorway clearances and working area size</li>
              <li><span className="font-medium">Floor loadings</span> - Especially critical in raised floors housing cables</li>
              <li><span className="font-medium">Risk of electric shock</span> - Assess proximity to live electrical equipment</li>
              <li><span className="font-medium">Need to carry materials</span> - Platform capacity for tools and electrical components</li>
              <li><span className="font-medium">Duration of work</span> - Battery life for electric MEWPs during extended electrical installations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MEWPCategories;
