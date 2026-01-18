import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Wrench, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";

const Module2Section2_Intro: React.FC = () => {
  useSEO(
    "Section 2 index – Calculations overview",
    "Landing page for Section 2 with links to subsections."
  );

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Section 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Calculations Overview</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Use the links above to access each subsection. We've added comprehensive Level 2 content, InlineChecks and quizzes.</p>
        </header>

        <section className="mb-10 p-4 sm:p-6 border border-white/20 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">This page is now available</h2>
          <p className="text-xs sm:text-sm text-white">You're viewing Section 2. If anything looks off, please let us know and we'll refine the content for Level 2 learners in UK English, aligned to BS 7671.</p>
        </section>

        <div className="flex items-start gap-3 bg-card/20 border-l-2 border-elec-yellow p-4 rounded mt-6" role="alert">
          <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5" />
          <p className="text-white text-sm">Always follow safe isolation and BS 7671. Manufacturer instructions take priority for product‑specific details.</p>
        </div>
      </main>
    </div>
  );
};

export default Module2Section2_Intro;
