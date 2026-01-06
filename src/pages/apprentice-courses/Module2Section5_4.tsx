import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Wrench, CheckCircle2, AlertTriangle, Thermometer, Ruler, Plug, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ResistanceCalculator from "@/components/apprentice-courses/ResistanceCalculator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import React from "react";

const faqs = [
  {
    q: "What affects resistance most on site?",
    a: "Length, cross‑sectional area, material, temperature, and the quality of joints/terminations.",
  },
  {
    q: "How can I quickly estimate cable resistance?",
    a: "Use R ≈ 0.0172 × L ÷ A for copper (0.0282 for aluminium), with L in metres and A in mm².",
  },
  {
    q: "Any testing tips for continuity?",
    a: "Isolate, lock‑off and prove dead. Use a low‑ohm continuity tester, null the leads, and follow BS 7671 and the instrument manual.",
  },
];

const Module2Section5_4: React.FC = () => {
  useSEO(
    "Resistance in Practice – Module 2 (2.5.4)",
    "Level 2 practical resistance: quick estimates, measuring continuity, joints and heating with BS 7671 guidance."
  );

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.5.4
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Resistance in Practice
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Real-world tips for cable runs, joints and testing in line with BS 7671
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Quick estimate:</strong> Copper R ≈ 0.0172 × L ÷ A</li>
                <li><strong>Longer runs:</strong> Higher resistance and voltage drop</li>
                <li><strong>Poor joints:</strong> Add resistance and create hot spots</li>
                <li><strong>Temperature:</strong> Heat increases resistance</li>
                <li><strong>Testing:</strong> Use continuity tester, follow BS 7671</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Long runs, loose terminals, overheating joints</li>
                <li><strong>Use:</strong> Proper torque settings, clean connections</li>
                <li><strong>Apply:</strong> Route efficiently, upsize for voltage drop</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* What it means on site */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What this means on site</h2>
          <ul className="list-disc pl-6 space-y-2 text-white text-sm">
            <li><strong>Longer</strong> runs have more resistance; keep runs sensible and plan routes.</li>
            <li><strong>Thicker</strong> cables (bigger CSA) have less resistance; upsize to limit heating and voltage drop.</li>
            <li><strong>Material</strong> matters: copper has lower resistance than aluminium for the same size.</li>
            <li><strong>Heat</strong> raises resistance; avoid bunching, poor ventilation and overloaded enclosures.</li>
            <li><strong>Joints/terminations</strong> add contact resistance; poor joints overheat – a safety risk.</li>
          </ul>
        </Card>

        {/* Quick estimator */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-2"><Calculator className="w-5 h-5"/>Quick resistance estimator</h2>
          <p className="text-xs sm:text-sm text-white mb-4">Use these constants with <strong>L</strong> in metres and <strong>A</strong> in mm² (20°C reference):</p>
          <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium">Copper</p>
              <p>R (Ω) ≈ <strong>0.0172 × L ÷ A</strong></p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium">Aluminium</p>
              <p>R (Ω) ≈ <strong>0.0282 × L ÷ A</strong></p>
            </div>
          </div>
          <div className="text-xs text-white mt-3">For a complete loop (out and back), use the total path length. Always verify design with Appendix 4 tables.</div>
        </Card>

        {/* Calculator */}
        <ResistanceCalculator />

        {/* Practical guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 no-accent border-white/10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Practical guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="bg-card border border-border/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-elec-yellow mb-1 flex items-center gap-2"><Ruler className="w-4 h-4"/> Cable runs</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Keep runs short; avoid unnecessary loops.</li>
                <li>Consider future load – long feeders may need a larger CSA.</li>
                <li>Route to limit heat build‑up and grouping where possible.</li>
              </ul>
            </div>
            <div className="bg-card border border-amber-400/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2"><Thermometer className="w-4 h-4"/> Temperature</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Higher temperature increases resistance; check installation method.</li>
                <li>Use manufacturer data and Appendix 4 correction factors.</li>
                <li>Provide ventilation where equipment runs warm.</li>
              </ul>
            </div>
            <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-elec-yellow mb-1 flex items-center gap-2"><Plug className="w-4 h-4"/> Joints and terminations</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Clean, tight connections reduce contact resistance.</li>
                <li>Use correct lugs, ferrules and torque settings.</li>
                <li>For aluminium, consider bimetallic lugs and jointing paste.</li>
              </ul>
            </div>
            <div className="bg-rose-500/10 border border-rose-400/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-rose-300 mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Safety</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>High‑resistance joints overheat – inspect for discolouration or smell.</li>
                <li>Isolate, lock‑off and prove dead before working on connections.</li>
                <li>Follow BS 7671 Sections 525 and 526 for thermal effects and connections.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Simple practice tasks */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practice tasks</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 1</p>
              <p>Find R for 20 m of copper, 4 mm² at 20°C.</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show answer</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>R ≈ 0.0172 × 20 ÷ 4 = 0.086 Ω</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 2</p>
              <p>Estimate the loop resistance for a 15 m radial (out and back) in copper, 2.5 mm².</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show answer</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>Total path length = 30 m. R ≈ 0.0172 × 30 ÷ 2.5 = 0.206 Ω</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 3</p>
              <p>Which will have lower resistance: 10 m of 1.5 mm² copper or 10 m of 2.5 mm² copper?</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show answer</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>2.5 mm² is thicker, so lower R for the same length and material.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.5
            </Link>
          </Button>
        </div>
        </div>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
};

export default Module2Section5_4;
