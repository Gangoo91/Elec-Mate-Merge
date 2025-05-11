
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, Leaf, Recycle, Lightbulb, AlertTriangle } from "lucide-react";
import CourseContentSection from "../CourseContentSection";

const Subsection2_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-2xl font-bold text-elec-yellow mb-6">Environmental Considerations in Electrical Work</h1>
        
        <p className="mb-4">
          Environmental considerations are increasingly important in the electrical industry. As electrical professionals, 
          we have a responsibility to minimize the environmental impact of our work through sustainable practices, 
          proper waste management, and energy-efficient installations.
        </p>
        
        <h2 className="text-xl font-semibold text-elec-yellow mt-8 mb-4">Waste Management in Electrical Work</h2>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4 mb-6">
          <div className="flex items-start gap-3">
            <Trash2 className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Electrical Waste Classification</h3>
              <p className="text-sm">
                Electrical waste (e-waste) is classified under the Waste Electrical and Electronic Equipment (WEEE) 
                Regulations. As an electrical professional, you must ensure proper disposal through appropriate channels:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
                <li>
                  <span className="font-medium">Hazardous waste</span>: Items containing mercury, lead, cadmium, 
                  or other harmful substances must be handled according to hazardous waste regulations.
                </li>
                <li>
                  <span className="font-medium">Recyclable components</span>: Copper wiring, aluminum, and certain 
                  plastic components can be separated and recycled.
                </li>
                <li>
                  <span className="font-medium">WEEE compliance</span>: All electrical contractors must comply with 
                  WEEE regulations for disposal of electrical equipment.
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-elec-yellow mt-8 mb-4">Energy Efficiency and Carbon Reduction</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Energy-Efficient Installations</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>LED lighting systems reduce energy consumption by up to 80% compared to traditional lighting</li>
                  <li>Smart control systems can optimize energy use through automation</li>
                  <li>Proper cable sizing reduces energy losses through resistance</li>
                  <li>Energy-efficient motors and variable speed drives reduce consumption</li>
                  <li>Power factor correction improves electrical efficiency</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4">
            <div className="flex items-start gap-3">
              <Leaf className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Renewable Energy Integration</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Solar PV system installation requires specialized electrical knowledge</li>
                  <li>Battery storage systems extend renewable energy usage</li>
                  <li>EV charging point installations support green transportation</li>
                  <li>Heat pump systems can reduce carbon footprint of heating</li>
                  <li>Microgeneration connections to grid must follow specific regulations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-elec-yellow mt-8 mb-4">Sustainable Materials and Practices</h2>
        
        <p className="mb-4">
          Choosing sustainable materials and implementing environmentally conscious practices can significantly 
          reduce the ecological footprint of electrical installations:
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4 mb-6">
          <div className="flex items-start gap-3">
            <Recycle className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Sustainable Material Selection</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-medium">Low-impact cables</span>: LSZH (Low Smoke Zero Halogen) cables produce fewer toxic emissions during fires.
                </p>
                <p>
                  <span className="font-medium">PVC alternatives</span>: PE (polyethylene) and TPE (thermoplastic elastomer) offer greener alternatives to PVC.
                </p>
                <p>
                  <span className="font-medium">Recycled metals</span>: Using components with recycled copper and aluminum reduces mining impact.
                </p>
                <p>
                  <span className="font-medium">Sustainable packaging</span>: Select products with minimal or recyclable packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-elec-yellow mt-8 mb-4">Environmental Regulations and Compliance</h2>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div className="space-y-3 text-sm">
              <p>
                Electrical professionals must comply with several environmental regulations:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">RoHS (Restriction of Hazardous Substances)</span>: Limits use of specific hazardous materials in electrical and electronic products.
                </li>
                <li>
                  <span className="font-medium">WEEE Regulations</span>: Governs disposal and recycling of electrical and electronic equipment.
                </li>
                <li>
                  <span className="font-medium">F-Gas Regulations</span>: Controls use of fluorinated greenhouse gases in certain electrical equipment.
                </li>
                <li>
                  <span className="font-medium">Energy-related Products (ErP) Directive</span>: Sets eco-design requirements for energy-using products.
                </li>
                <li>
                  <span className="font-medium">Building Regulations Part L</span>: Specifies conservation of fuel and power requirements.
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-elec-yellow mt-8 mb-4">Environmental Best Practices for Electrical Contractors</h2>
        
        <div className="space-y-4 mb-6">
          <CourseContentSection
            title="Site Waste Management Plans"
            description="Develop and implement site waste management plans (SWMPs) for all electrical installation projects, ensuring proper segregation, disposal, and recycling of materials."
            icon="hardhat"
          />
          
          <CourseContentSection
            title="Material Efficiency"
            description="Accurately calculate material requirements to minimize wastage. Order appropriate quantities and reuse materials where possible and safe to do so."
            icon="list"
          />
          
          <CourseContentSection
            title="Energy Assessment"
            description="Conduct energy assessments for clients to identify potential energy savings through more efficient electrical installations or retrofits."
            icon="bulb"
          />
          
          <CourseContentSection
            title="Sustainable Transport"
            description="Plan service routes efficiently to reduce fuel consumption and emissions. Consider transitioning to electric or hybrid vehicles for company transport."
            icon="tools"
          />
          
          <CourseContentSection
            title="Digital Documentation"
            description="Reduce paper waste by implementing digital systems for quotes, invoices, certificates, and other documentation."
            icon="section"
          />
        </div>
        
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-md p-4 mb-6">
          <h3 className="font-semibold text-elec-yellow mb-2 text-center">Key Environmental Impact Areas in Electrical Work</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-elec-yellow/20">
                <th className="py-2 px-3 text-left">Impact Area</th>
                <th className="py-2 px-3 text-left">Mitigation Strategies</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-elec-yellow/20">
                <td className="py-2 px-3 font-medium">Energy Consumption</td>
                <td className="py-2 px-3">Energy-efficient designs, smart controls, LED lighting</td>
              </tr>
              <tr className="border-b border-elec-yellow/20">
                <td className="py-2 px-3 font-medium">Material Waste</td>
                <td className="py-2 px-3">Accurate ordering, material reuse, proper recycling</td>
              </tr>
              <tr className="border-b border-elec-yellow/20">
                <td className="py-2 px-3 font-medium">Hazardous Substances</td>
                <td className="py-2 px-3">Proper disposal, RoHS compliance, alternative materials</td>
              </tr>
              <tr className="border-b border-elec-yellow/20">
                <td className="py-2 px-3 font-medium">Transport Emissions</td>
                <td className="py-2 px-3">Route optimization, electric vehicles, reduced site visits</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Resource Depletion</td>
                <td className="py-2 px-3">Renewable energy integration, recycled materials</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mark as Complete button */}
      <div className="mt-8 pt-6 border-t border-elec-yellow/20">
        <div className="flex justify-end">
          {isCompleted ? (
            <Button
              disabled
              className="bg-green-600/20 border-green-500/50 text-green-400 flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
            </Button>
          ) : (
            <Button 
              onClick={markAsComplete}
              className="bg-elec-yellow/10 border border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
            >
              Mark as Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subsection2_3;
