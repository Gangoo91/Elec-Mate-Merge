import { ArrowLeft, Wrench, TestTube, BarChart, AlertCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const DataCablingModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Copper Termination Tools and Techniques",
      icon: Wrench,
      description: "Tools and methods for copper cable termination"
    },
    {
      id: 2,
      title: "Link Testing vs Channel Testing", 
      icon: TestTube,
      description: "Different testing methodologies and applications"
    },
    {
      id: 3,
      title: "Test Equipment and Results Interpretation",
      icon: BarChart,
      description: "Testing equipment operation and result analysis"
    },
    {
      id: 4,
      title: "Cable Map and Test Certificate Generation",
      icon: AlertCircle,
      description: "Documentation and certification processes"
    },
    {
      id: 5,
      title: "Fault Diagnosis and Retermination",
      icon: Search,
      description: "Troubleshooting and remedial work procedures"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../data-cabling-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Data Cabling Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Module 5: Termination and Certification Procedures
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-6">
              Cable termination, testing, and certification processes
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                50 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../data-cabling-module-5-section-${section.id}`}
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

export default DataCablingModule5;