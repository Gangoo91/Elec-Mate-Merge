
import React from "react";
import { Heart, Zap, AlertCircle } from "lucide-react";

const FirstAidResponse = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">First Aid for Electrical Injuries</h3>
      
      <p className="text-sm md:text-base mb-4">
        Electrical injuries require specific first aid procedures. Understanding these procedures can help save lives
        and minimise long-term damage while waiting for emergency services.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* First Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Electric Shock Response</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-2">Initial Action</h5>
              <ol className="list-decimal list-inside text-sm space-y-2">
                <li className="text-red-400 font-medium">Do NOT touch the casualty if they are still in contact with the electrical source</li>
                <li>Turn off the power source if possible and safe to do so</li>
                <li>If power cannot be turned off, use a non-conductive object (dry wood, plastic) to separate casualty from source</li>
                <li>Call for emergency assistance (999) immediately</li>
              </ol>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-2">Primary Assessment</h5>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Check responsiveness by shouting and gently shaking</li>
                <li>Check breathing - look, listen and feel</li>
                <li>If not breathing, begin CPR (if trained)</li>
                <li>Place in recovery position if unconscious but breathing</li>
              </ul>
            </div>
          </div>
          
          {/* Second Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <Heart className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Treating Electrical Burns</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-2">Electrical Burn Care</h5>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Remove jewellery and constricting items from affected area</li>
                <li>Cover burns with a clean, dry non-adhesive dressing</li>
                <li>Do NOT apply creams, ointments or butter to burns</li>
                <li>Do NOT burst any blisters that form</li>
                <li>Monitor for signs of shock</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-2">Types of Electrical Burns</h5>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li><span className="text-elec-yellow">Entry/Exit burns:</span> Where current enters/exits body</li>
                <li><span className="text-elec-yellow">Flash burns:</span> From electric arcs</li>
                <li><span className="text-elec-yellow">Flame burns:</span> From ignited clothing</li>
                <li><span className="text-elec-yellow">Contact burns:</span> From touching hot surfaces</li>
                <li>Remember: internal damage may be more severe than visible burns</li>
              </ul>
            </div>
          </div>
          
          {/* Third Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <AlertCircle className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Monitoring & Complications</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-2">Signs of Complications</h5>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Irregular heartbeat or cardiac arrest</li>
                <li>Breathing difficulties</li>
                <li>Loss of consciousness</li>
                <li>Muscle pain and contractions</li>
                <li>Seizures</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-2">Important Notes</h5>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>All electric shock victims should receive medical assessment</li>
                <li>Cardiac problems can develop hours after the shock</li>
                <li>Document incident details for medical personnel</li>
                <li>Follow up with detailed incident report</li>
                <li>Consider debriefing and mental health support</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
          <p className="font-medium mb-1 text-elec-yellow">Important:</p>
          <p>The Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate first-aid equipment, 
          facilities and trained personnel. In electrical work environments, specific first-aid provisions for electrical injuries 
          should be available. Always ensure first aid kits are accessible and that workers know the location of first aid stations 
          and how to contact first aiders.</p>
        </div>
      </div>
    </div>
  );
};

export default FirstAidResponse;
