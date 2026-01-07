import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule3Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Detector & Sounder Placement Rules | Module 3 Sec 3';
    document.title = title;
    const desc = 'Detailed rules for detector spacing, wall/apex distances, airflows/obstructions, sounder audibility and VAD placement with checklists and quiz.';
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
      question: 'What minimum distance from walls is commonly applied for point detectors?',
      options: ['100 mm', '300 mm', '500 mm', '1000 mm'],
      correctAnswer: 2,
      explanation: 'Keeping detectors at least ~500 mm from walls helps avoid dead air spaces.'
    },
    {
      id: 2,
      question: 'General audibility target for most spaces is often:',
      options: ['55 dB(A)', '65 dB(A) or 5 dB above ambient', '75 dB(A) everywhere', '85 dB(A) at the panel'],
      correctAnswer: 1,
      explanation: 'Aim for 65 dB(A) or 5 dB above ambient—whichever is greater; sleeping risks typically 75 dB(A) at bedhead.'
    },
    {
      id: 3,
      question: 'Why should detectors be kept clear of diffusers/high‑velocity air?',
      options: ['Aesthetics only', 'Air can dilute/deflect smoke or heat away from sensor', 'To save energy', 'For EMC'],
      correctAnswer: 1,
      explanation: 'Strong airflow can delay or prevent correct sensing of smoke/heat.'
    },
    {
      id: 4,
      question: 'Why synchronise multiple beacons (VADs)?',
      options: ['Looks better', 'Reduces photosensitive risk and improves perception', 'Increases battery life', 'Required for heat detectors'],
      correctAnswer: 1,
      explanation: 'Synchronous flashing reduces photosensitive risk and provides a clearer, unified signal.'
    },
    {
      id: 5,
      question: 'Where should VADs be placed for effectiveness?',
      options: ['Hidden behind pillars', 'Anywhere on the ceiling', 'With line‑of‑sight to occupied areas per category/coverage', 'Only near the panel'],
      correctAnswer: 2,
      explanation: 'Place VADs with line‑of‑sight to occupants; select category to suit room size/geometry.'
    },
    {
      id: 6,
      question: 'What is the typical coverage radius for a point smoke detector on a flat ceiling?',
      options: ['3.5 m', '7.5 m', '15 m', '30 m'],
      correctAnswer: 1,
      explanation: 'Point detectors typically cover a radius of approximately 7.5 m, though this varies with ceiling height and manufacturer specifications.'
    },
    {
      id: 7,
      question: 'How should detectors be positioned near prominent beams or bulkheads?',
      options: ['Place directly on beams', 'Keep at least 500 mm away to avoid dead-air pockets', 'Beams have no effect on placement', 'Only place detectors in beam channels'],
      correctAnswer: 1,
      explanation: 'Beams and bulkheads can create dead-air spaces; detectors should be kept at least 500 mm away or additional devices added to ensure coverage.'
    },
    {
      id: 8,
      question: 'What detector type is typically preferred in areas with steam or cooking aerosols?',
      options: ['Optical smoke detectors', 'Heat detectors or multisensor devices', 'Ionisation smoke detectors', 'Beam detectors only'],
      correctAnswer: 1,
      explanation: 'Heat detectors or multisensor devices are preferred in areas with steam or aerosols to avoid false alarms from smoke detectors responding to non-fire particles.'
    },
    {
      id: 9,
      question: 'What special consideration is needed for detector placement in high spaces like atriums?',
      options: ['Use standard ceiling-mount detectors', 'Consider beam or aspirating detection and plan safe maintenance access', 'Detection not required in high spaces', 'Only use sounders, no detectors'],
      correctAnswer: 1,
      explanation: 'High spaces require special detection methods (beam/aspirating) suitable for the height, with careful planning for maintenance access and testing.'
    },
    {
      id: 10,
      question: 'How does ceiling height affect detector spacing?',
      options: ['Ceiling height has no effect', 'Higher ceilings may require reduced spacing or specialist detection', 'Higher ceilings allow wider spacing', 'Only affects sounders, not detectors'],
      correctAnswer: 1,
      explanation: 'As ceiling height increases, smoke/heat dispersion changes; spacing may need to be reduced and specialist detection (beam/aspirating) may be needed above certain heights.'
    },
    {
      id: 11,
      question: 'What should be considered regarding HVAC when placing detectors?',
      options: ['HVAC has no effect on detection', 'Review seasonal modes and normal door states during design', 'Only place detectors in HVAC ducts', 'Turn off HVAC permanently'],
      correctAnswer: 1,
      explanation: 'HVAC operation affects smoke/heat movement; designers must review seasonal modes, airflow patterns, and normal door states to ensure effective detection.'
    },
    {
      id: 12,
      question: 'When should detection be provided in ceiling voids?',
      options: ['Never provide void detection', 'Always in every void regardless of risk', 'Where risk warrants it or significant cabling exists, ensuring maintenance access', 'Only if specifically requested by client'],
      correctAnswer: 2,
      explanation: 'Ceiling voids should be protected where fire risk exists, where significant cabling is present, or where voids form protected spaces—always ensuring safe maintenance access.'
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
              <MapPin className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Detector and Sounder Placement Rules</h1>
                <p className="text-lg text-gray-400">Device positioning guidelines and placement standards</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 3.3</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Device Placement</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Accurate placement of detectors and notification devices is essential for timely detection and clear warning. The following rules support practical, compliant layouts.</p>
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
                  <li>Apply spacing and proximity rules for point detectors.</li>
                  <li>Account for obstructions, airflow and ceiling form.</li>
                  <li>Achieve audibility/intelligibility and correct VAD coverage.</li>
                  <li>Document placement with clear schedules/drawings.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Detector Placement */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Detector Placement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Spacing & Proximities</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Typical point detector coverage radius ~7.5 m (ceiling height dependent).</li>
                    <li>Keep detectors at least ~<span className="font-semibold">500 mm</span> from walls and prominent beams.</li>
                    <li>Near apex/peaked ceilings, consult manufacturer data; smoke flows toward the high point.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Obstructions & Airflows</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Avoid high‑velocity air from diffusers; it can dilute smoke/heat at the sensor.</li>
                    <li>Assess beams/bulkheads/shelving for dead‑air pockets; add devices or reposition.</li>
                    <li>Review seasonal HVAC modes and normal door states during design.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Special Cases</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Steam/aerosol areas: prefer heat or multisensor; avoid smoke directly over sources.</li>
                    <li>High spaces/atriums: consider beam or aspirating detection; plan safe access.</li>
                    <li>Voids: protect where risk or cabling warrants; ensure access for maintenance.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sounders & VADs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Sounders & Visual Alarm Devices</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Audibility: aim for <span className="font-semibold">65 dB(A)</span> or 5 dB above ambient; <span className="font-semibold">75 dB(A)</span> at bedhead for sleeping risk.</li>
                  <li>Voice: prioritise intelligibility; address reverberation and background noise.</li>
                  <li>VADs: ensure line‑of‑sight; select category for the room size/geometry; synchronise flashing.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Rules Snapshot (subtle accent) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Key Rules Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>≥ 500 mm from walls; avoid dead‑air zones and strong airflows.</li>
                  <li>Check ceiling height and form; adapt device types and spacing accordingly.</li>
                  <li>Meet audibility/visibility/intelligibility aims for occupant warning.</li>
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
                  <li>Mounting detectors in airflow streams or too close to walls/obstructions.</li>
                  <li>Ignoring sleeping risk audibility or VAD needs in noisy spaces.</li>
                  <li>Failing to coordinate device layout with room use and furniture.</li>
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
                <p>Place detectors and notification devices to avoid dead‑air and airflow issues, meet signalling aims, and support safe, rapid response.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Device Placement"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-3-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-3-section-4">
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

export default FireAlarmModule3Section3;