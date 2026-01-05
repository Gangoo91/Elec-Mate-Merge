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
  <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
    <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">This page is now available</h2>
    <p className="text-xs sm:text-sm text-foreground">You're viewing Section {section}. If anything looks off, please let us know and we'll refine the content for Level 2 learners in UK English, aligned to BS 7671.</p>
  </Card>
);

const Module2Section2_Intro: React.FC = () => {
  useSEO(
    "Section 2 index – Calculations overview",
    "Landing page for Section 2 with links to subsections."
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../module2-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card/10">
              <BookOpen className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Section 2</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">Calculations Overview</h1>
          <p className="text-muted-foreground">Use the links above to access each subsection. We’ve added comprehensive Level 2 content, InlineChecks and quizzes.</p>
        </header>

        <PlaceholderNote section="2" />

        <div className="flex items-start gap-3 bg-card/20 border-l-4 border-emerald-500 p-4 rounded mt-6" role="alert">
          <AlertTriangle className="w-5 h-5 text-emerald-400 mt-0.5" />
          <p className="text-foreground text-sm">Always follow safe isolation and BS 7671. Manufacturer instructions take priority for product‑specific details.</p>
        </div>
      </main>
    </div>
  );
};

export default Module2Section2_Intro;
