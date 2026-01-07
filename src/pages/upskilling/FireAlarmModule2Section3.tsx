import { useEffect, useMemo } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';
const FireAlarmModule2Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Alarm Devices: Sounders, Beacons & Voice | Module 2 Sec 3';
    document.title = title;
    const desc = 'BS 5839-1 guidance on alarm devices: audibility, VADs, voice evacuation, wiring and commissioning with BS 7671 coordination.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  // Quiz Data (12 questions)
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the usual audibility target for general areas?',
      options: ['55 dB(A)', '65 dB(A) or 5 dB above ambient', '75 dB(A) at bedhead everywhere', '90 dB(A)'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 commonly applies 65 dB(A) or 5 dB above ambient (whichever is greater) for most spaces.'
    },
    {
      id: 2,
      question: 'When are visual alarm devices typically required?',
      options: ['Always', 'Only in plant rooms', 'Where noise or accessibility requires visual warning', 'Never'],
      correctAnswer: 2,
      explanation: 'Use VADs where audibility may be insufficient or to support accessibility and equal access to alarms.'
    },
    {
      id: 3,
      question: 'What matters most for voice alarm systems?',
      options: ['Maximum loudness', 'Intelligibility of messages', 'Number of loudspeakers', 'Music quality'],
      correctAnswer: 1,
      explanation: 'Voice alarm prioritises intelligibility; layout and room acoustics must support clear messages.'
    },
    {
      id: 4,
      question: 'Why synchronise multiple beacons?',
      options: ['Looks nicer', 'Saves power', 'Reduces photosensitive risk and improves perception', 'Avoids EMI'],
      correctAnswer: 2,
      explanation: 'Synchronised flashing reduces photosensitive risk and creates a clearer, unified signal.'
    },
    {
      id: 5,
      question: 'What should be considered for power supply sizing?',
      options: ['Only mains rating', 'Standby and alarm current draw vs panel capacity', 'Just cable CSA', 'Only battery colour'],
      correctAnswer: 1,
      explanation: 'Allow for standby and alarm loads; verify current draw against panel capacity.'
    },
    {
      id: 6,
      question: 'What is the typical audibility level required at the bedhead in sleeping risk areas?',
      options: ['55 dB(A)', '65 dB(A)', '75 dB(A)', '85 dB(A)'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 typically requires 75 dB(A) at the bedhead in sleeping risk areas to ensure occupants are awakened by the alarm.'
    },
    {
      id: 7,
      question: 'What does VAD stand for in fire alarm terminology?',
      options: ['Voice Activation Device', 'Visual Alarm Device', 'Voltage Adjustment Device', 'Variable Alert Display'],
      correctAnswer: 1,
      explanation: 'VAD stands for Visual Alarm Device, providing visual indication of a fire alarm through flashing lights or beacons.'
    },
    {
      id: 8,
      question: 'Why might sounders alone be insufficient in certain environments?',
      options: ['They are too expensive', 'High ambient noise levels may prevent people hearing them', 'They look unattractive', 'They consume too much power'],
      correctAnswer: 1,
      explanation: 'In noisy industrial or commercial environments, high ambient noise can mask audible alarms, requiring visual alarm devices.'
    },
    {
      id: 9,
      question: 'What is a key design consideration for voice alarm loudspeaker placement?',
      options: ['Maximum volume output', 'Room acoustics and reverberation management', 'Loudspeaker colour', 'Brand preference'],
      correctAnswer: 1,
      explanation: 'Voice alarm systems must prioritise speech intelligibility. Room acoustics, reverberation, and loudspeaker positioning all affect message clarity.'
    },
    {
      id: 10,
      question: 'What should be avoided when positioning visual alarm devices?',
      options: ['Direct glare into occupant sight lines', 'Mounting on walls', 'Using red lenses', 'Multiple devices per zone'],
      correctAnswer: 0,
      explanation: 'VADs should avoid causing direct glare that could temporarily blind or distract occupants, while maintaining line of sight visibility.'
    },
    {
      id: 11,
      question: 'What is the purpose of phased evacuation in voice alarm systems?',
      options: ['To confuse occupants', 'To control evacuation sequentially and prevent overcrowding', 'To save power', 'To test the system'],
      correctAnswer: 1,
      explanation: 'Phased evacuation uses voice alarm messages to control the order of evacuation, preventing congestion in escape routes, particularly in tall buildings.'
    },
    {
      id: 12,
      question: 'What factors affect the required number of sounders in a building?',
      options: ['Only the floor area', 'Room geometry, partitions, ambient noise, and door closers', 'Only the ceiling height', 'The colour of the walls'],
      correctAnswer: 1,
      explanation: 'Sounder coverage is affected by room layout, partitions, furnishings, ambient noise levels, and sound attenuation from doors and walls.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Volume2 className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Sounders, Beacons, Voice Evacuation Devices
                </h1>
                <p className="text-xl text-gray-400">
                  Alarm notification devices and voice evacuation systems
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Notification Devices
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Alarm notification must be clear, intelligible and timely. This section covers sounders, visual indicators and voice alarm systems, with practical siting and commissioning considerations in line with BS 5839‑1.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="list-disc pl-6 space-y-2">
                <li>Differentiate between audible, visual and voice alarm devices and their use cases.</li>
                <li>Outline siting and coverage aims for audibility, visibility and intelligibility.</li>
                <li>Recognise wiring topologies, power/supervision, and synchronisation needs.</li>
                <li>Plan commissioning checks and user acceptance testing.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Alarm Device Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Sounders</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>General alarm tones; select output to achieve required audibility relative to ambient noise.</li>
                  <li>Consider open‑plan areas vs. cellular rooms; avoid excessive levels that impede communication.</li>
                  <li>Door closers, partitions and furnishings affect propagation—verify during testing.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Visual Indicators (VADs/Beacons)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use for noisy environments and accessibility; select categories to suit room size/geometry.</li>
                  <li>Avoid direct glare; ensure line of sight in occupied zones; coordinate with décor and lighting.</li>
                  <li>Synchronise flashing to reduce photosensitive risks and improve perception.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Voice Alarm (VA)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Pre‑recorded and live messages for phased evacuation; prioritise intelligibility over loudness.</li>
                  <li>Coordinate loudspeaker layout with room acoustics; manage reverberation and background music.</li>
                  <li>Integrate with fire panel cause‑and‑effect and emergency microphone points.</li>
                </ul>
              </div>
            </CardContent>
            </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Audibility & Intelligibility Targets</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>General areas: aim for <span className="font-semibold">65 dB(A)</span> or <span className="font-semibold">5 dB(A)</span> above ambient (whichever is greater).</li>
                  <li>Sleeping risk: typically <span className="font-semibold">75 dB(A)</span> at the bedhead with doors closed.</li>
                  <li>Voice alarm: prioritise <span className="font-semibold">intelligibility</span> in occupied areas—manage reverberation and background noise.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 7671 Coordination</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Segregate fire alarm wiring from LV power and other services per BS 7671 and manufacturer guidance.</li>
                  <li>Use suitable fire‑resistant cables and supports; avoid plastic fixings alone on escape routes.</li>
                  <li>Confirm battery standby and alarm load calculations; label isolators and distribution boards.</li>
                  <li>Maintain earthing/bonding continuity when interfacing auxiliary equipment and metal enclosures.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Common Mistakes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Over‑reliance on loudness instead of checking clarity for voice systems.</li>
                  <li>Unsynchronised beacons causing discomfort and poor perception.</li>
                  <li>Ignoring ambient noise variations (machinery start‑up, shift changes).</li>
                  <li>Under‑sizing power supplies and batteries.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

           <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Siting, Circuits & Commissioning</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Siting</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Distribute devices to achieve even coverage; avoid shadowing and dead spots.</li>
                  <li>Position beacons to be visible from normal positions of work and along escape routes.</li>
                  <li>Place VA loudspeakers to balance level and clarity; test message intelligibility.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Circuits & Power</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Monitor circuit integrity; segregate from other services as required.</li>
                  <li>Allow for battery standby and alarm load; verify current draw against panel capacity.</li>
                  <li>Synchronise multi‑device systems where necessary (tones/beacons).</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Commissioning & Maintenance</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Verify audibility/visibility/intelligibility targets; document results.</li>
                  <li>Set device addresses/zones; confirm cause‑and‑effect activation paths.</li>
                  <li>Plan periodic sound level and VA checks; log results and corrective actions.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="green" variant="subtle">
                <p>Effective notification depends on device selection, siting and verification. Aim for clear, consistent alarms that occupants can perceive and act upon quickly.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Alarm Devices"
          />
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule2Section3;