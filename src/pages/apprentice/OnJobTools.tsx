
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/common/BackButton";
import OnTheJobToolsBox from "@/components/apprentice/OnTheJobToolsBox";
import { Calculator, FileText, Pencil, ShieldCheck, Zap, WrenchIcon } from "lucide-react";

const OnJobTools = () => {
  const tools = [
    {
      id: 1,
      title: "Cable Calculations",
      icon: Calculator,
      description: "Calculate cable sizes, voltage drop, and fault current levels",
      link: "/apprentice/on-job-tools/cable-calculations"
    },
    {
      id: 2,
      title: "Safety Checklists",
      icon: ShieldCheck,
      description: "Pre-job safety checklists and risk assessments",
      link: "/apprentice/on-job-tools/safety-checklists"
    },
    {
      id: 3,
      title: "Documentation Templates",
      icon: FileText,
      description: "Templates for electrical certificates and reports",
      link: "/apprentice/on-job-tools/documentation"
    },
    {
      id: 4,
      title: "Testing Guides",
      icon: Zap,
      description: "Step-by-step guides for electrical testing procedures",
      link: "/apprentice/on-job-tools/testing-guides"
    },
    {
      id: 5,
      title: "Material Estimator",
      icon: Pencil,
      description: "Estimate materials needed for common electrical jobs",
      link: "/apprentice/on-job-tools/material-estimator"
    },
    {
      id: 6,
      title: "Tool Selection Guide",
      icon: WrenchIcon,
      description: "Guide for selecting the right tools for specific jobs",
      link: "/apprentice/on-job-tools/tool-selection"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-6">
      <div className="mb-6">
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
        <h1 className="text-3xl font-bold mt-4 mb-2">On the Job Tools</h1>
        <p className="text-muted-foreground">Practical tools and resources for on-site electrical work</p>
      </div>

      <OnTheJobToolsBox tools={tools} />
    </div>
  );
};

export default OnJobTools;
