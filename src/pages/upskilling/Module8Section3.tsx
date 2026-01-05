import { ArrowLeft, Eye, Shield, Zap, RotateCcw, Gauge, Target, Activity, CheckCircle, Search, AlertTriangle, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module8Section3 = () => {
  const practicalTests = [
    {
      id: 1,
      title: "Visual Inspection",
      description: "Comprehensive visual examination of electrical installations before testing begins",
      icon: Eye,
      category: "Initial"
    },
    {
      id: 2,
      title: "Safe Isolation",
      description: "Proper procedures for safely isolating electrical circuits before testing",
      icon: Shield,
      category: "Safety"
    },
    {
      id: 3,
      title: "Continuity of CPCs",
      description: "Testing continuity of circuit protective conductors using appropriate methods",
      icon: Zap,
      category: "Continuity"
    },
    {
      id: 4,
      title: "Continuity of Ring Finals",
      description: "Ring final circuit continuity testing including end-to-end and cross-connection tests",
      icon: RotateCcw,
      category: "Continuity"
    },
    {
      id: 5,
      title: "Insulation Resistance",
      description: "Testing insulation resistance between conductors and to earth using 500V DC",
      icon: Gauge,
      category: "Resistance"
    },
    {
      id: 6,
      title: "Polarity Testing",
      description: "Verification that single-pole devices are connected in the phase conductor only",
      icon: Target,
      category: "Verification"
    },
    {
      id: 7,
      title: "Earth Fault Loop Impedance",
      description: "Testing the impedance of the earth fault loop path including Ze, Zs measurements",
      icon: Activity,
      category: "Impedance"
    },
    {
      id: 8,
      title: "RCD Testing",
      description: "Residual current device testing including trip times and operating currents",
      icon: CheckCircle,
      category: "Protection"
    },
    {
      id: 9,
      title: "Functional Testing",
      description: "Testing the correct operation of switches, isolators, and control equipment",
      icon: Settings,
      category: "Operation"
    },
    {
      id: 10,
      title: "Documentation",
      description: "Proper completion of test certificates and schedules of test results",
      icon: FileText,
      category: "Records"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Initial: "bg-yellow-400/40 text-blue-300",
      Safety: "bg-red-600/40 text-red-300",
      Continuity: "bg-green-600/40 text-green-300",
      Resistance: "bg-purple-600/40 text-purple-300",
      Verification: "bg-orange-600/40 text-orange-300",
      Impedance: "bg-cyan-600/40 text-cyan-300",
      Protection: "bg-pink-600/40 text-pink-300",
      Operation: "bg-indigo-600/40 text-indigo-300",
      Measurement: "bg-teal-600/40 text-teal-300",
      Records: "bg-gray-600/40 text-white"
    };
    return colors[category as keyof typeof colors] || "bg-yellow-600/40 text-yellow-300";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-8">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Practical Assessment Help
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Comprehensive guidance for all practical tests and inspections in electrical installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {practicalTests.map((test) => {
              const IconComponent = test.icon;
              const testUrl = test.id === 1 ? '/visual-inspection-guide' : test.id === 2 ? '/safe-isolation-guide' : test.id === 3 ? '/cpc-continuity-guide' : test.id === 4 ? '/ring-final-continuity-guide' : test.id === 5 ? '/insulation-resistance-guide' : test.id === 6 ? '/polarity-testing-guide' : test.id === 7 ? '/earth-fault-loop-guide' : test.id === 8 ? '/rcd-testing-guide' : test.id === 9 ? '/functional-testing-guide' : '/documentation-guide';
              
              return (
                <Link key={test.id} to={testUrl}>
                  <Card 
                    className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                  >
                    <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                      <div className="flex justify-center">
                        <IconComponent className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                      </div>
                      <div className="flex justify-center">
                        <Badge 
                          variant="secondary" 
                          className={`${getCategoryColor(test.category)} hover:opacity-80 font-bold text-xs px-3 py-1 border-0`}
                        >
                          {test.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                        {test.title}
                      </h3>
                      <p className="text-white text-xs leading-relaxed">
                        {test.description}
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

export default Module8Section3;