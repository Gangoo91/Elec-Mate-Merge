
import { ArrowLeft, TestTube, Zap, Shield, Eye, Settings, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module5 = () => {
  const sections = [
    {
      id: 1,
      title: "Purpose of Polarity Testing",
      description: "Understanding the fundamental reasons and requirements for conducting polarity testing in electrical installations",
      icon: Zap,
    },
    {
      id: 2,
      title: "Polarity Test Methods",
      description: "Practical testing procedures and methods for verifying correct polarity in different circuit configurations",
      icon: TestTube,
    },
    {
      id: 3,
      title: "Earth Fault Loop Impedance (Zs & Ze)",
      description: "Understanding earth fault loop impedance principles and the difference between Zs and Ze measurements",
      icon: Shield,
    },
    {
      id: 4,
      title: "Testing Zs at Various Points",
      description: "Procedures for measuring earth fault loop impedance at different points throughout the installation",
      icon: Settings,
    },
    {
      id: 5,
      title: "Prospective Fault Current (PSC/PEFC) Testing",
      description: "Measurement and assessment of prospective short-circuit and earth fault currents in electrical systems",
      icon: Zap,
    },
    {
      id: 6,
      title: "Test Equipment Setup & Safety Considerations",
      description: "Proper setup of test equipment and essential safety procedures for impedance and fault current testing",
      icon: Eye,
    },
    {
      id: 7,
      title: "Documenting & Verifying Results",
      description: "Proper recording, documentation and verification of polarity, impedance and fault current test results",
      icon: FileText,
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="/study-centre/upskilling/inspection-testing">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inspection & Testing
          </Button>
        </Link>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Module 5: Polarity, Earth Fault Loop Impedance & Fault Current Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Advanced testing procedures for circuit protection and earthing system verification
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link
                  key={section.id}
                  to={`section-${section.id}`}
                  className="block"
                >
                  <Card
                    className="bg-transparent border-transparent hover:border-elec-yellow/30 transition-all duration-300 hover:bg-transparent/80 cursor-pointer group h-full min-h-[48px]"
                  >
                    <CardHeader className="text-center space-y-3 pb-2 p-4">
                      {/* Icon */}
                      <div className="flex justify-center">
                        <IconComponent className="h-8 w-8 text-elec-yellow" strokeWidth={1.5} />
                      </div>
                      
                      {/* Section Badge */}
                      <div className="flex justify-center">
                        <Badge 
                          variant="secondary" 
                          className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-xs px-3 py-1 border-0"
                        >
                          Section {section.id}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="text-center space-y-2 pt-0 p-4">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-300">
                        {section.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white text-xs leading-relaxed">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Module5;
