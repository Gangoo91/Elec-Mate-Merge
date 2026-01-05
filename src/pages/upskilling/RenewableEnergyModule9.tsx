import { ArrowLeft, PoundSterling, TrendingUp, Calculator, Wrench, CreditCard, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const RenewableEnergyModule9 = () => {
  const sections = [
    {
      id: 1,
      title: "Feed-in Tariff (Legacy), SEG, and Net Metering",
      icon: PoundSterling,
      description: "Understanding payment schemes and energy export mechanisms"
    },
    {
      id: 2,
      title: "Understanding ROI, Payback Periods, and System Lifespan", 
      icon: TrendingUp,
      description: "Financial metrics and return on investment calculations"
    },
    {
      id: 3,
      title: "Cost-Benefit Analysis (Domestic vs Commercial Systems)",
      icon: Calculator,
      description: "Comparing financial benefits across different system types"
    },
    {
      id: 4,
      title: "Tools for Estimating Yield and Return (PV*Sol, SAP, etc.)",
      icon: Wrench,
      description: "Software tools for financial modelling and yield estimation"
    },
    {
      id: 5,
      title: "Green Finance and Funding Options",
      icon: CreditCard,
      description: "Government schemes, commercial finance structures, and green loan products"
    },
    {
      id: 6,
      title: "Tax Implications and Legal Considerations",
      icon: Scale,
      description: "VAT treatment, tax allowances, planning requirements, and consumer protection"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Renewable Energy Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 9: Incentives, Payback, and Financial Modelling
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding financial incentives and modelling system returns
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 9
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                6 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                60 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => {
              const sectionRoutes = {
                1: "/renewable-energy-module-9-section-1",
                2: "/renewable-energy-module-9-section-2", 
                3: "/renewable-energy-module-9-section-3",
                4: "/renewable-energy-module-9-section-4",
                5: "/renewable-energy-module-9-section-5",
                6: "/renewable-energy-module-9-section-6"
              };
              
              return (
                <Link key={section.id} to={sectionRoutes[section.id]}>
                  <Card 
                    className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                  >
                    <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                      <div className="flex justify-center">
                        <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                      </div>
                      
                      <div className="flex justify-center">
                        <Badge 
                          variant="secondary" 
                          className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                        >
                          Section {section.id}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                        {section.title}
                      </h3>
                      
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule9;