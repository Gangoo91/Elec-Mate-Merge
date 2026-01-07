import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule2Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Detector Spacing, Mounting & Limits | Module 2 Sec 4';
    document.title = title;
    const desc = 'Practical guidance on detector spacing, mounting heights, obstructions, airflows, documentation and BS 7671 coordination.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  // Quiz (11 questions)
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Why should detectors be kept clear of high‑velocity air from diffusers?',
      options: ['Improves aesthetics only', 'Airflow can delay or divert smoke/heat to the sensor', 'Prevents EMI', 'Saves power'],
      correctAnswer: 1,
      explanation: 'Strong air movement can dilute or deflect smoke/heat away from the sensing chamber, delaying activation.'
    },
    {
      id: 2,
      question: 'Which feature can create dead‑air pockets requiring extra consideration?',
      options: ['Smooth ceilings', 'Open floors', 'Beams and bulkheads', 'Low ambient light'],
      correctAnswer: 2,
      explanation: 'Beams/bulkheads may inhibit smoke movement; add devices or reposition to maintain coverage.'
    },
    {
      id: 3,
      question: 'What is a key aim when laying out detectors for a space?',
      options: ['Even coverage and access for maintenance', 'Maximum device count', 'Random placement', 'Hide devices from view'],
      correctAnswer: 0,
      explanation: 'Design for even coverage, considering geometry, height and safe access for testing/replacement.'
    },
    {
      id: 4,
      question: 'How should ceiling height influence detector selection?',
      options: ['Use any type regardless of height', 'Higher spaces may need beam/aspirating solutions', 'Only wall‑mount detectors', 'Ceiling height is irrelevant'],
      correctAnswer: 1,
      explanation: 'In high spaces, stratification and volume often favour beam or ASD designs.'
    },
    {
      id: 5,
      question: 'What should accompany detector layout at handover?',
      options: ['Verbal description only', 'Unmarked floor plans', 'Marked drawings, schedules, and access notes', 'Photos only'],
      correctAnswer: 2,
      explanation: 'Provide documentation: drawings with types/addresses/heights plus maintenance access notes.'
    },
    {
      id: 6,
      question: 'What is the typical maximum coverage radius for a heat detector (Class A1R)?',
      options: ['3.0 m', '5.0 m', '7.5 m', '10.0 m'],
      correctAnswer: 1,
      explanation: 'Class A1R heat detectors typically have a maximum coverage radius of 5.0 m, though manufacturer data should always be checked.'
    },
    {
      id: 7,
      question: 'Where should detectors be mounted on sloped or pitched ceilings?',
      options: ['At the lowest point', 'At the highest point where smoke naturally collects', 'In the middle only', 'On the walls instead'],
      correctAnswer: 1,
      explanation: 'Smoke rises to the highest points on sloped ceilings, so detectors should be positioned at peaks and high points.'
    },
    {
      id: 8,
      question: 'What is a key consideration for detectors in ceiling voids?',
      options: ['They are never needed', 'Access for maintenance and testing must be provided', 'They should be painted to match the ceiling', 'Only wireless detectors can be used'],
      correctAnswer: 1,
      explanation: 'If ceiling voids require protection, adequate access panels and safe access routes must be provided for maintenance and testing.'
    },
    {
      id: 9,
      question: 'How does seasonal HVAC operation affect detector design?',
      options: ['It has no effect', 'Airflow patterns and temperatures change, affecting smoke movement', 'Only affects heat detectors', 'Only matters in summer'],
      correctAnswer: 1,
      explanation: 'HVAC modes affect airflow patterns, temperature gradients, and smoke movement, all of which should be considered during design.'
    },
    {
      id: 10,
      question: 'What minimum mounting height below the ceiling apex is recommended for detectors on pitched roofs?',
      options: ['10-50 mm', '25-150 mm', '200-300 mm', '500 mm'],
      correctAnswer: 1,
      explanation: 'Detectors on pitched roofs should typically be mounted 25-150 mm below the apex to avoid dead air spaces while remaining in the smoke layer.'
    },
    {
      id: 11,
      question: 'Why might aspirating smoke detection (ASD) be preferred in cold stores or freezers?',
      options: ['They are cheaper', 'Point detectors may not function properly in extreme temperatures', 'They look better', 'No special consideration is needed'],
      correctAnswer: 1,
      explanation: 'Extreme cold can affect point detector operation. ASD systems can sample at the ceiling while processing occurs in a temperature-controlled environment.'
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
              <MapPin className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Detection Spacing, Mounting Heights, and Limits</h1>
                <p className="text-xl text-gray-400">Detector positioning requirements and coverage considerations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 2.4</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Detector Positioning</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Detector siting and spacing underpin timely detection and reliable operation. This section summarises practical rules of thumb and common considerations in line with BS 5839‑1 design principles.</p>
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
                  <li>Outline typical spacing concepts and ceiling height effects.</li>
                  <li>Recognise obstructions, airflows and thermal stratification issues.</li>
                  <li>Plan mounting heights and maintenance access.</li>
                  <li>Document siting decisions with drawings and schedules.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Spacing & Mounting (neutral blocks) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Spacing & Mounting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">General Spacing</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Design for even coverage; adjust for room geometry and ceiling height.</li>
                    <li>Use beam detectors or aspirating detection where point coverage is impractical.</li>
                    <li>Increase density near high‑risk processes or concealed spaces.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Mounting Considerations</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Mount per manufacturer data; keep within recommended distances from ceilings/bulkheads.</li>
                    <li>Keep clear of diffusers, high‑velocity air and heat sources that skew response.</li>
                    <li>Allow safe access for testing and replacement; consider walkways/MEWPs.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Obstructions, Airflows & Heights</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Beams, bulkheads and shelves can create dead air; add devices or reposition.</li>
                    <li>Stratification in high spaces can delay smoke—consider beam/ASD with sampling at height.</li>
                    <li>Account for seasonal HVAC modes and door states during design.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BS 7671 Coordination (subtle accent) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 7671 Coordination</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Segregate fire alarm wiring from LV power/data where required; follow manufacturer guidance.</li>
                  <li>Use suitable fire‑resistant cables and supports; avoid plastic fixings alone on escape routes.</li>
                  <li>Label isolators, distribution boards and interfaces; maintain earthing/bonding continuity.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

          {/* Ceiling Types & Height Effects */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Ceiling Types & Height Effects</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Smooth flat ceilings: follow manufacturer guidance for spacing and distance below ceiling.</li>
                  <li>Sloped ceilings: consider smoke flow uphill; add devices at high points/clerestories as needed.</li>
                  <li>Beamed ceilings: treat bays individually if beams are significant; avoid dead‑air pockets.</li>
                  <li>Suspended ceilings: confirm void detection need; keep below tiles unless void is protected.</li>
                  <li>High ceilings: assess for stratification; beam or aspirating detection may be more suitable.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Voids, High Spaces & Special Areas */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Voids, High Spaces & Special Areas</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Atriums/warehouses: verify coverage at height; consider beam/ASD with maintenance access.</li>
                  <li>Ceiling/raised floor voids: protect where risk or cabling warrants; provide access panels.</li>
                  <li>Cold stores/freezers: low temperatures and air curtains affect smoke flow—adjust strategy.</li>
                  <li>Kitchens/steam areas: prefer heat or multisensor; avoid smoke directly over appliances.</li>
                  <li>Smoke control interfaces: coordinate detector placement with vents/pressurisation systems.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Commissioning & Verification Checklist */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commissioning & Verification Checklist</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Functionally test a sample then all devices; confirm addressing/zone indication correctness.</li>
                  <li>Verify cause‑and‑effect including door releases, fans, lifts and fire alarm warnings.</li>
                  <li>Record device locations, addresses and mounting heights; label where appropriate.</li>
                  <li>Prove maintenance access (MEWP/walkways) and safe isolation points.</li>
                  <li>Complete as‑fitted drawings and handover records; brief the premises management.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Documentation Pack Checklist */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Documentation Pack Checklist</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Design, installation and commissioning certificates; zone chart.</li>
                  <li>Device schedule with types, addresses and mounting heights.</li>
                  <li>As‑fitted drawings; cable types/routes and battery calculations.</li>
                  <li>Manufacturer data sheets and maintenance instructions; user logbook.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Worked Example & Common Mistakes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Worked Example</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))] space-y-2">
                <p>An L2 office floor with cellular rooms: point smoke in corridors and rooms, heat in kitchens/copier rooms. Avoid diffusers; add additional devices where beams create pockets. Provide a drawing with addresses and access notes.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Common Mistakes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Mounting directly in air streams or near radiant heaters.</li>
                  <li>Ignoring ceilings with beams/bulkheads causing dead zones.</li>
                  <li>Insufficient documentation of addresses/heights for maintenance.</li>
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
                <p>Lay out detectors for even, practical coverage, considering geometry, height, airflows and maintenance—coordinated with BS 7671 wiring practices.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Detector Siting"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-2-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-2-section-5">
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

export default FireAlarmModule2Section4;