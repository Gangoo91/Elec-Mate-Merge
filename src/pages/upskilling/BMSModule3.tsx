import { ArrowLeft, Wind, Gauge, Clock, Battery, Power, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BMSModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "HVAC Systems in BMS (AHU, FCU, Chillers, Boilers)",
      icon: Wind,
      description: "HVAC equipment integration and control"
    },
    {
      id: 2,
      title: "Control Strategies: Temperature, Pressure, Flow", 
      icon: Gauge,
      description: "Process control methods and strategies"
    },
    {
      id: 3,
      title: "Time Scheduling and Occupancy Programming",
      icon: Clock,
      description: "Automated scheduling and occupancy control"
    },
    {
      id: 4,
      title: "Demand-Based Control and Load Shedding",
      icon: Battery,
      description: "Energy optimization and load management"
    },
    {
      id: 5,
      title: "Override Functions and Seasonal Settings",
      icon: Power,
      description: "Manual overrides and seasonal adjustments"
    },
    {
      id: 6,
      title: "Alarm Responses and Safety Shutdowns",
      icon: AlertTriangle,
      description: "Emergency procedures and safety systems"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../bms-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to BMS Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Module 3: HVAC Integration and Scheduling Logic
            </h1>
            <p className="text-base text-white mb-6">
              HVAC control strategies and scheduling systems
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
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
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../bms-module-3-section-${section.id}`}
                className="h-full"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-bold text-xs px-3 py-1 border-0"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMSModule3;