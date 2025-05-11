
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, Leaf, Recycle, Lightbulb, AlertTriangle, BarChart4, ClipboardCheck, Globe, Hammer } from "lucide-react";
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
              
              <div className="mt-4 border-t border-elec-yellow/10 pt-3">
                <h4 className="font-medium text-elec-yellow mb-2">WEEE Collection Requirements</h4>
                <p className="text-sm mb-2">
                  Under WEEE regulations, electricians must:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Ensure waste is collected by a licensed waste carrier</li>
                  <li>Maintain waste transfer notes for at least two years</li>
                  <li>Segregate hazardous and non-hazardous electrical waste</li>
                  <li>Provide documentation of proper disposal to clients when requested</li>
                </ul>
              </div>
              
              <div className="mt-4 bg-elec-yellow/5 p-3 rounded-md border border-elec-yellow/20">
                <p className="text-sm font-medium text-elec-yellow">Did you know?</p>
                <p className="text-sm mt-1">
                  A single fluorescent tube can contaminate 30,000 liters of water with mercury if disposed of incorrectly. 
                  Proper disposal through registered waste handlers ensures harmful substances are contained.
                </p>
              </div>
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
                
                <div className="mt-3 border-t border-elec-yellow/10 pt-3">
                  <h4 className="font-medium text-elec-yellow mb-2">Energy Efficiency Metrics</h4>
                  <p className="text-sm mb-2">
                    When discussing energy efficiency with clients, focus on these key metrics:
                  </p>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-elec-yellow/20">
                        <th className="text-left py-1">Metric</th>
                        <th className="text-left py-1">Relevance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-elec-yellow/10">
                        <td className="py-1 font-medium">kWh savings</td>
                        <td className="py-1">Direct energy reduction</td>
                      </tr>
                      <tr className="border-b border-elec-yellow/10">
                        <td className="py-1 font-medium">CO₂ equivalent</td>
                        <td className="py-1">Environmental impact</td>
                      </tr>
                      <tr className="border-b border-elec-yellow/10">
                        <td className="py-1 font-medium">Payback period</td>
                        <td className="py-1">Financial return timeline</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Lumens per watt</td>
                        <td className="py-1">Lighting efficiency</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                
                <div className="mt-3 bg-elec-yellow/5 p-3 rounded-md border border-elec-yellow/20">
                  <h4 className="font-medium text-elec-yellow mb-1">Renewable Energy Standards</h4>
                  <p className="text-xs">
                    Key standards for electrical installers working with renewable systems:
                  </p>
                  <ul className="list-disc pl-5 text-xs space-y-1 mt-1">
                    <li><span className="font-medium">MCS Certification</span> - Required for most installations</li>
                    <li><span className="font-medium">G99/G98</span> - Grid connection requirements</li>
                    <li><span className="font-medium">IET Code of Practice</span> - For solar PV installations</li>
                    <li><span className="font-medium">BS 7671</span> - Requirements for electrical installations</li>
                    <li><span className="font-medium">IEC 62446</span> - System documentation requirements</li>
                  </ul>
                </div>
                
                <div className="mt-3 border-t border-elec-yellow/10 pt-3">
                  <p className="text-sm">
                    As an electrician, obtaining specialized training and certifications in renewable 
                    technologies can significantly expand your career opportunities while contributing 
                    to environmental sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4 mb-6">
          <div className="flex items-start gap-3">
            <BarChart4 className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Carbon Footprint of Electrical Installations</h3>
              <p className="text-sm mb-3">
                The carbon footprint of electrical work extends beyond energy consumption to include:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-elec-dark/70 p-3 rounded-md">
                  <h4 className="font-medium text-elec-yellow mb-1">Embodied Carbon</h4>
                  <p className="text-sm">
                    The CO₂ emitted during manufacturing, transport, and installation of electrical components.
                    Consider lower-impact alternatives when specifying products.
                  </p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-md">
                  <h4 className="font-medium text-elec-yellow mb-1">Operational Carbon</h4>
                  <p className="text-sm">
                    The CO₂ emitted during the operational life of electrical systems.
                    Focus on energy efficiency and smart controls to minimize this impact.
                  </p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-md">
                  <h4 className="font-medium text-elec-yellow mb-1">End-of-Life Carbon</h4>
                  <p className="text-sm">
                    The CO₂ impact of disposal or recycling of electrical components.
                    Proper recycling can significantly reduce this impact.
                  </p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-md">
                  <h4 className="font-medium text-elec-yellow mb-1">Transport Carbon</h4>
                  <p className="text-sm">
                    The CO₂ from transporting materials and personnel.
                    Efficient route planning and low-emission vehicles can help reduce this.
                  </p>
                </div>
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
              
              <div className="mt-4 border-t border-elec-yellow/10 pt-3">
                <h4 className="font-medium text-elec-yellow mb-2">Material Environmental Certifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-elec-dark/70 p-2 rounded-md">
                    <p className="font-medium">BREEAM Compliance</p>
                    <p className="text-xs mt-1">
                      Materials that meet Building Research Establishment Environmental Assessment Method standards.
                    </p>
                  </div>
                  <div className="bg-elec-dark/70 p-2 rounded-md">
                    <p className="font-medium">Environmental Product Declarations (EPD)</p>
                    <p className="text-xs mt-1">
                      Documents that provide verified environmental data for product lifecycles.
                    </p>
                  </div>
                  <div className="bg-elec-dark/70 p-2 rounded-md">
                    <p className="font-medium">Cradle to Cradle Certified</p>
                    <p className="text-xs mt-1">
                      Products designed for circular economy with sustainable material flows.
                    </p>
                  </div>
                  <div className="bg-elec-dark/70 p-2 rounded-md">
                    <p className="font-medium">RoHS Compliance</p>
                    <p className="text-xs mt-1">
                      Restriction of Hazardous Substances, limiting harmful materials in electrical products.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 border-t border-elec-yellow/10 pt-3">
                <h4 className="font-medium text-elec-yellow mb-1">Circular Economy in Electrical Work</h4>
                <p className="text-sm mb-2">
                  The circular economy approach focuses on:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Designing out waste and pollution</li>
                  <li>Keeping products and materials in use</li>
                  <li>Regenerating natural systems</li>
                </ul>
                <p className="text-sm mt-2">
                  As an electrician, you can contribute by recovering materials for reuse, 
                  choosing products with longer lifespans, and selecting suppliers with 
                  take-back schemes for end-of-life products.
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
              
              <div className="mt-2 bg-elec-yellow/5 p-3 rounded-md border border-elec-yellow/20">
                <h4 className="font-medium text-elec-yellow mb-1">Environmental Legislation Updates</h4>
                <p className="text-xs mb-2">
                  Environmental regulations are regularly updated. Key recent changes include:
                </p>
                <ul className="list-disc pl-4 text-xs space-y-1">
                  <li>
                    <span className="font-medium">Net Zero Carbon Buildings Standard</span> - Framework for verifying net zero carbon buildings
                  </li>
                  <li>
                    <span className="font-medium">Updated Building Regulations</span> - More stringent requirements for energy efficiency in buildings
                  </li>
                  <li>
                    <span className="font-medium">Future Homes Standard</span> - Increasing requirements for low-carbon heating and high energy efficiency
                  </li>
                </ul>
              </div>
              
              <div className="mt-3">
                <h4 className="font-medium text-elec-yellow mb-1">Non-Compliance Consequences</h4>
                <p className="text-sm mb-2">
                  Failure to comply with environmental regulations can result in:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Substantial financial penalties</li>
                  <li>Legal prosecution</li>
                  <li>Damage to professional reputation</li>
                  <li>Loss of certifications and licenses</li>
                  <li>Environmental remediation costs</li>
                </ul>
              </div>
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
          
          <CourseContentSection
            title="Continuous Education"
            description="Stay updated on the latest environmental regulations, sustainable technologies, and eco-friendly installation methods through regular training."
            icon="info"
          />
          
          <CourseContentSection
            title="Client Education"
            description="Educate clients on the environmental benefits and long-term cost savings of energy-efficient installations and renewable energy systems."
            icon="info"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Environmental Certification Systems</h3>
                <p className="text-sm mb-3">
                  Electrical contractors can demonstrate environmental commitment through:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>
                    <span className="font-medium">ISO 14001</span>: International standard for environmental management systems
                  </li>
                  <li>
                    <span className="font-medium">PAS 2060</span>: Specification for carbon neutrality
                  </li>
                  <li>
                    <span className="font-medium">Green Business Certification</span>: Industry-specific environmental certifications
                  </li>
                </ul>
                <p className="text-sm mt-3">
                  These certifications can provide a competitive advantage and demonstrate a commitment 
                  to environmental responsibility to clients and stakeholders.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4">
            <div className="flex items-start gap-3">
              <Globe className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Case Study: Environmental Impact Reduction</h3>
                <p className="text-sm italic mb-2">
                  "A medium-sized electrical contractor implemented comprehensive environmental practices throughout their operations:"
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Achieved 94% recycling rate for electrical waste</li>
                  <li>Reduced van fuel consumption by 30% through route optimization</li>
                  <li>Transitioned to digital documentation, saving 10,000 sheets of paper annually</li>
                  <li>Specialized in energy-efficient lighting retrofits, saving clients 450,000 kWh collectively</li>
                </ul>
                <p className="text-sm mt-3">
                  These measures not only reduced environmental impact but also decreased operational costs 
                  by approximately 15% and attracted environmentally conscious clients.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-elec-yellow mt-8 mb-3">Practical Implementation Tools</h3>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4 mb-6">
          <div className="flex items-start gap-3">
            <Hammer className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Environmental Toolkit for Electricians</h3>
              <p className="text-sm mb-3">
                Practical tools and resources to implement environmental best practices:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-elec-dark/70 p-3 rounded-md">
                  <h4 className="font-medium text-elec-yellow mb-1">Assessment Tools</h4>
                  <ul className="list-disc pl-4 text-xs space-y-1">
                    <li>Carbon calculators</li>
                    <li>Energy audit templates</li>
                    <li>Material efficiency worksheets</li>
                    <li>Environmental impact assessments</li>
                  </ul>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-md">
                  <h4 className="font-medium text-elec-yellow mb-1">Reference Materials</h4>
                  <ul className="list-disc pl-4 text-xs space-y-1">
                    <li>Sustainable materials guides</li>
                    <li>Waste disposal regulations</li>
                    <li>Energy efficiency standards</li>
                    <li>Best practice case studies</li>
                  </ul>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-md">
                  <h4 className="font-medium text-elec-yellow mb-1">Implementation Resources</h4>
                  <ul className="list-disc pl-4 text-xs space-y-1">
                    <li>Site waste management templates</li>
                    <li>Environmental policy templates</li>
                    <li>Supplier assessment checklists</li>
                    <li>Client education materials</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 bg-elec-yellow/5 p-3 rounded-md border border-elec-yellow/20">
                <p className="text-sm">
                  <span className="font-medium text-elec-yellow">Professional Tip:</span> Many 
                  industry associations provide freely accessible environmental toolkits specifically 
                  designed for electrical contractors. These resources can significantly simplify 
                  environmental compliance and best practice implementation.
                </p>
              </div>
            </div>
          </div>
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
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4 mb-6">
          <h3 className="font-semibold text-elec-yellow mb-3 text-center">Environmental Considerations Checklist for Electrical Projects</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Conduct pre-project environmental assessment</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Verify compliance with current environmental regulations</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Create waste management plan including recycling provisions</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Calculate materials efficiently to minimize waste</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Select energy-efficient components and systems</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Implement smart controls to optimize energy usage</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Use environmentally-preferred cables and materials</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Arrange for proper disposal of hazardous waste</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Document all waste transfers and environmental measures</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-elec-yellow/50 flex-shrink-0"></div>
              <p className="text-sm">Provide client with energy efficiency recommendations</p>
            </div>
          </div>
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

