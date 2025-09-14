
import { Brain, ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toolOptions } from "@/components/electrician-tools/ai-tools/constants";
import DebugToolsButton from "@/components/electrician-tools/DebugToolsButton";

const AITooling = () => {

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header Section */}
      <div className="border-b border-elec-gray/20">
        <div className="px-4 py-4 md:py-6">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Link to="/electrician">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Electrical Hub
                </Button>
              </Link>
              
              <div className="flex gap-2">
                <DebugToolsButton />
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl mb-2">
                <Brain className="h-7 w-7 text-elec-yellow" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-elec-light mb-2">
                AI Tooling Suite
              </h1>
              
              <p className="text-base text-elec-light/70 max-w-xl mx-auto">
                Professional AI tools designed specifically for UK electricians and BS 7671 compliance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {toolOptions.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link 
                  key={tool.value} 
                  to={`/electrician-tools/ai-tooling/${tool.value}`}
                  className="block"
                >
                  <Card 
                    className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/90 transition-colors duration-200 cursor-pointer hover-scale"
                  >
                    <CardHeader className="flex flex-col items-center justify-center text-center py-6 md:py-8">
                      <div className="mb-3">
                        <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-elec-yellow" />
                      </div>
                      <CardTitle className="text-base sm:text-lg leading-tight">{tool.label}</CardTitle>
                    </CardHeader>
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

export default AITooling;
