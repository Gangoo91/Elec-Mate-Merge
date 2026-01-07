import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Battery Sizing & Autonomy | FA Module 4 Sec 2';
    document.title = title;
    const desc = 'Battery autonomy periods, sizing calculations, charger capacity, temperature effects and verification for BS 5839-1 fire alarm systems.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (canonical) canonical.href = window.location.href;

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Battery Sizing & Autonomy',
      description: desc,
      about: ['Autonomy', 'Battery sizing', 'Charger capacity', 'BS 5839-1'],
      author: { '@type': 'Organization', name: 'Training Module' }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const questions: QuizQuestion[] = useMemo(() => [
    { id: 1, question: 'Autonomy is the ability to:', options: ['Run with mains present', 'Operate for the required standby and alarm periods on battery', 'Charge faster', 'Increase loop addresses'], correctAnswer: 1, explanation: 'Autonomy covers standby plus alarm periods on battery to meet the design/standard.' },
    { id: 2, question: 'Battery sizing must consider:', options: ['Standby only', 'Alarm only', 'Standby + alarm and temperature/ageing factors', 'Only charger current'], correctAnswer: 2, explanation: 'Use total Ah for standby and alarm; apply derating for temperature and ageing per manufacturer guidance.' },
    { id: 3, question: 'Charger capacity should be:', options: ['Less than standby current', 'Sufficient to recharge within specified time while supporting load', 'Ignored', 'Equal to alarm current'], correctAnswer: 1, explanation: 'The charger must recharge batteries in the permitted time while supporting system loads.' },
    { id: 4, question: 'A common practice is to base autonomy on:', options: ['Design document and BS 5839-1 for site type', 'Installer preference only', 'Shortest practical time', 'Marketing leaflets'], correctAnswer: 0, explanation: 'The fire strategy and BS 5839-1 guidance determine required autonomy periods.' },
    { id: 5, question: 'Temperature affects capacity by:', options: ['Increasing at low temperature', 'No effect', 'Reducing effective Ah in colder environments', 'Only affecting charger'], correctAnswer: 2, explanation: 'Battery capacity reduces at lower temperatures; apply manufacturer derating.' },
    { id: 6, question: 'Ageing allowance is typically:', options: ['0%', 'Considered per manufacturer (e.g., +10–30%)', 'Always 100%', 'Ignored'], correctAnswer: 1, explanation: 'Allow for capacity loss over service life as specified by the manufacturer.' },
    { id: 7, question: 'For 24 h standby and 30 min alarm, you should:', options: ['Use alarm Ah only', 'Sum Ah for both periods and apply derating', 'Multiply currents by voltage', 'Ignore alarm period'], correctAnswer: 1, explanation: 'Compute Ah for both periods then add derating factor.' },
    { id: 8, question: 'Battery type selection (e.g., VRLA) must consider:', options: ['Colour', 'Ventilation and installation orientation per data sheet', 'Only price', 'Cable brand'], correctAnswer: 1, explanation: 'Follow manufacturer installation and ventilation requirements.' },
    { id: 9, question: 'Commissioning checks include:', options: ['Skipping tests', 'Verifying autonomy and charger voltage/current settings', 'Painting batteries', 'Only visual check'], correctAnswer: 1, explanation: 'Record measurements and confirm autonomy assumptions.' },
    { id: 10, question: 'BS 7671 requires battery circuits to be:', options: ['Unfused', 'Fused/Protected appropriately and wired to manufacturer recommendations', 'Shared with lighting', 'Using telephone cable'], correctAnswer: 1, explanation: 'Protect against faults and select suitable cables/terminations.' },
    { id: 11, question: 'What is the typical alarm duration used for battery sizing calculations?', options: ['5 minutes', '15 minutes', '30 minutes', '60 minutes'], correctAnswer: 2, explanation: 'BS 5839-1 typically requires 30 minutes of full alarm operation for battery capacity calculations, though specific requirements may vary.' },
    { id: 12, question: 'When calculating battery capacity for a system with 24h standby at 0.5A and 30min alarm at 2A, the minimum Ah before derating is:', options: ['1 Ah', '12 Ah', '13 Ah', '24 Ah'], correctAnswer: 2, explanation: 'Calculate: (0.5A × 24h) + (2A × 0.5h) = 12 + 1 = 13 Ah minimum before applying derating factors.' },
    { id: 13, question: 'VRLA batteries should be installed:', options: ['In any orientation', 'Upright as specified by manufacturer data', 'Always horizontal', 'Upside down for better performance'], correctAnswer: 1, explanation: 'Follow manufacturer installation requirements for orientation, ventilation and environmental conditions to ensure proper operation and service life.' },
    { id: 14, question: 'The typical recharge time specified for fire alarm batteries after discharge is:', options: ['6 hours', '12 hours', '24 hours', '48 hours'], correctAnswer: 2, explanation: 'BS 5839-1 typically requires batteries to be recharged to 80% capacity within 24 hours of restoration of mains supply.' },
    { id: 15, question: 'Battery replacement is typically recommended after:', options: ['1 year regardless of condition', '3-5 years or per manufacturer guidance', '10 years minimum', 'Never, batteries last forever'], correctAnswer: 1, explanation: 'VRLA batteries typically require replacement every 3-5 years, though this depends on manufacturer recommendations and actual capacity testing results.' }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

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
              <Battery className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Battery Sizing and Autonomy Periods</h1>
                <p className="text-lg text-gray-400">Calculations, derating and verification</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 4.2</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Backup Power</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>Battery capacity must sustain the system for the specified standby period followed by the alarm duration. Use manufacturer data, consider temperature and ageing, and confirm charger capability.</p>
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
                  <li>Calculate Ah requirements from current and time for standby and alarm.</li>
                  <li>Apply derating for temperature and ageing per manufacturer guidance.</li>
                  <li>Verify charger can recharge within the specified timeframe.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Sizing Method */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Sizing Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Steps</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Determine standby current (A) and duration (h). Compute Ah.</li>
                    <li>Determine alarm current (A) and duration (h). Compute Ah.</li>
                    <li>Sum Ah and apply derating (e.g. +25–50% per environment/ageing as required).</li>
                    <li>Select nearest standard battery capacity and confirm charger capability.</li>
                  </ol>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Worked Example</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <p>Standby 0.45 A for 24 h → 10.8 Ah. Alarm 1.95 A for 0.5 h → 0.98 Ah. Total ≈ 11.8 Ah. Apply +30% → ~15.3 Ah. Select 17 Ah pair (24 V systems often use 2×12 V in series) subject to manufacturer guidance.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights & Checks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Highlights & Checks</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Meet the specified autonomy from the design and BS 5839-1 guidance.</li>
                  <li>Verify battery type and venting; maintain correct fusing and cabling.</li>
                  <li>Record calculations in commissioning documentation.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

          {/* Deep Dive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Deep Dive: Derating & Charger Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Temperature derating: apply manufacturer curves; cold reduces capacity.</li>
                  <li>Ageing: plan for capacity loss; consider replacement intervals.</li>
                  <li>Charger: confirm voltage set‑points and recharge time under load.</li>
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
                  <li>Measure quiescent and alarm current; record against calculations.</li>
                  <li>Simulate mains fail; verify autonomy period and re‑charge behaviour.</li>
                  <li>Investigate chronic low battery faults: check charger, battery health and connections.</li>
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
                  <li>Can I oversize batteries? — Yes, if the charger can recharge in time and the enclosure allows.</li>
                  <li>What Ah to choose? — Next standard size above the derated calculation.</li>
                  <li>Do batteries need ventilation? — Follow manufacturer and BS 7671 guidance.</li>
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
                  <li>Ah (Ampere‑hours): Capacity measure equal to current × time.</li>
                  <li>VRLA: Valve Regulated Lead Acid battery type commonly used in panels.</li>
                  <li>Derating: Reducing calculated capacity to account for conditions/ageing.</li>
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
                <p>Sound battery sizing underpins resilience: calculate, derate appropriately and confirm recharge performance.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz questions={sequentialQuestions} title="Knowledge Check: Battery Sizing" />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-4-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-4-section-3">
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

export default FireAlarmModule4Section2;
