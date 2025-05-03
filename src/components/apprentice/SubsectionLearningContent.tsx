
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
        <p>Electrical drawings use standardised symbols to represent different components:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Power Symbols:</p>
            <ul className="list-disc pl-5">
              <li>Socket outlets (single and twin)</li>
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
        <p>BS 7671 specifies preferred zones for cable routes in walls to minimise the risk of damage:</p>
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
              <li><span className="font-semibold">SWA (Steel Wire Armoured):</span> Underground or external use</li>
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

  // New content specific to subsection 2.2 (Enclosures and Accessories)
  const renderSubsection2_2 = () => (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Enclosures and Their Applications</h2>
        <p>Electrical enclosures protect equipment from environmental conditions and prevent accidental contact with live parts. The selection process involves careful consideration of the installation environment and specific requirements:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Primary Functions of Enclosures:</p>
            <ul className="list-disc pl-5">
              <li>Protection against electric shock (basic protection)</li>
              <li>Physical protection of contained equipment</li>
              <li>Environmental protection (dust, moisture, etc.)</li>
              <li>Containment of potential fire or electrical faults</li>
              <li>Prevention of unauthorised access to equipment</li>
            </ul>
          </div>
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Common Types of Enclosures:</p>
            <ul className="list-disc pl-5">
              <li>Distribution boards and consumer units</li>
              <li>Junction boxes and connection enclosures</li>
              <li>Industrial control panels and motor starters</li>
              <li>Switch and socket back boxes</li>
              <li>Exterior equipment housings and cabinets</li>
            </ul>
          </div>
        </div>
        
        <p className="mt-3">BS 7671 requires all electrical connections to be contained within appropriate enclosures that provide the necessary degree of protection for the location and maintain the required ingress protection rating.</p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">IP Ratings and Environmental Protection</h2>
        <p>IP (Ingress Protection) ratings define the level of protection provided by electrical enclosures against solid objects and liquids. Understanding these ratings is critical for selecting appropriate enclosures for different environments:</p>
        
        <div className="border border-elec-yellow/30 p-4 rounded-md mt-3">
          <h3 className="font-semibold">First Digit (Protection against Solid Objects):</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-1">
            <div className="text-sm"><span className="font-medium">0:</span> No protection</div>
            <div className="text-sm"><span className="font-medium">1:</span> &gt;50mm objects</div>
            <div className="text-sm"><span className="font-medium">2:</span> &gt;12.5mm objects</div>
            <div className="text-sm"><span className="font-medium">3:</span> &gt;2.5mm objects</div>
            <div className="text-sm"><span className="font-medium">4:</span> &gt;1mm objects</div>
            <div className="text-sm"><span className="font-medium">5:</span> Dust protected</div>
            <div className="text-sm"><span className="font-medium">6:</span> Dust tight</div>
          </div>
          
          <h3 className="font-semibold mt-3">Second Digit (Protection against Liquids):</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            <div className="text-sm"><span className="font-medium">0:</span> No protection</div>
            <div className="text-sm"><span className="font-medium">1:</span> Dripping water</div>
            <div className="text-sm"><span className="font-medium">2:</span> Dripping water (15° tilted)</div>
            <div className="text-sm"><span className="font-medium">3:</span> Spraying water</div>
            <div className="text-sm"><span className="font-medium">4:</span> Splashing water</div>
            <div className="text-sm"><span className="font-medium">5:</span> Water jets</div>
            <div className="text-sm"><span className="font-medium">6:</span> Powerful water jets</div>
            <div className="text-sm"><span className="font-medium">7:</span> Temporary immersion</div>
            <div className="text-sm"><span className="font-medium">8:</span> Continuous immersion</div>
          </div>
        </div>
        
        <p className="mt-3">BS 7671 requires specific minimum IP ratings for different installation environments. For example, zone 1 in bathrooms requires at least IPX4, while outdoor installations typically require IP65 or higher.</p>
        
        <ElectricalSymbolsDisplay subsectionId={subsectionId} />
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Material Selection and Considerations</h2>
        <p>The choice of enclosure material affects its suitability for specific environments and applications:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Metal Enclosures:</p>
            <ul className="list-disc pl-5">
              <li>Steel (painted, galvanised, or stainless)</li>
              <li>Aluminium (lightweight, corrosion resistant)</li>
              <li>Advantages: Strength, EMI shielding, heat dissipation</li>
              <li>Disadvantages: Conductivity requires earthing, corrosion risk</li>
            </ul>
          </div>
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Non-metallic Enclosures:</p>
            <ul className="list-disc pl-5">
              <li>ABS (Acrylonitrile Butadiene Styrene)</li>
              <li>Polycarbonate (impact resistant)</li>
              <li>GRP (Glass Reinforced Plastic) for outdoor use</li>
              <li>Advantages: Insulating, lightweight, corrosion resistant</li>
              <li>Disadvantages: Lower impact resistance, UV degradation risk</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 border border-elec-yellow/30 p-3 rounded-md">
          <p className="font-semibold mb-2">Material Selection Factors:</p>
          <ul className="list-disc pl-5">
            <li><span className="font-medium">Environmental exposure:</span> Temperature extremes, UV radiation, corrosive atmospheres</li>
            <li><span className="font-medium">Mechanical requirements:</span> Impact resistance, load-bearing capability</li>
            <li><span className="font-medium">Fire performance:</span> Flame retardance, non-toxic emissions</li>
            <li><span className="font-medium">Operational factors:</span> Heat dissipation needs, EMI/RFI shielding requirements</li>
            <li><span className="font-medium">Regulatory compliance:</span> Specific material requirements for certain locations</li>
          </ul>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Regulatory Requirements for Enclosures</h2>
        <p>Electrical enclosures must comply with various regulations and standards to ensure safety and performance:</p>
        
        <div className="border border-elec-yellow/30 p-4 rounded-md mt-3">
          <h3 className="font-semibold">Key British Standards for Enclosures:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li><span className="font-medium">BS EN 62208</span> - Empty enclosures for low-voltage switchgear and controlgear assemblies</li>
            <li><span className="font-medium">BS EN 60529</span> - Specification for degrees of protection provided by enclosures (IP code)</li>
            <li><span className="font-medium">BS EN 61439</span> - Low-voltage switchgear and controlgear assemblies</li>
          </ul>
          
          <h3 className="font-semibold mt-3">BS 7671 Requirements:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>Regulation 416.2 - Basic protection by enclosures</li>
            <li>Regulation 526 - Electrical connections must ensure continuity</li>
            <li>Section 559 - Requirements for luminaire supporting couplers</li>
            <li>Regulation 513.1 - Accessibility for inspection and maintenance</li>
          </ul>
        </div>
        
        <p className="mt-3">Electricians must ensure that all enclosures are properly selected, installed, and maintained in accordance with manufacturer's instructions and relevant regulations.</p>
      </section>
    </>
  );

  // Content specific to subsection 2.3
  const renderSubsection2_3 = () => (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Component Compatibility</h2>
        <p>Ensuring component compatibility is essential for a safe and effective installation. Manufacturers' specifications, industry standards, and regulatory requirements guide the selection of compatible components.</p>
        <div className="mt-3 space-y-4">
          <p>Additional content for subsection 2.3 will be developed in future updates.</p>
        </div>
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
      case "2.2":
        return renderSubsection2_2();
      case "2.3":
        return renderSubsection2_3();
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
