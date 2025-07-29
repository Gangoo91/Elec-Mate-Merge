
import { Brain, ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toolOptions } from "@/components/electrician-tools/ai-tools/constants";

const AITooling = () => {

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header Section */}
      <div className="border-b border-elec-gray/20">
        <div className="px-4 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/electrician-tools">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tools
                </Button>
              </Link>
              
              <div className="flex items-center gap-2 text-elec-yellow/60">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Powered by AI</span>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl mb-6">
                <Brain className="h-8 w-8 text-elec-yellow" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-elec-light mb-4">
                AI Tooling Suite
              </h1>
              
              <p className="text-lg text-elec-light/70 max-w-2xl mx-auto">
                Professional AI tools designed specifically for UK electricians and BS 7671 compliance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolOptions.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card 
                  key={tool.value} 
                  className="bg-elec-gray/50 border-elec-gray/30 hover:border-elec-yellow/40 transition-all duration-200 group cursor-pointer"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg flex items-center justify-center group-hover:bg-elec-yellow/20 transition-colors">
                        <IconComponent className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <CardTitle className="text-lg text-elec-light group-hover:text-elec-yellow transition-colors">
                        {tool.label}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-elec-light/60 text-sm leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link to={`/electrician-tools/ai-tooling/${tool.value}`}>
                      <Button 
                        className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium group-hover:shadow-lg group-hover:shadow-elec-yellow/20 transition-all"
                      >
                        Open Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITooling;
