import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TaxLegalConsiderations from '@/components/upskilling/renewable-energy/TaxLegalConsiderations';

const RenewableEnergyModule9Section6 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-9">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 9
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Section 6: Tax Implications and Legal Considerations
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding VAT treatment, tax allowances, planning requirements, and consumer protection
            </p>
          </div>

          <TaxLegalConsiderations />
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule9Section6;