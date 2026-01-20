import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText, User, Briefcase, Calculator, Lightbulb, Plus,
  Clock, ChevronRight, Sparkles
} from "lucide-react";

interface EmptyStateGuideProps {
  type: "quote" | "invoice";
  onCreateClick: () => void;
}

export const EmptyStateGuide: React.FC<EmptyStateGuideProps> = ({ type, onCreateClick }) => {
  const steps = type === "quote" ? [
    {
      icon: User,
      title: "Add Client Details",
      description: "Enter customer information and contact details",
      time: "30 sec"
    },
    {
      icon: Briefcase,
      title: "Describe the Job",
      description: "Add job title, description, and work scope",
      time: "1 min"
    },
    {
      icon: Calculator,
      title: "Add Items",
      description: "Include labour, materials, and equipment costs",
      time: "2 min"
    },
    {
      icon: FileText,
      title: "Generate Quote",
      description: "Review and download professional PDF quote",
      time: "30 sec"
    }
  ] : [
    {
      icon: User,
      title: "Client Details",
      description: "Customer and project information",
      time: "1 min"
    },
    {
      icon: Calculator,
      title: "Line Items",
      description: "Completed work and materials",
      time: "2 min"
    },
    {
      icon: FileText,
      title: "Payment Terms",
      description: "Due date and payment methods",
      time: "30 sec"
    },
    {
      icon: Sparkles,
      title: "Generate",
      description: "Download professional PDF",
      time: "30 sec"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/10 border border-elec-yellow/30">
          <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Create Your First {type === "quote" ? "Quote" : "Invoice"}
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto">
            Professional {type === "quote" ? "quotes" : "invoices"} in 4 easy steps
          </p>
        </div>

        {/* Total time badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <Clock className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-medium text-white/80">~4 minutes total</span>
        </div>
      </div>

      {/* Steps Grid - 2x2 on mobile, 4x1 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 hover:border-elec-yellow/30 transition-colors overflow-hidden"
          >
            <CardContent className="p-4 sm:p-5 space-y-3">
              {/* Step number & time */}
              <div className="flex items-center justify-between">
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-elec-yellow text-black text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded-full">
                  {step.time}
                </span>
              </div>

              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5">
                <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-2">
                  {step.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tip Card */}
      <Card className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/5 border-elec-yellow/20">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm sm:text-base">Quick Tip</p>
              <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                {type === "quote"
                  ? "All fields are auto-saved as you type. Return anytime to complete your quote."
                  : "Create invoices from accepted quotes or start fresh with new client details."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Button */}
      <div className="px-4 sm:px-0">
        <Button
          size="lg"
          onClick={onCreateClick}
          className="w-full h-14 sm:h-12 text-base font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation active:scale-[0.98] transition-all shadow-lg shadow-elec-yellow/20"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create {type === "quote" ? "Quote" : "Invoice"} Now
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
