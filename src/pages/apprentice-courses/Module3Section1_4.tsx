import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Cable, Zap, Shield, AlertTriangle, CheckCircle2, Home, Factory, Wrench, Scissors, Settings, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "swa-protection",
    question: "What component of SWA provides mechanical protection?",
    options: ["Outer sheath", "Steel wire armour", "Bedding layer", "Conductor insulation"],
    correctIndex: 1,
    explanation: "The steel wire armour provides exceptional mechanical protection against physical damage and impacts."
  },
  {
    id: "swa-banjo",
    question: "What is a 'banjo' in SWA termination?",
    options: ["A type of cable stripper", "A curved earthing washer", "A bending tool", "A weatherproof seal"],
    correctIndex: 1,
    explanation: "A banjo is a curved earthing washer that ensures good electrical contact between the gland and the enclosure."
  },
  {
    id: "swa-glands",
    question: "Why must correct glands be used when terminating SWA?",
    options: ["To reduce cable cost", "To earth the armour and provide sealing", "To increase flexibility", "To reduce installation time"],
    correctIndex: 1,
    explanation: "Correct glands ensure the armour is properly earthed and provide IP-rated protection against moisture and dust ingress."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary function of the steel wire armour in SWA cable?",
    options: ["Reduce voltage drop", "Provide mechanical protection", "Increase flexibility", "Reduce current capacity"],
    correctAnswer: 1,
    explanation: "The steel wire armour provides mechanical protection against physical damage, impacts, and crushing forces."
  },
  {
    id: 2,
    question: "Which layer lies between the insulation and the armour in SWA cable?",
    options: ["Bedding", "Sheath", "Conductor", "Earth wire"],
    correctAnswer: 0,
    explanation: "The bedding layer cushions the conductors and provides protection between the insulation and steel armour."
  },
  {
    id: 3,
    question: "True or False: SWA cable is only for outdoor use.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. SWA can be used indoors where mechanical protection is needed, though it's heavier than standard cables."
  },
  {
    id: 4,
    question: "What is the recommended burial depth for SWA cable in a domestic garden?",
    options: ["100 mm", "300 mm", "600 mm", "900 mm"],
    correctAnswer: 2,
    explanation: "600mm is the standard burial depth for domestic installations, with warning tape placed above."
  },
  {
    id: 5,
    question: "Why must correct glands be used when terminating SWA?",
    options: ["To make stripping easier", "To earth the armour and provide sealing", "To keep the cable lightweight", "To reduce installation cost"],
    correctAnswer: 1,
    explanation: "Glands earth the armour and provide IP-rated sealing against moisture and dust ingress."
  },
  {
    id: 6,
    question: "What tool is commonly used for bending larger SWA cables during installation?",
    options: ["Cable strippers", "Bulldog benders", "Crimping tools", "Wire cutters"],
    correctAnswer: 1,
    explanation: "Bulldog benders provide the leverage needed to form smooth bends in larger SWA cables without damaging the armour."
  },
  {
    id: 7,
    question: "When stripping SWA, what must be done to the armour wires?",
    options: ["Cut them as short as possible", "Leave them long and fold back over the gland", "Remove them completely", "Twist them together"],
    correctAnswer: 1,
    explanation: "Armour wires should be left long enough to fold back over the gland body to ensure proper earthing contact."
  },
  {
    id: 8,
    question: "What type of saw is typically used to cut through SWA armour?",
    options: ["Wood saw", "Hacksaw with fine teeth", "Chainsaw", "Jigsaw"],
    correctAnswer: 1,
    explanation: "A hacksaw with fine teeth cuts cleanly through the steel armour without damaging the inner conductors."
  },
  {
    id: 9,
    question: "Why might LSZH sheathing be specified instead of PVC?",
    options: ["It's cheaper", "It's more flexible", "It produces less toxic smoke in a fire", "It's waterproof"],
    correctAnswer: 2,
    explanation: "LSZH (Low Smoke Zero Halogen) sheathing reduces toxic emissions in fire situations, making it safer for enclosed spaces."
  },
  {
    id: 10,
    question: "What should be installed above buried SWA cables?",
    options: ["Concrete slab", "Warning tape", "Wooden board", "Metal plate"],
    correctAnswer: 1,
    explanation: "Warning tape is placed above buried cables to alert future excavators and prevent accidental damage."
  },
  {
    id: 11,
    question: "What is the typical minimum bend radius for SWA cable?",
    options: ["3 times cable diameter", "6 times cable diameter", "10 times cable diameter", "15 times cable diameter"],
    correctAnswer: 1,
    explanation: "SWA cable should maintain a minimum bend radius of 6 times the cable diameter to prevent armour damage."
  },
  {
    id: 12,
    question: "Which property makes SWA suitable for direct burial without extra conduit?",
    options: ["High electrical conductivity", "Flexible insulation", "Steel wire mechanical protection", "Small conductor size"],
    correctAnswer: 2,
    explanation: "The steel wire armour provides sufficient mechanical protection for direct burial applications."
  }
];

const Module3Section1_4: React.FC = () => {
  useSEO(
    "Steel Wire Armoured (SWA) Cables – Module 3 (3.1.4)",
    "Complete guide to SWA cable construction, installation, gland termination and practical applications. BS 7671 compliant training."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Steel Wire Armoured (SWA) Cables – Module 3 (3.1.4)",
    description:
      "Complete guide to SWA cable construction, installation, gland termination and practical applications. BS 7671 compliant training.",
    articleSection: "Electrical Installation",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "Can SWA cable be used indoors?", a: "Yes, although it is heavier than standard cables and often over-specified unless mechanical protection is needed." },
    { q: "Can the armour act as the only earth conductor?", a: "In many cases, yes — if the cable design and regulations permit — but a separate CPC may be required in some installations." },
    { q: "What's the difference between PVC and LSZH SWA?", a: "LSZH (Low Smoke Zero Halogen) reduces toxic smoke emissions in a fire, making it safer for enclosed public spaces." },
    { q: "How do you calculate the correct gland size for SWA?", a: "Match the gland size to the cable's outer diameter and ensure it's rated for the environmental conditions (IP rating)." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Section 3.1.4</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">Steel Wire Armoured (SWA) Cables</h1>
          <p className="text-muted-foreground">Robust multicore cables with steel armour protection for demanding underground and exposed installations.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multicore cable with steel wire armour providing exceptional mechanical protection.</li>
                <li>Suitable for direct burial and exposed runs where standard cables would be damaged.</li>
                <li>Armour can serve as earth conductor when properly terminated with appropriate glands.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Black outer sheath with visible steel wire armour underneath when stripped.</li>
                <li><strong>Use:</strong> Underground supplies, industrial environments, car parks, external installations.</li>
                <li><strong>Check:</strong> Gland termination, armour earthing, burial depth, warning tape above.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Describe the construction and components of SWA cable systems.</li>
            <li>Identify typical applications where SWA cable is the optimal choice.</li>
            <li>Explain the advantages and limitations of SWA compared to other cable types.</li>
            <li>Apply correct installation and termination methods for SWA cables.</li>
            <li>Understand gland selection, fitting and armour earthing requirements.</li>
            <li>Master practical techniques including stripping, bending and burial methods.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Construction */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2"><Wrench className="w-5 h-5" /> Construction of SWA Cable</h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <p><strong>Description:</strong> Steel Wire Armoured cable combines power transmission with exceptional mechanical protection through its layered construction.</p>
              
              <div className="space-y-4">
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Core Construction (Inside to Outside)</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li><strong>Conductor:</strong> Stranded copper (or aluminium in larger sizes) for flexibility and current carrying</li>
                    <li><strong>Insulation:</strong> Cross-linked polyethylene (XLPE) or PVC depending on specification and operating temperature</li>
                    <li><strong>Bedding:</strong> Protective layer between insulation and armour to prevent mechanical damage during installation</li>
                    <li><strong>Armour:</strong> Galvanised steel wires wound around the cable core providing mechanical protection</li>
                    <li><strong>Sheath:</strong> Outer PVC or LSZH jacket for environmental protection and identification</li>
                  </ol>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg p-4 bg-card border border-green-400/30">
                    <p className="font-medium mb-2">Standard SWA Types</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>2-core:</strong> Live and neutral (plus armour earth)</li>
                      <li><strong>3-core:</strong> Live, neutral, earth (plus armour earth)</li>
                      <li><strong>4-core:</strong> 3-phase and neutral (plus armour earth)</li>
                      <li><strong>5-core:</strong> 3-phase, neutral, earth (plus armour earth)</li>
                      <li><strong>Multicore:</strong> Control and instrumentation cables</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                    <p className="font-medium mb-2">Sheath Options</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>PVC:</strong> Standard black sheath for general use</li>
                      <li><strong>LSZH:</strong> Low smoke zero halogen for public buildings</li>
                      <li><strong>UV Stabilised:</strong> For extended outdoor exposure</li>
                      <li><strong>Oil Resistant:</strong> For industrial environments</li>
                      <li><strong>Flame Retardant:</strong> Enhanced fire performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-construction"
            question="Which layer provides cushioning between the insulation and steel armour?"
            options={["Conductor", "Bedding", "Sheath", "Core"]}
            correctIndex={1}
            explanation="The bedding layer protects the insulated conductors from damage during cable pulling and installation."
          />
          <Separator className="my-6" />

          {/* Advantages and Applications */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Advantages and Applications</h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-card border border-green-400/30">
                  <p className="font-medium mb-2">Key Advantages</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Exceptional mechanical protection suitable for direct burial</li>
                    <li>Steel armour can provide an earthing path when correctly terminated</li>
                    <li>Long service life resistant to moisture and environmental hazards</li>
                    <li>Can carry high currents over long distances with minimal voltage drop</li>
                    <li>Excellent for exposed outdoor runs and harsh environments</li>
                    <li>Fire resistant properties when LSZH sheathed</li>
                  </ul>
                </div>
                <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                  <p className="font-medium mb-2">Limitations</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Heavier and less flexible than non-armoured cables</li>
                    <li>Requires correct glands for proper termination and sealing</li>
                    <li>Higher cost compared to standard multicore cables</li>
                    <li>Installation can be more labour-intensive</li>
                    <li>Requires bulldog benders for larger cable bending</li>
                    <li>Cannot be easily modified once installed</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-border/30 rounded-lg p-4">
                <p className="font-medium mb-2">Typical Applications:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Underground supplies:</strong> Garden buildings, street lighting, car parks</li>
                    <li><strong>Industrial sites:</strong> Factories, workshops, agricultural buildings</li>
                    <li><strong>Commercial projects:</strong> Shopping centres, office blocks, hospitals</li>
                    <li><strong>Infrastructure:</strong> Transport hubs, utilities, outdoor installations</li>
                  </ul>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Marine environments:</strong> Coastal installations, offshore platforms</li>
                    <li><strong>Mining operations:</strong> Quarries, extraction sites, processing plants</li>
                    <li><strong>Sports facilities:</strong> Floodlighting, scoreboards, external power</li>
                    <li><strong>Emergency services:</strong> Fire stations, ambulance depots, police facilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-applications"
            question="What makes SWA cable suitable for direct burial installations?"
            options={["Low cost", "Steel wire armour protection", "Easy installation", "High flexibility"]}
            correctIndex={1}
            explanation="The steel wire armour provides the mechanical protection needed to withstand soil pressure and potential digging damage."
          />
          <Separator className="my-6" />

          {/* Installation Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2"><Settings className="w-5 h-5" /> Installation Best Practices</h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Underground Installation</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Depth:</strong> 600mm minimum in gardens, 750mm in driveways/roads</li>
                    <li><strong>Bedding:</strong> 100mm sand bed below cable</li>
                    <li><strong>Protection:</strong> 100mm sand cover above cable</li>
                    <li><strong>Warning tape:</strong> 150mm above cable at 300mm depth</li>
                    <li><strong>Route marking:</strong> Record positions for future reference</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Above Ground Installation</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Support spacing:</strong> Every 300-600mm depending on cable size</li>
                    <li><strong>Clips:</strong> Trefoil cleats for larger cables, saddle clips for smaller</li>
                    <li><strong>Bend radius:</strong> Minimum 6x cable diameter (8x for larger cables)</li>
                    <li><strong>UV protection:</strong> Use UV-stabilised cable or additional protection</li>
                    <li><strong>Expansion:</strong> Allow for thermal movement on long runs</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium mb-2">Critical Safety Requirements</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Use appropriately rated SWA glands for termination and earthing</li>
                  <li>Test armour earthing continuity after installation</li>
                  <li>Avoid tight bends that could damage armour or insulation</li>
                  <li>Support cables adequately to prevent mechanical stress</li>
                  <li>Install warning systems for buried cables to prevent future damage</li>
                  <li>Ensure glands maintain IP ratings for environmental protection</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-installation"
            question="What is the standard burial depth for SWA cable in a domestic garden?"
            options={["300mm", "450mm", "600mm", "900mm"]}
            correctIndex={2}
            explanation="600mm is the standard minimum burial depth for domestic installations to protect against normal gardening activities."
          />
          <Separator className="my-6" />

          {/* Practical Installation Guide */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2"><Scissors className="w-5 h-5" /> Practical Installation Guide</h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              
              <div className="rounded-lg p-4 bg-emerald-500/10 border border-emerald-500/30">
                <p className="font-medium mb-3">Essential Tools and Materials</p>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <p className="font-medium mb-2">Cutting & Stripping</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Hacksaw (32 TPI fine teeth)</li>
                      <li>Cable stripping knife</li>
                      <li>Armour wire cutters</li>
                      <li>Insulation strippers</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Termination</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>SWA glands (brass/steel)</li>
                      <li>Banjo earthing washers</li>
                      <li>Earth tails if required</li>
                      <li>Gland spanners</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Installation</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Bulldog benders (25mm² and above)</li>
                      <li>Cable pulling grips</li>
                      <li>Warning tape</li>
                      <li>Cable markers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-3">SWA Cable Stripping Process</p>
                  <ol className="list-decimal pl-4 space-y-2">
                    <li><strong>Mark cutting positions:</strong> Measure 50-75mm for sheath removal, 25-40mm for armour (depending on gland size)</li>
                    <li><strong>Score outer sheath:</strong> Use cable knife to score circumference - cut just through PVC/LSZH, not into armour</li>
                    <li><strong>Remove outer sheath:</strong> Peel back and cut off to expose steel armour wires</li>
                    <li><strong>Cut armour wires:</strong> Use hacksaw to cut cleanly around armour - ensure square cut without damaging bedding</li>
                    <li><strong>Remove bedding:</strong> Carefully strip bedding material to expose individual insulated conductors</li>
                    <li><strong>Strip conductors:</strong> Strip individual insulation to required length (typically 10-15mm for termination)</li>
                  </ol>
                </div>

                <div className="rounded-lg p-4 bg-card border border-green-400/30">
                  <p className="font-medium mb-3">Gland Termination & Banjo Earthing</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">Gland Installation Steps</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>Select correct gland size for cable diameter</li>
                        <li>Disassemble gland components</li>
                        <li>Thread gland components onto cable (back nut, compression ring, sealing washers)</li>
                        <li>Thread cable through gland body from back</li>
                        <li>Slide outer cable sheath over gland body for proper seal</li>
                        <li>Fold armour wires back over gland body evenly</li>
                        <li>Install compression ring over folded armour</li>
                        <li>Add sealing washers and components</li>
                        <li>Tighten back nut: hand tight plus ¼ turn</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Banjo Earthing Process</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Fit curved banjo washer around gland neck</li>
                        <li>Ensure clean metal-to-metal contact with enclosure</li>
                        <li>Connect earth tail from banjo if separate CPC required</li>
                        <li>Verify continuity with low-resistance ohmmeter</li>
                        <li>Test earth fault loop impedance after connection</li>
                        <li>Record test results on installation certificate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-3">Cable Bending & Bulldog Benders</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">When to Use Bulldog Benders</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Cables 25mm² and above (essential for larger sizes)</li>
                        <li>Tight corner installations in plant rooms</li>
                        <li>Multiple cables requiring identical bend radius</li>
                        <li>Professional installations requiring consistent appearance</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Bending Best Practices</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Maintain minimum 6x cable diameter bend radius</li>
                        <li>Form smooth, continuous curves to prevent stress points</li>
                        <li>Support cable adequately during and after bending</li>
                        <li>Check for armour wire displacement after bending</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-practical"
            question="What must be left long when stripping SWA armour wires?"
            options={["5-10mm beyond cut", "15-25mm for folding back", "Remove completely", "Twist together tightly"]}
            correctIndex={1}
            explanation="Armour wires must be left long enough to fold back over the gland body to ensure proper electrical contact for earthing."
          />
          <Separator className="my-6" />
        </Card>

        {/* Quick Knowledge Checks */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick knowledge checks</h2>
          <div className="space-y-6">
            {quickCheckQuestions.map((q) => (
              <InlineCheck key={q.id} {...q} />
            ))}
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 bg-card border border-green-400/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world example</h2>
          <div className="text-xs sm:text-sm text-foreground space-y-3">
            <p><strong>Commercial Car Park Installation</strong></p>
            <p>
              A commercial car park installation required power supplies to 12 lamp posts across the site. 
              SWA cable was chosen for its mechanical strength and suitability for direct burial in the 
              trafficked areas.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Used 4mm² 3-core SWA for lighting circuits rated at 32A</li>
              <li>Buried at 750mm depth with warning tape at 300mm</li>
              <li>Armour correctly earthed using brass glands and banjo washers</li>
              <li>Route positions recorded on site plans for future maintenance</li>
              <li>All earth continuity and loop impedance values tested and certified</li>
            </ul>
            <p>
              The installation provided reliable power distribution whilst protecting against vehicle 
              traffic and maintenance activities. The accessible gland terminations allowed easy 
              connection to each lamp post without compromising the buried cable integrity.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-medium mb-1">{faq.q}</p>
                <p className="text-muted-foreground">{faq.a}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Test your knowledge</h2>
          <Quiz questions={quizQuestions} title="SWA Cables Knowledge Test" />
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border border-border/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="text-xs sm:text-sm text-foreground space-y-3">
            <p>
              SWA cable is the go-to choice for installations needing high durability and mechanical protection. 
              While it is heavier and more costly than non-armoured options, its ability to withstand harsh 
              conditions makes it ideal for underground and external runs.
            </p>
            <p>
              Correct installation, termination, and earthing are critical for safety and compliance. 
              Key success factors include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Proper cable stripping leaving armour wires long enough for gland termination</li>
              <li>Correct gland selection and installation with appropriate IP ratings</li>
              <li>Effective armour earthing using banjo washers and continuity testing</li>
              <li>Maintaining minimum bend radii using bulldog benders for larger cables</li>
              <li>Appropriate burial depth with warning systems for underground installations</li>
            </ul>
          </div>
        </Card>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </main>
    </div>
  );
};

export default Module3Section1_4;