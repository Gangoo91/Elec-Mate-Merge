
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Shield, AlertTriangle, Flame } from "lucide-react";
import CourseContentSection from "@/components/apprentice/CourseContentSection";

const Subsection2_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <CourseContentSection 
        title="Accident and Emergency Procedures"
        description="Understanding the correct procedures to follow in the event of an accident or emergency is essential for electrical workers. Proper preparation and response can be the difference between a minor incident and a serious injury."
        icon="shield-alert"
      />

      {/* Emergency Response Framework */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-elec-yellow">Emergency Response Framework</h2>
        <p className="text-muted-foreground mb-4">
          An effective emergency response system follows these key principles:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-elec-gray/30 p-4 rounded-lg border border-elec-yellow/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow" />
              <h3 className="font-medium">Preparation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Training, drills, clear procedures, and properly maintained emergency equipment that is regularly checked and accessible.
            </p>
          </div>
          
          <div className="bg-elec-gray/30 p-4 rounded-lg border border-elec-yellow/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <h3 className="font-medium">Response</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Rapid assessment, clear communication, following established protocols and delegating responsibilities appropriately.
            </p>
          </div>
          
          <div className="bg-elec-gray/30 p-4 rounded-lg border border-elec-yellow/10">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              <h3 className="font-medium">Recovery</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Thorough documentation, proper reporting, investigation to prevent recurrence and support for affected workers.
            </p>
          </div>
        </div>
      </div>

      {/* Electric Shock Response */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-yellow-600/20 p-2 rounded-full">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
          </div>
          <h2 className="text-xl font-semibold text-elec-yellow">Electric Shock Response Protocol</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Electric shock injuries require immediate and careful response. Following the proper sequence of actions can save lives and prevent secondary injuries.
          </p>
          
          <ol className="space-y-4 mt-4">
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">1. Ensure your own safety first</h3>
              <p className="text-sm text-muted-foreground">
                Never touch a casualty while they are still in contact with an electrical source. Ensure the area is safe before approaching.
              </p>
            </li>
            
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">2. Disconnect the power</h3>
              <p className="text-sm text-muted-foreground">
                Switch off the power at the mains or isolator if possible. If not accessible, use a non-conductive material (wooden broom handle, rubber mat) to separate the casualty from the source.
              </p>
            </li>
            
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">3. Call emergency services (999/112)</h3>
              <p className="text-sm text-muted-foreground">
                Clearly state that there has been an electrical accident. Provide accurate location details and the condition of the casualty.
              </p>
            </li>
            
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">4. Check ABCs and provide first aid</h3>
              <p className="text-sm text-muted-foreground">
                Once safe to do so, check Airway, Breathing, and Circulation. Begin CPR if necessary and continue until help arrives.
              </p>
              <ul className="list-disc pl-5 mt-2 text-xs text-muted-foreground">
                <li>Look for entry and exit wounds from electrical current</li>
                <li>Treat burns by covering with clean, non-adherent material</li>
                <li>Monitor for signs of shock (pale skin, rapid breathing, confusion)</li>
              </ul>
            </li>
            
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">5. Document the incident</h3>
              <p className="text-sm text-muted-foreground">
                Record all details about what happened, the response taken, and any observed injuries. This information is vital for medical treatment and incident investigation.
              </p>
            </li>
          </ol>
          
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-400 mb-1">Important Warning</h4>
                <p className="text-sm text-muted-foreground">
                  All electric shock victims require medical evaluation, even if they appear unharmed. Electrical injuries can cause internal damage that may not be immediately apparent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
          
      {/* Fire Procedures */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-yellow-600/20 p-2 rounded-full">
            <Flame className="h-6 w-6 text-elec-yellow" />
          </div>
          <h2 className="text-xl font-semibold text-elec-yellow">Fire Procedures for Electrical Incidents</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Electrical fires require specific response procedures due to their unique hazards. Understanding the correct actions to take can prevent fire spread and additional risks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-lg font-medium mb-3 text-elec-yellow/80">Immediate Response</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span className="text-sm text-muted-foreground">Raise the alarm immediately by activating the nearest fire alarm point</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span className="text-sm text-muted-foreground">Call the fire service (999/112)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span className="text-sm text-muted-foreground">If safe, isolate power to affected equipment or area using emergency stop buttons or main switches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <span className="text-sm text-muted-foreground">Use appropriate fire extinguishers (CO₂ or dry powder) for electrical fires—NEVER use water</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                  <span className="text-sm text-muted-foreground">Evacuate the building using designated escape routes</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 text-elec-yellow/80">Fire Extinguisher Selection</h3>
              <div className="space-y-3">
                <div className="bg-elec-gray/30 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">CO₂ Extinguishers</h4>
                  <p className="text-xs text-muted-foreground">
                    Identified by black labels. Safe for electrical fires as they don't conduct electricity. Displaces oxygen to extinguish flames without leaving residue.
                  </p>
                </div>
                
                <div className="bg-elec-gray/30 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Dry Powder Extinguishers</h4>
                  <p className="text-xs text-muted-foreground">
                    Identified by blue labels. Safe for electrical fires but leaves residue that can damage equipment. Use when CO₂ is not available.
                  </p>
                </div>
                
                <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg">
                  <h4 className="font-medium text-red-400 mb-1">NEVER USE:</h4>
                  <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Water extinguishers (red labels)</li>
                    <li>Foam extinguishers (cream labels)</li>
                    <li>Water mist extinguishers without specific electrical approval</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-gray/30 p-4 rounded-lg mt-4">
            <h3 className="font-medium mb-2">After Evacuation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Proceed to the designated assembly point</li>
              <li>• Report to the fire warden or person in charge</li>
              <li>• Account for all personnel</li>
              <li>• Do not re-enter the building until authorized by the fire service</li>
              <li>• Provide information about the fire location and type to emergency services</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* First Aid Requirements */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-elec-yellow">First Aid Requirements for Electrical Workplaces</h2>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            The Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate first-aid equipment, facilities, and trained personnel. For electrical work environments, specific considerations apply.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow/80">Required First Aid Equipment</h3>
              
              <div className="bg-elec-gray/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Basic First Aid Kit (BS 8599-1 compliant)</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Burn dressings and gel</li>
                  <li>• Sterile eye wash</li>
                  <li>• Various bandages and dressings</li>
                  <li>• Resuscitation face shield</li>
                  <li>• Scissors and tweezers</li>
                  <li>• Disposable gloves</li>
                  <li>• First aid guidance leaflet</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Additional Electrical-Specific Items</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Insulating rescue hook</li>
                  <li>• Specialized burn treatment kit</li>
                  <li>• AED (Automated External Defibrillator)</li>
                  <li>• Emergency contact information</li>
                  <li>• Incident reporting forms</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow/80">First Aid Personnel Requirements</h3>
              
              <div className="bg-elec-gray/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Minimum Requirements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• At least one appointed first aider for low-risk workplaces with fewer than 50 workers</li>
                  <li>• At least one first-aid trained person for every 50 employees in higher-risk environments</li>
                  <li>• All electrical workers should have basic emergency first aid training</li>
                  <li>• At least one person trained specifically in electrical injury response</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Documentation Requirements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• First aid risk assessment</li>
                  <li>• Record of first aid provision</li>
                  <li>• First aid treatment record book</li>
                  <li>• Accident book (compliant with Data Protection Act)</li>
                  <li>• RIDDOR reporting procedures</li>
                  <li>• Regular inspection records of first aid supplies</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow mt-4">
            <h3 className="font-medium mb-2">Emergency Action Plan Requirements</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Every workplace should have a documented emergency action plan that includes:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li>• Emergency contact numbers</li>
              <li>• Evacuation procedures</li>
              <li>• Assembly points</li>
              <li>• First aid equipment locations</li>
              <li>• Names of appointed first aiders</li>
              <li>• Roles and responsibilities</li>
              <li>• Reporting procedures</li>
              <li>• Emergency services liaison procedures</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Completion button */}
      <div className="pt-6 border-t border-elec-yellow/20 flex justify-end">
        {!isCompleted ? (
          <Button 
            onClick={markAsComplete}
            className="hover:bg-elec-yellow hover:text-elec-dark"
          >
            Mark as Complete
          </Button>
        ) : (
          <div className="flex items-center text-green-500 gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subsection2_1;
