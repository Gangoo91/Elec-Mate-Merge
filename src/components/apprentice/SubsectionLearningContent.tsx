
import React from "react";
import ElectricalSymbolsDisplay from "./ElectricalSymbolsDisplay";
import InteractiveLightDemo from "./InteractiveLightDemo";

type SubsectionLearningContentProps = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const SubsectionLearningContent = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionLearningContentProps) => {
  
  // Content specific to subsection 1.1
  const renderSubsection1_1 = () => (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Understanding Electrical Drawings</h2>
        <p>Electrical drawings serve as the blueprint for installations and include various symbols and notations that represent electrical components. They typically include:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Floor plans with circuit layouts</li>
          <li>Schematic diagrams showing electrical connections</li>
          <li>Detailed specifications for equipment</li>
          <li>Cable routing diagrams and schedules</li>
        </ul>
        <p className="mt-3">Accurate interpretation of these drawings is crucial for successful installations that meet specifications and safety requirements.</p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Common Electrical Symbols</h2>
        <p>Electrical drawings use standardized symbols to represent different components:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Power Symbols:</p>
            <ul className="list-disc pl-5">
              <li>Socket outlets (single and double)</li>
              <li>Switched socket outlets</li>
              <li>Fused connection units</li>
              <li>Distribution boards</li>
            </ul>
          </div>
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Lighting Symbols:</p>
            <ul className="list-disc pl-5">
              <li>Light fittings (various types)</li>
              <li>Light switches (1-way, 2-way)</li>
              <li>Dimmer switches</li>
              <li>Emergency lighting</li>
            </ul>
          </div>
        </div>
        
        <ElectricalSymbolsDisplay subsectionId={subsectionId} />
        
        <InteractiveLightDemo 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      </section>
    </>
  );

  // Content specific to subsection 1.2
  const renderSubsection1_2 = () => (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Installation Method Factors</h2>
        <p>Selecting appropriate installation methods requires consideration of numerous factors:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Building Structure:</p>
            <ul className="list-disc pl-5">
              <li>Concrete structures may require chasing or surface mounting</li>
              <li>Timber frame buildings allow for cavity routing</li>
              <li>Steel structures require special fixing considerations</li>
              <li>Listed buildings may have restrictions on visible equipment</li>
            </ul>
          </div>
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Environment:</p>
            <ul className="list-disc pl-5">
              <li>Wet areas require higher IP rated equipment</li>
              <li>Dusty environments need sealed enclosures</li>
              <li>Corrosive atmospheres require special materials</li>
              <li>Temperature extremes affect cable selection</li>
            </ul>
          </div>
        </div>
        <p className="mt-3">The installation method chosen must comply with BS 7671 while considering these environmental factors.</p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Typical Installation Methods</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">Surface Mounted:</span> Using trunking, conduit or cable clips on walls/ceilings</li>
          <li><span className="font-semibold">Concealed:</span> Embedded within building fabric, requiring chasing or pre-installation</li>
          <li><span className="font-semibold">Under Floor:</span> Using raised access flooring or in-screed systems</li>
          <li><span className="font-semibold">Overhead:</span> Suspended cable tray or basket systems</li>
        </ul>
        <p className="mt-3">Each method has advantages and limitations in terms of cost, aesthetics, and future accessibility.</p>
      </section>
    </>
  );

  // Content specific to subsection 1.3
  const renderSubsection1_3 = () => (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Installation Zones in Buildings</h2>
        <p>BS 7671 specifies preferred zones for cable routes in walls to minimize the risk of damage:</p>
        <div className="border border-elec-yellow/30 p-4 rounded-md mt-3">
          <h3 className="font-semibold">Horizontal Zones:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>0-150mm from ceiling</li>
            <li>150-450mm from ceiling</li>
            <li>0-150mm from floor</li>
          </ul>
          
          <h3 className="font-semibold mt-4">Vertical Zones:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>0-150mm from corners</li>
            <li>150-450mm from openings (doors, windows)</li>
          </ul>
        </div>
        <p className="mt-3">Cables run outside these zones should be at least 50mm deep or have additional mechanical protection.</p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Special Location Considerations</h2>
        <p>Certain locations have specific zone requirements that affect cable routing:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Bathrooms:</p>
            <ul className="list-disc pl-5">
              <li>Divided into zones 0, 1, 2, and outside zones</li>
              <li>Specific IP ratings required in each zone</li>
              <li>Restrictions on equipment in zones 0 and 1</li>
              <li>SELV devices preferred in wet zones</li>
            </ul>
          </div>
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Kitchens:</p>
            <ul className="list-disc pl-5">
              <li>Socket outlets at least 150mm above worktops</li>
              <li>Avoidance of areas behind appliances</li>
              <li>Special considerations for cooker circuits</li>
              <li>Higher rating for circuits supplying fixed appliances</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );

  // Content specific to subsection 2.1
  const renderSubsection2_1 = () => (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Cable Types and Their Applications</h2>
        <p>Different cable types are suited to different applications based on their construction and properties:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Common Cable Types:</p>
            <ul className="list-disc pl-5">
              <li><span className="font-semibold">PVC Flat Twin & Earth:</span> Standard domestic wiring</li>
              <li><span className="font-semibold">LSZH (Low Smoke Zero Halogen):</span> For public buildings</li>
              <li><span className="font-semibold">SWA (Steel Wire Armored):</span> Underground or external use</li>
              <li><span className="font-semibold">FP (Fire Performance):</span> Emergency circuits</li>
              <li><span className="font-semibold">MI (Mineral Insulated):</span> High temperature areas</li>
            </ul>
          </div>
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Sizing Factors:</p>
            <ul className="list-disc pl-5">
              <li>Current-carrying capacity</li>
              <li>Voltage drop considerations</li>
              <li>Grouping factors</li>
              <li>Ambient temperature</li>
              <li>Installation method</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Cable Calculation Principles</h2>
        <p>Proper cable sizing requires consideration of several factors:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><span className="font-semibold">Design Current:</span> Maximum expected load plus any diversity factors</li>
          <li><span className="font-semibold">Correction Factors:</span> Applied for grouping, ambient temperature, and other derating factors</li>
          <li><span className="font-semibold">Voltage Drop:</span> Must be within limits specified in BS 7671 (typically 3% for lighting, 5% for other uses)</li>
          <li><span className="font-semibold">Overload Protection:</span> Cable rating must be appropriate for the protective device</li>
        </ul>
        <p className="mt-3">Tables in BS 7671 Appendix 4 provide current-carrying capacities for different types of cables under various installation methods.</p>
      </section>
    </>
  );

  // Render the appropriate content based on subsection ID
  const renderContentBySubsectionId = () => {
    switch (subsectionId) {
      case "1.1":
        return renderSubsection1_1();
      case "1.2":
        return renderSubsection1_2();
      case "1.3":
        return renderSubsection1_3();
      case "2.1":
        return renderSubsection2_1();
      default:
        return <p>Content for subsection {subsectionId} is not yet available.</p>;
    }
  };

  return (
    <div className="space-y-8">
      {renderContentBySubsectionId()}
    </div>
  );
};

export default SubsectionLearningContent;
