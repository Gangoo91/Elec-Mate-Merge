import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, BookOpen, Wrench, AlertTriangle } from 'lucide-react';

export const EmergencyLightingSummary4_1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary: What You've Learned
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Core Concepts */}
        <div className="bg-gradient-to-r from-elec-dark to-gray-800 rounded-lg p-5 border border-elec-yellow/30">
          <h3 className="text-elec-yellow font-bold text-lg mb-4">Core Concepts Mastered</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Cable Types and Fire Ratings
              </h4>
              <p className="text-foreground text-sm leading-relaxed ml-7">
                Emergency lighting cables must withstand fire and maintain circuit integrity during evacuation. Four main cable types: MICC (maximum resistance, {'>'}1,000°C), Enhanced F1 (120-minute survival), Standard F2 (30-minute survival), and LSZH variants (reduced toxicity). Selection depends on building risk profile, evacuation duration requirements, and budget. All cables must comply with BS 7629-1 and demonstrate fire performance per BS EN 50200.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Fire Resistance Requirements
              </h4>
              <p className="text-foreground text-sm leading-relaxed ml-7">
                BS 5266 and BS 7671 mandate specific survival durations: minimum 1 hour for standard buildings, 3 hours for sleeping accommodation and complex evacuation scenarios. Cables must survive 950°C flame tests whilst maintaining integrity under mechanical shock and water spray. Circuit protection and support systems are as critical as cable specification — the system is only as reliable as its weakest component.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Installation Methods
              </h4>
              <p className="text-foreground text-sm leading-relaxed ml-7">
                Proper installation is non-negotiable: metal fixings only (plastic clips melt in 2-3 minutes), segregation from normal circuits (prevent fault propagation), mechanical protection (trunking/conduit where required), clear identification (maintenance and emergency access), and fire-rated terminations (junction boxes and connection points). BS 7671 Regulation 521.10.202 requires non-combustible support throughout entire cable run.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                System Architecture Differences
              </h4>
              <p className="text-foreground text-sm leading-relaxed ml-7">
                Self-contained systems require minimal cabling (local luminaire drops only, standard F2 often adequate). Central battery systems demand extensive fire-resistant cabling (enhanced F1 or MICC essential) with careful voltage drop management and redundancy planning. Central systems have 4-5× cable volume but centralised maintenance; self-contained systems have distributed failure modes but simpler installation. System choice dramatically affects cable specification requirements.
              </p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Real-World Implications
              </h4>
              <p className="text-foreground text-sm leading-relaxed ml-7">
                The London shopping centre case study proves that cable specification errors have severe consequences: £175,700 total cost impact (rework + lost revenue) from using PVC cables instead of fire-resistant cables. Correct specification from the outset cost £18,000 — representing 9.8× ROI. <strong>Poor cable choices endanger lives and destroy budgets.</strong> Professional electricians specify correctly the first time, understanding that emergency lighting cables are life-safety systems, not cost-optimisation opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Application */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-5">
          <h3 className="text-blue-400 font-bold text-lg mb-3 flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Practical Application Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-elec-dark/30 rounded p-3">
              <p className="text-foreground font-semibold text-sm mb-1">Cable Selection</p>
              <p className="text-foreground text-xs">Choose appropriate fire rating based on building risk, evacuation duration, and budget. Enhanced F1 for critical premises, standard F2 for simple installations, MICC for maximum protection.</p>
            </div>
            <div className="bg-elec-dark/30 rounded p-3">
              <p className="text-foreground font-semibold text-sm mb-1">Installation Quality</p>
              <p className="text-foreground text-xs">Metal support systems exclusively, proper segregation from normal circuits, fire-rated terminations, mechanical protection where required, clear identification throughout.</p>
            </div>
            <div className="bg-elec-dark/30 rounded p-3">
              <p className="text-foreground font-semibold text-sm mb-1">Upgrading Existing Systems</p>
              <p className="text-foreground text-xs">Assess old installations for compliance gaps, budget 60-80% of new installation costs for rework, replace plastic support systems, update documentation comprehensively.</p>
            </div>
            <div className="bg-elec-dark/30 rounded p-3">
              <p className="text-foreground font-semibold text-sm mb-1">Troubleshooting Failures</p>
              <p className="text-foreground text-xs">Test systematically from distribution board to luminaires, inspect termination quality first (most common failure point), check for mechanical damage and water ingress.</p>
            </div>
          </div>
        </div>

        {/* Key Numbers to Remember */}
        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-600">
          <h3 className="text-foreground font-bold text-lg mb-4">Key Values to Remember</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">30</p>
              <p className="text-foreground text-xs mt-1">Minutes F2<br/>cable survival</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">120</p>
              <p className="text-foreground text-xs mt-1">Minutes F1<br/>cable survival</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">950°C</p>
              <p className="text-foreground text-xs mt-1">Fire test<br/>temperature</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">1-3</p>
              <p className="text-foreground text-xs mt-1">Hours minimum<br/>operation</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">300mm</p>
              <p className="text-foreground text-xs mt-1">Minimum circuit<br/>separation</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">180°C</p>
              <p className="text-foreground text-xs mt-1">Plastic clip<br/>failure temp</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">≥1MΩ</p>
              <p className="text-foreground text-xs mt-1">Min. insulation<br/>resistance</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-elec-yellow">&lt;0.5Ω</p>
              <p className="text-foreground text-xs mt-1">Max. circuit<br/>continuity</p>
            </div>
          </div>
        </div>

        {/* Final Takeaway */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-orange-500/10 border-2 border-elec-yellow/30 rounded-lg p-5">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-elec-yellow font-bold text-xl mb-3">The Fundamental Truth</h3>
              <p className="text-foreground leading-relaxed mb-3">
                Emergency lighting cables are life-safety systems that must function reliably during the most extreme conditions. Unlike normal electrical circuits where failure causes inconvenience, emergency lighting cable failure during a fire can prevent safe evacuation and cost lives.
              </p>
              <p className="text-foreground leading-relaxed font-semibold">
                <strong className="text-elec-yellow">Specify correctly. Install professionally. Test comprehensively.</strong> This is the professional standard for emergency lighting cable installations in 2025.
              </p>
            </div>
          </div>
        </div>

        {/* Regulation References */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3">Key Regulations and Standards</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-elec-yellow font-medium">BS 5266-1:2025</p>
              <p className="text-foreground text-xs">Emergency lighting code of practice — duration requirements, system design</p>
            </div>
            <div>
              <p className="text-elec-yellow font-medium">BS 7671:2018+A2:2022</p>
              <p className="text-foreground text-xs">Wiring Regulations — Reg 521.10.202, 560.8.1 (cable support and fire survival)</p>
            </div>
            <div>
              <p className="text-elec-yellow font-medium">BS 7629-1</p>
              <p className="text-foreground text-xs">Fire-resistant cable specification — F1/F2 classification standards</p>
            </div>
            <div>
              <p className="text-elec-yellow font-medium">BS EN 50200</p>
              <p className="text-foreground text-xs">Fire performance testing — PH30, PH60, PH120 classifications</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-3">Ready to Apply This Knowledge?</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <p className="text-foreground text-sm">Review cable manufacturer datasheets for fire rating certifications</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <p className="text-foreground text-sm">Inspect existing installations to identify non-compliant support systems</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <p className="text-foreground text-sm">Complete the quiz below to verify your understanding of cable requirements</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
