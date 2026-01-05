import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule3Section6 = () => {
  // SEO
  useEffect(() => {
    const title = 'Drawings & Fire Strategy Alignment | Module 3 Sec 6';
    document.title = title;
    const desc = 'Documentation for BS 5839-1: zone plans, device layouts, C&E matrix, cable routing, commissioning and O&M for handover and maintenance.';
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
      headline: 'Drawings & Fire Strategy Alignment',
      description: desc,
      about: ['BS 5839-1', 'Zone plans', 'Cause and effect', 'Commissioning documentation'],
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
      question: 'What must be provided at the CIE to aid responders?',
      options: ['Only a device list', 'A clear zone plan with orientation and “You are here”', 'Manufacturer brochure', 'Nothing is required'],
      correctAnswer: 1,
      explanation: 'A legible, oriented zone plan with boundaries and key features must be displayed at the CIE.'
    },
    {
      id: 2,
      question: 'A cause and effect matrix should record:',
      options: ['Panel serial numbers only', 'Inputs, logic (delays/coincidence) and outputs', 'Weekly test dates only', 'Cable drum numbers'],
      correctAnswer: 1,
      explanation: 'Matrices capture how inputs produce outputs including delays and interface actions.'
    },
    {
      id: 3,
      question: 'As‑built documentation typically includes:',
      options: ['Sketches on site only', 'Final device layouts, cable routes, and zone boundaries', 'Only a quotation', 'No drawings after commissioning'],
      correctAnswer: 1,
      explanation: 'As‑built records show the completed installation for operations and future changes.'
    },
    {
      id: 4,
      question: 'The logbook should include:',
      options: ['Nothing after handover', 'Routine testing, maintenance, false alarms and variations', 'Only fire brigade attendance notes', 'Marketing materials'],
      correctAnswer: 1,
      explanation: 'Accurate records enable compliance and trend analysis (e.g., false alarm management).'
    },
    {
      id: 5,
      question: 'Cable routing should consider:',
      options: ['Aesthetics only', 'Segregation, protection, and fire survivability where required', 'Shortest path only', 'Installer preference only'],
      correctAnswer: 1,
      explanation: 'Segregation and protection help reduce faults/interference; some circuits may require enhanced survivability.'
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
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Planning Drawings and Fire Strategy Alignment</h1>
                <p className="text-lg text-gray-400">Documentation requirements and fire strategy integration</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 3.6</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Documentation</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>Good documentation ensures the system is installed, commissioned and maintained in line with the fire strategy. It also enables efficient fault‑finding, change control and effective emergency response.</p>
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
                  <li>Prepare zone plans, device layouts and cable routing drawings.</li>
                  <li>Produce a complete cause &amp; effect matrix and interface schedules.</li>
                  <li>Compile commissioning records, certificates and O&amp;M manuals.</li>
                  <li>Maintain logbooks and manage variations with revision control.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Documentation Sets */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Core Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Zone Plans & Layouts</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Zone plans at the CIE: show boundaries, “You are here”, orientation and key features.</li>
                    <li>Device layout drawings: accurate detector, MCP, sounder/VAD and interface locations.</li>
                    <li>Cable routing: segregation, protection and any enhanced survivability requirements.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Cause & Effect and Interfaces</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Formal C&amp;E matrix: inputs, logic (delays/coincidence) and outputs.</li>
                    <li>Interface schedules: doors, lifts, HVAC/smoke control, generators and plant.</li>
                    <li>Test procedures for each interface with witness records.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Commissioning & Handover</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Certificates, inspection/test results, device address lists and loop loading.</li>
                    <li>O&amp;M manual: system description, settings, spare parts, maintenance schedule.</li>
                    <li>Training and emergency procedures aligned with the fire strategy.</li>
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
                  <li>Display a legible, up‑to‑date zone plan at the CIE with orientation.</li>
                  <li>Maintain a site <span className="font-semibold">logbook</span> for tests, maintenance, faults and false alarms.</li>
                  <li>Record and justify <span className="font-semibold">variations</span> from the standard; keep revision control.</li>
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
                  <li>Missing or outdated zone plans at the CIE.</li>
                  <li>No formal C&amp;E matrix leading to ambiguous behaviour.</li>
                  <li>Insufficient as‑built records, hampering maintenance and upgrades.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Extended Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Design & Handover Workflow</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Agree the fire strategy and evacuation method with stakeholders.</li>
                  <li>Develop zone plans and device layouts; review access/egress and refuges.</li>
                  <li>Draft and validate the C&amp;E matrix; define all interfaces with test steps.</li>
                  <li>Commission with witnessed tests; record evidence against the matrix.</li>
                  <li>Compile O&amp;M, certificates and logbook; provide training and emergency procedures.</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Worked Example: Mixed‑Use Building</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <h3 className="text-yellow-400 font-semibold mb-2">Scope</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Retail GF, Apartments L1‑L6, Basement car park with ventilation control.</li>
                  <li>Phased evacuation for residential; all‑out for retail.</li>
                </ul>
              </div>
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <h3 className="text-yellow-400 font-semibold mb-2">Key Documents</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Zone plans by level with “You are here”.</li>
                  <li>C&amp;E matrix: MCP → immediate evacuate; detectors with managed delays where permitted; car park CO/NO₂ interfaces to fans and AOVs.</li>
                  <li>Interface test scripts and witness records for lifts, doors, HVAC, smoke control.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commissioning Checklist</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Zone plan displayed at CIE and matches installed zoning.</li>
                  <li>100% device addressing verified; cause/effect actions demonstrated.</li>
                  <li>Interfaces fail‑safe and monitored; simulate fault conditions.</li>
                  <li>Certificates complete; O&amp;M delivered; user training recorded.</li>
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
                <p>Comprehensive drawings, C&amp;E documentation and a maintained logbook ensure the system remains aligned with the fire strategy throughout its life.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Documentation & Strategy"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-3-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule3Section6;
