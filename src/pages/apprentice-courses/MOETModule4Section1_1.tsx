import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const MOETModule4Section1_1 = () => {
  useSEO(
    "Section 4.1.1: Principles of PPM - MOET Module 4",
    "Understanding preventive maintenance philosophy, benefits and implementation strategies"
  );

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Calendar className="h-8 w-8 text-elec-yellow" />
            <div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Section 4.1.1: Principles of PPM
              </h1>
              <p className="text-muted-foreground mt-2">
                Understanding preventive maintenance philosophy, benefits and implementation strategies
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-card/30 border border-elec-yellow/30 rounded-lg p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Learning Objectives</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Understand the fundamental principles of planned preventive maintenance</li>
              <li>• Recognise the benefits and cost implications of PPM programmes</li>
              <li>• Learn implementation strategies for effective maintenance planning</li>
              <li>• Identify key performance indicators for maintenance effectiveness</li>
            </ul>
          </div>

          <p className="text-lg text-muted-foreground">
            This section covers the fundamental principles of Planned Preventive Maintenance (PPM) and its role in maintaining electrical systems reliability and safety.
          </p>
          
          <p>Content for this subsection will be added here covering the principles and implementation of PPM strategies.</p>
        </div>
      </div>
    </div>
  );
};

export default MOETModule4Section1_1;