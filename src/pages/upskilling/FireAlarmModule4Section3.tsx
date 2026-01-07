import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Cable Types & Applications | FA Module 4 Sec 3';
    document.title = title;
    const desc = 'Fire-resisting cable types (e.g., FP200, MICC), enhanced vs standard, LSZH, terminations and application guidance for BS 5839-1.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    if (meta) meta.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    if (canonical) canonical.href = window.location.href;
    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Cable Types & Applications', description: desc, about: ['FP200', 'MICC', 'Enhanced cable', 'BS 5839-1'], author: { '@type': 'Organization', name: 'Training Module' } };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.text = JSON.stringify(ld); document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const questions: QuizQuestion[] = useMemo(() => [
    { id: 1, question: 'Enhanced fire-resisting cable is typically used for:', options: ['Any LV distribution', 'Circuits required to operate for longer in fire conditions', 'Decorative effect', 'Short temporary wiring'], correctAnswer: 1, explanation: 'Where circuits must remain operational for a defined period, enhanced performance cable may be required.' },
    { id: 2, question: 'MICC cables provide:', options: ['Poor fire resistance', 'Excellent fire survivability with correct termination', 'Only data transmission', 'No mechanical strength'], correctAnswer: 1, explanation: 'Mineral insulated copper cable (MICC) offers high fire resistance when properly installed and terminated.' },
    { id: 3, question: 'LSZH means:', options: ['Low Smoke Zero Halogen', 'Lightweight Strong Zinc Housing', 'Low Static Zero Humidity', 'Long Service Zero Heat'], correctAnswer: 0, explanation: 'Low Smoke Zero Halogen materials reduce toxic smoke in a fire.' },
    { id: 4, question: 'Bend radius should be:', options: ['Ignored', 'Per manufacturer data to avoid damage', 'As tight as possible', 'Only a visual estimate'], correctAnswer: 1, explanation: 'Follow manufacturer limits to maintain cable integrity.' },
    { id: 5, question: 'Joints and terminations should be:', options: ['Unenclosed', 'To manufacturer system with fire-resisting accessories', 'Any chocolate block', 'Non-insulated twists'], correctAnswer: 1, explanation: 'Use compatible glands/terminations and enclosures suited to fire-resisting performance.' },
    { id: 6, question: 'Screening or containment helps when:', options: ['There is EMC concern near power cables', 'Only to look neat', 'Never', 'To reduce cost'], correctAnswer: 0, explanation: 'Use screened cables or metallic containment to mitigate EMC issues.' },
    { id: 7, question: 'Cables should be fixed with:', options: ['Plastic clips only', 'Non‑combustible fixings that resist premature collapse', 'Blu‑tack', 'Zip ties only'], correctAnswer: 1, explanation: 'Comply with BS 7671 Reg 521.10.202 for supports and fixings.' },
    { id: 8, question: 'Termination kits for MICC must:', options: ['Be improvised', 'Match the cable system and be installed per instructions', 'Be any brass gland', 'Use PTFE tape only'], correctAnswer: 1, explanation: 'Use manufacturer‑approved components and methods.' },
    { id: 9, question: 'Cable selection for sounder/VAD circuits should consider:', options: ['Device current and volt drop limits', 'Sticker colour', 'Panel paint', 'None'], correctAnswer: 0, explanation: 'Current and volt drop drive size/type selection per manufacturer limits.' },
    { id: 10, question: 'Enhanced cable is often required for:', options: ['Circuits supporting evacuation/critical control', 'Decorative lighting', 'Temporary tools', 'Spare cores'], correctAnswer: 0, explanation: 'Critical functions may need enhanced survivability.' },
    { id: 11, question: 'FP200 Gold cable provides fire survivability for:', options: ['30 minutes at 650°C', '120 minutes at 842°C', '60 minutes at 550°C', '15 minutes at 400°C'], correctAnswer: 1, explanation: 'FP200 Gold is an enhanced fire-resisting cable tested to maintain circuit integrity for 120 minutes at 842°C per BS 8491.' },
    { id: 12, question: 'The main advantage of using screened cable for detector loops is:', options: ['Lower cost', 'Reduced electromagnetic interference pickup', 'Easier to strip', 'Better fire resistance'], correctAnswer: 1, explanation: 'Screened cables with properly earthed screens reduce EMC susceptibility, important near sources of electrical noise.' },
    { id: 13, question: 'When terminating MICC cable, moisture ingress is prevented by:', options: ['Leaving the end open', 'Using proper sealing glands with compound or sleeves', 'Wrapping in electrical tape', 'Painting the end'], correctAnswer: 1, explanation: 'MICC terminations require proper sealing glands and moisture-excluding compound to prevent magnesium oxide insulation degradation.' },
    { id: 14, question: 'Standard fire-resisting cable for fire alarms should meet at least:', options: ['No specific standard', 'BS EN 50200 PH classification (IEC 60331)', 'Domestic cable standards only', 'CAT5e data cable standards'], correctAnswer: 1, explanation: 'Standard performance fire alarm cables should meet BS EN 50200 (formerly IEC 60331) for circuit integrity under fire conditions.' },
    { id: 15, question: 'Cable cores should be identified at terminations using:', options: ['Memory only', 'Permanent identification per BS 7671 and manufacturer requirements', 'Pencil markings', 'Coloured tape that can fall off'], correctAnswer: 1, explanation: 'Proper permanent identification of cores aids installation, testing, maintenance and troubleshooting throughout system life.' }
  ], []);

  const sequentialQuestions = useMemo(() => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })), [questions]);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-4">
          <Button variant="ghost" className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>

        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Cable className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Cable Types (FP200, MICC, etc.) and Their Use</h1>
                <p className="text-lg text-gray-400">Selection, terminations and application</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 4.3</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Cable Selection</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>Fire alarm systems use fire‑resisting cables for critical circuits. Choice depends on circuit function, survivability requirements and installation environment, following BS 5839‑1 and manufacturer data.</p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Differentiate standard vs enhanced fire‑resisting cables.</li>
                  <li>Apply LSZH requirements and termination practices.</li>
                  <li>Select suitable cable for loops, sounders/VADs and interfaces.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cable Types */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Cable Types & Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Standard vs Enhanced</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Standard performance for general circuits not required to operate for extended periods in fire.</li>
                    <li>Enhanced performance for circuits essential to life safety for longer durations.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">MICC & FP‑type</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>MICC: excellent fire survivability; requires correct glands and moisture protection.</li>
                    <li>FP‑type: easier installation; select verified fire‑resisting variants.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terminations & Joints */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Terminations & Joints</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use compatible glands, joints and enclosures certified for the cable type.</li>
                  <li>Observe bend radius and avoid damage to insulation and screens.</li>
                  <li>Maintain segregation and sheath integrity at entries and penetrations.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Deep Dive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Deep Dive: Selection & Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Select cable by circuit function, survivability period and environment.</li>
                  <li>Use matching glands/kits for MICC and maintain moisture seals.</li>
                  <li>Observe bend radius; damage can compromise fire performance.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Commissioning & Fault‑finding */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commissioning & Fault‑finding</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Inspect terminations and enclosures; verify compatibility and torque.</li>
                  <li>Measure loop/sounder volt drop against manufacturer min operating voltage.</li>
                  <li>Trace earth/screen continuity and segregation at entries.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">FAQs</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Do I always need enhanced cable? — Only where the design requires extended survivability.</li>
                  <li>Is MICC better than FP‑type? — Depends on environment, cost and skills; both can meet requirements.</li>
                  <li>What about LSZH? — Use where reduced toxic smoke is required by the specification.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Glossary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Glossary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>LSZH: Low Smoke Zero Halogen jacket material.</li>
                  <li>MICC: Mineral Insulated Copper Cable.</li>
                  <li>Enhanced cable: Verified to operate for longer under fire conditions.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="green" variant="subtle">
                <p>Choose cable types according to survivability needs, install with proper accessories, and follow manufacturer data and BS 5839‑1.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz questions={sequentialQuestions} title="Knowledge Check: Cable Types" />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-4-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-4-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule4Section3;
