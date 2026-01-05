import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule3Section5 = () => {
  // SEO
  useEffect(() => {
    const title = 'Cause & Effect Programming (BS 5839) | Module 3 Sec 5';
    document.title = title;
    const desc = 'Cause/effect logic: alert/evacuate, delays, coincidence, interfaces (HVAC, lifts, doors), testing, documentation and pitfalls for BS 5839-1.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (canonical) canonical.href = window.location.href;

    // Structured data (Article)
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Cause & Effect Programming (BS 5839)',
      description: desc,
      about: ['Fire alarm cause and effect', 'BS 5839-1', 'Delays', 'Coincidence', 'Interfaces'],
      author: { '@type': 'Organization', name: 'Training Module' }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Quiz
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'An investigation delay (where permitted) is used to:',
      options: ['Speed up evacuation', 'Allow brief checking before full evacuation', 'Silence faults', 'Reduce detector sensitivity'],
      correctAnswer: 1,
      explanation: 'An investigation delay can allow staff to check the source before full evacuation, where the fire strategy permits.'
    },
    {
      id: 2,
      question: 'Coincidence (double knock) typically means:',
      options: ['Any single device triggers evacuation', 'Two independent triggers are required to progress actions', 'No alarm is raised', 'Only manual call points operate'],
      correctAnswer: 1,
      explanation: 'Two separate inputs may be required to trigger specific outputs, subject to the agreed strategy and risk profile.'
    },
    {
      id: 3,
      question: 'Which of the following is a common interface action?',
      options: ['Start HVAC fans on fire', 'Release electromagnetic door hold‑opens', 'Disable all lighting', 'Start lifts to top floor with doors open'],
      correctAnswer: 1,
      explanation: 'Door hold‑opens are typically released; lift homing, HVAC shutdown and smoke control are also common interfaces.'
    },
    {
      id: 4,
      question: 'Alert/Evacuate in phased evacuation usually means:',
      options: ['Same tone everywhere', 'Different tones/messages for standby vs leave phases', 'No message at all', 'Only strobes are used'],
      correctAnswer: 1,
      explanation: 'A distinct alert signal prepares adjacent areas while evacuation signal instructs to leave.'
    },
    {
      id: 5,
      question: 'Cause and effect should be documented as:',
      options: ['A verbal description only', 'A formal matrix with inputs, logic and outputs', 'Hidden in panel code', 'Left to the installer’s memory'],
      correctAnswer: 1,
      explanation: 'Clear matrices and schedules are essential for commissioning, testing and maintenance.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Cause and Effect Programming Basics</h1>
                <p className="text-lg text-gray-400">Programming cause and effect relationships in fire alarm systems</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 3.5</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">C&amp;E Programming</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>Cause and effect (C&amp;E) defines how system inputs produce outputs, including alert/evacuate signalling, delays, coincidences and interfaces with other building systems. Robust, documented C&amp;E enables safe and predictable responses aligned with the fire strategy.</p>
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
                  <li>Explain alert/evacuate signalling and phased strategies.</li>
                  <li>Configure investigation delays and coincidence where permitted.</li>
                  <li>Integrate interfaces: lifts, doors, smoke control, HVAC, plant shutdown.</li>
                  <li>Produce clear C&amp;E matrices and test/maintenance procedures.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Programming Concepts */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Programming Concepts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Signals & Phasing</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Distinct tones/messages: <span className="font-semibold">Alert</span> (standby) and <span className="font-semibold">Evacuate</span> (leave now).</li>
                    <li>Phased evacuation by floor/zone to avoid congestion and protect stair cores.</li>
                    <li>Class change and test modes must be clearly distinguishable from alarms.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Delays & Coincidence</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Investigation delays may be used where allowed by the fire strategy; keep periods short and indicated at the CIE.</li>
                    <li>Coincidence (double knock) can reduce unwanted evacuations in complex spaces; ensure independence of triggers.</li>
                    <li>Manual call points often override delays to trigger immediate evacuation.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Interfaces & Interlocks</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Door hold‑open release, access control fail‑safe, and fire curtain deployment.</li>
                    <li>Lift homing/recall and shutdown of non‑essential plant.</li>
                    <li>HVAC shutdown/smoke control, AOVs and pressurisation control as designed.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 5839‑1 Highlights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Document C&amp;E in a clear <span className="font-semibold">matrix</span> with inputs, logic and outputs.</li>
                  <li>Ensure interfaces are fail‑safe and monitored; avoid single points of failure.</li>
                  <li>Provide explicit test procedures and commissioning evidence.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Common Mistakes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Unclear or undocumented logic leading to unsafe behaviours.</li>
                  <li>Overuse of long delays or complex coincidences without justification.</li>
                  <li>Poorly monitored interfaces causing silent failures.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Design & Documentation Workflow */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Design & Documentation Workflow</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Confirm fire strategy, evacuation method (phased/all‑out) and management capabilities.</li>
                  <li>Define zones, alarm areas and required interfaces (doors, lifts, HVAC, AOVs, plant).</li>
                  <li>Agree any <span className="font-semibold">investigation delays</span> and <span className="font-semibold">coincidence</span> with stakeholders; ensure MCPs override delays.</li>
                  <li>Draft the C&amp;E <span className="font-semibold">matrix</span> (inputs → logic → outputs) with clear identifiers.</li>
                  <li>Validate fail‑safe behaviour, input/output monitoring and loss‑of‑power responses.</li>
                  <li>Commission against the matrix; record results and as‑fitted variations.</li>
                  <li>Produce maintenance/test procedures and train responsible persons.</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Worked Example */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Worked Example: Small Office (Two Floors)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <h3 className="text-yellow-400 font-semibold mb-2">Inputs</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>MCPS: GF‑MCP‑01..03, 1F‑MCP‑01..02 (immediate evacuate).</li>
                  <li>Detectors: GF‑SD‑01..04 (open plan), 1F‑SD‑01..03, Comms‑HD‑01.</li>
                </ul>
              </div>
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <h3 className="text-yellow-400 font-semibold mb-2">Logic</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>MCP or heat detector → immediate <span className="font-semibold">Evacuate</span> both floors.</li>
                  <li>Single smoke detector in open plan → 120 s <span className="font-semibold">investigation delay</span> (indicated at CIE). Second alarm during delay → immediate evacuate.</li>
                  <li>Coincidence in comms room (smoke + heat) before releasing gas suppression.</li>
                </ul>
              </div>
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <h3 className="text-yellow-400 font-semibold mb-2">Outputs</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Sounders/VADs: Alert on adjacent floor for 60 s, then Evacuate both floors.</li>
                  <li>Release door hold‑opens and fail‑safe access control on both floors.</li>
                  <li>Lift recall to ground and disable calls; HVAC shutdown; close fire/smoke dampers as designed.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Testing & Maintenance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Testing & Maintenance Procedures</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">Weekly</span>: Operate at least one MCP; confirm correct alert/evacuate signalling and output actions.</li>
                  <li><span className="font-semibold">Quarterly</span>: Test a proportion of devices; verify delays/coincidence and interface monitoring.</li>
                  <li><span className="font-semibold">Annually</span>: 100% device test; confirm fail‑safe behaviour on power loss and interface faults; update C&amp;E matrix if altered.</li>
                  <li>Record all results; ensure site staff understand investigation delay indications and overrides.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Commissioning Checklist */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commissioning Checklist</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-2">
                  <li>All inputs/outputs labelled to drawings; addresses match matrix.</li>
                  <li>Delays, coincidence and MCP overrides demonstrated and recorded.</li>
                  <li>Interfaces fail‑safe and monitored; simulate open‑circuit/short faults.</li>
                  <li>Distinct alert vs evacuate audibles/messages verified across areas.</li>
                  <li>Documentation: as‑fitted drawings, C&amp;E matrix, test schedules, user guidance.</li>
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
                <p>Well‑designed, documented C&amp;E aligns with the fire strategy, integrates building systems safely, and supports clear testing and maintenance.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Cause & Effect Programming"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-3-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-3-section-6">
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

export default FireAlarmModule3Section5;
