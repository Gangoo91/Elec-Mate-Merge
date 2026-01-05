import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';

import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule2Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Manual Call Points: Locations & Operation | Module 2 Sec 2';
    document.title = title;
    const desc = 'Learn BS 5839-1 recommendations for manual call points: positioning, mounting height, identification, testing, and practical application with quiz.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  // Quiz Data (5 questions)
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the recommended mounting height for a manual call point according to BS 5839?',
      options: ['1.0 m ±100 mm', '1.4 m ±200 mm', '1.6 m ±200 mm', '1.2 m ±100 mm'],
      correctAnswer: 1,
      explanation: 'BS 5839 recommends MCP centres at 1.4 m above finished floor level with a tolerance of ±200 mm for accessibility.'
    },
    {
      id: 2,
      question: 'What is the maximum travel distance to a manual call point in a normal risk environment?',
      options: ['25 m', '30 m', '45 m', '60 m'],
      correctAnswer: 2,
      explanation: 'Typical maximum travel distance is 45 m in normal risk; reduce (e.g., ~25 m) in higher‑risk or unfamiliar premises.'
    },
    {
      id: 3,
      question: 'Where must manual call points be positioned?',
      options: ['At all final exits only', 'At storey exits, final exits, and along escape routes', 'Next to fire extinguishers only', 'In plant rooms only'],
      correctAnswer: 1,
      explanation: 'Place MCPs at storey exits, final exits and along escape routes so occupants can raise the alarm quickly while evacuating.'
    },
    {
      id: 4,
      question: 'True or False: Manual call points must be visible and unobstructed.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'They should be clearly visible (usually red) with signage where necessary and free from obstructions.'
    },
    {
      id: 5,
      question: 'How often should each MCP be tested according to BS 5839 recommendations?',
      options: ['Every day', 'Every week', 'Every month', 'Every 6 months'],
      correctAnswer: 1,
      explanation: 'Weekly user tests normally activate a different MCP each time with records in the logbook.'
    }
  ], []);

const sequentialQuestions = useMemo(
  () => questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  })),
  [questions]
);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
          <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Hand className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Manual Call Points: Locations and Operation</h1>
                <p className="text-lg sm:text-xl text-gray-400">Positioning, mounting, identification and testing</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 2.2</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">30 minutes</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction & Why It Matters</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="space-y-3">
                <p>Manual Call Points (MCPs) are a critical part of a fire detection and alarm system, allowing any building occupant to trigger an alarm quickly in the event of a fire. They provide a human‑activated safety mechanism that complements the automatic detection devices such as smoke, heat, or multisensor detectors.</p>
                <p>Under BS 5839, MCPs must be easily accessible, visible, and installed in the right locations to ensure rapid activation during an emergency. Poor placement, incorrect mounting heights, or obstruction can significantly delay alarm initiation — costing valuable seconds in evacuation time.</p>
                <p>MCPs are not just a compliance requirement; they are a life‑saving tool. Understanding where and how to install them correctly ensures that anyone, whether a trained staff member or a visitor, can raise the alarm without hesitation.</p>
              </div>
            </CardContent>
          </Card>

           {/* Learning Objectives */}
           <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Identify the correct mounting height for MCPs according to BS 5839.</li>
                  <li>Explain the maximum travel distances to MCPs in different risk categories.</li>
                  <li>Recognise key positioning requirements to ensure MCP accessibility.</li>
                  <li>Understand operational considerations for MCPs, including testing and resetting.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

           {/* Manual Call Point Requirements (BS 5839) */}
           <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Manual Call Point Requirements (BS 5839)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="grid md:grid-cols-2 gap-4">
                <AccentPanel tone="amber" variant="subtle">
                  <h3 className="text-lg font-semibold mb-2">Mounting Height</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>MCPs should be mounted so that the centre of the operating element is <span className="font-semibold">1.4 m</span> above finished floor level, with a tolerance of <span className="font-semibold">±200 mm</span>.</li>
                    <li>This height allows access for both standing adults and wheelchair users.</li>
                  </ul>
                </AccentPanel>

                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <h3 className="text-lg font-semibold mb-2">Positioning</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>MCPs must be located on escape routes, at storey exits, and at all final exits from a building.</li>
                    <li>In normal risk areas, no one should have to travel more than <span className="font-semibold">45 m</span> to reach the nearest MCP.</li>
                    <li>In higher‑risk or unfamiliar environments, reduce travel distances to around <span className="font-semibold">25 m</span> or less.</li>
                  </ul>
                </div>

                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <h3 className="text-lg font-semibold mb-2">Visibility & Accessibility</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>MCPs should be highly visible (typically red) with appropriate signage if not immediately obvious.</li>
                    <li>They must not be obstructed by doors, furniture, or stored items.</li>
                    <li>In areas with limited visibility, consider illuminated call points or additional signage.</li>
                  </ul>
                </div>

                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <h3 className="text-lg font-semibold mb-2">Environmental Considerations</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>For outdoor or harsh locations, MCPs must be weatherproof and protected against physical damage.</li>
                    <li>In vandal‑prone areas, fit protective covers that do not impede operation.</li>
                  </ul>
                </div>

                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <h3 className="text-lg font-semibold mb-2">Operation</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>MCPs are activated by pressing or breaking the frangible element; modern designs often use plastic frangible elements.</li>
                    <li>Once activated, MCPs latch until manually reset using a key or tool.</li>
                    <li>Regular testing is required — typically a different MCP each week per BS 5839 user testing practices.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

           {/* BS 7671 Coordination */}
           <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 7671 Coordination: Wiring, Segregation and Labelling</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Route and segregate fire alarm circuits away from LV power and data per BS 7671 and manufacturer guidance.</li>
                  <li>Use fire‑resistant cables with correct supports; avoid plastic fixings alone on escape routes.</li>
                  <li>Identify isolators and control circuits; provide diagrams and labels at the panel and distribution boards.</li>
                  <li>Maintain earthing and bonding continuity when interfacing; document interfaces in the cause‑and‑effect.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

           {/* Real World Scenario */}
           <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real‑World Example</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <p>A three‑storey office building had MCPs installed only at final exits on the ground floor. In a fire drill, staff on the third floor had to run down two flights of stairs to raise the alarm, losing around 40 seconds before the system was triggered. This installation was non‑compliant and increased risk. Correct placement would require MCPs at each storey exit and along escape routes.</p>
              </div>
            </CardContent>
          </Card>

           {/* Common Mistakes to Avoid */}
           <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Common Mistakes to Avoid</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Installing MCPs behind opening doors, making them inaccessible.</li>
                  <li>Mounting MCPs too high or too low, making them difficult to use.</li>
                  <li>Not providing a call point at every storey exit.</li>
                  <li>Failing to consider reduced travel distances for high‑risk areas.</li>
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
                <p>MCPs must be easy to find and operate, sited on escape routes, mounted at accessible height, uniquely identified and routinely tested—with cabling and segregation coordinated to BS 7671.</p>
              </AccentPanel>
            </CardContent>
          </Card>

<SingleQuestionQuiz
  questions={sequentialQuestions}
  title="Knowledge Check: Manual Call Points"
/>
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-2-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-2-section-3">
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

export default FireAlarmModule2Section2;
