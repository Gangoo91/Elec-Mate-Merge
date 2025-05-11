
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldAlert, HardHat, Shield } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Subsection6_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection6_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection6_2Props) => {
  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Main Heading */}
      <div>
        <h2 className="text-2xl font-bold text-elec-yellow">Personal Protective Equipment (PPE) for Electrical Work</h2>
        <p className="mt-2 text-elec-light/80">
          PPE serves as the final line of defence against electrical hazards when all other safety measures have been implemented. The Electricity at Work Regulations 1989 mandate the use of appropriate PPE for electrical work.
        </p>
      </div>
      
      {/* Decorative Separator with Icon */}
      <div className="flex items-center gap-4 py-2">
        <Separator className="flex-grow bg-elec-yellow/30" />
        <div className="bg-elec-yellow/10 p-2 rounded-full">
          <span className="text-elec-yellow text-xl">⚡</span>
        </div>
        <Separator className="flex-grow bg-elec-yellow/30" />
      </div>
      
      {/* PPE Categories Section */}
      <Card className="bg-elec-gray border border-elec-yellow/20">
        <CardHeader className="bg-gradient-to-r from-elec-yellow/10 to-transparent border-b border-elec-yellow/20 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-xl font-bold text-elec-yellow">PPE Categories for Electrical Work</h3>
            </div>
            <div className="px-3 py-1.5 bg-elec-yellow/10 rounded-full text-sm text-elec-yellow border border-elec-yellow/20 hidden md:flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Essential Protection</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <p className="text-base mb-6">
            Different categories of PPE provide protection against specific electrical hazards. Selection must be based on risk assessment and the voltage levels involved.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Insulating PPE */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-elec-yellow/10 rounded-lg">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow text-lg">Insulating PPE</h4>
              </div>
              
              <div className="space-y-3">
                <PPECard title="Insulating Gloves">
                  <li>Must comply with BS EN 60903 standard</li>
                  <li>Classified by voltage rating (Class 00 to 4)</li>
                  <li>Class 0: up to 1,000V AC (yellow)</li>
                  <li>Class 2: up to 17,000V AC (orange)</li>
                  <li>Require regular inspection and testing</li>
                  <li>Often used with leather overgloves for mechanical protection</li>
                </PPECard>
                
                <PPECard title="Insulating Mats">
                  <li>Comply with BS EN 61111 standard</li>
                  <li>Placed in front of electrical equipment</li>
                  <li>Provide standing insulation for the operator</li>
                  <li>Available in different voltage ratings</li>
                  <li>Must be kept clean and dry to maintain effectiveness</li>
                </PPECard>
                
                <PPECard title="Insulating Tools">
                  <li>VDE/BS EN 60900 rated for 1000V AC/1500V DC</li>
                  <li>Double insulation with distinctive colour coding</li>
                  <li>Must be visually inspected before each use</li>
                  <li>Cannot substitute for proper isolation procedures</li>
                  <li>No exposed metal parts in working end</li>
                </PPECard>
              </div>
            </div>
            
            {/* Arc Flash Protection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-elec-yellow/10 rounded-lg">
                  <ShieldAlert className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow text-lg">Arc Flash Protection</h4>
              </div>
              
              <div className="space-y-3">
                <PPECard title="Arc Flash Clothing">
                  <li>Rated in cal/cm² (8-40 cal/cm² based on risk)</li>
                  <li>Compliant with IEC 61482-1-1 standard</li>
                  <li>Categories determined by incident energy analysis</li>
                  <li>Full body protection including jacket, trousers</li>
                  <li>Must be worn completely fastened</li>
                  <li>No synthetic undergarments should be worn</li>
                </PPECard>
                
                <PPECard title="Face and Head Protection">
                  <li>Arc rated face shield (minimum 12 cal/cm²)</li>
                  <li>Arc flash hood for higher energy situations</li>
                  <li>Safety helmet rated to BS EN 397</li>
                  <li>Integrated systems available for comprehensive protection</li>
                  <li>Must provide adequate visibility for tasks</li>
                </PPECard>

                <PPECard title="Hearing and Respiratory">
                  <li>Ear protection for loud arc flash events</li>
                  <li>Filter respirators for smoke/particulates</li>
                  <li>Must not interfere with other PPE</li>
                  <li>Consideration for communication needs</li>
                  <li>Suitable for emergency evacuation if needed</li>
                </PPECard>
              </div>
            </div>
          </div>
          
          <div className="mt-5 p-4 border-t border-elec-yellow/20 bg-gradient-to-b from-elec-dark/70 to-elec-dark">
            <p className="font-medium mb-1 text-elec-yellow text-sm">Regulatory Requirements:</p>
            <p className="text-sm">PPE selection must comply with the Personal Protective Equipment at Work Regulations 1992 (as amended), which requires employers to provide suitable PPE where risks cannot be controlled by other means. For electrical work, the Electricity at Work Regulations 1989 requires all reasonable steps to be taken to prevent danger.</p>
          </div>
        </CardContent>
      </Card>
      
      {/* General Safety PPE Requirements */}
      <div className="rounded-lg border border-elec-yellow/20 p-4 md:p-6 bg-gradient-to-b from-elec-dark/50 to-elec-dark">
        <h3 className="text-2xl font-bold text-elec-yellow mb-6">General Safety PPE Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Head and Eye Protection */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
              <HardHat className="h-5 w-5" />
              Head and Eye Protection
            </h4>
            <ul className="space-y-4">
              <li className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                <span className="font-medium text-elec-yellow">Safety Helmets</span>
                <p className="mt-1 text-sm">BS EN 397 compliant with electrical insulation properties. Must be regularly inspected for damage and replaced after significant impact or every 2-5 years depending on manufacturer's guidance.</p>
              </li>
              <li className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                <span className="font-medium text-elec-yellow">Safety Glasses/Goggles</span>
                <p className="mt-1 text-sm">BS EN 166 rated with appropriate impact protection. Side shields are essential for electrical work. Anti-fog coatings improve usability. Must be comfortable enough to wear for extended periods.</p>
              </li>
              <li className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                <span className="font-medium text-elec-yellow">Face Shields</span>
                <p className="mt-1 text-sm">For protection against electrical flash and flying particles. Can be integrated with helmet for complete protection. Must provide clear vision and be suitable for wearing with prescription glasses if needed.</p>
              </li>
            </ul>
          </div>
          
          {/* Body and Extremity Protection */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Body and Extremity Protection
            </h4>
            <ul className="space-y-4">
              <li className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                <span className="font-medium text-elec-yellow">Safety Footwear</span>
                <p className="mt-1 text-sm">BS EN ISO 20345 compliant with electrical resistance properties. Additional protection may include metatarsal guards, puncture-resistant soles, and ankle support. Should be comfortable for all-day wear.</p>
              </li>
              <li className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                <span className="font-medium text-elec-yellow">Flame-Resistant Clothing</span>
                <p className="mt-1 text-sm">BS EN ISO 11612 compliant for thermal hazards. Non-melting fabrics that self-extinguish when removed from ignition source. Must fit correctly and be suitable for seasonal conditions.</p>
              </li>
              <li className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                <span className="font-medium text-elec-yellow">Hi-Visibility Clothing</span>
                <p className="mt-1 text-sm">BS EN ISO 20471 for work near roadways or in low light conditions. Class 2 or 3 depending on risk assessment. Must be compatible with other PPE items and should not interfere with movement.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Inspection and Limitations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <div className="p-4 md:p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Inspection, Maintenance and Limitations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testing and Inspection */}
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Testing and Inspection</h4>
              <ul className="space-y-3">
                <li className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                  <span className="font-medium block">Insulating Gloves</span>
                  <p className="text-sm mt-1">Visual inspection before each use, air test to check for leaks, formal electrical test every 6 months. Check for cuts, punctures, abrasions, and chemical contamination.</p>
                </li>
                <li className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                  <span className="font-medium block">Insulating Mats</span>
                  <p className="text-sm mt-1">Visual inspection before use, periodic electrical testing according to manufacturer's recommendations. Examine for tears, cuts, and contamination that could compromise insulation.</p>
                </li>
                <li className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                  <span className="font-medium block">Insulated Tools</span>
                  <p className="text-sm mt-1">Regular inspection for cracks, cuts or damage to insulation. Tools with damaged insulation must be removed from service immediately. Annual testing recommended for tools used regularly.</p>
                </li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/20">
                <h5 className="font-medium text-elec-yellow text-sm">Documentation Requirements</h5>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                  <li>Record of PPE issued to workers</li>
                  <li>Inspection and test certificates</li>
                  <li>Training records for PPE use</li>
                  <li>Risk assessment documentation</li>
                  <li>Maintenance and replacement schedule</li>
                </ul>
              </div>
            </div>
            
            {/* Limitations of PPE */}
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Limitations of PPE</h4>
              <ul className="space-y-3">
                <li className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                  <span className="font-medium block">Last Line of Defence</span>
                  <p className="text-sm mt-1">PPE should be used alongside, not instead of, other safety measures in the hierarchy of control. Always prioritise elimination, substitution, and engineering controls.</p>
                </li>
                <li className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                  <span className="font-medium block">Voltage Limits</span>
                  <p className="text-sm mt-1">Each item of PPE has specific voltage limitations that must not be exceeded. Exceeding these limits can result in catastrophic failure of the protection and serious injury.</p>
                </li>
                <li className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                  <span className="font-medium block">Environmental Factors</span>
                  <p className="text-sm mt-1">Moisture, contaminants, temperature extremes, and UV exposure can significantly degrade PPE performance. Storage conditions must protect PPE from these factors.</p>
                </li>
              </ul>
              
              <div className="p-4 bg-elec-dark/50 border border-elec-yellow/20 rounded-lg mt-4">
                <p className="font-medium text-elec-yellow mb-2">Safety First Reminder:</p>
                <p className="text-sm">Live working should always be avoided where possible. PPE does not eliminate risk entirely and should never be used as justification for working live when isolation is a viable alternative. Only appropriate training and risk assessment can determine when PPE use is suitable.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* PPE Selection Guidance */}
      <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
          <ShieldAlert className="h-5 w-5 mr-2" />
          PPE Selection Process
        </h3>
        
        <div className="space-y-4">
          <p>Selecting appropriate PPE requires a systematic approach based on the tasks and risks involved:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Risk Assessment</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Identify hazards</span>
                  <p className="text-sm mt-1">Electrical, mechanical, environmental</p>
                </li>
                <li>
                  <span className="font-medium">Assess voltage levels</span>
                  <p className="text-sm mt-1">Low voltage vs high voltage requirements</p>
                </li>
                <li>
                  <span className="font-medium">Consider worst-case scenarios</span>
                  <p className="text-sm mt-1">Arc flash potential, fault currents</p>
                </li>
                <li>
                  <span className="font-medium">Document findings</span>
                  <p className="text-sm mt-1">Keep records for reference and compliance</p>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">User Considerations</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Proper fit</span>
                  <p className="text-sm mt-1">Individual sizing is essential for effective protection</p>
                </li>
                <li>
                  <span className="font-medium">Compatibility</span>
                  <p className="text-sm mt-1">Ensure all PPE items work together without compromising protection</p>
                </li>
                <li>
                  <span className="font-medium">User training</span>
                  <p className="text-sm mt-1">Workers must understand proper use and limitations</p>
                </li>
                <li>
                  <span className="font-medium">Comfort and usability</span>
                  <p className="text-sm mt-1">PPE that's uncomfortable is less likely to be worn correctly</p>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Standards Compliance</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Look for CE marking</span>
                  <p className="text-sm mt-1">Indicates compliance with European standards</p>
                </li>
                <li>
                  <span className="font-medium">UKCA mark</span>
                  <p className="text-sm mt-1">Required for products sold in Great Britain</p>
                </li>
                <li>
                  <span className="font-medium">Check specific BS/EN standards</span>
                  <p className="text-sm mt-1">Each PPE type has relevant standards</p>
                </li>
                <li>
                  <span className="font-medium">Category verification</span>
                  <p className="text-sm mt-1">Category III PPE requires additional certification</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
            <p className="font-medium mb-1 text-elec-yellow">Employer Responsibilities:</p>
            <p>Under the Personal Protective Equipment at Work Regulations, employers must ensure that PPE is properly assessed before use, appropriate for the risk and the user, maintained and stored properly, provided with instructions on safe use, and used correctly by employees. PPE must be provided free of charge where it is needed for work activities.</p>
          </div>
        </div>
      </div>
      
      {/* Completion Button */}
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

// Reusable component for PPE cards
const PPECard = ({ title, children }) => (
  <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300">
    <h5 className="font-medium text-elec-yellow text-base mb-2 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
      {title}
    </h5>
    <ul className="space-y-1.5 pl-4">
      {React.Children.map(children, (child, index) => (
        <div className="flex items-start gap-2 group">
          <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60 mt-2 shrink-0"></div>
          {child}
        </div>
      ))}
    </ul>
  </div>
);

export default Subsection6_2;
