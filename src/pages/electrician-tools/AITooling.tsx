
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
        <div className="px-4 py-4 md:py-6">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolOptions.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link 
                  key={tool.value} 
                  to={`/electrician-tools/ai-tooling/${tool.value}`}
                  className="block"
                >
                  <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors h-full cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-3 p-3 md:p-4">
                      <CardTitle className="text-xs md:text-sm font-medium text-left flex-1 pr-2">{tool.label}</CardTitle>
                      <div className="h-6 w-6 md:h-7 md:w-7 rounded-md bg-elec-yellow/10 flex items-center justify-center text-elec-yellow flex-shrink-0">
                        <IconComponent className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 p-3 md:p-4 text-left">
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
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

export default AITooling;
