import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, User, Briefcase, Calculator, ArrowRight, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyStateGuideProps {
  type: "quote" | "invoice";
  onCreateClick: () => void;
}

export const EmptyStateGuide: React.FC<EmptyStateGuideProps> = ({ type, onCreateClick }) => {
  const navigate = useNavigate();
  
  const steps = type === "quote" ? [
    {
      icon: User,
      title: "Add Client Details",
      description: "Enter customer information and contact details",
      time: "30 seconds"
    },
    {
      icon: Briefcase,
      title: "Describe the Job",
      description: "Add job title, description, and work scope",
      time: "1 minute"
    },
    {
      icon: Calculator,
      title: "Add Items",
      description: "Include labour, materials, and equipment costs",
      time: "2 minutes"
    },
    {
      icon: FileText,
      title: "Generate Quote",
      description: "Review and download professional PDF quote",
      time: "30 seconds"
    }
  ] : [
    {
      icon: User,
      title: "Client & Job Details",
      description: "Start with customer and project information",
      time: "1 minute"
    },
    {
      icon: Calculator,
      title: "Add Line Items",
      description: "Include completed work and materials used",
      time: "2 minutes"
    },
    {
      icon: FileText,
      title: "Payment Terms",
      description: "Set due date and payment methods",
      time: "30 seconds"
    },
    {
      icon: FileText,
      title: "Generate Invoice",
      description: "Download professional invoice PDF",
      time: "30 seconds"
    }
  ];

  return (
    <Card className="border-dashed border-2 border-primary/20 bg-card/50">
      <CardContent className="p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">
            Create Your First {type === "quote" ? "Quote" : "Invoice"}
          </h3>
          <p className="text-muted-foreground text-lg">
            Professional {type === "quote" ? "quotes" : "invoices"} in just 4 easy steps • Takes about 4 minutes
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 h-full">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {step.time}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {index + 1}
                      </span>
                      <h4 className="font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <p className="font-medium">Quick Tip</p>
              <p className="text-sm text-muted-foreground">
                {type === "quote" 
                  ? "All fields are auto-saved as you type. You can return anytime to complete your quote."
                  : "You can create invoices from accepted quotes or start fresh with new client details."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            onClick={onCreateClick}
            className="w-full sm:w-auto px-8 h-14 text-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create {type === "quote" ? "Quote" : "Invoice"} Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open("https://docs.lovable.dev", "_blank")}
            className="w-full sm:w-auto h-14"
          >
            Watch Tutorial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Missing Plus import
import { Plus } from "lucide-react";
