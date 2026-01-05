import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule3Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Detection Coverage Requirements (BS 5839) | Module 3 Sec 2';
    document.title = title;
    const desc = 'Understand L1–L5 life safety categories, P1–P2 property protection, coverage aims, special risks, audibility/visibility targets and common pitfalls.';
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
      question: 'Which best describes an L1 system?',
      options: ['Escape routes only', 'Escape routes + defined high‑risk areas', 'Complete building coverage', 'No automatic detection'],
      correctAnswer: 2,
      explanation: 'L1 provides automatic detection throughout the entire building.'
    },
    {
      id: 2,
      question: 'What distinguishes L2 from L3?',
      options: ['L2 has fewer detectors', 'L2 includes defined high‑risk rooms in addition to escape routes', 'They are identical', 'L2 excludes escape routes'],
      correctAnswer: 1,
      explanation: 'L2 covers escape routes plus specified high‑risk areas; L3 focuses on escape routes only.'
    },
    {
      id: 3,
      question: 'A P1 system primarily addresses what objective?',
      options: ['Life safety only', 'Property protection across the whole building', 'Voice alarm only', 'VAD synchronisation'],
      correctAnswer: 1,
      explanation: 'P1 aims for comprehensive detection for property protection across the entire premises.'
    },
    {
      id: 4,
      question: 'What is a common audibility aim for general areas?',
      options: ['55 dB(A)', '65 dB(A) or 5 dB above ambient', '75 dB(A) everywhere', '90 dB(A)'],
      correctAnswer: 1,
      explanation: 'Typical aim is 65 dB(A) or 5 dB above ambient noise—whichever is greater.'
    },
    {
      id: 5,
      question: 'When are visual alarm devices typically required?',
      options: ['Always', 'Where noise/accessibility demands visual warning', 'Never', 'Only outdoors'],
      correctAnswer: 1,
      explanation: 'Use VADs for noisy spaces and to support accessibility—choose the correct category/placement.'
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
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Detection Coverage Requirements (BS 5839)</h1>
                <p className="text-lg text-gray-400">Life‑safety categories, property protection and coverage aims</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 3.2</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">BS 5839 Coverage</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Coverage categories ensure detection aligns with the building’s risk profile. Selecting L1–L5 for life safety and P1–P2 for property protection helps achieve reliable warning while controlling cost and complexity.</p>
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
                  <li>Differentiate L1–L5 life‑safety categories and typical applications.</li>
                  <li>Understand P1–P2 property protection aims.</li>
                  <li>Apply audibility/visibility targets for reliable occupant warning.</li>
                  <li>Identify common pitfalls and documentation needs.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">System Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Life Safety (L‑Categories)</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><span className="font-semibold">L1</span>: detection throughout all areas of the building.</li>
                    <li><span className="font-semibold">L2</span>: escape routes plus defined high‑risk areas (e.g., plant rooms, kitchens).</li>
                    <li><span className="font-semibold">L3</span>: escape routes only—corridors, lobbies, stairways.</li>
                    <li><span className="font-semibold">L4</span>: escape routes circulation spaces only.</li>
                    <li><span className="font-semibold">L5</span>: localised objectives (e.g., particular risks or process areas).</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Property Protection (P‑Categories)</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li><span className="font-semibold">P1</span>: detection throughout for early intervention and loss minimisation.</li>
                    <li><span className="font-semibold">P2</span>: detection in defined high‑risk areas only.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Aims & Special Areas */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Coverage Aims & Special Areas</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Protect escape routes to enable safe evacuation under plausible fire scenarios.</li>
                  <li>Address high‑risk rooms (catering, plant, storage) with suitable detection types.</li>
                  <li>Consider sleeping risks—ensure 75 dB(A) at bedhead and appropriate device placement.</li>
                  <li>Coordinate with fire strategy for phased evacuation and compartmentation.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* BS 5839 Highlights */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 5839 Highlights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>General audibility: aim for <span className="font-semibold">65 dB(A)</span> or 5 dB above ambient.</li>
                  <li>Sleeping areas: typically <span className="font-semibold">75 dB(A)</span> at the bedhead with doors closed.</li>
                  <li>Visual alarm devices: use correct <span className="font-semibold">category</span> and ensure line‑of‑sight in occupied zones.</li>
                  <li>Voice systems: prioritise <span className="font-semibold">intelligibility</span> over loudness; manage reverberation.</li>
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
                  <li>Specifying L3 where L2 or L1 is needed for risk profile.</li>
                  <li>Forgetting sleeping risk audibility requirements.</li>
                  <li>Omitting VADs in noisy or accessibility‑critical environments.</li>
                  <li>Inconsistent documentation between design, panel text and drawings.</li>
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
                <p>Select L/P categories that reflect life/property objectives, meet audibility/visibility targets, and align coverage with the fire strategy for dependable warning.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Coverage Categories"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-3-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-3-section-3">
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

export default FireAlarmModule3Section2;