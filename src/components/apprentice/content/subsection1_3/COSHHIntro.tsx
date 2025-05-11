
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const COSHHIntro = () => {
  return (
    <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
        <AlertTriangle className="mr-3 h-6 w-6 text-elec-yellow" />
        Introduction to COSHH Regulations
      </h2>
      <p className="mb-4">
        The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers to control 
        substances that are hazardous to health. These regulations are particularly relevant to electrical work, 
        where electricians may encounter various chemicals, fumes, dusts, and other hazardous substances.
      </p>
      <p>
        Understanding and complying with COSHH regulations is essential for preventing work-related 
        ill health, which affects thousands of workers each year. The regulations provide a framework 
        for protecting both workers and others who may be exposed to hazardous substances.
      </p>
    </div>
  );
};

export default COSHHIntro;
