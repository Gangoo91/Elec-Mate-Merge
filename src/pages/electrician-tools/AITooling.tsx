
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toolOptions } from "@/components/electrician-tools/ai-tools/constants";

const AITooling = () => {

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header Section */}
      <div className="border-b border-elec-gray/20">
        <div className="px-4 py-4 md:py-6">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center mb-4">
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
      <div className="px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {toolOptions.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link 
                  key={tool.value} 
                  to={`/electrician-tools/ai-tooling/${tool.value}`}
                  className="group block"
                >
                  <Card 
                    className="relative h-full border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-gray/80 overflow-hidden transition-all duration-300 hover:border-elec-yellow/60 hover:shadow-[0_0_30px_-5px_rgba(255,204,0,0.3)] hover:scale-[1.02] cursor-pointer"
                  >
                    <CardHeader className="relative p-6 md:p-8 space-y-4">
                      {/* Icon Container */}
                      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-elec-yellow/10 border border-elec-yellow/20 rounded-2xl transition-all duration-300 group-hover:bg-elec-yellow/20 group-hover:border-elec-yellow/40 group-hover:scale-110 group-hover:rotate-3">
                        <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-elec-yellow transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      {/* Title */}
                      <CardTitle className="text-lg md:text-xl text-elec-light font-semibold leading-tight transition-colors duration-300 group-hover:text-elec-yellow">
                        {tool.label}
                      </CardTitle>

                      {/* Description */}
                      <p className="text-sm md:text-base text-elec-light/60 leading-relaxed transition-all duration-300 group-hover:text-elec-light/80">
                        {tool.description}
                      </p>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/0 via-elec-yellow/0 to-elec-yellow/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
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
