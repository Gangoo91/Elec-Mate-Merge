
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { installationMethodsContent } from "@/data/installationMethods/index";
import type { Subsection } from "@/data/healthAndSafety/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SubsectionContent = () => {
  const { sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const [subsectionData, setSubsectionData] = useState<Subsection | null>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    if (sectionId && subsectionId) {
      // Find the section
      const section = installationMethodsContent.find(
        section => section.sectionNumber === sectionId
      );
      
      if (section) {
        setSectionTitle(section.title);
        // Find the subsection
        const subsection = section.content.subsections.find(
          sub => sub.id === subsectionId
        );
        
        if (subsection) {
          setSubsectionData(subsection);
          
          // Check local storage for completion status
          const storageKey = `completion_${sectionId}_${subsectionId}`;
          const storedCompletion = localStorage.getItem(storageKey);
          setIsCompleted(storedCompletion === 'true');
        }
      }
    }
  }, [sectionId, subsectionId]);

  const handleBackClick = () => {
    navigate(-1);
  };
  
  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
    }
  };

  if (!subsectionData) {
    return (
      <div className="text-center py-8">
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="outline" 
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-elec-yellow text-xl font-bold">{subsectionData.id}</span>
            <h1 className="text-2xl font-bold">{subsectionData.title}</h1>
            {isCompleted && <CheckCircle className="h-5 w-5 text-green-500 ml-2" />}
          </div>
          <div className="text-sm text-elec-yellow/80">
            {sectionTitle}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-elec-light/90 leading-relaxed prose prose-invert max-w-none">
            <p className="mb-4">{subsectionData.content}</p>
            
            {/* Learning content - structured in sections for better learning */}
            <div className="mt-8 space-y-8">
              {subsectionData.id === "1.1" && (
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
                  </section>
                </>
              )}
              
              {subsectionData.id === "1.2" && (
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
              )}
              
              {subsectionData.id === "1.3" && (
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
              )}
              
              {/* Add content for other subsections as needed */}
              {/* Section 2 subsections */}
              {subsectionData.id === "2.1" && (
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
              )}
              
              {/* Continue with other subsections */}
            </div>
          </div>
          
          {subsectionData.keyPoints && subsectionData.keyPoints.length > 0 && (
            <Accordion type="single" collapsible className="border-t border-elec-yellow/20 pt-4">
              <AccordionItem value="key-points" className="border-b-0">
                <AccordionTrigger className="py-3 text-elec-yellow hover:no-underline">
                  Key Learning Points
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc pl-5 text-elec-light/80">
                    {subsectionData.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          
          {/* Mark as Complete button */}
          <div className="flex justify-end pt-4 border-t border-elec-yellow/20">
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
      </div>
    </div>
  );
};

export default SubsectionContent;
