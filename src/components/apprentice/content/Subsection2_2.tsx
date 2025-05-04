
import React from "react";
import ElectricalSymbolsDisplay from "../ElectricalSymbolsDisplay";

type Subsection2_2Props = {
  subsectionId: string;
};

const Subsection2_2 = ({ subsectionId }: Subsection2_2Props) => {
  return (
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
};

export default Subsection2_2;
