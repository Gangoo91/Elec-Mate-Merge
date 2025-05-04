
import React from "react";

type Subsection1_2Props = {
  subsectionId: string;
};

const Subsection1_2 = ({ subsectionId }: Subsection1_2Props) => {
  return (
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
};

export default Subsection1_2;
