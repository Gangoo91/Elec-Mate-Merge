import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule3Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Accessibility & Escape Routes (BS 5839) | Module 3 Sec 4';
    document.title = title;
    const desc = 'Design for accessibility and protected escape routes: VADs, audibility, refuges, phased evacuation, and key BS 5839-1 considerations.';
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
      question: 'When are visual alarm devices (VADs) typically required?',
      options: ['Never in escape routes', 'Only in bedrooms', 'Where audibility is inadequate or for accessibility needs', 'Only at the CIE'],
      correctAnswer: 2,
      explanation: 'VADs support occupants in noisy spaces and those with hearing impairments; select EN 54‑23 category and ensure line‑of‑sight.'
    },
    {
      id: 2,
      question: 'What is a common audibility aim for escape routes?',
      options: ['45 dB(A)', '65 dB(A) or 5 dB above ambient', '85 dB(A) everywhere', 'No specific aim'],
      correctAnswer: 1,
      explanation: 'General aim is 65 dB(A) or 5 dB above ambient—whichever is greater. Sleeping risks often require 75 dB(A) at bedhead.'
    },
    {
      id: 3,
      question: 'Refuge areas should typically include:',
      options: ['No devices to avoid noise', 'Enhanced detection and clear visual/voice warning with EVC as required', 'Only signage', 'Only manual call points'],
      correctAnswer: 1,
      explanation: 'Refuges need reliable warning and communication. Coordinate with EVC, signage and evacuation plans.'
    },
    {
      id: 4,
      question: 'Voice alarm systems should prioritise:',
      options: ['Maximum loudness', 'Intelligibility and clarity', 'Music playback quality', 'Low power draw only'],
      correctAnswer: 1,
      explanation: 'Intelligibility (e.g., STI) is key; manage reverberation and background noise for clear messages.'
    },
    {
      id: 5,
      question: 'Escape stair cores are commonly:',
      options: ['Combined into adjacent zones', 'Left without detection', 'Provided with dedicated detection zones and robust notification', 'Protected by VADs only'],
      correctAnswer: 2,
      explanation: 'Stairs are critical escape routes and often zoned separately with clear indication and reliable warning.'
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
              <Users className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Designing for Accessibility and Escape Routes</h1>
                <p className="text-lg text-gray-400">Accessibility considerations and escape route protection</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 3.4</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Accessibility Design</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Escape routes and accessibility features must ensure timely, intelligible warning for all occupants. This includes audibility/visibility targets, appropriate device selection, and coordination with the fire strategy for phased evacuation and assisted escape.</p>
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
                  <li>Apply audibility and visibility targets to escape routes and refuges.</li>
                  <li>Select and place VADs using EN 54‑23 category/coverage (W, C, O) with line‑of‑sight.</li>
                  <li>Coordinate voice alarm for intelligibility and phased evacuation.</li>
                  <li>Integrate EVC/refuge communication and signage with alarm systems.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Figures & Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Key Guidance for Escape Routes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Audibility & Intelligibility</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>General aim: <span className="font-semibold">65 dB(A)</span> or 5 dB above ambient (sleeping risk: typically <span className="font-semibold">75 dB(A)</span> at bedhead).</li>
                    <li>Use voice alarm where appropriate; target clear speech transmission (e.g., STI) over sheer loudness.</li>
                    <li>Control reverberation; avoid masking by HVAC/background noise.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Visual Warning & Accessibility</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Select VAD category and coverage to suit the space; ensure <span className="font-semibold">line‑of‑sight</span> to occupants.</li>
                    <li>Synchronise beacons to reduce photosensitive risk and provide a unified signal.</li>
                    <li>Consider paging/vibrating devices for specific user groups where required.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Refuges, Stairs and Doors</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide reliable detection/notification in protected stairs and refuges; often separate zones for stair cores.</li>
                    <li>Coordinate with <span className="font-semibold">EVC</span>, evacuation lifts and door release/hold‑open devices.</li>
                    <li>Ensure signage and wayfinding align with alarm indications and evacuation strategy.</li>
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
                  <li>Audibility aims: <span className="font-semibold">65 dB(A)</span> or +5 dB over ambient; sleeping areas around <span className="font-semibold">75 dB(A)</span> at bedhead.</li>
                  <li>Visual warning: use appropriate EN 54‑23 category and ensure coverage; synchronise where multiple beacons are visible.</li>
                  <li>Voice alarm: intelligibility first; manage background noise and reverberation.</li>
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
                  <li>Relying on sounders only in noisy areas without VADs or voice.</li>
                  <li>Unsynchronised beacons causing discomfort or unclear signalling.</li>
                  <li>Insufficient provision in stair cores/refuges or missing coordination with EVC and door control.</li>
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
                <p>Design escape routes and accessibility features to deliver clear, intelligible warning for all occupants—integrating VADs, voice, refuges, and door control with the fire strategy.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Accessibility & Escape Routes"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-3-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-3-section-5">
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

export default FireAlarmModule3Section4;
