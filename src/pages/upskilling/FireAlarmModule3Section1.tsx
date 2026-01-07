import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule3Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Zone Planning & Fire Compartments | Module 3 Sec 1';
    document.title = title;
    const desc = 'BS 5839-1 zone planning principles: align with fire compartments, zone size/search limits, zone plans, vertical shafts, and common pitfalls.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  // Quiz
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is a common maximum area for a detection zone?',
      options: ['500 m²', '1000 m²', '2000 m²', 'No limit'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 typically limits a zone to about 2000 m² to support quick location of alarms.'
    },
    {
      id: 2,
      question: 'Why align zones with fire compartments?',
      options: ['For decoration', 'To simplify cabling', 'To aid firefighting and evacuation by matching building fabric', 'To reduce device count'],
      correctAnswer: 2,
      explanation: 'Zones that follow fire compartments make it faster to understand spread and respond safely.'
    },
    {
      id: 3,
      question: 'What is the typical maximum initial search distance within a zone?',
      options: ['10 m', '20 m', '30 m', '60 m'],
      correctAnswer: 2,
      explanation: 'Limiting search distance to about 30 m helps responders find the alarm source quickly.'
    },
    {
      id: 4,
      question: 'How should vertical shafts (stair/lift) be zoned?',
      options: ['As part of adjacent rooms', 'As a distinct zone per vertical shaft', 'Combine all shafts and floors into one zone', 'Never zoned'],
      correctAnswer: 1,
      explanation: 'Stair/lift shafts are typically separate zones to reflect vertical risk and aid response.'
    },
    {
      id: 5,
      question: 'What must be provided at the CIE relating to zones?',
      options: ['A random sketch', 'No drawing is needed', 'A clear zone plan with "You are here", orientation and boundaries', 'Only a device list'],
      correctAnswer: 2,
      explanation: 'Provide a legible, oriented zone plan located at the control and indicating equipment.'
    },
    {
      id: 6,
      question: 'What is the minimum general recommendation for zones per storey?',
      options: ['No zoning required', 'At least one zone per floor', 'Multiple storeys can share one zone', 'Only ground floor needs zones'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 generally recommends at least one zone per storey as a minimum, with large floors subdivided further.'
    },
    {
      id: 7,
      question: 'Why should plant rooms typically be separate zones?',
      options: ['To save money', 'They are low risk areas', 'To enable quick identification of high-risk areas requiring immediate attention', 'Plant rooms don\'t need detection'],
      correctAnswer: 2,
      explanation: 'Plant rooms often contain high-risk equipment and warrant separate zoning for rapid response and clear indication.'
    },
    {
      id: 8,
      question: 'What should happen to zone plans after building alterations?',
      options: ['Leave them unchanged', 'Update them and record changes in the logbook', 'Remove them entirely', 'Only update every 5 years'],
      correctAnswer: 1,
      explanation: 'Zone plans must be kept up to date after alterations, with changes recorded in the system logbook for compliance and safety.'
    },
    {
      id: 9,
      question: 'How should zone identification labels be chosen?',
      options: ['Random numbers', 'Cryptic codes only the installer knows', 'Clear names matching drawings and signage (e.g., Floor 03 – East Office)', 'Leave them as factory defaults'],
      correctAnswer: 2,
      explanation: 'Zone labels must be clear and consistent across panel displays, drawings, and site signage so responders instantly understand locations.'
    },
    {
      id: 10,
      question: 'What is a key problem with zones that cross fire compartment boundaries?',
      options: ['It saves cable runs', 'It confuses responders and undermines compartmentation strategy', 'It increases device count', 'It improves aesthetics'],
      correctAnswer: 1,
      explanation: 'Zones crossing compartment boundaries create confusion about fire location and undermine the building\'s fire containment strategy.'
    },
    {
      id: 11,
      question: 'How should ceiling voids typically be zoned?',
      options: ['Never zone voids', 'Zone where protected or where significant risk/cabling exists', 'Always combine with room below', 'Use one zone for entire building voids'],
      correctAnswer: 1,
      explanation: 'Ceiling voids should be zoned where they are protected spaces or contain significant fire risk or cabling, ensuring indications make sense to responders.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              <Map className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Zone Planning Principles and Fire Compartments</h1>
                <p className="text-lg text-gray-400">Zone layout design and fire compartment considerations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 3.1</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Zone Planning</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Zones translate building layout into clear indications for responders. Aligning zones with fire compartments and limiting size/search distances ensures alarms can be located and investigated rapidly and safely.</p>
            </CardContent>
          </Card>

          {/* Learning Objectives (neutral) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Align detection zones with fire compartments and building boundaries.</li>
                  <li>Apply typical limits for zone size and search distance.</li>
                  <li>Plan vertical zoning for stairs, lifts and shafts.</li>
                  <li>Prepare compliant, legible zone plans at the CIE.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* BS 5839-1 Key Limits (subtle accent) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 5839‑1 Key Limits</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Zone area: commonly not more than <span className="font-semibold">2000 m²</span>.</li>
                  <li>Storeys: generally <span className="font-semibold">one zone per floor</span> as a minimum; subdivide large floors.</li>
                  <li>Search distance: aim for ≤ <span className="font-semibold">30 m</span> within a zone to locate the fire source.</li>
                  <li>Vertical circulation (stairs/lifts/shafts): treat as <span className="font-semibold">separate zones</span>.</li>
                  <li>Voids/ceilings: zone where protected or significant; ensure indication makes sense to responders.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

          {/* Principles & Compartment Alignment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Principles & Compartment Alignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Fire Compartments</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Follow compartment lines and structural boundaries; avoid zones straddling compartments.</li>
                    <li>Provide distinct zones for protected escape routes and stair cores.</li>
                    <li>Reflect progressive/defend‑in‑place strategies (e.g., healthcare) with appropriately sized zones.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Zone Sizing & Layout</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Subdivide large open floors to maintain 30 m search distance and manageable indications.</li>
                    <li>Keep plant rooms and high‑risk rooms as separate zones where appropriate.</li>
                    <li>Coordinate zone boundaries with cause‑and‑effect (e.g., phased evacuation by floor).</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Zone Identification</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use clear names and numbers (e.g., Floor 03 – East Office – Zone 3E).</li>
                    <li>Ensure panel LEDs/text match drawings and on‑site signage.</li>
                    <li>Avoid cryptic labels; responders must instantly understand locations.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Plan Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Zone Plan Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Display at the CIE; show <span className="font-semibold">“You are here”</span>, orientation (north), and floor levels.</li>
                  <li>Depict zone boundaries clearly; include legends for symbols and colours.</li>
                  <li>Reference room names/numbers and key facilities (stairs, lifts, risers, plant rooms).</li>
                  <li>Keep plans up to date after alterations; record in the logbook.</li>
                </ul>
              </div>
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
                  <li>Zones that cross fire compartment boundaries without clear rationale.</li>
                  <li>Excessive zone size leading to long search distances and confusion.</li>
                  <li>Missing or outdated zone plans at the CIE.</li>
                  <li>Inconsistent zone labels between panel, drawings and signage.</li>
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
                <p>Plan zones to mirror fire compartments, limit size and search distances, and provide clear indications with accurate zone plans—enabling fast, safe response.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Zone Planning"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Module 3 Overview
              </Button>
            </Link>
            <Link to="../fire-alarm-module-3-section-2">
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

export default FireAlarmModule3Section1;