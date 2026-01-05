import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section5 = () => {
  // SEO
  useEffect(() => {
    const title = 'End-of-Line Devices & Loop Integrity | FA Module 4 Sec 5';
    document.title = title;
    const desc = 'EOL devices in conventional systems, addressable loop integrity, isolators, fault monitoring, testing and commissioning per BS 5839-1.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    if (meta) meta.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    if (canonical) canonical.href = window.location.href;
    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: 'End-of-Line Devices & Loop Integrity', description: desc, about: ['EOL', 'Loop integrity', 'Isolators', 'BS 5839-1'], author: { '@type': 'Organization', name: 'Training Module' } };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.text = JSON.stringify(ld); document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const questions: QuizQuestion[] = useMemo(() => [
    { id: 1, question: 'In conventional zones, EOL devices are used to:', options: ['Increase alarm volume', 'Provide line monitoring for open/short faults', 'Change detection type', 'Speed up loops'], correctAnswer: 1, explanation: 'EOL resistors/modules enable monitoring of wiring integrity.' },
    { id: 2, question: 'Addressable loops maintain integrity by:', options: ['Ignoring faults', 'Using loop topology with short‑circuit isolators', 'Only using star wiring', 'Relying on detectors alone'], correctAnswer: 1, explanation: 'Loops and isolators allow communication to continue around a fault.' },
    { id: 3, question: 'Short‑circuit isolators are typically placed:', options: ['Only at panel', 'At intervals per manufacturer guidance and near interfaces', 'Not used', 'Only at end devices'], correctAnswer: 1, explanation: 'Isolator spacing and placement are designed to limit fault impact.' },
    { id: 4, question: 'Testing EOL on a conventional zone involves:', options: ['Removing all detectors', 'Verifying correct EOL value and fault indications when open/short simulated', 'Changing panel firmware', 'Bypassing supervision'], correctAnswer: 1, explanation: 'Simulate faults to confirm correct monitoring and indication.' },
    { id: 5, question: 'Commissioning should record:', options: ['Nothing about EOL', 'Location/type of EOL or isolators and test results', 'Only battery data', 'Only device labels'], correctAnswer: 1, explanation: 'Document device addressing, isolator locations and test outcomes.' },
    { id: 6, question: 'A loop with an open circuit:', options: ['Always stops working', 'May continue via the opposite path depending on topology/isolators', 'Improves operation', 'Is ignored by panel'], correctAnswer: 1, explanation: 'Loop design allows communication via the other direction.' },
    { id: 7, question: 'When an isolator operates on a short:', options: ['The whole loop fails', 'The faulted section is isolated and the rest continues', 'Panel shuts down', 'Nothing happens'], correctAnswer: 1, explanation: 'Isolators confine the faulted segment.' },
    { id: 8, question: 'EOL value should match:', options: ['Any resistor you have', 'Manufacturer specified value/tolerance', '0 Ω', 'Only what the engineer prefers'], correctAnswer: 1, explanation: 'Panel supervision relies on correct EOL value.' },
    { id: 9, question: 'Documentation must include:', options: ['Isolator map and device addresses', 'Only cable colours', 'Lunch menu', 'Nothing'], correctAnswer: 0, explanation: 'Keep a clear record for maintenance and troubleshooting.' },
    { id: 10, question: 'Fault‑finding a loop short starts with:', options: ['Randomly replacing devices', 'Segmenting with isolators and observing indications', 'Resetting repeatedly', 'Ignoring isolation'], correctAnswer: 1, explanation: 'Use isolators and panel diagnostics to narrow the location.' }
  ], []);

  const sequentialQuestions = useMemo(() => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })), [questions]);

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <Link2 className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">End‑of‑Line Devices and Loop Integrity</h1>
                <p className="text-lg text-gray-400">Monitoring, isolators and testing</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 4.5</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Monitoring</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>Conventional zones use EOL devices for line supervision, while addressable systems rely on loop topology and short‑circuit isolators. Proper design localises faults and maintains operation.</p>
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
                  <li>Explain EOL purpose and values in conventional systems.</li>
                  <li>Plan isolator spacing and placement on addressable loops.</li>
                  <li>Test for open/short and document results during commissioning.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* EOL & Loop Integrity */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">EOL & Loop Integrity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Conventional Zones</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use manufacturer‑specified EOL resistor/module at the circuit end.</li>
                    <li>Panel supervises for opens/shorts; indicates faults at the CIE.</li>
                    <li>Do not locate EOL in the panel unless specifically required by design.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Addressable Loops</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Design loops with isolators at intervals and near interfaces to confine faults.</li>
                    <li>Panel can communicate around a single short when isolators open.</li>
                    <li>Maintain correct device addressing and loop loading per manufacturer limits.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing & Commissioning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Testing & Commissioning</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Verify EOL value and simulate open/short faults to confirm indications.</li>
                  <li>Prove isolator operation by introducing controlled faults where safe.</li>
                  <li>Record isolator locations, EOL types and test outcomes in commissioning documents.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Deep Dive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Deep Dive: EOL Strategies & Loop Isolator Design</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Conventional: resistor/module at the end of each zone, accessible and identified.</li>
                  <li>Addressable: plan isolator spacing to confine likely fault lengths.</li>
                  <li>Loop loading: observe device count, cable length and volt drop limits.</li>
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
                  <li>Simulate opens/shorts; observe panel indication and isolator response.</li>
                  <li>Use device/isolator maps to narrow faults; check terminations and moisture ingress.</li>
                  <li>Record results and update loop drawings for the O&M manual.</li>
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
                  <li>Can I hide the EOL in the panel? — Only if the design requires and supervision remains effective.</li>
                  <li>How many isolators? — Follow manufacturer spacing and risk; place near interfaces.</li>
                  <li>Do I need an EOL on addressable loops? — No; loops use supervised communications and isolators.</li>
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
                  <li>EOL: End‑of‑Line device used for supervision in conventional systems.</li>
                  <li>Isolator: Device that opens on fault to protect the rest of the loop.</li>
                  <li>Loop integrity: Ability to maintain communications despite a single fault.</li>
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
                <p>Robust supervision using EOL devices and isolators maintains system integrity and supports fault localisation in line with BS 5839‑1.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz questions={sequentialQuestions} title="Knowledge Check: EOL & Loop Integrity" />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-4-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Module Overview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule4Section5;
