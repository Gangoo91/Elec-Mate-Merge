
import React from "react";
import { AlertTriangle } from "lucide-react";

const CaseStudies = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
        <AlertTriangle className="h-6 w-6 mr-2" />
        UK Case Studies: Learning from Incidents
      </h3>
      
      <p className="mb-4 text-elec-light/90">
        Examining real incidents provides valuable learning opportunities for preventing 
        similar accidents. The HSE regularly publishes case studies of electrical incidents 
        and prosecutions.
      </p>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-white mb-2">Case 1: Fatal Shock During Maintenance</h4>
          <p className="text-elec-light/80">
            In 2019, an electrician in Manchester received a fatal electric shock while 
            working on a distribution board that had not been properly isolated. 
            Investigation revealed that the isolation procedure had not been followed, 
            and testing was not performed to verify the dead state of the equipment. 
            The company was fined £300,000 for breaching the Electricity at Work Regulations.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-2">Case 2: Arc Flash Injury</h4>
          <p className="text-elec-light/80">
            A maintenance technician in Birmingham suffered severe burns when an arc flash 
            occurred during panel work. The technician was wearing inappropriate PPE and 
            using non-insulated tools. The investigation found inadequate risk assessment 
            and training. The employer was fined £150,000 and ordered to pay costs of £25,000.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
