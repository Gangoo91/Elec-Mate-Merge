import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle2, AlertTriangle, Link2, Ruler, Lightbulb, XCircle, ChevronDown, ChevronUp, FileText, Shield, Activity, Droplets, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule3Section3 = () => {
  useSEO({
    title: "Main Bonding Conductor Testing | Continuity Testing | Inspection & Testing",
    description: "Learn to test main protective bonding conductors connecting extraneous-conductive-parts to the main earthing terminal. Understand minimum sizes, connection points, and test methods."
  });

  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const defined_learningOutcomes = [
    { id: 1, text: "Identify services requiring main protective bonding", icon: Link2 },
    { id: 2, text: "Perform continuity tests on main bonding conductors", icon: Activity },
    { id: 3, text: "Verify correct bonding conductor sizes for the installation", icon: Ruler },
    { id: 4, text: "Identify correct connection points for bonding conductors", icon: CheckCircle2 },
    { id: 5, text: "Record main bonding test results on certificates", icon: FileText },
    { id: 6, text: "Recognise defective or missing main bonding", icon: AlertTriangle }
  ];

  const defined_faqs = [
    {
      question: "What is the difference between main bonding and supplementary bonding?",
      answer: "Main bonding connects extraneous-conductive-parts (metal services entering the building) to the main earthing terminal. It's a 'whole building' protection measure. Supplementary bonding connects exposed-conductive-parts and extraneous-conductive-parts within a specific area (like a bathroom) where simultaneous contact is possible. Main bonding has larger minimum sizes (typically 10mm²) while supplementary bonding is typically smaller (4mm² minimum)."
    },
    {
      question: "What services require main bonding?",
      answer: "Services that require main bonding include: metallic water pipes entering the building, metallic gas pipes (after the meter), metallic oil supply pipes, structural metalwork connected to the ground (steel frames, etc.), metallic ducting (HVAC) if in contact with earth, and other metallic services. Plastic pipes do NOT require bonding as they're non-conductive. Each metal service entering from outside needs separate bonding."
    },
    {
      question: "Where should main bonding connections be made?",
      answer: "Main bonding should be connected within 600mm of the point where the service enters the building. For gas, it must be within 600mm of the meter AND on the consumer's side of the meter. For water, it should be as close to the entry point as practical, before any branch connections. The connection must be accessible for inspection and testing."
    },
    {
      question: "What minimum CSA is required for main bonding conductors?",
      answer: "The minimum CSA depends on the supply type: For TN-S and TN-C-S supplies: minimum 6mm² copper (or 10mm² if mechanically protected). For TT supplies: minimum 2.5mm² if mechanically protected and 4mm² if not. However, the bonding conductor must be at least half the CSA of the earthing conductor, with a maximum of 25mm² required regardless of earthing conductor size."
    },
    {
      question: "Can plastic pipe sections interrupt main bonding requirements?",
      answer: "If a metallic service has plastic sections before entering the building, the metal parts may not need bonding if they're completely isolated from earth by the plastic. However, if there's ANY chance of the metal being or becoming connected to earth (direct or through other metal), bonding should still be provided. When in doubt, bond it - it does no harm and provides protection against future changes."
    },
    {
      question: "What resistance reading is acceptable for main bonding?",
      answer: "Main bonding should show very low resistance - typically less than 0.05Ω for short runs. The reading should be consistent with the conductor size and length. There's no specific maximum in BS 7671, but any high reading indicates poor connection. For longer runs, calculate expected resistance from CSA and length, but values should still be well under 1Ω."
    },
    {
      question: "What type of clamp should be used for main bonding connections?",
      answer: "BS 951 clamps are the standard for main bonding connections. They must be accessible, provide reliable connection to the pipe, be labelled 'SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE', and be appropriate for the pipe material and size. The clamp must maintain contact even with pipe movement or temperature changes."
    },
    {
      question: "How do I test main bonding if I can't access the earthing terminal?",
      answer: "If direct access to the main earthing terminal isn't possible, you can test from the earth bar in the consumer unit (which should be connected to MET) to the service. The reading will be slightly higher due to the additional conductor length, but should still be very low. Alternatively, test from a known good earth point near the MET. Document which test point you used."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the primary purpose of main protective bonding?",
      options: ["To provide a path for normal load current", "To reduce voltage differences between extraneous-conductive-parts and earth", "To increase the earth fault loop impedance", "To protect cables from mechanical damage"],
      correctAnswer: 1,
      explanation: "Main bonding limits touch voltages by ensuring extraneous-conductive-parts (incoming metal services) are at the same potential as the electrical installation's earth. This prevents dangerous voltage differences during a fault."
    },
    {
      question: "Which of the following services typically requires main bonding?",
      options: ["Plastic water pipe", "Metallic gas pipe after the meter", "Telephone cable", "Fibre optic cable"],
      correctAnswer: 1,
      explanation: "Metallic gas pipes after the meter require main bonding because they're conductive and connected to the ground outside. Plastic pipes don't conduct. Telephone and fibre cables are either non-conductive or separately earthed at the exchange."
    },
    {
      question: "Within what distance of the service entry point should main bonding be connected?",
      options: ["Within 1m", "Within 600mm", "Within 300mm", "Anywhere before the first fitting"],
      correctAnswer: 1,
      explanation: "Main bonding should be connected within 600mm of where the service enters the building (and for gas, within 600mm of the meter on the consumer's side). This ensures protection as close to the entry point as practical."
    },
    {
      question: "What is the minimum main bonding conductor size for a TN-C-S supply where 16mm² is the earthing conductor?",
      options: ["4mm²", "6mm²", "8mm²", "10mm²"],
      correctAnswer: 2,
      explanation: "Main bonding must be at least half the CSA of the earthing conductor. Half of 16mm² = 8mm². However, the absolute minimum for TN supplies is 6mm², and the calculated 8mm² exceeds this, so 8mm² (or 10mm² standard) would be required."
    },
    {
      question: "What label must be attached at each main bonding connection?",
      options: ["'DANGER - HIGH VOLTAGE'", "'EARTH WIRE'", "'SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE'", "'BONDING POINT - TESTING REQUIRED'"],
      correctAnswer: 2,
      explanation: "BS 7671 requires the label 'SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE' at main bonding connections. This warns people not to remove the connection during plumbing or other work, which could leave the installation unsafe."
    },
    {
      question: "What type of clamp is standard for main bonding connections to pipes?",
      options: ["Any metal clamp", "Jubilee clip", "BS 951 bonding clamp", "Saddle clip"],
      correctAnswer: 2,
      explanation: "BS 951 bonding clamps are specifically designed for making reliable connections to metal pipes. They grip the pipe securely, provide good electrical contact, and accommodate pipe movement and temperature changes."
    },
    {
      question: "What reading would you expect when testing main bonding continuity on a short conductor?",
      options: ["Zero exactly", "Less than 0.05Ω typically", "Between 1-2Ω", "Greater than 5Ω"],
      correctAnswer: 1,
      explanation: "Main bonding conductors are typically short and large CSA, so resistance should be very low - often less than 0.05Ω including contact resistance. Higher readings indicate poor connections or undersized conductors."
    },
    {
      question: "For a TT earthing system, what is the minimum main bonding conductor size?",
      options: ["10mm² regardless", "2.5mm² if mechanically protected, 4mm² if not", "6mm² minimum regardless", "16mm² to match earthing conductor"],
      correctAnswer: 1,
      explanation: "For TT systems, minimum main bonding is 2.5mm² if mechanically protected, or 4mm² if not. This is smaller than TN systems because TT systems use RCD protection, and the primary protection is through disconnection, not bonding."
    },
    {
      question: "If a metallic water pipe has 3m of plastic before entering a house, does it require main bonding?",
      options: ["Yes, always bond metallic services", "No, the plastic isolates it from earth", "Only if the pipe is accessible", "Only for bathrooms"],
      correctAnswer: 1,
      explanation: "If the plastic section completely isolates the internal metalwork from earth, bonding may not be required. However, best practice is often to bond anyway as future changes could reintroduce earth connection. Risk assessment should guide the decision."
    },
    {
      question: "Where should main bonding to gas be connected?",
      options: ["At the gas main in the street", "On the meter inlet connection", "Within 600mm of the meter on the consumer's side", "At the first gas appliance"],
      correctAnswer: 2,
      explanation: "Gas main bonding must be within 600mm of the meter AND on the consumer's side (outlet/downstream). This ensures the bonding is under the customer's control and protects all gas pipework within the building."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module3')}
            className="flex items-center text-elec-yellow touch-target"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Module 3</span>
          </button>
          <span className="text-xs text-white/50 font-medium">Section 3 of 6</span>
        </div>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-8">
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 mb-3">
            Module 3 • Continuity Testing
          </Badge>
          <h1 className="text-ios-title-large font-bold text-white mb-3">
            Main Bonding Conductor Testing
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Verify the critical connections that ensure metal services entering a building are at the same potential as the electrical earth, preventing dangerous touch voltages.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <section className="px-4 mb-8">
          <Card variant="ios-elevated" className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-elec-yellow" />
                In 30 Seconds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Bond metal services</strong> - gas, water, oil, structural steel within 600mm of entry
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Minimum 10mm² copper</strong> for TN supplies (6mm² absolute minimum)
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Very low resistance</strong> - typically {"<"}0.05Ω for short runs, always {"<"}0.5Ω
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Learning Outcomes */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 gap-3">
            {defined_learningOutcomes.map((outcome) => (
              <Card key={outcome.id} variant="ios" className="bg-white/5 border-white/10">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <outcome.icon className="w-4 h-4 text-elec-yellow" />
                  </div>
                  <span className="text-white/90 text-sm leading-relaxed">{outcome.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 01: What is Main Bonding? */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">What is Main Bonding?</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Main protective bonding connects extraneous-conductive-parts (metal services entering the building from outside) to the main earthing terminal (MET). This ensures all metal parts that could become energised are at the same electrical potential.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Why It's Critical</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <Zap className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Prevents Touch Voltage</p>
                      <p className="text-white/60 text-xs">If a fault energises metalwork, bonding ensures all metal rises together - no potential difference to touch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <Shield className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Equalises Potential</p>
                      <p className="text-white/60 text-xs">Creates equipotential zone - all bonded parts at same voltage relative to earth</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <Activity className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Assists Fault Clearance</p>
                      <p className="text-white/60 text-xs">Provides additional path for fault current, helping protective devices operate</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Extraneous-Conductive-Parts</h4>
                    <p className="text-white/80 text-sm">
                      These are conductive parts NOT part of the electrical installation but which could introduce a potential (usually earth potential) into the building. Examples: metal water pipes, gas pipes, structural steel, ducting connected to earth.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 02: Services Requiring Bonding */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Services Requiring Bonding</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Any metallic service that enters the building and could introduce earth potential requires main bonding. The key is whether the metal is or could be connected to the general mass of earth.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Services Requiring Main Bonding</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-blue-500/10 rounded-lg p-3">
                    <Droplets className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Metallic Water Pipes</p>
                      <p className="text-white/60 text-xs">Bond within 600mm of entry, before any branch connections</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-orange-500/10 rounded-lg p-3">
                    <Flame className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Metallic Gas Pipes</p>
                      <p className="text-white/60 text-xs">Bond within 600mm of meter, on consumer's side (outlet)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-yellow-500/10 rounded-lg p-3">
                    <Flame className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Metallic Oil Pipes</p>
                      <p className="text-white/60 text-xs">Bond near entry point, similar to water</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-500/10 rounded-lg p-3">
                    <Shield className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Structural Metalwork</p>
                      <p className="text-white/60 text-xs">Steel frames, beams in contact with earth</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-green-500/10 rounded-lg p-3">
                    <Activity className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Other Metal Services</p>
                      <p className="text-white/60 text-xs">Ducting, LPG pipes, central heating if entering from outside</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold mb-2">Services NOT Requiring Bonding</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Plastic water/gas pipes (non-conductive)</li>
                  <li>• Fibre optic cables (non-conductive)</li>
                  <li>• Metalwork completely isolated from earth by plastic sections</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">When in Doubt - Bond It</h4>
                    <p className="text-white/80 text-sm">
                      If you're uncertain whether a service needs bonding, it's safer to bond it. Bonding a service that doesn't strictly need it does no harm. Not bonding one that does need it is dangerous.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 1 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="Where should main bonding to a metallic gas pipe be connected?"
            correctAnswer="Within 600mm of the gas meter, on the consumer's side (outlet/downstream), NOT on the utility side"
            explanation="Gas bonding must be within 600mm of the meter AND on the consumer's side. This ensures the bonding is under the customer's control and protects all pipework within the property, while respecting the gas supplier's equipment."
          />
        </section>

        {/* Section 03: Bonding Conductor Sizes */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Bonding Conductor Sizes</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Main bonding conductor size depends on the earthing system type and the size of the earthing conductor. There are minimum sizes that apply regardless of calculation.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">TN Systems (TN-S and TN-C-S)</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-white/60 py-2">Earthing Conductor</th>
                        <th className="text-center text-elec-yellow py-2">Min. Main Bonding</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      <tr className="border-b border-white/5">
                        <td className="py-2">Up to 10mm²</td>
                        <td className="text-center py-2 text-elec-yellow">6mm²</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">16mm²</td>
                        <td className="text-center py-2 text-elec-yellow">10mm²</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">25mm²</td>
                        <td className="text-center py-2 text-elec-yellow">10mm²</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">35mm²</td>
                        <td className="text-center py-2 text-elec-yellow">16mm²</td>
                      </tr>
                      <tr>
                        <td className="py-2">50mm² and above</td>
                        <td className="text-center py-2 text-elec-yellow">25mm²</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/50 text-xs mt-2">Based on half the earthing conductor size, min 6mm², max 25mm²</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">TT Systems</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/10 rounded-lg p-3 text-center">
                    <p className="text-white/90 text-sm font-medium">With Protection</p>
                    <p className="text-green-400 text-xl font-bold">2.5mm²</p>
                    <p className="text-white/50 text-xs">If mechanically protected</p>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-3 text-center">
                    <p className="text-white/90 text-sm font-medium">Without Protection</p>
                    <p className="text-yellow-400 text-xl font-bold">4mm²</p>
                    <p className="text-white/50 text-xs">If not protected</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Standard Practice</h4>
                    <p className="text-white/80 text-sm">
                      Most domestic installations use 10mm² main bonding conductors as standard, regardless of the calculated minimum. This allows for future increases in supply size without needing to upgrade bonding.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 04: Testing Procedure */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Testing Procedure</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Main bonding continuity is tested with a low resistance ohmmeter from the main earthing terminal to each bonded service.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-4">Test Steps</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Isolate Supply (if testing at MET)</p>
                      <p className="text-white/60 text-xs">Or test from earth bar in CU if more accessible</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Null Test Leads</p>
                      <p className="text-white/60 text-xs">Zero the instrument with leads shorted</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Connect to MET/Earth Bar</p>
                      <p className="text-white/60 text-xs">One test lead to main earthing terminal or earth bar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Test to Each Bonded Service</p>
                      <p className="text-white/60 text-xs">Other lead to bonding clamp on each pipe/service</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Record Results</p>
                      <p className="text-white/60 text-xs">Should be very low (typically {"<"}0.05Ω)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Expected Readings</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between bg-green-500/10 rounded-lg p-3">
                    <span className="text-white/80 text-sm">Short bonding conductor (1-2m)</span>
                    <span className="text-green-400 font-medium">{"<"}0.05Ω</span>
                  </div>
                  <div className="flex items-center justify-between bg-green-500/10 rounded-lg p-3">
                    <span className="text-white/80 text-sm">Longer runs (up to 10m)</span>
                    <span className="text-green-400 font-medium">{"<"}0.2Ω</span>
                  </div>
                  <div className="flex items-center justify-between bg-amber-500/10 rounded-lg p-3">
                    <span className="text-white/80 text-sm">Any reading above 0.5Ω</span>
                    <span className="text-amber-400 font-medium">Investigate!</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 2 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="What minimum main bonding conductor size is required for a TN-C-S installation with a 16mm² earthing conductor?"
            correctAnswer="10mm² copper - based on half the earthing conductor size (8mm²), rounded up to the standard 10mm²"
            explanation="Main bonding should be at least half the earthing conductor CSA. Half of 16mm² is 8mm², but standard cable sizes are 6mm² or 10mm², so 10mm² is used. This is also the commonly recommended minimum for TN supplies."
          />
        </section>

        {/* Section 05: Connection Requirements */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Connection Requirements</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Main bonding connections must be made using approved methods and labelled correctly. Poor connections can result in high resistance or complete failure of the bonding.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">BS 951 Bonding Clamps</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Made of copper or brass (not steel which can corrode)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Correct size for the pipe diameter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Clean pipe surface before fitting (remove paint, corrosion)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Tight enough to maintain contact without crushing pipe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Accessible for inspection and testing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Required Labelling</h4>
                <div className="bg-elec-yellow text-black rounded-lg p-4 text-center">
                  <p className="font-bold text-sm">SAFETY ELECTRICAL CONNECTION</p>
                  <p className="font-bold text-sm">DO NOT REMOVE</p>
                </div>
                <p className="text-white/60 text-xs mt-2 text-center">
                  This label must be fitted at each main bonding connection point
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Not Acceptable</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Jubilee clips (can loosen, poor contact)</li>
                      <li>• Soldered connections (may melt in fire)</li>
                      <li>• Connections under paint or insulation</li>
                      <li>• Connections in inaccessible locations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 06: Recording and Certification */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Recording and Certification</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Main bonding test results are recorded on the Electrical Installation Certificate or Periodic Inspection Report, confirming the continuity of each bonding conductor.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Information to Record</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Service bonded:</strong> Water, Gas, Oil, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Conductor size:</strong> CSA of bonding conductor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Continuity reading:</strong> Measured resistance in ohms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Location:</strong> Where bonding connection is made</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Typical Certificate Entry</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-3 font-mono text-xs overflow-x-auto">
                  <table className="w-full text-white/80">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-1">Service</th>
                        <th className="text-center py-1">CSA</th>
                        <th className="text-center py-1">Continuity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-1">Water</td>
                        <td className="text-center py-1">10mm²</td>
                        <td className="text-center py-1 text-green-400">0.03Ω</td>
                      </tr>
                      <tr>
                        <td className="py-1">Gas</td>
                        <td className="text-center py-1">10mm²</td>
                        <td className="text-center py-1 text-green-400">0.04Ω</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Missing or Defective Bonding</h4>
                    <p className="text-white/80 text-sm">
                      If main bonding is missing or inadequate, this is a C1 (danger present) observation on a periodic report. The installation is unsafe until bonding is installed or corrected.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 3 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="What label must be fitted at main bonding connection points?"
            correctAnswer="'SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE'"
            explanation="This BS 7671 required label warns anyone working on pipework (plumbers, gas fitters) that the connection is for electrical safety and must not be removed. Removing it could leave the installation dangerous."
          />
        </section>

        {/* Practical Guidance */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Practical Guidance</h2>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <div className="bg-green-500/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Top Tips
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Check under insulation - pipes may be bonded but connection hidden</li>
                  <li>• Use a long wandering lead if MET is distant from services</li>
                  <li>• Clean pipe surface before testing for accurate reading</li>
                  <li>• Take photos of bonding connections for records</li>
                  <li>• Check plastic sections don't interrupt bonding requirements</li>
                </ul>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Common Faults Found
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Missing bonding to gas (very common on older installations)</li>
                  <li>• Bonding disconnected after plumbing work</li>
                  <li>• Undersized bonding conductor</li>
                  <li>• Corroded connections giving high resistance</li>
                  <li>• Bonding connected to wrong side of gas meter</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <Link2 className="w-5 h-5" />
                  Key References
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• <strong>BS 7671:</strong> Regulation 411.3.1.2 - Main bonding</li>
                  <li>• <strong>Table 54.8:</strong> Minimum bonding conductor sizes</li>
                  <li>• <strong>BS 951:</strong> Specification for bonding clamps</li>
                  <li>• <strong>Regulation 514.13:</strong> Safety label requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {defined_faqs.map((faq, index) => (
              <Card key={index} variant="ios" className="bg-white/5 border-white/10">
                <button
                  className="w-full p-4 text-left flex items-center justify-between touch-target"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-white/90 font-medium text-sm pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="px-4 mb-8">
          <UnitsPocketCard
            title="Main Bonding Quick Reference"
            items={[
              { term: "Purpose", definition: "Equalise potential of metal services with electrical earth" },
              { term: "Bond Water", definition: "Within 600mm of entry, before branches" },
              { term: "Bond Gas", definition: "Within 600mm of meter, consumer's side" },
              { term: "TN-S/TN-C-S Min", definition: "6mm² min, 10mm² typical, 50% of earthing conductor" },
              { term: "TT Minimum", definition: "2.5mm² protected, 4mm² unprotected" },
              { term: "Clamp Type", definition: "BS 951 bonding clamps" },
              { term: "Label Required", definition: "SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE" }
            ]}
          />
        </section>

        {/* Quiz */}
        <section className="px-4 mb-8">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="px-4 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="ios-secondary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module3/section2')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="ios-primary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module3/section4')}
            >
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule3Section3;
