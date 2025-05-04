
import React from "react";

const Subsection2_1 = () => {
  return (
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
};

export default Subsection2_1;
