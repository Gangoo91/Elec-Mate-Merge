
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import OverviewSection from "@/components/apprentice/bs7671/OverviewSection";
import InspectionSection from "@/components/apprentice/bs7671/InspectionSection";
import TestingSection from "@/components/apprentice/bs7671/TestingSection";
import DocumentationSection from "@/components/apprentice/bs7671/DocumentationSection";

const OnJobBS7671RunThrough = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">BS7671 Inspection & Testing</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Complete step-by-step inspection and testing procedures, guides, and documentation requirements for apprentices
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewSection />
        <InspectionSection />
        <TestingSection />
        <DocumentationSection />
      </div>

      {/* Compliance Reminder Card */}
      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            BS7671 Compliance Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            All electrical installation work must comply with BS 7671 (18th Edition) requirements. 
            Follow the correct testing sequence, document all results accurately, and ensure safety 
            procedures are followed at all times. As an apprentice, always work under supervision 
            and never attempt testing procedures without proper training and competency.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobBS7671RunThrough;
