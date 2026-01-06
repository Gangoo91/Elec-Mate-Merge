import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Wrench, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const PlaceholderNote: React.FC<{ section: string }> = ({ section }) => (
  <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
    <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">This page is now available</h2>
    <p className="text-xs sm:text-sm text-white">You're viewing Section {section}. If anything looks off, please let us know and we'll refine the content for Level 2 learners in UK English, aligned to BS 7671.</p>
  </Card>
);

const Module2Section2_Intro: React.FC = () => {
  useSEO(
    "Section 2 index – Calculations overview",
    "Landing page for Section 2 with links to subsections."
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="border-b border-white/10 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card/10">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">Section 2</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Calculations Overview</h1>
          <p className="text-white">Use the links above to access each subsection. We’ve added comprehensive Level 2 content, InlineChecks and quizzes.</p>
        </header>

        <PlaceholderNote section="2" />

        <div className="flex items-start gap-3 bg-card/20 border-l-4 border-elec-yellow p-4 rounded mt-6" role="alert">
          <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5" />
          <p className="text-white text-sm">Always follow safe isolation and BS 7671. Manufacturer instructions take priority for product‑specific details.</p>
        </div>
      </main>
    </div>
  );
};

export default Module2Section2_Intro;
