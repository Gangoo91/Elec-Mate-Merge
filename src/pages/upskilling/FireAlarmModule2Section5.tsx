import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule2Section5 = () => {
  // SEO
  useEffect(() => {
    const title = 'False Alarm Management | Module 2 Sec 5';
    document.title = title;
    const desc = 'Practical strategies to prevent and manage false alarms: design measures, operational controls, maintenance and logging.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  // Quiz (13 questions)
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Which area is most likely to cause nuisance alarms with smoke detectors?',
      options: ['Server rooms with clean air', 'Kitchens producing steam/aerosols', 'Quiet offices', 'Plant rooms with no dust'],
      correctAnswer: 1,
      explanation: 'Steam and aerosols can trigger optical smoke detectors; use heat/multisensor and suitable siting.'
    },
    {
      id: 2,
      question: 'When may investigation delays be considered?',
      options: ['Always', 'Where a risk assessment permits and trained staff respond promptly', 'Never', 'Only at night'],
      correctAnswer: 1,
      explanation: 'Use delays only where justified and supported by procedures, clear indications and timed escalation.'
    },
    {
      id: 3,
      question: 'What should be recorded after any unwanted alarm?',
      options: ['Nothing if it resets', 'Only date and time', 'Full incident details to inform trend analysis', 'Only battery voltage'],
      correctAnswer: 2,
      explanation: 'Recording details supports analysis and targeted improvements.'
    },
    {
      id: 4,
      question: 'Which design choice can reduce unwanted alarms in dusty works?',
      options: ['Leave detectors uncovered', 'Use permits and temporary isolation with controls', 'Increase sensitivity', 'Turn off the panel permanently'],
      correctAnswer: 1,
      explanation: 'Plan works with permits, temporary isolation and mitigation; reinstate protection promptly.'
    },
    {
      id: 5,
      question: 'Why synchronise beacons in occupied spaces?',
      options: ['Decoration only', 'Reduces photosensitive risk and improves perception', 'Saves cabling', 'Required for sounders'],
      correctAnswer: 1,
      explanation: 'Synchronous flashing reduces photosensitive risk and provides a clearer signal.'
    },
    {
      id: 6,
      question: 'What is the primary benefit of using multisensor detectors in areas prone to false alarms?',
      options: ['They are cheaper', 'They combine multiple sensing technologies with algorithms to reduce false alarms', 'They look better', 'They require no maintenance'],
      correctAnswer: 1,
      explanation: 'Multisensor detectors combine smoke and heat detection with intelligent algorithms to differentiate between real fires and false alarm sources.'
    },
    {
      id: 7,
      question: 'What is a common cause of false alarms in new buildings?',
      options: ['Too many detectors', 'Construction dust and debris during fit-out', 'Excessive testing', 'Cold weather'],
      correctAnswer: 1,
      explanation: 'Construction dust, paint fumes, and aerosols during building fit-out are major sources of false alarms. Proper protection or temporary isolation may be needed.'
    },
    {
      id: 8,
      question: 'How should detector sensitivity drift be managed?',
      options: ['Ignore it until false alarms occur', 'Regular maintenance with cleaning and testing; replace contaminated detectors', 'Increase alarm thresholds permanently', 'Remove the detector'],
      correctAnswer: 1,
      explanation: 'Regular maintenance including cleaning, testing, and replacement of contaminated or drifting detectors prevents false alarms while maintaining protection.'
    },
    {
      id: 9,
      question: 'What should be included in a false alarm incident log?',
      options: ['Only the date', 'Date, time, location, suspected cause, and actions taken', 'Nothing - logs are not required', 'Only detector type'],
      correctAnswer: 1,
      explanation: 'Comprehensive logging including date, time, location, cause, and actions enables trend analysis and targeted improvements.'
    },
    {
      id: 10,
      question: 'Why might time-of-day sensitivity adjustments be useful?',
      options: ['To save power at night', 'Different activities at different times may require different detection sensitivity', 'To confuse intruders', 'They are never useful'],
      correctAnswer: 1,
      explanation: 'Some advanced systems allow sensitivity adjustments based on time-of-day to account for varying activities, such as cleaning or cooking during specific hours.'
    },
    {
      id: 11,
      question: 'What is the risk of using investigation delays inappropriately?',
      options: ['No risk at all', 'Delayed evacuation in a real fire, potentially costing lives', 'Saves money', 'Improves system reliability'],
      correctAnswer: 1,
      explanation: 'Investigation delays must only be used where risk-assessed and with trained staff. Inappropriate use can delay evacuation in real emergencies.'
    },
    {
      id: 12,
      question: 'How should detector zoning help with false alarm management?',
      options: ['It does not help', 'Separate zones for high-nuisance areas enable targeted investigation and response', 'All zones must be identical', 'Zoning is only for large buildings'],
      correctAnswer: 1,
      explanation: 'Proper zoning allows high-risk nuisance areas to be identified quickly and investigated without unnecessarily alarming the entire building.'
    },
    {
      id: 13,
      question: 'What should happen after a pattern of false alarms is identified?',
      options: ['Disconnect the affected detectors', 'Analyse the root cause and implement targeted design or operational improvements', 'Ignore it', 'Increase detector sensitivity'],
      correctAnswer: 1,
      explanation: 'Trend analysis should identify root causes, leading to targeted improvements such as detector relocation, type changes, or procedural updates.'
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
        
        <div className="space-y-6 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">False Alarm Management</h1>
                <p className="text-xl text-gray-400">Strategies for preventing and managing unwanted alarms</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 2.5</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">False Alarm Prevention</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Unwanted alarms disrupt operations and reduce confidence. This section provides practical measures to design out and manage false alarms in line with good practice.</p>
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
                  <li>Identify common false alarm sources and how to mitigate them.</li>
                  <li>Apply design strategies such as multi‑criteria detectors and zoning.</li>
                  <li>Implement investigation delays and management procedures where permitted.</li>
                  <li>Set up maintenance, logging and review processes.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Design & Operational Measures */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Design & Operational Measures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Detector Selection & Placement</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use multisensor or heat where aerosols/steam are present; avoid smoke in kitchens.</li>
                    <li>Separate zones for high‑risk nuisance areas to aid investigation.</li>
                    <li>Consider time‑of‑day sensitivities and algorithm modes if available.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Investigation Delays</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use only where risk assessment permits and staff procedures are robust.</li>
                    <li>Configure clear indications and timed escalation to general alarm.</li>
                    <li>Document in cause‑and‑effect with stakeholder agreement.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Maintenance & Housekeeping</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Regular cleaning and inspection; replace contaminated or drifting devices.</li>
                    <li>Control works (dust, aerosols) with permits and temporary isolation procedures.</li>
                    <li>Record incidents; analyse trends to target improvements.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Management Procedures & Records (subtle accent) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Management Procedures & Records</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Maintain a logbook of unwanted alarms with root‑cause notes and actions taken.</li>
                  <li>Review incident patterns at management meetings; adjust design or procedures.</li>
                  <li>Train staff on investigation protocols and escalation pathways.</li>
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
                  <li>Placing smoke detectors in steam‑ or aerosol‑heavy environments.</li>
                  <li>Using investigation delays without trained staff and clear indications.</li>
                  <li>Ignoring trend data from logbooks and repeating the same faults.</li>
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
                <p>Combine appropriate detector technology, robust procedures and maintenance to minimise unwanted alarms. Review performance regularly and update strategies as needed.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: False Alarm Management"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-2-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-3">
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

export default FireAlarmModule2Section5;