import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GreenFinanceOptions from '@/components/upskilling/renewable-energy/GreenFinanceOptions';

const RenewableEnergyModule9Section5 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-9">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 9
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Section 5: Green Finance and Funding Options
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Exploring government schemes, commercial finance structures, and green loan products
            </p>
          </div>

          <GreenFinanceOptions />
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule9Section5;