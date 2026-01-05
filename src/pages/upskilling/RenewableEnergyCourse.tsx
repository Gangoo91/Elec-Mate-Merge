import { ArrowLeft, TrendingUp, CheckCircle, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const RenewableEnergyCourse = () => {
  const modules = [
    {
      id: 1,
      title: "Overview of Renewable Energy Technologies",
      duration: "45 mins",
      status: "available"
    },
    {
      id: 2,
      title: "Solar PV System Design and Operation",
      duration: "60 mins",
      status: "available"
    },
    {
      id: 3,
      title: "Wind Turbines and Microgeneration Systems",
      duration: "55 mins",
      status: "available"
    },
    {
      id: 4,
      title: "Battery Storage and Energy Management",
      duration: "50 mins",
      status: "available"
    },
    {
      id: 5,
      title: "Inverter Technology and Grid Integration",
      duration: "65 mins",
      status: "available"
    },
    {
      id: 6,
      title: "Off-Grid vs Grid-Tied System Configuration",
      duration: "55 mins",
      status: "available"
    },
    {
      id: 7,
      title: "Installation, Maintenance, and Troubleshooting",
      duration: "70 mins",
      status: "available"
    },
    {
      id: 8,
      title: "Regulations, Planning, and Compliance",
      duration: "45 mins",
      status: "available"
    },
    {
      id: 9,
      title: "Incentives, Payback, and Financial Modelling",
      duration: "40 mins",
      status: "available"
    },
    {
      id: 10,
      title: "Mock Exam",
      duration: "120 mins",
      status: "available",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Renewable Energy Systems
            </h1>
            <p className="text-base text-white">
              Solar, wind, and battery storage installation and maintenance procedures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link key={module.id} to={`../renewable-energy-module-${module.id}`}>
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      {module.icon ? <module.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} /> : <TrendingUp className="h-8 w-8 text-yellow-400" strokeWidth={1.5} />}
                    </div>
                    
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                      >
                        Module {module.id}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {module.title}
                    </h3>
                    
                    <p className="text-white text-xs leading-relaxed">
                      Duration: {module.duration}
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

export default RenewableEnergyCourse;