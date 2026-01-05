import { ArrowLeft, Brain, AlertTriangle, Target, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module8Section2 = () => {
  const sections = [
    {
      id: 1,
      title: "Test Day Preparation and Mindset",
      icon: Brain,
      description: "Preparation strategies and mental approach for exam success"
    },
    {
      id: 2,
      title: "Common Mistakes and How to Avoid Them",
      icon: AlertTriangle,
      description: "Typical errors and prevention techniques"
    },
    {
      id: 3,
      title: "Smart Techniques for Answering Questions",
      icon: Target,
      description: "Strategic approaches to tackle different question types"
    },
    {
      id: 4,
      title: "Memorising Key Test Values and Sequences",
      icon: BookOpen,
      description: "Essential values and procedures to commit to memory"
    },
    {
      id: 5,
      title: "Using Regulations to Back Up Your Answers",
      icon: FileText,
      description: "Leveraging BS 7671 to support your responses"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="../module-8">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Hints and Tips
                </h1>
                <p className="text-lg sm:text-xl text-white break-words">
                  Expert guidance for examination success
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                Section 2
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../module-8/section-2/part-${section.id}`}
                className="h-full touch-manipulation"
              >
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col min-h-[200px] active:scale-95"
                >
                  <CardContent className="text-center space-y-4 p-6 flex-shrink-0">
                    <div className="flex justify-center">
                      <section.icon className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-sm px-4 py-2 border-0"
                      >
                        Section {section.id}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Link to="module-8/section-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module8Section2;